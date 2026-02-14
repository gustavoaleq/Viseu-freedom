# Orquestracao de Jobs e Workers

Documentacao da arquitetura de jobs automatizados do Freedom.AI Hub.

## Stack

| Componente | Tecnologia | Funcao |
|-----------|-----------|--------|
| Fila | BullMQ | Gerenciamento de jobs com delay, retry e persistencia |
| Broker | Redis | Backend da fila (armazenamento e pub/sub) |
| Worker | BullMQ Worker | Processamento concorrente dos jobs |
| Adapter | WhatsApp Adapter | Envio das mensagens (Z-API / Cloud / Webhook) |

## Arquivos

```
backend/src/jobs/
  orquestracao.queue.ts      # Definicao da fila e tipos
  orquestracao.scheduler.ts  # Agendamento dos 4 jobs por audiencia
  orquestracao.processor.ts  # Logica de montagem de mensagem + envio + transicao de status
  orquestracao.worker.ts     # Worker BullMQ que consome a fila

backend/src/services/
  whatsapp.adapter.ts        # Adapter de envio (zapi/cloud/webhook)
  automacao-log.service.ts   # Auditoria da automacao (tabela logs_automacao)

backend/src/routes/
  webhooks.routes.ts         # Endpoint de entrada de respostas do WhatsApp

backend/src/services/
  whatsapp-inbound.service.ts # Parse de webhook, mapeamento de resposta e atualizacao de status
```

## Fluxo de Vida de uma Audiencia

```
Audiencia criada (manual ou importacao)
    |
    v
agendarOrquestracaoAudiencia()  -->  4 jobs na fila Redis
    |
    ├── CONFIRMACAO_D1   (24h antes)
    ├── REITERACAO_6H    (6h antes, condicional)
    ├── CHECKIN_DIA      (60min antes)

    |
    v
Worker consome job no horario agendado
    |
    v
processarOrquestracaoAudiencia()
    ├── Busca audiencia + preposto no banco
    ├── Monta mensagem com botoes
    ├── Envia via WhatsApp adapter
    ├── Registra em tabela `mensagens`
    └── Transiciona status da audiencia
    |
    v
Preposto recebe mensagem com botoes no WhatsApp
    |
    v
Preposto clica no botao de resposta
    |
    v
Z-API envia webhook para POST /api/v1/webhooks/whatsapp
    |
    v
processarRespostaWhatsApp()
    ├── Identifica preposto pelo telefone
    ├── Resolve audiencia-alvo (conversa referenciada ou ultima mensagem enviada)
    ├── Mapeia buttonId/texto ("1","2","3") -> novo status
    ├── Registra mensagem RECEBIDA
    └── Transiciona status da audiencia
```

## Exemplo Temporal

**Audiencia**: Processo 0001234-56.2024.5.02.0001
**Data**: 12/02/2026 as 15:00

| Job | Horario calculado | O que acontece |
|-----|-------------------|----------------|
| CONFIRMACAO_D1 | 11/02/2026 15:00 | Envia "Voce ira participar?" com botoes [Sim, confirmo / Nao, nao posso]. Status: AGENDADA -> A_CONFIRMAR |
| CHECKIN_DIA | 12/02/2026 14:00 | Envia "Chegou no local?" com botoes [A caminho / Ja cheguei / Problema]. Status: -> CHECK_IN_PENDENTE |
| RELATORIO_POS | 12/02/2026 15:30 | Envia "Ocorreu normalmente?" com botoes [Sim / Nao / Remarcada]. Status: -> RELATORIO_PENDENTE |

### Configuracao dos intervalos (banco de dados)

Os intervalos agora sao parametrizaveis pela tela de **Configuracoes** (`/configuracoes`, somente ADMIN).
Os valores sao persistidos na tabela `configuracao_global` e aplicados em tempo real pelo scheduler.

| Parametro | Default | Descricao |
|-----------|---------|-----------|
| `enviarAvisoNaImportacao` | `true` | Se ativado, importacao agenda jobs automaticamente |
| `horarioD1` | `null` | Horario fixo HH:mm para D-1 (se null, usa antecedencia em horas) |
| `antecedenciaD1Horas` | 24 | Horas antes da audiencia para D-1 (quando horarioD1 = null) |
| `antecedenciaReiteracaoHoras` | 6 | Horas antes da audiencia para reiteracao |
| `antecedenciaCheckinMinutos` | 60 | Minutos antes da audiencia para check-in |
| `posAudienciaMinutosDepois` | 30 | Minutos depois da audiencia para pos-audiencia |
| `fusoHorario` | `America/Sao_Paulo` | Fuso horario para calculo de agendamentos |

**Nota**: variaveis de ambiente `ORQ_*` continuam como fallback na inicializacao dos defaults.

### Reagendamento ao salvar configuracoes

Ao alterar parametros de timing via `PATCH /api/v1/configuracoes`, o backend reagenda automaticamente
todos os jobs pendentes de audiencias ativas (status != CONCLUIDA/CANCELADA). O scheduler usa upsert
nativo (remove + recria), sem risco de duplicidade.

## Jobs e Mensagens

### CONFIRMACAO_D1 (Lembrete D-1)

**Quando**: 24h antes da audiencia
**Mensagem**: "Ola {preposto}. Temos audiencia do processo {processo} em {data} as {hora}. Local: {local}. Voce ira participar?"
**Botoes**:
| ID | Label | Resposta esperada |
|----|-------|-------------------|
| CONFIRMO | Sim, confirmo | Status -> CONFIRMADA |
| NAO_POSSO | Nao, nao posso | Status -> NAO_POSSO |

### CHECKIN_DIA (Check-in no dia)

**Quando**: 60min antes da audiencia
**Mensagem**: "Check-in da audiencia {processo} hoje as {hora}. Chegou no local?"
**Botoes**:
| ID | Label | Resposta esperada |
|----|-------|-------------------|
| ESTOU_A_CAMINHO | Estou a caminho | Status -> EM_ANDAMENTO |
| JA_CHEGUEI | Ja cheguei | Status -> EM_ANDAMENTO |
| ESTOU_COM_PROBLEMA | Nao conseguirei ir | Status -> SUBSTITUICAO_NECESSARIA |

### REITERACAO_6H (Segunda confirmacao)

**Quando**: 6h antes da audiencia
**Regra**: dispara somente se nao houve resposta ao D-1 ou se a ultima resposta de confirmacao foi `NAO_POSSO`
**Mensagem**: mesmo contexto do D-1 + sufixo "Apenas para confirmarmos."
**Botoes**:
| ID | Label | Resposta esperada |
|----|-------|-------------------|
| CONFIRMO | Sim, confirmo | Status -> CONFIRMADA |
| NAO_POSSO | Nao, nao posso | Status -> SUBSTITUICAO_NECESSARIA e abre substituicao |

### RELATORIO_POS (Pos-audiencia)

**Quando**: 30min depois da audiencia
**Mensagem**: "Audiencia {processo} encerrada. Ocorreu normalmente?"
**Botoes**:
| ID | Label | Resposta esperada |
|----|-------|-------------------|
| AUDIENCIA_SIM | Sim, ocorreu | Status -> CONCLUIDA |
| AUDIENCIA_NAO | Nao ocorreu | Status -> CONCLUIDA |
| AUDIENCIA_REMARCADA | Foi remarcada | Status -> AGENDADA |

## Adapter WhatsApp (Z-API)

### Cadeia de fallback para envio com botoes

```
1. send-button-list  (payload: buttonList.buttons com id + label)
       |
       | falha?
       v
2. send-button-actions  (payload: buttonActions com type REPLY)
       |
       | falha?
       v
3. send-text  (texto com opcoes numeradas: "1. Sim, confirmo\n2. Nao posso")
```

### Prerequisito

**Modo botao deve estar ativado no painel Z-API** da instancia (Instancia > Configuracoes > ativar botoes). Sem isso, a API retorna 200 mas o WhatsApp descarta a mensagem silenciosamente.

### Formato dos payloads

**send-button-list** (primario):
```json
{
  "phone": "5511999999999",
  "message": "Voce confirma presenca?",
  "buttonList": {
    "buttons": [
      { "id": "CONFIRMO", "label": "Sim, confirmo" },
      { "id": "NAO_POSSO", "label": "Nao, nao posso" }
    ]
  }
}
```

**send-button-actions** (fallback):
```json
{
  "phone": "5511999999999",
  "message": "Voce confirma presenca?",
  "buttonActions": [
    { "id": "CONFIRMO", "type": "REPLY", "label": "Sim, confirmo" },
    { "id": "NAO_POSSO", "type": "REPLY", "label": "Nao, nao posso" }
  ]
}
```

## Webhook de Respostas (entrada)

### Formato da Z-API

Quando o preposto clica num botao, a Z-API envia para `POST /api/v1/webhooks/whatsapp`:

```json
{
  "phone": "5511939214731",
  "fromMe": false,
  "type": "ReceivedCallback",
  "buttonsResponseMessage": {
    "buttonId": "CONFIRMO",
    "message": "Sim, confirmo"
  }
}
```

Quando o preposto responde com texto (fallback numerico):

```json
{
  "phone": "5511939214731",
  "fromMe": false,
  "type": "ReceivedCallback",
  "text": {
    "message": "1"
  }
}
```

### Mapeamento de respostas -> status

| buttonId | Status novo |
|----------|-------------|
| CONFIRMO | CONFIRMADA |
| NAO_POSSO | NAO_POSSO |
| ESTOU_A_CAMINHO | EM_ANDAMENTO |
| JA_CHEGUEI | EM_ANDAMENTO |
| ESTOU_COM_PROBLEMA | SUBSTITUICAO_NECESSARIA |
| AUDIENCIA_SIM | CONCLUIDA |
| AUDIENCIA_NAO | CONCLUIDA |
| AUDIENCIA_REMARCADA | AGENDADA |

## Regras operacionais implementadas

- Respostas duplicadas sao ignoradas quando chegam com mesmo `messageId` (idempotencia basica).
- Resposta `NAO_POSSO` no D-1 marca indisponibilidade, mas nao abre substituicao imediatamente.
- Resposta `NAO_POSSO` na reiteração 6h abre `substituicao` com status `ABERTA` (se ainda nao existir).
- Resposta `ESTOU_COM_PROBLEMA` no check-in abre `substituicao` com status `ABERTA`.
- Toda resposta recebida gera mensagem de retorno automatica ao preposto (acknowledgement).
- Para evitar disparos indevidos apos indisponibilidade/conclusao, a orquestracao pendente da audiencia e removida em:
  - `NAO_POSSO` (somente quando vier da reiteração 6h)
  - `ESTOU_COM_PROBLEMA`
  - `AUDIENCIA_SIM`
  - `AUDIENCIA_NAO`
  - `AUDIENCIA_REMARCADA`

## Auditoria (tabela de log)

Todos os eventos de automacao sao gravados em `logs_automacao`:
- `AGENDAMENTO` / `REMOCAO_AGENDAMENTO` (scheduler)
- `DISPARO` / `DISPARO_IGNORADO` (worker/manual)
- `RESPOSTA_RECEBIDA` / `RESPOSTA_CONFIRMADA` (webhook)
- `SUBSTITUICAO_ABERTA`
- `ERRO`

## Endpoint de observabilidade do worker/fila

`GET /api/v1/webhooks/workers/status`

Resposta esperada:

```json
{
  "ok": true,
  "worker": "embutido-no-backend",
  "fila": {
    "fila": "orquestracao-audiencias",
    "waiting": 0,
    "active": 0,
    "delayed": 0,
    "completed": 0,
    "failed": 0,
    "paused": 0
  },
  "timestamp": "2026-02-12T17:00:00.000Z"
}
```

## Worker — Configuracao tecnica

| Parametro | Valor |
|-----------|-------|
| Nome da fila | `orquestracao-audiencias` |
| Concorrencia | 5 |
| Tentativas | 3 |
| Delay minimo | 5 segundos |
| ID do job | `{TIPO}--{audienciaId}` (ex: `CONFIRMACAO_D1--uuid-123`) |

### Disparo manual

Alem do agendamento automatico, disparos podem ser feitos manualmente via:

- `POST /api/v1/audiencias/:id/disparos/d1`
- `POST /api/v1/audiencias/:id/disparos/check-in`
- `POST /api/v1/audiencias/:id/disparos/pos-audiencia`

Esses endpoints usam o mesmo `processarOrquestracaoAudiencia()` do worker, gerando a mesma trilha de auditoria.

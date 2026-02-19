# Database — Freedom.AI Operational Hub (POC)

Modelagem do banco PostgreSQL via Prisma.

## Diagrama de Relacionamentos (alto nível)

```
                     Usuario (auth)

Importacao (1) ──┬─ (N) Audiencia (N) ──── (1) Preposto
                 │        │    │                 │
           (opcional)     │    └── (N)─(1) Trt   │
                          │ (1)                   │
                          ├──── (N) Mensagem      │
                          ├──── (N) HistoricoStatus
                          ├──── (1) RelatorioAudiencia
                          ├──── (N) Substituicao ─┘
                          └──── (N) LogAutomacao
                          │
                     (N)  │  (1)
                     Parceiro ──── (N) ContatoParceiro

ConfiguracaoGlobal (singleton)
```

## Entidades

### Audiencia (entidade central)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| numeroProcesso | String | Número do processo |
| reclamante | String? | Reclamante |
| reclamada | String? | Reclamada |
| tipoAudiencia | String? | Tipo |
| data | DateTime | Data |
| hora | String | Horário |
| modalidade | Enum | PRESENCIAL / ONLINE |
| comarca | String? | Comarca |
| advogado | String? | Advogado |
| contatoAdvogado | String? | Contato do advogado |
| correspondente | String? | Correspondente |
| local | String? | Local físico |
| link | String? | Link (se online) |
| trtId | FK → Trt | TRT |
| vara | String? | Vara |
| status | Enum | Status do workflow |
| prepostoId | FK → Preposto | Preposto |
| parceiroId | FK → Parceiro | Parceiro |
| importacaoId | FK → Importacao? | Lote (nullable) |
| observacoes | String? | Observações |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Atualização |

### Trt

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| numero | String | Número do TRT (único) |
| nome | String | Nome completo |
| ativo | Boolean | Ativo na POC |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Atualização |

### Preposto

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nome | String | Nome |
| telefoneWhatsapp | String | WhatsApp (único) |
| email | String? | E-mail |
| cpf | String? | CPF |
| ativo | Boolean | Ativo |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Atualização |

### Parceiro

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nome | String | Nome |
| ativo | Boolean | Ativo |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Atualização |

### ContatoParceiro

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| parceiroId | FK → Parceiro | Parceiro |
| nome | String | Nome |
| telefoneWhatsapp | String | WhatsApp |
| email | String? | E-mail |
| cargo | String? | Cargo |
| ordemEscalonamento | Int | Ordem |
| createdAt | DateTime | Criação |

### Importacao

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nomeArquivo | String | Nome do arquivo |
| totalRegistros | Int | Total de linhas |
| registrosImportados | Int | Importadas |
| registrosIgnorados | Int | Ignoradas |
| mapeamentoColunas | Json? | Mapeamento |
| status | Enum | PROCESSANDO / CONCLUIDA / ERRO |
| erros | Json? | Erros por linha |
| createdAt | DateTime | Criação |

### Mensagem

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência |
| prepostoId | FK → Preposto? | Preposto |
| contatoParceiroId | FK → ContatoParceiro? | Contato |
| tipo | Enum | Tipo da mensagem |
| direcao | Enum | ENVIADA / RECEBIDA |
| conteudo | String | Texto |
| respostaBotao | String? | Resposta |
| observacao | String? | Observação |
| whatsappMessageId | String? | ID do provider |
| statusEnvio | Enum | PENDENTE/ENVIADA/ENTREGUE/LIDA/FALHA |
| createdAt | DateTime | Criação |

### RelatorioAudiencia

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência (único) |
| audienciaOcorreu | Enum? | SIM/NAO/REMARCADA |
| resultado | Enum? | ACORDO/SEM_ACORDO/AUSENCIA/REDESIGNADA |
| advogadoPresente | Boolean? | Presença |
| advogadoDominioCaso | Boolean? | Domínio |
| problemaRelevante | Boolean? | Problema |
| relato | String? | Observação livre |
| createdAt | DateTime | Criação |

### HistoricoStatus

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência |
| statusAnterior | Enum | Status anterior |
| statusNovo | Enum | Status novo |
| motivo | String? | Motivo |
| atualizadoPor | String | Origem |
| createdAt | DateTime | Criação |

### Substituicao

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência |
| prepostoAnteriorId | FK → Preposto | Preposto anterior |
| prepostoNovoId | FK → Preposto? | Novo preposto |
| motivo | String | Motivo |
| status | Enum | ABERTA/RESOLVIDA/CANCELADA |
| createdAt | DateTime | Criação |
| resolvidoEm | DateTime? | Resolução |

### ConfiguracaoGlobal (singleton)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String | PK fixa (`singleton`) |
| enviarAvisoNaImportacao | Boolean | Toggle de disparo |
| horarioD1 | String? | HH:mm (fixo) |
| antecedenciaD1Horas | Int | Default 24 |
| antecedenciaReiteracaoHoras | Int | Default 6 |
| antecedenciaCheckinMinutos | Int | Default 60 |
| posAudienciaMinutosDepois | Int | Default 30 |
| fusoHorario | String | Fuso |
| mensagemD1 | String? | Template |
| mensagemReiteracao | String? | Template |
| mensagemCheckin | String? | Template |
| mensagemPosAudiencia | String? | Template |
| respostaD1Confirmacao | String? | Template |
| respostaReiteracaoConfirmacao | String? | Template |
| respostaCheckinConfirmacao | String? | Template |
| respostaPosAudienciaConfirmacao | String? | Template |
| mensagemPosPergunta2..6 | String? | Templates |
| updatedAt | DateTime | Atualização |

### LogAutomacao

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência |
| origem | String | Origem do evento |
| evento | String | Tipo de evento |
| etapa | String? | Etapa |
| status | String? | Status |
| mensagem | String | Descrição |
| metadados | Json? | Payload |
| createdAt | DateTime | Criação |

### Usuario

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nome | String | Nome |
| email | String | E-mail (único) |
| senha | String | Hash bcrypt |
| role | Enum | ADMIN/OPERADOR/GESTOR |
| ativo | Boolean | Ativo |
| resetToken | String? | Token reset (único) |
| resetTokenExpiraEm | DateTime? | Expiração |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Atualização |

## Enums

### RoleUsuario
```
ADMIN
OPERADOR
GESTOR
```

### StatusAudiencia
```
IMPORTADA
AGENDADA
A_CONFIRMAR
CONFIRMADA
NAO_POSSO
SEM_RESPOSTA
SUBSTITUICAO_NECESSARIA
EM_ANDAMENTO
CHECK_IN_PENDENTE
RELATORIO_PENDENTE
CONCLUIDA
CANCELADA
```

### Modalidade
```
PRESENCIAL
ONLINE
```

### TipoMensagem
```
CONFIRMACAO_D1
REITERACAO_H1H30    # nome legado (regra real é reiteração configurável)
CHECK_IN
RELATORIO_POS
SUBSTITUICAO_AVISO
ESCALONAMENTO
```

### DirecaoMensagem
```
ENVIADA
RECEBIDA
```

### StatusEnvioMensagem
```
PENDENTE
ENVIADA
ENTREGUE
LIDA
FALHA
```

### StatusImportacao
```
PROCESSANDO
CONCLUIDA
ERRO
```

### OcorrenciaAudiencia
```
SIM
NAO
REMARCADA
```

### ResultadoAudiencia
```
ACORDO
SEM_ACORDO
AUSENCIA
REDESIGNADA
```

### StatusSubstituicao
```
ABERTA
RESOLVIDA
CANCELADA
```

## Índices Importantes

- `Audiencia.data`
- `Audiencia.status`
- `Audiencia.trtId`
- `Audiencia.prepostoId`
- `Audiencia.parceiroId`
- `Mensagem.audienciaId`
- `Mensagem.whatsappMessageId`
- `HistoricoStatus.audienciaId`
- `LogAutomacao.audienciaId, createdAt`

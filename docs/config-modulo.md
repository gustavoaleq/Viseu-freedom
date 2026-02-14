# Modulo de Configuracoes

Documentacao do modulo de configuracoes globais do Freedom.AI Hub.

## Visao Geral

Modulo ADMIN-only que parametriza regras de envio WhatsApp e orquestracao de audiencias.
Antes deste modulo, todos os valores estavam fixos em variaveis de ambiente (`env.ts`).
Agora sao editaveis pela interface em `/configuracoes`, persistidos em banco e aplicados em tempo real.

## Campos e Funcionalidade

### Secao: Disparo na Importacao

| Campo | Tipo | Default | O que faz |
|-------|------|---------|-----------|
| **Enviar aviso ao preposto na importacao** | Toggle (on/off) | `Ativado` | Quando ativado, ao confirmar uma importacao de planilha, o sistema agenda automaticamente todos os jobs de orquestracao (D-1, reiteracao, check-in, pos-audiencia) para cada audiencia criada. Quando desativado, as audiencias sao criadas mas nenhum disparo automatico e agendado — o operador precisara disparar manualmente pela tela de detalhe. |

### Secao: Confirmacao D-1

| Campo | Tipo | Default | O que faz |
|-------|------|---------|-----------|
| **Horario fixo para envio D-1** | Input HH:mm (opcional) | `Vazio` (usa antecedencia) | Se preenchido, a confirmacao D-1 sera enviada no dia anterior a audiencia exatamente neste horario (ex: `09:00` = sempre as 9h do dia anterior). Se vazio, o sistema usa a antecedencia em horas abaixo. |
| **Antecedencia D-1 (horas)** | Input numerico | `24` | Quantidade de horas antes da audiencia para enviar a confirmacao D-1. So e usado quando o horario fixo acima esta vazio. Exemplo: audiencia as 15:00 com antecedencia 24h = D-1 enviado as 15:00 do dia anterior. |

### Secao: Reiteracao

| Campo | Tipo | Default | O que faz |
|-------|------|---------|-----------|
| **Antecedencia da reiteracao (horas)** | Input numerico | `6` | Horas antes da audiencia para enviar a segunda confirmacao (reiteracao). So dispara se o preposto nao respondeu ao D-1 ou se respondeu "Nao posso" no D-1. Exemplo: audiencia as 15:00 com 6h = reiteracao as 09:00 do mesmo dia. |

### Secao: Check-in

| Campo | Tipo | Default | O que faz |
|-------|------|---------|-----------|
| **Antecedencia do check-in (minutos)** | Input numerico | `60` | Minutos antes da audiencia para enviar o check-in ao preposto perguntando se ja chegou/esta a caminho. Exemplo: audiencia as 15:00 com 60min = check-in as 14:00. |

### Secao: Checkout Pos-Audiencia

| Campo | Tipo | Default | O que faz |
|-------|------|---------|-----------|
| **Tempo apos audiencia para checkout (minutos)** | Input numerico | `30` | Minutos apos o horario da audiencia para enviar o questionario de checkout (pos-audiencia) ao preposto. Exemplo: audiencia as 15:00 com 30min = checkout as 15:30. |

### Secao: Fuso Horario

| Campo | Tipo | Default | O que faz |
|-------|------|---------|-----------|
| **Fuso horario da operacao** | Select | `America/Sao_Paulo` | Fuso horario usado para calcular todos os agendamentos. Afeta D-1, reiteracao, check-in e pos-audiencia. Opcoes: `America/Sao_Paulo`, `America/Manaus`, `America/Recife`, `America/Belem`, `America/Cuiaba`. |

### Secao: Mensagens de Envio

Templates das mensagens WhatsApp personalizaveis pelo escritorio. Quando o campo esta vazio (null), o sistema usa o template default hardcoded. Cada campo aceita texto livre com variaveis no formato `{{variavel}}`.

| Campo | Tipo | Default | O que faz |
|-------|------|---------|-----------|
| **Mensagem D-1** | Textarea | `Ola {{nomePreposto}}. Temos audiencia do processo {{numeroProcesso}} em {{data}} as {{hora}}. Local/link: {{local}}. Voce ira participar?` | Texto enviado na confirmacao D-1. |
| **Mensagem de Reiteracao** | Textarea | `Ola {{nomePreposto}}. Reiterando a audiencia do processo {{numeroProcesso}} em {{data}} as {{hora}}. Local/link: {{local}}. Voce ira participar? Apenas para confirmarmos.` | Texto da segunda tentativa de confirmacao (reiteracao). |
| **Mensagem de Check-in** | Textarea | `Check-in da audiencia {{numeroProcesso}} hoje as {{hora}}. Chegou no local?` | Texto enviado no check-in antes da audiencia. |
| **Mensagem Pos-Audiencia** | Textarea | `Checkout pos-audiencia do processo {{numeroProcesso}}. Pergunta 1/6: A audiencia ocorreu?` | Texto enviado apos a audiencia para coletar relatorio. |

#### Variaveis Disponiveis

| Variavel | Descricao | Exemplo |
|----------|-----------|---------|
| `{{nomePreposto}}` | Nome do preposto designado | Joao Silva |
| `{{numeroProcesso}}` | Numero do processo judicial | 0001234-56.2025.5.02.0001 |
| `{{data}}` | Data da audiencia (DD/MM/AAAA) | 15/02/2026 |
| `{{hora}}` | Horario da audiencia | 14:30 |
| `{{local}}` | Local ou link da audiencia | Forum Central - Sala 5 |
| `{{escritorioParceiro}}` | Nome do escritorio parceiro | Viseu Advogados |
| `{{trt}}` | Numero do TRT | 2 |

- Variaveis nao reconhecidas sao mantidas literalmente no texto (ex: `{{inexistente}}` aparece como `{{inexistente}}`).
- Botao "Restaurar padrao" por campo permite voltar ao template original sem afetar outros campos.
- Minimo de 10 caracteres por mensagem (validacao Zod).

## Comportamento ao Salvar

1. As configuracoes sao persistidas no banco imediatamente.
2. Todos os jobs futuros (status `delayed` no BullMQ) sao **reagendados** automaticamente com os novos parametros.
3. Jobs ja executados ou em execucao nao sao afetados.
4. O reagendamento usa o mesmo mecanismo de upsert do scheduler (remove job antigo + cria novo), sem risco de duplicidade.
5. Um log de auditoria e gravado em `logs_automacao` para cada reagendamento.

## Regras de Validacao

- Horario D-1: formato `HH:mm` (00:00 a 23:59) ou vazio.
- Antecedencia D-1: minimo 1 hora, maximo 72 horas.
- Antecedencia reiteracao: minimo 1 hora, maximo 48 horas.
- Antecedencia check-in: minimo 10 minutos, maximo 360 minutos.
- Pos-audiencia: minimo 5 minutos, maximo 180 minutos.
- Fuso horario: valor da lista fixa de fusos brasileiros.

## Permissao

- Somente usuarios com role `ADMIN` podem acessar a tela e os endpoints.
- Frontend oculta o item de menu para nao-admins.
- Backend rejeita com `403` qualquer request de nao-admin.

## Persistencia

Tabela `configuracao_global` no PostgreSQL — modelo singleton (uma unica linha, criada automaticamente na primeira leitura se nao existir).

## Compatibilidade

- Variaveis de ambiente `ORQ_*` continuam funcionando como fallback na inicializacao dos defaults.
- Se o banco nao tiver configuracao salva, o sistema cria automaticamente com os defaults equivalentes ao comportamento anterior.
- Nenhum fluxo existente e quebrado: D-1, reiteracao, check-in, pos-audiencia, substituicao e escalonamento continuam funcionando identicamente.

## Plano de Implementacao

### Etapa 1 — Modelo de dados
- Adicionar model `ConfiguracaoGlobal` no Prisma schema (tabela singleton).
- Criar migration.

### Etapa 2 — Backend service + routes
- `configuracoes.service.ts`: obter (com auto-create), atualizar, cache in-memory 30s.
- `configuracoes.routes.ts`: GET + PATCH, ADMIN only, validacao Zod.
- Registrar rota em `app.ts`.

### Etapa 3 — Integracao com orquestracao
- Scheduler le configuracoes do banco (cacheado) em vez de `env.ORQ_*`.
- Import service checa toggle `enviarAvisoNaImportacao` antes de agendar.

### Etapa 4 — Reagendamento ao salvar
- PATCH recalcula jobs pendentes de audiencias ativas.

### Etapa 5 — Frontend
- Pagina `ConfiguracoesPage.tsx`, API client, menu e rota.

### Etapa 6 — Validacao e documentacao
- Build backend/frontend, atualizar workers.md e CODEX.md.

## Arquivos Impactados

| Acao | Arquivo |
|------|---------|
| Novo | `backend/src/services/configuracoes.service.ts` |
| Novo | `backend/src/routes/configuracoes.routes.ts` |
| Novo | `backend/src/prisma/migrations/.../migration.sql` |
| Novo | `frontend/src/pages/ConfiguracoesPage.tsx` |
| Alterado | `backend/src/prisma/schema.prisma` |
| Alterado | `backend/src/app.ts` |
| Alterado | `backend/src/jobs/orquestracao.scheduler.ts` |
| Alterado | `backend/src/services/importacoes.service.ts` |
| Alterado | `frontend/src/App.tsx` |
| Alterado | `frontend/src/components/AppShell.tsx` |
| Alterado | `frontend/src/services/hub.ts` |
| Alterado | `workers.md`, `CODEX.md` |

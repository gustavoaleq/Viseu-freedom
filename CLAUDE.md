# CLAUDE.md

Este arquivo registra contexto e diretrizes para o agente no repositorio.

## Contexto do Projeto

**Freedom.AI Operational Hub** - POC de plataforma de gestao operacional juridica para o Viseu Advogados.

Premissa central:
- O Hub e um sistema completo e autonomo.
- A importacao de planilha e atalho para entrada em massa, nao fluxo obrigatorio.

Toda comunicacao e codigo em **pt-BR**.

## Papel do Agente

Atuar como arquiteto de desenvolvimento junto ao desenvolvedor (perfil junior), com metodo:

**Pesquisa -> Planeja -> Implementa -> Valida**

Decisoes arquiteturais relevantes devem ser registradas neste arquivo e/ou em `arquitetura.md`.

## Stack Definida

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + TypeScript + Vite + Tailwind CSS v4 |
| Backend | Node.js + Fastify + TypeScript (ESM) |
| Banco | PostgreSQL 16 |
| ORM | Prisma 7 (`prisma.config.ts`) |
| Filas | BullMQ + Redis |
| Validacao | Zod |
| Containers | Docker Compose (frontend/nginx, backend, postgres, redis) |

## Decisoes Fechadas em 11/02/2026

1. **Hub manual first**
- O sistema deve operar manualmente de ponta a ponta (cadastros, operacao e acoes).
- Importacao continua existindo como acelerador de produtividade.

2. **Canal de mensageria para POC**
- WhatsApp Business API oficial fica para fase posterior.
- Na POC, comunicacao sera simulada/integrada via **n8n** (preferencial) para testes de fluxo.
- Dify pode ser usado como fallback, mas n8n e preferido por ser mais aderente a orquestracao deterministica.

3. **Orquestracao de jobs**
- Manter estrategia de **BullMQ com jobs por audiencia** (coerente com a arquitetura ja definida).

4. **Importacao recomendada**
- Adotar pipeline assincrono: **upload -> mapeamento -> preview -> confirmar**.
- Motivo: melhor controle de validacao, erros por linha e previsibilidade operacional.

## Estado Atual (Codigo) — atualizado 18/02/2026

### Concluido (backend + frontend + Docker)
- Setup completo: frontend (React/Vite/Tailwind v4), backend (Fastify/TS/ESM), Docker Compose (5 servicos: frontend/nginx, backend, postgres, redis, db_backup)
- Modelagem Prisma completa (13+ entidades incluindo `logs_automacao`, `configuracao_global`), migrations aplicadas e seed (admin + TRTs)
- Auth backend (JWT + bcrypt): `/api/v1/auth/login`, `/me`, `/logout`
- Backend CRUD completo: audiencias, prepostos, parceiros/contatos, trts, usuarios, importacoes, webhooks
- Backend acoes de audiencia: trocar-preposto, check-in, relatorio, cancelar, confirmar-telefone, export CSV/XLSX, download relatorio pos-audiencia (HTML)
- Import pipeline completo: upload -> mapear (auto-detect com aliases e coluna composta) -> preview (validacao por linha) -> confirmar
- Frontend operacional: login, dashboard (KPIs + monitoramento semanal + SLA + pos-relatorio), lista/kanban/detalhe audiencias, prepostos, parceiros, importacoes, usuarios, TRTs, configuracoes (ADMIN)
- Frontend check-in: 3 botoes funcionais com observacao opcional em AudienciaDetalhePage
- Frontend relatorio pos-audiencia: formulario completo + download em AudienciaDetalhePage
- Frontend export XLSX: botao conectado no header de AudienciasListPage
- Frontend parceiros: CRUD completo com sub-secao de contatos inline (escalonamento, edicao e exclusao)
- Frontend prepostos: edicao inline (nome, telefone, email)
- Design system Freedom aplicado (paleta yellow/neutral, tipografia Inter, tokens semanticos)
- Contrato OpenAPI formal em `docs/openapi.yaml` (40+ endpoints)
- Stack Docker validada: frontend (nginx:3000), backend (3001), postgres, redis
- Busca global no cabecalho conectada a lista de audiencias
- Endpoints para agente Dify em `/api/v1/agent` (resumo, audiencias do dia, filtros, indicadores)

### Orquestracao WhatsApp — funcional e validada em producao
- Provider `zapi`: `send-button-list` (botoes nativos) como primario, fallback `send-button-actions`, fallback final `send-text` com opcoes numeradas
- Provider `cloud` (Meta) e `webhook` (generico) tambem suportados
- Fila BullMQ + scheduler + worker para 4 etapas: D-1, reiteracao 6h, check-in e pos-audiencia
- **Scheduler com logica de catch-up**: quando horario do job ja passou mas audiencia ainda e futura, dispara o primeiro job pendente imediatamente (evita perder D-1)
- **Disparo imediato D-1 na criacao/importacao**: flag `dispararD1Imediato` forca D-1 com delay minimo (5s) quando toggle `enviarAvisoNaImportacao` esta ativo. Usa mesmo job ID, sem duplicacao
- Agendamento automatico conectado em criacao manual e importacao de audiencias
- Endpoints manuais: `POST /audiencias/:id/disparos/d1`, `POST /audiencias/:id/disparos/check-in`, `POST /audiencias/:id/disparos/pos-audiencia`, `POST /audiencias/:id/disparos/reiteracao-6h`
- Frontend: 4 botoes de disparo manual WhatsApp na tela de detalhe com feedback visual
- **Prerequisito Z-API**: modo botao deve estar ativado no painel da instancia
- Entrada de respostas WhatsApp implementada via `POST /api/v1/webhooks/whatsapp`:
  - parse de `buttonId` e fallback de texto numerico (`1/2/3`)
  - atualizacao automatica de status de audiencia
  - registro em `mensagens` (RECEBIDA) e `historico_status`
  - abertura automatica de `substituicao` para indisponibilidade
  - resposta automatica ao preposto apos cada interacao
- Reiteracao 6h: dispara quando nao houve resposta ou ultima resposta foi `NAO_POSSO`; 2o `NAO_POSSO` na reiteracao abre substituicao
- Checkout pos-audiencia via WhatsApp: sequencia de 6 perguntas (ocorrencia -> resultado -> advogado -> dominio -> problema -> observacao), com persistencia incremental e conclusao automatica
- Escalonamento automatico de substituicao:
  - Notifica contatos Viseu (parceiro interno) + 1o contato do parceiro da audiencia
  - Parceiro indica substituto via WhatsApp (nome -> telefone em 2 etapas)
  - Sistema cria/atualiza preposto, resolve substituicao, troca preposto e dispara D-1 ao novo
  - Anti-dupla-substituicao e notificacao cruzada apos resolucao
  - Dispara em qualquer entrada em `SUBSTITUICAO_NECESSARIA` (webhook, check-in manual, mudanca manual de status)
- Auditoria em `logs_automacao`: eventos de agendamento, disparo, resposta, substituicao
- Endpoint de observabilidade: `GET /api/v1/webhooks/workers/status` (contadores da fila BullMQ)

### Modulo de Configuracoes (ADMIN) — entregue 13/02/2026
- Tabela `configuracao_global` (singleton PostgreSQL) com parametros operacionais extensos
- Backend: `GET /api/v1/configuracoes` e `PATCH /api/v1/configuracoes` (ADMIN only, Zod)
- Scheduler le configuracoes do banco (cache 30s) em vez de env vars fixas
- Toggle `enviarAvisoNaImportacao` controla disparo automatico na importacao e criacao manual
- Suporte a horario fixo D-1 (`horarioD1` HH:mm) ou antecedencia em horas
- Reagendamento automatico de jobs ao salvar alteracoes de timing
- Templates de mensagem WhatsApp personalizaveis (D-1, reiteracao, check-in, pos-audiencia) com variaveis (`{{nomePreposto}}`, `{{data}}`, etc.)
- Templates de perguntas do checkout (Q2 a Q6) configuraveis
- Respostas de confirmacao configuraveis por etapa
- Frontend: tela `/configuracoes` com secoes de importacao, D-1, reiteracao, check-in, checkout, mensagens, fuso horario
- Menu `Configuracoes` visivel apenas para ADMIN
- Documentacao completa em `docs/config-modulo.md`

### Sidebar POC Scope — entregue 18/02/2026
- Contador de audiencias (0/500) com barra de progresso no menu lateral
- Timer de 30 dias corridos a partir de 25/02/2026 com barra de progresso
- Dados vindos do dashboard API (`totalAudiencias` conta todas audiencias incluindo concluidas/canceladas)
- Cores adaptativas: verde/amarelo/vermelho conforme proximidade do limite

### Parcialmente feito
- TRTs admin: tela dedicada no frontend entregue com regra travada (somente TRT 2 e 15 ativos)
- Fluxo de esqueci senha/redefinir senha: migration criada, email service (Resend) implementado, paginas frontend criadas (`EsqueciSenhaPage`, `RedefinirSenhaPage`), auth routes/service atualizados — aguardando validacao funcional

## Proximos Passos Prioritarios — 18/02/2026

1. **Validacao final contra criterios de aceite da POC**
   - Importar planilha e gerar audiencias (feito)
   - Disparar D-1 e registrar resposta (feito)
   - Reiterar 6h antes e abrir substituicao (feito)
   - Notificar automaticamente Viseu + parceiro (feito)
   - Trocar preposto e reenviar para novo (feito)
   - Coletar relatorio pos-audiencia (feito)
   - Logging e trilha de auditoria (feito)
   - **Pendente**: teste E2E completo em ambiente limpo com webhook publico real

2. **Refinamentos antes do go-live**
   - Validar fluxo de esqueci senha/redefinir senha com envio real de email (Resend)
   - Confirmar limite de 500 audiencias/30 dias como trava tecnica (atualmente apenas indicador visual)
   - Ajustes finais de UX conforme feedback do cliente

## Comandos de Desenvolvimento

Frontend (`frontend/`)
```bash
npm run dev
npm run build
```

Backend (`backend/`)
```bash
npm run dev
npm run build
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:seed
```

Docker
```bash
docker-compose up
docker-compose up postgres redis
```

## Notas Tecnicas

- Prisma 7: URL de conexao em `backend/prisma.config.ts` e `.env`
- Backend ESM: imports com extensao `.js`
- Frontend TS: preferir objetos `as const` em vez de `enum`
- Integracao WhatsApp oficial fica desacoplada por adapter para troca futura sem refatoracao de dominio
- Z-API: modo botao deve estar ativado no painel da instancia para botoes nativos funcionarem. Adapter usa send-button-list -> send-button-actions -> send-text (fallback)

## Referencias

- `README.md`
- `CODEX.md`
- `arquitetura.md`
- `database.md`
- `docs/ESCOPO POC VIZEU (1).docx`

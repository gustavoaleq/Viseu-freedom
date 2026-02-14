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

## Estado Atual (Codigo) — atualizado 12/02/2026

### Concluido (backend + frontend + Docker)
- Setup completo: frontend (React/Vite/Tailwind v4), backend (Fastify/TS/ESM), Docker Compose (4 servicos)
- Modelagem Prisma completa (11 entidades), migrations aplicadas e seed (admin + TRTs)
- Auth backend (JWT + bcrypt): `/api/v1/auth/login`, `/me`, `/logout`
- Backend CRUD completo: audiencias, prepostos, parceiros/contatos, trts, usuarios, importacoes, webhooks
- Backend acoes de audiencia: trocar-preposto, check-in, relatorio, cancelar, confirmar-telefone, export
- Import pipeline completo: upload -> mapear (auto-detect) -> preview (validacao por linha) -> confirmar
- Frontend operacional: login, dashboard (KPIs), lista/kanban/detalhe audiencias, prepostos, parceiros, importacoes, usuarios
- Frontend check-in: 3 botoes funcionais (Estou a caminho / Ja cheguei / Estou com problema) em AudienciaDetalhePage
- Frontend relatorio pos-audiencia: formulario completo em AudienciaDetalhePage
- Frontend export CSV/XLSX: botoes conectados no header de AudienciasListPage
- Frontend parceiros: CRUD completo com sub-secao de contatos inline (escalonamento)
- Design system Freedom aplicado (paleta yellow/neutral, tipografia Inter, tokens semanticos)
- Contrato OpenAPI formal em `docs/openapi.yaml` (40+ endpoints)
- Stack Docker validada: frontend (nginx:3000), backend (3001), postgres, redis

### Parcialmente feito
- TRTs admin: tela dedicada no frontend entregue com regra travada (somente TRT 2 e 15 ativos)
- Orquestracao WhatsApp entregue com adapter Z-API validado em producao:
  - Provider `zapi`: `send-button-list` (botoes nativos) como primario, fallback `send-button-actions`, fallback final `send-text` com opcoes numeradas.
  - Provider `cloud` (Meta) e `webhook` (generico) tambem suportados
  - Fila BullMQ + scheduler + worker para D-1, check-in e pos-audiencia
  - Agendamento automatico conectado em criacao manual e importacao de audiencias
  - Endpoints manuais: `POST /audiencias/:id/disparos/d1`, `POST /audiencias/:id/disparos/check-in`, `POST /audiencias/:id/disparos/pos-audiencia`
  - **Prerequisito Z-API**: modo botao deve estar ativado no painel da instancia. Sem isso, botoes retornam 200 mas WhatsApp descarta silenciosamente.
  - Frontend: 3 botoes de disparo manual WhatsApp na tela de detalhe (D-1, check-in, pos-audiencia) com feedback visual
  - Testes operacionais completos em `docs/testes-whatsapp.http` (direto Z-API + via backend)
  - Entrada de respostas WhatsApp implementada via `POST /api/v1/webhooks/whatsapp`:
    - parse de `buttonId` e fallback de texto numerico (`1/2/3`)
    - atualizacao automatica de status de audiencia
    - registro em `mensagens` (RECEBIDA) e `historico_status`
    - abertura automatica de `substituicao` para indisponibilidade (`NAO_POSSO`/`ESTOU_COM_PROBLEMA`)
  - Endpoint de observabilidade operacional: `GET /api/v1/webhooks/workers/status` (contadores da fila BullMQ)

### Nao iniciado
- **Job de reiteracao H-1h30**: ainda nao implementado
- **Fluxo automatico de substituicao completo**: notificar Viseu + parceiro, escalonamento e reenvio ao novo preposto

### Modulo de Configuracoes (ADMIN) — entregue 13/02/2026
- Tabela `configuracao_global` (singleton PostgreSQL) com 7 parametros operacionais
- Backend: `GET /api/v1/configuracoes` e `PATCH /api/v1/configuracoes` (ADMIN only, Zod)
- Scheduler le configuracoes do banco (cache 30s) em vez de env vars fixas
- Toggle `enviarAvisoNaImportacao` controla disparo automatico na importacao
- Suporte a horario fixo D-1 (`horarioD1` HH:mm) ou antecedencia em horas (mantido)
- Reagendamento automatico de jobs ao salvar alteracoes de timing
- Frontend: tela `/configuracoes` com 6 secoes, visivel apenas para ADMIN
- Documentacao completa em `docs/config-modulo.md`

## Proximos Passos Prioritarios — 12/02/2026

1. **Fechar automacao WhatsApp da POC** (core do valor)
   - Envio real validado com botoes nativos clicaveis via Z-API send-button-list
   - Entrada de webhook concluida: respostas atualizam status e timeline automaticamente
   - Adicionar job H-1h30 e fluxo de substituicao automatica
   - Consolidar trilha de mensagens/status para auditoria operacional

3. **Validacao final contra criterios de aceite**
   - Importar planilha e gerar audiencias (feito)
   - Disparar D-1 e registrar resposta
   - Reiterar H-1h30 e abrir substituicao
   - Notificar automaticamente Viseu + parceiro
   - Trocar preposto e reenviar para novo
   - Coletar relatorio pos-audiencia
   - Rodar com logging e trilha de auditoria

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

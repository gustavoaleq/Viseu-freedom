# Arquitetura — Freedom.AI Operational Hub (POC)

Este documento descreve a arquitetura real do projeto, componentes, fluxos e decisões essenciais para entendimento e evolução.

## Visão Geral

O Freedom.AI Hub é um sistema operacional **manual-first** para gestão de audiências trabalhistas. A importação é apenas um acelerador. O backend orquestra fluxos de comunicação via WhatsApp, registra auditoria completa e expõe API REST para o frontend.

## Componentes e Responsabilidades

- **Frontend (React/Vite)**: SPA operacional (dashboard, listas, kanban, detalhe, configuração e administração)
- **Backend API (Fastify)**: autenticação, regras de negócio, importação, dashboards e ações operacionais
- **Worker de Orquestração (BullMQ)**: execução de jobs agendados por audiência
- **PostgreSQL (Prisma)**: persistência relacional e trilha de auditoria
- **Redis**: backend da fila BullMQ

## Backend — Organização por Camadas

```
backend/src/
├── routes/       # Endpoints REST
├── services/     # Regras de negócio
├── jobs/         # Scheduler, worker e processor de orquestração
├── config/       # Env, database, constants
├── prisma/       # Schema e migrations
└── server.ts     # bootstrap
```

O fluxo principal segue: `route -> service -> banco` e, quando aplicável, agenda/dispara jobs via BullMQ.

## Orquestração de Mensagens

A orquestração é feita por audiência, com jobs persistidos em Redis.

- **D‑1**: confirmação da audiência
- **Reiteração**: segunda tentativa configurável (default 6h antes)
- **Check‑in**: antes da audiência
- **Pós‑audiência**: coleta de relatório

Características importantes:

- **Catch‑up**: se o horário já passou mas a audiência ainda é futura, o primeiro job pendente dispara imediatamente
- **Disparo imediato D‑1**: ao criar/importar com toggle ativo, dispara D‑1 com delay mínimo
- **Reagendamento automático**: ao salvar configurações globais, todos os jobs pendentes são recalculados

## WhatsApp: Adapter e Webhook

O envio é abstraído por adapter com suporte a `zapi`, `cloud` e `webhook`.

- Cadeia de fallback para botões: `send-button-list` → `send-button-actions` → `send-text`
- Webhook inbound atualiza status, registra mensagens recebidas, cria histórico e controla idempotência

## Substituição e Escalonamento

Quando o preposto sinaliza indisponibilidade, o sistema abre `substituicao` e escala contatos:

- Notifica Viseu (contatos internos)
- Notifica parceiro da audiência
- Coleta novo preposto por WhatsApp (nome + telefone)
- Atualiza audiência, fecha substituição e dispara novo D‑1

## Configurações Globais

Parâmetros de timing e templates de mensagem são editáveis pela interface admin e persistidos em `configuracao_global`.
O scheduler lê essas configurações e aplica em tempo real.

## Decisões Arquiteturais Essenciais

- **Manual-first**: operação completa sem importação
- **Backend desacoplado de provider**: troca de WhatsApp oficial no futuro sem refatorar domínio
- **Auditoria primeiro**: histórico de status, mensagens e logs de automação
- **Jobs por audiência**: previsibilidade e rastreabilidade operacional

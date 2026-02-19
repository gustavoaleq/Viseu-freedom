# Freedom.AI Operational Hub — Viseu (POC)

POC de um hub operacional para gestão de audiências trabalhistas do Viseu Advogados. O sistema é **manual-first**: toda operação pode ser feita sem importação, e a planilha é apenas um atalho para entrada em massa.

## Visão Geral

O Hub centraliza a operação de audiências (criação, acompanhamento, check-in e pós‑audiência), orquestra comunicações via WhatsApp (com fallback), e registra toda a trilha de auditoria. A POC foca nos TRTs 2 e 15.

## Principais Funcionalidades

- Operação manual completa de audiências, prepostos e parceiros
- Importação assíncrona de planilhas com mapeamento e validação por linha
- Orquestração automática de mensagens (D‑1, reiteração configurável, check‑in e pós‑audiência)
- Webhook inbound do WhatsApp com transições automáticas de status
- Fluxo de substituição com escalonamento e coleta de novo preposto via WhatsApp
- Configurações globais administrativas (timings e templates de mensagens)
- Dashboard operacional, lista, kanban e exportações

## Arquitetura em Alto Nível

```
Frontend (React/Vite)
        |
        v
Backend API (Fastify)
        |
        |-- PostgreSQL (Prisma)
        |-- Redis (BullMQ)
        v
Worker de Orquestração
```

## Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS v4
- Backend: Node.js + Fastify + TypeScript (ESM)
- Banco: PostgreSQL 16
- ORM: Prisma 7
- Filas: BullMQ + Redis
- Containers: Docker Compose

## Estrutura do Repositório

```
.
├── backend/              # API Fastify + jobs + services
├── frontend/             # SPA React
├── docs/                 # Documentação e contrato OpenAPI
├── docker-compose.yml    # Stack completa
├── arquitetura.md        # Visão arquitetural
├── database.md           # Modelagem do banco
├── workers.md            # Orquestração e WhatsApp

```

## Fluxos Operacionais (resumo)

- **D‑1 (Confirmação)**: lembrete para confirmar presença
- **Reiteração (configurável, default 6h)**: segunda tentativa se não houver resposta
- **Check‑in**: antes da audiência
- **Pós‑audiência**: coleta de relatório
- **Substituição**: abertura automática, escalonamento e troca de preposto

## Como Rodar

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

### Docker (stack completa)
```bash
docker-compose up --build
```

## Configurações

A orquestração é parametrizada em `configuracao_global` (via tela `/configuracoes`, ADMIN).
Há fallback por variáveis de ambiente no backend (`backend/.env`).

## Documentação

- `docs/openapi.yaml` — contrato oficial da API
- `arquitetura.md` — visão arquitetural detalhada
- `database.md` — modelo e enums do banco
- `workers.md` — orquestração, jobs e WhatsApp

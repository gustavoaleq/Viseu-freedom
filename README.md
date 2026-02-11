# Freedom.AI Operational Hub - Viseu (POC)

POC de um hub operacional para gestao de audiencias trabalhistas do Viseu Advogados.

## Objetivo

Construir um sistema que funcione de forma autonoma para operar audiencias, prepostos e parceiros, com ou sem importacao de planilha.

Regra central:
- O Hub deve operar 100% manualmente.
- A importacao de planilha e um atalho para entrada em massa.

## Escopo da POC

- Regioes foco: TRT 2 e TRT 15.
- Ciclo operacional: D-1, H-1h30, substituicao, check-in no dia, relatorio pos-audiencia.
- Painel operacional: lista/kanban, contadores, filtros e exportacao.

## Stack

- Frontend: React + TypeScript + Vite + Tailwind v4
- Backend: Node.js + Fastify + TypeScript
- Banco: PostgreSQL 16
- ORM: Prisma 7
- Filas: BullMQ + Redis
- Containers: Docker Compose

## Estado Atual

- Concluido: arquitetura macro e modelagem de banco (11 entidades)
- Concluido: schema Prisma, migration inicial e seed (TRTs + usuario admin)
- Concluido: backend com autenticacao JWT (`/auth/login`, `/auth/me`, `/auth/logout`)
- Concluido: backend de audiencias (lista, detalhe, criar, atualizar, kanban, dashboard, trocar preposto)
- Concluido: setup frontend com React Query, Router, cliente API e tipos
- Em andamento: implementacao completa do backend (modulos faltantes e orquestracao)
- Nao iniciado (funcional): telas React de operacao (frontend ainda em placeholder)

## Decisoes Fechadas (11/02/2026)

- O Hub e independente de importacao (manual first).
- Integracao oficial com WhatsApp Business API fica para depois da POC.
- Para simulacoes/testes da comunicacao, usar n8n como camada de automacao.
- Orquestracao por BullMQ com jobs por audiencia.
- Importacao recomendada: pipeline assincrono com upload + preview + confirmacao.

## Proxima Fase (Backend)

1. Modulos CRUD faltantes
- Prepostos, Parceiros/Contatos, TRTs, Usuarios (admin)

2. Importacao de planilha (assincrona)
- Upload, mapeamento, preview de validacao, confirmacao
- Filtro de processamento para TRT 2/15

3. Orquestracao e automacao
- Agendamentos D-1, H-1h30, check-in, relatorio pos
- Abertura de substituicao e notificacoes de escalonamento
- Adapter de notificacao para n8n (mock/simulacao)

4. Exportacao e trilha operacional
- Export xlsx/csv
- Logs e auditoria minima da POC

## Como Rodar

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

Docker (full stack):
```bash
docker-compose up --build
```

## Documentos de Referencia

- `CLAUDE.md`
- `CODEX.md`
- `arquitetura.md`
- `database.md`
- `docs/ESCOPO POC VIZEU (1).docx`

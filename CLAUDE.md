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

## Estado Atual (Codigo)

Concluido:
- Setup de frontend/backend + Docker
- Modelagem Prisma completa (11 entidades), migration e seed
- Auth backend (`/api/v1/auth/login`, `/me`, `/logout`)
- Modulo de audiencias (lista, detalhe, criar, atualizar, kanban, dashboard, troca de preposto)

Em andamento:
- Modulos backend faltantes (prepostos, parceiros/contatos, trts, importacoes, webhooks, usuarios)
- Orquestracao de mensagens/check-in/relatorio/substituicao

Nao iniciado de forma funcional:
- Frontend de operacao (atualmente placeholder)

## Proximos Passos Prioritarios

1. Backend core faltante
- CRUD de prepostos
- CRUD de parceiros + contatos
- Leitura/ativacao de TRTs
- Usuarios admin

2. Importacao assincrona
- Upload de xlsx
- Mapeamento de colunas
- Preview com validacoes
- Confirmacao e persistencia

3. Automacao operacional
- Agendamento D-1 e H-1h30
- Abertura de substituicao e escalonamento
- Check-in no dia
- Relatorio pos-audiencia
- Adapter de notificacao para n8n

4. Frontend
- Login
- Dashboard
- Lista e detalhe de audiencias
- Kanban
- Fluxos manuais de operacao

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

## Referencias

- `README.md`
- `CODEX.md`
- `arquitetura.md`
- `database.md`
- `docs/ESCOPO POC VIZEU (1).docx`

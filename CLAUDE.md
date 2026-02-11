# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexto do Projeto

**Freedom.AI Operational Hub** — POC de uma plataforma de gestão operacional jurídica para o escritório Viseu Advogados. O Hub é um sistema completo e autônomo: audiências, prepostos e parceiros podem ser criados manualmente. A importação de planilha é um atalho para entrada em massa, não o fluxo obrigatório.

Toda comunicação e código é em **português brasileiro (pt-BR)**.

## Papel do Claude

Atuar como **arquiteto de desenvolvimento** junto ao desenvolvedor (perfil júnior). O trabalho é colaborativo: debatemos ideias, discutimos trade-offs e decidimos juntos os melhores caminhos técnicos para a POC.

### Metodologia de Trabalho

**Pesquisa → Planeja → Implementa → Valida**

Toda decisão arquitetural e de engenharia relevante deve ser registrada no `CLAUDE.md` e/ou `arquitetura.md` para persistir entre sessões. Apenas o que for útil para desenvolvimento futuro — nada genérico ou óbvio.

## Stack Definida

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React + TypeScript + Vite + Tailwind CSS v4 |
| **Backend** | Node.js + Fastify + TypeScript (ESM) |
| **Banco** | PostgreSQL 16 |
| **ORM** | Prisma 7 (config via `prisma.config.ts`) |
| **Filas** | BullMQ + Redis |
| **Validação** | Zod |
| **Containers** | Docker Compose (frontend/nginx, backend, postgres, redis) |

**Organização:** Backend por camada (routes → services → jobs). Frontend por responsabilidade (pages, components, services, hooks).

## Comandos de Desenvolvimento

### Frontend (`frontend/`)
```bash
npm run dev          # Dev server na porta 3000 (proxy /api → backend:3001)
npm run build        # Build de produção
```

### Backend (`backend/`)
```bash
npm run dev          # Dev server com hot reload (tsx watch) na porta 3001
npm run build        # Compila TypeScript
npm run db:generate  # Gera client Prisma
npm run db:migrate   # Roda migrations
npm run db:push      # Push schema direto (dev)
npm run db:seed      # Seed de dados iniciais
```

### Docker
```bash
docker-compose up              # Sobe tudo (frontend, backend, postgres, redis)
docker-compose up postgres redis  # Só infra (pra dev local)
```

## Notas Técnicas

- **Prisma 7**: Não usa `url` no `datasource` do schema. Config de conexão fica em `backend/prisma.config.ts`
- **TypeScript (Vite)**: `erasableSyntaxOnly` ativo — usar `as const` objects em vez de `enum` no frontend
- **Backend ESM**: imports precisam de extensão `.js` (ex: `from './config/env.js'`)
- **WhatsApp**: Na POC, simulado via Dify/n8n. Webhooks genéricos prontos pra trocar por WhatsApp Business API real depois

## Estado Atual e Roadmap

1. ~~Protótipos (pronto)~~: Telas HTML/CSS do Google Stitch
2. ~~Arquitetura (pronto)~~: Stack, modelagem (11 entidades), contrato de API
3. ~~Setup (pronto)~~: Projetos inicializados, Docker configurado, Prisma schema válido
4. **Próximo**: Implementar rotas, services, páginas React

Ver `arquitetura.md` para decisões detalhadas e `database.md` para modelagem do banco.

## Protótipos HTML (referência)

```
frontend-viseu/
├── freedom.ai_dashboard_dashboard/     # Dashboard operacional com KPIs
├── operational_audiences_list/         # Lista de audiências com filtros
├── audiences_kanban_board/             # Kanban de workflow
├── audience_details_&_timeline/        # Detalhe + timeline
├── import_wizard__column_mapping/      # Wizard de importação
└── componentes_de_interface_(ui_kit)/  # Kit de componentes UI
```

## Design System (extraído do Stitch)

- **Cor primária**: Emerald green (#10b981 / #0df2ad / #059669)
- **Backgrounds**: Light (#f5f8f7), Dark (#10221d)
- **Surfaces**: Light (#ffffff), Dark (#1a2e28)
- **Tipografia**: Inter (300–700), sans-serif
- **Ícones**: Material Icons / Material Symbols Outlined
- **Dark mode**: Suportado via classe CSS
- **Layout**: Mobile-first, sidebar colapsável, grids responsivos

## Documentos de Apoio

- `docs/ESCOPO POC VIZEU (1).docx` — Escopo e requisitos
- `docs/planilha exemplificativa (1).xlsx` — Dados de exemplo

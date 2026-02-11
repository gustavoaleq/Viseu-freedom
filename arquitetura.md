# Arquitetura — Freedom.AI Operational Hub (POC)

Este documento registra as decisões arquiteturais e de engenharia tomadas durante o desenvolvimento.

---

## Decisões Pendentes

- [ ] Integração WhatsApp Business API
- [ ] Estratégia de deploy

## Decisões Tomadas

### 1. Arquitetura Segregada (front + back + banco)

**Decisão:** Projetos separados — React SPA, API backend independente, banco de dados próprio.

**Motivos:**
- Frontend já é naturalmente separado (protótipos Stitch → React)
- Domínio jurídico tem lógica de negócio pesada (workflows, importações, notificações) que pertence a backend dedicado
- Custo extra mínimo (dois projetos + banco em container)
- POC já nasce pronta pra evoluir sem refatoração estrutural
- Backend pode servir outros clientes no futuro (mobile, integrações)

**Estrutura base:**
```
Viseu/
├── frontend/          # React SPA
├── backend/           # API REST
├── docs/              # Documentação (arquitetura, escopo)
├── docker-compose.yml
├── CLAUDE.md
└── arquitetura.md
```

### 2. Backend — Fastify + TypeScript

**Decisão:** Node.js com Fastify e TypeScript.

**Motivos:**
- O agente WhatsApp é um orquestrador de workflows (templates + botões), não um chatbot com LLM
- I/O intensivo (webhooks Meta, agendamentos, notificações) — território natural do Node.js
- TypeScript end-to-end com React: tipos compartilhados, menos bugs de contrato
- Fastify é leve e rápido, ideal pra POC de 30 dias
- Se evoluir, migração pra NestJS é possível sem reescrita

**Complementos:**
- **Prisma** — ORM tipado com migrations automáticas
- **BullMQ + Redis** — filas de jobs agendados (D-1, H-1h30, pós-audiência)
- **Zod** — validação de dados de entrada

### 3. Banco de Dados — PostgreSQL

**Decisão:** PostgreSQL como banco relacional principal.

**Motivos:**
- Dados altamente relacionais (audiências ↔ prepostos ↔ parceiros ↔ status ↔ mensagens)
- Integridade referencial forte (FK, constraints, enums)
- Suporte nativo a JSON/JSONB pra dados semi-estruturados (respostas WhatsApp, observações)
- Prisma tem suporte excelente a PostgreSQL
- Roda em container Docker sem fricção

### 4. Containerização — Docker Compose

**Decisão:** Todo o ambiente roda em containers via docker-compose.

**Serviços:**
- `frontend` — React SPA servido por nginx
- `backend` — Node.js/Fastify
- `postgres` — PostgreSQL (imagem oficial)
- `redis` — Redis (backing do BullMQ)

### 5. Frontend — Vite + React + TypeScript

**Decisão:** SPA com Vite, React e TypeScript. Sem Next.js.

**Motivos:**
- Painel operacional interno (logado) — não precisa de SSR/SSG
- Vite é simples, rápido, sem mágica escondida
- Mais fácil de manter por perfil júnior
- Build gera estáticos servidos por nginx no container

**Estrutura de pastas:**
```
frontend/src/
├── components/        # Componentes reutilizáveis (Badge, Modal, Card, Sidebar)
├── pages/             # Páginas da aplicação (Dashboard, Audiencias, Kanban, etc.)
├── services/          # Chamadas à API (axios/fetch encapsulado)
├── hooks/             # Custom hooks React
├── types/             # Tipos TypeScript
├── assets/            # Ícones, imagens, fontes
├── styles/            # Tailwind config, CSS global
├── App.tsx            # Rotas e layout principal
└── main.tsx           # Ponto de entrada
```

**Libs complementares:**
- **Tailwind CSS** — mantém o design system do Stitch
- **React Router** — navegação entre páginas
- **Axios** — chamadas HTTP à API
- **React Query (TanStack Query)** — cache e estado de dados do servidor

### 6. Backend — Estrutura por camada

**Decisão:** Organização por camada técnica (routes/services/jobs), não por módulo.

**Motivos:**
- Mais intuitivo pra perfil júnior: "onde fica?" tem resposta óbvia
- Fluxo linear previsível: rota → service → banco
- POC tem ~5 entidades — não justifica módulos isolados
- Migração pra módulos é simples se o projeto crescer

**Estrutura de pastas:**
```
backend/src/
├── routes/            # Endpoints (audiencias, prepostos, webhooks, importacao)
├── services/          # Lógica de negócio
├── jobs/              # Jobs agendados BullMQ (D-1, H-1h30, pós-audiência)
├── prisma/            # Schema e migrations
├── utils/             # Helpers (validação, formatação)
├── types/             # Tipos TypeScript compartilhados
├── config/            # Variáveis de ambiente, constantes
├── app.ts             # Setup do Fastify (plugins, middleware)
└── server.ts          # Ponto de entrada
```

### 7. Modelagem do Banco — 10 entidades

**Decisão:** PostgreSQL com 10 entidades mapeadas via Prisma.

**Entidades (11):** Usuario, Audiencia (central), Trt, Preposto, Parceiro, ContatoParceiro, Importacao, Mensagem, RelatorioAudiencia, HistoricoStatus, Substituicao.

**Destaques:**
- Hub é sistema completo e autônomo — audiências podem ser criadas manualmente ou via importação de planilha
- `Audiencia.importacaoId` é nullable (null = criada manualmente)
- Trt como entidade separada com flag `ativo` (POC: apenas 2ª e 15ª ativos)
- Usuario com autenticação básica (email/senha + role)
- HistoricoStatus como trilha de auditoria completa
- Mensagem cobre todo ciclo WhatsApp (D-1, H-1h30, check-in, relatório, escalonamento)

Ver `database.md` para modelagem completa com campos, tipos e enums.

### 8. Contrato de API

**Decisão:** API REST com prefixo `/api/v1/`. Autenticação básica com JWT.

**Auth:**
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/v1/auth/login` | Login (email + senha) → retorna JWT |
| GET | `/api/v1/auth/me` | Dados do usuário logado |
| POST | `/api/v1/auth/logout` | Invalida token |

**Audiências (CRUD completo + ações):**
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v1/audiencias` | Lista com filtros e paginação |
| POST | `/api/v1/audiencias` | Criar manualmente |
| GET | `/api/v1/audiencias/:id` | Detalhe + timeline |
| PATCH | `/api/v1/audiencias/:id` | Atualizar |
| GET | `/api/v1/audiencias/kanban` | Agrupado por status |
| GET | `/api/v1/audiencias/dashboard` | KPIs e contadores |
| POST | `/api/v1/audiencias/:id/trocar-preposto` | Substituição manual |
| POST | `/api/v1/audiencias/:id/reenviar-confirmacao` | Reenvio de mensagem |
| GET | `/api/v1/audiencias/export` | Export xlsx/csv |

**Importação (atalho para entrada em massa):**
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/v1/importacoes/upload` | Upload da planilha |
| POST | `/api/v1/importacoes/:id/mapear` | Mapeamento de colunas |
| GET | `/api/v1/importacoes/:id/preview` | Pré-validação |
| POST | `/api/v1/importacoes/:id/confirmar` | Confirma importação |
| GET | `/api/v1/importacoes` | Histórico |

**Prepostos:**
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v1/prepostos` | Lista com busca |
| POST | `/api/v1/prepostos` | Criar |
| PATCH | `/api/v1/prepostos/:id` | Editar |
| DELETE | `/api/v1/prepostos/:id` | Remover |

**Parceiros:**
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v1/parceiros` | Lista |
| POST | `/api/v1/parceiros` | Criar |
| PATCH | `/api/v1/parceiros/:id` | Editar |
| GET | `/api/v1/parceiros/:id/contatos` | Contatos |
| POST | `/api/v1/parceiros/:id/contatos` | Adicionar contato |

**TRTs:**
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v1/trts` | Lista todos |
| PATCH | `/api/v1/trts/:id` | Ativar/desativar |

**Webhooks (Meta/WhatsApp):**
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v1/webhooks/whatsapp` | Verificação (challenge Meta) |
| POST | `/api/v1/webhooks/whatsapp` | Recebe respostas |

**Usuarios (admin):**
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v1/usuarios` | Lista (admin only) |
| POST | `/api/v1/usuarios` | Criar usuário |
| PATCH | `/api/v1/usuarios/:id` | Editar |

# CODEX.md

Guia operacional do agente para continuidade do projeto.

## Missao

Entregar a POC do Freedom.AI Operational Hub com qualidade de producao, mantendo simplicidade para evolucao do time.

## Decisoes Estruturais Ativas

1. O Hub funciona sem importacao
- Fluxo manual completo e obrigatorio na implementacao.
- Importacao e um canal adicional.

2. Mensageria na POC
- Simulacao e automacao via n8n.
- WhatsApp Business API oficial sera plugada depois por adapter.

3. Orquestracao temporal
- BullMQ + Redis com jobs por audiencia para eventos D-1, H-1h30, check-in e pos-audiencia.

4. Importacao
- Fluxo assincrono com quatro etapas:
- `upload`
- `mapear`
- `preview`
- `confirmar`

## Norte Arquitetural

- Backend orientado a camadas (`routes -> services -> jobs -> adapters`).
- Dominio desacoplado de provider externo (n8n/WhatsApp) por interface.
- Persistencia e auditoria primeiro, interface depois.
- Erros de validacao claros para operacao do escritorio.

## Backlog Imediato (ordem de execucao)

1. Frontend + backend core da POC (quase concluido)
- Base operacional implementada: login, dashboard, lista/kanban/detalhe de audiencias, prepostos, importacoes, usuarios.
- Importacao robustecida com parsing de preposto composto, mapeamento automatico e convergencia para `local`.
- Faltam apenas refinos pontuais de UX/comportamento identificados em validacao funcional.

2. Validacoes e melhorias finais (agora)
- Testes ponta a ponta dos fluxos criticos: importacao, operacao manual, troca de preposto, check-in, relatorio.
- Endurecimento de regras/erros para casos de borda da planilha e operacao diaria.
- Revisao final de aderencia ao escopo contratado (sem exceder e sem faltar item).

3. Orquestracao de mensageria (proxima etapa apos validacao)
- BullMQ + Redis com jobs por audiencia (D-1, H-1h30, check-in, pos-audiencia).
- Adapter de notificacao via n8n para simulacao da POC.
- Encadeamento de status automatizados e escalonamento operacional.

## Regra de Qualidade

- Toda mudanca importante gera atualizacao de contexto em `CLAUDE.md` e/ou `arquitetura.md`.
- Sempre validar build apos alteracoes relevantes.
- Evitar acoplamento prematuro com integracao oficial de WhatsApp.
- Escopo da POC e fechado: nao implementar alem do contratado e nao deixar de implementar qualquer item contratado.

## Definicao de Pronto da POC (tecnico)

- Importar planilha com preview e confirmacao
- Operar audiencias manualmente sem depender de importacao
- Executar fluxo D-1/H-1h30/substituicao/check-in/relatorio em simulacao via n8n
- Manter historico de status, mensagens e substituicoes
- Expor painel operacional com dados consistentes

## Log de Entregas

- 13:53 - Implementados modulos `prepostos` e `importacoes` (upload/mapear/preview/confirmar) no backend.
- 13:53 - Implementado modulo `parceiros` com contatos (`listar/criar/atualizar parceiro`, `listar/criar contato`) no backend.
- 13:57 - Criado contrato formal `docs/openapi.yaml` como fonte oficial da API da POC (escopo fechado).
- 14:06 - Implementados endpoints faltantes da POC no backend: acoes de `audiencias` (export/cancelar/confirmar-telefone/check-in/relatorio), modulos `trts`, `webhooks` e `usuarios (admin)`.
- 14:23 - Iniciado frontend operacional com base em `frontend-viseu` (React): arquitetura de rotas protegidas, shell da aplicacao e integracao com API.
- 14:23 - Implementadas telas de `dashboard`, `audiencias (lista/kanban/detalhe)`, `prepostos` e `importacoes` com acoes manuais e fluxo de importacao (`upload/mapear/preview/confirmar`).
- 14:23 - Build do frontend validado com sucesso (`npm run build` em `frontend`).
- 14:26 - Lint do frontend validado com sucesso (`npm run lint` em `frontend`).
- 14:43 - Corrigido `backend/Dockerfile` para copiar Prisma client em `dist/generated` (resolvendo `ERR_MODULE_NOT_FOUND` no container backend).
- 14:43 - Stack validada em Docker: `frontend` (Nginx em `localhost:3000`) e `backend` (health em `localhost:3001/api/v1/health`) respondendo `200`.
- 14:58 - Corrigido `docker-compose.yml` (backend usando `DATABASE_URL` com host `postgres` e `REDIS_URL` com host `redis` no ambiente de container).
- 14:58 - Ajustado `backend/Dockerfile` para incluir `src/generated` e `prisma.config.ts` na imagem de producao (habilitando `prisma migrate` e `db:seed` dentro do container).
- 14:58 - Executados no container backend: `prisma migrate deploy` e `npm run db:seed`; usuario admin confirmado no banco e login validado com `200` em `/api/v1/auth/login`.
- 15:10 - Refinado frontend para aderencia visual ao `frontend-viseu`: dashboard refeito com cards executivos, tabela de prioridades, bloco `Status das Audiencias` (visual circular) e `Lembretes` dinâmicos conectados à API.
- 15:10 - Ajustado `AppShell` e tema global (`index.css`) para linguagem visual mais executiva/jurídica (paleta slate+emerald, tipografia e hierarquia de navegação).
- 15:10 - Validacao tecnica do frontend apos refinamento: `npm run build` e `npm run lint` com sucesso.
- 15:12 - Rebuild dos containers para refletir novo frontend (`docker-compose up -d --build frontend`) com validacao de disponibilidade em `localhost:3000` e `localhost:3001/api/v1/health` (`200 OK`).
- 15:35 - Login migrado a partir de `frontend-viseu/login/code.html` para `frontend/src/pages/LoginPage.tsx` (layout, hierarquia e UX alinhados ao prototipo).
- 15:35 - Padronizacao visual aplicada nas rotas de operacao: `AudienciasListPage`, `AudienciasKanbanPage`, `PrepostosPage`, `ImportacoesPage` e refinamento de `AudienciaDetalhePage` para o mesmo padrão executivo/jurídico.
- 15:35 - Frontend revalidado (`npm run build` + `npm run lint`) e publicado em container (`docker-compose up -d --build --no-deps frontend`), com `localhost:3000/login` respondendo `200`.
- 16:33 - Kanban operacional consolidado em etapas reais: `A confirmar (D-1)` agrega `IMPORTADA/AGENDADA/A_CONFIRMAR` e `Substituicao necessaria` agrega `SEM_RESPOSTA/NAO_POSSO/SUBSTITUICAO_NECESSARIA`, reduzindo excesso de colunas.
- 16:33 - Tela de detalhe da audiencia refinada com card de `Workflow` e `Linha do tempo` em estilo pixel-perfect (marcadores laterais com check/alerta/relogio e eventos de status + mensagens em ordem temporal).
- 16:33 - Mapeamento de importacao evoluido com auto-mapeamento por similaridade (normalizacao + aliases), amostra por coluna, deteccao de coluna duplicada e marcador de obrigatorio com asterisco verde discreto.
- 16:33 - Frontend validado novamente (`npm run lint` e `npm run build`) e publicado em container (`docker-compose up -d --build --no-deps frontend`), com validacao HTTP local `localhost:3000/login = 200`.
- 16:43 - Branding atualizado no frontend: texto `Hub Operacional` substituido por `Legal Tech Solutions`, logo placeholder removido no shell e login ajustado para exibir apenas o logo da Freedom.
- 16:43 - `logo.png` disponibilizado em `frontend/public/logo.png` para uso consistente via rota estatica (`/logo.png`) no AppShell e Login.
- 16:43 - Frontend revalidado (`npm run lint` e `npm run build`) e republicado no container (`docker-compose up -d --build --no-deps frontend`), com `localhost:3000/login` respondendo `200`.
- 17:08 - Importacao backend robustecida em `backend/src/services/importacoes.service.ts`: TRT agora aceita texto/sigla (ex.: `SP`) com fallback pelo numero CNJ do processo (`.5.02.` -> TRT 2, `.5.15.` -> TRT 15).
- 17:08 - Normalizacao de telefone reforcada para formatos reais de planilha: extracao por contexto (`Telefone do Preposto`), filtro de CPF em texto misto, suporte a decimal/notacao cientifica e validacao final em 10 ou 11 digitos.
- 17:08 - Validacao real executada com `docs/planilha exemplificativa (1).xlsx` via fluxo `upload -> mapear -> preview` no container backend: `totalLinhas=42`, `validasParaImportacao=42`, `invalidas=0`, `ignoradasPorTrt=0`.
- 17:19 - Login atualizado conforme novo direcionamento visual: marca (logo + assinatura) movida para fora do card branco, card inicia com `Acesse sua conta.` e removido texto de boas-vindas anterior.
- 17:19 - Tela de login ajustada para usar `logo-completa.png` (sem borda branca), com assinatura `Gestão de audiências | Viseu Advogados` e rodape legal `© 2026 Barreto Leilões. Powered by Freedom.AI`.
- 17:19 - Asset publicado em `frontend/public/logo-completa.png`; frontend revalidado (`npm run lint` + `npm run build`) e republicado no container (`docker-compose up -d --build --no-deps frontend`), com `localhost:3000/login` respondendo `200`.
- 17:24 - Rodape legal da login corrigido para `© 2026 Viseu Advogados. Powered by Freedom.AI`.
- 17:24 - Aplicado tratamento visual `mix-blend-multiply` em `logo-completa.png` na login para neutralizar o fundo branco da arte sem alterar o arquivo-fonte.
- 17:24 - Frontend revalidado (`npm run lint` + `npm run build`) e republicado no container (`docker-compose up -d --build --no-deps frontend`), com `localhost:3000/login` respondendo `200`.
- 17:49 - Menu lateral atualizado com rota `Usuarios` e tela `frontend/src/pages/UsuariosPage.tsx` para gestao de acessos (listar/criar/editar), com controle de uso por perfil ADMIN no frontend e backend.
- 17:49 - Backend de audiencia/importacao expandido para novos campos da planilha: `tipoAudiencia`, `reclamada`, `comarca`, `advogado`, `contatoAdvogado`, `correspondente` (schema Prisma, services e rotas).
- 17:49 - Migration aplicada em producao local: `20260211172500_add_audiencia_campos_importacao` (`docker-compose exec backend npx prisma migrate deploy --schema=src/prisma/schema.prisma`).
- 17:49 - Frontend de importacao atualizado com novos campos no mapeamento automatico e aliases; detalhe da audiencia atualizado para exibir os novos campos no bloco `Resumo`.
- 17:49 - Validacoes finais executadas: `backend npm run build`, `frontend npm run lint`, `frontend npm run build`; containers backend/frontend rebuildados e saudaveis (`/api/v1/health=200`, `/usuarios=200` no frontend).
- 18:21 - Regra de importacao de preposto aprimorada para coluna composta: quando `prepostoNome` vier com bloco textual (`Nome do Preposto`, `E-mail`, `Telefone`, `CPF`), o parser separa automaticamente e grava os campos de forma estruturada no cadastro de `prepostos` e no vinculo da audiencia.
- 18:21 - Mapeamento de importacao ajustado: `prepostoTelefone` deixou de ser campo obrigatorio; o telefone continua obrigatorio por linha, mas pode ser extraido da propria coluna de preposto composta.
- 18:21 - Contrato formal atualizado em `docs/openapi.yaml` refletindo obrigatorios de mapeamento (`numeroProcesso`, `data`, `trt`, `prepostoNome`, `parceiroNome`).
- 18:21 - Validacao tecnica concluida: `backend npm run build`, `frontend npm run lint`, `frontend npm run build`, rebuild de `backend/frontend` em Docker e checks HTTP locais (`backend:200`, `frontend:200`).
- 18:33 - Regra de mapeamento ajustada para priorizar `local` na importacao: o campo `link` foi removido da tela de mapeamento (`ImportacoesPage`) e colunas como `LINK OU ENDERECO` passam a ser direcionadas para `local`.
- 18:33 - Importacao backend reforcada para unificacao `local`: quando vier apenas `link` na planilha, o valor e reaproveitado em `local` durante validacao da linha.
- 18:33 - Auto-mapeamento de coluna composta de preposto melhorado no frontend: ao mapear `prepostoNome`, os campos `prepostoTelefone`, `prepostoEmail` e `prepostoCpf` sao preenchidos automaticamente com a mesma coluna para manter coerencia com o parser backend.
- 18:33 - Validacao tecnica concluida apos ajustes: `backend npm run build`, `frontend npm run lint`, `frontend npm run build`, rebuild Docker de `backend/frontend` e checks HTTP locais (`backend:200`, `frontend:200`).
- 18:39 - Ajuste fino no auto-mapeamento: reforco da heuristica para colunas de `local` contendo termos de link (`url/meet/zoom/teams`) para convergir o mapeamento no campo `local`.
- 18:39 - Frontend revalidado e republicado (`npm run lint`, `npm run build`, `docker-compose up -d --build --no-deps frontend`), com `localhost:3000/login` respondendo `200`.
- 18:40 - Contexto consolidado no `CODEX.md` com checkpoint das ultimas alteracoes e nova ordem de trabalho: fechamento funcional (validacoes/melhorias) antes da orquestracao de mensageria (`BullMQ + n8n`).

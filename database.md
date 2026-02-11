# Database — Freedom.AI Operational Hub (POC)

Modelagem do banco de dados PostgreSQL com Prisma ORM.

---

## Diagrama de Relacionamentos

```
                     Usuario (auth)

Importacao (1) ──┬─ (N) Audiencia (N) ──── (1) Preposto
                 │        │    │                 │
           (opcional)     │    └── (N)─(1) Trt   │
                          │ (1)                   │
                          ├──── (N) Mensagem      │
                          ├──── (N) HistoricoStatus
                          ├──── (1) RelatorioAudiencia
                          └──── (N) Substituicao ─┘
                          │
                     (N)  │  (1)
                     Parceiro ──── (N) ContatoParceiro
```

> **Nota:** Audiência pode ser criada manualmente pelo Hub (sem importação) ou via importação de planilha. O campo `importacaoId` é **opcional** (nullable).

## Entidades

### 1. Audiencia (entidade central)

O coração do sistema. Cada linha é uma audiência trabalhista importada da planilha.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| numeroProcesso | String | Número do processo trabalhista |
| reclamante | String? | Nome do reclamante (quando informado) |
| data | DateTime | Data da audiência |
| hora | String | Horário (ex: "14:30") |
| modalidade | Enum | PRESENCIAL / ONLINE |
| local | String? | Endereço físico (se presencial) |
| link | String? | Link Zoom/Teams (se online) |
| trtId | FK → Trt | TRT da audiência |
| vara | String? | Vara do trabalho (divisão dentro do TRT) |
| status | Enum | Status atual no workflow |
| prepostoId | FK → Preposto | Preposto atribuído |
| parceiroId | FK → Parceiro | Escritório parceiro |
| importacaoId | FK → Importacao? | Lote de importação (null se criada manualmente) |
| observacoes | String? | Observações livres |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Última atualização |

### 2. Trt

Tribunais Regionais do Trabalho. Na POC, apenas 2ª e 15ª ficam ativos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| numero | String | Número do TRT (ex: "2", "15") — único |
| nome | String | Nome completo (ex: "TRT 2ª Região — São Paulo") |
| ativo | Boolean | Se está habilitado na plataforma |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Última atualização |

**Seed da POC:**
| numero | nome | ativo |
|--------|------|-------|
| 2 | TRT 2ª Região — São Paulo | true |
| 15 | TRT 15ª Região — Campinas | true |
| 1 | TRT 1ª Região — Rio de Janeiro | false |
| ... | _(demais 21 TRTs)_ | false |

### 3. Preposto

Pessoa que representa a empresa na audiência.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nome | String | Nome completo |
| telefoneWhatsapp | String | Telefone WhatsApp (único) |
| email | String? | E-mail |
| cpf | String? | CPF (quando existir) |
| ativo | Boolean | Se está ativo no sistema |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Última atualização |

### 4. Parceiro

Escritório correspondente / parceiro jurídico.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nome | String | Nome do escritório |
| ativo | Boolean | Se está ativo |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Última atualização |

### 5. ContatoParceiro

Contatos do parceiro para escalonamento (WhatsApp/e-mail).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| parceiroId | FK → Parceiro | Parceiro dono do contato |
| nome | String | Nome do contato |
| telefoneWhatsapp | String | WhatsApp |
| email | String? | E-mail |
| cargo | String? | Cargo (coordenador, gerente) |
| ordemEscalonamento | Int | Ordem no fluxo de escalonamento (1 = primeiro) |
| createdAt | DateTime | Criação |

### 6. Importacao

Cada upload de planilha gera um registro de importação.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nomeArquivo | String | Nome do arquivo original |
| totalRegistros | Int | Total de linhas no arquivo |
| registrosImportados | Int | Linhas importadas com sucesso |
| registrosIgnorados | Int | Linhas ignoradas (fora TRT 2/15, inválidas) |
| mapeamentoColunas | Json | De/para das colunas mapeadas |
| status | Enum | PROCESSANDO / CONCLUIDA / ERRO |
| erros | Json? | Detalhes de erros por linha |
| createdAt | DateTime | Criação |

### 7. Mensagem

Log de todas as mensagens WhatsApp enviadas/recebidas.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência relacionada |
| prepostoId | FK → Preposto? | Preposto destinatário (se aplicável) |
| contatoParceiroId | FK → ContatoParceiro? | Contato parceiro (se escalonamento) |
| tipo | Enum | Tipo da mensagem (D1, H1H30, CHECK_IN, etc.) |
| direcao | Enum | ENVIADA / RECEBIDA |
| conteudo | String | Texto da mensagem |
| respostaBotao | String? | Resposta do botão clicado ("Confirmo", "Não posso") |
| observacao | String? | Campo livre da resposta |
| whatsappMessageId | String? | ID da mensagem na API Meta |
| statusEnvio | Enum | PENDENTE / ENVIADA / ENTREGUE / LIDA / FALHA |
| createdAt | DateTime | Criação |

### 8. RelatorioAudiencia

Formulário pós-audiência (checkout).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência (único) |
| audienciaOcorreu | Enum? | SIM / NAO / REMARCADA |
| resultado | Enum? | ACORDO / SEM_ACORDO / AUSENCIA / REDESIGNADA |
| advogadoPresente | Boolean? | Advogado estava no horário? |
| advogadoDominioCaso | Boolean? | Demonstrou domínio do caso? |
| problemaRelevante | Boolean? | Houve problema relevante? |
| relato | String? | Campo livre — relato do que aconteceu |
| createdAt | DateTime | Criação |

### 9. HistoricoStatus

Trilha de auditoria — toda mudança de status fica registrada.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência |
| statusAnterior | Enum | Status antes da mudança |
| statusNovo | Enum | Status depois da mudança |
| motivo | String? | Motivo da mudança |
| atualizadoPor | String | Quem/o quê fez a mudança (sistema, usuário) |
| createdAt | DateTime | Quando mudou |

### 10. Substituicao

Registro de troca de preposto — quem saiu, quem entrou, por quê.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| audienciaId | FK → Audiencia | Audiência |
| prepostoAnteriorId | FK → Preposto | Preposto que saiu |
| prepostoNovoId | FK → Preposto? | Preposto substituto (null até ser definido) |
| motivo | String | Motivo (não posso, sem resposta, etc.) |
| status | Enum | ABERTA / RESOLVIDA / CANCELADA |
| createdAt | DateTime | Quando abriu |
| resolvidoEm | DateTime? | Quando resolveu |

### 11. Usuario

Usuários do sistema (autenticação e controle de acesso).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nome | String | Nome completo |
| email | String | E-mail (único) — usado como login |
| senha | String | Hash da senha (bcrypt) |
| role | Enum | Papel no sistema (ADMIN, OPERADOR, GESTOR) |
| ativo | Boolean | Se pode acessar o sistema |
| createdAt | DateTime | Criação |
| updatedAt | DateTime | Última atualização |

---

## Enums

### RoleUsuario
```
ADMIN                  → Acesso total, gerencia usuários e configurações
OPERADOR               → Operação do dia a dia (audiências, prepostos, importação)
GESTOR                 → Visualização de dashboards e relatórios
```

### StatusAudiencia (fluxo principal)
```
IMPORTADA              → Recém-importada da planilha
AGENDADA               → Criada manualmente, aguardando D-1
A_CONFIRMAR            → D-1 enviado, aguardando resposta
CONFIRMADA             → Preposto confirmou presença
NAO_POSSO              → Preposto recusou
SEM_RESPOSTA           → Não respondeu dentro da janela
SUBSTITUICAO_NECESSARIA → Precisa trocar preposto
EM_ANDAMENTO           → Dia da audiência, check-in ativo
CHECK_IN_PENDENTE      → Aguardando check-in do preposto
RELATORIO_PENDENTE     → Audiência passou, aguardando relatório
CONCLUIDA              → Relatório recebido, ciclo fechado
CANCELADA              → Audiência cancelada
```

### Modalidade
```
PRESENCIAL
ONLINE
```

### TipoMensagem
```
CONFIRMACAO_D1         → Confirmação dia anterior
REITERACAO_H1H30       → Reiteração 1h30 antes
CHECK_IN               → Check-in no dia
RELATORIO_POS          → Relatório pós-audiência
SUBSTITUICAO_AVISO     → Aviso de substituição necessária
ESCALONAMENTO          → Mensagem de escalonamento (Viseu/parceiro)
```

### DirecaoMensagem
```
ENVIADA
RECEBIDA
```

### StatusEnvioMensagem
```
PENDENTE
ENVIADA
ENTREGUE
LIDA
FALHA
```

### StatusImportacao
```
PROCESSANDO
CONCLUIDA
ERRO
```

### OcorrenciaAudiencia
```
SIM
NAO
REMARCADA
```

### ResultadoAudiencia
```
ACORDO
SEM_ACORDO
AUSENCIA
REDESIGNADA
```

### StatusSubstituicao
```
ABERTA
RESOLVIDA
CANCELADA
```

---

## Índices Importantes

- `Audiencia.data` — consultas por período são o filtro mais usado
- `Audiencia.status` — filtro no kanban e lista
- `Audiencia.trtId` — filtro por TRT
- `Audiencia.prepostoId` — audiências por preposto
- `Audiencia.parceiroId` — audiências por parceiro
- `Mensagem.audienciaId` — histórico de mensagens por audiência
- `Mensagem.whatsappMessageId` — lookup de webhooks recebidos da Meta
- `HistoricoStatus.audienciaId` — timeline de uma audiência

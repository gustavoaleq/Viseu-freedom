# Endpoints para Agente (Dify)

Este documento lista endpoints prontos para o agente consultar dados operacionais do Hub.

## Base URL

- Local: `http://localhost:3001/api/v1`
- Prefixo do modulo do agente: `http://localhost:3001/api/v1/agent`

## Autenticacao

Todos os endpoints abaixo exigem JWT no header:

`Authorization: Bearer <TOKEN>`

### 1) Obter token

`POST /api/v1/auth/login`

Body:

```json
{
  "email": "admin@viseu.com",
  "senha": "admin123"
}
```

Resposta (resumo):

```json
{
  "token": "eyJ...",
  "usuario": {
    "id": "...",
    "nome": "Administrador",
    "email": "admin@viseu.com",
    "role": "ADMIN"
  }
}
```

## Endpoints do Agente

### 1) Resumo operacional

`GET /api/v1/agent/resumo-operacional`

Query params:
- `dataRef` (opcional): `YYYY-MM-DD` (ex.: `2026-02-14`)

Uso:
- "Quantas audiencias temos hoje?"
- "Quantas estao em substituicao necessaria?"

Resposta (resumo):

```json
{
  "referencia": {
    "data": "2026-02-14",
    "inicio": "2026-02-14T03:00:00.000Z",
    "fimExclusivo": "2026-02-15T03:00:00.000Z"
  },
  "totalAtivas": 12,
  "audienciasHoje": 4,
  "audienciasAmanha": 3,
  "pendencias": {
    "aConfirmar": 2,
    "checkInPendente": 1,
    "substituicaoNecessaria": 1,
    "relatorioPendente": 3
  },
  "porStatus": [
    { "status": "A_CONFIRMAR", "total": 2 },
    { "status": "CONFIRMADA", "total": 4 }
  ]
}
```

### 2) Audiencias de um dia

`GET /api/v1/agent/audiencias-do-dia`

Query params:
- `dataRef` (opcional): `YYYY-MM-DD`
- `somenteAbertas` (opcional): `true` (padrao) ou `false`

Uso:
- "Quais audiencias temos hoje?"
- "Liste as audiencias de amanha"

Resposta (resumo):

```json
{
  "referencia": "2026-02-14",
  "somenteAbertas": true,
  "total": 4,
  "dados": [
    {
      "id": "uuid",
      "numeroProcesso": "100.300.500.700",
      "data": "2026-02-14T03:00:00.000Z",
      "hora": "15:00",
      "status": "CONFIRMADA",
      "modalidade": "ONLINE",
      "preposto": { "id": "uuid", "nome": "Nome", "telefoneWhatsapp": "119..." },
      "parceiro": { "id": "uuid", "nome": "Autuori Burmann" },
      "trt": { "id": "uuid", "numero": "2", "nome": "TRT 2" }
    }
  ]
}
```

### 3) Proximas audiencias

`GET /api/v1/agent/proximas-audiencias`

Query params:
- `limit` (opcional): 1 a 100 (padrao: 10)
- `somenteAbertas` (opcional): `true` (padrao) ou `false`

Uso:
- "Quais sao as proximas 5 audiencias?"

### 4) Audiencias por status

`GET /api/v1/agent/audiencias-por-status`

Query params:
- `status` (obrigatorio):  
  `IMPORTADA | AGENDADA | A_CONFIRMAR | CONFIRMADA | NAO_POSSO | SEM_RESPOSTA | SUBSTITUICAO_NECESSARIA | EM_ANDAMENTO | CHECK_IN_PENDENTE | RELATORIO_PENDENTE | CONCLUIDA | CANCELADA`
- `limit` (opcional): 1 a 100 (padrao: 20)

Uso:
- "Liste audiencias em substituicao necessaria"
- "Quais estao em check-in pendente?"

### 5) Indicadores pos-relatorio

`GET /api/v1/agent/indicadores-pos-relatorio`

Query params:
- `dias` (opcional): 1 a 180 (padrao: 30)

Uso:
- "Quantas audiencias tiveram acordo no ultimo mes?"
- "Quantos casos tiveram advogado presente?"

Resposta (resumo):

```json
{
  "periodoDias": 30,
  "totalRelatorios": 11,
  "audienciaOcorreu": { "sim": 8, "nao": 1, "remarcada": 2 },
  "resultado": { "acordo": 4, "semAcordo": 3, "ausencia": 1, "redesignada": 2 },
  "advogadoPresente": { "sim": 7, "nao": 2 },
  "advogadoDominioCaso": { "sim": 6, "nao": 3 },
  "problemaRelevante": { "sim": 2, "nao": 7 }
}
```

## Exemplos cURL

### Login

```bash
curl -s -X POST "http://localhost:3001/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@viseu.com","senha":"admin123"}'
```

### Resumo operacional

```bash
curl -s "http://localhost:3001/api/v1/agent/resumo-operacional" \
  -H "Authorization: Bearer $TOKEN"
```

### Audiencias do dia (data fixa)

```bash
curl -s "http://localhost:3001/api/v1/agent/audiencias-do-dia?dataRef=2026-02-14" \
  -H "Authorization: Bearer $TOKEN"
```

### Por status

```bash
curl -s "http://localhost:3001/api/v1/agent/audiencias-por-status?status=SUBSTITUICAO_NECESSARIA&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

## Sugestao de uso no Dify

Criar 5 tools HTTP (uma para cada endpoint acima), sempre com header `Authorization`.
Assim o agente consegue escolher a consulta certa para perguntas como:
- "quantas audiencias temos hoje?"
- "quais precisam de substituicao?"
- "como foi o resultado pos-audiencia nos ultimos 30 dias?"

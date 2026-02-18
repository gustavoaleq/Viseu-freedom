# Como Subir o Projeto na VPS

Guia objetivo para subir o Freedom Hub em produção usando Docker Compose.

## 1) Pré-requisitos na VPS

Sistema recomendado: Ubuntu 22.04+

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg
```

Instalar Docker:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

Depois faça logout/login no SSH para aplicar grupo `docker`.

## 2) Clonar projeto

```bash
git clone <URL_DO_REPOSITORIO> /opt/viseu
cd /opt/viseu
```

## 3) Configurar ambiente do backend

Copie e ajuste:

```bash
cp backend/.env.example backend/.env
```

Campos mínimos para produção no `backend/.env`:
- `JWT_SECRET` forte
- `WHATSAPP_PROVIDER` e variáveis do provider (ex.: Z-API)
- `HUB_FRONTEND_URL` com domínio público
- `WHATSAPP_VERIFY_TOKEN` forte
- `ORQ_TIMEZONE=America/Sao_Paulo`

Observação:
- No `docker-compose.yml`, o backend já usa `DATABASE_URL` e `REDIS_URL` internos (`postgres` e `redis`).

## 4) Subir stack

```bash
docker-compose up -d --build
```

Checar status:

```bash
docker-compose ps
docker-compose logs -f backend
```

Healthcheck do backend:

```bash
curl http://SEU_IP_OU_DOMINIO:3001/api/v1/health
```

## 5) Migrar banco

Com os containers no ar:

```bash
docker-compose exec backend npx prisma migrate deploy --schema=src/prisma/schema.prisma
```

## 6) Criar dados iniciais (se necessário)

Se o banco estiver zerado, rode seed para criar base mínima (TRTs e usuário admin padrão do seed):

```bash
docker-compose exec backend npm run db:seed
```

Se preferir, crie usuário admin manual via banco/API e mantenha seed desativado.

## 7) Webhook WhatsApp (produção)

Configurar no provider (ex.: Z-API) URL pública:

`https://SEU_DOMINIO/api/v1/webhooks/whatsapp`

Eventos mínimos:
- Ao receber: habilitado

## 8) Expor com domínio + SSL (recomendado)

Opção prática:
1. Subir Nginx/Caddy como reverse proxy
2. Apontar DNS do domínio para a VPS
3. Emitir certificado TLS (Let’s Encrypt)

Roteamento sugerido:
- `https://app.seudominio.com` -> frontend (`:3000`)
- `https://api.seudominio.com` -> backend (`:3001`)

Se usar domínio separado para API, ajuste CORS conforme necessidade.

## 9) Comandos úteis de operação

Rebuild após update:

```bash
cd /opt/viseu
git pull
docker-compose up -d --build
```

Ver logs:

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

Restart:

```bash
docker-compose restart backend frontend
```

## 10) Checklist de go-live

1. `health` do backend responde `ok`
2. login no frontend funciona
3. webhook do WhatsApp chega no endpoint
4. worker/fila operando (`/api/v1/webhooks/workers/status`)
5. envio D-1/check-in/pós-audiência testado ponta a ponta
6. backup do Postgres habilitado na VPS

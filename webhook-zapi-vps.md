# Webhook Z-API na VPS (Ubuntu)

Guia prático para publicar o endpoint do backend na VPS (`177.67.54.150`) e configurar a Z-API para enviar webhooks em produção.

## 1) Objetivo

Publicar este endpoint com HTTPS:

`https://SEU_DOMINIO_API/api/v1/webhooks/whatsapp`

Exemplo de domínio recomendado:

`https://api.seudominio.com/api/v1/webhooks/whatsapp`

## 2) Pré-requisitos

- VPS Ubuntu com o projeto já rodando (via Docker Compose).
- Porta `80` e `443` liberadas no provedor/cloud firewall.
- Um domínio que você controla no DNS (pode usar subdomínio novo).

## 3) Criar DNS público para a VPS

No painel de DNS do seu domínio, crie um registro:

- Tipo: `A`
- Host: `api` (ou outro subdomínio)
- Valor: `177.67.54.150`
- TTL: padrão

Resultado esperado:

`api.seudominio.com -> 177.67.54.150`

Validação local:

```bash
dig +short api.seudominio.com
```

Deve retornar `177.67.54.150`.

## 4) Instalar Nginx e Certbot na VPS

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

## 5) Criar reverse proxy para o backend (porta 3001)

Crie o arquivo:

```bash
sudo nano /etc/nginx/sites-available/viseu-api
```

Conteúdo:

```nginx
server {
    listen 80;
    server_name api.seudominio.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ative o site e valide:

```bash
sudo ln -s /etc/nginx/sites-available/viseu-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 6) Emitir SSL (Let’s Encrypt)

```bash
sudo certbot --nginx -d api.seudominio.com -m seu-email@dominio.com --agree-tos --no-eff-email
```

Validar renovação automática:

```bash
sudo certbot renew --dry-run
```

## 7) Validar endpoint público do backend

Teste saúde:

```bash
curl -i https://api.seudominio.com/api/v1/health
```

Teste endpoint de webhook (GET deve responder `403` sem token, o que é esperado):

```bash
curl -i https://api.seudominio.com/api/v1/webhooks/whatsapp
```

## 8) Configurar webhook no painel da Z-API

No painel da sua instância Z-API:

1. Abra **Configure webhooks** (ou menu equivalente de webhook).
2. URL do webhook:
   `https://api.seudominio.com/api/v1/webhooks/whatsapp`
3. Eventos:
   - Habilitar: **Ao receber** (mensagens recebidas).
   - Opcional: status de mensagem (só se você realmente precisar de observabilidade extra).
   - Desabilitar: **Ao enviar** / notificações enviadas por você (evita ruído e duplicidade).
4. Salve a configuração.

## 9) Teste funcional de produção

1. No sistema, dispare uma mensagem D-1 ou check-in para um preposto.
2. Responda no WhatsApp usando botão ou texto.
3. Verifique no backend:
   - status da audiência atualizado;
   - nova entrada em `mensagens`/`historico_status`;
   - logs sem erro.
4. Verifique fila:

```bash
curl -s https://api.seudominio.com/api/v1/webhooks/workers/status
```

## 10) Troubleshooting rápido

- `404/502` no domínio:
  - confirme se backend está no ar na `3001`;
  - confirme `proxy_pass` no Nginx.
- Não chega webhook:
  - confirme DNS e SSL válidos;
  - revise eventos habilitados no painel da Z-API;
  - confirme URL exatamente como acima.
- Webhook chega mas não processa:
  - verifique logs do backend e payload recebido;
  - confirme que o telefone do remetente existe no cadastro esperado (preposto/contato).

## 11) URL final de produção (resumo)

Use na Z-API:

`https://api.seudominio.com/api/v1/webhooks/whatsapp`

Substitua `api.seudominio.com` pelo seu domínio real apontando para `177.67.54.150`.


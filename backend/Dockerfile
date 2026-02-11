FROM node:22-alpine AS base
WORKDIR /app

# Dependências
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate --schema=src/prisma/schema.prisma
RUN npm run build

# Produção
FROM base AS production
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# O build compilado importa o Prisma client a partir de dist/generated.
COPY --from=build /app/src/generated ./dist/generated
# Seed e comandos Prisma (tsx) usam importacao em src/generated.
COPY --from=build /app/src/generated ./src/generated
COPY --from=build /app/src/prisma ./src/prisma
COPY prisma.config.ts ./
COPY package.json ./

EXPOSE 3001
CMD ["node", "dist/server.js"]

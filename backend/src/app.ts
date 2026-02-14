import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { env } from './config/env.js'
import authPlugin from './plugins/auth.js'
import authRoutes from './routes/auth.routes.js'
import audienciasRoutes from './routes/audiencias.routes.js'
import prepostosRoutes from './routes/prepostos.routes.js'
import importacoesRoutes from './routes/importacoes.routes.js'
import parceirosRoutes from './routes/parceiros.routes.js'
import trtsRoutes from './routes/trts.routes.js'
import webhooksRoutes from './routes/webhooks.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import configuracoesRoutes from './routes/configuracoes.routes.js'
import agentRoutes from './routes/agent.routes.js'

export async function buildApp() {
  const app = Fastify({
    logger: true,
  })

  // Plugins
  await app.register(cors, {
    origin: true,
  })

  await app.register(jwt, {
    secret: env.JWT_SECRET,
  })

  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max para planilhas
    },
  })

  await app.register(authPlugin)

  // Health check
  app.get('/api/v1/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  // Rotas
  await app.register(authRoutes, { prefix: '/api/v1/auth' })
  await app.register(audienciasRoutes, { prefix: '/api/v1/audiencias' })
  await app.register(prepostosRoutes, { prefix: '/api/v1/prepostos' })
  await app.register(parceirosRoutes, { prefix: '/api/v1/parceiros' })
  await app.register(trtsRoutes, { prefix: '/api/v1/trts' })
  await app.register(importacoesRoutes, { prefix: '/api/v1/importacoes' })
  await app.register(webhooksRoutes, { prefix: '/api/v1/webhooks' })
  await app.register(usuariosRoutes, { prefix: '/api/v1/usuarios' })
  await app.register(configuracoesRoutes, { prefix: '/api/v1/configuracoes' })
  await app.register(agentRoutes, { prefix: '/api/v1/agent' })

  return app
}

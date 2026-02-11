import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { env } from './config/env.js'
import authPlugin from './plugins/auth.js'
import authRoutes from './routes/auth.routes.js'
import audienciasRoutes from './routes/audiencias.routes.js'

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
  // await app.register(prepostoRoutes, { prefix: '/api/v1/prepostos' })
  // await app.register(parceiroRoutes, { prefix: '/api/v1/parceiros' })
  // await app.register(trtRoutes, { prefix: '/api/v1/trts' })
  // await app.register(importacaoRoutes, { prefix: '/api/v1/importacoes' })
  // await app.register(webhookRoutes, { prefix: '/api/v1/webhooks' })
  // await app.register(usuarioRoutes, { prefix: '/api/v1/usuarios' })

  return app
}

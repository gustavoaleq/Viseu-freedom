import { FastifyInstance } from 'fastify'
import { env } from '../config/env.js'

export default async function webhooksRoutes(app: FastifyInstance) {
  // GET /api/v1/webhooks/whatsapp
  app.get('/whatsapp', async (request, reply) => {
    const query = request.query as Record<string, string | undefined>

    const mode = query['hub.mode']
    const token = query['hub.verify_token']
    const challenge = query['hub.challenge']

    if (mode === 'subscribe' && token === env.WHATSAPP_VERIFY_TOKEN && challenge) {
      return reply.type('text/plain').send(challenge)
    }

    return reply.status(403).send({ error: 'Token de verificacao invalido' })
  })

  // POST /api/v1/webhooks/whatsapp
  app.post('/whatsapp', async (request, reply) => {
    app.log.info({ payload: request.body }, 'Webhook recebido')
    return reply.send({ ok: true })
  })
}

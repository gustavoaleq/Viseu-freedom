import { FastifyInstance } from 'fastify'
import { env } from '../config/env.js'
import { obterResumoFilaOrquestracao } from '../jobs/orquestracao.queue.js'
import { processarRespostaWhatsApp } from '../services/whatsapp-inbound.service.js'

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

  // GET /api/v1/webhooks/workers/status
  app.get('/workers/status', async (_request, reply) => {
    try {
      const fila = await obterResumoFilaOrquestracao()
      return reply.send({
        ok: true,
        worker: 'embutido-no-backend',
        fila,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      app.log.error(error)
      return reply.status(500).send({ ok: false, error: 'Falha ao consultar status da fila' })
    }
  })

  // POST /api/v1/webhooks/whatsapp
  app.post('/whatsapp', async (request, reply) => {
    const resultado = await processarRespostaWhatsApp(request.body)
    app.log.info({ resultado }, 'Webhook WhatsApp processado')
    return reply.send(resultado)
  })
}

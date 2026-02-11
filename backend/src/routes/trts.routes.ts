import { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import { listarTrts, atualizarTrt } from '../services/trts.service.js'

const atualizarSchema = z.object({
  ativo: z.boolean(),
})

export default async function trtsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/trts
  app.get('/', async (_request, reply) => {
    const trts = await listarTrts()
    return reply.send(trts)
  })

  // PATCH /api/v1/trts/:id
  app.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = atualizarSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const trt = await atualizarTrt(id, parse.data.ativo)
    if (!trt) {
      return reply.status(404).send({ error: 'TRT nao encontrado' })
    }

    return reply.send(trt)
  })
}

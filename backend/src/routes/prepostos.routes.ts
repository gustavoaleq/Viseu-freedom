import { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import {
  listarPrepostos,
  criarPreposto,
  atualizarPreposto,
  removerPreposto,
} from '../services/prepostos.service.js'

const criarSchema = z.object({
  nome: z.string().min(2, 'Nome e obrigatorio'),
  telefoneWhatsapp: z.string().min(10, 'Telefone invalido'),
  email: z.email('E-mail invalido').optional(),
  cpf: z.string().optional(),
  ativo: z.boolean().optional(),
})

const atualizarSchema = z
  .object({
    nome: z.string().min(2, 'Nome invalido').optional(),
    telefoneWhatsapp: z.string().min(10, 'Telefone invalido').optional(),
    email: z.email('E-mail invalido').optional(),
    cpf: z.string().optional(),
    ativo: z.boolean().optional(),
  })
  .refine((dados) => Object.keys(dados).length > 0, {
    message: 'Informe ao menos um campo para atualizar',
  })

export default async function prepostosRoutes(app: FastifyInstance) {
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/prepostos
  app.get('/', async (request, reply) => {
    const query = request.query as Record<string, string>
    const ativoRaw = query.ativo?.toLowerCase()

    const filtros = {
      busca: query.busca,
      ativo: ativoRaw === undefined ? undefined : ativoRaw === 'true',
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 20,
    }

    const resultado = await listarPrepostos(filtros)
    return reply.send(resultado)
  })

  // POST /api/v1/prepostos
  app.post('/', async (request, reply) => {
    const parse = criarSchema.safeParse(request.body)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const preposto = await criarPreposto(parse.data)
      return reply.status(201).send(preposto)
    } catch {
      return reply.status(409).send({
        error: 'Ja existe preposto com este telefone',
      })
    }
  })

  // PATCH /api/v1/prepostos/:id
  app.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = atualizarSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const preposto = await atualizarPreposto(id, parse.data)
      if (!preposto) {
        return reply.status(404).send({ error: 'Preposto nao encontrado' })
      }

      return reply.send(preposto)
    } catch {
      return reply.status(409).send({
        error: 'Ja existe preposto com este telefone',
      })
    }
  })

  // DELETE /api/v1/prepostos/:id
  app.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const preposto = await removerPreposto(id)

    if (!preposto) {
      return reply.status(404).send({ error: 'Preposto nao encontrado' })
    }

    return reply.send({
      message: 'Preposto removido com sucesso',
      id: preposto.id,
    })
  })
}

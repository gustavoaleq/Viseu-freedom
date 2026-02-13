import { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import {
  listarParceiros,
  criarParceiro,
  atualizarParceiro,
  listarContatosParceiro,
  criarContatoParceiro,
  atualizarContatoParceiro,
  removerContatoParceiro,
} from '../services/parceiros.service.js'

const criarParceiroSchema = z.object({
  nome: z.string().min(2, 'Nome e obrigatorio'),
  ativo: z.boolean().optional(),
})

const atualizarParceiroSchema = z
  .object({
    nome: z.string().min(2, 'Nome invalido').optional(),
    ativo: z.boolean().optional(),
  })
  .refine((dados) => Object.keys(dados).length > 0, {
    message: 'Informe ao menos um campo para atualizar',
  })

const criarContatoSchema = z.object({
  nome: z.string().min(2, 'Nome e obrigatorio'),
  telefoneWhatsapp: z.string().min(10, 'Telefone invalido'),
  email: z.email('E-mail invalido').optional(),
  cargo: z.string().optional(),
  ordemEscalonamento: z.number().int().positive().optional(),
})

const atualizarContatoSchema = z
  .object({
    nome: z.string().min(2, 'Nome invalido').optional(),
    telefoneWhatsapp: z.string().min(10, 'Telefone invalido').optional(),
    email: z.email('E-mail invalido').optional(),
    cargo: z.string().optional(),
    ordemEscalonamento: z.number().int().positive().optional(),
  })
  .refine((dados) => Object.keys(dados).length > 0, {
    message: 'Informe ao menos um campo para atualizar',
  })

export default async function parceirosRoutes(app: FastifyInstance) {
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/parceiros
  app.get('/', async (request, reply) => {
    const query = request.query as Record<string, string>
    const ativoRaw = query.ativo?.toLowerCase()

    const filtros = {
      busca: query.busca,
      ativo: ativoRaw === undefined ? undefined : ativoRaw === 'true',
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 20,
    }

    const resultado = await listarParceiros(filtros)
    return reply.send(resultado)
  })

  // POST /api/v1/parceiros
  app.post('/', async (request, reply) => {
    const parse = criarParceiroSchema.safeParse(request.body)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const parceiro = await criarParceiro(parse.data)
      return reply.status(201).send(parceiro)
    } catch (error) {
      if (error instanceof Error && error.message === 'PARCEIRO_DUPLICADO') {
        return reply.status(409).send({ error: 'Ja existe parceiro com este nome' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao criar parceiro' })
    }
  })

  // PATCH /api/v1/parceiros/:id
  app.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = atualizarParceiroSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const parceiro = await atualizarParceiro(id, parse.data)
      if (!parceiro) {
        return reply.status(404).send({ error: 'Parceiro nao encontrado' })
      }

      return reply.send(parceiro)
    } catch (error) {
      if (error instanceof Error && error.message === 'PARCEIRO_DUPLICADO') {
        return reply.status(409).send({ error: 'Ja existe parceiro com este nome' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao atualizar parceiro' })
    }
  })

  // GET /api/v1/parceiros/:id/contatos
  app.get('/:id/contatos', async (request, reply) => {
    const { id } = request.params as { id: string }
    const resultado = await listarContatosParceiro(id)

    if (!resultado) {
      return reply.status(404).send({ error: 'Parceiro nao encontrado' })
    }

    return reply.send(resultado)
  })

  // POST /api/v1/parceiros/:id/contatos
  app.post('/:id/contatos', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = criarContatoSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const contato = await criarContatoParceiro(id, parse.data)
      if (!contato) {
        return reply.status(404).send({ error: 'Parceiro nao encontrado' })
      }

      return reply.status(201).send(contato)
    } catch (error) {
      if (error instanceof Error && error.message === 'TELEFONE_INVALIDO') {
        return reply.status(400).send({ error: 'Telefone invalido' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao criar contato' })
    }
  })

  // PATCH /api/v1/parceiros/:id/contatos/:contatoId
  app.patch('/:id/contatos/:contatoId', async (request, reply) => {
    const { id, contatoId } = request.params as { id: string; contatoId: string }
    const parse = atualizarContatoSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const contato = await atualizarContatoParceiro(id, contatoId, parse.data)
      if (!contato) {
        return reply.status(404).send({ error: 'Parceiro nao encontrado' })
      }

      return reply.send(contato)
    } catch (error) {
      if (error instanceof Error && error.message === 'TELEFONE_INVALIDO') {
        return reply.status(400).send({ error: 'Telefone invalido' })
      }
      if (error instanceof Error && error.message === 'CONTATO_NAO_ENCONTRADO') {
        return reply.status(404).send({ error: 'Contato nao encontrado para este parceiro' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao atualizar contato' })
    }
  })

  // DELETE /api/v1/parceiros/:id/contatos/:contatoId
  app.delete('/:id/contatos/:contatoId', async (request, reply) => {
    const { id, contatoId } = request.params as { id: string; contatoId: string }

    try {
      const contato = await removerContatoParceiro(id, contatoId)
      if (!contato) {
        return reply.status(404).send({ error: 'Parceiro nao encontrado' })
      }

      return reply.send({
        message: 'Contato removido com sucesso',
        id: contato.id,
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'CONTATO_NAO_ENCONTRADO') {
        return reply.status(404).send({ error: 'Contato nao encontrado para este parceiro' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao remover contato' })
    }
  })
}

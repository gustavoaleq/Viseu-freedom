import { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import {
  buscarResumoOperacional,
  listarAudienciasDoDia,
  listarProximasAudiencias,
  listarAudienciasPorStatus,
  buscarIndicadoresPosRelatorio,
} from '../services/agent.service.js'

const STATUS_VALIDOS = [
  'IMPORTADA',
  'AGENDADA',
  'A_CONFIRMAR',
  'CONFIRMADA',
  'NAO_POSSO',
  'SEM_RESPOSTA',
  'SUBSTITUICAO_NECESSARIA',
  'EM_ANDAMENTO',
  'CHECK_IN_PENDENTE',
  'RELATORIO_PENDENTE',
  'CONCLUIDA',
  'CANCELADA',
] as const

const dataRefSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato invalido. Use YYYY-MM-DD')

const boolStringSchema = z
  .union([z.literal('true'), z.literal('false')])
  .transform((valor) => valor === 'true')

const resumoQuerySchema = z.object({
  dataRef: dataRefSchema.optional(),
})

const diaQuerySchema = z.object({
  dataRef: dataRefSchema.optional(),
  somenteAbertas: boolStringSchema.optional(),
})

const proximasQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  somenteAbertas: boolStringSchema.optional(),
})

const statusQuerySchema = z.object({
  status: z.enum(STATUS_VALIDOS),
  limit: z.coerce.number().int().min(1).max(100).optional(),
})

const posRelatorioQuerySchema = z.object({
  dias: z.coerce.number().int().min(1).max(180).optional(),
})

export default async function agentRoutes(app: FastifyInstance) {
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/agent/resumo-operacional
  app.get('/resumo-operacional', async (request, reply) => {
    const parse = resumoQuerySchema.safeParse(request.query)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const resumo = await buscarResumoOperacional(parse.data.dataRef)
    return reply.send(resumo)
  })

  // GET /api/v1/agent/audiencias-do-dia
  app.get('/audiencias-do-dia', async (request, reply) => {
    const parse = diaQuerySchema.safeParse(request.query)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const resultado = await listarAudienciasDoDia(
      parse.data.dataRef,
      parse.data.somenteAbertas ?? true,
    )
    return reply.send(resultado)
  })

  // GET /api/v1/agent/proximas-audiencias
  app.get('/proximas-audiencias', async (request, reply) => {
    const parse = proximasQuerySchema.safeParse(request.query)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const resultado = await listarProximasAudiencias(
      parse.data.limit ?? 10,
      parse.data.somenteAbertas ?? true,
    )
    return reply.send(resultado)
  })

  // GET /api/v1/agent/audiencias-por-status
  app.get('/audiencias-por-status', async (request, reply) => {
    const parse = statusQuerySchema.safeParse(request.query)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const resultado = await listarAudienciasPorStatus(
      parse.data.status,
      parse.data.limit ?? 20,
    )
    return reply.send(resultado)
  })

  // GET /api/v1/agent/indicadores-pos-relatorio
  app.get('/indicadores-pos-relatorio', async (request, reply) => {
    const parse = posRelatorioQuerySchema.safeParse(request.query)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const resultado = await buscarIndicadoresPosRelatorio(parse.data.dias ?? 30)
    return reply.send(resultado)
  })
}

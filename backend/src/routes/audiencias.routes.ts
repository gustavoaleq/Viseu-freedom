import { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import {
  listarAudiencias,
  criarAudiencia,
  buscarAudienciaPorId,
  atualizarAudiencia,
  buscarKanban,
  buscarDashboard,
  trocarPreposto,
} from '../services/audiencias.service.js'

// === Schemas de validação ===

const STATUS_VALIDOS = [
  'IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'NAO_POSSO',
  'SEM_RESPOSTA', 'SUBSTITUICAO_NECESSARIA', 'EM_ANDAMENTO',
  'CHECK_IN_PENDENTE', 'RELATORIO_PENDENTE', 'CONCLUIDA', 'CANCELADA',
] as const

const MODALIDADES = ['PRESENCIAL', 'ONLINE'] as const

const criarSchema = z.object({
  numeroProcesso: z.string().min(1, 'Número do processo é obrigatório'),
  reclamante: z.string().optional(),
  data: z.coerce.date(),
  hora: z.string().min(1, 'Hora é obrigatória'),
  modalidade: z.enum(MODALIDADES),
  local: z.string().optional(),
  link: z.string().optional(),
  trtId: z.uuid('TRT inválido'),
  vara: z.string().optional(),
  prepostoId: z.uuid('Preposto inválido'),
  parceiroId: z.uuid('Parceiro inválido'),
  observacoes: z.string().optional(),
})

const atualizarSchema = z.object({
  numeroProcesso: z.string().min(1).optional(),
  reclamante: z.string().optional(),
  data: z.coerce.date().optional(),
  hora: z.string().min(1).optional(),
  modalidade: z.enum(MODALIDADES).optional(),
  local: z.string().optional(),
  link: z.string().optional(),
  trtId: z.uuid().optional(),
  vara: z.string().optional(),
  prepostoId: z.uuid().optional(),
  parceiroId: z.uuid().optional(),
  observacoes: z.string().optional(),
  status: z.enum(STATUS_VALIDOS).optional(),
})

const trocarPrepostoSchema = z.object({
  prepostoNovoId: z.uuid('Preposto inválido'),
  motivo: z.string().min(1, 'Motivo é obrigatório'),
})

// === Rotas ===

export default async function audienciasRoutes(app: FastifyInstance) {
  // Todas as rotas de audiências requerem autenticação
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/audiencias/kanban
  // IMPORTANTE: rotas estáticas antes de rotas com :id
  app.get('/kanban', async (request, reply) => {
    const kanban = await buscarKanban()
    return reply.send(kanban)
  })

  // GET /api/v1/audiencias/dashboard
  app.get('/dashboard', async (request, reply) => {
    const dashboard = await buscarDashboard()
    return reply.send(dashboard)
  })

  // GET /api/v1/audiencias
  app.get('/', async (request, reply) => {
    const query = request.query as Record<string, string>

    const filtros = {
      status: query.status as any,
      trtId: query.trtId,
      prepostoId: query.prepostoId,
      parceiroId: query.parceiroId,
      modalidade: query.modalidade as any,
      dataInicio: query.dataInicio ? new Date(query.dataInicio) : undefined,
      dataFim: query.dataFim ? new Date(query.dataFim) : undefined,
      busca: query.busca,
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 20,
    }

    const resultado = await listarAudiencias(filtros)
    return reply.send(resultado)
  })

  // POST /api/v1/audiencias
  app.post('/', async (request, reply) => {
    const parse = criarSchema.safeParse(request.body)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        detalhes: parse.error.issues,
      })
    }

    const audiencia = await criarAudiencia(parse.data, request.user.id)
    return reply.status(201).send(audiencia)
  })

  // GET /api/v1/audiencias/:id
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const audiencia = await buscarAudienciaPorId(id)

    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiência não encontrada' })
    }

    return reply.send(audiencia)
  })

  // PATCH /api/v1/audiencias/:id
  app.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = atualizarSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        detalhes: parse.error.issues,
      })
    }

    const audiencia = await atualizarAudiencia(id, parse.data, request.user.id)
    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiência não encontrada' })
    }

    return reply.send(audiencia)
  })

  // POST /api/v1/audiencias/:id/trocar-preposto
  app.post('/:id/trocar-preposto', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = trocarPrepostoSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        detalhes: parse.error.issues,
      })
    }

    const audiencia = await trocarPreposto(
      id,
      parse.data.prepostoNovoId,
      parse.data.motivo,
      request.user.id,
    )

    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiência não encontrada' })
    }

    return reply.send(audiencia)
  })

  // POST /api/v1/audiencias/:id/reenviar-confirmacao
  app.post('/:id/reenviar-confirmacao', async (request, reply) => {
    const { id } = request.params as { id: string }
    const audiencia = await buscarAudienciaPorId(id)

    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiência não encontrada' })
    }

    // Na POC, apenas registra a intenção. Integração WhatsApp será via jobs.
    return reply.send({
      message: 'Confirmação será reenviada',
      audienciaId: id,
    })
  })
}

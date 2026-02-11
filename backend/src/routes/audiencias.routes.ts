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
  exportarAudiencias,
  reenviarConfirmacao,
  cancelarAudiencia,
  confirmarAudienciaPorTelefone,
  registrarCheckInAudiencia,
  registrarRelatorioAudiencia,
} from '../services/audiencias.service.js'

const STATUS_VALIDOS = [
  'IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'NAO_POSSO',
  'SEM_RESPOSTA', 'SUBSTITUICAO_NECESSARIA', 'EM_ANDAMENTO',
  'CHECK_IN_PENDENTE', 'RELATORIO_PENDENTE', 'CONCLUIDA', 'CANCELADA',
] as const

const MODALIDADES = ['PRESENCIAL', 'ONLINE'] as const
const EVENTOS_CHECKIN = ['ESTOU_A_CAMINHO', 'JA_CHEGUEI', 'ESTOU_COM_PROBLEMA'] as const
const OCORRENCIAS_AUDIENCIA = ['SIM', 'NAO', 'REMARCADA'] as const
const RESULTADOS_AUDIENCIA = ['ACORDO', 'SEM_ACORDO', 'AUSENCIA', 'REDESIGNADA'] as const

const criarSchema = z.object({
  numeroProcesso: z.string().min(1, 'Numero do processo e obrigatorio'),
  reclamante: z.string().optional(),
  reclamada: z.string().optional(),
  tipoAudiencia: z.string().optional(),
  data: z.coerce.date(),
  hora: z.string().min(1, 'Hora e obrigatoria'),
  modalidade: z.enum(MODALIDADES),
  comarca: z.string().optional(),
  advogado: z.string().optional(),
  contatoAdvogado: z.string().optional(),
  correspondente: z.string().optional(),
  local: z.string().optional(),
  link: z.string().optional(),
  trtId: z.uuid('TRT invalido'),
  vara: z.string().optional(),
  prepostoId: z.uuid('Preposto invalido'),
  parceiroId: z.uuid('Parceiro invalido'),
  observacoes: z.string().optional(),
})

const atualizarSchema = z.object({
  numeroProcesso: z.string().min(1).optional(),
  reclamante: z.string().optional(),
  reclamada: z.string().optional(),
  tipoAudiencia: z.string().optional(),
  data: z.coerce.date().optional(),
  hora: z.string().min(1).optional(),
  modalidade: z.enum(MODALIDADES).optional(),
  comarca: z.string().optional(),
  advogado: z.string().optional(),
  contatoAdvogado: z.string().optional(),
  correspondente: z.string().optional(),
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
  prepostoNovoId: z.uuid('Preposto invalido'),
  motivo: z.string().min(1, 'Motivo e obrigatorio'),
})

const cancelarSchema = z.object({
  motivo: z.string().min(1, 'Motivo e obrigatorio'),
})

const confirmarTelefoneSchema = z.object({
  observacao: z.string().min(1, 'Observacao e obrigatoria'),
})

const checkInSchema = z.object({
  evento: z.enum(EVENTOS_CHECKIN),
  observacao: z.string().optional(),
})

const relatorioSchema = z.object({
  audienciaOcorreu: z.enum(OCORRENCIAS_AUDIENCIA),
  resultado: z.enum(RESULTADOS_AUDIENCIA),
  advogadoPresente: z.boolean(),
  advogadoDominioCaso: z.boolean(),
  problemaRelevante: z.boolean(),
  relato: z.string().optional(),
})

export default async function audienciasRoutes(app: FastifyInstance) {
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/audiencias/kanban
  app.get('/kanban', async (_request, reply) => {
    const kanban = await buscarKanban()
    return reply.send(kanban)
  })

  // GET /api/v1/audiencias/dashboard
  app.get('/dashboard', async (_request, reply) => {
    const dashboard = await buscarDashboard()
    return reply.send(dashboard)
  })

  // GET /api/v1/audiencias/export
  app.get('/export', async (request, reply) => {
    const query = request.query as Record<string, string>
    const formato = query.formato === 'xlsx' ? 'xlsx' : 'csv'

    const filtros = {
      status: query.status as (typeof STATUS_VALIDOS)[number] | undefined,
      trtId: query.trtId,
      prepostoId: query.prepostoId,
      parceiroId: query.parceiroId,
      modalidade: query.modalidade as (typeof MODALIDADES)[number] | undefined,
      dataInicio: query.dataInicio ? new Date(query.dataInicio) : undefined,
      dataFim: query.dataFim ? new Date(query.dataFim) : undefined,
      busca: query.busca,
    }

    const arquivo = await exportarAudiencias(filtros, formato)

    return reply
      .header('Content-Type', arquivo.contentType)
      .header('Content-Disposition', `attachment; filename="${arquivo.filename}"`)
      .send(arquivo.buffer)
  })

  // GET /api/v1/audiencias
  app.get('/', async (request, reply) => {
    const query = request.query as Record<string, string>

    const filtros = {
      status: query.status as (typeof STATUS_VALIDOS)[number] | undefined,
      trtId: query.trtId,
      prepostoId: query.prepostoId,
      parceiroId: query.parceiroId,
      modalidade: query.modalidade as (typeof MODALIDADES)[number] | undefined,
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
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const audiencia = await criarAudiencia(parse.data, request.user.id)
    return reply.status(201).send(audiencia)
  })

  // POST /api/v1/audiencias/:id/trocar-preposto
  app.post('/:id/trocar-preposto', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = trocarPrepostoSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
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
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send(audiencia)
  })

  // POST /api/v1/audiencias/:id/reenviar-confirmacao
  app.post('/:id/reenviar-confirmacao', async (request, reply) => {
    const { id } = request.params as { id: string }
    const resultado = await reenviarConfirmacao(id, request.user.id)

    if (!resultado) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send(resultado)
  })

  // POST /api/v1/audiencias/:id/cancelar
  app.post('/:id/cancelar', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = cancelarSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const audiencia = await cancelarAudiencia(id, parse.data.motivo, request.user.id)
    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send(audiencia)
  })

  // POST /api/v1/audiencias/:id/confirmar-telefone
  app.post('/:id/confirmar-telefone', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = confirmarTelefoneSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const audiencia = await confirmarAudienciaPorTelefone(id, parse.data.observacao, request.user.id)
    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send(audiencia)
  })

  // POST /api/v1/audiencias/:id/check-in
  app.post('/:id/check-in', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = checkInSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const audiencia = await registrarCheckInAudiencia(
      id,
      parse.data.evento,
      parse.data.observacao,
      request.user.id,
    )

    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send(audiencia)
  })

  // POST /api/v1/audiencias/:id/relatorio
  app.post('/:id/relatorio', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = relatorioSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const relatorio = await registrarRelatorioAudiencia(id, parse.data, request.user.id)

    if (!relatorio) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send(relatorio)
  })

  // GET /api/v1/audiencias/:id
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const audiencia = await buscarAudienciaPorId(id)

    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send(audiencia)
  })

  // PATCH /api/v1/audiencias/:id
  app.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = atualizarSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const audiencia = await atualizarAudiencia(id, parse.data, request.user.id)
    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send(audiencia)
  })
}

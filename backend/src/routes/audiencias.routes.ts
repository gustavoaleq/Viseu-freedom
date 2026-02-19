import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
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
  deletarAudienciaDefinitiva,
  confirmarAudienciaPorTelefone,
  registrarCheckInAudiencia,
  registrarRelatorioAudiencia,
  exportarRelatorioPosAudiencia,
} from '../services/audiencias.service.js'
import { processarOrquestracaoAudiencia } from '../jobs/orquestracao.processor.js'

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

const relatorioSchema = z
  .object({
    audienciaOcorreu: z.enum(OCORRENCIAS_AUDIENCIA),
    docAntecedencia: z.boolean(),
    docAntecedenciaJustificativa: z.string().optional(),
    advogadoAntecedencia: z.boolean(),
    advogadoAntecedenciaJustificativa: z.string().optional(),
    infoCompleta: z.enum(['SIM', 'NAO']),
    infoFaltante: z.string().optional(),
    conhecimentoAdvogado: z.boolean(),
    comentarioConhecimento: z.string().min(1, 'Comentario e obrigatorio'),
    avaliacaoAtuacao: z.enum(['BOM', 'REGULAR', 'RUIM']),
    comentarioAvaliacao: z.string().min(1, 'Comentario e obrigatorio'),
    comentarioFinal: z.string().min(1, 'Comentario final e obrigatorio'),
  })
  .refine(
    (dados) => (dados.docAntecedencia ? true : Boolean(dados.docAntecedenciaJustificativa?.trim())),
    {
      message: 'Informe a justificativa quando selecionar "Nao".',
      path: ['docAntecedenciaJustificativa'],
    },
  )
  .refine(
    (dados) =>
      dados.advogadoAntecedencia ? true : Boolean(dados.advogadoAntecedenciaJustificativa?.trim()),
    {
      message: 'Informe a justificativa quando selecionar "Nao".',
      path: ['advogadoAntecedenciaJustificativa'],
    },
  )
  .refine(
    (dados) => (dados.infoCompleta === 'NAO' ? Boolean(dados.infoFaltante?.trim()) : true),
    {
      message: 'Informe o que faltou nas informacoes quando selecionar "Nao".',
      path: ['infoFaltante'],
    },
  )

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

    try {
      const audiencia = await criarAudiencia(parse.data, request.user.id)
      return reply.status(201).send(audiencia)
    } catch (error) {
      if (error instanceof Error && error.message === 'TRT_NAO_ENCONTRADO') {
        return reply.status(400).send({ error: 'TRT informado nao existe' })
      }

      if (error instanceof Error && error.message === 'TRT_INATIVO') {
        return reply.status(400).send({ error: 'TRT inativo nao pode ser selecionado' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao criar audiencia' })
    }
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

  // POST /api/v1/audiencias/:id/disparos/d1
  app.post('/:id/disparos/d1', async (request, reply) => {
    return dispararOrquestracaoManual('CONFIRMACAO_D1', request, reply)
  })

  // POST /api/v1/audiencias/:id/disparos/check-in
  app.post('/:id/disparos/check-in', async (request, reply) => {
    return dispararOrquestracaoManual('CHECKIN_DIA', request, reply)
  })

  // POST /api/v1/audiencias/:id/disparos/reiteracao-6h
  app.post('/:id/disparos/reiteracao-6h', async (request, reply) => {
    return dispararOrquestracaoManual('REITERACAO_6H', request, reply, { forcar: true })
  })

  // POST /api/v1/audiencias/:id/disparos/pos-audiencia
  app.post('/:id/disparos/pos-audiencia', async (request, reply) => {
    return dispararOrquestracaoManual('RELATORIO_POS', request, reply)
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

  // DELETE /api/v1/audiencias/:id (ADMIN)
  app.delete('/:id', async (request, reply) => {
    if (request.user.role !== 'ADMIN') {
      return reply.status(403).send({ error: 'Apenas ADMIN pode deletar audiencia definitivamente' })
    }

    const { id } = request.params as { id: string }
    const audiencia = await deletarAudienciaDefinitiva(id)

    if (!audiencia) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    return reply.send({
      ok: true,
      audienciaId: audiencia.id,
      numeroProcesso: audiencia.numeroProcesso,
      message: 'Audiencia removida definitivamente',
    })
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

  // GET /api/v1/audiencias/:id/relatorio/download
  app.get('/:id/relatorio/download', async (request, reply) => {
    const { id } = request.params as { id: string }
    const arquivo = await exportarRelatorioPosAudiencia(id)

    if (!arquivo) {
      return reply.status(404).send({ error: 'Audiencia nao encontrada' })
    }

    if ('error' in arquivo && arquivo.error === 'RELATORIO_NAO_ENCONTRADO') {
      return reply.status(409).send({ error: 'Relatorio pos-audiencia ainda nao preenchido' })
    }

    return reply
      .header('Content-Type', arquivo.contentType)
      .header('Content-Disposition', `attachment; filename="${arquivo.filename}"`)
      .send(arquivo.buffer)
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

    try {
      const audiencia = await atualizarAudiencia(id, parse.data, request.user.id)
      if (!audiencia) {
        return reply.status(404).send({ error: 'Audiencia nao encontrada' })
      }

      return reply.send(audiencia)
    } catch (error) {
      if (error instanceof Error && error.message === 'TRT_NAO_ENCONTRADO') {
        return reply.status(400).send({ error: 'TRT informado nao existe' })
      }

      if (error instanceof Error && error.message === 'TRT_INATIVO') {
        return reply.status(400).send({ error: 'TRT inativo nao pode ser selecionado' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao atualizar audiencia' })
    }
  })

  async function dispararOrquestracaoManual(
    tipo: 'CONFIRMACAO_D1' | 'REITERACAO_6H' | 'CHECKIN_DIA' | 'RELATORIO_POS',
    request: FastifyRequest,
    reply: FastifyReply,
    opcoes: { forcar?: boolean } = {},
  ) {
    const { id } = request.params as { id: string }

    try {
      const resultado = await processarOrquestracaoAudiencia(tipo, id, `manual:${request.user.id}`, {
        origem: 'MANUAL',
        forcar: opcoes.forcar,
      })

      if (!resultado.ok) {
        if (resultado.reason === 'AUDIENCIA_NAO_ENCONTRADA') {
          return reply.status(404).send({ error: 'Audiencia nao encontrada' })
        }

        if (resultado.reason === 'REITERACAO_NAO_APLICAVEL') {
          return reply.status(409).send({
            error: 'Reiteracao nao aplicavel para o estado atual da audiencia',
          })
        }

        if (resultado.reason === 'STATUS_FINAL') {
          return reply
            .status(409)
            .send({ error: 'Audiencia ja finalizada/cancelada. Disparo manual bloqueado.' })
        }

        return reply.status(400).send({ error: 'Audiencia sem preposto para disparo' })
      }

      return reply.send({
        ok: true,
        audienciaId: resultado.audienciaId,
        tipo: resultado.tipo,
        providerMessageId: resultado.providerMessageId,
      })
    } catch (error) {
      app.log.error(error)
      if (error instanceof Error) {
        return reply.status(502).send({
          error: 'Falha no disparo manual de WhatsApp',
          detalhe: error.message,
        })
      }

      return reply.status(500).send({ error: 'Falha no disparo manual de WhatsApp' })
    }
  }
}

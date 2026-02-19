import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'
import {
  obterConfiguracoes,
  atualizarConfiguracoes,
} from '../services/configuracoes.service.js'
import { reagendarTodasAudienciasAtivas } from '../jobs/orquestracao.scheduler.js'

const FUSOS_VALIDOS = [
  'America/Sao_Paulo',
  'America/Manaus',
  'America/Recife',
  'America/Belem',
  'America/Cuiaba',
  'America/Fortaleza',
  'America/Bahia',
  'America/Porto_Velho',
  'America/Rio_Branco',
  'America/Noronha',
] as const

const horarioRegex = /^([01]\d|2[0-3]):[0-5]\d$/

const atualizarSchema = z
  .object({
    enviarAvisoNaImportacao: z.boolean().optional(),
    horarioD1: z
      .union([z.string().regex(horarioRegex, 'Formato invalido. Use HH:mm'), z.null()])
      .optional(),
    antecedenciaD1Horas: z.number().int().min(1).max(72).optional(),
    antecedenciaReiteracaoHoras: z.number().int().min(1).max(48).optional(),
    antecedenciaCheckinMinutos: z.number().int().min(10).max(360).optional(),
    posAudienciaMinutosDepois: z.number().int().min(5).max(180).optional(),
    fusoHorario: z.enum(FUSOS_VALIDOS).optional(),
    mensagemD1: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemReiteracao: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemCheckin: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemPosAudiencia: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemCancelamento: z
      .union([z.string().min(10, 'Mensagem muito curta'), z.null()])
      .optional(),
    respostaD1Confirmacao: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    respostaReiteracaoConfirmacao: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    respostaCheckinConfirmacao: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    respostaPosAudienciaConfirmacao: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemPosPergunta2: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemPosPergunta3: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemPosPergunta4: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemPosPergunta5: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
    mensagemPosPergunta6: z.union([z.string().min(10, 'Mensagem muito curta'), z.null()]).optional(),
  })
  .refine((dados) => Object.keys(dados).length > 0, {
    message: 'Informe ao menos um campo para atualizar',
  })

function exigirAdmin(request: FastifyRequest, reply: FastifyReply) {
  if (request.user.role !== 'ADMIN') {
    reply.status(403).send({ error: 'Acesso negado. Requer perfil ADMIN' })
    return false
  }
  return true
}

export default async function configuracoesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/configuracoes
  app.get('/', async (request, reply) => {
    if (!exigirAdmin(request, reply)) return

    const config = await obterConfiguracoes()
    return reply.send(config)
  })

  // PATCH /api/v1/configuracoes
  app.patch('/', async (request, reply) => {
    if (!exigirAdmin(request, reply)) return

    const parse = atualizarSchema.safeParse(request.body)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const config = await atualizarConfiguracoes(parse.data)

      // Campos que afetam agendamento de jobs
      const camposDeTiming = [
        'horarioD1',
        'antecedenciaD1Horas',
        'antecedenciaReiteracaoHoras',
        'antecedenciaCheckinMinutos',
        'posAudienciaMinutosDepois',
        'fusoHorario',
      ]

      const alterouTiming = camposDeTiming.some(
        (campo) => parse.data[campo as keyof typeof parse.data] !== undefined,
      )

      let reagendadas = 0
      if (alterouTiming) {
        reagendadas = await reagendarTodasAudienciasAtivas()
      }

      return reply.send({
        ...config,
        reagendadas,
      })
    } catch (error) {
      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao atualizar configuracoes' })
    }
  })
}

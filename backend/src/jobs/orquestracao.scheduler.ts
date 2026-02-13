import { env } from '../config/env.js'
import { registrarLogAutomacao } from '../services/automacao-log.service.js'
import {
  filaOrquestracaoAudiencias,
  jobIdOrquestracao,
  type TipoJobOrquestracao,
} from './orquestracao.queue.js'

const DELAY_MINIMO_MS = 5000

interface AgendarParams {
  audienciaId: string
  data: Date
  hora: string
}

export async function agendarOrquestracaoAudiencia(params: AgendarParams) {
  const dataAudiencia = combinarDataHora(params.data, params.hora)
  if (!dataAudiencia) return

  const d1 = new Date(dataAudiencia.getTime() - env.ORQ_D1_HORAS_ANTES * 60 * 60 * 1000)
  const reiteracao = new Date(
    dataAudiencia.getTime() - env.ORQ_REITERACAO_HORAS_ANTES * 60 * 60 * 1000,
  )
  const checkIn = new Date(
    dataAudiencia.getTime() - env.ORQ_CHECKIN_MINUTOS_ANTES * 60 * 1000,
  )
  const pos = new Date(dataAudiencia.getTime() + env.ORQ_POS_MINUTOS_DEPOIS * 60 * 1000)

  const jobs = await Promise.all([
    upsertJob('CONFIRMACAO_D1', params.audienciaId, d1),
    upsertJob('REITERACAO_6H', params.audienciaId, reiteracao),
    upsertJob('CHECKIN_DIA', params.audienciaId, checkIn),
    upsertJob('RELATORIO_POS', params.audienciaId, pos),
  ])

  await Promise.all(
    jobs.map((job) =>
      registrarLogAutomacao({
        audienciaId: params.audienciaId,
        origem: 'SCHEDULER',
        evento: 'AGENDAMENTO',
        etapa: job.tipo,
        status: 'PENDENTE',
        mensagem: job.acao === 'update' ? 'Job reagendado' : 'Job agendado',
        metadados: {
          scheduledFor: job.quando.toISOString(),
        },
      }),
    ),
  )
}

export async function removerOrquestracaoAudiencia(audienciaId: string) {
  const tipos: TipoJobOrquestracao[] = [
    'CONFIRMACAO_D1',
    'REITERACAO_6H',
    'CHECKIN_DIA',
    'RELATORIO_POS',
  ]

  const removidos: string[] = []
  for (const tipo of tipos) {
    const job = await filaOrquestracaoAudiencias.getJob(jobIdOrquestracao(tipo, audienciaId))
    if (job) {
      await job.remove()
      removidos.push(tipo)
    }
  }

  if (removidos.length > 0) {
    await registrarLogAutomacao({
      audienciaId,
      origem: 'SCHEDULER',
      evento: 'REMOCAO_AGENDAMENTO',
      status: 'SUCESSO',
      mensagem: 'Jobs de orquestracao removidos',
      metadados: { etapas: removidos },
    })
  }
}

async function upsertJob(tipo: TipoJobOrquestracao, audienciaId: string, quando: Date) {
  const id = jobIdOrquestracao(tipo, audienciaId)
  const existente = await filaOrquestracaoAudiencias.getJob(id)
  let acao: 'create' | 'update' = 'create'
  if (existente) {
    await existente.remove()
    acao = 'update'
  }

  const delay = Math.max(quando.getTime() - Date.now(), DELAY_MINIMO_MS)

  await filaOrquestracaoAudiencias.add(
    tipo,
    {
      audienciaId,
      scheduledFor: quando.toISOString(),
    },
    {
      jobId: id,
      delay,
    },
  )

  return {
    tipo,
    quando,
    acao,
  }
}

function combinarDataHora(data: Date, hora: string) {
  const match = hora.match(/^(\d{1,2}):(\d{2})/)
  if (!match) return null

  const horas = Number(match[1])
  const minutos = Number(match[2])
  if (Number.isNaN(horas) || Number.isNaN(minutos)) return null

  const ano = data.getUTCFullYear()
  const mes = data.getUTCMonth()
  const dia = data.getUTCDate()

  return criarDataNoFuso({
    ano,
    mes,
    dia,
    horas,
    minutos,
    timeZone: env.ORQ_TIMEZONE,
  })
}

interface CriarDataNoFusoParams {
  ano: number
  mes: number
  dia: number
  horas: number
  minutos: number
  timeZone: string
}

function criarDataNoFuso(params: CriarDataNoFusoParams) {
  const utcReferencia = new Date(
    Date.UTC(params.ano, params.mes, params.dia, params.horas, params.minutos, 0, 0),
  )
  const offsetMinutos = obterOffsetMinutos(utcReferencia, params.timeZone)

  return new Date(utcReferencia.getTime() - offsetMinutos * 60 * 1000)
}

function obterOffsetMinutos(baseUtc: Date, timeZone: string) {
  let partes: Intl.DateTimeFormatPart[]

  try {
    partes = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).formatToParts(baseUtc)
  } catch {
    return 0
  }

  const mapa = Object.fromEntries(partes.map((parte) => [parte.type, parte.value]))
  const ano = Number(mapa.year)
  const mes = Number(mapa.month)
  const dia = Number(mapa.day)
  const horas = Number(mapa.hour)
  const minutos = Number(mapa.minute)
  const segundos = Number(mapa.second)

  const mesmoInstanteComoUtc = Date.UTC(ano, mes - 1, dia, horas, minutos, segundos, 0)
  return (mesmoInstanteComoUtc - baseUtc.getTime()) / (60 * 1000)
}

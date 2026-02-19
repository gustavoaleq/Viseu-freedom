import { Queue } from 'bullmq'
import IORedis from 'ioredis'
import { env } from '../config/env.js'

export const FILA_ORQUESTRACAO_AUDIENCIAS = 'orquestracao-audiencias'

export type TipoJobOrquestracao =
  | 'CONFIRMACAO_D1'
  | 'REITERACAO_6H'
  | 'SEM_RESPOSTA'
  | 'CHECKIN_DIA'
  | 'RELATORIO_POS'

export interface JobOrquestracaoAudiencia {
  audienciaId: string
  scheduledFor: string
}

const redis = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
})

export const filaOrquestracaoAudiencias = new Queue<JobOrquestracaoAudiencia, void, TipoJobOrquestracao>(
  FILA_ORQUESTRACAO_AUDIENCIAS,
  {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: 1000,
      removeOnFail: 5000,
    },
  },
)

export function jobIdOrquestracao(tipo: TipoJobOrquestracao, audienciaId: string) {
  return `${tipo}--${audienciaId}`
}

export async function obterResumoFilaOrquestracao() {
  const contadores = await filaOrquestracaoAudiencias.getJobCounts(
    'waiting',
    'active',
    'delayed',
    'completed',
    'failed',
    'paused',
  )

  return {
    fila: FILA_ORQUESTRACAO_AUDIENCIAS,
    waiting: contadores.waiting ?? 0,
    active: contadores.active ?? 0,
    delayed: contadores.delayed ?? 0,
    completed: contadores.completed ?? 0,
    failed: contadores.failed ?? 0,
    paused: contadores.paused ?? 0,
  }
}

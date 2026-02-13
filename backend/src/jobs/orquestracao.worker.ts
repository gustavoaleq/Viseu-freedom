import { Worker } from 'bullmq'
import IORedis from 'ioredis'
import { env } from '../config/env.js'
import {
  FILA_ORQUESTRACAO_AUDIENCIAS,
  type JobOrquestracaoAudiencia,
  type TipoJobOrquestracao,
} from './orquestracao.queue.js'
import { processarOrquestracaoAudiencia } from './orquestracao.processor.js'

const redisWorker = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
})

export function iniciarWorkerOrquestracao() {
  const worker = new Worker<JobOrquestracaoAudiencia, void, TipoJobOrquestracao>(
    FILA_ORQUESTRACAO_AUDIENCIAS,
    async (job) => {
      await processarOrquestracaoAudiencia(job.name, job.data.audienciaId, 'sistema-orquestracao', {
        origem: 'WORKER',
      })
    },
    {
      connection: redisWorker,
      concurrency: 5,
    },
  )

  worker.on('failed', (job, error) => {
    console.error('[orquestracao-worker] job failed', {
      jobId: job?.id,
      name: job?.name,
      audienciaId: job?.data?.audienciaId,
      error: error.message,
    })
  })

  worker.on('ready', () => {
    console.log('[orquestracao-worker] worker pronto para processar jobs')
  })

  worker.on('error', (error) => {
    console.error('[orquestracao-worker] erro no worker', { error: error.message })
  })

  worker.on('completed', (job) => {
    console.log('[orquestracao-worker] job completed', {
      jobId: job.id,
      name: job.name,
      audienciaId: job.data.audienciaId,
    })
  })

  return worker
}

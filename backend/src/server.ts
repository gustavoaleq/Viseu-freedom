import { buildApp } from './app.js'
import { env } from './config/env.js'
import { iniciarWorkerOrquestracao } from './jobs/orquestracao.worker.js'

async function start() {
  const app = await buildApp()
  const worker = iniciarWorkerOrquestracao()

  try {
    await app.listen({ port: env.PORT, host: env.HOST })
    console.log(`🚀 Backend rodando em http://${env.HOST}:${env.PORT}`)
  } catch (err) {
    await worker.close()
    app.log.error(err)
    process.exit(1)
  }
}

start()

import path from 'node:path'
import { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import {
  uploadImportacao,
  mapearImportacao,
  previewImportacao,
  confirmarImportacao,
  listarImportacoes,
} from '../services/importacoes.service.js'

const mapearSchema = z.object({
  mapeamentoColunas: z.record(z.string(), z.string().min(1, 'Coluna invalida')),
})

export default async function importacoesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/importacoes
  app.get('/', async (request, reply) => {
    const query = request.query as Record<string, string>

    const page = query.page ? Number(query.page) : 1
    const limit = query.limit ? Number(query.limit) : 20

    const resultado = await listarImportacoes(page, limit)
    return reply.send(resultado)
  })

  // POST /api/v1/importacoes/upload
  app.post('/upload', async (request, reply) => {
    const arquivo = await request.file()
    if (!arquivo) {
      return reply.status(400).send({ error: 'Arquivo nao enviado' })
    }

    const extensao = path.extname(arquivo.filename).toLowerCase()
    if (!['.xlsx', '.xls'].includes(extensao)) {
      return reply.status(400).send({
        error: 'Formato de arquivo invalido. Envie .xlsx ou .xls',
      })
    }

    const buffer = await arquivo.toBuffer()
    if (buffer.length === 0) {
      return reply.status(400).send({ error: 'Arquivo vazio' })
    }

    try {
      const resultado = await uploadImportacao(arquivo.filename, buffer)
      return reply.status(201).send(resultado)
    } catch (error) {
      app.log.error(error)
      return reply.status(400).send({ error: 'Falha ao processar planilha' })
    }
  })

  // POST /api/v1/importacoes/:id/mapear
  app.post('/:id/mapear', async (request, reply) => {
    const { id } = request.params as { id: string }
    const parse = mapearSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    const resultado = await mapearImportacao(id, parse.data.mapeamentoColunas)
    if (!resultado) {
      return reply.status(404).send({ error: 'Importacao nao encontrada' })
    }

    if (!resultado.sucesso) {
      return reply.status(400).send({
        error: 'Mapeamento incompleto',
        camposFaltantes: resultado.camposFaltantes,
      })
    }

    return reply.send(resultado)
  })

  // GET /api/v1/importacoes/:id/preview
  app.get('/:id/preview', async (request, reply) => {
    const { id } = request.params as { id: string }

    try {
      const resultado = await previewImportacao(id)
      if (!resultado) {
        return reply.status(404).send({ error: 'Importacao nao encontrada' })
      }

      return reply.send(resultado)
    } catch (error) {
      app.log.error(error)
      return reply.status(400).send({
        error: error instanceof Error ? error.message : 'Falha ao gerar preview',
      })
    }
  })

  // POST /api/v1/importacoes/:id/confirmar
  app.post('/:id/confirmar', async (request, reply) => {
    const { id } = request.params as { id: string }

    try {
      const resultado = await confirmarImportacao(id, request.user.id)
      if (!resultado) {
        return reply.status(404).send({ error: 'Importacao nao encontrada' })
      }

      return reply.send(resultado)
    } catch (error) {
      app.log.error(error)

      const mensagem = error instanceof Error ? error.message : 'Falha ao confirmar importacao'
      const status = mensagem.includes('ja foi confirmada') ? 409 : 400

      return reply.status(status).send({ error: mensagem })
    }
  })
}

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'
import { listarUsuarios, criarUsuario, atualizarUsuario } from '../services/usuarios.service.js'

const ROLES = ['ADMIN', 'OPERADOR', 'GESTOR'] as const

const criarSchema = z.object({
  nome: z.string().min(2, 'Nome e obrigatorio'),
  email: z.email('E-mail invalido'),
  senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  role: z.enum(ROLES).optional(),
  ativo: z.boolean().optional(),
})

const atualizarSchema = z
  .object({
    nome: z.string().min(2).optional(),
    email: z.email().optional(),
    senha: z.string().min(6).optional(),
    role: z.enum(ROLES).optional(),
    ativo: z.boolean().optional(),
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

export default async function usuariosRoutes(app: FastifyInstance) {
  app.addHook('onRequest', app.autenticar)

  // GET /api/v1/usuarios
  app.get('/', async (request, reply) => {
    if (!exigirAdmin(request, reply)) return

    const usuarios = await listarUsuarios()
    return reply.send(usuarios)
  })

  // POST /api/v1/usuarios
  app.post('/', async (request, reply) => {
    if (!exigirAdmin(request, reply)) return

    const parse = criarSchema.safeParse(request.body)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const usuario = await criarUsuario(parse.data)
      return reply.status(201).send(usuario)
    } catch (error) {
      if (error instanceof Error && error.message === 'USUARIO_EMAIL_DUPLICADO') {
        return reply.status(409).send({ error: 'Ja existe usuario com este e-mail' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao criar usuario' })
    }
  })

  // PATCH /api/v1/usuarios/:id
  app.patch('/:id', async (request, reply) => {
    if (!exigirAdmin(request, reply)) return

    const { id } = request.params as { id: string }
    const parse = atualizarSchema.safeParse(request.body)

    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados invalidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      const usuario = await atualizarUsuario(id, parse.data)
      if (!usuario) {
        return reply.status(404).send({ error: 'Usuario nao encontrado' })
      }

      return reply.send(usuario)
    } catch (error) {
      if (error instanceof Error && error.message === 'USUARIO_EMAIL_DUPLICADO') {
        return reply.status(409).send({ error: 'Ja existe usuario com este e-mail' })
      }

      app.log.error(error)
      return reply.status(500).send({ error: 'Falha ao atualizar usuario' })
    }
  })
}

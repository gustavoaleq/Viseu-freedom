import { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import { verificarCredenciais, buscarUsuarioPorId } from '../services/auth.service.js'

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
})

export default async function authRoutes(app: FastifyInstance) {
  // POST /api/v1/auth/login
  app.post('/login', async (request, reply) => {
    const parse = loginSchema.safeParse(request.body)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        detalhes: parse.error.issues,
      })
    }

    const { email, senha } = parse.data

    const usuario = await verificarCredenciais(email, senha)
    if (!usuario) {
      return reply.status(401).send({ error: 'E-mail ou senha incorretos' })
    }

    const token = app.jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      { expiresIn: '24h' },
    )

    return reply.send({
      token,
      usuario,
    })
  })

  // GET /api/v1/auth/me
  app.get('/me', { onRequest: [app.autenticar] }, async (request, reply) => {
    const usuario = await buscarUsuarioPorId(request.user.id)
    if (!usuario) {
      return reply.status(404).send({ error: 'Usuário não encontrado' })
    }

    return reply.send(usuario)
  })

  // POST /api/v1/auth/logout
  app.post('/logout', { onRequest: [app.autenticar] }, async (_request, reply) => {
    // Na POC, logout é client-side (remove o token).
    // Numa versão futura, pode-se usar blacklist de tokens no Redis.
    return reply.send({ message: 'Logout realizado' })
  })
}

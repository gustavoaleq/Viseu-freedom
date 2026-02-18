import { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import {
  verificarCredenciais,
  buscarUsuarioPorId,
  solicitarRedefinicaoSenha,
  redefinirSenha,
} from '../services/auth.service.js'

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

  // POST /api/v1/auth/esqueci-senha
  const esqueciSenhaSchema = z.object({
    email: z.email('E-mail inválido'),
  })

  app.post('/esqueci-senha', async (request, reply) => {
    const parse = esqueciSenhaSchema.safeParse(request.body)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        detalhes: parse.error.issues,
      })
    }

    try {
      await solicitarRedefinicaoSenha(parse.data.email)
    } catch (err) {
      app.log.error(err, 'Erro ao enviar e-mail de redefinição')
    }

    // Sempre retorna sucesso (segurança: não revela se o e-mail existe)
    return reply.send({
      message: 'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.',
    })
  })

  // POST /api/v1/auth/redefinir-senha
  const redefinirSenhaSchema = z.object({
    token: z.string().min(1, 'Token é obrigatório'),
    novaSenha: z.string().min(6, 'A nova senha deve ter no mínimo 6 caracteres'),
  })

  app.post('/redefinir-senha', async (request, reply) => {
    const parse = redefinirSenhaSchema.safeParse(request.body)
    if (!parse.success) {
      return reply.status(400).send({
        error: 'Dados inválidos',
        detalhes: parse.error.issues,
      })
    }

    const resultado = await redefinirSenha(parse.data.token, parse.data.novaSenha)

    if (!resultado.ok) {
      return reply.status(400).send({ error: resultado.motivo })
    }

    return reply.send({ message: 'Senha redefinida com sucesso.' })
  })
}

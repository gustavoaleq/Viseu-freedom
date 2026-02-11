import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'

interface JwtPayload {
  id: string
  email: string
  role: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtPayload
    user: JwtPayload
  }
}

async function authPlugin(app: FastifyInstance) {
  app.decorate('autenticar', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.status(401).send({ error: 'Token inválido ou expirado' })
    }
  })
}

declare module 'fastify' {
  interface FastifyInstance {
    autenticar: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

export default fp(authPlugin, { name: 'auth' })

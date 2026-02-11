import bcrypt from 'bcryptjs'
import { prisma } from '../config/database.js'

export async function verificarCredenciais(email: string, senha: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
    select: {
      id: true,
      nome: true,
      email: true,
      senha: true,
      role: true,
      ativo: true,
    },
  })

  if (!usuario) {
    return null
  }

  if (!usuario.ativo) {
    return null
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha)
  if (!senhaValida) {
    return null
  }

  // Retorna sem a senha
  const { senha: _, ...usuarioSemSenha } = usuario
  return usuarioSemSenha
}

export async function buscarUsuarioPorId(id: string) {
  return prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      ativo: true,
      createdAt: true,
    },
  })
}

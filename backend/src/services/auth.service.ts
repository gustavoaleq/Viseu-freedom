import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { prisma } from '../config/database.js'
import { env } from '../config/env.js'
import { enviarEmail, gerarEmailRedefinicao } from './email.service.js'

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

export async function solicitarRedefinicaoSenha(email: string) {
  const usuario = await prisma.usuario.findUnique({ where: { email } })
  if (!usuario || !usuario.ativo) {
    // Retorna silenciosamente para nao revelar se o e-mail existe
    return
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiraEm = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { resetToken: token, resetTokenExpiraEm: expiraEm },
  })

  const link = `${env.HUB_FRONTEND_URL}/redefinir-senha?token=${token}`
  const html = gerarEmailRedefinicao(usuario.nome, link)

  await enviarEmail({
    para: usuario.email,
    assunto: 'Redefinicao de senha — Freedom.AI Hub',
    html,
  })
}

export async function redefinirSenha(token: string, novaSenha: string) {
  const usuario = await prisma.usuario.findUnique({ where: { resetToken: token } })

  if (!usuario || !usuario.resetTokenExpiraEm) {
    return { ok: false, motivo: 'Token invalido' }
  }

  if (usuario.resetTokenExpiraEm < new Date()) {
    return { ok: false, motivo: 'Token expirado. Solicite uma nova redefinicao.' }
  }

  const hash = await bcrypt.hash(novaSenha, 10)

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: {
      senha: hash,
      resetToken: null,
      resetTokenExpiraEm: null,
    },
  })

  return { ok: true }
}

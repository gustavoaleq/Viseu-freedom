import bcrypt from 'bcryptjs'
import { prisma } from '../config/database.js'
import type { RoleUsuario } from '../generated/prisma/client.js'

interface DadosCriarUsuario {
  nome: string
  email: string
  senha: string
  role?: RoleUsuario
  ativo?: boolean
}

interface DadosAtualizarUsuario {
  nome?: string
  email?: string
  senha?: string
  role?: RoleUsuario
  ativo?: boolean
}

export async function listarUsuarios() {
  return prisma.usuario.findMany({
    orderBy: { nome: 'asc' },
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      ativo: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function criarUsuario(dados: DadosCriarUsuario) {
  const email = dados.email.trim().toLowerCase()

  const existente = await prisma.usuario.findUnique({
    where: { email },
    select: { id: true },
  })

  if (existente) {
    throw new Error('USUARIO_EMAIL_DUPLICADO')
  }

  const senhaHash = await bcrypt.hash(dados.senha, 10)

  return prisma.usuario.create({
    data: {
      nome: dados.nome.trim(),
      email,
      senha: senhaHash,
      role: dados.role ?? 'OPERADOR',
      ativo: dados.ativo ?? true,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      ativo: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function atualizarUsuario(id: string, dados: DadosAtualizarUsuario) {
  const usuarioAtual = await prisma.usuario.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!usuarioAtual) return null

  const email = dados.email?.trim().toLowerCase()
  if (email) {
    const emailEmUso = await prisma.usuario.findFirst({
      where: {
        email,
        NOT: { id },
      },
      select: { id: true },
    })

    if (emailEmUso) {
      throw new Error('USUARIO_EMAIL_DUPLICADO')
    }
  }

  const senhaHash = dados.senha ? await bcrypt.hash(dados.senha, 10) : undefined

  return prisma.usuario.update({
    where: { id },
    data: {
      ...(dados.nome ? { nome: dados.nome.trim() } : {}),
      ...(email ? { email } : {}),
      ...(senhaHash ? { senha: senhaHash } : {}),
      ...(dados.role ? { role: dados.role } : {}),
      ...(typeof dados.ativo === 'boolean' ? { ativo: dados.ativo } : {}),
    },
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      ativo: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

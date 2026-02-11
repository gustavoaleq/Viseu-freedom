import { prisma } from '../config/database.js'

interface FiltrosPreposto {
  busca?: string
  ativo?: boolean
  page?: number
  limit?: number
}

interface DadosCriarPreposto {
  nome: string
  telefoneWhatsapp: string
  email?: string
  cpf?: string
  ativo?: boolean
}

interface DadosAtualizarPreposto {
  nome?: string
  telefoneWhatsapp?: string
  email?: string
  cpf?: string
  ativo?: boolean
}

export async function listarPrepostos(filtros: FiltrosPreposto) {
  const { page = 1, limit = 20 } = filtros
  const skip = (page - 1) * limit

  const where: {
    ativo?: boolean
    OR?: Array<{ nome?: { contains: string; mode: 'insensitive' }; telefoneWhatsapp?: { contains: string } }>
  } = {}

  if (typeof filtros.ativo === 'boolean') {
    where.ativo = filtros.ativo
  }

  if (filtros.busca) {
    const termo = filtros.busca.trim()
    const termoNumerico = termo.replace(/\D/g, '')

    where.OR = [
      { nome: { contains: termo, mode: 'insensitive' } },
      ...(termoNumerico ? [{ telefoneWhatsapp: { contains: termoNumerico } }] : []),
    ]
  }

  const [prepostos, total] = await Promise.all([
    prisma.preposto.findMany({
      where,
      orderBy: { nome: 'asc' },
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            audiencias: true,
          },
        },
      },
    }),
    prisma.preposto.count({ where }),
  ])

  return {
    dados: prepostos,
    paginacao: {
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    },
  }
}

export async function criarPreposto(dados: DadosCriarPreposto) {
  const telefoneWhatsapp = normalizarTelefone(dados.telefoneWhatsapp)

  return prisma.preposto.create({
    data: {
      nome: dados.nome.trim(),
      telefoneWhatsapp,
      email: dados.email?.trim() || null,
      cpf: dados.cpf?.trim() || null,
      ativo: dados.ativo ?? true,
    },
  })
}

export async function atualizarPreposto(id: string, dados: DadosAtualizarPreposto) {
  const atual = await prisma.preposto.findUnique({ where: { id } })
  if (!atual) return null

  const data: DadosAtualizarPreposto = {
    ...dados,
    nome: dados.nome?.trim(),
    email: dados.email?.trim() || undefined,
    cpf: dados.cpf?.trim() || undefined,
  }

  if (dados.telefoneWhatsapp) {
    data.telefoneWhatsapp = normalizarTelefone(dados.telefoneWhatsapp)
  }

  return prisma.preposto.update({
    where: { id },
    data,
  })
}

export async function removerPreposto(id: string) {
  const atual = await prisma.preposto.findUnique({ where: { id } })
  if (!atual) return null

  return prisma.preposto.update({
    where: { id },
    data: { ativo: false },
  })
}

function normalizarTelefone(valor: string) {
  return valor.replace(/\D/g, '')
}

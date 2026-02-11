import { prisma } from '../config/database.js'

interface FiltrosParceiro {
  busca?: string
  ativo?: boolean
  page?: number
  limit?: number
}

interface DadosCriarParceiro {
  nome: string
  ativo?: boolean
}

interface DadosAtualizarParceiro {
  nome?: string
  ativo?: boolean
}

interface DadosCriarContato {
  nome: string
  telefoneWhatsapp: string
  email?: string
  cargo?: string
  ordemEscalonamento?: number
}

export async function listarParceiros(filtros: FiltrosParceiro) {
  const { page = 1, limit = 20 } = filtros
  const skip = (page - 1) * limit

  const where: {
    ativo?: boolean
    nome?: { contains: string; mode: 'insensitive' }
  } = {}

  if (typeof filtros.ativo === 'boolean') {
    where.ativo = filtros.ativo
  }

  if (filtros.busca) {
    where.nome = { contains: filtros.busca.trim(), mode: 'insensitive' }
  }

  const [parceiros, total] = await Promise.all([
    prisma.parceiro.findMany({
      where,
      orderBy: { nome: 'asc' },
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            audiencias: true,
            contatos: true,
          },
        },
      },
    }),
    prisma.parceiro.count({ where }),
  ])

  return {
    dados: parceiros,
    paginacao: {
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    },
  }
}

export async function criarParceiro(dados: DadosCriarParceiro) {
  const nome = dados.nome.trim()

  const parceiroExistente = await prisma.parceiro.findFirst({
    where: { nome: { equals: nome, mode: 'insensitive' } },
    select: { id: true },
  })

  if (parceiroExistente) {
    throw new Error('PARCEIRO_DUPLICADO')
  }

  return prisma.parceiro.create({
    data: {
      nome,
      ativo: dados.ativo ?? true,
    },
  })
}

export async function atualizarParceiro(id: string, dados: DadosAtualizarParceiro) {
  const parceiroAtual = await prisma.parceiro.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!parceiroAtual) return null

  const nome = dados.nome?.trim()
  if (nome) {
    const parceiroComMesmoNome = await prisma.parceiro.findFirst({
      where: {
        nome: { equals: nome, mode: 'insensitive' },
        NOT: { id },
      },
      select: { id: true },
    })

    if (parceiroComMesmoNome) {
      throw new Error('PARCEIRO_DUPLICADO')
    }
  }

  return prisma.parceiro.update({
    where: { id },
    data: {
      ...(nome ? { nome } : {}),
      ...(typeof dados.ativo === 'boolean' ? { ativo: dados.ativo } : {}),
    },
  })
}

export async function listarContatosParceiro(parceiroId: string) {
  const parceiro = await prisma.parceiro.findUnique({
    where: { id: parceiroId },
    select: { id: true, nome: true },
  })

  if (!parceiro) return null

  const contatos = await prisma.contatoParceiro.findMany({
    where: { parceiroId },
    orderBy: [{ ordemEscalonamento: 'asc' }, { createdAt: 'asc' }],
  })

  return {
    parceiro,
    dados: contatos,
  }
}

export async function criarContatoParceiro(parceiroId: string, dados: DadosCriarContato) {
  const parceiro = await prisma.parceiro.findUnique({
    where: { id: parceiroId },
    select: { id: true },
  })

  if (!parceiro) return null

  const telefoneWhatsapp = normalizarTelefone(dados.telefoneWhatsapp)
  if (telefoneWhatsapp.length < 10) {
    throw new Error('TELEFONE_INVALIDO')
  }

  const ordemEscalonamento =
    typeof dados.ordemEscalonamento === 'number'
      ? dados.ordemEscalonamento
      : await proximaOrdemEscalonamento(parceiroId)

  return prisma.contatoParceiro.create({
    data: {
      parceiroId,
      nome: dados.nome.trim(),
      telefoneWhatsapp,
      email: dados.email?.trim() || null,
      cargo: dados.cargo?.trim() || null,
      ordemEscalonamento,
    },
  })
}

async function proximaOrdemEscalonamento(parceiroId: string) {
  const ultimo = await prisma.contatoParceiro.findFirst({
    where: { parceiroId },
    orderBy: { ordemEscalonamento: 'desc' },
    select: { ordemEscalonamento: true },
  })

  return (ultimo?.ordemEscalonamento ?? 0) + 1
}

function normalizarTelefone(valor: string) {
  return valor.replace(/\D/g, '')
}

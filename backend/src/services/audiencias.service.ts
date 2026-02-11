import { prisma } from '../config/database.js'
import type { StatusAudiencia, Modalidade } from '../generated/prisma/client.js'

// === Tipos de filtros ===

interface FiltrosAudiencia {
  status?: StatusAudiencia
  trtId?: string
  prepostoId?: string
  parceiroId?: string
  modalidade?: Modalidade
  dataInicio?: Date
  dataFim?: Date
  busca?: string
  page?: number
  limit?: number
}

interface DadosCriarAudiencia {
  numeroProcesso: string
  reclamante?: string
  data: Date
  hora: string
  modalidade: Modalidade
  local?: string
  link?: string
  trtId: string
  vara?: string
  prepostoId: string
  parceiroId: string
  observacoes?: string
  status?: StatusAudiencia
}

interface DadosAtualizarAudiencia {
  numeroProcesso?: string
  reclamante?: string
  data?: Date
  hora?: string
  modalidade?: Modalidade
  local?: string
  link?: string
  trtId?: string
  vara?: string
  prepostoId?: string
  parceiroId?: string
  observacoes?: string
  status?: StatusAudiencia
}

// === Listar com filtros e paginação ===

export async function listarAudiencias(filtros: FiltrosAudiencia) {
  const { page = 1, limit = 20 } = filtros
  const skip = (page - 1) * limit

  const where: any = {}

  if (filtros.status) where.status = filtros.status
  if (filtros.trtId) where.trtId = filtros.trtId
  if (filtros.prepostoId) where.prepostoId = filtros.prepostoId
  if (filtros.parceiroId) where.parceiroId = filtros.parceiroId
  if (filtros.modalidade) where.modalidade = filtros.modalidade

  if (filtros.dataInicio || filtros.dataFim) {
    where.data = {}
    if (filtros.dataInicio) where.data.gte = filtros.dataInicio
    if (filtros.dataFim) where.data.lte = filtros.dataFim
  }

  if (filtros.busca) {
    where.OR = [
      { numeroProcesso: { contains: filtros.busca, mode: 'insensitive' } },
      { reclamante: { contains: filtros.busca, mode: 'insensitive' } },
    ]
  }

  const [audiencias, total] = await Promise.all([
    prisma.audiencia.findMany({
      where,
      include: {
        trt: { select: { id: true, numero: true, nome: true } },
        preposto: { select: { id: true, nome: true, telefoneWhatsapp: true } },
        parceiro: { select: { id: true, nome: true } },
      },
      orderBy: { data: 'asc' },
      skip,
      take: limit,
    }),
    prisma.audiencia.count({ where }),
  ])

  return {
    dados: audiencias,
    paginacao: {
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    },
  }
}

// === Criar audiência manualmente ===

export async function criarAudiencia(dados: DadosCriarAudiencia, usuarioId: string) {
  const audiencia = await prisma.audiencia.create({
    data: {
      ...dados,
      status: dados.status ?? 'AGENDADA',
    },
    include: {
      trt: { select: { id: true, numero: true, nome: true } },
      preposto: { select: { id: true, nome: true, telefoneWhatsapp: true } },
      parceiro: { select: { id: true, nome: true } },
    },
  })

  // Registra histórico inicial
  await registrarMudancaStatus(
    audiencia.id,
    audiencia.status,
    audiencia.status,
    'Audiência criada manualmente',
    usuarioId,
  )

  return audiencia
}

// === Buscar por ID com timeline ===

export async function buscarAudienciaPorId(id: string) {
  return prisma.audiencia.findUnique({
    where: { id },
    include: {
      trt: { select: { id: true, numero: true, nome: true } },
      preposto: { select: { id: true, nome: true, telefoneWhatsapp: true, email: true } },
      parceiro: {
        select: {
          id: true,
          nome: true,
          contatos: {
            select: { id: true, nome: true, telefoneWhatsapp: true, cargo: true },
            orderBy: { ordemEscalonamento: 'asc' },
          },
        },
      },
      historicoStatus: {
        orderBy: { createdAt: 'desc' },
      },
      mensagens: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
      substituicoes: {
        include: {
          prepostoAnterior: { select: { id: true, nome: true } },
          prepostoNovo: { select: { id: true, nome: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
      relatorio: true,
    },
  })
}

// === Atualizar audiência ===

export async function atualizarAudiencia(
  id: string,
  dados: DadosAtualizarAudiencia,
  usuarioId: string,
) {
  const audienciaAtual = await prisma.audiencia.findUnique({ where: { id } })
  if (!audienciaAtual) return null

  const audiencia = await prisma.audiencia.update({
    where: { id },
    data: dados,
    include: {
      trt: { select: { id: true, numero: true, nome: true } },
      preposto: { select: { id: true, nome: true, telefoneWhatsapp: true } },
      parceiro: { select: { id: true, nome: true } },
    },
  })

  // Se mudou o status, registra no histórico
  if (dados.status && dados.status !== audienciaAtual.status) {
    await registrarMudancaStatus(
      id,
      audienciaAtual.status,
      dados.status,
      'Atualização manual',
      usuarioId,
    )
  }

  return audiencia
}

// === Kanban — audiências agrupadas por status ===

export async function buscarKanban() {
  const audiencias = await prisma.audiencia.findMany({
    where: {
      status: {
        notIn: ['CONCLUIDA', 'CANCELADA'],
      },
    },
    include: {
      trt: { select: { id: true, numero: true } },
      preposto: { select: { id: true, nome: true } },
      parceiro: { select: { id: true, nome: true } },
    },
    orderBy: { data: 'asc' },
  })

  // Agrupa por status
  const kanban: Record<string, typeof audiencias> = {}
  for (const a of audiencias) {
    if (!kanban[a.status]) kanban[a.status] = []
    kanban[a.status].push(a)
  }

  return kanban
}

// === Dashboard — KPIs e contadores ===

export async function buscarDashboard() {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const amanha = new Date(hoje)
  amanha.setDate(amanha.getDate() + 1)

  const fimSemana = new Date(hoje)
  fimSemana.setDate(fimSemana.getDate() + 7)

  const [
    totalAtivas,
    audienciasHoje,
    audienciasSemana,
    porStatus,
    aguardandoConfirmacao,
    semResposta,
  ] = await Promise.all([
    // Total de audiências ativas (não concluídas/canceladas)
    prisma.audiencia.count({
      where: { status: { notIn: ['CONCLUIDA', 'CANCELADA'] } },
    }),
    // Audiências de hoje
    prisma.audiencia.count({
      where: { data: { gte: hoje, lt: amanha } },
    }),
    // Audiências da semana
    prisma.audiencia.count({
      where: { data: { gte: hoje, lt: fimSemana } },
    }),
    // Contagem por status
    prisma.audiencia.groupBy({
      by: ['status'],
      _count: { id: true },
    }),
    // Aguardando confirmação
    prisma.audiencia.count({
      where: { status: 'A_CONFIRMAR' },
    }),
    // Sem resposta
    prisma.audiencia.count({
      where: { status: 'SEM_RESPOSTA' },
    }),
  ])

  return {
    totalAtivas,
    audienciasHoje,
    audienciasSemana,
    aguardandoConfirmacao,
    semResposta,
    porStatus: porStatus.map((s) => ({
      status: s.status,
      total: s._count.id,
    })),
  }
}

// === Trocar preposto ===

export async function trocarPreposto(
  audienciaId: string,
  prepostoNovoId: string,
  motivo: string,
  usuarioId: string,
) {
  const audiencia = await prisma.audiencia.findUnique({ where: { id: audienciaId } })
  if (!audiencia) return null

  const prepostoAnteriorId = audiencia.prepostoId

  // Cria registro de substituição
  await prisma.substituicao.create({
    data: {
      audienciaId,
      prepostoAnteriorId,
      prepostoNovoId,
      motivo,
      status: 'RESOLVIDA',
      resolvidoEm: new Date(),
    },
  })

  // Atualiza a audiência com novo preposto e volta para AGENDADA
  const audienciaAtualizada = await prisma.audiencia.update({
    where: { id: audienciaId },
    data: {
      prepostoId: prepostoNovoId,
      status: 'AGENDADA',
    },
    include: {
      trt: { select: { id: true, numero: true, nome: true } },
      preposto: { select: { id: true, nome: true, telefoneWhatsapp: true } },
      parceiro: { select: { id: true, nome: true } },
    },
  })

  // Registra mudança de status
  await registrarMudancaStatus(
    audienciaId,
    audiencia.status,
    'AGENDADA',
    `Troca de preposto: ${motivo}`,
    usuarioId,
  )

  return audienciaAtualizada
}

// === Helper: registrar mudança de status ===

async function registrarMudancaStatus(
  audienciaId: string,
  statusAnterior: StatusAudiencia,
  statusNovo: StatusAudiencia,
  motivo: string,
  atualizadoPor: string,
) {
  return prisma.historicoStatus.create({
    data: {
      audienciaId,
      statusAnterior,
      statusNovo,
      motivo,
      atualizadoPor,
    },
  })
}

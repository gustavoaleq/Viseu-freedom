import XLSX from 'xlsx'
import { prisma } from '../config/database.js'
import type {
  StatusAudiencia,
  Modalidade,
  OcorrenciaAudiencia,
  ResultadoAudiencia,
  Prisma,
} from '../generated/prisma/client.js'

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
  reclamada?: string
  tipoAudiencia?: string
  data: Date
  hora: string
  modalidade: Modalidade
  comarca?: string
  advogado?: string
  contatoAdvogado?: string
  correspondente?: string
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
  reclamada?: string
  tipoAudiencia?: string
  data?: Date
  hora?: string
  modalidade?: Modalidade
  comarca?: string
  advogado?: string
  contatoAdvogado?: string
  correspondente?: string
  local?: string
  link?: string
  trtId?: string
  vara?: string
  prepostoId?: string
  parceiroId?: string
  observacoes?: string
  status?: StatusAudiencia
}

interface DadosRelatorioAudiencia {
  audienciaOcorreu: OcorrenciaAudiencia
  resultado: ResultadoAudiencia
  advogadoPresente: boolean
  advogadoDominioCaso: boolean
  problemaRelevante: boolean
  relato?: string
}

type CheckInEvento = 'ESTOU_A_CAMINHO' | 'JA_CHEGUEI' | 'ESTOU_COM_PROBLEMA'

// === Listar com filtros e paginação ===

export async function listarAudiencias(filtros: FiltrosAudiencia) {
  const { page = 1, limit = 20 } = filtros
  const skip = (page - 1) * limit
  const where = montarWhereAudiencias(filtros)

  const [audiencias, total] = await Promise.all([
    prisma.audiencia.findMany({
      where,
      include: includeAudienciaResumo,
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

export async function exportarAudiencias(filtros: FiltrosAudiencia, formato: 'csv' | 'xlsx') {
  const where = montarWhereAudiencias(filtros)

  const audiencias = await prisma.audiencia.findMany({
    where,
    include: includeAudienciaResumo,
    orderBy: [{ data: 'asc' }, { hora: 'asc' }],
  })

  const linhas = audiencias.map((a) => ({
    id: a.id,
    numeroProcesso: a.numeroProcesso,
    reclamante: a.reclamante ?? '',
    reclamada: a.reclamada ?? '',
    tipoAudiencia: a.tipoAudiencia ?? '',
    data: a.data.toISOString().slice(0, 10),
    hora: a.hora,
    modalidade: a.modalidade,
    comarca: a.comarca ?? '',
    advogado: a.advogado ?? '',
    contatoAdvogado: a.contatoAdvogado ?? '',
    correspondente: a.correspondente ?? '',
    status: a.status,
    trtNumero: a.trt.numero,
    trtNome: a.trt.nome,
    vara: a.vara ?? '',
    preposto: a.preposto.nome,
    prepostoTelefone: a.preposto.telefoneWhatsapp,
    parceiro: a.parceiro.nome,
    local: a.local ?? '',
    link: a.link ?? '',
    observacoes: a.observacoes ?? '',
  }))

  if (formato === 'xlsx') {
    const workbook = XLSX.utils.book_new()
    const sheet = XLSX.utils.json_to_sheet(linhas)
    XLSX.utils.book_append_sheet(workbook, sheet, 'Audiencias')

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }) as Buffer

    return {
      filename: 'audiencias.xlsx',
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      buffer,
    }
  }

  const csv = gerarCsv(linhas)
  return {
    filename: 'audiencias.csv',
    contentType: 'text/csv; charset=utf-8',
    buffer: Buffer.from(csv, 'utf-8'),
  }
}

// === Criar audiência manualmente ===

export async function criarAudiencia(dados: DadosCriarAudiencia, usuarioId: string) {
  const audiencia = await prisma.audiencia.create({
    data: {
      ...dados,
      status: dados.status ?? 'AGENDADA',
    },
    include: includeAudienciaResumo,
  })

  // Registra histórico inicial
  await registrarMudancaStatus(
    audiencia.id,
    audiencia.status,
    audiencia.status,
    'Audiencia criada manualmente',
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
    include: includeAudienciaResumo,
  })

  if (dados.status && dados.status !== audienciaAtual.status) {
    await registrarMudancaStatus(
      id,
      audienciaAtual.status,
      dados.status,
      'Atualizacao manual',
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

  const kanban: Record<string, typeof audiencias> = {}
  for (const audiencia of audiencias) {
    if (!kanban[audiencia.status]) kanban[audiencia.status] = []
    kanban[audiencia.status].push(audiencia)
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
    prisma.audiencia.count({
      where: { status: { notIn: ['CONCLUIDA', 'CANCELADA'] } },
    }),
    prisma.audiencia.count({
      where: { data: { gte: hoje, lt: amanha } },
    }),
    prisma.audiencia.count({
      where: { data: { gte: hoje, lt: fimSemana } },
    }),
    prisma.audiencia.groupBy({
      by: ['status'],
      _count: { id: true },
    }),
    prisma.audiencia.count({ where: { status: 'A_CONFIRMAR' } }),
    prisma.audiencia.count({ where: { status: 'SEM_RESPOSTA' } }),
  ])

  return {
    totalAtivas,
    audienciasHoje,
    audienciasSemana,
    aguardandoConfirmacao,
    semResposta,
    porStatus: porStatus.map((status) => ({
      status: status.status,
      total: status._count.id,
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

  const audienciaAtualizada = await prisma.audiencia.update({
    where: { id: audienciaId },
    data: {
      prepostoId: prepostoNovoId,
      status: 'AGENDADA',
    },
    include: includeAudienciaResumo,
  })

  await registrarMudancaStatus(
    audienciaId,
    audiencia.status,
    'AGENDADA',
    `Troca de preposto: ${motivo}`,
    usuarioId,
  )

  return audienciaAtualizada
}

export async function reenviarConfirmacao(audienciaId: string, usuarioId: string) {
  const audiencia = await prisma.audiencia.findUnique({ where: { id: audienciaId } })
  if (!audiencia) return null

  await prisma.mensagem.create({
    data: {
      audienciaId,
      prepostoId: audiencia.prepostoId,
      tipo: 'CONFIRMACAO_D1',
      direcao: 'ENVIADA',
      conteudo: 'Reenvio manual de confirmacao da audiencia',
      statusEnvio: 'ENVIADA',
    },
  })

  if (audiencia.status !== 'A_CONFIRMAR') {
    await prisma.audiencia.update({
      where: { id: audienciaId },
      data: { status: 'A_CONFIRMAR' },
    })

    await registrarMudancaStatus(
      audienciaId,
      audiencia.status,
      'A_CONFIRMAR',
      'Reenvio manual de confirmacao',
      usuarioId,
    )
  }

  return {
    message: 'Confirmacao sera reenviada',
    audienciaId,
  }
}

export async function cancelarAudiencia(audienciaId: string, motivo: string, usuarioId: string) {
  const audiencia = await prisma.audiencia.findUnique({ where: { id: audienciaId } })
  if (!audiencia) return null

  const observacoes = audiencia.observacoes
    ? `${audiencia.observacoes}\n[CANCELAMENTO] ${motivo}`
    : `[CANCELAMENTO] ${motivo}`

  const atualizada = await prisma.audiencia.update({
    where: { id: audienciaId },
    data: {
      status: 'CANCELADA',
      observacoes,
    },
    include: includeAudienciaResumo,
  })

  if (audiencia.status !== 'CANCELADA') {
    await registrarMudancaStatus(
      audienciaId,
      audiencia.status,
      'CANCELADA',
      `Cancelamento manual: ${motivo}`,
      usuarioId,
    )
  }

  return atualizada
}

export async function confirmarAudienciaPorTelefone(
  audienciaId: string,
  observacao: string,
  usuarioId: string,
) {
  const audiencia = await prisma.audiencia.findUnique({ where: { id: audienciaId } })
  if (!audiencia) return null

  await prisma.mensagem.create({
    data: {
      audienciaId,
      prepostoId: audiencia.prepostoId,
      tipo: 'CONFIRMACAO_D1',
      direcao: 'RECEBIDA',
      conteudo: 'Confirmado por telefone',
      respostaBotao: 'Confirmo',
      observacao,
      statusEnvio: 'LIDA',
    },
  })

  const atualizada = await prisma.audiencia.update({
    where: { id: audienciaId },
    data: { status: 'CONFIRMADA' },
    include: includeAudienciaResumo,
  })

  if (audiencia.status !== 'CONFIRMADA') {
    await registrarMudancaStatus(
      audienciaId,
      audiencia.status,
      'CONFIRMADA',
      `Confirmacao por telefone: ${observacao}`,
      usuarioId,
    )
  }

  return atualizada
}

export async function registrarCheckInAudiencia(
  audienciaId: string,
  evento: CheckInEvento,
  observacao: string | undefined,
  usuarioId: string,
) {
  const audiencia = await prisma.audiencia.findUnique({ where: { id: audienciaId } })
  if (!audiencia) return null

  const eventoLabel: Record<CheckInEvento, string> = {
    ESTOU_A_CAMINHO: 'Estou a caminho',
    JA_CHEGUEI: 'Ja cheguei',
    ESTOU_COM_PROBLEMA: 'Estou com problema',
  }

  const statusNovo: StatusAudiencia =
    evento === 'ESTOU_COM_PROBLEMA' ? 'SUBSTITUICAO_NECESSARIA' : 'EM_ANDAMENTO'

  await prisma.mensagem.create({
    data: {
      audienciaId,
      prepostoId: audiencia.prepostoId,
      tipo: 'CHECK_IN',
      direcao: 'RECEBIDA',
      conteudo: eventoLabel[evento],
      respostaBotao: eventoLabel[evento],
      observacao: observacao ?? null,
      statusEnvio: 'LIDA',
    },
  })

  if (evento === 'ESTOU_COM_PROBLEMA') {
    const substituicaoAberta = await prisma.substituicao.findFirst({
      where: {
        audienciaId,
        status: 'ABERTA',
      },
      select: { id: true },
    })

    if (!substituicaoAberta) {
      await prisma.substituicao.create({
        data: {
          audienciaId,
          prepostoAnteriorId: audiencia.prepostoId,
          motivo: observacao ?? 'Check-in: estou com problema',
          status: 'ABERTA',
        },
      })
    }
  }

  const atualizada = await prisma.audiencia.update({
    where: { id: audienciaId },
    data: { status: statusNovo },
    include: includeAudienciaResumo,
  })

  if (audiencia.status !== statusNovo) {
    await registrarMudancaStatus(
      audienciaId,
      audiencia.status,
      statusNovo,
      `Check-in: ${eventoLabel[evento]}`,
      usuarioId,
    )
  }

  return atualizada
}

export async function registrarRelatorioAudiencia(
  audienciaId: string,
  dados: DadosRelatorioAudiencia,
  usuarioId: string,
) {
  const audiencia = await prisma.audiencia.findUnique({ where: { id: audienciaId } })
  if (!audiencia) return null

  const relatorio = await prisma.relatorioAudiencia.upsert({
    where: { audienciaId },
    update: {
      audienciaOcorreu: dados.audienciaOcorreu,
      resultado: dados.resultado,
      advogadoPresente: dados.advogadoPresente,
      advogadoDominioCaso: dados.advogadoDominioCaso,
      problemaRelevante: dados.problemaRelevante,
      relato: dados.relato ?? null,
    },
    create: {
      audienciaId,
      audienciaOcorreu: dados.audienciaOcorreu,
      resultado: dados.resultado,
      advogadoPresente: dados.advogadoPresente,
      advogadoDominioCaso: dados.advogadoDominioCaso,
      problemaRelevante: dados.problemaRelevante,
      relato: dados.relato ?? null,
    },
  })

  await prisma.mensagem.create({
    data: {
      audienciaId,
      prepostoId: audiencia.prepostoId,
      tipo: 'RELATORIO_POS',
      direcao: 'RECEBIDA',
      conteudo: 'Relatorio pos-audiencia recebido',
      observacao: dados.relato ?? null,
      statusEnvio: 'LIDA',
    },
  })

  if (audiencia.status !== 'CONCLUIDA') {
    await prisma.audiencia.update({
      where: { id: audienciaId },
      data: { status: 'CONCLUIDA' },
    })

    await registrarMudancaStatus(
      audienciaId,
      audiencia.status,
      'CONCLUIDA',
      'Relatorio pos-audiencia preenchido',
      usuarioId,
    )
  }

  return relatorio
}

// === Helpers ===

const includeAudienciaResumo = {
  trt: { select: { id: true, numero: true, nome: true } },
  preposto: { select: { id: true, nome: true, telefoneWhatsapp: true } },
  parceiro: { select: { id: true, nome: true } },
}

function montarWhereAudiencias(filtros: FiltrosAudiencia): Prisma.AudienciaWhereInput {
  const where: Prisma.AudienciaWhereInput = {}

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

  return where
}

function gerarCsv(linhas: Array<Record<string, string>>) {
  if (linhas.length === 0) return ''

  const cabecalhos = Object.keys(linhas[0])
  const cabecalhoCsv = cabecalhos.join(',')

  const corpo = linhas.map((linha) =>
    cabecalhos
      .map((chave) => escaparCsv(String(linha[chave] ?? '')))
      .join(','),
  )

  return [cabecalhoCsv, ...corpo].join('\n')
}

function escaparCsv(valor: string) {
  if (valor.includes(',') || valor.includes('"') || valor.includes('\n')) {
    return `"${valor.replace(/"/g, '""')}"`
  }
  return valor
}

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

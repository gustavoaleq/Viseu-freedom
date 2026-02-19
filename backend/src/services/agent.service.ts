import { prisma } from '../config/database.js'
import type {
  AvaliacaoAtuacao,
  InfoCompleta,
  OcorrenciaAudiencia,
  StatusAudiencia,
} from '../generated/prisma/client.js'

const STATUS_ENCERRADOS: StatusAudiencia[] = ['CONCLUIDA', 'CANCELADA']

function validarDataRef(dataRef?: string) {
  if (!dataRef) return null
  const [ano, mes, dia] = dataRef.split('-').map((parte) => Number(parte))
  if (!ano || !mes || !dia) return null
  return new Date(ano, mes - 1, dia)
}

function inicioDoDia(dataRef?: string) {
  const base = validarDataRef(dataRef) ?? new Date()
  base.setHours(0, 0, 0, 0)
  return base
}

function fimDoDia(inicio: Date) {
  const fim = new Date(inicio)
  fim.setDate(fim.getDate() + 1)
  return fim
}

function dataISO(date: Date) {
  const ano = date.getFullYear()
  const mes = String(date.getMonth() + 1).padStart(2, '0')
  const dia = String(date.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

export async function buscarResumoOperacional(dataRef?: string) {
  const inicio = inicioDoDia(dataRef)
  const fim = fimDoDia(inicio)
  const inicioAmanha = fim
  const fimAmanha = fimDoDia(inicioAmanha)

  const [
    totalAtivas,
    audienciasHoje,
    audienciasAmanha,
    aConfirmar,
    checkInPendente,
    substituicaoNecessaria,
    relatorioPendente,
    porStatus,
  ] = await Promise.all([
    prisma.audiencia.count({
      where: { status: { notIn: STATUS_ENCERRADOS } },
    }),
    prisma.audiencia.count({
      where: {
        data: { gte: inicio, lt: fim },
        status: { not: 'CANCELADA' },
      },
    }),
    prisma.audiencia.count({
      where: {
        data: { gte: inicioAmanha, lt: fimAmanha },
        status: { not: 'CANCELADA' },
      },
    }),
    prisma.audiencia.count({ where: { status: 'A_CONFIRMAR' } }),
    prisma.audiencia.count({ where: { status: 'CHECK_IN_PENDENTE' } }),
    prisma.audiencia.count({ where: { status: 'SUBSTITUICAO_NECESSARIA' } }),
    prisma.audiencia.count({ where: { status: 'RELATORIO_PENDENTE' } }),
    prisma.audiencia.groupBy({
      by: ['status'],
      where: { status: { notIn: STATUS_ENCERRADOS } },
      _count: { id: true },
    }),
  ])

  return {
    referencia: {
      data: dataISO(inicio),
      inicio: inicio.toISOString(),
      fimExclusivo: fim.toISOString(),
    },
    totalAtivas,
    audienciasHoje,
    audienciasAmanha,
    pendencias: {
      aConfirmar,
      checkInPendente,
      substituicaoNecessaria,
      relatorioPendente,
    },
    porStatus: porStatus.map((item) => ({
      status: item.status,
      total: item._count.id,
    })),
  }
}

export async function listarAudienciasDoDia(dataRef?: string, somenteAbertas = true) {
  const inicio = inicioDoDia(dataRef)
  const fim = fimDoDia(inicio)

  const audiencias = await prisma.audiencia.findMany({
    where: {
      data: { gte: inicio, lt: fim },
      ...(somenteAbertas ? { status: { notIn: STATUS_ENCERRADOS } } : {}),
    },
    select: {
      id: true,
      numeroProcesso: true,
      data: true,
      hora: true,
      status: true,
      modalidade: true,
      vara: true,
      local: true,
      link: true,
      preposto: {
        select: {
          id: true,
          nome: true,
          telefoneWhatsapp: true,
        },
      },
      parceiro: {
        select: {
          id: true,
          nome: true,
        },
      },
      trt: {
        select: {
          id: true,
          numero: true,
          nome: true,
        },
      },
    },
    orderBy: [{ hora: 'asc' }, { createdAt: 'asc' }],
  })

  return {
    referencia: dataISO(inicio),
    somenteAbertas,
    total: audiencias.length,
    dados: audiencias,
  }
}

export async function listarProximasAudiencias(limit = 10, somenteAbertas = true) {
  const inicio = inicioDoDia()

  const audiencias = await prisma.audiencia.findMany({
    where: {
      data: { gte: inicio },
      ...(somenteAbertas ? { status: { notIn: STATUS_ENCERRADOS } } : {}),
    },
    select: {
      id: true,
      numeroProcesso: true,
      data: true,
      hora: true,
      status: true,
      modalidade: true,
      vara: true,
      local: true,
      link: true,
      preposto: {
        select: {
          id: true,
          nome: true,
          telefoneWhatsapp: true,
        },
      },
      parceiro: {
        select: {
          id: true,
          nome: true,
        },
      },
      trt: {
        select: {
          id: true,
          numero: true,
          nome: true,
        },
      },
    },
    orderBy: [{ data: 'asc' }, { hora: 'asc' }],
    take: limit,
  })

  return {
    referencia: dataISO(inicio),
    somenteAbertas,
    limite: limit,
    total: audiencias.length,
    dados: audiencias,
  }
}

export async function listarAudienciasPorStatus(status: StatusAudiencia, limit = 20) {
  const audiencias = await prisma.audiencia.findMany({
    where: { status },
    select: {
      id: true,
      numeroProcesso: true,
      data: true,
      hora: true,
      status: true,
      modalidade: true,
      vara: true,
      local: true,
      link: true,
      preposto: {
        select: {
          id: true,
          nome: true,
          telefoneWhatsapp: true,
        },
      },
      parceiro: {
        select: {
          id: true,
          nome: true,
        },
      },
      trt: {
        select: {
          id: true,
          numero: true,
          nome: true,
        },
      },
    },
    orderBy: [{ data: 'asc' }, { hora: 'asc' }],
    take: limit,
  })

  return {
    status,
    limite: limit,
    total: audiencias.length,
    dados: audiencias,
  }
}

export async function buscarIndicadoresPosRelatorio(dias = 30) {
  const diasNormalizados = Math.max(1, Math.min(180, dias))
  const inicio = new Date(Date.now() - diasNormalizados * 24 * 60 * 60 * 1000)

  const [
    totalRelatorios,
    ocorrencia,
    docAntecedencia,
    advogadoAntecedencia,
    infoCompleta,
    conhecimentoAdvogado,
    avaliacaoAtuacao,
  ] = await Promise.all([
    prisma.relatorioAudiencia.count({
      where: { createdAt: { gte: inicio } },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['audienciaOcorreu'],
      where: {
        createdAt: { gte: inicio },
        audienciaOcorreu: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['docAntecedencia'],
      where: {
        createdAt: { gte: inicio },
        docAntecedencia: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['advogadoAntecedencia'],
      where: {
        createdAt: { gte: inicio },
        advogadoAntecedencia: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['infoCompleta'],
      where: {
        createdAt: { gte: inicio },
        infoCompleta: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['conhecimentoAdvogado'],
      where: {
        createdAt: { gte: inicio },
        conhecimentoAdvogado: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['avaliacaoAtuacao'],
      where: {
        createdAt: { gte: inicio },
        avaliacaoAtuacao: { not: null },
      },
      _count: { _all: true },
    }),
  ])

  const ocorrenciaMap = new Map<OcorrenciaAudiencia | null, number>(
    ocorrencia.map((item) => [item.audienciaOcorreu, item._count._all]),
  )
  const docAntecedenciaMap = new Map<boolean | null, number>(
    docAntecedencia.map((item) => [item.docAntecedencia, item._count._all]),
  )
  const advogadoAntecedenciaMap = new Map<boolean | null, number>(
    advogadoAntecedencia.map((item) => [item.advogadoAntecedencia, item._count._all]),
  )
  const infoCompletaMap = new Map<InfoCompleta | null, number>(
    infoCompleta.map((item) => [item.infoCompleta, item._count._all]),
  )
  const conhecimentoMap = new Map<boolean | null, number>(
    conhecimentoAdvogado.map((item) => [item.conhecimentoAdvogado, item._count._all]),
  )
  const avaliacaoMap = new Map<AvaliacaoAtuacao | null, number>(
    avaliacaoAtuacao.map((item) => [item.avaliacaoAtuacao, item._count._all]),
  )

  return {
    periodoDias: diasNormalizados,
    inicio: inicio.toISOString(),
    totalRelatorios,
    audienciaOcorreu: {
      sim: ocorrenciaMap.get('SIM') ?? 0,
      nao: ocorrenciaMap.get('NAO') ?? 0,
      remarcada: ocorrenciaMap.get('REMARCADA') ?? 0,
    },
    docAntecedencia: {
      sim: docAntecedenciaMap.get(true) ?? 0,
      nao: docAntecedenciaMap.get(false) ?? 0,
    },
    advogadoAntecedencia: {
      sim: advogadoAntecedenciaMap.get(true) ?? 0,
      nao: advogadoAntecedenciaMap.get(false) ?? 0,
    },
    infoCompleta: {
      sim: infoCompletaMap.get('SIM') ?? 0,
      nao: infoCompletaMap.get('NAO') ?? 0,
      outra: infoCompletaMap.get('OUTRA') ?? 0,
    },
    conhecimentoAdvogado: {
      sim: conhecimentoMap.get(true) ?? 0,
      nao: conhecimentoMap.get(false) ?? 0,
    },
    avaliacaoAtuacao: {
      bom: avaliacaoMap.get('BOM') ?? 0,
      regular: avaliacaoMap.get('REGULAR') ?? 0,
      ruim: avaliacaoMap.get('RUIM') ?? 0,
    },
  }
}

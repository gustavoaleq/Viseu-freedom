import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import XLSX from 'xlsx'
import { prisma } from '../config/database.js'
import { agendarOrquestracaoAudiencia } from '../jobs/orquestracao.scheduler.js'
import type { Modalidade, Prisma } from '../generated/prisma/client.js'

const IMPORTACOES_DIR = process.env.IMPORTACOES_DIR ?? '/tmp/viseu-importacoes'
const TRTS_PROCESSAVEIS = new Set(['2', '15'])
const MAPA_TRT_TEXTO: Record<string, string> = {
  sp: '2',
  'sao paulo': '2',
  capital: '2',
  campinas: '15',
  interior: '15',
  'interior sp': '15',
}

const CAMPOS_MAPEAMENTO_OBRIGATORIOS = [
  'numeroProcesso',
  'data',
  'trt',
  'prepostoNome',
  'parceiroNome',
] as const

type CampoMapeamentoObrigatorio = (typeof CAMPOS_MAPEAMENTO_OBRIGATORIOS)[number]

interface MapeamentoImportacao {
  numeroProcesso?: string
  reclamante?: string
  reclamada?: string
  tipoAudiencia?: string
  data?: string
  hora?: string
  modalidade?: string
  comarca?: string
  advogado?: string
  contatoAdvogado?: string
  correspondente?: string
  local?: string
  link?: string
  trt?: string
  vara?: string
  prepostoNome?: string
  prepostoTelefone?: string
  prepostoEmail?: string
  prepostoCpf?: string
  parceiroNome?: string
  observacoes?: string
}

interface LinhaPreview {
  linha: number
  dados: {
    numeroProcesso: string
    reclamante?: string
    reclamada?: string
    tipoAudiencia?: string
    data: Date | null
    hora: string | null
    modalidade: Modalidade
    comarca?: string
    advogado?: string
    contatoAdvogado?: string
    correspondente?: string
    local?: string
    link?: string
    trtNumero: string
    vara?: string
    prepostoNome: string
    prepostoTelefone: string
    prepostoEmail?: string
    prepostoCpf?: string
    parceiroNome: string
    observacoes?: string
  }
  erros: string[]
  ignorada: boolean
  motivoIgnorada?: string
}

export async function uploadImportacao(nomeArquivoOriginal: string, arquivo: Buffer) {
  await fs.mkdir(IMPORTACOES_DIR, { recursive: true })

  const importacaoId = randomUUID()
  const caminhoArquivo = caminhoImportacao(importacaoId)

  await fs.writeFile(caminhoArquivo, arquivo)

  const { cabecalhos, linhas } = lerArquivoImportacao(caminhoArquivo)

  const importacao = await prisma.importacao.create({
    data: {
      id: importacaoId,
      nomeArquivo: nomeArquivoOriginal,
      totalRegistros: linhas.length,
      registrosImportados: 0,
      registrosIgnorados: 0,
      status: 'PROCESSANDO',
    },
  })

  return {
    importacaoId: importacao.id,
    nomeArquivo: importacao.nomeArquivo,
    totalRegistros: importacao.totalRegistros,
    colunasDetectadas: cabecalhos,
    previewLinhas: linhas.slice(0, 5),
  }
}

export async function mapearImportacao(importacaoId: string, mapeamentoColunas: MapeamentoImportacao) {
  const importacao = await prisma.importacao.findUnique({
    where: { id: importacaoId },
  })

  if (!importacao) return null

  const camposFaltantes = validarCamposObrigatoriosMapeamento(mapeamentoColunas)
  if (camposFaltantes.length > 0) {
    return {
      sucesso: false,
      camposFaltantes,
    } as const
  }

  const atualizado = await prisma.importacao.update({
    where: { id: importacaoId },
    data: {
      mapeamentoColunas: mapeamentoColunas as object,
      status: 'PROCESSANDO',
    },
    select: {
      id: true,
      mapeamentoColunas: true,
      status: true,
    },
  })

  return {
    sucesso: true,
    importacaoId: atualizado.id,
    mapeamentoColunas: atualizado.mapeamentoColunas as MapeamentoImportacao,
    status: atualizado.status,
  } as const
}

export async function previewImportacao(importacaoId: string) {
  const importacao = await prisma.importacao.findUnique({
    where: { id: importacaoId },
  })

  if (!importacao) return null
  if (!importacao.mapeamentoColunas) {
    throw new Error('Mapeamento de colunas nao configurado')
  }

  const caminhoArquivo = caminhoImportacao(importacaoId)
  const { linhas } = lerArquivoImportacao(caminhoArquivo)

  const preview = gerarPreviewLinhas(linhas, importacao.mapeamentoColunas as MapeamentoImportacao)

  return {
    importacaoId: importacao.id,
    nomeArquivo: importacao.nomeArquivo,
    totalLinhas: preview.totalLinhas,
    validasParaImportacao: preview.validasParaImportacao,
    ignoradasPorTrt: preview.ignoradasPorTrt,
    invalidas: preview.invalidas,
    erros: preview.erros.slice(0, 200),
    amostraValidas: preview.amostraValidas,
  }
}

export async function confirmarImportacao(importacaoId: string, usuarioId: string) {
  const importacao = await prisma.importacao.findUnique({
    where: { id: importacaoId },
  })

  if (!importacao) return null
  if (!importacao.mapeamentoColunas) {
    throw new Error('Mapeamento de colunas nao configurado')
  }
  if (importacao.status === 'CONCLUIDA') {
    throw new Error('Importacao ja foi confirmada anteriormente')
  }

  const caminhoArquivo = caminhoImportacao(importacaoId)
  const { linhas } = lerArquivoImportacao(caminhoArquivo)
  const preview = gerarPreviewLinhas(linhas, importacao.mapeamentoColunas as MapeamentoImportacao)
  const linhasParaImportar = preview.linhas.filter((linha) => linha.erros.length === 0 && !linha.ignorada)

  const resultado = await prisma.$transaction(async (tx) => {
    let importadas = 0
    let ignoradas = preview.ignoradasPorTrt + preview.invalidas
    const audienciasCriadas: Array<{ id: string; data: Date; hora: string }> = []

    const cacheParceiros = new Map<string, string>()
    const cachePrepostos = new Map<string, string>()
    const cacheTrts = new Map<string, string>()

    for (const linha of linhasParaImportar) {
      const trtId = await buscarTrtId(tx, cacheTrts, linha.dados.trtNumero)
      if (!trtId) {
        ignoradas += 1
        continue
      }

      const prepostoId = await upsertPreposto(tx, cachePrepostos, {
        nome: linha.dados.prepostoNome,
        telefoneWhatsapp: linha.dados.prepostoTelefone,
        email: linha.dados.prepostoEmail,
        cpf: linha.dados.prepostoCpf,
      })

      const parceiroId = await buscarOuCriarParceiro(tx, cacheParceiros, linha.dados.parceiroNome)

      const audiencia = await tx.audiencia.create({
        data: {
          numeroProcesso: linha.dados.numeroProcesso,
          reclamante: linha.dados.reclamante || null,
          reclamada: linha.dados.reclamada || null,
          tipoAudiencia: linha.dados.tipoAudiencia || null,
          data: linha.dados.data!,
          hora: linha.dados.hora!,
          modalidade: linha.dados.modalidade,
          comarca: linha.dados.comarca || null,
          advogado: linha.dados.advogado || null,
          contatoAdvogado: linha.dados.contatoAdvogado || null,
          correspondente: linha.dados.correspondente || null,
          local: linha.dados.local || null,
          link: linha.dados.link || null,
          trtId,
          vara: linha.dados.vara || null,
          status: 'IMPORTADA',
          prepostoId,
          parceiroId,
          importacaoId,
          observacoes: linha.dados.observacoes || null,
        },
      })

      await tx.historicoStatus.create({
        data: {
          audienciaId: audiencia.id,
          statusAnterior: 'IMPORTADA',
          statusNovo: 'IMPORTADA',
          motivo: `Importacao ${importacao.nomeArquivo}`,
          atualizadoPor: usuarioId,
        },
      })

      audienciasCriadas.push({
        id: audiencia.id,
        data: audiencia.data,
        hora: audiencia.hora,
      })

      importadas += 1
    }

    await tx.importacao.update({
      where: { id: importacaoId },
      data: {
        totalRegistros: preview.totalLinhas,
        registrosImportados: importadas,
        registrosIgnorados: ignoradas,
        status: 'CONCLUIDA',
        erros: preview.erros.slice(0, 500) as object[],
      },
    })

    return {
      importadas,
      ignoradas,
      invalidas: preview.invalidas,
      ignoradasPorTrt: preview.ignoradasPorTrt,
      totalLinhas: preview.totalLinhas,
      audienciasCriadas,
    }
  })

  for (const audiencia of resultado.audienciasCriadas) {
    try {
      await agendarOrquestracaoAudiencia({
        audienciaId: audiencia.id,
        data: audiencia.data,
        hora: audiencia.hora,
      })
    } catch (error) {
      console.error('[orquestracao] falha ao agendar audiencia importada', {
        audienciaId: audiencia.id,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  return {
    importacaoId,
    status: 'CONCLUIDA',
    importadas: resultado.importadas,
    ignoradas: resultado.ignoradas,
    invalidas: resultado.invalidas,
    ignoradasPorTrt: resultado.ignoradasPorTrt,
    totalLinhas: resultado.totalLinhas,
  }
}

export async function listarImportacoes(page = 1, limit = 20) {
  const skip = (page - 1) * limit

  const [dados, total] = await Promise.all([
    prisma.importacao.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        nomeArquivo: true,
        totalRegistros: true,
        registrosImportados: true,
        registrosIgnorados: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.importacao.count(),
  ])

  return {
    dados,
    paginacao: {
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    },
  }
}

function caminhoImportacao(importacaoId: string) {
  return path.join(IMPORTACOES_DIR, `${importacaoId}.xlsx`)
}

function lerArquivoImportacao(caminhoArquivo: string) {
  const workbook = XLSX.readFile(caminhoArquivo, { cellDates: true })
  const primeiraAba = workbook.SheetNames[0]

  if (!primeiraAba) {
    throw new Error('Planilha sem abas')
  }

  const worksheet = workbook.Sheets[primeiraAba]

  const cabecalhosMatriz = XLSX.utils.sheet_to_json<(string | number)[]>(worksheet, {
    header: 1,
    raw: false,
    defval: '',
  })

  const cabecalhos = (cabecalhosMatriz[0] ?? [])
    .map((coluna) => String(coluna).trim())
    .filter((coluna) => coluna.length > 0)

  const linhasBrutas = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    raw: false,
    defval: '',
  })

  const linhas = linhasBrutas.filter((linha) =>
    Object.values(linha).some((valor) => String(valor).trim().length > 0),
  )

  return {
    cabecalhos,
    linhas,
  }
}

function validarCamposObrigatoriosMapeamento(mapeamento: MapeamentoImportacao) {
  return CAMPOS_MAPEAMENTO_OBRIGATORIOS.filter((campo) => {
    const chave = mapeamento[campo]
    return !chave || chave.trim().length === 0
  })
}

function gerarPreviewLinhas(
  linhas: Record<string, unknown>[],
  mapeamento: MapeamentoImportacao,
) {
  const resultadoLinhas: LinhaPreview[] = linhas.map((linha, index) => validarLinha(index + 2, linha, mapeamento))

  const validasParaImportacao = resultadoLinhas.filter((linha) => linha.erros.length === 0 && !linha.ignorada).length
  const ignoradasPorTrt = resultadoLinhas.filter((linha) => linha.ignorada).length
  const invalidas = resultadoLinhas.filter((linha) => linha.erros.length > 0).length

  return {
    linhas: resultadoLinhas,
    totalLinhas: linhas.length,
    validasParaImportacao,
    ignoradasPorTrt,
    invalidas,
    erros: resultadoLinhas
      .filter((linha) => linha.erros.length > 0)
      .map((linha) => ({
        linha: linha.linha,
        erros: linha.erros,
      })),
    amostraValidas: resultadoLinhas
      .filter((linha) => linha.erros.length === 0 && !linha.ignorada)
      .slice(0, 20)
      .map((linha) => ({
        linha: linha.linha,
        numeroProcesso: linha.dados.numeroProcesso,
        trt: linha.dados.trtNumero,
        data: linha.dados.data?.toISOString().slice(0, 10),
        hora: linha.dados.hora,
        preposto: linha.dados.prepostoNome,
        parceiro: linha.dados.parceiroNome,
      })),
  }
}

function validarLinha(
  numeroLinha: number,
  linha: Record<string, unknown>,
  mapeamento: MapeamentoImportacao,
): LinhaPreview {
  const erros: string[] = []

  const numeroProcesso = lerValorMapeado(linha, mapeamento.numeroProcesso)
  const reclamante = lerValorMapeado(linha, mapeamento.reclamante)
  const reclamada = lerValorMapeado(linha, mapeamento.reclamada)
  const tipoAudiencia = lerValorMapeado(linha, mapeamento.tipoAudiencia)
  const dataRaw = lerValorMapeado(linha, mapeamento.data)
  const horaRaw = lerValorMapeado(linha, mapeamento.hora)
  const modalidadeRaw = lerValorMapeado(linha, mapeamento.modalidade)
  const comarca = lerValorMapeado(linha, mapeamento.comarca)
  const advogado = lerValorMapeado(linha, mapeamento.advogado)
  const contatoAdvogado = lerValorMapeado(linha, mapeamento.contatoAdvogado)
  const correspondente = lerValorMapeado(linha, mapeamento.correspondente)
  const localRaw = lerValorMapeado(linha, mapeamento.local)
  const link = lerValorMapeado(linha, mapeamento.link)
  const local = localRaw || link
  const trtRaw = lerValorMapeado(linha, mapeamento.trt)
  const vara = lerValorMapeado(linha, mapeamento.vara)
  const prepostoNomeRaw = lerValorMapeado(linha, mapeamento.prepostoNome)
  const prepostoTelefoneRaw = lerValorMapeado(linha, mapeamento.prepostoTelefone)
  const prepostoEmailRaw = lerValorMapeado(linha, mapeamento.prepostoEmail)
  const prepostoCpfRaw = lerValorMapeado(linha, mapeamento.prepostoCpf)
  const prepostoExtraido = extrairDadosPrepostoComposto(prepostoNomeRaw)
  const prepostoNome = normalizarNomePreposto(prepostoNomeRaw, prepostoExtraido.nome)
  const prepostoTelefone = normalizarTelefone(
    prepostoTelefoneRaw || prepostoExtraido.telefone || prepostoNomeRaw,
  )
  const prepostoEmail = normalizarEmail(prepostoEmailRaw || prepostoExtraido.email || prepostoNomeRaw)
  const prepostoCpf = normalizarCpf(prepostoCpfRaw || prepostoExtraido.cpf || prepostoNomeRaw)
  const parceiroNome = lerValorMapeado(linha, mapeamento.parceiroNome)
  const observacoes = lerValorMapeado(linha, mapeamento.observacoes)

  if (!numeroProcesso) erros.push('Numero do processo obrigatorio')
  if (!prepostoNome) erros.push('Nome do preposto obrigatorio')
  if (!parceiroNome) erros.push('Nome do parceiro obrigatorio')

  if (!telefoneEhValido(prepostoTelefone)) {
    erros.push('Telefone do preposto invalido')
  }

  const trtNumero = extrairNumeroTrt(trtRaw, numeroProcesso)
  if (!trtNumero) {
    erros.push('TRT invalido')
  }

  const data = parseData(dataRaw)
  if (!data) {
    erros.push('Data da audiencia invalida')
  }

  const hora = parseHora(horaRaw || dataRaw)
  if (!hora) {
    erros.push('Hora da audiencia invalida')
  }

  const modalidade = parseModalidade(modalidadeRaw)

  let ignorada = false
  let motivoIgnorada: string | undefined
  if (trtNumero && !TRTS_PROCESSAVEIS.has(trtNumero)) {
    ignorada = true
    motivoIgnorada = `TRT ${trtNumero} fora do escopo da POC`
  }

  return {
    linha: numeroLinha,
    dados: {
      numeroProcesso,
      reclamante: reclamante || undefined,
      reclamada: reclamada || undefined,
      tipoAudiencia: tipoAudiencia || undefined,
      data,
      hora,
      modalidade,
      comarca: comarca || undefined,
      advogado: advogado || undefined,
      contatoAdvogado: contatoAdvogado || undefined,
      correspondente: correspondente || undefined,
      local: local || undefined,
      link: link || undefined,
      trtNumero,
      vara: vara || undefined,
      prepostoNome,
      prepostoTelefone,
      prepostoEmail: prepostoEmail || undefined,
      prepostoCpf: prepostoCpf || undefined,
      parceiroNome,
      observacoes: observacoes || undefined,
    },
    erros,
    ignorada,
    motivoIgnorada,
  }
}

function lerValorMapeado(linha: Record<string, unknown>, coluna?: string) {
  if (!coluna) return ''
  const valor = linha[coluna]
  if (valor === null || valor === undefined) return ''
  return String(valor).trim()
}

interface DadosPrepostoComposto {
  nome?: string
  email?: string
  telefone?: string
  cpf?: string
}

const ROTULOS_PREPOSTO = '(?:nome\\s+do\\s+preposto|e-?mail\\s+do\\s+preposto|telefone\\s+do\\s+preposto|cpf\\s+do\\s+preposto)'

function extrairDadosPrepostoComposto(texto: string): DadosPrepostoComposto {
  if (!texto) return {}

  const nome = extrairCampoRotuladoPreposto(texto, 'nome\\s+do\\s+preposto')
  const emailRotulado = extrairCampoRotuladoPreposto(texto, 'e-?mail\\s+do\\s+preposto')
  const telefoneRotulado = extrairCampoRotuladoPreposto(texto, 'telefone\\s+do\\s+preposto')
  const cpfRotulado = extrairCampoRotuladoPreposto(texto, 'cpf\\s+do\\s+preposto')

  const email = normalizarEmail(emailRotulado || texto)
  const telefone = normalizarTelefone(telefoneRotulado || texto)
  const cpf = normalizarCpf(cpfRotulado || texto)

  return {
    nome: nome || undefined,
    email: email || undefined,
    telefone: telefone || undefined,
    cpf: cpf || undefined,
  }
}

function extrairCampoRotuladoPreposto(texto: string, rotulo: string) {
  const padrao = new RegExp(`${rotulo}\\s*:\\s*([\\s\\S]*?)(?=${ROTULOS_PREPOSTO}\\s*:|$)`, 'i')
  const match = texto.match(padrao)
  if (!match?.[1]) return ''
  return match[1].replace(/\s+/g, ' ').trim()
}

function normalizarNomePreposto(valorOriginal: string, nomeExtraido?: string) {
  if (nomeExtraido) {
    return nomeExtraido.trim()
  }

  if (!valorOriginal) return ''

  const primeiraLinha = valorOriginal
    .split(/\r?\n/)
    .map((linha) => linha.trim())
    .find((linha) => linha.length > 0)

  if (!primeiraLinha) return ''

  return primeiraLinha
    .replace(/^nome\s+do\s+preposto\s*:\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizarEmail(valor: string) {
  if (!valor) return ''
  const match = valor.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match?.[0]?.trim() ?? ''
}

function normalizarCpf(valor: string) {
  if (!valor) return ''
  const cpfDoTexto = valor.match(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/)
  if (cpfDoTexto?.[0]) {
    return cpfDoTexto[0].replace(/\D/g, '')
  }

  const digitos = valor.replace(/\D/g, '')
  if (digitos.length === 11) {
    return digitos
  }

  return ''
}

function normalizarTelefone(valor: string) {
  const texto = valor.trim()
  if (!texto) return ''

  const porCampo = texto.match(/telefone\s+do\s+preposto[^\d+]*(\+?[\d()\s.-]{8,}\d)/i)
  const candidatos = porCampo
    ? [porCampo[1]]
    : Array.from(texto.matchAll(/\+?\d[\d()\s.-]{8,}\d/g), (match) => {
        const inicio = match.index ?? 0
        const fim = inicio + match[0].length
        const contexto = normalizarTexto(texto.slice(Math.max(0, inicio - 20), Math.min(texto.length, fim + 20)))
        return contexto.includes('cpf') ? '' : match[0]
      }).filter(Boolean)

  const lista = candidatos.length > 0 ? candidatos : [texto]

  for (const candidato of lista) {
    let digitos = limparDigitosTelefone(candidato)
    if (!digitos) continue

    if (digitos.startsWith('55') && digitos.length > 11) {
      digitos = digitos.slice(2)
    }

    digitos = digitos.replace(/^0+/, '')

    if (digitos.length > 11) {
      digitos = digitos.slice(-11)
    }

    if (telefoneEhValido(digitos)) {
      return digitos
    }
  }

  return ''
}

function telefoneEhValido(valor: string) {
  return valor.length === 10 || valor.length === 11
}

function limparDigitosTelefone(valor: string) {
  const decimal = valor.trim().match(/^(\d+)[.,]0+$/)
  if (decimal) {
    return decimal[1]
  }

  const cientifica = valor.trim().match(/^(\d+(?:[.,]\d+)?)e\+?(\d+)$/i)
  if (cientifica) {
    return expandirNotacaoCientifica(cientifica[1], Number(cientifica[2])).replace(/\D/g, '')
  }

  return valor.replace(/\D/g, '')
}

function expandirNotacaoCientifica(mantissaOriginal: string, expoente: number) {
  if (Number.isNaN(expoente) || expoente < 0) return mantissaOriginal

  const mantissa = mantissaOriginal.replace(',', '.')
  const [inteiro, decimal = ''] = mantissa.split('.')
  const decimalLimpo = decimal.replace(/0+$/, '')
  const base = `${inteiro}${decimalLimpo}`

  if (decimalLimpo.length === 0) {
    return `${inteiro}${'0'.repeat(expoente)}`
  }

  const zeros = expoente - decimalLimpo.length
  if (zeros >= 0) {
    return `${base}${'0'.repeat(zeros)}`
  }

  return base.slice(0, inteiro.length + expoente)
}

function extrairNumeroTrt(valor: string, numeroProcesso = '') {
  const porTexto = extrairNumeroTrtPorTexto(valor)
  const porNumeroProcesso = extrairNumeroTrtPorProcesso(numeroProcesso)
  const textoNormalizado = normalizarTexto(valor)

  // "SP" e "Sao Paulo" sao ambiguos entre TRT-2 e TRT-15, por isso priorizamos CNJ.
  if ((textoNormalizado === 'sp' || textoNormalizado === 'sao paulo') && porNumeroProcesso) {
    return porNumeroProcesso
  }

  if (porTexto) return porTexto
  return porNumeroProcesso
}

function extrairNumeroTrtPorTexto(valor: string) {
  const textoNormalizado = normalizarTexto(valor)
  const porMapa = MAPA_TRT_TEXTO[textoNormalizado]
  if (porMapa) return porMapa

  if (textoNormalizado.includes('campinas') || textoNormalizado.includes('interior')) {
    return '15'
  }

  if (textoNormalizado === 'sp' || textoNormalizado.includes('sao paulo')) {
    return '2'
  }

  const digitos = valor.replace(/\D/g, '')
  if (!digitos) return ''
  if (digitos.length >= 2 && digitos.startsWith('15')) return '15'
  return digitos[0] === '0' ? String(Number(digitos)) : digitos.slice(0, 2).replace(/^0+/, '') || digitos[0]
}

function extrairNumeroTrtPorProcesso(numeroProcesso: string) {
  const match = numeroProcesso.match(/\.\d\.(\d{2})\./)
  if (match?.[1]) {
    return String(Number(match[1]))
  }
  return ''
}

function normalizarTexto(valor: string) {
  return valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function parseData(valor: string) {
  if (!valor) return null

  const normalizado = valor.trim()
  const formatoBr = normalizado.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (formatoBr) {
    const dia = Number(formatoBr[1])
    const mes = Number(formatoBr[2]) - 1
    const ano = Number(formatoBr[3])
    const data = new Date(Date.UTC(ano, mes, dia))
    if (!Number.isNaN(data.getTime())) return data
  }

  const formatoIso = normalizado.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (formatoIso) {
    const ano = Number(formatoIso[1])
    const mes = Number(formatoIso[2]) - 1
    const dia = Number(formatoIso[3])
    const data = new Date(Date.UTC(ano, mes, dia))
    if (!Number.isNaN(data.getTime())) return data
  }

  const fallback = new Date(normalizado)
  if (!Number.isNaN(fallback.getTime())) {
    return new Date(Date.UTC(fallback.getUTCFullYear(), fallback.getUTCMonth(), fallback.getUTCDate()))
  }

  return null
}

function parseHora(valor: string) {
  if (!valor) return null

  const normalizado = valor.trim()
  const horaBr = normalizado.match(/(\d{1,2}):(\d{2})/)
  if (horaBr) {
    const horas = horaBr[1].padStart(2, '0')
    const minutos = horaBr[2]
    return `${horas}:${minutos}`
  }

  return null
}

function parseModalidade(valor: string): Modalidade {
  const normalizado = valor.toLowerCase()
  if (normalizado.includes('on')) return 'ONLINE'
  return 'PRESENCIAL'
}

async function buscarTrtId(
  tx: Prisma.TransactionClient,
  cache: Map<string, string>,
  numeroTrt: string,
) {
  const emCache = cache.get(numeroTrt)
  if (emCache) return emCache

  const trt = await tx.trt.findUnique({
    where: { numero: numeroTrt },
    select: { id: true },
  })

  if (!trt) return null
  cache.set(numeroTrt, trt.id)
  return trt.id
}

async function upsertPreposto(
  tx: Prisma.TransactionClient,
  cache: Map<string, string>,
  dados: {
    nome: string
    telefoneWhatsapp: string
    email?: string
    cpf?: string
  },
) {
  const emCache = cache.get(dados.telefoneWhatsapp)
  if (emCache) return emCache

  const preposto = await tx.preposto.upsert({
    where: { telefoneWhatsapp: dados.telefoneWhatsapp },
    update: {
      nome: dados.nome,
      ...(dados.email ? { email: dados.email } : {}),
      ...(dados.cpf ? { cpf: dados.cpf } : {}),
      ativo: true,
    },
    create: {
      nome: dados.nome,
      telefoneWhatsapp: dados.telefoneWhatsapp,
      email: dados.email || null,
      cpf: dados.cpf || null,
      ativo: true,
    },
    select: { id: true },
  })

  cache.set(dados.telefoneWhatsapp, preposto.id)
  return preposto.id
}

async function buscarOuCriarParceiro(
  tx: Prisma.TransactionClient,
  cache: Map<string, string>,
  nomeParceiro: string,
) {
  const chave = nomeParceiro.toLowerCase()
  const emCache = cache.get(chave)
  if (emCache) return emCache

  const existente = await tx.parceiro.findFirst({
    where: { nome: { equals: nomeParceiro, mode: 'insensitive' } },
    select: { id: true },
  })

  if (existente) {
    cache.set(chave, existente.id)
    return existente.id
  }

  const criado = await tx.parceiro.create({
    data: {
      nome: nomeParceiro,
      ativo: true,
    },
    select: { id: true },
  })

  cache.set(chave, criado.id)
  return criado.id
}

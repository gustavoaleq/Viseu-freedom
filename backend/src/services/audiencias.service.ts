import XLSX from 'xlsx'
import { prisma } from '../config/database.js'
import { env } from '../config/env.js'
import {
  agendarOrquestracaoAudiencia,
  removerOrquestracaoAudiencia,
} from '../jobs/orquestracao.scheduler.js'
import { aplicarTemplate, obterConfiguracoes, TEMPLATES_DEFAULT } from './configuracoes.service.js'
import { registrarLogAutomacao } from './automacao-log.service.js'
import {
  dispararEscalonamentoSubstituicao,
  notificarSubstituicaoRealizada,
} from './substituicao-automacao.service.js'
import type {
  StatusAudiencia,
  Modalidade,
  OcorrenciaAudiencia,
  Prisma,
} from '../generated/prisma/client.js'
import { criarWhatsAppAdapter } from './whatsapp.adapter.js'

const whatsapp = criarWhatsAppAdapter()

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
  docAntecedencia: boolean
  docAntecedenciaJustificativa?: string
  advogadoAntecedencia: boolean
  advogadoAntecedenciaJustificativa?: string
  infoCompleta: 'SIM' | 'NAO'
  infoFaltante?: string
  conhecimentoAdvogado: boolean
  comentarioConhecimento: string
  avaliacaoAtuacao: 'BOM' | 'REGULAR' | 'RUIM'
  comentarioAvaliacao: string
  comentarioFinal: string
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

export async function exportarRelatorioPosAudiencia(audienciaId: string) {
  const audiencia = await prisma.audiencia.findUnique({
    where: { id: audienciaId },
    include: {
      trt: { select: { numero: true, nome: true } },
      preposto: { select: { nome: true, telefoneWhatsapp: true, email: true } },
      parceiro: { select: { nome: true } },
      relatorio: true,
      historicoStatus: {
        where: { statusNovo: 'CONCLUIDA' },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })

  if (!audiencia) return null
  if (!audiencia.relatorio) return { error: 'RELATORIO_NAO_ENCONTRADO' as const }

  const ocorridoLabel: Record<OcorrenciaAudiencia, string> = {
    SIM: 'Sim',
    NAO: 'Nao',
    REMARCADA: 'Remarcada',
  }
  const infoCompletaLabel: Record<'SIM' | 'NAO' | 'OUTRA', string> = {
    SIM: 'Sim',
    NAO: 'Nao',
    OUTRA: 'Outra',
  }
  const avaliacaoLabel: Record<'BOM' | 'REGULAR' | 'RUIM', string> = {
    BOM: 'Bom',
    REGULAR: 'Regular',
    RUIM: 'Ruim',
  }
  const boolLabel = (valor: boolean | null | undefined) =>
    valor === true ? 'Sim' : valor === false ? 'Nao' : '-'

  const concluidaEm = audiencia.historicoStatus[0]?.createdAt
    ? formatarDataHoraRelatorio(audiencia.historicoStatus[0].createdAt, env.ORQ_TIMEZONE)
    : '-'
  const dataAudiencia = formatarDataRelatorio(audiencia.data)
  const ocorrido =
    audiencia.relatorio.audienciaOcorreu
      ? ocorridoLabel[audiencia.relatorio.audienciaOcorreu]
      : '-'
  const docAntecedencia =
    audiencia.relatorio.docAntecedencia ?? null
  const docAntecedenciaJustificativa =
    audiencia.relatorio.docAntecedenciaJustificativa?.trim() || '-'
  const advogadoAntecedencia =
    audiencia.relatorio.advogadoAntecedencia ?? null
  const advogadoAntecedenciaJustificativa =
    audiencia.relatorio.advogadoAntecedenciaJustificativa?.trim() || '-'
  const infoCompleta =
    audiencia.relatorio.infoCompleta ? infoCompletaLabel[audiencia.relatorio.infoCompleta] : '-'
  const infoFaltante = audiencia.relatorio.infoFaltante?.trim() || '-'
  const conhecimentoAdvogado =
    audiencia.relatorio.conhecimentoAdvogado ?? null
  const comentarioConhecimento =
    audiencia.relatorio.comentarioConhecimento?.trim() || '-'
  const avaliacaoAtuacao =
    audiencia.relatorio.avaliacaoAtuacao
      ? avaliacaoLabel[audiencia.relatorio.avaliacaoAtuacao]
      : '-'
  const comentarioAvaliacao =
    audiencia.relatorio.comentarioAvaliacao?.trim() || '-'
  const comentarioFinal =
    audiencia.relatorio.comentarioFinal?.trim() ||
    audiencia.relatorio.relato?.trim() ||
    '-'
  const numeroProcessoSeguro = escapeHtml(audiencia.numeroProcesso)

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Relatorio Pos-Audiencia - ${numeroProcessoSeguro}</title>
  <style>
    :root {
      --bg: #f8fafc;
      --card: #ffffff;
      --line: #e2e8f0;
      --text: #0f172a;
      --muted: #475569;
      --accent: #d97706;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", Roboto, Arial, sans-serif;
      color: var(--text);
      background: var(--bg);
      line-height: 1.4;
    }
    .page {
      max-width: 920px;
      margin: 24px auto;
      padding: 0 16px 24px;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 14px;
    }
    .head {
      display: flex;
      gap: 12px;
      justify-content: space-between;
      align-items: start;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      border: 1px solid #fed7aa;
      color: #9a3412;
      background: #ffedd5;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }
    h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: .2px;
    }
    h2 {
      margin: 0 0 10px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: var(--muted);
    }
    .meta {
      margin-top: 8px;
      font-size: 14px;
      color: var(--muted);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px 16px;
    }
    .item {
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 10px 12px;
      background: #fff;
    }
    .label {
      display: block;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .value {
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
    }
    .questao {
      border-top: 1px dashed var(--line);
      padding: 10px 0;
    }
    .questao:first-child { border-top: 0; padding-top: 0; }
    .q {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 2px;
    }
    .a {
      font-size: 15px;
      font-weight: 700;
      color: var(--text);
    }
    .obs {
      white-space: pre-wrap;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 12px;
      font-size: 14px;
      background: #fff;
    }
    .foot {
      margin-top: 12px;
      font-size: 12px;
      color: var(--muted);
    }
    @media print {
      body { background: #fff; }
      .page { max-width: none; margin: 0; padding: 0; }
      .card { border-radius: 0; margin-bottom: 10px; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main class="page">
    <section class="card">
      <div class="head">
        <div>
          <h1>Relatorio Pos-Audiencia</h1>
          <div class="meta">Processo ${numeroProcessoSeguro}</div>
        </div>
        <span class="chip">Concluida</span>
      </div>
      <div class="grid" style="margin-top:14px">
        <div class="item"><span class="label">Data da audiencia</span><span class="value">${escapeHtml(dataAudiencia)} as ${escapeHtml(audiencia.hora)}</span></div>
        <div class="item"><span class="label">TRT</span><span class="value">${escapeHtml(audiencia.trt.numero)} - ${escapeHtml(audiencia.trt.nome)}</span></div>
        <div class="item"><span class="label">Preposto</span><span class="value">${escapeHtml(audiencia.preposto.nome)}</span></div>
        <div class="item"><span class="label">Telefone preposto</span><span class="value">${escapeHtml(audiencia.preposto.telefoneWhatsapp)}</span></div>
        <div class="item"><span class="label">Advogado</span><span class="value">${escapeHtml(audiencia.advogado ?? '-')}</span></div>
        <div class="item"><span class="label">Parceiro</span><span class="value">${escapeHtml(audiencia.parceiro.nome)}</span></div>
      </div>
    </section>

    <section class="card">
      <h2>Checklist Pos-Audiencia</h2>
      <div class="questao">
        <div class="q">1. A audiencia ocorreu?</div>
        <div class="a">${escapeHtml(ocorrido)}</div>
      </div>
      <div class="questao">
        <div class="q">2. Voce teve acesso a documentacao do processo e link da audiencia com antecedencia? (48h antes da audiencia)</div>
        <div class="a">${escapeHtml(boolLabel(docAntecedencia))}</div>
      </div>
      ${
        audiencia.relatorio.docAntecedencia === false
          ? `<div class="questao">
        <div class="q">2.1 Justificativa</div>
        <div class="obs">${escapeHtml(docAntecedenciaJustificativa)}</div>
      </div>`
          : ''
      }
      <div class="questao">
        <div class="q">3. O advogado chegou com no minimo 1h de antecedencia? (audiencia virtual: contato 30 min antes)</div>
        <div class="a">${escapeHtml(boolLabel(advogadoAntecedencia))}</div>
      </div>
      ${
        audiencia.relatorio.advogadoAntecedencia === false
          ? `<div class="questao">
        <div class="q">3.1 Justificativa</div>
        <div class="obs">${escapeHtml(advogadoAntecedenciaJustificativa)}</div>
      </div>`
          : ''
      }
      <div class="questao">
        <div class="q">4. Todas as informacoes estavam disponiveis no roteiro ou no corpo do e-mail?</div>
        <div class="a">${escapeHtml(infoCompleta)}</div>
      </div>
      ${
        audiencia.relatorio.infoCompleta === 'OUTRA' || audiencia.relatorio.infoCompleta === 'NAO'
          ? `<div class="questao">
        <div class="q">4.1 Conteudo faltante informado</div>
        <div class="obs">${escapeHtml(infoFaltante)}</div>
      </div>`
          : ''
      }
      <div class="questao">
        <div class="q">5. O advogado mostrou conhecimento sobre o caso e/ou lhe instruiu adequadamente?</div>
        <div class="a">${escapeHtml(boolLabel(conhecimentoAdvogado))}</div>
      </div>
      <div class="questao">
        <div class="q">6. Comente a avaliacao sobre a resposta da pergunta anterior</div>
        <div class="obs">${escapeHtml(comentarioConhecimento)}</div>
      </div>
      <div class="questao">
        <div class="q">7. Qual a sua avaliacao quanto a atuacao do advogado na conducao da audiencia?</div>
        <div class="a">${escapeHtml(avaliacaoAtuacao)}</div>
      </div>
      <div class="questao">
        <div class="q">8. Comente a avaliacao sobre a resposta da pergunta anterior</div>
        <div class="obs">${escapeHtml(comentarioAvaliacao)}</div>
      </div>
      <div class="questao">
        <div class="q">9. Espaco aberto para comentarios e sugestoes de melhorias</div>
        <div class="obs">${escapeHtml(comentarioFinal)}</div>
      </div>
    </section>

    <section class="card">
      <h2>Fechamento</h2>
      <div class="foot">Fechamento registrado em: ${escapeHtml(concluidaEm)}</div>
    </section>
  </main>
</body>
</html>`

  return {
    filename: `relatorio-pos-audiencia-${sanitizarNomeArquivo(audiencia.numeroProcesso)}.html`,
    contentType: 'text/html; charset=utf-8',
    buffer: Buffer.from(html, 'utf-8'),
  }
}

// === Criar audiência manualmente ===

export async function criarAudiencia(dados: DadosCriarAudiencia, usuarioId: string) {
  await validarTrtAtivo(dados.trtId)

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

  const config = await obterConfiguracoes()
  await agendarComTolerancia(audiencia.id, audiencia.data, audiencia.hora, config.enviarAvisoNaImportacao)

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
      logsAutomacao: {
        orderBy: { createdAt: 'desc' },
        take: 100,
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

  if (dados.trtId) {
    await validarTrtAtivo(dados.trtId)
  }

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

    if (dados.status === 'SUBSTITUICAO_NECESSARIA') {
      const substituicaoCriada = await garantirSubstituicaoAberta({
        audienciaId: id,
        prepostoAnteriorId: audienciaAtual.prepostoId,
        motivo: 'Atualizacao manual para substituicao necessaria',
      })

      if (audienciaAtual.status !== 'SUBSTITUICAO_NECESSARIA' || substituicaoCriada) {
        await dispararEscalonamentoComProtecao(
          id,
          'Substituicao necessaria definida manualmente',
          'MANUAL',
        )
      }
    }
  }

  if (audiencia.status === 'CANCELADA' || audiencia.status === 'CONCLUIDA') {
    await removerComTolerancia(audiencia.id)
  } else {
    await agendarComTolerancia(audiencia.id, audiencia.data, audiencia.hora)
  }

  return audiencia
}

// === Kanban — audiências agrupadas por status ===

export async function buscarKanban() {
  const audiencias = await prisma.audiencia.findMany({
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
  const ultimas24h = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const ultimos7Dias = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const periodoPosRelatorioDias = 30
  const inicioPosRelatorio = new Date(Date.now() - periodoPosRelatorioDias * 24 * 60 * 60 * 1000)

  const [
    totalAtivas,
    totalAudiencias,
    audienciasHoje,
    audienciasSemana,
    porStatus,
    aguardandoConfirmacao,
    semResposta,
    reiteracoesDisparadas24h,
    respostasWhatsapp24h,
    substituicoesPorAutomacao24h,
    totalRelatoriosPosPeriodo,
    ocorrenciaPosPeriodo,
    docAntecedenciaPosPeriodo,
    advogadoAntecedenciaPosPeriodo,
    infoCompletaPosPeriodo,
    conhecimentoPosPeriodo,
    avaliacaoAtuacaoPosPeriodo,
    substituicoesAbertas,
    substituicoesResolvidasUltimos7Dias,
  ] = await Promise.all([
    prisma.audiencia.count({
      where: { status: { notIn: ['CONCLUIDA', 'CANCELADA'] } },
    }),
    prisma.audiencia.count(),
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
    prisma.logAutomacao.count({
      where: {
        evento: 'DISPARO',
        etapa: 'REITERACAO_6H',
        createdAt: { gte: ultimas24h },
      },
    }),
    prisma.logAutomacao.count({
      where: {
        evento: 'RESPOSTA_CONFIRMADA',
        createdAt: { gte: ultimas24h },
      },
    }),
    prisma.logAutomacao.count({
      where: {
        evento: 'SUBSTITUICAO_ABERTA',
        createdAt: { gte: ultimas24h },
      },
    }),
    prisma.relatorioAudiencia.count({
      where: { createdAt: { gte: inicioPosRelatorio } },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['audienciaOcorreu'],
      where: {
        createdAt: { gte: inicioPosRelatorio },
        audienciaOcorreu: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['docAntecedencia'],
      where: {
        createdAt: { gte: inicioPosRelatorio },
        docAntecedencia: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['advogadoAntecedencia'],
      where: {
        createdAt: { gte: inicioPosRelatorio },
        advogadoAntecedencia: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['infoCompleta'],
      where: {
        createdAt: { gte: inicioPosRelatorio },
        infoCompleta: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['conhecimentoAdvogado'],
      where: {
        createdAt: { gte: inicioPosRelatorio },
        conhecimentoAdvogado: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.relatorioAudiencia.groupBy({
      by: ['avaliacaoAtuacao'],
      where: {
        createdAt: { gte: inicioPosRelatorio },
        avaliacaoAtuacao: { not: null },
      },
      _count: { _all: true },
    }),
    prisma.substituicao.count({
      where: { status: 'ABERTA' },
    }),
    prisma.substituicao.findMany({
      where: {
        status: 'RESOLVIDA',
        createdAt: { gte: ultimos7Dias },
        resolvidoEm: { not: null },
      },
      select: {
        createdAt: true,
        resolvidoEm: true,
      },
    }),
  ])

  const ocorrenciaMap = new Map(
    ocorrenciaPosPeriodo.map((item) => [item.audienciaOcorreu, item._count._all]),
  )
  const docAntecedenciaMap = new Map(
    docAntecedenciaPosPeriodo.map((item) => [item.docAntecedencia, item._count._all]),
  )
  const advogadoAntecedenciaMap = new Map(
    advogadoAntecedenciaPosPeriodo.map((item) => [item.advogadoAntecedencia, item._count._all]),
  )
  const infoCompletaMap = new Map(
    infoCompletaPosPeriodo.map((item) => [item.infoCompleta, item._count._all]),
  )
  const conhecimentoMap = new Map(
    conhecimentoPosPeriodo.map((item) => [item.conhecimentoAdvogado, item._count._all]),
  )
  const avaliacaoMap = new Map(
    avaliacaoAtuacaoPosPeriodo.map((item) => [item.avaliacaoAtuacao, item._count._all]),
  )
  const temposResolucaoMinutos = substituicoesResolvidasUltimos7Dias
    .map((item) => {
      if (!item.resolvidoEm) return null
      return Math.round((item.resolvidoEm.getTime() - item.createdAt.getTime()) / (60 * 1000))
    })
    .filter((valor): valor is number => typeof valor === 'number' && valor >= 0)
  const totalResolvidasSemana = temposResolucaoMinutos.length
  const mediaResolucaoMinutos =
    totalResolvidasSemana > 0
      ? Math.round(
          temposResolucaoMinutos.reduce((acc, minutos) => acc + minutos, 0) / totalResolvidasSemana,
        )
      : null
  const dentroSla60Minutos = temposResolucaoMinutos.filter((minutos) => minutos <= 60).length
  const taxaDentroSla60Minutos =
    totalResolvidasSemana > 0
      ? Math.round((dentroSla60Minutos / totalResolvidasSemana) * 100)
      : null

  return {
    totalAtivas,
    totalAudiencias,
    audienciasHoje,
    audienciasSemana,
    aguardandoConfirmacao,
    semResposta,
    porStatus: porStatus.map((status) => ({
      status: status.status,
      total: status._count.id,
    })),
    automacao: {
      reiteracoesDisparadas24h,
      respostasWhatsapp24h,
      substituicoesPorAutomacao24h,
    },
    monitoramentoSemanal: {
      periodoDias: 7,
      audienciasSemana,
      semResposta,
      substituicoes: {
        abertas: substituicoesAbertas,
        resolvidas: totalResolvidasSemana,
        mediaResolucaoMinutos,
        dentroSla60Minutos,
        taxaDentroSla60Minutos,
      },
    },
    posRelatorio: {
      periodoDias: periodoPosRelatorioDias,
      totalRelatorios: totalRelatoriosPosPeriodo,
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
    },
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

  const substituicaoAberta = await prisma.substituicao.findFirst({
    where: {
      audienciaId,
      status: 'ABERTA',
    },
    select: { id: true, motivo: true },
    orderBy: { createdAt: 'desc' },
  })

  if (substituicaoAberta) {
    await prisma.substituicao.update({
      where: { id: substituicaoAberta.id },
      data: {
        prepostoNovoId,
        status: 'RESOLVIDA',
        resolvidoEm: new Date(),
        motivo: `${substituicaoAberta.motivo} | Resolucao manual Hub: ${motivo}`,
      },
    })
  } else {
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
  }

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

  await agendarComTolerancia(
    audienciaAtualizada.id,
    audienciaAtualizada.data,
    audienciaAtualizada.hora,
    true,
  )

  if (substituicaoAberta) {
    try {
      await notificarSubstituicaoRealizada({
        audienciaId,
        origem: 'VISEU',
        novoPrepostoNome: audienciaAtualizada.preposto?.nome ?? 'Preposto substituto',
        novoPrepostoTelefone: audienciaAtualizada.preposto?.telefoneWhatsapp ?? '-',
        origemEvento: 'MANUAL',
      })
    } catch (error) {
      console.error('[substituicao] falha ao notificar substituicao manual realizada', {
        audienciaId,
        erro: error instanceof Error ? error.message : String(error),
      })
    }
  }

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

  await removerComTolerancia(audienciaId)

  await notificarCancelamentoPreposto(audiencia, motivo)

  return atualizada
}

export async function deletarAudienciaDefinitiva(audienciaId: string) {
  const audiencia = await prisma.audiencia.findUnique({
    where: { id: audienciaId },
    select: {
      id: true,
      numeroProcesso: true,
    },
  })
  if (!audiencia) return null

  await removerComTolerancia(audienciaId)

  await prisma.$transaction(async (tx) => {
    await tx.logAutomacao.deleteMany({ where: { audienciaId } })
    await tx.relatorioAudiencia.deleteMany({ where: { audienciaId } })
    await tx.substituicao.deleteMany({ where: { audienciaId } })
    await tx.historicoStatus.deleteMany({ where: { audienciaId } })
    await tx.mensagem.deleteMany({ where: { audienciaId } })
    await tx.audiencia.delete({ where: { id: audienciaId } })
  })

  return audiencia
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

  let substituicaoCriada = false
  if (evento === 'ESTOU_COM_PROBLEMA') {
    substituicaoCriada = await garantirSubstituicaoAberta({
      audienciaId,
      prepostoAnteriorId: audiencia.prepostoId,
      motivo: observacao ?? 'Check-in: estou com problema',
    })
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

  if (evento === 'ESTOU_COM_PROBLEMA' && (audiencia.status !== statusNovo || substituicaoCriada)) {
    await dispararEscalonamentoComProtecao(
      audienciaId,
      'Check-in com problema reportado pelo preposto',
      'MANUAL',
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
      docAntecedencia: dados.docAntecedencia,
      docAntecedenciaJustificativa: dados.docAntecedenciaJustificativa?.trim() || null,
      advogadoAntecedencia: dados.advogadoAntecedencia,
      advogadoAntecedenciaJustificativa: dados.advogadoAntecedenciaJustificativa?.trim() || null,
      infoCompleta: dados.infoCompleta,
      infoFaltante: dados.infoFaltante ?? null,
      conhecimentoAdvogado: dados.conhecimentoAdvogado,
      comentarioConhecimento: dados.comentarioConhecimento ?? null,
      avaliacaoAtuacao: dados.avaliacaoAtuacao,
      comentarioAvaliacao: dados.comentarioAvaliacao ?? null,
      comentarioFinal: dados.comentarioFinal ?? null,
    },
    create: {
      audienciaId,
      audienciaOcorreu: dados.audienciaOcorreu,
      docAntecedencia: dados.docAntecedencia,
      docAntecedenciaJustificativa: dados.docAntecedenciaJustificativa?.trim() || null,
      advogadoAntecedencia: dados.advogadoAntecedencia,
      advogadoAntecedenciaJustificativa: dados.advogadoAntecedenciaJustificativa?.trim() || null,
      infoCompleta: dados.infoCompleta,
      infoFaltante: dados.infoFaltante ?? null,
      conhecimentoAdvogado: dados.conhecimentoAdvogado,
      comentarioConhecimento: dados.comentarioConhecimento ?? null,
      avaliacaoAtuacao: dados.avaliacaoAtuacao,
      comentarioAvaliacao: dados.comentarioAvaliacao ?? null,
      comentarioFinal: dados.comentarioFinal ?? null,
    },
  })

  await prisma.mensagem.create({
    data: {
      audienciaId,
      prepostoId: audiencia.prepostoId,
      tipo: 'RELATORIO_POS',
      direcao: 'RECEBIDA',
      conteudo: 'Relatorio pos-audiencia recebido',
      observacao: dados.comentarioFinal ?? null,
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

async function garantirSubstituicaoAberta(params: {
  audienciaId: string
  prepostoAnteriorId: string
  motivo: string
}) {
  const substituicaoAberta = await prisma.substituicao.findFirst({
    where: {
      audienciaId: params.audienciaId,
      status: 'ABERTA',
    },
    select: { id: true },
  })

  if (substituicaoAberta) return false

  await prisma.substituicao.create({
    data: {
      audienciaId: params.audienciaId,
      prepostoAnteriorId: params.prepostoAnteriorId,
      motivo: params.motivo,
      status: 'ABERTA',
    },
  })

  return true
}

async function dispararEscalonamentoComProtecao(
  audienciaId: string,
  motivo: string,
  origem: 'WEBHOOK' | 'MANUAL',
) {
  try {
    await dispararEscalonamentoSubstituicao(audienciaId, motivo, origem)
  } catch (error) {
    await registrarLogAutomacao({
      audienciaId,
      origem,
      evento: 'ERRO',
      etapa: 'ESCALONAMENTO',
      status: 'ERRO',
      mensagem: 'Falha ao disparar escalonamento de substituicao',
      metadados: {
        erro: error instanceof Error ? error.message : String(error),
      },
    })
  }
}

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

function formatarDataRelatorio(data: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(data)
}

function formatarDataHoraRelatorio(data: Date, timeZone: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(data)
}

function sanitizarNomeArquivo(valor: string) {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function escapeHtml(valor: string) {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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

async function validarTrtAtivo(trtId: string) {
  const trt = await prisma.trt.findUnique({
    where: { id: trtId },
    select: { id: true, ativo: true },
  })

  if (!trt) {
    throw new Error('TRT_NAO_ENCONTRADO')
  }

  if (!trt.ativo) {
    throw new Error('TRT_INATIVO')
  }
}

async function agendarComTolerancia(audienciaId: string, data: Date, hora: string, dispararD1Imediato = false) {
  try {
    await agendarOrquestracaoAudiencia({ audienciaId, data, hora, dispararD1Imediato })
  } catch (error) {
    console.error('[orquestracao] falha ao agendar audiencia', {
      audienciaId,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

async function notificarCancelamentoPreposto(
  audiencia: {
    id: string
    numeroProcesso: string
    data: Date
    hora: string
    prepostoId: string
    preposto?: { nome: string; telefoneWhatsapp: string } | null
  },
  motivo: string,
) {
  try {
    const config = await obterConfiguracoes()
    const preposto = audiencia.preposto
      ? audiencia.preposto
      : await prisma.preposto.findUnique({
          where: { id: audiencia.prepostoId },
          select: { nome: true, telefoneWhatsapp: true },
        })

    if (!preposto) return

    const dataFmt = new Intl.DateTimeFormat('pt-BR').format(audiencia.data)
    const variaveis: Record<string, string> = {
      nomePreposto: preposto.nome,
      numeroProcesso: audiencia.numeroProcesso,
      data: dataFmt,
      hora: audiencia.hora,
      local: 'local a confirmar',
      escritorioParceiro: '',
      trt: '',
      motivoCancelamento: motivo,
    }

    const template = config.mensagemCancelamento || TEMPLATES_DEFAULT.mensagemCancelamento
    const texto = aplicarTemplate(template, variaveis)

    const envio = await whatsapp.enviarMensagem({
      para: preposto.telefoneWhatsapp,
      texto,
      audienciaId: audiencia.id,
      tipo: 'CANCELAMENTO',
    })

    await prisma.mensagem.create({
      data: {
        audienciaId: audiencia.id,
        prepostoId: audiencia.prepostoId,
        tipo: 'CANCELAMENTO',
        direcao: 'ENVIADA',
        conteudo: texto,
        whatsappMessageId: envio.providerMessageId ?? null,
        statusEnvio: 'ENVIADA',
      },
    })

    await registrarLogAutomacao({
      audienciaId: audiencia.id,
      origem: 'MANUAL',
      evento: 'DISPARO',
      etapa: 'CANCELAMENTO',
      status: 'SUCESSO',
      mensagem: 'Mensagem de cancelamento enviada ao preposto',
    })
  } catch (error) {
    await registrarLogAutomacao({
      audienciaId: audiencia.id,
      origem: 'MANUAL',
      evento: 'ERRO',
      etapa: 'CANCELAMENTO',
      status: 'ERRO',
      mensagem: 'Falha ao enviar mensagem de cancelamento',
      metadados: { erro: error instanceof Error ? error.message : String(error) },
    })
  }
}

async function removerComTolerancia(audienciaId: string) {
  try {
    await removerOrquestracaoAudiencia(audienciaId)
  } catch (error) {
    console.error('[orquestracao] falha ao remover audiencia da fila', {
      audienciaId,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

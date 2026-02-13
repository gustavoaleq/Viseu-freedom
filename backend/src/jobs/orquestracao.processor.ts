import { prisma } from '../config/database.js'
import { registrarLogAutomacao } from '../services/automacao-log.service.js'
import { criarWhatsAppAdapter } from '../services/whatsapp.adapter.js'
import type { StatusAudiencia, TipoMensagem } from '../generated/prisma/client.js'
import type { TipoJobOrquestracao } from './orquestracao.queue.js'

const whatsapp = criarWhatsAppAdapter()

interface ResultadoProcessamento {
  ok: boolean
  reason?:
    | 'AUDIENCIA_NAO_ENCONTRADA'
    | 'SEM_PREPOSTO'
    | 'STATUS_FINAL'
    | 'REITERACAO_NAO_APLICAVEL'
  audienciaId?: string
  tipo?: TipoJobOrquestracao
  providerMessageId?: string
}

interface OpcoesProcessamento {
  forcar?: boolean
  origem?: 'WORKER' | 'MANUAL'
}

export async function processarOrquestracaoAudiencia(
  tipo: TipoJobOrquestracao,
  audienciaId: string,
  atualizadoPor: string,
  opcoes: OpcoesProcessamento = {},
): Promise<ResultadoProcessamento> {
  const origem = opcoes.origem ?? 'WORKER'
  const audiencia = await prisma.audiencia.findUnique({
    where: { id: audienciaId },
    include: {
      preposto: { select: { id: true, nome: true, telefoneWhatsapp: true } },
      parceiro: { select: { nome: true } },
      trt: { select: { numero: true } },
    },
  })

  if (!audiencia) {
    return { ok: false, reason: 'AUDIENCIA_NAO_ENCONTRADA' }
  }
  if (!audiencia.preposto) {
    await registrarLogAutomacao({
      audienciaId,
      origem,
      evento: 'DISPARO_IGNORADO',
      etapa: tipo,
      status: 'IGNORADO',
      mensagem: 'Disparo ignorado: audiencia sem preposto',
    })
    return { ok: false, reason: 'SEM_PREPOSTO' }
  }
  if (audiencia.status === 'CANCELADA' || audiencia.status === 'CONCLUIDA') {
    await registrarLogAutomacao({
      audienciaId,
      origem,
      evento: 'DISPARO_IGNORADO',
      etapa: tipo,
      status: 'IGNORADO',
      mensagem: 'Disparo ignorado: audiencia finalizada',
      metadados: { status: audiencia.status },
    })
    return { ok: false, reason: 'STATUS_FINAL' }
  }

  if (tipo === 'REITERACAO_6H' && !opcoes.forcar) {
    const elegivel = await podeDispararReiteracao(audiencia.id)
    if (!elegivel.ok) {
      await registrarLogAutomacao({
        audienciaId: audiencia.id,
        origem,
        evento: 'DISPARO_IGNORADO',
        etapa: tipo,
        status: 'IGNORADO',
        mensagem: elegivel.motivo,
        metadados: elegivel.metadados,
      })
      return { ok: false, reason: 'REITERACAO_NAO_APLICAVEL' }
    }
  }

  const mensagem = montarMensagem(tipo, audiencia)
  try {
    const envio = await whatsapp.enviarMensagem({
      para: audiencia.preposto.telefoneWhatsapp,
      texto: mensagem.texto,
      audienciaId: audiencia.id,
      tipo: mensagem.tipo,
      buttons: mensagem.buttons,
    })

    await prisma.mensagem.create({
      data: {
        audienciaId: audiencia.id,
        prepostoId: audiencia.prepostoId,
        tipo: mensagem.tipo,
        direcao: 'ENVIADA',
        conteudo: mensagem.texto,
        whatsappMessageId: envio.providerMessageId ?? null,
        statusEnvio: 'ENVIADA',
      },
    })

    await aplicarTransicaoStatus(
      audiencia.id,
      audiencia.status,
      mensagem.statusNovo,
      mensagem.motivo,
      atualizadoPor,
    )

    await registrarLogAutomacao({
      audienciaId: audiencia.id,
      origem,
      evento: 'DISPARO',
      etapa: tipo,
      status: 'SUCESSO',
      mensagem: 'Mensagem de orquestracao enviada',
      metadados: {
        tipoMensagem: mensagem.tipo,
        providerMessageId: envio.providerMessageId ?? null,
        telefone: audiencia.preposto.telefoneWhatsapp,
      },
    })

    return {
      ok: true,
      audienciaId: audiencia.id,
      tipo,
      providerMessageId: envio.providerMessageId,
    }
  } catch (error) {
    await registrarLogAutomacao({
      audienciaId: audiencia.id,
      origem,
      evento: 'ERRO',
      etapa: tipo,
      status: 'ERRO',
      mensagem: 'Falha ao enviar mensagem de orquestracao',
      metadados: {
        erro: error instanceof Error ? error.message : String(error),
      },
    })
    throw error
  }
}

function montarMensagem(
  tipo: TipoJobOrquestracao,
  audiencia: {
    id: string
    numeroProcesso: string
    data: Date
    hora: string
    local: string | null
    link: string | null
    status: StatusAudiencia
    preposto: { nome: string }
  },
) {
  const dataFmt = new Intl.DateTimeFormat('pt-BR').format(audiencia.data)
  const localOuLink = audiencia.local || audiencia.link || 'local a confirmar'

  if (tipo === 'CONFIRMACAO_D1') {
    return {
      tipo: 'CONFIRMACAO_D1' as TipoMensagem,
      statusNovo: 'A_CONFIRMAR' as StatusAudiencia,
      motivo: 'Disparo automatico D-1',
      texto: `Ola ${audiencia.preposto.nome}. Temos audiencia do processo ${audiencia.numeroProcesso} em ${dataFmt} as ${audiencia.hora}. Local/link: ${localOuLink}. Voce ira participar?`,
      buttons: [
        { id: 'CONFIRMO', label: 'Sim, confirmo' },
        { id: 'NAO_POSSO', label: 'Nao, nao posso' },
      ],
    }
  }

  if (tipo === 'REITERACAO_6H') {
    return {
      tipo: 'REITERACAO_H1H30' as TipoMensagem,
      statusNovo: 'A_CONFIRMAR' as StatusAudiencia,
      motivo: 'Disparo automatico de reiteracao 6h',
      texto: `Ola ${audiencia.preposto.nome}. Reiterando a audiencia do processo ${audiencia.numeroProcesso} em ${dataFmt} as ${audiencia.hora}. Local/link: ${localOuLink}. Voce ira participar? Apenas para confirmarmos.`,
      buttons: [
        { id: 'CONFIRMO', label: 'Sim, confirmo' },
        { id: 'NAO_POSSO', label: 'Nao, nao posso' },
      ],
    }
  }

  if (tipo === 'CHECKIN_DIA') {
    return {
      tipo: 'CHECK_IN' as TipoMensagem,
      statusNovo: 'CHECK_IN_PENDENTE' as StatusAudiencia,
      motivo: 'Disparo automatico de check-in',
      texto: `Check-in da audiencia ${audiencia.numeroProcesso} hoje as ${audiencia.hora}. Chegou no local?`,
      buttons: [
        { id: 'ESTOU_A_CAMINHO', label: 'Estou a caminho' },
        { id: 'JA_CHEGUEI', label: 'Ja cheguei' },
        { id: 'ESTOU_COM_PROBLEMA', label: 'Nao conseguirei ir' },
      ],
    }
  }

  return {
    tipo: 'RELATORIO_POS' as TipoMensagem,
    statusNovo: 'RELATORIO_PENDENTE' as StatusAudiencia,
    motivo: 'Disparo automatico de relatorio pos-audiencia',
    texto: `Checkout pos-audiencia do processo ${audiencia.numeroProcesso}. Pergunta 1/6: A audiencia ocorreu?`,
    buttons: [
      { id: 'AUDIENCIA_SIM', label: 'Sim, ocorreu' },
      { id: 'AUDIENCIA_NAO', label: 'Nao ocorreu' },
      { id: 'AUDIENCIA_REMARCADA', label: 'Foi remarcada' },
    ],
  }
}

async function aplicarTransicaoStatus(
  audienciaId: string,
  statusAtual: StatusAudiencia,
  statusNovo: StatusAudiencia,
  motivo: string,
  atualizadoPor: string,
) {
  if (statusAtual === statusNovo) return
  if (statusAtual === 'CANCELADA' || statusAtual === 'CONCLUIDA') return
  if (!podeTransicionarAutomaticamente(statusAtual, statusNovo)) return

  await prisma.audiencia.update({
    where: { id: audienciaId },
    data: { status: statusNovo },
  })

  await prisma.historicoStatus.create({
    data: {
      audienciaId,
      statusAnterior: statusAtual,
      statusNovo,
      motivo,
      atualizadoPor,
    },
  })
}

async function podeDispararReiteracao(audienciaId: string) {
  const ultimaResposta = await prisma.mensagem.findFirst({
    where: {
      audienciaId,
      direcao: 'RECEBIDA',
      tipo: { in: ['CONFIRMACAO_D1', 'REITERACAO_H1H30'] },
    },
    orderBy: { createdAt: 'desc' },
    select: { respostaBotao: true, createdAt: true, tipo: true },
  })

  if (!ultimaResposta) {
    return {
      ok: true,
      motivo: 'Reiteracao elegivel: sem resposta ao D-1',
      metadados: { regra: 'SEM_RESPOSTA_D1' },
    }
  }

  if (ultimaResposta.respostaBotao === 'NAO_POSSO') {
    return {
      ok: true,
      motivo: 'Reiteracao elegivel: ultima resposta foi NAO_POSSO',
      metadados: {
        regra: 'NAO_POSSO',
        ultimaRespostaEm: ultimaResposta.createdAt.toISOString(),
      },
    }
  }

  return {
    ok: false,
    motivo: 'Reiteracao ignorada: audiencia ja confirmada pelo preposto',
    metadados: {
      ultimaResposta: ultimaResposta.respostaBotao ?? null,
      tipoMensagem: ultimaResposta.tipo,
      ultimaRespostaEm: ultimaResposta.createdAt.toISOString(),
    },
  }
}

function podeTransicionarAutomaticamente(
  statusAtual: StatusAudiencia,
  statusNovo: StatusAudiencia,
) {
  if (statusNovo === 'A_CONFIRMAR') {
    return ['IMPORTADA', 'AGENDADA', 'NAO_POSSO', 'SEM_RESPOSTA'].includes(statusAtual)
  }

  if (statusNovo === 'CHECK_IN_PENDENTE') {
    return (
      statusAtual === 'IMPORTADA' ||
      statusAtual === 'AGENDADA' ||
      statusAtual === 'A_CONFIRMAR' ||
      statusAtual === 'CONFIRMADA' ||
      statusAtual === 'EM_ANDAMENTO'
    )
  }

  if (statusNovo === 'RELATORIO_PENDENTE') {
    return (
      statusAtual === 'CHECK_IN_PENDENTE' ||
      statusAtual === 'EM_ANDAMENTO' ||
      statusAtual === 'CONFIRMADA' ||
      statusAtual === 'A_CONFIRMAR'
    )
  }

  return true
}

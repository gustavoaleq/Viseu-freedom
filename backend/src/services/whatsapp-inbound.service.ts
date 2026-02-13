import { env } from '../config/env.js'
import { removerOrquestracaoAudiencia } from '../jobs/orquestracao.scheduler.js'
import { prisma } from '../config/database.js'
import type { StatusAudiencia, TipoMensagem } from '../generated/prisma/client.js'
import { registrarLogAutomacao } from './automacao-log.service.js'
import {
  buscarContextoContatoEscalonamento,
  dispararEscalonamentoSubstituicao,
  enviarMensagemContato,
  notificarSubstituicaoRealizada,
  registrarMensagemContatoRecebida,
  resolverSubstituicaoPorContato,
} from './substituicao-automacao.service.js'
import { criarWhatsAppAdapter } from './whatsapp.adapter.js'

const whatsapp = criarWhatsAppAdapter()

type RespostaId =
  | 'CONFIRMO'
  | 'NAO_POSSO'
  | 'ESTOU_A_CAMINHO'
  | 'JA_CHEGUEI'
  | 'ESTOU_COM_PROBLEMA'
  | 'AUDIENCIA_SIM'
  | 'AUDIENCIA_NAO'
  | 'AUDIENCIA_REMARCADA'
  | 'RESULTADO_ACORDO'
  | 'RESULTADO_SEM_ACORDO'
  | 'RESULTADO_AUSENCIA'
  | 'RESULTADO_REDESIGNADA'
  | 'ADVOGADO_PRESENTE_SIM'
  | 'ADVOGADO_PRESENTE_NAO'
  | 'ADVOGADO_DOMINIO_SIM'
  | 'ADVOGADO_DOMINIO_NAO'
  | 'PROBLEMA_RELEVANTE_SIM'
  | 'PROBLEMA_RELEVANTE_NAO'
  | 'RELATORIO_OBSERVACAO'

interface RegraResposta {
  id: RespostaId
  tipoMensagem: TipoMensagem
  statusNovo: StatusAudiencia
  motivo: string
  label: string
  abrirSubstituicao?: boolean
  interromperOrquestracao?: boolean
}

interface ResultadoWebhookWhatsApp {
  ok: boolean
  ignored?: string
  detalhe?: string
  audienciaId?: string
  prepostoId?: string
  respostaId?: RespostaId
  statusAnterior?: StatusAudiencia
  statusNovo?: StatusAudiencia
}

interface ContatoParceiroResumo {
  id: string
  nome: string
  telefoneWhatsapp: string
  parceiroId: string
  parceiro: {
    nome: string
  }
}

type EstadoColetaSubstituto =
  | { etapa: 'NOME' }
  | { etapa: 'TELEFONE'; nome: string }

const OBS_ETAPA_SUBSTITUTO_NOME = 'ESCALONAMENTO_ETAPA:NOME'
const OBS_ETAPA_SUBSTITUTO_TELEFONE = 'ESCALONAMENTO_ETAPA:TELEFONE:'

const RESPOSTAS: Record<RespostaId, RegraResposta> = {
  CONFIRMO: {
    id: 'CONFIRMO',
    tipoMensagem: 'CONFIRMACAO_D1',
    statusNovo: 'CONFIRMADA',
    motivo: 'Resposta WhatsApp: confirmou participacao',
    label: 'Sim, confirmo',
  },
  NAO_POSSO: {
    id: 'NAO_POSSO',
    tipoMensagem: 'CONFIRMACAO_D1',
    statusNovo: 'NAO_POSSO',
    motivo: 'Resposta WhatsApp: indisponibilidade do preposto',
    label: 'Nao, nao posso',
  },
  ESTOU_A_CAMINHO: {
    id: 'ESTOU_A_CAMINHO',
    tipoMensagem: 'CHECK_IN',
    statusNovo: 'EM_ANDAMENTO',
    motivo: 'Resposta WhatsApp: check-in a caminho',
    label: 'Estou a caminho',
  },
  JA_CHEGUEI: {
    id: 'JA_CHEGUEI',
    tipoMensagem: 'CHECK_IN',
    statusNovo: 'EM_ANDAMENTO',
    motivo: 'Resposta WhatsApp: check-in concluido',
    label: 'Ja cheguei',
  },
  ESTOU_COM_PROBLEMA: {
    id: 'ESTOU_COM_PROBLEMA',
    tipoMensagem: 'CHECK_IN',
    statusNovo: 'SUBSTITUICAO_NECESSARIA',
    motivo: 'Resposta WhatsApp: preposto reportou problema',
    label: 'Nao conseguirei ir',
    abrirSubstituicao: true,
    interromperOrquestracao: true,
  },
  AUDIENCIA_SIM: {
    id: 'AUDIENCIA_SIM',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - audiencia ocorreu',
    label: 'Sim, ocorreu',
  },
  AUDIENCIA_NAO: {
    id: 'AUDIENCIA_NAO',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - audiencia nao ocorreu',
    label: 'Nao ocorreu',
  },
  AUDIENCIA_REMARCADA: {
    id: 'AUDIENCIA_REMARCADA',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - audiencia remarcada',
    label: 'Foi remarcada',
  },
  RESULTADO_ACORDO: {
    id: 'RESULTADO_ACORDO',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - resultado acordo',
    label: 'Acordo',
  },
  RESULTADO_SEM_ACORDO: {
    id: 'RESULTADO_SEM_ACORDO',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - resultado sem acordo',
    label: 'Sem acordo',
  },
  RESULTADO_AUSENCIA: {
    id: 'RESULTADO_AUSENCIA',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - encerrada por ausencia',
    label: 'Encerrada por ausencia',
  },
  RESULTADO_REDESIGNADA: {
    id: 'RESULTADO_REDESIGNADA',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - redesignada',
    label: 'Redesignada',
  },
  ADVOGADO_PRESENTE_SIM: {
    id: 'ADVOGADO_PRESENTE_SIM',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - advogado presente',
    label: 'Advogado presente: sim',
  },
  ADVOGADO_PRESENTE_NAO: {
    id: 'ADVOGADO_PRESENTE_NAO',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - advogado ausente',
    label: 'Advogado presente: nao',
  },
  ADVOGADO_DOMINIO_SIM: {
    id: 'ADVOGADO_DOMINIO_SIM',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - dominio do caso adequado',
    label: 'Dominio do caso: sim',
  },
  ADVOGADO_DOMINIO_NAO: {
    id: 'ADVOGADO_DOMINIO_NAO',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - dominio do caso insuficiente',
    label: 'Dominio do caso: nao',
  },
  PROBLEMA_RELEVANTE_SIM: {
    id: 'PROBLEMA_RELEVANTE_SIM',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - houve problema relevante',
    label: 'Problema relevante: sim',
  },
  PROBLEMA_RELEVANTE_NAO: {
    id: 'PROBLEMA_RELEVANTE_NAO',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - sem problema relevante',
    label: 'Problema relevante: nao',
  },
  RELATORIO_OBSERVACAO: {
    id: 'RELATORIO_OBSERVACAO',
    tipoMensagem: 'RELATORIO_POS',
    statusNovo: 'RELATORIO_PENDENTE',
    motivo: 'Resposta WhatsApp: relatorio pos - observacao final',
    label: 'Observacao do relatorio',
  },
}

const TIPOS_INTERATIVOS: TipoMensagem[] = [
  'CONFIRMACAO_D1',
  'REITERACAO_H1H30',
  'CHECK_IN',
  'RELATORIO_POS',
]

const FALLBACK_NUMERICO: Record<TipoMensagem, RespostaId[]> = {
  CONFIRMACAO_D1: ['CONFIRMO', 'NAO_POSSO'],
  CHECK_IN: ['ESTOU_A_CAMINHO', 'JA_CHEGUEI', 'ESTOU_COM_PROBLEMA'],
  RELATORIO_POS: ['AUDIENCIA_SIM', 'AUDIENCIA_NAO', 'AUDIENCIA_REMARCADA'],
  REITERACAO_H1H30: ['CONFIRMO', 'NAO_POSSO'],
  SUBSTITUICAO_AVISO: ['NAO_POSSO'],
  ESCALONAMENTO: ['NAO_POSSO'],
}

const STATUS_VALIDOS_POR_RESPOSTA: Record<RespostaId, StatusAudiencia[]> = {
  CONFIRMO: ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CHECK_IN_PENDENTE', 'NAO_POSSO'],
  NAO_POSSO: ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE', 'NAO_POSSO'],
  ESTOU_A_CAMINHO: ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE'],
  JA_CHEGUEI: ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE'],
  ESTOU_COM_PROBLEMA: ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE'],
  AUDIENCIA_SIM: ['A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE', 'EM_ANDAMENTO', 'RELATORIO_PENDENTE'],
  AUDIENCIA_NAO: ['A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE', 'EM_ANDAMENTO', 'RELATORIO_PENDENTE'],
  AUDIENCIA_REMARCADA: [
    'AGENDADA',
    'A_CONFIRMAR',
    'CONFIRMADA',
    'CHECK_IN_PENDENTE',
    'EM_ANDAMENTO',
    'RELATORIO_PENDENTE',
  ],
  RESULTADO_ACORDO: ['RELATORIO_PENDENTE'],
  RESULTADO_SEM_ACORDO: ['RELATORIO_PENDENTE'],
  RESULTADO_AUSENCIA: ['RELATORIO_PENDENTE'],
  RESULTADO_REDESIGNADA: ['RELATORIO_PENDENTE'],
  ADVOGADO_PRESENTE_SIM: ['RELATORIO_PENDENTE'],
  ADVOGADO_PRESENTE_NAO: ['RELATORIO_PENDENTE'],
  ADVOGADO_DOMINIO_SIM: ['RELATORIO_PENDENTE'],
  ADVOGADO_DOMINIO_NAO: ['RELATORIO_PENDENTE'],
  PROBLEMA_RELEVANTE_SIM: ['RELATORIO_PENDENTE'],
  PROBLEMA_RELEVANTE_NAO: ['RELATORIO_PENDENTE'],
  RELATORIO_OBSERVACAO: ['RELATORIO_PENDENTE'],
}

const CAMINHOS_TELEFONE_WEBHOOK = [
  ['senderPhone'],
  ['sender', 'phone'],
  ['sender', 'id'],
  ['phone'],
  ['from'],
  ['chatId'],
  ['chatLid'],
] as const

export async function processarRespostaWhatsApp(payload: unknown): Promise<ResultadoWebhookWhatsApp> {
  const body = asRecord(payload)
  if (!body) return { ok: true, ignored: 'PAYLOAD_INVALIDO' }

  const tipoEventoWebhook = normalizarTexto(
    extrairPrimeiroValorString(body, [['type'], ['event'], ['eventType']]),
  )
  if (isEventoNaoRecebido(tipoEventoWebhook)) {
    return { ok: true, ignored: 'EVENTO_NAO_RECEBIDO' }
  }

  if (extrairFlagFromMe(body) === true) {
    return { ok: true, ignored: 'IGNORADO_FROM_ME' }
  }

  const telefonesRaw = extrairValoresString(body, CAMINHOS_TELEFONE_WEBHOOK as unknown as string[][])
  const candidatosTelefone = gerarCandidatosTelefones(telefonesRaw)
  if (candidatosTelefone.length === 0) {
    return { ok: true, ignored: 'SEM_TELEFONE' }
  }

  const messageIdEntrada = extrairPrimeiroValorString(body, [
    ['messageId'],
    ['id'],
    ['zaapId'],
    ['message', 'id'],
  ])

  const buttonId = extrairPrimeiroValorString(body, [
    ['buttonsResponseMessage', 'buttonId'],
    ['buttonsResponseMessage', 'selectedButtonId'],
    ['buttonActionsResponse', 'buttonId'],
    ['buttonId'],
  ])
  const textoResposta = extrairPrimeiroValorString(body, [
    ['buttonsResponseMessage', 'message'],
    ['text', 'message'],
    ['message', 'text'],
    ['message'],
    ['body'],
    ['conversation'],
  ])
  const mensagemReferenciaId = extrairPrimeiroValorString(body, [
    ['buttonsResponseMessage', 'stanzaId'],
    ['contextInfo', 'stanzaId'],
    ['quotedMsgId'],
    ['quotedMessageId'],
  ])
  const [prepostosEncontrados, contatosEncontrados] = await Promise.all([
    prisma.preposto.findMany({
      where: {
        telefoneWhatsapp: { in: candidatosTelefone },
      },
      select: { id: true, nome: true, telefoneWhatsapp: true },
    }),
    prisma.contatoParceiro.findMany({
      where: { telefoneWhatsapp: { in: candidatosTelefone } },
      select: {
        id: true,
        nome: true,
        telefoneWhatsapp: true,
        parceiroId: true,
        parceiro: { select: { nome: true } },
      },
    }),
  ])

  const preposto = selecionarPrepostoPorPrioridade(prepostosEncontrados, candidatosTelefone)
  const contato = selecionarContatoPorPrioridade(contatosEncontrados, candidatosTelefone)

  if (contato) {
    const priorizarContato = await devePriorizarContatoParceiro({
      contatoParceiroId: contato.id,
      mensagemReferenciaId,
      buttonId,
    })
    if (priorizarContato || !preposto) {
      return processarRespostaContatoParceiro({
        contato,
        messageIdEntrada,
        buttonId,
        textoResposta,
        mensagemReferenciaId,
      })
    }
  }

  if (!preposto) {
    return {
      ok: true,
      ignored: 'PREPOSTO_NAO_ENCONTRADO',
      detalhe: candidatosTelefone.slice(0, 6).join(', '),
    }
  }

  let contexto = await buscarContextoMensagem(preposto.id, mensagemReferenciaId)
  let respostaId = resolverResposta(buttonId, textoResposta, contexto?.tipo, contexto?.conteudo)
  if (!respostaId && textoResposta) {
    const contextoRelatorio = await buscarContextoRelatorioPendente(preposto.id)
    if (contextoRelatorio) {
      respostaId = 'RELATORIO_OBSERVACAO'
      if (!contexto) contexto = contextoRelatorio
    }
  }
  if (!respostaId) {
    return {
      ok: true,
      ignored: 'RESPOSTA_NAO_MAPEADA',
      prepostoId: preposto.id,
      detalhe: textoResposta ?? buttonId ?? undefined,
    }
  }

  const regra = RESPOSTAS[respostaId]

  if (messageIdEntrada) {
    const duplicada = await prisma.mensagem.findFirst({
      where: {
        prepostoId: preposto.id,
        direcao: 'RECEBIDA',
        whatsappMessageId: messageIdEntrada,
        respostaBotao: regra.id,
      },
      select: { id: true },
    })

    if (duplicada) {
      return {
        ok: true,
        ignored: 'MENSAGEM_DUPLICADA',
        prepostoId: preposto.id,
        respostaId: regra.id,
      }
    }
  }

  const audiencia = await resolverAudienciaAlvo(preposto.id, regra, contexto?.audienciaId)
  if (!audiencia) {
    return {
      ok: true,
      ignored: 'AUDIENCIA_NAO_ENCONTRADA',
      prepostoId: preposto.id,
      respostaId,
    }
  }

  const tipoContextoEfetivo = await obterTipoContextoDaAudiencia({
    prepostoId: preposto.id,
    audienciaId: audiencia.id,
    mensagemReferenciaId,
  })

  const respostaEmReiteracao =
    tipoContextoEfetivo === 'REITERACAO_H1H30' && (regra.id === 'CONFIRMO' || regra.id === 'NAO_POSSO')
  const tipoMensagemRecebida =
    respostaEmReiteracao && regra.tipoMensagem === 'CONFIRMACAO_D1'
      ? ('REITERACAO_H1H30' as TipoMensagem)
      : regra.tipoMensagem
  const statusNovoEfetivo =
    regra.id === 'NAO_POSSO' && respostaEmReiteracao ? ('SUBSTITUICAO_NECESSARIA' as const) : regra.statusNovo
  const motivoEfetivo =
    regra.id === 'NAO_POSSO' && respostaEmReiteracao
      ? 'Resposta WhatsApp: indisponibilidade reiterada do preposto'
      : regra.motivo
  const abrirSubstituicaoEfetivo =
    regra.abrirSubstituicao === true || (regra.id === 'NAO_POSSO' && respostaEmReiteracao)
  const interromperOrquestracaoEfetivo =
    regra.interromperOrquestracao === true || (regra.id === 'NAO_POSSO' && respostaEmReiteracao)

  await registrarLogAutomacao({
    audienciaId: audiencia.id,
    origem: 'WEBHOOK',
    evento: 'RESPOSTA_RECEBIDA',
    etapa: tipoMensagemRecebida,
    status: 'SUCESSO',
    mensagem: 'Resposta recebida do preposto',
    metadados: {
      respostaId,
      messageIdEntrada: messageIdEntrada ?? null,
      contextoTipo: contexto?.tipo ?? null,
      contextoTipoEfetivo: tipoContextoEfetivo ?? null,
    },
  })

  const conteudoMensagem = (textoResposta ?? '').trim() || regra.label
  const observacao = montarObservacao(textoResposta, regra.label)

  const aplicado = await prisma.$transaction(async (tx) => {
    const atual = await tx.audiencia.findUnique({
      where: { id: audiencia.id },
      select: { id: true, status: true, prepostoId: true },
    })
    if (!atual) return null

    await tx.mensagem.create({
      data: {
        audienciaId: atual.id,
        prepostoId: preposto.id,
        tipo: tipoMensagemRecebida,
        direcao: 'RECEBIDA',
        conteudo: conteudoMensagem,
        respostaBotao: regra.id,
        observacao,
        whatsappMessageId: messageIdEntrada ?? null,
        statusEnvio: 'LIDA',
      },
    })

    let statusFinal = atual.status
    let entrouEmSubstituicao = false
    if (podeTransicionarViaResposta(atual.status, statusNovoEfetivo) && atual.status !== statusNovoEfetivo) {
      await tx.audiencia.update({
        where: { id: atual.id },
        data: { status: statusNovoEfetivo },
      })
      await tx.historicoStatus.create({
        data: {
          audienciaId: atual.id,
          statusAnterior: atual.status,
          statusNovo: statusNovoEfetivo,
          motivo: motivoEfetivo,
          atualizadoPor: 'webhook-whatsapp',
        },
      })
      statusFinal = statusNovoEfetivo
      entrouEmSubstituicao = statusNovoEfetivo === 'SUBSTITUICAO_NECESSARIA'
    }

    let substituicaoCriada = false
    if (abrirSubstituicaoEfetivo) {
      const aberta = await tx.substituicao.findFirst({
        where: { audienciaId: atual.id, status: 'ABERTA' },
        select: { id: true },
      })

      if (!aberta) {
        await tx.substituicao.create({
          data: {
            audienciaId: atual.id,
            prepostoAnteriorId: atual.prepostoId,
            motivo: `Resposta WhatsApp: ${regra.label}`,
            status: 'ABERTA',
          },
        })
        substituicaoCriada = true
      }
    }

    return {
      audienciaId: atual.id,
      statusAnterior: atual.status,
      statusNovo: statusFinal,
      abriuSubstituicao: entrouEmSubstituicao || substituicaoCriada,
      entrouEmSubstituicao,
      substituicaoCriada,
    }
  })

  if (!aplicado) {
    return { ok: true, ignored: 'AUDIENCIA_REMOVIDA', prepostoId: preposto.id }
  }

  await registrarLogAutomacao({
    audienciaId: aplicado.audienciaId,
    origem: 'WEBHOOK',
    evento: 'RESPOSTA_CONFIRMADA',
    etapa: tipoMensagemRecebida,
    status: 'SUCESSO',
    mensagem: 'Resposta aplicada no sistema',
    metadados: {
      statusAnterior: aplicado.statusAnterior,
      statusNovo: aplicado.statusNovo,
      respostaId,
    },
  })

  if (aplicado.abriuSubstituicao) {
    await registrarLogAutomacao({
      audienciaId: aplicado.audienciaId,
      origem: 'WEBHOOK',
      evento: 'SUBSTITUICAO_ABERTA',
      etapa: tipoMensagemRecebida,
      status: 'SUCESSO',
      mensagem: 'Fluxo de substituicao iniciado',
      metadados: {
        respostaId,
        entrouEmSubstituicao: aplicado.entrouEmSubstituicao,
        substituicaoCriada: aplicado.substituicaoCriada,
      },
    })

    try {
      await dispararEscalonamentoSubstituicao(
        aplicado.audienciaId,
        `Entrada em substituicao via ${tipoMensagemRecebida}: ${regra.label}`,
        'WEBHOOK',
      )
    } catch (error) {
      await registrarLogAutomacao({
        audienciaId: aplicado.audienciaId,
        origem: 'WEBHOOK',
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

  let statusRetorno = aplicado.statusNovo
  if (tipoMensagemRecebida === 'RELATORIO_POS') {
    const resultadoFluxo = await processarFluxoRelatorioPos({
      audienciaId: aplicado.audienciaId,
      prepostoId: preposto.id,
      prepostoTelefone: preposto.telefoneWhatsapp,
      respostaId: regra.id,
      textoResposta,
      statusAnterior: aplicado.statusNovo,
    })
    statusRetorno = resultadoFluxo.statusAtual
  }

  // No fluxo de relatorio pos, a propria sequencia envia a proxima pergunta/confirmacao final.
  if (tipoMensagemRecebida === 'RELATORIO_POS') {
    return {
      ok: true,
      audienciaId: aplicado.audienciaId,
      prepostoId: preposto.id,
      respostaId,
      statusAnterior: aplicado.statusAnterior,
      statusNovo: statusRetorno,
    }
  }

  try {
    const respostaAutomatica = montarRespostaAutomaticaPreposto(regra.id, respostaEmReiteracao)
    const envio = await whatsapp.enviarMensagem({
      para: preposto.telefoneWhatsapp,
      texto: respostaAutomatica,
      audienciaId: aplicado.audienciaId,
      tipo: tipoMensagemRecebida,
    })

    await prisma.mensagem.create({
      data: {
        audienciaId: aplicado.audienciaId,
        prepostoId: preposto.id,
        tipo: tipoMensagemRecebida,
        direcao: 'ENVIADA',
        conteudo: respostaAutomatica,
        statusEnvio: 'ENVIADA',
        whatsappMessageId: envio.providerMessageId ?? null,
      },
    })
  } catch (error) {
    await registrarLogAutomacao({
      audienciaId: aplicado.audienciaId,
      origem: 'WEBHOOK',
      evento: 'ERRO',
      etapa: tipoMensagemRecebida,
      status: 'ERRO',
      mensagem: 'Falha ao enviar resposta automatica ao preposto',
      metadados: {
        erro: error instanceof Error ? error.message : String(error),
      },
    })
  }

  if (interromperOrquestracaoEfetivo) {
    try {
      await removerOrquestracaoAudiencia(aplicado.audienciaId)
    } catch (error) {
      console.error('[webhook-whatsapp] falha ao remover jobs de orquestracao', {
        audienciaId: aplicado.audienciaId,
        erro: error instanceof Error ? error.message : String(error),
      })
    }
  }

  return {
    ok: true,
    audienciaId: aplicado.audienciaId,
    prepostoId: preposto.id,
    respostaId,
    statusAnterior: aplicado.statusAnterior,
    statusNovo: statusRetorno,
  }
}

async function processarRespostaContatoParceiro(params: {
  contato: ContatoParceiroResumo
  messageIdEntrada?: string
  buttonId?: string
  textoResposta?: string
  mensagemReferenciaId?: string
}): Promise<ResultadoWebhookWhatsApp> {
  const contexto = await buscarContextoContatoEscalonamento(
    params.contato.id,
    params.mensagemReferenciaId,
  )

  if (!contexto) {
    return {
      ok: true,
      ignored: 'RESPOSTA_NAO_MAPEADA',
      detalhe: params.textoResposta ?? params.buttonId ?? undefined,
    }
  }

  if (params.messageIdEntrada) {
    const duplicada = await prisma.mensagem.findFirst({
      where: {
        contatoParceiroId: params.contato.id,
        direcao: 'RECEBIDA',
        whatsappMessageId: params.messageIdEntrada,
      },
      select: { id: true },
    })
    if (duplicada) {
      return {
        ok: true,
        ignored: 'MENSAGEM_DUPLICADA',
        audienciaId: contexto.audienciaId,
      }
    }
  }

  const codigo = normalizarCodigo(params.buttonId)
  const textoOriginal = (params.textoResposta ?? '').trim()
  if (!codigo && !textoOriginal) {
    return {
      ok: true,
      audienciaId: contexto.audienciaId,
      ignored: 'RESPOSTA_SEM_CONTEUDO',
    }
  }
  const origemContato: 'VISEU' | 'PARCEIRO' =
    normalizarTexto(params.contato.parceiro.nome) === normalizarTexto(env.PARCEIRO_INTERNO_NOME)
      ? 'VISEU'
      : 'PARCEIRO'
  const tipoMensagemContexto: TipoMensagem = contexto.tipo
  const estadoColeta = lerEstadoColetaSubstituto(contexto.observacao)
  if (estadoColeta && pareceMensagemSistemaSubstituicao(textoOriginal)) {
    return {
      ok: true,
      audienciaId: contexto.audienciaId,
      ignored: 'MENSAGEM_SISTEMA_IGNORADA',
    }
  }

  if (codigo === 'INDICAR_NOVO_PREPOSTO') {
    await registrarMensagemContatoRecebida({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      tipo: tipoMensagemContexto,
      conteudo: textoOriginal || 'Indicar novo preposto',
      respostaBotao: 'INDICAR_NOVO_PREPOSTO',
      whatsappMessageId: params.messageIdEntrada ?? null,
    })

    await enviarMensagemContato({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      telefone: params.contato.telefoneWhatsapp,
      tipo: 'ESCALONAMENTO',
      texto: 'Perfeito. Informe o *nome completo* do novo preposto.',
      observacao: OBS_ETAPA_SUBSTITUTO_NOME,
    })

    return {
      ok: true,
      audienciaId: contexto.audienciaId,
      ignored: 'AGUARDANDO_DADOS_SUBSTITUTO',
    }
  }

  if (origemContato === 'VISEU') {
    await registrarMensagemContatoRecebida({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      tipo: tipoMensagemContexto,
      conteudo: textoOriginal || params.buttonId || 'Contato recebido',
      respostaBotao: codigo || undefined,
      whatsappMessageId: params.messageIdEntrada ?? null,
    })

    await enviarMensagemContato({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      telefone: params.contato.telefoneWhatsapp,
      tipo: 'SUBSTITUICAO_AVISO',
      texto: 'Para indicar substituicao via Viseu, utilize o botao de acesso ao Hub enviado anteriormente.',
    })

    return {
      ok: true,
      audienciaId: contexto.audienciaId,
      ignored: 'USAR_HUB_VISEU',
    }
  }

  if (estadoColeta?.etapa === 'NOME') {
    const nome = extrairNomeCompletoSubstituto(textoOriginal)
    await registrarMensagemContatoRecebida({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      tipo: tipoMensagemContexto,
      conteudo: textoOriginal || params.buttonId || 'Mensagem sem conteudo',
      respostaBotao: codigo || undefined,
      whatsappMessageId: params.messageIdEntrada ?? null,
    })

    if (!nome) {
      await enviarMensagemContato({
        audienciaId: contexto.audienciaId,
        contatoParceiroId: params.contato.id,
        telefone: params.contato.telefoneWhatsapp,
        tipo: 'ESCALONAMENTO',
        texto: 'Nao consegui validar o nome. Envie o *nome completo* do substituto.',
        observacao: OBS_ETAPA_SUBSTITUTO_NOME,
      })
      return {
        ok: true,
        audienciaId: contexto.audienciaId,
        ignored: 'NOME_SUBSTITUTO_INVALIDO',
      }
    }

    await enviarMensagemContato({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      telefone: params.contato.telefoneWhatsapp,
      tipo: 'ESCALONAMENTO',
      texto: 'Agora informe o *telefone* no formato *(DDD) numero*.',
      observacao: montarObservacaoEtapaTelefone(nome),
    })

    return {
      ok: true,
      audienciaId: contexto.audienciaId,
      ignored: 'AGUARDANDO_TELEFONE_SUBSTITUTO',
    }
  }

  if (estadoColeta?.etapa === 'TELEFONE') {
    const telefoneSubstituto = extrairTelefoneSubstituto(textoOriginal)
    await registrarMensagemContatoRecebida({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      tipo: tipoMensagemContexto,
      conteudo: textoOriginal || params.buttonId || 'Mensagem sem conteudo',
      respostaBotao: codigo || undefined,
      whatsappMessageId: params.messageIdEntrada ?? null,
    })

    if (!telefoneSubstituto) {
      await enviarMensagemContato({
        audienciaId: contexto.audienciaId,
        contatoParceiroId: params.contato.id,
        telefone: params.contato.telefoneWhatsapp,
        tipo: 'ESCALONAMENTO',
        texto: 'Telefone invalido. Envie no formato *(DDD) numero*.',
        observacao: montarObservacaoEtapaTelefone(estadoColeta.nome),
      })
      return {
        ok: true,
        audienciaId: contexto.audienciaId,
        ignored: 'TELEFONE_SUBSTITUTO_INVALIDO',
      }
    }

    const resultado = await resolverSubstituicaoPorContato({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      nomeSubstituto: estadoColeta.nome,
      telefoneSubstituto,
      mensagemOriginal: `${estadoColeta.nome} - ${telefoneSubstituto}`,
      origem: origemContato,
      whatsappMessageId: params.messageIdEntrada ?? null,
    })

    if (!resultado.ok) {
      if (
        resultado.motivo === 'SUBSTITUICAO_JA_RESOLVIDA' &&
        resultado.prepostoNome &&
        resultado.prepostoTelefone
      ) {
        await enviarMensagemContato({
          audienciaId: contexto.audienciaId,
          contatoParceiroId: params.contato.id,
          telefone: params.contato.telefoneWhatsapp,
          tipo: 'ESCALONAMENTO',
          texto: `Esta substituicao ja foi concluida. Novo preposto: ${resultado.prepostoNome} - ${resultado.prepostoTelefone}.`,
        })
        return {
          ok: true,
          audienciaId: contexto.audienciaId,
          ignored: 'SUBSTITUICAO_JA_RESOLVIDA',
        }
      }

      await enviarMensagemContato({
        audienciaId: contexto.audienciaId,
        contatoParceiroId: params.contato.id,
        telefone: params.contato.telefoneWhatsapp,
        tipo: 'ESCALONAMENTO',
        texto: 'Nao foi possivel aplicar a substituicao agora. Verifique no Hub se o caso ja foi resolvido.',
      })
      return {
        ok: true,
        audienciaId: contexto.audienciaId,
        ignored: resultado.motivo ?? 'FALHA_SUBSTITUICAO',
      }
    }

    await notificarSubstituicaoRealizada({
      audienciaId: contexto.audienciaId,
      origem: origemContato,
      novoPrepostoNome: resultado.prepostoNome ?? estadoColeta.nome,
      novoPrepostoTelefone: resultado.prepostoTelefone ?? telefoneSubstituto,
      origemEvento: 'WEBHOOK',
    })

    await enviarMensagemContato({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      telefone: params.contato.telefoneWhatsapp,
      tipo: 'ESCALONAMENTO',
      texto: `Substituicao registrada com sucesso. Novo preposto: ${resultado.prepostoNome} - ${resultado.prepostoTelefone}.`,
    })

    return {
      ok: true,
      audienciaId: contexto.audienciaId,
      statusNovo: 'AGENDADA',
    }
  }

  const dadosSubstituto = extrairDadosNovoPreposto(textoOriginal)
  if (!dadosSubstituto) {
    await registrarMensagemContatoRecebida({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      tipo: tipoMensagemContexto,
      conteudo: textoOriginal || params.buttonId || 'Mensagem sem formato',
      respostaBotao: codigo || undefined,
      whatsappMessageId: params.messageIdEntrada ?? null,
    })
    await enviarMensagemContato({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      telefone: params.contato.telefoneWhatsapp,
      tipo: 'ESCALONAMENTO',
      texto: 'Para indicar substituto, clique em *Indicar novo preposto* e siga as etapas de nome e telefone.',
    })
    return {
      ok: true,
      audienciaId: contexto.audienciaId,
      ignored: 'FORMATO_SUBSTITUTO_INVALIDO',
    }
  }

  const resultado = await resolverSubstituicaoPorContato({
    audienciaId: contexto.audienciaId,
    contatoParceiroId: params.contato.id,
    nomeSubstituto: dadosSubstituto.nome,
    telefoneSubstituto: dadosSubstituto.telefone,
    mensagemOriginal: textoOriginal,
    origem: origemContato,
    whatsappMessageId: params.messageIdEntrada ?? null,
  })

  if (!resultado.ok) {
    if (
      resultado.motivo === 'SUBSTITUICAO_JA_RESOLVIDA' &&
      resultado.prepostoNome &&
      resultado.prepostoTelefone
    ) {
      await enviarMensagemContato({
        audienciaId: contexto.audienciaId,
        contatoParceiroId: params.contato.id,
        telefone: params.contato.telefoneWhatsapp,
        tipo: 'ESCALONAMENTO',
        texto: `Esta substituicao ja foi concluida. Novo preposto: ${resultado.prepostoNome} - ${resultado.prepostoTelefone}.`,
      })
      return {
        ok: true,
        audienciaId: contexto.audienciaId,
        ignored: 'SUBSTITUICAO_JA_RESOLVIDA',
      }
    }

    await enviarMensagemContato({
      audienciaId: contexto.audienciaId,
      contatoParceiroId: params.contato.id,
      telefone: params.contato.telefoneWhatsapp,
      tipo: 'ESCALONAMENTO',
      texto: 'Nao foi possivel aplicar a substituicao agora. Verifique no Hub se o caso ja foi resolvido.',
    })
    return {
      ok: true,
      audienciaId: contexto.audienciaId,
      ignored: resultado.motivo ?? 'FALHA_SUBSTITUICAO',
    }
  }

  await notificarSubstituicaoRealizada({
    audienciaId: contexto.audienciaId,
    origem: origemContato,
    novoPrepostoNome: resultado.prepostoNome ?? dadosSubstituto.nome,
    novoPrepostoTelefone: resultado.prepostoTelefone ?? dadosSubstituto.telefone,
    origemEvento: 'WEBHOOK',
  })

  await enviarMensagemContato({
    audienciaId: contexto.audienciaId,
    contatoParceiroId: params.contato.id,
    telefone: params.contato.telefoneWhatsapp,
    tipo: 'ESCALONAMENTO',
    texto: `Substituicao registrada com sucesso. Novo preposto: ${resultado.prepostoNome} - ${resultado.prepostoTelefone}.`,
  })

  return {
    ok: true,
    audienciaId: contexto.audienciaId,
    statusNovo: 'AGENDADA',
  }
}

async function buscarContextoMensagem(prepostoId: string, mensagemReferenciaId?: string) {
  if (mensagemReferenciaId) {
    const porId = await prisma.mensagem.findFirst({
      where: {
        prepostoId,
        direcao: 'ENVIADA',
        whatsappMessageId: mensagemReferenciaId,
      },
      select: { audienciaId: true, tipo: true, conteudo: true },
      orderBy: { createdAt: 'desc' },
    })
    if (porId && TIPOS_INTERATIVOS.includes(porId.tipo)) return porId
  }

  return prisma.mensagem.findFirst({
    where: {
      prepostoId,
      direcao: 'ENVIADA',
      tipo: { in: TIPOS_INTERATIVOS },
      audiencia: {
        status: { notIn: ['CONCLUIDA', 'CANCELADA'] },
      },
    },
    select: { audienciaId: true, tipo: true, conteudo: true },
    orderBy: { createdAt: 'desc' },
  })
}

async function buscarContextoRelatorioPendente(prepostoId: string) {
  return prisma.mensagem.findFirst({
    where: {
      prepostoId,
      direcao: 'ENVIADA',
      tipo: 'RELATORIO_POS',
      audiencia: {
        status: 'RELATORIO_PENDENTE',
      },
    },
    select: { audienciaId: true, tipo: true, conteudo: true },
    orderBy: { createdAt: 'desc' },
  })
}

async function obterTipoContextoDaAudiencia(params: {
  prepostoId: string
  audienciaId: string
  mensagemReferenciaId?: string
}) {
  if (params.mensagemReferenciaId) {
    const porReferencia = await prisma.mensagem.findFirst({
      where: {
        prepostoId: params.prepostoId,
        audienciaId: params.audienciaId,
        direcao: 'ENVIADA',
        whatsappMessageId: params.mensagemReferenciaId,
      },
      select: { tipo: true },
      orderBy: { createdAt: 'desc' },
    })
    if (porReferencia && TIPOS_INTERATIVOS.includes(porReferencia.tipo)) {
      return porReferencia.tipo
    }
  }

  const ultimaInterativaDaAudiencia = await prisma.mensagem.findFirst({
    where: {
      prepostoId: params.prepostoId,
      audienciaId: params.audienciaId,
      direcao: 'ENVIADA',
      tipo: { in: TIPOS_INTERATIVOS },
    },
    select: { tipo: true },
    orderBy: { createdAt: 'desc' },
  })

  return ultimaInterativaDaAudiencia?.tipo
}

async function resolverAudienciaAlvo(
  prepostoId: string,
  regra: RegraResposta,
  audienciaIdContexto?: string,
) {
  if (audienciaIdContexto) {
    const daConversa = await prisma.audiencia.findFirst({
      where: {
        id: audienciaIdContexto,
        prepostoId,
        status: { in: STATUS_VALIDOS_POR_RESPOSTA[regra.id] },
      },
      select: { id: true },
    })
    if (daConversa) return daConversa
  }

  const tiposMensagem = new Set<TipoMensagem>([regra.tipoMensagem])
  if (regra.tipoMensagem === 'CONFIRMACAO_D1') {
    tiposMensagem.add('REITERACAO_H1H30')
  }

  const porTipo = await prisma.mensagem.findFirst({
    where: {
      prepostoId,
      direcao: 'ENVIADA',
      tipo: { in: Array.from(tiposMensagem) },
      audiencia: {
        status: { in: STATUS_VALIDOS_POR_RESPOSTA[regra.id] },
      },
    },
    select: { audienciaId: true },
    orderBy: { createdAt: 'desc' },
  })
  if (porTipo) return { id: porTipo.audienciaId }

  return prisma.audiencia.findFirst({
    where: {
      prepostoId,
      status: { in: STATUS_VALIDOS_POR_RESPOSTA[regra.id] },
    },
    select: { id: true },
    orderBy: [{ data: 'asc' }, { hora: 'asc' }],
  })
}

interface FluxoRelatorioPosParams {
  audienciaId: string
  prepostoId: string
  prepostoTelefone: string
  respostaId: RespostaId
  textoResposta: string | undefined
  statusAnterior: StatusAudiencia
}

async function processarFluxoRelatorioPos(params: FluxoRelatorioPosParams) {
  const updateRelatorio = montarUpdateRelatorioPos(params.respostaId, params.textoResposta)
  if (Object.keys(updateRelatorio).length > 0) {
    await prisma.relatorioAudiencia.upsert({
      where: { audienciaId: params.audienciaId },
      update: updateRelatorio,
      create: {
        audienciaId: params.audienciaId,
        ...updateRelatorio,
      },
    })
  }

  const relatorioAtual = await prisma.relatorioAudiencia.findUnique({
    where: { audienciaId: params.audienciaId },
    select: {
      audienciaOcorreu: true,
      resultado: true,
      advogadoPresente: true,
      advogadoDominioCaso: true,
      problemaRelevante: true,
      relato: true,
    },
  })

  const proximaPergunta = obterProximaPerguntaRelatorio(relatorioAtual)
  if (proximaPergunta) {
    await enviarMensagemRelatorioPos({
      audienciaId: params.audienciaId,
      prepostoId: params.prepostoId,
      prepostoTelefone: params.prepostoTelefone,
      texto: proximaPergunta.texto,
      buttons: proximaPergunta.buttons,
    })
    return { statusAtual: 'RELATORIO_PENDENTE' as StatusAudiencia }
  }

  if (params.statusAnterior !== 'CONCLUIDA') {
    await prisma.audiencia.update({
      where: { id: params.audienciaId },
      data: { status: 'CONCLUIDA' },
    })
    await prisma.historicoStatus.create({
      data: {
        audienciaId: params.audienciaId,
        statusAnterior: params.statusAnterior,
        statusNovo: 'CONCLUIDA',
        motivo: 'Relatorio pos-audiencia concluido via WhatsApp',
        atualizadoPor: 'webhook-whatsapp',
      },
    })
  }

  await enviarMensagemRelatorioPos({
    audienciaId: params.audienciaId,
    prepostoId: params.prepostoId,
    prepostoTelefone: params.prepostoTelefone,
    texto: 'Obrigado. Relatorio pos-audiencia finalizado com sucesso.',
  })

  try {
    await removerOrquestracaoAudiencia(params.audienciaId)
  } catch (error) {
    console.error('[webhook-whatsapp] falha ao remover jobs apos conclusao do relatorio', {
      audienciaId: params.audienciaId,
      erro: error instanceof Error ? error.message : String(error),
    })
  }

  return { statusAtual: 'CONCLUIDA' as StatusAudiencia }
}

function montarUpdateRelatorioPos(respostaId: RespostaId, textoResposta?: string) {
  if (respostaId === 'AUDIENCIA_SIM') return { audienciaOcorreu: 'SIM' as const }
  if (respostaId === 'AUDIENCIA_NAO') return { audienciaOcorreu: 'NAO' as const }
  if (respostaId === 'AUDIENCIA_REMARCADA') return { audienciaOcorreu: 'REMARCADA' as const }
  if (respostaId === 'RESULTADO_ACORDO') return { resultado: 'ACORDO' as const }
  if (respostaId === 'RESULTADO_SEM_ACORDO') return { resultado: 'SEM_ACORDO' as const }
  if (respostaId === 'RESULTADO_AUSENCIA') return { resultado: 'AUSENCIA' as const }
  if (respostaId === 'RESULTADO_REDESIGNADA') return { resultado: 'REDESIGNADA' as const }
  if (respostaId === 'ADVOGADO_PRESENTE_SIM') return { advogadoPresente: true }
  if (respostaId === 'ADVOGADO_PRESENTE_NAO') return { advogadoPresente: false }
  if (respostaId === 'ADVOGADO_DOMINIO_SIM') return { advogadoDominioCaso: true }
  if (respostaId === 'ADVOGADO_DOMINIO_NAO') return { advogadoDominioCaso: false }
  if (respostaId === 'PROBLEMA_RELEVANTE_SIM') return { problemaRelevante: true }
  if (respostaId === 'PROBLEMA_RELEVANTE_NAO') return { problemaRelevante: false }
  if (respostaId === 'RELATORIO_OBSERVACAO') {
    const relato = (textoResposta ?? '').trim()
    return { relato: relato || 'Sem observacoes' }
  }
  return {}
}

function obterProximaPerguntaRelatorio(
  relatorio:
    | {
        audienciaOcorreu: 'SIM' | 'NAO' | 'REMARCADA' | null
        resultado: 'ACORDO' | 'SEM_ACORDO' | 'AUSENCIA' | 'REDESIGNADA' | null
        advogadoPresente: boolean | null
        advogadoDominioCaso: boolean | null
        problemaRelevante: boolean | null
        relato: string | null
      }
    | null,
) {
  if (!relatorio || !relatorio.audienciaOcorreu) {
    return {
      texto: 'Pergunta 1/6: A audiencia ocorreu?',
      buttons: [
        { id: 'AUDIENCIA_SIM', label: 'Sim, ocorreu' },
        { id: 'AUDIENCIA_NAO', label: 'Nao ocorreu' },
        { id: 'AUDIENCIA_REMARCADA', label: 'Remarcada' },
      ],
    }
  }

  if (!relatorio.resultado) {
    return {
      texto: 'Pergunta 2/6: Qual foi o resultado?',
      buttons: [
        { id: 'RESULTADO_ACORDO', label: 'Acordo' },
        { id: 'RESULTADO_SEM_ACORDO', label: 'Sem acordo' },
        { id: 'RESULTADO_AUSENCIA', label: 'Encerrada por ausencia' },
        { id: 'RESULTADO_REDESIGNADA', label: 'Redesignada' },
      ],
    }
  }

  if (typeof relatorio.advogadoPresente !== 'boolean') {
    return {
      texto: 'Pergunta 3/6: O advogado estava presente no horario?',
      buttons: [
        { id: 'ADVOGADO_PRESENTE_SIM', label: 'Sim' },
        { id: 'ADVOGADO_PRESENTE_NAO', label: 'Nao' },
      ],
    }
  }

  if (typeof relatorio.advogadoDominioCaso !== 'boolean') {
    return {
      texto: 'Pergunta 4/6: O advogado demonstrou dominio minimo do caso?',
      buttons: [
        { id: 'ADVOGADO_DOMINIO_SIM', label: 'Sim' },
        { id: 'ADVOGADO_DOMINIO_NAO', label: 'Nao' },
      ],
    }
  }

  if (typeof relatorio.problemaRelevante !== 'boolean') {
    return {
      texto: 'Pergunta 5/6: Houve algum problema relevante?',
      buttons: [
        { id: 'PROBLEMA_RELEVANTE_SIM', label: 'Sim' },
        { id: 'PROBLEMA_RELEVANTE_NAO', label: 'Nao' },
      ],
    }
  }

  if (!relatorio.relato || !relatorio.relato.trim()) {
    return {
      texto: 'Pergunta 6/6: Deixe uma observacao curta sobre o que aconteceu. Se nao houver, responda: Sem observacoes.',
    }
  }

  return null
}

async function enviarMensagemRelatorioPos(params: {
  audienciaId: string
  prepostoId: string
  prepostoTelefone: string
  texto: string
  buttons?: Array<{ id: string; label: string }>
}) {
  const envio = await whatsapp.enviarMensagem({
    para: params.prepostoTelefone,
    texto: params.texto,
    audienciaId: params.audienciaId,
    tipo: 'RELATORIO_POS',
    buttons: params.buttons,
  })

  await prisma.mensagem.create({
    data: {
      audienciaId: params.audienciaId,
      prepostoId: params.prepostoId,
      tipo: 'RELATORIO_POS',
      direcao: 'ENVIADA',
      conteudo: params.texto,
      statusEnvio: 'ENVIADA',
      whatsappMessageId: envio.providerMessageId ?? null,
    },
  })

  await registrarLogAutomacao({
    audienciaId: params.audienciaId,
    origem: 'WEBHOOK',
    evento: 'DISPARO',
    etapa: 'RELATORIO_POS',
    status: 'SUCESSO',
    mensagem: 'Pergunta do relatorio pos-audiencia enviada',
  })
}

function resolverResposta(
  buttonId: string | undefined,
  textoResposta: string | undefined,
  tipoContexto?: TipoMensagem,
  conteudoContexto?: string,
): RespostaId | null {
  const codigo = normalizarCodigo(buttonId)
  if (codigo && codigo in RESPOSTAS) return codigo as RespostaId

  const texto = normalizarTexto(textoResposta)
  if (!texto) return null

  if (texto === 'sim, confirmo' || texto === 'sim confirmo' || texto === 'confirmo') return 'CONFIRMO'
  if (texto === 'nao, nao posso' || texto === 'nao nao posso' || texto === 'nao posso')
    return 'NAO_POSSO'
  if (texto === 'estou a caminho') return 'ESTOU_A_CAMINHO'
  if (texto === 'ja cheguei') return 'JA_CHEGUEI'
  if (texto === 'nao conseguirei ir' || texto === 'estou com problema') return 'ESTOU_COM_PROBLEMA'
  if (texto === 'sim, ocorreu' || texto === 'sim ocorreu') return 'AUDIENCIA_SIM'
  if (texto === 'nao ocorreu') return 'AUDIENCIA_NAO'
  if (texto === 'foi remarcada') return 'AUDIENCIA_REMARCADA'

  const opcao = parseInt(texto, 10)
  if (!Number.isNaN(opcao) && tipoContexto && opcao > 0) {
    if (tipoContexto === 'RELATORIO_POS') {
      const pergunta = identificarPerguntaRelatorioPorConteudo(conteudoContexto)
      const respostaPorPergunta = respostaRelatorioPorOpcao(pergunta, opcao)
      if (respostaPorPergunta) return respostaPorPergunta
      return null
    }

    const fallback = FALLBACK_NUMERICO[tipoContexto]
    const resposta = fallback?.[opcao - 1]
    if (resposta) return resposta
  }

  if (tipoContexto === 'CONFIRMACAO_D1' || tipoContexto === 'REITERACAO_H1H30') {
    if (texto.includes('nao')) return 'NAO_POSSO'
    if (texto.includes('confirm') || texto.includes('sim')) return 'CONFIRMO'
  }

  if (tipoContexto === 'CHECK_IN') {
    if (texto.includes('problema') || texto.includes('nao consegu')) return 'ESTOU_COM_PROBLEMA'
    if (texto.includes('cheguei')) return 'JA_CHEGUEI'
    if (texto.includes('caminho')) return 'ESTOU_A_CAMINHO'
  }

  if (tipoContexto === 'RELATORIO_POS') {
    const pergunta = identificarPerguntaRelatorioPorConteudo(conteudoContexto)

    if (pergunta === 'Q1') {
      if (texto === 'sim, ocorreu' || texto === 'sim ocorreu' || texto === 'sim') return 'AUDIENCIA_SIM'
      if (texto === 'nao ocorreu' || texto === 'nao') return 'AUDIENCIA_NAO'
      if (texto === 'foi remarcada' || texto === 'remarcada') return 'AUDIENCIA_REMARCADA'
      return null
    }

    if (pergunta === 'Q2') {
      if (texto === 'acordo') return 'RESULTADO_ACORDO'
      if (texto === 'sem acordo') return 'RESULTADO_SEM_ACORDO'
      if (texto === 'encerrada por ausencia' || texto === 'ausencia') return 'RESULTADO_AUSENCIA'
      if (texto === 'redesignada') return 'RESULTADO_REDESIGNADA'
      return null
    }

    if (pergunta === 'Q3') {
      if (texto === 'sim') return 'ADVOGADO_PRESENTE_SIM'
      if (texto === 'nao') return 'ADVOGADO_PRESENTE_NAO'
      return null
    }

    if (pergunta === 'Q4') {
      if (texto === 'sim') return 'ADVOGADO_DOMINIO_SIM'
      if (texto === 'nao') return 'ADVOGADO_DOMINIO_NAO'
      return null
    }

    if (pergunta === 'Q5') {
      if (texto === 'sim') return 'PROBLEMA_RELEVANTE_SIM'
      if (texto === 'nao') return 'PROBLEMA_RELEVANTE_NAO'
      return null
    }

    if (pergunta === 'Q6') {
      return 'RELATORIO_OBSERVACAO'
    }
  }

  return null
}

type PerguntaRelatorioCodigo = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5' | 'Q6'

function identificarPerguntaRelatorioPorConteudo(conteudoContexto?: string): PerguntaRelatorioCodigo {
  const texto = normalizarTexto(conteudoContexto)
  if (texto.includes('pergunta 2 6')) return 'Q2'
  if (texto.includes('pergunta 3 6')) return 'Q3'
  if (texto.includes('pergunta 4 6')) return 'Q4'
  if (texto.includes('pergunta 5 6')) return 'Q5'
  if (texto.includes('pergunta 6 6')) return 'Q6'
  return 'Q1'
}

function respostaRelatorioPorOpcao(
  pergunta: PerguntaRelatorioCodigo,
  opcao: number,
): RespostaId | null {
  if (pergunta === 'Q1') {
    return (
      (['AUDIENCIA_SIM', 'AUDIENCIA_NAO', 'AUDIENCIA_REMARCADA'][opcao - 1] as
        | RespostaId
        | undefined) ?? null
    )
  }

  if (pergunta === 'Q2') {
    return (
      ([
        'RESULTADO_ACORDO',
        'RESULTADO_SEM_ACORDO',
        'RESULTADO_AUSENCIA',
        'RESULTADO_REDESIGNADA',
      ][opcao - 1] as RespostaId | undefined) ?? null
    )
  }

  if (pergunta === 'Q3') {
    return (
      (['ADVOGADO_PRESENTE_SIM', 'ADVOGADO_PRESENTE_NAO'][opcao - 1] as RespostaId | undefined) ??
      null
    )
  }

  if (pergunta === 'Q4') {
    return (
      (['ADVOGADO_DOMINIO_SIM', 'ADVOGADO_DOMINIO_NAO'][opcao - 1] as RespostaId | undefined) ??
      null
    )
  }

  if (pergunta === 'Q5') {
    return (
      (['PROBLEMA_RELEVANTE_SIM', 'PROBLEMA_RELEVANTE_NAO'][opcao - 1] as
        | RespostaId
        | undefined) ?? null
    )
  }

  return null
}

function podeTransicionarViaResposta(statusAtual: StatusAudiencia, statusNovo: StatusAudiencia) {
  if (statusAtual === 'CANCELADA' || statusAtual === 'CONCLUIDA') return false
  if (statusAtual === statusNovo) return false

  if (statusNovo === 'CONFIRMADA') {
    return ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CHECK_IN_PENDENTE', 'NAO_POSSO'].includes(statusAtual)
  }

  if (statusNovo === 'NAO_POSSO') {
    return ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE'].includes(statusAtual)
  }

  if (statusNovo === 'EM_ANDAMENTO') {
    return ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE'].includes(statusAtual)
  }

  if (statusNovo === 'SUBSTITUICAO_NECESSARIA') {
    return [
      'IMPORTADA',
      'AGENDADA',
      'A_CONFIRMAR',
      'CONFIRMADA',
      'CHECK_IN_PENDENTE',
      'EM_ANDAMENTO',
      'NAO_POSSO',
    ].includes(statusAtual)
  }

  if (statusNovo === 'CONCLUIDA') {
    return ['A_CONFIRMAR', 'CONFIRMADA', 'CHECK_IN_PENDENTE', 'EM_ANDAMENTO', 'RELATORIO_PENDENTE', 'AGENDADA', 'IMPORTADA'].includes(
      statusAtual,
    )
  }

  if (statusNovo === 'AGENDADA') {
    return ['RELATORIO_PENDENTE', 'EM_ANDAMENTO', 'CHECK_IN_PENDENTE', 'CONFIRMADA', 'A_CONFIRMAR'].includes(
      statusAtual,
    )
  }

  return true
}

function montarObservacao(textoResposta: string | undefined, labelPadrao: string) {
  const texto = (textoResposta ?? '').trim()
  if (!texto) return null

  const normalizadoTexto = normalizarTexto(texto)
  const normalizadoLabel = normalizarTexto(labelPadrao)
  if (normalizadoTexto === normalizadoLabel) return null
  return texto
}

function asRecord(valor: unknown): Record<string, unknown> | null {
  return typeof valor === 'object' && valor !== null ? (valor as Record<string, unknown>) : null
}

function extrairFlagFromMe(payload: Record<string, unknown>) {
  const valor = lerCaminho(payload, ['fromMe'])
  if (typeof valor === 'boolean') return valor
  if (typeof valor === 'string') {
    const normalized = valor.trim().toLowerCase()
    if (normalized === 'true') return true
    if (normalized === 'false') return false
  }
  return undefined
}

function extrairPrimeiroValorString(
  payload: Record<string, unknown>,
  caminhos: string[][],
): string | undefined {
  for (const caminho of caminhos) {
    const valor = lerCaminho(payload, caminho)
    if (typeof valor === 'string' && valor.trim()) return valor.trim()
  }

  return undefined
}

function extrairValoresString(payload: Record<string, unknown>, caminhos: string[][]) {
  const valores: string[] = []
  const vistos = new Set<string>()

  for (const caminho of caminhos) {
    const valor = lerCaminho(payload, caminho)
    if (typeof valor !== 'string') continue

    const texto = valor.trim()
    if (!texto) continue
    if (vistos.has(texto)) continue

    vistos.add(texto)
    valores.push(texto)
  }

  return valores
}

function lerCaminho(payload: Record<string, unknown>, caminho: string[]) {
  let atual: unknown = payload

  for (const chave of caminho) {
    if (typeof atual !== 'object' || atual === null || !(chave in atual)) return undefined
    atual = (atual as Record<string, unknown>)[chave]
  }

  return atual
}

function gerarCandidatosTelefones(telefonesRaw: string[]) {
  const candidatos = new Set<string>()

  for (const telefoneRaw of telefonesRaw) {
    for (const candidato of gerarCandidatosTelefone(telefoneRaw)) {
      candidatos.add(candidato)
    }
  }

  return Array.from(candidatos)
}

function gerarCandidatosTelefone(telefoneRaw?: string) {
  if (!telefoneRaw) return []

  const semSufixo = telefoneRaw.split('@')[0] ?? telefoneRaw
  const digitos = semSufixo.replace(/\D/g, '')
  if (!digitos) return []

  const candidatos = new Set<string>()
  candidatos.add(digitos)

  if (digitos.startsWith('55') && digitos.length > 11) {
    candidatos.add(digitos.slice(2))
  }

  if (!digitos.startsWith('55')) {
    candidatos.add(`55${digitos}`)
  }

  return Array.from(candidatos)
}

function selecionarPrepostoPorPrioridade(
  prepostos: Array<{ id: string; nome: string; telefoneWhatsapp: string }>,
  candidatosTelefone: string[],
) {
  if (prepostos.length === 0) return null

  const porTelefone = new Map(prepostos.map((preposto) => [preposto.telefoneWhatsapp, preposto]))
  for (const candidato of candidatosTelefone) {
    const escolhido = porTelefone.get(candidato)
    if (escolhido) return escolhido
  }

  return prepostos[0] ?? null
}

function selecionarContatoPorPrioridade(
  contatos: ContatoParceiroResumo[],
  candidatosTelefone: string[],
) {
  if (contatos.length === 0) return null

  const porTelefone = new Map(contatos.map((contato) => [contato.telefoneWhatsapp, contato]))
  for (const candidato of candidatosTelefone) {
    const escolhido = porTelefone.get(candidato)
    if (escolhido) return escolhido
  }

  return contatos[0] ?? null
}

async function devePriorizarContatoParceiro(params: {
  contatoParceiroId: string
  mensagemReferenciaId?: string
  buttonId?: string
}) {
  const codigo = normalizarCodigo(params.buttonId)
  if (codigo === 'INDICAR_NOVO_PREPOSTO') return true

  if (params.mensagemReferenciaId) {
    const respostaEscalonamento = await prisma.mensagem.findFirst({
      where: {
        contatoParceiroId: params.contatoParceiroId,
        direcao: 'ENVIADA',
        whatsappMessageId: params.mensagemReferenciaId,
        tipo: { in: ['ESCALONAMENTO', 'SUBSTITUICAO_AVISO'] },
      },
      select: { id: true },
    })
    if (respostaEscalonamento) return true
  }

  const etapaAtiva = await prisma.mensagem.findFirst({
    where: {
      contatoParceiroId: params.contatoParceiroId,
      direcao: 'ENVIADA',
      tipo: { in: ['ESCALONAMENTO', 'SUBSTITUICAO_AVISO'] },
      observacao: {
        startsWith: 'ESCALONAMENTO_ETAPA:',
      },
      audiencia: {
        status: { in: ['SUBSTITUICAO_NECESSARIA', 'NAO_POSSO', 'SEM_RESPOSTA', 'A_CONFIRMAR'] },
      },
    },
    select: { id: true },
    orderBy: { createdAt: 'desc' },
  })

  return !!etapaAtiva
}

function normalizarCodigo(valor?: string) {
  if (!valor) return undefined
  return valor.trim().toUpperCase().replace(/\s+/g, '_')
}

function isEventoNaoRecebido(tipoEvento: string) {
  if (!tipoEvento) return false
  if (tipoEvento.includes('received')) return false
  return (
    tipoEvento.includes('send') ||
    tipoEvento.includes('status') ||
    tipoEvento.includes('delivery') ||
    tipoEvento.includes('ack')
  )
}

function normalizarTexto(valor?: string) {
  if (!valor) return ''
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extrairDadosNovoPreposto(textoOriginal?: string) {
  if (!textoOriginal) return null
  const texto = textoOriginal.trim()
  if (!texto) return null

  const matchTelefone = texto.match(/(\+?\d[\d()\s-]{7,}\d)/)
  if (!matchTelefone) return null

  const telefone = matchTelefone[1].replace(/\D/g, '')
  if (telefone.length < 10) return null

  const nome = texto
    .replace(matchTelefone[1], ' ')
    .replace(/(telefone|fone|celular|whatsapp)[:\s]*/gi, ' ')
    .replace(/[-|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (nome.length < 3) return null

  return { nome, telefone }
}

function extrairTelefoneSubstituto(textoOriginal?: string) {
  if (!textoOriginal) return null
  const matchTelefone = textoOriginal.match(/(\+?\d[\d()\s-]{7,}\d)/)
  if (!matchTelefone) return null
  const telefone = matchTelefone[1].replace(/\D/g, '')
  if (telefone.length < 10) return null
  return telefone
}

function extrairNomeCompletoSubstituto(textoOriginal?: string) {
  if (!textoOriginal) return null
  const nome = textoOriginal.replace(/\s+/g, ' ').trim()
  if (nome.length < 5) return null
  if (!nome.includes(' ')) return null
  return nome
}

function pareceMensagemSistemaSubstituicao(textoOriginal?: string) {
  const texto = normalizarTexto(textoOriginal)
  if (!texto) return false

  return (
    texto.includes('informe o nome completo do novo preposto') ||
    texto.includes('nao consegui validar o nome') ||
    texto.includes('agora informe o telefone') ||
    texto.includes('telefone invalido')
  )
}

function montarObservacaoEtapaTelefone(nome: string) {
  return `${OBS_ETAPA_SUBSTITUTO_TELEFONE}${encodeURIComponent(nome)}`
}

function lerEstadoColetaSubstituto(observacao?: string | null): EstadoColetaSubstituto | null {
  if (!observacao) return null
  if (observacao === OBS_ETAPA_SUBSTITUTO_NOME) return { etapa: 'NOME' }
  if (!observacao.startsWith(OBS_ETAPA_SUBSTITUTO_TELEFONE)) return null
  const nomeCodificado = observacao.slice(OBS_ETAPA_SUBSTITUTO_TELEFONE.length).trim()
  if (!nomeCodificado) return null
  try {
    const nome = decodeURIComponent(nomeCodificado).trim()
    if (!nome) return null
    return { etapa: 'TELEFONE', nome }
  } catch {
    return null
  }
}

function montarRespostaAutomaticaPreposto(respostaId: RespostaId, respostaEmReiteracao: boolean) {
  if (respostaId === 'CONFIRMO') {
    return 'Agradecemos a colaboracao. Ja iremos marcar sua visita na audiencia em nosso sistema.'
  }

  if (respostaId === 'NAO_POSSO') {
    if (respostaEmReiteracao) {
      return 'Entendemos que nao podera participar e agradecemos o retorno. Vamos iniciar o fluxo de substituicao e manter voce informado.'
    }

    return 'Entendemos que nao pode participar no momento e agradecemos. Enviaremos uma nova confirmacao mais proxima da audiencia.'
  }

  if (respostaId === 'ESTOU_A_CAMINHO' || respostaId === 'JA_CHEGUEI') {
    return 'Recebemos sua atualizacao de check-in. Obrigado pelo retorno.'
  }

  if (respostaId === 'ESTOU_COM_PROBLEMA') {
    return 'Entendemos o problema informado. Vamos iniciar o suporte para substituicao.'
  }

  if (respostaId === 'AUDIENCIA_REMARCADA') {
    return 'Obrigado pelo retorno. Ja vamos atualizar o sistema com a remarcacao.'
  }

  return 'Resposta recebida com sucesso. Obrigado pelo retorno.'
}

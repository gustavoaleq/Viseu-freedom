import { env } from '../config/env.js'
import { prisma } from '../config/database.js'
import { processarOrquestracaoAudiencia } from '../jobs/orquestracao.processor.js'
import type { TipoMensagem } from '../generated/prisma/client.js'
import { registrarLogAutomacao } from './automacao-log.service.js'
import { criarWhatsAppAdapter } from './whatsapp.adapter.js'

const whatsapp = criarWhatsAppAdapter()

const TIPOS_ESCALONAMENTO: TipoMensagem[] = ['SUBSTITUICAO_AVISO', 'ESCALONAMENTO']

interface DestinatarioEscalonamento {
  contatoId: string
  parceiroId: string
  nome: string
  telefoneWhatsapp: string
  role: 'VISEU' | 'PARCEIRO'
}

interface DadosAudienciaEscalonamento {
  id: string
  numeroProcesso: string
  data: Date
  hora: string
  local: string | null
  link: string | null
  parceiro: {
    id: string
    nome: string
    contatos: Array<{
      id: string
      parceiroId: string
      nome: string
      telefoneWhatsapp: string
      ordemEscalonamento: number
    }>
  }
  preposto: {
    id: string
    nome: string
    telefoneWhatsapp: string
  }
}

interface ResolverSubstituicaoParams {
  audienciaId: string
  contatoParceiroId: string
  nomeSubstituto: string
  telefoneSubstituto: string
  mensagemOriginal: string
  origem: 'VISEU' | 'PARCEIRO'
  whatsappMessageId?: string | null
}

interface ResultadoResolverSubstituicao {
  ok: boolean
  motivo?: 'AUDIENCIA_NAO_ENCONTRADA' | 'SUBSTITUICAO_JA_RESOLVIDA' | 'SEM_SUBSTITUICAO_ABERTA'
  audienciaId?: string
  prepostoId?: string
  prepostoNome?: string
  prepostoTelefone?: string
  origemResolucao?: 'VISEU' | 'PARCEIRO'
}

export async function dispararEscalonamentoSubstituicao(
  audienciaId: string,
  motivo: string,
  origem: 'WEBHOOK' | 'MANUAL' = 'WEBHOOK',
) {
  const audiencia = await carregarAudienciaEscalonamento(audienciaId)
  if (!audiencia) return { ok: false as const, reason: 'AUDIENCIA_NAO_ENCONTRADA' as const }

  const destinatarios = await obterDestinatariosEscalonamento(audiencia)
  if (destinatarios.length === 0) {
    await registrarLogAutomacao({
      audienciaId,
      origem,
      evento: 'DISPARO_IGNORADO',
      etapa: 'ESCALONAMENTO',
      status: 'IGNORADO',
      mensagem: 'Escalonamento ignorado: nenhum contato elegivel',
    })
    return { ok: false as const, reason: 'SEM_DESTINATARIOS' as const }
  }

  const linkHub = `${env.HUB_FRONTEND_URL.replace(/\/$/, '')}/audiencias/${audiencia.id}`
  const localOuLink = audiencia.local || audiencia.link || 'local a confirmar'
  const dataFmt = formatarDataPtBr(audiencia.data)
  const textoBase = [
    `*Substituicao necessaria* no processo *${audiencia.numeroProcesso}*`,
    `*Data/Hora:* ${dataFmt} as ${audiencia.hora}`,
    `*Parceiro:* ${audiencia.parceiro.nome}`,
    `*Local/Link:* ${localOuLink}`,
    '*Motivo:* Preposto nao conseguira comparecer.',
  ].join('\n')

  for (const destinatario of destinatarios) {
    try {
      const payload =
        destinatario.role === 'VISEU'
          ? {
              texto: textoBase,
              tipo: 'SUBSTITUICAO_AVISO' as const,
              buttons: [
                {
                  id: 'ABRIR_HUB_SUBSTITUICAO',
                  label: 'Indicar novo preposto',
                  type: 'URL' as const,
                  url: linkHub,
                },
              ],
            }
          : {
              texto: textoBase,
              tipo: 'ESCALONAMENTO' as const,
              buttons: [
                {
                  id: 'INDICAR_NOVO_PREPOSTO',
                  label: 'Indicar novo preposto',
                  type: 'REPLY' as const,
                },
              ],
            }

      const envio = await whatsapp.enviarMensagem({
        para: destinatario.telefoneWhatsapp,
        texto: payload.texto,
        audienciaId: audiencia.id,
        tipo: payload.tipo,
        buttons: payload.buttons,
      })

      await prisma.mensagem.create({
        data: {
          audienciaId: audiencia.id,
          contatoParceiroId: destinatario.contatoId,
          tipo: payload.tipo,
          direcao: 'ENVIADA',
          conteudo: payload.texto,
          statusEnvio: 'ENVIADA',
          whatsappMessageId: envio.providerMessageId ?? null,
        },
      })
    } catch (error) {
      await registrarLogAutomacao({
        audienciaId: audiencia.id,
        origem,
        evento: 'ERRO',
        etapa: 'ESCALONAMENTO',
        status: 'ERRO',
        mensagem: 'Falha ao enviar notificacao de substituicao',
        metadados: {
          contatoParceiroId: destinatario.contatoId,
          erro: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }

  await registrarLogAutomacao({
    audienciaId,
    origem,
    evento: 'DISPARO',
    etapa: 'ESCALONAMENTO',
    status: 'SUCESSO',
    mensagem: 'Escalonamento de substituicao enviado',
    metadados: {
      totalDestinatarios: destinatarios.length,
      motivoOriginal: motivo,
    },
  })

  return { ok: true as const, totalDestinatarios: destinatarios.length }
}

export async function buscarContextoContatoEscalonamento(
  contatoParceiroId: string,
  mensagemReferenciaId?: string,
) {
  if (mensagemReferenciaId) {
    const porId = await prisma.mensagem.findFirst({
      where: {
        contatoParceiroId,
        direcao: 'ENVIADA',
        whatsappMessageId: mensagemReferenciaId,
        tipo: { in: TIPOS_ESCALONAMENTO },
      },
      select: { audienciaId: true, tipo: true, conteudo: true, observacao: true },
      orderBy: { createdAt: 'desc' },
    })
    if (porId) return porId
  }

  return prisma.mensagem.findFirst({
    where: {
      contatoParceiroId,
      direcao: 'ENVIADA',
      tipo: { in: TIPOS_ESCALONAMENTO },
      audiencia: {
        status: { in: ['SUBSTITUICAO_NECESSARIA', 'NAO_POSSO', 'SEM_RESPOSTA', 'A_CONFIRMAR'] },
      },
    },
    select: { audienciaId: true, tipo: true, conteudo: true, observacao: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function registrarMensagemContatoRecebida(params: {
  audienciaId: string
  contatoParceiroId: string
  tipo: TipoMensagem
  conteudo: string
  respostaBotao?: string
  observacao?: string | null
  whatsappMessageId?: string | null
}) {
  await prisma.mensagem.create({
    data: {
      audienciaId: params.audienciaId,
      contatoParceiroId: params.contatoParceiroId,
      tipo: params.tipo,
      direcao: 'RECEBIDA',
      conteudo: params.conteudo,
      respostaBotao: params.respostaBotao ?? null,
      observacao: params.observacao ?? null,
      whatsappMessageId: params.whatsappMessageId ?? null,
      statusEnvio: 'LIDA',
    },
  })
}

export async function enviarMensagemContato(params: {
  audienciaId: string
  contatoParceiroId: string
  telefone: string
  tipo: TipoMensagem
  texto: string
  observacao?: string | null
  buttons?: Array<{
    id: string
    label: string
    type?: 'REPLY' | 'URL'
    url?: string
  }>
}) {
  const envio = await whatsapp.enviarMensagem({
    para: params.telefone,
    texto: params.texto,
    audienciaId: params.audienciaId,
    tipo: params.tipo,
    buttons: params.buttons,
  })

  await prisma.mensagem.create({
    data: {
      audienciaId: params.audienciaId,
      contatoParceiroId: params.contatoParceiroId,
      tipo: params.tipo,
      direcao: 'ENVIADA',
      conteudo: params.texto,
      observacao: params.observacao ?? null,
      statusEnvio: 'ENVIADA',
      whatsappMessageId: envio.providerMessageId ?? null,
    },
  })
}

export async function resolverSubstituicaoPorContato(
  params: ResolverSubstituicaoParams,
): Promise<ResultadoResolverSubstituicao> {
  const telefoneNormalizado = normalizarTelefone(params.telefoneSubstituto)
  const nomeNormalizado = params.nomeSubstituto.trim()

  if (telefoneNormalizado.length < 10 || nomeNormalizado.length < 3) {
    return { ok: false, motivo: 'SEM_SUBSTITUICAO_ABERTA' }
  }

  const resultado = await prisma.$transaction(async (tx) => {
    const audiencia = await tx.audiencia.findUnique({
      where: { id: params.audienciaId },
      select: { id: true, status: true, prepostoId: true, data: true, hora: true },
    })
    if (!audiencia) return { tipo: 'AUDIENCIA_NAO_ENCONTRADA' as const }

    const aberta = await tx.substituicao.findFirst({
      where: { audienciaId: params.audienciaId, status: 'ABERTA' },
      select: { id: true, motivo: true },
      orderBy: { createdAt: 'desc' },
    })

    if (!aberta) {
      const ultimaResolvida = await tx.substituicao.findFirst({
        where: { audienciaId: params.audienciaId, status: 'RESOLVIDA' },
        select: { prepostoNovoId: true },
        orderBy: { resolvidoEm: 'desc' },
      })
      if (ultimaResolvida?.prepostoNovoId) {
        const prepostoJaDefinido = await tx.preposto.findUnique({
          where: { id: ultimaResolvida.prepostoNovoId },
          select: { id: true, nome: true, telefoneWhatsapp: true },
        })
        if (prepostoJaDefinido) {
          return {
            tipo: 'SUBSTITUICAO_JA_RESOLVIDA' as const,
            audienciaId: params.audienciaId,
            preposto: prepostoJaDefinido,
          }
        }
      }

      return { tipo: 'SEM_SUBSTITUICAO_ABERTA' as const }
    }

    let preposto = await tx.preposto.findFirst({
      where: { telefoneWhatsapp: telefoneNormalizado },
      select: { id: true, nome: true, telefoneWhatsapp: true, ativo: true },
    })

    if (!preposto) {
      preposto = await tx.preposto.create({
        data: {
          nome: nomeNormalizado,
          telefoneWhatsapp: telefoneNormalizado,
          ativo: true,
        },
        select: { id: true, nome: true, telefoneWhatsapp: true, ativo: true },
      })
    } else {
      preposto = await tx.preposto.update({
        where: { id: preposto.id },
        data: {
          nome: nomeNormalizado,
          ativo: true,
        },
        select: { id: true, nome: true, telefoneWhatsapp: true, ativo: true },
      })
    }

    const atualizou = await tx.substituicao.updateMany({
      where: { id: aberta.id, status: 'ABERTA' },
      data: {
        status: 'RESOLVIDA',
        prepostoNovoId: preposto.id,
        resolvidoEm: new Date(),
        motivo: `${aberta.motivo} | Resolucao automatica por ${params.origem}: ${nomeNormalizado} (${telefoneNormalizado})`,
      },
    })

    if (atualizou.count === 0) {
      const resolvida = await tx.substituicao.findFirst({
        where: { audienciaId: params.audienciaId, status: 'RESOLVIDA' },
        select: { prepostoNovoId: true },
        orderBy: { resolvidoEm: 'desc' },
      })
      if (resolvida?.prepostoNovoId) {
        const prepostoDefinido = await tx.preposto.findUnique({
          where: { id: resolvida.prepostoNovoId },
          select: { id: true, nome: true, telefoneWhatsapp: true },
        })
        if (prepostoDefinido) {
          return {
            tipo: 'SUBSTITUICAO_JA_RESOLVIDA' as const,
            audienciaId: params.audienciaId,
            preposto: prepostoDefinido,
          }
        }
      }

      return { tipo: 'SEM_SUBSTITUICAO_ABERTA' as const }
    }

    await tx.audiencia.update({
      where: { id: params.audienciaId },
      data: {
        prepostoId: preposto.id,
        status: 'AGENDADA',
      },
    })

    await tx.historicoStatus.create({
      data: {
        audienciaId: params.audienciaId,
        statusAnterior: audiencia.status,
        statusNovo: 'AGENDADA',
        motivo: `Substituicao automatica por ${params.origem}: ${nomeNormalizado}`,
        atualizadoPor: 'automacao-substituicao',
      },
    })

    await tx.mensagem.create({
      data: {
        audienciaId: params.audienciaId,
        contatoParceiroId: params.contatoParceiroId,
        tipo: 'ESCALONAMENTO',
        direcao: 'RECEBIDA',
        conteudo: params.mensagemOriginal,
        observacao: `Indicacao recebida: ${nomeNormalizado} - ${telefoneNormalizado}`,
        whatsappMessageId: params.whatsappMessageId ?? null,
        statusEnvio: 'LIDA',
      },
    })

    return {
      tipo: 'RESOLVIDA' as const,
      audienciaId: params.audienciaId,
      preposto,
    }
  })

  if (resultado.tipo === 'AUDIENCIA_NAO_ENCONTRADA') {
    return { ok: false, motivo: 'AUDIENCIA_NAO_ENCONTRADA' }
  }
  if (resultado.tipo === 'SEM_SUBSTITUICAO_ABERTA') {
    return { ok: false, motivo: 'SEM_SUBSTITUICAO_ABERTA' }
  }
  if (resultado.tipo === 'SUBSTITUICAO_JA_RESOLVIDA') {
    return {
      ok: false,
      motivo: 'SUBSTITUICAO_JA_RESOLVIDA',
      audienciaId: resultado.audienciaId,
      prepostoId: resultado.preposto.id,
      prepostoNome: resultado.preposto.nome,
      prepostoTelefone: resultado.preposto.telefoneWhatsapp,
    }
  }

  await registrarLogAutomacao({
    audienciaId: params.audienciaId,
    origem: 'WEBHOOK',
    evento: 'RESPOSTA_CONFIRMADA',
    etapa: 'ESCALONAMENTO',
    status: 'SUCESSO',
    mensagem: 'Substituicao resolvida por contato',
    metadados: {
      origem: params.origem,
      prepostoId: resultado.preposto.id,
      prepostoNome: resultado.preposto.nome,
      prepostoTelefone: resultado.preposto.telefoneWhatsapp,
    },
  })

  try {
    await processarOrquestracaoAudiencia(
      'CONFIRMACAO_D1',
      params.audienciaId,
      'automacao-substituicao',
      {
        origem: 'MANUAL',
        forcar: true,
      },
    )
  } catch (error) {
    await registrarLogAutomacao({
      audienciaId: params.audienciaId,
      origem: 'WEBHOOK',
      evento: 'ERRO',
      etapa: 'CONFIRMACAO_D1',
      status: 'ERRO',
      mensagem: 'Falha ao disparar confirmacao para novo preposto',
      metadados: { erro: error instanceof Error ? error.message : String(error) },
    })
  }

  return {
    ok: true,
    audienciaId: params.audienciaId,
    prepostoId: resultado.preposto.id,
    prepostoNome: resultado.preposto.nome,
    prepostoTelefone: resultado.preposto.telefoneWhatsapp,
    origemResolucao: params.origem,
  }
}

export async function notificarSubstituicaoRealizada(params: {
  audienciaId: string
  origem: 'VISEU' | 'PARCEIRO'
  novoPrepostoNome: string
  novoPrepostoTelefone: string
  origemEvento: 'WEBHOOK' | 'MANUAL'
}) {
  const audiencia = await carregarAudienciaEscalonamento(params.audienciaId)
  if (!audiencia) return

  const destinatarios = await obterDestinatariosEscalonamento(audiencia)
  if (destinatarios.length === 0) return

  const origemLabel = params.origem === 'VISEU' ? 'Viseu' : 'Escritorio parceiro'
  const texto = `Substituicao realizada com sucesso.\nOrigem: ${origemLabel}\nNovo preposto: ${params.novoPrepostoNome} - ${params.novoPrepostoTelefone}.`

  for (const destinatario of destinatarios) {
    try {
      const envio = await whatsapp.enviarMensagem({
        para: destinatario.telefoneWhatsapp,
        texto,
        audienciaId: audiencia.id,
        tipo: 'SUBSTITUICAO_AVISO',
      })

      await prisma.mensagem.create({
        data: {
          audienciaId: audiencia.id,
          contatoParceiroId: destinatario.contatoId,
          tipo: 'SUBSTITUICAO_AVISO',
          direcao: 'ENVIADA',
          conteudo: texto,
          statusEnvio: 'ENVIADA',
          whatsappMessageId: envio.providerMessageId ?? null,
        },
      })
    } catch (error) {
      await registrarLogAutomacao({
        audienciaId: audiencia.id,
        origem: params.origemEvento,
        evento: 'ERRO',
        etapa: 'SUBSTITUICAO_AVISO',
        status: 'ERRO',
        mensagem: 'Falha ao notificar substituicao realizada',
        metadados: {
          contatoParceiroId: destinatario.contatoId,
          erro: error instanceof Error ? error.message : String(error),
        },
      })
    }
  }
}

function formatarDataPtBr(data: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: env.ORQ_TIMEZONE,
  }).format(data)
}

function normalizarTelefone(valor: string) {
  return valor.replace(/\D/g, '')
}

async function carregarAudienciaEscalonamento(
  audienciaId: string,
): Promise<DadosAudienciaEscalonamento | null> {
  return prisma.audiencia.findUnique({
    where: { id: audienciaId },
    select: {
      id: true,
      numeroProcesso: true,
      data: true,
      hora: true,
      local: true,
      link: true,
      parceiro: {
        select: {
          id: true,
          nome: true,
          contatos: {
            select: {
              id: true,
              parceiroId: true,
              nome: true,
              telefoneWhatsapp: true,
              ordemEscalonamento: true,
            },
            orderBy: [{ ordemEscalonamento: 'asc' }, { createdAt: 'asc' }],
          },
        },
      },
      preposto: {
        select: {
          id: true,
          nome: true,
          telefoneWhatsapp: true,
        },
      },
    },
  })
}

async function obterDestinatariosEscalonamento(audiencia: DadosAudienciaEscalonamento) {
  const parceiroInterno = await prisma.parceiro.findFirst({
    where: {
      nome: {
        equals: env.PARCEIRO_INTERNO_NOME,
        mode: 'insensitive',
      },
      ativo: true,
    },
    select: {
      id: true,
      contatos: {
        select: {
          id: true,
          parceiroId: true,
          nome: true,
          telefoneWhatsapp: true,
          ordemEscalonamento: true,
        },
        orderBy: [{ ordemEscalonamento: 'asc' }, { createdAt: 'asc' }],
      },
    },
  })

  const destinatarios: DestinatarioEscalonamento[] = []

  for (const contato of parceiroInterno?.contatos ?? []) {
    destinatarios.push({
      contatoId: contato.id,
      parceiroId: contato.parceiroId,
      nome: contato.nome,
      telefoneWhatsapp: contato.telefoneWhatsapp,
      role: 'VISEU',
    })
  }

  const contatoParceiroPrincipal = audiencia.parceiro.contatos[0]
  if (contatoParceiroPrincipal) {
    destinatarios.push({
      contatoId: contatoParceiroPrincipal.id,
      parceiroId: contatoParceiroPrincipal.parceiroId,
      nome: contatoParceiroPrincipal.nome,
      telefoneWhatsapp: contatoParceiroPrincipal.telefoneWhatsapp,
      role: 'PARCEIRO',
    })
  }

  const vistos = new Set<string>()
  return destinatarios.filter((destinatario) => {
    const chave = `${destinatario.contatoId}:${destinatario.telefoneWhatsapp}`
    if (vistos.has(chave)) return false
    vistos.add(chave)
    return true
  })
}

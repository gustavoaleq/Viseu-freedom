import type { Prisma } from '../generated/prisma/client.js'
import { prisma } from '../config/database.js'

interface RegistrarLogAutomacaoParams {
  audienciaId: string
  origem: 'SCHEDULER' | 'WORKER' | 'WEBHOOK' | 'MANUAL'
  evento:
    | 'AGENDAMENTO'
    | 'REMOCAO_AGENDAMENTO'
    | 'DISPARO'
    | 'DISPARO_IGNORADO'
    | 'RESPOSTA_RECEBIDA'
    | 'RESPOSTA_CONFIRMADA'
    | 'SUBSTITUICAO_ABERTA'
    | 'ERRO'
  etapa?: string
  status?: 'PENDENTE' | 'SUCESSO' | 'IGNORADO' | 'ERRO'
  mensagem: string
  metadados?: unknown
}

export async function registrarLogAutomacao(params: RegistrarLogAutomacaoParams) {
  try {
    await prisma.logAutomacao.create({
      data: {
        audienciaId: params.audienciaId,
        origem: params.origem,
        evento: params.evento,
        etapa: params.etapa ?? null,
        status: params.status ?? null,
        mensagem: params.mensagem,
        metadados: serializarMetadados(params.metadados),
      },
    })
  } catch (error) {
    console.error('[automacao-log] falha ao registrar evento', {
      audienciaId: params.audienciaId,
      evento: params.evento,
      erro: error instanceof Error ? error.message : String(error),
    })
  }
}

function serializarMetadados(valor: unknown): Prisma.InputJsonValue | undefined {
  if (typeof valor === 'undefined') return undefined

  try {
    return JSON.parse(JSON.stringify(valor)) as Prisma.InputJsonValue
  } catch {
    return undefined
  }
}

import { prisma } from '../config/database.js'
import { env } from '../config/env.js'

const SINGLETON_ID = 'singleton'

// Cache in-memory com TTL de 30s
let cache: ConfiguracaoGlobalDTO | null = null
let cacheExpira = 0
const CACHE_TTL_MS = 30_000

// Templates default — usados quando o campo no banco for null
export const TEMPLATES_DEFAULT = {
  mensagemD1:
    'Ola {{nomePreposto}}. Temos audiencia do processo {{numeroProcesso}} em {{data}} as {{hora}}. Local/link: {{local}}. Voce ira participar?',
  mensagemReiteracao:
    'Ola {{nomePreposto}}. Reiterando a audiencia do processo {{numeroProcesso}} em {{data}} as {{hora}}. Local/link: {{local}}. Voce ira participar? Apenas para confirmarmos.',
  mensagemCheckin:
    'Check-in da audiencia {{numeroProcesso}} hoje as {{hora}}. Chegou no local?',
  mensagemPosAudiencia:
    'Checkout pos-audiencia do processo {{numeroProcesso}}. Pergunta 1/6: A audiencia ocorreu?',
  mensagemCancelamento:
    'Aviso: a audiencia do processo {{numeroProcesso}} em {{data}} as {{hora}} foi cancelada. Qualquer duvida, contate o escritorio.',
  respostaD1Confirmacao:
    'Agradecemos a colaboracao. Ja iremos marcar sua visita na audiencia em nosso sistema.',
  respostaReiteracaoConfirmacao:
    'Agradecemos sua confirmacao na reiteracao. Sua presenca esta registrada no sistema.',
  respostaCheckinConfirmacao:
    'Recebemos sua atualizacao de check-in. Obrigado pelo retorno.',
  respostaPosAudienciaConfirmacao:
    'Obrigado. Relatorio pos-audiencia finalizado com sucesso.',
  mensagemPosPergunta2:
    'Pergunta 2/6 do processo {{numeroProcesso}}: Qual foi o resultado?',
  mensagemPosPergunta3:
    'Pergunta 3/6 do processo {{numeroProcesso}}: O advogado estava presente no horario?',
  mensagemPosPergunta4:
    'Pergunta 4/6 do processo {{numeroProcesso}}: O advogado demonstrou dominio minimo do caso?',
  mensagemPosPergunta5:
    'Pergunta 5/6 do processo {{numeroProcesso}}: Houve algum problema relevante?',
  mensagemPosPergunta6:
    'Pergunta 6/6 do processo {{numeroProcesso}}: Deixe uma observacao curta sobre o que aconteceu. Se nao houver, responda: Sem observacoes.',
} as const

export interface ConfiguracaoGlobalDTO {
  enviarAvisoNaImportacao: boolean
  horarioD1: string | null
  antecedenciaD1Horas: number
  antecedenciaReiteracaoHoras: number
  antecedenciaCheckinMinutos: number
  posAudienciaMinutosDepois: number
  fusoHorario: string
  mensagemD1: string | null
  mensagemReiteracao: string | null
  mensagemCheckin: string | null
  mensagemPosAudiencia: string | null
  mensagemCancelamento: string | null
  respostaD1Confirmacao: string | null
  respostaReiteracaoConfirmacao: string | null
  respostaCheckinConfirmacao: string | null
  respostaPosAudienciaConfirmacao: string | null
  mensagemPosPergunta2: string | null
  mensagemPosPergunta3: string | null
  mensagemPosPergunta4: string | null
  mensagemPosPergunta5: string | null
  mensagemPosPergunta6: string | null
  updatedAt: Date
}

function configParaDTO(config: {
  enviarAvisoNaImportacao: boolean
  horarioD1: string | null
  antecedenciaD1Horas: number
  antecedenciaReiteracaoHoras: number
  antecedenciaCheckinMinutos: number
  posAudienciaMinutosDepois: number
  fusoHorario: string
  mensagemD1: string | null
  mensagemReiteracao: string | null
  mensagemCheckin: string | null
  mensagemPosAudiencia: string | null
  mensagemCancelamento: string | null
  respostaD1Confirmacao: string | null
  respostaReiteracaoConfirmacao: string | null
  respostaCheckinConfirmacao: string | null
  respostaPosAudienciaConfirmacao: string | null
  mensagemPosPergunta2: string | null
  mensagemPosPergunta3: string | null
  mensagemPosPergunta4: string | null
  mensagemPosPergunta5: string | null
  mensagemPosPergunta6: string | null
  updatedAt: Date
}): ConfiguracaoGlobalDTO {
  return {
    enviarAvisoNaImportacao: config.enviarAvisoNaImportacao,
    horarioD1: config.horarioD1,
    antecedenciaD1Horas: config.antecedenciaD1Horas,
    antecedenciaReiteracaoHoras: config.antecedenciaReiteracaoHoras,
    antecedenciaCheckinMinutos: config.antecedenciaCheckinMinutos,
    posAudienciaMinutosDepois: config.posAudienciaMinutosDepois,
    fusoHorario: config.fusoHorario,
    mensagemD1: config.mensagemD1,
    mensagemReiteracao: config.mensagemReiteracao,
    mensagemCheckin: config.mensagemCheckin,
    mensagemPosAudiencia: config.mensagemPosAudiencia,
    mensagemCancelamento: config.mensagemCancelamento,
    respostaD1Confirmacao: config.respostaD1Confirmacao,
    respostaReiteracaoConfirmacao: config.respostaReiteracaoConfirmacao,
    respostaCheckinConfirmacao: config.respostaCheckinConfirmacao,
    respostaPosAudienciaConfirmacao: config.respostaPosAudienciaConfirmacao,
    mensagemPosPergunta2: config.mensagemPosPergunta2,
    mensagemPosPergunta3: config.mensagemPosPergunta3,
    mensagemPosPergunta4: config.mensagemPosPergunta4,
    mensagemPosPergunta5: config.mensagemPosPergunta5,
    mensagemPosPergunta6: config.mensagemPosPergunta6,
    updatedAt: config.updatedAt,
  }
}

export async function obterConfiguracoes(): Promise<ConfiguracaoGlobalDTO> {
  if (cache && Date.now() < cacheExpira) {
    return cache
  }

  let config = await prisma.configuracaoGlobal.findUnique({
    where: { id: SINGLETON_ID },
  })

  if (!config) {
    config = await prisma.configuracaoGlobal.create({
      data: {
        id: SINGLETON_ID,
        antecedenciaD1Horas: env.ORQ_D1_HORAS_ANTES,
        antecedenciaReiteracaoHoras: env.ORQ_REITERACAO_HORAS_ANTES,
        antecedenciaCheckinMinutos: env.ORQ_CHECKIN_MINUTOS_ANTES,
        posAudienciaMinutosDepois: env.ORQ_POS_MINUTOS_DEPOIS,
        fusoHorario: env.ORQ_TIMEZONE,
      },
    })
  }

  const dto = configParaDTO(config)
  cache = dto
  cacheExpira = Date.now() + CACHE_TTL_MS

  return dto
}

export interface AtualizarConfiguracoesInput {
  enviarAvisoNaImportacao?: boolean
  horarioD1?: string | null
  antecedenciaD1Horas?: number
  antecedenciaReiteracaoHoras?: number
  antecedenciaCheckinMinutos?: number
  posAudienciaMinutosDepois?: number
  fusoHorario?: string
  mensagemD1?: string | null
  mensagemReiteracao?: string | null
  mensagemCheckin?: string | null
  mensagemPosAudiencia?: string | null
  mensagemCancelamento?: string | null
  respostaD1Confirmacao?: string | null
  respostaReiteracaoConfirmacao?: string | null
  respostaCheckinConfirmacao?: string | null
  respostaPosAudienciaConfirmacao?: string | null
  mensagemPosPergunta2?: string | null
  mensagemPosPergunta3?: string | null
  mensagemPosPergunta4?: string | null
  mensagemPosPergunta5?: string | null
  mensagemPosPergunta6?: string | null
}

export async function atualizarConfiguracoes(
  dados: AtualizarConfiguracoesInput,
): Promise<ConfiguracaoGlobalDTO> {
  const config = await prisma.configuracaoGlobal.upsert({
    where: { id: SINGLETON_ID },
    update: dados,
    create: {
      id: SINGLETON_ID,
      ...dados,
    },
  })

  const dto = configParaDTO(config)
  cache = dto
  cacheExpira = Date.now() + CACHE_TTL_MS

  return dto
}

/**
 * Substitui variaveis {{chave}} no template por valores reais.
 */
export function aplicarTemplate(
  template: string,
  variaveis: Record<string, string>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, chave) => {
    return variaveis[chave] ?? match
  })
}

export function invalidarCacheConfiguracoes() {
  cache = null
  cacheExpira = 0
}

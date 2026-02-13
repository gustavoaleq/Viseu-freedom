export const STATUS_AUDIENCIA = [
  'IMPORTADA',
  'AGENDADA',
  'A_CONFIRMAR',
  'CONFIRMADA',
  'NAO_POSSO',
  'SEM_RESPOSTA',
  'SUBSTITUICAO_NECESSARIA',
  'EM_ANDAMENTO',
  'CHECK_IN_PENDENTE',
  'RELATORIO_PENDENTE',
  'CONCLUIDA',
  'CANCELADA',
] as const

export type StatusAudiencia = (typeof STATUS_AUDIENCIA)[number]

export const MODALIDADES = ['PRESENCIAL', 'ONLINE'] as const
export type Modalidade = (typeof MODALIDADES)[number]

export const ROLE_USUARIO = ['ADMIN', 'OPERADOR', 'GESTOR'] as const
export type RoleUsuario = (typeof ROLE_USUARIO)[number]

export type StatusImportacao = 'PROCESSANDO' | 'CONCLUIDA' | 'ERRO'

export interface Paginacao {
  total: number
  pagina: number
  limite: number
  totalPaginas: number
}

export interface RespostaPaginada<T> {
  dados: T[]
  paginacao: Paginacao
}

export interface Usuario {
  id: string
  nome: string
  email: string
  role: RoleUsuario
  ativo: boolean
  createdAt: string
  updatedAt?: string
}

export interface Trt {
  id: string
  numero: string
  nome: string
  ativo: boolean
}

export interface Preposto {
  id: string
  nome: string
  telefoneWhatsapp: string
  email?: string | null
  cpf?: string | null
  ativo: boolean
  createdAt?: string
  updatedAt?: string
  _count?: {
    audiencias: number
  }
}

export interface Parceiro {
  id: string
  nome: string
  ativo: boolean
  createdAt?: string
  updatedAt?: string
  _count?: {
    audiencias: number
    contatos: number
  }
}

export interface ContatoParceiro {
  id: string
  parceiroId: string
  nome: string
  telefoneWhatsapp: string
  email?: string | null
  cargo?: string | null
  ordemEscalonamento: number
}

export interface ParceiroContatosResponse {
  parceiro: {
    id: string
    nome: string
  }
  dados: ContatoParceiro[]
}

export interface Audiencia {
  id: string
  numeroProcesso: string
  reclamante?: string | null
  reclamada?: string | null
  tipoAudiencia?: string | null
  data: string
  hora: string
  modalidade: Modalidade
  comarca?: string | null
  advogado?: string | null
  contatoAdvogado?: string | null
  correspondente?: string | null
  local?: string | null
  link?: string | null
  trtId: string
  vara?: string | null
  status: StatusAudiencia
  prepostoId: string
  parceiroId: string
  importacaoId?: string | null
  observacoes?: string | null
  createdAt?: string
  updatedAt?: string
  trt?: Trt
  preposto?: Preposto
  parceiro?: Parceiro
}

export interface HistoricoStatus {
  id: string
  audienciaId: string
  statusAnterior: StatusAudiencia
  statusNovo: StatusAudiencia
  motivo?: string | null
  atualizadoPor: string
  createdAt: string
}

export interface MensagemAudiencia {
  id: string
  audienciaId: string
  tipo: string
  direcao: 'ENVIADA' | 'RECEBIDA'
  conteudo: string
  respostaBotao?: string | null
  observacao?: string | null
  statusEnvio: 'PENDENTE' | 'ENVIADA' | 'ENTREGUE' | 'LIDA' | 'FALHA'
  createdAt: string
}

export interface LogAutomacaoAudiencia {
  id: string
  audienciaId: string
  origem: 'SCHEDULER' | 'WORKER' | 'WEBHOOK' | 'MANUAL'
  evento: string
  etapa?: string | null
  status?: 'PENDENTE' | 'SUCESSO' | 'IGNORADO' | 'ERRO' | null
  mensagem: string
  metadados?: Record<string, unknown> | null
  createdAt: string
}

export interface SubstituicaoAudiencia {
  id: string
  audienciaId: string
  prepostoAnteriorId: string
  prepostoNovoId?: string | null
  motivo: string
  status: 'ABERTA' | 'RESOLVIDA' | 'CANCELADA'
  createdAt: string
  resolvidoEm?: string | null
  prepostoAnterior?: {
    id: string
    nome: string
  }
  prepostoNovo?: {
    id: string
    nome: string
  }
}

export interface RelatorioAudiencia {
  id: string
  audienciaId: string
  audienciaOcorreu: 'SIM' | 'NAO' | 'REMARCADA'
  resultado: 'ACORDO' | 'SEM_ACORDO' | 'AUSENCIA' | 'REDESIGNADA'
  advogadoPresente: boolean
  advogadoDominioCaso: boolean
  problemaRelevante: boolean
  relato?: string | null
}

export interface AudienciaDetalhe extends Audiencia {
  historicoStatus: HistoricoStatus[]
  mensagens: MensagemAudiencia[]
  logsAutomacao: LogAutomacaoAudiencia[]
  substituicoes: SubstituicaoAudiencia[]
  relatorio?: RelatorioAudiencia | null
}

export interface DashboardResponse {
  totalAtivas: number
  audienciasHoje: number
  audienciasSemana: number
  aguardandoConfirmacao: number
  semResposta: number
  porStatus: Array<{
    status: StatusAudiencia
    total: number
  }>
  automacao?: {
    reiteracoesDisparadas24h: number
    respostasWhatsapp24h: number
    substituicoesPorAutomacao24h: number
  }
}

export interface Importacao {
  id: string
  nomeArquivo: string
  totalRegistros: number
  registrosImportados: number
  registrosIgnorados: number
  status: StatusImportacao
  createdAt: string
}

export interface ImportacaoUploadResponse {
  importacaoId: string
  nomeArquivo: string
  totalRegistros: number
  colunasDetectadas: string[]
  previewLinhas: Record<string, unknown>[]
}

export interface ImportacaoMapearRequest {
  mapeamentoColunas: Record<string, string>
}

export interface ImportacaoMapearResponse {
  sucesso: boolean
  importacaoId?: string
  mapeamentoColunas?: Record<string, string>
  status?: StatusImportacao
  camposFaltantes?: string[]
}

export interface ImportacaoPreviewResponse {
  importacaoId: string
  nomeArquivo: string
  totalLinhas: number
  validasParaImportacao: number
  ignoradasPorTrt: number
  invalidas: number
  erros: Array<{
    linha: number
    erros: string[]
  }>
  amostraValidas: Array<Record<string, unknown>>
}

export interface AuthLoginResponse {
  token: string
  usuario: Usuario
}

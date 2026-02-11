// === Constantes de Status/Enum ===

export const StatusAudiencia = {
  IMPORTADA: 'IMPORTADA',
  AGENDADA: 'AGENDADA',
  A_CONFIRMAR: 'A_CONFIRMAR',
  CONFIRMADA: 'CONFIRMADA',
  NAO_POSSO: 'NAO_POSSO',
  SEM_RESPOSTA: 'SEM_RESPOSTA',
  SUBSTITUICAO_NECESSARIA: 'SUBSTITUICAO_NECESSARIA',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  CHECK_IN_PENDENTE: 'CHECK_IN_PENDENTE',
  RELATORIO_PENDENTE: 'RELATORIO_PENDENTE',
  CONCLUIDA: 'CONCLUIDA',
  CANCELADA: 'CANCELADA',
} as const

export type StatusAudiencia = (typeof StatusAudiencia)[keyof typeof StatusAudiencia]

export const Modalidade = {
  PRESENCIAL: 'PRESENCIAL',
  ONLINE: 'ONLINE',
} as const

export type Modalidade = (typeof Modalidade)[keyof typeof Modalidade]

export const RoleUsuario = {
  ADMIN: 'ADMIN',
  OPERADOR: 'OPERADOR',
  GESTOR: 'GESTOR',
} as const

export type RoleUsuario = (typeof RoleUsuario)[keyof typeof RoleUsuario]

// === Entidades ===

export interface Usuario {
  id: string
  nome: string
  email: string
  role: RoleUsuario
  ativo: boolean
  createdAt: string
  updatedAt: string
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
  email?: string
  cpf?: string
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export interface Parceiro {
  id: string
  nome: string
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export interface ContatoParceiro {
  id: string
  parceiroId: string
  nome: string
  telefoneWhatsapp: string
  email?: string
  cargo?: string
  ordemEscalonamento: number
}

export interface Audiencia {
  id: string
  numeroProcesso: string
  reclamante?: string
  data: string
  hora: string
  modalidade: Modalidade
  local?: string
  link?: string
  trtId: string
  trt?: Trt
  vara?: string
  status: StatusAudiencia
  prepostoId: string
  preposto?: Preposto
  parceiroId: string
  parceiro?: Parceiro
  importacaoId?: string
  observacoes?: string
  createdAt: string
  updatedAt: string
}

export interface Importacao {
  id: string
  nomeArquivo: string
  totalRegistros: number
  registrosImportados: number
  registrosIgnorados: number
  mapeamentoColunas: Record<string, string>
  status: 'PROCESSANDO' | 'CONCLUIDA' | 'ERRO'
  erros?: Record<string, string>[]
  createdAt: string
}

import type { StatusAudiencia } from '../types'

export const STATUS_LABEL: Record<StatusAudiencia, string> = {
  IMPORTADA: 'Importada',
  AGENDADA: 'Agendada',
  A_CONFIRMAR: 'A confirmar (D-1)',
  CONFIRMADA: 'Confirmada',
  NAO_POSSO: 'Indisponibilidade do preposto',
  SEM_RESPOSTA: 'Sem resposta',
  SUBSTITUICAO_NECESSARIA: 'Substituicao necessaria',
  EM_ANDAMENTO: 'Em andamento',
  CHECK_IN_PENDENTE: 'Check-in pendente',
  RELATORIO_PENDENTE: 'Relatorio pendente',
  CONCLUIDA: 'Concluida',
  CANCELADA: 'Cancelada',
}

export const STATUS_BADGE_CLASS: Record<StatusAudiencia, string> = {
  IMPORTADA: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  AGENDADA: 'bg-info-50 text-info-700 border-info-200',
  A_CONFIRMAR: 'bg-warning-50 text-warning-700 border-warning-200',
  CONFIRMADA: 'bg-success-50 text-success-700 border-success-200',
  NAO_POSSO: 'bg-danger-50 text-danger-700 border-danger-200',
  SEM_RESPOSTA: 'bg-warning-50 text-warning-700 border-warning-200',
  SUBSTITUICAO_NECESSARIA: 'bg-danger-50 text-danger-700 border-danger-200',
  EM_ANDAMENTO: 'bg-info-50 text-info-700 border-info-200',
  CHECK_IN_PENDENTE: 'bg-warning-50 text-warning-700 border-warning-200',
  RELATORIO_PENDENTE: 'bg-info-50 text-info-700 border-info-200',
  CONCLUIDA: 'bg-success-50 text-success-700 border-success-200',
  CANCELADA: 'bg-neutral-200 text-neutral-700 border-neutral-300',
}

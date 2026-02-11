import type { StatusAudiencia } from '../types'

export const STATUS_LABEL: Record<StatusAudiencia, string> = {
  IMPORTADA: 'Importada',
  AGENDADA: 'Agendada',
  A_CONFIRMAR: 'A confirmar (D-1)',
  CONFIRMADA: 'Confirmada',
  NAO_POSSO: 'Nao posso',
  SEM_RESPOSTA: 'Sem resposta',
  SUBSTITUICAO_NECESSARIA: 'Substituicao necessaria',
  EM_ANDAMENTO: 'Em andamento',
  CHECK_IN_PENDENTE: 'Check-in pendente',
  RELATORIO_PENDENTE: 'Relatorio pendente',
  CONCLUIDA: 'Concluida',
  CANCELADA: 'Cancelada',
}

export const STATUS_BADGE_CLASS: Record<StatusAudiencia, string> = {
  IMPORTADA: 'bg-slate-100 text-slate-700 border-slate-200',
  AGENDADA: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  A_CONFIRMAR: 'bg-amber-100 text-amber-800 border-amber-200',
  CONFIRMADA: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  NAO_POSSO: 'bg-rose-100 text-rose-700 border-rose-200',
  SEM_RESPOSTA: 'bg-orange-100 text-orange-700 border-orange-200',
  SUBSTITUICAO_NECESSARIA: 'bg-red-100 text-red-700 border-red-200',
  EM_ANDAMENTO: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  CHECK_IN_PENDENTE: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  RELATORIO_PENDENTE: 'bg-violet-100 text-violet-700 border-violet-200',
  CONCLUIDA: 'bg-green-100 text-green-700 border-green-200',
  CANCELADA: 'bg-zinc-200 text-zinc-700 border-zinc-300',
}

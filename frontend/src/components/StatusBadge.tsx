import type { StatusAudiencia } from '../types'
import { STATUS_BADGE_CLASS, STATUS_LABEL } from '../lib/status'

interface StatusBadgeProps {
  status: StatusAudiencia
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}

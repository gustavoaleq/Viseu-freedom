import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { formatarData } from '../lib/format'
import { STATUS_LABEL } from '../lib/status'
import type { Audiencia, StatusAudiencia } from '../types'
import { audienciasApi } from '../services/hub'

interface ColunaKanban {
  id: string
  label: string
  descricao: string
  colorClass: string
  statuses: StatusAudiencia[]
}

const COLUNAS: ColunaKanban[] = [
  {
    id: 'a_confirmar',
    label: 'A confirmar (D-1)',
    descricao: 'Importada, agendada e pendente de confirmacao (inclui indisponibilidade inicial)',
    colorClass: 'bg-amber-400',
    statuses: ['IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'NAO_POSSO'],
  },
  {
    id: 'confirmada',
    label: 'Confirmada',
    descricao: 'Preposto confirmou disponibilidade',
    colorClass: 'bg-primary-500',
    statuses: ['CONFIRMADA'],
  },
  {
    id: 'substituicao',
    label: 'Substituicao necessaria',
    descricao: 'Casos criticos que exigem acao imediata',
    colorClass: 'bg-rose-500',
    statuses: ['SEM_RESPOSTA', 'SUBSTITUICAO_NECESSARIA'],
  },
  {
    id: 'andamento',
    label: 'Em andamento',
    descricao: 'Check-in e execucao da audiencia',
    colorClass: 'bg-cyan-500',
    statuses: ['CHECK_IN_PENDENTE', 'EM_ANDAMENTO'],
  },
  {
    id: 'relatorio',
    label: 'Relatorio pendente',
    descricao: 'Aguardando registro pos-audiencia',
    colorClass: 'bg-violet-500',
    statuses: ['RELATORIO_PENDENTE'],
  },
  {
    id: 'concluida',
    label: 'Concluida',
    descricao: 'Fluxo operacional finalizado',
    colorClass: 'bg-primary-700',
    statuses: ['CONCLUIDA'],
  },
  {
    id: 'cancelada',
    label: 'Cancelada',
    descricao: 'Audiencias encerradas por cancelamento',
    colorClass: 'bg-zinc-500',
    statuses: ['CANCELADA'],
  },
]

function ordenarPorDataHora(a: Audiencia, b: Audiencia) {
  const dataA = new Date(`${a.data}T${a.hora}`).getTime()
  const dataB = new Date(`${b.data}T${b.hora}`).getTime()
  return dataA - dataB
}

export function AudienciasKanbanPage() {
  const kanban = useQuery({ queryKey: ['kanban'], queryFn: audienciasApi.kanban })
  const colunas = useMemo(() => {
    return COLUNAS.map((coluna) => {
      const cards: Audiencia[] = coluna.statuses.flatMap((status) => kanban.data?.[status] ?? [])
      return {
        ...coluna,
        cards: cards.sort(ordenarPorDataHora),
      }
    })
  }, [kanban.data])

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Kanban de Audiencias</h1>
            <p className="mt-1 text-sm text-slate-500">
              Fluxo consolidado por etapa operacional para reduzir ruído e facilitar decisao.
            </p>
          </div>
          <Link
            to="/audiencias"
            className="inline-flex w-fit items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-primary-300 hover:text-primary-700"
          >
            Ver lista tabular
          </Link>
        </div>
      </header>

      {kanban.isLoading ? <p className="text-sm text-slate-500">Carregando colunas...</p> : null}
      {kanban.isError ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Erro ao carregar kanban.
        </div>
      ) : null}

      {!kanban.isLoading && !kanban.isError ? (
        <section className="overflow-x-auto pb-2">
          <div className="inline-grid min-w-full grid-flow-col gap-4">
            {colunas.map((coluna) => {
              return (
                <article
                  key={coluna.id}
                  className="flex h-[72vh] w-80 flex-col rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
                >
                  <header className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${coluna.colorClass}`} />
                      <h2 className="text-sm font-semibold text-slate-800">{coluna.label}</h2>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                      {coluna.cards.length}
                    </span>
                  </header>
                  <p className="border-b border-slate-200 px-3 py-2 text-[11px] text-slate-500">{coluna.descricao}</p>

                  <div className="flex-1 space-y-3 overflow-y-auto p-3">
                    {coluna.cards.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-6 text-center text-xs text-slate-500">
                        Sem audiencias neste status.
                      </div>
                    ) : (
                      coluna.cards.map((audiencia) => (
                        <Link
                          key={audiencia.id}
                          to={`/audiencias/${audiencia.id}`}
                          className="block rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-primary-300"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-mono text-xs text-slate-600">{audiencia.numeroProcesso}</p>
                            {audiencia.status === 'SUBSTITUICAO_NECESSARIA' || audiencia.status === 'SEM_RESPOSTA' ? (
                              <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">
                                URGENTE
                              </span>
                            ) : audiencia.status === 'NAO_POSSO' ? (
                              <span
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-amber-300 bg-amber-100 text-[11px] font-bold text-amber-700"
                                title="Preposto sinalizou indisponibilidade no primeiro contato. Reiteracao pendente."
                              >
                                !
                              </span>
                            ) : null}
                          </div>

                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {audiencia.preposto?.nome ?? 'Sem preposto'}
                          </p>

                          <div className="mt-3 space-y-1 text-xs text-slate-500">
                            <p>
                              {formatarData(audiencia.data)} as {audiencia.hora}
                            </p>
                            <p>{audiencia.trt?.nome ?? 'TRT nao informado'}</p>
                            <p>{audiencia.parceiro?.nome ?? 'Parceiro nao informado'}</p>
                          </div>
                          <div className="mt-3">
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                              {STATUS_LABEL[audiencia.status]}
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}
    </div>
  )
}

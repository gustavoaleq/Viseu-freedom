import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { formatarData } from '../lib/format'
import { audienciasApi } from '../services/hub'
import type { Audiencia, StatusAudiencia } from '../types'

const CIRCULO = 251.327

function combinarDataHora(audiencia: Audiencia) {
  return new Date(`${audiencia.data.slice(0, 10)}T${audiencia.hora || '00:00'}:00`)
}

function ordemPrioridade(status: StatusAudiencia) {
  switch (status) {
    case 'SUBSTITUICAO_NECESSARIA':
      return 0
    case 'CHECK_IN_PENDENTE':
      return 1
    case 'A_CONFIRMAR':
      return 2
    case 'RELATORIO_PENDENTE':
      return 3
    case 'SEM_RESPOSTA':
      return 4
    default:
      return 5
  }
}

function labelCurtaStatus(status: StatusAudiencia) {
  switch (status) {
    case 'SUBSTITUICAO_NECESSARIA':
      return 'Substituicao'
    case 'CHECK_IN_PENDENTE':
      return 'Check-in pendente'
    case 'A_CONFIRMAR':
      return 'Confirmar (D-1)'
    case 'RELATORIO_PENDENTE':
      return 'Ata pendente'
    case 'SEM_RESPOSTA':
      return 'Sem resposta'
    case 'CONFIRMADA':
      return 'Confirmada'
    case 'EM_ANDAMENTO':
      return 'Em andamento'
    default:
      return 'Em fluxo'
  }
}

function classeStatusTabela(status: StatusAudiencia) {
  switch (status) {
    case 'SUBSTITUICAO_NECESSARIA':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'CHECK_IN_PENDENTE':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'A_CONFIRMAR':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'RELATORIO_PENDENTE':
      return 'bg-violet-100 text-violet-800 border-violet-200'
    case 'SEM_RESPOSTA':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    default:
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }
}

function classeAcaoTabela(status: StatusAudiencia) {
  switch (status) {
    case 'SUBSTITUICAO_NECESSARIA':
      return 'Resolver'
    case 'CHECK_IN_PENDENTE':
      return 'Notificar'
    case 'A_CONFIRMAR':
      return 'Confirmar'
    case 'RELATORIO_PENDENTE':
      return 'Cobrar'
    default:
      return 'Abrir'
  }
}

function dataCurta(audiencia: Audiencia) {
  const data = combinarDataHora(audiencia)
  const horario = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  return horario
}

export function DashboardPage() {
  const dashboard = useQuery({ queryKey: ['dashboard'], queryFn: audienciasApi.dashboard })

  const audienciasOperacao = useQuery({
    queryKey: ['dashboard-audiencias-operacao'],
    queryFn: () => audienciasApi.listar({ limit: 60, page: 1 }),
  })

  const amanhaCount = useQuery({
    queryKey: ['dashboard-amanha-count'],
    queryFn: async () => {
      const agora = new Date()
      const amanha = new Date(agora)
      amanha.setDate(agora.getDate() + 1)

      const inicio = new Date(amanha)
      inicio.setHours(0, 0, 0, 0)

      const fim = new Date(amanha)
      fim.setHours(23, 59, 59, 999)

      const resposta = await audienciasApi.listar({
        page: 1,
        limit: 200,
        dataInicio: inicio.toISOString(),
        dataFim: fim.toISOString(),
      })

      return resposta.paginacao.total
    },
  })

  if (dashboard.isLoading) {
    return <p className="text-sm text-muted">Carregando dashboard operacional...</p>
  }

  if (dashboard.isError || !dashboard.data) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Erro ao carregar dashboard.
      </div>
    )
  }

  const statusMap = new Map<StatusAudiencia, number>()
  for (const item of dashboard.data.porStatus) {
    statusMap.set(item.status, item.total)
  }

  const substituicaoNecessaria = statusMap.get('SUBSTITUICAO_NECESSARIA') ?? 0
  const checkInPendente = statusMap.get('CHECK_IN_PENDENTE') ?? 0
  const hoje = dashboard.data.audienciasHoje
  const amanha = amanhaCount.data ?? 0

  const totalStatus = dashboard.data.porStatus.reduce((acc, item) => acc + item.total, 0)
  const realizadas = statusMap.get('CONCLUIDA') ?? 0
  const pendentes =
    (statusMap.get('IMPORTADA') ?? 0) +
    (statusMap.get('AGENDADA') ?? 0) +
    (statusMap.get('A_CONFIRMAR') ?? 0) +
    (statusMap.get('CONFIRMADA') ?? 0) +
    (statusMap.get('EM_ANDAMENTO') ?? 0) +
    (statusMap.get('CHECK_IN_PENDENTE') ?? 0) +
    (statusMap.get('RELATORIO_PENDENTE') ?? 0)
  const problemas =
    (statusMap.get('SUBSTITUICAO_NECESSARIA') ?? 0) +
    (statusMap.get('SEM_RESPOSTA') ?? 0) +
    (statusMap.get('NAO_POSSO') ?? 0)
  const aguardando = Math.max(totalStatus - realizadas - pendentes - problemas, 0)

  const pct = {
    realizadas: totalStatus > 0 ? (realizadas / totalStatus) * 100 : 0,
    pendentes: totalStatus > 0 ? (pendentes / totalStatus) * 100 : 0,
    problemas: totalStatus > 0 ? (problemas / totalStatus) * 100 : 0,
    aguardando: totalStatus > 0 ? (aguardando / totalStatus) * 100 : 0,
  }

  const dashLen = {
    realizadas: (pct.realizadas / 100) * CIRCULO,
    pendentes: (pct.pendentes / 100) * CIRCULO,
    problemas: (pct.problemas / 100) * CIRCULO,
    aguardando: (pct.aguardando / 100) * CIRCULO,
  }

  const cardsBase = (audienciasOperacao.data?.dados ?? [])
    .filter((item) => item.status !== 'CONCLUIDA' && item.status !== 'CANCELADA')
    .slice()
    .sort((a, b) => {
      const statusCmp = ordemPrioridade(a.status) - ordemPrioridade(b.status)
      if (statusCmp !== 0) return statusCmp
      return combinarDataHora(a).getTime() - combinarDataHora(b).getTime()
    })

  const prioridades = cardsBase.slice(0, 6)

  const lembretes = [
    {
      titulo: 'Relatorio mensal',
      detalhe: 'Consolidar indicadores de audiencias para revisao dos socios.',
      badge: 'Operacional',
      badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      titulo: 'Substituicoes criticas',
      detalhe: `${substituicaoNecessaria} audiencia(s) com risco operacional imediato.`,
      badge: substituicaoNecessaria > 0 ? 'Urgente' : 'Controlado',
      badgeClass:
        substituicaoNecessaria > 0
          ? 'bg-red-100 text-red-700 border-red-200'
          : 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      titulo: 'Check-in pendente',
      detalhe: `${checkInPendente} audiencia(s) aguardando confirmacao de deslocamento.`,
      badge: 'Hoje',
      badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
  ]

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Operacional</h1>
          <p className="mt-1 text-sm text-slate-500">Visao geral das audiencias e status do dia.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Ultima atualizacao: agora</span>
          <Link
            to="/audiencias"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
          >
            Abrir operacao
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Audiencias Hoje / Amanha</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {hoje} <span className="text-lg font-normal text-slate-500">/ {amanha}</span>
              </h3>
            </div>
            <div className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">HOJE</div>
          </div>
          <p className="mt-4 text-xs text-emerald-600">Monitoramento diario da agenda juridica.</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">A confirmar (D-1)</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">{dashboard.data.aguardandoConfirmacao}</h3>
            </div>
            <div className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">D-1</div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <div className="h-1.5 w-full rounded-full bg-slate-200">
              <div
                className="h-1.5 rounded-full bg-blue-500"
                style={{
                  width: `${Math.min(
                    100,
                    dashboard.data.totalAtivas > 0
                      ? (dashboard.data.aguardandoConfirmacao / dashboard.data.totalAtivas) * 100
                      : 0,
                  )}%`,
                }}
              />
            </div>
            <span className="font-semibold text-slate-700">
              {dashboard.data.totalAtivas > 0
                ? Math.round((dashboard.data.aguardandoConfirmacao / dashboard.data.totalAtivas) * 100)
                : 0}
              %
            </span>
          </div>
        </article>

        <article className="rounded-xl border border-red-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Substituicao Necessaria</p>
              <h3 className="mt-2 text-3xl font-bold text-red-600">{substituicaoNecessaria}</h3>
            </div>
            <div className="rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">RISCO</div>
          </div>
          <p className="mt-4 text-xs font-medium text-red-600">Encaminhar acao imediata com parceiro/preposto.</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Check-in Pendente</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">{checkInPendente}</h3>
            </div>
            <div className="rounded-lg bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-700">CHECK-IN</div>
          </div>
          <p className="mt-4 text-xs text-slate-500">Audiencias do dia aguardando sinalizacao de chegada.</p>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-900">Prioridades do Dia</h2>
            <Link to="/audiencias" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              Ver todas
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Horario</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Processo / Parte</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Acao</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {audienciasOperacao.isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-sm text-slate-500">
                      Carregando prioridades...
                    </td>
                  </tr>
                ) : null}

                {!audienciasOperacao.isLoading && prioridades.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-sm text-slate-500">
                      Nenhuma prioridade operacional encontrada.
                    </td>
                  </tr>
                ) : null}

                {prioridades.map((audiencia) => (
                  <tr key={audiencia.id} className="transition-colors hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">{dataCurta(audiencia)}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-slate-900">{audiencia.numeroProcesso}</span>
                        <span className="text-xs text-slate-500">{audiencia.reclamante || audiencia.parceiro?.nome || 'Sem parte informada'}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${classeStatusTabela(
                          audiencia.status,
                        )}`}
                      >
                        {labelCurtaStatus(audiencia.status)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Link to={`/audiencias/${audiencia.id}`} className="text-emerald-600 hover:text-emerald-700">
                        {classeAcaoTabela(audiencia.status)}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Status das Audiencias</h3>
            <div className="relative mx-auto flex aspect-square w-full max-w-64 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="12" className="stroke-slate-100" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="stroke-emerald-500"
                  strokeDasharray={`${dashLen.realizadas} ${CIRCULO}`}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="stroke-yellow-400"
                  strokeDasharray={`${dashLen.pendentes} ${CIRCULO}`}
                  transform={`rotate(${(dashLen.realizadas / CIRCULO) * 360 - 90} 50 50)`}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="stroke-red-500"
                  strokeDasharray={`${dashLen.problemas} ${CIRCULO}`}
                  transform={`rotate(${((dashLen.realizadas + dashLen.pendentes) / CIRCULO) * 360 - 90} 50 50)`}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="stroke-slate-300"
                  strokeDasharray={`${dashLen.aguardando} ${CIRCULO}`}
                  transform={`rotate(${((dashLen.realizadas + dashLen.pendentes + dashLen.problemas) / CIRCULO) * 360 - 90} 50 50)`}
                />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">{totalStatus}</span>
                <span className="text-xs uppercase tracking-wide text-slate-500">Total</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-500">Realizadas</span>
                </div>
                <span className="font-semibold text-slate-900">{Math.round(pct.realizadas)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="text-slate-500">Pendentes</span>
                </div>
                <span className="font-semibold text-slate-900">{Math.round(pct.pendentes)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-slate-500">Problemas</span>
                </div>
                <span className="font-semibold text-slate-900">{Math.round(pct.problemas)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-slate-300" />
                  <span className="text-slate-500">Aguardando</span>
                </div>
                <span className="font-semibold text-slate-900">{Math.round(pct.aguardando)}%</span>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Lembretes</h3>
              <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-mono text-emerald-700">
                {lembretes.length} ativos
              </span>
            </div>

            <div className="space-y-3">
              {lembretes.map((item) => (
                <div key={item.titulo} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-slate-900">{item.titulo}</p>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{item.detalhe}</p>
                </div>
              ))}
            </div>

            <Link
              to="/audiencias"
              className="mt-4 block w-full rounded-lg border border-emerald-200 py-2 text-center text-xs font-medium text-emerald-600 transition-colors hover:border-emerald-300 hover:text-emerald-700"
            >
              Ver todos os lembretes
            </Link>
          </article>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Checklist rapido de operacao</h3>
          <span className="text-xs text-slate-500">Baseado nos dados ativos do hub</span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
            Audiencias hoje: <strong>{hoje}</strong>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
            A confirmar (D-1): <strong>{dashboard.data.aguardandoConfirmacao}</strong>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
            Sem resposta: <strong>{dashboard.data.semResposta}</strong>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
            Substituicoes abertas: <strong>{substituicaoNecessaria}</strong>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Proximas audiencias</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {(audienciasOperacao.data?.dados ?? []).slice(0, 6).map((audiencia) => (
            <Link
              key={audiencia.id}
              to={`/audiencias/${audiencia.id}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-emerald-300"
            >
              <p className="font-mono text-xs text-slate-700">{audiencia.numeroProcesso}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {audiencia.preposto?.nome ?? 'Preposto nao definido'}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {formatarData(audiencia.data)} as {audiencia.hora}
              </p>
              <p className="mt-1 text-xs text-slate-500">{labelCurtaStatus(audiencia.status)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

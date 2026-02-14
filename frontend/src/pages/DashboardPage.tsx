import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { formatarData } from '../lib/format'
import { audienciasApi } from '../services/hub'
import type { Audiencia, StatusAudiencia } from '../types'

const CIRCULO = 251.327

function percentual(parte: number, total: number) {
  if (total <= 0) return 0
  return Math.round((parte / total) * 100)
}

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
      return 'bg-primary-100 text-primary-800 border-primary-200'
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
  const navigate = useNavigate()
  const dashboard = useQuery({ queryKey: ['dashboard'], queryFn: audienciasApi.dashboard })

  const audienciasOperacao = useQuery({
    queryKey: ['dashboard-audiencias-operacao'],
    queryFn: () => audienciasApi.listar({ limit: 60, page: 1 }),
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

  const statusOperacionais = dashboard.data.porStatus.filter((item) => item.status !== 'CANCELADA')

  const statusMap = new Map<StatusAudiencia, number>()
  for (const item of statusOperacionais) {
    statusMap.set(item.status, item.total)
  }

  const substituicaoNecessaria = statusMap.get('SUBSTITUICAO_NECESSARIA') ?? 0
  const checkInPendente = statusMap.get('CHECK_IN_PENDENTE') ?? 0
  const hoje = dashboard.data.audienciasHoje
  const posRelatorio = dashboard.data.posRelatorio ?? {
    periodoDias: 30,
    totalRelatorios: 0,
    audienciaOcorreu: { sim: 0, nao: 0, remarcada: 0 },
    resultado: { acordo: 0, semAcordo: 0, ausencia: 0, redesignada: 0 },
    advogadoPresente: { sim: 0, nao: 0 },
    advogadoDominioCaso: { sim: 0, nao: 0 },
    problemaRelevante: { sim: 0, nao: 0 },
  }

  const totalStatus = statusOperacionais.reduce((acc, item) => acc + item.total, 0)
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
  const totalResultados =
    posRelatorio.resultado.acordo +
    posRelatorio.resultado.semAcordo +
    posRelatorio.resultado.ausencia +
    posRelatorio.resultado.redesignada
  const totalPresenca = posRelatorio.advogadoPresente.sim + posRelatorio.advogadoPresente.nao
  const totalDominio = posRelatorio.advogadoDominioCaso.sim + posRelatorio.advogadoDominioCaso.nao
  const totalProblema = posRelatorio.problemaRelevante.sim + posRelatorio.problemaRelevante.nao

  const cardsBase = (audienciasOperacao.data?.dados ?? [])
    .filter((item) => item.status !== 'CONCLUIDA' && item.status !== 'CANCELADA')
    .slice()
    .sort((a, b) => {
      const statusCmp = ordemPrioridade(a.status) - ordemPrioridade(b.status)
      if (statusCmp !== 0) return statusCmp
      return combinarDataHora(a).getTime() - combinarDataHora(b).getTime()
    })

  const prioridades = cardsBase.slice(0, 6)
  const proximasAudiencias = (audienciasOperacao.data?.dados ?? [])
    .filter((item) => item.status !== 'CONCLUIDA' && item.status !== 'CANCELADA')
    .slice()
    .sort((a, b) => combinarDataHora(a).getTime() - combinarDataHora(b).getTime())
    .slice(0, 6)

  const lembretes = [
    ...(substituicaoNecessaria > 0
      ? [
          {
            titulo: 'Substituicoes criticas',
            detalhe: `${substituicaoNecessaria} audiencia(s) com risco operacional imediato.`,
            badge: 'Urgente',
            badgeClass: 'bg-red-100 text-red-700 border-red-200',
          },
        ]
      : []),
    ...(checkInPendente > 0
      ? [
          {
            titulo: 'Check-in pendente',
            detalhe: `${checkInPendente} audiencia(s) aguardando confirmacao de deslocamento.`,
            badge: 'Hoje',
            badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          },
        ]
      : []),
    ...(dashboard.data.aguardandoConfirmacao > 0
      ? [
          {
            titulo: 'A confirmar (D-1)',
            detalhe: `${dashboard.data.aguardandoConfirmacao} audiencia(s) aguardando retorno do preposto.`,
            badge: 'D-1',
            badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
          },
        ]
      : []),
    ...(dashboard.data.semResposta > 0
      ? [
          {
            titulo: 'Sem resposta',
            detalhe: `${dashboard.data.semResposta} audiencia(s) sem retorno no fluxo atual.`,
            badge: 'Atencao',
            badgeClass: 'bg-amber-100 text-amber-700 border-amber-200',
          },
        ]
      : []),
  ]

  function abrirSubstituicoesNecessarias() {
    navigate('/audiencias?status=SUBSTITUICAO_NECESSARIA')
  }

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
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
          >
            Abrir operacao
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Audiencias hoje</p>
            <div className="rounded-lg bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">HOJE</div>
          </div>
          <h3 className="mt-5 text-center text-4xl font-bold text-slate-900">{hoje}</h3>
          <p className="mt-3 text-center text-[11px] text-slate-500">Audiencias previstas para o dia atual.</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">A confirmar (D-1)</p>
            <div className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">D-1</div>
          </div>
          <h3 className="mt-5 text-center text-4xl font-bold text-slate-900">{dashboard.data.aguardandoConfirmacao}</h3>
          <p className="mt-3 text-center text-[11px] text-slate-500">Aguardando retorno do preposto na confirmacao D-1.</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Check-in Pendente</p>
            <div className="rounded-lg bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-700">CHECK-IN</div>
          </div>
          <h3 className="mt-5 text-center text-4xl font-bold text-slate-900">{checkInPendente}</h3>
          <p className="mt-3 text-center text-[11px] text-slate-500">Audiencias do dia aguardando sinalizacao de chegada.</p>
        </article>

        <article
          role="button"
          tabIndex={0}
          onClick={abrirSubstituicoesNecessarias}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              abrirSubstituicoesNecessarias()
            }
          }}
          className="cursor-pointer rounded-xl border border-red-200 bg-white p-5 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-slate-500">Substituicao Necessaria</p>
            <div className="rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">RISCO</div>
          </div>
          <h3 className="mt-5 text-center text-4xl font-bold text-slate-900">{substituicaoNecessaria}</h3>
          <p className="mt-3 text-center text-[11px] text-slate-500">Clique para abrir audiencias filtradas com substituicao necessaria.</p>
        </article>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-slate-900">Indicadores Pos-Audiencia</h2>
          <span className="text-xs text-slate-500">Base: ultimos {posRelatorio.periodoDias} dias</span>
        </div>

        {posRelatorio.totalRelatorios === 0 ? (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Ainda nao ha relatorios pos-audiencia no periodo selecionado.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Relatorios Fechados
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{posRelatorio.totalRelatorios}</p>
              <p className="mt-1 text-xs text-slate-500">Checkouts finalizados no periodo.</p>
            </article>

            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Resultado</p>
              <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                <p>
                  Acordo: <strong>{posRelatorio.resultado.acordo}</strong>{' '}
                  <span className="text-slate-500">
                    ({percentual(posRelatorio.resultado.acordo, totalResultados)}%)
                  </span>
                </p>
                <p>
                  Sem acordo: <strong>{posRelatorio.resultado.semAcordo}</strong>
                </p>
                <p>
                  Ausencia: <strong>{posRelatorio.resultado.ausencia}</strong>
                </p>
                <p>
                  Redesignada: <strong>{posRelatorio.resultado.redesignada}</strong>
                </p>
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Advogado no Caso</p>
              <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                <p>
                  Presente: <strong>{posRelatorio.advogadoPresente.sim}</strong>{' '}
                  <span className="text-slate-500">
                    ({percentual(posRelatorio.advogadoPresente.sim, totalPresenca)}%)
                  </span>
                </p>
                <p>
                  Ausente: <strong>{posRelatorio.advogadoPresente.nao}</strong>
                </p>
                <p>
                  Dominio minimo: <strong>{posRelatorio.advogadoDominioCaso.sim}</strong>{' '}
                  <span className="text-slate-500">
                    ({percentual(posRelatorio.advogadoDominioCaso.sim, totalDominio)}%)
                  </span>
                </p>
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Risco Operacional</p>
              <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                <p>
                  Problema relevante: <strong className="text-red-700">{posRelatorio.problemaRelevante.sim}</strong>{' '}
                  <span className="text-slate-500">
                    ({percentual(posRelatorio.problemaRelevante.sim, totalProblema)}%)
                  </span>
                </p>
                <p>
                  Sem problema: <strong>{posRelatorio.problemaRelevante.nao}</strong>
                </p>
                <p>
                  Audiencia ocorreu: <strong>{posRelatorio.audienciaOcorreu.sim}</strong>
                </p>
                <p>
                  Nao ocorreu/remarcada:{' '}
                  <strong>{posRelatorio.audienciaOcorreu.nao + posRelatorio.audienciaOcorreu.remarcada}</strong>
                </p>
              </div>
            </article>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-900">Prioridades do Dia</h2>
            <Link to="/audiencias" className="text-sm font-medium text-primary-600 hover:text-primary-700">
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
                      <Link to={`/audiencias/${audiencia.id}`} className="text-primary-600 hover:text-primary-700">
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
                {realizadas > 0 ? (
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
                  >
                    <title>{`Realizadas: ${Math.round(pct.realizadas)}% (${realizadas} de ${totalStatus})`}</title>
                  </circle>
                ) : null}
                {pendentes > 0 ? (
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="stroke-orange-500"
                    strokeDasharray={`${dashLen.pendentes} ${CIRCULO}`}
                    transform={`rotate(${(dashLen.realizadas / CIRCULO) * 360 - 90} 50 50)`}
                  >
                    <title>{`Pendentes: ${Math.round(pct.pendentes)}% (${pendentes} de ${totalStatus})`}</title>
                  </circle>
                ) : null}
                {problemas > 0 ? (
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
                  >
                    <title>{`Problemas: ${Math.round(pct.problemas)}% (${problemas} de ${totalStatus})`}</title>
                  </circle>
                ) : null}
                {aguardando > 0 ? (
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="stroke-yellow-400"
                    strokeDasharray={`${dashLen.aguardando} ${CIRCULO}`}
                    transform={`rotate(${((dashLen.realizadas + dashLen.pendentes + dashLen.problemas) / CIRCULO) * 360 - 90} 50 50)`}
                  >
                  <title>{`Aguardando: ${Math.round(pct.aguardando)}% (${aguardando} de ${totalStatus})`}</title>
                  </circle>
                ) : null}
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">{totalStatus}</span>
                <span className="text-xs uppercase tracking-wide text-slate-500">Total</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div
                className="flex items-center justify-between text-sm"
                title={`Realizadas: ${Math.round(pct.realizadas)}% (${realizadas} de ${totalStatus})`}
              >
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-500">Realizadas</span>
                </div>
                <span className="font-semibold text-slate-900">{Math.round(pct.realizadas)}%</span>
              </div>
              <div
                className="flex items-center justify-between text-sm"
                title={`Pendentes: ${Math.round(pct.pendentes)}% (${pendentes} de ${totalStatus})`}
              >
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-orange-500" />
                  <span className="text-slate-500">Pendentes</span>
                </div>
                <span className="font-semibold text-slate-900">{Math.round(pct.pendentes)}%</span>
              </div>
              <div
                className="flex items-center justify-between text-sm"
                title={`Problemas: ${Math.round(pct.problemas)}% (${problemas} de ${totalStatus})`}
              >
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-slate-500">Problemas</span>
                </div>
                <span className="font-semibold text-slate-900">{Math.round(pct.problemas)}%</span>
              </div>
              <div
                className="flex items-center justify-between text-sm"
                title={`Aguardando: ${Math.round(pct.aguardando)}% (${aguardando} de ${totalStatus})`}
              >
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="text-slate-500">Aguardando</span>
                </div>
                <span className="font-semibold text-slate-900">{Math.round(pct.aguardando)}%</span>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Alertas operacionais</h3>
              <span className="rounded bg-primary-50 px-2 py-1 text-xs font-mono text-primary-700">
                {lembretes.length} ativos
              </span>
            </div>

            <div className="space-y-3">
              {lembretes.length === 0 ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
                  Nenhum alerta operacional ativo no momento.
                </div>
              ) : (
                lembretes.map((item) => (
                  <div key={item.titulo} className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold text-slate-900">{item.titulo}</p>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{item.detalhe}</p>
                  </div>
                ))
              )}
            </div>

            <Link
              to="/audiencias"
              className="mt-4 block w-full rounded-lg border border-primary-200 py-2 text-center text-xs font-medium text-primary-600 transition-colors hover:border-primary-300 hover:text-primary-700"
            >
              Abrir operacao
            </Link>
          </article>
        </div>
      </section>

      {proximasAudiencias.length > 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Proximas audiencias</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {proximasAudiencias.map((audiencia) => (
              <Link
                key={audiencia.id}
                to={`/audiencias/${audiencia.id}`}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-primary-300"
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
      ) : null}

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
    </div>
  )
}

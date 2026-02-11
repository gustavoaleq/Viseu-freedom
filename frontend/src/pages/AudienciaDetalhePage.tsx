import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import { formatarData, formatarDataHora, formatarTelefone } from '../lib/format'
import { STATUS_LABEL } from '../lib/status'
import { audienciasApi, prepostosApi } from '../services/hub'
import type { StatusAudiencia } from '../types'

type WorkflowEstado = 'CONCLUIDO' | 'ATIVO' | 'PENDENTE' | 'CRITICO'
type TimelineMarker = 'CHECK' | 'CLOCK' | 'ALERT' | 'SEND' | 'CHAT'

interface WorkflowItem {
  id: string
  titulo: string
  detalhe: string
  estado: WorkflowEstado
}

interface TimelineItem {
  id: string
  titulo: string
  descricao: string
  createdAt: string
  badge: string
  badgeClass: string
  marker: TimelineMarker
  markerClass: string
}

function workflowLabel(estado: WorkflowEstado) {
  if (estado === 'CONCLUIDO') return 'Concluido'
  if (estado === 'ATIVO') return 'Em andamento'
  if (estado === 'CRITICO') return 'Acao necessaria'
  return 'Futuro'
}

function workflowEstadoClass(estado: WorkflowEstado) {
  if (estado === 'CONCLUIDO') {
    return {
      chip: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    }
  }
  if (estado === 'ATIVO') {
    return {
      chip: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: 'bg-amber-100 text-amber-700 border-amber-200',
    }
  }
  if (estado === 'CRITICO') {
    return {
      chip: 'bg-rose-100 text-rose-700 border-rose-200',
      icon: 'bg-rose-100 text-rose-700 border-rose-200',
    }
  }
  return {
    chip: 'bg-slate-100 text-slate-600 border-slate-200',
    icon: 'bg-slate-100 text-slate-600 border-slate-200',
  }
}

function workflowIcon(estado: WorkflowEstado) {
  if (estado === 'CONCLUIDO') return '✓'
  if (estado === 'CRITICO') return '!'
  if (estado === 'ATIVO') return '•'
  return '·'
}

function timelineStatusVisual(status: StatusAudiencia) {
  if (status === 'CONCLUIDA' || status === 'CONFIRMADA' || status === 'EM_ANDAMENTO') {
    return {
      marker: 'CHECK' as const,
      markerClass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    }
  }

  if (status === 'SUBSTITUICAO_NECESSARIA' || status === 'NAO_POSSO' || status === 'CANCELADA') {
    return {
      marker: 'ALERT' as const,
      markerClass: 'bg-rose-100 text-rose-700 border-rose-200',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    }
  }

  return {
    marker: 'CLOCK' as const,
    markerClass: 'bg-amber-100 text-amber-700 border-amber-200',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
  }
}

function markerIcon(marker: TimelineMarker) {
  if (marker === 'CHECK') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.5]">
        <path d="M5 13.5L10 18L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (marker === 'ALERT') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
        <path d="M12 8V13" strokeLinecap="round" />
        <path d="M12 16.5V16.6" strokeLinecap="round" />
        <path d="M10.3 3.2L2.9 16.1A2 2 0 0 0 4.6 19h14.8a2 2 0 0 0 1.7-2.9L13.7 3.2A2 2 0 0 0 10.3 3.2Z" />
      </svg>
    )
  }

  if (marker === 'SEND') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
        <path d="M21 3L10 14" strokeLinecap="round" />
        <path d="M21 3L14 21L10 14L3 10L21 3Z" strokeLinejoin="round" />
      </svg>
    )
  }

  if (marker === 'CHAT') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
        <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8V12.5L15 14.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function formatarHoraCurta(valor: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(valor))
}

function formatarDiaCurto(valor: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(valor))
}

function construirWorkflow(status: StatusAudiencia): WorkflowItem[] {
  const lembreteEstado: WorkflowEstado = ['IMPORTADA', 'AGENDADA'].includes(status) ? 'PENDENTE' : 'CONCLUIDO'
  const checkinEstado: WorkflowEstado = ['SUBSTITUICAO_NECESSARIA', 'SEM_RESPOSTA', 'NAO_POSSO'].includes(status)
    ? 'CRITICO'
    : ['EM_ANDAMENTO', 'RELATORIO_PENDENTE', 'CONCLUIDA'].includes(status)
      ? 'CONCLUIDO'
      : ['CONFIRMADA', 'CHECK_IN_PENDENTE', 'A_CONFIRMAR'].includes(status)
        ? 'ATIVO'
        : 'PENDENTE'
  const posEstado: WorkflowEstado = status === 'CONCLUIDA' ? 'CONCLUIDO' : status === 'RELATORIO_PENDENTE' ? 'ATIVO' : 'PENDENTE'

  return [
    {
      id: 'lembrete',
      titulo: 'Lembrete D-1',
      detalhe: 'Contato inicial para confirmar preposto e disponibilidade.',
      estado: lembreteEstado,
    },
    {
      id: 'checkin',
      titulo: 'Check-in H-1h30',
      detalhe: 'Acompanhamento de deslocamento e confirmacao de chegada.',
      estado: checkinEstado,
    },
    {
      id: 'relatorio',
      titulo: 'Pos-audiencia',
      detalhe: 'Registro do resultado e relato final no sistema.',
      estado: posEstado,
    },
  ]
}

export function AudienciaDetalhePage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const [prepostoNovoId, setPrepostoNovoId] = useState('')
  const [motivoTroca, setMotivoTroca] = useState('')
  const [observacaoTelefone, setObservacaoTelefone] = useState('')
  const [motivoCancelamento, setMotivoCancelamento] = useState('')
  const [relatorio, setRelatorio] = useState({
    audienciaOcorreu: 'SIM' as 'SIM' | 'NAO' | 'REMARCADA',
    resultado: 'ACORDO' as 'ACORDO' | 'SEM_ACORDO' | 'AUSENCIA' | 'REDESIGNADA',
    advogadoPresente: true,
    advogadoDominioCaso: true,
    problemaRelevante: false,
    relato: '',
  })

  const detalhe = useQuery({
    queryKey: ['audiencia-detalhe', id],
    queryFn: () => audienciasApi.buscarPorId(id || ''),
    enabled: !!id,
  })

  const prepostos = useQuery({
    queryKey: ['prepostos-troca'],
    queryFn: () => prepostosApi.listar({ page: 1, limit: 200, ativo: true }),
    staleTime: 1000 * 60 * 5,
  })

  const refreshKeys = useMemo(
    () => [
      ['audiencia-detalhe', id],
      ['audiencias-lista'],
      ['dashboard'],
      ['kanban'],
    ],
    [id],
  )

  function refreshTudo() {
    for (const key of refreshKeys) {
      queryClient.invalidateQueries({ queryKey: key })
    }
  }

  const trocarPreposto = useMutation({
    mutationFn: () => audienciasApi.trocarPreposto(id || '', prepostoNovoId, motivoTroca),
    onSuccess: () => {
      setPrepostoNovoId('')
      setMotivoTroca('')
      refreshTudo()
    },
  })

  const reenviar = useMutation({
    mutationFn: () => audienciasApi.reenviarConfirmacao(id || ''),
    onSuccess: refreshTudo,
  })

  const confirmarTelefone = useMutation({
    mutationFn: () => audienciasApi.confirmarPorTelefone(id || '', observacaoTelefone),
    onSuccess: () => {
      setObservacaoTelefone('')
      refreshTudo()
    },
  })

  const cancelar = useMutation({
    mutationFn: () => audienciasApi.cancelar(id || '', motivoCancelamento),
    onSuccess: () => {
      setMotivoCancelamento('')
      refreshTudo()
    },
  })

  const checkIn = useMutation({
    mutationFn: (evento: 'ESTOU_A_CAMINHO' | 'JA_CHEGUEI' | 'ESTOU_COM_PROBLEMA') =>
      audienciasApi.checkIn(id || '', evento),
    onSuccess: refreshTudo,
  })

  const salvarRelatorio = useMutation({
    mutationFn: () => audienciasApi.salvarRelatorio(id || '', relatorio),
    onSuccess: refreshTudo,
  })

  function submitTroca(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    trocarPreposto.mutate()
  }

  function submitConfirmacaoTelefone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    confirmarTelefone.mutate()
  }

  function submitCancelamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    cancelar.mutate()
  }

  function submitRelatorio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    salvarRelatorio.mutate()
  }

  const audiencia = detalhe.data
  const workflow = audiencia ? construirWorkflow(audiencia.status) : []
  const timeline: TimelineItem[] = audiencia
    ? [
        ...audiencia.historicoStatus.map((item) => {
          const visual = timelineStatusVisual(item.statusNovo)
          return {
            id: `status-${item.id}`,
            titulo: `Status: ${STATUS_LABEL[item.statusNovo]}`,
            descricao: item.motivo || `${STATUS_LABEL[item.statusAnterior]} -> ${STATUS_LABEL[item.statusNovo]}`,
            createdAt: item.createdAt,
            badge: 'Evento do sistema',
            badgeClass: visual.badgeClass,
            marker: visual.marker,
            markerClass: visual.markerClass,
          }
        }),
        ...audiencia.mensagens.map((mensagem) => ({
          id: `msg-${mensagem.id}`,
          titulo: `${mensagem.direcao === 'ENVIADA' ? 'Mensagem enviada' : 'Mensagem recebida'} (${mensagem.tipo})`,
          descricao: mensagem.conteudo,
          createdAt: mensagem.createdAt,
          badge: mensagem.direcao === 'ENVIADA' ? 'Comando' : 'Resposta',
          badgeClass:
            mensagem.direcao === 'ENVIADA'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-violet-50 text-violet-700 border-violet-200',
          marker: (mensagem.direcao === 'ENVIADA' ? 'SEND' : 'CHAT') as TimelineMarker,
          markerClass:
            mensagem.direcao === 'ENVIADA'
              ? 'bg-blue-100 text-blue-700 border-blue-200'
              : 'bg-violet-100 text-violet-700 border-violet-200',
        })),
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : []

  if (!id) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        ID da audiencia nao informado.
      </div>
    )
  }

  if (detalhe.isLoading) {
    return <p className="text-sm text-slate-500">Carregando detalhe da audiencia...</p>
  }

  if (detalhe.isError || !audiencia) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Erro ao carregar detalhe da audiencia.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link to="/audiencias" className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Voltar para lista
          </Link>
          <h1 className="mt-1 font-display text-3xl font-semibold text-slate-900">Audiencia {audiencia.numeroProcesso}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {formatarData(audiencia.data)} as {audiencia.hora} | {audiencia.trt?.nome}
          </p>
        </div>
        <StatusBadge status={audiencia.status} />
      </header>

      <section className="grid gap-6 lg:grid-cols-12">
        <aside className="space-y-4 lg:col-span-4">
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Resumo</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="text-xs text-slate-500">Reclamante</dt>
                <dd className="font-medium text-slate-900">{audiencia.reclamante || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Reclamada</dt>
                <dd className="font-medium text-slate-900">{audiencia.reclamada || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Tipo de audiencia</dt>
                <dd className="font-medium text-slate-900">{audiencia.tipoAudiencia || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Modalidade</dt>
                <dd className="font-medium text-slate-900">{audiencia.modalidade}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Comarca</dt>
                <dd className="font-medium text-slate-900">{audiencia.comarca || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Local / Link</dt>
                <dd className="font-medium text-slate-900">
                  {audiencia.local || audiencia.link || '-'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Vara</dt>
                <dd className="font-medium text-slate-900">{audiencia.vara || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Preposto atual</dt>
                <dd className="font-medium text-slate-900">{audiencia.preposto?.nome || '-'}</dd>
                <dd className="text-xs text-slate-500">{formatarTelefone(audiencia.preposto?.telefoneWhatsapp)}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Advogado</dt>
                <dd className="font-medium text-slate-900">{audiencia.advogado || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Contato advogado</dt>
                <dd className="font-medium text-slate-900">{audiencia.contatoAdvogado || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Parceiro</dt>
                <dd className="font-medium text-slate-900">{audiencia.parceiro?.nome || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Correspondente</dt>
                <dd className="font-medium text-slate-900">{audiencia.correspondente || '-'}</dd>
              </div>
            </dl>
          </article>

          <article className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Workflow</h2>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                {STATUS_LABEL[audiencia.status]}
              </span>
            </div>
            <div className="space-y-2">
              {workflow.map((item) => {
                const estilo = workflowEstadoClass(item.estado)

                return (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold ${estilo.icon}`}
                      >
                        {workflowIcon(item.estado)}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-slate-900">{item.titulo}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${estilo.chip}`}>
                            {workflowLabel(item.estado)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{item.detalhe}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <button
              onClick={() => reenviar.mutate()}
              className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
            >
              Disparar lembrete agora
            </button>
          </article>

          <article className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Acoes rapidas</h2>
            <button
              onClick={() => reenviar.mutate()}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 hover:border-primary hover:text-primary"
            >
              Reenviar confirmacao D-1
            </button>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => checkIn.mutate('ESTOU_A_CAMINHO')}
                className="rounded border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs hover:border-primary hover:text-primary"
              >
                A caminho
              </button>
              <button
                onClick={() => checkIn.mutate('JA_CHEGUEI')}
                className="rounded border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs hover:border-primary hover:text-primary"
              >
                Ja cheguei
              </button>
              <button
                onClick={() => checkIn.mutate('ESTOU_COM_PROBLEMA')}
                className="rounded border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs hover:border-primary hover:text-primary"
              >
                Problema
              </button>
            </div>
          </article>

          <form onSubmit={submitTroca} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trocar preposto</h2>
            <select
              value={prepostoNovoId}
              required
              onChange={(event) => setPrepostoNovoId(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary/25 focus:ring"
            >
              <option value="">Selecione um preposto</option>
              {prepostos.data?.dados
                .filter((preposto) => preposto.id !== audiencia.prepostoId)
                .map((preposto) => (
                  <option key={preposto.id} value={preposto.id}>
                    {preposto.nome}
                  </option>
                ))}
            </select>
            <input
              required
              value={motivoTroca}
              onChange={(event) => setMotivoTroca(event.target.value)}
              placeholder="Motivo"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary/25 focus:ring"
            />
            <button
              type="submit"
              disabled={trocarPreposto.isPending}
              className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
            >
              Trocar preposto
            </button>
          </form>

          <form onSubmit={submitConfirmacaoTelefone} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Confirmacao manual por telefone</h2>
            <input
              required
              value={observacaoTelefone}
              onChange={(event) => setObservacaoTelefone(event.target.value)}
              placeholder="Observacao"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary/25 focus:ring"
            />
            <button
              type="submit"
              disabled={confirmarTelefone.isPending}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 hover:border-primary hover:text-primary disabled:opacity-60"
            >
              Confirmar por telefone
            </button>
          </form>

          <form onSubmit={submitCancelamento} className="space-y-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Cancelar audiencia</h2>
            <input
              required
              value={motivoCancelamento}
              onChange={(event) => setMotivoCancelamento(event.target.value)}
              placeholder="Motivo"
              className="w-full rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm outline-none ring-rose-200 focus:ring"
            />
            <button
              type="submit"
              disabled={cancelar.isPending}
              className="w-full rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
            >
              Cancelar
            </button>
          </form>
        </aside>

        <section className="space-y-4 lg:col-span-8">
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Linha do tempo</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Registro operacional completo com eventos do sistema e interacoes manuais.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              {timeline.length === 0 ? (
                <p className="text-sm text-slate-500">Sem historico de status.</p>
              ) : (
                <div className="relative">
                  <div className="absolute bottom-2 left-24 top-2 w-px bg-slate-200" />
                  <div className="space-y-4">
                    {timeline.map((item) => (
                      <div key={item.id} className="relative pl-32">
                        <div className="absolute left-0 top-1 w-20 text-right">
                          <p className="text-xs font-bold text-slate-700">{formatarHoraCurta(item.createdAt)}</p>
                          <p className="text-[11px] text-slate-500">{formatarDiaCurto(item.createdAt)}</p>
                        </div>

                        <div
                          className={`absolute left-24 top-0.5 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white ${item.markerClass}`}
                        >
                          {markerIcon(item.marker)}
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-slate-900">{item.titulo}</p>
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${item.badgeClass}`}>
                              {item.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-600">{item.descricao}</p>
                          <p className="mt-2 text-xs text-slate-500">{formatarDataHora(item.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Relatorio pos-audiencia</h2>
            <form onSubmit={submitRelatorio} className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-xs text-slate-500">Audiencia ocorreu</span>
                <select
                  value={relatorio.audienciaOcorreu}
                  onChange={(event) =>
                    setRelatorio((anterior) => ({
                      ...anterior,
                      audienciaOcorreu: event.target.value as 'SIM' | 'NAO' | 'REMARCADA',
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary/25 focus:ring"
                >
                  <option value="SIM">SIM</option>
                  <option value="NAO">NAO</option>
                  <option value="REMARCADA">REMARCADA</option>
                </select>
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-xs text-slate-500">Resultado</span>
                <select
                  value={relatorio.resultado}
                  onChange={(event) =>
                    setRelatorio((anterior) => ({
                      ...anterior,
                      resultado: event.target.value as 'ACORDO' | 'SEM_ACORDO' | 'AUSENCIA' | 'REDESIGNADA',
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary/25 focus:ring"
                >
                  <option value="ACORDO">ACORDO</option>
                  <option value="SEM_ACORDO">SEM_ACORDO</option>
                  <option value="AUSENCIA">AUSENCIA</option>
                  <option value="REDESIGNADA">REDESIGNADA</option>
                </select>
              </label>

              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={relatorio.advogadoPresente}
                  onChange={(event) => setRelatorio((anterior) => ({ ...anterior, advogadoPresente: event.target.checked }))}
                />
                Advogado presente
              </label>

              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={relatorio.advogadoDominioCaso}
                  onChange={(event) =>
                    setRelatorio((anterior) => ({ ...anterior, advogadoDominioCaso: event.target.checked }))
                  }
                />
                Advogado dominava o caso
              </label>

              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm md:col-span-2">
                <input
                  type="checkbox"
                  checked={relatorio.problemaRelevante}
                  onChange={(event) => setRelatorio((anterior) => ({ ...anterior, problemaRelevante: event.target.checked }))}
                />
                Problema relevante identificado
              </label>

              <label className="text-sm md:col-span-2">
                <span className="mb-1 block text-xs text-slate-500">Relato</span>
                <textarea
                  value={relatorio.relato}
                  onChange={(event) => setRelatorio((anterior) => ({ ...anterior, relato: event.target.value }))}
                  className="h-24 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary/25 focus:ring"
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={salvarRelatorio.isPending}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
                >
                  Salvar relatorio
                </button>
              </div>
            </form>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Mensagens detalhadas</h2>
            <div className="mt-3 space-y-3">
              {audiencia.mensagens.length === 0 ? (
                <p className="text-sm text-slate-500">Sem mensagens registradas.</p>
              ) : (
                audiencia.mensagens.map((mensagem) => (
                  <div key={mensagem.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-900">{mensagem.tipo} ({mensagem.direcao})</p>
                    <p className="mt-1 text-sm text-slate-900">{mensagem.conteudo}</p>
                    <p className="mt-1 text-xs text-slate-500">{mensagem.statusEnvio} | {formatarDataHora(mensagem.createdAt)}</p>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Substituicoes</h2>
            <div className="mt-3 space-y-3">
              {audiencia.substituicoes.length === 0 ? (
                <p className="text-sm text-slate-500">Sem substituicoes registradas.</p>
              ) : (
                audiencia.substituicoes.map((substituicao) => (
                  <div key={substituicao.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-900">
                      {substituicao.prepostoAnterior?.nome || 'Preposto anterior'} {'->'} {substituicao.prepostoNovo?.nome || 'A definir'}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{substituicao.status} | {substituicao.motivo}</p>
                  </div>
                ))
              )}
            </div>
          </article>
        </section>
      </section>
    </div>
  )
}

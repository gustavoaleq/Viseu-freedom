import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import { formatarData, formatarDataHora, formatarTelefone } from '../lib/format'
import { STATUS_LABEL } from '../lib/status'
import { audienciasApi, authApi, prepostosApi } from '../services/hub'
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

interface CollapsibleCardProps {
  titulo: string
  descricao?: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

function CollapsibleCard({
  titulo,
  descricao,
  children,
  defaultOpen = false,
  className = '',
}: CollapsibleCardProps) {
  return (
    <details
      open={defaultOpen}
      className={`group rounded-xl border border-slate-200 bg-white p-4 ${className}`.trim()}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{titulo}</h2>
          {descricao ? <p className="mt-1 text-xs text-slate-500">{descricao}</p> : null}
        </div>
        <span className="rounded-md border border-slate-200 bg-slate-50 p-1 text-slate-500 transition-transform group-open:rotate-180">
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-2">
            <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  )
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
      chip: 'bg-primary-100 text-primary-700 border-primary-200',
      icon: 'bg-primary-100 text-primary-700 border-primary-200',
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
      markerClass: 'bg-primary-100 text-primary-700 border-primary-200',
      badgeClass: 'bg-primary-50 text-primary-700 border-primary-200',
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

function classeStatusAutomacao(status?: string | null) {
  if (status === 'PENDENTE') return 'bg-amber-50 text-amber-700 border-amber-200'
  if (status === 'ERRO') return 'bg-rose-50 text-rose-700 border-rose-200'
  if (status === 'IGNORADO') return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-primary-50 text-primary-700 border-primary-200'
}

function statusAutomacaoExibicao(log: {
  evento: string
  status?: 'PENDENTE' | 'SUCESSO' | 'IGNORADO' | 'ERRO' | null
}) {
  if (log.evento === 'AGENDAMENTO') return 'PENDENTE'
  return log.status || 'SUCESSO'
}

function dataProgramadaLog(log: {
  evento: string
  metadados?: Record<string, unknown> | null
}) {
  if (log.evento !== 'AGENDAMENTO') return null
  const valor = log.metadados?.scheduledFor
  return typeof valor === 'string' ? valor : null
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
      titulo: 'Check-in',
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

type ProximaAcaoWorkflow = 'D1' | 'CHECKIN' | 'POS'

function descobrirProximaAcaoWorkflow(params: {
  status: StatusAudiencia
  mensagens: Array<{ tipo: string; direcao: 'ENVIADA' | 'RECEBIDA' }>
}): ProximaAcaoWorkflow {
  if (params.status === 'CANCELADA') return 'D1'

  const d1Enviado = params.mensagens.some(
    (mensagem) => mensagem.tipo === 'CONFIRMACAO_D1' && mensagem.direcao === 'ENVIADA',
  )
  const checkInEnviado = params.mensagens.some(
    (mensagem) => mensagem.tipo === 'CHECK_IN' && mensagem.direcao === 'ENVIADA',
  )
  const posEnviado = params.mensagens.some(
    (mensagem) => mensagem.tipo === 'RELATORIO_POS' && mensagem.direcao === 'ENVIADA',
  )

  if (!d1Enviado) return 'D1'
  if (!checkInEnviado) return 'CHECKIN'
  if (!posEnviado) return 'POS'
  return 'D1'
}

export function AudienciaDetalhePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [prepostoNovoId, setPrepostoNovoId] = useState('')
  const [motivoTroca, setMotivoTroca] = useState('')
  const [observacaoCheckIn, setObservacaoCheckIn] = useState('')
  const [observacaoConfirmacaoTelefone, setObservacaoConfirmacaoTelefone] = useState('')
  const [motivoCancelamento, setMotivoCancelamento] = useState('')
  const [confirmacaoDelete, setConfirmacaoDelete] = useState('')
  const [erroDownloadRelatorio, setErroDownloadRelatorio] = useState('')
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

  const auth = useQuery({
    queryKey: ['auth-me'],
    queryFn: authApi.me,
    staleTime: 1000 * 60 * 5,
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

  const dispararD1 = useMutation({
    mutationFn: () => audienciasApi.dispararD1(id || ''),
    onSuccess: refreshTudo,
  })

  const dispararCheckInWhatsApp = useMutation({
    mutationFn: () => audienciasApi.dispararCheckIn(id || ''),
    onSuccess: refreshTudo,
  })

  const dispararReiteracao6h = useMutation({
    mutationFn: () => audienciasApi.dispararReiteracao6h(id || ''),
    onSuccess: refreshTudo,
  })

  const dispararPosAudiencia = useMutation({
    mutationFn: () => audienciasApi.dispararPosAudiencia(id || ''),
    onSuccess: refreshTudo,
  })

  const cancelar = useMutation({
    mutationFn: () => audienciasApi.cancelar(id || '', motivoCancelamento),
    onSuccess: () => {
      setMotivoCancelamento('')
      refreshTudo()
    },
  })

  const confirmarTelefone = useMutation({
    mutationFn: () =>
      audienciasApi.confirmarPorTelefone(id || '', observacaoConfirmacaoTelefone.trim()),
    onSuccess: () => {
      setObservacaoConfirmacaoTelefone('')
      refreshTudo()
    },
  })

  const checkIn = useMutation({
    mutationFn: ({
      evento,
      observacao,
    }: {
      evento: 'ESTOU_A_CAMINHO' | 'JA_CHEGUEI' | 'ESTOU_COM_PROBLEMA'
      observacao?: string
    }) => audienciasApi.checkIn(id || '', evento, observacao),
    onSuccess: () => {
      setObservacaoCheckIn('')
      refreshTudo()
    },
  })

  const salvarRelatorio = useMutation({
    mutationFn: () => audienciasApi.salvarRelatorio(id || '', relatorio),
    onSuccess: refreshTudo,
  })

  const baixarRelatorioPos = useMutation({
    mutationFn: () => audienciasApi.baixarRelatorioPos(id || ''),
    onMutate: () => {
      setErroDownloadRelatorio('')
    },
    onSuccess: ({ blob, nomeArquivo }) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = nomeArquivo
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    },
    onError: () => {
      setErroDownloadRelatorio('Nao foi possivel baixar o relatorio pos-audiencia.')
    },
  })

  const deletarDefinitivo = useMutation({
    mutationFn: () => audienciasApi.deletarDefinitivo(id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audiencias-lista'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['kanban'] })
      navigate('/audiencias')
    },
  })

  function submitTroca(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    trocarPreposto.mutate()
  }

  function submitCancelamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    cancelar.mutate()
  }

  function submitConfirmacaoTelefone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    confirmarTelefone.mutate()
  }

  function submitRelatorio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    salvarRelatorio.mutate()
  }

  function submitDeleteDefinitivo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    deletarDefinitivo.mutate()
  }

  const audiencia = detalhe.data
  const logsAutomacao = audiencia?.logsAutomacao ?? []
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
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : []
  const proximaAcaoWorkflow = audiencia
    ? descobrirProximaAcaoWorkflow({
        status: audiencia.status,
        mensagens: audiencia.mensagens,
      })
    : 'D1'
  const bloqueadoParaCheckIn =
    !!audiencia &&
    proximaAcaoWorkflow === 'CHECKIN' &&
    ['NAO_POSSO', 'SUBSTITUICAO_NECESSARIA'].includes(audiencia.status)
  const workflowButton =
    proximaAcaoWorkflow === 'D1'
      ? {
          label: 'Disparar confirmacao D-1 (WhatsApp)',
          loading: 'Enviando D-1...',
          onClick: () => dispararD1.mutate(),
          isPending: dispararD1.isPending,
          isError: dispararD1.isError,
          isSuccess: dispararD1.isSuccess,
          successText: 'D-1 disparado com sucesso via WhatsApp.',
          errorText: 'Falha ao disparar D-1. Verifique a configuracao do WhatsApp.',
          blockedText: undefined,
        }
      : proximaAcaoWorkflow === 'CHECKIN'
        ? {
            label: 'Disparar check-in (WhatsApp)',
            loading: 'Enviando check-in...',
            onClick: () => dispararCheckInWhatsApp.mutate(),
            isPending: dispararCheckInWhatsApp.isPending,
            isError: dispararCheckInWhatsApp.isError,
            isSuccess: dispararCheckInWhatsApp.isSuccess,
            successText: 'Check-in disparado com sucesso via WhatsApp.',
            errorText: 'Falha ao disparar check-in. Verifique a configuracao do WhatsApp.',
            blockedText: bloqueadoParaCheckIn
              ? 'Check-in bloqueado: preposto indisponivel. Resolva a substituicao para continuar.'
              : undefined,
          }
        : {
            label: 'Disparar pos-audiencia (WhatsApp)',
            loading: 'Enviando pos-audiencia...',
            onClick: () => dispararPosAudiencia.mutate(),
            isPending: dispararPosAudiencia.isPending,
            isError: dispararPosAudiencia.isError,
            isSuccess: dispararPosAudiencia.isSuccess,
            successText: 'Pos-audiencia disparado com sucesso via WhatsApp.',
            errorText: 'Falha ao disparar pos-audiencia. Verifique a configuracao do WhatsApp.',
            blockedText: undefined,
          }
  const isAdmin = auth.data?.role === 'ADMIN'
  const deleteConfirmacaoValida = confirmacaoDelete.trim().toUpperCase() === 'DELETAR'

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
        <div className="flex items-center gap-2">
          {audiencia.status === 'CONCLUIDA' ? (
            <button
              type="button"
              onClick={() => baixarRelatorioPos.mutate()}
              disabled={baixarRelatorioPos.isPending}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {baixarRelatorioPos.isPending ? 'Baixando relatorio...' : 'Baixar relatorio pos-audiencia'}
            </button>
          ) : null}
          <StatusBadge status={audiencia.status} />
        </div>
      </header>
      {erroDownloadRelatorio ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
          {erroDownloadRelatorio}
        </p>
      ) : null}

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
              <span className="rounded-full border border-primary-200 bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700">
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
              onClick={workflowButton.onClick}
              disabled={workflowButton.isPending || bloqueadoParaCheckIn}
              className="w-full rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-100 disabled:opacity-60"
            >
              {workflowButton.isPending ? workflowButton.loading : workflowButton.label}
            </button>
            {workflowButton.blockedText && <p className="text-xs text-amber-700">{workflowButton.blockedText}</p>}
            {workflowButton.isError && <p className="text-xs text-rose-600">{workflowButton.errorText}</p>}
            {workflowButton.isSuccess && <p className="text-xs text-emerald-600">{workflowButton.successText}</p>}
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

          <article className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Disparos WhatsApp</h2>
            <p className="text-xs text-slate-500">Enviar mensagens com botoes de resposta diretamente para o preposto via WhatsApp.</p>

            <button
              onClick={() => dispararD1.mutate()}
              disabled={dispararD1.isPending}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 hover:border-primary hover:text-primary disabled:opacity-60"
            >
              {dispararD1.isPending ? 'Enviando...' : 'Enviar confirmacao D-1'}
            </button>

            <button
              onClick={() => dispararCheckInWhatsApp.mutate()}
              disabled={dispararCheckInWhatsApp.isPending}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 hover:border-primary hover:text-primary disabled:opacity-60"
            >
              {dispararCheckInWhatsApp.isPending ? 'Enviando...' : 'Enviar check-in no dia'}
            </button>

            <button
              onClick={() => dispararReiteracao6h.mutate()}
              disabled={dispararReiteracao6h.isPending}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 hover:border-primary hover:text-primary disabled:opacity-60"
            >
              {dispararReiteracao6h.isPending ? 'Enviando...' : 'Enviar reiteracao'}
            </button>

            <button
              onClick={() => dispararPosAudiencia.mutate()}
              disabled={dispararPosAudiencia.isPending}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 hover:border-primary hover:text-primary disabled:opacity-60"
            >
              {dispararPosAudiencia.isPending ? 'Enviando...' : 'Enviar pos-audiencia'}
            </button>

            {(dispararD1.isError ||
              dispararCheckInWhatsApp.isError ||
              dispararReiteracao6h.isError ||
              dispararPosAudiencia.isError) && (
              <p className="text-xs text-rose-600">Falha no disparo. Verifique a configuracao do WhatsApp e o preposto vinculado.</p>
            )}
            {(dispararD1.isSuccess ||
              dispararCheckInWhatsApp.isSuccess ||
              dispararReiteracao6h.isSuccess ||
              dispararPosAudiencia.isSuccess) && (
              <p className="text-xs text-emerald-600">Mensagem disparada com sucesso via WhatsApp.</p>
            )}
          </article>

          <CollapsibleCard
            titulo="Acoes manuais (sistema)"
            descricao="Comandos operacionais de contingencia e ajustes manuais."
          >
            <div className="space-y-3">
              <button
                onClick={() => reenviar.mutate()}
                disabled={reenviar.isPending}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 hover:border-primary hover:text-primary disabled:opacity-60"
              >
                Reenviar confirmacao (legado)
              </button>

              <form
                onSubmit={submitConfirmacaoTelefone}
                className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Confirmacao manual por telefone
                </h3>
                <input
                  required
                  value={observacaoConfirmacaoTelefone}
                  onChange={(event) => setObservacaoConfirmacaoTelefone(event.target.value)}
                  placeholder="Ex.: Confirmado por telefone com o preposto as 10:15"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/25 focus:ring"
                />
                <button
                  type="submit"
                  disabled={confirmarTelefone.isPending}
                  className="w-full rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-100 disabled:opacity-60"
                >
                  {confirmarTelefone.isPending ? 'Confirmando...' : 'Confirmar por telefone'}
                </button>
                {confirmarTelefone.isError ? (
                  <p className="text-xs text-rose-600">Falha ao registrar confirmacao por telefone.</p>
                ) : null}
                {confirmarTelefone.isSuccess ? (
                  <p className="text-xs text-emerald-600">Confirmacao por telefone registrada.</p>
                ) : null}
              </form>

              <label className="block text-xs text-slate-500">
                Observacao de check-in
                <textarea
                  value={observacaoCheckIn}
                  onChange={(event) => setObservacaoCheckIn(event.target.value)}
                  placeholder="Opcional: contexto rapido do deslocamento"
                  className="mt-1 h-20 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary/25 focus:ring"
                />
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() =>
                    checkIn.mutate({
                      evento: 'ESTOU_A_CAMINHO',
                      observacao: observacaoCheckIn.trim() || undefined,
                    })
                  }
                  disabled={checkIn.isPending}
                  className="rounded border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs hover:border-primary hover:text-primary disabled:opacity-60"
                >
                  A caminho
                </button>
                <button
                  onClick={() =>
                    checkIn.mutate({
                      evento: 'JA_CHEGUEI',
                      observacao: observacaoCheckIn.trim() || undefined,
                    })
                  }
                  disabled={checkIn.isPending}
                  className="rounded border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs hover:border-primary hover:text-primary disabled:opacity-60"
                >
                  Ja cheguei
                </button>
                <button
                  onClick={() =>
                    checkIn.mutate({
                      evento: 'ESTOU_COM_PROBLEMA',
                      observacao: observacaoCheckIn.trim() || undefined,
                    })
                  }
                  disabled={checkIn.isPending}
                  className="rounded border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs hover:border-primary hover:text-primary disabled:opacity-60"
                >
                  Problema
                </button>
              </div>

              <form onSubmit={submitCancelamento} className="space-y-2 rounded-lg border border-rose-200 bg-rose-50 p-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Cancelar audiencia</h3>
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

              {isAdmin ? (
                <form
                  onSubmit={submitDeleteDefinitivo}
                  className="space-y-2 rounded-lg border border-rose-300 bg-rose-100 p-3"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-800">
                    Deletar audiencia (definitivo)
                  </h3>
                  <p className="text-xs text-rose-700">
                    Remove permanentemente a audiencia e todos os registros vinculados (mensagens,
                    historico, substituicoes, relatorio e logs).
                  </p>
                  <input
                    required
                    value={confirmacaoDelete}
                    onChange={(event) => setConfirmacaoDelete(event.target.value)}
                    placeholder="Digite DELETAR para confirmar"
                    className="w-full rounded-lg border border-rose-300 bg-white px-3 py-2 text-sm outline-none ring-rose-200 focus:ring"
                  />
                  <button
                    type="submit"
                    disabled={deletarDefinitivo.isPending || !deleteConfirmacaoValida}
                    className="w-full rounded-lg bg-rose-700 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-800 disabled:opacity-60"
                  >
                    {deletarDefinitivo.isPending ? 'Deletando...' : 'Deletar audiencia'}
                  </button>
                  {deletarDefinitivo.isError ? (
                    <p className="text-xs text-rose-700">Falha ao deletar audiencia.</p>
                  ) : null}
                </form>
              ) : null}
            </div>
          </CollapsibleCard>
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

          <CollapsibleCard
            titulo="Mensagens detalhadas"
            descricao="Historico completo das mensagens enviadas e recebidas nesta audiencia."
          >
            <div className="space-y-3">
              {audiencia.mensagens.length === 0 ? (
                <p className="text-sm text-slate-500">Sem mensagens registradas.</p>
              ) : (
                audiencia.mensagens.map((mensagem) => (
                  <div
                    key={mensagem.id}
                    className={`rounded-lg border p-3 ${
                      mensagem.direcao === 'ENVIADA'
                        ? 'border-slate-200 bg-slate-50'
                        : 'border-slate-300 bg-slate-100'
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-900">{mensagem.tipo} ({mensagem.direcao})</p>
                    <p className="mt-1 text-sm text-slate-900">{mensagem.conteudo}</p>
                    <p className="mt-1 text-xs text-slate-500">{mensagem.statusEnvio} | {formatarDataHora(mensagem.createdAt)}</p>
                  </div>
                ))
              )}
            </div>
          </CollapsibleCard>

          <CollapsibleCard
            titulo="Auditoria da automacao"
            descricao="Eventos de scheduler, worker e webhook para rastrear cada etapa do workflow WhatsApp."
          >
            <div className="space-y-2">
              {logsAutomacao.length === 0 ? (
                <p className="text-sm text-slate-500">Sem eventos de automacao registrados.</p>
              ) : (
                logsAutomacao.map((log) => {
                  const statusExibicao = statusAutomacaoExibicao(log)
                  const agendadoPara = dataProgramadaLog(log)

                  return (
                    <div key={log.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900">
                          {log.evento} {log.etapa ? `| ${log.etapa}` : ''}
                        </p>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${classeStatusAutomacao(statusExibicao)}`}>
                          {statusExibicao}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-700">{log.mensagem}</p>
                      {agendadoPara ? (
                        <p className="mt-1 text-xs text-slate-600">
                          Agendado para: {formatarDataHora(agendadoPara)}
                        </p>
                      ) : null}
                      <p className="mt-1 text-xs text-slate-500">
                        {log.origem} | registrado em {formatarDataHora(log.createdAt)}
                      </p>
                    </div>
                  )
                })
              )}
            </div>
          </CollapsibleCard>

          <CollapsibleCard
            titulo="Relatorio pos-audiencia"
            descricao="Registro final da audiencia para fechamento operacional."
          >
            <form onSubmit={submitRelatorio} className="grid gap-3 md:grid-cols-2">
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
          </CollapsibleCard>

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

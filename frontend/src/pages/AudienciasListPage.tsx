import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format as formatarDataFns } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import { Link, useSearchParams } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import { formatarData } from '../lib/format'
import { STATUS_AUDIENCIA } from '../types'
import { audienciasApi, parceirosApi, prepostosApi, trtsApi } from '../services/hub'
import 'react-day-picker/style.css'

function baixarArquivo(blob: Blob, nome: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = nome
  link.click()
  window.URL.revokeObjectURL(url)
}

function paraYmd(data?: Date) {
  if (!data) return undefined
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

export function AudienciasListPage() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const statusQuery = (searchParams.get('status') ?? '').trim().toUpperCase()

  const [page, setPage] = useState(1)
  const [busca, setBusca] = useState('')
  const [status, setStatus] = useState(
    STATUS_AUDIENCIA.some((item) => item === statusQuery) ? statusQuery : '',
  )
  const [trtId, setTrtId] = useState('')
  const [prepostoId, setPrepostoId] = useState('')
  const [parceiroId, setParceiroId] = useState('')
  const [modalidade, setModalidade] = useState('')
  const [periodo, setPeriodo] = useState<DateRange | undefined>()
  const [calendarioAberto, setCalendarioAberto] = useState(false)
  const calendarioRef = useRef<HTMLDivElement>(null)
  const [mostrarNovo, setMostrarNovo] = useState(false)

  const periodoSelecionado = useMemo(() => {
    return {
      dataInicio: paraYmd(periodo?.from),
      dataFim: paraYmd(periodo?.to),
    }
  }, [periodo])

  const textoPeriodo = useMemo(() => {
    if (periodo?.from && periodo?.to) {
      return `${formatarDataFns(periodo.from, 'dd/MM/yyyy')} - ${formatarDataFns(periodo.to, 'dd/MM/yyyy')}`
    }
    if (periodo?.from) {
      return `${formatarDataFns(periodo.from, 'dd/MM/yyyy')} - ...`
    }
    return 'Selecione o periodo'
  }, [periodo])

  useEffect(() => {
    function aoClicarFora(event: MouseEvent) {
      if (!calendarioRef.current) return
      if (!(event.target instanceof Node)) return
      if (!calendarioRef.current.contains(event.target)) {
        setCalendarioAberto(false)
      }
    }

    if (calendarioAberto) {
      document.addEventListener('mousedown', aoClicarFora)
    }

    return () => document.removeEventListener('mousedown', aoClicarFora)
  }, [calendarioAberto])

  const [formNovo, setFormNovo] = useState({
    numeroProcesso: '',
    reclamante: '',
    data: '',
    hora: '',
    modalidade: 'ONLINE' as 'ONLINE' | 'PRESENCIAL',
    local: '',
    link: '',
    trtId: '',
    vara: '',
    prepostoId: '',
    parceiroId: '',
    observacoes: '',
  })

  const filtros = useMemo(
    () => ({
      page,
      limit: 20,
      busca: busca || undefined,
      status: status || undefined,
      trtId: trtId || undefined,
      prepostoId: prepostoId || undefined,
      parceiroId: parceiroId || undefined,
      modalidade: modalidade || undefined,
      dataInicio: periodoSelecionado.dataInicio,
      dataFim: periodoSelecionado.dataFim,
    }),
    [page, busca, status, trtId, prepostoId, parceiroId, modalidade, periodoSelecionado],
  )

  const audiencias = useQuery({
    queryKey: ['audiencias-lista', filtros],
    queryFn: () => audienciasApi.listar(filtros),
  })

  const trts = useQuery({
    queryKey: ['trts-filtro'],
    queryFn: trtsApi.listar,
    staleTime: 1000 * 60 * 15,
  })

  const prepostos = useQuery({
    queryKey: ['prepostos-filtro'],
    queryFn: () => prepostosApi.listar({ page: 1, limit: 200, ativo: true }),
    staleTime: 1000 * 60 * 5,
  })

  const parceiros = useQuery({
    queryKey: ['parceiros-filtro'],
    queryFn: () => parceirosApi.listar({ page: 1, limit: 200, ativo: true }),
    staleTime: 1000 * 60 * 5,
  })

  const criarAudiencia = useMutation({
    mutationFn: () => {
      return audienciasApi.criar({
        numeroProcesso: formNovo.numeroProcesso,
        reclamante: formNovo.reclamante || undefined,
        data: formNovo.data,
        hora: formNovo.hora,
        modalidade: formNovo.modalidade,
        local: formNovo.local || undefined,
        link: formNovo.link || undefined,
        trtId: formNovo.trtId,
        vara: formNovo.vara || undefined,
        prepostoId: formNovo.prepostoId,
        parceiroId: formNovo.parceiroId,
        observacoes: formNovo.observacoes || undefined,
      })
    },
    onSuccess: () => {
      setMostrarNovo(false)
      setFormNovo({
        numeroProcesso: '',
        reclamante: '',
        data: '',
        hora: '',
        modalidade: 'ONLINE',
        local: '',
        link: '',
        trtId: '',
        vara: '',
        prepostoId: '',
        parceiroId: '',
        observacoes: '',
      })

      queryClient.invalidateQueries({ queryKey: ['audiencias-lista'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['kanban'] })
    },
  })

  const reenviar = useMutation({
    mutationFn: (id: string) => audienciasApi.reenviarConfirmacao(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audiencias-lista'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['kanban'] })
    },
  })

  const cancelar = useMutation({
    mutationFn: ({ id, motivo }: { id: string; motivo: string }) => audienciasApi.cancelar(id, motivo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audiencias-lista'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['kanban'] })
    },
  })

  function submitNovo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    criarAudiencia.mutate()
  }

  async function exportar(formato: 'csv' | 'xlsx') {
    const blob = await audienciasApi.exportar(formato, filtros)
    const nome = `audiencias-${new Date().toISOString().slice(0, 10)}.${formato}`
    baixarArquivo(blob, nome)
  }

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Lista de Audiencias Operacional</h1>
            <p className="mt-1 text-sm text-slate-500">
              Gerencie audiencias, designacao de prepostos e atualizacoes de status.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => exportar('xlsx')}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-primary-300 hover:text-primary-700"
            >
              Exportar XLSX
            </button>
            <button
              onClick={() => setMostrarNovo((valor) => !valor)}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              {mostrarNovo ? 'Fechar novo registro' : 'Nova audiencia'}
            </button>
            <Link
              to="/importacoes"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Importar
            </Link>
          </div>
        </div>
      </header>

      {mostrarNovo ? (
        <form onSubmit={submitNovo} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-6">
          <h2 className="lg:col-span-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Criacao manual</h2>

          <label className="text-sm lg:col-span-2">
            <span className="mb-1 block text-xs text-slate-500">Numero do processo *</span>
            <input
              required
              value={formNovo.numeroProcesso}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, numeroProcesso: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            />
          </label>

          <label className="text-sm lg:col-span-2">
            <span className="mb-1 block text-xs text-slate-500">Reclamante</span>
            <input
              value={formNovo.reclamante}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, reclamante: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-xs text-slate-500">Data *</span>
            <input
              required
              type="date"
              value={formNovo.data}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, data: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-xs text-slate-500">Hora *</span>
            <input
              required
              type="time"
              value={formNovo.hora}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, hora: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-xs text-slate-500">Modalidade *</span>
            <select
              value={formNovo.modalidade}
              onChange={(event) =>
                setFormNovo((antigo) => ({ ...antigo, modalidade: event.target.value as 'ONLINE' | 'PRESENCIAL' }))
              }
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            >
              <option value="ONLINE">ONLINE</option>
              <option value="PRESENCIAL">PRESENCIAL</option>
            </select>
          </label>

          <label className="text-sm lg:col-span-2">
            <span className="mb-1 block text-xs text-slate-500">TRT *</span>
            <select
              required
              value={formNovo.trtId}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, trtId: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            >
              <option value="">Selecione</option>
              {trts.data?.map((trt) => (
                <option key={trt.id} value={trt.id} disabled={!trt.ativo}>
                  {trt.nome}{!trt.ativo ? ' (inativo)' : ''}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm lg:col-span-2">
            <span className="mb-1 block text-xs text-slate-500">Preposto *</span>
            <select
              required
              value={formNovo.prepostoId}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, prepostoId: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            >
              <option value="">Selecione</option>
              {prepostos.data?.dados.map((preposto) => (
                <option key={preposto.id} value={preposto.id}>
                  {preposto.nome}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm lg:col-span-2">
            <span className="mb-1 block text-xs text-slate-500">Parceiro *</span>
            <select
              required
              value={formNovo.parceiroId}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, parceiroId: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            >
              <option value="">Selecione</option>
              {parceiros.data?.dados.map((parceiro) => (
                <option key={parceiro.id} value={parceiro.id}>
                  {parceiro.nome}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm lg:col-span-3">
            <span className="mb-1 block text-xs text-slate-500">Local</span>
            <input
              value={formNovo.local}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, local: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            />
          </label>

          <label className="text-sm lg:col-span-3">
            <span className="mb-1 block text-xs text-slate-500">Link</span>
            <input
              value={formNovo.link}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, link: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            />
          </label>

          <label className="text-sm lg:col-span-2">
            <span className="mb-1 block text-xs text-slate-500">Vara</span>
            <input
              value={formNovo.vara}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, vara: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            />
          </label>

          <label className="text-sm lg:col-span-4">
            <span className="mb-1 block text-xs text-slate-500">Observacoes</span>
            <input
              value={formNovo.observacoes}
              onChange={(event) => setFormNovo((antigo) => ({ ...antigo, observacoes: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            />
          </label>

          <div className="lg:col-span-6">
            <button
              type="submit"
              disabled={criarAudiencia.isPending}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {criarAudiencia.isPending ? 'Salvando...' : 'Salvar audiencia manual'}
            </button>
          </div>
        </form>
      ) : null}

      <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-8">
        <label className="text-sm lg:col-span-2">
          <span className="mb-1 block text-xs text-slate-500">Busca</span>
          <input
            value={busca}
            onChange={(event) => {
              setPage(1)
              setBusca(event.target.value)
            }}
            placeholder="Processo ou reclamante"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-xs text-slate-500">Status</span>
          <select
            value={status}
            onChange={(event) => {
              setPage(1)
              setStatus(event.target.value)
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
          >
            <option value="">Todos</option>
            {STATUS_AUDIENCIA.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-xs text-slate-500">TRT</span>
          <select
            value={trtId}
            onChange={(event) => {
              setPage(1)
              setTrtId(event.target.value)
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
          >
            <option value="">Todos</option>
            {trts.data?.map((trt) => (
              <option key={trt.id} value={trt.id}>
                {trt.numero} - {trt.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-xs text-slate-500">Preposto</span>
          <select
            value={prepostoId}
            onChange={(event) => {
              setPage(1)
              setPrepostoId(event.target.value)
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
          >
            <option value="">Todos</option>
            {prepostos.data?.dados.map((preposto) => (
              <option key={preposto.id} value={preposto.id}>
                {preposto.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-xs text-slate-500">Parceiro</span>
          <select
            value={parceiroId}
            onChange={(event) => {
              setPage(1)
              setParceiroId(event.target.value)
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
          >
            <option value="">Todos</option>
            {parceiros.data?.dados.map((parceiro) => (
              <option key={parceiro.id} value={parceiro.id}>
                {parceiro.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block text-xs text-slate-500">Modalidade</span>
          <select
            value={modalidade}
            onChange={(event) => {
              setPage(1)
              setModalidade(event.target.value)
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
          >
            <option value="">Todas</option>
            <option value="PRESENCIAL">PRESENCIAL</option>
            <option value="ONLINE">ONLINE</option>
          </select>
        </label>

        <div className="relative text-sm lg:col-span-2" ref={calendarioRef}>
          <span className="mb-1 block text-xs text-slate-500">Periodo</span>
          <button
            type="button"
            onClick={() => setCalendarioAberto((atual) => !atual)}
            className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left outline-none ring-primary-200 focus:ring"
          >
            <span className={`${periodo?.from ? 'text-slate-800' : 'text-slate-400'}`}>{textoPeriodo}</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-500" fill="none" aria-hidden="true">
              <path
                d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {calendarioAberto ? (
            <div className="absolute right-0 z-30 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
              <DayPicker
                mode="range"
                locale={ptBR}
                selected={periodo}
                onSelect={(intervalo) => {
                  setPage(1)
                  setPeriodo(intervalo)
                  if (intervalo?.from && intervalo?.to) {
                    setCalendarioAberto(false)
                  }
                }}
                showOutsideDays
                className="text-sm"
              />

              <div className="mt-2 flex justify-end gap-2 border-t border-slate-100 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPage(1)
                    setPeriodo(undefined)
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarioAberto(false)}
                  className="text-xs font-semibold text-primary-700 hover:text-primary-800"
                >
                  Fechar
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.15em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Hora</th>
                <th className="px-4 py-3">Processo</th>
                <th className="px-4 py-3">TRT</th>
                <th className="px-4 py-3">Preposto</th>
                <th className="px-4 py-3">Parceiro</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {audiencias.isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-500">
                    Carregando audiencias...
                  </td>
                </tr>
              ) : null}

              {audiencias.isError ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-rose-700">
                    Erro ao carregar audiencias.
                  </td>
                </tr>
              ) : null}

              {!audiencias.isLoading && !audiencias.isError && audiencias.data?.dados.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-500">
                    Nenhuma audiencia encontrada para os filtros atuais.
                  </td>
                </tr>
              ) : null}

              {audiencias.data?.dados.map((audiencia) => (
                <tr key={audiencia.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3">{formatarData(audiencia.data)}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{audiencia.hora}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">{audiencia.numeroProcesso}</td>
                  <td className="px-4 py-3">
                    {audiencia.trt?.numero ?? '-'} - {audiencia.trt?.nome ?? '-'}
                  </td>
                  <td className="px-4 py-3">{audiencia.preposto?.nome ?? '-'}</td>
                  <td className="px-4 py-3">{audiencia.parceiro?.nome ?? '-'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={audiencia.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Link
                        to={`/audiencias/${audiencia.id}`}
                        className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:border-primary-300 hover:text-primary-700"
                      >
                        Detalhe
                      </Link>

                      <button
                        onClick={() => reenviar.mutate(audiencia.id)}
                        className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:border-primary-300 hover:text-primary-700"
                      >
                        Reenviar
                      </button>

                      <button
                        onClick={() => {
                          const motivo = window.prompt('Motivo do cancelamento:')
                          if (motivo && motivo.trim()) {
                            cancelar.mutate({ id: audiencia.id, motivo })
                          }
                        }}
                        className="rounded border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
          <span>
            Total: {audiencias.data?.paginacao.total ?? 0} registros | Pagina {audiencias.data?.paginacao.pagina ?? 1}{' '}
            de {audiencias.data?.paginacao.totalPaginas ?? 1}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((atual) => Math.max(1, atual - 1))}
              disabled={page <= 1}
              className="rounded border border-slate-200 bg-white px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((atual) => atual + 1)}
              disabled={!!audiencias.data && page >= audiencias.data.paginacao.totalPaginas}
              className="rounded border border-slate-200 bg-white px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proxima
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}

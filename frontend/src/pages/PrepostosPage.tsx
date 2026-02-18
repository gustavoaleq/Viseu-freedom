import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { toast_erro, toast_sucesso } from '../components/Toast'
import { formatarTelefone } from '../lib/format'
import { prepostosApi } from '../services/hub'

function extrairMensagemErro(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { error?: string; detalhes?: { message: string }[] } } }
  return e?.response?.data?.error ?? e?.response?.data?.detalhes?.[0]?.message ?? fallback
}

export function PrepostosPage() {
  const queryClient = useQueryClient()
  const [busca, setBusca] = useState('')
  const [ativo, setAtivo] = useState<'todos' | 'ativos' | 'inativos'>('ativos')
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [edicao, setEdicao] = useState({ nome: '', telefoneWhatsapp: '', email: '' })

  const [novo, setNovo] = useState({
    nome: '',
    telefoneWhatsapp: '',
    email: '',
    cpf: '',
  })

  const prepostos = useQuery({
    queryKey: ['prepostos-page', busca, ativo],
    queryFn: () =>
      prepostosApi.listar({
        page: 1,
        limit: 200,
        busca: busca || undefined,
        ativo: ativo === 'todos' ? undefined : ativo === 'ativos',
      }),
  })

  const criar = useMutation({
    mutationFn: (payload: { nome: string; telefoneWhatsapp: string; email?: string; cpf?: string }) =>
      prepostosApi.criar(payload),
    onSuccess: () => {
      setNovo({ nome: '', telefoneWhatsapp: '', email: '', cpf: '' })
      queryClient.invalidateQueries({ queryKey: ['prepostos-page'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-filtro'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-troca'] })
      toast_sucesso('Preposto criado com sucesso.')
    },
    onError: (err) => {
      toast_erro(extrairMensagemErro(err, 'Erro ao criar preposto.'))
    },
  })

  const atualizar = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: { nome?: string; telefoneWhatsapp?: string; email?: string; cpf?: string; ativo?: boolean }
    }) => prepostosApi.atualizar(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prepostos-page'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-filtro'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-troca'] })
      toast_sucesso('Preposto atualizado.')
    },
    onError: (err) => {
      toast_erro(extrairMensagemErro(err, 'Erro ao atualizar preposto.'))
    },
  })

  const remover = useMutation({
    mutationFn: (id: string) => prepostosApi.remover(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prepostos-page'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-filtro'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-troca'] })
      toast_sucesso('Preposto removido.')
    },
    onError: (err) => {
      toast_erro(extrairMensagemErro(err, 'Erro ao remover preposto.'))
    },
  })

  function submitNovo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const payload = {
      nome: novo.nome.trim(),
      telefoneWhatsapp: novo.telefoneWhatsapp.trim(),
      email: novo.email.trim() || undefined,
      cpf: novo.cpf.trim() || undefined,
    }
    criar.mutate(payload)
  }

  function iniciarEdicao(preposto: { id: string; nome: string; telefoneWhatsapp: string; email?: string | null }) {
    setEditandoId(preposto.id)
    setEdicao({
      nome: preposto.nome,
      telefoneWhatsapp: preposto.telefoneWhatsapp,
      email: preposto.email ?? '',
    })
  }

  function salvarEdicao(id: string) {
    const nome = edicao.nome.trim()
    const telefoneWhatsapp = edicao.telefoneWhatsapp.trim()
    const email = edicao.email.trim()

    if (!nome || !telefoneWhatsapp) return

    atualizar.mutate(
      {
        id,
        payload: {
          nome,
          telefoneWhatsapp,
          email: email || undefined,
        },
      },
      {
        onSuccess: () => {
          setEditandoId(null)
        },
      },
    )
  }

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Prepostos</h1>
        <p className="mt-1 text-sm text-slate-500">Gestao manual de prepostos para o fluxo operacional.</p>
      </header>

      <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-6">
        <label className="text-sm lg:col-span-3">
          <span className="mb-1 block text-xs text-slate-500">Buscar por nome ou telefone</span>
          <input
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            placeholder="Ex.: Joao"
          />
        </label>

        <label className="text-sm lg:col-span-2">
          <span className="mb-1 block text-xs text-slate-500">Status</span>
          <select
            value={ativo}
            onChange={(event) => setAtivo(event.target.value as 'todos' | 'ativos' | 'inativos')}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
          >
            <option value="ativos">Ativos</option>
            <option value="inativos">Inativos</option>
            <option value="todos">Todos</option>
          </select>
        </label>
      </section>

      <form onSubmit={submitNovo} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-5">
        <h2 className="lg:col-span-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Novo preposto</h2>

        <input
          required
          value={novo.nome}
          onChange={(event) => setNovo((atual) => ({ ...atual, nome: event.target.value }))}
          placeholder="Nome"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
        />
        <input
          required
          value={novo.telefoneWhatsapp}
          onChange={(event) => setNovo((atual) => ({ ...atual, telefoneWhatsapp: event.target.value }))}
          placeholder="Telefone WhatsApp"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
        />
        <input
          value={novo.email}
          onChange={(event) => setNovo((atual) => ({ ...atual, email: event.target.value }))}
          placeholder="Email"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
        />
        <input
          value={novo.cpf}
          onChange={(event) => setNovo((atual) => ({ ...atual, cpf: event.target.value }))}
          placeholder="CPF"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
        />

        <button
          type="submit"
          disabled={criar.isPending}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
        >
          {criar.isPending ? 'Salvando...' : 'Criar preposto'}
        </button>
      </form>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.15em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Audiencias</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {prepostos.isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                    Carregando prepostos...
                  </td>
                </tr>
              ) : null}

              {prepostos.isError ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-rose-700">
                    Erro ao carregar prepostos.
                  </td>
                </tr>
              ) : null}

              {!prepostos.isLoading && !prepostos.isError && prepostos.data?.dados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                    Nenhum preposto encontrado.
                  </td>
                </tr>
              ) : null}

              {prepostos.data?.dados.map((preposto) => {
                const emEdicao = editandoId === preposto.id
                return (
                  <tr key={preposto.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {emEdicao ? (
                        <input
                          value={edicao.nome}
                          onChange={(event) => setEdicao((atual) => ({ ...atual, nome: event.target.value }))}
                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
                        />
                      ) : (
                        preposto.nome
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {emEdicao ? (
                        <input
                          value={edicao.telefoneWhatsapp}
                          onChange={(event) =>
                            setEdicao((atual) => ({ ...atual, telefoneWhatsapp: event.target.value }))
                          }
                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
                        />
                      ) : (
                        formatarTelefone(preposto.telefoneWhatsapp)
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {emEdicao ? (
                        <input
                          value={edicao.email}
                          onChange={(event) => setEdicao((atual) => ({ ...atual, email: event.target.value }))}
                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
                        />
                      ) : (
                        preposto.email || '-'
                      )}
                    </td>
                    <td className="px-4 py-3">{preposto._count?.audiencias ?? 0}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                          preposto.ativo
                            ? 'border-primary-200 bg-primary-100 text-primary-700'
                            : 'border-zinc-300 bg-zinc-200 text-zinc-700'
                        }`}
                      >
                        {preposto.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => (emEdicao ? salvarEdicao(preposto.id) : iniciarEdicao(preposto))}
                          className="rounded border border-slate-200 bg-white px-2 py-1 text-xs hover:border-primary-300 hover:text-primary-700"
                        >
                          {emEdicao ? 'Salvar' : 'Editar'}
                        </button>

                        <button
                          onClick={() =>
                            atualizar.mutate({ id: preposto.id, payload: { ativo: !preposto.ativo } })
                          }
                          className="rounded border border-slate-200 bg-white px-2 py-1 text-xs hover:border-primary-300 hover:text-primary-700"
                        >
                          {preposto.ativo ? 'Inativar' : 'Ativar'}
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Remover (soft delete) preposto ${preposto.nome}?`)) {
                              remover.mutate(preposto.id)
                            }
                          }}
                          className="rounded border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700 hover:bg-rose-100"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

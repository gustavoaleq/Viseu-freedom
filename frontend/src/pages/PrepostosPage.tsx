import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { formatarTelefone } from '../lib/format'
import { prepostosApi } from '../services/hub'

export function PrepostosPage() {
  const queryClient = useQueryClient()
  const [busca, setBusca] = useState('')
  const [ativo, setAtivo] = useState<'todos' | 'ativos' | 'inativos'>('ativos')

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
    mutationFn: () => prepostosApi.criar(novo),
    onSuccess: () => {
      setNovo({ nome: '', telefoneWhatsapp: '', email: '', cpf: '' })
      queryClient.invalidateQueries({ queryKey: ['prepostos-page'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-filtro'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-troca'] })
    },
  })

  const atualizar = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { nome?: string; telefoneWhatsapp?: string; ativo?: boolean } }) =>
      prepostosApi.atualizar(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prepostos-page'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-filtro'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-troca'] })
    },
  })

  const remover = useMutation({
    mutationFn: (id: string) => prepostosApi.remover(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prepostos-page'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-filtro'] })
      queryClient.invalidateQueries({ queryKey: ['prepostos-troca'] })
    },
  })

  function submitNovo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    criar.mutate()
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
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-emerald-200 focus:ring"
            placeholder="Ex.: Joao"
          />
        </label>

        <label className="text-sm lg:col-span-2">
          <span className="mb-1 block text-xs text-slate-500">Status</span>
          <select
            value={ativo}
            onChange={(event) => setAtivo(event.target.value as 'todos' | 'ativos' | 'inativos')}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-emerald-200 focus:ring"
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
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring"
        />
        <input
          required
          value={novo.telefoneWhatsapp}
          onChange={(event) => setNovo((atual) => ({ ...atual, telefoneWhatsapp: event.target.value }))}
          placeholder="Telefone WhatsApp"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring"
        />
        <input
          value={novo.email}
          onChange={(event) => setNovo((atual) => ({ ...atual, email: event.target.value }))}
          placeholder="Email"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring"
        />
        <input
          value={novo.cpf}
          onChange={(event) => setNovo((atual) => ({ ...atual, cpf: event.target.value }))}
          placeholder="CPF"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring"
        />

        <button
          type="submit"
          disabled={criar.isPending}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
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

              {prepostos.data?.dados.map((preposto) => (
                <tr key={preposto.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 font-medium text-slate-900">{preposto.nome}</td>
                  <td className="px-4 py-3">{formatarTelefone(preposto.telefoneWhatsapp)}</td>
                  <td className="px-4 py-3">{preposto.email || '-'}</td>
                  <td className="px-4 py-3">{preposto._count?.audiencias ?? 0}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        preposto.ativo
                          ? 'border-emerald-200 bg-emerald-100 text-emerald-700'
                          : 'border-zinc-300 bg-zinc-200 text-zinc-700'
                      }`}
                    >
                      {preposto.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          const nome = window.prompt('Novo nome:', preposto.nome)
                          if (nome && nome.trim()) {
                            atualizar.mutate({ id: preposto.id, payload: { nome } })
                          }
                        }}
                        className="rounded border border-slate-200 bg-white px-2 py-1 text-xs hover:border-emerald-300 hover:text-emerald-700"
                      >
                        Renomear
                      </button>

                      <button
                        onClick={() =>
                          atualizar.mutate({ id: preposto.id, payload: { ativo: !preposto.ativo } })
                        }
                        className="rounded border border-slate-200 bg-white px-2 py-1 text-xs hover:border-emerald-300 hover:text-emerald-700"
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
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

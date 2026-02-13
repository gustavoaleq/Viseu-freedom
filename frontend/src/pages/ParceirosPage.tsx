import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { formatarTelefone } from '../lib/format'
import { parceirosApi } from '../services/hub'
import type { ContatoParceiro } from '../types'

export function ParceirosPage() {
  const queryClient = useQueryClient()
  const [busca, setBusca] = useState('')
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'ativos' | 'inativos'>('ativos')
  const [nomeParceiro, setNomeParceiro] = useState('')
  const [parceiroExpandido, setParceiroExpandido] = useState<string | null>(null)

  const parceiros = useQuery({
    queryKey: ['parceiros-page', busca, filtroAtivo],
    queryFn: () =>
      parceirosApi.listar({
        page: 1,
        limit: 200,
        busca: busca || undefined,
        ativo: filtroAtivo === 'todos' ? undefined : filtroAtivo === 'ativos',
      }),
  })

  const criar = useMutation({
    mutationFn: () => parceirosApi.criar({ nome: nomeParceiro }),
    onSuccess: () => {
      setNomeParceiro('')
      queryClient.invalidateQueries({ queryKey: ['parceiros-page'] })
      queryClient.invalidateQueries({ queryKey: ['parceiros-filtro'] })
    },
  })

  const atualizar = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { nome?: string; ativo?: boolean } }) =>
      parceirosApi.atualizar(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parceiros-page'] })
      queryClient.invalidateQueries({ queryKey: ['parceiros-filtro'] })
    },
  })

  function submitNovo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    criar.mutate()
  }

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Parceiros</h1>
        <p className="mt-1 text-sm text-slate-500">
          Escritorios correspondentes e seus contatos para escalonamento.
        </p>
      </header>

      <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-6">
        <label className="text-sm lg:col-span-3">
          <span className="mb-1 block text-xs text-slate-500">Buscar por nome</span>
          <input
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
            placeholder="Ex.: Escritorio Silva"
          />
        </label>

        <label className="text-sm lg:col-span-2">
          <span className="mb-1 block text-xs text-slate-500">Status</span>
          <select
            value={filtroAtivo}
            onChange={(event) => setFiltroAtivo(event.target.value as 'todos' | 'ativos' | 'inativos')}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none ring-primary-200 focus:ring"
          >
            <option value="ativos">Ativos</option>
            <option value="inativos">Inativos</option>
            <option value="todos">Todos</option>
          </select>
        </label>
      </section>

      <form
        onSubmit={submitNovo}
        className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-4"
      >
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 lg:col-span-4">
          Novo parceiro
        </h2>

        <input
          required
          value={nomeParceiro}
          onChange={(event) => setNomeParceiro(event.target.value)}
          placeholder="Nome do escritorio"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring lg:col-span-3"
        />

        <button
          type="submit"
          disabled={criar.isPending}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
        >
          {criar.isPending ? 'Salvando...' : 'Criar parceiro'}
        </button>
      </form>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.15em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Audiencias</th>
                <th className="px-4 py-3">Contatos</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parceiros.isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                    Carregando parceiros...
                  </td>
                </tr>
              ) : null}

              {parceiros.isError ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-rose-700">
                    Erro ao carregar parceiros.
                  </td>
                </tr>
              ) : null}

              {!parceiros.isLoading && !parceiros.isError && parceiros.data?.dados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                    Nenhum parceiro encontrado.
                  </td>
                </tr>
              ) : null}

              {parceiros.data?.dados.map((parceiro) => (
                <ParceirRow
                  key={parceiro.id}
                  parceiro={parceiro}
                  expandido={parceiroExpandido === parceiro.id}
                  onToggleContatos={() =>
                    setParceiroExpandido((atual) => (atual === parceiro.id ? null : parceiro.id))
                  }
                  onRenomear={(nome) => atualizar.mutate({ id: parceiro.id, payload: { nome } })}
                  onToggleAtivo={() =>
                    atualizar.mutate({ id: parceiro.id, payload: { ativo: !parceiro.ativo } })
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function ParceirRow({
  parceiro,
  expandido,
  onToggleContatos,
  onRenomear,
  onToggleAtivo,
}: {
  parceiro: { id: string; nome: string; ativo: boolean; _count?: { audiencias: number; contatos: number } }
  expandido: boolean
  onToggleContatos: () => void
  onRenomear: (nome: string) => void
  onToggleAtivo: () => void
}) {
  const [editandoNome, setEditandoNome] = useState(false)
  const [nomeEdicao, setNomeEdicao] = useState(parceiro.nome)

  return (
    <>
      <tr className="hover:bg-slate-50/70">
        <td className="px-4 py-3 font-medium text-slate-900">
          {editandoNome ? (
            <input
              value={nomeEdicao}
              onChange={(event) => setNomeEdicao(event.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
            />
          ) : (
            parceiro.nome
          )}
        </td>
        <td className="px-4 py-3">{parceiro._count?.audiencias ?? 0}</td>
        <td className="px-4 py-3">{parceiro._count?.contatos ?? 0}</td>
        <td className="px-4 py-3">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
              parceiro.ativo
                ? 'border-primary-200 bg-primary-100 text-primary-700'
                : 'border-zinc-300 bg-zinc-200 text-zinc-700'
            }`}
          >
            {parceiro.ativo ? 'Ativo' : 'Inativo'}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex justify-end gap-2">
            <button
              onClick={onToggleContatos}
              className={`rounded border px-2 py-1 text-xs ${
                expandido
                  ? 'border-primary-300 bg-primary-50 text-primary-700'
                  : 'border-slate-200 bg-white hover:border-primary-300 hover:text-primary-700'
              }`}
            >
              {expandido ? 'Fechar' : 'Contatos'}
            </button>
            <button
              onClick={() => {
                if (editandoNome) {
                  const nome = nomeEdicao.trim()
                  if (nome) {
                    onRenomear(nome)
                    setEditandoNome(false)
                  }
                  return
                }
                setNomeEdicao(parceiro.nome)
                setEditandoNome(true)
              }}
              className="rounded border border-slate-200 bg-white px-2 py-1 text-xs hover:border-primary-300 hover:text-primary-700"
            >
              {editandoNome ? 'Salvar' : 'Renomear'}
            </button>
            <button
              onClick={onToggleAtivo}
              className="rounded border border-slate-200 bg-white px-2 py-1 text-xs hover:border-primary-300 hover:text-primary-700"
            >
              {parceiro.ativo ? 'Inativar' : 'Ativar'}
            </button>
          </div>
        </td>
      </tr>

      {expandido ? (
        <tr>
          <td colSpan={5} className="bg-slate-50/50 px-4 py-4">
            <ContatosSection parceiroId={parceiro.id} />
          </td>
        </tr>
      ) : null}
    </>
  )
}

function ContatosSection({ parceiroId }: { parceiroId: string }) {
  const queryClient = useQueryClient()

  const [novo, setNovo] = useState({
    nome: '',
    telefoneWhatsapp: '',
    email: '',
    cargo: '',
    ordemEscalonamento: '',
  })
  const [editandoContatoId, setEditandoContatoId] = useState<string | null>(null)
  const [edicao, setEdicao] = useState({
    nome: '',
    telefoneWhatsapp: '',
    email: '',
    cargo: '',
    ordemEscalonamento: '',
  })

  const contatos = useQuery({
    queryKey: ['parceiro-contatos', parceiroId],
    queryFn: () => parceirosApi.listarContatos(parceiroId),
  })

  const criarContato = useMutation({
    mutationFn: () =>
      parceirosApi.criarContato(parceiroId, {
        nome: novo.nome,
        telefoneWhatsapp: novo.telefoneWhatsapp,
        email: novo.email || undefined,
        cargo: novo.cargo || undefined,
        ordemEscalonamento: novo.ordemEscalonamento ? Number(novo.ordemEscalonamento) : undefined,
      }),
    onSuccess: () => {
      setNovo({ nome: '', telefoneWhatsapp: '', email: '', cargo: '', ordemEscalonamento: '' })
      queryClient.invalidateQueries({ queryKey: ['parceiro-contatos', parceiroId] })
      queryClient.invalidateQueries({ queryKey: ['parceiros-page'] })
    },
  })

  const atualizarContato = useMutation({
    mutationFn: ({
      contatoId,
      payload,
    }: {
      contatoId: string
      payload: {
        nome?: string
        telefoneWhatsapp?: string
        email?: string
        cargo?: string
        ordemEscalonamento?: number
      }
    }) => parceirosApi.atualizarContato(parceiroId, contatoId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parceiro-contatos', parceiroId] })
      queryClient.invalidateQueries({ queryKey: ['parceiros-page'] })
    },
  })

  const removerContato = useMutation({
    mutationFn: (contatoId: string) => parceirosApi.removerContato(parceiroId, contatoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parceiro-contatos', parceiroId] })
      queryClient.invalidateQueries({ queryKey: ['parceiros-page'] })
    },
  })

  function submitContato(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    criarContato.mutate()
  }

  const listaContatos: ContatoParceiro[] = contatos.data?.dados ?? []
  const contatosOrdenados = [...listaContatos].sort(
    (a, b) => a.ordemEscalonamento - b.ordemEscalonamento,
  )

  function iniciarEdicao(contato: ContatoParceiro) {
    setEditandoContatoId(contato.id)
    setEdicao({
      nome: contato.nome,
      telefoneWhatsapp: contato.telefoneWhatsapp,
      email: contato.email ?? '',
      cargo: contato.cargo ?? '',
      ordemEscalonamento: String(contato.ordemEscalonamento),
    })
  }

  function salvarEdicao(contatoId: string) {
    const nome = edicao.nome.trim()
    const telefoneWhatsapp = edicao.telefoneWhatsapp.trim()
    const email = edicao.email.trim()
    const cargo = edicao.cargo.trim()
    const ordemEscalonamento = Number(edicao.ordemEscalonamento)

    if (!nome || !telefoneWhatsapp) return
    if (!Number.isInteger(ordemEscalonamento) || ordemEscalonamento <= 0) return

    atualizarContato.mutate(
      {
        contatoId,
        payload: {
          nome,
          telefoneWhatsapp,
          email: email || undefined,
          cargo: cargo || undefined,
          ordemEscalonamento,
        },
      },
      {
        onSuccess: () => {
          setEditandoContatoId(null)
        },
      },
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Contatos do parceiro
      </h3>

      {contatos.isLoading ? <p className="text-sm text-slate-500">Carregando contatos...</p> : null}

      {contatos.isError ? <p className="text-sm text-rose-700">Erro ao carregar contatos.</p> : null}

      {contatosOrdenados.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.15em] text-slate-500">
              <tr>
                <th className="px-3 py-2">Ordem</th>
                <th className="px-3 py-2">Nome</th>
                <th className="px-3 py-2">Telefone</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Cargo</th>
                <th className="px-3 py-2 text-center">Acao</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contatosOrdenados.map((contato) => {
                const emEdicao = editandoContatoId === contato.id
                return (
                  <tr key={contato.id} className="hover:bg-slate-50/70">
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {emEdicao ? (
                        <input
                          type="number"
                          min="1"
                          value={edicao.ordemEscalonamento}
                          onChange={(event) =>
                            setEdicao((atual) => ({ ...atual, ordemEscalonamento: event.target.value }))
                          }
                          className="w-20 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
                        />
                      ) : (
                        contato.ordemEscalonamento
                      )}
                    </td>
                    <td className="px-3 py-2 font-medium text-slate-900">
                      {emEdicao ? (
                        <input
                          value={edicao.nome}
                          onChange={(event) => setEdicao((atual) => ({ ...atual, nome: event.target.value }))}
                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
                        />
                      ) : (
                        contato.nome
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {emEdicao ? (
                        <input
                          value={edicao.telefoneWhatsapp}
                          onChange={(event) =>
                            setEdicao((atual) => ({ ...atual, telefoneWhatsapp: event.target.value }))
                          }
                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
                        />
                      ) : (
                        formatarTelefone(contato.telefoneWhatsapp)
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {emEdicao ? (
                        <input
                          value={edicao.email}
                          onChange={(event) => setEdicao((atual) => ({ ...atual, email: event.target.value }))}
                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
                        />
                      ) : (
                        contato.email || '-'
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {emEdicao ? (
                        <input
                          value={edicao.cargo}
                          onChange={(event) => setEdicao((atual) => ({ ...atual, cargo: event.target.value }))}
                          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none ring-primary-200 focus:ring"
                        />
                      ) : (
                        contato.cargo || '-'
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => (emEdicao ? salvarEdicao(contato.id) : iniciarEdicao(contato))}
                          className={`p-0 ${emEdicao ? 'text-primary-700' : 'text-slate-500'} hover:text-primary-700`}
                          title={emEdicao ? 'Salvar contato' : 'Editar contato'}
                        >
                          <IconeLapis />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Apagar contato ${contato.nome}?`)) {
                              removerContato.mutate(contato.id)
                            }
                          }}
                          className="p-0 text-rose-600 hover:text-rose-700"
                          title="Apagar contato"
                        >
                          <IconeX />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : !contatos.isLoading ? (
        <p className="text-sm text-slate-500">Nenhum contato cadastrado.</p>
      ) : null}

      <form onSubmit={submitContato} className="grid gap-2 rounded-lg border border-slate-200 bg-white p-3 lg:grid-cols-6">
        <h4 className="text-xs font-semibold text-slate-500 lg:col-span-6">Adicionar contato</h4>

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
          value={novo.cargo}
          onChange={(event) => setNovo((atual) => ({ ...atual, cargo: event.target.value }))}
          placeholder="Cargo"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
        />
        <input
          value={novo.ordemEscalonamento}
          onChange={(event) => setNovo((atual) => ({ ...atual, ordemEscalonamento: event.target.value }))}
          placeholder="Ordem"
          type="number"
          min="1"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
        />
        <button
          type="submit"
          disabled={criarContato.isPending}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
        >
          {criarContato.isPending ? 'Salvando...' : 'Adicionar'}
        </button>
      </form>
    </div>
  )
}

function IconeLapis() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M4 20l4.2-1 9.3-9.3-3.2-3.2L5 15.8 4 20z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.9 7.1l3.2 3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconeX() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

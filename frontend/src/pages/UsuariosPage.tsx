import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { authApi, usuariosApi } from '../services/hub'
import type { RoleUsuario, Usuario } from '../types'
import { formatarDataHora } from '../lib/format'

const ROLES: RoleUsuario[] = ['ADMIN', 'GESTOR', 'OPERADOR']

interface FormUsuario {
  nome: string
  email: string
  role: RoleUsuario
  ativo: boolean
  senha: string
}

function formPadraoCriacao(): FormUsuario {
  return {
    nome: '',
    email: '',
    role: 'OPERADOR',
    ativo: true,
    senha: '',
  }
}

function formDeUsuario(usuario: Usuario): FormUsuario {
  return {
    nome: usuario.nome,
    email: usuario.email,
    role: usuario.role,
    ativo: usuario.ativo,
    senha: '',
  }
}

export function UsuariosPage() {
  const queryClient = useQueryClient()
  const [novoUsuario, setNovoUsuario] = useState<FormUsuario>(formPadraoCriacao)
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [edicao, setEdicao] = useState<FormUsuario | null>(null)

  const auth = useQuery({
    queryKey: ['auth-me'],
    queryFn: authApi.me,
  })

  const usuarios = useQuery({
    queryKey: ['usuarios-lista'],
    queryFn: usuariosApi.listar,
    enabled: auth.data?.role === 'ADMIN',
  })

  const criar = useMutation({
    mutationFn: () =>
      usuariosApi.criar({
        nome: novoUsuario.nome.trim(),
        email: novoUsuario.email.trim(),
        senha: novoUsuario.senha,
        role: novoUsuario.role,
        ativo: novoUsuario.ativo,
      }),
    onSuccess: () => {
      setNovoUsuario(formPadraoCriacao())
      queryClient.invalidateQueries({ queryKey: ['usuarios-lista'] })
    },
  })

  const atualizar = useMutation({
    mutationFn: () => {
      if (!editandoId || !edicao) {
        throw new Error('Usuario em edicao nao definido')
      }

      return usuariosApi.atualizar(editandoId, {
        nome: edicao.nome.trim(),
        email: edicao.email.trim(),
        role: edicao.role,
        ativo: edicao.ativo,
        ...(edicao.senha.trim() ? { senha: edicao.senha } : {}),
      })
    },
    onSuccess: () => {
      setEditandoId(null)
      setEdicao(null)
      queryClient.invalidateQueries({ queryKey: ['usuarios-lista'] })
    },
  })

  function iniciarEdicao(usuario: Usuario) {
    setEditandoId(usuario.id)
    setEdicao(formDeUsuario(usuario))
  }

  function cancelarEdicao() {
    setEditandoId(null)
    setEdicao(null)
  }

  function submitCriacao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    criar.mutate()
  }

  function submitEdicao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    atualizar.mutate()
  }

  if (auth.isLoading) {
    return <p className="text-sm text-slate-500">Carregando permissao de acesso...</p>
  }

  if (auth.isError || !auth.data) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Erro ao carregar dados do usuario autenticado.
      </div>
    )
  }

  if (auth.data.role !== 'ADMIN') {
    return (
      <div className="space-y-4">
        <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>
          <p className="mt-1 text-sm text-slate-500">
            Somente administradores podem criar ou atualizar usuarios.
          </p>
        </header>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Seu perfil atual e <strong>{auth.data.role}</strong>. Solicite permissao ao administrador.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>
        <p className="mt-1 text-sm text-slate-500">
          Gestao de acessos do hub. Apenas perfil ADMIN pode criar e editar usuarios.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Novo usuario</h2>
        <form onSubmit={submitCriacao} className="mt-3 grid gap-3 md:grid-cols-2">
          <input
            required
            value={novoUsuario.nome}
            onChange={(event) => setNovoUsuario((atual) => ({ ...atual, nome: event.target.value }))}
            placeholder="Nome"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
          />
          <input
            required
            type="email"
            value={novoUsuario.email}
            onChange={(event) => setNovoUsuario((atual) => ({ ...atual, email: event.target.value }))}
            placeholder="E-mail"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
          />
          <input
            required
            type="password"
            value={novoUsuario.senha}
            onChange={(event) => setNovoUsuario((atual) => ({ ...atual, senha: event.target.value }))}
            placeholder="Senha inicial (min. 6)"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={novoUsuario.role}
              onChange={(event) =>
                setNovoUsuario((atual) => ({ ...atual, role: event.target.value as RoleUsuario }))
              }
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-primary-200 focus:ring"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={novoUsuario.ativo}
                onChange={(event) => setNovoUsuario((atual) => ({ ...atual, ativo: event.target.checked }))}
              />
              Ativo
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={criar.isPending}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {criar.isPending ? 'Criando...' : 'Criar usuario'}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Usuarios cadastrados</h2>

        {usuarios.isLoading ? <p className="mt-3 text-sm text-slate-500">Carregando usuarios...</p> : null}
        {usuarios.isError ? (
          <p className="mt-3 text-sm text-rose-700">Erro ao carregar usuarios (verifique permissao ADMIN).</p>
        ) : null}

        {usuarios.data ? (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-2 py-2">Nome</th>
                  <th className="px-2 py-2">E-mail</th>
                  <th className="px-2 py-2">Perfil</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Criado em</th>
                  <th className="px-2 py-2">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.data.map((usuario) => {
                  const emEdicao = editandoId === usuario.id && edicao

                  return (
                    <tr key={usuario.id} className="border-b border-slate-100">
                      <td className="px-2 py-2">
                        {emEdicao ? (
                          <input
                            value={edicao.nome}
                            onChange={(event) =>
                              setEdicao((atual) => (atual ? { ...atual, nome: event.target.value } : atual))
                            }
                            className="w-full rounded border border-slate-200 bg-slate-50 px-2 py-1"
                          />
                        ) : (
                          usuario.nome
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {emEdicao ? (
                          <input
                            type="email"
                            value={edicao.email}
                            onChange={(event) =>
                              setEdicao((atual) => (atual ? { ...atual, email: event.target.value } : atual))
                            }
                            className="w-full rounded border border-slate-200 bg-slate-50 px-2 py-1"
                          />
                        ) : (
                          usuario.email
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {emEdicao ? (
                          <select
                            value={edicao.role}
                            onChange={(event) =>
                              setEdicao((atual) =>
                                atual ? { ...atual, role: event.target.value as RoleUsuario } : atual,
                              )
                            }
                            className="w-full rounded border border-slate-200 bg-slate-50 px-2 py-1"
                          >
                            {ROLES.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        ) : (
                          usuario.role
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {emEdicao ? (
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={edicao.ativo}
                              onChange={(event) =>
                                setEdicao((atual) =>
                                  atual ? { ...atual, ativo: event.target.checked } : atual,
                                )
                              }
                            />
                            {edicao.ativo ? 'Ativo' : 'Inativo'}
                          </label>
                        ) : usuario.ativo ? (
                          'Ativo'
                        ) : (
                          'Inativo'
                        )}
                      </td>
                      <td className="px-2 py-2 text-xs text-slate-500">{formatarDataHora(usuario.createdAt)}</td>
                      <td className="px-2 py-2">
                        {emEdicao ? (
                          <form onSubmit={submitEdicao} className="flex items-center gap-2">
                            <input
                              type="password"
                              value={edicao.senha}
                              onChange={(event) =>
                                setEdicao((atual) => (atual ? { ...atual, senha: event.target.value } : atual))
                              }
                              placeholder="Nova senha (opcional)"
                              className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs"
                            />
                            <button
                              type="submit"
                              disabled={atualizar.isPending}
                              className="rounded border border-primary-300 bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700"
                            >
                              Salvar
                            </button>
                            <button
                              type="button"
                              onClick={cancelarEdicao}
                              className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-600"
                            >
                              Cancelar
                            </button>
                          </form>
                        ) : (
                          <button
                            type="button"
                            onClick={() => iniciarEdicao(usuario)}
                            className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-600 hover:border-primary-300 hover:text-primary-700"
                          >
                            Editar
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </div>
  )
}

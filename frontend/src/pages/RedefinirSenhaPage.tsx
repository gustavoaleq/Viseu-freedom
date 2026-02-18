import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { authApi } from '../services/hub'

export function RedefinirSenhaPage() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erroLocal, setErroLocal] = useState('')
  const [sucesso, setSucesso] = useState(false)

  const mutation = useMutation({
    mutationFn: () => authApi.redefinirSenha(token, novaSenha),
    onSuccess: () => setSucesso(true),
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErroLocal('')

    if (novaSenha.length < 6) {
      setErroLocal('A senha deve ter no minimo 6 caracteres.')
      return
    }
    if (novaSenha !== confirmarSenha) {
      setErroLocal('As senhas nao coincidem.')
      return
    }

    mutation.mutate()
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <div className="overflow-hidden rounded-xl border border-border bg-surface p-8 shadow-3">
            <h1 className="mb-2 text-h2 text-neutral-900">Link invalido</h1>
            <p className="mb-6 text-sm text-neutral-600">
              Este link de redefinicao de senha e invalido ou ja foi utilizado.
            </p>
            <Link
              to="/esqueci-senha"
              className="inline-block rounded-lg bg-primary-500 px-6 py-3 font-bold text-neutral-900 shadow-2 transition-all hover:-translate-y-0.5 hover:bg-primary-400"
            >
              Solicitar novo link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="fixed left-0 top-0 h-1 w-full bg-primary-400/40" />
      <div className="fixed -left-24 -top-24 -z-10 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="fixed -bottom-24 -right-24 -z-10 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />

      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <img src="/logo-completa.png" alt="Freedom logo" className="mx-auto h-14 w-auto object-contain mix-blend-multiply" />
          <p className="mt-3 text-overline text-neutral-700">
            Gestao de audiencias | Viseu Advogados
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-3">
          <div className="p-8 md:p-10">
            {sucesso ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-100 text-success-700">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="mb-2 text-h2 text-neutral-900">Senha redefinida</h1>
                <p className="mb-6 text-sm text-neutral-600">
                  Sua senha foi alterada com sucesso. Voce ja pode acessar o sistema.
                </p>
                <Link
                  to="/login"
                  className="inline-block rounded-lg bg-primary-500 px-6 py-3 font-bold text-neutral-900 shadow-2 transition-all hover:-translate-y-0.5 hover:bg-primary-400"
                >
                  Ir para o login
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-h2 text-neutral-900">Nova senha</h1>
                  <p className="text-sm text-neutral-600">
                    Escolha uma nova senha para sua conta.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="novaSenha" className="mb-2 block text-sm font-semibold text-neutral-800">
                      Nova senha
                    </label>
                    <input
                      id="novaSenha"
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Minimo 6 caracteres"
                      value={novaSenha}
                      onChange={(event) => setNovaSenha(event.target.value)}
                      className="block w-full rounded-lg border border-border bg-neutral-50 py-3 px-4 text-neutral-800 outline-none transition-all placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmarSenha" className="mb-2 block text-sm font-semibold text-neutral-800">
                      Confirmar nova senha
                    </label>
                    <input
                      id="confirmarSenha"
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Repita a nova senha"
                      value={confirmarSenha}
                      onChange={(event) => setConfirmarSenha(event.target.value)}
                      className="block w-full rounded-lg border border-border bg-neutral-50 py-3 px-4 text-neutral-800 outline-none transition-all placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    />
                  </div>

                  {erroLocal ? (
                    <div className="rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-700">
                      {erroLocal}
                    </div>
                  ) : null}

                  {mutation.isError ? (
                    <div className="rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-700">
                      {(mutation.error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
                        'Erro ao redefinir senha. O link pode ter expirado.'}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-3.5 font-bold text-neutral-900 shadow-2 transition-all hover:-translate-y-0.5 hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {mutation.isPending ? 'Redefinindo...' : 'Redefinir senha'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../services/hub'

export function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const mutation = useMutation({
    mutationFn: () => authApi.esqueciSenha(email),
    onSuccess: () => setEnviado(true),
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutation.mutate()
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
            {enviado ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-100 text-success-700">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="mb-2 text-h2 text-neutral-900">Verifique seu e-mail</h1>
                <p className="mb-6 text-sm text-neutral-600">
                  Se <strong>{email}</strong> estiver cadastrado, voce recebera um link para redefinir sua senha.
                </p>
                <Link
                  to="/login"
                  className="inline-block rounded-lg bg-primary-500 px-6 py-3 font-bold text-neutral-900 shadow-2 transition-all hover:-translate-y-0.5 hover:bg-primary-400"
                >
                  Voltar ao login
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-h2 text-neutral-900">Esqueci minha senha</h1>
                  <p className="text-sm text-neutral-600">
                    Informe seu e-mail e enviaremos um link para redefinir sua senha.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-800">
                      E-mail
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                        @
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="nome@viseu.com.br"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="block w-full rounded-lg border border-border bg-neutral-50 py-3 pl-10 pr-4 text-neutral-800 outline-none transition-all placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      />
                    </div>
                  </div>

                  {mutation.isError ? (
                    <div className="rounded-lg border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-700">
                      Erro ao processar solicitacao. Tente novamente.
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-3.5 font-bold text-neutral-900 shadow-2 transition-all hover:-translate-y-0.5 hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {mutation.isPending ? 'Enviando...' : 'Enviar link de redefinicao'}
                  </button>

                  <div className="text-center">
                    <Link to="/login" className="text-sm font-medium text-primary-700 hover:underline">
                      Voltar ao login
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

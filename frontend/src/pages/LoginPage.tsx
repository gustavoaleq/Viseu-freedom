import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authApi } from '../services/hub'

function lerDestinoPadrao(valor: unknown): string {
  if (typeof valor === 'string' && valor.trim().startsWith('/')) {
    return valor
  }
  return '/dashboard'
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('admin@freedom.ai')
  const [senha, setSenha] = useState('admin123')
  const [manterConectado, setManterConectado] = useState(true)

  const destino = useMemo(() => lerDestinoPadrao(location.state?.from), [location.state])

  const loginMutation = useMutation({
    mutationFn: () => authApi.login(email, senha),
    onSuccess: (dados) => {
      localStorage.setItem('token', dados.token)
      if (!manterConectado) {
        sessionStorage.setItem('token-temp', dados.token)
      }
      navigate(destino, { replace: true })
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    loginMutation.mutate()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="fixed left-0 top-0 h-1 w-full bg-emerald-400/40" />
      <div className="fixed -left-24 -top-24 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="fixed -bottom-24 -right-24 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <img src="/logo-completa.png" alt="Freedom logo" className="mx-auto h-14 w-auto object-contain mix-blend-multiply" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            Gestão de audiências | Viseu Advogados
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="p-8 md:p-10">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold text-slate-900">Acesse sua conta</h1>          
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                  E-mail
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    @
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="nome@viseu.com.br"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-800">
                    Senha
                  </label>
                  <button type="button" className="text-xs font-medium text-emerald-600 hover:underline">
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative">                  
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>

              <label className="flex items-center text-sm text-slate-500">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-300"
                  checked={manterConectado}
                  onChange={(event) => setManterConectado(event.target.checked)}
                />
                <span className="ml-2">Manter conectado neste dispositivo</span>
              </label>

              {loginMutation.isError ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  Falha no login. Verifique email e senha.
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-4 py-3.5 font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{loginMutation.isPending ? 'Acessando...' : 'Acessar Sistema'}</span>
                <span aria-hidden="true">&gt;</span>
              </button>
            </form>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-8 py-6 text-center">
            <p className="text-sm text-slate-500">
              Novo parceiro ou colaborador?
              <button type="button" className="ml-1 font-bold text-slate-900 hover:underline">
                Solicitar acesso
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3 text-center">
          <div className="flex flex-wrap justify-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-500 md:gap-6">
            <button type="button" className="hover:text-emerald-600">Suporte tecnico</button>
            <span className="hidden md:inline">•</span>
            <button type="button" className="hover:text-emerald-600">Politica de privacidade</button>
            <span className="hidden md:inline">•</span>
            <button type="button" className="hover:text-emerald-600">Termos de uso</button>
          </div>
          <p className="text-xs text-slate-500">© 2026 Viseu Advogados. Powered by Freedom.AI</p>
        </div>
      </div>
    </div>
  )
}

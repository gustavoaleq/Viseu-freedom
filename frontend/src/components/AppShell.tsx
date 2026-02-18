import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { authApi, audienciasApi } from '../services/hub'
import { obterIniciais } from '../lib/format'

const itensMenu = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/importacoes', label: 'Importar Planilha' },
  { to: '/audiencias', label: 'Audiencias' },
  { to: '/audiencias/kanban', label: 'Kanban' },
  { to: '/prepostos', label: 'Prepostos' },
  { to: '/parceiros', label: 'Parceiros' },
  { to: '/trts', label: 'TRTs' },
  { to: '/usuarios', label: 'Usuarios' },
  { to: '/configuracoes', label: 'Configuracoes', adminOnly: true },
] as const

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)
  const [buscaCabecalho, setBuscaCabecalho] = useState('')

  const { data: usuario } = useQuery({
    queryKey: ['auth-me'],
    queryFn: authApi.me,
    staleTime: 1000 * 60 * 5,
  })

  const { data: dashData } = useQuery({
    queryKey: ['dashboard'],
    queryFn: audienciasApi.dashboard,
    staleTime: 1000 * 60 * 2,
  })

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      localStorage.removeItem('token')
      navigate('/login', { replace: true })
    }
  }

  useEffect(() => {
    if (!location.pathname.startsWith('/audiencias')) {
      setBuscaCabecalho('')
      return
    }

    const params = new URLSearchParams(location.search)
    setBuscaCabecalho((params.get('busca') ?? '').trim())
  }, [location.pathname, location.search])

  function submitBuscaCabecalho(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const busca = buscaCabecalho.trim()
    const params = new URLSearchParams()

    if (busca) {
      params.set('busca', busca)
    }

    window.dispatchEvent(
      new CustomEvent('audiencias:buscar-global', {
        detail: { busca },
      }),
    )

    navigate(`/audiencias${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen w-full">
        <aside className={`${menuAberto ? 'translate-x-0' : '-translate-x-full'} fixed z-30 flex h-full w-72 flex-col border-r border-border bg-surface p-4 transition-transform duration-300 lg:static lg:translate-x-0`}>
          <div className="mb-8 flex items-center gap-3 px-2">
            <img src="/logo.png" alt="Freedom logo" className="h-10 w-10 rounded-lg object-contain" />
            <div>
              <p className="font-display text-lg font-semibold text-foreground">Freedom.AI</p>
              <p className="text-overline text-muted-foreground">Legal Tech Solutions</p>
            </div>
          </div>

          <nav className="space-y-1">
            {itensMenu
              .filter((item) => !('adminOnly' in item && item.adminOnly) || usuario?.role === 'ADMIN')
              .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border border-primary-200 bg-primary-100 text-neutral-900'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`
                }
                onClick={() => setMenuAberto(false)}
              >
              {item.label}
              </NavLink>
            ))}
          </nav>

          <EscopoPoc totalAudiencias={dashData?.totalAudiencias ?? 0} />

          <div className="mt-auto hidden lg:block">
            <button
              onClick={logout}
              className="mt-8 flex w-full items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-neutral-900"
            >
              Sair
            </button>
          </div>
        </aside>

        {menuAberto ? (
          <button
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setMenuAberto(false)}
            aria-label="Fechar menu"
          />
        ) : null}

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur-lg lg:px-6">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-neutral-700 lg:hidden"
              onClick={() => setMenuAberto((atual) => !atual)}
              aria-label="Abrir menu"
            >
              <span className="text-lg leading-none" aria-hidden="true">≡</span>
            </button>

            <form
              onSubmit={submitBuscaCabecalho}
              className="hidden max-w-xl flex-1 items-center gap-2 rounded-lg border border-border bg-neutral-50 px-3 py-2 md:flex"
            >
              <input
                value={buscaCabecalho}
                onChange={(event) => setBuscaCabecalho(event.target.value)}
                placeholder="Buscar audiencias, processos e prepostos"
                className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-muted-foreground"
              />
            </form>

            <button className="inline-flex h-9 items-center rounded-md border border-border bg-surface px-3 text-sm text-neutral-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-neutral-900">
              Atualizar
            </button>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-neutral-900">{usuario?.nome ?? 'Operador'}</p>
                <p className="text-caption text-muted-foreground">{usuario?.role ?? 'OPERADOR'}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 bg-primary-100 text-xs font-bold text-neutral-900">
                {obterIniciais(usuario?.nome)}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-6">
            <Outlet />
          </main>
        </section>
      </div>
    </div>
  )
}

const POC_LIMITE = 500
const POC_INICIO = new Date('2026-02-25T00:00:00')
const POC_DIAS = 30
const POC_FIM = new Date(POC_INICIO.getTime() + POC_DIAS * 24 * 60 * 60 * 1000)

function EscopoPoc({ totalAudiencias }: { totalAudiencias: number }) {
  const agora = Date.now()
  const iniciou = agora >= POC_INICIO.getTime()
  const diasCorridos = iniciou ? Math.floor((agora - POC_INICIO.getTime()) / (86400000)) : 0
  const diasRestantes = iniciou ? Math.max(0, POC_DIAS - diasCorridos) : POC_DIAS
  const pctAud = Math.min(Math.round((totalAudiencias / POC_LIMITE) * 100), 100)
  const pctDias = iniciou ? Math.min(Math.round((diasCorridos / POC_DIAS) * 100), 100) : 0

  const corAud = pctAud >= 90 ? 'bg-red-500' : pctAud >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
  const corDias = pctDias >= 90 ? 'bg-red-500' : pctDias >= 70 ? 'bg-amber-500' : 'bg-blue-500'

  return (
    <div className="mt-10 rounded-xl border border-border bg-neutral-50 p-4 shadow-1">
      <p className="text-overline text-muted-foreground">Escopo POC</p>
      <p className="mt-1.5 text-caption text-neutral-700">
        Operacao manual-first com importacao assistida de planilhas (TRT 2 e TRT 15).
      </p>

      <div className="mt-3 space-y-2.5">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-600">
            <span>Audiencias</span>
            <span className="font-semibold">{totalAudiencias}/{POC_LIMITE}</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div className={`h-full rounded-full ${corAud}`} style={{ width: `${Math.max(pctAud, 1)}%` }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-600">
            <span>Prazo</span>
            <span className="font-semibold">
              {iniciou ? `${diasRestantes}d restante${diasRestantes !== 1 ? 's' : ''}` : 'Inicia 25/02'}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div className={`h-full rounded-full ${corDias}`} style={{ width: `${Math.max(pctDias, 1)}%` }} />
          </div>
          <p className="mt-0.5 text-[10px] text-neutral-400">
            25/02 — {POC_FIM.toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  )
}

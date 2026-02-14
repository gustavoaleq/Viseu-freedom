import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { authApi } from '../services/hub'
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
  const navigate = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)

  const { data: usuario } = useQuery({
    queryKey: ['auth-me'],
    queryFn: authApi.me,
    staleTime: 1000 * 60 * 5,
  })

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      localStorage.removeItem('token')
      navigate('/login', { replace: true })
    }
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

          <div className="mt-10 rounded-xl border border-border bg-neutral-50 p-4 shadow-1">
            <p className="text-overline text-muted-foreground">Escopo POC</p>
            <p className="mt-2 text-caption text-neutral-700">
              Operacao manual-first com importacao assistida de planilhas (TRT 2 e TRT 15).
            </p>
          </div>

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

            <div className="hidden max-w-xl flex-1 items-center gap-2 rounded-lg border border-border bg-neutral-50 px-3 py-2 md:flex">
              <input
                readOnly
                value="Buscar audiencias, processos e prepostos"
                className="w-full bg-transparent text-sm text-muted-foreground outline-none"
              />
            </div>

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

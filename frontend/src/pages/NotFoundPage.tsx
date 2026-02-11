import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-border bg-panel p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">404</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-panel-foreground">Pagina nao encontrada</h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        O caminho informado nao existe na plataforma Legal Tech Solutions da POC.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        Voltar ao dashboard
      </Link>
    </div>
  )
}

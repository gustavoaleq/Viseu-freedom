import { useQuery } from '@tanstack/react-query'
import { trtsApi } from '../services/hub'

const TRTS_ATIVOS_POC = new Set(['2', '15'])

export function TrtsPage() {
  const trts = useQuery({
    queryKey: ['trts-page'],
    queryFn: trtsApi.listar,
    staleTime: 1000 * 60 * 10,
  })

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">TRTs</h1>
        <p className="mt-1 text-sm text-slate-500">
          Centro de gestao dos Tribunais Regionais do Trabalho utilizados na operacao.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-amber-50 p-4 shadow-sm">
        <p className="text-sm text-amber-900">
          Regra fixa da POC: apenas TRT 2 e TRT 15 permanecem ativos.
        </p>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.15em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Numero</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trts.isLoading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-500">
                    Carregando TRTs...
                  </td>
                </tr>
              ) : null}

              {trts.isError ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-sm text-rose-700">
                    Erro ao carregar TRTs.
                  </td>
                </tr>
              ) : null}

              {!trts.isLoading && !trts.isError && trts.data?.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-500">
                    Nenhum TRT encontrado.
                  </td>
                </tr>
              ) : null}

              {trts.data?.map((trt) => {
                const ativoNoEscopo = TRTS_ATIVOS_POC.has(trt.numero)
                const badgeStatus = ativoNoEscopo
                  ? 'border-primary-200 bg-primary-100 text-primary-700'
                  : 'border-zinc-300 bg-zinc-200 text-zinc-700'

                return (
                  <tr key={trt.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">{trt.numero}</td>
                    <td className="px-4 py-3 text-slate-900">{trt.nome}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeStatus}`}>
                        {ativoNoEscopo ? 'Ativo' : 'Inativo'}
                      </span>
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

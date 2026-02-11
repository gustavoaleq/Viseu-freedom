import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { formatarDataHora } from '../lib/format'
import { importacoesApi } from '../services/hub'

const CAMPOS = [
  { key: 'numeroProcesso', label: 'Numero do processo', obrigatorio: true },
  { key: 'reclamante', label: 'Reclamante', obrigatorio: false },
  { key: 'reclamada', label: 'Reclamada', obrigatorio: false },
  { key: 'tipoAudiencia', label: 'Tipo de audiencia', obrigatorio: false },
  { key: 'data', label: 'Data', obrigatorio: true },
  { key: 'hora', label: 'Hora', obrigatorio: false },
  { key: 'modalidade', label: 'Modalidade', obrigatorio: false },
  { key: 'comarca', label: 'Comarca', obrigatorio: false },
  { key: 'advogado', label: 'Advogado', obrigatorio: false },
  { key: 'contatoAdvogado', label: 'Contato advogado', obrigatorio: false },
  { key: 'correspondente', label: 'Correspondente', obrigatorio: false },
  { key: 'local', label: 'Local', obrigatorio: false },
  { key: 'trt', label: 'TRT', obrigatorio: true },
  { key: 'vara', label: 'Vara', obrigatorio: false },
  { key: 'prepostoNome', label: 'Preposto nome', obrigatorio: true },
  { key: 'prepostoTelefone', label: 'Preposto telefone', obrigatorio: false },
  { key: 'prepostoEmail', label: 'Preposto email', obrigatorio: false },
  { key: 'prepostoCpf', label: 'Preposto CPF', obrigatorio: false },
  { key: 'parceiroNome', label: 'Parceiro nome', obrigatorio: true },
  { key: 'observacoes', label: 'Observacoes', obrigatorio: false },
] as const

type CampoImportacao = (typeof CAMPOS)[number]
type CampoImportacaoKey = CampoImportacao['key']

const ALIASES_CAMPOS: Record<CampoImportacaoKey, string[]> = {
  numeroProcesso: ['processo', 'numero processo', 'num processo', 'n processo', 'cnj'],
  reclamante: ['reclamante', 'autor', 'parte autora', 'demandante'],
  reclamada: ['reclamada', 'reu', 'empresa', 'tomador', 'polo passivo'],
  tipoAudiencia: ['tipo audiencia', 'tipo da audiencia', 'classe audiencia', 'natureza audiencia'],
  data: ['data', 'data audiencia', 'dt audiencia', 'dia audiencia'],
  hora: ['hora', 'horario', 'hora audiencia', 'hr'],
  modalidade: ['modalidade', 'tipo audiencia', 'tipo', 'presencial', 'online', 'telepresencial'],
  comarca: ['comarca', 'municipio', 'cidade'],
  advogado: ['advogado', 'nome advogado', 'patrono'],
  contatoAdvogado: ['contato advogado', 'telefone advogado', 'whatsapp advogado', 'celular advogado'],
  correspondente: ['correspondente', 'nome correspondente'],
  local: ['local', 'endereco', 'foro', 'sala'],
  trt: ['trt', 'tribunal', 'tribunal regional', 'tribunal trabalho'],
  vara: ['vara', 'vt', 'vara trabalho'],
  prepostoNome: ['preposto', 'nome preposto', 'responsavel', 'representante'],
  prepostoTelefone: ['telefone preposto', 'whatsapp', 'celular', 'fone', 'telefone'],
  prepostoEmail: ['email preposto', 'e-mail preposto', 'mail preposto', 'email'],
  prepostoCpf: ['cpf preposto', 'cpf'],
  parceiroNome: ['parceiro', 'escritorio', 'cliente', 'unidade'],
  observacoes: ['observacao', 'obs', 'comentario', 'anotacao'],
}

function normalizarTexto(valor: string) {
  return valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function tokenizarTexto(valor: string) {
  return normalizarTexto(valor).split(' ').filter(Boolean)
}

function pontuarMapeamento(campo: CampoImportacao, coluna: string) {
  const colunaNormalizada = normalizarTexto(coluna)
  if (!colunaNormalizada) {
    return 0
  }

  const aliases = [campo.key, campo.label, ...ALIASES_CAMPOS[campo.key]]
  let melhorPontuacao = 0

  for (const aliasAtual of aliases) {
    const aliasNormalizado = normalizarTexto(aliasAtual)
    if (!aliasNormalizado) {
      continue
    }

    if (colunaNormalizada === aliasNormalizado) {
      melhorPontuacao = Math.max(melhorPontuacao, 100)
      continue
    }

    if (colunaNormalizada.includes(aliasNormalizado)) {
      melhorPontuacao = Math.max(melhorPontuacao, 88)
    }

    if (aliasNormalizado.includes(colunaNormalizada)) {
      melhorPontuacao = Math.max(melhorPontuacao, 72)
    }

    const tokensAlias = tokenizarTexto(aliasNormalizado)
    const tokensColuna = tokenizarTexto(colunaNormalizada)
    const intersecao = tokensAlias.filter((token) => tokensColuna.includes(token)).length

    if (intersecao > 0) {
      const cobertura = intersecao / Math.max(tokensAlias.length, tokensColuna.length)
      const pontuacaoTokens = Math.round(45 + cobertura * 35)
      melhorPontuacao = Math.max(melhorPontuacao, pontuacaoTokens)
    }
  }

  if (campo.key === 'prepostoTelefone' && /(whats|zap|celular|fone|telefone)/.test(colunaNormalizada)) {
    melhorPontuacao += 10
  }

  if (campo.key === 'numeroProcesso' && /(processo|cnj)/.test(colunaNormalizada)) {
    melhorPontuacao += 8
  }

  if (campo.key === 'data' && /(data|dia)/.test(colunaNormalizada)) {
    melhorPontuacao += 8
  }

  if (campo.key === 'local' && /(local|endereco|link|url|meet|zoom|teams)/.test(colunaNormalizada)) {
    melhorPontuacao += 10
  }

  if (campo.key === 'hora' && /(hora|horario|hr)/.test(colunaNormalizada)) {
    melhorPontuacao += 8
  }

  return Math.min(100, melhorPontuacao)
}

function sugerirMapeamento(colunasDetectadas: string[]) {
  const sugestao: Record<string, string> = {}
  const colunasUsadas = new Set<string>()
  const camposOrdenados = [...CAMPOS].sort((a, b) => Number(b.obrigatorio) - Number(a.obrigatorio))

  for (const campo of camposOrdenados) {
    const candidatos = colunasDetectadas
      .filter((coluna) => !colunasUsadas.has(coluna))
      .map((coluna) => ({
        coluna,
        pontuacao: pontuarMapeamento(campo, coluna),
      }))
      .sort((a, b) => b.pontuacao - a.pontuacao)

    const melhor = candidatos[0]
    if (!melhor) {
      continue
    }

    const limite = campo.obrigatorio ? 52 : 60
    if (melhor.pontuacao >= limite) {
      sugestao[campo.key] = melhor.coluna
      colunasUsadas.add(melhor.coluna)
    }
  }

  const colunaCompostaPreposto = sugestao.prepostoNome
  if (colunaCompostaPreposto) {
    if (!sugestao.prepostoTelefone) sugestao.prepostoTelefone = colunaCompostaPreposto
    if (!sugestao.prepostoEmail) sugestao.prepostoEmail = colunaCompostaPreposto
    if (!sugestao.prepostoCpf) sugestao.prepostoCpf = colunaCompostaPreposto
  }

  return sugestao
}

function renderAmostra(valor: unknown) {
  if (valor === null || valor === undefined || valor === '') {
    return '-'
  }
  const texto = String(valor)
  if (texto.length <= 38) {
    return texto
  }
  return `${texto.slice(0, 38)}...`
}

export function ImportacoesPage() {
  const queryClient = useQueryClient()

  const [arquivo, setArquivo] = useState<File | null>(null)
  const [importacaoId, setImportacaoId] = useState<string>('')
  const [mapeamento, setMapeamento] = useState<Record<string, string>>({})

  const historico = useQuery({
    queryKey: ['importacoes-historico'],
    queryFn: () => importacoesApi.listar(1, 20),
  })

  const upload = useMutation({
    mutationFn: () => {
      if (!arquivo) {
        throw new Error('Arquivo nao selecionado')
      }
      return importacoesApi.upload(arquivo)
    },
    onSuccess: (data) => {
      setImportacaoId(data.importacaoId)
      setMapeamento(sugerirMapeamento(data.colunasDetectadas))
      queryClient.invalidateQueries({ queryKey: ['importacoes-historico'] })
    },
  })

  const mapear = useMutation({
    mutationFn: () => {
      const mapeamentoLimpo = Object.fromEntries(
        Object.entries(mapeamento).filter(([, coluna]) => Boolean(coluna && coluna.trim())),
      )
      return importacoesApi.mapear(importacaoId, { mapeamentoColunas: mapeamentoLimpo })
    },
  })

  const preview = useQuery({
    queryKey: ['importacao-preview', importacaoId, mapear.isSuccess],
    queryFn: () => importacoesApi.preview(importacaoId),
    enabled: !!importacaoId && mapear.isSuccess,
  })

  const confirmar = useMutation({
    mutationFn: () => importacoesApi.confirmar(importacaoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['importacoes-historico'] })
      queryClient.invalidateQueries({ queryKey: ['audiencias-lista'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['kanban'] })
    },
  })

  const uploadData = upload.data
  const colunas = useMemo(() => uploadData?.colunasDetectadas ?? [], [uploadData])
  const linhaAmostra = useMemo<Record<string, unknown>>(
    () => (uploadData?.previewLinhas?.[0] as Record<string, unknown>) ?? {},
    [uploadData],
  )
  const obrigatoriosPendentes = useMemo(
    () => CAMPOS.filter((campo) => campo.obrigatorio && !mapeamento[campo.key]),
    [mapeamento],
  )
  const colunasDuplicadas = useMemo(() => {
    const contagem: Record<string, number> = {}
    for (const coluna of Object.values(mapeamento)) {
      if (!coluna) {
        continue
      }
      contagem[coluna] = (contagem[coluna] ?? 0) + 1
    }
    return new Set(Object.entries(contagem).filter(([, total]) => total > 1).map(([coluna]) => coluna))
  }, [mapeamento])

  function submitUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    upload.mutate()
  }

  function submitMapeamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mapear.mutate()
  }

  function aplicarAutoMapeamento() {
    setMapeamento(sugerirMapeamento(colunas))
  }

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Importacao de Planilhas</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fluxo completo: upload, mapeamento, validacao e confirmacao da carga.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { n: 1, label: 'Upload', ativo: true },
            { n: 2, label: 'Mapeamento', ativo: !!uploadData },
            { n: 3, label: 'Validacao', ativo: !!preview.data },
            { n: 4, label: 'Conclusao', ativo: !!confirmar.data },
          ].map((item) => (
            <div key={item.n} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${item.ativo ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {item.n}
              </span>
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">1. Upload</h2>
          <form onSubmit={submitUpload} className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(event) => setArquivo(event.target.files?.[0] ?? null)}
              className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-semibold"
            />
            <button
              type="submit"
              disabled={upload.isPending || !arquivo}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {upload.isPending ? 'Enviando...' : 'Enviar planilha'}
            </button>
          </form>

          {upload.isError ? (
            <p className="mt-3 text-sm text-rose-700">Falha no upload. Verifique o arquivo.</p>
          ) : null}

          {uploadData ? (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-900">Arquivo: {uploadData.nomeArquivo}</p>
              <p className="mt-1 text-xs text-slate-500">
                Registros detectados: {uploadData.totalRegistros} | Colunas: {uploadData.colunasDetectadas.length}
              </p>
              <p className="mt-1 text-xs font-mono text-slate-500">Importacao ID: {uploadData.importacaoId}</p>
            </div>
          ) : null}

          {uploadData ? (
            <form onSubmit={submitMapeamento} className="mt-5 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">2. Mapeamento</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Auto-mapeamento por similaridade de nomes com validacao de campos obrigatorios.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={aplicarAutoMapeamento}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                >
                  Auto-mapear novamente
                </button>
              </div>

              <div className="space-y-2">
                {CAMPOS.map((campo) => (
                  <div
                    key={campo.key}
                    className={`grid gap-3 rounded-lg border p-3 md:grid-cols-[1.2fr_auto_1.4fr_1fr] md:items-center ${
                      campo.obrigatorio && !mapeamento[campo.key]
                        ? 'border-amber-200 bg-amber-50/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {campo.label}
                        {campo.obrigatorio ? <span className="ml-1 text-[10px] font-bold text-emerald-600">*</span> : null}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">{campo.key}</p>
                    </div>

                    <div className="flex md:justify-center">
                      {mapeamento[campo.key] ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                          ✓
                        </span>
                      ) : campo.obrigatorio ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                          !
                        </span>
                      ) : (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500">
                          -
                        </span>
                      )}
                    </div>

                    <select
                      value={mapeamento[campo.key] || ''}
                      onChange={(event) =>
                        setMapeamento((atual) => ({
                          ...atual,
                          [campo.key]: event.target.value,
                        }))
                      }
                      className={`w-full rounded-lg border px-3 py-2 outline-none ring-emerald-200 focus:ring ${
                        campo.obrigatorio && !mapeamento[campo.key]
                          ? 'border-amber-300 bg-white'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <option value="">-- nao mapear --</option>
                      {colunas.map((coluna) => (
                        <option key={coluna} value={coluna}>
                          {coluna}
                        </option>
                      ))}
                    </select>

                    <div className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs font-mono text-slate-600">
                      {mapeamento[campo.key] ? renderAmostra(linhaAmostra[mapeamento[campo.key]]) : '--'}
                      {mapeamento[campo.key] && colunasDuplicadas.has(mapeamento[campo.key]) ? (
                        <p className="mt-1 text-[10px] font-semibold text-amber-700">Coluna repetida em outro campo</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {obrigatoriosPendentes.length > 0 ? (
                <p className="text-xs font-medium text-amber-700">
                  Campos obrigatorios pendentes: {obrigatoriosPendentes.map((campo) => campo.label).join(', ')}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={mapear.isPending || !importacaoId || obrigatoriosPendentes.length > 0}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-60"
              >
                {mapear.isPending ? 'Salvando mapeamento...' : 'Salvar mapeamento'}
              </button>

              {mapear.data ? (
                mapear.data.sucesso ? (
                  <p className="text-sm text-emerald-700">Mapeamento salvo com sucesso.</p>
                ) : (
                  <p className="text-sm text-rose-700">
                    Campos obrigatorios faltando: {mapear.data.camposFaltantes?.join(', ') || 'nao informados'}
                  </p>
                )
              ) : null}
            </form>
          ) : null}

          {preview.data ? (
            <div className="mt-5 space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">3. Preview e validacao</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Total linhas</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{preview.data.totalLinhas}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Validas</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-700">{preview.data.validasParaImportacao}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Ignoradas TRT</p>
                  <p className="mt-1 text-2xl font-semibold text-amber-700">{preview.data.ignoradasPorTrt}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Invalidas</p>
                  <p className="mt-1 text-2xl font-semibold text-rose-700">{preview.data.invalidas}</p>
                </div>
              </div>

              {preview.data.erros.length > 0 ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  <p className="font-semibold">Primeiros erros</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs">
                    {preview.data.erros.slice(0, 8).map((erro) => (
                      <li key={`${erro.linha}-${erro.erros.join('-')}`}>
                        Linha {erro.linha}: {erro.erros.join('; ')}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <button
                onClick={() => confirmar.mutate()}
                disabled={confirmar.isPending}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {confirmar.isPending ? 'Confirmando importacao...' : '4. Confirmar e importar'}
              </button>

              {confirmar.data ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  Importacao concluida: {confirmar.data.importadas} importadas, {confirmar.data.ignoradas} ignoradas.
                </div>
              ) : null}
            </div>
          ) : null}
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Historico recente</h2>
          <div className="mt-3 space-y-3">
            {historico.isLoading ? <p className="text-sm text-slate-500">Carregando historico...</p> : null}
            {historico.isError ? <p className="text-sm text-rose-700">Erro ao carregar historico.</p> : null}

            {historico.data?.dados.length === 0 ? (
              <p className="text-sm text-slate-500">Sem importacoes registradas.</p>
            ) : null}

            {historico.data?.dados.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="truncate text-sm font-medium text-slate-900">{item.nomeArquivo}</p>
                <p className="mt-1 text-xs text-slate-500">{formatarDataHora(item.createdAt)}</p>
                <p className="mt-1 text-xs text-slate-500">
                  total: {item.totalRegistros} | importadas: {item.registrosImportados} | ignoradas: {item.registrosIgnorados}
                </p>
                <p className="mt-2 inline-flex rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold text-slate-700">
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { authApi, configuracoesApi } from '../services/hub'
import type { ConfiguracaoGlobal } from '../types'

const FUSOS_BRASILEIROS = [
  { valor: 'America/Sao_Paulo', label: 'Brasilia (SP, RJ, MG, PR, SC, RS)' },
  { valor: 'America/Recife', label: 'Recife (PE, AL, SE, PB, RN, CE, PI, MA)' },
  { valor: 'America/Fortaleza', label: 'Fortaleza' },
  { valor: 'America/Bahia', label: 'Bahia' },
  { valor: 'America/Belem', label: 'Belem (PA, AP)' },
  { valor: 'America/Manaus', label: 'Manaus (AM, RR)' },
  { valor: 'America/Cuiaba', label: 'Cuiaba (MT, MS)' },
  { valor: 'America/Porto_Velho', label: 'Porto Velho (RO)' },
  { valor: 'America/Rio_Branco', label: 'Rio Branco (AC)' },
  { valor: 'America/Noronha', label: 'Fernando de Noronha' },
] as const

const TEMPLATES_DEFAULT = {
  mensagemD1:
    'Ola {{nomePreposto}}. Temos audiencia do processo {{numeroProcesso}} em {{data}} as {{hora}}. Local/link: {{local}}. Voce ira participar?',
  mensagemReiteracao:
    'Ola {{nomePreposto}}. Reiterando a audiencia do processo {{numeroProcesso}} em {{data}} as {{hora}}. Local/link: {{local}}. Voce ira participar? Apenas para confirmarmos.',
  mensagemCheckin:
    'Check-in da audiencia {{numeroProcesso}} hoje as {{hora}}. Chegou no local?',
  mensagemPosAudiencia:
    'Checkout pos-audiencia do processo {{numeroProcesso}}. Pergunta 1/9: A audiencia ocorreu?',
  mensagemCancelamento:
    'Aviso: a audiencia do processo {{numeroProcesso}} em {{data}} as {{hora}} foi cancelada. Qualquer duvida, contate o escritorio.',
  respostaNaoPosso:
    'Entendemos que nao podera participar e agradecemos o retorno. Vamos iniciar o fluxo de substituicao e manter voce informado.',
  respostaD1Confirmacao:
    'Agradecemos a colaboracao. Ja iremos marcar sua visita na audiencia em nosso sistema.',
  respostaReiteracaoConfirmacao:
    'Agradecemos sua confirmacao na reiteracao. Sua presenca esta registrada no sistema.',
  respostaCheckinConfirmacao:
    'Recebemos sua atualizacao de check-in. Obrigado pelo retorno.',
  respostaPosAudienciaConfirmacao:
    'Obrigado. Relatorio pos-audiencia finalizado com sucesso.',
  mensagemPosPergunta2:
    'Pergunta 2/9 do processo {{numeroProcesso}}: Voce teve acesso a documentacao do processo e link da audiencia com antecedencia (48h antes da audiencia)?',
  mensagemPosPergunta3:
    'Pergunta 3/9 do processo {{numeroProcesso}}: O advogado chegou com no minimo 1h de antecedencia? (Se virtual, entrou em contato com 30min de antecedencia)',
  mensagemPosPergunta4:
    'Pergunta 4/9 do processo {{numeroProcesso}}: Todas as informacoes estavam disponiveis no roteiro de audiencia ou no corpo do e-mail?',
  mensagemPosPergunta5:
    'Pergunta 5/9 do processo {{numeroProcesso}}: O advogado mostrou conhecimento sobre o caso e/ou lhe instruiu adequadamente?',
  mensagemPosPergunta6:
    'Pergunta 6/9 do processo {{numeroProcesso}}: Comente a avaliacao sobre a resposta da pergunta anterior.',
  mensagemPosPergunta7:
    'Pergunta 7/9 do processo {{numeroProcesso}}: Qual a sua avaliacao quanto a atuacao do advogado na conducao da audiencia?',
  mensagemPosPergunta8:
    'Pergunta 8/9 do processo {{numeroProcesso}}: Comente a avaliacao sobre a resposta da pergunta anterior.',
  mensagemPosPergunta9:
    'Pergunta 9/9 do processo {{numeroProcesso}}: Espaco aberto para comentarios e sugestoes de melhorias. Se nao tiver nada, responda "ok".',
} as const

const VARIAVEIS_DISPONIVEIS = [
  { chave: '{{nomePreposto}}', descricao: 'Nome completo do preposto designado' },
  { chave: '{{numeroProcesso}}', descricao: 'Numero do processo (ex: 0001234-56.2024.5.02.0001)' },
  { chave: '{{data}}', descricao: 'Data da audiencia formatada (ex: 13/02/2026)' },
  { chave: '{{hora}}', descricao: 'Horario da audiencia (ex: 14:30)' },
  { chave: '{{local}}', descricao: 'Local ou link da audiencia' },
  { chave: '{{escritorioParceiro}}', descricao: 'Nome do escritorio parceiro vinculado' },
  { chave: '{{trt}}', descricao: 'Numero do TRT (ex: 2, 15)' },
] as const

export function ConfiguracoesPage() {
  const auth = useQuery({
    queryKey: ['auth-me'],
    queryFn: authApi.me,
  })

  const config = useQuery({
    queryKey: ['configuracoes'],
    queryFn: configuracoesApi.obter,
    staleTime: 1000 * 60 * 5,
    enabled: auth.data?.role === 'ADMIN',
  })

  if (auth.isLoading) {
    return <p className="p-6 text-sm text-slate-500">Carregando permissao de acesso...</p>
  }

  if (auth.data?.role !== 'ADMIN') {
    return (
      <div className="space-y-4">
        <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Configuracoes</h1>
          <p className="mt-1 text-sm text-slate-500">
            Somente administradores podem acessar esta pagina.
          </p>
        </header>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Seu perfil atual e <strong>{auth.data?.role}</strong>. Solicite permissao ao
          administrador.
        </div>
      </div>
    )
  }

  if (config.isLoading || !config.data) {
    return <p className="p-6 text-sm text-slate-500">Carregando configuracoes...</p>
  }

  return <ConfiguracoesForm key={config.data.updatedAt} dados={config.data} />
}

function ConfiguracoesForm({ dados }: { dados: ConfiguracaoGlobal }) {
  const queryClient = useQueryClient()
  const [variaveisAberto, setVariaveisAberto] = useState(false)

  const [form, setForm] = useState<Partial<ConfiguracaoGlobal>>({
    enviarAvisoNaImportacao: dados.enviarAvisoNaImportacao,
    horarioD1: dados.horarioD1,
    antecedenciaD1Horas: dados.antecedenciaD1Horas,
    antecedenciaReiteracaoHoras: dados.antecedenciaReiteracaoHoras,
    antecedenciaCheckinMinutos: dados.antecedenciaCheckinMinutos,
    posAudienciaMinutosDepois: dados.posAudienciaMinutosDepois,
    fusoHorario: dados.fusoHorario,
    mensagemD1: dados.mensagemD1,
    mensagemReiteracao: dados.mensagemReiteracao,
    mensagemCheckin: dados.mensagemCheckin,
    mensagemPosAudiencia: dados.mensagemPosAudiencia,
    mensagemCancelamento: dados.mensagemCancelamento,
    respostaNaoPosso: dados.respostaNaoPosso,
    respostaD1Confirmacao: dados.respostaD1Confirmacao,
    respostaReiteracaoConfirmacao: dados.respostaReiteracaoConfirmacao,
    respostaCheckinConfirmacao: dados.respostaCheckinConfirmacao,
    respostaPosAudienciaConfirmacao: dados.respostaPosAudienciaConfirmacao,
    mensagemPosPergunta2: dados.mensagemPosPergunta2,
    mensagemPosPergunta3: dados.mensagemPosPergunta3,
    mensagemPosPergunta4: dados.mensagemPosPergunta4,
    mensagemPosPergunta5: dados.mensagemPosPergunta5,
    mensagemPosPergunta6: dados.mensagemPosPergunta6,
    mensagemPosPergunta7: dados.mensagemPosPergunta7,
    mensagemPosPergunta8: dados.mensagemPosPergunta8,
    mensagemPosPergunta9: dados.mensagemPosPergunta9,
  })

  const [feedback, setFeedback] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(
    null,
  )

  const mutation = useMutation({
    mutationFn: configuracoesApi.atualizar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['configuracoes'] })
      const msg =
        data.reagendadas && data.reagendadas > 0
          ? `Configuracoes salvas. ${data.reagendadas} audiencia(s) reagendada(s).`
          : 'Configuracoes salvas com sucesso.'
      setFeedback({ tipo: 'sucesso', texto: msg })
      setTimeout(() => setFeedback(null), 6000)
    },
    onError: () => {
      setFeedback({ tipo: 'erro', texto: 'Falha ao salvar configuracoes. Tente novamente.' })
      setTimeout(() => setFeedback(null), 6000)
    },
  })

  function salvar() {
    setFeedback(null)
    mutation.mutate(form)
  }

  function restaurarTemplate(campo: keyof typeof TEMPLATES_DEFAULT) {
    setForm((f) => ({ ...f, [campo]: null }))
  }

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Configuracoes</h1>
        <p className="mt-1 text-sm text-slate-500">
          Parametrize as regras de envio WhatsApp e orquestracao de audiencias.
        </p>
      </header>

      {feedback && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            feedback.tipo === 'sucesso'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {feedback.texto}
        </div>
      )}

      <div className="space-y-6">
        {/* Disparo na importacao */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Disparo na importacao</h2>
          <p className="mt-1 text-sm text-slate-500">
            Controle se audiencias importadas via planilha agendam disparos automaticamente.
          </p>
          <div className="mt-4">
            <label className="flex cursor-pointer items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.enviarAvisoNaImportacao ?? true}
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    enviarAvisoNaImportacao: !(f.enviarAvisoNaImportacao ?? true),
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  form.enviarAvisoNaImportacao ?? true ? 'bg-primary-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    form.enviarAvisoNaImportacao ?? true ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-slate-700">
                Enviar aviso ao preposto assim que a planilha for importada
              </span>
            </label>
            <p className="ml-14 mt-1 text-xs text-slate-400">
              Quando desativado, as audiencias serao criadas sem disparos automaticos.
            </p>
          </div>
        </section>

        {/* Confirmacao D-1 */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Confirmacao D-1</h2>
          <p className="mt-1 text-sm text-slate-500">
            Quando e como enviar a primeira confirmacao ao preposto.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Horario fixo para envio D-1
              </label>
              <input
                type="time"
                value={form.horarioD1 ?? ''}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    horarioD1: e.target.value || null,
                  }))
                }
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
              />
              <p className="mt-1 text-xs text-slate-400">
                Deixe vazio para usar a antecedencia em horas.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Antecedencia D-1 (horas)
              </label>
              <input
                type="number"
                min={1}
                max={72}
                value={form.antecedenciaD1Horas ?? 24}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    antecedenciaD1Horas: Number(e.target.value),
                  }))
                }
                disabled={!!form.horarioD1}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 disabled:bg-slate-100 disabled:text-slate-400"
              />
              <p className="mt-1 text-xs text-slate-400">
                Usado quando o horario fixo esta vazio.
              </p>
            </div>
          </div>
        </section>

        {/* Reiteracao */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Reiteracao</h2>
          <p className="mt-1 text-sm text-slate-500">
            Segunda confirmacao para prepostos que nao responderam ou recusaram o D-1.
          </p>

          <div className="mt-4 max-w-xs">
            <label className="block text-sm font-medium text-slate-700">
              Antecedencia da reiteracao (horas)
            </label>
            <input
              type="number"
              min={1}
              max={48}
              value={form.antecedenciaReiteracaoHoras ?? 6}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  antecedenciaReiteracaoHoras: Number(e.target.value),
                }))
              }
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
            <p className="mt-1 text-xs text-slate-400">
              Horas antes da audiencia para reenviar a confirmacao.
            </p>
          </div>
        </section>

        {/* Check-in */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Check-in</h2>
          <p className="mt-1 text-sm text-slate-500">
            Verificacao se o preposto chegou ou esta a caminho do local da audiencia.
          </p>

          <div className="mt-4 max-w-xs">
            <label className="block text-sm font-medium text-slate-700">
              Antecedencia do check-in (minutos)
            </label>
            <input
              type="number"
              min={10}
              max={360}
              value={form.antecedenciaCheckinMinutos ?? 60}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  antecedenciaCheckinMinutos: Number(e.target.value),
                }))
              }
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
            <p className="mt-1 text-xs text-slate-400">
              Minutos antes da audiencia para perguntar se o preposto chegou.
            </p>
          </div>
        </section>

        {/* Checkout pos-audiencia */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Checkout pos-audiencia</h2>
          <p className="mt-1 text-sm text-slate-500">
            Questionario enviado apos a audiencia para coletar o relatorio do preposto.
          </p>

          <div className="mt-4 max-w-xs">
            <label className="block text-sm font-medium text-slate-700">
              Tempo apos audiencia para checkout (minutos)
            </label>
            <input
              type="number"
              min={5}
              max={180}
              value={form.posAudienciaMinutosDepois ?? 30}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  posAudienciaMinutosDepois: Number(e.target.value),
                }))
              }
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
            <p className="mt-1 text-xs text-slate-400">
              Minutos apos o horario da audiencia para enviar o questionario de checkout.
            </p>
          </div>
        </section>

        {/* Fuso horario */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Fuso horario</h2>
          <p className="mt-1 text-sm text-slate-500">
            Fuso usado para calcular todos os horarios de agendamento.
          </p>

          <div className="mt-4 max-w-md">
            <label className="block text-sm font-medium text-slate-700">
              Fuso horario da operacao
            </label>
            <select
              value={form.fusoHorario ?? 'America/Sao_Paulo'}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  fusoHorario: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
            >
              {FUSOS_BRASILEIROS.map((fuso) => (
                <option key={fuso.valor} value={fuso.valor}>
                  {fuso.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* === MENSAGENS PERSONALIZAVEIS === */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Mensagens de envio</h2>
          <p className="mt-1 text-sm text-slate-500">
            Personalize o texto das mensagens enviadas ao preposto via WhatsApp. Use as variaveis
            entre {'{{ }}'} para inserir dados da audiencia automaticamente.
          </p>

          {/* Guia de variaveis - recolhivel */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setVariaveisAberto((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              <span className={`inline-block transition-transform ${variaveisAberto ? 'rotate-90' : ''}`}>
                &#9654;
              </span>
              Variaveis disponiveis
            </button>

            {variaveisAberto && (
              <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 font-medium text-slate-700">Variavel</th>
                      <th className="px-4 py-2 font-medium text-slate-700">Descricao</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {VARIAVEIS_DISPONIVEIS.map((v) => (
                      <tr key={v.chave}>
                        <td className="px-4 py-2">
                          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-800">
                            {v.chave}
                          </code>
                        </td>
                        <td className="px-4 py-2 text-slate-600">{v.descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Template D-1 */}
          <div className="mt-6 space-y-5">
            <TemplateField
              label="Mensagem D-1 (confirmacao)"
              value={form.mensagemD1}
              defaultValue={TEMPLATES_DEFAULT.mensagemD1}
              onChange={(v) => setForm((f) => ({ ...f, mensagemD1: v }))}
              onRestaurar={() => restaurarTemplate('mensagemD1')}
            />
            <TemplateField
              label="Resposta D-1 (confirmacao)"
              value={form.respostaD1Confirmacao}
              defaultValue={TEMPLATES_DEFAULT.respostaD1Confirmacao}
              onChange={(v) => setForm((f) => ({ ...f, respostaD1Confirmacao: v }))}
              onRestaurar={() => restaurarTemplate('respostaD1Confirmacao')}
              rows={2}
            />

            <TemplateField
              label="Mensagem de reiteracao"
              value={form.mensagemReiteracao}
              defaultValue={TEMPLATES_DEFAULT.mensagemReiteracao}
              onChange={(v) => setForm((f) => ({ ...f, mensagemReiteracao: v }))}
              onRestaurar={() => restaurarTemplate('mensagemReiteracao')}
            />
            <TemplateField
              label="Resposta de reiteracao (confirmacao)"
              value={form.respostaReiteracaoConfirmacao}
              defaultValue={TEMPLATES_DEFAULT.respostaReiteracaoConfirmacao}
              onChange={(v) => setForm((f) => ({ ...f, respostaReiteracaoConfirmacao: v }))}
              onRestaurar={() => restaurarTemplate('respostaReiteracaoConfirmacao')}
              rows={2}
            />

            <TemplateField
              label="Mensagem de check-in"
              value={form.mensagemCheckin}
              defaultValue={TEMPLATES_DEFAULT.mensagemCheckin}
              onChange={(v) => setForm((f) => ({ ...f, mensagemCheckin: v }))}
              onRestaurar={() => restaurarTemplate('mensagemCheckin')}
            />
            <TemplateField
              label="Resposta de check-in (confirmacao)"
              value={form.respostaCheckinConfirmacao}
              defaultValue={TEMPLATES_DEFAULT.respostaCheckinConfirmacao}
              onChange={(v) => setForm((f) => ({ ...f, respostaCheckinConfirmacao: v }))}
              onRestaurar={() => restaurarTemplate('respostaCheckinConfirmacao')}
              rows={2}
            />

            <TemplateField
              label="Mensagem de checkout (pos-audiencia)"
              value={form.mensagemPosAudiencia}
              defaultValue={TEMPLATES_DEFAULT.mensagemPosAudiencia}
              onChange={(v) => setForm((f) => ({ ...f, mensagemPosAudiencia: v }))}
              onRestaurar={() => restaurarTemplate('mensagemPosAudiencia')}
            />
            <TemplateField
              label="Mensagem de cancelamento"
              value={form.mensagemCancelamento}
              defaultValue={TEMPLATES_DEFAULT.mensagemCancelamento}
              onChange={(v) => setForm((f) => ({ ...f, mensagemCancelamento: v }))}
              onRestaurar={() => restaurarTemplate('mensagemCancelamento')}
              rows={2}
            />
            <TemplateField
              label="Resposta para Substituicao Necessaria"
              value={form.respostaNaoPosso}
              defaultValue={TEMPLATES_DEFAULT.respostaNaoPosso}
              onChange={(v) => setForm((f) => ({ ...f, respostaNaoPosso: v }))}
              onRestaurar={() => restaurarTemplate('respostaNaoPosso')}
              rows={2}
            />
            <TemplateField
              label="Resposta de checkout (confirmacao final)"
              value={form.respostaPosAudienciaConfirmacao}
              defaultValue={TEMPLATES_DEFAULT.respostaPosAudienciaConfirmacao}
              onChange={(v) => setForm((f) => ({ ...f, respostaPosAudienciaConfirmacao: v }))}
              onRestaurar={() => restaurarTemplate('respostaPosAudienciaConfirmacao')}
              rows={2}
            />

            <details className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-700">
                Checkout avancado (Perguntas 2/9 a 9/9)
              </summary>
              <p className="mt-2 text-xs text-slate-500">
                Opcional. Personalize apenas se precisar ajustar o roteiro detalhado do pos-audiencia.
              </p>

              <div className="mt-4 space-y-4">
                <TemplateField
                  label="Pergunta 2/9 (documentacao 48h)"
                  value={form.mensagemPosPergunta2}
                  defaultValue={TEMPLATES_DEFAULT.mensagemPosPergunta2}
                  onChange={(v) => setForm((f) => ({ ...f, mensagemPosPergunta2: v }))}
                  onRestaurar={() => restaurarTemplate('mensagemPosPergunta2')}
                  rows={2}
                />

                <TemplateField
                  label="Pergunta 3/9 (antecedencia advogado)"
                  value={form.mensagemPosPergunta3}
                  defaultValue={TEMPLATES_DEFAULT.mensagemPosPergunta3}
                  onChange={(v) => setForm((f) => ({ ...f, mensagemPosPergunta3: v }))}
                  onRestaurar={() => restaurarTemplate('mensagemPosPergunta3')}
                  rows={2}
                />

                <TemplateField
                  label="Pergunta 4/9 (informacoes completas)"
                  value={form.mensagemPosPergunta4}
                  defaultValue={TEMPLATES_DEFAULT.mensagemPosPergunta4}
                  onChange={(v) => setForm((f) => ({ ...f, mensagemPosPergunta4: v }))}
                  onRestaurar={() => restaurarTemplate('mensagemPosPergunta4')}
                  rows={2}
                />

                <TemplateField
                  label="Pergunta 5/9 (conhecimento do caso)"
                  value={form.mensagemPosPergunta5}
                  defaultValue={TEMPLATES_DEFAULT.mensagemPosPergunta5}
                  onChange={(v) => setForm((f) => ({ ...f, mensagemPosPergunta5: v }))}
                  onRestaurar={() => restaurarTemplate('mensagemPosPergunta5')}
                  rows={2}
                />

                <TemplateField
                  label="Pergunta 6/9 (comentario conhecimento)"
                  value={form.mensagemPosPergunta6}
                  defaultValue={TEMPLATES_DEFAULT.mensagemPosPergunta6}
                  onChange={(v) => setForm((f) => ({ ...f, mensagemPosPergunta6: v }))}
                  onRestaurar={() => restaurarTemplate('mensagemPosPergunta6')}
                  rows={3}
                />

                <TemplateField
                  label="Pergunta 7/9 (avaliacao atuacao)"
                  value={form.mensagemPosPergunta7}
                  defaultValue={TEMPLATES_DEFAULT.mensagemPosPergunta7}
                  onChange={(v) => setForm((f) => ({ ...f, mensagemPosPergunta7: v }))}
                  onRestaurar={() => restaurarTemplate('mensagemPosPergunta7')}
                  rows={2}
                />

                <TemplateField
                  label="Pergunta 8/9 (comentario avaliacao)"
                  value={form.mensagemPosPergunta8}
                  defaultValue={TEMPLATES_DEFAULT.mensagemPosPergunta8}
                  onChange={(v) => setForm((f) => ({ ...f, mensagemPosPergunta8: v }))}
                  onRestaurar={() => restaurarTemplate('mensagemPosPergunta8')}
                  rows={3}
                />

                <TemplateField
                  label="Pergunta 9/9 (comentarios finais)"
                  value={form.mensagemPosPergunta9}
                  defaultValue={TEMPLATES_DEFAULT.mensagemPosPergunta9}
                  onChange={(v) => setForm((f) => ({ ...f, mensagemPosPergunta9: v }))}
                  onRestaurar={() => restaurarTemplate('mensagemPosPergunta9')}
                  rows={3}
                />
              </div>
            </details>
          </div>
        </section>
      </div>

      {/* Botao salvar */}
      <div className="flex items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <button
          onClick={salvar}
          disabled={mutation.isPending}
          className="rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 disabled:opacity-50"
        >
          {mutation.isPending ? 'Salvando...' : 'Salvar configuracoes'}
        </button>
      </div>
    </div>
  )
}

function TemplateField({
  label,
  value,
  defaultValue,
  onChange,
  onRestaurar,
  rows = 3,
}: {
  label: string
  value: string | null | undefined
  defaultValue: string
  onChange: (v: string | null) => void
  onRestaurar: () => void
  rows?: number
}) {
  const textoExibido = value ?? defaultValue
  const eCustomizado = value !== null && value !== undefined

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        {eCustomizado && (
          <button
            type="button"
            onClick={onRestaurar}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            Restaurar padrao
          </button>
        )}
      </div>
      <textarea
        rows={rows}
        value={textoExibido}
        onChange={(e) => onChange(e.target.value || null)}
        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
      />
      {!eCustomizado && (
        <p className="mt-1 text-xs text-slate-400">Usando mensagem padrao do sistema.</p>
      )}
    </div>
  )
}

import api from './api'
import type {
  AuthLoginResponse,
  Audiencia,
  AudienciaDetalhe,
  ConfiguracaoGlobal,
  ConfiguracaoGlobalPatchResponse,
  ContatoParceiro,
  ParceiroContatosResponse,
  DashboardResponse,
  Importacao,
  ImportacaoMapearRequest,
  ImportacaoMapearResponse,
  ImportacaoPreviewResponse,
  ImportacaoUploadResponse,
  Preposto,
  Parceiro,
  RespostaPaginada,
  Trt,
  Usuario,
} from '../types'

export interface FiltrosAudiencias {
  page?: number
  limit?: number
  busca?: string
  status?: string
  trtId?: string
  prepostoId?: string
  parceiroId?: string
  modalidade?: string
  dataInicio?: string
  dataFim?: string
}

export interface CriarAudienciaPayload {
  numeroProcesso: string
  reclamante?: string
  reclamada?: string
  tipoAudiencia?: string
  data: string
  hora: string
  modalidade: 'PRESENCIAL' | 'ONLINE'
  comarca?: string
  advogado?: string
  contatoAdvogado?: string
  correspondente?: string
  local?: string
  link?: string
  trtId: string
  vara?: string
  prepostoId: string
  parceiroId: string
  observacoes?: string
}

export interface AtualizarAudienciaPayload extends Partial<CriarAudienciaPayload> {
  status?: string
}

export interface CriarPrepostoPayload {
  nome: string
  telefoneWhatsapp: string
  email?: string
  cpf?: string
  ativo?: boolean
}

export interface AtualizarPrepostoPayload {
  nome?: string
  telefoneWhatsapp?: string
  email?: string
  cpf?: string
  ativo?: boolean
}

export interface FiltrosPrepostos {
  page?: number
  limit?: number
  busca?: string
  ativo?: boolean
}

export interface CriarUsuarioPayload {
  nome: string
  email: string
  senha: string
  role?: 'ADMIN' | 'OPERADOR' | 'GESTOR'
  ativo?: boolean
}

export interface AtualizarUsuarioPayload {
  nome?: string
  email?: string
  senha?: string
  role?: 'ADMIN' | 'OPERADOR' | 'GESTOR'
  ativo?: boolean
}

export const authApi = {
  async login(email: string, senha: string) {
    const { data } = await api.post<AuthLoginResponse>('/auth/login', { email, senha })
    return data
  },
  async me() {
    const { data } = await api.get<Usuario>('/auth/me')
    return data
  },
  async logout() {
    const { data } = await api.post<{ message: string }>('/auth/logout')
    return data
  },
  async esqueciSenha(email: string) {
    const { data } = await api.post<{ message: string }>('/auth/esqueci-senha', { email })
    return data
  },
  async redefinirSenha(token: string, novaSenha: string) {
    const { data } = await api.post<{ message: string }>('/auth/redefinir-senha', { token, novaSenha })
    return data
  },
}

export const audienciasApi = {
  async listar(filtros: FiltrosAudiencias) {
    const { data } = await api.get<RespostaPaginada<Audiencia>>('/audiencias', { params: filtros })
    return data
  },
  async dashboard() {
    const { data } = await api.get<DashboardResponse>('/audiencias/dashboard')
    return data
  },
  async kanban() {
    const { data } = await api.get<Record<string, Audiencia[]>>('/audiencias/kanban')
    return data
  },
  async buscarPorId(id: string) {
    const { data } = await api.get<AudienciaDetalhe>(`/audiencias/${id}`)
    return data
  },
  async criar(payload: CriarAudienciaPayload) {
    const { data } = await api.post<Audiencia>('/audiencias', payload)
    return data
  },
  async atualizar(id: string, payload: AtualizarAudienciaPayload) {
    const { data } = await api.patch<Audiencia>(`/audiencias/${id}`, payload)
    return data
  },
  async trocarPreposto(id: string, prepostoNovoId: string, motivo: string) {
    const { data } = await api.post<Audiencia>(`/audiencias/${id}/trocar-preposto`, {
      prepostoNovoId,
      motivo,
    })
    return data
  },
  async reenviarConfirmacao(id: string) {
    const { data } = await api.post<{ message: string; audienciaId: string }>(
      `/audiencias/${id}/reenviar-confirmacao`,
    )
    return data
  },
  async confirmarPorTelefone(id: string, observacao: string) {
    const { data } = await api.post<Audiencia>(`/audiencias/${id}/confirmar-telefone`, { observacao })
    return data
  },
  async cancelar(id: string, motivo: string) {
    const { data } = await api.post<Audiencia>(`/audiencias/${id}/cancelar`, { motivo })
    return data
  },
  async deletarDefinitivo(id: string) {
    const { data } = await api.delete<{ ok: boolean; audienciaId: string; numeroProcesso: string; message: string }>(
      `/audiencias/${id}`,
    )
    return data
  },
  async checkIn(
    id: string,
    evento: 'ESTOU_A_CAMINHO' | 'JA_CHEGUEI' | 'ESTOU_COM_PROBLEMA',
    observacao?: string,
  ) {
    const { data } = await api.post<Audiencia>(`/audiencias/${id}/check-in`, { evento, observacao })
    return data
  },
  async salvarRelatorio(
    id: string,
    payload: {
      audienciaOcorreu: 'SIM' | 'NAO' | 'REMARCADA'
      docAntecedencia: boolean
      docAntecedenciaJustificativa?: string
      advogadoAntecedencia: boolean
      advogadoAntecedenciaJustificativa?: string
      infoCompleta: 'SIM' | 'NAO'
      infoFaltante?: string
      conhecimentoAdvogado: boolean
      comentarioConhecimento?: string
      avaliacaoAtuacao: 'BOM' | 'REGULAR' | 'RUIM'
      comentarioAvaliacao?: string
      comentarioFinal?: string
    },
  ) {
    const { data } = await api.post(`/audiencias/${id}/relatorio`, payload)
    return data
  },
  async dispararD1(id: string) {
    const { data } = await api.post<{ ok: boolean; audienciaId: string; tipo: string; providerMessageId?: string }>(
      `/audiencias/${id}/disparos/d1`,
    )
    return data
  },
  async dispararCheckIn(id: string) {
    const { data } = await api.post<{ ok: boolean; audienciaId: string; tipo: string; providerMessageId?: string }>(
      `/audiencias/${id}/disparos/check-in`,
    )
    return data
  },
  async dispararReiteracao6h(id: string) {
    const { data } = await api.post<{ ok: boolean; audienciaId: string; tipo: string; providerMessageId?: string }>(
      `/audiencias/${id}/disparos/reiteracao-6h`,
    )
    return data
  },
  async dispararPosAudiencia(id: string) {
    const { data } = await api.post<{ ok: boolean; audienciaId: string; tipo: string; providerMessageId?: string }>(
      `/audiencias/${id}/disparos/pos-audiencia`,
    )
    return data
  },
  async exportar(formato: 'csv' | 'xlsx', filtros: FiltrosAudiencias = {}) {
    const response = await api.get<Blob>('/audiencias/export', {
      params: { formato, ...filtros },
      responseType: 'blob',
    })

    return response.data
  },
  async baixarRelatorioPos(id: string) {
    const response = await api.get<Blob>(`/audiencias/${id}/relatorio/download`, {
      responseType: 'blob',
    })
    const contentDisposition = response.headers['content-disposition'] as string | undefined
    const nomeArquivo =
      contentDisposition?.match(/filename="?([^"]+)"?/)?.[1] ??
      `relatorio-pos-audiencia-${id}.html`

    return {
      blob: response.data,
      nomeArquivo,
    }
  },
}

export const prepostosApi = {
  async listar(filtros: FiltrosPrepostos = {}) {
    const { data } = await api.get<RespostaPaginada<Preposto>>('/prepostos', { params: filtros })
    return data
  },
  async criar(payload: CriarPrepostoPayload) {
    const { data } = await api.post<Preposto>('/prepostos', payload)
    return data
  },
  async atualizar(id: string, payload: AtualizarPrepostoPayload) {
    const { data } = await api.patch<Preposto>(`/prepostos/${id}`, payload)
    return data
  },
  async remover(id: string) {
    const { data } = await api.delete<{ message: string; id: string }>(`/prepostos/${id}`)
    return data
  },
}

export const trtsApi = {
  async listar() {
    const { data } = await api.get<Trt[]>('/trts')
    return data
  },
}

export interface FiltrosParceiros {
  page?: number
  limit?: number
  busca?: string
  ativo?: boolean
}

export interface CriarParceiroPayload {
  nome: string
}

export interface AtualizarParceiroPayload {
  nome?: string
  ativo?: boolean
}

export interface CriarContatoPayload {
  nome: string
  telefoneWhatsapp: string
  email?: string
  cargo?: string
  ordemEscalonamento?: number
}

export interface AtualizarContatoPayload {
  nome?: string
  telefoneWhatsapp?: string
  email?: string
  cargo?: string
  ordemEscalonamento?: number
}

export const parceirosApi = {
  async listar(filtros: FiltrosParceiros = {}) {
    const { data } = await api.get<RespostaPaginada<Parceiro>>('/parceiros', { params: filtros })
    return data
  },
  async criar(payload: CriarParceiroPayload) {
    const { data } = await api.post<Parceiro>('/parceiros', payload)
    return data
  },
  async atualizar(id: string, payload: AtualizarParceiroPayload) {
    const { data } = await api.patch<Parceiro>(`/parceiros/${id}`, payload)
    return data
  },
  async listarContatos(parceiroId: string) {
    const { data } = await api.get<ParceiroContatosResponse>(`/parceiros/${parceiroId}/contatos`)
    return data
  },
  async criarContato(parceiroId: string, payload: CriarContatoPayload) {
    const { data } = await api.post<ContatoParceiro>(`/parceiros/${parceiroId}/contatos`, payload)
    return data
  },
  async atualizarContato(parceiroId: string, contatoId: string, payload: AtualizarContatoPayload) {
    const { data } = await api.patch<ContatoParceiro>(
      `/parceiros/${parceiroId}/contatos/${contatoId}`,
      payload,
    )
    return data
  },
  async removerContato(parceiroId: string, contatoId: string) {
    const { data } = await api.delete<{ message: string; id: string }>(
      `/parceiros/${parceiroId}/contatos/${contatoId}`,
    )
    return data
  },
}

export const importacoesApi = {
  async listar(page = 1, limit = 20) {
    const { data } = await api.get<RespostaPaginada<Importacao>>('/importacoes', {
      params: { page, limit },
    })
    return data
  },
  async upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await api.post<ImportacaoUploadResponse>('/importacoes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data
  },
  async mapear(id: string, payload: ImportacaoMapearRequest) {
    const { data } = await api.post<ImportacaoMapearResponse>(`/importacoes/${id}/mapear`, payload)
    return data
  },
  async preview(id: string) {
    const { data } = await api.get<ImportacaoPreviewResponse>(`/importacoes/${id}/preview`)
    return data
  },
  async confirmar(id: string) {
    const { data } = await api.post<{
      importacaoId: string
      status: string
      importadas: number
      ignoradas: number
      invalidas: number
      ignoradasPorTrt: number
      totalLinhas: number
    }>(`/importacoes/${id}/confirmar`)

    return data
  },
}

export const configuracoesApi = {
  async obter() {
    const { data } = await api.get<ConfiguracaoGlobal>('/configuracoes')
    return data
  },
  async atualizar(payload: Partial<ConfiguracaoGlobal>) {
    const { data } = await api.patch<ConfiguracaoGlobalPatchResponse>('/configuracoes', payload)
    return data
  },
}

export const usuariosApi = {
  async listar() {
    const { data } = await api.get<Usuario[]>('/usuarios')
    return data
  },
  async criar(payload: CriarUsuarioPayload) {
    const { data } = await api.post<Usuario>('/usuarios', payload)
    return data
  },
  async atualizar(id: string, payload: AtualizarUsuarioPayload) {
    const { data } = await api.patch<Usuario>(`/usuarios/${id}`, payload)
    return data
  },
}

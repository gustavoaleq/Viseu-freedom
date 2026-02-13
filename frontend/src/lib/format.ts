export function formatarData(iso: string | null | undefined) {
  if (!iso) return '-'

  const data = parseDataCalendario(iso)
  if (!data) return '-'

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(data)
}

export function formatarDataHora(iso: string | null | undefined) {
  if (!iso) return '-'
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatarTelefone(telefone: string | null | undefined) {
  if (!telefone) return '-'
  const numerico = telefone.replace(/\D/g, '')

  if (numerico.length === 11) {
    return numerico.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  if (numerico.length === 10) {
    return numerico.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return telefone
}

export function obterIniciais(nome: string | null | undefined) {
  if (!nome) return '--'
  const partes = nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase()
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase()
}

function parseDataCalendario(valor: string) {
  const formatoIsoSemHora = valor.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (formatoIsoSemHora) {
    const ano = Number(formatoIsoSemHora[1])
    const mes = Number(formatoIsoSemHora[2]) - 1
    const dia = Number(formatoIsoSemHora[3])
    return new Date(Date.UTC(ano, mes, dia, 0, 0, 0, 0))
  }

  const data = new Date(valor)
  if (Number.isNaN(data.getTime())) return null
  return data
}

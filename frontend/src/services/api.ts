import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url ?? ''
      // Nao redireciona se for o proprio login ou redefinicao de senha
      const rotasPublicas = ['/auth/login', '/auth/esqueci-senha', '/auth/redefinir-senha']
      const ehRotaPublica = rotasPublicas.some((rota) => url.includes(rota))

      if (!ehRotaPublica) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

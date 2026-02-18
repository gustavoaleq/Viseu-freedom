import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ToastContainer } from './components/Toast'
import { AudienciaDetalhePage } from './pages/AudienciaDetalhePage'
import { AudienciasKanbanPage } from './pages/AudienciasKanbanPage'
import { AudienciasListPage } from './pages/AudienciasListPage'
import { DashboardPage } from './pages/DashboardPage'
import { ImportacoesPage } from './pages/ImportacoesPage'
import { EsqueciSenhaPage } from './pages/EsqueciSenhaPage'
import { LoginPage } from './pages/LoginPage'
import { RedefinirSenhaPage } from './pages/RedefinirSenhaPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ParceirosPage } from './pages/ParceirosPage'
import { PrepostosPage } from './pages/PrepostosPage'
import { TrtsPage } from './pages/TrtsPage'
import { UsuariosPage } from './pages/UsuariosPage'
import { ConfiguracoesPage } from './pages/ConfiguracoesPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
          <Route path="/redefinir-senha" element={<RedefinirSenhaPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/audiencias" element={<AudienciasListPage />} />
              <Route path="/audiencias/kanban" element={<AudienciasKanbanPage />} />
              <Route path="/audiencias/:id" element={<AudienciaDetalhePage />} />
              <Route path="/prepostos" element={<PrepostosPage />} />
              <Route path="/parceiros" element={<ParceirosPage />} />
              <Route path="/trts" element={<TrtsPage />} />
              <Route path="/importacoes" element={<ImportacoesPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/configuracoes" element={<ConfiguracoesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

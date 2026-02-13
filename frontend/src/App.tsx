import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AudienciaDetalhePage } from './pages/AudienciaDetalhePage'
import { AudienciasKanbanPage } from './pages/AudienciasKanbanPage'
import { AudienciasListPage } from './pages/AudienciasListPage'
import { DashboardPage } from './pages/DashboardPage'
import { ImportacoesPage } from './pages/ImportacoesPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ParceirosPage } from './pages/ParceirosPage'
import { PrepostosPage } from './pages/PrepostosPage'
import { TrtsPage } from './pages/TrtsPage'
import { UsuariosPage } from './pages/UsuariosPage'

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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

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

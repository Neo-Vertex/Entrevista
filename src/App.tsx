import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useScrollToHash } from './hooks/useScrollToHash'
import Dossie from './pages/Dossie'
import Habilidades from './pages/Habilidades'
import PorQueNelson from './pages/PorQueNelson'
import Carta from './pages/Carta'
import Projetos from './pages/Projetos'
import Apresentacao from './pages/Apresentacao'

function ScrollManager() {
  useScrollToHash()
  return null
}

function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Navigate to="/dossie" replace />} />
        <Route path="/dossie" element={<Dossie />} />
        <Route path="/habilidades" element={<Habilidades />} />
        <Route path="/por-que-nelson" element={<PorQueNelson />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/apresentacao" element={<Apresentacao />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

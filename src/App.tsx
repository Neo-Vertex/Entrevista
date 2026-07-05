import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Apresentacao from './pages/Apresentacao'

// As páginas antigas (dossiê, habilidades, por-que-nelson, carta, projetos)
// seguem guardadas em src/pages e na tag git "paginas-v1" — só saíram das
// rotas: o site agora é a apresentação guiada do New.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/apresentacao" element={<Apresentacao />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

import { Link } from 'react-router-dom'

export const NAV_ITEMS = [
  { path: '/dossie', label: 'dossiê do agente New' },
  { path: '/habilidades', label: 'portfólio de habilidades' },
  { path: '/por-que-nelson', label: 'por que o Nelson é a escolha certa' },
  { path: '/carta', label: 'carta do New' },
  { path: '/projetos', label: 'projeto por projeto' },
  { path: '/apresentacao', label: 'requisitos, respondidos pelo New' },
]

export function Nav({ current }: { current: string }) {
  return (
    <div className="nav-row">
      {NAV_ITEMS.filter((item) => item.path !== current).map((item) => (
        <Link key={item.path} className="nav-link" to={item.path}>
          {item.label}
        </Link>
      ))}
    </div>
  )
}

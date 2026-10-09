import { Link, useLocation } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
export default function WorkspaceTabs({ section }: { section: 'forms' | 'resources' }) {
  const { role } = useDemo()
  const { pathname } = useLocation()
  const tabs = section === 'forms'
    ? [['Assignments', '/admin/forms'], ...(role === 'Administrator' ? [['Previous forms', '/admin/form-builder']] : [])]
    : [['Recommend to a mother', '/admin/reccomendresources'], ...(role === 'Administrator' ? [['Resource catalog', '/admin/resource-catalog']] : [])]
  return <nav aria-label={`${section} workspace`} className="flex flex-wrap gap-2 border-b border-line pb-3">{tabs.map(([label, to]) => <Link key={to} to={to} aria-current={pathname === to || (to === '/admin/form-builder' && pathname.startsWith(`${to}/`)) ? 'page' : undefined} className="rounded-lg px-4 py-3 text-sm font-semibold text-accent aria-[current=page]:bg-sage">{label}</Link>)}</nav>
}

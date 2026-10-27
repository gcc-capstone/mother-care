import { Link, useLocation } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
export default function WorkspaceTabs({ section }: { section: 'forms' | 'resources' }) {
  const { role } = useDemo()
  const { pathname } = useLocation()
  const tabs = section === 'forms'
    ? [['Assignments', '/admin/forms'], ...(role === 'Administrator' ? [['Previous forms', '/admin/form-builder']] : [])]
    : [['Recommend to a mother', '/admin/reccomendresources'], ...(role === 'Administrator' ? [['Resource catalog', '/admin/resource-catalog']] : [])]
  const isForms = section === 'forms'
  return <nav
    aria-label={`${section} workspace`}
    className={isForms ? 'flex gap-2 rounded-xl border border-line bg-white p-2 shadow-sm' : 'flex flex-wrap gap-2 border-b border-line pb-3'}
  >{tabs.map(([label, to]) => <Link
    key={to}
    to={to}
    aria-current={pathname === to || (to === '/admin/form-builder' && pathname.startsWith(`${to}/`)) ? 'page' : undefined}
    className={isForms
      ? 'flex min-h-10 min-w-0 flex-1 items-center justify-center rounded-lg border border-line bg-sage px-3 py-2 text-center text-sm font-bold text-accent transition-colors hover:border-accent aria-[current=page]:border-brand aria-[current=page]:bg-brand aria-[current=page]:text-white'
      : 'rounded-lg px-4 py-3 text-sm font-semibold text-accent aria-[current=page]:bg-sage'}
  >{label}</Link>)}</nav>
}

import { Link } from 'react-router-dom'
import { useMotherState } from '../hooks/useMotherState'
import bell from '../assets/icons/bell.svg'

export default function HomeUpdates() {
  const { notifications, setNotifications } = useMotherState()
  if (!notifications.length) return null

  return <section aria-labelledby="home-updates-title" className="overflow-hidden rounded-3xl border border-[var(--sage)] bg-white shadow-sm">
    <div className="flex items-center gap-3 bg-[var(--sage-strip)] p-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white"><img src={bell} width={24} height={24} alt="" /></span>
      <div className="min-w-0 flex-1">
        <h2 id="home-updates-title" className="text-lg font-semibold text-[var(--ink)]">Your updates</h2>
        <p className="text-sm text-[var(--muted)]">{notifications.length} {notifications.length === 1 ? 'update' : 'updates'} to review</p>
      </div>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--alert)] text-sm font-semibold text-white" aria-hidden="true">{notifications.length}</span>
    </div>
    <div className="divide-y divide-[var(--border)]">
      {notifications.map(n => <article key={n.id} className="flex flex-col gap-2 p-4">
        {n.priority === 'high' && <span className="self-start rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-800">Action needed</span>}
        <h3 className="font-semibold text-[var(--ink)]">{n.title}</h3>
        <p className="text-sm">{n.message}</p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link to={n.to} className="inline-flex min-h-11 items-center font-semibold text-[var(--ink)]">View details →</Link>
          <button className="min-h-11 px-2 text-sm text-[var(--muted)]" aria-label={`Dismiss ${n.title}`} onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}>Dismiss</button>
        </div>
      </article>)}
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] px-4 py-2">
      <Link to="/notifications" className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--ink)]">All notifications</Link>
      <button className="min-h-11 px-2 text-sm text-[var(--muted)]" onClick={() => setNotifications([])}>Dismiss all</button>
    </div>
  </section>
}

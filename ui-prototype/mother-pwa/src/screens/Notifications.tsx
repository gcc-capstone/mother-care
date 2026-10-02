import { Link } from 'react-router-dom'
import { useMotherState } from '../hooks/useMotherState'
import { Page } from '../components/Page'
export default function Notifications() {
  const { notifications, setNotifications } = useMotherState()
  return <Page title="Notifications" back="/">{notifications.length ? <><button className="min-h-11 self-start font-semibold" onClick={() => setNotifications([])}>Dismiss all</button>{notifications.map(n => <article key={n.id} className="flex flex-col gap-3 rounded-3xl bg-white p-5"><h2 className="text-lg font-semibold">{n.title}</h2><p>{n.message}</p><Link className="flex min-h-11 items-center font-semibold text-[var(--ink)]" to={n.to}>View details →</Link><button className="min-h-11 self-start" aria-label={`Dismiss ${n.title}`} onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}>Dismiss</button></article>)}</> : <p className="rounded-3xl bg-white p-5" role="status">You’re all caught up. No new notifications.</p>}</Page>
}

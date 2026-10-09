import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMotherState } from '../hooks/useMotherState'
import { PrimaryButton } from './Page'
import bell from '../assets/icons/bell.svg'

export default function OpeningNotifications({ children }: { children: React.ReactNode }) {
  const { activeMotherId } = useMotherState()
  return <OpeningContent key={activeMotherId}>{children}</OpeningContent>
}
function OpeningContent({ children }: { children: React.ReactNode }) {
  const { profile, notifications, setNotifications } = useMotherState()
  const [opened, setOpened] = useState(false)
  const navigate = useNavigate()
  const heading = useRef<HTMLHeadingElement>(null)
  const show = !opened && notifications.length > 0
  useEffect(() => {
    window.scrollTo(0, 0)
    if (show) heading.current?.focus()
    else document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [show])
  if (!show) return children
  return <main className="mx-auto flex min-h-dvh max-w-[430px] flex-col gap-5 bg-[var(--bg)] px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(32px,env(safe-area-inset-top))]">
    <div className="flex size-16 items-center justify-center rounded-3xl bg-[var(--sage-strip)]"><img src={bell} alt="" width={30} height={30} /></div>
    <p className="text-sm font-semibold text-[var(--sage)]">Welcome back, {profile.firstName}</p>
    <h1 ref={heading} tabIndex={-1} className="text-3xl font-semibold text-[var(--ink)]">Your care updates</h1>
    <p>You have {notifications.length} {notifications.length === 1 ? 'update' : 'updates'} to review before getting started.</p>
    {notifications.map(n => <article key={n.id} className={`flex flex-col gap-3 rounded-3xl border bg-white p-5 ${n.priority === 'high' ? 'border-[var(--alert)]' : 'border-[var(--border)]'}`}>
      {n.priority === 'high' && <span className="self-start rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-800">Action needed</span>}
      <h2 className="text-lg font-semibold text-[var(--ink)]">{n.title}</h2><p>{n.message}</p>
      <PrimaryButton onClick={() => { setOpened(true); navigate(n.to) }}>View details</PrimaryButton>
    </article>)}
    <div className="mt-auto flex flex-col gap-2 pt-4"><PrimaryButton onClick={() => setOpened(true)}>Continue to app</PrimaryButton>
      <button className="min-h-11 font-semibold text-[var(--ink)]" onClick={() => { setNotifications([]); setOpened(true) }}>Dismiss all updates</button>
      <p className="text-center text-xs text-[var(--muted)]">Updates stay in Notifications until you dismiss them.</p>
    </div>
  </main>
}

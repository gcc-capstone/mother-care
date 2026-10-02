import { useLayoutEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])
  return null
}
export function Page({ title, back, children }: { title?: string; back?: string; children: ReactNode }) {
  return <main id="main-content" tabIndex={-1} className="flex min-w-0 flex-1 flex-col gap-4 wrap-anywhere px-4 pb-6 pt-[max(28px,env(safe-area-inset-top))] sm:px-5">
    {back && <Link to={back} className="inline-flex min-h-11 items-center self-start font-semibold text-[var(--ink)]">← Back</Link>}
    {title && <h1 className="text-2xl font-semibold leading-tight text-[var(--ink)]">{title}</h1>}
    {children}
  </main>
}
export function ActionLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">{children}</Link>
}
export function PrimaryButton({ children, onClick, disabled = false, type = 'button' }: { children: ReactNode; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit' }) {
  return <button type={type} onClick={onClick} disabled={disabled} className="min-h-11 w-full rounded-full bg-[var(--ink)] px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{children}</button>
}
export function MissingRecord({ back }: { back: string }) {
  return <Page title="Item unavailable" back={back}><p>We couldn’t find that item. Return to the list to choose another.</p></Page>
}

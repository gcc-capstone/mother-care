import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
import PersistentNavigation from '../screens/PersistantNavigation'
import { useEffect, useRef } from 'react'

export default function AdminLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  useEffect(() => {
    mainRef.current?.focus()
    window.scrollTo(0, 0)
  }, [pathname])
  const { role, setRole } = useDemo()
  const navigate = useNavigate()
  const admin = role === 'Administrator'
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <a
        href="#main-content"
        className="sr-only z-50 rounded bg-white p-3 focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>
      <PersistentNavigation />
      <div className="min-w-0 flex-1">
        <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 lg:px-8">
          <p className="text-sm text-muted">Mother Care · Staff workspace</p>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted">
              Demo role
              <select
                aria-label="Demo role"
                className="ml-2 rounded-lg border border-line p-2 text-ink"
                value={role}
                onChange={(e) => {
                  setRole(
                    e.target.value === 'Administrator'
                      ? 'Administrator'
                      : 'Counselor',
                  )
                  navigate('/admin/dashboard')
                }}
              >
                <option>Administrator</option>
                <option>Counselor</option>
              </select>
            </label>
            <div className="grid size-9 place-items-center rounded-full bg-sage font-semibold text-accent">
              {admin ? 'MS' : 'AR'}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {admin ? 'Morgan Shaw' : 'Alex Rivera'}
              </p>
              <p className="text-xs text-muted">
                {admin ? 'Administrator' : 'Counselor'} · Demo profile
              </p>
            </div>
          </div>
        </header>
        <main
          ref={mainRef}
          tabIndex={-1}
          id="main-content"
          className="outline-none"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

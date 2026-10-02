import { Link, useLocation } from 'react-router-dom'
import imgIndicator from '../assets/8ee66.svg'
import { useDemo } from '../hooks/demoContext'

export default function PersistentNavigation() {
  const { pathname } = useLocation()
  const { followUps, role } = useDemo()
  const open = followUps.filter((f) => f.status !== 'Completed').length
  return (
    <aside className="flex shrink-0 flex-col gap-5 bg-brand p-4 text-white md:sticky md:top-0 md:h-dvh md:overflow-y-auto md:w-52 lg:w-60 lg:p-5">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-[#dcece6] font-serif text-xl font-bold text-brand">
          mc
        </div>
        <div>
          <p className="font-serif text-xl font-bold">Mother Care</p>
          <p className="text-[10px] tracking-wider text-[#b9cec8]">
            FAMILY LIFE NETWORK
          </p>
        </div>
      </div>
      <nav
        aria-label="Main navigation"
        className="flex flex-wrap gap-1 md:flex-col"
      >
        {[
          ['Dashboard', '/admin/dashboard'],
          ['Mothers', '/admin/motherselection'],
          ['Appointments', '/admin/appointments'],
          ['Goals', '/admin/admingoals'],
          [`Follow-ups · ${open}`, '/admin/followup'],
          ['Forms', '/admin/forms'],
          ['Resources', '/admin/reccomendresources'],
          ['Meeting notes', '/admin/meetings'],
          ...(role === 'Administrator'
            ? [
                ['Form builder', '/admin/form-builder'],
                ['Resource catalog', '/admin/resource-catalog'],
                ['Analytics', '/admin/performance'],
                ['Care groups', '/admin/groups'],
                ['Counselors', '/admin/counselors'],
              ]
            : []),
        ].map(([label, path]) => {
          const active =
            pathname === path ||
            (label === 'Mothers' && pathname.startsWith('/admin/mothers/'))
          return (
            <Link
              key={path}
              to={path}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition ${active ? 'bg-[#2d5b52] text-white' : 'text-[#c7dad5] hover:bg-[#2d5b52]'}`}
            >
              {active && <img alt="" className="size-2" src={imgIndicator} />}
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto hidden rounded-lg bg-[#122c27] p-3 md:block">
        <p className="font-semibold">Demo workspace</p>
        <p className="mt-1 text-xs text-[#b9cec8]">
          Demo date: Oct 1, 2026. Fictional records. Changes last for this
          session.
        </p>
      </div>
    </aside>
  )
}

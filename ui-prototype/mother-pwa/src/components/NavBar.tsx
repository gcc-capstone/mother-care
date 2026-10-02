import { NavLink } from 'react-router-dom'

import resourcesIcon from '../assets/icons/nav-resources.svg'
import resourcesActiveIcon from '../assets/icons/nav-resources-active.svg'
import formsIcon from '../assets/icons/nav-forms.svg'
import formsActiveIcon from '../assets/icons/nav-forms-active.svg'
import homeIcon from '../assets/icons/nav-home.svg'
import homeActiveIcon from '../assets/icons/nav-home-active.svg'
import goalsIcon from '../assets/icons/nav-goals.svg'
import goalsActiveIcon from '../assets/icons/nav-goals-active.svg'
import earnIcon from '../assets/icons/nav-earn.svg'
import earnActiveIcon from '../assets/icons/nav-earn-active.svg'

const tabs = [
  { to: '/resources', label: 'Resources', icon: resourcesIcon, activeIcon: resourcesActiveIcon },
  { to: '/forms', label: 'Forms', icon: formsIcon, activeIcon: formsActiveIcon },
  { to: '/', label: 'Home', icon: homeIcon, activeIcon: homeActiveIcon },
  { to: '/goals', label: 'Goals', icon: goalsIcon, activeIcon: goalsActiveIcon },
  { to: '/earn', label: 'Earn', icon: earnIcon, activeIcon: earnActiveIcon },
]

export default function NavBar() {
  return (
    <nav className="sticky bottom-0 z-10 flex items-start border-t border-[var(--border)] bg-white px-2 pt-3 pb-[max(18px,env(safe-area-inset-bottom))]" aria-label="Main">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} end={tab.to === '/'} className="flex min-h-11 flex-1 flex-col items-center gap-[5px] text-[11px] font-medium text-[var(--muted)] aria-[current=page]:text-[var(--ink)]">
          {({ isActive }) => (
            <>
              <img src={isActive ? tab.activeIcon : tab.icon} width={24} height={24} alt="" />
              <span>{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

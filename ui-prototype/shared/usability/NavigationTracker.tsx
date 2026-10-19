import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import type { SessionManager } from './sessionManager.ts'

export function NavigationTracker({ manager }: { manager: SessionManager }) {
  const { pathname, key } = useLocation()
  const kind = useNavigationType()
  useEffect(() => { manager.navigate(pathname, key, kind) }, [manager, pathname, key, kind])
  return null
}

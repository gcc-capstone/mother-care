import { useEffect, useState } from 'react'
import { SessionManager } from './sessionManager.ts'
import { attachEventTracker } from './eventTracker.ts'
import { NavigationTracker } from './NavigationTracker.tsx'
import UsabilityTestingPanel from './UsabilityTestingPanel.tsx'
import type { ApplicationId } from './types.ts'

export default function UsabilityTesting({ application }: { application: ApplicationId }) {
  const [manager] = useState(() => new SessionManager(application, true))
  useEffect(() => attachEventTracker(document, manager), [manager])
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!manager.sessionCount) return
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [manager])
  return <><NavigationTracker manager={manager} /><UsabilityTestingPanel manager={manager} /></>
}

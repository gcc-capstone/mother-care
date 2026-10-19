import { useState } from 'react'
import { applicationMetrics, combinedMetrics, summaryRows } from './metrics.ts'
import type { ApplicationId, UsabilityEvent, UsabilitySession } from './types.ts'
import { taskDefinitions } from './taskDefinitions.ts'

import { seconds } from './format.ts'
const decimal = (value: number | null) => value === null ? '—' : value.toFixed(1)
const percent = (value: number | null) => value === null ? '—' : `${(value * 100).toFixed(0)}%`
const appName = (id: ApplicationId) => id === 'mother-pwa' ? "Mother's PWA" : 'Counselor/Admin'
function eventLabel(event: UsabilityEvent) {
  if (event.eventType === 'navigation') return `${event.navigationKind} navigation: ${event.previousRoute ?? 'start'} → ${event.nextRoute ?? event.route}`
  if (event.eventType === 'click' || event.eventType === 'change') return `${event.eventType}: ${event.elementId ?? event.elementType ?? 'control'} on ${event.route}`
  if (event.eventType === 'observation') return `Observer: ${event.observation ?? ''}`
  return event.eventType.replaceAll('_', ' ')
}

export default function ResultsSummary({ sessions }: { sessions: UsabilitySession[] }) {
  const [view, setView] = useState<ApplicationId | 'combined'>('combined')
  const [selected, setSelected] = useState('')
  const combined = combinedMetrics(sessions)
  const scoped = view === 'combined' ? sessions : sessions.filter(session => session.application === view)
  const rows = summaryRows(scoped)
  const timeline = scoped.find(session => session.sessionId === selected) ?? scoped.at(-1)
  return <section aria-label="Usability results" className="space-y-4 border-t border-slate-300 pt-3">
    <h3 className="font-bold">Results summary</h3>
    <label className="block">Results view <select aria-label="Results view" value={view} onChange={event => setView(event.target.value as typeof view)}><option value="combined">Combined</option><option value="mother-pwa">Mother's PWA</option><option value="admin-web">Counselor/Admin</option></select></label>
    {view === 'combined' && <p>{combined.participants} anonymous participants · {combined.sessions} sessions across both apps. Participant counts use tester IDs; reuse an ID to link a participant across apps.</p>}
    {(view === 'combined' ? combined.applications : [applicationMetrics(sessions, view)]).map(app => <section key={app.application} className="space-y-2 rounded border border-slate-300 p-3">
      <h4 className="font-bold">{appName(app.application)}</h4>
      <p>{app.participants} participants · {app.completedTasks}/{app.finishedTasks} finished attempts completed ({percent(app.completionRate)}) · {app.activeTasks} active snapshots</p>
      <p>Average completed time: {seconds(app.averageCompletionTimeMs)} · Average clicks: {decimal(app.averageClicks)} · Ease: {decimal(app.averageEaseOfUseRating)}/5</p>
      <div className="overflow-x-auto"><table className="w-full text-left text-xs"><caption className="text-left">Per-task results (retries are separate attempts)</caption><thead><tr>{['Task', 'Completed / finished', 'Success', 'Avg completed time', 'Avg clicks', 'Ease'].map(header => <th className="p-2" key={header}>{header}</th>)}</tr></thead><tbody>{app.tasks.map(task => <tr key={task.taskId}><th className="p-2">{task.taskId}</th><td className="p-2">{task.completedTasks}/{task.finishedTasks}</td><td className="p-2">{percent(task.completionRate)}</td><td className="p-2">{seconds(task.averageCompletionTimeMs)}</td><td className="p-2">{decimal(task.averageClicks)}</td><td className="p-2">{decimal(task.averageEaseOfUseRating)}</td></tr>)}</tbody></table></div>
      <p>Revisited route templates: {app.revisitedRoutes.map(route => `${route.route} (${route.revisits})`).join(', ') || 'None'}</p>
    </section>)}
    <p className="text-xs">Completion rate = completed ÷ finished attempts (including incomplete and abandoned). Time averages use completed attempts; click/ease averages use finished attempts. Delays may suggest hesitation; interpret them with notes and feedback.</p>
    <details><summary className="cursor-pointer font-semibold">Individual task outcomes ({rows.length})</summary><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr>{['Application / tester', 'Task / attempt', 'Status', 'Time', 'Clicks / navigation / revisits', 'Assistance', 'Ease', 'Notes'].map(header => <th className="p-2" key={header}>{header}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.taskAttemptId}><td className="p-2">{row.application}<br />{row.testerLabel || row.testerId}</td><td className="p-2">{row.taskId}<br />{row.taskAttemptId.slice(0, 8)}</td><td className="p-2">{row.status}</td><td className="p-2">{seconds(row.durationMs)}</td><td className="p-2">{row.totalClicks} / {row.navigationCount} / {row.repeatedRouteVisits}</td><td className="p-2">{row.assistanceInterventions}</td><td className="p-2">{row.easeOfUseRating ?? '—'}</td><td className="whitespace-pre-wrap p-2">{row.observerNotes}</td></tr>)}</tbody></table></div></details>
    <label className="block">Session timeline <select aria-label="Session timeline" value={timeline?.sessionId ?? ''} onChange={event => setSelected(event.target.value)}>{scoped.map(session => <option key={session.sessionId} value={session.sessionId}>{appName(session.application)} · {session.testerLabel || session.testerId.slice(0, 8)} · {new Date(session.startedAt).toISOString()} · {session.sessionId.slice(0, 8)}</option>)}</select></label>
    {timeline && <div>
      <p className="break-all">Session {timeline.sessionId} · tester {timeline.testerId}</p>
      {timeline.observerNotes && <p className="whitespace-pre-wrap">Session notes: {timeline.observerNotes}</p>}
      <ol className="max-h-80 space-y-1 overflow-y-auto rounded bg-slate-50 p-3 text-xs" aria-label="Recorded event timeline">{timeline.events.map(event => <li key={event.eventId} className="break-words"><time dateTime={new Date(event.timestamp).toISOString()}>{seconds(event.elapsedMs)}</time> · {event.taskId ? `${event.taskId} (${event.taskAttemptId?.slice(0, 8)})` : 'Between tasks'} · {eventLabel(event)}{event.taskElapsedMs !== null && ` · task ${seconds(event.taskElapsedMs)}`}{event.timeSincePreviousClickMs !== null && ` · click gap ${seconds(event.timeSincePreviousClickMs)}`}</li>)}</ol>
      <p className="text-xs">Elapsed offsets use a monotonic clock. Absolute timestamps are in JSON/CSV. Route templates hide record IDs. No interaction is labeled a wrong turn automatically.</p>
    </div>}
    {!sessions.length && <p>No sessions yet. Start testing or import a MotherCare JSON export.</p>}
    <details><summary>Task reference</summary>{Object.entries(taskDefinitions).map(([app, tasks]) => <p key={app}>{app}: {tasks.map(task => `${task.id} ${task.title}`).join('; ')}</p>)}</details>
  </section>
}

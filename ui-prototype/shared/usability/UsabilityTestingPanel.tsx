import { useEffect, useState, useSyncExternalStore } from 'react'
import type { SessionManager } from './sessionManager.ts'
import type { ApplicationId, TaskStatus, UsabilitySession } from './types.ts'
import { taskDefinitions } from './taskDefinitions.ts'
import { downloadFile, eventsCsv, sessionsJson, summaryCsv } from './exportService.ts'
import ResultsSummary from './ResultsSummary.tsx'
import { seconds } from './format.ts'

export default function UsabilityTestingPanel({ manager }: { manager: SessionManager }) {
  useSyncExternalStore(manager.subscribe, manager.getSnapshot, manager.getSnapshot)
  const [, tick] = useState(0)
  const [label, setLabel] = useState('')
  const [participantId, setParticipantId] = useState('')
  const [consent, setConsent] = useState(false)
  const [taskId, setTaskId] = useState(taskDefinitions[manager.application][0].id)
  const [note, setNote] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [message, setMessage] = useState('')
  const session = manager.currentSession
  const active = manager.activeTask
  const latestTask = active ?? session?.tasks.at(-1)
  const task = taskDefinitions[manager.application].find(task => task.id === (active?.taskId ?? taskId))!
  useEffect(() => {
    if (!session) return
    const timer = window.setInterval(() => tick(value => value + 1), 500)
    return () => window.clearInterval(timer)
  }, [session])
  const run = (action: () => void) => {
    try { action(); setMessage('') } catch (error) { setMessage(error instanceof Error ? error.message : 'Operation failed.') }
  }
  const saveNote = () => { if (note.trim()) manager.addNote(note); setNote('') }
  const finish = (status: Exclude<TaskStatus, 'active'>) => run(() => { saveNote(); manager.finishTask(status) })
  const exportData = (scope: 'current' | 'all', format: 'json' | 'events' | 'summary', application = manager.application) => run(() => {
    saveNote()
    const sessions = manager.getSessions().filter(item => scope === 'all' || item.sessionId === session?.sessionId)
    if (!sessions.length) throw new Error('No session to export.')
    exportSessions(sessions, format, application)
  })
  const importFile = async (file: File | undefined) => {
    if (!file) return
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error('Import limit is 10 MB.')
      const count = manager.importJson(await file.text())
      setMessage(`Imported ${count} sessions; duplicate identifiers were combined.`)
      setShowResults(true)
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Import failed.') }
  }
  return <aside data-usability-exclude="true" aria-label="Usability testing observer panel" className="relative z-20 w-full border-b-2 border-slate-400 bg-white text-sm text-slate-900 [&_button]:min-h-10 [&_button]:rounded [&_button]:border [&_button]:border-slate-400 [&_button]:px-3 [&_button]:py-2 [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-40 [&_input:not([type=checkbox])]:max-w-full [&_input:not([type=checkbox])]:rounded [&_input:not([type=checkbox])]:border [&_input:not([type=checkbox])]:p-2 [&_select]:max-w-full [&_select]:rounded [&_select]:border [&_select]:p-2 [&_textarea]:rounded [&_textarea]:border [&_textarea]:p-2">
    <details>
      <summary className="cursor-pointer px-4 py-3 font-semibold">Usability testing · {manager.application} · {session ? `Recording${active ? ` · ${active.taskId} · ${seconds(manager.taskElapsedMs)}` : ' · between tasks'}` : 'Recording off'}</summary>
      <div className="mx-auto max-w-5xl space-y-3 p-4 pt-0">
        <p>Observer controls. Obtain consent and use synthetic accounts/data only. Collapse this panel while the tester works; it stays in page flow and does not cover application controls.</p>
        <p className="text-xs">In memory only: export before refreshing or closing this tab. Notes are intentional observer text; omit names and sensitive details.</p>
        {!session ? <fieldset className="space-y-3"><legend className="font-semibold">New anonymous session</legend>
          <label className="block">Tester label (optional, e.g. Tester 01) <input value={label} maxLength={10} placeholder="Tester 01" onChange={event => setLabel(event.target.value)} /></label>
          <label className="block">Anonymous tester ID (optional; reuse across apps) <input value={participantId} maxLength={36} placeholder="Leave blank to generate a UUID" onChange={event => setParticipantId(event.target.value.trim())} /></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />Participant has explicitly consented to this recording</label>
          <button disabled={!consent} onClick={() => run(() => { manager.startSession(label, consent, participantId); setConsent(false) })}>Start new session</button>
        </fieldset> : <>
          <p className="break-all">Session: {session.sessionId}<br />Anonymous tester ID (copy to reuse): <code>{session.testerId}</code> {session.testerLabel}</p>
          <label className="block">Representative task <select aria-label="Representative task" value={active?.taskId ?? taskId} disabled={!!active} onChange={event => setTaskId(event.target.value)}>{taskDefinitions[manager.application].map(task => <option key={task.id} value={task.id}>{task.id}: {task.title}</option>)}</select></label>
          <p><strong>Read to tester:</strong> {task.instruction}</p><p className="text-xs"><strong>Observer preparation:</strong> {task.preparation}</p>
          <div className="flex flex-wrap gap-2"><button disabled={!!active} onClick={() => run(() => { saveNote(); manager.startTask(taskId) })}>Start task timer</button><button disabled={!active} onClick={() => finish('completed')}>Mark completed</button><button disabled={!active} onClick={() => finish('abandoned')}>Mark abandoned</button><button disabled={!active} onClick={() => finish('incomplete')}>Mark incomplete</button></div>
          <p aria-live="off">{active ? `Active task: ${active.taskId} · ${seconds(manager.taskElapsedMs)}` : latestTask ? `Last task: ${latestTask.taskId} · ${latestTask.status} · ${seconds(latestTask.durationMs)}` : 'No task started.'}</p>
          <label className="flex items-center gap-2"><input type="checkbox" disabled={!active || active.assistanceInterventions > 0} checked={(active?.assistanceInterventions ?? 0) > 0} onChange={event => manager.setAssistance(event.target.checked)} />Assistance provided</label>
          {!!active?.assistanceInterventions && <button onClick={() => manager.addAssistanceIntervention()}>Record another assistance intervention ({active.assistanceInterventions})</button>}
          <label className="block">Ease of use for {latestTask?.taskId ?? 'task'} (1 difficult – 5 easy) <select aria-label="Ease of use rating" disabled={!latestTask} value={latestTask?.easeOfUseRating ?? ''} onChange={event => latestTask && manager.setRating(latestTask.attemptId, event.target.value ? Number(event.target.value) : null)}><option value="">Unrated</option>{[1, 2, 3, 4, 5].map(rating => <option key={rating} value={rating}>{rating}</option>)}</select></label>
          <label className="block">Observer note (current or latest task; session note before first task)<textarea className="block w-full" rows={2} maxLength={2000} value={note} onChange={event => setNote(event.target.value)} /></label>
          <button disabled={!note.trim()} onClick={() => run(saveNote)}>Add observer note</button>
          <p className="text-xs">Finishing or ending a session saves the draft note. Ending with a running task marks it incomplete. Once recorded, assistance cannot be removed.</p>
          <button onClick={() => run(() => { saveNote(); manager.endSession() })}>End session</button>
          <div className="flex flex-wrap gap-2">{(['json', 'events', 'summary'] as const).map(format => <button key={format} onClick={() => exportData('current', format)}>Export current {format === 'json' ? 'JSON' : `${format} CSV`}</button>)}</div>
        </>}
        <div className="flex flex-wrap gap-2"><button onClick={() => setShowResults(value => !value)}>{showResults ? 'Close' : 'Open'} results summary</button><button disabled={!manager.sessionCount} onClick={() => exportData('all', 'json')}>Export all sessions JSON</button></div>
        <label className="block">Import MotherCare session JSON (either application)<input className="block w-full" type="file" accept=".json,application/json" onChange={event => { void importFile(event.target.files?.[0]); event.target.value = '' }} /></label>
        {message && <p role="status" className="rounded bg-slate-100 p-2">{message}</p>}
        {showResults && <><div className="flex flex-wrap gap-2">{(['mother-pwa', 'admin-web'] as const).map(app => <div key={app} className="flex flex-wrap gap-2"><button onClick={() => exportData('all', 'events', app)}>Export {app} events CSV</button><button onClick={() => exportData('all', 'summary', app)}>Export {app} summary CSV</button></div>)}</div><ResultsSummary sessions={manager.getSessions()} /></>}
      </div>
    </details>
  </aside>
}
function exportSessions(sessions: UsabilitySession[], format: 'json' | 'events' | 'summary', application: ApplicationId) {
  if (format === 'json') downloadFile('mothercare-usability-sessions.json', sessionsJson(sessions), 'application/json;charset=utf-8')
  else {
    const name = application === 'mother-pwa' ? 'mother-pwa' : 'admin'
    downloadFile(`mothercare-${name}-${format}.csv`, format === 'events' ? eventsCsv(sessions, application) : summaryCsv(sessions, application), 'text/csv;charset=utf-8')
  }
}

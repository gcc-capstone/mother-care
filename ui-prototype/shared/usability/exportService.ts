import type { ApplicationId, EventType, NavigationKind, SessionExport, TaskAttempt, TaskStatus, UsabilityEvent, UsabilitySession } from './types.ts'
import { isUuid, safeElementId, safeRoute, testerLabel } from './privacy.ts'
import { taskDefinitions } from './taskDefinitions.ts'
import { summaryRows } from './metrics.ts'

export function csvCell(value: unknown): string {
  let text = value === null || value === undefined ? '' : String(value)
  // Whitespace/control prefixes can hide spreadsheet formulas. Quote every cell as well.
  // eslint-disable-next-line no-control-regex -- Spreadsheet security must include control prefixes.
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = `'${text}`
  return `"${text.replaceAll('"', '""')}"`
}
function csv(headers: readonly string[], rows: Record<string, unknown>[]): string {
  return [headers.map(csvCell).join(','), ...rows.map(row => headers.map(header => csvCell(row[header])).join(','))].join('\r\n')
}
const eventHeaders = ['application', 'sessionId', 'testerId', 'testerLabel', 'taskId', 'taskAttemptId', 'eventId', 'eventType', 'timestamp', 'elapsedMs', 'taskElapsedMs', 'timeSincePreviousEventMs', 'timeSincePreviousInteractionMs', 'timeSincePreviousClickMs', 'route', 'elementId', 'elementType', 'previousRoute', 'nextRoute', 'navigationKind', 'observation']
const summaryHeaders = ['application', 'sessionId', 'testerId', 'testerLabel', 'taskId', 'taskAttemptId', 'status', 'completedWithoutAssistance', 'assistanceProvided', 'assistanceInterventions', 'startedAt', 'endedAt', 'durationMs', 'totalClicks', 'navigationCount', 'repeatedRouteVisits', 'easeOfUseRating', 'observerNotes', 'interactionIntervalsMs', 'clickIntervalsMs']
export function eventsCsv(sessions: UsabilitySession[], application: ApplicationId): string {
  return csv(eventHeaders, sessions.filter(session => session.application === application).flatMap(session => session.events.map(event => ({ ...event, testerId: session.testerId, testerLabel: session.testerLabel }))))
}
export function summaryCsv(sessions: UsabilitySession[], application: ApplicationId): string {
  return csv(summaryHeaders, summaryRows(sessions.filter(session => session.application === application)).map(row => ({ ...row, interactionIntervalsMs: JSON.stringify(row.interactionIntervalsMs), clickIntervalsMs: JSON.stringify(row.clickIntervalsMs) })))
}
export function sessionsJson(sessions: UsabilitySession[]): string {
  const envelope: SessionExport = { schemaVersion: 1, exportedAt: Date.now(), sessions }
  return JSON.stringify(envelope, null, 2)
}
export function downloadFile(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Reconstruct imported data from a strict schema; ignore unknown properties. Never trust a spread of JSON.
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid JSON object.')
  return value as Record<string, unknown>
}
function text(value: unknown, max = 10000): string {
  if (typeof value !== 'string' || value.length > max) throw new Error('Invalid or oversized text field.')
  return value
}
function uuid(value: unknown): string {
  const id = text(value, 36)
  if (!isUuid(id)) throw new Error('Invalid anonymous identifier.')
  return id
}
function number(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) throw new Error('Invalid timing or count.')
  return value
}
function nullableNumber(value: unknown) { return value === null ? null : number(value) }
function boolean(value: unknown): boolean {
  if (typeof value !== 'boolean') throw new Error('Invalid boolean.')
  return value
}
function list(value: unknown, max: number): unknown[] {
  if (!Array.isArray(value) || value.length > max) throw new Error('Invalid or oversized collection.')
  return value
}
function choice<T extends string>(value: unknown, options: readonly T[]): T {
  if (!options.includes(value as T)) throw new Error('Unsupported value in import.')
  return value as T
}
function uniqueById<T>(items: T[], id: (item: T) => string): T[] {
  const result = new Map<string, T>()
  for (const item of items) if (!result.has(id(item))) result.set(id(item), item)
  return [...result.values()]
}
function parseSession(value: unknown): UsabilitySession {
  const raw = object(value)
  const application = choice<ApplicationId>(raw.application, ['mother-pwa', 'admin-web'])
  const sessionId = uuid(raw.sessionId)
  if (raw.consentConfirmed !== true) throw new Error('Imported sessions require confirmed consent.')
  const taskIds = taskDefinitions[application].map(task => task.id)
  const tasks = uniqueById(list(raw.tasks, 500).map(value => {
    const task = object(value)
    const rating = nullableNumber(task.easeOfUseRating)
    if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) throw new Error('Invalid ease rating.')
    const interventions = number(task.assistanceInterventions)
    if (!Number.isInteger(interventions)) throw new Error('Invalid intervention count.')
    const status = choice<TaskStatus>(task.status, ['active', 'completed', 'abandoned', 'incomplete'])
    const endedAt = nullableNumber(task.endedAt)
    if ((status === 'active') !== (endedAt === null)) throw new Error('Invalid task lifecycle.')
    return { attemptId: uuid(task.attemptId), taskId: choice(task.taskId, taskIds), status,
      startedAt: number(task.startedAt), endedAt, startElapsedMs: number(task.startElapsedMs), durationMs: number(task.durationMs),
      assistanceProvided: boolean(task.assistanceProvided) || interventions > 0, assistanceInterventions: interventions,
      easeOfUseRating: rating, observerNotes: text(task.observerNotes),
    } satisfies TaskAttempt
  }), task => task.attemptId)
  if (tasks.filter(task => task.status === 'active').length > 1) throw new Error('Multiple active tasks in one session.')
  const events = uniqueById(list(raw.events, 100000).map(value => {
    const event = object(value)
    if (event.sessionId !== sessionId || event.application !== application) throw new Error('Event belongs to another session or application.')
    const attemptId = event.taskAttemptId === null ? null : uuid(event.taskAttemptId)
    const task = tasks.find(task => task.attemptId === attemptId)
    if (attemptId !== null && !task) throw new Error('Event references an unknown task attempt.')
    if (event.taskId !== (task?.taskId ?? '')) throw new Error('Event task does not match its attempt.')
    const parsed: UsabilityEvent = {
      eventId: uuid(event.eventId), sessionId, application, taskId: task?.taskId ?? '', taskAttemptId: attemptId,
      eventType: choice<EventType>(event.eventType, ['session_start', 'session_end', 'click', 'change', 'navigation', 'task_start', 'task_complete', 'task_abandon', 'task_incomplete', 'observation']),
      timestamp: number(event.timestamp), elapsedMs: number(event.elapsedMs), taskElapsedMs: nullableNumber(event.taskElapsedMs),
      timeSincePreviousEventMs: nullableNumber(event.timeSincePreviousEventMs),
      timeSincePreviousInteractionMs: nullableNumber(event.timeSincePreviousInteractionMs), timeSincePreviousClickMs: nullableNumber(event.timeSincePreviousClickMs),
      route: safeRoute(application, text(event.route, 2000)),
    }
    if (event.elementId !== undefined) parsed.elementId = safeElementId(text(event.elementId, 2000))
    if (event.elementType !== undefined) parsed.elementType = choice(event.elementType, ['button', 'a', 'input', 'select', 'textarea', 'summary', 'role-button', 'role-link', 'control'])
    if (event.previousRoute !== undefined) parsed.previousRoute = safeRoute(application, text(event.previousRoute, 2000))
    if (event.nextRoute !== undefined) parsed.nextRoute = safeRoute(application, text(event.nextRoute, 2000))
    if (event.navigationKind !== undefined) parsed.navigationKind = choice<NavigationKind>(event.navigationKind, ['PUSH', 'REPLACE', 'POP', 'initial'])
    if (event.observation !== undefined) parsed.observation = text(event.observation, 2000)
    return parsed
  }), event => event.eventId).sort((a, b) => a.elapsedMs - b.elapsedMs)
  const session: UsabilitySession = {
    sessionId, application, testerId: uuid(raw.testerId), testerLabel: testerLabel(text(raw.testerLabel, 30)), consentConfirmed: true,
    startedAt: number(raw.startedAt), endedAt: nullableNumber(raw.endedAt), durationMs: number(raw.durationMs),
    observerNotes: text(raw.observerNotes), tasks, events,
  }
  if (session.endedAt !== null && tasks.some(task => task.status === 'active')) throw new Error('Ended session has an active task.')
  return session
}
export function parseSessions(json: string): UsabilitySession[] {
  if (json.length > 10 * 1024 * 1024) throw new Error('Import limit is 10 MB.')
  const envelope = object(JSON.parse(json))
  if (envelope.schemaVersion !== 1) throw new Error('Unsupported usability export version; expected schemaVersion 1.')
  return mergeSessions([], list(envelope.sessions, 500).map(parseSession))
}
export function mergeSessions(existing: UsabilitySession[], incoming: UsabilitySession[]): UsabilitySession[] {
  const sessions = new Map<string, UsabilitySession>()
  const eventOwners = new Map<string, string>()
  const attemptOwners = new Map<string, string>()
  for (const session of [...existing, ...incoming]) {
    for (const event of session.events) {
      const owner = eventOwners.get(event.eventId)
      if (owner && owner !== session.sessionId) throw new Error('Conflicting event identifier across sessions.')
      eventOwners.set(event.eventId, session.sessionId)
    }
    for (const task of session.tasks) {
      const owner = attemptOwners.get(task.attemptId)
      if (owner && owner !== session.sessionId) throw new Error('Conflicting task identifier across sessions.')
      attemptOwners.set(task.attemptId, session.sessionId)
    }
    const old = sessions.get(session.sessionId)
    if (!old) { sessions.set(session.sessionId, session); continue }
    if (old.application !== session.application || old.testerId !== session.testerId || old.startedAt !== session.startedAt) throw new Error('Conflicting session identity.')
    const newer = (session.endedAt !== null && old.endedAt === null) || (session.endedAt === old.endedAt && session.durationMs >= old.durationMs)
    const preferred = newer ? session : old
    const other = newer ? old : session
    const tasks = uniqueById([...preferred.tasks, ...other.tasks].map(task => {
      const alternate = other.tasks.find(item => item.attemptId === task.attemptId)
      return task.status === 'active' && alternate && alternate.status !== 'active' ? alternate : task
    }), task => task.attemptId)
    const events = uniqueById([...old.events, ...session.events], event => event.eventId).sort((a, b) => a.elapsedMs - b.elapsedMs)
    sessions.set(session.sessionId, { ...preferred, tasks, events })
  }
  return [...sessions.values()].sort((a, b) => a.startedAt - b.startedAt)
}

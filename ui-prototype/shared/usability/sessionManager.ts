import type { ApplicationId, EventType, NavigationKind, TaskAttempt, TaskStatus, UsabilityEvent, UsabilitySession } from './types.ts'
import { isUuid, safeElementId, safeRoute, testerLabel } from './privacy.ts'
import { taskDefinitions } from './taskDefinitions.ts'
import { mergeSessions, parseSessions } from './exportService.ts'

interface Clock { now(): number; timestamp(): number; uuid(): string }
const browserClock: Clock = { now: () => performance.now(), timestamp: () => Date.now(), uuid: () => crypto.randomUUID() }
type EventDetails = Pick<UsabilityEvent, 'elementId' | 'elementType' | 'previousRoute' | 'nextRoute' | 'navigationKind' | 'observation'>

export class SessionManager {
  readonly application: ApplicationId
  private enabled: boolean
  private clock: Clock
  private sessions: UsabilitySession[] = []
  private current: UsabilitySession | null = null
  private started = 0
  private route = '/'
  private locationKey = ''
  private lastEvent: number | null = null
  private lastInteraction: number | null = null
  private lastClick: number | null = null
  private version = 0
  private listeners = new Set<() => void>()

  constructor(application: ApplicationId, enabled: boolean, clock: Clock = browserClock) {
    this.application = application
    this.enabled = enabled
    this.clock = clock
  }
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener) } }
  getSnapshot = () => this.version
  private changed() { this.version++; this.listeners.forEach(listener => listener()) }
  get sessionCount() { return this.sessions.length }
  get currentSession() { return this.current }
  get activeTask() { return this.current?.tasks.find(task => task.status === 'active') ?? null }
  get elapsedMs() { return this.current ? Math.max(0, this.clock.now() - this.started) : 0 }
  get taskElapsedMs() { return this.activeTask ? Math.max(0, this.elapsedMs - this.activeTask.startElapsedMs) : 0 }
  getSessions(): UsabilitySession[] {
    const copies = structuredClone(this.sessions)
    const current = copies.find(session => session.sessionId === this.current?.sessionId)
    if (current) {
      current.durationMs = this.elapsedMs
      for (const task of current.tasks) if (task.status === 'active') task.durationMs = Math.max(0, current.durationMs - task.startElapsedMs)
    }
    return copies
  }
  startSession(label: string, consent: boolean, participantId = '') {
    if (!this.enabled) throw new Error('Recording is unavailable outside the explicitly enabled development server.')
    if (!consent) throw new Error('Confirm participant consent before recording.')
    if (this.current) throw new Error('End the current session first.')
    const anonymousLabel = testerLabel(label)
    if (participantId && !isUuid(participantId)) throw new Error('Anonymous tester ID must be a UUID copied from a previous session.')
    this.started = this.clock.now()
    this.lastEvent = this.lastInteraction = this.lastClick = null
    this.current = {
      sessionId: this.clock.uuid(), testerId: participantId || this.clock.uuid(), testerLabel: anonymousLabel,
      application: this.application, consentConfirmed: true, startedAt: this.clock.timestamp(), endedAt: null,
      durationMs: 0, observerNotes: '', tasks: [], events: [],
    }
    this.sessions.push(this.current)
    this.record('session_start')
    this.record('navigation', { nextRoute: this.route, navigationKind: 'initial' })
    this.changed()
  }
  startTask(taskId: string) {
    if (!this.current) throw new Error('Start a session first.')
    if (this.activeTask) throw new Error('Finish the active task first.')
    if (!taskDefinitions[this.application].some(task => task.id === taskId)) throw new Error('Unknown task for this application.')
    this.lastInteraction = this.lastClick = null
    this.current.tasks.push({ attemptId: this.clock.uuid(), taskId, status: 'active', startedAt: this.clock.timestamp(), endedAt: null,
      startElapsedMs: this.elapsedMs, durationMs: 0, assistanceProvided: false, assistanceInterventions: 0, easeOfUseRating: null, observerNotes: '' })
    this.record('task_start')
  }
  finishTask(status: Exclude<TaskStatus, 'active'>) {
    const task = this.activeTask
    if (!task) throw new Error('No active task.')
    this.record(status === 'completed' ? 'task_complete' : status === 'abandoned' ? 'task_abandon' : 'task_incomplete')
    task.durationMs = this.taskElapsedMs
    task.endedAt = this.clock.timestamp()
    task.status = status
    this.lastInteraction = this.lastClick = null
    this.changed()
  }
  setAssistance(provided: boolean) {
    if (provided && this.activeTask && !this.activeTask.assistanceProvided) this.addAssistanceIntervention()
  }
  addAssistanceIntervention() {
    const task = this.activeTask
    if (!task) return
    task.assistanceProvided = true
    task.assistanceInterventions++
    this.record('observation', { observation: 'Observer marked an assistance intervention.' })
  }
  setRating(attemptId: string, rating: number | null) {
    const task = this.current?.tasks.find(item => item.attemptId === attemptId)
    if (!task) return
    if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) throw new Error('Ease rating must be 1–5.')
    task.easeOfUseRating = rating
    this.changed()
  }
  addNote(note: string) {
    if (!this.current || !note.trim()) return
    const value = note.trim().slice(0, 2000)
    const task = this.activeTask ?? this.current.tasks.at(-1)
    if (task) task.observerNotes = [task.observerNotes, value].filter(Boolean).join('\n').slice(0, 10000)
    else this.current.observerNotes = [this.current.observerNotes, value].filter(Boolean).join('\n').slice(0, 10000)
    this.record('observation', { observation: value }, task)
  }
  endSession() {
    if (!this.current) return
    if (this.activeTask) this.finishTask('incomplete')
    this.record('session_end')
    this.current.durationMs = this.elapsedMs
    this.current.endedAt = this.clock.timestamp()
    this.current = null
    this.changed()
  }
  navigate(pathname: string, key: string, kind: NavigationKind) {
    const next = safeRoute(this.application, pathname)
    if (key === this.locationKey && next === this.route) return
    const previous = this.route
    this.route = next
    this.locationKey = key
    this.record('navigation', { previousRoute: previous, nextRoute: next, navigationKind: kind })
  }
  interaction(type: 'click' | 'change', elementType: string, elementId?: string) {
    const safeType = ['button', 'a', 'input', 'select', 'textarea', 'summary', 'role-button', 'role-link'].includes(elementType) ? elementType : 'control'
    this.record(type, { elementType: safeType, elementId: safeElementId(elementId ?? null) })
  }
  private record(eventType: EventType, details: EventDetails = {}, task: TaskAttempt | null | undefined = this.activeTask) {
    if (!this.current || !this.enabled) return
    const elapsed = this.elapsedMs
    const interaction = eventType === 'click' || eventType === 'change'
    const click = eventType === 'click'
    this.current.events.push({
      eventId: this.clock.uuid(), sessionId: this.current.sessionId, application: this.application,
      taskId: task?.taskId ?? '', taskAttemptId: task?.attemptId ?? null, eventType,
      timestamp: this.clock.timestamp(), elapsedMs: elapsed,
      taskElapsedMs: task ? Math.max(0, elapsed - task.startElapsedMs) : null,
      timeSincePreviousEventMs: this.lastEvent === null ? null : Math.max(0, elapsed - this.lastEvent),
      timeSincePreviousInteractionMs: interaction && this.lastInteraction !== null ? Math.max(0, elapsed - this.lastInteraction) : null,
      timeSincePreviousClickMs: click && this.lastClick !== null ? Math.max(0, elapsed - this.lastClick) : null,
      route: this.route, ...details,
    })
    this.lastEvent = elapsed
    if (interaction) this.lastInteraction = elapsed
    if (click) this.lastClick = elapsed
    this.changed()
  }
  importJson(json: string) {
    const incoming = parseSessions(json)
    if (this.current && incoming.some(session => session.sessionId === this.current?.sessionId)) throw new Error('End the active session before importing a snapshot of it.')
    this.sessions = mergeSessions(this.sessions, incoming)
    this.changed()
    return incoming.length
  }
}

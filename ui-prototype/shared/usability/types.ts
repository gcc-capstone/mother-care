export type ApplicationId = 'mother-pwa' | 'admin-web'
export type TaskStatus = 'active' | 'completed' | 'abandoned' | 'incomplete'
export type EventType = 'session_start' | 'session_end' | 'click' | 'change' | 'navigation' | 'task_start' | 'task_complete' | 'task_abandon' | 'task_incomplete' | 'observation'
export type NavigationKind = 'PUSH' | 'REPLACE' | 'POP' | 'initial'

export interface UsabilityEvent {
  eventId: string
  sessionId: string
  application: ApplicationId
  taskId: string // Empty between tasks; attempt ID distinguishes retries.
  taskAttemptId: string | null
  eventType: EventType
  timestamp: number
  elapsedMs: number // Monotonic offset from session start.
  taskElapsedMs: number | null
  timeSincePreviousEventMs: number | null
  timeSincePreviousInteractionMs: number | null
  timeSincePreviousClickMs: number | null
  route: string // Route template only, never record IDs, queries, or hashes.
  elementId?: string
  elementType?: string
  previousRoute?: string
  nextRoute?: string
  navigationKind?: NavigationKind
  observation?: string // Explicit observer entry only.
}
export interface TaskAttempt {
  attemptId: string
  taskId: string
  status: TaskStatus
  startedAt: number
  endedAt: number | null
  startElapsedMs: number
  durationMs: number
  assistanceProvided: boolean
  assistanceInterventions: number
  easeOfUseRating: number | null
  observerNotes: string
}
export interface UsabilitySession {
  sessionId: string
  testerId: string
  testerLabel: string
  application: ApplicationId
  consentConfirmed: true
  startedAt: number
  endedAt: number | null
  durationMs: number
  observerNotes: string
  tasks: TaskAttempt[]
  events: UsabilityEvent[]
}
export interface SessionExport {
  schemaVersion: 1
  exportedAt: number
  sessions: UsabilitySession[]
}
export interface TaskDefinition {
  id: string
  title: string
  instruction: string
  preparation: string
}

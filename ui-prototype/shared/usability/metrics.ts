import type { ApplicationId, TaskAttempt, UsabilitySession } from './types.ts'

export function taskMetrics(session: UsabilitySession, task: TaskAttempt) {
  const events = session.events.filter(event => event.taskAttemptId === task.attemptId)
  const visits = new Map<string, number>()
  for (const event of events) {
    if (event.eventType === 'task_start' || event.eventType === 'navigation') visits.set(event.route, (visits.get(event.route) ?? 0) + 1)
  }
  const revisitedRoutes = [...visits].filter(([, count]) => count > 1).map(([route, count]) => ({ route, revisits: count - 1 }))
  const assistanceProvided = task.assistanceProvided || task.assistanceInterventions > 0
  return {
    application: session.application, sessionId: session.sessionId, testerId: session.testerId, testerLabel: session.testerLabel,
    taskId: task.taskId, taskAttemptId: task.attemptId, status: task.status,
    completedWithoutAssistance: task.status === 'completed' && !assistanceProvided,
    assistanceProvided, assistanceInterventions: task.assistanceInterventions,
    startedAt: task.startedAt, endedAt: task.endedAt, durationMs: task.durationMs,
    totalClicks: events.filter(event => event.eventType === 'click').length,
    navigationCount: events.filter(event => event.eventType === 'navigation').length,
    repeatedRouteVisits: revisitedRoutes.reduce((sum, item) => sum + item.revisits, 0), revisitedRoutes,
    easeOfUseRating: task.easeOfUseRating, observerNotes: task.observerNotes,
    interactionIntervalsMs: events.flatMap(event => event.timeSincePreviousInteractionMs === null ? [] : [event.timeSincePreviousInteractionMs]),
    clickIntervalsMs: events.flatMap(event => event.timeSincePreviousClickMs === null ? [] : [event.timeSincePreviousClickMs]),
  }
}
export type TaskMetrics = ReturnType<typeof taskMetrics>
export function summaryRows(sessions: UsabilitySession[]) { return sessions.flatMap(session => session.tasks.map(task => taskMetrics(session, task))) }
const average = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null
export function aggregateTasks(rows: TaskMetrics[]) {
  const finished = rows.filter(row => row.status !== 'active')
  const completed = finished.filter(row => row.status === 'completed')
  const routes = new Map<string, number>()
  for (const row of rows) for (const item of row.revisitedRoutes) routes.set(item.route, (routes.get(item.route) ?? 0) + item.revisits)
  return {
    attempts: rows.length, finishedTasks: finished.length, activeTasks: rows.length - finished.length,
    completedTasks: completed.length, completionRate: finished.length ? completed.length / finished.length : null,
    averageCompletionTimeMs: average(completed.map(row => row.durationMs)),
    averageClicks: average(finished.map(row => row.totalClicks)),
    averageEaseOfUseRating: average(finished.flatMap(row => row.easeOfUseRating === null ? [] : [row.easeOfUseRating])),
    assistanceInterventions: finished.reduce((sum, row) => sum + row.assistanceInterventions, 0),
    revisitedRoutes: [...routes].map(([route, revisits]) => ({ route, revisits })).sort((a, b) => b.revisits - a.revisits),
  }
}
export function applicationMetrics(sessions: UsabilitySession[], application: ApplicationId) {
  const scoped = sessions.filter(session => session.application === application)
  const rows = summaryRows(scoped)
  return {
    application, participants: new Set(scoped.map(session => session.testerId)).size, sessions: scoped.length,
    ...aggregateTasks(rows),
    tasks: [...new Set(rows.map(row => row.taskId))].map(taskId => ({ taskId, ...aggregateTasks(rows.filter(row => row.taskId === taskId)) })),
  }
}
export function combinedMetrics(sessions: UsabilitySession[]) {
  return { participants: new Set(sessions.map(session => session.testerId)).size, sessions: sessions.length,
    applications: [applicationMetrics(sessions, 'mother-pwa'), applicationMetrics(sessions, 'admin-web')] }
}

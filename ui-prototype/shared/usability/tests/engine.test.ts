import assert from 'node:assert/strict'
import { test } from 'node:test'
import { SessionManager } from '../sessionManager.ts'
import { applicationMetrics, combinedMetrics, summaryRows } from '../metrics.ts'
import { csvCell, eventsCsv, mergeSessions, parseSessions, sessionsJson, summaryCsv } from '../exportService.ts'
import { safeRoute } from '../privacy.ts'
import { usabilityEnabled } from '../buildGate.ts'
import type { ApplicationId } from '../types.ts'

function fixture(application: ApplicationId = 'mother-pwa', enabled = true) {
  let monotonic = 0
  let absolute = 1800000000000
  const manager = new SessionManager(application, enabled, { now: () => monotonic, timestamp: () => absolute, uuid: () => crypto.randomUUID() })
  const taskId = application === 'mother-pwa' ? 'PWA-01' : 'ADMIN-01'
  return { manager, taskId,
    advance: (ms: number) => { monotonic += ms; absolute += ms },
    changeWallClock: (ms: number) => { absolute += ms },
    start: (testerId = '') => { manager.navigate(application === 'mother-pwa' ? '/' : '/admin/dashboard', 'initial', 'POP'); manager.startSession('Tester 01', true, testerId); manager.startTask(taskId) },
  }
}
for (const application of ['mother-pwa', 'admin-web'] as const) {
  test(`${application}: explicit consent, anonymous IDs, no recording before or after a session`, () => {
    const f = fixture(application)
    f.manager.interaction('click', 'button')
    assert.deepEqual(f.manager.getSessions(), [])
    assert.throws(() => f.manager.startSession('', false), /consent/)
    assert.throws(() => f.manager.startSession('A real name', true), /anonymous/)
    assert.throws(() => f.manager.startSession('', true, 'person@example.com'), /UUID/)
    f.start()
    const session = f.manager.currentSession!
    assert.match(session.sessionId, /^[0-9a-f-]{36}$/)
    assert.notEqual(session.sessionId, session.testerId)
    assert.equal(session.application, application)
    assert.throws(() => f.manager.startSession('', true), /End the current/)
    f.manager.endSession()
    const count = f.manager.getSessions()[0].events.length
    f.manager.interaction('click', 'button')
    assert.equal(f.manager.getSessions()[0].events.length, count)
    assert.equal(f.manager.getSessions()[0].tasks[0].status, 'incomplete')
  })
  test(`${application}: one active interval, retry IDs, all terminal outcomes`, () => {
    const f = fixture(application)
    assert.throws(() => f.manager.startTask(f.taskId), /session/)
    f.start()
    assert.throws(() => f.manager.startTask(f.taskId), /Finish/)
    f.advance(1500)
    f.manager.finishTask('completed')
    assert.throws(() => f.manager.finishTask('completed'), /No active/)
    assert.throws(() => f.manager.startTask('FAKE-01'), /Unknown/)
    f.manager.startTask(f.taskId); f.advance(200); f.manager.finishTask('abandoned')
    f.manager.startTask(f.taskId); f.advance(300); f.manager.endSession()
    const session = f.manager.getSessions()[0]
    assert.deepEqual(session.tasks.map(task => task.status), ['completed', 'abandoned', 'incomplete'])
    assert.deepEqual(session.tasks.map(task => task.durationMs), [1500, 200, 300])
    assert.equal(new Set(session.tasks.map(task => task.attemptId)).size, 3)
    assert.equal(session.durationMs, 2000)
    assert.ok(session.events.some(event => event.eventType === 'task_abandon'))
    assert.ok(session.events.some(event => event.eventType === 'task_incomplete'))
  })
  test(`${application}: monotonic time, event order, click intervals independent of route and observer events`, () => {
    const f = fixture(application); f.start()
    f.advance(100); f.manager.interaction('click', 'button', 'resource-filters')
    f.advance(200); f.manager.navigate(application === 'mother-pwa' ? '/resources?secret=x#private' : '/admin/mothers/private?token=x', 'a', 'PUSH')
    f.advance(100); f.manager.addNote('Tester paused here.')
    f.changeWallClock(-60000)
    f.advance(600); f.manager.interaction('click', 'button')
    f.advance(250); f.manager.interaction('change', 'input', 'resource-search')
    f.advance(250); f.manager.finishTask('completed')
    const session = f.manager.getSessions()[0]
    const clicks = session.events.filter(event => event.eventType === 'click')
    assert.equal(clicks[0].timeSincePreviousClickMs, null)
    assert.equal(clicks[1].timeSincePreviousClickMs, 900)
    assert.equal(clicks[1].timeSincePreviousInteractionMs, 900)
    assert.equal(clicks[1].timeSincePreviousEventMs, 600)
    assert.equal(session.tasks[0].durationMs, 1500)
    assert.deepEqual(session.events.map(event => event.elapsedMs), [...session.events.map(event => event.elapsedMs)].sort((a, b) => a - b))
    assert.ok(session.events.at(-1)!.timestamp < session.startedAt)
    assert.equal(summaryRows([session])[0].totalClicks, 2)
  })
  test(`${application}: route tracking deduplicates StrictMode effect and captures POP plus template revisits`, () => {
    const f = fixture(application); f.start()
    const first = application === 'mother-pwa' ? '/' : '/admin/dashboard'
    const detail = application === 'mother-pwa' ? '/resources/sensitive-id' : '/admin/mothers/sensitive-id'
    f.manager.navigate(first, 'initial', 'POP') // Same initial effect is ignored.
    f.manager.navigate(detail, 'detail', 'PUSH')
    f.manager.navigate(detail, 'detail', 'PUSH')
    f.manager.navigate(first, 'back', 'POP')
    f.manager.navigate(detail, 'forward', 'POP')
    f.manager.finishTask('completed')
    const row = summaryRows(f.manager.getSessions())[0]
    assert.equal(row.navigationCount, 3)
    assert.equal(row.repeatedRouteVisits, 2)
    assert.ok(!sessionsJson(f.manager.getSessions()).includes('sensitive-id'))
    assert.equal(f.manager.getSessions()[0].events.filter(event => event.navigationKind === 'POP').length, 2)
  })
}

test('production protection covers builds, custom modes and non-exact flags', () => {
  assert.equal(usabilityEnabled('serve', 'development', 'true'), true)
  for (const mode of ['production', 'testing', 'development']) assert.equal(usabilityEnabled('build', mode, 'true'), false)
  assert.equal(usabilityEnabled('serve', 'production', 'true'), false)
  for (const flag of [undefined, 'false', '1', 'TRUE']) assert.equal(usabilityEnabled('serve', 'development', flag), false)
  const f = fixture('mother-pwa', false)
  assert.throws(() => f.manager.startSession('', true), /unavailable/)
  f.manager.interaction('click', 'button')
  assert.deepEqual(f.manager.getSessions(), [])
})
test('privacy uses fixed route templates and semantic IDs, never arbitrary identifiers', () => {
  assert.equal(safeRoute('mother-pwa', '/profile?email=private#token'), '/profile')
  assert.equal(safeRoute('mother-pwa', '/goals/private-identity'), '/goals/:id')
  assert.equal(safeRoute('admin-web', '/admin/mothers/secret'), '/admin/mothers/:motherId')
  assert.equal(safeRoute('admin-web', '/admin/form-builder/secret'), '/admin/form-builder/:id')
  assert.equal(safeRoute('mother-pwa', '/private/path/value?token=secret'), '/:unrecognized')
  const f = fixture(); f.start(); f.manager.interaction('click', 'private-element', 'private-name')
  const event = f.manager.currentSession!.events.at(-1)!
  assert.equal(event.elementType, 'control'); assert.equal(event.elementId, undefined)
})
test('assistance interventions are counted, cannot be erased and ratings validated', () => {
  const f = fixture(); f.start()
  f.manager.setAssistance(true); f.manager.setAssistance(true); f.manager.setAssistance(false)
  f.manager.addAssistanceIntervention()
  const attemptId = f.manager.activeTask!.attemptId
  assert.throws(() => f.manager.setRating(attemptId, 6), /1–5/)
  f.manager.setRating(attemptId, 4); f.manager.addNote('Needed a navigation hint.'); f.manager.finishTask('completed')
  f.manager.setRating(attemptId, 3)
  const row = summaryRows(f.manager.getSessions())[0]
  assert.equal(row.assistanceProvided, true); assert.equal(row.assistanceInterventions, 2)
  assert.equal(row.completedWithoutAssistance, false); assert.equal(row.easeOfUseRating, 3)
  assert.equal(row.observerNotes, 'Needed a navigation hint.')
})
test('per-app and combined metrics keep tasks separate and deduplicate tester IDs, not labels', () => {
  const mother = fixture(); mother.start(); mother.advance(1000); mother.manager.interaction('click', 'button'); mother.manager.setRating(mother.manager.activeTask!.attemptId, 4); mother.manager.finishTask('completed')
  mother.manager.startTask('PWA-02'); mother.advance(3000); mother.manager.finishTask('abandoned')
  mother.manager.startTask('PWA-03') // Active attempt excluded from success denominator and finished averages.
  const admin = fixture('admin-web'); admin.start(mother.manager.currentSession!.testerId); admin.advance(5000); admin.manager.finishTask('completed')
  const sessions = [...mother.manager.getSessions(), ...admin.manager.getSessions()]
  const pwa = applicationMetrics(sessions, 'mother-pwa')
  assert.equal(pwa.completionRate, 0.5); assert.equal(pwa.averageCompletionTimeMs, 1000)
  assert.equal(pwa.averageClicks, 0.5); assert.equal(pwa.averageEaseOfUseRating, 4)
  assert.equal(pwa.tasks.length, 3); assert.equal(pwa.activeTasks, 1)
  const both = combinedMetrics(sessions)
  assert.equal(both.participants, 1); assert.equal(both.sessions, 2)
  assert.equal(both.applications[1].averageCompletionTimeMs, 5000)
  assert.equal(both.applications[1].completionRate, 1)
})
test('CSV escaping handles quotes, commas, newlines, formulas and control-prefix formulas', () => {
  assert.equal(csvCell('a,"b"\nc'), '"a,""b""\nc"')
  for (const value of ['=HYPERLINK("bad")', '+1+1', '-1+1', '@SUM(A1)', '  =1+1', '\t=1+1', '\u0001=1']) assert.ok(csvCell(value).startsWith('"\''))
  assert.equal(csvCell(null), '""'); assert.equal(csvCell(0), '"0"')
  const f = fixture(); f.start(); f.manager.addNote('=bad,"quoted"\nnext'); f.manager.finishTask('completed'); f.manager.endSession()
  const sessions = f.manager.getSessions()
  assert.match(eventsCsv(sessions, 'mother-pwa'), /"application","sessionId","testerId"/)
  assert.match(summaryCsv(sessions, 'mother-pwa'), /"completedWithoutAssistance"/)
  assert.ok(summaryCsv(sessions, 'mother-pwa').includes('"\'=bad,""quoted""\nnext"'))
  assert.equal(eventsCsv(sessions, 'admin-web').split('\r\n').length, 1)
})
test('JSON round trip, cross-app imports, repeated files and earlier snapshots merge without duplication', () => {
  const f = fixture(); f.start(); f.advance(20)
  const early = sessionsJson(f.manager.getSessions())
  f.manager.interaction('click', 'button'); f.advance(10); f.manager.finishTask('completed'); f.manager.endSession()
  const late = sessionsJson(f.manager.getSessions())
  const admin = fixture('admin-web'); admin.start(); admin.manager.endSession()
  const receiver = new SessionManager('admin-web', true)
  receiver.importJson(early); receiver.importJson(late); receiver.importJson(late); receiver.importJson(early)
  receiver.importJson(sessionsJson(admin.manager.getSessions()))
  const sessions = receiver.getSessions()
  assert.equal(sessions.length, 2)
  const mother = sessions.find(session => session.application === 'mother-pwa')!
  assert.equal(mother.tasks.length, 1); assert.equal(mother.tasks[0].status, 'completed')
  assert.equal(mother.events.length, f.manager.getSessions()[0].events.length)
  assert.equal(new Set(mother.events.map(event => event.eventId)).size, mother.events.length)
  assert.deepEqual(parseSessions(sessionsJson(sessions)), sessions)
})
test('imports strip unknown data and private routes/IDs; malformed imports are atomic', () => {
  const f = fixture(); f.start(); f.manager.interaction('click', 'button'); f.manager.endSession()
  const raw = JSON.parse(sessionsJson(f.manager.getSessions()))
  raw.sessions[0].privateData = 'secret'
  raw.sessions[0].events[0].rawValue = 'secret'
  raw.sessions[0].events[0].route = '/profile?token=secret'
  raw.sessions[0].events[0].elementId = 'secret'
  const clean = parseSessions(JSON.stringify(raw))
  assert.ok(!sessionsJson(clean).includes('secret'))
  const receiver = new SessionManager('admin-web', true); receiver.importJson(sessionsJson(clean))
  const bad = structuredClone(raw); bad.sessions[0].events[0].elapsedMs = -1
  assert.throws(() => receiver.importJson(JSON.stringify(bad)), /timing/)
  assert.equal(receiver.getSessions().length, 1)
  assert.throws(() => parseSessions('{'), SyntaxError)
  assert.throws(() => parseSessions('{"schemaVersion":2,"sessions":[]}'), /version/)
  assert.throws(() => parseSessions('x'.repeat(10 * 1024 * 1024 + 1)), /10 MB/)
  bad.sessions[0].events[0].elapsedMs = 0; bad.sessions[0].events[0].taskId = 'FAKE'
  assert.throws(() => parseSessions(JSON.stringify(bad)), /match/)
})
test('identity collisions are rejected and import cannot replace a live session', () => {
  const f = fixture(); f.start()
  assert.throws(() => f.manager.importJson(sessionsJson(f.manager.getSessions())), /active session/)
  const first = f.manager.getSessions()[0]
  const duplicate = structuredClone(first); duplicate.application = 'admin-web'
  assert.throws(() => mergeSessions([first], [duplicate]), /identity/)
  const other = structuredClone(first); other.sessionId = crypto.randomUUID()
  assert.throws(() => mergeSessions([first], [other]), /identifier/)
})
test('session snapshots cannot mutate the recording and live durations are exported', () => {
  const f = fixture(); f.start(); f.advance(150)
  const snapshot = f.manager.getSessions()[0]
  assert.equal(snapshot.durationMs, 150); assert.equal(snapshot.tasks[0].durationMs, 150)
  snapshot.events.length = 0
  assert.ok(f.manager.currentSession!.events.length > 0)
})

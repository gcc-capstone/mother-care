const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('typescript')
const filename = path.resolve(__dirname, '../src/data/mockData.ts')
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText
const moduleData = new Module(filename, module)
moduleData._compile(compiled, filename)
const {
  mockMothers: mothers,
  mockCounselors: counselors,
  mockGoals: goals,
  mockResources: resources,
  mockFollowUps: followUps,
  mockForms: forms,
  mockAssignments: assignments,
  mockMeetings: meetings,
  mockGroups: groups,
  demoToday,
} = moduleData.exports
for (const records of [
  mothers,
  counselors,
  goals,
  resources,
  followUps,
  forms,
  assignments,
  meetings,
  groups,
]) {
  assert.equal(
    new Set(records.map((r) => r.id)).size,
    records.length,
    'IDs must be unique in each dataset',
  )
}
const motherIds = new Set(mothers.map((m) => m.id))
const resourceIds = new Set(resources.map((r) => r.id))
const goalIds = new Set(goals.map((g) => g.id))
const names = new Set(counselors.map((c) => c.name))
for (const records of [goals, followUps, assignments, meetings])
  for (const r of records)
    assert(motherIds.has(r.motherId), `Missing mother: ${r.id}`)
for (const mother of mothers) {
  assert(names.has(mother.counselor), `Missing counselor: ${mother.id}`)
  assert(
    mother.appointment.slice(0, 10) >= demoToday,
    `Appointment must be upcoming: ${mother.id}`,
  )
  const ownGoals = goals.filter((g) => g.motherId === mother.id)
  assert(
    ownGoals.some((g) => g.status === 'Active') &&
      ownGoals.some((g) => g.status === 'Completed'),
    `Goal coverage: ${mother.id}`,
  )
  const ownFollowUps = followUps.filter((f) => f.motherId === mother.id)
  assert(
    ownFollowUps.some((f) => f.type === 'Referral' && f.status === 'Completed'),
    `Completed referral coverage: ${mother.id}`,
  )
  assert(
    ownFollowUps.some((f) => f.status !== 'Completed'),
    `Open review coverage: ${mother.id}`,
  )
  const ownAssignments = assignments.filter((a) => a.motherId === mother.id)
  assert(
    ownAssignments.some((a) => a.status === 'Assigned') &&
      ownAssignments.some((a) => a.status === 'Completed'),
    `Form coverage: ${mother.id}`,
  )
  assert(
    meetings.filter((m) => m.motherId === mother.id).length >= 2,
    `Meeting coverage: ${mother.id}`,
  )
  assert(
    groups.some((g) => g.motherIds.includes(mother.id)),
    `Group coverage: ${mother.id}`,
  )
}
for (const c of counselors)
  assert(
    mothers.filter((m) => m.counselor === c.name).length >= 3,
    `Caseload coverage: ${c.name}`,
  )
for (const f of followUps) {
  if (f.resourceId)
    assert(resourceIds.has(f.resourceId), `Missing resource: ${f.id}`)
  if (f.goalId) {
    assert(goalIds.has(f.goalId), `Missing goal: ${f.id}`)
    assert.equal(
      goals.find((g) => g.id === f.goalId).motherId,
      f.motherId,
      `Goal belongs to another mother: ${f.id}`,
    )
  }
  if (f.status === 'Completed') {
    assert(f.outcome && f.loggedAt, `Completed outcome details: ${f.id}`)
    assert(f.loggedAt.slice(0, 10) <= demoToday)
  }
}
for (const a of assignments) {
  assert(a.questions.length > 0)
  assert(forms.some((f) => f.title === a.title && f.version === a.version))
  if (a.status === 'Completed') assert(a.due <= demoToday)
}
for (const m of meetings) {
  assert(names.has(m.author))
  assert(m.date <= demoToday)
  assert(!m.followUp || m.followUp >= m.date)
}
for (const g of groups) {
  assert(names.has(g.counselor))
  for (const id of g.motherIds) {
    assert(motherIds.has(id))
    assert.equal(mothers.find((m) => m.id === id).counselor, g.counselor)
  }
}
assert(goals.some((g) => g.status === 'Active' && g.due < demoToday))
assert(resources.some((r) => r.availability === 'Waitlist'))
assert(forms.some((f) => !f.published))
console.log(
  `Mock data verified: ${mothers.length} mothers, ${counselors.length} counselors, ${goals.length} goals, ${resources.length} resources, ${followUps.length} reviews, ${assignments.length} form assignments, ${meetings.length} meetings, ${groups.length} groups.`,
)

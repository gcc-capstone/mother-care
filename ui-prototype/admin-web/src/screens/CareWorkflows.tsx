import MoodBadge from '../components/MoodBadge'
import WorkspaceTabs from '../components/WorkspaceTabs'
import { resolveDefault } from '../utils/formDefaults'
import { mockCounselors } from '../data/mockData'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
import {
  Badge,
  Button,
  Empty,
  Field,
  MotherPicker,
  Page,
  Panel,
  Stats,
  CaseLinks,
} from '../components/ui'
import { inputClass, splitClass } from '../utils/uiClasses'

export function CareDashboard() {
  const {
    mothers: allMothers,
    followUps: allFollowUps,
    assignments: allAssignments,
    role,
    counselorId,
  } = useDemo()
  const profile =
    mockCounselors.find((c) => c.id === counselorId) ?? mockCounselors[0]
  const mothers =
    role === 'Administrator'
      ? allMothers
      : allMothers.filter((m) => m.counselor === profile.name)
  const ids = new Set(mothers.map((m) => m.id))
  const followUps = allFollowUps.filter((f) => ids.has(f.motherId))
  const assignments = allAssignments.filter((a) => ids.has(a.motherId))
  return (
    <Page title="Care dashboard">
      <p className="text-muted">{role} workspace · October 1, 2026</p>
      <Stats
        items={[
          { label: 'Mothers', value: mothers.length },
          {
            label: 'Open follow-ups',
            value: followUps.filter((f) => f.status !== 'Completed').length,
          },
          {
            label: 'Forms awaiting completion',
            value: assignments.filter((a) => a.status === 'Assigned').length,
          },
          {
            label: 'Upcoming appointments',
            value: mothers.filter((m) => m.appointment >= '2026-10-01').length,
          },
        ]}
      />
      <div className={splitClass}>
        <Panel title="Review queue">
          {!followUps.some(f => f.status !== 'Completed') && <Empty>No open follow-ups.</Empty>}
          {followUps
            .filter((f) => f.status !== 'Completed')
            .sort((a, b) => a.due.localeCompare(b.due))
            .slice(0, 6)
            .map((f) => (
              <div key={f.id} className="border-b border-line py-3">
                <Link
                  to={`/admin/followup?record=${f.id}`}
                  className="font-semibold text-accent underline"
                >
                  {f.title}
                </Link>
                <p>
                  {mothers.find((m) => m.id === f.motherId)?.name} · Due {f.due}
                </p>
                <Badge>{f.status}</Badge>
              </div>
            ))}
          <Link className="block text-accent underline" to="/admin/followup">
            View all follow-ups
          </Link>
        </Panel>
        <Panel title="Care workflows">
          {!mothers.length && <Empty>No mothers assigned yet.</Empty>}
          <div className="space-y-2">
            {mothers.map((m) => (
              <Link
                key={m.id}
                to={`/admin/mothers/${m.id}`}
                className="flex items-center justify-between gap-3 rounded-lg bg-canvas p-3 text-accent"
              >
                <span className="min-w-0 underline">{m.name}</span><span className="shrink-0"><MoodBadge mother={m} /></span>
              </Link>
            ))}
          </div>
          <CaseLinks />
          <Link className="block text-accent underline" to="/admin/forms">
            Assign a form
          </Link>
          <Link className="block text-accent underline" to="/admin/meetings">
            Log a meeting
          </Link>
          <Link
            className="block text-accent underline"
            to="/admin/appointments"
          >
            Manage appointments
          </Link>
        </Panel>
      </div>
    </Page>
  )
}
export function Appointments() {
  const { mothers, setMothers, selectedId } = useDemo()
  const [message, setMessage] = useState('')
  const mother = mothers.find((m) => m.id === selectedId)
  return (
    <Page title="Appointments">
      <MotherPicker />
      <div className={splitClass}>
        <Panel title="Upcoming appointments">
          {!mothers.some(m => m.appointment) && <Empty>No appointments scheduled.</Empty>}
          {[...mothers]
            .filter((m) => m.appointment)
            .sort((a, b) => a.appointment.localeCompare(b.appointment))
            .map((m) => (
              <div key={m.id} className="border-b border-line py-3">
                <Link
                  className="font-semibold text-accent underline"
                  to={`/admin/mothers/${m.id}`}
                >
                  {m.name}
                </Link>
                <p>
                  {m.appointment.replace('T', ' at ')} · {m.counselor}
                </p>
              </div>
            ))}
        </Panel>
        {mother && (
          <Panel title={`Schedule for ${mother.name}`}>
            <form
              key={selectedId}
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const date = String(new FormData(e.currentTarget).get('date'))
                setMothers((ms) =>
                  ms.map((m) =>
                    m.id === selectedId ? { ...m, appointment: date } : m,
                  ),
                )
                setMessage('Appointment saved.')
              }}
            >
              <Field label="Appointment date and time">
                <input
                  className={inputClass}
                  name="date"
                  type="datetime-local"
                  required
                  defaultValue={mother.appointment}
                />
              </Field>
              <Button type="submit">Save appointment</Button>
              <Button secondary type="reset">
                Cancel changes
              </Button>
            </form>
          </Panel>
        )}
      </div>
      <p role="status">{message}</p>
    </Page>
  )
}
export function Forms() {
  const { forms, assignments, setAssignments, selectedId, mothers, role } = useDemo()
  const [message, setMessage] = useState('')
  return (
    <Page title="Forms" action={role === 'Administrator' ? <Link to="/admin/form-builder/new" className="inline-flex min-h-10 items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">New form +</Link> : undefined}>
      <WorkspaceTabs section="forms" />
      <MotherPicker />
      <div className={splitClass}>
        <Panel title="Assign a published form">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const d = new FormData(e.currentTarget)
              const f = forms.find((f) => f.id === d.get('form'))
              if (!f) return
              setAssignments((as) => [
                {
                  id: crypto.randomUUID(),
                  motherId: selectedId,
                  title: f.title,
                  version: f.version,
                  questions: [...f.questions],
                  questionDefaults: structuredClone(f.questionDefaults ?? []),
                  responses: f.questions.map((_, i) => resolveDefault(f.questionDefaults?.[i], mothers.find(m => m.id === selectedId))),
                  due: String(d.get('due')),
                  status: 'Assigned',
                },
                ...as,
              ])
              setMessage(
                `${f.title} assigned. The assigned version is preserved when the form changes.`,
              )
            }}
          >
            <Field label="Published form">
              <select className={inputClass} name="form" required>
                {forms
                  .filter((f) => f.published)
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.title} · Version {f.version}
                    </option>
                  ))}
              </select>
            </Field>
            <Field label="Due before appointment">
              <input
                className={inputClass}
                type="date"
                name="due"
                required
                defaultValue="2026-10-02"
              />
            </Field>
            <Button type="submit" disabled={!forms.some((f) => f.published)}>
              Assign form
            </Button>
          </form>
          <p role="status">{message}</p>
        </Panel>
        <Panel title="Selected mother's forms">
          {assignments
            .filter((a) => a.motherId === selectedId)
            .map((a) => (
              <article
                className="rounded-lg bg-canvas p-4 space-y-2"
                key={a.id}
              >
                <strong>
                  {a.title} · v{a.version}
                </strong>
                <p>
                  {mothers.find((m) => m.id === a.motherId)?.name} · Due {a.due}
                </p>
                <Badge>{a.status}</Badge>
                <details>
                  <summary className="cursor-pointer text-accent">
                    View assigned questions
                  </summary>
                  <ol className="list-decimal pl-5">
                    {a.questions.map((q, i) => (
                      <li key={i}>{q}{a.responses?.[i] && <p className="text-sm text-accent">Pre-populated response: {a.responses[i]} (editable by mother)</p>}</li>
                    ))}
                  </ol>
                </details>
                <Button
                  secondary
                  onClick={() =>
                    setAssignments((as) =>
                      as.map((item) =>
                        item.id === a.id
                          ? {
                              ...item,
                              status:
                                item.status === 'Assigned'
                                  ? 'Completed'
                                  : 'Assigned',
                            }
                          : item,
                      ),
                    )
                  }
                >
                  {a.status === 'Assigned'
                    ? 'Simulate completion'
                    : 'Reopen assignment'}
                </Button>
              </article>
            ))}
          {!assignments.some((a) => a.motherId === selectedId) && (
            <Empty>No forms assigned.</Empty>
          )}
        </Panel>
      </div>
    </Page>
  )
}
export function Meetings() {
  const { meetings, setMeetings, selectedId, role, counselorId, setFollowUps } =
    useDemo()
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  return (
    <Page title="Meeting notes">
      <MotherPicker />
      <div className={splitClass}>
        <Panel title="Meeting history">
          <Field label="Search meetings">
            <input
              className={inputClass}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
          {meetings
            .filter(
              (m) =>
                m.motherId === selectedId &&
                `${m.summary} ${m.type}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
            )
            .map((m) => (
              <article
                key={m.id}
                className="rounded-lg bg-canvas p-4 space-y-2"
              >
                <strong>
                  {m.date} · {m.type}
                </strong>
                <p>{m.summary}</p>
                <Badge>Mother-visible summary</Badge>
                <details>
                  <summary className="cursor-pointer">
                    Internal counseling notes
                  </summary>
                  <p>{m.internalNotes || 'No internal notes.'}</p>
                </details>
                <p className="text-xs text-muted">
                  Logged by {m.author}
                  {m.followUp && ` · Follow-up ${m.followUp}`}
                </p>
              </article>
            ))}
          {!meetings.some(
            (m) =>
              m.motherId === selectedId &&
              `${m.summary} ${m.type}`
                .toLowerCase()
                .includes(search.toLowerCase()),
          ) && (
            <Empty>
              {search
                ? 'No meetings match your search.'
                : 'No meetings logged.'}
            </Empty>
          )}
        </Panel>
        <Panel title="Log a meeting">
          <form
            key={selectedId}
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const d = new FormData(e.currentTarget)
              const summary = String(d.get('summary')).trim()
              if (!summary) return
              const due = String(d.get('followUp'))
              setMeetings((ms) => [
                {
                  id: crypto.randomUUID(),
                  motherId: selectedId,
                  date: String(d.get('date')),
                  type: String(d.get('type')),
                  summary,
                  internalNotes: String(d.get('notes')).trim(),
                  author:
                    role === 'Administrator'
                      ? 'Morgan Shaw'
                      : (mockCounselors.find((c) => c.id === counselorId)
                          ?.name ?? 'Alex Rivera'),
                  followUp: due,
                },
                ...ms,
              ])
              if (due)
                setFollowUps((fs) => [
                  {
                    id: crypto.randomUUID(),
                    motherId: selectedId,
                    title: 'Meeting follow-up',
                    type: 'Goal',
                    due,
                    status: 'Scheduled',
                    feedback: '',
                    notes: summary,
                    shared: false,
                  },
                  ...fs,
                ])
              e.currentTarget.reset()
              setMessage(
                'Meeting saved. Summary is mother-visible; counseling notes remain internal.',
              )
            }}
          >
            <Field label="Meeting date">
              <input
                className={inputClass}
                name="date"
                type="date"
                required
                defaultValue="2026-10-01"
              />
            </Field>
            <Field label="Meeting type">
              <select className={inputClass} name="type">
                <option>In person</option>
                <option>Phone</option>
                <option>Video</option>
              </select>
            </Field>
            <Field label="Mother-visible summary">
              <textarea
                className={inputClass}
                name="summary"
                required
                rows={3}
              />
            </Field>
            <Field label="Internal counseling notes">
              <textarea className={inputClass} name="notes" rows={3} />
            </Field>
            <Field label="Optional follow-up date">
              <input className={inputClass} name="followUp" type="date" />
            </Field>
            <div className="flex gap-2">
              <Button type="submit">Save meeting</Button>
              <Button secondary type="reset">
                Cancel
              </Button>
            </div>
          </form>
          <p role="status">{message}</p>
        </Panel>
      </div>
    </Page>
  )
}

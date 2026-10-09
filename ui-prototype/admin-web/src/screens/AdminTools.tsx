import MoodBadge from '../components/MoodBadge'
import WorkspaceTabs from '../components/WorkspaceTabs'
import { counselors, mockCounselors } from '../data/mockData'
import { useRef, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { Resource } from '../types/domain'
import { useDemo } from '../hooks/demoContext'
import { Badge, Button, Empty, Field, Page, Panel } from '../components/ui'
import { inputClass, splitClass } from '../utils/uiClasses'
export function AdminOnly({ children }: { children: ReactNode }) {
  const { role } = useDemo()
  return role === 'Administrator' ? (
    children
  ) : (
    <Navigate to="/admin/dashboard" replace />
  )
}
export function ResourceCatalog() {
  const { resources, setResources } = useDemo()
  const [editing, setEditing] = useState<Resource | null>(null)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [draftVersion, setDraftVersion] = useState(0)
  const results = resources.filter((r) =>
    `${r.name} ${r.county} ${r.service}`.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <Page
      title="Resource catalog"
      action={<Button onClick={() => {
        setEditing(null)
        setDraftVersion(v => v + 1)
        setDeleting(null)
        setMessage('')
        formRef.current?.scrollIntoView({ block: 'center' })
      }}>New resource</Button>}
    >
      <WorkspaceTabs section="resources" />
      <div className={splitClass}>
        <Panel title="Manage community services">
          <Field label="Search catalog">
            <input
              className={inputClass}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
          {results.map((r) => (
              <article
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-canvas p-3"
              >
                <div>
                  <strong>{r.name}</strong>
                  <p>
                    {r.service} · {r.county}
                  </p>
                  <Badge>{r.availability}</Badge><p className="mt-1 text-sm text-muted">Follow up after {r.followUpDays ?? 7} days</p>
                </div>
                <div className="flex gap-2">
                  <Link className="inline-flex min-h-10 items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white" to={`/admin/reccomendresources?resource=${r.id}`}>Recommend</Link>
                  <Button
                    secondary
                    onClick={() => {
                      setEditing(r)
                      setDeleting(null)
                    }}
                  >
                    Edit {r.name}
                  </Button>
                  <Button secondary onClick={() => setDeleting(r.id)}>
                    Delete
                  </Button>
                </div>
                {deleting === r.id && (
                  <div className="w-full space-y-2">
                    <p>
                      Delete {r.name} from the directory? Existing referrals
                      retain their history.
                    </p>
                    <Button
                      onClick={() => {
                        setResources((rs) =>
                          rs.filter((item) => item.id !== r.id),
                        )
                        setDeleting(null)
                        if (editing?.id === r.id) setEditing(null)
                        setMessage('Resource deleted.')
                      }}
                    >
                      Confirm deletion
                    </Button>
                    <Button secondary onClick={() => setDeleting(null)}>
                      Cancel deletion
                    </Button>
                  </div>
                )}
              </article>
            ))}
          {!results.length && (
            <Empty>{resources.length ? 'No resources match your search.' : 'No resources. Add a community service to begin.'}</Empty>
          )}
        </Panel>
        <Panel title={editing ? 'Edit resource' : 'Add resource'}>
          <form
            ref={formRef}
            key={editing?.id ?? `new-${draftVersion}`}
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              const d = new FormData(e.currentTarget)
              const text = (n: string) => String(d.get(n)).trim()
              if (!text('name') || !text('service') || !text('county')) return
              const r: Resource = {
                id: editing?.id ?? crypto.randomUUID(),
                name: text('name'),
                service: text('service'),
                county: text('county'),
                address: text('address'),
                hours: text('hours'),
                followUpDays: Number(d.get('followUpDays')),
                mode: d.get('mode') === 'Digital' ? 'Digital' : 'Physical',
                availability:
                  d.get('availability') === 'Waitlist'
                    ? 'Waitlist'
                    : 'Available',
              }
              setResources((rs) =>
                editing
                  ? rs.map((item) => (item.id === editing.id ? r : item))
                  : [r, ...rs],
              )
              setEditing(null)
              setSearch('')
              e.currentTarget.reset()
              setMessage('Resource saved and available in recommendations.')
            }}
          >
            {(['name', 'service', 'county', 'address', 'hours'] as const).map(
              (key) => (
                <Field key={key} label={key[0].toUpperCase() + key.slice(1)}>
                  <input
                    className={inputClass}
                    name={key}
                    required
                    defaultValue={editing?.[key] ?? ''}
                  />
                </Field>
              ),
            )}
            <Field label="Default follow-up duration (days)">
              <input type="number" name="followUpDays" min={1} max={365} step={1} required className={inputClass} defaultValue={editing?.followUpDays ?? 7} />
            </Field>
            <p className="text-sm text-muted">New recommendations automatically schedule a follow-up this many days later. Staff can adjust the date for each mother.</p>
            <Field label="Delivery">
              <select
                name="mode"
                className={inputClass}
                defaultValue={editing?.mode}
              >
                <option>Physical</option>
                <option>Digital</option>
              </select>
            </Field>
            <Field label="Availability">
              <select
                name="availability"
                className={inputClass}
                defaultValue={editing?.availability}
              >
                <option>Available</option>
                <option>Waitlist</option>
              </select>
            </Field>
            <div className="flex gap-2">
              <Button type="submit">Save resource</Button>
              <Button secondary type="reset" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </Panel>
      </div>
      <p role="status">{message}</p>
    </Page>
  )
}
export { FormLibrary as FormBuilder } from './FormBuilder'
export function CareGroups() {
  const { mothers, setMothers, groups, setGroups } = useDemo()
  const [selected, setSelected] = useState('')
  const group = groups.find((g) => g.id === selected)
  const [message, setMessage] = useState('')
  return (
    <Page title="Care groups">
      <p className="text-muted">
        Organize mothers into local care cohorts and assign a counselor to the
        group.
      </p>
      <div className={splitClass}>
        <Panel title="Groups">
          {groups.map((g) => (
            <div key={g.id} className="rounded-lg bg-canvas p-3">
              <button
                className="font-semibold text-accent underline"
                onClick={() => setSelected(g.id)}
              >
                {g.name}
              </button>
              <p>
                {g.motherIds.length} mothers · {g.counselor}
              </p>
            </div>
          ))}
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              const d = new FormData(e.currentTarget)
              const name = String(d.get('name')).trim()
              if (!name) return
              const id = crypto.randomUUID()
              setGroups((gs) => [
                ...gs,
                { id, name, counselor: 'Alex Rivera', motherIds: [] },
              ])
              setSelected(id)
              e.currentTarget.reset()
            }}
          >
            <Field label="New group name">
              <input className={inputClass} name="name" required />
            </Field>
            <Button type="submit">Create group</Button>
          </form>
        </Panel>
        {group && (
          <Panel title={group.name}>
            <Field label="Group counselor">
              <select
                className={inputClass}
                value={group.counselor}
                onChange={(e) =>
                  setGroups((gs) =>
                    gs.map((g) =>
                      g.id === selected
                        ? { ...g, counselor: e.target.value }
                        : g,
                    ),
                  )
                }
              >
                {counselors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <fieldset className="space-y-3">
              <legend className="font-semibold">Group members</legend>
              {mothers.map((m) => (
                <label key={m.id} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={group.motherIds.includes(m.id)}
                    onChange={(e) =>
                      setGroups((gs) =>
                        gs.map((g) =>
                          g.id === selected
                            ? {
                                ...g,
                                motherIds: e.target.checked
                                  ? [...g.motherIds, m.id]
                                  : g.motherIds.filter((id) => id !== m.id),
                              }
                            : g,
                        ),
                      )
                    }
                  />
                  {m.name} · {m.county}
                </label>
              ))}
            </fieldset>
            <Button
              disabled={!group.motherIds.length}
              onClick={() => {
                setMothers((ms) =>
                  ms.map((m) =>
                    group.motherIds.includes(m.id)
                      ? { ...m, counselor: group.counselor }
                      : m,
                  ),
                )
                setMessage('Counselor assigned to all group members.')
              }}
            >
              Assign counselor to members
            </Button>
            <p role="status">{message}</p>
          </Panel>
        )}
      </div>
    </Page>
  )
}

export function CounselorDirectory() {
  const { mothers, goals, followUps, meetings } = useDemo()
  return (
    <Page title="Counselor caseloads">
      <div className="grid gap-5 xl:grid-cols-3">
        {mockCounselors.map((c) => {
          const cases = mothers.filter((m) => m.counselor === c.name)
          const ids = new Set(cases.map((m) => m.id))
          return (
            <Panel key={c.id} title={c.name}>
              <p className="text-muted">{c.focus}</p>
              <p>{c.counties.join(' · ')}</p>
              <Badge>{cases.length} mothers</Badge>
              <p>
                {
                  goals.filter(
                    (g) => ids.has(g.motherId) && g.status === 'Active',
                  ).length
                }{' '}
                active goals ·{' '}
                {
                  followUps.filter(
                    (f) => ids.has(f.motherId) && f.status !== 'Completed',
                  ).length
                }{' '}
                open reviews
              </p>
              <p>
                {meetings.filter((m) => ids.has(m.motherId)).length} meetings
                logged
              </p>
              {cases.map((m) => (
                <Link
                  key={m.id}
                  to={`/admin/mothers/${m.id}`}
                  className="block rounded-lg bg-canvas p-3 font-semibold text-accent underline"
                >
                  <span className="flex items-center justify-between gap-3"><span className="min-w-0">{m.name}</span><span className="shrink-0"><MoodBadge mother={m} /></span></span>
                  <span className="mt-2 block font-normal text-muted">
                    Next appointment{' '}
                    {m.appointment.replace('T', ' at ')}
                  </span>
                </Link>
              ))}
              {!cases.length && (
                <Empty>
                  No assigned mothers. Assign a counselor in Mothers or Care
                  groups.
                </Empty>
              )}
            </Panel>
          )
        })}
      </div>
    </Page>
  )
}

import { counselors, mockCounselors } from '../data/mockData'
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { Resource, CareForm } from '../types/domain'
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
  return (
    <Page
      title="Resource catalog"
      action={<Button onClick={() => setEditing(null)}>New resource</Button>}
    >
      <div className={splitClass}>
        <Panel title="Manage community services">
          <Field label="Search catalog">
            <input
              className={inputClass}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
          {resources
            .filter((r) =>
              `${r.name} ${r.county} ${r.service}`
                .toLowerCase()
                .includes(search.toLowerCase()),
            )
            .map((r) => (
              <article
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-canvas p-3"
              >
                <div>
                  <strong>{r.name}</strong>
                  <p>
                    {r.service} · {r.county}
                  </p>
                  <Badge>{r.availability}</Badge>
                </div>
                <div className="flex gap-2">
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
          {!resources.length && (
            <Empty>No resources. Add a community service to begin.</Empty>
          )}
        </Panel>
        <Panel title={editing ? 'Edit resource' : 'Add resource'}>
          <form
            key={editing?.id ?? 'new'}
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
export function FormBuilder() {
  const { forms, setForms } = useDemo()
  const [selected, setSelected] = useState(forms[0]?.id ?? '')
  const form = forms.find((f) => f.id === selected)
  const [message, setMessage] = useState('')
  const [deleting, setDeleting] = useState(false)
  function update(change: Partial<CareForm>) {
    setForms((fs) =>
      fs.map((f) =>
        f.id === selected ? { ...f, ...change, published: false } : f,
      ),
    )
  }
  return (
    <Page
      title="Form builder"
      action={
        <Button
          onClick={() => {
            const id = crypto.randomUUID()
            setForms((fs) => [
              ...fs,
              {
                id,
                title: 'New check-in form',
                version: 0,
                published: false,
                questions: [],
              },
            ])
            setSelected(id)
            setDeleting(false)
          }}
        >
          New form
        </Button>
      }
    >
      <div className={splitClass}>
        <Panel title="Form templates">
          {forms.map((f) => (
            <div
              key={f.id}
              className="flex flex-wrap justify-between gap-2 border-b border-line py-3"
            >
              <button
                className="text-accent underline font-semibold"
                onClick={() => {
                  setSelected(f.id)
                  setDeleting(false)
                }}
              >
                {f.title}
              </button>
              <Badge>{f.published ? `Published v${f.version}` : 'Draft'}</Badge>
            </div>
          ))}
          {!forms.length && <Empty>No forms. Create a template.</Empty>}
        </Panel>
        {form && (
          <Panel title="Edit template">
            <Field label="Form title">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
              />
            </Field>
            {form.questions.map((q, i) => (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Field label={`Question ${i + 1}`}>
                    <input
                      className={inputClass}
                      value={q}
                      onChange={(e) =>
                        update({
                          questions: form.questions.map((item, index) =>
                            index === i ? e.target.value : item,
                          ),
                        })
                      }
                    />
                  </Field>
                </div>
                <Button
                  secondary
                  aria-label={`Remove question ${i + 1}`}
                  onClick={() =>
                    update({
                      questions: form.questions.filter(
                        (_, index) => index !== i,
                      ),
                    })
                  }
                >
                  Remove
                </Button>
                <Button
                  secondary
                  disabled={i === 0}
                  aria-label={`Move question ${i + 1} up`}
                  onClick={() => {
                    const questions = [...form.questions]
                    ;[questions[i - 1], questions[i]] = [
                      questions[i],
                      questions[i - 1],
                    ]
                    update({ questions })
                  }}
                >
                  ↑
                </Button>
              </div>
            ))}
            <Button
              secondary
              onClick={() => update({ questions: [...form.questions, ''] })}
            >
              Add question
            </Button>
            <details className="rounded-lg bg-canvas p-4">
              <summary className="cursor-pointer font-semibold">
                Mother form preview
              </summary>
              <div className="space-y-3 pt-3">
                {form.questions.map((q, i) => (
                  <Field key={i} label={q || `Untitled question ${i + 1}`}>
                    <input
                      className={inputClass}
                      placeholder="Mother response"
                    />
                  </Field>
                ))}
              </div>
            </details>
            <div className="flex flex-wrap gap-2">
              <Button
                disabled={
                  !form.title.trim() ||
                  !form.questions.length ||
                  form.questions.some((q) => !q.trim()) ||
                  form.published
                }
                onClick={() => {
                  setForms((fs) =>
                    fs.map((f) =>
                      f.id === selected
                        ? {
                            ...f,
                            title: f.title.trim(),
                            questions: f.questions.map((q) => q.trim()),
                            version: f.version + 1,
                            published: true,
                          }
                        : f,
                    ),
                  )
                  setMessage(
                    'New version published. Available under Forms for assignment.',
                  )
                }}
              >
                Publish version
              </Button>
              <Button
                secondary
                onClick={() => setMessage('Draft saved for this session.')}
              >
                Save draft
              </Button>
              <Button secondary onClick={() => setDeleting(true)}>
                Delete template
              </Button>
            </div>
            {deleting && (
              <div className="space-y-2">
                <p>
                  Delete this template? Existing assignments will be preserved.
                </p>
                <Button
                  onClick={() => {
                    setForms((fs) => fs.filter((f) => f.id !== selected))
                    setSelected(forms.find((f) => f.id !== selected)?.id ?? '')
                    setDeleting(false)
                  }}
                >
                  Confirm deletion
                </Button>
                <Button secondary onClick={() => setDeleting(false)}>
                  Cancel
                </Button>
              </div>
            )}
            <p className="text-xs text-muted">
              Editing a published template creates a draft. Existing assignments
              retain their original questions.
            </p>
          </Panel>
        )}
      </div>
      <p role="status">{message}</p>
    </Page>
  )
}
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
                  {m.name}
                  <span className="block font-normal text-muted">
                    {m.status} · Next appointment{' '}
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

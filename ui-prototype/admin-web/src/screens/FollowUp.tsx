import { useState } from 'react'
import { useDemo } from '../hooks/demoContext'
import { demoToday } from '../data/mockData'
import {
  Badge,
  Banner,
  Button,
  Empty,
  Field,
  Page,
  Panel,
  Pagination,
  Stats,
} from '../components/ui'
import { inputClass, splitClass, tableClass } from '../utils/uiClasses'
import type { FollowUp as FollowUpRecord, Outcome } from '../types/domain'

function OutcomeForm({ record }: { record: FollowUpRecord }) {
  const { mothers, setFollowUps, setGoals } = useDemo()
  const [message, setMessage] = useState('')
  const mother = mothers.find((m) => m.id === record.motherId)
  return (
    <Panel title={`${mother?.name ?? 'Unknown mother'} · ${record.title}`}>
      <Badge>{record.status}</Badge>
      <p className="text-sm text-muted">
        {record.type} · Review due {record.due}
      </p>
      <div className="rounded-lg bg-sage p-3">
        <h3 className="font-semibold">Original feedback</h3>
        <p>{record.feedback || 'No mother feedback received yet.'}</p>
      </div>
      {record.message && (
        <p>
          <strong>Referral message:</strong> {record.message}
        </p>
      )}
      {record.status === 'Completed' ? (
        <div className="space-y-3">
          <p>
            <strong>Outcome:</strong> {record.outcome}
          </p>
          <p className="whitespace-pre-wrap">{record.notes}</p>
          <p className="text-muted">
            {record.shared ? 'Mother-visible summary' : 'Care team only'} ·
            Outcome logged at{' '}
            {record.loggedAt
              ? new Date(record.loggedAt).toLocaleString()
              : 'Unknown time'}
          </p>
          <Button
            secondary
            onClick={() => {
              setFollowUps((items) =>
                items.map((f) =>
                  f.id === record.id ? { ...f, status: 'Awaiting outcome' } : f,
                ),
              )
              setMessage('Follow-up reopened.')
            }}
          >
            Reopen review
          </Button>
        </div>
      ) : (
        <form
          onReset={(e) =>
            e.currentTarget
              .querySelectorAll('textarea')
              .forEach((field) => field.setCustomValidity(''))
          }
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            const values = new FormData(e.currentTarget)
            const notes = String(values.get('notes')).trim()
            if (!notes) return
            const outcome = String(values.get('outcome')) as Outcome
            setFollowUps((items) =>
              items.map((f) =>
                f.id === record.id
                  ? {
                      ...f,
                      status: 'Completed',
                      outcome,
                      notes,
                      shared: values.has('shared'),
                      loggedAt: new Date().toISOString(),
                    }
                  : f,
              ),
            )
            if (
              outcome === 'Successful' &&
              record.type === 'Goal' &&
              record.goalId
            )
              setGoals((items) =>
                items.map((g) =>
                  g.id === record.goalId ? { ...g, status: 'Completed' } : g,
                ),
              )
            setMessage('Outcome logged. Original feedback preserved.')
          }}
        >
          <Field label="Outcome">
            <select
              name="outcome"
              className={inputClass}
              defaultValue={record.outcome ?? 'Successful'}
            >
              <option>Successful</option>
              <option>Partially successful</option>
              <option>Could not access</option>
            </select>
          </Field>
          <Field label="Follow-up notes">
            <textarea
              className={inputClass}
              name="notes"
              onChange={(e) =>
                e.currentTarget.setCustomValidity(
                  e.currentTarget.value.trim()
                    ? ''
                    : 'Enter a description or note before saving.',
                )
              }
              rows={4}
              required
              maxLength={1000}
              defaultValue={record.notes ?? ''}
            />
          </Field>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="shared"
              defaultChecked={record.shared ?? true}
            />
            Share summary with mother
          </label>
          <p className="text-xs text-muted">
            Unchecked summaries stay with the care team.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="submit">Log outcome</Button>
            <Button
              secondary
              onClick={(e) => {
                e.currentTarget.form?.reset()
                setMessage('Changes canceled.')
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      <p role="status" className="text-accent">
        {message}
      </p>
    </Panel>
  )
}

export default function FollowUp() {
  const { mothers, goals, selectedId, followUps, setFollowUps } = useDemo()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [motherFilter, setMotherFilter] = useState('All')
  const [page, setPage] = useState(0)
  const [recordId, setRecordId] = useState(followUps[0]?.id ?? '')
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState('')
  const filtered = followUps
    .filter(
      (f) =>
        `${f.title} ${mothers.find((m) => m.id === f.motherId)?.name ?? ''}`
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (motherFilter === 'All' || f.motherId === motherFilter) &&
        (filter === 'All' ||
          (filter === 'Overdue'
            ? f.status !== 'Completed' && f.due < demoToday
            : f.status === filter)),
    )
    .sort((a, b) => a.due.localeCompare(b.due))
  const currentPage = Math.min(
    page,
    Math.max(0, Math.ceil(filtered.length / 5) - 1),
  )
  const record = followUps.find((f) => f.id === recordId)
  return (
    <Page
      title="Follow-ups & outcomes"
      action={
        <Button
          onClick={() => {
            setCreating(true)
            setMessage('')
          }}
        >
          Create follow-up +
        </Button>
      }
    >
      <Banner>
        Preserve mother-confirmed feedback and record the final outcome with a
        supportive summary.
      </Banner>
      <Stats
        items={[
          {
            label: 'Due today',
            value: followUps.filter(
              (f) => f.due === demoToday && f.status !== 'Completed',
            ).length,
          },
          {
            label: 'Overdue',
            value: followUps.filter(
              (f) => f.due < demoToday && f.status !== 'Completed',
            ).length,
          },
          {
            label: 'Awaiting outcome',
            value: followUps.filter((f) => f.status === 'Awaiting outcome')
              .length,
          },
          {
            label: 'Completed',
            value: followUps.filter((f) => f.status === 'Completed').length,
          },
        ]}
      />
      <div className={splitClass}>
        <Panel title="Review queue">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Search follow-ups">
              <input
                className={inputClass}
                placeholder="Mother, resource, goal…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(0)
                }}
              />
            </Field>
            <Field label="Status">
              <select
                className={inputClass}
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value)
                  setPage(0)
                }}
              >
                {[
                  'All',
                  'Awaiting outcome',
                  'Overdue',
                  'Scheduled',
                  'Completed',
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Mother">
              <select
                className={inputClass}
                value={motherFilter}
                onChange={(e) => {
                  setMotherFilter(e.target.value)
                  setPage(0)
                }}
              >
                <option value="All">All mothers</option>
                {mothers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="overflow-x-auto">
            <table className={`${tableClass} min-w-[530px]`}>
              <caption className="sr-only">Follow-up review queue</caption>
              <thead>
                <tr>
                  <th scope="col">Mother / record</th>
                  <th scope="col">Type</th>
                  <th scope="col">Due</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered
                  .slice(currentPage * 5, currentPage * 5 + 5)
                  .map((f) => (
                    <tr
                      key={f.id}
                      className={
                        recordId === f.id && !creating ? 'bg-sage' : ''
                      }
                    >
                      <td>
                        <p className="font-semibold">
                          {mothers.find((m) => m.id === f.motherId)?.name ??
                            'Unknown mother'}
                        </p>
                        <button
                          className="text-left text-accent underline"
                          onClick={() => {
                            setRecordId(f.id)
                            setCreating(false)
                          }}
                        >
                          {f.title}
                        </button>
                      </td>
                      <td>{f.type}</td>
                      <td className="whitespace-nowrap">{f.due}</td>
                      <td>
                        <Badge>
                          {f.status !== 'Completed' && f.due < demoToday
                            ? 'Overdue'
                            : f.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!filtered.length && <Empty>No follow-ups match this view.</Empty>}
          <Pagination
            page={currentPage}
            total={filtered.length}
            onChange={setPage}
          />
        </Panel>
        {creating ? (
          <Panel title="Create follow-up">
            <form
              onReset={(e) =>
                e.currentTarget
                  .querySelectorAll('textarea')
                  .forEach((field) => field.setCustomValidity(''))
              }
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const values = new FormData(e.currentTarget)
                const goal = goals.find((g) => g.id === values.get('goal'))
                if (!goal) return
                const next: FollowUpRecord = {
                  id: crypto.randomUUID(),
                  motherId: goal.motherId,
                  goalId: goal.id,
                  title: goal.title,
                  type: 'Goal',
                  due: String(values.get('due')),
                  status: 'Scheduled',
                  feedback: '',
                }
                setFollowUps((items) => [next, ...items])
                setRecordId(next.id)
                setCreating(false)
                setSearch('')
                setFilter('All')
                setMotherFilter('All')
                setPage(0)
                setMessage('Follow-up created.')
              }}
            >
              <Field label="Goal to review">
                <select
                  autoFocus
                  required
                  className={inputClass}
                  name="goal"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a goal
                  </option>
                  {[...goals]
                    .sort(
                      (a, b) =>
                        Number(b.motherId === selectedId) -
                        Number(a.motherId === selectedId),
                    )
                    .map((g) => (
                      <option key={g.id} value={g.id}>
                        {mothers.find((m) => m.id === g.motherId)?.name} ·{' '}
                        {g.title}
                      </option>
                    ))}
                </select>
              </Field>
              <Field label="Review date">
                <input
                  type="date"
                  className={inputClass}
                  required
                  name="due"
                  defaultValue="2026-10-08"
                />
              </Field>
              <div className="flex gap-2">
                <Button type="submit" disabled={!goals.length}>
                  Create follow-up
                </Button>
                <Button secondary onClick={() => setCreating(false)}>
                  Cancel
                </Button>
              </div>
              {!goals.length && (
                <Empty>Create a goal before scheduling a review.</Empty>
              )}
            </form>
          </Panel>
        ) : record ? (
          <OutcomeForm key={`${record.id}-${record.status}`} record={record} />
        ) : (
          <Panel title="Outcome review">
            <Empty>Select a follow-up from the queue.</Empty>
          </Panel>
        )}
      </div>
      <p role="status" className="text-accent">
        {message}
      </p>
    </Page>
  )
}

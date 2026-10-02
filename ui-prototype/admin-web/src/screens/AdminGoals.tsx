import { useRef, useState } from 'react'
import { useDemo } from '../hooks/demoContext'
import { demoToday } from '../data/mockData'
import {
  Badge,
  Banner,
  Button,
  Empty,
  Field,
  MotherPicker,
  Page,
  Panel,
  Pagination,
  Stats,
} from '../components/ui'
import ConfirmDialog from '../components/ConfirmDialog'
import { inputClass, splitClass } from '../utils/uiClasses'
import type { Goal } from '../types/domain'

function GoalEditor({
  motherId,
  goal,
  onSave,
  onCancel,
}: {
  motherId: string
  goal?: Goal
  onSave: (goal: Goal) => void
  onCancel: () => void
}) {
  const titleRef = useRef<HTMLInputElement>(null)
  const beginGoal = () => {
    titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    titleRef.current?.focus({ preventScroll: true })
  }
  return (
    <Panel title={goal ? 'Edit goal' : 'Create a goal'}>
      <Button secondary onClick={beginGoal}>
        {goal ? 'Edit title' : 'Create goal +'}
      </Button>
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
          const title = String(values.get('title')).trim()
          const description = String(values.get('description')).trim()
          if (!title || !description) return
          onSave({
            id: goal?.id ?? crypto.randomUUID(),
            motherId,
            title,
            description,
            category: String(values.get('category')),
            due: String(values.get('due')),
            recurrence: String(values.get('recurrence')),
            reminder: String(values.get('reminder')),
            notes: String(values.get('notes')).trim(),
            visible: values.has('visible'),
            weeklyReview: values.has('weeklyReview'),
            status: goal?.status ?? 'Active',
          })
          if (!goal) e.currentTarget.reset()
        }}
      >
        <Field label="Goal title">
          <input
            ref={titleRef}
            className={inputClass}
            name="title"
            required
            maxLength={120}
            pattern=".*\S.*"
            defaultValue={goal?.title ?? ''}
            placeholder="Prepare two interview-ready outfits"
          />
        </Field>
        <Field label="Description">
          <textarea
            className={inputClass}
            name="description"
            onChange={(e) =>
              e.currentTarget.setCustomValidity(
                e.currentTarget.value.trim()
                  ? ''
                  : 'Enter a description or note before saving.',
              )
            }
            required
            maxLength={1000}
            rows={3}
            defaultValue={goal?.description ?? ''}
            placeholder="Write supportive next steps for this mother."
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Category">
            <select
              name="category"
              className={inputClass}
              defaultValue={goal?.category ?? 'Care continuity'}
            >
              {[
                'Care continuity',
                'Employment readiness',
                'Housing',
                'Prenatal care',
                'Parenting support',
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Target completion">
            <input
              className={inputClass}
              name="due"
              type="date"
              required
              defaultValue={goal?.due ?? '2026-10-08'}
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Recurrence">
            <select
              name="recurrence"
              className={inputClass}
              defaultValue={goal?.recurrence ?? 'One time'}
            >
              <option>One time</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </Field>
          <Field label="Reminder">
            <select
              name="reminder"
              className={inputClass}
              defaultValue={goal?.reminder ?? '1 day before'}
            >
              <option>1 day before</option>
              <option>2 hours before</option>
              <option>None</option>
            </select>
          </Field>
        </div>
        <Field label="Counselor notes">
          <textarea
            className={inputClass}
            name="notes"
            rows={2}
            maxLength={1000}
            defaultValue={goal?.notes ?? ''}
          />
        </Field>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={goal?.visible ?? true}
          />
          Mother-visible
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="weeklyReview"
            defaultChecked={goal?.weeklyReview ?? true}
          />
          Weekly review
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">{goal ? 'Save changes' : 'Assign goal'}</Button>
          <Button
            secondary
            onClick={() => {
              onCancel()
              if (!goal) titleRef.current?.form?.reset()
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Panel>
  )
}

export default function AdminGoals() {
  const { mothers, selectedId, goals, setGoals, setFollowUps } = useDemo()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(0)
  const [editing, setEditing] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<Goal | null>(null)
  const [message, setMessage] = useState('')
  const mother = mothers.find((m) => m.id === selectedId)
  const caseGoals = goals.filter((g) => g.motherId === selectedId)
  const active = caseGoals.filter((g) => g.status === 'Active')
  const completed = caseGoals.length - active.length
  const visible = caseGoals.filter(
    (g) =>
      g.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === 'All' ||
        (filter === 'Overdue'
          ? g.status === 'Active' && g.due < demoToday
          : g.status === filter)),
  )
  const currentPage = Math.min(
    page,
    Math.max(0, Math.ceil(visible.length / 5) - 1),
  )
  const editGoal = caseGoals.find((g) => g.id === editing)
  return (
    <Page title={`Goals for ${mother?.name ?? 'selected mother'}`}>
      <MotherPicker />
      <Banner>
        Use supportive language and respect the mother’s contact preferences.
        Assignments are available for review in this workspace.
      </Banner>
      <Stats
        items={[
          { label: 'Active goals', value: active.length },
          { label: 'Goals met', value: completed },
          {
            label: 'Overdue',
            value: active.filter((g) => g.due < demoToday).length,
          },
          {
            label: 'Completion rate',
            value: `${caseGoals.length ? Math.round((completed / caseGoals.length) * 100) : 0}%`,
          },
        ]}
      />
      <div className={splitClass}>
        <Panel title="Goals tracker">
          <div className="flex flex-wrap gap-3">
            <Field label="Search goals">
              <input
                className={inputClass}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(0)
                }}
                placeholder="Search goals…"
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
                {['All', 'Active', 'Overdue', 'Completed'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
          {visible.slice(currentPage * 5, currentPage * 5 + 5).map((g) => (
            <article
              key={g.id}
              className="space-y-3 rounded-xl border border-line bg-canvas p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-bold">{g.title}</h3>
                <Badge>
                  {g.status === 'Active' && g.due < demoToday
                    ? 'Overdue'
                    : g.status}
                </Badge>
              </div>
              <p>{g.description}</p>
              <p className="text-xs text-muted">
                Due {g.due} · {g.recurrence} ·{' '}
                {g.visible ? 'Mother-visible' : 'Care team only'} ·{' '}
                {g.weeklyReview ? 'Weekly review' : 'No weekly review'}
              </p>
              {g.notes && (
                <p className="text-sm">
                  <strong>Counselor notes:</strong> {g.notes}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <Button
                  secondary
                  onClick={() => {
                    setEditing(g.id)
                    setMessage('')
                  }}
                >
                  Edit
                </Button>
                <Button
                  secondary
                  onClick={() => {
                    setGoals((items) =>
                      items.map((item) =>
                        item.id === g.id
                          ? {
                              ...item,
                              status:
                                g.status === 'Active' ? 'Completed' : 'Active',
                            }
                          : item,
                      ),
                    )
                    setMessage(
                      g.status === 'Active'
                        ? 'Goal completed.'
                        : 'Goal reopened.',
                    )
                  }}
                >
                  {g.status === 'Active' ? 'Complete' : 'Reopen'}
                </Button>
                <Button secondary onClick={() => setDeleting(g)}>
                  Delete
                </Button>
              </div>
            </article>
          ))}
          {!visible.length && (
            <Empty>
              No goals match this view. Create a goal or change the filters.
            </Empty>
          )}
          <Pagination
            total={visible.length}
            page={currentPage}
            onChange={setPage}
          />
        </Panel>
        {mother && (
          <GoalEditor
            key={`${selectedId}-${editGoal?.id ?? 'new'}`}
            motherId={selectedId}
            goal={editGoal}
            onCancel={() => {
              setEditing(null)
              setMessage('Changes canceled.')
            }}
            onSave={(g) => {
              if (editGoal) setFollowUps(items => items.map(f =>
                f.type === 'Goal' && f.goalId === g.id ? { ...f, title: g.title } : f,
              ))
              setGoals((items) =>
                editGoal
                  ? items.map((item) => (item.id === g.id ? g : item))
                  : [g, ...items],
              )
              setEditing(null)
              setSearch('')
              setFilter('All')
              setPage(0)
              setMessage(editGoal ? 'Goal updated.' : 'Goal assigned.')
            }}
          />
        )}
      </div>
      <p role="status" className="text-accent">
        {message}
      </p>
      {deleting && (
        <ConfirmDialog
          title={`Delete “${deleting.title}”?`}
          onCancel={() => setDeleting(null)}
          onConfirm={() => {
            setGoals((items) => items.filter((g) => g.id !== deleting.id))
            setFollowUps((items) =>
              items.filter((f) => f.goalId !== deleting.id),
            )
            setDeleting(null)
            setEditing(null)
            setMessage('Goal deleted.')
          }}
        />
      )}
    </Page>
  )
}

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
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
} from '../components/ui'
import { inputClass, splitClass, tableClass } from '../utils/uiClasses'

export default function RecommendedResources() {
  const {
    mothers,
    selectedId,
    goals,
    followUps,
    setFollowUps,
    resources: mockResources,
  } = useDemo()
  const [search, setSearch] = useState('')
  const [service, setService] = useState('All')
  const [availability, setAvailability] = useState('All')
  const [mode, setMode] = useState('All')
  const [county, setCounty] = useState('All')
  const [page, setPage] = useState(0)
  const [resourceId, setResourceId] = useState(mockResources[0]?.id ?? '')
  const [message, setMessage] = useState('')
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const mother = mothers.find((m) => m.id === selectedId)
  const resource = mockResources.find((r) => r.id === resourceId)
  const results = mockResources.filter(
    (r) =>
      `${r.name} ${r.service} ${r.county}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (service === 'All' || r.service === service) &&
      (availability === 'All' || r.availability === availability) &&
      (mode === 'All' || r.mode === mode) &&
      (county === 'All' || r.county === county),
  )
  const currentPage = Math.min(
    page,
    Math.max(0, Math.ceil(results.length / 5) - 1),
  )
  return (
    <Page
      title="Recommend a resource"
      action={
        <Button
          onClick={() => {
            messageRef.current?.form?.reset()
            messageRef.current?.focus()
            setMessage('')
          }}
        >
          New referral +
        </Button>
      }
    >
      <MotherPicker />
      <Banner>
        Review community services and availability with the mother before making
        a referral.
      </Banner>
      <div className={splitClass}>
        <Panel title="Community resources">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Search resources">
              <input
                className={inputClass}
                placeholder="Name, service, county…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(0)
                }}
              />
            </Field>
            <Field label="Service type">
              <select
                className={inputClass}
                value={service}
                onChange={(e) => {
                  setService(e.target.value)
                  setPage(0)
                }}
              >
                {['All', ...new Set(mockResources.map((r) => r.service))].map(
                  (s) => (
                    <option key={s}>{s}</option>
                  ),
                )}
              </select>
            </Field>
            <Field label="Availability">
              <select
                className={inputClass}
                value={availability}
                onChange={(e) => {
                  setAvailability(e.target.value)
                  setPage(0)
                }}
              >
                <option>All</option>
                <option>Available</option>
                <option>Waitlist</option>
              </select>
            </Field>
            <Field label="County">
              <select
                className={inputClass}
                value={county}
                onChange={(e) => {
                  setCounty(e.target.value)
                  setPage(0)
                }}
              >
                {['All', ...new Set(mockResources.map((r) => r.county))].map(
                  (s) => (
                    <option key={s}>{s}</option>
                  ),
                )}
              </select>
            </Field>
          </div>
          <fieldset className="flex flex-wrap gap-3">
            <legend className="mb-2 font-semibold">Service location</legend>
            {['All', 'Physical', 'Digital'].map((s) => (
              <label key={s} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === s}
                  onChange={() => {
                    setMode(s)
                    setPage(0)
                  }}
                />
                {s}
              </label>
            ))}
          </fieldset>
          <div className="overflow-x-auto">
            <table className={`${tableClass} min-w-[550px]`}>
              <caption className="sr-only">
                Community resource directory
              </caption>
              <thead>
                <tr>
                  <th scope="col">Resource</th>
                  <th scope="col">Service</th>
                  <th scope="col">County</th>
                  <th scope="col">Availability</th>
                </tr>
              </thead>
              <tbody>
                {results
                  .slice(currentPage * 5, currentPage * 5 + 5)
                  .map((r) => (
                    <tr
                      key={r.id}
                      className={resourceId === r.id ? 'bg-sage' : ''}
                    >
                      <td>
                        <button
                          className="text-left font-semibold text-accent underline"
                          onClick={() => {
                            setResourceId(r.id)
                            setMessage('')
                          }}
                        >
                          {r.name}
                        </button>
                        <p className="text-xs text-muted">{r.mode}</p>
                      </td>
                      <td>{r.service}</td>
                      <td>{r.county}</td>
                      <td>
                        <Badge>{r.availability}</Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!results.length && <Empty>No resources match these filters.</Empty>}
          <Pagination
            page={currentPage}
            total={results.length}
            onChange={setPage}
          />
        </Panel>
        {resource && mother && (
          <Panel title={`Referral for ${mother.name}`}>
            <div className="space-y-2">
              <h3 className="font-bold">{resource.name}</h3>
              <Badge>{resource.availability}</Badge>
              <p>{resource.address}</p>
              <p className="text-muted">{resource.hours}</p>
            </div>
            <form
              onReset={(e) =>
                e.currentTarget
                  .querySelectorAll('textarea')
                  .forEach((field) => field.setCustomValidity(''))
              }
              key={`${selectedId}-${resource.id}`}
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const values = new FormData(e.currentTarget)
                const text = String(values.get('message')).trim()
                if (!text) return
                setFollowUps((items) => [
                  {
                    id: crypto.randomUUID(),
                    motherId: selectedId,
                    resourceId: resource.id,
                    title: resource.name,
                    type: 'Referral',
                    due: String(values.get('due')),
                    status: 'Scheduled',
                    feedback: '',
                    message: text,
                    priority: String(values.get('priority')),
                    goalId: String(values.get('goal')) || undefined,
                    shared: values.has('visible'),
                  },
                  ...items,
                ])
                e.currentTarget.reset()
                setMessage(
                  `Referral assigned to ${mother.name}. Follow-up added to the queue.`,
                )
              }}
            >
              <Field label="Message to mother">
                <textarea
                  ref={messageRef}
                  className={inputClass}
                  name="message"
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
                  placeholder={`Share how ${resource.name} may help ${mother.name.split(' ')[0]}.`}
                />
              </Field>
              <Field label="Priority">
                <select name="priority" className={inputClass}>
                  <option>Standard</option>
                  <option>High</option>
                </select>
              </Field>
              <Field label="Associate with goal">
                <select name="goal" className={inputClass}>
                  <option value="">No linked goal</option>
                  {goals
                    .filter((g) => g.motherId === selectedId)
                    .map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title}
                      </option>
                    ))}
                </select>
              </Field>
              <Field label="Follow-up date">
                <input
                  name="due"
                  className={inputClass}
                  type="date"
                  required
                  defaultValue="2026-10-08"
                />
              </Field>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="visible" defaultChecked />
                Mother-visible referral
              </label>
              <div className="flex flex-wrap gap-2">
                <Button type="submit">Assign referral</Button>
                <Button
                  secondary
                  onClick={() => {
                    messageRef.current?.form?.reset()
                    setMessage('Referral canceled.')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
            <Link className="block text-accent underline" to="/admin/followup">
              Review follow-ups
            </Link>
          </Panel>
        )}
      </div>
      <p role="status" className="text-accent">
        {message}
      </p>
      <Panel title="Referrals for selected mother">
        {followUps
          .filter((f) => f.type === 'Referral' && f.motherId === selectedId)
          .map((f) => (
            <div key={f.id} className="rounded-lg bg-canvas p-3">
              <div className="flex flex-wrap justify-between gap-2">
                <strong>{f.title}</strong>
                <Badge>{f.status}</Badge>
              </div>
              {f.message && <p className="mt-2">{f.message}</p>}
              <p className="text-xs text-muted">
                Follow-up {f.due} ·{' '}
                {f.shared ? 'Mother-visible' : 'Care team only'}
                {f.priority && ` · ${f.priority} priority`}
              </p>
            </div>
          ))}
        {!followUps.some(
          (f) => f.type === 'Referral' && f.motherId === selectedId,
        ) && <Empty>No referrals assigned yet.</Empty>}
      </Panel>
    </Page>
  )
}

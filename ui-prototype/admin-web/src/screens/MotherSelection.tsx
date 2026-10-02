import CaseActivity from '../components/CaseActivity'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
import { counselors } from '../data/mockData'
import {
  Badge,
  Banner,
  Button,
  CaseLinks,
  Empty,
  Field,
  Page,
  Panel,
  Pagination,
  Stats,
} from '../components/ui'
import { inputClass, splitClass, tableClass } from '../utils/uiClasses'
import type { Mother } from '../types/domain'

export default function MotherSelection() {
  const { mothers, setMothers, goals, followUps, selectedId, setSelectedId } =
    useDemo()
  const { motherId } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [county, setCounty] = useState('All')
  const [sort, setSort] = useState('Name')
  const [page, setPage] = useState(0)
  const [intake, setIntake] = useState(false)
  const [message, setMessage] = useState('')
  const mother = mothers.find((m) => m.id === (motherId ?? selectedId))
  useEffect(() => {
    if (motherId && mothers.some((m) => m.id === motherId))
      setSelectedId(motherId)
  }, [motherId, mothers, setSelectedId])
  const filtered = mothers
    .filter(
      (m) =>
        `${m.name} ${m.id}`.toLowerCase().includes(search.toLowerCase()) &&
        (status === 'All' || m.status === status) &&
        (county === 'All' || m.county === county),
    )
    .sort((a, b) =>
      sort === 'Name'
        ? a.name.localeCompare(b.name)
        : a.appointment.localeCompare(b.appointment),
    )
  const currentPage = Math.min(
    page,
    Math.max(0, Math.ceil(filtered.length / 5) - 1),
  )
  const selectMother = (id: string) => {
    setSelectedId(id)
    navigate(`/admin/mothers/${id}`)
    setIntake(false)
    setMessage('')
  }
  const updateMother = (changes: Partial<Mother>) => {
    if (!mother) return
    setMothers((items) =>
      items.map((m) => (m.id === mother.id ? { ...m, ...changes } : m)),
    )
    setMessage('Case updated.')
  }
  return (
    <Page
      title="Mothers"
      action={
        <Button
          onClick={() => {
            setIntake(true)
            setMessage('')
          }}
        >
          Start quick intake +
        </Button>
      }
    >
      <Banner>
        Select a mother to review her case and plan supportive next steps.
      </Banner>
      <Stats
        items={[
          { label: 'Mothers', value: mothers.length },
          {
            label: 'Active goals',
            value: goals.filter((g) => g.status === 'Active').length,
          },
          {
            label: 'Open follow-ups',
            value: followUps.filter((f) => f.status !== 'Completed').length,
          },
          {
            label: 'New intakes',
            value: mothers.filter((m) => m.status === 'New').length,
          },
        ]}
      />
      <div className={splitClass}>
        <Panel title="Case directory">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Search mothers">
              <input
                className={inputClass}
                placeholder="Name or case ID"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(0)
                }}
              />
            </Field>
            <Field label="Case status">
              <select
                className={inputClass}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  setPage(0)
                }}
              >
                {['All', 'Stable', 'Watch', 'High', 'New'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
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
                {['All', ...new Set(mothers.map((m) => m.county))].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Sort by">
              <select
                className={inputClass}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option>Name</option>
                <option>Next appointment</option>
              </select>
            </Field>
          </div>
          <div className="overflow-x-auto">
            <table className={`${tableClass} min-w-[600px]`}>
              <caption className="sr-only">Mother case directory</caption>
              <thead>
                <tr>
                  <th scope="col">Mother</th>
                  <th scope="col">County</th>
                  <th scope="col">Status</th>
                  <th scope="col">Active goals</th>
                  <th scope="col">Counselor</th>
                </tr>
              </thead>
              <tbody>
                {filtered
                  .slice(currentPage * 5, currentPage * 5 + 5)
                  .map((m) => (
                    <tr
                      key={m.id}
                      className={
                        m.id === mother?.id ? 'bg-sage' : 'hover:bg-canvas'
                      }
                    >
                      <td>
                        <button
                          className="text-left font-semibold text-accent underline"
                          onClick={() => selectMother(m.id)}
                        >
                          {m.name}
                        </button>
                        <p className="text-xs text-muted">{m.id}</p>
                      </td>
                      <td>{m.county}</td>
                      <td>
                        <Badge>{m.status}</Badge>
                      </td>
                      <td>
                        {
                          goals.filter(
                            (g) => g.motherId === m.id && g.status === 'Active',
                          ).length
                        }
                      </td>
                      <td>{m.counselor}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!filtered.length && <Empty>No mothers match these filters.</Empty>}
          <Pagination
            total={filtered.length}
            page={currentPage}
            onChange={setPage}
          />
        </Panel>
        {intake ? (
          <Panel title="Quick intake">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const form = new FormData(e.currentTarget)
                const name = String(form.get('name')).trim()
                if (!name) return
                const record: Mother = {
                  id: `MC-${crypto.randomUUID().slice(0, 8)}`,
                  name,
                  county: String(form.get('county')),
                  status: 'New',
                  counselor: String(form.get('counselor')),
                  contact: String(form.get('contact')),
                  needs: String(form.get('needs')).trim()
                    ? [String(form.get('needs')).trim()]
                    : [],
                  appointment: '',
                }
                setMothers((items) => [...items, record])
                selectMother(record.id)
                setMessage('Intake created. Review the case below.')
              }}
            >
              <Field label="Full name">
                <input
                  autoFocus
                  className={inputClass}
                  name="name"
                  required
                  maxLength={100}
                  pattern=".*\S.*"
                />
              </Field>
              <Field label="County">
                <select name="county" className={inputClass}>
                  {['Allegheny', 'Westmoreland', 'Butler', 'Beaver'].map(
                    (c) => (
                      <option key={c}>{c}</option>
                    ),
                  )}
                </select>
              </Field>
              <Field label="Assigned counselor">
                <select name="counselor" className={inputClass}>
                  {counselors.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred contact">
                <select name="contact" className={inputClass}>
                  <option>Mother Client App</option>
                  <option>Phone</option>
                </select>
              </Field>
              <Field label="Immediate support need (optional)">
                <input name="needs" className={inputClass} maxLength={200} />
              </Field>
              <div className="flex gap-2">
                <Button type="submit">Create intake</Button>
                <Button secondary onClick={() => setIntake(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Panel>
        ) : mother ? (
          <Panel title={mother.name}>
            <p className="text-muted">
              {mother.id} · {mother.county}
            </p>
            <Badge>{mother.status}</Badge>
            <Field label="Assigned counselor">
              <select
                className={inputClass}
                value={mother.counselor}
                onChange={(e) => updateMother({ counselor: e.target.value })}
              >
                {counselors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Case status">
              <select
                className={inputClass}
                value={mother.status}
                onChange={(e) =>
                  updateMother({ status: e.target.value as Mother['status'] })
                }
              >
                {['Stable', 'Watch', 'High', 'New'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <p>
              <strong>Preferred contact:</strong> {mother.contact}
            </p>
            <div>
              <h3 className="mb-2 font-semibold">Immediate needs</h3>
              <div className="flex flex-wrap gap-2">
                {mother.needs.length ? (
                  mother.needs.map((n) => <Badge key={n}>{n}</Badge>)
                ) : (
                  <p className="text-muted">No needs recorded yet.</p>
                )}
              </div>
            </div>
            <div className="rounded-lg bg-canvas p-3">
              <h3 className="font-semibold">Next appointment</h3>
              <p>
                {mother.appointment
                  ? new Date(mother.appointment).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : 'No appointment scheduled'}
              </p>
              <p className="text-xs text-muted">Goals & resource review</p>
            </div>
            <CaseLinks />
            <CaseActivity motherId={mother.id} />
            <Link
              className="block text-accent underline"
              to="/admin/motherselection"
            >
              Back to directory
            </Link>
          </Panel>
        ) : (
          <Panel title="Case not found">
            <Empty>This case is unavailable.</Empty>
            <Link className="text-accent underline" to="/admin/motherselection">
              Back to directory
            </Link>
          </Panel>
        )}
      </div>
      <p role="status" className="text-accent">
        {message}
      </p>
    </Page>
  )
}

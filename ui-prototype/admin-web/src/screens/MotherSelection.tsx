import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MoodBadge from '../components/MoodBadge'
import { Banner, Button, Empty, Field, Page, Panel, Pagination, Stats } from '../components/ui'
import { counselors } from '../data/mockData'
import { moodOptions } from '../data/moods'
import { useDemo } from '../hooks/demoContext'
import type { Mother } from '../types/domain'
import { inputClass, splitClass, tableClass } from '../utils/uiClasses'

export default function MotherSelection() {
  const { mothers, setMothers, goals, followUps, setSelectedId } = useDemo()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [county, setCounty] = useState('All')
  const [sort, setSort] = useState('Name')
  const [page, setPage] = useState(0)
  const [intake, setIntake] = useState(false)
  const filtered = mothers
    .filter((mother) =>
      `${mother.name} ${mother.id}`.toLowerCase().includes(search.toLowerCase()) &&
      (status === 'All' || (mother.mood ?? 'none') === status) &&
      (county === 'All' || mother.county === county),
    )
    .sort((a, b) => sort === 'Name'
      ? a.name.localeCompare(b.name)
      : a.appointment.localeCompare(b.appointment))
  const currentPage = Math.min(page, Math.max(0, Math.ceil(filtered.length / 5) - 1))

  return (
    <Page
      title="Mothers"
      action={<Button onClick={() => setIntake(true)}>Start quick intake +</Button>}
    >
      <Banner>Select a mother to open her dashboard and review her case.</Banner>
      <Stats items={[
        { label: 'Mothers', value: mothers.length },
        { label: 'Active goals', value: goals.filter((goal) => goal.status === 'Active').length },
        { label: 'Open follow-ups', value: followUps.filter((item) => item.status !== 'Completed').length },
        { label: 'Awaiting mood check-in', value: mothers.filter((mother) => !mother.mood).length },
      ]} />
      <div className={intake ? splitClass : undefined}>
        <Panel title="Case directory">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Search mothers">
              <input
                className={inputClass}
                data-usability-id="mother-search"
                placeholder="Name or case ID"
                value={search}
                onChange={(event) => { setSearch(event.target.value); setPage(0) }}
              />
            </Field>
            <Field label="Latest mood">
              <select
                className={inputClass}
                value={status}
                onChange={(event) => { setStatus(event.target.value); setPage(0) }}
              >
                <option value="All">All moods</option>
                {moodOptions.map((mood) => <option key={mood.id} value={mood.id}>{mood.label}</option>)}
                <option value="none">No check-in yet</option>
              </select>
            </Field>
            <Field label="County">
              <select
                className={inputClass}
                value={county}
                onChange={(event) => { setCounty(event.target.value); setPage(0) }}
              >
                {['All', ...new Set(mothers.map((mother) => mother.county))].map((value) => <option key={value}>{value}</option>)}
              </select>
            </Field>
            <Field label="Sort by">
              <select className={inputClass} value={sort} onChange={(event) => setSort(event.target.value)}>
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
                  <th scope="col">Active goals</th>
                  <th scope="col">Counselor</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(currentPage * 5, currentPage * 5 + 5).map((mother) => (
                  <tr key={mother.id} className="hover:bg-canvas">
                    <td>
                      <div className="flex items-center justify-between gap-3">
                        <Link
                          data-usability-id="mother-open"
                          className="text-left font-semibold text-accent underline"
                          to={`/admin/mothers/${mother.id}`}
                          onClick={() => setSelectedId(mother.id)}
                        >
                          {mother.name}
                        </Link>
                        <span className="shrink-0"><MoodBadge mother={mother} /></span>
                      </div>
                      <p className="text-xs text-muted">{mother.id}</p>
                    </td>
                    <td>{mother.county}</td>
                    <td>{goals.filter((goal) => goal.motherId === mother.id && goal.status === 'Active').length}</td>
                    <td>{mother.counselor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!filtered.length && <Empty>No mothers match these filters.</Empty>}
          <Pagination total={filtered.length} page={currentPage} onChange={setPage} />
        </Panel>
        {intake && (
          <Panel title="Quick intake">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                const form = new FormData(event.currentTarget)
                const name = String(form.get('name')).trim()
                if (!name) return
                const record: Mother = {
                  id: `MC-${crypto.randomUUID().slice(0, 8)}`,
                  name,
                  county: String(form.get('county')),
                  status: 'New',
                  counselor: String(form.get('counselor')),
                  contact: String(form.get('contact')),
                  needs: String(form.get('needs')).trim() ? [String(form.get('needs')).trim()] : [],
                  appointment: '',
                }
                setMothers((items) => [...items, record])
                setSelectedId(record.id)
                navigate(`/admin/mothers/${record.id}`)
              }}
            >
              <Field label="Full name">
                <input autoFocus className={inputClass} name="name" required maxLength={100} pattern=".*\S.*" />
              </Field>
              <Field label="County">
                <select name="county" className={inputClass}>
                  {['Allegheny', 'Westmoreland', 'Butler', 'Beaver'].map((value) => <option key={value}>{value}</option>)}
                </select>
              </Field>
              <Field label="Assigned counselor">
                <select name="counselor" className={inputClass}>
                  {counselors.map((name) => <option key={name}>{name}</option>)}
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
              <div className="flex flex-wrap gap-2">
                <Button type="submit">Create intake</Button>
                <Button secondary onClick={() => setIntake(false)}>Cancel</Button>
              </div>
            </form>
          </Panel>
        )}
      </div>
    </Page>
  )
}

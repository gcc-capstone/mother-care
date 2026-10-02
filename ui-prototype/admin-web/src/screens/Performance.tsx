import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
import { counselors, demoToday, engagement } from '../data/mockData'
import {
  Banner,
  Button,
  Empty,
  Field,
  Page,
  Panel,
  Stats,
} from '../components/ui'
import { inputClass, splitClass, tableClass } from '../utils/uiClasses'
import { downloadReport } from '../utils/downloadReport'

export default function Performance() {
  const { mothers, goals, followUps, exports, setExports } = useDemo()
  const [county, setCounty] = useState('All')
  const [start, setStart] = useState('2026-09-01')
  const [end, setEnd] = useState('2026-10-31')
  const [format, setFormat] = useState<'CSV' | 'PDF'>('CSV')
  const [message, setMessage] = useState('')
  const startRef = useRef<HTMLInputElement>(null)
  const cases = mothers.filter((m) => county === 'All' || m.county === county)
  const caseIds = new Set(cases.map((m) => m.id))
  const caseGoals = goals.filter(
    (g) => caseIds.has(g.motherId) && g.due >= start && g.due <= end,
  )
  const reviews = followUps.filter(
    (f) => caseIds.has(f.motherId) && f.due >= start && f.due <= end,
  )
  const completed = caseGoals.filter((g) => g.status === 'Completed').length
  const overdue = caseGoals.filter(
    (g) => g.status === 'Active' && g.due < demoToday,
  ).length
  const successful = reviews.filter(
    (f) =>
      f.status === 'Completed' &&
      (f.outcome === 'Successful' || f.outcome === 'Partially successful'),
  ).length
  return (
    <Page
      title="Program performance"
      action={
        <Button
          onClick={() => {
            startRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
            startRef.current?.focus({ preventScroll: true })
          }}
        >
          Generate report
        </Button>
      }
    >
      <Banner>
        Reports summarize the selected caseload and exclude names and counseling
        notes.
      </Banner>
      <Stats
        items={[
          { label: 'Mothers', value: cases.length },
          { label: 'Overdue goals', value: overdue },
          {
            label: 'Open reviews',
            value: reviews.filter((f) => f.status !== 'Completed').length,
          },
          {
            label: 'Completed goals',
            value: completed,
            detail: `Due between ${start} and ${end}`,
          },
        ]}
      />
      <div className={splitClass}>
        <div className="space-y-5">
          <Panel title="System engagement trend">
            <p className="text-sm text-muted">
              Illustrative program activity · September 2026 · sample check-in
              counts
            </p>
            <div
              role="img"
              aria-label={`Illustrative weekly engagement counts: ${engagement.join(', ')}`}
              className="grid h-44 grid-cols-8 items-end gap-3 rounded-lg bg-canvas px-4 pt-4"
            >
              {engagement.map((value, index) => (
                <div key={index} className="flex h-full flex-col justify-end">
                  <span className="text-center text-xs text-muted">
                    {value}
                  </span>
                  <div
                    className={`rounded-t ${index === engagement.length - 1 ? 'bg-accent' : 'bg-[#dcece6]'}`}
                    style={{ height: `${value}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                className="font-semibold text-accent underline"
                to="/admin/motherselection"
              >
                View mothers
              </Link>
              <Link
                className="font-semibold text-accent underline"
                to="/admin/admingoals"
              >
                Manage goals
              </Link>
              <Link
                className="font-semibold text-accent underline"
                to="/admin/followup"
              >
                Review outcomes
              </Link>
            </div>
          </Panel>
          <Panel title="Counselor activity">
            <p className="text-muted">Selected county and date range</p>
            <div className="overflow-x-auto">
              <table className={`${tableClass} min-w-[450px]`}>
                <caption className="sr-only">
                  Counselor caseload summary
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Counselor</th>
                    <th scope="col">Mothers</th>
                    <th scope="col">Goals</th>
                    <th scope="col">Completed</th>
                    <th scope="col">Open reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {counselors.map((c) => {
                    const ids = new Set(
                      cases.filter((m) => m.counselor === c).map((m) => m.id),
                    )
                    const assigned = caseGoals.filter((g) =>
                      ids.has(g.motherId),
                    )
                    return (
                      <tr key={c}>
                        <td className="font-semibold">
                          <Link
                            className="text-accent underline"
                            to="/admin/counselors"
                          >
                            {c}
                          </Link>
                        </td>
                        <td>{ids.size}</td>
                        <td>{assigned.length}</td>
                        <td>
                          {
                            assigned.filter((g) => g.status === 'Completed')
                              .length
                          }
                        </td>
                        <td>
                          {
                            reviews.filter(
                              (f) =>
                                ids.has(f.motherId) && f.status !== 'Completed',
                            ).length
                          }
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
        <Panel title="Report generation & export">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              if (start > end) {
                setMessage('Start date must be on or before end date.')
                return
              }
              downloadReport(format, 'MotherCare - Caseload summary', [
                ['Report period', `${start} to ${end}`],
                ['County', county],
                ['Mothers', cases.length],
                ['Goals', caseGoals.length],
                ['Completed goals', completed],
                ['Overdue goals', overdue],
                [
                  'Open reviews',
                  reviews.filter((f) => f.status !== 'Completed').length,
                ],
                ['Successful outcomes', successful],
              ])
              setExports((items) => [
                {
                  id: crypto.randomUUID(),
                  title: 'Caseload summary',
                  date: new Date().toISOString(),
                  county,
                  period: `${start} to ${end}`,
                  format,
                },
                ...items,
              ])
              setMessage(`${format} report downloaded.`)
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Start date">
                <input
                  ref={startRef}
                  className={inputClass}
                  type="date"
                  required
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </Field>
              <Field label="End date">
                <input
                  className={inputClass}
                  type="date"
                  required
                  min={start}
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Field>
            </div>
            <Field label="County">
              <select
                className={inputClass}
                value={county}
                onChange={(e) => setCounty(e.target.value)}
              >
                {['All', ...new Set(mothers.map((m) => m.county))].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <fieldset>
              <legend className="mb-2 font-semibold">Report format</legend>
              <div className="flex gap-4">
                {(['CSV', 'PDF'] as const).map((f) => (
                  <label key={f} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="format"
                      checked={format === f}
                      onChange={() => setFormat(f)}
                    />
                    {f}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="rounded-lg bg-canvas p-3">
              <p className="font-semibold">Included summary</p>
              <p>
                {cases.length} mothers · {caseGoals.length} goals ·{' '}
                {reviews.length} follow-ups
              </p>
            </div>
            <Button type="submit">Download {format} report ↗</Button>
            <p role="status" className="text-accent">
              {message}
            </p>
          </form>
          <h3 className="font-bold">Export history</h3>
          {exports.length ? (
            exports.map((record) => (
              <div key={record.id} className="rounded-lg bg-canvas p-3 text-sm">
                <strong>
                  {record.title} · {record.format}
                </strong>
                <p>
                  {record.period} · {record.county}
                </p>
                <p className="text-xs text-muted">
                  {new Date(record.date).toLocaleString()} · Morgan Shaw
                </p>
              </div>
            ))
          ) : (
            <Empty>No reports exported in this session.</Empty>
          )}
        </Panel>
      </div>
    </Page>
  )
}

import { useDemo } from '../hooks/demoContext'
import { Empty } from './ui'
export default function CaseActivity({ motherId }: { motherId: string }) {
  const { meetings, assignments, followUps, goals } = useDemo()
  const events = [
    ...meetings
      .filter((m) => m.motherId === motherId)
      .map((m) => ({
        id: m.id,
        date: m.date,
        title: `${m.type} meeting`,
        detail: m.summary,
      })),
    ...assignments
      .filter((a) => a.motherId === motherId)
      .map((a) => ({
        id: a.id,
        date: a.due,
        title: `Form: ${a.title} v${a.version}`,
        detail: a.status,
      })),
    ...followUps
      .filter((f) => f.motherId === motherId)
      .map((f) => ({
        id: f.id,
        date: f.due,
        title: f.title,
        detail: f.status,
      })),
    ...goals
      .filter((g) => g.motherId === motherId)
      .map((g) => ({
        id: g.id,
        date: g.due,
        title: g.title,
        detail: g.status,
      })),
  ].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <details className="rounded-lg bg-canvas p-3">
      <summary className="cursor-pointer font-semibold">
        Case activity · {events.length} records
      </summary>
      <div className="mt-3 space-y-3">
        {events.map((e) => (
          <article key={e.id} className="border-l-2 border-accent pl-3">
            <p className="text-xs text-muted">{e.date}</p>
            <strong>{e.title}</strong>
            <p>{e.detail}</p>
          </article>
        ))}
        {!events.length && <Empty>No case activity yet.</Empty>}
      </div>
    </details>
  )
}

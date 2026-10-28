import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CaseActivity from '../components/CaseActivity'
import FormQuestions from '../components/FormQuestions'
import MoodBadge from '../components/MoodBadge'
import MoodTrendChart from '../components/MoodTrendChart'
import { Badge, CaseLinks, Empty, Field, Page, Panel } from '../components/ui'
import { counselors } from '../data/mockData'
import { useDemo } from '../hooks/demoContext'
import { inputClass } from '../utils/uiClasses'

type Section = 'overview' | 'forms' | 'checkins'

function dateLabel(value: string) {
  const localDate = value.includes('T') ? value : `${value}T12:00:00`
  return new Date(localDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function MotherDashboard() {
  const { motherId } = useParams()
  const {
    mothers,
    setMothers,
    assignments,
    goals,
    followUps,
    setSelectedId,
  } = useDemo()
  const [section, setSection] = useState<Section>('overview')
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const mother = mothers.find((item) => item.id === motherId)

  useEffect(() => {
    if (motherId && mothers.some((item) => item.id === motherId)) {
      setSelectedId(motherId)
    }
  }, [motherId, mothers, setSelectedId])

  if (!mother) {
    return (
      <Page title="Mother dashboard">
        <Panel title="Case not found">
          <Empty>This case is unavailable.</Empty>
          <Link className="font-semibold text-accent underline" to="/admin/motherselection">
            Back to mothers
          </Link>
        </Panel>
      </Page>
    )
  }

  const motherForms = assignments
    .filter((item) => item.motherId === mother.id)
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === 'Completed' ? -1 : 1
      return (b.completedAt ?? b.due).localeCompare(a.completedAt ?? a.due)
    })
  const completedForms = motherForms.filter((item) => item.status === 'Completed')
  const pendingForms = motherForms.filter((item) => item.status === 'Assigned')
  const selectedForm = motherForms.find((item) => item.id === selectedFormId) ?? motherForms[0]
  const activeGoals = goals.filter((item) => item.motherId === mother.id && item.status === 'Active')
  const openFollowUps = followUps.filter((item) => item.motherId === mother.id && item.status !== 'Completed')
  const checkIns = mother.moodCheckIns ?? []

  const sections: { id: Section; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'forms', label: 'Forms', count: motherForms.length },
    { id: 'checkins', label: 'Mood check-ins', count: checkIns.length },
  ]

  return (
    <Page
      title="Mother dashboard"
      action={
        <Link className="inline-flex min-h-10 items-center rounded-lg border border-line bg-white px-4 py-2 font-semibold text-accent hover:bg-sage" to="/admin/motherselection">
          ← Back to mothers
        </Link>
      }
    >
      <section className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-brand p-5 text-white shadow-sm md:p-6" aria-label={`${mother.name} case summary`}>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#b9cec8]">Case {mother.id}</p>
          <h2 className="font-serif text-3xl font-bold">{mother.name}</h2>
          <p className="text-sm text-[#dcece6]">{mother.county} County · {mother.status} case · {mother.counselor}</p>
        </div>
        <div className="rounded-xl bg-white p-3 text-ink">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Latest mood</p>
          <MoodBadge mother={mother} />
        </div>
      </section>

      <nav className="flex flex-wrap gap-2 border-b border-line pb-2" aria-label="Mother dashboard sections">
        {sections.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={section === item.id ? 'page' : undefined}
            className="rounded-lg px-4 py-2.5 font-semibold text-accent hover:bg-sage aria-[current=page]:bg-brand aria-[current=page]:text-white"
            onClick={() => setSection(item.id)}
          >
            {item.label}{item.count !== undefined && <span className="ml-2 text-xs">{item.count}</span>}
          </button>
        ))}
      </nav>

      {section === 'overview' && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Last mood check-in', value: mother.moodLoggedAt ? dateLabel(mother.moodLoggedAt) : 'None yet' },
              { label: 'Completed forms', value: completedForms.length },
              { label: 'Active goals', value: activeGoals.length },
              { label: 'Open follow-ups', value: openFollowUps.length },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">{item.label}</p>
                <p className="mt-2 font-serif text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="grid items-start gap-5 lg:grid-cols-2">
            <Panel title="Care profile">
              <Field label="Assigned counselor">
                <select
                  className={inputClass}
                  value={mother.counselor}
                  onChange={(event) => {
                    setMothers((items) => items.map((item) => item.id === mother.id
                      ? { ...item, counselor: event.target.value }
                      : item))
                    setMessage('Assigned counselor updated.')
                  }}
                >
                  {counselors.map((name) => <option key={name}>{name}</option>)}
                </select>
              </Field>
              <p><span className="font-semibold">Preferred contact:</span> {mother.contact}</p>
              <div>
                <h3 className="mb-2 font-semibold">Immediate needs</h3>
                <div className="flex flex-wrap gap-2">
                  {mother.needs.length
                    ? mother.needs.map((need) => <Badge key={need}>{need}</Badge>)
                    : <p className="text-muted">No needs recorded yet.</p>}
                </div>
              </div>
              <p role="status" className="text-accent">{message}</p>
            </Panel>
            <Panel title="Next steps">
              <div className="rounded-xl bg-canvas p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">Next appointment</p>
                <p className="mt-1 font-serif text-xl font-bold">
                  {mother.appointment
                    ? new Date(mother.appointment).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
                    : 'No appointment scheduled'}
                </p>
                <p className="text-sm text-muted">Goals and resource review</p>
              </div>
              <CaseLinks />
              <CaseActivity motherId={mother.id} />
            </Panel>
          </div>
        </div>
      )}

      {section === 'forms' && (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.6fr)]">
          <Panel title="Form history">
            <p className="text-sm text-muted">{completedForms.length} completed · {pendingForms.length} awaiting completion</p>
            <div className="space-y-2">
              {motherForms.map((assignment) => (
                <button
                  key={assignment.id}
                  type="button"
                  aria-pressed={selectedForm?.id === assignment.id}
                  className="w-full rounded-xl border border-line bg-canvas p-3 text-left hover:border-accent aria-pressed:border-accent aria-pressed:bg-sage"
                  onClick={() => setSelectedFormId(assignment.id)}
                >
                  <span className="block font-semibold">{assignment.title} · v{assignment.version}</span>
                  <span className="mt-1 block text-xs text-muted">
                    {assignment.status === 'Completed'
                      ? `Completed ${assignment.completedAt ? dateLabel(assignment.completedAt) : 'date not recorded'}`
                      : `Due ${dateLabel(assignment.due)}`}
                  </span>
                  <span className="mt-2 inline-flex"><Badge>{assignment.status}</Badge></span>
                </button>
              ))}
              {!motherForms.length && <Empty>No forms assigned yet.</Empty>}
            </div>
            <Link className="inline-block font-semibold text-accent underline" to="/admin/forms">Assign or manage forms</Link>
          </Panel>
          <Panel title={selectedForm ? `${selectedForm.title} · v${selectedForm.version}` : 'Form answers'}>
            {selectedForm ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{selectedForm.status}</Badge>
                  <span className="text-sm text-muted">
                    {selectedForm.status === 'Completed'
                      ? `Completed ${selectedForm.completedAt ? dateLabel(selectedForm.completedAt) : 'date not recorded'}`
                      : `Due ${dateLabel(selectedForm.due)}`}
                  </span>
                </div>
                <FormQuestions assignment={selectedForm} expanded />
              </>
            ) : <Empty>Select a form to view its questions and answers.</Empty>}
          </Panel>
        </div>
      )}

      {section === 'checkins' && (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.6fr)]">
          <Panel title="Latest check-in">
            <MoodBadge mother={mother} />
            <p className="text-sm text-muted">
              {mother.moodLoggedAt ? `Mother-reported on ${dateLabel(mother.moodLoggedAt)}` : 'No mood check-in recorded yet.'}
            </p>
          </Panel>
          <Panel title="Mood trend">
            <MoodTrendChart checkIns={checkIns} />
          </Panel>
        </div>
      )}
    </Page>
  )
}

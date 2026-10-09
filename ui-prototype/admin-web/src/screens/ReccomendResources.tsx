import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
import { Badge, Button, Empty, Field, MotherPicker, Page, Panel, Pagination } from '../components/ui'
import WorkspaceTabs from '../components/WorkspaceTabs'
import PrivateResourceReviews from '../components/PrivateResourceReviews'
import { inputClass } from '../utils/uiClasses'
import { demoToday } from '../data/mockData'
import type { Resource } from '../types/domain'

function followUpDate(resource: Resource) {
  const date = new Date(`${demoToday}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + (resource.followUpDays ?? 7))
  return date.toISOString().slice(0, 10)
}
export default function RecommendedResources() {
  const { mothers, selectedId, followUps, resources } = useDemo()
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [service, setService] = useState('All')
  const [availability, setAvailability] = useState('All')
  const [mode, setMode] = useState('All')
  const [county, setCounty] = useState('All')
  const [page, setPage] = useState(0)
  const [message, setMessage] = useState('')
  const recommendationRef = useRef<HTMLDivElement>(null)
  const mother = mothers.find(m => m.id === selectedId)
  const resource = resources.find(r => r.id === params.get('resource'))
  const results = resources.filter(r => `${r.name} ${r.service} ${r.county}`.toLowerCase().includes(search.trim().toLowerCase()) && (service === 'All' || r.service === service) && (availability === 'All' || r.availability === availability) && (mode === 'All' || r.mode === mode) && (county === 'All' || r.county === county))
  const currentPage = Math.min(page, Math.max(0, Math.ceil(results.length / 5) - 1))
  const referrals = followUps.filter(f => f.type === 'Referral' && f.motherId === selectedId)
  function choose(id: string) {
    setParams({ resource: id }); setMessage('')
    requestAnimationFrame(() => { recommendationRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }); recommendationRef.current?.focus({ preventScroll: true }) })
  }
  return <Page title="Resources" action={<Button secondary onClick={() => { setParams({}); setMessage(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Start a new recommendation</Button>}>
    <WorkspaceTabs section="resources" />
    <ol className="grid gap-2 rounded-xl bg-sage p-4 text-sm font-semibold text-accent sm:grid-cols-3" aria-label="Recommendation steps"><li>1. Choose a mother</li><li>2. Find a resource</li><li>3. Review & recommend</li></ol>
    <Panel title="1. Who is this recommendation for?">
      <MotherPicker />{mother && <div className="space-y-2"><p className="font-semibold">Recommending to {mother.name} · {mother.county}</p><p className="text-sm text-muted">Current needs: {mother.needs.join(', ') || 'No support needs recorded yet'}</p></div>}
    </Panel>
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,1fr)]">
      <Panel title="2. Find a resource">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Search resources"><input className={inputClass} type="search" placeholder="Name, service, county…" value={search} onChange={e => { setSearch(e.target.value); setPage(0) }} /></Field>
          <Field label="Service type"><select className={inputClass} value={service} onChange={e => { setService(e.target.value); setPage(0) }}>{['All', ...new Set(resources.map(r => r.service))].map(s => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Availability"><select className={inputClass} value={availability} onChange={e => { setAvailability(e.target.value); setPage(0) }}><option>All</option><option>Available</option><option>Waitlist</option></select></Field>
          <Field label="County"><select className={inputClass} value={county} onChange={e => { setCounty(e.target.value); setPage(0) }}>{['All', ...new Set(resources.map(r => r.county))].map(s => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Service location"><select className={inputClass} value={mode} onChange={e => { setMode(e.target.value); setPage(0) }}><option>All</option><option>Physical</option><option>Digital</option></select></Field>
        </div>
        <Button secondary onClick={() => { setSearch(''); setService('All'); setAvailability('All'); setCounty('All'); setMode('All'); setPage(0) }}>Clear filters</Button>
        {results.slice(currentPage * 5, currentPage * 5 + 5).map(r => <article key={r.id} className={`space-y-3 rounded-xl border p-4 ${resource?.id === r.id ? 'border-accent bg-sage' : 'border-line bg-canvas'}`}>
          <div className="flex flex-wrap justify-between gap-2"><h3 className="font-bold">{r.name}</h3><Badge>{r.availability}</Badge></div>
          <p className="text-sm">{r.service} · {r.county} · {r.mode}</p><p className="text-sm text-muted">{r.address}<br />{r.hours}</p><p className="text-xs text-muted">Default follow-up: {r.followUpDays ?? 7} days</p>
          <Button disabled={!mother} onClick={() => choose(r.id)}>{resource?.id === r.id ? 'Selected · Review recommendation' : `Recommend ${r.name}`}</Button>
        </article>)}
        {!results.length && <Empty>No resources match these filters.</Empty>}<Pagination page={currentPage} total={results.length} onChange={setPage} />
      </Panel>
      <div ref={recommendationRef} tabIndex={-1} className="scroll-mt-5 outline-none"><Panel title="3. Review & recommend">
        {resource && mother ? <RecommendationForm key={`${selectedId}-${resource.id}`} resource={resource} onSaved={() => { setParams({}); setMessage(`${resource.name} recommended to ${mother.name}. A follow-up is scheduled.`) }} onCancel={() => setParams({})} /> : <Empty>{mother ? 'Choose a resource to write a recommendation and schedule a follow-up.' : 'Choose a mother before recommending a resource.'}</Empty>}
        {message && <p role="status" className="rounded-lg bg-sage p-3 text-accent">{message} <Link className="font-semibold underline" to="/admin/followup">View follow-ups →</Link></p>}
      </Panel></div>
    </div>
    <Panel title={mother ? `Recommendations for ${mother.name}` : 'Recommendations'}>
      {referrals.map(f => <article key={f.id} className="space-y-2 rounded-xl bg-canvas p-4"><div className="flex flex-wrap justify-between gap-2"><strong>{f.title}</strong><Badge>{f.status}</Badge></div>{f.message && <p>{f.message}</p>}<p className="text-xs text-muted">Follow-up {f.due} · {f.shared ? 'Shared with mother' : 'Care team only'}{f.priority && ` · ${f.priority} priority`}</p></article>)}
      {!referrals.length && <Empty>No recommendations for this mother yet.</Empty>}
    </Panel>
    <PrivateResourceReviews />
  </Page>
}
function RecommendationForm({ resource, onSaved, onCancel }: { resource: Resource; onSaved: () => void; onCancel: () => void }) {
  const { mothers, selectedId, goals, setFollowUps } = useDemo()
  const mother = mothers.find(m => m.id === selectedId)!
  const [message, setMessage] = useState(`Hi ${mother.name.split(' ')[0]}, ${resource.name} offers ${resource.service.toLowerCase()} support. We can talk about how to access this resource together.`)
  const [due, setDue] = useState(() => followUpDate(resource))
  const [error, setError] = useState('')
  return <form className="space-y-4" onSubmit={e => {
    e.preventDefault()
    if (!message.trim()) { setError('Add a message explaining how this resource may help.'); return }
    const values = new FormData(e.currentTarget)
    setFollowUps(prev => [{ id: crypto.randomUUID(), motherId: selectedId, resourceId: resource.id, title: resource.name, type: 'Referral', due, status: 'Scheduled', feedback: '', message: message.trim(), priority: String(values.get('priority')), goalId: String(values.get('goal')) || undefined, shared: values.has('visible') }, ...prev])
    onSaved()
  }}>
    <div className="space-y-2 rounded-lg bg-sage p-4"><p className="text-xs font-bold uppercase tracking-wide text-accent">To {mother.name}</p><h3 className="text-lg font-bold">{resource.name}</h3><Badge>{resource.availability}</Badge><p className="text-sm">{resource.address} · {resource.hours}</p></div>
    {resource.availability === 'Waitlist' && <p className="rounded-lg bg-[#f3eedf] p-3 text-sm">This resource has a waitlist. Include an alternative or discuss the wait with {mother.name.split(' ')[0]}.</p>}
    <Field label="Message to mother"><textarea required maxLength={1000} rows={4} className={inputClass} value={message} onChange={e => { setMessage(e.target.value); setError('') }} /></Field>
    <Field label="Priority"><select name="priority" className={inputClass}><option>Standard</option><option>High</option></select></Field>
    <Field label="Link to a goal (optional)"><select name="goal" className={inputClass}><option value="">No linked goal</option>{goals.filter(g => g.motherId === selectedId && g.status === 'Active').map(g => <option key={g.id} value={g.id}>{g.title}</option>)}</select></Field>
    <Field label="Follow-up date"><input required min={demoToday} type="date" className={inputClass} value={due} onChange={e => setDue(e.target.value)} /></Field>
    <p className="text-xs text-muted">Filled in using this resource’s {resource.followUpDays ?? 7}-day follow-up duration from the demo date (Oct 1). You can change it for this recommendation.</p>
    <label className="flex items-center gap-2"><input type="checkbox" name="visible" defaultChecked />Share recommendation with mother</label>
    {error && <p role="alert" className="text-red-800">{error}</p>}
    <div className="flex flex-wrap gap-2"><Button type="submit">Recommend to {mother.name.split(' ')[0]}</Button><Button secondary onClick={onCancel}>Cancel</Button></div>
  </form>
}

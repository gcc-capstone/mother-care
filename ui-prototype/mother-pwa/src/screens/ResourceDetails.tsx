import { useEffect, useState, type FormEvent } from 'react'
import { useMotherState } from '../hooks/useMotherState'
import { useParams } from 'react-router-dom'
import { resources } from '../data/resources'
import { ActionLink, MissingRecord, Page, PrimaryButton } from '../components/Page'
import type { ResourceReview } from '../types'

const inputClass = 'min-h-11 rounded-xl border border-[var(--border)] bg-white p-3 font-normal'
export default function ResourceDetails() {
  const { activeMotherId } = useMotherState()
  const { id } = useParams()
  return <ResourceContent key={`${activeMotherId}-${id}`} id={id} />
}
function ResourceContent({ id }: { id: string | undefined }) {
  const { feedbackStorageError, counselorName, profile, resourceReviews, setResourceReviews, recordResourceView } = useMotherState()
  const resource = resources.find(r => r.id === id)
  const saved = resourceReviews.find(r => r.resourceId === id)
  const [outcome, setOutcome] = useState<ResourceReview['outcome'] | ''>(saved?.outcome ?? '')
  const [rating, setRating] = useState(saved?.rating ?? '')
  const [comments, setComments] = useState(saved?.comments ?? '')
  const [needsFollowUp, setNeedsFollowUp] = useState(saved?.needsFollowUp ?? false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  // Track direct links as well as resources opened from the directory.
  useEffect(() => { if (resource) recordResourceView(resource.id) }, [resource, recordResourceView])
  if (!resource) return <MissingRecord back="/resources" />
  function submit(e: FormEvent) {
    e.preventDefault()
    if (!resource || !outcome) { setError('Choose whether you were able to access this resource.'); return }
    const review: ResourceReview = {
      id: saved?.id ?? crypto.randomUUID(), motherId: profile.id, motherName: `${profile.firstName} ${profile.familyName}`,
      resourceId: resource.id, resourceName: resource.name, outcome, rating: outcome === 'Not visited yet' ? '' : rating,
      comments: comments.trim(), needsFollowUp, submittedAt: new Date().toISOString(),
    }
    setResourceReviews(prev => [...prev.filter(r => r.resourceId !== resource.id), review]); setError(''); setSubmitted(true)
  }
  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ version: 1, reviews: resourceReviews }, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a'); link.href = url; link.download = `mothercare-feedback-${profile.id}.json`; link.click(); URL.revokeObjectURL(url)
  }
  return <Page title={resource.name} back="/resources">
    <section className="flex flex-col gap-4 rounded-3xl bg-white p-5">
      <p className="font-semibold">{resource.org}</p><p>{resource.provides}</p>
      <p className="text-sm">{resource.status} · {resource.distance}</p>
      <h2 className="text-lg font-semibold">Location</h2><p>{resource.address}</p>
      <h2 className="text-lg font-semibold">Before you visit</h2><p>Bring a photo ID if available and a list of the items or support your family needs. Availability can vary. {counselorName} can help you plan your visit and find alternatives.</p>
      <ActionLink to="/forms/monthly-check-in">Ask for help in your check-in</ActionLink>
    </section>
    <section className="flex flex-col gap-4 rounded-3xl bg-white p-5">
      <h2 className="text-lg font-semibold text-[var(--ink)]">How did it go?</h2>
      <p className="text-sm">Your feedback is for your counselor and care team. It is not shown to other mothers.</p>
      {submitted ? <div className="flex flex-col gap-3"><p role="status" className="rounded-xl bg-[var(--sage-strip)] p-3">✓ Your private feedback is saved.{needsFollowUp ? ' You requested a follow-up.' : ''}</p><button className="min-h-11 font-semibold" onClick={() => setSubmitted(false)}>Edit my feedback</button></div> : <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 font-medium">Were you able to get support? (required)<select required className={inputClass} value={outcome} onChange={e => { setOutcome(e.target.value as ResourceReview['outcome']); setSubmitted(false) }}><option value="">Choose an outcome</option>{['Received support', 'Some support', 'Could not access', 'Not visited yet'].map(v => <option key={v}>{v}</option>)}</select></label>
        {outcome && outcome !== 'Not visited yet' && <label className="flex flex-col gap-2 font-medium">How helpful was this resource? (optional)<select className={inputClass} value={rating} onChange={e => setRating(e.target.value)}><option value="">Choose a rating</option><option>Very helpful</option><option>Somewhat helpful</option><option>Not helpful</option></select></label>}
        <label className="flex flex-col gap-2 font-medium">Tell us more (optional)<textarea className={inputClass} rows={4} maxLength={2000} value={comments} onChange={e => setComments(e.target.value)} placeholder="What helped, or what made it difficult to get support?" /></label>
        <label className="flex min-h-11 items-center gap-3"><input className="size-5 accent-[var(--ink)]" type="checkbox" checked={needsFollowUp} onChange={e => setNeedsFollowUp(e.target.checked)} />I’d like my counselor to follow up</label>
        {error && <p role="alert" className="text-red-800">{error}</p>}<PrimaryButton type="submit">{saved ? 'Update private feedback' : 'Save private feedback'}</PrimaryButton>
      </form>}
      {feedbackStorageError && <p role="alert" className="text-sm text-red-800">Your browser could not keep your feedback after closing the app. Download a copy to keep it.</p>}
      {resourceReviews.length > 0 && <><button className="min-h-11 font-semibold text-[var(--ink)]" onClick={download}>Download my feedback</button><p className="text-xs text-[var(--muted)]">In this prototype, your care team can import this file in the admin app. Feedback is saved on this browser; it is not sent automatically.</p></>}
    </section>
  </Page>
}

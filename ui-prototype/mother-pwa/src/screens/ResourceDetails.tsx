import { useEffect, useState, type FormEvent } from 'react'
import { useMotherState } from '../hooks/useMotherState'
import { useParams } from 'react-router-dom'
import { resources } from '../data/resources'
import { ActionLink, MissingRecord, Page, PrimaryButton } from '../components/Page'
import type { ResourceReview } from '../types'

import pinIcon from '../assets/icons/location-pin.svg'
import chevronIcon from '../assets/icons/chevron-down.svg'
import thumbIcon from '../assets/icons/thumbs-up.svg'
import roughIcon from '../assets/icons/mood-rough.svg'
import lowIcon from '../assets/icons/mood-low.svg'
import okayIcon from '../assets/icons/mood-okay.svg'
import goodIcon from '../assets/icons/mood-good.svg'
import greatIcon from '../assets/icons/mood-great.svg'

const inputClass = 'min-h-11 rounded-xl border border-[var(--border)] bg-white p-3 font-normal'
// Outcome values must stay in sync with admin-web/src/components/PrivateResourceReviews.tsx.
const outcomeChoices: { value: ResourceReview['outcome']; icon: string; color: string }[] = [
  { value: 'Could not access', icon: 'rotate-180', color: 'bg-[var(--mood-low)]' },
  { value: 'Some support', icon: '-rotate-90', color: 'bg-[var(--mood-okay)]' },
  { value: 'Received support', icon: 'rotate-0', color: 'bg-[var(--mood-good)]' },
]
const ratingChoices = [
  { label: 'Very bad', icon: roughIcon, color: 'bg-[var(--mood-rough)]' },
  { label: 'Bad', icon: lowIcon, color: 'bg-[var(--mood-low)]' },
  { label: 'Neutral', icon: okayIcon, color: 'bg-[var(--mood-okay)]' },
  { label: 'Good', icon: goodIcon, color: 'bg-[var(--mood-good)]' },
  { label: 'Very good', icon: greatIcon, color: 'bg-[var(--mood-great)]' },
]
// Radios are visually hidden; the label carries the selected and keyboard-focus styles.
const choiceFocus = 'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--ink)]'

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
  // The message box and the rest of the form appear once either question is answered.
  const hasAnswer = outcomeChoices.some(c => c.value === outcome) || rating !== ''
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
  const provides = resource.provides.replace(/^Provides:\s*/, '').replace(/\s+/g, ' ')
  return <Page title={resource.name} back="/resources">
    <section aria-label="About this resource" className="flex flex-col gap-3 rounded-3xl bg-white p-4">
      <div className="flex items-center gap-3">
        {resource.logo
          ? <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-white p-1 [&>img]:size-10 [&>img]:object-contain"><img src={resource.logo} alt="" /></div>
          : <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sage-strip)] p-1 text-lg font-semibold text-[var(--ink)]">{resource.initials}</div>}
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-[15px] font-semibold leading-snug text-[var(--ink)]">{resource.org}</p>
          <ul className="flex flex-wrap gap-1.5" aria-label="Categories">{resource.categories.map(c => <li key={c} className="rounded-full bg-[var(--sage-strip)] px-2.5 py-0.5 text-xs font-semibold text-[var(--ink)]">{c}</li>)}</ul>
        </div>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-[var(--border)] pt-3 text-sm">
        <dt className="font-semibold text-[var(--muted)]">Provides</dt><dd>{provides}</dd>
        <dt className="font-semibold text-[var(--muted)]">Hours</dt><dd className={resource.isOpen ? 'font-semibold text-[var(--sage)]' : 'font-semibold text-[var(--ink)]'}>{resource.status}</dd>
        <dt className="font-semibold text-[var(--muted)]">Distance</dt><dd>{resource.distance} away</dd>
        <dt className="font-semibold text-[var(--muted)]">Location</dt><dd className="flex items-start gap-1.5"><img className="mt-0.5 shrink-0" src={pinIcon} width={14} height={14} alt="" />{resource.address}</dd>
      </dl>
    </section>
    <details className="group rounded-3xl bg-[var(--sage-strip)] px-5 py-1">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-lg font-semibold text-[var(--ink)] [&::-webkit-details-marker]:hidden">
        Before you visit
        <img className="shrink-0 transition-transform group-open:rotate-180" src={chevronIcon} width={20} height={20} alt="" />
      </summary>
      <div className="flex flex-col gap-3 pb-4 pt-1">
        <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-[var(--sage)]">
          <li>Bring a photo ID if available.</li>
          <li>Bring a list of the items or support your family needs.</li>
          <li>Availability can vary.</li>
          <li>{counselorName} can help you plan your visit and find alternatives.</li>
        </ul>
        <ActionLink to="/forms/monthly-check-in">Ask for help in your check-in</ActionLink>
      </div>
    </details>
    <section aria-labelledby="leave-review" className="flex flex-col gap-4 rounded-3xl bg-white p-5">
      <div className="flex flex-col gap-1">
        <h2 id="leave-review" className="text-lg font-semibold text-[var(--ink)]">Leave a Review</h2>
        <p className="text-sm text-[var(--muted)]">Your review is for your counselor and care team. It is not shown to other mothers.</p>
      </div>
      {submitted ? <div className="flex flex-col gap-3"><p role="status" className="rounded-xl bg-[var(--sage-strip)] p-3">✓ Your private review is saved.{needsFollowUp ? ' You requested a follow-up.' : ''}</p><button className="min-h-11 font-semibold text-[var(--ink)]" onClick={() => setSubmitted(false)}>Edit my review</button></div> : <form onSubmit={submit} className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-2.5 font-medium">Were you able to get support? <span className="font-normal text-[var(--muted)]">(required)</span></legend>
          <div className="grid grid-cols-3 gap-2">
            {outcomeChoices.map(c => <label key={c.value} className={`flex min-h-11 cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-2 border-[var(--border)] bg-white px-1 py-2 text-center text-xs font-semibold leading-tight text-[var(--ink)] has-checked:border-[var(--ink)] has-checked:bg-[var(--sage-bg)] ${choiceFocus}`}>
              <input className="sr-only" type="radio" name="outcome" value={c.value} checked={outcome === c.value} onChange={() => { setOutcome(c.value); setError('') }} />
              <span aria-hidden="true" className={`flex size-9 items-center justify-center rounded-full ${c.color}`}><img className={c.icon} src={thumbIcon} width={20} height={20} alt="" /></span>
              {c.value}
            </label>)}
          </div>
        </fieldset>
          <fieldset className="flex flex-col">
            <legend className="mb-2.5 font-medium">How helpful was this resource? <span className="font-normal text-[var(--muted)]">(optional)</span><span className="sr-only"> Select your choice again to clear it.</span></legend>
            <div className="flex justify-between gap-1">
              {ratingChoices.map(c => <label key={c.label} className={`group flex min-w-11 flex-1 cursor-pointer flex-col items-center gap-1.5 rounded-xl py-1 text-center has-checked:font-semibold ${choiceFocus}`}>
                <input className="sr-only" type="radio" name="rating" value={c.label} checked={rating === c.label} onChange={() => setRating(c.label)} onClick={() => { if (rating === c.label) setRating('') }} />
                <span aria-hidden="true" className={`flex size-11 items-center justify-center rounded-full group-has-checked:ring-2 group-has-checked:ring-[var(--ink)] group-has-checked:ring-offset-2 ${c.color}`}><img src={c.icon} width={26} height={26} alt="" /></span>
                <span className="text-[13px] leading-snug text-[var(--muted)] group-has-checked:text-[var(--ink)]">{c.label}</span>
              </label>)}
            </div>
          </fieldset>
        {hasAnswer && <>
          <label className="flex flex-col gap-2 font-medium"><span>Tell us more <span className="font-normal text-[var(--muted)]">(optional)</span></span><textarea className={inputClass} rows={4} maxLength={2000} value={comments} onChange={e => setComments(e.target.value)} placeholder="What helped, or what made it difficult to get support?" /></label>
          <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-2xl bg-[var(--bg)] px-4 py-2 font-medium">
            I’d like my counselor to follow up
            <input className="peer sr-only" type="checkbox" role="switch" checked={needsFollowUp} onChange={e => setNeedsFollowUp(e.target.checked)} />
            <span aria-hidden="true" className="relative h-7 w-12 shrink-0 rounded-full bg-[var(--muted)] transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-6 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-[var(--ink)] peer-checked:after:translate-x-5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--ink)]" />
          </label>
          {error && <p role="alert" className="text-red-800">{error}</p>}<PrimaryButton type="submit">{saved ? 'Update Review' : 'Submit Review'}</PrimaryButton>
        </>}
      </form>}
      {feedbackStorageError && <p role="alert" className="text-sm text-red-800">Your browser could not keep your review after closing the app. It is saved for now, but you may need to submit it again next time.</p>}
    </section>
  </Page>
}

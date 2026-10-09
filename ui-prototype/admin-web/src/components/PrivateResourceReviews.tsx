import { useState, type ChangeEvent } from 'react'
import { Badge, Button, Empty, Panel } from './ui'
import { inputClass } from '../utils/uiClasses'

interface Review {
  id: string; motherId: string; motherName: string; resourceId: string; resourceName: string
  outcome: string; rating: string; comments: string; needsFollowUp: boolean; submittedAt: string
}
const outcomes = ['Received support', 'Some support', 'Could not access', 'Not visited yet']
function isReview(value: unknown): value is Review {
  if (!value || typeof value !== 'object') return false
  const r = value as Record<string, unknown>
  return ['id', 'motherId', 'motherName', 'resourceId', 'resourceName', 'outcome', 'rating', 'comments', 'submittedAt'].every(key => typeof r[key] === 'string' && (r[key] as string).length <= 2000)
    && typeof r.needsFollowUp === 'boolean' && outcomes.includes(r.outcome as string) && !Number.isNaN(Date.parse(r.submittedAt as string))
}
function load(): Review[] {
  try { const data: unknown = JSON.parse(localStorage.getItem('mothercare-admin-reviews') ?? '[]'); return Array.isArray(data) ? data.filter(isReview) : [] } catch { return [] }
}
export default function PrivateResourceReviews() {
  const [reviews, setReviews] = useState<Review[]>(load)
  const [query, setQuery] = useState('')
  const [followUpOnly, setFollowUpOnly] = useState(false)
  const [message, setMessage] = useState('')
  const [reviewed, setReviewed] = useState<string[]>(() => {
    try { const saved: unknown = JSON.parse(localStorage.getItem('mothercare-admin-reviewed') ?? '[]'); return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : [] } catch { return [] }
  })
  async function importReviews(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > 1_000_000) { setMessage('Choose a feedback file smaller than 1 MB.'); return }
    try {
      const data = JSON.parse(await file.text()) as { version?: unknown; reviews?: unknown }
      if (!data || data.version !== 1 || !Array.isArray(data.reviews) || !data.reviews.length || data.reviews.length > 500 || !data.reviews.every(isReview)) throw new Error('Invalid file')
      const merged = new Map(reviews.map(r => [r.id, r]))
      const updatedIds: string[] = []
      for (const review of data.reviews as Review[]) {
        const prior = merged.get(review.id)
        if (!prior || Date.parse(review.submittedAt) > Date.parse(prior.submittedAt)) { merged.set(review.id, review); updatedIds.push(review.id) }
      }
      const next = [...merged.values()].sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
      setReviews(next)
      const nextReviewed = reviewed.filter(id => !updatedIds.includes(id))
      setReviewed(nextReviewed)
      try { localStorage.setItem('mothercare-admin-reviews', JSON.stringify(next)); localStorage.setItem('mothercare-admin-reviewed', JSON.stringify(nextReviewed)); setMessage(`${updatedIds.length} new or updated private reviews imported.`) }
      catch { setMessage('Feedback imported for this session. Browser storage is unavailable.') }
    } catch { setMessage('This file could not be imported. Use the feedback JSON downloaded from the mother app.') }
  }
  const visible = reviews.filter(r => (!followUpOnly || r.needsFollowUp) && `${r.motherName} ${r.motherId} ${r.resourceName} ${r.comments}`.toLowerCase().includes(query.trim().toLowerCase()))
  return <Panel title="Private resource feedback">
    <p className="text-sm text-muted">Care team only. Reviews are never displayed in the mother’s resource directory. The two prototype apps use separate browser storage: import a feedback download from the mother app to review it here.</p>
    <label className="flex flex-col gap-2 text-sm font-semibold">Import mother feedback<input type="file" accept=".json,application/json" onChange={importReviews} className={inputClass} /></label>
    <div className="flex flex-wrap gap-4"><label className="flex flex-1 flex-col gap-2 text-sm font-semibold">Search all imported feedback<input className={inputClass} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Mother, resource, or comment" /></label><label className="flex items-center gap-2"><input type="checkbox" checked={followUpOnly} onChange={e => setFollowUpOnly(e.target.checked)} />Follow-up requested only</label></div>
    {message && <p role="status" className="text-sm text-accent">{message}</p>}
    {!visible.length && <Empty>{reviews.length ? 'No reviews match your filters.' : 'No private feedback imported yet.'}</Empty>}
    {visible.map(r => <article key={r.id} className="space-y-3 rounded-xl border border-line bg-canvas p-4">
      <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-bold">{r.resourceName}</h3><Badge>{reviewed.includes(r.id) ? 'Reviewed' : 'Needs review'}</Badge></div>
      <p className="text-sm text-muted">{r.motherName} · {r.motherId} · {new Date(r.submittedAt).toLocaleDateString()}</p>
      <div className="flex flex-wrap gap-2"><Badge>{r.outcome}</Badge>{r.rating && <Badge>{r.rating}</Badge>}{r.needsFollowUp && <Badge>Follow-up requested</Badge>}</div>
      {r.comments && <p className="whitespace-pre-wrap">{r.comments}</p>}
      <Button secondary onClick={() => {
        const next = reviewed.includes(r.id) ? reviewed.filter(id => id !== r.id) : [...reviewed, r.id]
        setReviewed(next)
        try { localStorage.setItem('mothercare-admin-reviewed', JSON.stringify(next)); setMessage('Review status updated.') } catch { setMessage('Review status updated for this session. Browser storage is unavailable.') }
      }}>{reviewed.includes(r.id) ? 'Mark as unread' : 'Mark reviewed'}</Button>
    </article>)}
  </Panel>
}

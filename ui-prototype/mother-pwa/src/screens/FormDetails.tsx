import { useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { assignedForms, intakeForm, otherForms } from '../data/forms'
import { Page, ActionLink, MissingRecord, PrimaryButton } from '../components/Page'
import { useMotherState } from '../hooks/useMotherState'

const inputClass = 'min-h-11 rounded-xl border border-[var(--border)] bg-white p-3 font-normal'
const profileFields = [
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Phone number', type: 'tel' },
  { key: 'location', label: 'City, state & ZIP code', type: 'text' },
  { key: 'householdSize', label: 'Household size', type: 'number' },
  { key: 'childrenAges', label: 'Children’s ages', type: 'text' },
] as const
export default function FormDetails() {
  const { activeMotherId } = useMotherState()
  const { id } = useParams()
  return <FormContent key={`${activeMotherId}-${id}`} id={id} />
}
function FormContent({ id }: { id: string | undefined }) {
  const form = [intakeForm, ...assignedForms, ...otherForms].find(f => f.id === id)
  const { profile, counselorName, formResponses, setFormResponses, setGoals } = useMotherState()
  const saved = form ? formResponses[form.id] : undefined
  const [name, setName] = useState(saved?.name ?? `${profile.firstName} ${profile.familyName}`)
  const [notes, setNotes] = useState(saved?.notes ?? '')
  const [fields, setFields] = useState<Record<string, string>>(() => ({ ...(form?.prefill ? {
    email: profile.email, phone: profile.phone ?? '', location: profile.location,
    householdSize: profile.householdSize ?? '', childrenAges: profile.childrenAges ?? '',
    supportNeeds: profile.supportNeeds?.join(', ') ?? '',
  } : {}), ...saved?.fields }))
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  if (!form) return <MissingRecord back="/forms" />
  function update(key: string, value: string) { setFields(prev => ({ ...prev, [key]: value })) }
  function submit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    if (!name.trim() || form.questions?.some(q => q.required && !fields[q.key]?.trim())) { setError('Please complete your name and the required questions.'); return }
    setFormResponses(prev => ({ ...prev, [form.id]: { name: name.trim(), notes: notes.trim(), fields: Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value.trim()])), submittedAt: new Date().toISOString() } }))
    if (form.id === 'monthly-check-in') setGoals(prev => prev.map(g => g.id === 'family-check-in' ? { ...g, done: true } : g))
    setError(''); setSubmitted(true)
  }
  return <Page title={form.title} back="/forms">
    <p>{form.description}</p>
    {submitted ? <section className="flex flex-col gap-4 rounded-3xl bg-white p-5" role="status"><h2 className="text-lg font-semibold">Thank you, your form is saved</h2><p>Your response is ready for your next visit with {counselorName}.</p><ActionLink to="/forms">Back to forms</ActionLink><button className="min-h-11 font-semibold" onClick={() => setSubmitted(false)}>Edit response</button></section> :
      <form onSubmit={submit} className="flex flex-col gap-4 rounded-3xl bg-white p-5">
        {form.prefill && <div className="rounded-2xl bg-[var(--sage-strip)] p-4 text-sm"><p className="font-semibold">A head start from your profile</p><p>Review and edit these details before submitting. Changes apply to this form.</p></div>}
        <label className="flex flex-col gap-2 font-medium">Your name (required)<input required maxLength={100} value={name} onChange={e => setName(e.target.value)} className={inputClass} /></label>
        {form.prefill && <>
          {profileFields.map(field => <label key={field.key} className="flex flex-col gap-2 font-medium">{field.label}<input type={field.type} min={field.type === 'number' ? 1 : undefined} max={field.type === 'number' ? 30 : undefined} step={field.type === 'number' ? 1 : undefined} maxLength={150} value={fields[field.key] ?? ''} onChange={e => update(field.key, e.target.value)} className={inputClass} /></label>)}
          <label className="flex flex-col gap-2 font-medium">Current support needs<input maxLength={300} className={inputClass} value={fields.supportNeeds ?? ''} onChange={e => update('supportNeeds', e.target.value)} /></label>
        </>}
        {form.questions?.map(q => <label key={q.key} className="flex flex-col gap-2 font-medium">{q.label}{q.required ? ' (required)' : ' (optional)'}<input required={q.required} type={q.type ?? 'text'} maxLength={500} className={inputClass} value={fields[q.key] ?? ''} onChange={e => update(q.key, e.target.value)} /></label>)}
        <label className="flex flex-col gap-2 font-medium">Anything else you’d like your counselor to know? (optional)<textarea maxLength={2000} rows={4} value={notes} onChange={e => setNotes(e.target.value)} className={inputClass} /></label>
        {saved && <p className="text-sm">Your previous response is saved. You can update it here.</p>}
        {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
        <PrimaryButton type="submit">{saved ? 'Save changes' : 'Submit form'}</PrimaryButton><ActionLink to="/forms">Cancel</ActionLink>
      </form>}
  </Page>
}

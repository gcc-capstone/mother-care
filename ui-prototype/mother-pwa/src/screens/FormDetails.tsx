import { useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { assignedForms, intakeForm, otherForms } from '../data/forms'
import { Page, ActionLink, MissingRecord, PrimaryButton } from '../components/Page'
import { useMotherState } from '../hooks/useMotherState'

export default function FormDetails() {
  const { activeMotherId } = useMotherState()
  const { id } = useParams()
  return <FormContent key={`${activeMotherId}-${id}`} id={id} />
}
function FormContent({ id }: { id: string | undefined }) {
  const form = [intakeForm, ...assignedForms, ...otherForms].find(f => f.id === id)
  const { profile, counselorName, formResponses, setFormResponses } = useMotherState()
  const saved = form ? formResponses[form.id] : undefined
  const [name, setName] = useState(saved?.name ?? `${profile.firstName} ${profile.familyName}`)
  const [notes, setNotes] = useState(saved?.notes ?? '')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  if (!form) return <MissingRecord back="/forms" />
  function submit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    if (!name.trim() || !notes.trim()) { setError('Please enter your name and a little information about your family.'); return }
    setFormResponses(prev => ({ ...prev, [form.id]: { name: name.trim(), notes: notes.trim() } }))
    setError(''); setSubmitted(true)
  }
  return <Page title={form.title} back="/forms">
    <p>{form.description}</p>
    {submitted ? <section className="flex flex-col gap-4 rounded-3xl bg-white p-5" role="status"><h2 className="text-lg font-semibold">Thank you, your form is saved</h2><p>{counselorName} can review this information at your next visit.</p><ActionLink to="/forms">Back to forms</ActionLink><button className="min-h-11 font-semibold" onClick={() => setSubmitted(false)}>Edit response</button></section> :
      <form onSubmit={submit} className="flex flex-col gap-4 rounded-3xl bg-white p-5">
        <label className="flex flex-col gap-2 font-medium">Your name<input required maxLength={100} value={name} onChange={e => setName(e.target.value)} className="min-h-11 rounded-xl border border-[var(--border)] p-3" /></label>
        <label className="flex flex-col gap-2 font-medium">{form.id === 'family-intake' ? 'Tell us about your household and current needs' : form.id === 'monthly-check-in' ? 'How is your family doing this month?' : 'Describe the childcare support you need'}<textarea required maxLength={2000} rows={5} value={notes} onChange={e => setNotes(e.target.value)} className="rounded-xl border border-[var(--border)] p-3 font-normal" /></label>
        {saved && <p className="text-sm">Your previous response is saved. You can update it here.</p>}
        {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
        <PrimaryButton type="submit">{saved ? 'Save changes' : 'Submit form'}</PrimaryButton><ActionLink to="/forms">Cancel</ActionLink>
      </form>}
  </Page>
}

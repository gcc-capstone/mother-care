import { motherDemos } from '../data/mothers'
import { useState, type FormEvent } from 'react'
import { useMotherState } from '../hooks/useMotherState'
import { ActionLink, Page, PrimaryButton } from '../components/Page'

const supportOptions = ['Food', 'Diapers', 'Clothing', 'Childcare', 'Housing & utilities', 'Transportation', 'Parenting support']
const inputClass = 'min-h-11 rounded-xl border border-[var(--border)] bg-white p-3 font-normal'
export default function Profile() {
  const { activeMotherId } = useMotherState()
  return <ProfileContent key={activeMotherId} />
}
function ProfileContent() {
  const { profile, setProfile, activeMotherId, selectMother, counselorName } = useMotherState()
  const [draft, setDraft] = useState(profile)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  function update(key: keyof typeof profile, value: string | string[]) {
    setSaved(false); setDraft(prev => ({ ...prev, [key]: value }))
  }
  function submit(e: FormEvent) {
    e.preventDefault()
    if (![draft.firstName, draft.familyName, draft.email, draft.location].every(value => value.trim())) { setError('Please enter your name, email, and location.'); return }
    setProfile({ ...draft, firstName: draft.firstName.trim(), familyName: draft.familyName.trim(), email: draft.email.trim(), location: draft.location.trim() }); setSaved(true); setError('')
  }
  return <Page title="Your profile" back="/">
    <label className="flex flex-col gap-2 font-medium">Demo mother<select className={inputClass} value={activeMotherId} onChange={e => selectMother(e.target.value)}>{motherDemos.map(d => <option key={d.profile.id} value={d.profile.id}>{d.profile.firstName} {d.profile.familyName}</option>)}</select></label>
    <p>Your counselor: {counselorName}</p>
    <p className="text-sm text-[var(--muted)]">Help your counselor understand your family. Household and support details are optional and can be used to fill in your forms.</p>
    <form className="flex flex-col gap-5" onSubmit={submit}>
      <fieldset className="flex flex-col gap-4 rounded-3xl bg-white p-5"><legend className="float-left mb-3 text-lg font-semibold text-[var(--ink)]">Contact details</legend>
        {([{ key: 'firstName', label: 'First name', type: 'text', required: true }, { key: 'familyName', label: 'Last name', type: 'text', required: true }, { key: 'email', label: 'Email', type: 'email', required: true }, { key: 'phone', label: 'Phone number (optional)', type: 'tel', required: false }, { key: 'location', label: 'City, state & ZIP code', type: 'text', required: true }, { key: 'language', label: 'Preferred language (optional)', type: 'text', required: false }] as const).map(field => <label className="flex flex-col gap-2 font-medium" key={field.key}>{field.label}<input required={field.required} maxLength={100} type={field.type} value={draft[field.key] ?? ''} onChange={e => update(field.key, e.target.value)} className={inputClass} /></label>)}
        <label className="flex flex-col gap-2 font-medium">Preferred contact method<select className={inputClass} value={draft.preferredContact ?? ''} onChange={e => update('preferredContact', e.target.value)}><option value="">Choose (optional)</option><option>Email</option><option>Phone call</option><option>Text message</option><option>In-app only</option></select></label>
        <label className="flex flex-col gap-2 font-medium">Best time or instructions for contacting you<textarea rows={2} maxLength={500} className={inputClass} value={draft.contactNotes ?? ''} onChange={e => update('contactNotes', e.target.value)} placeholder="For example: please call after 3pm" /></label>
      </fieldset>
      <fieldset className="flex flex-col gap-4 rounded-3xl bg-white p-5"><legend className="float-left mb-3 text-lg font-semibold text-[var(--ink)]">Your household</legend>
        <label className="flex flex-col gap-2 font-medium">Number of people in your household<input type="number" min={1} max={30} step={1} className={inputClass} value={draft.householdSize ?? ''} onChange={e => update('householdSize', e.target.value)} /></label>
        <label className="flex flex-col gap-2 font-medium">Children’s ages<input maxLength={150} className={inputClass} value={draft.childrenAges ?? ''} onChange={e => update('childrenAges', e.target.value)} placeholder="For example: 6 months, 4 years" /></label>
        <label className="flex flex-col gap-2 font-medium">Expected due date, if applicable<input type="date" className={inputClass} value={draft.dueDate ?? ''} onChange={e => update('dueDate', e.target.value)} /></label>
        <label className="flex flex-col gap-2 font-medium">Housing situation<select className={inputClass} value={draft.housing ?? ''} onChange={e => update('housing', e.target.value)}><option value="">Choose (optional)</option>{['Renting', 'Own home', 'Staying with family or friends', 'Temporary housing', 'Need housing support', 'Prefer not to say'].map(v => <option key={v}>{v}</option>)}</select></label>
        <label className="flex flex-col gap-2 font-medium">Transportation<select className={inputClass} value={draft.transportation ?? ''} onChange={e => update('transportation', e.target.value)}><option value="">Choose (optional)</option>{['Own vehicle', 'Public transit', 'Rides from family or friends', 'Need transportation support', 'Prefer not to say'].map(v => <option key={v}>{v}</option>)}</select></label>
      </fieldset>
      <fieldset className="flex flex-col gap-2 rounded-3xl bg-white p-5"><legend className="float-left mb-3 text-lg font-semibold text-[var(--ink)]">What would help right now?</legend>{supportOptions.map(need => <label key={need} className="flex min-h-11 items-center gap-3"><input type="checkbox" className="size-5 accent-[var(--ink)]" checked={draft.supportNeeds?.includes(need) ?? false} onChange={e => update('supportNeeds', e.target.checked ? [...(draft.supportNeeds ?? []), need] : (draft.supportNeeds ?? []).filter(n => n !== need))} />{need}</label>)}</fieldset>
      {error && <p role="alert">{error}</p>}{saved && <p role="status">✓ Your profile is updated. New forms will use these details.</p>}<PrimaryButton type="submit">Save changes</PrimaryButton><ActionLink to="/">Cancel</ActionLink>
    </form>
  </Page>
}

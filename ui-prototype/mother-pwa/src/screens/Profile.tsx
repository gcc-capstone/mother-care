import { motherDemos } from '../data/mothers'
import { useState, type FormEvent } from 'react'
import { useMotherState } from '../hooks/useMotherState'
import { ActionLink, Page, PrimaryButton } from '../components/Page'

export default function Profile() {
  const { activeMotherId } = useMotherState()
  return <ProfileContent key={activeMotherId} />
}
function ProfileContent() {
  const { profile, setProfile, activeMotherId, selectMother, counselorName } = useMotherState()
  const [draft, setDraft] = useState(profile)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  function submit(e: FormEvent) {
    e.preventDefault()
    if (Object.values(draft).some(value => !value.trim())) { setError('Please fill in all profile fields.'); return }
    setProfile({ ...profile, firstName: draft.firstName.trim(), familyName: draft.familyName.trim(), email: draft.email.trim(), location: draft.location.trim() }); setSaved(true); setError('')
  }
  return <Page title="Your profile" back="/">
    <label className="flex flex-col gap-2 font-medium">Demo mother<select className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-white p-3" value={activeMotherId} onChange={e => selectMother(e.target.value)}>{motherDemos.map(d => <option key={d.profile.id} value={d.profile.id}>{d.profile.firstName} {d.profile.familyName}</option>)}</select></label>
    <p>Your counselor: {counselorName}</p><form className="flex flex-col gap-4 rounded-3xl bg-white p-5" onSubmit={submit}>
      {([{ key: 'firstName', label: 'First name' }, { key: 'familyName', label: 'Last name' }, { key: 'email', label: 'Email' }, { key: 'location', label: 'Location' }] as const).map(field => <label className="flex flex-col gap-2 font-medium" key={field.key}>{field.label}<input required maxLength={100} type={field.key === 'email' ? 'email' : 'text'} value={draft[field.key]} onChange={e => { setSaved(false); setDraft(prev => ({ ...prev, [field.key]: e.target.value })) }} className="min-h-11 rounded-xl border border-[var(--border)] p-3" /></label>)}
      {error && <p role="alert">{error}</p>}{saved && <p role="status">✓ Your profile is updated.</p>}<PrimaryButton type="submit">Save changes</PrimaryButton><ActionLink to="/">Cancel</ActionLink>
    </form>
  </Page>
}

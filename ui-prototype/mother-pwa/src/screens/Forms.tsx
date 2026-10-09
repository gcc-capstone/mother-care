import { Link } from 'react-router-dom'
import { assignedForms, intakeForm, otherForms, type FormItem } from '../data/forms'
import { Page } from '../components/Page'
import { useMotherState } from '../hooks/useMotherState'

function FormCard({ form, intake = false }: { form: FormItem; intake?: boolean }) {
  const { formResponses } = useMotherState()
  const complete = Boolean(formResponses[form.id])
  return <article className={`flex flex-col items-start gap-3 rounded-3xl p-[18px] ${intake ? 'border border-[var(--sage)] bg-[var(--sage-strip)]' : 'bg-white'}`}>
    {intake && <span className="rounded-full bg-[var(--ink)] px-2.5 py-1 text-[11px] font-semibold text-white">START HERE</span>}
    <h2 className="text-[17px] font-semibold text-[var(--ink)]">{form.title}</h2>
    <p className="text-sm">{form.description}</p>
    {form.prefill && <span className="rounded-full bg-[var(--sage-strip)] px-3 py-1 text-xs font-semibold text-[var(--ink)]">Profile details filled in for you</span>}
    <p className="text-[13px] text-[var(--muted)]">{complete ? '✓ Submitted' : form.meta}</p>
    <Link to={`/forms/${form.id}`} className={`inline-flex min-h-11 items-center justify-center rounded-full px-[18px] py-2.5 text-sm font-semibold ${intake ? 'w-full bg-[var(--ink)] text-white' : 'border border-[var(--ink)] text-[var(--ink)]'}`}>{complete ? 'Review form' : 'Fill out form'}</Link>
  </article>
}
export default function Forms() {
  return <Page title="Forms">
    <p className="text-[13px] text-[var(--muted)]">Review the details filled in from your profile, add your answers, and submit when you’re ready.</p>
    <FormCard form={intakeForm} intake />
    <section className="flex flex-col gap-2.5"><h2 className="text-lg font-semibold">Assigned to you</h2>{assignedForms.map(f => <FormCard key={f.id} form={f} />)}</section>
    <section className="flex flex-col gap-2.5"><h2 className="text-lg font-semibold">Other forms</h2>{otherForms.map(f => <FormCard key={f.id} form={f} />)}</section>
  </Page>
}

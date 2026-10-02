import './Forms.css'
import { assignedForms, intakeForm, otherForms, type FormItem } from '../data/forms'

// "Fill out form" buttons are inert: the prototype covers the five tab screens only.
function FormCard({ form, variant }: { form: FormItem; variant: 'assigned' | 'other' }) {
  return (
    <article className={`form-card form-card-${variant}`}>
      <h3 className="form-title">{form.title}</h3>
      <p className="form-desc">{form.description}</p>
      <p className="form-meta">{form.meta}</p>
      <button className="btn btn-outline">Fill out form</button>
    </article>
  )
}

export default function Forms() {
  return (
    <main className="screen forms">
      <header className="screen-head">
        <h1 className="text-heading">Forms</h1>
        <p className="text-caption">Fill these out to start building your profile</p>
      </header>

      <section className="intake-card">
        <span className="intake-badge">START HERE</span>
        <h2 className="intake-title">{intakeForm.title}</h2>
        <p className="form-desc">{intakeForm.description}</p>
        <button className="btn btn-primary">Fill out form</button>
      </section>

      <section className="section">
        <h2 className="text-subhead">Assigned to you</h2>
        {assignedForms.map((f) => (
          <FormCard key={f.id} form={f} variant="assigned" />
        ))}
      </section>

      <section className="section">
        <h2 className="text-subhead">Other forms</h2>
        {otherForms.map((f) => (
          <FormCard key={f.id} form={f} variant="other" />
        ))}
      </section>
    </main>
  )
}

import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'
import { Badge, Button, Empty, Field, MotherPicker, Page, Panel } from '../components/ui'
import WorkspaceTabs from '../components/WorkspaceTabs'
import { inputClass } from '../utils/uiClasses'
import { resolveDefault } from '../utils/formDefaults'
import type { CareForm, QuestionDefault } from '../types/domain'

const blankDefault: QuestionDefault = { source: '', value: '' }
export function FormLibrary() {
  const { forms, setForms } = useDemo()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const visible = forms.filter(f => f.title.toLowerCase().includes(search.trim().toLowerCase()))
  return <Page title="Forms" action={<Button onClick={() => navigate('/admin/form-builder/new')}>New form +</Button>}>
    <WorkspaceTabs section="forms" />
    <Panel title="Previous forms">
      <p className="text-muted">Edit a previous form or make a copy to start a new one. Published versions are available for assignment.</p>
      <Field label="Search previous forms"><input className={inputClass} type="search" value={search} onChange={e => setSearch(e.target.value)} /></Field>
      {visible.map(f => <article key={f.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-canvas p-4">
        <div className="space-y-2"><h3 className="font-semibold">{f.title}</h3><Badge>{f.published ? `Published · v${f.version}` : 'Draft'}</Badge><p className="text-sm text-muted">{f.questions.length} questions · {f.questionDefaults?.filter(d => d.source).length ?? 0} pre-populated responses</p></div>
        <div className="flex flex-wrap gap-2"><Button secondary onClick={() => navigate(`/admin/form-builder/${f.id}`)}>Edit</Button><Button secondary onClick={() => {
          const copy = { ...structuredClone(f), id: crypto.randomUUID(), title: `${f.title} (copy)`, version: 0, published: false }
          setForms(prev => [...prev, copy]); navigate(`/admin/form-builder/${copy.id}`)
        }}>Make a copy</Button><Button secondary onClick={() => setDeleting(f.id)}>Delete</Button></div>
        {deleting === f.id && <div className="w-full space-y-3"><p>Delete {f.title}? Existing assignments will be preserved.</p><Button onClick={() => { setForms(prev => prev.filter(item => item.id !== f.id)); setDeleting(null) }}>Confirm deletion</Button><Button secondary onClick={() => setDeleting(null)}>Cancel</Button></div>}
      </article>)}
      {!visible.length && <Empty>{forms.length ? 'No forms match your search.' : 'Create your first form to begin.'}</Empty>}
    </Panel>
  </Page>
}
export function FormEditor() {
  const { id } = useParams()
  return <EditorContent key={id} id={id} />
}
function EditorContent({ id }: { id: string | undefined }) {
  const { forms, setForms, mothers, selectedId } = useDemo()
  const navigate = useNavigate()
  const original = forms.find(f => f.id === id)
  const [draft, setDraft] = useState<CareForm>(() => original ? structuredClone(original) : {
    id: crypto.randomUUID(), title: '', version: 0, published: false, questions: [''], questionDefaults: [{ ...blankDefault }],
  })
  const [error, setError] = useState('')
  const mother = mothers.find(m => m.id === selectedId)
  if (id !== 'new' && !original) return <Page title="Form unavailable"><Link to="/admin/form-builder" className="text-accent underline">Back to previous forms</Link></Page>
  function update(change: Partial<CareForm>) { setDraft(prev => ({ ...prev, ...change, published: false })); setError('') }
  function updateDefault(index: number, setting: QuestionDefault) {
    update({ questionDefaults: draft.questions.map((_, i) => i === index ? setting : draft.questionDefaults?.[i] ?? { ...blankDefault }) })
  }
  function save(publish: boolean) {
    if (!draft.title.trim()) { setError('Give this form a title before saving.'); return }
    if (publish && (!draft.questions.length || draft.questions.some(q => !q.trim()))) { setError('Add at least one question and give every question a label before publishing.'); return }
    if (publish && draft.questionDefaults?.some(d => d.source === 'custom' && !d.value.trim())) { setError('Enter the pre-populated response for each question using a custom response.'); return }
    const saved = { ...draft, title: draft.title.trim(), questions: draft.questions.map(q => q.trim()), questionDefaults: draft.questionDefaults?.map(d => ({ ...d, value: d.value.trim() })), published: publish, version: publish ? (original?.version ?? 0) + 1 : draft.version }
    setForms(prev => original ? prev.map(f => f.id === original.id ? saved : f) : [...prev, saved])
    navigate('/admin/form-builder')
  }
  return <Page title={id === 'new' ? 'New form' : `Edit ${original?.title}`}>
    <WorkspaceTabs section="forms" />
    <Link to="/admin/form-builder" className="font-semibold text-accent underline">← Back to previous forms</Link>
    <p className="rounded-xl bg-sage p-4 text-accent">Each question can start with a response from the mother’s profile or text you provide. Mothers can review and change every pre-populated response.</p>
    <form onSubmit={(e: FormEvent) => { e.preventDefault(); save(true) }} className="space-y-5">
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
        <Panel title="Build your form">
          <Field label="Form title"><input className={inputClass} maxLength={150} value={draft.title} onChange={e => update({ title: e.target.value })} placeholder="For example: Monthly family check-in" /></Field>
          {draft.questions.map((question, i) => {
            const setting = draft.questionDefaults?.[i] ?? blankDefault
            return <fieldset key={i} className="space-y-4 rounded-xl border border-line p-4"><legend className="px-2 font-bold">Question {i + 1}</legend>
              <Field label="Question text"><input className={inputClass} maxLength={500} value={question} onChange={e => update({ questions: draft.questions.map((q, index) => index === i ? e.target.value : q) })} /></Field>
              <div className="space-y-3 rounded-lg bg-sage p-3"><Field label="Pre-populate this response"><select className={inputClass} value={setting.source} onChange={e => updateDefault(i, { source: e.target.value as QuestionDefault['source'], value: setting.value })}>
                <option value="">Leave blank for the mother</option><optgroup label="Use the mother’s profile"><option value="name">Full name</option><option value="county">County</option><option value="contact">Preferred contact method</option><option value="needs">Current support needs</option></optgroup><option value="custom">Use a response I provide</option>
              </select></Field>
                {setting.source === 'custom' && <Field label="Response to fill in"><textarea className={inputClass} rows={2} maxLength={2000} value={setting.value} onChange={e => updateDefault(i, { ...setting, value: e.target.value })} /></Field>}
                <p className="text-xs text-muted">{setting.source ? 'Filled in when the form is assigned. The mother can edit it before submitting.' : 'The mother starts with an empty response.'}</p>
              </div>
              <div className="flex gap-2"><Button secondary disabled={i === 0} aria-label={`Move question ${i + 1} up`} onClick={() => {
                const questions = [...draft.questions], defaults = draft.questions.map((_, index) => draft.questionDefaults?.[index] ?? { ...blankDefault })
                const previous = questions[i - 1]; questions[i - 1] = questions[i]; questions[i] = previous
                const previousDefault = defaults[i - 1]; defaults[i - 1] = defaults[i]; defaults[i] = previousDefault
                update({ questions, questionDefaults: defaults })
              }}>Move up</Button><Button secondary aria-label={`Remove question ${i + 1}`} onClick={() => update({ questions: draft.questions.filter((_, index) => index !== i), questionDefaults: draft.questions.flatMap((_, index) => index === i ? [] : [draft.questionDefaults?.[index] ?? { ...blankDefault }]) })}>Remove</Button></div>
            </fieldset>
          })}
          <Button secondary onClick={() => update({ questions: [...draft.questions, ''], questionDefaults: [...draft.questions.map((_, i) => draft.questionDefaults?.[i] ?? { ...blankDefault }), { ...blankDefault }] })}>Add question +</Button>
        </Panel>
        <Panel title="Mother’s form preview">
          <MotherPicker /><p className="text-sm text-muted">Sample responses for {mother?.name ?? 'the selected mother'}. Preview edits are not saved.</p>
          <h3 className="text-xl font-bold">{draft.title || 'Untitled form'}</h3>
          {draft.questions.map((q, i) => { const value = resolveDefault(draft.questionDefaults?.[i], mother); return <div key={`${i}-${selectedId}-${value}`} className="space-y-1"><Field label={q || `Question ${i + 1}`}><input className={inputClass} defaultValue={value} placeholder="Your response" /></Field>{draft.questionDefaults?.[i]?.source && <p className="text-xs text-accent">Pre-populated · editable before submission</p>}</div> })}
        </Panel>
      </div>
      {error && <p role="alert" className="text-red-800">{error}</p>}
      <div className="sticky bottom-0 flex flex-wrap gap-3 rounded-xl border border-line bg-white p-4 shadow-sm"><Button type="submit">Publish form</Button><Button secondary onClick={() => save(false)}>Save draft</Button><Button secondary onClick={() => navigate('/admin/form-builder')}>Cancel</Button></div>
      <p className="text-sm text-muted">Publishing creates a new version. Previously assigned forms keep their original questions and pre-populated responses.</p>
    </form>
  </Page>
}

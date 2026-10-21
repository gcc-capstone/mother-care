import { useEffect, useId, useRef } from 'react'
import { PrimaryButton } from './Page'
import type { ProfileChange } from '../utils/profileChanges'

export default function ProfileChangesDialog({ changes, fromForm = false, onDecline, onSave, onDismiss }: {
  changes: ProfileChange[]
  fromForm?: boolean
  onDecline: () => void
  onSave: () => void
  onDismiss: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current!
    dialog.showModal()
    return () => dialog.close()
  }, [])

  return <dialog ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId}
    onCancel={event => { event.preventDefault(); onDismiss() }}
    className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-[366px] overflow-y-auto rounded-3xl border-0 bg-white p-5 text-[var(--text)] shadow-xl backdrop:bg-black/40">
    <h2 id={titleId} className="text-xl font-semibold text-[var(--ink)]">We detected {changes.length === 1 ? `a change in your ${changes[0].label.toLowerCase()}` : 'changes to your information'}</h2>
    <p id={descriptionId} className="mt-3">{fromForm ? 'Choose whether to use these changes in future forms.' : `Would you like to save ${changes.length === 1 ? 'this change' : 'these changes'} to your profile?`}</p>
    <div className="my-5 flex flex-col gap-3">
      {changes.map(change => <section key={change.key} className="rounded-2xl border border-[var(--border)] p-4">
        <h3 className="font-semibold text-[var(--ink)]">{change.label}</h3>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="min-w-0"><dt className="text-[var(--muted)]">Before</dt><dd className="mt-1 whitespace-pre-wrap wrap-anywhere">{change.before || 'Not provided'}</dd></div>
          <div className="min-w-0"><dt className="text-[var(--muted)]">After</dt><dd className="mt-1 whitespace-pre-wrap font-medium wrap-anywhere">{change.after || 'Not provided'}</dd></div>
        </dl>
      </section>)}
    </div>
    {fromForm ? <>
      <p className="mb-4 text-sm text-[var(--muted)]">Either submission saves the edited details in this response. Updating your profile also uses them in future forms.</p>
      <div className="flex flex-col gap-3">
        <PrimaryButton onClick={onSave}>Submit and update profile</PrimaryButton>
        <button type="button" onClick={onDecline} className="min-h-11 w-full rounded-full border border-[var(--ink)] px-4 py-3 font-semibold text-[var(--ink)]">Submit without updating profile</button>
        <button type="button" onClick={onDismiss} className="min-h-11 w-full px-4 py-3 font-semibold text-[var(--ink)]">Back to form</button>
      </div>
    </> : <>
      <p className="mb-4 text-sm text-[var(--muted)]">Choose No to keep your current profile details.</p>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" autoFocus onClick={onDecline} className="min-h-11 rounded-full border border-[var(--ink)] px-4 py-3 font-semibold text-[var(--ink)]">No</button>
        <PrimaryButton onClick={onSave}>Save</PrimaryButton>
      </div>
    </>}
  </dialog>
}

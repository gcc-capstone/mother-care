import { useEffect, useId, useRef } from 'react'

export default function UnsavedChangesDialog({ onKeepEditing, onDiscard }: {
  onKeepEditing: () => void
  onDiscard: () => void
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
    onCancel={event => { event.preventDefault(); onKeepEditing() }}
    className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-[366px] rounded-3xl border-0 bg-white p-5 text-[var(--text)] shadow-xl backdrop:bg-black/40">
    <h2 id={titleId} className="text-xl font-semibold text-[var(--ink)]">Discard your unsent answers?</h2>
    <p id={descriptionId} className="mt-3 text-sm text-[var(--muted)]">Your changes to this form have not been submitted.</p>
    <div className="mt-5 flex flex-col gap-3">
      <button type="button" autoFocus onClick={onKeepEditing} className="min-h-11 w-full rounded-full bg-[var(--ink)] px-4 py-3 font-semibold text-white">Keep editing</button>
      <button type="button" onClick={onDiscard} className="min-h-11 w-full rounded-full border border-[var(--ink)] px-4 py-3 font-semibold text-[var(--ink)]">Discard answers</button>
    </div>
  </dialog>
}

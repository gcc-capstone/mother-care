import { useEffect, useRef } from 'react'
import { Button } from './ui'

export default function ConfirmDialog({
  title,
  onConfirm,
  onCancel,
}: {
  title: string
  onConfirm: () => void
  onCancel: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])
  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      className="m-auto w-[calc(100%_-_2rem)] max-w-md rounded-2xl border border-line bg-white p-6 text-ink shadow-xl backdrop:bg-black/40"
    >
      <h2 id="confirm-title" className="text-xl font-bold">
        {title}
      </h2>
      <p className="my-4 text-muted">
        This removes the goal and its linked follow-ups from this session.
      </p>
      <div className="flex justify-end gap-2">
        <Button secondary autoFocus onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Delete goal</Button>
      </div>
    </dialog>
  )
}

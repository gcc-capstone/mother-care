import { cloneElement, useId } from 'react'
import type { ReactNode, ReactElement, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../hooks/demoContext'

export function Button({
  children,
  secondary = false,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { secondary?: boolean }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${secondary ? 'border border-line bg-white text-accent hover:bg-sage' : 'bg-brand text-white hover:bg-accent'} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
export function Panel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="min-w-0 space-y-4 rounded-2xl border border-line bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </section>
  )
}
export function Page({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mx-auto min-w-0 max-w-[1600px] space-y-5 wrap-anywhere p-4 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent">
            CARE CONTINUITY
          </p>
          <h1 className="font-serif text-3xl font-bold">{title}</h1>
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}
export function Banner({ children }: { children: ReactNode }) {
  return <p className="rounded-lg bg-[#f3eedf] p-3 text-sm">{children}</p>
}
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-sage px-2.5 py-1 text-xs font-semibold text-accent">
      {children}
    </span>
  )
}
export function Empty({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-line p-6 text-center text-muted">
      {children}
    </p>
  )
}
export function Field({
  label,
  children,
}: {
  label: string
  children: ReactElement<{ id?: string }>
}) {
  const id = useId()
  return (
    <div className="flex min-w-0 flex-col gap-1.5 text-sm font-semibold">
      <label htmlFor={id}>{label}</label>
      {cloneElement(children, { id })}
    </div>
  )
}
export function Stats({
  items,
}: {
  items: { label: string; value: number | string; detail?: string }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-line bg-white p-4 shadow-sm"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            {item.label}
          </p>
          <p className="font-serif text-3xl font-bold">{item.value}</p>
          {item.detail && <p className="text-xs text-muted">{item.detail}</p>}
        </article>
      ))}
    </div>
  )
}
export function MotherPicker() {
  const { mothers, selectedId, setSelectedId } = useDemo()
  return (
    <Field label="Selected mother">
      <select
        className="rounded-lg border border-line bg-white p-2 font-normal"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {mothers.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} · {m.id}
          </option>
        ))}
      </select>
    </Field>
  )
}
export function CaseLinks() {
  return (
    <div className="flex flex-wrap gap-3 text-sm font-semibold text-accent">
      <Link className="underline" to="/admin/admingoals">
        Manage goals
      </Link>
      <Link className="underline" to="/admin/reccomendresources">
        Recommend resource
      </Link>
      <Link className="underline" to="/admin/forms">
        Assign form
      </Link>
      <Link className="underline" to="/admin/meetings">
        Log meeting
      </Link>
      <Link className="underline" to="/admin/followup">
        Review follow-ups
      </Link>
    </div>
  )
}
export function Pagination({
  page,
  total,
  size = 5,
  onChange,
}: {
  page: number
  total: number
  size?: number
  onChange: (page: number) => void
}) {
  const last = Math.max(0, Math.ceil(total / size) - 1)
  const current = Math.min(page, last)
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <span className="text-muted">
        {total
          ? `${current * size + 1}–${Math.min((current + 1) * size, total)} of ${total}`
          : '0 results'}
      </span>
      <div className="flex gap-2">
        <Button
          secondary
          disabled={current === 0}
          onClick={() => onChange(current - 1)}
        >
          Previous
        </Button>
        <Button
          secondary
          disabled={current === last}
          onClick={() => onChange(current + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

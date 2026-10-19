import { safeElementId } from './privacy.ts'
import type { SessionManager } from './sessionManager.ts'

export function captureInteraction(event: Event, manager: SessionManager) {
  if (!manager.currentSession) return
  // composedPath also supports clicks on nested SVGs and text nodes.
  const path = event.composedPath()
  if (path.some(node => node instanceof Element && node.hasAttribute('data-usability-exclude'))) return
  const target = path.find(node => node instanceof Element) as Element | undefined
  const control = target?.closest('button,a,input,select,textarea,summary,[role="button"],[role="link"]')
  if (!control || control.matches(':disabled, input[type="password"], input[type="hidden"]')) return
  if (event.type === 'change' && !control.matches('input,select,textarea')) return
  const tag = control.tagName.toLowerCase()
  const type = tag === 'button' || tag === 'a' || tag === 'input' || tag === 'select' || tag === 'textarea' || tag === 'summary' ? tag : `role-${control.getAttribute('role')}`
  // No value, textContent, innerText, aria-label, href, name, or ordinary DOM id is read.
  manager.interaction(event.type === 'change' ? 'change' : 'click', type, safeElementId(control.getAttribute('data-usability-id')))
}
const attached = new WeakMap<SessionManager, { target: Document; dispose: () => void; references: number }>()
export function attachEventTracker(target: Document, manager: SessionManager): () => void {
  let binding = attached.get(manager)
  if (!binding) {
    const listener = (event: Event) => captureInteraction(event, manager)
    target.addEventListener('click', listener, { capture: true })
    target.addEventListener('change', listener, { capture: true })
    binding = { target, references: 0, dispose: () => {
      target.removeEventListener('click', listener, { capture: true })
      target.removeEventListener('change', listener, { capture: true })
    } }
    attached.set(manager, binding)
  }
  const current = binding
  current.references++
  let disposed = false
  return () => {
    if (disposed) return
    disposed = true
    if (--current.references === 0) { current.dispose(); attached.delete(manager) }
  }
}

import assert from 'node:assert/strict'
import { test } from 'node:test'
import { SessionManager } from '../sessionManager.ts'
import { attachEventTracker, captureInteraction } from '../eventTracker.ts'

// Small DOM contract double; the browser smoke suite verifies actual DOM/React/Router behavior.
class FakeElement {
  tagName: string
  attrs: Record<string, string>
  parent: FakeElement | null
  constructor(tag: string, attrs: Record<string, string> = {}, parent: FakeElement | null = null) { this.tagName = tag.toUpperCase(); this.attrs = attrs; this.parent = parent }
  hasAttribute(name: string) { return name in this.attrs }
  getAttribute(name: string) { return this.attrs[name] ?? null }
  matches(selector: string) {
    return selector.split(',').some(part => part === this.tagName.toLowerCase() || (part.includes(':disabled') && this.hasAttribute('disabled')) || (part.includes('password') && this.attrs.type === 'password') || (part.includes('hidden') && this.attrs.type === 'hidden'))
  }
  closest() { return ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY'].includes(this.tagName) || this.attrs.role ? this : this.parent?.closest() ?? null }
  get textContent(): never { throw new Error('Must not read page text') }
  get value(): never { throw new Error('Must not read input values') }
}
Object.defineProperty(globalThis, 'Element', { value: FakeElement, configurable: true })
function event(type: string, ...path: FakeElement[]): Event { return { type, composedPath: () => path } as unknown as Event }
function clicks(manager: SessionManager) { return manager.currentSession!.events.filter(event => event.eventType === 'click') }

test('capture nested click, keyboard-generated click, changes, exclusions and no text/value access', () => {
  const manager = new SessionManager('mother-pwa', true)
  const button = new FakeElement('button', { 'data-usability-id': 'resource-filters', 'aria-label': 'private' })
  const svg = new FakeElement('svg', {}, button)
  captureInteraction(event('click', svg, button), manager) // recording disabled until session start
  manager.startSession('', true); manager.startTask('PWA-01')
  captureInteraction(event('click', svg, button), manager)
  captureInteraction(event('click', button), manager) // Browser keyboard activation also dispatches click.
  assert.equal(clicks(manager).length, 2); assert.equal(clicks(manager)[0].elementId, 'resource-filters')
  const panel = new FakeElement('aside', { 'data-usability-exclude': 'true' })
  captureInteraction(event('click', button, panel), manager)
  captureInteraction(event('click', new FakeElement('input', { type: 'password' })), manager)
  captureInteraction(event('click', new FakeElement('button', { disabled: '' })), manager)
  captureInteraction(event('click', new FakeElement('p')), manager)
  assert.equal(clicks(manager).length, 2)
  captureInteraction(event('change', new FakeElement('input', { 'data-usability-id': 'private-person', value: 'private-value' })), manager)
  const change = manager.currentSession!.events.at(-1)!
  assert.equal(change.eventType, 'change'); assert.equal(change.elementId, undefined)
  assert.ok(!JSON.stringify(manager.getSessions()).includes('private'))
})
test('listener attachment is idempotent and cleanup handles StrictMode replay', () => {
  const manager = new SessionManager('admin-web', true)
  manager.startSession('', true); manager.startTask('ADMIN-01')
  const target = new EventTarget() as Document
  const stopFirst = attachEventTracker(target, manager)
  const stopSecond = attachEventTracker(target, manager)
  const control = new FakeElement('button')
  const dispatch = () => { const click = new Event('click'); Object.defineProperty(click, 'composedPath', { value: () => [control] }); target.dispatchEvent(click) }
  dispatch(); assert.equal(clicks(manager).length, 1)
  stopFirst(); stopFirst(); dispatch(); assert.equal(clicks(manager).length, 2)
  stopSecond(); dispatch(); assert.equal(clicks(manager).length, 2)
  const stopThird = attachEventTracker(target, manager)
  dispatch(); assert.equal(clicks(manager).length, 3)
  stopThird(); dispatch(); assert.equal(clicks(manager).length, 3)
})

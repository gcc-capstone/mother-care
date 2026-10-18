import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getFormProfileUpdates, getProfileChanges } from '../src/utils/profileChanges.ts'
import type { Mother } from '../src/types/index.ts'

const profile: Mother = {
  id: 'test-mother', counselorId: 'test-counselor', firstName: 'Jan', familyName: 'Miller',
  email: 'jan@example.com', phone: '412-555-0104', location: 'Natrona Heights, PA 15065',
  householdSize: '2', childrenAges: '6 months', supportNeeds: ['Diapers', 'Childcare'],
}
const fields = {
  email: profile.email, phone: profile.phone!, location: profile.location,
  householdSize: profile.householdSize!, childrenAges: profile.childrenAges!,
  supportNeeds: 'Diapers, Childcare',
}

test('unchanged prefilled details do not need confirmation', () => {
  assert.deepEqual(getProfileChanges(profile, getFormProfileUpdates(profile, 'Jan Miller', fields, true)), [])
})

test('shows the saved and entered values for each changed contact field', () => {
  const updates = getFormProfileUpdates(profile, 'Jan Miller', { ...fields, phone: '724-555-0100', email: 'new@example.com' }, true)
  assert.deepEqual(getProfileChanges(profile, updates), [
    { key: 'email', label: 'Email', before: 'jan@example.com', after: 'new@example.com' },
    { key: 'phone', label: 'Phone number', before: '412-555-0104', after: '724-555-0100' },
  ])
  assert.equal(profile.phone, '412-555-0104')
  assert.equal(profile.email, 'jan@example.com')
  const saved = { ...profile, ...updates }
  assert.equal(saved.phone, '724-555-0100')
  assert.equal(saved.email, 'new@example.com')
  assert.equal(saved.counselorId, profile.counselorId)
})

test('detects additions and removals, including an empty phone number', () => {
  assert.deepEqual(getProfileChanges(profile, { phone: '', language: 'Spanish' }), [
    { key: 'phone', label: 'Phone number', before: '412-555-0104', after: '' },
    { key: 'language', label: 'Preferred language', before: '', after: 'Spanish' },
  ])
  assert.deepEqual(getProfileChanges(profile, { contactNotes: '' }), [])
})

test('ignores surrounding whitespace and reordered support needs', () => {
  const updates = getFormProfileUpdates(profile, '  Jan   Miller ', { ...fields, email: ' jan@example.com ', supportNeeds: 'Childcare, Diapers, Childcare' }, true)
  assert.deepEqual(getProfileChanges(profile, updates), [])
})

test('converts support needs into profile data and includes household changes', () => {
  const updates = getFormProfileUpdates(profile, 'Jan Miller', { ...fields, householdSize: '3', supportNeeds: 'Food, Transportation, ' }, true)
  assert.deepEqual(updates.supportNeeds, ['Food', 'Transportation'])
  assert.deepEqual(getProfileChanges(profile, updates).map(change => change.key), ['householdSize', 'supportNeeds'])
})

test('forms without prefilled fields never clear stored contact or household information', () => {
  assert.deepEqual(getFormProfileUpdates(profile, 'Jan Miller', {}, false), {})
  const updates = getFormProfileUpdates(profile, 'Jan Reed', {}, false)
  assert.deepEqual(getProfileChanges(profile, updates), [
    { key: 'familyName', label: 'Last name', before: 'Miller', after: 'Reed' },
  ])
  assert.equal({ ...profile, ...updates }.phone, profile.phone)
})

test('compares previously saved form values with the current profile', () => {
  const currentProfile = { ...profile, phone: '724-555-0100' }
  const updates = getFormProfileUpdates(currentProfile, 'Jan Miller', fields, true)
  assert.deepEqual(getProfileChanges(currentProfile, updates), [
    { key: 'phone', label: 'Phone number', before: '724-555-0100', after: '412-555-0104' },
  ])
})

import type { Mother } from '../types'

const profileLabels = {
  firstName: 'First name', familyName: 'Last name', email: 'Email', phone: 'Phone number',
  location: 'City, state & ZIP code', language: 'Preferred language',
  preferredContact: 'Preferred contact method', contactNotes: 'Contact instructions',
  householdSize: 'Household size', childrenAges: 'Children’s ages', dueDate: 'Expected due date',
  housing: 'Housing situation', transportation: 'Transportation', supportNeeds: 'Current support needs',
} as const

export interface ProfileChange {
  key: keyof typeof profileLabels
  label: string
  before: string
  after: string
}

export function getProfileChanges(profile: Mother, updates: Partial<Mother>): ProfileChange[] {
  return (Object.keys(profileLabels) as (keyof typeof profileLabels)[]).flatMap(key => {
    if (!(key in updates)) return []
    const before = profile[key]
    const after = updates[key]
    const display = (value: typeof before) => Array.isArray(value) ? value.map(item => item.trim()).filter(Boolean).join(', ') : value?.trim() ?? ''
    const normalize = (value: typeof before) => Array.isArray(value) ? [...new Set(value.map(item => item.trim()).filter(Boolean))].sort().join(', ') : display(value)
    return normalize(before) === normalize(after) ? [] : [{ key, label: profileLabels[key], before: display(before), after: display(after) }]
  })
}

export function getFormProfileUpdates(profile: Mother, name: string, fields: Record<string, string>, prefill: boolean): Partial<Mother> {
  const updates: Partial<Mother> = {}
  const trimmedName = name.trim().replace(/\s+/g, ' ')
  if (trimmedName !== `${profile.firstName} ${profile.familyName}`.trim().replace(/\s+/g, ' ')) {
    const [firstName, ...familyName] = trimmedName.split(' ')
    updates.firstName = firstName
    updates.familyName = familyName.join(' ')
  }
  if (prefill) {
    for (const key of ['email', 'phone', 'location', 'householdSize', 'childrenAges'] as const) {
      updates[key] = fields[key]?.trim() ?? ''
    }
    updates.supportNeeds = (fields.supportNeeds ?? '').split(',').map(need => need.trim()).filter(Boolean)
  }
  return updates
}

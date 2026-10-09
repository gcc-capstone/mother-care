import type { FormItem } from '../types'
export type { FormItem } from '../types'

export const intakeForm: FormItem = {
  id: 'family-intake', meta: 'Start here · About 5 minutes', title: 'Family Intake Form', prefill: true,
  description: 'Tell us about your household, current needs, and how we can support you.',
  questions: [{ key: 'priorities', label: 'What is your family’s biggest priority right now?', required: true }],
}
export const assignedForms: FormItem[] = [
  { id: 'monthly-check-in', title: 'Monthly Check-in', description: 'Share what has changed since your last visit and what support you need.', meta: 'Assigned by your counselor · Due Oct 10 · About 3 minutes',
    questions: [{ key: 'progress', label: 'What has been going well?', required: true }, { key: 'changes', label: 'Have your household or support needs changed?' }] },
  { id: 'support-plan', title: 'Family Support Plan', description: 'Choose a next step to work on with your counselor.', prefill: true, meta: 'Assigned by your counselor · Due Oct 15 · About 4 minutes',
    questions: [{ key: 'nextStep', label: 'What would you like to work on next?', required: true }, { key: 'targetDate', label: 'When would you like to take this step?', type: 'date' }] },
]
export const otherForms: FormItem[] = [
  { id: 'childcare-assistance', title: 'Childcare Assistance Request', description: 'Request help finding daycare or after-school care.', prefill: true, meta: 'Anytime · About 4 minutes',
    questions: [{ key: 'schedule', label: 'What days and hours do you need childcare?', required: true }, { key: 'startDate', label: 'When do you need care to start?', type: 'date' }] },
  { id: 'baby-supplies', title: 'Baby Supplies Request', description: 'Let your counselor know which supplies your family needs.', prefill: true, meta: 'Anytime · About 2 minutes',
    questions: [{ key: 'items', label: 'Which supplies do you need?', required: true }, { key: 'sizes', label: 'Diaper or clothing sizes, if known' }] },
  { id: 'transportation-help', title: 'Transportation Support', description: 'Request help getting to an appointment or resource pickup.', prefill: true, meta: 'Anytime · About 3 minutes',
    questions: [{ key: 'destination', label: 'Where do you need to go?', required: true }, { key: 'travelDate', label: 'Date of your trip', type: 'date', required: true }] },
  { id: 'contact-update', title: 'Contact & Household Update', description: 'Review your contact and household information before your next visit.', prefill: true, meta: 'Anytime · About 2 minutes',
    questions: [{ key: 'changed', label: 'What has changed since your last visit?' }] },
]

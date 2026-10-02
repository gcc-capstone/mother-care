// Hardcoded dummy data for the Forms screen. Copy comes from the Figma frame "02 Forms".

export const intakeForm = {
  title: 'Family Intake Form',
  description: 'Tell us about your family so we can match you with the right resources.',
}

export type FormItem = {
  id: string
  title: string
  description: string
  meta: string
}

export const assignedForms: FormItem[] = [
  {
    id: 'monthly-check-in',
    title: 'Monthly Check-in',
    description: 'How things have been going since your last visit.',
    meta: 'Assigned by Counselor  ·  Due Oct 10',
  },
]

export const otherForms: FormItem[] = [
  {
    id: 'childcare-assistance',
    title: 'Childcare Assistance Request',
    description: 'Apply for help with daycare or after-school care costs.',
    meta: 'Anytime',
  },
]

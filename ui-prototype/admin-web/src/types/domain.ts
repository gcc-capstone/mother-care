export interface Mother {
  id: string
  name: string
  county: string
  status: 'Stable' | 'Watch' | 'High' | 'New'
  counselor: string
  contact: string
  needs: string[]
  appointment: string
}
export interface Goal {
  id: string
  motherId: string
  title: string
  description: string
  category: string
  due: string
  recurrence: string
  reminder: string
  notes: string
  visible: boolean
  weeklyReview: boolean
  status: 'Active' | 'Completed'
}
export interface Resource {
  id: string
  name: string
  service: string
  county: string
  mode: 'Physical' | 'Digital'
  hours: string
  availability: 'Available' | 'Waitlist'
  address: string
}
export type Outcome = 'Successful' | 'Partially successful' | 'Could not access'
export interface FollowUp {
  id: string
  motherId: string
  title: string
  type: 'Goal' | 'Referral'
  due: string
  status: 'Awaiting outcome' | 'Scheduled' | 'Completed'
  feedback: string
  goalId?: string
  resourceId?: string
  message?: string
  priority?: string
  outcome?: Outcome
  notes?: string
  shared?: boolean
  loggedAt?: string
}
export interface ExportRecord {
  id: string
  title: string
  date: string
  county: string
  period: string
  format: string
}

export type DemoRole = 'Administrator' | 'Counselor'
export interface CareForm {
  id: string
  title: string
  version: number
  published: boolean
  questions: string[]
}
export interface FormAssignment {
  id: string
  motherId: string
  title: string
  version: number
  questions: string[]
  due: string
  status: 'Assigned' | 'Completed'
}
export interface Meeting {
  id: string
  motherId: string
  date: string
  type: string
  summary: string
  internalNotes: string
  author: string
  followUp: string
}

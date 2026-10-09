export interface Goal {
  id: string
  title: string
  source: string
  due?: string
  when: 'today' | 'week'
  done: boolean
  credits?: number
}
export interface FormItem {
  id: string
  title: string
  description: string
  meta: string
  prefill?: boolean
  questions?: { key: string; label: string; type?: 'text' | 'date'; required?: boolean }[]
}
export type Category = 'All' | 'Food' | 'Diapers' | 'Clothing' | 'Childcare'
export interface Resource {
  id: string
  name: string
  org: string
  logo?: string
  initials: string
  status: string
  isOpen: boolean
  distance: string
  provides: string
  categories: Category[]
  address: string
}
export interface Reward {
  id: string
  name: string
  cost: number
  image: string
}
export interface Opportunity {
  id: string
  title: string
  detail: string
  credits: number
  icon: string
  iconBg: string
  content: string
  action: string
}
export interface Mother {
  id: string
  counselorId: string
  firstName: string
  familyName: string
  email: string
  location: string
  phone?: string
  preferredContact?: string
  language?: string
  householdSize?: string
  childrenAges?: string
  dueDate?: string
  housing?: string
  transportation?: string
  supportNeeds?: string[]
  contactNotes?: string
}
export interface Notification {
  id: string
  title: string
  message: string
  to: string
  priority?: 'high' | 'standard'
}
export interface FormResponse {
  name: string
  notes: string
  fields?: Record<string, string>
  submittedAt?: string
}

export interface Counselor { id: string; name: string }
export interface MotherDemo {
  profile: Mother
  goals: Goal[]
  mood: string | null
  notifications: Notification[]
  completedOpportunities: string[]
  reservations: string[]
  redemptions: string[]
  formResponses: Record<string, FormResponse>
  openingCredits: number
  openingEarned: number
  streakDays: number
}

export interface ResourceReview {
  id: string
  motherId: string
  motherName: string
  resourceId: string
  resourceName: string
  outcome: 'Received support' | 'Some support' | 'Could not access' | 'Not visited yet'
  rating: string
  comments: string
  needsFollowUp: boolean
  submittedAt: string
}
export interface ResourceRecommendation {
  resourceId: string
  note: string
}

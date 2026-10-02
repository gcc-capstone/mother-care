import type { Counselor, MotherDemo } from '../types'
import { user } from './home'
import { initialGoals } from './goals'
import { initialNotifications } from './notifications'

export const counselors: Counselor[] = [
  { id: 'counselor-004', name: 'Carol Bennett' },
  { id: 'counselor-001', name: 'Alex Rivera' },
  { id: 'counselor-002', name: 'Dina Brooks' },
  { id: 'counselor-003', name: 'Sam Lee' },
]

// Fixed demo context: October 1, 2026. Each record owns its session state.
export const motherDemos: MotherDemo[] = [
  { profile: user, goals: initialGoals, mood: null, notifications: initialNotifications, completedOpportunities: [], reservations: [], redemptions: [], formResponses: {}, openingCredits: 12, openingEarned: 4, streakDays: 5 },
  ...([
    ['MC-2048', 'Jan', 'Williams', 'counselor-001', 18, 4, 'good'],
    ['MC-2049', 'Maria', 'Diaz', 'counselor-001', 8, 2, 'okay'],
    ['MC-2050', 'Nia', 'Simmons', 'counselor-002', 6, 1, 'low'],
    ['MC-2051', 'Keisha', 'Reed', 'counselor-003', 30, 6, 'great'],
    ['MC-2052', 'Amina', 'Khan', 'counselor-001', 0, 0, null],
  ] as const).map(([id, firstName, familyName, counselorId, openingCredits, streakDays, mood], index): MotherDemo => {
    const counselor = counselors.find(c => c.id === counselorId)!
    const completedOpportunities = index === 3 ? ['sleep-video', 'budgeting'] : []
    const name = `${firstName} ${familyName}`
    return {
      profile: { id, firstName, familyName, counselorId, email: `${firstName.toLowerCase()}.${familyName.toLowerCase()}@example.com`, location: id === 'MC-2050' ? 'Greensburg, PA 15601' : id === 'MC-2051' ? 'Butler, PA 16001' : 'Natrona Heights, PA 15065' },
      goals: [
        { id: 'log-mood', title: "Log how you're feeling", source: `From ${counselor.name}`, when: 'today', done: mood !== null },
        { id: 'sleep-video', title: 'Watch: Newborn Sleep Basics', source: `From ${counselor.name}`, when: 'today', done: completedOpportunities.includes('sleep-video'), credits: 2 },
        { id: 'walk', title: 'Take a short outdoor break', source: 'Added by you', when: 'today', done: index === 3 },
        { id: 'family-check-in', title: 'Complete monthly family check-in', source: `From ${counselor.name}`, when: 'week', due: index === 2 ? 'Overdue · Sep 30' : 'Due Oct 10', done: index === 3 },
        { id: 'parenting-group', title: 'Attend Tuesday parenting group', source: `From ${counselor.name}`, when: 'week', due: 'Due Oct 6', done: false },
      ],
      mood, completedOpportunities, reservations: index === 0 ? ['parenting-group'] : [], redemptions: [],
      formResponses: index === 4 ? {} : {
        'family-intake': { name, notes: index === 2 ? 'I would like help finding food assistance and affordable childcare for my family.' : 'I live with my child and would like support with baby supplies and family routines.' },
        ...(index === 3 ? { 'monthly-check-in': { name, notes: 'Our routines are going well. I would like to review childcare options at my next visit.' } } : {}),
      },
      notifications: index === 3 ? [] : [
        { id: `${id}-check-in`, title: index === 4 ? 'Welcome to MotherCare' : 'Your family check-in is ready', message: index === 4 ? 'Start with your family intake form so your counselor can learn about your needs.' : `${counselor.name} would like to hear how your family is doing.`, to: index === 4 ? '/forms/family-intake' : '/forms/monthly-check-in' },
        { id: `${id}-lesson`, title: 'Newborn Sleep Basics', message: 'A short lesson is available to help you plan a calm bedtime routine.', to: '/earn/sleep-video' },
      ],
      openingCredits, openingEarned: index === 3 ? 6 : 0, streakDays,
    }
  }),
]

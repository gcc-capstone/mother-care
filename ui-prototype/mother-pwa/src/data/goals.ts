import type { Goal } from '../types'
export type { Goal } from '../types'
// One shared set of goals for Jan, used on Home and Goals.
// Demo date: October 1, 2026; Carol assigned the upcoming group for October 6.

export const streakDays = 5

export const initialGoals: Goal[] = [
  { id: 'vitamin', title: 'Take prenatal vitamin', source: 'From Carol', when: 'today', done: true },
  { id: 'sleep-video', title: 'Watch: Newborn Sleep Basics', credits: 2, source: 'From Carol', when: 'today', done: false },
  { id: 'log-mood', title: "Log how you're feeling", source: 'From Carol', when: 'today', done: false },
  { id: 'walk', title: 'Go for a 10-minute walk', source: 'Added by you', when: 'today', done: true },
  {
    id: 'parenting-group',
    title: 'Attend Tuesday parenting group',
    source: 'From Carol',
    due: 'Due Oct 6',
    when: 'week',
    done: false,
  },
  { id: 'checkup', title: 'Schedule 6-month checkup', source: 'Added by you', when: 'week', done: false },
]

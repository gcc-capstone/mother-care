// Hardcoded dummy data for the Goals screen. Copy comes from the Figma frame "05 Goals".
// The two completed goals aren't shown in the frame (it only says "Completed today (2)"),
// so they are made up to match that count.

export type Goal = {
  id: string
  title: string
  source: string
  due?: string
  when: 'today' | 'week'
  done: boolean
}

export const streakDays = 5

export const initialGoals: Goal[] = [
  { id: 'vitamin', title: 'Take prenatal vitamin', source: 'From Carol', when: 'today', done: false },
  { id: 'sleep-video', title: 'Watch: Newborn Sleep Basics', source: 'From Carol', when: 'today', done: false },
  { id: 'log-mood', title: "Log how you're feeling", source: 'From Carol', when: 'today', done: true },
  { id: 'walk', title: 'Go for a 10-minute walk', source: 'Added by you', when: 'today', done: true },
  {
    id: 'parenting-group',
    title: 'Attend Tuesday parenting group',
    source: 'From Carol',
    due: 'Due Oct 7',
    when: 'week',
    done: false,
  },
  { id: 'checkup', title: 'Schedule 6-month checkup', source: 'Added by you', when: 'week', done: false },
]

// Hardcoded dummy data for the Home screen. Copy comes from the Figma frame "01 Home".
import diaperBankImage from '../assets/images/diaper-bank.png'
import newMomBasicsImage from '../assets/images/new-mom-basics.png'
import roughIcon from '../assets/icons/mood-rough.svg'
import lowIcon from '../assets/icons/mood-low.svg'
import okayIcon from '../assets/icons/mood-okay.svg'
import goodIcon from '../assets/icons/mood-good.svg'
import greatIcon from '../assets/icons/mood-great.svg'

export const user = {
  firstName: 'Jan',
  credits: 12,
  unreadNotifications: 2,
}

export const today = 'Wednesday, September 23'

export const moods = [
  { id: 'rough', label: 'Rough', icon: roughIcon, color: 'var(--mood-rough)' },
  { id: 'low', label: 'Low', icon: lowIcon, color: 'var(--mood-low)' },
  { id: 'okay', label: 'Okay', icon: okayIcon, color: 'var(--mood-okay)' },
  { id: 'good', label: 'Good', icon: goodIcon, color: 'var(--mood-good)' },
  { id: 'great', label: 'Great', icon: greatIcon, color: 'var(--mood-great)' },
]

export type Goal = {
  id: string
  title: string
  credits?: number
  done: boolean
}

export const todaysGoals: Goal[] = [
  { id: 'vitamin', title: 'Take prenatal vitamin', done: true },
  { id: 'sleep-video', title: 'Watch: Newborn Sleep Basics', credits: 2, done: false },
  { id: 'log-mood', title: "Log how you're feeling", done: false },
]

export const recommended = [
  {
    id: 'diaper-bank',
    title: 'Western PA Diaper Bank',
    detail: '2.3 mi  ·  Open until 5pm',
    image: diaperBankImage,
    to: '/resources',
  },
  {
    id: 'new-mom-basics',
    title: 'New Mom Basics',
    detail: '6 short videos  ·  +6',
    image: newMomBasicsImage,
    to: '/earn',
  },
]

import type { Mother } from '../types'
// Hardcoded dummy data for the Home screen. Copy comes from the Figma frame "01 Home".
import diaperBankImage from '../assets/images/diaper-bank.png'
import newMomBasicsImage from '../assets/images/new-mom-basics.png'
import roughIcon from '../assets/icons/mood-rough.svg'
import lowIcon from '../assets/icons/mood-low.svg'
import okayIcon from '../assets/icons/mood-okay.svg'
import goodIcon from '../assets/icons/mood-good.svg'
import greatIcon from '../assets/icons/mood-great.svg'

export const user: Mother = {
  firstName: 'Jan',
  familyName: 'Miller',
  email: 'jan.miller@example.com',
  location: 'Natrona Heights, PA 15065',
}

export const today = 'Thursday, October 1, 2026'

export const moods = [
  { id: 'rough', label: 'Rough', icon: roughIcon, color: 'bg-[var(--mood-rough)]' },
  { id: 'low', label: 'Low', icon: lowIcon, color: 'bg-[var(--mood-low)]' },
  { id: 'okay', label: 'Okay', icon: okayIcon, color: 'bg-[var(--mood-okay)]' },
  { id: 'good', label: 'Good', icon: goodIcon, color: 'bg-[var(--mood-good)]' },
  { id: 'great', label: 'Great', icon: greatIcon, color: 'bg-[var(--mood-great)]' },
]

export const recommended = [
  {
    id: 'diaper-bank',
    title: 'Western PA Diaper Bank',
    detail: '2.3 mi  ·  Open until 5pm',
    image: diaperBankImage,
    to: '/resources/diaper-bank',
  },
  {
    id: 'new-mom-basics',
    title: 'Newborn Sleep Basics',
    detail: '5 minute lesson  ·  +2 credits',
    image: newMomBasicsImage,
    to: '/earn/sleep-video',
  },
]

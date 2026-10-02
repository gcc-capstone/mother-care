// Hardcoded dummy data for the Earn screen. Copy comes from the Figma frame "04 Earn".
import diapersImage from '../assets/images/diapers.png'
import wipesImage from '../assets/images/baby-wipes.png'
import formulaImage from '../assets/images/formula.png'
import playIcon from '../assets/icons/play.svg'
import peopleIcon from '../assets/icons/people.svg'
import bookIcon from '../assets/icons/book.svg'

export const balance = {
  credits: 12,
  earnedThisWeek: 4,
}

export const storeItems = [
  { id: 'diapers', name: 'Diapers, size 2', cost: 12, image: diapersImage },
  { id: 'wipes', name: 'Baby wipes', cost: 6, image: wipesImage },
  { id: 'formula', name: 'Formula tin', cost: 26, image: formulaImage },
]

export const opportunities = [
  {
    id: 'sleep-video',
    title: 'Newborn Sleep Basics',
    detail: 'Video  ·  5 min',
    credits: 2,
    icon: playIcon,
    iconBg: 'var(--sage-strip)',
  },
  {
    id: 'parenting-group',
    title: 'Tuesday parenting group',
    detail: 'In person  ·  Grove City office',
    credits: 5,
    icon: peopleIcon,
    iconBg: 'var(--mood-low)',
  },
  {
    id: 'budgeting',
    title: 'Budgeting for baby',
    detail: 'Article  ·  4 min read',
    credits: 1,
    icon: bookIcon,
    iconBg: 'var(--mood-okay)',
  },
]

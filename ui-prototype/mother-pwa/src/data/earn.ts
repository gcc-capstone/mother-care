import type { Reward, Opportunity } from '../types'
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

export const storeItems: Reward[] = [
  { id: 'diapers', name: 'Diapers, size 2', cost: 12, image: diapersImage },
  { id: 'wipes', name: 'Baby wipes', cost: 6, image: wipesImage },
  { id: 'formula', name: 'Formula tin', cost: 26, image: formulaImage },
]

export const opportunities: Opportunity[] = [
  {
    id: 'sleep-video',
    content: 'Create a calm bedtime routine. Place your baby on their back for every sleep, on a firm, flat sleep surface with a fitted sheet. Keep pillows, toys, and loose blankets out of the sleep space. Talk with Carol about any questions at your next visit.',
    action: 'Mark lesson complete',
    title: 'Newborn Sleep Basics',
    detail: 'Video  ·  5 min',
    credits: 2,
    icon: playIcon,
    iconBg: 'bg-[var(--sage-strip)]',
  },
  {
    id: 'parenting-group',
    content: 'Join Carol and other local parents on Tuesday, October 6, from 10–11am at the Grove City office. Bring your questions about routines and childcare. Children are welcome. Reserve a place now; attendance credits can be recorded after the group.',
    action: 'Reserve my place',
    title: 'Tuesday parenting group',
    detail: 'In person  ·  Grove City office',
    credits: 5,
    icon: peopleIcon,
    iconBg: 'bg-[var(--mood-low)]',
  },
  {
    id: 'budgeting',
    content: 'List your monthly essentials: housing, utilities, food, transport, and baby supplies. Set aside a small amount for unexpected needs when possible. Compare your plan with your available income and ask Carol about local assistance programs.',
    action: 'Mark article complete',
    title: 'Budgeting for baby',
    detail: 'Article  ·  4 min read',
    credits: 1,
    icon: bookIcon,
    iconBg: 'bg-[var(--mood-okay)]',
  },
]

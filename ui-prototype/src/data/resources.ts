// Hardcoded dummy data for the Resources screen. Copy comes from the Figma frame "03 Resources".
import sparrowsNestLogo from '../assets/images/sparrows-nest-logo.png'

export const location = 'Natrona Heights, PA 15065'

export const categories = ['All', 'Food', 'Diapers', 'Clothing', 'Childcare'] as const
export type Category = (typeof categories)[number]

export type Resource = {
  id: string
  name: string
  org: string
  logo?: string
  initials: string
  status: string
  isOpen: boolean
  distance: string
  rating: 'Very good' | 'Good'
  provides: string
  categories: Category[]
  address: string
}

export const resources: Resource[] = [
  {
    id: 'sparrows-nest',
    name: "The Sparrow's Nest",
    org: 'Allegheny Valley Assoc. of Churches',
    logo: sparrowsNestLogo,
    initials: 'SN',
    status: 'Open until 4pm',
    isOpen: true,
    distance: '0.2 mi',
    rating: 'Very good',
    provides: 'Provides:  Clothing  ·  Wednesdays 1–4pm',
    categories: ['Clothing'],
    address: '1917 Freeport Rd, Natrona Heights, PA',
  },
  {
    id: 'emergency-assistance',
    name: 'Emergency Assistance',
    org: 'Allegheny Valley Assoc. of Churches',
    initials: 'AV',
    status: 'Hours vary',
    isOpen: false,
    distance: '0.3 mi',
    rating: 'Good',
    provides: 'Provides:  Rent & utility help, food, vouchers',
    categories: ['Food'],
    address: '1913 Freeport Rd, Natrona Heights, PA',
  },
]

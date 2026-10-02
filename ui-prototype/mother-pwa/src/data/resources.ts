import type { Resource } from '../types'
export type { Resource } from '../types'
// Hardcoded dummy data for the Resources screen. Copy comes from the Figma frame "03 Resources".
import sparrowsNestLogo from '../assets/images/sparrows-nest-logo.png'

export const location = 'Natrona Heights, PA 15065'

export const categories = ['All', 'Food', 'Diapers', 'Clothing', 'Childcare'] as const
export type { Category } from '../types'


export const resources: Resource[] = [
  { id: 'diaper-bank', name: 'Western PA Diaper Bank', org: 'Community diaper support', initials: 'DB', status: 'Open until 5pm', isOpen: true, distance: '2.3 mi', rating: 'Very good', provides: 'Provides: Diapers and wipes through local distribution partners', categories: ['Diapers'], address: 'Allegheny Valley community pickup location' },
  { id: 'childcare-support', name: 'Family Childcare Support', org: 'Valley Family Center', initials: 'FC', status: 'By appointment', isOpen: false, distance: '1.4 mi', rating: 'Good', provides: 'Provides: Childcare referrals and assistance with applications', categories: ['Childcare'], address: 'Community support office, Natrona Heights, PA' },
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

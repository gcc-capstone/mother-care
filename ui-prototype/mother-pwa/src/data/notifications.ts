import type { Notification } from '../types'
export const initialNotifications: Notification[] = [
  { id: 'check-in', priority: 'high', title: 'Your monthly check-in is ready', message: 'Carol assigned your check-in form. Please complete it by October 10.', to: '/forms/monthly-check-in' },
  { id: 'sleep', title: 'A new lesson for you', message: 'Newborn Sleep Basics is ready. Complete the lesson to earn 2 credits.', to: '/earn/sleep-video' },
]

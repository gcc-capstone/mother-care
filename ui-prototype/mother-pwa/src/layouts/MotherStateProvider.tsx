import { useState, type ReactNode } from 'react'
import { MotherContext } from '../hooks/useMotherState'
import { initialGoals } from '../data/goals'
import { user } from '../data/home'
import { balance, opportunities, storeItems } from '../data/earn'
import { initialNotifications } from '../data/notifications'
import type { FormResponse } from '../types'

export default function MotherStateProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState(initialGoals)
  const [mood, setMood] = useState<string | null>(null)
  const [profile, setProfile] = useState(user)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [completedOpportunities, setCompletedOpportunities] = useState<string[]>([])
  const [reservations, setReservations] = useState<string[]>([])
  const [redemptions, setRedemptions] = useState<string[]>([])
  const [formResponses, setFormResponses] = useState<Record<string, FormResponse>>({})
  // A lesson and its assigned goal represent the same credit award.
  const earnedIds = new Set(completedOpportunities)
  const extraCredits = opportunities.filter(o => earnedIds.has(o.id) && o.id !== 'parenting-group').reduce((sum, o) => sum + o.credits, 0)
  const spent = redemptions.reduce((sum, id) => sum + (storeItems.find(item => item.id === id)?.cost ?? 0), 0)
  const credits = balance.credits + extraCredits - spent
  function completeOpportunity(id: string) {
    if (!opportunities.some(o => o.id === id && o.id !== 'parenting-group')) return
    setCompletedOpportunities(prev => prev.includes(id) ? prev : [...prev, id])
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: true } : g))
  }
  function reserve(id: string) {
    setReservations(prev => prev.includes(id) ? prev : [...prev, id])
  }
  function redeem(id: string) {
    const reward = storeItems.find(item => item.id === id)
    if (!reward || reward.cost > credits || redemptions.includes(id)) return false
    setRedemptions(prev => prev.includes(id) ? prev : [...prev, id])
    return true
  }
  return <MotherContext.Provider value={{ goals, setGoals, mood, setMood, profile, setProfile, notifications, setNotifications, credits, earned: balance.earnedThisWeek + extraCredits, completedOpportunities, reservations, redemptions, completeOpportunity, reserve, redeem, formResponses, setFormResponses }}>{children}</MotherContext.Provider>
}

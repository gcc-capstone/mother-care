import { useState, type ReactNode } from 'react'
import { MotherContext } from '../hooks/useMotherState'
import { opportunities, storeItems } from '../data/earn'
import { motherDemos, counselors } from '../data/mothers'
import type { Dispatch, SetStateAction } from 'react'
import type { MotherDemo } from '../types'

export default function MotherStateProvider({ children }: { children: ReactNode }) {
  const [activeMotherId, setActiveMotherId] = useState(motherDemos[0].profile.id)
  const [sessions, setSessions] = useState<Record<string, MotherDemo>>(() => Object.fromEntries(motherDemos.map(demo => [demo.profile.id, structuredClone(demo)])))
  const session = sessions[activeMotherId]
  function setter<K extends keyof MotherDemo>(key: K): Dispatch<SetStateAction<MotherDemo[K]>> {
    return value => setSessions(prev => {
      const current = prev[activeMotherId]
      const next = typeof value === 'function' ? (value as (old: MotherDemo[K]) => MotherDemo[K])(current[key]) : value
      return { ...prev, [activeMotherId]: { ...current, [key]: next } }
    })
  }
  const { goals, mood, profile, notifications, completedOpportunities, reservations, redemptions, formResponses } = session
  const setGoals = setter('goals'), setMood = setter('mood'), setProfile = setter('profile'), setNotifications = setter('notifications'), setFormResponses = setter('formResponses')
  const setCompletedOpportunities = setter('completedOpportunities'), setReservations = setter('reservations'), setRedemptions = setter('redemptions')
  const counselorName = counselors.find(c => c.id === profile.counselorId)?.name ?? 'Your counselor'
  function selectMother(id: string) { if (sessions[id]) setActiveMotherId(id) }
  // A lesson and its assigned goal represent the same credit award.
  const earnedIds = new Set(completedOpportunities)
  const extraCredits = opportunities.filter(o => earnedIds.has(o.id) && !motherDemos.find(d => d.profile.id === activeMotherId)!.completedOpportunities.includes(o.id) && o.id !== 'parenting-group').reduce((sum, o) => sum + o.credits, 0)
  const spent = redemptions.reduce((sum, id) => sum + (storeItems.find(item => item.id === id)?.cost ?? 0), 0)
  const credits = session.openingCredits + extraCredits - spent
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
  return <MotherContext.Provider value={{ activeMotherId, selectMother, counselorName, streakDays: session.streakDays, goals, setGoals, mood, setMood, profile, setProfile, notifications, setNotifications, credits, earned: session.openingEarned + extraCredits, completedOpportunities, reservations, redemptions, completeOpportunity, reserve, redeem, formResponses, setFormResponses }}>{children}</MotherContext.Provider>
}

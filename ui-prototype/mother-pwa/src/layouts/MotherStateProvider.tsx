import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { MotherContext } from '../hooks/useMotherState'
import { opportunities, storeItems } from '../data/earn'
import { motherDemos, counselors } from '../data/mothers'
import type { Dispatch, SetStateAction } from 'react'
import type { MotherDemo, ResourceReview, ResourceRecommendation } from '../types'

type Session = MotherDemo & {
  resourceReviews: ResourceReview[]
  recommendations: ResourceRecommendation[]
  recentlyViewed: string[]
  recentSearches: string[]
}
function loadReviews(): ResourceReview[] {
  try { const stored: unknown = JSON.parse(localStorage.getItem('mothercare-private-reviews') ?? '[]'); return Array.isArray(stored) ? stored.filter((r): r is ResourceReview => r && typeof r.id === 'string' && typeof r.motherId === 'string' && typeof r.resourceId === 'string' && typeof r.comments === 'string') : [] } catch { return [] }
}
export default function MotherStateProvider({ children }: { children: ReactNode }) {
  const [activeMotherId, setActiveMotherId] = useState(motherDemos[0].profile.id)
  const [sessions, setSessions] = useState<Record<string, Session>>(() => Object.fromEntries(motherDemos.map(demo => [demo.profile.id, {
    ...structuredClone(demo), resourceReviews: loadReviews().filter(r => r.motherId === demo.profile.id), recentlyViewed: [], recentSearches: [],
    recommendations: [
      { resourceId: 'diaper-bank', note: 'A place to start for diapers and wipes. I can help you arrange pickup.' },
      { resourceId: 'childcare-support', note: 'We can explore childcare options together at your next check-in.' },
    ],
  }])))
  const session = sessions[activeMotherId]
  function setter<K extends keyof Session>(key: K): Dispatch<SetStateAction<Session[K]>> {
    return value => setSessions(prev => {
      const current = prev[activeMotherId]
      const next = typeof value === 'function' ? (value as (old: Session[K]) => Session[K])(current[key]) : value
      return { ...prev, [activeMotherId]: { ...current, [key]: next } }
    })
  }
  const { goals, mood, profile, notifications, completedOpportunities, reservations, redemptions, formResponses } = session
  const setGoals = setter('goals'), setMood = setter('mood'), setProfile = setter('profile'), setNotifications = setter('notifications'), setFormResponses = setter('formResponses')
  const setCompletedOpportunities = setter('completedOpportunities'), setReservations = setter('reservations'), setRedemptions = setter('redemptions')
  const setResourceReviews = setter('resourceReviews')
  const [feedbackStorageError, setFeedbackStorageError] = useState(false)
  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      try {
        localStorage.setItem('mothercare-private-reviews', JSON.stringify(Object.values(sessions).flatMap(s => s.resourceReviews)))
        setFeedbackStorageError(false)
      } catch { setFeedbackStorageError(true) }
    })
    return () => { cancelled = true }
  }, [sessions])
  const recordResourceView = useCallback((id: string) => {
    setSessions(prev => {
      const current = prev[activeMotherId]
      if (current.recentlyViewed[0] === id) return prev
      return { ...prev, [activeMotherId]: { ...current, recentlyViewed: [id, ...current.recentlyViewed.filter(item => item !== id)].slice(0, 5) } }
    })
  }, [activeMotherId])
  const recordSearch = useCallback((query: string) => {
    const text = query.trim().slice(0, 100)
    if (!text) return
    setSessions(prev => {
      const current = prev[activeMotherId]
      if (current.recentSearches[0] === text) return prev
      return { ...prev, [activeMotherId]: { ...current, recentSearches: [text, ...current.recentSearches.filter(item => item.toLowerCase() !== text.toLowerCase())].slice(0, 5) } }
    })
  }, [activeMotherId])
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
  return <MotherContext.Provider value={{ feedbackStorageError, resourceReviews: session.resourceReviews, setResourceReviews, recommendations: session.recommendations, recentlyViewed: session.recentlyViewed, recentSearches: session.recentSearches, recordResourceView, recordSearch, activeMotherId, selectMother, counselorName, streakDays: session.streakDays, goals, setGoals, mood, setMood, profile, setProfile, notifications, setNotifications, credits, earned: session.openingEarned + extraCredits, completedOpportunities, reservations, redemptions, completeOpportunity, reserve, redeem, formResponses, setFormResponses }}>{children}</MotherContext.Provider>
}

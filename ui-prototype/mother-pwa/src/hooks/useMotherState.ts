import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { FormResponse, Goal, Mother, Notification } from '../types'
export interface MotherState {
  activeMotherId: string; selectMother: (id: string) => void
  counselorName: string; streakDays: number
  goals: Goal[]; setGoals: Dispatch<SetStateAction<Goal[]>>
  mood: string | null; setMood: Dispatch<SetStateAction<string | null>>
  profile: Mother; setProfile: Dispatch<SetStateAction<Mother>>
  notifications: Notification[]; setNotifications: Dispatch<SetStateAction<Notification[]>>
  credits: number; earned: number
  completedOpportunities: string[]; reservations: string[]; redemptions: string[]
  completeOpportunity: (id: string) => void
  reserve: (id: string) => void
  redeem: (id: string) => boolean
  formResponses: Record<string, FormResponse>
  setFormResponses: Dispatch<SetStateAction<Record<string, FormResponse>>>
}
export const MotherContext = createContext<MotherState | null>(null)
export function useMotherState() {
  const state = useContext(MotherContext)
  if (!state) throw new Error('Mother state requires the app provider')
  return state
}

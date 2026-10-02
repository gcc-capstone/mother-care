import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type {
  Mother,
  Goal,
  FollowUp,
  ExportRecord,
  Resource,
  DemoRole,
  CareForm,
  FormAssignment,
  Meeting,
} from '../types/domain'
export interface DemoState {
  groups: { id: string; name: string; counselor: string; motherIds: string[] }[]
  setGroups: Dispatch<
    SetStateAction<
      { id: string; name: string; counselor: string; motherIds: string[] }[]
    >
  >
  role: DemoRole
  setRole: Dispatch<SetStateAction<DemoRole>>
  resources: Resource[]
  setResources: Dispatch<SetStateAction<Resource[]>>
  forms: CareForm[]
  setForms: Dispatch<SetStateAction<CareForm[]>>
  assignments: FormAssignment[]
  setAssignments: Dispatch<SetStateAction<FormAssignment[]>>
  meetings: Meeting[]
  setMeetings: Dispatch<SetStateAction<Meeting[]>>
  mothers: Mother[]
  setMothers: Dispatch<SetStateAction<Mother[]>>
  goals: Goal[]
  setGoals: Dispatch<SetStateAction<Goal[]>>
  followUps: FollowUp[]
  setFollowUps: Dispatch<SetStateAction<FollowUp[]>>
  exports: ExportRecord[]
  setExports: Dispatch<SetStateAction<ExportRecord[]>>
  selectedId: string
  setSelectedId: Dispatch<SetStateAction<string>>
}
export const DemoContext = createContext<DemoState | null>(null)
export function useDemo() {
  const state = useContext(DemoContext)
  if (!state) throw new Error('Demo state must be used inside DemoProvider')
  return state
}

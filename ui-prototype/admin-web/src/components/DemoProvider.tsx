import { useState } from 'react'
import type { ReactNode } from 'react'
import type { DemoRole } from '../types/domain'
import { DemoContext } from '../hooks/demoContext'
import {
  mockGroups,
  mockForms,
  mockAssignments,
  mockMeetings,
  mockResources,
  mockMothers,
  mockGoals,
  mockFollowUps,
  mockExports,
} from '../data/mockData'
export default function DemoProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState(mockGroups)
  const [role, setRole] = useState<DemoRole>('Administrator')
  const [resources, setResources] = useState(mockResources)
  const [forms, setForms] = useState(mockForms)
  const [assignments, setAssignments] = useState(mockAssignments)
  const [meetings, setMeetings] = useState(mockMeetings)
  const [mothers, setMothers] = useState(mockMothers)
  const [goals, setGoals] = useState(mockGoals)
  const [followUps, setFollowUps] = useState(mockFollowUps)
  const [exports, setExports] = useState(mockExports)
  const [selectedId, setSelectedId] = useState(mockMothers[0].id)
  return (
    <DemoContext.Provider
      value={{
        groups,
        setGroups,
        role,
        setRole,
        resources,
        setResources,
        forms,
        setForms,
        assignments,
        setAssignments,
        meetings,
        setMeetings,
        mothers,
        setMothers,
        goals,
        setGoals,
        followUps,
        setFollowUps,
        exports,
        setExports,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

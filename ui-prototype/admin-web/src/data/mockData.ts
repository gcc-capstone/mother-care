import type {
  Mother,
  Goal,
  Resource,
  FollowUp,
  ExportRecord,
  CareForm,
  FormAssignment,
  Meeting,
  Counselor,
  CareGroup,
} from '../types/domain'
export const demoToday = '2026-10-01'
export const mockCounselors: Counselor[] = [
  {
    id: 'counselor-001',
    name: 'Alex Rivera',
    focus: 'Prenatal care and family intake',
    counties: ['Allegheny'],
  },
  {
    id: 'counselor-002',
    name: 'Dina Brooks',
    focus: 'Childcare and transportation coordination',
    counties: ['Westmoreland'],
  },
  {
    id: 'counselor-003',
    name: 'Sam Lee',
    focus: 'Housing and parenting support',
    counties: ['Butler', 'Beaver'],
  },
]
export const counselors = mockCounselors.map((c) => c.name)
export const mockMothers: Mother[] = [
  {
    id: 'MC-2048',
    name: 'Jan Williams',
    county: 'Allegheny',
    status: 'Stable',
    counselor: 'Alex Rivera',
    contact: 'Mother Client App',
    needs: ['Housing', 'Interview clothing', 'Prenatal care'],
    appointment: '2026-10-03T14:00',
  },
  {
    id: 'MC-2049',
    name: 'Maria Diaz',
    county: 'Allegheny',
    status: 'Watch',
    counselor: 'Alex Rivera',
    contact: 'Phone',
    needs: ['Nutrition support'],
    appointment: '2026-10-01T11:00',
  },
  {
    id: 'MC-2050',
    name: 'Nia Simmons',
    county: 'Westmoreland',
    status: 'High',
    counselor: 'Dina Brooks',
    contact: 'Mother Client App',
    needs: ['Childcare', 'Transportation'],
    appointment: '2026-10-04T09:00',
  },
  {
    id: 'MC-2051',
    name: 'Keisha Reed',
    county: 'Butler',
    status: 'Stable',
    counselor: 'Sam Lee',
    contact: 'Phone',
    needs: ['Parenting support'],
    appointment: '2026-10-08T13:00',
  },
  {
    id: 'MC-2052',
    name: 'Amina Khan',
    county: 'Allegheny',
    status: 'New',
    counselor: 'Alex Rivera',
    contact: 'Mother Client App',
    needs: ['Intake support'],
    appointment: '2026-10-02T15:00',
  },
  {
    id: 'MC-2053',
    name: 'Elena Perez',
    county: 'Beaver',
    status: 'Watch',
    counselor: 'Sam Lee',
    contact: 'Phone',
    needs: ['Housing'],
    appointment: '2026-10-05T10:00',
  },
]
const goalDefaults = {
  category: 'Care continuity',
  recurrence: 'One time',
  reminder: '1 day before',
  notes: '',
  visible: true,
  weeklyReview: true,
}
export const mockGoals: Goal[] = [
  {
    ...goalDefaults,
    id: 'goal-001',
    motherId: 'MC-2048',
    title: 'Take Daily Prenatal Vitamin',
    description: 'Continue your daily prenatal routine at 8 AM.',
    due: '2026-10-08',
    recurrence: 'Daily',
    status: 'Active',
  },
  {
    ...goalDefaults,
    id: 'goal-002',
    motherId: 'MC-2048',
    title: 'Pick Up Interview Clothes',
    description: 'Visit The Sparrow\'s Nest for comfortable interview clothing.',
    due: '2026-09-25',
    status: 'Completed',
  },
  {
    ...goalDefaults,
    id: 'goal-003',
    motherId: 'MC-2048',
    title: 'Attend prenatal appointment',
    description: 'Discuss your care plan with your provider.',
    due: '2026-09-26',
    status: 'Completed',
  },
  {
    ...goalDefaults,
    id: 'goal-004',
    motherId: 'MC-2048',
    title: 'Submit housing waitlist form',
    description: 'Submit the completed application with your counselor.',
    due: '2026-09-20',
    status: 'Completed',
  },
  {
    ...goalDefaults,
    id: 'goal-005',
    motherId: 'MC-2048',
    title: 'Review housing plan',
    description: 'Review next steps with Alex.',
    due: '2026-10-08',
    status: 'Active',
  },
  {
    ...goalDefaults,
    id: 'goal-006',
    motherId: 'MC-2049',
    title: 'Nutrition appointment',
    description: 'Attend the scheduled nutrition support appointment.',
    due: '2026-10-01',
    status: 'Active',
  },
  {
    ...goalDefaults,
    id: 'goal-007',
    motherId: 'MC-2053',
    title: 'Housing intake',
    description: 'Complete the housing intake with staff support.',
    due: '2026-09-29',
    status: 'Active',
  },
]
export const mockResources: Resource[] = [
  {
    id: 'resource-001',
    name: 'The Sparrow\'s Nest',
    service: 'Clothing',
    county: 'Allegheny',
    mode: 'Physical',
    hours: 'Wednesday · 1–4 PM',
    availability: 'Available',
    address: '1917 Freeport Road, Natrona Heights, PA',
  },
  {
    id: 'resource-002',
    name: 'Community Table',
    service: 'Food Pantry',
    county: 'Allegheny',
    mode: 'Physical',
    hours: 'Thursday · 2–6 PM',
    availability: 'Available',
    address: '420 Maple Avenue, Pittsburgh, PA',
  },
  {
    id: 'resource-003',
    name: 'Safe Harbor Homes',
    service: 'Housing',
    county: 'Allegheny',
    mode: 'Physical',
    hours: '24/7 intake',
    availability: 'Available',
    address: '180 River Street, Pittsburgh, PA',
  },
  {
    id: 'resource-004',
    name: 'BrightMind Therapy',
    service: 'Mental health',
    county: 'Regional',
    mode: 'Digital',
    hours: 'Weekdays · by appointment',
    availability: 'Available',
    address: 'Virtual appointments',
  },
  {
    id: 'resource-005',
    name: 'Little Steps Childcare',
    service: 'Childcare',
    county: 'Westmoreland',
    mode: 'Physical',
    hours: 'Monday–Friday · 7 AM–6 PM',
    availability: 'Waitlist',
    address: '75 Oak Lane, Greensburg, PA',
  },
  {
    id: 'resource-006',
    name: 'New Parent Circle',
    service: 'Parenting support',
    county: 'Butler',
    mode: 'Physical',
    hours: 'Friday · 10 AM',
    availability: 'Available',
    address: '22 Cedar Street, Butler, PA',
  },
]
export const mockFollowUps: FollowUp[] = [
  {
    id: 'followup-001',
    motherId: 'MC-2048',
    title: 'The Sparrow\'s Nest',
    type: 'Referral',
    shared: true,
    due: '2026-09-30',
    status: 'Awaiting outcome',
    feedback: 'Very kind staff and great selection.',
    goalId: 'goal-002',
    resourceId: 'resource-001',
  },
  {
    id: 'followup-002',
    motherId: 'MC-2050',
    title: 'Little Steps Childcare',
    type: 'Referral',
    shared: true,
    due: '2026-09-29',
    status: 'Awaiting outcome',
    feedback: '',
    resourceId: 'resource-005',
  },
  {
    id: 'followup-003',
    motherId: 'MC-2049',
    title: 'Nutrition appointment',
    type: 'Goal',
    due: '2026-10-01',
    status: 'Awaiting outcome',
    feedback: '',
    goalId: 'goal-006',
  },
  {
    id: 'followup-004',
    motherId: 'MC-2053',
    title: 'Housing intake',
    type: 'Goal',
    due: '2026-09-29',
    status: 'Awaiting outcome',
    feedback: '',
    goalId: 'goal-007',
  },
  {
    id: 'followup-005',
    motherId: 'MC-2051',
    title: 'New Parent Circle',
    type: 'Referral',
    shared: true,
    due: '2026-10-02',
    status: 'Scheduled',
    feedback: '',
    resourceId: 'resource-006',
  },
]
export const mockExports: ExportRecord[] = [
  {
    id: 'export-001',
    title: 'September caseload summary',
    date: '2026-09-30T15:00:00Z',
    county: 'All',
    period: '2026-09-01 to 2026-09-30',
    format: 'CSV',
  },
  {
    id: 'export-002',
    title: 'Westmoreland care review',
    date: '2026-09-29T14:00:00Z',
    county: 'Westmoreland',
    period: '2026-09-01 to 2026-09-29',
    format: 'PDF',
  },
]
export const engagement = [42, 58, 47, 72, 64, 86, 78, 94]

export const mockGroups: CareGroup[] = [
  {
    id: 'group-1',
    name: 'Allegheny prenatal support',
    counselor: 'Alex Rivera',
    motherIds: ['MC-2048', 'MC-2049'],
  },
]

export const mockForms: CareForm[] = [
  {
    id: 'check-in',
    title: 'Standard check-in',
    version: 1,
    published: true,
    questions: [
      'How are you feeling today (1–5)?',
      'Do you feel safe today?',
      'What support would be useful this week?',
    ],
  },
  {
    id: 'intake',
    title: 'New mother intake',
    questionDefaults: [{ source: 'needs', value: '' }, { source: 'contact', value: '' }],
    version: 1,
    published: true,
    questions: [
      'What are your immediate needs?',
      'What is your preferred contact method?',
    ],
  },
]

export const mockAssignments: FormAssignment[] = [
  {
    id: 'assignment-1',
    motherId: 'MC-2048',
    title: 'Standard check-in',
    version: 1,
    questions: [
      'How are you feeling today (1–5)?',
      'Do you feel safe today?',
      'What support would be useful this week?',
    ],
    due: '2026-10-02',
    status: 'Assigned',
  },
]

export const mockMeetings: Meeting[] = [
  {
    id: 'meeting-1',
    motherId: 'MC-2048',
    date: '2026-09-25',
    type: 'Phone',
    summary:
      'Reviewed interview preparation and agreed to contact the clothing program.',
    internalNotes: 'Check transportation availability at the next meeting.',
    author: 'Alex Rivera',
    followUp: '2026-10-03',
  },
]

mockMothers.push(
  {
    id: 'MC-2054',
    name: 'Tessa Morgan',
    county: 'Westmoreland',
    status: 'Stable',
    counselor: 'Dina Brooks',
    contact: 'Phone',
    needs: ['Transportation', 'Parenting support'],
    appointment: '2026-10-06T11:00',
  },
  {
    id: 'MC-2055',
    name: 'Laila Bennett',
    county: 'Westmoreland',
    status: 'Watch',
    counselor: 'Dina Brooks',
    contact: 'Mother Client App',
    needs: ['Childcare', 'Nutrition support'],
    appointment: '2026-10-07T14:30',
  },
  {
    id: 'MC-2056',
    name: 'Rosa Chen',
    county: 'Beaver',
    status: 'Stable',
    counselor: 'Sam Lee',
    contact: 'Mother Client App',
    needs: ['Housing', 'Employment preparation'],
    appointment: '2026-10-09T10:30',
  },
)
mockResources.push(
  {
    id: 'resource-007',
    name: 'Westmoreland Family Rides',
    service: 'Transportation',
    county: 'Westmoreland',
    mode: 'Physical',
    hours: 'Weekdays · reserve 2 days ahead',
    availability: 'Available',
    address: '140 Chestnut Street, Greensburg, PA',
  },
  {
    id: 'resource-008',
    name: 'Beaver Family Housing Center',
    service: 'Housing',
    county: 'Beaver',
    mode: 'Physical',
    hours: 'Monday–Friday · 9 AM–4 PM',
    availability: 'Available',
    address: '35 Fourth Avenue, Beaver, PA',
  },
  {
    id: 'resource-009',
    name: 'Family Welcome Desk',
    service: 'Intake support',
    county: 'Allegheny',
    mode: 'Physical',
    hours: 'Weekdays · 9 AM–5 PM',
    availability: 'Available',
    address: '210 Cedar Avenue, Pittsburgh, PA',
  },
  {
    id: 'resource-010',
    name: 'Westmoreland Community Pantry',
    service: 'Food Pantry',
    county: 'Westmoreland',
    mode: 'Physical',
    hours: 'Tuesday and Friday · 10 AM–2 PM',
    availability: 'Available',
    address: '90 Spring Street, Greensburg, PA',
  },
  {
    id: 'resource-011',
    name: 'Family Skills Online',
    service: 'Parenting support',
    county: 'Regional',
    mode: 'Digital',
    hours: 'Self-paced lessons; live group Thursday · 6 PM',
    availability: 'Available',
    address: 'Online parenting workshops',
  },
  {
    id: 'resource-012',
    name: 'Beaver Career Circle',
    service: 'Employment preparation',
    county: 'Beaver',
    mode: 'Physical',
    hours: 'Wednesday · 10 AM–3 PM',
    availability: 'Available',
    address: '60 Market Street, Beaver, PA',
  },
)
interface CareScenario {
  motherId: string
  active: [string, string]
  completed: [string, string]
  referralId: string
  secondReferralId: string
  summary: string
  previousSummary: string
  feedback: string
}
const careScenarios: CareScenario[] = [
  {
    motherId: 'MC-2048',
    active: [
      'Confirm housing intake documents',
      'Bring the completed housing application and proof of residency to your counselor.',
    ],
    completed: [
      'Practice interview questions',
      'Review three common interview questions with your counselor.',
    ],
    referralId: 'resource-003',
    secondReferralId: 'resource-004',
    summary: 'Reviewed housing documents and agreed on the next intake steps.',
    previousSummary:
      'Practiced interview questions and planned a visit for interview clothing.',
    feedback: 'The counselor helped me organize the documents I need.',
  },
  {
    motherId: 'MC-2049',
    active: [
      'Plan a weekly grocery list',
      'Use the nutrition appointment recommendations to prepare a grocery list.',
    ],
    completed: [
      'Register with the community pantry',
      'Confirm the Thursday pickup window with Community Table.',
    ],
    referralId: 'resource-002',
    secondReferralId: 'resource-011',
    summary: 'Reviewed pantry pickup hours and planned meals for the week.',
    previousSummary:
      'Confirmed the nutrition appointment and discussed preferred foods.',
    feedback: 'I was able to collect groceries during the afternoon pickup.',
  },
  {
    motherId: 'MC-2050',
    active: [
      'Confirm childcare waitlist position',
      'Contact Little Steps to confirm your application and expected opening.',
    ],
    completed: [
      'Arrange a ride to childcare intake',
      'Reserve a family ride before the intake appointment.',
    ],
    referralId: 'resource-007',
    secondReferralId: 'resource-005',
    summary:
      'Reviewed childcare options while the waitlist application is pending.',
    previousSummary:
      'Confirmed a transportation reservation for the childcare intake.',
    feedback: 'The ride coordinator explained how to reserve the next trip.',
  },
  {
    motherId: 'MC-2051',
    active: [
      'Attend the parent support circle',
      'Join the Friday support circle and bring one topic you would like to discuss.',
    ],
    completed: [
      'Complete safe sleep orientation',
      'Review the safe sleep checklist with your counselor.',
    ],
    referralId: 'resource-006',
    secondReferralId: 'resource-011',
    summary: 'Discussed routines at home and chose a parenting workshop.',
    previousSummary:
      'Reviewed safe sleep guidance and answered questions about the checklist.',
    feedback: 'The group helped me plan a more consistent evening routine.',
  },
  {
    motherId: 'MC-2052',
    active: [
      'Prepare for the welcome appointment',
      'Bring your intake questions and confirm your preferred contact method.',
    ],
    completed: [
      'Complete initial support questionnaire',
      'Share immediate needs before the first counselor appointment.',
    ],
    referralId: 'resource-009',
    secondReferralId: 'resource-002',
    summary:
      'Completed a welcome call and agreed on the priorities for intake.',
    previousSummary:
      'Reviewed contact preferences and explained the local support directory.',
    feedback: 'The welcome desk explained which documents to bring.',
  },
  {
    motherId: 'MC-2053',
    active: [
      'Gather housing intake documents',
      'Prepare residency documents and a list of housing questions.',
    ],
    completed: [
      'Contact the housing center',
      'Confirm an intake window at Beaver Family Housing Center.',
    ],
    referralId: 'resource-008',
    secondReferralId: 'resource-004',
    summary:
      'Reviewed housing intake progress and planned the next document check.',
    previousSummary:
      'Discussed available housing support and confirmed the intake location.',
    feedback: 'The intake staff gave me a clear list of next steps.',
  },
  {
    motherId: 'MC-2054',
    active: [
      'Reserve next appointment transportation',
      'Confirm the pickup time with Westmoreland Family Rides.',
    ],
    completed: [
      'Complete the parenting workshop',
      'Finish the first family routines workshop.',
    ],
    referralId: 'resource-007',
    secondReferralId: 'resource-011',
    summary:
      'Confirmed the next appointment and reviewed the transportation plan.',
    previousSummary:
      'Discussed family routines after completing the online workshop.',
    feedback: 'I booked a ride and received the pickup details.',
  },
  {
    motherId: 'MC-2055',
    active: [
      'Compare childcare schedules',
      'Review two childcare schedules and discuss which fits your work hours.',
    ],
    completed: [
      'Register for pantry pickup',
      'Choose a pickup window at Westmoreland Community Pantry.',
    ],
    referralId: 'resource-010',
    secondReferralId: 'resource-005',
    summary: 'Reviewed childcare schedules and confirmed food pantry pickup.',
    previousSummary:
      'Discussed the childcare waitlist and planned interim support.',
    feedback: 'The pantry pickup was convenient and the staff were helpful.',
  },
  {
    motherId: 'MC-2056',
    active: [
      'Prepare a career workshop plan',
      'Bring your resume and two questions to the career workshop.',
    ],
    completed: [
      'Review the housing budget',
      'Complete a monthly housing budget with your counselor.',
    ],
    referralId: 'resource-012',
    secondReferralId: 'resource-008',
    summary: 'Reviewed the housing budget and planned a career workshop visit.',
    previousSummary: 'Discussed employment goals and updated the support plan.',
    feedback: 'The workshop helped me identify changes to my resume.',
  },
]
mockForms.push(
  {
    id: 'practical-needs',
    title: 'Goals and practical needs',
    version: 2,
    published: true,
    questions: [
      'Which goal did you make progress on this week?',
      'What practical support would help you next?',
      'Would you like a counselor follow-up?',
    ],
  },
  {
    id: 'parenting-check-in',
    title: 'Parenting support check-in',
    version: 1,
    published: true,
    questions: [
      'Which family routine is going well?',
      'What would you like to discuss at your next appointment?',
      'Would you like to join a parent support group?',
    ],
  },
  {
    id: 'community-connection',
    title: 'Community connection',
    version: 0,
    published: false,
    questions: [
      'Would you like to find a local Bible Study?',
      'Which day and meeting format would work for you?',
    ],
  },
)
for (const [index, scenario] of careScenarios.entries()) {
  const mother = mockMothers.find((m) => m.id === scenario.motherId)!
  const prefix = mother.id.toLowerCase()
  const activeId = `${prefix}-goal-active`
  mockGoals.push(
    {
      ...goalDefaults,
      id: activeId,
      motherId: mother.id,
      title: scenario.active[0],
      description: scenario.active[1],
      due: index % 3 === 0 ? '2026-09-30' : '2026-10-07',
      status: 'Active',
    },
    {
      ...goalDefaults,
      id: `${prefix}-goal-completed`,
      motherId: mother.id,
      title: scenario.completed[0],
      description: scenario.completed[1],
      due: '2026-09-23',
      status: 'Completed',
    },
    {
      ...goalDefaults,
      id: `${prefix}-goal-next`,
      motherId: mother.id,
      title: 'Review next steps with your counselor',
      description: `Review your ${mother.needs.join(' and ').toLowerCase()} support plan at the next appointment.`,
      due: mother.appointment.slice(0, 10),
      status: 'Active',
      visible: false,
      notes: 'Discuss next steps at the scheduled care review.',
    },
  )
  const resource = mockResources.find((r) => r.id === scenario.referralId)!
  const nextResource = mockResources.find(
    (r) => r.id === scenario.secondReferralId,
  )!
  mockFollowUps.push(
    {
      id: `${prefix}-referral-completed`,
      motherId: mother.id,
      title: resource.name,
      type: 'Referral',
      resourceId: resource.id,
      due: '2026-09-24',
      status: 'Completed',
      feedback: scenario.feedback,
      outcome: index === 2 ? 'Partially successful' : 'Successful',
      notes:
        index === 2
          ? 'Ride reservation confirmed; childcare placement is still pending.'
          : 'Reviewed feedback and confirmed the next care step.',
      shared: true,
      message: `Discuss ${resource.service.toLowerCase()} support with the service team.`,
      loggedAt: '2026-09-25T14:00:00Z',
    },
    {
      id: `${prefix}-referral-next`,
      motherId: mother.id,
      title: nextResource.name,
      type: 'Referral',
      resourceId: nextResource.id,
      due: '2026-10-06',
      status: 'Scheduled',
      feedback: '',
      message: `Review ${nextResource.name} options together at your next appointment.`,
      priority: 'Standard',
      shared: true,
    },
    {
      id: `${prefix}-goal-review`,
      motherId: mother.id,
      title: scenario.active[0],
      type: 'Goal',
      goalId: activeId,
      due: index % 3 === 0 ? '2026-09-30' : '2026-10-07',
      status: index % 3 === 0 ? 'Awaiting outcome' : 'Scheduled',
      feedback: '',
      shared: false,
    },
  )
  const assignedForm = mockForms.find(
    (f) => f.id === (mother.status === 'New' ? 'intake' : 'practical-needs'),
  )!
  const completedForm = mockForms.find((f) => f.id === 'check-in')!
  mockAssignments.push(
    {
      id: `${prefix}-form-upcoming`,
      motherId: mother.id,
      title: assignedForm.title,
      version: assignedForm.version,
      questions: [...assignedForm.questions],
      due: mother.appointment.slice(0, 10),
      status: 'Assigned',
    },
    {
      id: `${prefix}-form-completed`,
      motherId: mother.id,
      title: completedForm.title,
      version: completedForm.version,
      questions: [...completedForm.questions],
      due: '2026-09-22',
      status: 'Completed',
    },
    {
      id: `${prefix}-form-review`,
      motherId: mother.id,
      title: 'Parenting support check-in',
      version: 1,
      questions: [
        ...mockForms.find((f) => f.id === 'parenting-check-in')!.questions,
      ],
      due: index % 2 === 0 ? '2026-09-30' : '2026-10-08',
      status: 'Assigned',
    },
  )
  mockMeetings.push(
    {
      id: `${prefix}-meeting-recent`,
      motherId: mother.id,
      date: '2026-09-28',
      type: index % 2 === 0 ? 'Phone' : 'In person',
      summary: scenario.summary,
      internalNotes: `Confirm progress on ${scenario.active[0].toLowerCase()} at the next care review.`,
      author: mother.counselor,
      followUp: mother.appointment.slice(0, 10),
    },
    {
      id: `${prefix}-meeting-previous`,
      motherId: mother.id,
      date: '2026-09-21',
      type: 'Video',
      summary: scenario.previousSummary,
      internalNotes:
        'Review the agreed next steps before assigning additional services.',
      author: mother.counselor,
      followUp: '2026-09-28',
    },
  )
}
mockGroups.push(
  {
    id: 'group-2',
    name: 'Westmoreland family support',
    counselor: 'Dina Brooks',
    motherIds: ['MC-2050', 'MC-2054', 'MC-2055'],
  },
  {
    id: 'group-3',
    name: 'Beaver housing and employment',
    counselor: 'Sam Lee',
    motherIds: ['MC-2053', 'MC-2056'],
  },
  {
    id: 'group-4',
    name: 'Allegheny welcome cohort',
    counselor: 'Alex Rivera',
    motherIds: ['MC-2052'],
  },
  {
    id: 'group-5',
    name: 'Butler parenting circle',
    counselor: 'Sam Lee',
    motherIds: ['MC-2051'],
  },
)

// Sample mother-reported moods, matching the mother demo where records overlap.
const reportedMoods: Mother['mood'][] = ['good', 'okay', 'low', 'great', null, 'rough', 'good', 'low', 'okay']
mockMothers.forEach((mother, index) => {
  mother.mood = reportedMoods[index] ?? null
  if (mother.mood) mother.moodLoggedAt = '2026-10-01T09:00:00'
})
mockResources.forEach(resource => { resource.followUpDays = resource.service === 'Housing' ? 3 : resource.availability === 'Waitlist' ? 14 : 7 })

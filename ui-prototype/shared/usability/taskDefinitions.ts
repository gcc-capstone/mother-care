import type { ApplicationId, TaskDefinition } from './types.ts'

export const taskDefinitions: Record<ApplicationId, TaskDefinition[]> = {
  'mother-pwa': [
    { id: 'PWA-01', title: 'Find diaper assistance', instruction: "You've run out of diapers for your child. Find somewhere you could get help.", preparation: 'Start at Home. Success: locate a suitable resource and its contact details.' },
    { id: 'PWA-02', title: 'Find assigned goals', instruction: 'Your counselor has assigned goals for you to complete. Find what you need to work on.', preparation: 'Start at Home. Success: open an assigned goal.' },
    { id: 'PWA-03', title: 'Update information', instruction: 'You have an upcoming appointment. Find where you would update your information.', preparation: 'Start at Home. Success: locate Profile and edit synthetic information. There is no separate appointment screen in this PWA.' },
    { id: 'PWA-04', title: 'Find assigned resources', instruction: 'Your counselor recommended a resource for you. Find that resource.', preparation: 'Success: open a resource under From your counselor.' },
    { id: 'PWA-05', title: 'Find a check-in or form', instruction: 'You need to complete information requested by your counselor. Find where you would do that.', preparation: 'Success: locate and open an assigned form.' },
    { id: 'PWA-06', title: 'Complete intake', instruction: 'Find and complete your initial information form using the sample details provided.', preparation: 'Use synthetic details only. Success: submit intake and review any profile-change confirmation.' },
    { id: 'PWA-07', title: 'Complete a credit activity', instruction: 'Find a learning activity and complete it to earn credits.', preparation: 'Use an unfinished learning guide in Earn. These are prototype guides, not embedded videos.' },
  ],
  'admin-web': [
    { id: 'ADMIN-01', title: 'Find a mother', instruction: 'You are a counselor. Locate the profile of a mother you are currently working with.', preparation: 'Start at Dashboard with the Counselor demo role. Give the tester a fictional record from the current dataset.' },
    { id: 'ADMIN-02', title: 'Assign a goal', instruction: "Assign a new goal to a mother you're counseling.", preparation: 'Use Counselor role and select a fictional mother. Success: save a new goal.' },
    { id: 'ADMIN-03', title: 'Assign a resource', instruction: 'Find a resource and assign it to a mother who needs assistance.', preparation: 'Use Counselor role. Success: share a recommendation with a follow-up.' },
    { id: 'ADMIN-04', title: 'Manage a form', instruction: 'Find where you would assign or edit a form for a mother.', preparation: 'Counselor can assign a published form; Administrator can edit the form library. Choose the variant before timing.' },
    { id: 'ADMIN-05', title: 'Manage resources', instruction: "You've discovered that a resource's information needs updating. Find where you would make that change.", preparation: 'Set Administrator demo role before starting. Success: find the catalog editor and save a synthetic change.' },
    { id: 'ADMIN-06', title: 'Review mother progress', instruction: "Find information about a mother's progress on her assigned activities.", preparation: 'Counselor can review the selected case and goals; Administrator also has Analytics. Specify the variant before timing.' },
    { id: 'ADMIN-07', title: 'Manage a follow-up', instruction: 'Find a scheduled follow-up and record the result of contacting the mother.', preparation: 'Use a fictional follow-up and Counselor role.' },
    { id: 'ADMIN-08', title: 'Find care group assignments', instruction: 'Find which counselors and mothers belong to a care group.', preparation: 'Use Administrator demo role. This checkout has no separate Volunteer role or volunteer workspace.' },
  ],
}

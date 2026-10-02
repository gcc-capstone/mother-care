---
name: admin-web
description: >
  Instructions for implementing the MotherCare staff-facing administrative web
  application using React, TypeScript, Tailwind CSS, local state, and dummy
  data only.
---

# MotherCare Admin Web Skill

## 1. Scope

This skill governs:

```text
ui-prototype/admin-web/
```

Also obey:

```text
ui-prototype/SKILL.md
```

This agent owns the STAFF-FACING WEB APPLICATION ONLY.

Do NOT modify:

```text
ui-prototype/mother-pwa/
```

unless explicitly instructed.

---

# 2. Users

The Admin Web application may support:

- Administrators
- Counselors
- Volunteers
- Other authorized FamilyLife Network staff

Actual project requirements determine available roles and permissions.

Do not implement real authorization.

---

# 3. Technology

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- React state
- Local dummy data
- Existing approved frontend libraries

No backend should be created.

---

# 4. Desktop-First Design

This application should primarily target:

- Desktop computers
- Laptops
- Keyboard/mouse interaction
- Larger displays

Take advantage of screen space.

Appropriate patterns include:

- Sidebar navigation
- Top navigation
- Tables
- Search
- Filters
- Dashboard cards
- Multi-column forms
- Detail panels
- Modals
- Breadcrumbs
- Status badges
- Pagination-like prototype controls

Do not build the Admin interface as an enlarged version of the Mother PWA.

---

# 5. Paths

Primary source:

```text
ui-prototype/admin-web/src/
```

Expected organization:

```text
src/
├── components/
├── pages/
├── layouts/
├── data/
├── types/
├── hooks/
├── utils/
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

Inspect existing code before changing architecture.

---

# 6. Before Editing

Inspect:

1. Existing routes.
2. Admin layout.
3. Sidebar/navigation.
4. Existing pages.
5. Reusable components.
6. Tailwind conventions.
7. `globals.css`.
8. Types.
9. Mock data.
10. Relevant project requirements/designs.

Reuse established patterns.

---

# 7. Potential Staff Workflows

Examples include:

- Dashboard
- Mother directory
- Mother search
- Mother details
- Counselor assignments
- Goal creation
- Goal assignment
- Goal management
- Resource management
- Appointment information
- Education management
- Points/reward administration
- Counselor management
- Volunteer workflows
- Administrative settings

These are examples only.

Follow actual requirements.

---

# 8. Application Layout

Prefer a reusable desktop shell.

For example:

```text
AdminLayout
├── AdminSidebar
├── AdminHeader
└── MainContent
```

Do not recreate navigation separately on every page.

Navigation should clearly show the current section.

---

# 9. Tables and Lists

Administrative data often benefits from tables.

When appropriate, support frontend-only:

- Search
- Filtering
- Sorting
- Status filters
- Row selection
- Detail navigation

All functionality should operate on local arrays.

Do not call APIs.

Tables should remain readable at normal laptop widths.

---

# 10. Detail Pages

Complex records such as mothers should generally have clear detail views.

For example:

```text
Mother Details
├── Overview
├── Goals
├── Resources
├── Appointments
├── Education Progress
└── Notes / relevant project information
```

Actual sections must follow project requirements.

Do not invent sensitive or unnecessary information.

---

# 11. Tailwind

Tailwind CSS is the primary styling system.

Global styles:

```text
src/styles/globals.css
```

Use globals for application-wide design behavior.

Use Tailwind utilities/components for individual page styling.

Maintain consistent:

- Widths
- Spacing
- Typography
- Cards
- Tables
- Buttons
- Forms
- Badges
- Modals

---

# 12. Reusable Components

Potential reusable components include:

```text
AdminSidebar
AdminHeader
PageHeader
DataTable
SearchInput
FilterBar
StatusBadge
StatCard
FormField
Modal
ConfirmDialog
EmptyState
```

Reuse existing components before adding new ones.

---

# 13. Dummy Data

All data is frontend-only.

Use:

```text
src/data/
```

Potential datasets:

```text
mockMothers.ts
mockCounselors.ts
mockGoals.ts
mockResources.ts
mockAppointments.ts
mockEducation.ts
mockRewards.ts
```

Data should be realistic and internally consistent.

---

# 14. Local CRUD Simulation

Administrative workflows may simulate:

- Create
- Read
- Update
- Delete

using React state.

For example, adding a goal should update the local goal collection and make the
new goal visible immediately.

Deleting an item should remove it from local state.

Editing should update the local object.

No persistence beyond the prototype session is required.

---

# 15. No Backend

Do NOT add:

- REST
- GraphQL
- Axios
- Application-data `fetch()`
- Databases
- SQL
- Spring Boot
- Express
- Firebase
- Supabase
- Authentication services
- AWS
- Azure
- Serverless functions

Simulate the frontend result locally.

---

# 16. Responsive Behavior

Desktop is primary, but avoid completely broken smaller layouts.

Tables may:

- Scroll horizontally
- Switch to cards where already established
- Reduce secondary columns

Navigation may collapse if the existing design supports it.

Do not sacrifice the desktop experience solely to make the Admin app resemble
the mobile PWA.

---

# 17. Accessibility

Ensure:

- Semantic buttons
- Proper form labels
- Keyboard-accessible controls
- Visible focus states
- Understandable table headings
- Accessible modal behavior where practical
- Status is not conveyed through color alone

---

# 18. Agent Ownership

YOU MAY MODIFY:

```text
ui-prototype/admin-web/**
```

YOU SHOULD NOT MODIFY:

```text
ui-prototype/mother-pwa/**
```

Avoid repository-wide changes unless explicitly required.

---

# 19. Verification

Before finishing:

- Run TypeScript/build checks.
- Verify routes.
- Verify sidebar/navigation.
- Verify tables.
- Verify filters/search.
- Verify forms.
- Verify local CRUD interactions.
- Verify detail-page navigation.
- Verify modal behavior.
- Verify realistic mock data.
- Verify no backend dependency exists.

---

# 20. Definition of Done

- [ ] Feature exists in Admin Web.
- [ ] Desktop UX is intentional.
- [ ] React + TypeScript are used.
- [ ] Tailwind is used.
- [ ] Existing global styles are followed.
- [ ] Dummy data is realistic.
- [ ] Workflows are clickable.
- [ ] CRUD behavior works locally where appropriate.
- [ ] Routes are connected.
- [ ] No backend exists.
- [ ] No application-data network calls exist.
- [ ] TypeScript compiles.
- [ ] Application builds.

The result should feel like a functioning administrative system during a demo,
even though all data and behavior are frontend-only.
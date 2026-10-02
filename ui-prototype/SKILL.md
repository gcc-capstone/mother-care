---
name: ui-prototype
description: >
  Governing instructions for all work inside the MotherCare ui-prototype
  directory. The prototype contains two separate React and TypeScript
  applications: a mobile-first Mother PWA and a desktop-optimized Admin Web
  client. All functionality uses local dummy data and frontend state only.
  No backend, database, API, authentication service, or external
  application-data connection may be introduced.
---

# MotherCare UI Prototype

## 1. Purpose

This skill governs ALL work inside:

```text id="sgkgxc"
ui-prototype/
```

The purpose of this directory is to create a complete, polished, fully
clickable frontend prototype of MotherCare for:

- Design validation
- Stakeholder demonstrations
- User testing
- Usability testing
- Frontend architecture planning

This is currently a FRONTEND-ONLY PROTOTYPE.

The prototype should look and behave like a functioning application while
remaining completely independent of backend infrastructure.

---

# 2. Primary Rule

> Build the frontend experience completely, but fake the infrastructure.

Everything a user needs to see or interact with should work from the frontend.

Everything that would normally require a backend should currently be simulated
using:

```text id="hmjxdh"
React
+
TypeScript
+
Local Dummy Data
+
Frontend State
```

Do not build infrastructure that has not been requested.

---

# 3. Required Architecture

All prototype code MUST live inside:

```text id="kwtvqy"
ui-prototype/
```

There are TWO separate frontend applications:

```text id="1y0d1c"
ui-prototype/
│
├── SKILL.md
│
├── mother-pwa/
│   ├── SKILL.md
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── data/
│   │   ├── types/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── admin-web/
│   ├── SKILL.md
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── data/
│   │   ├── types/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── skills/
    ├── design-implementation/
    │   └── SKILL.md
    ├── mock-data/
    │   └── SKILL.md
    └── ui-review/
        └── SKILL.md
```

If an application has already been initialized, inspect and preserve its
existing structure instead of unnecessarily recreating it.

---

# 4. Application Separation

The two frontend applications MUST remain separate.

## Mother PWA

```text id="2yyrx2"
ui-prototype/mother-pwa/
```

Used by mothers.

Designed mobile-first.

## Admin Web

```text id="o3u1gv"
ui-prototype/admin-web/
```

Used by:

- Administrators
- Counselors
- Volunteers
- Other authorized staff

Designed primarily for desktop/laptop usage.

---

# 5. No Cross-Application Imports

The two applications MUST NOT directly import runtime code from one another.

Never create imports such as:

```ts id="2ek6b9"
import Something from "../../admin-web/...";
```

or:

```ts id="4r0kds"
import Something from "../../mother-pwa/...";
```

Each application must remain independently runnable and understandable.

Application-specific:

- Components
- Pages
- Layouts
- State
- Routes
- Mock data
- Styles

belong inside their respective application.

---

# 6. Technology Stack

Both applications use:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router or the routing solution already present
- Local React state
- Local TypeScript mock data

Use existing approved dependencies when appropriate.

Do not introduce another frontend framework without explicit instruction.

Do not replace the existing stack with:

- Angular
- Vue
- Svelte
- Next.js

unless explicitly requested.

---

# 7. Tailwind CSS

Tailwind CSS is the primary styling system.

Prefer Tailwind utility classes for:

- Layout
- Spacing
- Typography
- Responsive behavior
- Borders
- Shadows
- Flex/Grid
- Component states

Example:

```tsx id="3nsdwg"
<button
  className="rounded-lg px-4 py-2 font-medium shadow-sm transition hover:shadow-md"
>
  Save
</button>
```

Avoid creating large amounts of custom CSS when Tailwind can reasonably express
the design.

---

# 8. Separate Global Styles

Each application maintains its OWN global styles.

Mother PWA:

```text id="djgsr1"
ui-prototype/mother-pwa/src/styles/globals.css
```

Admin Web:

```text id="rqff2h"
ui-prototype/admin-web/src/styles/globals.css
```

Do NOT create one shared global stylesheet between applications.

The applications have different UX requirements.

Global styles may establish:

- Typography
- Background
- Base text behavior
- CSS variables
- Focus behavior
- Form defaults
- Common transitions
- Tailwind layers
- Reusable global utilities

Do not put large amounts of page-specific styling into `globals.css`.

---

# 9. Design Systems

Each application should maintain a consistent internal visual language.

Before creating a new page, inspect existing:

- Typography
- Colors
- Spacing
- Cards
- Buttons
- Inputs
- Navigation
- Headers
- Modals
- Status indicators
- Border radii
- Shadows

Reuse existing patterns.

Do not independently invent a new design language for every page.

---

# 10. Mother PWA Design

The Mother PWA MUST be mobile-first.

Primary target widths include:

```text id="t7br45"
320px
375px
390px
430px
```

Also support reasonable larger-screen behavior.

Prioritize:

- Touch interaction
- Large tap targets
- Simple navigation
- Clear hierarchy
- Readable typography
- Responsive cards
- Accessible forms
- Minimal horizontal scrolling
- Appropriate mobile spacing
- PWA-style navigation

Do NOT build a desktop interface and simply shrink it.

---

# 11. Admin Web Design

Admin Web should be optimized primarily for:

- Desktop
- Laptop
- Keyboard/mouse interaction
- Administrative workflows

Use desktop patterns where appropriate:

- Sidebar navigation
- Header navigation
- Tables
- Search
- Filters
- Dashboard cards
- Multi-column forms
- Detail panels
- Modals
- Breadcrumbs
- Status badges

Do NOT build the Admin client as an enlarged version of the Mother PWA.

---

# 12. Role Ownership

Mother-facing workflows belong in:

```text id="9k7rc4"
mother-pwa/
```

Staff-facing workflows belong in:

```text id="rtetj7"
admin-web/
```

Do not expose staff/admin functionality in the Mother PWA.

Do not place mother-specific mobile workflows in Admin Web unless required as
part of a staff workflow.

---

# 13. Dummy Data Only

ALL application data MUST currently be local dummy data.

No real application data should be fetched.

Mock data belongs inside:

```text id="h0zw61"
mother-pwa/src/data/
```

or:

```text id="jz8kqc"
admin-web/src/data/
```

depending on the application.

---

# 14. Mock Data Quality

Dummy data should be:

- Realistic
- Presentation-ready
- Internally consistent
- Typed
- Reusable
- Stable

Avoid meaningless placeholders such as:

```text id="7s99yf"
Test User
User 1
Foo
Bar
Lorem ipsum
```

Prefer realistic fictional scenarios.

Example:

```ts id="ys2s0v"
export const mockGoals = [
  {
    id: "goal-001",
    title: "Complete Safe Sleep Lesson",
    description: "Watch the assigned safe sleep education lesson.",
    status: "active",
    points: 100,
  },
];
```

---

# 15. Mock Data States

Create enough data to demonstrate meaningful states.

Where appropriate, include:

- Active
- Completed
- Pending
- Overdue
- Upcoming
- Assigned
- Unassigned
- Read
- Unread
- Empty

The prototype should demonstrate these states without requiring source-code
changes during a presentation.

---

# 16. TypeScript Domain Models

Create reusable TypeScript interfaces/types inside each application's:

```text id="u7f56s"
src/types/
```

Example:

```ts id="am9rkw"
export interface Goal {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "overdue";
  points: number;
}
```

Avoid `any`.

Mock data should conform to explicit types.

---

# 17. Local State

Use React state to make the prototype interactive.

Example:

```tsx id="30qvmf"
const [goals, setGoals] = useState(mockGoals);
```

Actions should visibly update the application.

Examples:

- Complete a goal
- Add a goal
- Edit information
- Delete an item
- Search resources
- Filter lists
- Mark education complete
- Dismiss notifications
- Assign resources
- Change statuses

No backend persistence is required.

---

# 18. Local CRUD Simulation

Where CRUD behavior is needed, implement it entirely in frontend state.

Example:

```tsx id="scyb7w"
const addGoal = (newGoal: Goal) => {
  setGoals((current) => [
    ...current,
    newGoal,
  ]);
};
```

The UI should update immediately.

Do not create an API merely to simulate CRUD.

---

# 19. Hard Backend Restriction

THIS PROTOTYPE MUST NOT INTRODUCE BACKEND INFRASTRUCTURE.

Do NOT add:

- Databases
- SQL
- Hibernate
- JPA
- Spring Boot
- Express
- Node backend servers
- REST APIs
- GraphQL
- API routes
- Firebase
- Supabase
- AWS services
- Azure services
- Serverless functions
- Authentication providers
- Database clients
- Axios
- Application-data `fetch()` calls
- Fake HTTP calls
- Fake backend servers

If a feature would normally require a backend, simulate its expected frontend
behavior using local state and dummy data.

---

# 20. Do Not Fake a Backend Architecture

Do not create unnecessary:

```text id="jnwsra"
api/
repositories/
backend/
server/
fake-server/
mock-server/
```

directories merely to imitate future infrastructure.

Do not add service layers whose only purpose is pretending an API exists.

This prototype is intentionally frontend-only.

---

# 21. Authentication

Do NOT implement real authentication.

If authentication or role selection is required for demonstrating a flow,
use predefined dummy users.

Example:

```ts id="h9wxnv"
type DemoRole =
  | "mother"
  | "counselor"
  | "administrator"
  | "volunteer";
```

A prototype login may simply:

1. Select a predefined user.
2. Set local state.
3. Navigate to the appropriate experience.

Do not implement:

- JWT
- Password storage
- OAuth
- Sessions
- Identity providers
- Authentication APIs

---

# 22. Routing

Every implemented page should be reachable through normal navigation.

Do not create isolated screens.

When adding a page:

1. Create the page.
2. Register its route.
3. Connect navigation.
4. Connect relevant cards/buttons/links.
5. Implement back/cancel behavior.
6. Verify the full flow.

A demo user should not need to manually type URLs.

---

# 23. Fully Clickable Requirement

The prototype is intended for demonstrations and user testing.

Therefore, visible controls that imply functionality should generally work.

Examples:

- Save
- Cancel
- Edit
- Delete
- Complete
- Assign
- Search
- Filter
- View Details
- Back
- Next
- Previous
- Navigation items

Do not leave obvious dead buttons.

---

# 24. Forms

Forms should work locally.

Example:

```tsx id="7z83k3"
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  setGoals((current) => [
    ...current,
    {
      id: crypto.randomUUID(),
      ...formData,
    },
  ]);

  navigate("/goals");
};
```

Forms should provide appropriate:

- Labels
- Validation
- Error feedback
- Success feedback
- Cancel behavior

No network request should occur.

---

# 25. Reusable Components

Extract recurring UI patterns into reusable components.

Potential Mother PWA examples:

```text id="7bhn46"
MobileHeader
BottomNavigation
GoalCard
ResourceCard
AppointmentCard
PointsBadge
ProgressIndicator
EmptyState
```

Potential Admin Web examples:

```text id="yzz2v2"
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

These names are examples only.

Do not create abstractions for trivial one-use markup.

---

# 26. Accessibility

Use semantic HTML whenever possible.

Ensure:

- Buttons use `<button>`.
- Links/navigation use appropriate elements.
- Inputs have labels.
- Images have appropriate alt behavior.
- Keyboard navigation works reasonably.
- Focus states are visible.
- Color is not the only indicator of status.
- PWA touch targets are appropriately sized.
- Icon-only actions have accessible labels.

---

# 27. Empty States

Do not allow empty arrays to produce unexplained blank pages.

Where appropriate, provide useful empty states such as:

```text id="q5xdr7"
No active goals
No upcoming appointments
No resources found
No search results
No notifications
```

Empty states should match the application's design system.

---

# 28. Error-Safe UI

The prototype should not crash because:

- An ID is missing.
- A record cannot be found.
- An array is empty.
- Optional information is absent.
- Search returns zero results.

Provide reasonable frontend fallback behavior.

---

# 29. Before Editing

Before implementing ANY feature:

1. Determine the target application.
2. Read the target application's `SKILL.md`.
3. Inspect repository structure.
4. Inspect existing routes.
5. Inspect relevant pages.
6. Inspect layouts.
7. Inspect reusable components.
8. Inspect Tailwind patterns.
9. Inspect `globals.css`.
10. Inspect relevant TypeScript types.
11. Inspect existing dummy data.
12. Inspect relevant requirements/designs.

Do not assume architecture that can be discovered.

---

# 30. Implementation Workflow

For every feature:

## Step 1 — Locate

Determine whether the feature belongs to:

```text id="j9nzoj"
mother-pwa
admin-web
both
```

## Step 2 — Inspect

Inspect relevant code and requirements.

## Step 3 — Understand the Flow

Determine:

- Entry point
- Screens
- Navigation
- User actions
- State changes
- Completion state

## Step 4 — Design

Determine necessary:

- Pages
- Components
- Layout changes
- Types
- Mock data
- Responsive behavior

## Step 5 — Implement

Build using React, TypeScript, and Tailwind.

## Step 6 — Connect

Register routes and connect normal navigation.

## Step 7 — Populate

Add realistic dummy data.

## Step 8 — Make Interactive

Implement actions using local React state.

## Step 9 — Verify

Verify:

- TypeScript
- Build
- Routes
- Navigation
- Forms
- Buttons
- Mock data
- Responsive behavior
- Existing functionality

---

# 31. Child Skills

Specialized work should follow the appropriate child skill.

## Mother PWA

```text id="upaq30"
ui-prototype/mother-pwa/SKILL.md
```

Use for mother-facing implementation.

## Admin Web

```text id="8cbqth"
ui-prototype/admin-web/SKILL.md
```

Use for staff-facing implementation.

## Design Implementation

```text id="3kfl9a"
ui-prototype/skills/design-implementation/SKILL.md
```

Use when translating approved designs, wireframes, or user flows into code.

## Mock Data

```text id="g16m57"
ui-prototype/skills/mock-data/SKILL.md
```

Use when creating, normalizing, or reviewing prototype data.

## UI Review

```text id="x1g70u"
ui-prototype/skills/ui-review/SKILL.md
```

Use for final integration, QA, responsive review, workflow review, and targeted
fixes.

---

# 32. Agent File Ownership

Parallel implementation agents should have clear ownership.

Mother PWA implementation agent:

```text id="d1pvng"
ui-prototype/mother-pwa/**
```

Admin Web implementation agent:

```text id="j1g8ux"
ui-prototype/admin-web/**
```

Avoid simultaneous agents editing the same application files.

Cross-application review agents should run after primary implementation work
when possible.

---

# 33. Design Source of Truth

When implementing UI, use available sources in this priority:

1. Explicit task instructions
2. Approved/current designs
3. Current project requirements
4. Representative tasks/user flows
5. Existing application design system
6. Existing implementation

Do not silently invent major product behavior when requirements are available.

---

# 34. Design Consistency

When implementing a new page:

1. Find the closest existing page.
2. Reuse layout conventions.
3. Reuse existing components.
4. Follow global styles.
5. Follow existing Tailwind patterns.
6. Extend the design system only when necessary.

Do not redesign unrelated parts of the application while implementing a single
feature.

---

# 35. Complete User Flows

Do not implement pages only in isolation.

If a workflow requires:

```text id="u7d7u6"
List
→ Details
→ Edit
→ Save
→ Updated Details
```

implement the full required flow.

The prototype should support realistic end-to-end user testing.

---

# 36. Verification Requirements

Before declaring work complete, verify the affected application.

Check:

- TypeScript compiles.
- Application builds.
- Routes work.
- Navigation works.
- Primary buttons work.
- Forms work.
- Local state changes correctly.
- Mock data renders.
- Empty states render.
- Responsive behavior is appropriate.
- No accidental backend dependency exists.

For Mother PWA, specifically check mobile widths.

For Admin Web, specifically check desktop/laptop layouts.

---

# 37. Do Not Break Existing Work

When implementing a feature:

- Do not remove unrelated pages.
- Do not rewrite unrelated components.
- Do not change established navigation unnecessarily.
- Do not replace the existing design system.
- Do not change working mock data without reason.
- Do not modify the other application unless required.

Prefer targeted changes.

---

# 38. Definition of Done

A frontend feature is complete only when:

- [ ] It lives inside `ui-prototype/`.
- [ ] It is in the correct application.
- [ ] Mother/Admin separation remains intact.
- [ ] React is used.
- [ ] TypeScript is used.
- [ ] Tailwind CSS is used.
- [ ] Existing global styling is respected.
- [ ] Existing design patterns are respected.
- [ ] Realistic dummy data exists.
- [ ] No backend exists.
- [ ] No database exists.
- [ ] No application-data network calls exist.
- [ ] No fake backend architecture exists.
- [ ] Primary interactions work locally.
- [ ] Routes are connected.
- [ ] Normal workflows are fully clickable.
- [ ] Forms work locally.
- [ ] Empty states are handled.
- [ ] Mother PWA is mobile-first.
- [ ] Admin Web is desktop optimized.
- [ ] Components are reused appropriately.
- [ ] TypeScript types are used appropriately.
- [ ] Existing functionality remains intact.
- [ ] TypeScript compiles.
- [ ] The application builds successfully.

---

# 39. Final Principle

When uncertain, optimize for a realistic frontend demonstration.

The prototype should allow someone to use MotherCare as though it were a
functioning application:

```text id="u4c65m"
Navigate
→ View realistic data
→ Open records
→ Fill forms
→ Perform actions
→ See state changes
→ Complete workflows
```

All of this should happen without:

```text id="zrz0mo"
Backend
Database
API
Authentication Service
External Application Data
Cloud Infrastructure
```

Build the user experience completely.

Fake the infrastructure cleanly.

Keep the Mother PWA and Admin Web applications separated.
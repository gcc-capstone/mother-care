---
name: mother-pwa
description: >
  Instructions for implementing the MotherCare mother-facing Progressive Web
  App. This application is a mobile-first React and TypeScript prototype using
  Tailwind CSS, local state, and dummy data only.
---

# MotherCare Mother PWA Skill

## 1. Scope

This skill governs work inside:

```text
ui-prototype/mother-pwa/
```

The root rules in:

```text
ui-prototype/SKILL.md
```

also apply.

If this skill conflicts with the root skill, follow the root skill unless the
root skill explicitly delegates the decision to this application.

This agent owns the MOTHER-FACING PWA ONLY.

Do NOT modify:

```text
ui-prototype/admin-web/
```

unless explicitly instructed.

---

# 2. Purpose

Build a polished, fully clickable prototype of the MotherCare experience used
by mothers.

The application should feel like a real mobile application while remaining
entirely frontend-only.

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- Local mock data
- React state
- Existing approved frontend libraries

Do NOT create backend infrastructure.

---

# 3. Mobile-First Requirement

This application is a Progressive Web App designed primarily for phones.

Design for mobile FIRST.

Primary widths to consider:

```text
320px
375px
390px
430px
```

Also ensure reasonable behavior on:

```text
768px+
```

The application should feel intentionally designed for mobile rather than like
a desktop website compressed onto a phone.

Prioritize:

- Touch-friendly controls
- Large tap targets
- Simple navigation
- Clear hierarchy
- Readable typography
- Short workflows
- Responsive cards
- Accessible forms
- Appropriate spacing
- Minimal horizontal scrolling

---

# 4. Paths

Primary source path:

```text
ui-prototype/mother-pwa/src/
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

Inspect the existing structure before adding directories.

Do not create duplicate architectures.

---

# 5. Before Making Changes

Before implementing a feature, inspect:

1. Existing routes.
2. Existing pages.
3. Existing layouts.
4. Existing components.
5. Existing Tailwind patterns.
6. `src/styles/globals.css`.
7. Existing TypeScript types.
8. Existing mock data.
9. Relevant project requirements.
10. Relevant designs or wireframes available in the repository.

Do not blindly create a new implementation if an existing component or pattern
already solves the problem.

---

# 6. Mother-Facing Features

Mother-facing workflows may include:

- Home/dashboard
- Assigned goals
- Goal details
- Goal completion
- Resources
- Resource details
- Resource search
- Educational content
- Education progress
- Points
- Rewards
- Appointments
- Appointment preparation
- Profile information
- Notifications

These are examples.

The actual project requirements and designs are the source of truth.

Do not invent major product functionality solely because it appears in this
list.

---

# 7. Navigation

The PWA should have a consistent mobile navigation system.

Reuse the existing navigation pattern.

Possible patterns include:

- Bottom navigation
- Mobile header
- Back navigation
- Profile/settings menu

Do not create multiple conflicting navigation systems.

Every normal workflow must be reachable through navigation.

Users should not need to manually enter URLs.

---

# 8. Layout

Use a reusable application layout where appropriate.

For example:

```text
MotherAppLayout
├── MobileHeader
├── PageContent
└── BottomNavigation
```

Pages should not independently recreate the application's header/navigation.

Use consistent:

- Horizontal padding
- Vertical spacing
- Page titles
- Card spacing
- Section spacing
- Bottom-navigation clearance

---

# 9. Tailwind CSS

Tailwind is the primary styling system.

Use Tailwind utility classes for page and component styling.

Global application-wide styles belong in:

```text
src/styles/globals.css
```

Global styles may define:

- Typography
- Body background
- CSS variables
- Focus behavior
- Common transitions
- Tailwind layers
- Shared global utilities

Do not place large amounts of page-specific CSS in `globals.css`.

---

# 10. Components

Prefer reusable components for recurring UI.

Potential examples:

```text
MobileHeader
BottomNavigation
PageContainer
GoalCard
ResourceCard
EducationCard
AppointmentCard
PointsBadge
StatusBadge
ProgressIndicator
EmptyState
FormField
ConfirmationSheet
```

Names are examples only.

Inspect existing components before creating another one.

Do not create a reusable component for trivial one-time markup.

---

# 11. Mock Data

All data is local dummy data.

Use:

```text
src/data/
```

Potential files:

```text
mockMother.ts
mockGoals.ts
mockResources.ts
mockEducation.ts
mockAppointments.ts
mockRewards.ts
mockNotifications.ts
```

Use realistic content.

Keep relationships internally consistent.

Example:

If a goal references:

```text
mother-001
```

the corresponding mother should actually exist.

---

# 12. Local Interaction

The application should behave like a functioning product.

Use React state for interactions such as:

- Completing a goal
- Updating profile fields
- Marking education complete
- Searching resources
- Filtering resources
- Dismissing notifications
- Updating appointment information
- Redeeming a prototype reward

Changes only need to survive the current frontend session unless existing
requirements explicitly specify otherwise.

---

# 13. No Backend

Never add:

- API calls
- `fetch()` for application data
- Axios
- REST
- GraphQL
- Firebase
- Supabase
- Database clients
- Spring Boot
- Express
- Authentication providers
- Cloud services

If something would normally require a backend, simulate the expected frontend
result with local state.

---

# 14. Forms

Forms should be fully interactive.

Provide:

- Labels
- Validation where useful for demonstrating UX
- Error messages for invalid local input
- Success feedback
- Cancel/back behavior

Submitting a prototype form should modify local state.

Do not simulate a network request.

---

# 15. PWA Behavior

Preserve existing PWA configuration.

Do not remove:

- Manifest configuration
- PWA metadata
- Icons
- Service-worker configuration

unless explicitly instructed.

When creating UI, account for standalone/mobile usage.

Do not introduce functionality that unnecessarily depends on desktop browser
behavior.

---

# 16. Accessibility

Use semantic HTML.

Ensure:

- Buttons are actual buttons.
- Form fields have labels.
- Touch targets are appropriately sized.
- Focus states are visible.
- Interactive controls are keyboard accessible where reasonable.
- Color is not the only status indicator.
- Text has appropriate readability.
- Icons used as controls have accessible labels.

---

# 17. Design Consistency

Before designing a new screen, find the most similar existing screen.

Reuse its:

- Header treatment
- Spacing
- Typography
- Card styling
- Buttons
- Form fields
- Navigation
- Status indicators

Do not invent a new visual language for every page.

---

# 18. Agent Ownership

When operating as the Mother PWA implementation agent:

YOU MAY MODIFY:

```text
ui-prototype/mother-pwa/**
```

YOU SHOULD NOT MODIFY:

```text
ui-prototype/admin-web/**
```

Do not modify repository-wide files unless necessary and explicitly allowed by
the task.

This separation is important for parallel agent work.

---

# 19. Verification

Before finishing:

- Verify TypeScript compiles.
- Verify the PWA builds.
- Verify routes work.
- Verify navigation works.
- Verify primary buttons work.
- Verify forms work.
- Verify mock data renders.
- Verify mobile layouts.
- Check for horizontal overflow.
- Check empty states.
- Check back navigation.
- Check that no backend/network dependency was introduced.

---

# 20. Definition of Done

A Mother PWA feature is complete when:

- [ ] It exists in `mother-pwa`.
- [ ] It is mobile-first.
- [ ] It uses React + TypeScript.
- [ ] It uses Tailwind.
- [ ] It follows existing global styling.
- [ ] It uses realistic mock data.
- [ ] It is reachable through navigation.
- [ ] Primary interactions work.
- [ ] No backend exists.
- [ ] No application-data network calls exist.
- [ ] Existing PWA functionality still works.
- [ ] TypeScript compiles.
- [ ] The application builds.

The finished result should be usable as a realistic mobile prototype during
MotherCare usability testing.
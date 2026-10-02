---
name: mock-data
description: >
  Instructions for creating and maintaining realistic, internally consistent
  dummy data and TypeScript domain models for the MotherCare frontend
  prototype without introducing databases, APIs, or backend abstractions.
---

# MotherCare Mock Data Skill

## Purpose

Maintain realistic frontend-only data for the MotherCare UI prototype.

All prototype data remains local.

Never introduce a backend.

---

# 1. Applications

Mock data exists independently inside:

```text
ui-prototype/mother-pwa/src/data/
```

and:

```text
ui-prototype/admin-web/src/data/
```

Types belong inside each application's:

```text
src/types/
```

Do not create runtime cross-application imports.

---

# 2. Core Rule

Data must be:

- Fake
- Realistic
- Internally consistent
- Typed
- Stable
- Useful for demonstrations

Avoid meaningless placeholders.

Bad:

```text
Test User
Foo Bar
Example Goal
Lorem ipsum
```

Better:

```text
Jan Miller
Complete Safe Sleep Lesson
Diaper Assistance Resource
Parenting Support Appointment
```

---

# 3. Stable IDs

Every entity should have a stable identifier.

Examples:

```text
mother-001
mother-002

counselor-001

goal-001
goal-002

resource-001

appointment-001
```

Relationships should use these IDs consistently.

---

# 4. Domain Types

Create explicit TypeScript interfaces/types.

Potential entities include:

```text
Mother
Counselor
Goal
Resource
Appointment
EducationItem
EducationProgress
Reward
Notification
```

Only create types actually needed by the application.

Avoid `any`.

---

# 5. Relationships

Relationships must make sense.

Example:

If:

```ts
goal.motherId === "mother-001"
```

then `mother-001` must exist.

If:

```ts
mother.counselorId === "counselor-002"
```

then `counselor-002` must exist.

Do not create orphaned references unless intentionally testing an error state.

---

# 6. Cross-Screen Consistency

The same person should not have contradictory information on different pages.

Maintain consistency for:

- Names
- IDs
- Goal counts
- Point totals
- Counselor assignments
- Appointment information
- Resource assignments
- Education progress
- Status values

If Jan has 450 points on the dashboard, another page should not randomly show
300 unless an interaction changed the value.

---

# 7. Cross-Application Consistency

Mother PWA and Admin Web cannot directly import each other's data.

However, shared conceptual entities should represent the same fictional
scenario when appropriate.

For example, if both applications display Jan Miller, manually keep relevant
core information consistent between the two datasets.

Do NOT solve this by introducing:

- APIs
- Shared databases
- Backend services
- Runtime cross-app imports

This is a prototype.

---

# 8. Required Data States

Where relevant, create data covering:

- Active
- Completed
- Pending
- Overdue
- Upcoming
- Empty
- Assigned
- Unassigned
- Read
- Unread

Do not create dozens of unnecessary records.

Create enough variety to meaningfully demonstrate the UI.

---

# 9. Data Volume

Admin lists should contain enough records to make:

- Search
- Filtering
- Tables
- Sorting

visually meaningful.

Mother PWA datasets can generally be smaller and focused on the active
prototype user.

---

# 10. Dates

Use realistic dates.

Keep related dates logically consistent.

Examples:

- Completion cannot precede assignment.
- Upcoming appointments should be in the future relative to the prototype's
  intended demo context.
- Completed items should have appropriate completion information.

Avoid dynamically depending on remote services for dates.

---

# 11. Content Quality

Dummy content should resemble content that could plausibly appear in
MotherCare.

Avoid:

- Jokes
- Meme content
- Random filler
- Developer-oriented text
- Placeholder gibberish

The application may be shown to real stakeholders.

Mock content should look presentation-ready.

---

# 12. State Changes

When UI interactions modify data, update the local state derived from mock
data.

Examples:

```text
Complete goal
→ status changes
→ completion UI updates
→ points update if required
```

or:

```text
Admin creates goal
→ new local object created
→ appears in list
→ details page can display it
```

No API layer is necessary.

---

# 13. No Fake API Architecture

Do not create:

```text
api/
services/
repositories/
fake-server/
mock-server/
```

merely to imitate backend architecture.

Pages/components may consume typed mock data directly or through simple
frontend hooks/state where useful.

The objective is UI prototyping, not pretending a server exists.

---

# 14. Privacy

All people represented in prototype datasets should be fictional unless the
project explicitly supplies approved test identities.

Do not insert real private information into mock datasets.

---

# 15. Verification

Review:

- IDs
- Relationships
- Types
- Counts
- Statuses
- Dates
- Names
- Point totals
- Assignments
- Cross-screen consistency

Search the codebase for duplicated hard-coded versions of data that should
come from the mock dataset.

---

# 16. Definition of Done

- [ ] Data is fictional.
- [ ] Data looks realistic.
- [ ] Data is TypeScript typed.
- [ ] Stable IDs are used.
- [ ] Relationships are valid.
- [ ] Multiple useful states exist.
- [ ] Screens display consistent information.
- [ ] No database exists.
- [ ] No API exists.
- [ ] No fake server exists.
- [ ] No network calls exist.
- [ ] Data supports full prototype workflows.

The goal is for stakeholders to interact with the prototype without being
distracted by obviously fake or contradictory data.
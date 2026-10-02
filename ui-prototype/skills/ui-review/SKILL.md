---
name: ui-review
description: >
  Instructions for reviewing, testing, and fixing the MotherCare frontend
  prototype after implementation, with emphasis on navigation, responsive
  design, TypeScript correctness, design consistency, dummy-data consistency,
  accessibility, and complete clickable workflows.
---

# MotherCare UI Review Skill

## Purpose

Act as the final frontend QA and integration agent.

Review BOTH:

```text
ui-prototype/mother-pwa/
```

and:

```text
ui-prototype/admin-web/
```

The objective is to find and fix frontend prototype issues without introducing
new product scope or backend infrastructure.

---

# 1. Review Order

Review in this order:

1. Build/TypeScript errors
2. Runtime-breaking issues
3. Routing
4. Navigation
5. Primary workflows
6. Nonfunctional controls
7. Mock-data consistency
8. Responsive behavior
9. Design consistency
10. Accessibility
11. Code duplication
12. Minor visual polish

Fix severe functional issues before cosmetic ones.

---

# 2. Build Verification

Verify both applications independently.

Check:

- Dependencies
- TypeScript
- Build
- Imports
- Missing modules
- Invalid routes
- Console-level implementation problems visible from code

Do not hide errors with `any` or unnecessary type assertions.

Fix their underlying causes.

---

# 3. Route Audit

Inspect every defined route.

Ensure:

- Route renders.
- Page exists.
- Normal navigation reaches it.
- Back/cancel behavior works.
- Parameterized routes receive valid IDs.
- Unknown IDs do not catastrophically break the UI.

Find pages that exist but are unreachable.

Connect them when they are intended parts of normal workflows.

---

# 4. Clickability Audit

Review visible controls.

Examples:

- Buttons
- Cards
- Links
- Tabs
- Filters
- Search
- Edit actions
- Delete actions
- Save
- Cancel
- Complete
- Assign
- Navigation

If the UI visually implies that something is interactive, it should generally
work in the prototype.

Do not leave obviously dead controls unless they are intentionally disabled.

---

# 5. Workflow Audit

Test complete conceptual workflows.

Mother examples:

```text
Home
→ Goals
→ Goal Details
→ Complete Goal
→ Updated State
```

```text
Resources
→ Search
→ Resource Details
→ Back
```

Admin examples:

```text
Mother List
→ Search
→ Mother Details
→ Goals
→ Add Goal
→ Updated Goal List
```

Do not review pages only in isolation.

---

# 6. Mock Data Audit

Check:

- Names
- IDs
- Point totals
- Statuses
- Goal counts
- Resource assignments
- Counselor relationships
- Appointments
- Education progress

Fix contradictions that damage prototype credibility.

Do not introduce backend synchronization.

---

# 7. Mother PWA Responsive Audit

Review at approximately:

```text
320px
375px
390px
430px
768px
```

Look for:

- Horizontal overflow
- Clipped text
- Tiny buttons
- Broken navigation
- Cards exceeding viewport
- Fixed widths
- Modals/sheets exceeding viewport
- Content hidden behind bottom navigation
- Poor touch targets

Mobile should be the primary experience.

---

# 8. Admin Web Responsive Audit

Review common laptop/desktop widths.

Look for:

- Broken sidebar
- Excessively narrow content
- Unreadable tables
- Forms stretched unnecessarily
- Bad wrapping
- Overlapping controls
- Broken modals
- Poor use of desktop space

Admin should feel intentionally desktop-oriented.

---

# 9. Tailwind Consistency

Find unnecessary styling divergence.

Check:

- Button styles
- Border radii
- Shadows
- Card padding
- Page spacing
- Typography
- Status badges
- Form inputs

Prefer existing reusable components over repeated inconsistent class strings.

Do not perform a massive redesign during QA.

---

# 10. Global CSS

Inspect each application's:

```text
src/styles/globals.css
```

Ensure global rules are actually global.

Move highly page-specific behavior out of global styles when necessary.

Do not combine the Mother and Admin global styles.

---

# 11. Accessibility Review

Check obvious issues:

- Missing form labels
- Non-semantic clickable divs
- Missing button types
- Invisible focus states
- Icon-only buttons without labels
- Color-only status communication
- Images without appropriate alt behavior
- Keyboard-inaccessible important actions
- Poor touch targets in PWA

Make practical fixes.

---

# 12. Empty States

Check screens when arrays are empty.

The application should not simply render unexplained blank space.

Use meaningful empty states where appropriate.

Examples:

```text
No active goals
No upcoming appointments
No resources found
No search results
```

---

# 13. Error-Safe UI

Local prototype interactions should not crash because:

- An ID is unknown.
- An array is empty.
- Optional information is missing.
- Search returns zero results.

Provide reasonable frontend fallback behavior.

---

# 14. Code Quality

Look for:

- Duplicated large components
- Repeated domain types
- Excessive `any`
- Dead imports
- Dead state
- Unused mock data
- Giant page components that clearly contain reusable sections
- Cross-imports between Mother and Admin applications

Make targeted improvements.

Do not refactor functioning code purely for personal stylistic preference.

---

# 15. Backend Violation Audit

Search for accidental:

- `fetch(`
- Axios
- API clients
- REST endpoints
- GraphQL
- Database packages
- Firebase
- Supabase
- Authentication integrations
- Backend servers

Application-data networking should not exist in this prototype.

Remove accidental backend dependencies where safe.

---

# 16. Scope Control

QA should fix problems.

QA should NOT invent large new features.

If a required workflow is clearly incomplete, finish the missing frontend
pieces.

Do not redesign the entire product during review.

---

# 17. Final Verification

Before finishing, confirm independently for BOTH applications:

- Build succeeds.
- TypeScript succeeds.
- Main routes work.
- Main navigation works.
- Primary workflows are clickable.
- Mock data displays correctly.
- Forms function locally.
- No backend exists.
- No application-data network calls exist.

---

# 18. Definition of Done

The review is complete when:

- [ ] Both applications build.
- [ ] No obvious broken routes remain.
- [ ] No major dead controls remain.
- [ ] Primary workflows are complete.
- [ ] Mother PWA works at mobile widths.
- [ ] Admin Web works at desktop widths.
- [ ] Mock data is reasonably consistent.
- [ ] Tailwind design is consistent.
- [ ] Major accessibility issues are addressed.
- [ ] No accidental backend dependencies exist.
- [ ] Mother/Admin code separation remains intact.

The final prototype should be ready to hand to stakeholders for demonstration
and usability testing.
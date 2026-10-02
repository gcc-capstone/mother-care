---
name: design-implementation
description: >
  Instructions for translating approved MotherCare designs, wireframes,
  requirements, and user flows into consistent React, TypeScript, and Tailwind
  frontend implementations.
---

# MotherCare Design Implementation Skill

## Purpose

Translate approved designs and requirements into frontend code without
unnecessarily redesigning the product.

Always obey:

```text
ui-prototype/SKILL.md
```

and the target application's skill:

```text
ui-prototype/mother-pwa/SKILL.md
```

or:

```text
ui-prototype/admin-web/SKILL.md
```

---

# 1. Determine Target

Before editing, determine whether the design belongs to:

```text
mother-pwa
admin-web
both
```

Do not implement a mother-facing screen inside Admin Web.

Do not implement staff workflows inside the Mother PWA.

---

# 2. Source of Truth

Use available project artifacts in this priority:

1. Explicit task instructions.
2. Approved/current designs.
3. Current project requirements.
4. Representative tasks/user flows.
5. Existing application design system.
6. Existing implementation.

If artifacts disagree, do not silently invent a resolution.

Prefer the most recent clearly approved source.

---

# 3. Inspect Before Implementing

Before coding:

1. Inspect the relevant design.
2. Identify the complete user flow.
3. Identify every screen involved.
4. Inspect existing routes.
5. Inspect existing pages.
6. Inspect reusable components.
7. Inspect Tailwind patterns.
8. Inspect global styles.
9. Inspect available mock data.
10. Inspect relevant types.

---

# 4. Design Fidelity

Preserve the intended:

- Information hierarchy
- Navigation
- Page structure
- Content organization
- Forms
- Actions
- Visual relationships
- Mobile/desktop intent

Do not make major UX changes simply because another solution seems preferable.

Minor adjustments are acceptable when necessary for:

- Responsiveness
- Accessibility
- Consistency
- Technical feasibility

---

# 5. Reuse Existing Design System

Do not independently recreate:

- Buttons
- Cards
- Inputs
- Headers
- Navigation
- Modals
- Badges
- Tables

if suitable components already exist.

Extend existing components where reasonable.

---

# 6. Tailwind Translation

Translate design properties into consistent Tailwind classes.

Prefer existing project tokens/patterns over arbitrary one-off values.

Avoid excessive arbitrary classes such as:

```text
w-[347px]
mt-[13px]
text-[17px]
```

unless required to accurately reproduce an important design.

Prefer responsive/flexible layout primitives.

---

# 7. Mobile Designs

For Mother PWA designs:

- Implement mobile-first.
- Preserve touch-friendly spacing.
- Account for bottom navigation.
- Avoid fixed desktop widths.
- Prevent horizontal overflow.
- Preserve clear hierarchy on small screens.

---

# 8. Desktop Designs

For Admin Web designs:

- Use available screen width.
- Preserve desktop information density.
- Use tables where appropriate.
- Use multi-column layouts where appropriate.
- Preserve sidebar/header conventions.
- Avoid unnecessarily mobile-looking layouts.

---

# 9. Complete Flows

Do not implement only the visually interesting screen.

If the design describes:

```text
List
→ Details
→ Edit
→ Confirmation
→ Updated Details
```

the prototype should support that entire flow where required.

All screens must be reachable.

---

# 10. Interaction

Buttons represented as functional actions should work.

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

Use frontend state and dummy data.

Do not add APIs.

---

# 11. Missing Data

When the design requires data not yet present:

1. Check existing mock data.
2. Check existing types.
3. Reuse existing entities where possible.
4. Add realistic dummy data if necessary.

Do not introduce backend calls.

---

# 12. Global Versus Local Styling

If a design introduces a pattern used throughout the application, consider
updating:

```text
globals.css
```

or a reusable component.

If styling is unique to one component/page, keep it local through Tailwind
classes.

Do not pollute global CSS with one-page exceptions.

---

# 13. Do Not Over-Redesign

Do not:

- Change application navigation unnecessarily.
- Introduce a new color system without instruction.
- Replace existing typography arbitrarily.
- Introduce a new component library.
- Change user flows because another flow seems better.
- Merge Mother and Admin design systems.

---

# 14. Verification

After implementation, compare the result against the source design.

Check:

- Content
- Hierarchy
- Layout
- Navigation
- Components
- States
- Forms
- Responsive behavior
- Interactions
- Route accessibility

Also verify TypeScript and build success.

---

# 15. Definition of Done

- [ ] Correct application was modified.
- [ ] Relevant design was inspected.
- [ ] Existing components were reused.
- [ ] Tailwind matches established patterns.
- [ ] Required screens exist.
- [ ] Complete flow is clickable.
- [ ] Dummy data supports the design.
- [ ] Interactions work locally.
- [ ] Responsive behavior matches the target platform.
- [ ] No backend was introduced.
- [ ] Build succeeds.

The objective is not merely to reproduce screenshots.

The objective is to turn the approved design into a coherent, clickable
frontend prototype.
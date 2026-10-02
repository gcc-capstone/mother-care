# MotherCare UI Prototype Skill

## Purpose

This skill governs all work inside the `ui-prototype/` directory.

The goal of this directory is to create a complete, polished, fully clickable
frontend prototype of MotherCare for demonstrations, usability testing, and
design validation.

This prototype MUST use dummy data only.

There is currently:

- No backend
- No database
- No API
- No authentication service
- No external application-data connections
- No cloud integration

All functionality must be simulated entirely in React and TypeScript using
local mock data and frontend state.

---

# 1. Required Directory Structure

All prototype code MUST live inside:

```text
ui-prototype/
```

The prototype MUST contain two separate frontend applications:

```text
ui-prototype/
├── mother-pwa/
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
└── SKILL.md
```

Use the existing repository structure if these applications have already been
initialized.

Do NOT move prototype code outside `ui-prototype/`.

Do NOT combine the two applications into one React application.

---

# 2. Application Separation

The Mother PWA and Admin Web Client are separate frontend applications.

They MUST NOT share application-specific:

- Components
- Pages
- Layouts
- State
- Routing
- Mock data
- CSS files
- Tailwind configuration

Keeping the applications separated is intentional.

Do not create imports such as:

```ts
import Something from "../../admin-web/...";
```

or:

```ts
import Something from "../../mother-pwa/...";
```

Each application should be independently understandable and runnable.

---

# 3. Technology Stack

Both applications use:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router or the routing solution already present in the project

Do not introduce another frontend framework without explicit instructions.

Do not use:

- Angular
- Vue
- Svelte
- Next.js
- Bootstrap
- Material UI

unless explicitly requested.

---

# 4. Tailwind CSS

Tailwind CSS MUST be the primary styling system for both applications.

Prefer Tailwind utility classes for component-specific styling.

Example:

```tsx
<button
  className="rounded-lg px-4 py-2 font-medium shadow-sm transition hover:shadow-md"
>
  Save Goal
</button>
```

Do not create large amounts of component-specific vanilla CSS when Tailwind
can reasonably express the design.

---

# 5. Global Styles

Each application MUST maintain its own global styles.

Mother PWA:

```text
ui-prototype/mother-pwa/src/styles/globals.css
```

Admin Web:

```text
ui-prototype/admin-web/src/styles/globals.css
```

Global styles should establish application-wide behavior such as:

- Typography
- Backgrounds
- Base text styling
- Form behavior
- Focus behavior
- Common transitions
- Scrollbar behavior where appropriate
- Shared CSS variables if needed
- Application-wide Tailwind layers
- Reusable global utility classes when justified

Do NOT put page-specific styling into `globals.css`.

---

# 6. Design Systems

Each application should have a consistent internal design language.

Before creating a new page, inspect the existing:

- Global styles
- Layout
- Components
- Typography
- Spacing
- Buttons
- Cards
- Forms
- Navigation
- Colors
- Border radii
- Shadows

Reuse existing patterns rather than creating a new visual style for every page.

Common UI primitives should become reusable React components.

Examples:

```text
components/
├── Button.tsx
├── Card.tsx
├── Input.tsx
├── Select.tsx
├── Modal.tsx
├── EmptyState.tsx
└── LoadingState.tsx
```

Do not duplicate the same Tailwind class combinations across many pages when
a reusable component would make the design more consistent.

---

# 7. Mother PWA

Path:

```text
ui-prototype/mother-pwa/
```

The Mother PWA is the mother-facing application.

It MUST be designed mobile-first and formatted as a Progressive Web App.

Primary targets include:

- Phones
- Touch screens
- Small screens
- Installed PWA usage

Desktop rendering should remain functional, but mobile is the primary
experience.

Prioritize:

- Large touch targets
- Clear navigation
- Simple workflows
- Readable typography
- Accessible forms
- Mobile-friendly cards
- Minimal horizontal scrolling
- Responsive layouts
- Appropriate bottom or mobile navigation where established by the design

Test layouts conceptually at widths such as:

```text
320px
375px
390px
430px
768px
```

Do not build desktop interfaces and simply shrink them for mobile.

---

# 8. Mother PWA Pages

Mother-facing functionality belongs in:

```text
ui-prototype/mother-pwa/src/pages/
```

Potential pages include:

```text
pages/
├── HomePage.tsx
├── GoalsPage.tsx
├── GoalDetailsPage.tsx
├── ResourcesPage.tsx
├── ResourceDetailsPage.tsx
├── EducationPage.tsx
├── RewardsPage.tsx
├── AppointmentsPage.tsx
├── NotificationsPage.tsx
└── ProfilePage.tsx
```

These are examples.

Follow actual project requirements and designs when they exist.

Do not create unnecessary pages simply because they appear in this list.

---

# 9. Admin Web Client

Path:

```text
ui-prototype/admin-web/
```

The Admin Web Client is for:

- Administrators
- Counselors
- Volunteers
- Other authorized FamilyLife Network staff

It should be optimized primarily for:

- Desktop
- Laptop
- Keyboard/mouse interaction
- Larger screens
- Administrative workflows

It should take advantage of available screen space.

Appropriate patterns include:

- Sidebar navigation
- Top navigation
- Tables
- Search
- Filters
- Dashboard cards
- Multi-column layouts
- Detail panels
- Forms
- Modals
- Breadcrumbs

Do NOT make the Admin client look like an enlarged mobile application.

---

# 10. Admin Pages

Admin and counselor functionality belongs in:

```text
ui-prototype/admin-web/src/pages/
```

Potential pages include:

```text
pages/
├── DashboardPage.tsx
├── MothersPage.tsx
├── MotherDetailsPage.tsx
├── GoalsPage.tsx
├── ResourcesPage.tsx
├── AppointmentsPage.tsx
├── RewardsPage.tsx
├── CounselorsPage.tsx
└── SettingsPage.tsx
```

Use the project's actual requirements and designs as the source of truth.

---

# 11. Dummy Data Only

ALL application data MUST currently be fake/local data.

Do not connect to any external data source.

Mock data belongs inside the relevant application.

Mother PWA:

```text
ui-prototype/mother-pwa/src/data/
```

Admin Web:

```text
ui-prototype/admin-web/src/data/
```

Example:

```ts
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

Mock data should be realistic enough for demonstrations.

Avoid meaningless placeholders such as:

- Test User
- User 1
- foo
- bar
- Lorem ipsum

Create realistic names, resources, goals, appointments, statuses, and other
content.

---

# 12. Mock Data Coverage

Dummy data should demonstrate different application states.

For example:

```text
Active goal
Completed goal
Overdue goal
Upcoming appointment
Completed appointment
Assigned resource
Unassigned resource
Completed educational content
Incomplete educational content
Mother with many goals
Mother with no goals
Search with results
Search with no results
```

The prototype should make it possible to demonstrate meaningful UI states
without modifying source code during a demo.

---

# 13. TypeScript Types

Create reusable TypeScript domain models inside:

```text
src/types/
```

Example:

```ts
export interface Goal {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "overdue";
  points: number;
}
```

Mock data should use these types.

Avoid `any`.

Prefer explicit domain types.

---

# 14. Local State

Use React state to make interactions functional.

Example:

```tsx
const [goals, setGoals] = useState(mockGoals);
```

Actions should update frontend state so the application feels functional.

For example:

```tsx
const completeGoal = (goalId: string) => {
  setGoals((current) =>
    current.map((goal) =>
      goal.id === goalId
        ? { ...goal, status: "completed" }
        : goal
    )
  );
};
```

The user should see the UI change immediately.

No network request is necessary.

---

# 15. Hard Backend Restriction

THIS IS A FRONTEND-ONLY PROTOTYPE.

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
- Authentication providers
- Serverless functions
- Axios
- Application-data `fetch()` calls
- Fake HTTP calls
- Fake API layers

If a feature would normally require a backend, simulate the behavior using:

```text
React state
+
TypeScript
+
local dummy data
```

Do not create unnecessary service/repository abstractions that pretend a
backend exists.

---

# 16. Forms

Forms must function locally.

Example:

```tsx
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

After submission, update local state and provide appropriate UI feedback.

The application should behave as though the operation succeeded.

---

# 17. Prototype Authentication

Do NOT implement real authentication.

If login or role selection is necessary for the prototype, use predefined
dummy users.

For example:

```ts
type DemoRole =
  | "mother"
  | "counselor"
  | "administrator"
  | "volunteer";
```

A prototype login may simply select a dummy user and navigate to the correct
screen.

Do not implement:

- Password validation
- JWT
- OAuth
- Sessions
- Identity providers
- Authentication APIs

---

# 18. Routing

Every page must be reachable through normal application navigation.

Do not create disconnected pages.

Whenever a page is added:

1. Create the page.
2. Register its route.
3. Add the appropriate navigation path.
4. Connect relevant buttons/cards/links.
5. Verify back/cancel behavior.
6. Verify the complete workflow.

A demo user should NEVER need to manually type a URL to demonstrate a normal
workflow.

---

# 19. User Roles

Keep role responsibilities separated.

## Mother

Mother-facing functionality belongs in:

```text
ui-prototype/mother-pwa/
```

## Counselor / Administrator / Volunteer

Staff-facing functionality belongs in:

```text
ui-prototype/admin-web/
```

Do not expose admin functionality in the Mother PWA.

Do not place mother-specific mobile workflows in the Admin client unless
required for an administrative workflow.

---

# 20. Accessibility

Use semantic HTML whenever possible.

Ensure:

- Actions use `<button>`.
- Links use appropriate navigation elements.
- Inputs have labels.
- Images have meaningful alt text.
- Keyboard navigation works reasonably.
- Focus states are visible.
- Color is not the only indicator of state.
- Touch targets are appropriately sized in the PWA.

---

# 21. Agent Workflow

Whenever an agent receives a UI implementation request, it MUST first determine
which application is affected.

Possible answers:

```text
mother-pwa
admin-web
both
```

Then inspect the appropriate paths.

For Mother PWA work, inspect:

```text
ui-prototype/mother-pwa/src/pages/
ui-prototype/mother-pwa/src/components/
ui-prototype/mother-pwa/src/layouts/
ui-prototype/mother-pwa/src/data/
ui-prototype/mother-pwa/src/types/
ui-prototype/mother-pwa/src/styles/globals.css
```

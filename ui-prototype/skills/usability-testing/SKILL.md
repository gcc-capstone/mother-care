# MotherCare — Cross-Application Usability Testing

## Role

You are a senior React/TypeScript software engineer specializing in usability research, interaction instrumentation, and privacy-preserving analytics.

Implement a unified usability-testing system across BOTH MotherCare frontend applications:

1. **Mother's PWA** — the application used by mothers receiving services.
2. **Counselor/Admin Web App** — the application used by FamilyLife Network counselors, volunteers, and administrators.

This system will be used for COMP 451 user testing of UI Version 1.0 and planning UI Version 2.0.

**Both applications are mandatory deliverables. Do not consider this task complete if only one application is instrumented.**

## 1. Understand the Existing Architecture

Before modifying code:

- Inspect the root repository and any AGENTS.md instructions.
- Identify the Mother's PWA source directory.
- Identify the Counselor/Admin Web App source directory.
- Identify routing and state management in both applications.
- Inspect package.json files, shared packages, and monorepo configuration.
- Identify existing Git branches and worktrees.
- Identify available test infrastructure.
- Identify existing feature flags and environment configuration.

MotherCare has previously used separate branches/worktrees for UI development.

Do not assume the branches have been merged.

If both apps are present in the current checkout, implement instrumentation for both.

If an app exists only in a separate worktree or branch, inspect it safely and follow existing repository conventions. Avoid destructive checkout operations, branch deletion, or unrequested merges.

Clearly report any inaccessible application instead of claiming completion.

## 2. Architecture

Implement a shared usability-testing engine with integrations for each application.

Preferred structure, adapted to the repository:

```text
mother-care/
├── shared/
│   └── usability/
│       ├── types.ts
│       ├── sessionManager.ts
│       ├── eventTracker.ts
│       ├── metrics.ts
│       ├── exportService.ts
│       └── taskDefinitions.ts
│
├── [mother-pwa]/
│   └── src/
│       └── usability/
│           ├── UsabilityProvider.tsx
│           ├── NavigationTracker.tsx
│           └── UsabilityTestingPanel.tsx
│
├── [admin-web]/
│   └── src/
│       └── usability/
│           ├── UsabilityProvider.tsx
│           ├── NavigationTracker.tsx
│           └── UsabilityTestingPanel.tsx
│
└── docs/
    └── usability-testing-guide.md
```

These are illustrative directory names, not assumed actual paths.

If sharing code requires substantial refactoring, favor small isolated modules over adding architectural complexity.

Avoid duplicating business logic unnecessarily.

Do not modify ordinary application behavior.

## 3. Session Management

Implement a testing-session controller in BOTH applications.

Each session must include:

- Random anonymous session ID.
- Optional tester label (Tester 01, Tester 02, etc.).
- Application identifier: `mother-pwa` or `admin-web`.
- Task identifier.
- Session start/end timestamps.
- Task start/end timestamps.
- Event history.
- Task completion status.
- Assistance required.
- Ease-of-use rating (1–5).
- Optional observer notes.

Use `crypto.randomUUID()` for identifiers.

Recording must be disabled by default and activated explicitly by a test observer.

Support multiple tasks per testing session.

A task should only have one active timing interval.

Prevent accidental duplicate task starts and duplicated event listeners.

Use monotonic timing for accurate duration calculations.

## 4. Automatic Event Tracking

Implement lightweight global event tracking in both applications.

### Track

- Button clicks.
- Navigation link clicks.
- Route changes.
- Browser back/forward navigation.
- Repeated route visits.
- Task starts.
- Task completions.
- Task abandonment.
- Manual observer annotations.
- Time between interactions.

Each event should contain:

```typescript
type ApplicationId = "mother-pwa" | "admin-web";

interface UsabilityEvent {
  eventId: string;
  sessionId: string;
  application: ApplicationId;
  taskId: string;

  eventType:
    | "click"
    | "navigation"
    | "task_start"
    | "task_complete"
    | "task_abandon"
    | "task_incomplete"
    | "observation";

  timestamp: number;
  elapsedMs: number;
  timeSincePreviousEventMs: number | null;

  route: string;

  elementId?: string;
  elementType?: string;

  previousRoute?: string;
  nextRoute?: string;
}
```

Use:

- `performance.now()` for elapsed time.
- `Date.now()` for absolute timestamps.

Never store raw form input values, arbitrary text content, authentication tokens, cookies, network bodies, or sensitive URL parameters.

Use stable semantic `data-usability-id` attributes on important controls where necessary.

For all other elements, use safe generic identifiers.

Do not capture arbitrary DOM text.

### Important

Global event listeners must be cleaned up correctly.

Tracking should not interfere with React event propagation, routing, accessibility, or UI behavior.

The testing panel must be excluded from recorded interaction events.

## 5. Mother's PWA Test Coverage

The Mother's PWA supports mothers receiving assistance through FamilyLife Network.

Instrument existing user-facing navigation and workflows.

### Representative Task PWA-01: Find Diaper Assistance

**Tester instruction:**

"You've run out of diapers for your child. Find somewhere you could get help."

Track:

- Navigation from the starting page.
- Resource discovery.
- Category selection.
- Wrong turns.
- Repeated page visits.
- Time until task completion.
- Total clicks.

### Representative Task PWA-02: Find Assigned Goals

**Tester instruction:**

"Your counselor has assigned goals for you to complete. Find what you need to work on."

Track navigation to assigned goals and task completion.

### Representative Task PWA-03: Update Information

**Tester instruction:**

"You have an upcoming appointment. Find where you would update your information."

Track navigation and interactions with the existing information-update workflow.

### Representative Task PWA-04: Find Assigned Resources

**Tester instruction:**

"Your counselor recommended a resource for you. Find that resource."

Track whether the tester locates assigned resources without assistance.

### Representative Task PWA-05: Find a Check-in or Form

**Tester instruction:**

"You need to complete information requested by your counselor. Find where you would do that."

Track interactions with existing forms or check-in features.

### Additional Coverage

Inspect and instrument any implemented:

- Intake forms.
- Educational videos or credit activities.
- Personalized recommendations.
- Appointment-related navigation.
- Mother dashboard actions.

Only define executable tasks for functionality that currently exists.

Do not add new product features simply to satisfy a usability task.

## 6. Counselor/Admin App Test Coverage

The Counselor/Admin Web App is a distinct application with different navigation patterns and more complex administrative tasks.

It must have the same testing capabilities as the Mother's PWA.

### Representative Task ADMIN-01: Find a Mother

**Tester instruction:**

"You are a counselor. Locate the profile of a mother you are currently working with."

Track:

- Dashboard navigation.
- Use of any existing search or filtering functionality.
- Clicks required to reach the profile.
- Wrong turns or backtracking.
- Task duration.

### Representative Task ADMIN-02: Assign a Goal

**Tester instruction:**

"Assign a new goal to a mother you're counseling."

Track the sequence through the existing goal assignment workflow.

### Representative Task ADMIN-03: Assign a Resource

**Tester instruction:**

"Find a resource and assign it to a mother who needs assistance."

Track resource discovery and assignment.

### Representative Task ADMIN-04: Manage a Form

**Tester instruction:**

"Find where you would assign or edit a form for a mother."

Track navigation and interactions with existing form-management controls.

### Representative Task ADMIN-05: Manage Resources

**Tester instruction:**

"You've discovered that a resource's information needs updating. Find where you would make that change."

Track resource database navigation and editing workflow.

### Representative Task ADMIN-06: Review Mother Progress

**Tester instruction:**

"Find information about a mother's progress on her assigned activities."

Track navigation through existing progress or analytics views.

### Additional Coverage

Inspect and instrument implemented:

- Counselor dashboards.
- Follow-up management.
- Resource database administration.
- Role-based administration.
- Volunteer workflows.
- Search and filter interfaces.

Never bypass existing authorization.

Do not require testers to use real mother records.

Use synthetic test accounts and sample data.

## 7. Observer Testing Panel

Create a lightweight collapsible testing panel in BOTH applications.

Both panels should have consistent behavior and appearance.

### Controls

- Start new session.
- Set anonymous tester label.
- Select representative task.
- Start task timer.
- Mark task completed.
- Mark task abandoned/incomplete.
- Toggle "Assistance provided."
- Rate task ease from 1 to 5.
- Add observer notes.
- Start another task.
- End session.
- Export current session.
- Open results summary.

Display the currently active task and elapsed time.

The panel should not obstruct application controls.

Panel interactions must not affect task click counts.

### Activation

Enable the panel only through an explicit local development/testing configuration.

Example:

```text
VITE_ENABLE_USABILITY_TESTING=true
```

Inspect the actual build system before choosing the environment variable naming convention.

Do not rely solely on a URL parameter.

A production build must not permit usability recording, regardless of URL parameters or client-side state.

## 8. Data Collection and Storage

Prefer an in-memory session manager.

Optional sessionStorage persistence is acceptable to prevent accidental data loss.

No backend database is required.

No external analytics APIs or SDKs.

No automatic network transmission of testing data.

Keep exports local to the observer's browser.

Do not track ordinary application usage outside explicitly started test sessions.

Only use test accounts and synthetic data.

Explicit participant consent is required before recording.

## 9. Metrics

Calculate metrics separately for each task and application.

### Per-task metrics

- Total time.
- Total clicks.
- Navigation count.
- Repeated route visits.
- Number of assistance interventions.
- Completion status.
- Ease-of-use rating.
- Time between consecutive interactions.

### Application-level metrics

For the Mother's PWA:

- Number of participants.
- Number of completed tasks.
- Completion rate.
- Average completion time among completed tasks.
- Average clicks per task.
- Average ease-of-use rating.
- Most frequently revisited routes.

For the Admin App:

Calculate the same metrics independently.

### Combined overview

Provide a combined report with separate sections:

1. Mother's PWA results.
2. Counselor/Admin results.
3. Cross-application testing overview.

Avoid averaging unrelated tasks into a single overall "usability score."

Do not equate a long delay between clicks with cognitive load automatically.

Timing data suggests possible hesitation but must be interpreted alongside observation and feedback.

## 10. Data Export

Support:

```text
mothercare-mother-pwa-events.csv
mothercare-admin-events.csv

mothercare-mother-pwa-summary.csv
mothercare-admin-summary.csv

mothercare-usability-sessions.json
```

Each event export must include the application identifier and task ID.

Summary CSVs should include:

```text
application
sessionId
testerLabel
taskId
status
completedWithoutAssistance
assistanceProvided
durationMs
totalClicks
navigationCount
repeatedRouteVisits
easeOfUseRating
observerNotes
```

Implement proper CSV escaping and spreadsheet formula-injection protection.

Provide JSON export for detailed event sequence analysis.

### Combined Reporting

Since the two applications may run on different origins or environments, do not assume they can share browser storage.

Implement a simple local import mechanism for JSON session exports.

Allow an observer to import exports from either application into a unified summary.

Deduplicate session and event IDs during import.

Do not require a central backend to combine results.

## 11. Results Dashboard

Implement a lightweight results interface.

### Required Views

**Mother's PWA**

Show task results from mother-facing workflows.

**Admin App**

Show task results from counselor/admin workflows.

**Combined**

Show separate per-application results and overall participation counts.

Include:

- Task completion rate.
- Average task completion time.
- Average clicks.
- Average ease-of-use rating.
- Repeated routes.
- Event timelines.

Provide a readable chronological event list for individual testing sessions.

This is especially important for preparing the COMP 451 presentation.

For example, the observer should be able to see:

```text
Tester 04 — Mother PWA
Task: Find Diaper Assistance

00:00 Task started
00:03 Clicked navigation menu
00:07 Opened profile
00:12 Returned to dashboard
00:18 Opened resources
00:26 Selected diaper resources
00:32 Task completed

Completed: Yes
Assistance: No
Clicks: 5
Duration: 32 seconds
Ease rating: 3/5
```

The timestamps and event labels must come from recorded data.

Do not fabricate observations or claim that an interaction represents a mistake unless the observer labeled it as such.

## 12. Testing and Validation

Write or extend tests for:

- Session creation.
- Task lifecycle.
- Click capture.
- Route tracking.
- Event ordering.
- Timing accuracy.
- Panel-event exclusions.
- Privacy filtering.
- Production protection.
- CSV escaping.
- JSON export/import.
- Duplicate import handling.
- Per-app metrics.
- Combined metrics.

Run relevant lint, type-check, and build commands for BOTH applications.

Verify each application's testing panel independently.

Do not consider compilation of one app sufficient.

## 13. Git and Integration Requirements

MotherCare has previously used separate branches/worktrees for its UI development.

Inspect the current repository state before modifying files.

Rules:

- Preserve existing uncommitted changes.
- Do not reset branches.
- Do not delete worktrees.
- Do not make destructive merges.
- Do not change unrelated UI behavior.
- Respect established shared-package conventions.
- Prefer small isolated changes that are easy to merge.
- If working in multiple worktrees, clearly document changes in each.

If the two apps cannot be modified from the current workspace, report the exact blocker and give the integration steps rather than pretending both were completed.

## 14. Documentation

Create:

```text
docs/usability-testing-guide.md
```

The guide must explain:

1. How to start the Mother's PWA in testing mode.
2. How to start the Admin App in testing mode.
3. How to create an anonymous session.
4. How to conduct and record representative tasks.
5. How to mark task outcomes.
6. How to export CSV/JSON.
7. How to combine results across the applications.
8. How to interpret timestamps and navigation behavior.
9. How to use the data in COMP 451's written report and presentation.

## 15. Acceptance Criteria

### Mother's PWA

- [ ] Testing panel works.
- [ ] Anonymous sessions work.
- [ ] Representative tasks are configured.
- [ ] Clicks are recorded.
- [ ] Navigation is recorded.
- [ ] Timing is accurate.
- [ ] CSV and JSON export work.

### Counselor/Admin App

- [ ] Testing panel works.
- [ ] Anonymous sessions work.
- [ ] Representative tasks are configured.
- [ ] Clicks are recorded.
- [ ] Navigation is recorded.
- [ ] Timing is accurate.
- [ ] CSV and JSON export work.

### Shared Reporting

- [ ] Both apps use a compatible event schema.
- [ ] Results remain separated by application.
- [ ] Exports from both apps can be imported.
- [ ] Combined reporting works.
- [ ] Raw event timelines can be inspected.
- [ ] No sensitive user information is captured.
- [ ] Production builds cannot enable recording.
- [ ] Existing application functionality remains intact.

## 16. Implementation Priorities

Implement in this order:

**Phase 1 — Essential**

1. Shared event data structures.
2. Session and task lifecycle.
3. Automatic click tracking.
4. Route tracking.
5. Testing panel in the Mother's PWA.
6. Testing panel in the Admin App.
7. CSV/JSON export in both.

**Phase 2 — Reporting**

8. Per-task metrics.
9. Per-app summaries.
10. JSON import/combined report.
11. Chronological session timelines.

**Phase 3 — Quality**

12. Automated tests.
13. Documentation.
14. Verification of both application builds.

Prioritize a reliable implementation in BOTH applications over advanced dashboard styling.

## 17. Execution Instructions

Proceed autonomously and implement the system.

First inspect the repository and identify the actual application structure.

Do not assume filenames, routing libraries, or directory paths.

Build the smallest reliable implementation that works for both UIs.

Do not build production tracking infrastructure.

Do not modify the application's core business logic.

Do not add external services.

At completion, report:

- Files changed.
- Which app integrations are complete.
- How to enable tracking in each app.
- How to start a session.
- How to export and combine results.
- Tests and builds executed.
- Any blockers or limitations.

**Definition of done:** A COMP 451 observer can independently test the Mother's PWA and Counselor/Admin Web App, record anonymous interaction traces, measure task performance, and export usable results for a 5–7 minute presentation.

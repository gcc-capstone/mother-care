# MotherCare usability testing (COMP 451)

Both frontends use the same local recording engine, panel, schema (version 1), metrics and export code in `shared/usability/`. Neither app imports application code from the other. The integration adds route tracking inside each existing BrowserRouter and semantic IDs on key controls. Existing routes, application state, demo role restrictions and local workflows remain in place.

## Run each application

From `ui-prototype/`, use Node 24+ (the dependency-free tests use Node's TypeScript support) and the existing workspace dependencies (`npm ci` on a fresh checkout).

Run in separate terminals:

```bash
npm run dev:usability:mother
# http://localhost:5173
```

```bash
npm run dev:usability:admin
# http://localhost:5174
```

These commands explicitly set `VITE_ENABLE_USABILITY_TESTING=true`. Alternatively, copy the application's `.env.usability.example` to its `.env.local` and start its usual development command. Restart Vite after changing configuration. Use localhost or an HTTPS development origin for `crypto.randomUUID()`.

Without the flag, `npm run dev:mother` / `npm run dev:admin` show the normal app with no testing panel. Remove the flag from `.env.local` to turn testing off. URL parameters and browser storage cannot enable the panel.

**Builds and previews never record**, even if the flag is true, `NODE_ENV=development`, or a custom build mode is used. Each Vite configuration sets a compile-time constant only for an explicitly enabled development server. The lazy import of the recording interface is eliminated during builds. Use the development servers for research; do not deploy a testing build.

## Prepare and consent

1. Use fictional prototype records only. Obtain explicit participant consent before recording. Explain what is captured and how you will use the anonymous traces for COMP 451.
2. Open the **Usability testing** disclosure at the top of the page. It occupies normal page space and collapses without covering application controls.
3. Optionally enter a label such as `Tester 01`. Labels must match `Tester ` followed by one to three digits; do not enter a name or email address.
4. Leave **Anonymous tester ID** blank to generate a random UUID, or paste that participant's UUID from an earlier session. Reuse the same UUID when that participant tests the other app so the combined participant count is accurate. Matching labels alone do not link identities.
5. Check **Participant has explicitly consented**, then select **Start new session**. Session and tester IDs are independent random UUIDs. Recording is off before this action and after **End session**.

Data is kept **only in memory**, with no backend, analytics SDK, automatic transmission or browser storage. Export before refreshing, closing, or restarting the page. An unload warning helps prevent accidental loss but cannot recover data. Export after each participant; keep the original JSON files as your research records.

## Conduct tasks in either app

Choose a task, read its tester instruction, and establish the starting page and success criterion before starting the timer. Preparation text is for the observer. Avoid giving navigation hints unless intentionally recording assistance.

Select **Start task timer**, collapse the panel, and let the participant work. Only one task can run at a time; repeated attempts get distinct attempt IDs. The collapsed disclosure shows the active task and elapsed time. Opening or using observer controls never increases application click counts.

At the outcome:

- **Mark completed**: the participant met the agreed success criterion.
- **Mark abandoned**: the participant gave up.
- **Mark incomplete**: the attempt stopped without completion (for example, the study time limit).
- **Assistance provided** records the first intervention. **Record another assistance intervention** counts additional interventions. Assistance cannot be erased by toggling a checkbox after it happened.
- Ask for a 1–5 ease rating (1 difficult; 5 easy). An unrated task stays blank, not zero. You may set or correct the latest task's rating before ending the session.
- Add explicit observer notes. Draft notes save when finishing a task, ending a session, starting another task, or exporting. Use **Add observer note** to timestamp a specific observation during the task. Notes entered after completion attach to the most recent attempt; before the first task they attach to the session.

Select another task and start its timer to continue within the session. Returning the app to the starting page between tasks is recorded with an empty task ID and excluded from task metrics. **End session** automatically marks any running task incomplete. Export afterward using **Export all sessions JSON**, or export the current session before ending it.

## Executable task catalog

These tasks map to features in this checkout; the panel displays the complete instruction and preparation text.

| Mother's PWA | Workflow / success criterion |
| --- | --- |
| PWA-01 | Find diaper assistance through Resources, categories/search and resource contact details. |
| PWA-02 | Find and open an assigned goal. |
| PWA-03 | Find Profile to update synthetic information before an appointment. There is no separate PWA appointment screen. |
| PWA-04 | Open a resource under **From your counselor**. |
| PWA-05 | Find and open an assigned form/check-in. |
| PWA-06 | Complete intake using sample details, including the existing profile-change confirmation. |
| PWA-07 | Complete an unfinished learning guide in Earn for credits. These are prototype learning guides, not embedded videos. |

Home/dashboard, notifications, store, recommendations, forms, goals, profile and education/credit navigation are covered by global tracking. Other controls get safe generic element identifiers when no semantic ID is present.

| Counselor/Admin | Workflow / preparation |
| --- | --- |
| ADMIN-01 | Locate a fictional mother using the case directory and existing search/filter controls. Start in Counselor role. |
| ADMIN-02 | Create/assign a goal for the selected fictional mother. |
| ADMIN-03 | Discover a resource and share a recommendation with a follow-up. |
| ADMIN-04 | Assign a published form as Counselor, or edit the form library as Administrator. Decide the variant in advance and note it. |
| ADMIN-05 | Find the resource catalog editor and save a synthetic update; requires Administrator demo role. |
| ADMIN-06 | Review the selected case's goals/progress as Counselor, or Analytics as Administrator. Decide the variant in advance. |
| ADMIN-07 | Find a follow-up and record a synthetic contact outcome. |
| ADMIN-08 | Review care group membership as Administrator. |

Set **Demo role** and the selected case before timing, using the app's existing controls. The testing panel does not grant roles or bypass access controls. This checkout offers Administrator and Counselor demo roles; no separate Volunteer role/workspace is implemented. Appointment, meeting, follow-up, directory, search/filter and administration interactions are globally instrumented. Reloading resets the prototype's local business state as before; export recordings first.

## Export and combine results

While a session is active, **Export current JSON / events CSV / summary CSV** exports only that session. **Export all sessions JSON** includes local recordings and imported sessions. Open **Results summary** to download each application's CSVs across all collected sessions:

```text
mothercare-mother-pwa-events.csv
mothercare-admin-events.csv
mothercare-mother-pwa-summary.csv
mothercare-admin-summary.csv
mothercare-usability-sessions.json
```

Browsers may suffix filenames on repeated downloads. Preserve originals with a participant/date folder or rename the copies so later downloads do not replace your research records. CSV fields are quoted, embedded quotes/newlines escaped, and spreadsheet-formula prefixes neutralized. JSON preserves detailed events, task attempts and deliberate observer notes without spreadsheet escaping.

To combine results from different origins/computers:

1. Export JSON from each app and transfer the files locally to the observer's computer.
2. Open either app in usability development mode. A new recording session is not needed for import.
3. Use **Import MotherCare session JSON** for each file. Imports are local, validated and limited to 10 MB / 500 sessions per file. Unknown properties are dropped, routes are sanitized again, and invalid data produces an error without replacing results.
4. Reimporting the same file deduplicates session IDs, event IDs and task attempt IDs. A completed snapshot takes precedence over an earlier running snapshot. Importing a snapshot of the currently active local session requires ending that session first. Conflicting identities are rejected.
5. Use **Combined**, **Mother's PWA**, or **Counselor/Admin** in Results view. The combined view retains separate application sections and shows total sessions and distinct anonymous tester IDs.
6. Export all sessions JSON for an archive, and the two applications' summary/event CSVs for analysis. The identical CSV schemas can be appended; keep the `application`, `taskId` and `taskAttemptId` columns when joining tables.

Select a session in **Session timeline** to inspect its chronological event list, task context, click gaps, navigation type and observer annotations. **Individual task outcomes** provides per-attempt results including notes and intervention counts. No observations or mistakes are inferred or fabricated.

## Schema and interpretation

A JSON envelope contains `schemaVersion: 1`, `exportedAt` and `sessions`. Each session includes application, anonymous tester/session IDs, optional anonymous label, consent flag, start/end timestamps, duration, session notes, task attempts and events. A task has a representative `taskId` and a unique `attemptId` (exported as `taskAttemptId` in CSV/events) so retries cannot collapse into one task.

- `timestamp`, `startedAt`, `endedAt`: Unix milliseconds from `Date.now()`. These support chronological alignment. Clock corrections can move absolute timestamps backward.
- `elapsedMs`: monotonic milliseconds since session start, based on `performance.now()`. Events are ordered by this clock; it is the reliable interval clock.
- `taskElapsedMs`: monotonic offset from the attempt start, or null outside a task.
- `durationMs`: monotonic duration; active snapshots show elapsed time so far. An ended session cannot keep accumulating time.
- `timeSincePreviousEventMs`: gap between any two recorded events, including observer/lifecycle events.
- `timeSincePreviousInteractionMs`: gap between clicks or change events, ignoring observer and route events.
- `timeSincePreviousClickMs`: gap between clicks only. The first click in each task has a null gap; route/observer events do not reset it.
- `eventType`: session start/end, click, change, navigation, task start/complete/abandon/incomplete, or observation. Change events record only the control type/approved semantic ID, never its value. Keyboard button activation produces the browser's ordinary click event.
- `navigationKind`: initial, PUSH, REPLACE or POP. React Router reports POP for browser back/forward; the direction is not inferred. Route keys prevent duplicate effect recordings in React StrictMode. Query-only navigation is recorded at the safe route template and never exposes the query.
- `route`, `previousRoute`, `nextRoute`: allowlisted static paths or templates such as `/resources/:id` and `/admin/mothers/:motherId`. Record IDs, URL queries/fragments, arbitrary unknown paths and external destinations are not retained. Unknown routes become `/:unrecognized`.

**Task metrics** include time, clicks on interactive controls, navigation count, repeated template visits, intervention count, outcome, unassisted completion, ease rating and click/interaction interval arrays. The task's starting route is its first visit; later navigation to an already visited template is a revisit. Moving between different records of the same template can count as revisiting the template; this is intentionally less specific than tracking record identities. Route revisit counts are descriptive, not automatically errors.

**Application metrics** include participants, finished/completed/active attempts, success rate, mean completed-task duration, mean clicks, mean ease rating, frequent revisited templates and the same metrics grouped by representative task ID. Success rate is completed divided by finished attempts, including abandoned/incomplete attempts in the denominator. Active snapshots are shown separately and excluded from that denominator. Mean duration uses completed attempts only. Mean clicks and mean ease use finished attempts; ease excludes unrated values. Empty sets show a dash rather than a misleading zero.

Retries count as attempts, not extra participants. Participant counts use UUIDs, not labels. Reusing one participant's UUID across both apps permits a correct combined count without personal identity. If IDs are not reused, combined counts are distinct anonymous IDs rather than a verified count of unique people.

Automatic logs never read application form values, DOM text, aria labels, ordinary DOM IDs, authentication state, cookies, network bodies or URL parameters. Only exact approved semantic IDs are retained; other controls use generic types. Freeform notes are an explicit exception entered by the observer: do not put personal/sensitive information into them. Imports preserve intentional observer notes.

## COMP 451 report and 5–7 minute presentation

Record app/UI version, study date, task variant, starting state, success criterion, number of participants/attempts and consent procedure in your methods. Keep Mother and Counselor/Admin results separate and compare the same tasks across UI versions. When aggregating retries, say whether you used all attempts or only the first attempt per participant/task. Use the task summary CSV to calculate first-attempt statistics if needed; the panel reports all attempts.

Use one table/chart per app for completion counts, task time among completed attempts, click counts, ease ratings and assistance. Show denominators and missing ratings. Do not reduce unrelated tasks to a single overall usability score. Pick a real recorded event timeline and a corresponding observer note to illustrate a navigation issue for the presentation; redact notes if needed. Long click gaps alone do not establish cognitive load: consider reading time, interruptions, comments and observer feedback. Repeated visits alone do not establish a wrong turn.

A practical presentation allocation is 1 minute for study setup, 2 minutes for PWA findings, 2 minutes for Admin findings, and 1 minute for observations and proposed UI v2 changes. Use only actual participant data; automated smoke-test sessions are synthetic verification, not study participants.

## Verification

```bash
npm test                       # Shared engine/tracker tests exercise both application IDs, plus existing PWA tests
npm run lint                   # Both apps and shared usability modules
npm run build                  # tsc -b and Vite production build for each app
npm run test:usability:production # Assert recording code is absent from both dist bundles
npm run check:data --workspace admin-web
```

`shared/usability/tests/browser-check.mjs` exercises both real browser panels: consent gating, listener behavior in StrictMode, task transitions, back/forward routes, privacy, assistance, notes, current/all JSON, CSV downloads, combining origins, deduplication, timelines, an existing Admin goal-assignment workflow, and verifies that the panel does not introduce mobile/desktop overflow. Start both usability dev servers first. Run using an available Playwright installation and its Chromium browser:

```bash
# With Playwright installed locally:
node shared/usability/tests/browser-check.mjs
# Or reuse an existing installation without adding application dependencies:
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node shared/usability/tests/browser-check.mjs
```

Playwright/Chromium are optional verification tools, not application dependencies; the automated engine tests need neither. An installation must include Chromium and its OS libraries. `MOTHER_URL` and `ADMIN_URL` can override server URLs. `PRODUCTION_URLS=http://localhost:4173,http://localhost:4174` additionally checks that previews cannot expose the panel despite URL/storage flags. Start `npm run preview:mother` and `npm run preview:admin` in separate terminals after building for that check.

For a production-gate regression check, run `VITE_ENABLE_USABILITY_TESTING=true npm run build`, then inspect both preview apps; neither should show the panel. The production JS should contain no `UsabilityTesting` chunk, `consentConfirmed`, `task_start`, or `mothercare-usability-sessions.json` recording implementation. The source-level semantic attributes on application controls are inert without the dev-only recording integration.

Verification found existing PWA horizontal overflow at 320px (338px scroll width with the observer panel hidden). The panel adds no overflow at 320, 390, 430 or 768px; the existing layout is preserved to keep this change focused on instrumentation.

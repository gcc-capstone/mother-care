# MotherCare Admin Web

Staff-facing React/TypeScript prototype. All application data comes from typed
fictional records in `src/data/mockData.ts`; `DemoProvider` holds session state.
Reloading resets the demo. There are no API calls, authentication integrations,
backend services, cross-application imports, or external font requests.

## Run and verify

After installing the workspace dependencies, run from `admin-web/`:

```bash
npm run dev        # http://localhost:5174
npm run typecheck  # strict TypeScript checking
npm run build     # TypeScript + production Vite build
npm run lint
```

## Connected workflows

- Care dashboard: shared review queue and care workflow links.
- Analytics (admin): county/date summaries, counselor activity, local CSV/PDF downloads,
  and session export history. Exports contain aggregate counts without names or notes.
- Mothers: search, status/county filters, sorting, pagination, quick intake,
  case preview, counselor/status updates, and links to related workflows.
- Goals: selected mother's goals, search/status filters, pagination, create,
  edit, complete, reopen, and deletion with a keyboard-accessible confirmation.
- Resources: directory search and service/county/location/availability filters;
  assign a referral to the selected mother and optionally link a goal.
- Follow-ups: search and mother/status filters, pagination, create goal reviews,
  preserve original feedback, log outcomes/summary visibility, and reopen reviews.
  Successful goal reviews complete their linked goal.

- Appointments: schedule changes update the mother record and appointment list.
- Forms: assign published forms with deadlines and simulate completion; assignments
  retain their original questions and version.
- Meeting notes: log mother-visible summaries and separate internal notes; optional
  follow-up dates add queue entries. Case profiles show related activity.
- Admin form builder: create templates, edit/reorder/remove questions, preview,
  save drafts, publish versions, and delete templates without deleting assignments.
- Admin resource catalog: add/edit/delete resources; changes appear in recommendations.
- Admin care groups: create cohorts, select members, and assign their counselor.

The header demo role selector uses React state, defaults to Administrator, and
persists across navigation. Counselors have all care links; administrators have
those same links plus Form builder, Resource catalog, Analytics, and Care groups.
Admin-only demo routes redirect counselors to the shared dashboard. This is a
frontend demonstration, not authentication or security enforcement.

The five existing `/admin/...` routes remain available. Mother detail URLs use
`/admin/mothers/:motherId`, synchronize the selected mother, and show a fallback
for missing records. Unknown routes offer a dashboard link.

Demo due/overdue calculations use **October 1, 2026**. Dashboard counts derive
from current session records and the selected due-date range. The engagement
chart is a separate, labeled illustrative dataset.

Styling uses Tailwind utilities and application-wide tokens/base behavior in
`src/styles/globals.css`. Existing screen filenames are retained; shared layout,
UI primitives, types, data, and state are extracted into their own directories.

## Verification performed

Strict type checking, production build, and ESLint passed. Chromium checks covered
all five sections at 1440, 1366, 1024, 768, and 390 pixels, the workflows above,
empty states, deep links, unknown IDs/routes, form validation, dialog focus/Tab/
Escape, and CSV/PDF downloads. Checks detected no browser runtime errors or
external application requests. All changes are confined to Admin Web.

Additional Chromium checks passed for both role menus, new workflow state propagation,
form version snapshots, groups, and layouts at 1440, 1024, and 390 pixels.

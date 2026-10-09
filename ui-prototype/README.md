# MotherCare UI Prototype

Two independent React, TypeScript, and Vite apps for customer feedback and user
testing. Both use local dummy data and frontend state, with no backend or authentication.

- `mother-pwa/`: mother-facing screens, mobile layout, bottom navigation, data, and assets.
- `admin-web/`: staff-facing screens, desktop layout, sidebar, and assets.

Each app owns its package manifest, HTML entry point, Vite and TypeScript
configuration, public assets, and build output. The root is an npm workspace
with a shared dependency lockfile. The production frontend lives in `frontend/`.

## Install

From `ui-prototype/`, with Node.js and npm installed:

```bash
npm install
```

## Run

Run these in separate terminals to use both apps:

```bash
npm run dev:mother  # http://localhost:5173
npm run dev:admin   # http://localhost:5174
```

`npm run dev` also starts the mother app. Mother routes are `/`, `/forms`,
`/resources`, `/earn`, and `/goals`. Admin routes retain `/admin/performance`,
`/admin/motherselection`, `/admin/admingoals`, `/admin/reccomendresources`, and
`/admin/followup`. The admin root redirects to `/admin/dashboard`.

## Build and lint

```bash
npm run build         # build both apps
npm run build:mother  # mother-pwa/dist/
npm run build:admin   # admin-web/dist/
npm run lint          # lint both apps
```

Each app also supports `npm run dev`, `npm run build`, `npm run lint`, and
`npm run preview` from its own folder, and can be installed independently
with `npm install` there if needed.

## Preview builds

```bash
npm run preview:mother  # http://localhost:4173
npm run preview:admin   # http://localhost:4174
```

Deploy the two `dist/` directories independently. Configure each static host to
serve its `index.html` for client-side routes, including direct links to admin pages.

## Mother experience updates

- The homepage shows an updates island directly below the mood check-in
  whenever notifications are pending. Each update links to details and can be
  dismissed individually or together. The island disappears when no updates remain.
- Resource details accept private outcomes, helpfulness, comments, and follow-up
  requests. Mothers can edit their own feedback; the directory does not show reviews.
  Feedback stays in browser local storage and can be downloaded as JSON.
- In the admin app, **Recommend a resource → Private resource feedback** imports
  that JSON, filters feedback, and marks it reviewed. Updated feedback becomes unread
  again. Admin imports and review statuses stay in that app's browser local storage.
  These independent apps have no automatic syncing, authentication, or access enforcement.
- Resources include sample counselor recommendations and up to five recent views
  and searches per demo mother. Search history records after a short pause or submission.
- Seven forms include intake, monthly check-in, support planning, childcare, baby
  supplies, transportation, and contact updates. Profile details are editable before
  submission; form edits do not change the profile.
- Profile fields cover contact preferences, language, household size, children’s
  ages, optional due date, housing, transportation, and support needs. Additional
  household fields are optional. Profile, form, and recent activity changes use
  session state and reset on reload, as do the original demo interactions.

## Admin workflow updates

- Care dashboard, mother directory, case details, and counselor caseloads show
  mother-reported mood faces. The sample moods match overlapping mother demo records;
  a missing check-in is shown explicitly. Moods do not sync between apps.
- The sidebar has one **Forms** entry (Assignments / Previous forms) and one
  **Resources** entry (Recommend to a mother / Resource catalog). Catalog management
  and form editing remain available to the administrator demo role.
- **New form** opens a full page editor at `/admin/form-builder/new`.
  Previous forms support editing, copying, and deletion. Each question can use a
  profile field or custom text as a pre-populated response. The preview uses the
  selected mother. Assignments preserve the published question text, pre-population
  settings, and resolved responses when the source form is later changed.
- Recommendations guide staff through choosing a mother, selecting a resource,
  and reviewing the message and follow-up date. Catalog entries also link directly
  into the recommendation flow.
- New and edited resources include a default follow-up duration of 1–365 days.
  New recommendations calculate an editable follow-up date from the fixed demo
  date (October 1, 2026). Existing referral dates remain part of their saved history.

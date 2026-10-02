# MotherCare Mother PWA

A mobile-first React and TypeScript prototype. All family information, goals,
form responses, notifications, learning progress, reservations, and redemptions
use fictional local data and React state. Changes survive navigation and reset
on a full reload. No backend, authentication, or application-data requests exist.

## Run and check

After installing the existing npm workspace dependencies from `ui-prototype/`:

```sh
npm run dev --workspace mother-pwa
npm run typecheck --workspace mother-pwa
npm run build --workspace mother-pwa
npm run lint --workspace mother-pwa
npm run preview --workspace mother-pwa
```

The development server uses port 5173; the production preview uses port 4173.
The static host must serve `index.html` for client routes. This app currently
expects deployment at the origin root, separately from Admin Web.

## Prototype walkthrough

- Profile: use the Demo mother selector to switch between Jan Miller and the five
  mothers shown in the admin roster. Each keeps separate edits, forms, goals, mood,
  notifications, lesson progress, reservations, and credits until reload.
- Home: select a mood, complete a goal, open recommendations, or edit your profile.
- Goals: open goal details, complete/undo goals, expand completed goals, and add
  your own weekly goal. Details link to related lessons, groups, and check-in forms.
- Forms: fill out intake, check-in, or childcare forms; submit and review responses.
- Resources: search, select a category, filter open resources, edit your sample
  location, and open resource details. The resource inventory stays local to the
  Allegheny Valley demo area.
- Earn: open a learning guide, complete it once for credits, or reserve a parenting
  group place. Reservations do not award attendance credits.
- Store: inspect rewards and redeem affordable items. One of each item can be
  reserved per visit. Home and Earn display the same updated credit balance.
- Notifications: open the linked task, dismiss individual items, or dismiss all.

The demo date is October 1, 2026. Shared domain types live in `src/types/`, mock
records in `src/data/`, and session state in `src/layouts/MotherStateProvider.tsx`.
The existing `src/screens/` organization is retained. Shared page layout and
navigation live in `src/components/`. Tailwind utilities style the UI, with only
application tokens and base rules in `src/styles/globals.css`.

## PWA behavior

The manifest, 192px/512px mask-safe icons, standalone metadata, safe-area spacing,
and production service worker support installation and offline navigation after
an initial online visit. The worker only caches the built shell and local static
assets. It is disabled in development. Reloading offline still resets React
session data. Serve production output over HTTPS or localhost.

# CalvinBall Supply Chain Intelligence — Frontend

A React + Vite + TypeScript port of the `CalvinBall_Supply_Chain_Intelligence_v0.8` single-file
HTML prototype. It faithfully replicates the original look, content, and every interaction —
restructured into a real component-based frontend project.

## Run it

```bash
cd frontend
npm install      # uses an override for browserslist (registry has a broken 4.28.4 tarball)
npm run dev      # http://localhost:5173
```

You'll land on a **login screen** (Back4App auth). A demo account is seeded:

```
username: demo
password: calvinball123
```

…or click **Create an account** to register your own. After signing in you get the cockpit;
the sidebar **Log Out** ends the session. Sessions persist across reloads (Parse stores them
in `localStorage`).

Other scripts:

```bash
npm run build    # type-check (tsc) + production build to dist/
npm run preview  # serve the production build
```

## What it does

A decision-intelligence cockpit for a consumer-brands supply chain, with four personas you can
switch between (keyboard `1`–`4` or the persona shelf):

| Persona | Role | Flagship interaction |
|---------|------|----------------------|
| **CSCO** (Vikram) | Chief Supply Chain Officer | Revenue waterfall · Event radar |
| **Demand Planning** (Anjali) | Head of Demand Planning | The Signal Stack (30% → 75% accuracy) |
| **Inventory Risk** (Rajiv) | Inventory & Replenishment | East Depot rebalance simulator |
| **Q-Comm** (Priya) | Q-Commerce & Modern Trade | Live dark-store rerouting simulator |

Each persona has a Brief / Why / Signal / Ask "playbook" set, surfaced through hero tiles and a
modal canvas. Other features: light/dark theme (persisted), a floating **Ask CalvinBall**
conversational widget, a journey rail, persona-aware sidebar, toasts, and workflow-completion panels.

## Architecture

The original was one 4,300-line HTML file. This port keeps fidelity by separating concerns:

```
src/
  main.tsx              # React entry
  App.tsx               # layout: header · shell (sidebar + content) · ask · modal · toasts
  AppContext.tsx        # all React state (persona, step, modal, theme, ask, toasts) +
                        #   bridges that connect the ported engine to React + window globals
  styles/app.css        # the original stylesheet, verbatim
  components/           # AppHeader, PersonaShelf, JourneyRail, Sidebar, PersonaMain,
                        #   AskWidget, Modal, Toasts
  data/
    personas.ts         # PERSONAS, sidebar nav/history
    content.ts          # hero tiles + library card markup
    cells.ts            # the 16 modal "cells" (Brief/Why/Signal/Ask × 4 personas)
  engine/
    shell.ts            # shared state object + toast/journey/closeModal bridge
    ask.ts              # the Ask conversational engine (intent pattern-matching)
    flagships.ts        # the 5 interactive simulators (depot, signal stack, waterfall,
                        #   radar, q-comm rerouting), ported and exposed to the UI
  auth/
    AuthContext.tsx     # auth state (current user, login/register/logout)
  parse/
    config.ts           # Back4App credentials (env-overridable)
    client.ts           # Parse SDK init + helpers
  components/LoginPage.tsx
```

## Back4App / Parse authentication

The app is gated behind a Parse (Back4App) login. `App.tsx` renders `LoginPage` until a user
session exists, then mounts the cockpit.

**Why the client key is patched in:** this Back4App app authenticates the browser SDK with its
**Client Key** (`X-Parse-Client-Key` header) — not the JavaScript Key. The Parse JS SDK only sends
the App ID + JavaScript/Master keys, so [`parse/client.ts`](src/parse/client.ts) wraps the SDK's
REST controller `ajax` to attach the `X-Parse-Client-Key` header on every request (Back4App's CORS
config explicitly allows it). Login/signup/logout then work normally via `Parse.User`.

Credentials live in [`.env`](.env) (defaults baked into `config.ts` as a fallback):

```
VITE_PARSE_APP_ID=…
VITE_PARSE_CLIENT_KEY=…
VITE_PARSE_SERVER_URL=https://parseapi.back4app.com/
```

> The client key is a *public* client credential (it ships to the browser by design), so it is safe
> in front-end code. The Master Key is **not** used anywhere in this app.

React owns the component tree and top-level state. The data-heavy content (tiles, library, modal
cells) and the intricate SVG-driven simulators are ported into `data/` and `engine/` modules; the
modal mounts a cell's markup and a React effect initializes the matching simulator, mirroring the
original's lifecycle. Inline handlers inside injected markup resolve against `window` bridges that
dispatch back into React state.

> The ported `data/` and `engine/` modules carry `@ts-nocheck` because they are faithful ports of
> the original untyped DOM-driven code; the React/TS application code is fully type-checked.

## Tests

Headless smoke tests (jsdom) live in `test/`:

```bash
# SSR render of the whole tree
node_modules/.bin/esbuild test/ssr.tsx --bundle --format=esm --platform=node --jsx=automatic --packages=external --outfile=test/out/ssr.mjs && node test/run.mjs

# Client mount: login gate shows when logged out, bridges wired, flagships initialize
node_modules/.bin/esbuild test/client.tsx --bundle --format=esm --platform=node --jsx=automatic --packages=external --outfile=test/out/client.mjs && node test/run-client.mjs

# Live Back4App auth check (drives the patched SDK; expects code 101 = keys accepted)
node test/auth-node.mjs
```

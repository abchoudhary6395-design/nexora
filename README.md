# Nexora Business OS — Frontend

React + Vite SPA implementing the full Nexora UI: CRM, sales pipeline, tasks,
projects, calendar, invoicing, analytics, documents, and admin — all built
from a single CSS-variable design system (no Tailwind/Bootstrap/CSS
frameworks, per spec).

## Requirements

- Node 18+
- npm

## Setup

```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

To point at a real backend instead of the mock data most pages ship with,
copy `.env.example` to `.env` and set `VITE_API_URL` (defaults to
`http://localhost:8000/api`, matching the Laravel backend's `php artisan serve`).

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  assets/          images, icons, fonts
  components/      common/ (design system) + per-module components
  contexts/        AuthContext, ThemeContext
  hooks/           useDebounce, usePagination
  layouts/         MainLayout (sidebar + navbar + command palette shell)
  pages/           one folder per module, matching the sidebar
  routes/          AppRoutes, ProtectedRoute
  services/api/    one file per backend resource (leadService, dealService...)
  styles/          base/ (tokens, reset, type) + layout/ + components/ + pages/
```

## Design system

Every color, spacing, radius, shadow, and type size lives in
`src/styles/base/variables.css` as CSS custom properties. Changing a value
there updates the whole app, including the dark theme (`[data-theme='dark']`
overrides in the same file). Fonts: Plus Jakarta Sans (display), Inter
(body), JetBrains Mono (money/KPI/ID numerals, set with tabular-nums).

## What's using mock data

Most list pages (Leads, Customers, Companies, Deals, Tasks, Projects,
Invoices, Calendar, Analytics, Documents, Admin) ship with seeded mock
datasets so the UI is fully demonstrable without a running backend. Each
page has a comment marking exactly which `services/api/*.js` call to swap
in once the Laravel backend (`../backend`) is running — the response
shapes already match.

## What's not yet built

- Real-time notifications (the Notification Center is currently mock data)
- File upload UI wiring to the Document Center's actual upload endpoint
- i18n / multi-language switching (English only; architecture allows for more)
- Automated tests (no Vitest/RTL suite yet)

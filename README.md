# CV Tool

Small frontend app for generating and saving cover letters.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- TanStack Router
- Vitest + Testing Library
- Storybook
- pnpm

## Run Locally

```bash
pnpm install
pnpm dev
```

## Main Commands

```bash
pnpm dev
pnpm test:run
pnpm lint
pnpm build
pnpm storybook
pnpm build-storybook
pnpm check
```

## Project Structure

The project follows a compact Feature-Sliced Design layout:

- `src/app` - app bootstrap, router, providers, global styles
- `src/pages` - route-level screens
- `src/widgets` - page sections composed from features/entities/shared UI
- `src/features` - user actions such as generation, copy, and delete
- `src/entities` - application domain model, persistence contracts, progress logic
- `src/shared` - reusable UI, assets, config, and utilities

## Notes

- Saved applications are stored in `localStorage`.
- Cover letters are generated from local templates. No external AI API is used.
- SPA routing for Vercel refresh/direct links is handled via `vercel.json` rewrites.

## Deployment

- App: Vercel
- Storybook: GitHub Pages via `.github/workflows/storybook-pages.yml`

## CI

GitHub Actions runs:

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
pnpm build-storybook
```

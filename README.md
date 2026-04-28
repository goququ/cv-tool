# CV Tool

Frontend test assignment application for generating cover letters.

## Stack

- Vite
- React
- TypeScript
- pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
pnpm storybook
pnpm build-storybook
```

## Deployment

- Application: deploy to Vercel
- Storybook: deploy to GitHub Pages via `.github/workflows/storybook-pages.yml`

## CI

GitHub Actions runs the following checks on `push` to `main` and on pull requests:

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
pnpm build-storybook
```

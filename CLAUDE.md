# CLAUDE.md — Contributor Guide

Ludwitt is an adaptive learning platform built with **Next.js 15**, **React 19**, **TypeScript**, **Firebase**, and **Tailwind CSS 4**.

## Quick Start

```bash
npm install
cp .env.example .env.local   # configure environment variables
npm run dev                   # localhost:3000
```

See [`docs/SETUP.md`](docs/SETUP.md) for full setup instructions and required env vars.

## Tech Stack

| Layer      | Tech                                              |
| ---------- | ------------------------------------------------- |
| Frontend   | Next.js 15 (App Router), React 19, Tailwind CSS 4 |
| Backend    | Next.js API Routes, Firebase Admin SDK            |
| Database   | Firestore                                         |
| Auth       | Firebase Authentication                           |
| AI         | Anthropic Claude                                  |
| Payments   | Stripe                                            |
| Testing    | Jest (unit), Playwright (E2E)                     |
| Deployment | Vercel                                            |

## Code Conventions

- **TypeScript strict mode** — avoid `any`
- **Path aliases** — use `@/` for imports from `src/`
- **Named exports** — no default exports for components
- **Components ≤ 300 lines** — extract logic into hooks
- **Tailwind only** — no inline `style={}` props
- **Feature-based directories** — group components under `src/components/[feature]/`

## Directory Layout

```
src/
├── app/           # Next.js App Router (pages + API routes)
├── components/    # React components grouped by feature
├── lib/           # Utilities, hooks, types, integrations
├── config/        # App configuration
└── data/          # Static curriculum data
```

## Branch & Commit Rules

Branches: `feature/*`, `bugfix/*`, `cleanup/*`, `claude/*`

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):
`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`

## Scripts

```bash
npm run dev            # dev server
npm run build          # production build
npm run lint           # ESLint
npm run type-check     # TypeScript check
npm run test           # Jest unit tests
npm run test:e2e       # Playwright E2E tests
```

## Versioning

Agent API version format: `SEMANTIC-commitHash` (e.g. `1.0.0-a1b2c3d`).

- **Commit hash** — automatic on every Vercel deploy; agents see a new version on each push
- **Semantic** — bump `LUDWITT_SEMANTIC_VERSION` in `src/config/agent-api.ts` for **big changes** only

**Bump semantic (1.0.0 → 1.0.1) when:** breaking API changes, agent-facing behavior changes, install/daemon changes, security fixes, data migrations.

**Do not bump for:** bug fixes, refactors, tests, docs, UI-only changes.

See `.cursor/rules/versioning.mdc` for the full checklist.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Setup Guide](docs/SETUP.md)
- [Systems (Basics, Cohorts)](docs/SYSTEMS.md)
- [API Reference](docs/API_REFERENCE.md)

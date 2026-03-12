# Ludwitt

An open-source adaptive learning platform. Clone it, self-host it, run your own instance.

[![CI](https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw/actions/workflows/ci.yml/badge.svg)](https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/rogerSuperBuilderAlpha/ludwitt-openclaw/graph/badge.svg)](https://codecov.io/gh/rogerSuperBuilderAlpha/ludwitt-openclaw)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12-orange)](https://firebase.google.com/)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-green)](LICENSE)

---

Ludwitt is a learning platform that moves students through a structured progression: from K-12 foundations, through hands-on developer training, into professional work and university-level research. It's built with Next.js, Firebase, and Anthropic Claude, and it's released under the AGPL-3.0 so anyone can run, modify, and deploy their own instance.

If you run a modified version as a network service, you share your changes back. That's the deal.

---

## What It Looks Like

<!-- To add screenshots: place PNGs in docs/screenshots/ and uncomment the table below -->
<!-- | Basics Practice | Progression Gate | University Dashboard | -->
<!-- |:---:|:---:|:---:| -->
<!-- | ![Basics](docs/screenshots/basics-practice.png) | ![Gate](docs/screenshots/progression-gate.png) | ![University](docs/screenshots/university-dashboard.png) | -->

> Screenshots coming soon. No live demo yet — Ludwitt requires Firebase and Anthropic credentials to run. Clone it and try it locally with the [Quick Start](#quick-start) below.

---

## How It Works

Students advance through four gated stages. Each one unlocks the next.

### 1. Basics -- K-12 Foundations

Six adaptive subjects: **Math, Reading, Logic, Latin, Greek, Writing**. Difficulty adjusts automatically based on recent performance. Problems come from a local store, Firebase, or are generated on-demand by AI.

Includes gamification (XP, streaks, achievements, leaderboards, virtual companions), cohort-based group learning with mentors, live study rooms, writing competitions, and AI-generated independent study tracks.

**Unlocks ALC at:** Math Grade 12 + Reading Grade 12 + 5,000 XP/week.

### 2. ALC -- Accelerated Learning Center

Project-based developer training. Students set up real tools, build real projects, and ship to production.

Three paths: **Cursor** (AI code editor), **Claude Code** (CLI agent), **OpenClaw** (open-source agent). Each path ends with a deployed personal website and 5 portfolio projects. Every portfolio item requires a Brainlift (written process doc), a Loom video walkthrough, and a live production URL.

**Unlocks Developer/University at:** 5 completed projects + verified deployment.

### 3. Developer Portal

Professional client work. Developers claim documents from customers, manage multi-developer projects with milestones and budgets, track revenue, and communicate through per-document messaging. Includes productivity tools (focus mode, time tracking, goals) and team features (workload distribution, leaderboard).

### 4. University

Advanced coursework and research, unlocked alongside the Developer Portal. Pick any topic and get an AI-generated learning path with courses and deliverables (apps, simulations, research tools). Includes peer reviews, guided exploration with an AI teaching assistant, a skills graph, digital credentials, and a university-level portfolio.

### Customer Portal

The other side of the Developer Portal. Customers submit Google Docs, approve work, track projects, and communicate with developers. Documents flow through: pending, approved, in-progress, completed, accepted.

---

## Self-Hosting

Ludwitt is designed to be self-hosted. You bring your own:

- **Firebase project** -- Firestore, Auth, Storage
- **Anthropic API key** -- Powers all AI features (grading, explanations, generation)
- **Stripe account** -- Subscriptions and credit purchases (optional)
- **Vercel account** -- Deployment (or any Node.js host)

See the [Setup Guide](docs/SETUP.md) for full instructions.

---

## Quick Start

```bash
git clone https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw.git
cd ludwitt-openclaw
npm install
cp .env.example .env.local   # Add your Firebase, Anthropic, and Stripe credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

| Layer    | Technologies                                                  |
| -------- | ------------------------------------------------------------- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind 4 |
| Backend  | Next.js API Routes, Firebase Admin SDK                        |
| Database | Firebase Firestore                                            |
| Auth     | Firebase Authentication                                       |
| AI       | Anthropic Claude (token-based credit system)                  |
| Payments | Stripe (subscriptions + credits)                              |
| Video    | Daily.co (study rooms)                                        |
| Testing  | Jest 30, Playwright                                           |

---

## Project Structure

```
ludwitt-openclaw/
├── src/
│   ├── app/              # Next.js App Router (pages + API routes)
│   │   ├── basics/       # K-12 learning
│   │   ├── alc/          # Accelerated Learning Center
│   │   ├── university/   # University-level learning
│   │   ├── customers/    # Customer portal
│   │   ├── developers/   # Developer dashboard
│   │   └── api/          # API routes
│   ├── components/       # React components by feature
│   ├── lib/              # Core logic (basics engine, progression gates, credits, AI, Stripe)
│   └── data/             # Static curriculum and problem sets
├── docs/                 # Documentation
├── e2e/                  # Playwright E2E tests
└── scripts/              # Utility scripts
```

---

## Scripts

```bash
npm run dev             # Development server
npm run build           # Production build
npm run lint            # ESLint
npm run type-check      # TypeScript checking
npm run test            # Unit tests (Jest)
npm run test:e2e        # E2E tests (Playwright)
npm run seed:basics     # Seed problem sets to Firestore
```

---

## Documentation

| Document                               | Description                               |
| -------------------------------------- | ----------------------------------------- |
| [Setup Guide](docs/SETUP.md)           | Environment, Firebase, Stripe, deployment |
| [Architecture](docs/ARCHITECTURE.md)   | Code organization, patterns, conventions  |
| [Systems](docs/SYSTEMS.md)             | How each feature system works             |
| [API Reference](docs/API_REFERENCE.md) | API endpoint reference                    |

---

## Contributing

We welcome contributions. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow, but the short version:

1. Fork the repo
2. Create a branch (`feature/`, `fix/`, `docs/`)
3. Make your changes, run `npm run lint && npm run test && npm run build`
4. Open a PR

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## Community

- **Issues** -- Bug reports, feature requests: [GitHub Issues](https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw/issues)
- **Discussions** -- Questions, ideas, show & tell: [GitHub Discussions](https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw/discussions)
- **Security** -- To report a vulnerability, see [SECURITY.md](SECURITY.md)

---

## Contributors

Thanks to everyone who contributes to Ludwitt. See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

<!-- Contributors list is maintained manually. Add yourself here when your first PR is merged. -->

- **[@ludwitt](https://github.com/ludwitt)** — creator and maintainer

---

## License

[AGPL-3.0](LICENSE) -- (c) 2025-2026 Ludwitt

You're free to use, modify, and deploy Ludwitt. If you run a modified version as a network service (i.e., users interact with it over a network), you must make your modified source code available under the same license. See the [full license text](LICENSE) for details.

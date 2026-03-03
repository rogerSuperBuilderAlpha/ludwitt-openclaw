# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Server-side AI chat API route (`/api/ai/chat`) replacing client-side API key usage
- `.nvmrc` pinning Node.js 20
- `CHANGELOG.md` for version tracking
- Pre-commit hooks via Husky and lint-staged
- ESLint accessibility plugin (`eslint-plugin-jsx-a11y`)
- CI coverage reporting with artifact uploads
- `useSubmissionCardForm` hook to eliminate prop drilling
- E2E test job in CI pipeline with Playwright report artifacts
- Coverage comment on PRs via jest-coverage-comment action
- CI Playwright config (`e2e/playwright.ci.config.ts`)
- Health check endpoint (`/api/health`)
- Shared API test utilities (`src/lib/testing/api-test-helpers.ts`)
- 14 new API route test files covering financial, user, and admin routes
- Docker HEALTHCHECK and resource limits in docker-compose
- `.github/CODEOWNERS` for security-critical path review
- `engines` field in package.json enforcing Node >= 20
- `participantIds` backfill script for document access control migration

### Changed

- CI security audit now fails the build instead of silently continuing
- CI unit tests now run with `--coverage` instead of `--passWithNoTests`
- ESLint config hardened with TypeScript, accessibility, and import rules
- `check` script now correctly fails on errors (removed false-positive `|| echo`)
- Pinned gitleaks version in pre-commit hook (8.21.2)
- Removed redundant `better-npm-audit` step from CI (kept `npm audit`)
- Replaced 5 `any[]` types with proper interfaces

### Removed

- Dead `/api/verify-github-oauth` endpoint (returned 410 Gone)
- Client-side Anthropic API key exposure (`NEXT_PUBLIC_ANTHROPIC_API_KEY`)

### Fixed

- All TODO comments converted to documented planned features
- SubmissionCard refactored from 38 props to 5 using custom hook

### Security

- Removed `NEXT_PUBLIC_ANTHROPIC_API_KEY` — API key was exposed to browser
- Security audit in CI now blocks merges on high-severity vulnerabilities
- Tightened Firestore rules for `customerDocuments`, `clientRequirements`, `documentCommunications`, `documentHistory`, `developerActivity`
- Added size and content-type restrictions to Firebase Storage rules
- Fixed anonymous rate limit bucket collapse (all unauthenticated users shared one bucket)
- Added rate limiting to 23 unprotected API routes (financial, admin, user, data mutation)
- Added `participantIds` access control field to document communications and requirements

### Known Issues

- **Web3 optional dependency vulnerabilities:** The `elliptic` package (transitive dependency via `@walletconnect/*`) has known advisories. These are in `optionalDependencies` and excluded from production audit via `--omit=optional`. Tracked upstream; will resolve when WalletConnect updates their dependency tree.

## [1.0.0] - 2026-02-28

### Added

- Legal pages (Terms of Service, Privacy Policy)
- SEO discovery files (robots.txt, sitemap)
- AGPL-3.0 license
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md
- GitHub issue and PR templates

### Changed

- README rewritten for open-source self-hosting instructions
- Removed ~180 dead files (unused API routes, pages, components, utilities)
- Sanitized hardcoded URLs and removed internal scripts

## [0.9.0] - 2026-02-15

### Added

- 18 missing Firestore composite indexes
- University features: professor profiles, student discovery, office hours booking
- Peer review circles and guided exploration
- Email and in-app notifications for university interactions
- Schedule tab with monthly calendar
- NotificationBell with dark mode support

### Changed

- Split 10 oversized components into focused sub-modules
- Split DashboardContext into three focused contexts
- Account settings page audited and cleaned up

### Fixed

- Hooks before early return in CodeEditor
- Dropdown clipped by overflow-x-auto on tab bar
- Firestore rules hardened for storage and voice-note access

## [0.8.0] - 2026-01-20

### Added

- Professor dashboard with learning paths and student progress
- Professor assignment management
- Published paths API with filtering and sorting
- Pill toggle filters and sort options for browse paths

### Changed

- Updated published paths API to filter by active status

[Unreleased]: https://github.com/ludwitt/pitch-rise/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ludwitt/pitch-rise/compare/v0.9.0...v1.0.0
[0.9.0]: https://github.com/ludwitt/pitch-rise/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/ludwitt/pitch-rise/releases/tag/v0.8.0

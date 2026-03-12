# Contributing to Ludwitt

Thank you for your interest in contributing. This document covers the development workflow, coding standards, and pull request process.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## First-Time Contributors

New to the project? Look for issues labeled [`good first issue`](https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw/labels/good%20first%20issue). These are scoped, well-defined tasks that don't require deep knowledge of the codebase.

Good first contributions include:

- Adding tests for untested components or utilities (see [TESTING.md](TESTING.md) for coverage gaps)
- Fixing typos or improving documentation
- Adding accessibility improvements
- Small bug fixes with clear reproduction steps

---

## Getting Started

### Prerequisites

- Node.js 20+
- Git
- Firebase account
- Familiarity with TypeScript, React, and Next.js

### Setup

1. **Fork the repository**

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ludwitt-openclaw.git
   cd ludwitt-openclaw
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Set up environment**

   ```bash
   cp .env.example .env.local
   # Add your Firebase credentials — see docs/SETUP.md
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

For full setup details (Firebase, Stripe, deployment), see [docs/SETUP.md](docs/SETUP.md).

---

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/add-user-profile   # New feature
git checkout -b fix/login-error             # Bug fix
git checkout -b docs/update-readme          # Documentation
```

### 2. Make Changes

- Follow the coding standards below
- Test your changes
- Update documentation if needed

### 3. Stay Up to Date

```bash
git fetch upstream
git merge upstream/main
```

### 4. Push and Create PR

```bash
git push origin feature/add-user-profile
```

Then open a Pull Request on GitHub.

---

## Coding Standards

### TypeScript

- Use explicit types (avoid `any`)
- Use `@/` path aliases for imports
- Use `const` for immutable values

### React Components

- Function components with hooks
- One component per file, named exports
- Add `'use client'` when using React hooks
- Keep components under 300 lines

### File Naming

| Type       | Convention             | Example                 |
| ---------- | ---------------------- | ----------------------- |
| Components | PascalCase             | `UserProfile.tsx`       |
| Hooks      | camelCase with `use`   | `useAuth.ts`            |
| Utilities  | camelCase              | `formatDate.ts`         |
| API routes | lowercase with hyphens | `check-answer/route.ts` |

### Styling

- Tailwind CSS utility classes
- No inline styles
- Basics features follow the Kinematic Minimalism design system (solid colors, no gradients)

For full architecture details, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type       | Purpose                      |
| ---------- | ---------------------------- |
| `feat`     | New feature                  |
| `fix`      | Bug fix                      |
| `docs`     | Documentation                |
| `refactor` | Code refactoring             |
| `test`     | Adding or updating tests     |
| `chore`    | Build process or maintenance |

```bash
git commit -m "feat(auth): add Google sign-in"
git commit -m "fix(storage): resolve file upload error"
```

---

## Pull Request Process

### Before Submitting

1. Run tests: `npm run test`
2. Check types: `npm run type-check`
3. Run linter: `npm run lint`
4. Test build: `npm run build`

### Review Criteria

- At least one maintainer approval
- All CI checks pass
- No merge conflicts
- Up to date with main branch

---

## Testing

```bash
npm run test           # Unit tests (Jest)
npm run test:coverage  # With coverage report
npm run test:watch     # Watch mode
npm run test:e2e       # E2E tests (Playwright)
```

### Coverage Expectations

All new code must include tests. Coverage targets per category:

- Utilities and pure functions: tests required
- API routes: tests required for POST/PUT/DELETE
- Components: tests encouraged, especially for interactive logic

---

## License

By contributing, you agree that your contributions will be licensed under the [AGPL-3.0 License](LICENSE).

---

For questions, open a GitHub Issue or Discussion.

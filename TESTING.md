# Testing Guide

## Running Tests

```bash
# Unit tests (Jest)
npm run test              # Run all unit tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Run with coverage report

# E2E tests (Playwright)
npm run test:e2e          # Run all E2E tests headless
npm run test:e2e:ui       # Run with Playwright UI
```

---

## Current Coverage

Overall coverage is **~8%** across the codebase. Coverage is highest in core utilities and the learning engine:

| Area                      | Coverage | Notes                                |
| ------------------------- | -------- | ------------------------------------ |
| `src/lib/utils/`          | ~66%     | Date helpers, formatting, validation |
| `src/lib/basics/`         | ~40%     | Adaptive difficulty engine           |
| `src/lib/credits/`        | ~30%     | Credit system and middleware         |
| `src/lib/web3/`           | ~25%     | Wallet signature verification        |
| `src/components/basics/`  | ~10%     | Dashboard, focus mode, header        |
| `src/app/api/`            | <5%      | Most API routes untested             |
| `src/components/` (other) | <5%      | Customer/developer/auth components   |

Coverage thresholds are enforced in `jest.config.js` and match current actuals. New code should include tests.

---

## Coverage Gaps — Help Wanted

These areas have **zero or near-zero** test coverage and are good candidates for contribution:

- **Voice notes** (`src/components/voice-notes/`, `src/lib/audio/`) — 0%
- **Customer portal** (`src/components/customers/`) — 0%
- **Developer dashboard components** (`src/components/developers/`) — 0%
- **Auth components** (`src/components/auth/`) — 0%
- **Most API routes** (`src/app/api/`) — 0%
- **Cohort system** (`src/components/cohorts/`, `src/lib/hooks/useCohort*.ts`) — 0%

---

## Writing Tests

### File Location

Tests live next to the code they test, in `__tests__/` directories:

```
src/lib/utils/
├── formatDate.ts
└── __tests__/
    └── formatDate.test.ts

src/components/basics/
├── BasicsHeader.tsx
└── __tests__/
    └── BasicsHeader.test.tsx
```

### Naming Convention

- Unit tests: `*.test.ts` or `*.test.tsx`
- Audit/validation tests: `*.audit.test.ts`
- Shared test utilities: `__tests__/shared/`

### Common Mock Patterns

**Logger** — Most tests need this to silence log output:

```typescript
jest.mock('@/lib/logger', () => ({
  log: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}))
```

**Firebase Admin** — For server-side tests that use Firestore:

```typescript
jest.mock('@/lib/firebase/admin', () => {
  const mockDoc = {
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
  const mockCollection = {
    doc: jest.fn(() => mockDoc),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    get: jest.fn(),
  }
  return {
    db: {
      collection: jest.fn(() => mockCollection),
      runTransaction: jest.fn(),
    },
  }
})
```

**Date helpers** — For consistent timestamps in tests:

```typescript
jest.mock('@/lib/utils/firestore-helpers', () => ({
  serverTimestamp: jest.fn(() => new Date('2026-01-15T00:00:00Z')),
}))
```

**Fetch** — For API client tests:

```typescript
global.fetch = jest.fn()
beforeEach(() => {
  ;(global.fetch as jest.Mock).mockClear()
})
```

### Testing React Components

Use `@testing-library/react` and `@testing-library/jest-dom`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { MyComponent } from '../MyComponent'

it('renders the title', () => {
  render(<MyComponent title="Hello" />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

Follow these Testing Library conventions (enforced by ESLint):

- Name render results `view` (not `result`): `const view = render(<Comp />)`
- Use `screen.getByRole()`, `screen.getByText()` instead of direct DOM access
- Use `toBeEnabled()` / `toBeDisabled()` instead of `not.toBeDisabled()`

---

## Testing the Payment System

The payment system has three critical modules with dedicated tests:

### MOR Balance (`src/lib/credits/__tests__/mor-balance.test.ts`)

Tests for wallet linking, credit claiming, and monthly allowance tracking. Mocks Firestore transactions to verify atomic balance updates.

```bash
npx jest mor-balance --no-coverage
```

### Morpheus Client (`src/lib/morpheus/__tests__/client.test.ts`)

Tests for the Morpheus Builders API client — WEI-to-MOR conversion, staking info lookups, and multi-wallet aggregation. Mocks `fetch` for API responses.

```bash
npx jest morpheus/client --no-coverage
```

### Signature Verification (`src/lib/web3/__tests__/signature.test.ts`)

Tests for wallet signature creation, timestamp validation, and `viem`-based signature verification. Mocks the `viem` library.

```bash
npx jest signature --no-coverage
```

### Credit Middleware (`src/lib/credits/__tests__/middleware*.test.ts`)

Tests for `withCreditTracking`, `checkCreditsBeforeCall`, and `trackCreditsAfterCall` — including edge cases like insufficient credits, large token counts, and failed deductions.

```bash
npx jest middleware --no-coverage
```

---

## E2E Tests

E2E tests use [Playwright](https://playwright.dev/) and are located in `e2e/`. There are currently **24 spec files** covering core user flows.

### Setup

```bash
npx playwright install    # Install browsers (first time only)
```

### Running Locally

```bash
npm run test:e2e          # Headless (CI mode)
npm run test:e2e:ui       # Interactive UI mode
```

### What E2E Tests Cover

The specs test navigation, page loading, and critical user journeys across the main app routes (dashboard, basics, account, login). They do **not** test authenticated flows that require real Firebase credentials.

---

## Adding Tests for a New Feature

1. Create `__tests__/` directory next to your source files
2. Name your test file `YourModule.test.ts` or `YourComponent.test.tsx`
3. Mock external dependencies (Firebase, fetch, logger)
4. Run your tests: `npx jest path/to/your.test.ts --no-coverage`
5. Run full suite before submitting: `npm run test`

Priority for new tests:

1. **Utilities and pure functions** — highest value, easiest to test
2. **API routes** — test POST/PUT/DELETE endpoints with mocked Firebase
3. **Components** — test interactive logic, form submissions, state changes

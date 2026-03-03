# Architecture

Technical overview of the Ludwitt codebase — patterns, conventions, and how things fit together.

---

## Visual Diagrams

- [Data Flow](architecture/data-flow.md) — Browser to API to Firestore / Claude / Stripe
- [Auth Flow](architecture/auth-flow.md) — Login through Firebase Auth to API token verification
- [Credit System Flow](architecture/credit-system-flow.md) — Token-based AI pricing and billing

---

## Tech Stack

| Layer          | Technologies                                                  |
| -------------- | ------------------------------------------------------------- |
| **Frontend**   | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| **Backend**    | Next.js API Routes, Firebase Admin SDK                        |
| **Database**   | Firebase Firestore                                            |
| **Auth**       | Firebase Authentication                                       |
| **Storage**    | Firebase Storage                                              |
| **AI**         | Anthropic Claude                                              |
| **Payments**   | Stripe                                                        |
| **Video**      | Daily.co (study rooms)                                        |
| **Testing**    | Jest (unit), Playwright (E2E)                                 |
| **Deployment** | Vercel                                                        |

---

## Project Structure

```
pitch-rise/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (100+ endpoints)
│   │   ├── dashboard/         # Main learning dashboard
│   │   ├── basics/            # K-12 learning features
│   │   ├── customers/         # Customer portal
│   │   ├── developers/        # Developer dashboard
│   │   ├── account/           # User account settings
│   │   ├── legal/             # Legal pages
│   │   └── deprecated/        # Legacy pages (do not modify)
│   ├── components/            # React components
│   │   ├── basics/           # Learning (math/, reading/, focus-mode/)
│   │   ├── customers/        # Customer portal
│   │   ├── developers/       # Developer dashboard
│   │   ├── cohorts/          # Cohort system
│   │   ├── auth/             # Authentication
│   │   ├── layout/           # Header, Footer, navigation
│   │   ├── ui/               # Generic reusable UI
│   │   └── shared/           # Cross-feature shared components
│   ├── lib/                  # Core utilities
│   │   ├── firebase/         # Firebase config & admin SDK
│   │   ├── api/              # API auth middleware, error responses
│   │   ├── hooks/            # Custom React hooks
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Helper functions
│   │   ├── basics/           # Learning engine logic
│   │   ├── credits/          # Credit system & pricing
│   │   ├── ai/               # AI providers
│   │   └── stripe/           # Stripe integration
│   ├── config/               # App configuration
│   └── data/                 # Static data (curriculum, problems)
├── docs/                     # Documentation
├── scripts/                  # Utility & seed scripts
├── e2e/                      # Playwright E2E tests
├── firestore.rules           # Firestore security rules
└── firebase-storage.rules    # Storage security rules
```

### Route Organization

First-level paths represent user journey entry points. Nested paths belong under existing journeys.

**Valid first-level paths:** `/`, `/login`, `/dashboard`, `/basics`, `/customers`, `/developers`, `/account`, `/legal`, `/api`

### Component Organization

Components are grouped by feature. Only truly reusable components go in `ui/` or `shared/`. Feature-specific components stay in their feature directory (e.g., `components/basics/math/`).

---

## API Route Patterns

### Standard Structure

```typescript
// src/app/api/[feature]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    if (!body.requiredField) {
      return NextResponse.json(
        { success: false, error: 'Missing required field' },
        { status: 400 }
      )
    }

    const result = await doSomething(body, userId)
    return successResponse({ data: result })
  } catch (error) {
    return serverError(error, 'Failed to process request')
  }
}
```

### Response Format

```typescript
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "error": "Error message" }
```

### Authentication

All authenticated endpoints use the shared middleware:

```typescript
import { authenticateRequest } from '@/lib/api/auth-middleware'

const authResult = await authenticateRequest(request)
if (authResult instanceof NextResponse) return authResult // 401/403
const { userId, decodedToken } = authResult
```

### AI Routes with Credit Tracking

AI endpoints must use token-based credit tracking:

```typescript
import { withCreditTracking } from '@/lib/credits/middleware'

const creditResult = await withCreditTracking(userId, 'my-endpoint', async () => {
  const response = await anthropic.messages.create({ ... })
  return { response, usage: response.usage, model }
})

if (creditResult instanceof NextResponse) return creditResult  // 402
```

For streaming responses, use `checkCreditsBeforeCall` and `trackCreditsAfterCall` from the same module.

---

## Data Flow

### Client → API → Firestore

```
User Action → Component → fetch() with auth token → API Route → Firebase Admin SDK → Firestore
                                                                      ↓
Component ← State Update ← JSON Response ←───────────────────────────╯
```

### Real-time (Client SDK)

```
Firestore → onSnapshot listener → Custom Hook → Component State → Re-render
```

---

## Authentication Flow

1. User signs in via Firebase Auth (email/password, Google, or GitHub)
2. Client gets an ID token via `user.getIdToken()`
3. API requests include `Authorization: Bearer <token>` header
4. `authenticateRequest()` middleware verifies the token server-side via Firebase Admin
5. Firestore security rules enforce access control for direct client reads

---

## Firestore Collections

| Collection            | Purpose                          |
| --------------------- | -------------------------------- |
| `users`               | Core user data, preferences      |
| `userBasicsProgress`  | Learning progress per subject    |
| `customerDocuments`   | Customer portal documents        |
| `developerProfiles`   | Developer profiles               |
| `projects`            | Multi-developer project tracking |
| `cohorts`             | Group learning cohorts           |
| `credit_transactions` | Credit system ledger             |
| `userSubscriptions`   | Stripe subscription data         |
| `mentorApplications`  | Mentor applications              |
| `portfolioItems`      | Portfolio showcase items         |

---

## Design System

The Basics learning interface follows **Kinematic Minimalism**:

- No gradients — solid colors only
- Primary buttons: `bg-gray-900 hover:bg-gray-800`
- Cards: `bg-white border border-gray-200`
- Backgrounds: `bg-gray-50`
- Shadows: `shadow-sm`

CSS custom properties use the `--b-*` namespace for design tokens (colors, spacing, radii). See `src/app/globals.css` for the full token set.

---

## Conventions

### TypeScript

- Strict mode enabled — avoid `any`
- Define interfaces for all component props
- Use `@/` path aliases for all imports

### File Naming

| Type       | Convention             | Example                 |
| ---------- | ---------------------- | ----------------------- |
| Components | PascalCase             | `UserProfile.tsx`       |
| Hooks      | camelCase with `use`   | `useAuth.ts`            |
| Utilities  | camelCase              | `formatDate.ts`         |
| API routes | lowercase with hyphens | `check-answer/route.ts` |

### Components

- One component per file, named exports
- `'use client'` directive for any component using React hooks
- Keep under 300 lines — extract logic to custom hooks

### Logging

Use the logger at `src/lib/logger.ts` instead of `console.log`:

```typescript
import { logger } from '@/lib/logger'
logger.info('message', { context })
logger.error('failed', { error })
```

---

## Security

- **CSP headers** configured in `next.config.js`
- **HSTS, X-Frame-Options, X-Content-Type-Options** and other security headers applied to all routes
- **Firestore rules** enforce owner-only and authenticated access patterns
- **API key management**: Client-side encryption uses AES-GCM with PBKDF2 key derivation
- **Input validation** on all API routes
- **Rate limiting** via Upstash Redis (when configured)

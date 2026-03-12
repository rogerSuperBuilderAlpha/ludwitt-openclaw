# Setup Guide

Everything you need to get Ludwitt running locally and deploy to production.

---

## Prerequisites

- **Node.js 20+** and npm
- **Git**
- A **Firebase** project ([create one](https://console.firebase.google.com/))
- An **Anthropic** API key (for AI features)
- A **Stripe** account (for payments — optional for development)

---

## Quick Start

```bash
git clone https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw.git
cd ludwitt-openclaw
npm install
cp .env.example .env.local
# Edit .env.local with your credentials (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values below.

### Firebase (Client)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

Get these from: Firebase Console → Project Settings → General → Your Apps → Web App.

### Firebase Admin (Server)

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Get these from: Firebase Console → Project Settings → Service Accounts → Generate New Private Key. Copy the `project_id`, `client_email`, and `private_key` from the downloaded JSON.

### Anthropic (AI)

```env
ANTHROPIC_API_KEY=sk-ant-...
```

Get from: [console.anthropic.com](https://console.anthropic.com/) → API Keys.

### Stripe (Payments)

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Get from: [dashboard.stripe.com](https://dashboard.stripe.com/) → Developers → API Keys.

For the webhook secret, create a webhook endpoint pointing to `https://your-domain.com/api/webhooks/stripe` with the `checkout.session.completed` and `customer.subscription.*` events.

### GitHub OAuth (Optional)

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

1. Go to GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App
2. Set the callback URL to `https://your-project.firebaseapp.com/__/auth/handler`
3. Enable GitHub in Firebase Console → Authentication → Sign-in Method

### Application

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Set to your production URL when deploying.

---

## Firebase Setup

### 1. Create Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the wizard
3. Enable Google Analytics (optional)

### 2. Enable Services

**Authentication:**

- Firebase Console → Authentication → Get Started
- Enable Email/Password and Google sign-in (minimum)
- Optionally enable GitHub OAuth (see above)

**Firestore:**

- Firebase Console → Firestore Database → Create Database
- Start in production mode
- Deploy security rules: `firebase deploy --only firestore:rules`

**Storage:**

- Firebase Console → Storage → Get Started
- Deploy storage rules: `firebase deploy --only storage`

### 3. Deploy Security Rules

Install the Firebase CLI and deploy the rules included in the repo:

```bash
npm install -g firebase-tools
firebase login
firebase init  # Select Firestore and Storage, use existing project
firebase deploy --only firestore:rules
firebase deploy --only storage
```

The repo includes `firestore.rules` and `firebase-storage.rules` with secure defaults.

### Storage Rules Overview

The storage rules enforce:

- Authentication required for all operations
- User isolation (users can only access their own files)
- Path-based validation for voice-notes, profile images, avatars, and uploads
- File size limits per path

---

## Stripe Setup

Ludwitt uses Stripe Checkout Links for subscriptions and a credit-based system for AI features.

### 1. Products & Prices

Create your subscription products in the Stripe Dashboard. The app reads subscription status from the `userSubscriptions` Firestore collection.

### 2. Webhooks

Create a webhook endpoint at `https://your-domain.com/api/webhooks/stripe` with these events:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### 3. Test Cards

Use Stripe test cards in development:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

---

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Import the project at [vercel.com](https://vercel.com/)
3. Add all environment variables in the Vercel dashboard
4. Deploy

Vercel auto-deploys on push to `main`.

### Docker (Self-Hosting)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Firebase Hosting (Alternative)

```bash
firebase init hosting
# Set public directory to "out" and configure as single-page app
npm run build
firebase deploy --only hosting
```

---

## Rate Limiting (Optional)

The app supports rate limiting via Upstash Redis:

```env
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
```

Get from: [console.upstash.io](https://console.upstash.io/) → Create Database.

---

## Verification

After setup, verify everything works:

```bash
npm run dev          # Dev server starts without errors
npm run build        # Production build succeeds
npm run lint         # No lint errors
npm run type-check   # No type errors
npm run test         # Unit tests pass
```

---

## Peer Dependencies Note

This project uses `--legacy-peer-deps` during installation. This is required because of four known peer dependency mismatches in optional/transitive dependencies:

| Package                               | Expects           | Installed      | Reason                                  |
| ------------------------------------- | ----------------- | -------------- | --------------------------------------- |
| `abitype` (via wagmi)                 | `zod ^3`          | `zod 4.x`      | Web3 ecosystem hasn't updated for Zod 4 |
| `use-sync-external-store` (via wagmi) | `react 16-18`     | `react 19`     | React 19 bundles this internally        |
| `use-resize-observer` (via mafs)      | `react 16-18`     | `react 19`     | Package hasn't declared React 19 peer   |
| `use-resize-observer` (via mafs)      | `react-dom 16-18` | `react-dom 19` | Same as above                           |

**None of these cause runtime issues.** The React 19 mismatches are cosmetic — React 19 is backwards-compatible with hooks that target React 18. The Zod mismatch only affects the Web3 `abitype` package which doesn't use Zod at runtime in our codebase.

If you prefer strict installation, you can audit which packages produce warnings with `npm install 2>&1 | grep "Could not resolve"`.

---

## Troubleshooting

| Problem                             | Solution                                                        |
| ----------------------------------- | --------------------------------------------------------------- |
| `FIREBASE_ADMIN_PRIVATE_KEY` errors | Ensure the key is wrapped in double quotes and `\n` are literal |
| `Module not found: firebase-admin`  | Run `npm install` — server-side only package                    |
| Firestore permission denied         | Deploy security rules: `firebase deploy --only firestore:rules` |
| Stripe webhook 400 errors           | Verify `STRIPE_WEBHOOK_SECRET` matches your endpoint            |
| Build fails with memory errors      | Set `NODE_OPTIONS=--max_old_space_size=4096`                    |
| Peer dependency warnings            | Use `npm install --legacy-peer-deps` — see note above           |

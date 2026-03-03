# API Reference

Complete reference for all Ludwitt API endpoints. All routes are under `/api/`.

---

## Authentication

Unless otherwise noted, all endpoints require a Firebase ID token in the `Authorization` header:

```
Authorization: Bearer <firebase-id-token>
```

Webhook endpoints authenticate via signature verification instead.

## Response Format

```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "error": "Error message" }
```

## Status Codes

| Code | Meaning                 |
| ---- | ----------------------- |
| 200  | Success                 |
| 400  | Validation error        |
| 401  | Authentication required |
| 402  | Insufficient credits    |
| 404  | Resource not found      |
| 500  | Server error            |

---

## Basics (Adaptive Learning)

### Core Learning Flow

| Method | Endpoint                        | Description                                           |
| ------ | ------------------------------- | ----------------------------------------------------- |
| GET    | `/api/basics/current-problems`  | Get next problem based on adaptive difficulty         |
| POST   | `/api/basics/check-answer`      | Validate answer, update progress, return next problem |
| POST   | `/api/basics/skip-problem`      | Skip current problem                                  |
| POST   | `/api/basics/similar-problem`   | Get alternative problem for same concept              |
| GET    | `/api/basics/enhanced-problems` | Get problems with enhanced learning science features  |
| POST   | `/api/basics/persist-session`   | Save session state                                    |

### AI Features (Credit-Based)

| Method | Endpoint                            | Description                        |
| ------ | ----------------------------------- | ---------------------------------- |
| POST   | `/api/basics/ai-explanation`        | AI explanation for a concept       |
| POST   | `/api/basics/ai-grade`              | AI grading for essays/writing      |
| POST   | `/api/basics/ai-lesson`             | Generate personalized lesson       |
| POST   | `/api/basics/ai-writing-tips`       | Writing feedback                   |
| POST   | `/api/basics/alternate-explanation` | Alternative explanation            |
| POST   | `/api/basics/explain-concept`       | Plain-language concept explanation |
| POST   | `/api/basics/evaluate-work`         | Evaluate shown work for bonus XP   |

### Assessment & Challenges

| Method | Endpoint                               | Description                    |
| ------ | -------------------------------------- | ------------------------------ |
| POST   | `/api/basics/check-review-answer`      | Check answer in review mode    |
| POST   | `/api/basics/generate-review-problems` | Generate review problems       |
| POST   | `/api/basics/generate-skill-challenge` | Generate skill challenge       |
| POST   | `/api/basics/join-challenge`           | Join a skill challenge         |
| GET    | `/api/basics/book-quiz`                | Get reading comprehension quiz |

### Translation (Latin/Greek)

| Method | Endpoint                                      | Description                 |
| ------ | --------------------------------------------- | --------------------------- |
| POST   | `/api/basics/translation/exercise`            | Get translation exercise    |
| POST   | `/api/basics/translation/check`               | Check translation answer    |
| POST   | `/api/basics/translation/skip`                | Skip translation            |
| POST   | `/api/basics/translation/word-lookup`         | Vocabulary lookup           |
| POST   | `/api/basics/translation/generate-parsing`    | Syntactic parsing           |
| POST   | `/api/basics/translation/grade-comprehension` | Grade comprehension         |
| POST   | `/api/basics/translation/historical-context`  | Historical context for text |

### Logic

| Method | Endpoint                              | Description              |
| ------ | ------------------------------------- | ------------------------ |
| POST   | `/api/basics/generate-logic-problems` | Generate logic problems  |
| GET    | `/api/basics/logic/progress`          | Get logic skill progress |

### Gamification

| Method | Endpoint                           | Description                   |
| ------ | ---------------------------------- | ----------------------------- |
| POST   | `/api/basics/claim-reward`         | Claim achievement reward      |
| POST   | `/api/basics/purchase-hint`        | Purchase hint with XP/credits |
| POST   | `/api/basics/xp/award`             | Award XP                      |
| GET    | `/api/basics/xp/history`           | XP earning history            |
| GET    | `/api/basics/leaderboard`          | Global XP leaderboard         |
| GET    | `/api/basics/enhanced-leaderboard` | Leaderboard with filters      |

### Dictionary & Reading

| Method | Endpoint                               | Description                       |
| ------ | -------------------------------------- | --------------------------------- |
| GET    | `/api/basics/word-lookup`              | Dictionary lookup                 |
| POST   | `/api/basics/dictionary/ai-lookup`     | AI-enhanced vocabulary definition |
| POST   | `/api/basics/dictionary/ai-enrich`     | Enriched vocabulary context       |
| POST   | `/api/basics/score-reading-aloud`      | Score oral reading fluency        |
| POST   | `/api/basics/score-word-pronunciation` | Score pronunciation               |

### Companion System

| Method | Endpoint                                | Description               |
| ------ | --------------------------------------- | ------------------------- |
| GET    | `/api/basics/companion`                 | Get user's AI companion   |
| POST   | `/api/basics/companion/generate-avatar` | Generate companion avatar |
| POST   | `/api/basics/companion/evolve`          | Evolve companion          |

### Spaced Repetition

| Method | Endpoint                                 | Description             |
| ------ | ---------------------------------------- | ----------------------- |
| GET    | `/api/basics/spaced-repetition/due`      | Get due review problems |
| POST   | `/api/basics/spaced-repetition/schedule` | Schedule review         |
| POST   | `/api/basics/spaced-repetition/record`   | Record review attempt   |

### Writing Competition

| Method | Endpoint                                     | Description           |
| ------ | -------------------------------------------- | --------------------- |
| GET    | `/api/basics/writing-competition/current`    | Get current challenge |
| POST   | `/api/basics/writing-competition/save-draft` | Save draft            |
| POST   | `/api/basics/writing-competition/submit`     | Submit entry          |

### Progress & Reports

| Method | Endpoint                              | Description                  |
| ------ | ------------------------------------- | ---------------------------- |
| GET    | `/api/basics/parent-report`           | Parent dashboard report      |
| GET    | `/api/basics/onboarding-status`       | Onboarding completion status |
| GET    | `/api/basics/engagement/daily-points` | Daily activity points        |

---

## Credits System

| Method | Endpoint                  | Description                      |
| ------ | ------------------------- | -------------------------------- |
| GET    | `/api/credits/balance`    | Get credit balance               |
| POST   | `/api/credits/deposit`    | Deposit credits via Stripe       |
| GET    | `/api/credits/history`    | Transaction history              |
| POST   | `/api/credits/grant-free` | Grant free trial credits (admin) |
| POST   | `/api/credits/webhook`    | Stripe webhook for deposits      |

All AI endpoints deduct credits based on actual token usage. Pricing is calculated per-model in `src/lib/credits/pricing.ts`.

---

## Customer Portal

### Documents

| Method | Endpoint                                   | Description           |
| ------ | ------------------------------------------ | --------------------- |
| POST   | `/api/customers/documents/add`             | Add document          |
| GET    | `/api/customers/documents/list`            | List documents        |
| POST   | `/api/customers/documents/approve`         | Approve completion    |
| POST   | `/api/customers/documents/accept`          | Accept completed work |
| POST   | `/api/customers/documents/delete`          | Delete document       |
| POST   | `/api/customers/documents/update-priority` | Change priority       |
| POST   | `/api/customers/documents/send-message`    | Message developer     |
| POST   | `/api/customers/documents/estimate-cost`   | Cost estimate         |

### Google Drive Integration

| Method | Endpoint                          | Description          |
| ------ | --------------------------------- | -------------------- |
| POST   | `/api/customers/drive/connect`    | Connect Google Drive |
| POST   | `/api/customers/drive/callback`   | OAuth callback       |
| POST   | `/api/customers/drive/disconnect` | Disconnect           |
| GET    | `/api/customers/drive/status`     | Connection status    |
| GET    | `/api/customers/drive/files`      | List connected files |

---

## Developer Dashboard

### Profile

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| POST   | `/api/developers/profile/create` | Create developer profile |
| GET    | `/api/developers/profile`        | Get current profile      |
| GET    | `/api/developers/list`           | List all developers      |

### Work & Communication

| Method | Endpoint                         | Description            |
| ------ | -------------------------------- | ---------------------- |
| GET    | `/api/developers/assigned-work`  | Get assigned documents |
| GET    | `/api/developers/customers`      | List customers         |
| POST   | `/api/developers/send-message`   | Send message           |
| POST   | `/api/developers/nudge-customer` | Nudge customer         |

### Analytics

| Method | Endpoint                            | Description          |
| ------ | ----------------------------------- | -------------------- |
| GET    | `/api/developers/dashboard/stats`   | Dashboard statistics |
| GET    | `/api/developers/analytics/revenue` | Revenue analytics    |
| POST   | `/api/developers/activity`          | Activity log         |

---

## University System

### Learning Paths

| Method | Endpoint                          | Description              |
| ------ | --------------------------------- | ------------------------ |
| GET    | `/api/university/courses`         | List courses             |
| POST   | `/api/university/learning-path`   | Get/create learning path |
| POST   | `/api/university/create-path`     | Create new path          |
| POST   | `/api/university/publish-path`    | Publish path             |
| GET    | `/api/university/published-paths` | List published paths     |
| POST   | `/api/university/join-path`       | Enroll in path           |

### Deliverables

| Method | Endpoint                             | Description        |
| ------ | ------------------------------------ | ------------------ |
| POST   | `/api/university/start-deliverable`  | Begin deliverable  |
| POST   | `/api/university/submit-deliverable` | Submit deliverable |
| POST   | `/api/university/update-submission`  | Update submission  |
| GET    | `/api/university/submission-history` | Submission history |

### Peer Reviews

| Method | Endpoint                                       | Description   |
| ------ | ---------------------------------------------- | ------------- |
| GET    | `/api/university/peer-reviews/queue`           | Review queue  |
| GET    | `/api/university/peer-reviews/[deliverableId]` | Get review    |
| POST   | `/api/university/peer-reviews/submit`          | Submit review |

### Credentials

| Method | Endpoint                           | Description            |
| ------ | ---------------------------------- | ---------------------- |
| GET    | `/api/university/credentials`      | List credentials       |
| GET    | `/api/university/credentials/[id]` | Get credential details |
| POST   | `/api/university/credentials/sign` | Get signed certificate |

### Study Rooms

| Method | Endpoint                            | Description |
| ------ | ----------------------------------- | ----------- |
| GET    | `/api/university/study-rooms`       | List rooms  |
| POST   | `/api/university/study-rooms/join`  | Join room   |
| POST   | `/api/university/study-rooms/leave` | Leave room  |

### Professors & Booking

| Method | Endpoint                          | Description            |
| ------ | --------------------------------- | ---------------------- |
| GET    | `/api/university/professors`      | List professors        |
| GET    | `/api/university/available-slots` | Available office hours |
| POST   | `/api/university/book-slot`       | Book meeting           |
| POST   | `/api/university/cancel-booking`  | Cancel booking         |
| GET    | `/api/university/my-bookings`     | User's bookings        |

### Exploration (Guided Learning)

| Method | Endpoint                            | Description       |
| ------ | ----------------------------------- | ----------------- |
| GET    | `/api/university/exploration/list`  | List explorations |
| GET    | `/api/university/exploration/[id]`  | Get exploration   |
| POST   | `/api/university/exploration/start` | Start exploration |
| POST   | `/api/university/exploration/step`  | Complete step     |

---

## Cohorts (Group Learning)

| Method | Endpoint                        | Description         |
| ------ | ------------------------------- | ------------------- |
| POST   | `/api/cohorts/create`           | Create cohort       |
| POST   | `/api/cohorts/edit`             | Edit cohort         |
| POST   | `/api/cohorts/delete`           | Delete cohort       |
| GET    | `/api/cohorts/learning/modules` | Curriculum modules  |
| GET    | `/api/cohorts/progress`         | Cohort progress     |
| POST   | `/api/cohorts/checkout`         | Enrollment checkout |
| POST   | `/api/cohorts/messages/send`    | Send message        |

---

## Payments & Billing

| Method | Endpoint                            | Description           |
| ------ | ----------------------------------- | --------------------- |
| POST   | `/api/stripe/create-subscription`   | Create subscription   |
| POST   | `/api/stripe/cancel-subscription`   | Cancel subscription   |
| POST   | `/api/stripe/create-portal-session` | Stripe billing portal |
| POST   | `/api/stripe/webhook`               | Stripe webhooks       |
| POST   | `/api/payments/create-intent`       | Create payment intent |
| GET    | `/api/payments/status`              | Payment status        |

---

## Authentication & Account

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| GET    | `/api/auth/session`        | Current session    |
| GET    | `/api/user/settings`       | User settings      |
| POST   | `/api/user/settings`       | Update settings    |
| POST   | `/api/user/delete-account` | Delete account     |
| POST   | `/api/user/export-data`    | Export data (GDPR) |

---

## Integrations

| Method | Endpoint                                   | Description                 |
| ------ | ------------------------------------------ | --------------------------- |
| POST   | `/api/integrations/github/authorize`       | GitHub OAuth                |
| POST   | `/api/integrations/google-drive/authorize` | Google Drive OAuth          |
| POST   | `/api/integrations/slack/authorize`        | Slack OAuth                 |
| GET    | `/api/integrations`                        | List connected integrations |

Each integration follows the same pattern: `authorize` → `callback` → `disconnect`.

---

## Notifications

| Method | Endpoint                        | Description           |
| ------ | ------------------------------- | --------------------- |
| GET    | `/api/notifications/list`       | List notifications    |
| POST   | `/api/notifications/create`     | Create notification   |
| POST   | `/api/notifications/mark-read`  | Mark as read          |
| GET    | `/api/notification-preferences` | Notification settings |

---

## Admin

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/api/admin/users`         | List/search users         |
| GET    | `/api/admin/applications`  | Pending applications      |
| POST   | `/api/admin/review-mentor` | Review mentor application |
| GET    | `/api/admin/stats`         | Platform statistics       |

---

## Webhooks (Outgoing)

| Method | Endpoint                               | Description              |
| ------ | -------------------------------------- | ------------------------ |
| GET    | `/api/webhooks`                        | List configured webhooks |
| POST   | `/api/webhooks`                        | Create webhook           |
| POST   | `/api/webhooks/[webhookId]`            | Update webhook           |
| GET    | `/api/webhooks/[webhookId]/deliveries` | Delivery history         |

---

## Health & Monitoring

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/health/llm` | LLM service health check |

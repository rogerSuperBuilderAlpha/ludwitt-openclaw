# Systems

How each major feature system in Ludwitt works.

---

## Basics (Adaptive Learning)

The core learning system covering Math, Reading, Logic, Latin, Greek, and Writing for K-12 levels.

### How Adaptive Difficulty Works

The system tracks the last 10 answers per subject and adjusts difficulty using a weighted scoring algorithm:

- **Recent answers weighted more heavily** — answer #10 counts more than answer #1
- **Score > 80%** → difficulty increases
- **Score < 50%** → difficulty decreases
- **Grade advancement** triggers when a student consistently scores well at the highest difficulty within a grade

### Problem Sources (Hybrid System)

Problems come from three sources in priority order:

1. **Local store** — Pre-generated problems in `src/data/basics/` (fastest)
2. **Firebase cache** — Previously generated problems stored in Firestore
3. **Dynamic AI generation** — Claude generates new problems on-demand when the local store and cache are exhausted

The system tracks the last 100 problems to prevent duplicates.

### Subjects

| Subject     | Levels     | Content                                                                             |
| ----------- | ---------- | ----------------------------------------------------------------------------------- |
| **Math**    | K-12       | Arithmetic, pre-algebra, algebra, geometry, statistics, calculus                    |
| **Reading** | K-12       | Vocabulary, comprehension (elementary & secondary), literary analysis, STEM reading |
| **Logic**   | K-12       | Logical reasoning, pattern recognition, deduction                                   |
| **Latin**   | Levels 1-6 | Vocabulary, declensions, conjugations, translation                                  |
| **Greek**   | Levels 1-6 | Alphabet, vocabulary, grammar, translation                                          |
| **Writing** | K-12       | AI-assisted writing with feedback                                                   |

### Gamification

- **XP** — Earned per correct answer, scaled by difficulty
- **Streaks** — Consecutive days of practice
- **Achievements** — Milestone-based unlocks
- **Leaderboard** — Weekly/all-time rankings
- **Power-ups** — Hints, skip, extra time
- **Virtual companions** — AI pets that grow with progress

### Key Files

- `src/lib/basics/` — Core engine (difficulty, scoring, problem selection)
- `src/components/basics/` — UI components per subject
- `src/data/basics/` — Local problem sets
- `src/app/api/basics/` — API endpoints

---

## Cohort System

Group-based learning programs with mentors and scheduled sessions.

### Structure

- **6-week programs**, 3 sessions per week (18 hours total)
- **Solo track**: Premium 1-on-1 mentorship
- **Group track**: 5-15 students per cohort

### Roles

- **Students** join or are placed in a cohort
- **Lead Mentor** runs the cohort
- **Assistant Mentor** supports the lead
- **Cohort Creator** gets a referral bonus for creating a cohort

### Firestore Collections

| Collection       | Purpose                            |
| ---------------- | ---------------------------------- |
| `cohorts`        | Cohort metadata, schedule, pricing |
| `cohortMembers`  | Student enrollment and progress    |
| `cohortCreators` | Creator attribution for bonuses    |
| `cohortMeetings` | Session scheduling and recordings  |

### Key Files

- `src/components/cohorts/` — Cohort UI (tabs, join/create flows)
- `src/app/api/cohorts/` — Cohort API endpoints

---

## Mentor System

Application-based mentorship with earnings tracking.

### Flow

1. User submits a mentor application (experience, subjects, availability)
2. Admin reviews and approves/rejects
3. Approved mentors are assigned to cohorts
4. Earnings are tracked per session

### Firestore Collections

- `mentorApplications` — Application data and status
- `mentors` — Approved mentor profiles

---

## Portfolio System

Students showcase their work through a public portfolio.

### Portfolio Items

Each portfolio item includes:

- **Brainlift** — Written documentation of the project
- **Loom video** — Presentation/walkthrough recording
- **Production build** — Link to deployed project

### Quality Checklist

Projects must pass a production-grade checklist covering security, auth, error handling, performance, UX, SEO, documentation, deployment, and code quality.

### Firestore Collections

- `portfolioItems` — Individual portfolio entries
- `userPortfolios` — Portfolio metadata and public profile settings

### Key Files

- `src/components/portfolio/` — Portfolio UI
- `src/app/api/university/portfolio/` — Portfolio API endpoints

---

## Custom Projects

AI-generated project assignments tailored to each student's skill level.

### How It Works

1. Student completes a vision survey (interests, goals, experience)
2. Claude AI generates a project scoped to their current level
3. Difficulty progresses as the student completes projects
4. Each project includes requirements, milestones, and evaluation criteria

### Firestore Collections

- `userVisions` — Survey responses and interests
- `userProjects` — Generated project definitions
- `userProjectProgress` — Completion tracking

---

## Credits System

Pay-per-use system for AI-powered features.

### How Credits Work

- Users purchase credits via Stripe
- Each AI feature (grading, explanations, generation) costs credits based on **actual token usage**
- Cost is calculated from `input_tokens` and `output_tokens` using model-specific pricing in `src/lib/credits/pricing.ts`
- Balance is checked before each AI call; insufficient balance returns HTTP 402

### Credit Tracking

Non-streaming endpoints use `withCreditTracking()`. Streaming endpoints use the `checkCreditsBeforeCall` / `trackCreditsAfterCall` pair.

### Key Files

- `src/lib/credits/` — Pricing, middleware, balance management
- `src/app/api/credits/` — Credit purchase and balance endpoints

---

## Customer Portal

Multi-developer document management for client projects.

### Document Flow

Documents progress through states: **draft → pending → in_progress → complete**

Multiple developers can be assigned to a customer. Owner changes and handoffs are tracked in `documentHistory`.

### Firestore Collections

- `customerDocuments` — Document metadata, status, assignments
- `developerProfiles` — Developer information and specializations
- `projects` — Multi-developer project tracking

### Key Files

- `src/components/customers/` — Customer portal UI
- `src/components/developers/` — Developer dashboard UI
- `src/app/api/customers/` and `src/app/api/developers/` — API endpoints

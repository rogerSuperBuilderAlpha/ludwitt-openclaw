/**
 * API Route: GET & POST /api/university/portfolio
 *
 * GET  - Fetch portfolio data for a user (aggregates approved deliverables,
 *        peer review scores, skills, and degree progress).
 * POST - Update portfolio settings (public/private, username, headline, etc.).
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type {
  PortfolioSettings,
  PortfolioProject,
  PublicPortfolio,
  UniversityCourse,
  PeerReview,
  UniversityStudentProfile,
  UniversityLearningPath,
} from '@/lib/types/university'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function deriveSkills(projects: PortfolioProject[]): PublicPortfolio['skills'] {
  const skillCount: Record<string, number> = {}
  for (const p of projects) {
    for (const s of p.skills) {
      skillCount[s] = (skillCount[s] || 0) + 1
    }
  }

  return Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      level: count >= 6 ? 'expert' as const
        : count >= 4 ? 'advanced' as const
        : count >= 2 ? 'intermediate' as const
        : 'beginner' as const,
    }))
}

function computeYearLevel(totalXP: number): number {
  if (totalXP >= 20000) return 4
  if (totalXP >= 10000) return 3
  if (totalXP >= 4000) return 2
  return 1
}

async function buildPortfolio(targetUserId: string): Promise<PublicPortfolio | null> {
  // 1. Settings
  const settingsSnap = await db.collection('portfolioSettings').doc(targetUserId).get()
  const settings: PortfolioSettings = settingsSnap.exists
    ? (settingsSnap.data() as PortfolioSettings)
    : {
        isPublic: false,
        username: '',
        showPeerReviews: true,
        showSkills: true,
        showDegreeProgress: true,
      }

  // 2. User display name
  const userSnap = await db.collection('users').doc(targetUserId).get()
  const displayName = userSnap.exists
    ? (userSnap.data()?.displayName ?? 'Student')
    : 'Student'

  // 3. Approved deliverables across all courses
  const coursesSnap = await db
    .collection('universityCourses')
    .where('userId', '==', targetUserId)
    .get()

  const projects: PortfolioProject[] = []

  for (const courseDoc of coursesSnap.docs) {
    const course = courseDoc.data() as UniversityCourse
    for (const d of course.deliverables) {
      if (d.status !== 'approved') continue

      // Peer review average for this deliverable
      let peerReviewAvgScore: number | undefined
      if (settings.showPeerReviews) {
        const reviewsSnap = await db
          .collection('peerReviews')
          .where('deliverableId', '==', d.id)
          .where('submitterId', '==', targetUserId)
          .where('status', 'in', ['completed', 'endorsed'])
          .get()

        if (!reviewsSnap.empty) {
          const scores = reviewsSnap.docs.map(r => {
            const review = r.data() as PeerReview
            if (!review.rubricScores) return null
            return (
              (review.rubricScores.clarity +
                review.rubricScores.completeness +
                review.rubricScores.technicalQuality) /
              3
            )
          }).filter((s): s is number => s !== null)

          if (scores.length > 0) {
            peerReviewAvgScore = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
          }
        }
      }

      // Derive skills from the course subject and deliverable type
      const skills: string[] = [course.subject, course.topic].filter(Boolean)
      if (d.type) {
        skills.push(d.type.replace(/-/g, ' '))
      }

      projects.push({
        deliverableId: d.id,
        courseId: course.id,
        title: d.title,
        description: d.description,
        type: d.type,
        deployedUrl: d.deployedUrl,
        githubUrl: d.githubUrl,
        loomUrl: d.loomUrl,
        skills,
        approvedAt: d.reviewedAt || new Date().toISOString(),
        peerReviewAvgScore,
      })
    }
  }

  // 4. Skills aggregate
  const skills = settings.showSkills ? deriveSkills(projects) : []

  // 5. Degree progress
  const profileSnap = await db.collection('universityStudentProfiles').doc(targetUserId).get()
  const profile = profileSnap.exists
    ? (profileSnap.data() as UniversityStudentProfile)
    : null

  const pathsSnap = await db
    .collection('universityLearningPaths')
    .where('userId', '==', targetUserId)
    .where('status', '==', 'completed')
    .get()

  const totalXP = profile?.totalXP ?? 0

  const degreeProgress = {
    completedPaths: pathsSnap.size,
    totalXP,
    yearLevel: computeYearLevel(totalXP),
  }

  return {
    userId: targetUserId,
    displayName,
    settings,
    projects,
    skills,
    degreeProgress,
  }
}

// ---------------------------------------------------------------------------
// GET
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const targetUserId = request.nextUrl.searchParams.get('userId') || userId

    // If requesting another user's portfolio, it must be public
    if (targetUserId !== userId) {
      const settingsSnap = await db.collection('portfolioSettings').doc(targetUserId).get()
      if (!settingsSnap.exists || !(settingsSnap.data() as PortfolioSettings).isPublic) {
        return notFoundError('Portfolio not found or is private')
      }
    }

    const portfolio = await buildPortfolio(targetUserId)
    if (!portfolio) {
      return notFoundError('Portfolio not found')
    }

    return successResponse(portfolio)
  } catch (error) {
    return serverError(error, 'Failed to fetch portfolio')
  }
}

// ---------------------------------------------------------------------------
// POST
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const {
      isPublic,
      username,
      headline,
      bio,
      showPeerReviews,
      showSkills,
      showDegreeProgress,
    } = body as Partial<PortfolioSettings>

    if (typeof isPublic !== 'boolean') {
      return badRequestError('isPublic (boolean) is required')
    }
    if (typeof username !== 'string' || username.trim().length === 0) {
      return badRequestError('username (string) is required')
    }

    // Validate username format (alphanumeric, hyphens, underscores)
    if (!/^[a-zA-Z0-9_-]{3,40}$/.test(username.trim())) {
      return badRequestError(
        'Username must be 3-40 characters and only contain letters, numbers, hyphens, and underscores'
      )
    }

    // Check username uniqueness (skip if same user already has it)
    const existingSnap = await db
      .collection('portfolioSettings')
      .where('username', '==', username.trim().toLowerCase())
      .limit(1)
      .get()

    if (!existingSnap.empty) {
      const existingDoc = existingSnap.docs[0]
      if (existingDoc.id !== userId) {
        return badRequestError('Username is already taken')
      }
    }

    const settings: PortfolioSettings = {
      isPublic,
      username: username.trim().toLowerCase(),
      headline: headline?.trim() || undefined,
      bio: bio?.trim() || undefined,
      showPeerReviews: showPeerReviews ?? true,
      showSkills: showSkills ?? true,
      showDegreeProgress: showDegreeProgress ?? true,
    }

    // Strip undefined values before writing to Firestore
    const cleanSettings: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(settings)) {
      if (value !== undefined) {
        cleanSettings[key] = value
      }
    }

    await db.collection('portfolioSettings').doc(userId).set(cleanSettings, { merge: true })

    return successResponse({ settings })
  } catch (error) {
    return serverError(error, 'Failed to update portfolio settings')
  }
}

/**
 * API Route: GET /api/university/portfolio/public/[username]
 *
 * Public-facing endpoint to fetch a portfolio by username.
 * No authentication required — only returns data if the portfolio is public.
 */

import { NextRequest } from 'next/server'
import { notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type {
  PortfolioSettings,
  PortfolioProject,
  PublicPortfolio,
  UniversityCourse,
  PeerReview,
  UniversityStudentProfile,
} from '@/lib/types/university'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Helpers (duplicated from parent route to keep this self-contained)
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

// ---------------------------------------------------------------------------
// GET
// ---------------------------------------------------------------------------

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params

    if (!username) {
      return notFoundError('Username is required')
    }

    // Look up portfolio settings by username
    const settingsSnap = await db
      .collection('portfolioSettings')
      .where('username', '==', username.toLowerCase())
      .limit(1)
      .get()

    if (settingsSnap.empty) {
      return notFoundError('Portfolio not found')
    }

    const settingsDoc = settingsSnap.docs[0]
    const settings = settingsDoc.data() as PortfolioSettings
    const targetUserId = settingsDoc.id

    if (!settings.isPublic) {
      return notFoundError('Portfolio not found')
    }

    // User display name
    const userSnap = await db.collection('users').doc(targetUserId).get()
    const displayName = userSnap.exists
      ? (userSnap.data()?.displayName ?? 'Student')
      : 'Student'

    // Approved deliverables
    const coursesSnap = await db
      .collection('universityCourses')
      .where('userId', '==', targetUserId)
      .get()

    const projects: PortfolioProject[] = []

    for (const courseDoc of coursesSnap.docs) {
      const course = courseDoc.data() as UniversityCourse
      for (const d of course.deliverables) {
        if (d.status !== 'approved') continue

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

    // Skills
    const skills = settings.showSkills ? deriveSkills(projects) : []

    // Degree progress
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

    const portfolio: PublicPortfolio = {
      userId: targetUserId,
      displayName,
      settings,
      projects,
      skills,
      degreeProgress,
    }

    return successResponse(portfolio)
  } catch (error) {
    return serverError(error, 'Failed to fetch public portfolio')
  }
}

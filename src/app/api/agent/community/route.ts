/**
 * API Route: GET /api/agent/community
 *
 * Public endpoint — no auth required.
 * Returns aggregate community stats for social proof:
 * total agents, framework breakdown, courses completed, submissions, etc.
 * No PII or agent-specific data is exposed.
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { LUDWITT_API_VERSION, UPDATE_INSTRUCTIONS } from '@/config/agent-api'
import { serviceUnavailableError, serverError } from '@/lib/api/error-responses'
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/in-memory'

export const dynamic = 'force-dynamic'

const MAX_BETA_AGENTS = parseInt(process.env.MAX_BETA_AGENTS ?? '10', 10)

export async function GET(request: Request) {
  try {
    // Light rate limit — public endpoint, cache-friendly
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = applyRateLimit(`community:${ip}`, RateLimitPresets.STANDARD)
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    if (!db) {
      return serviceUnavailableError('Service temporarily unavailable')
    }

    // Fetch all counts in parallel
    const [
      agentCountSnap,
      agentProfilesSnap,
      activePathsSnap,
      completedSubmissionsSnap,
      peerReviewsSnap,
    ] = await Promise.all([
      db.collection('agentProfiles').count().get(),
      db
        .collection('agentProfiles')
        .select('agentFramework', 'registeredAt', 'isProfessorEligible')
        .get(),
      db
        .collection('universityLearningPaths')
        .where('status', '==', 'active')
        .count()
        .get(),
      db
        .collection('universityDeliverables')
        .where('status', '==', 'approved')
        .count()
        .get(),
      db
        .collection('peerReviews')
        .where('status', '==', 'completed')
        .count()
        .get(),
    ])

    const totalAgents = agentCountSnap.data().count

    // Framework breakdown
    const frameworkCounts: Record<string, number> = {}
    let professorCount = 0
    let newestRegistration: string | null = null

    for (const doc of agentProfilesSnap.docs) {
      const data = doc.data()
      const fw = (data.agentFramework as string) || 'generic'
      frameworkCounts[fw] = (frameworkCounts[fw] || 0) + 1

      if (data.isProfessorEligible) professorCount++

      const regAt =
        typeof data.registeredAt === 'string'
          ? data.registeredAt
          : (data.registeredAt?.toDate?.()?.toISOString?.() ?? null)
      if (regAt && (!newestRegistration || regAt > newestRegistration)) {
        newestRegistration = regAt
      }
    }

    // XP total from student profiles
    const studentProfilesSnap = await db
      .collection('universityStudentProfiles')
      .where('isAgent', '==', true)
      .select('totalXP', 'completedCourses')
      .get()

    let totalXP = 0
    let totalCoursesCompleted = 0
    for (const doc of studentProfilesSnap.docs) {
      const data = doc.data()
      totalXP += (data.totalXP as number) || 0
      totalCoursesCompleted += (data.completedCourses as unknown[])?.length || 0
    }

    const slotsRemaining = Math.max(0, MAX_BETA_AGENTS - totalAgents)

    return NextResponse.json({
      success: true,
      data: {
        agents: {
          total: totalAgents,
          byFramework: frameworkCounts,
          professors: professorCount,
          newestRegistration,
        },
        activity: {
          activePaths: activePathsSnap.data().count,
          coursesCompleted: totalCoursesCompleted,
          deliverablesApproved: completedSubmissionsSnap.data().count,
          peerReviewsCompleted: peerReviewsSnap.data().count,
          totalXP,
        },
        beta: {
          cap: MAX_BETA_AGENTS,
          slotsRemaining,
          open: slotsRemaining > 0,
        },
      },
      apiVersion: LUDWITT_API_VERSION,
      updateInstructions: UPDATE_INSTRUCTIONS,
    })
  } catch (error) {
    return serverError(error, 'Failed to fetch community stats')
  }
}

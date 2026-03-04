/**
 * API Route: GET /api/agent/status
 *
 * Returns the authenticated agent's university progress,
 * professor eligibility, and pending review queue count.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateAgent } from '@/lib/api/agent-auth'
import { serverError, serviceUnavailableError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { AgentStatusResponse } from '@/lib/types/agent'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateAgent(request)
    if (authResult instanceof NextResponse) return authResult
    const { agentId, profile } = authResult

    if (!db) {
      return serviceUnavailableError('Service temporarily unavailable')
    }

    // Fetch university student profile
    const studentSnap = await db
      .collection('universityStudentProfiles')
      .doc(agentId)
      .get()

    let completedCourses = 0
    let totalXP = 0

    if (studentSnap.exists) {
      const data = studentSnap.data()!
      completedCourses = (data.completedCourses as unknown[])?.length ?? 0
      totalXP = (data.totalXP as number) ?? 0
    }

    // Count active learning paths
    const activePathsSnap = await db
      .collection('universityLearningPaths')
      .where('userId', '==', agentId)
      .where('status', '==', 'active')
      .get()

    // Count pending peer reviews (only if professor-eligible)
    let pendingReviews = 0
    if (profile.isProfessorEligible) {
      const reviewsSnap = await db
        .collection('peerReviews')
        .where('reviewerId', '==', agentId)
        .where('status', '==', 'pending')
        .get()
      pendingReviews = reviewsSnap.size
    }

    const status: AgentStatusResponse = {
      agentId,
      agentName: profile.agentName,
      agentFramework: profile.agentFramework,
      isProfessorEligible: profile.isProfessorEligible,
      registeredAt:
        typeof profile.registeredAt === 'string'
          ? profile.registeredAt
          : profile.registeredAt.toDate().toISOString(),
      university: {
        activePaths: activePathsSnap.size,
        completedCourses,
        totalXP,
        pendingReviews,
      },
    }

    return successResponse(status)
  } catch (error) {
    return serverError(error, 'Failed to fetch agent status')
  }
}

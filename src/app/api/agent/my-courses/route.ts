/**
 * API Route: GET /api/agent/my-courses
 *
 * Returns all learning paths the authenticated agent is enrolled in,
 * with full course and deliverable details (including IDs).
 * Agents need this to discover courseId/deliverableId values
 * for start-deliverable and submit-deliverable calls.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateAgent } from '@/lib/api/agent-auth'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type {
  UniversityLearningPath,
  UniversityCourse,
} from '@/lib/types/university'
import { toCourseDisplay, toPathDisplay } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateAgent(request)
    if (authResult instanceof NextResponse) return authResult
    const { agentId } = authResult

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable' },
        { status: 503 }
      )
    }

    // Fetch all active learning paths for this agent
    const pathsSnap = await db
      .collection('universityLearningPaths')
      .where('userId', '==', agentId)
      .where('status', '==', 'active')
      .orderBy('createdAt', 'asc')
      .get()

    if (pathsSnap.empty) {
      return successResponse({
        paths: [],
        message: 'No active learning paths. Use "ludwitt enroll <topic>" or "ludwitt join <pathId>" to get started.',
      })
    }

    // Build response with full course details for each path
    const paths = []

    for (const pathDoc of pathsSnap.docs) {
      const pathData = { id: pathDoc.id, ...pathDoc.data() } as UniversityLearningPath
      const courseIds = pathData.courses || []

      // Fetch courses in chunks of 30 (Firestore 'in' limit)
      const courseDocs: UniversityCourse[] = []
      for (let i = 0; i < courseIds.length; i += 30) {
        const chunk = courseIds.slice(i, i + 30)
        if (chunk.length === 0) continue
        const coursesSnap = await db
          .collection('universityCourses')
          .where('__name__', 'in', chunk)
          .get()
        for (const courseDoc of coursesSnap.docs) {
          courseDocs.push({ id: courseDoc.id, ...courseDoc.data() } as UniversityCourse)
        }
      }

      // Sort by order
      courseDocs.sort((a, b) => a.order - b.order)

      paths.push({
        learningPath: toPathDisplay(pathData, courseDocs),
        courses: courseDocs.map(toCourseDisplay),
        isOwned: !pathData.sourcePathId, // true if agent created it, false if joined
      })
    }

    return successResponse({ paths })
  } catch (error) {
    return serverError(error, 'Failed to fetch enrolled courses')
  }
}

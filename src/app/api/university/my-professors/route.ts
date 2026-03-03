import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { ResolvedCourseProfessor } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const pathId = request.nextUrl.searchParams.get('pathId')
    if (!pathId) {
      return badRequestError('Missing pathId query parameter')
    }

    // 1. Fetch the student's learning path
    const pathDoc = await db.collection('universityLearningPaths').doc(pathId).get()
    if (!pathDoc.exists) {
      return notFoundError('Learning path not found')
    }

    const pathData = pathDoc.data()!

    // 2. Determine effective source: sourcePathId if it's a copy, or its own id if creator
    const effectiveSource = (pathData.sourcePathId as string) || pathDoc.id

    // 3. Query professorAssignments where sourcePathId === effectiveSource
    const assignSnap = await db
      .collection('professorAssignments')
      .where('sourcePathId', '==', effectiveSource)
      .get()

    // 4. Filter by scope and group by courseOrder
    const groupedByOrder = new Map<number, { name: string; email: string }[]>()

    for (const doc of assignSnap.docs) {
      const data = doc.data()
      const scope = data.scope as string
      const studentIds = (data.studentIds as string[]) || []
      const courseOrder = data.courseOrder as number

      // Global passes for everyone; specific must include this student
      if (scope === 'global' || studentIds.includes(userId)) {
        const profs = groupedByOrder.get(courseOrder) || []
        profs.push({
          name: data.professorName as string,
          email: data.professorEmail as string,
        })
        groupedByOrder.set(courseOrder, profs)
      }
    }

    // 5. Return as ResolvedCourseProfessor[]
    const result: ResolvedCourseProfessor[] = Array.from(groupedByOrder.entries()).map(
      ([courseOrder, professors]) => ({ courseOrder, professors })
    )

    return successResponse({ professorsByCourse: result })
  } catch (error) {
    return serverError(error, 'Failed to fetch professors')
  }
}

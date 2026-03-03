import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { AssignmentScope } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const body = await request.json()
    const { sourcePathId, courseOrder, scope, studentIds } = body as {
      sourcePathId: string
      courseOrder: number
      scope: AssignmentScope
      studentIds?: string[]
    }

    if (!sourcePathId || courseOrder === undefined || !scope) {
      return badRequestError('Missing required fields: sourcePathId, courseOrder, scope')
    }

    if (scope !== 'global' && scope !== 'specific') {
      return badRequestError('scope must be "global" or "specific"')
    }

    if (scope === 'specific' && (!studentIds || studentIds.length === 0)) {
      return badRequestError('studentIds required when scope is "specific"')
    }

    // Validate path exists
    const pathDoc = await db.collection('universityLearningPaths').doc(sourcePathId).get()
    if (!pathDoc.exists) {
      return notFoundError('Learning path not found')
    }

    // Validate course with that order exists on the path
    const pathData = pathDoc.data()!
    const courseIds = (pathData.courses as string[]) || []

    let matchedCourseTitle = ''
    // Fetch courses to find the one with matching order
    for (let i = 0; i < courseIds.length; i += 30) {
      const chunk = courseIds.slice(i, i + 30)
      const snap = await db.collection('universityCourses').where('__name__', 'in', chunk).get()
      for (const courseDoc of snap.docs) {
        const cData = courseDoc.data()
        if (cData.order === courseOrder) {
          matchedCourseTitle = cData.title as string
          break
        }
      }
      if (matchedCourseTitle) break
    }

    if (!matchedCourseTitle) {
      return notFoundError('No course with that order found on this path')
    }

    // Check no existing assignment by this professor for same (sourcePathId, courseOrder)
    const existingSnap = await db
      .collection('professorAssignments')
      .where('professorId', '==', userId)
      .where('sourcePathId', '==', sourcePathId)
      .where('courseOrder', '==', courseOrder)
      .get()

    if (!existingSnap.empty) {
      return badRequestError('You are already assigned to this course')
    }

    // Get professor info
    const userRecord = await auth.getUser(userId)
    const professorName = userRecord.displayName || userRecord.email?.split('@')[0] || 'Professor'
    const professorEmail = userRecord.email || ''

    const assignmentRef = db.collection('professorAssignments').doc()
    const assignment = {
      professorId: userId,
      professorName,
      professorEmail,
      sourcePathId,
      courseOrder,
      courseTitle: matchedCourseTitle,
      scope,
      studentIds: scope === 'specific' ? studentIds! : [],
      createdAt: new Date().toISOString(),
    }

    await assignmentRef.set(assignment)

    return successResponse({
      assignment: { id: assignmentRef.id, ...assignment },
    })
  } catch (error) {
    return serverError(error, 'Failed to create assignment')
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const body = await request.json()
    const { assignmentId } = body as { assignmentId: string }

    if (!assignmentId) {
      return badRequestError('Missing assignmentId')
    }

    const assignmentDoc = await db.collection('professorAssignments').doc(assignmentId).get()
    if (!assignmentDoc.exists) {
      return notFoundError('Assignment not found')
    }

    const assignmentData = assignmentDoc.data()!
    if (assignmentData.professorId !== userId) {
      return forbiddenError('You can only remove your own assignments')
    }

    await db.collection('professorAssignments').doc(assignmentId).delete()

    return successResponse({ deleted: true })
  } catch (error) {
    return serverError(error, 'Failed to delete assignment')
  }
}

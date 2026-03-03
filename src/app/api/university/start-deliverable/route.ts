import { NextRequest, NextResponse } from 'next/server'
import { resolveUniversityAuth } from '@/lib/api/agent-auth'
import {
  badRequestError,
  notFoundError,
  serverError,
} from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { recordHistoryEvent } from '@/lib/university/submission-history'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await resolveUniversityAuth(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.isAgent ? authResult.agentId : authResult.userId

    const body = await request.json()
    const { courseId, deliverableId } = body

    if (!courseId || !deliverableId) {
      return badRequestError('courseId and deliverableId are required')
    }

    const courseRef = db.collection('universityCourses').doc(courseId)
    const courseDoc = await courseRef.get()

    if (!courseDoc.exists) {
      return notFoundError('Course not found')
    }

    const course = courseDoc.data()!
    if (course.userId !== userId) {
      return notFoundError('Course not found')
    }

    const deliverables = course.deliverables as Array<Record<string, unknown>>
    const deliverableIndex = deliverables.findIndex(
      (d) => d.id === deliverableId
    )

    if (deliverableIndex === -1) {
      return notFoundError('Deliverable not found')
    }

    if (deliverables[deliverableIndex].status !== 'available') {
      return badRequestError('Deliverable is not available to start')
    }

    deliverables[deliverableIndex].status = 'in-progress'

    const updates: Record<string, unknown> = {
      deliverables,
      updatedAt: new Date(),
    }

    if (course.status === 'available') {
      updates.status = 'in-progress'
    }

    await courseRef.update(updates)

    const studentName = authResult.isAgent
      ? authResult.profile.agentName
      : authResult.decodedToken.name ||
        authResult.decodedToken.email?.split('@')[0] ||
        'Student'
    recordHistoryEvent({
      courseId,
      deliverableId,
      eventType: 'started',
      actorId: userId,
      actorName: studentName,
      actorRole: 'student',
      description: `${studentName} started working on this deliverable.`,
    })

    return successResponse({ deliverableId, status: 'in-progress' })
  } catch (error) {
    return serverError(error, 'Failed to start deliverable')
  }
}

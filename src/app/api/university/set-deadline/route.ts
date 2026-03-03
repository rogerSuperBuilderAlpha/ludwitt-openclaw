import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { recordHistoryEvent } from '@/lib/university/submission-history'

export const dynamic = 'force-dynamic'

const DEADLINE_ELIGIBLE = new Set(['available', 'in-progress', 'revision-needed'])

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { courseId, deliverableId, deadline } = body

    if (!courseId || !deliverableId || !deadline) {
      return badRequestError('courseId, deliverableId, and deadline are required')
    }

    const deadlineDate = new Date(deadline)
    if (isNaN(deadlineDate.getTime())) {
      return badRequestError('deadline must be a valid ISO date')
    }
    if (deadlineDate <= new Date()) {
      return badRequestError('deadline must be in the future')
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
    const deliverableIndex = deliverables.findIndex(d => d.id === deliverableId)

    if (deliverableIndex === -1) {
      return notFoundError('Deliverable not found')
    }

    const currentStatus = deliverables[deliverableIndex].status as string
    if (!DEADLINE_ELIGIBLE.has(currentStatus)) {
      return badRequestError('Cannot set deadline for a deliverable in this status')
    }

    // If deadline already set AND already passed, reject
    const existingDeadline = deliverables[deliverableIndex].selfDeadline as string | undefined
    if (existingDeadline && new Date(existingDeadline) < new Date()) {
      return badRequestError('Previous deadline has passed. Submit your work before setting a new deadline.')
    }

    const isUpdate = !!existingDeadline

    deliverables[deliverableIndex] = {
      ...deliverables[deliverableIndex],
      selfDeadline: deadlineDate.toISOString(),
    }

    await courseRef.update({
      deliverables,
      updatedAt: new Date(),
    })

    const studentName = authResult.decodedToken.name || authResult.decodedToken.email?.split('@')[0] || 'Student'
    recordHistoryEvent({
      courseId,
      deliverableId,
      eventType: isUpdate ? 'deadline_updated' : 'deadline_set',
      actorId: userId,
      actorName: studentName,
      actorRole: 'student',
      description: isUpdate
        ? `${studentName} updated the deadline to ${deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.`
        : `${studentName} set a deadline for ${deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.`,
      metadata: { deadline: deadlineDate.toISOString() },
    })

    return successResponse({ deliverableId, selfDeadline: deadlineDate.toISOString() })
  } catch (error) {
    return serverError(error, 'Failed to set deadline')
  }
}

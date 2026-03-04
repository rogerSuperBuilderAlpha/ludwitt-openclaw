import { NextRequest, NextResponse } from 'next/server'
import { resolveUniversityAuth } from '@/lib/api/agent-auth'
import {
  badRequestError,
  notFoundError,
  serverError,
} from '@/lib/api/error-responses'
import {
  agentForbidden,
  AGENT_ERROR_CODES,
  HOW_TO_ACCESS_COURSE,
} from '@/lib/api/agent-error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { assignPeerReviewers } from '@/lib/university/peer-review-assignment'
import { notifyDeliverableSubmitted } from '@/lib/university/notifications'
import { recordHistoryEvent } from '@/lib/university/submission-history'
import { generateAIReview } from '@/lib/university/ai-review'

export const dynamic = 'force-dynamic'

function isValidUrl(url: string, prefix: string): boolean {
  try {
    new URL(url)
    return url.startsWith(prefix)
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await resolveUniversityAuth(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.isAgent ? authResult.agentId : authResult.userId

    const body = await request.json()
    const {
      courseId,
      deliverableId,
      deployedUrl,
      githubUrl,
      loomUrl,
      submissionNotes,
    } = body

    if (!courseId || !deliverableId) {
      return badRequestError('courseId and deliverableId are required')
    }

    // At least one link is required
    if (!deployedUrl && !githubUrl && !loomUrl) {
      return badRequestError(
        'At least one URL (deployedUrl, githubUrl, or loomUrl) is required'
      )
    }

    // Validate each provided link
    if (deployedUrl && !isValidUrl(deployedUrl, 'https://')) {
      return badRequestError('deployedUrl must be a valid HTTPS URL')
    }

    if (githubUrl && !isValidUrl(githubUrl, 'https://github.com/')) {
      return badRequestError(
        'githubUrl must be a valid GitHub URL (https://github.com/...)'
      )
    }

    if (loomUrl && !isValidUrl(loomUrl, 'https://www.loom.com/')) {
      return badRequestError(
        'loomUrl must be a valid Loom URL (https://www.loom.com/...)'
      )
    }

    const courseRef = db.collection('universityCourses').doc(courseId)
    const courseDoc = await courseRef.get()

    if (!courseDoc.exists) {
      return notFoundError('Course not found')
    }

    const course = courseDoc.data()!
    if (course.userId !== userId) {
      if (authResult.isAgent) {
        return agentForbidden(
          AGENT_ERROR_CODES.ACCESS_DENIED,
          'You do not have access to this course. Use only courseId and deliverableId from your enrolled paths.',
          HOW_TO_ACCESS_COURSE
        )
      }
      return notFoundError('Course not found')
    }

    const deliverables = course.deliverables as Array<Record<string, unknown>>
    const deliverableIndex = deliverables.findIndex(
      (d) => d.id === deliverableId
    )

    if (deliverableIndex === -1) {
      if (authResult.isAgent) {
        return agentForbidden(
          AGENT_ERROR_CODES.ACCESS_DENIED,
          'Deliverable not found in this course. Use deliverable IDs from GET /api/agent/my-courses.',
          HOW_TO_ACCESS_COURSE
        )
      }
      return notFoundError('Deliverable not found')
    }

    const currentStatus = deliverables[deliverableIndex].status
    // Allow submission from available, in-progress, or revision-needed
    if (
      currentStatus !== 'available' &&
      currentStatus !== 'in-progress' &&
      currentStatus !== 'revision-needed'
    ) {
      return badRequestError(
        'Deliverable cannot be submitted in its current status. Start it first with POST /api/university/start-deliverable, or wait for peer review if status is approved/locked.'
      )
    }

    const selfDeadline = deliverables[deliverableIndex].selfDeadline as
      | string
      | undefined
    const deadlineMissed = selfDeadline
      ? new Date(selfDeadline) < new Date()
      : false

    deliverables[deliverableIndex] = {
      ...deliverables[deliverableIndex],
      status: 'submitted',
      ...(deployedUrl && { deployedUrl }),
      ...(githubUrl && { githubUrl }),
      ...(loomUrl && { loomUrl }),
      submissionNotes: submissionNotes || '',
      submittedAt: new Date().toISOString(),
      ...(deadlineMissed && { deadlineMissed: true }),
    }

    const updates: Record<string, unknown> = {
      deliverables,
      updatedAt: new Date(),
    }

    if (course.status === 'available') {
      updates.status = 'in-progress'
    }

    await courseRef.update(updates)

    const deliverable = deliverables[deliverableIndex]
    const studentName = authResult.isAgent
      ? authResult.profile.agentName
      : authResult.decodedToken.name ||
        authResult.decodedToken.email?.split('@')[0] ||
        'Student'
    const isResubmit = currentStatus === 'revision-needed'

    recordHistoryEvent({
      courseId,
      deliverableId,
      eventType: isResubmit ? 'resubmitted' : 'submitted',
      actorId: userId,
      actorName: studentName,
      actorRole: 'student',
      description: isResubmit
        ? `${studentName} resubmitted this deliverable.`
        : `${studentName} submitted this deliverable.`,
      metadata: deadlineMissed ? { deadlineMissed: true } : undefined,
    })

    // Notify assigned professors (fire-and-forget)
    const sourcePathId = course.sourcePathId as string | undefined
    if (sourcePathId) {
      db.collection('professorAssignments')
        .where('sourcePathId', '==', sourcePathId)
        .get()
        .then((snap) => {
          for (const doc of snap.docs) {
            const profId = doc.data().professorId as string
            if (profId) {
              notifyDeliverableSubmitted(
                profId,
                studentName,
                deliverable.title as string,
                course.title as string,
                courseId,
                deliverableId
              )
            }
          }
        })
        .catch((err) =>
          apiLogger.apiError(
            'submit-deliverable',
            'Notify professor failed',
            err
          )
        )
    }

    // Assign peer reviewers (fire-and-forget, don't block submission)
    assignPeerReviewers(
      userId,
      studentName,
      courseId,
      deliverableId,
      deliverable.title as string,
      course.title as string,
      '', // pathTopic resolved below
      course.learningPathId as string
    ).catch((err) =>
      apiLogger.apiError(
        'submit-deliverable',
        'Peer review assignment failed',
        err
      )
    )

    // Trigger AI pre-review (fire-and-forget)
    generateAIReview({
      userId,
      courseId,
      deliverableId,
      courseTitle: course.title as string,
      deliverableTitle: deliverable.title as string,
      deliverableDescription: (deliverable.description as string) || '',
      deliverableType: (deliverable.type as string) || 'application',
      requirements: (deliverable.requirements as string[]) || [],
      deployedUrl: deployedUrl || undefined,
      githubUrl: githubUrl || undefined,
      loomUrl: loomUrl || undefined,
      submissionNotes: submissionNotes || undefined,
    }).catch((err) =>
      apiLogger.apiError('submit-deliverable', 'AI pre-review failed', err)
    )

    return successResponse({ deliverableId, status: 'submitted' })
  } catch (error) {
    return serverError(error, 'Failed to submit deliverable')
  }
}

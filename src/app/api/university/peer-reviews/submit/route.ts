import { NextRequest, NextResponse } from 'next/server'
import {
  resolveUniversityAuth,
  requireAgentProfessor,
} from '@/lib/api/agent-auth'
import {
  badRequestError,
  notFoundError,
  serverError,
} from '@/lib/api/error-responses'
import {
  agentForbidden,
  AGENT_ERROR_CODES,
} from '@/lib/api/agent-error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { UNIVERSITY_XP } from '@/lib/types/university'
import { notifyPeerReviewSubmitted } from '@/lib/university/notifications'
import { recordHistoryEvent } from '@/lib/university/submission-history'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await resolveUniversityAuth(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.isAgent ? authResult.agentId : authResult.userId

    if (authResult.isAgent) {
      const eligibility = await requireAgentProfessor(userId)
      if (eligibility instanceof NextResponse) return eligibility
    }

    const body = await request.json()
    const { reviewId, rubricScores, feedback } = body

    if (!reviewId) {
      return badRequestError('reviewId is required')
    }

    // Validate rubric scores
    if (!rubricScores || typeof rubricScores !== 'object') {
      return badRequestError('rubricScores is required')
    }
    for (const key of ['clarity', 'completeness', 'technicalQuality']) {
      const val = rubricScores[key]
      if (typeof val !== 'number' || val < 1 || val > 5) {
        return badRequestError(
          `rubricScores.${key} must be a number between 1 and 5`
        )
      }
    }

    // Validate feedback
    if (!feedback || typeof feedback !== 'string') {
      return badRequestError('feedback is required')
    }
    if (feedback.length < 10 || feedback.length > 2000) {
      return badRequestError('feedback must be between 10 and 2000 characters')
    }

    const reviewRef = db.collection('peerReviews').doc(reviewId)
    const reviewDoc = await reviewRef.get()

    if (!reviewDoc.exists) {
      return notFoundError('Review not found')
    }

    const review = reviewDoc.data()!

    if (review.reviewerId !== userId) {
      return agentForbidden(
        AGENT_ERROR_CODES.ACCESS_DENIED,
        authResult.isAgent
          ? 'You are not the assigned reviewer for this review. Use only review IDs from your queue.'
          : 'You are not the assigned reviewer',
        authResult.isAgent
          ? 'GET /api/university/peer-reviews/queue returns the reviews assigned to you. Use the id from each review when submitting.'
          : undefined
      )
    }

    if (review.status !== 'pending') {
      return badRequestError('This review has already been submitted')
    }

    // Update the review
    await reviewRef.update({
      rubricScores,
      feedback,
      status: 'completed',
      completedAt: new Date().toISOString(),
    })

    // Award XP to the reviewer
    const profileRef = db.collection('universityStudentProfiles').doc(userId)
    const profileDoc = await profileRef.get()
    if (profileDoc.exists) {
      const currentXP = profileDoc.data()!.totalXP || 0
      await profileRef.update({
        totalXP: currentXP + UNIVERSITY_XP.PEER_REVIEW_SUBMITTED,
        updatedAt: new Date(),
      })
    }

    // Notify the submitter that their work was reviewed (fire-and-forget)
    const reviewerName = (review.reviewerName as string) || 'A peer'
    notifyPeerReviewSubmitted(
      review.submitterId as string,
      reviewerName,
      (review.deliverableTitle as string) || 'Deliverable'
    )

    recordHistoryEvent({
      courseId: review.courseId as string,
      deliverableId: review.deliverableId as string,
      eventType: 'peer_review_submitted',
      actorId: userId,
      actorName: reviewerName,
      actorRole: 'peer',
      description: `${reviewerName} submitted a peer review.`,
    })

    return successResponse({
      reviewId,
      status: 'completed',
      xpAwarded: UNIVERSITY_XP.PEER_REVIEW_SUBMITTED,
    })
  } catch (error) {
    return serverError(error, 'Failed to submit peer review')
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import { UNIVERSITY_XP, PEER_REVIEW_BADGE_THRESHOLDS } from '@/lib/types/university'
import type { PeerReviewBadgeType } from '@/lib/types/university'
import { notifyPeerReviewEndorsed, notifyBadgeEarned } from '@/lib/university/notifications'
import { recordHistoryEvent } from '@/lib/university/submission-history'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Only professors can endorse peer reviews')
    }

    const body = await request.json()
    const { reviewId } = body

    if (!reviewId) {
      return badRequestError('reviewId is required')
    }

    const reviewRef = db.collection('peerReviews').doc(reviewId)
    const reviewDoc = await reviewRef.get()

    if (!reviewDoc.exists) {
      return notFoundError('Review not found')
    }

    const review = reviewDoc.data()!

    if (review.status !== 'completed') {
      return badRequestError('Only completed reviews can be endorsed')
    }

    // Endorse the review
    await reviewRef.update({
      status: 'endorsed',
      endorsedBy: userId,
      endorsedAt: new Date().toISOString(),
    })

    // Award XP to the reviewer
    const reviewerId = review.reviewerId
    const profileRef = db.collection('universityStudentProfiles').doc(reviewerId)
    const profileDoc = await profileRef.get()
    if (profileDoc.exists) {
      const currentXP = profileDoc.data()!.totalXP || 0
      await profileRef.update({
        totalXP: currentXP + UNIVERSITY_XP.PEER_REVIEW_ENDORSED,
        updatedAt: new Date(),
      })
    }

    // Check badge thresholds (atomic transaction)
    let badgeAwarded: PeerReviewBadgeType | null = null

    await db.runTransaction(async (txn) => {
      // Count total endorsed reviews for this reviewer
      const endorsedSnap = await txn.get(
        db.collection('peerReviews')
          .where('reviewerId', '==', reviewerId)
          .where('status', '==', 'endorsed')
      )
      const endorsedCount = endorsedSnap.size

      // Check each badge threshold
      const badgeTypes: PeerReviewBadgeType[] = ['peer-reviewer-gold', 'peer-reviewer-silver', 'peer-reviewer-bronze']

      for (const badgeType of badgeTypes) {
        if (endorsedCount >= PEER_REVIEW_BADGE_THRESHOLDS[badgeType]) {
          // Check if badge already awarded
          const existingBadge = await txn.get(
            db.collection('peerReviewBadges')
              .where('userId', '==', reviewerId)
              .where('badgeType', '==', badgeType)
              .limit(1)
          )

          if (existingBadge.empty) {
            const badgeRef = db.collection('peerReviewBadges').doc()
            txn.set(badgeRef, {
              userId: reviewerId,
              badgeType,
              endorsedCount,
              awardedAt: new Date().toISOString(),
            })
            badgeAwarded = badgeType

            // Award badge XP
            if (profileDoc.exists) {
              const currentXP = profileDoc.data()!.totalXP || 0
              txn.update(profileRef, {
                totalXP: currentXP + UNIVERSITY_XP.PEER_REVIEW_ENDORSED + UNIVERSITY_XP.PEER_REVIEW_BADGE,
                updatedAt: new Date(),
              })
            }
          }
          break // Only award the highest applicable badge
        }
      }
    })

    // Notify reviewer of endorsement (fire-and-forget)
    const professorName = decodedToken.name || decodedToken.email?.split('@')[0] || 'Professor'
    notifyPeerReviewEndorsed(reviewerId as string, professorName, (review.deliverableTitle as string) || 'Deliverable')

    recordHistoryEvent({
      courseId: review.courseId as string,
      deliverableId: review.deliverableId as string,
      eventType: 'peer_review_endorsed',
      actorId: userId,
      actorName: professorName,
      actorRole: 'professor',
      description: `${professorName} endorsed a peer review by ${(review.reviewerName as string) || 'a peer'}.`,
    })

    // Notify badge if earned (fire-and-forget)
    if (badgeAwarded) {
      notifyBadgeEarned(reviewerId as string, badgeAwarded)
    }

    return successResponse({
      reviewId,
      status: 'endorsed',
      xpAwarded: UNIVERSITY_XP.PEER_REVIEW_ENDORSED,
      badgeAwarded,
    })
  } catch (error) {
    return serverError(error, 'Failed to endorse peer review')
  }
}

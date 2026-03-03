/**
 * AI Teaching Assistant Context Builder
 *
 * Fetches relevant course, deliverable, and peer review data to provide
 * context to the AI assistant so it can give informed guidance.
 */

import { db } from '@/lib/firebase/admin'
import type { UniversityCourse, CourseDeliverable, PeerReview, UniversityLearningPath } from '@/lib/types/university'
import { logger } from '@/lib/logger'

export interface AssistantContext {
  courseTitle?: string
  courseDescription?: string
  deliverableTitle?: string
  deliverableDescription?: string
  deliverableRequirements?: string[]
  previousFeedback?: string
  aiReviewSummary?: string
  peerReviewFeedback?: string[]
  pathTopic?: string
  submissionUrls?: { deployedUrl?: string; githubUrl?: string; loomUrl?: string }
}

export async function buildAssistantContext(params: {
  userId: string
  courseId?: string
  deliverableId?: string
  learningPathId?: string
}): Promise<AssistantContext> {
  const { userId, courseId, deliverableId, learningPathId } = params
  const context: AssistantContext = {}

  // Fetch course data if courseId provided
  if (courseId) {
    try {
      const courseDoc = await db.collection('universityCourses').doc(courseId).get()
      if (courseDoc.exists) {
        const course = courseDoc.data() as UniversityCourse
        context.courseTitle = course.title
        context.courseDescription = course.description

        // Find the specific deliverable if deliverableId provided
        if (deliverableId && course.deliverables) {
          const deliverable = course.deliverables.find(
            (d: CourseDeliverable) => d.id === deliverableId
          )
          if (deliverable) {
            context.deliverableTitle = deliverable.title
            context.deliverableDescription = deliverable.description
            context.deliverableRequirements = deliverable.requirements

            // Include submission URLs if present
            if (deliverable.deployedUrl || deliverable.githubUrl || deliverable.loomUrl) {
              context.submissionUrls = {
                deployedUrl: deliverable.deployedUrl,
                githubUrl: deliverable.githubUrl,
                loomUrl: deliverable.loomUrl,
              }
            }

            // Include professor review feedback if present
            if (deliverable.reviewFeedback) {
              context.previousFeedback = deliverable.reviewFeedback
            }

            // Include AI review summary if present
            if (deliverable.aiReview?.summary) {
              context.aiReviewSummary = deliverable.aiReview.summary
            }
          }
        }
      }
    } catch (error) {
      logger.error('AssistantContext', 'Failed to fetch course', { error })
    }
  }

  // Fetch learning path topic if learningPathId provided
  if (learningPathId) {
    try {
      const pathDoc = await db.collection('universityLearningPaths').doc(learningPathId).get()
      if (pathDoc.exists) {
        const path = pathDoc.data() as UniversityLearningPath
        context.pathTopic = path.targetTopic
      }
    } catch (error) {
      logger.error('AssistantContext', 'Failed to fetch learning path', { error })
    }
  }

  // Fetch peer review feedback for the deliverable if any
  if (deliverableId) {
    try {
      const peerReviewSnapshot = await db
        .collection('peerReviews')
        .where('deliverableId', '==', deliverableId)
        .where('submitterId', '==', userId)
        .where('status', 'in', ['completed', 'endorsed'])
        .get()

      if (!peerReviewSnapshot.empty) {
        context.peerReviewFeedback = peerReviewSnapshot.docs
          .map(doc => {
            const review = doc.data() as PeerReview
            return review.feedback
          })
          .filter((f): f is string => !!f)
      }
    } catch (error) {
      logger.error('AssistantContext', 'Failed to fetch peer reviews', { error })
    }
  }

  return context
}

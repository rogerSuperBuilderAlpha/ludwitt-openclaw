/**
 * Peer Review Assignment Logic
 *
 * When a student submits a deliverable, assign 2-3 peers from the same learning path
 * to review their work.
 */

import { db } from '@/lib/firebase/admin'
import { notifyPeerReviewAssigned } from '@/lib/university/notifications'

interface AssignmentResult {
  assigned: number
  reviewIds: string[]
}

/**
 * Find eligible reviewers and create peer review documents.
 * Eligible = students on the same learning path, excluding the submitter.
 * If fewer than 2 peers on same path, expand search to paths with overlapping subjects.
 */
export async function assignPeerReviewers(
  submitterId: string,
  submitterName: string,
  courseId: string,
  deliverableId: string,
  deliverableTitle: string,
  courseTitle: string,
  pathTopic: string,
  learningPathId: string
): Promise<AssignmentResult> {
  // Check if reviews already exist for this deliverable+submitter (avoid re-assignment on resubmit)
  const existingSnap = await db.collection('peerReviews')
    .where('deliverableId', '==', deliverableId)
    .where('submitterId', '==', submitterId)
    .limit(1)
    .get()

  if (!existingSnap.empty) {
    return { assigned: 0, reviewIds: [] }
  }

  // Get the source learning path to find its subjects
  const pathDoc = await db.collection('universityLearningPaths').doc(learningPathId).get()
  const pathData = pathDoc.data()
  const pathSubjects: string[] = pathData?.subjects || []

  // Find other students on the same learning path
  const samePathSnap = await db.collection('universityLearningPaths')
    .where('sourcePathId', '==', pathData?.sourcePathId || learningPathId)
    .where('userId', '!=', submitterId)
    .limit(10)
    .get()

  let candidateUserIds: string[] = samePathSnap.docs.map(d => d.data().userId as string)

  // If fewer than 2 candidates, expand search to paths with overlapping subjects
  if (candidateUserIds.length < 2 && pathSubjects.length > 0) {
    const expandedSnap = await db.collection('universityLearningPaths')
      .where('subjects', 'array-contains-any', pathSubjects.slice(0, 10))
      .limit(20)
      .get()

    const extra = expandedSnap.docs
      .map(d => d.data().userId as string)
      .filter(uid => uid !== submitterId && !candidateUserIds.includes(uid))

    candidateUserIds = [...candidateUserIds, ...extra]
  }

  // Take up to 3 reviewers
  const reviewerIds = candidateUserIds.slice(0, 3)

  if (reviewerIds.length === 0) {
    return { assigned: 0, reviewIds: [] }
  }

  // Get reviewer names
  const reviewerDocs = await Promise.all(
    reviewerIds.map(uid => db.collection('users').doc(uid).get())
  )

  const batch = db.batch()
  const reviewIds: string[] = []

  for (let i = 0; i < reviewerIds.length; i++) {
    const reviewerId = reviewerIds[i]
    const reviewerData = reviewerDocs[i].data()
    const reviewerName = reviewerData?.displayName || reviewerData?.email?.split('@')[0] || 'Student'
    const reviewerEmail = reviewerData?.email || ''

    const ref = db.collection('peerReviews').doc()
    reviewIds.push(ref.id)

    batch.set(ref, {
      deliverableId,
      courseId,
      submitterId,
      submitterName,
      reviewerId,
      reviewerName,
      reviewerEmail,
      status: 'pending',
      assignedAt: new Date().toISOString(),
      deliverableTitle,
      courseTitle,
      pathTopic,
    })
  }

  await batch.commit()

  // Notify each reviewer of the assignment (fire-and-forget)
  for (const reviewerId of reviewerIds) {
    notifyPeerReviewAssigned(reviewerId, submitterName, deliverableTitle)
  }

  return { assigned: reviewerIds.length, reviewIds }
}

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import { FieldValue } from 'firebase-admin/firestore'
import type { ReviewVerdict, CompletedCourseRecord } from '@/lib/types/university'
import { UNIVERSITY_XP } from '@/lib/types/university'
import { notifyDeliverableReviewed } from '@/lib/university/notifications'
import { recordHistoryEvent } from '@/lib/university/submission-history'

export const dynamic = 'force-dynamic'

const VALID_VERDICTS: ReviewVerdict[] = ['approved', 'revision-needed', 'failed']

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const body = await request.json()
    const { courseId, deliverableId, verdict, feedback } = body as {
      courseId: string
      deliverableId: string
      verdict: ReviewVerdict
      feedback?: string
    }

    if (!courseId || !deliverableId || !verdict) {
      return badRequestError('Missing required fields: courseId, deliverableId, verdict')
    }

    if (!VALID_VERDICTS.includes(verdict)) {
      return badRequestError('verdict must be "approved", "revision-needed", or "failed"')
    }

    const courseRef = db.collection('universityCourses').doc(courseId)
    const courseDoc = await courseRef.get()

    if (!courseDoc.exists) {
      return notFoundError('Course not found')
    }

    const course = courseDoc.data()!
    const deliverables = course.deliverables as Array<Record<string, unknown>>
    const deliverableIndex = deliverables.findIndex(d => d.id === deliverableId)

    if (deliverableIndex === -1) {
      return notFoundError('Deliverable not found')
    }

    const current = deliverables[deliverableIndex]
    const currentStatus = current.status

    if (currentStatus !== 'submitted' && currentStatus !== 'in-review') {
      return badRequestError('Can only review deliverables that are submitted or in-review')
    }

    // Check all 3 links are present before allowing a verdict
    if (!current.deployedUrl || !current.githubUrl || !current.loomUrl) {
      return badRequestError('Cannot score until all 3 links (deployed, GitHub, Loom) are submitted')
    }

    // Get professor info
    const userRecord = await auth.getUser(userId)
    const reviewerName = userRecord.displayName || userRecord.email?.split('@')[0] || 'Professor'

    deliverables[deliverableIndex] = {
      ...current,
      status: verdict,
      reviewedBy: reviewerName,
      reviewFeedback: feedback?.trim() || '',
      reviewedAt: new Date().toISOString(),
    }

    // Check if course is now completed (all deliverables approved)
    const allApproved = deliverables.every(d => d.status === 'approved')
    const courseUpdates: Record<string, unknown> = {
      deliverables,
      updatedAt: new Date(),
    }
    if (allApproved) {
      courseUpdates.status = 'completed'
      courseUpdates.completedAt = new Date()
    }

    await courseRef.update(courseUpdates)

    // Notify student of review (fire-and-forget)
    const studentId = course.userId as string
    notifyDeliverableReviewed(studentId, reviewerName, current.title as string, verdict, courseId, deliverableId)

    const verdictLabel = verdict === 'approved' ? 'approved' : verdict === 'revision-needed' ? 'requested revision on' : 'marked as failed'
    recordHistoryEvent({
      courseId,
      deliverableId,
      eventType: 'reviewed',
      actorId: userId,
      actorName: reviewerName,
      actorRole: 'professor',
      description: `${reviewerName} ${verdictLabel} this deliverable.`,
      metadata: { verdict, feedback: feedback?.trim() || '' },
    })

    // Award XP and handle progression for approved deliverables
    let xpAwarded = 0
    let nextCourseUnlocked = false
    let pathCompleted = false

    if (verdict === 'approved' && studentId) {
      const batch = db.batch()
      const profileRef = db.collection('universityStudentProfiles').doc(studentId)

      // Award XP for deliverable approval
      xpAwarded += UNIVERSITY_XP.DELIVERABLE_APPROVED

      if (allApproved) {
        // Award course completion XP
        xpAwarded += UNIVERSITY_XP.COURSE_COMPLETED

        const learningPathId = course.learningPathId as string
        const currentOrder = course.order as number

        // Find next course in the path
        const nextCourseSnap = await db.collection('universityCourses')
          .where('learningPathId', '==', learningPathId)
          .where('userId', '==', studentId)
          .where('order', '==', currentOrder + 1)
          .limit(1)
          .get()

        if (!nextCourseSnap.empty) {
          const nextCourseDoc = nextCourseSnap.docs[0]
          const nextCourse = nextCourseDoc.data()
          if (nextCourse.status === 'locked') {
            const nextDeliverables = (nextCourse.deliverables as Array<Record<string, unknown>>) || []
            if (nextDeliverables.length > 0) {
              nextDeliverables[0] = { ...nextDeliverables[0], status: 'available' }
            }
            batch.update(nextCourseDoc.ref, {
              status: 'available',
              deliverables: nextDeliverables,
              updatedAt: new Date(),
            })
            nextCourseUnlocked = true
          }
        }

        // Check if all courses in the path are now completed
        const allCoursesSnap = await db.collection('universityCourses')
          .where('learningPathId', '==', learningPathId)
          .where('userId', '==', studentId)
          .get()

        const allCoursesCompleted = allCoursesSnap.docs.every(d => {
          const data = d.data()
          return d.id === courseId ? true : data.status === 'completed'
        })

        if (allCoursesCompleted) {
          pathCompleted = true
          xpAwarded += UNIVERSITY_XP.PATH_COMPLETED

          // Update learning path status
          const pathRef = db.collection('universityLearningPaths').doc(learningPathId)
          batch.update(pathRef, {
            status: 'completed',
            completedAt: new Date(),
            updatedAt: new Date(),
          })
        }

        // Push completed course record
        const completedRecord: CompletedCourseRecord = {
          courseId,
          topic: (course.topic as string) || '',
          subject: (course.subject as string) || '',
          completedAt: new Date().toISOString(),
        }

        batch.update(profileRef, {
          totalXP: FieldValue.increment(xpAwarded),
          completedCourses: FieldValue.arrayUnion(completedRecord),
          updatedAt: new Date(),
        })
      } else {
        // Just deliverable XP (no course completion)
        batch.update(profileRef, {
          totalXP: FieldValue.increment(xpAwarded),
          updatedAt: new Date(),
        })
      }

      await batch.commit()
    }

    return successResponse({
      deliverableId,
      verdict,
      courseCompleted: allApproved,
      xpAwarded,
      nextCourseUnlocked,
      pathCompleted,
    })
  } catch (error) {
    return serverError(error, 'Failed to review deliverable')
  }
}

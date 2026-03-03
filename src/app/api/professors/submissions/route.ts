import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type {
  ProfessorSubmissionRow,
  DeliverableStatus,
  DeliverableType,
} from '@/lib/types/university'

export const dynamic = 'force-dynamic'

const REVIEWABLE_STATUSES: DeliverableStatus[] = ['submitted', 'in-review']

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    // 1. Scope to professor's assigned courses
    const assignmentsSnap = await db
      .collection('professorAssignments')
      .where('professorEmail', '==', decodedToken.email)
      .get()

    if (assignmentsSnap.empty) {
      // No assignments — fall back to empty result
      return successResponse({ submissions: [] })
    }

    // Get assigned path IDs
    const assignedPathIds = [
      ...new Set(
        assignmentsSnap.docs.map((d) => d.data().sourcePathId as string)
      ),
    ]

    // Fetch courses only for assigned paths (chunk for Firestore 'in' limit of 30)
    const allCourseDocs: FirebaseFirestore.QueryDocumentSnapshot[] = []
    for (let i = 0; i < assignedPathIds.length; i += 30) {
      const chunk = assignedPathIds.slice(i, i + 30)
      const snap = await db
        .collection('universityCourses')
        .where('learningPathId', 'in', chunk)
        .get()
      allCourseDocs.push(...snap.docs)
    }
    const coursesSnap = { docs: allCourseDocs }

    // 2. Build a map of pathId → path data for resolving topics
    const pathIds = new Set<string>()
    const userIds = new Set<string>()

    interface RawSubmission {
      courseId: string
      deliverableId: string
      deliverableTitle: string
      deliverableType: DeliverableType
      courseTitle: string
      courseOrder: number
      pathId: string
      studentId: string
      submittedAt: string
      deployedUrl?: string
      githubUrl?: string
      loomUrl?: string
      submissionNotes?: string
      status: DeliverableStatus
    }

    const rawSubmissions: RawSubmission[] = []

    for (const courseDoc of coursesSnap.docs) {
      const cData = courseDoc.data()
      const deliverables =
        (cData.deliverables as Array<{
          id: string
          title: string
          type: DeliverableType
          status: DeliverableStatus
          submittedAt?: string
          deployedUrl?: string
          githubUrl?: string
          loomUrl?: string
          submissionNotes?: string
        }>) || []

      for (const d of deliverables) {
        if (REVIEWABLE_STATUSES.includes(d.status)) {
          const studentId = cData.userId as string
          const pathId = cData.learningPathId as string
          userIds.add(studentId)
          pathIds.add(pathId)

          rawSubmissions.push({
            courseId: courseDoc.id,
            deliverableId: d.id,
            deliverableTitle: d.title,
            deliverableType: d.type,
            courseTitle: cData.title as string,
            courseOrder: cData.order as number,
            pathId,
            studentId,
            submittedAt: d.submittedAt || '',
            deployedUrl: d.deployedUrl,
            githubUrl: d.githubUrl,
            loomUrl: d.loomUrl,
            submissionNotes: d.submissionNotes,
            status: d.status,
          })
        }
      }
    }

    if (rawSubmissions.length === 0) {
      return successResponse({ submissions: [] })
    }

    // 3. Batch-fetch paths for topics
    const pathMap = new Map<string, string>()
    const pathIdArray = Array.from(pathIds)
    for (let i = 0; i < pathIdArray.length; i += 30) {
      const chunk = pathIdArray.slice(i, i + 30)
      const snap = await db
        .collection('universityLearningPaths')
        .where('__name__', 'in', chunk)
        .get()
      for (const doc of snap.docs) {
        pathMap.set(doc.id, doc.data().targetTopic as string)
      }
    }

    // 4. Batch-fetch user info
    const userMap = new Map<string, { displayName: string; email: string }>()
    const uidArray = Array.from(userIds)
    for (let i = 0; i < uidArray.length; i += 100) {
      const chunk = uidArray.slice(i, i + 100)
      const result = await auth.getUsers(chunk.map((uid) => ({ uid })))
      for (const userRecord of result.users) {
        userMap.set(userRecord.uid, {
          displayName:
            userRecord.displayName ||
            userRecord.email?.split('@')[0] ||
            'Unknown',
          email: userRecord.email || '',
        })
      }
    }

    // 5. Assemble final rows
    const submissions: ProfessorSubmissionRow[] = rawSubmissions
      .map((r) => {
        const userInfo = userMap.get(r.studentId) || {
          displayName: 'Unknown',
          email: '',
        }
        return {
          courseId: r.courseId,
          deliverableId: r.deliverableId,
          deliverableTitle: r.deliverableTitle,
          deliverableType: r.deliverableType,
          courseTitle: r.courseTitle,
          courseOrder: r.courseOrder,
          pathTopic: pathMap.get(r.pathId) || 'Unknown',
          studentId: r.studentId,
          studentName: userInfo.displayName,
          studentEmail: userInfo.email,
          submittedAt: r.submittedAt,
          deployedUrl: r.deployedUrl,
          githubUrl: r.githubUrl,
          loomUrl: r.loomUrl,
          submissionNotes: r.submissionNotes,
          status: r.status,
        }
      })
      .sort((a, b) => {
        // Most recent submissions first
        if (a.submittedAt && b.submittedAt)
          return b.submittedAt.localeCompare(a.submittedAt)
        return 0
      })

    return successResponse({ submissions })
  } catch (error) {
    return serverError(error, 'Failed to fetch submissions')
  }
}

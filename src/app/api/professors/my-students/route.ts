import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { AssignmentScope } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

interface MyStudentRow {
  userId: string
  displayName: string
  email: string
  pathTopic: string
  courseTitle: string
  courseOrder: number
  courseStatus: string
  completedDeliverables: number
  totalDeliverables: number
  scope: AssignmentScope
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    // 1. Query professorAssignments for this professor
    const assignSnap = await db
      .collection('professorAssignments')
      .where('professorId', '==', userId)
      .get()

    if (assignSnap.empty) {
      return successResponse({ students: [] })
    }

    // 2. Group assignments by sourcePathId
    const assignmentsByPath = new Map<string, typeof assignSnap.docs>()
    for (const doc of assignSnap.docs) {
      const sourcePathId = doc.data().sourcePathId as string
      const list = assignmentsByPath.get(sourcePathId) || []
      list.push(doc)
      assignmentsByPath.set(sourcePathId, list)
    }

    const studentRows: MyStudentRow[] = []
    const userIdsToFetch = new Set<string>()

    // 3. For each sourcePathId, find all joined paths + the original
    for (const [sourcePathId, assignDocs] of assignmentsByPath) {
      // Fetch the original path
      const originalDoc = await db.collection('universityLearningPaths').doc(sourcePathId).get()
      if (!originalDoc.exists) continue

      const originalData = originalDoc.data()!
      const pathTopic = originalData.targetTopic as string

      // Fetch joined copies
      const joinedSnap = await db
        .collection('universityLearningPaths')
        .where('sourcePathId', '==', sourcePathId)
        .get()

      // All student paths = original creator + joined copies
      const allStudentPaths = [
        { pathId: originalDoc.id, userId: originalData.userId as string, courseIds: (originalData.courses as string[]) || [] },
        ...joinedSnap.docs.map(d => ({
          pathId: d.id,
          userId: d.data().userId as string,
          courseIds: (d.data().courses as string[]) || [],
        })),
      ]

      // Process each assignment (each maps to a specific courseOrder)
      for (const assignDoc of assignDocs) {
        const aData = assignDoc.data()
        const courseOrder = aData.courseOrder as number
        const courseTitle = aData.courseTitle as string
        const scope = aData.scope as AssignmentScope
        const specificStudentIds = (aData.studentIds as string[]) || []

        // Filter students based on scope
        const relevantPaths = allStudentPaths.filter(sp => {
          if (scope === 'global') return true
          return specificStudentIds.includes(sp.userId)
        })

        // For each relevant student, find the course copy matching the order
        for (const sp of relevantPaths) {
          userIdsToFetch.add(sp.userId)

          // Fetch the student's course that matches this order
          // Course IDs are from the student's path
          let courseStatus = 'unknown'
          let completedDeliverables = 0
          let totalDeliverables = 0

          // Batch-fetch the student's courses for this path to find the one with matching order
          for (let i = 0; i < sp.courseIds.length; i += 30) {
            const chunk = sp.courseIds.slice(i, i + 30)
            const coursesSnap = await db
              .collection('universityCourses')
              .where('__name__', 'in', chunk)
              .get()
            for (const cDoc of coursesSnap.docs) {
              const cData = cDoc.data()
              if (cData.order === courseOrder) {
                courseStatus = cData.status as string
                const deliverables = (cData.deliverables as Array<{ status: string }>) || []
                totalDeliverables = deliverables.length
                completedDeliverables = deliverables.filter(d => d.status === 'approved').length
                break
              }
            }
          }

          studentRows.push({
            userId: sp.userId,
            displayName: '', // filled below
            email: '',       // filled below
            pathTopic,
            courseTitle,
            courseOrder,
            courseStatus,
            completedDeliverables,
            totalDeliverables,
            scope,
          })
        }
      }
    }

    // 4. Batch fetch user info
    const userMap = new Map<string, { displayName: string; email: string }>()
    const uidArray = Array.from(userIdsToFetch)
    for (let i = 0; i < uidArray.length; i += 100) {
      const chunk = uidArray.slice(i, i + 100)
      const result = await auth.getUsers(chunk.map(uid => ({ uid })))
      for (const userRecord of result.users) {
        userMap.set(userRecord.uid, {
          displayName: userRecord.displayName || userRecord.email?.split('@')[0] || 'Unknown',
          email: userRecord.email || '',
        })
      }
    }

    // 5. Fill in user info
    for (const row of studentRows) {
      const info = userMap.get(row.userId)
      if (info) {
        row.displayName = info.displayName
        row.email = info.email
      }
    }

    return successResponse({ students: studentRows })
  } catch (error) {
    return serverError(error, 'Failed to fetch my students')
  }
}

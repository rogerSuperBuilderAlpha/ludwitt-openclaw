import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { Timestamp } from 'firebase-admin/firestore'
import type { ProfessorPathSummary, ProfessorStudentRow, ProfessorPathCourse, ProfessorAssignment } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

function toISO(ts: Timestamp | string | undefined): string {
  if (!ts) return new Date().toISOString()
  if (typeof ts === 'string') return ts
  return (ts as Timestamp).toDate?.()?.toISOString() || new Date().toISOString()
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    // 1. Fetch all learning paths
    const pathsSnap = await db
      .collection('universityLearningPaths')
      .orderBy('createdAt', 'desc')
      .get()

    // 2. Split into originals and joined copies
    const originals: FirebaseFirestore.QueryDocumentSnapshot[] = []
    const joinedBySource = new Map<string, FirebaseFirestore.QueryDocumentSnapshot[]>()

    for (const doc of pathsSnap.docs) {
      const data = doc.data()
      const sourcePathId = data.sourcePathId as string | undefined
      if (!sourcePathId) {
        originals.push(doc)
      } else {
        const list = joinedBySource.get(sourcePathId) || []
        list.push(doc)
        joinedBySource.set(sourcePathId, list)
      }
    }

    // 3. Collect all course IDs from all paths
    const allCourseIds = new Set<string>()
    for (const doc of pathsSnap.docs) {
      const courses = (doc.data().courses as string[]) || []
      courses.forEach(id => allCourseIds.add(id))
    }

    // 4. Batch fetch courses in chunks of 30 — now also storing course metadata
    const courseStatusMap = new Map<string, string>()
    const courseMetaMap = new Map<string, { title: string; subject: string; level: number; order: number }>()
    const courseIdArray = Array.from(allCourseIds)
    for (let i = 0; i < courseIdArray.length; i += 30) {
      const chunk = courseIdArray.slice(i, i + 30)
      const snap = await db
        .collection('universityCourses')
        .where('__name__', 'in', chunk)
        .get()
      for (const courseDoc of snap.docs) {
        const cData = courseDoc.data()
        courseStatusMap.set(courseDoc.id, cData.status as string)
        courseMetaMap.set(courseDoc.id, {
          title: cData.title as string,
          subject: cData.subject as string,
          level: cData.level as number,
          order: cData.order as number,
        })
      }
    }

    // 5. Collect unique user IDs and batch fetch user info
    const userIds = new Set<string>()
    for (const doc of pathsSnap.docs) {
      userIds.add(doc.data().userId as string)
    }

    const userMap = new Map<string, { displayName: string; email: string }>()
    const uidArray = Array.from(userIds)
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

    // 6. Fetch professor's own assignments
    const assignmentsSnap = await db
      .collection('professorAssignments')
      .where('professorId', '==', userId)
      .get()

    const myAssignments: ProfessorAssignment[] = assignmentsSnap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<ProfessorAssignment, 'id'>),
    }))

    // 7. Assemble ProfessorPathSummary for each original
    const paths: ProfessorPathSummary[] = originals.map(doc => {
      const data = doc.data()
      const courseIds = (data.courses as string[]) || []
      const totalCourses = courseIds.length
      const creatorUid = data.userId as string
      const creatorInfo = userMap.get(creatorUid) || { displayName: 'Unknown', email: '' }

      // Creator progress from their own courses
      const creatorCompleted = courseIds.filter(id => courseStatusMap.get(id) === 'completed').length

      const creator: ProfessorStudentRow = {
        userId: creatorUid,
        displayName: creatorInfo.displayName,
        email: creatorInfo.email,
        joinedAt: toISO(data.createdAt),
        completedCourses: creatorCompleted,
        totalCourses,
        progressPercent: totalCourses > 0 ? Math.round((creatorCompleted / totalCourses) * 100) : 0,
      }

      // Students from joined copies
      const joinedDocs = joinedBySource.get(doc.id) || []
      const students: ProfessorStudentRow[] = joinedDocs.map(jDoc => {
        const jData = jDoc.data()
        const studentUid = jData.userId as string
        const studentInfo = userMap.get(studentUid) || { displayName: 'Unknown', email: '' }
        const studentCourseIds = (jData.courses as string[]) || []
        const studentCompleted = studentCourseIds.filter(id => courseStatusMap.get(id) === 'completed').length

        return {
          userId: studentUid,
          displayName: studentInfo.displayName,
          email: studentInfo.email,
          joinedAt: toISO(jData.createdAt),
          completedCourses: studentCompleted,
          totalCourses,
          progressPercent: totalCourses > 0 ? Math.round((studentCompleted / totalCourses) * 100) : 0,
        }
      })

      // Build courses array from the original path's course IDs
      const courses: ProfessorPathCourse[] = courseIds
        .map(cid => courseMetaMap.get(cid))
        .filter((m): m is { title: string; subject: string; level: number; order: number } => !!m)
        .sort((a, b) => a.order - b.order)

      return {
        id: doc.id,
        targetTopic: data.targetTopic as string,
        ...(data.targetDescription && { targetDescription: data.targetDescription as string }),
        status: data.status as ProfessorPathSummary['status'],
        isPublished: !!data.isPublished,
        createdAt: toISO(data.createdAt),
        totalCourses,
        courses,
        creator,
        students,
        totalEnrolled: 1 + students.length,
      }
    })

    return successResponse({ paths, myAssignments })
  } catch (error) {
    return serverError(error, 'Failed to fetch professor paths')
  }
}

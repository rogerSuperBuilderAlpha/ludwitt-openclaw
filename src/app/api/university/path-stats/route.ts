import { NextRequest, NextResponse } from 'next/server'
import { resolveUniversityAuth } from '@/lib/api/agent-auth'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type {
  PathActivityStats,
  CourseStats,
  DeliverableStats,
} from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await resolveUniversityAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const pathId = request.nextUrl.searchParams.get('pathId')
    if (!pathId) {
      return NextResponse.json(
        { success: false, error: 'pathId query parameter is required' },
        { status: 400 }
      )
    }

    // 1. Resolve original path ID
    const pathSnap = await db
      .collection('universityLearningPaths')
      .doc(pathId)
      .get()
    if (!pathSnap.exists) {
      return NextResponse.json(
        { success: false, error: 'Learning path not found' },
        { status: 404 }
      )
    }

    const pathData = pathSnap.data()!
    const originalId = pathData.sourcePathId || pathId

    // 2. Query all sibling paths (those sharing the same sourcePathId) + the original
    const siblingsSnap = await db
      .collection('universityLearningPaths')
      .where('sourcePathId', '==', originalId)
      .get()

    const familyIds = [originalId]
    for (const doc of siblingsSnap.docs) {
      if (!familyIds.includes(doc.id)) {
        familyIds.push(doc.id)
      }
    }

    const totalStudents = familyIds.length

    // 3. Fetch all courses across family paths (chunk by 30 for Firestore 'in' limit)
    interface CourseData {
      order: number
      status: string
      deliverables: Array<{ order: number; status: string }>
    }

    const allCourses: CourseData[] = []

    for (let i = 0; i < familyIds.length; i += 30) {
      const chunk = familyIds.slice(i, i + 30)
      const coursesSnap = await db
        .collection('universityCourses')
        .where('learningPathId', 'in', chunk)
        .get()

      for (const doc of coursesSnap.docs) {
        const data = doc.data()
        allCourses.push({
          order: data.order,
          status: data.status,
          deliverables: (data.deliverables || []).map(
            (d: { order: number; status: string }) => ({
              order: d.order,
              status: d.status,
            })
          ),
        })
      }
    }

    // 4. Aggregate by course order
    const courseMap = new Map<
      number,
      {
        active: number
        completed: number
        deliverableMap: Map<number, { active: number; completed: number }>
      }
    >()

    const ACTIVE_COURSE_STATUSES = new Set(['available', 'in-progress'])
    const ACTIVE_DELIVERABLE_STATUSES = new Set([
      'in-progress',
      'submitted',
      'in-review',
      'revision-needed',
    ])

    for (const course of allCourses) {
      if (!courseMap.has(course.order)) {
        courseMap.set(course.order, {
          active: 0,
          completed: 0,
          deliverableMap: new Map(),
        })
      }
      const entry = courseMap.get(course.order)!

      if (ACTIVE_COURSE_STATUSES.has(course.status)) {
        entry.active++
      } else if (course.status === 'completed') {
        entry.completed++
      }

      // Aggregate deliverables by order
      for (const del of course.deliverables) {
        if (!entry.deliverableMap.has(del.order)) {
          entry.deliverableMap.set(del.order, { active: 0, completed: 0 })
        }
        const delEntry = entry.deliverableMap.get(del.order)!

        if (ACTIVE_DELIVERABLE_STATUSES.has(del.status)) {
          delEntry.active++
        } else if (del.status === 'approved') {
          delEntry.completed++
        }
      }
    }

    // 5. Build response
    const courses: CourseStats[] = Array.from(courseMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([order, data]) => {
        const deliverables: DeliverableStats[] = Array.from(
          data.deliverableMap.entries()
        )
          .sort(([a], [b]) => a - b)
          .map(([delOrder, delData]) => ({
            order: delOrder,
            activeCount: delData.active,
            completedCount: delData.completed,
          }))

        return {
          order,
          activeCount: data.active,
          completedCount: data.completed,
          deliverables,
        }
      })

    const stats: PathActivityStats = { totalStudents, courses }

    return successResponse(stats)
  } catch (error) {
    return serverError(error, 'Failed to fetch path activity stats')
  }
}

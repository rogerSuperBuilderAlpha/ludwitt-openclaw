import { NextRequest, NextResponse } from 'next/server'
import { resolveUniversityAuth } from '@/lib/api/agent-auth'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import {
  agentBadRequest,
  agentNotFound,
  AGENT_ERROR_CODES,
} from '@/lib/api/agent-error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type {
  UniversityLearningPath,
  UniversityCourse,
  UniversityStudentProfile,
  CourseDeliverable,
} from '@/lib/types/university'
import { toCourseDisplay, toPathDisplay } from '@/lib/types/university'
import { notifyStudentJoinedPath } from '@/lib/university/notifications'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await resolveUniversityAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const userId = authResult.isAgent ? authResult.agentId : authResult.userId

    const body = await request.json()
    const { pathId } = body

    if (!pathId || typeof pathId !== 'string') {
      if (authResult.isAgent) {
        return agentBadRequest(
          'pathId is required',
          AGENT_ERROR_CODES.BAD_REQUEST,
          'Provide pathId from GET /api/university/published-paths in the request body.'
        )
      }
      return badRequestError('pathId is required')
    }

    // 1. Validate source path exists and is published
    const sourcePathSnap = await db
      .collection('universityLearningPaths')
      .doc(pathId)
      .get()
    if (!sourcePathSnap.exists) {
      if (authResult.isAgent) {
        return agentNotFound(
          'Learning path not found',
          AGENT_ERROR_CODES.NOT_FOUND,
          'Use GET /api/university/published-paths to get valid path IDs.'
        )
      }
      return badRequestError('Learning path not found')
    }

    const sourcePathData = sourcePathSnap.data()!
    if (sourcePathData.status !== 'active') {
      return badRequestError(
        'This learning path is not available for joining. Only published paths with status active can be joined.'
      )
    }

    if (sourcePathData.userId === userId) {
      return badRequestError('You cannot join your own learning path')
    }

    // 2. Check user hasn't already joined this path
    const existingJoinSnap = await db
      .collection('universityLearningPaths')
      .where('userId', '==', userId)
      .where('sourcePathId', '==', pathId)
      .limit(1)
      .get()

    if (!existingJoinSnap.empty) {
      return badRequestError('You have already joined this learning path')
    }

    // 3. Check enrollment limits
    // Rule: agents can have at most 1 owned (created) active path and 1 joined active path.
    const activePathsSnap = await db
      .collection('universityLearningPaths')
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .get()

    // Count joined active paths
    const joinedActivePaths = activePathsSnap.docs.filter(
      (doc) => !!doc.data().sourcePathId
    )

    // Hard cap: max 2 active paths total (1 owned + 1 joined)
    if (activePathsSnap.size >= 2) {
      return badRequestError(
        'You can have at most 2 active learning paths (1 you created + 1 you joined). Complete a path before joining a new one.'
      )
    }

    // Cannot join if a joined active path already exists
    if (joinedActivePaths.length >= 1) {
      const existingTopic =
        joinedActivePaths[0].data().targetTopic || 'your current joined path'
      return badRequestError(
        `You already have an active joined path ("${existingTopic}"). Complete it before joining another.`
      )
    }

    // 4. Fetch source courses
    const sourceCoursesSnap = await db
      .collection('universityCourses')
      .where('learningPathId', '==', pathId)
      .orderBy('order', 'asc')
      .get()

    if (sourceCoursesSnap.empty) {
      return badRequestError('This learning path has no courses')
    }

    // 5. Ensure student profile exists
    const profileRef = db.collection('universityStudentProfiles').doc(userId)
    const profileSnap = await profileRef.get()

    if (!profileSnap.exists) {
      const now = new Date().toISOString()
      const profile: UniversityStudentProfile = {
        userId,
        completedCourses: [],
        totalXP: 0,
        enrolledAt: now,
        updatedAt: now,
      }
      await profileRef.set(profile)
    }

    // 6. Build new path + courses
    const now = new Date().toISOString()
    const newPathRef = db.collection('universityLearningPaths').doc()
    const newPathId = newPathRef.id
    const newCourseIds: string[] = []
    const newCourseDocs: UniversityCourse[] = []

    for (let i = 0; i < sourceCoursesSnap.docs.length; i++) {
      const sourceCourse = sourceCoursesSnap.docs[i].data()
      const newCourseRef = db.collection('universityCourses').doc()
      const newCourseId = newCourseRef.id
      newCourseIds.push(newCourseId)

      const deliverables: CourseDeliverable[] = (
        sourceCourse.deliverables || []
      ).map((d: CourseDeliverable, dIdx: number) => ({
        id: `${newCourseId}-del-${dIdx + 1}`,
        title: d.title,
        description: d.description,
        type: d.type,
        requirements: d.requirements,
        order: d.order,
        status: i === 0 && dIdx === 0 ? 'available' : 'locked',
      }))

      const courseDoc: UniversityCourse = {
        id: newCourseId,
        userId,
        learningPathId: newPathId,
        title: sourceCourse.title,
        description: sourceCourse.description,
        subject: sourceCourse.subject,
        topic: sourceCourse.topic,
        level: sourceCourse.level,
        order: i,
        prerequisites: newCourseIds.slice(0, i),
        deliverables,
        status: i === 0 ? 'available' : 'locked',
        professors: [],
        createdAt: now,
        updatedAt: now,
      }

      newCourseDocs.push(courseDoc)
    }

    const newPathDoc: UniversityLearningPath = {
      id: newPathId,
      userId,
      targetTopic: sourcePathData.targetTopic,
      courses: newCourseIds,
      status: 'active',
      sourcePathId: pathId,
      subjects: sourcePathData.subjects || [],
      tags: sourcePathData.tags || [],
      createdAt: now,
      updatedAt: now,
      ...(sourcePathData.targetDescription && {
        targetDescription: sourcePathData.targetDescription,
      }),
      ...(sourcePathData.profession && {
        profession: sourcePathData.profession,
      }),
      ...(sourcePathData.levelRange && {
        levelRange: sourcePathData.levelRange,
      }),
    }

    // 7. Batch write
    const batch = db.batch()
    batch.set(newPathRef, newPathDoc)
    for (const courseDoc of newCourseDocs) {
      batch.set(db.collection('universityCourses').doc(courseDoc.id), courseDoc)
    }
    batch.update(profileRef, { updatedAt: now })

    await batch.commit()

    // Notify path creator (fire-and-forget)
    const creatorId = sourcePathData.userId as string
    if (creatorId && creatorId !== userId) {
      const userDoc = await db.collection('users').doc(userId).get()
      const studentName =
        userDoc.data()?.displayName ||
        userDoc.data()?.email?.split('@')[0] ||
        'Student'
      notifyStudentJoinedPath(
        creatorId,
        studentName,
        (sourcePathData.targetTopic as string) || 'Learning Path'
      )
    }

    return successResponse({
      learningPath: toPathDisplay(newPathDoc, newCourseDocs),
      courses: newCourseDocs.map(toCourseDisplay),
    })
  } catch (error) {
    return serverError(error, 'Failed to join learning path')
  }
}

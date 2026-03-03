/**
 * API Route: POST /api/university/create-path
 *
 * Main orchestration endpoint for creating a university learning path.
 * 1. Authenticate & validate
 * 2. Fetch/create student profile
 * 3. Check no active path exists (MVP limit)
 * 4. Phase 1 AI: generate path structure
 * 5. Phase 2 AI: generate deliverables for each course
 * 6. Batch write all documents to Firestore
 * 7. Return the created path + courses
 */

import { NextRequest, NextResponse } from 'next/server'
import { resolveUniversityAuth } from '@/lib/api/agent-auth'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import {
  generatePathStructure,
  generateCourseDeliverables,
} from '@/lib/university/generate-learning-path'
import type {
  CreateLearningPathRequest,
  UniversityLearningPath,
  UniversityCourse,
  UniversityStudentProfile,
  CourseDeliverable,
} from '@/lib/types/university'
import { toCourseDisplay, toPathDisplay } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate (human or agent)
    const authResult = await resolveUniversityAuth(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const userId = authResult.isAgent ? authResult.agentId : authResult.userId

    // 2. Parse & validate
    const body = (await request.json()) as CreateLearningPathRequest
    const { targetTopic, targetDescription } = body

    if (
      !targetTopic ||
      typeof targetTopic !== 'string' ||
      targetTopic.trim().length < 2
    ) {
      return badRequestError(
        'A target topic is required (at least 2 characters)'
      )
    }

    if (targetTopic.trim().length > 200) {
      return badRequestError('Target topic must be 200 characters or less')
    }

    // 3. Fetch/create student profile
    const profileRef = db.collection('universityStudentProfiles').doc(userId)
    const profileSnap = await profileRef.get()
    let profile: UniversityStudentProfile

    if (profileSnap.exists) {
      profile = profileSnap.data() as UniversityStudentProfile
    } else {
      const now = new Date().toISOString()
      profile = {
        userId,
        completedCourses: [],
        totalXP: 0,
        enrolledAt: now,
        updatedAt: now,
      }
      await profileRef.set(profile)
    }

    // 4. Check active path limit (max 5)
    const activePathsSnap = await db
      .collection('universityLearningPaths')
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .get()

    if (activePathsSnap.size >= 5) {
      return badRequestError(
        'You can have up to 5 active learning paths. Complete one before starting a new one.'
      )
    }

    // 5. Create learning path doc with status 'generating'
    const now = new Date().toISOString()
    const pathRef = db.collection('universityLearningPaths').doc()
    const pathId = pathRef.id

    const pathDoc: UniversityLearningPath = {
      id: pathId,
      userId,
      targetTopic: targetTopic.trim(),
      ...(targetDescription?.trim() && {
        targetDescription: targetDescription.trim(),
      }),
      courses: [],
      status: 'generating',
      createdAt: now,
      updatedAt: now,
    }
    await pathRef.set(pathDoc)

    // 6. Phase 1 — Generate path structure (no balance pre-check, allows negative credits)
    let totalCostCharged = 0
    let latestBalance = 0

    const pathResult = await generatePathStructure(
      userId,
      targetTopic.trim(),
      targetDescription?.trim(),
      profile.completedCourses
    )

    totalCostCharged += pathResult.costCharged
    latestBalance = pathResult.newBalance

    // 7. Phase 2 — Generate deliverables for each course
    const pathContext = pathResult.courses
      .map((c, i) => `${i + 1}. ${c.title} (${c.subject} — ${c.topic})`)
      .join('\n')

    const courseDocs: UniversityCourse[] = []
    const courseIds: string[] = []

    for (let i = 0; i < pathResult.courses.length; i++) {
      const aiCourse = pathResult.courses[i]
      const courseRef = db.collection('universityCourses').doc()
      const courseId = courseRef.id
      courseIds.push(courseId)

      const delResult = await generateCourseDeliverables(
        userId,
        aiCourse,
        pathContext
      )

      totalCostCharged += delResult.costCharged
      latestBalance = delResult.newBalance

      const deliverables: CourseDeliverable[] = delResult.deliverables.map(
        (d, dIdx) => ({
          id: `${courseId}-del-${dIdx + 1}`,
          title: d.title,
          description: d.description,
          type: d.type,
          requirements: d.requirements,
          order: dIdx + 1,
          status: i === 0 && dIdx === 0 ? 'available' : 'locked',
        })
      )

      // First course is available, rest are locked
      const courseStatus = i === 0 ? 'available' : 'locked'

      const courseDoc: UniversityCourse = {
        id: courseId,
        userId,
        learningPathId: pathId,
        title: aiCourse.title,
        description: aiCourse.description,
        subject: aiCourse.subject,
        topic: aiCourse.topic,
        level: aiCourse.level,
        order: i,
        prerequisites: courseIds.slice(0, i),
        deliverables,
        status: courseStatus,
        professors: [],
        createdAt: now,
        updatedAt: now,
      }

      courseDocs.push(courseDoc)
    }

    // 8. Batch write all courses + update path
    const batch = db.batch()
    for (const courseDoc of courseDocs) {
      batch.set(db.collection('universityCourses').doc(courseDoc.id), courseDoc)
    }

    // Compute denormalized search metadata
    const subjects = [...new Set(pathResult.courses.map((c) => c.subject))]
    const levels = pathResult.courses.map((c) => c.level)
    const levelRange = { min: Math.min(...levels), max: Math.max(...levels) }

    // Update path with course IDs, status 'active', and search metadata
    batch.update(pathRef, {
      courses: courseIds,
      status: 'active',
      subjects,
      profession: pathResult.profession,
      tags: pathResult.tags,
      levelRange,
      updatedAt: new Date().toISOString(),
    })

    // Update student profile timestamp
    batch.update(profileRef, {
      updatedAt: new Date().toISOString(),
    })

    await batch.commit()

    // Update local path doc for response
    pathDoc.courses = courseIds
    pathDoc.status = 'active'

    return successResponse({
      learningPath: toPathDisplay(pathDoc, courseDocs),
      courses: courseDocs.map(toCourseDisplay),
      costCharged: totalCostCharged,
      newBalance: latestBalance,
    })
  } catch (error) {
    apiLogger.apiError(
      'university/create-path',
      'Failed to create university learning path',
      error
    )
    return serverError(error, 'Failed to create learning path')
  }
}

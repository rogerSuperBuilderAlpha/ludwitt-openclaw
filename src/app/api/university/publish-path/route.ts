import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { auth } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { pathId, anonymous } = body

    if (!pathId || typeof pathId !== 'string') {
      return badRequestError('pathId is required')
    }

    const pathRef = db.collection('universityLearningPaths').doc(pathId)
    const pathSnap = await pathRef.get()

    if (!pathSnap.exists) {
      return badRequestError('Learning path not found')
    }

    const pathData = pathSnap.data()!

    if (pathData.userId !== userId) {
      return badRequestError('You can only publish your own learning paths')
    }

    if (pathData.status !== 'active') {
      return badRequestError('Only active learning paths can be published')
    }

    if (pathData.isPublished) {
      return badRequestError('This learning path is already published')
    }

    // Always fetch real name from Firebase Auth (stored for later toggle)
    let creatorName = 'Anonymous'
    try {
      const userRecord = await auth.getUser(userId)
      creatorName = userRecord.displayName || userRecord.email || 'Anonymous'
    } catch {
      // Fall back to Anonymous
    }

    // Backfill search metadata for paths created before these fields existed
    const updateData: Record<string, unknown> = {
      isPublished: true,
      publishedAt: new Date().toISOString(),
      creatorName,
      creatorAnonymous: !!anonymous,
    }

    if (!pathData.subjects || !Array.isArray(pathData.subjects) || pathData.subjects.length === 0) {
      const courseIds = (pathData.courses as string[]) || []
      if (courseIds.length > 0) {
        const subjectsSet = new Set<string>()
        const levels: number[] = []
        for (let i = 0; i < courseIds.length; i += 30) {
          const chunk = courseIds.slice(i, i + 30)
          const coursesSnap = await db
            .collection('universityCourses')
            .where('__name__', 'in', chunk)
            .get()
          for (const courseDoc of coursesSnap.docs) {
            const d = courseDoc.data()
            if (d.subject) subjectsSet.add(d.subject)
            if (typeof d.level === 'number') levels.push(d.level)
          }
        }
        updateData.subjects = [...subjectsSet]
        if (levels.length > 0) {
          updateData.levelRange = { min: Math.min(...levels), max: Math.max(...levels) }
        }
      }
    }

    await pathRef.update(updateData)

    return successResponse({ published: true })
  } catch (error) {
    return serverError(error, 'Failed to publish learning path')
  }
}

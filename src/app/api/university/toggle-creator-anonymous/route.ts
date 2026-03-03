import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { pathId, creatorAnonymous } = body

    if (!pathId || typeof pathId !== 'string') {
      return badRequestError('pathId is required')
    }

    if (typeof creatorAnonymous !== 'boolean') {
      return badRequestError('creatorAnonymous must be a boolean')
    }

    const pathRef = db.collection('universityLearningPaths').doc(pathId)
    const pathSnap = await pathRef.get()

    if (!pathSnap.exists) {
      return badRequestError('Learning path not found')
    }

    const pathData = pathSnap.data()!

    if (pathData.userId !== userId) {
      return badRequestError('You can only modify your own learning paths')
    }

    if (pathData.isPublished === false) {
      return badRequestError('This learning path is not published')
    }

    if (pathData.sourcePathId) {
      return badRequestError('Cannot toggle anonymity on a copied path')
    }

    const updateData: Record<string, unknown> = {
      creatorAnonymous,
    }

    // If toggling to visible and stored name is "Anonymous" (old data), backfill real name
    if (!creatorAnonymous && (!pathData.creatorName || pathData.creatorName === 'Anonymous')) {
      try {
        const userRecord = await auth.getUser(userId)
        updateData.creatorName = userRecord.displayName || userRecord.email || 'Anonymous'
      } catch {
        // Keep existing name
      }
    }

    await pathRef.update(updateData)

    return successResponse({ updated: true })
  } catch (error) {
    return serverError(error, 'Failed to toggle creator anonymity')
  }
}

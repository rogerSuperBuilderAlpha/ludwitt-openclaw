/**
 * Developer Submission Progress Update API
 * Update progress percentage and status for a document
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { isDeveloper } from '@/config/developers'
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/in-memory'
import { createNotification } from '@/lib/utils/notifications'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken
    const developerEmail = decodedToken.email

    if (!developerEmail) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      )
    }

    // Verify user is a developer
    if (!isDeveloper(developerEmail)) {
      return NextResponse.json(
        { error: 'Access denied. Developer access required.' },
        { status: 403 }
      )
    }

    // Apply rate limiting
    const rateLimitResult = applyRateLimit(
      developerEmail,
      RateLimitPresets.STANDARD
    )
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const { documentId, progressPercentage, progressNote } =
      await request.json()

    if (!documentId || progressPercentage === undefined) {
      return NextResponse.json(
        { error: 'documentId and progressPercentage are required' },
        { status: 400 }
      )
    }

    // Validate progress percentage (0-100)
    const progress = parseInt(progressPercentage)
    if (isNaN(progress) || progress < 0 || progress > 100) {
      return NextResponse.json(
        { error: 'progressPercentage must be a number between 0 and 100' },
        { status: 400 }
      )
    }

    // Get the document
    const docRef = db.collection('customerDocuments').doc(documentId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const docData = docSnap.data()!

    // Verify the developer is assigned to this document or is admin
    if (docData.assignedTo !== decodedToken.uid) {
      return NextResponse.json(
        { error: 'You are not assigned to this document' },
        { status: 403 }
      )
    }

    // Update progress
    const updateData: any = {
      progressPercentage: progress,
      progressUpdatedAt: new Date().toISOString(),
      progressUpdatedBy: decodedToken.uid,
    }

    if (progressNote) {
      updateData.progressNote = progressNote
    }

    await docRef.update(updateData)

    // Create notification for customer about progress update (only for significant milestones)
    if (
      docData.customerId &&
      (progress === 25 ||
        progress === 50 ||
        progress === 75 ||
        progress === 100)
    ) {
      try {
        await createNotification({
          recipientId: docData.customerId,
          recipientRole: 'customer',
          type: 'status_change',
          documentId,
          documentTitle: docData.googleDocTitle || 'Document',
          actorId: decodedToken.uid,
          actorName: developerEmail,
          actorRole: 'developer',
          details: `${progress}% complete`,
          priority: progress === 100 ? 'high' : 'normal',
        })
      } catch (notifError) {
        apiLogger.apiError(
          'developers/submissions/update-progress',
          'Failed to create notification',
          notifError
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Progress updated successfully',
      progressPercentage: progress,
    })
  } catch (error) {
    apiLogger.apiError(
      'developers/submissions/update-progress',
      'Failed to update progress',
      error
    )
    return NextResponse.json(
      {
        error: 'Failed to update progress',
        details: getErrorMessage(error, 'Unknown error'),
      },
      { status: 500 }
    )
  }
}

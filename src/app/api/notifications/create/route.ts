import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import { CreateNotificationInput } from '@/lib/types/notifications'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

/**
 * Create a new notification
 * This endpoint is typically called internally by other API routes
 */
export async function POST(request: NextRequest) {
  try {
    // Auth is optional - this endpoint is also called internally by other API routes
    const authResult = await authenticateRequest(request, { requireAuth: false })
    const userId = authResult instanceof NextResponse ? null : authResult.decodedToken?.uid

    // Rate limit authenticated callers only (internal calls skip)
    if (userId) {
      const rl = await checkRateLimit('api', userId)
      if (!rl.success) return rateLimitedResponse(rl)
    }

    const input: CreateNotificationInput = await request.json()

    // Validate required fields
    if (!input.recipientId || !input.recipientRole || !input.type || !input.title || !input.message) {
      return NextResponse.json(
        { error: 'Missing required fields: recipientId, recipientRole, type, title, message' },
        { status: 400 }
      )
    }

    // Create notification document
    const notification = {
      recipientId: input.recipientId,
      recipientRole: input.recipientRole,
      type: input.type,
      title: input.title,
      message: input.message,
      documentId: input.documentId || null,
      documentTitle: input.documentTitle || null,
      projectId: input.projectId || null,
      projectTitle: input.projectTitle || null,
      actorId: input.actorId || null,
      actorName: input.actorName || null,
      actorRole: input.actorRole || null,
      actionUrl: input.actionUrl || null,
      priority: input.priority || 'normal',
      read: false,
      readAt: null,
      createdAt: FieldValue.serverTimestamp(),
    }

    const notificationRef = await db.collection('notifications').add(notification)

    return NextResponse.json({
      success: true,
      notificationId: notificationRef.id,
      notification: {
        id: notificationRef.id,
        ...notification,
        createdAt: new Date(),
      },
    })
  } catch (error) {
    apiLogger.apiError('notifications/create', 'Failed to create notification', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}

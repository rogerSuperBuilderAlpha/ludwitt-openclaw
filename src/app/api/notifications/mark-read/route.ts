/**
 * Mark Notification as Read API
 * Mark one or all notifications as read
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
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

    // Parse request body
    const { notificationId, markAll = false } = await request.json()

    if (!markAll && !notificationId) {
      return NextResponse.json(
        { error: 'notificationId is required when markAll is false' },
        { status: 400 }
      )
    }

    if (markAll) {
      // Mark all notifications as read
      const snapshot = await db
        .collection('notifications')
        .where('recipientId', '==', decodedToken.uid)
        .where('read', '==', false)
        .get()

      const batch = db.batch()

      snapshot.docs.forEach(doc => {
        batch.update(doc.ref, {
          read: true,
          readAt: new Date().toISOString(),
        })
      })

      await batch.commit()

      return NextResponse.json({
        success: true,
        message: `Marked ${snapshot.size} notifications as read`,
        count: snapshot.size,
      })
    } else {
      // Mark single notification as read
      const notificationRef = db.collection('notifications').doc(notificationId)
      const notificationDoc = await notificationRef.get()

      if (!notificationDoc.exists) {
        return NextResponse.json(
          { error: 'Notification not found' },
          { status: 404 }
        )
      }

      const notification = notificationDoc.data()!

      // Verify ownership
      if (notification.recipientId !== decodedToken.uid) {
        return NextResponse.json(
          { error: 'Forbidden: Not your notification' },
          { status: 403 }
        )
      }

      await notificationRef.update({
        read: true,
        readAt: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'Notification marked as read',
      })
    }
  } catch (error) {
    apiLogger.apiError('notifications/mark-read', 'Failed to mark notification as read', error)
    return NextResponse.json(
      { error: 'Failed to mark notification as read', details: getErrorMessage(error, 'Unknown error') },
      { status: 500 }
    )
  }
}

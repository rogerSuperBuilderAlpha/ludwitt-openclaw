/**
 * Send Message API
 * Send a message in a project conversation
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    // Parse request body
    const { projectId, content, replyToId, attachmentUrl, attachmentType } = await request.json()

    if (!projectId || !content) {
      return badRequestError('projectId and content are required')
    }

    // Get project and user info in parallel
    const [projectDoc, userDoc] = await Promise.all([
      db.collection('projects').doc(projectId).get(),
      db.collection('users').doc(decodedToken.uid).get()
    ])

    if (!projectDoc.exists) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const project = projectDoc.data()!
    const userData = userDoc.data()

    // Verify user has access to this project
    const isCustomer = project.customerId === decodedToken.uid
    const isDeveloper = project.assignedDeveloperId === decodedToken.uid
    const isAdmin = userData?.role === 'admin'

    if (!isCustomer && !isDeveloper && !isAdmin) {
      return forbiddenError('You do not have access to this project')
    }

    // Determine sender type
    let senderType: 'customer' | 'developer' | 'admin' = 'customer'
    if (isAdmin) {
      senderType = 'admin'
    } else if (isDeveloper) {
      senderType = 'developer'
    }

    // Create message
    const message = {
      projectId,
      senderId: decodedToken.uid,
      senderName: userData?.displayName || userData?.email || 'Unknown User',
      senderType,
      content,
      replyToId: replyToId || null,
      attachmentUrl: attachmentUrl || null,
      attachmentType: attachmentType || null,
      readBy: [decodedToken.uid], // Sender has already read it
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const messageRef = await db.collection('messages').add(message)

    // Create notifications for other participants
    const notificationPromises: Promise<any>[] = []

    // Notify customer if sender is not customer
    if (!isCustomer && project.customerId) {
      notificationPromises.push(
        db.collection('notifications').add({
          recipientId: project.customerId,
          recipientRole: 'customer',
          projectId,
          type: 'message_received',
          title: 'New Message',
          message: `${message.senderName} sent you a message`,
          entityType: 'message',
          entityId: messageRef.id,
          read: false,
          createdAt: new Date().toISOString(),
        })
      )
    }

    // Notify developer if sender is not developer and developer is assigned
    if (!isDeveloper && project.assignedDeveloperId) {
      notificationPromises.push(
        db.collection('notifications').add({
          recipientId: project.assignedDeveloperId,
          recipientRole: 'developer',
          projectId,
          type: 'message_received',
          title: 'New Message',
          message: `${message.senderName} sent you a message`,
          entityType: 'message',
          entityId: messageRef.id,
          read: false,
          createdAt: new Date().toISOString(),
        })
      )
    }

    await Promise.all(notificationPromises)

    return NextResponse.json({
      success: true,
      messageId: messageRef.id,
      message: {
        id: messageRef.id,
        ...message,
      },
    })
  } catch (error) {
    apiLogger.apiError('messages/send', 'Failed to send message', error)
    return serverError(error, 'Failed to send message')
  }
}

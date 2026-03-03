/**
 * Cohort Message API
 * Send messages within a cohort (mentor to students, student to mentor)
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
    const { cohortId, content, recipientId, isPrivate } = await request.json()

    if (!cohortId || !content) {
      return NextResponse.json(
        { error: 'cohortId and content are required' },
        { status: 400 }
      )
    }

    // Get user info and check membership - run in parallel
    const [userDoc, membershipDoc, mentorAssignmentDoc] = await Promise.all([
      db.collection('users').doc(decodedToken.uid).get(),
      db.collection('cohortMembers')
        .where('cohortId', '==', cohortId)
        .where('userId', '==', decodedToken.uid)
        .limit(1)
        .get(),
      db.collection('cohortMentorAssignments')
        .where('cohortId', '==', cohortId)
        .where('mentorId', '==', decodedToken.uid)
        .where('status', '==', 'active')
        .limit(1)
        .get()
    ])
    const userData = userDoc.data()

    const isMember = !membershipDoc.empty
    const isMentor = !mentorAssignmentDoc.empty
    const isAdmin = userData?.role === 'admin'

    if (!isMember && !isMentor && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: You must be a member or mentor of this cohort' },
        { status: 403 }
      )
    }

    // Determine sender type
    let senderType: 'mentor' | 'student' | 'admin' = 'student'
    if (isAdmin) {
      senderType = 'admin'
    } else if (isMentor) {
      senderType = 'mentor'
    }

    // Get recipient info if private message
    let recipientName: string | undefined
    if (isPrivate && recipientId) {
      const recipientDoc = await db.collection('users').doc(recipientId).get()
      if (recipientDoc.exists) {
        const recipientData = recipientDoc.data()!
        recipientName = recipientData.displayName || recipientData.email
      }
    }

    // Create message
    const message = {
      cohortId,
      senderId: decodedToken.uid,
      senderName: userData?.displayName || userData?.email || 'Unknown User',
      senderType,
      recipientId: isPrivate ? recipientId : null,
      recipientName: isPrivate ? recipientName : null,
      content,
      isPrivate: isPrivate || false,
      readBy: [decodedToken.uid],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const messageRef = await db.collection('cohortMessages').add(message)

    // Create notifications
    if (isPrivate && recipientId) {
      // Notify only recipient for private messages
      await db.collection('notifications').add({
        recipientId: recipientId,
        recipientRole: 'customer',
        projectId: cohortId,
        type: 'message_received',
        title: 'New Message',
        message: `${message.senderName} sent you a private message`,
        entityType: 'message',
        entityId: messageRef.id,
        read: false,
        createdAt: new Date().toISOString(),
      })
    } else {
      // Notify all cohort members except sender
      const cohortMembersSnapshot = await db
        .collection('cohortMembers')
        .where('cohortId', '==', cohortId)
        .get()

      const notificationPromises = cohortMembersSnapshot.docs
        .filter(doc => doc.data().userId !== decodedToken.uid)
        .map(doc =>
          db.collection('notifications').add({
            recipientId: doc.data().userId,
            recipientRole: 'customer',
            projectId: cohortId,
            type: 'message_received',
            title: 'New Cohort Message',
            message: `${message.senderName} posted a message in ${cohortId}`,
            entityType: 'message',
            entityId: messageRef.id,
            read: false,
            createdAt: new Date().toISOString(),
          })
        )

      // Also notify mentor if sender is not mentor
      if (!isMentor && !mentorAssignmentDoc.empty) {
        const mentorData = mentorAssignmentDoc.docs[0].data()
        notificationPromises.push(
          db.collection('notifications').add({
            recipientId: mentorData.mentorId,
            recipientRole: 'developer',
            projectId: cohortId,
            type: 'message_received',
            title: 'New Cohort Message',
            message: `${message.senderName} posted a message`,
            entityType: 'message',
            entityId: messageRef.id,
            read: false,
            createdAt: new Date().toISOString(),
          })
        )
      }

      await Promise.all(notificationPromises)
    }

    return NextResponse.json({
      success: true,
      messageId: messageRef.id,
      message: {
        id: messageRef.id,
        ...message,
      },
    })
  } catch (error) {
    apiLogger.apiError('cohorts/messages/send', 'Failed to send message', error)
    return NextResponse.json(
      { error: 'Failed to send message', details: getErrorMessage(error, 'Unknown error') },
      { status: 500 }
    )
  }
}

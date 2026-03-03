/**
 * API Route: /api/tutor/sessions/[id]/messages
 * 
 * GET - Get chat messages
 * POST - Send a message
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError, forbiddenError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { TutorSession, TutorMessage, TUTOR_COLLECTIONS } from '@/lib/types/tutor'

// GET - Get messages for a session
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    const { id: sessionId } = await params

    // Verify user is participant
    const sessionDoc = await db.collection(TUTOR_COLLECTIONS.SESSIONS).doc(sessionId).get()
    if (!sessionDoc.exists) {
      return notFoundError('Session not found')
    }

    const session = sessionDoc.data() as TutorSession
    if (session.studentId !== userId && session.tutorId !== userId) {
      return forbiddenError('Access denied')
    }

    // Get messages
    const messagesSnapshot = await db.collection(TUTOR_COLLECTIONS.MESSAGES)
      .where('sessionId', '==', sessionId)
      .orderBy('createdAt', 'asc')
      .get()

    const messages = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TutorMessage[]

    return successResponse({ messages })

  } catch (error) {
    apiLogger.apiError('tutor/sessions/[id]/messages', 'Failed to get messages', error)
    return serverError(error, 'Failed to get messages')
  }
}

// POST - Send a message
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    const { id: sessionId } = await params

    const body = await request.json()
    const { content } = body

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return badRequestError('Message content is required')
    }

    // Verify user is participant and session is active
    const sessionDoc = await db.collection(TUTOR_COLLECTIONS.SESSIONS).doc(sessionId).get()
    if (!sessionDoc.exists) {
      return notFoundError('Session not found')
    }

    const session = sessionDoc.data() as TutorSession
    if (session.studentId !== userId && session.tutorId !== userId) {
      return forbiddenError('Access denied')
    }

    // Check if session has ended
    if (new Date(session.endsAt) < new Date()) {
      return badRequestError('Session has ended')
    }

    if (session.status !== 'active') {
      return badRequestError('Session is not active')
    }

    // Get sender name
    const isStudent = session.studentId === userId
    const senderName = isStudent ? session.studentDisplayName : session.tutorDisplayName

    // Create message
    const message: Omit<TutorMessage, 'id'> = {
      sessionId,
      senderId: userId,
      senderName,
      content: content.trim().slice(0, 1000), // Limit message length
      createdAt: createISOTimestamp()
    }

    const messageRef = await db.collection(TUTOR_COLLECTIONS.MESSAGES).add(message)

    return successResponse({
      message: {
        id: messageRef.id,
        ...message
      }
    })

  } catch (error) {
    apiLogger.apiError('tutor/sessions/[id]/messages', 'Failed to send message', error)
    return serverError(error, 'Failed to send message')
  }
}


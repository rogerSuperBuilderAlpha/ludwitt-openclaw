/**
 * API Route: POST /api/tutor/rating
 * 
 * Submit a rating after a tutoring session
 * Handles credit transfer when both parties have rated
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError, forbiddenError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { TutorSession, TutorRating, TUTOR_COLLECTIONS } from '@/lib/types/tutor'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { sessionId, rating } = body

    if (!sessionId) {
      return badRequestError('Session ID is required')
    }

    if (!rating || rating < 1 || rating > 5) {
      return badRequestError('Rating must be between 1 and 5')
    }

    // Get session
    const sessionDoc = await db.collection(TUTOR_COLLECTIONS.SESSIONS).doc(sessionId).get()
    if (!sessionDoc.exists) {
      return notFoundError('Session not found')
    }

    const session = { id: sessionDoc.id, ...sessionDoc.data() } as TutorSession

    // Verify user is participant
    const isStudent = session.studentId === userId
    const isTutor = session.tutorId === userId
    
    if (!isStudent && !isTutor) {
      return forbiddenError('Access denied')
    }

    // Check session has ended
    if (session.status === 'active') {
      return badRequestError('Session is still active')
    }

    // Check if already rated
    if (isStudent && session.studentRating !== undefined) {
      return badRequestError('You have already rated this session')
    }
    if (isTutor && session.tutorRating !== undefined) {
      return badRequestError('You have already rated this session')
    }

    // Determine who is being rated
    const ratedUserId = isStudent ? session.tutorId : session.studentId
    const ratedRole = isStudent ? 'tutor' : 'student'

    // Create rating record
    const ratingRecord: Omit<TutorRating, 'id'> = {
      sessionId,
      raterId: userId,
      ratedUserId,
      ratedRole,
      rating,
      createdAt: createISOTimestamp()
    }

    await db.collection(TUTOR_COLLECTIONS.RATINGS).add(ratingRecord)

    // Update session with rating
    const updateData: any = {}
    if (isStudent) {
      updateData.studentRating = rating
      updateData.status = session.tutorRating !== undefined ? 'completed' : 'rated_by_student'
    } else {
      updateData.tutorRating = rating
      updateData.status = session.studentRating !== undefined ? 'completed' : 'rated_by_tutor'
    }

    await sessionDoc.ref.update(updateData)

    // Check if both have rated - if so, transfer credits
    const updatedSession = { ...session, ...updateData }
    let creditsTransferred = false

    if (updatedSession.studentRating !== undefined && updatedSession.tutorRating !== undefined) {
      // Both have rated - transfer credits
      try {
        await transferCredits(session.studentId, session.tutorId, session.creditsAmount)
        creditsTransferred = true

        // Update request status
        const requestDoc = await db.collection(TUTOR_COLLECTIONS.REQUESTS).doc(session.requestId).get()
        if (requestDoc.exists) {
          await requestDoc.ref.update({ status: 'completed' })
        }

        // Schedule message deletion (in production, use Cloud Functions)
        // For now, just mark them for deletion
        const messagesSnapshot = await db.collection(TUTOR_COLLECTIONS.MESSAGES)
          .where('sessionId', '==', sessionId)
          .get()
        
        const batch = db.batch()
        messagesSnapshot.docs.forEach(doc => {
          batch.delete(doc.ref)
        })
        await batch.commit()

      } catch (transferError) {
        apiLogger.apiError('tutor/rating', 'Failed to transfer credits', transferError)
        // Don't fail the rating, but log the issue
      }
    }

    return successResponse({
      success: true,
      message: creditsTransferred 
        ? 'Rating submitted and credits transferred!' 
        : 'Rating submitted. Waiting for other party to rate.',
      creditsTransferred,
      sessionCompleted: updatedSession.status === 'completed'
    })

  } catch (error) {
    apiLogger.apiError('tutor/rating', 'Failed to submit rating', error)
    return serverError(error, 'Failed to submit rating')
  }
}

// Transfer credits from student to tutor
async function transferCredits(studentId: string, tutorId: string, amount: number) {
  const studentRef = db.collection('users').doc(studentId)
  const tutorRef = db.collection('users').doc(tutorId)
  const timestamp = createISOTimestamp()

  await db.runTransaction(async (transaction) => {
    const studentDoc = await transaction.get(studentRef)
    const tutorDoc = await transaction.get(tutorRef)

    const studentCredits = studentDoc.data()?.credits || { balance: 0, totalUsed: 0 }
    const tutorCredits = tutorDoc.data()?.credits || { balance: 0, totalDeposited: 0 }

    // Deduct from student
    transaction.update(studentRef, {
      'credits.balance': studentCredits.balance - amount,
      'credits.totalUsed': (studentCredits.totalUsed || 0) + amount,
      updatedAt: timestamp
    })

    // Add to tutor
    transaction.update(tutorRef, {
      'credits.balance': tutorCredits.balance + amount,
      'credits.totalDeposited': (tutorCredits.totalDeposited || 0) + amount,
      updatedAt: timestamp
    })
  })
}


/**
 * API Route: /api/tutor/requests
 * 
 * POST - Create a new help request
 * GET - List available requests (filtered by user's grade for tutors)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { 
  TutorRequest, 
  TUTOR_COLLECTIONS, 
  TUTOR_CONSTANTS 
} from '@/lib/types/tutor'
import { checkBalance } from '@/lib/credits/balance'

// POST - Create a new help request
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { description, creditsOffered, subject = 'math' } = body

    // Validate inputs
    if (!description || typeof description !== 'string' || description.length < 10) {
      return badRequestError('Description must be at least 10 characters')
    }

    if (!creditsOffered || creditsOffered < TUTOR_CONSTANTS.MIN_CREDITS_OFFER) {
      return badRequestError(`Minimum credits offer is ${TUTOR_CONSTANTS.MIN_CREDITS_OFFER} (${(TUTOR_CONSTANTS.MIN_CREDITS_OFFER / 100).toFixed(2)})`)
    }

    // Check if user has enough credits
    const balanceCheck = await checkBalance(userId)
    if (balanceCheck.currentBalance < creditsOffered) {
      return badRequestError('Insufficient credits for this offer')
    }

    // Get user's profile for display name and grade
    const userDoc = await db.collection('users').doc(userId).get()
    const userData = userDoc.data()
    
    // Get user's math progress for grade level
    const mathProgressDoc = await db.collection('users').doc(userId)
      .collection('basics_progress').doc('math').get()
    const mathProgress = mathProgressDoc.data()
    const studentGrade = Math.floor(mathProgress?.currentDifficulty || 5)

    // Check for existing open request
    const existingRequest = await db.collection(TUTOR_COLLECTIONS.REQUESTS)
      .where('studentId', '==', userId)
      .where('status', 'in', ['open', 'pending', 'active'])
      .limit(1)
      .get()

    if (!existingRequest.empty) {
      return badRequestError('You already have an active help request')
    }

    const now = createISOTimestamp()
    const expiresAt = new Date(Date.now() + TUTOR_CONSTANTS.REQUEST_EXPIRY_HOURS * 60 * 60 * 1000).toISOString()

    const newRequest: Omit<TutorRequest, 'id'> = {
      studentId: userId,
      studentDisplayName: userData?.displayName || userData?.name || 'Student',
      studentAvatarUrl: userData?.photoURL || null,
      studentGrade,
      subject,
      description,
      creditsOffered,
      status: 'open',
      potentialTutors: [],
      createdAt: now,
      expiresAt
    }

    const docRef = await db.collection(TUTOR_COLLECTIONS.REQUESTS).add(newRequest)
    
    return successResponse({
      request: {
        id: docRef.id,
        ...newRequest
      }
    })

  } catch (error) {
    apiLogger.apiError('tutor/requests', 'Failed to create tutor request', error)
    return serverError(error, 'Failed to create help request')
  }
}

// GET - List available requests
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'tutor' // 'tutor' or 'student'

    if (mode === 'student') {
      // Get user's own requests
      const snapshot = await db.collection(TUTOR_COLLECTIONS.REQUESTS)
        .where('studentId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get()

      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TutorRequest[]

      return successResponse({ requests })
    }

    // Tutor mode - get requests from students 1-3 grades below
    const userMathProgress = await db.collection('users').doc(userId)
      .collection('basics_progress').doc('math').get()
    const userGrade = Math.floor(userMathProgress.data()?.currentDifficulty || 5)

    // Find requests from students who are 1-3 grades below
    const minStudentGrade = Math.max(1, userGrade - TUTOR_CONSTANTS.MAX_GRADE_DIFFERENCE)
    const maxStudentGrade = userGrade - 1

    if (maxStudentGrade < 1) {
      // User is at lowest grade, can't tutor anyone
      return successResponse({ requests: [], message: 'No students available to tutor at your level' })
    }

    const now = new Date().toISOString()
    
    const snapshot = await db.collection(TUTOR_COLLECTIONS.REQUESTS)
      .where('status', '==', 'open')
      .where('studentGrade', '>=', minStudentGrade)
      .where('studentGrade', '<=', maxStudentGrade)
      .where('expiresAt', '>', now)
      .orderBy('studentGrade', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get()

    // Filter out requests where user already offered
    const requests = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as TutorRequest)
      .filter(req => !req.potentialTutors.some(t => t.tutorId === userId))

    return successResponse({ 
      requests,
      userGrade,
      tutorableRange: { min: minStudentGrade, max: maxStudentGrade }
    })

  } catch (error) {
    apiLogger.apiError('tutor/requests', 'Failed to get tutor requests', error)
    return serverError(error, 'Failed to get requests')
  }
}


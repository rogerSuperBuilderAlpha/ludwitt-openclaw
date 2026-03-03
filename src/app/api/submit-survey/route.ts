import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { apiLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.userId

    // Parse request body
    const body = await request.json()
    const { surveyId, responses } = body

    if (!surveyId || !responses) {
      return badRequestError('Missing surveyId or responses')
    }

    // Save survey response to Firestore
    const surveyResponse = {
      surveyId,
      userId,
      responses,
      completedAt: new Date().toISOString(),
    }

    // Store in surveyResponses collection
    await db.collection('surveyResponses').add(surveyResponse)

    // Mark survey as completed in user's progress
    await db.collection('surveyProgress').doc(userId).set(
      {
        [surveyId]: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    )

    apiLogger.success('submit-survey', `Survey ${surveyId} submitted by user ${userId}`)

    return NextResponse.json({
      success: true,
      message: 'Survey submitted successfully',
    })
  } catch (error) {
    apiLogger.apiError('submit-survey', 'Failed to submit survey', error)
    return serverError(error, 'Failed to submit survey')
  }
}

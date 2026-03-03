import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

interface DeleteCohortRequest {
  cohortId: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase Auth token
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const decodedToken = authResult.decodedToken

    const rl = await checkRateLimit('api', decodedToken.uid)
    if (!rl.success) return rateLimitedResponse(rl)

    const body: DeleteCohortRequest = await request.json()
    const { cohortId } = body

    // Validate required fields
    if (!cohortId) {
      return NextResponse.json(
        { success: false, error: 'Missing cohort ID' },
        { status: 400 }
      )
    }

    // Get cohort document
    const cohortRef = db.collection('cohorts').doc(cohortId)
    const cohortDoc = await cohortRef.get()

    if (!cohortDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Cohort not found' },
        { status: 404 }
      )
    }

    const cohortData = cohortDoc.data()

    // Verify user owns this cohort
    if (cohortData?.creatorId !== decodedToken.uid) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to delete this cohort' },
        { status: 403 }
      )
    }

    // Check if cohort has members
    if (cohortData?.currentSize > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete cohort with existing members. Please contact support.' },
        { status: 400 }
      )
    }

    // Delete the cohort
    await cohortRef.delete()

    apiLogger.success('cohorts/delete', `Cohort "${cohortData?.name}" deleted by ${decodedToken.uid}`)

    return NextResponse.json({
      success: true,
      message: 'Cohort deleted successfully',
    })

  } catch (error) {
    apiLogger.apiError('cohorts/delete', 'Failed to delete cohort', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to delete a cohort' },
    { status: 405 }
  )
}

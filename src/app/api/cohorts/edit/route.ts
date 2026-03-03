import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

interface EditCohortRequest {
  cohortId: string
  name: string
  description: string
  startDate: string
  targetSize: number // For validation only, won't be updated
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

    const body: EditCohortRequest = await request.json()
    const { cohortId, name, description, startDate } = body

    // Validate required fields
    if (!cohortId || !name || !description || !startDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
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
        { success: false, error: 'You do not have permission to edit this cohort' },
        { status: 403 }
      )
    }

    // Update cohort (only name, description, and startDate)
    await cohortRef.update({
      name,
      description,
      startDate,
      updatedAt: new Date().toISOString(),
    })

    apiLogger.success('cohorts/edit', `Cohort "${name}" updated by ${decodedToken.uid}`)

    return NextResponse.json({
      success: true,
      message: 'Cohort updated successfully',
    })

  } catch (error) {
    apiLogger.apiError('cohorts/edit', 'Failed to update cohort', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to edit a cohort' },
    { status: 405 }
  )
}

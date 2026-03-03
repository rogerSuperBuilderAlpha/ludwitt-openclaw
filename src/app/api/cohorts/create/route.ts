import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

interface CreateCohortRequest {
  name: string
  description: string
  targetSize: number
  startDate: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase Auth token
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      // Add success: false for consistency
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const decodedToken = authResult.decodedToken

    const rl = await checkRateLimit('api', decodedToken.uid)
    if (!rl.success) return rateLimitedResponse(rl)

    const body: CreateCohortRequest = await request.json()
    const { name, description, targetSize, startDate } = body

    // Validate required fields
    if (!name || !description || !targetSize || !startDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user has permission to create cohorts - fetch all user data in parallel
    // User must have either:
    // 1. Completed Vercel deployment (learning path)
    // 2. OR signed up through customer portal
    const [vercelProgressDoc, customerDoc, userDoc] = await Promise.all([
      db.collection('vercelDeploymentProgress').doc(decodedToken.uid).get(),
      db.collection('customers').doc(decodedToken.uid).get(),
      db.collection('users').doc(decodedToken.uid).get()
    ])
    
    const hasCompletedVercel = vercelProgressDoc.exists && vercelProgressDoc.data()?.completed === true
    const isCustomer = customerDoc.exists

    if (!hasCompletedVercel && !isCustomer) {
      return NextResponse.json(
        {
          success: false,
          error: 'You must complete the Vercel deployment in the learning path or sign up through the customer portal to create cohorts'
        },
        { status: 403 }
      )
    }

    // Validate target size
    if (![1, 5, 10, 20].includes(targetSize)) {
      return NextResponse.json(
        { success: false, error: 'Invalid target size. Must be 1, 5, 10, or 20' },
        { status: 400 }
      )
    }

    // Calculate price per person
    const totalCost = 10000
    const pricePerPerson = totalCost / targetSize

    // Get user name from already-fetched userDoc
    const userName = userDoc.exists
      ? (userDoc.data()?.displayName || userDoc.data()?.email || 'Anonymous')
      : 'Anonymous'

    // Create cohort
    const cohortRef = await db.collection('cohorts').add({
      name,
      description,
      creatorId: decodedToken.uid,
      creatorName: userName,
      targetSize,
      currentSize: 0,
      pricePerPerson,
      totalCost,
      startDate,
      status: 'open',
      createdAt: new Date().toISOString(),
    })

    // Initialize creator tracking
    const creatorRef = db.collection('cohortCreators').doc(decodedToken.uid)
    const creatorDoc = await creatorRef.get()

    if (creatorDoc.exists) {
      // Update existing creator
      await creatorRef.update({
        cohortsCreated: (creatorDoc.data()?.cohortsCreated || 0) + 1,
        updatedAt: new Date().toISOString(),
      })
    } else {
      // Create new creator record
      await creatorRef.set({
        cohortsCreated: 1,
        cohortsCompleted: 0,
        totalEarnings: 0,
        pendingEarnings: 0,
        earnings: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    apiLogger.success('cohorts/create', `Cohort "${name}" created by ${userName} (${decodedToken.uid})`)

    return NextResponse.json({
      success: true,
      cohortId: cohortRef.id,
      message: 'Cohort created successfully',
    })

  } catch (error) {
    apiLogger.apiError('cohorts/create', 'Failed to create cohort', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to create a cohort' },
    { status: 405 }
  )
}

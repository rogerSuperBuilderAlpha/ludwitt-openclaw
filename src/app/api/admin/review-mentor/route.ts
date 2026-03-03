import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { isAdmin } from '@/config/developers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { forbiddenError, badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    const rl = await checkRateLimit('strict', decodedToken.uid)
    if (!rl.success) return rateLimitedResponse(rl)

    // Verify user is admin
    if (!isAdmin(decodedToken.email)) {
      return forbiddenError('Admin access required')
    }

    // Parse request body
    const { applicationId, action } = await request.json()

    if (!applicationId || !action) {
      return badRequestError('Missing required fields')
    }

    if (!['approve', 'reject'].includes(action)) {
      return badRequestError('Invalid action')
    }

    // Get the application
    const appRef = db.collection('mentorApplications').doc(applicationId)
    const appDoc = await appRef.get()

    if (!appDoc.exists) {
      return notFoundError('Application not found')
    }

    const appData = appDoc.data()

    if (appData?.status !== 'pending') {
      return badRequestError('Application already reviewed')
    }

    // Update application status
    const newStatus = action === 'approve' ? 'approved' : 'rejected'
    await appRef.update({
      status: newStatus,
      reviewedAt: new Date().toISOString(),
      reviewedBy: decodedToken.email,
    })

    // If approved, create mentor profile
    if (action === 'approve') {
      const mentorRef = db.collection('mentors').doc(applicationId) // Use same ID as application

      await mentorRef.set({
        userId: appData.userId,
        email: appData.email,
        name: appData.name,
        skills: appData.skills,
        experience: appData.experience,
        availability: appData.availability,
        bio: appData.whyMentor, // Use their motivation as initial bio
        approved: true,
        approvedAt: new Date().toISOString(),
        approvedBy: decodedToken.email,
        // Earnings tracking
        totalEarnings: 0,
        pendingPayouts: 0,
        paidOut: 0,
        // Cohort stats
        cohortsLed: 0,
        cohortsAssisted: 0,
        totalStudents: 0,
        // Status
        active: true,
        // Timestamps
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      message: `Application ${newStatus}`,
    })
  } catch (error) {
    apiLogger.apiError('admin/review-mentor', 'Failed to review application', error)
    return serverError(error, 'Failed to review application')
  }
}

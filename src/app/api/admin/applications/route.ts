import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { isAdmin } from '@/config/developers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { forbiddenError, badRequestError, serverError } from '@/lib/api/error-responses'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
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

    // Get filter from query params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return badRequestError('Invalid status filter')
    }

    // Query applications
    const appsRef = db.collection('mentorApplications')
    const snapshot = await appsRef
      .where('status', '==', status)
      .orderBy('appliedAt', 'desc')
      .get()

    const applications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ applications })
  } catch (error) {
    apiLogger.apiError('admin/applications', 'Failed to fetch applications', error)
    return serverError(error, 'Failed to fetch applications')
  }
}

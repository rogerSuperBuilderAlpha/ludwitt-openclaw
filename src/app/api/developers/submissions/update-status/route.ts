/**
 * Developer Submission Status Update API
 * Thin HTTP handler -- business logic lives in submission-status-service.ts
 */
import { NextRequest, NextResponse } from 'next/server'
import { isAdmin as checkIsAdmin } from '@/config/developers'
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/in-memory'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'
import {
  isValidStatus,
  verifyDeveloperAccess,
  updateSubmissionStatus,
  ServiceError,
  VALID_STATUSES,
} from '@/lib/developers/submission-status-service'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const logs: string[] = []
  const log = (message: string, data?: unknown) => {
    const entry = data ? `${message} ${JSON.stringify(data)}` : message
    logs.push(entry)
    apiLogger.debug('update-status', message, { data })
  }

  try {
    // Authenticate
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { decodedToken } = authResult
    const isAdmin = checkIsAdmin(decodedToken.email)

    // Rate limit
    const rl = applyRateLimit(
      decodedToken.email || decodedToken.uid,
      RateLimitPresets.STANDARD
    )
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.', logs },
        { status: 429, headers: rl.headers }
      )
    }

    // Verify developer access
    if (!(await verifyDeveloperAccess(decodedToken.uid, isAdmin))) {
      return NextResponse.json(
        { error: 'Developer profile not found', logs },
        { status: 404 }
      )
    }

    // Parse & validate input
    const { submissionId, status, category, actualCostCents } =
      await request.json()
    log('Request payload', { submissionId, status, category, actualCostCents })

    if (!submissionId || !status) {
      return NextResponse.json(
        { error: 'submissionId and status are required', logs },
        { status: 400 }
      )
    }
    if (!isValidStatus(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
          logs,
        },
        { status: 400 }
      )
    }

    // Execute business logic
    const result = await updateSubmissionStatus(
      { submissionId, status, category, actualCostCents },
      {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name as string | undefined,
      },
      log
    )

    return NextResponse.json({
      success: true,
      message: 'Submission status updated successfully',
      emailDiagnostics: result.emailDiagnostics,
      billing: result.billing,
      logs,
    })
  } catch (error) {
    if (error instanceof ServiceError) {
      log(`Service error: ${error.message}`)
      return NextResponse.json(
        { error: error.message, logs },
        { status: error.statusCode }
      )
    }
    const details = getErrorMessage(error, 'Unknown error')
    log('FATAL ERROR', {
      message: details,
      name: error instanceof Error ? error.name : undefined,
    })
    apiLogger.apiError(
      'developers/submissions/update-status',
      'Failed to update submission status',
      error
    )
    return NextResponse.json(
      { error: 'Failed to update submission status', details, logs },
      { status: 500 }
    )
  }
}

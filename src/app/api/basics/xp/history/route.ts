/**
 * XP History API
 * 
 * Retrieves XP transaction history for a user.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getXPHistory, getXPTotals } from '@/lib/basics/xp-service'
import { apiLogger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Parse query params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const startDateStr = searchParams.get('startDate')
    const endDateStr = searchParams.get('endDate')

    const startDate = startDateStr ? new Date(startDateStr) : undefined
    const endDate = endDateStr ? new Date(endDateStr) : undefined

    // Get XP history and totals in parallel
    const [history, totals] = await Promise.all([
      getXPHistory(userId, startDate, endDate, limit),
      getXPTotals(userId)
    ])

    return successResponse({
      history,
      totals
    })
  } catch (error) {
    apiLogger.apiError('xp/history', 'Failed to fetch XP history', error)
    return serverError(error, 'Failed to fetch XP history')
  }
}


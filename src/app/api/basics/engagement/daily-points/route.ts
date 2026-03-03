/**
 * API Route: GET /api/basics/engagement/daily-points
 *
 * Returns the user's confirmed points for today
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getTodayDate } from '@/lib/utils/date-helpers'
import { getOrCreateDailyEngagement, createTimestamp } from '@/lib/utils/firestore-helpers'

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Get today's date in YYYY-MM-DD format
    const today = getTodayDate()

    // Get or create daily engagement record
    const doc = await getOrCreateDailyEngagement(userId, today, {
      confirmedPoints: 0,
      sessionsCompleted: 0,
      correctAnswers: 0,
      totalTimeActive: 0
    })

    const data = doc.data()

    if (!doc.exists) {
      return successResponse({
        points: 0,
        date: today
      })
    }

    return successResponse({
      points: data?.confirmedPoints || 0,
      date: today,
      stats: {
        sessionsCompleted: data?.sessionsCompleted || 0,
        correctAnswers: data?.correctAnswers || 0,
        totalTimeActive: data?.totalTimeActive || 0
      }
    })
  } catch (error) {
    return serverError(error, 'Failed to fetch daily points')
  }
}

/**
 * API Route: POST /api/basics/engagement/confirm-points
 *
 * Confirms pending points when user answers correctly
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponseWithMessage } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { getTodayDate } from '@/lib/utils/date-helpers'
import { getDailyEngagementRef, createTimestamp } from '@/lib/utils/firestore-helpers'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(request: NextRequest) {
  apiLogger.routeCall('confirm-points')
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    apiLogger.authSuccess('confirm-points', userId)

    // Parse request body
    const body = await request.json()
    const { points } = body
    apiLogger.debug('confirm-points', 'Points to confirm', { data: { points } })

    if (!points || points <= 0) {
      return badRequestError('Invalid points value: points must be greater than 0')
    }

    // Get today's date in YYYY-MM-DD format
    const today = getTodayDate()

    // Update daily engagement record
    const docRef = getDailyEngagementRef(userId, today)
    const doc = await docRef.get()

    if (!doc.exists) {
      // Create new record
      const recordData = {
        date: today,
        confirmedPoints: points,
        sessionsCompleted: 1,
        correctAnswers: 1,
        totalTimeActive: 0,
        createdAt: createTimestamp(),
        updatedAt: createTimestamp()
      }
      apiLogger.debug('confirm-points', 'Creating new record', { data: { userId, date: today, recordData } })
      await docRef.set(recordData)
    } else {
      // Update existing record
      apiLogger.debug('confirm-points', 'Updating record', { data: { userId, date: today, points } })
      await docRef.update({
        confirmedPoints: FieldValue.increment(points),
        correctAnswers: FieldValue.increment(1),
        updatedAt: createTimestamp()
      })
    }

    // Get updated total
    const updatedDoc = await docRef.get()
    const data = updatedDoc.data()
    apiLogger.success('confirm-points', 'Points confirmed', { data: { totalToday: data?.confirmedPoints } })

    return successResponseWithMessage(
      {
        confirmedPoints: points,
        totalToday: data?.confirmedPoints || points
      },
      `✓ ${points} point${points !== 1 ? 's' : ''} confirmed!`
    )
  } catch (error) {
    return serverError(error, 'Failed to confirm points')
  }
}

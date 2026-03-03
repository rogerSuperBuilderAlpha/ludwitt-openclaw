import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  completionDates: string[]
  totalCompletions: number
}

/**
 * GET /api/developers/streaks
 *
 * Get streak data for the authenticated developer
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Get all completed documents for this developer
    const submissionsSnapshot = await db
      .collection('customerDocuments')
      .where('assignedTo', '==', userId)
      .where('status', '==', 'completed')
      .orderBy('completedAt', 'desc')
      .get()

    // Extract completion dates
    const completionDates: string[] = []
    submissionsSnapshot.docs.forEach((doc) => {
      const data = doc.data()
      if (data.completedAt) {
        try {
          let date: Date | null = null

          if (
            data.completedAt.toDate &&
            typeof data.completedAt.toDate === 'function'
          ) {
            date = data.completedAt.toDate()
          } else if (data.completedAt.seconds) {
            date = new Date(data.completedAt.seconds * 1000)
          } else if (data.completedAt._seconds) {
            date = new Date(data.completedAt._seconds * 1000)
          } else if (typeof data.completedAt === 'string') {
            date = new Date(data.completedAt)
          }

          // Validate the date is finite
          if (date && !isNaN(date.getTime()) && isFinite(date.getTime())) {
            const dateStr = date.toISOString().split('T')[0]
            if (!completionDates.includes(dateStr)) {
              completionDates.push(dateStr)
            }
          }
        } catch {
          // Skip invalid dates
        }
      }
    })

    // Sort dates in descending order
    completionDates.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    )

    // Calculate current streak
    let currentStreak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const checkDate = new Date(today)

    // Check if we have activity today or yesterday to continue the streak
    const todayStr = today.toISOString().split('T')[0]
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    // If no activity today or yesterday, streak is 0
    if (
      completionDates.length > 0 &&
      (completionDates[0] === todayStr || completionDates[0] === yesterdayStr)
    ) {
      // Count consecutive days
      for (let i = 0; i < completionDates.length; i++) {
        const expectedDate = new Date(today)
        expectedDate.setDate(expectedDate.getDate() - i)
        const expectedStr = expectedDate.toISOString().split('T')[0]

        if (completionDates.includes(expectedStr)) {
          currentStreak++
        } else {
          break
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0
    let tempStreak = 1

    for (let i = 0; i < completionDates.length - 1; i++) {
      const current = new Date(completionDates[i])
      const next = new Date(completionDates[i + 1])
      const diffDays = Math.round(
        (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diffDays === 1) {
        tempStreak++
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 1
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak)

    const streakData: StreakData = {
      currentStreak,
      longestStreak,
      lastActivityDate: completionDates.length > 0 ? completionDates[0] : null,
      completionDates: completionDates.slice(0, 30), // Last 30 days with activity
      totalCompletions: submissionsSnapshot.size,
    }

    return successResponse(streakData)
  } catch (error) {
    return serverError(error, 'Failed to fetch streak data')
  }
}

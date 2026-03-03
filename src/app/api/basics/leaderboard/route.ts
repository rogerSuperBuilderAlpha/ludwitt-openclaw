/**
 * API Route: GET /api/basics/leaderboard
 *
 * Returns leaderboard rankings with time-based filtering
 * Query params: period (day|week|month|year|all-time), limit (default 100)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { getQueryParam } from '@/lib/api/request-helpers'
import {
  sortByPointsThenCorrect,
  formatUserDisplayInfo,
} from '@/lib/utils/user-helpers'
import { toNumber } from '@/lib/utils/numbers'
import { calculateTotalCorrect } from '@/lib/utils/progress-helpers'
import { combineArrays, filterByDateRange } from '@/lib/utils/array-helpers'
import { apiLogger } from '@/lib/logger'
import { Collections } from '@/lib/basics/collections'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'
import { getDateRangeForPeriod, formatDateISO } from '@/lib/utils/date-helpers'
import { toDate, batchFetchUserProfiles } from '@/lib/utils/firestore-helpers'
import {
  GetLeaderboardResponse,
  LeaderboardEntry,
  LeaderboardPeriod,
  UserLeaderboardData,
} from '@/lib/types/leaderboard'

export async function GET(request: NextRequest) {
  apiLogger.routeCall('leaderboard')
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId: currentUserId } = authResult

    // Get query params
    const period = (getQueryParam(request, 'period') ||
      'all-time') as LeaderboardPeriod
    const limit = parseInt(getQueryParam(request, 'limit') || '100', 10)
    const regionFilter = getQueryParam(request, 'region') || undefined

    // Calculate date range based on period
    const { start: startDate, end: endDate } = getDateRangeForPeriod(period)
    const now = endDate

    // Get all users' engagement data for the period
    const userDataMap = new Map<string, UserLeaderboardData>()

    apiLogger.debug('leaderboard', 'Fetching leaderboard', {
      data: {
        period,
        region: regionFilter || 'all',
        dateRange: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
      },
    })

    const progressSnapshot = await db
      .collection(Collections.USER_BASICS_PROGRESS)
      .get()
    apiLogger.debug('leaderboard', 'Found user progress documents', {
      data: { count: progressSnapshot.docs.length },
    })

    const todayString = formatDateISO(now)

    interface ProgressDoc {
      updatedAt?: Timestamp | Date | string | number | null
      lastActiveDate?: string
      dailyXP?: number
      totalXP?: number
      math?: {
        recentAttempts?: Array<{
          timestamp?: Timestamp | Date | string | number
          correct?: boolean
          xpEarned?: number
        }>
        totalCorrect?: number
      }
      reading?: {
        recentAttempts?: Array<{
          timestamp?: Timestamp | Date | string | number
          correct?: boolean
          xpEarned?: number
        }>
        totalCorrect?: number
      }
    }

    const calculateMetricsForPeriod = (progress: ProgressDoc) => {
      let totalPoints = 0
      let problemsCorrect = 0
      const updatedAtRaw = progress.updatedAt
      const lastUpdated: Date | undefined = toDate(updatedAtRaw)

      switch (period) {
        case 'day': {
          const lastActiveDate = progress.lastActiveDate
          const isActiveToday = lastActiveDate === todayString
          if (isActiveToday) {
            totalPoints = toNumber(progress.dailyXP)

            const attempts = combineArrays(
              progress.math?.recentAttempts,
              progress.reading?.recentAttempts
            )

            const filteredAttempts = filterByDateRange(
              attempts as Array<{
                timestamp?: Date | string | number
                correct?: boolean
              }>,
              startDate,
              endDate
            )
            filteredAttempts.forEach((attempt) => {
              if (attempt.correct) {
                problemsCorrect += 1
              }
            })
          }
          break
        }
        case 'week':
        case 'month':
        case 'year': {
          const attempts = combineArrays(
            progress.math?.recentAttempts,
            progress.reading?.recentAttempts
          )

          const filteredAttempts = filterByDateRange(
            attempts as Array<{
              timestamp?: Date | string | number
              xpEarned?: number
              correct?: boolean
            }>,
            startDate,
            endDate
          )
          filteredAttempts.forEach((attempt) => {
            const xpEarned = toNumber(attempt.xpEarned)
            totalPoints += xpEarned
            if (attempt.correct) {
              problemsCorrect += 1
            }
          })
          break
        }
        case 'all-time':
        default:
          totalPoints = toNumber(progress.totalXP)
          problemsCorrect = calculateTotalCorrect(
            progress.math || {},
            progress.reading || {}
          )
          break
      }

      // For non all-time leaderboards, fall back to total XP if no data was found
      if (period !== 'all-time' && totalPoints === 0 && problemsCorrect === 0) {
        totalPoints = toNumber(progress.totalXP)
        problemsCorrect = calculateTotalCorrect(
          progress.math || {},
          progress.reading || {}
        )
      }

      return { totalPoints, problemsCorrect, lastUpdated }
    }

    for (const progressDoc of progressSnapshot.docs) {
      const userId = progressDoc.id
      const progress = progressDoc.data()

      const metrics = calculateMetricsForPeriod(progress)

      if (metrics.totalPoints <= 0 && metrics.problemsCorrect <= 0) {
        continue
      }

      if (userId) {
        userDataMap.set(userId, {
          userId,
          displayName: 'Anonymous',
          photoURL: undefined,
          totalPoints: metrics.totalPoints,
          problemsCorrect: metrics.problemsCorrect,
          lastUpdated: metrics.lastUpdated || now,
        })
      }
    }

    apiLogger.debug(
      'leaderboard',
      'Aggregated users with basics progress data',
      { data: { count: userDataMap.size } }
    )

    if (userDataMap.size > 0) {
      const userIds = Array.from(userDataMap.keys())

      // Batch fetch user profiles efficiently
      const profileMap = await batchFetchUserProfiles(userIds)

      userIds.forEach((userId) => {
        const userData = profileMap.get(userId)
        if (!userData) return

        const aggregate = userDataMap.get(userId)
        if (!aggregate) return

        // Check if user has completed avatar setup (required for leaderboard)
        const avatar = userData.avatar
        if (!avatar || !avatar.isCompleted) {
          userDataMap.delete(userId) // Remove user if avatar not completed
          return
        }

        const userRegion = userData.region || userData.location || null

        // Apply region filter if specified
        if (regionFilter && userRegion !== regionFilter) {
          userDataMap.delete(userId) // Remove user if not in selected region
          return
        }

        // Use utility to format display info
        const displayInfo = formatUserDisplayInfo(userData, userId)
        aggregate.displayName = displayInfo.displayName
        aggregate.photoURL = displayInfo.photoURL
        if (displayInfo.characterId) {
          aggregate.characterId = displayInfo.characterId
        }

        // Store region for display
        if (userRegion) {
          aggregate.region = userRegion
        }
      })
    }

    // Convert to array and sort by points (descending), then by problems correct
    const userArray = Array.from(userDataMap.values())
    const sortedUsers = sortByPointsThenCorrect(
      userArray.map((user) => ({
        userId: user.userId,
        points: user.totalPoints,
        problemsCorrect: user.problemsCorrect,
        correctAnswers: user.problemsCorrect,
      }))
    )

    // Create a map for quick lookup after sorting
    const userMap = new Map(userArray.map((user) => [user.userId, user]))

    // Add ranks and convert to LeaderboardEntry format
    const entries: LeaderboardEntry[] = sortedUsers
      .slice(0, limit)
      .map((sortedUser, index) => {
        const entryUserId = sortedUser.userId!
        const user = userMap.get(entryUserId)!
        return {
          userId: entryUserId,
          displayName: user.displayName,
          photoURL: user.photoURL,
          characterId: user.characterId,
          totalPoints: user.totalPoints,
          problemsCorrect: user.problemsCorrect,
          rank: index + 1,
          isCurrentUser: entryUserId === currentUserId,
          region: user.region,
        }
      })

    // Find current user's rank if not in top entries
    let currentUserRank: number | undefined
    let currentUserEntry: LeaderboardEntry | undefined

    const currentUserIndex = sortedUsers.findIndex(
      (u) => u.userId === currentUserId
    )
    if (currentUserIndex !== -1) {
      currentUserRank = currentUserIndex + 1
      const currentUser = sortedUsers[currentUserIndex]
      const currentUserIdFromEntry = currentUser.userId
      if (currentUserIdFromEntry) {
        const currentUserData = userMap.get(currentUserIdFromEntry)
        if (currentUserData) {
          currentUserEntry = {
            userId: currentUserIdFromEntry,
            displayName: currentUserData.displayName,
            photoURL: currentUserData.photoURL,
            characterId: currentUserData.characterId,
            totalPoints: currentUserData.totalPoints,
            problemsCorrect: currentUserData.problemsCorrect,
            rank: currentUserRank,
            isCurrentUser: true,
            region: currentUserData.region,
          }
        }
      }
    }

    const response: GetLeaderboardResponse = {
      success: true,
      data: {
        entries,
        stats: {
          period,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalEntries: sortedUsers.length,
          currentUserRank,
          currentUserEntry,
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    return serverError(error, 'Failed to fetch leaderboard')
  }
}

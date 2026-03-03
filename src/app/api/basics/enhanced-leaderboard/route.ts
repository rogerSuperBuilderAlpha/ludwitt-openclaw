import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { calculateAccuracy, formatDisplayName, generateBadge, sortByPointsThenAccuracy } from '@/lib/utils/user-helpers'
import { apiLogger } from '@/lib/logger'
import { formatDateISO, getStartOfDay, getStartOfWeek, getStartOfMonth } from '@/lib/utils/date-helpers'
import { batchFetchUserProfiles } from '@/lib/utils/firestore-helpers'
import { aggregateEngagementData, formatLeaderboardEntry } from '@/lib/utils/leaderboard-helpers'
import { Collections } from '@/lib/basics/collections'
import { db } from '@/lib/firebase/admin'

/**
 * Enhanced Leaderboard API
 * Returns daily, weekly, and monthly leaderboards with user rankings
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Get current date boundaries
    const now = new Date()
    const startOfDay = getStartOfDay(now)
    const startOfWeek = getStartOfWeek(now)
    const startOfMonth = getStartOfMonth(now)

    // Get all engagement records for different periods
    // Note: The basicsEngagement collection has user documents with daily subcollections
    const allUsers = await db.collection(Collections.BASICS_ENGAGEMENT).get()
    apiLogger.debug('enhanced-leaderboard', 'Found users in basicsEngagement', { data: { count: allUsers.docs.length } })
    
    const [dailyData, weeklyData, monthlyData] = await Promise.all([
      // Daily leaderboard - aggregate from user daily subcollections
      Promise.all(allUsers.docs.map(async (userDoc) => {
        const todayStr = formatDateISO(startOfDay)
        const dailyDoc = await userDoc.ref.collection('daily').doc(todayStr).get()
        if (dailyDoc.exists) {
          return { userId: userDoc.id, ...dailyDoc.data() }
        }
        return null
      })).then(results => results.filter(Boolean)),
      
      // Weekly leaderboard
      Promise.all(allUsers.docs.map(async (userDoc) => {
        const weeklyDocs = await userDoc.ref.collection('daily')
          .where('createdAt', '>=', startOfWeek)
          .get()
        
        const aggregated = aggregateEngagementData(weeklyDocs.docs)
        return formatLeaderboardEntry(userDoc.id, {
          pointsEarned: aggregated.totalPoints,
          correctAnswers: aggregated.totalCorrect,
          problemsAttempted: aggregated.totalAttempted,
          currentStreak: aggregated.maxStreak
        })
      })).then(results => results.filter(Boolean)),
      
      // Monthly leaderboard
      Promise.all(allUsers.docs.map(async (userDoc) => {
        const monthlyDocs = await userDoc.ref.collection('daily')
          .where('createdAt', '>=', startOfMonth)
          .get()
        
        const aggregated = aggregateEngagementData(monthlyDocs.docs)
        return formatLeaderboardEntry(userDoc.id, {
          pointsEarned: aggregated.totalPoints,
          correctAnswers: aggregated.totalCorrect,
          problemsAttempted: aggregated.totalAttempted,
          currentStreak: aggregated.maxStreak
        })
      })).then(results => results.filter(Boolean))
    ])
    
    apiLogger.debug('enhanced-leaderboard', 'Data aggregated', {
      data: { daily: dailyData.length, weekly: weeklyData.length, monthly: monthlyData.length }
    })

    // Process leaderboard data - now working with the correct data structure
    interface UserDataEntry {
      userId?: string
      displayName?: string
      avatarUrl?: string
      pointsEarned?: number
      currentStreak?: number
      problemsAttempted?: number
      correctAnswers?: number
    }

    const processLeaderboard = async (userData: UserDataEntry[], period: string) => {
      apiLogger.debug('enhanced-leaderboard', `Processing users for ${period}`, { data: { count: userData.length } })
      
      // Sort by points and calculate accuracy
      const leaderboard = sortByPointsThenAccuracy(
        userData
          .filter(user => user.userId) // Filter out entries without userId
          .map(user => ({
            userId: user.userId!,
            points: user.pointsEarned || 0,
            streak: user.currentStreak || 0,
            problemsCount: user.problemsAttempted || 0,
            correctAnswers: user.correctAnswers || 0,
            accuracy: calculateAccuracy(user.correctAnswers || 0, user.problemsAttempted || 0)
          }))
      ).slice(0, 10)

      apiLogger.debug('enhanced-leaderboard', `Top users for ${period}`, {
        data: { topUsers: leaderboard.map(u => ({ userId: u.userId, points: u.points, accuracy: u.accuracy })) }
      })

      // Get user profiles for display names (batch fetch)
      const userIds = leaderboard.map(entry => entry.userId).filter((id): id is string => !!id)
      const profileMap = await batchFetchUserProfiles(userIds)

      // Add display names and ranks
      return leaderboard
        .filter(entry => entry.userId) // Ensure userId exists
        .map((entry, index) => {
          const profileData = profileMap.get(entry.userId!)
          
          return {
            userId: entry.userId!,
            displayName: formatDisplayName(profileData, entry.userId!),
            points: entry.points,
            rank: index + 1,
            streak: entry.streak,
            accuracy: entry.accuracy,
            badge: generateBadge(entry.streak, entry.accuracy ?? 0, entry.points)
          }
        })
    }

    const [daily, weekly, monthly] = await Promise.all([
      processLeaderboard(dailyData as UserDataEntry[], 'daily'),
      processLeaderboard(weeklyData as UserDataEntry[], 'weekly'),
      processLeaderboard(monthlyData as UserDataEntry[], 'monthly')
    ])

    apiLogger.debug('enhanced-leaderboard', 'Final leaderboards', {
      data: { daily: daily.length, weekly: weekly.length, monthly: monthly.length }
    })

    // Find user's rank in each period
    const userRank = {
      daily: daily.findIndex(entry => entry.userId === userId) + 1 || 999,
      weekly: weekly.findIndex(entry => entry.userId === userId) + 1 || 999,
      monthly: monthly.findIndex(entry => entry.userId === userId) + 1 || 999
    }

    apiLogger.debug('enhanced-leaderboard', 'User ranks', { data: { userId, ranks: userRank } })

    return successResponse({
      daily,
      weekly,
      monthly,
      userRank
    })

  } catch (error) {
    return serverError(error, 'Failed to load leaderboard')
  }
}

/**
 * GET /api/basics/spaced-repetition/schedule
 * 
 * Returns the user's review schedule for the next 7 days,
 * making upcoming reviews visible (addresses learning science feedback).
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { successResponse } from '@/lib/api/response-helpers'
import { serverError } from '@/lib/api/error-responses'
import { db } from '@/lib/firebase/admin'
import { 
  ReviewSchedule,
  DailyReviewSummary,
  Subject,
  MasteryLevel,
  ConceptReviewItem
} from '@/lib/types/spaced-repetition'

export const dynamic = 'force-dynamic'

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const now = new Date()
    const todayStr = formatDate(now)
    const weekFromNow = addDays(now, 7)

    // Get user's spaced repetition document
    const userSRDoc = await db
      .collection('spacedRepetition')
      .doc(userId)
      .get()

    const srData = userSRDoc.exists ? userSRDoc.data() : null

    // Get all concepts for the user (for stats)
    const allConceptsSnapshot = await db
      .collection('spacedRepetition')
      .doc(userId)
      .collection('concepts')
      .get()

    // Get concepts due in the next 7 days
    const upcomingSnapshot = await db
      .collection('spacedRepetition')
      .doc(userId)
      .collection('concepts')
      .where('nextReviewAt', '<=', weekFromNow)
      .orderBy('nextReviewAt', 'asc')
      .get()

    // Transform to ConceptReviewItem
    const allConcepts: ConceptReviewItem[] = allConceptsSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        userId,
        subject: data.subject as Subject,
        conceptId: data.conceptId,
        conceptName: data.conceptName,
        conceptDescription: data.conceptDescription,
        easeFactor: data.easeFactor,
        interval: data.interval,
        repetitions: data.repetitions,
        lastReviewedAt: data.lastReviewedAt?.toDate() || new Date(),
        nextReviewAt: data.nextReviewAt?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        totalAttempts: data.totalAttempts || 0,
        correctAttempts: data.correctAttempts || 0,
        averageResponseTime: data.averageResponseTime || 0,
        lastPerformanceScore: data.lastPerformanceScore || 0,
        masteryLevel: data.masteryLevel || 'new',
        consecutiveCorrect: data.consecutiveCorrect || 0,
        relatedProblemIds: data.relatedProblemIds || [],
        skillTags: data.skillTags || []
      }
    })

    const upcomingConcepts: ConceptReviewItem[] = upcomingSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        userId,
        subject: data.subject as Subject,
        conceptId: data.conceptId,
        conceptName: data.conceptName,
        conceptDescription: data.conceptDescription,
        easeFactor: data.easeFactor,
        interval: data.interval,
        repetitions: data.repetitions,
        lastReviewedAt: data.lastReviewedAt?.toDate() || new Date(),
        nextReviewAt: data.nextReviewAt?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        totalAttempts: data.totalAttempts || 0,
        correctAttempts: data.correctAttempts || 0,
        averageResponseTime: data.averageResponseTime || 0,
        lastPerformanceScore: data.lastPerformanceScore || 0,
        masteryLevel: data.masteryLevel || 'new',
        consecutiveCorrect: data.consecutiveCorrect || 0,
        relatedProblemIds: data.relatedProblemIds || [],
        skillTags: data.skillTags || []
      }
    })

    // Items due today or overdue
    const dueToday = upcomingConcepts.filter(
      item => formatDate(item.nextReviewAt) <= todayStr
    )
    const overdueCount = upcomingConcepts.filter(
      item => formatDate(item.nextReviewAt) < todayStr
    ).length

    // Build daily summaries for next 7 days
    const upcomingByDay: DailyReviewSummary[] = []
    for (let i = 0; i < 7; i++) {
      const dayDate = addDays(now, i)
      const dayStr = formatDate(dayDate)
      
      const dayItems = upcomingConcepts.filter(
        item => formatDate(item.nextReviewAt) === dayStr
      )

      const subjects: DailyReviewSummary['subjects'] = {}
      for (const item of dayItems) {
        if (!subjects[item.subject]) {
          subjects[item.subject] = { dueCount: 0, completedCount: 0 }
        }
        subjects[item.subject]!.dueCount++
      }

      upcomingByDay.push({
        date: dayStr,
        dueCount: dayItems.length,
        completedCount: 0, // Would need to track completed reviews
        subjects
      })
    }

    // Count concepts by mastery level
    const conceptsByMastery = {
      new: 0,
      learning: 0,
      reviewing: 0,
      mastered: 0
    }
    for (const concept of allConcepts) {
      const level = concept.masteryLevel as MasteryLevel
      if (conceptsByMastery[level] !== undefined) {
        conceptsByMastery[level]++
      }
    }

    // Calculate on-time review rate
    const totalReviews = (srData?.onTimeReviewCount || 0) + (srData?.lateReviewCount || 0)
    const onTimeReviewRate = totalReviews > 0 
      ? (srData?.onTimeReviewCount || 0) / totalReviews 
      : 1

    const schedule: ReviewSchedule = {
      userId,
      dueToday,
      overdueCount,
      upcomingByDay,
      totalConceptsTracked: allConcepts.length,
      conceptsByMastery,
      reviewStreak: srData?.reviewStreak || 0,
      lastReviewDate: srData?.lastReviewDate || null,
      longestStreak: srData?.longestStreak || 0,
      onTimeReviewRate,
      updatedAt: new Date()
    }

    return successResponse(schedule)
  } catch (error) {
    return serverError(error, 'Failed to fetch review schedule')
  }
}

/**
 * GET /api/basics/spaced-repetition/due
 * 
 * Returns concepts due for review today, making the spaced repetition
 * system visible to users (addressing learning science feedback).
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { successResponse } from '@/lib/api/response-helpers'
import { serverError } from '@/lib/api/error-responses'
import { db } from '@/lib/firebase/admin'
import { 
  ConceptReviewItem, 
  Subject,
  GetDueReviewsResponse 
} from '@/lib/types/spaced-repetition'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Get user's spaced repetition document
    const userSRDoc = await db
      .collection('spacedRepetition')
      .doc(userId)
      .get()

    // Get review streak info
    const srData = userSRDoc.exists ? userSRDoc.data() : null
    const reviewStreak = srData?.reviewStreak || 0

    // Get concepts due for review
    const now = new Date()
    const conceptsSnapshot = await db
      .collection('spacedRepetition')
      .doc(userId)
      .collection('concepts')
      .where('nextReviewAt', '<=', now)
      .orderBy('nextReviewAt', 'asc')
      .limit(50)
      .get()

    // Transform Firestore docs to ConceptReviewItem
    const dueItems: ConceptReviewItem[] = conceptsSnapshot.docs.map(doc => {
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

    // Count overdue items (due before today)
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const overdueCount = dueItems.filter(
      item => item.nextReviewAt < todayStart
    ).length

    // Group by subject
    const bySubject: { [key in Subject]?: { items: ConceptReviewItem[]; count: number } } = {}
    for (const item of dueItems) {
      if (!bySubject[item.subject]) {
        bySubject[item.subject] = { items: [], count: 0 }
      }
      bySubject[item.subject]!.items.push(item)
      bySubject[item.subject]!.count++
    }

    const response: GetDueReviewsResponse = {
      success: true,
      data: {
        dueToday: dueItems,
        overdueCount,
        totalDue: dueItems.length,
        bySubject,
        reviewStreak
      }
    }

    return successResponse(response.data)
  } catch (error) {
    return serverError(error, 'Failed to fetch due reviews')
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const learningPathId = request.nextUrl.searchParams.get('learningPathId')

    // Fetch user's courses
    let coursesQuery = db.collection('universityCourses').where('userId', '==', userId)
    if (learningPathId) {
      coursesQuery = coursesQuery.where('learningPathId', '==', learningPathId)
    }
    const coursesSnap = await coursesQuery.get()

    const completionTrends: { deliverableId: string; title: string; daysToComplete: number }[] = []
    const subjectScores: Record<string, { total: number; count: number }> = {}
    const activityDates = new Set<string>()
    let totalDeliverables = 0
    let approvedDeliverables = 0
    let totalScore = 0
    let scoreCount = 0

    for (const doc of coursesSnap.docs) {
      const course = doc.data()
      const deliverables = (course.deliverables || []) as Array<Record<string, unknown>>
      const subject = course.subject as string

      for (const d of deliverables) {
        totalDeliverables++
        if (d.status === 'approved') {
          approvedDeliverables++
          if (d.submittedAt && d.reviewedAt) {
            const submitted = new Date(d.submittedAt as string)
            const reviewed = new Date(d.reviewedAt as string)
            const days = Math.max(1, Math.round((reviewed.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24)))
            completionTrends.push({ deliverableId: d.id as string, title: d.title as string, daysToComplete: days })
          }
          if (d.submittedAt) {
            activityDates.add(new Date(d.submittedAt as string).toISOString().slice(0, 10))
          }
        }
        if (d.submittedAt) {
          activityDates.add(new Date(d.submittedAt as string).toISOString().slice(0, 10))
        }
      }

      // Compute subject scores from peer reviews
      const peerReviewsSnap = await db.collection('peerReviews')
        .where('courseId', '==', doc.id)
        .where('status', 'in', ['completed', 'endorsed'])
        .get()

      for (const pr of peerReviewsSnap.docs) {
        const prData = pr.data()
        if (prData.rubricScores) {
          const avg = (prData.rubricScores.clarity + prData.rubricScores.completeness + prData.rubricScores.technicalQuality) / 3
          if (!subjectScores[subject]) subjectScores[subject] = { total: 0, count: 0 }
          subjectScores[subject].total += avg
          subjectScores[subject].count++
          totalScore += avg
          scoreCount++
        }
      }
    }

    // Compute streak
    const sortedDates = [...activityDates].sort().reverse()
    let currentStreak = 0
    let longestStreak = 0
    if (sortedDates.length > 0) {
      let streak = 1
      const today = new Date().toISOString().slice(0, 10)
      if (sortedDates[0] === today || sortedDates[0] === new Date(Date.now() - 86400000).toISOString().slice(0, 10)) {
        currentStreak = 1
      }
      for (let i = 1; i < sortedDates.length; i++) {
        const prev = new Date(sortedDates[i - 1])
        const curr = new Date(sortedDates[i])
        const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
        if (diff === 1) {
          streak++
          if (i <= currentStreak + 1) currentStreak = streak
        } else {
          longestStreak = Math.max(longestStreak, streak)
          streak = 1
        }
      }
      longestStreak = Math.max(longestStreak, streak)
    }

    // Compute estimated completion
    let estimatedCompletionDate: string | undefined
    if (completionTrends.length > 0 && totalDeliverables > approvedDeliverables) {
      const avgDays = completionTrends.reduce((a, b) => a + b.daysToComplete, 0) / completionTrends.length
      const remaining = totalDeliverables - approvedDeliverables
      const estDate = new Date(Date.now() + remaining * avgDays * 86400000)
      estimatedCompletionDate = estDate.toISOString()
    }

    const subjectStrengths = Object.entries(subjectScores).map(([subject, { total, count }]) => ({
      subject,
      avgScore: Math.round((total / count) * 10) / 10,
      count,
    }))

    return successResponse({
      completionTrends: completionTrends.slice(-20),
      subjectStrengths,
      streakData: {
        currentStreak,
        longestStreak,
        lastActiveDate: sortedDates[0] || new Date().toISOString().slice(0, 10),
      },
      estimatedCompletionDate,
      totalDeliverables,
      approvedDeliverables,
      avgReviewScore: scoreCount > 0 ? Math.round((totalScore / scoreCount) * 10) / 10 : 0,
    })
  } catch (error) {
    return serverError(error, 'Failed to compute student analytics')
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'
import { adminDb } from '@/lib/firebase/admin'
import { getCurrentCompetition, submitEssay, checkSubmissionEligibility, getUserGradeLevel, validateWordCount } from '@/lib/basics/writing-competition-service'
import { SubmitEssayRequest, SubmitEssayResponse } from '@/lib/types/writing-competition'
import { awardXP } from '@/lib/basics/xp-service'

/**
 * Writing XP tiers based on word count.
 * Longer, more thoughtful essays earn more XP.
 */
function calculateWritingXP(wordCount: number): number {
  if (wordCount >= 500) return 50
  if (wordCount >= 350) return 35
  if (wordCount >= 200) return 20
  if (wordCount >= 100) return 10
  return 5
}

export async function POST(request: NextRequest) {
  apiLogger.routeCall('writing-competition/submit')
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult
    
    const body: SubmitEssayRequest = await request.json()
    const { competitionId, essay } = body
    
    if (!competitionId || !essay) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }
    
    const competition = await getCurrentCompetition()
    if (!competition || competition.id !== competitionId) {
      return NextResponse.json({ success: false, error: 'Competition not found or not active' }, { status: 404 })
    }
    
    const eligibility = await checkSubmissionEligibility(userId, competition, essay)
    if (!eligibility.canSubmit) {
      return NextResponse.json({ success: false, error: eligibility.reason }, { status: 400 })
    }
    
    if (!adminDb) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 })
    }
    
    const [userDoc, gradeLevel] = await Promise.all([
      adminDb.collection('users').doc(userId).get(),
      getUserGradeLevel(userId),
    ])
    
    const userData = userDoc.data()
    const displayName = userData?.displayName || userData?.avatar?.name || userData?.email?.split('@')[0] || 'Anonymous Student'
    
    const submission = await submitEssay(userId, displayName, gradeLevel, competitionId, essay.trim())
    const wordValidation = validateWordCount(essay)

    // Award writing XP based on word count
    const writingXPAmount = calculateWritingXP(wordValidation.count)
    await awardXP({
      userId,
      source: 'writing',
      baseXP: writingXPAmount,
      details: { score: wordValidation.count },
    })

    const response: SubmitEssayResponse = {
      success: true,
      data: { submission, aiFeedback: `Great job submitting your ${wordValidation.count}-word essay! You earned ${writingXPAmount} XP! Your submission has been recorded for the Grade ${gradeLevel} competition. Winners will be announced after Friday at 5pm EST.` },
    }
    
    return NextResponse.json(response)
  } catch (error) {
    apiLogger.apiError('writing-competition/submit', 'Failed to submit essay', { error })
    return NextResponse.json({ success: false, error: 'Failed to submit essay' }, { status: 500 })
  }
}


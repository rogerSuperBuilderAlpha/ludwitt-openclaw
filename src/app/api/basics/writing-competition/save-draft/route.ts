import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'
import { getCurrentCompetition, saveDraft, hasUserSubmitted, isBeforeDeadline, countWords } from '@/lib/basics/writing-competition-service'
import { SaveDraftRequest, SaveDraftResponse } from '@/lib/types/writing-competition'

export async function POST(request: NextRequest) {
  apiLogger.routeCall('writing-competition/save-draft')
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult
    
    const body: SaveDraftRequest = await request.json()
    const { competitionId, essay, typingTimeIncrement } = body
    
    if (!competitionId || essay === undefined) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }
    
    const competition = await getCurrentCompetition()
    if (!competition || competition.id !== competitionId) {
      return NextResponse.json({ success: false, error: 'Competition not found or not active' }, { status: 404 })
    }
    
    if (await hasUserSubmitted(userId, competitionId)) {
      return NextResponse.json({ success: false, error: 'You have already submitted for this competition' }, { status: 400 })
    }
    
    if (!isBeforeDeadline(competition)) {
      return NextResponse.json({ success: false, error: 'The submission deadline has passed' }, { status: 400 })
    }
    
    const draft = await saveDraft(userId, competitionId, essay, typingTimeIncrement || 0)
    
    const response: SaveDraftResponse = { success: true, data: { wordCount: countWords(essay), savedAt: draft.lastSavedAt } }
    return NextResponse.json(response)
  } catch (error) {
    apiLogger.apiError('writing-competition/save-draft', 'Failed to save draft', { error })
    return NextResponse.json({ success: false, error: 'Failed to save draft' }, { status: 500 })
  }
}


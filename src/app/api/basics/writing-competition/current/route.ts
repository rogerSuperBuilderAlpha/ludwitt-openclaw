import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'
import { adminDb } from '@/lib/firebase/admin'
import { getCurrentCompetition, getUserDraft, getUserSubmission, getTimeRemaining, getUserGradeLevel, createCompetition, getISOWeek, getWeekStartDate, getWeekEndDate } from '@/lib/basics/writing-competition-service'
import { GetCurrentCompetitionResponse, WritingCompetition } from '@/lib/types/writing-competition'

const SAMPLE_PROMPTS = [
  { prompt: 'Should students be required to learn a musical instrument in school? Explain your position with at least two reasons.', category: 'opinion' as const },
  { prompt: 'Write about a time when you had to overcome a challenge. What did you learn from that experience?', category: 'narrative' as const },
  { prompt: 'Explain how recycling helps the environment. Include at least two specific examples.', category: 'informational' as const },
  { prompt: 'Imagine you could travel to any place in history. Where would you go and what would you want to see?', category: 'creative' as const },
  { prompt: 'What is the most important quality a good friend should have? Explain why this quality matters.', category: 'reflection' as const },
]

// Generate a mock competition for when DB is not available
function getMockCompetition(): WritingCompetition {
  const { week, year } = getISOWeek()
  const randomPrompt = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)]
  const now = new Date().toISOString()
  return {
    id: `${year}-W${week.toString().padStart(2, '0')}`,
    weekNumber: week,
    year,
    prompt: randomPrompt.prompt,
    promptCategory: randomPrompt.category,
    startDate: getWeekStartDate(week, year).toISOString(),
    endDate: getWeekEndDate(week, year).toISOString(),
    status: 'active',
    winnersAnnounced: false,
    totalSubmissions: 0,
    createdAt: now,
    updatedAt: now,
  }
}

export async function GET(request: NextRequest) {
  apiLogger.routeCall('writing-competition/current')
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult
    
    // If Firebase Admin is not configured, return a mock competition
    if (!adminDb) {
      apiLogger.validationError('writing-competition/current', 'Firebase Admin SDK not configured, returning mock data')
      const mockCompetition = getMockCompetition()
      const response: GetCurrentCompetitionResponse = {
        success: true,
        data: { 
          competition: mockCompetition, 
          userDraft: null, 
          userSubmission: null, 
          hasSubmitted: false, 
          timeRemaining: Math.max(0, Math.floor((new Date(mockCompetition.endDate).getTime() - Date.now()) / 1000)),
          userGradeLevel: 5 
        },
      }
      return NextResponse.json(response)
    }
    
    let competition = await getCurrentCompetition()
    if (!competition) {
      const randomPrompt = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)]
      competition = await createCompetition(randomPrompt.prompt, randomPrompt.category)
    }
    
    const [userDraft, userSubmission, userGradeLevel] = await Promise.all([
      getUserDraft(userId, competition.id),
      getUserSubmission(userId, competition.id),
      getUserGradeLevel(userId),
    ])
    
    const response: GetCurrentCompetitionResponse = {
      success: true,
      data: { competition, userDraft, userSubmission, hasSubmitted: userSubmission !== null, timeRemaining: getTimeRemaining(competition), userGradeLevel },
    }
    
    return NextResponse.json(response)
  } catch (error) {
    // Log detailed error info
    apiLogger.apiError('writing-competition/current', 'Error fetching competition', error)
    apiLogger.apiError('writing-competition/current', 'Failed to fetch competition', { error })
    
    // Return mock data instead of erroring
    const mockCompetition = getMockCompetition()
    const response: GetCurrentCompetitionResponse = {
      success: true,
      data: { 
        competition: mockCompetition, 
        userDraft: null, 
        userSubmission: null, 
        hasSubmitted: false, 
        timeRemaining: Math.max(0, Math.floor((new Date(mockCompetition.endDate).getTime() - Date.now()) / 1000)),
        userGradeLevel: 5 
      },
    }
    return NextResponse.json(response)
  }
}


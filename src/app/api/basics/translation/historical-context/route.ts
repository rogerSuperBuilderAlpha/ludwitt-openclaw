import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { getTranslationExerciseById } from '@/lib/basics/localStore'
import { HistoricalContextResponse, ClassicalLanguage } from '@/lib/types/basics'
import { trackCreditsAfterCall } from '@/lib/credits'
import { checkBasicsBalance } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

// Initialize Anthropic client at module level (required for serverless)
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

/**
 * POST /api/basics/translation/historical-context
 * Generate AI historical/cultural context for a translation exercise
 * Costs 1 credit, earns 5-15 XP
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const body = await request.json()
    const { language, exerciseId, sourceText, grammarTopic, sourceAuthor } = body

    if (!language || !exerciseId || !sourceText) {
      return badRequestError('Missing required fields: language, exerciseId, sourceText')
    }

    // Try to get exercise from local store for additional context
    const exercise = getTranslationExerciseById(exerciseId)

    // Check if user has sufficient credits
    const balanceCheck = await checkBasicsBalance(authResult.userId)
    if (!balanceCheck.allowed) {
      return NextResponse.json({
        error: 'Insufficient credits',
        requiredCredits: 2,
        currentBalance: balanceCheck.currentBalance
      }, { status: 402 })
    }

    // Generate historical context using AI
    const contextResult = await generateHistoricalContext(
      language as ClassicalLanguage,
      sourceText,
      grammarTopic || exercise?.grammarTopic,
      sourceAuthor || exercise?.sourceAuthor,
      authResult.userId
    )

    return successResponse({
      ...contextResult
    })
  } catch (error) {
    apiLogger.apiError('translation/historical-context', 'Error generating historical context', error)
    return serverError(error, 'Failed to generate historical context')
  }
}

/**
 * Generate rich historical/cultural context for a classical text
 * Always charges credits based on actual token usage
 */
async function generateHistoricalContext(
  language: ClassicalLanguage,
  sourceText: string,
  grammarTopic?: string,
  sourceAuthor?: string,
  userId?: string
): Promise<HistoricalContextResponse> {
  const languageName = language === 'latin' ? 'Latin' : 'Ancient Greek'
  const culture = language === 'latin' ? 'Roman' : 'Greek'

  // If AI not available or no userId, return error (don't silently fail)
  if (!anthropic || !userId) {
    const errorReason = !anthropic 
      ? 'ANTHROPIC_API_KEY not configured on server' 
      : 'User not authenticated'
    apiLogger.apiError('translation/historical-context', `AI unavailable: ${errorReason}`)
    throw new Error(`AI unavailable: ${errorReason}`)
  }

  const prompt = `You are a passionate classics professor who makes ancient ${culture} culture come alive. Generate rich historical and cultural context for this ${languageName} text that will help a student appreciate its deeper meaning.

Source Text: "${sourceText}"
${grammarTopic ? `Grammar Topic: ${grammarTopic}` : ''}
${sourceAuthor ? `Source Author: ${sourceAuthor}` : ''}

Create 2-4 engaging educational sections from these categories:
1. CULTURAL CONTEXT - How ancient ${culture}s would have understood this
2. WORD ORIGINS - Fascinating etymology and English derivatives
3. LITERARY CONNECTIONS - Famous uses in poetry, philosophy, or speeches
4. GRAMMATICAL HERITAGE - How these structures influenced modern languages
5. HISTORICAL ANECDOTES - Interesting stories about these words or concepts

Guidelines:
- Make it feel like discovering hidden treasures
- Connect to things students recognize (English words, famous quotes)
- Keep each section 2-4 sentences for readability
- Use the original ${languageName} words with translations
- Be enthusiastic and educational, not dry

Rate the depth of your response:
- "basic" = 1-2 simple sections (worth 5 XP)
- "good" = 2-3 detailed sections (worth 8-10 XP)
- "rich" = 3-4 sections with literary/philosophical depth (worth 12-15 XP)

Return ONLY a JSON object:
{
  "sections": [
    {
      "emoji": "<relevant emoji>",
      "title": "<CAPS TITLE>",
      "content": "<2-4 sentences of engaging content>"
    }
  ],
  "depthLevel": "<basic|good|rich>",
  "xpEarned": <5-15 based on depth>
}`

  try {
    // Get user's preferred model for explanation tasks
    const model = await getModelForTask(userId, 'explanation')
    const taskConfig = getTaskConfig('explanation')
    
    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }]
    })

    // Track credits for the AI call based on actual token usage
    const trackResult = await trackCreditsAfterCall(
      userId!,
      'historical-context',
      model,
      response.usage
    )
    const costCharged = trackResult.costCharged

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    let jsonText = content.text.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    const result = JSON.parse(jsonText)

    return {
      exerciseId: 'ai-generated',
      language,
      sourceText,
      sections: result.sections,
      xpEarned: result.xpEarned || 10,
      depthLevel: result.depthLevel || 'good',
      creditUsed: costCharged
    }
  } catch (error) {
    apiLogger.apiError('translation/historical-context', 'API error', error)
    // Re-throw to let caller handle it properly
    throw error
  }
}

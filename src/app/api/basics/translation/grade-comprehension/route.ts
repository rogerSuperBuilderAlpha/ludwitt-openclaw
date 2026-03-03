import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { trackCreditsAfterCall } from '@/lib/credits'
import { checkBasicsBalance } from '@/lib/credits'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

// Initialize Anthropic client at module level (required for serverless)
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

interface HistoricalSection {
  emoji: string
  title: string
  content: string
}

interface ComprehensionResult {
  questionId: number
  correct: boolean
  feedback: string
  xpAwarded: number
}

/**
 * POST /api/basics/translation/grade-comprehension
 * AI-grade comprehension answers about historical context
 * Costs 1 credit, awards 3-5 XP per correct answer (9-15 XP total potential)
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const rateLimitResult = await checkRateLimit('ai', authResult.userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    const body = await request.json()
    const { language, exerciseId, sourceText, historicalSections, questions, answers } = body

    if (!language || !exerciseId || !questions || !answers) {
      return badRequestError('Missing required fields: language, exerciseId, questions, answers')
    }

    if (!Array.isArray(questions) || !Array.isArray(answers) || questions.length !== answers.length) {
      return badRequestError('Questions and answers must be arrays of equal length')
    }

    // Check if user has sufficient credits
    const balanceCheck = await checkBasicsBalance(authResult.userId)
    if (!balanceCheck.allowed) {
      return NextResponse.json({
        error: 'Insufficient credits',
        requiredCredits: 1,
        currentBalance: balanceCheck.currentBalance
      }, { status: 402 })
    }

    // Grade using AI
    const gradingResult = await gradeComprehensionAnswers(
      language,
      sourceText,
      historicalSections,
      questions,
      answers,
      authResult.userId
    )

    return successResponse({
      ...gradingResult
    })
  } catch (error) {
    apiLogger.apiError('translation/grade-comprehension', 'Error grading comprehension', error)
    return serverError(error, 'Failed to grade comprehension answers')
  }
}

/**
 * Grade comprehension answers using AI
 */
async function gradeComprehensionAnswers(
  language: string,
  sourceText: string,
  historicalSections: HistoricalSection[],
  questions: string[],
  answers: string[],
  userId: string
): Promise<{ results: ComprehensionResult[]; totalXP: number; creditUsed: number }> {
  
  const languageName = language === 'latin' ? 'Latin' : 'Ancient Greek'

  // Error if AI not available - don't silently fail
  if (!anthropic) {
    apiLogger.apiError('translation/grade-comprehension', 'ANTHROPIC_API_KEY not configured')
    throw new Error('AI unavailable: ANTHROPIC_API_KEY not configured on server')
  }

  const sectionsText = historicalSections
    .map((s, i) => `Section ${i + 1} (${s.title}): ${s.content}`)
    .join('\n\n')

  const qaText = questions
    .map((q, i) => `Question ${i + 1}: ${q}\nStudent's Answer: ${answers[i] || '(no answer)'}`)
    .join('\n\n')

  const prompt = `You are grading a student's comprehension of historical context about a ${languageName} text.

Original Text: "${sourceText}"

Historical Context Sections:
${sectionsText}

Student's Q&A:
${qaText}

Grade each answer on:
1. Does it demonstrate understanding of the content?
2. Does it show engagement with the material?
3. Is it relevant to the question asked?

Be encouraging but fair. Award partial credit for effort.

Return ONLY a JSON object:
{
  "results": [
    {
      "questionId": 1,
      "correct": true/false,
      "feedback": "Brief encouraging feedback (1-2 sentences)",
      "xpAwarded": 3-5 (5 for excellent, 4 for good, 3 for partial, 1-2 for minimal)
    }
  ]
}`

  try {
    const model = await getModelForTask(userId, 'grading')
    const taskConfig = getTaskConfig('grading')
    
    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }]
    })

    // Track credits
    const { costCharged } = await trackCreditsAfterCall(
      userId,
      'comprehension-grading',
      model,
      response.usage
    )

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
    const results: ComprehensionResult[] = result.results || []
    
    // Ensure we have results for all questions
    while (results.length < questions.length) {
      results.push({
        questionId: results.length + 1,
        correct: false,
        feedback: 'Keep exploring the historical context!',
        xpAwarded: 1
      })
    }

    const totalXP = results.reduce((sum, r) => sum + (r.xpAwarded || 0), 0)

    return {
      results,
      totalXP,
      creditUsed: costCharged
    }
  } catch (error) {
    apiLogger.apiError('translation/grade-comprehension', 'API error', error)
    throw error
  }
}

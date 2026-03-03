/**
 * API Route: POST /api/basics/check-review-answer
 *
 * Uses AI to check if a user's answer to a review problem is semantically correct.
 * Handles formatting variations like x^2 vs x², fractions, etc.
 * This is a lightweight check designed for spaced repetition reviews.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError, serviceUnavailableError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import Anthropic from '@anthropic-ai/sdk'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'
import { triggerMoatUpdates } from '@/lib/basics/moat-systems-integration'
import { checkBasicsBalance, trackCreditsAfterCall } from '@/lib/credits'

// Initialize Anthropic client
const anthropic = process.env.ANTHROPIC_API_KEY 
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

interface CheckReviewAnswerRequest {
  question: string
  userAnswer: string
  correctAnswer: string
  topic?: string
}

export async function POST(request: NextRequest) {
  try {
    apiLogger.routeCall('Check Review Answer')
    
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Check AI availability
    if (!anthropic) {
      // Fall back to basic string comparison if AI not available
      apiLogger.debug('Check Review Answer', 'AI not available, using fallback')
      return successResponse({ isCorrect: false, feedback: null, creditsUsed: 0 })
    }

    // Check credits before making AI call
    const balanceCheck = await checkBasicsBalance(userId)
    if (!balanceCheck.allowed) {
      return NextResponse.json({
        error: 'Insufficient credits',
        available: balanceCheck.currentBalance,
        shortfall: balanceCheck.shortfall
      }, { status: 402 })
    }

    // Parse request body
    const body = await request.json() as CheckReviewAnswerRequest
    const { question, userAnswer, correctAnswer, topic } = body

    if (!question || !userAnswer || !correctAnswer) {
      return badRequestError('Missing required fields: question, userAnswer, correctAnswer')
    }

    // Build a focused prompt for semantic equivalence checking
    const prompt = `You are checking if a student's answer is mathematically equivalent to the correct answer.

Question: ${question}
${topic ? `Topic: ${topic}` : ''}

Correct Answer: ${correctAnswer}
Student's Answer: ${userAnswer}

Determine if the student's answer is CORRECT. Be lenient with formatting:
- "x^2" and "x²" are the same
- "1/2" and "0.5" are the same
- "sqrt(4)" and "2" are the same
- Minor spacing/capitalization differences should be ignored
- Different but mathematically equivalent forms should be accepted

Respond with ONLY a JSON object (no markdown, no explanation):
{
  "isCorrect": true/false,
  "feedback": "Brief one-sentence feedback if incorrect, explaining why or null if correct"
}`

    // Get user's preferred model for grading tasks (default: Haiku for quick checks)
    const model = await getModelForTask(userId, 'grading')
    const taskConfig = getTaskConfig('grading')
    
    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }]
    })

    // Parse response
    const responseText = response.content[0].type === 'text' ? response.content[0].text : ''
    
    try {
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      
      const result = JSON.parse(jsonMatch[0])
      
      // Track credits based on actual token usage
      const { costCharged } = await trackCreditsAfterCall(
        userId,
        'check-review-answer',
        model,
        response.usage
      )
      
      // Trigger technical moat systems (fire and forget - doesn't block response)
      triggerMoatUpdates({
        userId,
        problemId: `review_${question.substring(0, 20).replace(/\W+/g, '_')}`,
        subject: 'math',
        problemType: topic || 'review',
        problemText: question,
        difficulty: 1,
        userAnswer,
        correctAnswer,
        isCorrect: Boolean(result.isCorrect),
        timeSpentMs: 30000, // Estimate for reviews
        skills: [],
        explanation: undefined
      })
      
      return successResponse({
        isCorrect: Boolean(result.isCorrect),
        feedback: result.feedback || null,
        creditsUsed: costCharged
      })
    } catch (parseError) {
      apiLogger.apiError('Check Review Answer', 'Failed to parse AI response', parseError)
      // Default to incorrect if parsing fails
      return successResponse({ isCorrect: false, feedback: null, creditsUsed: 0 })
    }
  } catch (error) {
    apiLogger.apiError('Check Review Answer', 'Error checking answer', error)
    // Return graceful fallback instead of error to not block the UI
    return successResponse({ isCorrect: false, feedback: null })
  }
}


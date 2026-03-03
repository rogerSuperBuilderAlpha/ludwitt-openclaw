import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateRequiredFields, validatePositiveNumber, validateRange } from '@/lib/api/validators'
import { apiLogger } from '@/lib/logger'
import { generateMathProblemWithUsage, GenerationUsage } from '@/lib/basics/generation'
import { checkBasicsBalance, trackCreditsAfterCall } from '@/lib/credits'

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Check credits before generating
    const balanceCheck = await checkBasicsBalance(userId)
    if (!balanceCheck.allowed) {
      return NextResponse.json({
        error: 'Insufficient credits',
        available: balanceCheck.currentBalance,
        shortfall: balanceCheck.shortfall
      }, { status: 402 })
    }

    const body = await request.json()
    const { skillId, difficulty, count = 10, topic } = body

    // Validate required fields
    const requiredFieldsError = validateRequiredFields(body, ['skillId', 'difficulty'])
    if (requiredFieldsError) return requiredFieldsError
    
    // Validate numeric fields
    const difficultyError = validateRange(difficulty, 1, 12, 'difficulty')
    if (difficultyError) return difficultyError
    
    const countError = validateRange(count, 1, 50, 'count')
    if (countError) return countError

    // Generate problems in parallel (up to 10 at a time to avoid overwhelming the API)
    const batchSize = 10
    const problems: Array<{
      id: string
      question: string
      correctAnswer: string
      explanation: string
      hint?: string
    }> = []
    
    // Track total usage for credit charging
    let totalInputTokens = 0
    let totalOutputTokens = 0
    let lastModel = ''
    
    for (let i = 0; i < count; i += batchSize) {
      const batch = Array.from({ length: Math.min(batchSize, count - i) }, (_, idx) => i + idx)
      
      const batchResults = await Promise.allSettled(
        batch.map(() => generateMathProblemWithUsage(difficulty, []))
      )
      
      batchResults.forEach((result, idx) => {
        if (result.status === 'fulfilled') {
          const { result: problem, usage } = result.value
          problems.push({
            id: problem.id,
            question: problem.question,
            correctAnswer: problem.correctAnswer,
            explanation: problem.explanation,
            hint: problem.hint
          })
          // Accumulate usage for credit tracking
          totalInputTokens += usage.input_tokens
          totalOutputTokens += usage.output_tokens
          lastModel = usage.model
        } else {
          apiLogger.apiError('generate-skill-challenge', `Failed to generate problem ${batch[idx] + 1}`, result.reason)
        }
      })
    }

    // Track credits for all generated problems
    let creditsUsed = 0
    if (problems.length > 0 && lastModel) {
      const { costCharged } = await trackCreditsAfterCall(
        userId,
        'generate-skill-challenge',
        lastModel,
        { input_tokens: totalInputTokens, output_tokens: totalOutputTokens }
      )
      creditsUsed = costCharged
    }

    // If we couldn't generate enough problems, return what we have
    if (problems.length === 0) {
      return serverError(new Error('Failed to generate problems'), 'Failed to generate problems')
    }

    return successResponse({ problems, creditsUsed })

  } catch (error) {
    return serverError(error, 'Failed to generate challenge')
  }
}


/**
 * API Route: POST /api/basics/ai-grade
 * Thin HTTP handler -- business logic lives in grading-service.ts.
 */
import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, serviceUnavailableError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { getAnthropicClient } from '@/lib/ai/providers/anthropic-client'
import {
  type GradeRequest,
  validateGradeRequest,
  sanitizeGradeRequest,
  buildGradingPrompt,
  checkCredits,
  callGradingAI,
  mapAnthropicError,
  parseGradeResult,
  assembleGradeResponse,
  fireMoatUpdates,
} from '@/lib/basics/grading-service'

const anthropic = getAnthropicClient()

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    apiLogger.routeCall('AI Grade')

    // Authenticate
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    // Rate limit (20 AI requests / min / user)
    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) return rateLimitedResponse(rateLimitResult)

    // AI availability
    if (!anthropic) return serviceUnavailableError('AI service not available')

    // Parse & validate
    const rawBody = (await request.json()) as GradeRequest
    const validationError = validateGradeRequest(rawBody)
    if (validationError) return badRequestError(validationError)

    // Credits pre-check
    const creditError = await checkCredits(userId)
    if (creditError) return creditError

    // Sanitize, build prompt, call AI
    const body = sanitizeGradeRequest(rawBody)
    const prompt = buildGradingPrompt(body)

    apiLogger.debug('ai-grade', 'Processing request', {
      data: { subject: body.subject, questionLength: body.question.text.length, difficulty: body.question.difficulty, userId },
    })

    let aiResult
    try {
      aiResult = await callGradingAI(userId, prompt)
    } catch (anthropicError: unknown) {
      apiLogger.apiError('ai-grade', 'Anthropic API Error (after fallback attempts)', anthropicError as Error)
      const friendlyMsg = mapAnthropicError(anthropicError)
      if (friendlyMsg) return serverError(anthropicError, friendlyMsg)
      throw anthropicError
    }

    if (aiResult instanceof NextResponse) return aiResult

    // Parse, assemble, respond
    const gradeResult = parseGradeResult(aiResult.content.text)
    const response = assembleGradeResponse(gradeResult, body, aiResult.costCharged)

    apiLogger.success('AI Grade', 'Grading complete', {
      subject: body.subject, isCorrect: response.isCorrect, score: response.score,
      grade: response.grade, xpEarned: response.xpEarned, creditsUsed: response.creditsUsed,
    })

    fireMoatUpdates(userId, body, response)

    return successResponse(response)
  } catch (error) {
    apiLogger.apiError('ai-grade', 'Failed to grade', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return serverError(error, `AI grading failed: ${errorMessage}`)
  }
}

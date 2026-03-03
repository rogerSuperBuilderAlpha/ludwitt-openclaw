import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, serviceUnavailableError } from '@/lib/api/error-responses'
import { validateRequiredFields, validateSubject } from '@/lib/api/validators'
import { buildAlternateExplanationPrompt } from '@/lib/basics/prompt-builders'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import { withCreditTracking } from '@/lib/credits'
import Anthropic from '@anthropic-ai/sdk'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
}) : null

/**
 * Generate an alternate explanation for a problem using AI
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Check if AI is available
    if (!isAIGenerationAvailable() || !anthropic) {
      return serviceUnavailableError('AI explanation service not available')
    }

    const body = await request.json()
    const { subject, question, correctAnswer, originalExplanation, difficulty } = body

    // Validate required fields
    const requiredFieldsError = validateRequiredFields(body, ['subject', 'question', 'correctAnswer', 'originalExplanation'])
    if (requiredFieldsError) return requiredFieldsError
    
    // Validate subject
    const subjectError = validateSubject(subject)
    if (subjectError) return subjectError

    // Build prompt using centralized prompt builder
    const prompt = buildAlternateExplanationPrompt({
      subject,
      problemText: question,
      correctAnswer,
      originalExplanation,
      difficulty
    })

    // Get user's preferred model for explanation tasks
    const model = await getModelForTask(userId, 'explanation')
    const taskConfig = getTaskConfig('explanation')

    // Execute AI call with credit tracking
    const result = await withCreditTracking(userId, 'alternate-explanation', async () => {
      const response = await anthropic!.messages.create({
        model,
        max_tokens: taskConfig.defaultMaxTokens,
        temperature: taskConfig.defaultTemperature,
        messages: [{ role: 'user', content: prompt }]
      })

      return {
        response,
        usage: response.usage,
        model,
      }
    })

    // Check if credit tracking returned an error response
    if (result instanceof NextResponse) {
      return result
    }

    const content = result.result.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    return NextResponse.json({
      success: true,
      explanation: content.text.trim(),
      message: 'Alternate explanation generated',
      costCharged: result.costCharged,
      newBalance: result.newBalance,
    })

  } catch (error) {
    return serverError(error, 'Failed to generate explanation')
  }
}

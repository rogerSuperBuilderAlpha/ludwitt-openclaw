/**
 * AI Lesson Generator
 * 
 * Generates personalized mini-lessons for logic (and other subjects)
 * Costs credits to use.
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { checkBasicsBalance, trackCreditsAfterCall } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'
import { sanitizePromptInput } from '@/lib/sanitize'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Rate limit check
    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    const body = await request.json()
    const { 
      subject, 
      topic, 
      subTopic, 
      unitName, 
      question, 
      description, 
      difficulty,
      symbols 
    } = body

    if (!subject || !topic) {
      return badRequestError('Missing subject or topic')
    }

    // Sanitize user-provided text before prompt insertion
    const sanitizedTopic = sanitizePromptInput(topic)
    const sanitizedSubTopic = subTopic ? sanitizePromptInput(subTopic) : subTopic
    const sanitizedQuestion = question ? sanitizePromptInput(question) : question
    const sanitizedDescription = description ? sanitizePromptInput(description) : description

    // Check credits
    const creditCheck = await checkBasicsBalance(userId)
    if (!creditCheck.allowed) {
      return NextResponse.json({
        error: 'Insufficient credits',
        available: creditCheck.currentBalance,
        shortfall: creditCheck.shortfall
      }, { status: 402 })
    }

    if (!anthropic) {
      return NextResponse.json({
        error: 'AI service unavailable',
        lesson: null
      }, { status: 503 })
    }

    // Build the prompt based on subject
    let prompt = ''
    
    if (subject === 'logic') {
      prompt = `You are an expert symbolic logic tutor. Generate a concise, helpful mini-lesson to help a student understand the following logic topic.

Topic: ${sanitizedTopic}
${sanitizedSubTopic ? `Sub-topic: ${sanitizedSubTopic}` : ''}
${unitName ? `Unit: ${unitName}` : ''}
${difficulty ? `Difficulty: ${difficulty}/10` : ''}

${sanitizedQuestion ? `The student is working on this specific problem:\n"${sanitizedQuestion}"` : ''}
${sanitizedDescription ? `Problem context: ${sanitizedDescription}` : ''}
${symbols && symbols.length > 0 ? `Relevant symbols: ${symbols.join(', ')}` : ''}

Generate a focused mini-lesson (200-400 words) that:
1. Explains the core concept clearly with examples
2. Shows the key rules or patterns to recognize
3. Provides a step-by-step approach for solving this type of problem
4. Includes 1-2 worked examples if helpful
5. Mentions common mistakes to avoid

Use proper logical notation where appropriate (∧, ∨, →, ↔, ¬, ∀, ∃, etc.).
Be clear, direct, and educational. This is a teaching moment, not just a hint.`
    } else if (subject === 'math') {
      prompt = `You are an expert math tutor. Generate a concise, helpful mini-lesson for the following topic.

Topic: ${sanitizedTopic}
${sanitizedSubTopic ? `Sub-topic: ${sanitizedSubTopic}` : ''}
${difficulty ? `Difficulty: ${difficulty}/10` : ''}

${sanitizedQuestion ? `The student is working on: "${sanitizedQuestion}"` : ''}
${sanitizedDescription ? `Context: ${sanitizedDescription}` : ''}

Generate a focused mini-lesson (200-400 words) that:
1. Explains the core concept with clarity
2. Shows the key formulas or methods
3. Provides step-by-step problem-solving approach
4. Includes a worked example
5. Points out common mistakes

Be educational and thorough.`
    } else {
      prompt = `You are an expert tutor. Generate a mini-lesson for: ${sanitizedTopic}
${sanitizedSubTopic ? `Sub-topic: ${sanitizedSubTopic}` : ''}
${sanitizedQuestion ? `Current question: "${sanitizedQuestion}"` : ''}

Provide a clear, educational explanation (200-400 words) that helps the student understand and solve this type of problem.`
    }

    // Get user's preferred model for explanation tasks
    const model = await getModelForTask(userId, 'explanation')
    const taskConfig = getTaskConfig('explanation')

    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }]
    })

    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from AI')
    }

    // Track credits based on actual token usage
    const { costCharged } = await trackCreditsAfterCall(
      userId,
      'ai-lesson',
      model,
      response.usage
    )

    return successResponse({ 
      lesson: textContent.text,
      creditsUsed: costCharged
    })
  } catch (error) {
    apiLogger.apiError('ai-lesson', 'Failed to generate lesson', error)
    return serverError(error, 'Failed to generate lesson')
  }
}





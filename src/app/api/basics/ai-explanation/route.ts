import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serviceUnavailableError } from '@/lib/api/error-responses'
import { buildExplanationPrompt } from '@/lib/basics/prompt-builders'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import Anthropic from '@anthropic-ai/sdk'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import { trackCreditsAfterCall, checkBasicsBalance, insufficientBasicsCreditsError } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { sanitizePromptInput } from '@/lib/sanitize'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()

  try {
    apiLogger.routeCall('AI Explanation')
    
    // Use auth middleware helper but handle streaming response
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      apiLogger.authFailure('AI Explanation', 'Auth failed')
      return new Response(authResult.body, {
        status: authResult.status,
        headers: authResult.headers
      })
    }
    const { userId } = authResult
    apiLogger.authSuccess('AI Explanation', userId)

    // Rate limit check
    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    const { problemId, problemText, subject, difficulty, currentAnswer, progressReport, whatTried, understandingLevel } = await request.json()

    if (!problemText || !subject) {
      apiLogger.validationError('AI Explanation', 'Missing required fields', { problemText, subject })
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      })
    }

    // Check for cached AI response (free replay)
    if (problemId && db) {
      const helpHistoryRef = db
        .collection('users')
        .doc(userId)
        .collection('helpHistory')
        .doc(problemId)
      
      const cached = await helpHistoryRef.get()
      if (cached.exists) {
        const data = cached.data()
        if (data?.aiTutorUsed && data?.aiTutorResponse) {
          apiLogger.routeCall('AI Explanation', 'Returning cached response')
          
          // Return cached response (simulated stream for consistency)
          const words = data.aiTutorResponse.split(' ')
          const stream = new ReadableStream({
            async start(controller) {
              try {
                // No cost for cached response
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                  costCharged: 0, 
                  cached: true
                })}\n\n`))

                for (let i = 0; i < words.length; i++) {
                  const chunk = sanitizeToPlainText(words[i] + (i < words.length - 1 ? ' ' : ''))
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`))
                  await new Promise(resolve => setTimeout(resolve, 15))
                }

                controller.enqueue(encoder.encode('data: {"done": true, "cached": true}\n\n'))
                controller.close()
              } catch (error) {
                controller.enqueue(encoder.encode(`data: {"error": "Failed to stream cached response"}\n\n`))
                controller.close()
              }
            }
          })

          return new Response(stream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          })
        }
      }
    }

    // Validate progress report fields for math
    if (subject === 'math' && (!progressReport || !whatTried)) {
      apiLogger.validationError('AI Explanation', 'Missing progress report for math')
      return new Response(JSON.stringify({ error: 'Progress report required for math AI tutor' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      })
    }

    if (!isAIGenerationAvailable() || !anthropic) {
      apiLogger.apiError('AI Explanation', 'Anthropic client not available')
      return new Response(
        JSON.stringify({ error: 'AI explanation service not available' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!db) {
      apiLogger.apiError('AI Explanation', 'Firebase Admin not configured')
      return new Response(
        JSON.stringify({ error: 'Database service not available' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check if user has sufficient credits (using Basics $1 limit)
    const balanceCheck = await checkBasicsBalance(userId)
    if (!balanceCheck.allowed) {
      apiLogger.apiError('AI Explanation', 'Insufficient credits (Basics $1 limit)', {
        userId,
        currentBalance: balanceCheck.currentBalance,
      })
      const errorResponse = insufficientBasicsCreditsError(balanceCheck.currentBalance, balanceCheck.minimumBalance)
      return new Response(JSON.stringify(await errorResponse.json()), {
        status: 402,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Sanitize user-provided text before prompt insertion
    const sanitizedCurrentAnswer = currentAnswer ? sanitizePromptInput(currentAnswer) : currentAnswer
    const sanitizedProgressReport = progressReport ? sanitizePromptInput(progressReport) : progressReport
    const sanitizedWhatTried = whatTried ? sanitizePromptInput(whatTried) : whatTried

    // Build the prompt using centralized prompt builder
    const prompt = buildExplanationPrompt({
      subject,
      problemText,
      difficulty,
      currentAnswer: sanitizedCurrentAnswer,
      progressReport: sanitizedProgressReport,
      whatTried: sanitizedWhatTried,
      understandingLevel
    })

    // Get user's preferred model for explanations
    const model = await getModelForTask(userId, 'explanation')
    const taskConfig = getTaskConfig('explanation')

    // Make a non-streaming call to get accurate token counts for billing
    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      temperature: taskConfig.defaultTemperature,
      messages: [{ role: 'user', content: prompt }]
    })

    // Track credits based on actual usage
    const { costCharged, newBalance } = await trackCreditsAfterCall(
      userId,
      'ai-explanation',
      model,
      response.usage
    )

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Stream the response to the client (simulated streaming for better UX)
    const explanationText = content.text
    const words = explanationText.split(' ')

    // Save AI response to help history (for free replay)
    if (problemId && db) {
      try {
        const helpHistoryRef = db
          .collection('users')
          .doc(userId)
          .collection('helpHistory')
          .doc(problemId)
        
        await helpHistoryRef.set({
          problemId,
          aiTutorUsed: true,
          aiTutorUsedAt: new Date(),
          aiTutorResponse: explanationText,
          xpSpentOnAI: costCharged
        }, { merge: true })
      } catch (saveError) {
        apiLogger.apiError('AI Explanation', 'Failed to cache AI response', saveError)
        // Continue anyway - caching is not critical
      }
    }
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // First, send the cost and usage information
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            costCharged, 
            newBalance,
            usage: {
              inputTokens: response.usage.input_tokens,
              outputTokens: response.usage.output_tokens,
              totalTokens: response.usage.input_tokens + response.usage.output_tokens
            }
          })}\n\n`))

          // Stream words for better UX
          for (let i = 0; i < words.length; i++) {
            const chunk = sanitizeToPlainText(words[i] + (i < words.length - 1 ? ' ' : ''))
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`))
            // Small delay for streaming effect
            await new Promise(resolve => setTimeout(resolve, 20))
          }

          controller.enqueue(encoder.encode('data: {"done": true}\n\n'))
          controller.close()
        } catch (error) {
          apiLogger.apiError('AI Explanation', 'Stream error', error)
          const errorMessage = (error instanceof Error ? error.message : 'Unknown error')
            .replace(/"/g, '\\"')
            .replace(/\n/g, ' ')
          controller.enqueue(encoder.encode(`data: {"error": "${errorMessage}"}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    apiLogger.apiError('AI Explanation', 'Failed to generate explanation', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate explanation' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

function sanitizeToPlainText(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .replace(/`/g, '')
    .replace(/\r/g, '')
}

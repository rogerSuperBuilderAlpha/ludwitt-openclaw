/**
 * Independent Study Discovery Chat API
 * 
 * POST - Send a message in the discovery phase
 * 
 * The AI conducts an adaptive conversation to understand:
 * - What topic the user wants to explore
 * - Their current knowledge level
 * - Their learning goals
 * - What kind of project they might want to build
 * 
 * When the AI has enough information, it signals readiness to generate curriculum.
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { checkCreditsBeforeCall, trackCreditsAfterCall } from '@/lib/credits'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import type { DiscoveryMessage, DiscoveryState } from '@/lib/types/independent-study'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const MODEL = 'claude-sonnet-4-20250514'
const ENDPOINT = '/api/basics/independent-study/discovery'

const DISCOVERY_SYSTEM_PROMPT = `You are an educational advisor helping a student design their Independent Study curriculum. The student has already mastered K-12 Math, Reading, and formal Logic, so they have a strong foundation.

Your role is to have a natural conversation to understand:
1. What topic or subject they want to explore
2. Their current knowledge level in this area
3. Their specific interests within the topic
4. What they hope to achieve (career, curiosity, creative project)
5. What kind of real-world project they might want to build

Guidelines:
- Ask ONE focused question at a time
- Be conversational and encouraging
- Build on their previous answers
- Help them refine vague ideas into specific learning paths
- Connect their interests to potential project ideas

IMPORTANT - When you believe you have enough information to design a comprehensive curriculum, include this EXACT marker at the END of your message:

<ready_to_generate>
Topic: [Clear statement of the subject]
Focus: [Specific area within the topic]
Level: [Beginner/Intermediate/Advanced]
Goal: [What they want to achieve]
Project Idea: [Potential final project]
</ready_to_generate>

Only include this marker when you have a clear understanding of all 5 elements. If the student's initial message is very detailed and clear, you may include the marker after just 1-2 exchanges. For vague topics, you may need 3-5 exchanges.

Do NOT include the marker if you still have important clarifying questions.`

export async function POST(request: NextRequest): Promise<Response> {
  const encoder = new TextEncoder()

  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return new Response(authResult.body, {
        status: authResult.status,
        headers: authResult.headers
      })
    }
    const { userId } = authResult

    // Rate limit check
    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) {
      return new Response(JSON.stringify(rateLimitedResponse(rateLimitResult)), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const body = await request.json()
    const { studyId, message, isInitial } = body

    if (!studyId || typeof studyId !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing studyId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Message too long (max 2000 characters)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!db) {
      return new Response(JSON.stringify({ error: 'Database unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!anthropic) {
      return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check credits before AI call
    const creditError = await checkCreditsBeforeCall(userId, ENDPOINT)
    if (creditError) {
      return new Response(creditError.body, {
        status: creditError.status,
        headers: creditError.headers
      })
    }

    // Get or verify study exists
    const studyRef = db.collection('independentStudies').doc(studyId)
    const studyDoc = await studyRef.get()

    if (!studyDoc.exists) {
      return new Response(JSON.stringify({ error: 'Study not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const studyData = studyDoc.data()!
    if (studyData.userId !== userId) {
      return new Response(JSON.stringify({ error: 'Not authorized' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (studyData.phase !== 'discovery') {
      return new Response(JSON.stringify({ error: 'Study is not in discovery phase' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get current discovery state
    const discovery: DiscoveryState = studyData.discovery || {
      messages: [],
      initialTopic: message,
      isComplete: false,
      readyToGenerate: false
    }

    // Build conversation context
    const contextMessages: Array<{ role: 'user' | 'assistant'; content: string }> = []

    // Add existing discovery messages
    for (const msg of discovery.messages) {
      contextMessages.push({
        role: msg.role,
        content: msg.content
      })
    }

    // Add the new user message
    const userMessageContent = isInitial 
      ? `I want to do an Independent Study on: "${message}"\n\nPlease help me refine this into a clear learning path.`
      : message

    contextMessages.push({
      role: 'user',
      content: userMessageContent
    })

    // Stream response from AI
    const stream = await anthropic.messages.stream({
      model: MODEL,
      max_tokens: 1000,
      system: DISCOVERY_SYSTEM_PROMPT,
      messages: contextMessages
    })

    // Create SSE response stream
    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = ''

          // Stream the content
          for await (const event of stream) {
            if (event.type === 'content_block_delta') {
              const delta = event.delta
              if ('text' in delta) {
                fullResponse += delta.text
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                  type: 'content',
                  content: delta.text 
                })}\n\n`))
              }
            }
          }

          // Get final message with usage info
          const finalMessage = await stream.finalMessage()
          const usage = finalMessage.usage

          // Track credits based on actual token usage
          let creditsCharged = 0
          if (usage) {
            const result = await trackCreditsAfterCall(
              userId,
              ENDPOINT,
              MODEL,
              {
                input_tokens: usage.input_tokens,
                output_tokens: usage.output_tokens
              }
            )
            creditsCharged = result.costCharged
          }

          // Check if AI is ready to generate curriculum
          const readyMatch = fullResponse.match(/<ready_to_generate>([\s\S]*?)<\/ready_to_generate>/)
          const isReadyToGenerate = !!readyMatch

          // Parse summary if ready
          let topicSummary: string | undefined
          let learningObjectives: string[] | undefined
          
          if (readyMatch) {
            const summaryContent = readyMatch[1]
            const topicMatch = summaryContent.match(/Topic:\s*(.+)/i)
            const focusMatch = summaryContent.match(/Focus:\s*(.+)/i)
            const goalMatch = summaryContent.match(/Goal:\s*(.+)/i)
            const projectMatch = summaryContent.match(/Project Idea:\s*(.+)/i)
            
            topicSummary = topicMatch 
              ? `${topicMatch[1].trim()}${focusMatch ? ` - ${focusMatch[1].trim()}` : ''}`
              : undefined
            
            learningObjectives = [
              goalMatch?.[1]?.trim(),
              projectMatch?.[1]?.trim()
            ].filter(Boolean) as string[]
          }

          // Clean the response for display (remove the ready marker)
          const displayContent = fullResponse.replace(/<ready_to_generate>[\s\S]*?<\/ready_to_generate>/, '').trim()

          // Create the new messages
          const newUserMessage: DiscoveryMessage = {
            id: `disc_user_${Date.now()}`,
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
          }

          const newAssistantMessage: DiscoveryMessage = {
            id: `disc_asst_${Date.now()}`,
            role: 'assistant',
            content: displayContent,
            timestamp: new Date().toISOString(),
            metadata: isReadyToGenerate ? { isReadyToGenerate: true } : undefined
          }

          // Update discovery state
          const updatedDiscovery: DiscoveryState = {
            ...discovery,
            messages: [...discovery.messages, newUserMessage, newAssistantMessage],
            initialTopic: discovery.initialTopic || message,
            isComplete: false,
            readyToGenerate: isReadyToGenerate,
            ...(topicSummary && { topicSummary }),
            ...(learningObjectives && { learningObjectives })
          }

          // Update study document
          await studyRef.update({
            discovery: updatedDiscovery,
            totalMessages: FieldValue.increment(2),
            updatedAt: FieldValue.serverTimestamp()
          })

          // Send completion with state
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            type: 'done',
            isReadyToGenerate,
            topicSummary,
            creditsCharged,
            messageId: newAssistantMessage.id
          })}\n\n`))

          controller.close()
        } catch (error) {
          apiLogger.apiError('independent-study/discovery', 'Stream error', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            type: 'error',
            error: 'Failed to generate response'
          })}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    apiLogger.apiError('independent-study/discovery', 'Error processing message', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process message' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

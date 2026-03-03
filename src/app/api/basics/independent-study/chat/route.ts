/**
 * Independent Study Chat API
 * 
 * POST - Send a message to the AI tutor (streaming response)
 * 
 * Handles:
 * - New session creation
 * - Continuing conversations
 * - Embedded problem generation and grading
 * - Credit tracking based on actual AI usage
 */

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkCreditsBeforeCall, trackCreditsAfterCall } from '@/lib/credits'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const TUTOR_SYSTEM_PROMPT = `You are an expert AI tutor conducting a personalized Independent Study session. The student has mastered K-12 Math, K-12 Reading, and formal Logic before reaching you.

Your role is to:
1. Guide the student through their chosen topic using Socratic dialogue
2. Connect concepts to their prior knowledge in math, reading, and logic
3. Embed practice problems naturally within the conversation
4. Provide thoughtful feedback on their answers
5. Adapt your teaching style based on their responses

IMPORTANT: When you want to pose a practice problem, use this EXACT format:

<problem>
<question>Your question here</question>
<type>multiple-choice OR free-response OR true-false</type>
<options>
A) First option
B) Second option
C) Third option
D) Fourth option
</options>
<answer>The correct answer (e.g., "B" for MC, or the text for free-response)</answer>
</problem>

Guidelines:
- Keep explanations clear and engaging
- Use analogies to connect new concepts to familiar ones
- Praise good reasoning and gently correct misconceptions
- Ask thought-provoking questions to deepen understanding
- Include 1-2 practice problems per substantial topic covered
- If the student answers incorrectly, guide them to the right answer rather than just giving it`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const MODEL = 'claude-sonnet-4-20250514'
const ENDPOINT = '/api/basics/independent-study/chat'

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
    const { studyId, sessionId, message, answerToProblem } = body

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

    // Verify study exists and belongs to user
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

    // Get or create session
    let currentSessionId = sessionId
    let sessionRef
    let sessionData: {
      messages: ChatMessage[]
      messageCount: number
      creditsCharged: number
      xpEarned: number
      problemsCompleted: number
    }

    if (sessionId) {
      sessionRef = db.collection('independentStudies').doc(studyId)
        .collection('sessions').doc(sessionId)
      const sessionDoc = await sessionRef.get()
      
      if (sessionDoc.exists) {
        const data = sessionDoc.data()!
        sessionData = {
          messages: data.messages || [],
          messageCount: data.messageCount || 0,
          creditsCharged: data.creditsCharged || 0,
          xpEarned: data.xpEarned || 0,
          problemsCompleted: data.problemsCompleted || 0
        }
      } else {
        // Session ID provided but doesn't exist - create new
        currentSessionId = `session_${Date.now()}`
        sessionRef = db.collection('independentStudies').doc(studyId)
          .collection('sessions').doc(currentSessionId)
        sessionData = {
          messages: [],
          messageCount: 0,
          creditsCharged: 0,
          xpEarned: 0,
          problemsCompleted: 0
        }
      }
    } else {
      // Create new session
      currentSessionId = `session_${Date.now()}`
      sessionRef = db.collection('independentStudies').doc(studyId)
        .collection('sessions').doc(currentSessionId)
      sessionData = {
        messages: [],
        messageCount: 0,
        creditsCharged: 0,
        xpEarned: 0,
        problemsCompleted: 0
      }
    }

    // Build conversation context
    const contextMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      {
        role: 'user',
        content: `I want to do an Independent Study on: "${studyData.topic}"\n\n${studyData.description}\n\nPlease begin by introducing the topic and what we'll explore together.`
      }
    ]

    // Add conversation history (last 20 messages for context window management)
    const recentMessages = sessionData.messages.slice(-20)
    for (const msg of recentMessages) {
      contextMessages.push({
        role: msg.role,
        content: msg.content
      })
    }

    // Build user message with problem answer context if applicable
    let userMessage = message
    if (answerToProblem) {
      userMessage = `[Answering the practice problem: ${answerToProblem.answer}]\n\n${message}`
    }

    // Add current message
    contextMessages.push({
      role: 'user',
      content: userMessage
    })

    // Stream response from AI
    const stream = await anthropic.messages.stream({
      model: MODEL,
      max_tokens: 1500,
      system: TUTOR_SYSTEM_PROMPT,
      messages: contextMessages
    })

    // Create SSE response stream
    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = ''
          
          // Send session info first
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            type: 'session',
            sessionId: currentSessionId,
            messageCount: sessionData.messageCount + 1
          })}\n\n`))

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

          // Parse for embedded problems
          const problemMatch = fullResponse.match(/<problem>([\s\S]*?)<\/problem>/)
          let embeddedProblem = null
          
          if (problemMatch) {
            const problemContent = problemMatch[1]
            const questionMatch = problemContent.match(/<question>([\s\S]*?)<\/question>/)
            const typeMatch = problemContent.match(/<type>([\s\S]*?)<\/type>/)
            const optionsMatch = problemContent.match(/<options>([\s\S]*?)<\/options>/)
            const answerMatch = problemContent.match(/<answer>([\s\S]*?)<\/answer>/)

            if (questionMatch) {
              embeddedProblem = {
                id: `problem_${Date.now()}`,
                question: questionMatch[1].trim(),
                type: typeMatch ? typeMatch[1].trim().toLowerCase() : 'free-response',
                options: optionsMatch ? optionsMatch[1].trim().split('\n').filter(Boolean) : undefined,
                correctAnswer: answerMatch ? answerMatch[1].trim() : undefined
              }

              // Send problem data
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                type: 'problem',
                problem: {
                  id: embeddedProblem.id,
                  question: embeddedProblem.question,
                  problemType: embeddedProblem.type,
                  options: embeddedProblem.options
                }
              })}\n\n`))
            }
          }

          // Calculate XP for this message
          let xpEarned = 0
          if (answerToProblem) {
            // Award XP for attempting problems
            xpEarned = 5
          }

          // Save messages to session
          const newUserMessage = {
            role: 'user' as const,
            content: message,
            timestamp: new Date().toISOString()
          }

          const newAssistantMessage = {
            role: 'assistant' as const,
            content: fullResponse,
            timestamp: new Date().toISOString(),
            ...(embeddedProblem && { embeddedProblem })
          }

          // Update session in database
          const updatedMessages = [...sessionData.messages, newUserMessage, newAssistantMessage]
          const newMessageCount = sessionData.messageCount + 2

          await sessionRef.set({
            id: currentSessionId,
            studyId,
            startedAt: sessionData.messages.length === 0 ? FieldValue.serverTimestamp() : undefined,
            lastUpdatedAt: FieldValue.serverTimestamp(),
            messages: updatedMessages.slice(-50), // Keep last 50 messages
            messageCount: newMessageCount,
            creditsCharged: sessionData.creditsCharged + creditsCharged,
            xpEarned: sessionData.xpEarned + xpEarned,
            problemsCompleted: sessionData.problemsCompleted + (embeddedProblem ? 1 : 0),
            isActive: true
          }, { merge: true })

          // Update study stats
          await studyRef.update({
            lastSessionAt: FieldValue.serverTimestamp(),
            totalMessages: FieldValue.increment(2),
            totalXP: FieldValue.increment(xpEarned),
            totalProblemsCompleted: FieldValue.increment(embeddedProblem ? 1 : 0)
          })

          // Send completion with stats
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            type: 'done',
            xpEarned,
            creditsCharged,
            hasProblem: !!embeddedProblem
          })}\n\n`))

          controller.close()
        } catch (error) {
          apiLogger.apiError('independent-study/chat', 'Stream error', error)
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
    apiLogger.apiError('independent-study/chat', 'Error processing message', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process message' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

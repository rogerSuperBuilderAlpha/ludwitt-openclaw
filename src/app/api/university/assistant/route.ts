/**
 * API Route: POST /api/university/assistant
 *
 * AI Teaching Assistant chat endpoint. Builds context from the student's
 * current course/deliverable and uses Claude to provide Socratic guidance.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import Anthropic from '@anthropic-ai/sdk'
import { checkCreditsBeforeCall, trackCreditsAfterCall } from '@/lib/credits'
import { buildAssistantContext } from '@/lib/university/assistant-context'
import type { AssistantChatRequest } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const MODEL = 'claude-haiku-4-5'
const ENDPOINT_NAME = 'university-assistant'

function buildSystemPrompt(context: Awaited<ReturnType<typeof buildAssistantContext>>): string {
  const parts: string[] = []

  parts.push(
    `You are a teaching assistant for a university course. Your role is to help students understand concepts and guide them toward solutions without doing the work for them. Use the Socratic method — ask questions that lead students to discover answers themselves.`
  )

  if (context.courseTitle) {
    parts.push(`\n## Course Context`)
    parts.push(`- **Course:** ${context.courseTitle}`)
    if (context.courseDescription) {
      parts.push(`- **Description:** ${context.courseDescription}`)
    }
  }

  if (context.pathTopic) {
    parts.push(`- **Learning Path Topic:** ${context.pathTopic}`)
  }

  if (context.deliverableTitle) {
    parts.push(`\n## Current Deliverable`)
    parts.push(`- **Title:** ${context.deliverableTitle}`)
    if (context.deliverableDescription) {
      parts.push(`- **Description:** ${context.deliverableDescription}`)
    }
    if (context.deliverableRequirements?.length) {
      parts.push(`- **Requirements:**`)
      for (const req of context.deliverableRequirements) {
        parts.push(`  - ${req}`)
      }
    }
    if (context.submissionUrls) {
      parts.push(`\n## Student's Submission Links`)
      if (context.submissionUrls.deployedUrl) {
        parts.push(`- Deployed URL: ${context.submissionUrls.deployedUrl}`)
      }
      if (context.submissionUrls.githubUrl) {
        parts.push(`- GitHub: ${context.submissionUrls.githubUrl}`)
      }
      if (context.submissionUrls.loomUrl) {
        parts.push(`- Loom Video: ${context.submissionUrls.loomUrl}`)
      }
    }
  }

  if (context.previousFeedback) {
    parts.push(`\n## Professor Feedback`)
    parts.push(context.previousFeedback)
  }

  if (context.aiReviewSummary) {
    parts.push(`\n## AI Pre-Review Summary`)
    parts.push(context.aiReviewSummary)
  }

  if (context.peerReviewFeedback?.length) {
    parts.push(`\n## Peer Review Feedback`)
    for (const feedback of context.peerReviewFeedback) {
      parts.push(`- ${feedback}`)
    }
  }

  parts.push(`\n## Important Rules`)
  parts.push(`- Never write complete code solutions for the student`)
  parts.push(`- Guide them to understand concepts, not just get answers`)
  parts.push(`- Reference specific deliverable requirements when relevant`)
  parts.push(`- If they ask about professor feedback, help them interpret and act on it`)
  parts.push(`- Keep responses concise and focused`)
  parts.push(`- Be encouraging and supportive`)

  return parts.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    if (!anthropic) {
      return serverError(null, 'AI service unavailable')
    }

    const body: AssistantChatRequest = await request.json()
    const { message, courseId, deliverableId, learningPathId, conversationHistory } = body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return badRequestError('Message is required')
    }

    // Check credits before the AI call
    const creditError = await checkCreditsBeforeCall(userId, ENDPOINT_NAME)
    if (creditError) return creditError

    // Build context from the student's current position
    const context = await buildAssistantContext({
      userId,
      courseId,
      deliverableId,
      learningPathId,
    })

    const systemPrompt = buildSystemPrompt(context)

    // Convert conversation history to Anthropic message format
    const messages: Anthropic.MessageParam[] = [
      ...conversationHistory.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages,
    })

    const reply =
      response.content[0].type === 'text' ? response.content[0].text : ''

    // Track credits based on actual token usage
    await trackCreditsAfterCall(userId, ENDPOINT_NAME, MODEL, response.usage)

    return successResponse({ reply })
  } catch (error) {
    apiLogger.apiError('university/assistant', 'Error generating assistant response', error)
    return serverError(error, 'Failed to generate assistant response')
  }
}

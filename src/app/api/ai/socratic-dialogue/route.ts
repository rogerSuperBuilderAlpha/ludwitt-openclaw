/**
 * API Route: POST /api/ai/socratic-dialogue
 * 
 * Handles Socratic dialogue for math tutoring.
 * Uses Claude to guide students through understanding problems
 * with questions rather than just giving answers.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import Anthropic from '@anthropic-ai/sdk'
import { checkBasicsBalance, trackCreditsAfterCall, insufficientBasicsCreditsError } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

interface DialogueRequest {
  problemId: string
  problemText: string
  problemLatex?: string
  problemType: string
  topic: string
  subTopic?: string
  difficulty: number
  correctAnswer: string
  studentMessage: string
  currentAnswer?: string
  conversationHistory: Array<{ role: string; content: string }>
  hints?: string[]
  solutionSteps?: string[]
}

const SOCRATIC_SYSTEM_PROMPT = `You are a Socratic tutor helping a student understand a math problem. Your role is NOT to give answers, but to guide the student to discover understanding themselves through thoughtful questions.

## Your Approach:

1. **Never give the answer directly** - Instead, ask questions that lead the student to discover it.

2. **Ask one question at a time** - Don't overwhelm with multiple questions.

3. **Build on their responses** - Acknowledge what they said, then guide them further.

4. **Use the Socratic method:**
   - Ask clarifying questions ("What do you mean by...?")
   - Ask probing questions ("Why do you think that?")
   - Ask questions about implications ("What would happen if...?")
   - Ask questions about evidence ("What makes you think so?")

5. **Encourage and validate effort** - Even wrong answers show thinking.

6. **Break complex problems into smaller parts** - Help them see the steps.

7. **Connect to what they know** - Link new concepts to familiar ones.

8. **Use simple language** - Match the student's level.

## Response Format:
- Keep responses concise (2-4 sentences usually)
- Use **bold** for emphasis on key concepts
- End with a question to keep the dialogue going
- Be warm and encouraging

## What NOT to do:
- Don't say "the answer is..."
- Don't solve the problem for them
- Don't give long lectures
- Don't be condescending

## IMPORTANT: After your response, suggest 2-3 SHORT follow-up options the student might say next. Format them on a new line starting with "SUGGESTIONS:" followed by a JSON array.

Example:
Great observation! When we have an equation like 2x + 3 = 7, what operation should we do first to isolate x?

SUGGESTIONS: ["Subtract 3 from both sides", "I'm not sure", "Can you show me?"]`

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Check credits using the Basics $1 limit
    const balanceCheck = await checkBasicsBalance(userId)
    if (!balanceCheck.allowed) {
      return insufficientBasicsCreditsError(balanceCheck.currentBalance, balanceCheck.minimumBalance)
    }

    if (!anthropic) {
      return NextResponse.json({
        error: 'AI service unavailable'
      }, { status: 503 })
    }

    const body: DialogueRequest = await request.json()
    
    const {
      problemText,
      problemLatex,
      problemType,
      topic,
      subTopic,
      difficulty,
      correctAnswer,
      studentMessage,
      currentAnswer,
      conversationHistory,
      hints,
      solutionSteps
    } = body

    // Build the problem context for Claude
    const problemContext = `
## Problem Information (for your reference only - don't reveal directly):
- **Type:** ${problemType}
- **Topic:** ${topic}${subTopic ? ` > ${subTopic}` : ''}
- **Difficulty:** Grade ${Math.round(difficulty)}
- **Question:** ${problemText}
${problemLatex ? `- **LaTeX:** ${problemLatex}` : ''}
- **Correct Answer:** ${correctAnswer}
${currentAnswer ? `- **Student's current answer attempt:** ${currentAnswer}` : ''}
${hints?.length ? `- **Available hints:** ${hints.join(' | ')}` : ''}
${solutionSteps?.length ? `- **Solution steps:** ${solutionSteps.join(' → ')}` : ''}
`

    // Build messages for Claude
    const messages: Anthropic.MessageParam[] = []
    
    // Add conversation history
    for (const msg of conversationHistory) {
      messages.push({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })
    }
    
    // Add the new student message
    messages.push({
      role: 'user',
      content: studentMessage
    })

    // Get user's preferred model for grading/tutoring tasks
    const model = await getModelForTask(userId, 'grading')
    const taskConfig = getTaskConfig('grading')

    // Call Claude
    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      system: SOCRATIC_SYSTEM_PROMPT + '\n\n' + problemContext,
      messages
    })

    // Extract the response text
    let tutorResponse = response.content[0].type === 'text' 
      ? response.content[0].text 
      : ''

    // Parse out suggestions if present
    let suggestions: string[] = []
    const suggestionsMatch = tutorResponse.match(/SUGGESTIONS:\s*(\[[\s\S]*?\])/)
    if (suggestionsMatch) {
      try {
        suggestions = JSON.parse(suggestionsMatch[1])
        // Remove the suggestions line from the response
        tutorResponse = tutorResponse.replace(/\n*SUGGESTIONS:\s*\[[\s\S]*?\]/, '').trim()
      } catch {
        // If parsing fails, just use empty suggestions
        suggestions = []
      }
    }

    // Track credits based on actual token usage
    const { costCharged, newBalance } = await trackCreditsAfterCall(
      userId,
      'socratic-dialogue',
      model,
      response.usage
    )

    return successResponse({
      response: tutorResponse,
      suggestions,
      creditsUsed: costCharged,
      newBalance,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens
      }
    })

  } catch (error) {
    apiLogger.apiError('socratic-dialogue', 'Error generating tutor response', error)
    return serverError(error, 'Failed to generate tutor response')
  }
}

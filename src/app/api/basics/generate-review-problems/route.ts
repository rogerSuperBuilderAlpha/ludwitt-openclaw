/**
 * API Route: POST /api/basics/generate-review-problems
 * 
 * Based on spaced repetition learning science principles:
 * Takes the last 20 problems a user worked on and generates
 * 5 easier problems to help reinforce foundational skills.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { withCreditTracking } from '@/lib/credits'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import Anthropic from '@anthropic-ai/sdk'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

interface RecentProblem {
  id: string
  question: string
  topic: string
  difficulty: number
  correct: boolean
  userAnswer: string
  correctAnswer: string
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { recentProblems } = body as { recentProblems: RecentProblem[] }

    if (!recentProblems || recentProblems.length === 0) {
      return badRequestError('Recent problems are required')
    }

    if (!isAIGenerationAvailable() || !anthropic) {
      return serverError(new Error('AI not available'), 'AI service not available')
    }

    // Analyze the problems to find patterns
    const topics = [...new Set(recentProblems.map(p => p.topic))]
    const incorrectProblems = recentProblems.filter(p => !p.correct)
    const avgDifficulty = recentProblems.reduce((sum, p) => sum + p.difficulty, 0) / recentProblems.length
    
    // Target easier difficulty (2-3 levels lower)
    const targetDifficulty = Math.max(1, Math.floor(avgDifficulty) - 2)

    const prompt = `You are a math tutor creating spaced repetition review problems.

## Context
A student has completed 20 math problems. Here's a summary:
- Topics covered: ${topics.join(', ')}
- Average difficulty level: Grade ${Math.floor(avgDifficulty)}
- Problems they got wrong: ${incorrectProblems.length} out of ${recentProblems.length}

## Wrong answers (focus on these):
${incorrectProblems.slice(0, 5).map(p => `- "${p.question}" (Their answer: ${p.userAnswer}, Correct: ${p.correctAnswer})`).join('\n')}

## Sample of problems they worked on:
${recentProblems.slice(0, 10).map(p => `- ${p.question} (${p.correct ? 'Correct' : 'Wrong'})`).join('\n')}

## Your Task
Generate 5 EASIER review problems (Grade ${targetDifficulty} level) that reinforce the foundational skills needed for the topics above.

Focus on:
1. Prerequisite skills for topics they struggled with
2. Simpler versions of problem types they got wrong
3. Building blocks that support their current learning

## Output Format
Return a JSON array with exactly 5 problems:
[
  {
    "question": "Clear, simple math problem",
    "correctAnswer": "The exact answer (number or short text)",
    "topic": "Topic name",
    "difficulty": ${targetDifficulty},
    "hint": "A helpful hint if they're stuck",
    "explanation": "Brief explanation of how to solve it"
  }
]

Only return the JSON array, no other text.`

    // Get user's preferred model for generation tasks
    const model = await getModelForTask(userId, 'generation')
    const taskConfig = getTaskConfig('generation')

    // Execute AI call with credit tracking
    const creditResult = await withCreditTracking(userId, 'generate-review-problems', async () => {
      const response = await anthropic!.messages.create({
        model,
        max_tokens: taskConfig.defaultMaxTokens,
        temperature: taskConfig.defaultTemperature,
        messages: [{ role: 'user', content: prompt }]
      })

      return {
        response,
        usage: response.usage,
        model
      }
    })

    if (creditResult instanceof NextResponse) {
      return creditResult // Credit error
    }

    const content = creditResult.result.content[0]
    if (content.type !== 'text') {
      return serverError(new Error('Unexpected response'), 'Failed to generate problems')
    }

    // Parse the JSON response
    let problems
    try {
      // Clean up the response - remove markdown code blocks if present
      let jsonText = content.text.trim()
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.slice(7)
      }
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.slice(3)
      }
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.slice(0, -3)
      }
      problems = JSON.parse(jsonText.trim())
    } catch (parseError) {
      apiLogger.apiError('generate-review-problems', 'Failed to parse AI response')
      return serverError(new Error('Parse error'), 'Failed to parse generated problems')
    }

    // Validate and add IDs
    const reviewProblems = problems.map((p: { question: string; correctAnswer: string | number; explanation?: string; difficulty?: number; topic?: string; hint?: string }, index: number) => ({
      id: `review_${Date.now()}_${index}`,
      question: p.question,
      correctAnswer: String(p.correctAnswer),
      topic: p.topic || 'Review',
      difficulty: p.difficulty || targetDifficulty,
      hint: p.hint || '',
      explanation: p.explanation || '',
      isReviewProblem: true
    }))

    return successResponse({
      problems: reviewProblems,
      targetDifficulty,
      topicsReviewed: topics,
      costCharged: creditResult.costCharged,
      newBalance: creditResult.newBalance
    })

  } catch (error) {
    apiLogger.apiError('generate-review-problems', 'Failed to generate review problems', error)
    return serverError(error, 'Failed to generate review problems')
  }
}


import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { verifyIdToken } from '@/lib/firebase/admin'
import { apiLogger } from '@/lib/logger'
import { checkBasicsBalance, trackCreditsAfterCall } from '@/lib/credits'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'
import { serverError } from '@/lib/api/error-responses'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const token = authHeader.split(' ')[1]
    const decodedToken = await verifyIdToken(token)
    const userId = decodedToken.uid

    const rateLimitResult = await checkRateLimit('ai', userId)
    if (!rateLimitResult.success) {
      return rateLimitedResponse(rateLimitResult)
    }

    // Check credits (quiz generation costs 3 credits = 3 cents)
    const balanceResult = await checkBasicsBalance(userId)
    if (!balanceResult.allowed) {
      return NextResponse.json(
        {
          error: 'Insufficient credits. You need credits to generate a quiz.',
          currentBalance: balanceResult.currentBalance,
        },
        { status: 402 }
      )
    }

    const { authorId, authorName, bookId, bookTitle } = await request.json()

    if (!authorId || !authorName || !bookId || !bookTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!anthropic) {
      return NextResponse.json({ error: 'API not configured' }, { status: 500 })
    }

    // Get user's preferred model for generation tasks
    const model = await getModelForTask(userId, 'generation')
    const taskConfig = getTaskConfig('generation')

    // Generate 10 multiple choice questions about the book
    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [
        {
          role: 'user',
          content: `Generate exactly 10 multiple-choice questions to verify that someone has actually read "${bookTitle}" by ${authorName}.

The questions should:
1. Cover different parts of the book (beginning, middle, end)
2. Focus on plot points, characters, themes, and memorable scenes
3. Be specific enough that someone who hasn't read the book couldn't guess correctly
4. Have 4 options each (A, B, C, D)
5. Have only one correct answer

Return ONLY a valid JSON array with this exact format (no markdown, no explanation):
[
  {
    "question": "What is the opening line of the novel?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0
  }
]

Where "correct" is the 0-indexed position of the correct answer (0=first option, 1=second, etc).

Generate 10 questions now:`,
        },
      ],
    })

    // Track credits based on actual token usage
    const { costCharged } = await trackCreditsAfterCall(
      userId,
      'book-quiz',
      model,
      response.usage
    )

    // Parse the response
    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    let questions
    try {
      // Try to extract JSON from the response - handle markdown code blocks
      let jsonText = content.text

      // Remove markdown code blocks if present
      const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/)
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1]
      }

      // Extract just the JSON array
      const jsonMatch = jsonText.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        apiLogger.apiError('book-quiz', 'No JSON array found in AI response')
        throw new Error('No JSON array found in response')
      }

      questions = JSON.parse(jsonMatch[0])

      // Validate structure - allow 10 or more questions, take first 10
      if (!Array.isArray(questions) || questions.length < 10) {
        apiLogger.apiError(
          'book-quiz',
          `Not enough questions: ${questions?.length}`
        )
        throw new Error(
          `Expected at least 10 questions, got ${questions?.length || 0}`
        )
      }

      // Take first 10 questions
      questions = questions.slice(0, 10)

      // Validate and fix question structure
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i]
        if (!q.question || typeof q.question !== 'string') {
          throw new Error(`Question ${i + 1} missing question text`)
        }
        if (!Array.isArray(q.options)) {
          throw new Error(`Question ${i + 1} missing options array`)
        }
        // Handle if AI returns less than 4 options - pad with placeholder
        while (q.options.length < 4) {
          q.options.push(`Option ${q.options.length + 1}`)
        }
        // Take only first 4 options if more
        q.options = q.options.slice(0, 4)

        // Handle correct answer - could be number or letter
        if (typeof q.correct === 'string') {
          const letterMap: Record<string, number> = {
            A: 0,
            B: 1,
            C: 2,
            D: 3,
            a: 0,
            b: 1,
            c: 2,
            d: 3,
          }
          q.correct = letterMap[q.correct] ?? 0
        }
        if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
          q.correct = 0 // Default to first option
        }
      }
    } catch (parseError) {
      apiLogger.apiError('book-quiz', 'Parse error', parseError)
      return NextResponse.json(
        { error: 'Failed to parse quiz questions' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      questions,
      creditsUsed: costCharged,
    })
  } catch (error) {
    return serverError(error, 'Failed to generate quiz')
  }
}

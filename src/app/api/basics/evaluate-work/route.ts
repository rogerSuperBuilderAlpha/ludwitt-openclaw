import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { WorkEvaluation } from '@/lib/types/basics'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { trackCreditsAfterCall } from '@/lib/credits'
import { checkBasicsBalance } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'
import { XP_REWARDS, calculateWorkBonus } from '@/lib/basics/xp-config'
import { apiLogger } from '@/lib/logger'
import { sanitizePromptInput } from '@/lib/sanitize'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const BASE_XP = XP_REWARDS.CORRECT_ANSWER_BASE

export async function POST(request: NextRequest) {
  try {
    // Authenticate request for credit tracking
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { question, correctAnswer, userAnswer, workShown, isCorrect } = body

    if (!workShown || !workShown.trim()) {
      return NextResponse.json({
        workScore: 0,
        bonusMultiplier: 1.0,
        bonusXp: 0,
        feedback: 'No work was shown.',
        scores: {
          logicalProgression: 0,
          mathematicalAccuracy: 0,
          completeness: 0,
          clarity: 0,
        },
      } as WorkEvaluation)
    }

    // If AI is not available, provide a simple heuristic evaluation
    if (!anthropic) {
      const lines = workShown
        .trim()
        .split('\n')
        .filter((l: string) => l.trim())
      const lineCount = lines.length

      // Simple heuristic: more lines = more effort shown
      const score = Math.min(lineCount * 2, 10)
      const multiplier = 1.0 + score / 10
      const bonusXp = isCorrect
        ? Math.round((multiplier - 1) * BASE_XP)
        : Math.min(score / 2, 3)

      return NextResponse.json({
        workScore: score,
        bonusMultiplier: multiplier,
        bonusXp,
        feedback:
          lineCount >= 3
            ? 'Good effort showing your work!'
            : 'Try showing more steps for extra credit.',
        scores: {
          logicalProgression: Math.min(lineCount, 3),
          mathematicalAccuracy: isCorrect ? 3 : 1,
          completeness: Math.min(Math.floor(lineCount / 2), 2),
          clarity: 2,
        },
        creditsUsed: 0,
      } as WorkEvaluation)
    }

    // Check if user has sufficient credits before AI call (using Basics $1 limit)
    const balanceCheck = await checkBasicsBalance(userId)
    if (!balanceCheck.allowed) {
      // Fall back to heuristic evaluation if no credits
      const lines = workShown
        .trim()
        .split('\n')
        .filter((l: string) => l.trim())
      const lineCount = lines.length
      const score = Math.min(lineCount * 2, 10)
      const multiplier = 1.0 + score / 10
      const bonusXp = isCorrect
        ? Math.round((multiplier - 1) * BASE_XP)
        : Math.min(score / 2, 3)

      return NextResponse.json({
        workScore: score,
        bonusMultiplier: multiplier,
        bonusXp,
        feedback:
          lineCount >= 3
            ? 'Good effort showing your work!'
            : 'Try showing more steps for extra credit.',
        scores: {
          logicalProgression: Math.min(lineCount, 3),
          mathematicalAccuracy: isCorrect ? 3 : 1,
          completeness: Math.min(Math.floor(lineCount / 2), 2),
          clarity: 2,
        },
        creditsUsed: 0,
        creditLimited: true,
      } as WorkEvaluation)
    }

    // Sanitize user-provided text before prompt insertion
    const sanitizedUserAnswer = sanitizePromptInput(userAnswer)
    const sanitizedWorkShown = sanitizePromptInput(workShown)

    // Use AI to evaluate the work
    const prompt = `You are a supportive math tutor evaluating a student's work. Be encouraging, specific, and helpful.

Problem: ${question}
Correct Answer: ${correctAnswer}
Student's Answer: ${sanitizedUserAnswer}
Was the Answer Correct: ${isCorrect ? 'Yes' : 'No'}

Student's Work:
${sanitizedWorkShown}

Evaluate the work and provide helpful feedback. Consider:
1. Logical Progression (0-3): Are steps in a logical order?
2. Mathematical Accuracy (0-3): Are the individual steps mathematically correct?
3. Completeness (0-2): Are all important steps shown?
4. Clarity (0-2): Is the work easy to follow?

Return ONLY a valid JSON object (no markdown):
{
  "logicalProgression": <0-3>,
  "mathematicalAccuracy": <0-3>,
  "completeness": <0-2>,
  "clarity": <0-2>,
  "totalScore": <0-10>,
  "feedback": "<2-3 sentences: Start with what they did well. Be specific about their actual work.>",
  "improvements": ["<Specific, actionable tip 1>", "<Specific, actionable tip 2 if needed>"],
  "whatWentWell": "<1 sentence highlighting the strongest aspect of their work>",
  "nextTimeAdvice": "<1 sentence of practical advice for similar problems>",
  "alternativeApproach": "<Optional: A different method they could try, or null if not applicable>"
}`

    // Get user's preferred model for grading tasks
    const model = await getModelForTask(userId, 'grading')
    const taskConfig = getTaskConfig('grading')

    const response = await anthropic.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      temperature: taskConfig.defaultTemperature,
      messages: [{ role: 'user', content: prompt }],
    })

    // Track credits for the AI call
    const { costCharged } = await trackCreditsAfterCall(
      userId,
      'evaluate-work',
      model,
      response.usage
    )

    // Parse the AI response
    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response format')
    }

    let evaluation
    try {
      // Clean the response - remove any markdown formatting
      let cleanedResponse = content.text.trim()
      if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse
          .replace(/```json?\n?/g, '')
          .replace(/```/g, '')
      }
      evaluation = JSON.parse(cleanedResponse)
    } catch {
      apiLogger.apiError('evaluate-work', 'Failed to parse AI evaluation', {
        data: { text: content.text.substring(0, 200) },
      })
      // Fallback to basic evaluation
      const lines = workShown
        .trim()
        .split('\n')
        .filter((l: string) => l.trim())
      evaluation = {
        logicalProgression: Math.min(lines.length, 3),
        mathematicalAccuracy: isCorrect ? 3 : 1,
        completeness: Math.min(Math.floor(lines.length / 2), 2),
        clarity: 2,
        totalScore: Math.min(lines.length * 1.5, 10),
        feedback: 'Thanks for showing your work!',
        improvements: [],
      }
    }

    // Calculate bonus
    const totalScore =
      evaluation.totalScore ||
      evaluation.logicalProgression +
        evaluation.mathematicalAccuracy +
        evaluation.completeness +
        evaluation.clarity

    // Multiplier: 1.0 (no work) to 2.0 (perfect work)
    const bonusMultiplier = 1.0 + totalScore / 10

    // Calculate actual bonus XP
    let bonusXp = 0
    if (isCorrect) {
      // For correct answers: bonus is (multiplier - 1) * BASE_XP
      bonusXp = Math.round((bonusMultiplier - 1) * BASE_XP)
    } else {
      // For incorrect answers: partial credit for good work (max 5 XP)
      bonusXp = Math.min(Math.round(totalScore / 2), 5)
    }

    return NextResponse.json({
      workScore: totalScore,
      bonusMultiplier,
      bonusXp,
      feedback: evaluation.feedback || 'Thanks for showing your work!',
      improvements: evaluation.improvements || [],
      whatWentWell: evaluation.whatWentWell || null,
      nextTimeAdvice: evaluation.nextTimeAdvice || null,
      alternativeApproach: evaluation.alternativeApproach || null,
      scores: {
        logicalProgression: evaluation.logicalProgression,
        mathematicalAccuracy: evaluation.mathematicalAccuracy,
        completeness: evaluation.completeness,
        clarity: evaluation.clarity,
      },
      creditsUsed: costCharged,
    } as WorkEvaluation)
  } catch (error) {
    apiLogger.apiError('evaluate-work', 'Error evaluating work', error)

    // Return a graceful fallback
    return NextResponse.json({
      workScore: 5,
      bonusMultiplier: 1.5,
      bonusXp: 5,
      feedback: 'Thanks for showing your work!',
      scores: {
        logicalProgression: 2,
        mathematicalAccuracy: 2,
        completeness: 1,
        clarity: 2,
      },
    } as WorkEvaluation)
  }
}

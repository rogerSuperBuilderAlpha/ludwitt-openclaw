/**
 * Problem Review Utilities
 *
 * Verifies math problems by recomputing the answer with AI and
 * validates reading exercises for structural correctness.
 */

import Anthropic from '@anthropic-ai/sdk'
import { MathProblem } from '../types/basics'
import { areNumbersEqual, normalizeMathAnswer } from './validation'
import { isAIValidationAvailable, BasicsConfig } from './config'
import { getDefaultModelForTier, getTaskConfig } from '@/lib/ai/providers'

// Only initialize Anthropic if API key is available
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
}) : null

/**
 * Token usage info for credit tracking
 */
export interface ReviewUsage {
  input_tokens: number
  output_tokens: number
  model: string
}

export interface MathReviewResult {
  isCorrect: boolean
  computedAnswer: string
  explanation: string
  notes?: string
  usage?: ReviewUsage
}

/**
 * Ask AI to compute the answer to a given math question and return a canonical answer.
 * Returns usage info for credit tracking.
 */
export async function recomputeMathAnswer(question: string): Promise<{ 
  answer: string
  explanation: string
  usage: ReviewUsage
}> {
  if (!anthropic) {
    throw new Error('AI review service not available - ANTHROPIC_API_KEY not configured')
  }

  const prompt = `Solve the following math problem and return ONLY JSON with fields 
{"answer": "canonical string answer", "explanation": "concise explanation"}.

Rules:
- If the answer is a number, return it as a simplified integer or decimal string.
- If the answer is a fraction, return it as a simplified fraction like "3/4".
- Do not include units unless explicitly required by the question.
- Keep explanation short (1-3 sentences).

Problem: ${question}`

  // Use grading task defaults for recomputation
  const taskConfig = getTaskConfig('grading')
  const model = getDefaultModelForTier(taskConfig.recommendedTier)

  const response = await anthropic.messages.create({
    model: model.id,
    max_tokens: taskConfig.defaultMaxTokens,
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude when recomputing math answer')
  }

  let jsonText = content.text.trim()
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }

  const parsed = JSON.parse(jsonText)
  return { 
    answer: String(parsed.answer), 
    explanation: String(parsed.explanation),
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      model: model.id
    }
  }
}

/**
 * Verify a math problem by recomputing the answer and comparing against stored answer.
 * Returns usage info for credit tracking.
 */
export async function verifyMathProblem(problem: MathProblem): Promise<MathReviewResult> {
  const { answer: computedAnswer, explanation, usage } = await recomputeMathAnswer(problem.question)

  const normalizedComputed = normalizeMathAnswer(computedAnswer)
  const normalizedStored = normalizeMathAnswer(problem.correctAnswer)

  if (normalizedComputed === normalizedStored) {
    return { isCorrect: true, computedAnswer, explanation, usage }
  }

  // If both parse as numbers, allow tolerance
  const numComputed = parseFloat(normalizedComputed)
  const numStored = parseFloat(normalizedStored)
  if (!isNaN(numComputed) && !isNaN(numStored) && areNumbersEqual(numComputed, numStored)) {
    return { isCorrect: true, computedAnswer, explanation, notes: 'Accepted within numeric tolerance', usage }
  }

  return {
    isCorrect: false,
    computedAnswer,
    explanation,
    notes: `Stored answer mismatch. Stored: ${problem.correctAnswer}, Computed: ${computedAnswer}`,
    usage
  }
}




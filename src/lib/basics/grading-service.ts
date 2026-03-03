/**
 * Grading Service
 *
 * Business logic for AI-powered grading across all subjects.
 * Extracted from the /api/basics/ai-grade route handler.
 */

import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { withBasicsCreditTracking, checkBasicsBalance, insufficientBasicsCreditsError } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'
import { calculateAIGradedXP } from '@/lib/basics/xp-config'
import { executeWithFallback, getAnthropicClient } from '@/lib/ai/providers/anthropic-client'
import { triggerMoatUpdates } from '@/lib/basics/moat-systems-integration'
import { GRADING_PROMPTS } from '@/lib/ai/grading/prompts'
import { sanitizePromptInput } from '@/lib/sanitize'

const TAG = 'grading-service'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GradeRequest {
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  question: {
    text: string
    description?: string
    type?: string
    difficulty?: number
    options?: Array<{ label: string; text: string }>
    correctAnswer?: string
    hint?: string
    explanation?: string
    // For translations
    originalText?: string
    targetLanguage?: string
    // For math
    problemType?: string
    expectedFormat?: string
    // For reading
    passage?: string
    // Correct answers for reading questions (per-question validation)
    correctAnswers?: Array<{
      questionId: string
      correctAnswer?: string | string[]
      acceptableAnswers?: string[]
    }>
    // Additional context
    context?: string
  }
  userAnswer: string
  // Correct answer can be passed at top level or inside question
  correctAnswer?: string
  // For multi-part answers
  answerParts?: {
    [key: string]: string
  }
  // Time taken (for analytics)
  timeTaken?: number
}

export interface QuestionResult {
  questionId: string
  isCorrect: boolean
  score: number
  feedback: string
}

export interface GradeResponse {
  isCorrect: boolean
  score: number // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  feedback: {
    summary: string
    strengths: string[]
    improvements: string[]
    detailedExplanation: string
    correctAnswer?: string
    partialCredit?: {
      part: string
      score: number
      feedback: string
    }[]
  }
  // Per-question results for reading exercises
  questionResults?: QuestionResult[]
  correctCount?: number
  totalQuestions?: number
  xpEarned: number
  creditsUsed: number
}

export const VALID_SUBJECTS = ['math', 'reading', 'latin', 'greek', 'logic'] as const

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export function validateGradeRequest(body: GradeRequest): string | null {
  if (!body.subject || !body.question?.text || !body.userAnswer) {
    return 'Missing required fields: subject, question.text, userAnswer'
  }

  if (!VALID_SUBJECTS.includes(body.subject)) {
    return 'Invalid subject. Must be: math, reading, latin, greek, or logic'
  }

  return null
}

// ---------------------------------------------------------------------------
// Input sanitisation
// ---------------------------------------------------------------------------

export function sanitizeGradeRequest(body: GradeRequest): GradeRequest {
  const sanitized = { ...body }
  sanitized.userAnswer = sanitizePromptInput(sanitized.userAnswer)
  if (sanitized.answerParts) {
    const sanitizedParts: Record<string, string> = {}
    for (const key of Object.keys(sanitized.answerParts)) {
      sanitizedParts[key] = sanitizePromptInput(sanitized.answerParts[key])
    }
    sanitized.answerParts = sanitizedParts
  }
  return sanitized
}

// ---------------------------------------------------------------------------
// Prompt building
// ---------------------------------------------------------------------------

export function buildGradingPrompt(request: GradeRequest): string {
  const subjectPrompt = GRADING_PROMPTS[request.subject] || GRADING_PROMPTS.math

  let contextSection = ''

  // Build context based on subject
  if (request.question.originalText) {
    contextSection += `\nOriginal Text to Translate:\n"${request.question.originalText}"\n`
  }

  if (request.question.passage) {
    contextSection += `\nReading Passage:\n"${request.question.passage}"\n`
  }

  if (request.question.description) {
    contextSection += `\nProblem Description: ${request.question.description}\n`
  }

  if (request.question.options && request.question.options.length > 0) {
    contextSection += `\nAnswer Options:\n`
    request.question.options.forEach(opt => {
      contextSection += `  ${opt.label}) ${opt.text}\n`
    })
  }

  // Check for correctAnswer in both locations (top level or inside question)
  const correctAnswer = request.correctAnswer || request.question.correctAnswer
  if (correctAnswer) {
    contextSection += `\n**EXPECTED/CORRECT ANSWER: ${correctAnswer}**\n`
    contextSection += `(Compare the student's answer to this value to determine isCorrect)\n`
  }

  if (request.question.explanation) {
    contextSection += `\nOfficial Explanation: ${request.question.explanation}\n`
  }

  if (request.question.context) {
    contextSection += `\nAdditional Context: ${request.question.context}\n`
  }

  // Add difficulty information for math to enforce work requirements
  if (request.subject === 'math' && request.question.difficulty) {
    const difficulty = request.question.difficulty
    let workRequired = 'minimal'
    if (difficulty >= 5) {
      workRequired = 'MUST show full step-by-step work'
    } else if (difficulty >= 3) {
      workRequired = 'should show at least basic reasoning/steps'
    } else {
      workRequired = 'simple answer acceptable'
    }
    contextSection += `\n**DIFFICULTY LEVEL: ${difficulty}/10** - ${workRequired}\n`
  }

  if (request.answerParts && Object.keys(request.answerParts).length > 0) {
    contextSection += `\nStudent's Answer Parts:\n`
    Object.entries(request.answerParts).forEach(([key, value]) => {
      contextSection += `  ${key}: ${value}\n`
    })
  }

  // For reading with multiple questions, use per-question scoring
  if (request.subject === 'reading' && request.userAnswer.includes('{')) {
    // Build correct answers section if available
    let correctAnswersSection = ''
    if (request.question.correctAnswers && request.question.correctAnswers.length > 0) {
      correctAnswersSection = `\n\n**CORRECT ANSWERS FOR VALIDATION:**\n`
      request.question.correctAnswers.forEach((qa, idx) => {
        const correctAns = qa.correctAnswer
          ? (Array.isArray(qa.correctAnswer) ? qa.correctAnswer.join(' OR ') : qa.correctAnswer)
          : 'Not specified'
        const acceptable = qa.acceptableAnswers?.length
          ? ` (Also acceptable: ${qa.acceptableAnswers.join(', ')})`
          : ''
        correctAnswersSection += `Question ${idx + 1} (${qa.questionId}): ${correctAns}${acceptable}\n`
      })
      correctAnswersSection += `\n**IMPORTANT: Compare student answers to the correct answers above. An answer is correct ONLY if it matches the correct answer (or acceptable alternatives) in meaning.**\n`
    }

    return `${subjectPrompt}

---

PASSAGE & QUESTIONS:
${request.question.text}
${contextSection}${correctAnswersSection}
---

STUDENT'S ANSWERS (JSON format):
${request.userAnswer}

---

CRITICAL: Grade EACH question INDEPENDENTLY by comparing to the CORRECT ANSWERS provided above.
- If a correct answer is provided, the student's answer must match it in meaning to be correct
- Random gibberish, off-topic responses, or answers that don't address the question are ALWAYS incorrect
- Only accept answers that demonstrate understanding of the passage and question

Respond with a JSON object in this EXACT format:
{
  "isCorrect": false,
  "score": 50,
  "grade": "C",
  "questionResults": [
    {"questionId": "q1", "isCorrect": false, "score": 0, "feedback": "Feedback for Q1"},
    {"questionId": "q2", "isCorrect": true, "score": 100, "feedback": "Feedback for Q2"}
  ],
  "correctCount": 1,
  "totalQuestions": 2,
  "feedback": {
    "summary": "You answered 1 out of 2 questions correctly.",
    "strengths": ["What the student did well"],
    "improvements": ["What to work on"],
    "detailedExplanation": "Detailed per-question analysis"
  }
}

RULES:
- Score each question: 0 (wrong) or 100 (correct)
- Overall score = average of question scores
- isCorrect = true ONLY if ALL questions correct
- ALWAYS include questionResults array
- REJECT nonsense/gibberish answers as incorrect`
  }

  // Default prompt for other subjects
  const prompt = `${subjectPrompt}

---

QUESTION:
${request.question.text}
${contextSection}
---

STUDENT'S ANSWER:
${request.userAnswer}

---

Please evaluate the student's answer and respond with a JSON object in this exact format:
{
  "isCorrect": true/false,
  "score": 0-100,
  "grade": "A"/"B"/"C"/"D"/"F",
  "feedback": {
    "summary": "One sentence summary - START with 'Correct!' or 'Incorrect.' to be clear",
    "strengths": ["List of what the student did well - acknowledge correct answer if applicable"],
    "improvements": ["Specific suggestions for improvement"],
    "detailedExplanation": "Detailed explanation of the grading",
    "correctAnswer": "Show the correct answer with work (optional if student was correct)"
  }
}

**CRITICAL: COMPARE TO THE EXPECTED/CORRECT ANSWER PROVIDED ABOVE**
- isCorrect = TRUE if the student's answer MATCHES the Expected/Correct Answer
- isCorrect = FALSE if the student's answer DOES NOT MATCH the Expected/Correct Answer
- DO NOT recalculate the problem - TRUST the Expected/Correct Answer provided
- The SCORE can still be low for correct answers without work

Grade scale:
- A (90-100): Correct answer WITH work shown
- B (80-89): Correct answer with minor issues in work
- C (70-79): Correct answer but missing work for complex problem
- D (50-69): Correct answer but no work shown at all, OR wrong answer with good work
- F (0-49): Wrong answer with little/no work

Example: If Expected/Correct Answer is "4" and student answers "8":
- isCorrect=false (8 does not match 4)
- score=10-30, feedback explains the correct answer is 4

Example: If Expected/Correct Answer is "6" and student answers "6":
- isCorrect=true (6 matches 6)
- score=50-70 (no work shown), feedback acknowledges correctness`

  return prompt
}

// ---------------------------------------------------------------------------
// AI call + credit tracking
// ---------------------------------------------------------------------------

export interface GradingAIResult {
  /** The raw Anthropic message content */
  content: { type: string; text: string }
  costCharged: number
}

/**
 * Check the user's Basics credit balance before proceeding.
 * Returns `null` if balance is sufficient, otherwise a NextResponse error.
 */
export async function checkCredits(userId: string): Promise<NextResponse | null> {
  const balanceCheck = await checkBasicsBalance(userId)
  if (!balanceCheck.allowed) {
    logger.warn(TAG, 'Insufficient credits (Basics $1 limit)', {
      data: { userId, currentBalance: balanceCheck.currentBalance },
    })
    return insufficientBasicsCreditsError(balanceCheck.currentBalance, balanceCheck.minimumBalance)
  }
  return null
}

/**
 * Call the AI model for grading wrapped in credit tracking.
 *
 * Returns the first text content block plus cost, or throws on
 * unrecoverable Anthropic errors. If credit tracking itself fails it
 * returns a `NextResponse` that the route should forward directly.
 */
export async function callGradingAI(
  userId: string,
  prompt: string
): Promise<GradingAIResult | NextResponse> {
  const anthropic = getAnthropicClient()
  if (!anthropic) {
    throw new Error('AI service not available')
  }

  const requestedModel = await getModelForTask(userId, 'grading')
  const taskConfig = getTaskConfig('grading')

  const creditResult = await withBasicsCreditTracking(userId, 'ai-grade', async () => {
    const result = await executeWithFallback(
      requestedModel,
      'economy', // Grading uses economy tier
      async (model, client) => {
        const response = await client.messages.create({
          model,
          max_tokens: taskConfig.defaultMaxTokens,
          temperature: taskConfig.defaultTemperature,
          messages: [{ role: 'user', content: prompt }],
        })
        return { response, model }
      }
    )

    return {
      response: result.response,
      usage: result.response.usage,
      model: result.model, // Actual model used (may differ from requested)
    }
  })

  // Credit tracking returned an HTTP error (e.g. insufficient credits)
  if (creditResult instanceof NextResponse) {
    return creditResult
  }

  const content = creditResult.result.content[0]
  if (content.type !== 'text') {
    logger.error(TAG, 'Unexpected content type', { data: { type: content.type } })
    throw new Error('Unexpected response type from Claude')
  }

  return {
    content: content as { type: string; text: string },
    costCharged: creditResult.costCharged,
  }
}

/**
 * Map an Anthropic API error to a user-friendly error message.
 * Returns `null` if the error is not a recognized Anthropic status code
 * (the caller should re-throw in that case).
 */
export function mapAnthropicError(error: unknown): string | null {
  const status = (error as { status?: number })?.status
  if (status === 401) return 'AI service authentication failed'
  if (status === 429) return 'AI service is busy. Please try again in a moment.'
  if (status === 500 || status === 502 || status === 503) return 'AI service is temporarily unavailable'
  return null
}

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

const FALLBACK_GRADE_RESULT: Partial<GradeResponse> = {
  isCorrect: false,
  score: 0,
  grade: 'F',
  feedback: {
    summary: 'We had trouble grading your answer automatically.',
    strengths: ['You submitted an answer - keep trying!'],
    improvements: [
      'Make sure your answer is clear and complete',
      'For complex problems, show your work step by step',
      'Try rephrasing or reformatting your answer',
    ],
    detailedExplanation:
      'Our AI grading system encountered an issue processing your response. This can happen with unusual formatting or very complex answers. Please try again, and if the problem persists, contact support.',
  },
}

/**
 * Parse the raw AI text response into a structured grade result.
 * Falls back to a safe default when the response cannot be parsed.
 */
export function parseGradeResult(rawText: string): Partial<GradeResponse> {
  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      logger.error(TAG, 'No JSON found in response', { data: { response: rawText.substring(0, 200) } })
      throw new Error('No JSON found in response')
    }
    return JSON.parse(jsonMatch[0])
  } catch (parseError) {
    logger.error(TAG, 'Failed to parse AI response', {
      error: parseError,
      data: { rawText: rawText.substring(0, 500) },
    })
    return { ...FALLBACK_GRADE_RESULT }
  }
}

// ---------------------------------------------------------------------------
// XP calculation
// ---------------------------------------------------------------------------

function calculateXP(score: number, difficulty: number = 1): number {
  return calculateAIGradedXP({ score, difficulty })
}

export function computeXPEarned(
  gradeResult: Partial<GradeResponse>,
  subject: GradeRequest['subject'],
  difficulty: number
): number {
  const questionResults = (gradeResult as { questionResults?: QuestionResult[] }).questionResults
  const correctCount = (gradeResult as { correctCount?: number }).correctCount

  if (subject === 'reading' && questionResults && questionResults.length > 0) {
    const correctQuestions = questionResults.filter(q => q.isCorrect).length
    const baseXpPerQuestion = 5
    const difficultyMultiplier = 1.0 + (Math.min(difficulty, 12) * 0.1)
    return Math.round(correctQuestions * baseXpPerQuestion * difficultyMultiplier)
  }

  if (subject === 'reading' && correctCount !== undefined && correctCount > 0) {
    const baseXpPerQuestion = 5
    const difficultyMultiplier = 1.0 + (Math.min(difficulty, 12) * 0.1)
    return Math.round(correctCount * baseXpPerQuestion * difficultyMultiplier)
  }

  return calculateXP(gradeResult.score || 0, difficulty)
}

// ---------------------------------------------------------------------------
// Explanation cleanup
// ---------------------------------------------------------------------------

export function cleanDetailedExplanation(explanation: string | undefined): string {
  let text = explanation || ''

  // If the explanation looks like raw JSON, replace it with a user-friendly message
  if (text.trim().startsWith('{') && text.includes('"isCorrect"')) {
    return 'Review the feedback above for details on how to improve your answer.'
  }

  // If explanation contains JSON-like patterns, clean them up
  if (text.includes('{ "') || text.includes('{"')) {
    const jsonStart = Math.min(
      text.indexOf('{ "') >= 0 ? text.indexOf('{ "') : Infinity,
      text.indexOf('{"') >= 0 ? text.indexOf('{"') : Infinity
    )
    if (jsonStart > 20) {
      text = text.substring(0, jsonStart).trim()
    } else {
      return 'Review the feedback above for details on how to improve your answer.'
    }
  }

  return text
}

// ---------------------------------------------------------------------------
// Final response assembly
// ---------------------------------------------------------------------------

export function assembleGradeResponse(
  gradeResult: Partial<GradeResponse>,
  body: GradeRequest,
  costCharged: number
): GradeResponse {
  const xpEarned = computeXPEarned(gradeResult, body.subject, body.question.difficulty || 1)

  const questionResults = (gradeResult as { questionResults?: QuestionResult[] }).questionResults
  const correctCount = (gradeResult as { correctCount?: number }).correctCount

  return {
    isCorrect: gradeResult.isCorrect || false,
    score: gradeResult.score || 0,
    grade: gradeResult.grade || 'F',
    feedback: {
      summary: gradeResult.feedback?.summary || '',
      strengths: gradeResult.feedback?.strengths || [],
      improvements: gradeResult.feedback?.improvements || [],
      detailedExplanation: cleanDetailedExplanation(gradeResult.feedback?.detailedExplanation),
      correctAnswer: gradeResult.feedback?.correctAnswer,
    },
    questionResults,
    correctCount: correctCount ?? questionResults?.filter(q => q.isCorrect).length,
    totalQuestions: (gradeResult as { totalQuestions?: number }).totalQuestions ?? questionResults?.length,
    xpEarned,
    creditsUsed: costCharged,
  }
}

// ---------------------------------------------------------------------------
// Moat system side-effects (fire-and-forget)
// ---------------------------------------------------------------------------

export function fireMoatUpdates(userId: string, body: GradeRequest, response: GradeResponse): void {
  triggerMoatUpdates({
    userId,
    problemId: body.question.text.substring(0, 32).replace(/\W+/g, '_'),
    subject: body.subject,
    problemType: body.question.type || body.question.problemType || 'ai_graded',
    problemText: body.question.text,
    difficulty: body.question.difficulty || 1,
    userAnswer: body.userAnswer,
    correctAnswer: body.question.correctAnswer || '',
    isCorrect: response.isCorrect,
    timeSpentMs: (body.timeTaken || 60) * 1000,
    skills: [],
    explanation: body.question.explanation,
  })
}

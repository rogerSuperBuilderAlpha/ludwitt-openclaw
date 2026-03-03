/**
 * Answer Validation Service
 *
 * Validates user answers for both math and reading exercises.
 * Uses AI semantic matching for text-based math answers and reading comprehension.
 */

import Anthropic from '@anthropic-ai/sdk'
import { ReadingQuestion, ValidationResult, ReadingValidationResult } from '@/lib/types/basics'
import { isAIValidationAvailable, debugLog } from './config'
import { getDefaultModelForTier, getTaskConfig } from '@/lib/ai/providers'
import { logger } from '@/lib/logger'

// Cache for AI validation to avoid duplicate calls
const aiValidationCache = new Map<string, ValidationResult>()

/**
 * Normalize math answer for comparison
 * Removes spaces, commas, leading plus signs
 */
export function normalizeMathAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .replace(/\s+/g, '') // Remove all whitespace
    .replace(/,/g, '') // Remove commas
    .replace(/^\+/, '') // Remove leading +
    .trim()
}

/**
 * Check if two numbers are equal within tolerance
 * Default tolerance of 0.0001 handles floating point representation issues
 * while being strict enough that "1.23" won't match "1.24"
 */
export function areNumbersEqual(num1: number, num2: number, tolerance: number = 0.0001): boolean {
  return Math.abs(num1 - num2) < tolerance
}

/**
 * Parse a math answer string into a numeric value if possible.
 * Supports decimals, integers, fractions (a/b), mixed numbers (a b/c), and percentages (e.g., 50%).
 */
export function parseMathValue(raw: string): number | null {
  const s = raw.trim()
  if (!s) return null

  // Handle percentages
  if (/^[-+]?\d+(?:\.\d+)?%$/.test(s)) {
    const num = parseFloat(s.replace('%', ''))
    if (!isNaN(num)) return num / 100
  }

  // Handle mixed numbers: [-]?A B/C
  const mixedMatch = s.match(/^([-+])?(\d+)\s+(\d+)\/(\d+)$/)
  if (mixedMatch) {
    const sign = mixedMatch[1] === '-' ? -1 : 1
    const whole = parseInt(mixedMatch[2], 10)
    const num = parseInt(mixedMatch[3], 10)
    const den = parseInt(mixedMatch[4], 10)
    if (den === 0) return null  // Division by zero is invalid
    return sign * (whole + num / den)
  }

  // Handle simple fractions: [-+]?A/B
  const fracMatch = s.match(/^([-+])?(\d+)\/(\d+)$/)
  if (fracMatch) {
    const sign = fracMatch[1] === '-' ? -1 : 1
    const num = parseInt(fracMatch[2], 10)
    const den = parseInt(fracMatch[3], 10)
    if (den === 0) return null  // Division by zero is invalid
    return sign * (num / den)
  }

  // Fallback to float
  const num = parseFloat(s)
  // Reject NaN and Infinity values
  if (isNaN(num) || !isFinite(num)) return null
  return num
}

/**
 * Validate a math answer
 *
 * @param correctAnswer - The correct answer
 * @param userAnswer - User's submitted answer
 * @param acceptableAnswers - Alternative correct formats
 * @returns Validation result with feedback
 */
export async function validateMathAnswer(
  correctAnswer: string,
  userAnswer: string,
  acceptableAnswers?: string[]
): Promise<ValidationResult> {
  // Normalize both answers
  const normalizedCorrect = normalizeMathAnswer(correctAnswer)
  const normalizedUser = normalizeMathAnswer(userAnswer)

  // Check exact match
  if (normalizedUser === normalizedCorrect) {
    return {
      correct: true,
      feedback: 'Correct! Great job!',
      explanation: `Your answer of ${userAnswer} is correct.`
    }
  }

  // Check acceptable alternatives
  if (acceptableAnswers && acceptableAnswers.length > 0) {
    for (const alt of acceptableAnswers) {
      if (normalizeMathAnswer(alt) === normalizedUser) {
        return {
          correct: true,
          feedback: 'Correct! Great job!',
          explanation: `Your answer of ${userAnswer} is correct.`
        }
      }
    }
  }

  // Check numerical equivalence with tolerance (support fractions, mixed, percent)
  const preprocessForParse = (s: string) => s.trim().replace(/,/g, '').replace(/^\+/, '')
  const correctNum = parseMathValue(preprocessForParse(correctAnswer))
  const userNum = parseMathValue(preprocessForParse(userAnswer))

  if (correctNum !== null && userNum !== null) {
    if (areNumbersEqual(correctNum, userNum)) {
      return {
        correct: true,
        feedback: 'Correct! Great job!',
        explanation: `Your answer of ${userAnswer} is correct.`
      }
    }
  }

  // If either answer contains significant text (not just a number), use AI semantic matching
  // This handles cases like "perpendicular lines" vs "perpendicular"
  const containsText = (s: string) => /[a-zA-Z]{3,}/.test(s) // At least 3 letters
  if (containsText(userAnswer) || containsText(correctAnswer)) {
    const aiResult = await validateMathAnswerWithAI(correctAnswer, userAnswer, acceptableAnswers)
    if (aiResult) return aiResult
  }

  // Answer is incorrect
  return {
    correct: false,
    feedback: 'Not quite right.',
    explanation: `The correct answer is ${correctAnswer}.`
  }
}

/**
 * Use AI to validate text-based math answers semantically
 * 
 * Handles cases like:
 * - "perpendicular lines" ≈ "perpendicular"
 * - "right angle" ≈ "90 degrees" 
 * - "obtuse" ≈ "obtuse angle"
 */
async function validateMathAnswerWithAI(
  correctAnswer: string,
  userAnswer: string,
  acceptableAnswers?: string[]
): Promise<ValidationResult | null> {
  // Check if AI validation is available
  if (!isAIValidationAvailable()) {
    debugLog('AI validation not available for math answer')
    return null
  }

  // Check cache first
  const cacheKey = `math:${correctAnswer.toLowerCase()}:${userAnswer.toLowerCase()}`
  if (aiValidationCache.has(cacheKey)) {
    return aiValidationCache.get(cacheKey)!
  }

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
    dangerouslyAllowBrowser: process.env.NODE_ENV === 'test'
  })

  // Build list of all acceptable answers
  const allAcceptable = [correctAnswer, ...(acceptableAnswers || [])]
    .map(a => `"${a}"`)
    .join(', ')

  const prompt = `You are grading a math answer. Determine if the student's answer is semantically equivalent to the correct answer.

Correct Answer(s): ${allAcceptable}
Student's Answer: "${userAnswer}"

IMPORTANT RULES:
1. Accept answers that mean the same thing, even if worded differently
2. "perpendicular lines" = "perpendicular" = "lines are perpendicular" 
3. "right angle" = "90 degrees" = "90°"
4. "parallel" = "parallel lines"
5. Ignore extra words like "the", "a", "lines", "angle" if the core concept matches
6. Be GENEROUS - if the student clearly knows the concept, accept it
7. Minor spelling errors are OK if the meaning is clear

Return ONLY a JSON object:
{
  "correct": true or false,
  "feedback": "Brief explanation"
}

Return ONLY the JSON, no additional text.`

  try {
    const taskConfig = getTaskConfig('grading')
    const model = getDefaultModelForTier(taskConfig.recommendedTier)
    
    const response = await anthropic.messages.create({
      model: model.id,
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }]
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Parse JSON
    let jsonText = content.text.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }
    const result = JSON.parse(jsonText)

    // Validate JSON structure - ensure required fields exist
    if (typeof result.correct !== 'boolean') {
      logger.error('Validation', 'AI validation returned invalid JSON structure', { error: result })
      return null // Fall back to exact match logic
    }

    const validationResult: ValidationResult = {
      correct: result.correct,
      feedback: result.correct ? 'Correct! Great job!' : result.feedback || 'Not quite right.',
      explanation: result.correct
        ? `Your answer of "${userAnswer}" is correct.`
        : `The correct answer is ${correctAnswer}.`
    }

    // Cache the result
    aiValidationCache.set(cacheKey, validationResult)
    
    return validationResult
  } catch (error) {
    logger.error('Validation', 'Error in AI math validation', { error: error })
    debugLog('AI math validation failed, falling back to exact match')
    return null // Return null to indicate fallback to exact match logic
  }
}

/**
 * Validate a reading exercise (all questions)
 *
 * @param questions - Array of questions with correct answers
 * @param userAnswers - Map of questionId to user's answer
 * @returns Validation result for the entire exercise
 */
export async function validateReadingAnswer(
  questions: ReadingQuestion[],
  userAnswers: Record<string, string>
): Promise<ReadingValidationResult> {
  let totalCorrect = 0
  const questionResults: { questionId: string; correct: boolean; feedback: string }[] = []

  for (const question of questions) {
    const userAnswer = userAnswers[question.id]

    if (!userAnswer || !userAnswer.trim()) {
      questionResults.push({
        questionId: question.id,
        correct: false,
        feedback: 'Not answered'
      })
      continue
    }

    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      // Exact match for multiple choice / true-false
      const correct = userAnswer.toLowerCase().trim() ===
                     (question.correctAnswer as string).toLowerCase().trim()

      if (correct) totalCorrect++

      questionResults.push({
        questionId: question.id,
        correct,
        feedback: correct ? 'Correct' : `Correct answer: ${question.correctAnswer}`
      })
    } else {
      // Use AI for short answer validation
      const validation = await validateShortAnswer(
        question.question,
        question.correctAnswer as string,
        userAnswer
      )

      if (validation.correct) totalCorrect++

      questionResults.push({
        questionId: question.id,
        correct: validation.correct,
        feedback: validation.feedback
      })
    }
  }

  // Guard against division by zero for empty question arrays
  if (questions.length === 0) {
    return {
      correct: true,
      feedback: 'No questions to answer',
      explanation: '',
      questionResults: []
    }
  }

  const correct = totalCorrect === questions.length
  const accuracy = Math.round((totalCorrect / questions.length) * 100)

  return {
    correct,
    feedback: correct
      ? 'All correct! Excellent comprehension!'
      : `You got ${totalCorrect} out of ${questions.length} correct (${accuracy}%)`,
    explanation: questionResults.map(r =>
      `Question ${r.questionId}: ${r.correct ? '✓' : '✗'} - ${r.feedback}`
    ).join('\n'),
    questionResults
  }
}

/**
 * Fallback validation using keyword matching
 */
function fallbackValidation(correctAnswer: string, userAnswer: string): ValidationResult {
  const userLower = userAnswer.toLowerCase()
  const correctLower = correctAnswer.toLowerCase()
  const keywords = correctLower.split(/\s+/).filter(w => w.length > 3)
  const matchCount = keywords.filter(k => userLower.includes(k)).length
  const matchRatio = keywords.length > 0 ? matchCount / keywords.length : 0

  if (matchRatio >= 0.5) {
    return {
      correct: true,
      feedback: 'Correct! Your answer captures the key ideas.',
      explanation: 'Answer accepted based on keyword match'
    }
  } else {
    return {
      correct: false,
      feedback: 'Not quite. The answer should include key concepts from the passage.',
      explanation: `Expected answer: ${correctAnswer}`
    }
  }
}

/**
 * Use AI to validate a short answer question semantically
 *
 * @param question - The question text
 * @param correctAnswer - Expected answer
 * @param userAnswer - User's answer
 * @returns Validation result
 */
export async function validateShortAnswer(
  question: string,
  correctAnswer: string,
  userAnswer: string
): Promise<ValidationResult> {
  // Check if AI validation is available
  if (!isAIValidationAvailable()) {
    debugLog('AI validation not available, using fallback keyword matching')
    return fallbackValidation(correctAnswer, userAnswer)
  }

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
    // Prevent accidental usage in browser-like envs during tests
    dangerouslyAllowBrowser: process.env.NODE_ENV === 'test'
  })
  const prompt = `Evaluate if the student's answer demonstrates understanding of the question.

Question: ${question}
Expected Answer: ${correctAnswer}
Student Answer: ${userAnswer}

Criteria:
- Accept answers that capture key concepts, even if worded differently
- Ignore minor spelling/grammar errors (unless they change meaning)
- Focus on understanding, not exact wording
- Be generous with partial credit if they show comprehension
- Accept paraphrased answers that convey the same meaning

Return ONLY a JSON object in this exact format:
{
  "correct": true or false,
  "feedback": "Brief explanation of why the answer is correct or incorrect"
}

Return ONLY the JSON, no additional text before or after.`

  try {
    // Use grading task defaults
    const taskConfig = getTaskConfig('grading')
    const model = getDefaultModelForTier(taskConfig.recommendedTier)
    
    const response = await anthropic.messages.create({
      model: model.id,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }]
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Parse JSON (strip markdown code blocks if present)
    let jsonText = content.text.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }
    const result = JSON.parse(jsonText)

    // Validate JSON structure - ensure required fields exist
    if (typeof result.correct !== 'boolean') {
      logger.error('Validation', 'AI short answer validation returned invalid JSON structure', { error: result })
      return fallbackValidation(correctAnswer, userAnswer)
    }

    return {
      correct: result.correct,
      feedback: result.correct ? 'Correct!' : result.feedback || 'Not quite right.',
      explanation: result.feedback || ''
    }
  } catch (error) {
    logger.error('Validation', 'Error validating short answer', { error: error })
    debugLog('Falling back to keyword matching due to AI error')
    return fallbackValidation(correctAnswer, userAnswer)
  }
}

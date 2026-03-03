/**
 * Math Answer Validation Engine
 * Validates user answers against correct answers with support for:
 * - Equivalent expressions (x+1 = 1+x)
 * - Format variations (1/2 = 0.5 = 2/4)
 * - Notation variations (x^2 = x², sqrt = √, pi = π)
 * - Different minus signs (- vs −)
 * - Numeric comparison with precision tolerance
 */

import {
  normalizeExpression,
  compareExpressions,
  parseLatex,
  evaluateExpression,
  type ComparisonResult,
} from './expression-parser'

/**
 * Result of answer validation
 */
export interface ValidationResult {
  /** Whether the answer is correct */
  isCorrect: boolean
  /** The user's answer after normalization */
  normalizedUserAnswer: string
  /** The correct answer after normalization */
  normalizedCorrectAnswer: string
  /** How the match was determined */
  matchType: 'exact' | 'numeric' | 'algebraic' | 'format' | 'notation' | 'none'
  /** Optional feedback message */
  feedback?: string
  /** Confidence level of the match (0-1) */
  confidence: number
  /** Debug information */
  debug?: ValidationDebugInfo
}

/**
 * Debug information for validation
 */
export interface ValidationDebugInfo {
  userParsed: ReturnType<typeof parseLatex>
  correctParsed: ReturnType<typeof parseLatex>
  comparisonResult: ComparisonResult
  checksPerformed: string[]
}

/**
 * Configuration options for validation
 */
export interface ValidationConfig {
  /** Precision tolerance for numeric comparisons (default: 1e-9) */
  precision?: number
  /** Whether to allow equivalent expressions (default: true) */
  allowEquivalent?: boolean
  /** Whether to include debug info in result (default: false) */
  includeDebug?: boolean
  /** Expected answer type to enforce stricter matching */
  expectedType?: 'numeric' | 'algebraic' | 'equation' | 'inequality'
  /** Whether to treat fractions and decimals as equivalent (default: true) */
  allowFractionDecimalEquivalence?: boolean
  /** Case sensitivity for variables (default: false) */
  caseSensitive?: boolean
}

const DEFAULT_CONFIG: Required<ValidationConfig> = {
  precision: 1e-9,
  allowEquivalent: true,
  includeDebug: false,
  expectedType: undefined as unknown as 'numeric',
  allowFractionDecimalEquivalence: true,
  caseSensitive: false,
}

/**
 * Validates a user's answer against the correct answer
 */
export function validateAnswer(
  userAnswer: string,
  correctAnswer: string,
  config: ValidationConfig = {}
): ValidationResult {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }
  const checksPerformed: string[] = []

  // Handle empty inputs
  if (!userAnswer || !correctAnswer) {
    return {
      isCorrect: false,
      normalizedUserAnswer: normalizeExpression(userAnswer || ''),
      normalizedCorrectAnswer: normalizeExpression(correctAnswer || ''),
      matchType: 'none',
      feedback: 'Answer cannot be empty',
      confidence: 0,
    }
  }

  // Parse both expressions
  const userParsed = parseLatex(userAnswer)
  const correctParsed = parseLatex(correctAnswer)

  checksPerformed.push('parsing')

  // Check for exact match after normalization
  if (userParsed.normalized === correctParsed.normalized) {
    checksPerformed.push('exact_match')
    return createResult({
      isCorrect: true,
      userParsed,
      correctParsed,
      matchType: 'exact',
      confidence: 1.0,
      checksPerformed,
      config: mergedConfig,
    })
  }

  // Numeric comparison
  checksPerformed.push('numeric_comparison')
  const numericResult = checkNumericEquivalence(userParsed, correctParsed, mergedConfig)
  if (numericResult.equivalent) {
    return createResult({
      isCorrect: true,
      userParsed,
      correctParsed,
      matchType: 'numeric',
      confidence: numericResult.confidence,
      checksPerformed,
      config: mergedConfig,
    })
  }

  // Fraction/decimal equivalence check
  if (mergedConfig.allowFractionDecimalEquivalence) {
    checksPerformed.push('fraction_decimal_equivalence')
    const fractionResult = checkFractionDecimalEquivalence(
      userParsed.normalized,
      correctParsed.normalized,
      mergedConfig.precision
    )
    if (fractionResult.equivalent) {
      return createResult({
        isCorrect: true,
        userParsed,
        correctParsed,
        matchType: 'format',
        confidence: fractionResult.confidence,
        checksPerformed,
        config: mergedConfig,
      })
    }
  }

  // Equivalent expression check
  if (mergedConfig.allowEquivalent) {
    checksPerformed.push('equivalent_expression')
    const comparisonResult = compareExpressions(
      userAnswer,
      correctAnswer,
      mergedConfig.precision
    )
    if (comparisonResult.equivalent) {
      return createResult({
        isCorrect: true,
        userParsed,
        correctParsed,
        matchType: comparisonResult.matchType,
        confidence: comparisonResult.confidence,
        checksPerformed,
        config: mergedConfig,
        comparisonResult,
      })
    }
  }

  // Equation value extraction (x = 4 matches 4)
  checksPerformed.push('equation_value_extraction')
  const equationResult = checkEquationMatch(userParsed, correctParsed, mergedConfig.precision)
  if (equationResult.equivalent) {
    return createResult({
      isCorrect: true,
      userParsed,
      correctParsed,
      matchType: 'format',
      confidence: equationResult.confidence,
      checksPerformed,
      config: mergedConfig,
    })
  }

  // Square root evaluation (√4 = 2)
  checksPerformed.push('sqrt_evaluation')
  const sqrtResult = checkSqrtEquivalence(userParsed, correctParsed, mergedConfig.precision)
  if (sqrtResult.equivalent) {
    return createResult({
      isCorrect: true,
      userParsed,
      correctParsed,
      matchType: 'numeric',
      confidence: sqrtResult.confidence,
      checksPerformed,
      config: mergedConfig,
    })
  }

  // No match found
  return createResult({
    isCorrect: false,
    userParsed,
    correctParsed,
    matchType: 'none',
    confidence: 0,
    checksPerformed,
    config: mergedConfig,
    feedback: generateFeedback(userParsed, correctParsed),
  })
}

interface CreateResultParams {
  isCorrect: boolean
  userParsed: ReturnType<typeof parseLatex>
  correctParsed: ReturnType<typeof parseLatex>
  matchType: ValidationResult['matchType']
  confidence: number
  checksPerformed: string[]
  config: Required<ValidationConfig>
  feedback?: string
  comparisonResult?: ComparisonResult
}

/**
 * Creates a validation result object
 */
function createResult(params: CreateResultParams): ValidationResult {
  const result: ValidationResult = {
    isCorrect: params.isCorrect,
    normalizedUserAnswer: params.userParsed.normalized,
    normalizedCorrectAnswer: params.correctParsed.normalized,
    matchType: params.matchType,
    confidence: params.confidence,
  }

  if (params.feedback) {
    result.feedback = params.feedback
  }

  if (params.config.includeDebug) {
    result.debug = {
      userParsed: params.userParsed,
      correctParsed: params.correctParsed,
      comparisonResult: params.comparisonResult || {
        equivalent: params.isCorrect,
        matchType: params.matchType,
        confidence: params.confidence,
      },
      checksPerformed: params.checksPerformed,
    }
  }

  return result
}

/**
 * Checks numeric equivalence between two parsed expressions
 */
function checkNumericEquivalence(
  userParsed: ReturnType<typeof parseLatex>,
  correctParsed: ReturnType<typeof parseLatex>,
  config: Required<ValidationConfig>
): { equivalent: boolean; confidence: number } {
  const userValue = userParsed.numericValue
  const correctValue = correctParsed.numericValue

  if (userValue === undefined || correctValue === undefined) {
    return { equivalent: false, confidence: 0 }
  }

  const diff = Math.abs(userValue - correctValue)
  const maxVal = Math.max(Math.abs(userValue), Math.abs(correctValue), 1)
  const relativeDiff = diff / maxVal

  if (relativeDiff < config.precision) {
    return { equivalent: true, confidence: 1.0 - relativeDiff }
  }

  return { equivalent: false, confidence: 0 }
}

/**
 * Checks if a fraction and decimal are equivalent
 * e.g., 1/2 = 0.5 = 2/4
 */
function checkFractionDecimalEquivalence(
  expr1: string,
  expr2: string,
  precision: number
): { equivalent: boolean; confidence: number } {
  const val1 = evaluateFractionOrDecimal(expr1)
  const val2 = evaluateFractionOrDecimal(expr2)

  if (val1 === undefined || val2 === undefined) {
    return { equivalent: false, confidence: 0 }
  }

  const diff = Math.abs(val1 - val2)
  const maxVal = Math.max(Math.abs(val1), Math.abs(val2), 1)
  const relativeDiff = diff / maxVal

  if (relativeDiff < precision) {
    return { equivalent: true, confidence: 1.0 - relativeDiff }
  }

  return { equivalent: false, confidence: 0 }
}

/**
 * Evaluates a fraction or decimal string to a number
 */
function evaluateFractionOrDecimal(expr: string): number | undefined {
  // Try direct number parse
  const directParse = parseFloat(expr)
  if (!isNaN(directParse)) {
    return directParse
  }

  // Try fraction format: a/b
  const fractionMatch = expr.match(/^(-?\d+\.?\d*)\/(-?\d+\.?\d*)$/)
  if (fractionMatch) {
    const numerator = parseFloat(fractionMatch[1])
    const denominator = parseFloat(fractionMatch[2])
    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return numerator / denominator
    }
  }

  // Try normalized expression evaluation
  return evaluateExpression(expr)
}

/**
 * Checks if an equation value matches a standalone value
 * e.g., "x = 4" matches "4", "4.0", etc.
 */
function checkEquationMatch(
  parsed1: ReturnType<typeof parseLatex>,
  parsed2: ReturnType<typeof parseLatex>,
  precision: number
): { equivalent: boolean; confidence: number } {
  // Determine which is the equation and which is the value
  let equation: ReturnType<typeof parseLatex> | null = null
  let value: ReturnType<typeof parseLatex> | null = null

  if (parsed1.type === 'equation' && parsed2.type !== 'equation') {
    equation = parsed1
    value = parsed2
  } else if (parsed2.type === 'equation' && parsed1.type !== 'equation') {
    equation = parsed2
    value = parsed1
  } else {
    return { equivalent: false, confidence: 0 }
  }

  // Extract value from equation
  const eqParts = equation.normalized.split('=')
  if (eqParts.length !== 2) {
    return { equivalent: false, confidence: 0 }
  }

  const eqValue = eqParts[1].trim()
  const eqValueNum = evaluateFractionOrDecimal(eqValue)
  const valueNum = evaluateFractionOrDecimal(value.normalized)

  // Compare numerically
  if (eqValueNum !== undefined && valueNum !== undefined) {
    const diff = Math.abs(eqValueNum - valueNum)
    const maxVal = Math.max(Math.abs(eqValueNum), Math.abs(valueNum), 1)
    const relativeDiff = diff / maxVal

    if (relativeDiff < precision) {
      return { equivalent: true, confidence: 0.9 * (1.0 - relativeDiff) }
    }
  }

  // Compare as strings
  if (eqValue === value.normalized) {
    return { equivalent: true, confidence: 0.9 }
  }

  return { equivalent: false, confidence: 0 }
}

/**
 * Checks square root equivalence (√4 = 2)
 */
function checkSqrtEquivalence(
  parsed1: ReturnType<typeof parseLatex>,
  parsed2: ReturnType<typeof parseLatex>,
  precision: number
): { equivalent: boolean; confidence: number } {
  // Check if one expression is a sqrt and the other is numeric
  const sqrt1 = parsed1.normalized.includes('sqrt')
  const sqrt2 = parsed2.normalized.includes('sqrt')

  if (!sqrt1 && !sqrt2) {
    return { equivalent: false, confidence: 0 }
  }

  // Both should have numeric values for comparison
  const val1 = parsed1.numericValue
  const val2 = parsed2.numericValue

  if (val1 === undefined || val2 === undefined) {
    return { equivalent: false, confidence: 0 }
  }

  const diff = Math.abs(val1 - val2)
  const maxVal = Math.max(Math.abs(val1), Math.abs(val2), 1)
  const relativeDiff = diff / maxVal

  if (relativeDiff < precision) {
    return { equivalent: true, confidence: 1.0 - relativeDiff }
  }

  return { equivalent: false, confidence: 0 }
}

/**
 * Generates feedback for incorrect answers
 */
function generateFeedback(
  userParsed: ReturnType<typeof parseLatex>,
  correctParsed: ReturnType<typeof parseLatex>
): string {
  // Type mismatch feedback
  if (userParsed.type !== correctParsed.type) {
    if (correctParsed.type === 'equation') {
      return 'Your answer should be in the form of an equation (e.g., x = 4)'
    }
    if (correctParsed.type === 'inequality') {
      return 'Your answer should be an inequality (e.g., x > 3)'
    }
    if (correctParsed.type === 'numeric') {
      return 'Your answer should be a number'
    }
  }

  // Close numeric answer
  if (userParsed.numericValue !== undefined && correctParsed.numericValue !== undefined) {
    const diff = Math.abs(userParsed.numericValue - correctParsed.numericValue)
    if (diff < 1 && diff > 0.001) {
      return 'Your answer is close but not quite right. Check your calculation.'
    }
  }

  return 'Your answer does not match the expected answer'
}

/**
 * Batch validates multiple answers
 */
export function validateAnswers(
  answers: Array<{ userAnswer: string; correctAnswer: string }>,
  config: ValidationConfig = {}
): ValidationResult[] {
  return answers.map(({ userAnswer, correctAnswer }) =>
    validateAnswer(userAnswer, correctAnswer, config)
  )
}

/**
 * Checks if two expressions are mathematically equivalent
 * Convenience function for quick checks
 */
export function areEquivalent(
  expr1: string,
  expr2: string,
  config: ValidationConfig = {}
): boolean {
  const result = validateAnswer(expr1, expr2, config)
  return result.isCorrect
}

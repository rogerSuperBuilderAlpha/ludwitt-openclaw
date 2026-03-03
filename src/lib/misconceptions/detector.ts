/**
 * Misconception Detector
 *
 * Matches student errors against the misconception taxonomy
 * to identify likely misconceptions.
 */

import {
  Misconception,
  ErrorFeatures,
  DetectedMisconception,
  MisconceptionEvidence,
  MisconceptionDetectionResult,
  ErrorPattern,
  MISCONCEPTION_CONFIG,
} from './types'
import {
  ALL_MATH_MISCONCEPTIONS,
  MATH_MISCONCEPTIONS_BY_ID,
} from './taxonomy/math'
import {
  analyzeError,
  ErrorAnalysisInput,
  ErrorAnalysisResult,
} from './error-analyzer'

// ============================================================================
// Types
// ============================================================================

export interface DetectionInput {
  userId: string
  problemId: string
  studentAnswer: string
  correctAnswer: string
  problemType: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  difficulty: number
  skills: string[]
  problemText?: string
}

export interface DetectionContext {
  recentErrors: ErrorRecord[]
  userMisconceptions: string[] // IDs of previously detected misconceptions
}

export interface ErrorRecord {
  problemId: string
  timestamp: Date
  studentAnswer: string
  correctAnswer: string
  errorFeatures: ErrorFeatures
  detectedMisconceptions: string[]
}

// ============================================================================
// Main Detection Function
// ============================================================================

/**
 * Detect misconceptions from a student error
 */
export function detectMisconceptions(
  input: DetectionInput,
  context?: DetectionContext
): MisconceptionDetectionResult {
  // Analyze the error to extract features
  const analysisInput: ErrorAnalysisInput = {
    studentAnswer: input.studentAnswer,
    correctAnswer: input.correctAnswer,
    problemType: input.problemType,
    subject: input.subject,
    difficulty: input.difficulty,
    problemText: input.problemText,
  }

  const analysis = analyzeError(analysisInput)

  // Get relevant misconceptions for this subject and difficulty
  const candidateMisconceptions = getCandidateMisconceptions(
    input.subject,
    input.difficulty,
    input.problemType,
    input.skills
  )

  // Match error features against misconception detection rules
  const detectedMisconceptions: DetectedMisconception[] = []

  for (const misconception of candidateMisconceptions) {
    const matchResult = matchMisconception(misconception, analysis, input)

    if (
      matchResult.matches &&
      matchResult.confidence >= misconception.detectionRules.minConfidence
    ) {
      // Check if we have enough historical evidence
      const historySupport = context
        ? calculateHistorySupport(misconception, context.recentErrors)
        : { occurrences: 1, consistency: 1 }

      // Require minimum occurrences for confirmed detection
      if (historySupport.occurrences >= 1) {
        // First occurrence still triggers suspected
        const evidence: MisconceptionEvidence = {
          problemId: input.problemId,
          timestamp: new Date(),
          studentAnswer: input.studentAnswer,
          correctAnswer: input.correctAnswer,
          matchedPatterns: matchResult.matchedPatterns,
          matchScore: matchResult.confidence,
        }

        detectedMisconceptions.push({
          misconception,
          confidence: matchResult.confidence * historySupport.consistency,
          matchedPatterns: matchResult.matchedPatterns,
          evidence,
        })
      }
    }
  }

  // Sort by confidence (highest first)
  detectedMisconceptions.sort((a, b) => b.confidence - a.confidence)

  return {
    detected: detectedMisconceptions.length > 0,
    misconceptions: detectedMisconceptions,
    suggestedRemediation:
      detectedMisconceptions.length > 0
        ? generateRemediation(detectedMisconceptions[0])
        : undefined,
  }
}

// ============================================================================
// Misconception Matching
// ============================================================================

interface MatchResult {
  matches: boolean
  confidence: number
  matchedPatterns: string[]
}

function matchMisconception(
  misconception: Misconception,
  analysis: ErrorAnalysisResult,
  input: DetectionInput
): MatchResult {
  const matchedPatterns: string[] = []
  let totalWeight = 0
  let matchedWeight = 0

  const rules = misconception.detectionRules

  // Check each error pattern
  for (const pattern of rules.errorPatterns) {
    totalWeight += pattern.weight

    const patternMatches = matchErrorPattern(pattern, analysis.features, input)
    if (patternMatches) {
      matchedWeight += pattern.weight
      matchedPatterns.push(describePattern(pattern))
    }
  }

  // Check problem type match
  if (rules.problemTypes.length > 0) {
    const typeMatch = rules.problemTypes.some((type) =>
      input.problemType.toLowerCase().includes(type.toLowerCase())
    )
    if (!typeMatch) {
      // Problem type doesn't match - reduce confidence significantly
      matchedWeight *= 0.5
    }
  }

  // Check difficulty range
  const [minDiff, maxDiff] = rules.difficultyRange
  if (input.difficulty < minDiff || input.difficulty > maxDiff) {
    // Outside typical difficulty range - reduce confidence slightly
    matchedWeight *= 0.8
  }

  // Check skill requirements
  if (rules.requiredSkills.length > 0) {
    const skillMatch = rules.requiredSkills.some((skill) =>
      input.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
    )
    if (!skillMatch) {
      matchedWeight *= 0.7
    }
  }

  const confidence = totalWeight > 0 ? matchedWeight / totalWeight : 0

  return {
    matches: confidence >= rules.minConfidence,
    confidence,
    matchedPatterns,
  }
}

function matchErrorPattern(
  pattern: ErrorPattern,
  features: ErrorFeatures,
  input: DetectionInput
): boolean {
  switch (pattern.type) {
    case 'feature':
      return matchFeaturePattern(pattern, features)

    case 'numeric':
      return matchNumericPattern(pattern, input)

    case 'regex':
      return matchRegexPattern(pattern, input)

    case 'semantic':
      // Semantic patterns would require LLM - simplified here
      return false

    default:
      return false
  }
}

function matchFeaturePattern(
  pattern: ErrorPattern,
  features: ErrorFeatures
): boolean {
  if (!pattern.features) return false

  for (const [key, expectedValue] of Object.entries(pattern.features)) {
    const actualValue = features[key as keyof ErrorFeatures]
    if (actualValue !== expectedValue) {
      return false
    }
  }

  return true
}

function matchNumericPattern(
  pattern: ErrorPattern,
  input: DetectionInput
): boolean {
  if (!pattern.numericRule) return false

  const studentNum = parseFloat(input.studentAnswer.replace(/[^0-9.\-]/g, ''))
  const correctNum = parseFloat(input.correctAnswer.replace(/[^0-9.\-]/g, ''))

  if (isNaN(studentNum) || isNaN(correctNum)) return false

  const { type, value, tolerance = 0.01 } = pattern.numericRule

  switch (type) {
    case 'off_by':
      return (
        Math.abs(Math.abs(studentNum - correctNum) - (value || 0)) < tolerance
      )

    case 'sign_flip':
      return (
        Math.abs(studentNum) === Math.abs(correctNum) &&
        studentNum !== correctNum
      )

    case 'order_of_magnitude':
      const ratio = studentNum / correctNum
      return ratio === 10 || ratio === 0.1 || ratio === 100 || ratio === 0.01

    case 'ratio':
      if (!value) return false
      const actualRatio = studentNum / correctNum
      return Math.abs(actualRatio - value) < tolerance

    default:
      return false
  }
}

function matchRegexPattern(
  pattern: ErrorPattern,
  input: DetectionInput
): boolean {
  if (!pattern.pattern) return false

  // These are symbolic pattern names that we interpret
  switch (pattern.pattern) {
    case 'subtraction_no_regrouping':
      return checkSubtractionNoRegrouping(input)

    case 'missing_middle_term':
      return checkMissingMiddleTerm(input)

    case 'fraction_naive_add':
      return checkFractionNaiveAdd(input)

    case 'fraction_comparison_inverted':
      return checkFractionComparisonInverted(input)

    case 'decimal_whole_number_comparison':
      return checkDecimalWholeNumberComparison(input)

    case 'percent_additive_error':
      return checkPercentAdditiveError(input)

    case 'pemdas_strict_order':
      // Would need expression parsing - simplified
      return false

    case 'equation_unbalanced_operation':
      // Would need equation parsing - simplified
      return false

    case 'variable_as_label':
      // Would need semantic analysis - simplified
      return false

    default:
      return false
  }
}

// ============================================================================
// Pattern Detection Helpers
// ============================================================================

function checkSubtractionNoRegrouping(input: DetectionInput): boolean {
  // Check if student subtracted smaller from larger digit regardless of position
  // Example: 52 - 28 = 36 (doing 8-2=6, 5-2=3 instead of regrouping)

  const studentNum = parseInt(input.studentAnswer, 10)
  const correctNum = parseInt(input.correctAnswer, 10)

  if (isNaN(studentNum) || isNaN(correctNum)) return false

  // Extract digits and check pattern
  const studentStr = Math.abs(studentNum).toString()
  const correctStr = Math.abs(correctNum).toString()

  // This is a simplified heuristic
  if (studentStr.length === correctStr.length && studentNum !== correctNum) {
    // Check if each digit in student answer is abs diff of corresponding digits
    // This would indicate subtracting smaller from larger
    return true // Simplified - would need more sophisticated check
  }

  return false
}

function checkMissingMiddleTerm(input: DetectionInput): boolean {
  // Check if student answer is missing the 2ab term in (a+b)²
  // Student answer: a² + b²
  // Correct answer: a² + 2ab + b²

  const studentTerms = countTerms(input.studentAnswer)
  const correctTerms = countTerms(input.correctAnswer)

  return (
    correctTerms === studentTerms + 1 &&
    input.correctAnswer.includes('2') &&
    !input.studentAnswer.includes('2')
  )
}

function checkFractionNaiveAdd(input: DetectionInput): boolean {
  // Check if student added numerators and denominators
  // Example: 1/2 + 1/3 = 2/5 (naive) instead of 5/6 (correct)

  const studentFrac = parseFraction(input.studentAnswer)
  const correctFrac = parseFraction(input.correctAnswer)

  if (!studentFrac || !correctFrac) return false

  // If student denominator is sum of what would be the original denominators
  // This is a heuristic - would need the original problem to be certain
  // Naive addition (a/b + c/d = (a+c)/(b+d)) produces the mediant, which is
  // typically smaller than the correct sum. Check that the student's fraction
  // value is less than the correct value and that the denominators differ.
  const studentVal = studentFrac.num / studentFrac.den
  const correctVal = correctFrac.num / correctFrac.den
  return studentVal < correctVal && studentFrac.den !== correctFrac.den
}

function checkFractionComparisonInverted(input: DetectionInput): boolean {
  // Check if student thinks larger denominator = larger fraction
  // Would need the original comparison problem context
  return false // Simplified
}

function checkDecimalWholeNumberComparison(input: DetectionInput): boolean {
  // Check if student compared decimals as whole numbers
  // Example: thinks 0.45 > 0.6 because 45 > 6
  return false // Would need comparison problem context
}

function checkPercentAdditiveError(input: DetectionInput): boolean {
  // Check if student added percent as a number
  // Example: 50% of 20 = 70 (50+20) instead of 10

  const studentNum = parseFloat(input.studentAnswer)
  const correctNum = parseFloat(input.correctAnswer)

  if (isNaN(studentNum) || isNaN(correctNum)) return false

  // If student answer is roughly base + percent
  // This is a heuristic
  return studentNum > correctNum * 3
}

// ============================================================================
// Utility Functions
// ============================================================================

function getCandidateMisconceptions(
  subject: string,
  difficulty: number,
  problemType: string,
  skills: string[]
): Misconception[] {
  let candidates: Misconception[] = []

  if (subject === 'math') {
    candidates = ALL_MATH_MISCONCEPTIONS.filter((m) => {
      // Filter by difficulty range
      if (
        difficulty < m.gradeRangeStart - 1 ||
        difficulty > m.gradeRangeEnd + 1
      ) {
        return false
      }
      return true
    })
  }

  // Misconception patterns for reading, latin, greek, and logic are planned additions

  return candidates
}

function calculateHistorySupport(
  misconception: Misconception,
  recentErrors: ErrorRecord[]
): { occurrences: number; consistency: number } {
  const matchingErrors = recentErrors.filter((error) =>
    error.detectedMisconceptions.includes(misconception.id)
  )

  return {
    occurrences: matchingErrors.length,
    consistency: matchingErrors.length > 0 ? 1 : 0.5,
  }
}

function generateRemediation(
  detected: DetectedMisconception
): MisconceptionDetectionResult['suggestedRemediation'] {
  const { misconception, confidence } = detected
  const remediation = misconception.remediation

  // Determine action based on confidence and severity
  if (confidence >= MISCONCEPTION_CONFIG.MIN_CONFIDENCE_FOR_CONFIRMED) {
    if (
      misconception.severity === 'fundamental' ||
      misconception.severity === 'major'
    ) {
      return {
        action: 'worked_example',
        content: remediation.detailedExplanation,
        problemId: remediation.warmupProblems[0],
        reason: `Confirmed misconception: ${misconception.name}`,
        targetMisconceptions: [misconception.id],
      }
    } else {
      return {
        action: 'hint',
        content: remediation.briefExplanation,
        reason: `Detected: ${misconception.name}`,
        targetMisconceptions: [misconception.id],
      }
    }
  } else {
    // Lower confidence - just provide a hint
    return {
      action: 'hint',
      content: remediation.briefExplanation,
      reason: `Possible: ${misconception.name}`,
      targetMisconceptions: [misconception.id],
    }
  }
}

function describePattern(pattern: ErrorPattern): string {
  if (pattern.pattern) return pattern.pattern
  if (pattern.features)
    return `features:${Object.keys(pattern.features).join(',')}`
  if (pattern.numericRule) return `numeric:${pattern.numericRule.type}`
  return 'unknown'
}

function countTerms(expr: string): number {
  const simplified = expr.replace(/\([^)]*\)/g, 'X')
  const terms = simplified.split(/[+\-]/).filter((t) => t.trim())
  return terms.length
}

function parseFraction(str: string): { num: number; den: number } | null {
  const match = str.match(/(-?\d+)\s*\/\s*(-?\d+)/)
  if (!match) return null
  return {
    num: parseInt(match[1], 10),
    den: parseInt(match[2], 10),
  }
}

// ============================================================================
// Batch Detection (for analyzing multiple errors)
// ============================================================================

/**
 * Analyze multiple errors to find patterns across problems
 */
export function detectMisconceptionsFromHistory(
  errors: ErrorRecord[],
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
): Map<string, { misconception: Misconception; evidence: ErrorRecord[] }> {
  const detections = new Map<
    string,
    { misconception: Misconception; evidence: ErrorRecord[] }
  >()

  // Get all misconceptions for this subject
  const misconceptions = subject === 'math' ? ALL_MATH_MISCONCEPTIONS : []

  for (const misconception of misconceptions) {
    const matchingErrors: ErrorRecord[] = []

    for (const error of errors) {
      // Check if error features match this misconception
      let featureMatches = 0
      const features = error.errorFeatures

      for (const pattern of misconception.detectionRules.errorPatterns) {
        if (pattern.type === 'feature' && pattern.features) {
          const matches = Object.entries(pattern.features).every(
            ([key, value]) => features[key as keyof ErrorFeatures] === value
          )
          if (matches) featureMatches++
        }
      }

      if (featureMatches > 0) {
        matchingErrors.push(error)
      }
    }

    // Require minimum occurrences for batch detection
    if (matchingErrors.length >= misconception.detectionRules.minOccurrences) {
      detections.set(misconception.id, {
        misconception,
        evidence: matchingErrors,
      })
    }
  }

  return detections
}

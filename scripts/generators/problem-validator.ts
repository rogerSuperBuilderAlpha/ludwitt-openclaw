/**
 * Problem Validator
 * 
 * Validates generated problems against TypeScript type definitions.
 * Ensures all required fields are present and have valid values.
 */

import type { SubjectType } from './generator-core'

// ============================================================================
// Types
// ============================================================================

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

// ============================================================================
// Math V2 Validation
// ============================================================================

export function validateMathProblem(problem: unknown): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  if (!problem || typeof problem !== 'object') {
    errors.push({ field: 'root', message: 'Problem must be an object', severity: 'error' })
    return { valid: false, errors, warnings }
  }

  const p = problem as Record<string, unknown>

  // Required fields
  if (!p.id || typeof p.id !== 'string') {
    errors.push({ field: 'id', message: 'Missing or invalid id', severity: 'error' })
  }

  if (p.version !== 2) {
    errors.push({ field: 'version', message: 'Version must be 2', severity: 'error' })
  }

  if (!p.type || typeof p.type !== 'string') {
    errors.push({ field: 'type', message: 'Missing or invalid type', severity: 'error' })
  }

  if (typeof p.difficulty !== 'number' || p.difficulty < 1 || p.difficulty > 12) {
    errors.push({ field: 'difficulty', message: 'Difficulty must be number between 1 and 12', severity: 'error' })
  }

  if (typeof p.gradeLevel !== 'number' || p.gradeLevel < 1 || p.gradeLevel > 12) {
    errors.push({ field: 'gradeLevel', message: 'Grade level must be integer 1-12', severity: 'error' })
  }

  // Question validation
  if (!p.question || typeof p.question !== 'object') {
    errors.push({ field: 'question', message: 'Missing question object', severity: 'error' })
  } else {
    const q = p.question as Record<string, unknown>
    if (!q.text && !q.latex) {
      errors.push({ field: 'question.text', message: 'Question must have text or latex', severity: 'error' })
    }
  }

  // Answer validation
  if (!p.answer || typeof p.answer !== 'object') {
    errors.push({ field: 'answer', message: 'Missing answer object', severity: 'error' })
  } else {
    const a = p.answer as Record<string, unknown>
    if (!a.correct) {
      errors.push({ field: 'answer.correct', message: 'Missing correct answer', severity: 'error' })
    }
    if (!a.type) {
      warnings.push({ field: 'answer.type', message: 'Missing answer type', severity: 'warning' })
    }
  }

  // Solution validation
  if (!p.solution || typeof p.solution !== 'object') {
    warnings.push({ field: 'solution', message: 'Missing solution object', severity: 'warning' })
  } else {
    const s = p.solution as Record<string, unknown>
    if (!Array.isArray(s.steps) || s.steps.length === 0) {
      warnings.push({ field: 'solution.steps', message: 'Solution should have steps', severity: 'warning' })
    }
  }

  // Hints validation
  if (!Array.isArray(p.hints) || p.hints.length < 2) {
    warnings.push({ field: 'hints', message: 'Should have at least 2 hints', severity: 'warning' })
  }

  // Pedagogy validation
  if (!p.pedagogy || typeof p.pedagogy !== 'object') {
    warnings.push({ field: 'pedagogy', message: 'Missing pedagogy object', severity: 'warning' })
  } else {
    const ped = p.pedagogy as Record<string, unknown>
    if (!ped.topic) {
      warnings.push({ field: 'pedagogy.topic', message: 'Missing topic', severity: 'warning' })
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// ============================================================================
// Reading Validation
// ============================================================================

export function validateReadingExercise(exercise: unknown): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  if (!exercise || typeof exercise !== 'object') {
    errors.push({ field: 'root', message: 'Exercise must be an object', severity: 'error' })
    return { valid: false, errors, warnings }
  }

  const e = exercise as Record<string, unknown>

  // Required fields
  if (!e.id || typeof e.id !== 'string') {
    errors.push({ field: 'id', message: 'Missing or invalid id', severity: 'error' })
  }

  if (!e.type || typeof e.type !== 'string') {
    errors.push({ field: 'type', message: 'Missing or invalid type', severity: 'error' })
  }

  if (typeof e.difficulty !== 'number' || e.difficulty < 1 || e.difficulty > 12) {
    errors.push({ field: 'difficulty', message: 'Difficulty must be number between 1 and 12', severity: 'error' })
  }

  if (!e.passage || typeof e.passage !== 'string' || e.passage.length < 50) {
    errors.push({ field: 'passage', message: 'Missing or too short passage', severity: 'error' })
  }

  // Questions validation
  if (!Array.isArray(e.questions) || e.questions.length === 0) {
    errors.push({ field: 'questions', message: 'Must have at least one question', severity: 'error' })
  } else {
    e.questions.forEach((q: unknown, i: number) => {
      if (!q || typeof q !== 'object') {
        errors.push({ field: `questions[${i}]`, message: 'Invalid question object', severity: 'error' })
        return
      }
      const question = q as Record<string, unknown>
      
      if (!question.id) {
        errors.push({ field: `questions[${i}].id`, message: 'Missing question id', severity: 'error' })
      }
      if (!question.question) {
        errors.push({ field: `questions[${i}].question`, message: 'Missing question text', severity: 'error' })
      }
      if (!question.correctAnswer) {
        errors.push({ field: `questions[${i}].correctAnswer`, message: 'Missing correct answer', severity: 'error' })
      }
      if (!question.skill) {
        warnings.push({ field: `questions[${i}].skill`, message: 'Missing skill type', severity: 'warning' })
      }
    })
  }

  if (typeof e.timeEstimate !== 'number') {
    warnings.push({ field: 'timeEstimate', message: 'Missing time estimate', severity: 'warning' })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// ============================================================================
// Translation (Latin/Greek) Validation
// ============================================================================

export function validateTranslationExercise(exercise: unknown, language: 'latin' | 'greek'): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  if (!exercise || typeof exercise !== 'object') {
    errors.push({ field: 'root', message: 'Exercise must be an object', severity: 'error' })
    return { valid: false, errors, warnings }
  }

  const e = exercise as Record<string, unknown>

  // Required fields
  if (!e.id || typeof e.id !== 'string') {
    errors.push({ field: 'id', message: 'Missing or invalid id', severity: 'error' })
  }

  if (e.language !== language) {
    errors.push({ field: 'language', message: `Language must be "${language}"`, severity: 'error' })
  }

  if (typeof e.difficulty !== 'number' || e.difficulty < 1 || e.difficulty > 12) {
    errors.push({ field: 'difficulty', message: 'Difficulty must be number between 1 and 12', severity: 'error' })
  }

  if (!e.sourceText || typeof e.sourceText !== 'string' || e.sourceText.length < 3) {
    errors.push({ field: 'sourceText', message: 'Missing or too short source text', severity: 'error' })
  }

  // Greek-specific: check for Greek characters
  if (language === 'greek' && e.sourceText) {
    const greekPattern = /[\u0370-\u03FF\u1F00-\u1FFF]/
    if (!greekPattern.test(e.sourceText as string)) {
      errors.push({ field: 'sourceText', message: 'Greek text must contain Greek characters', severity: 'error' })
    }
    if (!e.romanization) {
      warnings.push({ field: 'romanization', message: 'Greek exercises should have romanization', severity: 'warning' })
    }
  }

  // Words validation - supports both old and new simplified formats
  if (!Array.isArray(e.words) || e.words.length === 0) {
    errors.push({ field: 'words', message: 'Must have words array', severity: 'error' })
  } else {
    e.words.forEach((w: unknown, i: number) => {
      if (!w || typeof w !== 'object') {
        errors.push({ field: `words[${i}]`, message: 'Invalid word object', severity: 'error' })
        return
      }
      const word = w as Record<string, unknown>
      
      // Accept either old format (word, lemma, meaning) or new format (latin/greek, english)
      const hasOldFormat = word.word || word.lemma
      const hasNewFormat = word.latin || word.greek
      
      if (!hasOldFormat && !hasNewFormat) {
        errors.push({ field: `words[${i}]`, message: 'Missing word field (word, latin, or greek)', severity: 'error' })
      }
      
      // Check for meaning/english
      if (!word.meaning && !word.english) {
        errors.push({ field: `words[${i}]`, message: 'Missing meaning/english field', severity: 'error' })
      }
      
      if (!word.grammaticalInfo) {
        warnings.push({ field: `words[${i}].grammaticalInfo`, message: 'Missing grammatical info', severity: 'warning' })
      }
    })
  }

  // Acceptable translations
  if (!Array.isArray(e.acceptableTranslations) || e.acceptableTranslations.length === 0) {
    errors.push({ field: 'acceptableTranslations', message: 'Must have acceptable translations', severity: 'error' })
  }

  if (!e.grammarTopic) {
    warnings.push({ field: 'grammarTopic', message: 'Missing grammar topic', severity: 'warning' })
  }

  if (typeof e.timeEstimate !== 'number') {
    warnings.push({ field: 'timeEstimate', message: 'Missing time estimate', severity: 'warning' })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// ============================================================================
// Logic Validation
// ============================================================================

export function validateLogicProblem(problem: unknown): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  if (!problem || typeof problem !== 'object') {
    errors.push({ field: 'root', message: 'Problem must be an object', severity: 'error' })
    return { valid: false, errors, warnings }
  }

  const p = problem as Record<string, unknown>

  // Required fields
  if (!p.id || typeof p.id !== 'string') {
    errors.push({ field: 'id', message: 'Missing or invalid id', severity: 'error' })
  }

  if (typeof p.unit !== 'number' || p.unit < 1 || p.unit > 18) {
    errors.push({ field: 'unit', message: 'Unit must be number 1-18', severity: 'error' })
  }

  if (typeof p.difficulty !== 'number' || p.difficulty < 1 || p.difficulty > 5) {
    errors.push({ field: 'difficulty', message: 'Difficulty must be number between 1 and 5', severity: 'error' })
  }

  if (!p.topic || typeof p.topic !== 'string') {
    errors.push({ field: 'topic', message: 'Missing topic', severity: 'error' })
  }

  if (!p.problemType || typeof p.problemType !== 'string') {
    errors.push({ field: 'problemType', message: 'Missing problem type', severity: 'error' })
  }

  if (!p.question || typeof p.question !== 'string') {
    errors.push({ field: 'question', message: 'Missing question', severity: 'error' })
  }

  if (!p.correctAnswer) {
    errors.push({ field: 'correctAnswer', message: 'Missing correct answer', severity: 'error' })
  }

  if (!p.explanation || typeof p.explanation !== 'string' || (p.explanation as string).length < 20) {
    warnings.push({ field: 'explanation', message: 'Explanation should be detailed', severity: 'warning' })
  }

  // Multiple choice validation
  if (p.problemType === 'multiple-choice') {
    if (!Array.isArray(p.options) || p.options.length < 2) {
      errors.push({ field: 'options', message: 'Multiple choice needs options', severity: 'error' })
    } else {
      // Check that options are objects with label and text, not strings
      const firstOption = p.options[0] as unknown
      if (typeof firstOption === 'string') {
        errors.push({ field: 'options', message: 'Options must be objects with {label, text}, not strings', severity: 'error' })
      } else if (firstOption && typeof firstOption === 'object') {
        const opt = firstOption as Record<string, unknown>
        if (!opt.label || !opt.text) {
          errors.push({ field: 'options', message: 'Options must have label and text fields', severity: 'error' })
        }
      }
    }
  }

  // Proof validation
  if (p.problemType === 'proof') {
    if (!Array.isArray(p.proofSteps)) {
      warnings.push({ field: 'proofSteps', message: 'Proof problems should have proof steps', severity: 'warning' })
    }
  }

  if (typeof p.timeEstimate !== 'number') {
    warnings.push({ field: 'timeEstimate', message: 'Missing time estimate', severity: 'warning' })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// ============================================================================
// Batch Validation
// ============================================================================

export function validateBatch<T>(
  problems: T[],
  subject: SubjectType,
  existingIds: Set<string> = new Set()
): {
  valid: T[]
  invalid: { problem: T; result: ValidationResult }[]
  duplicates: T[]
} {
  const valid: T[] = []
  const invalid: { problem: T; result: ValidationResult }[] = []
  const duplicates: T[] = []
  const seenIds = new Set<string>()

  for (const problem of problems) {
    const p = problem as unknown as Record<string, unknown>
    const id = p.id as string

    // Check for duplicates
    if (id && (existingIds.has(id) || seenIds.has(id))) {
      duplicates.push(problem)
      continue
    }

    if (id) {
      seenIds.add(id)
    }

    // Validate based on subject
    let result: ValidationResult

    switch (subject) {
      case 'math':
        result = validateMathProblem(problem)
        break
      case 'reading':
        result = validateReadingExercise(problem)
        break
      case 'latin':
        result = validateTranslationExercise(problem, 'latin')
        break
      case 'greek':
        result = validateTranslationExercise(problem, 'greek')
        break
      case 'logic':
        result = validateLogicProblem(problem)
        break
      default:
        result = { valid: false, errors: [{ field: 'subject', message: 'Unknown subject', severity: 'error' }], warnings: [] }
    }

    if (result.valid) {
      valid.push(problem)
    } else {
      invalid.push({ problem, result })
    }
  }

  return { valid, invalid, duplicates }
}

// ============================================================================
// Validation Report
// ============================================================================

export function printValidationReport(
  subject: SubjectType,
  validCount: number,
  invalid: { problem: unknown; result: ValidationResult }[],
  duplicates: unknown[]
): void {
  console.log(`\n  Validation Report for ${subject.toUpperCase()}:`)
  console.log(`    Valid:      ${validCount}`)
  console.log(`    Invalid:    ${invalid.length}`)
  console.log(`    Duplicates: ${duplicates.length}`)

  if (invalid.length > 0) {
    console.log('\n    Errors (first 5):')
    invalid.slice(0, 5).forEach(({ problem, result }, i) => {
      const p = problem as Record<string, unknown>
      console.log(`      ${i + 1}. ID: ${p.id || 'unknown'}`)
      result.errors.forEach(e => {
        console.log(`         - ${e.field}: ${e.message}`)
      })
    })
  }
}

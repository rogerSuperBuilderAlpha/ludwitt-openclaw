/**
 * Math Problem V2 Validation
 * 
 * Validates MathProblemV2 objects for completeness and correctness.
 * Uses Zod-like validation patterns with detailed error reporting.
 */

import {
  MathProblemV2,
  MathProblemTypeV2,
  AnswerType,
  HintLevel,
  ScaffoldingLevel,
  ValidationResult,
  ValidationError,
  QuestionSchema,
  AnswerSchema,
  SolutionSchema,
  PedagogySchema,
  Hint,
  MetadataSchema,
  VisualsSchema,
  GraphConfig,
  DiagramV2,
} from '@/lib/types/math-v2'

// ============================================================================
// Valid Values
// ============================================================================

const VALID_PROBLEM_TYPES: MathProblemTypeV2[] = [
  'arithmetic', 'pre-algebra', 'algebra', 'geometry', 'word-problem',
  'statistics', 'trigonometry', 'precalculus', 'calculus', 'linear-algebra',
  'discrete-math', 'number-theory', 'probability', 'measurement', 'data-analysis'
]

const VALID_ANSWER_TYPES: AnswerType[] = [
  'exact', 'numeric', 'expression', 'fraction', 'multiple-choice',
  'multi-select', 'ordered-list', 'set', 'interval', 'coordinate', 'matrix', 'equation'
]

const VALID_HINT_LEVELS: HintLevel[] = ['gentle', 'moderate', 'explicit']

const VALID_SCAFFOLDING_LEVELS: ScaffoldingLevel[] = ['minimal', 'moderate', 'extensive']

const VALID_SOURCES = ['manual', 'ai-generated', 'imported', 'community'] as const

// ============================================================================
// Helper Functions
// ============================================================================

function addError(
  errors: ValidationError[],
  field: string,
  message: string,
  severity: 'error' | 'warning' = 'error'
): void {
  errors.push({ field, message, severity })
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidNumber(value: unknown, min?: number, max?: number): value is number {
  if (typeof value !== 'number' || isNaN(value)) return false
  if (min !== undefined && value < min) return false
  if (max !== undefined && value > max) return false
  return true
}

// ============================================================================
// Schema Validators
// ============================================================================

function validateQuestion(question: unknown, errors: ValidationError[]): question is QuestionSchema {
  if (!question || typeof question !== 'object') {
    addError(errors, 'question', 'Question must be an object')
    return false
  }

  const q = question as Partial<QuestionSchema>

  if (!isNonEmptyString(q.text)) {
    addError(errors, 'question.text', 'Question text is required and must be non-empty')
    return false
  }

  if (q.latex !== undefined && typeof q.latex !== 'string') {
    addError(errors, 'question.latex', 'Question latex must be a string if provided')
  }

  if (q.parts !== undefined) {
    if (!Array.isArray(q.parts)) {
      addError(errors, 'question.parts', 'Question parts must be an array if provided')
    } else {
      q.parts.forEach((part, index) => {
        if (!isNonEmptyString(part?.id)) {
          addError(errors, `question.parts[${index}].id`, 'Part ID is required')
        }
        if (!isNonEmptyString(part?.text)) {
          addError(errors, `question.parts[${index}].text`, 'Part text is required')
        }
      })
    }
  }

  return true
}

function validateAnswer(answer: unknown, errors: ValidationError[]): answer is AnswerSchema {
  if (!answer || typeof answer !== 'object') {
    addError(errors, 'answer', 'Answer must be an object')
    return false
  }

  const a = answer as Partial<AnswerSchema>

  if (!a.type || !VALID_ANSWER_TYPES.includes(a.type)) {
    addError(errors, 'answer.type', `Answer type must be one of: ${VALID_ANSWER_TYPES.join(', ')}`)
    return false
  }

  if (a.correct === undefined || a.correct === null) {
    addError(errors, 'answer.correct', 'Correct answer is required')
    return false
  }

  // Type-specific validation
  if (a.type === 'multiple-choice' || a.type === 'multi-select') {
    if (!a.choices || !Array.isArray(a.choices) || a.choices.length < 2) {
      addError(errors, 'answer.choices', 'Multiple choice answers require at least 2 choices')
    }
  }

  if (a.type === 'numeric' && a.precision !== undefined) {
    if (!isValidNumber(a.precision, 0, 20)) {
      addError(errors, 'answer.precision', 'Precision must be a number between 0 and 20', 'warning')
    }
  }

  if (a.acceptable !== undefined && !Array.isArray(a.acceptable)) {
    addError(errors, 'answer.acceptable', 'Acceptable answers must be an array', 'warning')
  }

  return true
}

function validateSolution(solution: unknown, errors: ValidationError[]): solution is SolutionSchema {
  if (!solution || typeof solution !== 'object') {
    addError(errors, 'solution', 'Solution must be an object')
    return false
  }

  const s = solution as Partial<SolutionSchema>

  if (!s.steps || !Array.isArray(s.steps)) {
    addError(errors, 'solution.steps', 'Solution steps must be an array')
    return false
  }

  if (s.steps.length === 0) {
    addError(errors, 'solution.steps', 'Solution must have at least one step')
    return false
  }

  s.steps.forEach((step, index) => {
    if (!isValidNumber(step?.number, 1)) {
      addError(errors, `solution.steps[${index}].number`, 'Step number must be a positive integer')
    }
    if (!isNonEmptyString(step?.description)) {
      addError(errors, `solution.steps[${index}].description`, 'Step description is required')
    }
  })

  return true
}

function validatePedagogy(pedagogy: unknown, errors: ValidationError[]): pedagogy is PedagogySchema {
  if (!pedagogy || typeof pedagogy !== 'object') {
    addError(errors, 'pedagogy', 'Pedagogy must be an object')
    return false
  }

  const p = pedagogy as Partial<PedagogySchema>

  if (!isNonEmptyString(p.topic)) {
    addError(errors, 'pedagogy.topic', 'Topic is required')
    return false
  }

  if (!Array.isArray(p.skills)) {
    addError(errors, 'pedagogy.skills', 'Skills must be an array')
  }

  if (!Array.isArray(p.prerequisites)) {
    addError(errors, 'pedagogy.prerequisites', 'Prerequisites must be an array')
  }

  if (!Array.isArray(p.concepts)) {
    addError(errors, 'pedagogy.concepts', 'Concepts must be an array')
  }

  if (!Array.isArray(p.commonMistakes)) {
    addError(errors, 'pedagogy.commonMistakes', 'Common mistakes must be an array')
  }

  if (!p.scaffoldingLevel || !VALID_SCAFFOLDING_LEVELS.includes(p.scaffoldingLevel)) {
    addError(errors, 'pedagogy.scaffoldingLevel', `Scaffolding level must be one of: ${VALID_SCAFFOLDING_LEVELS.join(', ')}`)
  }

  return true
}

function validateHints(hints: unknown, errors: ValidationError[]): hints is Hint[] {
  if (!Array.isArray(hints)) {
    addError(errors, 'hints', 'Hints must be an array')
    return false
  }

  if (hints.length < 3) {
    addError(errors, 'hints', 'At least 3 hints are required (gentle, moderate, explicit)', 'warning')
  }

  const levels = new Set<HintLevel>()

  hints.forEach((hint, index) => {
    if (!hint?.level || !VALID_HINT_LEVELS.includes(hint.level)) {
      addError(errors, `hints[${index}].level`, `Hint level must be one of: ${VALID_HINT_LEVELS.join(', ')}`)
    } else {
      levels.add(hint.level)
    }

    if (!isNonEmptyString(hint?.text)) {
      addError(errors, `hints[${index}].text`, 'Hint text is required')
    }
  })

  // Check for all 3 levels
  VALID_HINT_LEVELS.forEach(level => {
    if (!levels.has(level)) {
      addError(errors, 'hints', `Missing hint with level: ${level}`, 'warning')
    }
  })

  return true
}

function validateMetadata(metadata: unknown, errors: ValidationError[]): metadata is MetadataSchema {
  if (!metadata || typeof metadata !== 'object') {
    addError(errors, 'metadata', 'Metadata must be an object')
    return false
  }

  const m = metadata as Partial<MetadataSchema>

  if (!m.source || !VALID_SOURCES.includes(m.source as typeof VALID_SOURCES[number])) {
    addError(errors, 'metadata.source', `Source must be one of: ${VALID_SOURCES.join(', ')}`)
  }

  if (!isNonEmptyString(m.createdAt)) {
    addError(errors, 'metadata.createdAt', 'Created date is required')
  } else {
    const date = new Date(m.createdAt)
    if (isNaN(date.getTime())) {
      addError(errors, 'metadata.createdAt', 'Created date must be a valid ISO date string')
    }
  }

  return true
}

function validateVisuals(visuals: unknown, errors: ValidationError[]): visuals is VisualsSchema {
  if (visuals === undefined) return true

  if (typeof visuals !== 'object' || visuals === null) {
    addError(errors, 'visuals', 'Visuals must be an object if provided')
    return false
  }

  const v = visuals as Partial<VisualsSchema>

  if (v.graph) {
    validateGraphConfig(v.graph, errors)
  }

  if (v.diagram) {
    validateDiagram(v.diagram, errors)
  }

  if (v.image) {
    if (!isNonEmptyString(v.image.url)) {
      addError(errors, 'visuals.image.url', 'Image URL is required')
    }
    if (!isNonEmptyString(v.image.alt)) {
      addError(errors, 'visuals.image.alt', 'Image alt text is required for accessibility')
    }
  }

  return true
}

function validateGraphConfig(graph: unknown, errors: ValidationError[]): graph is GraphConfig {
  if (!graph || typeof graph !== 'object') {
    addError(errors, 'visuals.graph', 'Graph config must be an object')
    return false
  }

  const g = graph as Partial<GraphConfig>

  if (!Array.isArray(g.expressions) || g.expressions.length === 0) {
    addError(errors, 'visuals.graph.expressions', 'Graph must have at least one expression')
  } else {
    g.expressions.forEach((expr, index) => {
      if (!isNonEmptyString(expr?.expression)) {
        addError(errors, `visuals.graph.expressions[${index}].expression`, 'Expression string is required')
      }
    })
  }

  if (!Array.isArray(g.domain) || g.domain.length !== 2) {
    addError(errors, 'visuals.graph.domain', 'Domain must be a [min, max] tuple')
  }

  if (!Array.isArray(g.range) || g.range.length !== 2) {
    addError(errors, 'visuals.graph.range', 'Range must be a [min, max] tuple')
  }

  return true
}

function validateDiagram(diagram: unknown, errors: ValidationError[]): diagram is DiagramV2 {
  if (!diagram || typeof diagram !== 'object') {
    addError(errors, 'visuals.diagram', 'Diagram must be an object')
    return false
  }

  const d = diagram as Partial<DiagramV2>

  if (!isNonEmptyString(d.type)) {
    addError(errors, 'visuals.diagram.type', 'Diagram type is required')
  }

  if (!isNonEmptyString(d.description)) {
    addError(errors, 'visuals.diagram.description', 'Diagram description is required for accessibility')
  }

  return true
}

// ============================================================================
// Main Validation Function
// ============================================================================

/**
 * Validates a MathProblemV2 object
 * 
 * @param problem - The problem object to validate
 * @returns ValidationResult with valid flag, errors, and warnings
 */
export function validateProblemV2(problem: unknown): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  if (!problem || typeof problem !== 'object') {
    return {
      valid: false,
      errors: [{ field: 'root', message: 'Problem must be an object', severity: 'error' }],
      warnings: []
    }
  }

  const p = problem as Partial<MathProblemV2>

  // Required string fields
  if (!isNonEmptyString(p.id)) {
    addError(errors, 'id', 'Problem ID is required')
  }

  // Version check
  if (p.version !== 2) {
    addError(errors, 'version', 'Version must be 2 for MathProblemV2')
  }

  // Type validation
  if (!p.type || !VALID_PROBLEM_TYPES.includes(p.type)) {
    addError(errors, 'type', `Type must be one of: ${VALID_PROBLEM_TYPES.join(', ')}`)
  }

  // Difficulty validation (1.0 to 12.0)
  if (!isValidNumber(p.difficulty, 1.0, 12.0)) {
    addError(errors, 'difficulty', 'Difficulty must be a number between 1.0 and 12.0')
  }

  // Grade level validation (1 to 12)
  if (!isValidNumber(p.gradeLevel, 1, 12)) {
    addError(errors, 'gradeLevel', 'Grade level must be a number between 1 and 12')
  }

  // Nested schema validations
  validateQuestion(p.question, errors)
  validateAnswer(p.answer, errors)
  validateSolution(p.solution, errors)
  validatePedagogy(p.pedagogy, errors)
  validateHints(p.hints, errors)
  validateMetadata(p.metadata, errors)
  validateVisuals(p.visuals, errors)

  // Separate errors and warnings
  const actualErrors = errors.filter(e => e.severity === 'error')
  const actualWarnings = errors.filter(e => e.severity === 'warning')

  return {
    valid: actualErrors.length === 0,
    errors: actualErrors,
    warnings: actualWarnings
  }
}

/**
 * Quick validation check - returns true/false only
 */
export function isValidProblemV2(problem: unknown): boolean {
  return validateProblemV2(problem).valid
}

/**
 * Throws an error if validation fails
 */
export function assertValidProblemV2(problem: unknown): asserts problem is MathProblemV2 {
  const result = validateProblemV2(problem)
  if (!result.valid) {
    const errorMessages = result.errors.map(e => `${e.field}: ${e.message}`).join('\n')
    throw new Error(`Invalid MathProblemV2:\n${errorMessages}`)
  }
}

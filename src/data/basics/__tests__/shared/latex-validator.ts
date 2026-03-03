/**
 * LaTeX Validation Utilities
 * 
 * Uses KaTeX to validate LaTeX strings in math problems.
 * Reports detailed errors for invalid LaTeX syntax.
 */

import katex from 'katex'

export interface LatexValidationResult {
  valid: boolean
  error?: string
  position?: number
}

export interface LatexError {
  problemId: string
  field: string
  latex: string
  error: string
}

/**
 * Validate a single LaTeX string using KaTeX
 */
export function validateLatex(latex: string): LatexValidationResult {
  if (!latex || latex.trim() === '') {
    return { valid: true }
  }

  try {
    // Use KaTeX to parse the LaTeX - it will throw if invalid
    katex.renderToString(latex, {
      throwOnError: true,
      strict: 'error',
      // Allow common math mode commands
      trust: true,
      // Don't need actual rendering, just validation
      output: 'html'
    })
    return { valid: true }
  } catch (error) {
    if (error instanceof katex.ParseError) {
      return {
        valid: false,
        error: error.message,
        position: error.position
      }
    }
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown LaTeX error'
    }
  }
}

/**
 * Validate LaTeX with relaxed mode (warnings instead of errors for some issues)
 * This is useful for expressions that might use custom macros
 */
export function validateLatexRelaxed(latex: string): LatexValidationResult {
  if (!latex || latex.trim() === '') {
    return { valid: true }
  }

  try {
    katex.renderToString(latex, {
      throwOnError: true,
      strict: 'warn', // Warn instead of error for unknown commands
      trust: true,
      output: 'html'
    })
    return { valid: true }
  } catch (error) {
    if (error instanceof katex.ParseError) {
      return {
        valid: false,
        error: error.message,
        position: error.position
      }
    }
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown LaTeX error'
    }
  }
}

/**
 * Check if a string contains LaTeX (has backslash commands or math delimiters)
 */
export function containsLatex(text: string): boolean {
  if (!text) return false
  // Check for common LaTeX patterns
  return /\\[a-zA-Z]+|\\[{}[\]()]|\^|_|\{|\}/.test(text)
}

/**
 * Extract all LaTeX fields from a MathProblemV2 and validate them
 */
export function extractAndValidateLatex(
  problem: {
    id: string
    question?: { latex?: string }
    answer?: { correct?: string | string[] | number }
    solution?: { steps?: Array<{ latex?: string }> }
    hints?: Array<{ latex?: string }>
    visuals?: { 
      graph?: { 
        expressions?: Array<{ expression?: string }> 
      } 
    }
  }
): LatexError[] {
  const errors: LatexError[] = []
  const problemId = problem.id

  // Validate question.latex
  if (problem.question?.latex) {
    const result = validateLatex(problem.question.latex)
    if (!result.valid) {
      errors.push({
        problemId,
        field: 'question.latex',
        latex: problem.question.latex,
        error: result.error || 'Invalid LaTeX'
      })
    }
  }

  // Validate answer if it contains LaTeX
  if (problem.answer?.correct && typeof problem.answer.correct === 'string') {
    if (containsLatex(problem.answer.correct)) {
      const result = validateLatexRelaxed(problem.answer.correct)
      if (!result.valid) {
        errors.push({
          problemId,
          field: 'answer.correct',
          latex: problem.answer.correct,
          error: result.error || 'Invalid LaTeX'
        })
      }
    }
  }

  // Validate solution steps
  if (problem.solution?.steps) {
    problem.solution.steps.forEach((step, index) => {
      if (step.latex) {
        const result = validateLatex(step.latex)
        if (!result.valid) {
          errors.push({
            problemId,
            field: `solution.steps[${index}].latex`,
            latex: step.latex,
            error: result.error || 'Invalid LaTeX'
          })
        }
      }
    })
  }

  // Validate hints
  if (problem.hints) {
    problem.hints.forEach((hint, index) => {
      if (hint.latex) {
        const result = validateLatex(hint.latex)
        if (!result.valid) {
          errors.push({
            problemId,
            field: `hints[${index}].latex`,
            latex: hint.latex,
            error: result.error || 'Invalid LaTeX'
          })
        }
      }
    })
  }

  // Validate graph expressions (these are mathematical expressions, not full LaTeX)
  // We use relaxed validation since these are often simple expressions like "2x + 3"
  if (problem.visuals?.graph?.expressions) {
    problem.visuals.graph.expressions.forEach((expr, index) => {
      if (expr.expression) {
        // Graph expressions are simpler - just check for obvious issues
        const result = validateLatexRelaxed(expr.expression)
        if (!result.valid) {
          errors.push({
            problemId,
            field: `visuals.graph.expressions[${index}].expression`,
            latex: expr.expression,
            error: result.error || 'Invalid expression'
          })
        }
      }
    })
  }

  return errors
}

/**
 * Count total LaTeX strings in a problem
 */
export function countLatexStrings(problem: {
  question?: { latex?: string }
  answer?: { correct?: string | string[] | number }
  solution?: { steps?: Array<{ latex?: string }> }
  hints?: Array<{ latex?: string }>
  visuals?: { graph?: { expressions?: Array<{ expression?: string }> } }
}): number {
  let count = 0

  if (problem.question?.latex) count++
  if (problem.answer?.correct && typeof problem.answer.correct === 'string' && containsLatex(problem.answer.correct)) {
    count++
  }
  if (problem.solution?.steps) {
    count += problem.solution.steps.filter(s => s.latex).length
  }
  if (problem.hints) {
    count += problem.hints.filter(h => h.latex).length
  }
  if (problem.visuals?.graph?.expressions) {
    count += problem.visuals.graph.expressions.filter(e => e.expression).length
  }

  return count
}

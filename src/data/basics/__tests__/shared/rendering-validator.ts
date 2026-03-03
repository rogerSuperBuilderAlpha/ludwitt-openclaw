/**
 * Rendering Validation Utilities
 *
 * Validates that all content renders correctly - LaTeX, Unicode, and text formatting.
 * Critical for ensuring users see accurate, properly formatted content.
 */

import katex from 'katex'

// ============================================================================
// LaTeX Rendering Validation
// ============================================================================

export interface RenderingResult {
  valid: boolean
  error?: string
  html?: string
  warnings: string[]
}

/**
 * Strict LaTeX rendering validation - ensures content will render in UI
 */
export function validateLatexRendering(latex: string): RenderingResult {
  const warnings: string[] = []

  if (!latex || latex.trim() === '') {
    return { valid: true, warnings: [] }
  }

  try {
    const view = katex.renderToString(latex, {
      throwOnError: true,
      strict: 'error',
      trust: true,
      output: 'html',
      displayMode: false,
    })

    // Check for common issues in rendered output
    if (view.includes('katex-error')) {
      warnings.push('Rendered output contains error class')
    }

    return { valid: true, html: view, warnings }
  } catch (error) {
    if (error instanceof katex.ParseError) {
      return {
        valid: false,
        error: `LaTeX parse error at position ${error.position}: ${error.message}`,
        warnings,
      }
    }
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown rendering error',
      warnings,
    }
  }
}

/**
 * Check for common LaTeX mistakes that cause rendering issues
 */
export function detectLatexIssues(latex: string): string[] {
  const issues: string[] = []

  if (!latex) return issues

  // Unescaped special characters
  if (/%(?!\\)/.test(latex) && !latex.includes('\\%')) {
    issues.push('Unescaped % character (use \\%)')
  }
  if (/\$(?!\\)/.test(latex) && !latex.includes('\\$')) {
    issues.push('Unescaped $ character (use \\$)')
  }
  if (
    /&(?!\\)/.test(latex) &&
    !latex.includes('\\&') &&
    !latex.includes('&=') &&
    !/\\begin\{(array|cases|align|aligned|matrix|bmatrix|pmatrix|vmatrix|tabular)\}/.test(
      latex
    )
  ) {
    issues.push('Unescaped & character (use \\&)')
  }
  if (/#(?!\\)/.test(latex) && !latex.includes('\\#')) {
    issues.push('Unescaped # character (use \\#)')
  }

  // Unicode arrows should be LaTeX commands
  if (/→/.test(latex)) {
    issues.push('Unicode → should be \\rightarrow')
  }
  if (/←/.test(latex)) {
    issues.push('Unicode ← should be \\leftarrow')
  }
  if (/↔/.test(latex)) {
    issues.push('Unicode ↔ should be \\leftrightarrow')
  }
  if (/⇒/.test(latex)) {
    issues.push('Unicode ⇒ should be \\Rightarrow')
  }
  if (/⇔/.test(latex)) {
    issues.push('Unicode ⇔ should be \\Leftrightarrow')
  }

  // Mismatched braces
  const openBraces = (latex.match(/\{/g) || []).length
  const closeBraces = (latex.match(/\}/g) || []).length
  if (openBraces !== closeBraces) {
    issues.push(`Mismatched braces: ${openBraces} open, ${closeBraces} close`)
  }

  // Common typos - check \frac has two brace groups (handles nested braces)
  const fracPattern = /\\frac\s*\{/g
  let fracMatch
  while ((fracMatch = fracPattern.exec(latex)) !== null) {
    // Find matching closing brace for first argument (handle nesting)
    let depth = 1
    let pos = fracMatch.index + fracMatch[0].length
    while (pos < latex.length && depth > 0) {
      if (latex[pos] === '{') depth++
      else if (latex[pos] === '}') depth--
      pos++
    }
    // After first arg, skip whitespace and check for second arg opening brace
    while (pos < latex.length && /\s/.test(latex[pos])) pos++
    if (pos < latex.length && latex[pos] !== '{') {
      issues.push('\\frac may be missing second argument')
      break
    }
  }

  // Empty commands
  if (/\\text\{\s*\}/.test(latex)) {
    issues.push('Empty \\text{} command')
  }

  return issues
}

// ============================================================================
// Unicode Text Validation
// ============================================================================

/**
 * Validate Greek text renders correctly
 */
export function validateGreekRendering(text: string): RenderingResult {
  const warnings: string[] = []

  if (!text) {
    return { valid: false, error: 'Empty Greek text', warnings }
  }

  // Check for rendering-problematic characters
  const problematicChars: string[] = []

  // Control characters that won't render
  for (const char of text) {
    const code = char.charCodeAt(0)
    if (code < 32 && code !== 10 && code !== 13) {
      problematicChars.push(`U+${code.toString(16).padStart(4, '0')}`)
    }
  }

  if (problematicChars.length > 0) {
    return {
      valid: false,
      error: `Contains non-printable characters: ${problematicChars.join(', ')}`,
      warnings,
    }
  }

  // Check for combining characters without base
  const combiningDiacritics =
    /^[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/
  if (combiningDiacritics.test(text)) {
    warnings.push(
      'Text starts with combining diacritic (may render incorrectly)'
    )
  }

  return { valid: true, warnings }
}

/**
 * Validate Latin text with macrons renders correctly
 */
export function validateLatinRendering(text: string): RenderingResult {
  const warnings: string[] = []

  if (!text) {
    return { valid: false, error: 'Empty Latin text', warnings }
  }

  // Check for consistent macron usage
  const macronChars = text.match(/[āēīōūĀĒĪŌŪ]/g) || []
  const plainVowels = text.match(/[aeiouAEIOU]/g) || []

  if (macronChars.length > 0 && plainVowels.length > 0) {
    // Mixed usage is fine, but flag if inconsistent in same word
    warnings.push(
      'Text contains both macron and non-macron vowels (verify consistency)'
    )
  }

  return { valid: true, warnings }
}

// ============================================================================
// Content Accuracy Validation
// ============================================================================

/**
 * Check mathematical expressions for obvious errors
 */
export function validateMathematicalContent(expression: string): {
  valid: boolean
  issues: string[]
} {
  const issues: string[] = []

  if (!expression) return { valid: true, issues }

  // Division by zero patterns
  if (
    /\/\s*0(?![.\d])/.test(expression) ||
    /\\frac\{[^}]+\}\{0\}/.test(expression)
  ) {
    issues.push('Possible division by zero')
  }

  // Negative square root without context
  if (
    /\\sqrt\{-\d/.test(expression) &&
    !expression.includes('i') &&
    !expression.includes('imaginary')
  ) {
    issues.push('Square root of negative number (may need clarification)')
  }

  // Inconsistent notation
  if (/\*/.test(expression) && /\\times|\\cdot/.test(expression)) {
    issues.push('Mixed multiplication notation (* and \\times/\\cdot)')
  }

  return { valid: issues.length === 0, issues }
}

/**
 * Validate answer format matches question type
 */
export function validateAnswerFormat(
  answer: string | number | string[],
  questionType: string
): { valid: boolean; issues: string[] } {
  const issues: string[] = []

  if (answer === undefined || answer === null) {
    issues.push('Answer is undefined or null')
    return { valid: false, issues }
  }

  // Numeric questions should have numeric answers
  if (questionType === 'numeric' && typeof answer === 'string') {
    const cleaned = answer.replace(/[,\s]/g, '')
    if (isNaN(parseFloat(cleaned))) {
      issues.push(`Numeric question has non-numeric answer: "${answer}"`)
    }
  }

  // Coordinate questions should have proper format
  if (questionType === 'coordinate' && typeof answer === 'string') {
    if (!/\(\s*-?\d/.test(answer) && !/\[\s*-?\d/.test(answer)) {
      issues.push(`Coordinate answer may have improper format: "${answer}"`)
    }
  }

  // Multiple choice should have letter options
  if (questionType === 'multiple-choice' && typeof answer === 'string') {
    if (!/^[A-Da-d]$/.test(answer.trim()) && answer.length === 1) {
      issues.push(`Multiple choice answer should be A-D: "${answer}"`)
    }
  }

  return { valid: issues.length === 0, issues }
}

// ============================================================================
// Comprehensive Problem Validation
// ============================================================================

export interface ProblemValidationResult {
  id: string
  valid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Validate all renderable content in a problem
 */
export function validateProblemRendering(problem: {
  id: string
  question?: { text?: string; latex?: string }
  answer?: { correct?: unknown; type?: string }
  solution?: { steps?: Array<{ latex?: string; description?: string }> }
  hints?: Array<{ text?: string; latex?: string }>
  sourceText?: string // For translation exercises
  explanation?: string
  latex?: string // For logic problems
}): ProblemValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validate question LaTeX
  if (problem.question?.latex) {
    const view = validateLatexRendering(problem.question.latex)
    if (!view.valid) {
      errors.push(`question.latex: ${view.error}`)
    }
    warnings.push(...view.warnings.map((w) => `question.latex: ${w}`))

    const issues = detectLatexIssues(problem.question.latex)
    issues.forEach((i) => warnings.push(`question.latex: ${i}`))
  }

  // Validate solution steps
  if (problem.solution?.steps) {
    problem.solution.steps.forEach((step, idx) => {
      if (step.latex) {
        const view = validateLatexRendering(step.latex)
        if (!view.valid) {
          errors.push(`solution.steps[${idx}].latex: ${view.error}`)
        }
        warnings.push(
          ...view.warnings.map((w) => `solution.steps[${idx}].latex: ${w}`)
        )

        const issues = detectLatexIssues(step.latex)
        issues.forEach((i) =>
          warnings.push(`solution.steps[${idx}].latex: ${i}`)
        )
      }
    })
  }

  // Validate hints
  if (problem.hints) {
    problem.hints.forEach((hint, idx) => {
      if (hint.latex) {
        const view = validateLatexRendering(hint.latex)
        if (!view.valid) {
          errors.push(`hints[${idx}].latex: ${view.error}`)
        }
      }
    })
  }

  // Validate standalone latex field (logic problems)
  if (problem.latex) {
    const view = validateLatexRendering(problem.latex)
    if (!view.valid) {
      errors.push(`latex: ${view.error}`)
    }
    const issues = detectLatexIssues(problem.latex)
    issues.forEach((i) => warnings.push(`latex: ${i}`))
  }

  // Validate Greek text
  if (
    problem.sourceText &&
    /[\u0370-\u03FF\u1F00-\u1FFF]/.test(problem.sourceText)
  ) {
    const view = validateGreekRendering(problem.sourceText)
    if (!view.valid) {
      errors.push(`sourceText: ${view.error}`)
    }
    warnings.push(...view.warnings.map((w) => `sourceText: ${w}`))
  }

  return {
    id: problem.id,
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Math Expression Parser
 * Handles normalization, comparison, and LaTeX parsing for math expressions
 */

// Unicode character mappings for normalization (excluding sqrt which needs special handling)
const UNICODE_REPLACEMENTS: Record<string, string> = {
  // Minus signs
  '−': '-', // U+2212 Minus Sign
  '–': '-', // En dash
  '—': '-', // Em dash
  '⁻': '-', // Superscript minus
  
  // Multiplication signs
  '×': '*',
  '⋅': '*',
  '·': '*',
  
  // Division signs
  '÷': '/',
  
  // Superscript numbers
  '⁰': '^0',
  '¹': '^1',
  '²': '^2',
  '³': '^3',
  '⁴': '^4',
  '⁵': '^5',
  '⁶': '^6',
  '⁷': '^7',
  '⁸': '^8',
  '⁹': '^9',
  
  // Greek letters
  'π': 'pi',
  'α': 'alpha',
  'β': 'beta',
  'γ': 'gamma',
  'θ': 'theta',
  'φ': 'phi',
  'Σ': 'sum',
  
  // Special symbols (sqrt handled separately)
  '∞': 'infinity',
  '≤': '<=',
  '≥': '>=',
  '≠': '!=',
  '±': '+-',
}

// LaTeX command mappings
const LATEX_COMMANDS: Record<string, string> = {
  '\\pi': 'pi',
  '\\alpha': 'alpha',
  '\\beta': 'beta',
  '\\gamma': 'gamma',
  '\\theta': 'theta',
  '\\phi': 'phi',
  '\\sqrt': 'sqrt',
  '\\frac': 'frac',
  '\\cdot': '*',
  '\\times': '*',
  '\\div': '/',
  '\\pm': '+-',
  '\\leq': '<=',
  '\\geq': '>=',
  '\\neq': '!=',
  '\\infty': 'infinity',
  '\\left': '',
  '\\right': '',
  '\\Big': '',
  '\\big': '',
}

export interface ParsedExpression {
  normalized: string
  tokens: string[]
  type: 'numeric' | 'algebraic' | 'inequality' | 'equation' | 'unknown'
  numericValue?: number
  variables: string[]
}

export interface ComparisonResult {
  equivalent: boolean
  matchType: 'exact' | 'numeric' | 'algebraic' | 'format' | 'notation' | 'none'
  confidence: number
}

/**
 * Normalizes a math expression to a standard format
 */
export function normalizeExpression(expr: string): string {
  if (!expr || typeof expr !== 'string') {
    return ''
  }

  let normalized = expr.trim()

  // Replace Unicode characters
  for (const [unicode, replacement] of Object.entries(UNICODE_REPLACEMENTS)) {
    normalized = normalized.split(unicode).join(replacement)
  }

  // Handle √ symbol - needs to wrap following number/expression in parentheses
  normalized = normalizeSqrtSymbol(normalized)

  // Parse and replace LaTeX commands
  normalized = parseLatexCommands(normalized)

  // Normalize whitespace
  normalized = normalized.replace(/\s+/g, ' ')

  // Normalize fraction notation: a/b format
  normalized = normalizeFractions(normalized)

  // Normalize power notation: ^ format
  normalized = normalizePowers(normalized)

  // Normalize implicit multiplication (2x -> 2*x, but not x2 or 2.5)
  normalized = normalizeImplicitMultiplication(normalized)

  // Lowercase variables and functions
  normalized = normalized.toLowerCase()

  // Remove unnecessary spaces around operators
  normalized = normalized.replace(/\s*([+\-*/^=<>])\s*/g, '$1')
  
  // Normalize spaces around commas (for coordinate pairs like (-1, 2))
  normalized = normalized.replace(/\s*,\s*/g, ',')
  
  // Normalize spaces around parentheses (for coordinate pairs like ( -1, 2 ))
  normalized = normalized.replace(/\(\s+/g, '(')
  normalized = normalized.replace(/\s+\)/g, ')')

  // Normalize double negatives
  normalized = normalized.replace(/--/g, '+')
  normalized = normalized.replace(/\+-/g, '-')
  normalized = normalized.replace(/-\+/g, '-')

  return normalized.trim()
}

/**
 * Parses LaTeX commands and replaces them with normalized equivalents
 */
function parseLatexCommands(expr: string): string {
  let result = expr

  // Replace LaTeX commands
  for (const [latex, replacement] of Object.entries(LATEX_COMMANDS)) {
    result = result.split(latex).join(replacement)
  }

  // Handle \frac{a}{b} -> (a)/(b)
  result = result.replace(/frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')

  // Handle \sqrt{x} -> sqrt(x)
  result = result.replace(/sqrt\{([^}]+)\}/g, 'sqrt($1)')

  // Handle \sqrt[n]{x} -> nthroot(n,x)
  result = result.replace(/sqrt\[([^\]]+)\]\{([^}]+)\}/g, 'nthroot($1,$2)')

  // Remove remaining braces
  result = result.replace(/[{}]/g, '')

  return result
}

/**
 * Normalizes √ symbol to sqrt() function notation
 */
function normalizeSqrtSymbol(expr: string): string {
  let result = expr
  
  // √ followed by a number: √4 -> sqrt(4), √16 -> sqrt(16)
  result = result.replace(/√(\d+\.?\d*)/g, 'sqrt($1)')
  
  // √ followed by a variable: √x -> sqrt(x)
  result = result.replace(/√([a-z])/gi, 'sqrt($1)')
  
  // √ followed by parentheses: √(expr) -> sqrt(expr)
  result = result.replace(/√\(([^)]+)\)/g, 'sqrt($1)')
  
  return result
}

/**
 * Normalizes fraction representations
 */
function normalizeFractions(expr: string): string {
  // Already in a/b format, no change needed for structure
  return expr
}

/**
 * Normalizes power/exponent notation
 */
function normalizePowers(expr: string): string {
  let result = expr

  // Handle ** to ^
  result = result.replace(/\*\*/g, '^')

  return result
}

/**
 * Known function names that should not have implicit multiplication applied
 */
const FUNCTION_NAMES = ['sqrt', 'sin', 'cos', 'tan', 'log', 'ln', 'abs', 'nthroot', 'exp']

/**
 * Known constants that should not have implicit multiplication applied
 */
const CONSTANT_NAMES = ['pi', 'infinity']

/**
 * Adds explicit multiplication where implicit
 */
function normalizeImplicitMultiplication(expr: string): string {
  let result = expr

  // First, protect function names and constants by temporarily replacing them
  // Use numeric-only placeholders to avoid interference with letter multiplication
  const placeholders: Record<string, string> = {}
  let placeholderIndex = 0
  
  // Protect constants first (before functions, as some are shorter)
  for (const constant of CONSTANT_NAMES) {
    const regex = new RegExp(`\\b${constant}\\b`, 'gi')
    result = result.replace(regex, () => {
      const placeholder = `§${placeholderIndex}§`
      placeholders[placeholder] = constant
      placeholderIndex++
      return placeholder
    })
  }
  
  // Protect function names
  for (const fn of FUNCTION_NAMES) {
    const regex = new RegExp(fn, 'gi')
    result = result.replace(regex, () => {
      const placeholder = `§${placeholderIndex}§`
      placeholders[placeholder] = fn
      placeholderIndex++
      return placeholder
    })
  }

  // Add * between number and letter: 2x -> 2*x
  result = result.replace(/(\d)([a-z])/gi, '$1*$2')

  // Add * between adjacent single letters: ab -> a*b, xyz -> x*y*z
  // But NOT within function placeholders
  result = result.replace(/([a-z])([a-z])/gi, '$1*$2')
  // Apply multiple times for sequences like abc -> a*b*c
  // But exclude placeholders from the check
  while (/([a-z])([a-z])/i.test(result.replace(/§\d+§/g, ''))) {
    result = result.replace(/([a-z])([a-z])/gi, '$1*$2')
  }

  // Restore function names and constants
  for (const [placeholder, value] of Object.entries(placeholders)) {
    result = result.split(placeholder).join(value)
  }

  // Add * between ) and (
  result = result.replace(/\)\(/g, ')*(')
  
  // Add * between ) and letter
  result = result.replace(/\)([a-z])/gi, ')*$1')
  
  // Add * between letter and ( BUT NOT if it's a function name
  result = result.replace(/([a-z]+)\(/gi, (match, letters) => {
    const lowerLetters = letters.toLowerCase()
    if (FUNCTION_NAMES.includes(lowerLetters)) {
      return `${letters}(`
    }
    return `${letters}*(`
  })
  
  // Add * between number and (
  result = result.replace(/(\d)\(/g, '$1*(')

  return result
}

/**
 * Parses LaTeX expression and extracts numeric values
 */
export function parseLatex(latex: string): ParsedExpression {
  const normalized = normalizeExpression(latex)
  const tokens = tokenize(normalized)
  const variables = extractVariables(tokens)
  const type = determineExpressionType(normalized, variables)
  const numericValue = tryEvaluateNumeric(normalized, variables)

  return {
    normalized,
    tokens,
    type,
    numericValue,
    variables,
  }
}

/**
 * Tokenizes a normalized expression
 */
function tokenize(expr: string): string[] {
  const tokens: string[] = []
  let current = ''

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i]

    if (/[+\-*/^=<>(),]/.test(char)) {
      if (current) {
        tokens.push(current)
        current = ''
      }
      tokens.push(char)
    } else if (char === ' ') {
      if (current) {
        tokens.push(current)
        current = ''
      }
    } else {
      current += char
    }
  }

  if (current) {
    tokens.push(current)
  }

  return tokens
}

/**
 * Extracts variable names from tokens
 */
function extractVariables(tokens: string[]): string[] {
  const variables = new Set<string>()
  const reserved = ['sqrt', 'sin', 'cos', 'tan', 'log', 'ln', 'abs', 'pi', 'e', 'infinity', 'nthroot', 'exp']

  for (const token of tokens) {
    // Skip operators, numbers, and known functions/constants
    if (/^[+\-*/^=<>(),]$/.test(token)) continue
    if (/^-?\d+\.?\d*$/.test(token)) continue
    if (reserved.includes(token.toLowerCase())) continue

    // Check if it's a variable (single letter or letter followed by subscript)
    if (/^[a-z](_?\d*)?$/i.test(token)) {
      variables.add(token.toLowerCase())
    }
  }

  return Array.from(variables)
}

/**
 * Determines the type of expression
 */
function determineExpressionType(
  expr: string,
  variables: string[]
): ParsedExpression['type'] {
  // Check for inequalities FIRST (they may contain = as part of <= or >=)
  // Also check for standalone < or >
  if (expr.includes('<=') || expr.includes('>=') || 
      (expr.includes('<') && !expr.includes('=')) || 
      (expr.includes('>') && !expr.includes('='))) {
    return 'inequality'
  }
  // Pure inequalities without = (standalone < or >)
  if ((expr.includes('<') || expr.includes('>')) && !expr.includes('=')) {
    return 'inequality'
  }
  // Check for equation (contains = but NOT as part of <= or >=)
  if (expr.includes('=') && !expr.includes('<=') && !expr.includes('>=')) {
    return 'equation'
  }
  if (variables.length > 0) {
    return 'algebraic'
  }
  if (/^-?\d+\.?\d*$/.test(expr) || canEvaluateNumerically(expr)) {
    return 'numeric'
  }
  return 'unknown'
}

/**
 * Checks if an expression can be evaluated numerically
 */
function canEvaluateNumerically(expr: string): boolean {
  // Remove known functions and constants, then check for remaining letters (variables)
  const withoutFunctions = expr.replace(/sqrt|sin|cos|tan|log|ln|abs|nthroot|exp|pi|infinity/gi, '')
  // Check for any remaining letters which would be variables
  const hasVariables = /[a-z]/i.test(withoutFunctions)
  return !hasVariables
}

/**
 * Tries to evaluate an expression numerically
 */
function tryEvaluateNumeric(expr: string, variables: string[]): number | undefined {
  if (variables.length > 0) {
    return undefined
  }

  try {
    // Replace known constants
    let evalExpr = expr
      .replace(/\bpi\b/gi, String(Math.PI))
      .replace(/\be\b/gi, String(Math.E))

    // Handle nested sqrt calls first (innermost first)
    let prevExpr = ''
    while (prevExpr !== evalExpr) {
      prevExpr = evalExpr
      evalExpr = evalExpr.replace(/sqrt\(([^()]+)\)/gi, (_, inner) => {
        const val = evaluateSimple(inner.replace(/\bpi\b/gi, String(Math.PI)).replace(/\be\b/gi, String(Math.E)))
        return val !== undefined && val >= 0 ? String(Math.sqrt(val)) : 'NaN'
      })
    }

    // Handle fractions expressed as (a)/(b)
    evalExpr = evalExpr.replace(/\(([^)]+)\)\/\(([^)]+)\)/g, (_, a, b) => {
      const numA = evaluateSimple(a)
      const numB = evaluateSimple(b)
      if (numA !== undefined && numB !== undefined && numB !== 0) {
        return String(numA / numB)
      }
      return 'NaN'
    })

    return evaluateSimple(evalExpr)
  } catch {
    return undefined
  }
}

/**
 * Simple safe expression evaluator
 */
function evaluateSimple(expr: string): number | undefined {
  try {
    // Only allow safe characters: digits, operators, parentheses, decimal points
    const safeExpr = expr.replace(/\s/g, '')
    if (!/^[-+*/().0-9^]+$/.test(safeExpr)) {
      return undefined
    }

    // Handle exponents (^)
    const withPow = safeExpr.replace(/\^/g, '**')

    // Use Function constructor for safe evaluation
    // This is safer than eval as we've already validated the input
    const result = new Function(`return ${withPow}`)()
    return typeof result === 'number' && isFinite(result) ? result : undefined
  } catch {
    return undefined
  }
}

/**
 * Compares two expressions for equivalence
 */
export function compareExpressions(
  expr1: string,
  expr2: string,
  precision: number = 1e-9
): ComparisonResult {
  const parsed1 = parseLatex(expr1)
  const parsed2 = parseLatex(expr2)

  // Exact match after normalization
  if (parsed1.normalized === parsed2.normalized) {
    return { equivalent: true, matchType: 'exact', confidence: 1.0 }
  }

  // Numeric comparison
  if (parsed1.numericValue !== undefined && parsed2.numericValue !== undefined) {
    const diff = Math.abs(parsed1.numericValue - parsed2.numericValue)
    const maxVal = Math.max(Math.abs(parsed1.numericValue), Math.abs(parsed2.numericValue), 1)
    const relativeDiff = diff / maxVal

    if (relativeDiff < precision) {
      return { equivalent: true, matchType: 'numeric', confidence: 1.0 - relativeDiff }
    }
  }

  // Check algebraic equivalence (commutative property, etc.)
  const algebraicResult = checkAlgebraicEquivalence(parsed1, parsed2)
  if (algebraicResult.equivalent) {
    return algebraicResult
  }

  // Check inequality flip (x > 3 === 3 < x)
  const inequalityResult = checkInequalityEquivalence(parsed1, parsed2)
  if (inequalityResult.equivalent) {
    return inequalityResult
  }

  // Check equation variable extraction (x = 4 matches 4)
  const equationResult = checkEquationValueEquivalence(parsed1, parsed2, precision)
  if (equationResult.equivalent) {
    return equationResult
  }

  return { equivalent: false, matchType: 'none', confidence: 0 }
}

/**
 * Checks algebraic equivalence (commutative, etc.)
 */
function checkAlgebraicEquivalence(
  parsed1: ParsedExpression,
  parsed2: ParsedExpression
): ComparisonResult {
  // Sort terms for commutative comparison
  const terms1 = sortTerms(parsed1.normalized)
  const terms2 = sortTerms(parsed2.normalized)

  if (terms1 === terms2) {
    return { equivalent: true, matchType: 'algebraic', confidence: 0.95 }
  }

  // Check multiplication commutativity (a*b = b*a)
  const sortedProduct1 = sortMultiplicationFactors(parsed1.normalized)
  const sortedProduct2 = sortMultiplicationFactors(parsed2.normalized)
  
  if (sortedProduct1 === sortedProduct2) {
    return { equivalent: true, matchType: 'algebraic', confidence: 0.95 }
  }

  return { equivalent: false, matchType: 'none', confidence: 0 }
}

/**
 * Sorts factors in a multiplication expression
 */
function sortMultiplicationFactors(expr: string): string {
  // For simple expressions like a*b, split and sort
  if (expr.includes('*') && !expr.includes('+') && !expr.includes('-') && 
      !expr.includes('=') && !expr.includes('<') && !expr.includes('>')) {
    const factors = expr.split('*').map(f => f.trim()).filter(f => f)
    return factors.sort().join('*')
  }
  return expr
}

/**
 * Sorts terms in an expression for comparison
 */
function sortTerms(expr: string): string {
  // Handle addition: split by + and sort
  if (expr.includes('+') && !expr.includes('=') && !expr.includes('<') && !expr.includes('>')) {
    // Split carefully handling parentheses
    const terms = splitByOperator(expr, '+')
    return terms.sort().join('+')
  }

  // Handle multiplication: split by * and sort
  if (expr.includes('*') && !expr.includes('+') && !expr.includes('-')) {
    const terms = splitByOperator(expr, '*')
    return terms.sort().join('*')
  }

  return expr
}

/**
 * Splits expression by operator, respecting parentheses
 */
function splitByOperator(expr: string, op: string): string[] {
  const terms: string[] = []
  let current = ''
  let depth = 0

  for (const char of expr) {
    if (char === '(') depth++
    if (char === ')') depth--

    if (char === op && depth === 0) {
      if (current) terms.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  if (current) terms.push(current.trim())
  return terms
}

/**
 * Checks inequality equivalence (x > 3 === 3 < x)
 */
function checkInequalityEquivalence(
  parsed1: ParsedExpression,
  parsed2: ParsedExpression
): ComparisonResult {
  if (parsed1.type !== 'inequality' || parsed2.type !== 'inequality') {
    return { equivalent: false, matchType: 'none', confidence: 0 }
  }

  // Extract inequality parts
  const parts1 = parseInequality(parsed1.normalized)
  const parts2 = parseInequality(parsed2.normalized)

  if (!parts1 || !parts2) {
    return { equivalent: false, matchType: 'none', confidence: 0 }
  }

  // Check if flipped inequality is equivalent
  const flippedOp = flipOperator(parts1.operator)
  if (
    parts1.left === parts2.right &&
    parts1.right === parts2.left &&
    flippedOp === parts2.operator
  ) {
    return { equivalent: true, matchType: 'algebraic', confidence: 0.95 }
  }

  // Check direct match
  if (
    parts1.left === parts2.left &&
    parts1.right === parts2.right &&
    parts1.operator === parts2.operator
  ) {
    return { equivalent: true, matchType: 'exact', confidence: 1.0 }
  }

  return { equivalent: false, matchType: 'none', confidence: 0 }
}

interface InequalityParts {
  left: string
  operator: string
  right: string
}

/**
 * Parses an inequality into its parts
 */
function parseInequality(expr: string): InequalityParts | null {
  // Check for two-character operators first
  const twoCharOperators = ['<=', '>=']
  for (const op of twoCharOperators) {
    const idx = expr.indexOf(op)
    if (idx !== -1) {
      return {
        left: expr.slice(0, idx).trim(),
        operator: op,
        right: expr.slice(idx + op.length).trim(),
      }
    }
  }

  // Then check single-character operators
  const singleCharOperators = ['<', '>']
  for (const op of singleCharOperators) {
    const idx = expr.indexOf(op)
    if (idx !== -1) {
      return {
        left: expr.slice(0, idx).trim(),
        operator: op,
        right: expr.slice(idx + op.length).trim(),
      }
    }
  }

  return null
}

/**
 * Flips an inequality operator
 */
function flipOperator(op: string): string {
  const flips: Record<string, string> = {
    '<': '>',
    '>': '<',
    '<=': '>=',
    '>=': '<=',
  }
  return flips[op] || op
}

/**
 * Checks if an equation value matches a standalone value
 * e.g., "x = 4" matches "4"
 */
function checkEquationValueEquivalence(
  parsed1: ParsedExpression,
  parsed2: ParsedExpression,
  precision: number
): ComparisonResult {
  // One is equation, one is not
  const equation = parsed1.type === 'equation' ? parsed1 : parsed2.type === 'equation' ? parsed2 : null
  const value = parsed1.type === 'equation' ? parsed2 : parsed1

  if (!equation || equation.type !== 'equation') {
    return { equivalent: false, matchType: 'none', confidence: 0 }
  }

  // Extract the value from the equation (right side of =)
  const eqParts = equation.normalized.split('=')
  if (eqParts.length !== 2) {
    return { equivalent: false, matchType: 'none', confidence: 0 }
  }

  const eqValue = eqParts[1].trim()

  // Compare with the standalone value
  const comparison = compareExpressions(eqValue, value.normalized, precision)
  if (comparison.equivalent) {
    return { equivalent: true, matchType: 'format', confidence: comparison.confidence * 0.9 }
  }

  return { equivalent: false, matchType: 'none', confidence: 0 }
}

/**
 * Evaluates a numeric expression safely
 */
export function evaluateExpression(expr: string): number | undefined {
  const parsed = parseLatex(expr)
  return parsed.numericValue
}

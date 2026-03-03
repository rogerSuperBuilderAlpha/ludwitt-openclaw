/**
 * Math V2 - Answer Validation Engine
 * 
 * A comprehensive math expression validation system that handles:
 * - Equivalent expressions (x+1 = 1+x)
 * - Format variations (1/2 = 0.5 = 2/4)
 * - Notation variations (x^2 = x², sqrt = √, pi = π)
 * - Different minus signs (- vs −)
 * - Numeric comparison with precision tolerance
 */

// Main validation API
export {
  validateAnswer,
  validateAnswers,
  areEquivalent,
  type ValidationResult,
  type ValidationConfig,
  type ValidationDebugInfo,
} from './answer-validation'

// Expression parsing utilities
export {
  normalizeExpression,
  compareExpressions,
  parseLatex,
  evaluateExpression,
  type ParsedExpression,
  type ComparisonResult,
} from './expression-parser'

/**
 * Compositional Problem Generation
 * 
 * Generates problems by composing verified components rather than
 * pure LLM generation, ensuring problems are solvable and correctly
 * calibrated for difficulty.
 */

export * from './types'

// Templates
export {
  ALL_MATH_TEMPLATES,
  MATH_TEMPLATE_CATEGORIES,
  ARITHMETIC_TEMPLATES,
  ALGEBRA_TEMPLATES,
  WORD_PROBLEM_TEMPLATES,
  FRACTION_TEMPLATES
} from './templates/math-templates'

// Generation
export {
  generateProblem,
  generateProblemSet,
  getTemplates,
  getTemplateById
} from './generator'

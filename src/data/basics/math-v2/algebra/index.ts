/**
 * Algebra Problems - MathProblemV2 Format
 * 
 * This index exports all algebra problems in the V2 format with:
 * - Rich LaTeX formatting
 * - Graph configurations for visual learning
 * - Progressive 3-level hints
 * - Step-by-step solutions
 * - Pedagogical metadata
 * 
 * Topics included:
 * - Linear Equations (Grade 6-8)
 * - Quadratic Equations (Grade 9-10)
 * - Systems of Equations (Grade 8-9)
 * - Inequalities (Grade 7-9)
 * - Functions (Grade 8-10)
 * - Exponents & Radicals (Grade 8-10)
 * - Polynomials (Grade 9-11)
 * - Advanced Algebra (Grade 9-11) - Batch 2
 * - Function Applications (Grade 8-10) - Batch 2
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

// Import all algebra problem sets
import { LINEAR_EQUATIONS_V2 } from './linear-equations'
import { QUADRATIC_EQUATIONS_V2 } from './quadratic-equations'
import { SYSTEMS_V2 } from './systems'
import { SYSTEMS_EQUATIONS_EXPANDED_V2 } from './systems-expanded'
import { INEQUALITIES_V2 } from './inequalities'
import { FUNCTIONS_V2 } from './functions'
import { EXPONENTS_V2 } from './exponents'
import { POLYNOMIALS_V2 } from './polynomials'
import { ALGEBRA_WORD_PROBLEMS_V2 } from './word-problems-algebra'
// Batch 2 expansions
import { ADVANCED_ALGEBRA_V2 } from './advanced-algebra'
import { FUNCTION_APPLICATIONS_V2 } from './function-applications'
// Batch 3 expansions
import { ALGEBRA_REAL_WORLD_V2 } from './real-world-applications'

// Re-export individual problem sets for granular access
export {
  LINEAR_EQUATIONS_V2,
  QUADRATIC_EQUATIONS_V2,
  SYSTEMS_V2,
  SYSTEMS_EQUATIONS_EXPANDED_V2,
  INEQUALITIES_V2,
  FUNCTIONS_V2,
  EXPONENTS_V2,
  POLYNOMIALS_V2,
  ALGEBRA_WORD_PROBLEMS_V2,
  // Batch 2 expansions
  ADVANCED_ALGEBRA_V2,
  FUNCTION_APPLICATIONS_V2,
  // Batch 3 expansions
  ALGEBRA_REAL_WORLD_V2
}

/**
 * All algebra problems combined
 * Total: ~200 problems across all algebra topics
 */
export const ALGEBRA_PROBLEMS_V2: MathProblemV2[] = [
  ...LINEAR_EQUATIONS_V2,
  ...QUADRATIC_EQUATIONS_V2,
  ...SYSTEMS_V2,
  ...SYSTEMS_EQUATIONS_EXPANDED_V2,
  ...INEQUALITIES_V2,
  ...FUNCTIONS_V2,
  ...EXPONENTS_V2,
  ...POLYNOMIALS_V2,
  ...ALGEBRA_WORD_PROBLEMS_V2,
  // Batch 2 expansions
  ...ADVANCED_ALGEBRA_V2,
  ...FUNCTION_APPLICATIONS_V2,
  // Batch 3 expansions
  ...ALGEBRA_REAL_WORLD_V2
]

/**
 * Get algebra problems by grade level
 */
export function getAlgebraProblemsByGrade(grade: number): MathProblemV2[] {
  return ALGEBRA_PROBLEMS_V2.filter(p => p.gradeLevel === grade)
}

/**
 * Get algebra problems by topic
 */
export function getAlgebraProblemsByTopic(topic: string): MathProblemV2[] {
  return ALGEBRA_PROBLEMS_V2.filter(p => 
    p.pedagogy.topic.toLowerCase() === topic.toLowerCase()
  )
}

/**
 * Get algebra problems by difficulty range
 */
export function getAlgebraProblemsByDifficulty(
  minDifficulty: number,
  maxDifficulty: number
): MathProblemV2[] {
  return ALGEBRA_PROBLEMS_V2.filter(
    p => p.difficulty >= minDifficulty && p.difficulty <= maxDifficulty
  )
}

/**
 * Get problems that have graph visualizations
 */
export function getProblemsWithGraphs(): MathProblemV2[] {
  return ALGEBRA_PROBLEMS_V2.filter(p => p.visuals?.graph !== undefined)
}

/**
 * Summary statistics for the algebra problem set
 */
export const ALGEBRA_V2_STATS = {
  totalProblems: ALGEBRA_PROBLEMS_V2.length,
  byCategory: {
    linearEquations: LINEAR_EQUATIONS_V2.length,
    quadraticEquations: QUADRATIC_EQUATIONS_V2.length,
    systems: SYSTEMS_V2.length,
    systemsExpanded: SYSTEMS_EQUATIONS_EXPANDED_V2.length,
    inequalities: INEQUALITIES_V2.length,
    functions: FUNCTIONS_V2.length,
    exponents: EXPONENTS_V2.length,
    polynomials: POLYNOMIALS_V2.length,
    wordProblems: ALGEBRA_WORD_PROBLEMS_V2.length,
    // Batch 2 expansions
    advancedAlgebra: ADVANCED_ALGEBRA_V2.length,
    functionApplications: FUNCTION_APPLICATIONS_V2.length,
    // Batch 3 expansions
    realWorldApplications: ALGEBRA_REAL_WORLD_V2.length
  },
  gradeRange: {
    min: 6,
    max: 11
  },
  difficultyRange: {
    min: 6.0,
    max: 11.0
  }
}

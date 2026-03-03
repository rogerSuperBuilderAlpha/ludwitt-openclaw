/**
 * Arithmetic Problems V2
 * 
 * All arithmetic problems migrated to MathProblemV2 format with:
 * - LaTeX expressions
 * - Progressive hints (3 levels)
 * - Step-by-step solutions
 * - Pedagogical metadata
 * - Number line diagram configs where appropriate
 */

export { ADDITION_PROBLEMS_V2 } from './addition'
export { SUBTRACTION_PROBLEMS_V2 } from './subtraction'
export { MULTIPLICATION_PROBLEMS_V2 } from './multiplication'
export { DIVISION_PROBLEMS_V2 } from './division'
export { MIXED_OPERATIONS_PROBLEMS_V2 } from './mixed-operations'
export { FRACTIONS_DECIMALS_V2 } from './fractions-decimals'
// Batch 3 expansions
export { ARITHMETIC_WORD_PROBLEMS_V2 } from './word-problems-arithmetic'

import { ADDITION_PROBLEMS_V2 } from './addition'
import { SUBTRACTION_PROBLEMS_V2 } from './subtraction'
import { MULTIPLICATION_PROBLEMS_V2 } from './multiplication'
import { DIVISION_PROBLEMS_V2 } from './division'
import { MIXED_OPERATIONS_PROBLEMS_V2 } from './mixed-operations'
import { FRACTIONS_DECIMALS_V2 } from './fractions-decimals'
// Batch 3 expansions
import { ARITHMETIC_WORD_PROBLEMS_V2 } from './word-problems-arithmetic'
import type { MathProblemV2 } from '@/lib/types/math-v2'

/** All arithmetic problems in V2 format */
export const ARITHMETIC_PROBLEMS_V2: MathProblemV2[] = [
  ...ADDITION_PROBLEMS_V2,
  ...SUBTRACTION_PROBLEMS_V2,
  ...MULTIPLICATION_PROBLEMS_V2,
  ...DIVISION_PROBLEMS_V2,
  ...MIXED_OPERATIONS_PROBLEMS_V2,
  ...FRACTIONS_DECIMALS_V2,
  // Batch 3 expansions
  ...ARITHMETIC_WORD_PROBLEMS_V2,
]

/** Get problems by grade level */
export function getArithmeticProblemsByGrade(grade: number): MathProblemV2[] {
  return ARITHMETIC_PROBLEMS_V2.filter(p => p.gradeLevel === grade)
}

/** Get problems by operation type */
export function getArithmeticProblemsByOperation(
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed'
): MathProblemV2[] {
  const skillMap = {
    addition: ADDITION_PROBLEMS_V2,
    subtraction: SUBTRACTION_PROBLEMS_V2,
    multiplication: MULTIPLICATION_PROBLEMS_V2,
    division: DIVISION_PROBLEMS_V2,
    mixed: MIXED_OPERATIONS_PROBLEMS_V2,
  }
  return skillMap[operation]
}

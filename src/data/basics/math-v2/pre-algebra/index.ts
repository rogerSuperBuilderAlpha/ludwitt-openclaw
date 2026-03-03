/**
 * Pre-Algebra Problems V2 - Index
 * 
 * Topics covered:
 * - Ratios and Rates (writing, equivalent, unit rates, comparing, tables)
 * - Proportions (setting up, cross multiplication, scale drawings, similar figures, percent)
 * - Percents (percent of a number, increase/decrease, finding percent, finding whole, discount/tax)
 * - Integers and Expressions (integer operations, order of operations, evaluating, like terms, distributive)
 * - Word Problems (mixed applications) - Batch 3
 */

export * from './ratios'
export * from './proportions'
export * from './percents'
export * from './integers-expressions'
export * from './word-problems'

import { RATIOS_V2 } from './ratios'
import { PROPORTIONS_V2 } from './proportions'
import { PERCENTS_V2 } from './percents'
import { INTEGERS_EXPRESSIONS_V2 } from './integers-expressions'
import { FINAL_PREALGEBRA_WORD_PROBLEMS } from './word-problems'

/**
 * All Pre-Algebra problems combined
 */
export const PREALGEBRA_PROBLEMS_V2 = [
  ...RATIOS_V2,
  ...PROPORTIONS_V2,
  ...PERCENTS_V2,
  ...INTEGERS_EXPRESSIONS_V2,
  ...FINAL_PREALGEBRA_WORD_PROBLEMS,
]

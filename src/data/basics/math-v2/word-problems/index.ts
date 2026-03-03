/**
 * Word Problems V2 - Index
 * 
 * Categories:
 * - Money Word Problems (making change, budgeting, discounts, interest)
 * - Time Word Problems (elapsed time, scheduling, time zones, speed/distance, work rate)
 */

export * from './money'
export * from './time'

import { MONEY_WORD_PROBLEMS_V2 } from './money'
import { TIME_WORD_PROBLEMS_V2 } from './time'

/**
 * All word problems combined
 */
export const WORD_PROBLEMS_V2 = [
  ...MONEY_WORD_PROBLEMS_V2,
  ...TIME_WORD_PROBLEMS_V2,
]

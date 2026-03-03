/**
 * Statistics V2 Module - Problem Database
 * 
 * MathProblemV2 format with enhanced:
 * - Visual support (bar charts, box plots, histograms)
 * - Pedagogical metadata (skills, prerequisites, concepts)
 * - Progressive hints system
 * - Solution steps for guided learning
 * 
 * Topics covered:
 * - Descriptive Statistics (mean, median, mode, range, SD)
 * - Probability (basic, compound, conditional, expected value)
 * - Distributions (z-scores, normal distribution, empirical rule)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

// Import problems by topic
import { DESCRIPTIVE_PROBLEMS_V2 } from './descriptive'
import { PROBABILITY_PROBLEMS_V2 } from './probability'
import { DISTRIBUTIONS_PROBLEMS_V2 } from './distributions'
import { STATISTICAL_INFERENCE_V2 } from './inference'
import { DATA_ANALYSIS_V2 } from './data-analysis'
// Batch 3 expansions
import { PROBABILITY_EXPANDED_V2 } from './probability-expanded'

// Combine all problems
export const STATISTICS_PROBLEMS_V2: MathProblemV2[] = [
  ...DESCRIPTIVE_PROBLEMS_V2,
  ...PROBABILITY_PROBLEMS_V2,
  ...DISTRIBUTIONS_PROBLEMS_V2,
  ...STATISTICAL_INFERENCE_V2,
  ...DATA_ANALYSIS_V2,
  // Batch 3 expansions
  ...PROBABILITY_EXPANDED_V2,
]

// Export by topic for selective loading
export const STATISTICS_BY_TOPIC_V2 = {
  'descriptive': DESCRIPTIVE_PROBLEMS_V2,
  'probability': PROBABILITY_PROBLEMS_V2,
  'distributions': DISTRIBUTIONS_PROBLEMS_V2,
  'inference': STATISTICAL_INFERENCE_V2,
  'data-analysis': DATA_ANALYSIS_V2,
} as const

export type StatisticsTopicV2 = keyof typeof STATISTICS_BY_TOPIC_V2

// Helper functions
export function getStatisticsProblemsByTopicV2(topic: StatisticsTopicV2): MathProblemV2[] {
  return STATISTICS_BY_TOPIC_V2[topic]
}

export function getStatisticsProblemsByDifficultyV2(min: number, max: number): MathProblemV2[] {
  return STATISTICS_PROBLEMS_V2.filter(p => p.difficulty >= min && p.difficulty <= max)
}

export function getStatisticsProblemsByGradeLevelV2(gradeLevel: number): MathProblemV2[] {
  return STATISTICS_PROBLEMS_V2.filter(p => p.gradeLevel === gradeLevel)
}

export function getRandomStatisticsProblemV2(
  difficulty?: number,
  excludeIds: string[] = []
): MathProblemV2 | null {
  let candidates = STATISTICS_PROBLEMS_V2.filter(p => !excludeIds.includes(p.id))
  
  if (difficulty !== undefined) {
    const range = 0.5
    candidates = candidates.filter(p => Math.abs(p.difficulty - difficulty) <= range)
  }
  
  if (candidates.length === 0) return null
  return candidates[Math.floor(Math.random() * candidates.length)]
}

// Statistics summary
export function getStatisticsStatsV2() {
  const topicCounts = Object.entries(STATISTICS_BY_TOPIC_V2).map(([topic, problems]) => ({
    topic,
    count: problems.length,
  }))
  
  const difficulties = STATISTICS_PROBLEMS_V2.map(p => p.difficulty)
  
  return {
    totalProblems: STATISTICS_PROBLEMS_V2.length,
    topicCounts,
    difficultyRange: {
      min: Math.min(...difficulties),
      max: Math.max(...difficulties),
    },
    gradeLevels: [...new Set(STATISTICS_PROBLEMS_V2.map(p => p.gradeLevel))].sort(),
  }
}

// Re-export individual topic arrays for direct access
export { DESCRIPTIVE_PROBLEMS_V2 } from './descriptive'
export { PROBABILITY_PROBLEMS_V2 } from './probability'
export { DISTRIBUTIONS_PROBLEMS_V2 } from './distributions'
export { STATISTICAL_INFERENCE_V2 } from './inference'
export { DATA_ANALYSIS_V2 } from './data-analysis'
// Batch 3 expansions
export { PROBABILITY_EXPANDED_V2 } from './probability-expanded'
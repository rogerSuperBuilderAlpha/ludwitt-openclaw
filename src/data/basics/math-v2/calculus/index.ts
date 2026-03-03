/**
 * Calculus V2 Module - Problem Database
 * 
 * MathProblemV2 format with enhanced:
 * - Visual support (graphs, diagrams)
 * - Pedagogical metadata (skills, prerequisites, concepts)
 * - Progressive hints system
 * - Solution steps for guided learning
 * 
 * Topics covered:
 * - Limits and Continuity
 * - Derivatives (rules, techniques)
 * - Integration (techniques, applications)
 * - Applications (motion, optimization, area)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

// Import problems by topic
import { LIMITS_PROBLEMS_V2 } from './limits'
import { DERIVATIVES_PROBLEMS_V2 } from './derivatives'
import { INTEGRATION_PROBLEMS_V2 } from './integration'
import { APPLICATIONS_PROBLEMS_V2 } from './applications'
import { SERIES_V2 } from './series'

// Combine all problems
export const CALCULUS_PROBLEMS_V2: MathProblemV2[] = [
  ...LIMITS_PROBLEMS_V2,
  ...DERIVATIVES_PROBLEMS_V2,
  ...INTEGRATION_PROBLEMS_V2,
  ...APPLICATIONS_PROBLEMS_V2,
  ...SERIES_V2,
]

// Export by topic for selective loading
export const CALCULUS_BY_TOPIC_V2 = {
  'limits': LIMITS_PROBLEMS_V2,
  'derivatives': DERIVATIVES_PROBLEMS_V2,
  'integration': INTEGRATION_PROBLEMS_V2,
  'applications': APPLICATIONS_PROBLEMS_V2,
  'series': SERIES_V2,
} as const

export type CalculusTopicV2 = keyof typeof CALCULUS_BY_TOPIC_V2

// Helper functions
export function getCalculusProblemsByTopicV2(topic: CalculusTopicV2): MathProblemV2[] {
  return CALCULUS_BY_TOPIC_V2[topic]
}

export function getCalculusProblemsByDifficultyV2(min: number, max: number): MathProblemV2[] {
  return CALCULUS_PROBLEMS_V2.filter(p => p.difficulty >= min && p.difficulty <= max)
}

export function getCalculusProblemsByGradeLevelV2(gradeLevel: number): MathProblemV2[] {
  return CALCULUS_PROBLEMS_V2.filter(p => p.gradeLevel === gradeLevel)
}

export function getRandomCalculusProblemV2(
  difficulty?: number,
  excludeIds: string[] = []
): MathProblemV2 | null {
  let candidates = CALCULUS_PROBLEMS_V2.filter(p => !excludeIds.includes(p.id))
  
  if (difficulty !== undefined) {
    const range = 0.5
    candidates = candidates.filter(p => Math.abs(p.difficulty - difficulty) <= range)
  }
  
  if (candidates.length === 0) return null
  return candidates[Math.floor(Math.random() * candidates.length)]
}

// Calculus summary statistics
export function getCalculusStatsV2() {
  const topicCounts = Object.entries(CALCULUS_BY_TOPIC_V2).map(([topic, problems]) => ({
    topic,
    count: problems.length,
  }))
  
  const difficulties = CALCULUS_PROBLEMS_V2.map(p => p.difficulty)
  
  return {
    totalProblems: CALCULUS_PROBLEMS_V2.length,
    topicCounts,
    difficultyRange: {
      min: Math.min(...difficulties),
      max: Math.max(...difficulties),
    },
    gradeLevels: [...new Set(CALCULUS_PROBLEMS_V2.map(p => p.gradeLevel))].sort(),
  }
}

// Re-export individual topic arrays for direct access
export { LIMITS_PROBLEMS_V2 } from './limits'
export { DERIVATIVES_PROBLEMS_V2 } from './derivatives'
export { INTEGRATION_PROBLEMS_V2 } from './integration'
export { APPLICATIONS_PROBLEMS_V2 } from './applications'
export { SERIES_V2 } from './series'
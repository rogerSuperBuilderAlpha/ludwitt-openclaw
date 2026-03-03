/**
 * Math Problems V2 - Main Index
 * 
 * Central export for all MathProblemV2 format problems.
 * 
 * Structure:
 * - arithmetic/    - Basic operations (add, subtract, multiply, divide)
 * - pre-algebra/   - Ratios, rates, proportions, scale drawings
 * - algebra/       - Equations, functions, systems
 * - geometry/      - Shapes, area, volume, perimeter
 * - calculus/      - Limits, derivatives, integration, applications
 * - statistics/    - Descriptive stats, probability, distributions
 * - word-problems/ - Real-world money and time word problems
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

// Re-export from modules
export * from './arithmetic'
export * from './algebra'
export * from './geometry'
export * from './calculus'
export * from './statistics'
export * from './pre-algebra'
export * from './word-problems'

// Import combined arrays
import { ARITHMETIC_PROBLEMS_V2 } from './arithmetic'
import { ALGEBRA_PROBLEMS_V2 } from './algebra'
import { GEOMETRY_PROBLEMS_V2 } from './geometry'
import { CALCULUS_PROBLEMS_V2 } from './calculus'
import { STATISTICS_PROBLEMS_V2 } from './statistics'
import { PREALGEBRA_PROBLEMS_V2 } from './pre-algebra'
import { WORD_PROBLEMS_V2 } from './word-problems'

// Import AI-generated problems
import { GENERATED_MATH_2026_01_21 } from './generated/batch-2026-01-21'

/**
 * All V2 math problems combined
 */
export const ALL_MATH_PROBLEMS_V2: MathProblemV2[] = [
  ...ARITHMETIC_PROBLEMS_V2,
  ...PREALGEBRA_PROBLEMS_V2,
  ...ALGEBRA_PROBLEMS_V2,
  ...GEOMETRY_PROBLEMS_V2,
  ...CALCULUS_PROBLEMS_V2,
  ...STATISTICS_PROBLEMS_V2,
  ...WORD_PROBLEMS_V2,
  ...GENERATED_MATH_2026_01_21,
]

/**
 * Problem categories with their arrays
 */
export const MATH_V2_BY_CATEGORY = {
  arithmetic: ARITHMETIC_PROBLEMS_V2,
  'pre-algebra': PREALGEBRA_PROBLEMS_V2,
  algebra: ALGEBRA_PROBLEMS_V2,
  geometry: GEOMETRY_PROBLEMS_V2,
  calculus: CALCULUS_PROBLEMS_V2,
  statistics: STATISTICS_PROBLEMS_V2,
  'word-problems': WORD_PROBLEMS_V2,
} as const

export type MathV2Category = keyof typeof MATH_V2_BY_CATEGORY

/**
 * Get problems by category
 */
export function getMathProblemsV2ByCategory(category: MathV2Category): MathProblemV2[] {
  return MATH_V2_BY_CATEGORY[category]
}

/**
 * Get problems by grade level across all categories
 */
export function getMathProblemsV2ByGrade(grade: number): MathProblemV2[] {
  return ALL_MATH_PROBLEMS_V2.filter(p => p.gradeLevel === grade)
}

/**
 * Get problems by difficulty range across all categories
 */
export function getMathProblemsV2ByDifficulty(min: number, max: number): MathProblemV2[] {
  return ALL_MATH_PROBLEMS_V2.filter(p => p.difficulty >= min && p.difficulty <= max)
}

/**
 * Get problems by type (e.g., 'calculus', 'statistics', 'algebra')
 */
export function getMathProblemsV2ByType(type: string): MathProblemV2[] {
  return ALL_MATH_PROBLEMS_V2.filter(p => p.type === type)
}

/**
 * Get problems by topic (e.g., 'Linear Equations', 'Area')
 */
export function getMathProblemsV2ByTopic(topic: string): MathProblemV2[] {
  const lowerTopic = topic.toLowerCase()
  return ALL_MATH_PROBLEMS_V2.filter(p => 
    p.pedagogy.topic.toLowerCase().includes(lowerTopic) ||
    (p.pedagogy.subTopic?.toLowerCase().includes(lowerTopic))
  )
}

/**
 * Get problems by skill ID
 */
export function getMathProblemsV2BySkill(skillId: string): MathProblemV2[] {
  return ALL_MATH_PROBLEMS_V2.filter(p => 
    p.pedagogy.skills.includes(skillId)
  )
}

// Track recently shown problem types to improve variety
let recentProblemTypes: string[] = []
const MAX_RECENT_TYPES = 3 // Avoid repeating any of the last 3 types

/**
 * Get a random problem matching criteria with improved variety
 * 
 * IMPROVEMENT: Avoids showing the same problem type consecutively
 * by tracking recently used types and preferring different ones.
 */
export function getRandomMathProblemV2(options?: {
  category?: MathV2Category
  gradeLevel?: number
  difficulty?: number
  excludeIds?: string[]
  topic?: string
  /** If true, try to avoid recently shown types for better variety */
  avoidRecentTypes?: boolean
}): MathProblemV2 | null {
  const avoidRecent = options?.avoidRecentTypes ?? true // Default to true for variety
  
  let candidates = ALL_MATH_PROBLEMS_V2

  if (options?.category) {
    candidates = MATH_V2_BY_CATEGORY[options.category]
  }

  if (options?.gradeLevel !== undefined) {
    candidates = candidates.filter(p => p.gradeLevel === options.gradeLevel)
  }

  if (options?.difficulty !== undefined) {
    const range = 0.5
    candidates = candidates.filter(p => 
      Math.abs(p.difficulty - options.difficulty!) <= range
    )
  }

  if (options?.topic) {
    const lowerTopic = options.topic.toLowerCase()
    candidates = candidates.filter(p => 
      p.pedagogy.topic.toLowerCase().includes(lowerTopic)
    )
  }

  if (options?.excludeIds?.length) {
    candidates = candidates.filter(p => !options.excludeIds!.includes(p.id))
  }

  if (candidates.length === 0) return null
  
  // Improved variety: Try to avoid recently shown types
  if (avoidRecent && recentProblemTypes.length > 0 && candidates.length > 1) {
    // First, try to find problems NOT in recent types
    const diverseCandidates = candidates.filter(p => 
      !recentProblemTypes.includes(p.pedagogy.topic)
    )
    
    // If we have diverse candidates, prefer those
    if (diverseCandidates.length > 0) {
      candidates = diverseCandidates
    }
    // Otherwise, at least try to avoid the MOST recent type
    else if (recentProblemTypes.length > 0) {
      const nonImmediate = candidates.filter(p => 
        p.pedagogy.topic !== recentProblemTypes[0]
      )
      if (nonImmediate.length > 0) {
        candidates = nonImmediate
      }
    }
  }
  
  // Select random problem from candidates
  const selected = candidates[Math.floor(Math.random() * candidates.length)]
  
  // Track this type for variety
  if (selected) {
    const selectedType = selected.pedagogy.topic
    // Remove from recent if already there
    recentProblemTypes = recentProblemTypes.filter(t => t !== selectedType)
    // Add to front
    recentProblemTypes.unshift(selectedType)
    // Keep only last N
    if (recentProblemTypes.length > MAX_RECENT_TYPES) {
      recentProblemTypes = recentProblemTypes.slice(0, MAX_RECENT_TYPES)
    }
  }
  
  return selected
}

/**
 * Reset the recent problem types tracker
 * Useful when starting a new session
 */
export function resetRecentProblemTypes(): void {
  recentProblemTypes = []
}

/**
 * Get a similar problem to the given one
 * (same topic, similar difficulty)
 */
export function getSimilarMathProblemV2(
  currentProblem: MathProblemV2,
  excludeIds: string[] = []
): MathProblemV2 | null {
  const candidates = ALL_MATH_PROBLEMS_V2.filter(p => 
    p.id !== currentProblem.id &&
    !excludeIds.includes(p.id) &&
    p.pedagogy.topic === currentProblem.pedagogy.topic &&
    Math.abs(p.difficulty - currentProblem.difficulty) <= 1.0
  )

  if (candidates.length === 0) {
    // Fallback: same type, any topic
    const fallback = ALL_MATH_PROBLEMS_V2.filter(p => 
      p.id !== currentProblem.id &&
      !excludeIds.includes(p.id) &&
      p.type === currentProblem.type
    )
    if (fallback.length === 0) return null
    return fallback[Math.floor(Math.random() * fallback.length)]
  }

  return candidates[Math.floor(Math.random() * candidates.length)]
}

/**
 * Get problems that cover prerequisite skills for a given problem
 */
export function getPrerequisiteProblems(
  problem: MathProblemV2,
  maxCount: number = 5
): MathProblemV2[] {
  const prerequisites = problem.pedagogy.prerequisites
  if (!prerequisites.length) return []

  const prereqProblems = ALL_MATH_PROBLEMS_V2.filter(p => 
    p.id !== problem.id &&
    p.pedagogy.skills.some(skill => prerequisites.includes(skill))
  )

  // Shuffle and take maxCount
  const shuffled = prereqProblems.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, maxCount)
}

/**
 * Get summary statistics for all V2 problems
 */
export function getMathV2Summary() {
  const categoryCounts = Object.entries(MATH_V2_BY_CATEGORY).map(
    ([category, problems]) => ({
      category,
      count: problems.length,
    })
  )

  const allDifficulties = ALL_MATH_PROBLEMS_V2.map(p => p.difficulty)
  const allGrades = ALL_MATH_PROBLEMS_V2.map(p => p.gradeLevel)

  // Collect all unique topics
  const topics = new Set<string>()
  const subTopics = new Set<string>()
  ALL_MATH_PROBLEMS_V2.forEach(p => {
    topics.add(p.pedagogy.topic)
    if (p.pedagogy.subTopic) {
      subTopics.add(p.pedagogy.subTopic)
    }
  })

  return {
    totalProblems: ALL_MATH_PROBLEMS_V2.length,
    categoryCounts,
    difficultyRange: {
      min: Math.min(...allDifficulties),
      max: Math.max(...allDifficulties),
    },
    gradeLevelRange: {
      min: Math.min(...allGrades),
      max: Math.max(...allGrades),
    },
    uniqueGrades: [...new Set(allGrades)].sort((a, b) => a - b),
    topicCount: topics.size,
    subTopicCount: subTopics.size,
    topics: [...topics].sort(),
    subTopics: [...subTopics].sort(),
  }
}

/**
 * Get problems with visual content (diagrams, graphs, or images)
 */
export function getProblemsWithVisuals(): MathProblemV2[] {
  return ALL_MATH_PROBLEMS_V2.filter(p => 
    p.visuals?.diagram || p.visuals?.graph || p.visuals?.image
  )
}

/**
 * Get all V2 math problems (alias for ALL_MATH_PROBLEMS_V2)
 */
export function getAllMathProblemsV2(): MathProblemV2[] {
  return ALL_MATH_PROBLEMS_V2
}

/**
 * Get problems by cognitive level (Bloom's taxonomy)
 */
export function getMathProblemsV2ByCognitiveLevel(
  level: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
): MathProblemV2[] {
  return ALL_MATH_PROBLEMS_V2.filter(p => 
    p.pedagogy.cognitiveLevel === level
  )
}

/**
 * Constants for Basics system
 * Centralized thresholds and magic numbers for maintainability
 */

export const MASTERY_THRESHOLDS = {
  STRUGGLING: 0.3,
  DEVELOPING: 0.6,
  PROFICIENT: 0.7,
  MASTERED: 0.8,
} as const

export const METACOGNITIVE_THRESHOLDS = {
  ADVANCED: 0.6,
} as const

export const SKILL_ASSESSMENT_MIN_ATTEMPTS = {
  STRUGGLING: 3,
  MASTERED: 5,
  READY_FOR_ADVANCEMENT: 3,
} as const


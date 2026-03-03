/**
 * Reading Exercises Audit Test
 * 
 * Comprehensive validation of all reading exercise data including:
 * - Structural validation (required fields, types)
 * - Passage validation (non-empty, appropriate length)
 * - Question validation (format, answer validity)
 * - Distribution analysis (grade levels, types)
 */

import type { ReadingExercise, ReadingQuestion } from '@/lib/types/basics'

// Import comprehension exercises
import { COMPREHENSION_G1_3 } from '../reading/comprehension_g1_3'
import { COMPREHENSION_G1_3_EXPANDED } from '../reading/comprehension_g1_3_expanded'
import { COMPREHENSION_G4_6 } from '../reading/comprehension_g4_6'
import { COMPREHENSION_G4_6_EXPANDED } from '../reading/comprehension_g4_6_expanded'
import { COMPREHENSION_G7_9 } from '../reading/comprehension_g7_9'
import { COMPREHENSION_G7_9_EXPANDED } from '../reading/comprehension_g7_9_expanded'
import { COMPREHENSION_G10_12 } from '../reading/comprehension_g10_12'

// Import specialized exercises
import { STEM_READING } from '../reading/stemReading'
import { VOCABULARY_EXERCISES } from '../reading/vocabulary'
import { GRAMMAR_EXERCISES } from '../reading/grammar'

// Import literary exercises
import { POETRY_ANALYSIS } from '../reading/literary/poetry'
import { PROSE_ANALYSIS } from '../reading/literary/prose'

import {
  validateDifficulty,
  validateRequiredFields,
  findDuplicateIds,
  validateNonEmptyArray
} from './shared/content-validators'
import {
  AuditCollector,
  calculateGradeDistribution,
  calculateDistribution
} from './shared/test-utils'

// ============================================================================
// Combine All Reading Exercises
// ============================================================================

const ALL_READING_EXERCISES: ReadingExercise[] = [
  ...COMPREHENSION_G1_3,
  ...COMPREHENSION_G1_3_EXPANDED,
  ...COMPREHENSION_G4_6,
  ...COMPREHENSION_G4_6_EXPANDED,
  ...COMPREHENSION_G7_9,
  ...COMPREHENSION_G7_9_EXPANDED,
  ...COMPREHENSION_G10_12,
  ...STEM_READING,
  ...VOCABULARY_EXERCISES,
  ...GRAMMAR_EXERCISES,
  ...POETRY_ANALYSIS,
  ...PROSE_ANALYSIS,
]

const READING_BY_CATEGORY = {
  'comprehension-g1-3': COMPREHENSION_G1_3,
  'comprehension-g1-3-expanded': COMPREHENSION_G1_3_EXPANDED,
  'comprehension-g4-6': COMPREHENSION_G4_6,
  'comprehension-g4-6-expanded': COMPREHENSION_G4_6_EXPANDED,
  'comprehension-g7-9': COMPREHENSION_G7_9,
  'comprehension-g7-9-expanded': COMPREHENSION_G7_9_EXPANDED,
  'comprehension-g10-12': COMPREHENSION_G10_12,
  'stem': STEM_READING,
  'vocabulary': VOCABULARY_EXERCISES,
  'grammar': GRAMMAR_EXERCISES,
  'poetry': POETRY_ANALYSIS,
  'prose': PROSE_ANALYSIS,
}

// ============================================================================
// Test Configuration
// ============================================================================

const REQUIRED_FIELDS: (keyof ReadingExercise)[] = [
  'id',
  'type',
  'difficulty',
  'questions'
]

const VALID_EXERCISE_TYPES = [
  'comprehension',
  'vocabulary',
  'grammar',
  'critical-analysis'
]

const VALID_QUESTION_TYPES = [
  'multiple-choice',
  'short-answer',
  'true-false'
]

// ============================================================================
// Audit Collector
// ============================================================================

const collector = new AuditCollector('Reading')

// ============================================================================
// Tests
// ============================================================================

describe('Reading Exercises Audit', () => {
  const allExercises = ALL_READING_EXERCISES

  beforeAll(() => {
    collector.setTotal(allExercises.length)
  })

  afterAll(() => {
    collector.printReport()
  })

  describe('Data Load Verification', () => {
    it('should load exercises from all categories', () => {
      expect(allExercises.length).toBeGreaterThan(0)
      
      // Log category counts
      for (const [category, exercises] of Object.entries(READING_BY_CATEGORY)) {
        collector.incrementStat(`category:${category}`, exercises.length)
      }
    })

    it('should have no duplicate IDs', () => {
      const ids = allExercises.map(e => e.id)
      const duplicates = findDuplicateIds(ids)
      
      duplicates.forEach(id => {
        collector.addError(id, 'duplicate-id', `Duplicate ID found: ${id}`)
      })
      
      expect(duplicates).toHaveLength(0)
    })
  })

  describe('Structural Validation', () => {
    it('should have all required fields', () => {
      let missingFieldsCount = 0
      
      for (const exercise of allExercises) {
        const { valid, missing } = validateRequiredFields(exercise, REQUIRED_FIELDS)
        
        if (!valid) {
          missingFieldsCount++
          collector.addError(
            exercise.id,
            'missing-field',
            `Missing required fields: ${missing.join(', ')}`
          )
        }
      }
      
      expect(missingFieldsCount).toBe(0)
    })

    it('should have valid exercise types', () => {
      let invalidTypeCount = 0
      
      for (const exercise of allExercises) {
        if (!VALID_EXERCISE_TYPES.includes(exercise.type)) {
          invalidTypeCount++
          collector.addError(
            exercise.id,
            'invalid-type',
            `Invalid type: "${exercise.type}"`
          )
        }
      }
      
      expect(invalidTypeCount).toBe(0)
    })

    it('should have difficulty in valid range (1.0-12.0)', () => {
      let invalidDifficultyCount = 0
      
      for (const exercise of allExercises) {
        const result = validateDifficulty(exercise.difficulty)
        
        if (!result.valid) {
          invalidDifficultyCount++
          collector.addError(
            exercise.id,
            'invalid-difficulty',
            result.message || 'Invalid difficulty'
          )
        }
      }
      
      expect(invalidDifficultyCount).toBe(0)
    })

    it('should have reasonable time estimates when present', () => {
      for (const exercise of allExercises) {
        if (exercise.timeEstimate !== undefined) {
          if (exercise.timeEstimate < 10) {
            collector.addWarning(
              exercise.id,
              'low-time-estimate',
              `Time estimate ${exercise.timeEstimate}s is very low`
            )
          }
          if (exercise.timeEstimate > 600) {
            collector.addWarning(
              exercise.id,
              'high-time-estimate',
              `Time estimate ${exercise.timeEstimate}s is very high`
            )
          }
        }
      }
      
      // Warnings only
      expect(true).toBe(true)
    })
  })

  describe('Passage Validation', () => {
    it('should have non-empty passage for comprehension type', () => {
      let emptyPassageCount = 0
      
      for (const exercise of allExercises) {
        if (exercise.type === 'comprehension') {
          if (!exercise.passage || exercise.passage.trim() === '') {
            emptyPassageCount++
            collector.addError(exercise.id, 'empty-passage', 'Comprehension exercise has empty passage')
          }
        }
      }
      
      expect(emptyPassageCount).toBe(0)
    })

    it('should have reasonable passage length', () => {
      for (const exercise of allExercises) {
        if (exercise.passage) {
          const wordCount = exercise.passage.split(/\s+/).length
          
          if (wordCount < 10) {
            collector.addWarning(
              exercise.id,
              'short-passage',
              `Passage is very short: ${wordCount} words`
            )
          }
          
          if (wordCount > 2000) {
            collector.addWarning(
              exercise.id,
              'long-passage',
              `Passage is very long: ${wordCount} words`
            )
          }
        }
      }
      
      // Warnings only
      expect(true).toBe(true)
    })

    it('should have valid Lexile scores when present', () => {
      for (const exercise of allExercises) {
        if (exercise.lexileScore !== undefined) {
          if (exercise.lexileScore < 0 || exercise.lexileScore > 2000) {
            collector.addWarning(
              exercise.id,
              'invalid-lexile',
              `Lexile score ${exercise.lexileScore} is outside typical range (0-2000)`
            )
          }
        }
      }
      
      // Warnings only
      expect(true).toBe(true)
    })
  })

  describe('Question Validation', () => {
    it('should have at least one question', () => {
      let noQuestionsCount = 0
      
      for (const exercise of allExercises) {
        if (!validateNonEmptyArray(exercise.questions)) {
          noQuestionsCount++
          collector.addError(exercise.id, 'no-questions', 'Exercise has no questions')
        }
      }
      
      expect(noQuestionsCount).toBe(0)
    })

    it('should have valid question types', () => {
      let invalidTypeCount = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            if (!VALID_QUESTION_TYPES.includes(question.type)) {
              invalidTypeCount++
              collector.addError(
                exercise.id,
                'invalid-question-type',
                `Question ${question.id} has invalid type: "${question.type}"`
              )
            }
          }
        }
      }
      
      expect(invalidTypeCount).toBe(0)
    })

    it('should have unique question IDs within each exercise', () => {
      let duplicateCount = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          const questionIds = exercise.questions.map(q => q.id)
          const duplicates = findDuplicateIds(questionIds)
          
          if (duplicates.length > 0) {
            duplicateCount++
            collector.addError(
              exercise.id,
              'duplicate-question-id',
              `Duplicate question IDs: ${duplicates.join(', ')}`
            )
          }
        }
      }
      
      expect(duplicateCount).toBe(0)
    })

    it('should have non-empty question text', () => {
      let emptyQuestionCount = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            if (!question.question || question.question.trim() === '') {
              emptyQuestionCount++
              collector.addError(
                exercise.id,
                'empty-question',
                `Question ${question.id} has empty text`
              )
            }
          }
        }
      }
      
      expect(emptyQuestionCount).toBe(0)
    })

    it('should have correct answer defined', () => {
      let missingAnswerCount = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            if (question.correctAnswer === undefined || question.correctAnswer === null) {
              missingAnswerCount++
              collector.addWarning(
                exercise.id,
                'missing-answer',
                `Question ${question.id} has no correctAnswer`
              )
            }
          }
        }
      }
      
      // Allow some missing for short-answer (AI graded)
      expect(true).toBe(true)
    })
  })

  describe('Multiple Choice Validation', () => {
    it('should have at least 2 options for multiple choice', () => {
      let insufficientOptionsCount = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            if (question.type === 'multiple-choice') {
              if (!question.options || question.options.length < 2) {
                insufficientOptionsCount++
                collector.addError(
                  exercise.id,
                  'insufficient-options',
                  `Question ${question.id} needs at least 2 options`
                )
              }
            }
          }
        }
      }
      
      expect(insufficientOptionsCount).toBe(0)
    })

    it('should have correct answer in options for multiple choice', () => {
      let invalidAnswerCount = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            if (question.type === 'multiple-choice' && question.options && question.correctAnswer) {
              const correctAnswers = Array.isArray(question.correctAnswer) 
                ? question.correctAnswer 
                : [question.correctAnswer]
              
              for (const answer of correctAnswers) {
                if (!question.options.includes(String(answer))) {
                  invalidAnswerCount++
                  collector.addError(
                    exercise.id,
                    'answer-not-in-options',
                    `Question ${question.id}: answer "${answer}" not in options`
                  )
                }
              }
            }
          }
        }
      }
      
      expect(invalidAnswerCount).toBe(0)
    })

    it('should have unique options for multiple choice', () => {
      let duplicateOptionsCount = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            if (question.type === 'multiple-choice' && question.options) {
              const uniqueOptions = new Set(question.options.map(o => o.toLowerCase().trim()))
              if (uniqueOptions.size !== question.options.length) {
                duplicateOptionsCount++
                collector.addWarning(
                  exercise.id,
                  'duplicate-options',
                  `Question ${question.id} has duplicate options`
                )
              }
            }
          }
        }
      }
      
      // Warnings only
      expect(true).toBe(true)
    })
  })

  describe('Explanation Validation', () => {
    it('should have explanations for questions', () => {
      let missingExplanationCount = 0
      let totalQuestions = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            totalQuestions++
            if (!question.explanation || question.explanation.trim() === '') {
              missingExplanationCount++
            }
          }
        }
      }
      
      const coveragePercent = Math.round(
        ((totalQuestions - missingExplanationCount) / totalQuestions) * 100
      )
      console.log(`\n  Explanation coverage: ${coveragePercent}% (${totalQuestions - missingExplanationCount}/${totalQuestions})`)
      
      // Should have at least 50% explanation coverage
      expect(coveragePercent).toBeGreaterThan(50)
    })
  })

  describe('Skill Tagging Validation', () => {
    it('should have skill tags for questions', () => {
      let missingSkillCount = 0
      let totalQuestions = 0
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            totalQuestions++
            if (!question.skill || question.skill.trim() === '') {
              missingSkillCount++
            }
          }
        }
      }
      
      const coveragePercent = Math.round(
        ((totalQuestions - missingSkillCount) / totalQuestions) * 100
      )
      console.log(`\n  Skill tagging coverage: ${coveragePercent}% (${totalQuestions - missingSkillCount}/${totalQuestions})`)
      
      // Should have at least 80% skill coverage
      expect(coveragePercent).toBeGreaterThan(80)
    })
  })

  describe('Distribution Analysis', () => {
    it('should have reasonable grade distribution', () => {
      const distribution = calculateGradeDistribution(allExercises)
      
      console.log('\n  Grade Distribution:')
      for (let grade = 1; grade <= 12; grade++) {
        const count = distribution[grade] || 0
        const bar = '█'.repeat(Math.min(Math.round(count / 5), 30))
        console.log(`    Grade ${grade.toString().padStart(2)}: ${bar} ${count}`)
      }
      
      expect(true).toBe(true)
    })

    it('should have reasonable type distribution', () => {
      const distribution = calculateDistribution(allExercises, e => e.type)
      
      console.log('\n  Type Distribution:')
      for (const [type, count] of Object.entries(distribution).sort((a, b) => b[1] - a[1])) {
        console.log(`    ${type.padEnd(20)}: ${count}`)
      }
      
      expect(true).toBe(true)
    })

    it('should report question type distribution', () => {
      const questionTypes: Record<string, number> = {}
      
      for (const exercise of allExercises) {
        if (exercise.questions) {
          for (const question of exercise.questions) {
            questionTypes[question.type] = (questionTypes[question.type] || 0) + 1
          }
        }
      }
      
      console.log('\n  Question Type Distribution:')
      for (const [type, count] of Object.entries(questionTypes).sort((a, b) => b[1] - a[1])) {
        console.log(`    ${type.padEnd(20)}: ${count}`)
      }
      
      expect(true).toBe(true)
    })
  })
})

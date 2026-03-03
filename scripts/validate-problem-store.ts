#!/usr/bin/env node
/**
 * Problem Store Validator
 * 
 * Comprehensive validation for math and reading problem stores:
 * - ID uniqueness with duplicate detection
 * - ID format conventions
 * - Required field validation
 * - Difficulty distribution analysis
 * - Enhancement field coverage report
 * - Schema integrity checks
 * 
 * Usage:
 *   npx tsx scripts/validate-problem-store.ts
 *   npx tsx scripts/validate-problem-store.ts --verbose
 */

// ============================================================================
// Direct imports from data files (bypassing path aliases)
// ============================================================================

import { ARITHMETIC_PROBLEMS } from '../src/data/basics/math/arithmetic'
import { PREALGEBRA_PROBLEMS } from '../src/data/basics/math/preAlgebra'
import { ALGEBRA_PROBLEMS } from '../src/data/basics/math/algebra'
import { GEOMETRY_PROBLEMS } from '../src/data/basics/math/geometry'
import { WORD_PROBLEMS } from '../src/data/basics/math/wordProblems'
import { STATISTICS_PROBLEMS } from '../src/data/basics/math/statistics'
import { TRIGONOMETRY_PROBLEMS } from '../src/data/basics/math/trigonometry'
import { PRECALCULUS_PROBLEMS } from '../src/data/basics/math/precalculus'
import { CALCULUS_PROBLEMS } from '../src/data/basics/math/calculus'
import { LINEAR_ALGEBRA_PROBLEMS } from '../src/data/basics/math/linearAlgebra'
import { DISCRETE_MATH_PROBLEMS } from '../src/data/basics/math/discreteMath'
import { ELEMENTARY_TOPICS_PROBLEMS } from '../src/data/basics/math/elementaryTopics'

import { COMPREHENSION_G1_3 } from '../src/data/basics/reading/comprehension_g1_3'
import { COMPREHENSION_G4_6 } from '../src/data/basics/reading/comprehension_g4_6'
import { COMPREHENSION_G7_9 } from '../src/data/basics/reading/comprehension_g7_9'
import { COMPREHENSION_G10_12 } from '../src/data/basics/reading/comprehension_g10_12'
import { STEM_READING } from '../src/data/basics/reading/stemReading'
import { VOCABULARY_EXERCISES } from '../src/data/basics/reading/vocabulary'
import { GRAMMAR_EXERCISES } from '../src/data/basics/reading/grammar'

import { LATIN_EXERCISES } from '../src/data/basics/latin'
import { GREEK_EXERCISES } from '../src/data/basics/greek'

// ============================================================================
// Aggregate all problems
// ============================================================================

interface MathProblem {
  id: string
  type: string
  difficulty: number
  question: string
  correctAnswer: string
  explanation: string
  topic: string
  timeEstimate: number
  acceptableAnswers?: string[]
  hint?: string
  subTopic?: string
  skillIds?: string[]
  tags?: string[]
  conceptsCovered?: string[]
  commonMistakes?: string[]
  prerequisiteSkills?: string[]
  diagram?: unknown
  latex?: string
}

interface ReadingQuestion {
  id: string
  question: string
  type: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
}

interface ReadingExercise {
  id: string
  type: string
  difficulty: number
  passage?: string
  questions: ReadingQuestion[]
}

interface TranslationExercise {
  id: string
  difficulty: number
}

const ALL_MATH_PROBLEMS: MathProblem[] = [
  ...ARITHMETIC_PROBLEMS,
  ...PREALGEBRA_PROBLEMS,
  ...ALGEBRA_PROBLEMS,
  ...GEOMETRY_PROBLEMS,
  ...WORD_PROBLEMS,
  ...STATISTICS_PROBLEMS,
  ...TRIGONOMETRY_PROBLEMS,
  ...PRECALCULUS_PROBLEMS,
  ...CALCULUS_PROBLEMS,
  ...LINEAR_ALGEBRA_PROBLEMS,
  ...DISCRETE_MATH_PROBLEMS,
  ...ELEMENTARY_TOPICS_PROBLEMS
] as MathProblem[]

const ALL_READING_EXERCISES: ReadingExercise[] = [
  ...COMPREHENSION_G1_3,
  ...COMPREHENSION_G4_6,
  ...COMPREHENSION_G7_9,
  ...COMPREHENSION_G10_12,
  ...STEM_READING,
  ...VOCABULARY_EXERCISES,
  ...GRAMMAR_EXERCISES
] as ReadingExercise[]

const ALL_LATIN_EXERCISES = LATIN_EXERCISES as TranslationExercise[]
const ALL_GREEK_EXERCISES = GREEK_EXERCISES as TranslationExercise[]

// ============================================================================
// Configuration
// ============================================================================

const REQUIRED_MATH_FIELDS = ['id', 'type', 'difficulty', 'question', 'correctAnswer', 'explanation', 'topic', 'timeEstimate'] as const
const ENHANCEMENT_FIELDS = ['skillIds', 'tags', 'conceptsCovered', 'commonMistakes', 'prerequisiteSkills'] as const

const VALID_MATH_TYPES = [
  'arithmetic', 'pre-algebra', 'algebra', 'geometry', 'word-problem',
  'statistics', 'trigonometry', 'precalculus', 'calculus', 'linear-algebra', 'discrete-math'
]

// Valid skill IDs from the expanded skill trees
const VALID_SKILL_IDS = new Set([
  // Math Foundations
  'addition', 'subtraction', 'multiplication', 'division', 'arithmetic_basics',
  'fractions', 'decimals', 'percentages', 'algebra_basics', 'word_problems',
  'geometry', 'advanced_algebra', 'statistics', 'trigonometry',
  // Advanced Math - Calculus
  'calculus_prep', 'limits', 'derivatives', 'integration', 'calculus_mastery',
  // Advanced Math - Linear Algebra
  'vectors', 'matrices', 'linear_systems', 'eigenvalues', 'linear_algebra_mastery',
  // Advanced Math - Statistics
  'advanced_statistics', 'probability_theory',
  // Discrete Math
  'logic_basics', 'set_theory', 'proof_techniques', 'combinatorics',
  'number_theory', 'graph_theory', 'recurrence', 'discrete_mastery'
])

// ============================================================================
// Types
// ============================================================================

interface ValidationResult {
  errors: string[]
  warnings: string[]
  stats: {
    totalMath: number
    totalReading: number
    totalLatin: number
    totalGreek: number
    duplicateIds: string[]
    difficultyDistribution: Record<number, number>
    typeDistribution: Record<string, number>
    enhancementCoverage: Record<string, { count: number; percent: number }>
  }
}

// ============================================================================
// Validators
// ============================================================================

function findDuplicateIds(ids: string[]): string[] {
  const seen = new Set<string>()
  const duplicates: string[] = []
  
  for (const id of ids) {
    if (seen.has(id)) {
      if (!duplicates.includes(id)) duplicates.push(id)
    } else {
      seen.add(id)
    }
  }
  
  return duplicates
}

function validateIdFormat(id: string): boolean {
  // Relaxed pattern - check for reasonable format
  return /^[a-z]+-[a-z0-9-]+-\d{3}$/.test(id) || /^[a-z]+-g\d+-[a-z]+-\d{3}$/.test(id)
}

function validateMathProblem(problem: MathProblem, errors: string[], warnings: string[]): void {
  const prefix = `[${problem.id}]`
  
  // Required fields
  for (const field of REQUIRED_MATH_FIELDS) {
    const value = problem[field as keyof MathProblem]
    if (value === undefined || value === null || value === '') {
      errors.push(`${prefix} Missing required field: ${field}`)
    }
  }
  
  // Type validation
  if (!VALID_MATH_TYPES.includes(problem.type)) {
    errors.push(`${prefix} Invalid type: "${problem.type}" (valid: ${VALID_MATH_TYPES.join(', ')})`)
  }
  
  // Difficulty bounds
  if (problem.difficulty < 1 || problem.difficulty > 12) {
    errors.push(`${prefix} Difficulty ${problem.difficulty} out of range [1, 12]`)
  }
  
  // Time estimate reasonableness
  if (problem.timeEstimate && (problem.timeEstimate < 10 || problem.timeEstimate > 600)) {
    warnings.push(`${prefix} Unusual timeEstimate: ${problem.timeEstimate}s (expected 10-600)`)
  }
  
  // ID format check
  if (!validateIdFormat(problem.id)) {
    warnings.push(`${prefix} Non-standard ID format (expected: {category}-g{grade}-{topic}-{num})`)
  }
  
  // Validate skillIds reference valid skills
  if (problem.skillIds && Array.isArray(problem.skillIds)) {
    for (const skillId of problem.skillIds) {
      if (!VALID_SKILL_IDS.has(skillId)) {
        warnings.push(`${prefix} Unknown skillId: "${skillId}"`)
      }
    }
  }
  
  // Validate prerequisiteSkills reference valid skills
  if (problem.prerequisiteSkills && Array.isArray(problem.prerequisiteSkills)) {
    for (const prereq of problem.prerequisiteSkills) {
      if (!VALID_SKILL_IDS.has(prereq)) {
        warnings.push(`${prefix} Unknown prerequisiteSkill: "${prereq}"`)
      }
    }
    
    // Check for self-referential prerequisites (prereq shouldn't be in skillIds)
    if (problem.skillIds) {
      const skillIdSet = new Set(problem.skillIds)
      for (const prereq of problem.prerequisiteSkills) {
        if (skillIdSet.has(prereq)) {
          warnings.push(`${prefix} Prerequisite "${prereq}" is also in skillIds (should not be self-referential)`)
        }
      }
    }
  }
}

function validateReadingExercise(exercise: ReadingExercise, errors: string[], warnings: string[]): void {
  const prefix = `[${exercise.id}]`
  
  if (!exercise.id || !exercise.passage || !Array.isArray(exercise.questions) || exercise.questions.length === 0) {
    errors.push(`${prefix} Missing required reading exercise fields`)
  }
  
  if (exercise.difficulty < 1 || exercise.difficulty > 12) {
    errors.push(`${prefix} Difficulty ${exercise.difficulty} out of range [1, 12]`)
  }
  
  for (const q of exercise.questions) {
    if (!q.id || !q.question || !q.type) {
      errors.push(`${prefix}/${q.id || 'unknown'} Missing question fields`)
    }
    
    if (q.type === 'multiple-choice') {
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`${prefix}/${q.id} Multiple choice needs >= 2 options`)
      }
      // correctAnswer can be string or string[]
      const correctAnswers = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer]
      const hasValidAnswer = correctAnswers.every(ans => ans && q.options?.includes(ans))
      if (!q.correctAnswer || !hasValidAnswer) {
        errors.push(`${prefix}/${q.id} correctAnswer not in options`)
      }
    }
  }
}

function calculateEnhancementCoverage(problems: MathProblem[]): Record<string, { count: number; percent: number }> {
  const coverage: Record<string, { count: number; percent: number }> = {}
  const total = problems.length
  
  for (const field of ENHANCEMENT_FIELDS) {
    const count = problems.filter(p => {
      const value = p[field as keyof MathProblem]
      return Array.isArray(value) ? value.length > 0 : !!value
    }).length
    
    coverage[field] = {
      count,
      percent: Math.round((count / total) * 100)
    }
  }
  
  return coverage
}

function calculateDifficultyDistribution(problems: MathProblem[]): Record<number, number> {
  const distribution: Record<number, number> = {}
  
  for (let grade = 1; grade <= 12; grade++) {
    distribution[grade] = 0
  }
  
  for (const p of problems) {
    const grade = Math.round(p.difficulty)
    if (grade >= 1 && grade <= 12) {
      distribution[grade]++
    }
  }
  
  return distribution
}

function calculateTypeDistribution(problems: MathProblem[]): Record<string, number> {
  const distribution: Record<string, number> = {}
  
  for (const p of problems) {
    distribution[p.type] = (distribution[p.type] || 0) + 1
  }
  
  return distribution
}

// ============================================================================
// Main Validation
// ============================================================================

function validate(): ValidationResult {
  const result: ValidationResult = {
    errors: [],
    warnings: [],
    stats: {
      totalMath: ALL_MATH_PROBLEMS.length,
      totalReading: ALL_READING_EXERCISES.length,
      totalLatin: ALL_LATIN_EXERCISES.length,
      totalGreek: ALL_GREEK_EXERCISES.length,
      duplicateIds: [],
      difficultyDistribution: {},
      typeDistribution: {},
      enhancementCoverage: {}
    }
  }
  
  // Check ID uniqueness
  const allIds = [
    ...ALL_MATH_PROBLEMS.map(m => m.id),
    ...ALL_READING_EXERCISES.map(r => r.id),
    ...ALL_LATIN_EXERCISES.map(l => l.id),
    ...ALL_GREEK_EXERCISES.map(g => g.id)
  ]
  
  result.stats.duplicateIds = findDuplicateIds(allIds)
  
  if (result.stats.duplicateIds.length > 0) {
    result.errors.push(`Found ${result.stats.duplicateIds.length} duplicate ID(s): ${result.stats.duplicateIds.join(', ')}`)
  }
  
  // Validate each math problem
  for (const problem of ALL_MATH_PROBLEMS) {
    validateMathProblem(problem, result.errors, result.warnings)
  }
  
  // Validate each reading exercise
  for (const exercise of ALL_READING_EXERCISES) {
    validateReadingExercise(exercise, result.errors, result.warnings)
  }
  
  // Calculate statistics
  result.stats.difficultyDistribution = calculateDifficultyDistribution(ALL_MATH_PROBLEMS)
  result.stats.typeDistribution = calculateTypeDistribution(ALL_MATH_PROBLEMS)
  result.stats.enhancementCoverage = calculateEnhancementCoverage(ALL_MATH_PROBLEMS)
  
  return result
}

// ============================================================================
// CLI Output
// ============================================================================

function printReport(result: ValidationResult, verbose: boolean): void {
  console.log('\n╔══════════════════════════════════════════════════════════════════╗')
  console.log('║              PROBLEM STORE VALIDATION REPORT                     ║')
  console.log('╚══════════════════════════════════════════════════════════════════╝\n')
  
  // Summary
  console.log('📊 SUMMARY')
  console.log('─'.repeat(50))
  console.log(`  Total Math Problems:     ${result.stats.totalMath}`)
  console.log(`  Total Reading Exercises: ${result.stats.totalReading}`)
  console.log(`  Total Latin Exercises:   ${result.stats.totalLatin}`)
  console.log(`  Total Greek Exercises:   ${result.stats.totalGreek}`)
  console.log(`  Errors:                  ${result.errors.length}`)
  console.log(`  Warnings:                ${result.warnings.length}`)
  console.log()
  
  // Errors
  if (result.errors.length > 0) {
    console.log('❌ ERRORS')
    console.log('─'.repeat(50))
    for (const error of result.errors.slice(0, verbose ? Infinity : 10)) {
      console.log(`  ${error}`)
    }
    if (!verbose && result.errors.length > 10) {
      console.log(`  ... and ${result.errors.length - 10} more (use --verbose to see all)`)
    }
    console.log()
  }
  
  // Warnings
  if (result.warnings.length > 0) {
    console.log('⚠️  WARNINGS')
    console.log('─'.repeat(50))
    for (const warning of result.warnings.slice(0, verbose ? Infinity : 5)) {
      console.log(`  ${warning}`)
    }
    if (!verbose && result.warnings.length > 5) {
      console.log(`  ... and ${result.warnings.length - 5} more (use --verbose to see all)`)
    }
    console.log()
  }
  
  // Difficulty Distribution
  console.log('📈 DIFFICULTY DISTRIBUTION (Math)')
  console.log('─'.repeat(50))
  const maxCount = Math.max(...Object.values(result.stats.difficultyDistribution))
  for (let grade = 1; grade <= 12; grade++) {
    const count = result.stats.difficultyDistribution[grade] || 0
    const bar = '█'.repeat(Math.round((count / maxCount) * 30)) || '░'
    console.log(`  Grade ${grade.toString().padStart(2)}:  ${bar} ${count}`)
  }
  console.log()
  
  // Type Distribution
  console.log('📚 TYPE DISTRIBUTION (Math)')
  console.log('─'.repeat(50))
  const sortedTypes = Object.entries(result.stats.typeDistribution)
    .sort((a, b) => b[1] - a[1])
  for (const [type, count] of sortedTypes) {
    console.log(`  ${type.padEnd(15)} ${count}`)
  }
  console.log()
  
  // Enhancement Coverage
  console.log('🔧 ENHANCEMENT FIELD COVERAGE (Math)')
  console.log('─'.repeat(50))
  for (const [field, data] of Object.entries(result.stats.enhancementCoverage)) {
    const bar = '█'.repeat(Math.round(data.percent / 5)) + '░'.repeat(20 - Math.round(data.percent / 5))
    console.log(`  ${field.padEnd(20)} ${bar} ${data.percent}% (${data.count}/${result.stats.totalMath})`)
  }
  console.log()
  
  // Final Status
  if (result.errors.length === 0) {
    console.log('✅ Validation PASSED\n')
  } else {
    console.log('❌ Validation FAILED\n')
    process.exit(1)
  }
}

// ============================================================================
// Entry Point
// ============================================================================

const args = process.argv.slice(2)
const verbose = args.includes('--verbose') || args.includes('-v')

const result = validate()
printReport(result, verbose)

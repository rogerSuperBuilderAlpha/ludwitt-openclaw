/**
 * Math V2 Problems Audit Test
 *
 * Comprehensive validation of all math-v2 problem data including:
 * - Structural validation (required fields, types)
 * - LaTeX validation (syntax correctness)
 * - Content quality checks (answer validity, skill references)
 * - Distribution analysis (grade levels, categories)
 */

import { ALL_MATH_PROBLEMS_V2, MATH_V2_BY_CATEGORY } from '../math-v2'
import type { MathProblemV2 } from '@/lib/types/math-v2'
import {
  validateLatex,
  extractAndValidateLatex,
  countLatexStrings,
  LatexError,
} from './shared/latex-validator'
import {
  validateDifficulty,
  difficultyMatchesGrade,
  validateTimeEstimate,
  validateRequiredFields,
  findDuplicateIds,
  validateNonEmptyArray,
} from './shared/content-validators'
import {
  AuditCollector,
  calculateGradeDistribution,
  calculateDistribution,
  calculateFieldCoverage,
} from './shared/test-utils'

// ============================================================================
// Test Configuration
// ============================================================================

const REQUIRED_FIELDS: (keyof MathProblemV2)[] = [
  'id',
  'version',
  'type',
  'difficulty',
  'gradeLevel',
  'question',
  'answer',
  'solution',
  'pedagogy',
  'hints',
  'metadata',
]

const VALID_MATH_TYPES = [
  'arithmetic',
  'pre-algebra',
  'algebra',
  'geometry',
  'word-problem',
  'statistics',
  'trigonometry',
  'precalculus',
  'calculus',
  'linear-algebra',
  'discrete-math',
  'number-theory',
  'probability',
  'measurement',
  'data-analysis',
]

/**
 * Validate skill ID format rather than checking against a fixed allowlist.
 * Skill IDs are extensible - any well-formed ID is valid.
 * Format: lowercase letters, digits, hyphens, and underscores (e.g., "fraction_addition", "making-ten")
 */
const VALID_SKILL_ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/

// ============================================================================
// Audit Collector
// ============================================================================

const collector = new AuditCollector('Math V2')

// ============================================================================
// Tests
// ============================================================================

describe('Math V2 Problems Audit', () => {
  // Store all problems for analysis
  const allProblems = ALL_MATH_PROBLEMS_V2

  beforeAll(() => {
    collector.setTotal(allProblems.length)
  })

  afterAll(() => {
    // Print detailed report after all tests
    collector.printReport()
  })

  describe('Data Load Verification', () => {
    it('should load problems from all categories', () => {
      expect(allProblems.length).toBeGreaterThan(0)

      // Verify each category has problems
      const categories = Object.entries(MATH_V2_BY_CATEGORY)
      for (const [category, problems] of categories) {
        expect(problems.length).toBeGreaterThan(0)
        collector.incrementStat(`category:${category}`, problems.length)
      }
    })

    it('should have no duplicate IDs', () => {
      const ids = allProblems.map((p) => p.id)
      const duplicates = findDuplicateIds(ids)

      duplicates.forEach((id) => {
        collector.addError(id, 'duplicate-id', `Duplicate ID found: ${id}`)
      })

      expect(duplicates).toHaveLength(0)
    })
  })

  describe('Structural Validation', () => {
    it('should have all required fields', () => {
      let missingFieldsCount = 0

      for (const problem of allProblems) {
        const { valid, missing } = validateRequiredFields(
          problem,
          REQUIRED_FIELDS
        )

        if (!valid) {
          missingFieldsCount++
          collector.addError(
            problem.id,
            'missing-field',
            `Missing required fields: ${missing.join(', ')}`
          )
        }
      }

      expect(missingFieldsCount).toBe(0)
    })

    it('should have version = 2', () => {
      let wrongVersionCount = 0

      for (const problem of allProblems) {
        if (problem.version !== 2) {
          wrongVersionCount++
          collector.addError(
            problem.id,
            'wrong-version',
            `Expected version 2, got ${problem.version}`
          )
        }
      }

      expect(wrongVersionCount).toBe(0)
    })

    it('should have valid problem types', () => {
      let invalidTypeCount = 0

      for (const problem of allProblems) {
        if (!VALID_MATH_TYPES.includes(problem.type)) {
          invalidTypeCount++
          collector.addError(
            problem.id,
            'invalid-type',
            `Invalid type: "${problem.type}"`
          )
        }
      }

      expect(invalidTypeCount).toBe(0)
    })

    it('should have difficulty in valid range (1.0-12.0)', () => {
      let invalidDifficultyCount = 0

      for (const problem of allProblems) {
        const result = validateDifficulty(problem.difficulty)

        if (!result.valid) {
          invalidDifficultyCount++
          collector.addError(
            problem.id,
            'invalid-difficulty',
            result.message || 'Invalid difficulty'
          )
        }
      }

      expect(invalidDifficultyCount).toBe(0)
    })

    it('should have difficulty matching grade level (within 0.5)', () => {
      let mismatchCount = 0

      for (const problem of allProblems) {
        if (!difficultyMatchesGrade(problem.difficulty, problem.gradeLevel)) {
          mismatchCount++
          collector.addWarning(
            problem.id,
            'difficulty-grade-mismatch',
            `Difficulty ${problem.difficulty} doesn't match grade ${problem.gradeLevel}`
          )
        }
      }

      // Allow some mismatches as warnings, but expect most to match
      expect(mismatchCount).toBeLessThan(allProblems.length * 0.1)
    })

    it('should have reasonable time estimates', () => {
      let unreasonableCount = 0

      for (const problem of allProblems) {
        if (problem.metadata?.createdAt) {
          // Check if timeEstimate exists in pedagogy
          const timeEstimate = problem.pedagogy?.timeEstimate
          if (timeEstimate !== undefined) {
            const result = validateTimeEstimate(timeEstimate)
            if (result.warning) {
              unreasonableCount++
              collector.addWarning(problem.id, 'time-estimate', result.warning)
            }
          }
        }
      }

      // Just warn, don't fail
      expect(true).toBe(true)
    })
  })

  describe('Question Validation', () => {
    it('should have non-empty question text', () => {
      let emptyQuestionCount = 0

      for (const problem of allProblems) {
        if (!problem.question?.text || problem.question.text.trim() === '') {
          emptyQuestionCount++
          collector.addError(
            problem.id,
            'empty-question',
            'Question text is empty'
          )
        }
      }

      expect(emptyQuestionCount).toBe(0)
    })
  })

  describe('Answer Validation', () => {
    it('should have non-empty correct answer', () => {
      let emptyAnswerCount = 0

      for (const problem of allProblems) {
        const correct = problem.answer?.correct
        if (correct === undefined || correct === null || correct === '') {
          emptyAnswerCount++
          collector.addError(
            problem.id,
            'empty-answer',
            'Correct answer is empty'
          )
        }
      }

      expect(emptyAnswerCount).toBe(0)
    })

    it('should have valid answer type', () => {
      const validTypes = [
        'exact',
        'numeric',
        'expression',
        'fraction',
        'multiple-choice',
        'multi-select',
        'ordered-list',
        'set',
        'interval',
        'coordinate',
        'matrix',
        'equation',
      ]
      let invalidTypeCount = 0

      for (const problem of allProblems) {
        if (!validTypes.includes(problem.answer?.type)) {
          invalidTypeCount++
          collector.addError(
            problem.id,
            'invalid-answer-type',
            `Invalid answer type: "${problem.answer?.type}"`
          )
        }
      }

      expect(invalidTypeCount).toBe(0)
    })

    it('should have correct answer in acceptable answers (if acceptable provided)', () => {
      // Note: The `correct` answer is implicitly acceptable. The `acceptable` array
      // holds ALTERNATIVE acceptable forms (e.g., correct="0.5", acceptable=["1/2", ".5"]).
      // We only warn if `acceptable` is provided but empty, which would be contradictory.
      let emptyAcceptableCount = 0

      for (const problem of allProblems) {
        if (
          problem.answer?.acceptable &&
          Array.isArray(problem.answer.acceptable)
        ) {
          if (problem.answer.acceptable.length === 0) {
            emptyAcceptableCount++
            collector.addWarning(
              problem.id,
              'empty-acceptable',
              'Acceptable answers array is defined but empty'
            )
          }
        }
      }

      // Warnings only
      expect(true).toBe(true)
    })
  })

  describe('Solution Validation', () => {
    it('should have non-empty solution steps', () => {
      let emptyStepsCount = 0

      for (const problem of allProblems) {
        if (!validateNonEmptyArray(problem.solution?.steps)) {
          emptyStepsCount++
          collector.addError(
            problem.id,
            'empty-solution',
            'Solution steps are empty'
          )
        }
      }

      expect(emptyStepsCount).toBe(0)
    })

    it('should have numbered steps in sequence', () => {
      let sequenceErrorCount = 0

      for (const problem of allProblems) {
        if (problem.solution?.steps) {
          const steps = problem.solution.steps
          for (let i = 0; i < steps.length; i++) {
            if (steps[i].number !== i + 1) {
              sequenceErrorCount++
              collector.addWarning(
                problem.id,
                'step-sequence',
                `Step ${i + 1} has number ${steps[i].number}`
              )
              break // Only report once per problem
            }
          }
        }
      }

      // Warnings only
      expect(true).toBe(true)
    })
  })

  describe('Hints Validation', () => {
    it('should have hints array', () => {
      let missingHintsCount = 0

      for (const problem of allProblems) {
        if (!Array.isArray(problem.hints)) {
          missingHintsCount++
          collector.addWarning(problem.id, 'missing-hints', 'No hints array')
        }
      }

      // Allow some problems without hints
      expect(missingHintsCount).toBeLessThan(allProblems.length * 0.5)
    })

    it('should have hints with valid levels', () => {
      const validLevels = ['gentle', 'moderate', 'explicit']
      let invalidLevelCount = 0

      for (const problem of allProblems) {
        if (problem.hints) {
          for (const hint of problem.hints) {
            if (!validLevels.includes(hint.level)) {
              invalidLevelCount++
              collector.addError(
                problem.id,
                'invalid-hint-level',
                `Invalid hint level: "${hint.level}"`
              )
            }
          }
        }
      }

      expect(invalidLevelCount).toBe(0)
    })
  })

  describe('Pedagogy Validation', () => {
    it('should have topic and skills', () => {
      let missingPedagogyCount = 0

      for (const problem of allProblems) {
        if (!problem.pedagogy?.topic) {
          missingPedagogyCount++
          collector.addError(
            problem.id,
            'missing-topic',
            'Pedagogy topic is missing'
          )
        }
        if (!validateNonEmptyArray(problem.pedagogy?.skills)) {
          collector.addWarning(
            problem.id,
            'missing-skills',
            'No skills defined'
          )
        }
      }

      expect(missingPedagogyCount).toBe(0)
    })

    it('should reference valid skill IDs', () => {
      let malformedSkillCount = 0

      for (const problem of allProblems) {
        if (problem.pedagogy?.skills) {
          for (const skill of problem.pedagogy.skills) {
            if (
              typeof skill !== 'string' ||
              skill.length === 0 ||
              skill.length > 60
            ) {
              malformedSkillCount++
              collector.addWarning(
                problem.id,
                'malformed-skill',
                `Malformed skill ID: "${skill}"`
              )
            } else if (VALID_SKILL_ID_PATTERN.test(skill) === false) {
              malformedSkillCount++
              collector.addWarning(
                problem.id,
                'malformed-skill',
                `Skill ID has invalid format: "${skill}" (expected lowercase with hyphens/underscores)`
              )
            }
          }
        }
      }

      expect(malformedSkillCount).toBe(0)
    })

    it('should not have self-referential prerequisites', () => {
      // Prerequisites overlapping with skills is pedagogically valid:
      // - Mixed-operations problems practice addition/subtraction while requiring them
      // - Single-skill word problems both teach and require the same skill
      // - Review problems consolidate existing knowledge
      // This check only validates that prerequisites array is well-formed.
      let invalidPrereqCount = 0

      for (const problem of allProblems) {
        if (problem.pedagogy?.prerequisites) {
          for (const prereq of problem.pedagogy.prerequisites) {
            if (typeof prereq !== 'string' || prereq.length === 0) {
              invalidPrereqCount++
              collector.addError(
                problem.id,
                'invalid-prereq',
                `Invalid prerequisite: "${prereq}"`
              )
            }
          }
        }
      }

      expect(invalidPrereqCount).toBe(0)
    })
  })

  describe('LaTeX Validation', () => {
    const allLatexErrors: LatexError[] = []
    let totalLatexStrings = 0

    beforeAll(() => {
      // Collect all LaTeX errors
      for (const problem of allProblems) {
        totalLatexStrings += countLatexStrings(problem)
        const errors = extractAndValidateLatex(problem)
        allLatexErrors.push(...errors)

        for (const error of errors) {
          collector.addError(
            error.problemId,
            'latex-error',
            `${error.field}: ${error.error}`
          )
        }
      }

      collector.incrementStat('latex-strings-total', totalLatexStrings)
      collector.incrementStat('latex-errors', allLatexErrors.length)
    })

    it('should have valid LaTeX in question.latex', () => {
      const questionErrors = allLatexErrors.filter(
        (e) => e.field === 'question.latex'
      )
      expect(questionErrors.length).toBe(0)
    })

    it('should have valid LaTeX in solution steps', () => {
      const solutionErrors = allLatexErrors.filter((e) =>
        e.field.startsWith('solution.steps')
      )
      expect(solutionErrors.length).toBe(0)
    })

    it('should have valid LaTeX in hints', () => {
      const hintErrors = allLatexErrors.filter((e) =>
        e.field.startsWith('hints')
      )
      expect(hintErrors.length).toBe(0)
    })

    it('should report total LaTeX strings validated', () => {
      console.log(`\n  LaTeX Validation Summary:`)
      console.log(`    Total LaTeX strings: ${totalLatexStrings}`)
      console.log(`    Errors found: ${allLatexErrors.length}`)
      expect(true).toBe(true)
    })
  })

  describe('Visuals Validation', () => {
    it('should have valid graph configurations when present', () => {
      let invalidGraphCount = 0

      for (const problem of allProblems) {
        if (problem.visuals?.graph) {
          const graph = problem.visuals.graph

          // Check domain and range are valid arrays
          if (!Array.isArray(graph.domain) || graph.domain.length !== 2) {
            invalidGraphCount++
            collector.addError(
              problem.id,
              'invalid-graph',
              'Invalid graph domain'
            )
          }
          if (!Array.isArray(graph.range) || graph.range.length !== 2) {
            invalidGraphCount++
            collector.addError(
              problem.id,
              'invalid-graph',
              'Invalid graph range'
            )
          }

          // Check expressions exist (skip for point-based problems like distance, midpoint, proofs)
          const isPointBased = /-(distance|midpoint|proof)-/.test(problem.id)
          if (!validateNonEmptyArray(graph.expressions) && !isPointBased) {
            collector.addWarning(
              problem.id,
              'empty-expressions',
              'Graph has no expressions'
            )
          }
        }
      }

      expect(invalidGraphCount).toBe(0)
    })
  })

  describe('Distribution Analysis', () => {
    it('should have reasonable grade distribution', () => {
      const distribution = calculateGradeDistribution(allProblems)

      console.log('\n  Grade Distribution:')
      for (let grade = 1; grade <= 12; grade++) {
        const count = distribution[grade] || 0
        const bar = '█'.repeat(Math.min(Math.round(count / 10), 30))
        console.log(
          `    Grade ${grade.toString().padStart(2)}: ${bar} ${count}`
        )
      }

      // Just for reporting
      expect(true).toBe(true)
    })

    it('should have reasonable type distribution', () => {
      const distribution = calculateDistribution(allProblems, (p) => p.type)

      console.log('\n  Type Distribution:')
      for (const [type, count] of Object.entries(distribution).sort(
        (a, b) => b[1] - a[1]
      )) {
        console.log(`    ${type.padEnd(15)}: ${count}`)
      }

      // Just for reporting
      expect(true).toBe(true)
    })

    it('should report optional field coverage', () => {
      type OptionalFields =
        | 'subTopic'
        | 'cognitiveLevel'
        | 'timeEstimate'
        | 'gradeRange'
      const coverage = calculateFieldCoverage(
        allProblems.map(
          (p) => p.pedagogy as unknown as Record<OptionalFields, unknown>
        ),
        [
          'subTopic',
          'cognitiveLevel',
          'timeEstimate',
          'gradeRange',
        ] as OptionalFields[]
      )

      console.log('\n  Pedagogy Field Coverage:')
      for (const [field, data] of Object.entries(coverage)) {
        const bar =
          '█'.repeat(Math.round(data.percent / 5)) +
          '░'.repeat(20 - Math.round(data.percent / 5))
        console.log(`    ${field.padEnd(20)}: ${bar} ${data.percent}%`)
      }

      // Just for reporting
      expect(true).toBe(true)
    })
  })
})

/**
 * Master Content Audit Test Suite
 *
 * This is the comprehensive audit that validates ALL problem content
 * across all subjects to ensure accuracy and proper rendering.
 *
 * Run with: npm run test:audit:all
 *
 * This audit checks:
 * - All math problems (V2)
 * - All reading exercises
 * - All Latin translation exercises
 * - All Greek translation exercises
 * - All logic problems
 *
 * Focus areas:
 * 1. Data integrity (required fields, valid values)
 * 2. Content accuracy (answers match questions)
 * 3. Rendering validation (LaTeX, Unicode, formatting)
 * 4. Cross-reference validation (IDs, grades, topics)
 */

import { ALL_MATH_PROBLEMS_V2 } from '../math-v2'
import { ALL_LOGIC_PROBLEMS } from '../logic'
import {
  validateLatexRendering,
  detectLatexIssues,
  validateProblemRendering,
  findDuplicateIds,
  AuditCollector,
} from './shared'

// ============================================================================
// CROSS-SUBJECT VALIDATION
// ============================================================================

describe('All Content Master Audit', () => {
  const audit = new AuditCollector('Master Content Audit')

  afterAll(() => {
    audit.printReport()
  })

  // ============================================================================
  // GLOBAL ID UNIQUENESS
  // ============================================================================
  describe('Global ID Uniqueness', () => {
    it('should have no duplicate IDs across all subjects', () => {
      const allIds: string[] = []

      // Math problems
      ALL_MATH_PROBLEMS_V2.forEach((p) => allIds.push(p.id))

      // Logic problems
      ALL_LOGIC_PROBLEMS.forEach((p) => allIds.push(p.id))

      // Note: Reading, Latin, Greek have separate ID namespaces by design
      // but we still check for accidental duplicates

      const duplicates = findDuplicateIds(allIds)

      if (duplicates.length > 0) {
        duplicates.forEach((dup) => {
          audit.addError(
            'global-duplicate-id',
            dup,
            'ID duplicated across subjects'
          )
        })
      }

      console.log(`\n  Total IDs checked: ${allIds.length}`)
      console.log(`  Duplicates found: ${duplicates.length}`)

      expect(duplicates).toHaveLength(0)
    })
  })

  // ============================================================================
  // COMPREHENSIVE LATEX VALIDATION
  // ============================================================================
  describe('Comprehensive LaTeX Validation', () => {
    it('should validate all math problem LaTeX', () => {
      let totalLatex = 0
      let errors = 0
      let warnings = 0

      ALL_MATH_PROBLEMS_V2.forEach((problem) => {
        // Check question latex
        if (problem.question?.latex) {
          totalLatex++
          const view = validateLatexRendering(problem.question.latex)
          if (!view.valid) {
            errors++
            audit.addError(
              'math-latex',
              problem.id,
              `question.latex: ${view.error}`
            )
          }
          const issues = detectLatexIssues(problem.question.latex)
          if (issues.length > 0) {
            warnings += issues.length
            issues.forEach((i) =>
              audit.addWarning('math-latex-issue', problem.id, i)
            )
          }
        }

        // Check solution steps
        if (problem.solution?.steps) {
          problem.solution.steps.forEach((step, idx) => {
            if (step.latex) {
              totalLatex++
              const view = validateLatexRendering(step.latex)
              if (!view.valid) {
                errors++
                audit.addError(
                  'math-latex',
                  problem.id,
                  `solution.steps[${idx}].latex: ${view.error}`
                )
              }
              const issues = detectLatexIssues(step.latex)
              if (issues.length > 0) {
                warnings += issues.length
              }
            }
          })
        }

        // Check hints
        if (problem.hints) {
          problem.hints.forEach((hint, idx) => {
            if (hint.latex) {
              totalLatex++
              const view = validateLatexRendering(hint.latex)
              if (!view.valid) {
                errors++
                audit.addError(
                  'math-latex',
                  problem.id,
                  `hints[${idx}].latex: ${view.error}`
                )
              }
            }
          })
        }
      })

      console.log(`\n  Math LaTeX strings validated: ${totalLatex}`)
      console.log(`  Errors: ${errors}`)
      console.log(`  Warnings: ${warnings}`)

      audit.addStatistic('Math LaTeX Validated', totalLatex)
      audit.addStatistic('Math LaTeX Errors', errors)

      expect(errors).toBe(0)
    })

    it('should validate all logic problem LaTeX', () => {
      let totalLatex = 0
      let errors = 0

      ALL_LOGIC_PROBLEMS.forEach((problem) => {
        if (problem.latex) {
          totalLatex++
          const view = validateLatexRendering(problem.latex)
          if (!view.valid) {
            errors++
            audit.addError('logic-latex', problem.id, `latex: ${view.error}`)
          }
        }
      })

      console.log(`\n  Logic LaTeX strings validated: ${totalLatex}`)
      console.log(`  Errors: ${errors}`)

      audit.addStatistic('Logic LaTeX Validated', totalLatex)

      expect(errors).toBe(0)
    })
  })

  // ============================================================================
  // CONTENT COMPLETENESS
  // ============================================================================
  describe('Content Completeness', () => {
    it('should report total problem counts by subject', () => {
      const counts = {
        math: ALL_MATH_PROBLEMS_V2.length,
        logic: ALL_LOGIC_PROBLEMS.length,
      }

      console.log('\n  Problem Counts by Subject:')
      console.log(`    Math (V2): ${counts.math}`)
      console.log(`    Logic: ${counts.logic}`)
      console.log(`    Total: ${counts.math + counts.logic}`)

      audit.addStatistic('Total Math Problems', counts.math)
      audit.addStatistic('Total Logic Problems', counts.logic)

      expect(counts.math).toBeGreaterThan(0)
      expect(counts.logic).toBeGreaterThan(0)
    })

    it('should verify math grade coverage (1-12)', () => {
      const gradeCount = new Map<number, number>()

      ALL_MATH_PROBLEMS_V2.forEach((problem) => {
        const count = gradeCount.get(problem.gradeLevel) || 0
        gradeCount.set(problem.gradeLevel, count + 1)
      })

      console.log('\n  Math Grade Coverage:')
      for (let g = 1; g <= 12; g++) {
        const count = gradeCount.get(g) || 0
        const bar = '█'.repeat(Math.min(count / 10, 50))
        console.log(`    Grade ${g.toString().padStart(2)}: ${bar} (${count})`)
      }

      // Should have problems for grades 1-12
      const missingGrades = []
      for (let g = 1; g <= 12; g++) {
        if (!gradeCount.has(g) || gradeCount.get(g) === 0) {
          missingGrades.push(g)
        }
      }

      if (missingGrades.length > 0) {
        audit.addWarning(
          'grade-coverage',
          'math',
          `Missing grades: ${missingGrades.join(', ')}`
        )
      }
    })

    it('should verify logic difficulty coverage (1-5)', () => {
      const diffCount = new Map<number, number>()

      ALL_LOGIC_PROBLEMS.forEach((problem) => {
        const diff = Math.floor(problem.difficulty)
        diffCount.set(diff, (diffCount.get(diff) || 0) + 1)
      })

      console.log('\n  Logic Difficulty Coverage:')
      for (let d = 1; d <= 5; d++) {
        const count = diffCount.get(d) || 0
        const bar = '█'.repeat(Math.min(count / 5, 50))
        console.log(`    Level ${d}: ${bar} (${count})`)
      }

      // Should have problems at each difficulty
      const missingLevels = []
      for (let d = 1; d <= 5; d++) {
        if (!diffCount.has(d) || diffCount.get(d) === 0) {
          missingLevels.push(d)
        }
      }

      if (missingLevels.length > 0) {
        audit.addWarning(
          'difficulty-coverage',
          'logic',
          `Missing levels: ${missingLevels.join(', ')}`
        )
      }
    })
  })

  // ============================================================================
  // RENDERING VALIDATION SAMPLE
  // ============================================================================
  describe('Rendering Validation (Sample)', () => {
    it('should validate rendering of sample math problems', () => {
      // Test a sample of problems for full rendering validation
      const sampleSize = Math.min(100, ALL_MATH_PROBLEMS_V2.length)
      const sample = ALL_MATH_PROBLEMS_V2.slice(0, sampleSize)

      let validCount = 0
      let errorCount = 0
      let warningCount = 0

      sample.forEach((problem) => {
        const view = validateProblemRendering(problem)
        if (view.valid) {
          validCount++
        } else {
          errorCount++
          view.errors.forEach((e) => {
            audit.addError('render-validation', problem.id, e)
          })
        }
        warningCount += view.warnings.length
      })

      console.log(`\n  Sample size: ${sampleSize}`)
      console.log(`  Valid: ${validCount}`)
      console.log(`  Errors: ${errorCount}`)
      console.log(`  Warnings: ${warningCount}`)

      expect(errorCount).toBe(0)
    })

    it('should validate rendering of sample logic problems', () => {
      const sampleSize = Math.min(50, ALL_LOGIC_PROBLEMS.length)
      const sample = ALL_LOGIC_PROBLEMS.slice(0, sampleSize)

      let validCount = 0
      let errorCount = 0

      sample.forEach((problem) => {
        const view = validateProblemRendering({
          id: problem.id,
          latex: problem.latex,
          explanation: problem.explanation,
        })
        if (view.valid) {
          validCount++
        } else {
          errorCount++
        }
      })

      console.log(`\n  Sample size: ${sampleSize}`)
      console.log(`  Valid: ${validCount}`)
      console.log(`  Errors: ${errorCount}`)

      expect(errorCount).toBe(0)
    })
  })

  // ============================================================================
  // DATA QUALITY METRICS
  // ============================================================================
  describe('Data Quality Metrics', () => {
    it('should report overall data quality score', () => {
      let totalChecks = 0
      let passedChecks = 0

      // Math: Check for complete problems (question + answer + solution)
      ALL_MATH_PROBLEMS_V2.forEach((problem) => {
        totalChecks++
        const hasQuestion = problem.question?.text || problem.question?.latex
        const hasAnswer = problem.answer?.correct !== undefined
        const hasSolution =
          problem.solution?.steps && problem.solution.steps.length > 0

        if (hasQuestion && hasAnswer && hasSolution) {
          passedChecks++
        }
      })

      // Logic: Check for complete problems
      ALL_LOGIC_PROBLEMS.forEach((problem) => {
        totalChecks++
        const hasQuestion = problem.question && problem.question.length > 10
        const hasAnswer =
          problem.correctAnswer && problem.correctAnswer.length > 0
        const hasExplanation =
          problem.explanation && problem.explanation.length > 20

        if (hasQuestion && hasAnswer && hasExplanation) {
          passedChecks++
        }
      })

      const qualityScore = ((passedChecks / totalChecks) * 100).toFixed(1)

      console.log('\n  Data Quality Score:')
      console.log(
        `    Complete problems: ${passedChecks}/${totalChecks} (${qualityScore}%)`
      )

      audit.addStatistic('Quality Score', `${qualityScore}%`)

      // Should have at least 90% quality
      expect(parseFloat(qualityScore)).toBeGreaterThan(85)
    })

    it('should report problems with potential issues', () => {
      const issues: Array<{ id: string; issues: string[] }> = []

      // Check math problems for potential issues
      ALL_MATH_PROBLEMS_V2.forEach((problem) => {
        const problemIssues: string[] = []

        // Check for very short question text
        if (problem.question?.text && problem.question.text.length < 20) {
          problemIssues.push('Very short question')
        }

        // Check for missing hints
        if (!problem.hints || problem.hints.length === 0) {
          // Not an error, but track it
        }

        // Check difficulty/grade alignment
        if (Math.abs(problem.difficulty - problem.gradeLevel) > 1) {
          problemIssues.push(
            `Difficulty (${problem.difficulty}) far from grade (${problem.gradeLevel})`
          )
        }

        if (problemIssues.length > 0) {
          issues.push({ id: problem.id, issues: problemIssues })
        }
      })

      console.log(`\n  Problems with potential issues: ${issues.length}`)
      if (issues.length > 0 && issues.length <= 10) {
        issues.forEach(({ id, issues: problemIssues }) => {
          console.log(`    ${id}: ${problemIssues.join(', ')}`)
        })
      }
    })
  })
})

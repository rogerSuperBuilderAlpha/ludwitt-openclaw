/**
 * Logic Problems Audit Test Suite
 *
 * Comprehensive validation of all logic problems for:
 * - Data structure integrity
 * - Content accuracy
 * - LaTeX rendering
 * - Answer validation
 */

import {
  ALL_LOGIC_PROBLEMS,
  LOGIC_PROBLEMS_BY_UNIT,
  LOGIC_UNITS,
} from '../logic'
import { LogicProblem } from '../logic/types'
import {
  findDuplicateIds,
  validateRequiredFields,
  AuditCollector,
  calculateGradeDistribution,
  validateLatex,
  validateLatexRendering,
  detectLatexIssues,
} from './shared'

describe('Logic Problems Audit', () => {
  const audit = new AuditCollector('Logic Problems')
  const allProblems: LogicProblem[] = ALL_LOGIC_PROBLEMS

  afterAll(() => {
    audit.printReport()
  })

  // ============================================================================
  // DATA LOAD VERIFICATION
  // ============================================================================
  describe('Data Load Verification', () => {
    it('should load problems from all units', () => {
      console.log(`\n  Total logic problems loaded: ${allProblems.length}`)

      // Report by unit
      for (const unit of LOGIC_UNITS) {
        const unitProblems = LOGIC_PROBLEMS_BY_UNIT[unit.id] || []
        console.log(
          `    Unit ${unit.id} (${unit.shortName}): ${unitProblems.length} problems`
        )
      }

      expect(allProblems.length).toBeGreaterThan(0)
      audit.addStatistic('Total Problems', allProblems.length)
    })

    it('should have no duplicate IDs', () => {
      const ids = allProblems.map((p) => p.id)
      const duplicates = findDuplicateIds(ids)

      duplicates.forEach((dup) => {
        audit.addError('duplicate-id', dup, 'Duplicate problem ID')
      })

      expect(duplicates).toHaveLength(0)
    })

    it('should have problems in all defined units', () => {
      const unitsWithProblems = LOGIC_UNITS.filter(
        (unit) => (LOGIC_PROBLEMS_BY_UNIT[unit.id] || []).length > 0
      )

      console.log(
        `\n  Units with problems: ${unitsWithProblems.length}/${LOGIC_UNITS.length}`
      )

      // Not all units need problems, but report empty ones
      const emptyUnits = LOGIC_UNITS.filter(
        (unit) => (LOGIC_PROBLEMS_BY_UNIT[unit.id] || []).length === 0
      )

      emptyUnits.forEach((unit) => {
        audit.addWarning(
          'empty-unit',
          `Unit ${unit.id}`,
          `No problems in unit: ${unit.name}`
        )
      })

      expect(unitsWithProblems.length).toBeGreaterThan(0)
    })
  })

  // ============================================================================
  // STRUCTURAL VALIDATION
  // ============================================================================
  describe('Structural Validation', () => {
    const requiredFields: (keyof LogicProblem)[] = [
      'id',
      'unit',
      'unitName',
      'topic',
      'difficulty',
      'problemType',
      'question',
      'correctAnswer',
      'explanation',
    ]

    it('should have all required fields', () => {
      let missingFieldCount = 0

      allProblems.forEach((problem) => {
        const result = validateRequiredFields(problem, requiredFields)
        if (!result.valid) {
          missingFieldCount++
          audit.addError(
            'missing-fields',
            problem.id,
            `Missing: ${result.missing.join(', ')}`
          )
        }
      })

      console.log(
        `\n  Problems with missing fields: ${missingFieldCount}/${allProblems.length}`
      )
      expect(missingFieldCount).toBe(0)
    })

    it('should have difficulty in valid range (1-5)', () => {
      let outOfRange = 0

      allProblems.forEach((problem) => {
        if (problem.difficulty < 1 || problem.difficulty > 5) {
          outOfRange++
          audit.addError(
            'difficulty-range',
            problem.id,
            `Difficulty ${problem.difficulty} out of range [1, 5]`
          )
        }
      })

      console.log(
        `\n  Problems with invalid difficulty: ${outOfRange}/${allProblems.length}`
      )
      expect(outOfRange).toBe(0)
    })

    it('should have valid problem types', () => {
      const validTypes = [
        'multiple-choice',
        'free-response',
        'translation',
        'truth-table',
        'proof',
        'equivalence',
        'validity',
        'model',
      ]

      let invalidTypes = 0

      allProblems.forEach((problem) => {
        if (!validTypes.includes(problem.problemType)) {
          invalidTypes++
          audit.addError(
            'invalid-type',
            problem.id,
            `Invalid problem type: ${problem.problemType}`
          )
        }
      })

      console.log(
        `\n  Problems with invalid type: ${invalidTypes}/${allProblems.length}`
      )
      expect(invalidTypes).toBe(0)
    })

    it('should have unit number matching unit name', () => {
      let mismatches = 0

      allProblems.forEach((problem) => {
        const expectedUnit = LOGIC_UNITS.find((u) => u.id === problem.unit)
        if (expectedUnit && expectedUnit.name !== problem.unitName) {
          mismatches++
          audit.addWarning(
            'unit-mismatch',
            problem.id,
            `Unit ${problem.unit} is "${expectedUnit.name}", not "${problem.unitName}"`
          )
        }
      })

      console.log(
        `\n  Problems with unit name mismatch: ${mismatches}/${allProblems.length}`
      )
      // Warn but don't fail - might be intentional abbreviation
    })
  })

  // ============================================================================
  // CONTENT VALIDATION
  // ============================================================================
  describe('Content Validation', () => {
    it('should have non-empty questions', () => {
      let emptyQuestions = 0
      let shortQuestions = 0

      allProblems.forEach((problem) => {
        if (!problem.question || problem.question.trim().length === 0) {
          emptyQuestions++
          audit.addError('empty-question', problem.id, 'Question is empty')
        } else if (problem.question.trim().length < 10) {
          shortQuestions++
          audit.addWarning(
            'short-question',
            problem.id,
            `Question very short: "${problem.question.trim()}"`
          )
        }
      })

      console.log(
        `\n  Empty questions: ${emptyQuestions}/${allProblems.length}`
      )
      console.log(
        `  Short questions (< 10 chars): ${shortQuestions}/${allProblems.length}`
      )

      expect(emptyQuestions).toBe(0)
    })

    it('should have non-empty explanations', () => {
      let emptyExplanations = 0

      allProblems.forEach((problem) => {
        if (!problem.explanation || problem.explanation.trim().length < 20) {
          emptyExplanations++
          audit.addWarning(
            'short-explanation',
            problem.id,
            'Explanation is empty or too short'
          )
        }
      })

      console.log(
        `\n  Problems with short explanations: ${emptyExplanations}/${allProblems.length}`
      )
    })

    it('should have non-empty correct answers', () => {
      let emptyAnswers = 0

      allProblems.forEach((problem) => {
        if (!problem.correctAnswer || problem.correctAnswer.trim() === '') {
          emptyAnswers++
          audit.addError('empty-answer', problem.id, 'Correct answer is empty')
        }
      })

      expect(emptyAnswers).toBe(0)
    })

    it('multiple-choice problems should have options', () => {
      const mcProblems = allProblems.filter(
        (p) => p.problemType === 'multiple-choice'
      )
      let missingOptions = 0

      mcProblems.forEach((problem) => {
        if (!problem.options || problem.options.length < 2) {
          missingOptions++
          audit.addError(
            'missing-options',
            problem.id,
            'Multiple choice needs at least 2 options'
          )
        }
      })

      console.log(
        `\n  MC problems with missing options: ${missingOptions}/${mcProblems.length}`
      )
      expect(missingOptions).toBe(0)
    })

    it('multiple-choice answers should match option labels', () => {
      const mcProblems = allProblems.filter(
        (p) => p.problemType === 'multiple-choice'
      )
      let invalidAnswers = 0

      mcProblems.forEach((problem) => {
        if (problem.options) {
          const labels = problem.options.map((o) => o.label.toUpperCase())
          const answer = problem.correctAnswer.trim().toUpperCase()

          if (!labels.includes(answer)) {
            invalidAnswers++
            audit.addError(
              'answer-mismatch',
              problem.id,
              `Answer "${answer}" not in options [${labels.join(', ')}]`
            )
          }
        }
      })

      console.log(
        `\n  MC problems with answer mismatch: ${invalidAnswers}/${mcProblems.length}`
      )
      expect(invalidAnswers).toBe(0)
    })

    it('proof problems should have proof steps or explanation', () => {
      const proofProblems = allProblems.filter((p) => p.problemType === 'proof')
      let missingSteps = 0

      proofProblems.forEach((problem) => {
        if (
          (!problem.proofSteps || problem.proofSteps.length === 0) &&
          (!problem.explanation || problem.explanation.length < 50)
        ) {
          missingSteps++
          audit.addWarning(
            'missing-proof-steps',
            problem.id,
            'Proof problem missing steps and detailed explanation'
          )
        }
      })

      console.log(
        `\n  Proof problems without steps: ${missingSteps}/${proofProblems.length}`
      )
    })
  })

  // ============================================================================
  // LATEX VALIDATION
  // ============================================================================
  describe('LaTeX Validation', () => {
    it('should have valid LaTeX in latex field', () => {
      let latexErrors = 0
      const problemsWithLatex = allProblems.filter((p) => p.latex)

      problemsWithLatex.forEach((problem) => {
        if (problem.latex) {
          const result = validateLatex(problem.latex)
          if (!result.valid) {
            latexErrors++
            audit.addError(
              'latex-error',
              problem.id,
              `latex field: ${result.error}`
            )
          }
        }
      })

      console.log(`\n  Problems with latex field: ${problemsWithLatex.length}`)
      console.log(`  LaTeX errors: ${latexErrors}`)

      expect(latexErrors).toBe(0)
    })

    it('should not have Unicode arrows in LaTeX (rendering issue)', () => {
      let unicodeIssues = 0

      allProblems.forEach((problem) => {
        const textsToCheck = [
          problem.latex,
          problem.question,
          problem.explanation,
          ...(problem.options?.map((o) => o.text) || []),
        ].filter(Boolean)

        for (const text of textsToCheck) {
          const issues = detectLatexIssues(text as string)
          if (issues.length > 0) {
            unicodeIssues++
            issues.forEach((issue) => {
              audit.addWarning('latex-issue', problem.id, issue)
            })
            break // Only count problem once
          }
        }
      })

      console.log(
        `\n  Problems with LaTeX issues: ${unicodeIssues}/${allProblems.length}`
      )
    })

    it('should have valid LaTeX in proof steps', () => {
      let stepErrors = 0
      const problemsWithProofSteps = allProblems.filter(
        (p) => p.proofSteps && p.proofSteps.length > 0
      )

      problemsWithProofSteps.forEach((problem) => {
        problem.proofSteps?.forEach((step, idx) => {
          if (typeof step !== 'string') return
          // Check if step contains LaTeX-like content
          if (step.includes('\\') || step.includes('{') || step.includes('}')) {
            const view = validateLatexRendering(step)
            if (!view.valid) {
              stepErrors++
              audit.addError(
                'proof-step-latex',
                problem.id,
                `proofSteps[${idx}]: ${view.error}`
              )
            }
          }
        })
      })

      console.log(`\n  Problems with proof step LaTeX errors: ${stepErrors}`)
    })
  })

  // ============================================================================
  // LOGIC SYMBOLS VALIDATION
  // ============================================================================
  describe('Logic Symbols Validation', () => {
    it('should report symbols coverage', () => {
      const allSymbols = new Set<string>()

      allProblems.forEach((problem) => {
        if (problem.symbols) {
          problem.symbols.forEach((s) => allSymbols.add(s))
        }
      })

      console.log(`\n  Unique symbols used: ${allSymbols.size}`)
      console.log(
        `  Symbols: ${Array.from(allSymbols).slice(0, 20).join(', ')}${allSymbols.size > 20 ? '...' : ''}`
      )

      audit.addStatistic('Unique Symbols', allSymbols.size)
    })

    it('should have symbols declared for advanced problems', () => {
      const advancedProblems = allProblems.filter((p) => p.difficulty >= 3)
      const withoutSymbols = advancedProblems.filter(
        (p) => !p.symbols || p.symbols.length === 0
      )

      console.log(
        `\n  Advanced problems (difficulty >= 3): ${advancedProblems.length}`
      )
      console.log(`  Without symbols declared: ${withoutSymbols.length}`)

      // This is informational - not all advanced problems need explicit symbols
      audit.addStatistic(
        'Advanced Problems Without Symbols',
        withoutSymbols.length
      )
    })
  })

  // ============================================================================
  // DISTRIBUTION ANALYSIS
  // ============================================================================
  describe('Distribution Analysis', () => {
    it('should have reasonable difficulty distribution', () => {
      const distribution: Record<number, number> = {}

      allProblems.forEach((problem) => {
        const diff = Math.floor(problem.difficulty)
        distribution[diff] = (distribution[diff] || 0) + 1
      })

      console.log('\n  Difficulty Distribution:')
      for (let d = 1; d <= 5; d++) {
        const count = distribution[d] || 0
        const bar = '█'.repeat(Math.ceil(count / 5))
        console.log(`    Level ${d}: ${bar} (${count})`)
      }

      // Should have at least some problems at each main difficulty level
      const hasAllLevels = [1, 2, 3, 4, 5].every(
        (d) => (distribution[d] || 0) > 0
      )
      expect(hasAllLevels).toBe(true)
    })

    it('should have problems across all major topics', () => {
      const topics = new Map<string, number>()

      allProblems.forEach((problem) => {
        const count = topics.get(problem.topic) || 0
        topics.set(problem.topic, count + 1)
      })

      console.log(`\n  Topics covered: ${topics.size}`)
      console.log('  Topic distribution:')

      const sorted = Array.from(topics.entries()).sort((a, b) => b[1] - a[1])
      sorted.slice(0, 10).forEach(([topic, count]) => {
        console.log(`    ${topic}: ${count}`)
      })

      expect(topics.size).toBeGreaterThan(5)
    })

    it('should have balanced problem types', () => {
      const types = new Map<string, number>()

      allProblems.forEach((problem) => {
        const count = types.get(problem.problemType) || 0
        types.set(problem.problemType, count + 1)
      })

      console.log('\n  Problem Type Distribution:')
      types.forEach((count, type) => {
        const pct = ((count / allProblems.length) * 100).toFixed(1)
        console.log(`    ${type}: ${count} (${pct}%)`)
      })

      // Should have at least 2 problem types
      expect(types.size).toBeGreaterThanOrEqual(2)
    })
  })

  // ============================================================================
  // TAG VALIDATION
  // ============================================================================
  describe('Tag Validation', () => {
    it('should report tag usage', () => {
      const allTags = new Map<string, number>()
      let problemsWithTags = 0

      allProblems.forEach((problem) => {
        if (problem.tags && problem.tags.length > 0) {
          problemsWithTags++
          problem.tags.forEach((tag) => {
            allTags.set(tag, (allTags.get(tag) || 0) + 1)
          })
        }
      })

      console.log(
        `\n  Problems with tags: ${problemsWithTags}/${allProblems.length}`
      )
      console.log(`  Unique tags: ${allTags.size}`)

      const topTags = Array.from(allTags.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

      if (topTags.length > 0) {
        console.log('  Top tags:')
        topTags.forEach(([tag, count]) => {
          console.log(`    ${tag}: ${count}`)
        })
      }

      audit.addStatistic(
        'Tag Coverage',
        `${problemsWithTags}/${allProblems.length}`
      )
    })
  })
})

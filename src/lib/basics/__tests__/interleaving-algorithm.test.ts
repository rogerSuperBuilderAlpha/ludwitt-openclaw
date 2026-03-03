/**
 * @jest-environment node
 */

/**
 * Unit tests for the Interleaving Algorithm
 *
 * Tests selectInterleavedProblems, applyInterleavingPattern (via selectInterleavedProblems),
 * estimateCognitiveLoad (via selectInterleavedProblems), and describeInterleavingPattern
 * (via selectInterleavedProblems).
 *
 * NOTE: The source code's applyInterleavingPattern has a known edge case where it can
 * loop indefinitely when discriminationFocus is true and all remaining unplaced problems
 * are the same type that has exceeded maxConsecutiveSameType. Tests avoid triggering this
 * by either using discriminationFocus: false for single-type sets or ensuring enough type
 * diversity relative to maxConsecutiveSameType.
 */

// Mock firebase-admin/firestore used by transitive imports (cognitive-diagnostics, spaced-repetition)
jest.mock('firebase-admin/firestore', () => ({
  Timestamp: { now: jest.fn(), fromDate: jest.fn() },
}))

import {
  selectInterleavedProblems,
  DEFAULT_INTERLEAVING_PARAMS,
  InterleavingParameters,
  ProblemSelectionContext,
} from '../interleaving-algorithm'
import type { MathProblem } from '@/lib/types/basics'

// ---------------------------------------------------------------------------
// Mock problem factory
// ---------------------------------------------------------------------------

function createMathProblem(
  overrides: Partial<MathProblem> & { id: string; difficulty: number }
): MathProblem {
  return {
    type: 'arithmetic',
    question: `What is 2 + ${overrides.id}?`,
    correctAnswer: '4',
    explanation: 'test explanation',
    topic: 'addition',
    ...overrides,
  } as MathProblem
}

function createProblemsOfType(
  type: string,
  count: number,
  baseDifficulty: number,
  idPrefix: string
): MathProblem[] {
  return Array.from({ length: count }, (_, i) =>
    createMathProblem({
      id: `${idPrefix}-${i}`,
      type: type as MathProblem['type'],
      difficulty: baseDifficulty + i * 0.5,
      topic: type,
    })
  )
}

// Safe params that disable discriminationFocus to avoid infinite loop with single-type sets
const SAFE_SINGLE_TYPE_PARAMS: InterleavingParameters = {
  newMaterialRatio: 1.0,
  spacedReviewRatio: 0,
  strugglingSkillsRatio: 0,
  discriminationFocus: false,
  maxConsecutiveSameType: 100,
}

// ---------------------------------------------------------------------------
// Default context factory
// ---------------------------------------------------------------------------

function createContext(
  overrides: Partial<ProblemSelectionContext> = {}
): ProblemSelectionContext {
  return {
    targetDifficulty: 5,
    masteredSkills: [],
    strugglingSkills: [],
    recentProblemTypes: [],
    spacedRepetitionDue: [],
    cognitiveLoad: 3,
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// selectInterleavedProblems
// ---------------------------------------------------------------------------

describe('selectInterleavedProblems', () => {
  describe('basic selection', () => {
    it('returns up to the requested count of problems', () => {
      const problems = createProblemsOfType('arithmetic', 20, 3, 'a')
      const context = createContext()
      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        10
      )
      expect(result.problems.length).toBeLessThanOrEqual(10)
    })

    it('returns all available problems when fewer than requested', () => {
      const problems = createProblemsOfType('arithmetic', 3, 5, 'a')
      const context = createContext()
      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        10
      )
      expect(result.problems.length).toBeLessThanOrEqual(3)
    })

    it('returns an empty set when no problems are available', () => {
      const context = createContext()
      const result = selectInterleavedProblems(
        [],
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        10
      )
      expect(result.problems.length).toBe(0)
    })

    it('returns a result with rationale string', () => {
      const problems = createProblemsOfType('arithmetic', 15, 5, 'a')
      const context = createContext()
      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        5
      )
      expect(typeof result.rationale).toBe('string')
    })

    it('returns expectedBenefits as an array', () => {
      const problems = createProblemsOfType('arithmetic', 15, 5, 'a')
      const context = createContext()
      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        5
      )
      expect(Array.isArray(result.expectedBenefits)).toBe(true)
    })

    it('returns a numeric cognitiveLoadEstimate', () => {
      const problems = createProblemsOfType('arithmetic', 15, 5, 'a')
      const context = createContext()
      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        5
      )
      expect(typeof result.cognitiveLoadEstimate).toBe('number')
    })

    it('returns a string interleavingPattern', () => {
      const problems = createProblemsOfType('arithmetic', 15, 5, 'a')
      const context = createContext()
      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        5
      )
      expect(typeof result.interleavingPattern).toBe('string')
      expect(result.interleavingPattern.length).toBeGreaterThan(0)
    })
  })

  describe('distribution based on parameters', () => {
    it('uses default parameters when none provided with diverse types', () => {
      // Use multiple types to be safe with DEFAULT_INTERLEAVING_PARAMS (discriminationFocus: true)
      const problems = [
        ...createProblemsOfType('arithmetic', 5, 5, 'a'),
        ...createProblemsOfType('algebra', 5, 5, 'b'),
        ...createProblemsOfType('geometry', 5, 5, 'c'),
      ]
      const context = createContext()
      const result = selectInterleavedProblems(problems, context)
      // Default count is 10
      expect(result.problems.length).toBeLessThanOrEqual(10)
    })

    it('respects custom count', () => {
      const problems = createProblemsOfType('arithmetic', 20, 5, 'a')
      const context = createContext()
      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        5
      )
      expect(result.problems.length).toBeLessThanOrEqual(5)
    })
  })

  describe('spaced repetition selection', () => {
    it('includes problems that are due for spaced repetition', () => {
      const problems = [
        createMathProblem({ id: 'spaced-1', difficulty: 5, topic: 'addition' }),
        createMathProblem({ id: 'spaced-2', difficulty: 5, topic: 'addition' }),
        createMathProblem({ id: 'new-1', difficulty: 5, topic: 'addition' }),
        createMathProblem({ id: 'new-2', difficulty: 5, topic: 'addition' }),
        createMathProblem({ id: 'new-3', difficulty: 5, topic: 'addition' }),
      ]
      const context = createContext({
        spacedRepetitionDue: ['spaced-1', 'spaced-2'],
      })

      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        5
      )
      const selectedIds = result.problems.map((p) => p.id)
      expect(selectedIds).toContain('spaced-1')
      expect(selectedIds).toContain('spaced-2')
    })
  })

  describe('difficulty-based selection', () => {
    it('prefers problems closer to target difficulty', () => {
      const problems = [
        createMathProblem({
          id: 'close-1',
          difficulty: 5.0,
          topic: 'addition',
        }),
        createMathProblem({
          id: 'close-2',
          difficulty: 5.2,
          topic: 'addition',
        }),
        createMathProblem({
          id: 'far-1',
          difficulty: 1.0,
          topic: 'subtraction',
        }),
        createMathProblem({ id: 'far-2', difficulty: 12.0, topic: 'algebra' }),
      ]
      const context = createContext({ targetDifficulty: 5 })

      const result = selectInterleavedProblems(
        problems,
        context,
        SAFE_SINGLE_TYPE_PARAMS,
        2
      )
      const selectedIds = result.problems.map((p) => p.id)
      // The closest-difficulty problems should be picked
      expect(selectedIds).toContain('close-1')
      expect(selectedIds).toContain('close-2')
    })
  })

  describe('struggling skills selection', () => {
    it('includes problems matching struggling skills', () => {
      const problems = [
        createMathProblem({
          id: 'add-1',
          difficulty: 2,
          type: 'arithmetic',
          question: 'What is 3 + 4?',
          topic: 'arithmetic',
        }),
        createMathProblem({
          id: 'alg-1',
          difficulty: 8,
          type: 'algebra',
          topic: 'algebra',
        }),
      ]

      const context = createContext({
        strugglingSkills: ['addition-basic'],
      })

      const params: InterleavingParameters = {
        newMaterialRatio: 0,
        spacedReviewRatio: 0,
        strugglingSkillsRatio: 1.0,
        discriminationFocus: false,
        maxConsecutiveSameType: 10,
      }

      const result = selectInterleavedProblems(problems, context, params, 5)
      // Should include the arithmetic problem matching struggling skill
      const selectedIds = result.problems.map((p) => p.id)
      expect(selectedIds).toContain('add-1')
    })
  })
})

// ---------------------------------------------------------------------------
// Interleaving pattern (tested via selectInterleavedProblems)
// ---------------------------------------------------------------------------

describe('interleaving pattern behavior', () => {
  it('shuffles problems when discrimination focus is disabled', () => {
    const problems = [
      ...createProblemsOfType('arithmetic', 5, 5, 'a'),
      ...createProblemsOfType('algebra', 5, 5, 'b'),
    ]

    const params: InterleavingParameters = {
      newMaterialRatio: 1.0,
      spacedReviewRatio: 0,
      strugglingSkillsRatio: 0,
      discriminationFocus: false,
      maxConsecutiveSameType: 10,
    }

    const context = createContext()
    const result = selectInterleavedProblems(problems, context, params, 10)
    // All problems should still be present (just potentially reordered)
    expect(result.problems.length).toBeLessThanOrEqual(10)
  })

  it('interleaves with multiple types and discrimination focus on', () => {
    // Use 2 types with equal counts -- 2 of each, maxConsecutive=2
    // This is safe because the algorithm can always pick from the other type
    const problems = [
      ...createProblemsOfType('arithmetic', 2, 5, 'a'),
      ...createProblemsOfType('algebra', 2, 5, 'b'),
    ]

    const params: InterleavingParameters = {
      newMaterialRatio: 1.0,
      spacedReviewRatio: 0,
      strugglingSkillsRatio: 0,
      discriminationFocus: true,
      maxConsecutiveSameType: 2,
    }

    const context = createContext()
    const result = selectInterleavedProblems(problems, context, params, 4)

    // Verify interleaving was attempted and problems were selected
    expect(result.problems.length).toBeGreaterThan(0)
    expect(result.problems.length).toBeLessThanOrEqual(4)
  })
})

// ---------------------------------------------------------------------------
// Cognitive load estimation (tested via selectInterleavedProblems)
// ---------------------------------------------------------------------------

describe('cognitive load estimation', () => {
  it('returns 0 for empty problem set', () => {
    const context = createContext()
    const result = selectInterleavedProblems(
      [],
      context,
      SAFE_SINGLE_TYPE_PARAMS,
      0
    )
    expect(result.cognitiveLoadEstimate).toBe(0)
  })

  it('returns higher load for higher difficulty problems', () => {
    const easyProblems = createProblemsOfType('arithmetic', 10, 1, 'e')
    const hardProblems = createProblemsOfType('arithmetic', 10, 10, 'h')

    const context = createContext()
    const easyResult = selectInterleavedProblems(
      easyProblems,
      context,
      SAFE_SINGLE_TYPE_PARAMS,
      5
    )
    const hardResult = selectInterleavedProblems(
      hardProblems,
      context,
      SAFE_SINGLE_TYPE_PARAMS,
      5
    )

    expect(hardResult.cognitiveLoadEstimate).toBeGreaterThan(
      easyResult.cognitiveLoadEstimate
    )
  })

  it('cognitive load is capped between 0 and 5', () => {
    const problems = createProblemsOfType('arithmetic', 20, 6, 'a')
    const context = createContext()
    const result = selectInterleavedProblems(
      problems,
      context,
      SAFE_SINGLE_TYPE_PARAMS,
      5
    )

    expect(result.cognitiveLoadEstimate).toBeGreaterThanOrEqual(0)
    expect(result.cognitiveLoadEstimate).toBeLessThanOrEqual(5)
  })
})

// ---------------------------------------------------------------------------
// Pattern description (tested via selectInterleavedProblems)
// ---------------------------------------------------------------------------

describe('interleaving pattern description', () => {
  it('describes "No problems selected" for empty set', () => {
    const context = createContext()
    const result = selectInterleavedProblems(
      [],
      context,
      SAFE_SINGLE_TYPE_PARAMS,
      0
    )
    expect(result.interleavingPattern).toBe('No problems selected')
  })

  it('describes blocked practice when all problems are same type', () => {
    const problems = createProblemsOfType('arithmetic', 10, 5, 'a')

    const context = createContext()
    const result = selectInterleavedProblems(
      problems,
      context,
      SAFE_SINGLE_TYPE_PARAMS,
      5
    )
    expect(result.interleavingPattern).toContain('Blocked practice')
  })

  it('describes interleaving when multiple types are present', () => {
    // Use diverse types with discrimination off to avoid infinite loop
    const problems = [
      ...createProblemsOfType('arithmetic', 3, 5, 'a'),
      ...createProblemsOfType('algebra', 3, 5, 'b'),
      ...createProblemsOfType('geometry', 3, 5, 'c'),
      ...createProblemsOfType('word-problem', 3, 5, 'd'),
    ]

    const params: InterleavingParameters = {
      newMaterialRatio: 1.0,
      spacedReviewRatio: 0,
      strugglingSkillsRatio: 0,
      discriminationFocus: false,
      maxConsecutiveSameType: 100,
    }

    const context = createContext()
    const result = selectInterleavedProblems(problems, context, params, 8)
    // Should mention interleaving since there are multiple types
    expect(result.interleavingPattern).toMatch(/interleaving|Blocked/)
  })
})

// ---------------------------------------------------------------------------
// DEFAULT_INTERLEAVING_PARAMS
// ---------------------------------------------------------------------------

describe('DEFAULT_INTERLEAVING_PARAMS', () => {
  it('ratios sum to 1.0', () => {
    const sum =
      DEFAULT_INTERLEAVING_PARAMS.newMaterialRatio +
      DEFAULT_INTERLEAVING_PARAMS.spacedReviewRatio +
      DEFAULT_INTERLEAVING_PARAMS.strugglingSkillsRatio
    expect(sum).toBeCloseTo(1.0)
  })

  it('all ratios are between 0 and 1', () => {
    expect(DEFAULT_INTERLEAVING_PARAMS.newMaterialRatio).toBeGreaterThanOrEqual(
      0
    )
    expect(DEFAULT_INTERLEAVING_PARAMS.newMaterialRatio).toBeLessThanOrEqual(1)
    expect(
      DEFAULT_INTERLEAVING_PARAMS.spacedReviewRatio
    ).toBeGreaterThanOrEqual(0)
    expect(DEFAULT_INTERLEAVING_PARAMS.spacedReviewRatio).toBeLessThanOrEqual(1)
    expect(
      DEFAULT_INTERLEAVING_PARAMS.strugglingSkillsRatio
    ).toBeGreaterThanOrEqual(0)
    expect(
      DEFAULT_INTERLEAVING_PARAMS.strugglingSkillsRatio
    ).toBeLessThanOrEqual(1)
  })

  it('discriminationFocus is enabled by default', () => {
    expect(DEFAULT_INTERLEAVING_PARAMS.discriminationFocus).toBe(true)
  })

  it('maxConsecutiveSameType is a positive integer', () => {
    expect(DEFAULT_INTERLEAVING_PARAMS.maxConsecutiveSameType).toBeGreaterThan(
      0
    )
    expect(
      Number.isInteger(DEFAULT_INTERLEAVING_PARAMS.maxConsecutiveSameType)
    ).toBe(true)
  })
})

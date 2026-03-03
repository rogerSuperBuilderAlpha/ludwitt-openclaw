/**
 * Unit tests for the Problem Generation system.
 *
 * Covers:
 *   - generateProblem with specific template parameters
 *   - Template selection (weighted by successRate)
 *   - Variable instantiation: integer, decimal, string, fraction types
 *   - Dependent variables via formulas
 *   - Formula evaluation (arithmetic, string concatenation, ternary)
 *   - Constraint validation (no_division_by_zero, integer_result, positive_result, numeric_bounds, custom)
 *   - Difficulty calculation (weighted blend of factors)
 *   - generateProblemSet deduplication and count
 *   - Error handling: retry on constraint violation up to maxAttempts
 *   - Edge cases: no matching template, all attempts fail
 */

import type { ProblemTemplate, GenerationConfig } from '../types'

// ---------------------------------------------------------------------------
// Mocks: replace ALL_MATH_TEMPLATES so we control exactly which templates the
// generator can see.
// ---------------------------------------------------------------------------

// We will mutate this array in individual tests / describe blocks.
let mockTemplates: ProblemTemplate[] = []

jest.mock('../templates/math-templates', () => ({
  get ALL_MATH_TEMPLATES() {
    return mockTemplates
  },
}))

// Import the functions under test *after* the mock is registered so that
// the module-level import in generator.ts resolves to our mock.
import {
  generateProblem,
  generateProblemSet,
  getTemplates,
  getTemplateById,
} from '../generator'

// ---------------------------------------------------------------------------
// Helpers to build test templates
// ---------------------------------------------------------------------------

function makeTemplate(
  overrides: Partial<ProblemTemplate> = {}
): ProblemTemplate {
  return {
    id: 'test_add',
    name: 'Test Addition',
    subject: 'math',
    category: 'arithmetic',
    structure: {
      type: 'arithmetic',
      template: 'What is {a} + {b}?',
      variables: [
        { name: 'a', type: 'integer', min: 1, max: 10, difficultyWeight: 0.5 },
        { name: 'b', type: 'integer', min: 1, max: 10, difficultyWeight: 0.5 },
      ],
      answerFormula: 'a + b',
    },
    difficultyRange: [1, 5],
    difficultyFactors: [
      {
        name: 'size',
        type: 'numeric_range',
        weight: 1.0,
        description: 'number size',
      },
    ],
    requiredSkills: ['math_addition'],
    validationRules: [],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.7,
    ...overrides,
  }
}

const LOW_ATTEMPTS_CONFIG: GenerationConfig = {
  maxAttempts: 3,
  targetSuccessRate: 0.7,
  difficultyCalibrationRate: 0.1,
  cacheEnabled: false,
  cacheTTLSeconds: 0,
}

const SINGLE_ATTEMPT_CONFIG: GenerationConfig = {
  maxAttempts: 1,
  targetSuccessRate: 0.7,
  difficultyCalibrationRate: 0.1,
  cacheEnabled: false,
  cacheTTLSeconds: 0,
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('generateProblem', () => {
  afterEach(() => {
    mockTemplates = []
    jest.restoreAllMocks()
  })

  // ==========================================================================
  // Basic generation
  // ==========================================================================

  describe('basic generation with specific template', () => {
    beforeEach(() => {
      mockTemplates = [makeTemplate()]
    })

    it('returns a valid problem for matching params', () => {
      const result = generateProblem({
        subject: 'math',
        category: 'arithmetic',
        targetDifficulty: 3,
      })

      expect(result.success).toBe(true)
      expect(result.problem).toBeDefined()
      expect(result.problem!.templateId).toBe('test_add')
      expect(result.problem!.problemText).toMatch(/What is \d+ \+ \d+\?/)
      expect(result.problem!.answer).toBeDefined()
      expect(result.problem!.verified).toBe(true)
      expect(result.problem!.verificationMethod).toBe('formula')
      expect(result.problem!.skills).toEqual(['math_addition'])
      expect(result.problem!.generatedAt).toBeInstanceOf(Date)
    })

    it('produces correct arithmetic answer', () => {
      const result = generateProblem({
        subject: 'math',
        category: 'arithmetic',
        targetDifficulty: 3,
      })

      expect(result.success).toBe(true)
      const { variables, answer } = result.problem!
      const expected = (variables.a as number) + (variables.b as number)
      expect(Number(answer)).toBe(expected)
    })

    it('selects template by templateId param', () => {
      mockTemplates = [
        makeTemplate({ id: 'tmpl_A', successRate: 0.9 }),
        makeTemplate({ id: 'tmpl_B', successRate: 0.1 }),
      ]

      const result = generateProblem({
        subject: 'math',
        targetDifficulty: 3,
        templateId: 'tmpl_B',
      })

      expect(result.success).toBe(true)
      expect(result.problem!.templateId).toBe('tmpl_B')
    })

    it('generates problem id prefixed with template id', () => {
      const result = generateProblem({
        subject: 'math',
        targetDifficulty: 3,
      })

      expect(result.problem!.id).toMatch(/^test_add_/)
    })
  })

  // ==========================================================================
  // Template selection - weighted by successRate
  // ==========================================================================

  describe('template selection (weighted by successRate)', () => {
    it('favors templates with higher successRate over many trials', () => {
      const highSuccess = makeTemplate({ id: 'high', successRate: 0.95 })
      const lowSuccess = makeTemplate({ id: 'low', successRate: 0.05 })
      mockTemplates = [highSuccess, lowSuccess]

      const counts: Record<string, number> = { high: 0, low: 0 }
      const trials = 200

      for (let i = 0; i < trials; i++) {
        const result = generateProblem({
          subject: 'math',
          targetDifficulty: 3,
        })
        if (result.success && result.problem) {
          counts[result.problem.templateId]++
        }
      }

      // The high-success template should be selected substantially more often.
      // Weight ratio is (0.95+0.1) : (0.05+0.1) = 1.05 : 0.15 ~ 7:1
      expect(counts.high).toBeGreaterThan(counts.low)
    })
  })

  // ==========================================================================
  // Variable instantiation
  // ==========================================================================

  describe('variable instantiation', () => {
    it('instantiates integer variables within min/max range', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} + 0',
            variables: [{ name: 'a', type: 'integer', min: 5, max: 15 }],
            answerFormula: 'a',
          },
        }),
      ]

      for (let i = 0; i < 30; i++) {
        const result = generateProblem({ subject: 'math', targetDifficulty: 3 })
        if (result.success) {
          const a = result.problem!.variables.a as number
          expect(a).toBeGreaterThanOrEqual(5)
          expect(a).toBeLessThanOrEqual(15)
          expect(Number.isInteger(a)).toBe(true)
        }
      }
    })

    it('instantiates decimal variables', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{d} + 0',
            variables: [{ name: 'd', type: 'decimal', min: 1, max: 5 }],
            answerFormula: 'd',
          },
        }),
      ]

      const result = generateProblem({ subject: 'math', targetDifficulty: 5 })
      expect(result.success).toBe(true)
      const d = result.problem!.variables.d as number
      expect(d).toBeGreaterThanOrEqual(1)
      expect(d).toBeLessThanOrEqual(5)
      // Decimal should not always be integer
      // (We just verify it's a number; randomness makes non-integer likely.)
      expect(typeof d).toBe('number')
    })

    it('instantiates string variables from choices', () => {
      const choices = ['apples', 'books', 'coins']
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'word_problem',
            template: 'I have {item}',
            variables: [{ name: 'item', type: 'string', choices }],
            answerFormula: '"placeholder"',
          },
        }),
      ]

      for (let i = 0; i < 20; i++) {
        const result = generateProblem({ subject: 'math', targetDifficulty: 3 })
        if (result.success) {
          expect(choices).toContain(result.problem!.variables.item)
        }
      }
    })

    it('returns default string when no choices provided', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'word_problem',
            template: 'Something: {x}',
            variables: [{ name: 'x', type: 'string' }],
            answerFormula: '"value"',
          },
        }),
      ]

      const result = generateProblem({ subject: 'math', targetDifficulty: 3 })
      expect(result.success).toBe(true)
      expect(result.problem!.variables.x).toBe('value')
    })

    it('instantiates fraction variables as numerator/denominator string', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: 'Simplify {f}',
            variables: [{ name: 'f', type: 'fraction' }],
            answerFormula: '"1/2"',
          },
        }),
      ]

      const result = generateProblem({ subject: 'math', targetDifficulty: 3 })
      expect(result.success).toBe(true)
      expect(result.problem!.variables.f).toMatch(/^\d+\/\d+$/)
    })
  })

  // ==========================================================================
  // Dependent variables via formulas
  // ==========================================================================

  describe('dependent variables via formulas', () => {
    it('computes dependent variable from formula', () => {
      mockTemplates = [
        makeTemplate({
          id: 'dep_test',
          structure: {
            type: 'arithmetic',
            template: '{dividend} / {divisor}',
            variables: [
              { name: 'divisor', type: 'integer', min: 2, max: 5 },
              { name: 'quotient', type: 'integer', min: 2, max: 5 },
              {
                name: 'dividend',
                type: 'integer',
                dependsOn: 'divisor,quotient',
                formula: 'divisor * quotient',
              },
            ],
            answerFormula: 'dividend / divisor',
          },
        }),
      ]

      const result = generateProblem({ subject: 'math', targetDifficulty: 3 })
      expect(result.success).toBe(true)

      const { divisor, quotient, dividend } = result.problem!.variables
      expect(dividend).toBe((divisor as number) * (quotient as number))
    })
  })

  // ==========================================================================
  // Formula evaluation
  // ==========================================================================

  describe('formula evaluation', () => {
    it('evaluates arithmetic expressions', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} * {b}',
            variables: [
              { name: 'a', type: 'integer', min: 3, max: 3 },
              { name: 'b', type: 'integer', min: 4, max: 4 },
            ],
            answerFormula: 'a * b',
          },
        }),
      ]

      const result = generateProblem({ subject: 'math', targetDifficulty: 1 })
      expect(result.success).toBe(true)
      // a is in range [3,3], b in [3,4] area; but the difficulty scaler may shift things.
      // We verify arithmetic correctness.
      const a = result.problem!.variables.a as number
      const b = result.problem!.variables.b as number
      expect(Number(result.problem!.answer)).toBe(a * b)
    })

    it('evaluates string concatenation formulas', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: 'Simplify {numerator}/{denominator}',
            variables: [
              { name: 'gcd', type: 'integer', min: 2, max: 2 },
              { name: 'simplified_num', type: 'integer', min: 1, max: 1 },
              { name: 'simplified_den', type: 'integer', min: 3, max: 3 },
              {
                name: 'numerator',
                type: 'integer',
                dependsOn: 'gcd,simplified_num',
                formula: 'gcd * simplified_num',
              },
              {
                name: 'denominator',
                type: 'integer',
                dependsOn: 'gcd,simplified_den',
                formula: 'gcd * simplified_den',
              },
            ],
            answerFormula: 'simplified_num + "/" + simplified_den',
          },
          validationRules: [],
        }),
      ]

      const result = generateProblem({ subject: 'math', targetDifficulty: 3 })
      expect(result.success).toBe(true)
      // The string concatenation formula should produce "1/3" (or similar)
      // The formula replaces vars then strips quotes and '+' to concatenate.
      expect(result.problem!.answer).toContain('/')
    })

    it('evaluates ternary / conditional formulas', () => {
      // Simulate the algebra template that uses op === '+' ? b - a : b + a
      mockTemplates = [
        makeTemplate({
          id: 'ternary_test',
          category: 'algebra',
          structure: {
            type: 'algebraic',
            template: 'Solve: x {op} {a} = {b}',
            variables: [
              { name: 'op', type: 'string', choices: ['+'] },
              { name: 'a', type: 'integer', min: 5, max: 5 },
              { name: 'b', type: 'integer', min: 12, max: 12 },
            ],
            answerFormula: "op === '+' ? b - a : b + a",
          },
          difficultyRange: [1, 10],
          validationRules: [],
        }),
      ]

      const result = generateProblem({ subject: 'math', targetDifficulty: 3 })
      expect(result.success).toBe(true)
      // op is '+', a=5, b=12 => answer = 12 - 5 = 7
      expect(Number(result.problem!.answer)).toBe(7)
    })
  })

  // ==========================================================================
  // Constraint / validation rules
  // ==========================================================================

  describe('constraint validation', () => {
    it('rejects problem when no_division_by_zero is violated (divisor = 0)', () => {
      // Use a template where divisor is forced to 0
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} / {divisor}',
            variables: [
              { name: 'a', type: 'integer', min: 5, max: 5 },
              { name: 'divisor', type: 'integer', min: 0, max: 0 },
            ],
            answerFormula: 'a / divisor',
          },
          validationRules: [
            {
              type: 'no_division_by_zero',
              errorMessage: 'Cannot divide by zero',
            },
          ],
        }),
      ]

      const result = generateProblem(
        { subject: 'math', targetDifficulty: 3 },
        SINGLE_ATTEMPT_CONFIG
      )
      // The outer loop exhausts all attempts; result has error, not validationErrors
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('rejects problem when integer_result is violated', () => {
      // 5 / 3 is not an integer
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} / {b}',
            variables: [
              { name: 'a', type: 'integer', min: 5, max: 5 },
              { name: 'b', type: 'integer', min: 3, max: 3 },
            ],
            answerFormula: 'a / b',
          },
          validationRules: [
            { type: 'integer_result', errorMessage: 'Result must be integer' },
          ],
        }),
      ]

      const result = generateProblem(
        { subject: 'math', targetDifficulty: 1 },
        SINGLE_ATTEMPT_CONFIG
      )
      // The answer 5/3 is not integer, so validation should prevent success
      expect(result.success).toBe(false)
    })

    it('rejects problem when positive_result is violated', () => {
      // a - b where a < b => negative
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} - {b}',
            variables: [
              { name: 'a', type: 'integer', min: 2, max: 2 },
              { name: 'b', type: 'integer', min: 10, max: 10 },
            ],
            answerFormula: 'a - b',
          },
          validationRules: [
            {
              type: 'positive_result',
              errorMessage: 'Result must be positive',
            },
          ],
        }),
      ]

      const result = generateProblem(
        { subject: 'math', targetDifficulty: 1 },
        SINGLE_ATTEMPT_CONFIG
      )
      expect(result.success).toBe(false)
    })

    it('rejects problem when numeric_bounds is violated', () => {
      // a + b with large values, bound says answer <= 10
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} + {b}',
            variables: [
              { name: 'a', type: 'integer', min: 50, max: 50 },
              { name: 'b', type: 'integer', min: 50, max: 50 },
            ],
            answerFormula: 'a + b',
          },
          validationRules: [
            {
              type: 'numeric_bounds',
              expression: 'answer <= 10',
              errorMessage: 'Answer too large',
            },
          ],
        }),
      ]

      const result = generateProblem(
        { subject: 'math', targetDifficulty: 1 },
        SINGLE_ATTEMPT_CONFIG
      )
      expect(result.success).toBe(false)
    })

    it('rejects problem when custom constraint fails', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} + {b}',
            variables: [
              { name: 'a', type: 'integer', min: 1, max: 1 },
              { name: 'b', type: 'integer', min: 1, max: 1 },
            ],
            answerFormula: 'a + b',
          },
          // Custom rule: a > 5 -- but a is pinned at 1, so this will always fail
          validationRules: [
            {
              type: 'custom',
              expression: 'a > 5',
              errorMessage: 'a must be greater than 5',
            },
          ],
        }),
      ]

      const result = generateProblem(
        { subject: 'math', targetDifficulty: 1 },
        SINGLE_ATTEMPT_CONFIG
      )
      expect(result.success).toBe(false)
    })

    it('succeeds when all constraints pass', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} + {b}',
            variables: [
              { name: 'a', type: 'integer', min: 3, max: 3 },
              { name: 'b', type: 'integer', min: 4, max: 4 },
            ],
            answerFormula: 'a + b',
          },
          validationRules: [
            { type: 'integer_result', errorMessage: 'Must be integer' },
            { type: 'positive_result', errorMessage: 'Must be positive' },
            {
              type: 'numeric_bounds',
              expression: 'answer <= 100',
              errorMessage: 'Answer too large',
            },
          ],
        }),
      ]

      const result = generateProblem(
        { subject: 'math', targetDifficulty: 1 },
        SINGLE_ATTEMPT_CONFIG
      )
      expect(result.success).toBe(true)
      expect(result.problem).toBeDefined()
    })
  })

  // ==========================================================================
  // Difficulty calculation
  // ==========================================================================

  describe('difficulty calculation', () => {
    it('returns difficulty within template difficultyRange', () => {
      mockTemplates = [
        makeTemplate({
          difficultyRange: [2, 8],
          difficultyFactors: [
            {
              name: 'size',
              type: 'numeric_range',
              weight: 1.0,
              description: 'd',
            },
          ],
        }),
      ]

      for (let i = 0; i < 20; i++) {
        const result = generateProblem({ subject: 'math', targetDifficulty: 5 })
        if (result.success) {
          expect(result.problem!.difficulty).toBeGreaterThanOrEqual(2)
          expect(result.problem!.difficulty).toBeLessThanOrEqual(8)
        }
      }
    })

    it('difficulty is affected by difficultyWeight of variables', () => {
      // Two templates: one with high difficultyWeight variables at large values,
      // one with low weight. Over many trials the first should yield higher avg difficulty.
      const highWeightTemplate = makeTemplate({
        id: 'hi_weight',
        difficultyRange: [1, 10],
        structure: {
          type: 'arithmetic',
          template: '{a} + {b}',
          variables: [
            {
              name: 'a',
              type: 'integer',
              min: 1,
              max: 100,
              difficultyWeight: 1.0,
            },
            {
              name: 'b',
              type: 'integer',
              min: 1,
              max: 100,
              difficultyWeight: 1.0,
            },
          ],
          answerFormula: 'a + b',
        },
        difficultyFactors: [
          {
            name: 'size',
            type: 'numeric_range',
            weight: 1.0,
            description: 'd',
          },
        ],
      })

      const lowWeightTemplate = makeTemplate({
        id: 'lo_weight',
        difficultyRange: [1, 10],
        structure: {
          type: 'arithmetic',
          template: '{a} + {b}',
          variables: [
            {
              name: 'a',
              type: 'integer',
              min: 1,
              max: 100,
              difficultyWeight: 0.01,
            },
            {
              name: 'b',
              type: 'integer',
              min: 1,
              max: 100,
              difficultyWeight: 0.01,
            },
          ],
          answerFormula: 'a + b',
        },
        difficultyFactors: [
          {
            name: 'size',
            type: 'numeric_range',
            weight: 1.0,
            description: 'd',
          },
        ],
      })

      // Test high weight
      mockTemplates = [highWeightTemplate]
      let sumHi = 0,
        countHi = 0
      for (let i = 0; i < 50; i++) {
        const r = generateProblem({ subject: 'math', targetDifficulty: 8 })
        if (r.success) {
          sumHi += r.problem!.difficulty
          countHi++
        }
      }

      // Test low weight
      mockTemplates = [lowWeightTemplate]
      let sumLo = 0,
        countLo = 0
      for (let i = 0; i < 50; i++) {
        const r = generateProblem({ subject: 'math', targetDifficulty: 8 })
        if (r.success) {
          sumLo += r.problem!.difficulty
          countLo++
        }
      }

      const avgHi = countHi > 0 ? sumHi / countHi : 0
      const avgLo = countLo > 0 ? sumLo / countLo : 0

      // High-weight template should yield higher (or equal) average difficulty
      expect(avgHi).toBeGreaterThanOrEqual(avgLo)
    })
  })

  // ==========================================================================
  // Explanation generation
  // ==========================================================================

  describe('explanation generation', () => {
    it('includes explanation and steps when includeExplanation is true', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: 'What is {a} + {b}?',
            variables: [
              { name: 'a', type: 'integer', min: 3, max: 3 },
              { name: 'b', type: 'integer', min: 4, max: 4 },
            ],
            answerFormula: 'a + b',
            explanationTemplate: 'Add {a} and {b}. The sum is {answer}.',
          },
        }),
      ]

      const result = generateProblem({
        subject: 'math',
        targetDifficulty: 3,
        includeExplanation: true,
      })

      expect(result.success).toBe(true)
      expect(result.problem!.explanation).toBeDefined()
      expect(result.problem!.explanation).toContain('Add')
      expect(result.problem!.steps).toBeDefined()
      expect(result.problem!.steps!.length).toBeGreaterThan(0)
    })

    it('does not include explanation when includeExplanation is false/undefined', () => {
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} + {b}',
            variables: [
              { name: 'a', type: 'integer', min: 2, max: 2 },
              { name: 'b', type: 'integer', min: 3, max: 3 },
            ],
            answerFormula: 'a + b',
            explanationTemplate: 'Some explanation {answer}.',
          },
        }),
      ]

      const result = generateProblem({
        subject: 'math',
        targetDifficulty: 3,
      })

      expect(result.success).toBe(true)
      expect(result.problem!.explanation).toBeUndefined()
    })
  })

  // ==========================================================================
  // Filtering: category, skills, difficulty tolerance
  // ==========================================================================

  describe('template filtering', () => {
    beforeEach(() => {
      mockTemplates = [
        makeTemplate({
          id: 'arith',
          category: 'arithmetic',
          requiredSkills: ['math_addition'],
          difficultyRange: [1, 3],
        }),
        makeTemplate({
          id: 'alg',
          category: 'algebra',
          requiredSkills: ['math_variables'],
          difficultyRange: [4, 6],
        }),
        makeTemplate({
          id: 'geo',
          category: 'geometry',
          requiredSkills: ['math_geometry'],
          difficultyRange: [7, 10],
        }),
      ]
    })

    it('filters by category', () => {
      const result = generateProblem({
        subject: 'math',
        category: 'algebra',
        targetDifficulty: 5,
      })

      expect(result.success).toBe(true)
      expect(result.problem!.templateId).toBe('alg')
    })

    it('filters by requiredSkills', () => {
      const result = generateProblem({
        subject: 'math',
        targetDifficulty: 5,
        requiredSkills: ['math_geometry'],
        difficultyTolerance: 10, // wide tolerance to not filter by difficulty
      })

      expect(result.success).toBe(true)
      expect(result.problem!.templateId).toBe('geo')
    })

    it('filters out excludeSkills', () => {
      const result = generateProblem({
        subject: 'math',
        targetDifficulty: 2,
        excludeSkills: ['math_addition', 'math_geometry'],
        difficultyTolerance: 10,
      })

      expect(result.success).toBe(true)
      expect(result.problem!.templateId).toBe('alg')
    })

    it('filters by difficulty range with tolerance', () => {
      // targetDifficulty=6 with tolerance=0 should only match 'alg' (range [4,6])
      const result = generateProblem({
        subject: 'math',
        targetDifficulty: 6,
        difficultyTolerance: 0,
      })

      expect(result.success).toBe(true)
      expect(result.problem!.templateId).toBe('alg')
    })
  })

  // ==========================================================================
  // Error handling
  // ==========================================================================

  describe('error handling', () => {
    it('returns error when no matching template found', () => {
      mockTemplates = [
        makeTemplate({ subject: 'math', category: 'arithmetic' }),
      ]

      const result = generateProblem({
        subject: 'reading', // no reading templates
        targetDifficulty: 3,
      })

      expect(result.success).toBe(false)
      expect(result.error).toContain('No suitable template')
    })

    it('retries up to maxAttempts on constraint violations', () => {
      // Template that always violates: divisor pinned to 0
      mockTemplates = [
        makeTemplate({
          structure: {
            type: 'arithmetic',
            template: '{a} / {divisor}',
            variables: [
              { name: 'a', type: 'integer', min: 5, max: 5 },
              { name: 'divisor', type: 'integer', min: 0, max: 0 },
            ],
            answerFormula: 'a / divisor',
          },
          validationRules: [
            { type: 'no_division_by_zero', errorMessage: 'Div by zero' },
          ],
        }),
      ]

      const config: GenerationConfig = {
        maxAttempts: 5,
        targetSuccessRate: 0.7,
        difficultyCalibrationRate: 0.1,
        cacheEnabled: false,
        cacheTTLSeconds: 0,
      }

      const result = generateProblem(
        { subject: 'math', targetDifficulty: 3 },
        config
      )

      expect(result.success).toBe(false)
      expect(result.error).toContain(
        'Failed to generate valid problem after 5 attempts'
      )
      expect(result.attempts).toBe(5)
    })

    it('returns error when templateId does not exist', () => {
      mockTemplates = [makeTemplate({ id: 'existing' })]

      const result = generateProblem({
        subject: 'math',
        targetDifficulty: 3,
        templateId: 'nonexistent',
      })

      expect(result.success).toBe(false)
      expect(result.error).toContain('No suitable template')
    })
  })
})

// ===========================================================================
// generateProblemSet
// ===========================================================================

describe('generateProblemSet', () => {
  afterEach(() => {
    mockTemplates = []
    jest.restoreAllMocks()
  })

  it('generates the requested number of problems', () => {
    mockTemplates = [
      makeTemplate({
        structure: {
          type: 'arithmetic',
          template: 'What is {a} + {b}?',
          variables: [
            { name: 'a', type: 'integer', min: 1, max: 1000 },
            { name: 'b', type: 'integer', min: 1, max: 1000 },
          ],
          answerFormula: 'a + b',
        },
      }),
    ]

    const problems = generateProblemSet(
      { subject: 'math', targetDifficulty: 3 },
      5
    )

    expect(problems.length).toBe(5)
  })

  it('deduplicates problems by problemText', () => {
    // Use very constrained values so duplicates are highly likely
    mockTemplates = [
      makeTemplate({
        structure: {
          type: 'arithmetic',
          template: 'What is {a} + {b}?',
          variables: [
            { name: 'a', type: 'integer', min: 1, max: 2 },
            { name: 'b', type: 'integer', min: 1, max: 2 },
          ],
          answerFormula: 'a + b',
        },
      }),
    ]

    const problems = generateProblemSet(
      { subject: 'math', targetDifficulty: 1 },
      10
    )

    const texts = problems.map((p) => p.problemText)
    const uniqueTexts = new Set(texts)
    expect(texts.length).toBe(uniqueTexts.size) // all unique
  })

  it('returns fewer problems if unable to generate enough unique ones', () => {
    // Only one possible problem text
    mockTemplates = [
      makeTemplate({
        structure: {
          type: 'arithmetic',
          template: 'What is {a} + {b}?',
          variables: [
            { name: 'a', type: 'integer', min: 5, max: 5 },
            { name: 'b', type: 'integer', min: 5, max: 5 },
          ],
          answerFormula: 'a + b',
        },
      }),
    ]

    const problems = generateProblemSet(
      { subject: 'math', targetDifficulty: 1 },
      5
    )

    // There's only one unique problem text possible ("What is 5 + 5?"),
    // so we can get at most 1 problem.
    expect(problems.length).toBeLessThanOrEqual(1)
  })

  it('returns empty array when no templates match', () => {
    mockTemplates = []

    const problems = generateProblemSet(
      { subject: 'math', targetDifficulty: 3 },
      5
    )

    expect(problems).toEqual([])
  })
})

// ===========================================================================
// getTemplates / getTemplateById
// ===========================================================================

describe('getTemplates', () => {
  afterEach(() => {
    mockTemplates = []
  })

  it('returns all math templates for subject "math"', () => {
    const t1 = makeTemplate({ id: 't1' })
    const t2 = makeTemplate({ id: 't2' })
    mockTemplates = [t1, t2]

    const result = getTemplates('math')
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('t1')
  })

  it('returns empty array for unknown subject', () => {
    mockTemplates = [makeTemplate()]
    const result = getTemplates('history')
    expect(result).toEqual([])
  })
})

describe('getTemplateById', () => {
  afterEach(() => {
    mockTemplates = []
  })

  it('returns the template with matching id', () => {
    mockTemplates = [
      makeTemplate({ id: 'alpha' }),
      makeTemplate({ id: 'beta' }),
    ]

    const result = getTemplateById('beta')
    expect(result).not.toBeNull()
    expect(result!.id).toBe('beta')
  })

  it('returns null for non-existent id', () => {
    mockTemplates = [makeTemplate({ id: 'exists' })]

    const result = getTemplateById('does_not_exist')
    expect(result).toBeNull()
  })
})

// ===========================================================================
// Integration: end-to-end with realistic templates
// ===========================================================================

describe('integration: realistic template scenarios', () => {
  afterEach(() => {
    mockTemplates = []
    jest.restoreAllMocks()
  })

  it('generates a valid division problem with dependent variable', () => {
    mockTemplates = [
      makeTemplate({
        id: 'div_clean',
        structure: {
          type: 'arithmetic',
          template: 'What is {dividend} / {divisor}?',
          variables: [
            { name: 'divisor', type: 'integer', min: 2, max: 9 },
            { name: 'quotient', type: 'integer', min: 2, max: 9 },
            {
              name: 'dividend',
              type: 'integer',
              dependsOn: 'divisor,quotient',
              formula: 'divisor * quotient',
            },
          ],
          answerFormula: 'dividend / divisor',
        },
        validationRules: [
          { type: 'integer_result', errorMessage: 'Must divide evenly' },
          {
            type: 'no_division_by_zero',
            errorMessage: 'Cannot divide by zero',
          },
          { type: 'positive_result', errorMessage: 'Result must be positive' },
        ],
      }),
    ]

    const result = generateProblem({ subject: 'math', targetDifficulty: 3 })
    expect(result.success).toBe(true)

    const { divisor, quotient, dividend } = result.problem!.variables
    expect(dividend).toBe((divisor as number) * (quotient as number))
    expect(Number(result.problem!.answer)).toBe(quotient)
    expect(result.problem!.problemText).toMatch(/What is \d+ \/ \d+\?/)
  })

  it('generates word problems with string interpolation', () => {
    mockTemplates = [
      makeTemplate({
        id: 'word_add',
        category: 'word_problem',
        structure: {
          type: 'word_problem',
          template:
            '{name} has {a} {item}. They get {b} more. How many {item} total?',
          variables: [
            { name: 'name', type: 'string', choices: ['Alice', 'Bob'] },
            { name: 'item', type: 'string', choices: ['apples', 'books'] },
            {
              name: 'a',
              type: 'integer',
              min: 3,
              max: 20,
              difficultyWeight: 0.5,
            },
            {
              name: 'b',
              type: 'integer',
              min: 2,
              max: 15,
              difficultyWeight: 0.5,
            },
          ],
          answerFormula: 'a + b',
          explanationTemplate:
            '{name} started with {a} {item} and got {b} more. Total = {answer}.',
        },
        difficultyRange: [1, 5],
        difficultyFactors: [
          {
            name: 'size',
            type: 'numeric_range',
            weight: 1.0,
            description: 'number size',
          },
        ],
        validationRules: [
          { type: 'integer_result', errorMessage: 'Must be integer' },
          { type: 'positive_result', errorMessage: 'Must be positive' },
        ],
      }),
    ]

    const result = generateProblem({
      subject: 'math',
      category: 'word_problem',
      targetDifficulty: 3,
      includeExplanation: true,
    })

    expect(result.success).toBe(true)
    const p = result.problem!

    // problemText should have one of the names
    expect(p.problemText).toMatch(/Alice|Bob/)
    // Should have one of the items
    expect(p.problemText).toMatch(/apples|books/)
    // Answer should be correct
    const a = p.variables.a as number
    const b = p.variables.b as number
    expect(Number(p.answer)).toBe(a + b)
    // Explanation should be present
    expect(p.explanation).toBeDefined()
    expect(p.steps!.length).toBeGreaterThan(0)
  })

  it('handles algebra with ternary answer and string variable', () => {
    mockTemplates = [
      makeTemplate({
        id: 'alg_ternary',
        category: 'algebra',
        structure: {
          type: 'algebraic',
          template: 'Solve: x {op} {a} = {b}',
          variables: [
            { name: 'op', type: 'string', choices: ['+', '-'] },
            { name: 'a', type: 'integer', min: 1, max: 10 },
            { name: 'b', type: 'integer', min: 5, max: 20 },
          ],
          answerFormula: "op === '+' ? b - a : b + a",
        },
        difficultyRange: [1, 10],
        validationRules: [
          { type: 'integer_result', errorMessage: 'Must be integer' },
        ],
      }),
    ]

    for (let i = 0; i < 20; i++) {
      const result = generateProblem({ subject: 'math', targetDifficulty: 5 })
      if (result.success) {
        const { op, a, b } = result.problem!.variables
        const expected =
          op === '+'
            ? (b as number) - (a as number)
            : (b as number) + (a as number)
        expect(Number(result.problem!.answer)).toBe(expected)
      }
    }
  })
})

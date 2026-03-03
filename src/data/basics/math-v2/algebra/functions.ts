/**
 * Functions - MathProblemV2 Format
 * 
 * Topics covered:
 * - Function notation (G8)
 * - Evaluating functions (G8)
 * - Composition of functions (G9)
 * - Domain and range (G9)
 * - Inverse functions (G10)
 * - Absolute value equations (G9)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const FUNCTIONS_V2: MathProblemV2[] = [
  // ============================================================================
  // FUNCTION NOTATION & EVALUATION (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-func-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'If f(x) = 3x - 5, find f(2).',
      latex: 'f(x) = 3x - 5, \\quad f(2) = ?'
    },
    answer: {
      type: 'numeric',
      correct: '1',
      acceptable: ['1', 'f(2) = 1']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3*x - 5', color: '#3B82F6', label: 'f(x) = 3x - 5' }
        ],
        domain: [-2, 5],
        range: [-10, 10],
        showGrid: true,
        points: [
          { x: 2, y: 1, label: 'f(2) = 1', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = 2 into the function', latex: 'f(2) = 3(2) - 5' },
        { number: 2, description: 'Multiply', latex: 'f(2) = 6 - 5' },
        { number: 3, description: 'Subtract', latex: 'f(2) = 1' }
      ],
      method: 'Direct substitution'
    },
    hints: [
      { level: 'gentle', text: 'Replace x with 2 in the expression.' },
      { level: 'moderate', text: 'f(2) = 3(2) - 5 = 6 - 5' },
      { level: 'explicit', text: 'f(2) = 1' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Function notation',
      skills: ['algebra_basics'],
      prerequisites: ['algebraic-expressions'],
      concepts: ['function-notation', 'substitution', 'evaluation'],
      commonMistakes: ['Substitution error', 'Order of operations error'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['function', 'evaluation', 'notation']
    }
  },
  {
    id: 'alg-v2-g8-func-002',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'If g(x) = x² + 1, find g(-3).',
      latex: 'g(x) = x^2 + 1, \\quad g(-3) = ?'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', 'g(-3) = 10']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 + 1', color: '#3B82F6', label: 'g(x) = x² + 1' }
        ],
        domain: [-5, 5],
        range: [0, 15],
        showGrid: true,
        points: [
          { x: -3, y: 10, label: 'g(-3) = 10', color: '#10B981', size: 8 },
          { x: 0, y: 1, label: 'vertex (0, 1)', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = -3 into the function', latex: 'g(-3) = (-3)^2 + 1' },
        { number: 2, description: 'Square -3 (remember: negative squared is positive)', latex: 'g(-3) = 9 + 1' },
        { number: 3, description: 'Add', latex: 'g(-3) = 10' }
      ],
      method: 'Direct substitution'
    },
    hints: [
      { level: 'gentle', text: 'Replace x with -3. Remember that (-3)² = 9, not -9.' },
      { level: 'moderate', text: 'g(-3) = (-3)² + 1 = 9 + 1' },
      { level: 'explicit', text: 'g(-3) = 10' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Function notation',
      skills: ['algebra_basics'],
      prerequisites: ['algebraic-expressions', 'exponents'],
      concepts: ['function-notation', 'substitution', 'squared-negatives'],
      commonMistakes: ['Squaring negative incorrectly', 'Order of operations'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['function', 'evaluation', 'quadratic']
    }
  },
  {
    id: 'alg-v2-g10-func-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'If f(x) = 2x + 3, find f(4).',
      latex: 'f(x) = 2x + 3, \\quad f(4) = ?'
    },
    answer: {
      type: 'numeric',
      correct: '11',
      acceptable: ['11', 'f(4) = 11']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2*x + 3', color: '#3B82F6', label: 'f(x) = 2x + 3' }
        ],
        domain: [-2, 6],
        range: [-1, 15],
        showGrid: true,
        points: [
          { x: 4, y: 11, label: 'f(4) = 11', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = 4', latex: 'f(4) = 2(4) + 3' },
        { number: 2, description: 'Multiply', latex: 'f(4) = 8 + 3' },
        { number: 3, description: 'Add', latex: 'f(4) = 11' }
      ],
      method: 'Direct substitution'
    },
    hints: [
      { level: 'gentle', text: 'Replace x with 4.' },
      { level: 'moderate', text: 'f(4) = 2(4) + 3 = 8 + 3' },
      { level: 'explicit', text: 'f(4) = 11' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Function notation',
      skills: ['algebra_basics'],
      prerequisites: ['algebraic-expressions'],
      concepts: ['function-notation', 'substitution'],
      commonMistakes: ['Arithmetic error'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['function', 'evaluation']
    }
  },

  // ============================================================================
  // COMPOSITION OF FUNCTIONS (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-func-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'If f(x) = 2x + 1, find f(f(2)).',
      latex: 'f(x) = 2x + 1, \\quad f(f(2)) = ?'
    },
    answer: {
      type: 'numeric',
      correct: '11',
      acceptable: ['11', 'f(f(2)) = 11']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2*x + 1', color: '#3B82F6', label: 'f(x) = 2x + 1' }
        ],
        domain: [-1, 7],
        range: [0, 15],
        showGrid: true,
        points: [
          { x: 2, y: 5, label: 'f(2) = 5', color: '#8B5CF6' },
          { x: 5, y: 11, label: 'f(5) = 11', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'First find f(2)', latex: 'f(2) = 2(2) + 1 = 5' },
        { number: 2, description: 'Now find f(f(2)) = f(5)', latex: 'f(5) = 2(5) + 1 = 11' }
      ],
      method: 'Composition - work inside out'
    },
    hints: [
      { level: 'gentle', text: 'First find f(2), then use that result as the input.' },
      { level: 'moderate', text: 'f(2) = 5. Now find f(5).' },
      { level: 'explicit', text: 'f(5) = 2(5) + 1 = 11' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Composition of functions',
      skills: ['advanced_algebra'],
      prerequisites: ['function-notation'],
      concepts: ['function-composition', 'nested-functions'],
      commonMistakes: ['Wrong order of evaluation', 'Arithmetic error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['function', 'composition']
    }
  },
  {
    id: 'alg-v2-g9-func-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Is y = x² a function? (yes/no)',
      latex: 'y = x^2'
    },
    answer: {
      type: 'exact',
      correct: 'yes',
      acceptable: ['yes', 'Yes', 'YES']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2', color: '#3B82F6', label: 'y = x²' }
        ],
        domain: [-4, 4],
        range: [-1, 10],
        showGrid: true,
        points: [
          { x: 0, y: 0, label: 'vertex', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the vertical line test', latex: '\\text{For each } x, \\text{ there is exactly one } y' },
        { number: 2, description: 'Conclusion', latex: '\\text{Yes, } y = x^2 \\text{ is a function}' }
      ],
      method: 'Vertical line test'
    },
    hints: [
      { level: 'gentle', text: 'A function gives exactly one output for each input.' },
      { level: 'moderate', text: 'For each x-value, is there only one y-value?' },
      { level: 'explicit', text: 'Yes, each x gives exactly one y = x²' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Definition of function',
      skills: ['algebra_basics'],
      prerequisites: ['coordinate-plane'],
      concepts: ['function-definition', 'vertical-line-test'],
      commonMistakes: ['Confusing with relation'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['function', 'definition']
    }
  },

  // ============================================================================
  // DOMAIN AND RANGE (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-domain-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'What is the domain of f(x) = 1/x?',
      latex: 'f(x) = \\frac{1}{x}'
    },
    answer: {
      type: 'expression',
      correct: 'all real numbers except 0',
      acceptable: ['x ≠ 0', 'all reals except 0', 'x is not 0', 'ℝ \\ {0}', '(-∞, 0) ∪ (0, ∞)']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '1/x', color: '#3B82F6', label: 'f(x) = 1/x' }
        ],
        domain: [-5, 5],
        range: [-5, 5],
        showGrid: true,
        asymptotes: { x: [0], y: [0] }
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify values that make the denominator zero', latex: 'x = 0 \\text{ makes } \\frac{1}{x} \\text{ undefined}' },
        { number: 2, description: 'State the domain', latex: '\\text{Domain: } x \\neq 0' }
      ],
      method: 'Find restrictions'
    },
    hints: [
      { level: 'gentle', text: 'What value of x makes the denominator zero?' },
      { level: 'moderate', text: 'Division by zero is undefined.' },
      { level: 'explicit', text: 'x ≠ 0, so domain is all real numbers except 0' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Domain',
      skills: ['algebra_basics'],
      prerequisites: ['function-notation', 'rational-expressions'],
      concepts: ['domain', 'restrictions', 'undefined-values'],
      commonMistakes: ['Forgetting the restriction', 'Including 0'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['function', 'domain', 'rational']
    }
  },
  {
    id: 'alg-v2-g9-domain-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'What is the domain of f(x) = √(x - 4)?',
      latex: 'f(x) = \\sqrt{x - 4}'
    },
    answer: {
      type: 'interval',
      correct: 'x ≥ 4',
      acceptable: ['x >= 4', '[4, ∞)', 'x ≥ 4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'sqrt(x - 4)', color: '#3B82F6', label: 'f(x) = √(x - 4)' }
        ],
        domain: [4, 15],
        range: [0, 5],
        showGrid: true,
        points: [
          { x: 4, y: 0, label: 'Starting point (4, 0)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Set the radicand ≥ 0', latex: 'x - 4 \\geq 0' },
        { number: 2, description: 'Solve for x', latex: 'x \\geq 4' }
      ],
      method: 'Radicand must be non-negative'
    },
    hints: [
      { level: 'gentle', text: 'What must be true about the expression under a square root?' },
      { level: 'moderate', text: 'x - 4 must be ≥ 0' },
      { level: 'explicit', text: 'x ≥ 4' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Domain',
      skills: ['algebra_basics'],
      prerequisites: ['radicals', 'inequalities'],
      concepts: ['domain', 'radical-restrictions'],
      commonMistakes: ['Using > instead of ≥', 'Wrong inequality direction'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['function', 'domain', 'radical']
    }
  },

  // ============================================================================
  // INVERSE FUNCTIONS (Grade 10)
  // ============================================================================
  {
    id: 'alg-v2-g10-inverse-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the inverse of f(x) = 2x + 6.',
      latex: 'f(x) = 2x + 6'
    },
    answer: {
      type: 'expression',
      correct: 'f⁻¹(x) = (x - 6)/2',
      acceptable: ['(x-6)/2', 'x/2 - 3', 'f^-1(x) = (x-6)/2', '(x - 6)/2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2*x + 6', color: '#3B82F6', label: 'f(x) = 2x + 6' },
          { expression: '(x - 6)/2', color: '#EF4444', label: 'f⁻¹(x) = (x-6)/2' },
          { expression: 'x', color: '#9CA3AF', style: 'dashed', label: 'y = x' }
        ],
        domain: [-5, 10],
        range: [-5, 10],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write y = f(x)', latex: 'y = 2x + 6' },
        { number: 2, description: 'Swap x and y', latex: 'x = 2y + 6' },
        { number: 3, description: 'Solve for y: subtract 6', latex: 'x - 6 = 2y' },
        { number: 4, description: 'Divide by 2', latex: 'y = \\frac{x - 6}{2}' },
        { number: 5, description: 'Write the inverse function', latex: 'f^{-1}(x) = \\frac{x - 6}{2}' }
      ],
      method: 'Swap and solve'
    },
    hints: [
      { level: 'gentle', text: 'Write y = 2x + 6, then swap x and y.' },
      { level: 'moderate', text: 'After swapping: x = 2y + 6. Now solve for y.' },
      { level: 'explicit', text: 'x - 6 = 2y, so y = (x-6)/2' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Inverse functions',
      skills: ['advanced_algebra'],
      prerequisites: ['function-notation', 'linear-equations'],
      concepts: ['inverse-function', 'swap-and-solve'],
      commonMistakes: ['Wrong order of operations', 'Forgetting to swap'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['function', 'inverse']
    }
  },

  // ============================================================================
  // ABSOLUTE VALUE (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-abs-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve: |x| = 5',
      latex: '|x| = 5'
    },
    answer: {
      type: 'set',
      correct: 'x = 5 or x = -5',
      acceptable: ['x = ±5', '5, -5', '-5, 5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'abs(x)', color: '#3B82F6', label: 'y = |x|' },
          { expression: '5', color: '#EF4444', label: 'y = 5' }
        ],
        domain: [-8, 8],
        range: [0, 8],
        showGrid: true,
        points: [
          { x: -5, y: 5, label: 'x = -5', color: '#10B981' },
          { x: 5, y: 5, label: 'x = 5', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Absolute value equals 5 means distance from 0 is 5', latex: '|x| = 5' },
        { number: 2, description: 'Two numbers are 5 units from 0', latex: 'x = 5 \\quad \\text{or} \\quad x = -5' }
      ],
      method: 'Definition of absolute value'
    },
    hints: [
      { level: 'gentle', text: 'What two numbers are 5 units away from 0?' },
      { level: 'moderate', text: 'Both positive and negative 5 have absolute value 5.' },
      { level: 'explicit', text: 'x = 5 or x = -5' }
    ],
    pedagogy: {
      topic: 'Absolute Value',
      subTopic: 'Solving absolute value equations',
      skills: ['algebra_basics'],
      prerequisites: ['number-line', 'negative-numbers'],
      concepts: ['absolute-value', 'distance-from-zero'],
      commonMistakes: ['Forgetting the negative solution'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['absolute-value', 'solving']
    }
  },
  {
    id: 'alg-v2-g9-abs-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve: |x - 3| = 7',
      latex: '|x - 3| = 7'
    },
    answer: {
      type: 'set',
      correct: 'x = 10 or x = -4',
      acceptable: ['10, -4', '-4, 10', 'x = 10, x = -4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'abs(x - 3)', color: '#3B82F6', label: 'y = |x - 3|' },
          { expression: '7', color: '#EF4444', label: 'y = 7' }
        ],
        domain: [-6, 12],
        range: [0, 10],
        showGrid: true,
        points: [
          { x: -4, y: 7, label: 'x = -4', color: '#10B981' },
          { x: 10, y: 7, label: 'x = 10', color: '#10B981' },
          { x: 3, y: 0, label: 'vertex', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up two equations', latex: 'x - 3 = 7 \\quad \\text{or} \\quad x - 3 = -7' },
        { number: 2, description: 'Solve the first equation', latex: 'x = 10' },
        { number: 3, description: 'Solve the second equation', latex: 'x = -4' }
      ],
      method: 'Two cases'
    },
    hints: [
      { level: 'gentle', text: 'The expression inside can be 7 or -7.' },
      { level: 'moderate', text: 'x - 3 = 7 or x - 3 = -7' },
      { level: 'explicit', text: 'x = 10 or x = -4' }
    ],
    pedagogy: {
      topic: 'Absolute Value',
      subTopic: 'Solving absolute value equations',
      skills: ['algebra_basics'],
      prerequisites: ['absolute-value-basics', 'linear-equations'],
      concepts: ['absolute-value', 'two-cases'],
      commonMistakes: ['Only finding one solution', 'Sign error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['absolute-value', 'solving']
    }
  },

  // ============================================================================
  // DIRECT VARIATION (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-direct-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'If y varies directly with x, and y = 12 when x = 4, find y when x = 7.',
      latex: 'y = kx, \\quad y = 12 \\text{ when } x = 4'
    },
    answer: {
      type: 'numeric',
      correct: '21',
      acceptable: ['21', 'y = 21']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3*x', color: '#3B82F6', label: 'y = 3x' }
        ],
        domain: [0, 10],
        range: [0, 30],
        showGrid: true,
        points: [
          { x: 4, y: 12, label: '(4, 12)', color: '#8B5CF6' },
          { x: 7, y: 21, label: '(7, 21)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the constant of variation k', latex: 'k = \\frac{y}{x} = \\frac{12}{4} = 3' },
        { number: 2, description: 'Write the equation', latex: 'y = 3x' },
        { number: 3, description: 'Substitute x = 7', latex: 'y = 3(7) = 21' }
      ],
      method: 'Find k, then substitute'
    },
    hints: [
      { level: 'gentle', text: 'First find k using y = kx with the given values.' },
      { level: 'moderate', text: 'k = 12/4 = 3, so y = 3x' },
      { level: 'explicit', text: 'y = 3(7) = 21' }
    ],
    pedagogy: {
      topic: 'Variation',
      subTopic: 'Direct variation',
      skills: ['algebra_basics'],
      prerequisites: ['linear-equations', 'proportions'],
      concepts: ['direct-variation', 'constant-of-variation'],
      commonMistakes: ['Calculating k incorrectly', 'Wrong substitution'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['variation', 'direct', 'proportion']
    }
  }
]

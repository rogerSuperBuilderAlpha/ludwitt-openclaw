/**
 * Quadratic Equations - MathProblemV2 Format
 * 
 * Topics covered:
 * - Factoring trinomials (G9)
 * - Difference of squares (G9)
 * - Perfect square trinomials (G9)
 * - Solving by factoring (G9)
 * - Solving by square roots (G9)
 * - Quadratic formula (G9-10)
 * - Completing the square (G10)
 * - Vertex form (G10)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const QUADRATIC_EQUATIONS_V2: MathProblemV2[] = [
  // ============================================================================
  // FACTORING TRINOMIALS (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-factor-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Factor: x² + 7x + 12',
      latex: 'x^2 + 7x + 12'
    },
    answer: {
      type: 'expression',
      correct: '(x + 3)(x + 4)',
      acceptable: ['(x+3)(x+4)', '(x + 4)(x + 3)', '(x+4)(x+3)']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 + 7*x + 12', color: '#3B82F6', label: 'y = x² + 7x + 12' }
        ],
        domain: [-6, 0],
        range: [-2, 15],
        showGrid: true,
        points: [
          { x: -3, y: 0, label: 'x = -3', color: '#10B981' },
          { x: -4, y: 0, label: 'x = -4', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find two numbers that multiply to 12 and add to 7', latex: '? \\times ? = 12, \\quad ? + ? = 7' },
        { number: 2, description: 'The numbers are 3 and 4', latex: '3 \\times 4 = 12, \\quad 3 + 4 = 7' },
        { number: 3, description: 'Write the factored form', latex: 'x^2 + 7x + 12 = (x + 3)(x + 4)' }
      ],
      method: 'Factor by grouping'
    },
    hints: [
      { level: 'gentle', text: 'Find two numbers that multiply to 12 and add to 7.' },
      { level: 'moderate', text: 'The numbers are 3 and 4.' },
      { level: 'explicit', text: '(x + 3)(x + 4)' }
    ],
    pedagogy: {
      topic: 'Quadratics',
      subTopic: 'Factoring trinomials',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'multiplication'],
      concepts: ['factoring', 'trinomials', 'product-sum'],
      commonMistakes: ['Wrong signs', 'Wrong factor pair'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'factoring', 'trinomial']
    }
  },
  {
    id: 'alg-v2-g9-factor-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Factor: x² − 5x + 6',
      latex: 'x^2 - 5x + 6'
    },
    answer: {
      type: 'expression',
      correct: '(x - 2)(x - 3)',
      acceptable: ['(x-2)(x-3)', '(x − 3)(x − 2)', '(x-3)(x-2)']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 - 5*x + 6', color: '#3B82F6', label: 'y = x² - 5x + 6' }
        ],
        domain: [0, 5],
        range: [-1, 8],
        showGrid: true,
        points: [
          { x: 2, y: 0, label: 'x = 2', color: '#10B981' },
          { x: 3, y: 0, label: 'x = 3', color: '#10B981' },
          { x: 2.5, y: -0.25, label: 'vertex', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find two numbers that multiply to 6 and add to -5', latex: '? \\times ? = 6, \\quad ? + ? = -5' },
        { number: 2, description: 'The numbers are -2 and -3', latex: '(-2) \\times (-3) = 6, \\quad (-2) + (-3) = -5' },
        { number: 3, description: 'Write the factored form', latex: 'x^2 - 5x + 6 = (x - 2)(x - 3)' }
      ],
      method: 'Factor by grouping'
    },
    hints: [
      { level: 'gentle', text: 'Find two numbers that multiply to +6 and add to -5.' },
      { level: 'moderate', text: 'Both numbers must be negative. Try -2 and -3.' },
      { level: 'explicit', text: '(x - 2)(x - 3)' }
    ],
    pedagogy: {
      topic: 'Quadratics',
      subTopic: 'Factoring trinomials',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics'],
      concepts: ['factoring', 'trinomials', 'negative-factors'],
      commonMistakes: ['Sign errors', 'Wrong factor pair'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'factoring', 'trinomial']
    }
  },

  // ============================================================================
  // DIFFERENCE OF SQUARES (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-factor-003',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Factor: x² - 9',
      latex: 'x^2 - 9'
    },
    answer: {
      type: 'expression',
      correct: '(x - 3)(x + 3)',
      acceptable: ['(x-3)(x+3)', '(x + 3)(x - 3)', '(x+3)(x-3)']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 - 9', color: '#3B82F6', label: 'y = x² - 9' }
        ],
        domain: [-5, 5],
        range: [-12, 20],
        showGrid: true,
        points: [
          { x: -3, y: 0, label: 'x = -3', color: '#10B981' },
          { x: 3, y: 0, label: 'x = 3', color: '#10B981' },
          { x: 0, y: -9, label: 'vertex (0, -9)', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recognize as difference of squares: a² - b²', latex: 'x^2 - 9 = x^2 - 3^2' },
        { number: 2, description: 'Apply the formula: a² - b² = (a-b)(a+b)', latex: '= (x - 3)(x + 3)' }
      ],
      method: 'Difference of squares formula'
    },
    hints: [
      { level: 'gentle', text: 'This is a difference of squares: a² - b² = (a-b)(a+b)' },
      { level: 'moderate', text: 'x² - 9 = x² - 3²' },
      { level: 'explicit', text: '(x - 3)(x + 3)' }
    ],
    pedagogy: {
      topic: 'Quadratics',
      subTopic: 'Difference of squares',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'exponents'],
      concepts: ['difference-of-squares', 'special-products'],
      commonMistakes: ['Not recognizing the pattern', 'Sign errors'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'factoring', 'difference-of-squares']
    }
  },

  // ============================================================================
  // PERFECT SQUARE TRINOMIALS (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-factor-004',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Factor: x² - 8x + 16',
      latex: 'x^2 - 8x + 16'
    },
    answer: {
      type: 'expression',
      correct: '(x - 4)²',
      acceptable: ['(x-4)^2', '(x - 4)(x - 4)', '(x-4)(x-4)']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 - 8*x + 16', color: '#3B82F6', label: 'y = (x - 4)²' }
        ],
        domain: [0, 8],
        range: [-1, 20],
        showGrid: true,
        points: [
          { x: 4, y: 0, label: 'vertex/root (4, 0)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Check if this is a perfect square trinomial', latex: 'x^2 - 8x + 16' },
        { number: 2, description: 'Find the square root of 16', latex: '\\sqrt{16} = 4' },
        { number: 3, description: 'Check: 2 × 4 = 8 ✓ (matches middle coefficient)', latex: '2 \\times 4 = 8' },
        { number: 4, description: 'Write as a perfect square', latex: '(x - 4)^2' }
      ],
      method: 'Perfect square trinomial'
    },
    hints: [
      { level: 'gentle', text: 'This is a perfect square trinomial. Check: is 16 a perfect square?' },
      { level: 'moderate', text: '√16 = 4, and 2 × 4 = 8 (the middle coefficient)' },
      { level: 'explicit', text: '(x - 4)²' }
    ],
    pedagogy: {
      topic: 'Quadratics',
      subTopic: 'Perfect square trinomials',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'exponents'],
      concepts: ['perfect-square', 'special-products'],
      commonMistakes: ['Not recognizing pattern', 'Sign error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'factoring', 'perfect-square']
    }
  },

  // ============================================================================
  // SOLVING BY FACTORING (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-solve-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve: x² - 16 = 0',
      latex: 'x^2 - 16 = 0'
    },
    answer: {
      type: 'set',
      correct: 'x = 4 or x = -4',
      acceptable: ['x = ±4', '4, -4', '-4, 4', 'x = 4, x = -4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 - 16', color: '#3B82F6', label: 'y = x² - 16' }
        ],
        domain: [-6, 6],
        range: [-20, 25],
        showGrid: true,
        points: [
          { x: -4, y: 0, label: 'x = -4', color: '#10B981' },
          { x: 4, y: 0, label: 'x = 4', color: '#10B981' },
          { x: 0, y: -16, label: 'vertex', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 16 to both sides', latex: 'x^2 = 16' },
        { number: 2, description: 'Take the square root of both sides', latex: 'x = \\pm\\sqrt{16}' },
        { number: 3, description: 'Simplify', latex: 'x = \\pm 4' }
      ],
      alternativeMethods: ['Factor as (x-4)(x+4) = 0, then use zero product property'],
      method: 'Square root method'
    },
    hints: [
      { level: 'gentle', text: 'Add 16 to both sides to isolate x².' },
      { level: 'moderate', text: 'x² = 16, now take the square root.' },
      { level: 'explicit', text: 'x = ±√16 = ±4' }
    ],
    pedagogy: {
      topic: 'Quadratics',
      subTopic: 'Solving by square roots',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'square-roots'],
      concepts: ['square-root-method', 'plus-minus'],
      commonMistakes: ['Forgetting the negative root', 'Square root error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'solving', 'square-roots']
    }
  },
  {
    id: 'alg-v2-g9-solve-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve by factoring: x² + 2x - 15 = 0',
      latex: 'x^2 + 2x - 15 = 0'
    },
    answer: {
      type: 'set',
      correct: 'x = 3 or x = -5',
      acceptable: ['3, -5', '-5, 3', 'x = 3, x = -5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 + 2*x - 15', color: '#3B82F6', label: 'y = x² + 2x - 15' }
        ],
        domain: [-7, 5],
        range: [-18, 10],
        showGrid: true,
        points: [
          { x: -5, y: 0, label: 'x = -5', color: '#10B981' },
          { x: 3, y: 0, label: 'x = 3', color: '#10B981' },
          { x: -1, y: -16, label: 'vertex', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor the trinomial', latex: 'x^2 + 2x - 15 = (x + 5)(x - 3)' },
        { number: 2, description: 'Set each factor equal to zero', latex: 'x + 5 = 0 \\quad \\text{or} \\quad x - 3 = 0' },
        { number: 3, description: 'Solve each equation', latex: 'x = -5 \\quad \\text{or} \\quad x = 3' }
      ],
      method: 'Zero product property'
    },
    hints: [
      { level: 'gentle', text: 'Factor the left side first. Find numbers that multiply to -15 and add to 2.' },
      { level: 'moderate', text: '(x + 5)(x - 3) = 0' },
      { level: 'explicit', text: 'x = -5 or x = 3' }
    ],
    pedagogy: {
      topic: 'Quadratics',
      subTopic: 'Solving by factoring',
      skills: ['advanced_algebra'],
      prerequisites: ['factoring', 'algebra_basics'],
      concepts: ['zero-product-property', 'factoring'],
      commonMistakes: ['Factoring error', 'Sign error when solving'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'solving', 'factoring']
    }
  },
  {
    id: 'alg-v2-g9-solve-003',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve: x² − 4x − 5 = 0',
      latex: 'x^2 - 4x - 5 = 0'
    },
    answer: {
      type: 'set',
      correct: 'x = 5 or x = -1',
      acceptable: ['x = -1 or x = 5', '5, -1', '-1, 5', 'x = 5, x = -1']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 - 4*x - 5', color: '#3B82F6', label: 'y = x² - 4x - 5' }
        ],
        domain: [-3, 7],
        range: [-10, 15],
        showGrid: true,
        points: [
          { x: -1, y: 0, label: 'x = -1', color: '#10B981' },
          { x: 5, y: 0, label: 'x = 5', color: '#10B981' },
          { x: 2, y: -9, label: 'vertex (2, -9)', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor the quadratic', latex: 'x^2 - 4x - 5 = (x - 5)(x + 1)' },
        { number: 2, description: 'Apply zero product property', latex: 'x - 5 = 0 \\quad \\text{or} \\quad x + 1 = 0' },
        { number: 3, description: 'Solve each equation', latex: 'x = 5 \\quad \\text{or} \\quad x = -1' }
      ],
      method: 'Factoring and zero product property'
    },
    hints: [
      { level: 'gentle', text: 'Find two numbers that multiply to -5 and add to -4.' },
      { level: 'moderate', text: 'The numbers are -5 and +1: (x - 5)(x + 1) = 0' },
      { level: 'explicit', text: 'x = 5 or x = -1' }
    ],
    pedagogy: {
      topic: 'Quadratic Equations',
      subTopic: 'Solving by factoring',
      skills: ['advanced_algebra'],
      prerequisites: ['factoring', 'algebra_basics'],
      concepts: ['zero-product-property', 'factoring'],
      commonMistakes: ['Sign error in factoring', 'Wrong roots'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'solving', 'factoring']
    }
  },

  // ============================================================================
  // QUADRATIC FORMULA (Grade 9-10)
  // ============================================================================
  {
    id: 'alg-v2-g9-formula-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Use the quadratic formula to solve: 2x² + 5x − 3 = 0',
      latex: '2x^2 + 5x - 3 = 0'
    },
    answer: {
      type: 'set',
      correct: 'x = 1/2 or x = -3',
      acceptable: ['x = 0.5 or x = -3', '1/2, -3', '-3, 1/2', 'x = 0.5, x = -3', '0.5, -3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2*x^2 + 5*x - 3', color: '#3B82F6', label: 'y = 2x² + 5x - 3' }
        ],
        domain: [-4, 2],
        range: [-10, 10],
        showGrid: true,
        points: [
          { x: -3, y: 0, label: 'x = -3', color: '#10B981' },
          { x: 0.5, y: 0, label: 'x = 1/2', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify a, b, c', latex: 'a = 2, \\quad b = 5, \\quad c = -3' },
        { number: 2, description: 'Apply the quadratic formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
        { number: 3, description: 'Substitute values', latex: 'x = \\frac{-5 \\pm \\sqrt{25 + 24}}{4}' },
        { number: 4, description: 'Simplify under the radical', latex: 'x = \\frac{-5 \\pm \\sqrt{49}}{4} = \\frac{-5 \\pm 7}{4}' },
        { number: 5, description: 'Find both solutions', latex: 'x = \\frac{2}{4} = \\frac{1}{2} \\quad \\text{or} \\quad x = \\frac{-12}{4} = -3' }
      ],
      method: 'Quadratic formula'
    },
    hints: [
      { level: 'gentle', text: 'Use the quadratic formula: x = (-b ± √(b²-4ac))/(2a)' },
      { level: 'moderate', text: 'a=2, b=5, c=-3. Discriminant = 25 + 24 = 49' },
      { level: 'explicit', text: 'x = (-5 ± 7)/4, so x = 1/2 or x = -3' }
    ],
    pedagogy: {
      topic: 'Quadratic Equations',
      subTopic: 'Quadratic formula',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'square-roots'],
      concepts: ['quadratic-formula', 'discriminant'],
      commonMistakes: ['Sign error in -b', 'Arithmetic error under radical', 'Forgetting ±'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'quadratic-formula', 'solving']
    }
  },

  // ============================================================================
  // COMPLETING THE SQUARE (Grade 10)
  // ============================================================================
  {
    id: 'alg-v2-g10-complete-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve by completing the square: x² + 4x = 5',
      latex: 'x^2 + 4x = 5'
    },
    answer: {
      type: 'set',
      correct: 'x = 1 or x = -5',
      acceptable: ['1, -5', '-5, 1', 'x = 1, x = -5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 + 4*x - 5', color: '#3B82F6', label: 'y = x² + 4x - 5' }
        ],
        domain: [-7, 3],
        range: [-10, 15],
        showGrid: true,
        points: [
          { x: -5, y: 0, label: 'x = -5', color: '#10B981' },
          { x: 1, y: 0, label: 'x = 1', color: '#10B981' },
          { x: -2, y: -9, label: 'vertex (-2, -9)', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Take half of the x coefficient and square it', latex: '\\left(\\frac{4}{2}\\right)^2 = 4' },
        { number: 2, description: 'Add 4 to both sides', latex: 'x^2 + 4x + 4 = 5 + 4' },
        { number: 3, description: 'Write left side as perfect square', latex: '(x + 2)^2 = 9' },
        { number: 4, description: 'Take square root of both sides', latex: 'x + 2 = \\pm 3' },
        { number: 5, description: 'Solve for x', latex: 'x = -2 + 3 = 1 \\quad \\text{or} \\quad x = -2 - 3 = -5' }
      ],
      method: 'Completing the square'
    },
    hints: [
      { level: 'gentle', text: 'To complete the square, add (b/2)² to both sides.' },
      { level: 'moderate', text: '(4/2)² = 4. Add 4 to get (x + 2)² = 9' },
      { level: 'explicit', text: 'x + 2 = ±3, so x = 1 or x = -5' }
    ],
    pedagogy: {
      topic: 'Quadratics',
      subTopic: 'Completing the square',
      skills: ['advanced_algebra'],
      prerequisites: ['perfect-squares', 'algebra_basics'],
      concepts: ['completing-the-square', 'perfect-square-trinomial'],
      commonMistakes: ['Not adding to both sides', 'Incorrect half-coefficient calculation'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'completing-the-square', 'solving']
    }
  },

  // ============================================================================
  // VERTEX FORM (Grade 10)
  // ============================================================================
  {
    id: 'alg-v2-g10-vertex-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the vertex of y = x² - 6x + 5',
      latex: 'y = x^2 - 6x + 5'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, -4)',
      acceptable: ['(3,-4)', 'x = 3, y = -4', '3, -4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 - 6*x + 5', color: '#3B82F6', label: 'y = x² - 6x + 5' }
        ],
        domain: [-1, 7],
        range: [-6, 12],
        showGrid: true,
        points: [
          { x: 3, y: -4, label: 'Vertex (3, -4)', color: '#10B981', size: 8 },
          { x: 1, y: 0, label: 'x = 1', color: '#8B5CF6' },
          { x: 5, y: 0, label: 'x = 5', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the vertex formula for x-coordinate', latex: 'x = \\frac{-b}{2a} = \\frac{-(-6)}{2(1)} = \\frac{6}{2} = 3' },
        { number: 2, description: 'Substitute x = 3 to find y', latex: 'y = (3)^2 - 6(3) + 5' },
        { number: 3, description: 'Calculate', latex: 'y = 9 - 18 + 5 = -4' },
        { number: 4, description: 'Write the vertex', latex: '\\text{Vertex: } (3, -4)' }
      ],
      method: 'Vertex formula'
    },
    hints: [
      { level: 'gentle', text: 'The x-coordinate of the vertex is -b/(2a).' },
      { level: 'moderate', text: 'x = -(-6)/(2·1) = 3. Now find y by substituting.' },
      { level: 'explicit', text: 'y = 9 - 18 + 5 = -4. Vertex is (3, -4)' }
    ],
    pedagogy: {
      topic: 'Quadratics',
      subTopic: 'Vertex form',
      skills: ['advanced_algebra'],
      prerequisites: ['quadratics-basics', 'algebra_basics'],
      concepts: ['vertex', 'axis-of-symmetry', 'vertex-formula'],
      commonMistakes: ['Sign error in -b', 'Substitution error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'vertex', 'parabola']
    }
  },

  // ============================================================================
  // ADDITIONAL QUADRATICS
  // ============================================================================
  {
    id: 'alg-v2-g9-factor-005',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Factor the quadratic expression: x² − 4x − 5',
      latex: 'x^2 - 4x - 5'
    },
    answer: {
      type: 'expression',
      correct: '(x - 5)(x + 1)',
      acceptable: ['(x-5)(x+1)', '(x + 1)(x - 5)', '(x+1)(x-5)']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 - 4*x - 5', color: '#3B82F6', label: 'y = x² - 4x - 5' }
        ],
        domain: [-3, 7],
        range: [-10, 15],
        showGrid: true,
        points: [
          { x: -1, y: 0, label: 'x = -1', color: '#10B981' },
          { x: 5, y: 0, label: 'x = 5', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find two numbers that multiply to -5 and add to -4', latex: '(-5) \\times (+1) = -5, \\quad (-5) + (+1) = -4' },
        { number: 2, description: 'Write the factored form', latex: 'x^2 - 4x - 5 = (x - 5)(x + 1)' }
      ],
      method: 'Factor by grouping'
    },
    hints: [
      { level: 'gentle', text: 'Find two numbers that multiply to -5 and add to -4.' },
      { level: 'moderate', text: 'The numbers are -5 and +1.' },
      { level: 'explicit', text: '(x - 5)(x + 1)' }
    ],
    pedagogy: {
      topic: 'Quadratic Expressions',
      subTopic: 'Factoring trinomials',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics'],
      concepts: ['factoring', 'product-sum'],
      commonMistakes: ['Sign errors', 'Wrong factor pair'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['quadratic', 'factoring']
    }
  },
  {
    id: 'alg-v2-g9-exponential-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve for x: 3^x = 27',
      latex: '3^x = 27'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', 'x = 3', 'x=3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3^x', color: '#3B82F6', label: 'y = 3^x' },
          { expression: '27', color: '#EF4444', label: 'y = 27' }
        ],
        domain: [-1, 5],
        range: [0, 35],
        showGrid: true,
        points: [{ x: 3, y: 27, label: 'Solution (3, 27)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Express 27 as a power of 3', latex: '27 = 3^3' },
        { number: 2, description: 'Rewrite the equation', latex: '3^x = 3^3' },
        { number: 3, description: 'When bases are equal, exponents are equal', latex: 'x = 3' }
      ],
      method: 'Same base method'
    },
    hints: [
      { level: 'gentle', text: 'Express 27 as a power of 3.' },
      { level: 'moderate', text: '27 = 3³' },
      { level: 'explicit', text: '3^x = 3³, so x = 3' }
    ],
    pedagogy: {
      topic: 'Exponential Functions',
      subTopic: 'Basic exponential equations',
      skills: ['advanced_algebra'],
      prerequisites: ['exponents', 'algebra_basics'],
      concepts: ['same-base-property', 'exponential-equations'],
      commonMistakes: ['Not recognizing the power', 'Confusing base and exponent'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponential', 'solving']
    }
  }
]

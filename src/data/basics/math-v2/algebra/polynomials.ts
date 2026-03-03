/**
 * Polynomials - MathProblemV2 Format
 * 
 * Topics covered:
 * - Adding polynomials (G9)
 * - FOIL method (G9)
 * - Multiplying binomials (G9)
 * - Polynomial division (G10)
 * - Remainder theorem (G11)
 * - Complex numbers (G11)
 * - Radical equations (G11)
 * - Sequences (G10-11)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const POLYNOMIALS_V2: MathProblemV2[] = [
  // ============================================================================
  // ADDING POLYNOMIALS (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-poly-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Add: (3x² + 2x - 5) + (x² - 4x + 3)',
      latex: '(3x^2 + 2x - 5) + (x^2 - 4x + 3)'
    },
    answer: {
      type: 'expression',
      correct: '4x² - 2x - 2',
      acceptable: ['4x^2 - 2x - 2', '4x² - 2x - 2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Combine like terms for x²', latex: '3x^2 + x^2 = 4x^2' },
        { number: 2, description: 'Combine like terms for x', latex: '2x + (-4x) = -2x' },
        { number: 3, description: 'Combine constants', latex: '-5 + 3 = -2' },
        { number: 4, description: 'Write the result', latex: '4x^2 - 2x - 2' }
      ],
      method: 'Combine like terms'
    },
    hints: [
      { level: 'gentle', text: 'Group and add the terms with the same power of x.' },
      { level: 'moderate', text: 'x² terms: 3 + 1 = 4. x terms: 2 + (-4) = -2.' },
      { level: 'explicit', text: '4x² - 2x - 2' }
    ],
    pedagogy: {
      topic: 'Polynomials',
      subTopic: 'Adding polynomials',
      skills: ['advanced_algebra'],
      prerequisites: ['combining-like-terms'],
      concepts: ['like-terms', 'polynomial-addition'],
      commonMistakes: ['Combining unlike terms', 'Sign errors'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['polynomial', 'adding']
    }
  },

  // ============================================================================
  // FOIL METHOD (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-poly-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Multiply: (x + 3)(x + 5)',
      latex: '(x + 3)(x + 5)'
    },
    answer: {
      type: 'expression',
      correct: 'x² + 8x + 15',
      acceptable: ['x^2 + 8x + 15', 'x² + 8x + 15']
    },
    visuals: {
      diagram: {
        type: 'grid',
        description: 'Area model showing (x+3)(x+5) = x² + 5x + 3x + 15',
        elements: [
          { type: 'rectangle', props: { width: 100, height: 60 }, label: 'x²' },
          { type: 'rectangle', props: { width: 50, height: 60 }, label: '5x' },
          { type: 'rectangle', props: { width: 100, height: 30 }, label: '3x' },
          { type: 'rectangle', props: { width: 50, height: 30 }, label: '15' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'First: Multiply first terms', latex: 'x \\cdot x = x^2' },
        { number: 2, description: 'Outer: Multiply outer terms', latex: 'x \\cdot 5 = 5x' },
        { number: 3, description: 'Inner: Multiply inner terms', latex: '3 \\cdot x = 3x' },
        { number: 4, description: 'Last: Multiply last terms', latex: '3 \\cdot 5 = 15' },
        { number: 5, description: 'Combine like terms', latex: 'x^2 + 5x + 3x + 15 = x^2 + 8x + 15' }
      ],
      method: 'FOIL'
    },
    hints: [
      { level: 'gentle', text: 'Use FOIL: First, Outer, Inner, Last.' },
      { level: 'moderate', text: 'x² + 5x + 3x + 15' },
      { level: 'explicit', text: 'x² + 8x + 15' }
    ],
    pedagogy: {
      topic: 'Polynomials',
      subTopic: 'FOIL method',
      skills: ['advanced_algebra'],
      prerequisites: ['distributive-property'],
      concepts: ['FOIL', 'binomial-multiplication'],
      commonMistakes: ['Missing a term', 'Sign error', 'Combining error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['polynomial', 'FOIL', 'multiply']
    }
  },
  {
    id: 'alg-v2-g9-poly-003',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Multiply: (2x - 1)(3x + 4)',
      latex: '(2x - 1)(3x + 4)'
    },
    answer: {
      type: 'expression',
      correct: '6x² + 5x - 4',
      acceptable: ['6x^2 + 5x - 4', '6x² + 5x - 4']
    },
    solution: {
      steps: [
        { number: 1, description: 'First', latex: '2x \\cdot 3x = 6x^2' },
        { number: 2, description: 'Outer', latex: '2x \\cdot 4 = 8x' },
        { number: 3, description: 'Inner', latex: '(-1) \\cdot 3x = -3x' },
        { number: 4, description: 'Last', latex: '(-1) \\cdot 4 = -4' },
        { number: 5, description: 'Combine', latex: '6x^2 + 8x - 3x - 4 = 6x^2 + 5x - 4' }
      ],
      method: 'FOIL'
    },
    hints: [
      { level: 'gentle', text: 'FOIL: 2x·3x + 2x·4 + (-1)·3x + (-1)·4' },
      { level: 'moderate', text: '6x² + 8x - 3x - 4' },
      { level: 'explicit', text: '6x² + 5x - 4' }
    ],
    pedagogy: {
      topic: 'Polynomials',
      subTopic: 'FOIL method',
      skills: ['advanced_algebra'],
      prerequisites: ['distributive-property'],
      concepts: ['FOIL', 'binomial-multiplication'],
      commonMistakes: ['Sign error with negative', 'Combining error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['polynomial', 'FOIL', 'multiply']
    }
  },

  // ============================================================================
  // POLYNOMIAL DIVISION (Grade 10)
  // ============================================================================
  {
    id: 'alg-v2-g10-poly-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Divide: (x² + 5x + 6) ÷ (x + 2)',
      latex: '\\frac{x^2 + 5x + 6}{x + 2}'
    },
    answer: {
      type: 'expression',
      correct: 'x + 3',
      acceptable: ['x+3', 'x + 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor the numerator', latex: 'x^2 + 5x + 6 = (x + 2)(x + 3)' },
        { number: 2, description: 'Cancel common factor', latex: '\\frac{(x + 2)(x + 3)}{x + 2} = x + 3' }
      ],
      alternativeMethods: ['Use polynomial long division'],
      method: 'Factor and cancel'
    },
    hints: [
      { level: 'gentle', text: 'Try factoring the numerator first.' },
      { level: 'moderate', text: 'x² + 5x + 6 = (x + 2)(x + 3)' },
      { level: 'explicit', text: 'Cancel (x + 2) to get x + 3' }
    ],
    pedagogy: {
      topic: 'Polynomials',
      subTopic: 'Polynomial division',
      skills: ['advanced_algebra'],
      prerequisites: ['factoring'],
      concepts: ['polynomial-division', 'factoring'],
      commonMistakes: ['Wrong factoring', 'Not canceling correctly'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['polynomial', 'division']
    }
  },

  // ============================================================================
  // REMAINDER THEOREM (Grade 11)
  // ============================================================================
  {
    id: 'alg-v2-g11-poly-001',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find the remainder when x³ − 2x² + 3x − 1 is divided by (x − 2).',
      latex: 'P(x) = x^3 - 2x^2 + 3x - 1, \\quad \\text{divided by } (x - 2)'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5']
    },
    solution: {
      steps: [
        { number: 1, description: 'By Remainder Theorem, remainder = P(2)', latex: 'P(2) = ?' },
        { number: 2, description: 'Substitute x = 2', latex: 'P(2) = 2^3 - 2(2^2) + 3(2) - 1' },
        { number: 3, description: 'Calculate', latex: 'P(2) = 8 - 8 + 6 - 1 = 5' }
      ],
      method: 'Remainder Theorem'
    },
    hints: [
      { level: 'gentle', text: 'The Remainder Theorem says: divide by (x - a), remainder is P(a).' },
      { level: 'moderate', text: 'Here a = 2. Calculate P(2).' },
      { level: 'explicit', text: 'P(2) = 8 - 8 + 6 - 1 = 5' }
    ],
    pedagogy: {
      topic: 'Polynomials',
      subTopic: 'Remainder Theorem',
      skills: ['advanced_algebra'],
      prerequisites: ['polynomial-evaluation'],
      concepts: ['remainder-theorem', 'polynomial-division'],
      commonMistakes: ['Wrong substitution', 'Calculation error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['polynomial', 'remainder-theorem']
    }
  },

  // ============================================================================
  // SEQUENCES (Grade 10-11)
  // ============================================================================
  {
    id: 'alg-v2-g11-seq-001',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find the 10th term of the arithmetic sequence: 3, 7, 11, 15, ...',
      latex: 'a_n = a_1 + (n-1)d'
    },
    answer: {
      type: 'numeric',
      correct: '39',
      acceptable: ['39']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the common difference d', latex: 'd = 7 - 3 = 4' },
        { number: 2, description: 'Use the formula for nth term', latex: 'a_n = a_1 + (n-1)d' },
        { number: 3, description: 'Substitute n=10, a₁=3, d=4', latex: 'a_{10} = 3 + (10-1)(4) = 3 + 36 = 39' }
      ],
      method: 'Arithmetic sequence formula'
    },
    hints: [
      { level: 'gentle', text: 'First find the common difference d.' },
      { level: 'moderate', text: 'd = 4. Use aₙ = a₁ + (n-1)d.' },
      { level: 'explicit', text: 'a₁₀ = 3 + 9(4) = 39' }
    ],
    pedagogy: {
      topic: 'Sequences',
      subTopic: 'Arithmetic sequences',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics'],
      concepts: ['arithmetic-sequence', 'common-difference'],
      commonMistakes: ['Wrong d', 'Off-by-one error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['sequence', 'arithmetic']
    }
  },
  {
    id: 'alg-v2-g10-seq-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the 8th term of the geometric sequence: 2, 6, 18, 54, ...',
      latex: 'a_n = a_1 \\cdot r^{n-1}'
    },
    answer: {
      type: 'numeric',
      correct: '4374',
      acceptable: ['4374']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the common ratio r', latex: 'r = \\frac{6}{2} = 3' },
        { number: 2, description: 'Use the formula', latex: 'a_n = a_1 \\cdot r^{n-1}' },
        { number: 3, description: 'Substitute n=8, a₁=2, r=3', latex: 'a_8 = 2 \\cdot 3^7 = 2 \\cdot 2187 = 4374' }
      ],
      method: 'Geometric sequence formula'
    },
    hints: [
      { level: 'gentle', text: 'First find the common ratio r.' },
      { level: 'moderate', text: 'r = 3. Use aₙ = a₁ · r^(n-1).' },
      { level: 'explicit', text: 'a₈ = 2 · 3⁷ = 2 · 2187 = 4374' }
    ],
    pedagogy: {
      topic: 'Sequences',
      subTopic: 'Geometric sequences',
      skills: ['advanced_algebra'],
      prerequisites: ['exponents'],
      concepts: ['geometric-sequence', 'common-ratio'],
      commonMistakes: ['Wrong ratio', 'Exponent calculation error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['sequence', 'geometric']
    }
  },
  {
    id: 'alg-v2-g10-seq-002',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the sum of the first 5 terms: 3, 6, 9, 12, 15',
      latex: 'S_n = \\frac{n}{2}(a_1 + a_n)'
    },
    answer: {
      type: 'numeric',
      correct: '45',
      acceptable: ['45']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use arithmetic series formula', latex: 'S_n = \\frac{n}{2}(a_1 + a_n)' },
        { number: 2, description: 'Or simply add', latex: '3 + 6 + 9 + 12 + 15 = 45' }
      ],
      alternativeMethods: ['Direct addition'],
      method: 'Arithmetic series formula'
    },
    hints: [
      { level: 'gentle', text: 'You can add directly or use the formula Sₙ = n/2(first + last).' },
      { level: 'moderate', text: 'S₅ = 5/2(3 + 15) = 5/2(18)' },
      { level: 'explicit', text: 'S₅ = 45' }
    ],
    pedagogy: {
      topic: 'Sequences',
      subTopic: 'Arithmetic series',
      skills: ['advanced_algebra'],
      prerequisites: ['arithmetic-sequences'],
      concepts: ['arithmetic-series', 'sum-formula'],
      commonMistakes: ['Formula error', 'Addition error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['sequence', 'series', 'sum']
    }
  },

  // ============================================================================
  // COMPLEX NUMBERS (Grade 11)
  // ============================================================================
  {
    id: 'alg-v2-g11-complex-001',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Simplify: (3 + 2i) + (5 - 4i)',
      latex: '(3 + 2i) + (5 - 4i)'
    },
    answer: {
      type: 'expression',
      correct: '8 - 2i',
      acceptable: ['8 - 2i', '8-2i']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add real parts', latex: '3 + 5 = 8' },
        { number: 2, description: 'Add imaginary parts', latex: '2i + (-4i) = -2i' },
        { number: 3, description: 'Combine', latex: '8 - 2i' }
      ],
      method: 'Add real and imaginary separately'
    },
    hints: [
      { level: 'gentle', text: 'Add real parts and imaginary parts separately.' },
      { level: 'moderate', text: 'Real: 3 + 5 = 8. Imaginary: 2i - 4i = -2i' },
      { level: 'explicit', text: '8 - 2i' }
    ],
    pedagogy: {
      topic: 'Complex Numbers',
      subTopic: 'Adding complex numbers',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics'],
      concepts: ['complex-addition', 'real-imaginary'],
      commonMistakes: ['Mixing real and imaginary', 'Sign error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['complex', 'addition']
    }
  },
  {
    id: 'alg-v2-g11-complex-002',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'What is i²?',
      latex: 'i^2 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '-1',
      acceptable: ['-1']
    },
    solution: {
      steps: [
        { number: 1, description: 'By definition, i = √(-1)', latex: 'i = \\sqrt{-1}' },
        { number: 2, description: 'Therefore', latex: 'i^2 = (\\sqrt{-1})^2 = -1' }
      ],
      method: 'Definition of i'
    },
    hints: [
      { level: 'gentle', text: 'i is defined as the square root of -1.' },
      { level: 'moderate', text: 'If i = √(-1), then i² = ?' },
      { level: 'explicit', text: 'i² = -1' }
    ],
    pedagogy: {
      topic: 'Complex Numbers',
      subTopic: 'Powers of i',
      skills: ['advanced_algebra'],
      prerequisites: ['square-roots'],
      concepts: ['imaginary-unit', 'powers-of-i'],
      commonMistakes: ['Saying i² = 1'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['complex', 'powers']
    }
  },

  // ============================================================================
  // RADICAL EQUATIONS (Grade 11)
  // ============================================================================
  {
    id: 'alg-v2-g11-radical-001',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Solve: √(x + 5) = 4',
      latex: '\\sqrt{x + 5} = 4'
    },
    answer: {
      type: 'numeric',
      correct: '11',
      acceptable: ['11', 'x = 11']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'sqrt(x + 5)', color: '#3B82F6', label: 'y = √(x + 5)' },
          { expression: '4', color: '#EF4444', label: 'y = 4' }
        ],
        domain: [-5, 15],
        range: [0, 6],
        showGrid: true,
        points: [
          { x: 11, y: 4, label: 'Solution (11, 4)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Square both sides', latex: '(\\sqrt{x + 5})^2 = 4^2' },
        { number: 2, description: 'Simplify', latex: 'x + 5 = 16' },
        { number: 3, description: 'Subtract 5', latex: 'x = 11' },
        { number: 4, description: 'Check: √(11 + 5) = √16 = 4 ✓', latex: '' }
      ],
      method: 'Square both sides'
    },
    hints: [
      { level: 'gentle', text: 'Square both sides to eliminate the square root.' },
      { level: 'moderate', text: 'x + 5 = 16' },
      { level: 'explicit', text: 'x = 11' }
    ],
    pedagogy: {
      topic: 'Radical Equations',
      subTopic: 'Solving',
      skills: ['advanced_algebra'],
      prerequisites: ['radicals', 'linear-equations'],
      concepts: ['squaring-both-sides', 'checking-solutions'],
      commonMistakes: ['Not checking for extraneous solutions', 'Squaring error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['radical', 'solving']
    }
  },
  {
    id: 'alg-v2-g11-radical-002',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Solve: √(2x - 1) = 5',
      latex: '\\sqrt{2x - 1} = 5'
    },
    answer: {
      type: 'numeric',
      correct: '13',
      acceptable: ['13', 'x = 13']
    },
    solution: {
      steps: [
        { number: 1, description: 'Square both sides', latex: '2x - 1 = 25' },
        { number: 2, description: 'Add 1', latex: '2x = 26' },
        { number: 3, description: 'Divide by 2', latex: 'x = 13' }
      ],
      method: 'Square both sides'
    },
    hints: [
      { level: 'gentle', text: 'Square both sides first.' },
      { level: 'moderate', text: '2x - 1 = 25, so 2x = 26' },
      { level: 'explicit', text: 'x = 13' }
    ],
    pedagogy: {
      topic: 'Radical Equations',
      subTopic: 'Solving',
      skills: ['advanced_algebra'],
      prerequisites: ['radicals', 'two-step-equations'],
      concepts: ['squaring-both-sides'],
      commonMistakes: ['Squaring error', 'Arithmetic error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['radical', 'solving']
    }
  },

  // ============================================================================
  // RATIONAL EXPRESSIONS (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-ratio-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Simplify the rational expression: (x² - 9)/(x + 3)',
      latex: '\\frac{x^2 - 9}{x + 3}'
    },
    answer: {
      type: 'expression',
      correct: 'x - 3',
      acceptable: ['x - 3', 'x-3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor the numerator (difference of squares)', latex: 'x^2 - 9 = (x - 3)(x + 3)' },
        { number: 2, description: 'Cancel common factor', latex: '\\frac{(x-3)(x+3)}{x+3} = x - 3' }
      ],
      method: 'Factor and cancel'
    },
    hints: [
      { level: 'gentle', text: 'The numerator is a difference of squares.' },
      { level: 'moderate', text: 'x² - 9 = (x - 3)(x + 3)' },
      { level: 'explicit', text: 'Cancel (x + 3): answer is x - 3' }
    ],
    pedagogy: {
      topic: 'Rational Expressions',
      subTopic: 'Simplifying',
      skills: ['advanced_algebra'],
      prerequisites: ['factoring', 'fractions'],
      concepts: ['rational-expressions', 'canceling'],
      commonMistakes: ['Wrong factoring', 'Canceling incorrectly'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['rational', 'simplify']
    }
  },

  // ============================================================================
  // RATIONAL EQUATIONS (Grade 11)
  // ============================================================================
  {
    id: 'alg-v2-g11-rational-001',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Solve: 1/x + 2/x = 9',
      latex: '\\frac{1}{x} + \\frac{2}{x} = 9'
    },
    answer: {
      type: 'fraction',
      correct: '1/3',
      acceptable: ['1/3', '0.333', '0.33']
    },
    solution: {
      steps: [
        { number: 1, description: 'Combine fractions on left', latex: '\\frac{3}{x} = 9' },
        { number: 2, description: 'Cross multiply', latex: '3 = 9x' },
        { number: 3, description: 'Divide by 9', latex: 'x = \\frac{1}{3}' }
      ],
      method: 'Combine and solve'
    },
    hints: [
      { level: 'gentle', text: 'Combine the fractions on the left: 1/x + 2/x = 3/x' },
      { level: 'moderate', text: '3/x = 9' },
      { level: 'explicit', text: 'x = 3/9 = 1/3' }
    ],
    pedagogy: {
      topic: 'Rational Equations',
      subTopic: 'Solving',
      skills: ['advanced_algebra'],
      prerequisites: ['fractions', 'linear-equations'],
      concepts: ['rational-equations', 'combining-fractions'],
      commonMistakes: ['Combining error', 'Cross multiply error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['rational', 'solving']
    }
  },

  // ============================================================================
  // PERCENT PROBLEMS (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-percent-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'What is 15% of 80?',
      latex: '15\\% \\text{ of } 80'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert percent to decimal', latex: '15\\% = 0.15' },
        { number: 2, description: 'Multiply', latex: '0.15 \\times 80 = 12' }
      ],
      method: 'Percent to decimal'
    },
    hints: [
      { level: 'gentle', text: 'Convert 15% to a decimal first.' },
      { level: 'moderate', text: '15% = 0.15' },
      { level: 'explicit', text: '0.15 × 80 = 12' }
    ],
    pedagogy: {
      topic: 'Percent',
      subTopic: 'Finding percent of a number',
      skills: ['algebra_basics'],
      prerequisites: ['decimals', 'multiplication'],
      concepts: ['percent-conversion', 'multiplication'],
      commonMistakes: ['Wrong decimal conversion', 'Calculation error'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['percent', 'basic']
    }
  },
  {
    id: 'alg-v2-g8-percent-002',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'What percent of 50 is 20?',
      latex: '? \\% \\text{ of } 50 = 20'
    },
    answer: {
      type: 'expression',
      correct: '40%',
      acceptable: ['40%', '40', '40 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the equation', latex: '\\frac{20}{50} = ?' },
        { number: 2, description: 'Divide', latex: '\\frac{20}{50} = 0.4' },
        { number: 3, description: 'Convert to percent', latex: '0.4 = 40\\%' }
      ],
      method: 'Division then convert'
    },
    hints: [
      { level: 'gentle', text: 'Divide 20 by 50, then convert to percent.' },
      { level: 'moderate', text: '20/50 = 0.4' },
      { level: 'explicit', text: '0.4 = 40%' }
    ],
    pedagogy: {
      topic: 'Percent',
      subTopic: 'Finding the percent',
      skills: ['algebra_basics'],
      prerequisites: ['fractions', 'decimals'],
      concepts: ['percent-calculation', 'division'],
      commonMistakes: ['Wrong division order', 'Conversion error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['percent', 'finding-percent']
    }
  },

  // ============================================================================
  // EVALUATING EXPRESSIONS (Grade 6)
  // ============================================================================
  {
    id: 'alg-v2-g6-eval-001',
    version: 2,
    type: 'algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Evaluate: 3x + 2 when x = 4',
      latex: '3x + 2 \\text{ when } x = 4'
    },
    answer: {
      type: 'numeric',
      correct: '14',
      acceptable: ['14']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = 4', latex: '3(4) + 2' },
        { number: 2, description: 'Multiply', latex: '12 + 2' },
        { number: 3, description: 'Add', latex: '14' }
      ],
      method: 'Substitution'
    },
    hints: [
      { level: 'gentle', text: 'Replace x with 4.' },
      { level: 'moderate', text: '3(4) + 2 = 12 + 2' },
      { level: 'explicit', text: '= 14' }
    ],
    pedagogy: {
      topic: 'Expressions',
      subTopic: 'Evaluating expressions',
      skills: ['algebra_basics'],
      prerequisites: ['arithmetic'],
      concepts: ['substitution', 'order-of-operations'],
      commonMistakes: ['Order of operations error'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['expression', 'evaluate']
    }
  },

  // ============================================================================
  // COMBINING LIKE TERMS (Grade 6)
  // ============================================================================
  {
    id: 'alg-v2-g6-combine-001',
    version: 2,
    type: 'algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Simplify: 5x + 3x',
      latex: '5x + 3x'
    },
    answer: {
      type: 'expression',
      correct: '8x',
      acceptable: ['8x']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add the coefficients', latex: '5 + 3 = 8' },
        { number: 2, description: 'Keep the variable', latex: '8x' }
      ],
      method: 'Combine like terms'
    },
    hints: [
      { level: 'gentle', text: 'These are like terms - add the coefficients.' },
      { level: 'moderate', text: '5 + 3 = 8' },
      { level: 'explicit', text: '8x' }
    ],
    pedagogy: {
      topic: 'Expressions',
      subTopic: 'Combining like terms',
      skills: ['algebra_basics'],
      prerequisites: ['arithmetic'],
      concepts: ['like-terms', 'coefficients'],
      commonMistakes: ['Adding exponents instead of coefficients'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['expression', 'combine']
    }
  },

  // ============================================================================
  // DISTRIBUTIVE PROPERTY (Grade 6)
  // ============================================================================
  {
    id: 'alg-v2-g6-dist-001',
    version: 2,
    type: 'algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Simplify: 3(x + 4)',
      latex: '3(x + 4)'
    },
    answer: {
      type: 'expression',
      correct: '3x + 12',
      acceptable: ['3x + 12', '3x+12']
    },
    solution: {
      steps: [
        { number: 1, description: 'Distribute 3 to x', latex: '3 \\cdot x = 3x' },
        { number: 2, description: 'Distribute 3 to 4', latex: '3 \\cdot 4 = 12' },
        { number: 3, description: 'Combine', latex: '3x + 12' }
      ],
      method: 'Distributive property'
    },
    hints: [
      { level: 'gentle', text: 'Multiply 3 by each term inside the parentheses.' },
      { level: 'moderate', text: '3 · x = 3x and 3 · 4 = 12' },
      { level: 'explicit', text: '3x + 12' }
    ],
    pedagogy: {
      topic: 'Expressions',
      subTopic: 'Distributive property',
      skills: ['algebra_basics'],
      prerequisites: ['multiplication'],
      concepts: ['distributive-property'],
      commonMistakes: ['Only distributing to first term'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['expression', 'distribute']
    }
  }
]

/**
 * Calculus - Sequences and Series (MathProblemV2 format)
 * Grade levels: 11-12
 * 
 * Topics covered:
 * - Arithmetic Sequences (explicit and recursive formulas)
 * - Geometric Sequences (explicit formulas, finding terms)
 * - Infinite Series (geometric series, convergence)
 * - Convergence Tests (ratio test, comparison)
 * - Taylor/Maclaurin Series (basic expansions)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const SERIES_V2: MathProblemV2[] = [
  // ============================================================================
  // ARITHMETIC SEQUENCES (5 problems: 125-129)
  // ============================================================================

  {
    id: 'calc-v2-g11-series-125',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find the 20th term of the arithmetic sequence: 5, 9, 13, 17, ...',
      latex: 'a_1 = 5, d = 4, \\text{ find } a_{20}'
    },
    answer: {
      type: 'exact',
      correct: '81',
      acceptable: ['81', 'a₂₀ = 81']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify first term and common difference', latex: 'a_1 = 5, \\quad d = 9 - 5 = 4' },
        { number: 2, description: 'Use the explicit formula', latex: 'a_n = a_1 + (n-1)d' },
        { number: 3, description: 'Substitute n = 20', latex: 'a_{20} = 5 + (20-1)(4)' },
        { number: 4, description: 'Calculate', latex: 'a_{20} = 5 + 19(4) = 5 + 76 = 81' }
      ],
      method: 'Arithmetic sequence explicit formula'
    },
    hints: [
      { level: 'gentle', text: 'The explicit formula for an arithmetic sequence is aₙ = a₁ + (n-1)d.' },
      { level: 'moderate', text: 'First term is 5, common difference is 4. Plug in n = 20.' },
      { level: 'explicit', text: 'a₂₀ = 5 + 19(4) = 5 + 76 = 81' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Arithmetic Sequences',
      skills: ['arithmetic_sequences', 'explicit_formula', 'pattern_recognition'],
      prerequisites: ['algebra', 'linear_patterns'],
      concepts: ['arithmetic-sequence', 'common-difference', 'explicit-formula'],
      commonMistakes: [
        'Using n instead of (n-1)',
        'Wrong common difference',
        'Arithmetic errors in multiplication'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'sequences', 'arithmetic', 'grade-11']
    }
  },

  {
    id: 'calc-v2-g11-series-126',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Write the recursive formula for the arithmetic sequence: 7, 11, 15, 19, ...',
      latex: '\\text{Find } a_1 \\text{ and } a_n \\text{ in terms of } a_{n-1}'
    },
    answer: {
      type: 'expression',
      correct: 'a₁ = 7, aₙ = aₙ₋₁ + 4',
      acceptable: ['a₁=7, aₙ=aₙ₋₁+4', 'a(1)=7, a(n)=a(n-1)+4']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the first term', latex: 'a_1 = 7' },
        { number: 2, description: 'Find the common difference', latex: 'd = 11 - 7 = 4' },
        { number: 3, description: 'Write recursive formula', latex: 'a_n = a_{n-1} + d = a_{n-1} + 4' }
      ],
      method: 'Recursive formula for arithmetic sequence'
    },
    hints: [
      { level: 'gentle', text: 'A recursive formula defines each term using the previous term.' },
      { level: 'moderate', text: 'For arithmetic sequences: aₙ = aₙ₋₁ + d where d is the common difference.' },
      { level: 'explicit', text: 'a₁ = 7, aₙ = aₙ₋₁ + 4' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Arithmetic Sequences',
      skills: ['arithmetic_sequences', 'recursive_formula'],
      prerequisites: ['algebra', 'sequences_intro'],
      concepts: ['recursive-formula', 'common-difference'],
      commonMistakes: [
        'Confusing recursive and explicit formulas',
        'Forgetting to state a₁',
        'Wrong sign on common difference'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'sequences', 'recursive', 'grade-11']
    }
  },

  {
    id: 'calc-v2-g11-series-127',
    version: 2,
    type: 'calculus',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'Find the sum of the first 15 terms of the arithmetic sequence: 3, 7, 11, 15, ...',
      latex: 'a_1 = 3, d = 4, \\text{ find } S_{15}'
    },
    answer: {
      type: 'exact',
      correct: '465',
      acceptable: ['465', 'S₁₅ = 465']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify first term and common difference', latex: 'a_1 = 3, \\quad d = 4' },
        { number: 2, description: 'Find the 15th term', latex: 'a_{15} = 3 + 14(4) = 3 + 56 = 59' },
        { number: 3, description: 'Use the sum formula', latex: 'S_n = \\frac{n(a_1 + a_n)}{2}' },
        { number: 4, description: 'Calculate', latex: 'S_{15} = \\frac{15(3 + 59)}{2} = \\frac{15 \\times 62}{2} = \\frac{930}{2} = 465' }
      ],
      method: 'Arithmetic series sum formula'
    },
    hints: [
      { level: 'gentle', text: 'The sum formula is Sₙ = n(a₁ + aₙ)/2. First find a₁₅.' },
      { level: 'moderate', text: 'a₁₅ = 3 + 14(4) = 59. Then S₁₅ = 15(3 + 59)/2.' },
      { level: 'explicit', text: 'S₁₅ = 15(62)/2 = 930/2 = 465' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Arithmetic Sequences',
      skills: ['arithmetic_series', 'sum_formula'],
      prerequisites: ['arithmetic_sequences', 'algebra'],
      concepts: ['arithmetic-series', 'sum-formula', 'finite-series'],
      commonMistakes: [
        'Forgetting to find aₙ first',
        'Using wrong n value',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'arithmetic', 'sum', 'grade-11']
    }
  },

  {
    id: 'calc-v2-g11-series-128',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'The 5th term of an arithmetic sequence is 23 and the 10th term is 43. Find the first term and common difference.',
      latex: 'a_5 = 23, a_{10} = 43, \\text{ find } a_1 \\text{ and } d'
    },
    answer: {
      type: 'set',
      correct: 'a₁ = 7, d = 4',
      acceptable: ['a₁=7, d=4', 'first term=7, d=4', '7 and 4']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use two equations from the explicit formula', latex: 'a_5 = a_1 + 4d = 23' },
        { number: 2, description: 'Second equation', latex: 'a_{10} = a_1 + 9d = 43' },
        { number: 3, description: 'Subtract first from second', latex: '(a_1 + 9d) - (a_1 + 4d) = 43 - 23' },
        { number: 4, description: 'Solve for d', latex: '5d = 20 \\implies d = 4' },
        { number: 5, description: 'Substitute back to find a₁', latex: 'a_1 + 4(4) = 23 \\implies a_1 = 23 - 16 = 7' }
      ],
      method: 'System of equations'
    },
    hints: [
      { level: 'gentle', text: 'Set up two equations using aₙ = a₁ + (n-1)d for both given terms.' },
      { level: 'moderate', text: 'a₁ + 4d = 23 and a₁ + 9d = 43. Subtract to eliminate a₁.' },
      { level: 'explicit', text: '5d = 20, so d = 4. Then a₁ = 23 - 16 = 7.' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Arithmetic Sequences',
      skills: ['arithmetic_sequences', 'systems_of_equations'],
      prerequisites: ['algebra', 'solving_equations'],
      concepts: ['arithmetic-sequence', 'system-of-equations'],
      commonMistakes: [
        'Wrong coefficients on d',
        'Subtraction errors',
        'Substitution errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'sequences', 'arithmetic', 'systems', 'grade-11']
    }
  },

  {
    id: 'calc-v2-g11-series-129',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find the sum: 1 + 2 + 3 + ... + 100',
      latex: '\\sum_{k=1}^{100} k = ?'
    },
    answer: {
      type: 'exact',
      correct: '5050',
      acceptable: ['5050', 'S = 5050']
    },
    solution: {
      steps: [
        { number: 1, description: 'This is an arithmetic series with a₁ = 1, aₙ = 100, n = 100', latex: 'a_1 = 1, a_{100} = 100, n = 100' },
        { number: 2, description: 'Use the sum formula', latex: 'S_n = \\frac{n(a_1 + a_n)}{2}' },
        { number: 3, description: 'Substitute', latex: 'S_{100} = \\frac{100(1 + 100)}{2} = \\frac{100 \\times 101}{2}' },
        { number: 4, description: 'Calculate', latex: 'S_{100} = \\frac{10100}{2} = 5050' }
      ],
      method: 'Gauss sum formula'
    },
    hints: [
      { level: 'gentle', text: 'This is an arithmetic series. Use Sₙ = n(a₁ + aₙ)/2.' },
      { level: 'moderate', text: 'n = 100, first term = 1, last term = 100.' },
      { level: 'explicit', text: 'S = 100(101)/2 = 5050 (the famous Gauss formula)' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Arithmetic Sequences',
      skills: ['arithmetic_series', 'sum_formula'],
      prerequisites: ['arithmetic_sequences'],
      concepts: ['gauss-sum', 'arithmetic-series'],
      commonMistakes: [
        'Adding term by term instead of using formula',
        'Using wrong n value'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'arithmetic', 'gauss', 'grade-11']
    }
  },

  // ============================================================================
  // GEOMETRIC SEQUENCES (5 problems: 130-134)
  // ============================================================================

  {
    id: 'calc-v2-g11-series-130',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find the 8th term of the geometric sequence: 3, 6, 12, 24, ...',
      latex: 'a_1 = 3, r = 2, \\text{ find } a_8'
    },
    answer: {
      type: 'exact',
      correct: '384',
      acceptable: ['384', 'a₈ = 384']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify first term and common ratio', latex: 'a_1 = 3, \\quad r = \\frac{6}{3} = 2' },
        { number: 2, description: 'Use the explicit formula', latex: 'a_n = a_1 \\cdot r^{n-1}' },
        { number: 3, description: 'Substitute n = 8', latex: 'a_8 = 3 \\cdot 2^{8-1} = 3 \\cdot 2^7' },
        { number: 4, description: 'Calculate', latex: 'a_8 = 3 \\cdot 128 = 384' }
      ],
      method: 'Geometric sequence explicit formula'
    },
    hints: [
      { level: 'gentle', text: 'The explicit formula for a geometric sequence is aₙ = a₁ · r^(n-1).' },
      { level: 'moderate', text: 'First term is 3, common ratio is 2. Calculate 2⁷ first.' },
      { level: 'explicit', text: 'a₈ = 3 × 2⁷ = 3 × 128 = 384' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Geometric Sequences',
      skills: ['geometric_sequences', 'exponents', 'explicit_formula'],
      prerequisites: ['exponents', 'algebra'],
      concepts: ['geometric-sequence', 'common-ratio', 'explicit-formula'],
      commonMistakes: [
        'Using n instead of n-1 in exponent',
        'Confusing common ratio with common difference',
        'Exponent calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'sequences', 'geometric', 'grade-11']
    }
  },

  {
    id: 'calc-v2-g11-series-131',
    version: 2,
    type: 'calculus',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'Find the common ratio of a geometric sequence where a₃ = 20 and a₆ = 540.',
      latex: 'a_3 = 20, a_6 = 540, \\text{ find } r'
    },
    answer: {
      type: 'exact',
      correct: '3',
      acceptable: ['3', 'r = 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the relationship between terms', latex: 'a_6 = a_3 \\cdot r^{6-3} = a_3 \\cdot r^3' },
        { number: 2, description: 'Substitute known values', latex: '540 = 20 \\cdot r^3' },
        { number: 3, description: 'Solve for r³', latex: 'r^3 = \\frac{540}{20} = 27' },
        { number: 4, description: 'Take cube root', latex: 'r = \\sqrt[3]{27} = 3' }
      ],
      method: 'Geometric sequence ratio'
    },
    hints: [
      { level: 'gentle', text: 'Use the fact that aₙ = aₘ · r^(n-m) for any two terms.' },
      { level: 'moderate', text: 'a₆ = a₃ · r³, so 540 = 20 · r³.' },
      { level: 'explicit', text: 'r³ = 540/20 = 27, so r = ∛27 = 3' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Geometric Sequences',
      skills: ['geometric_sequences', 'cube_roots', 'algebra'],
      prerequisites: ['exponents', 'roots', 'algebra'],
      concepts: ['geometric-sequence', 'common-ratio', 'cube-root'],
      commonMistakes: [
        'Wrong exponent (using 6-3 = 3 correctly)',
        'Forgetting to take the cube root',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'sequences', 'geometric', 'ratio', 'grade-11']
    }
  },

  {
    id: 'calc-v2-g11-series-132',
    version: 2,
    type: 'calculus',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'Find the sum of the first 6 terms of the geometric sequence: 4, 12, 36, 108, ...',
      latex: 'a_1 = 4, r = 3, \\text{ find } S_6'
    },
    answer: {
      type: 'exact',
      correct: '1456',
      acceptable: ['1456', 'S₆ = 1456']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify first term and common ratio', latex: 'a_1 = 4, \\quad r = \\frac{12}{4} = 3' },
        { number: 2, description: 'Use the geometric series sum formula (r ≠ 1)', latex: 'S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r}' },
        { number: 3, description: 'Substitute values', latex: 'S_6 = 4 \\cdot \\frac{1 - 3^6}{1 - 3} = 4 \\cdot \\frac{1 - 729}{-2}' },
        { number: 4, description: 'Calculate', latex: 'S_6 = 4 \\cdot \\frac{-728}{-2} = 4 \\cdot 364 = 1456' }
      ],
      method: 'Finite geometric series sum'
    },
    hints: [
      { level: 'gentle', text: 'Use Sₙ = a₁(1 - rⁿ)/(1 - r) for r ≠ 1.' },
      { level: 'moderate', text: '3⁶ = 729. Then S₆ = 4(1 - 729)/(1 - 3).' },
      { level: 'explicit', text: 'S₆ = 4(-728)/(-2) = 4(364) = 1456' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Geometric Sequences',
      skills: ['geometric_series', 'sum_formula', 'exponents'],
      prerequisites: ['geometric_sequences', 'exponents', 'fractions'],
      concepts: ['geometric-series', 'finite-sum', 'sum-formula'],
      commonMistakes: [
        'Sign errors with negatives',
        'Wrong exponent calculation',
        'Using wrong formula (infinite vs finite)'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'geometric', 'sum', 'grade-11']
    }
  },

  {
    id: 'calc-v2-g11-series-133',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Write the first 5 terms of the geometric sequence with a₁ = 100 and r = 0.5.',
      latex: 'a_1 = 100, r = 0.5'
    },
    answer: {
      type: 'set',
      correct: '100, 50, 25, 12.5, 6.25',
      acceptable: ['100,50,25,12.5,6.25', '100, 50, 25, 12.5, 6.25']
    },
    solution: {
      steps: [
        { number: 1, description: 'First term', latex: 'a_1 = 100' },
        { number: 2, description: 'Second term', latex: 'a_2 = 100 \\times 0.5 = 50' },
        { number: 3, description: 'Third term', latex: 'a_3 = 50 \\times 0.5 = 25' },
        { number: 4, description: 'Fourth term', latex: 'a_4 = 25 \\times 0.5 = 12.5' },
        { number: 5, description: 'Fifth term', latex: 'a_5 = 12.5 \\times 0.5 = 6.25' }
      ],
      method: 'Term-by-term generation'
    },
    hints: [
      { level: 'gentle', text: 'Each term is the previous term multiplied by the common ratio.' },
      { level: 'moderate', text: 'Start with 100, then multiply by 0.5 repeatedly.' },
      { level: 'explicit', text: '100, 50, 25, 12.5, 6.25' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Geometric Sequences',
      skills: ['geometric_sequences', 'pattern_generation'],
      prerequisites: ['multiplication', 'decimals'],
      concepts: ['geometric-sequence', 'decay', 'common-ratio-less-than-1'],
      commonMistakes: [
        'Dividing instead of multiplying by 0.5',
        'Arithmetic errors with decimals'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'sequences', 'geometric', 'decay', 'grade-11']
    }
  },

  {
    id: 'calc-v2-g11-series-134',
    version: 2,
    type: 'calculus',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'A ball is dropped from 80 feet. Each bounce reaches 75% of the previous height. How high is the 4th bounce?',
      latex: 'a_0 = 80, r = 0.75, \\text{ find } a_4'
    },
    answer: {
      type: 'numeric',
      correct: '25.3125',
      acceptable: ['25.31', '25.3', '25.3125', '≈25.3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the sequence', latex: 'a_n = 80 \\times (0.75)^n' },
        { number: 2, description: 'Find the 4th bounce height', latex: 'a_4 = 80 \\times (0.75)^4' },
        { number: 3, description: 'Calculate (0.75)⁴', latex: '(0.75)^4 = 0.31640625' },
        { number: 4, description: 'Multiply', latex: 'a_4 = 80 \\times 0.31640625 = 25.3125' }
      ],
      method: 'Geometric decay application'
    },
    hints: [
      { level: 'gentle', text: 'This is geometric decay. Each bounce is 75% of the previous.' },
      { level: 'moderate', text: 'Height after n bounces: h = 80 × (0.75)ⁿ' },
      { level: 'explicit', text: 'h = 80 × (0.75)⁴ = 80 × 0.3164 ≈ 25.31 feet' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Geometric Sequences',
      skills: ['geometric_sequences', 'exponential_decay', 'applications'],
      prerequisites: ['exponents', 'decimals', 'percentages'],
      concepts: ['geometric-sequence', 'exponential-decay', 'real-world-application'],
      commonMistakes: [
        'Confusing initial height with first bounce',
        'Percentage conversion errors',
        'Exponent calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'sequences', 'geometric', 'application', 'grade-11']
    }
  },

  // ============================================================================
  // INFINITE SERIES (5 problems: 135-139)
  // ============================================================================

  {
    id: 'calc-v2-g12-series-135',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the sum of the infinite geometric series: 12 + 6 + 3 + 1.5 + ...',
      latex: '\\sum_{n=0}^{\\infty} 12 \\cdot \\left(\\frac{1}{2}\\right)^n'
    },
    answer: {
      type: 'numeric',
      correct: '24',
      acceptable: ['24', 'S = 24']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '24 - 12*(0.5)^x', color: '#3B82F6', label: 'Partial sums approaching 24' }
        ],
        domain: [0, 10],
        range: [0, 30],
        showGrid: true,
        points: [
          { x: 0, y: 12, label: 'S₁=12' },
          { x: 1, y: 18, label: 'S₂=18' },
          { x: 2, y: 21, label: 'S₃=21' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify a (first term) and r (common ratio)', latex: 'a = 12, \\quad r = \\frac{6}{12} = \\frac{1}{2}' },
        { number: 2, description: 'Check if the series converges', latex: '|r| = \\frac{1}{2} < 1 \\quad \\checkmark \\text{ converges}' },
        { number: 3, description: 'Apply the infinite geometric series formula', latex: 'S = \\frac{a}{1 - r}' },
        { number: 4, description: 'Substitute and calculate', latex: 'S = \\frac{12}{1 - \\frac{1}{2}} = \\frac{12}{\\frac{1}{2}} = 24' }
      ],
      method: 'Infinite geometric series formula'
    },
    hints: [
      { level: 'gentle', text: 'This is an infinite geometric series. First find the first term (a) and common ratio (r).' },
      { level: 'moderate', text: 'a = 12, r = 1/2. Since |r| < 1, the series converges. Use S = a/(1-r).' },
      { level: 'explicit', text: 'S = 12/(1 - 1/2) = 12/(1/2) = 12 × 2 = 24' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Infinite Series',
      skills: ['geometric_series', 'convergence', 'series_sum'],
      prerequisites: ['geometric_sequences', 'limits', 'fractions'],
      concepts: ['infinite-series', 'geometric-series', 'convergence', 'sum-formula'],
      commonMistakes: [
        'Using the formula when |r| ≥ 1 (series diverges)',
        'Confusing r with a',
        'Getting the formula wrong (a/(1-r) not a/(r-1))'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'geometric', 'infinite', 'convergence', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-136',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Convert the repeating decimal 0.777... to a fraction using an infinite geometric series.',
      latex: '0.\\overline{7} = 0.777... = ?'
    },
    answer: {
      type: 'fraction',
      correct: '7/9',
      acceptable: ['7/9', '⅞', '0.777...']
    },
    solution: {
      steps: [
        { number: 1, description: 'Express as a series', latex: '0.777... = 0.7 + 0.07 + 0.007 + ...' },
        { number: 2, description: 'Identify first term and ratio', latex: 'a = 0.7, \\quad r = 0.1' },
        { number: 3, description: 'Apply infinite series formula', latex: 'S = \\frac{a}{1-r} = \\frac{0.7}{1-0.1} = \\frac{0.7}{0.9}' },
        { number: 4, description: 'Simplify', latex: '\\frac{0.7}{0.9} = \\frac{7}{9}' }
      ],
      method: 'Repeating decimal to fraction'
    },
    hints: [
      { level: 'gentle', text: 'Write 0.777... as a sum: 0.7 + 0.07 + 0.007 + ...' },
      { level: 'moderate', text: 'This is geometric with a = 0.7 and r = 0.1.' },
      { level: 'explicit', text: 'S = 0.7/(1-0.1) = 0.7/0.9 = 7/9' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Infinite Series',
      skills: ['geometric_series', 'fractions', 'decimals'],
      prerequisites: ['geometric_series', 'decimal_place_value'],
      concepts: ['repeating-decimal', 'geometric-series', 'fraction-conversion'],
      commonMistakes: [
        'Wrong identification of first term',
        'Incorrect common ratio',
        'Simplification errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'repeating-decimal', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-137',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Does the series Σ(2/3)ⁿ from n=0 to ∞ converge? If so, find its sum.',
      latex: '\\sum_{n=0}^{\\infty} \\left(\\frac{2}{3}\\right)^n'
    },
    answer: {
      type: 'exact',
      correct: '3',
      acceptable: ['3', 'S = 3', 'converges to 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the type of series', latex: '\\text{Geometric with } a = 1, r = \\frac{2}{3}' },
        { number: 2, description: 'Check convergence condition', latex: '|r| = \\frac{2}{3} < 1 \\implies \\text{converges}' },
        { number: 3, description: 'Apply sum formula', latex: 'S = \\frac{a}{1-r} = \\frac{1}{1 - \\frac{2}{3}}' },
        { number: 4, description: 'Calculate', latex: 'S = \\frac{1}{\\frac{1}{3}} = 3' }
      ],
      method: 'Infinite geometric series'
    },
    hints: [
      { level: 'gentle', text: 'Check if |r| < 1. If yes, the series converges.' },
      { level: 'moderate', text: 'When n=0, the first term is (2/3)⁰ = 1. So a = 1, r = 2/3.' },
      { level: 'explicit', text: 'S = 1/(1 - 2/3) = 1/(1/3) = 3' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Infinite Series',
      skills: ['geometric_series', 'convergence_test', 'series_sum'],
      prerequisites: ['geometric_series', 'fractions'],
      concepts: ['convergence', 'infinite-series', 'geometric-series'],
      commonMistakes: [
        'Wrong first term (forgetting n=0 case)',
        'Inverting the fraction incorrectly',
        'Not checking convergence first'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'convergence', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-138',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Does the geometric series 5 + 10 + 20 + 40 + ... converge or diverge?',
      latex: '\\sum_{n=0}^{\\infty} 5 \\cdot 2^n'
    },
    answer: {
      type: 'exact',
      correct: 'Diverges',
      acceptable: ['diverges', 'diverge', 'does not converge', 'infinite']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify first term and common ratio', latex: 'a = 5, \\quad r = \\frac{10}{5} = 2' },
        { number: 2, description: 'Check convergence condition', latex: '|r| = 2 > 1' },
        { number: 3, description: 'Conclusion', latex: '\\text{Since } |r| \\geq 1, \\text{ the series diverges}' }
      ],
      method: 'Geometric series convergence test'
    },
    hints: [
      { level: 'gentle', text: 'For a geometric series to converge, |r| must be less than 1.' },
      { level: 'moderate', text: 'Find r: each term is 2× the previous. r = 2.' },
      { level: 'explicit', text: '|r| = 2 > 1, so the series diverges (grows without bound).' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Infinite Series',
      skills: ['geometric_series', 'convergence_test'],
      prerequisites: ['geometric_sequences', 'absolute_value'],
      concepts: ['divergence', 'convergence-condition', 'geometric-series'],
      commonMistakes: [
        'Trying to use the sum formula anyway',
        'Confusing convergence with having a pattern'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'divergence', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-139',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the sum: 1 - 1/2 + 1/4 - 1/8 + 1/16 - ...',
      latex: '\\sum_{n=0}^{\\infty} \\left(-\\frac{1}{2}\\right)^n'
    },
    answer: {
      type: 'fraction',
      correct: '2/3',
      acceptable: ['2/3', '0.667', '0.66...']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify first term and common ratio', latex: 'a = 1, \\quad r = -\\frac{1}{2}' },
        { number: 2, description: 'Check convergence', latex: '|r| = \\frac{1}{2} < 1 \\implies \\text{converges}' },
        { number: 3, description: 'Apply sum formula', latex: 'S = \\frac{a}{1-r} = \\frac{1}{1-(-\\frac{1}{2})} = \\frac{1}{1 + \\frac{1}{2}}' },
        { number: 4, description: 'Simplify', latex: 'S = \\frac{1}{\\frac{3}{2}} = \\frac{2}{3}' }
      ],
      method: 'Alternating geometric series'
    },
    hints: [
      { level: 'gentle', text: 'This is geometric with alternating signs. What is r?' },
      { level: 'moderate', text: 'r = -1/2 (negative because of alternating signs). |r| < 1, so it converges.' },
      { level: 'explicit', text: 'S = 1/(1 - (-1/2)) = 1/(3/2) = 2/3' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Infinite Series',
      skills: ['geometric_series', 'alternating_series', 'fractions'],
      prerequisites: ['geometric_series', 'negative_numbers', 'fractions'],
      concepts: ['alternating-series', 'geometric-series', 'negative-ratio'],
      commonMistakes: [
        'Using |r| = 1/2 instead of r = -1/2 in formula',
        'Sign errors in (1 - r)',
        'Forgetting absolute value for convergence check'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'alternating', 'grade-12']
    }
  },

  // ============================================================================
  // CONVERGENCE TESTS (5 problems: 140-144)
  // ============================================================================

  {
    id: 'calc-v2-g12-series-140',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Use the ratio test to determine if Σ(n!/2ⁿ) from n=1 to ∞ converges or diverges.',
      latex: '\\sum_{n=1}^{\\infty} \\frac{n!}{2^n}'
    },
    answer: {
      type: 'exact',
      correct: 'Diverges',
      acceptable: ['diverges', 'diverge', 'the series diverges']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the ratio test', latex: 'L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|' },
        { number: 2, description: 'Calculate the ratio', latex: '\\frac{a_{n+1}}{a_n} = \\frac{(n+1)!/2^{n+1}}{n!/2^n} = \\frac{(n+1)! \\cdot 2^n}{n! \\cdot 2^{n+1}}' },
        { number: 3, description: 'Simplify', latex: '= \\frac{(n+1) \\cdot n!}{n!} \\cdot \\frac{2^n}{2 \\cdot 2^n} = \\frac{n+1}{2}' },
        { number: 4, description: 'Take limit', latex: 'L = \\lim_{n \\to \\infty} \\frac{n+1}{2} = \\infty' },
        { number: 5, description: 'Conclusion', latex: 'L > 1 \\implies \\text{diverges}' }
      ],
      method: 'Ratio test'
    },
    hints: [
      { level: 'gentle', text: 'The ratio test compares consecutive terms: L = lim |aₙ₊₁/aₙ|.' },
      { level: 'moderate', text: 'Remember that (n+1)!/n! = n+1.' },
      { level: 'explicit', text: 'L = lim (n+1)/2 = ∞ > 1, so diverges.' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Convergence Tests',
      skills: ['ratio_test', 'factorials', 'limits'],
      prerequisites: ['limits', 'factorials', 'exponents'],
      concepts: ['ratio-test', 'factorial-growth', 'divergence'],
      commonMistakes: [
        'Simplification errors with factorials',
        'Forgetting to take limit',
        'Wrong interpretation of L > 1'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'ratio-test', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-141',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Use the ratio test on Σ(1/n!) from n=0 to ∞. Does it converge?',
      latex: '\\sum_{n=0}^{\\infty} \\frac{1}{n!}'
    },
    answer: {
      type: 'exact',
      correct: 'Converges',
      acceptable: ['converges', 'converge', 'yes', 'the series converges']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up ratio', latex: '\\frac{a_{n+1}}{a_n} = \\frac{1/(n+1)!}{1/n!} = \\frac{n!}{(n+1)!}' },
        { number: 2, description: 'Simplify', latex: '= \\frac{n!}{(n+1) \\cdot n!} = \\frac{1}{n+1}' },
        { number: 3, description: 'Take limit', latex: 'L = \\lim_{n \\to \\infty} \\frac{1}{n+1} = 0' },
        { number: 4, description: 'Conclusion', latex: 'L = 0 < 1 \\implies \\text{converges}' }
      ],
      method: 'Ratio test'
    },
    hints: [
      { level: 'gentle', text: 'Calculate |aₙ₊₁/aₙ| and take the limit.' },
      { level: 'moderate', text: '(n+1)! = (n+1) × n!, so n!/(n+1)! = 1/(n+1).' },
      { level: 'explicit', text: 'L = lim 1/(n+1) = 0 < 1, so converges. (Sum = e)' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Convergence Tests',
      skills: ['ratio_test', 'factorials', 'limits'],
      prerequisites: ['limits', 'factorials'],
      concepts: ['ratio-test', 'convergence', 'factorial-series'],
      commonMistakes: [
        'Inverting the ratio incorrectly',
        'Factorial simplification errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'ratio-test', 'exponential', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-142',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Use the comparison test: Does Σ(1/(n²+1)) from n=1 to ∞ converge? Compare to Σ(1/n²).',
      latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2+1}'
    },
    answer: {
      type: 'exact',
      correct: 'Converges',
      acceptable: ['converges', 'converge', 'yes']
    },
    solution: {
      steps: [
        { number: 1, description: 'Compare terms', latex: '\\frac{1}{n^2+1} < \\frac{1}{n^2} \\text{ for all } n \\geq 1' },
        { number: 2, description: 'The comparison series is a p-series with p=2', latex: '\\sum \\frac{1}{n^2} \\text{ converges (p-series, } p = 2 > 1\\text{)}' },
        { number: 3, description: 'Apply comparison test', latex: '0 < \\frac{1}{n^2+1} < \\frac{1}{n^2}' },
        { number: 4, description: 'Conclusion', latex: '\\text{Since } \\sum \\frac{1}{n^2} \\text{ converges, so does } \\sum \\frac{1}{n^2+1}' }
      ],
      method: 'Direct comparison test'
    },
    hints: [
      { level: 'gentle', text: 'Compare to a known series. Is 1/(n²+1) bigger or smaller than 1/n²?' },
      { level: 'moderate', text: '1/(n²+1) < 1/n² and Σ(1/n²) converges (p-series, p=2).' },
      { level: 'explicit', text: 'By comparison test with convergent p-series, Σ(1/(n²+1)) converges.' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Convergence Tests',
      skills: ['comparison_test', 'p_series', 'inequalities'],
      prerequisites: ['series', 'inequalities'],
      concepts: ['comparison-test', 'p-series', 'convergence'],
      commonMistakes: [
        'Comparing in wrong direction',
        'Using divergent series for comparison incorrectly',
        'Forgetting to verify inequality holds'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'comparison-test', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-143',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Does the p-series Σ(1/n^(1/2)) from n=1 to ∞ converge or diverge?',
      latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^{1/2}} = \\sum_{n=1}^{\\infty} \\frac{1}{\\sqrt{n}}'
    },
    answer: {
      type: 'exact',
      correct: 'Diverges',
      acceptable: ['diverges', 'diverge', 'no']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify as a p-series', latex: '\\sum \\frac{1}{n^p} \\text{ with } p = \\frac{1}{2}' },
        { number: 2, description: 'Apply p-series test', latex: '\\text{p-series converges iff } p > 1' },
        { number: 3, description: 'Check condition', latex: 'p = \\frac{1}{2} < 1' },
        { number: 4, description: 'Conclusion', latex: '\\text{Since } p < 1, \\text{ the series diverges}' }
      ],
      method: 'P-series test'
    },
    hints: [
      { level: 'gentle', text: 'This is a p-series. What is the value of p?' },
      { level: 'moderate', text: '1/√n = 1/n^(1/2), so p = 1/2.' },
      { level: 'explicit', text: 'p = 1/2 < 1, so the p-series diverges.' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Convergence Tests',
      skills: ['p_series', 'exponents'],
      prerequisites: ['exponents', 'square_roots'],
      concepts: ['p-series', 'divergence', 'harmonic-series'],
      commonMistakes: [
        'Thinking all p-series converge',
        'Misidentifying p',
        'Confusing ≤ with <'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'p-series', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-144',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'What is the result of the ratio test if L = 1?',
      latex: 'L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right| = 1'
    },
    answer: {
      type: 'exact',
      correct: 'Inconclusive',
      acceptable: ['inconclusive', 'test fails', 'cannot determine', 'no conclusion']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall ratio test rules', latex: 'L < 1 \\implies \\text{converges}' },
        { number: 2, description: 'Second rule', latex: 'L > 1 \\implies \\text{diverges}' },
        { number: 3, description: 'Third rule', latex: 'L = 1 \\implies \\text{inconclusive}' },
        { number: 4, description: 'Need another test', latex: '\\text{Try another test (comparison, integral, etc.)}' }
      ],
      method: 'Ratio test interpretation'
    },
    hints: [
      { level: 'gentle', text: 'The ratio test has three possible outcomes based on L.' },
      { level: 'moderate', text: 'L < 1: converges. L > 1: diverges. L = 1: ?' },
      { level: 'explicit', text: 'When L = 1, the ratio test is inconclusive. Use another test.' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Convergence Tests',
      skills: ['ratio_test', 'test_interpretation'],
      prerequisites: ['ratio_test'],
      concepts: ['ratio-test', 'inconclusive-result', 'test-limitations'],
      commonMistakes: [
        'Assuming L = 1 means convergence',
        'Forgetting this case exists'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'ratio-test', 'theory', 'grade-12']
    }
  },

  // ============================================================================
  // TAYLOR/MACLAURIN SERIES (5 problems: 145-149)
  // ============================================================================

  {
    id: 'calc-v2-g12-series-145',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Write the first 4 non-zero terms of the Maclaurin series for eˣ.',
      latex: 'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}'
    },
    answer: {
      type: 'expression',
      correct: '1 + x + x²/2 + x³/6',
      acceptable: ['1 + x + x^2/2 + x^3/6', '1+x+x²/2!+x³/3!']
    },
    solution: {
      steps: [
        { number: 1, description: 'Maclaurin series formula', latex: 'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}' },
        { number: 2, description: 'n = 0 term', latex: '\\frac{x^0}{0!} = 1' },
        { number: 3, description: 'n = 1 term', latex: '\\frac{x^1}{1!} = x' },
        { number: 4, description: 'n = 2 term', latex: '\\frac{x^2}{2!} = \\frac{x^2}{2}' },
        { number: 5, description: 'n = 3 term', latex: '\\frac{x^3}{3!} = \\frac{x^3}{6}' }
      ],
      method: 'Maclaurin series expansion'
    },
    hints: [
      { level: 'gentle', text: 'The Maclaurin series for eˣ is Σ(xⁿ/n!).' },
      { level: 'moderate', text: 'Write out terms: x⁰/0! + x¹/1! + x²/2! + x³/3! + ...' },
      { level: 'explicit', text: '1 + x + x²/2 + x³/6 + ...' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Taylor/Maclaurin Series',
      skills: ['maclaurin_series', 'factorials', 'exponential'],
      prerequisites: ['factorials', 'exponentials'],
      concepts: ['maclaurin-series', 'exponential-series', 'power-series'],
      commonMistakes: [
        'Forgetting 0! = 1',
        'Wrong factorial values',
        'Starting at wrong index'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'remember',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'taylor', 'exponential', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-146',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Write the first 3 non-zero terms of the Maclaurin series for sin(x).',
      latex: '\\sin(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}'
    },
    answer: {
      type: 'expression',
      correct: 'x - x³/6 + x⁵/120',
      acceptable: ['x - x^3/6 + x^5/120', 'x - x³/3! + x⁵/5!']
    },
    solution: {
      steps: [
        { number: 1, description: 'Maclaurin series for sin(x)', latex: '\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + ...' },
        { number: 2, description: 'n = 0 term', latex: '\\frac{(-1)^0 x^1}{1!} = x' },
        { number: 3, description: 'n = 1 term', latex: '\\frac{(-1)^1 x^3}{3!} = -\\frac{x^3}{6}' },
        { number: 4, description: 'n = 2 term', latex: '\\frac{(-1)^2 x^5}{5!} = \\frac{x^5}{120}' }
      ],
      method: 'Maclaurin series for sin(x)'
    },
    hints: [
      { level: 'gentle', text: 'sin(x) only has odd powers of x in its Maclaurin series.' },
      { level: 'moderate', text: 'The pattern alternates signs: x - x³/3! + x⁵/5! - ...' },
      { level: 'explicit', text: 'x - x³/6 + x⁵/120' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Taylor/Maclaurin Series',
      skills: ['maclaurin_series', 'trigonometry', 'factorials'],
      prerequisites: ['trigonometry', 'factorials'],
      concepts: ['maclaurin-series', 'sine-series', 'alternating-series'],
      commonMistakes: [
        'Including even powers',
        'Wrong signs',
        'Factorial errors (3! = 6, 5! = 120)'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'remember',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'taylor', 'trig', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-147',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Write the first 3 non-zero terms of the Maclaurin series for cos(x).',
      latex: '\\cos(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!}'
    },
    answer: {
      type: 'expression',
      correct: '1 - x²/2 + x⁴/24',
      acceptable: ['1 - x^2/2 + x^4/24', '1 - x²/2! + x⁴/4!']
    },
    solution: {
      steps: [
        { number: 1, description: 'Maclaurin series for cos(x)', latex: '\\cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + ...' },
        { number: 2, description: 'n = 0 term', latex: '\\frac{(-1)^0 x^0}{0!} = 1' },
        { number: 3, description: 'n = 1 term', latex: '\\frac{(-1)^1 x^2}{2!} = -\\frac{x^2}{2}' },
        { number: 4, description: 'n = 2 term', latex: '\\frac{(-1)^2 x^4}{4!} = \\frac{x^4}{24}' }
      ],
      method: 'Maclaurin series for cos(x)'
    },
    hints: [
      { level: 'gentle', text: 'cos(x) only has even powers of x in its Maclaurin series.' },
      { level: 'moderate', text: 'The pattern alternates signs: 1 - x²/2! + x⁴/4! - ...' },
      { level: 'explicit', text: '1 - x²/2 + x⁴/24' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Taylor/Maclaurin Series',
      skills: ['maclaurin_series', 'trigonometry', 'factorials'],
      prerequisites: ['trigonometry', 'factorials'],
      concepts: ['maclaurin-series', 'cosine-series', 'even-powers'],
      commonMistakes: [
        'Including odd powers',
        'Wrong signs',
        'Factorial errors (2! = 2, 4! = 24)'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'remember',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'taylor', 'trig', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-148',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Use the Maclaurin series for eˣ to approximate e to 3 decimal places using 4 terms.',
      latex: 'e = e^1 \\approx 1 + 1 + \\frac{1}{2!} + \\frac{1}{3!}'
    },
    answer: {
      type: 'numeric',
      correct: '2.667',
      acceptable: ['2.667', '2.67', '8/3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = 1 into Maclaurin series', latex: 'e = e^1 = \\sum_{n=0}^{\\infty} \\frac{1^n}{n!}' },
        { number: 2, description: 'First 4 terms', latex: '\\frac{1}{0!} + \\frac{1}{1!} + \\frac{1}{2!} + \\frac{1}{3!}' },
        { number: 3, description: 'Calculate', latex: '1 + 1 + \\frac{1}{2} + \\frac{1}{6}' },
        { number: 4, description: 'Sum', latex: '= 2 + 0.5 + 0.167 = 2.667' }
      ],
      method: 'Series approximation'
    },
    hints: [
      { level: 'gentle', text: 'Set x = 1 in the series for eˣ to get e.' },
      { level: 'moderate', text: '1 + 1 + 1/2 + 1/6 = ...' },
      { level: 'explicit', text: '1 + 1 + 0.5 + 0.167 ≈ 2.667 (actual e ≈ 2.718)' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Taylor/Maclaurin Series',
      skills: ['maclaurin_series', 'numerical_approximation'],
      prerequisites: ['exponentials', 'factorials', 'fractions'],
      concepts: ['series-approximation', 'eulers-number', 'truncation'],
      commonMistakes: [
        'Wrong number of terms',
        'Calculation errors',
        'Not recognizing e = e¹'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'approximation', 'euler', 'grade-12']
    }
  },

  {
    id: 'calc-v2-g12-series-149',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Write the general term of the Taylor series for f(x) centered at x = a.',
      latex: 'f(x) = \\sum_{n=0}^{\\infty} c_n (x-a)^n, \\text{ find } c_n'
    },
    answer: {
      type: 'expression',
      correct: 'f⁽ⁿ⁾(a)/n!',
      acceptable: ['f^(n)(a)/n!', 'f(n)(a)/n!', 'nth derivative at a over n factorial']
    },
    solution: {
      steps: [
        { number: 1, description: 'Taylor series general form', latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n' },
        { number: 2, description: 'Identify the coefficient', latex: 'c_n = \\frac{f^{(n)}(a)}{n!}' },
        { number: 3, description: 'Meaning', latex: 'c_n = \\frac{\\text{nth derivative of } f \\text{ at } a}{n!}' }
      ],
      method: 'Taylor series formula'
    },
    hints: [
      { level: 'gentle', text: 'The Taylor series uses derivatives of f evaluated at the center a.' },
      { level: 'moderate', text: 'Each coefficient involves the nth derivative and n factorial.' },
      { level: 'explicit', text: 'cₙ = f⁽ⁿ⁾(a)/n!' }
    ],
    pedagogy: {
      topic: 'Sequences and Series',
      subTopic: 'Taylor/Maclaurin Series',
      skills: ['taylor_series', 'derivatives', 'factorials'],
      prerequisites: ['derivatives', 'factorials'],
      concepts: ['taylor-series', 'general-term', 'power-series-center'],
      commonMistakes: [
        'Forgetting to divide by n!',
        'Using f(a) instead of f⁽ⁿ⁾(a)',
        'Confusing with Maclaurin (a = 0 case)'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['calculus', 'series', 'taylor', 'formula', 'grade-12']
    }
  }
]

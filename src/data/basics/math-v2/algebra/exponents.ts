/**
 * Exponents and Radicals - MathProblemV2 Format
 * 
 * Topics covered:
 * - Product rule (G8)
 * - Power rule (G8)
 * - Quotient rule (G8)
 * - Negative exponents (G9)
 * - Power of a product (G9)
 * - Simplifying radicals (G9)
 * - Adding radicals (G9)
 * - Rationalizing denominators (G10)
 * - Logarithms (G10)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const EXPONENTS_V2: MathProblemV2[] = [
  // ============================================================================
  // PRODUCT RULE (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-exp-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Simplify: x⁵ · x³',
      latex: 'x^5 \\cdot x^3'
    },
    answer: {
      type: 'expression',
      correct: 'x^8',
      acceptable: ['x^8', 'x⁸']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the product rule: aᵐ · aⁿ = aᵐ⁺ⁿ', latex: 'x^5 \\cdot x^3 = x^{5+3}' },
        { number: 2, description: 'Add the exponents', latex: 'x^8' }
      ],
      method: 'Product of powers rule'
    },
    hints: [
      { level: 'gentle', text: 'When multiplying same bases, what do you do with the exponents?' },
      { level: 'moderate', text: 'Add the exponents: 5 + 3' },
      { level: 'explicit', text: 'x⁵ · x³ = x⁸' }
    ],
    pedagogy: {
      topic: 'Exponents',
      subTopic: 'Product rule',
      skills: ['algebra_basics'],
      prerequisites: ['exponent-basics'],
      concepts: ['product-of-powers', 'adding-exponents'],
      commonMistakes: ['Multiplying exponents instead of adding'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponents', 'product-rule']
    }
  },
  {
    id: 'alg-v2-g10-exp-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Simplify: 2³ × 2⁵',
      latex: '2^3 \\times 2^5'
    },
    answer: {
      type: 'expression',
      correct: '2^8',
      acceptable: ['256', '2**8', '2^8', '2⁸']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the product rule', latex: '2^3 \\times 2^5 = 2^{3+5}' },
        { number: 2, description: 'Add exponents', latex: '= 2^8' },
        { number: 3, description: 'Optionally calculate', latex: '= 256' }
      ],
      method: 'Product of powers'
    },
    hints: [
      { level: 'gentle', text: 'Same base, so add the exponents.' },
      { level: 'moderate', text: '2³ × 2⁵ = 2^(3+5)' },
      { level: 'explicit', text: '= 2⁸ = 256' }
    ],
    pedagogy: {
      topic: 'Exponents',
      subTopic: 'Product of powers',
      skills: ['algebra_basics'],
      prerequisites: ['exponent-basics'],
      concepts: ['product-of-powers'],
      commonMistakes: ['Multiplying exponents instead of adding'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponents', 'product-rule']
    }
  },

  // ============================================================================
  // POWER RULE (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-exp-002',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Simplify: (x⁴)²',
      latex: '(x^4)^2'
    },
    answer: {
      type: 'expression',
      correct: 'x^8',
      acceptable: ['x^8', 'x⁸']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the power rule: (aᵐ)ⁿ = aᵐⁿ', latex: '(x^4)^2 = x^{4 \\times 2}' },
        { number: 2, description: 'Multiply the exponents', latex: 'x^8' }
      ],
      method: 'Power of a power rule'
    },
    hints: [
      { level: 'gentle', text: 'When raising a power to a power, what do you do with exponents?' },
      { level: 'moderate', text: 'Multiply the exponents: 4 × 2' },
      { level: 'explicit', text: '(x⁴)² = x⁸' }
    ],
    pedagogy: {
      topic: 'Exponents',
      subTopic: 'Power rule',
      skills: ['algebra_basics'],
      prerequisites: ['exponent-basics'],
      concepts: ['power-of-power', 'multiplying-exponents'],
      commonMistakes: ['Adding exponents instead of multiplying'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponents', 'power-rule']
    }
  },

  // ============================================================================
  // QUOTIENT RULE (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-exp-003',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Simplify: x⁷/x³',
      latex: '\\frac{x^7}{x^3}'
    },
    answer: {
      type: 'expression',
      correct: 'x^4',
      acceptable: ['x^4', 'x⁴']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the quotient rule: aᵐ/aⁿ = aᵐ⁻ⁿ', latex: '\\frac{x^7}{x^3} = x^{7-3}' },
        { number: 2, description: 'Subtract the exponents', latex: 'x^4' }
      ],
      method: 'Quotient of powers rule'
    },
    hints: [
      { level: 'gentle', text: 'When dividing same bases, subtract the exponents.' },
      { level: 'moderate', text: '7 - 3 = 4' },
      { level: 'explicit', text: 'x⁷/x³ = x⁴' }
    ],
    pedagogy: {
      topic: 'Exponents',
      subTopic: 'Quotient rule',
      skills: ['algebra_basics'],
      prerequisites: ['exponent-basics'],
      concepts: ['quotient-of-powers', 'subtracting-exponents'],
      commonMistakes: ['Adding instead of subtracting', 'Wrong order of subtraction'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponents', 'quotient-rule']
    }
  },

  // ============================================================================
  // NEGATIVE EXPONENTS (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-exp-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Simplify: x⁻³',
      latex: 'x^{-3}'
    },
    answer: {
      type: 'expression',
      correct: '1/x³',
      acceptable: ['1/x^3', '1/x³', 'x^(-3)']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the negative exponent rule: a⁻ⁿ = 1/aⁿ', latex: 'x^{-3} = \\frac{1}{x^3}' }
      ],
      method: 'Negative exponent rule'
    },
    hints: [
      { level: 'gentle', text: 'A negative exponent means the reciprocal.' },
      { level: 'moderate', text: 'x⁻³ = 1/x³' },
      { level: 'explicit', text: '1/x³' }
    ],
    pedagogy: {
      topic: 'Exponents',
      subTopic: 'Negative exponents',
      skills: ['algebra_basics'],
      prerequisites: ['exponent-basics', 'fractions'],
      concepts: ['negative-exponent', 'reciprocal'],
      commonMistakes: ['Making the base negative', 'Forgetting the reciprocal'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponents', 'negative']
    }
  },

  // ============================================================================
  // POWER OF A PRODUCT (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-exp-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Simplify: (2x³)⁴',
      latex: '(2x^3)^4'
    },
    answer: {
      type: 'expression',
      correct: '16x^12',
      acceptable: ['16x^12', '16x¹²']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply power to coefficient and variable', latex: '(2x^3)^4 = 2^4 \\cdot (x^3)^4' },
        { number: 2, description: 'Calculate 2⁴', latex: '= 16 \\cdot (x^3)^4' },
        { number: 3, description: 'Apply power rule to x³', latex: '= 16 \\cdot x^{12}' },
        { number: 4, description: 'Write final answer', latex: '= 16x^{12}' }
      ],
      method: 'Power of a product rule'
    },
    hints: [
      { level: 'gentle', text: 'Apply the exponent to both the 2 and the x³.' },
      { level: 'moderate', text: '2⁴ = 16 and (x³)⁴ = x¹²' },
      { level: 'explicit', text: '16x¹²' }
    ],
    pedagogy: {
      topic: 'Exponents',
      subTopic: 'Power of a product',
      skills: ['algebra_basics'],
      prerequisites: ['power-rule'],
      concepts: ['power-of-product', 'distributing-exponents'],
      commonMistakes: ['Only applying to one factor', 'Multiplication error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponents', 'power-of-product']
    }
  },
  {
    id: 'alg-v2-g10-exp-002',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Simplify: (3x²y³)(−2xy⁴)',
      latex: '(3x^2y^3)(-2xy^4)'
    },
    answer: {
      type: 'expression',
      correct: '-6x^3y^7',
      acceptable: ['-6x³y⁷', '-6*x^3*y^7', '-6x^3y^7']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply coefficients', latex: '3 \\times (-2) = -6' },
        { number: 2, description: 'Add exponents for x', latex: 'x^{2+1} = x^3' },
        { number: 3, description: 'Add exponents for y', latex: 'y^{3+4} = y^7' },
        { number: 4, description: 'Combine', latex: '-6x^3y^7' }
      ],
      method: 'Multiply monomials'
    },
    hints: [
      { level: 'gentle', text: 'Multiply coefficients, add exponents for each variable.' },
      { level: 'moderate', text: '3 × (-2) = -6, x² × x = x³, y³ × y⁴ = y⁷' },
      { level: 'explicit', text: '-6x³y⁷' }
    ],
    pedagogy: {
      topic: 'Exponents',
      subTopic: 'Multiplying monomials',
      skills: ['algebra_basics'],
      prerequisites: ['product-rule'],
      concepts: ['multiplying-monomials', 'product-rule'],
      commonMistakes: ['Sign error', 'Exponent error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponents', 'monomials']
    }
  },

  // ============================================================================
  // SIMPLIFYING RADICALS (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-rad-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Simplify: √72',
      latex: '\\sqrt{72}'
    },
    answer: {
      type: 'expression',
      correct: '6√2',
      acceptable: ['6√2', '6*sqrt(2)', '6 sqrt 2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor 72 to find perfect squares', latex: '72 = 36 \\times 2' },
        { number: 2, description: 'Apply the product rule for radicals', latex: '\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\times \\sqrt{2}' },
        { number: 3, description: 'Simplify √36', latex: '= 6\\sqrt{2}' }
      ],
      method: 'Factor out perfect squares'
    },
    hints: [
      { level: 'gentle', text: 'Find the largest perfect square factor of 72.' },
      { level: 'moderate', text: '72 = 36 × 2, and √36 = 6' },
      { level: 'explicit', text: '√72 = 6√2' }
    ],
    pedagogy: {
      topic: 'Radicals',
      subTopic: 'Simplifying radicals',
      skills: ['algebra_basics'],
      prerequisites: ['square-roots', 'factoring'],
      concepts: ['perfect-squares', 'simplifying-radicals'],
      commonMistakes: ['Not finding largest perfect square', 'Calculation error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['radicals', 'simplify']
    }
  },
  {
    id: 'alg-v2-g10-rad-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Simplify: √48',
      latex: '\\sqrt{48}'
    },
    answer: {
      type: 'expression',
      correct: '4√3',
      acceptable: ['4√3', '4*√3', '4 sqrt(3)', '4 sqrt 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor 48 to find perfect squares', latex: '48 = 16 \\times 3' },
        { number: 2, description: 'Apply the product rule', latex: '\\sqrt{48} = \\sqrt{16 \\times 3} = \\sqrt{16} \\times \\sqrt{3}' },
        { number: 3, description: 'Simplify', latex: '= 4\\sqrt{3}' }
      ],
      method: 'Factor out perfect squares'
    },
    hints: [
      { level: 'gentle', text: 'Find the largest perfect square factor of 48.' },
      { level: 'moderate', text: '48 = 16 × 3, and √16 = 4' },
      { level: 'explicit', text: '√48 = 4√3' }
    ],
    pedagogy: {
      topic: 'Radicals',
      subTopic: 'Simplifying square roots',
      skills: ['algebra_basics'],
      prerequisites: ['square-roots'],
      concepts: ['perfect-squares', 'simplifying-radicals'],
      commonMistakes: ['Wrong perfect square', 'Incomplete simplification'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['radicals', 'simplify']
    }
  },

  // ============================================================================
  // ADDING RADICALS (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-rad-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Simplify: √50 + √18',
      latex: '\\sqrt{50} + \\sqrt{18}'
    },
    answer: {
      type: 'expression',
      correct: '8√2',
      acceptable: ['8√2', '8*sqrt(2)', '8 sqrt 2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Simplify √50', latex: '\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}' },
        { number: 2, description: 'Simplify √18', latex: '\\sqrt{18} = \\sqrt{9 \\times 2} = 3\\sqrt{2}' },
        { number: 3, description: 'Add like radicals', latex: '5\\sqrt{2} + 3\\sqrt{2} = 8\\sqrt{2}' }
      ],
      method: 'Simplify then combine like radicals'
    },
    hints: [
      { level: 'gentle', text: 'Simplify each radical first.' },
      { level: 'moderate', text: '√50 = 5√2 and √18 = 3√2' },
      { level: 'explicit', text: '5√2 + 3√2 = 8√2' }
    ],
    pedagogy: {
      topic: 'Radicals',
      subTopic: 'Adding radicals',
      skills: ['algebra_basics'],
      prerequisites: ['simplifying-radicals'],
      concepts: ['like-radicals', 'combining-radicals'],
      commonMistakes: ['Adding without simplifying first', 'Combining unlike radicals'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['radicals', 'adding']
    }
  },

  // ============================================================================
  // RATIONALIZING DENOMINATORS (Grade 10)
  // ============================================================================
  {
    id: 'alg-v2-g10-rat-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Rationalize the denominator: 3/√5',
      latex: '\\frac{3}{\\sqrt{5}}'
    },
    answer: {
      type: 'expression',
      correct: '3√5/5',
      acceptable: ['(3√5)/5', '3*sqrt(5)/5', '(3/5)√5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply by √5/√5', latex: '\\frac{3}{\\sqrt{5}} \\times \\frac{\\sqrt{5}}{\\sqrt{5}}' },
        { number: 2, description: 'Simplify', latex: '= \\frac{3\\sqrt{5}}{5}' }
      ],
      method: 'Multiply by radical over itself'
    },
    hints: [
      { level: 'gentle', text: 'Multiply top and bottom by √5.' },
      { level: 'moderate', text: '3/√5 × √5/√5' },
      { level: 'explicit', text: '= 3√5/5' }
    ],
    pedagogy: {
      topic: 'Radicals',
      subTopic: 'Rationalizing denominators',
      skills: ['algebra_basics'],
      prerequisites: ['radicals', 'fractions'],
      concepts: ['rationalizing', 'conjugate'],
      commonMistakes: ['Only multiplying one part', 'Simplification error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['radicals', 'rationalize']
    }
  },

  // ============================================================================
  // LOGARITHMS (Grade 10)
  // ============================================================================
  {
    id: 'alg-v2-g10-log-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve for x: log₂(x) = 4',
      latex: '\\log_2(x) = 4'
    },
    answer: {
      type: 'numeric',
      correct: '16',
      acceptable: ['16', 'x = 16']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'log(x)/log(2)', color: '#3B82F6', label: 'y = log₂(x)' },
          { expression: '4', color: '#EF4444', label: 'y = 4' }
        ],
        domain: [0, 20],
        range: [0, 6],
        showGrid: true,
        points: [
          { x: 16, y: 4, label: 'x = 16', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert to exponential form', latex: '\\log_2(x) = 4 \\Rightarrow 2^4 = x' },
        { number: 2, description: 'Calculate', latex: 'x = 16' }
      ],
      method: 'Convert to exponential form'
    },
    hints: [
      { level: 'gentle', text: 'log₂(x) = 4 means 2 raised to what power gives x?' },
      { level: 'moderate', text: '2⁴ = x' },
      { level: 'explicit', text: 'x = 16' }
    ],
    pedagogy: {
      topic: 'Logarithms',
      subTopic: 'Basic logarithmic equations',
      skills: ['advanced_algebra'],
      prerequisites: ['exponents'],
      concepts: ['log-to-exponential', 'inverse-functions'],
      commonMistakes: ['Wrong conversion direction', 'Exponent calculation error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['logarithms', 'solving']
    }
  },
  {
    id: 'alg-v2-g10-log-002',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Simplify: log₃(9)',
      latex: '\\log_3(9)'
    },
    answer: {
      type: 'numeric',
      correct: '2',
      acceptable: ['2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Ask: 3 to what power equals 9?', latex: '3^? = 9' },
        { number: 2, description: 'Since 3² = 9', latex: '\\log_3(9) = 2' }
      ],
      method: 'Definition of logarithm'
    },
    hints: [
      { level: 'gentle', text: 'What power of 3 equals 9?' },
      { level: 'moderate', text: '3² = 9' },
      { level: 'explicit', text: 'log₃(9) = 2' }
    ],
    pedagogy: {
      topic: 'Logarithms',
      subTopic: 'Evaluating logarithms',
      skills: ['advanced_algebra'],
      prerequisites: ['exponents'],
      concepts: ['logarithm-definition'],
      commonMistakes: ['Confusing base and result'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['logarithms', 'evaluate']
    }
  },
  {
    id: 'alg-v2-g10-log-003',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Simplify: log₁₀(1000)',
      latex: '\\log_{10}(1000)'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Ask: 10 to what power equals 1000?', latex: '10^? = 1000' },
        { number: 2, description: 'Since 10³ = 1000', latex: '\\log_{10}(1000) = 3' }
      ],
      method: 'Definition of logarithm'
    },
    hints: [
      { level: 'gentle', text: 'What power of 10 equals 1000?' },
      { level: 'moderate', text: '10³ = 1000' },
      { level: 'explicit', text: 'log₁₀(1000) = 3' }
    ],
    pedagogy: {
      topic: 'Logarithms',
      subTopic: 'Evaluating logarithms',
      skills: ['advanced_algebra'],
      prerequisites: ['exponents'],
      concepts: ['logarithm-definition', 'common-log'],
      commonMistakes: ['Counting zeros incorrectly'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['logarithms', 'evaluate', 'common-log']
    }
  },

  // ============================================================================
  // EXPONENTIAL EQUATIONS (Grade 10)
  // ============================================================================
  {
    id: 'alg-v2-g10-exp-solve-001',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: 2^(x+1) = 16',
      latex: '2^{x+1} = 16'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', 'x = 3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2^(x+1)', color: '#3B82F6', label: 'y = 2^(x+1)' },
          { expression: '16', color: '#EF4444', label: 'y = 16' }
        ],
        domain: [-2, 5],
        range: [0, 20],
        showGrid: true,
        points: [
          { x: 3, y: 16, label: 'Solution (3, 16)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Express 16 as a power of 2', latex: '16 = 2^4' },
        { number: 2, description: 'Rewrite equation with same base', latex: '2^{x+1} = 2^4' },
        { number: 3, description: 'Set exponents equal', latex: 'x + 1 = 4' },
        { number: 4, description: 'Solve for x', latex: 'x = 3' }
      ],
      method: 'Same base method'
    },
    hints: [
      { level: 'gentle', text: 'Express 16 as a power of 2.' },
      { level: 'moderate', text: '16 = 2⁴, so 2^(x+1) = 2⁴' },
      { level: 'explicit', text: 'x + 1 = 4, so x = 3' }
    ],
    pedagogy: {
      topic: 'Exponential Equations',
      subTopic: 'Same base method',
      skills: ['advanced_algebra'],
      prerequisites: ['exponents'],
      concepts: ['same-base-property', 'exponential-equations'],
      commonMistakes: ['Wrong power of 2', 'Arithmetic error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponential', 'solving']
    }
  },
  {
    id: 'alg-v2-g10-exp-solve-002',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: 5^x = 125',
      latex: '5^x = 125'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', 'x = 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Express 125 as a power of 5', latex: '125 = 5^3' },
        { number: 2, description: 'Set exponents equal', latex: '5^x = 5^3 \\Rightarrow x = 3' }
      ],
      method: 'Same base method'
    },
    hints: [
      { level: 'gentle', text: 'Express 125 as a power of 5.' },
      { level: 'moderate', text: '125 = 5³' },
      { level: 'explicit', text: 'x = 3' }
    ],
    pedagogy: {
      topic: 'Exponential Equations',
      subTopic: 'Same base method',
      skills: ['advanced_algebra'],
      prerequisites: ['exponents'],
      concepts: ['same-base-property'],
      commonMistakes: ['Wrong calculation of 5³'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['exponential', 'solving']
    }
  }
]

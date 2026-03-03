/**
 * Calculus - Derivatives (MathProblemV2 format)
 * Grade levels: 10-12
 * 
 * Topics covered:
 * - Definition of derivative
 * - Power rule
 * - Product rule
 * - Quotient rule
 * - Chain rule
 * - Trigonometric derivatives
 * - Exponential and logarithmic derivatives
 * - Higher-order derivatives
 * - Implicit differentiation
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const DERIVATIVES_PROBLEMS_V2: MathProblemV2[] = [
  // --- DEFINITION OF DERIVATIVE ---
  {
    id: 'calc-v2-g10-deriv-001',
    version: 2,
    type: 'calculus',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Using the limit definition, find f\'(x) if f(x) = x².',
      latex: 'f(x) = x^2, \\quad f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}'
    },
    answer: {
      type: 'expression',
      correct: '2x',
      acceptable: ['2*x']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2', color: '#2563eb', label: 'f(x) = x²' },
          { expression: '2*3*(x - 3) + 9', color: '#dc2626', style: 'dashed', label: 'tangent at x=3' }
        ],
        domain: [-1, 6],
        range: [-2, 20],
        showGrid: true,
        points: [{ x: 3, y: 9, label: 'tangent point', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the limit definition', latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h}' },
        { number: 2, description: 'Expand (x+h)²', latex: '= \\lim_{h \\to 0} \\frac{x^2 + 2xh + h^2 - x^2}{h}' },
        { number: 3, description: 'Simplify the numerator', latex: '= \\lim_{h \\to 0} \\frac{2xh + h^2}{h}' },
        { number: 4, description: 'Factor out h and cancel', latex: '= \\lim_{h \\to 0} \\frac{h(2x + h)}{h} = \\lim_{h \\to 0} (2x + h)' },
        { number: 5, description: 'Evaluate the limit', latex: '= 2x' }
      ],
      method: 'Limit definition of derivative'
    },
    hints: [
      { level: 'gentle', text: 'Start by expanding (x+h)² in the numerator.' },
      { level: 'moderate', text: '(x+h)² = x² + 2xh + h². The x² terms cancel.' },
      { level: 'explicit', text: 'Factor h from numerator, cancel with denominator, then let h → 0.' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Definition of derivative',
      skills: ['derivatives', 'limits'],
      prerequisites: ['limits', 'algebra'],
      concepts: ['rate-of-change', 'tangent-line'],
      commonMistakes: ['Algebraic errors in expansion', 'Not canceling h before taking limit'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'definition', 'limit']
    }
  },

  // --- POWER RULE ---
  {
    id: 'calc-v2-g11-deriv-002',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find the derivative of f(x) = x².',
      latex: 'f(x) = x^2, \\text{ find } f\'(x)'
    },
    answer: {
      type: 'expression',
      correct: '2x',
      acceptable: ['2*x']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2', color: '#2563eb', label: 'f(x) = x²' },
          { expression: '2*x', color: '#059669', label: "f'(x) = 2x" }
        ],
        domain: [-3, 3],
        range: [-5, 10],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply power rule', latex: '\\frac{d}{dx}x^n = nx^{n-1}' },
        { number: 2, description: 'With n = 2', latex: '\\frac{d}{dx}x^2 = 2x^{2-1} = 2x^1 = 2x' }
      ],
      method: 'Power rule'
    },
    hints: [
      { level: 'gentle', text: 'Use the power rule: d/dx(xⁿ) = nxⁿ⁻¹' },
      { level: 'moderate', text: 'Bring down the exponent (2), reduce by 1.' },
      { level: 'explicit', text: '2 × x^(2-1) = 2x' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Power rule',
      skills: ['derivatives'],
      prerequisites: ['algebra'],
      concepts: ['power-rule'],
      commonMistakes: ['Forgetting to reduce exponent', 'Leaving exponent unchanged'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'power-rule']
    }
  },

  // --- POLYNOMIAL DERIVATIVE ---
  {
    id: 'calc-v2-g12-deriv-003',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the derivative: f(x) = 3x⁴ − 2x³ + 5x − 7',
      latex: 'f(x) = 3x^4 - 2x^3 + 5x - 7'
    },
    answer: {
      type: 'expression',
      correct: '12x^3 - 6x^2 + 5',
      acceptable: ['12x³ − 6x² + 5', '12x^3-6x^2+5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Differentiate each term using power rule', latex: '\\frac{d}{dx}(3x^4) = 12x^3' },
        { number: 2, description: 'Second term', latex: '\\frac{d}{dx}(-2x^3) = -6x^2' },
        { number: 3, description: 'Third term', latex: '\\frac{d}{dx}(5x) = 5' },
        { number: 4, description: 'Constant term', latex: '\\frac{d}{dx}(-7) = 0' },
        { number: 5, description: 'Combine', latex: "f'(x) = 12x^3 - 6x^2 + 5" }
      ],
      method: 'Power rule for each term'
    },
    hints: [
      { level: 'gentle', text: 'Apply power rule to each term separately.' },
      { level: 'moderate', text: 'd/dx(xⁿ) = nxⁿ⁻¹. The derivative of a constant is 0.' },
      { level: 'explicit', text: '3·4x³ = 12x³, −2·3x² = −6x², 5·1 = 5, constant → 0' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Power rule',
      skills: ['derivatives'],
      prerequisites: ['algebra', 'polynomials'],
      concepts: ['power-rule', 'sum-rule'],
      commonMistakes: ['Forgetting constant derivative is 0', 'Arithmetic errors'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'power-rule', 'polynomial']
    }
  },

  // --- PRODUCT RULE ---
  {
    id: 'calc-v2-g12-deriv-004',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the derivative: f(x) = (2x + 1)(x² − 3)',
      latex: 'f(x) = (2x + 1)(x^2 - 3)'
    },
    answer: {
      type: 'expression',
      correct: '6x^2 + 2x - 6',
      acceptable: ['6x² + 2x − 6', '6x^2+2x-6']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify u and v', latex: 'u = 2x + 1, \\quad v = x^2 - 3' },
        { number: 2, description: 'Find u\' and v\'', latex: "u' = 2, \\quad v' = 2x" },
        { number: 3, description: 'Apply product rule: (uv)\' = u\'v + uv\'', latex: "f'(x) = 2(x^2 - 3) + (2x + 1)(2x)" },
        { number: 4, description: 'Expand first term', latex: '2x^2 - 6' },
        { number: 5, description: 'Expand second term', latex: '4x^2 + 2x' },
        { number: 6, description: 'Combine like terms', latex: "f'(x) = 6x^2 + 2x - 6" }
      ],
      method: 'Product rule'
    },
    hints: [
      { level: 'gentle', text: 'Use the product rule: (uv)\' = u\'v + uv\'' },
      { level: 'moderate', text: 'Let u = 2x + 1, v = x² − 3. Find u\' and v\'.' },
      { level: 'explicit', text: '2(x² − 3) + (2x + 1)(2x) = 2x² − 6 + 4x² + 2x = 6x² + 2x − 6' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Product rule',
      skills: ['derivatives'],
      prerequisites: ['algebra', 'power_rule'],
      concepts: ['product-rule'],
      commonMistakes: ['Forgetting to multiply u\'v + uv\'', 'Expansion errors'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'product-rule']
    }
  },

  // --- QUOTIENT RULE ---
  {
    id: 'calc-v2-g12-deriv-005',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the derivative: f(x) = (x² + 1)/(2x − 1)',
      latex: 'f(x) = \\frac{x^2 + 1}{2x - 1}'
    },
    answer: {
      type: 'expression',
      correct: '(2x^2 - 2x - 2)/(2x - 1)^2',
      acceptable: ['(2x² − 2x − 2)/(2x − 1)²']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify u and v', latex: 'u = x^2 + 1, \\quad v = 2x - 1' },
        { number: 2, description: 'Find u\' and v\'', latex: "u' = 2x, \\quad v' = 2" },
        { number: 3, description: 'Apply quotient rule', latex: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}" },
        { number: 4, description: 'Substitute', latex: "f'(x) = \\frac{2x(2x-1) - (x^2+1)(2)}{(2x-1)^2}" },
        { number: 5, description: 'Expand numerator', latex: '= \\frac{4x^2 - 2x - 2x^2 - 2}{(2x-1)^2}' },
        { number: 6, description: 'Simplify', latex: '= \\frac{2x^2 - 2x - 2}{(2x-1)^2}' }
      ],
      method: 'Quotient rule'
    },
    hints: [
      { level: 'gentle', text: 'Use quotient rule: (u/v)\' = (u\'v − uv\')/v²' },
      { level: 'moderate', text: '"Low d-high minus high d-low, over the square of what\'s below"' },
      { level: 'explicit', text: '[2x(2x-1) − (x²+1)(2)] / (2x-1)²' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Quotient rule',
      skills: ['derivatives'],
      prerequisites: ['algebra', 'power_rule'],
      concepts: ['quotient-rule'],
      commonMistakes: ['Order of subtraction', 'Forgetting to square denominator'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'quotient-rule']
    }
  },

  // --- CHAIN RULE ---
  {
    id: 'calc-v2-g12-deriv-006',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the derivative: f(x) = (3x² + 2)⁵',
      latex: 'f(x) = (3x^2 + 2)^5'
    },
    answer: {
      type: 'expression',
      correct: '30x(3x^2 + 2)^4',
      acceptable: ['30x(3x² + 2)⁴', '5(3x^2 + 2)^4 * 6x']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(3*x^2 + 2)^5', color: '#2563eb', label: 'f(x) = (3x² + 2)⁵' }
        ],
        domain: [-1, 1],
        range: [0, 100],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify outer and inner functions', latex: '\\text{Outer: } u^5, \\quad \\text{Inner: } u = 3x^2 + 2' },
        { number: 2, description: 'Derivative of outer (chain rule)', latex: '\\frac{d}{du}u^5 = 5u^4' },
        { number: 3, description: 'Derivative of inner', latex: '\\frac{d}{dx}(3x^2 + 2) = 6x' },
        { number: 4, description: 'Apply chain rule: multiply', latex: "f'(x) = 5(3x^2 + 2)^4 \\cdot 6x" },
        { number: 5, description: 'Simplify', latex: '= 30x(3x^2 + 2)^4' }
      ],
      method: 'Chain rule'
    },
    hints: [
      { level: 'gentle', text: 'Use chain rule: derivative of outside × derivative of inside.' },
      { level: 'moderate', text: 'Outside: ( )⁵ → 5( )⁴. Inside: 3x² + 2 → 6x.' },
      { level: 'explicit', text: '5(3x² + 2)⁴ · 6x = 30x(3x² + 2)⁴' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Chain rule',
      skills: ['derivatives'],
      prerequisites: ['power_rule'],
      concepts: ['chain-rule', 'composition'],
      commonMistakes: ['Forgetting to multiply by inner derivative', 'Wrong order'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'chain-rule']
    }
  },

  // --- TRIGONOMETRIC DERIVATIVES ---
  {
    id: 'calc-v2-g12-deriv-007',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find f\'(x) if f(x) = sin(x)',
      latex: 'f(x) = \\sin(x), \\text{ find } f\'(x)'
    },
    answer: {
      type: 'expression',
      correct: 'cos(x)',
      acceptable: ['cos x', 'cosx']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'sin(x)', color: '#2563eb', label: 'f(x) = sin(x)' },
          { expression: 'cos(x)', color: '#059669', label: "f'(x) = cos(x)" }
        ],
        domain: [-6.28, 6.28],
        range: [-1.5, 1.5],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'This is a standard trigonometric derivative', latex: '\\frac{d}{dx}\\sin(x) = \\cos(x)' },
        { number: 2, description: 'Memorize the basic trig derivatives', latex: '\\text{sin} \\to \\text{cos}, \\quad \\text{cos} \\to -\\text{sin}' }
      ],
      method: 'Standard derivative'
    },
    hints: [
      { level: 'gentle', text: 'This is a standard trigonometric derivative.' },
      { level: 'moderate', text: 'd/dx(sin x) = ?' },
      { level: 'explicit', text: 'The derivative of sin(x) is cos(x).' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Trigonometric derivatives',
      skills: ['derivatives', 'trigonometry'],
      prerequisites: ['trigonometry'],
      concepts: ['trig-derivatives'],
      commonMistakes: ['Confusing sin and cos derivatives', 'Missing negative sign'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'trigonometry']
    }
  },

  // --- EXPONENTIAL DERIVATIVE ---
  {
    id: 'calc-v2-g12-deriv-008',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find f\'(x) if f(x) = eˣ',
      latex: 'f(x) = e^x, \\text{ find } f\'(x)'
    },
    answer: {
      type: 'expression',
      correct: 'e^x',
      acceptable: ['eˣ', 'exp(x)']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'exp(x)', color: '#2563eb', label: 'f(x) = eˣ (also its derivative!)' }
        ],
        domain: [-3, 3],
        range: [-1, 10],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'eˣ is its own derivative', latex: '\\frac{d}{dx}e^x = e^x' },
        { number: 2, description: 'This is a unique property of the exponential function', latex: 'f(x) = f\'(x) = e^x' }
      ],
      method: 'Standard derivative'
    },
    hints: [
      { level: 'gentle', text: 'The exponential function eˣ has a special property.' },
      { level: 'moderate', text: 'What function equals its own derivative?' },
      { level: 'explicit', text: 'd/dx(eˣ) = eˣ' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Exponential derivatives',
      skills: ['derivatives', 'exponentials'],
      prerequisites: ['exponentials'],
      concepts: ['exponential-derivative'],
      commonMistakes: ['Adding exponent like power rule'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'exponential']
    }
  },

  // --- LOGARITHMIC DERIVATIVE ---
  {
    id: 'calc-v2-g12-deriv-009',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find f\'(x) if f(x) = ln(x)',
      latex: 'f(x) = \\ln(x), \\text{ find } f\'(x)'
    },
    answer: {
      type: 'expression',
      correct: '1/x',
      acceptable: ['x^(-1)']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'ln(x)', color: '#2563eb', label: 'f(x) = ln(x)' },
          { expression: '1/x', color: '#059669', label: "f'(x) = 1/x" }
        ],
        domain: [0.1, 5],
        range: [-3, 3],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Standard logarithmic derivative', latex: '\\frac{d}{dx}\\ln(x) = \\frac{1}{x}' },
        { number: 2, description: 'Note: x must be positive', latex: 'x > 0' }
      ],
      method: 'Standard derivative'
    },
    hints: [
      { level: 'gentle', text: 'This is a standard logarithmic derivative.' },
      { level: 'moderate', text: 'd/dx(ln x) = ?' },
      { level: 'explicit', text: 'The derivative of ln(x) is 1/x.' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Logarithmic derivatives',
      skills: ['derivatives', 'logarithms'],
      prerequisites: ['logarithms'],
      concepts: ['log-derivative'],
      commonMistakes: ['Using power rule on logarithm'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'logarithm']
    }
  },

  // --- IMPLICIT DIFFERENTIATION ---
  {
    id: 'calc-v2-g12-deriv-010',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find dy/dx if x² + y² = 25.',
      latex: 'x^2 + y^2 = 25, \\text{ find } \\frac{dy}{dx}'
    },
    answer: {
      type: 'expression',
      correct: '-x/y',
      acceptable: ['-x / y']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'sqrt(25 - x^2)', color: '#2563eb', label: 'upper semicircle' },
          { expression: '-sqrt(25 - x^2)', color: '#2563eb', label: 'lower semicircle' }
        ],
        domain: [-6, 6],
        range: [-6, 6],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Differentiate both sides with respect to x', latex: '\\frac{d}{dx}(x^2 + y^2) = \\frac{d}{dx}(25)' },
        { number: 2, description: 'Apply chain rule to y²', latex: '2x + 2y\\frac{dy}{dx} = 0' },
        { number: 3, description: 'Solve for dy/dx', latex: '2y\\frac{dy}{dx} = -2x' },
        { number: 4, description: 'Simplify', latex: '\\frac{dy}{dx} = -\\frac{x}{y}' }
      ],
      method: 'Implicit differentiation'
    },
    hints: [
      { level: 'gentle', text: 'Differentiate both sides, using chain rule for y² (since y depends on x).' },
      { level: 'moderate', text: 'd/dx(y²) = 2y · dy/dx by chain rule.' },
      { level: 'explicit', text: '2x + 2y(dy/dx) = 0, so dy/dx = -x/y.' }
    ],
    pedagogy: {
      topic: 'Derivatives',
      subTopic: 'Implicit differentiation',
      skills: ['derivatives', 'implicit'],
      prerequisites: ['chain_rule'],
      concepts: ['implicit-differentiation'],
      commonMistakes: ['Forgetting chain rule for y', 'Sign errors'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['derivatives', 'implicit']
    }
  }
]

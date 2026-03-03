/**
 * Calculus - Integration (MathProblemV2 format)
 * Grade levels: 11-12
 * 
 * Topics covered:
 * - Riemann sums
 * - Basic antiderivatives
 * - Power rule for integration
 * - Definite integrals
 * - Fundamental Theorem of Calculus
 * - U-substitution
 * - Integration by parts
 * - Trigonometric integrals
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const INTEGRATION_PROBLEMS_V2: MathProblemV2[] = [
  // --- RIEMANN SUMS ---
  {
    id: 'calc-v2-g11-int-001',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'A region under a curve is divided into 4 rectangles with heights 2, 3, 5, 6 and each width 1. Estimate the total area.',
      latex: '\\text{Heights: } 2, 3, 5, 6 \\quad \\text{Width: } 1 \\quad A \\approx ?'
    },
    answer: {
      type: 'exact',
      correct: '16',
      acceptable: ['16.0', '16 square units']
    },
    visuals: {
      diagram: {
        type: 'bar-chart',
        width: 300,
        height: 200,
        description: 'Four rectangles of width 1 and heights 2, 3, 5, 6 representing Riemann sum approximation',
        svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="160" width="220" height="2" fill="#374151"/>
          <rect x="40" y="100" width="1" height="60" fill="#374151"/>
          <rect x="50" y="100" width="45" height="60" fill="#3b82f6" fill-opacity="0.7" stroke="#1d4ed8"/>
          <rect x="100" y="85" width="45" height="75" fill="#3b82f6" fill-opacity="0.7" stroke="#1d4ed8"/>
          <rect x="150" y="60" width="45" height="100" fill="#3b82f6" fill-opacity="0.7" stroke="#1d4ed8"/>
          <rect x="200" y="40" width="45" height="120" fill="#3b82f6" fill-opacity="0.7" stroke="#1d4ed8"/>
          <text x="72" y="135" font-size="10" text-anchor="middle" fill="white" font-weight="bold">2</text>
          <text x="122" y="125" font-size="10" text-anchor="middle" fill="white" font-weight="bold">3</text>
          <text x="172" y="115" font-size="10" text-anchor="middle" fill="white" font-weight="bold">5</text>
          <text x="222" y="105" font-size="10" text-anchor="middle" fill="white" font-weight="bold">6</text>
          <text x="150" y="185" font-size="11" text-anchor="middle" fill="#374151">Area ≈ 16</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Area of each rectangle = height × width', latex: 'A_i = h_i \\times 1' },
        { number: 2, description: 'Sum all rectangle areas', latex: 'A = 2(1) + 3(1) + 5(1) + 6(1)' },
        { number: 3, description: 'Calculate', latex: 'A = 2 + 3 + 5 + 6 = 16' }
      ],
      method: 'Riemann sum'
    },
    hints: [
      { level: 'gentle', text: 'Area of each rectangle = height × width.' },
      { level: 'moderate', text: 'Add all the rectangle areas together.' },
      { level: 'explicit', text: '2 + 3 + 5 + 6 = 16 square units.' }
    ],
    pedagogy: {
      topic: 'Integration',
      subTopic: 'Riemann sums',
      skills: ['integration', 'area'],
      prerequisites: ['algebra', 'geometry'],
      concepts: ['riemann-sum', 'area-approximation'],
      commonMistakes: ['Forgetting to multiply by width', 'Addition errors'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['integration', 'riemann-sum', 'area']
    }
  },

  // --- BASIC ANTIDERIVATIVE ---
  {
    id: 'calc-v2-g11-int-002',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find: ∫ 3x² dx',
      latex: '\\int 3x^2 \\, dx'
    },
    answer: {
      type: 'expression',
      correct: 'x^3 + C',
      acceptable: ['x³ + C', 'x^3+C']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use power rule for integration', latex: '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C' },
        { number: 2, description: 'Apply to 3x²', latex: '\\int 3x^2 \\, dx = 3 \\cdot \\frac{x^3}{3} + C' },
        { number: 3, description: 'Simplify', latex: '= x^3 + C' }
      ],
      method: 'Power rule for integration'
    },
    hints: [
      { level: 'gentle', text: 'Use the power rule in reverse: ∫xⁿ dx = x^(n+1)/(n+1) + C.' },
      { level: 'moderate', text: '∫3x² dx = 3 · x³/3 + C' },
      { level: 'explicit', text: '= x³ + C. Check: d/dx(x³) = 3x². ✓' }
    ],
    pedagogy: {
      topic: 'Integration',
      subTopic: 'Power rule for integration',
      skills: ['integration'],
      prerequisites: ['derivatives'],
      concepts: ['antiderivative', 'power-rule'],
      commonMistakes: ['Forgetting +C', 'Wrong exponent'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['integration', 'power-rule', 'antiderivative']
    }
  },

  // --- DEFINITE INTEGRAL ---
  {
    id: 'calc-v2-g12-int-003',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Evaluate the definite integral: ∫₀² (3x² + 4x) dx',
      latex: '\\int_0^2 (3x^2 + 4x) \\, dx'
    },
    answer: {
      type: 'exact',
      correct: '16',
      acceptable: ['16.0']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3*x^2 + 4*x', color: '#2563eb', label: 'f(x) = 3x² + 4x' }
        ],
        domain: [-0.5, 3],
        range: [-2, 25],
        showGrid: true,
        shadedRegions: [
          { expression: '3*x^2 + 4*x', color: '#2563eb', opacity: 0.3 }
        ],
        points: [
          { x: 0, y: 0, label: 'x=0', color: '#dc2626' },
          { x: 2, y: 20, label: 'x=2', color: '#dc2626' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the antiderivative', latex: 'F(x) = x^3 + 2x^2' },
        { number: 2, description: 'Apply Fundamental Theorem of Calculus', latex: '\\int_0^2 f(x) \\, dx = F(2) - F(0)' },
        { number: 3, description: 'Evaluate at upper limit', latex: 'F(2) = 2^3 + 2(2^2) = 8 + 8 = 16' },
        { number: 4, description: 'Evaluate at lower limit', latex: 'F(0) = 0^3 + 2(0^2) = 0' },
        { number: 5, description: 'Subtract', latex: 'F(2) - F(0) = 16 - 0 = 16' }
      ],
      method: 'Fundamental Theorem of Calculus'
    },
    hints: [
      { level: 'gentle', text: 'First find the antiderivative, then use F(b) - F(a).' },
      { level: 'moderate', text: 'Antiderivative of 3x² + 4x is x³ + 2x².' },
      { level: 'explicit', text: 'F(2) - F(0) = (8 + 8) - 0 = 16.' }
    ],
    pedagogy: {
      topic: 'Integration',
      subTopic: 'Definite integrals',
      skills: ['integration'],
      prerequisites: ['antiderivatives'],
      concepts: ['definite-integral', 'fundamental-theorem'],
      commonMistakes: ['Forgetting to subtract F(a)', 'Evaluation errors'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['integration', 'definite-integral', 'ftc']
    }
  },

  // --- U-SUBSTITUTION ---
  {
    id: 'calc-v2-g12-int-004',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Evaluate: ∫ 2x(x² + 1)⁴ dx',
      latex: '\\int 2x(x^2 + 1)^4 \\, dx'
    },
    answer: {
      type: 'expression',
      correct: '(x^2 + 1)^5/5 + C',
      acceptable: ['(x² + 1)⁵/5 + C', '1/5(x^2 + 1)^5 + C']
    },
    solution: {
      steps: [
        { number: 1, description: 'Choose substitution', latex: 'u = x^2 + 1' },
        { number: 2, description: 'Find du', latex: 'du = 2x \\, dx' },
        { number: 3, description: 'Rewrite integral in terms of u', latex: '\\int u^4 \\, du' },
        { number: 4, description: 'Integrate', latex: '= \\frac{u^5}{5} + C' },
        { number: 5, description: 'Substitute back', latex: '= \\frac{(x^2 + 1)^5}{5} + C' }
      ],
      method: 'U-substitution'
    },
    hints: [
      { level: 'gentle', text: 'Let u = x² + 1. Notice that du = 2x dx.' },
      { level: 'moderate', text: 'The integral becomes ∫u⁴ du.' },
      { level: 'explicit', text: 'u⁵/5 + C = (x² + 1)⁵/5 + C.' }
    ],
    pedagogy: {
      topic: 'Integration',
      subTopic: 'U-substitution',
      skills: ['integration', 'substitution'],
      prerequisites: ['chain_rule', 'antiderivatives'],
      concepts: ['u-substitution', 'change-of-variables'],
      commonMistakes: ['Forgetting to change du', 'Not substituting back'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['integration', 'u-substitution']
    }
  },

  // --- TRIGONOMETRIC INTEGRAL ---
  {
    id: 'calc-v2-g12-int-005',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Evaluate: ∫₀^π sin(x) dx',
      latex: '\\int_0^{\\pi} \\sin(x) \\, dx'
    },
    answer: {
      type: 'exact',
      correct: '2',
      acceptable: ['2.0']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'sin(x)', color: '#2563eb', label: 'f(x) = sin(x)' }
        ],
        domain: [-0.5, 4],
        range: [-0.5, 1.5],
        showGrid: true,
        shadedRegions: [
          { expression: 'sin(x)', color: '#2563eb', opacity: 0.3 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find antiderivative of sin(x)', latex: '\\int \\sin(x) \\, dx = -\\cos(x) + C' },
        { number: 2, description: 'Evaluate from 0 to π', latex: '[-\\cos(x)]_0^{\\pi}' },
        { number: 3, description: 'At upper limit', latex: '-\\cos(\\pi) = -(-1) = 1' },
        { number: 4, description: 'At lower limit', latex: '-\\cos(0) = -(1) = -1' },
        { number: 5, description: 'Subtract', latex: '1 - (-1) = 2' }
      ],
      method: 'Definite integral with trig'
    },
    hints: [
      { level: 'gentle', text: 'Antiderivative of sin is -cos.' },
      { level: 'moderate', text: 'Evaluate -cos(x) from 0 to π.' },
      { level: 'explicit', text: '-cos(π) - (-cos(0)) = 1 - (-1) = 2.' }
    ],
    pedagogy: {
      topic: 'Integration',
      subTopic: 'Trigonometric integrals',
      skills: ['integration', 'trigonometry'],
      prerequisites: ['trig_derivatives'],
      concepts: ['trig-integrals'],
      commonMistakes: ['Sign error on antiderivative', 'Wrong trig values'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['integration', 'trigonometry', 'definite-integral']
    }
  },

  // --- INTEGRATION BY PARTS ---
  {
    id: 'calc-v2-g12-int-006',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find: ∫ x·eˣ dx using integration by parts.',
      latex: '\\int x e^x \\, dx'
    },
    answer: {
      type: 'expression',
      correct: 'xe^x - e^x + C',
      acceptable: ['xeˣ - eˣ + C', 'e^x(x-1) + C']
    },
    solution: {
      steps: [
        { number: 1, description: 'Choose u and dv (LIATE rule)', latex: 'u = x, \\quad dv = e^x \\, dx' },
        { number: 2, description: 'Find du and v', latex: 'du = dx, \\quad v = e^x' },
        { number: 3, description: 'Apply integration by parts: ∫u dv = uv - ∫v du', latex: '\\int x e^x \\, dx = x e^x - \\int e^x \\, dx' },
        { number: 4, description: 'Evaluate remaining integral', latex: '= x e^x - e^x + C' }
      ],
      method: 'Integration by parts'
    },
    hints: [
      { level: 'gentle', text: 'Use integration by parts: ∫u dv = uv - ∫v du.' },
      { level: 'moderate', text: 'Let u = x (algebraic), dv = eˣ dx.' },
      { level: 'explicit', text: 'x·eˣ - ∫eˣ dx = xeˣ - eˣ + C.' }
    ],
    pedagogy: {
      topic: 'Integration',
      subTopic: 'Integration by parts',
      skills: ['integration'],
      prerequisites: ['product_rule', 'antiderivatives'],
      concepts: ['integration-by-parts', 'liate-rule'],
      commonMistakes: ['Wrong choice of u and dv', 'Sign errors'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['integration', 'integration-by-parts']
    }
  },

  // --- EXPONENTIAL INTEGRAL ---
  {
    id: 'calc-v2-g12-int-007',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Evaluate: ∫₀^1 eˣ dx',
      latex: '\\int_0^1 e^x \\, dx'
    },
    answer: {
      type: 'expression',
      correct: 'e - 1',
      acceptable: ['e-1', '1.718', '1.72']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'exp(x)', color: '#2563eb', label: 'f(x) = eˣ' }
        ],
        domain: [-0.5, 1.5],
        range: [-0.5, 3.5],
        showGrid: true,
        shadedRegions: [
          { expression: 'exp(x)', color: '#2563eb', opacity: 0.3 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Antiderivative of eˣ is eˣ', latex: '\\int e^x \\, dx = e^x + C' },
        { number: 2, description: 'Evaluate from 0 to 1', latex: '[e^x]_0^1 = e^1 - e^0' },
        { number: 3, description: 'Calculate', latex: '= e - 1 \\approx 1.718' }
      ],
      method: 'Definite integral'
    },
    hints: [
      { level: 'gentle', text: 'The antiderivative of eˣ is eˣ.' },
      { level: 'moderate', text: 'Evaluate eˣ at 1 and 0, then subtract.' },
      { level: 'explicit', text: 'e¹ - e⁰ = e - 1 ≈ 1.718.' }
    ],
    pedagogy: {
      topic: 'Integration',
      subTopic: 'Exponential integrals',
      skills: ['integration', 'exponentials'],
      prerequisites: ['exp_derivatives'],
      concepts: ['exponential-integral'],
      commonMistakes: ['Forgetting e⁰ = 1'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['integration', 'exponential', 'definite-integral']
    }
  },

  // --- FUNDAMENTAL THEOREM PART 1 ---
  {
    id: 'calc-v2-g12-int-008',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'If F(x) = ∫₀^x t² dt, find F\'(x).',
      latex: 'F(x) = \\int_0^x t^2 \\, dt, \\quad F\'(x) = ?'
    },
    answer: {
      type: 'expression',
      correct: 'x^2',
      acceptable: ['x²']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply Fundamental Theorem of Calculus Part 1', latex: '\\frac{d}{dx}\\int_a^x f(t) \\, dt = f(x)' },
        { number: 2, description: 'Here f(t) = t²', latex: 'F\'(x) = x^2' }
      ],
      method: 'FTC Part 1'
    },
    hints: [
      { level: 'gentle', text: 'Use the Fundamental Theorem of Calculus Part 1.' },
      { level: 'moderate', text: 'The derivative of ∫₀^x f(t) dt is f(x).' },
      { level: 'explicit', text: 'F\'(x) = x².' }
    ],
    pedagogy: {
      topic: 'Integration',
      subTopic: 'FTC Part 1',
      skills: ['integration', 'derivatives'],
      prerequisites: ['definite_integrals'],
      concepts: ['fundamental-theorem-part-1'],
      commonMistakes: ['Trying to integrate then differentiate'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['integration', 'ftc', 'derivatives']
    }
  }
]

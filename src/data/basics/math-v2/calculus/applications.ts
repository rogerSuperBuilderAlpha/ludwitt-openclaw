/**
 * Calculus - Applications (MathProblemV2 format)
 * Grade levels: 11-12
 * 
 * Topics covered:
 * - Related rates
 * - Optimization
 * - Motion problems (position, velocity, acceleration)
 * - Area between curves
 * - Volumes of revolution
 * - Average value of a function
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const APPLICATIONS_PROBLEMS_V2: MathProblemV2[] = [
  // --- MOTION PROBLEMS ---
  {
    id: 'calc-v2-g11-app-001',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'If position is given by s(t) = t² - 4t + 3 (meters), find the velocity at t = 3 seconds.',
      latex: 's(t) = t^2 - 4t + 3, \\quad v(3) = ?'
    },
    answer: {
      type: 'numeric',
      correct: 2,
      acceptable: ['2 m/s', '2.0'],
      unit: 'm/s'
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 - 4*x + 3', color: '#2563eb', label: 's(t) position' },
          { expression: '2*x - 4', color: '#059669', label: 'v(t) velocity' }
        ],
        domain: [0, 5],
        range: [-2, 10],
        showGrid: true,
        points: [{ x: 3, y: 2, label: 'v(3) = 2', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Velocity is the derivative of position', latex: 'v(t) = s\'(t)' },
        { number: 2, description: 'Find the derivative', latex: 's\'(t) = 2t - 4' },
        { number: 3, description: 'Evaluate at t = 3', latex: 'v(3) = 2(3) - 4 = 6 - 4 = 2' }
      ],
      method: 'Position-velocity relationship'
    },
    hints: [
      { level: 'gentle', text: 'Velocity is the derivative of position.' },
      { level: 'moderate', text: 'v(t) = s\'(t) = 2t - 4' },
      { level: 'explicit', text: 'v(3) = 2(3) - 4 = 2 m/s' }
    ],
    pedagogy: {
      topic: 'Applications of Derivatives',
      subTopic: 'Motion problems',
      skills: ['derivatives', 'applications'],
      prerequisites: ['power_rule'],
      concepts: ['velocity', 'rate-of-change'],
      commonMistakes: ['Confusing position with velocity', 'Evaluation errors'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['applications', 'motion', 'velocity']
    }
  },

  // --- ACCELERATION ---
  {
    id: 'calc-v2-g11-app-002',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'If velocity is v(t) = 3t² - 6t (m/s), find the acceleration at t = 2 seconds.',
      latex: 'v(t) = 3t^2 - 6t, \\quad a(2) = ?'
    },
    answer: {
      type: 'numeric',
      correct: 6,
      acceptable: ['6 m/s²', '6.0'],
      unit: 'm/s²'
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3*x^2 - 6*x', color: '#2563eb', label: 'v(t) velocity' },
          { expression: '6*x - 6', color: '#059669', label: 'a(t) acceleration' }
        ],
        domain: [0, 4],
        range: [-5, 20],
        showGrid: true,
        points: [{ x: 2, y: 6, label: 'a(2) = 6', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Acceleration is the derivative of velocity', latex: 'a(t) = v\'(t)' },
        { number: 2, description: 'Find the derivative', latex: 'v\'(t) = 6t - 6' },
        { number: 3, description: 'Evaluate at t = 2', latex: 'a(2) = 6(2) - 6 = 12 - 6 = 6' }
      ],
      method: 'Velocity-acceleration relationship'
    },
    hints: [
      { level: 'gentle', text: 'Acceleration is the derivative of velocity.' },
      { level: 'moderate', text: 'a(t) = v\'(t) = 6t - 6' },
      { level: 'explicit', text: 'a(2) = 6(2) - 6 = 6 m/s²' }
    ],
    pedagogy: {
      topic: 'Applications of Derivatives',
      subTopic: 'Motion problems',
      skills: ['derivatives', 'applications'],
      prerequisites: ['power_rule'],
      concepts: ['acceleration', 'second-derivative'],
      commonMistakes: ['Confusing velocity with acceleration'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['applications', 'motion', 'acceleration']
    }
  },

  // --- OPTIMIZATION ---
  {
    id: 'calc-v2-g12-app-003',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the value of x that minimizes f(x) = x² + 4x + 5.',
      latex: 'f(x) = x^2 + 4x + 5, \\text{ find } x \\text{ that minimizes } f'
    },
    answer: {
      type: 'exact',
      correct: '-2',
      acceptable: ['-2.0', 'x = -2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 + 4*x + 5', color: '#2563eb', label: 'f(x) = x² + 4x + 5' }
        ],
        domain: [-5, 2],
        range: [-1, 15],
        showGrid: true,
        points: [{ x: -2, y: 1, label: 'minimum at (-2, 1)', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the derivative', latex: "f'(x) = 2x + 4" },
        { number: 2, description: 'Set derivative equal to zero', latex: '2x + 4 = 0' },
        { number: 3, description: 'Solve for x', latex: 'x = -2' },
        { number: 4, description: 'Verify it\'s a minimum (second derivative test)', latex: "f''(x) = 2 > 0 \\Rightarrow \\text{minimum}" }
      ],
      method: 'First derivative test'
    },
    hints: [
      { level: 'gentle', text: 'Minimum occurs where f\'(x) = 0.' },
      { level: 'moderate', text: 'Set 2x + 4 = 0 and solve.' },
      { level: 'explicit', text: 'x = -2. (It\'s a min since f\'\'(x) = 2 > 0.)' }
    ],
    pedagogy: {
      topic: 'Applications of Derivatives',
      subTopic: 'Optimization',
      skills: ['derivatives', 'optimization'],
      prerequisites: ['power_rule', 'solving_equations'],
      concepts: ['critical-points', 'min-max'],
      commonMistakes: ['Finding maximum instead of minimum', 'Not checking second derivative'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['applications', 'optimization', 'minimum']
    }
  },

  // --- RELATED RATES ---
  {
    id: 'calc-v2-g12-app-004',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'A circle\'s radius is increasing at 2 cm/s. When r = 5 cm, how fast is the area increasing?',
      latex: 'A = \\pi r^2, \\quad \\frac{dr}{dt} = 2, \\quad r = 5, \\quad \\frac{dA}{dt} = ?'
    },
    answer: {
      type: 'expression',
      correct: '20π',
      acceptable: ['20*pi', '20π cm²/s', '62.83']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the area formula', latex: 'A = \\pi r^2' },
        { number: 2, description: 'Differentiate with respect to time', latex: '\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}' },
        { number: 3, description: 'Substitute values', latex: '\\frac{dA}{dt} = 2\\pi (5)(2)' },
        { number: 4, description: 'Calculate', latex: '= 20\\pi \\approx 62.83 \\text{ cm}^2/\\text{s}' }
      ],
      method: 'Related rates'
    },
    hints: [
      { level: 'gentle', text: 'Differentiate A = πr² with respect to time.' },
      { level: 'moderate', text: 'dA/dt = 2πr(dr/dt)' },
      { level: 'explicit', text: 'dA/dt = 2π(5)(2) = 20π cm²/s' }
    ],
    pedagogy: {
      topic: 'Applications of Derivatives',
      subTopic: 'Related rates',
      skills: ['derivatives', 'applications'],
      prerequisites: ['chain_rule', 'implicit_differentiation'],
      concepts: ['related-rates'],
      commonMistakes: ['Forgetting chain rule', 'Wrong formula'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['applications', 'related-rates']
    }
  },

  // --- AREA BETWEEN CURVES ---
  {
    id: 'calc-v2-g12-app-005',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the area between y = x² and y = x from x = 0 to x = 1.',
      latex: '\\int_0^1 (x - x^2) \\, dx'
    },
    answer: {
      type: 'fraction',
      correct: '1/6',
      acceptable: ['0.167', '0.17']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2', color: '#2563eb', label: 'y = x²' },
          { expression: 'x', color: '#059669', label: 'y = x' }
        ],
        domain: [-0.2, 1.3],
        range: [-0.2, 1.3],
        showGrid: true,
        points: [
          { x: 0, y: 0, label: '(0,0)', color: '#dc2626' },
          { x: 1, y: 1, label: '(1,1)', color: '#dc2626' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify which function is on top', latex: 'x \\geq x^2 \\text{ on } [0, 1]' },
        { number: 2, description: 'Set up the integral', latex: 'A = \\int_0^1 (x - x^2) \\, dx' },
        { number: 3, description: 'Integrate', latex: '= \\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1' },
        { number: 4, description: 'Evaluate', latex: '= \\left(\\frac{1}{2} - \\frac{1}{3}\\right) - 0 = \\frac{1}{6}' }
      ],
      method: 'Area between curves'
    },
    hints: [
      { level: 'gentle', text: 'Area = ∫(top - bottom) dx.' },
      { level: 'moderate', text: 'On [0,1], x ≥ x², so integrate (x - x²).' },
      { level: 'explicit', text: '[x²/2 - x³/3] from 0 to 1 = 1/2 - 1/3 = 1/6' }
    ],
    pedagogy: {
      topic: 'Applications of Integration',
      subTopic: 'Area between curves',
      skills: ['integration', 'applications'],
      prerequisites: ['definite_integrals'],
      concepts: ['area-between-curves'],
      commonMistakes: ['Subtracting in wrong order', 'Wrong limits'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['applications', 'area', 'integration']
    }
  },

  // --- DISPLACEMENT FROM VELOCITY ---
  {
    id: 'calc-v2-g12-app-006',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'If velocity v(t) = 3t² m/s, find the displacement from t = 0 to t = 2.',
      latex: 'v(t) = 3t^2, \\quad \\int_0^2 v(t) \\, dt = ?'
    },
    answer: {
      type: 'numeric',
      correct: 8,
      acceptable: ['8 m', '8.0'],
      unit: 'm'
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3*x^2', color: '#2563eb', label: 'v(t) = 3t²' }
        ],
        domain: [0, 3],
        range: [0, 15],
        showGrid: true,
        shadedRegions: [
          { expression: '3*x^2', color: '#2563eb', opacity: 0.3 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Displacement is the integral of velocity', latex: 's = \\int_0^2 3t^2 \\, dt' },
        { number: 2, description: 'Integrate', latex: '= \\left[t^3\\right]_0^2' },
        { number: 3, description: 'Evaluate', latex: '= 2^3 - 0^3 = 8 \\text{ m}' }
      ],
      method: 'Displacement from velocity'
    },
    hints: [
      { level: 'gentle', text: 'Displacement is the integral of velocity.' },
      { level: 'moderate', text: '∫3t² dt = t³' },
      { level: 'explicit', text: '[t³] from 0 to 2 = 8 - 0 = 8 m' }
    ],
    pedagogy: {
      topic: 'Applications of Integration',
      subTopic: 'Motion problems',
      skills: ['integration', 'applications'],
      prerequisites: ['definite_integrals'],
      concepts: ['displacement', 'area-under-curve'],
      commonMistakes: ['Confusing displacement with distance'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['applications', 'motion', 'displacement']
    }
  },

  // --- AVERAGE VALUE ---
  {
    id: 'calc-v2-g12-app-007',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find the average value of f(x) = x² on the interval [0, 3].',
      latex: 'f_{avg} = \\frac{1}{b-a}\\int_a^b f(x) \\, dx'
    },
    answer: {
      type: 'exact',
      correct: '3',
      acceptable: ['3.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use average value formula', latex: 'f_{avg} = \\frac{1}{3-0}\\int_0^3 x^2 \\, dx' },
        { number: 2, description: 'Evaluate the integral', latex: '\\int_0^3 x^2 \\, dx = \\left[\\frac{x^3}{3}\\right]_0^3 = \\frac{27}{3} = 9' },
        { number: 3, description: 'Divide by interval length', latex: 'f_{avg} = \\frac{9}{3} = 3' }
      ],
      method: 'Average value formula'
    },
    hints: [
      { level: 'gentle', text: 'Average value = (1/(b-a)) × ∫f(x)dx from a to b.' },
      { level: 'moderate', text: 'Integrate x² from 0 to 3, then divide by 3.' },
      { level: 'explicit', text: '(1/3) × 9 = 3' }
    ],
    pedagogy: {
      topic: 'Applications of Integration',
      subTopic: 'Average value',
      skills: ['integration', 'applications'],
      prerequisites: ['definite_integrals'],
      concepts: ['average-value'],
      commonMistakes: ['Forgetting to divide by interval length'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['applications', 'average-value', 'integration']
    }
  },

  // --- MAXIMA/MINIMA WORD PROBLEM ---
  {
    id: 'calc-v2-g12-app-008',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Revenue is R(x) = 100x - x² dollars for x items sold. What value of x maximizes revenue?',
      latex: 'R(x) = 100x - x^2, \\quad \\text{find } x \\text{ that maximizes } R'
    },
    answer: {
      type: 'exact',
      correct: '50',
      acceptable: ['50.0', 'x = 50', '50 items']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '100*x - x^2', color: '#2563eb', label: 'R(x) = 100x - x²' }
        ],
        domain: [0, 100],
        range: [0, 3000],
        showGrid: true,
        points: [{ x: 50, y: 2500, label: 'max at x=50', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the derivative', latex: "R'(x) = 100 - 2x" },
        { number: 2, description: 'Set equal to zero', latex: '100 - 2x = 0' },
        { number: 3, description: 'Solve for x', latex: 'x = 50' },
        { number: 4, description: 'Verify it\'s a maximum', latex: "R''(x) = -2 < 0 \\Rightarrow \\text{maximum}" }
      ],
      method: 'Optimization'
    },
    hints: [
      { level: 'gentle', text: 'Maximum occurs where R\'(x) = 0.' },
      { level: 'moderate', text: '100 - 2x = 0' },
      { level: 'explicit', text: 'x = 50 items (max since R\'\'(x) < 0)' }
    ],
    pedagogy: {
      topic: 'Applications of Derivatives',
      subTopic: 'Optimization',
      skills: ['derivatives', 'optimization'],
      prerequisites: ['power_rule'],
      concepts: ['business-optimization', 'critical-points'],
      commonMistakes: ['Not checking second derivative', 'Solving incorrectly'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['applications', 'optimization', 'business']
    }
  }
]

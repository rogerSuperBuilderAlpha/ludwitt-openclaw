/**
 * Calculus - Limits (MathProblemV2 format)
 * Grade levels: 9-12
 * 
 * Topics covered:
 * - Limit intuition and notation
 * - Direct substitution
 * - Factoring to evaluate limits
 * - Limits at infinity
 * - Special limits (sin(x)/x, e definitions)
 * - L'Hôpital's Rule
 * - Continuity
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const LIMITS_PROBLEMS_V2: MathProblemV2[] = [
  // --- LIMIT INTUITION ---
  {
    id: 'calc-v2-g9-limit-001',
    version: 2,
    type: 'calculus',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Using the table: x = 1.9, 1.99, 1.999, 2.001, 2.01, 2.1 and f(x) = 3.9, 3.99, 3.999, 4.001, 4.01, 4.1. What value does f(x) approach as x approaches 2?',
      latex: '\\lim_{x \\to 2} f(x) = ?'
    },
    answer: {
      type: 'exact',
      correct: '4',
      acceptable: ['4.0', '4.00']
    },
    visuals: {
      diagram: {
        type: 'table',
        width: 400,
        height: 150,
        description: 'Table showing x values approaching 2 and corresponding f(x) values approaching 4',
        svg: `<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="380" height="130" fill="none" stroke="#374151" stroke-width="1"/>
          <line x1="10" y1="50" x2="390" y2="50" stroke="#374151" stroke-width="1"/>
          <line x1="70" y1="10" x2="70" y2="140" stroke="#374151" stroke-width="1"/>
          <text x="40" y="35" font-size="12" text-anchor="middle" fill="#374151" font-weight="bold">x</text>
          <text x="40" y="100" font-size="12" text-anchor="middle" fill="#374151" font-weight="bold">f(x)</text>
          <text x="110" y="35" font-size="11" text-anchor="middle" fill="#3b82f6">1.9</text>
          <text x="160" y="35" font-size="11" text-anchor="middle" fill="#3b82f6">1.99</text>
          <text x="210" y="35" font-size="11" text-anchor="middle" fill="#3b82f6">1.999</text>
          <text x="260" y="35" font-size="11" text-anchor="middle" fill="#dc2626" font-weight="bold">2</text>
          <text x="300" y="35" font-size="11" text-anchor="middle" fill="#3b82f6">2.001</text>
          <text x="350" y="35" font-size="11" text-anchor="middle" fill="#3b82f6">2.01</text>
          <text x="110" y="100" font-size="11" text-anchor="middle" fill="#059669">3.9</text>
          <text x="160" y="100" font-size="11" text-anchor="middle" fill="#059669">3.99</text>
          <text x="210" y="100" font-size="11" text-anchor="middle" fill="#059669">3.999</text>
          <text x="260" y="100" font-size="12" text-anchor="middle" fill="#dc2626" font-weight="bold">→4</text>
          <text x="300" y="100" font-size="11" text-anchor="middle" fill="#059669">4.001</text>
          <text x="350" y="100" font-size="11" text-anchor="middle" fill="#059669">4.01</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Observe values as x approaches 2 from left', latex: 'x: 1.9 \\to 1.99 \\to 1.999, \\quad f(x): 3.9 \\to 3.99 \\to 3.999' },
        { number: 2, description: 'Observe values as x approaches 2 from right', latex: 'x: 2.1 \\to 2.01 \\to 2.001, \\quad f(x): 4.1 \\to 4.01 \\to 4.001' },
        { number: 3, description: 'Both sides approach 4', latex: '\\lim_{x \\to 2} f(x) = 4' }
      ],
      method: 'Numerical approach'
    },
    hints: [
      { level: 'gentle', text: 'Look at the pattern in f(x) as x gets closer to 2 from both sides.' },
      { level: 'moderate', text: 'From the left: 3.9, 3.99, 3.999... From the right: 4.1, 4.01, 4.001...' },
      { level: 'explicit', text: 'Both sequences approach 4, so the limit is 4.' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'Limit intuition',
      skills: ['limits', 'calculus_prep'],
      prerequisites: ['algebra', 'function_evaluation'],
      concepts: ['limit-definition', 'approaching-a-value'],
      commonMistakes: ['Confusing limit with function value', 'Only checking one side'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'foundational', 'numerical-approach']
    }
  },

  // --- DIRECT SUBSTITUTION ---
  {
    id: 'calc-v2-g9-limit-002',
    version: 2,
    type: 'calculus',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find lim(x→4) f(x) if f(x) = 2x + 1 by substituting x = 4.',
      latex: '\\lim_{x \\to 4} (2x + 1)'
    },
    answer: {
      type: 'exact',
      correct: '9',
      acceptable: ['9.0']
    },
    visuals: {
      graph: {
        expressions: [{ expression: '2*x + 1', color: '#2563eb', label: 'f(x) = 2x + 1' }],
        domain: [-1, 6],
        range: [-2, 14],
        showGrid: true,
        points: [{ x: 4, y: 9, label: '(4, 9)', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recognize this is a polynomial (continuous everywhere)', latex: 'f(x) = 2x + 1 \\text{ is continuous}' },
        { number: 2, description: 'Use direct substitution', latex: '\\lim_{x \\to 4} (2x + 1) = 2(4) + 1' },
        { number: 3, description: 'Calculate', latex: '= 8 + 1 = 9' }
      ],
      method: 'Direct substitution'
    },
    hints: [
      { level: 'gentle', text: 'For polynomial functions, you can find the limit by direct substitution.' },
      { level: 'moderate', text: 'Substitute x = 4 into 2x + 1.' },
      { level: 'explicit', text: '2(4) + 1 = 9' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'Direct substitution',
      skills: ['limits', 'calculus_prep'],
      prerequisites: ['algebra', 'polynomials'],
      concepts: ['limit-definition', 'continuity'],
      commonMistakes: ['Overcomplicating simple limits'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'direct-substitution']
    }
  },

  // --- FACTORING ---
  {
    id: 'calc-v2-g10-limit-003',
    version: 2,
    type: 'calculus',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find lim(x→2) (x² - 4)/(x - 2) by factoring.',
      latex: '\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}'
    },
    answer: {
      type: 'exact',
      correct: '4',
      acceptable: ['4.0']
    },
    visuals: {
      graph: {
        expressions: [{ expression: 'x + 2', color: '#2563eb', label: 'y = x + 2 (simplified)' }],
        domain: [-1, 5],
        range: [-1, 8],
        showGrid: true,
        points: [{ x: 2, y: 4, label: 'hole at (2, 4)', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Try direct substitution', latex: '\\frac{2^2 - 4}{2 - 2} = \\frac{0}{0} \\text{ (indeterminate)}' },
        { number: 2, description: 'Factor the numerator using difference of squares', latex: 'x^2 - 4 = (x + 2)(x - 2)' },
        { number: 3, description: 'Simplify by canceling common factor', latex: '\\frac{(x + 2)(x - 2)}{x - 2} = x + 2' },
        { number: 4, description: 'Evaluate the limit', latex: '\\lim_{x \\to 2} (x + 2) = 4' }
      ],
      method: 'Factoring and cancellation'
    },
    hints: [
      { level: 'gentle', text: 'Direct substitution gives 0/0. Factor x² - 4.' },
      { level: 'moderate', text: 'x² - 4 = (x + 2)(x - 2). Cancel the common factor.' },
      { level: 'explicit', text: 'After canceling: x + 2. At x = 2: 2 + 2 = 4.' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'Factoring to find limits',
      skills: ['limits', 'factoring'],
      prerequisites: ['algebra', 'factoring'],
      concepts: ['indeterminate-forms', 'removable-discontinuity'],
      commonMistakes: ['Trying direct substitution on 0/0', 'Incomplete factoring'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'factoring', 'indeterminate']
    }
  },

  // --- LIMITS AT INFINITY ---
  {
    id: 'calc-v2-g11-limit-004',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find lim(x→∞) (2x³ + 5x²)/(x³ − 4x)',
      latex: '\\lim_{x \\to \\infty} \\frac{2x^3 + 5x^2}{x^3 - 4x}'
    },
    answer: {
      type: 'exact',
      correct: '2',
      acceptable: ['2.0', '2.00']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(2*x^3 + 5*x^2)/(x^3 - 4*x)', color: '#2563eb', label: 'f(x)' },
          { expression: '2', color: '#059669', style: 'dashed', label: 'y = 2 (asymptote)' }
        ],
        domain: [1, 20],
        range: [0, 4],
        showGrid: true,
        asymptotes: { y: [2] }
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the highest power of x', latex: '\\text{Highest power: } x^3' },
        { number: 2, description: 'Divide numerator and denominator by x³', latex: '\\frac{2x^3/x^3 + 5x^2/x^3}{x^3/x^3 - 4x/x^3} = \\frac{2 + 5/x}{1 - 4/x^2}' },
        { number: 3, description: 'Take limit as x → ∞', latex: '\\text{As } x \\to \\infty: \\frac{5}{x} \\to 0, \\frac{4}{x^2} \\to 0' },
        { number: 4, description: 'Evaluate', latex: '\\frac{2 + 0}{1 - 0} = 2' }
      ],
      method: 'Dividing by highest power'
    },
    hints: [
      { level: 'gentle', text: 'For limits at infinity of rational functions, compare the leading terms.' },
      { level: 'moderate', text: 'Divide both top and bottom by x³ (highest power in denominator).' },
      { level: 'explicit', text: 'Terms with x in denominator → 0, giving 2/1 = 2.' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'Limits at infinity',
      skills: ['limits', 'rational_functions'],
      prerequisites: ['algebra', 'polynomials'],
      concepts: ['horizontal-asymptote', 'end-behavior'],
      commonMistakes: ['Not dividing by correct power', 'Ignoring lower-order terms'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'infinity', 'horizontal-asymptote']
    }
  },

  // --- SPECIAL LIMIT: sin(x)/x ---
  {
    id: 'calc-v2-g11-limit-005',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find: lim(x→0) sin(x)/x',
      latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x}'
    },
    answer: {
      type: 'exact',
      correct: '1',
      acceptable: ['1.0']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'sin(x)/x', color: '#2563eb', label: 'y = sin(x)/x' }
        ],
        domain: [-6, 6],
        range: [-0.5, 1.5],
        showGrid: true,
        points: [{ x: 0, y: 1, label: 'limit = 1', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'This is a fundamental limit in calculus', latex: '\\text{Cannot use direct substitution: } \\frac{\\sin 0}{0} = \\frac{0}{0}' },
        { number: 2, description: 'This limit equals 1 (proven using squeeze theorem)', latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1' },
        { number: 3, description: 'This is a key result used throughout calculus', latex: '\\text{Memorize this result!}' }
      ],
      method: 'Special limit (memorize)'
    },
    hints: [
      { level: 'gentle', text: 'This is one of the fundamental limits in calculus.' },
      { level: 'moderate', text: 'It can be proven using the squeeze theorem.' },
      { level: 'explicit', text: 'lim(x→0) sin(x)/x = 1' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'Special limits',
      skills: ['limits', 'trigonometry'],
      prerequisites: ['trigonometry', 'algebra'],
      concepts: ['squeeze-theorem', 'fundamental-limits'],
      commonMistakes: ['Thinking it equals 0', 'Using L\'Hôpital too early'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'special-limits', 'trigonometry']
    }
  },

  // --- L'HÔPITAL'S RULE ---
  {
    id: 'calc-v2-g12-limit-006',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Use L\'Hôpital\'s Rule: lim(x→0) (eˣ - 1)/x',
      latex: '\\lim_{x \\to 0} \\frac{e^x - 1}{x}'
    },
    answer: {
      type: 'exact',
      correct: '1',
      acceptable: ['1.0']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(exp(x) - 1)/x', color: '#2563eb', label: 'y = (eˣ - 1)/x' }
        ],
        domain: [-3, 3],
        range: [-1, 4],
        showGrid: true,
        points: [{ x: 0, y: 1, label: 'limit = 1', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Check if indeterminate form', latex: '\\frac{e^0 - 1}{0} = \\frac{0}{0} \\quad \\checkmark' },
        { number: 2, description: 'Apply L\'Hôpital\'s Rule: differentiate top and bottom', latex: '\\lim_{x \\to 0} \\frac{\\frac{d}{dx}(e^x - 1)}{\\frac{d}{dx}(x)} = \\lim_{x \\to 0} \\frac{e^x}{1}' },
        { number: 3, description: 'Evaluate', latex: '\\lim_{x \\to 0} e^x = e^0 = 1' }
      ],
      method: 'L\'Hôpital\'s Rule'
    },
    hints: [
      { level: 'gentle', text: 'First verify this is 0/0 form.' },
      { level: 'moderate', text: 'Differentiate numerator and denominator separately.' },
      { level: 'explicit', text: 'd/dx(eˣ - 1) = eˣ, d/dx(x) = 1. Then evaluate at x = 0.' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'L\'Hôpital\'s Rule',
      skills: ['limits', 'derivatives'],
      prerequisites: ['derivatives', 'exponentials'],
      concepts: ['indeterminate-forms', 'lhopitals-rule'],
      commonMistakes: ['Applying to non-indeterminate forms', 'Differentiating as quotient rule'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'lhopital', 'exponential']
    }
  },

  // --- DEFINITION OF e ---
  {
    id: 'calc-v2-g12-limit-007',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Find: lim(x→∞) (1 + 1/x)^x',
      latex: '\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x'
    },
    answer: {
      type: 'expression',
      correct: 'e',
      acceptable: ['2.718', '2.71828']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(1 + 1/x)^x', color: '#2563eb', label: 'y = (1 + 1/x)ˣ' },
          { expression: '2.71828', color: '#059669', style: 'dashed', label: 'y = e' }
        ],
        domain: [1, 50],
        range: [2, 3],
        showGrid: true,
        asymptotes: { y: [2.71828] }
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'This is the definition of e', latex: '\\text{This defines Euler\'s number } e' },
        { number: 2, description: 'As x → ∞, the expression approaches e', latex: '\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e' },
        { number: 3, description: 'e ≈ 2.71828...', latex: 'e \\approx 2.71828' }
      ],
      method: 'Definition of e'
    },
    hints: [
      { level: 'gentle', text: 'This is a famous limit that defines a mathematical constant.' },
      { level: 'moderate', text: 'The result is Euler\'s number.' },
      { level: 'explicit', text: 'This limit equals e ≈ 2.71828.' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'Special limits',
      skills: ['limits', 'exponentials'],
      prerequisites: ['exponentials', 'algebra'],
      concepts: ['eulers-number', 'fundamental-limits'],
      commonMistakes: ['Evaluating as 1^∞ = 1'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'special-limits', 'euler-number']
    }
  },

  // --- CONTINUITY ---
  {
    id: 'calc-v2-g11-limit-008',
    version: 2,
    type: 'calculus',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Is f(x) = (x² − 4)/(x − 2) continuous at x = 2?',
      latex: 'f(x) = \\frac{x^2 - 4}{x - 2} \\text{ at } x = 2'
    },
    answer: {
      type: 'exact',
      correct: 'No',
      acceptable: ['No, it is not continuous', 'Discontinuous', 'Not continuous', 'no']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x + 2', color: '#2563eb', label: 'f(x) (simplified)' }
        ],
        domain: [-1, 5],
        range: [-1, 8],
        showGrid: true,
        points: [{ x: 2, y: 4, label: 'hole (undefined)', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Check if f(2) is defined', latex: 'f(2) = \\frac{4 - 4}{2 - 2} = \\frac{0}{0} \\text{ undefined}' },
        { number: 2, description: 'For continuity, the function must be defined at the point', latex: '\\text{Since } f(2) \\text{ is undefined, } f \\text{ is not continuous at } x = 2' },
        { number: 3, description: 'This is a removable discontinuity', latex: '\\lim_{x \\to 2} f(x) = 4 \\text{ exists, but } f(2) \\text{ does not}' }
      ],
      method: 'Continuity definition'
    },
    hints: [
      { level: 'gentle', text: 'For continuity at x = a, three conditions must be met.' },
      { level: 'moderate', text: 'Check: (1) f(a) defined, (2) limit exists, (3) limit = f(a).' },
      { level: 'explicit', text: 'f(2) is undefined (0/0), so not continuous.' }
    ],
    pedagogy: {
      topic: 'Continuity',
      subTopic: 'Point discontinuity',
      skills: ['limits', 'continuity'],
      prerequisites: ['limits', 'rational_functions'],
      concepts: ['continuity-definition', 'removable-discontinuity'],
      commonMistakes: ['Confusing limit existence with continuity'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'continuity', 'removable-discontinuity']
    }
  },

  // --- SQUEEZE THEOREM ---
  {
    id: 'calc-v2-g12-limit-009',
    version: 2,
    type: 'calculus',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'Use squeeze theorem: If -1 ≤ f(x) ≤ 1 for all x, find lim(x→0) x²f(x).',
      latex: '\\text{If } -1 \\leq f(x) \\leq 1, \\text{ find } \\lim_{x \\to 0} x^2 f(x)'
    },
    answer: {
      type: 'exact',
      correct: '0',
      acceptable: ['0.0']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2', color: '#059669', style: 'dashed', label: 'y = x²' },
          { expression: '-x^2', color: '#059669', style: 'dashed', label: 'y = -x²' },
          { expression: 'x^2 * sin(1/x)', color: '#2563eb', label: 'example: x²sin(1/x)' }
        ],
        domain: [-1, 1],
        range: [-0.5, 0.5],
        showGrid: true,
        points: [{ x: 0, y: 0, label: 'limit = 0', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply inequality by x² (≥ 0)', latex: '-x^2 \\leq x^2 f(x) \\leq x^2' },
        { number: 2, description: 'Take limits of bounds', latex: '\\lim_{x \\to 0} (-x^2) = 0 \\text{ and } \\lim_{x \\to 0} x^2 = 0' },
        { number: 3, description: 'Apply Squeeze Theorem', latex: '\\text{Since both bounds } \\to 0, \\text{ by Squeeze Theorem: } \\lim_{x \\to 0} x^2 f(x) = 0' }
      ],
      method: 'Squeeze Theorem'
    },
    hints: [
      { level: 'gentle', text: 'Multiply the inequality by x² to bound x²f(x).' },
      { level: 'moderate', text: '-x² ≤ x²f(x) ≤ x². Both bounds go to 0.' },
      { level: 'explicit', text: 'By squeeze theorem, the limit is 0.' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'Squeeze theorem',
      skills: ['limits', 'inequalities'],
      prerequisites: ['limits', 'inequalities'],
      concepts: ['squeeze-theorem', 'bounded-functions'],
      commonMistakes: ['Not setting up bounds correctly', 'Forgetting both bounds must equal'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'squeeze-theorem', 'proof-technique']
    }
  },

  // --- ONE-SIDED LIMITS ---
  {
    id: 'calc-v2-g10-limit-010',
    version: 2,
    type: 'calculus',
    difficulty: 10.5,
    gradeLevel: 10,
    question: {
      text: 'For f(x) = |x|/x, find lim(x→0⁺) f(x) and lim(x→0⁻) f(x).',
      latex: 'f(x) = \\frac{|x|}{x}, \\quad \\lim_{x \\to 0^+} f(x) = ?, \\quad \\lim_{x \\to 0^-} f(x) = ?'
    },
    answer: {
      type: 'exact',
      correct: '1 and -1',
      acceptable: ['1, -1', 'right: 1, left: -1']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'abs(x)/x', color: '#2563eb', label: 'f(x) = |x|/x' }
        ],
        domain: [-3, 3],
        range: [-2, 2],
        showGrid: true,
        points: [
          { x: 0.1, y: 1, label: 'right limit = 1', color: '#059669' },
          { x: -0.1, y: -1, label: 'left limit = -1', color: '#dc2626' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'For x > 0: |x| = x', latex: 'x > 0: f(x) = \\frac{x}{x} = 1' },
        { number: 2, description: 'So right-hand limit is 1', latex: '\\lim_{x \\to 0^+} f(x) = 1' },
        { number: 3, description: 'For x < 0: |x| = -x', latex: 'x < 0: f(x) = \\frac{-x}{x} = -1' },
        { number: 4, description: 'So left-hand limit is -1', latex: '\\lim_{x \\to 0^-} f(x) = -1' }
      ],
      method: 'One-sided limits'
    },
    hints: [
      { level: 'gentle', text: 'Consider what happens when x is positive vs negative.' },
      { level: 'moderate', text: 'For x > 0: |x| = x. For x < 0: |x| = -x.' },
      { level: 'explicit', text: 'Right limit: x/x = 1. Left limit: -x/x = -1.' }
    ],
    pedagogy: {
      topic: 'Limits',
      subTopic: 'One-sided limits',
      skills: ['limits', 'absolute_value'],
      prerequisites: ['absolute_value', 'piecewise_functions'],
      concepts: ['one-sided-limits', 'jump-discontinuity'],
      commonMistakes: ['Not checking both sides', 'Sign errors with absolute value'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['limits', 'one-sided', 'absolute-value']
    }
  }
]

/**
 * Function Applications - MathProblemV2 Format
 * 
 * Batch 2 Expansion - 25 problems (IDs 325-349)
 * 
 * Topics covered:
 * - Function Composition (Grade 9) - 5 problems
 * - Inverse Functions (Grade 9-10) - 5 problems
 * - Piecewise Functions (Grade 9-10) - 5 problems
 * - Transformations (Grade 9-10) - 5 problems
 * - Domain and Range (Grade 9-10) - 5 problems
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const FUNCTION_APPLICATIONS_V2: MathProblemV2[] = [
  // ============================================================================
  // FUNCTION COMPOSITION (Grade 9) - IDs 325-329
  // ============================================================================
  {
    id: 'alg-v2-g9-compose-325',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 9,
    question: {
      text: 'If f(x) = 2x + 3 and g(x) = x², find f(g(2)).',
      latex: 'f(x) = 2x + 3, \\quad g(x) = x^2, \\quad f(g(2)) = ?'
    },
    answer: {
      type: 'numeric',
      correct: '11',
      acceptable: ['11', 'f(g(2)) = 11']
    },
    solution: {
      steps: [
        { number: 1, description: 'First evaluate g(2)', latex: 'g(2) = 2^2 = 4' },
        { number: 2, description: 'Now evaluate f(4)', latex: 'f(4) = 2(4) + 3 = 8 + 3 = 11' }
      ],
      method: 'Inside-out evaluation'
    },
    hints: [
      { level: 'gentle', text: 'Start from the inside: find g(2) first.' },
      { level: 'moderate', text: 'g(2) = 4. Now find f(4).' },
      { level: 'explicit', text: 'f(4) = 2(4) + 3 = 11' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Function Composition',
      skills: ['function_composition', 'substitution'],
      prerequisites: ['function_notation', 'order_of_operations'],
      concepts: ['composition', 'nested-functions', 'inside-out'],
      commonMistakes: [
        'Evaluating in wrong order',
        'Computing g(f(2)) instead',
        'Arithmetic errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'composition', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-compose-326',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'If f(x) = x + 5 and g(x) = 3x, find (g ∘ f)(x).',
      latex: 'f(x) = x + 5, \\quad g(x) = 3x, \\quad (g \\circ f)(x) = ?'
    },
    answer: {
      type: 'expression',
      correct: '3x + 15',
      acceptable: ['3x+15', '3(x+5)', '3x + 15']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall that (g ∘ f)(x) = g(f(x))', latex: '(g \\circ f)(x) = g(f(x))' },
        { number: 2, description: 'Substitute f(x) into g', latex: 'g(f(x)) = g(x + 5)' },
        { number: 3, description: 'Apply g to (x + 5)', latex: 'g(x + 5) = 3(x + 5) = 3x + 15' }
      ],
      method: 'Substitute inner function into outer'
    },
    hints: [
      { level: 'gentle', text: '(g ∘ f) means "g of f", so substitute f(x) into g.' },
      { level: 'moderate', text: 'g(f(x)) = g(x + 5). Now apply the rule for g.' },
      { level: 'explicit', text: 'g(x + 5) = 3(x + 5) = 3x + 15' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Function Composition',
      skills: ['function_composition', 'algebraic_manipulation'],
      prerequisites: ['function_notation', 'distributive_property'],
      concepts: ['composition', 'substitution', 'simplification'],
      commonMistakes: [
        'Computing f ∘ g instead of g ∘ f',
        'Not distributing correctly',
        'Confusing the order'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'composition', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-compose-327',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'If f(x) = x² and g(x) = x - 4, find (f ∘ g)(x).',
      latex: 'f(x) = x^2, \\quad g(x) = x - 4, \\quad (f \\circ g)(x) = ?'
    },
    answer: {
      type: 'expression',
      correct: '(x - 4)²',
      acceptable: ['(x-4)^2', 'x^2 - 8x + 16', 'x² - 8x + 16', '(x - 4)²']
    },
    solution: {
      steps: [
        { number: 1, description: '(f ∘ g)(x) = f(g(x))', latex: 'f(g(x)) = f(x - 4)' },
        { number: 2, description: 'Apply f to (x - 4)', latex: 'f(x - 4) = (x - 4)^2' },
        { number: 3, description: 'Expand (optional)', latex: '(x-4)^2 = x^2 - 8x + 16' }
      ],
      method: 'Substitute and simplify'
    },
    hints: [
      { level: 'gentle', text: 'f ∘ g means substitute g(x) into f.' },
      { level: 'moderate', text: 'f(g(x)) = f(x - 4) = (x - 4)²' },
      { level: 'explicit', text: '(x - 4)² or x² - 8x + 16' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Function Composition',
      skills: ['function_composition', 'squaring_binomials'],
      prerequisites: ['function_notation', 'binomial_expansion'],
      concepts: ['composition', 'perfect-square-binomial'],
      commonMistakes: [
        'Getting the order wrong',
        'Expanding incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'composition', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-compose-328',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'If f(x) = √x and g(x) = x + 9, find (f ∘ g)(x) and its domain.',
      latex: 'f(x) = \\sqrt{x}, \\quad g(x) = x + 9'
    },
    answer: {
      type: 'expression',
      correct: '√(x + 9), domain: x ≥ -9',
      acceptable: ['sqrt(x+9), x >= -9', '√(x+9), x ≥ -9', 'sqrt(x + 9); x ≥ -9']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find (f ∘ g)(x) = f(g(x))', latex: 'f(g(x)) = f(x + 9) = \\sqrt{x + 9}' },
        { number: 2, description: 'Find domain: radicand must be ≥ 0', latex: 'x + 9 \\geq 0' },
        { number: 3, description: 'Solve for x', latex: 'x \\geq -9' }
      ],
      method: 'Compose, then find domain'
    },
    hints: [
      { level: 'gentle', text: 'First find f(g(x)), then determine when the result is defined.' },
      { level: 'moderate', text: 'f(g(x)) = √(x+9). What must be true about x + 9?' },
      { level: 'explicit', text: 'x + 9 ≥ 0, so x ≥ -9' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Function Composition',
      skills: ['function_composition', 'domain_analysis'],
      prerequisites: ['function_notation', 'radical_domain'],
      concepts: ['composition', 'domain', 'radical-restrictions'],
      commonMistakes: [
        'Forgetting to find domain',
        'Wrong inequality direction'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'composition', 'domain', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-compose-329',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 9,
    question: {
      text: 'If f(x) = 2x - 1, find f(f(x)).',
      latex: 'f(x) = 2x - 1, \\quad f(f(x)) = ?'
    },
    answer: {
      type: 'expression',
      correct: '4x - 3',
      acceptable: ['4x-3', '4x - 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute f(x) into f', latex: 'f(f(x)) = f(2x - 1)' },
        { number: 2, description: 'Apply the rule f(input) = 2(input) - 1', latex: 'f(2x-1) = 2(2x - 1) - 1' },
        { number: 3, description: 'Simplify', latex: '4x - 2 - 1 = 4x - 3' }
      ],
      method: 'Self-composition'
    },
    hints: [
      { level: 'gentle', text: 'f(f(x)) means apply f to f(x). Replace the x in f with (2x - 1).' },
      { level: 'moderate', text: 'f(2x - 1) = 2(2x - 1) - 1. Now simplify.' },
      { level: 'explicit', text: '4x - 2 - 1 = 4x - 3' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Function Composition',
      skills: ['function_composition', 'simplification'],
      prerequisites: ['function_notation', 'distributive_property'],
      concepts: ['composition', 'iteration', 'self-composition'],
      commonMistakes: [
        'Not substituting correctly',
        'Forgetting to subtract 1'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'composition', 'self-composition', 'grade-9']
    }
  },

  // ============================================================================
  // INVERSE FUNCTIONS (Grade 9-10) - IDs 330-334
  // ============================================================================
  {
    id: 'alg-v2-g9-inverse-330',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 9,
    question: {
      text: 'Find the inverse of f(x) = x - 7.',
      latex: 'f(x) = x - 7'
    },
    answer: {
      type: 'expression',
      correct: 'f⁻¹(x) = x + 7',
      acceptable: ['x + 7', 'x+7', 'f^-1(x) = x + 7']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x - 7', color: '#3B82F6', label: 'f(x) = x - 7' },
          { expression: 'x + 7', color: '#EF4444', label: 'f⁻¹(x) = x + 7' },
          { expression: 'x', color: '#9CA3AF', style: 'dashed', label: 'y = x' }
        ],
        domain: [-10, 10],
        range: [-10, 10],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write y = f(x)', latex: 'y = x - 7' },
        { number: 2, description: 'Swap x and y', latex: 'x = y - 7' },
        { number: 3, description: 'Solve for y', latex: 'y = x + 7' },
        { number: 4, description: 'Write the inverse', latex: 'f^{-1}(x) = x + 7' }
      ],
      method: 'Swap and solve'
    },
    hints: [
      { level: 'gentle', text: 'To find an inverse, swap x and y, then solve for y.' },
      { level: 'moderate', text: 'After swapping: x = y - 7. Solve for y.' },
      { level: 'explicit', text: 'y = x + 7' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Inverse Functions',
      skills: ['finding_inverse', 'linear_equations'],
      prerequisites: ['function_notation', 'linear_equations'],
      concepts: ['inverse-function', 'swap-and-solve', 'reflection'],
      commonMistakes: [
        'Forgetting to swap x and y',
        'Sign error when solving'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'inverse', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-inverse-331',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find the inverse of f(x) = 3x + 12.',
      latex: 'f(x) = 3x + 12'
    },
    answer: {
      type: 'expression',
      correct: 'f⁻¹(x) = (x - 12)/3',
      acceptable: ['(x-12)/3', 'x/3 - 4', '(x - 12)/3', 'f^-1(x) = (x-12)/3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write y = f(x)', latex: 'y = 3x + 12' },
        { number: 2, description: 'Swap x and y', latex: 'x = 3y + 12' },
        { number: 3, description: 'Subtract 12', latex: 'x - 12 = 3y' },
        { number: 4, description: 'Divide by 3', latex: 'y = \\frac{x - 12}{3}' }
      ],
      method: 'Swap and solve'
    },
    hints: [
      { level: 'gentle', text: 'Swap x and y, then solve for y step by step.' },
      { level: 'moderate', text: 'x = 3y + 12. First subtract 12, then divide by 3.' },
      { level: 'explicit', text: 'y = (x - 12)/3' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Inverse Functions',
      skills: ['finding_inverse', 'linear_equations'],
      prerequisites: ['function_notation', 'solving_two_step_equations'],
      concepts: ['inverse-function', 'swap-and-solve'],
      commonMistakes: [
        'Wrong order of operations when solving',
        'Not dividing the entire expression by 3'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'inverse', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g10-inverse-332',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Find the inverse of f(x) = (x - 5)/2.',
      latex: 'f(x) = \\frac{x - 5}{2}'
    },
    answer: {
      type: 'expression',
      correct: 'f⁻¹(x) = 2x + 5',
      acceptable: ['2x + 5', '2x+5', 'f^-1(x) = 2x + 5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write y = f(x)', latex: 'y = \\frac{x - 5}{2}' },
        { number: 2, description: 'Swap x and y', latex: 'x = \\frac{y - 5}{2}' },
        { number: 3, description: 'Multiply both sides by 2', latex: '2x = y - 5' },
        { number: 4, description: 'Add 5 to both sides', latex: 'y = 2x + 5' }
      ],
      method: 'Swap and solve'
    },
    hints: [
      { level: 'gentle', text: 'Swap x and y. To clear the fraction, multiply by 2.' },
      { level: 'moderate', text: 'x = (y-5)/2 → 2x = y - 5 → y = 2x + 5' },
      { level: 'explicit', text: 'f⁻¹(x) = 2x + 5' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Inverse Functions',
      skills: ['finding_inverse', 'solving_linear_equations'],
      prerequisites: ['function_notation', 'fractions'],
      concepts: ['inverse-function', 'swap-and-solve'],
      commonMistakes: [
        'Not multiplying both sides by 2',
        'Forgetting to add 5'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'inverse', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-inverse-333',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the inverse of f(x) = x³ + 1.',
      latex: 'f(x) = x^3 + 1'
    },
    answer: {
      type: 'expression',
      correct: 'f⁻¹(x) = ∛(x - 1)',
      acceptable: ['∛(x-1)', 'cbrt(x-1)', '(x-1)^(1/3)', 'f^-1(x) = ∛(x-1)']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write y = f(x)', latex: 'y = x^3 + 1' },
        { number: 2, description: 'Swap x and y', latex: 'x = y^3 + 1' },
        { number: 3, description: 'Subtract 1', latex: 'x - 1 = y^3' },
        { number: 4, description: 'Take cube root of both sides', latex: 'y = \\sqrt[3]{x - 1}' }
      ],
      method: 'Swap and solve'
    },
    hints: [
      { level: 'gentle', text: 'After swapping, you need to undo the "cube then add 1" operation.' },
      { level: 'moderate', text: 'x = y³ + 1 → x - 1 = y³. What undoes cubing?' },
      { level: 'explicit', text: 'y = ∛(x - 1)' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Inverse Functions',
      skills: ['finding_inverse', 'cube_roots'],
      prerequisites: ['function_notation', 'exponents'],
      concepts: ['inverse-function', 'cube-root'],
      commonMistakes: [
        'Using square root instead of cube root',
        'Forgetting to subtract 1 first'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'inverse', 'cubic', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-inverse-334',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Verify that f(x) = 4x - 3 and g(x) = (x + 3)/4 are inverses by showing f(g(x)) = x.',
      latex: 'f(x) = 4x - 3, \\quad g(x) = \\frac{x+3}{4}'
    },
    answer: {
      type: 'exact',
      correct: 'x',
      acceptable: ['x', 'f(g(x)) = x', 'yes', 'verified']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute g(x) into f', latex: 'f(g(x)) = f\\left(\\frac{x+3}{4}\\right)' },
        { number: 2, description: 'Apply f', latex: '= 4 \\cdot \\frac{x+3}{4} - 3' },
        { number: 3, description: 'Simplify', latex: '= (x + 3) - 3 = x' },
        { number: 4, description: 'Conclusion', latex: 'f(g(x)) = x \\checkmark' }
      ],
      method: 'Composition verification'
    },
    hints: [
      { level: 'gentle', text: 'Calculate f(g(x)) by substituting g(x) into f.' },
      { level: 'moderate', text: 'f((x+3)/4) = 4 · ((x+3)/4) - 3. The 4s cancel!' },
      { level: 'explicit', text: '= (x+3) - 3 = x. Verified!' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Inverse Functions',
      skills: ['verifying_inverses', 'composition'],
      prerequisites: ['function_composition', 'inverse_functions'],
      concepts: ['inverse-verification', 'composition'],
      commonMistakes: [
        'Calculation errors',
        'Not simplifying completely'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'inverse', 'verification', 'grade-10']
    }
  },

  // ============================================================================
  // PIECEWISE FUNCTIONS (Grade 9-10) - IDs 335-339
  // ============================================================================
  {
    id: 'alg-v2-g9-piecewise-335',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 9,
    question: {
      text: 'Evaluate f(3) for the piecewise function: f(x) = { 2x if x < 0; x² if x ≥ 0 }',
      latex: 'f(x) = \\begin{cases} 2x & \\text{if } x < 0 \\\\ x^2 & \\text{if } x \\geq 0 \\end{cases}'
    },
    answer: {
      type: 'numeric',
      correct: '9',
      acceptable: ['9', 'f(3) = 9']
    },
    solution: {
      steps: [
        { number: 1, description: 'Determine which piece to use', latex: '3 \\geq 0, \\text{ so use } f(x) = x^2' },
        { number: 2, description: 'Evaluate', latex: 'f(3) = 3^2 = 9' }
      ],
      method: 'Choose correct piece'
    },
    hints: [
      { level: 'gentle', text: 'First check: is 3 less than 0 or greater than/equal to 0?' },
      { level: 'moderate', text: '3 ≥ 0, so use the second piece: f(x) = x²' },
      { level: 'explicit', text: 'f(3) = 3² = 9' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Piecewise Functions',
      skills: ['evaluating_piecewise', 'domain_checking'],
      prerequisites: ['function_notation', 'inequalities'],
      concepts: ['piecewise-functions', 'domain-conditions'],
      commonMistakes: [
        'Using wrong piece',
        'Not checking the condition first'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'piecewise', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-piecewise-336',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Evaluate f(-2) for: f(x) = { x + 5 if x < 1; 3x - 1 if x ≥ 1 }',
      latex: 'f(x) = \\begin{cases} x + 5 & \\text{if } x < 1 \\\\ 3x - 1 & \\text{if } x \\geq 1 \\end{cases}'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', 'f(-2) = 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Check the condition', latex: '-2 < 1, \\text{ so use } f(x) = x + 5' },
        { number: 2, description: 'Evaluate', latex: 'f(-2) = -2 + 5 = 3' }
      ],
      method: 'Choose correct piece'
    },
    hints: [
      { level: 'gentle', text: 'Is -2 less than 1 or greater than/equal to 1?' },
      { level: 'moderate', text: '-2 < 1, so use f(x) = x + 5.' },
      { level: 'explicit', text: 'f(-2) = -2 + 5 = 3' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Piecewise Functions',
      skills: ['evaluating_piecewise', 'integer_arithmetic'],
      prerequisites: ['function_notation', 'inequalities'],
      concepts: ['piecewise-functions', 'negative-numbers'],
      commonMistakes: [
        'Using wrong piece',
        'Arithmetic error with negatives'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'piecewise', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g10-piecewise-337',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Find the value of x where the piecewise function is discontinuous: f(x) = { x² if x < 2; 3x - 2 if x ≥ 2 }',
      latex: 'f(x) = \\begin{cases} x^2 & \\text{if } x < 2 \\\\ 3x - 2 & \\text{if } x \\geq 2 \\end{cases}'
    },
    answer: {
      type: 'exact',
      correct: 'continuous everywhere',
      acceptable: ['continuous', 'no discontinuity', 'none', 'continuous at x = 2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Check the boundary x = 2', latex: '\\text{Left limit: } \\lim_{x \\to 2^-} x^2 = 4' },
        { number: 2, description: 'Check right side value', latex: 'f(2) = 3(2) - 2 = 4' },
        { number: 3, description: 'Compare', latex: '4 = 4, \\text{ so continuous at } x = 2' }
      ],
      method: 'Check boundary values'
    },
    hints: [
      { level: 'gentle', text: 'Check if the two pieces meet at the boundary point x = 2.' },
      { level: 'moderate', text: 'From the left: 2² = 4. From the right: 3(2) - 2 = 4.' },
      { level: 'explicit', text: 'Both give 4, so the function is continuous everywhere.' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Piecewise Functions',
      skills: ['continuity_analysis', 'evaluating_limits'],
      prerequisites: ['piecewise_functions', 'limit_concept'],
      concepts: ['continuity', 'piecewise-functions', 'limits'],
      commonMistakes: [
        'Not checking the boundary',
        'Assuming all piecewise functions are discontinuous'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'piecewise', 'continuity', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-piecewise-338',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Write the absolute value function f(x) = |x - 3| as a piecewise function.',
      latex: 'f(x) = |x - 3|'
    },
    answer: {
      type: 'expression',
      correct: 'f(x) = { x - 3 if x ≥ 3; -(x - 3) if x < 3 }',
      acceptable: ['x-3 if x>=3, 3-x if x<3', '{x-3 if x≥3; 3-x if x<3}', 'f(x) = { x-3, x≥3; 3-x, x<3 }']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall |a| = a if a ≥ 0, and |a| = -a if a < 0', latex: '|x-3| = x-3 \\text{ when } x - 3 \\geq 0' },
        { number: 2, description: 'Solve for the first case', latex: 'x - 3 \\geq 0 \\Rightarrow x \\geq 3' },
        { number: 3, description: 'Write the piecewise form', latex: 'f(x) = \\begin{cases} x - 3 & \\text{if } x \\geq 3 \\\\ -(x-3) & \\text{if } x < 3 \\end{cases}' },
        { number: 4, description: 'Simplify second piece', latex: '-(x-3) = -x + 3 = 3 - x' }
      ],
      method: 'Absolute value definition'
    },
    hints: [
      { level: 'gentle', text: 'Recall: |a| = a when a ≥ 0, and |a| = -a when a < 0.' },
      { level: 'moderate', text: 'Set x - 3 ≥ 0 to find when |x-3| = x-3. Otherwise, |x-3| = -(x-3).' },
      { level: 'explicit', text: 'f(x) = x-3 if x≥3, f(x) = 3-x if x<3' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Piecewise Functions',
      skills: ['absolute_value_to_piecewise', 'case_analysis'],
      prerequisites: ['absolute_value', 'inequalities'],
      concepts: ['absolute-value', 'piecewise-representation'],
      commonMistakes: [
        'Wrong direction for inequality',
        'Not simplifying -(x-3)'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'piecewise', 'absolute-value', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-piecewise-339',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the value of k that makes the piecewise function continuous: f(x) = { 2x + k if x < 3; x² if x ≥ 3 }',
      latex: 'f(x) = \\begin{cases} 2x + k & \\text{if } x < 3 \\\\ x^2 & \\text{if } x \\geq 3 \\end{cases}'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', 'k = 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'For continuity, the pieces must meet at x = 3', latex: '\\lim_{x \\to 3^-} (2x + k) = f(3)' },
        { number: 2, description: 'Evaluate left limit', latex: '2(3) + k = 6 + k' },
        { number: 3, description: 'Evaluate f(3)', latex: 'f(3) = 3^2 = 9' },
        { number: 4, description: 'Set them equal', latex: '6 + k = 9 \\Rightarrow k = 3' }
      ],
      method: 'Set limits equal'
    },
    hints: [
      { level: 'gentle', text: 'For the function to be continuous, both pieces must have the same value at x = 3.' },
      { level: 'moderate', text: 'Left side at x→3: 2(3) + k = 6 + k. Right side at x=3: 9.' },
      { level: 'explicit', text: '6 + k = 9, so k = 3.' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Piecewise Functions',
      skills: ['finding_continuity_parameter', 'solving_equations'],
      prerequisites: ['piecewise_functions', 'continuity'],
      concepts: ['continuity', 'piecewise-functions', 'parameter-finding'],
      commonMistakes: [
        'Evaluating at wrong point',
        'Setting up equation incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'piecewise', 'continuity', 'grade-10']
    }
  },

  // ============================================================================
  // TRANSFORMATIONS (Grade 9-10) - IDs 340-344
  // ============================================================================
  {
    id: 'alg-v2-g9-transform-340',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 9,
    question: {
      text: 'Describe the transformation from f(x) = x² to g(x) = x² + 4.',
      latex: 'f(x) = x^2 \\to g(x) = x^2 + 4'
    },
    answer: {
      type: 'exact',
      correct: 'vertical shift up 4 units',
      acceptable: ['shift up 4', 'translated up 4', 'vertical translation up 4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2', color: '#3B82F6', label: 'f(x) = x²' },
          { expression: 'x^2 + 4', color: '#EF4444', label: 'g(x) = x² + 4' }
        ],
        domain: [-5, 5],
        range: [-2, 15],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the change', latex: 'g(x) = f(x) + 4' },
        { number: 2, description: 'Adding outside shifts vertically', latex: '+4 \\text{ shifts up 4 units}' }
      ],
      method: 'Identify transformation type'
    },
    hints: [
      { level: 'gentle', text: 'What is added to the function? Is it inside or outside the function?' },
      { level: 'moderate', text: 'Adding 4 to the output (outside) affects the y-values.' },
      { level: 'explicit', text: 'The graph shifts up 4 units.' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Transformations',
      skills: ['identifying_transformations', 'vertical_shifts'],
      prerequisites: ['graphing_functions', 'function_notation'],
      concepts: ['vertical-shift', 'function-transformation'],
      commonMistakes: [
        'Confusing with horizontal shift',
        'Getting direction wrong'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'transformations', 'shifts', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-transform-341',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Describe the transformation from f(x) = |x| to g(x) = |x - 5|.',
      latex: 'f(x) = |x| \\to g(x) = |x - 5|'
    },
    answer: {
      type: 'exact',
      correct: 'horizontal shift right 5 units',
      acceptable: ['shift right 5', 'translated right 5', 'horizontal translation right 5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'abs(x)', color: '#3B82F6', label: 'f(x) = |x|' },
          { expression: 'abs(x - 5)', color: '#EF4444', label: 'g(x) = |x - 5|' }
        ],
        domain: [-3, 10],
        range: [-1, 8],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the change', latex: 'g(x) = f(x - 5)' },
        { number: 2, description: 'Subtracting inside shifts horizontally', latex: 'x - 5 \\text{ shifts right 5 units}' },
        { number: 3, description: 'Note: opposite direction of the sign', latex: '-5 \\text{ inside } \\Rightarrow \\text{ right}' }
      ],
      method: 'Identify transformation type'
    },
    hints: [
      { level: 'gentle', text: 'The change is inside the function, affecting the x-values.' },
      { level: 'moderate', text: 'f(x - h) shifts the graph h units to the right.' },
      { level: 'explicit', text: 'The graph shifts right 5 units.' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Transformations',
      skills: ['identifying_transformations', 'horizontal_shifts'],
      prerequisites: ['graphing_functions', 'function_notation'],
      concepts: ['horizontal-shift', 'function-transformation'],
      commonMistakes: [
        'Getting direction backwards',
        'Confusing with vertical shift'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'transformations', 'shifts', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g10-transform-342',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Describe the transformation from f(x) = √x to g(x) = -√x.',
      latex: 'f(x) = \\sqrt{x} \\to g(x) = -\\sqrt{x}'
    },
    answer: {
      type: 'exact',
      correct: 'reflection over the x-axis',
      acceptable: ['reflected over x-axis', 'reflection across x-axis', 'flipped over x-axis']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'sqrt(x)', color: '#3B82F6', label: 'f(x) = √x' },
          { expression: '-sqrt(x)', color: '#EF4444', label: 'g(x) = -√x' }
        ],
        domain: [0, 10],
        range: [-4, 4],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the change', latex: 'g(x) = -f(x)' },
        { number: 2, description: 'Multiplying by -1 outside reflects over x-axis', latex: '-f(x) \\text{ reflects over x-axis}' }
      ],
      method: 'Identify transformation type'
    },
    hints: [
      { level: 'gentle', text: 'What does multiplying the entire function by -1 do?' },
      { level: 'moderate', text: 'Negative outside affects the y-values (flips them).' },
      { level: 'explicit', text: 'The graph is reflected over the x-axis.' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Transformations',
      skills: ['identifying_transformations', 'reflections'],
      prerequisites: ['graphing_functions', 'function_notation'],
      concepts: ['reflection', 'function-transformation', 'x-axis-reflection'],
      commonMistakes: [
        'Confusing with y-axis reflection',
        'Thinking the domain changes'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'transformations', 'reflection', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-transform-343',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Describe the transformation from f(x) = x² to g(x) = 2x².',
      latex: 'f(x) = x^2 \\to g(x) = 2x^2'
    },
    answer: {
      type: 'exact',
      correct: 'vertical stretch by a factor of 2',
      acceptable: ['vertical stretch by 2', 'stretched vertically by factor 2', 'vertical stretch factor 2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2', color: '#3B82F6', label: 'f(x) = x²' },
          { expression: '2*x^2', color: '#EF4444', label: 'g(x) = 2x²' }
        ],
        domain: [-3, 3],
        range: [-1, 10],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the change', latex: 'g(x) = 2 \\cdot f(x)' },
        { number: 2, description: 'Multiplying outside by a > 1 stretches vertically', latex: '2 > 1 \\Rightarrow \\text{vertical stretch by factor 2}' }
      ],
      method: 'Identify transformation type'
    },
    hints: [
      { level: 'gentle', text: 'The function is multiplied by 2 outside. How does this affect the graph?' },
      { level: 'moderate', text: 'Multiplying by a number > 1 makes the graph taller (steeper).' },
      { level: 'explicit', text: 'Vertical stretch by a factor of 2.' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Transformations',
      skills: ['identifying_transformations', 'vertical_stretch'],
      prerequisites: ['graphing_functions', 'function_notation'],
      concepts: ['vertical-stretch', 'function-transformation'],
      commonMistakes: [
        'Confusing stretch with shift',
        'Saying horizontal stretch instead'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'transformations', 'stretch', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-transform-344',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Write the equation for f(x) = x³ shifted left 2 and down 5.',
      latex: 'f(x) = x^3 \\text{ shifted left 2 and down 5}'
    },
    answer: {
      type: 'expression',
      correct: 'g(x) = (x + 2)³ - 5',
      acceptable: ['(x+2)^3 - 5', '(x + 2)³ - 5', 'y = (x+2)^3 - 5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply horizontal shift (left 2)', latex: 'x \\to x + 2' },
        { number: 2, description: 'Apply vertical shift (down 5)', latex: 'f(x) \\to f(x) - 5' },
        { number: 3, description: 'Combine', latex: 'g(x) = (x+2)^3 - 5' }
      ],
      method: 'Apply transformations in order'
    },
    hints: [
      { level: 'gentle', text: 'Left 2 means x → (x+2). Down 5 means subtract 5 from the result.' },
      { level: 'moderate', text: 'Replace x with (x+2) and subtract 5 from the whole function.' },
      { level: 'explicit', text: 'g(x) = (x + 2)³ - 5' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Transformations',
      skills: ['applying_transformations', 'combining_transformations'],
      prerequisites: ['horizontal_shifts', 'vertical_shifts'],
      concepts: ['combined-transformations', 'function-transformation'],
      commonMistakes: [
        'Using (x-2) instead of (x+2) for left shift',
        'Adding 5 instead of subtracting'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'transformations', 'combined', 'grade-10']
    }
  },

  // ============================================================================
  // DOMAIN AND RANGE (Grade 9-10) - IDs 345-349
  // ============================================================================
  {
    id: 'alg-v2-g9-domain-345',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 9,
    question: {
      text: 'Find the domain of f(x) = 5/(x + 4).',
      latex: 'f(x) = \\frac{5}{x + 4}'
    },
    answer: {
      type: 'expression',
      correct: 'all real numbers except x = -4',
      acceptable: ['x ≠ -4', 'x != -4', '(-∞, -4) ∪ (-4, ∞)', 'ℝ \\ {-4}']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find values that make the denominator zero', latex: 'x + 4 = 0 \\Rightarrow x = -4' },
        { number: 2, description: 'Exclude this value from the domain', latex: '\\text{Domain: } x \\neq -4' }
      ],
      method: 'Find denominator restrictions'
    },
    hints: [
      { level: 'gentle', text: 'What value of x would make you divide by zero?' },
      { level: 'moderate', text: 'Set the denominator equal to 0 and solve.' },
      { level: 'explicit', text: 'x + 4 = 0 → x = -4. Domain: x ≠ -4' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Domain and Range',
      skills: ['finding_domain', 'rational_restrictions'],
      prerequisites: ['fractions', 'solving_equations'],
      concepts: ['domain', 'rational-functions', 'restrictions'],
      commonMistakes: [
        'Including the excluded value',
        'Solving for wrong sign'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'domain', 'rational', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-domain-346',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find the domain of f(x) = √(x - 3).',
      latex: 'f(x) = \\sqrt{x - 3}'
    },
    answer: {
      type: 'interval',
      correct: 'x ≥ 3',
      acceptable: ['x >= 3', '[3, ∞)', 'x ≥ 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'The radicand must be non-negative', latex: 'x - 3 \\geq 0' },
        { number: 2, description: 'Solve the inequality', latex: 'x \\geq 3' }
      ],
      method: 'Radicand ≥ 0'
    },
    hints: [
      { level: 'gentle', text: 'You can only take the square root of non-negative numbers.' },
      { level: 'moderate', text: 'Set x - 3 ≥ 0 and solve.' },
      { level: 'explicit', text: 'x ≥ 3' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Domain and Range',
      skills: ['finding_domain', 'radical_restrictions'],
      prerequisites: ['square_roots', 'inequalities'],
      concepts: ['domain', 'radical-functions', 'restrictions'],
      commonMistakes: [
        'Using > instead of ≥',
        'Solving inequality incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'domain', 'radical', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g10-range-347',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Find the range of f(x) = x² + 1.',
      latex: 'f(x) = x^2 + 1'
    },
    answer: {
      type: 'interval',
      correct: 'y ≥ 1',
      acceptable: ['y >= 1', '[1, ∞)', 'y ≥ 1', 'f(x) ≥ 1']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x^2 + 1', color: '#3B82F6', label: 'f(x) = x² + 1' }
        ],
        domain: [-4, 4],
        range: [0, 10],
        showGrid: true,
        points: [
          { x: 0, y: 1, label: 'Minimum (0, 1)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the minimum value of x²', latex: 'x^2 \\geq 0 \\text{ for all } x' },
        { number: 2, description: 'Add 1 to both sides', latex: 'x^2 + 1 \\geq 1' },
        { number: 3, description: 'State the range', latex: '\\text{Range: } y \\geq 1 \\text{ or } [1, \\infty)' }
      ],
      method: 'Analyze minimum value'
    },
    hints: [
      { level: 'gentle', text: 'What is the smallest value x² can be?' },
      { level: 'moderate', text: 'x² ≥ 0 always, so x² + 1 ≥ 1.' },
      { level: 'explicit', text: 'Range: y ≥ 1 or [1, ∞)' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Domain and Range',
      skills: ['finding_range', 'analyzing_quadratics'],
      prerequisites: ['quadratic_functions', 'inequalities'],
      concepts: ['range', 'quadratic-functions', 'minimum-value'],
      commonMistakes: [
        'Thinking range is all real numbers',
        'Forgetting to add 1 to the minimum'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'range', 'quadratic', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-domain-348',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the domain of f(x) = √(x - 2)/(x - 5).',
      latex: 'f(x) = \\frac{\\sqrt{x - 2}}{x - 5}'
    },
    answer: {
      type: 'expression',
      correct: 'x ≥ 2 and x ≠ 5',
      acceptable: ['[2,5) ∪ (5,∞)', 'x ≥ 2, x ≠ 5', '{x | x ≥ 2 and x ≠ 5}']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find radical restriction', latex: 'x - 2 \\geq 0 \\Rightarrow x \\geq 2' },
        { number: 2, description: 'Find denominator restriction', latex: 'x - 5 \\neq 0 \\Rightarrow x \\neq 5' },
        { number: 3, description: 'Combine both restrictions', latex: '\\text{Domain: } x \\geq 2 \\text{ and } x \\neq 5' }
      ],
      method: 'Combine all restrictions'
    },
    hints: [
      { level: 'gentle', text: 'You have both a square root and a denominator. What restrictions does each impose?' },
      { level: 'moderate', text: 'Radical: x - 2 ≥ 0. Denominator: x - 5 ≠ 0.' },
      { level: 'explicit', text: 'x ≥ 2 AND x ≠ 5, so [2, 5) ∪ (5, ∞)' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Domain and Range',
      skills: ['finding_domain', 'combining_restrictions'],
      prerequisites: ['radical_domain', 'rational_domain'],
      concepts: ['domain', 'multiple-restrictions'],
      commonMistakes: [
        'Missing one of the restrictions',
        'Not combining correctly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'domain', 'combined-restrictions', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-range-349',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the range of f(x) = -|x| + 3.',
      latex: 'f(x) = -|x| + 3'
    },
    answer: {
      type: 'interval',
      correct: 'y ≤ 3',
      acceptable: ['y <= 3', '(-∞, 3]', 'y ≤ 3', 'f(x) ≤ 3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '-abs(x) + 3', color: '#3B82F6', label: 'f(x) = -|x| + 3' }
        ],
        domain: [-6, 6],
        range: [-3, 5],
        showGrid: true,
        points: [
          { x: 0, y: 3, label: 'Maximum (0, 3)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Note that |x| ≥ 0 always', latex: '|x| \\geq 0' },
        { number: 2, description: 'Therefore -|x| ≤ 0', latex: '-|x| \\leq 0' },
        { number: 3, description: 'Add 3 to both sides', latex: '-|x| + 3 \\leq 3' },
        { number: 4, description: 'State the range', latex: '\\text{Range: } y \\leq 3 \\text{ or } (-\\infty, 3]' }
      ],
      method: 'Analyze maximum value'
    },
    hints: [
      { level: 'gentle', text: 'The absolute value is negated, so the graph opens downward.' },
      { level: 'moderate', text: '-|x| ≤ 0 always, so -|x| + 3 ≤ 3.' },
      { level: 'explicit', text: 'Range: y ≤ 3 or (-∞, 3]' }
    ],
    pedagogy: {
      topic: 'Functions',
      subTopic: 'Domain and Range',
      skills: ['finding_range', 'analyzing_absolute_value'],
      prerequisites: ['absolute_value_functions', 'inequalities'],
      concepts: ['range', 'absolute-value-functions', 'maximum-value'],
      commonMistakes: [
        'Getting direction wrong (≥ instead of ≤)',
        'Forgetting the reflection means maximum not minimum'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['functions', 'range', 'absolute-value', 'grade-10']
    }
  }
]

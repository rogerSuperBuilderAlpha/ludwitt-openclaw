/**
 * Advanced Algebra - MathProblemV2 Format
 * 
 * Batch 2 Expansion - 25 problems (IDs 300-324)
 * 
 * Topics covered:
 * - Rational Expressions (Grade 10) - 5 problems
 * - Radical Equations (Grade 10) - 5 problems
 * - Complex Numbers (Grade 10-11) - 5 problems
 * - Absolute Value Equations (Grade 9-10) - 5 problems
 * - Logarithmic Equations (Grade 10-11) - 5 problems
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const ADVANCED_ALGEBRA_V2: MathProblemV2[] = [
  // ============================================================================
  // RATIONAL EXPRESSIONS (Grade 10) - IDs 300-304
  // ============================================================================
  {
    id: 'alg-v2-g10-rational-300',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 10,
    question: {
      text: 'Simplify the rational expression: (x² - 9)/(x² - 6x + 9)',
      latex: '\\frac{x^2 - 9}{x^2 - 6x + 9}'
    },
    answer: {
      type: 'expression',
      correct: '(x + 3)/(x - 3)',
      acceptable: ['(x+3)/(x-3)', '\\frac{x+3}{x-3}', '(x + 3)/(x - 3)']
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor the numerator (difference of squares)', latex: 'x^2 - 9 = (x+3)(x-3)' },
        { number: 2, description: 'Factor the denominator (perfect square trinomial)', latex: 'x^2 - 6x + 9 = (x-3)^2' },
        { number: 3, description: 'Write the factored form', latex: '\\frac{(x+3)(x-3)}{(x-3)^2}' },
        { number: 4, description: 'Cancel common factors', latex: '\\frac{x+3}{x-3}, \\quad x \\neq 3' }
      ],
      method: 'Factoring and Simplifying'
    },
    hints: [
      { level: 'gentle', text: 'Can you factor both the numerator and denominator?' },
      { level: 'moderate', text: 'The numerator is a difference of squares. The denominator is a perfect square trinomial.' },
      { level: 'explicit', text: 'Numerator: (x+3)(x-3). Denominator: (x-3)². Cancel one (x-3) from each.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Rational Expressions',
      skills: ['factoring', 'simplifying_rational_expressions', 'recognizing_patterns'],
      prerequisites: ['factoring_polynomials', 'difference_of_squares', 'perfect_square_trinomials'],
      concepts: ['rational-expressions', 'factoring', 'simplification'],
      commonMistakes: [
        'Forgetting to state the restriction x ≠ 3',
        'Not recognizing the perfect square trinomial pattern',
        'Canceling terms instead of factors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'rational-expressions', 'factoring', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-rational-301',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Multiply and simplify: (x² - 4)/(x + 3) · (x + 3)/(x - 2)',
      latex: '\\frac{x^2 - 4}{x + 3} \\cdot \\frac{x + 3}{x - 2}'
    },
    answer: {
      type: 'expression',
      correct: 'x + 2',
      acceptable: ['x+2', '(x+2)', 'x + 2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor the difference of squares', latex: 'x^2 - 4 = (x+2)(x-2)' },
        { number: 2, description: 'Rewrite the expression', latex: '\\frac{(x+2)(x-2)}{x + 3} \\cdot \\frac{x + 3}{x - 2}' },
        { number: 3, description: 'Cancel common factors (x+3) and (x-2)', latex: '\\frac{(x+2)\\cancel{(x-2)}}{\\cancel{x + 3}} \\cdot \\frac{\\cancel{x + 3}}{\\cancel{x - 2}}' },
        { number: 4, description: 'Simplify', latex: 'x + 2, \\quad x \\neq -3, x \\neq 2' }
      ],
      method: 'Factor and cancel'
    },
    hints: [
      { level: 'gentle', text: 'First factor x² - 4 as a difference of squares.' },
      { level: 'moderate', text: 'x² - 4 = (x+2)(x-2). Look for common factors to cancel.' },
      { level: 'explicit', text: 'After canceling (x+3) and (x-2), you get x + 2.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Rational Expressions',
      skills: ['factoring', 'multiplying_rational_expressions'],
      prerequisites: ['factoring_polynomials', 'multiplying_fractions'],
      concepts: ['rational-expressions', 'factoring', 'multiplication'],
      commonMistakes: [
        'Forgetting to factor first',
        'Canceling terms instead of factors',
        'Missing restrictions'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'rational-expressions', 'multiplication', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-rational-302',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Divide and simplify: (x² - 1)/(x² + 2x) ÷ (x - 1)/(x)',
      latex: '\\frac{x^2 - 1}{x^2 + 2x} \\div \\frac{x - 1}{x}'
    },
    answer: {
      type: 'expression',
      correct: '(x + 1)/(x + 2)',
      acceptable: ['(x+1)/(x+2)', '\\frac{x+1}{x+2}', '(x + 1)/(x + 2)']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert division to multiplication by reciprocal', latex: '\\frac{x^2 - 1}{x^2 + 2x} \\cdot \\frac{x}{x - 1}' },
        { number: 2, description: 'Factor all expressions', latex: '\\frac{(x+1)(x-1)}{x(x + 2)} \\cdot \\frac{x}{x - 1}' },
        { number: 3, description: 'Cancel common factors x and (x-1)', latex: '\\frac{(x+1)\\cancel{(x-1)}}{\\cancel{x}(x + 2)} \\cdot \\frac{\\cancel{x}}{\\cancel{x - 1}}' },
        { number: 4, description: 'Simplify', latex: '\\frac{x+1}{x+2}, \\quad x \\neq 0, 1, -2' }
      ],
      method: 'Multiply by reciprocal'
    },
    hints: [
      { level: 'gentle', text: 'To divide fractions, multiply by the reciprocal of the second fraction.' },
      { level: 'moderate', text: 'Factor: x² - 1 = (x+1)(x-1) and x² + 2x = x(x+2).' },
      { level: 'explicit', text: 'After canceling x and (x-1), you get (x+1)/(x+2).' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Rational Expressions',
      skills: ['factoring', 'dividing_rational_expressions'],
      prerequisites: ['factoring_polynomials', 'dividing_fractions'],
      concepts: ['rational-expressions', 'factoring', 'division'],
      commonMistakes: [
        'Forgetting to flip the second fraction',
        'Not factoring completely',
        'Canceling incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'rational-expressions', 'division', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-rational-303',
    version: 2,
    type: 'algebra',
    difficulty: 10.5,
    gradeLevel: 10,
    question: {
      text: 'Add and simplify: 2/(x - 3) + 5/(x + 2)',
      latex: '\\frac{2}{x - 3} + \\frac{5}{x + 2}'
    },
    answer: {
      type: 'expression',
      correct: '(7x - 11)/((x - 3)(x + 2))',
      acceptable: ['(7x-11)/((x-3)(x+2))', '(7x - 11)/(x² - x - 6)', '(7x-11)/(x^2-x-6)']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the LCD', latex: '\\text{LCD} = (x-3)(x+2)' },
        { number: 2, description: 'Rewrite each fraction with the LCD', latex: '\\frac{2(x+2)}{(x-3)(x+2)} + \\frac{5(x-3)}{(x-3)(x+2)}' },
        { number: 3, description: 'Expand the numerators', latex: '\\frac{2x + 4 + 5x - 15}{(x-3)(x+2)}' },
        { number: 4, description: 'Combine like terms', latex: '\\frac{7x - 11}{(x-3)(x+2)}' }
      ],
      method: 'Find LCD and add'
    },
    hints: [
      { level: 'gentle', text: 'What is the least common denominator of (x-3) and (x+2)?' },
      { level: 'moderate', text: 'LCD = (x-3)(x+2). Multiply each fraction to get this denominator.' },
      { level: 'explicit', text: '2(x+2) + 5(x-3) = 2x+4+5x-15 = 7x-11' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Rational Expressions',
      skills: ['adding_rational_expressions', 'finding_lcd'],
      prerequisites: ['adding_fractions', 'factoring'],
      concepts: ['rational-expressions', 'lcd', 'addition'],
      commonMistakes: [
        'Wrong LCD',
        'Forgetting to multiply the numerator',
        'Combining like terms incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'rational-expressions', 'addition', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-rational-304',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 10,
    question: {
      text: 'Simplify the complex fraction: (1/x + 1/y)/(1/x - 1/y)',
      latex: '\\frac{\\frac{1}{x} + \\frac{1}{y}}{\\frac{1}{x} - \\frac{1}{y}}'
    },
    answer: {
      type: 'expression',
      correct: '(x + y)/(y - x)',
      acceptable: ['(x+y)/(y-x)', '(y+x)/(y-x)', '-(x+y)/(x-y)']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find common denominator for numerator', latex: '\\frac{1}{x} + \\frac{1}{y} = \\frac{y + x}{xy}' },
        { number: 2, description: 'Find common denominator for denominator', latex: '\\frac{1}{x} - \\frac{1}{y} = \\frac{y - x}{xy}' },
        { number: 3, description: 'Rewrite as division', latex: '\\frac{\\frac{y+x}{xy}}{\\frac{y-x}{xy}}' },
        { number: 4, description: 'Multiply by reciprocal', latex: '\\frac{y+x}{xy} \\cdot \\frac{xy}{y-x} = \\frac{x+y}{y-x}' }
      ],
      method: 'Simplify top and bottom, then divide'
    },
    hints: [
      { level: 'gentle', text: 'First simplify the numerator and denominator of the complex fraction separately.' },
      { level: 'moderate', text: 'Top = (y+x)/xy and Bottom = (y-x)/xy' },
      { level: 'explicit', text: 'The xy cancels, leaving (x+y)/(y-x)' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Rational Expressions',
      skills: ['simplifying_complex_fractions', 'adding_fractions'],
      prerequisites: ['adding_fractions', 'dividing_fractions'],
      concepts: ['complex-fractions', 'rational-expressions'],
      commonMistakes: [
        'Not finding common denominators first',
        'Sign errors when subtracting',
        'Forgetting to flip when dividing'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'rational-expressions', 'complex-fraction', 'grade-10']
    }
  },

  // ============================================================================
  // RADICAL EQUATIONS (Grade 10) - IDs 305-309
  // ============================================================================
  {
    id: 'alg-v2-g10-radical-305',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: √(x + 5) = 3',
      latex: '\\sqrt{x + 5} = 3'
    },
    answer: {
      type: 'numeric',
      correct: '4',
      acceptable: ['4', 'x = 4']
    },
    solution: {
      steps: [
        { number: 1, description: 'Square both sides', latex: '(\\sqrt{x+5})^2 = 3^2' },
        { number: 2, description: 'Simplify', latex: 'x + 5 = 9' },
        { number: 3, description: 'Subtract 5 from both sides', latex: 'x = 4' },
        { number: 4, description: 'Check: √(4+5) = √9 = 3 ✓', latex: '\\sqrt{9} = 3 \\checkmark' }
      ],
      method: 'Isolate radical, square both sides'
    },
    hints: [
      { level: 'gentle', text: 'To eliminate a square root, square both sides.' },
      { level: 'moderate', text: 'Squaring gives x + 5 = 9. Now solve for x.' },
      { level: 'explicit', text: 'x = 4. Check: √(4+5) = √9 = 3 ✓' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Radical Equations',
      skills: ['solving_radical_equations', 'algebraic_manipulation'],
      prerequisites: ['square_roots', 'linear_equations'],
      concepts: ['radical-equations', 'squaring-property'],
      commonMistakes: [
        'Forgetting to check for extraneous solutions',
        'Not squaring both sides correctly'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'radical-equations', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-radical-306',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Solve: √(2x - 1) = x - 2',
      latex: '\\sqrt{2x - 1} = x - 2'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', 'x = 5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Square both sides', latex: '2x - 1 = (x-2)^2' },
        { number: 2, description: 'Expand the right side', latex: '2x - 1 = x^2 - 4x + 4' },
        { number: 3, description: 'Rearrange to standard form', latex: '0 = x^2 - 6x + 5' },
        { number: 4, description: 'Factor', latex: '0 = (x-1)(x-5)' },
        { number: 5, description: 'Solve', latex: 'x = 1 \\text{ or } x = 5' },
        { number: 6, description: 'Check x=1: √(2(1)-1) = √1 = 1, but 1-2 = -1 ✗', latex: 'x = 1 \\text{ is extraneous}' },
        { number: 7, description: 'Check x=5: √(2(5)-1) = √9 = 3, and 5-2 = 3 ✓', latex: 'x = 5 \\checkmark' }
      ],
      method: 'Square, solve quadratic, check'
    },
    hints: [
      { level: 'gentle', text: 'Square both sides to eliminate the radical.' },
      { level: 'moderate', text: 'After squaring: 2x - 1 = x² - 4x + 4. This is a quadratic!' },
      { level: 'explicit', text: 'x = 1 or x = 5. Check both - only x = 5 works.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Radical Equations',
      skills: ['solving_radical_equations', 'solving_quadratics'],
      prerequisites: ['square_roots', 'quadratic_equations'],
      concepts: ['radical-equations', 'extraneous-solutions'],
      commonMistakes: [
        'Not checking for extraneous solutions',
        'Expanding (x-2)² incorrectly',
        'Accepting both solutions without checking'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'radical-equations', 'extraneous-solutions', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-radical-307',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: ∛(x + 8) = -2',
      latex: '\\sqrt[3]{x + 8} = -2'
    },
    answer: {
      type: 'numeric',
      correct: '-16',
      acceptable: ['-16', 'x = -16']
    },
    solution: {
      steps: [
        { number: 1, description: 'Cube both sides', latex: '(\\sqrt[3]{x+8})^3 = (-2)^3' },
        { number: 2, description: 'Simplify', latex: 'x + 8 = -8' },
        { number: 3, description: 'Subtract 8 from both sides', latex: 'x = -16' },
        { number: 4, description: 'Check: ∛(-16+8) = ∛(-8) = -2 ✓', latex: '\\sqrt[3]{-8} = -2 \\checkmark' }
      ],
      method: 'Cube both sides'
    },
    hints: [
      { level: 'gentle', text: 'To eliminate a cube root, cube both sides.' },
      { level: 'moderate', text: 'Cubing gives x + 8 = -8. Note: (-2)³ = -8' },
      { level: 'explicit', text: 'x = -16' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Radical Equations',
      skills: ['solving_radical_equations', 'cube_roots'],
      prerequisites: ['cube_roots', 'linear_equations'],
      concepts: ['radical-equations', 'cube-roots'],
      commonMistakes: [
        'Thinking cube roots can\'t be negative',
        'Cubing -2 incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'radical-equations', 'cube-root', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-radical-308',
    version: 2,
    type: 'algebra',
    difficulty: 10.5,
    gradeLevel: 10,
    question: {
      text: 'Solve: √(x + 7) - √(x) = 1',
      latex: '\\sqrt{x + 7} - \\sqrt{x} = 1'
    },
    answer: {
      type: 'numeric',
      correct: '9',
      acceptable: ['9', 'x = 9']
    },
    solution: {
      steps: [
        { number: 1, description: 'Isolate one radical', latex: '\\sqrt{x + 7} = 1 + \\sqrt{x}' },
        { number: 2, description: 'Square both sides', latex: 'x + 7 = 1 + 2\\sqrt{x} + x' },
        { number: 3, description: 'Simplify', latex: '6 = 2\\sqrt{x}' },
        { number: 4, description: 'Divide by 2', latex: '3 = \\sqrt{x}' },
        { number: 5, description: 'Square again', latex: 'x = 9' },
        { number: 6, description: 'Check: √16 - √9 = 4 - 3 = 1 ✓', latex: '\\sqrt{16} - \\sqrt{9} = 1 \\checkmark' }
      ],
      method: 'Isolate one radical, square twice if needed'
    },
    hints: [
      { level: 'gentle', text: 'Move one radical to the other side, then square.' },
      { level: 'moderate', text: 'After √(x+7) = 1 + √x and squaring, you\'ll still have a radical term.' },
      { level: 'explicit', text: 'Simplify to get 3 = √x, so x = 9.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Radical Equations',
      skills: ['solving_radical_equations', 'two_radicals'],
      prerequisites: ['square_roots', 'binomial_expansion'],
      concepts: ['radical-equations', 'squaring-twice'],
      commonMistakes: [
        'Squaring (1+√x) incorrectly',
        'Not isolating one radical first',
        'Forgetting to check'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 200
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'radical-equations', 'two-radicals', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-radical-309',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: √(3x + 1) = √(x + 9)',
      latex: '\\sqrt{3x + 1} = \\sqrt{x + 9}'
    },
    answer: {
      type: 'numeric',
      correct: '4',
      acceptable: ['4', 'x = 4']
    },
    solution: {
      steps: [
        { number: 1, description: 'Square both sides', latex: '3x + 1 = x + 9' },
        { number: 2, description: 'Subtract x from both sides', latex: '2x + 1 = 9' },
        { number: 3, description: 'Subtract 1 from both sides', latex: '2x = 8' },
        { number: 4, description: 'Divide by 2', latex: 'x = 4' },
        { number: 5, description: 'Check: √(12+1) = √13 and √(4+9) = √13 ✓', latex: '\\sqrt{13} = \\sqrt{13} \\checkmark' }
      ],
      method: 'Square both sides'
    },
    hints: [
      { level: 'gentle', text: 'If two square roots are equal, what happens when you square both sides?' },
      { level: 'moderate', text: 'Squaring gives 3x + 1 = x + 9. This is a linear equation!' },
      { level: 'explicit', text: '2x = 8, so x = 4.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Radical Equations',
      skills: ['solving_radical_equations', 'linear_equations'],
      prerequisites: ['square_roots', 'linear_equations'],
      concepts: ['radical-equations', 'equal-radicals'],
      commonMistakes: [
        'Thinking you need a different approach',
        'Arithmetic errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'radical-equations', 'grade-10']
    }
  },

  // ============================================================================
  // COMPLEX NUMBERS (Grade 10-11) - IDs 310-314
  // ============================================================================
  {
    id: 'alg-v2-g10-complex-310',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Simplify: i² + i³ + i⁴ + i⁵',
      latex: 'i^2 + i^3 + i^4 + i^5'
    },
    answer: {
      type: 'numeric',
      correct: '0',
      acceptable: ['0', '0 + 0i']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the powers of i', latex: 'i^1 = i, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1' },
        { number: 2, description: 'Evaluate each term', latex: 'i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1, \\quad i^5 = i' },
        { number: 3, description: 'Add the terms', latex: '-1 + (-i) + 1 + i = 0' }
      ],
      method: 'Powers of i cycle every 4'
    },
    hints: [
      { level: 'gentle', text: 'Remember that powers of i repeat in a cycle of 4.' },
      { level: 'moderate', text: 'i² = -1, i³ = -i, i⁴ = 1, i⁵ = i. Now add them up.' },
      { level: 'explicit', text: '-1 + (-i) + 1 + i = 0' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Complex Numbers',
      skills: ['powers_of_i', 'complex_arithmetic'],
      prerequisites: ['exponents', 'imaginary_unit'],
      concepts: ['complex-numbers', 'powers-of-i', 'cyclic-pattern'],
      commonMistakes: [
        'Not knowing the i cycle',
        'Forgetting i⁴ = 1 (not i)',
        'Arithmetic errors with signs'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'complex-numbers', 'powers-of-i', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-complex-311',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Simplify: (3 + 2i)(4 - 5i)',
      latex: '(3 + 2i)(4 - 5i)'
    },
    answer: {
      type: 'expression',
      correct: '22 - 7i',
      acceptable: ['22-7i', '22 - 7i']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use FOIL method', latex: '3(4) + 3(-5i) + 2i(4) + 2i(-5i)' },
        { number: 2, description: 'Multiply', latex: '12 - 15i + 8i - 10i^2' },
        { number: 3, description: 'Substitute i² = -1', latex: '12 - 15i + 8i - 10(-1)' },
        { number: 4, description: 'Simplify', latex: '12 - 15i + 8i + 10 = 22 - 7i' }
      ],
      method: 'FOIL and simplify'
    },
    hints: [
      { level: 'gentle', text: 'Multiply using FOIL, then remember that i² = -1.' },
      { level: 'moderate', text: 'FOIL gives 12 - 15i + 8i - 10i². Replace i² with -1.' },
      { level: 'explicit', text: '12 + 10 = 22 and -15i + 8i = -7i, so 22 - 7i.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Complex Numbers',
      skills: ['multiplying_complex_numbers', 'foil_method'],
      prerequisites: ['imaginary_unit', 'binomial_multiplication'],
      concepts: ['complex-numbers', 'multiplication', 'foil'],
      commonMistakes: [
        'Forgetting that i² = -1',
        'Sign errors with -10(-1)',
        'Combining real and imaginary incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'complex-numbers', 'multiplication', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g11-complex-312',
    version: 2,
    type: 'algebra',
    difficulty: 10.5,
    gradeLevel: 11,
    question: {
      text: 'Divide and write in standard form: (5 + 3i)/(2 - i)',
      latex: '\\frac{5 + 3i}{2 - i}'
    },
    answer: {
      type: 'expression',
      correct: '(7 + 11i)/5',
      acceptable: ['7/5 + 11i/5', '1.4 + 2.2i', '(7+11i)/5', '(7 + 11i)/5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply by the conjugate of the denominator', latex: '\\frac{5 + 3i}{2 - i} \\cdot \\frac{2 + i}{2 + i}' },
        { number: 2, description: 'Multiply numerators', latex: '(5+3i)(2+i) = 10 + 5i + 6i + 3i^2 = 10 + 11i - 3 = 7 + 11i' },
        { number: 3, description: 'Multiply denominators', latex: '(2-i)(2+i) = 4 - i^2 = 4 + 1 = 5' },
        { number: 4, description: 'Write in standard form', latex: '\\frac{7 + 11i}{5} = \\frac{7}{5} + \\frac{11}{5}i' }
      ],
      method: 'Multiply by conjugate'
    },
    hints: [
      { level: 'gentle', text: 'To divide complex numbers, multiply top and bottom by the conjugate of the denominator.' },
      { level: 'moderate', text: 'The conjugate of 2-i is 2+i. The denominator becomes (2-i)(2+i) = 5.' },
      { level: 'explicit', text: 'Numerator: 7+11i. Denominator: 5. Answer: (7+11i)/5.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Complex Numbers',
      skills: ['dividing_complex_numbers', 'complex_conjugate'],
      prerequisites: ['complex_multiplication', 'difference_of_squares'],
      concepts: ['complex-numbers', 'division', 'conjugate'],
      commonMistakes: [
        'Using wrong conjugate',
        'FOIL errors in numerator',
        'Not simplifying the denominator correctly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'complex-numbers', 'division', 'grade-11']
    }
  },
  {
    id: 'alg-v2-g10-complex-313',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Simplify: √(-49)',
      latex: '\\sqrt{-49}'
    },
    answer: {
      type: 'expression',
      correct: '7i',
      acceptable: ['7i', '7*i', '7·i']
    },
    solution: {
      steps: [
        { number: 1, description: 'Factor out -1', latex: '\\sqrt{-49} = \\sqrt{-1 \\cdot 49}' },
        { number: 2, description: 'Separate the square roots', latex: '\\sqrt{-1} \\cdot \\sqrt{49}' },
        { number: 3, description: 'Simplify each radical', latex: 'i \\cdot 7 = 7i' }
      ],
      method: 'Definition of i'
    },
    hints: [
      { level: 'gentle', text: 'What is √(-1) defined as?' },
      { level: 'moderate', text: '√(-49) = √(-1) · √49 = i · 7' },
      { level: 'explicit', text: '7i' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Complex Numbers',
      skills: ['simplifying_imaginary_numbers', 'square_roots'],
      prerequisites: ['square_roots', 'imaginary_unit_definition'],
      concepts: ['complex-numbers', 'imaginary-unit', 'square-roots'],
      commonMistakes: [
        'Forgetting to write i',
        'Writing -7 instead of 7i',
        'Thinking no answer exists'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'complex-numbers', 'imaginary', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g11-complex-314',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Find the modulus (absolute value) of 3 - 4i.',
      latex: '|3 - 4i|'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', '|3-4i| = 5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the modulus formula', latex: '|a + bi| = \\sqrt{a^2 + b^2}' },
        { number: 2, description: 'Identify a = 3, b = -4', latex: 'a = 3, \\quad b = -4' },
        { number: 3, description: 'Calculate', latex: '\\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5' }
      ],
      method: 'Modulus formula'
    },
    hints: [
      { level: 'gentle', text: 'The modulus of a + bi is the distance from the origin: √(a² + b²).' },
      { level: 'moderate', text: 'For 3 - 4i, calculate √(3² + (-4)²).' },
      { level: 'explicit', text: '√(9 + 16) = √25 = 5' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Complex Numbers',
      skills: ['modulus_of_complex', 'pythagorean_theorem'],
      prerequisites: ['complex_number_form', 'pythagorean_theorem'],
      concepts: ['complex-numbers', 'modulus', 'absolute-value'],
      commonMistakes: [
        'Subtracting instead of adding squares',
        'Forgetting to take the square root',
        'Using -4 directly without squaring'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'complex-numbers', 'modulus', 'grade-11']
    }
  },

  // ============================================================================
  // ABSOLUTE VALUE EQUATIONS (Grade 9-10) - IDs 315-319
  // ============================================================================
  {
    id: 'alg-v2-g9-absval-315',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve: |2x - 5| = 7',
      latex: '|2x - 5| = 7'
    },
    answer: {
      type: 'set',
      correct: 'x = 6 or x = -1',
      acceptable: ['6, -1', '-1, 6', 'x = -1 or x = 6', '{-1, 6}']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'abs(2*x - 5)', color: '#3B82F6', label: 'y = |2x - 5|' },
          { expression: '7', color: '#EF4444', label: 'y = 7' }
        ],
        domain: [-3, 8],
        range: [0, 10],
        showGrid: true,
        points: [
          { x: -1, y: 7, label: 'x = -1', color: '#10B981' },
          { x: 6, y: 7, label: 'x = 6', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up two equations', latex: '2x - 5 = 7 \\quad \\text{or} \\quad 2x - 5 = -7' },
        { number: 2, description: 'Solve the first equation', latex: '2x = 12 \\Rightarrow x = 6' },
        { number: 3, description: 'Solve the second equation', latex: '2x = -2 \\Rightarrow x = -1' }
      ],
      method: 'Two cases'
    },
    hints: [
      { level: 'gentle', text: 'If |expression| = k, then expression = k or expression = -k.' },
      { level: 'moderate', text: '2x - 5 = 7 or 2x - 5 = -7. Solve each linear equation.' },
      { level: 'explicit', text: 'x = 6 or x = -1' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Absolute Value Equations',
      skills: ['solving_absolute_value', 'linear_equations'],
      prerequisites: ['absolute_value_basics', 'linear_equations'],
      concepts: ['absolute-value', 'two-cases', 'distance'],
      commonMistakes: [
        'Only finding one solution',
        'Setting up equations incorrectly',
        'Sign errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'absolute-value', 'equations', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-absval-316',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Solve: |3x + 4| = -2',
      latex: '|3x + 4| = -2'
    },
    answer: {
      type: 'exact',
      correct: 'no solution',
      acceptable: ['no solution', 'none', '∅', 'empty set', 'impossible']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall that absolute value is always non-negative', latex: '|\\text{expression}| \\geq 0 \\text{ for all inputs}' },
        { number: 2, description: 'The right side is negative', latex: '-2 < 0' },
        { number: 3, description: 'Therefore, no solution exists', latex: '\\text{No solution}' }
      ],
      method: 'Definition of absolute value'
    },
    hints: [
      { level: 'gentle', text: 'Can an absolute value ever be negative?' },
      { level: 'moderate', text: 'Absolute value is always ≥ 0, but -2 < 0.' },
      { level: 'explicit', text: 'No solution exists.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Absolute Value Equations',
      skills: ['absolute_value_properties', 'critical_thinking'],
      prerequisites: ['absolute_value_basics'],
      concepts: ['absolute-value', 'non-negative', 'no-solution'],
      commonMistakes: [
        'Trying to solve anyway',
        'Getting x = -2 or x = -2'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'absolute-value', 'no-solution', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g10-absval-317',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: |x - 4| = |2x + 1|',
      latex: '|x - 4| = |2x + 1|'
    },
    answer: {
      type: 'set',
      correct: 'x = -5 or x = 1',
      acceptable: ['-5, 1', '1, -5', 'x = 1 or x = -5', '{-5, 1}']
    },
    solution: {
      steps: [
        { number: 1, description: 'Case 1: expressions are equal', latex: 'x - 4 = 2x + 1 \\Rightarrow -5 = x' },
        { number: 2, description: 'Case 2: expressions are opposites', latex: 'x - 4 = -(2x + 1)' },
        { number: 3, description: 'Solve Case 2', latex: 'x - 4 = -2x - 1 \\Rightarrow 3x = 3 \\Rightarrow x = 1' },
        { number: 4, description: 'Check both solutions', latex: 'x = -5: |-9| = |-9| \\checkmark \\quad x = 1: |-3| = |3| \\checkmark' }
      ],
      method: 'Two cases: equal or opposite'
    },
    hints: [
      { level: 'gentle', text: 'If |A| = |B|, then either A = B or A = -B.' },
      { level: 'moderate', text: 'Case 1: x - 4 = 2x + 1. Case 2: x - 4 = -(2x + 1).' },
      { level: 'explicit', text: 'x = -5 or x = 1' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Absolute Value Equations',
      skills: ['solving_absolute_value', 'case_analysis'],
      prerequisites: ['absolute_value_basics', 'linear_equations'],
      concepts: ['absolute-value', 'equal-or-opposite'],
      commonMistakes: [
        'Only considering one case',
        'Distributing the negative incorrectly',
        'Forgetting to check solutions'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'absolute-value', 'both-sides', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-absval-318',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: 3|x - 2| + 5 = 14',
      latex: '3|x - 2| + 5 = 14'
    },
    answer: {
      type: 'set',
      correct: 'x = 5 or x = -1',
      acceptable: ['5, -1', '-1, 5', 'x = -1 or x = 5', '{-1, 5}']
    },
    solution: {
      steps: [
        { number: 1, description: 'Isolate the absolute value', latex: '3|x - 2| = 9' },
        { number: 2, description: 'Divide by 3', latex: '|x - 2| = 3' },
        { number: 3, description: 'Set up two equations', latex: 'x - 2 = 3 \\quad \\text{or} \\quad x - 2 = -3' },
        { number: 4, description: 'Solve each', latex: 'x = 5 \\quad \\text{or} \\quad x = -1' }
      ],
      method: 'Isolate first, then two cases'
    },
    hints: [
      { level: 'gentle', text: 'First isolate the absolute value expression on one side.' },
      { level: 'moderate', text: '3|x-2| = 9, so |x-2| = 3. Now solve |x-2| = 3.' },
      { level: 'explicit', text: 'x - 2 = 3 gives x = 5; x - 2 = -3 gives x = -1.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Absolute Value Equations',
      skills: ['solving_absolute_value', 'isolating_terms'],
      prerequisites: ['absolute_value_basics', 'linear_equations'],
      concepts: ['absolute-value', 'isolation', 'two-cases'],
      commonMistakes: [
        'Dividing before isolating',
        'Forgetting to isolate first',
        'Arithmetic errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'absolute-value', 'isolation', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-absval-319',
    version: 2,
    type: 'algebra',
    difficulty: 10.5,
    gradeLevel: 10,
    question: {
      text: 'Solve: |x + 3| = 2x - 1',
      latex: '|x + 3| = 2x - 1'
    },
    answer: {
      type: 'numeric',
      correct: '4',
      acceptable: ['4', 'x = 4']
    },
    solution: {
      steps: [
        { number: 1, description: 'Case 1: x + 3 ≥ 0 (i.e., x ≥ -3)', latex: 'x + 3 = 2x - 1 \\Rightarrow x = 4' },
        { number: 2, description: 'Check x = 4 ≥ -3 ✓', latex: '|4+3| = 7, \\quad 2(4)-1 = 7 \\checkmark' },
        { number: 3, description: 'Case 2: x + 3 < 0 (i.e., x < -3)', latex: '-(x+3) = 2x - 1 \\Rightarrow -x - 3 = 2x - 1' },
        { number: 4, description: 'Solve Case 2', latex: '-2 = 3x \\Rightarrow x = -\\frac{2}{3}' },
        { number: 5, description: 'Check: -2/3 is NOT < -3, so this is extraneous', latex: 'x = -\\frac{2}{3} \\text{ rejected}' }
      ],
      method: 'Case analysis with domain checking'
    },
    hints: [
      { level: 'gentle', text: 'Consider two cases based on whether x + 3 is positive or negative.' },
      { level: 'moderate', text: 'Also note: the right side 2x - 1 must be ≥ 0 for a solution to exist.' },
      { level: 'explicit', text: 'Only x = 4 satisfies all conditions.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Absolute Value Equations',
      skills: ['solving_absolute_value', 'case_analysis', 'checking_domains'],
      prerequisites: ['absolute_value_basics', 'linear_equations', 'inequalities'],
      concepts: ['absolute-value', 'extraneous-solutions', 'domain-restrictions'],
      commonMistakes: [
        'Not checking that 2x-1 ≥ 0',
        'Accepting extraneous solutions',
        'Ignoring domain restrictions'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 200
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'absolute-value', 'extraneous', 'grade-10']
    }
  },

  // ============================================================================
  // LOGARITHMIC EQUATIONS (Grade 10-11) - IDs 320-324
  // ============================================================================
  {
    id: 'alg-v2-g10-log-320',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: log₂(x) = 5',
      latex: '\\log_2(x) = 5'
    },
    answer: {
      type: 'numeric',
      correct: '32',
      acceptable: ['32', 'x = 32']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert to exponential form', latex: '\\log_2(x) = 5 \\Leftrightarrow 2^5 = x' },
        { number: 2, description: 'Evaluate', latex: 'x = 2^5 = 32' }
      ],
      method: 'Convert to exponential form'
    },
    hints: [
      { level: 'gentle', text: 'Recall: logₐ(x) = y means aʸ = x.' },
      { level: 'moderate', text: 'So log₂(x) = 5 means 2⁵ = x.' },
      { level: 'explicit', text: '2⁵ = 32' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Logarithmic Equations',
      skills: ['logarithm_definition', 'exponential_form'],
      prerequisites: ['exponents', 'logarithm_basics'],
      concepts: ['logarithms', 'exponential-form', 'inverse-relationship'],
      commonMistakes: [
        'Confusing log base and argument',
        'Computing 2 × 5 instead of 2⁵'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'logarithms', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-log-321',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve: log₃(2x + 1) = 2',
      latex: '\\log_3(2x + 1) = 2'
    },
    answer: {
      type: 'numeric',
      correct: '4',
      acceptable: ['4', 'x = 4']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert to exponential form', latex: '3^2 = 2x + 1' },
        { number: 2, description: 'Simplify', latex: '9 = 2x + 1' },
        { number: 3, description: 'Subtract 1', latex: '8 = 2x' },
        { number: 4, description: 'Divide by 2', latex: 'x = 4' },
        { number: 5, description: 'Check: 2(4) + 1 = 9 > 0 ✓', latex: '\\log_3(9) = 2 \\checkmark' }
      ],
      method: 'Convert to exponential, then solve linear'
    },
    hints: [
      { level: 'gentle', text: 'Convert log₃(2x+1) = 2 to exponential form: 3² = 2x + 1.' },
      { level: 'moderate', text: '9 = 2x + 1. Solve for x.' },
      { level: 'explicit', text: '2x = 8, so x = 4.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Logarithmic Equations',
      skills: ['logarithm_definition', 'linear_equations'],
      prerequisites: ['logarithm_basics', 'linear_equations'],
      concepts: ['logarithms', 'exponential-form'],
      commonMistakes: [
        'Not converting to exponential form correctly',
        'Arithmetic errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'logarithms', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g11-log-322',
    version: 2,
    type: 'algebra',
    difficulty: 10.5,
    gradeLevel: 11,
    question: {
      text: 'Solve: log(x) + log(x - 3) = 1 (base 10)',
      latex: '\\log(x) + \\log(x - 3) = 1'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', 'x = 5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the product rule', latex: '\\log(x(x-3)) = 1' },
        { number: 2, description: 'Convert to exponential form', latex: 'x(x-3) = 10^1 = 10' },
        { number: 3, description: 'Expand and rearrange', latex: 'x^2 - 3x - 10 = 0' },
        { number: 4, description: 'Factor', latex: '(x-5)(x+2) = 0' },
        { number: 5, description: 'Solve', latex: 'x = 5 \\text{ or } x = -2' },
        { number: 6, description: 'Check domain: x > 0 and x > 3', latex: 'x = 5 \\checkmark, \\quad x = -2 \\text{ rejected}' }
      ],
      method: 'Product rule, then quadratic'
    },
    hints: [
      { level: 'gentle', text: 'Use the log property: log(A) + log(B) = log(AB).' },
      { level: 'moderate', text: 'log(x(x-3)) = 1 means x(x-3) = 10. Solve the quadratic.' },
      { level: 'explicit', text: 'x = 5 or x = -2. Only x = 5 is valid (both arguments must be positive).' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Logarithmic Equations',
      skills: ['logarithm_properties', 'quadratic_equations'],
      prerequisites: ['logarithm_product_rule', 'quadratic_equations'],
      concepts: ['logarithms', 'product-rule', 'domain-restrictions'],
      commonMistakes: [
        'Forgetting the product rule',
        'Not checking domain restrictions',
        'Accepting negative solution'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'logarithms', 'product-rule', 'grade-11']
    }
  },
  {
    id: 'alg-v2-g11-log-323',
    version: 2,
    type: 'algebra',
    difficulty: 10.5,
    gradeLevel: 11,
    question: {
      text: 'Solve: log₄(x + 6) - log₄(x - 2) = 1',
      latex: '\\log_4(x + 6) - \\log_4(x - 2) = 1'
    },
    answer: {
      type: 'expression',
      correct: '10/3',
      acceptable: ['10/3', '3.33', '3.333', 'x = 10/3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the quotient rule', latex: '\\log_4\\left(\\frac{x+6}{x-2}\\right) = 1' },
        { number: 2, description: 'Convert to exponential form', latex: '\\frac{x+6}{x-2} = 4^1 = 4' },
        { number: 3, description: 'Cross multiply', latex: 'x + 6 = 4(x - 2)' },
        { number: 4, description: 'Distribute and solve', latex: 'x + 6 = 4x - 8 \\Rightarrow 14 = 3x' },
        { number: 5, description: 'Solve for x', latex: 'x = \\frac{14}{3}' }
      ],
      method: 'Quotient rule, then linear'
    },
    hints: [
      { level: 'gentle', text: 'Use log(A) - log(B) = log(A/B).' },
      { level: 'moderate', text: 'log₄((x+6)/(x-2)) = 1 means (x+6)/(x-2) = 4.' },
      { level: 'explicit', text: 'Cross multiply: x + 6 = 4x - 8, so x = 14/3.' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Logarithmic Equations',
      skills: ['logarithm_properties', 'linear_equations'],
      prerequisites: ['logarithm_quotient_rule', 'solving_proportions'],
      concepts: ['logarithms', 'quotient-rule'],
      commonMistakes: [
        'Wrong direction for quotient rule',
        'Cross multiplication errors',
        'Not checking x > 2'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'logarithms', 'quotient-rule', 'grade-11']
    }
  },
  {
    id: 'alg-v2-g11-log-324',
    version: 2,
    type: 'algebra',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Solve: 2log₅(x) = log₅(9)',
      latex: '2\\log_5(x) = \\log_5(9)'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', 'x = 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the power rule on the left', latex: '\\log_5(x^2) = \\log_5(9)' },
        { number: 2, description: 'If logs are equal (same base), arguments are equal', latex: 'x^2 = 9' },
        { number: 3, description: 'Solve', latex: 'x = \\pm 3' },
        { number: 4, description: 'Check domain: x > 0', latex: 'x = 3 \\checkmark, \\quad x = -3 \\text{ rejected}' }
      ],
      method: 'Power rule, then equate arguments'
    },
    hints: [
      { level: 'gentle', text: 'Use the power rule: n·log(x) = log(xⁿ).' },
      { level: 'moderate', text: 'log₅(x²) = log₅(9). If logs are equal, their arguments are equal.' },
      { level: 'explicit', text: 'x² = 9, so x = 3 (only positive value works).' }
    ],
    pedagogy: {
      topic: 'Algebra',
      subTopic: 'Logarithmic Equations',
      skills: ['logarithm_properties', 'quadratic_equations'],
      prerequisites: ['logarithm_power_rule'],
      concepts: ['logarithms', 'power-rule', 'one-to-one-property'],
      commonMistakes: [
        'Accepting both ±3',
        'Not recognizing the power rule',
        'Forgetting domain restriction'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['algebra', 'logarithms', 'power-rule', 'grade-11']
    }
  }
]

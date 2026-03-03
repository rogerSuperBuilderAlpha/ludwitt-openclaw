/**
 * Integers and Expressions - MathProblemV2 Format
 * 
 * Topics covered:
 * - Integer Operations (G6)
 * - Order of Operations (G6-7)
 * - Evaluating Expressions (G6-7)
 * - Combining Like Terms (G6-7)
 * - Distributive Property (G7)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const INTEGERS_EXPRESSIONS_V2: MathProblemV2[] = [
  // ============================================================================
  // INTEGER OPERATIONS (Grade 6) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-integers-125',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Calculate: -8 + 15',
      latex: '-8 + 15 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '7',
      acceptable: ['7', '+7']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify signs: one negative, one positive', latex: '-8 + 15' },
        { number: 2, description: 'Subtract the smaller absolute value from larger', latex: '15 - 8 = 7' },
        { number: 3, description: 'Use the sign of the larger absolute value', latex: '\\text{Result is positive: } 7' }
      ],
      method: 'Adding integers with different signs'
    },
    hints: [
      { level: 'gentle', text: 'When adding a negative and positive number, find the difference and use the sign of the larger absolute value.' },
      { level: 'moderate', text: '|15| = 15 and |-8| = 8. Since 15 > 8, subtract: 15 - 8 = 7. Answer is positive.' },
      { level: 'explicit', text: '-8 + 15 = 7' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Integer Operations',
      skills: ['integer_addition', 'absolute_value'],
      prerequisites: ['addition', 'understanding_negatives'],
      concepts: ['integers', 'addition', 'signed-numbers'],
      commonMistakes: [
        'Adding instead of finding the difference',
        'Using the wrong sign in the answer',
        'Confusing subtraction with addition of negative'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'integers', 'addition', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-integers-126',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Calculate: -12 - 7',
      latex: '-12 - 7 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '-19',
      acceptable: ['-19']
    },
    solution: {
      steps: [
        { number: 1, description: 'Rewrite as addition', latex: '-12 + (-7)' },
        { number: 2, description: 'Add absolute values (both negative)', latex: '12 + 7 = 19' },
        { number: 3, description: 'Apply the common sign', latex: '-19' }
      ],
      method: 'Subtracting integers'
    },
    hints: [
      { level: 'gentle', text: 'Subtracting 7 is the same as adding -7.' },
      { level: 'moderate', text: '-12 + (-7): Both are negative, so add 12 + 7 and keep negative sign.' },
      { level: 'explicit', text: '-12 - 7 = -19' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Integer Operations',
      skills: ['integer_subtraction', 'adding_negatives'],
      prerequisites: ['subtraction', 'understanding_negatives'],
      concepts: ['integers', 'subtraction', 'signed-numbers'],
      commonMistakes: [
        'Getting positive 19',
        'Subtracting instead of adding absolute values',
        'Losing the negative sign'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'integers', 'subtraction', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-integers-127',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Calculate: (-6) × 4',
      latex: '(-6) \\times 4 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '-24',
      acceptable: ['-24']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply the absolute values', latex: '6 \\times 4 = 24' },
        { number: 2, description: 'Determine the sign: negative × positive = negative', latex: '(-) \\times (+) = (-)' },
        { number: 3, description: 'Apply the sign', latex: '-24' }
      ],
      method: 'Multiplying integers'
    },
    hints: [
      { level: 'gentle', text: 'When multiplying a negative by a positive, the result is negative.' },
      { level: 'moderate', text: 'Multiply 6 × 4 = 24, then make it negative.' },
      { level: 'explicit', text: '(-6) × 4 = -24' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Integer Operations',
      skills: ['integer_multiplication', 'sign_rules'],
      prerequisites: ['multiplication', 'understanding_negatives'],
      concepts: ['integers', 'multiplication', 'sign-rules'],
      commonMistakes: [
        'Getting positive 24',
        'Forgetting sign rules',
        'Multiplication errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'integers', 'multiplication', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-integers-128',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Calculate: (-48) ÷ (-6)',
      latex: '(-48) \\div (-6) = ?'
    },
    answer: {
      type: 'numeric',
      correct: '8',
      acceptable: ['8', '+8']
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide the absolute values', latex: '48 \\div 6 = 8' },
        { number: 2, description: 'Determine the sign: negative ÷ negative = positive', latex: '(-) \\div (-) = (+)' },
        { number: 3, description: 'Apply the sign', latex: '+8 = 8' }
      ],
      method: 'Dividing integers'
    },
    hints: [
      { level: 'gentle', text: 'When dividing two negatives, the result is positive.' },
      { level: 'moderate', text: 'Divide 48 ÷ 6 = 8. Two negatives make a positive.' },
      { level: 'explicit', text: '(-48) ÷ (-6) = 8' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Integer Operations',
      skills: ['integer_division', 'sign_rules'],
      prerequisites: ['division', 'understanding_negatives'],
      concepts: ['integers', 'division', 'sign-rules'],
      commonMistakes: [
        'Getting -8 instead of 8',
        'Confusing sign rules',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'integers', 'division', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-integers-129',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Calculate: (-3) × (-5) × (-2)',
      latex: '(-3) \\times (-5) \\times (-2) = ?'
    },
    answer: {
      type: 'numeric',
      correct: '-30',
      acceptable: ['-30']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply first two numbers', latex: '(-3) \\times (-5) = 15' },
        { number: 2, description: 'Multiply result by third number', latex: '15 \\times (-2) = -30' }
      ],
      alternativeMethods: ['Count negatives: 3 negatives = negative. 3 × 5 × 2 = 30. Answer: -30'],
      method: 'Sequential multiplication'
    },
    hints: [
      { level: 'gentle', text: 'An odd number of negative factors gives a negative product.' },
      { level: 'moderate', text: '(-3) × (-5) = 15. Then 15 × (-2) = ?' },
      { level: 'explicit', text: '15 × (-2) = -30' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Integer Operations',
      skills: ['integer_multiplication', 'sign_rules', 'multi_step'],
      prerequisites: ['multiplication', 'sign_rules'],
      concepts: ['integers', 'multiplication', 'odd-even-negatives'],
      commonMistakes: [
        'Getting +30',
        'Losing track of signs',
        'Multiplication errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'integers', 'multiplication', 'grade-6']
    }
  },

  // ============================================================================
  // ORDER OF OPERATIONS (Grade 6-7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-order-130',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Evaluate: 3 + 4 × 5',
      latex: '3 + 4 \\times 5 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '23',
      acceptable: ['23']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply first (PEMDAS)', latex: '4 \\times 5 = 20' },
        { number: 2, description: 'Then add', latex: '3 + 20 = 23' }
      ],
      method: 'PEMDAS - Multiplication before Addition'
    },
    hints: [
      { level: 'gentle', text: 'Remember PEMDAS: Multiplication comes before Addition.' },
      { level: 'moderate', text: 'First calculate 4 × 5 = 20, then add 3.' },
      { level: 'explicit', text: '3 + 20 = 23' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Order of Operations',
      skills: ['order_of_operations', 'PEMDAS'],
      prerequisites: ['addition', 'multiplication'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: [
        'Adding first to get 35',
        'Forgetting order of operations',
        'Left-to-right calculation'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'order-of-operations', 'PEMDAS', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-order-131',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Evaluate: 24 ÷ 4 + 3²',
      latex: '24 \\div 4 + 3^2 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '15',
      acceptable: ['15']
    },
    solution: {
      steps: [
        { number: 1, description: 'Evaluate exponent first', latex: '3^2 = 9' },
        { number: 2, description: 'Then divide', latex: '24 \\div 4 = 6' },
        { number: 3, description: 'Finally add', latex: '6 + 9 = 15' }
      ],
      method: 'PEMDAS - Exponents, then Division, then Addition'
    },
    hints: [
      { level: 'gentle', text: 'Handle exponents first, then division, then addition.' },
      { level: 'moderate', text: '3² = 9 and 24 ÷ 4 = 6. Now add them.' },
      { level: 'explicit', text: '6 + 9 = 15' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Order of Operations',
      skills: ['order_of_operations', 'exponents', 'PEMDAS'],
      prerequisites: ['exponents', 'division', 'addition'],
      concepts: ['order-of-operations', 'PEMDAS', 'exponents'],
      commonMistakes: [
        'Adding before handling exponent',
        'Wrong order of division and exponent',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'order-of-operations', 'exponents', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-order-132',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Evaluate: (8 - 3) × 2 + 12 ÷ 4',
      latex: '(8 - 3) \\times 2 + 12 \\div 4 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '13',
      acceptable: ['13']
    },
    solution: {
      steps: [
        { number: 1, description: 'Parentheses first', latex: '8 - 3 = 5' },
        { number: 2, description: 'Multiplication', latex: '5 \\times 2 = 10' },
        { number: 3, description: 'Division', latex: '12 \\div 4 = 3' },
        { number: 4, description: 'Addition', latex: '10 + 3 = 13' }
      ],
      method: 'PEMDAS'
    },
    hints: [
      { level: 'gentle', text: 'Start with parentheses, then handle multiplication and division left to right.' },
      { level: 'moderate', text: '(8-3) = 5. Then 5 × 2 = 10 and 12 ÷ 4 = 3.' },
      { level: 'explicit', text: '10 + 3 = 13' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Order of Operations',
      skills: ['order_of_operations', 'parentheses', 'PEMDAS'],
      prerequisites: ['all_basic_operations'],
      concepts: ['order-of-operations', 'PEMDAS', 'parentheses'],
      commonMistakes: [
        'Ignoring parentheses',
        'Wrong order of operations',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'order-of-operations', 'PEMDAS', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-order-133',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Evaluate: 2 × 3² - 8 ÷ 2',
      latex: '2 \\times 3^2 - 8 \\div 2 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '14',
      acceptable: ['14']
    },
    solution: {
      steps: [
        { number: 1, description: 'Evaluate exponent', latex: '3^2 = 9' },
        { number: 2, description: 'Multiply', latex: '2 \\times 9 = 18' },
        { number: 3, description: 'Divide', latex: '8 \\div 2 = 4' },
        { number: 4, description: 'Subtract', latex: '18 - 4 = 14' }
      ],
      method: 'PEMDAS'
    },
    hints: [
      { level: 'gentle', text: 'Handle exponent first, then multiplication and division, then subtraction.' },
      { level: 'moderate', text: '3² = 9. Then 2 × 9 = 18 and 8 ÷ 2 = 4.' },
      { level: 'explicit', text: '18 - 4 = 14' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Order of Operations',
      skills: ['order_of_operations', 'exponents', 'PEMDAS'],
      prerequisites: ['exponents', 'multiplication', 'division', 'subtraction'],
      concepts: ['order-of-operations', 'PEMDAS', 'exponents'],
      commonMistakes: [
        'Multiplying 2 × 3 before squaring',
        'Wrong operation order',
        'Sign errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'order-of-operations', 'exponents', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-order-134',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Evaluate: 5 + 3(6 - 2)',
      latex: '5 + 3(6 - 2) = ?'
    },
    answer: {
      type: 'numeric',
      correct: '17',
      acceptable: ['17']
    },
    solution: {
      steps: [
        { number: 1, description: 'Parentheses first', latex: '6 - 2 = 4' },
        { number: 2, description: 'Multiply', latex: '3 \\times 4 = 12' },
        { number: 3, description: 'Add', latex: '5 + 12 = 17' }
      ],
      method: 'PEMDAS - Parentheses, Multiplication, Addition'
    },
    hints: [
      { level: 'gentle', text: 'First simplify inside the parentheses, then multiply, then add.' },
      { level: 'moderate', text: '6 - 2 = 4. Then 3 × 4 = 12.' },
      { level: 'explicit', text: '5 + 12 = 17' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Order of Operations',
      skills: ['order_of_operations', 'parentheses', 'PEMDAS'],
      prerequisites: ['multiplication', 'addition', 'subtraction'],
      concepts: ['order-of-operations', 'PEMDAS', 'implied-multiplication'],
      commonMistakes: [
        'Adding 5 + 3 first',
        'Forgetting implied multiplication',
        'Ignoring parentheses'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'order-of-operations', 'PEMDAS', 'grade-7']
    }
  },

  // ============================================================================
  // EVALUATING EXPRESSIONS (Grade 6-7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-eval-135',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Evaluate 3x + 5 when x = 4',
      latex: '3x + 5 \\text{ when } x = 4'
    },
    answer: {
      type: 'numeric',
      correct: '17',
      acceptable: ['17']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = 4', latex: '3(4) + 5' },
        { number: 2, description: 'Multiply', latex: '12 + 5' },
        { number: 3, description: 'Add', latex: '17' }
      ],
      method: 'Substitution'
    },
    hints: [
      { level: 'gentle', text: 'Replace x with 4, then calculate.' },
      { level: 'moderate', text: '3 × 4 = 12. Then add 5.' },
      { level: 'explicit', text: '12 + 5 = 17' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Evaluating Expressions',
      skills: ['substitution', 'evaluating_expressions'],
      prerequisites: ['multiplication', 'addition'],
      concepts: ['variables', 'substitution', 'algebraic-expressions'],
      commonMistakes: [
        'Adding before multiplying',
        'Forgetting to multiply coefficient by variable',
        'Substitution errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'expressions', 'substitution', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-eval-136',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Evaluate 2a² - 3b when a = 3 and b = 4',
      latex: '2a^2 - 3b \\text{ when } a = 3, b = 4'
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute values', latex: '2(3)^2 - 3(4)' },
        { number: 2, description: 'Evaluate exponent', latex: '2(9) - 3(4)' },
        { number: 3, description: 'Multiply', latex: '18 - 12' },
        { number: 4, description: 'Subtract', latex: '6' }
      ],
      method: 'Substitution with PEMDAS'
    },
    hints: [
      { level: 'gentle', text: 'Replace a with 3 and b with 4. Remember to square first.' },
      { level: 'moderate', text: '3² = 9. So we have 2(9) - 3(4) = 18 - 12.' },
      { level: 'explicit', text: '18 - 12 = 6' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Evaluating Expressions',
      skills: ['substitution', 'exponents', 'evaluating_expressions'],
      prerequisites: ['exponents', 'multiplication', 'subtraction'],
      concepts: ['variables', 'substitution', 'two-variable-expressions'],
      commonMistakes: [
        'Squaring the product 2a instead of just a',
        'Forgetting to subtract',
        'Order of operations errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'expressions', 'substitution', 'two-variables', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-eval-137',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Evaluate (x + y)² when x = 2 and y = 3',
      latex: '(x + y)^2 \\text{ when } x = 2, y = 3'
    },
    answer: {
      type: 'numeric',
      correct: '25',
      acceptable: ['25']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute values', latex: '(2 + 3)^2' },
        { number: 2, description: 'Add inside parentheses', latex: '(5)^2' },
        { number: 3, description: 'Square', latex: '25' }
      ],
      method: 'Substitution with parentheses'
    },
    hints: [
      { level: 'gentle', text: 'First add x and y, then square the result.' },
      { level: 'moderate', text: '2 + 3 = 5. Now square 5.' },
      { level: 'explicit', text: '5² = 25' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Evaluating Expressions',
      skills: ['substitution', 'exponents', 'evaluating_expressions'],
      prerequisites: ['addition', 'exponents'],
      concepts: ['variables', 'substitution', 'squared-binomials'],
      commonMistakes: [
        'Squaring x and y separately: 4 + 9 = 13',
        'Forgetting order of operations',
        'Not adding inside parentheses first'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'expressions', 'substitution', 'exponents', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g6-eval-138',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Evaluate 5n - 2n + 8 when n = 6',
      latex: '5n - 2n + 8 \\text{ when } n = 6'
    },
    answer: {
      type: 'numeric',
      correct: '26',
      acceptable: ['26']
    },
    solution: {
      steps: [
        { number: 1, description: 'Combine like terms first', latex: '5n - 2n + 8 = 3n + 8' },
        { number: 2, description: 'Substitute n = 6', latex: '3(6) + 8' },
        { number: 3, description: 'Calculate', latex: '18 + 8 = 26' }
      ],
      alternativeMethods: ['Substitute directly: 5(6) - 2(6) + 8 = 30 - 12 + 8 = 26'],
      method: 'Simplify then substitute'
    },
    hints: [
      { level: 'gentle', text: 'You can combine 5n - 2n first to simplify, or substitute directly.' },
      { level: 'moderate', text: '5n - 2n = 3n. So the expression becomes 3n + 8. Now substitute n = 6.' },
      { level: 'explicit', text: '3(6) + 8 = 18 + 8 = 26' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Evaluating Expressions',
      skills: ['substitution', 'combining_like_terms', 'evaluating_expressions'],
      prerequisites: ['like_terms', 'multiplication', 'addition'],
      concepts: ['variables', 'substitution', 'like-terms'],
      commonMistakes: [
        'Not combining like terms correctly',
        'Calculation errors',
        'Sign errors when subtracting'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'expressions', 'substitution', 'like-terms', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-eval-139',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Evaluate 4(x - 2) + 3x when x = 5',
      latex: '4(x - 2) + 3x \\text{ when } x = 5'
    },
    answer: {
      type: 'numeric',
      correct: '27',
      acceptable: ['27']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = 5', latex: '4(5 - 2) + 3(5)' },
        { number: 2, description: 'Simplify parentheses', latex: '4(3) + 15' },
        { number: 3, description: 'Multiply', latex: '12 + 15' },
        { number: 4, description: 'Add', latex: '27' }
      ],
      method: 'Substitution with parentheses'
    },
    hints: [
      { level: 'gentle', text: 'Substitute 5 for x everywhere, then follow order of operations.' },
      { level: 'moderate', text: '5 - 2 = 3. So we have 4(3) + 3(5) = 12 + 15.' },
      { level: 'explicit', text: '12 + 15 = 27' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Evaluating Expressions',
      skills: ['substitution', 'parentheses', 'evaluating_expressions'],
      prerequisites: ['distributive_property', 'multiplication', 'addition'],
      concepts: ['variables', 'substitution', 'distributive-property'],
      commonMistakes: [
        'Forgetting to substitute x in both places',
        'Order of operations errors',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'expressions', 'substitution', 'distributive', 'grade-7']
    }
  },

  // ============================================================================
  // COMBINING LIKE TERMS (Grade 6-7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-combine-140',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Simplify: 4x + 7x',
      latex: '4x + 7x = ?'
    },
    answer: {
      type: 'expression',
      correct: '11x',
      acceptable: ['11x', '11*x']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify like terms', latex: '4x \\text{ and } 7x \\text{ are like terms}' },
        { number: 2, description: 'Add coefficients', latex: '4 + 7 = 11' },
        { number: 3, description: 'Keep the variable', latex: '11x' }
      ],
      method: 'Combining like terms'
    },
    hints: [
      { level: 'gentle', text: 'Like terms have the same variable. Add their coefficients.' },
      { level: 'moderate', text: '4 + 7 = 11. Keep the x.' },
      { level: 'explicit', text: '4x + 7x = 11x' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Combining Like Terms',
      skills: ['combining_like_terms', 'simplifying_expressions'],
      prerequisites: ['addition', 'understanding_variables'],
      concepts: ['like-terms', 'coefficients', 'simplification'],
      commonMistakes: [
        'Adding variable with coefficient (getting 11x²)',
        'Forgetting the variable',
        'Not recognizing like terms'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 30
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'like-terms', 'simplifying', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-combine-141',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Simplify: 8y - 3y + 2',
      latex: '8y - 3y + 2 = ?'
    },
    answer: {
      type: 'expression',
      correct: '5y + 2',
      acceptable: ['5y + 2', '5y+2', '2 + 5y']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify like terms', latex: '8y \\text{ and } -3y \\text{ are like terms}' },
        { number: 2, description: 'Combine like terms', latex: '8y - 3y = 5y' },
        { number: 3, description: 'Write final expression', latex: '5y + 2' }
      ],
      method: 'Combining like terms'
    },
    hints: [
      { level: 'gentle', text: 'Combine the y terms. The constant stays separate.' },
      { level: 'moderate', text: '8y - 3y = 5y. The 2 stays as is.' },
      { level: 'explicit', text: '5y + 2' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Combining Like Terms',
      skills: ['combining_like_terms', 'simplifying_expressions'],
      prerequisites: ['subtraction', 'understanding_variables'],
      concepts: ['like-terms', 'constants', 'simplification'],
      commonMistakes: [
        'Trying to combine y and constant',
        'Subtraction errors',
        'Losing the constant'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'like-terms', 'simplifying', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-combine-142',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Simplify: 3x + 5y - 2x + 4y',
      latex: '3x + 5y - 2x + 4y = ?'
    },
    answer: {
      type: 'expression',
      correct: 'x + 9y',
      acceptable: ['x + 9y', '1x + 9y', 'x+9y', '9y + x']
    },
    solution: {
      steps: [
        { number: 1, description: 'Group like terms', latex: '(3x - 2x) + (5y + 4y)' },
        { number: 2, description: 'Combine x terms', latex: '3x - 2x = x' },
        { number: 3, description: 'Combine y terms', latex: '5y + 4y = 9y' },
        { number: 4, description: 'Write final expression', latex: 'x + 9y' }
      ],
      method: 'Combining like terms'
    },
    hints: [
      { level: 'gentle', text: 'Combine the x terms together and the y terms together.' },
      { level: 'moderate', text: '3x - 2x = x and 5y + 4y = 9y.' },
      { level: 'explicit', text: 'x + 9y' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Combining Like Terms',
      skills: ['combining_like_terms', 'two_variables'],
      prerequisites: ['addition', 'subtraction', 'like_terms'],
      concepts: ['like-terms', 'two-variables', 'simplification'],
      commonMistakes: [
        'Combining x and y terms together',
        'Sign errors',
        'Missing terms'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'like-terms', 'two-variables', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-combine-143',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Simplify: 6a² + 2a - 4a² + 5a',
      latex: '6a^2 + 2a - 4a^2 + 5a = ?'
    },
    answer: {
      type: 'expression',
      correct: '2a² + 7a',
      acceptable: ['2a² + 7a', '2a^2 + 7a', '2a2 + 7a', '7a + 2a²', '7a + 2a^2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Group like terms', latex: '(6a^2 - 4a^2) + (2a + 5a)' },
        { number: 2, description: 'Combine a² terms', latex: '6a^2 - 4a^2 = 2a^2' },
        { number: 3, description: 'Combine a terms', latex: '2a + 5a = 7a' },
        { number: 4, description: 'Write final expression', latex: '2a^2 + 7a' }
      ],
      method: 'Combining like terms'
    },
    hints: [
      { level: 'gentle', text: 'a² and a are different. Combine a² terms together and a terms together.' },
      { level: 'moderate', text: '6a² - 4a² = 2a² and 2a + 5a = 7a.' },
      { level: 'explicit', text: '2a² + 7a' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Combining Like Terms',
      skills: ['combining_like_terms', 'exponents'],
      prerequisites: ['exponents', 'like_terms'],
      concepts: ['like-terms', 'exponents', 'simplification'],
      commonMistakes: [
        'Combining a² and a terms',
        'Sign errors when subtracting',
        'Exponent errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'like-terms', 'exponents', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g6-combine-144',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Simplify: 9m - 4 + 3m + 7',
      latex: '9m - 4 + 3m + 7 = ?'
    },
    answer: {
      type: 'expression',
      correct: '12m + 3',
      acceptable: ['12m + 3', '12m+3', '3 + 12m']
    },
    solution: {
      steps: [
        { number: 1, description: 'Group like terms', latex: '(9m + 3m) + (-4 + 7)' },
        { number: 2, description: 'Combine m terms', latex: '9m + 3m = 12m' },
        { number: 3, description: 'Combine constants', latex: '-4 + 7 = 3' },
        { number: 4, description: 'Write final expression', latex: '12m + 3' }
      ],
      method: 'Combining like terms'
    },
    hints: [
      { level: 'gentle', text: 'Combine the m terms and the numbers separately.' },
      { level: 'moderate', text: '9m + 3m = 12m and -4 + 7 = 3.' },
      { level: 'explicit', text: '12m + 3' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Combining Like Terms',
      skills: ['combining_like_terms', 'integer_operations'],
      prerequisites: ['addition', 'integers'],
      concepts: ['like-terms', 'constants', 'simplification'],
      commonMistakes: [
        'Adding all numbers together',
        'Sign errors with -4 + 7',
        'Not grouping correctly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'like-terms', 'simplifying', 'grade-6']
    }
  },

  // ============================================================================
  // DISTRIBUTIVE PROPERTY (Grade 7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g7-distrib-145',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Expand: 3(x + 4)',
      latex: '3(x + 4) = ?'
    },
    answer: {
      type: 'expression',
      correct: '3x + 12',
      acceptable: ['3x + 12', '3x+12', '12 + 3x']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply distributive property', latex: '3 \\cdot x + 3 \\cdot 4' },
        { number: 2, description: 'Multiply', latex: '3x + 12' }
      ],
      method: 'Distributive property: a(b + c) = ab + ac'
    },
    hints: [
      { level: 'gentle', text: 'Multiply 3 by each term inside the parentheses.' },
      { level: 'moderate', text: '3 × x = 3x and 3 × 4 = 12.' },
      { level: 'explicit', text: '3x + 12' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Distributive Property',
      skills: ['distributive_property', 'expanding_expressions'],
      prerequisites: ['multiplication'],
      concepts: ['distributive-property', 'expanding'],
      commonMistakes: [
        'Only multiplying one term',
        'Forgetting the variable',
        'Adding instead of multiplying'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'distributive-property', 'expanding', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-distrib-146',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Expand: -2(5y - 3)',
      latex: '-2(5y - 3) = ?'
    },
    answer: {
      type: 'expression',
      correct: '-10y + 6',
      acceptable: ['-10y + 6', '-10y+6', '6 - 10y']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply distributive property', latex: '(-2) \\cdot 5y + (-2) \\cdot (-3)' },
        { number: 2, description: 'Multiply first term', latex: '-2 \\cdot 5y = -10y' },
        { number: 3, description: 'Multiply second term', latex: '-2 \\cdot (-3) = 6' },
        { number: 4, description: 'Combine', latex: '-10y + 6' }
      ],
      method: 'Distributive property with negatives'
    },
    hints: [
      { level: 'gentle', text: 'Multiply -2 by each term inside. Be careful with signs!' },
      { level: 'moderate', text: '-2 × 5y = -10y and -2 × (-3) = +6.' },
      { level: 'explicit', text: '-10y + 6' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Distributive Property',
      skills: ['distributive_property', 'integer_multiplication'],
      prerequisites: ['integer_multiplication', 'sign_rules'],
      concepts: ['distributive-property', 'negative-distribution'],
      commonMistakes: [
        'Getting signs wrong',
        'Forgetting to distribute the negative',
        '-2 × (-3) = -6 instead of +6'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'distributive-property', 'negatives', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-distrib-147',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Expand and simplify: 4(2x + 1) + 3x',
      latex: '4(2x + 1) + 3x = ?'
    },
    answer: {
      type: 'expression',
      correct: '11x + 4',
      acceptable: ['11x + 4', '11x+4', '4 + 11x']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply distributive property', latex: '4 \\cdot 2x + 4 \\cdot 1 + 3x' },
        { number: 2, description: 'Multiply', latex: '8x + 4 + 3x' },
        { number: 3, description: 'Combine like terms', latex: '8x + 3x + 4 = 11x + 4' }
      ],
      method: 'Distributive property then combine like terms'
    },
    hints: [
      { level: 'gentle', text: 'First distribute the 4, then combine like terms.' },
      { level: 'moderate', text: '4(2x + 1) = 8x + 4. Then add 3x.' },
      { level: 'explicit', text: '8x + 4 + 3x = 11x + 4' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Distributive Property',
      skills: ['distributive_property', 'combining_like_terms'],
      prerequisites: ['distribution', 'like_terms'],
      concepts: ['distributive-property', 'simplification'],
      commonMistakes: [
        'Not combining like terms at the end',
        'Distributing to the +3x as well',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'distributive-property', 'like-terms', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-distrib-148',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Expand: 5(a + b - 2)',
      latex: '5(a + b - 2) = ?'
    },
    answer: {
      type: 'expression',
      correct: '5a + 5b - 10',
      acceptable: ['5a + 5b - 10', '5a+5b-10', '-10 + 5a + 5b']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply distributive property', latex: '5 \\cdot a + 5 \\cdot b + 5 \\cdot (-2)' },
        { number: 2, description: 'Multiply each term', latex: '5a + 5b - 10' }
      ],
      method: 'Distributive property with three terms'
    },
    hints: [
      { level: 'gentle', text: 'Multiply 5 by each of the three terms inside.' },
      { level: 'moderate', text: '5 × a = 5a, 5 × b = 5b, 5 × (-2) = -10.' },
      { level: 'explicit', text: '5a + 5b - 10' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Distributive Property',
      skills: ['distributive_property', 'expanding_expressions'],
      prerequisites: ['multiplication', 'understanding_variables'],
      concepts: ['distributive-property', 'trinomials'],
      commonMistakes: [
        'Forgetting to multiply all terms',
        'Sign error on the -10',
        'Only multiplying the first term'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'distributive-property', 'three-terms', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-distrib-149',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Expand and simplify: 2(3x - 4) - 5(x - 1)',
      latex: '2(3x - 4) - 5(x - 1) = ?'
    },
    answer: {
      type: 'expression',
      correct: 'x - 3',
      acceptable: ['x - 3', 'x-3', '-3 + x', '1x - 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Distribute the 2', latex: '2(3x - 4) = 6x - 8' },
        { number: 2, description: 'Distribute the -5', latex: '-5(x - 1) = -5x + 5' },
        { number: 3, description: 'Combine', latex: '6x - 8 - 5x + 5' },
        { number: 4, description: 'Combine like terms', latex: '(6x - 5x) + (-8 + 5) = x - 3' }
      ],
      method: 'Double distribution then combine'
    },
    hints: [
      { level: 'gentle', text: 'Distribute both factors, being careful with the -5. Then combine like terms.' },
      { level: 'moderate', text: '2(3x-4) = 6x-8 and -5(x-1) = -5x+5. Now combine.' },
      { level: 'explicit', text: '6x - 8 - 5x + 5 = x - 3' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Distributive Property',
      skills: ['distributive_property', 'combining_like_terms', 'integer_operations'],
      prerequisites: ['distribution', 'like_terms', 'integers'],
      concepts: ['distributive-property', 'double-distribution', 'simplification'],
      commonMistakes: [
        '-5(x-1) = -5x - 5 instead of -5x + 5',
        'Sign errors when combining',
        'Not distributing to all terms'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'distributive-property', 'simplifying', 'grade-7']
    }
  }
]

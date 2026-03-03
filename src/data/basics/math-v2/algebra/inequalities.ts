/**
 * Inequalities - MathProblemV2 Format
 * 
 * Topics covered:
 * - One-step inequalities (G7)
 * - Two-step inequalities (G8)
 * - Inequalities with negative coefficients (G8)
 * - Compound inequalities (G9)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const INEQUALITIES_V2: MathProblemV2[] = [
  // ============================================================================
  // ONE-STEP INEQUALITIES (Grade 7)
  // ============================================================================
  {
    id: 'alg-v2-g7-ineq-001',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve the inequality: 3x − 4 < 11',
      latex: '3x - 4 < 11'
    },
    answer: {
      type: 'expression',
      correct: 'x < 5',
      acceptable: ['x<5', 'x < 5.0']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing x < 5 with open circle at 5 and shading to the left',
        elements: [
          { type: 'line', props: { x1: -10, y1: 50, x2: 200, y2: 50 }, label: 'number line' },
          { type: 'circle', props: { cx: 150, cy: 50, r: 5, fill: 'none', stroke: '#3B82F6' }, label: 'open circle at 5' },
          { type: 'arrow', props: { x1: 145, y1: 50, x2: 10, y2: 50 }, label: 'shading left' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 4 to both sides', latex: '3x - 4 + 4 < 11 + 4' },
        { number: 2, description: 'Simplify', latex: '3x < 15' },
        { number: 3, description: 'Divide both sides by 3', latex: 'x < 5' }
      ],
      method: 'Inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'Solve like a regular equation, keeping the inequality sign.' },
      { level: 'moderate', text: 'Add 4 to both sides: 3x < 15' },
      { level: 'explicit', text: 'Divide by 3: x < 5' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Two-step inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['linear-equations'],
      concepts: ['inequality-symbols', 'solution-sets', 'number-line'],
      commonMistakes: ['Flipping sign when not needed', 'Treating as equation'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'two-step']
    }
  },
  {
    id: 'alg-v2-g7-ineq-002',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve: x + 6 > 10',
      latex: 'x + 6 > 10'
    },
    answer: {
      type: 'expression',
      correct: 'x > 4',
      acceptable: ['x>4', 'x > 4']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing x > 4 with open circle at 4 and shading to the right',
        elements: [
          { type: 'circle', props: { cx: 100, cy: 50, r: 5, fill: 'none', stroke: '#3B82F6' }, label: 'open at 4' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Subtract 6 from both sides', latex: 'x + 6 - 6 > 10 - 6' },
        { number: 2, description: 'Simplify', latex: 'x > 4' }
      ],
      method: 'Inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'What operation undoes adding 6?' },
      { level: 'moderate', text: 'Subtract 6 from both sides.' },
      { level: 'explicit', text: 'x > 10 - 6 = 4' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'One-step inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations'],
      concepts: ['inequality-symbols', 'solution-sets'],
      commonMistakes: ['Flipping sign incorrectly', 'Wrong direction'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'one-step']
    }
  },
  {
    id: 'alg-v2-g7-ineq-003',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve: 2x ≤ 14',
      latex: '2x \\leq 14'
    },
    answer: {
      type: 'expression',
      correct: 'x ≤ 7',
      acceptable: ['x<=7', 'x ≤ 7', 'x <= 7']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing x ≤ 7 with closed circle at 7 and shading to the left',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 50, r: 5, fill: '#3B82F6' }, label: 'closed at 7' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide both sides by 2', latex: '\\frac{2x}{2} \\leq \\frac{14}{2}' },
        { number: 2, description: 'Simplify', latex: 'x \\leq 7' }
      ],
      method: 'Division'
    },
    hints: [
      { level: 'gentle', text: 'Divide both sides by 2.' },
      { level: 'moderate', text: 'Since 2 is positive, the sign stays the same.' },
      { level: 'explicit', text: 'x ≤ 7' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'One-step inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations'],
      concepts: ['inequality-symbols', 'boundary-inclusion'],
      commonMistakes: ['Using wrong symbol (< vs ≤)'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'one-step']
    }
  },

  // ============================================================================
  // TWO-STEP INEQUALITIES (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-ineq-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve the inequality: 2x + 5 > 13',
      latex: '2x + 5 > 13'
    },
    answer: {
      type: 'expression',
      correct: 'x > 4',
      acceptable: ['x>4', 'x > 4.0']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing x > 4 with open circle at 4',
        elements: [
          { type: 'circle', props: { cx: 100, cy: 50, r: 5, fill: 'none', stroke: '#10B981' }, label: 'open at 4' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Subtract 5 from both sides', latex: '2x + 5 - 5 > 13 - 5' },
        { number: 2, description: 'Simplify', latex: '2x > 8' },
        { number: 3, description: 'Divide both sides by 2', latex: 'x > 4' }
      ],
      method: 'Two-step inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'Treat it like an equation: subtract 5 first.' },
      { level: 'moderate', text: '2x > 8, now divide by 2' },
      { level: 'explicit', text: 'x > 4' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Linear inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-equations'],
      concepts: ['inequality-symbols', 'solution-sets'],
      commonMistakes: ['Flipping sign when dividing by positive'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'two-step']
    }
  },
  {
    id: 'alg-v2-g8-ineq-002',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve: 3x - 5 ≥ 10',
      latex: '3x - 5 \\geq 10'
    },
    answer: {
      type: 'expression',
      correct: 'x ≥ 5',
      acceptable: ['x>=5', 'x ≥ 5', 'x >= 5']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing x ≥ 5 with closed circle at 5',
        elements: [
          { type: 'circle', props: { cx: 125, cy: 50, r: 5, fill: '#10B981' }, label: 'closed at 5' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 5 to both sides', latex: '3x - 5 + 5 \\geq 10 + 5' },
        { number: 2, description: 'Simplify', latex: '3x \\geq 15' },
        { number: 3, description: 'Divide by 3', latex: 'x \\geq 5' }
      ],
      method: 'Two-step inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'Add 5 to both sides first.' },
      { level: 'moderate', text: '3x ≥ 15' },
      { level: 'explicit', text: 'x ≥ 5' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Two-step inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-equations'],
      concepts: ['inequality-symbols', 'boundary-inclusion'],
      commonMistakes: ['Using wrong symbol', 'Arithmetic error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'two-step']
    }
  },

  // ============================================================================
  // NEGATIVE COEFFICIENTS - FLIP THE SIGN (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-ineq-003',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve: -2x < 8',
      latex: '-2x < 8'
    },
    answer: {
      type: 'expression',
      correct: 'x > -4',
      acceptable: ['x>-4', 'x > -4']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing x > -4 with open circle at -4',
        elements: [
          { type: 'circle', props: { cx: 60, cy: 50, r: 5, fill: 'none', stroke: '#EF4444' }, label: 'open at -4' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide both sides by -2', latex: '\\frac{-2x}{-2} \\quad ? \\quad \\frac{8}{-2}' },
        { number: 2, description: 'FLIP the inequality sign when dividing by negative', latex: 'x > -4' }
      ],
      method: 'Division by negative (flip sign)'
    },
    hints: [
      { level: 'gentle', text: 'When you divide or multiply by a negative, what happens to the inequality sign?' },
      { level: 'moderate', text: 'The sign flips! < becomes >' },
      { level: 'explicit', text: '-2x < 8 → x > -4' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Dividing by negatives',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-inequalities'],
      concepts: ['flip-inequality', 'negative-division'],
      commonMistakes: ['Forgetting to flip the sign'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'negative', 'flip-sign']
    }
  },
  {
    id: 'alg-v2-g8-ineq-004',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve: 4 - x > 7',
      latex: '4 - x > 7'
    },
    answer: {
      type: 'expression',
      correct: 'x < -3',
      acceptable: ['x<-3', 'x < -3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Subtract 4 from both sides', latex: '-x > 3' },
        { number: 2, description: 'Multiply by -1 and flip the sign', latex: 'x < -3' }
      ],
      method: 'Multiply by negative and flip'
    },
    hints: [
      { level: 'gentle', text: 'Subtract 4 first, then deal with the negative x.' },
      { level: 'moderate', text: '-x > 3, now multiply by -1 and flip.' },
      { level: 'explicit', text: 'x < -3' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Negative coefficients',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-inequalities', 'negative-numbers'],
      concepts: ['flip-inequality', 'negative-coefficient'],
      commonMistakes: ['Not flipping sign', 'Sign error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'negative', 'flip-sign']
    }
  },

  // ============================================================================
  // COMPOUND INEQUALITIES (Grade 9)
  // ============================================================================
  {
    id: 'alg-v2-g9-compound-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve: -3 < x + 2 < 7',
      latex: '-3 < x + 2 < 7'
    },
    answer: {
      type: 'interval',
      correct: '-5 < x < 5',
      acceptable: ['-5 < x < 5', 'x is between -5 and 5', '(-5, 5)']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing -5 < x < 5 with open circles at both -5 and 5',
        elements: [
          { type: 'circle', props: { cx: 50, cy: 50, r: 5, fill: 'none', stroke: '#3B82F6' }, label: 'open at -5' },
          { type: 'circle', props: { cx: 150, cy: 50, r: 5, fill: 'none', stroke: '#3B82F6' }, label: 'open at 5' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Subtract 2 from all three parts', latex: '-3 - 2 < x + 2 - 2 < 7 - 2' },
        { number: 2, description: 'Simplify', latex: '-5 < x < 5' }
      ],
      method: 'Apply to all parts'
    },
    hints: [
      { level: 'gentle', text: 'Apply the same operation to all three parts of the inequality.' },
      { level: 'moderate', text: 'Subtract 2 from all parts: -3-2, x+2-2, 7-2' },
      { level: 'explicit', text: '-5 < x < 5' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Compound inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-inequalities'],
      concepts: ['compound-inequality', 'and-inequality'],
      commonMistakes: ['Not applying to all parts', 'Sign errors'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'compound', 'and']
    }
  },
  {
    id: 'alg-v2-g9-compound-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve: 2x - 1 ≤ 5 or x + 3 > 10',
      latex: '2x - 1 \\leq 5 \\quad \\text{or} \\quad x + 3 > 10'
    },
    answer: {
      type: 'expression',
      correct: 'x ≤ 3 or x > 7',
      acceptable: ['x ≤ 3 or x > 7', 'x<=3 or x>7']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing x ≤ 3 OR x > 7 with shading on both ends',
        elements: [
          { type: 'circle', props: { cx: 75, cy: 50, r: 5, fill: '#3B82F6' }, label: 'closed at 3' },
          { type: 'circle', props: { cx: 175, cy: 50, r: 5, fill: 'none', stroke: '#3B82F6' }, label: 'open at 7' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Solve first inequality: 2x - 1 ≤ 5', latex: '2x \\leq 6 \\Rightarrow x \\leq 3' },
        { number: 2, description: 'Solve second inequality: x + 3 > 10', latex: 'x > 7' },
        { number: 3, description: 'Combine with "or"', latex: 'x \\leq 3 \\quad \\text{or} \\quad x > 7' }
      ],
      method: 'Solve each separately'
    },
    hints: [
      { level: 'gentle', text: 'Solve each inequality separately, then combine.' },
      { level: 'moderate', text: '2x - 1 ≤ 5 gives x ≤ 3. x + 3 > 10 gives x > 7.' },
      { level: 'explicit', text: 'x ≤ 3 or x > 7' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Compound inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-inequalities'],
      concepts: ['compound-inequality', 'or-inequality'],
      commonMistakes: ['Confusing and/or', 'Individual solving error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'compound', 'or']
    }
  },
  {
    id: 'alg-v2-g9-compound-003',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve: 1 ≤ 2x - 3 ≤ 9',
      latex: '1 \\leq 2x - 3 \\leq 9'
    },
    answer: {
      type: 'interval',
      correct: '2 ≤ x ≤ 6',
      acceptable: ['2 ≤ x ≤ 6', '2<=x<=6', '[2, 6]']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line showing 2 ≤ x ≤ 6 with closed circles at 2 and 6',
        elements: [
          { type: 'circle', props: { cx: 60, cy: 50, r: 5, fill: '#10B981' }, label: 'closed at 2' },
          { type: 'circle', props: { cx: 140, cy: 50, r: 5, fill: '#10B981' }, label: 'closed at 6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 3 to all parts', latex: '1 + 3 \\leq 2x - 3 + 3 \\leq 9 + 3' },
        { number: 2, description: 'Simplify', latex: '4 \\leq 2x \\leq 12' },
        { number: 3, description: 'Divide all parts by 2', latex: '2 \\leq x \\leq 6' }
      ],
      method: 'Apply to all parts'
    },
    hints: [
      { level: 'gentle', text: 'Add 3 to all three parts of the inequality.' },
      { level: 'moderate', text: '4 ≤ 2x ≤ 12, now divide by 2' },
      { level: 'explicit', text: '2 ≤ x ≤ 6' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Compound inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-inequalities'],
      concepts: ['compound-inequality', 'and-inequality'],
      commonMistakes: ['Not applying to all parts', 'Division error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'compound', 'and']
    }
  },

  // ============================================================================
  // ADDITIONAL INEQUALITIES
  // ============================================================================
  {
    id: 'alg-v2-g8-ineq-005',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve: 5x + 2 ≤ 17',
      latex: '5x + 2 \\leq 17'
    },
    answer: {
      type: 'expression',
      correct: 'x ≤ 3',
      acceptable: ['x<=3', 'x ≤ 3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Subtract 2 from both sides', latex: '5x \\leq 15' },
        { number: 2, description: 'Divide by 5', latex: 'x \\leq 3' }
      ],
      method: 'Two-step solution'
    },
    hints: [
      { level: 'gentle', text: 'Subtract 2, then divide by 5.' },
      { level: 'moderate', text: '5x ≤ 15' },
      { level: 'explicit', text: 'x ≤ 3' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Two-step inequalities',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-equations'],
      concepts: ['inequality-symbols', 'solution-sets'],
      commonMistakes: ['Arithmetic error', 'Wrong symbol'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'two-step']
    }
  },
  {
    id: 'alg-v2-g8-ineq-006',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Solve: -4x + 3 ≥ 15',
      latex: '-4x + 3 \\geq 15'
    },
    answer: {
      type: 'expression',
      correct: 'x ≤ -3',
      acceptable: ['x<=-3', 'x ≤ -3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Subtract 3 from both sides', latex: '-4x \\geq 12' },
        { number: 2, description: 'Divide by -4 and flip the sign', latex: 'x \\leq -3' }
      ],
      method: 'Division by negative (flip sign)'
    },
    hints: [
      { level: 'gentle', text: 'First subtract 3, then divide by -4 (and flip!)' },
      { level: 'moderate', text: '-4x ≥ 12, divide by -4 and flip' },
      { level: 'explicit', text: 'x ≤ -3' }
    ],
    pedagogy: {
      topic: 'Inequalities',
      subTopic: 'Negative coefficients',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-inequalities'],
      concepts: ['flip-inequality', 'negative-division'],
      commonMistakes: ['Forgetting to flip', 'Sign error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['inequality', 'negative', 'flip-sign']
    }
  }
]

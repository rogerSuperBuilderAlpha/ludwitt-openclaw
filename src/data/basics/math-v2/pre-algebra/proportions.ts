/**
 * Proportions - MathProblemV2 Format
 * 
 * Topics covered:
 * - Setting Up Proportions (G6-7)
 * - Cross Multiplication (G7)
 * - Scale Drawings (G7)
 * - Similar Figures (G7-8)
 * - Percent Proportions (G7-8)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const PROPORTIONS_V2: MathProblemV2[] = [
  // ============================================================================
  // SETTING UP PROPORTIONS (Grade 6-7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-proportions-026',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'If 4 pencils cost $2, how much would 10 pencils cost? Set up and solve a proportion.',
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', '$5', '$5.00', '5 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{4 \\text{ pencils}}{\\$2} = \\frac{10 \\text{ pencils}}{x}' },
        { number: 2, description: 'Cross multiply', latex: '4x = 2 \\times 10' },
        { number: 3, description: 'Simplify', latex: '4x = 20' },
        { number: 4, description: 'Divide by 4', latex: 'x = 5' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Set up a proportion: pencils/cost = pencils/cost. Keep the same relationship on both sides.' },
      { level: 'moderate', text: '4/$2 = 10/x. Now cross multiply.' },
      { level: 'explicit', text: '4x = 20, so x = $5.' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Setting Up Proportions',
      skills: ['proportions', 'cross_multiplication'],
      prerequisites: ['ratios', 'multiplication', 'division'],
      concepts: ['proportion', 'cross-multiplication'],
      commonMistakes: [
        'Setting up proportion with mismatched units',
        'Cross multiplication errors',
        'Forgetting to divide'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'money', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-proportions-027',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A recipe serves 6 people and uses 9 cups of rice. How many cups of rice are needed to serve 10 people?',
    },
    answer: {
      type: 'numeric',
      correct: '15',
      acceptable: ['15', '15 cups', '15 cups of rice'],
      unit: 'cups'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{6 \\text{ people}}{9 \\text{ cups}} = \\frac{10 \\text{ people}}{x \\text{ cups}}' },
        { number: 2, description: 'Cross multiply', latex: '6x = 9 \\times 10' },
        { number: 3, description: 'Simplify', latex: '6x = 90' },
        { number: 4, description: 'Divide by 6', latex: 'x = 15' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Set up: people/cups = people/cups' },
      { level: 'moderate', text: '6/9 = 10/x. Cross multiply: 6x = 90' },
      { level: 'explicit', text: 'x = 90 ÷ 6 = 15 cups' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Setting Up Proportions',
      skills: ['proportions', 'cross_multiplication'],
      prerequisites: ['ratios', 'multiplication', 'division'],
      concepts: ['proportion', 'scaling-recipes'],
      commonMistakes: [
        'Mixing up which values go where',
        'Cross multiplication errors',
        'Division errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'recipe', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-028',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 7,
    question: {
      text: 'A car travels 240 miles on 8 gallons of gas. How many gallons are needed to travel 420 miles?',
    },
    answer: {
      type: 'numeric',
      correct: '14',
      acceptable: ['14', '14 gallons', '14 gal'],
      unit: 'gallons'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{240 \\text{ miles}}{8 \\text{ gallons}} = \\frac{420 \\text{ miles}}{x \\text{ gallons}}' },
        { number: 2, description: 'Cross multiply', latex: '240x = 8 \\times 420' },
        { number: 3, description: 'Simplify', latex: '240x = 3360' },
        { number: 4, description: 'Divide by 240', latex: 'x = 14' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Set up: miles/gallons = miles/gallons' },
      { level: 'moderate', text: '240/8 = 420/x. Cross multiply: 240x = 3360' },
      { level: 'explicit', text: 'x = 3360 ÷ 240 = 14 gallons' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Setting Up Proportions',
      skills: ['proportions', 'cross_multiplication'],
      prerequisites: ['ratios', 'multiplication', 'division'],
      concepts: ['proportion', 'unit-rate', 'fuel-economy'],
      commonMistakes: [
        'Setting up proportion incorrectly',
        'Large number multiplication errors',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'travel', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g6-proportions-029',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'If 3 tickets cost $12, how much do 7 tickets cost?',
    },
    answer: {
      type: 'numeric',
      correct: '28',
      acceptable: ['28', '$28', '$28.00', '28 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{3}{12} = \\frac{7}{x}' },
        { number: 2, description: 'Cross multiply', latex: '3x = 12 \\times 7' },
        { number: 3, description: 'Simplify', latex: '3x = 84' },
        { number: 4, description: 'Divide by 3', latex: 'x = 28' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Set up: tickets/cost = tickets/cost' },
      { level: 'moderate', text: '3/12 = 7/x. Cross multiply: 3x = 84' },
      { level: 'explicit', text: 'x = 84 ÷ 3 = $28' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Setting Up Proportions',
      skills: ['proportions', 'cross_multiplication'],
      prerequisites: ['ratios', 'multiplication', 'division'],
      concepts: ['proportion', 'unit-price'],
      commonMistakes: [
        'Setting up proportion backwards',
        'Multiplication errors',
        'Division errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'money', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-030',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A printer can print 45 pages in 5 minutes. How long will it take to print 126 pages?',
    },
    answer: {
      type: 'numeric',
      correct: '14',
      acceptable: ['14', '14 minutes', '14 min'],
      unit: 'minutes'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{45 \\text{ pages}}{5 \\text{ min}} = \\frac{126 \\text{ pages}}{x \\text{ min}}' },
        { number: 2, description: 'Cross multiply', latex: '45x = 5 \\times 126' },
        { number: 3, description: 'Simplify', latex: '45x = 630' },
        { number: 4, description: 'Divide by 45', latex: 'x = 14' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Set up: pages/minutes = pages/minutes' },
      { level: 'moderate', text: '45/5 = 126/x. Cross multiply: 45x = 630' },
      { level: 'explicit', text: 'x = 630 ÷ 45 = 14 minutes' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Setting Up Proportions',
      skills: ['proportions', 'cross_multiplication'],
      prerequisites: ['ratios', 'multiplication', 'division'],
      concepts: ['proportion', 'rate'],
      commonMistakes: [
        'Setting up proportion incorrectly',
        'Large number division errors',
        'Confusing pages and time'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'rate', 'grade-7']
    }
  },

  // ============================================================================
  // CROSS MULTIPLICATION (Grade 7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g7-proportions-031',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: 3/5 = x/15',
      latex: '\\frac{3}{5} = \\frac{x}{15}'
    },
    answer: {
      type: 'numeric',
      correct: '9',
      acceptable: ['9', 'x = 9', 'x=9']
    },
    solution: {
      steps: [
        { number: 1, description: 'Cross multiply', latex: '3 \\times 15 = 5 \\times x' },
        { number: 2, description: 'Simplify', latex: '45 = 5x' },
        { number: 3, description: 'Divide both sides by 5', latex: 'x = 9' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Cross multiply: multiply the diagonal pairs.' },
      { level: 'moderate', text: '3 × 15 = 5 × x gives you 45 = 5x' },
      { level: 'explicit', text: '45 ÷ 5 = 9, so x = 9' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Cross Multiplication',
      skills: ['cross_multiplication', 'solving_equations'],
      prerequisites: ['multiplication', 'division', 'solving_equations'],
      concepts: ['cross-multiplication', 'proportion'],
      commonMistakes: [
        'Cross multiplying in wrong direction',
        'Forgetting to divide',
        'Multiplication errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'cross-multiply', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-032',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve for n: 8/n = 12/15',
      latex: '\\frac{8}{n} = \\frac{12}{15}'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', 'n = 10', 'n=10']
    },
    solution: {
      steps: [
        { number: 1, description: 'Cross multiply', latex: '8 \\times 15 = n \\times 12' },
        { number: 2, description: 'Simplify', latex: '120 = 12n' },
        { number: 3, description: 'Divide both sides by 12', latex: 'n = 10' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Cross multiply: 8 × 15 = n × 12' },
      { level: 'moderate', text: '120 = 12n' },
      { level: 'explicit', text: 'n = 120 ÷ 12 = 10' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Cross Multiplication',
      skills: ['cross_multiplication', 'solving_equations'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['cross-multiplication', 'proportion'],
      commonMistakes: [
        'Variable position confusion',
        'Division errors',
        'Cross multiplication errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'cross-multiply', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-033',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'If 3 apples cost $2.25, how much would 8 apples cost?',
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6', '$6', '$6.00', '6.00', '6 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{3 \\text{ apples}}{\\$2.25} = \\frac{8 \\text{ apples}}{x}' },
        { number: 2, description: 'Cross multiply', latex: '3x = 8 \\times 2.25' },
        { number: 3, description: 'Multiply', latex: '3x = 18' },
        { number: 4, description: 'Divide by 3', latex: 'x = 6' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Set up a proportion comparing apples to cost. Keep the same relationship on both sides.' },
      { level: 'moderate', text: 'Write 3/2.25 = 8/x, then cross multiply to solve for x.' },
      { level: 'explicit', text: '3x = 8 × 2.25 = 18. Divide: x = 18 ÷ 3 = 6. So 8 apples cost $6.' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Cross Multiplication',
      skills: ['proportions', 'cross_multiplication', 'unit_rates'],
      prerequisites: ['ratios', 'multiplication', 'division'],
      concepts: ['proportion', 'cross-multiplication', 'unit-price'],
      commonMistakes: [
        'Setting up the proportion incorrectly (mismatching units)',
        'Errors in cross multiplication',
        'Forgetting to divide at the end'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'cross-multiplication', 'money', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-034',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'Solve for y: (y + 2)/6 = 5/3',
      latex: '\\frac{y + 2}{6} = \\frac{5}{3}'
    },
    answer: {
      type: 'numeric',
      correct: '8',
      acceptable: ['8', 'y = 8', 'y=8']
    },
    solution: {
      steps: [
        { number: 1, description: 'Cross multiply', latex: '3(y + 2) = 6 \\times 5' },
        { number: 2, description: 'Simplify right side', latex: '3(y + 2) = 30' },
        { number: 3, description: 'Divide both sides by 3', latex: 'y + 2 = 10' },
        { number: 4, description: 'Subtract 2', latex: 'y = 8' }
      ],
      method: 'Cross multiplication with expression'
    },
    hints: [
      { level: 'gentle', text: 'Cross multiply: 3(y + 2) = 6 × 5' },
      { level: 'moderate', text: '3(y + 2) = 30, so y + 2 = 10' },
      { level: 'explicit', text: 'y + 2 = 10, so y = 8' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Cross Multiplication',
      skills: ['cross_multiplication', 'solving_equations'],
      prerequisites: ['cross_multiplication', 'two_step_equations'],
      concepts: ['cross-multiplication', 'algebraic-expressions'],
      commonMistakes: [
        'Forgetting to distribute',
        'Not solving for y completely',
        'Cross multiplication errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'cross-multiply', 'algebra', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-035',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: 2.4/x = 6/5',
      latex: '\\frac{2.4}{x} = \\frac{6}{5}'
    },
    answer: {
      type: 'numeric',
      correct: '2',
      acceptable: ['2', 'x = 2', 'x=2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Cross multiply', latex: '2.4 \\times 5 = 6 \\times x' },
        { number: 2, description: 'Simplify', latex: '12 = 6x' },
        { number: 3, description: 'Divide both sides by 6', latex: 'x = 2' }
      ],
      method: 'Cross multiplication with decimals'
    },
    hints: [
      { level: 'gentle', text: 'Cross multiply: 2.4 × 5 = 6 × x' },
      { level: 'moderate', text: '12 = 6x' },
      { level: 'explicit', text: 'x = 12 ÷ 6 = 2' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Cross Multiplication',
      skills: ['cross_multiplication', 'decimals'],
      prerequisites: ['multiplication', 'division', 'decimals'],
      concepts: ['cross-multiplication', 'decimal-operations'],
      commonMistakes: [
        'Decimal multiplication errors',
        'Division errors',
        'Decimal point placement'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'cross-multiply', 'decimals', 'grade-7']
    }
  },

  // ============================================================================
  // SCALE DRAWINGS (Grade 7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g7-proportions-036',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A map has a scale of 1 inch = 50 miles. If two cities are 3.5 inches apart on the map, what is the actual distance between them?',
    },
    answer: {
      type: 'numeric',
      correct: '175',
      acceptable: ['175', '175 miles', '175 mi'],
      unit: 'miles'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{1 \\text{ in}}{50 \\text{ mi}} = \\frac{3.5 \\text{ in}}{x \\text{ mi}}' },
        { number: 2, description: 'Cross multiply', latex: '1 \\times x = 50 \\times 3.5' },
        { number: 3, description: 'Calculate', latex: 'x = 175' }
      ],
      method: 'Scale proportion'
    },
    hints: [
      { level: 'gentle', text: 'Use the scale: 1 inch = 50 miles. Multiply the map distance by the scale.' },
      { level: 'moderate', text: '3.5 inches × 50 miles per inch = ?' },
      { level: 'explicit', text: '3.5 × 50 = 175 miles' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Scale Drawings',
      skills: ['scale_drawings', 'proportions'],
      prerequisites: ['proportions', 'multiplication'],
      concepts: ['scale', 'map-scale', 'proportion'],
      commonMistakes: [
        'Dividing instead of multiplying',
        'Decimal multiplication errors',
        'Forgetting units'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'scale', 'maps', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-037',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A model car is built at a scale of 1:24. If the model is 7.5 inches long, how long is the actual car in inches?',
    },
    answer: {
      type: 'numeric',
      correct: '180',
      acceptable: ['180', '180 inches', '180 in'],
      unit: 'inches'
    },
    solution: {
      steps: [
        { number: 1, description: 'Understand the scale', latex: '1:24 \\text{ means model is } \\frac{1}{24} \\text{ of actual}' },
        { number: 2, description: 'Set up proportion', latex: '\\frac{1}{24} = \\frac{7.5}{x}' },
        { number: 3, description: 'Cross multiply', latex: 'x = 7.5 \\times 24' },
        { number: 4, description: 'Calculate', latex: 'x = 180' }
      ],
      method: 'Scale proportion'
    },
    hints: [
      { level: 'gentle', text: '1:24 means the actual car is 24 times longer than the model.' },
      { level: 'moderate', text: 'Multiply the model length by 24.' },
      { level: 'explicit', text: '7.5 × 24 = 180 inches' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Scale Drawings',
      skills: ['scale_drawings', 'proportions'],
      prerequisites: ['proportions', 'multiplication'],
      concepts: ['scale-factor', 'model-scale'],
      commonMistakes: [
        'Dividing instead of multiplying',
        'Misunderstanding scale notation',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'scale', 'models', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-038',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'An architect\'s blueprint has a scale of 1/4 inch = 1 foot. If a room is 16 feet long, how many inches long is it on the blueprint?',
    },
    answer: {
      type: 'numeric',
      correct: '4',
      acceptable: ['4', '4 inches', '4 in'],
      unit: 'inches'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{0.25 \\text{ in}}{1 \\text{ ft}} = \\frac{x \\text{ in}}{16 \\text{ ft}}' },
        { number: 2, description: 'Cross multiply', latex: 'x = 0.25 \\times 16' },
        { number: 3, description: 'Calculate', latex: 'x = 4' }
      ],
      method: 'Scale proportion'
    },
    hints: [
      { level: 'gentle', text: 'Each foot in real life is 1/4 inch on the blueprint. Multiply.' },
      { level: 'moderate', text: '16 feet × 0.25 inches per foot = ?' },
      { level: 'explicit', text: '16 × 0.25 = 4 inches' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Scale Drawings',
      skills: ['scale_drawings', 'proportions'],
      prerequisites: ['proportions', 'multiplication', 'fractions'],
      concepts: ['scale', 'blueprint', 'proportion'],
      commonMistakes: [
        'Using wrong operation',
        'Fraction to decimal conversion error',
        'Confusing actual and blueprint dimensions'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'scale', 'blueprint', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-039',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'A map uses a scale where 2 cm = 25 km. Two cities are 140 km apart. How far apart are they on the map?',
    },
    answer: {
      type: 'numeric',
      correct: '11.2',
      acceptable: ['11.2', '11.2 cm', '11.2 centimeters'],
      unit: 'centimeters'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{2 \\text{ cm}}{25 \\text{ km}} = \\frac{x \\text{ cm}}{140 \\text{ km}}' },
        { number: 2, description: 'Cross multiply', latex: '25x = 2 \\times 140' },
        { number: 3, description: 'Simplify', latex: '25x = 280' },
        { number: 4, description: 'Divide by 25', latex: 'x = 11.2' }
      ],
      method: 'Scale proportion'
    },
    hints: [
      { level: 'gentle', text: 'Set up: cm/km = cm/km' },
      { level: 'moderate', text: '2/25 = x/140. Cross multiply: 25x = 280' },
      { level: 'explicit', text: 'x = 280 ÷ 25 = 11.2 cm' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Scale Drawings',
      skills: ['scale_drawings', 'proportions', 'decimals'],
      prerequisites: ['proportions', 'division'],
      concepts: ['scale', 'map-scale'],
      commonMistakes: [
        'Setting up proportion backwards',
        'Division errors with decimals',
        'Unit confusion'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'scale', 'maps', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-040',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'A scale drawing of a playground uses a scale of 1 inch = 8 feet. The actual playground is 96 feet wide. What is the width on the drawing?',
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '12 inches', '12 in'],
      unit: 'inches'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{1 \\text{ in}}{8 \\text{ ft}} = \\frac{x \\text{ in}}{96 \\text{ ft}}' },
        { number: 2, description: 'Cross multiply', latex: '8x = 96' },
        { number: 3, description: 'Divide by 8', latex: 'x = 12' }
      ],
      method: 'Scale proportion'
    },
    hints: [
      { level: 'gentle', text: 'Set up: drawing inches / actual feet = drawing inches / actual feet' },
      { level: 'moderate', text: '1/8 = x/96. Cross multiply: 8x = 96' },
      { level: 'explicit', text: 'x = 96 ÷ 8 = 12 inches' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Scale Drawings',
      skills: ['scale_drawings', 'proportions'],
      prerequisites: ['proportions', 'division'],
      concepts: ['scale', 'proportion'],
      commonMistakes: [
        'Multiplying instead of dividing',
        'Setting up proportion incorrectly',
        'Unit confusion'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'scale', 'grade-7']
    }
  },

  // ============================================================================
  // SIMILAR FIGURES (Grade 7-8) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g7-proportions-041',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Two similar triangles have corresponding sides of 6 cm and 9 cm. If the smaller triangle has a side of 8 cm, what is the corresponding side of the larger triangle?',
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '12 cm', '12 centimeters'],
      unit: 'cm'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the scale factor', latex: '\\frac{9}{6} = 1.5' },
        { number: 2, description: 'Multiply the corresponding side', latex: '8 \\times 1.5 = 12' },
        { number: 3, description: 'Or use proportion', latex: '\\frac{6}{9} = \\frac{8}{x}, x = 12' }
      ],
      method: 'Scale factor or proportion'
    },
    hints: [
      { level: 'gentle', text: 'Find the scale factor between the two triangles first.' },
      { level: 'moderate', text: '9 ÷ 6 = 1.5. Multiply 8 by this scale factor.' },
      { level: 'explicit', text: '8 × 1.5 = 12 cm' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Similar Figures',
      skills: ['similar_figures', 'proportions', 'scale_factor'],
      prerequisites: ['proportions', 'multiplication'],
      concepts: ['similarity', 'scale-factor', 'corresponding-sides'],
      commonMistakes: [
        'Finding wrong scale factor',
        'Applying scale factor to wrong side',
        'Dividing instead of multiplying'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'similar-figures', 'geometry', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-042',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'Two similar rectangles have widths of 4 inches and 10 inches. If the smaller rectangle has a length of 6 inches, what is the length of the larger rectangle?',
    },
    answer: {
      type: 'numeric',
      correct: '15',
      acceptable: ['15', '15 inches', '15 in'],
      unit: 'inches'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion', latex: '\\frac{4}{10} = \\frac{6}{x}' },
        { number: 2, description: 'Cross multiply', latex: '4x = 60' },
        { number: 3, description: 'Divide by 4', latex: 'x = 15' }
      ],
      method: 'Proportion of similar figures'
    },
    hints: [
      { level: 'gentle', text: 'Use the ratio of widths to set up a proportion with lengths.' },
      { level: 'moderate', text: '4/10 = 6/x. Cross multiply: 4x = 60' },
      { level: 'explicit', text: 'x = 60 ÷ 4 = 15 inches' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Similar Figures',
      skills: ['similar_figures', 'proportions'],
      prerequisites: ['proportions', 'cross_multiplication'],
      concepts: ['similarity', 'corresponding-dimensions'],
      commonMistakes: [
        'Setting up proportion incorrectly',
        'Cross multiplication errors',
        'Matching wrong dimensions'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'similar-figures', 'rectangles', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g8-proportions-043',
    version: 2,
    type: 'pre-algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A flagpole casts a shadow of 12 feet. At the same time, a 5-foot person casts a shadow of 4 feet. How tall is the flagpole?',
    },
    answer: {
      type: 'numeric',
      correct: '15',
      acceptable: ['15', '15 feet', '15 ft'],
      unit: 'feet'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the proportion (height/shadow)', latex: '\\frac{5 \\text{ ft}}{4 \\text{ ft}} = \\frac{x \\text{ ft}}{12 \\text{ ft}}' },
        { number: 2, description: 'Cross multiply', latex: '4x = 5 \\times 12' },
        { number: 3, description: 'Simplify', latex: '4x = 60' },
        { number: 4, description: 'Divide by 4', latex: 'x = 15' }
      ],
      method: 'Similar triangles (shadow problems)'
    },
    hints: [
      { level: 'gentle', text: 'The person and flagpole form similar triangles with their shadows.' },
      { level: 'moderate', text: 'height/shadow = height/shadow. So 5/4 = x/12' },
      { level: 'explicit', text: '4x = 60, so x = 15 feet' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Similar Figures',
      skills: ['similar_figures', 'proportions', 'shadow_problems'],
      prerequisites: ['proportions', 'similar_triangles'],
      concepts: ['similar-triangles', 'indirect-measurement'],
      commonMistakes: [
        'Setting up proportion with wrong pairs',
        'Confusing heights and shadows',
        'Cross multiplication errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'similar-figures', 'shadows', 'grade-8']
    }
  },
  {
    id: 'prealg-v2-g8-proportions-044',
    version: 2,
    type: 'pre-algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Triangle ABC is similar to triangle DEF. If AB = 8, BC = 12, DE = 6, what is EF?',
    },
    answer: {
      type: 'numeric',
      correct: '9',
      acceptable: ['9', 'EF = 9']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up proportion with corresponding sides', latex: '\\frac{AB}{DE} = \\frac{BC}{EF}' },
        { number: 2, description: 'Substitute values', latex: '\\frac{8}{6} = \\frac{12}{EF}' },
        { number: 3, description: 'Cross multiply', latex: '8 \\times EF = 6 \\times 12' },
        { number: 4, description: 'Solve', latex: '8 \\times EF = 72, EF = 9' }
      ],
      method: 'Similar triangles proportion'
    },
    hints: [
      { level: 'gentle', text: 'Corresponding sides of similar triangles are proportional. AB corresponds to DE, BC corresponds to EF.' },
      { level: 'moderate', text: '8/6 = 12/EF. Cross multiply.' },
      { level: 'explicit', text: '8 × EF = 72, so EF = 9' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Similar Figures',
      skills: ['similar_figures', 'proportions'],
      prerequisites: ['proportions', 'geometry_basics'],
      concepts: ['similar-triangles', 'corresponding-sides'],
      commonMistakes: [
        'Matching non-corresponding sides',
        'Cross multiplication errors',
        'Letter confusion'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'similar-triangles', 'grade-8']
    }
  },
  {
    id: 'prealg-v2-g8-proportions-045',
    version: 2,
    type: 'pre-algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Two similar pentagons have perimeters of 35 cm and 21 cm. If the longest side of the larger pentagon is 10 cm, what is the longest side of the smaller pentagon?',
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6', '6 cm', '6 centimeters'],
      unit: 'cm'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the scale factor using perimeters', latex: '\\frac{21}{35} = \\frac{3}{5}' },
        { number: 2, description: 'Apply scale factor to the side', latex: '10 \\times \\frac{3}{5} = 6' },
        { number: 3, description: 'Or use proportion', latex: '\\frac{35}{21} = \\frac{10}{x}, x = 6' }
      ],
      method: 'Perimeter ratio equals side ratio'
    },
    hints: [
      { level: 'gentle', text: 'The ratio of perimeters equals the ratio of corresponding sides.' },
      { level: 'moderate', text: '21/35 = 3/5. Apply this ratio to the 10 cm side.' },
      { level: 'explicit', text: '10 × (3/5) = 6 cm' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Similar Figures',
      skills: ['similar_figures', 'proportions', 'perimeter'],
      prerequisites: ['proportions', 'perimeter'],
      concepts: ['similarity', 'perimeter-ratio'],
      commonMistakes: [
        'Using area ratio instead of perimeter ratio',
        'Inverting the scale factor',
        'Calculation errors with fractions'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'similar-figures', 'perimeter', 'grade-8']
    }
  },

  // ============================================================================
  // PERCENT PROPORTIONS (Grade 7-8) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g7-proportions-046',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'What is 35% of 80?',
    },
    answer: {
      type: 'numeric',
      correct: '28',
      acceptable: ['28']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the percent proportion', latex: '\\frac{\\text{part}}{80} = \\frac{35}{100}' },
        { number: 2, description: 'Cross multiply', latex: '100 \\times \\text{part} = 35 \\times 80' },
        { number: 3, description: 'Simplify', latex: '100 \\times \\text{part} = 2800' },
        { number: 4, description: 'Divide by 100', latex: '\\text{part} = 28' }
      ],
      alternativeMethods: ['Convert to decimal: 0.35 × 80 = 28'],
      method: 'Percent proportion'
    },
    hints: [
      { level: 'gentle', text: 'Use the formula: part/whole = percent/100' },
      { level: 'moderate', text: 'part/80 = 35/100. Cross multiply.' },
      { level: 'explicit', text: '100 × part = 2800, so part = 28' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Percent Proportions',
      skills: ['percent_proportions', 'cross_multiplication'],
      prerequisites: ['proportions', 'percent_basics'],
      concepts: ['percent-proportion', 'finding-part'],
      commonMistakes: [
        'Setting up proportion incorrectly',
        'Decimal errors',
        'Division errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'percent', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-047',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: '18 is what percent of 72?',
    },
    answer: {
      type: 'numeric',
      correct: '25',
      acceptable: ['25', '25%', '25 percent'],
      unit: '%'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the percent proportion', latex: '\\frac{18}{72} = \\frac{x}{100}' },
        { number: 2, description: 'Cross multiply', latex: '72x = 18 \\times 100' },
        { number: 3, description: 'Simplify', latex: '72x = 1800' },
        { number: 4, description: 'Divide by 72', latex: 'x = 25' }
      ],
      alternativeMethods: ['Divide: 18 ÷ 72 = 0.25 = 25%'],
      method: 'Percent proportion'
    },
    hints: [
      { level: 'gentle', text: 'Use: part/whole = percent/100' },
      { level: 'moderate', text: '18/72 = x/100. Cross multiply: 72x = 1800' },
      { level: 'explicit', text: 'x = 1800 ÷ 72 = 25%' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Percent Proportions',
      skills: ['percent_proportions', 'cross_multiplication'],
      prerequisites: ['proportions', 'percent_basics'],
      concepts: ['percent-proportion', 'finding-percent'],
      commonMistakes: [
        'Setting up proportion incorrectly',
        'Division errors',
        'Forgetting percent sign'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'percent', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-proportions-048',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: '42 is 60% of what number?',
    },
    answer: {
      type: 'numeric',
      correct: '70',
      acceptable: ['70']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the percent proportion', latex: '\\frac{42}{x} = \\frac{60}{100}' },
        { number: 2, description: 'Cross multiply', latex: '60x = 42 \\times 100' },
        { number: 3, description: 'Simplify', latex: '60x = 4200' },
        { number: 4, description: 'Divide by 60', latex: 'x = 70' }
      ],
      alternativeMethods: ['Divide: 42 ÷ 0.60 = 70'],
      method: 'Percent proportion'
    },
    hints: [
      { level: 'gentle', text: 'Use: part/whole = percent/100. Here, 42 is the part and the whole is unknown.' },
      { level: 'moderate', text: '42/x = 60/100. Cross multiply: 60x = 4200' },
      { level: 'explicit', text: 'x = 4200 ÷ 60 = 70' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Percent Proportions',
      skills: ['percent_proportions', 'cross_multiplication'],
      prerequisites: ['proportions', 'percent_basics'],
      concepts: ['percent-proportion', 'finding-whole'],
      commonMistakes: [
        'Putting numbers in wrong positions',
        'Division errors',
        'Confusing part and whole'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'percent', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g8-proportions-049',
    version: 2,
    type: 'pre-algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A shirt originally costs $45 and is on sale for 30% off. What is the sale price?',
    },
    answer: {
      type: 'numeric',
      correct: '31.50',
      acceptable: ['31.50', '$31.50', '31.5', '$31.5'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the discount amount', latex: '\\frac{x}{45} = \\frac{30}{100}' },
        { number: 2, description: 'Solve for discount', latex: 'x = 45 \\times 0.30 = 13.50' },
        { number: 3, description: 'Subtract from original price', latex: '45 - 13.50 = 31.50' }
      ],
      alternativeMethods: ['Calculate 70% of $45: 0.70 × 45 = $31.50'],
      method: 'Percent discount'
    },
    hints: [
      { level: 'gentle', text: 'First find 30% of $45, then subtract from the original price.' },
      { level: 'moderate', text: '30% of 45 = 0.30 × 45 = $13.50 discount' },
      { level: 'explicit', text: '$45 - $13.50 = $31.50' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Percent Proportions',
      skills: ['percent_proportions', 'percent_discount'],
      prerequisites: ['percent_basics', 'subtraction'],
      concepts: ['percent-discount', 'sale-price'],
      commonMistakes: [
        'Forgetting to subtract',
        'Adding instead of subtracting',
        'Decimal placement errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'percent', 'discount', 'grade-8']
    }
  },
  {
    id: 'prealg-v2-g8-proportions-050',
    version: 2,
    type: 'pre-algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A restaurant bill is $64. If you want to leave a 15% tip, what is the total amount including the tip?',
    },
    answer: {
      type: 'numeric',
      correct: '73.60',
      acceptable: ['73.60', '$73.60', '73.6', '$73.6'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the tip', latex: '\\frac{x}{64} = \\frac{15}{100}' },
        { number: 2, description: 'Solve for tip', latex: 'x = 64 \\times 0.15 = 9.60' },
        { number: 3, description: 'Add to original bill', latex: '64 + 9.60 = 73.60' }
      ],
      alternativeMethods: ['Calculate 115% of $64: 1.15 × 64 = $73.60'],
      method: 'Percent increase'
    },
    hints: [
      { level: 'gentle', text: 'First find 15% of $64, then add it to the bill.' },
      { level: 'moderate', text: '15% of 64 = 0.15 × 64 = $9.60 tip' },
      { level: 'explicit', text: '$64 + $9.60 = $73.60 total' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Percent Proportions',
      skills: ['percent_proportions', 'percent_increase'],
      prerequisites: ['percent_basics', 'addition'],
      concepts: ['percent-tip', 'total-with-tip'],
      commonMistakes: [
        'Forgetting to add',
        'Decimal placement errors',
        'Calculating tip only without adding'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'proportions', 'percent', 'tip', 'grade-8']
    }
  }
]

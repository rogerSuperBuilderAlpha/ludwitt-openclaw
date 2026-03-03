/**
 * Ratios and Rates - MathProblemV2 Format
 * 
 * Topics covered:
 * - Writing Ratios (part-to-part, part-to-whole) (G5-6)
 * - Equivalent Ratios (G6)
 * - Unit Rates (G6-7)
 * - Comparing Ratios (G6-7)
 * - Ratio Tables (G6-7)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const RATIOS_V2: MathProblemV2[] = [
  // ============================================================================
  // WRITING RATIOS (Grade 5-6) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-ratios-001',
    version: 2,
    type: 'pre-algebra',
    difficulty: 5.5,
    gradeLevel: 6,
    question: {
      text: 'In a class of 30 students, 18 are girls. What is the ratio of girls to boys?',
    },
    answer: {
      type: 'fraction',
      correct: '3:2',
      acceptable: ['3:2', '3 to 2', '3/2', '18:12', '18 to 12']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the number of boys', latex: '30 - 18 = 12 \\text{ boys}' },
        { number: 2, description: 'Write the ratio of girls to boys', latex: '18:12' },
        { number: 3, description: 'Simplify by dividing both by GCF (6)', latex: '18 \\div 6 : 12 \\div 6 = 3:2' }
      ],
      method: 'Ratio simplification'
    },
    hints: [
      { level: 'gentle', text: 'First, figure out how many boys are in the class. Then write the ratio.' },
      { level: 'moderate', text: 'There are 30 - 18 = 12 boys. The ratio of girls to boys is 18:12. Can you simplify?' },
      { level: 'explicit', text: '18:12 can be simplified. Both 18 and 12 are divisible by 6. 18÷6 = 3 and 12÷6 = 2, so the ratio is 3:2.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Writing Ratios',
      skills: ['ratio_writing', 'simplifying_ratios', 'subtraction'],
      prerequisites: ['division', 'gcf', 'subtraction'],
      concepts: ['ratio', 'part-to-part', 'simplification'],
      commonMistakes: [
        'Writing the ratio in the wrong order (boys:girls instead of girls:boys)',
        'Forgetting to simplify the ratio',
        'Using total instead of finding the other part'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'simplifying', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g5-ratios-002',
    version: 2,
    type: 'pre-algebra',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A fruit basket has 8 apples and 6 oranges. Write the ratio of apples to oranges in simplest form.',
    },
    answer: {
      type: 'fraction',
      correct: '4:3',
      acceptable: ['4:3', '4 to 3', '4/3', '8:6', '8 to 6']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the ratio of apples to oranges', latex: '8:6' },
        { number: 2, description: 'Find the GCF of 8 and 6', latex: '\\text{GCF}(8, 6) = 2' },
        { number: 3, description: 'Divide both numbers by the GCF', latex: '8 \\div 2 : 6 \\div 2 = 4:3' }
      ],
      method: 'Ratio simplification'
    },
    hints: [
      { level: 'gentle', text: 'Write the number of apples first, then oranges. Can you simplify?' },
      { level: 'moderate', text: 'The ratio is 8:6. Both numbers are even, so you can divide by 2.' },
      { level: 'explicit', text: '8 ÷ 2 = 4 and 6 ÷ 2 = 3, so the simplified ratio is 4:3.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Writing Ratios',
      skills: ['ratio_writing', 'simplifying_ratios'],
      prerequisites: ['division', 'gcf'],
      concepts: ['ratio', 'part-to-part', 'simplification'],
      commonMistakes: [
        'Writing the ratio backwards',
        'Not simplifying',
        'Dividing incorrectly'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'simplifying', 'grade-5']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-003',
    version: 2,
    type: 'pre-algebra',
    difficulty: 5.5,
    gradeLevel: 6,
    question: {
      text: 'A recipe calls for 2 cups of flour for every 3 cups of sugar. What is the ratio of flour to the total amount of flour and sugar?',
    },
    answer: {
      type: 'fraction',
      correct: '2:5',
      acceptable: ['2:5', '2 to 5', '2/5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the parts', latex: '\\text{Flour} = 2, \\text{Sugar} = 3' },
        { number: 2, description: 'Find the total', latex: '2 + 3 = 5' },
        { number: 3, description: 'Write the part-to-whole ratio', latex: '\\text{Flour to Total} = 2:5' }
      ],
      method: 'Part-to-whole ratio'
    },
    hints: [
      { level: 'gentle', text: 'This is asking for a part-to-whole ratio. What is the total amount?' },
      { level: 'moderate', text: 'Total = 2 + 3 = 5 cups. Now write the ratio of flour to total.' },
      { level: 'explicit', text: 'Flour is 2 cups out of 5 total cups, so the ratio is 2:5.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Writing Ratios',
      skills: ['ratio_writing', 'part_whole_ratios'],
      prerequisites: ['addition', 'ratio_concepts'],
      concepts: ['ratio', 'part-to-whole'],
      commonMistakes: [
        'Writing part-to-part instead of part-to-whole',
        'Forgetting to add to find the total',
        'Confusing which part is being asked about'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'part-to-whole', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g5-ratios-004',
    version: 2,
    type: 'pre-algebra',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A basketball team won 15 games and lost 5 games. What is the ratio of wins to losses?',
    },
    answer: {
      type: 'fraction',
      correct: '3:1',
      acceptable: ['3:1', '3 to 1', '3/1', '15:5', '15 to 5', '3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the ratio of wins to losses', latex: '15:5' },
        { number: 2, description: 'Find the GCF of 15 and 5', latex: '\\text{GCF}(15, 5) = 5' },
        { number: 3, description: 'Simplify by dividing both by 5', latex: '15 \\div 5 : 5 \\div 5 = 3:1' }
      ],
      method: 'Ratio simplification'
    },
    hints: [
      { level: 'gentle', text: 'Write wins first, then losses. What number divides both evenly?' },
      { level: 'moderate', text: 'The ratio is 15:5. Both are divisible by 5.' },
      { level: 'explicit', text: '15 ÷ 5 = 3 and 5 ÷ 5 = 1, so the ratio is 3:1.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Writing Ratios',
      skills: ['ratio_writing', 'simplifying_ratios'],
      prerequisites: ['division', 'gcf'],
      concepts: ['ratio', 'part-to-part', 'simplification'],
      commonMistakes: [
        'Writing losses to wins instead',
        'Not simplifying fully',
        'Calculation errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'simplifying', 'sports', 'grade-5']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-005',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'In a bag of 40 marbles, 15 are red, 10 are blue, and the rest are green. What is the ratio of green marbles to the total number of marbles?',
    },
    answer: {
      type: 'fraction',
      correct: '3:8',
      acceptable: ['3:8', '3 to 8', '3/8', '15:40', '15 to 40']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the number of green marbles', latex: '40 - 15 - 10 = 15 \\text{ green}' },
        { number: 2, description: 'Write the ratio of green to total', latex: '15:40' },
        { number: 3, description: 'Simplify by dividing both by 5', latex: '15 \\div 5 : 40 \\div 5 = 3:8' }
      ],
      method: 'Part-to-whole ratio'
    },
    hints: [
      { level: 'gentle', text: 'First find how many marbles are green by subtracting red and blue from total.' },
      { level: 'moderate', text: '40 - 15 - 10 = 15 green marbles. The ratio to total is 15:40.' },
      { level: 'explicit', text: 'Simplify 15:40 by dividing by 5: 15÷5 = 3, 40÷5 = 8, so 3:8.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Writing Ratios',
      skills: ['ratio_writing', 'part_whole_ratios', 'subtraction'],
      prerequisites: ['subtraction', 'gcf', 'division'],
      concepts: ['ratio', 'part-to-whole', 'simplification'],
      commonMistakes: [
        'Forgetting to subtract both colors',
        'Writing part-to-part instead of part-to-whole',
        'Simplification errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'part-to-whole', 'grade-6']
    }
  },

  // ============================================================================
  // EQUIVALENT RATIOS (Grade 6) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-ratios-006',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Find the missing value: 3:4 = 9:?',
      latex: '3:4 = 9:?'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '? = 12']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the scale factor', latex: '9 \\div 3 = 3' },
        { number: 2, description: 'Multiply the second term by the same factor', latex: '4 \\times 3 = 12' },
        { number: 3, description: 'Write the complete ratio', latex: '3:4 = 9:12' }
      ],
      method: 'Scale factor'
    },
    hints: [
      { level: 'gentle', text: 'How many times does 3 go into 9? Use the same multiplier on 4.' },
      { level: 'moderate', text: '9 ÷ 3 = 3, so multiply 4 by 3.' },
      { level: 'explicit', text: '4 × 3 = 12, so the missing value is 12.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Equivalent Ratios',
      skills: ['equivalent_ratios', 'scale_factors'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['equivalent-ratios', 'scale-factor'],
      commonMistakes: [
        'Adding instead of multiplying',
        'Using wrong operation',
        'Finding wrong scale factor'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'equivalent', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-007',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Are the ratios 6:8 and 15:20 equivalent? Explain.',
    },
    answer: {
      type: 'exact',
      correct: 'yes',
      acceptable: ['yes', 'Yes', 'YES', 'they are equivalent', 'equivalent', 'true']
    },
    solution: {
      steps: [
        { number: 1, description: 'Simplify 6:8', latex: '6:8 = 6 \\div 2 : 8 \\div 2 = 3:4' },
        { number: 2, description: 'Simplify 15:20', latex: '15:20 = 15 \\div 5 : 20 \\div 5 = 3:4' },
        { number: 3, description: 'Compare the simplified ratios', latex: '3:4 = 3:4 \\checkmark' }
      ],
      alternativeMethods: ['Cross multiply: 6 × 20 = 120 and 8 × 15 = 120'],
      method: 'Simplify and compare'
    },
    hints: [
      { level: 'gentle', text: 'Try simplifying both ratios to see if they are the same.' },
      { level: 'moderate', text: '6:8 simplifies to 3:4. What does 15:20 simplify to?' },
      { level: 'explicit', text: 'Both simplify to 3:4, so yes, they are equivalent.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Equivalent Ratios',
      skills: ['equivalent_ratios', 'simplifying_ratios'],
      prerequisites: ['gcf', 'division'],
      concepts: ['equivalent-ratios', 'simplification'],
      commonMistakes: [
        'Not simplifying fully',
        'Calculation errors when simplifying',
        'Only checking one ratio'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'equivalent', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-008',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Find the missing value: 5:? = 20:28',
      latex: '5:? = 20:28'
    },
    answer: {
      type: 'numeric',
      correct: '7',
      acceptable: ['7', '? = 7']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the scale factor from 5 to 20', latex: '20 \\div 5 = 4' },
        { number: 2, description: 'Divide 28 by the same factor', latex: '28 \\div 4 = 7' },
        { number: 3, description: 'Write the complete ratio', latex: '5:7 = 20:28' }
      ],
      method: 'Scale factor (reverse)'
    },
    hints: [
      { level: 'gentle', text: 'The first numbers went from 5 to 20. What was the multiplier?' },
      { level: 'moderate', text: '20 ÷ 5 = 4, so divide 28 by 4.' },
      { level: 'explicit', text: '28 ÷ 4 = 7, so the missing value is 7.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Equivalent Ratios',
      skills: ['equivalent_ratios', 'scale_factors'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['equivalent-ratios', 'scale-factor'],
      commonMistakes: [
        'Using wrong operation',
        'Finding wrong scale factor',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'equivalent', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-009',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'A lemonade recipe uses 2 cups of lemon juice for every 5 cups of water. How many cups of water are needed for 8 cups of lemon juice?',
    },
    answer: {
      type: 'numeric',
      correct: '20',
      acceptable: ['20', '20 cups', '20 cups of water']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the original ratio', latex: '2:5' },
        { number: 2, description: 'Find the scale factor', latex: '8 \\div 2 = 4' },
        { number: 3, description: 'Multiply water by the same factor', latex: '5 \\times 4 = 20' }
      ],
      method: 'Equivalent ratios'
    },
    hints: [
      { level: 'gentle', text: 'Set up the ratio: 2 cups lemon juice : 5 cups water = 8 cups lemon juice : ? cups water' },
      { level: 'moderate', text: '8 ÷ 2 = 4, so multiply 5 by 4.' },
      { level: 'explicit', text: '5 × 4 = 20 cups of water.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Equivalent Ratios',
      skills: ['equivalent_ratios', 'proportional_reasoning'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['equivalent-ratios', 'scaling'],
      commonMistakes: [
        'Mixing up lemon juice and water amounts',
        'Using addition instead of multiplication',
        'Wrong scale factor'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'equivalent', 'recipe', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-010',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Which ratio is NOT equivalent to 4:6? A) 2:3  B) 8:12  C) 6:8  D) 12:18',
    },
    answer: {
      type: 'multiple-choice',
      correct: 'C',
      acceptable: ['C', 'c', '6:8'],
      choices: [
        { id: 'A', text: '2:3' },
        { id: 'B', text: '8:12' },
        { id: 'C', text: '6:8' },
        { id: 'D', text: '12:18' }
      ]
    },
    solution: {
      steps: [
        { number: 1, description: 'Simplify 4:6', latex: '4:6 = 2:3' },
        { number: 2, description: 'Check each option', latex: 'A) 2:3 \\checkmark, B) 8:12 = 2:3 \\checkmark, C) 6:8 = 3:4 \\times, D) 12:18 = 2:3 \\checkmark' },
        { number: 3, description: '6:8 simplifies to 3:4, not 2:3', latex: '6:8 \\neq 4:6' }
      ],
      method: 'Simplify and compare'
    },
    hints: [
      { level: 'gentle', text: 'First simplify 4:6, then check each option.' },
      { level: 'moderate', text: '4:6 = 2:3. Which option does NOT simplify to 2:3?' },
      { level: 'explicit', text: '6:8 simplifies to 3:4, which is different from 2:3. Answer: C' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Equivalent Ratios',
      skills: ['equivalent_ratios', 'simplifying_ratios'],
      prerequisites: ['gcf', 'division'],
      concepts: ['equivalent-ratios', 'simplification'],
      commonMistakes: [
        'Not checking all options',
        'Simplification errors',
        'Rushing and picking wrong answer'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'equivalent', 'multiple-choice', 'grade-6']
    }
  },

  // ============================================================================
  // UNIT RATES (Grade 6-7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-ratios-011',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A car travels 180 miles in 3 hours. What is the unit rate in miles per hour?',
    },
    answer: {
      type: 'numeric',
      correct: '60',
      acceptable: ['60', '60 mph', '60 miles per hour', '60 mi/hr'],
      unit: 'miles per hour'
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the rate', latex: '\\frac{180 \\text{ miles}}{3 \\text{ hours}}' },
        { number: 2, description: 'Divide to find miles per 1 hour', latex: '180 \\div 3 = 60' },
        { number: 3, description: 'State the unit rate', latex: '60 \\text{ miles per hour}' }
      ],
      method: 'Division to find unit rate'
    },
    hints: [
      { level: 'gentle', text: 'A unit rate tells you the amount per ONE unit. Divide miles by hours.' },
      { level: 'moderate', text: '180 miles ÷ 3 hours = ? miles per hour' },
      { level: 'explicit', text: '180 ÷ 3 = 60 miles per hour.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Unit Rates',
      skills: ['unit_rates', 'division'],
      prerequisites: ['division'],
      concepts: ['unit-rate', 'rate', 'speed'],
      commonMistakes: [
        'Dividing in wrong order (hours ÷ miles)',
        'Forgetting units',
        'Division errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'unit-rate', 'speed', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-012',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A 12-pack of soda costs $4.80. What is the unit price per can?',
    },
    answer: {
      type: 'numeric',
      correct: '0.40',
      acceptable: ['0.40', '$0.40', '0.4', '$0.4', '40 cents', '40¢'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the rate', latex: '\\frac{\\$4.80}{12 \\text{ cans}}' },
        { number: 2, description: 'Divide to find price per 1 can', latex: '4.80 \\div 12 = 0.40' },
        { number: 3, description: 'State the unit price', latex: '\\$0.40 \\text{ per can}' }
      ],
      method: 'Division to find unit price'
    },
    hints: [
      { level: 'gentle', text: 'Unit price means price for ONE item. Divide total cost by number of items.' },
      { level: 'moderate', text: '$4.80 ÷ 12 cans = ? per can' },
      { level: 'explicit', text: '$4.80 ÷ 12 = $0.40 per can.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Unit Rates',
      skills: ['unit_rates', 'division', 'decimals'],
      prerequisites: ['division', 'decimal_operations'],
      concepts: ['unit-rate', 'unit-price'],
      commonMistakes: [
        'Dividing in wrong order',
        'Decimal placement errors',
        'Forgetting the dollar sign'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'unit-rate', 'money', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-ratios-013',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 7,
    question: {
      text: 'Store A sells 5 pounds of apples for $7.50. Store B sells 3 pounds for $4.20. Which store has the better deal?',
    },
    answer: {
      type: 'exact',
      correct: 'Store B',
      acceptable: ['Store B', 'store b', 'B', 'b']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find unit price at Store A', latex: '\\$7.50 \\div 5 = \\$1.50 \\text{ per pound}' },
        { number: 2, description: 'Find unit price at Store B', latex: '\\$4.20 \\div 3 = \\$1.40 \\text{ per pound}' },
        { number: 3, description: 'Compare: lower unit price is better', latex: '\\$1.40 < \\$1.50' }
      ],
      method: 'Compare unit rates'
    },
    hints: [
      { level: 'gentle', text: 'Find the price per pound at each store, then compare.' },
      { level: 'moderate', text: 'Store A: $7.50 ÷ 5 = $1.50/lb. Store B: $4.20 ÷ 3 = ?' },
      { level: 'explicit', text: 'Store B is $1.40/lb, which is cheaper than Store A at $1.50/lb.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Unit Rates',
      skills: ['unit_rates', 'comparison', 'division'],
      prerequisites: ['division', 'decimal_comparison'],
      concepts: ['unit-rate', 'unit-price', 'comparison'],
      commonMistakes: [
        'Comparing totals instead of unit prices',
        'Division errors',
        'Choosing higher price as better'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'unit-rate', 'comparison', 'shopping', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-014',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A printer prints 120 pages in 8 minutes. What is the printing rate in pages per minute?',
    },
    answer: {
      type: 'numeric',
      correct: '15',
      acceptable: ['15', '15 pages per minute', '15 ppm', '15 pages/min'],
      unit: 'pages per minute'
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the rate', latex: '\\frac{120 \\text{ pages}}{8 \\text{ minutes}}' },
        { number: 2, description: 'Divide to find pages per 1 minute', latex: '120 \\div 8 = 15' },
        { number: 3, description: 'State the unit rate', latex: '15 \\text{ pages per minute}' }
      ],
      method: 'Division to find unit rate'
    },
    hints: [
      { level: 'gentle', text: 'Divide the number of pages by the number of minutes.' },
      { level: 'moderate', text: '120 pages ÷ 8 minutes = ?' },
      { level: 'explicit', text: '120 ÷ 8 = 15 pages per minute.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Unit Rates',
      skills: ['unit_rates', 'division'],
      prerequisites: ['division'],
      concepts: ['unit-rate', 'rate'],
      commonMistakes: [
        'Dividing in wrong order',
        'Division errors',
        'Forgetting units'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'unit-rate', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-ratios-015',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 7,
    question: {
      text: 'A runner completes 5 laps around a track in 12 minutes. How many minutes does it take to complete one lap?',
    },
    answer: {
      type: 'numeric',
      correct: '2.4',
      acceptable: ['2.4', '2.4 minutes', '2.4 min', '12/5'],
      unit: 'minutes'
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify what we need', latex: '\\text{Time per 1 lap}' },
        { number: 2, description: 'Divide total time by number of laps', latex: '12 \\div 5 = 2.4' },
        { number: 3, description: 'State the answer', latex: '2.4 \\text{ minutes per lap}' }
      ],
      method: 'Division to find unit rate'
    },
    hints: [
      { level: 'gentle', text: 'This time you need time per lap, not laps per time. Divide minutes by laps.' },
      { level: 'moderate', text: '12 minutes ÷ 5 laps = ?' },
      { level: 'explicit', text: '12 ÷ 5 = 2.4 minutes per lap.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Unit Rates',
      skills: ['unit_rates', 'division', 'decimals'],
      prerequisites: ['division', 'decimal_operations'],
      concepts: ['unit-rate', 'rate'],
      commonMistakes: [
        'Dividing laps by minutes instead',
        'Decimal errors',
        'Rounding when exact answer is needed'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'unit-rate', 'sports', 'grade-7']
    }
  },

  // ============================================================================
  // COMPARING RATIOS (Grade 6-7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-ratios-016',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Which is greater: 3:5 or 4:7?',
    },
    answer: {
      type: 'exact',
      correct: '3:5',
      acceptable: ['3:5', '3/5', '3 to 5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert to decimals', latex: '3:5 = 3 \\div 5 = 0.6' },
        { number: 2, description: 'Convert second ratio', latex: '4:7 = 4 \\div 7 \\approx 0.571' },
        { number: 3, description: 'Compare', latex: '0.6 > 0.571' }
      ],
      alternativeMethods: ['Cross multiply: 3×7 = 21 and 5×4 = 20. Since 21 > 20, 3:5 > 4:7'],
      method: 'Convert to decimals'
    },
    hints: [
      { level: 'gentle', text: 'Convert both ratios to decimals by dividing, then compare.' },
      { level: 'moderate', text: '3÷5 = 0.6 and 4÷7 ≈ 0.571. Which is larger?' },
      { level: 'explicit', text: '0.6 > 0.571, so 3:5 is greater.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Comparing Ratios',
      skills: ['comparing_ratios', 'division', 'decimal_comparison'],
      prerequisites: ['division', 'decimals'],
      concepts: ['ratio-comparison', 'decimals'],
      commonMistakes: [
        'Comparing numerators only',
        'Division errors',
        'Decimal comparison errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'comparison', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-017',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Put these ratios in order from least to greatest: 2:3, 3:4, 5:6',
    },
    answer: {
      type: 'ordered-list',
      correct: '2:3, 3:4, 5:6',
      acceptable: ['2:3, 3:4, 5:6', '2/3, 3/4, 5/6']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert to decimals', latex: '2:3 \\approx 0.667, 3:4 = 0.75, 5:6 \\approx 0.833' },
        { number: 2, description: 'Order from least to greatest', latex: '0.667 < 0.75 < 0.833' },
        { number: 3, description: 'Write in ratio form', latex: '2:3, 3:4, 5:6' }
      ],
      method: 'Convert to decimals and order'
    },
    hints: [
      { level: 'gentle', text: 'Convert each ratio to a decimal, then put them in order.' },
      { level: 'moderate', text: '2÷3 ≈ 0.667, 3÷4 = 0.75, 5÷6 ≈ 0.833' },
      { level: 'explicit', text: 'From least to greatest: 2:3, 3:4, 5:6' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Comparing Ratios',
      skills: ['comparing_ratios', 'ordering', 'division'],
      prerequisites: ['division', 'decimals', 'ordering'],
      concepts: ['ratio-comparison', 'ordering'],
      commonMistakes: [
        'Not converting to same form',
        'Ordering wrong direction',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'ordering', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-ratios-018',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 7,
    question: {
      text: 'Team A won 7 out of 10 games. Team B won 8 out of 12 games. Which team has a better win ratio?',
    },
    answer: {
      type: 'exact',
      correct: 'Team A',
      acceptable: ['Team A', 'team a', 'A', 'a']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate Team A win ratio', latex: '7 \\div 10 = 0.70 = 70\\%' },
        { number: 2, description: 'Calculate Team B win ratio', latex: '8 \\div 12 \\approx 0.667 = 66.7\\%' },
        { number: 3, description: 'Compare', latex: '70\\% > 66.7\\%' }
      ],
      method: 'Convert to percentages'
    },
    hints: [
      { level: 'gentle', text: 'Convert each team\'s wins to a percentage or decimal and compare.' },
      { level: 'moderate', text: 'Team A: 7/10 = 70%. Team B: 8/12 = ?' },
      { level: 'explicit', text: 'Team A: 70%. Team B: 66.7%. Team A has a better ratio.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Comparing Ratios',
      skills: ['comparing_ratios', 'percentages', 'division'],
      prerequisites: ['division', 'percent_conversion'],
      concepts: ['ratio-comparison', 'percentage'],
      commonMistakes: [
        'Comparing raw numbers instead of ratios',
        'Calculation errors',
        'Confusing which is better'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'comparison', 'sports', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-019',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Use cross multiplication to compare 5:8 and 7:12. Which is greater?',
      latex: '\\frac{5}{8} \\text{ vs } \\frac{7}{12}'
    },
    answer: {
      type: 'exact',
      correct: '5:8',
      acceptable: ['5:8', '5/8', '5 to 8']
    },
    solution: {
      steps: [
        { number: 1, description: 'Cross multiply', latex: '5 \\times 12 = 60' },
        { number: 2, description: 'Cross multiply other direction', latex: '8 \\times 7 = 56' },
        { number: 3, description: 'Compare: larger product means larger ratio', latex: '60 > 56 \\Rightarrow 5:8 > 7:12' }
      ],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Cross multiply: 5×12 and 8×7. The ratio with the larger product is greater.' },
      { level: 'moderate', text: '5×12 = 60 and 8×7 = 56. Which is larger?' },
      { level: 'explicit', text: '60 > 56, so 5:8 is greater than 7:12.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Comparing Ratios',
      skills: ['comparing_ratios', 'cross_multiplication'],
      prerequisites: ['multiplication'],
      concepts: ['ratio-comparison', 'cross-multiplication'],
      commonMistakes: [
        'Cross multiplying in wrong positions',
        'Multiplication errors',
        'Interpreting result backwards'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'cross-multiply', 'comparison', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-ratios-020',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A paint mixture uses red and blue paint in the ratio 2:3. Another mixture uses them in the ratio 3:5. Which mixture has more red paint relative to the total?',
    },
    answer: {
      type: 'exact',
      correct: '3:5 mixture',
      acceptable: ['3:5', '3:5 mixture', '3 to 5', 'second', 'the second mixture']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find red fraction in 2:3 mixture', latex: '\\frac{2}{2+3} = \\frac{2}{5} = 0.4' },
        { number: 2, description: 'Find red fraction in 3:5 mixture', latex: '\\frac{3}{3+5} = \\frac{3}{8} = 0.375' },
        { number: 3, description: 'Compare', latex: '0.4 > 0.375' }
      ],
      method: 'Convert to part-to-whole ratios'
    },
    hints: [
      { level: 'gentle', text: 'For each mixture, find what fraction of the total is red paint.' },
      { level: 'moderate', text: 'First mixture: 2/(2+3) = 2/5. Second: 3/(3+5) = 3/8.' },
      { level: 'explicit', text: '2/5 = 0.4 and 3/8 = 0.375. The 2:3 mixture has more red.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Comparing Ratios',
      skills: ['comparing_ratios', 'part_whole_conversion', 'fractions'],
      prerequisites: ['fractions', 'division', 'addition'],
      concepts: ['ratio-comparison', 'part-to-whole'],
      commonMistakes: [
        'Comparing part-to-part instead of part-to-whole',
        'Addition errors in denominator',
        'Fraction comparison errors'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'comparison', 'mixtures', 'grade-7']
    }
  },

  // ============================================================================
  // RATIO TABLES (Grade 6-7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-ratios-021',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Complete the ratio table for the ratio 3:4. If the first value is 9, what is the second value?',
      latex: '\\begin{array}{|c|c|} \\hline 3 & 4 \\\\ \\hline 9 & ? \\\\ \\hline \\end{array}'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the scale factor', latex: '9 \\div 3 = 3' },
        { number: 2, description: 'Multiply the second value by the same factor', latex: '4 \\times 3 = 12' },
        { number: 3, description: 'Complete the table', latex: '9:12' }
      ],
      method: 'Scale factor'
    },
    hints: [
      { level: 'gentle', text: 'How many times does 3 go into 9? Use that to find the missing value.' },
      { level: 'moderate', text: '9 ÷ 3 = 3, so multiply 4 by 3.' },
      { level: 'explicit', text: '4 × 3 = 12.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Ratio Tables',
      skills: ['ratio_tables', 'equivalent_ratios', 'multiplication'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['ratio-table', 'equivalent-ratios', 'scaling'],
      commonMistakes: [
        'Adding instead of multiplying',
        'Using wrong scale factor',
        'Applying factor to wrong number'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'ratio-table', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-022',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'A recipe calls for 2 eggs for every 3 cups of flour. Complete the table to find how many eggs are needed for 12 cups of flour.',
      latex: '\\begin{array}{|c|c|} \\hline \\text{Eggs} & \\text{Flour} \\\\ \\hline 2 & 3 \\\\ \\hline ? & 12 \\\\ \\hline \\end{array}'
    },
    answer: {
      type: 'numeric',
      correct: '8',
      acceptable: ['8', '8 eggs']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the scale factor for flour', latex: '12 \\div 3 = 4' },
        { number: 2, description: 'Apply the same factor to eggs', latex: '2 \\times 4 = 8' },
        { number: 3, description: 'Complete the table', latex: '8 \\text{ eggs for } 12 \\text{ cups flour}' }
      ],
      method: 'Scale factor in ratio table'
    },
    hints: [
      { level: 'gentle', text: 'Find how flour changed from 3 to 12, then apply that same change to eggs.' },
      { level: 'moderate', text: '12 ÷ 3 = 4, so multiply eggs by 4.' },
      { level: 'explicit', text: '2 × 4 = 8 eggs.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Ratio Tables',
      skills: ['ratio_tables', 'proportional_reasoning'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['ratio-table', 'scaling', 'proportional-relationships'],
      commonMistakes: [
        'Finding wrong scale factor',
        'Multiplying wrong row',
        'Confusing rows and columns'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'ratio-table', 'recipe', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-ratios-023',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Find the missing value in the ratio table: 5:7 = 15:?',
    },
    answer: {
      type: 'numeric',
      correct: '21',
      acceptable: ['21']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the scale factor', latex: '15 \\div 5 = 3' },
        { number: 2, description: 'Apply to the second value', latex: '7 \\times 3 = 21' }
      ],
      method: 'Scale factor'
    },
    hints: [
      { level: 'gentle', text: 'How did 5 become 15? Use that same change on 7.' },
      { level: 'moderate', text: '15 ÷ 5 = 3, so multiply 7 by 3.' },
      { level: 'explicit', text: '7 × 3 = 21.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Ratio Tables',
      skills: ['ratio_tables', 'equivalent_ratios'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['ratio-table', 'equivalent-ratios'],
      commonMistakes: [
        'Using addition instead of multiplication',
        'Wrong scale factor',
        'Calculation errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'ratio-table', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-ratios-024',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Fill in the ratio table. The ratio of cats to dogs at a shelter is 4:5. How many dogs are there if there are 20 cats?',
      latex: '\\begin{array}{|c|c|} \\hline \\text{Cats} & \\text{Dogs} \\\\ \\hline 4 & 5 \\\\ \\hline 8 & 10 \\\\ \\hline 20 & ? \\\\ \\hline \\end{array}'
    },
    answer: {
      type: 'numeric',
      correct: '25',
      acceptable: ['25', '25 dogs']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the scale factor from 4 to 20', latex: '20 \\div 4 = 5' },
        { number: 2, description: 'Apply the same factor to dogs', latex: '5 \\times 5 = 25' },
        { number: 3, description: 'Verify: 20:25 simplifies to 4:5', latex: '20 \\div 5 : 25 \\div 5 = 4:5 \\checkmark' }
      ],
      method: 'Scale factor in ratio table'
    },
    hints: [
      { level: 'gentle', text: 'Find how cats changed from 4 to 20, then apply that to dogs.' },
      { level: 'moderate', text: '20 ÷ 4 = 5, so multiply dogs by 5.' },
      { level: 'explicit', text: '5 × 5 = 25 dogs.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Ratio Tables',
      skills: ['ratio_tables', 'proportional_reasoning'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['ratio-table', 'scaling', 'proportional-relationships'],
      commonMistakes: [
        'Using wrong scale factor',
        'Confusing cats and dogs columns',
        'Multiplication errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'ratio-table', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-ratios-025',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A store sells notebooks in packs. The ratio table shows the relationship between packs and notebooks. Find the missing values.',
      latex: '\\begin{array}{|c|c|} \\hline \\text{Packs} & \\text{Notebooks} \\\\ \\hline 1 & 5 \\\\ \\hline 3 & ? \\\\ \\hline ? & 30 \\\\ \\hline \\end{array}'
    },
    answer: {
      type: 'set',
      correct: '15, 6',
      acceptable: ['15, 6', '15 and 6', '15; 6', '6, 15']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find notebooks for 3 packs', latex: '5 \\times 3 = 15 \\text{ notebooks}' },
        { number: 2, description: 'Find packs for 30 notebooks', latex: '30 \\div 5 = 6 \\text{ packs}' },
        { number: 3, description: 'Verify the pattern', latex: '1:5 = 3:15 = 6:30 \\checkmark' }
      ],
      method: 'Ratio table pattern'
    },
    hints: [
      { level: 'gentle', text: 'Each pack has 5 notebooks. Use multiplication and division.' },
      { level: 'moderate', text: '3 packs = 3 × 5 = ? notebooks. 30 notebooks ÷ 5 = ? packs.' },
      { level: 'explicit', text: '3 packs = 15 notebooks. 30 notebooks = 6 packs.' }
    ],
    pedagogy: {
      topic: 'Ratios and Rates',
      subTopic: 'Ratio Tables',
      skills: ['ratio_tables', 'multiplication', 'division'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['ratio-table', 'proportional-relationships', 'unit-rate'],
      commonMistakes: [
        'Using wrong operations',
        'Confusing rows',
        'Only finding one missing value'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['pre-algebra', 'ratios', 'ratio-table', 'grade-7']
    }
  }
]

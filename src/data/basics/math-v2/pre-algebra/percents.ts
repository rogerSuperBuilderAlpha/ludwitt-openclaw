/**
 * Percents - MathProblemV2 Format
 * 
 * Topics covered:
 * - Percent of a Number (G6)
 * - Percent Increase/Decrease (G7)
 * - Finding the Percent (G6-7)
 * - Finding the Whole (G7)
 * - Discount and Tax (G7-8)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const PERCENTS_V2: MathProblemV2[] = [
  // ============================================================================
  // PERCENT OF A NUMBER (Grade 6) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-percent-100',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'What is 35% of 80?',
      latex: '35\\% \\text{ of } 80 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '28',
      acceptable: ['28', '28.0', '28.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert percent to decimal', latex: '35\\% = 0.35' },
        { number: 2, description: 'Multiply by the number', latex: '0.35 \\times 80 = 28' }
      ],
      method: 'Percent to Decimal Conversion'
    },
    hints: [
      { level: 'gentle', text: 'To find a percent of a number, first convert the percent to a decimal.' },
      { level: 'moderate', text: 'Convert 35% to 0.35, then multiply by 80.' },
      { level: 'explicit', text: '0.35 × 80 = 28' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent of a Number',
      skills: ['percent_calculations', 'decimal_conversion', 'multiplication'],
      prerequisites: ['decimal_operations', 'percent_decimal_conversion'],
      concepts: ['percents', 'percent-of-number'],
      commonMistakes: [
        'Forgetting to convert percent to decimal',
        'Moving decimal point wrong direction',
        'Confusing percent with the decimal form'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-percent-101',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Find 25% of 120.',
      latex: '25\\% \\text{ of } 120 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '30',
      acceptable: ['30', '30.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recognize 25% = 1/4', latex: '25\\% = \\frac{1}{4}' },
        { number: 2, description: 'Divide by 4', latex: '120 \\div 4 = 30' }
      ],
      alternativeMethods: ['Convert to decimal: 0.25 × 120 = 30'],
      method: 'Fraction method'
    },
    hints: [
      { level: 'gentle', text: '25% is the same as one-quarter. What is one-quarter of 120?' },
      { level: 'moderate', text: 'Divide 120 by 4 to find 25%.' },
      { level: 'explicit', text: '120 ÷ 4 = 30' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent of a Number',
      skills: ['percent_calculations', 'fraction_conversion', 'division'],
      prerequisites: ['fractions', 'division'],
      concepts: ['percents', 'benchmark-percents'],
      commonMistakes: [
        'Multiplying instead of dividing',
        'Not recognizing 25% as one-quarter',
        'Division errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-percent-102',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A test has 60 questions. If you answered 75% correctly, how many did you get right?',
    },
    answer: {
      type: 'numeric',
      correct: '45',
      acceptable: ['45', '45 questions']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert percent to decimal', latex: '75\\% = 0.75' },
        { number: 2, description: 'Multiply by total questions', latex: '0.75 \\times 60 = 45' }
      ],
      method: 'Percent to Decimal Conversion'
    },
    hints: [
      { level: 'gentle', text: 'Find 75% of 60 to get the number of correct answers.' },
      { level: 'moderate', text: '75% = 0.75. Multiply 0.75 × 60.' },
      { level: 'explicit', text: '0.75 × 60 = 45 questions' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent of a Number',
      skills: ['percent_calculations', 'word_problems', 'multiplication'],
      prerequisites: ['decimal_operations', 'percent_decimal_conversion'],
      concepts: ['percents', 'percent-of-number', 'real-world-applications'],
      commonMistakes: [
        'Using 75 instead of 0.75',
        'Dividing instead of multiplying',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'word-problem', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-percent-103',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'What is 12.5% of 200?',
      latex: '12.5\\% \\text{ of } 200 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '25',
      acceptable: ['25', '25.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert percent to decimal', latex: '12.5\\% = 0.125' },
        { number: 2, description: 'Multiply by the number', latex: '0.125 \\times 200 = 25' }
      ],
      alternativeMethods: ['12.5% = 1/8, so 200 ÷ 8 = 25'],
      method: 'Percent to Decimal Conversion'
    },
    hints: [
      { level: 'gentle', text: 'Convert 12.5% to a decimal by dividing by 100.' },
      { level: 'moderate', text: '12.5% = 0.125. Now multiply by 200.' },
      { level: 'explicit', text: '0.125 × 200 = 25' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent of a Number',
      skills: ['percent_calculations', 'decimal_conversion', 'multiplication'],
      prerequisites: ['decimal_operations'],
      concepts: ['percents', 'decimal-percents'],
      commonMistakes: [
        'Incorrect decimal placement for 12.5%',
        'Not knowing 12.5% = 0.125',
        'Multiplication errors with decimals'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'decimals', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-percent-104',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Calculate 50% of 86.',
      latex: '50\\% \\text{ of } 86 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '43',
      acceptable: ['43', '43.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recognize 50% = half', latex: '50\\% = \\frac{1}{2}' },
        { number: 2, description: 'Divide by 2', latex: '86 \\div 2 = 43' }
      ],
      method: 'Benchmark percent method'
    },
    hints: [
      { level: 'gentle', text: '50% means half. What is half of 86?' },
      { level: 'moderate', text: 'Divide 86 by 2.' },
      { level: 'explicit', text: '86 ÷ 2 = 43' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent of a Number',
      skills: ['percent_calculations', 'mental_math', 'division'],
      prerequisites: ['division'],
      concepts: ['percents', 'benchmark-percents'],
      commonMistakes: [
        'Not recognizing 50% as half',
        'Division errors',
        'Overthinking the problem'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 30
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'mental-math', 'grade-6']
    }
  },

  // ============================================================================
  // PERCENT INCREASE/DECREASE (Grade 7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g7-percent-105',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A shirt costs $40. After a 20% increase, what is the new price?',
    },
    answer: {
      type: 'numeric',
      correct: '48',
      acceptable: ['48', '$48', '48.00', '$48.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the amount of increase', latex: '20\\% \\times 40 = 0.20 \\times 40 = 8' },
        { number: 2, description: 'Add to original price', latex: '40 + 8 = 48' }
      ],
      alternativeMethods: ['Multiply by 1.20: 40 × 1.20 = 48'],
      method: 'Calculate increase then add'
    },
    hints: [
      { level: 'gentle', text: 'First find 20% of $40, then add it to the original price.' },
      { level: 'moderate', text: '20% of 40 = 8. Add this to 40.' },
      { level: 'explicit', text: '$40 + $8 = $48' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent Increase/Decrease',
      skills: ['percent_increase', 'percent_calculations', 'addition'],
      prerequisites: ['percent_calculations', 'addition'],
      concepts: ['percent-increase', 'markup'],
      commonMistakes: [
        'Forgetting to add the increase to original',
        'Calculating percent of wrong number',
        'Using subtraction instead of addition'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'percent-increase', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-106',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A laptop originally costs $800. It is now on sale for 15% off. What is the sale price?',
    },
    answer: {
      type: 'numeric',
      correct: '680',
      acceptable: ['680', '$680', '680.00', '$680.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the amount of discount', latex: '15\\% \\times 800 = 0.15 \\times 800 = 120' },
        { number: 2, description: 'Subtract from original price', latex: '800 - 120 = 680' }
      ],
      alternativeMethods: ['Multiply by 0.85: 800 × 0.85 = 680'],
      method: 'Calculate discount then subtract'
    },
    hints: [
      { level: 'gentle', text: 'Find 15% of $800 to get the discount amount, then subtract from original.' },
      { level: 'moderate', text: '15% of 800 = 120. Subtract from 800.' },
      { level: 'explicit', text: '$800 - $120 = $680' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent Increase/Decrease',
      skills: ['percent_decrease', 'percent_calculations', 'subtraction'],
      prerequisites: ['percent_calculations', 'subtraction'],
      concepts: ['percent-decrease', 'discount'],
      commonMistakes: [
        'Adding instead of subtracting',
        'Giving the discount amount as the answer',
        'Percent calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'discount', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-107',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'The population of a town increased from 5,000 to 5,750. What was the percent increase?',
    },
    answer: {
      type: 'numeric',
      correct: '15',
      acceptable: ['15', '15%', '15 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the amount of increase', latex: '5750 - 5000 = 750' },
        { number: 2, description: 'Divide by original amount', latex: '\\frac{750}{5000} = 0.15' },
        { number: 3, description: 'Convert to percent', latex: '0.15 \\times 100 = 15\\%' }
      ],
      method: 'Percent change formula'
    },
    hints: [
      { level: 'gentle', text: 'Percent increase = (new - original) ÷ original × 100' },
      { level: 'moderate', text: 'Increase = 5750 - 5000 = 750. Now divide by 5000.' },
      { level: 'explicit', text: '750 ÷ 5000 = 0.15 = 15%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent Increase/Decrease',
      skills: ['percent_change', 'division', 'subtraction'],
      prerequisites: ['division', 'decimal_to_percent'],
      concepts: ['percent-increase', 'percent-change'],
      commonMistakes: [
        'Dividing by new value instead of original',
        'Forgetting to multiply by 100',
        'Finding increase but not converting to percent'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'percent-change', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-108',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A stock dropped from $125 to $100. What was the percent decrease?',
    },
    answer: {
      type: 'numeric',
      correct: '20',
      acceptable: ['20', '20%', '20 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the amount of decrease', latex: '125 - 100 = 25' },
        { number: 2, description: 'Divide by original amount', latex: '\\frac{25}{125} = 0.20' },
        { number: 3, description: 'Convert to percent', latex: '0.20 \\times 100 = 20\\%' }
      ],
      method: 'Percent change formula'
    },
    hints: [
      { level: 'gentle', text: 'Percent decrease = (original - new) ÷ original × 100' },
      { level: 'moderate', text: 'Decrease = 125 - 100 = 25. Divide by 125.' },
      { level: 'explicit', text: '25 ÷ 125 = 0.20 = 20%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent Increase/Decrease',
      skills: ['percent_change', 'division', 'subtraction'],
      prerequisites: ['division', 'decimal_to_percent'],
      concepts: ['percent-decrease', 'percent-change'],
      commonMistakes: [
        'Dividing by new value instead of original',
        'Using wrong order in subtraction',
        'Decimal to percent conversion errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 105
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'percent-decrease', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-109',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'After a 30% decrease, a bike now costs $140. What was the original price?',
    },
    answer: {
      type: 'numeric',
      correct: '200',
      acceptable: ['200', '$200', '200.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'After 30% decrease, the price is 70% of original', latex: '100\\% - 30\\% = 70\\%' },
        { number: 2, description: 'Set up equation', latex: '0.70 \\times \\text{original} = 140' },
        { number: 3, description: 'Solve for original', latex: '\\text{original} = 140 \\div 0.70 = 200' }
      ],
      method: 'Working backwards from percent'
    },
    hints: [
      { level: 'gentle', text: 'If the price decreased by 30%, the new price is 70% of the original.' },
      { level: 'moderate', text: '$140 = 70% of original. Divide 140 by 0.70.' },
      { level: 'explicit', text: '140 ÷ 0.70 = $200' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent Increase/Decrease',
      skills: ['percent_decrease', 'working_backwards', 'division'],
      prerequisites: ['percent_calculations', 'equation_solving'],
      concepts: ['percent-decrease', 'reverse-percent'],
      commonMistakes: [
        'Adding 30% to $140 instead of working backwards',
        'Using 30% instead of 70%',
        'Division errors'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'reverse-percent', 'grade-7']
    }
  },

  // ============================================================================
  // FINDING THE PERCENT (Grade 6-7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g6-percent-110',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'What percent of 60 is 15?',
      latex: '? \\% \\text{ of } 60 = 15'
    },
    answer: {
      type: 'numeric',
      correct: '25',
      acceptable: ['25', '25%', '25 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide part by whole', latex: '\\frac{15}{60} = 0.25' },
        { number: 2, description: 'Convert to percent', latex: '0.25 \\times 100 = 25\\%' }
      ],
      method: 'Part ÷ Whole × 100'
    },
    hints: [
      { level: 'gentle', text: 'To find the percent, divide the part (15) by the whole (60), then multiply by 100.' },
      { level: 'moderate', text: '15 ÷ 60 = 0.25. Convert to percent.' },
      { level: 'explicit', text: '0.25 × 100 = 25%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Percent',
      skills: ['finding_percent', 'division', 'decimal_to_percent'],
      prerequisites: ['division', 'decimal_operations'],
      concepts: ['percents', 'part-whole-percent'],
      commonMistakes: [
        'Dividing in wrong order (60 ÷ 15)',
        'Forgetting to multiply by 100',
        'Giving decimal answer instead of percent'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'finding-percent', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g6-percent-111',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'A student scored 36 out of 45 on a quiz. What percent did they score?',
    },
    answer: {
      type: 'numeric',
      correct: '80',
      acceptable: ['80', '80%', '80 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide score by total', latex: '\\frac{36}{45} = 0.80' },
        { number: 2, description: 'Convert to percent', latex: '0.80 \\times 100 = 80\\%' }
      ],
      method: 'Part ÷ Whole × 100'
    },
    hints: [
      { level: 'gentle', text: 'Divide the points earned by the total points possible.' },
      { level: 'moderate', text: '36 ÷ 45 = 0.80. Convert to percent.' },
      { level: 'explicit', text: '0.80 = 80%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Percent',
      skills: ['finding_percent', 'division', 'word_problems'],
      prerequisites: ['division'],
      concepts: ['percents', 'test-scores'],
      commonMistakes: [
        'Dividing in wrong order',
        'Not converting decimal to percent',
        'Using wrong numbers from problem'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'test-score', 'grade-6']
    }
  },
  {
    id: 'prealg-v2-g7-percent-112',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: '42 is what percent of 168?',
      latex: '42 = ? \\% \\text{ of } 168'
    },
    answer: {
      type: 'numeric',
      correct: '25',
      acceptable: ['25', '25%', '25 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide part by whole', latex: '\\frac{42}{168} = 0.25' },
        { number: 2, description: 'Convert to percent', latex: '0.25 \\times 100 = 25\\%' }
      ],
      method: 'Part ÷ Whole × 100'
    },
    hints: [
      { level: 'gentle', text: 'Divide 42 by 168 to find the decimal, then convert to percent.' },
      { level: 'moderate', text: '42 ÷ 168 = 0.25. What percent is that?' },
      { level: 'explicit', text: '0.25 × 100 = 25%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Percent',
      skills: ['finding_percent', 'division'],
      prerequisites: ['division', 'decimal_to_percent'],
      concepts: ['percents', 'part-whole-percent'],
      commonMistakes: [
        'Dividing in wrong order',
        'Forgetting to multiply by 100',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'finding-percent', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-113',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'In a class of 32 students, 8 are left-handed. What percent of the class is left-handed?',
    },
    answer: {
      type: 'numeric',
      correct: '25',
      acceptable: ['25', '25%', '25 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify part and whole', latex: '\\text{Part} = 8, \\text{Whole} = 32' },
        { number: 2, description: 'Divide part by whole', latex: '\\frac{8}{32} = 0.25' },
        { number: 3, description: 'Convert to percent', latex: '0.25 \\times 100 = 25\\%' }
      ],
      method: 'Part ÷ Whole × 100'
    },
    hints: [
      { level: 'gentle', text: 'Divide the number of left-handed students by the total number of students.' },
      { level: 'moderate', text: '8 ÷ 32 = 0.25. Convert to percent.' },
      { level: 'explicit', text: '0.25 = 25%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Percent',
      skills: ['finding_percent', 'word_problems', 'division'],
      prerequisites: ['division'],
      concepts: ['percents', 'part-whole-percent', 'real-world-applications'],
      commonMistakes: [
        'Using wrong numbers from the problem',
        'Dividing in wrong order',
        'Not converting to percent'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'word-problem', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g6-percent-114',
    version: 2,
    type: 'pre-algebra',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'What percent of 50 is 30?',
      latex: '? \\% \\text{ of } 50 = 30'
    },
    answer: {
      type: 'numeric',
      correct: '60',
      acceptable: ['60', '60%', '60 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide part by whole', latex: '\\frac{30}{50} = 0.60' },
        { number: 2, description: 'Convert to percent', latex: '0.60 \\times 100 = 60\\%' }
      ],
      method: 'Part ÷ Whole × 100'
    },
    hints: [
      { level: 'gentle', text: 'Divide 30 by 50, then multiply by 100.' },
      { level: 'moderate', text: '30 ÷ 50 = 0.60. What is that as a percent?' },
      { level: 'explicit', text: '0.60 = 60%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Percent',
      skills: ['finding_percent', 'division'],
      prerequisites: ['division', 'decimal_to_percent'],
      concepts: ['percents', 'part-whole-percent'],
      commonMistakes: [
        'Dividing in wrong order',
        'Not recognizing 0.6 as 60%',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'finding-percent', 'grade-6']
    }
  },

  // ============================================================================
  // FINDING THE WHOLE (Grade 7) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g7-percent-115',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: '30% of what number is 45?',
      latex: '30\\% \\text{ of } ? = 45'
    },
    answer: {
      type: 'numeric',
      correct: '150',
      acceptable: ['150', '150.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert percent to decimal', latex: '30\\% = 0.30' },
        { number: 2, description: 'Set up equation', latex: '0.30 \\times ? = 45' },
        { number: 3, description: 'Divide to find the whole', latex: '? = 45 \\div 0.30 = 150' }
      ],
      method: 'Part ÷ Percent = Whole'
    },
    hints: [
      { level: 'gentle', text: 'If 30% of a number is 45, divide 45 by 0.30 to find the whole.' },
      { level: 'moderate', text: '30% = 0.30. Divide 45 by 0.30.' },
      { level: 'explicit', text: '45 ÷ 0.30 = 150' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Whole',
      skills: ['finding_whole', 'division', 'percent_equations'],
      prerequisites: ['division', 'percent_to_decimal'],
      concepts: ['percents', 'part-whole-percent'],
      commonMistakes: [
        'Multiplying instead of dividing',
        'Using 30 instead of 0.30',
        'Getting confused about what to divide'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'finding-whole', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-116',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'If 15 represents 25% of a number, what is the number?',
    },
    answer: {
      type: 'numeric',
      correct: '60',
      acceptable: ['60', '60.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recognize 25% = 1/4', latex: '15 = \\frac{1}{4} \\times ?' },
        { number: 2, description: 'Multiply by 4 to find the whole', latex: '? = 15 \\times 4 = 60' }
      ],
      alternativeMethods: ['15 ÷ 0.25 = 60'],
      method: 'Fraction method'
    },
    hints: [
      { level: 'gentle', text: '25% is one-quarter. If 15 is one-quarter, what is the whole?' },
      { level: 'moderate', text: 'Multiply 15 by 4 to find the whole number.' },
      { level: 'explicit', text: '15 × 4 = 60' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Whole',
      skills: ['finding_whole', 'benchmark_percents', 'multiplication'],
      prerequisites: ['fractions', 'multiplication'],
      concepts: ['percents', 'benchmark-percents', 'part-whole'],
      commonMistakes: [
        'Dividing instead of multiplying',
        'Using wrong benchmark',
        'Forgetting what the question asks'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'finding-whole', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-117',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'A tip of $12 represents 15% of the meal cost. What was the cost of the meal?',
    },
    answer: {
      type: 'numeric',
      correct: '80',
      acceptable: ['80', '$80', '80.00', '$80.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up the equation', latex: '15\\% \\times \\text{meal} = 12' },
        { number: 2, description: 'Convert and divide', latex: '\\text{meal} = 12 \\div 0.15 = 80' }
      ],
      method: 'Part ÷ Percent = Whole'
    },
    hints: [
      { level: 'gentle', text: 'If $12 is 15% of the meal, divide 12 by 0.15.' },
      { level: 'moderate', text: '15% = 0.15. Calculate 12 ÷ 0.15.' },
      { level: 'explicit', text: '12 ÷ 0.15 = $80' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Whole',
      skills: ['finding_whole', 'word_problems', 'division'],
      prerequisites: ['division', 'percent_to_decimal'],
      concepts: ['percents', 'tips', 'real-world-applications'],
      commonMistakes: [
        'Calculating 15% of 12',
        'Using wrong operation',
        'Decimal division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 105
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'tips', 'word-problem', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-118',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: '72 is 40% of what number?',
      latex: '72 = 40\\% \\text{ of } ?'
    },
    answer: {
      type: 'numeric',
      correct: '180',
      acceptable: ['180', '180.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert percent to decimal', latex: '40\\% = 0.40' },
        { number: 2, description: 'Divide part by percent', latex: '72 \\div 0.40 = 180' }
      ],
      method: 'Part ÷ Percent = Whole'
    },
    hints: [
      { level: 'gentle', text: 'Divide 72 by the decimal form of 40%.' },
      { level: 'moderate', text: '40% = 0.40. Calculate 72 ÷ 0.40.' },
      { level: 'explicit', text: '72 ÷ 0.40 = 180' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Whole',
      skills: ['finding_whole', 'division'],
      prerequisites: ['division', 'percent_to_decimal'],
      concepts: ['percents', 'part-whole-percent'],
      commonMistakes: [
        'Multiplying instead of dividing',
        'Using 40 instead of 0.40',
        'Decimal division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'finding-whole', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g7-percent-119',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'If 50% of a number is 35, what is the number?',
    },
    answer: {
      type: 'numeric',
      correct: '70',
      acceptable: ['70', '70.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recognize 50% = half', latex: '35 = \\frac{1}{2} \\times ?' },
        { number: 2, description: 'Multiply by 2', latex: '? = 35 \\times 2 = 70' }
      ],
      method: 'Benchmark percent method'
    },
    hints: [
      { level: 'gentle', text: '50% is half. If half of a number is 35, what is the whole?' },
      { level: 'moderate', text: 'Multiply 35 by 2 to find the whole number.' },
      { level: 'explicit', text: '35 × 2 = 70' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding the Whole',
      skills: ['finding_whole', 'benchmark_percents', 'multiplication'],
      prerequisites: ['multiplication'],
      concepts: ['percents', 'benchmark-percents'],
      commonMistakes: [
        'Dividing instead of multiplying',
        'Not recognizing 50% as half',
        'Overthinking the problem'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'finding-whole', 'mental-math', 'grade-7']
    }
  },

  // ============================================================================
  // DISCOUNT AND TAX (Grade 7-8) - 5 problems
  // ============================================================================
  {
    id: 'prealg-v2-g7-percent-120',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'A jacket costs $85. If the sales tax is 8%, what is the total cost including tax?',
    },
    answer: {
      type: 'numeric',
      correct: '91.80',
      acceptable: ['91.80', '$91.80', '91.8', '$91.8']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the tax amount', latex: '8\\% \\times 85 = 0.08 \\times 85 = 6.80' },
        { number: 2, description: 'Add tax to original price', latex: '85 + 6.80 = 91.80' }
      ],
      alternativeMethods: ['Multiply by 1.08: 85 × 1.08 = 91.80'],
      method: 'Calculate tax then add'
    },
    hints: [
      { level: 'gentle', text: 'Find 8% of $85 to get the tax, then add it to the original price.' },
      { level: 'moderate', text: 'Tax = 0.08 × 85 = $6.80. Add to $85.' },
      { level: 'explicit', text: '$85 + $6.80 = $91.80' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Discount and Tax',
      skills: ['sales_tax', 'percent_calculations', 'addition'],
      prerequisites: ['percent_calculations', 'decimal_operations'],
      concepts: ['percents', 'sales-tax', 'real-world-applications'],
      commonMistakes: [
        'Forgetting to add tax to original',
        'Percent calculation errors',
        'Rounding errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 105
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'sales-tax', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g8-percent-121',
    version: 2,
    type: 'pre-algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A TV originally costs $450 and is on sale for 25% off. If there is a 6% sales tax, what is the final price?',
    },
    answer: {
      type: 'numeric',
      correct: '357.75',
      acceptable: ['357.75', '$357.75']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the discount', latex: '25\\% \\times 450 = 112.50' },
        { number: 2, description: 'Find the sale price', latex: '450 - 112.50 = 337.50' },
        { number: 3, description: 'Calculate the tax', latex: '6\\% \\times 337.50 = 20.25' },
        { number: 4, description: 'Add tax to sale price', latex: '337.50 + 20.25 = 357.75' }
      ],
      method: 'Discount first, then tax'
    },
    hints: [
      { level: 'gentle', text: 'First find the discounted price, then calculate tax on that new price.' },
      { level: 'moderate', text: 'Sale price = $450 - $112.50 = $337.50. Now add 6% tax.' },
      { level: 'explicit', text: 'Tax = 0.06 × 337.50 = $20.25. Final = $337.50 + $20.25 = $357.75' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Discount and Tax',
      skills: ['discount', 'sales_tax', 'multi_step_problems'],
      prerequisites: ['percent_calculations', 'order_of_operations'],
      concepts: ['percents', 'discount', 'sales-tax', 'sequential-percent'],
      commonMistakes: [
        'Calculating tax on original price instead of sale price',
        'Adding discount instead of subtracting',
        'Calculation errors with multiple steps'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'discount', 'sales-tax', 'grade-8']
    }
  },
  {
    id: 'prealg-v2-g7-percent-122',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A pair of shoes is marked down from $60 to $48. What is the percent discount?',
    },
    answer: {
      type: 'numeric',
      correct: '20',
      acceptable: ['20', '20%', '20 percent']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the discount amount', latex: '60 - 48 = 12' },
        { number: 2, description: 'Divide by original price', latex: '\\frac{12}{60} = 0.20' },
        { number: 3, description: 'Convert to percent', latex: '0.20 \\times 100 = 20\\%' }
      ],
      method: 'Discount ÷ Original × 100'
    },
    hints: [
      { level: 'gentle', text: 'Find how much was saved, then divide by the original price.' },
      { level: 'moderate', text: 'Savings = $60 - $48 = $12. Calculate 12 ÷ 60.' },
      { level: 'explicit', text: '12 ÷ 60 = 0.20 = 20%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Discount and Tax',
      skills: ['discount', 'percent_change', 'division'],
      prerequisites: ['subtraction', 'division', 'decimal_to_percent'],
      concepts: ['percents', 'discount', 'percent-change'],
      commonMistakes: [
        'Dividing by new price instead of original',
        'Forgetting to convert to percent',
        'Subtracting in wrong order'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 105
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'discount', 'grade-7']
    }
  },
  {
    id: 'prealg-v2-g8-percent-123',
    version: 2,
    type: 'pre-algebra',
    difficulty: 7.5,
    gradeLevel: 8,
    question: {
      text: 'A restaurant bill is $75. You want to leave a 20% tip. How much should you leave in total (bill + tip)?',
    },
    answer: {
      type: 'numeric',
      correct: '90',
      acceptable: ['90', '$90', '90.00', '$90.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the tip', latex: '20\\% \\times 75 = 0.20 \\times 75 = 15' },
        { number: 2, description: 'Add tip to bill', latex: '75 + 15 = 90' }
      ],
      alternativeMethods: ['Multiply by 1.20: 75 × 1.20 = 90'],
      method: 'Calculate tip then add'
    },
    hints: [
      { level: 'gentle', text: 'Find 20% of $75 for the tip, then add it to the bill.' },
      { level: 'moderate', text: 'Tip = 0.20 × 75 = $15. Add to $75.' },
      { level: 'explicit', text: '$75 + $15 = $90' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Discount and Tax',
      skills: ['tipping', 'percent_calculations', 'addition'],
      prerequisites: ['percent_calculations', 'addition'],
      concepts: ['percents', 'tips', 'real-world-applications'],
      commonMistakes: [
        'Giving just the tip as the answer',
        'Using wrong percent',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'tips', 'grade-8']
    }
  },
  {
    id: 'prealg-v2-g8-percent-124',
    version: 2,
    type: 'pre-algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'An item costs $120 after a 20% discount. What was the original price before the discount?',
    },
    answer: {
      type: 'numeric',
      correct: '150',
      acceptable: ['150', '$150', '150.00', '$150.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'After 20% off, the price is 80% of original', latex: '100\\% - 20\\% = 80\\%' },
        { number: 2, description: 'Set up equation', latex: '0.80 \\times \\text{original} = 120' },
        { number: 3, description: 'Solve for original', latex: '\\text{original} = 120 \\div 0.80 = 150' }
      ],
      method: 'Working backwards from discount'
    },
    hints: [
      { level: 'gentle', text: 'If 20% was taken off, $120 represents 80% of the original.' },
      { level: 'moderate', text: 'Divide $120 by 0.80 to find the original price.' },
      { level: 'explicit', text: '120 ÷ 0.80 = $150' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Discount and Tax',
      skills: ['discount', 'working_backwards', 'division'],
      prerequisites: ['percent_calculations', 'equation_solving'],
      concepts: ['percents', 'discount', 'reverse-percent'],
      commonMistakes: [
        'Adding 20% to $120',
        'Using 20% instead of 80%',
        'Division errors'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['pre-algebra', 'percents', 'discount', 'reverse-percent', 'grade-8']
    }
  }
]

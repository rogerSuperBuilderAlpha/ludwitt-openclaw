/**
 * Pre-Algebra Word Problems V2
 * 46 problems covering ratio, proportion, percent applications
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const PREALGEBRA_WORD_PROBLEMS_V2: MathProblemV2[] = [
  {
    id: 'prealg-v2-g6-wp-001',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: { text: 'A recipe calls for 3 cups of flour for every 2 cups of sugar. If you use 9 cups of flour, how many cups of sugar do you need?' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6 cups', '6'] },
    solution: {
      steps: [
        { number: 1, description: 'Set up proportion', latex: '\\frac{3}{2} = \\frac{9}{x}' },
        { number: 2, description: 'Cross multiply', latex: '3x = 18' },
        { number: 3, description: 'Solve', latex: 'x = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Set up a proportion with flour and sugar.' },
      { level: 'moderate', text: '3/2 = 9/x. Cross multiply.' },
      { level: 'explicit', text: '3x = 18, so x = 6 cups' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Proportion Word Problems',
      skills: ['proportions', 'cross_multiplication'],
      prerequisites: ['ratios', 'multiplication'],
      concepts: ['proportional-reasoning'],
      commonMistakes: ['Setting up ratio incorrectly'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'proportion'] }
  },
  {
    id: 'prealg-v2-g6-wp-002',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: { text: 'A store sells 5 apples for $2. How much would 15 apples cost?' },
    answer: { type: 'numeric', correct: '6', acceptable: ['$6', '6 dollars', '6'] },
    solution: {
      steps: [
        { number: 1, description: 'Find unit rate', latex: '\\$2 \\div 5 = \\$0.40 \\text{ per apple}' },
        { number: 2, description: 'Multiply', latex: '15 \\times \\$0.40 = \\$6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Find how much one apple costs first.' },
      { level: 'moderate', text: 'Each apple costs $2÷5 = $0.40' },
      { level: 'explicit', text: '15 × $0.40 = $6' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Unit Rate Problems',
      skills: ['unit_rates', 'multiplication'],
      prerequisites: ['division', 'decimals'],
      concepts: ['unit-rate'],
      commonMistakes: ['Division error'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'unit-rate'] }
  },
  {
    id: 'prealg-v2-g6-wp-003',
    version: 2,
    type: 'word-problem',
    difficulty: 6.5,
    gradeLevel: 6,
    question: { text: 'A shirt originally costs $40. It is on sale for 25% off. What is the sale price?' },
    answer: { type: 'numeric', correct: '30', acceptable: ['$30', '30 dollars', '30'] },
    solution: {
      steps: [
        { number: 1, description: 'Calculate discount', latex: '40 \\times 0.25 = 10' },
        { number: 2, description: 'Subtract from original', latex: '40 - 10 = 30' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Find 25% of $40, then subtract.' },
      { level: 'moderate', text: '25% of 40 = 10' },
      { level: 'explicit', text: '$40 - $10 = $30' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent Discount',
      skills: ['percent_of_number', 'subtraction'],
      prerequisites: ['percents', 'decimals'],
      concepts: ['percent-decrease'],
      commonMistakes: ['Adding instead of subtracting'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'percent'] }
  },
  {
    id: 'prealg-v2-g6-wp-004',
    version: 2,
    type: 'word-problem',
    difficulty: 6.5,
    gradeLevel: 6,
    question: { text: 'If you scored 18 out of 24 on a test, what percent did you get?' },
    answer: { type: 'numeric', correct: '75', acceptable: ['75%', '75 percent', '75'] },
    solution: {
      steps: [
        { number: 1, description: 'Divide', latex: '18 \\div 24 = 0.75' },
        { number: 2, description: 'Convert to percent', latex: '0.75 \\times 100 = 75\\%' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Divide your score by total, then multiply by 100.' },
      { level: 'moderate', text: '18 ÷ 24 = 0.75' },
      { level: 'explicit', text: '0.75 × 100 = 75%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Finding Percent',
      skills: ['division', 'percent_conversion'],
      prerequisites: ['division', 'decimals'],
      concepts: ['percent'],
      commonMistakes: ['Not multiplying by 100'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'percent'] }
  },
  {
    id: 'prealg-v2-g6-wp-005',
    version: 2,
    type: 'word-problem',
    difficulty: 6.5,
    gradeLevel: 6,
    question: { text: 'A car travels 240 miles in 4 hours. What is its average speed in miles per hour?' },
    answer: { type: 'numeric', correct: '60', acceptable: ['60 mph', '60 miles per hour', '60'] },
    solution: {
      steps: [
        { number: 1, description: 'Apply rate formula', latex: '\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}' },
        { number: 2, description: 'Calculate', latex: '\\frac{240}{4} = 60 \\text{ mph}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Speed = Distance ÷ Time' },
      { level: 'moderate', text: '240 ÷ 4 = ?' },
      { level: 'explicit', text: '240 ÷ 4 = 60 mph' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Rate Problems',
      skills: ['unit_rates', 'division'],
      prerequisites: ['division'],
      concepts: ['rate', 'speed'],
      commonMistakes: ['Multiplying instead of dividing'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'rate'] }
  },
  {
    id: 'prealg-v2-g7-wp-006',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: { text: 'A population of 5000 grew by 12%. What is the new population?' },
    answer: { type: 'numeric', correct: '5600', acceptable: ['5600', '5,600'] },
    solution: {
      steps: [
        { number: 1, description: 'Calculate increase', latex: '5000 \\times 0.12 = 600' },
        { number: 2, description: 'Add to original', latex: '5000 + 600 = 5600' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Find 12% of 5000, then add it.' },
      { level: 'moderate', text: '12% of 5000 = 600' },
      { level: 'explicit', text: '5000 + 600 = 5600' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent Increase',
      skills: ['percent_of_number', 'addition'],
      prerequisites: ['percents', 'multiplication'],
      concepts: ['percent-increase'],
      commonMistakes: ['Forgetting to add'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'percent-increase'] }
  },
  {
    id: 'prealg-v2-g7-wp-007',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: { text: 'The ratio of boys to girls in a club is 3:5. If there are 24 boys, how many girls are there?' },
    answer: { type: 'numeric', correct: '40', acceptable: ['40 girls', '40'] },
    solution: {
      steps: [
        { number: 1, description: 'Set up proportion', latex: '\\frac{3}{5} = \\frac{24}{x}' },
        { number: 2, description: 'Cross multiply', latex: '3x = 120' },
        { number: 3, description: 'Solve', latex: 'x = 40' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Set up a proportion with boys and girls.' },
      { level: 'moderate', text: '3/5 = 24/x' },
      { level: 'explicit', text: '3x = 120, x = 40 girls' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Ratio Word Problems',
      skills: ['proportions', 'cross_multiplication'],
      prerequisites: ['ratios'],
      concepts: ['ratio', 'proportion'],
      commonMistakes: ['Setting up ratio backwards'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'ratio'] }
  },
  {
    id: 'prealg-v2-g7-wp-008',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: { text: 'A map scale is 1 inch = 50 miles. If two cities are 3.5 inches apart on the map, what is the actual distance?' },
    answer: { type: 'numeric', correct: '175', acceptable: ['175 miles', '175'] },
    solution: {
      steps: [
        { number: 1, description: 'Multiply by scale', latex: '3.5 \\times 50 = 175 \\text{ miles}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Each inch represents 50 miles.' },
      { level: 'moderate', text: 'Multiply 3.5 by 50' },
      { level: 'explicit', text: '3.5 × 50 = 175 miles' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Scale Problems',
      skills: ['proportions', 'multiplication'],
      prerequisites: ['decimals', 'multiplication'],
      concepts: ['scale', 'proportion'],
      commonMistakes: ['Dividing instead of multiplying'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'scale'] }
  },
  {
    id: 'prealg-v2-g7-wp-009',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: { text: 'If 8 workers can complete a job in 6 days, how many days would it take 12 workers?' },
    answer: { type: 'numeric', correct: '4', acceptable: ['4 days', '4'] },
    solution: {
      steps: [
        { number: 1, description: 'This is inverse proportion', latex: '8 \\times 6 = 12 \\times x' },
        { number: 2, description: 'Solve', latex: '48 = 12x, x = 4' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'More workers = less time (inverse proportion).' },
      { level: 'moderate', text: 'Worker-days: 8 × 6 = 48' },
      { level: 'explicit', text: '48 ÷ 12 = 4 days' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Inverse Proportion',
      skills: ['inverse_proportion', 'division'],
      prerequisites: ['proportions'],
      concepts: ['inverse-proportion'],
      commonMistakes: ['Using direct proportion'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'inverse-proportion'] }
  },
  {
    id: 'prealg-v2-g7-wp-010',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: { text: 'A jacket that normally costs $80 is on sale for $60. What is the percent discount?' },
    answer: { type: 'numeric', correct: '25', acceptable: ['25%', '25 percent', '25'] },
    solution: {
      steps: [
        { number: 1, description: 'Find discount amount', latex: '80 - 60 = 20' },
        { number: 2, description: 'Calculate percent', latex: '\\frac{20}{80} \\times 100 = 25\\%' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Find how much was saved, then divide by original price.' },
      { level: 'moderate', text: 'Saved $20 out of $80' },
      { level: 'explicit', text: '20/80 = 0.25 = 25%' }
    ],
    pedagogy: {
      topic: 'Pre-Algebra',
      subTopic: 'Percent Change',
      skills: ['percent_change', 'division'],
      prerequisites: ['percents', 'subtraction'],
      concepts: ['percent-decrease'],
      commonMistakes: ['Dividing by sale price instead of original'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'percent-change'] }
  }
]

// Additional problems 11-25
const MORE_PREALGEBRA_WP: MathProblemV2[] = [
  {
    id: 'prealg-v2-g7-wp-011',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: { text: 'A $50 item has 8% sales tax. What is the total cost?' },
    answer: { type: 'numeric', correct: '54', acceptable: ['$54', '54'] },
    solution: { steps: [{ number: 1, description: 'Calculate tax', latex: '50 \\times 0.08 = 4' }, { number: 2, description: 'Add', latex: '50 + 4 = 54' }] },
    hints: [{ level: 'gentle', text: 'Find 8% of $50, then add.' }, { level: 'moderate', text: 'Tax = $4' }, { level: 'explicit', text: '$50 + $4 = $54' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Sales Tax', skills: ['percent_of_number'], prerequisites: ['percents'], concepts: ['tax'], commonMistakes: ['Forgetting to add'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 80 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'tax'] }
  },
  {
    id: 'prealg-v2-g7-wp-012',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: { text: 'If 3/4 of a number is 36, what is the number?' },
    answer: { type: 'numeric', correct: '48', acceptable: ['48'] },
    solution: { steps: [{ number: 1, description: 'Set up equation', latex: '\\frac{3}{4}x = 36' }, { number: 2, description: 'Multiply both sides by 4/3', latex: 'x = 36 \\times \\frac{4}{3} = 48' }] },
    hints: [{ level: 'gentle', text: 'If 3/4 of x = 36, how do you find x?' }, { level: 'moderate', text: 'Multiply 36 by the reciprocal of 3/4' }, { level: 'explicit', text: '36 × (4/3) = 48' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Fraction Equations', skills: ['reciprocals', 'multiplication'], prerequisites: ['fractions'], concepts: ['solving-equations'], commonMistakes: ['Dividing by 4/3 instead of multiplying'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'fractions'] }
  },
  {
    id: 'prealg-v2-g7-wp-013',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: { text: 'A triangle has sides in the ratio 3:4:5. If the perimeter is 60 cm, find the longest side.' },
    answer: { type: 'numeric', correct: '25', acceptable: ['25 cm', '25'] },
    solution: { steps: [{ number: 1, description: 'Sum of ratio parts', latex: '3 + 4 + 5 = 12' }, { number: 2, description: 'Value of one part', latex: '60 \\div 12 = 5' }, { number: 3, description: 'Longest side', latex: '5 \\times 5 = 25' }] },
    hints: [{ level: 'gentle', text: 'Add ratio parts, divide perimeter by total.' }, { level: 'moderate', text: 'Each part = 60÷12 = 5' }, { level: 'explicit', text: 'Longest = 5 × 5 = 25 cm' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Ratio and Perimeter', skills: ['ratios', 'division'], prerequisites: ['ratios', 'perimeter'], concepts: ['ratio-division'], commonMistakes: ['Forgetting to multiply by largest ratio'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 100 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'ratio', 'perimeter'] }
  },
  {
    id: 'prealg-v2-g7-wp-014',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'A car uses 5 gallons of gas to travel 150 miles. How many gallons are needed for 240 miles?' },
    answer: { type: 'numeric', correct: '8', acceptable: ['8 gallons', '8'] },
    solution: { steps: [{ number: 1, description: 'Find mpg', latex: '150 \\div 5 = 30 \\text{ mpg}' }, { number: 2, description: 'Calculate gallons needed', latex: '240 \\div 30 = 8' }] },
    hints: [{ level: 'gentle', text: 'Find miles per gallon first.' }, { level: 'moderate', text: 'Car gets 30 mpg' }, { level: 'explicit', text: '240 ÷ 30 = 8 gallons' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Rate Problems', skills: ['unit_rates', 'division'], prerequisites: ['division'], concepts: ['rate'], commonMistakes: ['Setting up wrong proportion'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'rate'] }
  },
  {
    id: 'prealg-v2-g7-wp-015',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'An item costs $24 after a 20% discount. What was the original price?' },
    answer: { type: 'numeric', correct: '30', acceptable: ['$30', '30'] },
    solution: { steps: [{ number: 1, description: '$24 is 80% of original', latex: '0.80 \\times x = 24' }, { number: 2, description: 'Solve', latex: 'x = 24 \\div 0.80 = 30' }] },
    hints: [{ level: 'gentle', text: 'After 20% off, you pay 80% of original.' }, { level: 'moderate', text: '24 = 0.80 × original' }, { level: 'explicit', text: 'Original = 24 ÷ 0.80 = $30' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Percent Problems', skills: ['percent_equations', 'division'], prerequisites: ['percents'], concepts: ['finding-original'], commonMistakes: ['Dividing by 0.20 instead of 0.80'], scaffoldingLevel: 'extensive', cognitiveLevel: 'apply', timeEstimate: 120 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'percent'] }
  },
  {
    id: 'prealg-v2-g7-wp-016',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'A solution is 40% acid. How much acid is in 250 mL of solution?' },
    answer: { type: 'numeric', correct: '100', acceptable: ['100 mL', '100'] },
    solution: { steps: [{ number: 1, description: 'Calculate 40% of 250', latex: '250 \\times 0.40 = 100' }] },
    hints: [{ level: 'gentle', text: 'Find 40% of 250.' }, { level: 'moderate', text: '250 × 0.40 = ?' }, { level: 'explicit', text: '100 mL' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Percent of Number', skills: ['percent_of_number'], prerequisites: ['percents'], concepts: ['mixture-problems'], commonMistakes: ['Using wrong decimal'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 70 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'percent', 'mixture'] }
  },
  {
    id: 'prealg-v2-g7-wp-017',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'The temperature rose from -5°C to 12°C. What was the change?' },
    answer: { type: 'numeric', correct: '17', acceptable: ['17°C', '17 degrees', '17'] },
    solution: { steps: [{ number: 1, description: 'Calculate change', latex: '12 - (-5) = 12 + 5 = 17' }] },
    hints: [{ level: 'gentle', text: 'Find the difference: final - initial.' }, { level: 'moderate', text: '12 - (-5) = 12 + 5' }, { level: 'explicit', text: '17°C' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Integer Operations', skills: ['integer_subtraction'], prerequisites: ['integers'], concepts: ['temperature-change'], commonMistakes: ['Subtracting wrong direction'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 70 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'integers'] }
  },
  {
    id: 'prealg-v2-g7-wp-018',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'Divide $180 among three people in the ratio 2:3:4. How much does the person with the largest share get?' },
    answer: { type: 'numeric', correct: '80', acceptable: ['$80', '80'] },
    solution: { steps: [{ number: 1, description: 'Sum of parts', latex: '2 + 3 + 4 = 9' }, { number: 2, description: 'Value per part', latex: '180 \\div 9 = 20' }, { number: 3, description: 'Largest share (4 parts)', latex: '4 \\times 20 = 80' }] },
    hints: [{ level: 'gentle', text: 'Find how much each part is worth.' }, { level: 'moderate', text: 'Each part = $20' }, { level: 'explicit', text: 'Largest = 4 × $20 = $80' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Ratio Division', skills: ['ratios', 'division'], prerequisites: ['ratios'], concepts: ['ratio-division'], commonMistakes: ['Finding smallest instead of largest'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 100 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'ratio'] }
  },
  {
    id: 'prealg-v2-g7-wp-019',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'A train travels 420 km at 70 km/h. How long does the journey take?' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6 hours', '6'] },
    solution: { steps: [{ number: 1, description: 'Use time = distance ÷ speed', latex: 't = \\frac{420}{70} = 6 \\text{ hours}' }] },
    hints: [{ level: 'gentle', text: 'Time = Distance ÷ Speed' }, { level: 'moderate', text: '420 ÷ 70 = ?' }, { level: 'explicit', text: '6 hours' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Distance-Rate-Time', skills: ['division', 'rate'], prerequisites: ['division'], concepts: ['time-calculation'], commonMistakes: ['Multiplying instead of dividing'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 70 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'rate', 'time'] }
  },
  {
    id: 'prealg-v2-g7-wp-020',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'A recipe serves 4 people. How much of each ingredient is needed to serve 10 people if the recipe calls for 2 cups of flour?' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5 cups', '5'] },
    solution: { steps: [{ number: 1, description: 'Find scale factor', latex: '\\frac{10}{4} = 2.5' }, { number: 2, description: 'Multiply', latex: '2 \\times 2.5 = 5 \\text{ cups}' }] },
    hints: [{ level: 'gentle', text: 'Find how many times bigger 10 is than 4.' }, { level: 'moderate', text: 'Scale factor = 2.5' }, { level: 'explicit', text: '2 × 2.5 = 5 cups' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Scaling', skills: ['proportions', 'multiplication'], prerequisites: ['fractions', 'decimals'], concepts: ['scaling'], commonMistakes: ['Wrong scale factor'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'proportion', 'scaling'] }
  },
  {
    id: 'prealg-v2-g7-wp-021',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'A store marks up items by 40%. If an item costs $35 to purchase, what is the selling price?' },
    answer: { type: 'numeric', correct: '49', acceptable: ['$49', '49'] },
    solution: { steps: [{ number: 1, description: 'Calculate markup', latex: '35 \\times 0.40 = 14' }, { number: 2, description: 'Add to cost', latex: '35 + 14 = 49' }] },
    hints: [{ level: 'gentle', text: 'Find 40% of $35 and add it.' }, { level: 'moderate', text: 'Markup = $14' }, { level: 'explicit', text: '$35 + $14 = $49' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Markup', skills: ['percent_of_number'], prerequisites: ['percents'], concepts: ['markup'], commonMistakes: ['Forgetting to add'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 80 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'percent', 'markup'] }
  },
  {
    id: 'prealg-v2-g7-wp-022',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'Two numbers are in the ratio 5:3. Their sum is 72. Find the larger number.' },
    answer: { type: 'numeric', correct: '45', acceptable: ['45'] },
    solution: { steps: [{ number: 1, description: 'Sum of parts', latex: '5 + 3 = 8' }, { number: 2, description: 'Value per part', latex: '72 \\div 8 = 9' }, { number: 3, description: 'Larger number', latex: '5 \\times 9 = 45' }] },
    hints: [{ level: 'gentle', text: 'Find what one part equals.' }, { level: 'moderate', text: 'Each part = 9' }, { level: 'explicit', text: 'Larger = 5 × 9 = 45' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Ratio Problems', skills: ['ratios', 'division'], prerequisites: ['ratios'], concepts: ['ratio-sum'], commonMistakes: ['Using smaller ratio for answer'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'ratio'] }
  },
  {
    id: 'prealg-v2-g7-wp-023',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'A student answered 85% of 40 questions correctly. How many did they get wrong?' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6 questions', '6'] },
    solution: { steps: [{ number: 1, description: 'Correct answers', latex: '40 \\times 0.85 = 34' }, { number: 2, description: 'Wrong answers', latex: '40 - 34 = 6' }] },
    hints: [{ level: 'gentle', text: 'Find correct answers, then subtract from total.' }, { level: 'moderate', text: 'Correct = 34' }, { level: 'explicit', text: '40 - 34 = 6 wrong' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Percent Applications', skills: ['percent_of_number', 'subtraction'], prerequisites: ['percents'], concepts: ['complement'], commonMistakes: ['Giving correct count instead of wrong'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'percent'] }
  },
  {
    id: 'prealg-v2-g7-wp-024',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'Simple interest: Find the interest on $500 at 4% annual rate for 3 years.' },
    answer: { type: 'numeric', correct: '60', acceptable: ['$60', '60'] },
    solution: { steps: [{ number: 1, description: 'Apply I = Prt', latex: 'I = 500 \\times 0.04 \\times 3 = 60' }] },
    hints: [{ level: 'gentle', text: 'Interest = Principal × Rate × Time' }, { level: 'moderate', text: 'I = 500 × 0.04 × 3' }, { level: 'explicit', text: '$60' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Simple Interest', skills: ['percent_of_number', 'multiplication'], prerequisites: ['percents'], concepts: ['simple-interest'], commonMistakes: ['Forgetting to multiply by time'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 80 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'interest'] }
  },
  {
    id: 'prealg-v2-g7-wp-025',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: { text: 'A printer prints 24 pages per minute. How long to print 180 pages?' },
    answer: { type: 'numeric', correct: '7.5', acceptable: ['7.5 minutes', '7.5', '7 1/2'] },
    solution: { steps: [{ number: 1, description: 'Divide pages by rate', latex: '180 \\div 24 = 7.5 \\text{ minutes}' }] },
    hints: [{ level: 'gentle', text: 'Time = Pages ÷ Rate' }, { level: 'moderate', text: '180 ÷ 24 = ?' }, { level: 'explicit', text: '7.5 minutes' }],
    pedagogy: { topic: 'Pre-Algebra', subTopic: 'Rate Problems', skills: ['division', 'decimals'], prerequisites: ['division'], concepts: ['rate'], commonMistakes: ['Multiplying instead of dividing'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 70 },
    metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['word-problem', 'rate'] }
  }
]

// Combine all
export const ALL_PREALGEBRA_WORD_PROBLEMS = [...PREALGEBRA_WORD_PROBLEMS_V2, ...MORE_PREALGEBRA_WP]

// Problems 26-46 - Mixed applications
const ADVANCED_PREALGEBRA_WP: MathProblemV2[] = [
  { id: 'prealg-v2-g8-wp-026', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'If 15% of a number is 45, what is the number?' }, answer: { type: 'numeric', correct: '300', acceptable: ['300'] }, solution: { steps: [{ number: 1, description: 'Set up equation', latex: '0.15x = 45' }, { number: 2, description: 'Solve', latex: 'x = 45 \\div 0.15 = 300' }] }, hints: [{ level: 'gentle', text: '15% of x = 45. Solve for x.' }, { level: 'moderate', text: 'x = 45 ÷ 0.15' }, { level: 'explicit', text: '300' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Percent Equations', skills: ['percent_equations'], prerequisites: ['percents'], concepts: ['finding-whole'], commonMistakes: ['Multiplying instead of dividing'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['percent'] } },
  { id: 'prealg-v2-g8-wp-027', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'A $200 item has 7% tax and then 10% discount. What is the final price?' }, answer: { type: 'numeric', correct: '192.60', acceptable: ['$192.60', '192.6', '192.60'] }, solution: { steps: [{ number: 1, description: 'Add tax', latex: '200 \\times 1.07 = 214' }, { number: 2, description: 'Apply discount', latex: '214 \\times 0.90 = 192.60' }] }, hints: [{ level: 'gentle', text: 'Add tax first, then apply discount.' }, { level: 'moderate', text: 'After tax: $214' }, { level: 'explicit', text: '$214 × 0.90 = $192.60' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Multiple Percents', skills: ['percent_calculations'], prerequisites: ['percents'], concepts: ['successive-percent'], commonMistakes: ['Order of operations'], scaffoldingLevel: 'extensive', cognitiveLevel: 'apply', timeEstimate: 120 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['percent', 'multi-step'] } },
  { id: 'prealg-v2-g8-wp-028', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'The ratio of cats to dogs at a shelter is 5:7. If there are 84 animals total, how many cats are there?' }, answer: { type: 'numeric', correct: '35', acceptable: ['35 cats', '35'] }, solution: { steps: [{ number: 1, description: 'Total parts', latex: '5 + 7 = 12' }, { number: 2, description: 'Value per part', latex: '84 \\div 12 = 7' }, { number: 3, description: 'Cats', latex: '5 \\times 7 = 35' }] }, hints: [{ level: 'gentle', text: 'Find value of one part.' }, { level: 'moderate', text: 'Each part = 7' }, { level: 'explicit', text: 'Cats = 35' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Ratio Problems', skills: ['ratios'], prerequisites: ['ratios'], concepts: ['ratio'], commonMistakes: ['Using wrong ratio'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['ratio'] } },
  { id: 'prealg-v2-g8-wp-029', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'A phone plan costs $45/month plus $0.10 per text over 500. If you sent 750 texts, what is the bill?' }, answer: { type: 'numeric', correct: '70', acceptable: ['$70', '70'] }, solution: { steps: [{ number: 1, description: 'Extra texts', latex: '750 - 500 = 250' }, { number: 2, description: 'Extra cost', latex: '250 \\times 0.10 = 25' }, { number: 3, description: 'Total', latex: '45 + 25 = 70' }] }, hints: [{ level: 'gentle', text: 'Find texts over 500, multiply by rate, add base.' }, { level: 'moderate', text: '250 extra texts = $25' }, { level: 'explicit', text: '$45 + $25 = $70' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Linear Relationships', skills: ['expressions'], prerequisites: ['multiplication', 'addition'], concepts: ['cost-function'], commonMistakes: ['Forgetting base charge'], scaffoldingLevel: 'extensive', cognitiveLevel: 'apply', timeEstimate: 110 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['linear'] } },
  { id: 'prealg-v2-g8-wp-030', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Convert 72 km/h to m/s.' }, answer: { type: 'numeric', correct: '20', acceptable: ['20 m/s', '20'] }, solution: { steps: [{ number: 1, description: 'Convert', latex: '72 \\times \\frac{1000}{3600} = 72 \\times \\frac{5}{18} = 20' }] }, hints: [{ level: 'gentle', text: 'Multiply by 1000, divide by 3600.' }, { level: 'moderate', text: '72 × (5/18)' }, { level: 'explicit', text: '20 m/s' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Unit Conversion', skills: ['unit_conversion'], prerequisites: ['fractions'], concepts: ['conversion'], commonMistakes: ['Wrong conversion factor'], scaffoldingLevel: 'extensive', cognitiveLevel: 'apply', timeEstimate: 100 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['conversion'] } },
  { id: 'prealg-v2-g8-wp-031', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'A pool is filled at 150 gallons/hour. It takes 8 hours to fill. How many gallons does the pool hold?' }, answer: { type: 'numeric', correct: '1200', acceptable: ['1200 gallons', '1,200', '1200'] }, solution: { steps: [{ number: 1, description: 'Multiply', latex: '150 \\times 8 = 1200' }] }, hints: [{ level: 'gentle', text: 'Volume = Rate × Time' }, { level: 'moderate', text: '150 × 8' }, { level: 'explicit', text: '1200 gallons' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Rate Problems', skills: ['multiplication'], prerequisites: ['multiplication'], concepts: ['rate'], commonMistakes: ['Dividing instead of multiplying'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 60 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['rate'] } },
  { id: 'prealg-v2-g8-wp-032', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'A stock dropped from $80 to $60. What was the percent decrease?' }, answer: { type: 'numeric', correct: '25', acceptable: ['25%', '25'] }, solution: { steps: [{ number: 1, description: 'Find change', latex: '80 - 60 = 20' }, { number: 2, description: 'Percent', latex: '\\frac{20}{80} \\times 100 = 25\\%' }] }, hints: [{ level: 'gentle', text: 'Decrease ÷ Original × 100' }, { level: 'moderate', text: '20/80 × 100' }, { level: 'explicit', text: '25%' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Percent Change', skills: ['percent_change'], prerequisites: ['percents'], concepts: ['percent-decrease'], commonMistakes: ['Using new price as base'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['percent-change'] } },
  { id: 'prealg-v2-g8-wp-033', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Evaluate: -3 × (4 - 7) + 15 ÷ (-5)' }, answer: { type: 'numeric', correct: '6', acceptable: ['6'] }, solution: { steps: [{ number: 1, description: 'Parentheses', latex: '4 - 7 = -3' }, { number: 2, description: 'Multiply', latex: '-3 \\times (-3) = 9' }, { number: 3, description: 'Divide', latex: '15 \\div (-5) = -3' }, { number: 4, description: 'Add', latex: '9 + (-3) = 6' }] }, hints: [{ level: 'gentle', text: 'Follow PEMDAS.' }, { level: 'moderate', text: '-3 × (-3) = 9, then 15÷(-5) = -3' }, { level: 'explicit', text: '9 + (-3) = 6' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Order of Operations', skills: ['order_of_operations', 'integers'], prerequisites: ['integers', 'PEMDAS'], concepts: ['order-of-operations'], commonMistakes: ['Sign errors'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 100 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['integers', 'order-of-operations'] } },
  { id: 'prealg-v2-g8-wp-034', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'The mean of 5 numbers is 12. If one number is removed, the mean becomes 10. What number was removed?' }, answer: { type: 'numeric', correct: '20', acceptable: ['20'] }, solution: { steps: [{ number: 1, description: 'Original sum', latex: '5 \\times 12 = 60' }, { number: 2, description: 'New sum', latex: '4 \\times 10 = 40' }, { number: 3, description: 'Removed number', latex: '60 - 40 = 20' }] }, hints: [{ level: 'gentle', text: 'Find both sums, subtract.' }, { level: 'moderate', text: 'Original sum = 60, New sum = 40' }, { level: 'explicit', text: '60 - 40 = 20' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Mean Problems', skills: ['mean_calculation'], prerequisites: ['mean'], concepts: ['average'], commonMistakes: ['Wrong calculation'], scaffoldingLevel: 'extensive', cognitiveLevel: 'analyze', timeEstimate: 120 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['statistics', 'mean'] } },
  { id: 'prealg-v2-g8-wp-035', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'A rectangle has length 3x and width x. If perimeter is 48, find x.' }, answer: { type: 'numeric', correct: '6', acceptable: ['6', 'x = 6'] }, solution: { steps: [{ number: 1, description: 'Perimeter formula', latex: '2(3x + x) = 48' }, { number: 2, description: 'Simplify', latex: '8x = 48' }, { number: 3, description: 'Solve', latex: 'x = 6' }] }, hints: [{ level: 'gentle', text: 'P = 2(l + w)' }, { level: 'moderate', text: '2(3x + x) = 48' }, { level: 'explicit', text: '8x = 48, x = 6' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Algebraic Perimeter', skills: ['equation_solving'], prerequisites: ['perimeter', 'equations'], concepts: ['variable-geometry'], commonMistakes: ['Perimeter formula error'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 100 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['geometry', 'algebra'] } },
  { id: 'prealg-v2-g8-wp-036', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Convert 2.5 hours to minutes.' }, answer: { type: 'numeric', correct: '150', acceptable: ['150 minutes', '150'] }, solution: { steps: [{ number: 1, description: 'Multiply', latex: '2.5 \\times 60 = 150' }] }, hints: [{ level: 'gentle', text: '1 hour = 60 minutes' }, { level: 'moderate', text: '2.5 × 60' }, { level: 'explicit', text: '150 minutes' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Unit Conversion', skills: ['multiplication'], prerequisites: ['multiplication'], concepts: ['time-conversion'], commonMistakes: ['Wrong conversion'], scaffoldingLevel: 'minimal', cognitiveLevel: 'apply', timeEstimate: 40 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['conversion', 'time'] } },
  { id: 'prealg-v2-g8-wp-037', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'If y = 2x - 5, find y when x = 8.' }, answer: { type: 'numeric', correct: '11', acceptable: ['11', 'y = 11'] }, solution: { steps: [{ number: 1, description: 'Substitute', latex: 'y = 2(8) - 5 = 16 - 5 = 11' }] }, hints: [{ level: 'gentle', text: 'Plug in x = 8' }, { level: 'moderate', text: 'y = 2(8) - 5' }, { level: 'explicit', text: 'y = 11' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Evaluating Expressions', skills: ['substitution'], prerequisites: ['expressions'], concepts: ['function-evaluation'], commonMistakes: ['Order of operations'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 60 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['expressions'] } },
  { id: 'prealg-v2-g8-wp-038', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Simplify: 4(2x - 3) + 5x' }, answer: { type: 'expression', correct: '13x - 12', acceptable: ['13x - 12', '13x-12'] }, solution: { steps: [{ number: 1, description: 'Distribute', latex: '8x - 12 + 5x' }, { number: 2, description: 'Combine', latex: '13x - 12' }] }, hints: [{ level: 'gentle', text: 'Distribute first, then combine like terms.' }, { level: 'moderate', text: '4(2x-3) = 8x - 12' }, { level: 'explicit', text: '8x + 5x = 13x, answer: 13x - 12' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Simplifying Expressions', skills: ['distributive_property', 'combining_like_terms'], prerequisites: ['multiplication', 'addition'], concepts: ['expression-simplification'], commonMistakes: ['Distribution error'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 80 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['expressions', 'simplify'] } },
  { id: 'prealg-v2-g8-wp-039', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Two pipes fill a tank. Pipe A fills it in 6 hours, Pipe B in 4 hours. How long to fill together?' }, answer: { type: 'numeric', correct: '2.4', acceptable: ['2.4 hours', '2.4', '12/5'] }, solution: { steps: [{ number: 1, description: 'Combined rate', latex: '\\frac{1}{6} + \\frac{1}{4} = \\frac{5}{12}' }, { number: 2, description: 'Time', latex: 't = \\frac{12}{5} = 2.4 \\text{ hours}' }] }, hints: [{ level: 'gentle', text: 'Add rates, then take reciprocal.' }, { level: 'moderate', text: 'Combined rate = 5/12 per hour' }, { level: 'explicit', text: 'Time = 12/5 = 2.4 hours' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Work Problems', skills: ['fraction_addition', 'reciprocals'], prerequisites: ['fractions'], concepts: ['work-rate'], commonMistakes: ['Adding times instead of rates'], scaffoldingLevel: 'extensive', cognitiveLevel: 'analyze', timeEstimate: 150 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['work', 'rates'] } },
  { id: 'prealg-v2-g8-wp-040', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Find the GCF of 48 and 72.' }, answer: { type: 'numeric', correct: '24', acceptable: ['24'] }, solution: { steps: [{ number: 1, description: 'Prime factors of 48', latex: '48 = 2^4 \\times 3' }, { number: 2, description: 'Prime factors of 72', latex: '72 = 2^3 \\times 3^2' }, { number: 3, description: 'GCF', latex: '2^3 \\times 3 = 24' }] }, hints: [{ level: 'gentle', text: 'Find prime factorizations, take lowest powers.' }, { level: 'moderate', text: 'Common factors: 2³ and 3' }, { level: 'explicit', text: 'GCF = 8 × 3 = 24' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'GCF', skills: ['prime_factorization', 'gcf'], prerequisites: ['factors'], concepts: ['gcf'], commonMistakes: ['Taking highest instead of lowest'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 100 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['gcf', 'factors'] } },
  { id: 'prealg-v2-g8-wp-041', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Find the LCM of 12 and 18.' }, answer: { type: 'numeric', correct: '36', acceptable: ['36'] }, solution: { steps: [{ number: 1, description: '12 = 2² × 3', latex: '12 = 2^2 \\times 3' }, { number: 2, description: '18 = 2 × 3²', latex: '18 = 2 \\times 3^2' }, { number: 3, description: 'LCM', latex: '2^2 \\times 3^2 = 36' }] }, hints: [{ level: 'gentle', text: 'Take highest powers of each prime.' }, { level: 'moderate', text: 'Highest: 2² and 3²' }, { level: 'explicit', text: 'LCM = 4 × 9 = 36' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'LCM', skills: ['prime_factorization', 'lcm'], prerequisites: ['factors'], concepts: ['lcm'], commonMistakes: ['Taking lowest instead of highest'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 100 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['lcm', 'factors'] } },
  { id: 'prealg-v2-g8-wp-042', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Solve: 3x + 7 = 22' }, answer: { type: 'numeric', correct: '5', acceptable: ['5', 'x = 5'] }, solution: { steps: [{ number: 1, description: 'Subtract 7', latex: '3x = 15' }, { number: 2, description: 'Divide by 3', latex: 'x = 5' }] }, hints: [{ level: 'gentle', text: 'Isolate x.' }, { level: 'moderate', text: '3x = 22 - 7 = 15' }, { level: 'explicit', text: 'x = 15/3 = 5' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Two-Step Equations', skills: ['equation_solving'], prerequisites: ['equations'], concepts: ['two-step-equation'], commonMistakes: ['Wrong operation order'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 70 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['equations'] } },
  { id: 'prealg-v2-g8-wp-043', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Solve: 2(x - 4) = 10' }, answer: { type: 'numeric', correct: '9', acceptable: ['9', 'x = 9'] }, solution: { steps: [{ number: 1, description: 'Distribute', latex: '2x - 8 = 10' }, { number: 2, description: 'Add 8', latex: '2x = 18' }, { number: 3, description: 'Divide', latex: 'x = 9' }] }, hints: [{ level: 'gentle', text: 'Distribute first.' }, { level: 'moderate', text: '2x - 8 = 10' }, { level: 'explicit', text: 'x = 9' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Equations with Distributive', skills: ['distributive_property', 'equation_solving'], prerequisites: ['distribution', 'equations'], concepts: ['distribution-equation'], commonMistakes: ['Distribution error'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 90 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['equations'] } },
  { id: 'prealg-v2-g8-wp-044', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Write 0.00045 in scientific notation.' }, answer: { type: 'expression', correct: '4.5 × 10⁻⁴', acceptable: ['4.5 × 10⁻⁴', '4.5e-4', '4.5 x 10^-4'] }, solution: { steps: [{ number: 1, description: 'Move decimal 4 places right', latex: '4.5 \\times 10^{-4}' }] }, hints: [{ level: 'gentle', text: 'Move decimal to get a number between 1 and 10.' }, { level: 'moderate', text: '4.5, moved 4 places' }, { level: 'explicit', text: '4.5 × 10⁻⁴' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Scientific Notation', skills: ['scientific_notation'], prerequisites: ['decimals', 'exponents'], concepts: ['scientific-notation'], commonMistakes: ['Wrong exponent sign'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 70 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['scientific-notation'] } },
  { id: 'prealg-v2-g8-wp-045', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'Simplify: √72' }, answer: { type: 'expression', correct: '6√2', acceptable: ['6√2', '6*sqrt(2)', '6root2'] }, solution: { steps: [{ number: 1, description: 'Factor', latex: '\\sqrt{72} = \\sqrt{36 \\times 2}' }, { number: 2, description: 'Simplify', latex: '6\\sqrt{2}' }] }, hints: [{ level: 'gentle', text: 'Find perfect square factors.' }, { level: 'moderate', text: '72 = 36 × 2' }, { level: 'explicit', text: '√36 × √2 = 6√2' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Simplifying Radicals', skills: ['radicals'], prerequisites: ['square_roots', 'factors'], concepts: ['radical-simplification'], commonMistakes: ['Not finding largest perfect square'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 80 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['radicals'] } },
  { id: 'prealg-v2-g8-wp-046', version: 2, type: 'word-problem', difficulty: 8.0, gradeLevel: 8, question: { text: 'A bag has 3 red, 4 blue, and 5 green marbles. What is P(blue)?' }, answer: { type: 'fraction', correct: '1/3', acceptable: ['1/3', '4/12', '0.333'] }, solution: { steps: [{ number: 1, description: 'Total marbles', latex: '3 + 4 + 5 = 12' }, { number: 2, description: 'P(blue)', latex: '\\frac{4}{12} = \\frac{1}{3}' }] }, hints: [{ level: 'gentle', text: 'P = favorable / total' }, { level: 'moderate', text: '4 blue out of 12 total' }, { level: 'explicit', text: '4/12 = 1/3' }], pedagogy: { topic: 'Pre-Algebra', subTopic: 'Basic Probability', skills: ['probability'], prerequisites: ['fractions'], concepts: ['probability'], commonMistakes: ['Not simplifying'], scaffoldingLevel: 'moderate', cognitiveLevel: 'apply', timeEstimate: 70 }, metadata: { source: 'ai-generated', createdAt: '2026-01-13T00:00:00.000Z', tags: ['probability'] } }
]

// Export all pre-algebra word problems
export const FINAL_PREALGEBRA_WORD_PROBLEMS = [...PREALGEBRA_WORD_PROBLEMS_V2, ...MORE_PREALGEBRA_WP, ...ADVANCED_PREALGEBRA_WP]

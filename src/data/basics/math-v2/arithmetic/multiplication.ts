/**
 * Multiplication Problems V2 - Grade 3-5
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const MULTIPLICATION_PROBLEMS_V2: MathProblemV2[] = [
  // ===== GRADE 3 =====
  {
    id: 'arith-v2-g3-mul-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 6 × 7?', latex: '6 \\times 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '42', acceptable: ['42.0', '42.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think of 6 groups of 7', latex: '6 \\times 7' },
        { number: 2, description: 'Count by 7s six times: 7, 14, 21, 28, 35, 42', latex: '7 \\rightarrow 14 \\rightarrow 21 \\rightarrow 28 \\rightarrow 35 \\rightarrow 42' },
        { number: 3, description: 'The answer is 42', latex: '6 \\times 7 = 42' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think of 6 groups of 7' },
      { level: 'moderate', text: 'Count by 7s: 7, 14, 21, 28, 35, 42' },
      { level: 'explicit', text: '6 × 7 = 42' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['repeated-addition', 'times-tables'],
      commonMistakes: ['Times table error', 'Counting skip error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 9 × 4?', latex: '9 \\times 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '36', acceptable: ['36.0', '36.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Use the 9s trick: 10 × 4 = 40', latex: '10 \\times 4 = 40' },
        { number: 2, description: 'Subtract one group of 4', latex: '40 - 4 = 36' },
        { number: 3, description: 'The answer is 36', latex: '9 \\times 4 = 36' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think: 10 × 4, then subtract 4' },
      { level: 'moderate', text: '10 × 4 = 40, then 40 − 4 = 36' },
      { level: 'explicit', text: '9 × 4 = 36' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables - 9s',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['distributive-property', 'mental-math'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 8 × 5?', latex: '8 \\times 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '40', acceptable: ['40.0', '40.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Count by 5s eight times', latex: '5, 10, 15, 20, 25, 30, 35, 40' },
        { number: 2, description: 'Or think: 8 × 5 = half of 8 × 10', latex: '8 \\times 10 = 80, \\quad 80 \\div 2 = 40' },
        { number: 3, description: 'The answer is 40', latex: '8 \\times 5 = 40' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Count by 5s eight times' },
      { level: 'moderate', text: '5, 10, 15, 20, 25, 30, 35, 40' },
      { level: 'explicit', text: '8 × 5 = 40' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables - 5s',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['skip-counting', 'times-tables'],
      commonMistakes: ['Skip counting error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 4 × 8?', latex: '4 \\times 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '32', acceptable: ['32.0', '32.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Use doubling: 2 × 8 = 16', latex: '2 \\times 8 = 16' },
        { number: 2, description: 'Double again: 16 × 2 = 32', latex: '16 \\times 2 = 32' },
        { number: 3, description: 'The answer is 32', latex: '4 \\times 8 = 32' }
      ]
    },
    hints: [
      { level: 'gentle', text: '4 is 2 × 2, so double 8 twice' },
      { level: 'moderate', text: '2 × 8 = 16, then double: 32' },
      { level: 'explicit', text: '4 × 8 = 32' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables - 4s',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['doubling', 'times-tables'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 7 × 3?', latex: '7 \\times 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '21', acceptable: ['21.0', '21.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 3 groups of 7', latex: '3 \\times 7' },
        { number: 2, description: 'Count by 7s: 7, 14, 21', latex: '7 \\rightarrow 14 \\rightarrow 21' },
        { number: 3, description: 'The answer is 21', latex: '7 \\times 3 = 21' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Count by 7s three times' },
      { level: 'moderate', text: '7, 14, 21' },
      { level: 'explicit', text: '7 × 3 = 21' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables - 7s',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['skip-counting', 'times-tables'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 8 × 6?', latex: '8 \\times 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '48', acceptable: ['48.0', '48.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 6 into 5 + 1', latex: '8 \\times 6 = 8 \\times (5 + 1)' },
        { number: 2, description: '8 × 5 = 40, 8 × 1 = 8', latex: '8 \\times 5 = 40, \\quad 8 \\times 1 = 8' },
        { number: 3, description: 'Add: 40 + 8 = 48', latex: '40 + 8 = 48' }
      ]
    },
    hints: [
      { level: 'gentle', text: '8 × 5 + 8 × 1' },
      { level: 'moderate', text: '40 + 8 = 48' },
      { level: 'explicit', text: '8 × 6 = 48' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['distributive-property', 'times-tables'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 9 × 5?', latex: '9 \\times 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '45', acceptable: ['45.0', '45.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Use the 9s trick: 10 × 5 = 50', latex: '10 \\times 5 = 50' },
        { number: 2, description: 'Subtract 5', latex: '50 - 5 = 45' },
        { number: 3, description: 'The answer is 45', latex: '9 \\times 5 = 45' }
      ]
    },
    hints: [
      { level: 'gentle', text: '10 × 5 minus 5' },
      { level: 'moderate', text: '50 − 5 = 45' },
      { level: 'explicit', text: '9 × 5 = 45' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables - 9s',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['mental-math', 'distributive-property'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 5 × 9?', latex: '5 \\times 9 = \\text{?}' },
    answer: { type: 'numeric', correct: '45', acceptable: ['45.0', '45.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Count by 9s five times', latex: '9, 18, 27, 36, 45' },
        { number: 2, description: 'Or: 5 × 10 − 5 = 45', latex: '50 - 5 = 45' },
        { number: 3, description: 'The answer is 45', latex: '5 \\times 9 = 45' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Count by 9s five times' },
      { level: 'moderate', text: '9, 18, 27, 36, 45' },
      { level: 'explicit', text: '5 × 9 = 45' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['skip-counting', 'times-tables'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-009',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 12 × 3?', latex: '12 \\times 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '36', acceptable: ['36.0', '36.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 12 into 10 + 2', latex: '12 = 10 + 2' },
        { number: 2, description: '10 × 3 = 30, 2 × 3 = 6', latex: '10 \\times 3 = 30, \\quad 2 \\times 3 = 6' },
        { number: 3, description: 'Add: 30 + 6 = 36', latex: '30 + 6 = 36' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Break 12 into 10 + 2' },
      { level: 'moderate', text: '10 × 3 + 2 × 3 = 30 + 6' },
      { level: 'explicit', text: '12 × 3 = 36' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables - 12s',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['distributive-property'],
      commonMistakes: ['Partial product error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-010',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 7 × 7?', latex: '7 \\times 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '49', acceptable: ['49.0', '49.00'] },
    solution: {
      steps: [
        { number: 1, description: 'This is 7 squared', latex: '7^2' },
        { number: 2, description: '7 × 7 = 49', latex: '7 \\times 7 = 49' },
        { number: 3, description: 'The answer is 49', latex: '7 \\times 7 = 49' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is a perfect square: 7 squared' },
      { level: 'moderate', text: 'Memorize this: 7 × 7 = 49' },
      { level: 'explicit', text: '7 × 7 = 49' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Square numbers',
      skills: ['multiplication', 'square-numbers'],
      prerequisites: ['addition'],
      concepts: ['square-numbers', 'times-tables'],
      commonMistakes: ['Confusing with 6 × 8'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-011',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 6 × 6?', latex: '6 \\times 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '36', acceptable: ['36.0', '36.00'] },
    solution: {
      steps: [
        { number: 1, description: 'This is 6 squared', latex: '6^2' },
        { number: 2, description: '6 × 6 = 36', latex: '6 \\times 6 = 36' },
        { number: 3, description: 'The answer is 36', latex: '6 \\times 6 = 36' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is a perfect square' },
      { level: 'moderate', text: '6 squared equals 36' },
      { level: 'explicit', text: '6 × 6 = 36' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Square numbers',
      skills: ['multiplication', 'square-numbers'],
      prerequisites: ['addition'],
      concepts: ['square-numbers'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 45
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-012',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 9 × 9?', latex: '9 \\times 9 = \\text{?}' },
    answer: { type: 'numeric', correct: '81', acceptable: ['81.0', '81.00'] },
    solution: {
      steps: [
        { number: 1, description: 'This is 9 squared', latex: '9^2' },
        { number: 2, description: '9 × 9 = 81', latex: '9 \\times 9 = 81' },
        { number: 3, description: 'The answer is 81', latex: '9 \\times 9 = 81' }
      ]
    },
    hints: [
      { level: 'gentle', text: '9 squared is a key fact to memorize' },
      { level: 'moderate', text: 'Use: 10 × 9 − 9 = 90 − 9 = 81' },
      { level: 'explicit', text: '9 × 9 = 81' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Square numbers',
      skills: ['multiplication', 'square-numbers'],
      prerequisites: ['addition'],
      concepts: ['square-numbers'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 45
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-013',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 11 × 4?', latex: '11 \\times 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '44', acceptable: ['44.0', '44.00'] },
    solution: {
      steps: [
        { number: 1, description: 'For 11 × single digit, the digit repeats', latex: '11 \\times 4' },
        { number: 2, description: '11 × 4 = 44', latex: '11 \\times 4 = 44' },
        { number: 3, description: 'The answer is 44', latex: '11 \\times 4 = 44' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'The 11 trick: the answer has repeating digits' },
      { level: 'moderate', text: '11 × 4 makes 44' },
      { level: 'explicit', text: '11 × 4 = 44' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables - 11s',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['patterns', 'times-tables'],
      commonMistakes: ['Pattern doesn\'t work for 10-12'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-014',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 3 × 9?', latex: '3 \\times 9 = \\text{?}' },
    answer: { type: 'numeric', correct: '27', acceptable: ['27.0', '27.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Count by 9s three times', latex: '9, 18, 27' },
        { number: 2, description: 'Or use: 3 × 10 − 3 = 27', latex: '30 - 3 = 27' },
        { number: 3, description: 'The answer is 27', latex: '3 \\times 9 = 27' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Count by 9s: 9, 18, 27' },
      { level: 'moderate', text: 'Or think: 30 − 3 = 27' },
      { level: 'explicit', text: '3 × 9 = 27' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Times tables - 9s',
      skills: ['multiplication', 'times-tables'],
      prerequisites: ['addition'],
      concepts: ['skip-counting', 'mental-math'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mul-015',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 8 × 8?', latex: '8 \\times 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '64', acceptable: ['64.0', '64.00'] },
    solution: {
      steps: [
        { number: 1, description: 'This is 8 squared', latex: '8^2' },
        { number: 2, description: '8 × 8 = 64', latex: '8 \\times 8 = 64' },
        { number: 3, description: 'The answer is 64', latex: '8 \\times 8 = 64' }
      ]
    },
    hints: [
      { level: 'gentle', text: '8 squared is an important fact' },
      { level: 'moderate', text: 'Think: 8 × 8 = 64' },
      { level: 'explicit', text: '8 × 8 = 64' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Square numbers',
      skills: ['multiplication', 'square-numbers'],
      prerequisites: ['addition'],
      concepts: ['square-numbers'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 45
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 4 =====
  {
    id: 'arith-v2-g4-mul-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 23 × 4?', latex: '23 \\times 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '92', acceptable: ['92.0', '92.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 23 into 20 + 3', latex: '23 = 20 + 3' },
        { number: 2, description: '20 × 4 = 80', latex: '20 \\times 4 = 80' },
        { number: 3, description: '3 × 4 = 12', latex: '3 \\times 4 = 12' },
        { number: 4, description: 'Add: 80 + 12 = 92', latex: '80 + 12 = 92' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Use the distributive property' },
      { level: 'moderate', text: '(20 × 4) + (3 × 4) = 80 + 12' },
      { level: 'explicit', text: '23 × 4 = 92' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Multi-digit by single-digit',
      skills: ['multiplication', 'distributive-property'],
      prerequisites: ['times-tables'],
      concepts: ['distributive-property', 'place-value'],
      commonMistakes: ['Carrying error', 'Partial product error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mul-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 15 × 6?', latex: '15 \\times 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '90', acceptable: ['90.0', '90.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 15 into 10 + 5', latex: '15 = 10 + 5' },
        { number: 2, description: '10 × 6 = 60', latex: '10 \\times 6 = 60' },
        { number: 3, description: '5 × 6 = 30', latex: '5 \\times 6 = 30' },
        { number: 4, description: 'Add: 60 + 30 = 90', latex: '60 + 30 = 90' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Break 15 into 10 + 5' },
      { level: 'moderate', text: '60 + 30 = 90' },
      { level: 'explicit', text: '15 × 6 = 90' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Multi-digit by single-digit',
      skills: ['multiplication', 'distributive-property'],
      prerequisites: ['times-tables'],
      concepts: ['distributive-property', 'place-value'],
      commonMistakes: ['Partial product error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mul-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 34 × 2?', latex: '34 \\times 2 = \\text{?}' },
    answer: { type: 'numeric', correct: '68', acceptable: ['68.0', '68.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 34 into 30 + 4', latex: '34 = 30 + 4' },
        { number: 2, description: '30 × 2 = 60', latex: '30 \\times 2 = 60' },
        { number: 3, description: '4 × 2 = 8', latex: '4 \\times 2 = 8' },
        { number: 4, description: 'Add: 60 + 8 = 68', latex: '60 + 8 = 68' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Doubling: double 30, double 4' },
      { level: 'moderate', text: '60 + 8 = 68' },
      { level: 'explicit', text: '34 × 2 = 68' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Multi-digit by single-digit',
      skills: ['multiplication', 'doubling'],
      prerequisites: ['times-tables'],
      concepts: ['doubling', 'place-value'],
      commonMistakes: ['Place value error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mul-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 27 × 3?', latex: '27 \\times 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '81', acceptable: ['81.0', '81.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 27 into 20 + 7', latex: '27 = 20 + 7' },
        { number: 2, description: '20 × 3 = 60', latex: '20 \\times 3 = 60' },
        { number: 3, description: '7 × 3 = 21', latex: '7 \\times 3 = 21' },
        { number: 4, description: 'Add: 60 + 21 = 81', latex: '60 + 21 = 81' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Use distributive property' },
      { level: 'moderate', text: '(20 × 3) + (7 × 3) = 60 + 21' },
      { level: 'explicit', text: '27 × 3 = 81' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Multi-digit by single-digit',
      skills: ['multiplication', 'distributive-property'],
      prerequisites: ['times-tables'],
      concepts: ['distributive-property', 'place-value'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mul-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 45 × 4?', latex: '45 \\times 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '180', acceptable: ['180.0', '180.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 45 into 40 + 5', latex: '45 = 40 + 5' },
        { number: 2, description: '40 × 4 = 160', latex: '40 \\times 4 = 160' },
        { number: 3, description: '5 × 4 = 20', latex: '5 \\times 4 = 20' },
        { number: 4, description: 'Add: 160 + 20 = 180', latex: '160 + 20 = 180' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Break 45 into 40 + 5' },
      { level: 'moderate', text: '160 + 20 = 180' },
      { level: 'explicit', text: '45 × 4 = 180' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Multi-digit by single-digit',
      skills: ['multiplication', 'distributive-property'],
      prerequisites: ['times-tables'],
      concepts: ['distributive-property', 'place-value'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mul-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 56 × 5?', latex: '56 \\times 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '280', acceptable: ['280.0', '280.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 56 into 50 + 6', latex: '56 = 50 + 6' },
        { number: 2, description: '50 × 5 = 250', latex: '50 \\times 5 = 250' },
        { number: 3, description: '6 × 5 = 30', latex: '6 \\times 5 = 30' },
        { number: 4, description: 'Add: 250 + 30 = 280', latex: '250 + 30 = 280' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Or: 56 × 5 = 56 × 10 ÷ 2' },
      { level: 'moderate', text: '250 + 30 = 280' },
      { level: 'explicit', text: '56 × 5 = 280' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Multi-digit by single-digit',
      skills: ['multiplication', 'distributive-property'],
      prerequisites: ['times-tables'],
      concepts: ['distributive-property', 'place-value'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mul-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 96 ÷ 8?', latex: '96 \\div 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 8 × ? = 96', latex: '8 \\times ? = 96' },
        { number: 2, description: '8 × 10 = 80, 8 × 2 = 16', latex: '8 \\times 10 = 80, \\quad 8 \\times 2 = 16' },
        { number: 3, description: '8 × 12 = 96', latex: '8 \\times 12 = 96' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think: 8 times what equals 96?' },
      { level: 'moderate', text: '8 × 10 = 80, need 16 more' },
      { level: 'explicit', text: '96 ÷ 8 = 12' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Division facts (inverse)',
      skills: ['multiplication', 'division'],
      prerequisites: ['times-tables'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mul-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 84 ÷ 7?', latex: '84 \\div 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 7 × ? = 84', latex: '7 \\times ? = 84' },
        { number: 2, description: '7 × 10 = 70, 7 × 2 = 14', latex: '7 \\times 10 = 70, \\quad 7 \\times 2 = 14' },
        { number: 3, description: '7 × 12 = 84', latex: '7 \\times 12 = 84' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think: 7 times what equals 84?' },
      { level: 'moderate', text: '7 × 12 = 84' },
      { level: 'explicit', text: '84 ÷ 7 = 12' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Division facts (inverse)',
      skills: ['multiplication', 'division'],
      prerequisites: ['times-tables'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 5 =====
  {
    id: 'arith-v2-g5-mul-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 24 × 15?', latex: '24 \\times 15 = \\text{?}' },
    answer: { type: 'numeric', correct: '360', acceptable: ['360.0', '360.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 15 into 10 + 5', latex: '15 = 10 + 5' },
        { number: 2, description: '24 × 10 = 240', latex: '24 \\times 10 = 240' },
        { number: 3, description: '24 × 5 = 120', latex: '24 \\times 5 = 120' },
        { number: 4, description: 'Add: 240 + 120 = 360', latex: '240 + 120 = 360' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Use the distributive property' },
      { level: 'moderate', text: '(24 × 10) + (24 × 5) = 240 + 120' },
      { level: 'explicit', text: '24 × 15 = 360' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Two-digit by two-digit',
      skills: ['multiplication', 'distributive-property'],
      prerequisites: ['multi-digit-multiplication'],
      concepts: ['distributive-property', 'place-value'],
      commonMistakes: ['Partial product alignment'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 90
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mul-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 32 × 25?', latex: '32 \\times 25 = \\text{?}' },
    answer: { type: 'numeric', correct: '800', acceptable: ['800.0', '800.00'] },
    solution: {
      steps: [
        { number: 1, description: '25 = 100 ÷ 4', latex: '25 = \\frac{100}{4}' },
        { number: 2, description: '32 × 100 = 3200', latex: '32 \\times 100 = 3200' },
        { number: 3, description: '3200 ÷ 4 = 800', latex: '3200 \\div 4 = 800' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Use the fact that 25 = 100 ÷ 4' },
      { level: 'moderate', text: '32 × 100 = 3200, then divide by 4' },
      { level: 'explicit', text: '32 × 25 = 800' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Two-digit by two-digit',
      skills: ['multiplication', 'mental-math'],
      prerequisites: ['multi-digit-multiplication'],
      concepts: ['mental-math-strategies', 'place-value'],
      commonMistakes: ['Calculation error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 90
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mul-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 18 × 12?', latex: '18 \\times 12 = \\text{?}' },
    answer: { type: 'numeric', correct: '216', acceptable: ['216.0', '216.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 12 into 10 + 2', latex: '12 = 10 + 2' },
        { number: 2, description: '18 × 10 = 180', latex: '18 \\times 10 = 180' },
        { number: 3, description: '18 × 2 = 36', latex: '18 \\times 2 = 36' },
        { number: 4, description: 'Add: 180 + 36 = 216', latex: '180 + 36 = 216' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Break 12 into 10 + 2' },
      { level: 'moderate', text: '180 + 36 = 216' },
      { level: 'explicit', text: '18 × 12 = 216' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Two-digit by two-digit',
      skills: ['multiplication', 'distributive-property'],
      prerequisites: ['multi-digit-multiplication'],
      concepts: ['distributive-property', 'place-value'],
      commonMistakes: ['Partial product error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 85
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mul-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 36 × 11?', latex: '36 \\times 11 = \\text{?}' },
    answer: { type: 'numeric', correct: '396', acceptable: ['396.0', '396.00'] },
    solution: {
      steps: [
        { number: 1, description: '36 × 11 = 36 × 10 + 36 × 1', latex: '36 \\times 11 = 36 \\times 10 + 36' },
        { number: 2, description: '36 × 10 = 360', latex: '36 \\times 10 = 360' },
        { number: 3, description: '360 + 36 = 396', latex: '360 + 36 = 396' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Multiplying by 11 is easy: × 10 + × 1' },
      { level: 'moderate', text: '360 + 36 = 396' },
      { level: 'explicit', text: '36 × 11 = 396' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Multiplying by 11',
      skills: ['multiplication', 'mental-math'],
      prerequisites: ['multi-digit-multiplication'],
      concepts: ['mental-math-strategies'],
      commonMistakes: ['Addition error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 75
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mul-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 25 × 16?', latex: '25 \\times 16 = \\text{?}' },
    answer: { type: 'numeric', correct: '400', acceptable: ['400.0', '400.00'] },
    solution: {
      steps: [
        { number: 1, description: '16 = 4 × 4', latex: '16 = 4 \\times 4' },
        { number: 2, description: '25 × 4 = 100', latex: '25 \\times 4 = 100' },
        { number: 3, description: '100 × 4 = 400', latex: '100 \\times 4 = 400' }
      ]
    },
    hints: [
      { level: 'gentle', text: '16 = 4 × 4, and 25 × 4 = 100' },
      { level: 'moderate', text: '100 × 4 = 400' },
      { level: 'explicit', text: '25 × 16 = 400' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Two-digit by two-digit',
      skills: ['multiplication', 'mental-math'],
      prerequisites: ['multi-digit-multiplication'],
      concepts: ['factoring', 'mental-math-strategies'],
      commonMistakes: ['Calculation error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 85
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mul-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 45 × 20?', latex: '45 \\times 20 = \\text{?}' },
    answer: { type: 'numeric', correct: '900', acceptable: ['900.0', '900.00'] },
    solution: {
      steps: [
        { number: 1, description: '45 × 20 = 45 × 2 × 10', latex: '45 \\times 20 = 45 \\times 2 \\times 10' },
        { number: 2, description: '45 × 2 = 90', latex: '45 \\times 2 = 90' },
        { number: 3, description: '90 × 10 = 900', latex: '90 \\times 10 = 900' }
      ]
    },
    hints: [
      { level: 'gentle', text: '× 20 is the same as × 2 × 10' },
      { level: 'moderate', text: '45 × 2 = 90, then × 10' },
      { level: 'explicit', text: '45 × 20 = 900' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Multiplying by multiples of 10',
      skills: ['multiplication', 'mental-math'],
      prerequisites: ['multi-digit-multiplication'],
      concepts: ['place-value', 'mental-math-strategies'],
      commonMistakes: ['Missing a zero'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mul-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 13 × 13?', latex: '13 \\times 13 = \\text{?}' },
    answer: { type: 'numeric', correct: '169', acceptable: ['169.0', '169.00'] },
    solution: {
      steps: [
        { number: 1, description: 'This is 13 squared', latex: '13^2' },
        { number: 2, description: '13 × 13 = (10 + 3)(10 + 3)', latex: '(10 + 3)^2' },
        { number: 3, description: '= 100 + 30 + 30 + 9 = 169', latex: '100 + 60 + 9 = 169' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is a perfect square: 13²' },
      { level: 'moderate', text: '(10 + 3)² = 100 + 60 + 9' },
      { level: 'explicit', text: '13 × 13 = 169' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Square numbers',
      skills: ['multiplication', 'square-numbers'],
      prerequisites: ['multi-digit-multiplication'],
      concepts: ['square-numbers', 'FOIL'],
      commonMistakes: ['Partial product error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mul-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 50 × 50?', latex: '50 \\times 50 = \\text{?}' },
    answer: { type: 'numeric', correct: '2500', acceptable: ['2500.0', '2,500'] },
    solution: {
      steps: [
        { number: 1, description: '50 × 50 = (5 × 10) × (5 × 10)', latex: '(5 \\times 10)^2' },
        { number: 2, description: '= 5 × 5 × 10 × 10', latex: '= 25 \\times 100' },
        { number: 3, description: '= 25 × 100 = 2500', latex: '= 2500' }
      ]
    },
    hints: [
      { level: 'gentle', text: '50² is 5² with two extra zeros' },
      { level: 'moderate', text: '5 × 5 = 25, add two zeros' },
      { level: 'explicit', text: '50 × 50 = 2,500' }
    ],
    pedagogy: {
      topic: 'Multiplication',
      subTopic: 'Square numbers',
      skills: ['multiplication', 'square-numbers'],
      prerequisites: ['multi-digit-multiplication'],
      concepts: ['square-numbers', 'place-value'],
      commonMistakes: ['Missing zeros'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  }
]

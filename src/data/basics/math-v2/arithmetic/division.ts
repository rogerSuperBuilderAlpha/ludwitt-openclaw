/**
 * Division Problems V2 - Grade 3-5
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const DIVISION_PROBLEMS_V2: MathProblemV2[] = [
  // ===== GRADE 3 =====
  {
    id: 'arith-v2-g3-div-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 24 ÷ 3?', latex: '24 \\div 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '8', acceptable: ['8.0', '8.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 3 × ? = 24', latex: '3 \\times ? = 24' },
        { number: 2, description: 'Count by 3s: 3, 6, 9, 12, 15, 18, 21, 24', latex: '3 \\times 8 = 24' },
        { number: 3, description: 'The answer is 8', latex: '24 \\div 3 = 8' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think: 3 times what equals 24?' },
      { level: 'moderate', text: 'Count by 3s until you reach 24' },
      { level: 'explicit', text: '24 ÷ 3 = 8' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Basic division facts',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['equal-groups', 'inverse-operations'],
      commonMistakes: ['Remainder handling', 'Quotient error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 42 ÷ 6?', latex: '42 \\div 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '7', acceptable: ['7.0', '7.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 6 × ? = 42', latex: '6 \\times ? = 42' },
        { number: 2, description: '6 × 7 = 42', latex: '6 \\times 7 = 42' },
        { number: 3, description: 'The answer is 7', latex: '42 \\div 6 = 7' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is the reverse of 6 × 7' },
      { level: 'moderate', text: '6 × 7 = 42, so 42 ÷ 6 = 7' },
      { level: 'explicit', text: '42 ÷ 6 = 7' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Basic division facts',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['equal-groups', 'inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 54 ÷ 9?', latex: '54 \\div 9 = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 9 × ? = 54', latex: '9 \\times ? = 54' },
        { number: 2, description: '9 × 6 = 54', latex: '9 \\times 6 = 54' },
        { number: 3, description: 'The answer is 6', latex: '54 \\div 9 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Use the 9 times table' },
      { level: 'moderate', text: '9 × 6 = 54' },
      { level: 'explicit', text: '54 ÷ 9 = 6' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 9s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 35 ÷ 7?', latex: '35 \\div 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5.0', '5.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 7 × ? = 35', latex: '7 \\times ? = 35' },
        { number: 2, description: '7 × 5 = 35', latex: '7 \\times 5 = 35' },
        { number: 3, description: 'The answer is 5', latex: '35 \\div 7 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'How many 7s fit into 35?' },
      { level: 'moderate', text: '7 × 5 = 35' },
      { level: 'explicit', text: '35 ÷ 7 = 5' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 7s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 63 ÷ 7?', latex: '63 \\div 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 7 × ? = 63', latex: '7 \\times ? = 63' },
        { number: 2, description: '7 × 9 = 63', latex: '7 \\times 9 = 63' },
        { number: 3, description: 'The answer is 9', latex: '63 \\div 7 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Use the 7 times table' },
      { level: 'moderate', text: '7 × 9 = 63' },
      { level: 'explicit', text: '63 ÷ 7 = 9' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 7s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 24 ÷ 4?', latex: '24 \\div 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 4 × ? = 24', latex: '4 \\times ? = 24' },
        { number: 2, description: '4 × 6 = 24', latex: '4 \\times 6 = 24' },
        { number: 3, description: 'The answer is 6', latex: '24 \\div 4 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'How many 4s in 24?' },
      { level: 'moderate', text: '4 × 6 = 24' },
      { level: 'explicit', text: '24 ÷ 4 = 6' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 4s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 48 ÷ 8?', latex: '48 \\div 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 8 × ? = 48', latex: '8 \\times ? = 48' },
        { number: 2, description: '8 × 6 = 48', latex: '8 \\times 6 = 48' },
        { number: 3, description: 'The answer is 6', latex: '48 \\div 8 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: '8 times what equals 48?' },
      { level: 'moderate', text: '8 × 6 = 48' },
      { level: 'explicit', text: '48 ÷ 8 = 6' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 8s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 56 ÷ 8?', latex: '56 \\div 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '7', acceptable: ['7.0', '7.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 8 × ? = 56', latex: '8 \\times ? = 56' },
        { number: 2, description: '8 × 7 = 56', latex: '8 \\times 7 = 56' },
        { number: 3, description: 'The answer is 7', latex: '56 \\div 8 = 7' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Use the 8 times table' },
      { level: 'moderate', text: '8 × 7 = 56' },
      { level: 'explicit', text: '56 ÷ 8 = 7' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 8s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-009',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 72 ÷ 8?', latex: '72 \\div 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 8 × ? = 72', latex: '8 \\times ? = 72' },
        { number: 2, description: '8 × 9 = 72', latex: '8 \\times 9 = 72' },
        { number: 3, description: 'The answer is 9', latex: '72 \\div 8 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: '8 times what equals 72?' },
      { level: 'moderate', text: '8 × 9 = 72' },
      { level: 'explicit', text: '72 ÷ 8 = 9' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 8s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-010',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 81 ÷ 9?', latex: '81 \\div 9 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: '81 is a perfect square', latex: '81 = 9^2' },
        { number: 2, description: '9 × 9 = 81', latex: '9 \\times 9 = 81' },
        { number: 3, description: 'The answer is 9', latex: '81 \\div 9 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: '81 is a perfect square' },
      { level: 'moderate', text: 'The square root of 81 is 9' },
      { level: 'explicit', text: '81 ÷ 9 = 9' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts',
      skills: ['division', 'square-numbers'],
      prerequisites: ['multiplication'],
      concepts: ['square-numbers', 'inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-011',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 45 ÷ 5?', latex: '45 \\div 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 5 × ? = 45', latex: '5 \\times ? = 45' },
        { number: 2, description: '5 × 9 = 45', latex: '5 \\times 9 = 45' },
        { number: 3, description: 'The answer is 9', latex: '45 \\div 5 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Count by 5s to 45' },
      { level: 'moderate', text: '5 × 9 = 45' },
      { level: 'explicit', text: '45 ÷ 5 = 9' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 5s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Skip counting error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-012',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 36 ÷ 6?', latex: '36 \\div 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: '36 is a perfect square', latex: '36 = 6^2' },
        { number: 2, description: '6 × 6 = 36', latex: '6 \\times 6 = 36' },
        { number: 3, description: 'The answer is 6', latex: '36 \\div 6 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: '36 is 6 squared' },
      { level: 'moderate', text: '6 × 6 = 36' },
      { level: 'explicit', text: '36 ÷ 6 = 6' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts',
      skills: ['division', 'square-numbers'],
      prerequisites: ['multiplication'],
      concepts: ['square-numbers', 'inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-013',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 28 ÷ 4?', latex: '28 \\div 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '7', acceptable: ['7.0', '7.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 4 × ? = 28', latex: '4 \\times ? = 28' },
        { number: 2, description: '4 × 7 = 28', latex: '4 \\times 7 = 28' },
        { number: 3, description: 'The answer is 7', latex: '28 \\div 4 = 7' }
      ]
    },
    hints: [
      { level: 'gentle', text: '4 times what equals 28?' },
      { level: 'moderate', text: '4 × 7 = 28' },
      { level: 'explicit', text: '28 ÷ 4 = 7' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts - 4s',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-014',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 49 ÷ 7?', latex: '49 \\div 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '7', acceptable: ['7.0', '7.00'] },
    solution: {
      steps: [
        { number: 1, description: '49 is a perfect square', latex: '49 = 7^2' },
        { number: 2, description: '7 × 7 = 49', latex: '7 \\times 7 = 49' },
        { number: 3, description: 'The answer is 7', latex: '49 \\div 7 = 7' }
      ]
    },
    hints: [
      { level: 'gentle', text: '49 is 7 squared' },
      { level: 'moderate', text: '7 × 7 = 49' },
      { level: 'explicit', text: '49 ÷ 7 = 7' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts',
      skills: ['division', 'square-numbers'],
      prerequisites: ['multiplication'],
      concepts: ['square-numbers', 'inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-div-015',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 64 ÷ 8?', latex: '64 \\div 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '8', acceptable: ['8.0', '8.00'] },
    solution: {
      steps: [
        { number: 1, description: '64 is a perfect square', latex: '64 = 8^2' },
        { number: 2, description: '8 × 8 = 64', latex: '8 \\times 8 = 64' },
        { number: 3, description: 'The answer is 8', latex: '64 \\div 8 = 8' }
      ]
    },
    hints: [
      { level: 'gentle', text: '64 is 8 squared' },
      { level: 'moderate', text: '8 × 8 = 64' },
      { level: 'explicit', text: '64 ÷ 8 = 8' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts',
      skills: ['division', 'square-numbers'],
      prerequisites: ['multiplication'],
      concepts: ['square-numbers', 'inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 4 =====
  {
    id: 'arith-v2-g4-div-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 96 ÷ 8?', latex: '96 \\div 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 8 × ? = 96', latex: '8 \\times ? = 96' },
        { number: 2, description: '8 × 10 = 80, need 16 more', latex: '8 \\times 10 = 80' },
        { number: 3, description: '8 × 2 = 16', latex: '8 \\times 2 = 16' },
        { number: 4, description: '8 × 12 = 96', latex: '8 \\times 12 = 96' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Break it down: 8 × 10 = 80, how much more?' },
      { level: 'moderate', text: '80 + 16 = 96, and 16 ÷ 8 = 2' },
      { level: 'explicit', text: '96 ÷ 8 = 12' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division with larger numbers',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['partial-quotients', 'mental-math'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-div-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 84 ÷ 12?', latex: '84 \\div 12 = \\text{?}' },
    answer: { type: 'numeric', correct: '7', acceptable: ['7.0', '7.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 12 × ? = 84', latex: '12 \\times ? = 84' },
        { number: 2, description: 'Count by 12s: 12, 24, 36, 48, 60, 72, 84', latex: '12 \\times 7 = 84' },
        { number: 3, description: 'The answer is 7', latex: '84 \\div 12 = 7' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Count by 12s until you reach 84' },
      { level: 'moderate', text: '12 × 7 = 84' },
      { level: 'explicit', text: '84 ÷ 12 = 7' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division by 12',
      skills: ['division', 'times-tables'],
      prerequisites: ['division-facts'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 65
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-div-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 72 ÷ 9?', latex: '72 \\div 9 = \\text{?}' },
    answer: { type: 'numeric', correct: '8', acceptable: ['8.0', '8.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 9 × ? = 72', latex: '9 \\times ? = 72' },
        { number: 2, description: '9 × 8 = 72', latex: '9 \\times 8 = 72' },
        { number: 3, description: 'The answer is 8', latex: '72 \\div 9 = 8' }
      ]
    },
    hints: [
      { level: 'gentle', text: '9 times what equals 72?' },
      { level: 'moderate', text: '9 × 8 = 72' },
      { level: 'explicit', text: '72 ÷ 9 = 8' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division facts',
      skills: ['division', 'times-tables'],
      prerequisites: ['multiplication'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Times table error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-div-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 108 ÷ 9?', latex: '108 \\div 9 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 9 × ? = 108', latex: '9 \\times ? = 108' },
        { number: 2, description: '9 × 10 = 90, need 18 more', latex: '9 \\times 10 = 90' },
        { number: 3, description: '9 × 2 = 18', latex: '9 \\times 2 = 18' },
        { number: 4, description: '9 × 12 = 108', latex: '9 \\times 12 = 108' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start with 9 × 10 = 90' },
      { level: 'moderate', text: '90 + 18 = 108, so answer is 12' },
      { level: 'explicit', text: '108 ÷ 9 = 12' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division with larger numbers',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['partial-quotients'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 65
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-div-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 132 ÷ 11?', latex: '132 \\div 11 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 11 × ? = 132', latex: '11 \\times ? = 132' },
        { number: 2, description: '11 × 10 = 110, need 22 more', latex: '11 \\times 10 = 110' },
        { number: 3, description: '11 × 2 = 22', latex: '11 \\times 2 = 22' },
        { number: 4, description: '11 × 12 = 132', latex: '11 \\times 12 = 132' }
      ]
    },
    hints: [
      { level: 'gentle', text: '11 × 10 = 110, how much more to 132?' },
      { level: 'moderate', text: '132 - 110 = 22, and 22 ÷ 11 = 2' },
      { level: 'explicit', text: '132 ÷ 11 = 12' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division by 11',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['partial-quotients'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 65
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 5 =====
  {
    id: 'arith-v2-g5-div-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 144 ÷ 12?', latex: '144 \\div 12 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: '144 is a perfect square', latex: '144 = 12^2' },
        { number: 2, description: '12 × 12 = 144', latex: '12 \\times 12 = 144' },
        { number: 3, description: 'The answer is 12', latex: '144 \\div 12 = 12' }
      ]
    },
    hints: [
      { level: 'gentle', text: '144 is a perfect square' },
      { level: 'moderate', text: '12 × 12 = 144' },
      { level: 'explicit', text: '144 ÷ 12 = 12' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Three-digit division',
      skills: ['division', 'square-numbers'],
      prerequisites: ['division-facts'],
      concepts: ['square-numbers', 'inverse-operations'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 75
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-div-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 225 ÷ 15?', latex: '225 \\div 15 = \\text{?}' },
    answer: { type: 'numeric', correct: '15', acceptable: ['15.0', '15.00'] },
    solution: {
      steps: [
        { number: 1, description: '225 is a perfect square', latex: '225 = 15^2' },
        { number: 2, description: '15 × 15 = 225', latex: '15 \\times 15 = 225' },
        { number: 3, description: 'The answer is 15', latex: '225 \\div 15 = 15' }
      ]
    },
    hints: [
      { level: 'gentle', text: '225 is a perfect square' },
      { level: 'moderate', text: '15 × 15 = 225' },
      { level: 'explicit', text: '225 ÷ 15 = 15' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Three-digit division',
      skills: ['division', 'square-numbers'],
      prerequisites: ['division-facts'],
      concepts: ['square-numbers', 'inverse-operations'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-div-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 156 ÷ 12?', latex: '156 \\div 12 = \\text{?}' },
    answer: { type: 'numeric', correct: '13', acceptable: ['13.0', '13.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 12 × ? = 156', latex: '12 \\times ? = 156' },
        { number: 2, description: '12 × 10 = 120, need 36 more', latex: '12 \\times 10 = 120' },
        { number: 3, description: '12 × 3 = 36', latex: '12 \\times 3 = 36' },
        { number: 4, description: '12 × 13 = 156', latex: '12 \\times 13 = 156' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start with 12 × 10 = 120' },
      { level: 'moderate', text: '156 - 120 = 36, and 36 ÷ 12 = 3' },
      { level: 'explicit', text: '156 ÷ 12 = 13' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Three-digit division',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['partial-quotients'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-div-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 180 ÷ 15?', latex: '180 \\div 15 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 15 × ? = 180', latex: '15 \\times ? = 180' },
        { number: 2, description: '15 × 10 = 150, need 30 more', latex: '15 \\times 10 = 150' },
        { number: 3, description: '15 × 2 = 30', latex: '15 \\times 2 = 30' },
        { number: 4, description: '15 × 12 = 180', latex: '15 \\times 12 = 180' }
      ]
    },
    hints: [
      { level: 'gentle', text: '15 × 10 = 150, how much more?' },
      { level: 'moderate', text: '180 - 150 = 30, and 30 ÷ 15 = 2' },
      { level: 'explicit', text: '180 ÷ 15 = 12' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Three-digit division',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['partial-quotients'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-div-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 192 ÷ 16?', latex: '192 \\div 16 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 16 × ? = 192', latex: '16 \\times ? = 192' },
        { number: 2, description: '16 × 10 = 160, need 32 more', latex: '16 \\times 10 = 160' },
        { number: 3, description: '16 × 2 = 32', latex: '16 \\times 2 = 32' },
        { number: 4, description: '16 × 12 = 192', latex: '16 \\times 12 = 192' }
      ]
    },
    hints: [
      { level: 'gentle', text: '16 × 10 = 160' },
      { level: 'moderate', text: '192 - 160 = 32, and 32 ÷ 16 = 2' },
      { level: 'explicit', text: '192 ÷ 16 = 12' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Three-digit division',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['partial-quotients'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-div-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 200 ÷ 8?', latex: '200 \\div 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '25', acceptable: ['25.0', '25.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 8 × ? = 200', latex: '8 \\times ? = 200' },
        { number: 2, description: '8 × 20 = 160, need 40 more', latex: '8 \\times 20 = 160' },
        { number: 3, description: '8 × 5 = 40', latex: '8 \\times 5 = 40' },
        { number: 4, description: '8 × 25 = 200', latex: '8 \\times 25 = 200' }
      ]
    },
    hints: [
      { level: 'gentle', text: '8 × 25 is a useful fact' },
      { level: 'moderate', text: '8 × 25 = 200' },
      { level: 'explicit', text: '200 ÷ 8 = 25' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Three-digit division',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['partial-quotients'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 75
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-div-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 250 ÷ 25?', latex: '250 \\div 25 = \\text{?}' },
    answer: { type: 'numeric', correct: '10', acceptable: ['10.0', '10.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 25 × ? = 250', latex: '25 \\times ? = 250' },
        { number: 2, description: '25 × 10 = 250', latex: '25 \\times 10 = 250' },
        { number: 3, description: 'The answer is 10', latex: '250 \\div 25 = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: '25 × 10 = ?' },
      { level: 'moderate', text: '25 × 10 = 250' },
      { level: 'explicit', text: '250 ÷ 25 = 10' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Division by 25',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['place-value'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-div-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 300 ÷ 12?', latex: '300 \\div 12 = \\text{?}' },
    answer: { type: 'numeric', correct: '25', acceptable: ['25.0', '25.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 12 × ? = 300', latex: '12 \\times ? = 300' },
        { number: 2, description: '12 × 20 = 240, need 60 more', latex: '12 \\times 20 = 240' },
        { number: 3, description: '12 × 5 = 60', latex: '12 \\times 5 = 60' },
        { number: 4, description: '12 × 25 = 300', latex: '12 \\times 25 = 300' }
      ]
    },
    hints: [
      { level: 'gentle', text: '12 × 20 = 240, then find the rest' },
      { level: 'moderate', text: '300 - 240 = 60, and 60 ÷ 12 = 5' },
      { level: 'explicit', text: '300 ÷ 12 = 25' }
    ],
    pedagogy: {
      topic: 'Division',
      subTopic: 'Three-digit division',
      skills: ['division', 'mental-math'],
      prerequisites: ['division-facts'],
      concepts: ['partial-quotients'],
      commonMistakes: ['Quotient error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  }
]

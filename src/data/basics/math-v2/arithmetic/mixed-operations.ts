/**
 * Mixed Operations Problems V2 - Grade 2-5
 * Problems that combine multiple arithmetic operations
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const MIXED_OPERATIONS_PROBLEMS_V2: MathProblemV2[] = [
  // ===== GRADE 2 =====
  {
    id: 'arith-v2-g2-mix-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 5 + 3 − 2?', latex: '5 + 3 - 2 = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Work left to right', latex: '5 + 3 - 2' },
        { number: 2, description: 'First: 5 + 3 = 8', latex: '5 + 3 = 8' },
        { number: 3, description: 'Then: 8 − 2 = 6', latex: '8 - 2 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Work from left to right' },
      { level: 'moderate', text: 'First add 5 + 3, then subtract 2' },
      { level: 'explicit', text: '5 + 3 − 2 = 6' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Addition and subtraction',
      skills: ['addition', 'subtraction', 'order-of-operations'],
      prerequisites: ['addition', 'subtraction'],
      concepts: ['order-of-operations'],
      commonMistakes: ['Wrong operation order'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-mix-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 10 − 4 + 3?', latex: '10 - 4 + 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Work left to right', latex: '10 - 4 + 3' },
        { number: 2, description: 'First: 10 − 4 = 6', latex: '10 - 4 = 6' },
        { number: 3, description: 'Then: 6 + 3 = 9', latex: '6 + 3 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Work from left to right' },
      { level: 'moderate', text: 'First 10 − 4 = 6, then add 3' },
      { level: 'explicit', text: '10 − 4 + 3 = 9' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Addition and subtraction',
      skills: ['addition', 'subtraction', 'order-of-operations'],
      prerequisites: ['addition', 'subtraction'],
      concepts: ['order-of-operations'],
      commonMistakes: ['Wrong operation order'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-mix-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 8 + 7 − 5?', latex: '8 + 7 - 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '10', acceptable: ['10.0', '10.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Work left to right', latex: '8 + 7 - 5' },
        { number: 2, description: 'First: 8 + 7 = 15', latex: '8 + 7 = 15' },
        { number: 3, description: 'Then: 15 − 5 = 10', latex: '15 - 5 = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add first, then subtract' },
      { level: 'moderate', text: '8 + 7 = 15, then 15 − 5' },
      { level: 'explicit', text: '8 + 7 − 5 = 10' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Addition and subtraction',
      skills: ['addition', 'subtraction', 'order-of-operations'],
      prerequisites: ['addition', 'subtraction'],
      concepts: ['order-of-operations'],
      commonMistakes: ['Wrong operation order'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-mix-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 15 − 8 + 6?', latex: '15 - 8 + 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '13', acceptable: ['13.0', '13.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Work left to right', latex: '15 - 8 + 6' },
        { number: 2, description: 'First: 15 − 8 = 7', latex: '15 - 8 = 7' },
        { number: 3, description: 'Then: 7 + 6 = 13', latex: '7 + 6 = 13' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Subtract first, then add' },
      { level: 'moderate', text: '15 − 8 = 7, then 7 + 6' },
      { level: 'explicit', text: '15 − 8 + 6 = 13' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Addition and subtraction',
      skills: ['addition', 'subtraction', 'order-of-operations'],
      prerequisites: ['addition', 'subtraction'],
      concepts: ['order-of-operations'],
      commonMistakes: ['Wrong operation order'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 3 =====
  {
    id: 'arith-v2-g3-mix-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 4 × 5 + 3?', latex: '4 \\times 5 + 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '23', acceptable: ['23.0', '23.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Multiplication comes before addition', latex: '4 \\times 5 + 3' },
        { number: 2, description: 'First: 4 × 5 = 20', latex: '4 \\times 5 = 20' },
        { number: 3, description: 'Then: 20 + 3 = 23', latex: '20 + 3 = 23' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Remember: multiplication before addition' },
      { level: 'moderate', text: '4 × 5 = 20, then add 3' },
      { level: 'explicit', text: '4 × 5 + 3 = 23' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Multiplication and addition',
      skills: ['multiplication', 'addition', 'order-of-operations'],
      prerequisites: ['multiplication', 'addition'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Adding before multiplying'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mix-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 6 + 3 × 4?', latex: '6 + 3 \\times 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '18', acceptable: ['18.0', '18.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Multiplication comes before addition', latex: '6 + 3 \\times 4' },
        { number: 2, description: 'First: 3 × 4 = 12', latex: '3 \\times 4 = 12' },
        { number: 3, description: 'Then: 6 + 12 = 18', latex: '6 + 12 = 18' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Do the multiplication first!' },
      { level: 'moderate', text: '3 × 4 = 12, then 6 + 12' },
      { level: 'explicit', text: '6 + 3 × 4 = 18' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Multiplication and addition',
      skills: ['multiplication', 'addition', 'order-of-operations'],
      prerequisites: ['multiplication', 'addition'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Adding 6 + 3 first'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mix-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 20 − 3 × 5?', latex: '20 - 3 \\times 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5.0', '5.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Multiplication comes before subtraction', latex: '20 - 3 \\times 5' },
        { number: 2, description: 'First: 3 × 5 = 15', latex: '3 \\times 5 = 15' },
        { number: 3, description: 'Then: 20 − 15 = 5', latex: '20 - 15 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Multiply before subtracting' },
      { level: 'moderate', text: '3 × 5 = 15, then 20 − 15' },
      { level: 'explicit', text: '20 − 3 × 5 = 5' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Multiplication and subtraction',
      skills: ['multiplication', 'subtraction', 'order-of-operations'],
      prerequisites: ['multiplication', 'subtraction'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Subtracting first'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mix-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 24 ÷ 6 + 5?', latex: '24 \\div 6 + 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Division comes before addition', latex: '24 \\div 6 + 5' },
        { number: 2, description: 'First: 24 ÷ 6 = 4', latex: '24 \\div 6 = 4' },
        { number: 3, description: 'Then: 4 + 5 = 9', latex: '4 + 5 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Divide first, then add' },
      { level: 'moderate', text: '24 ÷ 6 = 4, then 4 + 5' },
      { level: 'explicit', text: '24 ÷ 6 + 5 = 9' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Division and addition',
      skills: ['division', 'addition', 'order-of-operations'],
      prerequisites: ['division', 'addition'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Adding before dividing'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g3-mix-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 3.0,
    gradeLevel: 3,
    question: { text: 'What is 7 × 3 − 6?', latex: '7 \\times 3 - 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '15', acceptable: ['15.0', '15.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Multiplication first', latex: '7 \\times 3 - 6' },
        { number: 2, description: 'First: 7 × 3 = 21', latex: '7 \\times 3 = 21' },
        { number: 3, description: 'Then: 21 − 6 = 15', latex: '21 - 6 = 15' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Multiply before subtracting' },
      { level: 'moderate', text: '7 × 3 = 21, then subtract 6' },
      { level: 'explicit', text: '7 × 3 − 6 = 15' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Multiplication and subtraction',
      skills: ['multiplication', 'subtraction', 'order-of-operations'],
      prerequisites: ['multiplication', 'subtraction'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Wrong order'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 4 =====
  {
    id: 'arith-v2-g4-mix-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 3 × 4 + 2 × 5?', latex: '3 \\times 4 + 2 \\times 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '22', acceptable: ['22.0', '22.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Do both multiplications first', latex: '3 \\times 4 + 2 \\times 5' },
        { number: 2, description: '3 × 4 = 12', latex: '3 \\times 4 = 12' },
        { number: 3, description: '2 × 5 = 10', latex: '2 \\times 5 = 10' },
        { number: 4, description: 'Then add: 12 + 10 = 22', latex: '12 + 10 = 22' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Do both multiplications before adding' },
      { level: 'moderate', text: '12 + 10 = 22' },
      { level: 'explicit', text: '3 × 4 + 2 × 5 = 22' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Multiple multiplications',
      skills: ['multiplication', 'addition', 'order-of-operations'],
      prerequisites: ['multiplication', 'addition'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Not doing both multiplications first'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 65
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mix-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 36 ÷ 6 × 2?', latex: '36 \\div 6 \\times 2 = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Division and multiplication: left to right', latex: '36 \\div 6 \\times 2' },
        { number: 2, description: 'First: 36 ÷ 6 = 6', latex: '36 \\div 6 = 6' },
        { number: 3, description: 'Then: 6 × 2 = 12', latex: '6 \\times 2 = 12' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Division and multiplication: work left to right' },
      { level: 'moderate', text: '36 ÷ 6 = 6, then × 2' },
      { level: 'explicit', text: '36 ÷ 6 × 2 = 12' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Division and multiplication',
      skills: ['division', 'multiplication', 'order-of-operations'],
      prerequisites: ['division', 'multiplication'],
      concepts: ['order-of-operations', 'left-to-right'],
      commonMistakes: ['Multiplying first'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mix-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is (5 + 3) × 4?', latex: '(5 + 3) \\times 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '32', acceptable: ['32.0', '32.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Parentheses first', latex: '(5 + 3) \\times 4' },
        { number: 2, description: 'First: 5 + 3 = 8', latex: '5 + 3 = 8' },
        { number: 3, description: 'Then: 8 × 4 = 32', latex: '8 \\times 4 = 32' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Parentheses come first!' },
      { level: 'moderate', text: '5 + 3 = 8, then × 4' },
      { level: 'explicit', text: '(5 + 3) × 4 = 32' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Parentheses',
      skills: ['addition', 'multiplication', 'order-of-operations'],
      prerequisites: ['addition', 'multiplication'],
      concepts: ['parentheses', 'PEMDAS'],
      commonMistakes: ['Ignoring parentheses'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mix-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 48 ÷ (4 + 4)?', latex: '48 \\div (4 + 4) = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Parentheses first', latex: '48 \\div (4 + 4)' },
        { number: 2, description: 'First: 4 + 4 = 8', latex: '4 + 4 = 8' },
        { number: 3, description: 'Then: 48 ÷ 8 = 6', latex: '48 \\div 8 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Solve inside the parentheses first' },
      { level: 'moderate', text: '4 + 4 = 8, then 48 ÷ 8' },
      { level: 'explicit', text: '48 ÷ (4 + 4) = 6' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Parentheses with division',
      skills: ['addition', 'division', 'order-of-operations'],
      prerequisites: ['addition', 'division'],
      concepts: ['parentheses', 'PEMDAS'],
      commonMistakes: ['Dividing first'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-mix-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 5 × (10 − 6)?', latex: '5 \\times (10 - 6) = \\text{?}' },
    answer: { type: 'numeric', correct: '20', acceptable: ['20.0', '20.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Parentheses first', latex: '5 \\times (10 - 6)' },
        { number: 2, description: 'First: 10 − 6 = 4', latex: '10 - 6 = 4' },
        { number: 3, description: 'Then: 5 × 4 = 20', latex: '5 \\times 4 = 20' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Do the subtraction in parentheses first' },
      { level: 'moderate', text: '10 − 6 = 4, then 5 × 4' },
      { level: 'explicit', text: '5 × (10 − 6) = 20' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Parentheses',
      skills: ['subtraction', 'multiplication', 'order-of-operations'],
      prerequisites: ['subtraction', 'multiplication'],
      concepts: ['parentheses', 'PEMDAS'],
      commonMistakes: ['Multiplying first'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 5 =====
  {
    id: 'arith-v2-g5-mix-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 2 × 3 + 4 × 5 − 6?', latex: '2 \\times 3 + 4 \\times 5 - 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '20', acceptable: ['20.0', '20.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Do multiplications first', latex: '2 \\times 3 + 4 \\times 5 - 6' },
        { number: 2, description: '2 × 3 = 6', latex: '2 \\times 3 = 6' },
        { number: 3, description: '4 × 5 = 20', latex: '4 \\times 5 = 20' },
        { number: 4, description: 'Now: 6 + 20 − 6 = 20', latex: '6 + 20 - 6 = 20' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Multiply first (PEMDAS)' },
      { level: 'moderate', text: '6 + 20 − 6 = 20' },
      { level: 'explicit', text: '2 × 3 + 4 × 5 − 6 = 20' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Complex expressions',
      skills: ['multiplication', 'addition', 'subtraction', 'order-of-operations'],
      prerequisites: ['multiplication', 'addition', 'subtraction'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Wrong order of operations'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 75
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mix-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is (8 + 4) × (6 − 3)?', latex: '(8 + 4) \\times (6 - 3) = \\text{?}' },
    answer: { type: 'numeric', correct: '36', acceptable: ['36.0', '36.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Solve both parentheses first', latex: '(8 + 4) \\times (6 - 3)' },
        { number: 2, description: '8 + 4 = 12', latex: '8 + 4 = 12' },
        { number: 3, description: '6 − 3 = 3', latex: '6 - 3 = 3' },
        { number: 4, description: 'Then: 12 × 3 = 36', latex: '12 \\times 3 = 36' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Solve both parentheses, then multiply' },
      { level: 'moderate', text: '12 × 3 = 36' },
      { level: 'explicit', text: '(8 + 4) × (6 − 3) = 36' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Multiple parentheses',
      skills: ['addition', 'subtraction', 'multiplication', 'order-of-operations'],
      prerequisites: ['addition', 'subtraction', 'multiplication'],
      concepts: ['parentheses', 'PEMDAS'],
      commonMistakes: ['Order of operations error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mix-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 100 ÷ 5 ÷ 4?', latex: '100 \\div 5 \\div 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5.0', '5.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Work left to right', latex: '100 \\div 5 \\div 4' },
        { number: 2, description: 'First: 100 ÷ 5 = 20', latex: '100 \\div 5 = 20' },
        { number: 3, description: 'Then: 20 ÷ 4 = 5', latex: '20 \\div 4 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Division goes left to right' },
      { level: 'moderate', text: '100 ÷ 5 = 20, then ÷ 4' },
      { level: 'explicit', text: '100 ÷ 5 ÷ 4 = 5' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Sequential division',
      skills: ['division', 'order-of-operations'],
      prerequisites: ['division'],
      concepts: ['order-of-operations', 'left-to-right'],
      commonMistakes: ['Dividing 5 × 4 first'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mix-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 50 − 2 × (3 + 7)?', latex: '50 - 2 \\times (3 + 7) = \\text{?}' },
    answer: { type: 'numeric', correct: '30', acceptable: ['30.0', '30.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Parentheses first', latex: '50 - 2 \\times (3 + 7)' },
        { number: 2, description: '3 + 7 = 10', latex: '3 + 7 = 10' },
        { number: 3, description: 'Then multiplication: 2 × 10 = 20', latex: '2 \\times 10 = 20' },
        { number: 4, description: 'Finally: 50 − 20 = 30', latex: '50 - 20 = 30' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Parentheses → Multiplication → Subtraction' },
      { level: 'moderate', text: '(3 + 7) = 10, then 2 × 10 = 20, then 50 − 20' },
      { level: 'explicit', text: '50 − 2 × (3 + 7) = 30' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Complex expressions',
      skills: ['addition', 'multiplication', 'subtraction', 'order-of-operations'],
      prerequisites: ['addition', 'multiplication', 'subtraction'],
      concepts: ['parentheses', 'PEMDAS'],
      commonMistakes: ['Order of operations error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mix-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is (20 − 8) ÷ 3 + 7?', latex: '(20 - 8) \\div 3 + 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '11', acceptable: ['11.0', '11.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Parentheses first', latex: '(20 - 8) \\div 3 + 7' },
        { number: 2, description: '20 − 8 = 12', latex: '20 - 8 = 12' },
        { number: 3, description: 'Then division: 12 ÷ 3 = 4', latex: '12 \\div 3 = 4' },
        { number: 4, description: 'Finally addition: 4 + 7 = 11', latex: '4 + 7 = 11' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Parentheses → Division → Addition' },
      { level: 'moderate', text: '12 ÷ 3 = 4, then 4 + 7' },
      { level: 'explicit', text: '(20 − 8) ÷ 3 + 7 = 11' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Complex expressions',
      skills: ['subtraction', 'division', 'addition', 'order-of-operations'],
      prerequisites: ['subtraction', 'division', 'addition'],
      concepts: ['parentheses', 'PEMDAS'],
      commonMistakes: ['Order of operations error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mix-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 6 × 6 − 6 ÷ 6?', latex: '6 \\times 6 - 6 \\div 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '35', acceptable: ['35.0', '35.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Multiplication and division before subtraction', latex: '6 \\times 6 - 6 \\div 6' },
        { number: 2, description: '6 × 6 = 36', latex: '6 \\times 6 = 36' },
        { number: 3, description: '6 ÷ 6 = 1', latex: '6 \\div 6 = 1' },
        { number: 4, description: '36 − 1 = 35', latex: '36 - 1 = 35' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Do both multiplication and division before subtracting' },
      { level: 'moderate', text: '36 − 1 = 35' },
      { level: 'explicit', text: '6 × 6 − 6 ÷ 6 = 35' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'All four operations',
      skills: ['multiplication', 'division', 'subtraction', 'order-of-operations'],
      prerequisites: ['multiplication', 'division', 'subtraction'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Wrong order'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 65
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mix-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 4 × (15 − 3 × 4)?', latex: '4 \\times (15 - 3 \\times 4) = \\text{?}' },
    answer: { type: 'numeric', correct: '12', acceptable: ['12.0', '12.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Work inside parentheses first', latex: '4 \\times (15 - 3 \\times 4)' },
        { number: 2, description: 'Inside: multiply first: 3 × 4 = 12', latex: '3 \\times 4 = 12' },
        { number: 3, description: 'Then: 15 − 12 = 3', latex: '15 - 12 = 3' },
        { number: 4, description: 'Finally: 4 × 3 = 12', latex: '4 \\times 3 = 12' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Inside parentheses, multiplication before subtraction' },
      { level: 'moderate', text: '15 − 12 = 3, then 4 × 3' },
      { level: 'explicit', text: '4 × (15 − 3 × 4) = 12' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'Nested operations',
      skills: ['multiplication', 'subtraction', 'order-of-operations'],
      prerequisites: ['multiplication', 'subtraction'],
      concepts: ['parentheses', 'PEMDAS', 'nested-operations'],
      commonMistakes: ['Order error inside parentheses'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 75
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-mix-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 72 ÷ 8 + 3 × 5?', latex: '72 \\div 8 + 3 \\times 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '24', acceptable: ['24.0', '24.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Division and multiplication before addition', latex: '72 \\div 8 + 3 \\times 5' },
        { number: 2, description: '72 ÷ 8 = 9', latex: '72 \\div 8 = 9' },
        { number: 3, description: '3 × 5 = 15', latex: '3 \\times 5 = 15' },
        { number: 4, description: '9 + 15 = 24', latex: '9 + 15 = 24' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Do division and multiplication first' },
      { level: 'moderate', text: '9 + 15 = 24' },
      { level: 'explicit', text: '72 ÷ 8 + 3 × 5 = 24' }
    ],
    pedagogy: {
      topic: 'Mixed Operations',
      subTopic: 'All operations',
      skills: ['division', 'multiplication', 'addition', 'order-of-operations'],
      prerequisites: ['division', 'multiplication', 'addition'],
      concepts: ['order-of-operations', 'PEMDAS'],
      commonMistakes: ['Wrong order'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 70
    },
    metadata: { source: 'manual', createdAt: now }
  }
]

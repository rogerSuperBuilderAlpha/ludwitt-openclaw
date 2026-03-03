/**
 * Addition Problems V2 - Grade 1-5
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const ADDITION_PROBLEMS_V2: MathProblemV2[] = [
  // ===== GRADE 1 =====
  {
    id: 'arith-v2-g1-add-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 3 + 2?', latex: '3 + 2 = \\text{?}' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5.0', '5.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 3 on the number line', latex: '3' },
        { number: 2, description: 'Count forward 2 steps: 4, 5', latex: '3 \\rightarrow 4 \\rightarrow 5' },
        { number: 3, description: 'The answer is 5', latex: '3 + 2 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 3 and count forward 2 more numbers' },
      { level: 'moderate', text: 'Count on your fingers: 3, then 4, then 5' },
      { level: 'explicit', text: '3 + 2 = 5' }
    ],
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line from 0 to 10 showing jump from 3 to 5',
        elements: [
          { type: 'line', props: { x1: 0, y1: 50, x2: 200, y2: 50 } },
          { type: 'point', props: { cx: 60, cy: 50 }, label: '3' },
          { type: 'point', props: { cx: 100, cy: 50 }, label: '5' },
          { type: 'arrow', props: { x1: 60, y1: 40, x2: 100, y2: 40 }, label: '+2' }
        ]
      }
    },
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Single-digit addition',
      skills: ['addition', 'counting-forward'],
      prerequisites: [],
      concepts: ['counting-forward', 'number-sense'],
      commonMistakes: ['Counting error', 'Starting from wrong number'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 4 + 5?', latex: '4 + 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 4', latex: '4' },
        { number: 2, description: 'Count forward 5: 5, 6, 7, 8, 9', latex: '4 \\rightarrow 5 \\rightarrow 6 \\rightarrow 7 \\rightarrow 8 \\rightarrow 9' },
        { number: 3, description: 'The answer is 9', latex: '4 + 5 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 4 and count forward 5 more' },
      { level: 'moderate', text: 'Think: 5 + 5 = 10, so 4 + 5 is one less' },
      { level: 'explicit', text: '4 + 5 = 9' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Single-digit addition',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward', 'near-doubles'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 6 + 3?', latex: '6 + 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 6', latex: '6' },
        { number: 2, description: 'Count forward 3: 7, 8, 9', latex: '6 \\rightarrow 7 \\rightarrow 8 \\rightarrow 9' },
        { number: 3, description: 'The answer is 9', latex: '6 + 3 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at the bigger number (6) and count up' },
      { level: 'moderate', text: 'Count: 6, then 7, 8, 9' },
      { level: 'explicit', text: '6 + 3 = 9' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Single-digit addition',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 2 + 7?', latex: '2 + 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at the bigger number: 7', latex: '7' },
        { number: 2, description: 'Count forward 2: 8, 9', latex: '7 \\rightarrow 8 \\rightarrow 9' },
        { number: 3, description: 'The answer is 9', latex: '2 + 7 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'It\'s easier to start at 7 and add 2' },
      { level: 'moderate', text: '7 + 2 is the same as 2 + 7 (commutative property)' },
      { level: 'explicit', text: '2 + 7 = 9' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Single-digit addition',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward', 'commutative-property'],
      commonMistakes: ['Not using bigger number first'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 1 + 8?', latex: '1 + 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Adding 1 gives the next number', latex: '8 + 1' },
        { number: 2, description: 'The next number after 8 is 9', latex: '8 + 1 = 9' },
        { number: 3, description: 'So 1 + 8 = 9', latex: '1 + 8 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Adding 1 to any number gives you the next number' },
      { level: 'moderate', text: 'What comes after 8?' },
      { level: 'explicit', text: '1 + 8 = 9' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Adding with one',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward', 'adding-one'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 5 + 4?', latex: '5 + 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 5', latex: '5' },
        { number: 2, description: 'Count forward 4: 6, 7, 8, 9', latex: '5 \\rightarrow 6 \\rightarrow 7 \\rightarrow 8 \\rightarrow 9' },
        { number: 3, description: 'The answer is 9', latex: '5 + 4 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 5 and count forward 4' },
      { level: 'moderate', text: 'Think: 5 + 5 = 10, so 5 + 4 is one less' },
      { level: 'explicit', text: '5 + 4 = 9' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Single-digit addition',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward', 'near-doubles'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 3 + 6?', latex: '3 + 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at the bigger number: 6', latex: '6' },
        { number: 2, description: 'Count forward 3: 7, 8, 9', latex: '6 \\rightarrow 7 \\rightarrow 8 \\rightarrow 9' },
        { number: 3, description: 'The answer is 9', latex: '3 + 6 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 6 and count forward 3' },
      { level: 'moderate', text: 'You can also start at 3 and count 6, but starting at 6 is faster' },
      { level: 'explicit', text: '3 + 6 = 9' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Single-digit addition',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward', 'commutative-property'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 0 + 7?', latex: '0 + 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '7', acceptable: ['7.0', '7.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Zero is the identity for addition', latex: '0 + a = a' },
        { number: 2, description: 'Adding zero doesn\'t change the number', latex: '0 + 7 = 7' },
        { number: 3, description: 'The answer is 7', latex: '0 + 7 = 7' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Adding zero to any number leaves it unchanged' },
      { level: 'moderate', text: 'Zero is special - it\'s the "do nothing" number for addition' },
      { level: 'explicit', text: '0 + 7 = 7' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Adding with zero',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['identity-property', 'zero'],
      commonMistakes: ['Thinking 0 + 7 = 0'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-009',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 4 + 4?', latex: '4 + 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '8', acceptable: ['8.0', '8.00'] },
    solution: {
      steps: [
        { number: 1, description: 'This is a doubles fact', latex: '4 + 4' },
        { number: 2, description: 'Think of 2 groups of 4', latex: '2 \\times 4 = 8' },
        { number: 3, description: 'The answer is 8', latex: '4 + 4 = 8' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is a "double" - you\'re adding the same number to itself' },
      { level: 'moderate', text: 'Think of it as 2 groups of 4' },
      { level: 'explicit', text: '4 + 4 = 8' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Doubles',
      skills: ['addition', 'doubles'],
      prerequisites: [],
      concepts: ['doubles', 'mental-math'],
      commonMistakes: ['Forgetting doubles facts'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-010',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 9 + 1?', latex: '9 + 1 = \\text{?}' },
    answer: { type: 'numeric', correct: '10', acceptable: ['10.0', '10.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Adding 1 gives the next number', latex: '9 + 1' },
        { number: 2, description: '9 + 1 makes a group of 10', latex: '9 + 1 = 10' },
        { number: 3, description: 'The answer is 10', latex: '9 + 1 = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Adding 1 to 9 completes a group of 10' },
      { level: 'moderate', text: 'What comes after 9?' },
      { level: 'explicit', text: '9 + 1 = 10' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Making ten',
      skills: ['addition', 'making-ten'],
      prerequisites: [],
      concepts: ['making-ten', 'place-value'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-011',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 7 + 2?', latex: '7 + 2 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 7', latex: '7' },
        { number: 2, description: 'Count forward 2: 8, 9', latex: '7 \\rightarrow 8 \\rightarrow 9' },
        { number: 3, description: 'The answer is 9', latex: '7 + 2 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 7 and count forward 2' },
      { level: 'moderate', text: '7, then 8, then 9' },
      { level: 'explicit', text: '7 + 2 = 9' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Single-digit addition',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-012',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 5 + 5?', latex: '5 + 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '10', acceptable: ['10.0', '10.00'] },
    solution: {
      steps: [
        { number: 1, description: 'This is a doubles fact', latex: '5 + 5' },
        { number: 2, description: 'Two fives make ten', latex: '5 + 5 = 10' },
        { number: 3, description: 'The answer is 10', latex: '5 + 5 = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is a doubles fact - 5 doubled' },
      { level: 'moderate', text: 'Think of two hands, each with 5 fingers' },
      { level: 'explicit', text: '5 + 5 = 10' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Doubles',
      skills: ['addition', 'doubles'],
      prerequisites: [],
      concepts: ['doubles', 'making-ten'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-013',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 2 + 3?', latex: '2 + 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5.0', '5.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 2', latex: '2' },
        { number: 2, description: 'Count forward 3: 3, 4, 5', latex: '2 \\rightarrow 3 \\rightarrow 4 \\rightarrow 5' },
        { number: 3, description: 'The answer is 5', latex: '2 + 3 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 2 and count forward 3' },
      { level: 'moderate', text: '2, then 3, 4, 5' },
      { level: 'explicit', text: '2 + 3 = 5' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Single-digit addition',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-014',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 8 + 1?', latex: '8 + 1 = \\text{?}' },
    answer: { type: 'numeric', correct: '9', acceptable: ['9.0', '9.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Adding 1 gives the next number', latex: '8 + 1' },
        { number: 2, description: 'The next number after 8 is 9', latex: '8 + 1 = 9' },
        { number: 3, description: 'The answer is 9', latex: '8 + 1 = 9' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'What number comes right after 8?' },
      { level: 'moderate', text: 'Adding 1 always gives the next counting number' },
      { level: 'explicit', text: '8 + 1 = 9' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Adding with one',
      skills: ['addition'],
      prerequisites: [],
      concepts: ['counting-forward', 'adding-one'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-add-015',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 6 + 4?', latex: '6 + 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '10', acceptable: ['10.0', '10.00'] },
    solution: {
      steps: [
        { number: 1, description: '6 and 4 are complements of 10', latex: '6 + 4' },
        { number: 2, description: 'They make 10 together', latex: '6 + 4 = 10' },
        { number: 3, description: 'The answer is 10', latex: '6 + 4 = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: '6 and 4 are special - they make 10!' },
      { level: 'moderate', text: 'Think of 6 fingers on one hand extended, 4 fingers on the other' },
      { level: 'explicit', text: '6 + 4 = 10' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Making ten',
      skills: ['addition', 'making-ten'],
      prerequisites: [],
      concepts: ['making-ten', 'complements'],
      commonMistakes: ['Counting incorrectly'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 2 =====
  {
    id: 'arith-v2-g2-add-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 15 + 7?', latex: '15 + 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '22', acceptable: ['22.0', '22.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 7 into 5 + 2', latex: '7 = 5 + 2' },
        { number: 2, description: 'Add 5 to 15 to get 20', latex: '15 + 5 = 20' },
        { number: 3, description: 'Add the remaining 2', latex: '20 + 2 = 22' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Break 7 into parts to make a friendly number' },
      { level: 'moderate', text: 'Add 5 first to get to 20, then add 2 more' },
      { level: 'explicit', text: '15 + 7 = 22' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition',
      skills: ['addition', 'mental-math'],
      prerequisites: ['single-digit-addition'],
      concepts: ['making-tens', 'decomposition'],
      commonMistakes: ['Adding ones and tens separately without regrouping'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 27 + 8?', latex: '27 + 8 = \\text{?}' },
    answer: { type: 'numeric', correct: '35', acceptable: ['35.0', '35.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Break 8 into 3 + 5', latex: '8 = 3 + 5' },
        { number: 2, description: 'Add 3 to 27 to get 30', latex: '27 + 3 = 30' },
        { number: 3, description: 'Add the remaining 5', latex: '30 + 5 = 35' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'What do you need to add to 27 to reach 30?' },
      { level: 'moderate', text: '27 + 3 = 30, then add 5 more' },
      { level: 'explicit', text: '27 + 8 = 35' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition with regrouping',
      skills: ['addition', 'regrouping'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'making-tens'],
      commonMistakes: ['Forgetting to regroup'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 23 + 14?', latex: '23 + 14 = \\text{?}' },
    answer: { type: 'numeric', correct: '37', acceptable: ['37.0', '37.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add the tens: 20 + 10', latex: '20 + 10 = 30' },
        { number: 2, description: 'Add the ones: 3 + 4', latex: '3 + 4 = 7' },
        { number: 3, description: 'Combine: 30 + 7', latex: '30 + 7 = 37' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add the tens place first, then the ones place' },
      { level: 'moderate', text: '20 + 10 = 30, and 3 + 4 = 7' },
      { level: 'explicit', text: '23 + 14 = 37' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition (no carry)',
      skills: ['addition', 'place-value'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'partial-sums'],
      commonMistakes: ['Place value confusion'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 36 + 17?', latex: '36 + 17 = \\text{?}' },
    answer: { type: 'numeric', correct: '53', acceptable: ['53.0', '53.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add 4 to reach 40', latex: '36 + 4 = 40' },
        { number: 2, description: 'We used 4 from 17, leaving 13', latex: '17 - 4 = 13' },
        { number: 3, description: 'Add the remaining 13', latex: '40 + 13 = 53' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Get to 40 first, then add what\'s left' },
      { level: 'moderate', text: '36 + 4 = 40, then add 13' },
      { level: 'explicit', text: '36 + 17 = 53' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition with regrouping',
      skills: ['addition', 'regrouping'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'making-tens'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 18 + 25?', latex: '18 + 25 = \\text{?}' },
    answer: { type: 'numeric', correct: '43', acceptable: ['43.0', '43.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add the tens: 10 + 20', latex: '10 + 20 = 30' },
        { number: 2, description: 'Add the ones: 8 + 5', latex: '8 + 5 = 13' },
        { number: 3, description: 'Combine: 30 + 13', latex: '30 + 13 = 43' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Break into tens and ones' },
      { level: 'moderate', text: 'Tens: 10 + 20 = 30. Ones: 8 + 5 = 13' },
      { level: 'explicit', text: '18 + 25 = 43' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition',
      skills: ['addition', 'place-value'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'partial-sums'],
      commonMistakes: ['Place value confusion'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 29 + 16?', latex: '29 + 16 = \\text{?}' },
    answer: { type: 'numeric', correct: '45', acceptable: ['45.0', '45.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add 1 to 29 to get 30', latex: '29 + 1 = 30' },
        { number: 2, description: 'We used 1 from 16, leaving 15', latex: '16 - 1 = 15' },
        { number: 3, description: 'Add: 30 + 15', latex: '30 + 15 = 45' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Make 29 into 30 first' },
      { level: 'moderate', text: '29 + 1 = 30, then add 15' },
      { level: 'explicit', text: '29 + 16 = 45' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition with regrouping',
      skills: ['addition', 'regrouping'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'making-tens'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 35 + 24?', latex: '35 + 24 = \\text{?}' },
    answer: { type: 'numeric', correct: '59', acceptable: ['59.0', '59.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add the tens: 30 + 20', latex: '30 + 20 = 50' },
        { number: 2, description: 'Add the ones: 5 + 4', latex: '5 + 4 = 9' },
        { number: 3, description: 'Combine: 50 + 9', latex: '50 + 9 = 59' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add tens, then add ones' },
      { level: 'moderate', text: 'Tens: 30 + 20 = 50. Ones: 5 + 4 = 9' },
      { level: 'explicit', text: '35 + 24 = 59' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition (no carry)',
      skills: ['addition', 'place-value'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'partial-sums'],
      commonMistakes: ['Place value confusion'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 47 + 28?', latex: '47 + 28 = \\text{?}' },
    answer: { type: 'numeric', correct: '75', acceptable: ['75.0', '75.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add 3 to 47 to get 50', latex: '47 + 3 = 50' },
        { number: 2, description: 'We used 3 from 28, leaving 25', latex: '28 - 3 = 25' },
        { number: 3, description: 'Add: 50 + 25', latex: '50 + 25 = 75' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Make 47 into 50 first' },
      { level: 'moderate', text: '47 + 3 = 50, then add 25' },
      { level: 'explicit', text: '47 + 28 = 75' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition with regrouping',
      skills: ['addition', 'regrouping'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'making-tens'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-009',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 12 + 39?', latex: '12 + 39 = \\text{?}' },
    answer: { type: 'numeric', correct: '51', acceptable: ['51.0', '51.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add the tens: 10 + 30', latex: '10 + 30 = 40' },
        { number: 2, description: 'Add the ones: 2 + 9', latex: '2 + 9 = 11' },
        { number: 3, description: 'Combine: 40 + 11', latex: '40 + 11 = 51' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Break into tens and ones' },
      { level: 'moderate', text: 'Tens: 10 + 30 = 40. Ones: 2 + 9 = 11' },
      { level: 'explicit', text: '12 + 39 = 51' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition',
      skills: ['addition', 'place-value'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'partial-sums'],
      commonMistakes: ['Place value confusion'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-010',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 58 + 19?', latex: '58 + 19 = \\text{?}' },
    answer: { type: 'numeric', correct: '77', acceptable: ['77.0', '77.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add 2 to 58 to get 60', latex: '58 + 2 = 60' },
        { number: 2, description: 'We used 2 from 19, leaving 17', latex: '19 - 2 = 17' },
        { number: 3, description: 'Add: 60 + 17', latex: '60 + 17 = 77' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Make 58 into 60 first' },
      { level: 'moderate', text: '58 + 2 = 60, then add 17' },
      { level: 'explicit', text: '58 + 19 = 77' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition with regrouping',
      skills: ['addition', 'regrouping'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'making-tens'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-011',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 46 + 27?', latex: '46 + 27 = \\text{?}' },
    answer: { type: 'numeric', correct: '73', acceptable: ['73.0', '73.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 6 + 7 = 13', latex: '6 + 7 = 13' },
        { number: 2, description: 'Write 3, carry 1 ten', latex: '\\text{ones} = 3, \\text{carry} = 1' },
        { number: 3, description: 'Add tens: 4 + 2 + 1 = 7', latex: '40 + 20 + 10 = 70' },
        { number: 4, description: 'Combine: 70 + 3', latex: '70 + 3 = 73' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add ones first, remember to carry' },
      { level: 'moderate', text: '6 + 7 = 13, carry the 1 to tens' },
      { level: 'explicit', text: '46 + 27 = 73' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition with regrouping',
      skills: ['addition', 'regrouping'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Forgetting to carry'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-012',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 38 + 45?', latex: '38 + 45 = \\text{?}' },
    answer: { type: 'numeric', correct: '83', acceptable: ['83.0', '83.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add tens: 30 + 40', latex: '30 + 40 = 70' },
        { number: 2, description: 'Add ones: 8 + 5', latex: '8 + 5 = 13' },
        { number: 3, description: 'Combine: 70 + 13', latex: '70 + 13 = 83' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add tens first, then ones' },
      { level: 'moderate', text: '30 + 40 = 70, and 8 + 5 = 13' },
      { level: 'explicit', text: '38 + 45 = 83' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition',
      skills: ['addition', 'place-value'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'partial-sums'],
      commonMistakes: ['Place value confusion'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-013',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 50 + 34?', latex: '50 + 34 = \\text{?}' },
    answer: { type: 'numeric', correct: '84', acceptable: ['84.0', '84.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add tens: 50 + 30', latex: '50 + 30 = 80' },
        { number: 2, description: 'Add ones: 0 + 4', latex: '0 + 4 = 4' },
        { number: 3, description: 'Combine: 80 + 4', latex: '80 + 4 = 84' }
      ]
    },
    hints: [
      { level: 'gentle', text: '50 is already a round number, just add 34' },
      { level: 'moderate', text: '50 + 30 = 80, then add 4' },
      { level: 'explicit', text: '50 + 34 = 84' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition',
      skills: ['addition', 'place-value'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value'],
      commonMistakes: ['Place value confusion'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 45
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-014',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 67 + 25?', latex: '67 + 25 = \\text{?}' },
    answer: { type: 'numeric', correct: '92', acceptable: ['92.0', '92.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 7 + 5 = 12', latex: '7 + 5 = 12' },
        { number: 2, description: 'Add tens: 60 + 20 = 80, plus carried 10 = 90', latex: '60 + 20 + 10 = 90' },
        { number: 3, description: 'Combine: 90 + 2', latex: '90 + 2 = 92' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add ones first, carry the extra ten' },
      { level: 'moderate', text: '7 + 5 = 12, carry 1 ten' },
      { level: 'explicit', text: '67 + 25 = 92' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Two-digit addition with regrouping',
      skills: ['addition', 'regrouping'],
      prerequisites: ['single-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Forgetting to carry'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-add-015',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 44 + 44?', latex: '44 + 44 = \\text{?}' },
    answer: { type: 'numeric', correct: '88', acceptable: ['88.0', '88.00'] },
    solution: {
      steps: [
        { number: 1, description: 'This is doubling 44', latex: '44 \\times 2' },
        { number: 2, description: 'Double the tens: 40 × 2 = 80', latex: '40 \\times 2 = 80' },
        { number: 3, description: 'Double the ones: 4 × 2 = 8', latex: '4 \\times 2 = 8' },
        { number: 4, description: 'Combine: 80 + 8', latex: '80 + 8 = 88' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is a doubles problem - you\'re doubling 44' },
      { level: 'moderate', text: 'Double 40 to get 80, double 4 to get 8' },
      { level: 'explicit', text: '44 + 44 = 88' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Doubles',
      skills: ['addition', 'doubles'],
      prerequisites: ['single-digit-addition'],
      concepts: ['doubles', 'mental-math'],
      commonMistakes: ['Calculation error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 3 (no new addition, focuses on multiplication) =====
  // ===== GRADE 4 =====
  {
    id: 'arith-v2-g4-add-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 347 + 158?', latex: '347 + 158 = \\text{?}' },
    answer: { type: 'numeric', correct: '505', acceptable: ['505.0', '505.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 7 + 8 = 15', latex: '7 + 8 = 15' },
        { number: 2, description: 'Write 5, carry 1', latex: '\\text{ones} = 5, \\text{carry} = 1' },
        { number: 3, description: 'Add tens: 4 + 5 + 1 = 10', latex: '4 + 5 + 1 = 10' },
        { number: 4, description: 'Write 0, carry 1', latex: '\\text{tens} = 0, \\text{carry} = 1' },
        { number: 5, description: 'Add hundreds: 3 + 1 + 1 = 5', latex: '3 + 1 + 1 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add column by column from right to left' },
      { level: 'moderate', text: '7 + 8 = 15, carry 1. 4 + 5 + 1 = 10, carry 1' },
      { level: 'explicit', text: '347 + 158 = 505' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Three-digit addition with regrouping',
      skills: ['addition', 'regrouping'],
      prerequisites: ['two-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Carrying error', 'Place value confusion'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-add-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 586 + 247?', latex: '586 + 247 = \\text{?}' },
    answer: { type: 'numeric', correct: '833', acceptable: ['833.0', '833.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 6 + 7 = 13', latex: '6 + 7 = 13' },
        { number: 2, description: 'Write 3, carry 1', latex: '\\text{ones} = 3' },
        { number: 3, description: 'Add tens: 8 + 4 + 1 = 13', latex: '8 + 4 + 1 = 13' },
        { number: 4, description: 'Write 3, carry 1', latex: '\\text{tens} = 3' },
        { number: 5, description: 'Add hundreds: 5 + 2 + 1 = 8', latex: '5 + 2 + 1 = 8' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add column by column, carry when needed' },
      { level: 'moderate', text: 'Ones: 13 (carry 1). Tens: 13 (carry 1). Hundreds: 8' },
      { level: 'explicit', text: '586 + 247 = 833' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Three-digit addition',
      skills: ['addition', 'regrouping'],
      prerequisites: ['two-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-add-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 499 + 302?', latex: '499 + 302 = \\text{?}' },
    answer: { type: 'numeric', correct: '801', acceptable: ['801.0', '801.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 9 + 2 = 11', latex: '9 + 2 = 11' },
        { number: 2, description: 'Write 1, carry 1', latex: '\\text{ones} = 1' },
        { number: 3, description: 'Add tens: 9 + 0 + 1 = 10', latex: '9 + 0 + 1 = 10' },
        { number: 4, description: 'Write 0, carry 1', latex: '\\text{tens} = 0' },
        { number: 5, description: 'Add hundreds: 4 + 3 + 1 = 8', latex: '4 + 3 + 1 = 8' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think: 499 is close to 500' },
      { level: 'moderate', text: '500 + 302 = 802, but 499 is 1 less than 500' },
      { level: 'explicit', text: '499 + 302 = 801' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Three-digit addition',
      skills: ['addition', 'regrouping'],
      prerequisites: ['two-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 75
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-add-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 275 + 389?', latex: '275 + 389 = \\text{?}' },
    answer: { type: 'numeric', correct: '664', acceptable: ['664.0', '664.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 5 + 9 = 14', latex: '5 + 9 = 14' },
        { number: 2, description: 'Add tens: 7 + 8 + 1 = 16', latex: '7 + 8 + 1 = 16' },
        { number: 3, description: 'Add hundreds: 2 + 3 + 1 = 6', latex: '2 + 3 + 1 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Line up the digits by place value' },
      { level: 'moderate', text: 'Remember to carry when the sum is 10 or more' },
      { level: 'explicit', text: '275 + 389 = 664' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Three-digit addition',
      skills: ['addition', 'regrouping'],
      prerequisites: ['two-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-add-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 456 + 278?', latex: '456 + 278 = \\text{?}' },
    answer: { type: 'numeric', correct: '734', acceptable: ['734.0', '734.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 6 + 8 = 14', latex: '6 + 8 = 14' },
        { number: 2, description: 'Add tens: 5 + 7 + 1 = 13', latex: '5 + 7 + 1 = 13' },
        { number: 3, description: 'Add hundreds: 4 + 2 + 1 = 7', latex: '4 + 2 + 1 = 7' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add from right to left' },
      { level: 'moderate', text: 'Carry when sum >= 10' },
      { level: 'explicit', text: '456 + 278 = 734' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Three-digit addition',
      skills: ['addition', 'regrouping'],
      prerequisites: ['two-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 5 =====
  {
    id: 'arith-v2-g5-add-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 1,247 + 865?', latex: '1{,}247 + 865 = \\text{?}' },
    answer: { type: 'numeric', correct: '2112', acceptable: ['2112.0', '2,112'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 7 + 5 = 12', latex: '7 + 5 = 12' },
        { number: 2, description: 'Add tens: 4 + 6 + 1 = 11', latex: '4 + 6 + 1 = 11' },
        { number: 3, description: 'Add hundreds: 2 + 8 + 1 = 11', latex: '2 + 8 + 1 = 11' },
        { number: 4, description: 'Add thousands: 1 + 0 + 1 = 2', latex: '1 + 0 + 1 = 2' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add column by column, carrying as needed' },
      { level: 'moderate', text: 'Each column has a sum >= 10, so carry each time' },
      { level: 'explicit', text: '1,247 + 865 = 2,112' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Four-digit addition',
      skills: ['addition', 'regrouping'],
      prerequisites: ['three-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Carrying error', 'Place value confusion'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 90
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-add-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 2,456 + 1,789?', latex: '2{,}456 + 1{,}789 = \\text{?}' },
    answer: { type: 'numeric', correct: '4245', acceptable: ['4245.0', '4,245'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 6 + 9 = 15', latex: '6 + 9 = 15' },
        { number: 2, description: 'Add tens: 5 + 8 + 1 = 14', latex: '5 + 8 + 1 = 14' },
        { number: 3, description: 'Add hundreds: 4 + 7 + 1 = 12', latex: '4 + 7 + 1 = 12' },
        { number: 4, description: 'Add thousands: 2 + 1 + 1 = 4', latex: '2 + 1 + 1 = 4' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Work from right to left, column by column' },
      { level: 'moderate', text: 'You\'ll need to carry in every column' },
      { level: 'explicit', text: '2,456 + 1,789 = 4,245' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Four-digit addition',
      skills: ['addition', 'regrouping'],
      prerequisites: ['three-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 95
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-add-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 3,500 + 2,750?', latex: '3{,}500 + 2{,}750 = \\text{?}' },
    answer: { type: 'numeric', correct: '6250', acceptable: ['6250.0', '6,250'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 0 + 0 = 0', latex: '0 + 0 = 0' },
        { number: 2, description: 'Add tens: 0 + 5 = 5', latex: '0 + 5 = 5' },
        { number: 3, description: 'Add hundreds: 5 + 7 = 12', latex: '5 + 7 = 12' },
        { number: 4, description: 'Add thousands: 3 + 2 + 1 = 6', latex: '3 + 2 + 1 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'These are round numbers, easier to add' },
      { level: 'moderate', text: '3500 + 2500 = 6000, then add 250 more' },
      { level: 'explicit', text: '3,500 + 2,750 = 6,250' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Four-digit addition',
      skills: ['addition', 'mental-math'],
      prerequisites: ['three-digit-addition'],
      concepts: ['place-value'],
      commonMistakes: ['Place value confusion'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 75
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-add-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 4,567 + 3,456?', latex: '4{,}567 + 3{,}456 = \\text{?}' },
    answer: { type: 'numeric', correct: '8023', acceptable: ['8023.0', '8,023'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 7 + 6 = 13', latex: '7 + 6 = 13' },
        { number: 2, description: 'Add tens: 6 + 5 + 1 = 12', latex: '6 + 5 + 1 = 12' },
        { number: 3, description: 'Add hundreds: 5 + 4 + 1 = 10', latex: '5 + 4 + 1 = 10' },
        { number: 4, description: 'Add thousands: 4 + 3 + 1 = 8', latex: '4 + 3 + 1 = 8' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Add each column carefully' },
      { level: 'moderate', text: 'Every column needs carrying' },
      { level: 'explicit', text: '4,567 + 3,456 = 8,023' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Four-digit addition',
      skills: ['addition', 'regrouping'],
      prerequisites: ['three-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Carrying error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 95
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-add-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 5,999 + 1?', latex: '5{,}999 + 1 = \\text{?}' },
    answer: { type: 'numeric', correct: '6000', acceptable: ['6000.0', '6,000'] },
    solution: {
      steps: [
        { number: 1, description: 'Add ones: 9 + 1 = 10', latex: '9 + 1 = 10' },
        { number: 2, description: 'Each 9 becomes 0 with a carry', latex: '9 + 1 = 10' },
        { number: 3, description: 'Final carry goes to 5', latex: '5 + 1 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'What comes after 5,999?' },
      { level: 'moderate', text: 'Adding 1 to 9 causes a cascade of carries' },
      { level: 'explicit', text: '5,999 + 1 = 6,000' }
    ],
    pedagogy: {
      topic: 'Addition',
      subTopic: 'Adding to 9s',
      skills: ['addition', 'regrouping'],
      prerequisites: ['three-digit-addition'],
      concepts: ['place-value', 'carrying'],
      commonMistakes: ['Forgetting cascade of carries'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  }
]

/**
 * Subtraction Problems V2 - Grade 1-5
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const SUBTRACTION_PROBLEMS_V2: MathProblemV2[] = [
  // ===== GRADE 1 =====
  {
    id: 'arith-v2-g1-sub-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 7 − 4?', latex: '7 - 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '3', acceptable: ['3.0', '3.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 7 on the number line', latex: '7' },
        { number: 2, description: 'Count backward 4 steps: 6, 5, 4, 3', latex: '7 \\rightarrow 6 \\rightarrow 5 \\rightarrow 4 \\rightarrow 3' },
        { number: 3, description: 'The answer is 3', latex: '7 - 4 = 3' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 7 and count backward 4 times' },
      { level: 'moderate', text: 'Count: 7, 6, 5, 4, 3 (that\'s 4 jumps back)' },
      { level: 'explicit', text: '7 − 4 = 3' }
    ],
    visuals: {
      diagram: {
        type: 'number-line',
        description: 'Number line from 0 to 10 showing jump from 7 to 3',
        elements: [
          { type: 'line', props: { x1: 0, y1: 50, x2: 200, y2: 50 } },
          { type: 'point', props: { cx: 140, cy: 50 }, label: '7' },
          { type: 'point', props: { cx: 60, cy: 50 }, label: '3' },
          { type: 'arrow', props: { x1: 140, y1: 40, x2: 60, y2: 40 }, label: '−4' }
        ]
      }
    },
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Single-digit subtraction',
      skills: ['subtraction', 'counting-backward'],
      prerequisites: ['addition'],
      concepts: ['counting-backward', 'number-sense'],
      commonMistakes: ['Counting error', 'Direction confusion'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 9 − 5?', latex: '9 - 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '4', acceptable: ['4.0', '4.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 9', latex: '9' },
        { number: 2, description: 'Count backward 5: 8, 7, 6, 5, 4', latex: '9 \\rightarrow 8 \\rightarrow 7 \\rightarrow 6 \\rightarrow 5 \\rightarrow 4' },
        { number: 3, description: 'The answer is 4', latex: '9 - 5 = 4' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 9 and count backward 5 times' },
      { level: 'moderate', text: 'Think: what plus 5 equals 9?' },
      { level: 'explicit', text: '9 − 5 = 4' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Single-digit subtraction',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 8 − 3?', latex: '8 - 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5.0', '5.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 8', latex: '8' },
        { number: 2, description: 'Count backward 3: 7, 6, 5', latex: '8 \\rightarrow 7 \\rightarrow 6 \\rightarrow 5' },
        { number: 3, description: 'The answer is 5', latex: '8 - 3 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 8 and count backward 3 times' },
      { level: 'moderate', text: 'Think: 8, 7, 6, 5 (three jumps back)' },
      { level: 'explicit', text: '8 − 3 = 5' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Single-digit subtraction',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 10 − 6?', latex: '10 - 6 = \\text{?}' },
    answer: { type: 'numeric', correct: '4', acceptable: ['4.0', '4.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: what plus 6 makes 10?', latex: '? + 6 = 10' },
        { number: 2, description: 'Count up from 6 to 10: 7, 8, 9, 10', latex: '6 \\rightarrow 7 \\rightarrow 8 \\rightarrow 9 \\rightarrow 10' },
        { number: 3, description: 'That\'s 4 jumps, so the answer is 4', latex: '10 - 6 = 4' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'What number plus 6 equals 10?' },
      { level: 'moderate', text: 'Count up from 6 to 10: how many jumps?' },
      { level: 'explicit', text: '10 − 6 = 4' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting from 10',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward', 'complements-of-ten'],
      commonMistakes: ['Direction confusion'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 6 − 2?', latex: '6 - 2 = \\text{?}' },
    answer: { type: 'numeric', correct: '4', acceptable: ['4.0', '4.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 6', latex: '6' },
        { number: 2, description: 'Count backward 2: 5, 4', latex: '6 \\rightarrow 5 \\rightarrow 4' },
        { number: 3, description: 'The answer is 4', latex: '6 - 2 = 4' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 6 and count backward 2' },
      { level: 'moderate', text: '6, then 5, then 4' },
      { level: 'explicit', text: '6 − 2 = 4' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Single-digit subtraction',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 5 − 1?', latex: '5 - 1 = \\text{?}' },
    answer: { type: 'numeric', correct: '4', acceptable: ['4.0', '4.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Subtracting 1 gives the previous number', latex: '5 - 1' },
        { number: 2, description: 'The number before 5 is 4', latex: '5 - 1 = 4' },
        { number: 3, description: 'The answer is 4', latex: '5 - 1 = 4' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Subtracting 1 gives you the number right before' },
      { level: 'moderate', text: 'What comes before 5?' },
      { level: 'explicit', text: '5 − 1 = 4' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting one',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward', 'subtracting-one'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 10 − 4?', latex: '10 - 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 10', latex: '10' },
        { number: 2, description: 'Count backward 4: 9, 8, 7, 6', latex: '10 \\rightarrow 9 \\rightarrow 8 \\rightarrow 7 \\rightarrow 6' },
        { number: 3, description: 'The answer is 6', latex: '10 - 4 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 10 and count backward 4' },
      { level: 'moderate', text: '4 + ? = 10' },
      { level: 'explicit', text: '10 − 4 = 6' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting from 10',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward', 'complements-of-ten'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 5 − 2?', latex: '5 - 2 = \\text{?}' },
    answer: { type: 'numeric', correct: '3', acceptable: ['3.0', '3.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 5', latex: '5' },
        { number: 2, description: 'Count backward 2: 4, 3', latex: '5 \\rightarrow 4 \\rightarrow 3' },
        { number: 3, description: 'The answer is 3', latex: '5 - 2 = 3' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 5 and count backward 2' },
      { level: 'moderate', text: '5, then 4, then 3' },
      { level: 'explicit', text: '5 − 2 = 3' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Single-digit subtraction',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-009',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 9 − 3?', latex: '9 - 3 = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 9', latex: '9' },
        { number: 2, description: 'Count backward 3: 8, 7, 6', latex: '9 \\rightarrow 8 \\rightarrow 7 \\rightarrow 6' },
        { number: 3, description: 'The answer is 6', latex: '9 - 3 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 9 and count backward 3' },
      { level: 'moderate', text: '9, 8, 7, 6 (three jumps)' },
      { level: 'explicit', text: '9 − 3 = 6' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Single-digit subtraction',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-010',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 7 − 7?', latex: '7 - 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '0', acceptable: ['0.0', '0.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Any number minus itself equals zero', latex: 'a - a = 0' },
        { number: 2, description: '7 minus 7 equals 0', latex: '7 - 7 = 0' },
        { number: 3, description: 'The answer is 0', latex: '7 - 7 = 0' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'What happens when you take away all 7?' },
      { level: 'moderate', text: 'Any number minus itself is zero' },
      { level: 'explicit', text: '7 − 7 = 0' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting same number',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['zero', 'identity'],
      commonMistakes: ['Thinking result is 7'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-011',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 10 − 7?', latex: '10 - 7 = \\text{?}' },
    answer: { type: 'numeric', correct: '3', acceptable: ['3.0', '3.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Think: 7 + ? = 10', latex: '7 + ? = 10' },
        { number: 2, description: '7 + 3 = 10', latex: '7 + 3 = 10' },
        { number: 3, description: 'So 10 − 7 = 3', latex: '10 - 7 = 3' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think: 7 plus what equals 10?' },
      { level: 'moderate', text: 'Count from 7 to 10: 8, 9, 10 (that\'s 3)' },
      { level: 'explicit', text: '10 − 7 = 3' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting from 10',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['complements-of-ten'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-012',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 6 − 0?', latex: '6 - 0 = \\text{?}' },
    answer: { type: 'numeric', correct: '6', acceptable: ['6.0', '6.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Subtracting zero leaves the number unchanged', latex: 'a - 0 = a' },
        { number: 2, description: '6 minus 0 equals 6', latex: '6 - 0 = 6' },
        { number: 3, description: 'The answer is 6', latex: '6 - 0 = 6' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'If you take away nothing, what do you have?' },
      { level: 'moderate', text: 'Subtracting zero doesn\'t change anything' },
      { level: 'explicit', text: '6 − 0 = 6' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting zero',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['zero', 'identity'],
      commonMistakes: ['Thinking result is 0'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-013',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 8 − 5?', latex: '8 - 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '3', acceptable: ['3.0', '3.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 8', latex: '8' },
        { number: 2, description: 'Count backward 5: 7, 6, 5, 4, 3', latex: '8 \\rightarrow 7 \\rightarrow 6 \\rightarrow 5 \\rightarrow 4 \\rightarrow 3' },
        { number: 3, description: 'The answer is 3', latex: '8 - 5 = 3' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 8 and count backward 5' },
      { level: 'moderate', text: 'Or think: 5 + ? = 8' },
      { level: 'explicit', text: '8 − 5 = 3' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Single-digit subtraction',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-014',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 10 − 5?', latex: '10 - 5 = \\text{?}' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5.0', '5.00'] },
    solution: {
      steps: [
        { number: 1, description: '10 split in half is 5 and 5', latex: '10 = 5 + 5' },
        { number: 2, description: 'Take away one 5, you have 5 left', latex: '10 - 5 = 5' },
        { number: 3, description: 'The answer is 5', latex: '10 - 5 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Half of 10 is 5' },
      { level: 'moderate', text: '5 + 5 = 10, so 10 − 5 = 5' },
      { level: 'explicit', text: '10 − 5 = 5' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting from 10',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['halving', 'doubles'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 35
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g1-sub-015',
    version: 2,
    type: 'arithmetic',
    difficulty: 1.0,
    gradeLevel: 1,
    question: { text: 'What is 9 − 4?', latex: '9 - 4 = \\text{?}' },
    answer: { type: 'numeric', correct: '5', acceptable: ['5.0', '5.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Start at 9', latex: '9' },
        { number: 2, description: 'Count backward 4: 8, 7, 6, 5', latex: '9 \\rightarrow 8 \\rightarrow 7 \\rightarrow 6 \\rightarrow 5' },
        { number: 3, description: 'The answer is 5', latex: '9 - 4 = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Start at 9 and count backward 4' },
      { level: 'moderate', text: '4 + 5 = 9, so 9 − 4 = 5' },
      { level: 'explicit', text: '9 − 4 = 5' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Single-digit subtraction',
      skills: ['subtraction'],
      prerequisites: ['addition'],
      concepts: ['counting-backward'],
      commonMistakes: ['Counting error'],
      scaffoldingLevel: 'extensive',
      timeEstimate: 40
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 2 =====
  {
    id: 'arith-v2-g2-sub-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 34 − 18?', latex: '34 - 18 = \\text{?}' },
    answer: { type: 'numeric', correct: '16', acceptable: ['16.0', '16.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Can\'t subtract 8 from 4, need to borrow', latex: '34 = 20 + 14' },
        { number: 2, description: 'Subtract ones: 14 − 8 = 6', latex: '14 - 8 = 6' },
        { number: 3, description: 'Subtract tens: 20 − 10 = 10', latex: '20 - 10 = 10' },
        { number: 4, description: 'Combine: 10 + 6 = 16', latex: '10 + 6 = 16' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'You\'ll need to borrow from the tens place' },
      { level: 'moderate', text: 'Rewrite 34 as 20 + 14, then subtract' },
      { level: 'explicit', text: '34 − 18 = 16' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error', 'Direction confusion'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 42 − 15?', latex: '42 - 15 = \\text{?}' },
    answer: { type: 'numeric', correct: '27', acceptable: ['27.0', '27.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Can\'t subtract 5 from 2, borrow', latex: '42 = 30 + 12' },
        { number: 2, description: 'Subtract ones: 12 − 5 = 7', latex: '12 - 5 = 7' },
        { number: 3, description: 'Subtract tens: 30 − 10 = 20', latex: '30 - 10 = 20' },
        { number: 4, description: 'Combine: 20 + 7 = 27', latex: '20 + 7 = 27' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Since 5 > 2, you need to borrow' },
      { level: 'moderate', text: '42 = 30 + 12, now subtract 15' },
      { level: 'explicit', text: '42 − 15 = 27' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 50 − 23?', latex: '50 - 23 = \\text{?}' },
    answer: { type: 'numeric', correct: '27', acceptable: ['27.0', '27.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Subtract tens first: 50 − 20 = 30', latex: '50 - 20 = 30' },
        { number: 2, description: 'Subtract ones: 30 − 3 = 27', latex: '30 - 3 = 27' },
        { number: 3, description: 'The answer is 27', latex: '50 - 23 = 27' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Subtract the tens first, then the ones' },
      { level: 'moderate', text: '50 − 20 = 30, then subtract 3' },
      { level: 'explicit', text: '50 − 23 = 27' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction',
      skills: ['subtraction'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['place-value'],
      commonMistakes: ['Place value confusion'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 50
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 61 − 28?', latex: '61 - 28 = \\text{?}' },
    answer: { type: 'numeric', correct: '33', acceptable: ['33.0', '33.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Can\'t subtract 8 from 1, borrow', latex: '61 = 50 + 11' },
        { number: 2, description: 'Subtract ones: 11 − 8 = 3', latex: '11 - 8 = 3' },
        { number: 3, description: 'Subtract tens: 50 − 20 = 30', latex: '50 - 20 = 30' },
        { number: 4, description: 'Combine: 30 + 3 = 33', latex: '30 + 3 = 33' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Borrow from the tens place' },
      { level: 'moderate', text: '61 = 50 + 11, then subtract 28' },
      { level: 'explicit', text: '61 − 28 = 33' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 73 − 46?', latex: '73 - 46 = \\text{?}' },
    answer: { type: 'numeric', correct: '27', acceptable: ['27.0', '27.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Can\'t subtract 6 from 3, borrow', latex: '73 = 60 + 13' },
        { number: 2, description: 'Subtract ones: 13 − 6 = 7', latex: '13 - 6 = 7' },
        { number: 3, description: 'Subtract tens: 60 − 40 = 20', latex: '60 - 40 = 20' },
        { number: 4, description: 'Combine: 20 + 7 = 27', latex: '20 + 7 = 27' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Since 6 > 3, borrow from tens' },
      { level: 'moderate', text: '73 = 60 + 13, then subtract 46' },
      { level: 'explicit', text: '73 − 46 = 27' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-006',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 85 − 37?', latex: '85 - 37 = \\text{?}' },
    answer: { type: 'numeric', correct: '48', acceptable: ['48.0', '48.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Can\'t subtract 7 from 5, borrow', latex: '85 = 70 + 15' },
        { number: 2, description: 'Subtract ones: 15 − 7 = 8', latex: '15 - 7 = 8' },
        { number: 3, description: 'Subtract tens: 70 − 30 = 40', latex: '70 - 30 = 40' },
        { number: 4, description: 'Combine: 40 + 8 = 48', latex: '40 + 8 = 48' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Since 7 > 5, you\'ll need to borrow' },
      { level: 'moderate', text: '85 = 70 + 15, then subtract 37' },
      { level: 'explicit', text: '85 − 37 = 48' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-007',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 52 − 38?', latex: '52 - 38 = \\text{?}' },
    answer: { type: 'numeric', correct: '14', acceptable: ['14.0', '14.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Can\'t subtract 8 from 2, borrow', latex: '52 = 40 + 12' },
        { number: 2, description: 'Subtract ones: 12 − 8 = 4', latex: '12 - 8 = 4' },
        { number: 3, description: 'Subtract tens: 40 − 30 = 10', latex: '40 - 30 = 10' },
        { number: 4, description: 'Combine: 10 + 4 = 14', latex: '10 + 4 = 14' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Borrow from the 5 in the tens place' },
      { level: 'moderate', text: '52 = 40 + 12, then subtract 38' },
      { level: 'explicit', text: '52 − 38 = 14' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-008',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 67 − 29?', latex: '67 - 29 = \\text{?}' },
    answer: { type: 'numeric', correct: '38', acceptable: ['38.0', '38.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Can\'t subtract 9 from 7, borrow', latex: '67 = 50 + 17' },
        { number: 2, description: 'Subtract ones: 17 − 9 = 8', latex: '17 - 9 = 8' },
        { number: 3, description: 'Subtract tens: 50 − 20 = 30', latex: '50 - 20 = 30' },
        { number: 4, description: 'Combine: 30 + 8 = 38', latex: '30 + 8 = 38' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Borrow from the tens place' },
      { level: 'moderate', text: '67 = 50 + 17, then subtract 29' },
      { level: 'explicit', text: '67 − 29 = 38' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-009',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 91 − 47?', latex: '91 - 47 = \\text{?}' },
    answer: { type: 'numeric', correct: '44', acceptable: ['44.0', '44.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Borrow: 91 = 80 + 11', latex: '91 = 80 + 11' },
        { number: 2, description: 'Subtract ones: 11 − 7 = 4', latex: '11 - 7 = 4' },
        { number: 3, description: 'Subtract tens: 80 − 40 = 40', latex: '80 - 40 = 40' },
        { number: 4, description: 'Combine: 40 + 4 = 44', latex: '40 + 4 = 44' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Since 7 > 1, borrow from 9' },
      { level: 'moderate', text: '91 = 80 + 11, then subtract 47' },
      { level: 'explicit', text: '91 − 47 = 44' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g2-sub-010',
    version: 2,
    type: 'arithmetic',
    difficulty: 2.0,
    gradeLevel: 2,
    question: { text: 'What is 80 − 35?', latex: '80 - 35 = \\text{?}' },
    answer: { type: 'numeric', correct: '45', acceptable: ['45.0', '45.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Borrow from tens: 80 = 70 + 10', latex: '80 = 70 + 10' },
        { number: 2, description: 'Subtract ones: 10 − 5 = 5', latex: '10 - 5 = 5' },
        { number: 3, description: 'Subtract tens: 70 − 30 = 40', latex: '70 - 30 = 40' },
        { number: 4, description: 'Combine: 40 + 5 = 45', latex: '40 + 5 = 45' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'You need to borrow since there are 0 ones' },
      { level: 'moderate', text: '80 = 70 + 10, then subtract 35' },
      { level: 'explicit', text: '80 − 35 = 45' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Two-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['single-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing from round numbers'],
      scaffoldingLevel: 'moderate',
      timeEstimate: 55
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 4 =====
  {
    id: 'arith-v2-g4-sub-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 403 − 178?', latex: '403 - 178 = \\text{?}' },
    answer: { type: 'numeric', correct: '225', acceptable: ['225.0', '225.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Can\'t subtract 8 from 3, need to borrow', latex: '403 \\rightarrow 393 + 10 + 3' },
        { number: 2, description: 'Regroup: 403 = 390 + 13', latex: '403 = 390 + 13' },
        { number: 3, description: 'Subtract ones: 13 − 8 = 5', latex: '13 - 8 = 5' },
        { number: 4, description: 'Subtract tens: 9 − 7 = 2', latex: '9 - 7 = 2' },
        { number: 5, description: 'Subtract hundreds: 3 − 1 = 2', latex: '3 - 1 = 2' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'You need to borrow from the 0 in the tens place' },
      { level: 'moderate', text: 'Borrow from hundreds first, then from tens' },
      { level: 'explicit', text: '403 − 178 = 225' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Three-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['two-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing across zeros'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 85
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-sub-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 724 − 359?', latex: '724 - 359 = \\text{?}' },
    answer: { type: 'numeric', correct: '365', acceptable: ['365.0', '365.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Borrow for ones: 14 − 9 = 5', latex: '14 - 9 = 5' },
        { number: 2, description: 'Borrow for tens: 11 − 5 = 6', latex: '11 - 5 = 6' },
        { number: 3, description: 'Subtract hundreds: 6 − 3 = 3', latex: '6 - 3 = 3' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'You\'ll need to borrow in both ones and tens' },
      { level: 'moderate', text: 'Work right to left, borrowing as needed' },
      { level: 'explicit', text: '724 − 359 = 365' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Three-digit subtraction with regrouping',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['two-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error', 'Direction confusion'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 85
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-sub-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 500 − 237?', latex: '500 - 237 = \\text{?}' },
    answer: { type: 'numeric', correct: '263', acceptable: ['263.0', '263.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Regroup 500 = 499 + 1 = 490 + 10', latex: '500 = 490 + 10' },
        { number: 2, description: 'Actually 500 = 400 + 90 + 10', latex: '500 = 400 + 90 + 10' },
        { number: 3, description: 'Subtract: 10 − 7 = 3', latex: '10 - 7 = 3' },
        { number: 4, description: 'Subtract: 90 − 30 = 60', latex: '90 - 30 = 60' },
        { number: 5, description: 'Subtract: 400 − 200 = 200', latex: '400 - 200 = 200' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Borrowing across zeros takes multiple steps' },
      { level: 'moderate', text: 'Think: 500 = 400 + 90 + 10' },
      { level: 'explicit', text: '500 − 237 = 263' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting from round numbers',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['two-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing across zeros'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-sub-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 852 − 467?', latex: '852 - 467 = \\text{?}' },
    answer: { type: 'numeric', correct: '385', acceptable: ['385.0', '385.00'] },
    solution: {
      steps: [
        { number: 1, description: 'Subtract ones: 12 − 7 = 5 (after borrowing)', latex: '12 - 7 = 5' },
        { number: 2, description: 'Subtract tens: 4 − 6, borrow to get 14 − 6 = 8', latex: '14 - 6 = 8' },
        { number: 3, description: 'Subtract hundreds: 7 − 4 = 3', latex: '7 - 4 = 3' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Work column by column, borrowing when needed' },
      { level: 'moderate', text: 'Both ones and tens need borrowing' },
      { level: 'explicit', text: '852 − 467 = 385' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Three-digit subtraction',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['two-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g4-sub-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: { text: 'What is 600 − 254?', latex: '600 - 254 = \\text{?}' },
    answer: { type: 'numeric', correct: '346', acceptable: ['346.0', '346.00'] },
    solution: {
      steps: [
        { number: 1, description: '600 = 500 + 90 + 10', latex: '600 = 500 + 90 + 10' },
        { number: 2, description: 'Subtract ones: 10 − 4 = 6', latex: '10 - 4 = 6' },
        { number: 3, description: 'Subtract tens: 90 − 50 = 40', latex: '90 - 50 = 40' },
        { number: 4, description: 'Subtract hundreds: 500 − 200 = 300', latex: '500 - 200 = 300' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Rewrite 600 before subtracting' },
      { level: 'moderate', text: '600 = 500 + 90 + 10' },
      { level: 'explicit', text: '600 − 254 = 346' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting from round numbers',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['two-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing across zeros'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 80
    },
    metadata: { source: 'manual', createdAt: now }
  },
  // ===== GRADE 5 =====
  {
    id: 'arith-v2-g5-sub-001',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 3,000 − 1,247?', latex: '3{,}000 - 1{,}247 = \\text{?}' },
    answer: { type: 'numeric', correct: '1753', acceptable: ['1753.0', '1,753'] },
    solution: {
      steps: [
        { number: 1, description: 'Regroup 3000 = 2990 + 10', latex: '3000 = 2000 + 900 + 90 + 10' },
        { number: 2, description: 'Subtract ones: 10 − 7 = 3', latex: '10 - 7 = 3' },
        { number: 3, description: 'Subtract tens: 90 − 40 = 50', latex: '90 - 40 = 50' },
        { number: 4, description: 'Subtract hundreds: 900 − 200 = 700', latex: '900 - 200 = 700' },
        { number: 5, description: 'Subtract thousands: 2000 − 1000 = 1000', latex: '2000 - 1000 = 1000' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'You\'ll need to borrow across multiple zeros' },
      { level: 'moderate', text: 'Rewrite 3000 as 2000 + 900 + 90 + 10' },
      { level: 'explicit', text: '3,000 − 1,247 = 1,753' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting across zeros',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['three-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing across multiple zeros'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 95
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-sub-002',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 5,432 − 2,789?', latex: '5{,}432 - 2{,}789 = \\text{?}' },
    answer: { type: 'numeric', correct: '2643', acceptable: ['2643.0', '2,643'] },
    solution: {
      steps: [
        { number: 1, description: 'Borrow for ones: 12 − 9 = 3', latex: '12 - 9 = 3' },
        { number: 2, description: 'Borrow for tens: 12 − 8 = 4', latex: '12 - 8 = 4' },
        { number: 3, description: 'Borrow for hundreds: 13 − 7 = 6', latex: '13 - 7 = 6' },
        { number: 4, description: 'Subtract thousands: 4 − 2 = 2', latex: '4 - 2 = 2' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'You\'ll borrow in every column except thousands' },
      { level: 'moderate', text: 'Work right to left, borrowing each time' },
      { level: 'explicit', text: '5,432 − 2,789 = 2,643' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Four-digit subtraction',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['three-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Multiple borrowing errors'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 95
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-sub-003',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 4,000 − 567?', latex: '4{,}000 - 567 = \\text{?}' },
    answer: { type: 'numeric', correct: '3433', acceptable: ['3433.0', '3,433'] },
    solution: {
      steps: [
        { number: 1, description: 'Regroup: 4000 = 3000 + 900 + 90 + 10', latex: '4000 = 3000 + 900 + 90 + 10' },
        { number: 2, description: 'Subtract ones: 10 − 7 = 3', latex: '10 - 7 = 3' },
        { number: 3, description: 'Subtract tens: 90 − 60 = 30', latex: '90 - 60 = 30' },
        { number: 4, description: 'Subtract hundreds: 900 − 500 = 400', latex: '900 - 500 = 400' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Borrow across the zeros first' },
      { level: 'moderate', text: '4000 = 3000 + 900 + 90 + 10' },
      { level: 'explicit', text: '4,000 − 567 = 3,433' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting across zeros',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['three-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing across zeros'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 85
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-sub-004',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 7,500 − 3,825?', latex: '7{,}500 - 3{,}825 = \\text{?}' },
    answer: { type: 'numeric', correct: '3675', acceptable: ['3675.0', '3,675'] },
    solution: {
      steps: [
        { number: 1, description: 'Borrow for ones: 10 − 5 = 5', latex: '10 - 5 = 5' },
        { number: 2, description: 'Borrow for tens: 9 − 2 = 7', latex: '9 - 2 = 7' },
        { number: 3, description: 'Subtract hundreds: 4 − 8, borrow to get 14 − 8 = 6', latex: '14 - 8 = 6' },
        { number: 4, description: 'Subtract thousands: 6 − 3 = 3', latex: '6 - 3 = 3' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Work right to left, borrowing as needed' },
      { level: 'moderate', text: 'The 00 at the end requires borrowing' },
      { level: 'explicit', text: '7,500 − 3,825 = 3,675' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Four-digit subtraction',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['three-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Borrowing error'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 90
    },
    metadata: { source: 'manual', createdAt: now }
  },
  {
    id: 'arith-v2-g5-sub-005',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: { text: 'What is 10,000 − 1?', latex: '10{,}000 - 1 = \\text{?}' },
    answer: { type: 'numeric', correct: '9999', acceptable: ['9999.0', '9,999'] },
    solution: {
      steps: [
        { number: 1, description: 'Borrow across all zeros', latex: '10000 = 9999 + 1' },
        { number: 2, description: 'Each zero becomes 9 after borrowing', latex: '10000 - 1' },
        { number: 3, description: 'The answer is 9999', latex: '10000 - 1 = 9999' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'What number comes right before 10,000?' },
      { level: 'moderate', text: 'Subtracting 1 from 10,000 cascades through all zeros' },
      { level: 'explicit', text: '10,000 − 1 = 9,999' }
    ],
    pedagogy: {
      topic: 'Subtraction',
      subTopic: 'Subtracting across zeros',
      skills: ['subtraction', 'regrouping'],
      prerequisites: ['three-digit-subtraction'],
      concepts: ['borrowing', 'place-value'],
      commonMistakes: ['Missing cascade of borrowing'],
      scaffoldingLevel: 'minimal',
      timeEstimate: 60
    },
    metadata: { source: 'manual', createdAt: now }
  }
]

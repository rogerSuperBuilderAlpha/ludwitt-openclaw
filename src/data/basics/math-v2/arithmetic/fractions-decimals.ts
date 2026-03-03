/**
 * Fractions & Decimals Problems V2 - Grade 4-6
 * 
 * Advanced arithmetic covering:
 * - Adding/Subtracting Fractions (unlike denominators, mixed numbers)
 * - Multiplying Fractions (proper and mixed numbers)
 * - Dividing Fractions (reciprocals, mixed numbers)
 * - Decimal Operations (add, subtract, multiply, divide)
 * - Converting Fractions and Decimals (both directions)
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const FRACTIONS_DECIMALS_V2: MathProblemV2[] = [
  // ===== ADDING/SUBTRACTING FRACTIONS (5 problems) =====
  {
    id: 'arith-v2-g5-fractions-200',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Add: 2/3 + 3/4',
      latex: '\\frac{2}{3} + \\frac{3}{4}'
    },
    answer: {
      type: 'fraction',
      correct: '17/12',
      acceptable: ['1 5/12', '1.4167', '17/12', '1 5/12']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the LCD of 3 and 4', latex: '\\text{LCD} = 12' },
        { number: 2, description: 'Convert first fraction', latex: '\\frac{2}{3} = \\frac{8}{12}' },
        { number: 3, description: 'Convert second fraction', latex: '\\frac{3}{4} = \\frac{9}{12}' },
        { number: 4, description: 'Add the fractions', latex: '\\frac{8}{12} + \\frac{9}{12} = \\frac{17}{12}' },
        { number: 5, description: 'Convert to mixed number (optional)', latex: '\\frac{17}{12} = 1\\frac{5}{12}' }
      ],
      method: 'Finding Common Denominators'
    },
    hints: [
      { level: 'gentle', text: 'You need a common denominator before adding fractions.' },
      { level: 'moderate', text: 'The LCD of 3 and 4 is 12. Convert both fractions.' },
      { level: 'explicit', text: '2/3 = 8/12 and 3/4 = 9/12. Add: 8/12 + 9/12 = 17/12' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Adding Fractions',
      skills: ['fraction_addition', 'finding_lcd', 'equivalent_fractions'],
      prerequisites: ['fraction_basics', 'multiplication', 'lcm'],
      concepts: ['fractions', 'addition', 'common-denominators'],
      commonMistakes: [
        'Adding denominators (2/3 + 3/4 ≠ 5/7)',
        'Not finding equivalent fractions correctly',
        'Forgetting to simplify or convert to mixed number'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'addition', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-fractions-201',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.2,
    gradeLevel: 5,
    question: {
      text: 'Subtract: 5/6 - 1/4',
      latex: '\\frac{5}{6} - \\frac{1}{4}'
    },
    answer: {
      type: 'fraction',
      correct: '7/12',
      acceptable: ['7/12', '0.5833', '0.583']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the LCD of 6 and 4', latex: '\\text{LCD} = 12' },
        { number: 2, description: 'Convert first fraction', latex: '\\frac{5}{6} = \\frac{10}{12}' },
        { number: 3, description: 'Convert second fraction', latex: '\\frac{1}{4} = \\frac{3}{12}' },
        { number: 4, description: 'Subtract the fractions', latex: '\\frac{10}{12} - \\frac{3}{12} = \\frac{7}{12}' }
      ],
      method: 'Finding Common Denominators'
    },
    hints: [
      { level: 'gentle', text: 'Find a common denominator first.' },
      { level: 'moderate', text: 'The LCD of 6 and 4 is 12.' },
      { level: 'explicit', text: '5/6 = 10/12 and 1/4 = 3/12. Subtract: 10/12 - 3/12 = 7/12' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Subtracting Fractions',
      skills: ['fraction_subtraction', 'finding_lcd', 'equivalent_fractions'],
      prerequisites: ['fraction_basics', 'multiplication', 'lcm'],
      concepts: ['fractions', 'subtraction', 'common-denominators'],
      commonMistakes: [
        'Subtracting denominators',
        'Finding wrong LCD',
        'Converting fractions incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'subtraction', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-fractions-202',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'Add: 2 1/3 + 1 3/4',
      latex: '2\\frac{1}{3} + 1\\frac{3}{4}'
    },
    answer: {
      type: 'fraction',
      correct: '4 1/12',
      acceptable: ['4 1/12', '49/12', '4.0833', '4.083']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add the whole numbers', latex: '2 + 1 = 3' },
        { number: 2, description: 'Find LCD for fraction parts', latex: '\\text{LCD of 3 and 4} = 12' },
        { number: 3, description: 'Convert fractions', latex: '\\frac{1}{3} = \\frac{4}{12}, \\quad \\frac{3}{4} = \\frac{9}{12}' },
        { number: 4, description: 'Add the fractions', latex: '\\frac{4}{12} + \\frac{9}{12} = \\frac{13}{12} = 1\\frac{1}{12}' },
        { number: 5, description: 'Combine with whole numbers', latex: '3 + 1\\frac{1}{12} = 4\\frac{1}{12}' }
      ],
      method: 'Adding Mixed Numbers'
    },
    hints: [
      { level: 'gentle', text: 'Add whole numbers first, then add the fractions.' },
      { level: 'moderate', text: 'The LCD of 3 and 4 is 12. The fraction parts add to more than 1.' },
      { level: 'explicit', text: '2 + 1 = 3, and 1/3 + 3/4 = 4/12 + 9/12 = 13/12 = 1 1/12. So 3 + 1 1/12 = 4 1/12' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Adding Mixed Numbers',
      skills: ['mixed_number_addition', 'finding_lcd', 'regrouping'],
      prerequisites: ['fraction_addition', 'improper_fractions'],
      concepts: ['mixed-numbers', 'fractions', 'addition'],
      commonMistakes: [
        'Forgetting to carry when fractions sum to more than 1',
        'Adding whole numbers to the fraction',
        'Incorrect LCD calculation'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'mixed-numbers', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-fractions-203',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'Subtract: 4 1/2 - 2 3/4',
      latex: '4\\frac{1}{2} - 2\\frac{3}{4}'
    },
    answer: {
      type: 'fraction',
      correct: '1 3/4',
      acceptable: ['1 3/4', '7/4', '1.75']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert to same denominator', latex: '4\\frac{1}{2} = 4\\frac{2}{4}' },
        { number: 2, description: 'Borrow 1 from whole number', latex: '4\\frac{2}{4} = 3\\frac{6}{4}' },
        { number: 3, description: 'Subtract whole numbers', latex: '3 - 2 = 1' },
        { number: 4, description: 'Subtract fractions', latex: '\\frac{6}{4} - \\frac{3}{4} = \\frac{3}{4}' },
        { number: 5, description: 'Combine', latex: '1\\frac{3}{4}' }
      ],
      method: 'Subtracting Mixed Numbers with Borrowing'
    },
    hints: [
      { level: 'gentle', text: 'Convert to the same denominator first.' },
      { level: 'moderate', text: 'Since 2/4 < 3/4, you need to borrow from the whole number.' },
      { level: 'explicit', text: '4 2/4 = 3 6/4. Then 3 6/4 - 2 3/4 = 1 3/4' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Subtracting Mixed Numbers',
      skills: ['mixed_number_subtraction', 'borrowing', 'equivalent_fractions'],
      prerequisites: ['fraction_subtraction', 'improper_fractions'],
      concepts: ['mixed-numbers', 'fractions', 'subtraction', 'regrouping'],
      commonMistakes: [
        'Forgetting to borrow when needed',
        'Borrowing incorrectly',
        'Converting fractions wrong'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'mixed-numbers', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g6-fractions-204',
    version: 2,
    type: 'arithmetic',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Add: 3/8 + 5/12 + 1/6',
      latex: '\\frac{3}{8} + \\frac{5}{12} + \\frac{1}{6}'
    },
    answer: {
      type: 'fraction',
      correct: '23/24',
      acceptable: ['23/24', '0.9583', '0.958']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the LCD of 8, 12, and 6', latex: '\\text{LCD} = 24' },
        { number: 2, description: 'Convert first fraction', latex: '\\frac{3}{8} = \\frac{9}{24}' },
        { number: 3, description: 'Convert second fraction', latex: '\\frac{5}{12} = \\frac{10}{24}' },
        { number: 4, description: 'Convert third fraction', latex: '\\frac{1}{6} = \\frac{4}{24}' },
        { number: 5, description: 'Add all fractions', latex: '\\frac{9}{24} + \\frac{10}{24} + \\frac{4}{24} = \\frac{23}{24}' }
      ],
      method: 'Adding Multiple Fractions'
    },
    hints: [
      { level: 'gentle', text: 'Find a common denominator for all three fractions.' },
      { level: 'moderate', text: 'The LCD of 8, 12, and 6 is 24.' },
      { level: 'explicit', text: '3/8 = 9/24, 5/12 = 10/24, 1/6 = 4/24. Sum: 9 + 10 + 4 = 23/24' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Adding Multiple Fractions',
      skills: ['fraction_addition', 'finding_lcd', 'equivalent_fractions'],
      prerequisites: ['fraction_basics', 'lcm', 'multiplication'],
      concepts: ['fractions', 'addition', 'lcd'],
      commonMistakes: [
        'Wrong LCD calculation',
        'Arithmetic errors in conversion',
        'Adding numerators incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'addition', 'grade-6']
    }
  },

  // ===== MULTIPLYING FRACTIONS (5 problems) =====
  {
    id: 'arith-v2-g5-fractions-205',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.5,
    gradeLevel: 5,
    question: {
      text: 'Multiply: 2/3 × 4/5',
      latex: '\\frac{2}{3} \\times \\frac{4}{5}'
    },
    answer: {
      type: 'fraction',
      correct: '8/15',
      acceptable: ['8/15', '0.5333', '0.533']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply the numerators', latex: '2 \\times 4 = 8' },
        { number: 2, description: 'Multiply the denominators', latex: '3 \\times 5 = 15' },
        { number: 3, description: 'Write the result', latex: '\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}' }
      ],
      method: 'Multiplying Fractions'
    },
    hints: [
      { level: 'gentle', text: 'Multiply straight across: numerator × numerator, denominator × denominator.' },
      { level: 'moderate', text: '2 × 4 = 8 for the numerator, 3 × 5 = 15 for the denominator.' },
      { level: 'explicit', text: '(2 × 4)/(3 × 5) = 8/15' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Multiplying Fractions',
      skills: ['fraction_multiplication'],
      prerequisites: ['fraction_basics', 'multiplication'],
      concepts: ['fractions', 'multiplication'],
      commonMistakes: [
        'Finding common denominator (not needed for multiplication)',
        'Cross-multiplying incorrectly',
        'Forgetting to simplify'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'multiplication', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-fractions-206',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.8,
    gradeLevel: 5,
    question: {
      text: 'Multiply: 3/4 × 8/9',
      latex: '\\frac{3}{4} \\times \\frac{8}{9}'
    },
    answer: {
      type: 'fraction',
      correct: '2/3',
      acceptable: ['2/3', '24/36', '0.6667', '0.667']
    },
    solution: {
      steps: [
        { number: 1, description: 'Cross-cancel before multiplying', latex: '\\frac{3}{4} \\times \\frac{8}{9} = \\frac{\\cancel{3}^1}{\\cancel{4}^1} \\times \\frac{\\cancel{8}^2}{\\cancel{9}^3}' },
        { number: 2, description: 'Multiply simplified fractions', latex: '\\frac{1}{1} \\times \\frac{2}{3} = \\frac{2}{3}' }
      ],
      method: 'Cross-Canceling'
    },
    hints: [
      { level: 'gentle', text: 'Look for common factors between numerators and denominators to simplify first.' },
      { level: 'moderate', text: '3 and 9 share factor 3. 4 and 8 share factor 4.' },
      { level: 'explicit', text: 'Cancel: 3/9 = 1/3, 8/4 = 2/1. Then (1 × 2)/(1 × 3) = 2/3' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Multiplying Fractions with Simplification',
      skills: ['fraction_multiplication', 'simplifying', 'cross_canceling'],
      prerequisites: ['fraction_basics', 'gcf'],
      concepts: ['fractions', 'multiplication', 'simplification'],
      commonMistakes: [
        'Not simplifying before multiplying',
        'Cross-canceling incorrectly',
        'Forgetting to simplify the final answer'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'multiplication', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-fractions-207',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.2,
    gradeLevel: 5,
    question: {
      text: 'Multiply: 2 1/2 × 1/3',
      latex: '2\\frac{1}{2} \\times \\frac{1}{3}'
    },
    answer: {
      type: 'fraction',
      correct: '5/6',
      acceptable: ['5/6', '0.8333', '0.833']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert mixed number to improper fraction', latex: '2\\frac{1}{2} = \\frac{5}{2}' },
        { number: 2, description: 'Multiply the fractions', latex: '\\frac{5}{2} \\times \\frac{1}{3} = \\frac{5 \\times 1}{2 \\times 3}' },
        { number: 3, description: 'Calculate', latex: '\\frac{5}{6}' }
      ],
      method: 'Multiplying Mixed Numbers'
    },
    hints: [
      { level: 'gentle', text: 'First convert the mixed number to an improper fraction.' },
      { level: 'moderate', text: '2 1/2 = 5/2. Now multiply 5/2 × 1/3.' },
      { level: 'explicit', text: '5/2 × 1/3 = 5/6' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Multiplying Mixed Numbers',
      skills: ['mixed_number_multiplication', 'improper_fractions'],
      prerequisites: ['fraction_multiplication', 'mixed_numbers'],
      concepts: ['mixed-numbers', 'multiplication', 'conversion'],
      commonMistakes: [
        'Not converting mixed number first',
        'Multiplying whole and fraction parts separately',
        'Wrong conversion to improper fraction'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'mixed-numbers', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-fractions-208',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'Multiply: 1 2/3 × 2 1/4',
      latex: '1\\frac{2}{3} \\times 2\\frac{1}{4}'
    },
    answer: {
      type: 'fraction',
      correct: '3 3/4',
      acceptable: ['3 3/4', '15/4', '3.75']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert first mixed number', latex: '1\\frac{2}{3} = \\frac{5}{3}' },
        { number: 2, description: 'Convert second mixed number', latex: '2\\frac{1}{4} = \\frac{9}{4}' },
        { number: 3, description: 'Multiply', latex: '\\frac{5}{3} \\times \\frac{9}{4} = \\frac{45}{12}' },
        { number: 4, description: 'Simplify', latex: '\\frac{45}{12} = \\frac{15}{4} = 3\\frac{3}{4}' }
      ],
      method: 'Multiplying Two Mixed Numbers'
    },
    hints: [
      { level: 'gentle', text: 'Convert both mixed numbers to improper fractions first.' },
      { level: 'moderate', text: '1 2/3 = 5/3 and 2 1/4 = 9/4. Multiply: 5/3 × 9/4.' },
      { level: 'explicit', text: '(5 × 9)/(3 × 4) = 45/12 = 15/4 = 3 3/4' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Multiplying Mixed Numbers',
      skills: ['mixed_number_multiplication', 'improper_fractions', 'simplifying'],
      prerequisites: ['fraction_multiplication', 'mixed_numbers'],
      concepts: ['mixed-numbers', 'multiplication', 'simplification'],
      commonMistakes: [
        'Wrong improper fraction conversion',
        'Forgetting to simplify',
        'Arithmetic errors in multiplication'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'mixed-numbers', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g6-fractions-209',
    version: 2,
    type: 'arithmetic',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Multiply: 3 1/3 × 1 4/5',
      latex: '3\\frac{1}{3} \\times 1\\frac{4}{5}'
    },
    answer: {
      type: 'fraction',
      correct: '6',
      acceptable: ['6', '6/1', '6.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert first mixed number', latex: '3\\frac{1}{3} = \\frac{10}{3}' },
        { number: 2, description: 'Convert second mixed number', latex: '1\\frac{4}{5} = \\frac{9}{5}' },
        { number: 3, description: 'Multiply', latex: '\\frac{10}{3} \\times \\frac{9}{5}' },
        { number: 4, description: 'Cross-cancel and simplify', latex: '\\frac{\\cancel{10}^2}{\\cancel{3}^1} \\times \\frac{\\cancel{9}^3}{\\cancel{5}^1} = \\frac{2 \\times 3}{1 \\times 1} = 6' }
      ],
      method: 'Cross-Canceling with Mixed Numbers'
    },
    hints: [
      { level: 'gentle', text: 'Convert to improper fractions, then look for opportunities to simplify.' },
      { level: 'moderate', text: '10/3 × 9/5 - notice 10 and 5 share a factor, and 9 and 3 share a factor.' },
      { level: 'explicit', text: '10/5 = 2, 9/3 = 3. So (2 × 3)/(1 × 1) = 6' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Multiplying Mixed Numbers',
      skills: ['mixed_number_multiplication', 'cross_canceling', 'simplifying'],
      prerequisites: ['fraction_multiplication', 'gcf'],
      concepts: ['mixed-numbers', 'multiplication', 'cross-canceling'],
      commonMistakes: [
        'Not recognizing cross-cancel opportunities',
        'Wrong improper fraction conversion',
        'Calculation errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'mixed-numbers', 'grade-6']
    }
  },

  // ===== DIVIDING FRACTIONS (5 problems) =====
  {
    id: 'arith-v2-g5-fractions-210',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Divide: 3/4 ÷ 1/2',
      latex: '\\frac{3}{4} \\div \\frac{1}{2}'
    },
    answer: {
      type: 'fraction',
      correct: '3/2',
      acceptable: ['3/2', '1 1/2', '1.5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Keep the first fraction', latex: '\\frac{3}{4}' },
        { number: 2, description: 'Change division to multiplication', latex: '\\div \\rightarrow \\times' },
        { number: 3, description: 'Flip the second fraction (reciprocal)', latex: '\\frac{1}{2} \\rightarrow \\frac{2}{1}' },
        { number: 4, description: 'Multiply', latex: '\\frac{3}{4} \\times \\frac{2}{1} = \\frac{6}{4} = \\frac{3}{2}' }
      ],
      method: 'Keep-Change-Flip'
    },
    hints: [
      { level: 'gentle', text: 'Use "Keep-Change-Flip": Keep the first, change ÷ to ×, flip the second.' },
      { level: 'moderate', text: 'The reciprocal of 1/2 is 2/1. Multiply 3/4 × 2/1.' },
      { level: 'explicit', text: '3/4 × 2/1 = 6/4 = 3/2 = 1 1/2' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Dividing Fractions',
      skills: ['fraction_division', 'reciprocals'],
      prerequisites: ['fraction_multiplication'],
      concepts: ['fractions', 'division', 'reciprocal'],
      commonMistakes: [
        'Flipping the wrong fraction',
        'Forgetting to change to multiplication',
        'Dividing straight across like multiplication'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'division', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-fractions-211',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.3,
    gradeLevel: 5,
    question: {
      text: 'Divide: 5/6 ÷ 2/3',
      latex: '\\frac{5}{6} \\div \\frac{2}{3}'
    },
    answer: {
      type: 'fraction',
      correct: '5/4',
      acceptable: ['5/4', '1 1/4', '1.25']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply Keep-Change-Flip', latex: '\\frac{5}{6} \\div \\frac{2}{3} = \\frac{5}{6} \\times \\frac{3}{2}' },
        { number: 2, description: 'Cross-cancel if possible', latex: '\\frac{5}{\\cancel{6}^2} \\times \\frac{\\cancel{3}^1}{2}' },
        { number: 3, description: 'Multiply', latex: '\\frac{5 \\times 1}{2 \\times 2} = \\frac{5}{4}' }
      ],
      method: 'Keep-Change-Flip with Cross-Canceling'
    },
    hints: [
      { level: 'gentle', text: 'Flip the second fraction and multiply.' },
      { level: 'moderate', text: '5/6 × 3/2 - look for common factors between 6 and 3.' },
      { level: 'explicit', text: '5/6 × 3/2 = 5/2 × 1/2 = 5/4 = 1 1/4' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Dividing Fractions',
      skills: ['fraction_division', 'reciprocals', 'cross_canceling'],
      prerequisites: ['fraction_multiplication', 'simplifying'],
      concepts: ['fractions', 'division', 'simplification'],
      commonMistakes: [
        'Not recognizing cross-cancel opportunities',
        'Flipping the wrong fraction',
        'Arithmetic errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'division', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-fractions-212',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'Divide: 2 1/2 ÷ 1/4',
      latex: '2\\frac{1}{2} \\div \\frac{1}{4}'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', '10/1', '10.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert mixed number to improper fraction', latex: '2\\frac{1}{2} = \\frac{5}{2}' },
        { number: 2, description: 'Apply Keep-Change-Flip', latex: '\\frac{5}{2} \\div \\frac{1}{4} = \\frac{5}{2} \\times \\frac{4}{1}' },
        { number: 3, description: 'Multiply', latex: '\\frac{5 \\times 4}{2 \\times 1} = \\frac{20}{2} = 10' }
      ],
      method: 'Dividing Mixed Numbers'
    },
    hints: [
      { level: 'gentle', text: 'Convert 2 1/2 to an improper fraction first.' },
      { level: 'moderate', text: '2 1/2 = 5/2. Now divide: 5/2 ÷ 1/4.' },
      { level: 'explicit', text: '5/2 × 4/1 = 20/2 = 10' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Dividing Mixed Numbers',
      skills: ['fraction_division', 'mixed_numbers', 'improper_fractions'],
      prerequisites: ['fraction_division', 'mixed_number_conversion'],
      concepts: ['mixed-numbers', 'division', 'conversion'],
      commonMistakes: [
        'Not converting mixed number first',
        'Flipping the wrong fraction',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'mixed-numbers', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g6-fractions-213',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.8,
    gradeLevel: 6,
    question: {
      text: 'Divide: 3 1/3 ÷ 1 2/3',
      latex: '3\\frac{1}{3} \\div 1\\frac{2}{3}'
    },
    answer: {
      type: 'numeric',
      correct: '2',
      acceptable: ['2', '2/1', '2.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert first mixed number', latex: '3\\frac{1}{3} = \\frac{10}{3}' },
        { number: 2, description: 'Convert second mixed number', latex: '1\\frac{2}{3} = \\frac{5}{3}' },
        { number: 3, description: 'Apply Keep-Change-Flip', latex: '\\frac{10}{3} \\div \\frac{5}{3} = \\frac{10}{3} \\times \\frac{3}{5}' },
        { number: 4, description: 'Simplify and multiply', latex: '\\frac{10}{\\cancel{3}} \\times \\frac{\\cancel{3}}{5} = \\frac{10}{5} = 2' }
      ],
      method: 'Dividing Two Mixed Numbers'
    },
    hints: [
      { level: 'gentle', text: 'Convert both mixed numbers to improper fractions first.' },
      { level: 'moderate', text: '10/3 ÷ 5/3 = 10/3 × 3/5. Notice the 3s cancel.' },
      { level: 'explicit', text: '10/3 × 3/5 = 10/5 = 2' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Dividing Mixed Numbers',
      skills: ['fraction_division', 'mixed_numbers', 'simplifying'],
      prerequisites: ['fraction_division', 'improper_fractions'],
      concepts: ['mixed-numbers', 'division', 'cross-canceling'],
      commonMistakes: [
        'Wrong improper fraction conversion',
        'Forgetting to flip',
        'Not simplifying'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'mixed-numbers', 'grade-6']
    }
  },
  {
    id: 'arith-v2-g6-fractions-214',
    version: 2,
    type: 'arithmetic',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Divide: 4 1/2 ÷ 2 1/4',
      latex: '4\\frac{1}{2} \\div 2\\frac{1}{4}'
    },
    answer: {
      type: 'numeric',
      correct: '2',
      acceptable: ['2', '2/1', '2.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert first mixed number', latex: '4\\frac{1}{2} = \\frac{9}{2}' },
        { number: 2, description: 'Convert second mixed number', latex: '2\\frac{1}{4} = \\frac{9}{4}' },
        { number: 3, description: 'Apply Keep-Change-Flip', latex: '\\frac{9}{2} \\div \\frac{9}{4} = \\frac{9}{2} \\times \\frac{4}{9}' },
        { number: 4, description: 'Simplify and multiply', latex: '\\frac{\\cancel{9}}{\\cancel{2}^1} \\times \\frac{\\cancel{4}^2}{\\cancel{9}} = \\frac{1 \\times 2}{1 \\times 1} = 2' }
      ],
      method: 'Dividing Mixed Numbers with Cross-Canceling'
    },
    hints: [
      { level: 'gentle', text: 'Convert to improper fractions: 4 1/2 and 2 1/4.' },
      { level: 'moderate', text: '9/2 × 4/9 - the 9s cancel out!' },
      { level: 'explicit', text: '9/2 × 4/9 = 4/2 = 2' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Dividing Mixed Numbers',
      skills: ['fraction_division', 'mixed_numbers', 'cross_canceling'],
      prerequisites: ['fraction_division', 'improper_fractions'],
      concepts: ['mixed-numbers', 'division', 'simplification'],
      commonMistakes: [
        'Incorrect conversion to improper fractions',
        'Missing cross-cancel opportunities',
        'Arithmetic errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'mixed-numbers', 'grade-6']
    }
  },

  // ===== DECIMAL OPERATIONS (5 problems) =====
  {
    id: 'arith-v2-g4-decimals-215',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'Add: 3.45 + 2.8',
      latex: '3.45 + 2.8'
    },
    answer: {
      type: 'numeric',
      correct: '6.25',
      acceptable: ['6.25']
    },
    solution: {
      steps: [
        { number: 1, description: 'Line up decimal points', latex: '\\begin{array}{r} 3.45 \\\\ + 2.80 \\\\ \\hline \\end{array}' },
        { number: 2, description: 'Add from right to left', latex: '5 + 0 = 5' },
        { number: 3, description: 'Continue adding', latex: '4 + 8 = 12 \\text{ (carry 1)}' },
        { number: 4, description: 'Add with carry', latex: '3 + 2 + 1 = 6' },
        { number: 5, description: 'Result', latex: '6.25' }
      ],
      method: 'Decimal Addition'
    },
    hints: [
      { level: 'gentle', text: 'Line up the decimal points before adding.' },
      { level: 'moderate', text: 'Write 2.8 as 2.80 so both numbers have the same decimal places.' },
      { level: 'explicit', text: '3.45 + 2.80 = 6.25' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Adding Decimals',
      skills: ['decimal_addition', 'place_value'],
      prerequisites: ['addition', 'place_value'],
      concepts: ['decimals', 'addition', 'alignment'],
      commonMistakes: [
        'Not aligning decimal points',
        'Forgetting to carry',
        'Placing decimal incorrectly in answer'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'decimals', 'addition', 'grade-4']
    }
  },
  {
    id: 'arith-v2-g4-decimals-216',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.3,
    gradeLevel: 4,
    question: {
      text: 'Subtract: 8.5 - 3.72',
      latex: '8.5 - 3.72'
    },
    answer: {
      type: 'numeric',
      correct: '4.78',
      acceptable: ['4.78']
    },
    solution: {
      steps: [
        { number: 1, description: 'Line up decimal points', latex: '\\begin{array}{r} 8.50 \\\\ - 3.72 \\\\ \\hline \\end{array}' },
        { number: 2, description: 'Borrow and subtract', latex: '10 - 2 = 8 \\text{ (hundredths)}' },
        { number: 3, description: 'Continue with borrowing', latex: '14 - 7 = 7 \\text{ (tenths)}' },
        { number: 4, description: 'Subtract ones', latex: '7 - 3 = 4' },
        { number: 5, description: 'Result', latex: '4.78' }
      ],
      method: 'Decimal Subtraction with Borrowing'
    },
    hints: [
      { level: 'gentle', text: 'Write 8.5 as 8.50 to have matching decimal places.' },
      { level: 'moderate', text: 'You\'ll need to borrow to subtract the hundredths and tenths.' },
      { level: 'explicit', text: '8.50 - 3.72 = 4.78' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Subtracting Decimals',
      skills: ['decimal_subtraction', 'borrowing', 'place_value'],
      prerequisites: ['subtraction', 'borrowing'],
      concepts: ['decimals', 'subtraction', 'regrouping'],
      commonMistakes: [
        'Not adding trailing zeros',
        'Borrowing errors',
        'Misaligned decimal points'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'decimals', 'subtraction', 'grade-4']
    }
  },
  {
    id: 'arith-v2-g5-decimals-217',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Multiply: 2.5 × 0.4',
      latex: '2.5 \\times 0.4'
    },
    answer: {
      type: 'numeric',
      correct: '1',
      acceptable: ['1', '1.0', '1.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply ignoring decimals', latex: '25 \\times 4 = 100' },
        { number: 2, description: 'Count total decimal places', latex: '2.5 \\text{ (1 place)} + 0.4 \\text{ (1 place)} = 2 \\text{ places}' },
        { number: 3, description: 'Place decimal in answer', latex: '100 \\rightarrow 1.00 = 1' }
      ],
      method: 'Decimal Multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Multiply as if there were no decimals, then count decimal places.' },
      { level: 'moderate', text: '25 × 4 = 100. There are 2 total decimal places (1 + 1).' },
      { level: 'explicit', text: 'Move the decimal 2 places left: 100 → 1.00 = 1' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Multiplying Decimals',
      skills: ['decimal_multiplication', 'place_value'],
      prerequisites: ['multiplication', 'decimals'],
      concepts: ['decimals', 'multiplication', 'place-value'],
      commonMistakes: [
        'Forgetting to count decimal places',
        'Counting decimal places incorrectly',
        'Placing decimal in wrong position'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'decimals', 'multiplication', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-decimals-218',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.3,
    gradeLevel: 5,
    question: {
      text: 'Multiply: 3.14 × 2.5',
      latex: '3.14 \\times 2.5'
    },
    answer: {
      type: 'numeric',
      correct: '7.85',
      acceptable: ['7.85']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply ignoring decimals', latex: '314 \\times 25 = 7850' },
        { number: 2, description: 'Count total decimal places', latex: '3.14 \\text{ (2 places)} + 2.5 \\text{ (1 place)} = 3 \\text{ places}' },
        { number: 3, description: 'Place decimal', latex: '7850 \\rightarrow 7.850 = 7.85' }
      ],
      method: 'Decimal Multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Multiply 314 × 25, then adjust for 3 decimal places total.' },
      { level: 'moderate', text: '314 × 25 = 7850. Move decimal 3 places left.' },
      { level: 'explicit', text: '7850 → 7.850 = 7.85' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Multiplying Decimals',
      skills: ['decimal_multiplication', 'multi_digit_multiplication'],
      prerequisites: ['multiplication', 'decimals'],
      concepts: ['decimals', 'multiplication', 'estimation'],
      commonMistakes: [
        'Multiplication errors with larger numbers',
        'Miscounting decimal places',
        'Dropping trailing zeros incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'decimals', 'multiplication', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-decimals-219',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'Divide: 4.8 ÷ 0.6',
      latex: '4.8 \\div 0.6'
    },
    answer: {
      type: 'numeric',
      correct: '8',
      acceptable: ['8', '8.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Make divisor a whole number', latex: '0.6 \\times 10 = 6' },
        { number: 2, description: 'Multiply dividend by same amount', latex: '4.8 \\times 10 = 48' },
        { number: 3, description: 'Divide', latex: '48 \\div 6 = 8' }
      ],
      method: 'Decimal Division'
    },
    hints: [
      { level: 'gentle', text: 'Multiply both numbers by 10 to eliminate the decimal in the divisor.' },
      { level: 'moderate', text: '4.8 ÷ 0.6 = 48 ÷ 6' },
      { level: 'explicit', text: '48 ÷ 6 = 8' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Dividing Decimals',
      skills: ['decimal_division', 'equivalent_expressions'],
      prerequisites: ['division', 'decimals', 'multiplication'],
      concepts: ['decimals', 'division', 'scaling'],
      commonMistakes: [
        'Not moving decimal in both numbers',
        'Moving decimal wrong number of places',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'decimals', 'division', 'grade-5']
    }
  },

  // ===== CONVERTING FRACTIONS AND DECIMALS (5 problems) =====
  {
    id: 'arith-v2-g4-convert-220',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'Convert 3/4 to a decimal.',
      latex: '\\frac{3}{4} = ?'
    },
    answer: {
      type: 'numeric',
      correct: '0.75',
      acceptable: ['0.75', '.75']
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide numerator by denominator', latex: '3 \\div 4' },
        { number: 2, description: 'Set up long division', latex: '3.00 \\div 4' },
        { number: 3, description: 'Divide', latex: '3.00 \\div 4 = 0.75' }
      ],
      method: 'Fraction to Decimal Conversion'
    },
    hints: [
      { level: 'gentle', text: 'To convert a fraction to a decimal, divide the numerator by the denominator.' },
      { level: 'moderate', text: 'Divide 3 by 4. Add decimal zeros to help.' },
      { level: 'explicit', text: '3 ÷ 4 = 0.75' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Fraction to Decimal',
      skills: ['fraction_to_decimal', 'division'],
      prerequisites: ['division', 'fractions'],
      concepts: ['fractions', 'decimals', 'conversion'],
      commonMistakes: [
        'Dividing denominator by numerator',
        'Not extending division far enough',
        'Misplacing decimal point'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'decimals', 'conversion', 'grade-4']
    }
  },
  {
    id: 'arith-v2-g4-convert-221',
    version: 2,
    type: 'arithmetic',
    difficulty: 4.2,
    gradeLevel: 4,
    question: {
      text: 'Convert 0.6 to a fraction in simplest form.',
      latex: '0.6 = ?'
    },
    answer: {
      type: 'fraction',
      correct: '3/5',
      acceptable: ['3/5', '6/10']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write as fraction with denominator based on decimal places', latex: '0.6 = \\frac{6}{10}' },
        { number: 2, description: 'Find GCF of 6 and 10', latex: '\\text{GCF}(6, 10) = 2' },
        { number: 3, description: 'Simplify', latex: '\\frac{6}{10} = \\frac{6 \\div 2}{10 \\div 2} = \\frac{3}{5}' }
      ],
      method: 'Decimal to Fraction Conversion'
    },
    hints: [
      { level: 'gentle', text: '0.6 means 6 tenths. Write it as a fraction over 10.' },
      { level: 'moderate', text: '6/10 can be simplified. Both numbers are divisible by 2.' },
      { level: 'explicit', text: '6/10 = 3/5' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Decimal to Fraction',
      skills: ['decimal_to_fraction', 'simplifying'],
      prerequisites: ['place_value', 'gcf'],
      concepts: ['fractions', 'decimals', 'simplification'],
      commonMistakes: [
        'Using wrong denominator',
        'Forgetting to simplify',
        'Wrong GCF'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'decimals', 'conversion', 'grade-4']
    }
  },
  {
    id: 'arith-v2-g5-convert-222',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Convert 5/8 to a decimal.',
      latex: '\\frac{5}{8} = ?'
    },
    answer: {
      type: 'numeric',
      correct: '0.625',
      acceptable: ['0.625', '.625']
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide numerator by denominator', latex: '5 \\div 8' },
        { number: 2, description: 'Perform long division', latex: '5.000 \\div 8' },
        { number: 3, description: '8 goes into 50 six times (48)', latex: '0.6...' },
        { number: 4, description: '8 goes into 20 twice (16)', latex: '0.62...' },
        { number: 5, description: '8 goes into 40 five times exactly', latex: '0.625' }
      ],
      method: 'Long Division'
    },
    hints: [
      { level: 'gentle', text: 'Divide 5 by 8. You\'ll need to add zeros after the decimal.' },
      { level: 'moderate', text: '5.000 ÷ 8. Work through each place value.' },
      { level: 'explicit', text: '5 ÷ 8 = 0.625' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Fraction to Decimal',
      skills: ['fraction_to_decimal', 'long_division'],
      prerequisites: ['division', 'fractions'],
      concepts: ['fractions', 'decimals', 'long-division'],
      commonMistakes: [
        'Stopping division too early',
        'Misplacing decimal point',
        'Division errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'decimals', 'conversion', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g5-convert-223',
    version: 2,
    type: 'arithmetic',
    difficulty: 5.3,
    gradeLevel: 5,
    question: {
      text: 'Convert 0.375 to a fraction in simplest form.',
      latex: '0.375 = ?'
    },
    answer: {
      type: 'fraction',
      correct: '3/8',
      acceptable: ['3/8', '375/1000']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write as fraction over power of 10', latex: '0.375 = \\frac{375}{1000}' },
        { number: 2, description: 'Find GCF of 375 and 1000', latex: '\\text{GCF}(375, 1000) = 125' },
        { number: 3, description: 'Simplify', latex: '\\frac{375 \\div 125}{1000 \\div 125} = \\frac{3}{8}' }
      ],
      method: 'Decimal to Fraction Conversion'
    },
    hints: [
      { level: 'gentle', text: '0.375 is 375 thousandths.' },
      { level: 'moderate', text: '375/1000 - both are divisible by 125.' },
      { level: 'explicit', text: '375 ÷ 125 = 3, 1000 ÷ 125 = 8, so 3/8' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Decimal to Fraction',
      skills: ['decimal_to_fraction', 'simplifying', 'gcf'],
      prerequisites: ['place_value', 'gcf', 'division'],
      concepts: ['fractions', 'decimals', 'simplification'],
      commonMistakes: [
        'Wrong denominator (10 or 100 instead of 1000)',
        'Finding wrong GCF',
        'Simplification errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'decimals', 'conversion', 'grade-5']
    }
  },
  {
    id: 'arith-v2-g6-convert-224',
    version: 2,
    type: 'arithmetic',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Which is greater: 5/7 or 0.72?',
      latex: '\\frac{5}{7} \\text{ or } 0.72'
    },
    answer: {
      type: 'exact',
      correct: '0.72',
      acceptable: ['0.72', '.72', 'the decimal']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert 5/7 to decimal', latex: '5 \\div 7 = 0.714285...' },
        { number: 2, description: 'Round for comparison', latex: '\\frac{5}{7} \\approx 0.714' },
        { number: 3, description: 'Compare', latex: '0.714 < 0.72' },
        { number: 4, description: 'Answer', latex: '0.72 \\text{ is greater}' }
      ],
      method: 'Converting to Compare'
    },
    hints: [
      { level: 'gentle', text: 'Convert 5/7 to a decimal to compare.' },
      { level: 'moderate', text: '5 ÷ 7 ≈ 0.714. Compare this to 0.72.' },
      { level: 'explicit', text: '0.714 < 0.72, so 0.72 is greater.' }
    ],
    pedagogy: {
      topic: 'Arithmetic',
      subTopic: 'Comparing Fractions and Decimals',
      skills: ['fraction_to_decimal', 'comparing_numbers'],
      prerequisites: ['fraction_to_decimal', 'decimal_place_value'],
      concepts: ['fractions', 'decimals', 'comparison', 'number-sense'],
      commonMistakes: [
        'Incorrect division',
        'Comparing wrong place values',
        'Rounding errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['arithmetic', 'fractions', 'decimals', 'comparison', 'grade-6']
    }
  }
]

/**
 * Math Misconceptions Taxonomy
 * 
 * A comprehensive catalog of common mathematical misconceptions,
 * organized by category and grade level. Each misconception includes
 * detection rules and remediation strategies.
 * 
 * Sources:
 * - Educational research literature
 * - Common error analysis studies
 * - Teacher expert knowledge
 * 
 * This is proprietary IP - the specific detection rules and remediation
 * strategies are what create value.
 */

import { Misconception } from '../types'

// ============================================================================
// ARITHMETIC MISCONCEPTIONS (Grades 1-5)
// ============================================================================

export const ARITHMETIC_MISCONCEPTIONS: Misconception[] = [
  {
    id: 'arith-001',
    name: 'Addition/Subtraction Sign Confusion',
    description: 'Confuses addition and subtraction operations, often treating subtraction as addition or vice versa.',
    subject: 'math',
    category: 'arithmetic',
    severity: 'moderate',
    prevalence: 0.15,
    gradeRangeStart: 1,
    gradeRangeEnd: 3,
    detectionRules: {
      errorPatterns: [
        {
          type: 'numeric',
          numericRule: { type: 'sign_flip', tolerance: 0.01 },
          weight: 0.8
        },
        {
          type: 'feature',
          features: { operationSwap: true },
          weight: 0.9
        }
      ],
      problemTypes: ['arithmetic', 'basic-addition', 'basic-subtraction'],
      difficultyRange: [1, 4],
      requiredSkills: ['addition-basic', 'subtraction-basic'],
      minOccurrences: 2,
      minConfidence: 0.6
    },
    remediation: {
      strategy: 'conceptual_change',
      briefExplanation: 'Addition means putting together, subtraction means taking away.',
      detailedExplanation: 'When you add, you combine groups to get more. When you subtract, you take away from a group to get less. Pay close attention to the sign: + means add, - means take away.',
      counterExample: {
        setup: 'You have 5 apples.',
        wrongApproach: 'If someone gives you 3 more, you don\'t have 5 - 3 = 2 apples.',
        correctApproach: 'If someone gives you 3 more, you have 5 + 3 = 8 apples.'
      },
      warmupProblems: ['arith-warmup-signs-1', 'arith-warmup-signs-2'],
      practiceProblems: ['arith-practice-signs-1', 'arith-practice-signs-2'],
      challengeProblems: ['arith-challenge-signs-1'],
      estimatedProblems: 8,
      estimatedTimeMinutes: 15
    },
    source: 'expert',
    confidence: 0.95,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'arith-002',
    name: 'Regrouping Avoidance',
    description: 'Subtracts smaller from larger digit regardless of position, avoiding regrouping/borrowing.',
    subject: 'math',
    category: 'arithmetic',
    severity: 'major',
    prevalence: 0.25,
    gradeRangeStart: 2,
    gradeRangeEnd: 4,
    detectionRules: {
      errorPatterns: [
        {
          type: 'regex',
          pattern: 'subtraction_no_regrouping',
          weight: 0.9
        },
        {
          type: 'feature',
          features: { decimalPlaceError: false },  // Specifically NOT a decimal error
          weight: 0.3
        }
      ],
      problemTypes: ['subtraction-regrouping', 'multi-digit-subtraction'],
      difficultyRange: [2, 5],
      requiredSkills: ['subtraction-regrouping', 'place-value'],
      minOccurrences: 2,
      minConfidence: 0.7
    },
    remediation: {
      strategy: 'worked_example',
      briefExplanation: 'When the top digit is smaller than the bottom digit, we need to borrow from the next place.',
      detailedExplanation: 'In 52 - 28: We can\'t take 8 from 2. So we borrow 1 ten from the 5 tens, making it 4 tens. That borrowed ten becomes 10 ones, added to the 2 ones = 12 ones. Now we can do 12 - 8 = 4 ones, and 4 - 2 = 2 tens. Answer: 24.',
      counterExample: {
        setup: '52 - 28 = ?',
        wrongApproach: 'Taking 2 from 8 and 2 from 5 gives 36 (wrong!)',
        correctApproach: 'Borrowing: 12 - 8 = 4, 4 - 2 = 2. Answer: 24'
      },
      warmupProblems: ['arith-regroup-warmup-1', 'arith-regroup-warmup-2'],
      practiceProblems: ['arith-regroup-practice-1', 'arith-regroup-practice-2', 'arith-regroup-practice-3'],
      challengeProblems: ['arith-regroup-challenge-1'],
      estimatedProblems: 10,
      estimatedTimeMinutes: 20
    },
    source: 'research',
    confidence: 0.98,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'arith-003',
    name: 'Multiplication as Repeated Addition Only',
    description: 'Over-applies addition patterns to multiplication, adding instead of multiplying.',
    subject: 'math',
    category: 'arithmetic',
    severity: 'moderate',
    prevalence: 0.12,
    gradeRangeStart: 2,
    gradeRangeEnd: 4,
    detectionRules: {
      errorPatterns: [
        {
          type: 'numeric',
          numericRule: { type: 'off_by', value: 0 },  // Answer equals sum instead of product
          weight: 0.7
        },
        {
          type: 'feature',
          features: { operationSwap: true },
          weight: 0.6
        }
      ],
      problemTypes: ['multiplication-basic', 'multiplication'],
      difficultyRange: [2, 5],
      requiredSkills: ['multiplication-basic'],
      minOccurrences: 2,
      minConfidence: 0.6
    },
    remediation: {
      strategy: 'analogy',
      briefExplanation: 'Multiplication means "groups of" - it\'s faster than adding the same number many times.',
      detailedExplanation: '3 × 4 means "3 groups of 4" or "4 + 4 + 4". It\'s NOT 3 + 4. Think of it as: if you have 3 bags with 4 apples each, you have 3 × 4 = 12 apples total.',
      counterExample: {
        setup: '5 × 6 = ?',
        wrongApproach: '5 + 6 = 11 (this is adding, not multiplying)',
        correctApproach: '5 groups of 6 = 6 + 6 + 6 + 6 + 6 = 30, or use times table: 5 × 6 = 30'
      },
      warmupProblems: ['mult-concept-warmup-1', 'mult-concept-warmup-2'],
      practiceProblems: ['mult-concept-practice-1', 'mult-concept-practice-2'],
      challengeProblems: ['mult-concept-challenge-1'],
      estimatedProblems: 8,
      estimatedTimeMinutes: 15
    },
    source: 'expert',
    confidence: 0.9,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  }
]

// ============================================================================
// FRACTION MISCONCEPTIONS (Grades 3-8)
// ============================================================================

export const FRACTION_MISCONCEPTIONS: Misconception[] = [
  {
    id: 'frac-001',
    name: 'Adding Numerators and Denominators',
    description: 'When adding fractions, adds both numerators and denominators (e.g., 1/2 + 1/3 = 2/5).',
    subject: 'math',
    category: 'fractions',
    severity: 'major',
    prevalence: 0.35,
    gradeRangeStart: 3,
    gradeRangeEnd: 6,
    detectionRules: {
      errorPatterns: [
        {
          type: 'feature',
          features: { addedNumeratorsAndDenominators: true },
          weight: 1.0
        },
        {
          type: 'regex',
          pattern: 'fraction_naive_add',
          weight: 0.9
        }
      ],
      problemTypes: ['fraction-addition', 'fraction-subtraction'],
      difficultyRange: [3, 7],
      requiredSkills: ['fractions-operations', 'common-denominators'],
      minOccurrences: 2,
      minConfidence: 0.8
    },
    remediation: {
      strategy: 'counter_example',
      briefExplanation: 'You can\'t add fractions by adding tops and bottoms. You need a common denominator first.',
      detailedExplanation: 'Think of it this way: 1/2 is half a pizza, 1/3 is a third of a pizza. Adding them should give you MORE than half (5/6), not less (2/5). The denominator tells you what SIZE the pieces are. You can only add pieces of the same size (same denominator).',
      counterExample: {
        setup: '1/2 + 1/2 = ?',
        wrongApproach: 'Adding tops and bottoms: 1/2 + 1/2 = 2/4 = 1/2 (half plus half equals half?!)',
        correctApproach: 'Same denominator, so just add tops: 1/2 + 1/2 = 2/2 = 1 (half plus half equals one whole!)'
      },
      warmupProblems: ['frac-add-same-denom-1', 'frac-add-same-denom-2'],
      practiceProblems: ['frac-add-diff-denom-1', 'frac-add-diff-denom-2', 'frac-add-diff-denom-3'],
      challengeProblems: ['frac-add-challenge-1'],
      estimatedProblems: 12,
      estimatedTimeMinutes: 25
    },
    source: 'research',
    confidence: 0.99,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'frac-002',
    name: 'Larger Denominator Means Larger Fraction',
    description: 'Believes that fractions with larger denominators are larger (e.g., thinks 1/5 > 1/3).',
    subject: 'math',
    category: 'fractions',
    severity: 'major',
    prevalence: 0.28,
    gradeRangeStart: 3,
    gradeRangeEnd: 5,
    detectionRules: {
      errorPatterns: [
        {
          type: 'regex',
          pattern: 'fraction_comparison_inverted',
          weight: 0.9
        }
      ],
      problemTypes: ['fraction-comparison', 'fraction-ordering'],
      difficultyRange: [3, 6],
      requiredSkills: ['fractions-basic', 'fraction-comparison'],
      minOccurrences: 2,
      minConfidence: 0.7
    },
    remediation: {
      strategy: 'analogy',
      briefExplanation: 'The denominator tells you how many pieces the whole is cut into. More pieces = smaller pieces!',
      detailedExplanation: 'Imagine sharing a pizza. If you share with 2 people (1/3 each), you get more than if you share with 4 people (1/5 each). The more people sharing, the smaller each piece. So 1/3 > 1/5 because thirds are bigger pieces than fifths.',
      counterExample: {
        setup: 'Which is larger: 1/4 or 1/8?',
        wrongApproach: '1/8 is larger because 8 > 4',
        correctApproach: '1/4 is larger because you\'re dividing into fewer (larger) pieces'
      },
      warmupProblems: ['frac-compare-visual-1', 'frac-compare-visual-2'],
      practiceProblems: ['frac-compare-1', 'frac-compare-2', 'frac-compare-3'],
      challengeProblems: ['frac-compare-challenge-1'],
      estimatedProblems: 10,
      estimatedTimeMinutes: 20
    },
    source: 'research',
    confidence: 0.95,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'frac-003',
    name: 'Invert-and-Multiply Applied Incorrectly',
    description: 'When dividing fractions, inverts the wrong fraction or applies to multiplication.',
    subject: 'math',
    category: 'fractions',
    severity: 'moderate',
    prevalence: 0.2,
    gradeRangeStart: 5,
    gradeRangeEnd: 7,
    detectionRules: {
      errorPatterns: [
        {
          type: 'feature',
          features: { invertedWrongFraction: true },
          weight: 0.9
        }
      ],
      problemTypes: ['fraction-division', 'fraction-multiplication'],
      difficultyRange: [5, 8],
      requiredSkills: ['fractions-operations', 'fraction-division'],
      minOccurrences: 2,
      minConfidence: 0.7
    },
    remediation: {
      strategy: 'procedural_drill',
      briefExplanation: 'To divide by a fraction, multiply by its reciprocal. Only flip the SECOND fraction (the divisor).',
      detailedExplanation: 'For a ÷ b, you flip b and multiply: a × (1/b). In fraction division: (2/3) ÷ (4/5) = (2/3) × (5/4). Only flip the fraction you\'re dividing BY (the one after the ÷ sign).',
      counterExample: {
        setup: '(2/3) ÷ (1/2) = ?',
        wrongApproach: 'Flipping the first: (3/2) × (1/2) = 3/4 (wrong!)',
        correctApproach: 'Flip the second: (2/3) × (2/1) = 4/3'
      },
      warmupProblems: ['frac-div-reciprocal-1', 'frac-div-reciprocal-2'],
      practiceProblems: ['frac-div-practice-1', 'frac-div-practice-2', 'frac-div-practice-3'],
      challengeProblems: ['frac-div-challenge-1'],
      estimatedProblems: 10,
      estimatedTimeMinutes: 20
    },
    source: 'expert',
    confidence: 0.92,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  }
]

// ============================================================================
// ALGEBRA MISCONCEPTIONS (Grades 6-12)
// ============================================================================

export const ALGEBRA_MISCONCEPTIONS: Misconception[] = [
  {
    id: 'alg-001',
    name: 'Distribution Over Addition Fallacy',
    description: 'Believes (a + b)² = a² + b², missing the middle term 2ab.',
    subject: 'math',
    category: 'algebra',
    severity: 'major',
    prevalence: 0.3,
    gradeRangeStart: 7,
    gradeRangeEnd: 10,
    detectionRules: {
      errorPatterns: [
        {
          type: 'feature',
          features: { distributionError: true },
          weight: 0.95
        },
        {
          type: 'regex',
          pattern: 'missing_middle_term',
          weight: 0.9
        }
      ],
      problemTypes: ['algebra', 'polynomial', 'foil', 'expansion'],
      difficultyRange: [7, 11],
      requiredSkills: ['algebraic-thinking', 'polynomial-operations'],
      minOccurrences: 2,
      minConfidence: 0.8
    },
    remediation: {
      strategy: 'counter_example',
      briefExplanation: '(a + b)² means (a + b)(a + b), which gives a² + 2ab + b². You can\'t "distribute" the square to each term.',
      detailedExplanation: 'Try it with numbers: (2 + 3)² = 5² = 25. But 2² + 3² = 4 + 9 = 13 ≠ 25. The correct expansion uses FOIL: (a+b)(a+b) = a² + ab + ba + b² = a² + 2ab + b².',
      counterExample: {
        setup: '(3 + 4)² = ?',
        wrongApproach: '3² + 4² = 9 + 16 = 25 (but 3+4=7, and 7²=49, not 25!)',
        correctApproach: '(3+4)² = 7² = 49, or: 9 + 2(12) + 16 = 9 + 24 + 16 = 49'
      },
      warmupProblems: ['alg-foil-warmup-1', 'alg-foil-warmup-2'],
      practiceProblems: ['alg-foil-practice-1', 'alg-foil-practice-2', 'alg-foil-practice-3'],
      challengeProblems: ['alg-foil-challenge-1'],
      estimatedProblems: 12,
      estimatedTimeMinutes: 25
    },
    source: 'research',
    confidence: 0.98,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'alg-002',
    name: 'Variable as Label, Not Quantity',
    description: 'Treats variables as labels or abbreviations rather than unknown quantities.',
    subject: 'math',
    category: 'algebra',
    severity: 'fundamental',
    prevalence: 0.25,
    gradeRangeStart: 6,
    gradeRangeEnd: 8,
    detectionRules: {
      errorPatterns: [
        {
          type: 'regex',
          pattern: 'variable_as_label',
          weight: 0.8
        }
      ],
      problemTypes: ['algebra', 'linear-equations', 'word-problems'],
      difficultyRange: [6, 9],
      requiredSkills: ['algebraic-thinking', 'variable-understanding'],
      minOccurrences: 3,
      minConfidence: 0.6
    },
    remediation: {
      strategy: 'conceptual_change',
      briefExplanation: 'A variable like x represents an unknown NUMBER, not an abbreviation. x apples doesn\'t mean "x = apples", it means "some number of apples".',
      detailedExplanation: 'In algebra, letters stand for numbers we don\'t know yet. If "3x = 12", we\'re asking "3 times what number equals 12?" The x isn\'t a label - it\'s a mystery number we\'re solving for. Here, x = 4 because 3 × 4 = 12.',
      warmupProblems: ['alg-variable-concept-1', 'alg-variable-concept-2'],
      practiceProblems: ['alg-variable-practice-1', 'alg-variable-practice-2'],
      challengeProblems: ['alg-variable-challenge-1'],
      estimatedProblems: 10,
      estimatedTimeMinutes: 20
    },
    source: 'research',
    confidence: 0.9,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'alg-003',
    name: 'Combining Unlike Terms',
    description: 'Adds or subtracts terms with different variables (e.g., 3x + 2y = 5xy).',
    subject: 'math',
    category: 'algebra',
    severity: 'major',
    prevalence: 0.22,
    gradeRangeStart: 6,
    gradeRangeEnd: 9,
    detectionRules: {
      errorPatterns: [
        {
          type: 'feature',
          features: { combiningUnlikeTerms: true },
          weight: 0.95
        }
      ],
      problemTypes: ['algebra', 'simplification', 'polynomial'],
      difficultyRange: [6, 10],
      requiredSkills: ['algebraic-thinking', 'like-terms'],
      minOccurrences: 2,
      minConfidence: 0.75
    },
    remediation: {
      strategy: 'analogy',
      briefExplanation: 'You can only combine like terms. Think of it like fruit: 3 apples + 2 oranges ≠ 5 apple-oranges!',
      detailedExplanation: 'Like terms have the same variable parts. 3x and 5x are like terms (both have x). 3x and 2y are NOT like terms (different variables). Just like you can\'t add 3 apples + 2 bananas and get 5 "apple-bananas", you can\'t combine 3x + 2y into one term.',
      counterExample: {
        setup: '3x + 2y + 5x = ?',
        wrongApproach: '10xy (combining everything incorrectly)',
        correctApproach: '8x + 2y (only combine the like terms: 3x + 5x = 8x)'
      },
      warmupProblems: ['alg-like-terms-warmup-1', 'alg-like-terms-warmup-2'],
      practiceProblems: ['alg-like-terms-practice-1', 'alg-like-terms-practice-2'],
      challengeProblems: ['alg-like-terms-challenge-1'],
      estimatedProblems: 10,
      estimatedTimeMinutes: 18
    },
    source: 'expert',
    confidence: 0.95,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'alg-004',
    name: 'Equation Balance Violation',
    description: 'Performs operations on only one side of an equation, breaking the balance.',
    subject: 'math',
    category: 'algebra',
    severity: 'major',
    prevalence: 0.2,
    gradeRangeStart: 6,
    gradeRangeEnd: 9,
    detectionRules: {
      errorPatterns: [
        {
          type: 'regex',
          pattern: 'equation_unbalanced_operation',
          weight: 0.85
        }
      ],
      problemTypes: ['linear-equations', 'equation-solving'],
      difficultyRange: [6, 10],
      requiredSkills: ['linear-equations', 'equation-balance'],
      minOccurrences: 2,
      minConfidence: 0.7
    },
    remediation: {
      strategy: 'analogy',
      briefExplanation: 'An equation is like a balanced scale. Whatever you do to one side, you must do to the other to keep it balanced.',
      detailedExplanation: 'Think of an equation as a perfectly balanced scale. The = sign is the fulcrum. If you add 5 pounds to one side, you must add 5 pounds to the other side, or it tips! Same with equations: if you subtract 3 from the left side, subtract 3 from the right side too.',
      counterExample: {
        setup: 'x + 5 = 12',
        wrongApproach: 'x = 12 - 5 = 7, but only subtracting from right side',
        correctApproach: 'Subtract 5 from BOTH sides: x + 5 - 5 = 12 - 5, so x = 7'
      },
      warmupProblems: ['alg-balance-warmup-1', 'alg-balance-warmup-2'],
      practiceProblems: ['alg-balance-practice-1', 'alg-balance-practice-2'],
      challengeProblems: ['alg-balance-challenge-1'],
      estimatedProblems: 10,
      estimatedTimeMinutes: 20
    },
    source: 'expert',
    confidence: 0.92,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'alg-005',
    name: 'Negative Sign Distribution Error',
    description: 'Fails to distribute negative sign to all terms in parentheses (e.g., -(3x + 5) = -3x + 5).',
    subject: 'math',
    category: 'algebra',
    severity: 'major',
    prevalence: 0.28,
    gradeRangeStart: 7,
    gradeRangeEnd: 10,
    detectionRules: {
      errorPatterns: [
        {
          type: 'feature',
          features: { signError: true, distributionError: true },
          weight: 0.9
        }
      ],
      problemTypes: ['algebra', 'simplification', 'distribution'],
      difficultyRange: [7, 11],
      requiredSkills: ['algebraic-thinking', 'distribution'],
      minOccurrences: 2,
      minConfidence: 0.75
    },
    remediation: {
      strategy: 'procedural_drill',
      briefExplanation: 'When you have a negative sign (or -1) in front of parentheses, it multiplies EVERY term inside by -1.',
      detailedExplanation: '-(3x + 5) means -1 × (3x + 5). Distribute the -1 to BOTH terms: (-1 × 3x) + (-1 × 5) = -3x + (-5) = -3x - 5. Don\'t forget the second term!',
      counterExample: {
        setup: '-(4x + 7) = ?',
        wrongApproach: '-4x + 7 (only applied negative to first term)',
        correctApproach: '-4x - 7 (negative applies to both terms)'
      },
      warmupProblems: ['alg-neg-dist-warmup-1', 'alg-neg-dist-warmup-2'],
      practiceProblems: ['alg-neg-dist-practice-1', 'alg-neg-dist-practice-2', 'alg-neg-dist-practice-3'],
      challengeProblems: ['alg-neg-dist-challenge-1'],
      estimatedProblems: 12,
      estimatedTimeMinutes: 22
    },
    source: 'expert',
    confidence: 0.94,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  }
]

// ============================================================================
// DECIMAL/PERCENT MISCONCEPTIONS (Grades 4-8)
// ============================================================================

export const DECIMAL_PERCENT_MISCONCEPTIONS: Misconception[] = [
  {
    id: 'dec-001',
    name: 'Decimal Place Value Confusion',
    description: 'Believes 0.45 > 0.6 because 45 > 6, ignoring place value.',
    subject: 'math',
    category: 'decimals',
    severity: 'major',
    prevalence: 0.3,
    gradeRangeStart: 4,
    gradeRangeEnd: 6,
    detectionRules: {
      errorPatterns: [
        {
          type: 'regex',
          pattern: 'decimal_whole_number_comparison',
          weight: 0.9
        },
        {
          type: 'feature',
          features: { decimalPlaceError: true },
          weight: 0.8
        }
      ],
      problemTypes: ['decimal-comparison', 'decimal-ordering'],
      difficultyRange: [4, 7],
      requiredSkills: ['decimals-basic', 'place-value'],
      minOccurrences: 2,
      minConfidence: 0.75
    },
    remediation: {
      strategy: 'conceptual_change',
      briefExplanation: 'Decimals work like fractions: 0.6 = 6/10 = 60/100, while 0.45 = 45/100. Since 60/100 > 45/100, we have 0.6 > 0.45.',
      detailedExplanation: 'Add trailing zeros to compare: 0.6 = 0.60 and 0.45 = 0.45. Now both have two decimal places: 60 hundredths vs 45 hundredths. 60 > 45, so 0.60 > 0.45.',
      counterExample: {
        setup: 'Which is larger: 0.7 or 0.35?',
        wrongApproach: '0.35 is larger because 35 > 7',
        correctApproach: '0.7 = 0.70 = 70 hundredths, 0.35 = 35 hundredths. 70 > 35, so 0.7 > 0.35'
      },
      warmupProblems: ['dec-compare-warmup-1', 'dec-compare-warmup-2'],
      practiceProblems: ['dec-compare-practice-1', 'dec-compare-practice-2'],
      challengeProblems: ['dec-compare-challenge-1'],
      estimatedProblems: 10,
      estimatedTimeMinutes: 18
    },
    source: 'research',
    confidence: 0.96,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'dec-002',
    name: 'Percent as Number, Not Ratio',
    description: 'Treats percent as a regular number rather than a ratio (e.g., 50% of 20 = 50 + 20).',
    subject: 'math',
    category: 'decimals',
    severity: 'major',
    prevalence: 0.22,
    gradeRangeStart: 5,
    gradeRangeEnd: 7,
    detectionRules: {
      errorPatterns: [
        {
          type: 'regex',
          pattern: 'percent_additive_error',
          weight: 0.85
        }
      ],
      problemTypes: ['percentages', 'percent-of'],
      difficultyRange: [5, 8],
      requiredSkills: ['percentages', 'ratio-understanding'],
      minOccurrences: 2,
      minConfidence: 0.7
    },
    remediation: {
      strategy: 'conceptual_change',
      briefExplanation: 'Percent means "per hundred" or "out of 100". 50% means 50 out of every 100, or half. So 50% of 20 = half of 20 = 10.',
      detailedExplanation: '% means ÷ 100. So 50% = 50 ÷ 100 = 0.50 = 1/2. To find 50% of 20: 0.50 × 20 = 10, or (1/2) × 20 = 10. Percent is a multiplier, not something to add!',
      counterExample: {
        setup: 'What is 25% of 80?',
        wrongApproach: '25 + 80 = 105 (treating percent as addition)',
        correctApproach: '25% = 0.25, so 0.25 × 80 = 20, or: 80 ÷ 4 = 20'
      },
      warmupProblems: ['pct-concept-warmup-1', 'pct-concept-warmup-2'],
      practiceProblems: ['pct-of-practice-1', 'pct-of-practice-2', 'pct-of-practice-3'],
      challengeProblems: ['pct-of-challenge-1'],
      estimatedProblems: 12,
      estimatedTimeMinutes: 22
    },
    source: 'expert',
    confidence: 0.9,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  }
]

// ============================================================================
// ORDER OF OPERATIONS MISCONCEPTIONS (Grades 5-9)
// ============================================================================

export const ORDER_OF_OPERATIONS_MISCONCEPTIONS: Misconception[] = [
  {
    id: 'oop-001',
    name: 'Left-to-Right Only',
    description: 'Evaluates expressions strictly left-to-right, ignoring operation precedence.',
    subject: 'math',
    category: 'arithmetic',
    severity: 'major',
    prevalence: 0.35,
    gradeRangeStart: 5,
    gradeRangeEnd: 8,
    detectionRules: {
      errorPatterns: [
        {
          type: 'feature',
          features: { orderOfOperationsError: true },
          weight: 0.95
        }
      ],
      problemTypes: ['order-of-operations', 'mixed-operations', 'arithmetic'],
      difficultyRange: [5, 9],
      requiredSkills: ['order-of-operations'],
      minOccurrences: 2,
      minConfidence: 0.8
    },
    remediation: {
      strategy: 'procedural_drill',
      briefExplanation: 'Follow PEMDAS: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right).',
      detailedExplanation: 'In 3 + 4 × 2: multiplication comes before addition. So: 4 × 2 = 8 first, then 3 + 8 = 11. NOT (3 + 4) × 2 = 14. Use PEMDAS as your guide, but remember M/D and A/S are done left-to-right within their level.',
      counterExample: {
        setup: '2 + 3 × 4 = ?',
        wrongApproach: '(2 + 3) × 4 = 5 × 4 = 20 (left to right)',
        correctApproach: '2 + (3 × 4) = 2 + 12 = 14 (multiplication first)'
      },
      warmupProblems: ['oop-pemdas-warmup-1', 'oop-pemdas-warmup-2'],
      practiceProblems: ['oop-pemdas-practice-1', 'oop-pemdas-practice-2', 'oop-pemdas-practice-3'],
      challengeProblems: ['oop-pemdas-challenge-1'],
      estimatedProblems: 15,
      estimatedTimeMinutes: 25
    },
    source: 'research',
    confidence: 0.97,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  },
  
  {
    id: 'oop-002',
    name: 'PEMDAS as Strict Sequence',
    description: 'Believes multiplication always comes before division, addition before subtraction.',
    subject: 'math',
    category: 'arithmetic',
    severity: 'moderate',
    prevalence: 0.18,
    gradeRangeStart: 5,
    gradeRangeEnd: 8,
    detectionRules: {
      errorPatterns: [
        {
          type: 'regex',
          pattern: 'pemdas_strict_order',
          weight: 0.8
        }
      ],
      problemTypes: ['order-of-operations', 'mixed-operations'],
      difficultyRange: [5, 9],
      requiredSkills: ['order-of-operations'],
      minOccurrences: 2,
      minConfidence: 0.65
    },
    remediation: {
      strategy: 'conceptual_change',
      briefExplanation: 'M and D have EQUAL priority - do them left to right. Same for A and S.',
      detailedExplanation: 'PEMDAS groups are: P, E, then MD together (left to right), then AS together (left to right). In 8 ÷ 4 × 2: both ÷ and × are same priority, so go left to right: 8 ÷ 4 = 2, then 2 × 2 = 4.',
      counterExample: {
        setup: '24 ÷ 6 × 2 = ?',
        wrongApproach: '24 ÷ (6 × 2) = 24 ÷ 12 = 2 (doing × before ÷)',
        correctApproach: '(24 ÷ 6) × 2 = 4 × 2 = 8 (left to right)'
      },
      warmupProblems: ['oop-equal-priority-warmup-1', 'oop-equal-priority-warmup-2'],
      practiceProblems: ['oop-equal-priority-practice-1', 'oop-equal-priority-practice-2'],
      challengeProblems: ['oop-equal-priority-challenge-1'],
      estimatedProblems: 10,
      estimatedTimeMinutes: 18
    },
    source: 'expert',
    confidence: 0.88,
    lastUpdated: new Date('2026-01-09'),
    sampleSize: 0
  }
]

// ============================================================================
// EXPORT ALL MATH MISCONCEPTIONS
// ============================================================================

export const ALL_MATH_MISCONCEPTIONS: Misconception[] = [
  ...ARITHMETIC_MISCONCEPTIONS,
  ...FRACTION_MISCONCEPTIONS,
  ...ALGEBRA_MISCONCEPTIONS,
  ...DECIMAL_PERCENT_MISCONCEPTIONS,
  ...ORDER_OF_OPERATIONS_MISCONCEPTIONS,
]

// Quick lookup by ID
export const MATH_MISCONCEPTIONS_BY_ID = new Map(
  ALL_MATH_MISCONCEPTIONS.map(m => [m.id, m])
)

// Lookup by category
export const MATH_MISCONCEPTIONS_BY_CATEGORY = ALL_MATH_MISCONCEPTIONS.reduce(
  (acc, m) => {
    if (!acc[m.category]) acc[m.category] = []
    acc[m.category].push(m)
    return acc
  },
  {} as Record<string, Misconception[]>
)

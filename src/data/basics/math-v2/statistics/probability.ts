/**
 * Statistics - Probability (MathProblemV2 format)
 * Grade levels: 7-10
 * 
 * Topics covered:
 * - Basic probability (single events)
 * - Complement rule
 * - Compound events (independent, dependent)
 * - Addition rule
 * - Conditional probability
 * - Expected value
 * - Combinations
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const PROBABILITY_PROBLEMS_V2: MathProblemV2[] = [
  // --- BASIC PROBABILITY ---
  {
    id: 'stat-v2-g7-prob-001',
    version: 2,
    type: 'probability',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A standard die is rolled. What is the probability of rolling a number greater than 4?',
      latex: 'P(X > 4) = ?'
    },
    answer: {
      type: 'fraction',
      correct: '1/3',
      acceptable: ['2/6', '0.333', '0.33', '33%']
    },
    visuals: {
      diagram: {
        type: 'pictograph',
        width: 350,
        height: 100,
        description: 'Six dice faces with 5 and 6 highlighted as favorable outcomes',
        svg: `<svg viewBox="0 0 350 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="40" height="40" rx="5" fill="#e5e7eb" stroke="#374151"/>
          <circle cx="40" cy="40" r="4" fill="#374151"/>
          <rect x="70" y="20" width="40" height="40" rx="5" fill="#e5e7eb" stroke="#374151"/>
          <circle cx="82" cy="32" r="3" fill="#374151"/>
          <circle cx="98" cy="48" r="3" fill="#374151"/>
          <rect x="120" y="20" width="40" height="40" rx="5" fill="#e5e7eb" stroke="#374151"/>
          <circle cx="132" cy="28" r="3" fill="#374151"/>
          <circle cx="140" cy="40" r="3" fill="#374151"/>
          <circle cx="148" cy="52" r="3" fill="#374151"/>
          <rect x="170" y="20" width="40" height="40" rx="5" fill="#e5e7eb" stroke="#374151"/>
          <circle cx="182" cy="30" r="3" fill="#374151"/>
          <circle cx="198" cy="30" r="3" fill="#374151"/>
          <circle cx="182" cy="50" r="3" fill="#374151"/>
          <circle cx="198" cy="50" r="3" fill="#374151"/>
          <rect x="220" y="20" width="40" height="40" rx="5" fill="#10b981" stroke="#059669" stroke-width="2"/>
          <circle cx="232" cy="28" r="3" fill="white"/>
          <circle cx="248" cy="28" r="3" fill="white"/>
          <circle cx="240" cy="40" r="3" fill="white"/>
          <circle cx="232" cy="52" r="3" fill="white"/>
          <circle cx="248" cy="52" r="3" fill="white"/>
          <rect x="270" y="20" width="40" height="40" rx="5" fill="#10b981" stroke="#059669" stroke-width="2"/>
          <circle cx="282" cy="28" r="3" fill="white"/>
          <circle cx="298" cy="28" r="3" fill="white"/>
          <circle cx="282" cy="40" r="3" fill="white"/>
          <circle cx="298" cy="40" r="3" fill="white"/>
          <circle cx="282" cy="52" r="3" fill="white"/>
          <circle cx="298" cy="52" r="3" fill="white"/>
          <text x="175" y="85" font-size="11" text-anchor="middle" fill="#374151">Favorable: 5, 6 (highlighted) → P = 2/6 = 1/3</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify favorable outcomes', latex: '\\text{Greater than 4: } 5, 6 \\text{ (2 outcomes)}' },
        { number: 2, description: 'Identify total outcomes', latex: '\\text{Total: } 1, 2, 3, 4, 5, 6 \\text{ (6 outcomes)}' },
        { number: 3, description: 'Calculate probability', latex: 'P(>4) = \\frac{2}{6} = \\frac{1}{3}' }
      ],
      method: 'Basic probability formula'
    },
    hints: [
      { level: 'gentle', text: 'Count outcomes greater than 4 (that\'s 5 and 6), divide by total outcomes.' },
      { level: 'moderate', text: 'Favorable: 5, 6 (2 outcomes). Total: 6 outcomes.' },
      { level: 'explicit', text: 'P(>4) = 2/6 = 1/3' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Basic probability',
      skills: ['probability', 'fractions'],
      prerequisites: ['fractions', 'counting'],
      concepts: ['probability', 'favorable-outcomes', 'sample-space'],
      commonMistakes: ['Including 4 in favorable outcomes', 'Wrong total count'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'basic', 'dice']
    }
  },

  // --- PROBABILITY FROM BAG ---
  {
    id: 'stat-v2-g8-prob-002',
    version: 2,
    type: 'probability',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A bag contains 3 red balls, 5 blue balls, and 2 green balls. What is the probability of drawing a blue ball?',
      latex: 'P(\\text{blue}) = ?'
    },
    answer: {
      type: 'fraction',
      correct: '1/2',
      acceptable: ['0.5', '5/10', '50%', '0.50']
    },
    visuals: {
      diagram: {
        type: 'pie-chart',
        width: 250,
        height: 200,
        description: 'Pie chart showing distribution: 3 red, 5 blue, 2 green balls',
        svg: `<svg viewBox="0 0 250 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="70" fill="#3b82f6"/>
          <path d="M 100 100 L 100 30 A 70 70 0 0 1 156 138 Z" fill="#dc2626"/>
          <path d="M 100 100 L 156 138 A 70 70 0 0 1 100 170 Z" fill="#10b981"/>
          <text x="65" y="90" font-size="12" fill="white" font-weight="bold">Blue</text>
          <text x="70" y="105" font-size="10" fill="white">5/10</text>
          <text x="130" y="75" font-size="10" fill="white" font-weight="bold">Red</text>
          <text x="130" y="87" font-size="9" fill="white">3/10</text>
          <text x="115" y="145" font-size="9" fill="white" font-weight="bold">Green</text>
          <text x="118" y="157" font-size="8" fill="white">2/10</text>
          <text x="200" y="50" font-size="10" fill="#dc2626">● Red: 3</text>
          <text x="200" y="70" font-size="10" fill="#3b82f6">● Blue: 5</text>
          <text x="200" y="90" font-size="10" fill="#10b981">● Green: 2</text>
          <text x="200" y="115" font-size="10" fill="#374151">Total: 10</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Count favorable outcomes (blue balls)', latex: '\\text{Blue balls} = 5' },
        { number: 2, description: 'Count total outcomes', latex: '\\text{Total} = 3 + 5 + 2 = 10' },
        { number: 3, description: 'Calculate probability', latex: 'P(\\text{blue}) = \\frac{5}{10} = \\frac{1}{2}' }
      ],
      method: 'Basic probability formula'
    },
    hints: [
      { level: 'gentle', text: 'P(event) = favorable outcomes / total outcomes' },
      { level: 'moderate', text: 'Blue balls: 5. Total balls: 3 + 5 + 2 = 10.' },
      { level: 'explicit', text: 'P(blue) = 5/10 = 1/2 = 50%' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Basic probability',
      skills: ['probability', 'fractions'],
      prerequisites: ['fractions', 'addition'],
      concepts: ['probability', 'sample-space'],
      commonMistakes: ['Forgetting to add all balls for total'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'basic', 'balls']
    }
  },

  // --- COMPLEMENT ---
  {
    id: 'stat-v2-g8-prob-003',
    version: 2,
    type: 'probability',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'If the probability of rain tomorrow is 0.3, what is the probability it will NOT rain?',
      latex: 'P(\\text{rain}) = 0.3, \\quad P(\\text{not rain}) = ?'
    },
    answer: {
      type: 'numeric',
      correct: 0.7,
      acceptable: ['0.7', '0.70', '70%', '7/10'],
      tolerance: 0.01
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply complement rule', latex: "P(A') = 1 - P(A)" },
        { number: 2, description: 'Substitute', latex: 'P(\\text{not rain}) = 1 - 0.3 = 0.7' }
      ],
      method: 'Complement rule'
    },
    hints: [
      { level: 'gentle', text: 'P(not happening) = 1 - P(happening)' },
      { level: 'moderate', text: 'The probabilities must add to 1.' },
      { level: 'explicit', text: '1 - 0.3 = 0.7 = 70%' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Complement',
      skills: ['probability', 'subtraction'],
      prerequisites: ['basic_probability'],
      concepts: ['complement', 'probability-sum'],
      commonMistakes: ['Subtracting wrong way', 'Forgetting total is 1'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'complement']
    }
  },

  // --- INDEPENDENT EVENTS ---
  {
    id: 'stat-v2-g8-prob-004',
    version: 2,
    type: 'probability',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A coin is flipped twice. What is the probability of getting heads both times?',
      latex: 'P(HH) = ?'
    },
    answer: {
      type: 'fraction',
      correct: '1/4',
      acceptable: ['0.25', '25%', '0.250']
    },
    visuals: {
      diagram: {
        type: 'probability-tree',
        width: 300,
        height: 180,
        description: 'Probability tree showing outcomes of two coin flips',
        svg: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="90" x2="120" y2="45" stroke="#374151" stroke-width="1"/>
          <line x1="50" y1="90" x2="120" y2="135" stroke="#374151" stroke-width="1"/>
          <line x1="120" y1="45" x2="200" y2="25" stroke="#10b981" stroke-width="2"/>
          <line x1="120" y1="45" x2="200" y2="65" stroke="#374151" stroke-width="1"/>
          <line x1="120" y1="135" x2="200" y2="115" stroke="#374151" stroke-width="1"/>
          <line x1="120" y1="135" x2="200" y2="155" stroke="#374151" stroke-width="1"/>
          <circle cx="50" cy="90" r="8" fill="#3b82f6"/>
          <circle cx="120" cy="45" r="8" fill="#f59e0b"/>
          <circle cx="120" cy="135" r="8" fill="#f59e0b"/>
          <circle cx="200" cy="25" r="8" fill="#10b981" stroke="#059669" stroke-width="2"/>
          <circle cx="200" cy="65" r="6" fill="#e5e7eb"/>
          <circle cx="200" cy="115" r="6" fill="#e5e7eb"/>
          <circle cx="200" cy="155" r="6" fill="#e5e7eb"/>
          <text x="80" y="60" font-size="9" fill="#374151">H(1/2)</text>
          <text x="80" y="120" font-size="9" fill="#374151">T(1/2)</text>
          <text x="155" y="28" font-size="9" fill="#059669" font-weight="bold">H</text>
          <text x="155" y="65" font-size="9" fill="#374151">T</text>
          <text x="220" y="30" font-size="10" fill="#10b981" font-weight="bold">HH: 1/4 ✓</text>
          <text x="220" y="68" font-size="9" fill="#374151">HT: 1/4</text>
          <text x="220" y="118" font-size="9" fill="#374151">TH: 1/4</text>
          <text x="220" y="158" font-size="9" fill="#374151">TT: 1/4</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'These are independent events', latex: 'P(A \\cap B) = P(A) \\times P(B)' },
        { number: 2, description: 'Probability of heads on first flip', latex: 'P(H_1) = \\frac{1}{2}' },
        { number: 3, description: 'Probability of heads on second flip', latex: 'P(H_2) = \\frac{1}{2}' },
        { number: 4, description: 'Multiply for both', latex: 'P(HH) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}' }
      ],
      method: 'Independent events multiplication'
    },
    hints: [
      { level: 'gentle', text: 'For independent events, multiply the probabilities.' },
      { level: 'moderate', text: 'P(heads) × P(heads) = ?' },
      { level: 'explicit', text: '1/2 × 1/2 = 1/4' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Independent events',
      skills: ['probability', 'multiplication'],
      prerequisites: ['basic_probability', 'fractions'],
      concepts: ['independence', 'compound-events'],
      commonMistakes: ['Adding instead of multiplying'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'independent', 'coin-flip']
    }
  },

  // --- DEPENDENT EVENTS ---
  {
    id: 'stat-v2-g8-prob-005',
    version: 2,
    type: 'probability',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'A bag has 5 red and 3 blue marbles. Two are drawn without replacement. What is the probability both are red?',
      latex: 'P(\\text{both red}) = ?'
    },
    answer: {
      type: 'fraction',
      correct: '5/14',
      acceptable: ['0.357', '0.36', '35.7%']
    },
    solution: {
      steps: [
        { number: 1, description: 'Probability first is red', latex: 'P(R_1) = \\frac{5}{8}' },
        { number: 2, description: 'After drawing a red, probability second is red', latex: 'P(R_2 | R_1) = \\frac{4}{7}' },
        { number: 3, description: 'Multiply for both events', latex: 'P(\\text{both}) = \\frac{5}{8} \\times \\frac{4}{7} = \\frac{20}{56} = \\frac{5}{14}' }
      ],
      method: 'Dependent events multiplication'
    },
    hints: [
      { level: 'gentle', text: 'After drawing the first red marble, there are fewer marbles left.' },
      { level: 'moderate', text: 'First: 5/8. Then 4 red remain out of 7 total: 4/7.' },
      { level: 'explicit', text: '5/8 × 4/7 = 20/56 = 5/14' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Dependent events',
      skills: ['probability', 'fractions'],
      prerequisites: ['basic_probability', 'multiplication'],
      concepts: ['dependence', 'without-replacement'],
      commonMistakes: ['Not updating counts after first draw'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'dependent', 'without-replacement']
    }
  },

  // --- ADDITION RULE ---
  {
    id: 'stat-v2-g9-prob-006',
    version: 2,
    type: 'probability',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'P(A) = 0.5, P(B) = 0.4, P(A and B) = 0.2. Find P(A or B).',
      latex: 'P(A \\cup B) = ?'
    },
    answer: {
      type: 'numeric',
      correct: 0.7,
      acceptable: ['0.7', '0.70', '70%', '7/10'],
      tolerance: 0.01
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply addition rule', latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)' },
        { number: 2, description: 'Substitute values', latex: '= 0.5 + 0.4 - 0.2' },
        { number: 3, description: 'Calculate', latex: '= 0.7' }
      ],
      method: 'Addition rule'
    },
    hints: [
      { level: 'gentle', text: 'P(A or B) = P(A) + P(B) - P(A and B)' },
      { level: 'moderate', text: 'We subtract P(A and B) to avoid counting it twice.' },
      { level: 'explicit', text: '0.5 + 0.4 - 0.2 = 0.7' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Addition rule',
      skills: ['probability', 'algebra'],
      prerequisites: ['basic_probability'],
      concepts: ['addition-rule', 'overlapping-events'],
      commonMistakes: ['Forgetting to subtract intersection', 'Adding all three'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'addition-rule', 'union']
    }
  },

  // --- EXPECTED VALUE ---
  {
    id: 'stat-v2-g9-prob-007',
    version: 2,
    type: 'probability',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A game pays $10 if you roll a 6 on a die, otherwise you win nothing. What is the expected value?',
      latex: 'E(X) = ?'
    },
    answer: {
      type: 'numeric',
      correct: 1.67,
      acceptable: ['$1.67', '10/6', '1.666', '1.7'],
      tolerance: 0.01
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify outcomes and probabilities', latex: 'P(6) = \\frac{1}{6}, \\quad P(\\text{not } 6) = \\frac{5}{6}' },
        { number: 2, description: 'Apply expected value formula', latex: 'E(X) = \\sum x_i \\cdot P(x_i)' },
        { number: 3, description: 'Calculate', latex: 'E(X) = 10 \\cdot \\frac{1}{6} + 0 \\cdot \\frac{5}{6} = \\frac{10}{6} \\approx \\$1.67' }
      ],
      method: 'Expected value formula'
    },
    hints: [
      { level: 'gentle', text: 'E(X) = (value × probability) for each outcome, then sum.' },
      { level: 'moderate', text: 'Win $10 with probability 1/6, win $0 with probability 5/6.' },
      { level: 'explicit', text: 'E(X) = 10(1/6) + 0(5/6) = $1.67' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Expected value',
      skills: ['probability', 'multiplication'],
      prerequisites: ['basic_probability', 'weighted_average'],
      concepts: ['expected-value', 'fair-game'],
      commonMistakes: ['Forgetting $0 outcome', 'Miscalculating probability'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'expected-value']
    }
  },

  // --- CONDITIONAL PROBABILITY ---
  {
    id: 'stat-v2-g9-prob-008',
    version: 2,
    type: 'probability',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'If P(A) = 0.6 and P(B|A) = 0.5, find P(A and B).',
      latex: 'P(A \\cap B) = ?'
    },
    answer: {
      type: 'numeric',
      correct: 0.3,
      acceptable: ['0.3', '0.30', '30%', '3/10'],
      tolerance: 0.01
    },
    solution: {
      steps: [
        { number: 1, description: 'Use conditional probability formula', latex: 'P(A \\cap B) = P(A) \\times P(B|A)' },
        { number: 2, description: 'Substitute values', latex: '= 0.6 \\times 0.5' },
        { number: 3, description: 'Calculate', latex: '= 0.3' }
      ],
      method: 'Conditional probability'
    },
    hints: [
      { level: 'gentle', text: 'P(A and B) = P(A) × P(B|A)' },
      { level: 'moderate', text: 'This formula connects conditional probability to joint probability.' },
      { level: 'explicit', text: '0.6 × 0.5 = 0.3' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Conditional probability',
      skills: ['probability', 'algebra'],
      prerequisites: ['basic_probability'],
      concepts: ['conditional-probability', 'joint-probability'],
      commonMistakes: ['Confusing P(B|A) with P(A|B)'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'conditional']
    }
  },

  // --- COMBINATIONS ---
  {
    id: 'stat-v2-g9-prob-009',
    version: 2,
    type: 'probability',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'In how many ways can you choose 3 students from a group of 5 students?',
      latex: 'C(5, 3) = \\binom{5}{3} = ?'
    },
    answer: {
      type: 'exact',
      correct: '10',
      acceptable: ['10 ways']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use combinations formula', latex: 'C(n, r) = \\frac{n!}{r!(n-r)!}' },
        { number: 2, description: 'Substitute n=5, r=3', latex: 'C(5, 3) = \\frac{5!}{3! \\cdot 2!}' },
        { number: 3, description: 'Calculate', latex: '= \\frac{5 \\times 4}{2 \\times 1} = \\frac{20}{2} = 10' }
      ],
      method: 'Combinations formula'
    },
    hints: [
      { level: 'gentle', text: 'Use C(n,r) = n! / (r!(n-r)!)' },
      { level: 'moderate', text: 'C(5,3) = 5!/(3!×2!)' },
      { level: 'explicit', text: '= (5×4)/(2×1) = 10' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Combinations',
      skills: ['probability', 'counting'],
      prerequisites: ['factorials'],
      concepts: ['combinations', 'counting-principle'],
      commonMistakes: ['Using permutations instead', 'Factorial errors'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'combinations', 'counting']
    }
  },

  // --- MUTUALLY EXCLUSIVE ---
  {
    id: 'stat-v2-g9-prob-010',
    version: 2,
    type: 'probability',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Events A and B are mutually exclusive. P(A) = 0.3 and P(B) = 0.4. Find P(A or B).',
      latex: 'P(A \\cup B) = ? \\text{ (mutually exclusive)}'
    },
    answer: {
      type: 'numeric',
      correct: 0.7,
      acceptable: ['0.7', '0.70', '70%'],
      tolerance: 0.01
    },
    solution: {
      steps: [
        { number: 1, description: 'For mutually exclusive events', latex: 'P(A \\cap B) = 0' },
        { number: 2, description: 'Apply simplified addition rule', latex: 'P(A \\cup B) = P(A) + P(B)' },
        { number: 3, description: 'Calculate', latex: '= 0.3 + 0.4 = 0.7' }
      ],
      method: 'Mutually exclusive events'
    },
    hints: [
      { level: 'gentle', text: 'Mutually exclusive means P(A and B) = 0.' },
      { level: 'moderate', text: 'So P(A or B) = P(A) + P(B) (no subtraction needed).' },
      { level: 'explicit', text: '0.3 + 0.4 = 0.7' }
    ],
    pedagogy: {
      topic: 'Probability',
      subTopic: 'Mutually exclusive events',
      skills: ['probability', 'addition'],
      prerequisites: ['addition_rule'],
      concepts: ['mutually-exclusive', 'disjoint-events'],
      commonMistakes: ['Subtracting when not needed'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['probability', 'mutually-exclusive']
    }
  }
]

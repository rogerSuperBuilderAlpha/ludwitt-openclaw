/**
 * Statistics - Distributions (MathProblemV2 format)
 * Grade levels: 10-12
 * 
 * Topics covered:
 * - Z-scores
 * - Normal distribution properties
 * - Empirical rule (68-95-99.7)
 * - Standard normal distribution
 * - Percentiles
 * - Probability calculations
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const DISTRIBUTIONS_PROBLEMS_V2: MathProblemV2[] = [
  // --- Z-SCORES ---
  {
    id: 'stat-v2-g10-zscore-001',
    version: 2,
    type: 'statistics',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A test has mean 75 and standard deviation 5. If a student scores 85, what is their z-score?',
      latex: '\\mu = 75, \\sigma = 5, x = 85, \\quad z = ?'
    },
    answer: {
      type: 'exact',
      correct: '2',
      acceptable: ['2.0', '2.00']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'exp(-(x-75)^2/(2*25))/(5*sqrt(2*3.14159))', color: '#2563eb', label: 'Normal(75, 5)' }
        ],
        domain: [55, 95],
        range: [0, 0.1],
        showGrid: true,
        points: [
          { x: 75, y: 0.08, label: 'μ=75', color: '#374151' },
          { x: 85, y: 0.008, label: 'x=85, z=2', color: '#dc2626' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply z-score formula', latex: 'z = \\frac{x - \\mu}{\\sigma}' },
        { number: 2, description: 'Substitute values', latex: 'z = \\frac{85 - 75}{5}' },
        { number: 3, description: 'Calculate', latex: 'z = \\frac{10}{5} = 2' }
      ],
      method: 'Z-score formula'
    },
    hints: [
      { level: 'gentle', text: 'z = (x - μ) / σ' },
      { level: 'moderate', text: 'z = (85 - 75) / 5' },
      { level: 'explicit', text: 'z = 10 / 5 = 2' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Z-scores',
      skills: ['statistics', 'algebra'],
      prerequisites: ['mean', 'standard_deviation'],
      concepts: ['z-score', 'standardization'],
      commonMistakes: ['Wrong order of subtraction', 'Forgetting to divide by SD'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'z-score', 'normal-distribution']
    }
  },

  // --- Z-SCORE INTERPRETATION ---
  {
    id: 'stat-v2-g10-zscore-002',
    version: 2,
    type: 'statistics',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A z-score of -1.5 means the value is how many standard deviations from the mean?',
      latex: 'z = -1.5 \\text{ means what?}'
    },
    answer: {
      type: 'exact',
      correct: '1.5 standard deviations below',
      acceptable: ['1.5 SD below', '1.5 below the mean']
    },
    solution: {
      steps: [
        { number: 1, description: 'Interpret the z-score', latex: 'z = -1.5' },
        { number: 2, description: 'The negative sign means below the mean', latex: '\\text{Negative} \\Rightarrow \\text{below mean}' },
        { number: 3, description: 'The magnitude tells how far', latex: '|{-1.5}| = 1.5 \\text{ standard deviations}' }
      ],
      method: 'Z-score interpretation'
    },
    hints: [
      { level: 'gentle', text: 'Negative z-scores indicate values below the mean.' },
      { level: 'moderate', text: 'The absolute value tells how many SDs away.' },
      { level: 'explicit', text: '1.5 standard deviations below the mean.' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Z-scores',
      skills: ['statistics', 'interpretation'],
      prerequisites: ['z_score_formula'],
      concepts: ['z-score-meaning', 'distance-from-mean'],
      commonMistakes: ['Ignoring the sign', 'Confusing above/below'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'z-score', 'interpretation']
    }
  },

  // --- EMPIRICAL RULE ---
  {
    id: 'stat-v2-g10-emp-001',
    version: 2,
    type: 'statistics',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'In a normal distribution, approximately what percentage of data falls within one standard deviation of the mean?',
      latex: 'P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx ?'
    },
    answer: {
      type: 'exact',
      correct: '68',
      acceptable: ['68%', '68 percent', 'about 68%']
    },
    visuals: {
      diagram: {
        type: 'histogram',
        width: 400,
        height: 200,
        description: 'Normal distribution curve showing 68% within 1 SD, 95% within 2 SD, 99.7% within 3 SD',
        svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 160 Q 100 158 140 145 Q 160 130 180 100 Q 190 70 200 50 Q 210 70 220 100 Q 240 130 260 145 Q 300 158 350 160" fill="none" stroke="#2563eb" stroke-width="2"/>
          <rect x="140" y="50" width="120" height="110" fill="#3b82f6" fill-opacity="0.3"/>
          <line x1="200" y1="40" x2="200" y2="170" stroke="#dc2626" stroke-width="2"/>
          <line x1="140" y1="145" x2="140" y2="165" stroke="#059669" stroke-width="2"/>
          <line x1="260" y1="145" x2="260" y2="165" stroke="#059669" stroke-width="2"/>
          <text x="200" y="185" font-size="10" text-anchor="middle" fill="#dc2626">μ</text>
          <text x="140" y="185" font-size="10" text-anchor="middle" fill="#059669">μ-σ</text>
          <text x="260" y="185" font-size="10" text-anchor="middle" fill="#059669">μ+σ</text>
          <text x="200" y="95" font-size="12" text-anchor="middle" fill="#1e3a5f" font-weight="bold">68%</text>
          <text x="200" y="25" font-size="11" text-anchor="middle" fill="#374151">Empirical Rule: 68-95-99.7</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the empirical rule (68-95-99.7)', latex: '\\text{68-95-99.7 rule}' },
        { number: 2, description: 'Within 1 SD → 68%', latex: 'P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 68\\%' }
      ],
      method: 'Empirical rule'
    },
    hints: [
      { level: 'gentle', text: 'The empirical rule uses the numbers 68, 95, and 99.7.' },
      { level: 'moderate', text: 'These correspond to 1, 2, and 3 standard deviations.' },
      { level: 'explicit', text: 'Within 1 SD: about 68%.' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Empirical rule',
      skills: ['statistics', 'memorization'],
      prerequisites: ['normal_distribution'],
      concepts: ['empirical-rule', '68-95-99.7'],
      commonMistakes: ['Confusing the percentages'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'empirical-rule', 'normal-distribution']
    }
  },

  // --- EMPIRICAL RULE APPLICATION ---
  {
    id: 'stat-v2-g10-emp-002',
    version: 2,
    type: 'statistics',
    difficulty: 10.5,
    gradeLevel: 10,
    question: {
      text: 'IQ scores have mean 100 and SD 15. What range contains the middle 95% of scores?',
      latex: '\\mu = 100, \\sigma = 15, \\text{ find 95\\% range}'
    },
    answer: {
      type: 'exact',
      correct: '70 to 130',
      acceptable: ['70-130', '[70, 130]', 'between 70 and 130']
    },
    visuals: {
      diagram: {
        type: 'histogram',
        width: 380,
        height: 160,
        description: 'Normal distribution of IQ scores showing 95% between 70 and 130',
        svg: `<svg viewBox="0 0 380 160" xmlns="http://www.w3.org/2000/svg">
          <path d="M 40 130 Q 70 128 100 120 Q 130 100 160 70 Q 175 50 190 40 Q 205 50 220 70 Q 250 100 280 120 Q 310 128 340 130" fill="none" stroke="#2563eb" stroke-width="2"/>
          <rect x="100" y="40" width="180" height="90" fill="#3b82f6" fill-opacity="0.25"/>
          <line x1="190" y1="35" x2="190" y2="140" stroke="#dc2626" stroke-width="1.5"/>
          <line x1="100" y1="120" x2="100" y2="140" stroke="#059669" stroke-width="2"/>
          <line x1="280" y1="120" x2="280" y2="140" stroke="#059669" stroke-width="2"/>
          <text x="190" y="152" font-size="9" text-anchor="middle" fill="#dc2626">μ=100</text>
          <text x="100" y="152" font-size="9" text-anchor="middle" fill="#059669" font-weight="bold">70</text>
          <text x="280" y="152" font-size="9" text-anchor="middle" fill="#059669" font-weight="bold">130</text>
          <text x="190" y="80" font-size="11" text-anchor="middle" fill="#1e3a5f" font-weight="bold">95%</text>
          <text x="190" y="20" font-size="10" text-anchor="middle" fill="#374151">IQ: μ ± 2σ = 100 ± 30</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: '95% is within 2 standard deviations', latex: '\\text{95\\% within } \\pm 2\\sigma' },
        { number: 2, description: 'Calculate the range', latex: '\\mu \\pm 2\\sigma = 100 \\pm 2(15)' },
        { number: 3, description: 'Simplify', latex: '= 100 \\pm 30 = [70, 130]' }
      ],
      method: 'Empirical rule application'
    },
    hints: [
      { level: 'gentle', text: '95% is within 2 standard deviations (from the empirical rule).' },
      { level: 'moderate', text: 'Calculate μ ± 2σ = 100 ± 2(15).' },
      { level: 'explicit', text: '100 - 30 = 70 and 100 + 30 = 130. Range: 70 to 130.' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Empirical rule',
      skills: ['statistics', 'algebra'],
      prerequisites: ['empirical_rule'],
      concepts: ['range-calculation', 'confidence-interval'],
      commonMistakes: ['Using 1 SD instead of 2', 'Arithmetic errors'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'empirical-rule', 'iq-scores']
    }
  },

  // --- STANDARD NORMAL ---
  {
    id: 'stat-v2-g11-normal-001',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'The standard normal distribution has what mean and standard deviation?',
      latex: 'Z \\sim N(?, ?)'
    },
    answer: {
      type: 'exact',
      correct: 'Mean 0, SD 1',
      acceptable: ['mean 0, SD 1', 'μ = 0, σ = 1', 'N(0,1)', '0 and 1']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'exp(-x^2/2)/sqrt(2*3.14159)', color: '#2563eb', label: 'Z ~ N(0, 1)' }
        ],
        domain: [-4, 4],
        range: [0, 0.5],
        showGrid: true,
        points: [{ x: 0, y: 0.4, label: 'μ=0', color: '#dc2626' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'The standard normal is the special case of normal distribution', latex: 'Z \\sim N(\\mu, \\sigma^2)' },
        { number: 2, description: 'With μ = 0 and σ = 1', latex: 'Z \\sim N(0, 1)' }
      ],
      method: 'Standard normal definition'
    },
    hints: [
      { level: 'gentle', text: 'The "standard" normal is normalized.' },
      { level: 'moderate', text: 'It\'s centered at 0 with unit standard deviation.' },
      { level: 'explicit', text: 'Mean = 0, Standard deviation = 1.' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Standard normal',
      skills: ['statistics', 'definitions'],
      prerequisites: ['normal_distribution'],
      concepts: ['standard-normal', 'z-distribution'],
      commonMistakes: ['Confusing mean and SD'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'standard-normal']
    }
  },

  // --- Z-TABLE USAGE ---
  {
    id: 'stat-v2-g11-ztable-001',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Using a z-table, P(Z < 1.96) ≈ 0.975. What is P(Z > 1.96)?',
      latex: 'P(Z < 1.96) = 0.975, \\quad P(Z > 1.96) = ?'
    },
    answer: {
      type: 'numeric',
      correct: 0.025,
      acceptable: ['0.025', '2.5%', '0.0250'],
      tolerance: 0.001
    },
    solution: {
      steps: [
        { number: 1, description: 'Use complement rule', latex: 'P(Z > z) = 1 - P(Z < z)' },
        { number: 2, description: 'Substitute', latex: 'P(Z > 1.96) = 1 - 0.975' },
        { number: 3, description: 'Calculate', latex: '= 0.025' }
      ],
      method: 'Complement rule with z-table'
    },
    hints: [
      { level: 'gentle', text: 'P(Z > z) = 1 - P(Z < z)' },
      { level: 'moderate', text: 'The total probability under the curve is 1.' },
      { level: 'explicit', text: '1 - 0.975 = 0.025' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Using z-tables',
      skills: ['statistics', 'probability'],
      prerequisites: ['z_scores', 'complement'],
      concepts: ['z-table', 'right-tail'],
      commonMistakes: ['Using wrong table direction', 'Subtraction error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'z-table', 'tail-probability']
    }
  },

  // --- PERCENTILES ---
  {
    id: 'stat-v2-g11-percentile-001',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'What z-score corresponds to the 84th percentile? (Approximately)',
      latex: 'P(Z < z) = 0.84, \\quad z \\approx ?'
    },
    answer: {
      type: 'exact',
      correct: '1',
      acceptable: ['1.0', 'about 1', 'approximately 1']
    },
    visuals: {
      diagram: {
        type: 'histogram',
        width: 350,
        height: 150,
        description: 'Normal curve showing 84th percentile at z = 1',
        svg: `<svg viewBox="0 0 350 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M 30 120 Q 60 118 90 110 Q 130 90 160 60 Q 175 40 175 35 Q 175 40 190 60 Q 220 90 260 110 Q 290 118 320 120" fill="none" stroke="#2563eb" stroke-width="2"/>
          <rect x="30" y="35" width="160" height="85" fill="#3b82f6" fill-opacity="0.3"/>
          <line x1="175" y1="35" x2="175" y2="130" stroke="#374151" stroke-width="1"/>
          <line x1="218" y1="75" x2="218" y2="130" stroke="#dc2626" stroke-width="2"/>
          <text x="175" y="142" font-size="9" text-anchor="middle" fill="#374151">0</text>
          <text x="218" y="142" font-size="9" text-anchor="middle" fill="#dc2626" font-weight="bold">1</text>
          <text x="100" y="75" font-size="10" text-anchor="middle" fill="#1e3a5f" font-weight="bold">84%</text>
          <text x="175" y="20" font-size="10" text-anchor="middle" fill="#374151">84th percentile ≈ z = 1</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall that 50% is below the mean (z = 0)', latex: 'P(Z < 0) = 0.50' },
        { number: 2, description: 'About 34% is between 0 and 1 SD', latex: '\\text{From empirical rule: } 68\\%/2 = 34\\%' },
        { number: 3, description: 'So 84% is below z = 1', latex: '50\\% + 34\\% = 84\\%' }
      ],
      method: 'Empirical rule connection'
    },
    hints: [
      { level: 'gentle', text: '50% is below the mean. How much more to get to 84%?' },
      { level: 'moderate', text: '84% - 50% = 34%, which is half of 68%.' },
      { level: 'explicit', text: 'The 84th percentile is at z ≈ 1.' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Percentiles',
      skills: ['statistics', 'reasoning'],
      prerequisites: ['empirical_rule', 'z_scores'],
      concepts: ['percentile', 'cumulative-probability'],
      commonMistakes: ['Not connecting to empirical rule'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'percentile', 'normal-distribution']
    }
  },

  // --- FINDING X FROM Z ---
  {
    id: 'stat-v2-g11-reverse-001',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'If z = 1.5, μ = 100, and σ = 10, what is the original value x?',
      latex: 'z = 1.5, \\mu = 100, \\sigma = 10, \\quad x = ?'
    },
    answer: {
      type: 'exact',
      correct: '115',
      acceptable: ['115.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Rearrange z-score formula', latex: 'x = \\mu + z \\cdot \\sigma' },
        { number: 2, description: 'Substitute values', latex: 'x = 100 + 1.5(10)' },
        { number: 3, description: 'Calculate', latex: 'x = 100 + 15 = 115' }
      ],
      method: 'Inverse z-score'
    },
    hints: [
      { level: 'gentle', text: 'Rearrange z = (x - μ)/σ to solve for x.' },
      { level: 'moderate', text: 'x = μ + z × σ' },
      { level: 'explicit', text: 'x = 100 + 1.5(10) = 115' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Z-scores',
      skills: ['statistics', 'algebra'],
      prerequisites: ['z_scores'],
      concepts: ['inverse-z', 'destandardization'],
      commonMistakes: ['Subtracting instead of adding', 'Wrong order of operations'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'z-score', 'reverse']
    }
  },

  // --- TOP PERCENTILE ---
  {
    id: 'stat-v2-g11-top-001',
    version: 2,
    type: 'statistics',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'Test scores ~ N(72, 8²). What score is needed to be in the top 2.5%?',
      latex: '\\mu = 72, \\sigma = 8, \\text{ find } x \\text{ for top 2.5\\%}'
    },
    answer: {
      type: 'exact',
      correct: '88',
      acceptable: ['88.0', 'about 88']
    },
    solution: {
      steps: [
        { number: 1, description: 'Top 2.5% means z ≈ 2 (from empirical rule)', latex: 'P(Z > 2) \\approx 2.5\\%' },
        { number: 2, description: 'Use inverse z formula', latex: 'x = \\mu + z \\cdot \\sigma' },
        { number: 3, description: 'Calculate', latex: 'x = 72 + 2(8) = 72 + 16 = 88' }
      ],
      method: 'Inverse z with empirical rule'
    },
    hints: [
      { level: 'gentle', text: 'Top 2.5% is the right tail. What z-score cuts off 2.5%?' },
      { level: 'moderate', text: 'From empirical rule, 2.5% is beyond z = 2.' },
      { level: 'explicit', text: 'x = 72 + 2(8) = 88' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Percentiles',
      skills: ['statistics', 'applications'],
      prerequisites: ['empirical_rule', 'inverse_z'],
      concepts: ['tail-probability', 'cutoff-score'],
      commonMistakes: ['Using wrong z-value', 'Confusing top with bottom'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'percentile', 'application']
    }
  },

  // --- TAIL PROBABILITY ---
  {
    id: 'stat-v2-g11-tail-001',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'In a normal distribution, what percentage of values have z-scores greater than 2?',
      latex: 'P(Z > 2) \\approx ?'
    },
    answer: {
      type: 'numeric',
      correct: 2.5,
      acceptable: ['2.5', '2.5%', '2.28%', 'about 2.5%'],
      tolerance: 0.3
    },
    visuals: {
      diagram: {
        type: 'histogram',
        width: 350,
        height: 140,
        description: 'Normal curve with right tail beyond z=2 shaded, showing approximately 2.5%',
        svg: `<svg viewBox="0 0 350 140" xmlns="http://www.w3.org/2000/svg">
          <path d="M 30 110 Q 60 108 100 95 Q 140 70 170 45 Q 175 35 175 30 Q 175 35 180 45 Q 210 70 250 95 Q 290 108 320 110" fill="none" stroke="#2563eb" stroke-width="2"/>
          <path d="M 250 95 Q 270 102 290 106 Q 305 108 320 110 L 320 110 L 250 110 Z" fill="#dc2626" fill-opacity="0.4"/>
          <line x1="175" y1="30" x2="175" y2="120" stroke="#374151" stroke-width="1"/>
          <line x1="250" y1="95" x2="250" y2="120" stroke="#dc2626" stroke-width="2"/>
          <text x="175" y="132" font-size="9" text-anchor="middle" fill="#374151">0</text>
          <text x="250" y="132" font-size="9" text-anchor="middle" fill="#dc2626" font-weight="bold">2</text>
          <text x="285" y="100" font-size="10" text-anchor="middle" fill="#dc2626" font-weight="bold">≈2.5%</text>
          <text x="175" y="15" font-size="10" text-anchor="middle" fill="#374151">Right tail: P(Z > 2)</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'From empirical rule, 95% is within 2 SD', latex: 'P(-2 < Z < 2) \\approx 95\\%' },
        { number: 2, description: '5% is outside this range', latex: '100\\% - 95\\% = 5\\%' },
        { number: 3, description: 'Split between two tails', latex: 'P(Z > 2) \\approx \\frac{5\\%}{2} = 2.5\\%' }
      ],
      method: 'Empirical rule tail calculation'
    },
    hints: [
      { level: 'gentle', text: '95% is between -2 and 2. What\'s left over?' },
      { level: 'moderate', text: '5% is outside ±2 SD, split evenly between both tails.' },
      { level: 'explicit', text: '5% / 2 = 2.5% in the right tail.' }
    ],
    pedagogy: {
      topic: 'Normal Distribution',
      subTopic: 'Tail probabilities',
      skills: ['statistics', 'reasoning'],
      prerequisites: ['empirical_rule'],
      concepts: ['tail-probability', 'symmetry'],
      commonMistakes: ['Forgetting to divide by 2', 'Using 68 instead of 95'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'tail-probability', 'empirical-rule']
    }
  }
]

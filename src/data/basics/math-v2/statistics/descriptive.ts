/**
 * Statistics - Descriptive Statistics (MathProblemV2 format)
 * Grade levels: 6-10
 * 
 * Topics covered:
 * - Mean (average)
 * - Median
 * - Mode
 * - Range
 * - Standard deviation
 * - Quartiles and IQR
 * - Weighted mean
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const DESCRIPTIVE_PROBLEMS_V2: MathProblemV2[] = [
  // --- MEAN ---
  {
    id: 'stat-v2-g6-mean-001',
    version: 2,
    type: 'statistics',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Find the mean (average) of the following data set: 12, 15, 18, 20, 25',
      latex: '\\bar{x} = \\frac{12+15+18+20+25}{5}'
    },
    answer: {
      type: 'exact',
      correct: '18',
      acceptable: ['18.0', '18.00']
    },
    visuals: {
      diagram: {
        type: 'bar-chart',
        width: 400,
        height: 200,
        description: 'Bar chart showing data values 12, 15, 18, 20, 25 with mean line at 18',
        svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="170" x2="350" y2="170" stroke="#374151" stroke-width="2"/>
          <line x1="50" y1="170" x2="50" y2="30" stroke="#374151" stroke-width="2"/>
          <rect x="70" y="122" width="40" height="48" fill="#3b82f6" stroke="#1d4ed8"/>
          <rect x="130" y="110" width="40" height="60" fill="#3b82f6" stroke="#1d4ed8"/>
          <rect x="190" y="98" width="40" height="72" fill="#3b82f6" stroke="#1d4ed8"/>
          <rect x="250" y="90" width="40" height="80" fill="#3b82f6" stroke="#1d4ed8"/>
          <rect x="310" y="70" width="40" height="100" fill="#3b82f6" stroke="#1d4ed8"/>
          <line x1="50" y1="98" x2="370" y2="98" stroke="#dc2626" stroke-width="2" stroke-dasharray="5"/>
          <text x="380" y="102" font-size="11" fill="#dc2626" font-weight="bold">mean=18</text>
          <text x="90" y="185" font-size="10" text-anchor="middle" fill="#374151">12</text>
          <text x="150" y="185" font-size="10" text-anchor="middle" fill="#374151">15</text>
          <text x="210" y="185" font-size="10" text-anchor="middle" fill="#374151">18</text>
          <text x="270" y="185" font-size="10" text-anchor="middle" fill="#374151">20</text>
          <text x="330" y="185" font-size="10" text-anchor="middle" fill="#374151">25</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Add all values', latex: '12 + 15 + 18 + 20 + 25 = 90' },
        { number: 2, description: 'Count the values', latex: 'n = 5' },
        { number: 3, description: 'Divide sum by count', latex: '\\bar{x} = \\frac{90}{5} = 18' }
      ],
      method: 'Mean formula'
    },
    hints: [
      { level: 'gentle', text: 'The mean is the sum of all values divided by how many values there are.' },
      { level: 'moderate', text: 'Sum = 12 + 15 + 18 + 20 + 25 = 90. There are 5 numbers.' },
      { level: 'explicit', text: 'Mean = 90 ÷ 5 = 18' }
    ],
    pedagogy: {
      topic: 'Measures of Central Tendency',
      subTopic: 'Mean',
      skills: ['statistics', 'arithmetic'],
      prerequisites: ['addition', 'division'],
      concepts: ['average', 'central-tendency'],
      commonMistakes: ['Division error', 'Forgetting to count all values'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'mean', 'average']
    }
  },

  // --- MEDIAN (ODD) ---
  {
    id: 'stat-v2-g6-median-001',
    version: 2,
    type: 'statistics',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Find the median of the following data set: 7, 12, 15, 18, 23',
      latex: '\\text{Median of } 7, 12, 15, 18, 23'
    },
    answer: {
      type: 'exact',
      correct: '15',
      acceptable: ['15.0']
    },
    visuals: {
      diagram: {
        type: 'number-line',
        width: 400,
        height: 100,
        description: 'Number line showing ordered data with median (15) highlighted in the center',
        svg: `<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="50" x2="370" y2="50" stroke="#374151" stroke-width="2"/>
          <circle cx="60" cy="50" r="10" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
          <circle cx="130" cy="50" r="10" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
          <circle cx="200" cy="50" r="12" fill="#10b981" stroke="#059669" stroke-width="3"/>
          <circle cx="270" cy="50" r="10" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
          <circle cx="340" cy="50" r="10" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
          <text x="60" y="80" font-size="12" text-anchor="middle" fill="#374151">7</text>
          <text x="130" y="80" font-size="12" text-anchor="middle" fill="#374151">12</text>
          <text x="200" y="80" font-size="12" text-anchor="middle" fill="#059669" font-weight="bold">15</text>
          <text x="270" y="80" font-size="12" text-anchor="middle" fill="#374151">18</text>
          <text x="340" y="80" font-size="12" text-anchor="middle" fill="#374151">23</text>
          <text x="200" y="25" font-size="11" text-anchor="middle" fill="#059669" font-weight="bold">Median</text>
          <path d="M 200 32 L 200 36" stroke="#059669" stroke-width="2"/>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Verify data is ordered', latex: '7, 12, 15, 18, 23 \\text{ (already ordered)}' },
        { number: 2, description: 'Count the values', latex: 'n = 5 \\text{ (odd number)}' },
        { number: 3, description: 'Find middle position', latex: '\\text{Position} = \\frac{5+1}{2} = 3' },
        { number: 4, description: 'Identify the median', latex: '\\text{3rd value} = 15' }
      ],
      method: 'Median for odd n'
    },
    hints: [
      { level: 'gentle', text: 'The median is the middle value when data is arranged in order.' },
      { level: 'moderate', text: 'For 5 values, the median is the 3rd value.' },
      { level: 'explicit', text: 'Middle value is 15.' }
    ],
    pedagogy: {
      topic: 'Measures of Central Tendency',
      subTopic: 'Median',
      skills: ['statistics', 'ordering'],
      prerequisites: ['ordering', 'counting'],
      concepts: ['median', 'central-tendency'],
      commonMistakes: ['Not ordering data first', 'Confusing with mean'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'median']
    }
  },

  // --- MEDIAN (EVEN) ---
  {
    id: 'stat-v2-g6-median-002',
    version: 2,
    type: 'statistics',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Find the median of: 14, 22, 18, 25, 19, 30',
      latex: '\\text{Median of } 14, 22, 18, 25, 19, 30'
    },
    answer: {
      type: 'numeric',
      correct: 20.5,
      acceptable: ['20.5', '20.50', '41/2'],
      tolerance: 0.01
    },
    solution: {
      steps: [
        { number: 1, description: 'Order the data', latex: '14, 18, 19, 22, 25, 30' },
        { number: 2, description: 'Count values', latex: 'n = 6 \\text{ (even number)}' },
        { number: 3, description: 'Find middle two values', latex: '\\text{3rd and 4th values: } 19, 22' },
        { number: 4, description: 'Average the middle two', latex: '\\text{Median} = \\frac{19 + 22}{2} = 20.5' }
      ],
      method: 'Median for even n'
    },
    hints: [
      { level: 'gentle', text: 'First arrange the numbers in order.' },
      { level: 'moderate', text: 'With 6 values, average the 3rd and 4th values.' },
      { level: 'explicit', text: 'Median = (19 + 22) ÷ 2 = 20.5' }
    ],
    pedagogy: {
      topic: 'Measures of Central Tendency',
      subTopic: 'Median',
      skills: ['statistics', 'ordering'],
      prerequisites: ['ordering', 'averaging'],
      concepts: ['median', 'averaging-middle-values'],
      commonMistakes: ['Not ordering first', 'Taking wrong middle values'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'median', 'even-count']
    }
  },

  // --- MODE ---
  {
    id: 'stat-v2-g7-mode-001',
    version: 2,
    type: 'statistics',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the mode of the following data set: 3, 5, 7, 5, 9, 5, 12',
      latex: '\\text{Mode of } 3, 5, 7, 5, 9, 5, 12'
    },
    answer: {
      type: 'exact',
      correct: '5',
      acceptable: ['5.0']
    },
    visuals: {
      diagram: {
        type: 'bar-chart',
        width: 350,
        height: 180,
        description: 'Frequency bar chart showing 5 appears most frequently (3 times)',
        svg: `<svg viewBox="0 0 350 180" xmlns="http://www.w3.org/2000/svg">
          <line x1="40" y1="140" x2="310" y2="140" stroke="#374151" stroke-width="1"/>
          <line x1="40" y1="140" x2="40" y2="30" stroke="#374151" stroke-width="1"/>
          <text x="20" y="45" font-size="9" fill="#374151">3</text>
          <text x="20" y="75" font-size="9" fill="#374151">2</text>
          <text x="20" y="105" font-size="9" fill="#374151">1</text>
          <rect x="55" y="105" width="30" height="35" fill="#94a3b8" stroke="#64748b"/>
          <rect x="100" y="40" width="30" height="100" fill="#10b981" stroke="#059669" stroke-width="2"/>
          <rect x="145" y="105" width="30" height="35" fill="#94a3b8" stroke="#64748b"/>
          <rect x="190" y="105" width="30" height="35" fill="#94a3b8" stroke="#64748b"/>
          <rect x="235" y="105" width="30" height="35" fill="#94a3b8" stroke="#64748b"/>
          <text x="70" y="155" font-size="10" text-anchor="middle" fill="#374151">3</text>
          <text x="115" y="155" font-size="10" text-anchor="middle" fill="#059669" font-weight="bold">5</text>
          <text x="160" y="155" font-size="10" text-anchor="middle" fill="#374151">7</text>
          <text x="205" y="155" font-size="10" text-anchor="middle" fill="#374151">9</text>
          <text x="250" y="155" font-size="10" text-anchor="middle" fill="#374151">12</text>
          <text x="175" y="20" font-size="11" text-anchor="middle" fill="#1e3a5f" font-weight="bold">Mode = 5 (appears 3 times)</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Count frequency of each value', latex: '3: 1, \\quad 5: 3, \\quad 7: 1, \\quad 9: 1, \\quad 12: 1' },
        { number: 2, description: 'Identify highest frequency', latex: '5 \\text{ appears } 3 \\text{ times (most frequent)}' },
        { number: 3, description: 'The mode is 5', latex: '\\text{Mode} = 5' }
      ],
      method: 'Frequency count'
    },
    hints: [
      { level: 'gentle', text: 'The mode is the value that appears most frequently.' },
      { level: 'moderate', text: 'Count how many times each number appears.' },
      { level: 'explicit', text: '5 appears 3 times - more than any other number. Mode = 5.' }
    ],
    pedagogy: {
      topic: 'Measures of Central Tendency',
      subTopic: 'Mode',
      skills: ['statistics', 'counting'],
      prerequisites: ['counting'],
      concepts: ['mode', 'frequency'],
      commonMistakes: ['Picking the largest value', 'Confusing with mean or median'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'mode', 'frequency']
    }
  },

  // --- RANGE ---
  {
    id: 'stat-v2-g7-range-001',
    version: 2,
    type: 'statistics',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the range of the data set: 45, 52, 38, 61, 55, 42',
      latex: '\\text{Range of } 45, 52, 38, 61, 55, 42'
    },
    answer: {
      type: 'exact',
      correct: '23',
      acceptable: ['23.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the maximum value', latex: '\\text{Max} = 61' },
        { number: 2, description: 'Find the minimum value', latex: '\\text{Min} = 38' },
        { number: 3, description: 'Calculate range', latex: '\\text{Range} = 61 - 38 = 23' }
      ],
      method: 'Range formula'
    },
    hints: [
      { level: 'gentle', text: 'Range = Maximum - Minimum' },
      { level: 'moderate', text: 'Find the largest and smallest values.' },
      { level: 'explicit', text: 'Range = 61 - 38 = 23' }
    ],
    pedagogy: {
      topic: 'Measures of Spread',
      subTopic: 'Range',
      skills: ['statistics', 'subtraction'],
      prerequisites: ['ordering', 'subtraction'],
      concepts: ['range', 'spread'],
      commonMistakes: ['Subtracting in wrong order'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'range', 'spread']
    }
  },

  // --- STANDARD DEVIATION ---
  {
    id: 'stat-v2-g10-sd-001',
    version: 2,
    type: 'statistics',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the sample standard deviation of: 2, 4, 4, 4, 5, 5, 7, 9',
      latex: 's = \\sqrt{\\frac{\\sum(x_i - \\bar{x})^2}{n-1}}'
    },
    answer: {
      type: 'numeric',
      correct: 2,
      acceptable: ['2.0', '2.00'],
      tolerance: 0.01
    },
    visuals: {
      diagram: {
        type: 'box-plot',
        width: 400,
        height: 120,
        description: 'Box plot showing the distribution of values with mean at 5 and standard deviation of 2',
        svg: `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="60" x2="350" y2="60" stroke="#374151" stroke-width="1"/>
          <line x1="80" y1="40" x2="80" y2="80" stroke="#374151" stroke-width="2"/>
          <rect x="130" y="40" width="100" height="40" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="2"/>
          <line x1="180" y1="40" x2="180" y2="80" stroke="#dc2626" stroke-width="2"/>
          <line x1="280" y1="40" x2="280" y2="80" stroke="#374151" stroke-width="2"/>
          <line x1="80" y1="60" x2="130" y2="60" stroke="#374151" stroke-width="1"/>
          <line x1="230" y1="60" x2="280" y2="60" stroke="#374151" stroke-width="1"/>
          <text x="80" y="100" font-size="10" text-anchor="middle" fill="#374151">2</text>
          <text x="130" y="100" font-size="10" text-anchor="middle" fill="#374151">4</text>
          <text x="180" y="100" font-size="10" text-anchor="middle" fill="#dc2626" font-weight="bold">5</text>
          <text x="230" y="100" font-size="10" text-anchor="middle" fill="#374151">7</text>
          <text x="280" y="100" font-size="10" text-anchor="middle" fill="#374151">9</text>
          <text x="200" y="20" font-size="10" text-anchor="middle" fill="#1e3a5f">Mean = 5, SD = 2</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the mean', latex: '\\bar{x} = \\frac{2+4+4+4+5+5+7+9}{8} = 5' },
        { number: 2, description: 'Calculate squared deviations', latex: '(2-5)^2 + (4-5)^2 + ... = 28' },
        { number: 3, description: 'Divide by n-1', latex: '\\frac{28}{7} = 4' },
        { number: 4, description: 'Take square root', latex: 's = \\sqrt{4} = 2' }
      ],
      method: 'Sample standard deviation formula'
    },
    hints: [
      { level: 'gentle', text: 'First find the mean, then measure how far each value is from it.' },
      { level: 'moderate', text: 'Sum of squared deviations = 28. Divide by n-1 = 7.' },
      { level: 'explicit', text: 's = √(28/7) = √4 = 2' }
    ],
    pedagogy: {
      topic: 'Measures of Spread',
      subTopic: 'Standard deviation',
      skills: ['statistics', 'algebra'],
      prerequisites: ['mean', 'square_roots'],
      concepts: ['standard-deviation', 'variance', 'spread'],
      commonMistakes: ['Using n instead of n-1', 'Forgetting to square root'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'standard-deviation', 'spread']
    }
  },

  // --- QUARTILES ---
  {
    id: 'stat-v2-g8-quartile-001',
    version: 2,
    type: 'statistics',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find Q1 and Q3 for the data: 2, 4, 5, 7, 9, 11, 13, 15',
      latex: 'Q_1, Q_3 \\text{ for } 2, 4, 5, 7, 9, 11, 13, 15'
    },
    answer: {
      type: 'exact',
      correct: 'Q1=4.5, Q3=12',
      acceptable: ['Q1: 4.5, Q3: 12', '4.5 and 12']
    },
    visuals: {
      diagram: {
        type: 'box-plot',
        width: 400,
        height: 130,
        description: 'Box plot showing Q1 at 4.5, median at 8, and Q3 at 12',
        svg: `<svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="70" x2="350" y2="70" stroke="#374151" stroke-width="1"/>
          <line x1="70" y1="50" x2="70" y2="90" stroke="#374151" stroke-width="2"/>
          <rect x="115" y="50" width="130" height="40" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="2"/>
          <line x1="180" y1="50" x2="180" y2="90" stroke="#dc2626" stroke-width="2"/>
          <line x1="320" y1="50" x2="320" y2="90" stroke="#374151" stroke-width="2"/>
          <line x1="70" y1="70" x2="115" y2="70" stroke="#374151" stroke-width="1"/>
          <line x1="245" y1="70" x2="320" y2="70" stroke="#374151" stroke-width="1"/>
          <text x="70" y="110" font-size="9" text-anchor="middle" fill="#374151">Min=2</text>
          <text x="115" y="110" font-size="9" text-anchor="middle" fill="#3b82f6" font-weight="bold">Q1=4.5</text>
          <text x="180" y="110" font-size="9" text-anchor="middle" fill="#dc2626" font-weight="bold">Med=8</text>
          <text x="245" y="110" font-size="9" text-anchor="middle" fill="#3b82f6" font-weight="bold">Q3=12</text>
          <text x="320" y="110" font-size="9" text-anchor="middle" fill="#374151">Max=15</text>
        </svg>`
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Data is already ordered', latex: '2, 4, 5, 7, 9, 11, 13, 15' },
        { number: 2, description: 'Find median (Q2)', latex: 'Q_2 = \\frac{7+9}{2} = 8' },
        { number: 3, description: 'Find Q1: median of lower half', latex: 'Q_1 = \\frac{4+5}{2} = 4.5' },
        { number: 4, description: 'Find Q3: median of upper half', latex: 'Q_3 = \\frac{11+13}{2} = 12' }
      ],
      method: 'Quartile calculation'
    },
    hints: [
      { level: 'gentle', text: 'Q1 is the median of the lower half, Q3 is the median of the upper half.' },
      { level: 'moderate', text: 'Lower half: 2, 4, 5, 7. Upper half: 9, 11, 13, 15.' },
      { level: 'explicit', text: 'Q1 = (4+5)/2 = 4.5. Q3 = (11+13)/2 = 12.' }
    ],
    pedagogy: {
      topic: 'Measures of Spread',
      subTopic: 'Quartiles',
      skills: ['statistics', 'median'],
      prerequisites: ['median', 'ordering'],
      concepts: ['quartiles', 'five-number-summary'],
      commonMistakes: ['Including median in halves', 'Wrong half selection'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'quartiles', 'box-plot']
    }
  },

  // --- IQR ---
  {
    id: 'stat-v2-g8-iqr-001',
    version: 2,
    type: 'statistics',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'If Q1 = 25 and Q3 = 45, find the interquartile range (IQR).',
      latex: 'Q_1 = 25, Q_3 = 45, \\text{ find IQR}'
    },
    answer: {
      type: 'exact',
      correct: '20',
      acceptable: ['20.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply IQR formula', latex: '\\text{IQR} = Q_3 - Q_1' },
        { number: 2, description: 'Substitute values', latex: '\\text{IQR} = 45 - 25 = 20' }
      ],
      method: 'IQR formula'
    },
    hints: [
      { level: 'gentle', text: 'IQR = Q3 - Q1' },
      { level: 'moderate', text: 'Subtract the first quartile from the third quartile.' },
      { level: 'explicit', text: 'IQR = 45 - 25 = 20' }
    ],
    pedagogy: {
      topic: 'Measures of Spread',
      subTopic: 'Interquartile range',
      skills: ['statistics', 'subtraction'],
      prerequisites: ['quartiles'],
      concepts: ['iqr', 'middle-50-percent'],
      commonMistakes: ['Subtracting in wrong order'],
      scaffoldingLevel: 'minimal'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'iqr', 'spread']
    }
  },

  // --- WEIGHTED MEAN ---
  {
    id: 'stat-v2-g8-weighted-001',
    version: 2,
    type: 'statistics',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A class of 20 students has a mean test score of 78. A class of 30 students has a mean score of 82. Find the combined mean for all 50 students.',
      latex: '\\bar{x} = \\frac{20(78) + 30(82)}{50}'
    },
    answer: {
      type: 'numeric',
      correct: 80.4,
      acceptable: ['80.4', '80.40'],
      tolerance: 0.01
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate total for class 1', latex: '20 \\times 78 = 1560' },
        { number: 2, description: 'Calculate total for class 2', latex: '30 \\times 82 = 2460' },
        { number: 3, description: 'Add totals', latex: '1560 + 2460 = 4020' },
        { number: 4, description: 'Divide by total students', latex: '\\bar{x} = \\frac{4020}{50} = 80.4' }
      ],
      method: 'Weighted mean'
    },
    hints: [
      { level: 'gentle', text: 'You can\'t just average 78 and 82 - the classes have different sizes.' },
      { level: 'moderate', text: 'Find the total points for each class, then divide by total students.' },
      { level: 'explicit', text: '(20×78 + 30×82) / 50 = 4020 / 50 = 80.4' }
    ],
    pedagogy: {
      topic: 'Measures of Central Tendency',
      subTopic: 'Weighted Mean',
      skills: ['statistics', 'weighted_average'],
      prerequisites: ['mean', 'multiplication'],
      concepts: ['weighted-mean', 'combining-groups'],
      commonMistakes: ['Simply averaging the two means'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['statistics', 'weighted-mean']
    }
  }
]

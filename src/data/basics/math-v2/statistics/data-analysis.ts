/**
 * Data Analysis Problems V2 - Grade 7-10
 * 
 * Advanced statistics covering:
 * - Box Plots (creating and interpreting)
 * - Scatter Plots & Correlation (trends, correlation types)
 * - Standard Deviation (calculating and interpreting)
 * - Sampling Methods (types, bias)
 * - Two-Way Tables (analyzing categorical data)
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const DATA_ANALYSIS_V2: MathProblemV2[] = [
  // ===== BOX PLOTS (5 problems) =====
  {
    id: 'stats-v2-g7-boxplot-225',
    version: 2,
    type: 'data-analysis',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the five-number summary for this data set: 12, 15, 18, 22, 25, 28, 30, 35, 40',
      latex: '\\{12, 15, 18, 22, 25, 28, 30, 35, 40\\}'
    },
    answer: {
      type: 'ordered-list',
      correct: ['12', '17', '25', '31', '40'],
      acceptable: ['12, 17, 25, 31, 40', 'Min=12, Q1=17, Med=25, Q3=31, Max=40']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify minimum and maximum', latex: '\\text{Min} = 12, \\text{Max} = 40' },
        { number: 2, description: 'Find the median (middle value)', latex: '\\text{Median} = 25 \\text{ (5th value of 9)}' },
        { number: 3, description: 'Find Q1 (median of lower half)', latex: 'Q_1 = \\frac{15 + 18}{2} = 16.5 \\approx 17' },
        { number: 4, description: 'Find Q3 (median of upper half)', latex: 'Q_3 = \\frac{30 + 35}{2} = 32.5 \\approx 31' },
        { number: 5, description: 'Five-number summary', latex: '(12, 17, 25, 31, 40)' }
      ],
      method: 'Five-Number Summary'
    },
    hints: [
      { level: 'gentle', text: 'The five-number summary includes: Min, Q1, Median, Q3, Max.' },
      { level: 'moderate', text: 'First find the median, then find the median of each half.' },
      { level: 'explicit', text: 'Min=12, Q1=16.5, Median=25, Q3=32.5, Max=40' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Box Plots',
      skills: ['five_number_summary', 'quartiles', 'median'],
      prerequisites: ['median', 'ordering_data'],
      concepts: ['quartiles', 'box-plot', 'data-distribution'],
      commonMistakes: [
        'Including the median when finding Q1 and Q3',
        'Confusing Q1 and Q3',
        'Not ordering data first'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'box-plot', 'five-number-summary', 'grade-7']
    }
  },
  {
    id: 'stats-v2-g7-boxplot-226',
    version: 2,
    type: 'data-analysis',
    difficulty: 7.3,
    gradeLevel: 7,
    question: {
      text: 'A box plot shows Q1 = 45, Median = 60, Q3 = 72. What is the interquartile range (IQR)?',
      latex: 'Q_1 = 45, \\text{Median} = 60, Q_3 = 72'
    },
    answer: {
      type: 'numeric',
      correct: '27',
      acceptable: ['27']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall IQR formula', latex: 'IQR = Q_3 - Q_1' },
        { number: 2, description: 'Substitute values', latex: 'IQR = 72 - 45' },
        { number: 3, description: 'Calculate', latex: 'IQR = 27' }
      ],
      method: 'Interquartile Range Calculation'
    },
    hints: [
      { level: 'gentle', text: 'IQR measures the spread of the middle 50% of data.' },
      { level: 'moderate', text: 'IQR = Q3 - Q1' },
      { level: 'explicit', text: 'IQR = 72 - 45 = 27' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Box Plots',
      skills: ['iqr_calculation', 'quartiles'],
      prerequisites: ['quartiles', 'subtraction'],
      concepts: ['spread', 'variability', 'iqr'],
      commonMistakes: [
        'Using median in calculation',
        'Subtracting in wrong order',
        'Confusing IQR with range'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'box-plot', 'iqr', 'grade-7']
    }
  },
  {
    id: 'stats-v2-g8-boxplot-227',
    version: 2,
    type: 'data-analysis',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'For a box plot with Q1 = 30 and Q3 = 50, what values would be considered outliers?',
      latex: 'Q_1 = 30, Q_3 = 50'
    },
    answer: {
      type: 'interval',
      correct: 'x < 0 or x > 80',
      acceptable: ['less than 0 or greater than 80', 'x<0 or x>80', '< 0 or > 80']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate IQR', latex: 'IQR = 50 - 30 = 20' },
        { number: 2, description: 'Calculate 1.5 × IQR', latex: '1.5 \\times 20 = 30' },
        { number: 3, description: 'Find lower fence', latex: 'Q_1 - 1.5 \\times IQR = 30 - 30 = 0' },
        { number: 4, description: 'Find upper fence', latex: 'Q_3 + 1.5 \\times IQR = 50 + 30 = 80' },
        { number: 5, description: 'Outliers are outside fences', latex: 'x < 0 \\text{ or } x > 80' }
      ],
      method: '1.5 × IQR Rule for Outliers'
    },
    hints: [
      { level: 'gentle', text: 'Outliers are values beyond 1.5 × IQR from the quartiles.' },
      { level: 'moderate', text: 'IQR = 20. Find Q1 - 1.5(20) and Q3 + 1.5(20).' },
      { level: 'explicit', text: 'Lower fence = 0, Upper fence = 80. Outliers are below 0 or above 80.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Box Plots',
      skills: ['outlier_detection', 'iqr_calculation'],
      prerequisites: ['iqr', 'quartiles'],
      concepts: ['outliers', 'fences', 'data-distribution'],
      commonMistakes: [
        'Using 2 × IQR instead of 1.5 × IQR',
        'Adding/subtracting from median instead of quartiles',
        'Forgetting to calculate both fences'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'box-plot', 'outliers', 'grade-8']
    }
  },
  {
    id: 'stats-v2-g8-boxplot-228',
    version: 2,
    type: 'data-analysis',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'In a box plot, the median line is closer to Q1 than Q3. What does this indicate about the distribution?',
      latex: ''
    },
    answer: {
      type: 'exact',
      correct: 'right-skewed',
      acceptable: ['right-skewed', 'skewed right', 'positively skewed', 'right skewed']
    },
    solution: {
      steps: [
        { number: 1, description: 'Analyze position of median', latex: '\\text{Median closer to } Q_1' },
        { number: 2, description: 'More data concentrated on lower end', latex: '\\text{Longer "tail" on right}' },
        { number: 3, description: 'Identify skewness', latex: '\\text{Right-skewed (positively skewed)}' }
      ],
      method: 'Interpreting Box Plot Shape'
    },
    hints: [
      { level: 'gentle', text: 'Think about where most of the data is concentrated.' },
      { level: 'moderate', text: 'When median is closer to Q1, the upper half has more spread.' },
      { level: 'explicit', text: 'This indicates a right-skewed (positively skewed) distribution.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Box Plots',
      skills: ['interpreting_boxplots', 'skewness'],
      prerequisites: ['box_plot_components', 'median'],
      concepts: ['skewness', 'distribution-shape', 'interpretation'],
      commonMistakes: [
        'Confusing left and right skew',
        'Thinking longer side means more data',
        'Not relating median position to skewness'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'box-plot', 'skewness', 'grade-8']
    }
  },
  {
    id: 'stats-v2-g8-boxplot-229',
    version: 2,
    type: 'data-analysis',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Class A has IQR = 12 and Class B has IQR = 5. Which class shows more variability in test scores?',
      latex: 'IQR_A = 12, IQR_B = 5'
    },
    answer: {
      type: 'exact',
      correct: 'Class A',
      acceptable: ['Class A', 'A', 'class A']
    },
    solution: {
      steps: [
        { number: 1, description: 'Understand IQR meaning', latex: 'IQR \\text{ measures spread of middle 50\\%}' },
        { number: 2, description: 'Compare IQR values', latex: '12 > 5' },
        { number: 3, description: 'Larger IQR = more variability', latex: '\\text{Class A has more variability}' }
      ],
      method: 'Comparing Variability'
    },
    hints: [
      { level: 'gentle', text: 'IQR measures how spread out the middle 50% of data is.' },
      { level: 'moderate', text: 'A larger IQR means the data is more spread out.' },
      { level: 'explicit', text: 'Class A (IQR = 12) has more variability than Class B (IQR = 5).' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Box Plots',
      skills: ['comparing_distributions', 'interpreting_iqr'],
      prerequisites: ['iqr', 'variability'],
      concepts: ['variability', 'comparison', 'spread'],
      commonMistakes: [
        'Thinking smaller IQR means more variability',
        'Confusing IQR with range',
        'Not understanding what IQR measures'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'box-plot', 'comparison', 'grade-8']
    }
  },

  // ===== SCATTER PLOTS & CORRELATION (5 problems) =====
  {
    id: 'stats-v2-g8-scatter-230',
    version: 2,
    type: 'data-analysis',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A scatter plot shows that as x increases, y tends to decrease. The points are clustered close to a line. What type of correlation is this?',
      latex: ''
    },
    answer: {
      type: 'exact',
      correct: 'strong negative',
      acceptable: ['strong negative', 'strong negative correlation', 'negative strong', 'strong, negative']
    },
    solution: {
      steps: [
        { number: 1, description: 'Analyze direction', latex: 'x \\uparrow \\Rightarrow y \\downarrow = \\text{negative}' },
        { number: 2, description: 'Analyze strength', latex: '\\text{Close to line} = \\text{strong}' },
        { number: 3, description: 'Combine', latex: '\\text{Strong negative correlation}' }
      ],
      method: 'Identifying Correlation Type'
    },
    hints: [
      { level: 'gentle', text: 'Consider both the direction (positive/negative) and strength (strong/weak).' },
      { level: 'moderate', text: 'When one goes up and the other goes down, that\'s negative. Close to a line means strong.' },
      { level: 'explicit', text: 'This is a strong negative correlation.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Scatter Plots',
      skills: ['identifying_correlation', 'interpreting_scatterplots'],
      prerequisites: ['scatter_plot_basics'],
      concepts: ['correlation', 'linear-relationships', 'direction-strength'],
      commonMistakes: [
        'Confusing direction and strength',
        'Forgetting to describe both aspects',
        'Mixing up positive and negative'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'scatter-plot', 'correlation', 'grade-8']
    }
  },
  {
    id: 'stats-v2-g8-scatter-231',
    version: 2,
    type: 'data-analysis',
    difficulty: 8.3,
    gradeLevel: 8,
    question: {
      text: 'If the correlation coefficient r = -0.92, what can you conclude about the relationship?',
      latex: 'r = -0.92'
    },
    answer: {
      type: 'exact',
      correct: 'strong negative linear relationship',
      acceptable: ['strong negative', 'strong negative correlation', 'strong negative linear', 'strong inverse relationship']
    },
    solution: {
      steps: [
        { number: 1, description: 'Check sign of r', latex: 'r = -0.92 \\text{ (negative)}' },
        { number: 2, description: 'Check magnitude', latex: '|r| = 0.92 \\text{ (close to 1)}' },
        { number: 3, description: 'Interpret', latex: '\\text{Strong negative linear relationship}' }
      ],
      method: 'Interpreting Correlation Coefficient'
    },
    hints: [
      { level: 'gentle', text: 'The sign tells you direction, the magnitude tells you strength.' },
      { level: 'moderate', text: 'Negative means inverse relationship. 0.92 is very close to 1.' },
      { level: 'explicit', text: 'r = -0.92 indicates a strong negative linear relationship.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Scatter Plots',
      skills: ['interpreting_r', 'correlation_strength'],
      prerequisites: ['correlation_basics'],
      concepts: ['correlation-coefficient', 'linear-relationships', 'r-value'],
      commonMistakes: [
        'Ignoring the negative sign',
        'Not knowing strength thresholds',
        'Confusing r with r²'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'scatter-plot', 'correlation-coefficient', 'grade-8']
    }
  },
  {
    id: 'stats-v2-g9-scatter-232',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A study finds r = 0.85 between hours of exercise and life expectancy. Does this prove exercise causes longer life? Explain.',
      latex: 'r = 0.85'
    },
    answer: {
      type: 'exact',
      correct: 'no',
      acceptable: ['no', 'No', 'no, correlation does not imply causation']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify what r = 0.85 shows', latex: '\\text{Strong positive correlation}' },
        { number: 2, description: 'Recall limitation of correlation', latex: '\\text{Correlation} \\neq \\text{Causation}' },
        { number: 3, description: 'Consider other factors', latex: '\\text{Lurking variables, reverse causation, etc.}' },
        { number: 4, description: 'Conclusion', latex: '\\text{Cannot prove causation from correlation alone}' }
      ],
      method: 'Correlation vs Causation'
    },
    hints: [
      { level: 'gentle', text: 'Think about what correlation can and cannot prove.' },
      { level: 'moderate', text: 'Remember: correlation does not imply causation. What other explanations exist?' },
      { level: 'explicit', text: 'No. Correlation shows association, not causation. There could be lurking variables.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Scatter Plots',
      skills: ['critical_thinking', 'understanding_correlation_limits'],
      prerequisites: ['correlation', 'study_design'],
      concepts: ['correlation-causation', 'lurking-variables', 'critical-analysis'],
      commonMistakes: [
        'Assuming correlation proves causation',
        'Not considering other variables',
        'Ignoring reverse causation possibility'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'evaluate',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'correlation', 'causation', 'critical-thinking', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g9-scatter-233',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'The line of best fit for predicting test score (y) from study hours (x) is y = 50 + 8x. What does the slope 8 represent?',
      latex: 'y = 50 + 8x'
    },
    answer: {
      type: 'exact',
      correct: 'For each additional hour of studying, the predicted test score increases by 8 points',
      acceptable: ['8 point increase per hour', 'score increases 8 per hour', 'each hour adds 8 points']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify slope in equation', latex: 'm = 8' },
        { number: 2, description: 'Interpret slope in context', latex: '\\frac{\\Delta y}{\\Delta x} = \\frac{8 \\text{ points}}{1 \\text{ hour}}' },
        { number: 3, description: 'Write interpretation', latex: '\\text{Each additional hour } \\rightarrow \\text{ +8 points predicted}' }
      ],
      method: 'Interpreting Slope in Context'
    },
    hints: [
      { level: 'gentle', text: 'The slope tells you how much y changes for each 1-unit increase in x.' },
      { level: 'moderate', text: 'Slope = 8 means y increases by 8 when x increases by 1.' },
      { level: 'explicit', text: 'For each additional hour of studying, the predicted score increases by 8 points.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Scatter Plots',
      skills: ['interpreting_slope', 'regression_analysis'],
      prerequisites: ['linear_equations', 'slope'],
      concepts: ['regression', 'slope-interpretation', 'prediction'],
      commonMistakes: [
        'Confusing slope and y-intercept',
        'Not using context in interpretation',
        'Forgetting "predicted" language'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'regression', 'slope', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g9-scatter-234',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Using y = 50 + 8x, predict the test score for a student who studies 6 hours.',
      latex: 'y = 50 + 8x, \\quad x = 6'
    },
    answer: {
      type: 'numeric',
      correct: '98',
      acceptable: ['98', '98 points']
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = 6', latex: 'y = 50 + 8(6)' },
        { number: 2, description: 'Multiply', latex: 'y = 50 + 48' },
        { number: 3, description: 'Add', latex: 'y = 98' }
      ],
      method: 'Making Predictions with Regression'
    },
    hints: [
      { level: 'gentle', text: 'Substitute the given x-value into the equation.' },
      { level: 'moderate', text: 'y = 50 + 8(6) = ?' },
      { level: 'explicit', text: 'y = 50 + 48 = 98' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Scatter Plots',
      skills: ['using_regression', 'prediction'],
      prerequisites: ['evaluating_expressions', 'linear_equations'],
      concepts: ['prediction', 'regression', 'substitution'],
      commonMistakes: [
        'Arithmetic errors',
        'Forgetting order of operations',
        'Confusing x and y'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'regression', 'prediction', 'grade-9']
    }
  },

  // ===== STANDARD DEVIATION (5 problems) =====
  {
    id: 'stats-v2-g9-stdev-235',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Calculate the mean of: 4, 6, 8, 10, 12',
      latex: '\\{4, 6, 8, 10, 12\\}'
    },
    answer: {
      type: 'numeric',
      correct: '8',
      acceptable: ['8', '8.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Sum all values', latex: '4 + 6 + 8 + 10 + 12 = 40' },
        { number: 2, description: 'Divide by count', latex: '\\bar{x} = \\frac{40}{5} = 8' }
      ],
      method: 'Calculating Mean'
    },
    hints: [
      { level: 'gentle', text: 'Add all values and divide by the count.' },
      { level: 'moderate', text: 'Sum = 40, Count = 5' },
      { level: 'explicit', text: 'Mean = 40 ÷ 5 = 8' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Standard Deviation',
      skills: ['mean_calculation'],
      prerequisites: ['addition', 'division'],
      concepts: ['mean', 'central-tendency', 'average'],
      commonMistakes: [
        'Counting errors',
        'Arithmetic errors in sum',
        'Division errors'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'mean', 'central-tendency', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g9-stdev-236',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.3,
    gradeLevel: 9,
    question: {
      text: 'For the data set {4, 6, 8, 10, 12} with mean 8, find the sum of squared deviations from the mean.',
      latex: '\\sum(x_i - \\bar{x})^2'
    },
    answer: {
      type: 'numeric',
      correct: '40',
      acceptable: ['40', '40.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find deviations from mean', latex: '(4-8), (6-8), (8-8), (10-8), (12-8) = -4, -2, 0, 2, 4' },
        { number: 2, description: 'Square each deviation', latex: '16, 4, 0, 4, 16' },
        { number: 3, description: 'Sum the squares', latex: '16 + 4 + 0 + 4 + 16 = 40' }
      ],
      method: 'Sum of Squared Deviations'
    },
    hints: [
      { level: 'gentle', text: 'Subtract the mean from each value, square the results, then add them.' },
      { level: 'moderate', text: 'Deviations are: -4, -2, 0, 2, 4. Now square each.' },
      { level: 'explicit', text: '16 + 4 + 0 + 4 + 16 = 40' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Standard Deviation',
      skills: ['calculating_deviations', 'squaring'],
      prerequisites: ['mean', 'subtraction', 'exponents'],
      concepts: ['deviation', 'squared-deviations', 'variability'],
      commonMistakes: [
        'Forgetting to square',
        'Squaring before subtracting',
        'Sign errors with negatives'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'standard-deviation', 'variance', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g10-stdev-237',
    version: 2,
    type: 'data-analysis',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'For a sample of 5 values with sum of squared deviations = 40, calculate the sample variance and sample standard deviation.',
      latex: 'n = 5, \\sum(x_i - \\bar{x})^2 = 40'
    },
    answer: {
      type: 'ordered-list',
      correct: ['10', '3.16'],
      acceptable: ['variance=10, s=3.16', '10, 3.16', 's²=10, s=3.16']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate sample variance', latex: 's^2 = \\frac{\\sum(x_i - \\bar{x})^2}{n-1} = \\frac{40}{4} = 10' },
        { number: 2, description: 'Calculate standard deviation', latex: 's = \\sqrt{10} \\approx 3.16' }
      ],
      method: 'Sample Variance and Standard Deviation'
    },
    hints: [
      { level: 'gentle', text: 'For sample variance, divide by (n-1), not n.' },
      { level: 'moderate', text: 'Variance = 40/(5-1) = 40/4 = 10' },
      { level: 'explicit', text: 'Variance = 10, Standard deviation = √10 ≈ 3.16' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Standard Deviation',
      skills: ['variance_calculation', 'standard_deviation'],
      prerequisites: ['mean', 'square_root', 'division'],
      concepts: ['variance', 'standard-deviation', 'spread'],
      commonMistakes: [
        'Dividing by n instead of n-1 for sample',
        'Forgetting to take square root for SD',
        'Confusing sample and population formulas'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'standard-deviation', 'variance', 'grade-10']
    }
  },
  {
    id: 'stats-v2-g10-stdev-238',
    version: 2,
    type: 'data-analysis',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Data set A has standard deviation 2.5 and data set B has standard deviation 8.1. Which data set has more spread?',
      latex: 's_A = 2.5, s_B = 8.1'
    },
    answer: {
      type: 'exact',
      correct: 'B',
      acceptable: ['B', 'Data set B', 'Set B']
    },
    solution: {
      steps: [
        { number: 1, description: 'Compare standard deviations', latex: '8.1 > 2.5' },
        { number: 2, description: 'Larger SD = more spread', latex: '\\text{Data set B has more spread}' }
      ],
      method: 'Comparing Spread'
    },
    hints: [
      { level: 'gentle', text: 'Standard deviation measures how spread out data is from the mean.' },
      { level: 'moderate', text: 'Larger standard deviation means more spread.' },
      { level: 'explicit', text: 'Since 8.1 > 2.5, Data set B has more spread.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Standard Deviation',
      skills: ['interpreting_stdev', 'comparing_distributions'],
      prerequisites: ['standard_deviation_concept'],
      concepts: ['spread', 'variability', 'comparison'],
      commonMistakes: [
        'Thinking smaller SD means more spread',
        'Not understanding what SD measures',
        'Confusing SD with range'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'standard-deviation', 'comparison', 'grade-10']
    }
  },
  {
    id: 'stats-v2-g10-stdev-239',
    version: 2,
    type: 'data-analysis',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Test scores have mean 75 and standard deviation 10. Using the empirical rule, about what percent of scores fall between 55 and 95?',
      latex: '\\mu = 75, \\sigma = 10'
    },
    answer: {
      type: 'numeric',
      correct: '95',
      acceptable: ['95', '95%', 'about 95%']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find how many SDs from mean', latex: '55 = 75 - 20 = 75 - 2(10)' },
        { number: 2, description: 'Check upper bound', latex: '95 = 75 + 20 = 75 + 2(10)' },
        { number: 3, description: 'Apply empirical rule', latex: '\\text{Within 2 SD} \\approx 95\\%' }
      ],
      method: 'Empirical Rule (68-95-99.7)'
    },
    hints: [
      { level: 'gentle', text: 'How many standard deviations is each boundary from the mean?' },
      { level: 'moderate', text: '55 is 2 SDs below and 95 is 2 SDs above the mean.' },
      { level: 'explicit', text: 'The empirical rule says about 95% of data falls within 2 SDs.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Standard Deviation',
      skills: ['empirical_rule', 'standard_deviation_intervals'],
      prerequisites: ['standard_deviation', 'normal_distribution'],
      concepts: ['empirical-rule', 'normal-distribution', '68-95-99.7'],
      commonMistakes: [
        'Using wrong percentage for number of SDs',
        'Not checking if data is approximately normal',
        'Calculation errors finding number of SDs'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'empirical-rule', 'normal-distribution', 'grade-10']
    }
  },

  // ===== SAMPLING METHODS (5 problems) =====
  {
    id: 'stats-v2-g9-sampling-240',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A researcher assigns each student a number and uses a random number generator to select 50 students. What sampling method is this?',
      latex: ''
    },
    answer: {
      type: 'exact',
      correct: 'simple random sampling',
      acceptable: ['simple random sampling', 'simple random sample', 'SRS', 'random sampling']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify key features', latex: '\\text{Every student has equal chance}' },
        { number: 2, description: 'Random selection used', latex: '\\text{Random number generator}' },
        { number: 3, description: 'Identify method', latex: '\\text{Simple Random Sampling (SRS)}' }
      ],
      method: 'Identifying Sampling Method'
    },
    hints: [
      { level: 'gentle', text: 'What makes this method "random"?' },
      { level: 'moderate', text: 'Every student has an equal chance of being selected.' },
      { level: 'explicit', text: 'This is simple random sampling (SRS).' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Sampling Methods',
      skills: ['identifying_sampling_methods'],
      prerequisites: ['sampling_basics'],
      concepts: ['sampling', 'randomization', 'probability-sampling'],
      commonMistakes: [
        'Confusing with systematic sampling',
        'Not recognizing random selection component',
        'Confusing with stratified sampling'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'sampling', 'srs', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g9-sampling-241',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A pollster surveys every 10th person entering a mall. What sampling method is this?',
      latex: ''
    },
    answer: {
      type: 'exact',
      correct: 'systematic sampling',
      acceptable: ['systematic sampling', 'systematic sample', 'systematic']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify selection pattern', latex: '\\text{Every 10th person}' },
        { number: 2, description: 'Fixed interval selection', latex: '\\text{Regular, systematic interval}' },
        { number: 3, description: 'Identify method', latex: '\\text{Systematic Sampling}' }
      ],
      method: 'Identifying Sampling Method'
    },
    hints: [
      { level: 'gentle', text: 'Notice the regular pattern in selection.' },
      { level: 'moderate', text: 'Selecting every nth element is called...' },
      { level: 'explicit', text: 'This is systematic sampling.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Sampling Methods',
      skills: ['identifying_sampling_methods'],
      prerequisites: ['sampling_basics'],
      concepts: ['sampling', 'systematic-selection'],
      commonMistakes: [
        'Confusing with simple random sampling',
        'Not recognizing the fixed interval',
        'Thinking any pattern makes it biased'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'sampling', 'systematic', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g9-sampling-242',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.3,
    gradeLevel: 9,
    question: {
      text: 'A researcher divides students by grade level (9, 10, 11, 12) and randomly selects 25 from each grade. What sampling method is this?',
      latex: ''
    },
    answer: {
      type: 'exact',
      correct: 'stratified random sampling',
      acceptable: ['stratified random sampling', 'stratified sampling', 'stratified sample', 'stratified']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify groups (strata)', latex: '\\text{Grades 9, 10, 11, 12}' },
        { number: 2, description: 'Random selection within groups', latex: '\\text{25 random from each}' },
        { number: 3, description: 'Identify method', latex: '\\text{Stratified Random Sampling}' }
      ],
      method: 'Identifying Sampling Method'
    },
    hints: [
      { level: 'gentle', text: 'The population is divided into distinct groups before sampling.' },
      { level: 'moderate', text: 'Dividing into groups and sampling from each is called...' },
      { level: 'explicit', text: 'This is stratified random sampling.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Sampling Methods',
      skills: ['identifying_sampling_methods'],
      prerequisites: ['sampling_basics', 'srs'],
      concepts: ['stratified-sampling', 'strata', 'subgroups'],
      commonMistakes: [
        'Confusing with cluster sampling',
        'Not recognizing the random selection within strata',
        'Thinking any grouping makes it stratified'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'sampling', 'stratified', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g9-sampling-243',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'A survey is posted on a website and anyone who wants to can respond. Why might this create bias?',
      latex: ''
    },
    answer: {
      type: 'exact',
      correct: 'voluntary response bias',
      acceptable: ['voluntary response bias', 'self-selection bias', 'people who feel strongly are more likely to respond']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify sampling type', latex: '\\text{Voluntary response}' },
        { number: 2, description: 'Who chooses to respond?', latex: '\\text{Those with strong opinions}' },
        { number: 3, description: 'Result', latex: '\\text{Sample not representative of population}' }
      ],
      method: 'Identifying Sampling Bias'
    },
    hints: [
      { level: 'gentle', text: 'Think about who is most likely to take time to respond to a voluntary survey.' },
      { level: 'moderate', text: 'People with strong opinions are more likely to respond voluntarily.' },
      { level: 'explicit', text: 'This is voluntary response bias - the sample over-represents people with strong opinions.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Sampling Methods',
      skills: ['identifying_bias', 'critical_thinking'],
      prerequisites: ['sampling_basics'],
      concepts: ['bias', 'voluntary-response', 'representativeness'],
      commonMistakes: [
        'Not recognizing self-selection',
        'Thinking all surveys are equally valid',
        'Confusing with convenience sampling'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'sampling', 'bias', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g10-sampling-244',
    version: 2,
    type: 'data-analysis',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A researcher randomly selects 5 schools and surveys all students at those schools. What sampling method is this?',
      latex: ''
    },
    answer: {
      type: 'exact',
      correct: 'cluster sampling',
      acceptable: ['cluster sampling', 'cluster sample', 'cluster']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify clusters', latex: '\\text{Schools are clusters}' },
        { number: 2, description: 'Selection method', latex: '\\text{Randomly select entire clusters}' },
        { number: 3, description: 'Survey everyone in clusters', latex: '\\text{All students at selected schools}' },
        { number: 4, description: 'Identify method', latex: '\\text{Cluster Sampling}' }
      ],
      method: 'Identifying Sampling Method'
    },
    hints: [
      { level: 'gentle', text: 'Notice that entire groups (schools) are selected, not individuals.' },
      { level: 'moderate', text: 'When you randomly select groups and survey everyone in them...' },
      { level: 'explicit', text: 'This is cluster sampling - randomly selecting clusters and surveying all within.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Sampling Methods',
      skills: ['identifying_sampling_methods'],
      prerequisites: ['stratified_sampling'],
      concepts: ['cluster-sampling', 'natural-groups'],
      commonMistakes: [
        'Confusing with stratified sampling',
        'Not recognizing that entire clusters are taken',
        'Thinking it\'s the same as convenience sampling'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'sampling', 'cluster', 'grade-10']
    }
  },

  // ===== TWO-WAY TABLES (5 problems) =====
  {
    id: 'stats-v2-g8-twoway-245',
    version: 2,
    type: 'data-analysis',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'In a two-way table, 45 students prefer pizza and 30 prefer burgers. What is the marginal total for food preference?',
      latex: ''
    },
    answer: {
      type: 'numeric',
      correct: '75',
      acceptable: ['75']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify values to sum', latex: '\\text{Pizza: 45, Burgers: 30}' },
        { number: 2, description: 'Calculate marginal total', latex: '45 + 30 = 75' }
      ],
      method: 'Marginal Totals'
    },
    hints: [
      { level: 'gentle', text: 'Marginal totals are the sums of rows or columns.' },
      { level: 'moderate', text: 'Add the two food preference values.' },
      { level: 'explicit', text: '45 + 30 = 75' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Two-Way Tables',
      skills: ['reading_twoway_tables', 'marginal_totals'],
      prerequisites: ['addition', 'tables'],
      concepts: ['two-way-tables', 'marginal-totals', 'categorical-data'],
      commonMistakes: [
        'Confusing marginal with joint frequencies',
        'Adding wrong values',
        'Not understanding table structure'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'two-way-table', 'marginal', 'grade-8']
    }
  },
  {
    id: 'stats-v2-g8-twoway-246',
    version: 2,
    type: 'data-analysis',
    difficulty: 8.3,
    gradeLevel: 8,
    question: {
      text: 'In a survey of 200 people: 80 are male and exercise, 40 are male and don\'t exercise, 50 are female and exercise, 30 are female and don\'t exercise. What percent of all people exercise?',
      latex: ''
    },
    answer: {
      type: 'numeric',
      correct: '65',
      acceptable: ['65', '65%', '0.65']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find total who exercise', latex: '80 + 50 = 130' },
        { number: 2, description: 'Calculate percentage', latex: '\\frac{130}{200} = 0.65 = 65\\%' }
      ],
      method: 'Calculating Percentages from Two-Way Table'
    },
    hints: [
      { level: 'gentle', text: 'First find how many people exercise in total.' },
      { level: 'moderate', text: 'Total exercising = 80 + 50 = 130. Now find the percentage of 200.' },
      { level: 'explicit', text: '130/200 = 0.65 = 65%' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Two-Way Tables',
      skills: ['calculating_percentages', 'reading_twoway_tables'],
      prerequisites: ['percentages', 'addition'],
      concepts: ['two-way-tables', 'percentages', 'joint-frequency'],
      commonMistakes: [
        'Using wrong total',
        'Not converting to percent correctly',
        'Reading wrong cells'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'two-way-table', 'percentages', 'grade-8']
    }
  },
  {
    id: 'stats-v2-g9-twoway-247',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Using the previous survey data: Of the males, what percent exercise?',
      latex: '\\text{Males: 80 exercise, 40 don\'t}'
    },
    answer: {
      type: 'numeric',
      correct: '66.7',
      acceptable: ['66.7', '66.67', '67', '66.7%', '2/3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find total males', latex: '80 + 40 = 120' },
        { number: 2, description: 'Find males who exercise', latex: '80' },
        { number: 3, description: 'Calculate conditional percentage', latex: '\\frac{80}{120} = \\frac{2}{3} \\approx 66.7\\%' }
      ],
      method: 'Conditional Relative Frequency'
    },
    hints: [
      { level: 'gentle', text: 'This is asking about males only - find the total number of males first.' },
      { level: 'moderate', text: 'Of the 120 males, how many exercise?' },
      { level: 'explicit', text: '80/120 = 2/3 ≈ 66.7%' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Two-Way Tables',
      skills: ['conditional_relative_frequency'],
      prerequisites: ['percentages', 'reading_twoway_tables'],
      concepts: ['conditional-probability', 'relative-frequency'],
      commonMistakes: [
        'Using total instead of row/column total',
        'Finding wrong conditional',
        'Dividing in wrong order'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'two-way-table', 'conditional', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g9-twoway-248',
    version: 2,
    type: 'data-analysis',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Of those who exercise (130 total): 80 are male, 50 are female. Is there an association between gender and exercise?',
      latex: ''
    },
    answer: {
      type: 'exact',
      correct: 'yes',
      acceptable: ['yes', 'Yes', 'yes, males are more likely to exercise']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate percent male among exercisers', latex: '\\frac{80}{130} \\approx 61.5\\%' },
        { number: 2, description: 'Calculate percent male overall', latex: '\\frac{120}{200} = 60\\%' },
        { number: 3, description: 'Compare percentages', latex: '61.5\\% \\ne 60\\% \\text{ (different)}' },
        { number: 4, description: 'Conclusion', latex: '\\text{Some association exists}' }
      ],
      method: 'Testing for Association'
    },
    hints: [
      { level: 'gentle', text: 'Compare the distribution among exercisers to the overall distribution.' },
      { level: 'moderate', text: 'If gender doesn\'t matter, we\'d expect the same proportions in each group.' },
      { level: 'explicit', text: 'Males are 60% of all people but 61.5% of exercisers - a slight association exists.' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Two-Way Tables',
      skills: ['testing_association', 'comparing_proportions'],
      prerequisites: ['conditional_frequency', 'percentages'],
      concepts: ['association', 'independence', 'categorical-relationships'],
      commonMistakes: [
        'Not comparing to expected values',
        'Confusing association with causation',
        'Using wrong proportions'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'two-way-table', 'association', 'grade-9']
    }
  },
  {
    id: 'stats-v2-g10-twoway-249',
    version: 2,
    type: 'data-analysis',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A two-way table shows 150 students: 60 freshmen (30 in club, 30 not), 90 seniors (60 in club, 30 not). Calculate the relative risk of being in club for seniors vs freshmen.',
      latex: ''
    },
    answer: {
      type: 'numeric',
      correct: '1.33',
      acceptable: ['1.33', '1.3', '4/3', '1.333']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find rate for freshmen', latex: 'P(\\text{club}|\\text{freshman}) = \\frac{30}{60} = 0.5' },
        { number: 2, description: 'Find rate for seniors', latex: 'P(\\text{club}|\\text{senior}) = \\frac{60}{90} = 0.667' },
        { number: 3, description: 'Calculate relative risk', latex: 'RR = \\frac{0.667}{0.5} = 1.33' }
      ],
      method: 'Relative Risk Calculation'
    },
    hints: [
      { level: 'gentle', text: 'Relative risk is the ratio of two probabilities.' },
      { level: 'moderate', text: 'Find P(club|senior) and P(club|freshman), then divide.' },
      { level: 'explicit', text: '(60/90) ÷ (30/60) = 0.667/0.5 = 1.33' }
    ],
    pedagogy: {
      topic: 'Statistics',
      subTopic: 'Two-Way Tables',
      skills: ['relative_risk', 'conditional_probability'],
      prerequisites: ['conditional_frequency', 'division', 'ratios'],
      concepts: ['relative-risk', 'risk-comparison', 'epidemiology'],
      commonMistakes: [
        'Dividing in wrong order',
        'Using wrong totals for conditional probabilities',
        'Confusing relative risk with odds ratio'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: now,
      tags: ['statistics', 'two-way-table', 'relative-risk', 'grade-10']
    }
  }
]

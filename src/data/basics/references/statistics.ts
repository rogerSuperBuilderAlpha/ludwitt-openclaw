import { ReferenceUnit } from '@/lib/types/basics'

export const STATISTICS_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'stats-unit-1',
    sectionId: 'statistics',
    title: 'Descriptive Statistics',
    description: 'Learn measures of center (mean, median, mode) and spread (range, variance, standard deviation).',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Mean', 'Median', 'Mode', 'Standard Deviation', 'Variance', 'Range'],
    sections: [
      {
        id: 'stats-1-1',
        title: 'Measures of Center',
        content: `Measures of center describe the "typical" value in a dataset.

Mean (Average): Sum of all values divided by the count
Median: The middle value when data is ordered
Mode: The most frequently occurring value

When to use each:
- Mean: For symmetric data without outliers
- Median: For skewed data or data with outliers
- Mode: For categorical data or finding most common`,
        formulas: [
          {
            name: 'Mean (Population)',
            latex: '\\mu = \\frac{\\sum x_i}{N}',
            description: 'Sum of all values divided by population size'
          },
          {
            name: 'Mean (Sample)',
            latex: '\\bar{x} = \\frac{\\sum x_i}{n}',
            description: 'Sum of all values divided by sample size'
          }
        ],
        examples: [
          {
            problem: 'Find the mean, median, and mode of: 3, 5, 5, 7, 8, 9, 12',
            steps: [
              'Mean: (3+5+5+7+8+9+12)/7 = 49/7 = 7',
              'Median: Middle value of 7 numbers is the 4th: 7',
              'Mode: 5 appears twice (most frequent)'
            ],
            solution: 'Mean = 7, Median = 7, Mode = 5',
            explanation: 'For an even number of values, median is average of two middle values'
          }
        ],
        tips: [
          'Mean is pulled toward outliers; median is resistant',
          'If mean > median, data is right-skewed (tail to the right)',
          'If mean < median, data is left-skewed (tail to the left)'
        ]
      },
      {
        id: 'stats-1-2',
        title: 'Measures of Spread',
        content: `Measures of spread describe how spread out the data is.

Range: Maximum - Minimum (simple but affected by outliers)
Variance: Average of squared deviations from the mean
Standard Deviation: Square root of variance (in original units)`,
        formulas: [
          {
            name: 'Range',
            latex: 'Range = Max - Min',
            description: 'Difference between largest and smallest values'
          },
          {
            name: 'Population Variance',
            latex: '\\sigma^2 = \\frac{\\sum(x_i - \\mu)^2}{N}',
            description: 'Average squared deviation from mean'
          },
          {
            name: 'Sample Variance',
            latex: 's^2 = \\frac{\\sum(x_i - \\bar{x})^2}{n-1}',
            description: 'Uses n-1 (Bessel\'s correction) for unbiased estimate'
          },
          {
            name: 'Standard Deviation',
            latex: '\\sigma = \\sqrt{\\sigma^2}, \\quad s = \\sqrt{s^2}',
            description: 'Square root of variance'
          }
        ],
        tips: [
          'Variance is in squared units (like m²); standard deviation is in original units (m)',
          'Larger standard deviation = more spread out data',
          'Use n-1 for sample variance to get an unbiased estimate of population variance'
        ]
      },
      {
        id: 'stats-1-3',
        title: 'Five-Number Summary and Outliers',
        content: `The five-number summary consists of:
1. Minimum
2. Q1 (First quartile, 25th percentile)
3. Median (Q2, 50th percentile)
4. Q3 (Third quartile, 75th percentile)
5. Maximum

IQR (Interquartile Range) = Q3 - Q1

Outliers are values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR`,
        formulas: [
          {
            name: 'Interquartile Range',
            latex: 'IQR = Q_3 - Q_1',
            description: 'Range of middle 50% of data'
          },
          {
            name: 'Outlier Boundaries',
            latex: '\\text{Low: } Q_1 - 1.5 \\times IQR, \\quad \\text{High: } Q_3 + 1.5 \\times IQR',
            description: 'Values outside these are considered outliers'
          }
        ]
      }
    ]
  },
  {
    id: 'stats-unit-2',
    sectionId: 'statistics',
    title: 'Probability Basics',
    description: 'Learn fundamental probability concepts, rules, and calculations.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Probability', 'Sample Space', 'Conditional Probability', 'Independent Events'],
    sections: [
      {
        id: 'stats-2-1',
        title: 'Basic Probability',
        content: `Probability measures how likely an event is to occur, from 0 (impossible) to 1 (certain).

Sample Space: All possible outcomes (S)
Event: A subset of outcomes (A)

Classical probability: When all outcomes are equally likely`,
        formulas: [
          {
            name: 'Probability of an Event',
            latex: 'P(A) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}',
            description: 'For equally likely outcomes'
          },
          {
            name: 'Probability Range',
            latex: '0 \\leq P(A) \\leq 1',
            description: 'Probability is always between 0 and 1'
          },
          {
            name: 'Complement',
            latex: "P(A') = 1 - P(A)",
            description: "Probability of 'not A'"
          }
        ],
        examples: [
          {
            problem: 'What is the probability of rolling an even number on a fair die?',
            steps: [
              'Total outcomes: {1, 2, 3, 4, 5, 6} = 6 outcomes',
              'Favorable outcomes (even): {2, 4, 6} = 3 outcomes',
              'P(even) = 3/6 = 1/2'
            ],
            solution: 'P(even) = 1/2 or 50%',
            explanation: 'Half of the outcomes are even'
          }
        ]
      },
      {
        id: 'stats-2-2',
        title: 'Probability Rules',
        content: `Rules for combining probabilities:`,
        formulas: [
          {
            name: 'Addition Rule (Union)',
            latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
            description: 'Probability of A or B'
          },
          {
            name: 'Addition (Mutually Exclusive)',
            latex: 'P(A \\cup B) = P(A) + P(B)',
            description: 'When A and B cannot both occur'
          },
          {
            name: 'Multiplication Rule',
            latex: 'P(A \\cap B) = P(A) \\cdot P(B|A)',
            description: 'Probability of A and B'
          },
          {
            name: 'Independent Events',
            latex: 'P(A \\cap B) = P(A) \\cdot P(B)',
            description: 'When A and B do not affect each other'
          }
        ],
        tips: [
          '"Or" usually means addition rule, "And" usually means multiplication rule',
          'Mutually exclusive events have no overlap',
          'Independent events: outcome of one doesn\'t affect the other'
        ]
      },
      {
        id: 'stats-2-3',
        title: 'Conditional Probability',
        content: `Conditional probability is the probability of A given that B has occurred.`,
        formulas: [
          {
            name: 'Conditional Probability',
            latex: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}',
            description: 'Probability of A given B'
          },
          {
            name: "Bayes' Theorem",
            latex: 'P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}',
            description: 'Relates conditional probabilities'
          }
        ],
        examples: [
          {
            problem: 'A bag has 3 red and 2 blue balls. You draw 2 without replacement. What is P(2nd is red | 1st is red)?',
            steps: [
              'After drawing 1 red, there are 2 red and 2 blue left (4 balls total)',
              'P(2nd red | 1st red) = 2/4 = 1/2'
            ],
            solution: '1/2',
            explanation: 'Without replacement changes the sample space'
          }
        ]
      }
    ]
  },
  {
    id: 'stats-unit-3',
    sectionId: 'statistics',
    title: 'Normal Distribution',
    description: 'Understand the normal (bell curve) distribution and use z-scores.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Normal Distribution', 'Z-Score', 'Bell Curve', '68-95-99.7 Rule', 'Standard Normal'],
    sections: [
      {
        id: 'stats-3-1',
        title: 'The Normal Distribution',
        content: `The normal distribution is a symmetric, bell-shaped curve described by its mean (μ) and standard deviation (σ).

Key properties:
- Symmetric about the mean
- Mean = Median = Mode
- Total area under curve = 1
- Extends infinitely in both directions (approaches but never reaches 0)`,
        formulas: [
          {
            name: 'Empirical Rule (68-95-99.7)',
            latex: '\\begin{aligned} &\\text{68% within } \\mu \\pm 1\\sigma \\\\ &\\text{95% within } \\mu \\pm 2\\sigma \\\\ &\\text{99.7% within } \\mu \\pm 3\\sigma \\end{aligned}',
            description: 'Approximate percentages within standard deviations'
          }
        ],
        tips: [
          'The 68-95-99.7 rule only applies to normal distributions',
          'Almost all data (99.7%) falls within 3 standard deviations of the mean',
          'Heights, test scores, and many natural phenomena follow normal distributions'
        ]
      },
      {
        id: 'stats-3-2',
        title: 'Z-Scores',
        content: `A z-score tells you how many standard deviations a value is from the mean.

The standard normal distribution has μ = 0 and σ = 1.`,
        formulas: [
          {
            name: 'Z-Score Formula',
            latex: 'z = \\frac{x - \\mu}{\\sigma}',
            description: 'Standardizes any value x'
          },
          {
            name: 'Finding X from Z',
            latex: 'x = \\mu + z\\sigma',
            description: 'Convert z-score back to original value'
          }
        ],
        examples: [
          {
            problem: 'IQ scores have μ = 100 and σ = 15. Find the z-score for an IQ of 130.',
            steps: [
              'z = (x - μ) / σ',
              'z = (130 - 100) / 15',
              'z = 30 / 15 = 2'
            ],
            solution: 'z = 2',
            explanation: 'An IQ of 130 is 2 standard deviations above the mean'
          }
        ],
        tips: [
          'Positive z-score = above the mean',
          'Negative z-score = below the mean',
          'z = 0 means the value equals the mean'
        ]
      },
      {
        id: 'stats-3-3',
        title: 'Finding Probabilities',
        content: `Use z-tables or technology to find the probability that a value falls below, above, or between certain values.

The z-table gives P(Z < z), the area to the LEFT of z.`,
        examples: [
          {
            problem: 'Find P(Z < 1.5)',
            steps: [
              'Look up z = 1.5 in the z-table',
              'The table shows: 0.9332'
            ],
            solution: 'P(Z < 1.5) = 0.9332 or 93.32%',
            explanation: '93.32% of the standard normal distribution is below z = 1.5'
          },
          {
            problem: 'Find P(Z > 1.5)',
            steps: [
              'P(Z > z) = 1 - P(Z < z)',
              'P(Z > 1.5) = 1 - 0.9332 = 0.0668'
            ],
            solution: 'P(Z > 1.5) = 0.0668 or 6.68%',
            explanation: 'Use the complement rule for "greater than"'
          }
        ]
      }
    ]
  },
  {
    id: 'stats-unit-4',
    sectionId: 'statistics',
    title: 'Confidence Intervals',
    description: 'Estimate population parameters using confidence intervals.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Confidence Interval', 'Margin of Error', 'Standard Error', 'Sample Size'],
    sections: [
      {
        id: 'stats-4-1',
        title: 'Confidence Interval Concepts',
        content: `A confidence interval gives a range of plausible values for a population parameter.

Key terms:
- Point estimate: Single value estimate (like x̄ for μ)
- Margin of error: How far the interval extends from the point estimate
- Confidence level: How confident we are that the interval contains the true parameter (commonly 90%, 95%, 99%)

A 95% confidence interval means: If we repeated this process many times, about 95% of our intervals would contain the true parameter.`,
        formulas: [
          {
            name: 'Confidence Interval Structure',
            latex: '\\text{Point estimate} \\pm \\text{Margin of error}',
            description: 'General form of a confidence interval'
          },
          {
            name: 'Margin of Error',
            latex: 'ME = z^* \\times \\frac{\\sigma}{\\sqrt{n}}',
            description: 'For known population standard deviation'
          }
        ]
      },
      {
        id: 'stats-4-2',
        title: 'CI for Population Mean',
        content: `Confidence interval for μ when σ is known:

Use z* (critical z-value) from the standard normal distribution.
Common values: z* = 1.645 (90%), z* = 1.96 (95%), z* = 2.576 (99%)

When σ is unknown, use the sample standard deviation s and t-distribution.`,
        formulas: [
          {
            name: 'CI for Mean (σ known)',
            latex: '\\bar{x} \\pm z^* \\frac{\\sigma}{\\sqrt{n}}',
            description: 'Uses z-distribution'
          },
          {
            name: 'CI for Mean (σ unknown)',
            latex: '\\bar{x} \\pm t^* \\frac{s}{\\sqrt{n}}',
            description: 'Uses t-distribution with df = n-1'
          }
        ],
        examples: [
          {
            problem: 'A sample of 36 students has mean 75 and σ = 12. Find a 95% CI for the population mean.',
            steps: [
              'For 95% confidence, z* = 1.96',
              'ME = 1.96 × (12/√36) = 1.96 × 2 = 3.92',
              'CI = 75 ± 3.92',
              'CI = (71.08, 78.92)'
            ],
            solution: '(71.08, 78.92)',
            explanation: 'We are 95% confident the true mean is between 71.08 and 78.92'
          }
        ]
      },
      {
        id: 'stats-4-3',
        title: 'Sample Size Determination',
        content: `To achieve a desired margin of error, solve for the required sample size.`,
        formulas: [
          {
            name: 'Required Sample Size',
            latex: 'n = \\left(\\frac{z^* \\sigma}{ME}\\right)^2',
            description: 'Sample size for desired margin of error'
          }
        ],
        tips: [
          'Larger sample size = smaller margin of error',
          'Always round sample size UP to a whole number',
          'Doubling precision (halving ME) requires 4× the sample size'
        ]
      }
    ]
  },
  {
    id: 'stats-unit-5',
    sectionId: 'statistics',
    title: 'Hypothesis Testing',
    description: 'Learn to test claims about population parameters using hypothesis tests.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['Hypothesis Testing', 'P-Value', 'Null Hypothesis', 'Type I Error', 'Type II Error'],
    sections: [
      {
        id: 'stats-5-1',
        title: 'Hypothesis Testing Basics',
        content: `Hypothesis testing determines if sample evidence is strong enough to reject a claim about a population parameter.

Null hypothesis (H₀): The default claim (usually "no effect" or "no difference")
Alternative hypothesis (Hₐ): What we're testing for

We assume H₀ is true and see if the data contradicts it.`,
        formulas: [
          {
            name: 'Test Statistic (z-test for mean)',
            latex: 'z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}',
            description: 'How many standard errors x̄ is from μ₀'
          }
        ],
        tips: [
          'H₀ always contains = (either =, ≤, or ≥)',
          'Hₐ contains <, >, or ≠',
          'We never "accept" H₀; we either reject or fail to reject'
        ]
      },
      {
        id: 'stats-5-2',
        title: 'P-Values and Decisions',
        content: `The p-value is the probability of observing our result (or more extreme) if H₀ is true.

Decision rule:
- If p-value < α (significance level): Reject H₀
- If p-value ≥ α: Fail to reject H₀

Common α values: 0.10, 0.05, 0.01`,
        examples: [
          {
            problem: 'A test yields z = 2.3 for a two-tailed test. Find the p-value.',
            steps: [
              'P(Z > 2.3) ≈ 0.0107 (from z-table)',
              'For two-tailed: p-value = 2 × 0.0107 = 0.0214'
            ],
            solution: 'p-value ≈ 0.0214',
            explanation: 'Two-tailed tests double the one-tail probability'
          }
        ]
      },
      {
        id: 'stats-5-3',
        title: 'Types of Errors',
        content: `Two types of errors can occur in hypothesis testing:

Type I Error (α): Rejecting H₀ when it's actually true
- "False positive"
- Probability = significance level α

Type II Error (β): Failing to reject H₀ when it's actually false
- "False negative"
- Power = 1 - β (probability of correctly rejecting false H₀)`,
        formulas: [
          {
            name: 'Type I Error Rate',
            latex: 'P(\\text{Type I Error}) = \\alpha',
            description: 'Equal to the significance level'
          },
          {
            name: 'Power',
            latex: '\\text{Power} = 1 - \\beta',
            description: 'Probability of detecting a real effect'
          }
        ],
        tips: [
          'Decreasing α increases β (tradeoff)',
          'Increasing sample size decreases both types of errors',
          'More serious errors should have smaller probability'
        ]
      }
    ]
  },
  {
    id: 'stats-unit-6',
    sectionId: 'statistics',
    title: 'Regression & Correlation',
    description: 'Analyze relationships between variables using correlation and linear regression.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Correlation', 'Regression', 'Scatter Plot', 'Least Squares', 'R-Squared'],
    sections: [
      {
        id: 'stats-6-1',
        title: 'Correlation',
        content: `Correlation measures the strength and direction of a linear relationship between two quantitative variables.

The correlation coefficient r ranges from -1 to +1:
- r = 1: Perfect positive linear relationship
- r = -1: Perfect negative linear relationship
- r = 0: No linear relationship`,
        formulas: [
          {
            name: 'Correlation Coefficient',
            latex: 'r = \\frac{\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum(x_i-\\bar{x})^2 \\cdot \\sum(y_i-\\bar{y})^2}}',
            description: 'Measures linear association'
          }
        ],
        tips: [
          '|r| > 0.7 is usually considered strong correlation',
          '|r| < 0.3 is usually considered weak correlation',
          'Correlation does not imply causation!',
          'r only measures LINEAR relationships'
        ]
      },
      {
        id: 'stats-6-2',
        title: 'Linear Regression',
        content: `Linear regression finds the "best fit" line through data points.

The least-squares regression line minimizes the sum of squared residuals (vertical distances from points to line).

Regression equation: ŷ = b₀ + b₁x
- b₁ is the slope (change in y per unit change in x)
- b₀ is the y-intercept (predicted y when x = 0)`,
        formulas: [
          {
            name: 'Slope',
            latex: 'b_1 = r \\cdot \\frac{s_y}{s_x}',
            description: 'Slope relates to correlation and standard deviations'
          },
          {
            name: 'Y-Intercept',
            latex: 'b_0 = \\bar{y} - b_1 \\bar{x}',
            description: 'The line passes through the point (x̄, ȳ)'
          },
          {
            name: 'Coefficient of Determination',
            latex: 'r^2 = \\text{proportion of variance explained}',
            description: 'r² tells us how much of y\'s variation is explained by x'
          }
        ],
        examples: [
          {
            problem: 'If the regression equation is ŷ = 2.5 + 1.8x, interpret the slope.',
            steps: [
              'Slope b₁ = 1.8',
              'Interpretation: For each 1-unit increase in x, y increases by 1.8 units on average'
            ],
            solution: 'Each unit increase in x is associated with a 1.8 unit increase in y',
            explanation: 'The slope is the rate of change in y per unit change in x'
          }
        ],
        commonMistakes: [
          'Extrapolating beyond the range of data',
          'Confusing r with r² (r² is always positive)',
          'Assuming a strong correlation means causation'
        ]
      }
    ]
  }
]

export default STATISTICS_REFERENCE_UNITS



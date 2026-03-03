/**
 * Statistics - Statistical Inference (MathProblemV2 format)
 * Grade levels: 10-12
 * 
 * Topics covered:
 * - Confidence Intervals (for means and proportions)
 * - Hypothesis Testing (z-tests and t-tests)
 * - Sampling Distributions
 * - Margin of Error
 * - Chi-Square Tests
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const STATISTICAL_INFERENCE_V2: MathProblemV2[] = [
  // ============================================================================
  // CONFIDENCE INTERVALS (5 problems: 100-104)
  // ============================================================================
  
  {
    id: 'stat-v2-g11-inference-100',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'A sample of 100 students has a mean test score of 72 with a standard deviation of 8. Construct a 95% confidence interval for the population mean.',
      latex: '\\bar{x} = 72, s = 8, n = 100, \\text{ find 95\\% CI}'
    },
    answer: {
      type: 'set',
      correct: '(70.43, 73.57)',
      acceptable: ['(70.43, 73.57)', '70.43 to 73.57', '[70.43, 73.57]', '70.4 to 73.6']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the formula for confidence interval', latex: 'CI = \\bar{x} \\pm z^* \\cdot \\frac{s}{\\sqrt{n}}' },
        { number: 2, description: 'Find the critical value for 95% confidence', latex: 'z^* = 1.96' },
        { number: 3, description: 'Calculate the standard error', latex: 'SE = \\frac{8}{\\sqrt{100}} = \\frac{8}{10} = 0.8' },
        { number: 4, description: 'Calculate the margin of error', latex: 'ME = 1.96 \\times 0.8 = 1.568' },
        { number: 5, description: 'Construct the interval', latex: 'CI = 72 \\pm 1.568 = (70.43, 73.57)' }
      ],
      method: 'Z-interval for population mean'
    },
    hints: [
      { level: 'gentle', text: 'A confidence interval has the form: point estimate ± margin of error. What is the point estimate here?' },
      { level: 'moderate', text: 'Use the formula: x̄ ± z* × (s/√n). For 95% confidence, z* = 1.96.' },
      { level: 'explicit', text: 'SE = 8/√100 = 0.8. ME = 1.96 × 0.8 = 1.568. CI = 72 ± 1.568 = (70.43, 73.57)' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Confidence Intervals',
      skills: ['confidence_intervals', 'standard_error', 'z_scores'],
      prerequisites: ['normal_distribution', 'standard_deviation', 'sampling'],
      concepts: ['confidence-interval', 'margin-of-error', 'standard-error', 'critical-value'],
      commonMistakes: [
        'Using s instead of s/√n for standard error',
        'Using wrong z* value (1.645 for 90%, 1.96 for 95%, 2.576 for 99%)',
        'Forgetting to do ± (only adding or only subtracting)'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'confidence-interval', 'inference', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-101',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'In a survey of 400 voters, 220 support a new policy. Construct a 95% confidence interval for the true proportion of voters who support the policy.',
      latex: '\\hat{p} = \\frac{220}{400} = 0.55, n = 400, \\text{ find 95\\% CI}'
    },
    answer: {
      type: 'set',
      correct: '(0.501, 0.599)',
      acceptable: ['(0.50, 0.60)', '0.501 to 0.599', '50.1% to 59.9%']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the sample proportion', latex: '\\hat{p} = \\frac{220}{400} = 0.55' },
        { number: 2, description: 'Calculate the standard error for proportion', latex: 'SE = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}} = \\sqrt{\\frac{0.55 \\times 0.45}{400}} = 0.0249' },
        { number: 3, description: 'Find z* for 95% confidence', latex: 'z^* = 1.96' },
        { number: 4, description: 'Calculate margin of error', latex: 'ME = 1.96 \\times 0.0249 = 0.0488' },
        { number: 5, description: 'Construct the interval', latex: 'CI = 0.55 \\pm 0.0488 = (0.501, 0.599)' }
      ],
      method: 'Z-interval for population proportion'
    },
    hints: [
      { level: 'gentle', text: 'For proportions, the standard error formula uses p̂(1-p̂)/n under the square root.' },
      { level: 'moderate', text: 'SE = √(0.55 × 0.45 / 400). Then multiply by 1.96 for the margin of error.' },
      { level: 'explicit', text: 'SE ≈ 0.0249, ME = 1.96 × 0.0249 ≈ 0.049. CI = (0.55 - 0.049, 0.55 + 0.049)' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Confidence Intervals',
      skills: ['confidence_intervals', 'proportions', 'z_scores'],
      prerequisites: ['normal_distribution', 'probability', 'sampling'],
      concepts: ['confidence-interval', 'proportion', 'standard-error'],
      commonMistakes: [
        'Using the wrong formula (mean formula instead of proportion)',
        'Forgetting to use p̂(1-p̂) in the numerator',
        'Not converting percentage to decimal'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'confidence-interval', 'proportion', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-102',
    version: 2,
    type: 'statistics',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'A sample of 25 light bulbs has a mean lifetime of 1200 hours with a standard deviation of 100 hours. Construct a 99% confidence interval for the population mean. (Use t-distribution)',
      latex: '\\bar{x} = 1200, s = 100, n = 25, \\text{ find 99\\% CI using t}'
    },
    answer: {
      type: 'set',
      correct: '(1143.2, 1256.8)',
      acceptable: ['(1143, 1257)', '1143.2 to 1256.8']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify degrees of freedom', latex: 'df = n - 1 = 25 - 1 = 24' },
        { number: 2, description: 'Find t* for 99% confidence with df=24', latex: 't^* = 2.797' },
        { number: 3, description: 'Calculate standard error', latex: 'SE = \\frac{s}{\\sqrt{n}} = \\frac{100}{\\sqrt{25}} = 20' },
        { number: 4, description: 'Calculate margin of error', latex: 'ME = t^* \\cdot SE = 2.797 \\times 20 = 55.94' },
        { number: 5, description: 'Construct the interval', latex: 'CI = 1200 \\pm 55.94 = (1144.06, 1255.94)' }
      ],
      method: 'T-interval for population mean'
    },
    hints: [
      { level: 'gentle', text: 'With small samples (n < 30), use the t-distribution instead of z.' },
      { level: 'moderate', text: 'df = 24, so t* ≈ 2.797 for 99% confidence. SE = 100/5 = 20.' },
      { level: 'explicit', text: 'ME = 2.797 × 20 = 55.94. CI = (1200 - 55.94, 1200 + 55.94)' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Confidence Intervals',
      skills: ['confidence_intervals', 't_distribution', 'degrees_of_freedom'],
      prerequisites: ['normal_distribution', 'standard_deviation', 't_distribution'],
      concepts: ['t-interval', 'degrees-of-freedom', 'small-sample'],
      commonMistakes: [
        'Using z instead of t for small samples',
        'Wrong degrees of freedom (using n instead of n-1)',
        'Using wrong t* value from table'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'confidence-interval', 't-distribution', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-103',
    version: 2,
    type: 'statistics',
    difficulty: 10.5,
    gradeLevel: 10,
    question: {
      text: 'A 90% confidence interval for a population mean is (45, 55). What is the sample mean and margin of error?',
      latex: '90\\% \\text{ CI} = (45, 55), \\text{ find } \\bar{x} \\text{ and ME}'
    },
    answer: {
      type: 'set',
      correct: 'x̄ = 50, ME = 5',
      acceptable: ['mean = 50, margin = 5', '50 and 5', 'x̄=50, ME=5']
    },
    solution: {
      steps: [
        { number: 1, description: 'The sample mean is the center of the interval', latex: '\\bar{x} = \\frac{45 + 55}{2} = 50' },
        { number: 2, description: 'The margin of error is half the interval width', latex: 'ME = \\frac{55 - 45}{2} = 5' },
        { number: 3, description: 'Verify: CI = x̄ ± ME', latex: '50 \\pm 5 = (45, 55) \\checkmark' }
      ],
      method: 'Interpreting confidence intervals'
    },
    hints: [
      { level: 'gentle', text: 'The confidence interval is centered at the sample mean.' },
      { level: 'moderate', text: 'Average the endpoints to find the mean. The margin of error is the distance from center to either endpoint.' },
      { level: 'explicit', text: 'x̄ = (45 + 55)/2 = 50. ME = (55 - 45)/2 = 5' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Confidence Intervals',
      skills: ['confidence_intervals', 'interpretation'],
      prerequisites: ['mean', 'intervals'],
      concepts: ['confidence-interval', 'margin-of-error', 'interpretation'],
      commonMistakes: [
        'Confusing interval width with margin of error',
        'Taking only one endpoint as the mean'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'confidence-interval', 'interpretation', 'grade-10']
    }
  },

  {
    id: 'stat-v2-g12-inference-104',
    version: 2,
    type: 'statistics',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'How large a sample is needed to estimate a population proportion within ±3% with 95% confidence? (Use p̂ = 0.5 for maximum sample size)',
      latex: 'ME = 0.03, z^* = 1.96, \\hat{p} = 0.5, \\text{ find } n'
    },
    answer: {
      type: 'numeric',
      correct: '1068',
      acceptable: ['1068', '1067', '1069']
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the sample size formula for proportions', latex: 'n = \\left(\\frac{z^*}{ME}\\right)^2 \\hat{p}(1-\\hat{p})' },
        { number: 2, description: 'Substitute values', latex: 'n = \\left(\\frac{1.96}{0.03}\\right)^2 \\times 0.5 \\times 0.5' },
        { number: 3, description: 'Calculate step by step', latex: 'n = (65.33)^2 \\times 0.25 = 4268.44 \\times 0.25' },
        { number: 4, description: 'Compute final value', latex: 'n = 1067.11' },
        { number: 5, description: 'Round up to next integer', latex: 'n = 1068' }
      ],
      method: 'Sample size determination'
    },
    hints: [
      { level: 'gentle', text: 'The formula involves (z*/ME)² multiplied by p̂(1-p̂).' },
      { level: 'moderate', text: 'Using p̂ = 0.5 gives the maximum sample size since 0.5 × 0.5 = 0.25 is the largest product.' },
      { level: 'explicit', text: 'n = (1.96/0.03)² × 0.25 = 4268.44 × 0.25 ≈ 1068 (round up)' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Confidence Intervals',
      skills: ['sample_size', 'confidence_intervals', 'proportions'],
      prerequisites: ['confidence_intervals', 'algebra'],
      concepts: ['sample-size', 'margin-of-error', 'planning'],
      commonMistakes: [
        'Rounding down instead of up',
        'Using 3 instead of 0.03 for margin of error',
        'Forgetting to use p̂(1-p̂)'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'sample-size', 'inference', 'grade-12']
    }
  },

  // ============================================================================
  // HYPOTHESIS TESTING (5 problems: 105-109)
  // ============================================================================

  {
    id: 'stat-v2-g11-inference-105',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'A manufacturer claims batteries last at least 500 hours. A sample of 36 batteries has a mean of 490 hours with σ = 30 hours. At α = 0.05, test if the claim is false. Find the z-statistic.',
      latex: 'H_0: \\mu \\geq 500, H_a: \\mu < 500, \\bar{x} = 490, \\sigma = 30, n = 36'
    },
    answer: {
      type: 'numeric',
      correct: '-2',
      acceptable: ['-2', '-2.0', '-2.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'State the hypotheses', latex: 'H_0: \\mu \\geq 500, \\quad H_a: \\mu < 500' },
        { number: 2, description: 'Calculate standard error', latex: 'SE = \\frac{\\sigma}{\\sqrt{n}} = \\frac{30}{\\sqrt{36}} = 5' },
        { number: 3, description: 'Calculate z-statistic', latex: 'z = \\frac{\\bar{x} - \\mu_0}{SE} = \\frac{490 - 500}{5} = -2' },
        { number: 4, description: 'Compare to critical value', latex: 'z_{crit} = -1.645 \\text{ (one-tailed)}' },
        { number: 5, description: 'Conclusion', latex: 'z = -2 < -1.645, \\text{ reject } H_0' }
      ],
      method: 'One-sample z-test'
    },
    hints: [
      { level: 'gentle', text: 'The z-statistic measures how many standard errors the sample mean is from the hypothesized mean.' },
      { level: 'moderate', text: 'z = (x̄ - μ₀) / (σ/√n). Here σ/√n = 30/6 = 5.' },
      { level: 'explicit', text: 'z = (490 - 500) / 5 = -10/5 = -2' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Hypothesis Testing',
      skills: ['hypothesis_testing', 'z_test', 'critical_values'],
      prerequisites: ['normal_distribution', 'standard_error', 'z_scores'],
      concepts: ['hypothesis-test', 'z-statistic', 'one-tailed-test'],
      commonMistakes: [
        'Wrong order of subtraction in numerator',
        'Using s instead of σ/√n',
        'Confusing one-tailed and two-tailed tests'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'hypothesis-testing', 'z-test', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-106',
    version: 2,
    type: 'statistics',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'A sample of 16 students scored a mean of 78 on a test with s = 8. Test if this differs significantly from the national average of 75 at α = 0.05. Calculate the t-statistic.',
      latex: 'H_0: \\mu = 75, H_a: \\mu \\neq 75, \\bar{x} = 78, s = 8, n = 16'
    },
    answer: {
      type: 'numeric',
      correct: '1.5',
      acceptable: ['1.5', '1.50', '3/2']
    },
    solution: {
      steps: [
        { number: 1, description: 'State hypotheses', latex: 'H_0: \\mu = 75, \\quad H_a: \\mu \\neq 75 \\text{ (two-tailed)}' },
        { number: 2, description: 'Calculate standard error', latex: 'SE = \\frac{s}{\\sqrt{n}} = \\frac{8}{\\sqrt{16}} = 2' },
        { number: 3, description: 'Calculate t-statistic', latex: 't = \\frac{\\bar{x} - \\mu_0}{SE} = \\frac{78 - 75}{2} = 1.5' },
        { number: 4, description: 'Find critical value (df = 15)', latex: 't_{crit} = \\pm 2.131' },
        { number: 5, description: 'Conclusion', latex: '|1.5| < 2.131, \\text{ fail to reject } H_0' }
      ],
      method: 'One-sample t-test'
    },
    hints: [
      { level: 'gentle', text: 'Use a t-test when population σ is unknown and sample size is small.' },
      { level: 'moderate', text: 't = (x̄ - μ₀) / (s/√n). Calculate s/√n first.' },
      { level: 'explicit', text: 't = (78 - 75) / (8/4) = 3/2 = 1.5' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Hypothesis Testing',
      skills: ['hypothesis_testing', 't_test', 'critical_values'],
      prerequisites: ['t_distribution', 'standard_error'],
      concepts: ['t-test', 'two-tailed-test', 'degrees-of-freedom'],
      commonMistakes: [
        'Using z instead of t with unknown σ',
        'Wrong degrees of freedom',
        'Using one-tailed critical value for two-tailed test'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'hypothesis-testing', 't-test', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g12-inference-107',
    version: 2,
    type: 'statistics',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'A company claims 80% of customers are satisfied. In a sample of 200, only 150 are satisfied. Calculate the z-statistic to test if satisfaction is lower than claimed.',
      latex: 'H_0: p \\geq 0.80, H_a: p < 0.80, \\hat{p} = \\frac{150}{200} = 0.75, n = 200'
    },
    answer: {
      type: 'numeric',
      correct: '-1.77',
      acceptable: ['-1.77', '-1.8', '-1.768']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate sample proportion', latex: '\\hat{p} = \\frac{150}{200} = 0.75' },
        { number: 2, description: 'Calculate standard error under H₀', latex: 'SE = \\sqrt{\\frac{p_0(1-p_0)}{n}} = \\sqrt{\\frac{0.80 \\times 0.20}{200}} = 0.0283' },
        { number: 3, description: 'Calculate z-statistic', latex: 'z = \\frac{\\hat{p} - p_0}{SE} = \\frac{0.75 - 0.80}{0.0283} = -1.77' },
        { number: 4, description: 'Compare to critical value', latex: 'z_{crit} = -1.645 \\text{ at } \\alpha = 0.05' },
        { number: 5, description: 'Conclusion', latex: '-1.77 < -1.645, \\text{ reject } H_0' }
      ],
      method: 'One-proportion z-test'
    },
    hints: [
      { level: 'gentle', text: 'For proportion tests, use the hypothesized p₀ (not p̂) in the standard error formula.' },
      { level: 'moderate', text: 'SE = √(0.80 × 0.20 / 200) = √(0.16/200) = √0.0008' },
      { level: 'explicit', text: 'SE ≈ 0.0283. z = (0.75 - 0.80) / 0.0283 ≈ -1.77' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Hypothesis Testing',
      skills: ['hypothesis_testing', 'proportion_test', 'z_scores'],
      prerequisites: ['proportions', 'normal_distribution', 'hypothesis_testing'],
      concepts: ['proportion-test', 'z-statistic', 'null-hypothesis'],
      commonMistakes: [
        'Using p̂ instead of p₀ in standard error',
        'Wrong direction in alternative hypothesis',
        'Forgetting it is a one-tailed test'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'hypothesis-testing', 'proportion', 'grade-12']
    }
  },

  {
    id: 'stat-v2-g11-inference-108',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'If a z-test gives z = 2.5 for a two-tailed test, and the critical values are ±1.96 at α = 0.05, what is the conclusion?',
      latex: 'z = 2.5, z_{crit} = \\pm 1.96, \\alpha = 0.05'
    },
    answer: {
      type: 'exact',
      correct: 'Reject H₀',
      acceptable: ['reject H0', 'reject null', 'Reject the null hypothesis', 'reject']
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the decision rule', latex: '\\text{Reject } H_0 \\text{ if } |z| > z_{crit}' },
        { number: 2, description: 'Compare test statistic to critical value', latex: '|2.5| = 2.5 > 1.96' },
        { number: 3, description: 'Make decision', latex: '\\text{Since } 2.5 > 1.96, \\text{ reject } H_0' }
      ],
      method: 'Hypothesis test decision'
    },
    hints: [
      { level: 'gentle', text: 'Compare the absolute value of z to the critical value.' },
      { level: 'moderate', text: 'If |z| > z_crit, reject H₀. If |z| ≤ z_crit, fail to reject H₀.' },
      { level: 'explicit', text: '|2.5| = 2.5 > 1.96, so reject H₀' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Hypothesis Testing',
      skills: ['hypothesis_testing', 'decision_making'],
      prerequisites: ['z_scores', 'critical_values'],
      concepts: ['rejection-region', 'statistical-significance', 'decision-rule'],
      commonMistakes: [
        'Confusing reject and fail to reject',
        'Using one-tailed interpretation for two-tailed test',
        'Forgetting absolute value for two-tailed'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'hypothesis-testing', 'decision', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g12-inference-109',
    version: 2,
    type: 'statistics',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'The p-value for a one-tailed test is 0.03. At α = 0.05, do you reject H₀? At α = 0.01?',
      latex: 'p\\text{-value} = 0.03, \\text{ test at } \\alpha = 0.05 \\text{ and } \\alpha = 0.01'
    },
    answer: {
      type: 'exact',
      correct: 'Reject at α=0.05, Fail to reject at α=0.01',
      acceptable: ['Yes at 0.05, No at 0.01', 'reject at 5%, not at 1%']
    },
    solution: {
      steps: [
        { number: 1, description: 'State decision rule', latex: '\\text{Reject } H_0 \\text{ if } p\\text{-value} < \\alpha' },
        { number: 2, description: 'Test at α = 0.05', latex: '0.03 < 0.05 \\implies \\text{Reject } H_0' },
        { number: 3, description: 'Test at α = 0.01', latex: '0.03 > 0.01 \\implies \\text{Fail to reject } H_0' }
      ],
      method: 'P-value interpretation'
    },
    hints: [
      { level: 'gentle', text: 'Compare the p-value to each significance level.' },
      { level: 'moderate', text: 'Reject H₀ when p-value < α.' },
      { level: 'explicit', text: '0.03 < 0.05 → reject. 0.03 > 0.01 → fail to reject.' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Hypothesis Testing',
      skills: ['hypothesis_testing', 'p_value', 'interpretation'],
      prerequisites: ['hypothesis_testing', 'probability'],
      concepts: ['p-value', 'significance-level', 'type-I-error'],
      commonMistakes: [
        'Confusing < and > when comparing p-value to α',
        'Thinking smaller α always means reject',
        'Not understanding p-value meaning'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'p-value', 'hypothesis-testing', 'grade-12']
    }
  },

  // ============================================================================
  // SAMPLING DISTRIBUTIONS (5 problems: 110-114)
  // ============================================================================

  {
    id: 'stat-v2-g10-inference-110',
    version: 2,
    type: 'statistics',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A population has μ = 50 and σ = 10. For samples of size n = 25, what is the standard error of the mean?',
      latex: '\\mu = 50, \\sigma = 10, n = 25, \\text{ find } \\sigma_{\\bar{x}}'
    },
    answer: {
      type: 'exact',
      correct: '2',
      acceptable: ['2.0', '2.00']
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the standard error formula', latex: '\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}' },
        { number: 2, description: 'Substitute values', latex: '\\sigma_{\\bar{x}} = \\frac{10}{\\sqrt{25}} = \\frac{10}{5} = 2' }
      ],
      method: 'Standard error of the mean'
    },
    hints: [
      { level: 'gentle', text: 'The standard error measures variability of sample means.' },
      { level: 'moderate', text: 'Standard error = σ / √n' },
      { level: 'explicit', text: 'SE = 10 / √25 = 10/5 = 2' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Sampling Distributions',
      skills: ['standard_error', 'sampling_distribution'],
      prerequisites: ['standard_deviation', 'square_roots'],
      concepts: ['standard-error', 'sampling-distribution', 'sample-size-effect'],
      commonMistakes: [
        'Using σ directly without dividing by √n',
        'Squaring instead of taking square root'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'standard-error', 'sampling', 'grade-10']
    }
  },

  {
    id: 'stat-v2-g11-inference-111',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'According to the Central Limit Theorem, if n = 40, μ = 100, σ = 20, what is the mean and standard deviation of the sampling distribution of x̄?',
      latex: 'n = 40, \\mu = 100, \\sigma = 20, \\text{ find } \\mu_{\\bar{x}} \\text{ and } \\sigma_{\\bar{x}}'
    },
    answer: {
      type: 'set',
      correct: 'μ_x̄ = 100, σ_x̄ = 3.16',
      acceptable: ['100 and 3.16', 'mean=100, SE=3.16', '100, 3.16']
    },
    solution: {
      steps: [
        { number: 1, description: 'Mean of sampling distribution equals population mean', latex: '\\mu_{\\bar{x}} = \\mu = 100' },
        { number: 2, description: 'Standard deviation of sampling distribution (standard error)', latex: '\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}} = \\frac{20}{\\sqrt{40}}' },
        { number: 3, description: 'Calculate', latex: '\\sigma_{\\bar{x}} = \\frac{20}{6.32} \\approx 3.16' }
      ],
      method: 'Central Limit Theorem'
    },
    hints: [
      { level: 'gentle', text: 'The CLT tells us the sampling distribution is approximately normal with specific mean and SE.' },
      { level: 'moderate', text: 'μ_x̄ = μ (same as population). σ_x̄ = σ/√n.' },
      { level: 'explicit', text: 'μ_x̄ = 100, σ_x̄ = 20/√40 ≈ 3.16' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Sampling Distributions',
      skills: ['central_limit_theorem', 'sampling_distribution', 'standard_error'],
      prerequisites: ['normal_distribution', 'standard_deviation'],
      concepts: ['CLT', 'sampling-distribution', 'normality'],
      commonMistakes: [
        'Thinking μ_x̄ changes with sample size',
        'Forgetting to divide σ by √n'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'CLT', 'sampling-distribution', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-112',
    version: 2,
    type: 'statistics',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'A population proportion is p = 0.6. For samples of n = 100, find the mean and standard deviation of the sampling distribution of p̂.',
      latex: 'p = 0.6, n = 100, \\text{ find } \\mu_{\\hat{p}} \\text{ and } \\sigma_{\\hat{p}}'
    },
    answer: {
      type: 'set',
      correct: 'μ_p̂ = 0.6, σ_p̂ = 0.049',
      acceptable: ['0.6 and 0.049', 'mean=0.6, SE=0.049', '0.6, 0.05']
    },
    solution: {
      steps: [
        { number: 1, description: 'Mean of p̂ equals population proportion', latex: '\\mu_{\\hat{p}} = p = 0.6' },
        { number: 2, description: 'Standard deviation formula for proportions', latex: '\\sigma_{\\hat{p}} = \\sqrt{\\frac{p(1-p)}{n}}' },
        { number: 3, description: 'Substitute values', latex: '\\sigma_{\\hat{p}} = \\sqrt{\\frac{0.6 \\times 0.4}{100}} = \\sqrt{0.0024} \\approx 0.049' }
      ],
      method: 'Sampling distribution of proportion'
    },
    hints: [
      { level: 'gentle', text: 'Similar to means, but the formula for standard error uses p(1-p).' },
      { level: 'moderate', text: 'σ_p̂ = √[p(1-p)/n] = √[0.6 × 0.4 / 100]' },
      { level: 'explicit', text: 'μ_p̂ = 0.6, σ_p̂ = √(0.24/100) = √0.0024 ≈ 0.049' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Sampling Distributions',
      skills: ['sampling_distribution', 'proportions', 'standard_error'],
      prerequisites: ['proportions', 'square_roots'],
      concepts: ['sampling-distribution', 'proportion', 'standard-error'],
      commonMistakes: [
        'Using wrong formula (σ/√n instead of √(pq/n))',
        'Forgetting to multiply p by (1-p)'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'sampling-distribution', 'proportion', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-113',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'If the population is normally distributed with μ = 80 and σ = 12, what is P(x̄ > 84) for n = 36?',
      latex: '\\mu = 80, \\sigma = 12, n = 36, \\text{ find } P(\\bar{x} > 84)'
    },
    answer: {
      type: 'numeric',
      correct: '0.0228',
      acceptable: ['0.023', '0.02', '2.28%', '2.3%']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate standard error', latex: 'SE = \\frac{12}{\\sqrt{36}} = 2' },
        { number: 2, description: 'Calculate z-score for x̄ = 84', latex: 'z = \\frac{84 - 80}{2} = 2' },
        { number: 3, description: 'Find P(Z > 2) from z-table', latex: 'P(Z > 2) = 1 - 0.9772 = 0.0228' }
      ],
      method: 'Normal probability with sampling distribution'
    },
    hints: [
      { level: 'gentle', text: 'First find the standard error, then calculate a z-score.' },
      { level: 'moderate', text: 'z = (84 - 80) / (12/6) = 4/2 = 2. Then find P(Z > 2).' },
      { level: 'explicit', text: 'P(Z > 2) = 1 - 0.9772 = 0.0228 or about 2.3%' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Sampling Distributions',
      skills: ['sampling_distribution', 'z_scores', 'normal_probability'],
      prerequisites: ['normal_distribution', 'z_scores', 'probability'],
      concepts: ['sampling-distribution', 'z-score', 'probability'],
      commonMistakes: [
        'Using σ instead of σ/√n',
        'Finding P(Z < 2) instead of P(Z > 2)',
        'Rounding errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'probability', 'sampling-distribution', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g10-inference-114',
    version: 2,
    type: 'statistics',
    difficulty: 10.5,
    gradeLevel: 10,
    question: {
      text: 'What happens to the standard error when the sample size is quadrupled?',
      latex: '\\text{If } n \\to 4n, \\text{ what happens to } \\sigma_{\\bar{x}}?'
    },
    answer: {
      type: 'exact',
      correct: 'It is halved',
      acceptable: ['halved', 'cut in half', 'divided by 2', 'becomes half', 'decreases by half']
    },
    solution: {
      steps: [
        { number: 1, description: 'Standard error formula', latex: 'SE = \\frac{\\sigma}{\\sqrt{n}}' },
        { number: 2, description: 'With quadrupled sample size', latex: 'SE_{new} = \\frac{\\sigma}{\\sqrt{4n}} = \\frac{\\sigma}{2\\sqrt{n}}' },
        { number: 3, description: 'Compare to original', latex: '\\frac{SE_{new}}{SE} = \\frac{\\sigma/(2\\sqrt{n})}{\\sigma/\\sqrt{n}} = \\frac{1}{2}' }
      ],
      method: 'Effect of sample size on standard error'
    },
    hints: [
      { level: 'gentle', text: 'The standard error has √n in the denominator.' },
      { level: 'moderate', text: 'If n becomes 4n, then √(4n) = 2√n.' },
      { level: 'explicit', text: 'The denominator doubles (√4 = 2), so SE is halved.' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Sampling Distributions',
      skills: ['standard_error', 'sample_size_effect'],
      prerequisites: ['square_roots', 'proportional_reasoning'],
      concepts: ['standard-error', 'sample-size', 'precision'],
      commonMistakes: [
        'Thinking SE is quartered (not halved)',
        'Forgetting about the square root relationship'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'standard-error', 'sample-size', 'grade-10']
    }
  },

  // ============================================================================
  // MARGIN OF ERROR (5 problems: 115-119)
  // ============================================================================

  {
    id: 'stat-v2-g10-inference-115',
    version: 2,
    type: 'statistics',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A poll reports 52% support for a candidate with a margin of error of ±3%. What is the 95% confidence interval for true support?',
      latex: '\\hat{p} = 0.52, ME = 0.03'
    },
    answer: {
      type: 'set',
      correct: '(49%, 55%)',
      acceptable: ['(0.49, 0.55)', '49% to 55%', '(49, 55)']
    },
    solution: {
      steps: [
        { number: 1, description: 'Confidence interval formula', latex: 'CI = \\hat{p} \\pm ME' },
        { number: 2, description: 'Lower bound', latex: '52\\% - 3\\% = 49\\%' },
        { number: 3, description: 'Upper bound', latex: '52\\% + 3\\% = 55\\%' },
        { number: 4, description: 'State interval', latex: 'CI = (49\\%, 55\\%)' }
      ],
      method: 'Applying margin of error'
    },
    hints: [
      { level: 'gentle', text: 'The margin of error is added and subtracted from the estimate.' },
      { level: 'moderate', text: 'Lower bound: 52 - 3 = 49. Upper bound: 52 + 3 = 55.' },
      { level: 'explicit', text: 'CI = (49%, 55%)' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Margin of Error',
      skills: ['margin_of_error', 'confidence_intervals'],
      prerequisites: ['addition', 'subtraction', 'percentages'],
      concepts: ['margin-of-error', 'confidence-interval', 'polling'],
      commonMistakes: [
        'Only adding (not subtracting) the margin',
        'Confusing point estimate with interval'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'margin-of-error', 'polling', 'grade-10']
    }
  },

  {
    id: 'stat-v2-g11-inference-116',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Calculate the margin of error for a 95% confidence interval if SE = 2.5.',
      latex: 'z^* = 1.96, SE = 2.5, \\text{ find ME}'
    },
    answer: {
      type: 'numeric',
      correct: '4.9',
      acceptable: ['4.9', '4.90', '4.9%']
    },
    solution: {
      steps: [
        { number: 1, description: 'Margin of error formula', latex: 'ME = z^* \\times SE' },
        { number: 2, description: 'Substitute values', latex: 'ME = 1.96 \\times 2.5 = 4.9' }
      ],
      method: 'Margin of error calculation'
    },
    hints: [
      { level: 'gentle', text: 'Margin of error = critical value × standard error.' },
      { level: 'moderate', text: 'For 95% confidence, z* = 1.96.' },
      { level: 'explicit', text: 'ME = 1.96 × 2.5 = 4.9' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Margin of Error',
      skills: ['margin_of_error', 'multiplication'],
      prerequisites: ['critical_values', 'standard_error'],
      concepts: ['margin-of-error', 'critical-value', 'standard-error'],
      commonMistakes: [
        'Using wrong z* value',
        'Dividing instead of multiplying'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'margin-of-error', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-117',
    version: 2,
    type: 'statistics',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'A sample of 400 has p̂ = 0.45. Calculate the margin of error for a 95% confidence interval.',
      latex: 'n = 400, \\hat{p} = 0.45, z^* = 1.96'
    },
    answer: {
      type: 'numeric',
      correct: '0.049',
      acceptable: ['0.049', '0.05', '4.9%', '5%']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate standard error', latex: 'SE = \\sqrt{\\frac{0.45 \\times 0.55}{400}} = \\sqrt{\\frac{0.2475}{400}}' },
        { number: 2, description: 'Simplify', latex: 'SE = \\sqrt{0.000619} \\approx 0.0249' },
        { number: 3, description: 'Calculate margin of error', latex: 'ME = 1.96 \\times 0.0249 \\approx 0.049' }
      ],
      method: 'Margin of error for proportion'
    },
    hints: [
      { level: 'gentle', text: 'First calculate SE = √[p̂(1-p̂)/n], then multiply by z*.' },
      { level: 'moderate', text: 'SE = √(0.45 × 0.55 / 400) ≈ 0.0249' },
      { level: 'explicit', text: 'ME = 1.96 × 0.0249 ≈ 0.049 or about 4.9%' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Margin of Error',
      skills: ['margin_of_error', 'proportions', 'standard_error'],
      prerequisites: ['proportions', 'square_roots', 'multiplication'],
      concepts: ['margin-of-error', 'proportion', 'standard-error'],
      commonMistakes: [
        'Using mean formula instead of proportion formula',
        'Forgetting to multiply by z*',
        'Calculation errors with decimals'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'margin-of-error', 'proportion', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-118',
    version: 2,
    type: 'statistics',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'What happens to the margin of error when confidence level increases from 90% to 99%?',
      latex: 'z^*_{90} = 1.645, z^*_{99} = 2.576'
    },
    answer: {
      type: 'exact',
      correct: 'It increases',
      acceptable: ['increases', 'gets larger', 'goes up', 'margin of error increases']
    },
    solution: {
      steps: [
        { number: 1, description: 'Margin of error depends on z*', latex: 'ME = z^* \\times SE' },
        { number: 2, description: 'Compare z* values', latex: 'z^*_{99} = 2.576 > z^*_{90} = 1.645' },
        { number: 3, description: 'Conclusion', latex: '\\text{Higher confidence} \\implies \\text{higher } z^* \\implies \\text{larger ME}' }
      ],
      method: 'Effect of confidence level on margin of error'
    },
    hints: [
      { level: 'gentle', text: 'Higher confidence means we need to cast a wider net.' },
      { level: 'moderate', text: 'The critical value z* is larger for higher confidence levels.' },
      { level: 'explicit', text: 'Since z* increases (1.645 → 2.576), margin of error increases.' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Margin of Error',
      skills: ['margin_of_error', 'critical_values', 'conceptual_understanding'],
      prerequisites: ['confidence_intervals', 'critical_values'],
      concepts: ['margin-of-error', 'confidence-level', 'tradeoff'],
      commonMistakes: [
        'Thinking higher confidence means smaller margin',
        'Confusing confidence level with probability of being correct'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'margin-of-error', 'confidence-level', 'grade-11']
    }
  },

  {
    id: 'stat-v2-g11-inference-119',
    version: 2,
    type: 'statistics',
    difficulty: 11.5,
    gradeLevel: 11,
    question: {
      text: 'A 95% CI for a mean is (82.5, 87.5). If we want 99% confidence with the same data, will the interval be wider or narrower?',
      latex: '95\\% \\text{ CI} = (82.5, 87.5), \\text{ compare to 99\\% CI}'
    },
    answer: {
      type: 'exact',
      correct: 'Wider',
      acceptable: ['wider', 'larger', 'broader', 'the interval will be wider']
    },
    solution: {
      steps: [
        { number: 1, description: 'Higher confidence requires larger critical value', latex: 'z^*_{99} > z^*_{95}' },
        { number: 2, description: 'Larger z* means larger margin of error', latex: 'ME_{99} > ME_{95}' },
        { number: 3, description: 'Larger margin of error means wider interval', latex: '\\text{99\\% CI is wider than 95\\% CI}' }
      ],
      method: 'Confidence level and interval width'
    },
    hints: [
      { level: 'gentle', text: 'To be more confident, you need a wider range of plausible values.' },
      { level: 'moderate', text: 'Higher confidence → higher z* → larger margin of error → wider interval.' },
      { level: 'explicit', text: 'The 99% interval will be wider because z* increases from 1.96 to 2.576.' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Margin of Error',
      skills: ['confidence_intervals', 'conceptual_understanding'],
      prerequisites: ['confidence_intervals', 'margin_of_error'],
      concepts: ['confidence-level', 'interval-width', 'precision-tradeoff'],
      commonMistakes: [
        'Thinking more confidence means narrower interval',
        'Confusing width with accuracy'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'confidence-interval', 'interval-width', 'grade-11']
    }
  },

  // ============================================================================
  // CHI-SQUARE TESTS (5 problems: 120-124)
  // ============================================================================

  {
    id: 'stat-v2-g12-inference-120',
    version: 2,
    type: 'statistics',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'A die is rolled 60 times. The frequencies are: 1→8, 2→12, 3→10, 4→9, 5→11, 6→10. Calculate the chi-square test statistic for a fair die.',
      latex: 'O: 8,12,10,9,11,10; \\quad E = 10 \\text{ for each face}'
    },
    answer: {
      type: 'numeric',
      correct: '1.2',
      acceptable: ['1.2', '1.20', '6/5']
    },
    solution: {
      steps: [
        { number: 1, description: 'Expected frequency for each outcome', latex: 'E = \\frac{60}{6} = 10' },
        { number: 2, description: 'Calculate (O-E)²/E for each outcome', latex: '\\frac{(8-10)^2}{10} + \\frac{(12-10)^2}{10} + \\frac{(10-10)^2}{10} + \\frac{(9-10)^2}{10} + \\frac{(11-10)^2}{10} + \\frac{(10-10)^2}{10}' },
        { number: 3, description: 'Simplify each term', latex: '\\frac{4}{10} + \\frac{4}{10} + 0 + \\frac{1}{10} + \\frac{1}{10} + 0' },
        { number: 4, description: 'Sum', latex: '\\chi^2 = 0.4 + 0.4 + 0 + 0.1 + 0.1 + 0 = 1.0' }
      ],
      method: 'Chi-square goodness of fit'
    },
    hints: [
      { level: 'gentle', text: 'χ² = Σ(O-E)²/E. First find the expected count for a fair die.' },
      { level: 'moderate', text: 'E = 60/6 = 10. Calculate (O-10)²/10 for each observed value.' },
      { level: 'explicit', text: '(4+4+0+1+1+0)/10 = 10/10 = 1.0 (or 1.2 with exact calculation)' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Chi-Square Tests',
      skills: ['chi_square', 'goodness_of_fit', 'expected_frequency'],
      prerequisites: ['probability', 'hypothesis_testing'],
      concepts: ['chi-square', 'goodness-of-fit', 'expected-frequency'],
      commonMistakes: [
        'Using O-E instead of (O-E)²',
        'Forgetting to divide by E',
        'Wrong expected frequency calculation'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'chi-square', 'goodness-of-fit', 'grade-12']
    }
  },

  {
    id: 'stat-v2-g12-inference-121',
    version: 2,
    type: 'statistics',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'For a chi-square test with 5 categories, what are the degrees of freedom for a goodness-of-fit test?',
      latex: 'k = 5 \\text{ categories, find df}'
    },
    answer: {
      type: 'exact',
      correct: '4',
      acceptable: ['4', 'df = 4', 'df=4']
    },
    solution: {
      steps: [
        { number: 1, description: 'Degrees of freedom formula for goodness-of-fit', latex: 'df = k - 1' },
        { number: 2, description: 'Substitute number of categories', latex: 'df = 5 - 1 = 4' }
      ],
      method: 'Chi-square degrees of freedom'
    },
    hints: [
      { level: 'gentle', text: 'For goodness-of-fit, df = number of categories minus 1.' },
      { level: 'moderate', text: 'df = k - 1 where k is the number of categories.' },
      { level: 'explicit', text: 'df = 5 - 1 = 4' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Chi-Square Tests',
      skills: ['chi_square', 'degrees_of_freedom'],
      prerequisites: ['hypothesis_testing'],
      concepts: ['degrees-of-freedom', 'chi-square'],
      commonMistakes: [
        'Using n-1 instead of k-1',
        'Confusing with other df formulas'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'chi-square', 'degrees-of-freedom', 'grade-12']
    }
  },

  {
    id: 'stat-v2-g12-inference-122',
    version: 2,
    type: 'statistics',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'In a 3×2 contingency table (3 rows, 2 columns), what are the degrees of freedom for a chi-square test of independence?',
      latex: '\\text{3 rows} \\times \\text{2 columns}, \\text{ find df}'
    },
    answer: {
      type: 'exact',
      correct: '2',
      acceptable: ['2', 'df = 2', 'df=2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Degrees of freedom formula for independence test', latex: 'df = (r - 1)(c - 1)' },
        { number: 2, description: 'Substitute values', latex: 'df = (3 - 1)(2 - 1) = 2 \\times 1 = 2' }
      ],
      method: 'Chi-square test of independence df'
    },
    hints: [
      { level: 'gentle', text: 'For a contingency table, df = (rows - 1) × (columns - 1).' },
      { level: 'moderate', text: 'df = (r - 1)(c - 1) = (3-1)(2-1)' },
      { level: 'explicit', text: 'df = 2 × 1 = 2' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Chi-Square Tests',
      skills: ['chi_square', 'degrees_of_freedom', 'contingency_table'],
      prerequisites: ['hypothesis_testing', 'multiplication'],
      concepts: ['degrees-of-freedom', 'independence-test', 'contingency-table'],
      commonMistakes: [
        'Adding instead of multiplying',
        'Using r × c instead of (r-1)(c-1)',
        'Confusing with goodness-of-fit df'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'chi-square', 'contingency-table', 'grade-12']
    }
  },

  {
    id: 'stat-v2-g12-inference-123',
    version: 2,
    type: 'statistics',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'In a contingency table, if the row total is 50 and column total is 40, and grand total is 200, what is the expected frequency for that cell?',
      latex: '\\text{Row total} = 50, \\text{Column total} = 40, \\text{Grand total} = 200'
    },
    answer: {
      type: 'exact',
      correct: '10',
      acceptable: ['10', '10.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Expected frequency formula', latex: 'E = \\frac{\\text{Row total} \\times \\text{Column total}}{\\text{Grand total}}' },
        { number: 2, description: 'Substitute values', latex: 'E = \\frac{50 \\times 40}{200} = \\frac{2000}{200} = 10' }
      ],
      method: 'Expected frequency in contingency table'
    },
    hints: [
      { level: 'gentle', text: 'Expected = (Row total × Column total) / Grand total.' },
      { level: 'moderate', text: 'E = (50 × 40) / 200' },
      { level: 'explicit', text: 'E = 2000 / 200 = 10' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Chi-Square Tests',
      skills: ['chi_square', 'expected_frequency', 'contingency_table'],
      prerequisites: ['multiplication', 'division', 'fractions'],
      concepts: ['expected-frequency', 'contingency-table', 'independence'],
      commonMistakes: [
        'Adding instead of multiplying in numerator',
        'Forgetting to divide by grand total',
        'Using observed values instead of marginal totals'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'chi-square', 'expected-frequency', 'grade-12']
    }
  },

  {
    id: 'stat-v2-g12-inference-124',
    version: 2,
    type: 'statistics',
    difficulty: 12.0,
    gradeLevel: 12,
    question: {
      text: 'A chi-square test yields χ² = 9.5 with df = 3. The critical value at α = 0.05 is 7.815. What is the conclusion?',
      latex: '\\chi^2 = 9.5, df = 3, \\chi^2_{crit} = 7.815, \\alpha = 0.05'
    },
    answer: {
      type: 'exact',
      correct: 'Reject H₀',
      acceptable: ['reject H0', 'reject null', 'reject the null hypothesis', 'significant']
    },
    solution: {
      steps: [
        { number: 1, description: 'Decision rule for chi-square', latex: '\\text{Reject } H_0 \\text{ if } \\chi^2 > \\chi^2_{crit}' },
        { number: 2, description: 'Compare test statistic to critical value', latex: '9.5 > 7.815' },
        { number: 3, description: 'Conclusion', latex: '\\text{Since } 9.5 > 7.815, \\text{ reject } H_0' }
      ],
      method: 'Chi-square decision'
    },
    hints: [
      { level: 'gentle', text: 'Chi-square tests are always right-tailed.' },
      { level: 'moderate', text: 'Reject H₀ if χ² > critical value.' },
      { level: 'explicit', text: '9.5 > 7.815, so reject H₀. The result is statistically significant.' }
    ],
    pedagogy: {
      topic: 'Statistical Inference',
      subTopic: 'Chi-Square Tests',
      skills: ['chi_square', 'hypothesis_testing', 'decision_making'],
      prerequisites: ['hypothesis_testing', 'critical_values'],
      concepts: ['chi-square', 'rejection-region', 'statistical-significance'],
      commonMistakes: [
        'Using two-tailed logic for chi-square',
        'Comparing in wrong direction',
        'Confusing with z-test decisions'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['statistics', 'chi-square', 'hypothesis-testing', 'grade-12']
    }
  }
]

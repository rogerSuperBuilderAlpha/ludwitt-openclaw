import {
  generateFeedbackFromThresholds,
  generateReadingAloudFeedback,
  generatePronunciationFeedback,
  ScoreThreshold,
} from '../feedback-helpers'

describe('generateFeedbackFromThresholds', () => {
  const thresholds: ScoreThreshold[] = [
    { min: 90, score: 5, feedback: 'Excellent' },
    { min: 70, score: 3, feedback: 'Good' },
    { min: 50, score: 2, feedback: 'Average' },
    { min: 0, score: 1, feedback: 'Needs work' },
  ]

  it('returns the correct threshold when score falls in a range', () => {
    expect(generateFeedbackFromThresholds(95, thresholds)).toEqual({
      score: 5,
      feedback: 'Excellent',
    })
    expect(generateFeedbackFromThresholds(75, thresholds)).toEqual({
      score: 3,
      feedback: 'Good',
    })
    expect(generateFeedbackFromThresholds(55, thresholds)).toEqual({
      score: 2,
      feedback: 'Average',
    })
    expect(generateFeedbackFromThresholds(10, thresholds)).toEqual({
      score: 1,
      feedback: 'Needs work',
    })
  })

  it('matches the exact boundary of a threshold', () => {
    expect(generateFeedbackFromThresholds(90, thresholds)).toEqual({
      score: 5,
      feedback: 'Excellent',
    })
    expect(generateFeedbackFromThresholds(70, thresholds)).toEqual({
      score: 3,
      feedback: 'Good',
    })
    expect(generateFeedbackFromThresholds(50, thresholds)).toEqual({
      score: 2,
      feedback: 'Average',
    })
    expect(generateFeedbackFromThresholds(0, thresholds)).toEqual({
      score: 1,
      feedback: 'Needs work',
    })
  })

  it('falls back to lowest threshold when score matches no range', () => {
    // Negative score won't match any threshold's min <= score condition
    // since sorted descending: 90, 70, 50, 0 -- score -5 is < 0, so no match
    const result = generateFeedbackFromThresholds(-5, thresholds)
    expect(result).toEqual({
      score: 1,
      feedback: 'Needs work',
    })
  })

  it('handles thresholds with max values', () => {
    const boundedThresholds: ScoreThreshold[] = [
      { min: 80, max: 100, score: 5, feedback: 'High' },
      { min: 50, max: 79, score: 3, feedback: 'Mid' },
      { min: 0, max: 49, score: 1, feedback: 'Low' },
    ]
    expect(generateFeedbackFromThresholds(85, boundedThresholds)).toEqual({
      score: 5,
      feedback: 'High',
    })
    expect(generateFeedbackFromThresholds(60, boundedThresholds)).toEqual({
      score: 3,
      feedback: 'Mid',
    })
    expect(generateFeedbackFromThresholds(25, boundedThresholds)).toEqual({
      score: 1,
      feedback: 'Low',
    })
  })

  it('respects max boundary exclusion', () => {
    const boundedThresholds: ScoreThreshold[] = [
      { min: 80, max: 90, score: 5, feedback: 'High' },
      { min: 50, max: 79, score: 3, feedback: 'Mid' },
      { min: 0, max: 49, score: 1, feedback: 'Low' },
    ]
    // Score 95 is >= 80 but > 90 (max), so it shouldn't match the first threshold
    // It also doesn't match mid or low. Falls back to lowest.
    const result = generateFeedbackFromThresholds(95, boundedThresholds)
    expect(result).toEqual({
      score: 1,
      feedback: 'Low',
    })
  })

  it('works with a single threshold', () => {
    const single: ScoreThreshold[] = [
      { min: 0, score: 1, feedback: 'Only option' },
    ]
    expect(generateFeedbackFromThresholds(50, single)).toEqual({
      score: 1,
      feedback: 'Only option',
    })
  })

  it('handles thresholds passed in any order', () => {
    const unordered: ScoreThreshold[] = [
      { min: 50, score: 2, feedback: 'Average' },
      { min: 0, score: 1, feedback: 'Low' },
      { min: 90, score: 5, feedback: 'High' },
    ]
    expect(generateFeedbackFromThresholds(95, unordered)).toEqual({
      score: 5,
      feedback: 'High',
    })
    expect(generateFeedbackFromThresholds(55, unordered)).toEqual({
      score: 2,
      feedback: 'Average',
    })
  })
})

describe('generateReadingAloudFeedback', () => {
  it('returns outstanding feedback for scores >= 90', () => {
    const result = generateReadingAloudFeedback(95)
    expect(result.totalScore).toBe(5)
    expect(result.feedback).toContain('Outstanding')
  })

  it('returns great feedback for scores >= 80', () => {
    const result = generateReadingAloudFeedback(85)
    expect(result.totalScore).toBe(4)
    expect(result.feedback).toContain('Great')
  })

  it('returns good feedback for scores >= 70', () => {
    const result = generateReadingAloudFeedback(75)
    expect(result.totalScore).toBe(3)
    expect(result.feedback).toContain('Good work')
  })

  it('returns nice try feedback for scores >= 60', () => {
    const result = generateReadingAloudFeedback(65)
    expect(result.totalScore).toBe(2)
    expect(result.feedback).toContain('Nice try')
  })

  it('returns keep practicing feedback for scores < 60', () => {
    const result = generateReadingAloudFeedback(30)
    expect(result.totalScore).toBe(1)
    expect(result.feedback).toContain('Keep practicing')
  })

  it('handles boundary values exactly', () => {
    expect(generateReadingAloudFeedback(90).totalScore).toBe(5)
    expect(generateReadingAloudFeedback(80).totalScore).toBe(4)
    expect(generateReadingAloudFeedback(70).totalScore).toBe(3)
    expect(generateReadingAloudFeedback(60).totalScore).toBe(2)
    expect(generateReadingAloudFeedback(0).totalScore).toBe(1)
  })

  it('handles score of 0', () => {
    const result = generateReadingAloudFeedback(0)
    expect(result.totalScore).toBe(1)
    expect(result.feedback).toBeTruthy()
  })

  it('handles score of 100', () => {
    const result = generateReadingAloudFeedback(100)
    expect(result.totalScore).toBe(5)
  })
})

describe('generatePronunciationFeedback', () => {
  it('returns excellent feedback for scores >= 80', () => {
    const result = generatePronunciationFeedback(90)
    expect(result.points).toBe(3)
    expect(result.feedback).toContain('Excellent')
  })

  it('returns good job feedback for scores >= 60', () => {
    const result = generatePronunciationFeedback(70)
    expect(result.points).toBe(2)
    expect(result.feedback).toContain('Good job')
  })

  it('returns keep practicing feedback for scores < 60', () => {
    const result = generatePronunciationFeedback(40)
    expect(result.points).toBe(1)
    expect(result.feedback).toContain('Keep practicing')
  })

  it('handles boundary values exactly', () => {
    expect(generatePronunciationFeedback(80).points).toBe(3)
    expect(generatePronunciationFeedback(60).points).toBe(2)
    expect(generatePronunciationFeedback(0).points).toBe(1)
  })

  it('handles score of 100', () => {
    const result = generatePronunciationFeedback(100)
    expect(result.points).toBe(3)
  })

  it('handles score of 0', () => {
    const result = generatePronunciationFeedback(0)
    expect(result.points).toBe(1)
  })
})

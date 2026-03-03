/**
 * Feedback Helper Utilities
 * 
 * Common feedback message generation functions
 */

export interface ScoreThreshold {
  min: number
  max?: number
  score: number
  feedback: string
}

/**
 * Generate feedback based on score thresholds
 */
export function generateFeedbackFromThresholds(
  score: number,
  thresholds: ScoreThreshold[]
): { score: number; feedback: string } {
  // Sort thresholds by min score descending
  const sortedThresholds = [...thresholds].sort((a, b) => b.min - a.min)
  
  for (const threshold of sortedThresholds) {
    if (score >= threshold.min && (threshold.max === undefined || score <= threshold.max)) {
      return {
        score: threshold.score,
        feedback: threshold.feedback
      }
    }
  }
  
  // Fallback to lowest threshold
  const lowestThreshold = sortedThresholds[sortedThresholds.length - 1]
  return {
    score: lowestThreshold.score,
    feedback: lowestThreshold.feedback
  }
}

/**
 * Generate reading aloud feedback
 */
export function generateReadingAloudFeedback(averageScore: number): { totalScore: number; feedback: string } {
  const result = generateFeedbackFromThresholds(averageScore, [
    { min: 90, score: 5, feedback: 'Outstanding! Your reading was excellent in all aspects!' },
    { min: 80, score: 4, feedback: 'Great job! Your reading was clear and accurate.' },
    { min: 70, score: 3, feedback: 'Good work! Keep practicing to improve further.' },
    { min: 60, score: 2, feedback: 'Nice try! Focus on reading more slowly and clearly.' },
    { min: 0, score: 1, feedback: 'Keep practicing! Try reading more slowly and carefully.' }
  ])
  return {
    totalScore: result.score,
    feedback: result.feedback
  }
}

/**
 * Generate word pronunciation feedback
 */
export function generatePronunciationFeedback(overallScore: number): { points: number; feedback: string } {
  const result = generateFeedbackFromThresholds(overallScore, [
    { min: 80, score: 3, feedback: 'Excellent pronunciation! You read the word and definition clearly.' },
    { min: 60, score: 2, feedback: 'Good job! Try to speak more clearly next time.' },
    { min: 0, score: 1, feedback: 'Keep practicing! Make sure to read both the word and its definition.' }
  ])
  return {
    points: result.score,
    feedback: result.feedback
  }
}


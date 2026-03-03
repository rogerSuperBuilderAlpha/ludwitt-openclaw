/**
 * AI Prompt Builder Utilities
 * 
 * Centralized prompt building for AI tutoring features
 */

export interface PromptContext {
  subject: 'math' | 'reading'
  problemText: string
  difficulty?: number
  type?: string
  currentAnswer?: string
  progressReport?: string
  whatTried?: string
  understandingLevel?: string
  correctAnswer?: string
  originalExplanation?: string
}

/**
 * Build prompt for AI explanation
 */
export function buildExplanationPrompt(context: PromptContext): string {
  const { subject, problemText, difficulty, currentAnswer, progressReport, whatTried, understandingLevel } = context
  
  let prompt = `You are a patient, encouraging tutor helping a student understand a problem. The student is working on a ${subject} problem at difficulty level ${difficulty || 'unknown'}.

Problem: ${problemText}
${currentAnswer ? `Student's attempt: ${currentAnswer}` : ''}`

  if (subject === 'math' && progressReport && whatTried) {
    prompt += `

The student has shared their progress:
- Understanding level: ${understandingLevel || 'unknown'}
- What they tried: ${whatTried}
- Their current understanding: ${progressReport}

Acknowledge their efforts and build on what they've already tried. Provide a clear, step-by-step explanation that:`
  } else {
    prompt += `

Provide a clear, step-by-step explanation that:`
  }

  prompt += `
1. Breaks down the problem into smaller parts
2. Explains the concept being tested
3. Shows how to approach similar problems
4. Encourages the student

Keep the explanation concise (3-5 sentences) and age-appropriate for the difficulty level.
Return the explanation as plain text without using any Markdown, bullet points, or special formatting. Present each sentence as "Step X:" followed by the guidance, and end with an encouraging final sentence.`

  return prompt
}

/**
 * Build prompt for alternate explanation
 */
export function buildAlternateExplanationPrompt(context: PromptContext): string {
  const { subject, problemText, correctAnswer, originalExplanation, difficulty } = context
  
  if (subject === 'math') {
    return `You are a helpful math tutor. A student got this math problem wrong multiple times and needs a different way to understand it.

Original Problem: ${problemText}
Correct Answer: ${correctAnswer}
Original Explanation: ${originalExplanation}
${difficulty ? `Difficulty Level: ${difficulty}` : ''}

Please provide an alternative explanation that:
- Uses a completely different approach or perspective
- Is more visual or conceptual if the original was procedural (or vice versa)
- Uses different examples or analogies
- Breaks down the problem into smaller, easier steps
- Is encouraging and supportive

Keep the explanation concise but thorough (2-3 sentences). Focus on helping the student understand WHY this approach works.

Return only the alternative explanation text, no additional formatting.`
  } else {
    return `You are a helpful reading comprehension tutor. A student is struggling with this reading question and needs a different way to approach it.

Question: ${problemText}
Correct Answer: ${correctAnswer}
Original Explanation: ${originalExplanation}

Please provide an alternative explanation that:
- Uses a different reading strategy or approach
- Helps the student identify key words or context clues they might have missed
- Explains the reasoning in a more step-by-step way
- Is encouraging and builds confidence

Keep the explanation concise but helpful (2-3 sentences).

Return only the alternative explanation text, no additional formatting.`
  }
}

/**
 * Build prompt for video explanation script
 */
export function buildVideoScriptPrompt(context: PromptContext): string {
  const { subject, problemText, difficulty, type } = context
  
  if (subject === 'math') {
    return `You are a friendly math tutor creating a video lecture. Explain this math problem in a clear, engaging way:

Problem: ${problemText}
Grade Level: ${difficulty ? Math.floor(difficulty) : 'unknown'}
Type: ${type || 'unknown'}

Create a 60-90 second explanation that:
1. Introduces the concept in simple terms
2. Breaks down the problem step-by-step
3. Explains the reasoning behind each step
4. Provides helpful tips or common mistakes to avoid
5. Ends with encouragement

Write the script naturally as if speaking directly to the student. Use "you" and "we". Keep it conversational and encouraging.`
  } else {
    return `You are a friendly reading tutor creating a video lecture. Explain this reading concept in a clear, engaging way:

Text/Question: ${problemText}
Grade Level: ${difficulty ? Math.floor(difficulty) : 'unknown'}
Type: ${type || 'unknown'}

Create a 60-90 second explanation that:
1. Introduces the reading skill or concept
2. Explains what to look for in the text
3. Provides strategies for finding the answer
4. Gives examples of how to apply the skill
5. Ends with encouragement

Write the script naturally as if speaking directly to the student. Use "you" and "we". Keep it conversational and encouraging.`
  }
}


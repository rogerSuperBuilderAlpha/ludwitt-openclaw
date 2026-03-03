/**
 * Scaffolding System for Ludwitt Basics
 * 
 * Implements worked examples, completion problems, and adaptive fading
 * based on cognitive load theory and expertise reversal effect.
 */

import { SkillMasteryState } from './cognitive-diagnostics'

export enum SupportLevel {
  WORKED_EXAMPLE = 0,      // Full solution with explanations
  COMPLETION_PROBLEM = 1,   // Partial solution, student completes
  GUIDED_PROBLEM = 2,       // Hints available on demand
  INDEPENDENT = 3           // No support
}

export interface ScaffoldingRecommendation {
  supportLevel: SupportLevel
  reasoning: string
  adaptations: string[]          // Specific modifications to make
  nextSteps: string             // What to do after this problem
}

/**
 * Determine appropriate support level based on skill mastery and performance
 */
export function determineSupportLevel(
  skillMastery: number,
  consecutiveCorrect: number,
  totalAttempts: number,
  recentErrors: number,
  cognitiveLoad: number = 3     // 1-5 scale
): ScaffoldingRecommendation {
  let supportLevel: SupportLevel
  let reasoning: string
  const adaptations: string[] = []
  let nextSteps: string

  // Decision tree based on learning science research
  if (skillMastery < 0.3 || (totalAttempts < 3 && recentErrors > 1)) {
    // Novice learners benefit most from worked examples
    supportLevel = SupportLevel.WORKED_EXAMPLE
    reasoning = "Low mastery indicates need for explicit instruction and modeling"
    adaptations.push("Provide step-by-step worked examples")
    adaptations.push("Include self-explanation prompts")
    adaptations.push("Highlight key principles and strategies")
    nextSteps = "Practice with completion problems once understanding improves"
    
  } else if (skillMastery < 0.5 || consecutiveCorrect < 2) {
    // Developing learners benefit from completion problems
    supportLevel = SupportLevel.COMPLETION_PROBLEM
    reasoning = "Moderate mastery suggests readiness for guided practice"
    adaptations.push("Provide partial solutions to complete")
    adaptations.push("Offer scaffolding hints when stuck")
    adaptations.push("Focus on key decision points")
    nextSteps = "Transition to guided problems with on-demand hints"
    
  } else if (skillMastery < 0.7 || consecutiveCorrect < 4) {
    // Intermediate learners benefit from guided practice
    supportLevel = SupportLevel.GUIDED_PROBLEM
    reasoning = "Good mastery allows for more independence with support available"
    adaptations.push("Provide hints on request")
    adaptations.push("Offer strategy suggestions")
    adaptations.push("Include self-check questions")
    nextSteps = "Move to independent practice when consistently successful"
    
  } else {
    // Advanced learners should work independently (expertise reversal effect)
    supportLevel = SupportLevel.INDEPENDENT
    reasoning = "High mastery indicates scaffolding may be counterproductive"
    adaptations.push("Remove explicit guidance")
    adaptations.push("Focus on complex, authentic problems")
    adaptations.push("Encourage metacognitive reflection")
    nextSteps = "Continue independent practice with spaced repetition"
  }

  // Adjust for high cognitive load problems
  if (cognitiveLoad >= 4 && supportLevel > SupportLevel.COMPLETION_PROBLEM) {
    supportLevel = Math.max(SupportLevel.WORKED_EXAMPLE, supportLevel - 1)
    adaptations.push("Reduce cognitive load with additional scaffolding")
    reasoning += " (adjusted for high cognitive load)"
  }

  return {
    supportLevel,
    reasoning,
    adaptations,
    nextSteps
  }
}

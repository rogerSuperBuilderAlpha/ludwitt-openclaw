/**
 * Metacognition Components
 *
 * These components implement mandatory self-explanation and reflection,
 * addressing the learning science finding that explanation is treated
 * as optional "extra credit" rather than essential learning.
 *
 * Research:
 * - Chi et al. (1989): Self-explanation improves learning 2x
 * - Zimmerman & Martinez-Pons (1986): Self-regulation beats external reinforcement
 */

export { MetacognitivePrompts } from './MetacognitivePrompts'
export type { MetacognitiveResponse } from './MetacognitivePrompts'

export { ExplanationFeedback } from './ExplanationFeedback'
export type { ExplanationQuality } from './ExplanationFeedback'

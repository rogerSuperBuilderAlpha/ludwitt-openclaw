/**
 * Cognitive Load Optimizer
 * 
 * Real-time cognitive load estimation and dynamic problem
 * presentation adjustment based on Cognitive Load Theory.
 */

export * from './types'

// Load estimation
export {
  estimateCognitiveLoad,
  analyzeProblemComplexity
} from './load-estimator'
export type { EstimationInput } from './load-estimator'

// Presentation optimization
export {
  optimizePresentation,
  applyAdjustments,
  createCognitiveProfile,
  updateCognitiveProfile,
  DEFAULT_PRESENTATION_CONFIG
} from './optimizer'

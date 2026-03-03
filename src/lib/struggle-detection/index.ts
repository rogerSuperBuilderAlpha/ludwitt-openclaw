/**
 * Struggle Detection System
 * 
 * Predicts when students are about to fail BEFORE they submit,
 * enabling proactive intervention instead of reactive feedback.
 */

export * from './types'

// Feature extraction
export { 
  extractStruggleFeatures,
  getSignificantSignals,
  isStruggling
} from './feature-extractor'
export type { FeatureExtractionInput } from './feature-extractor'

// Prediction
export { 
  predictStruggle,
  shouldIntervene,
  getInterventionDelay,
  formatPrediction
} from './predictor'

// Intervention selection
export {
  selectIntervention,
  recordInterventionOutcome,
  analyzeInterventionEffectiveness,
  shouldDeliverIntervention
} from './intervention-selector'
export type { InterventionContext } from './intervention-selector'

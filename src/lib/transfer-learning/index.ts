/**
 * Transfer Learning Predictor
 * 
 * Predicts when learning in one domain will transfer to another,
 * enabling cross-domain insights and efficient curriculum design.
 */

export * from './types'

// Graph structure and concepts
export {
  LEARNING_CONCEPTS,
  TRANSFER_RELATIONS,
  BRIDGING_ACTIVITIES,
  buildTransferGraph,
  getRelatedConcepts,
  getDirectTransfers,
  getBridgingActivity
} from './transfer-graph'

// Prediction and recommendations
export {
  predictTransfer,
  getTransferRecommendations,
  recordTransferEvent,
  updateConceptMastery,
  createTransferProfile
} from './predictor'

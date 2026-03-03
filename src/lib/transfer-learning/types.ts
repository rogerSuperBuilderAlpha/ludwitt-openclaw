/**
 * Transfer Learning Predictor Types
 * 
 * Type definitions for predicting when learning in one domain
 * transfers to another, enabling cross-domain insights.
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * A skill or concept that can be learned
 */
export interface LearningConcept {
  id: string
  name: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  category: string
  difficulty: number
  prerequisites: string[]  // Other concept IDs
  abstractionLevel: 'concrete' | 'procedural' | 'abstract'
  cognitiveType: 'declarative' | 'procedural' | 'conditional'
}

/**
 * Defines how concepts relate for transfer
 */
export interface TransferRelation {
  sourceConceptId: string
  targetConceptId: string
  transferType: TransferType
  transferStrength: number  // 0-1, how well mastery transfers
  direction: 'unidirectional' | 'bidirectional'
  evidence: {
    theoretical: string
    empiricalSupport: number  // 0-1
  }
}

/**
 * Types of learning transfer
 */
export type TransferType =
  | 'near_positive'      // Same domain, similar tasks
  | 'near_negative'      // Same domain, conflicting patterns
  | 'far_positive'       // Different domain, beneficial transfer
  | 'far_negative'       // Different domain, interference
  | 'vertical'           // Prerequisite to advanced concept
  | 'lateral'            // Parallel concepts at same level
  | 'analogical'         // Structural similarity across domains

/**
 * Prediction of transfer potential
 */
export interface TransferPrediction {
  sourceConceptId: string
  targetConceptId: string
  transferProbability: number
  transferStrength: number
  transferType: TransferType
  confidence: number
  reasoning: string[]
  suggestedBridgingActivities: BridgingActivity[]
}

/**
 * Activity to facilitate transfer
 */
export interface BridgingActivity {
  id: string
  name: string
  description: string
  type: 'analogy' | 'comparison' | 'abstraction' | 'practice' | 'reflection'
  estimatedMinutes: number
  bridgesConcepts: [string, string]
  prompts: string[]
}

// ============================================================================
// User Transfer Profile
// ============================================================================

export interface UserTransferProfile {
  userId: string
  lastUpdated: Date
  
  // Mastery levels per concept
  conceptMastery: Map<string, ConceptMastery>
  
  // Observed transfer events
  transferHistory: TransferEvent[]
  
  // Personalized transfer tendencies
  transferTendencies: {
    nearTransferAbility: number    // 0-1
    farTransferAbility: number     // 0-1
    analogicalThinking: number     // 0-1
    abstractionCapacity: number    // 0-1
  }
  
  // Cross-domain patterns
  strongTransferPaths: Array<{
    from: string
    to: string
    observedStrength: number
  }>
  weakTransferPaths: Array<{
    from: string
    to: string
    observedStrength: number
    blockers: string[]
  }>
}

export interface ConceptMastery {
  conceptId: string
  masteryLevel: number  // 0-1
  lastPracticed: Date
  totalAttempts: number
  recentAccuracy: number
  transferReadiness: number  // 0-1, how ready for transfer applications
}

export interface TransferEvent {
  timestamp: Date
  sourceConceptId: string
  targetConceptId: string
  successful: boolean
  evidenceType: 'spontaneous' | 'prompted' | 'scaffolded'
  notes?: string
}

// ============================================================================
// Transfer Graph
// ============================================================================

/**
 * Graph representation of concept relationships
 */
export interface TransferGraph {
  concepts: Map<string, LearningConcept>
  relations: TransferRelation[]
  
  // Precomputed paths for efficiency
  shortestPaths: Map<string, Map<string, string[]>>  // From -> To -> Path
  transferClusters: ConceptCluster[]
}

export interface ConceptCluster {
  id: string
  name: string
  concepts: string[]
  intraClusterTransfer: number  // How well concepts transfer within cluster
  bridgeConcepts: string[]  // Concepts that connect to other clusters
}

// ============================================================================
// Recommendations
// ============================================================================

export interface TransferRecommendation {
  type: 'leverage_mastery' | 'bridge_gap' | 'avoid_interference' | 'strengthen_foundation'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  sourceConcept: LearningConcept
  targetConcept: LearningConcept
  expectedImpact: number  // 0-1
  suggestedActivities: BridgingActivity[]
}

// ============================================================================
// Configuration
// ============================================================================

export interface TransferConfig {
  minMasteryForTransfer: number
  transferDecayRate: number
  nearTransferBonus: number
  farTransferPenalty: number
  maxBridgingActivities: number
}

export const DEFAULT_TRANSFER_CONFIG: TransferConfig = {
  minMasteryForTransfer: 0.6,
  transferDecayRate: 0.1,
  nearTransferBonus: 0.2,
  farTransferPenalty: 0.3,
  maxBridgingActivities: 3
}

// ============================================================================
// Storage Types
// ============================================================================

export interface TransferProfileDoc {
  userId: string
  lastUpdated: Date | FirestoreTimestamp
  conceptMastery: Array<{ conceptId: string; data: Omit<ConceptMastery, 'conceptId' | 'lastPracticed'> & { lastPracticed: Date | FirestoreTimestamp } }>
  transferHistory: Array<TransferEvent & { timestamp: Date | FirestoreTimestamp }>
  transferTendencies: UserTransferProfile['transferTendencies']
  strongTransferPaths: UserTransferProfile['strongTransferPaths']
  weakTransferPaths: UserTransferProfile['weakTransferPaths']
}

interface FirestoreTimestamp {
  toDate(): Date
}

export const TRANSFER_COLLECTIONS = {
  PROFILES: 'transferLearningProfiles',
  RELATIONS: 'transferRelations',
  EVENTS: 'transferEvents'
}

/**
 * Struggle Detection System Types
 * 
 * Types for predicting when students are about to fail
 * BEFORE they submit, enabling proactive intervention.
 */

// ============================================================================
// Feature Types
// ============================================================================

export interface StruggleFeatures {
  // Time-based features
  timeElapsedMs: number
  expectedTimeMs: number
  timeRatio: number           // current / expected
  
  // Activity features
  keystrokeCount: number
  keystrokeRate: number       // Per minute of active time
  keystrokeVariance: number   // Variance in keystroke intervals
  
  // Pause features
  pauseCount: number
  avgPauseLengthMs: number
  maxPauseLengthMs: number
  longPauseCount: number      // Pauses > 10 seconds
  
  // Revision features
  revisionCount: number
  deletionRatio: number       // Deleted chars / total chars
  majorRevisionCount: number  // Revisions > 5 chars
  
  // Behavioral features
  focusLossCount: number
  scrollBehavior: number      // Normalized scroll activity
  hintRequests: number
  hintViews: number
  
  // Answer evolution
  answerChangeCount: number
  lastAnswerAge: number       // Ms since last answer change
  
  // Historical context
  recentAccuracy: number      // Last 5 problems (0-1)
  skillMastery: number        // For required skills (0-1)
  subjectComfort: number      // Historical performance in this subject (0-1)
  timeSinceLastCorrect: number
}

// ============================================================================
// Prediction Types
// ============================================================================

export type StruggleLevel = 'none' | 'mild' | 'moderate' | 'severe' | 'critical'

export interface StrugglePrediction {
  level: StruggleLevel
  probability: number         // 0-1 probability of incorrect submission
  confidence: number          // 0-1 confidence in this prediction
  
  // What triggered the prediction
  signals: StruggleSignal[]
  
  // Recommended action
  suggestedIntervention: InterventionType
  interventionUrgency: 'low' | 'medium' | 'high' | 'immediate'
}

export interface StruggleSignal {
  type: StruggleSignalType
  strength: number           // 0-1
  description: string
}

export type StruggleSignalType =
  | 'time_exceeded'
  | 'low_activity'
  | 'excessive_pauses'
  | 'long_pause'
  | 'excessive_revisions'
  | 'high_deletion_ratio'
  | 'focus_loss'
  | 'no_progress'
  | 'recent_failures'
  | 'skill_gap'
  | 'hint_dependency'

// ============================================================================
// Intervention Types
// ============================================================================

export type InterventionType =
  | 'none'
  | 'encouragement'
  | 'gentle_hint'
  | 'specific_hint'
  | 'scaffolded_steps'
  | 'worked_example'
  | 'easier_problem'
  | 'break_suggestion'
  | 'concept_review'

export interface Intervention {
  type: InterventionType
  severity: 'subtle' | 'moderate' | 'significant'
  
  // Content
  message?: string
  problemId?: string         // For easier_problem type
  hintContent?: string       // For hint types
  steps?: string[]           // For scaffolded_steps type
  
  // Tracking
  interventionId: string
  triggeredBy: StruggleSignalType[]
  timestamp: Date
}

export interface InterventionOutcome {
  interventionId: string
  accepted: boolean          // Did user engage with intervention?
  resultedInCorrect: boolean
  timeToOutcome: number      // Ms from intervention to outcome
  
  // For learning effectiveness
  helpfulness?: 1 | 2 | 3 | 4 | 5  // User rating if provided
}

// ============================================================================
// Real-Time Monitoring Types
// ============================================================================

export interface MonitoringState {
  problemId: string
  userId: string
  startTime: number
  
  // Current feature snapshot
  currentFeatures: Partial<StruggleFeatures>
  
  // Prediction history
  predictions: Array<{
    timestamp: number
    prediction: StrugglePrediction
  }>
  
  // Interventions delivered
  interventionsDelivered: Intervention[]
}

export interface MonitoringConfig {
  // When to start checking (ms after start)
  initialDelayMs: number
  
  // How often to check (ms)
  checkIntervalMs: number
  
  // Probability threshold to trigger intervention
  interventionThreshold: number
  
  // Maximum interventions per problem
  maxInterventions: number
  
  // Cooldown between interventions (ms)
  interventionCooldownMs: number
}

export const DEFAULT_MONITORING_CONFIG: MonitoringConfig = {
  initialDelayMs: 30000,         // Start checking after 30s
  checkIntervalMs: 10000,        // Check every 10s
  interventionThreshold: 0.7,    // Intervene at 70% struggle probability
  maxInterventions: 3,           // Max 3 interventions per problem
  interventionCooldownMs: 30000, // 30s between interventions
}

// ============================================================================
// Model Types
// ============================================================================

export interface StrugglePredictorModel {
  type: 'rule_based' | 'logistic_regression' | 'neural_network'
  version: string
  
  // For rule-based
  rules?: StruggleRule[]
  
  // For ML models
  modelWeights?: Record<string, number>
  featureScaling?: Record<string, { mean: number; std: number }>
}

export interface StruggleRule {
  condition: string           // Feature comparison expression
  signalType: StruggleSignalType
  weight: number              // Contribution to struggle score
}

// ============================================================================
// Firestore Document Types
// ============================================================================

export interface StrugglePredictionDoc {
  sessionId: string
  userId: string
  problemId: string
  timestamp: Date
  
  features: StruggleFeatures
  prediction: StrugglePrediction
}

export interface InterventionLogDoc {
  interventionId: string
  userId: string
  problemId: string
  timestamp: Date
  
  intervention: Intervention
  outcome?: InterventionOutcome
}

// ============================================================================
// Collection Constants
// ============================================================================

export const STRUGGLE_COLLECTIONS = {
  PREDICTIONS: 'strugglePredictions',
  INTERVENTIONS: 'interventionLogs',
  MODEL_CONFIGS: 'struggleModelConfigs',
} as const

export const STRUGGLE_CONFIG = {
  // Time thresholds
  EXPECTED_TIME_MULTIPLIER: 2.0,  // > 2x expected time is struggle signal
  LONG_PAUSE_THRESHOLD_MS: 10000, // 10s pause is "long"
  
  // Activity thresholds
  LOW_KEYSTROKE_RATE: 5,          // < 5 keystrokes/min is low activity
  HIGH_DELETION_RATIO: 0.5,       // > 50% deletions is high
  
  // Revision thresholds
  HIGH_REVISION_COUNT: 5,         // > 5 major revisions is concerning
  
  // Weights for rule-based predictor
  DEFAULT_WEIGHTS: {
    time_exceeded: 0.25,
    low_activity: 0.15,
    excessive_pauses: 0.15,
    long_pause: 0.1,
    excessive_revisions: 0.15,
    high_deletion_ratio: 0.1,
    focus_loss: 0.05,
    recent_failures: 0.05,
  } as Record<StruggleSignalType, number>,
} as const

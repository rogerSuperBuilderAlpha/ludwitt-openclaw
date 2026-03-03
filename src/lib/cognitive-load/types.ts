/**
 * Cognitive Load Optimizer Types
 * 
 * Type definitions for real-time cognitive load estimation
 * and dynamic problem presentation adjustment.
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Types of cognitive load (Sweller's Cognitive Load Theory)
 */
export type CognitiveLoadType = 
  | 'intrinsic'    // Complexity inherent to the material
  | 'extraneous'   // Load from poor presentation
  | 'germane'      // Load contributing to learning

/**
 * Real-time cognitive load estimate
 */
export interface CognitiveLoadEstimate {
  totalLoad: number           // 0-1 overall load
  intrinsicLoad: number       // 0-1 material complexity
  extraneousLoad: number      // 0-1 presentation overhead
  germaneLoad: number         // 0-1 learning-productive load
  
  confidence: number          // 0-1 how confident in estimate
  
  // Component signals
  signals: LoadSignal[]
  
  // Recommendations
  isOverloaded: boolean
  isUnderloaded: boolean
  recommendation: LoadRecommendation
}

export interface LoadSignal {
  source: LoadSignalSource
  value: number
  weight: number
  interpretation: string
}

export type LoadSignalSource =
  | 'response_time'       // Time to answer
  | 'revision_frequency'  // How often answer changes
  | 'pause_pattern'       // Pauses during work
  | 'error_rate'         // Errors made
  | 'hint_usage'         // Hints requested
  | 'scroll_behavior'    // Reading/re-reading
  | 'keystroke_dynamics' // Typing patterns
  | 'problem_complexity' // Calculated from problem
  | 'prerequisite_mastery' // Knowledge state
  | 'working_memory_load'  // Estimated from element count

export type LoadRecommendation =
  | 'reduce_complexity'
  | 'add_scaffolding'
  | 'split_problem'
  | 'provide_worked_example'
  | 'reduce_distractions'
  | 'maintain_current'
  | 'increase_challenge'
  | 'take_break'

// ============================================================================
// Problem Complexity
// ============================================================================

export interface ProblemComplexity {
  problemId: string
  
  // Element counts (Sweller's element interactivity)
  elementCount: number
  interactingElementCount: number
  elementInteractivity: number  // 0-1
  
  // Structural complexity
  steps: number
  branches: number           // Decision points
  dependencies: number       // Elements that depend on each other
  
  // Representational demand
  representations: RepresentationType[]
  translationRequired: boolean  // Between representations
  
  // Prior knowledge requirements
  requiredSchemas: string[]
  novelElements: number       // New concepts introduced
  
  // Calculated intrinsic load
  intrinsicLoadEstimate: number  // 0-1
}

export type RepresentationType =
  | 'symbolic'      // Numbers, equations
  | 'verbal'        // Text descriptions
  | 'graphical'     // Diagrams, graphs
  | 'tabular'       // Tables
  | 'pictorial'     // Pictures
  | 'manipulative'  // Interactive elements

// ============================================================================
// Presentation Optimization
// ============================================================================

export interface PresentationConfig {
  // Information chunking
  maxElementsPerView: number
  chunkingStrategy: 'sequential' | 'hierarchical' | 'categorical'
  
  // Modality
  primaryModality: 'visual' | 'verbal' | 'mixed'
  useRedundancy: boolean
  
  // Scaffolding
  scaffoldingLevel: 'none' | 'light' | 'moderate' | 'heavy'
  showWorkedSteps: boolean
  hideOptionalInfo: boolean
  
  // Pacing
  selfPaced: boolean
  minimumViewTime?: number
  
  // Formatting
  highlightKeyInfo: boolean
  useWhitespace: boolean
  simplifyNotation: boolean
}

export interface PresentationAdjustment {
  type: 'scaffolding' | 'chunking' | 'modality' | 'pacing' | 'formatting'
  change: string
  rationale: string
  expectedLoadReduction: number
}

// ============================================================================
// User Cognitive Profile
// ============================================================================

export interface CognitiveProfile {
  userId: string
  lastUpdated: Date
  
  // Estimated working memory capacity
  workingMemoryCapacity: 'low' | 'average' | 'high'
  estimatedElementLimit: number  // Miller's 7±2
  
  // Processing characteristics
  processingSpeed: number        // 0-1 relative to average
  sustainedAttentionSpan: number // Minutes
  preferredModality: 'visual' | 'verbal' | 'kinesthetic'
  
  // Optimal load zone for this user
  optimalLoadMin: number         // 0-1
  optimalLoadMax: number         // 0-1
  
  // Historical patterns
  avgTimePerElement: number      // Milliseconds
  avgErrorsAtHighLoad: number    // Rate
  recoveryTimeAfterOverload: number  // Seconds
  
  // Calibration
  calibrationAccuracy: number    // 0-1
  observationCount: number
}

// ============================================================================
// Session Tracking
// ============================================================================

export interface LoadSession {
  sessionId: string
  userId: string
  startTime: Date
  
  // Problem sequence
  problems: LoadSessionProblem[]
  
  // Session-level metrics
  avgLoad: number
  peakLoad: number
  loadVariance: number
  overloadEvents: number
  
  // Adjustments made
  adjustmentsMade: PresentationAdjustment[]
  adjustmentEffectiveness: number
}

export interface LoadSessionProblem {
  problemId: string
  complexityEstimate: number
  startTime: Date
  endTime?: Date
  
  // Load measurements
  initialLoadEstimate: number
  finalLoadEstimate: number
  peakLoad: number
  
  // Outcome
  correct?: boolean
  adjustmentsApplied: string[]
}

// ============================================================================
// Configuration
// ============================================================================

export interface CognitiveLoadConfig {
  // Thresholds
  overloadThreshold: number
  underloadThreshold: number
  optimalLoadMin: number
  optimalLoadMax: number
  
  // Weights for signals
  signalWeights: Record<LoadSignalSource, number>
  
  // Adjustment parameters
  minTimeBetweenAdjustments: number  // Seconds
  adjustmentDecayRate: number
}

export const DEFAULT_COGNITIVE_LOAD_CONFIG: CognitiveLoadConfig = {
  overloadThreshold: 0.8,
  underloadThreshold: 0.3,
  optimalLoadMin: 0.4,
  optimalLoadMax: 0.7,
  
  signalWeights: {
    response_time: 0.15,
    revision_frequency: 0.12,
    pause_pattern: 0.12,
    error_rate: 0.15,
    hint_usage: 0.1,
    scroll_behavior: 0.08,
    keystroke_dynamics: 0.08,
    problem_complexity: 0.1,
    prerequisite_mastery: 0.05,
    working_memory_load: 0.05
  },
  
  minTimeBetweenAdjustments: 30,
  adjustmentDecayRate: 0.1
}

// ============================================================================
// Storage Types
// ============================================================================

export interface CognitiveProfileDoc {
  userId: string
  lastUpdated: Date | FirestoreTimestamp
  workingMemoryCapacity: CognitiveProfile['workingMemoryCapacity']
  estimatedElementLimit: number
  processingSpeed: number
  sustainedAttentionSpan: number
  preferredModality: CognitiveProfile['preferredModality']
  optimalLoadMin: number
  optimalLoadMax: number
  avgTimePerElement: number
  avgErrorsAtHighLoad: number
  recoveryTimeAfterOverload: number
  calibrationAccuracy: number
  observationCount: number
}

interface FirestoreTimestamp {
  toDate(): Date
}

export const COGNITIVE_LOAD_COLLECTIONS = {
  PROFILES: 'cognitiveLoadProfiles',
  SESSIONS: 'cognitiveLoadSessions'
}

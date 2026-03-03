/**
 * Misconception System Types
 * 
 * Types for:
 * - Misconception taxonomy
 * - Error clustering and detection
 * - Student misconception fingerprinting
 * - Remediation recommendations
 */

// ============================================================================
// Misconception Taxonomy
// ============================================================================

export type MisconceptionCategory =
  | 'arithmetic'
  | 'algebra'
  | 'fractions'
  | 'decimals'
  | 'geometry'
  | 'word-problems'
  | 'reading-comprehension'
  | 'vocabulary'
  | 'grammar'
  | 'latin-declension'
  | 'latin-conjugation'
  | 'greek-alphabet'
  | 'greek-grammar'
  | 'logic-fallacy'
  | 'logic-inference'

export type RemediationStrategy =
  | 'counter_example'     // Show a case that disproves the misconception
  | 'conceptual_change'   // Rebuild understanding from first principles
  | 'analogy'             // Use familiar concept to explain
  | 'procedural_drill'    // Practice correct procedure repeatedly
  | 'worked_example'      // Show step-by-step correct solution
  | 'self_explanation'    // Have student explain their thinking

export interface Misconception {
  id: string
  name: string
  description: string
  
  // Classification
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  category: MisconceptionCategory
  severity: 'minor' | 'moderate' | 'major' | 'fundamental'
  
  // Prevalence (learned from data)
  prevalence: number      // 0-1, how common this is
  gradeRangeStart: number // Typically appears at this grade
  gradeRangeEnd: number   // Typically resolved by this grade
  
  // Detection
  detectionRules: MisconceptionDetectionRules
  
  // Remediation
  remediation: MisconceptionRemediation
  
  // Metadata
  source: 'expert' | 'clustering' | 'llm' | 'research'
  confidence: number      // Confidence in this misconception definition
  lastUpdated: Date
  sampleSize: number      // How many students informed this
}

export interface MisconceptionDetectionRules {
  // Error pattern matching
  errorPatterns: ErrorPattern[]
  
  // Problem context where this appears
  problemTypes: string[]
  difficultyRange: [number, number]
  requiredSkills: string[]
  
  // Detection thresholds
  minOccurrences: number  // Need to see error X times
  minConfidence: number   // Minimum match confidence
  
  // Distinguishing from similar misconceptions
  notIfPatterns?: ErrorPattern[]  // Exclude if these match
  cooccursWith?: string[]         // Often appears with these misconceptions
}

export interface ErrorPattern {
  type: 'regex' | 'feature' | 'semantic' | 'numeric'
  
  // For regex patterns
  pattern?: string
  
  // For feature-based detection
  features?: Partial<ErrorFeatures>
  
  // For numeric comparison
  numericRule?: {
    type: 'off_by' | 'sign_flip' | 'order_of_magnitude' | 'ratio'
    value?: number
    tolerance?: number
  }
  
  // Weight of this pattern in detection
  weight: number
}

export interface ErrorFeatures {
  // Numeric errors
  offByOne: boolean
  offByTen: boolean
  signError: boolean
  decimalPlaceError: boolean
  
  // Operation errors
  operationSwap: boolean
  orderOfOperationsError: boolean
  
  // Algebraic errors
  distributionError: boolean
  combiningUnlikeTerms: boolean
  exponentError: boolean
  
  // Fraction errors
  addedNumeratorsAndDenominators: boolean
  didNotFindCommonDenominator: boolean
  invertedWrongFraction: boolean
  
  // Reading/Language errors
  synonymUsed: boolean
  antonymUsed: boolean
  homophoneError: boolean
  
  // Spelling/typo errors
  spellingError: boolean
  grammarError: boolean
  
  // Latin/Greek specific
  wrongDeclension: boolean
  wrongConjugation: boolean
  wrongCase: boolean
  wrongTense: boolean
  wrongVoice: boolean
}

export interface MisconceptionRemediation {
  strategy: RemediationStrategy
  
  // Explanation to show student
  briefExplanation: string
  detailedExplanation: string
  
  // Counter-example (if applicable)
  counterExample?: {
    setup: string
    wrongApproach: string
    correctApproach: string
  }
  
  // Problem recommendations
  warmupProblems: string[]     // Easier problems to rebuild foundation
  practiceProblems: string[]   // Problems targeting this misconception
  challengeProblems: string[]  // Problems to confirm resolution
  
  // Estimated remediation
  estimatedProblems: number    // Problems needed to remediate
  estimatedTimeMinutes: number
}

// ============================================================================
// Student Misconception Profile
// ============================================================================

export interface MisconceptionFingerprint {
  misconceptionId: string
  misconceptionName: string
  
  // Status
  status: 'suspected' | 'confirmed' | 'remediating' | 'resolved'
  severity: 'minor' | 'moderate' | 'major' | 'fundamental'
  
  // Evidence
  firstDetected: Date
  lastObserved: Date
  occurrenceCount: number
  confidence: number          // 0-1 confidence in this detection
  evidence: MisconceptionEvidence[]
  
  // Remediation tracking
  remediationStarted?: Date
  remediationProblemsAttempted: number
  remediationProblemsCorrect: number
  resolvedAt?: Date
}

export interface MisconceptionEvidence {
  problemId: string
  timestamp: Date
  studentAnswer: string
  correctAnswer: string
  matchedPatterns: string[]
  matchScore: number
}

export interface UserMisconceptionProfile {
  userId: string
  lastUpdated: Date
  
  // Current misconceptions
  activeMisconceptions: MisconceptionFingerprint[]
  
  // Historical misconceptions (resolved)
  resolvedMisconceptions: MisconceptionFingerprint[]
  
  // Aggregate stats
  stats: {
    totalMisconceptionsDetected: number
    totalMisconceptionsResolved: number
    avgRemediationTime: number
    mostCommonCategory: MisconceptionCategory
  }
}

// ============================================================================
// Detection Results
// ============================================================================

export interface MisconceptionDetectionResult {
  detected: boolean
  misconceptions: DetectedMisconception[]
  suggestedRemediation?: RemediationRecommendation
}

export interface DetectedMisconception {
  misconception: Misconception
  confidence: number
  matchedPatterns: string[]
  evidence: MisconceptionEvidence
}

export interface RemediationRecommendation {
  // What to do next
  action: 'hint' | 'explanation' | 'easier_problem' | 'worked_example' | 'continue'
  
  // Content for the action
  content?: string
  problemId?: string
  
  // Reasoning
  reason: string
  targetMisconceptions: string[]
}

// ============================================================================
// Firestore Document Types
// ============================================================================

export interface MisconceptionProfileDoc {
  userId: string
  lastUpdated: Date
  activeMisconceptions: MisconceptionFingerprint[]
  resolvedMisconceptions: MisconceptionFingerprint[]
  stats: UserMisconceptionProfile['stats']
}

export interface ErrorRecordDoc {
  userId: string
  problemId: string
  timestamp: Date
  
  // Problem context
  subject: string
  problemType: string
  difficulty: number
  skills: string[]
  
  // Error details
  studentAnswer: string
  correctAnswer: string
  errorFeatures: Partial<ErrorFeatures>
  
  // Detection results
  detectedMisconceptions: string[]  // Misconception IDs
  detectionConfidences: number[]
}

// ============================================================================
// Collection Constants
// ============================================================================

export const MISCONCEPTION_COLLECTIONS = {
  TAXONOMY: 'misconceptionTaxonomy',
  USER_PROFILES: 'userMisconceptions',
  ERROR_RECORDS: 'errorRecords',
  CLUSTER_ANALYSIS: 'misconceptionClusters', // For ML clustering results
} as const

export const MISCONCEPTION_CONFIG = {
  MIN_OCCURRENCES_FOR_CONFIRMED: 3,
  MIN_CONFIDENCE_FOR_SUSPECTED: 0.5,
  MIN_CONFIDENCE_FOR_CONFIRMED: 0.7,
  MAX_EVIDENCE_PER_MISCONCEPTION: 10,
  REMEDIATION_SUCCESS_THRESHOLD: 0.8,  // 80% correct to consider resolved
  REMEDIATION_MIN_PROBLEMS: 5,
} as const

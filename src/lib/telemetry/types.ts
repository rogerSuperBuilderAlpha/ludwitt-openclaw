/**
 * Telemetry System Types
 * 
 * Core types for collecting and analyzing student interaction data.
 * This is the foundation for:
 * - Struggle detection
 * - Cognitive load estimation
 * - Personalized modeling
 * - Misconception detection
 */

// ============================================================================
// Raw Event Types
// ============================================================================

export type InteractionEventType =
  | 'keystroke'
  | 'cursor_move'
  | 'focus_change'
  | 'scroll'
  | 'revision'
  | 'pause_start'
  | 'pause_end'
  | 'submit_attempt'
  | 'hint_request'
  | 'hint_view'
  | 'skip'
  | 'answer_change'
  | 'formula_edit'
  | 'dictionary_lookup'

export interface InteractionEvent {
  type: InteractionEventType
  timestamp: number  // Milliseconds since session start
  data: Record<string, unknown>
}

export interface KeystrokeEvent extends InteractionEvent {
  type: 'keystroke'
  data: {
    keyType: 'char' | 'backspace' | 'delete' | 'enter' | 'tab' | 'arrow' | 'other'
    // Note: We don't store actual keys for privacy
  }
}

export interface RevisionEvent extends InteractionEvent {
  type: 'revision'
  data: {
    changeType: 'insert' | 'delete' | 'replace'
    charCount: number
    position: 'start' | 'middle' | 'end'
  }
}

export interface PauseEvent extends InteractionEvent {
  type: 'pause_start' | 'pause_end'
  data: {
    duration?: number  // Only on pause_end
  }
}

export interface AnswerChangeEvent extends InteractionEvent {
  type: 'answer_change'
  data: {
    answerLength: number
    changeFromPrevious: number  // Edit distance
    containsNumber: boolean
    containsVariable: boolean
    containsOperator: boolean
  }
}

// ============================================================================
// Session Telemetry
// ============================================================================

export interface SessionTelemetry {
  sessionId: string
  userId: string
  problemId: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic' | 'writing'
  difficulty: number
  skills: string[]
  
  // Timing
  startTime: Date
  endTime?: Date
  
  // Raw events (stored temporarily, aggregated for long-term)
  events: InteractionEvent[]
  
  // Aggregated signals (computed from events)
  signals: SessionSignals
  
  // Outcome (filled after submission)
  outcome?: SessionOutcome
}

export interface SessionSignals {
  // Time-based
  totalTimeMs: number
  activeTimeMs: number      // Excluding pauses > 3s
  firstKeystrokeMs: number  // Time to first keystroke
  timeToFirstAttemptMs: number
  
  // Activity-based
  keystrokeCount: number
  keystrokeRate: number     // Per minute of active time
  
  // Revision-based
  revisionCount: number
  deletionCount: number
  deletionRatio: number     // deletions / total keystrokes
  majorRevisions: number    // Revisions > 3 chars
  
  // Pause-based
  pauseCount: number
  avgPauseLengthMs: number
  maxPauseLengthMs: number
  pausePattern: number[]    // Sequence of pause durations
  
  // Engagement-based
  focusLossCount: number
  scrollCount: number
  scrollDepth: number       // 0-1, how far they scrolled
  hintRequests: number
  hintViews: number
  
  // Answer evolution
  answerChanges: number
  finalAnswerLength: number
}

export interface SessionOutcome {
  correct: boolean
  finalAnswer: string
  attemptCount: number
  timeToCorrectMs?: number  // Only if eventually correct
  skipped: boolean
  
  // Error analysis (if incorrect)
  errorFeatures?: ErrorFeatures
}

// ============================================================================
// Error Features (for misconception detection)
// ============================================================================

export interface ErrorFeatures {
  // Numeric errors
  offByOne: boolean
  offByTen: boolean
  signError: boolean
  decimalPlaceError: boolean
  
  // Operation errors
  operationSwap: boolean    // e.g., + instead of -
  orderOfOperationsError: boolean
  
  // Algebraic errors
  distributionError: boolean
  combiningUnlikeTerms: boolean
  
  // Fraction errors
  addedNumeratorsAndDenominators: boolean
  
  // Partial correctness
  partiallyCorrect: boolean
  partialMatchScore: number  // 0-1
  
  // For text answers
  synonymUsed: boolean
  spellingError: boolean
  grammarError: boolean
}

// ============================================================================
// Aggregated User Profile
// ============================================================================

export interface TelemetryProfile {
  userId: string
  lastUpdated: Date
  
  // Session counts
  totalSessions: number
  sessionsBySubject: Record<string, number>
  
  // Rolling averages (last 50 sessions)
  rollingStats: {
    avgTimePerProblem: number
    avgActiveRatio: number
    avgRevisionRate: number
    avgPauseLength: number
    avgKeystrokeRate: number
  }
  
  // Patterns (learned over time)
  patterns: {
    typicalPauseLengths: number[]
    typicalFirstKeystrokeTime: number
    revisionPatterns: RevisionPattern[]
  }
  
  // Computed metrics
  metrics: {
    quickCorrectRate: number     // Fast + correct %
    slowIncorrectRate: number    // Slow + incorrect %
    revisionLeadsToCorrect: number
    hintEffectiveness: number    // Hints that lead to correct
  }
}

export interface RevisionPattern {
  description: string
  frequency: number
  associatedWithCorrect: boolean
}

// ============================================================================
// Firestore Document Types
// ============================================================================

export interface TelemetrySessionDoc {
  sessionId: string
  userId: string
  problemId: string
  subject: string
  difficulty: number
  skills: string[]
  startTime: Date
  endTime: Date
  signals: SessionSignals
  outcome: SessionOutcome
  // Raw events stored separately for privacy/size
  eventsRef?: string
}

export interface TelemetryProfileDoc {
  userId: string
  lastUpdated: Date
  totalSessions: number
  sessionsBySubject: Record<string, number>
  rollingStats: TelemetryProfile['rollingStats']
  patterns: TelemetryProfile['patterns']
  metrics: TelemetryProfile['metrics']
}

// ============================================================================
// Collection Constants
// ============================================================================

export const TELEMETRY_COLLECTIONS = {
  SESSIONS: 'telemetrySessions',
  PROFILES: 'telemetryProfiles',
  RAW_EVENTS: 'telemetryRawEvents', // Separate for size management
} as const

export const TELEMETRY_CONFIG = {
  PAUSE_THRESHOLD_MS: 3000,       // 3 seconds = pause
  ROLLING_WINDOW_SIZE: 50,        // Last 50 sessions for rolling stats
  MIN_SESSIONS_FOR_PATTERNS: 10,  // Need 10+ sessions to detect patterns
  EVENT_BATCH_SIZE: 100,          // Send events in batches
  MAX_EVENTS_PER_SESSION: 1000,   // Cap for performance
} as const

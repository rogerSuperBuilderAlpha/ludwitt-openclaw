/**
 * Enhanced Type Definitions for Evidence-Based Learning Systems
 * 
 * Extends the existing basics types with support for:
 * - Spaced repetition
 * - Cognitive diagnostics
 * - Scaffolding systems
 * - Interleaving algorithms
 * - Metacognitive support
 */

import { Timestamp } from 'firebase-admin/firestore'
import { MathProblem, ReadingExercise, UserBasicsProgress, SubjectProgress, MathAttempt, ReadingAttempt } from './basics'

// ============================================================================
// Enhanced Problem Types with Skill Tagging
// ============================================================================

export interface EnhancedMathProblem extends MathProblem {
  requiredSkills: string[]        // Skills needed to solve this problem
  cognitiveLoad: {
    intrinsic: number            // Inherent complexity (1-5)
    extraneous: number           // Unnecessary complexity to minimize (1-5)
  }
  scaffoldingLevel: 'worked-example' | 'completion' | 'guided' | 'independent'
  prerequisites?: string[]        // Skills that should be mastered first
  transferTasks?: string[]       // Related problem types for practice
}

export interface EnhancedReadingExercise extends ReadingExercise {
  requiredSkills: string[]        // Reading skills targeted
  cognitiveLoad: {
    intrinsic: number
    extraneous: number
  }
  scaffoldingLevel: 'worked-example' | 'completion' | 'guided' | 'independent'
  comprehensionStrategies?: string[] // Strategies that help with this text
  textComplexity?: {
    syntactic: number            // Sentence complexity (1-5)
    semantic: number             // Vocabulary difficulty (1-5)
    discourse: number            // Text structure complexity (1-5)
  }
}

// ============================================================================
// Spaced Repetition Types
// ============================================================================

export interface SpacedItem {
  problemId: string
  lastSeen: Date
  easinessFactor: number          // 1.3-2.5, adjusted by performance
  interval: number                // days until next review
  consecutiveCorrect: number
  totalReviews: number
  lastPerformance: number         // 0-1 accuracy score
  skillTags: string[]             // Associated skills for this problem
  createdAt: Date
  updatedAt: Date
}

export interface SpacingScheduler {
  userId: string
  mathItems: Map<string, SpacedItem>
  readingItems: Map<string, SpacedItem>
  lastUpdated: Date
}

// ============================================================================
// Cognitive Diagnostic Types
// ============================================================================

export interface SkillMasteryState {
  skillId: string
  masteryProbability: number      // 0-1, Bayesian estimate of mastery
  lastAssessed: Date
  totalAttempts: number
  correctAttempts: number
  recentAttempts: Array<{
    correct: boolean
    problemId: string
    timestamp: Date
    timeSpent: number
  }>
  // BKT parameters
  pLearn: number                  // P(T) - probability of learning
  pSlip: number                   // P(S) - slip rate
  pGuess: number                  // P(G) - guess rate
  pInit: number                   // P(L0) - initial knowledge
  createdAt: Date
  updatedAt: Date
}

export interface StudentCognitiveProfile {
  userId: string
  mathSkills: Map<string, SkillMasteryState>
  readingSkills: Map<string, SkillMasteryState>
  lastUpdated: Date
  // Global learning characteristics
  learningRate: number            // How quickly student typically learns (0-1)
  persistenceLevel: number        // How well student handles difficult problems (0-1)
  metacognitiveLevel: number      // Self-awareness of learning (0-1)
}

// ============================================================================
// Scaffolding Types
// ============================================================================

export enum SupportLevel {
  WORKED_EXAMPLE = 0,      // Full solution with explanations
  COMPLETION_PROBLEM = 1,   // Partial solution, student completes
  GUIDED_PROBLEM = 2,       // Hints available on demand
  INDEPENDENT = 3           // No support
}

export interface WorkedExampleStep {
  step: string
  explanation: string
  selfExplanationPrompt: string
  commonMisconception: string
  visualAid?: string
}

export interface WorkedExample {
  problemId: string
  originalProblem: string
  steps: WorkedExampleStep[]
  keyPrinciples: string[]
  transferTasks: string[]
}

export interface CompletionProblem {
  problemId: string
  originalProblem: string
  partialSolution: string
  blanks: Array<{
    id: string
    correctAnswer: string
    hint: string
    commonErrors: string[]
  }>
  scaffoldingHints: string[]
}

export interface GuidedProblem {
  problemId: string
  originalProblem: string
  availableHints: Array<{
    level: number
    content: string
    whenToShow: 'on-request' | 'after-error' | 'after-time'
  }>
  strategySuggestions: string[]
  selfCheckQuestions: string[]
}

export interface ScaffoldingRecommendation {
  supportLevel: SupportLevel
  reasoning: string
  adaptations: string[]
  nextSteps: string
}

// ============================================================================
// Metacognitive Support Types
// ============================================================================

export interface MetacognitivePrompt {
  id: string
  phase: 'pre-activity' | 'during-activity' | 'post-activity'
  prompt: string
  purpose: string
  expectedResponse: string
  followUpQuestions?: string[]
  adaptiveConditions?: string[]
}

export interface ReciprocalTeachingActivity {
  activityType: 'questioning' | 'summarizing' | 'clarifying' | 'predicting'
  prompt: string
  scaffolds: string[]
  modelResponse?: string
  evaluationCriteria: string[]
}

export interface MetacognitiveSession {
  userId: string
  problemId: string
  subject: 'math' | 'reading'
  preActivityResponses: Record<string, string>
  duringActivityActions: Array<{
    timestamp: Date
    action: string
    response?: string
  }>
  postActivityReflection: Record<string, string>
  strategiesUsed: string[]
  selfAssessment: {
    difficultyRating: number
    confidenceLevel: number
    strategyEffectiveness: Record<string, number>
    wouldDoAgain: string[]
  }
  metacognitiveGrowth: {
    planningQuality: number
    monitoringFrequency: number
    reflectionDepth: number
  }
}

// ============================================================================
// Enhanced Problem Selection Types
// ============================================================================

export interface ProblemSelectionContext {
  targetDifficulty: number
  masteredSkills: string[]
  strugglingSkills: string[]
  recentProblemTypes: string[]
  spacedRepetitionDue: string[]
  cognitiveLoad: number
}

export interface InterleavingParameters {
  newMaterialRatio: number
  spacedReviewRatio: number
  strugglingSkillsRatio: number
  discriminationFocus: boolean
  maxConsecutiveSameType: number
}

export interface InterleavedProblemSet {
  problems: (EnhancedMathProblem | EnhancedReadingExercise)[]
  rationale: string
  expectedBenefits: string[]
  cognitiveLoadEstimate: number
  interleavingPattern: string
}

export interface EnhancedProblemRequest {
  userId: string
  subject: 'math' | 'reading'
  requestedCount: number
  currentProgress: UserBasicsProgress
  cognitiveProfile?: StudentCognitiveProfile
  spacingScheduler?: SpacingScheduler
  sessionGoals?: string[]
  timeConstraints?: number
  preferredCognitiveLoad?: number
}

export interface EnhancedProblemSelection {
  problems: (EnhancedMathProblem | EnhancedReadingExercise)[]
  scaffoldingRecommendations: Map<string, ScaffoldingRecommendation>
  learningRationale: string
  expectedOutcomes: string[]
  sessionPlan: {
    estimatedTime: number
    cognitiveLoadProgression: number[]
    scaffoldingProgression: SupportLevel[]
    skillFocus: string[]
  }
  adaptiveParameters: {
    nextSessionAdjustments: string[]
    performanceThresholds: {
      advanceDifficulty: number
      maintainLevel: number
      providMoreScaffolding: number
    }
  }
}

// ============================================================================
// Analytics and Research Types
// ============================================================================

export interface LearningAnalytics {
  userId: string
  sessionId: string
  timestamp: Date
  subject: 'math' | 'reading'
  
  // Problem details
  problemId: string
  problemType: string
  difficulty: number
  requiredSkills: string[]
  
  // Performance data
  correct: boolean
  timeSpent: number
  hintsUsed: number
  errorsBeforeSuccess: number
  
  // Cognitive data
  supportLevel: SupportLevel
  strategiesUsed: string[]
  metacognitiveResponses: Record<string, string>
  
  // Affective data
  frustrationIndicators: number
  engagementLevel: number
  confidenceRating: number
  
  // Context data
  sessionLength: number
  problemsInSession: number
  cognitiveLoadLevel: number
}

export interface AffectiveStateIndicators {
  responseLatency: number[]
  helpSeekingPatterns: {
    frequency: number
    timing: 'early' | 'after-attempt' | 'never'
  }
  persistenceMetrics: {
    problemsAttempted: number
    problemsAbandoned: number
    sessionDuration: number
    breaksFrequency: number
  }
  errorPatterns: {
    carelessErrors: number
    systematicErrors: number
    guessing: number
  }
}

export interface EquityMetrics {
  demographics: {
    race_ethnicity?: string[]
    freeReducedLunch?: boolean
    englishLearner?: boolean
    specialEducation?: boolean
    giftedTalented?: boolean
  }
  outcomes: {
    averageGrowth: number
    masteryRate: number
    engagementTime: number
    frustrationIndicators: number
  }
  gapAnalysis: {
    comparisonGroup: string
    effectSizeDifference: number
    statisticalSignificance: number
  }
}

// ============================================================================
// Enhanced Progress Tracking
// ============================================================================

export interface EnhancedSubjectProgress extends SubjectProgress {
  // Skill-based tracking
  skillMastery: Map<string, number>        // skillId -> mastery probability
  skillProgress: Map<string, {
    lastPracticed: Date
    consecutiveCorrect: number
    totalAttempts: number
  }>
  
  // Spaced repetition tracking
  spacedItems: Map<string, SpacedItem>
  nextReviewDue: Date
  
  // Scaffolding history
  scaffoldingUsage: Map<SupportLevel, number>
  scaffoldingEffectiveness: Map<SupportLevel, number>
  
  // Metacognitive development
  metacognitiveLevel: number
  strategyUsage: Map<string, number>
  selfRegulationSkills: number
}

export interface EnhancedUserProgress {
  userId: string
  
  math: EnhancedSubjectProgress & {
    recentAttempts: (MathAttempt & { 
      skillsTargeted: string[]
      supportLevel: SupportLevel
      strategiesUsed: string[]
    })[]
  }
  
  reading: EnhancedSubjectProgress & {
    recentAttempts: (ReadingAttempt & {
      skillsTargeted: string[]
      supportLevel: SupportLevel
      strategiesUsed: string[]
    })[]
  }
  
  // Overall learning characteristics
  learningProfile: {
    learningRate: number
    persistenceLevel: number
    metacognitiveLevel: number
    preferredCognitiveLoad: number
    optimalInterleavingLevel: number
  }
  
  // Research participation
  researchConsent: boolean
  studyGroup?: string
  interventionHistory: Array<{
    interventionType: string
    startDate: Date
    endDate?: Date
    effectiveness: number
  }>
  
  // Standard fields
  dailyStreak: number
  lastActiveDate: string
  totalXP: number
  dailyXP: number
  dailyGoal: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ============================================================================
// Teacher Dashboard Types
// ============================================================================

export interface StudentDiagnosticReport {
  studentId: string
  studentName: string
  subject: 'math' | 'reading'
  
  overallMastery: number
  skillBreakdown: Array<{
    skillId: string
    skillName: string
    masteryLevel: 'struggling' | 'developing' | 'proficient' | 'mastered'
    probability: number
    attempts: number
    recommendation: string
  }>
  
  focusAreas: string[]
  strengths: string[]
  suggestedInterventions: string[]
  
  learningTrajectory: Array<{
    date: Date
    skill: string
    masteryLevel: number
  }>
}

export interface ClassAnalytics {
  classId: string
  className: string
  teacherId: string
  
  overallPerformance: {
    averageMastery: number
    studentsAtGradeLevel: number
    studentsAboveGradeLevel: number
    studentsNeedingSupport: number
  }
  
  skillHeatmap: Map<string, {
    skillName: string
    classAverage: number
    studentsStruggling: string[]
    studentsExcelling: string[]
  }>
  
  engagementMetrics: {
    averageSessionLength: number
    dailyActiveUsers: number
    completionRate: number
    frustrationRate: number
  }
  
  recommendedGroupings: Array<{
    groupType: 'skill-based' | 'mixed-ability' | 'peer-tutoring'
    students: string[]
    focusArea: string
    suggestedActivities: string[]
  }>
}

// ============================================================================
// Accessibility and Equity Types
// ============================================================================

export interface AccessibilityFeatures {
  screenReaderCompatible: boolean
  keyboardNavigable: boolean
  highContrast: boolean
  adjustableTextSize: boolean
  audioSupport: boolean
  visualAids: boolean
  languageSupport: string[]
  cognitiveSupports: string[]
}

export interface LocalizedContent {
  problemId: string
  language: string
  culturalContext: string
  translationQuality: 'human' | 'ai-reviewed' | 'ai-generated'
  culturallyResponsive: boolean
}

// ============================================================================
// Research and Validation Types
// ============================================================================

export interface ResearchMetrics {
  studyId: string
  participantId: string
  condition: string
  
  preTestScores: Record<string, number>
  postTestScores: Record<string, number>
  retentionScores: Record<string, number>
  transferScores: Record<string, number>
  
  usageMetrics: {
    totalTimeSpent: number
    sessionsCompleted: number
    problemsAttempted: number
    hintsUsed: number
  }
  
  learningGains: {
    skill: string
    preScore: number
    postScore: number
    effectSize: number
    statisticalSignificance: number
  }[]
}

export interface ImplementationFidelity {
  teacherId: string
  schoolId: string
  
  platformUsage: {
    recommendedMinutes: number
    actualMinutes: number
    consistencyScore: number
  }
  
  featureAdoption: {
    spacedRepetition: boolean
    scaffolding: boolean
    metacognitivePrompts: boolean
    diagnosticReports: boolean
  }
  
  teacherSupport: {
    trainingCompleted: boolean
    ongoingSupport: boolean
    implementationQuality: number
  }
}

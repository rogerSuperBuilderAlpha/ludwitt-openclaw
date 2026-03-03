/**
 * Type definitions for Basics Dashboard
 * Adaptive K-12 learning platform
 * 
 * This file re-exports all types from domain-specific files for backwards compatibility.
 * Import directly from specific files for better tree-shaking.
 */

// ============================================================================
// Math Types
// ============================================================================
export type {
  MathProblemType,
  DiagramType,
  DiagramElement,
  MathDiagram,
  MathProblem,
  MathProblemCache,
  GeneratedMathProblem,
} from './math'

// ============================================================================
// Reading Types
// ============================================================================
export type {
  ReadingExerciseType,
  ReadingQuestionType,
  ReadingQuestion,
  ReadingExercise,
  ReadingExerciseCache,
  GeneratedReadingExercise,
  ReadingAloudScoringResult,
  ReadingAloudAttempt,
} from './reading'

// ============================================================================
// Progress & Achievement Types
// ============================================================================
export type {
  Attempt,
  MathAttempt,
  ReadingAttempt,
  SubjectProgress,
  UserBasicsProgress,
  SubjectProgressDisplay,
  Achievement,
  ValidationResult,
  ReadingValidationResult,
} from './progress'

// ============================================================================
// API Types
// ============================================================================
export type {
  GetCurrentProblemsResponse,
  CheckAnswerRequest,
  CheckAnswerResponse,
  GenerateProblemRequest,
  GenerateProblemResponse,
  SkipProblemRequest,
  SkipProblemResponse,
  GetProgressResponse,
  FeedbackData,
  BasicsState,
} from './api'

// ============================================================================
// Classical Language Translation Types
// ============================================================================
export type {
  ClassicalLanguage,
  TranslationWord,
  ParsingElement,
  TranslationExercise,
  TranslationFeedback,
  WordLookupSession,
  HistoricalContextResponse,
  ClassicalLanguageProgress,
  TranslationAttempt,
  SavedVocabularyWord,
  ClassicalGrammarReference,
} from './translation'

// ============================================================================
// Reference & Help Types
// ============================================================================
export type {
  Formula,
  WorkedExample,
  ReferenceSection,
  ReferenceUnit,
  UserUnlockedContent,
  ProblemHelpHistory,
  WorkEvaluation,
} from './reference'

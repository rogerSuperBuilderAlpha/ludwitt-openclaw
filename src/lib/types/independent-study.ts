/**
 * Independent Study Type Definitions
 * 
 * Types for the Independent Study feature - AI-guided exploration of any topic
 * unlocked after mastering the core curriculum (Grade 12 Math, Reading, Logic).
 * 
 * The Independent Study follows a pipeline:
 * 1. Discovery - AI learns what the student wants to study
 * 2. Learning - Structured curriculum with lessons and exercises
 * 3. Building - Student creates a project demonstrating mastery
 * 4. AI Review - AI agent evaluates the project
 * 5. Professional Review - Real expert signs off on the project
 */

import { Timestamp } from 'firebase-admin/firestore'

// ============================================================================
// Phase Types
// ============================================================================

export type StudyPhase = 
  | 'discovery'           // AI is learning about user's interests
  | 'curriculum_preview'  // Showing generated curriculum for confirmation
  | 'learning'           // Working through curriculum units
  | 'building'           // Creating the project
  | 'ai_review'          // AI agent reviewing the project
  | 'professional_review' // Awaiting professional sign-off
  | 'completed'          // Course finished

export type StudyStatus = 'active' | 'completed' | 'archived'

// ============================================================================
// Discovery Phase Types
// ============================================================================

export interface DiscoveryMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  metadata?: {
    isReadyToGenerate?: boolean  // AI signals it has enough info
  }
}

export interface DiscoveryState {
  messages: DiscoveryMessage[]
  initialTopic: string
  isComplete: boolean
  readyToGenerate: boolean
  topicSummary?: string          // AI's understanding of what user wants
  learningObjectives?: string[]  // Extracted objectives from conversation
}

// ============================================================================
// Curriculum Types
// ============================================================================

export interface CurriculumLesson {
  id: string
  title: string
  description: string
  objectives: string[]
  estimatedMinutes: number
  completedAt?: string
  xpEarned?: number
}

export interface CurriculumUnit {
  id: string
  title: string
  description: string
  lessons: CurriculumLesson[]
  estimatedHours: number
  completedAt?: string
  xpEarned?: number
}

export interface Curriculum {
  title: string
  description: string
  units: CurriculumUnit[]
  estimatedTotalHours: number
  projectRequirement: {
    title: string
    description: string
    deliverables: string[]
    assessmentCriteria: string[]
  }
}

export interface CoursePrompt {
  topic: string
  scope: string
  masteryDefinition: string
  curriculum: Curriculum
  tutorGuidelines: string        // Instructions for AI tutor
  projectGuidelines: string      // Instructions for project evaluation
  generatedAt: string
}

// ============================================================================
// Project Types
// ============================================================================

export interface ProjectMilestone {
  id: string
  title: string
  description: string
  isRequired: boolean
  completedAt?: string
  evidence?: string              // URL or description of evidence
}

export interface ProjectDefinition {
  title: string
  description: string
  repositoryUrl?: string
  liveUrl?: string
  milestones: ProjectMilestone[]
  startedAt?: string
  submittedAt?: string
  notes?: string
}

// ============================================================================
// Review Types
// ============================================================================

export interface AIReview {
  id: string
  submittedAt: string
  completedAt?: string
  status: 'pending' | 'passed' | 'needs_revision'
  overallScore?: number          // 0-100
  feedback?: string
  strengths?: string[]
  improvements?: string[]
  criteriaResults?: {
    criterion: string
    met: boolean
    feedback: string
  }[]
}

export interface ProfessionalReview {
  professionalName: string
  professionalTitle: string
  professionalOrganization?: string
  professionalEmail?: string
  professionalLinkedIn?: string
  howConnected?: string          // How user found this professional
  feedback?: string
  proofUrl?: string              // Image/document of sign-off (Firebase Storage)
  proofType?: 'email' | 'signed_document' | 'linkedin_message' | 'video' | 'other'
  submittedAt?: string
  verifiedAt?: string
  status: 'pending' | 'approved' | 'needs_revision' | 'rejected'
  verificationNotes?: string     // Admin/AI notes on verification
}

// ============================================================================
// Main Independent Study Interface
// ============================================================================

export interface IndependentStudy {
  id: string                     // "study_{userId}_{timestamp}"
  userId: string
  
  // Phase & Status
  phase: StudyPhase
  status: StudyStatus
  
  // Discovery Phase Data
  discovery: DiscoveryState
  
  // Generated Course Data
  coursePrompt?: CoursePrompt
  
  // Learning Progress
  currentUnitIndex: number
  currentLessonIndex: number
  
  // Project
  project?: ProjectDefinition
  
  // Reviews
  aiReview?: AIReview
  professionalReview?: ProfessionalReview
  
  // Stats
  totalXP: number
  totalMessages: number
  totalProblemsCompleted: number
  totalSessionsCompleted: number
  
  // Timestamps
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
  completedAt?: Timestamp | string
}

export interface IndependentStudyDisplay extends Omit<IndependentStudy, 'createdAt' | 'updatedAt' | 'completedAt'> {
  createdAt: string
  updatedAt: string
  completedAt?: string
  // Computed display helpers
  title: string                  // Derived from coursePrompt or discovery.initialTopic
  description: string            // Derived from coursePrompt or discovery summary
  progressPercent: number        // Overall progress through curriculum
}

// ============================================================================
// Session & Message Types (for learning phase)
// ============================================================================

export interface EmbeddedProblem {
  id: string
  question: string
  type: 'multiple-choice' | 'free-response' | 'true-false'
  options?: string[]  // Options from AI are parsed as strings like "A) First option"
  userAnswer?: string
  isCorrect?: boolean
  feedback?: string
  xpEarned?: number
}

export interface StudyMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Timestamp | string
  unitId?: string                // Which unit this message belongs to
  lessonId?: string              // Which lesson this message belongs to
  embeddedProblem?: EmbeddedProblem
}

export interface StudyMessageDisplay extends Omit<StudyMessage, 'timestamp'> {
  timestamp: string
}

export interface StudySession {
  id: string
  studyId: string
  unitId?: string
  lessonId?: string
  startedAt: Timestamp | string
  endedAt?: Timestamp | string
  messages: StudyMessage[]
  xpEarned: number
  problemsCompleted: number
  isActive: boolean
}

export interface StudySessionDisplay extends Omit<StudySession, 'startedAt' | 'endedAt' | 'messages'> {
  startedAt: string
  endedAt?: string
  messages: StudyMessageDisplay[]
}

// ============================================================================
// Unlock Status Types
// ============================================================================

export interface IndependentStudyUnlockStatus {
  isUnlocked: boolean
  isLoading: boolean
  
  // Individual prereq status
  mathGrade: number
  mathRequired: number  // 12
  mathMet: boolean
  
  readingGrade: number
  readingRequired: number  // 12
  readingMet: boolean
  
  logicMasteryPercent: number
  logicMasteredUnits: number
  logicTotalUnits: number
  logicRequired: number  // 80 (percent)
  logicMet: boolean
  
  // For progress display
  overallProgress: number  // 0-100
  missingPrereqs: Array<'math' | 'reading' | 'logic'>
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface CreateStudyRequest {
  initialTopic: string
}

export interface CreateStudyResponse {
  success: boolean
  study?: IndependentStudyDisplay
  error?: string
}

export interface DiscoveryChatRequest {
  studyId: string
  message: string
}

export interface DiscoveryChatResponse {
  success: boolean
  message?: DiscoveryMessage
  isReadyToGenerate?: boolean
  error?: string
}

export interface GenerateCurriculumRequest {
  studyId: string
}

export interface GenerateCurriculumResponse {
  success: boolean
  coursePrompt?: CoursePrompt
  error?: string
}

export interface ListStudiesResponse {
  success: boolean
  studies: IndependentStudyDisplay[]
  error?: string
}

export interface SendMessageRequest {
  studyId: string
  sessionId?: string
  unitId?: string
  lessonId?: string
  message: string
  answerToProblem?: {
    problemId: string
    answer: string
  }
}

export interface SendMessageResponse {
  success: boolean
  message?: StudyMessageDisplay
  xpEarned?: number
  error?: string
}

export interface UpdateProjectRequest {
  studyId: string
  project: Partial<ProjectDefinition>
}

export interface UpdateProjectResponse {
  success: boolean
  project?: ProjectDefinition
  error?: string
}

export interface SubmitForAIReviewRequest {
  studyId: string
}

export interface SubmitForAIReviewResponse {
  success: boolean
  review?: AIReview
  error?: string
}

export interface SubmitProfessionalReviewRequest {
  studyId: string
  review: Omit<ProfessionalReview, 'status' | 'submittedAt' | 'verifiedAt' | 'verificationNotes'>
}

export interface SubmitProfessionalReviewResponse {
  success: boolean
  review?: ProfessionalReview
  error?: string
}

// ============================================================================
// XP Values
// ============================================================================

export const INDEPENDENT_STUDY_XP = {
  PROBLEM_ATTEMPT: 5,        // XP for attempting a practice problem
  PROBLEM_CORRECT: 10,       // XP for answering correctly
  LESSON_COMPLETE: 25,       // XP for completing a lesson
  UNIT_COMPLETE: 100,        // XP for completing a unit
  PROJECT_MILESTONE: 50,     // XP per milestone completed
  AI_REVIEW_PASS: 200,       // XP for passing AI review
  PROFESSIONAL_SIGN_OFF: 500, // XP for completing the course
} as const

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Compute display-friendly version of an IndependentStudy
 */
export function toStudyDisplay(study: IndependentStudy): IndependentStudyDisplay {
  // Compute title from course prompt or discovery
  const title = study.coursePrompt?.curriculum.title || 
                study.discovery.topicSummary || 
                study.discovery.initialTopic || 
                'Untitled Study'
  
  // Compute description
  const description = study.coursePrompt?.curriculum.description ||
                      study.discovery.topicSummary ||
                      `Exploring: ${study.discovery.initialTopic}`
  
  // Compute progress
  let progressPercent = 0
  if (study.coursePrompt && study.phase !== 'discovery' && study.phase !== 'curriculum_preview') {
    const totalLessons = study.coursePrompt.curriculum.units.reduce(
      (sum, unit) => sum + unit.lessons.length, 0
    )
    const completedLessons = study.coursePrompt.curriculum.units.reduce(
      (sum, unit) => sum + unit.lessons.filter(l => l.completedAt).length, 0
    )
    progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  }
  
  // Convert timestamps
  const toISOString = (ts: Timestamp | string | undefined): string => {
    if (!ts) return new Date().toISOString()
    if (typeof ts === 'string') return ts
    return (ts as Timestamp).toDate?.()?.toISOString() || new Date().toISOString()
  }
  
  return {
    ...study,
    title,
    description,
    progressPercent,
    createdAt: toISOString(study.createdAt),
    updatedAt: toISOString(study.updatedAt),
    completedAt: study.completedAt ? toISOString(study.completedAt) : undefined,
  }
}

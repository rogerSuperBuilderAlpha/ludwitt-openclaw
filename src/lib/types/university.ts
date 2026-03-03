/**
 * University Course System Type Definitions
 *
 * Types for the University feature — students pick academic topics,
 * the system designs deliverables they must build to demonstrate understanding.
 * Each course has 5 deliverables reviewed by human professional experts.
 */

import { Timestamp } from 'firebase-admin/firestore'

// ============================================================================
// Status & Enum Types
// ============================================================================

export type LearningPathStatus = 'generating' | 'active' | 'completed'

export type CourseStatus = 'locked' | 'available' | 'in-progress' | 'completed'

export type DeliverableStatus =
  | 'locked'
  | 'available'
  | 'in-progress'
  | 'submitted'
  | 'in-review'
  | 'revision-needed'
  | 'approved'
  | 'failed'

export type DeliverableType =
  | 'application'
  | 'simulation'
  | 'data-visualization'
  | 'research-tool'
  | 'interactive-content'

// ============================================================================
// Core Data Types
// ============================================================================

export interface CourseDeliverable {
  id: string
  title: string
  description: string
  type: DeliverableType
  requirements: string[]
  order: number
  status: DeliverableStatus
  deployedUrl?: string
  githubUrl?: string
  loomUrl?: string
  submissionNotes?: string
  submittedAt?: string
  reviewedBy?: string
  reviewFeedback?: string
  reviewedAt?: string
  xpEarned?: number
  selfDeadline?: string
  deadlineMissed?: boolean
  aiReview?: AIReviewFeedback
}

export interface UniversityCourse {
  id: string
  userId: string
  learningPathId: string
  title: string
  description: string
  subject: string
  topic: string
  level: number
  order: number
  prerequisites: string[]
  deliverables: CourseDeliverable[]
  status: CourseStatus
  professors?: string[]
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
  completedAt?: Timestamp | string
}

export interface UniversityLearningPath {
  id: string
  userId: string
  targetTopic: string
  targetDescription?: string
  courses: string[]
  status: LearningPathStatus
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
  completedAt?: Timestamp | string
  isPublished?: boolean
  publishedAt?: string
  creatorName?: string
  creatorAnonymous?: boolean
  sourcePathId?: string
  subjects?: string[]
  profession?: string
  tags?: string[]
  levelRange?: { min: number; max: number }
}

export interface CompletedCourseRecord {
  courseId: string
  topic: string
  subject: string
  completedAt: string
}

export interface UniversityStudentProfile {
  userId: string
  completedCourses: CompletedCourseRecord[]
  activeLearningPathId?: string
  totalXP: number
  enrolledAt: Timestamp | string
  updatedAt: Timestamp | string
}

// ============================================================================
// Published / Browse Types
// ============================================================================

export interface PublishedPathProfessor {
  id: string
  name: string
}

export interface PublishedPathSummary {
  id: string
  targetTopic: string
  targetDescription?: string
  creatorName: string
  creatorAnonymous?: boolean
  courseCount: number
  courseTitles: string[]
  publishedAt: string
  subjects: string[]
  profession?: string
  tags: string[]
  levelRange?: { min: number; max: number }
  professors: PublishedPathProfessor[]
  isOwner: boolean
}

// ============================================================================
// Professor Profile Types
// ============================================================================

export interface ProfessorDegree {
  degree: string
  field: string
  institution: string
  year?: number
}

export interface ProfessorCertification {
  name: string
  issuer: string
  year?: number
}

export interface ProfessorSubjectGrade {
  subject: string
  gradeLevels: string[]
}

export interface ProfessorPublication {
  title: string
  journal?: string
  year?: number
  url?: string
}

export interface ProfessorSocialLinks {
  website?: string
  linkedin?: string
  github?: string
  googleScholar?: string
  twitter?: string
  youtube?: string
  orcid?: string
}

export type ProfessorAvailability = 'accepting' | 'limited' | 'unavailable'

export interface ProfessorProfile {
  professorId: string
  displayName: string
  title?: string
  bio?: string
  specialties: string[]
  email: string
  updatedAt: string
  // Identity
  photoURL?: string
  headline?: string
  teachingPhilosophy?: string
  whyITeach?: string
  // Credentials
  degrees?: ProfessorDegree[]
  certifications?: ProfessorCertification[]
  // Affiliation
  institution?: string
  position?: string
  department?: string
  yearsTeaching?: number
  // Teaching
  subjectsWithGrades?: ProfessorSubjectGrade[]
  languages?: string[]
  // Location & Availability
  location?: string
  timezone?: string
  availability?: ProfessorAvailability
  officeHours?: string
  // Social
  socialLinks?: ProfessorSocialLinks
  // Publications
  publications?: ProfessorPublication[]
  // Office hours booking slots
  timeSlots?: ProfessorTimeSlot[]
}

export interface ProfessorListItem {
  professorId: string
  displayName: string
  title?: string
  bio?: string
  specialties: string[]
  pathTopics: string[]
  headline?: string
  photoURL?: string
  institution?: string
  position?: string
  availability?: ProfessorAvailability
}

export interface ProfessorPublicProfile {
  professorId: string
  displayName: string
  title?: string
  bio?: string
  specialties: string[]
  photoURL?: string
  headline?: string
  teachingPhilosophy?: string
  whyITeach?: string
  degrees?: ProfessorDegree[]
  certifications?: ProfessorCertification[]
  institution?: string
  position?: string
  department?: string
  yearsTeaching?: number
  subjectsWithGrades?: ProfessorSubjectGrade[]
  languages?: string[]
  location?: string
  timezone?: string
  availability?: ProfessorAvailability
  officeHours?: string
  socialLinks?: ProfessorSocialLinks
  publications?: ProfessorPublication[]
  timeSlots?: ProfessorTimeSlot[]
  pathTopics: string[]
  stats: {
    pathsCreated: number
    totalStudents: number
    deliverablesReviewed: number
    memberSince: string
    lastActive: string
    avgReviewTurnaroundHours?: number
  }
}

// ============================================================================
// Professor Dashboard Types
// ============================================================================

export interface ProfessorStudentRow {
  userId: string
  displayName: string
  email: string
  joinedAt: string
  completedCourses: number
  totalCourses: number
  progressPercent: number
}

export type AssignmentScope = 'global' | 'specific'

export interface ProfessorAssignment {
  id: string
  professorId: string
  professorName: string
  professorEmail: string
  sourcePathId: string
  courseOrder: number
  courseTitle: string
  scope: AssignmentScope
  studentIds: string[]
  createdAt: string
}

export interface ProfessorPathCourse {
  order: number
  title: string
  subject: string
  level: number
}

export interface ResolvedCourseProfessor {
  courseOrder: number
  professors: { name: string; email: string }[]
}

export interface ProfessorPathSummary {
  id: string
  targetTopic: string
  targetDescription?: string
  status: LearningPathStatus
  isPublished: boolean
  createdAt: string
  totalCourses: number
  courses: ProfessorPathCourse[]
  creator: ProfessorStudentRow
  students: ProfessorStudentRow[]
  totalEnrolled: number
}

export interface ProfessorSubmissionRow {
  courseId: string
  deliverableId: string
  deliverableTitle: string
  deliverableType: DeliverableType
  courseTitle: string
  courseOrder: number
  pathTopic: string
  studentId: string
  studentName: string
  studentEmail: string
  submittedAt: string
  deployedUrl?: string
  githubUrl?: string
  loomUrl?: string
  submissionNotes?: string
  status: DeliverableStatus
}

export interface IdeaComment {
  id: string
  ideaId: string
  ideaCollection: 'business' | 'thesis'
  authorId: string
  authorName: string
  authorEmail: string
  text: string
  createdAt: string
}

export interface DeliverableComment {
  id: string
  courseId: string
  deliverableId: string
  authorId: string
  authorName: string
  authorEmail: string
  text: string
  createdAt: string
}

export type ReviewVerdict = 'approved' | 'revision-needed' | 'failed'

export interface ProfessorDocument {
  id: string
  professorId: string
  professorName: string
  professorEmail: string
  sourcePathId: string
  title: string
  url: string
  description?: string
  scope: AssignmentScope
  studentIds: string[]
  createdAt: string
}

// ============================================================================
// Activity Stats Types
// ============================================================================

export interface DeliverableStats {
  order: number
  activeCount: number
  completedCount: number
}

export interface CourseStats {
  order: number
  activeCount: number
  completedCount: number
  deliverables: DeliverableStats[]
}

export interface PathActivityStats {
  totalStudents: number
  courses: CourseStats[]
}

// ============================================================================
// Display Types (Computed fields for UI)
// ============================================================================

export interface UniversityCourseDisplay extends Omit<UniversityCourse, 'createdAt' | 'updatedAt' | 'completedAt'> {
  createdAt: string
  updatedAt: string
  completedAt?: string
  progressPercent: number
  approvedCount: number
  totalDeliverables: number
}

export interface UniversityLearningPathDisplay extends Omit<UniversityLearningPath, 'createdAt' | 'updatedAt' | 'completedAt'> {
  createdAt: string
  updatedAt: string
  completedAt?: string
  progressPercent: number
  completedCourseCount: number
  totalCourseCount: number
  professors?: string[]
  isPublished?: boolean
  publishedAt?: string
  creatorName?: string
  creatorAnonymous?: boolean
  sourcePathId?: string
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface CreateLearningPathRequest {
  targetTopic: string
  targetDescription?: string
}

export interface CreateLearningPathResponse {
  learningPath: UniversityLearningPathDisplay
  courses: UniversityCourseDisplay[]
  costCharged: number
  newBalance: number
}

export interface StudentProfileResponse {
  profile: UniversityStudentProfile
}

export interface LearningPathResponse {
  learningPath: UniversityLearningPathDisplay
  courses: UniversityCourseDisplay[]
}

export interface CoursesResponse {
  courses: UniversityCourseDisplay[]
}

export interface JoinLearningPathResponse {
  learningPath: UniversityLearningPathDisplay
  courses: UniversityCourseDisplay[]
}

// ============================================================================
// AI Generation Types (used in generate-learning-path.ts)
// ============================================================================

export interface AIPathCourse {
  title: string
  subject: string
  topic: string
  level: number
  description: string
}

export interface AIDeliverable {
  title: string
  description: string
  type: DeliverableType
  requirements: string[]
}

// ============================================================================
// Idea Types (Business Ideas & Thesis Ideas)
// ============================================================================

export type IdeaStatus = 'draft' | 'submitted'

export interface IdeaDocument {
  title: string
  url: string | null
}

export const BUSINESS_IDEA_DOCUMENTS = [
  'Executive Summary',
  'Problem & Solution',
  'TAM Analysis',
  'Ideal Customer Profile',
  'Revenue Model',
  'Competitive Landscape',
] as const

export const THESIS_IDEA_DOCUMENTS = [
  'Abstract',
  'Research Questions',
  'Literature Review Plan',
  'Methodology',
  'Expected Contributions',
] as const

export interface UniversityBusinessIdea {
  id: string
  userId: string
  concept: string
  description?: string
  documents: IdeaDocument[]
  status: IdeaStatus
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
}

export interface UniversityThesisIdea {
  id: string
  userId: string
  topic: string
  description?: string
  documents: IdeaDocument[]
  status: IdeaStatus
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
}

// Display variants (timestamps resolved to strings)
export interface UniversityBusinessIdeaDisplay extends Omit<UniversityBusinessIdea, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}

export interface UniversityThesisIdeaDisplay extends Omit<UniversityThesisIdea, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}

// API Request/Response types
export interface CreateBusinessIdeaRequest {
  concept: string
  description?: string
}

export interface CreateBusinessIdeaResponse {
  idea: UniversityBusinessIdeaDisplay
}

export interface CreateThesisIdeaRequest {
  topic: string
  description?: string
}

export interface CreateThesisIdeaResponse {
  idea: UniversityThesisIdeaDisplay
}

export interface UpdateIdeaRequest {
  ideaId: string
  collection: 'business' | 'thesis'
  documents: IdeaDocument[]
  submit?: boolean
}

export interface UpdateIdeaResponse {
  idea: UniversityBusinessIdeaDisplay | UniversityThesisIdeaDisplay
}

// ============================================================================
// Office Hours Booking Types
// ============================================================================

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface ProfessorTimeSlot {
  id: string
  day: DayOfWeek
  startTime: string // HH:mm format
  endTime: string   // HH:mm format
  slotDurationMinutes: 15 | 30 | 45 | 60
}

export type BookingStatus = 'confirmed' | 'cancelled'

export interface OfficeHoursBooking {
  id: string
  professorId: string
  professorName: string
  studentId: string
  studentName: string
  studentEmail: string
  date: string // YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string   // HH:mm
  status: BookingStatus
  notes?: string
  cancelledBy?: string
  cancelledAt?: string
  createdAt: string
}

export interface AvailableSlot {
  date: string // YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string   // HH:mm
  dayOfWeek: DayOfWeek
}

// ============================================================================
// Schedule Types
// ============================================================================

export type ScheduleEventType = 'class-session' | 'office-hours-booked' | 'office-hours-available' | 'google-calendar'

export interface ScheduleEvent {
  id: string
  type: ScheduleEventType
  title: string
  date: string // YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string // HH:mm
  meta?: {
    professorId?: string
    professorName?: string
    bookingId?: string
    notes?: string
    googleEventId?: string
    location?: string
    isAllDay?: boolean
  }
}

export interface SaveTimeSlotsRequest {
  timeSlots: Omit<ProfessorTimeSlot, 'id'>[]
}

export interface BookSlotRequest {
  professorId: string
  date: string
  startTime: string
  endTime: string
  notes?: string
}

export interface CancelBookingRequest {
  bookingId: string
}

// ============================================================================
// Peer Review Types
// ============================================================================

export type PeerReviewStatus = 'pending' | 'completed' | 'endorsed'

export interface PeerReviewRubricScores {
  clarity: number       // 1-5
  completeness: number  // 1-5
  technicalQuality: number // 1-5
}

export interface PeerReview {
  id: string
  deliverableId: string
  courseId: string
  submitterId: string
  submitterName: string
  reviewerId: string
  reviewerName: string
  reviewerEmail: string
  rubricScores?: PeerReviewRubricScores
  feedback?: string
  status: PeerReviewStatus
  endorsedBy?: string
  endorsedAt?: string
  assignedAt: string
  completedAt?: string
  // Denormalized for display
  deliverableTitle?: string
  courseTitle?: string
  pathTopic?: string
}

export type PeerReviewBadgeType = 'peer-reviewer-bronze' | 'peer-reviewer-silver' | 'peer-reviewer-gold'

export interface PeerReviewBadge {
  id: string
  userId: string
  badgeType: PeerReviewBadgeType
  endorsedCount: number
  awardedAt: string
}

export interface SubmitPeerReviewRequest {
  reviewId: string
  rubricScores: PeerReviewRubricScores
  feedback: string
}

export interface EndorsePeerReviewRequest {
  reviewId: string
}

export const PEER_REVIEW_BADGE_THRESHOLDS: Record<PeerReviewBadgeType, number> = {
  'peer-reviewer-bronze': 3,
  'peer-reviewer-silver': 10,
  'peer-reviewer-gold': 25,
}

// ============================================================================
// Exploration Session Types
// ============================================================================

export type ExplorationStep = 'define-topic' | 'research-questions' | 'deep-dive' | 'synthesize' | 'export'

export type ExplorationStatus = 'in-progress' | 'completed'

export interface ExplorationResearchQuestion {
  question: string
  deepDive?: string
  keyFindings?: string[]
}

export interface ExplorationSession {
  id: string
  userId: string
  topic: string
  scope?: string
  currentStep: ExplorationStep
  researchQuestions: ExplorationResearchQuestion[]
  synthesis?: string
  recommendedNextSteps?: string[]
  references?: string[]
  status: ExplorationStatus
  totalCreditsUsed: number
  courseId?: string
  deliverableId?: string
  learningPathId?: string
  createdAt: string
  updatedAt: string
}

export interface StartExplorationRequest {
  topic: string
  scope?: string
  courseId?: string
  deliverableId?: string
  learningPathId?: string
}

export interface ExplorationStepRequest {
  sessionId: string
  step: ExplorationStep
  questionIndex?: number // For deep-dive step: which question to explore
}

// ============================================================================
// Submission History Types
// ============================================================================

export type SubmissionHistoryEventType =
  | 'started'
  | 'submitted'
  | 'resubmitted'
  | 'links_updated'
  | 'reviewed'
  | 'comment_added'
  | 'peer_review_submitted'
  | 'peer_review_endorsed'
  | 'deadline_set'
  | 'deadline_updated'

export interface SubmissionHistoryEvent {
  id: string
  courseId: string
  deliverableId: string
  eventType: SubmissionHistoryEventType
  actorId: string
  actorName: string
  actorRole: 'student' | 'professor' | 'peer'
  description: string
  metadata?: Record<string, unknown>
  createdAt: string
}

// ============================================================================
// Course Announcement Types
// ============================================================================

export interface CourseAnnouncement {
  id: string
  professorId: string
  professorName: string
  sourcePathId: string
  title: string
  body: string
  createdAt: string
}

// ============================================================================
// XP Constants
// ============================================================================

export const UNIVERSITY_XP = {
  DELIVERABLE_APPROVED: 100,
  COURSE_COMPLETED: 500,
  PATH_COMPLETED: 2000,
  PEER_REVIEW_SUBMITTED: 25,
  PEER_REVIEW_ENDORSED: 50,
  PEER_REVIEW_BADGE: 200,
  CONTRIBUTION_BADGE: 200,
} as const

// ============================================================================
// Contribution Types
// ============================================================================

export type ContributionBadgeType = 'contributor-bronze' | 'contributor-silver' | 'contributor-gold'

export interface ContributionBadge {
  id: string
  userId: string
  badgeType: ContributionBadgeType
  mergedCount: number
  awardedAt: string
}

export const CONTRIBUTION_BADGE_THRESHOLDS: Record<ContributionBadgeType, number> = {
  'contributor-bronze': 1,
  'contributor-silver': 5,
  'contributor-gold': 15,
}

export interface ContributionPR {
  id: string
  userId: string
  prNumber: number
  title: string
  state: 'open' | 'closed'
  merged: boolean
  htmlUrl: string
  createdAt: string
  updatedAt: string
  closedAt: string | null
  mergedAt: string | null
}

// ============================================================================
// Feature 1: AI Deliverable Pre-Review Types
// ============================================================================

export interface AIReviewFeedback {
  summary: string
  strengths: string[]
  improvements: string[]
  rubricEstimate: {
    clarity: number       // 1-5
    completeness: number  // 1-5
    technicalQuality: number // 1-5
  }
  meetsRequirements: boolean
  generatedAt: string
}

// ============================================================================
// Feature 2: Course Discussion Thread Types
// ============================================================================

export interface DiscussionThread {
  id: string
  courseId: string
  deliverableId?: string
  learningPathId: string
  authorId: string
  authorName: string
  title: string
  body: string
  isPinned: boolean
  isAccepted: boolean
  upvotes: string[] // user IDs
  replyCount: number
  lastActivityAt: string
  createdAt: string
}

export interface DiscussionReply {
  id: string
  threadId: string
  authorId: string
  authorName: string
  body: string
  isAccepted: boolean
  upvotes: string[] // user IDs
  createdAt: string
}

export interface CreateThreadRequest {
  courseId: string
  deliverableId?: string
  learningPathId: string
  title: string
  body: string
}

export interface CreateReplyRequest {
  threadId: string
  body: string
}

// ============================================================================
// Feature 3: AI Teaching Assistant Chat Types
// ============================================================================

export interface AssistantMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AssistantChatRequest {
  message: string
  courseId?: string
  deliverableId?: string
  learningPathId?: string
  conversationHistory: AssistantMessage[]
}

// ============================================================================
// Feature 4: Learning Analytics Types
// ============================================================================

export interface StudentAnalytics {
  completionTrends: { deliverableId: string; title: string; daysToComplete: number }[]
  subjectStrengths: { subject: string; avgScore: number; count: number }[]
  streakData: { currentStreak: number; longestStreak: number; lastActiveDate: string }
  estimatedCompletionDate?: string
  totalDeliverables: number
  approvedDeliverables: number
  avgReviewScore: number
}

export interface ProfessorAnalytics {
  submissionPatterns: { date: string; count: number }[]
  avgReviewTurnaround: number
  atRiskStudents: { userId: string; name: string; reason: string; daysSinceActive: number }[]
  deliverableDifficulty: { deliverableTitle: string; revisionRate: number; avgAttempts: number }[]
  peerReviewQuality: { avgScore: number; distribution: Record<number, number> }
}

// ============================================================================
// Feature 5: Professional Portfolio Types
// ============================================================================

export interface PortfolioSettings {
  isPublic: boolean
  username: string
  headline?: string
  bio?: string
  showPeerReviews: boolean
  showSkills: boolean
  showDegreeProgress: boolean
  customOrder?: string[] // deliverable IDs in display order
}

export interface PortfolioProject {
  deliverableId: string
  courseId: string
  title: string
  description: string
  type: DeliverableType
  deployedUrl?: string
  githubUrl?: string
  loomUrl?: string
  skills: string[]
  approvedAt: string
  professorEndorsement?: string
  peerReviewAvgScore?: number
}

export interface PublicPortfolio {
  userId: string
  displayName: string
  settings: PortfolioSettings
  projects: PortfolioProject[]
  skills: { name: string; level: 'beginner' | 'intermediate' | 'advanced' | 'expert' }[]
  degreeProgress: { completedPaths: number; totalXP: number; yearLevel: number }
}

// ============================================================================
// Feature 6: Skill Competency Graph Types
// ============================================================================

export type SkillStatus = 'mastered' | 'in-progress' | 'recommended' | 'locked'

export interface SkillNode {
  id: string
  name: string
  category: string
  status: SkillStatus
  level: number // 1-5
  deliverableIds: string[] // deliverables that contribute to this skill
  prerequisites: string[] // skill IDs
}

export interface SkillCategory {
  id: string
  name: string
  color: string
  skills: SkillNode[]
}

export interface SkillMapping {
  deliverableId: string
  courseId: string
  skills: string[] // skill names
}

// ============================================================================
// Feature 7: Smart Path Recommendations Types
// ============================================================================

export interface PathRecommendation {
  pathId: string
  targetTopic: string
  reason: string
  matchScore: number // 0-100
  skillsGained: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface RecommendationsResponse {
  recommendations: PathRecommendation[]
  basedOn: {
    completedPaths: number
    topSkills: string[]
    profession?: string
  }
}

// ============================================================================
// Feature 8: Live Study Room Types
// ============================================================================

export interface StudyRoom {
  id: string
  learningPathId: string
  name: string
  roomUrl: string
  participants: StudyRoomParticipant[]
  isActive: boolean
  createdAt: string
  lastActiveAt: string
}

export interface StudyRoomParticipant {
  userId: string
  displayName: string
  joinedAt: string
  role: 'student' | 'professor'
}

export interface StudySession {
  id: string
  studyRoomId: string
  learningPathId: string
  title: string
  description?: string
  scheduledAt: string
  durationMinutes: number
  hostId: string
  hostName: string
  attendees: string[]
  createdAt: string
}

// ============================================================================
// Feature 9: Verifiable Digital Credentials Types
// ============================================================================

export type CredentialType = 'path-completion' | 'year-milestone' | 'skill-certification' | 'degree'

export interface DigitalCredential {
  id: string
  userId: string
  userName: string
  type: CredentialType
  title: string
  description: string
  issuedAt: string
  skills: string[]
  evidence: CredentialEvidence[]
  professorSignatures: { professorId: string; professorName: string; signedAt: string }[]
  verificationUrl: string
  metadata: {
    pathId?: string
    pathTopic?: string
    yearLevel?: number
    totalXP?: number
  }
}

export interface CredentialEvidence {
  type: 'deliverable' | 'review' | 'peer-feedback'
  title: string
  url?: string
  date: string
}

// ============================================================================
// Feature 10: Integrated Code Sandbox Types
// ============================================================================

export type SandboxLanguage = 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'react'

export interface SandboxTemplate {
  id: string
  courseId: string
  deliverableId: string
  professorId: string
  title: string
  language: SandboxLanguage
  files: SandboxFile[]
  instructions?: string
  createdAt: string
}

export interface SandboxFile {
  name: string
  content: string
  language: SandboxLanguage
}

export interface SandboxSubmission {
  id: string
  userId: string
  deliverableId: string
  courseId: string
  files: SandboxFile[]
  createdAt: string
}

export interface CodeReviewComment {
  id: string
  sandboxSubmissionId: string
  authorId: string
  authorName: string
  fileName: string
  lineNumber: number
  body: string
  createdAt: string
}

// ============================================================================
// Helper Functions
// ============================================================================

function toISOString(ts: Timestamp | string | undefined): string {
  if (!ts) return new Date().toISOString()
  if (typeof ts === 'string') return ts
  return (ts as Timestamp).toDate?.()?.toISOString() || new Date().toISOString()
}

export function toCourseDisplay(course: UniversityCourse): UniversityCourseDisplay {
  const approvedCount = course.deliverables.filter(d => d.status === 'approved').length
  const totalDeliverables = course.deliverables.length

  return {
    ...course,
    createdAt: toISOString(course.createdAt),
    updatedAt: toISOString(course.updatedAt),
    completedAt: course.completedAt ? toISOString(course.completedAt) : undefined,
    progressPercent: totalDeliverables > 0 ? Math.round((approvedCount / totalDeliverables) * 100) : 0,
    approvedCount,
    totalDeliverables,
  }
}

export function toIdeaDisplay(
  idea: UniversityBusinessIdea | UniversityThesisIdea
): UniversityBusinessIdeaDisplay | UniversityThesisIdeaDisplay {
  return {
    ...idea,
    createdAt: toISOString(idea.createdAt),
    updatedAt: toISOString(idea.updatedAt),
  }
}

export function toPathDisplay(
  path: UniversityLearningPath,
  courses: UniversityCourse[]
): UniversityLearningPathDisplay {
  const completedCourseCount = courses.filter(c => c.status === 'completed').length
  const totalCourseCount = courses.length

  return {
    ...path,
    createdAt: toISOString(path.createdAt),
    updatedAt: toISOString(path.updatedAt),
    completedAt: path.completedAt ? toISOString(path.completedAt) : undefined,
    progressPercent: totalCourseCount > 0 ? Math.round((completedCourseCount / totalCourseCount) * 100) : 0,
    completedCourseCount,
    totalCourseCount,
    professors: [...new Set(courses.flatMap(c => c.professors || []))],
  }
}

/**
 * Near Peer Tutor Types
 * 
 * Data models for the peer tutoring feature where students
 * can request help and offer credits to more advanced peers.
 */

// Tutor's offer to help a student
export interface TutorOffer {
  tutorId: string
  tutorDisplayName: string
  tutorGrade: number
  tutorAvatarUrl?: string
  message: string
  offeredAt: string
}

// Help request posted by a student
export interface TutorRequest {
  id: string
  studentId: string
  studentDisplayName: string
  studentAvatarUrl?: string
  studentGrade: number
  subject: 'math'
  description: string
  creditsOffered: number
  status: 'open' | 'pending' | 'active' | 'completed' | 'cancelled' | 'expired'
  potentialTutors: TutorOffer[]
  selectedTutorId?: string
  sessionId?: string
  createdAt: string
  expiresAt: string
}

// Active tutoring session
export interface TutorSession {
  id: string
  requestId: string
  studentId: string
  studentDisplayName: string
  tutorId: string
  tutorDisplayName: string
  creditsAmount: number
  subject: 'math'
  startedAt: string
  endsAt: string
  status: 'active' | 'ended' | 'rated_by_student' | 'rated_by_tutor' | 'completed'
  studentRating?: number
  tutorRating?: number
}

// Chat message (ephemeral - deleted after session)
export interface TutorMessage {
  id: string
  sessionId: string
  senderId: string
  senderName: string
  content: string
  createdAt: string
}

// Rating submitted after a session
export interface TutorRating {
  id: string
  sessionId: string
  raterId: string
  ratedUserId: string
  ratedRole: 'student' | 'tutor'
  rating: 1 | 2 | 3 | 4 | 5
  createdAt: string
}

// User's tutor profile stats
export interface TutorProfile {
  userId: string
  totalSessionsAsTutor: number
  totalSessionsAsStudent: number
  averageRatingAsTutor: number
  averageRatingAsStudent: number
  totalCreditsEarned: number
  totalCreditsSpent: number
}

// Firestore collection names
export const TUTOR_COLLECTIONS = {
  REQUESTS: 'tutor_requests',
  SESSIONS: 'tutor_sessions',
  MESSAGES: 'tutor_messages',
  RATINGS: 'tutor_ratings',
  PROFILES: 'tutor_profiles',
} as const

// Constants
export const TUTOR_CONSTANTS = {
  SESSION_DURATION_MINUTES: 10,
  MAX_GRADE_DIFFERENCE: 3,
  MIN_CREDITS_OFFER: 10, // $0.10
  REQUEST_EXPIRY_HOURS: 1,
  MESSAGE_RETENTION_MINUTES: 5, // Delete messages 5 min after session ends
} as const


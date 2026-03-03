import type { FirestoreTimestamp } from '@/lib/types/timestamp'

export interface Requirement {
  id: string
  requirement: string
  status: string
  addedBy: string
  addedAt: FirestoreTimestamp
  notes?: string
}

export interface Session {
  id: string
  accomplishments: string
  sessionDate: FirestoreTimestamp
  addedBy: string
  nextSteps?: string
  timeSpentMinutes?: number
}

export interface Communication {
  id: string
  message: string
  sentBy: string
  sentByRole: 'customer' | 'developer' | 'admin'
  sentAt: FirestoreTimestamp
}

export interface SubmissionLike {
  id: string
  customerId: string
  googleDocTitle: string
  googleDocUrl: string
  approvedAt: FirestoreTimestamp
  status?: 'pending' | 'approved' | 'in-progress' | 'completed' | 'archived'
  category?: string
  assignedTo?: string
  assignedToName?: string
  progressPercentage?: number
  progressNote?: string
  progressUpdatedAt?: FirestoreTimestamp
  customer: { email: string; displayName: string }
  requirements: Requirement[]
  sessions: Session[]
  communications?: Communication[]
}

export type View = 'details' | 'progress' | 'category'

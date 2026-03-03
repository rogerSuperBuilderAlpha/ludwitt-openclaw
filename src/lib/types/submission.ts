import { FirestoreTimestamp } from './timestamp'

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

export interface Submission {
  id: string
  customerId: string
  projectId?: string
  projectTitle?: string
  googleDocTitle: string
  googleDocUrl: string
  approvedAt: FirestoreTimestamp
  status?: 'pending' | 'approved' | 'in-progress' | 'completed' | 'archived'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  category?: string
  assignedTo?: string
  assignedToName?: string
  progressPercentage?: number
  progressNote?: string
  progressUpdatedAt?: FirestoreTimestamp
  customer: {
    email: string
    displayName: string
    /** Credit balance in cents */
    creditBalance?: number
  }
  requirements: Requirement[]
  sessions: Session[]
  communications?: Communication[]

  // Additional developer dashboard fields
  dueDate?: FirestoreTimestamp
  customerDisplayName?: string
  completedAt?: FirestoreTimestamp
  actualCostCents?: number
}



import { Timestamp } from 'firebase/firestore'

export interface Customer {
  id: string
  email: string
  displayName: string
  createdAt: Timestamp
  updatedAt: Timestamp
  lastLoginAt: Timestamp
}

export interface CustomerDocument {
  id: string
  customerId: string
  googleDocId: string
  googleDocTitle: string
  googleDocUrl: string
  addedAt: Timestamp
  approvedAt?: Timestamp
  approvedBy: string
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'accepted'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  notificationSent: boolean
  notificationSentAt?: Timestamp
  notes?: string
  projectId?: string
  requirements?: ClientRequirement[]
  sessions?: DevelopmentSession[]
  communications?: DocumentCommunication[]

  // Budget tracking
  budgetType?: 'hours' | 'fixed' // Type of budget tracking
  budgetHours?: number // Total budgeted hours (for hourly projects)
  budgetAmount?: number // Total budget amount in dollars (for fixed price or calculated from hours * rate)
  hourlyRate?: number // Hourly rate for billing calculations
  actualHoursSpent?: number // Calculated from sessions (not stored, computed)
  actualAmountSpent?: number // Calculated from hours * rate (not stored, computed)
  budgetWarningThreshold?: number // Percentage (0-100) at which to warn, default 80

  // Nudge tracking
  lastNudgedAt?: string // ISO date string of last nudge
  nudgeCount?: number // Number of times customer has been nudged

  // Developer progress tracking (set by developer, visible to customer)
  progressPercentage?: number
  progressNote?: string
  progressUpdatedAt?: Timestamp
}

export interface CustomerNotification {
  id: string
  customerId: string
  documentId: string
  type: 'document_approved'
  recipient: string
  status: 'pending' | 'sent' | 'failed'
  sentAt?: Timestamp
  error?: string
  retryCount: number
}

// Developer-related types
export interface ClientRequirement {
  id: string
  documentId: string
  customerId: string
  requirement: string
  status: 'pending' | 'in-progress' | 'completed'
  addedBy: string // Developer email
  addedAt: Timestamp
  completedAt?: Timestamp
  completedBy?: string
  notes?: string

  // Customer approval workflow
  requiresCustomerApproval?: boolean // If true, customer must approve before marking complete
  customerApprovalStatus?: 'pending' | 'approved' | 'rejected'
  customerFeedback?: string
  approvedAt?: Timestamp
  approvedBy?: string
}

export interface DevelopmentSession {
  id: string
  documentId: string
  customerId: string
  accomplishments: string
  sessionDate: Timestamp
  addedBy: string // Developer email
  addedAt: Timestamp
  nextSteps?: string
  timeSpentMinutes?: number
  startTime?: Timestamp
  endTime?: Timestamp

  // Link sessions to specific requirements
  requirementIds?: string[] // Array of requirement IDs this session addresses
  requirements?: ClientRequirement[] // Populated requirement details (not stored, for UI)
}

export interface DocumentCommunication {
  id: string
  documentId: string
  customerId: string
  message: string
  sentBy: string // Email of sender
  sentByRole: 'customer' | 'developer' | 'admin'
  sentAt: Timestamp
  isInternal?: boolean // If true, only visible to developers
  readBy?: string[] // Array of user IDs who have read this message
}

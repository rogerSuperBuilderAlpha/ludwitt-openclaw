import { Timestamp } from 'firebase/firestore'

/**
 * Document History Types
 * Track changes to customer documents over time
 */

export type DocumentChangeType =
  | 'created'
  | 'status_changed'
  | 'priority_changed'
  | 'project_assigned'
  | 'project_changed'
  | 'notes_updated'
  | 'budget_updated'
  | 'approved'
  | 'completed'
  | 'archived'
  | 'owner_changed'

export type DocumentFieldValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined

export interface DocumentHistoryEntry {
  id: string
  documentId: string
  customerId: string
  changeType: DocumentChangeType
  changedBy: string // Email or user ID
  changedByRole: 'customer' | 'developer' | 'admin'
  timestamp: Timestamp

  // Changed fields
  changes: {
    field: string
    oldValue: DocumentFieldValue
    newValue: DocumentFieldValue
  }[]

  // Optional metadata
  metadata?: {
    reason?: string // Optional reason for the change
    note?: string // Optional note about the change
  }
}

export interface DocumentVersion {
  version: number
  timestamp: Timestamp
  snapshot: {
    status: string
    priority?: string
    projectId?: string
    notes?: string
    budgetType?: string
    budgetHours?: number
    budgetAmount?: number
    hourlyRate?: number
    budgetWarningThreshold?: number
  }
  changedBy: string
  changeType: DocumentChangeType
}

export interface DocumentHistorySummary {
  documentId: string
  totalChanges: number
  createdAt: Timestamp
  createdBy: string
  lastModifiedAt: Timestamp
  lastModifiedBy: string
  versions: DocumentVersion[]
  timeline: DocumentHistoryEntry[]
}

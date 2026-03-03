import { FirestoreTimestamp } from './timestamp'

export interface PendingDraft {
  id: string
  customerId: string
  projectId?: string
  projectTitle?: string | null
  googleDocTitle: string
  googleDocUrl: string
  addedAt: FirestoreTimestamp
  notes?: string
  lastNudgedAt?: string
  nudgeCount?: number
  customer: {
    email: string
    displayName: string
  }
}



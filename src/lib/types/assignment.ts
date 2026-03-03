import { Timestamp } from 'firebase/firestore'

/**
 * Assignment information added to documents and projects
 */
export interface AssignmentInfo {
  assignedDeveloperId?: string
  assignedDeveloperEmail?: string
  assignedDeveloperName?: string
  assignedBy: 'auto' | 'admin' | null
  assignedAt?: Timestamp
  assignedByUserId?: string
  assignedByUserEmail?: string
  submittedVia: 'general' | 'developer-specific'
  submittedViaDeveloperId?: string
  submittedViaDeveloperName?: string
  isVisibleToDeveloper: boolean
  assignmentHistory: AssignmentHistoryEntry[]
}

/**
 * Entry in assignment history array
 */
export interface AssignmentHistoryEntry {
  fromDeveloperId?: string
  toDeveloperId?: string
  changedBy: string
  changedAt: Timestamp
  reason?: string
}

/**
 * Request to assign work
 */
export interface AssignmentRequest {
  itemType: 'project' | 'document'
  itemId: string
  developerId: string | null
  reason?: string
}

/**
 * Response from assignment API
 */
export interface AssignmentResponse {
  success: boolean
  assignment: {
    itemType: string
    itemId: string
    previousDeveloperId?: string
    newDeveloperId?: string
    assignedAt: Timestamp
  }
}

/**
 * Parameters for getting assigned work
 */
export interface GetAssignedWorkParams {
  developerId: string
  status?: string
  limit?: number
  offset?: number
}

/**
 * Stats for assigned work
 */
export interface AssignedWorkStats {
  totalDocuments: number
  totalProjects: number
  activeDocuments: number
  activeProjects: number
  completedDocuments: number
  completedProjects: number
}


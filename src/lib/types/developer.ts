import { Timestamp } from 'firebase/firestore'

/**
 * Developer Profile
 * Stored in developerProfiles collection
 */
export interface DeveloperProfile {
  id: string
  userId: string
  email: string
  displayName: string
  isActive: boolean
  isVerified: boolean
  verifiedAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
  lastActiveAt?: Timestamp

  customPageSettings: DeveloperCustomPageSettings
  stats: DeveloperStats
  metadata: DeveloperMetadata
}

/**
 * Settings for developer's custom customer page
 */
export interface DeveloperCustomPageSettings {
  isEnabled: boolean
  showBio: boolean
  bio?: string
  showPhoto: boolean
  photoUrl?: string
  showCustomWelcome: boolean
  customWelcomeMessage?: string
  primaryColor?: string
  companyName?: string
  website?: string
}

/**
 * Developer statistics
 */
export interface DeveloperStats {
  totalAssignedProjects: number
  totalCompletedProjects: number
  totalActiveProjects: number
  totalAssignedDocuments: number
  totalCompletedDocuments: number
  totalActiveDocuments: number
  averageCompletionTimeHours?: number
  customerSatisfactionScore?: number
}

/**
 * Developer metadata
 */
export interface DeveloperMetadata {
  timezone?: string
  phoneNumber?: string
  availabilityStatus?: 'available' | 'busy' | 'away'
  specialties?: string[]
  maxActiveProjects?: number
}

/**
 * Developer Notification
 * Stored in developerNotifications collection
 */
export interface DeveloperNotification {
  id: string
  developerId: string
  type:
    | 'new_assignment'
    | 'reassignment'
    | 'customer_message'
    | 'project_update'
  title: string
  message: string
  relatedItemType: 'project' | 'document'
  relatedItemId: string
  isRead: boolean
  readAt?: Timestamp
  createdAt: Timestamp
  actionUrl?: string
  metadata?: Record<string, unknown>
}

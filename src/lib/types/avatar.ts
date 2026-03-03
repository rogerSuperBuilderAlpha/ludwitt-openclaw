/**
 * Avatar System Types
 * For student privacy and leaderboard participation
 */

export type AvatarType = 'photo' | 'generated' | 'character'

export interface UserAvatar {
  type: AvatarType
  // For 18+ with photos
  photoURL?: string
  displayName?: string
  
  // For under-18 with generated avatars
  characterId?: string // Pre-made avatar ID
  nickname?: string // Student's chosen nickname
  
  // Metadata
  createdAt: string
  isCompleted: boolean
}

export interface UserAgeVerification {
  birthDate?: string // ISO date string
  isOver18?: boolean // Calculated or self-reported
  verifiedAt?: string
}

// Pre-made avatar options for students
export interface AvatarCharacter {
  id: string
  name: string
  emoji: string
  description: string
  category: 'animal' | 'space' | 'nature' | 'tech' | 'sports' | 'creative'
  colorScheme: string
}

// User's complete leaderboard profile
export interface LeaderboardProfile {
  userId: string
  avatar: UserAvatar
  ageVerification: UserAgeVerification
  canShowOnLeaderboard: boolean // true if avatar is completed
  createdAt: string
  updatedAt: string
}


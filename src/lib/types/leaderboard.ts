/**
 * Leaderboard Types
 * For Basics Dashboard competitive rankings
 */

export type LeaderboardPeriod = 'day' | 'week' | 'month' | 'year' | 'all-time'

export interface LeaderboardEntry {
  userId: string
  displayName: string
  photoURL?: string
  characterId?: string // For under-18 users with avatars
  totalPoints: number
  problemsCorrect: number
  rank: number
  isCurrentUser?: boolean
  region?: string // User's region/country
}

export interface LeaderboardStats {
  period: LeaderboardPeriod
  startDate: string // ISO date string
  endDate: string // ISO date string
  totalEntries: number
  currentUserRank?: number
  currentUserEntry?: LeaderboardEntry
}

export interface GetLeaderboardRequest {
  period: LeaderboardPeriod
  limit?: number // Default 100
  region?: string // Filter by region
}

export interface GetLeaderboardResponse {
  success: boolean
  data?: {
    entries: LeaderboardEntry[]
    stats: LeaderboardStats
  }
  error?: string
}

// User stats for aggregation
export interface UserLeaderboardData {
  userId: string
  displayName: string
  photoURL?: string
  characterId?: string // For under-18 users with avatars
  region?: string // User's region/country
  totalPoints: number
  problemsCorrect: number
  lastUpdated: Date
}

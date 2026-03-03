/**
 * Daily Challenges - Type Definitions
 */

export interface DailyChallenge {
  id: string
  userId: string
  date: string // YYYY-MM-DD format
  challenges: Challenge[]
  completedChallenges: string[]
  totalXP: number
  status: 'incomplete' | 'partial' | 'complete'
  createdAt: string
}

export interface Challenge {
  id: string
  type: 'basics_math' | 'basics_reading' | 'alc_project' | 'profile' | 'social' | 'learning_time'
  title: string
  description: string
  target: number
  current: number
  xpReward: number
  icon: string
  completed: boolean
}

export type ChallengeType = Challenge['type']

export interface ChallengeTemplate {
  type: ChallengeType
  title: string
  description: string
  getTarget: (userLevel: number) => number
  xpReward: number
  icon: string
  requiredProgress?: {
    cursorSetupComplete?: boolean
    vercelDeploymentComplete?: boolean
  }
}


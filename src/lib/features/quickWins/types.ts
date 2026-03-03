/**
 * Quick Wins - Type Definitions
 */

export interface QuickWin {
  id: string
  userId: string
  type: 'problem_solved' | 'streak' | 'level_up' | 'project_complete' | 'helped_user' | 'skill_added' | 'achievement'
  title: string
  description: string
  xp: number
  icon: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface DailyWinsSummary {
  date: string
  wins: QuickWin[]
  totalXP: number
  totalWins: number
  topAchievement: QuickWin | null
}

export interface WeeklyWinsSummary {
  weekStart: string
  weekEnd: string
  dailySummaries: DailyWinsSummary[]
  totalXP: number
  totalWins: number
  improvements: string[]
  newSkills: string[]
  peopleHelped: number
  badges: string[]
}


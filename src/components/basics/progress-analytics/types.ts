/**
 * Shared Types for Progress Analytics
 */

import { SubjectProgressDisplay } from '@/lib/types/basics'
import { CurriculumData } from './data/curriculumTypes'

export interface ProgressAnalyticsProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  dailyXP: number
  dailyGoal: number
  userId?: string
}

export interface SubjectCardProps {
  name: string
  emoji: string
  grade: number
  progress: number
  questionsToNext: number
  totalCompleted: number
  accuracy?: number
  streak?: number
  xp: number
  curriculum: CurriculumData
  color: SubjectColor
  isLocked: boolean
}

export type SubjectColor = 'blue' | 'green' | 'amber' | 'purple' | 'indigo'

export interface ColorClasses {
  bg: string
  border: string
  badge: string
  bar: string
  light: string
}

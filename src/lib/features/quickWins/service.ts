/**
 * Quick Wins Service
 * Tracks and aggregates user accomplishments
 */

import { collection, query, where, getDocs, addDoc, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { QuickWin, DailyWinsSummary, WeeklyWinsSummary } from './types'
import { logger } from '@/lib/logger'

/**
 * Record a quick win for a user
 */
export async function recordQuickWin(win: Omit<QuickWin, 'id' | 'timestamp'>): Promise<void> {
  try {
    await addDoc(collection(db, 'quickWins'), {
      ...win,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Service', 'Error recording quick win', { error: error })
  }
}

/**
 * Get today's wins for a user
 */
export async function getTodaysWins(userId: string): Promise<QuickWin[]> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  try {
    const winsRef = collection(db, 'quickWins')
    const q = query(
      winsRef,
      where('userId', '==', userId),
      where('timestamp', '>=', today.toISOString()),
      orderBy('timestamp', 'desc')
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as QuickWin[]
  } catch (error) {
    logger.error('Service', 'Error getting todays wins', { error: error })
    return []
  }
}

/**
 * Get wins for a specific date range
 */
export async function getWinsInRange(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<QuickWin[]> {
  try {
    const winsRef = collection(db, 'quickWins')
    const q = query(
      winsRef,
      where('userId', '==', userId),
      where('timestamp', '>=', startDate.toISOString()),
      where('timestamp', '<=', endDate.toISOString()),
      orderBy('timestamp', 'desc')
    )
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as QuickWin[]
  } catch (error) {
    logger.error('Service', 'Error getting wins in range', { error: error })
    return []
  }
}

/**
 * Generate daily summary
 */
export function generateDailySummary(date: Date, wins: QuickWin[]): DailyWinsSummary {
  const dayWins = wins.filter(w => {
    const winDate = new Date(w.timestamp)
    return winDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
  })
  
  return {
    date: date.toISOString().split('T')[0],
    wins: dayWins,
    totalXP: dayWins.reduce((sum, w) => sum + w.xp, 0),
    totalWins: dayWins.length,
    topAchievement: dayWins.sort((a, b) => b.xp - a.xp)[0] || null,
  }
}

/**
 * Generate weekly summary
 */
export async function getWeeklySummary(userId: string): Promise<WeeklyWinsSummary> {
  const today = new Date()
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - 6)
  weekStart.setHours(0, 0, 0, 0)
  
  const weekEnd = new Date(today)
  weekEnd.setHours(23, 59, 59, 999)
  
  const wins = await getWinsInRange(userId, weekStart, weekEnd)
  
  // Generate daily summaries
  const dailySummaries: DailyWinsSummary[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    dailySummaries.push(generateDailySummary(date, wins))
  }
  
  // Extract insights
  const skillsWins = wins.filter(w => w.type === 'skill_added')
  const newSkills = skillsWins.map(w => w.metadata?.skillName || 'Unknown')
  
  const helpedWins = wins.filter(w => w.type === 'helped_user')
  const peopleHelped = helpedWins.length
  
  const levelUps = wins.filter(w => w.type === 'level_up')
  const improvements = levelUps.map(w => w.description)
  
  const badges = wins
    .filter(w => w.type === 'achievement')
    .map(w => w.title)
  
  return {
    weekStart: weekStart.toISOString().split('T')[0],
    weekEnd: weekEnd.toISOString().split('T')[0],
    dailySummaries,
    totalXP: wins.reduce((sum, w) => sum + w.xp, 0),
    totalWins: wins.length,
    improvements,
    newSkills,
    peopleHelped,
    badges,
  }
}

/**
 * Helper to record common wins
 */
export const QuickWinHelpers = {
  problemSolved: (userId: string, subject: 'math' | 'reading', difficulty: number) =>
    recordQuickWin({
      userId,
      type: 'problem_solved',
      title: `${subject === 'math' ? 'Math' : 'Reading'} Problem Solved`,
      description: `Solved a ${subject} problem at difficulty ${difficulty.toFixed(1)}`,
      xp: 10,
      icon: subject === 'math' ? '🔢' : '📚',
      metadata: { subject, difficulty },
    }),
    
  streakMaintained: (userId: string, days: number) =>
    recordQuickWin({
      userId,
      type: 'streak',
      title: `${days}-Day Streak!`,
      description: `Maintained your learning streak for ${days} consecutive days`,
      xp: days * 2,
      icon: '🔥',
      metadata: { days },
    }),
    
  levelUp: (userId: string, subject: string, newLevel: number) =>
    recordQuickWin({
      userId,
      type: 'level_up',
      title: 'Level Up!',
      description: `Advanced to ${subject} Grade ${newLevel}`,
      xp: 50,
      icon: '⬆️',
      metadata: { subject, newLevel },
    }),
    
  projectComplete: (userId: string, projectTitle: string) =>
    recordQuickWin({
      userId,
      type: 'project_complete',
      title: 'Project Completed!',
      description: `Completed "${projectTitle}"`,
      xp: 100,
      icon: '🎉',
      metadata: { projectTitle },
    }),
    
  helpedUser: (userId: string, helpedUserId: string) =>
    recordQuickWin({
      userId,
      type: 'helped_user',
      title: 'Helped a Peer',
      description: `Provided assistance to a cohort member`,
      xp: 20,
      icon: '🤝',
      metadata: { helpedUserId },
    }),
    
  skillAdded: (userId: string, skillName: string) =>
    recordQuickWin({
      userId,
      type: 'skill_added',
      title: 'New Skill!',
      description: `Added "${skillName}" to your profile`,
      xp: 15,
      icon: '⭐',
      metadata: { skillName },
    }),
}


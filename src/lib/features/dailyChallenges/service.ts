/**
 * Daily Challenges Service
 * Handles challenge generation and progress tracking
 */

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { DailyChallenge, Challenge } from './types'
import { generateDailyChallenges } from './templates'
import { logger } from '@/lib/logger'

/**
 * Get or create today's challenges for a user
 */
export async function getTodaysChallenges(
  userId: string,
  userLevel: number,
  cursorSetupComplete: boolean,
  vercelDeploymentComplete: boolean
): Promise<DailyChallenge> {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const challengeId = `${userId}_${today}`
  
  try {
    // Check if challenges already exist for today
    const challengeDoc = await getDoc(doc(db, 'dailyChallenges', challengeId))
    
    if (challengeDoc.exists()) {
      return challengeDoc.data() as DailyChallenge
    }
    
    // Generate new challenges for today
    const templates = generateDailyChallenges(userLevel, cursorSetupComplete, vercelDeploymentComplete)
    
    const challenges: Challenge[] = templates.map((template, index) => ({
      id: `challenge_${index + 1}`,
      type: template.type,
      title: template.title,
      description: template.description.replace('{target}', template.getTarget(userLevel).toString()),
      target: template.getTarget(userLevel),
      current: 0,
      xpReward: template.xpReward,
      icon: template.icon,
      completed: false,
    }))
    
    const dailyChallenge: DailyChallenge = {
      id: challengeId,
      userId,
      date: today,
      challenges,
      completedChallenges: [],
      totalXP: 0,
      status: 'incomplete',
      createdAt: new Date().toISOString(),
    }
    
    // Save to Firestore
    await setDoc(doc(db, 'dailyChallenges', challengeId), dailyChallenge)
    
    return dailyChallenge
  } catch (error) {
    logger.error('Service', 'Error getting daily challenges', { error: error })
    throw error
  }
}

/**
 * Update progress on a specific challenge
 */
export async function updateChallengeProgress(
  userId: string,
  challengeId: string,
  progress: number
): Promise<DailyChallenge> {
  const today = new Date().toISOString().split('T')[0]
  const docId = `${userId}_${today}`
  
  try {
    const challengeDoc = await getDoc(doc(db, 'dailyChallenges', docId))
    
    if (!challengeDoc.exists()) {
      throw new Error('Daily challenge not found')
    }
    
    const data = challengeDoc.data() as DailyChallenge
    const challenges = data.challenges.map(c => {
      if (c.id === challengeId) {
        const newCurrent = Math.min(progress, c.target)
        const completed = newCurrent >= c.target
        return {
          ...c,
          current: newCurrent,
          completed,
        }
      }
      return c
    })
    
    // Calculate new state
    const completedChallenges = challenges.filter(c => c.completed).map(c => c.id)
    const totalXP = challenges
      .filter(c => c.completed)
      .reduce((sum, c) => sum + c.xpReward, 0)
    
    const allComplete = challenges.every(c => c.completed)
    const noneComplete = challenges.every(c => !c.completed)
    const status = allComplete ? 'complete' : noneComplete ? 'incomplete' : 'partial'
    
    const updated: DailyChallenge = {
      ...data,
      challenges,
      completedChallenges,
      totalXP,
      status,
    }
    
    await setDoc(doc(db, 'dailyChallenges', docId), updated, { merge: true })
    
    return updated
  } catch (error) {
    logger.error('Service', 'Error updating challenge progress', { error: error })
    throw error
  }
}

/**
 * Get user's challenge history (last 30 days)
 */
export async function getChallengeHistory(
  userId: string,
  days: number = 30
): Promise<DailyChallenge[]> {
  const history: DailyChallenge[] = []
  const today = new Date()
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const docId = `${userId}_${dateStr}`
    
    try {
      const challengeDoc = await getDoc(doc(db, 'dailyChallenges', docId))
      if (challengeDoc.exists()) {
        history.push(challengeDoc.data() as DailyChallenge)
      }
    } catch (error) {
      logger.error('Service', `Error loading challenge for ${dateStr}`, { error: error })
    }
  }
  
  return history
}

/**
 * Calculate user's challenge streak
 */
export function calculateChallengeStreak(history: DailyChallenge[]): number {
  // Sort by date descending (most recent first)
  const sorted = history.sort((a, b) => b.date.localeCompare(a.date))
  
  let streak = 0
  const today = new Date().toISOString().split('T')[0]
  
  for (let i = 0; i < sorted.length; i++) {
    const expectedDate = new Date()
    expectedDate.setDate(expectedDate.getDate() - i)
    const expectedDateStr = expectedDate.toISOString().split('T')[0]
    
    const challenge = sorted.find(c => c.date === expectedDateStr)
    
    // If challenge exists and is complete, continue streak
    if (challenge && challenge.status === 'complete') {
      streak++
    } else if (expectedDateStr === today && challenge?.status === 'partial') {
      // Today's challenge in progress doesn't break streak
      continue
    } else {
      // Streak broken
      break
    }
  }
  
  return streak
}


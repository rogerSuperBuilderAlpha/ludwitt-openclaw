import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, doc, setDoc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { ACHIEVEMENTS, Achievement } from '@/lib/achievements/definitions'
import { logger } from '@/lib/logger'

interface UserAchievement {
  achievementId: string
  unlockedAt: string
  points: number
}

interface UserStats {
  projects_completed: number
  portfolio_items: number
  followers: number
  kudos_received: number
  reactions_given: number
  services_listed: number
  services_sold: number
  helpful_kudos: number
  total_earnings: number
  cohorts_joined: number
  login_streak: number
  premium_subscription: boolean
  early_adopter: boolean
}

export function useAchievements(userId: string | undefined) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<UserAchievement[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    // Listen to user's unlocked achievements
    const achievementsRef = collection(db, 'userAchievements')
    const q = query(achievementsRef, where('userId', '==', userId))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const achievements = snapshot.docs.map((doc) => ({
        achievementId: doc.data().achievementId,
        unlockedAt: doc.data().unlockedAt,
        points: doc.data().points,
      }))

      setUnlockedAchievements(achievements)
      setTotalPoints(achievements.reduce((sum, a) => sum + a.points, 0))
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userId])

  return {
    unlockedAchievements,
    totalPoints,
    loading,
    hasAchievement: (achievementId: string) =>
      unlockedAchievements.some((a) => a.achievementId === achievementId),
  }
}

// Function to check and award achievements based on user stats
export async function checkAndAwardAchievements(userId: string, stats: Partial<UserStats>) {
  try {
    // Get user's current achievements
    const achievementsRef = collection(db, 'userAchievements')
    const q = query(achievementsRef, where('userId', '==', userId))
    const snapshot = await getDocs(q) // Get snapshot once

    const unlockedIds = new Set<string>()
    snapshot.forEach((doc) => {
      unlockedIds.add(doc.data().achievementId)
    })

    // Check each achievement
    for (const achievement of ACHIEVEMENTS) {
      // Skip if already unlocked
      if (unlockedIds.has(achievement.id)) continue

      // Check if requirement is met
      let requirementMet = false
      const { type, target, metric } = achievement.requirement

      const currentValue = stats[metric as keyof UserStats] || 0

      if (type === 'count' || type === 'streak') {
        requirementMet = (currentValue as number) >= target
      } else if (type === 'milestone') {
        if (typeof currentValue === 'boolean') {
          requirementMet = currentValue
        } else {
          requirementMet = (currentValue as number) >= target
        }
      }

      // Award achievement if requirement met
      if (requirementMet) {
        await awardAchievement(userId, achievement)
      }
    }
  } catch (error) {
    logger.error('Useachievements', 'Failed to check achievements', { error: error })
  }
}

// Function to award a specific achievement
export async function awardAchievement(userId: string, achievement: Achievement) {
  try {
    const achievementId = `${userId}_${achievement.id}`

    // Save achievement
    await setDoc(doc(db, 'userAchievements', achievementId), {
      userId,
      achievementId: achievement.id,
      points: achievement.points,
      unlockedAt: new Date().toISOString(),
    })

    // Update user's total points
    const userStatsRef = doc(db, 'userStats', userId)
    const userStatsDoc = await getDoc(userStatsRef)
    const currentPoints = userStatsDoc.exists() ? userStatsDoc.data().totalPoints || 0 : 0

    await setDoc(
      userStatsRef,
      {
        totalPoints: currentPoints + achievement.points,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    )

    // Create notification
    await setDoc(doc(db, 'notifications', `achievement_${achievementId}_${Date.now()}`), {
      userId,
      type: 'achievement',
      achievementId: achievement.id,
      title: achievement.title,
      emoji: achievement.emoji,
      points: achievement.points,
      read: false,
      createdAt: new Date().toISOString(),
    })
  } catch {
    // Failed to award achievement
  }
}

// Function to award points for an action
export async function awardPoints(userId: string, action: string, points: number) {
  try {
    const userStatsRef = doc(db, 'userStats', userId)
    const userStatsDoc = await getDoc(userStatsRef)
    const currentPoints = userStatsDoc.exists() ? userStatsDoc.data().totalPoints || 0 : 0

    await setDoc(
      userStatsRef,
      {
        totalPoints: currentPoints + points,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    )

    // Log point activity
    await setDoc(doc(db, 'pointsActivity', `${userId}_${Date.now()}`), {
      userId,
      action,
      points,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Useachievements', 'Failed to award points', { error: error })
  }
}

// Function to get user stats for achievement checking
export async function getUserStats(userId: string): Promise<UserStats> {
  try {
    const statsDoc = await getDoc(doc(db, 'userStats', userId))

    if (statsDoc.exists()) {
      return statsDoc.data() as UserStats
    }

    // Return default stats if none exist
    return {
      projects_completed: 0,
      portfolio_items: 0,
      followers: 0,
      kudos_received: 0,
      reactions_given: 0,
      services_listed: 0,
      services_sold: 0,
      helpful_kudos: 0,
      total_earnings: 0,
      cohorts_joined: 0,
      login_streak: 0,
      premium_subscription: false,
      early_adopter: false,
    }
  } catch (error) {
    logger.error('Useachievements', 'Failed to get user stats', { error: error })
    return {
      projects_completed: 0,
      portfolio_items: 0,
      followers: 0,
      kudos_received: 0,
      reactions_given: 0,
      services_listed: 0,
      services_sold: 0,
      helpful_kudos: 0,
      total_earnings: 0,
      cohorts_joined: 0,
      login_streak: 0,
      premium_subscription: false,
      early_adopter: false,
    }
  }
}

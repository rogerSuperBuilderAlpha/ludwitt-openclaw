/**
 * useAchievements Hook
 * 
 * Handles achievement detection, certificates, and social sharing queues
 */

import { useState, useCallback, useMemo } from 'react'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { CertificateData } from '@/components/basics/DigitalCertificate'
import { createShareableAchievement, ShareableAchievement } from '@/components/basics/SocialSharing'

type AchievementItem = 
  | { type: 'certificate'; payload: CertificateData }
  | { type: 'share'; payload: ShareableAchievement }

interface UseAchievementsOptions {
  userName: string
  streakProtected?: boolean
  onStreakProtected?: (subject: 'math' | 'reading') => void
}

export function useBasicsAchievements(options: UseAchievementsOptions) {
  const { userName, streakProtected = false, onStreakProtected } = options
  
  const [achievementQueue, setAchievementQueue] = useState<AchievementItem[]>([])
  const [showCertificate, setShowCertificate] = useState<CertificateData | null>(null)
  const [showSocialSharing, setShowSocialSharing] = useState<ShareableAchievement | null>(null)
  
  // Enqueue an achievement to show later
  const enqueueAchievement = useCallback((item: AchievementItem) => {
    setAchievementQueue(q => [...q, item])
  }, [])
  
  // Process the next achievement in queue
  const processNextAchievement = useCallback(() => {
    if (achievementQueue.length === 0) return
    
    const [next, ...rest] = achievementQueue
    setAchievementQueue(rest)
    
    if (next.type === 'certificate') {
      setShowCertificate(next.payload)
    } else if (next.type === 'share') {
      setShowSocialSharing(next.payload)
    }
  }, [achievementQueue])
  
  // Close certificate modal and process next
  const closeCertificate = useCallback(() => {
    setShowCertificate(null)
    setTimeout(processNextAchievement, 500)
  }, [processNextAchievement])
  
  // Close sharing modal and process next
  const closeSocialSharing = useCallback(() => {
    setShowSocialSharing(null)
    setTimeout(processNextAchievement, 500)
  }, [processNextAchievement])
  
  // Check for achievements after problem completion
  const checkForAchievements = useCallback((
    subject: 'math' | 'reading',
    oldProgress: SubjectProgressDisplay | null,
    newProgress: SubjectProgressDisplay
  ) => {
    if (!oldProgress) return
    
    // Handle streak protection
    if (streakProtected && newProgress.currentStreak < oldProgress.currentStreak) {
      onStreakProtected?.(subject)
      return // Streak was protected, skip normal checking
    }
    
    const oldGrade = Math.floor(oldProgress.currentDifficulty)
    const newGrade = Math.floor(newProgress.currentDifficulty)
    
    // Grade completion certificate
    if (newGrade > oldGrade && newProgress.accuracyRate >= 0.8 && newProgress.currentStreak >= 5) {
      const certificate: CertificateData = {
        studentName: userName,
        achievement: `${subject === 'math' ? 'Math' : 'Reading'} Mastery`,
        subject: subject === 'math' ? 'Math' : 'Reading',
        gradeLevel: `Grade ${newGrade}`,
        completionDate: new Date().toLocaleDateString(),
        totalProblems: newProgress.totalCompleted,
        accuracy: Math.round(newProgress.accuracyRate * 100),
        streak: newProgress.currentStreak,
        xpEarned: newProgress.totalXP,
        certificateId: `CERT_${subject.toUpperCase()}_${newGrade}_${Date.now()}`
      }
      enqueueAchievement({ type: 'certificate', payload: certificate })
    }
    
    // Streak milestones (every 10)
    if (
      newProgress.currentStreak > 0 &&
      newProgress.currentStreak % 10 === 0 &&
      newProgress.currentStreak > oldProgress.currentStreak
    ) {
      const shareableAchievement = createShareableAchievement('streak_milestone', {
        streak: newProgress.currentStreak
      })
      enqueueAchievement({ type: 'share', payload: shareableAchievement })
    }
    
    // Accuracy milestones
    if (
      newProgress.accuracyRate >= 0.95 &&
      oldProgress.accuracyRate < 0.95 &&
      newProgress.totalCompleted >= 20
    ) {
      const shareableAchievement = createShareableAchievement('accuracy_milestone', {
        accuracy: Math.round(newProgress.accuracyRate * 100),
        subject: subject === 'math' ? 'Math' : 'Reading'
      })
      enqueueAchievement({ type: 'share', payload: shareableAchievement })
    }
    
    // XP milestones
    const xpMilestones = [1000, 5000, 10000, 25000, 50000]
    const oldXPMilestone = xpMilestones.findIndex(m => oldProgress.totalXP < m)
    const newXPMilestone = xpMilestones.findIndex(m => newProgress.totalXP < m)
    
    if (newXPMilestone > oldXPMilestone && oldXPMilestone >= 0) {
      const milestone = xpMilestones[newXPMilestone - 1]
      const shareableAchievement = createShareableAchievement('xp_milestone', {
        xp: milestone
      })
      enqueueAchievement({ type: 'share', payload: shareableAchievement })
    }
  }, [userName, streakProtected, onStreakProtected, enqueueAchievement])
  
  // Create shareable for current progress
  const createShareable = useCallback((totalXP: number) => {
    if (totalXP <= 0) return
    
    const shareableAchievement = createShareableAchievement('xp_milestone', {
      xp: totalXP
    })
    enqueueAchievement({ type: 'share', payload: shareableAchievement })
  }, [enqueueAchievement])
  
  return useMemo(() => ({
    // State
    achievementQueue,
    showCertificate,
    showSocialSharing,
    
    // Actions
    enqueueAchievement,
    checkForAchievements,
    createShareable,
    closeCertificate,
    closeSocialSharing
  }), [
    achievementQueue,
    showCertificate,
    showSocialSharing,
    enqueueAchievement,
    checkForAchievements,
    createShareable,
    closeCertificate,
    closeSocialSharing
  ])
}

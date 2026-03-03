/**
 * Unit Tests for useBasicsAchievements Hook
 * Tests achievement detection, certificates, and social sharing
 */

import { renderHook, act } from '@testing-library/react'
import { useBasicsAchievements } from '../useBasicsAchievements'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { CertificateData } from '@/components/basics/DigitalCertificate'
import { ShareableAchievement } from '@/components/basics/SocialSharing'

// Mock the SocialSharing module
jest.mock('@/components/basics/SocialSharing', () => ({
  createShareableAchievement: jest.fn((type: string, data: Record<string, unknown>) => ({
    type,
    title: `${type} Achievement`,
    description: 'Test achievement',
    stats: data,
    emoji: '🏆'
  }))
}))

// Helper to create properly typed certificate data
const createMockCertificate = (overrides: Partial<CertificateData> = {}): CertificateData => ({
  studentName: 'Test Student',
  achievement: 'Math Mastery',
  subject: 'Math',
  gradeLevel: 'Grade 5',
  completionDate: '2024-01-01',
  totalProblems: 100,
  accuracy: 95,
  streak: 10,
  xpEarned: 1000,
  certificateId: 'CERT_001',
  ...overrides
})

// Helper to create properly typed shareable achievement
const createMockShareable = (overrides: Partial<ShareableAchievement> = {}): ShareableAchievement => ({
  type: 'streak_milestone',
  title: 'Streak Achievement',
  description: 'Amazing streak!',
  stats: { streak: 10 },
  emoji: '🔥',
  ...overrides
})

describe('useBasicsAchievements', () => {
  const defaultOptions = {
    userName: 'Test Student',
    streakProtected: false,
    onStreakProtected: jest.fn()
  }

  const createProgress = (overrides: Partial<SubjectProgressDisplay> = {}): SubjectProgressDisplay => ({
    currentDifficulty: 5,
    currentLevel: 'Grade 5',
    totalCompleted: 10,
    totalCorrect: 8,
    currentStreak: 5,
    longestStreak: 10,
    totalXP: 500,
    accuracyRate: 0.8,
    progressToNextLevel: 50,
    ...overrides
  })

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('initialization', () => {
    it('initializes with empty achievement queue', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      expect(result.current.achievementQueue).toEqual([])
      expect(result.current.showCertificate).toBeNull()
      expect(result.current.showSocialSharing).toBeNull()
    })
  })

  describe('enqueueAchievement', () => {
    it('adds certificate achievement to queue', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const certificate = createMockCertificate()

      act(() => {
        result.current.enqueueAchievement({ type: 'certificate', payload: certificate })
      })

      expect(result.current.achievementQueue).toHaveLength(1)
      expect(result.current.achievementQueue[0].type).toBe('certificate')
    })

    it('adds share achievement to queue', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const sharePayload = createMockShareable({ stats: { streak: 10 } })

      act(() => {
        result.current.enqueueAchievement({ type: 'share', payload: sharePayload })
      })

      expect(result.current.achievementQueue).toHaveLength(1)
      expect(result.current.achievementQueue[0].type).toBe('share')
    })

    it('queues multiple achievements', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      act(() => {
        result.current.enqueueAchievement({ 
          type: 'certificate', 
          payload: createMockCertificate({ studentName: 'Test' })
        })
        result.current.enqueueAchievement({ 
          type: 'share', 
          payload: createMockShareable({ type: 'streak_milestone' })
        })
      })

      expect(result.current.achievementQueue).toHaveLength(2)
    })
  })

  describe('checkForAchievements', () => {
    it('does nothing when oldProgress is null', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))
      const newProgress = createProgress()

      act(() => {
        result.current.checkForAchievements('math', null, newProgress)
      })

      expect(result.current.achievementQueue).toHaveLength(0)
    })

    it('triggers streak protected callback when streak decreases and protection is active', () => {
      const onStreakProtected = jest.fn()
      const { result } = renderHook(() => useBasicsAchievements({
        ...defaultOptions,
        streakProtected: true,
        onStreakProtected
      }))

      const oldProgress = createProgress({ currentStreak: 10 })
      const newProgress = createProgress({ currentStreak: 0 })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      expect(onStreakProtected).toHaveBeenCalledWith('math')
      expect(result.current.achievementQueue).toHaveLength(0)
    })

    it('creates certificate when grade level increases with good stats', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({
        currentDifficulty: 5,
        accuracyRate: 0.85,
        currentStreak: 5
      })
      const newProgress = createProgress({
        currentDifficulty: 6.5, // Grade 6
        accuracyRate: 0.85,
        currentStreak: 6
      })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      expect(result.current.achievementQueue.length).toBeGreaterThan(0)
      const certAchievement = result.current.achievementQueue.find(a => a.type === 'certificate')
      expect(certAchievement).toBeDefined()
    })

    it('does not create certificate when accuracy is below 80%', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({ currentDifficulty: 5 })
      const newProgress = createProgress({
        currentDifficulty: 6.5,
        accuracyRate: 0.7, // Below 80%
        currentStreak: 5
      })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      const certAchievement = result.current.achievementQueue.find(a => a.type === 'certificate')
      expect(certAchievement).toBeUndefined()
    })

    it('creates streak milestone at 10 streak', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({ currentStreak: 9 })
      const newProgress = createProgress({ currentStreak: 10 })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      const shareAchievement = result.current.achievementQueue.find(a => a.type === 'share')
      expect(shareAchievement).toBeDefined()
    })

    it('creates streak milestone at 20 streak', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({ currentStreak: 19 })
      const newProgress = createProgress({ currentStreak: 20 })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      const shareAchievement = result.current.achievementQueue.find(a => a.type === 'share')
      expect(shareAchievement).toBeDefined()
    })

    it('does not create streak milestone for non-10 intervals', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({ currentStreak: 14 })
      const newProgress = createProgress({ currentStreak: 15 })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      expect(result.current.achievementQueue).toHaveLength(0)
    })

    it('creates accuracy milestone when reaching 95%', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({
        accuracyRate: 0.94,
        totalCompleted: 25
      })
      const newProgress = createProgress({
        accuracyRate: 0.96,
        totalCompleted: 26
      })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      const shareAchievement = result.current.achievementQueue.find(a => a.type === 'share')
      expect(shareAchievement).toBeDefined()
    })

    it('does not create accuracy milestone with less than 20 problems', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({
        accuracyRate: 0.94,
        totalCompleted: 15
      })
      const newProgress = createProgress({
        accuracyRate: 0.96,
        totalCompleted: 16
      })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      expect(result.current.achievementQueue).toHaveLength(0)
    })

    it('creates XP milestone when crossing 1000 XP', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({ totalXP: 950 })
      const newProgress = createProgress({ totalXP: 1050 })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      const shareAchievement = result.current.achievementQueue.find(a => a.type === 'share')
      expect(shareAchievement).toBeDefined()
    })

    it('creates XP milestone when crossing 5000 XP', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({ totalXP: 4900 })
      const newProgress = createProgress({ totalXP: 5100 })

      act(() => {
        result.current.checkForAchievements('math', oldProgress, newProgress)
      })

      const shareAchievement = result.current.achievementQueue.find(a => a.type === 'share')
      expect(shareAchievement).toBeDefined()
    })
  })

  describe('closeCertificate', () => {
    it('closes certificate modal', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      // First enqueue and show a certificate
      act(() => {
        result.current.enqueueAchievement({
          type: 'certificate',
          payload: createMockCertificate({ studentName: 'Test' })
        })
      })

      act(() => {
        result.current.closeCertificate()
      })

      expect(result.current.showCertificate).toBeNull()
    })

    it('processes next achievement after closing', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      // Enqueue two achievements
      act(() => {
        result.current.enqueueAchievement({
          type: 'certificate',
          payload: createMockCertificate({ studentName: 'Test1' })
        })
        result.current.enqueueAchievement({
          type: 'share',
          payload: createMockShareable({ type: 'streak_milestone' })
        })
      })

      act(() => {
        result.current.closeCertificate()
      })

      // Fast-forward timer
      act(() => {
        jest.advanceTimersByTime(600)
      })

      // Queue should process next
      expect(result.current.achievementQueue.length).toBeLessThan(2)
    })
  })

  describe('closeSocialSharing', () => {
    it('closes social sharing modal', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      act(() => {
        result.current.closeSocialSharing()
      })

      expect(result.current.showSocialSharing).toBeNull()
    })

    it('processes next achievement after closing', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      // Enqueue achievements
      act(() => {
        result.current.enqueueAchievement({
          type: 'share',
          payload: createMockShareable({ type: 'streak_milestone', title: 'Streak 1' })
        })
        result.current.enqueueAchievement({
          type: 'share',
          payload: createMockShareable({ type: 'streak_milestone', title: 'Streak 2' })
        })
      })

      act(() => {
        result.current.closeSocialSharing()
      })

      act(() => {
        jest.advanceTimersByTime(600)
      })

      expect(result.current.achievementQueue.length).toBeLessThan(2)
    })
  })

  describe('createShareable', () => {
    it('creates shareable achievement for positive XP', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      act(() => {
        result.current.createShareable(1000)
      })

      expect(result.current.achievementQueue).toHaveLength(1)
      expect(result.current.achievementQueue[0].type).toBe('share')
    })

    it('does not create shareable for zero XP', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      act(() => {
        result.current.createShareable(0)
      })

      expect(result.current.achievementQueue).toHaveLength(0)
    })

    it('does not create shareable for negative XP', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      act(() => {
        result.current.createShareable(-100)
      })

      expect(result.current.achievementQueue).toHaveLength(0)
    })
  })

  describe('reading subject achievements', () => {
    it('creates reading certificate with correct subject label', () => {
      const { result } = renderHook(() => useBasicsAchievements(defaultOptions))

      const oldProgress = createProgress({
        currentDifficulty: 5,
        accuracyRate: 0.85,
        currentStreak: 5
      })
      const newProgress = createProgress({
        currentDifficulty: 6.5,
        accuracyRate: 0.85,
        currentStreak: 6
      })

      act(() => {
        result.current.checkForAchievements('reading', oldProgress, newProgress)
      })

      const certAchievement = result.current.achievementQueue.find(a => a.type === 'certificate')
      expect(certAchievement).toBeDefined()
      if (certAchievement && certAchievement.type === 'certificate') {
        expect(certAchievement.payload.subject).toBe('Reading')
      }
    })
  })
})


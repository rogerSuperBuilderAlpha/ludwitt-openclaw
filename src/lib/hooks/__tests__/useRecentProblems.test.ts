/**
 * Unit Tests for useRecentProblems Hook
 * Tests SRS trigger logic and problem tracking for spaced repetition
 */

import { renderHook, act } from '@testing-library/react'
import { useRecentProblems, RecentProblem } from '../useRecentProblems'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} }
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useRecentProblems', () => {
  const mockOnSRSTrigger = jest.fn()

  const createMockProblem = (overrides: Partial<RecentProblem> = {}): Omit<RecentProblem, 'timestamp'> => ({
    id: 'problem-1',
    question: 'What is 2 + 2?',
    topic: 'arithmetic',
    difficulty: 5,
    correct: true,
    userAnswer: '4',
    correctAnswer: '4',
    ...overrides
  })

  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.clear()
  })

  describe('initialization', () => {
    it('initializes with empty problems list', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      expect(result.current.recentProblems).toEqual([])
      expect(result.current.totalCompleted).toBe(0)
    })

    it('loads problems from localStorage on mount', () => {
      const savedProblems: RecentProblem[] = [
        { ...createMockProblem(), timestamp: Date.now() }
      ]
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      expect(result.current.recentProblems).toHaveLength(1)
    })

    it('loads last SRS trigger point from localStorage', () => {
      localStorageMock.setItem('basics_srs_triggered_user-1', '20')

      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      expect(result.current.lastSRSTriggeredAt).toBe(20)
    })

    it('does not load anything when userId is undefined', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: undefined }))

      expect(result.current.recentProblems).toEqual([])
    })

    it('handles corrupted localStorage data gracefully', () => {
      localStorageMock.setItem('recent_problems_user-1', 'invalid-json')

      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      expect(result.current.recentProblems).toEqual([])
    })
  })

  describe('addProblem', () => {
    it('adds problem with timestamp to list', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem())
      })

      expect(result.current.recentProblems).toHaveLength(1)
      expect(result.current.recentProblems[0].timestamp).toBeDefined()
    })

    it('adds problem at the beginning of the list', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem({ id: 'problem-1' }))
        result.current.addProblem(createMockProblem({ id: 'problem-2' }))
      })

      expect(result.current.recentProblems[0].id).toBe('problem-2')
      expect(result.current.recentProblems[1].id).toBe('problem-1')
    })

    it('respects maxProblems limit', () => {
      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        maxProblems: 3
      }))

      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.addProblem(createMockProblem({ id: `problem-${i}` }))
        }
      })

      expect(result.current.recentProblems).toHaveLength(3)
      expect(result.current.recentProblems[0].id).toBe('problem-4')
    })

    it('persists problems to localStorage', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem())
      })

      const saved = localStorageMock.getItem('recent_problems_user-1')
      expect(saved).not.toBeNull()
      expect(JSON.parse(saved!)).toHaveLength(1)
    })

    it('increments totalCompleted counter', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem())
        result.current.addProblem(createMockProblem())
      })

      expect(result.current.totalCompleted).toBe(2)
    })

    it('does nothing when userId is undefined', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: undefined }))

      act(() => {
        result.current.addProblem(createMockProblem())
      })

      expect(result.current.recentProblems).toEqual([])
    })
  })

  describe('checkSRSTrigger', () => {
    it('triggers SRS at interval milestone', () => {
      // Pre-populate with 5 problems (minimum for review)
      const savedProblems: RecentProblem[] = Array(6).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        srsInterval: 20,
        onSRSTrigger: mockOnSRSTrigger
      }))

      act(() => {
        result.current.checkSRSTrigger(20)
      })

      expect(mockOnSRSTrigger).toHaveBeenCalled()
    })

    it('does not trigger SRS below interval', () => {
      const savedProblems: RecentProblem[] = Array(6).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        srsInterval: 20,
        onSRSTrigger: mockOnSRSTrigger
      }))

      act(() => {
        result.current.checkSRSTrigger(15)
      })

      expect(mockOnSRSTrigger).not.toHaveBeenCalled()
    })

    it('does not trigger SRS if fewer than 5 problems in list', () => {
      const savedProblems: RecentProblem[] = Array(3).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        srsInterval: 20,
        onSRSTrigger: mockOnSRSTrigger
      }))

      act(() => {
        result.current.checkSRSTrigger(20)
      })

      expect(mockOnSRSTrigger).not.toHaveBeenCalled()
    })

    it('does not trigger SRS if modal is open', () => {
      const savedProblems: RecentProblem[] = Array(6).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        srsInterval: 20,
        onSRSTrigger: mockOnSRSTrigger
      }))

      act(() => {
        result.current.checkSRSTrigger(20, { isModalOpen: true })
      })

      expect(mockOnSRSTrigger).not.toHaveBeenCalled()
    })

    it('does not trigger SRS during onboarding', () => {
      const savedProblems: RecentProblem[] = Array(6).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        srsInterval: 20,
        onSRSTrigger: mockOnSRSTrigger
      }))

      act(() => {
        result.current.checkSRSTrigger(20, { isOnboarding: true })
      })

      expect(mockOnSRSTrigger).not.toHaveBeenCalled()
    })

    it('does not trigger if already triggered at this count', () => {
      const savedProblems: RecentProblem[] = Array(6).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))
      localStorageMock.setItem('basics_srs_triggered_user-1', '20')

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        srsInterval: 20,
        onSRSTrigger: mockOnSRSTrigger
      }))

      act(() => {
        result.current.checkSRSTrigger(20)
      })

      expect(mockOnSRSTrigger).not.toHaveBeenCalled()
    })

    it('saves trigger point to localStorage', () => {
      const savedProblems: RecentProblem[] = Array(6).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        srsInterval: 20,
        onSRSTrigger: mockOnSRSTrigger
      }))

      act(() => {
        result.current.checkSRSTrigger(20)
      })

      expect(localStorageMock.getItem('basics_srs_triggered_user-1')).toBe('20')
    })

    it('triggers at multiple interval milestones', () => {
      const savedProblems: RecentProblem[] = Array(6).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        srsInterval: 20,
        onSRSTrigger: mockOnSRSTrigger
      }))

      act(() => {
        result.current.checkSRSTrigger(20)
      })

      expect(mockOnSRSTrigger).toHaveBeenCalledTimes(1)

      act(() => {
        result.current.checkSRSTrigger(40)
      })

      expect(mockOnSRSTrigger).toHaveBeenCalledTimes(2)
    })
  })

  describe('getProblemsByTopic', () => {
    it('filters problems by topic', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem({ topic: 'arithmetic' }))
        result.current.addProblem(createMockProblem({ topic: 'geometry' }))
        result.current.addProblem(createMockProblem({ topic: 'arithmetic' }))
      })

      const arithmeticProblems = result.current.getProblemsByTopic('arithmetic')

      expect(arithmeticProblems).toHaveLength(2)
      expect(arithmeticProblems.every(p => p.topic === 'arithmetic')).toBe(true)
    })

    it('returns empty array for non-existent topic', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem({ topic: 'arithmetic' }))
      })

      const problems = result.current.getProblemsByTopic('calculus')

      expect(problems).toEqual([])
    })
  })

  describe('clearProblems', () => {
    it('clears all problems from list', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem())
        result.current.addProblem(createMockProblem())
      })

      expect(result.current.recentProblems).toHaveLength(2)

      act(() => {
        result.current.clearProblems()
      })

      expect(result.current.recentProblems).toHaveLength(0)
    })

    it('removes problems from localStorage', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem())
      })

      expect(localStorageMock.getItem('recent_problems_user-1')).not.toBeNull()

      act(() => {
        result.current.clearProblems()
      })

      expect(localStorageMock.getItem('recent_problems_user-1')).toBeNull()
    })

    it('does nothing when userId is undefined', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: undefined }))

      // Should not throw
      act(() => {
        result.current.clearProblems()
      })
    })
  })

  describe('computed values', () => {
    it('calculates incorrectProblems correctly', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem({ correct: true }))
        result.current.addProblem(createMockProblem({ correct: false }))
        result.current.addProblem(createMockProblem({ correct: false }))
      })

      expect(result.current.incorrectProblems).toHaveLength(2)
      expect(result.current.incorrectCount).toBe(2)
    })

    it('calculates correctProblems correctly', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem({ correct: true }))
        result.current.addProblem(createMockProblem({ correct: true }))
        result.current.addProblem(createMockProblem({ correct: false }))
      })

      expect(result.current.correctProblems).toHaveLength(2)
    })

    it('calculates accuracy correctly', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        result.current.addProblem(createMockProblem({ correct: true }))
        result.current.addProblem(createMockProblem({ correct: true }))
        result.current.addProblem(createMockProblem({ correct: false }))
        result.current.addProblem(createMockProblem({ correct: false }))
      })

      expect(result.current.accuracy).toBe(50)
    })

    it('returns 0 accuracy for empty list', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      expect(result.current.accuracy).toBe(0)
    })

    it('calculates hasProblemsForReview correctly', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      expect(result.current.hasProblemsForReview).toBe(false)

      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.addProblem(createMockProblem({ id: `problem-${i}` }))
        }
      })

      expect(result.current.hasProblemsForReview).toBe(true)
    })
  })

  describe('default options', () => {
    it('uses default maxProblems of 20', () => {
      const { result } = renderHook(() => useRecentProblems({ userId: 'user-1' }))

      act(() => {
        for (let i = 0; i < 25; i++) {
          result.current.addProblem(createMockProblem({ id: `problem-${i}` }))
        }
      })

      expect(result.current.recentProblems).toHaveLength(20)
    })

    it('uses default srsInterval of 20', () => {
      const savedProblems: RecentProblem[] = Array(6).fill(null).map((_, i) => ({
        ...createMockProblem({ id: `problem-${i}` }),
        timestamp: Date.now()
      }))
      localStorageMock.setItem('recent_problems_user-1', JSON.stringify(savedProblems))

      const { result } = renderHook(() => useRecentProblems({ 
        userId: 'user-1',
        onSRSTrigger: mockOnSRSTrigger
      }))

      // Should not trigger at 10
      act(() => {
        result.current.checkSRSTrigger(10)
      })
      expect(mockOnSRSTrigger).not.toHaveBeenCalled()

      // Should trigger at 20
      act(() => {
        result.current.checkSRSTrigger(20)
      })
      expect(mockOnSRSTrigger).toHaveBeenCalled()
    })
  })
})


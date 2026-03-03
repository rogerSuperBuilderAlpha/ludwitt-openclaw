/**
 * Unit Tests for useWorkTimer Hook
 * Tests break interventions, behavior tracking, and timer management
 */

import { renderHook, act } from '@testing-library/react'
import { useWorkTimer, BreakIntervention } from '../useWorkTimer'

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

// Mock document.hidden
let mockDocumentHidden = false
Object.defineProperty(document, 'hidden', {
  get: () => mockDocumentHidden,
  configurable: true
})

describe('useWorkTimer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    localStorageMock.clear()
    mockDocumentHidden = false
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('initialization', () => {
    it('initializes with default state', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      expect(result.current.showIntervention).toBe(false)
      expect(result.current.currentIntervention).toBeNull()
      expect(result.current.breakCount).toBe(0)
      expect(result.current.isPaused).toBe(false)
    })

    it('initializes behavior metrics', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      expect(result.current.behaviorMetrics).toEqual(expect.objectContaining({
        interactionCount: 0,
        problemCount: 0,
        errorCount: 0,
        recentErrors: []
      }))
    })

    it('loads saved state from localStorage', () => {
      const savedState = {
        sessionStartTime: Date.now() - 60000,
        lastBreakTime: Date.now() - 60000,
        consecutiveWorkTime: 600,
        breakCount: 2,
        lastSave: Date.now()
      }
      localStorageMock.setItem('workTimer_user-1', JSON.stringify(savedState))

      const { result } = renderHook(() => useWorkTimer('user-1'))

      expect(result.current.breakCount).toBe(2)
    })

    it('does not initialize timer without userId', () => {
      const { result } = renderHook(() => useWorkTimer(null))

      expect(result.current.showIntervention).toBe(false)
    })
  })

  describe('intervention types', () => {
    it('creates eye break intervention with correct type', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      expect(result.current.showIntervention).toBe(true)
      expect(result.current.currentIntervention?.type).toBe('eye')
    })

    it('creates cognitive break intervention with correct type', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('cognitive')
      })

      expect(result.current.showIntervention).toBe(true)
      expect(result.current.currentIntervention?.type).toBe('cognitive')
    })

    it('creates physical break intervention with correct type', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('physical')
      })

      expect(result.current.showIntervention).toBe(true)
      expect(result.current.currentIntervention?.type).toBe('physical')
    })

    it('creates long break intervention with correct type', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('long')
      })

      expect(result.current.showIntervention).toBe(true)
      expect(result.current.currentIntervention?.type).toBe('long')
    })
  })

  describe('triggerIntervention', () => {
    it('shows intervention modal', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      expect(result.current.showIntervention).toBe(true)
      expect(result.current.currentIntervention).not.toBeNull()
    })

    it('does not interrupt existing intervention', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      const firstIntervention = result.current.currentIntervention

      act(() => {
        result.current.triggerIntervention('cognitive')
      })

      expect(result.current.currentIntervention).toEqual(firstIntervention)
    })

    it('intervention has required properties', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      const intervention = result.current.currentIntervention
      expect(intervention).toHaveProperty('type')
      expect(intervention).toHaveProperty('title')
      expect(intervention).toHaveProperty('message')
      expect(intervention).toHaveProperty('duration')
      expect(intervention).toHaveProperty('action')
      expect(intervention).toHaveProperty('icon')
    })

    it('adds intervention to history', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      expect(result.current.interventions).toHaveLength(1)
    })
  })

  describe('trackInteraction', () => {
    it('updates interaction count', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))
      const initialCount = result.current.behaviorMetrics.interactionCount

      act(() => {
        result.current.trackInteraction()
      })

      expect(result.current.behaviorMetrics.interactionCount).toBe(initialCount + 1)
    })

    it('updates last interaction time', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))
      const beforeTime = Date.now()

      act(() => {
        jest.advanceTimersByTime(1000)
        result.current.trackInteraction()
      })

      expect(result.current.behaviorMetrics.lastInteractionTime).toBeGreaterThanOrEqual(beforeTime)
    })
  })

  describe('trackMouseMovement', () => {
    it('updates interaction count', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))
      const initialCount = result.current.behaviorMetrics.interactionCount

      act(() => {
        result.current.trackMouseMovement()
      })

      expect(result.current.behaviorMetrics.interactionCount).toBe(initialCount + 1)
    })
  })

  describe('trackProblemComplete', () => {
    it('increments problem count', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.trackProblemComplete(true, 30)
      })

      expect(result.current.behaviorMetrics.problemCount).toBe(1)
    })

    it('increments error count for incorrect answers', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.trackProblemComplete(false, 30)
      })

      expect(result.current.behaviorMetrics.errorCount).toBe(1)
    })

    it('does not increment error count for correct answers', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.trackProblemComplete(true, 30)
      })

      expect(result.current.behaviorMetrics.errorCount).toBe(0)
    })

    it('tracks recent errors', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.trackProblemComplete(false, 30)
        result.current.trackProblemComplete(true, 25)
        result.current.trackProblemComplete(false, 20)
      })

      expect(result.current.behaviorMetrics.recentErrors).toHaveLength(3)
      expect(result.current.behaviorMetrics.recentErrors).toEqual([1, 0, 1])
    })

    it('limits recent errors to 10', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        for (let i = 0; i < 15; i++) {
          result.current.trackProblemComplete(i % 2 === 0, 30)
        }
      })

      expect(result.current.behaviorMetrics.recentErrors).toHaveLength(10)
    })

    it('calculates average time per problem', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.trackProblemComplete(true, 30)
        result.current.trackProblemComplete(true, 60)
      })

      expect(result.current.behaviorMetrics.averageTimePerProblem).toBe(45)
    })
  })

  describe('completeBreak', () => {
    it('hides intervention modal', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      expect(result.current.showIntervention).toBe(true)

      act(() => {
        result.current.completeBreak()
      })

      expect(result.current.showIntervention).toBe(false)
    })

    it('clears current intervention', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      act(() => {
        result.current.completeBreak()
      })

      expect(result.current.currentIntervention).toBeNull()
    })

    it('increments break count', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      act(() => {
        result.current.completeBreak()
      })

      expect(result.current.breakCount).toBe(1)
    })

    it('resets consecutive work time', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      act(() => {
        result.current.completeBreak()
      })

      expect(result.current.consecutiveWorkTime).toBe(0)
    })
  })

  describe('skipBreak', () => {
    it('hides intervention modal', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      act(() => {
        result.current.skipBreak()
      })

      expect(result.current.showIntervention).toBe(false)
    })

    it('clears current intervention', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      act(() => {
        result.current.skipBreak()
      })

      expect(result.current.currentIntervention).toBeNull()
    })

    it('does not increment break count', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      act(() => {
        result.current.skipBreak()
      })

      expect(result.current.breakCount).toBe(0)
    })
  })

  describe('formatTime', () => {
    it('formats seconds correctly', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      expect(result.current.formatTime(0)).toBe('0:00')
      expect(result.current.formatTime(30)).toBe('0:30')
      expect(result.current.formatTime(60)).toBe('1:00')
      expect(result.current.formatTime(90)).toBe('1:30')
      expect(result.current.formatTime(3600)).toBe('60:00')
    })

    it('pads seconds with leading zero', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      expect(result.current.formatTime(5)).toBe('0:05')
      expect(result.current.formatTime(65)).toBe('1:05')
    })
  })

  describe('intervention content', () => {
    it('eye breaks have appropriate content', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('eye')
      })

      const intervention = result.current.currentIntervention!
      expect(intervention.type).toBe('eye')
      expect(intervention.duration).toBeLessThanOrEqual(20)
      expect(intervention.title).toBeTruthy()
      expect(intervention.message).toBeTruthy()
    })

    it('cognitive breaks have appropriate content', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('cognitive')
      })

      const intervention = result.current.currentIntervention!
      expect(intervention.type).toBe('cognitive')
      expect(intervention.duration).toBeGreaterThanOrEqual(60)
      expect(intervention.title).toBeTruthy()
    })

    it('physical breaks have appropriate content', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('physical')
      })

      const intervention = result.current.currentIntervention!
      expect(intervention.type).toBe('physical')
      expect(intervention.duration).toBeGreaterThanOrEqual(60)
    })

    it('long breaks have appropriate content', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      act(() => {
        result.current.triggerIntervention('long')
      })

      const intervention = result.current.currentIntervention!
      expect(intervention.type).toBe('long')
      expect(intervention.duration).toBeGreaterThanOrEqual(600)
    })
  })

  describe('session persistence', () => {
    it('saves state to localStorage periodically', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      // Trigger some activity
      act(() => {
        result.current.trackProblemComplete(true, 30)
      })

      // Advance time to trigger save
      act(() => {
        jest.advanceTimersByTime(35000)
      })

      const saved = localStorageMock.getItem('workTimer_user-1')
      expect(saved).not.toBeNull()
    })
  })

  describe('visibility change handling', () => {
    it('handles visibility change events', () => {
      const { result } = renderHook(() => useWorkTimer('user-1'))

      // Simulate page becoming hidden
      mockDocumentHidden = true
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'))
      })

      // Page is hidden - timer should be paused (via refs)
      // We can't directly test ref values, but we verify no errors

      // Simulate page becoming visible
      mockDocumentHidden = false
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'))
      })

      // Should resume without error
      expect(result.current.showIntervention).toBe(false)
    })
  })

  describe('cleanup on unmount', () => {
    it('clears all timers on unmount', () => {
      const { unmount } = renderHook(() => useWorkTimer('user-1'))

      // Should not throw on unmount
      unmount()

      // Advance timers after unmount - should not cause issues
      act(() => {
        jest.advanceTimersByTime(60000)
      })
    })
  })
})


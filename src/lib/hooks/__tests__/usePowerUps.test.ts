/**
 * Unit Tests for usePowerUps Hook
 * Tests power-up activation, effects, and expiration
 */

import { renderHook, act } from '@testing-library/react'
import { usePowerUps } from '../usePowerUps'
import { PowerUp } from '@/components/basics/PowerUpSystem'

describe('usePowerUps', () => {
  const createMockPowerUp = (overrides: Partial<PowerUp> = {}): PowerUp => ({
    id: 'xp_boost_2x',
    name: 'XP Boost 2x',
    description: 'Double XP for 5 minutes',
    icon: '⚡',
    color: 'yellow',
    rarity: 'common',
    effect: {
      type: 'xp_multiplier',
      value: 2,
      duration: 300
    },
    cost: 20,
    cooldown: 1800,
    ...overrides
  })

  const mockNotification = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('initialization', () => {
    it('initializes with no active power-ups', () => {
      const { result } = renderHook(() => usePowerUps())

      expect(result.current.activePowerUps).toEqual([])
      expect(result.current.showPanel).toBe(false)
    })

    it('initializes with default effects', () => {
      const { result } = renderHook(() => usePowerUps())

      expect(result.current.effects).toEqual({
        xpMultiplier: 1,
        streakProtected: false,
        difficultyLocked: false
      })
    })

    it('initializes convenience getters correctly', () => {
      const { result } = renderHook(() => usePowerUps())

      expect(result.current.hasActiveMultiplier).toBe(false)
      expect(result.current.isStreakProtected).toBe(false)
      expect(result.current.isDifficultyLocked).toBe(false)
    })
  })

  describe('activatePowerUp', () => {
    it('adds power-up to active list', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp()

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(result.current.activePowerUps).toHaveLength(1)
      expect(result.current.activePowerUps[0].powerUp.id).toBe('xp_boost_2x')
    })

    it('sets correct expiration time', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({ effect: { type: 'xp_multiplier', value: 2, duration: 60 } })

      const now = Date.now()
      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      const activePowerUp = result.current.activePowerUps[0]
      expect(activePowerUp.expiresAt).toBeGreaterThan(now)
      expect(activePowerUp.expiresAt - activePowerUp.activatedAt).toBe(60000)
    })

    it('applies XP multiplier effect', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp()

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(result.current.effects.xpMultiplier).toBe(2)
      expect(result.current.hasActiveMultiplier).toBe(true)
    })

    it('applies streak protect effect', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        id: 'streak_shield',
        effect: { type: 'streak_protect', value: 1, duration: 300 }
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(result.current.effects.streakProtected).toBe(true)
      expect(result.current.isStreakProtected).toBe(true)
    })

    it('applies difficulty lock effect', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        id: 'difficulty_lock',
        effect: { type: 'difficulty_lock', value: 1, duration: 300 }
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(result.current.effects.difficultyLocked).toBe(true)
      expect(result.current.isDifficultyLocked).toBe(true)
    })

    it('calls notification for time freeze effect', () => {
      const { result } = renderHook(() => usePowerUps({ onNotification: mockNotification }))
      const powerUp = createMockPowerUp({
        id: 'time_freeze',
        effect: { type: 'time_freeze', value: 30, duration: 30 }
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(mockNotification).toHaveBeenCalledWith('⏰ Time frozen for 30 seconds!')
    })

    it('uses default duration of 60 seconds if not specified', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        effect: { type: 'xp_multiplier', value: 2 } // No duration
      })

      const now = Date.now()
      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      const activePowerUp = result.current.activePowerUps[0]
      expect(activePowerUp.expiresAt - activePowerUp.activatedAt).toBe(60000)
    })
  })

  describe('handlePowerUpExpired', () => {
    it('removes power-up from active list', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp()

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(result.current.activePowerUps).toHaveLength(1)

      act(() => {
        result.current.handlePowerUpExpired('xp_boost_2x')
      })

      expect(result.current.activePowerUps).toHaveLength(0)
    })

    it('removes XP multiplier effect on expiration', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp()

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(result.current.effects.xpMultiplier).toBe(2)

      act(() => {
        result.current.handlePowerUpExpired('xp_boost_2x')
      })

      expect(result.current.effects.xpMultiplier).toBe(1)
    })

    it('removes streak protect effect on expiration', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        id: 'streak_shield',
        effect: { type: 'streak_protect', value: 1, duration: 300 }
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(result.current.effects.streakProtected).toBe(true)

      act(() => {
        result.current.handlePowerUpExpired('streak_shield')
      })

      expect(result.current.effects.streakProtected).toBe(false)
    })

    it('handles expiration of non-existent power-up gracefully', () => {
      const { result } = renderHook(() => usePowerUps())

      // Should not throw
      act(() => {
        result.current.handlePowerUpExpired('non_existent')
      })

      expect(result.current.activePowerUps).toHaveLength(0)
    })
  })

  describe('automatic expiration', () => {
    it('automatically expires power-up after duration', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        effect: { type: 'xp_multiplier', value: 2, duration: 5 } // 5 seconds
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      expect(result.current.activePowerUps).toHaveLength(1)
      expect(result.current.effects.xpMultiplier).toBe(2)

      // Advance time past duration
      act(() => {
        jest.advanceTimersByTime(6000)
      })

      expect(result.current.activePowerUps).toHaveLength(0)
      expect(result.current.effects.xpMultiplier).toBe(1)
    })
  })

  describe('calculateXP', () => {
    it('returns base XP when no multiplier active', () => {
      const { result } = renderHook(() => usePowerUps())

      const calculatedXP = result.current.calculateXP(10)

      expect(calculatedXP).toBe(10)
    })

    it('applies 2x multiplier correctly', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        effect: { type: 'xp_multiplier', value: 2, duration: 300 }
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      const calculatedXP = result.current.calculateXP(10)

      expect(calculatedXP).toBe(20)
    })

    it('applies 3x multiplier correctly', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        effect: { type: 'xp_multiplier', value: 3, duration: 300 }
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      const calculatedXP = result.current.calculateXP(15)

      expect(calculatedXP).toBe(45)
    })

    it('floors decimal XP values', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        effect: { type: 'xp_multiplier', value: 2.5, duration: 300 }
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      const calculatedXP = result.current.calculateXP(7)

      expect(calculatedXP).toBe(17) // 7 * 2.5 = 17.5 -> 17
    })

    it('handles zero XP', () => {
      const { result } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp()

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      const calculatedXP = result.current.calculateXP(0)

      expect(calculatedXP).toBe(0)
    })
  })

  describe('setShowPanel', () => {
    it('toggles panel visibility', () => {
      const { result } = renderHook(() => usePowerUps())

      expect(result.current.showPanel).toBe(false)

      act(() => {
        result.current.setShowPanel(true)
      })

      expect(result.current.showPanel).toBe(true)

      act(() => {
        result.current.setShowPanel(false)
      })

      expect(result.current.showPanel).toBe(false)
    })
  })

  describe('multiple power-ups', () => {
    it('can have multiple power-ups active simultaneously', () => {
      const { result } = renderHook(() => usePowerUps())
      
      const xpBoost = createMockPowerUp()
      const streakShield = createMockPowerUp({
        id: 'streak_shield',
        effect: { type: 'streak_protect', value: 1, duration: 300 }
      })

      act(() => {
        result.current.activatePowerUp(xpBoost)
        result.current.activatePowerUp(streakShield)
      })

      expect(result.current.activePowerUps).toHaveLength(2)
      expect(result.current.effects.xpMultiplier).toBe(2)
      expect(result.current.effects.streakProtected).toBe(true)
    })

    it('expires power-ups independently', () => {
      const { result } = renderHook(() => usePowerUps())
      
      const shortBoost = createMockPowerUp({
        id: 'short_boost',
        effect: { type: 'xp_multiplier', value: 2, duration: 5 }
      })
      const longShield = createMockPowerUp({
        id: 'long_shield',
        effect: { type: 'streak_protect', value: 1, duration: 60 }
      })

      act(() => {
        result.current.activatePowerUp(shortBoost)
        result.current.activatePowerUp(longShield)
      })

      expect(result.current.activePowerUps).toHaveLength(2)

      // Advance past short boost duration
      act(() => {
        jest.advanceTimersByTime(6000)
      })

      expect(result.current.activePowerUps).toHaveLength(1)
      expect(result.current.effects.xpMultiplier).toBe(1)
      expect(result.current.effects.streakProtected).toBe(true)
    })
  })

  describe('cleanup on unmount', () => {
    it('clears timers on unmount', () => {
      const { result, unmount } = renderHook(() => usePowerUps())
      const powerUp = createMockPowerUp({
        effect: { type: 'xp_multiplier', value: 2, duration: 300 }
      })

      act(() => {
        result.current.activatePowerUp(powerUp)
      })

      // Should not throw on unmount
      unmount()

      // Advance timers after unmount - should not cause issues
      act(() => {
        jest.advanceTimersByTime(400000)
      })
    })
  })
})


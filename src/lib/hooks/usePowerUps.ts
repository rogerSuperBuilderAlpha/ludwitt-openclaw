/**
 * usePowerUps Hook
 * 
 * Manages power-up activation, effects, and expiration
 */

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { PowerUp } from '@/components/basics/PowerUpSystem'

interface ActivePowerUp {
  powerUp: PowerUp
  activatedAt: number
  expiresAt: number
}

interface PowerUpEffects {
  xpMultiplier: number
  streakProtected: boolean
  difficultyLocked: boolean
}

interface UsePowerUpsOptions {
  onNotification?: (message: string) => void
}

export function usePowerUps(options: UsePowerUpsOptions = {}) {
  const { onNotification } = options
  
  const [activePowerUps, setActivePowerUps] = useState<Map<string, ActivePowerUp>>(new Map())
  const [showPanel, setShowPanel] = useState(false)
  
  // Track effects separately for performance
  const [effects, setEffects] = useState<PowerUpEffects>({
    xpMultiplier: 1,
    streakProtected: false,
    difficultyLocked: false
  })
  
  // Expiration timer ref
  const expirationTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  
  // Cleanup timers on unmount
  useEffect(() => {
    const timersRef = expirationTimersRef.current
    return () => {
      timersRef.forEach(timer => clearTimeout(timer))
    }
  }, [])
  
  // Apply power-up effect
  const applyEffect = useCallback((powerUp: PowerUp) => {
    switch (powerUp.effect.type) {
      case 'xp_multiplier':
        setEffects(prev => ({ ...prev, xpMultiplier: powerUp.effect.value }))
        break
      case 'streak_protect':
        setEffects(prev => ({ ...prev, streakProtected: true }))
        break
      case 'difficulty_lock':
        setEffects(prev => ({ ...prev, difficultyLocked: true }))
        break
      case 'hint_reveal':
        // Find and open hint details element
        const hintElement = document.querySelector('[data-section] details') as HTMLDetailsElement
        if (hintElement && !hintElement.open) {
          hintElement.open = true
          onNotification?.('💡 Hint revealed for current problem!')
        }
        break
      case 'time_freeze':
        onNotification?.(`⏰ Time frozen for ${powerUp.effect.value} seconds!`)
        break
    }
  }, [onNotification])
  
  // Remove power-up effect
  const removeEffect = useCallback((powerUp: PowerUp) => {
    switch (powerUp.effect.type) {
      case 'xp_multiplier':
        setEffects(prev => ({ ...prev, xpMultiplier: 1 }))
        break
      case 'streak_protect':
        setEffects(prev => ({ ...prev, streakProtected: false }))
        break
      case 'difficulty_lock':
        setEffects(prev => ({ ...prev, difficultyLocked: false }))
        break
    }
  }, [])
  
  // Handle power-up expiration (defined first to avoid circular dependency)
  const handlePowerUpExpired = useCallback((powerUpId: string) => {
    setActivePowerUps(prev => {
      const activePowerUp = prev.get(powerUpId)
      if (activePowerUp) {
        removeEffect(activePowerUp.powerUp)
      }
      
      const newMap = new Map(prev)
      newMap.delete(powerUpId)
      return newMap
    })
    
    // Clear timer ref
    const timer = expirationTimersRef.current.get(powerUpId)
    if (timer) {
      clearTimeout(timer)
      expirationTimersRef.current.delete(powerUpId)
    }
  }, [removeEffect])
  
  // Activate a power-up
  const activatePowerUp = useCallback((powerUp: PowerUp) => {
    const now = Date.now()
    const durationMs = (powerUp.effect.duration || 60) * 1000 // default 60 seconds
    const expiresAt = now + durationMs
    
    const activePowerUp: ActivePowerUp = {
      powerUp,
      activatedAt: now,
      expiresAt
    }
    
    setActivePowerUps(prev => new Map(prev).set(powerUp.id, activePowerUp))
    applyEffect(powerUp)
    
    // Set expiration timer
    const timer = setTimeout(() => {
      handlePowerUpExpired(powerUp.id)
    }, durationMs)
    
    expirationTimersRef.current.set(powerUp.id, timer)
  }, [applyEffect, handlePowerUpExpired])
  
  // Calculate XP with multiplier
  const calculateXP = useCallback((baseXP: number) => {
    return Math.floor(baseXP * effects.xpMultiplier)
  }, [effects.xpMultiplier])
  
  // Get active power-ups list
  const activePowerUpsList = useMemo(() => {
    return Array.from(activePowerUps.values())
  }, [activePowerUps])
  
  return useMemo(() => ({
    // State
    activePowerUps: activePowerUpsList,
    showPanel,
    effects,
    
    // Actions
    setShowPanel,
    activatePowerUp,
    handlePowerUpExpired,
    calculateXP,
    
    // Convenience getters
    hasActiveMultiplier: effects.xpMultiplier > 1,
    isStreakProtected: effects.streakProtected,
    isDifficultyLocked: effects.difficultyLocked
  }), [
    activePowerUpsList,
    showPanel,
    effects,
    activatePowerUp,
    handlePowerUpExpired,
    calculateXP
  ])
}


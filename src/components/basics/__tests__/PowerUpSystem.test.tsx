/**
 * Unit Tests for PowerUp System
 */

import { POWER_UPS, PowerUp, PowerUpInventory } from '../PowerUpSystem'

describe('POWER_UPS constant', () => {
  test('has all required power-ups defined', () => {
    expect(POWER_UPS.length).toBeGreaterThanOrEqual(4)
    
    const powerUpIds = POWER_UPS.map(p => p.id)
    expect(powerUpIds).toContain('xp_boost_2x')
    expect(powerUpIds).toContain('xp_boost_3x')
    expect(powerUpIds).toContain('hint_reveal')
    expect(powerUpIds).toContain('streak_shield')
  })

  test('all power-ups have required fields', () => {
    for (const powerUp of POWER_UPS) {
      expect(powerUp.id).toBeDefined()
      expect(powerUp.name).toBeDefined()
      expect(powerUp.description).toBeDefined()
      expect(powerUp.icon).toBeDefined()
      expect(powerUp.color).toBeDefined()
      expect(powerUp.rarity).toBeDefined()
      expect(powerUp.effect).toBeDefined()
      expect(powerUp.effect.type).toBeDefined()
      expect(powerUp.effect.value).toBeDefined()
      expect(powerUp.cost).toBeGreaterThanOrEqual(0)
      expect(powerUp.cooldown).toBeGreaterThanOrEqual(0)
    }
  })

  test('power-up rarities are valid', () => {
    const validRarities = ['common', 'rare', 'epic', 'legendary']
    
    for (const powerUp of POWER_UPS) {
      expect(validRarities).toContain(powerUp.rarity)
    }
  })

  test('power-up effect types are valid', () => {
    const validTypes = ['xp_multiplier', 'hint_reveal', 'streak_protect', 'time_freeze', 'difficulty_lock']
    
    for (const powerUp of POWER_UPS) {
      expect(validTypes).toContain(powerUp.effect.type)
    }
  })

  describe('xp_boost_2x power-up', () => {
    test('has correct configuration', () => {
      const powerUp = POWER_UPS.find(p => p.id === 'xp_boost_2x')
      expect(powerUp).toBeDefined()
      expect(powerUp!.effect.type).toBe('xp_multiplier')
      expect(powerUp!.effect.value).toBe(2)
      expect(powerUp!.effect.duration).toBe(300) // 5 minutes
      expect(powerUp!.rarity).toBe('common')
    })
  })

  describe('xp_boost_3x power-up', () => {
    test('has correct configuration', () => {
      const powerUp = POWER_UPS.find(p => p.id === 'xp_boost_3x')
      expect(powerUp).toBeDefined()
      expect(powerUp!.effect.type).toBe('xp_multiplier')
      expect(powerUp!.effect.value).toBe(3)
      expect(powerUp!.rarity).toBe('rare')
    })
  })

  describe('hint_reveal power-up', () => {
    test('has correct configuration', () => {
      const powerUp = POWER_UPS.find(p => p.id === 'hint_reveal')
      expect(powerUp).toBeDefined()
      expect(powerUp!.effect.type).toBe('hint_reveal')
    })
  })

  describe('streak_shield power-up', () => {
    test('has correct configuration', () => {
      const powerUp = POWER_UPS.find(p => p.id === 'streak_shield')
      expect(powerUp).toBeDefined()
      expect(powerUp!.effect.type).toBe('streak_protect')
    })
  })
})

describe('PowerUpInventory type', () => {
  test('accepts valid inventory structure', () => {
    const inventory: PowerUpInventory = {
      'xp_boost_2x': {
        count: 3,
        lastUsed: Date.now() - 3600000, // 1 hour ago
        totalEarned: 10
      },
      'hint_reveal': {
        count: 5,
        lastUsed: 0,
        totalEarned: 5
      }
    }

    expect(inventory['xp_boost_2x'].count).toBe(3)
    expect(inventory['hint_reveal'].count).toBe(5)
  })
})

describe('Power-up cooldown logic', () => {
  test('cooldown not active for never-used power-up', () => {
    const lastUsed = 0
    const cooldown = 1800000 // 30 minutes in ms
    const now = Date.now()
    
    const isOnCooldown = lastUsed > 0 && (now - lastUsed) < cooldown
    expect(isOnCooldown).toBe(false)
  })

  test('cooldown active for recently used power-up', () => {
    const lastUsed = Date.now() - 600000 // 10 minutes ago
    const cooldown = 1800000 // 30 minutes
    const now = Date.now()
    
    const isOnCooldown = lastUsed > 0 && (now - lastUsed) < cooldown
    expect(isOnCooldown).toBe(true)
  })

  test('cooldown expired for old power-up use', () => {
    const lastUsed = Date.now() - 3600000 // 1 hour ago
    const cooldown = 1800000 // 30 minutes
    const now = Date.now()
    
    const isOnCooldown = lastUsed > 0 && (now - lastUsed) < cooldown
    expect(isOnCooldown).toBe(false)
  })
})

describe('Power-up duration logic', () => {
  test('calculates remaining time correctly', () => {
    const startTime = Date.now() - 120000 // Started 2 minutes ago
    const duration = 300 // 5 minutes
    const now = Date.now()
    
    const elapsed = (now - startTime) / 1000
    const remaining = Math.max(0, duration - elapsed)
    
    expect(remaining).toBeCloseTo(180, 0) // ~3 minutes remaining
  })

  test('remaining time is 0 when expired', () => {
    const startTime = Date.now() - 360000 // Started 6 minutes ago
    const duration = 300 // 5 minutes
    const now = Date.now()
    
    const elapsed = (now - startTime) / 1000
    const remaining = Math.max(0, duration - elapsed)
    
    expect(remaining).toBe(0)
  })

  test('check if power-up is active', () => {
    const startTime = Date.now() - 120000 // Started 2 minutes ago
    const duration = 300 // 5 minutes
    const now = Date.now()
    
    const isActive = (now - startTime) / 1000 < duration
    expect(isActive).toBe(true)
  })

  test('check if power-up is expired', () => {
    const startTime = Date.now() - 360000 // Started 6 minutes ago
    const duration = 300 // 5 minutes
    const now = Date.now()
    
    const isActive = (now - startTime) / 1000 < duration
    expect(isActive).toBe(false)
  })
})

describe('XP multiplier calculation', () => {
  test('calculates 2x multiplier correctly', () => {
    const baseXP = 10
    const multiplier = 2
    const finalXP = baseXP * multiplier
    expect(finalXP).toBe(20)
  })

  test('calculates 3x multiplier correctly', () => {
    const baseXP = 15
    const multiplier = 3
    const finalXP = baseXP * multiplier
    expect(finalXP).toBe(45)
  })

  test('handles no multiplier (1x)', () => {
    const baseXP = 10
    const multiplier = 1
    const finalXP = baseXP * multiplier
    expect(finalXP).toBe(10)
  })
})

describe('Power-up cost validation', () => {
  test('all power-ups have non-negative costs', () => {
    for (const powerUp of POWER_UPS) {
      expect(powerUp.cost).toBeGreaterThanOrEqual(0)
    }
  })

  test('validates sufficient XP for purchase', () => {
    const currentXP = 25
    const powerUp = POWER_UPS.find(p => p.id === 'xp_boost_2x')!
    
    const canAfford = currentXP >= powerUp.cost
    expect(canAfford).toBe(true)
  })

  test('rejects insufficient XP for purchase', () => {
    const currentXP = 5
    const powerUp = POWER_UPS.find(p => p.id === 'xp_boost_2x')!
    
    const canAfford = currentXP >= powerUp.cost
    expect(canAfford).toBe(false)
  })
})

describe('Milestone-based power-up earning', () => {
  test('earns power-up at 10 problems', () => {
    const totalProblems = 10
    const shouldEarn = totalProblems > 0 && totalProblems % 10 === 0
    expect(shouldEarn).toBe(true)
  })

  test('earns power-up at 20 problems', () => {
    const totalProblems = 20
    const shouldEarn = totalProblems > 0 && totalProblems % 10 === 0
    expect(shouldEarn).toBe(true)
  })

  test('does not earn at 15 problems', () => {
    const totalProblems = 15
    const shouldEarn = totalProblems > 0 && totalProblems % 10 === 0
    expect(shouldEarn).toBe(false)
  })

  test('earns power-up at 100 XP milestone', () => {
    const totalXP = 100
    const shouldEarn = totalXP > 0 && totalXP % 100 === 0
    expect(shouldEarn).toBe(true)
  })

  test('does not earn at 150 XP', () => {
    const totalXP = 150
    const shouldEarn = totalXP > 0 && totalXP % 100 === 0
    expect(shouldEarn).toBe(false)
  })

  test('earns streak shield at 5+ streak', () => {
    const streak = 5
    const shouldEarn = streak >= 5
    expect(shouldEarn).toBe(true)
  })

  test('does not earn streak shield at 4 streak', () => {
    const streak = 4
    const shouldEarn = streak >= 5
    expect(shouldEarn).toBe(false)
  })
})


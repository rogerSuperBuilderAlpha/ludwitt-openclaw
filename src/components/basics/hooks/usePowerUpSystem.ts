import { useState, useEffect, useCallback } from 'react'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { logger } from '@/lib/logger'

export interface PowerUp {
  id: string
  name: string
  description: string
  icon: string
  color: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  effect: {
    type:
      | 'xp_multiplier'
      | 'hint_reveal'
      | 'streak_protect'
      | 'time_freeze'
      | 'difficulty_lock'
    value: number
    duration?: number
  }
  cost: number
  cooldown: number
  maxUses?: number
}

export interface ActivePowerUp {
  powerUpId: string
  startTime: number
  duration: number
  remainingTime: number
}

export interface PowerUpInventory {
  [powerUpId: string]: {
    count: number
    lastUsed: number
    totalEarned: number
  }
}

export const POWER_UPS: PowerUp[] = [
  {
    id: 'xp_boost_2x',
    name: 'XP Boost 2x',
    description: 'Double XP earned for 5 minutes',
    icon: '\u26A1',
    color: 'b-bg-warning-light b-text-warning-dark',
    rarity: 'common',
    effect: { type: 'xp_multiplier', value: 2, duration: 300 },
    cost: 10,
    cooldown: 1800,
  },
  {
    id: 'xp_boost_3x',
    name: 'XP Boost 3x',
    description: 'Triple XP earned for 3 minutes',
    icon: '\uD83D\uDD25',
    color: 'b-bg-latin-light b-text-latin-dark',
    rarity: 'rare',
    effect: { type: 'xp_multiplier', value: 3, duration: 180 },
    cost: 25,
    cooldown: 3600,
  },
  {
    id: 'hint_reveal',
    name: 'Hint Reveal',
    description: 'Shows hint for current problem',
    icon: '\uD83D\uDCA1',
    color: 'b-bg-math-light b-text-math-dark',
    rarity: 'common',
    effect: { type: 'hint_reveal', value: 1 },
    cost: 5,
    cooldown: 300,
  },
  {
    id: 'streak_shield',
    name: 'Streak Shield',
    description: 'Protects current streak for 10 minutes',
    icon: '\uD83D\uDEE1\uFE0F',
    color: 'b-bg-reading-light b-text-reading-dark',
    rarity: 'rare',
    effect: { type: 'streak_protect', value: 1, duration: 600 },
    cost: 15,
    cooldown: 1800,
  },
  {
    id: 'time_freeze',
    name: 'Time Freeze',
    description: 'Freeze timer for 30 seconds',
    icon: '\u23F0',
    color: 'b-bg-logic-light b-text-logic-dark',
    rarity: 'epic',
    effect: { type: 'time_freeze', value: 30 },
    cost: 20,
    cooldown: 900,
  },
  {
    id: 'difficulty_lock',
    name: 'Difficulty Lock',
    description: 'Lock current difficulty level for 15 minutes',
    icon: '\uD83D\uDD12',
    color: 'b-bg-latin-light b-text-latin-dark',
    rarity: 'legendary',
    effect: { type: 'difficulty_lock', value: 1, duration: 900 },
    cost: 50,
    cooldown: 7200,
  },
]

interface UsePowerUpSystemOptions {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP: number
  greekXP: number
  logicXP: number
  dailyXP: number
  onPowerUpActivated: (powerUp: PowerUp) => void
  onPowerUpExpired: (powerUpId: string) => void
  onXpSpent?: (amount: number) => void
  userId?: string
  externalPanelControl?: boolean
  isPanelOpen?: boolean
  onPanelToggle?: (open: boolean) => void
}

export function usePowerUpSystem({
  mathProgress,
  readingProgress,
  latinXP,
  greekXP,
  logicXP,
  dailyXP,
  onPowerUpActivated,
  onPowerUpExpired,
  onXpSpent,
  userId,
  externalPanelControl = false,
  isPanelOpen = false,
  onPanelToggle,
}: UsePowerUpSystemOptions) {
  const [inventory, setInventory] = useState<PowerUpInventory>({})
  const [activePowerUps, setActivePowerUps] = useState<ActivePowerUp[]>([])
  const [internalPanelState, setInternalPanelState] = useState(false)
  const [selectedPowerUp, setSelectedPowerUp] = useState<PowerUp | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const showPowerUpPanel = externalPanelControl
    ? isPanelOpen
    : internalPanelState
  const setShowPowerUpPanel = (open: boolean) => {
    if (externalPanelControl && onPanelToggle) {
      onPanelToggle(open)
    } else {
      setInternalPanelState(open)
    }
  }

  // Load user inventory from localStorage
  useEffect(() => {
    const loadInventory = () => {
      try {
        const saved = localStorage.getItem(`power_up_inventory_${userId}`)
        if (saved) {
          setInventory(JSON.parse(saved))
        } else {
          const starterInventory: PowerUpInventory = {
            xp_boost_2x: { count: 1, lastUsed: 0, totalEarned: 1 },
            hint_reveal: { count: 2, lastUsed: 0, totalEarned: 2 },
          }
          setInventory(starterInventory)
        }
      } catch (error) {
        logger.error('PowerUpSystem', 'Failed to load power-up inventory', {
          error,
        })
      }
    }
    if (userId) loadInventory()
  }, [userId])

  useEffect(() => {
    if (userId && Object.keys(inventory).length > 0) {
      localStorage.setItem(
        `power_up_inventory_${userId}`,
        JSON.stringify(inventory)
      )
    }
  }, [inventory, userId])

  const [rewardedMilestones, setRewardedMilestones] = useState<{
    problems: number
    xp: number
    streak: boolean
    dailyGoal: boolean
  }>({ problems: 0, xp: 0, streak: false, dailyGoal: false })

  const showNotification = useCallback((message: string) => {
    const notification = document.createElement('div')
    notification.className =
      'fixed top-4 right-4 b-bg-reading b-text-inverse b-px-lg b-py-md b-rounded-lg b-shadow-lg z-50 b-animate-slide-down'
    notification.textContent = message
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 3000)
  }, [])

  const earnPowerUp = useCallback(
    (powerUpId: string) => {
      setInventory((prev) => ({
        ...prev,
        [powerUpId]: {
          count: (prev[powerUpId]?.count || 0) + 1,
          lastUsed: prev[powerUpId]?.lastUsed || 0,
          totalEarned: (prev[powerUpId]?.totalEarned || 0) + 1,
        },
      }))
      showNotification(
        `Earned ${POWER_UPS.find((p) => p.id === powerUpId)?.name}!`
      )
    },
    [showNotification]
  )

  useEffect(() => {
    if (userId) {
      try {
        const saved = localStorage.getItem(`power_up_milestones_${userId}`)
        if (saved) {
          setRewardedMilestones(JSON.parse(saved))
        }
      } catch (error) {
        logger.error('PowerUpSystem', 'Failed to load milestones', { error })
      }
    }
  }, [userId])

  useEffect(() => {
    if (!mathProgress && !readingProgress && !latinXP && !greekXP && !logicXP)
      return
    if (!userId) return

    const totalProblems =
      (mathProgress?.totalCompleted || 0) +
      (readingProgress?.totalCompleted || 0)
    const totalXP =
      (mathProgress?.totalXP || 0) +
      (readingProgress?.totalXP || 0) +
      latinXP +
      greekXP +
      logicXP
    const hasStreak =
      (mathProgress?.currentStreak || 0) >= 5 ||
      (readingProgress?.currentStreak || 0) >= 5

    const problemMilestone = Math.floor(totalProblems / 10) * 10
    const xpMilestone = Math.floor(totalXP / 100) * 100

    let updated = false
    const newMilestones = { ...rewardedMilestones }

    if (
      problemMilestone > 0 &&
      problemMilestone > rewardedMilestones.problems
    ) {
      earnPowerUp('xp_boost_2x')
      newMilestones.problems = problemMilestone
      updated = true
    }

    if (xpMilestone > 0 && xpMilestone > rewardedMilestones.xp) {
      earnPowerUp('hint_reveal')
      newMilestones.xp = xpMilestone
      updated = true
    }

    if (hasStreak && !rewardedMilestones.streak) {
      earnPowerUp('streak_shield')
      newMilestones.streak = true
      updated = true
    }

    if (dailyXP >= 100 && !rewardedMilestones.dailyGoal) {
      earnPowerUp('time_freeze')
      newMilestones.dailyGoal = true
      updated = true
    }

    if (updated) {
      setRewardedMilestones(newMilestones)
      localStorage.setItem(
        `power_up_milestones_${userId}`,
        JSON.stringify(newMilestones)
      )
    }
  }, [
    mathProgress,
    readingProgress,
    latinXP,
    greekXP,
    logicXP,
    dailyXP,
    userId,
    rewardedMilestones,
    earnPowerUp,
  ])

  // Timer for active power-ups
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePowerUps((prev) =>
        prev
          .map((active) => ({
            ...active,
            remainingTime: Math.max(
              0,
              active.duration - (Date.now() - active.startTime) / 1000
            ),
          }))
          .filter((active) => {
            if (active.remainingTime <= 0) {
              onPowerUpExpired(active.powerUpId)
              return false
            }
            return true
          })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [onPowerUpExpired])

  const activatePowerUp = (powerUp: PowerUp) => {
    const inventoryItem = inventory[powerUp.id]
    if (!inventoryItem || inventoryItem.count <= 0) return

    const timeSinceLastUse = Date.now() - (inventoryItem.lastUsed || 0)
    if (timeSinceLastUse < powerUp.cooldown * 1000) {
      const remainingCooldown = Math.ceil(
        (powerUp.cooldown * 1000 - timeSinceLastUse) / 1000
      )
      showNotification(
        `${powerUp.name} on cooldown (${remainingCooldown}s remaining)`
      )
      return
    }

    if (dailyXP < powerUp.cost) {
      showNotification(`Need ${powerUp.cost} XP to use ${powerUp.name}`)
      return
    }

    if (activePowerUps.some((active) => active.powerUpId === powerUp.id)) {
      showNotification(`${powerUp.name} is already active!`)
      return
    }

    setSelectedPowerUp(powerUp)
    setShowConfirmation(true)
  }

  const confirmActivation = () => {
    if (!selectedPowerUp) return

    if (onXpSpent) {
      onXpSpent(selectedPowerUp.cost)
    }

    setInventory((prev) => ({
      ...prev,
      [selectedPowerUp.id]: {
        ...prev[selectedPowerUp.id],
        count: prev[selectedPowerUp.id].count - 1,
        lastUsed: Date.now(),
      },
    }))

    if (selectedPowerUp.effect.duration) {
      setActivePowerUps((prev) => [
        ...prev,
        {
          powerUpId: selectedPowerUp.id,
          startTime: Date.now(),
          duration: selectedPowerUp.effect.duration!,
          remainingTime: selectedPowerUp.effect.duration!,
        },
      ])
    }

    onPowerUpActivated(selectedPowerUp)
    showPowerUpActivation(selectedPowerUp)

    setShowConfirmation(false)
    setSelectedPowerUp(null)
  }

  const showPowerUpActivation = (powerUp: PowerUp) => {
    const overlay = document.createElement('div')
    overlay.className =
      'fixed inset-0 pointer-events-none z-50 flex items-center justify-center'
    overlay.innerHTML = `
      <div class="b-bg-overlay b-rounded-full b-p-xl b-animate-pulse">
        <div class="b-text-4xl b-animate-bounce">${powerUp.icon}</div>
      </div>
    `
    document.body.appendChild(overlay)
    setTimeout(() => document.body.removeChild(overlay), 2000)

    showNotification(`${powerUp.name} activated!`)
  }

  const totalInventoryCount = Object.values(inventory).reduce(
    (total, item) => total + item.count,
    0
  )

  return {
    inventory,
    activePowerUps,
    showPowerUpPanel,
    setShowPowerUpPanel,
    selectedPowerUp,
    showConfirmation,
    setShowConfirmation,
    totalInventoryCount,
    activatePowerUp,
    confirmActivation,
    dailyXP,
  }
}

export function getRarityClass(rarity: string) {
  switch (rarity) {
    case 'common':
      return 'b-powerup-common'
    case 'rare':
      return 'b-powerup-rare'
    case 'epic':
      return 'b-powerup-epic'
    case 'legendary':
      return 'b-powerup-legendary'
    default:
      return 'b-powerup-common'
  }
}

export function getRarityIcon(rarity: string) {
  switch (rarity) {
    case 'legendary':
      return '\uD83D\uDC51'
    case 'epic':
      return '\uD83D\uDC8E'
    case 'rare':
      return '\uD83D\uDCA0'
    default:
      return '\u2B50'
  }
}

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`
}

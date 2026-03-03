'use client'

import { CheckCircle, Timer } from '@phosphor-icons/react'
import type {
  PowerUp,
  ActivePowerUp,
  PowerUpInventory,
} from './hooks/usePowerUpSystem'
import {
  POWER_UPS,
  getRarityClass,
  getRarityIcon,
  formatTime,
} from './hooks/usePowerUpSystem'

interface PowerUpGridProps {
  inventory: PowerUpInventory
  activePowerUps: ActivePowerUp[]
  dailyXP: number
  onActivate: (powerUp: PowerUp) => void
}

export function PowerUpGrid({
  inventory,
  activePowerUps,
  dailyXP,
  onActivate,
}: PowerUpGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 b-mb-lg">
      {POWER_UPS.map((powerUp) => {
        const inventoryItem = inventory[powerUp.id]
        const count = inventoryItem?.count || 0
        const lastUsed = inventoryItem?.lastUsed || 0
        const isOnCooldown = Date.now() - lastUsed < powerUp.cooldown * 1000
        const cooldownRemaining = isOnCooldown
          ? Math.ceil(
              (powerUp.cooldown * 1000 - (Date.now() - lastUsed)) / 1000
            )
          : 0
        const isActive = activePowerUps.some(
          (active) => active.powerUpId === powerUp.id
        )
        const canAfford = dailyXP >= powerUp.cost
        const isDisabled = count === 0 || isOnCooldown || isActive || !canAfford

        return (
          <button
            key={powerUp.id}
            onClick={() => onActivate(powerUp)}
            disabled={isDisabled}
            className={`b-powerup-card ${
              isActive ? 'b-powerup-active' : getRarityClass(powerUp.rarity)
            } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {/* Header Row */}
            <div className="flex items-start justify-between b-mb-sm">
              <div className="b-text-2xl">{powerUp.icon}</div>
              <span className="b-text-sm">{getRarityIcon(powerUp.rarity)}</span>
            </div>

            {/* Name */}
            <div className="b-font-semibold b-text-primary b-text-sm b-mb-xs">
              {powerUp.name}
              {count > 0 && (
                <span className="b-badge b-badge-primary b-badge-sm ml-2">
                  x{count}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="b-text-xs b-text-secondary b-mb-md">
              {powerUp.description}
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between b-text-xs b-border-t b-pt-sm mt-auto">
              <div className="flex items-center gap-1">
                <span className="b-text-muted">Cost:</span>
                <span
                  className={
                    canAfford
                      ? 'b-text-reading b-font-semibold'
                      : 'b-text-danger b-font-semibold'
                  }
                >
                  {powerUp.cost} XP
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="b-text-muted">CD:</span>
                <span className="b-text-secondary b-font-medium">
                  {isOnCooldown
                    ? formatTime(cooldownRemaining)
                    : `${powerUp.cooldown / 60}m`}
                </span>
              </div>
            </div>

            {/* Active Indicator */}
            {isActive && (
              <div className="absolute top-2 left-2">
                <span className="b-badge b-badge-success b-badge-sm">
                  <CheckCircle size={12} weight="fill" /> Active
                </span>
              </div>
            )}

            {/* Cooldown Overlay */}
            {isOnCooldown && !isActive && (
              <div className="absolute top-2 left-2">
                <span className="b-badge b-badge-primary b-badge-sm">
                  <Timer size={12} weight="fill" />{' '}
                  {formatTime(cooldownRemaining)}
                </span>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

interface ActivePowerUpsIndicatorProps {
  activePowerUps: ActivePowerUp[]
}

export function ActivePowerUpsIndicator({
  activePowerUps,
}: ActivePowerUpsIndicatorProps) {
  if (activePowerUps.length === 0) return null

  return (
    <div className="fixed top-20 right-4 space-y-2 z-40">
      {activePowerUps.map((active) => {
        const powerUp = POWER_UPS.find((p) => p.id === active.powerUpId)!
        const progress = (active.remainingTime / active.duration) * 100

        return (
          <div
            key={active.powerUpId}
            className="b-card b-card-elevated b-p-md b-animate-pulse"
          >
            <div className="flex items-center gap-2">
              <span className="b-text-xl">{powerUp.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="b-text-sm b-font-medium b-text-primary truncate">
                  {powerUp.name}
                </div>
                <div className="b-text-xs b-text-secondary">
                  {formatTime(Math.ceil(active.remainingTime))}
                </div>
              </div>
            </div>
            <div className="b-progress b-progress-sm b-mt-sm">
              <div
                className="b-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

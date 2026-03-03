'use client'

/**
 * Power-up System
 *
 * FUNCTIONALITY:
 * - Power-up effects WORK: XP multipliers, streak protection, hint reveal
 * - Auto-earning based on REAL milestones (every 10 problems, 100 XP, etc.)
 * - Inventory persists via localStorage
 * - Cooldown system prevents spam
 * - REAL IMPACT: Multiplies XP earnings, protects streaks
 *
 * USER IMPACT: HIGH - Directly affects XP gain and streak preservation
 */

import { SubjectProgressDisplay } from '@/lib/types/basics'
import { MagicWand } from '@phosphor-icons/react'
import { UnifiedModal } from './UnifiedModal'
import {
  usePowerUpSystem,
  POWER_UPS,
  type PowerUp,
  type ActivePowerUp,
  type PowerUpInventory,
} from './hooks/usePowerUpSystem'
import { PowerUpGrid, ActivePowerUpsIndicator } from './PowerUpGrid'

// Re-export types for backwards compatibility
export type { PowerUp, ActivePowerUp, PowerUpInventory }
export { POWER_UPS }

interface PowerUpSystemProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  dailyXP: number
  isMathActive: boolean
  isReadingActive: boolean
  onPowerUpActivated: (powerUp: PowerUp) => void
  onPowerUpExpired: (powerUpId: string) => void
  onXpSpent?: (amount: number) => void
  userId?: string
  showTriggerButton?: boolean
  externalPanelControl?: boolean
  isPanelOpen?: boolean
  onPanelToggle?: (open: boolean) => void
}

export function PowerUpSystem({
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  dailyXP,
  onPowerUpActivated,
  onPowerUpExpired,
  onXpSpent,
  userId,
  showTriggerButton = false,
  externalPanelControl = false,
  isPanelOpen = false,
  onPanelToggle,
}: PowerUpSystemProps) {
  const {
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
  } = usePowerUpSystem({
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
    externalPanelControl,
    isPanelOpen,
    onPanelToggle,
  })

  return (
    <>
      {/* Power-up Button (Optional) */}
      {showTriggerButton && (
        <button
          onClick={() => setShowPowerUpPanel(true)}
          className="b-btn b-btn-primary b-btn-circle b-btn-lg fixed bottom-4 right-4 b-shadow-lg z-40"
          title="Power-ups (P)"
        >
          <MagicWand size={24} />
          {totalInventoryCount > 0 && (
            <div className="absolute -top-2 -right-2 b-badge b-badge-warning-solid b-badge-sm">
              {totalInventoryCount}
            </div>
          )}
        </button>
      )}

      {/* Active Power-ups Indicator */}
      <ActivePowerUpsIndicator activePowerUps={activePowerUps} />

      {/* Power-up Panel */}
      <UnifiedModal
        isOpen={showPowerUpPanel}
        onClose={() => setShowPowerUpPanel(false)}
        title="Power-ups"
        subtitle="Supercharge your learning!"
        icon={<MagicWand size={22} weight="bold" className="b-text-logic" />}
        size="lg"
        position="center"
      >
        {/* Current XP */}
        <div className="b-card b-card-flat b-p-lg b-mb-lg">
          <div className="flex items-center justify-between">
            <span className="b-text-sm b-font-medium b-text-secondary">
              Available XP
            </span>
            <span className="b-text-lg b-font-bold b-text-primary">
              {dailyXP} XP
            </span>
          </div>
        </div>

        {/* Power-ups Grid */}
        <PowerUpGrid
          inventory={inventory}
          activePowerUps={activePowerUps}
          dailyXP={dailyXP}
          onActivate={activatePowerUp}
        />

        {/* Power-up Info */}
        <div className="b-card b-card-flat b-p-lg">
          <h4 className="b-font-medium b-text-primary b-mb-sm">
            How to Earn Power-ups
          </h4>
          <ul
            className="b-text-sm b-text-secondary"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--b-space-xs)',
            }}
          >
            <li>Complete 10 problems - XP Boost 2x</li>
            <li>Earn 100 total XP - Hint Reveal</li>
            <li>Reach 5+ streak - Streak Shield</li>
            <li>Daily XP goal met - Time Freeze</li>
          </ul>
        </div>
      </UnifiedModal>

      {/* Confirmation Modal */}
      <UnifiedModal
        isOpen={showConfirmation && !!selectedPowerUp}
        onClose={() => setShowConfirmation(false)}
        title={selectedPowerUp ? `Use ${selectedPowerUp.name}?` : ''}
        subtitle={selectedPowerUp?.description}
        icon={
          selectedPowerUp && (
            <span className="b-text-2xl">{selectedPowerUp.icon}</span>
          )
        }
        size="sm"
        position="center"
      >
        {selectedPowerUp && (
          <>
            <div className="b-card b-card-flat b-p-lg b-mb-lg">
              <div className="flex justify-between b-text-sm b-mb-sm">
                <span className="b-text-secondary">Cost:</span>
                <span className="b-font-medium b-text-primary">
                  {selectedPowerUp.cost} XP
                </span>
              </div>
              <div className="flex justify-between b-text-sm">
                <span className="b-text-secondary">Your XP:</span>
                <span className="b-font-medium b-text-primary">
                  {dailyXP} XP
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="b-btn b-btn-lg b-btn-secondary b-btn-full"
              >
                Cancel
              </button>
              <button
                onClick={confirmActivation}
                className="b-btn b-btn-lg b-btn-primary b-btn-full"
              >
                Activate
              </button>
            </div>
          </>
        )}
      </UnifiedModal>
    </>
  )
}

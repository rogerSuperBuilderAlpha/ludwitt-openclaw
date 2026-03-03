'use client'

import {
  SubjectProgressDisplay,
  MathProblem,
  ReadingExercise,
} from '@/lib/types/basics'
import { VoiceAccessibilitySystem } from './voice-accessibility'
import { PowerUpSystem, PowerUp } from './PowerUpSystem'
import { BreakIntervention } from './BreakIntervention'
import { NearPeerTutorModal } from './NearPeerTutorModal'
import { DailyChallengesModal } from './DailyChallengesModal'

interface DashboardSystemsProps {
  userId?: string
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP: number
  greekXP: number
  logicXP: number
  dailyXP: number
  mathProblem: MathProblem | null
  readingExercise: ReadingExercise | null

  // Voice system
  showVoiceSettingsModal: boolean
  onVoiceSettingsToggle: (open: boolean) => void

  // Power-up system
  showPowerUpPanel: boolean
  onPowerUpPanelToggle: (open: boolean) => void
  onPowerUpActivated: (powerUp: PowerUp) => void
  onPowerUpExpired: (powerUpId: string) => void
  onXpSpent: (amount: number) => void

  // Break intervention
  showBreakIntervention: boolean
  currentIntervention: any
  onBreakComplete: () => void
  onBreakSkip: () => void

  // Tutor modal
  showTutorModal: boolean
  onCloseTutorModal: () => void

  // Challenges modal
  showChallengesModal: boolean
  onCloseChallengesModal: () => void
  onClaimReward: (xp: number) => void
}

export function DashboardSystems({
  userId,
  mathProgress,
  readingProgress,
  latinXP,
  greekXP,
  logicXP,
  dailyXP,
  mathProblem,
  readingExercise,
  showVoiceSettingsModal,
  onVoiceSettingsToggle,
  showPowerUpPanel,
  onPowerUpPanelToggle,
  onPowerUpActivated,
  onPowerUpExpired,
  onXpSpent,
  showBreakIntervention,
  currentIntervention,
  onBreakComplete,
  onBreakSkip,
  showTutorModal,
  onCloseTutorModal,
  showChallengesModal,
  onCloseChallengesModal,
  onClaimReward,
}: DashboardSystemsProps) {
  return (
    <>
      <VoiceAccessibilitySystem
        mathProgress={mathProgress}
        readingProgress={readingProgress}
        latinXP={latinXP}
        greekXP={greekXP}
        logicXP={logicXP}
        onVoiceAnswer={() => {}}
        onVoiceCommand={() => {}}
        userId={userId}
        showControls={false}
        externalPanelControl
        isPanelOpen={showVoiceSettingsModal}
        onPanelToggle={onVoiceSettingsToggle}
      />

      <PowerUpSystem
        mathProgress={mathProgress}
        readingProgress={readingProgress}
        latinXP={latinXP}
        greekXP={greekXP}
        logicXP={logicXP}
        dailyXP={dailyXP}
        isMathActive={!!mathProblem}
        isReadingActive={!!readingExercise}
        onPowerUpActivated={onPowerUpActivated}
        onPowerUpExpired={onPowerUpExpired}
        onXpSpent={onXpSpent}
        userId={userId}
        showTriggerButton={false}
        externalPanelControl
        isPanelOpen={showPowerUpPanel}
        onPanelToggle={onPowerUpPanelToggle}
      />

      {showBreakIntervention && currentIntervention && (
        <BreakIntervention
          intervention={currentIntervention}
          onComplete={onBreakComplete}
          onSkip={onBreakSkip}
        />
      )}

      <NearPeerTutorModal
        isOpen={showTutorModal}
        onClose={onCloseTutorModal}
        userGrade={Math.floor(mathProgress?.currentDifficulty || 5)}
      />

      <DailyChallengesModal
        isOpen={showChallengesModal}
        onClose={onCloseChallengesModal}
        mathProgress={mathProgress}
        readingProgress={readingProgress}
        latinXP={latinXP}
        greekXP={greekXP}
        logicXP={logicXP}
        dailyXP={dailyXP}
        userId={userId}
        onClaimReward={onClaimReward}
      />
    </>
  )
}

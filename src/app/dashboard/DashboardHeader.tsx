'use client'

import { BasicsHeader } from '@/components/basics/BasicsHeader'
import { useDashboardCore } from './DashboardContext'
import { useDashboardXP } from './DashboardContext'
import { useDashboardUI } from './DashboardContext'

export default function DashboardHeader() {
  const { mathProgress, readingProgress } = useDashboardCore()

  const {
    latinXP,
    greekXP,
    logicXP,
    dailyXP,
    dailyGoal,
    wtdXP,
    mtdXP,
    ytdXP,
    allTimeXP,
  } = useDashboardXP()

  const {
    focusMode,
    showKeyboardNudge,
    setSidePanelOpen,
    setFocusMode,
    setShowQuickActions,
    setShowKeyboardNudge,
    setShowPowerUpPanel,
    setShowVoiceSettingsModal,
    setShowReviewsModal,
    setShowSkillsModal,
    setShowPetsModal,
    setForceShowIntro,
  } = useDashboardUI()

  return (
    <BasicsHeader
      onToggleSidebar={() => setSidePanelOpen(true)}
      onToggleFocus={() => setFocusMode((f) => !f)}
      onShowQuickActions={() => setShowQuickActions(true)}
      focusMode={focusMode}
      showKeyboardNudge={showKeyboardNudge}
      onDismissKeyboardNudge={() => setShowKeyboardNudge(false)}
      mathProgress={mathProgress}
      readingProgress={readingProgress}
      latinXP={latinXP}
      greekXP={greekXP}
      logicXP={logicXP}
      dailyXP={dailyXP}
      dailyGoal={dailyGoal}
      wtdXP={wtdXP}
      mtdXP={mtdXP}
      ytdXP={ytdXP}
      allTimeXP={allTimeXP}
      onOpenPowerUps={() => setShowPowerUpPanel(true)}
      onOpenReviews={() => setShowReviewsModal(true)}
      onOpenSkills={() => setShowSkillsModal(true)}
      onOpenPets={() => setShowPetsModal(true)}
      onOpenAnalytics={() => setSidePanelOpen(true)}
      onShowIntro={() => setForceShowIntro(true)}
    />
  )
}

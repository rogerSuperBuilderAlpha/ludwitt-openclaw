'use client'

import { ProgressModal as BasicsSidebar } from '@/components/basics/BasicsSidebar'
import {
  useDashboardCore,
  useDashboardXP,
  useDashboardUI,
} from './DashboardContext'

export default function ProgressSection() {
  const { isLoading, mathProgress, readingProgress } = useDashboardCore()
  const { latinXP, greekXP, logicXP, dailyXP, dailyGoal } = useDashboardXP()
  const { sidePanelOpen, focusMode, setSidePanelOpen } = useDashboardUI()

  return (
    <BasicsSidebar
      isOpen={sidePanelOpen}
      onClose={() => setSidePanelOpen(false)}
      isLoading={isLoading}
      mathProgress={mathProgress}
      readingProgress={readingProgress}
      latinXP={latinXP}
      greekXP={greekXP}
      logicXP={logicXP}
      focusMode={focusMode}
      dailyXP={dailyXP}
      dailyGoal={dailyGoal}
    />
  )
}

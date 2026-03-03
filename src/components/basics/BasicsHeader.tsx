'use client'

import { XPProgressBar } from './XPProgressBar'
import { MasteryProgressBar } from './MasteryProgressBar'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { Trophy, ChartBar, TrendUp, Lightning } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Subject } from '@/data/companions/attributes'

// Progress bar view preference key
const PROGRESS_VIEW_KEY = 'pitchrise-progress-view'

interface BasicsHeaderProps {
  onToggleSidebar: () => void
  onToggleFocus: () => void
  onShowQuickActions: () => void
  focusMode: boolean
  showKeyboardNudge: boolean
  onDismissKeyboardNudge: () => void
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  dailyXP?: number
  dailyGoal?: number
  wtdXP?: number // Week to Date (Mon-Sun)
  mtdXP?: number // Month to Date
  ytdXP?: number
  allTimeXP?: number
  onOpenPowerUps?: () => void
  onOpenReviews?: () => void
  onOpenSkills?: () => void
  onOpenPets?: () => void
  onOpenAnalytics?: () => void
  onShowIntro?: () => void
  onCompanionClick?: (subject: Subject) => void
  onEvolveClick?: (subject: Subject) => void
}

export function BasicsHeader({
  onToggleSidebar,
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  dailyXP = 0,
  dailyGoal = 1000,
  wtdXP,
  mtdXP,
  ytdXP,
  allTimeXP,
  onOpenPowerUps,
  onOpenReviews,
  onOpenSkills,
  onOpenPets,
  onOpenAnalytics,
  onShowIntro,
  onCompanionClick,
  onEvolveClick,
}: BasicsHeaderProps) {
  const router = useRouter()
  // Progress bar view: 'mastery' (default) or 'xp'
  const [progressView, setProgressView] = useState<'mastery' | 'xp'>('mastery')

  // Load preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(PROGRESS_VIEW_KEY)
    if (saved === 'xp' || saved === 'mastery') {
      setProgressView(saved)
    }
  }, [])

  // Toggle and save preference
  const toggleProgressView = () => {
    const newView = progressView === 'mastery' ? 'xp' : 'mastery'
    setProgressView(newView)
    localStorage.setItem(PROGRESS_VIEW_KEY, newView)
  }

  return (
    <>
      <header
        className="bg-white border-b b-border sticky z-20"
        style={{
          backgroundColor: 'var(--b-bg-elevated)',
          top: 'var(--strip-height, 0px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 gap-4">
            {/* Left - Section Indicator */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-xs font-medium text-blue-600">
                  Basics
                </span>
              </div>
            </div>

            {/* Center - Progress Bar (Mastery-first by default) */}
            <div className="hidden md:flex flex-1 max-w-lg mx-4 items-center gap-2">
              {/* View Toggle Button - Desktop */}
              <button
                onClick={toggleProgressView}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label={`Switch to ${progressView === 'mastery' ? 'XP' : 'Mastery'} view. Currently showing ${progressView} view.`}
                title={`Switch to ${progressView === 'mastery' ? 'XP' : 'Mastery'} view`}
              >
                {progressView === 'mastery' ? (
                  <Lightning
                    size={16}
                    className="text-amber-500"
                    aria-hidden="true"
                  />
                ) : (
                  <TrendUp
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                )}
              </button>

              <div className="flex-1">
                {progressView === 'mastery' ? (
                  <MasteryProgressBar
                    mathProgress={mathProgress}
                    readingProgress={readingProgress}
                    latinXP={latinXP}
                    greekXP={greekXP}
                    logicXP={logicXP}
                    todayXP={dailyXP}
                    streak={
                      (mathProgress?.currentStreak || 0) +
                      (readingProgress?.currentStreak || 0)
                    }
                  />
                ) : (
                  <XPProgressBar
                    mathProgress={mathProgress}
                    readingProgress={readingProgress}
                    latinXP={latinXP}
                    greekXP={greekXP}
                    logicXP={logicXP}
                    todayXP={dailyXP}
                    dailyGoal={dailyGoal}
                    wtdXP={wtdXP}
                    mtdXP={mtdXP}
                    ytdXP={ytdXP}
                    allTimeXP={allTimeXP}
                  />
                )}
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
              {/* Progress Button */}
              <button
                onClick={onToggleSidebar}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all border hover:shadow-sm"
                style={{
                  backgroundColor: 'var(--b-bg-card)',
                  borderColor: 'var(--b-border)',
                  color: 'var(--b-text-secondary)',
                }}
                aria-label="View progress sidebar"
              >
                <ChartBar size={18} aria-hidden="true" />
                <span className="hidden sm:inline">Progress</span>
              </button>

              {/* Leaderboard Button - using native navigation for reliability */}
              <button
                onClick={() => {
                  router.push('/basics/leaderboard')
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all border hover:shadow-sm"
                style={{
                  backgroundColor: 'var(--b-bg-card)',
                  borderColor: 'var(--b-writing)',
                  color: 'var(--b-writing-dark)',
                }}
                aria-label="View leaderboard"
              >
                <Trophy
                  size={18}
                  weight="fill"
                  style={{ color: 'var(--b-writing)' }}
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">Leaderboard</span>
              </button>
            </div>
          </nav>

          {/* Mobile Progress Bar */}
          <div className="md:hidden pb-3">
            <div className="flex items-center gap-2">
              {/* View Toggle Button - Mobile */}
              <button
                onClick={toggleProgressView}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label={`Switch to ${progressView === 'mastery' ? 'XP' : 'Mastery'} view. Currently showing ${progressView} view.`}
                title={`Switch to ${progressView === 'mastery' ? 'XP' : 'Mastery'} view`}
              >
                {progressView === 'mastery' ? (
                  <Lightning
                    size={16}
                    className="text-amber-500"
                    aria-hidden="true"
                  />
                ) : (
                  <TrendUp
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                )}
              </button>

              <div className="flex-1">
                {progressView === 'mastery' ? (
                  <MasteryProgressBar
                    mathProgress={mathProgress}
                    readingProgress={readingProgress}
                    latinXP={latinXP}
                    greekXP={greekXP}
                    logicXP={logicXP}
                    todayXP={dailyXP}
                    streak={
                      (mathProgress?.currentStreak || 0) +
                      (readingProgress?.currentStreak || 0)
                    }
                  />
                ) : (
                  <XPProgressBar
                    mathProgress={mathProgress}
                    readingProgress={readingProgress}
                    latinXP={latinXP}
                    greekXP={greekXP}
                    logicXP={logicXP}
                    todayXP={dailyXP}
                    dailyGoal={dailyGoal}
                    wtdXP={wtdXP}
                    mtdXP={mtdXP}
                    ytdXP={ytdXP}
                    allTimeXP={allTimeXP}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

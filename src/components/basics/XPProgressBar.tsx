/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import {
  Lightning,
  Check,
  CaretDown,
  Sparkle,
  TrendUp,
  ArrowUp,
  Clock,
  Info,
} from '@phosphor-icons/react'
import {
  getMillisUntilMidnightEST,
  formatCountdown,
  getXPDateRangeInfo,
  formatDateShort,
} from '@/lib/utils/date-helpers'

type TimeRange = 'today' | 'wtd' | 'mtd' | 'ytd' | 'all'

interface XPByRange {
  today: number // Today
  wtd: number // Week to Date (Mon-Sun)
  mtd: number // Month to Date
  ytd: number // Year to Date
  all: number // All time
}

interface XPProgressBarProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  todayXP: number
  dailyGoal: number
  // Time-ranged XP (WTD = Week to Date, MTD = Month to Date)
  wtdXP?: number // Week to Date (Mon-Sun)
  mtdXP?: number // Month to Date
  ytdXP?: number // Year to Date
  allTimeXP?: number // True all-time total from DB
}

export function XPProgressBar({
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  todayXP,
  dailyGoal,
  wtdXP,
  mtdXP,
  ytdXP,
  allTimeXP,
}: XPProgressBarProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [justReachedGoal, setJustReachedGoal] = useState(false)
  const [timeUntilReset, setTimeUntilReset] = useState<string>('')
  const [selectedRange, setSelectedRange] = useState<TimeRange>('today')
  const [hoveredRange, setHoveredRange] = useState<TimeRange | null>(null)

  // Track XP changes for animation
  const [xpGainAnimation, setXpGainAnimation] = useState<number | null>(null)
  const prevTodayXPRef = useRef(todayXP)

  // Real XP breakdown by subject
  const mathXP = mathProgress?.totalXP || 0
  const readingXP = readingProgress?.totalXP || 0

  // Total includes all subjects (current session)
  const sessionTotalXP = mathXP + readingXP + latinXP + greekXP + logicXP

  // Use provided all-time XP or fall back to session total
  const trueAllTimeXP = allTimeXP ?? sessionTotalXP

  // Get date range info for tooltips
  const dateRangeInfo = useMemo(() => getXPDateRangeInfo(), [])

  // XP by time range - use provided values or estimate based on daily XP
  const xpByRange: XPByRange = {
    today: todayXP,
    wtd: wtdXP ?? todayXP, // Week to Date - fall back to today if not provided
    mtd: mtdXP ?? todayXP, // Month to Date - fall back to today if not provided
    ytd: ytdXP ?? trueAllTimeXP, // Year to Date - fall back to all-time
    all: trueAllTimeXP,
  }

  const displayXP = xpByRange[selectedRange]
  const progressPercentage = Math.min((todayXP / dailyGoal) * 100, 100)
  const isGoalMet = todayXP >= dailyGoal

  // Time range definitions with tooltips
  const timeRanges: { key: TimeRange; label: string; tooltip: string }[] =
    useMemo(() => {
      const today = new Date()
      const todayStr = formatDateShort(today)

      return [
        {
          key: 'today',
          label: 'Today',
          tooltip: `Today (${todayStr})`,
        },
        {
          key: 'wtd',
          label: 'WTD',
          tooltip: `Week to Date: ${formatDateShort(dateRangeInfo.weekStart)} – ${formatDateShort(dateRangeInfo.weekEnd)} (Mon–Sun)`,
        },
        {
          key: 'mtd',
          label: 'MTD',
          tooltip: `Month to Date: ${formatDateShort(dateRangeInfo.monthStart)} – ${formatDateShort(dateRangeInfo.monthEnd)}`,
        },
        {
          key: 'ytd',
          label: 'YTD',
          tooltip: `Year to Date: ${formatDateShort(dateRangeInfo.yearStart)} – ${formatDateShort(today)}`,
        },
        {
          key: 'all',
          label: 'All',
          tooltip: 'All Time',
        },
      ]
    }, [dateRangeInfo])

  // Countdown timer until midnight EST reset
  // Only run the interval when the countdown is actually visible (details panel open)
  useEffect(() => {
    const updateCountdown = () => {
      const ms = getMillisUntilMidnightEST()
      setTimeUntilReset(formatCountdown(ms))
    }

    // Update immediately to show initial value
    updateCountdown()

    // Only run interval if details are shown (countdown is visible in panel)
    // The compact countdown in the bar is hidden on small screens and updates on interaction
    if (showDetails) {
      const interval = setInterval(updateCountdown, 1000)
      return () => clearInterval(interval)
    }
  }, [showDetails])

  // Celebrate when goal is first reached
  useEffect(() => {
    if (isGoalMet) {
      setJustReachedGoal(true)
      // Stop the intense animation after 5 seconds
      const timer = setTimeout(() => setJustReachedGoal(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isGoalMet])

  // Detect XP gains and show animation
  useEffect(() => {
    const gained = todayXP - prevTodayXPRef.current
    if (gained > 0) {
      // XP was earned - show animation
      setXpGainAnimation(gained)
      // Clear animation after it plays
      const timer = setTimeout(() => setXpGainAnimation(null), 2000)
      prevTodayXPRef.current = todayXP
      return () => clearTimeout(timer)
    }
    prevTodayXPRef.current = todayXP
  }, [todayXP])

  return (
    <div className="relative">
      {/* XP Progress Bar */}
      <div
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
          isGoalMet
            ? justReachedGoal
              ? 'bg-gradient-to-r from-b-bg-reading-light to-b-bg-reading-light border-2 b-border-reading animate-pulse shadow-lg shadow-b-reading-border'
              : 'bg-gradient-to-r from-b-bg-reading-light to-b-bg-reading-light border b-border-reading'
            : 'bg-white border b-border'
        }`}
        style={
          !isGoalMet ? { backgroundColor: 'var(--b-bg-elevated)' } : undefined
        }
      >
        {/* Time Range Tabs - Compact */}
        <div className="flex b-bg-muted rounded-md p-0.5 gap-0.5 relative">
          {timeRanges.map(({ key, label, tooltip }) => (
            <div key={key} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedRange(key)
                }}
                onMouseEnter={() => setHoveredRange(key)}
                onMouseLeave={() => setHoveredRange(null)}
                className={`px-1.5 py-0.5 text-[10px] font-semibold rounded transition-all ${
                  selectedRange === key
                    ? 'bg-white b-text-primary shadow-sm'
                    : 'b-text-muted hover:b-text-secondary'
                }`}
                style={
                  selectedRange === key
                    ? {
                        backgroundColor: 'var(--b-bg-elevated, #ffffff)',
                        color: 'var(--b-text-primary, #0b1d39)',
                      }
                    : undefined
                }
              >
                {label}
              </button>
              {/* Tooltip */}
              {hoveredRange === key && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap z-50 shadow-lg">
                  {tooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* XP Display */}
        <div className="flex items-center gap-1.5 relative">
          <Lightning
            size={16}
            weight="fill"
            className={`${
              isGoalMet
                ? justReachedGoal
                  ? 'text-b-reading animate-bounce'
                  : 'text-b-reading'
                : xpGainAnimation
                  ? 'text-b-success animate-bounce'
                  : 'text-b-writing'
            } transition-colors`}
          />
          <span
            className={`font-bold text-sm transition-all ${
              isGoalMet
                ? 'b-text-reading'
                : xpGainAnimation
                  ? 'b-text-success scale-110'
                  : 'b-text-primary'
            }`}
          >
            {displayXP.toLocaleString()}
          </span>

          {/* XP Gain Animation */}
          {xpGainAnimation && (
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-b-success whitespace-nowrap animate-[floatUp_2s_ease-out_forwards] pointer-events-none"
              style={{
                animation: 'floatUp 2s ease-out forwards',
              }}
            >
              +{xpGainAnimation} XP
            </span>
          )}
        </div>

        {/* Progress Bar with Milestones */}
        <div className="flex-1 relative">
          <div
            className={`w-full rounded-full h-3 ${isGoalMet ? 'bg-b-reading-border' : 'bg-b-border'}`}
            role="progressbar"
            aria-valuenow={todayXP}
            aria-valuemin={0}
            aria-valuemax={dailyGoal}
            aria-label={`Daily XP progress: ${todayXP} of ${dailyGoal}`}
          >
            {/* Progress fill */}
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                isGoalMet
                  ? justReachedGoal
                    ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 shadow-sm animate-pulse'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-sm'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Milestone markers */}
            <div className="absolute inset-0 flex items-center pointer-events-none">
              {[25, 50, 75].map((pct) => (
                <div
                  key={pct}
                  className={`absolute w-0.5 h-3 transition-colors ${
                    progressPercentage >= pct ? 'bg-white/40' : 'bg-gray-400/30'
                  }`}
                  style={{ left: `${pct}%` }}
                />
              ))}
            </div>
          </div>

          {/* Goal indicator at 100% */}
          {!isGoalMet && (
            <div className="absolute -top-1 right-0 w-1 h-5 bg-b-text-muted rounded-full opacity-60" />
          )}
        </div>

        {/* Goal Text / Progress Indicator */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {isGoalMet ? (
            <span
              className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap ${
                justReachedGoal
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-bounce shadow-lg'
                  : 'bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700'
              }`}
            >
              <ArrowUp size={10} weight="bold" />
              Goal Complete! 🎉
            </span>
          ) : (
            <div className="text-xs whitespace-nowrap">
              <span className="font-bold text-orange-600">
                {todayXP.toLocaleString()}
              </span>
              <span className="b-text-muted">
                {' '}
                / {dailyGoal.toLocaleString()}
              </span>
            </div>
          )}

          {/* Reset countdown - compact */}
          <span className="text-[10px] b-text-muted hidden lg:flex items-center gap-0.5 ml-1">
            <Clock size={10} />
            {timeUntilReset}
          </span>

          {/* Details toggle button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 hover:b-bg-muted rounded-md transition-colors ml-1"
            aria-label="Toggle XP details"
          >
            <CaretDown
              size={14}
              weight="bold"
              className={`b-text-muted transition-transform ${showDetails ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Details Dropdown */}
      {showDetails && (
        <>
          {/* Click-outside backdrop - z-10 so it doesn't block header (z-20) */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDetails(false)}
          />

          {/* Details Panel - Wide 2-column layout */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] max-w-[95vw] bg-white border b-border rounded-xl shadow-b-modal z-40 p-5 animate-[slideIn_0.2s_ease-out]"
            style={{ backgroundColor: 'var(--b-bg-elevated)' }}
          >
            {/* Header with Time Range Selector */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkle size={22} weight="fill" className="text-b-writing" />
                <h3 className="font-bold text-lg b-text-primary">
                  XP Progress
                </h3>
              </div>

              {/* Time Range Tabs */}
              <div className="flex b-bg-muted rounded-lg p-1 gap-1 relative">
                {timeRanges.map(({ key, label, tooltip }) => (
                  <div key={key} className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedRange(key)
                      }}
                      onMouseEnter={() => setHoveredRange(key)}
                      onMouseLeave={() => setHoveredRange(null)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        selectedRange === key
                          ? 'b-bg-math text-white shadow-sm'
                          : 'b-text-secondary hover:b-text-primary hover:bg-white'
                      }`}
                      style={
                        selectedRange === key
                          ? { backgroundColor: 'var(--b-math, #3b82f6)' }
                          : undefined
                      }
                    >
                      {label}
                    </button>
                    {/* Tooltip */}
                    {hoveredRange === key && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap z-50 shadow-lg">
                        {tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-3">
                {/* XP Display Card */}
                <div className="p-4 bg-gradient-to-br from-b-bg-math-light to-b-bg-greek-light rounded-xl border b-border-math">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Lightning
                        size={28}
                        weight="fill"
                        className="text-b-writing"
                      />
                      <span className="text-4xl font-bold b-text-primary">
                        {xpByRange[selectedRange].toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm b-text-secondary font-medium">
                      {selectedRange === 'today' && "Today's XP"}
                      {selectedRange === 'wtd' && 'Week to Date'}
                      {selectedRange === 'mtd' && 'Month to Date'}
                      {selectedRange === 'ytd' && 'Year to Date'}
                      {selectedRange === 'all' && 'All Time Total'}
                    </div>
                  </div>
                </div>

                {/* Today's Goal */}
                <div
                  className={`p-3 rounded-xl ${isGoalMet ? 'b-bg-reading-light border b-border-reading' : 'b-bg-writing-light border b-border-writing'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold b-text-primary flex items-center gap-2 text-sm">
                        Today&apos;s Goal
                        {isGoalMet && (
                          <Check
                            size={14}
                            weight="bold"
                            className="text-b-reading"
                          />
                        )}
                      </div>
                      <div className="text-xs b-text-secondary">
                        {todayXP.toLocaleString()} /{' '}
                        {dailyGoal.toLocaleString()} XP
                      </div>
                    </div>
                    <div
                      className={`text-2xl font-bold ${isGoalMet ? 'text-b-reading' : 'text-b-writing'}`}
                    >
                      {Math.round(progressPercentage)}%
                    </div>
                  </div>

                  {/* Progress bar with milestones */}
                  <div
                    className={`w-full h-3 rounded-full relative overflow-hidden ${isGoalMet ? 'bg-b-reading-border' : 'bg-b-writing-border'}`}
                  >
                    <div
                      className={`h-3 rounded-full transition-all ${isGoalMet ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                    {/* Milestone markers */}
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                      {[25, 50, 75].map((pct) => (
                        <div
                          key={pct}
                          className={`absolute w-0.5 h-3 transition-colors ${
                            progressPercentage >= pct
                              ? 'bg-white/40'
                              : 'bg-gray-400/30'
                          }`}
                          style={{ left: `${pct}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Grade Progression Explanation */}
                  <div
                    className={`mt-2 text-xs p-2 rounded-lg ${isGoalMet ? 'b-bg-reading-light b-text-reading' : 'b-bg-writing-light b-text-writing'}`}
                  >
                    {isGoalMet ? (
                      <span className="flex items-center gap-1">
                        <TrendUp size={12} weight="bold" />
                        <strong>Grade progression unlocked!</strong>
                      </span>
                    ) : (
                      <span>
                        Complete your goal to unlock grade progression
                      </span>
                    )}
                  </div>
                </div>

                {/* Reset Countdown */}
                <div className="p-3 rounded-xl b-bg-muted border b-border flex items-center justify-between">
                  <div className="flex items-center gap-2 b-text-secondary">
                    <Clock size={18} weight="fill" className="b-text-muted" />
                    <div>
                      <div className="text-sm font-medium">Resets in</div>
                      <div className="text-[10px] b-text-muted">
                        Midnight EST
                      </div>
                    </div>
                  </div>
                  <span className="text-xl font-bold b-text-primary font-mono">
                    {timeUntilReset}
                  </span>
                </div>
              </div>

              {/* Right Column - Subject Breakdown */}
              <div className="space-y-2">
                <div className="text-xs font-semibold b-text-muted uppercase tracking-wide mb-2">
                  XP by Subject
                </div>

                <div className="flex items-center justify-between p-2.5 b-bg-math-light rounded-lg border b-border-math">
                  <span className="text-sm b-text-secondary flex items-center gap-2">
                    📐 Math
                  </span>
                  <span className="font-bold b-text-primary">
                    {mathXP.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 b-bg-reading-light rounded-lg border b-border-reading">
                  <span className="text-sm b-text-secondary flex items-center gap-2">
                    📖 Reading
                  </span>
                  <span className="font-bold b-text-primary">
                    {readingXP.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 b-bg-writing-light rounded-lg border b-border-writing">
                  <span className="text-sm b-text-secondary flex items-center gap-2">
                    🏛️ Latin
                  </span>
                  <span className="font-bold b-text-primary">
                    {latinXP.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 b-bg-logic-light rounded-lg border b-border-logic">
                  <span className="text-sm b-text-secondary flex items-center gap-2">
                    🏺 Greek
                  </span>
                  <span className="font-bold b-text-primary">
                    {greekXP.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 b-bg-latin-light rounded-lg border b-border-latin">
                  <span className="text-sm b-text-secondary flex items-center gap-2">
                    🧠 Logic
                  </span>
                  <span className="font-bold b-text-primary">
                    {logicXP.toLocaleString()}
                  </span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-b-bg-writing-light to-b-bg-writing-light rounded-lg border b-border-writing mt-3">
                  <span className="text-sm font-semibold b-text-primary flex items-center gap-2">
                    <Lightning
                      size={16}
                      weight="fill"
                      className="text-b-writing"
                    />
                    All Time Total
                  </span>
                  <span className="text-lg font-bold b-text-primary">
                    {trueAllTimeXP.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

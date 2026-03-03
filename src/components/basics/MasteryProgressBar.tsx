/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * MasteryProgressBar Component
 *
 * Mastery-first progress display that addresses the learning science
 * finding that XP-centric interfaces optimize for engagement over learning.
 *
 * This component prioritizes:
 * 1. Mastery progress (concepts learned, grade progression)
 * 2. Daily learning goals (concepts practiced)
 * 3. XP as secondary/supporting metric
 *
 * Research: Nicholls (1984) - Mastery-oriented goals predict better
 * learning outcomes than performance-oriented goals.
 */

import { useState, useMemo } from 'react'
import {
  TrendUp,
  Target,
  BookOpen,
  Calculator,
  Columns,
  Flask,
  PuzzlePiece,
  Check,
  Lightning,
  CaretDown,
  Fire,
  Info,
} from '@phosphor-icons/react'
import { SubjectProgressDisplay } from '@/lib/types/basics'

interface MasteryProgressBarProps {
  // Subject progress
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number

  // Daily tracking
  conceptsPracticedToday?: number
  dailyConceptsGoal?: number
  todayXP?: number

  // Streak
  streak?: number
}

// Grade level thresholds based on difficulty
function getGradeFromDifficulty(difficulty: number): string {
  if (difficulty < 3) return 'Grade 3'
  if (difficulty < 4) return 'Grade 4'
  if (difficulty < 5) return 'Grade 5'
  if (difficulty < 6) return 'Grade 6'
  if (difficulty < 7) return 'Grade 7'
  if (difficulty < 8) return 'Grade 8'
  if (difficulty < 9) return 'High School'
  if (difficulty < 10) return 'Advanced'
  return 'Expert'
}

function getNextGrade(currentGrade: string): string {
  const grades = [
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'High School',
    'Advanced',
    'Expert',
  ]
  const idx = grades.indexOf(currentGrade)
  if (idx >= 0 && idx < grades.length - 1) {
    return grades[idx + 1]
  }
  return currentGrade
}

export function MasteryProgressBar({
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  conceptsPracticedToday = 0,
  dailyConceptsGoal = 10,
  todayXP = 0,
  streak = 0,
}: MasteryProgressBarProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Calculate overall mastery level (weighted average of subjects)
  const overallMastery = useMemo(() => {
    const subjects = [
      { progress: mathProgress, weight: 1 },
      { progress: readingProgress, weight: 1 },
      // Estimate Latin/Greek/Logic mastery from XP
      {
        progress:
          latinXP > 0
            ? { currentDifficulty: Math.min(12, 3 + latinXP / 100) }
            : null,
        weight: 0.5,
      },
      {
        progress:
          greekXP > 0
            ? { currentDifficulty: Math.min(12, 3 + greekXP / 100) }
            : null,
        weight: 0.5,
      },
      {
        progress:
          logicXP > 0
            ? { currentDifficulty: Math.min(12, 3 + logicXP / 100) }
            : null,
        weight: 0.5,
      },
    ].filter((s) => s.progress !== null)

    if (subjects.length === 0) return 3 // Start at Grade 3

    const weightedSum = subjects.reduce(
      (sum, s) => sum + (s.progress?.currentDifficulty || 3) * s.weight,
      0
    )
    const totalWeight = subjects.reduce((sum, s) => sum + s.weight, 0)

    return weightedSum / totalWeight
  }, [mathProgress, readingProgress, latinXP, greekXP, logicXP])

  const currentGrade = getGradeFromDifficulty(overallMastery)
  const nextGrade = getNextGrade(currentGrade)

  // Progress to next grade (0-100%)
  const progressToNextGrade = useMemo(() => {
    const currentLevel = Math.floor(overallMastery)
    const progress = (overallMastery - currentLevel) * 100
    return Math.min(100, Math.max(0, progress))
  }, [overallMastery])

  // Calculate total concepts mastered
  const conceptsMastered = useMemo(() => {
    const mathConcepts = mathProgress?.totalCompleted
      ? Math.floor(
          mathProgress.totalCompleted * (mathProgress.accuracyRate || 0.5)
        )
      : 0
    const readingConcepts = readingProgress?.totalCompleted
      ? Math.floor(
          readingProgress.totalCompleted * (readingProgress.accuracyRate || 0.5)
        )
      : 0
    const latinConcepts = Math.floor(latinXP / 25)
    const greekConcepts = Math.floor(greekXP / 25)
    const logicConcepts = Math.floor(logicXP / 30)

    return (
      mathConcepts +
      readingConcepts +
      latinConcepts +
      greekConcepts +
      logicConcepts
    )
  }, [mathProgress, readingProgress, latinXP, greekXP, logicXP])

  // Daily goal progress
  const dailyGoalProgress = Math.min(
    100,
    (conceptsPracticedToday / dailyConceptsGoal) * 100
  )
  const isDailyGoalMet = conceptsPracticedToday >= dailyConceptsGoal

  return (
    <div className="relative">
      {/* Main Mastery Bar */}
      <div
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-white border border-gray-200 shadow-sm"
        style={{ backgroundColor: 'var(--b-bg-elevated, #ffffff)' }}
      >
        {/* Mastery Level Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
            <TrendUp size={20} weight="bold" className="text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">
              {currentGrade}
            </div>
            <div className="text-[10px] text-gray-500">
              Level {Math.floor(overallMastery)}
            </div>
          </div>
        </div>

        {/* Progress Bar to Next Grade */}
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600">Progress to {nextGrade}</span>
            <span className="font-bold text-emerald-600">
              {Math.round(progressToNextGrade)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${progressToNextGrade}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Concepts Mastered */}
          <div className="text-center px-2">
            <div className="font-bold text-gray-900">{conceptsMastered}</div>
            <div className="text-[10px] text-gray-500">Mastered</div>
          </div>

          {/* Daily Goal */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              isDailyGoalMet
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            {isDailyGoalMet ? (
              <Check size={14} weight="bold" />
            ) : (
              <Target size={14} weight="bold" />
            )}
            <span className="text-xs font-semibold">
              {isDailyGoalMet
                ? 'Goal ✓'
                : `${conceptsPracticedToday}/${dailyConceptsGoal}`}
            </span>
          </div>

          {/* Streak */}
          {streak > 0 && (
            <div className="flex items-center gap-1 text-orange-600">
              <Fire size={16} weight="fill" />
              <span className="text-xs font-bold">{streak}</span>
            </div>
          )}

          {/* Details Toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CaretDown
              size={16}
              className={`text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Details Panel */}
      {showDetails && (
        <>
          {/* Click-outside backdrop - z-10 so it doesn't block header (z-20) */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDetails(false)}
          />

          <div
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-40 p-5 animate-in slide-in-from-top-2 duration-200"
            style={{ backgroundColor: 'var(--b-bg-elevated, #ffffff)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <TrendUp size={22} weight="fill" className="text-emerald-500" />
                Mastery Progress
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                <Info size={12} />
                <span>Mastery &gt; XP</span>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left: Overall Progress */}
              <div className="space-y-4">
                {/* Grade Progress Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {currentGrade}
                      </div>
                      <div className="text-sm text-gray-600">Current Level</div>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {Math.floor(overallMastery)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Next: {nextGrade}</span>
                      <span className="font-bold text-emerald-600">
                        {Math.round(progressToNextGrade)}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-emerald-200">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                        style={{ width: `${progressToNextGrade}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Daily Learning Goal */}
                <div
                  className={`rounded-xl p-4 border ${
                    isDailyGoalMet
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target
                        size={18}
                        weight="fill"
                        className={
                          isDailyGoalMet ? 'text-emerald-600' : 'text-amber-600'
                        }
                      />
                      <span className="font-semibold text-gray-900">
                        Daily Learning Goal
                      </span>
                    </div>
                    {isDailyGoalMet && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Complete! 🎉
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-2">
                    {conceptsPracticedToday} of {dailyConceptsGoal} concepts
                    practiced today
                  </div>

                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${
                      isDailyGoalMet ? 'bg-emerald-200' : 'bg-amber-200'
                    }`}
                  >
                    <div
                      className={`h-full rounded-full transition-all ${
                        isDailyGoalMet ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${dailyGoalProgress}%` }}
                    />
                  </div>
                </div>

                {/* XP (Secondary) */}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Lightning
                        size={16}
                        weight="fill"
                        className="text-amber-500"
                      />
                      <span className="text-sm">Today&apos;s XP</span>
                    </div>
                    <span className="font-bold text-gray-700">{todayXP}</span>
                  </div>
                </div>
              </div>

              {/* Right: Subject Breakdown */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Mastery by Subject
                </div>

                {/* Math */}
                <SubjectMasteryRow
                  icon={<Calculator size={16} weight="fill" />}
                  label="Math"
                  level={mathProgress?.currentDifficulty || 3}
                  accuracy={mathProgress?.accuracyRate || 0}
                  completed={mathProgress?.totalCompleted || 0}
                  color="blue"
                />

                {/* Reading */}
                <SubjectMasteryRow
                  icon={<BookOpen size={16} weight="fill" />}
                  label="Reading"
                  level={readingProgress?.currentDifficulty || 3}
                  accuracy={readingProgress?.accuracyRate || 0}
                  completed={readingProgress?.totalCompleted || 0}
                  color="green"
                />

                {/* Latin */}
                <SubjectMasteryRow
                  icon={<Columns size={16} weight="fill" />}
                  label="Latin"
                  level={3 + Math.floor(latinXP / 100)}
                  accuracy={0.75}
                  completed={Math.floor(latinXP / 20)}
                  color="amber"
                />

                {/* Greek */}
                <SubjectMasteryRow
                  icon={<Flask size={16} weight="fill" />}
                  label="Greek"
                  level={3 + Math.floor(greekXP / 100)}
                  accuracy={0.75}
                  completed={Math.floor(greekXP / 20)}
                  color="purple"
                />

                {/* Logic */}
                <SubjectMasteryRow
                  icon={<PuzzlePiece size={16} weight="fill" />}
                  label="Logic"
                  level={3 + Math.floor(logicXP / 100)}
                  accuracy={0.75}
                  completed={Math.floor(logicXP / 25)}
                  color="red"
                />
              </div>
            </div>

            {/* Learning Science Note */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700">
                💡 <strong>Why Mastery over XP?</strong> Research shows focusing
                on concepts learned rather than points earned leads to deeper
                understanding and better long-term retention.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Subject Mastery Row Component
interface SubjectMasteryRowProps {
  icon: React.ReactNode
  label: string
  level: number
  accuracy: number
  completed: number
  color: 'blue' | 'green' | 'amber' | 'purple' | 'red'
}

function SubjectMasteryRow({
  icon,
  label,
  level,
  accuracy,
  completed,
  color,
}: SubjectMasteryRowProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    amber: 'bg-amber-50 border-amber-200 text-amber-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    red: 'bg-red-50 border-red-200 text-red-600',
  }

  const grade = getGradeFromDifficulty(level)
  const accuracyPct = Math.round(accuracy * 100)

  return (
    <div
      className={`flex items-center justify-between p-2.5 rounded-lg border ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-gray-800 text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-xs font-semibold text-gray-700">{grade}</div>
          <div className="text-[10px] text-gray-500">
            {accuracyPct}% acc • {completed} done
          </div>
        </div>
      </div>
    </div>
  )
}

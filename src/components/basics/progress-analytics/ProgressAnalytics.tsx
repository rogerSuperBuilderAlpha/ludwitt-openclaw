/**
 * Progress Analytics Dashboard - Redesigned
 *
 * Shows comprehensive progress with:
 * - Current grade level for each subject
 * - Questions needed to advance
 * - Curriculum details (current, previous, next grade)
 * - Review schedule calendar (spaced repetition visibility)
 * - Learning trends over time
 */

'use client'

import { useState } from 'react'
import { Lightning, Calendar, TrendUp } from '@phosphor-icons/react'
import { ProgressAnalyticsProps } from './types'
import { SubjectCard } from './SubjectCard'
import { useProgressAnalytics } from './hooks/useProgressAnalytics'
import {
  MATH_CURRICULUM,
  READING_CURRICULUM,
  LATIN_CURRICULUM,
  GREEK_CURRICULUM,
  LOGIC_CURRICULUM,
} from './data/mathCurriculum'
import { ReviewCalendar } from '@/components/basics/spaced-repetition'
import { LearningTrends } from '@/components/basics/analytics'

export function ProgressAnalytics({
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  dailyXP,
  dailyGoal,
}: ProgressAnalyticsProps) {
  const dailyXPMet = dailyXP >= dailyGoal
  const { getQuestionsToNext, getGradeFromXP, getProgressFromXP } =
    useProgressAnalytics()

  // Tabs for different views
  const [activeTab, setActiveTab] = useState<
    'progress' | 'schedule' | 'trends'
  >('progress')

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-b-bg-muted rounded-lg">
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'progress'
              ? 'bg-white shadow-sm b-text-primary'
              : 'b-text-muted hover:b-text-secondary'
          }`}
        >
          <Lightning
            size={16}
            weight={activeTab === 'progress' ? 'fill' : 'regular'}
          />
          Progress
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'schedule'
              ? 'bg-white shadow-sm b-text-primary'
              : 'b-text-muted hover:b-text-secondary'
          }`}
        >
          <Calendar
            size={16}
            weight={activeTab === 'schedule' ? 'fill' : 'regular'}
          />
          Review Schedule
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'trends'
              ? 'bg-white shadow-sm b-text-primary'
              : 'b-text-muted hover:b-text-secondary'
          }`}
        >
          <TrendUp
            size={16}
            weight={activeTab === 'trends' ? 'fill' : 'regular'}
          />
          Trends
        </button>
      </div>

      {/* Review Schedule Tab */}
      {activeTab === 'schedule' && <ReviewCalendar inline />}

      {/* Learning Trends Tab */}
      {activeTab === 'trends' && <LearningTrends />}

      {/* Progress Tab (default) */}
      {activeTab === 'progress' && (
        <>
          {/* Daily Progress Banner */}
          <div
            className={`p-4 rounded-xl ${
              dailyXPMet
                ? 'b-bg-reading-light border b-border-reading'
                : 'b-bg-math-light border b-border-math'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lightning
                  size={24}
                  weight="fill"
                  className={dailyXPMet ? 'text-b-reading' : 'text-b-math'}
                />
                <div>
                  <div className="font-semibold b-text-primary">
                    {dailyXPMet
                      ? '🎉 Daily Goal Complete!'
                      : 'Daily XP Progress'}
                  </div>
                  <div className="text-sm b-text-secondary">
                    {dailyXPMet
                      ? 'Grade advancement is now unlocked for today!'
                      : `Complete your daily goal to unlock grade advancement`}
                  </div>
                </div>
              </div>
              <div
                className={`text-2xl font-bold ${dailyXPMet ? 'text-b-reading' : 'text-b-math'}`}
              >
                {dailyXP}/{dailyGoal} XP
              </div>
            </div>
          </div>

          {/* Subject Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SubjectCard
              name="Math"
              emoji="📐"
              grade={Math.floor(mathProgress?.currentDifficulty || 1)}
              progress={mathProgress?.progressToNextLevel || 0}
              questionsToNext={getQuestionsToNext(
                mathProgress?.progressToNextLevel || 0
              )}
              totalCompleted={mathProgress?.totalCompleted || 0}
              accuracy={mathProgress?.accuracyRate}
              streak={mathProgress?.currentStreak}
              xp={mathProgress?.totalXP || 0}
              curriculum={MATH_CURRICULUM}
              color="blue"
              isLocked={!dailyXPMet}
            />

            <SubjectCard
              name="Reading"
              emoji="📖"
              grade={Math.floor(readingProgress?.currentDifficulty || 1)}
              progress={readingProgress?.progressToNextLevel || 0}
              questionsToNext={getQuestionsToNext(
                readingProgress?.progressToNextLevel || 0
              )}
              totalCompleted={readingProgress?.totalCompleted || 0}
              accuracy={readingProgress?.accuracyRate}
              streak={readingProgress?.currentStreak}
              xp={readingProgress?.totalXP || 0}
              curriculum={READING_CURRICULUM}
              color="green"
              isLocked={!dailyXPMet}
            />

            <SubjectCard
              name="Latin"
              emoji="🏛️"
              grade={getGradeFromXP(latinXP)}
              progress={getProgressFromXP(latinXP)}
              questionsToNext={getQuestionsToNext(getProgressFromXP(latinXP))}
              totalCompleted={Math.floor(latinXP / 20)}
              xp={latinXP}
              curriculum={LATIN_CURRICULUM}
              color="amber"
              isLocked={!dailyXPMet}
            />

            <SubjectCard
              name="Greek"
              emoji="🏺"
              grade={getGradeFromXP(greekXP)}
              progress={getProgressFromXP(greekXP)}
              questionsToNext={getQuestionsToNext(getProgressFromXP(greekXP))}
              totalCompleted={Math.floor(greekXP / 20)}
              xp={greekXP}
              curriculum={GREEK_CURRICULUM}
              color="purple"
              isLocked={!dailyXPMet}
            />

            <SubjectCard
              name="Logic"
              emoji="🧠"
              grade={getGradeFromXP(logicXP)}
              progress={getProgressFromXP(logicXP)}
              questionsToNext={getQuestionsToNext(getProgressFromXP(logicXP))}
              totalCompleted={Math.floor(logicXP / 25)}
              xp={logicXP}
              curriculum={LOGIC_CURRICULUM}
              color="indigo"
              isLocked={!dailyXPMet}
            />
          </div>

          {/* Total XP Summary */}
          <div className="p-4 bg-gradient-to-r from-b-bg-writing-light to-b-bg-writing-light rounded-xl border b-border-writing">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold b-text-primary">
                  Total XP Earned (All Time)
                </span>
              </div>
              <div className="text-2xl font-bold text-b-writing">
                {(mathProgress?.totalXP || 0) +
                  (readingProgress?.totalXP || 0) +
                  latinXP +
                  greekXP +
                  logicXP}{' '}
                XP
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

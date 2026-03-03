'use client'

/**
 * DashboardInfoTabs Component
 *
 * Combines Learning Study, Analytics Snapshot, and Due for Review
 * into a single row of tabs. Clicking a tab expands its content.
 */

import { useState } from 'react'
import {
  ChartLineUp,
  Target,
  Brain,
  CaretDown,
  Fire,
  CheckCircle,
  Clock,
  Warning,
  ArrowRight,
} from '@phosphor-icons/react'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { useDueForReview } from '@/lib/hooks/useDueForReview'

type TabId = 'study' | 'analytics' | 'review'

interface DashboardInfoTabsProps {
  userId: string
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP: number
  greekXP: number
  dailyXP: number
  dailyGoal: number
  onStartReview: () => void
  onOpenStudyModal: () => void
}

// Daily goals per subject
const DAILY_GOALS = {
  math: 10,
  reading: 5,
  classical: 5,
}

export function DashboardInfoTabs({
  userId,
  mathProgress,
  readingProgress,
  latinXP,
  greekXP,
  dailyXP,
  dailyGoal,
  onStartReview,
  onOpenStudyModal,
}: DashboardInfoTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId | null>(null)

  // Check enrollment status
  const isEnrolled =
    typeof window !== 'undefined' &&
    localStorage.getItem(`learning_study_enrolled_${userId}`) === 'true'
  const isDismissed =
    typeof window !== 'undefined' &&
    localStorage.getItem(`learning_study_dismissed_${userId}`) === 'true'
  const showStudyTab = !isDismissed || isEnrolled

  // Calculate session stats
  const mathToday = mathProgress?.totalCompleted
    ? Math.min(
        mathProgress.totalCompleted % (DAILY_GOALS.math * 2),
        DAILY_GOALS.math
      )
    : 0
  const readingToday = readingProgress?.totalCompleted
    ? Math.min(
        readingProgress.totalCompleted % (DAILY_GOALS.reading * 2),
        DAILY_GOALS.reading
      )
    : 0
  const classicalToday = Math.min(
    Math.floor((latinXP + greekXP) / 20) % (DAILY_GOALS.classical * 2),
    DAILY_GOALS.classical
  )
  const isGoalMet = dailyXP >= dailyGoal

  // Fetch real review data from the personalized memory API
  const {
    hasModel,
    schedule,
    dueNowItems,
    overdueItems,
    totalDueCount,
    isLoading: reviewLoading,
  } = useDueForReview()

  // Count urgent items
  const urgentCount = overdueItems.length
  const reviewStreak = 0 // Placeholder until stats tracking is implemented

  const toggleTab = (tab: TabId) => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  return (
    <div className="mb-4">
      {/* Tab Headers Row */}
      <div className="flex gap-2 mb-2">
        {/* Learning Study Tab */}
        {showStudyTab && (
          <button
            onClick={() => toggleTab('study')}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${
                activeTab === 'study'
                  ? 'bg-green-600 text-white'
                  : isEnrolled
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-green-600 text-white hover:bg-green-700'
              }
            `}
          >
            <ChartLineUp size={16} weight="bold" />
            <span>Learning Study</span>
            {!isEnrolled && (
              <span className="px-1.5 py-0.5 bg-amber-400 text-amber-900 text-xs font-bold rounded">
                $100/mo
              </span>
            )}
            {isEnrolled && (
              <span className="px-1.5 py-0.5 bg-white/20 text-xs rounded">
                Enrolled
              </span>
            )}
            <CaretDown
              size={14}
              className={`transition-transform ${activeTab === 'study' ? 'rotate-180' : ''}`}
            />
          </button>
        )}

        {/* Analytics Snapshot Tab */}
        <button
          onClick={() => toggleTab('analytics')}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          <Target size={16} weight="fill" />
          <span>Today&apos;s Session</span>
          <div className="flex items-center gap-1">
            <Fire
              size={12}
              weight="fill"
              className={isGoalMet ? 'text-green-400' : 'text-amber-400'}
            />
            <span className="text-xs">
              Daily Goal: {dailyXP}/{dailyGoal} XP
            </span>
          </div>
          <CaretDown
            size={14}
            className={`transition-transform ${activeTab === 'analytics' ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Due for Review Tab */}
        <button
          onClick={() => toggleTab('review')}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${
              activeTab === 'review'
                ? 'bg-purple-600 text-white'
                : urgentCount > 0
                  ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          <Brain size={16} weight="fill" />
          <span>Due for Review</span>
          {reviewLoading ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          ) : totalDueCount > 0 ? (
            <span
              className={`px-1.5 py-0.5 text-xs font-bold rounded ${
                urgentCount > 0
                  ? 'bg-red-200 text-red-700'
                  : 'bg-purple-200 text-purple-700'
              }`}
            >
              {totalDueCount}
            </span>
          ) : (
            <CheckCircle size={14} className="text-green-500" />
          )}
          {urgentCount > 0 && (
            <Warning size={14} className="text-red-500" weight="fill" />
          )}
          <CaretDown
            size={14}
            className={`transition-transform ${activeTab === 'review' ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Expanded Content */}
      {activeTab && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm animate-in slide-in-from-top-2 duration-200">
          {/* Learning Study Content */}
          {activeTab === 'study' && (
            <div className="space-y-3">
              {isEnrolled ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Learning Outcomes Study
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your application is under review
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                    Pending Review
                  </span>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Join Our Learning Outcomes Study
                    </h3>
                    <p className="text-sm text-gray-600">
                      Help us measure how practice impacts test scores. Share
                      your standardized test results and commit to 2 hours
                      daily—earn <strong>$100 in credits every month</strong>!
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📋 Share test results</span>
                    <span>⏰ 2 hours daily</span>
                    <span>💰 $100/month credits</span>
                  </div>
                  <button
                    onClick={onOpenStudyModal}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Apply Now
                  </button>
                </>
              )}
            </div>
          )}

          {/* Analytics Content */}
          {activeTab === 'analytics' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Today&apos;s Progress
                </h3>
                {isGoalMet && (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle size={16} weight="fill" /> Goal met!
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Daily Goal: {dailyXP}/{dailyGoal} XP
              </p>

              {/* Progress bars */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-20">📐 Math</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{
                        width: `${(mathToday / DAILY_GOALS.math) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {mathToday}/{DAILY_GOALS.math}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-20">📖 Reading</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{
                        width: `${(readingToday / DAILY_GOALS.reading) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {readingToday}/{DAILY_GOALS.reading}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-20">
                    🏛️ Languages
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{
                        width: `${(classicalToday / DAILY_GOALS.classical) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {classicalToday}/{DAILY_GOALS.classical}
                  </span>
                </div>
              </div>

              {/* XP Summary */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Fire
                    size={18}
                    weight="fill"
                    className={isGoalMet ? 'text-green-500' : 'text-blue-500'}
                  />
                  <span className="font-semibold text-gray-900">
                    {dailyXP} / {dailyGoal} XP
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round((dailyXP / dailyGoal) * 100)}% of daily goal
                </span>
              </div>
            </div>
          )}

          {/* Review Content */}
          {activeTab === 'review' && (
            <div className="space-y-3">
              {!hasModel || totalDueCount === 0 ? (
                <div className="text-center py-2">
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                    <CheckCircle size={20} className="text-purple-500" />
                    <span>
                      {hasModel
                        ? 'All caught up!'
                        : 'No concepts to review yet!'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {hasModel
                      ? 'Great job! Check back later for more reviews.'
                      : "As you learn, we'll schedule reviews at optimal intervals to help you remember longer."}
                  </p>
                  {reviewStreak > 0 && (
                    <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100">
                      <Fire
                        size={16}
                        weight="fill"
                        className="text-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {reviewStreak} day streak
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {urgentCount > 0 && (
                          <Warning
                            size={16}
                            className="inline text-red-500 mr-1"
                            weight="fill"
                          />
                        )}
                        {totalDueCount} concept{totalDueCount !== 1 ? 's' : ''}{' '}
                        due
                      </h3>
                      <p className="text-sm text-gray-600">
                        {urgentCount > 0
                          ? `${urgentCount} overdue - review now to prevent forgetting!`
                          : 'Review to maintain retention'}
                      </p>
                    </div>
                    {reviewStreak > 0 && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-full">
                        <Fire
                          size={14}
                          weight="fill"
                          className="text-orange-500"
                        />
                        <span className="text-xs font-bold text-orange-600">
                          {reviewStreak}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Due items preview */}
                  {(overdueItems.length > 0 || dueNowItems.length > 0) && (
                    <div className="space-y-1">
                      {overdueItems.slice(0, 3).map((item) => (
                        <div
                          key={item.conceptId}
                          className="flex items-center gap-2 text-sm p-2 bg-red-50 rounded-lg"
                        >
                          <Warning
                            size={14}
                            className="text-red-500 flex-shrink-0"
                            weight="fill"
                          />
                          <span className="truncate flex-1">
                            {item.conceptName}
                          </span>
                          <span className="text-xs text-red-600 font-medium flex-shrink-0">
                            {item.currentRetention}% retention
                          </span>
                        </div>
                      ))}
                      {dueNowItems
                        .slice(0, Math.max(0, 3 - overdueItems.length))
                        .map((item) => (
                          <div
                            key={item.conceptId}
                            className="flex items-center gap-2 text-sm p-2 bg-purple-50 rounded-lg"
                          >
                            <Brain
                              size={14}
                              className="text-purple-500 flex-shrink-0"
                              weight="fill"
                            />
                            <span className="truncate flex-1">
                              {item.conceptName}
                            </span>
                            <span className="text-xs text-purple-600 font-medium flex-shrink-0">
                              {item.currentRetention}% retention
                            </span>
                          </div>
                        ))}
                      {totalDueCount > 3 && (
                        <p className="text-xs text-gray-500 pl-6">
                          +{totalDueCount - 3} more...
                        </p>
                      )}
                    </div>
                  )}

                  {schedule?.estimatedTimeMinutes && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      Estimated time: {schedule.estimatedTimeMinutes} minutes
                    </p>
                  )}

                  <button
                    onClick={onStartReview}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      urgentCount > 0
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <Brain size={18} weight="fill" />
                    Start Review
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

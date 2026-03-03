'use client'

import { useStudentAnalytics } from '@/lib/hooks/useAnalytics'
import { ArrowLeft, TrendUp, Target, Fire, ChartBar } from '@phosphor-icons/react'

interface StudentAnalyticsViewProps {
  learningPathId?: string
  onBack: () => void
}

export function StudentAnalyticsView({ learningPathId, onBack }: StudentAnalyticsViewProps) {
  const { analytics, loading, error } = useStudentAnalytics(learningPathId)

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <p className="text-sm text-red-600">{error || 'No analytics data available'}</p>
      </div>
    )
  }

  const maxDays = Math.max(...analytics.completionTrends.map(t => t.daysToComplete), 1)

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back
      </button>

      <h2 className="text-lg font-bold text-gray-900 mb-1">Learning Analytics</h2>
      <p className="text-xs text-gray-500 mb-6">Track your progress and identify areas for improvement</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{analytics.approvedDeliverables}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Approved</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{analytics.totalDeliverables}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-900">{analytics.avgReviewScore}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Avg Score</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <Fire size={16} className="text-orange-500 mb-1" />
          <p className="text-2xl font-bold text-gray-900">{analytics.streakData.currentStreak}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Day Streak</p>
        </div>
      </div>

      {/* Completion Trends */}
      {analytics.completionTrends.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendUp size={16} className="text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Completion Trends</h3>
          </div>
          <div className="flex items-end gap-1 h-32">
            {analytics.completionTrends.map((t, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gray-900 rounded-t"
                  style={{ height: `${Math.max(8, (t.daysToComplete / maxDays) * 100)}%` }}
                  title={`${t.title}: ${t.daysToComplete} days`}
                />
                <span className="text-[8px] text-gray-400 truncate w-full text-center">{t.daysToComplete}d</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Days to complete each deliverable</p>
        </div>
      )}

      {/* Subject Strengths */}
      {analytics.subjectStrengths.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Subject Strengths</h3>
          </div>
          <div className="space-y-3">
            {analytics.subjectStrengths.map((s) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{s.subject}</span>
                  <span className="text-xs text-gray-500">{s.avgScore}/5 ({s.count} reviews)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 rounded-full" style={{ width: `${(s.avgScore / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Streak & Estimated Completion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Fire size={16} className="text-orange-500" />
            <h3 className="text-sm font-semibold text-gray-900">Activity Streak</h3>
          </div>
          <p className="text-xs text-gray-600">Current: <span className="font-medium">{analytics.streakData.currentStreak} days</span></p>
          <p className="text-xs text-gray-600">Longest: <span className="font-medium">{analytics.streakData.longestStreak} days</span></p>
          <p className="text-xs text-gray-500 mt-1">Last active: {analytics.streakData.lastActiveDate}</p>
        </div>

        {analytics.estimatedCompletionDate && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <ChartBar size={16} className="text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-900">Estimated Completion</h3>
            </div>
            <p className="text-xs text-gray-600">
              At your current pace, you should finish by{' '}
              <span className="font-medium">
                {new Date(analytics.estimatedCompletionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

/**
 * AIReviewPanel Component
 *
 * Displays AI review results with feedback, strengths, improvements,
 * and criteria results.
 */

import {
  Robot,
  CheckCircle,
  XCircle,
  WarningCircle,
  Star,
  ArrowRight,
  ArrowClockwise,
  Trophy,
  Target,
  Lightbulb,
} from '@phosphor-icons/react'
import type {
  AIReview,
  IndependentStudyDisplay,
} from '@/lib/types/independent-study'

interface AIReviewPanelProps {
  study: IndependentStudyDisplay
  review: AIReview
  onProceedToProfessional: () => void
  onRetryProject: () => void
}

export function AIReviewPanel({
  study,
  review,
  onProceedToProfessional,
  onRetryProject,
}: AIReviewPanelProps) {
  const isPassed = review.status === 'passed'
  const score = review.overallScore || 0

  const getScoreColor = () => {
    if (score >= 90) return 'text-emerald-600'
    if (score >= 70) return 'text-amber-600'
    return 'text-red-600'
  }

  const getScoreBg = () => {
    if (score >= 90) return 'bg-emerald-100'
    if (score >= 70) return 'bg-amber-100'
    return 'bg-red-100'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-5 border-b border-gray-200"
        style={{
          background: isPassed
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Robot size={28} color="white" weight="fill" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                AI Review Complete
              </h2>
              <p className="text-white/80 text-sm">
                {isPassed ? 'Your project passed!' : 'Some improvements needed'}
              </p>
            </div>
          </div>

          {/* Score Badge */}
          <div className={`px-5 py-3 rounded-xl ${getScoreBg()}`}>
            <div className={`text-3xl font-bold ${getScoreColor()}`}>
              {score}
            </div>
            <div className="text-xs text-gray-500 text-center">/ 100</div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2">Overall Feedback</h3>
        <p className="text-gray-600">{review.feedback}</p>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Strengths */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <Star size={20} weight="fill" className="text-emerald-500" />
            <h3 className="font-semibold text-gray-700">Strengths</h3>
          </div>
          {review.strengths && review.strengths.length > 0 ? (
            <ul className="space-y-2">
              {review.strengths.map((strength, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <CheckCircle
                    size={16}
                    weight="fill"
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  {strength}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No specific strengths noted</p>
          )}
        </div>

        {/* Improvements */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={20} weight="fill" className="text-amber-500" />
            <h3 className="font-semibold text-gray-700">
              Areas for Improvement
            </h3>
          </div>
          {review.improvements && review.improvements.length > 0 ? (
            <ul className="space-y-2">
              {review.improvements.map((improvement, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <WarningCircle
                    size={16}
                    className="text-amber-500 mt-0.5 flex-shrink-0"
                  />
                  {improvement}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No improvements suggested</p>
          )}
        </div>
      </div>

      {/* Criteria Results */}
      {review.criteriaResults && review.criteriaResults.length > 0 && (
        <div className="px-6 py-5 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-violet-500" />
            <h3 className="font-semibold text-gray-700">Assessment Criteria</h3>
          </div>
          <div className="space-y-3">
            {review.criteriaResults.map((result, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg ${
                  result.met ? 'bg-emerald-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.met ? (
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-emerald-500 flex-shrink-0"
                    />
                  ) : (
                    <XCircle
                      size={20}
                      weight="fill"
                      className="text-red-500 flex-shrink-0"
                    />
                  )}
                  <div>
                    <div
                      className={`font-medium text-sm ${
                        result.met ? 'text-emerald-800' : 'text-red-800'
                      }`}
                    >
                      {result.criterion}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        result.met ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {result.feedback}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* XP Earned */}
      {isPassed && (
        <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-200 flex items-center justify-center gap-3">
          <Trophy size={24} weight="fill" className="text-emerald-500" />
          <span className="font-semibold text-emerald-700">
            +200 XP earned for passing AI review!
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-5 bg-white border-t border-gray-200">
        {isPassed ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 text-center mb-4">
              Excellent work! Your project has been approved by our AI reviewer.
              The next step is to get sign-off from a real professional in the
              field.
            </p>
            <button
              onClick={onProceedToProfessional}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all cursor-pointer shadow-lg"
              style={{ boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)' }}
            >
              Continue to Professional Review
              <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 text-center mb-4">
              Your project needs some improvements before proceeding. Review the
              feedback above and make the necessary changes.
            </p>
            <button
              onClick={onRetryProject}
              className="w-full py-3 bg-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all cursor-pointer"
            >
              <ArrowClockwise size={20} weight="bold" />
              Return to Project
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

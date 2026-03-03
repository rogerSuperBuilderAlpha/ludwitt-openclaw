'use client'

/**
 * ExplanationFeedback Component
 *
 * Provides AI-powered feedback on the QUALITY of student explanations,
 * not just correctness of answers.
 *
 * Addresses learning science gap: No feedback on explanation quality,
 * students don't know how to improve their reasoning.
 *
 * Features:
 * - Quality rating (1-5 stars)
 * - Specific improvement suggestions
 * - Example of better explanation
 * - Encouragement for growth
 */

import { useState } from 'react'
import {
  Star,
  ArrowUp,
  Lightbulb,
  CheckCircle,
  TrendUp,
  BookOpen,
  Brain,
} from '@phosphor-icons/react'

export interface ExplanationQuality {
  rating: 1 | 2 | 3 | 4 | 5
  strengths: string[]
  improvements: string[]
  exampleBetter?: string
  overallFeedback: string
}

interface ExplanationFeedbackProps {
  studentExplanation: string
  quality: ExplanationQuality
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  onDismiss: () => void
  onTryAgain?: () => void
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((level) => (
        <Star
          key={level}
          size={20}
          weight={level <= rating ? 'fill' : 'regular'}
          className={level <= rating ? 'text-amber-400' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

const RATING_LABELS = {
  1: 'Needs More Detail',
  2: 'Getting Started',
  3: 'Good Effort',
  4: 'Strong Explanation',
  5: 'Excellent Reasoning',
}

const RATING_COLORS = {
  1: 'red',
  2: 'amber',
  3: 'amber',
  4: 'emerald',
  5: 'emerald',
}

export function ExplanationFeedback({
  studentExplanation,
  quality,
  subject,
  onDismiss,
  onTryAgain,
}: ExplanationFeedbackProps) {
  const [expanded, setExpanded] = useState(false)

  const ratingColor = RATING_COLORS[quality.rating]
  const isGood = quality.rating >= 4

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isGood
          ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'
          : 'bg-gradient-to-br from-amber-50 to-white border-amber-200'
      }`}
    >
      {/* Header */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between ${
          isGood
            ? 'bg-emerald-100 border-emerald-200'
            : 'bg-amber-100 border-amber-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Brain
            size={20}
            weight="fill"
            className={isGood ? 'text-emerald-600' : 'text-amber-600'}
          />
          <span className="font-bold text-gray-900">Explanation Feedback</span>
        </div>
        <StarRating rating={quality.rating} />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${
            isGood
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {isGood ? (
            <CheckCircle size={16} weight="fill" />
          ) : (
            <TrendUp size={16} weight="fill" />
          )}
          <span className="font-medium text-sm">
            {RATING_LABELS[quality.rating]}
          </span>
        </div>

        {/* Overall Feedback */}
        <p className="text-gray-700 mb-4">{quality.overallFeedback}</p>

        {/* Your Explanation */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Your Explanation:
          </div>
          <p className="text-gray-700 text-sm italic">
            &ldquo;{studentExplanation}&rdquo;
          </p>
        </div>

        {/* Strengths */}
        {quality.strengths.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-700 mb-2">
              <CheckCircle size={14} weight="fill" />
              What you did well:
            </div>
            <ul className="space-y-1">
              {quality.strengths.map((strength, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-emerald-500 mt-1">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {quality.improvements.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 text-sm font-medium text-amber-700 mb-2">
              <ArrowUp size={14} weight="fill" />
              How to improve:
            </div>
            <ul className="space-y-1">
              {quality.improvements.map((improvement, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-amber-500 mt-1">•</span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Example Better Explanation */}
        {quality.exampleBetter && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-700 mb-1">
                <Lightbulb size={14} weight="fill" />
                Example of a stronger explanation
                <span className="text-xs ml-auto">{expanded ? '▲' : '▼'}</span>
              </div>

              {expanded && (
                <p className="text-sm text-blue-800 mt-2 italic">
                  &ldquo;{quality.exampleBetter}&rdquo;
                </p>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          💡 Better explanations = deeper understanding
        </p>

        <div className="flex gap-2">
          {onTryAgain && quality.rating < 3 && (
            <button
              onClick={onTryAgain}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          )}
          <button
            onClick={onDismiss}
            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

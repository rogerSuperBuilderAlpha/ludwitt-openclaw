'use client'

import type { PathRecommendation } from '@/lib/types/university'
import { ArrowRight } from '@phosphor-icons/react'

interface RecommendationCardProps {
  recommendation: PathRecommendation
  onSelect: () => void
}

const difficultyStyles: Record<string, string> = {
  beginner: 'bg-green-50 text-green-700',
  intermediate: 'bg-amber-50 text-amber-700',
  advanced: 'bg-red-50 text-red-700',
}

export function RecommendationCard({ recommendation, onSelect }: RecommendationCardProps) {
  const { targetTopic, reason, matchScore, skillsGained, difficulty } = recommendation

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{targetTopic}</h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${difficultyStyles[difficulty] || difficultyStyles.intermediate}`}
            >
              {difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{reason}</p>
        </div>

        <button
          onClick={onSelect}
          className="flex-shrink-0 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label={`View path: ${targetTopic}`}
        >
          <ArrowRight size={16} className="text-gray-700" />
        </button>
      </div>

      {/* Match score bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Match</span>
          <span>{matchScore}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all"
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </div>

      {/* Skills gained */}
      {skillsGained.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {skillsGained.map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

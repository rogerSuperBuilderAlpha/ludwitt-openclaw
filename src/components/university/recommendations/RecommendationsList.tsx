'use client'

import { useRecommendations } from '@/lib/hooks/useRecommendations'
import { RecommendationCard } from './RecommendationCard'
import { ArrowLeft, Sparkle, Lightning } from '@phosphor-icons/react'

interface RecommendationsListProps {
  onSelectPath: (pathId: string) => void
  onBack: () => void
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 animate-pulse">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 bg-gray-200 rounded w-40" />
            <div className="h-5 bg-gray-100 rounded-full w-20" />
          </div>
          <div className="h-3 bg-gray-100 rounded w-full mb-3" />
          <div className="h-1.5 bg-gray-100 rounded-full w-full mb-3" />
          <div className="flex gap-1">
            <div className="h-5 bg-gray-100 rounded-full w-16" />
            <div className="h-5 bg-gray-100 rounded-full w-20" />
            <div className="h-5 bg-gray-100 rounded-full w-14" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function RecommendationsList({ onSelectPath, onBack }: RecommendationsListProps) {
  const { recommendations, loading, error, refresh } = useRecommendations()

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkle size={20} weight="fill" className="text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Recommended For You</h2>
          </div>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {/* Based-on summary */}
      {recommendations && recommendations.basedOn && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Lightning size={14} className="text-gray-400" />
          <span>
            Based on {recommendations.basedOn.completedPaths} completed path{recommendations.basedOn.completedPaths !== 1 ? 's' : ''}
            {recommendations.basedOn.topSkills.length > 0 && (
              <> in {recommendations.basedOn.topSkills.join(', ')}</>
            )}
            {recommendations.basedOn.profession && (
              <> &middot; Goal: {recommendations.basedOn.profession}</>
            )}
          </span>
        </div>
      )}

      {/* Content */}
      {loading && <LoadingSkeleton />}

      {error && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Failed to load recommendations</p>
          <p className="text-xs text-gray-400 mb-3">{error}</p>
          <button
            onClick={refresh}
            className="text-sm text-gray-700 hover:text-gray-900 underline"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && recommendations && recommendations.recommendations.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
          <Sparkle size={24} className="text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500 mb-1">No recommendations available</p>
          <p className="text-xs text-gray-400">
            Complete more paths or check back when new paths are published.
          </p>
        </div>
      )}

      {!loading && !error && recommendations && recommendations.recommendations.length > 0 && (
        <div className="space-y-3">
          {recommendations.recommendations.map((rec) => (
            <RecommendationCard
              key={rec.pathId}
              recommendation={rec}
              onSelect={() => onSelectPath(rec.pathId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

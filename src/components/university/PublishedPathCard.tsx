'use client'

import { useState } from 'react'
import { User, Books, Check, CaretDown, CaretUp, Briefcase, ChalkboardTeacher, Crown, Eye, EyeSlash } from '@phosphor-icons/react'
import type { PublishedPathSummary } from '@/lib/types/university'

interface PublishedPathCardProps {
  path: PublishedPathSummary
  alreadyJoined: boolean
  isJoining: boolean
  onJoin: () => void
  onToggleAnonymous?: (creatorAnonymous: boolean) => void
  isTogglingAnonymous?: boolean
}

export function PublishedPathCard({ path, alreadyJoined, isJoining, onJoin, onToggleAnonymous, isTogglingAnonymous }: PublishedPathCardProps) {
  const [expanded, setExpanded] = useState(false)
  const hasCourses = path.courseTitles && path.courseTitles.length > 0

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{path.targetTopic}</h3>
            {path.targetDescription && (
              <p className="text-xs text-gray-500 mb-3">{path.targetDescription}</p>
            )}
            {path.professors && path.professors.length > 0 && (
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <ChalkboardTeacher size={12} weight="bold" className="text-gray-400 shrink-0" />
                {path.professors.map(p => p.name).join(', ')}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <User size={12} weight="bold" />
                {path.creatorName}
              </span>
              <span className="flex items-center gap-1">
                <Books size={12} weight="bold" />
                {path.courseCount} courses
              </span>
              {path.levelRange && (
                <span className="text-gray-400">
                  {path.levelRange.min === path.levelRange.max
                    ? `Level ${path.levelRange.min}`
                    : `Levels ${path.levelRange.min}–${path.levelRange.max}`}
                </span>
              )}
              {hasCourses && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-0.5 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {expanded ? <CaretUp size={12} /> : <CaretDown size={12} />}
                  {expanded ? 'Hide' : 'View'} topics
                </button>
              )}
            </div>
            {(path.profession || (path.tags && path.tags.length > 0)) && (
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                {path.profession && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Briefcase size={10} weight="bold" />
                    {path.profession}
                  </span>
                )}
                {path.tags?.map(tag => (
                  <span key={tag} className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="shrink-0 flex items-center gap-2">
            {path.isOwner ? (
              <>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg">
                  <Crown size={12} weight="bold" />
                  Your Path
                </span>
                {onToggleAnonymous && (
                  <button
                    onClick={() => onToggleAnonymous(!path.creatorAnonymous)}
                    disabled={isTogglingAnonymous}
                    title={path.creatorAnonymous ? 'Show your name' : 'Hide your name'}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {path.creatorAnonymous ? <EyeSlash size={14} weight="bold" /> : <Eye size={14} weight="bold" />}
                  </button>
                )}
              </>
            ) : alreadyJoined ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
                <Check size={12} weight="bold" />
                Joined
              </span>
            ) : (
              <button
                onClick={onJoin}
                disabled={isJoining}
                className="text-xs font-medium bg-gray-900 text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isJoining ? 'Joining...' : 'Join'}
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && hasCourses && (
        <div className="border-t border-gray-100 px-5 py-3">
          <ol className="space-y-1">
            {path.courseTitles.map((title, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-baseline gap-2">
                <span className="text-gray-400 font-medium shrink-0">{i + 1}.</span>
                {title}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

/* eslint-disable jsx-a11y/no-autofocus */
'use client'

import { useState, useMemo } from 'react'
import { ArrowLeft, MagnifyingGlass } from '@phosphor-icons/react'
import { PublishedPathCard } from './PublishedPathCard'
import type { PublishedPathSummary } from '@/lib/types/university'

interface TopicInputFormProps {
  onSubmit: (topic: string, description?: string) => void
  onBack: () => void
  isLoading: boolean
  publishedPaths?: PublishedPathSummary[]
  joinedSourceIds?: Set<string>
  joiningPathId?: string | null
  onJoin?: (pathId: string) => void
  onToggleAnonymous?: (pathId: string, creatorAnonymous: boolean) => void
  isTogglingAnonymous?: boolean
}

export function TopicInputForm({
  onSubmit,
  onBack,
  isLoading,
  publishedPaths = [],
  joinedSourceIds = new Set(),
  joiningPathId = null,
  onJoin,
  onToggleAnonymous,
  isTogglingAnonymous,
}: TopicInputFormProps) {
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')

  // Match published paths against the current topic input
  const matchingPaths = useMemo(() => {
    const q = topic.trim().toLowerCase()
    if (q.length < 3 || publishedPaths.length === 0) return []
    return publishedPaths
      .filter((p) => {
        const haystack = [
          p.targetTopic,
          ...(p.tags || []),
          ...(p.courseTitles || []),
          ...(p.professors || []).map((pr) => pr.name),
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
      .slice(0, 5)
  }, [topic, publishedPaths])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = topic.trim()
    if (trimmed.length < 2) return
    onSubmit(trimmed, description.trim() || undefined)
  }

  const isValid = topic.trim().length >= 2

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-1">
        What do you want to study?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Enter any academic topic. We&apos;ll design a learning path with
        prerequisite courses and hands-on deliverables for you to build.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Nuclear Fusion, Byzantine History, Compiler Design"
            maxLength={200}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            disabled={isLoading}
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Why do you want to study this?
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share your motivation or what you hope to achieve..."
            rows={3}
            maxLength={500}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            disabled={isLoading}
          />
        </div>

        {/* Pre-creation search results */}
        {matchingPaths.length > 0 && onJoin && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <MagnifyingGlass size={14} className="text-gray-500" />
              <p className="text-xs font-medium text-gray-700">
                Similar paths already exist — join one to save credits, or
                create your own below.
              </p>
            </div>
            <div className="space-y-2">
              {matchingPaths.map((path) => (
                <PublishedPathCard
                  key={path.id}
                  path={path}
                  alreadyJoined={joinedSourceIds.has(path.id)}
                  isJoining={joiningPathId === path.id}
                  onJoin={() => onJoin(path.id)}
                  onToggleAnonymous={
                    path.isOwner && onToggleAnonymous
                      ? (val) => onToggleAnonymous(path.id, val)
                      : undefined
                  }
                  isTogglingAnonymous={isTogglingAnonymous}
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate Learning Path
        </button>

        <p className="text-xs text-gray-400 text-center">
          This will use credits to generate your personalized course curriculum.
        </p>
      </form>
    </div>
  )
}

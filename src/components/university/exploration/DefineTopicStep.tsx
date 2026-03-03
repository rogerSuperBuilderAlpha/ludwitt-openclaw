/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState } from 'react'
import { CircleNotch } from '@phosphor-icons/react'

interface DefineTopicStepProps {
  onSubmit: (topic: string, scope?: string) => void
  isLoading: boolean
  initialTopic?: string
  initialScope?: string
}

export function DefineTopicStep({
  onSubmit,
  isLoading,
  initialTopic,
  initialScope,
}: DefineTopicStepProps) {
  const [topic, setTopic] = useState(initialTopic || '')
  const [scope, setScope] = useState(initialScope || '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!topic.trim() || topic.trim().length < 3) return
    onSubmit(topic.trim(), scope.trim() || undefined)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1">
          What topic would you like to explore?
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Quantum Computing, Machine Learning Ethics, CRISPR Gene Editing..."
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Scope or focus (optional)
          <span className="text-gray-400 font-normal ml-1">
            ({scope.length}/300)
          </span>
        </label>
        <textarea
          value={scope}
          onChange={(e) => setScope(e.target.value.slice(0, 300))}
          placeholder="Narrow the focus or describe what angle interests you..."
          rows={2}
          maxLength={300}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || topic.trim().length < 3}
        className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading && <CircleNotch size={14} className="animate-spin" />}
        {isLoading ? 'Generating Questions...' : 'Generate Research Questions'}
      </button>
    </form>
  )
}

/* eslint-disable jsx-a11y/no-autofocus */
'use client'

import { useState } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'

interface IdeaCreateFormProps {
  type: 'business' | 'thesis'
  onSubmit: (input: string, description?: string) => void
  onBack: () => void
  isLoading: boolean
}

const CONFIG = {
  business: {
    heading: 'New Business Idea',
    subtitle:
      "Name your business concept. You'll submit Google Drive documents for each required section.",
    inputLabel: 'Concept',
    inputPlaceholder:
      'e.g., AI-powered tutoring marketplace, Sustainable packaging subscription',
    buttonText: 'Create Draft',
  },
  thesis: {
    heading: 'New Thesis Idea',
    subtitle:
      "Name your research topic. You'll submit Google Drive documents for each required section.",
    inputLabel: 'Topic',
    inputPlaceholder:
      'e.g., Impact of social media on adolescent mental health, Quantum error correction',
    buttonText: 'Create Draft',
  },
}

export function IdeaCreateForm({
  type,
  onSubmit,
  onBack,
  isLoading,
}: IdeaCreateFormProps) {
  const [input, setInput] = useState('')
  const [description, setDescription] = useState('')
  const config = CONFIG[type]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed.length < 2) return
    onSubmit(trimmed, description.trim() || undefined)
  }

  const isValid = input.trim().length >= 2

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-1">{config.heading}</h2>
      <p className="text-sm text-gray-500 mb-6">{config.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="idea-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {config.inputLabel}
          </label>
          <input
            id="idea-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.inputPlaceholder}
            maxLength={200}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            disabled={isLoading}
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="idea-description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <textarea
            id="idea-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any additional context about your idea..."
            rows={3}
            maxLength={500}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Creating...' : config.buttonText}
        </button>
      </form>
    </div>
  )
}

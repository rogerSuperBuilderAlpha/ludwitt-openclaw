'use client'

/**
 * EtymologyConnection Component
 *
 * Shows connections between Latin/Greek words and their English derivatives.
 * Addresses learning science gap: words are learned in isolation without
 * semantic mapping or etymology connections.
 *
 * Research: Stahl & Fairbanks (2005) - Semantic mapping improves
 * vocabulary retention 30-40%.
 *
 * Appears during:
 * - Reading passages (when words with Latin/Greek roots appear)
 * - Latin/Greek lessons (after successful translation)
 */

import { useState } from 'react'
import {
  LinkSimple,
  BookOpen,
  Columns,
  Flask,
  X,
  ArrowRight,
  Sparkle,
  Info,
} from '@phosphor-icons/react'

export interface EtymologyData {
  sourceWord: string
  sourceLanguage: 'latin' | 'greek'
  sourceMeaning: string
  englishDerivatives: {
    word: string
    meaning: string
    connection: string // How it relates to source
  }[]
  rootMeaning: string
  funFact?: string
}

interface EtymologyConnectionProps {
  etymology: EtymologyData
  onDismiss: () => void
  onExplore?: () => void
  variant?: 'inline' | 'popup' | 'card'
  className?: string
}

export function EtymologyConnection({
  etymology,
  onDismiss,
  onExplore,
  variant = 'card',
  className = '',
}: EtymologyConnectionProps) {
  const [expanded, setExpanded] = useState(false)

  const langConfig =
    etymology.sourceLanguage === 'latin'
      ? {
          icon: <Columns size={16} weight="fill" />,
          color: 'amber',
          label: 'Latin',
        }
      : {
          icon: <Flask size={16} weight="fill" />,
          color: 'purple',
          label: 'Greek',
        }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <LinkSimple size={14} className={`text-${langConfig.color}-600`} />
        <span className="text-gray-600">
          &ldquo;{etymology.sourceWord}&rdquo; ({langConfig.label}) →
        </span>
        <span className="font-medium text-gray-900">
          {etymology.englishDerivatives
            .slice(0, 2)
            .map((d) => d.word)
            .join(', ')}
        </span>
        {etymology.englishDerivatives.length > 2 && (
          <button
            onClick={() => setExpanded(true)}
            className={`text-${langConfig.color}-600 hover:underline`}
          >
            +{etymology.englishDerivatives.length - 2} more
          </button>
        )}
      </div>
    )
  }

  if (variant === 'popup') {
    return (
      <div
        className={`bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-sm ${className}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <LinkSimple size={18} className={`text-${langConfig.color}-600`} />
            <span className="font-bold text-gray-900">Word Connection</span>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        <div
          className={`bg-${langConfig.color}-50 rounded-lg p-3 mb-3 border border-${langConfig.color}-200`}
        >
          <div className="flex items-center gap-2 mb-1">
            {langConfig.icon}
            <span
              className={`text-sm font-medium text-${langConfig.color}-700`}
            >
              {langConfig.label}
            </span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {etymology.sourceWord}
          </div>
          <div className="text-sm text-gray-600">
            &ldquo;{etymology.sourceMeaning}&rdquo;
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            English Words from This Root:
          </div>
          <div className="space-y-2">
            {etymology.englishDerivatives.slice(0, 3).map((derivative, i) => (
              <div key={i} className="flex items-start gap-2">
                <ArrowRight
                  size={12}
                  className="text-gray-400 mt-1 flex-shrink-0"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    {derivative.word}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {' '}
                    - {derivative.meaning}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {etymology.funFact && (
          <div className="bg-blue-50 rounded-lg p-2 text-xs text-blue-700">
            💡 {etymology.funFact}
          </div>
        )}
      </div>
    )
  }

  // Card variant (default)
  return (
    <div
      className={`bg-gradient-to-br from-${langConfig.color}-50 to-white rounded-xl border border-${langConfig.color}-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div
        className={`px-4 py-3 bg-${langConfig.color}-100 border-b border-${langConfig.color}-200 flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <LinkSimple
            size={18}
            weight="bold"
            className={`text-${langConfig.color}-600`}
          />
          <span className="font-bold text-gray-900">
            Word Connection Discovered!
          </span>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-white/50 rounded-full transition-colors"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Source Word */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-16 h-16 rounded-xl bg-${langConfig.color}-100 flex flex-col items-center justify-center border border-${langConfig.color}-200`}
          >
            {langConfig.icon}
            <span
              className={`text-[10px] font-medium text-${langConfig.color}-700 mt-1`}
            >
              {langConfig.label}
            </span>
          </div>
          <div>
            <div
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: 'serif' }}
            >
              {etymology.sourceWord}
            </div>
            <div className="text-gray-600">
              &ldquo;{etymology.sourceMeaning}&rdquo;
            </div>
          </div>
        </div>

        {/* Root Meaning */}
        <div className="bg-white rounded-lg p-3 border border-gray-200 mb-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Root Meaning
          </div>
          <div className="text-gray-900 font-medium">
            {etymology.rootMeaning}
          </div>
        </div>

        {/* English Derivatives */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              English Derivatives
            </span>
          </div>
          <div className="grid gap-2">
            {etymology.englishDerivatives.map((derivative, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-3 border border-gray-200 flex items-start gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-full bg-${langConfig.color}-100 flex items-center justify-center flex-shrink-0`}
                >
                  <ArrowRight
                    size={14}
                    className={`text-${langConfig.color}-600`}
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {derivative.word}
                  </div>
                  <div className="text-sm text-gray-600">
                    {derivative.meaning}
                  </div>
                  <div className={`text-xs text-${langConfig.color}-600 mt-1`}>
                    {derivative.connection}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Fact */}
        {etymology.funFact && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 flex items-start gap-2">
            <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">{etymology.funFact}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          💡 Etymology helps you remember words longer!
        </p>
        {onExplore && (
          <button
            onClick={onExplore}
            className={`text-sm font-medium text-${langConfig.color}-600 hover:text-${langConfig.color}-700 flex items-center gap-1`}
          >
            Explore More
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  )
}

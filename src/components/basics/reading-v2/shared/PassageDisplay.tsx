/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * Passage Display Component
 *
 * Renders a reading passage with optional features:
 * - Clickable words for vocabulary lookup
 * - Highlighting for text evidence
 * - Background knowledge display
 * - Text structure indicators
 */

import { useState, useCallback } from 'react'
import { Info, Lightbulb } from '@phosphor-icons/react'

interface PassageDisplayProps {
  passage: string
  title?: string
  author?: string
  source?: string
  backgroundKnowledge?: string
  textStructure?: string
  targetVocabulary?: Array<{
    word: string
    definition: string
  }>
  onWordClick?: (word: string) => void
  highlightWords?: string[]
  className?: string
}

export function PassageDisplay({
  passage,
  title,
  author,
  source,
  backgroundKnowledge,
  textStructure,
  targetVocabulary = [],
  onWordClick,
  highlightWords = [],
  className = '',
}: PassageDisplayProps) {
  const [showBackground, setShowBackground] = useState(false)

  // Get vocabulary words for highlighting
  const vocabWords = targetVocabulary.map((v) => v.word.toLowerCase())

  // Render passage with clickable/highlighted words
  const renderPassage = useCallback(() => {
    // Split passage into words while preserving whitespace and punctuation
    const words = passage.split(/(\s+)/)

    return words.map((segment, index) => {
      // If it's whitespace, render as-is
      if (/^\s+$/.test(segment)) {
        return <span key={index}>{segment}</span>
      }

      // Extract the word without punctuation for matching
      const wordMatch = segment.match(/^([^a-zA-Z]*)([a-zA-Z'-]+)([^a-zA-Z]*)$/)
      if (!wordMatch) {
        return <span key={index}>{segment}</span>
      }

      const [, prefix, word, suffix] = wordMatch
      const lowerWord = word.toLowerCase()

      // Check if word is a vocabulary word
      const isVocabWord = vocabWords.includes(lowerWord)

      // Check if word should be highlighted
      const isHighlighted = highlightWords.some(
        (hw) => hw.toLowerCase() === lowerWord
      )

      // Determine styling
      let wordClass = ''
      let wordStyle: React.CSSProperties = {}

      if (isVocabWord) {
        wordClass =
          'cursor-pointer underline decoration-dotted decoration-2 hover:bg-yellow-100 transition-colors'
        wordStyle = { textDecorationColor: 'var(--b-writing)' }
      } else if (isHighlighted) {
        wordClass = 'bg-yellow-200 px-0.5 rounded'
      } else if (onWordClick) {
        wordClass = 'cursor-pointer hover:bg-gray-100 rounded transition-colors'
      }

      const handleClick = () => {
        if (onWordClick) {
          onWordClick(word)
        }
      }

      return (
        <span key={index}>
          {prefix}
          <span
            className={wordClass}
            style={wordStyle}
            onClick={handleClick}
            title={isVocabWord ? 'Click to see definition' : undefined}
          >
            {word}
          </span>
          {suffix}
        </span>
      )
    })
  }, [passage, vocabWords, highlightWords, onWordClick])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Background Knowledge Section */}
      {backgroundKnowledge && (
        <div className="mb-4">
          <button
            onClick={() => setShowBackground(!showBackground)}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--b-reading-dark)' }}
          >
            <Lightbulb size={18} weight="duotone" />
            <span>Background Knowledge</span>
            <span className="text-xs b-text-muted">
              {showBackground ? '(click to hide)' : '(click to show)'}
            </span>
          </button>

          {showBackground && (
            <div
              className="mt-2 p-3 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--b-reading-light)',
                borderLeft: '3px solid var(--b-reading)',
              }}
            >
              {backgroundKnowledge}
            </div>
          )}
        </div>
      )}

      {/* Title & Attribution */}
      {(title || author) && (
        <div className="mb-3">
          {title && (
            <h3 className="text-lg font-semibold b-text-primary">{title}</h3>
          )}
          {author && <p className="text-sm b-text-secondary">by {author}</p>}
          {source && (
            <p className="text-xs b-text-muted italic">Source: {source}</p>
          )}
        </div>
      )}

      {/* Text Structure Badge */}
      {textStructure && (
        <div className="flex items-center gap-2 mb-3">
          <Info size={14} className="b-text-muted" />
          <span className="text-xs b-text-muted">
            Text Structure:{' '}
            <span className="font-medium capitalize">
              {textStructure.replace('-', ' ')}
            </span>
          </span>
        </div>
      )}

      {/* Passage */}
      <div
        className="max-h-80 overflow-y-auto rounded-lg p-4 text-base leading-relaxed"
        style={{ backgroundColor: '#ffffff', color: 'var(--b-text-primary)' }}
      >
        <p className="whitespace-pre-wrap">{renderPassage()}</p>
      </div>

      {/* Vocabulary Legend */}
      {targetVocabulary.length > 0 && (
        <div className="flex items-center gap-2 text-xs b-text-muted">
          <span
            className="underline decoration-dotted decoration-2"
            style={{ textDecorationColor: 'var(--b-writing)' }}
          >
            Underlined words
          </span>
          <span>are vocabulary words - click to learn their meanings</span>
        </div>
      )}
    </div>
  )
}

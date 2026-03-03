'use client'

import { useEffect, useState } from 'react'
import { CaretDown, CaretUp, Sparkle } from '@phosphor-icons/react'
import { ParsingElement } from '@/lib/types/basics'

interface ParsingSectionProps {
  showParsing: boolean
  onToggle: () => void
  parsing: Record<string, string>
  onParsingChange: (word: string, value: string) => void
  parsingElements: ParsingElement[]
  aiParsingElements: ParsingElement[]
  isGeneratingParsing: boolean
  onGenerateParsing: () => void
}

export function ParsingSection({
  showParsing,
  onToggle,
  parsing,
  onParsingChange,
  parsingElements,
  aiParsingElements,
  isGeneratingParsing,
  onGenerateParsing,
}: ParsingSectionProps) {
  const [showNudge, setShowNudge] = useState(false)
  const elementsToUse =
    parsingElements && parsingElements.length > 0
      ? parsingElements
      : aiParsingElements

  useEffect(() => {
    if (showParsing) return
    if (typeof window === 'undefined') return
    const seen = window.localStorage.getItem('parsing_nudge_seen') === 'true'
    if (seen) return

    setShowNudge(true)
    window.localStorage.setItem('parsing_nudge_seen', 'true')
    const timeoutId = window.setTimeout(() => setShowNudge(false), 6000)
    return () => window.clearTimeout(timeoutId)
  }, [showParsing])

  return (
    <div className="border b-border rounded-lg overflow-hidden">
      {!showParsing && showNudge && (
        <div className="px-4 py-2 b-bg-writing-light b-text-writing text-xs flex items-center gap-2">
          <Sparkle size={12} />
          Earn bonus XP by showing your parsing
        </div>
      )}
      <button
        onClick={onToggle}
        className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
          showNudge ? 'b-bg-writing-light' : 'b-bg-muted hover:b-bg-muted'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <span className="font-medium">Show Your Parsing</span>
          <span className="text-xs b-bg-writing-light b-text-writing px-2 py-0.5 rounded-full">
            Earn up to 1.5x
          </span>
        </div>
        {showParsing ? <CaretUp size={20} /> : <CaretDown size={20} />}
      </button>

      {showParsing && (
        <div className="p-4 space-y-3 b-bg-card">
          <p className="text-sm b-text-secondary">
            Identify the grammatical function of each word to earn bonus XP:
          </p>
          {(() => {
            if (isGeneratingParsing) {
              return (
                <div className="flex items-center gap-3 text-sm b-text-muted">
                  <div className="w-4 h-4 border-2 b-border-logic border-t-transparent rounded-full animate-spin" />
                  Generating grammar parsing via AI...
                </div>
              )
            }

            if (elementsToUse.length > 0) {
              return elementsToUse.map((elem) => (
                <div key={elem.word} className="flex items-center gap-3">
                  <span className="font-medium b-text-primary w-24">
                    {elem.word}:
                  </span>
                  <select
                    value={parsing[elem.word] || ''}
                    onChange={(e) => onParsingChange(elem.word, e.target.value)}
                    className="flex-1 px-3 py-2 border b-border rounded-lg text-sm"
                  >
                    <option value="">Select parsing...</option>
                    {elem.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            }

            return (
              <div className="text-sm b-text-muted">
                <p className="italic mb-2">
                  Parsing could not be generated for this sentence.
                </p>
                <button
                  onClick={onGenerateParsing}
                  className="b-text-logic hover:b-text-logic font-medium flex items-center gap-1"
                >
                  <Sparkle size={14} />
                  Try generating again
                </button>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}

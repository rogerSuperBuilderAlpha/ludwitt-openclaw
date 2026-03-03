/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

/**
 * AILookupPanel Component
 *
 * Panel for AI-powered word lookup.
 */

import { DictionaryEntry } from '@/lib/data/latin-dictionary'
import { Sparkle, MagnifyingGlass, Check, Plus } from '@phosphor-icons/react'

interface AILookupPanelProps {
  language: 'latin' | 'greek'
  aiWord: string
  onAiWordChange: (value: string) => void
  aiSentence: string
  onAiSentenceChange: (value: string) => void
  aiLookupLoading: boolean
  aiResult: DictionaryEntry | null
  aiError: string | null
  hasEnoughCredits: boolean
  balanceFormatted: string
  onLookup: () => void
  onAddToPersonal: (entry: DictionaryEntry) => void
}

export function AILookupPanel({
  language,
  aiWord,
  onAiWordChange,
  aiSentence,
  onAiSentenceChange,
  aiLookupLoading,
  aiResult,
  aiError,
  hasEnoughCredits,
  onLookup,
  onAddToPersonal,
}: AILookupPanelProps) {
  return (
    <div className="p-4 b-bg-writing-light border-b b-border-writing">
      <div className="flex items-start gap-3">
        <Sparkle
          size={24}
          weight="fill"
          className="text-b-writing flex-shrink-0 mt-1"
        />
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold b-text-writing">AI Word Lookup</h3>
            <p className="text-xs b-text-writing">
              Can&apos;t find a word? Let AI help you look it up.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium b-text-writing mb-1">
                Word to look up
              </label>
              <input
                type="text"
                value={aiWord}
                onChange={(e) => onAiWordChange(e.target.value)}
                placeholder={
                  language === 'latin' ? 'e.g., amabam' : 'e.g., ἔλεγον'
                }
                className="w-full px-3 py-2 text-sm border b-border-writing rounded-lg focus:ring-2 focus:ring-b-writing b-bg-card"
              />
            </div>
            <div>
              <label className="block text-xs font-medium b-text-writing mb-1">
                Sentence where you found it
              </label>
              <input
                type="text"
                value={aiSentence}
                onChange={(e) => onAiSentenceChange(e.target.value)}
                placeholder="Paste the full sentence here..."
                className="w-full px-3 py-2 text-sm border b-border-writing rounded-lg focus:ring-2 focus:ring-b-writing b-bg-card"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLookup}
              disabled={
                !aiWord.trim() ||
                !aiSentence.trim() ||
                aiLookupLoading ||
                !hasEnoughCredits
              }
              className="px-4 py-2 b-btn b-btn-logic disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
            >
              {aiLookupLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Looking up...
                </>
              ) : (
                <>
                  <MagnifyingGlass size={16} />
                  Look Up Word
                </>
              )}
            </button>

            {!hasEnoughCredits && (
              <span className="text-xs text-b-danger">Not enough credits</span>
            )}
          </div>

          {/* AI Result */}
          {aiResult && (
            <div className="p-3 b-bg-reading-light border b-border-reading rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Check size={16} weight="bold" className="text-b-reading" />
                    <span className="font-bold b-text-reading">
                      {aiResult.word}
                    </span>
                    <span className="text-xs bg-b-reading-border b-text-reading px-1.5 py-0.5 rounded">
                      {aiResult.partOfSpeech}
                    </span>
                  </div>
                  <p className="text-sm b-text-reading mt-1">
                    {aiResult.definition}
                  </p>
                  {aiResult.forms && (
                    <p className="text-xs text-b-reading mt-1">
                      Forms: {aiResult.forms}
                    </p>
                  )}
                  {aiResult.principalParts && (
                    <p className="text-xs text-b-reading">
                      Principal Parts: {aiResult.principalParts}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onAddToPersonal(aiResult)}
                  className="px-3 py-1.5 b-bg-reading text-white rounded-lg hover:bg-b-text-reading text-xs font-medium flex items-center gap-1"
                >
                  <Plus size={14} />
                  Add to My Words
                </button>
              </div>
            </div>
          )}

          {aiError && (
            <div className="p-3 b-bg-latin-light border b-border-latin rounded-lg text-sm b-text-latin">
              {aiError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

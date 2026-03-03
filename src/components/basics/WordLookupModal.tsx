'use client'

/**
 * Word Lookup Modal
 * Displays word details and handles lookup confirmation for classical languages
 * Supports free lookups (first 2 per exercise are free)
 */

import { TranslationWord } from '@/lib/types/basics'
import { SpeakerHigh, CheckCircle, Gift } from '@phosphor-icons/react'
import { Portal } from './Portal'
import { XP_COSTS, FREE_LOOKUPS_PER_EXERCISE } from '@/lib/basics/xp-config'

// XP cost for looking up a word - from centralized config
export const WORD_LOOKUP_COST = XP_COSTS.WORD_LOOKUP

interface WordLookupConfirmModalProps {
  word: TranslationWord
  userXp: number
  skipConfirmation: boolean
  onConfirm: () => void
  onCancel: () => void
  onSkipConfirmationChange: (skip: boolean) => void
  freeLookupsRemaining?: number
}

export function WordLookupConfirmModal({
  word,
  userXp,
  skipConfirmation,
  onConfirm,
  onCancel,
  onSkipConfirmationChange,
  freeLookupsRemaining = 0,
}: WordLookupConfirmModalProps) {
  const isFree = freeLookupsRemaining > 0

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-16 pb-8 overflow-y-auto">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Word lookup"
          className="b-bg-card rounded-xl p-6 max-w-sm mx-4 shadow-xl"
        >
          <h3 className="text-lg font-bold mb-2">
            🔤 Look up &ldquo;{word.word}&rdquo;?
          </h3>

          {isFree ? (
            <div className="flex items-center gap-2 p-3 b-bg-reading-light rounded-lg mb-4">
              <Gift size={20} weight="fill" className="b-text-reading" />
              <div>
                <p className="b-text-reading font-medium">
                  This lookup is FREE!
                </p>
                <p className="text-xs b-text-muted">
                  {freeLookupsRemaining - 1} free lookup
                  {freeLookupsRemaining - 1 !== 1 ? 's' : ''} remaining
                </p>
              </div>
            </div>
          ) : (
            <p className="b-text-secondary mb-4">
              This will cost <strong>{WORD_LOOKUP_COST} XP</strong>.
            </p>
          )}

          {!isFree && (
            <p className="text-sm b-text-muted mb-4">Your XP: {userXp}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              disabled={!isFree && userXp < WORD_LOOKUP_COST}
              className={`flex-1 px-4 py-2 b-btn ${isFree ? 'b-btn-success' : 'b-btn-reading'} disabled:opacity-50`}
            >
              {isFree ? (
                <>Look Up (FREE)</>
              ) : (
                <>Look Up (-{WORD_LOOKUP_COST} XP)</>
              )}
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 border b-border rounded-lg hover:b-bg-muted"
            >
              Cancel
            </button>
          </div>
          <label className="flex items-center gap-2 mt-4 text-sm b-text-secondary">
            <input
              type="checkbox"
              checked={skipConfirmation}
              onChange={(e) => onSkipConfirmationChange(e.target.checked)}
              className="rounded"
            />
            Don&apos;t ask again this session
          </label>
        </div>
      </div>
    </Portal>
  )
}

interface WordDetailModalProps {
  word: TranslationWord
  onClose: () => void
  onSaveToVocabulary?: () => void
}

export function WordDetailModal({
  word,
  onClose,
  onSaveToVocabulary,
}: WordDetailModalProps) {
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-16 pb-8 overflow-y-auto">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Word lookup"
          className="b-bg-card rounded-xl p-6 max-w-md mx-4 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">
              {word.word}
              {word.romanization && (
                <span className="b-text-muted font-normal text-base ml-2">
                  ({word.romanization})
                </span>
              )}
            </h3>
            {word.pronunciation && (
              <button className="p-2 hover:b-bg-muted rounded-full">
                <SpeakerHigh size={20} />
              </button>
            )}
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium b-text-muted">Meaning:</span>
              <p className="b-text-primary">{word.meaning}</p>
            </div>
            <div>
              <span className="font-medium b-text-muted">Grammar:</span>
              <p className="b-text-primary">{word.grammaticalInfo}</p>
            </div>
            <div>
              <span className="font-medium b-text-muted">Function:</span>
              <p className="b-text-primary">{word.functionInSentence}</p>
            </div>
            {word.principalParts && (
              <div>
                <span className="font-medium b-text-muted">
                  Principal Parts:
                </span>
                <p className="b-text-primary font-mono text-xs">
                  {word.principalParts}
                </p>
              </div>
            )}
            {word.derivatives && word.derivatives.length > 0 && (
              <div>
                <span className="font-medium b-text-muted">
                  English Derivatives:
                </span>
                <p className="b-text-primary">{word.derivatives.join(', ')}</p>
              </div>
            )}
            {word.relatedWords && word.relatedWords.length > 0 && (
              <div>
                <span className="font-medium b-text-muted">Related Words:</span>
                <ul className="b-text-primary">
                  {word.relatedWords.map((rw) => (
                    <li key={rw.word}>
                      • {rw.word}: {rw.meaning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onSaveToVocabulary}
              className="flex-1 px-4 py-2 b-bg-reading-light b-text-reading rounded-lg hover:b-bg-reading-light flex items-center justify-center gap-2"
            >
              📌 Save to Vocabulary (FREE)
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border b-border rounded-lg hover:b-bg-muted"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}

interface LookedUpWordsDisplayProps {
  words: TranslationWord[]
  lookedUpWords: Record<string, boolean>
}

export function LookedUpWordsDisplay({
  words,
  lookedUpWords,
}: LookedUpWordsDisplayProps) {
  const lookedUp = words.filter((w) => lookedUpWords[w.word])

  if (lookedUp.length === 0) return null

  return (
    <div className="b-bg-reading-light rounded-lg p-3 text-sm">
      <p className="font-medium b-text-reading mb-2">
        Words you&apos;ve looked up:
      </p>
      <div className="space-y-1">
        {lookedUp.map((word) => (
          <div
            key={word.word}
            className="flex items-start gap-2 b-text-reading"
          >
            <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span>
              <strong>{word.word}</strong>
              {word.romanization && ` (${word.romanization})`}: {word.meaning} (
              {word.grammaticalInfo})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

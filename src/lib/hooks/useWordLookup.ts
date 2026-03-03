'use client'

/**
 * useWordLookup Hook
 *
 * Manages word-click handling and dictionary lookup logic for translation exercises.
 * Tracks free vs. paid lookups, confirmation flow, and selected-word modal state.
 */

import { useState, useCallback } from 'react'
import { TranslationWord } from '@/lib/types/basics'
import { WORD_LOOKUP_COST } from '@/components/basics/WordLookupModal'
import { FREE_LOOKUPS_PER_EXERCISE } from '@/lib/basics/xp-config'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WordLookupState {
  [word: string]: boolean
}

interface WordLookupDeps {
  userXp: number
  onXpChange: (delta: number) => void
  /** Telemetry callback for tracking dictionary lookups */
  trackDictionaryLookup: (word: string) => void
}

interface WordLookupReturn {
  wordsLookedUp: WordLookupState
  setWordsLookedUp: React.Dispatch<React.SetStateAction<WordLookupState>>
  selectedWord: TranslationWord | null
  showWordModal: boolean
  setShowWordModal: React.Dispatch<React.SetStateAction<boolean>>
  confirmLookup: TranslationWord | null
  setConfirmLookup: React.Dispatch<React.SetStateAction<TranslationWord | null>>
  skipConfirmation: boolean
  setSkipConfirmation: React.Dispatch<React.SetStateAction<boolean>>
  freeLookupsRemaining: number
  setFreeLookupsRemaining: React.Dispatch<React.SetStateAction<number>>
  /** Total lookups used (free + paid) */
  totalLookupsUsed: number
  /** Lookups that cost XP */
  paidLookups: number
  /** XP spent on paid lookups */
  xpSpentOnLookups: number
  handleWordClick: (word: TranslationWord) => void
  doLookup: (word: TranslationWord) => void
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useWordLookup(deps: WordLookupDeps): WordLookupReturn {
  const { userXp, onXpChange, trackDictionaryLookup } = deps

  const [wordsLookedUp, setWordsLookedUp] = useState<WordLookupState>({})
  const [selectedWord, setSelectedWord] = useState<TranslationWord | null>(null)
  const [showWordModal, setShowWordModal] = useState(false)
  const [confirmLookup, setConfirmLookup] = useState<TranslationWord | null>(null)
  const [skipConfirmation, setSkipConfirmation] = useState(false)
  const [freeLookupsRemaining, setFreeLookupsRemaining] = useState(FREE_LOOKUPS_PER_EXERCISE)

  // Derived values
  const totalLookupsUsed = Object.values(wordsLookedUp).filter(Boolean).length
  const paidLookups = Math.max(0, totalLookupsUsed - FREE_LOOKUPS_PER_EXERCISE)
  const xpSpentOnLookups = paidLookups * WORD_LOOKUP_COST

  // Perform the lookup (free for first FREE_LOOKUPS_PER_EXERCISE, then costs XP)
  const doLookup = useCallback(
    (word: TranslationWord) => {
      const isFree = freeLookupsRemaining > 0

      if (!isFree && userXp < WORD_LOOKUP_COST) return

      setWordsLookedUp(prev => ({ ...prev, [word.word]: true }))
      trackDictionaryLookup(word.word)

      if (isFree) {
        setFreeLookupsRemaining(prev => prev - 1)
      } else {
        onXpChange(-WORD_LOOKUP_COST)
      }

      setSelectedWord(word)
      setShowWordModal(true)
      setConfirmLookup(null)
    },
    [freeLookupsRemaining, userXp, trackDictionaryLookup, onXpChange]
  )

  // Handle word click (show confirmation or do immediate lookup)
  const handleWordClick = useCallback(
    (word: TranslationWord) => {
      if (wordsLookedUp[word.word]) {
        setSelectedWord(word)
        setShowWordModal(true)
        return
      }

      if (skipConfirmation) {
        doLookup(word)
      } else {
        setConfirmLookup(word)
      }
    },
    [wordsLookedUp, skipConfirmation, doLookup]
  )

  return {
    wordsLookedUp,
    setWordsLookedUp,
    selectedWord,
    showWordModal,
    setShowWordModal,
    confirmLookup,
    setConfirmLookup,
    skipConfirmation,
    setSkipConfirmation,
    freeLookupsRemaining,
    setFreeLookupsRemaining,
    totalLookupsUsed,
    paidLookups,
    xpSpentOnLookups,
    handleWordClick,
    doLookup
  }
}

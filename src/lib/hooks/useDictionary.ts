'use client'

/**
 * useDictionary Hook
 * 
 * Consolidates state management for the dictionary modal including:
 * - Search and filtering
 * - Personal dictionary CRUD
 * - AI word lookup
 * - Greek keyboard state
 */

import { useState, useMemo, useEffect, useCallback } from 'react'
import { latinDictionary, DictionaryEntry } from '@/lib/data/latin-dictionary'
import { greekDictionary } from '@/lib/data/greek-dictionary'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useAuth } from '@/components/auth/ClientProvider'
import { useCredits } from '@/lib/hooks/useCredits'
import { logger } from '@/lib/logger'

// Constants
export const AI_LOOKUP_COST_CENTS = 10

// Types
export type SearchMode = 'all' | 'declension' | 'conjugation'
export type PartOfSpeechFilter = 'all' | 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun'

// Greek alphabet keyboard layout
export const GREEK_LETTERS = {
  lowercase: [
    ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ'],
    ['ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π'],
    ['ρ', 'σ', 'ς', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω']
  ],
  uppercase: [
    ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ'],
    ['Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π'],
    ['Ρ', 'Σ', '', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω']
  ],
  accented: [
    ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ'],
    ['ἀ', 'ἐ', 'ἠ', 'ἰ', 'ὀ', 'ὐ', 'ὠ'],
    ['ἁ', 'ἑ', 'ἡ', 'ἱ', 'ὁ', 'ὑ', 'ὡ']
  ]
} as const

export type GreekKeyboardCase = 'lowercase' | 'uppercase' | 'accented'

interface UseDictionaryProps {
  language: 'latin' | 'greek'
  isOpen: boolean
}

export function useDictionary({ language, isOpen }: UseDictionaryProps) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const { balance, refresh: refreshCredits } = useCredits()

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState<SearchMode>('all')
  const [partOfSpeechFilter, setPartOfSpeechFilter] = useState<PartOfSpeechFilter>('all')
  const [declensionFilter, setDeclensionFilter] = useState<number | null>(null)
  const [conjugationFilter, setConjugationFilter] = useState<number | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null)

  // Greek keyboard state
  const [showGreekKeyboard, setShowGreekKeyboard] = useState(false)
  const [greekKeyboardCase, setGreekKeyboardCase] = useState<GreekKeyboardCase>('lowercase')

  // AI Lookup state
  const [showAILookup, setShowAILookup] = useState(false)
  const [aiWord, setAiWord] = useState('')
  const [aiSentence, setAiSentence] = useState('')
  const [aiLookupLoading, setAiLookupLoading] = useState(false)
  const [aiResult, setAiResult] = useState<DictionaryEntry | null>(null)
  const [aiError, setAiError] = useState<string | null>(null)

  // Personal dictionary
  const [personalDictionary, setPersonalDictionary] = useState<DictionaryEntry[]>([])
  const [showPersonal, setShowPersonal] = useState(false)
  const [addedToPersonal, setAddedToPersonal] = useState(false)

  // Get the appropriate dictionary
  const dictionary = language === 'latin' ? latinDictionary : greekDictionary
  const displayDictionary = showPersonal ? personalDictionary : dictionary

  // Insert Greek letter into search
  const insertGreekLetter = useCallback((letter: string) => {
    if (!letter) return
    setSearchQuery(prev => prev + letter)
  }, [])

  // Backspace for Greek keyboard
  const handleBackspace = useCallback(() => {
    setSearchQuery(prev => prev.slice(0, -1))
  }, [])

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  // Load personal dictionary from localStorage
  useEffect(() => {
    if (user) {
      const key = `personal-dictionary-${language}-${user.uid}`
      const saved = localStorage.getItem(key)
      if (saved) {
        try {
          setPersonalDictionary(JSON.parse(saved))
        } catch {
          setPersonalDictionary([])
        }
      }
    }
  }, [user, language, isOpen])

  // Save to personal dictionary
  const addToPersonalDictionary = useCallback((entry: DictionaryEntry) => {
    if (!user) return
    const key = `personal-dictionary-${language}-${user.uid}`
    const existing = personalDictionary.find(e => e.word === entry.word)
    if (!existing) {
      const updated = [...personalDictionary, entry]
      setPersonalDictionary(updated)
      localStorage.setItem(key, JSON.stringify(updated))
      setAddedToPersonal(true)
      setTimeout(() => setAddedToPersonal(false), 2000)
    }
  }, [user, language, personalDictionary])

  const removeFromPersonalDictionary = useCallback((word: string) => {
    if (!user) return
    const key = `personal-dictionary-${language}-${user.uid}`
    const updated = personalDictionary.filter(e => e.word !== word)
    setPersonalDictionary(updated)
    localStorage.setItem(key, JSON.stringify(updated))
  }, [user, language, personalDictionary])

  const isInPersonalDictionary = useCallback((word: string) => {
    return personalDictionary.some(e => e.word === word)
  }, [personalDictionary])

  // Filter and search
  const filteredEntries = useMemo(() => {
    let results = displayDictionary

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      results = results.filter(entry =>
        entry.word.toLowerCase().includes(query) ||
        entry.definition.toLowerCase().includes(query)
      )
    }

    // Part of speech filter
    if (partOfSpeechFilter !== 'all') {
      results = results.filter(entry => entry.partOfSpeech === partOfSpeechFilter)
    }

    // Search mode specific filters
    if (searchMode === 'declension') {
      results = results.filter(entry => entry.declension !== undefined)
      if (declensionFilter !== null) {
        results = results.filter(entry => entry.declension === declensionFilter)
      }
    } else if (searchMode === 'conjugation') {
      results = results.filter(entry => entry.conjugation !== undefined)
      if (conjugationFilter !== null) {
        results = results.filter(entry => entry.conjugation === conjugationFilter)
      }
    }

    return results.slice(0, 100) // Limit for performance
  }, [displayDictionary, searchQuery, searchMode, partOfSpeechFilter, declensionFilter, conjugationFilter])

  // Check if user has enough credits
  const hasEnoughCredits = balance && balance.balance >= AI_LOOKUP_COST_CENTS

  // AI Word Lookup
  const handleAILookup = useCallback(async () => {
    if (!aiWord.trim() || !aiSentence.trim() || !user) return
    if (!hasEnoughCredits) {
      setAiError('Not enough credits for AI lookup.')
      return
    }

    setAiLookupLoading(true)
    setAiError(null)
    setAiResult(null)

    try {
      const result = await fetchApi<{ entry: DictionaryEntry; found: boolean }>('/api/basics/dictionary/ai-lookup', {
        method: 'POST',
        body: JSON.stringify({
          word: aiWord.trim(),
          sentence: aiSentence.trim(),
          language
        })
      })

      if (result.found && result.entry) {
        setAiResult(result.entry)
        refreshCredits()
      } else {
        setAiError('Word not found. Try checking your spelling or providing more context.')
      }
    } catch (err) {
      setAiError('Failed to lookup word. Please try again.')
      logger.error('Usedictionary', 'AI lookup error', { error: err })
    } finally {
      setAiLookupLoading(false)
    }
  }, [aiWord, aiSentence, user, hasEnoughCredits, language, fetchApi, refreshCredits])

  // Handle search mode change
  const handleSearchModeChange = useCallback((mode: SearchMode) => {
    setSearchMode(mode)
    if (mode !== 'declension') setDeclensionFilter(null)
    if (mode !== 'conjugation') setConjugationFilter(null)
  }, [])

  // Toggle entry selection
  const toggleEntrySelection = useCallback((entry: DictionaryEntry) => {
    setSelectedEntry(prev => prev?.word === entry.word ? null : entry)
  }, [])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setSelectedEntry(null)
      setShowAILookup(false)
      setShowGreekKeyboard(false)
      setGreekKeyboardCase('lowercase')
      setAiWord('')
      setAiSentence('')
      setAiResult(null)
      setAiError(null)
    }
  }, [isOpen])

  return {
    // Search state
    searchQuery,
    setSearchQuery,
    searchMode,
    handleSearchModeChange,
    partOfSpeechFilter,
    setPartOfSpeechFilter,
    declensionFilter,
    setDeclensionFilter,
    conjugationFilter,
    setConjugationFilter,
    selectedEntry,
    toggleEntrySelection,
    filteredEntries,

    // Dictionary data
    dictionary,
    displayDictionary,
    showPersonal,
    setShowPersonal,
    personalDictionary,
    addToPersonalDictionary,
    removeFromPersonalDictionary,
    isInPersonalDictionary,
    addedToPersonal,

    // Greek keyboard
    showGreekKeyboard,
    setShowGreekKeyboard,
    greekKeyboardCase,
    setGreekKeyboardCase,
    insertGreekLetter,
    handleBackspace,
    clearSearch,

    // AI Lookup
    showAILookup,
    setShowAILookup,
    aiWord,
    setAiWord,
    aiSentence,
    setAiSentence,
    aiLookupLoading,
    aiResult,
    aiError,
    handleAILookup,
    hasEnoughCredits,
    balance
  }
}




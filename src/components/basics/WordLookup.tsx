/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
/**
 * Word Lookup Component
 *
 * Makes words in the passage clickable and shows phonetics/definitions
 * Allows students to practice pronunciation for bonus points
 */

'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useRequireAuth } from '@/lib/hooks/useRequireAuth'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { Alert } from '@/components/ui/Alert'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import {
  BookOpen,
  X,
  Microphone,
  CheckCircle,
  XCircle,
} from '@phosphor-icons/react'
import { WordPronunciationPractice } from './WordPronunciationPractice'
import { logger } from '@/lib/logger'
import { Portal } from './Portal'

interface WordDefinition {
  word: string
  phonetic: string
  phonetics: Array<{ text?: string; audio?: string }>
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
      synonyms?: string[]
      antonyms?: string[]
    }>
  }>
}

interface WordLookupProps {
  passage: string
  onWordLearned?: (word: string, points: number) => void
}

export function WordLookup({ passage, onWordLearned }: WordLookupProps) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const { requireAuth } = useRequireAuth()
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [wordData, setWordData] = useState<WordDefinition | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPractice, setShowPractice] = useState(false)
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set())

  // Fetch word definition and phonetics
  const fetchWordData = useCallback(
    async (word: string) => {
      setIsLoading(true)
      setError(null)

      requireAuth(async () => {
        try {
          // fetchApi returns data directly (not wrapped in {success, data})
          const data = await fetchApi(
            `/api/basics/word-lookup?word=${encodeURIComponent(word)}`
          )
          setWordData(data)
          setShowPractice(true)
        } catch (err) {
          logger.error('WordLookup', 'Failed to fetch word data', {
            error: err,
          })
          setError(
            getErrorMessage(err, 'Word not found. Try a different word.')
          )
        } finally {
          setIsLoading(false)
        }
      })
    },
    [fetchApi, requireAuth]
  )

  // Handle word click
  const handleWordClick = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')
    if (cleanWord.length < 2) return // Skip very short words

    // Skip if already learned
    if (learnedWords.has(cleanWord)) {
      return
    }

    setSelectedWord(cleanWord)
    fetchWordData(cleanWord)
  }

  // Handle pronunciation practice completion
  const handlePracticeComplete = (word: string, points: number) => {
    setLearnedWords((prev) => new Set(prev).add(word.toLowerCase()))
    setShowPractice(false)
    setSelectedWord(null)
    setWordData(null)

    if (onWordLearned) {
      onWordLearned(word, points)
    }
  }

  // Render passage with clickable words
  const renderPassageWithClickableWords = () => {
    if (!passage) return null

    // Split passage into paragraphs first
    const paragraphs = passage.split('\n\n')

    return paragraphs.map((paragraph, paraIdx) => {
      const words = paragraph.split(/(\s+|[.,!?;:])/)

      return (
        <p
          key={paraIdx}
          className="leading-relaxed b-mb-md"
          style={{
            color: 'var(--b-text-primary)',
            fontFamily: 'var(--b-font-serif)',
          }}
        >
          {words.map((segment, wordIdx) => {
            // Check if segment is a word (not punctuation or whitespace)
            const isWord = /^\w+$/.test(segment)
            const cleanWord = segment.toLowerCase().replace(/[^\w]/g, '')
            const isLearned = isWord && learnedWords.has(cleanWord)

            if (!isWord) {
              return <span key={`${paraIdx}-${wordIdx}`}>{segment}</span>
            }

            return (
              <span
                key={`${paraIdx}-${wordIdx}`}
                onClick={() => handleWordClick(segment)}
                className="cursor-pointer transition-all duration-200"
                style={{
                  color: isLearned
                    ? 'var(--b-reading)'
                    : 'var(--b-text-primary)',
                  fontWeight: isLearned ? 600 : 400,
                }}
                title={
                  isLearned
                    ? 'Word learned! Click to review'
                    : 'Click to learn this word'
                }
              >
                {segment}
              </span>
            )
          })}
        </p>
      )
    })
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--b-space-sm)',
        }}
      >
        <div
          className="flex items-center gap-2 b-text-sm b-mb-sm"
          style={{ color: 'var(--b-text-secondary)' }}
        >
          <BookOpen size={16} weight="bold" />
          <span>Click any word to learn its pronunciation and definition</span>
        </div>
        <div
          className="leading-relaxed"
          style={{
            color: 'var(--b-text-primary)',
            fontFamily: 'var(--b-font-serif)',
          }}
        >
          {renderPassageWithClickableWords()}
        </div>
      </div>

      {/* Word Definition Modal */}
      {selectedWord && wordData && showPractice && (
        <WordPronunciationPractice
          word={wordData.word}
          phonetic={wordData.phonetic || wordData.phonetics[0]?.text || ''}
          definition={
            wordData.meanings[0]?.definitions[0]?.definition ||
            'No definition available'
          }
          onComplete={handlePracticeComplete}
          onClose={() => {
            setShowPractice(false)
            setSelectedWord(null)
            setWordData(null)
          }}
        />
      )}

      {/* Loading State */}
      {isLoading && (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="b-bg-card rounded-lg p-6 shadow-b-modal">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-b-text-primary"></div>
                <span className="b-text-secondary">Looking up word...</span>
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Error State */}
      {error && (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="b-bg-card rounded-lg p-6 shadow-b-modal max-w-md w-full mx-4 mb-8">
              <div className="flex items-start gap-3">
                <XCircle
                  size={24}
                  weight="fill"
                  className="text-b-latin flex-shrink-0 mt-0.5"
                />
                <div className="flex-1">
                  <h3 className="font-semibold b-text-primary mb-1">
                    Word Not Found
                  </h3>
                  <p className="b-text-secondary text-sm mb-4">{error}</p>
                  <button
                    onClick={() => {
                      setError(null)
                      setSelectedWord(null)
                    }}
                    className="w-full b-btn b-btn-reading py-2 px-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

// Export helper to check if word is learned
export function isWordLearned(
  word: string,
  learnedWords: Set<string>
): boolean {
  return learnedWords.has(word.toLowerCase().replace(/[^\w]/g, ''))
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  BookOpen,
  Gift,
  SpeakerHigh,
  SpeakerSlash,
} from '@phosphor-icons/react'
import { TranslationWord, ClassicalLanguage } from '@/lib/types/basics'
import { WORD_LOOKUP_COST } from './WordLookupModal'
import { FREE_LOOKUPS_PER_EXERCISE } from '@/lib/basics/xp-config'
import {
  speakClassical,
  stopSpeech,
  isSpeechSynthesisSupported,
  SPEECH_SPEEDS,
  SpeechSpeed,
} from '@/lib/audio/classicalPronunciation'
import { logger } from '@/lib/logger'

interface WordLookupState {
  [word: string]: boolean
}

interface ClickableSourceTextProps {
  words: TranslationWord[]
  language: ClassicalLanguage
  romanization?: string
  wordsLookedUp: WordLookupState
  xpSpentOnLookups: number
  onWordClick: (word: TranslationWord) => void
  freeLookupsRemaining?: number
}

export function ClickableSourceText({
  words,
  language,
  romanization,
  wordsLookedUp,
  xpSpentOnLookups,
  onWordClick,
  freeLookupsRemaining,
}: ClickableSourceTextProps) {
  // Greek romanization defaults ON, Latin defaults OFF
  // Persist preference per language in localStorage
  const [showRomanization, setShowRomanization] = useState(() => {
    if (typeof window === 'undefined') return language === 'greek'
    const saved = localStorage.getItem(`${language}-romanization`)
    return saved !== null ? saved === 'true' : language === 'greek'
  })

  // Persist romanization preference
  useEffect(() => {
    localStorage.setItem(`${language}-romanization`, String(showRomanization))
  }, [language, showRomanization])

  // Audio pronunciation state
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioSupported, setAudioSupported] = useState(false)
  const [speechSpeed, setSpeechSpeed] = useState<SpeechSpeed>(() => {
    if (typeof window === 'undefined') return 'normal'
    const saved = localStorage.getItem('speech-speed')
    return (saved as SpeechSpeed) || 'normal'
  })

  // Persist speech speed preference
  useEffect(() => {
    localStorage.setItem('speech-speed', speechSpeed)
  }, [speechSpeed])

  // Check audio support on mount
  useEffect(() => {
    setAudioSupported(isSpeechSynthesisSupported())
  }, [])

  // Get the full source text
  const sourceText = words.map((w) => w.word).join(' ')

  // Cycle through speed options
  const cycleSpeed = useCallback(() => {
    const speeds: SpeechSpeed[] = ['slow', 'normal', 'fast']
    const currentIndex = speeds.indexOf(speechSpeed)
    const nextIndex = (currentIndex + 1) % speeds.length
    setSpeechSpeed(speeds[nextIndex])
  }, [speechSpeed])

  // Handle pronunciation
  const handleSpeak = useCallback(async () => {
    if (isPlaying) {
      stopSpeech()
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      try {
        await speakClassical(sourceText, language, { speed: speechSpeed })
      } catch (error) {
        logger.error('ClickableSourceText', 'Speech error', { error })
      } finally {
        setIsPlaying(false)
      }
    }
  }, [isPlaying, sourceText, language, speechSpeed])

  return (
    <div
      className="b-rounded-lg b-p-lg b-border"
      style={{ backgroundColor: '#ffffff', color: 'var(--b-text-primary)' }}
    >
      <div
        className="flex items-center justify-between b-text-sm b-mb-md"
        style={{ color: 'var(--b-text-secondary)' }}
      >
        <div className="flex items-center gap-2">
          <BookOpen size={16} weight="bold" className="flex-shrink-0" />
          <span className="text-xs sm:text-sm">
            Click any word to learn its pronunciation and definition
          </span>
        </div>
        {/* Audio pronunciation controls - compact button group */}
        {audioSupported && (
          <div
            className="flex items-center rounded-md overflow-hidden flex-shrink-0"
            style={{ backgroundColor: 'var(--b-bg-muted)' }}
          >
            {/* Speed toggle - icon only */}
            <button
              onClick={cycleSpeed}
              className="flex items-center justify-center w-7 h-7 transition-colors hover:bg-black/5"
              style={{ color: 'var(--b-text-secondary)' }}
              title={`Speed: ${SPEECH_SPEEDS[speechSpeed].label} (click to change)`}
            >
              <span className="text-sm">{SPEECH_SPEEDS[speechSpeed].icon}</span>
            </button>
            {/* Divider */}
            <div
              className="w-px h-4"
              style={{ backgroundColor: 'var(--b-border-light)' }}
            />
            {/* Play/Stop button */}
            <button
              onClick={handleSpeak}
              className="flex items-center justify-center w-7 h-7 transition-colors"
              style={{
                backgroundColor: isPlaying
                  ? language === 'greek'
                    ? 'var(--b-greek-light)'
                    : 'var(--b-latin-light)'
                  : 'transparent',
                color: isPlaying
                  ? language === 'greek'
                    ? 'var(--b-greek)'
                    : 'var(--b-latin)'
                  : 'var(--b-text-secondary)',
              }}
              title={
                isPlaying
                  ? 'Stop'
                  : `Listen (${SPEECH_SPEEDS[speechSpeed].label})`
              }
            >
              {isPlaying ? (
                <SpeakerSlash size={16} weight="fill" />
              ) : (
                <SpeakerHigh size={16} weight="fill" />
              )}
            </button>
          </div>
        )}
      </div>
      <div className="text-center b-mb-md">
        {/* lang="grc" for Ancient Greek, lang="la" for Latin - important for screen readers */}
        <p
          className="b-text-xl leading-relaxed"
          style={{ fontFamily: 'var(--b-font-serif)' }}
          lang={language === 'greek' ? 'grc' : 'la'}
        >
          &ldquo;
          {words.map((word, idx) => (
            <span key={word.word + idx}>
              <button
                onClick={() => onWordClick(word)}
                className="b-px-xs b-py-xs b-rounded-md transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: wordsLookedUp[word.word]
                    ? 'var(--b-reading-light)'
                    : 'transparent',
                  color: wordsLookedUp[word.word]
                    ? 'var(--b-reading)'
                    : 'var(--b-text-primary)',
                  fontWeight: wordsLookedUp[word.word] ? 600 : 400,
                }}
                title={
                  wordsLookedUp[word.word]
                    ? 'Click to view (free)'
                    : `Click to look up (-${WORD_LOOKUP_COST} XP)`
                }
              >
                {word.word}
              </button>
              {idx < words.length - 1 && ' '}
            </span>
          ))}
          &rdquo;
        </p>

        {/* Romanization toggle for Greek */}
        {language === 'greek' && romanization && (
          <div className="b-mt-sm">
            <button
              onClick={() => setShowRomanization(!showRomanization)}
              className="b-text-xs cursor-pointer"
              style={{ color: 'var(--b-text-muted)' }}
            >
              {showRomanization ? 'Hide' : 'Show'} romanization
            </button>
            {showRomanization && (
              <p
                className="b-text-sm italic b-mt-xs"
                style={{ color: 'var(--b-text-muted)' }}
              >
                {romanization}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Words Looked Up Counter */}
      <div
        className="flex items-center justify-between b-text-xs b-pt-sm b-mt-sm"
        style={{
          color: 'var(--b-text-muted)',
          borderTop: '1px solid var(--b-border-light)',
        }}
      >
        <span>
          Words looked up: {Object.values(wordsLookedUp).filter(Boolean).length}{' '}
          of {words.length}
        </span>
        <div className="flex items-center gap-3">
          {/* Free lookups indicator */}
          {freeLookupsRemaining !== undefined && freeLookupsRemaining > 0 && (
            <span className="flex items-center gap-1 b-text-reading">
              <Gift size={12} weight="fill" />
              {freeLookupsRemaining} free lookup
              {freeLookupsRemaining !== 1 ? 's' : ''} left
            </span>
          )}
          {xpSpentOnLookups > 0 && (
            <span style={{ color: 'var(--b-latin)' }}>
              -{xpSpentOnLookups} XP spent
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

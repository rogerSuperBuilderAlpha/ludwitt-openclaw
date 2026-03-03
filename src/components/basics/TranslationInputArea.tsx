'use client'

/**
 * TranslationInputArea
 *
 * The main input area shown below the translation prompt.
 * Contains the textarea, parsing section (with AI generation),
 * preview, grading animation, and submit/skip action buttons.
 */

import { useState, useEffect, useCallback, RefObject } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { GRADING_STAGES } from '@/lib/hooks/useTranslationSubmission'
import { ParsingSection } from './ParsingSection'
import {
  TranslationExercise,
  ClassicalLanguage,
  ParsingElement,
} from '@/lib/types/basics'
import { logger } from '@/lib/logger'

interface TranslationInputAreaProps {
  language: ClassicalLanguage
  exercise: TranslationExercise
  translation: string
  onTranslationChange: (value: string) => void
  textareaRef: RefObject<HTMLTextAreaElement | null>
  // Parsing (state owned by parent for submission hook access)
  showParsing: boolean
  onToggleParsing: () => void
  parsing: Record<string, string>
  onParsingChange: (word: string, value: string) => void
  // Grading
  isSubmitting: boolean
  gradingStage: number
  // Actions
  onSubmit: () => void
  onSkip: () => void
}

export function TranslationInputArea({
  language,
  exercise,
  translation,
  onTranslationChange,
  textareaRef,
  showParsing,
  onToggleParsing,
  parsing,
  onParsingChange,
  isSubmitting,
  gradingStage,
  onSubmit,
  onSkip,
}: TranslationInputAreaProps) {
  const fetchApi = useApiFetch()
  const [aiParsingElements, setAiParsingElements] = useState<ParsingElement[]>(
    []
  )
  const [isGeneratingParsing, setIsGeneratingParsing] = useState(false)
  const [parsingGenerationAttempted, setParsingGenerationAttempted] =
    useState(false)
  const [showPreviewParsing, setShowPreviewParsing] = useState(false)

  // Reset local parsing generation state when exercise changes
  useEffect(() => {
    setAiParsingElements([])
    setParsingGenerationAttempted(false)
    setShowPreviewParsing(false)
  }, [exercise.id])

  // Generate parsing via AI when not available
  const generateParsingViaAI = useCallback(async () => {
    if (isGeneratingParsing || parsingGenerationAttempted) return
    if (exercise.parsingElements && exercise.parsingElements.length > 0) return

    setIsGeneratingParsing(true)
    setParsingGenerationAttempted(true)

    try {
      const response = await fetchApi(
        '/api/basics/translation/generate-parsing',
        {
          method: 'POST',
          body: JSON.stringify({
            originalText: exercise.sourceText,
            language,
            words: exercise.words?.map((w) => w.word) || [],
          }),
        }
      )
      if (response?.parsingElements && response.parsingElements.length > 0) {
        setAiParsingElements(response.parsingElements)
      }
    } catch (error) {
      logger.error('TranslationInputArea', 'Failed to generate parsing', {
        error,
      })
    } finally {
      setIsGeneratingParsing(false)
    }
  }, [
    exercise,
    language,
    fetchApi,
    isGeneratingParsing,
    parsingGenerationAttempted,
  ])

  // Auto-generate parsing when section is opened
  useEffect(() => {
    if (
      showParsing &&
      (!exercise.parsingElements || exercise.parsingElements.length === 0)
    ) {
      generateParsingViaAI()
    }
  }, [showParsing, exercise, generateParsingViaAI])

  return (
    <>
      {/* Translation Input */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--b-space-sm)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <label
          htmlFor={`translation-input-${language}`}
          className="block b-text-sm b-font-medium"
          style={{ color: 'var(--b-text-secondary)' }}
        >
          Your Translation
        </label>
        <textarea
          ref={textareaRef}
          id={`translation-input-${language}`}
          name="translation"
          value={translation}
          onChange={(e) => onTranslationChange(e.target.value)}
          placeholder="Type your English translation..."
          rows={3}
          className="w-full b-input resize-none"
          style={{
            backgroundColor: '#ffffff',
            color: 'var(--b-text-primary)',
            padding: 'var(--b-space-md)',
          }}
        />
      </div>

      {/* Parsing Section (Collapsible) */}
      <ParsingSection
        showParsing={showParsing}
        onToggle={onToggleParsing}
        parsing={parsing}
        onParsingChange={onParsingChange}
        parsingElements={exercise.parsingElements || []}
        aiParsingElements={aiParsingElements}
        isGeneratingParsing={isGeneratingParsing}
        onGenerateParsing={generateParsingViaAI}
      />

      {/* Pre-submission Parsing Preview */}
      {translation.trim().length > 0 && !showPreviewParsing && (
        <button
          onClick={() => setShowPreviewParsing(true)}
          className="text-sm flex items-center gap-1 hover:underline"
          style={{
            color: language === 'greek' ? 'var(--b-greek)' : 'var(--b-latin)',
          }}
        >
          {'📖 Check my translation before submitting'}
        </button>
      )}

      {showPreviewParsing && translation.trim().length > 0 && (
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor:
              language === 'greek'
                ? 'var(--b-greek-light, #e0f2fe)'
                : 'var(--b-latin-light, #fef3c7)',
            borderColor:
              language === 'greek'
                ? 'var(--b-greek-border, #7dd3fc)'
                : 'var(--b-latin-border, #fcd34d)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h4
              className="font-medium text-sm"
              style={{ color: 'var(--b-text-primary)' }}
            >
              {'📖 Your Translation Preview'}
            </h4>
            <button
              onClick={() => setShowPreviewParsing(false)}
              className="text-xs b-text-muted hover:b-text-secondary"
            >
              Hide
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {translation
                .trim()
                .split(/\s+/)
                .map((word, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  >
                    {word}
                  </span>
                ))}
            </div>
            <p className="text-xs b-text-muted mt-2">
              {'✓ '}
              {translation.trim().split(/\s+/).length} words{' '}
              {'• Ready to submit'}
            </p>
          </div>
        </div>
      )}

      {/* Animated Grading Feedback */}
      {isSubmitting && (
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor:
              language === 'greek'
                ? 'var(--b-greek-light, #e0f2fe)'
                : 'var(--b-latin-light, #fef3c7)',
            borderColor:
              language === 'greek'
                ? 'var(--b-greek-border, #7dd3fc)'
                : 'var(--b-latin-border, #fcd34d)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-5 h-5 border-2 border-b-transparent rounded-full animate-spin"
              style={{
                borderColor:
                  language === 'greek' ? 'var(--b-greek)' : 'var(--b-latin)',
                borderBottomColor: 'transparent',
              }}
            />
            <div className="flex-1">
              <p
                className="text-sm font-medium"
                style={{
                  color:
                    language === 'greek' ? 'var(--b-greek)' : 'var(--b-latin)',
                }}
              >
                {GRADING_STAGES[gradingStage]}
              </p>
              <div className="flex gap-1.5 mt-2">
                {GRADING_STAGES.map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        language === 'greek'
                          ? 'var(--b-greek)'
                          : 'var(--b-latin)',
                      opacity:
                        idx === gradingStage
                          ? 1
                          : idx < gradingStage
                            ? 0.5
                            : 0.2,
                      transform:
                        idx === gradingStage ? 'scale(1.25)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !translation.trim()}
          className="flex-1 b-btn b-btn-lg b-btn-latin disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            backgroundColor:
              language === 'greek' ? 'var(--b-greek)' : 'var(--b-latin)',
            color: 'white',
          }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Grading...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              Submit Translation
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="b-btn b-btn-lg b-btn-secondary"
          disabled={isSubmitting}
        >
          Skip (-5 XP)
        </button>
      </div>
    </>
  )
}

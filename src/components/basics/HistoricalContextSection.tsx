'use client'

/**
 * Historical Context Section
 *
 * Shows AI Historical Context button under the Latin/Greek phrasing.
 * After generating context, presents 3 comprehension questions.
 * AI grades answers and awards XP based on performance.
 *
 * LEARNING SCIENCE: First historical context per session is FREE
 * Pedagogy: Historical/cultural context is essential for language learning,
 * not a premium feature. Making it free removes barriers to deeper learning.
 */

import { useState, useEffect } from 'react'
import {
  CheckCircle,
  XCircle,
  Sparkle,
  PaperPlaneTilt,
  Gift,
} from '@phosphor-icons/react'
import { ClassicalLanguage, TranslationExercise } from '@/lib/types/basics'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { FREE_HISTORICAL_CONTEXT_PER_SESSION } from '@/lib/basics/xp-config'
import { logger } from '@/lib/logger'

// Session storage key for tracking free historical context uses
const FREE_CONTEXT_KEY = 'pitch-rise-free-historical-context-used'

interface HistoricalContextSectionProps {
  exercise: TranslationExercise
  language: ClassicalLanguage
  onXpChange: (delta: number) => void
  onCreditsUsed?: () => void
}

interface HistoricalSection {
  emoji: string
  title: string
  content: string
}

interface ComprehensionQuestion {
  id: number
  question: string
  referenceSection: number // which section the answer relates to
}

interface ComprehensionResult {
  questionId: number
  correct: boolean
  feedback: string
  xpAwarded: number
}

export function HistoricalContextSection({
  exercise,
  language,
  onXpChange,
  onCreditsUsed,
}: HistoricalContextSectionProps) {
  const fetchApi = useApiFetch()
  const languageName = language === 'latin' ? 'Latin' : 'Greek'

  // Track free historical context uses (session-based)
  const [freeUsesRemaining, setFreeUsesRemaining] = useState(
    FREE_HISTORICAL_CONTEXT_PER_SESSION
  )

  useEffect(() => {
    // Check session storage for used free contexts
    const used = parseInt(sessionStorage.getItem(FREE_CONTEXT_KEY) || '0', 10)
    setFreeUsesRemaining(
      Math.max(0, FREE_HISTORICAL_CONTEXT_PER_SESSION - used)
    )
  }, [])

  const isFreeContext = freeUsesRemaining > 0

  // Historical context state
  const [historicalContext, setHistoricalContext] = useState<{
    sections: HistoricalSection[]
    xpEarned: number
    depthLevel: string
    creditUsed: number
  } | null>(null)
  const [loadingContext, setLoadingContext] = useState(false)
  const [contextError, setContextError] = useState<string | null>(null)

  // Comprehension questions state
  const [questions, setQuestions] = useState<ComprehensionQuestion[]>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submittingAnswers, setSubmittingAnswers] = useState(false)
  const [comprehensionResults, setComprehensionResults] = useState<
    ComprehensionResult[] | null
  >(null)
  const [totalComprehensionXP, setTotalComprehensionXP] = useState(0)

  // Generate historical context
  const handleGenerateContext = async () => {
    if (loadingContext || historicalContext) return

    setLoadingContext(true)
    setContextError(null)

    try {
      const data = await fetchApi<{
        sections: HistoricalSection[]
        xpEarned: number
        depthLevel: string
        creditUsed: number
      }>('/api/basics/translation/historical-context', {
        method: 'POST',
        body: JSON.stringify({
          language,
          exerciseId: exercise.id,
          sourceText: exercise.sourceText,
          grammarTopic: exercise.grammarTopic,
          // Pass flag indicating this is a free context request
          isFreeRequest: isFreeContext,
        }),
      })

      setHistoricalContext(data)

      // Track free context usage in session storage
      if (isFreeContext) {
        const currentUsed = parseInt(
          sessionStorage.getItem(FREE_CONTEXT_KEY) || '0',
          10
        )
        sessionStorage.setItem(FREE_CONTEXT_KEY, String(currentUsed + 1))
        setFreeUsesRemaining((prev) => Math.max(0, prev - 1))
      }

      // Award XP for generating context
      if (data.xpEarned) {
        onXpChange(data.xpEarned)
      }

      // Only notify about credits if actually charged
      if (onCreditsUsed && data.creditUsed > 0 && !isFreeContext) {
        onCreditsUsed()
      }

      // Generate comprehension questions based on the sections
      generateComprehensionQuestions(data.sections)
    } catch (error: unknown) {
      logger.error(
        'HistoricalContextSection',
        'Error getting historical context',
        { error }
      )
      const errMessage = error instanceof Error ? error.message : String(error)
      const errStatus =
        error instanceof Error && 'status' in error
          ? (error as { status?: number }).status
          : undefined
      if (errMessage?.includes('Insufficient credits') || errStatus === 402) {
        setContextError(
          'Insufficient credits. Please add more credits to continue.'
        )
      } else {
        setContextError(
          'Unable to generate historical context. Please try again.'
        )
      }
    } finally {
      setLoadingContext(false)
    }
  }

  // Generate 3 comprehension questions based on sections
  const generateComprehensionQuestions = (sections: HistoricalSection[]) => {
    const generatedQuestions: ComprehensionQuestion[] = []

    // Create questions based on available sections
    sections.slice(0, 3).forEach((section, idx) => {
      let question = ''

      // Generate relevant questions based on section titles
      if (
        section.title.includes('HERITAGE') ||
        section.title.includes('CULTURAL')
      ) {
        question = `Based on the ${section.title.toLowerCase()}, what aspect of ancient ${language === 'latin' ? 'Roman' : 'Greek'} culture does this text connect to?`
      } else if (
        section.title.includes('LEGACY') ||
        section.title.includes('LINGUISTIC')
      ) {
        question = `How has this ${languageName} text influenced modern English or Western civilization?`
      } else if (
        section.title.includes('WORD') ||
        section.title.includes('ETYMOLOGY')
      ) {
        question = `What English words or concepts derive from the vocabulary in this text?`
      } else if (
        section.title.includes('LITERARY') ||
        section.title.includes('PHILOSOPHY')
      ) {
        question = `What famous literary or philosophical works relate to the themes in this text?`
      } else if (
        section.title.includes('HISTORICAL') ||
        section.title.includes('ANECDOTE')
      ) {
        question = `What historical context or story does this section reveal about ancient life?`
      } else {
        question = `What is the main insight from the "${section.title}" section?`
      }

      generatedQuestions.push({
        id: idx + 1,
        question,
        referenceSection: idx,
      })
    })

    // If we have fewer than 3 sections, add generic questions
    while (generatedQuestions.length < 3 && sections.length > 0) {
      const idx = generatedQuestions.length
      generatedQuestions.push({
        id: idx + 1,
        question:
          idx === 1
            ? `Why is studying this ${languageName} text valuable for understanding modern culture?`
            : `What surprised you most about the historical context of this text?`,
        referenceSection: 0,
      })
    }

    setQuestions(generatedQuestions)
  }

  // Submit comprehension answers for AI grading
  const handleSubmitAnswers = async () => {
    if (submittingAnswers || !historicalContext || questions.length === 0)
      return

    // Check if all questions are answered
    const answeredCount = Object.values(answers).filter((a) => a.trim()).length
    if (answeredCount < questions.length) {
      return
    }

    setSubmittingAnswers(true)

    try {
      const data = await fetchApi<{
        results: ComprehensionResult[]
        totalXP: number
        creditUsed: number
      }>('/api/basics/translation/grade-comprehension', {
        method: 'POST',
        body: JSON.stringify({
          language,
          exerciseId: exercise.id,
          sourceText: exercise.sourceText,
          historicalSections: historicalContext.sections,
          questions: questions.map((q) => q.question),
          answers: questions.map((q) => answers[q.id] || ''),
        }),
      })

      setComprehensionResults(data.results)
      setTotalComprehensionXP(data.totalXP)

      // Award XP for comprehension
      if (data.totalXP > 0) {
        onXpChange(data.totalXP)
      }

      if (onCreditsUsed && data.creditUsed > 0) {
        onCreditsUsed()
      }
    } catch (error: unknown) {
      logger.error('HistoricalContextSection', 'Error grading comprehension', {
        error,
      })
      // Fallback: give partial credit
      const fallbackResults: ComprehensionResult[] = questions.map(
        (q, idx) => ({
          questionId: q.id,
          correct: (answers[q.id]?.trim().length || 0) > 20,
          feedback: 'Answer recorded.',
          xpAwarded: (answers[q.id]?.trim().length || 0) > 20 ? 3 : 1,
        })
      )
      const fallbackXP = fallbackResults.reduce(
        (sum, r) => sum + r.xpAwarded,
        0
      )
      setComprehensionResults(fallbackResults)
      setTotalComprehensionXP(fallbackXP)
      onXpChange(fallbackXP)
    } finally {
      setSubmittingAnswers(false)
    }
  }

  const allQuestionsAnswered =
    questions.length > 0 &&
    questions.every((q) => answers[q.id]?.trim().length > 0)

  return (
    <div className="mt-4">
      {/* Generate Context Button */}
      {!historicalContext && !contextError && (
        <button
          onClick={handleGenerateContext}
          disabled={loadingContext}
          className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl transition-all ${
            loadingContext
              ? 'b-bg-writing-light border-2 b-border-writing cursor-wait'
              : isFreeContext
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 hover:shadow-md hover:border-emerald-400'
                : 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 hover:shadow-md hover:border-amber-300'
          }`}
        >
          <span className="text-3xl">
            {loadingContext ? '⏳' : isFreeContext ? '🎁' : '🏺'}
          </span>
          <div className="text-left flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`font-bold ${isFreeContext ? 'text-emerald-800' : 'text-amber-800'}`}
              >
                {loadingContext
                  ? 'Generating Historical Context...'
                  : 'Explore Historical Context'}
              </span>
              {isFreeContext && !loadingContext && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full animate-pulse">
                  <Gift size={12} weight="fill" />
                  FREE
                </span>
              )}
            </div>
            <span
              className={`text-xs block ${isFreeContext ? 'text-emerald-600' : 'text-amber-600'}`}
            >
              {loadingContext
                ? `Our AI is researching ancient ${languageName} culture...`
                : isFreeContext
                  ? 'First context is FREE! Learn history → Earn 5-15 XP'
                  : "1 Credit → Learn about this text's history → Earn 5-15 XP"}
            </span>
          </div>
          {loadingContext && (
            <div className="ml-auto">
              <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>
      )}

      {/* Error State */}
      {contextError && (
        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
          <p className="text-red-700 text-sm">{contextError}</p>
          <button
            onClick={() => {
              setContextError(null)
              handleGenerateContext()
            }}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* Historical Context Display */}
      {historicalContext && (
        <div className="space-y-4">
          {/* Success Banner */}
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
            <span className="text-3xl">✅</span>
            <div>
              <span className="font-bold text-emerald-800">
                Historical Context Generated!
              </span>
              <span className="text-xs block text-emerald-600">
                Earned +{historicalContext.xpEarned} XP{' '}
                {historicalContext.creditUsed > 0
                  ? `• ${historicalContext.creditUsed} Credit Used`
                  : '• FREE 🎁'}
              </span>
            </div>
          </div>

          {/* Context Sections */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-bold text-amber-800 flex items-center gap-2">
                🏺 Historical Context
              </h4>
              <div className="flex items-center gap-2 text-xs">
                {historicalContext.creditUsed > 0 ? (
                  <span className="text-amber-600">
                    💳 {historicalContext.creditUsed} Credit Used
                  </span>
                ) : (
                  <span className="text-emerald-600 font-medium">🎁 FREE</span>
                )}
                <span className="text-emerald-600 font-medium">
                  💫 +{historicalContext.xpEarned} XP
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {historicalContext.sections?.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-3 border border-amber-200"
                >
                  <h5 className="font-bold text-gray-800 mb-1 flex items-center gap-2 text-sm">
                    <span>{section.emoji}</span>
                    {section.title}
                  </h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Comprehension Questions */}
          {questions.length > 0 && !comprehensionResults && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkle size={20} weight="fill" className="text-blue-600" />
                <h4 className="font-bold text-blue-800">
                  Test Your Understanding
                </h4>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-auto">
                  +3-5 XP per correct answer
                </span>
              </div>

              <p className="text-sm text-blue-600 mb-4">
                Answer these questions about what you just read. Our AI will
                grade your responses!
              </p>

              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-lg p-3 border border-blue-200"
                  >
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      {idx + 1}. {q.question}
                    </label>
                    <textarea
                      value={answers[q.id] || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      placeholder="Type your answer..."
                      rows={2}
                      className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none resize-none"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmitAnswers}
                disabled={!allQuestionsAnswered || submittingAnswers}
                className={`w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition-all ${
                  allQuestionsAnswered && !submittingAnswers
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {submittingAnswers ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AI is grading...
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt size={18} weight="fill" />
                    Submit Answers (1 Credit)
                  </>
                )}
              </button>
            </div>
          )}

          {/* Comprehension Results */}
          {comprehensionResults && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle
                  size={20}
                  weight="fill"
                  className="text-emerald-600"
                />
                <h4 className="font-bold text-emerald-800">
                  Comprehension Results
                </h4>
                <span className="text-sm bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full ml-auto font-medium">
                  +{totalComprehensionXP} XP Earned!
                </span>
              </div>

              <div className="space-y-3">
                {comprehensionResults.map((result, idx) => (
                  <div
                    key={result.questionId}
                    className={`rounded-lg p-3 border ${
                      result.correct
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {result.correct ? (
                        <CheckCircle
                          size={18}
                          weight="fill"
                          className="text-emerald-600 mt-0.5 flex-shrink-0"
                        />
                      ) : (
                        <XCircle
                          size={18}
                          weight="fill"
                          className="text-amber-600 mt-0.5 flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          Question {idx + 1}:{' '}
                          {result.correct ? 'Correct!' : 'Partially correct'}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {result.feedback}
                        </p>
                        <span
                          className={`text-xs font-medium mt-1 inline-block ${
                            result.correct
                              ? 'text-emerald-600'
                              : 'text-amber-600'
                          }`}
                        >
                          +{result.xpAwarded} XP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

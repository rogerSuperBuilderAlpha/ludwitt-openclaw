/**
 * Word Pronunciation Practice Component
 *
 * Shows word with phonetics and definition
 * Records student reading the word and definition
 * Scores pronunciation and awards bonus points
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { X, Microphone, CheckCircle, BookOpen } from '@phosphor-icons/react'
import { useApiMutation } from '@/lib/hooks/useApiQuery'
import { Portal } from './Portal'
import { logger } from '@/lib/logger'
import type {
  SpeechRecognitionInstance,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
  WindowWithSpeechRecognition,
} from '@/lib/types/common'

interface WordPronunciationPracticeProps {
  word: string
  phonetic: string
  definition: string
  onComplete: (word: string, points: number) => void
  onClose: () => void
}

export function WordPronunciationPractice({
  word,
  phonetic,
  definition,
  onComplete,
  onClose,
}: WordPronunciationPracticeProps) {
  const { user } = useAuth()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [pointsEarned, setPointsEarned] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const startTimeRef = useRef<number>(0)
  const confidenceScoresRef = useRef<number[]>([])

  // Mutation hook for scoring
  const { mutate: scorePronunciation, loading: isProcessing } = useApiMutation<{
    score: number
    points: number
  }>('/api/basics/score-word-pronunciation')

  // Check browser support
  useEffect(() => {
    const win = window as unknown as WindowWithSpeechRecognition
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError(
        'Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.'
      )
    }
  }, [])

  const startRecording = () => {
    setError(null)
    setTranscript('')
    setScore(null)
    setPointsEarned(0)
    confidenceScoresRef.current = []

    const win = window as unknown as WindowWithSpeechRecognition
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in your browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsRecording(true)
      startTimeRef.current = Date.now()
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcriptPiece = result[0].transcript

        if (result.isFinal) {
          finalTranscript += transcriptPiece + ' '
          if (result[0].confidence) {
            confidenceScoresRef.current.push(result[0].confidence)
          }
        }
      }

      setTranscript((prev) => prev + finalTranscript)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      logger.error('WordPronunciationPractice', 'Speech recognition error', {
        data: event.error,
      })
      setError(`Error: ${event.error}. Please try again.`)
      stopRecording()
    }

    recognition.onend = () => {
      if (isRecording) {
        // Auto-stopped, but we can continue
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setIsRecording(false)
  }

  const handleScore = async () => {
    stopRecording()

    if (!transcript.trim()) {
      setError('No speech detected. Please try again and speak clearly.')
      return
    }

    if (!user) {
      setError('Please sign in to practice pronunciation')
      return
    }

    const timeSpent = (Date.now() - startTimeRef.current) / 1000

    const result = await scorePronunciation({
      word,
      phonetic,
      definition,
      transcript: transcript.trim(),
      timeSpent,
      confidenceScores: confidenceScoresRef.current,
    })

    if (result) {
      setScore(result.score)
      setPointsEarned(result.points)
    } else {
      setError('Failed to score pronunciation. Please try again.')
    }
  }

  const handleComplete = () => {
    if (pointsEarned > 0) {
      onComplete(word, pointsEarned)
    } else {
      onClose()
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
        <div className="b-bg-card rounded-2xl shadow-xl max-w-lg w-full mx-4 mb-8 border b-border animate-slideUp">
          {/* Header */}
          <div className="b-bg-muted border-b b-border p-5 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-lg p-2"
                  style={{ backgroundColor: 'var(--b-reading)' }}
                >
                  <BookOpen size={20} weight="bold" className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold b-text-primary">
                    Learn This Word
                  </h2>
                  <p className="b-text-secondary text-sm">
                    Practice pronunciation for bonus points!
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="b-text-muted hover:b-text-secondary transition-colors"
                aria-label="Close"
              >
                <X size={24} weight="bold" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Word Display */}
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold b-text-primary">{word}</h3>
              {phonetic && (
                <p className="text-xl b-text-secondary font-mono">{phonetic}</p>
              )}
            </div>

            {/* Definition */}
            <div className="b-bg-muted rounded-lg p-4">
              <p className="b-text-secondary leading-relaxed">
                <span className="font-semibold">Definition:</span> {definition}
              </p>
            </div>

            {/* Instructions */}
            <div className="b-bg-math-light rounded-lg p-4">
              <p className="text-sm b-text-math">
                <span className="font-semibold">📝 Instructions:</span> Read the
                word &quot;{word}&quot; and its definition aloud into your
                microphone. Speak clearly!
              </p>
            </div>

            {/* Recording Controls */}
            {!score && (
              <div className="space-y-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="w-full b-btn b-btn-reading font-medium py-3 px-5 flex items-center justify-center gap-3"
                  >
                    <Microphone size={24} weight="bold" />
                    Start Recording
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-3 h-3 bg-b-danger rounded-full animate-pulse"></div>
                      <span className="b-text-secondary font-medium">
                        Recording... Speak now!
                      </span>
                    </div>
                    <div className="b-bg-muted rounded-lg p-4 min-h-[60px]">
                      <p className="b-text-secondary text-sm">
                        {transcript || 'Listening...'}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleScore}
                        disabled={isProcessing}
                        className="flex-1 b-btn b-btn-reading font-medium py-2.5 px-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={20} weight="bold" />
                        {isProcessing ? 'Scoring...' : 'Stop & Score'}
                      </button>
                      <button
                        onClick={stopRecording}
                        className="px-4 py-3 bg-b-border b-text-secondary rounded-lg hover:bg-b-border-muted transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Score Display */}
            {score !== null && (
              <div className="space-y-4">
                <div
                  className={`rounded-lg p-6 text-center ${
                    score >= 80
                      ? 'b-bg-reading-light border-2 b-border-reading'
                      : score >= 60
                        ? 'b-bg-writing-light border-2 b-border-writing'
                        : 'b-bg-writing-light border-2 b-border-writing'
                  }`}
                >
                  <div className="text-5xl font-bold mb-2">{score}%</div>
                  <p className="text-lg font-semibold mb-1">
                    {score >= 80
                      ? '🎉 Excellent!'
                      : score >= 60
                        ? '👍 Good job!'
                        : '💪 Keep practicing!'}
                  </p>
                  {pointsEarned > 0 && (
                    <p className="text-2xl font-bold b-text-logic mt-2">
                      +{pointsEarned} Bonus Points!
                    </p>
                  )}
                </div>
                <button
                  onClick={handleComplete}
                  className="w-full b-btn b-btn-reading font-medium py-2.5 px-5"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="b-bg-latin-light border b-border-latin rounded-lg p-4">
                <p className="b-text-latin text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.4s ease-out;
          }
        `}</style>
      </div>
    </Portal>
  )
}

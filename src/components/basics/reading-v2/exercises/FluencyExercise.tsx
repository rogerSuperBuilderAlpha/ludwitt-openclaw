'use client'

/**
 * Fluency Exercise Component
 *
 * Oral reading fluency practice with:
 * - WCPM (Words Correct Per Minute) tracking
 * - Prosody scoring (phrasing, stress, intonation, pace)
 * - Recording and playback
 * - Benchmark comparison
 *
 * Research: Fluency is the bridge between decoding and comprehension
 */

// Web Speech API types (local to this file to avoid conflicts)
interface FluencySpeechRecognitionEvent extends Event {
  results: FluencySpeechRecognitionResultList
  resultIndex: number
}

interface FluencySpeechRecognitionResultList {
  length: number
  item(index: number): FluencySpeechRecognitionResult
  [index: number]: FluencySpeechRecognitionResult
}

interface FluencySpeechRecognitionResult {
  length: number
  item(index: number): FluencySpeechRecognitionAlternative
  [index: number]: FluencySpeechRecognitionAlternative
  isFinal: boolean
}

interface FluencySpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface FluencySpeechRecognitionErrorEvent extends Event {
  error: string
  message?: string
}

interface FluencySpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: FluencySpeechRecognitionEvent) => void) | null
  onerror: ((event: FluencySpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

// Type for window with speech recognition
type WindowWithSpeech = {
  SpeechRecognition?: new () => FluencySpeechRecognition
  webkitSpeechRecognition?: new () => FluencySpeechRecognition
}

import { useState, useRef, useCallback } from 'react'
import {
  Microphone,
  Stop,
  Play,
  Pause,
  Timer,
  TrendUp,
  SpeakerHigh,
  CheckCircle,
} from '@phosphor-icons/react'
import { ReadingExerciseV2, FluencyScoreResult } from '@/lib/types/reading-v2'
import { useAuth } from '@/components/auth/ClientProvider'
import { ReadingFeedbackV2 } from '../shared/ReadingFeedbackV2'
import { logger } from '@/lib/logger'

interface AIFeedback {
  summary: string
  strengths: string[]
  improvements: string[]
  detailedExplanation: string
  score: number
  grade: string
}

interface Feedback {
  correct: boolean
  message: string
  explanation: string
  xpEarned: number
}

interface FluencyExerciseProps {
  exercise: ReadingExerciseV2
  answers: Record<string, string>
  isSubmitting: boolean
  feedback: Feedback | null
  aiFeedback: AIFeedback | null
  isAiGrading: boolean
  onAnswerChange: (questionId: string, value: string) => void
  onSubmit: () => void
  onSkip: () => void
  onContinue: () => void
  onBonusEarned: (points: number) => void
  hasNextExercise: boolean
}

export function FluencyExercise({
  exercise,
  isSubmitting,
  feedback,
  aiFeedback,
  isAiGrading,
  onContinue,
  onBonusEarned,
  onSkip,
  hasNextExercise,
}: FluencyExerciseProps) {
  const { user } = useAuth()

  // Recording state
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [fluencyScore, setFluencyScore] = useState<FluencyScoreResult | null>(
    null
  )
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)

  // Refs
  const recognitionRef = useRef<FluencySpeechRecognition | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  // Get grade-level WCPM benchmark
  const getWCPMBenchmark = (
    grade: number
  ): { target: number; label: string } => {
    const benchmarks: Record<number, number> = {
      1: 53,
      2: 89,
      3: 107,
      4: 123,
      5: 139,
      6: 150,
      7: 150,
      8: 151,
    }
    const target = benchmarks[Math.floor(grade)] || 120
    return { target, label: `${target} WCPM (Grade ${Math.floor(grade)})` }
  }

  const benchmark = getWCPMBenchmark(exercise.difficulty)

  // Start recording
  const startRecording = useCallback(() => {
    const windowWithSpeech = window as unknown as WindowWithSpeech
    if (
      !windowWithSpeech.webkitSpeechRecognition &&
      !windowWithSpeech.SpeechRecognition
    ) {
      alert(
        'Speech recognition is not supported in your browser. Try Chrome or Edge.'
      )
      return
    }

    const SpeechRecognitionCtor =
      windowWithSpeech.webkitSpeechRecognition ||
      windowWithSpeech.SpeechRecognition
    if (!SpeechRecognitionCtor) return
    const recognition = new SpeechRecognitionCtor()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      let finalTranscript = ''
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript
      }
      setTranscript(finalTranscript)
    }

    recognition.onerror = (event) => {
      logger.error('FluencyExercise', 'Speech recognition error', {
        data: event.error,
      })
      stopRecording()
    }

    recognition.onend = () => {
      if (isRecording) {
        recognition.start() // Restart if still recording
      }
    }

    recognition.start()
    recognitionRef.current = recognition
    setIsRecording(true)
    setHasRecorded(true)
    startTimeRef.current = Date.now()

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording])

  // Stop recording and score
  const stopRecording = useCallback(async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setIsRecording(false)
    const finalTime = (Date.now() - startTimeRef.current) / 1000

    // Score the reading
    if (transcript && exercise.passage && user) {
      setIsProcessing(true)
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/basics/score-reading-aloud', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            passage: exercise.passage,
            transcript,
            readingTime: finalTime,
            exerciseId: exercise.id,
          }),
        })

        if (response.ok) {
          const result = await response.json()
          setFluencyScore(result.data)

          // Award bonus points based on score
          if (result.data.totalScore >= 4) {
            onBonusEarned(10)
          } else if (result.data.totalScore >= 3) {
            onBonusEarned(5)
          } else if (result.data.totalScore >= 2) {
            onBonusEarned(2)
          }
        }
      } catch (error) {
        logger.error('FluencyExercise', 'Failed to score reading', { error })
      } finally {
        setIsProcessing(false)
      }
    }
  }, [transcript, exercise.passage, exercise.id, user, onBonusEarned])

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // If we have feedback from parent (after comprehension questions), show it
  if (feedback) {
    return (
      <ReadingFeedbackV2
        feedback={{
          isCorrect: feedback.correct,
          score: aiFeedback?.score ?? (feedback.correct ? 1 : 0),
          xpEarned: feedback.xpEarned,
          skillFeedback: [
            {
              skillId: 'fluency',
              skillName: 'Reading Fluency',
              performance: feedback.correct ? 'excellent' : 'good',
              message: feedback.message,
              masteryProgress: fluencyScore ? fluencyScore.totalScore / 5 : 0.5,
            },
          ],
          summary: aiFeedback?.summary || feedback.message,
          encouragement:
            'Fluent reading is the bridge to strong comprehension!',
          explanation: aiFeedback?.detailedExplanation || feedback.explanation,
        }}
        isAiGrading={isAiGrading}
        onContinue={onContinue}
        hasNextExercise={hasNextExercise}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SpeakerHigh
            size={20}
            style={{ color: 'var(--b-reading)' }}
            weight="duotone"
          />
          <span className="font-medium" style={{ color: 'var(--b-reading)' }}>
            Fluency Practice
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm b-text-muted">
          <TrendUp size={16} />
          <span>Target: {benchmark.label}</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          📖 <span className="font-medium">Read the passage aloud</span> at a
          comfortable pace. Focus on reading smoothly with expression, pausing
          at punctuation marks.
        </p>
      </div>

      {/* Prosody Tips */}
      {exercise.prosodyRubric && (
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800 mb-2">
            <span className="font-medium">🎭 Reading Tips:</span>
          </p>
          <ul className="text-xs text-purple-700 space-y-1 ml-4 list-disc">
            {exercise.prosodyRubric.phrasing && (
              <li>
                <strong>Phrasing:</strong> {exercise.prosodyRubric.phrasing}
              </li>
            )}
            {exercise.prosodyRubric.stress && (
              <li>
                <strong>Emphasis:</strong> {exercise.prosodyRubric.stress}
              </li>
            )}
            {exercise.prosodyRubric.intonation && (
              <li>
                <strong>Voice:</strong> {exercise.prosodyRubric.intonation}
              </li>
            )}
            {exercise.prosodyRubric.pace && (
              <li>
                <strong>Speed:</strong> {exercise.prosodyRubric.pace}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Passage */}
      <div
        className="bg-white rounded-lg p-6 text-lg leading-relaxed border-2"
        style={{
          borderColor: isRecording
            ? 'var(--b-reading)'
            : 'var(--b-border-default)',
        }}
      >
        <p className="whitespace-pre-wrap">{exercise.passage}</p>
        {exercise.wordCount && (
          <p className="text-xs b-text-muted mt-4 text-right">
            {exercise.wordCount} words
          </p>
        )}
      </div>

      {/* Recording Controls */}
      <div className="flex items-center justify-center gap-6">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            disabled={isProcessing}
            className="flex items-center gap-3 px-6 py-4 rounded-full text-white font-medium transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--b-reading)' }}
          >
            <Microphone size={24} weight="fill" />
            <span>{hasRecorded ? 'Record Again' : 'Start Reading'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-3 px-6 py-4 rounded-full bg-red-500 text-white font-medium animate-pulse transition-all hover:scale-105"
          >
            <Stop size={24} weight="fill" />
            <span>Stop Recording</span>
          </button>
        )}

        {/* Timer */}
        {(isRecording || hasRecorded) && (
          <div className="flex items-center gap-2 text-lg font-mono b-text-secondary">
            <Timer size={20} />
            <span>{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>

      {/* Live Transcript */}
      {isRecording && transcript && (
        <div className="p-4 bg-gray-50 rounded-lg border b-border">
          <p className="text-sm font-medium b-text-secondary mb-2">Hearing:</p>
          <p className="text-sm b-text-primary">{transcript}</p>
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="flex items-center justify-center gap-3 p-4 bg-purple-50 rounded-lg">
          <div className="animate-spin rounded-full w-5 h-5 border-2 border-purple-400 border-t-transparent" />
          <span className="text-purple-700">Analyzing your reading...</span>
        </div>
      )}

      {/* Fluency Score Results */}
      {fluencyScore && !isRecording && (
        <div className="bg-white rounded-lg border b-border p-6 space-y-4">
          <h4 className="font-semibold b-text-primary flex items-center gap-2">
            <CheckCircle
              size={20}
              weight="fill"
              style={{ color: 'var(--b-reading)' }}
            />
            Fluency Results
          </h4>

          {/* Main Score */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div
                className="text-2xl font-bold"
                style={{ color: 'var(--b-reading)' }}
              >
                {fluencyScore.wcpm}
              </div>
              <div className="text-xs b-text-muted">Words/Min</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div
                className="text-2xl font-bold"
                style={{ color: 'var(--b-math)' }}
              >
                {Math.round(fluencyScore.accuracy)}%
              </div>
              <div className="text-xs b-text-muted">Accuracy</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div
                className="text-2xl font-bold"
                style={{ color: 'var(--b-writing)' }}
              >
                {fluencyScore.prosodyScore}/4
              </div>
              <div className="text-xs b-text-muted">Expression</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-500">
                {fluencyScore.totalScore}/5
              </div>
              <div className="text-xs b-text-muted">Overall</div>
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div
            className="p-3 rounded-lg"
            style={{
              backgroundColor:
                fluencyScore.wcpm >= benchmark.target
                  ? 'var(--b-reading-light)'
                  : '#fef3c7',
            }}
          >
            <p
              className="text-sm"
              style={{
                color:
                  fluencyScore.wcpm >= benchmark.target
                    ? 'var(--b-reading-dark)'
                    : '#92400e',
              }}
            >
              {fluencyScore.wcpm >= benchmark.target ? (
                <>
                  ✨ Excellent! You read {fluencyScore.wcpm - benchmark.target}{' '}
                  words faster than the grade {Math.floor(exercise.difficulty)}{' '}
                  benchmark!
                </>
              ) : (
                <>
                  📈 You&apos;re {benchmark.target - fluencyScore.wcpm}{' '}
                  words/min below the benchmark. Keep practicing!
                </>
              )}
            </p>
          </div>

          {/* Feedback */}
          {fluencyScore.feedback && (
            <p className="text-sm b-text-secondary">{fluencyScore.feedback}</p>
          )}
        </div>
      )}

      {/* Skip Button */}
      <div className="flex justify-center pt-4 border-t b-border">
        <button
          type="button"
          onClick={onSkip}
          disabled={isSubmitting || isRecording}
          className="b-btn b-btn-secondary flex items-center gap-2"
        >
          Skip Fluency Practice
          <span className="b-badge b-badge-danger b-badge-sm">-5 XP</span>
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { logger } from '@/lib/logger'
import type {
  SpeechRecognitionInstance,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
  WindowWithSpeechRecognition,
} from '@/lib/types/common'

interface ReadingAloudBonusProps {
  passage: string
  exerciseId: string
  onBonusEarned: (points: number) => void
}

interface ScoringResult {
  accuracy: number // 0-100
  speed: number // 0-100 (based on optimal reading speed)
  clarity: number // 0-100
  confidence: number // 0-100
  totalScore: number // 1-5 points
  feedback: string
  details: {
    wordsPerMinute: number
    accuracyPercentage: number
    matchedWords: number
    totalWords: number
    avgConfidence: number
  }
}

export function ReadingAloudBonus({
  passage,
  exerciseId,
  onBonusEarned,
}: ReadingAloudBonusProps) {
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(true) // Start collapsed
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasAttempted, setHasAttempted] = useState(false)

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const startTimeRef = useRef<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const confidenceScoresRef = useRef<number[]>([])

  // Check browser support
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if browser supports speech recognition
    const win = window as unknown as WindowWithSpeechRecognition
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognition)

    // Check if user has already attempted this exercise
    const attemptedKey = `reading_aloud_attempted_${exerciseId}`
    const attempted = localStorage.getItem(attemptedKey)
    setHasAttempted(attempted === 'true')
  }, [exerciseId])

  const startRecording = () => {
    setError(null)
    setTranscript('')
    setScoringResult(null)
    confidenceScoresRef.current = []

    const win = window as unknown as WindowWithSpeechRecognition
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError(
        'Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.'
      )
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsRecording(true)
      startTimeRef.current = Date.now()
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 100)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcriptPiece = result[0].transcript

        // Collect confidence scores
        if (result.isFinal && result[0].confidence) {
          confidenceScoresRef.current.push(result[0].confidence)
        }

        if (result.isFinal) {
          finalTranscript += transcriptPiece + ' '
        } else {
          interimTranscript += transcriptPiece
        }
      }

      setTranscript((prev) => prev + finalTranscript)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      logger.error('ReadingAloudBonus', 'Speech recognition error', {
        data: event.error,
      })
      setError(`Error: ${event.error}. Please try again.`)
      stopRecording()
    }

    recognition.onend = () => {
      if (isRecording) {
        // Automatically stopped, but we wanted to continue
        // This can happen after ~60 seconds in some browsers
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

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setIsRecording(false)
  }

  const handleStopAndScore = async () => {
    stopRecording()

    if (!transcript.trim()) {
      setError('No speech detected. Please try again and speak clearly.')
      return
    }

    setIsProcessing(true)

    try {
      const timeSpent = (Date.now() - startTimeRef.current) / 1000 // in seconds
      const token = await user?.getIdToken()

      const response = await fetch('/api/basics/score-reading-aloud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user?.uid,
          exerciseId,
          passage,
          transcript: transcript.trim(),
          timeSpent,
          confidenceScores: confidenceScoresRef.current,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setScoringResult(result.data)
        onBonusEarned(result.data.totalScore)

        // Mark as attempted
        localStorage.setItem(`reading_aloud_attempted_${exerciseId}`, 'true')
        setHasAttempted(true)
      } else {
        setError(
          result.error || 'Failed to score your reading. Please try again.'
        )
      }
    } catch (error) {
      logger.error('ReadingAloudBonus', 'Failed to score reading', { error })
      setError('Failed to score your reading. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isSupported) {
    return (
      <div className="b-bg-writing-light border b-border-writing rounded-lg p-4">
        <div className="flex items-center gap-2 b-text-writing">
          <span className="text-lg">⚠️</span>
          <span className="text-sm">
            Reading aloud bonus is not supported in your browser. Please use
            Chrome, Edge, or Safari.
          </span>
        </div>
      </div>
    )
  }

  if (hasAttempted && !scoringResult) {
    return (
      <div className="b-bg-muted border b-border rounded-lg p-4">
        <div className="flex items-center gap-2 b-text-secondary">
          <span className="text-lg">✓</span>
          <span className="text-sm">
            You&apos;ve already earned bonus points for this exercise!
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="b-bg-muted border b-border rounded-lg overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full p-4 flex items-center justify-between hover:bg-b-border-light transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🎤</span>
          <div className="text-left">
            <h3 className="font-semibold b-text-logic">
              Bonus Points Challenge
            </h3>
            <p className="text-xs text-b-logic">
              Read the passage aloud for 1-5 bonus points!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isRecording && !isProcessing && !scoringResult && (
            <div className="text-right">
              <div className="text-lg font-bold text-b-logic">+1-5</div>
              <div className="text-xs text-b-logic">points</div>
            </div>
          )}
          {isCollapsed ? (
            <CaretDown size={20} weight="bold" className="b-text-muted" />
          ) : (
            <CaretUp size={20} weight="bold" className="b-text-muted" />
          )}
        </div>
      </button>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="px-4 pb-4 space-y-4">
          {/* Instructions */}
          {!isRecording && !isProcessing && !scoringResult && (
            <div className="b-bg-card rounded-lg p-3 text-sm b-text-logic space-y-2">
              <p className="font-medium">How it works:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>
                  Click &quot;Start Reading&quot; and read the passage aloud
                  clearly
                </li>
                <li>Aim for a natural reading pace (not too fast!)</li>
                <li>Try to read accurately and confidently</li>
                <li>
                  Click &quot;Stop &amp; Score&quot; when you&apos;re done
                </li>
              </ul>
            </div>
          )}

          {/* Recording State */}
          {isRecording && (
            <div className="b-bg-card rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 b-bg-latin rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium b-text-primary">
                      Recording...
                    </span>
                  </div>
                  <span className="text-sm b-text-secondary font-mono">
                    {formatTime(recordingTime)}
                  </span>
                </div>
              </div>

              {transcript && (
                <div className="b-bg-muted rounded p-3 max-h-32 overflow-y-auto">
                  <p className="text-xs b-text-muted mb-1">Live Transcript:</p>
                  <p className="text-sm b-text-primary">{transcript}</p>
                </div>
              )}

              <button
                onClick={handleStopAndScore}
                className="w-full b-bg-logic text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors font-medium text-sm"
              >
                Stop & Score My Reading
              </button>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="b-bg-card rounded-lg p-4 flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-b-logic"></div>
              <span className="text-sm b-text-logic font-medium">
                Analyzing your reading...
              </span>
            </div>
          )}

          {/* Scoring Result */}
          {scoringResult && (
            <div className="b-bg-card rounded-lg p-4 space-y-4">
              {/* Points Earned */}
              <div className="text-center pb-3 border-b b-border">
                <div className="text-4xl font-bold text-b-logic mb-1">
                  +{scoringResult.totalScore} Points!
                </div>
                <p className="text-sm b-text-secondary">
                  {scoringResult.feedback}
                </p>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-2">
                <p className="text-xs font-semibold b-text-secondary mb-2">
                  Performance Breakdown:
                </p>

                {/* Accuracy */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="b-text-secondary">Accuracy</span>
                    <span className="font-medium b-text-primary">
                      {scoringResult.accuracy}/100
                    </span>
                  </div>
                  <div className="h-2 bg-b-border rounded-full overflow-hidden">
                    <div
                      className="h-full b-bg-reading transition-all"
                      style={{ width: `${scoringResult.accuracy}%` }}
                    />
                  </div>
                </div>

                {/* Speed */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="b-text-secondary">Speed</span>
                    <span className="font-medium b-text-primary">
                      {scoringResult.speed}/100
                    </span>
                  </div>
                  <div className="h-2 bg-b-border rounded-full overflow-hidden">
                    <div
                      className="h-full b-bg-math transition-all"
                      style={{ width: `${scoringResult.speed}%` }}
                    />
                  </div>
                </div>

                {/* Clarity */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="b-text-secondary">Clarity</span>
                    <span className="font-medium b-text-primary">
                      {scoringResult.clarity}/100
                    </span>
                  </div>
                  <div className="h-2 bg-b-border rounded-full overflow-hidden">
                    <div
                      className="h-full b-bg-logic transition-all"
                      style={{ width: `${scoringResult.clarity}%` }}
                    />
                  </div>
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="b-text-secondary">Confidence</span>
                    <span className="font-medium b-text-primary">
                      {scoringResult.confidence}/100
                    </span>
                  </div>
                  <div className="h-2 bg-b-border rounded-full overflow-hidden">
                    <div
                      className="h-full b-bg-writing transition-all"
                      style={{ width: `${scoringResult.confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="b-bg-muted rounded p-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="b-text-secondary">Words per minute:</span>
                  <span className="font-medium b-text-primary">
                    {scoringResult.details.wordsPerMinute} WPM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="b-text-secondary">Word accuracy:</span>
                  <span className="font-medium b-text-primary">
                    {scoringResult.details.matchedWords}/
                    {scoringResult.details.totalWords} (
                    {scoringResult.details.accuracyPercentage}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="b-text-secondary">Speech clarity:</span>
                  <span className="font-medium b-text-primary">
                    {Math.round(scoringResult.details.avgConfidence * 100)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="b-bg-latin-light border b-border-latin rounded-lg p-3">
              <p className="text-sm b-text-latin">{error}</p>
            </div>
          )}

          {/* Start Button */}
          {!isRecording && !isProcessing && !scoringResult && (
            <button
              onClick={startRecording}
              className="w-full b-btn b-btn-reading py-2.5 px-5 font-medium flex items-center justify-center gap-2"
            >
              <span className="text-lg">🎤</span>
              Start Reading Aloud
            </button>
          )}
        </div>
      )}
    </div>
  )
}

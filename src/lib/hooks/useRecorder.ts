'use client'

/**
 * useRecorder Hook
 * Manages audio recording state and Web Speech API transcription
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import { logger } from '@/lib/logger'
import type {
  SpeechRecognitionInstance,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
  WindowWithSpeechRecognition,
} from '@/lib/types/common'

interface UseRecorderOptions {
  onRecordingComplete?: (
    audioBlob: Blob,
    audioUrl: string,
    duration: number,
    transcript: string
  ) => void
}

interface UseRecorderReturn {
  isRecording: boolean
  isPaused: boolean
  recordingTime: number
  realtimeTranscript: string
  startRecording: () => Promise<void>
  stopRecording: () => void
  togglePause: () => void
  formatTime: (seconds: number) => string
}

export function useRecorder({
  onRecordingComplete,
}: UseRecorderOptions = {}): UseRecorderReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [realtimeTranscript, setRealtimeTranscript] = useState('')

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (recognitionRef.current) recognitionRef.current.stop()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Format time helper
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Start real-time transcription
  const startRealtimeTranscription = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const win = window as unknown as WindowWithSpeechRecognition
      const SpeechRecognition =
        win.webkitSpeechRecognition || win.SpeechRecognition
      if (!SpeechRecognition) return
      const recognition = new SpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setRealtimeTranscript(transcript)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        logger.error('UseRecorder', 'Speech recognition error', {
          data: { error: event.error },
        })
      }

      recognition.start()
      recognitionRef.current = recognition
    }
  }, [])

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/webm',
        })
        const audioUrl = URL.createObjectURL(audioBlob)

        // Call completion callback
        onRecordingComplete?.(
          audioBlob,
          audioUrl,
          recordingTime,
          realtimeTranscript
        )

        // Reset transcript for next recording
        setRealtimeTranscript('')

        // Cleanup stream
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      // Start real-time transcription
      startRealtimeTranscription()
    } catch (error) {
      logger.error('UseRecorder', 'Error starting recording', { error })
      throw new Error('Could not access microphone. Please grant permission.')
    }
  }, [
    onRecordingComplete,
    recordingTime,
    realtimeTranscript,
    startRealtimeTranscription,
  ])

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isRecording])

  // Pause/Resume recording
  const togglePause = useCallback(() => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume()
        if (recognitionRef.current) recognitionRef.current.start()
        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1)
        }, 1000)
      } else {
        mediaRecorderRef.current.pause()
        if (recognitionRef.current) recognitionRef.current.stop()
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
      setIsPaused(!isPaused)
    }
  }, [isPaused])

  return {
    isRecording,
    isPaused,
    recordingTime,
    realtimeTranscript,
    startRecording,
    stopRecording,
    togglePause,
    formatTime,
  }
}

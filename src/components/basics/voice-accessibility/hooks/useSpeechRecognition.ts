/**
 * Speech Recognition Hook
 * Handles Web Speech API integration for voice-to-text
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../types'
import { logger } from '@/lib/logger'

export interface UseSpeechRecognitionOptions {
  onResult: (transcript: string) => void
  onStart?: () => void
  onEnd?: (transcript: string) => void
  onError?: (error: string) => void
  continuous?: boolean
  interimResults?: boolean
  lang?: string
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean
  transcript: string
  startListening: () => void
  stopListening: () => void
  toggleListening: () => void
  isSupported: boolean
}

/**
 * Custom hook for speech recognition
 */
export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions
): UseSpeechRecognitionReturn {
  const {
    onResult,
    onStart,
    onEnd,
    onError,
    continuous = false,
    interimResults = true,
    lang = 'en-US'
  } = options

  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition
      setIsSupported(true)

      recognition.continuous = continuous
      recognition.interimResults = interimResults
      recognition.lang = lang

      recognition.onstart = () => {
        setIsListening(true)
        onStart?.()
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)

        if (finalTranscript) {
          onResult(finalTranscript.trim())
        }
      }

      recognition.onend = () => {
        setIsListening(false)
        onEnd?.(transcript)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        logger.error('useSpeechRecognition', 'Speech recognition error', { data: event.error })
        setIsListening(false)
        onError?.(event.error)
      }
    } else {
      setIsSupported(false)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [continuous, interimResults, lang, onResult, onStart, onEnd, onError, transcript])

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript('')
      recognitionRef.current.start()
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    toggleListening,
    isSupported
  }
}

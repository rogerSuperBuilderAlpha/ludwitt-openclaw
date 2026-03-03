/**
 * Text-to-Speech Hook
 * Handles speech synthesis for voice feedback
 */

import { useEffect, useRef, useCallback } from 'react'

export interface UseTextToSpeechOptions {
  rate?: number
  pitch?: number
  volume?: number
  lang?: string
}

export interface UseTextToSpeechReturn {
  speak: (text: string) => void
  cancel: () => void
  pause: () => void
  resume: () => void
  isSupported: boolean
  isSpeaking: boolean
}

/**
 * Custom hook for text-to-speech
 */
export function useTextToSpeech(
  options: UseTextToSpeechOptions = {}
): UseTextToSpeechReturn {
  const {
    rate = 0.9,
    pitch = 1,
    volume = 0.8,
    lang = 'en-US'
  } = options

  const synthRef = useRef<SpeechSynthesis | null>(null)
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    if (isSupported) {
      synthRef.current = window.speechSynthesis
    }
  }, [isSupported])

  const speak = useCallback((text: string) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume
      utterance.lang = lang

      synthRef.current.speak(utterance)
    }
  }, [rate, pitch, volume, lang])

  const cancel = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
    }
  }, [])

  const pause = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.pause()
    }
  }, [])

  const resume = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.resume()
    }
  }, [])

  const isSpeaking = synthRef.current?.speaking || false

  return {
    speak,
    cancel,
    pause,
    resume,
    isSupported,
    isSpeaking
  }
}

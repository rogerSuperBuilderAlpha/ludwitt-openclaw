/**
 * Classical Language Pronunciation Utility
 *
 * Uses Web Speech API to provide audio pronunciation for Latin and Greek text.
 * Configured for slow, clear pronunciation suitable for language learning.
 */

export type ClassicalLanguage = 'latin' | 'greek'

/** Speech speed presets for language learning */
export type SpeechSpeed = 'slow' | 'normal' | 'fast'

/** Speed preset values */
export const SPEECH_SPEEDS: Record<
  SpeechSpeed,
  { rate: number; label: string; icon: string }
> = {
  slow: { rate: 0.5, label: 'Slow', icon: '🐢' },
  normal: { rate: 0.75, label: 'Normal', icon: '🚶' },
  fast: { rate: 1.0, label: 'Fast', icon: '🏃' },
}

interface PronunciationOptions {
  /** Speech rate (0.1 to 2.0, default 0.8 for learning) */
  rate?: number
  /** Speech pitch (0 to 2, default 1) */
  pitch?: number
  /** Volume (0 to 1, default 1) */
  volume?: number
  /** Speed preset (overrides rate if provided) */
  speed?: SpeechSpeed
}

const DEFAULT_OPTIONS: PronunciationOptions = {
  rate: 0.75, // Slower for learning
  pitch: 1,
  volume: 1,
}

// Language codes for Web Speech API
const LANGUAGE_CODES: Record<ClassicalLanguage, string[]> = {
  // Latin: Try Italian (closest living Romance), then Spanish, then English
  latin: ['it-IT', 'es-ES', 'en-US'],
  // Greek: Try Modern Greek, then English
  greek: ['el-GR', 'en-US'],
}

/**
 * Check if speech synthesis is available
 */
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Get available voices for a language
 */
export function getVoicesForLanguage(
  language: ClassicalLanguage
): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return []

  const voices = speechSynthesis.getVoices()
  const preferredCodes = LANGUAGE_CODES[language]

  // Find voices matching preferred language codes
  for (const code of preferredCodes) {
    const matchingVoices = voices.filter((v) =>
      v.lang.startsWith(code.split('-')[0])
    )
    if (matchingVoices.length > 0) {
      return matchingVoices
    }
  }

  // Fallback to any voice
  return voices
}

/**
 * Speak text in a classical language
 */
export function speakClassical(
  text: string,
  language: ClassicalLanguage,
  options: PronunciationOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      reject(new Error('Speech synthesis not supported'))
      return
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    // Apply options - speed preset overrides rate
    const opts = { ...DEFAULT_OPTIONS, ...options }
    const rate = opts.speed
      ? SPEECH_SPEEDS[opts.speed].rate
      : (opts.rate ?? 0.75)
    utterance.rate = rate
    utterance.pitch = opts.pitch ?? 1
    utterance.volume = opts.volume ?? 1

    // Try to find an appropriate voice
    const voices = getVoicesForLanguage(language)
    if (voices.length > 0) {
      utterance.voice = voices[0]
    }

    // Set language hint
    const langCode = LANGUAGE_CODES[language][0]
    utterance.lang = langCode

    utterance.onend = () => resolve()
    utterance.onerror = (event) => reject(event.error)

    speechSynthesis.speak(utterance)
  })
}

/**
 * Stop any ongoing speech
 */
export function stopSpeech(): void {
  if (isSpeechSynthesisSupported()) {
    speechSynthesis.cancel()
  }
}

/**
 * Check if currently speaking
 */
export function isSpeaking(): boolean {
  if (!isSpeechSynthesisSupported()) return false
  return speechSynthesis.speaking
}

/**
 * Hook-friendly pronunciation function with state tracking
 */
export function createPronunciationController() {
  const currentUtterance: SpeechSynthesisUtterance | null = null

  return {
    speak: (
      text: string,
      language: ClassicalLanguage,
      options?: PronunciationOptions
    ) => {
      return speakClassical(text, language, options)
    },
    stop: stopSpeech,
    isSpeaking,
    isSupported: isSpeechSynthesisSupported,
  }
}

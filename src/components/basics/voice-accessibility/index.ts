/**
 * Voice & Accessibility System - Main exports
 */

export { VoiceAccessibilitySystem } from './VoiceAccessibilitySystem'
export { AccessibilitySettingsPanel } from './AccessibilitySettingsPanel'
export { VoiceCommandHandler } from './VoiceCommandHandler'
export { createVoiceCommands } from './voiceCommands'
export { useSpeechRecognition } from './hooks/useSpeechRecognition'
export { useTextToSpeech } from './hooks/useTextToSpeech'

// Re-export types
export type {
  VoiceCommand,
  AccessibilityGear,
  VoiceAccessibilitySystemProps,
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
} from './types'

export type {
  UseSpeechRecognitionOptions,
  UseSpeechRecognitionReturn,
} from './hooks/useSpeechRecognition'

export type {
  UseTextToSpeechOptions,
  UseTextToSpeechReturn,
} from './hooks/useTextToSpeech'

export type { VoiceCommandHandlerConfig } from './VoiceCommandHandler'

export type { VoiceCommandsConfig } from './voiceCommands'

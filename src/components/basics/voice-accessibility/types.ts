/**
 * Shared types for Voice & Accessibility System
 */

import { SubjectProgressDisplay } from '@/lib/types/basics'

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

export interface VoiceCommand {
  command: string
  action: () => void
  description: string
  category: 'navigation' | 'input' | 'system' | 'learning'
}

export interface AccessibilityGear {
  voiceInput: boolean
  voiceCommands: boolean
  screenReader: boolean
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  keyboardNavigation: boolean
}

export interface VoiceAccessibilitySystemProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  onVoiceAnswer: (answer: string, type: 'math' | 'reading' | 'latin' | 'greek' | 'logic') => void
  onVoiceCommand: (command: string) => void
  userId?: string
  showControls?: boolean  // Control whether to show the floating control buttons
  externalVoiceControl?: boolean  // If true, voice is controlled externally
  isExternallyActive?: boolean  // External voice state
  externalPanelControl?: boolean  // If true, panel is controlled externally
  isPanelOpen?: boolean  // External panel state
  onPanelToggle?: (open: boolean) => void  // External panel control callback
}

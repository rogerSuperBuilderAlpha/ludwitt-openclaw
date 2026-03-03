'use client'

/**
 * Voice & Accessibility System
 *
 * FUNCTIONALITY:
 * - ✅ REAL Web Speech API integration (voice-to-text)
 * - ✅ 15+ working voice commands (navigation, submission, etc.)
 * - ✅ Text-to-speech feedback system
 * - ✅ Settings persist via localStorage
 * - ✅ High contrast, large text, reduced motion WORK
 * - ✅ REAL IMPACT: Voice answers fill input fields, accessibility settings apply
 *
 * USER IMPACT: HIGH - Full hands-free operation, accessibility compliance
 * DATA: 100% REAL - Speech API, persistent settings, actual DOM manipulation
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  Microphone,
  MicrophoneSlash,
  SpeakerHigh,
  SpeakerX,
  Gear,
} from '@phosphor-icons/react'
import { UnifiedModal } from '../UnifiedModal'
import { VoiceAccessibilitySystemProps, AccessibilityGear } from './types'
import { useSpeechRecognition } from './hooks/useSpeechRecognition'
import { useTextToSpeech } from './hooks/useTextToSpeech'
import { createVoiceCommands } from './voiceCommands'
import { VoiceCommandHandler } from './VoiceCommandHandler'
import { AccessibilitySettingsPanel } from './AccessibilitySettingsPanel'
import { logger } from '@/lib/logger'

export function VoiceAccessibilitySystem({
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  onVoiceAnswer,
  onVoiceCommand,
  userId,
  showControls = false, // Default to false - controlled by toolbar
  externalVoiceControl = false,
  isExternallyActive = false,
  externalPanelControl = false,
  isPanelOpen = false,
  onPanelToggle,
}: VoiceAccessibilitySystemProps) {
  const [internalPanelState, setInternalPanelState] = useState(false)
  const [accessibilityGear, setAccessibilityGear] = useState<AccessibilityGear>(
    {
      voiceInput: false,
      voiceCommands: false,
      screenReader: false,
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      keyboardNavigation: true,
    }
  )
  const [currentFocus, setCurrentFocus] = useState<'math' | 'reading' | null>(
    null
  )
  const containerRef = useRef<HTMLDivElement>(null)

  // Use external control if provided, otherwise use internal state
  const showAccessibilityPanel = externalPanelControl
    ? isPanelOpen
    : internalPanelState
  const setShowAccessibilityPanel = (open: boolean) => {
    if (externalPanelControl && onPanelToggle) {
      onPanelToggle(open)
    } else {
      setInternalPanelState(open)
    }
  }

  // Load accessibility settings
  useEffect(() => {
    const saved = localStorage.getItem(`accessibility_settings_${userId}`)
    if (saved) {
      try {
        setAccessibilityGear(JSON.parse(saved))
      } catch (error) {
        logger.error(
          'VoiceAccessibilitySystem',
          'Failed to load accessibility settings',
          { error }
        )
      }
    }
  }, [userId])

  // Save accessibility settings
  const saveGear = useCallback(
    (settings: AccessibilityGear) => {
      try {
        localStorage.setItem(
          `accessibility_settings_${userId}`,
          JSON.stringify(settings)
        )
      } catch (error) {
        logger.error(
          'VoiceAccessibilitySystem',
          'Failed to save accessibility settings',
          { error }
        )
      }
    },
    [userId]
  )

  // Text-to-speech hook
  const { speak: speakText, isSupported: ttsSupported } = useTextToSpeech({
    rate: 0.9,
    pitch: 1,
    volume: 0.8,
  })

  // Wrap speakText to respect settings
  const speakTextConditional = useCallback(
    (text: string) => {
      if (accessibilityGear.voiceCommands) {
        speakText(text)
      }
    },
    [accessibilityGear.voiceCommands, speakText]
  )

  // Create voice commands with current dependencies
  const voiceCommands = useMemo(
    () =>
      createVoiceCommands({
        mathProgress,
        readingProgress,
        latinXP,
        greekXP,
        logicXP,
        setCurrentFocus,
        speakText: speakTextConditional,
      }),
    [
      mathProgress,
      readingProgress,
      latinXP,
      greekXP,
      logicXP,
      speakTextConditional,
    ]
  )

  // Voice command handler
  const commandHandlerRef = useRef<VoiceCommandHandler | null>(null)

  useEffect(() => {
    commandHandlerRef.current = new VoiceCommandHandler({
      voiceCommands,
      currentFocus,
      onVoiceAnswer,
      onVoiceCommand,
      speakText: speakTextConditional,
      voiceCommandsEnabled: accessibilityGear.voiceCommands,
    })
  }, [
    voiceCommands,
    currentFocus,
    onVoiceAnswer,
    onVoiceCommand,
    speakTextConditional,
    accessibilityGear.voiceCommands,
  ])

  // Handle voice input from speech recognition
  const handleVoiceInput = useCallback((transcript: string) => {
    if (commandHandlerRef.current) {
      commandHandlerRef.current.handleVoiceInput(transcript)
    }
  }, [])

  // Speech recognition hook
  const {
    isListening,
    transcript,
    toggleListening,
    isSupported: sttSupported,
  } = useSpeechRecognition({
    onResult: handleVoiceInput,
    onStart: () => {
      if (accessibilityGear.voiceCommands) {
        speakText('Listening... Say your answer or command.')
      }
    },
    onEnd: (finalTranscript) => {
      if (finalTranscript && accessibilityGear.voiceCommands) {
        speakText(`Heard: ${finalTranscript}`)
      }
    },
    onError: (error) => {
      if (accessibilityGear.voiceCommands) {
        speakText('Voice recognition error. Please try again.')
      }
    },
    continuous: false,
    interimResults: true,
  })

  // Update accessibility settings
  const updateSetting = useCallback(
    (key: keyof AccessibilityGear, value: boolean) => {
      const newGear = { ...accessibilityGear, [key]: value }
      setAccessibilityGear(newGear)
      saveGear(newGear)

      // Apply immediate effects
      if (key === 'highContrast') {
        document.documentElement.classList.toggle('high-contrast', value)
      } else if (key === 'largeText') {
        document.documentElement.classList.toggle('large-text', value)
      } else if (key === 'reducedMotion') {
        document.documentElement.classList.toggle('reduced-motion', value)
      }
    },
    [accessibilityGear, saveGear]
  )

  // Keyboard navigation enhancement
  useEffect(() => {
    if (!accessibilityGear.keyboardNavigation) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Enhanced tab navigation
      if (event.key === 'Tab') {
        // Add visible focus indicators
        setTimeout(() => {
          const focused = document.activeElement as HTMLElement
          if (focused) {
            focused.style.outline = '3px solid var(--b-math-primary, #3b82f6)'
            focused.style.outlineOffset = '2px'
          }
        }, 0)
      }

      // Arrow key navigation for custom components
      // Skip if user is typing in a text input or textarea (let arrow keys work normally there)
      if (event.key.startsWith('Arrow')) {
        const activeElement = document.activeElement as HTMLElement
        const tagName = activeElement?.tagName?.toLowerCase()
        const inputType = (
          activeElement as HTMLInputElement
        )?.type?.toLowerCase()

        // If focused on a text input or textarea, let arrow keys work normally for text navigation
        const isTextInput =
          tagName === 'textarea' ||
          (tagName === 'input' &&
            [
              'text',
              'number',
              'email',
              'search',
              'tel',
              'url',
              'password',
            ].includes(inputType || ''))

        if (isTextInput) {
          // Don't intercept - let the input handle arrow keys for cursor movement
          return
        }

        const focusableElements = document.querySelectorAll(
          'button, [href], select, [tabindex]:not([tabindex="-1"]):not(input):not(textarea)'
        )
        const currentIndex = Array.from(focusableElements).indexOf(
          activeElement as Element
        )

        if (currentIndex !== -1) {
          event.preventDefault()
          let newIndex = currentIndex

          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            newIndex = Math.min(currentIndex + 1, focusableElements.length - 1)
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            newIndex = Math.max(currentIndex - 1, 0)
          }

          ;(focusableElements[newIndex] as HTMLElement).focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [accessibilityGear.keyboardNavigation])

  // Screen reader announcements
  useEffect(() => {
    if (!accessibilityGear.screenReader || !containerRef.current) return

    const target = containerRef.current

    // Announce page changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Announce new content for screen readers
          const newContent = Array.from(mutation.addedNodes)
            .filter(
              (node) =>
                node.nodeType === Node.TEXT_NODE || (node as Element).tagName
            )
            .map((node) => node.textContent || (node as Element).textContent)
            .join(' ')
            .trim()

          if (newContent && newContent.length > 10) {
            speakTextConditional(`New content: ${newContent.substring(0, 100)}`)
          }
        }
      })
    })

    observer.observe(target, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [accessibilityGear.screenReader, speakTextConditional])

  return (
    <div ref={containerRef}>
      {/* Accessibility Controls Bar (Optional - controlled by showControls prop) */}
      {showControls && (
        <div className="fixed top-4 left-4 z-40 flex gap-2">
          {/* Voice Input Toggle */}
          <button
            onClick={toggleListening}
            disabled={!sttSupported}
            className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
              isListening
                ? 'bg-b-danger text-text-white animate-pulse'
                : accessibilityGear.voiceInput
                  ? 'b-bg-math text-white hover:b-bg-math'
                  : 'bg-b-border b-text-secondary'
            }`}
            aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
            title="Voice Input (V)"
          >
            {isListening ? (
              <MicrophoneSlash size={20} />
            ) : (
              <Microphone size={20} />
            )}
          </button>

          {/* Text-to-Speech Toggle */}
          <button
            onClick={() =>
              updateSetting('voiceCommands', !accessibilityGear.voiceCommands)
            }
            disabled={!ttsSupported}
            className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
              accessibilityGear.voiceCommands
                ? 'b-bg-reading text-white hover:b-bg-reading'
                : 'bg-b-border b-text-secondary hover:bg-b-border-muted'
            }`}
            aria-label="Toggle voice feedback"
            title="Voice Feedback"
          >
            {accessibilityGear.voiceCommands ? (
              <SpeakerHigh size={20} />
            ) : (
              <SpeakerX size={20} />
            )}
          </button>

          {/* Accessibility Gear */}
          <button
            onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
            className="p-3 b-bg-logic text-white rounded-full shadow-lg hover:b-bg-logic transition-all duration-200"
            aria-label="Accessibility settings"
            title="Accessibility Gear"
          >
            <Gear size={20} />
          </button>
        </div>
      )}

      {/* Voice Status Indicator */}
      {(isListening || transcript) && (
        <div className="fixed top-20 left-4 z-40 b-bg-card rounded-lg shadow-lg p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Microphone
              className={`w-4 h-4 ${isListening ? 'text-b-danger animate-pulse' : 'b-text-muted'}`}
            />
            <span className="text-sm font-medium b-text-primary">
              Voice Input
            </span>
          </div>
          {transcript && (
            <p className="text-sm b-text-secondary italic">
              &quot;{transcript}&quot;
            </p>
          )}
          {isListening && (
            <p className="text-xs b-text-muted mt-1">Listening...</p>
          )}
        </div>
      )}

      {/* Accessibility Gear Panel */}
      <UnifiedModal
        isOpen={showAccessibilityPanel}
        onClose={() => setShowAccessibilityPanel(false)}
        title="Accessibility Settings"
        subtitle="Customize your learning experience"
        icon={<Gear size={22} weight="bold" className="b-text-reading" />}
        size="md"
        position="center"
      >
        <AccessibilitySettingsPanel
          accessibilityGear={accessibilityGear}
          voiceCommands={voiceCommands}
          onUpdateSetting={updateSetting}
        />
      </UnifiedModal>

      {/* CSS for accessibility features */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(150%);
        }

        .high-contrast * {
          border-color: #000 !important;
        }

        .large-text {
          font-size: 120% !important;
        }

        .large-text * {
          font-size: inherit !important;
        }

        .reduced-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        /* Enhanced focus indicators */
        .accessibility-enhanced *:focus {
          outline: 3px solid var(--b-math-primary, #3b82f6) !important;
          outline-offset: 2px !important;
        }

        /* Screen reader only content */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  )
}

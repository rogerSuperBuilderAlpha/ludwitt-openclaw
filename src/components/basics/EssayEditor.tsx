'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Warning, CheckCircle, XCircle } from '@phosphor-icons/react'
import { WRITING_COMPETITION_CONSTANTS as CONSTANTS } from '@/lib/types/writing-competition'

interface EssayEditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  onTypingTimeUpdate?: (seconds: number) => void
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  if (!text || typeof text !== 'string') return 0
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}

/**
 * Get word count status and styling
 */
function getWordCountStatus(count: number): {
  status: 'too-short' | 'valid' | 'too-long'
  color: string
  bgColor: string
  icon: typeof CheckCircle
} {
  if (count < CONSTANTS.MIN_WORD_COUNT) {
    return {
      status: 'too-short',
      color: 'b-text-writing',
      bgColor: 'b-bg-writing-light b-border-writing',
      icon: Warning,
    }
  }
  if (count > CONSTANTS.MAX_WORD_COUNT) {
    return {
      status: 'too-long',
      color: 'b-text-latin',
      bgColor: 'b-bg-latin-light b-border-latin',
      icon: XCircle,
    }
  }
  return {
    status: 'valid',
    color: 'b-text-reading',
    bgColor: 'b-bg-reading-light b-border-reading',
    icon: CheckCircle,
  }
}

export function EssayEditor({
  value,
  onChange,
  disabled = false,
  placeholder = 'Start typing your essay here...',
  onTypingTimeUpdate,
}: EssayEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [showPasteWarning, setShowPasteWarning] = useState(false)
  const lastActivityRef = useRef<number>(Date.now())

  const wordCount = countWords(value)
  const {
    status,
    color,
    bgColor,
    icon: StatusIcon,
  } = getWordCountStatus(wordCount)

  // Track typing time
  useEffect(() => {
    if (!isFocused) return

    const interval = setInterval(() => {
      const now = Date.now()
      // If user was active in the last 5 seconds, count this as typing time
      if (now - lastActivityRef.current < 5000) {
        onTypingTimeUpdate?.(1) // 1 second increment
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isFocused, onTypingTimeUpdate])

  // Handle text change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      lastActivityRef.current = Date.now()
      onChange(e.target.value)
    },
    [onChange]
  )

  // Block paste
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    setShowPasteWarning(true)
    setTimeout(() => setShowPasteWarning(false), 3000)
  }, [])

  // Block keyboard paste shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    lastActivityRef.current = Date.now()

    // Block Ctrl+V / Cmd+V
    if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) {
      e.preventDefault()
      setShowPasteWarning(true)
      setTimeout(() => setShowPasteWarning(false), 3000)
    }
  }, [])

  // Block context menu (right-click paste)
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  // Word count message
  const getWordCountMessage = () => {
    if (wordCount < CONSTANTS.MIN_WORD_COUNT) {
      return `${CONSTANTS.MIN_WORD_COUNT - wordCount} more words needed`
    }
    if (wordCount > CONSTANTS.MAX_WORD_COUNT) {
      return `${wordCount - CONSTANTS.MAX_WORD_COUNT} words over limit`
    }
    return 'Word count ✓'
  }

  return (
    <div className="relative">
      {/* Word count indicator */}
      <div
        className={`flex items-center justify-between mb-2 px-3 py-1.5 rounded-lg border ${bgColor}`}
      >
        <div className="flex items-center gap-2">
          <StatusIcon size={16} weight="bold" className={color} />
          <span className={`text-sm font-medium ${color}`}>
            {wordCount}/{CONSTANTS.TARGET_WORD_COUNT} words
          </span>
        </div>
        <span className={`text-xs ${color}`}>{getWordCountMessage()}</span>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onContextMenu={handleContextMenu}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full min-h-[280px] p-4 rounded-xl border-2 resize-none
            font-serif text-base leading-relaxed
            transition-all duration-200
            ${
              disabled
                ? 'b-bg-muted b-text-muted cursor-not-allowed b-border'
                : isFocused
                  ? 'b-border-logic ring-4 ring-b-bg-logic-light b-bg-card'
                  : 'b-border b-bg-card hover:border-b-border-muted'
            }
            focus:outline-none
          `}
          style={{
            fontSize: '16px',
          }}
        />

        {/* Copy/paste disabled notice */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs b-text-muted">
          <span className="flex items-center gap-1">
            <Warning size={12} />
            Copy/paste disabled to encourage original writing
          </span>
        </div>
      </div>

      {/* Paste warning toast */}
      {showPasteWarning && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-b-danger text-text-white px-6 py-3 rounded-xl shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <XCircle size={20} weight="bold" />
              <span className="font-medium">Pasting is disabled</span>
            </div>
            <p className="text-sm text-b-danger-light mt-1">
              Please type your essay to ensure original work
            </p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="mt-3 h-2 b-bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            status === 'too-short'
              ? 'b-bg-writing'
              : status === 'too-long'
                ? 'b-bg-latin'
                : 'b-bg-reading'
          }`}
          style={{
            width: `${Math.min(100, (wordCount / CONSTANTS.TARGET_WORD_COUNT) * 100)}%`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs b-text-muted">
        <span>0</span>
        <span>{CONSTANTS.MIN_WORD_COUNT}</span>
        <span>{CONSTANTS.TARGET_WORD_COUNT}</span>
        <span>{CONSTANTS.MAX_WORD_COUNT}</span>
      </div>
    </div>
  )
}

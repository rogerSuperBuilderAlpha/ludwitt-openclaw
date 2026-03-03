/* eslint-disable jsx-a11y/no-autofocus */
'use client'

import { useState, useRef, useCallback } from 'react'
import { Function as MathIcon } from '@phosphor-icons/react'
import { MathSymbolPicker } from './MathSymbolPicker'

interface InputWithSymbolsProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  multiline?: boolean
  rows?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
  onFocus?: () => void
  onBlur?: () => void
  autoFocus?: boolean
  label?: string
  hint?: string
}

export function InputWithSymbols({
  value,
  onChange,
  placeholder,
  disabled,
  multiline,
  rows = 4,
  onKeyDown,
  onFocus,
  onBlur,
  autoFocus,
  label,
  hint,
}: InputWithSymbolsProps) {
  const [showSymbols, setShowSymbols] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleInsert = useCallback(
    (symbol: string) => {
      const input = inputRef.current
      if (!input) {
        onChange(value + symbol)
        return
      }

      const start = input.selectionStart || 0
      const end = input.selectionEnd || 0
      const newValue = value.slice(0, start) + symbol + value.slice(end)
      onChange(newValue)

      // Restore focus and move cursor
      setTimeout(() => {
        input.focus()
        const newPos = start + symbol.length
        input.setSelectionRange(newPos, newPos)
      }, 0)
    },
    [value, onChange]
  )

  const inputClasses =
    'w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500'

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <div className="flex gap-2">
        <div className="flex-1 relative">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              autoFocus={autoFocus}
              className={`${inputClasses} resize-y`}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="off"
              autoFocus={autoFocus}
              className={inputClasses}
            />
          )}
        </div>

        {/* Symbol Picker Button with Custom Tooltip */}
        <div className="relative flex-shrink-0">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setShowSymbols(!showSymbols)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            disabled={disabled}
            className={`px-4 py-3 border rounded-lg transition-colors flex items-center gap-1.5 ${
              showSymbols
                ? 'bg-blue-50 border-blue-300 text-blue-600'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            } disabled:opacity-50`}
            aria-label="Insert math symbols"
            aria-expanded={showSymbols}
          >
            <MathIcon size={20} weight="bold" aria-hidden="true" />
            <span className="text-sm font-medium" aria-hidden="true">
              ∑π
            </span>
          </button>
          {/* Custom visible tooltip */}
          {showTooltip && !showSymbols && (
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap shadow-lg z-50 pointer-events-none"
              role="tooltip"
            >
              Insert math symbols
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
            </div>
          )}
        </div>
      </div>

      {/* Symbol Picker - rendered as portal to body */}
      {showSymbols && (
        <MathSymbolPicker
          onInsert={handleInsert}
          onClose={() => setShowSymbols(false)}
          anchorRef={buttonRef}
        />
      )}

      {hint && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
    </div>
  )
}

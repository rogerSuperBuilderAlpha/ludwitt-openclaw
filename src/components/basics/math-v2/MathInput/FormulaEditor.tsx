'use client'

/**
 * FormulaEditor Component
 *
 * A React wrapper around MathLive's mathfield element for LaTeX formula input.
 * Supports interactive editing with virtual keyboard for mobile devices.
 */

import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'

// MathLive types are in src/types/mathlive.d.ts

export interface FormulaEditorRef {
  /** Insert LaTeX at cursor position */
  insert: (latex: string) => void
  /** Focus the editor */
  focus: () => void
  /** Get current LaTeX value */
  getValue: () => string
  /** Set the LaTeX value */
  setValue: (latex: string) => void
  /** Clear the editor */
  clear: () => void
  /** Execute a command (e.g., 'moveToPreviousChar', 'undo') */
  executeCommand: (command: string) => void
}

interface FormulaEditorProps {
  /** Current LaTeX value */
  value: string
  /** Called when value changes */
  onChange: (latex: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the editor is readonly */
  readonly?: boolean
  /** Whether the editor is disabled */
  disabled?: boolean
  /** Auto focus on mount */
  autoFocus?: boolean
  /** Additional CSS classes */
  className?: string
  /** Called when Enter is pressed */
  onSubmit?: () => void
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Show border */
  showBorder?: boolean
}

export const FormulaEditor = forwardRef<FormulaEditorRef, FormulaEditorProps>(
  function FormulaEditor(
    {
      value,
      onChange,
      placeholder = 'Type a formula...',
      readonly = false,
      disabled = false,
      autoFocus = false,
      className = '',
      onSubmit,
      size = 'md',
      showBorder = true,
    },
    ref
  ) {
    const mathFieldRef = useRef<HTMLElement | null>(null)
    const isInitializedRef = useRef(false)
    const lastValueRef = useRef(value)

    // Keep ref in sync with value prop
    useEffect(() => {
      lastValueRef.current = value
    }, [value])

    // Import MathLive only on client side
    useEffect(() => {
      // Dynamically import mathlive to avoid SSR issues
      import('mathlive').then(() => {
        isInitializedRef.current = true
      })
    }, [])

    // Handle value changes from mathfield
    const handleInput = useCallback(() => {
      // Always read directly from the mathfield element - most reliable method
      const mf = mathFieldRef.current as HTMLElement & { value?: string }
      if (mf && mf.value !== undefined && mf.value !== lastValueRef.current) {
        lastValueRef.current = mf.value
        onChange(mf.value)
      }
    }, [onChange])

    // Handle keyboard events for submit
    const handleKeydown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey && onSubmit) {
          event.preventDefault()
          onSubmit()
        }
      },
      [onSubmit]
    )

    // Setup event listeners
    useEffect(() => {
      const mathField = mathFieldRef.current
      if (!mathField) return

      // MathLive fires 'input' on every keystroke
      mathField.addEventListener('input', handleInput)
      // Also listen to 'change' for when focus leaves
      mathField.addEventListener('change', handleInput)
      // Capture on blur as well
      mathField.addEventListener('blur', handleInput)
      mathField.addEventListener('keydown', handleKeydown as EventListener)
      // Also capture on keyup for extra reliability
      mathField.addEventListener('keyup', handleInput)

      return () => {
        mathField.removeEventListener('input', handleInput)
        mathField.removeEventListener('change', handleInput)
        mathField.removeEventListener('blur', handleInput)
        mathField.removeEventListener('keydown', handleKeydown as EventListener)
        mathField.removeEventListener('keyup', handleInput)
      }
    }, [handleInput, handleKeydown])

    // Sync external value changes
    useEffect(() => {
      const mathField = mathFieldRef.current as HTMLElement & { value?: string }
      if (mathField && mathField.value !== value) {
        mathField.value = value
      }
    }, [value])

    // Auto focus
    useEffect(() => {
      if (autoFocus && mathFieldRef.current) {
        setTimeout(() => {
          mathFieldRef.current?.focus()
        }, 100)
      }
    }, [autoFocus])

    // Expose ref methods
    useImperativeHandle(
      ref,
      () => ({
        insert: (latex: string) => {
          const mf = mathFieldRef.current as HTMLElement & {
            executeCommand?: (cmd: string | [string, ...unknown[]]) => void
          }
          if (mf?.executeCommand) {
            mf.executeCommand(['insert', latex])
          }
        },
        focus: () => {
          mathFieldRef.current?.focus()
        },
        getValue: () => {
          return (
            (mathFieldRef.current as HTMLElement & { value?: string })?.value ||
            ''
          )
        },
        setValue: (latex: string) => {
          const mf = mathFieldRef.current as HTMLElement & { value?: string }
          if (mf) {
            mf.value = latex
          }
        },
        clear: () => {
          const mf = mathFieldRef.current as HTMLElement & { value?: string }
          if (mf) {
            mf.value = ''
          }
          onChange('')
        },
        executeCommand: (command: string) => {
          const mf = mathFieldRef.current as HTMLElement & {
            executeCommand?: (cmd: string) => void
          }
          if (mf?.executeCommand) {
            mf.executeCommand(command)
          }
        },
      }),
      [onChange]
    )

    // Size classes
    const sizeClasses = {
      sm: 'b-text-sm min-h-[36px]',
      md: 'b-text-base min-h-[44px]',
      lg: 'b-text-lg min-h-[52px]',
    }

    const baseStyles = `
      w-full
      ${sizeClasses[size]}
      ${showBorder ? 'b-border b-rounded-md' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${readonly ? 'b-bg-muted' : 'b-bg-input'}
      focus-within:border-[var(--b-border-focus)] focus-within:shadow-[var(--b-shadow-focus)]
      transition-all
      ${className}
    `

    return (
      <div
        className={baseStyles}
        style={{
          // Custom styles for MathLive integration
          ['--_background-color' as string]: 'transparent',
        }}
      >
        {/* @ts-expect-error - math-field is a web component from MathLive */}
        <math-field
          ref={mathFieldRef}
          readonly={readonly || disabled || undefined}
          virtual-keyboard-mode="auto"
          math-virtual-keyboard-policy="sandboxed"
          smart-mode={true}
          smart-superscript={true}
          smart-fence={true}
          virtual-keyboards="numeric symbols roman greek"
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: 'var(--b-space-md) var(--b-space-lg)',
            outline: 'none',
            background: 'transparent',
            fontSize: 'inherit',
            fontFamily: 'var(--b-font-sans)',
            border: 'none',
          }}
        />
      </div>
    )
  }
)

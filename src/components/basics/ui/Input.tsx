'use client'

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type InputSize = 'sm' | 'md' | 'lg'
type InputState = 'default' | 'error' | 'success'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize
  state?: InputState
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize = 'md', state = 'default', className = '', ...props }, ref) => {
    const sizeClass = inputSize !== 'md' ? `b-input-${inputSize}` : ''
    const stateClass = state !== 'default' ? `b-input-${state}` : ''

    const classes = ['b-input', sizeClass, stateClass, className]
      .filter(Boolean)
      .join(' ')

    return <input ref={ref} className={classes} {...props} />
  }
)

Input.displayName = 'Input'

// Textarea component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputSize?: InputSize
  state?: InputState
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ inputSize = 'md', state = 'default', className = '', ...props }, ref) => {
    const sizeClass = inputSize !== 'md' ? `b-input-${inputSize}` : ''
    const stateClass = state !== 'default' ? `b-input-${state}` : ''

    const classes = ['b-input', 'b-textarea', sizeClass, stateClass, className]
      .filter(Boolean)
      .join(' ')

    return <textarea ref={ref} className={classes} {...props} />
  }
)

Textarea.displayName = 'Textarea'

'use client'

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors in child components and displays a fallback UI.
 * Prevents the entire app from crashing when a single section fails.
 * 
 * Created: Jan 17, 2026 - Audit remediation
 */

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Warning, ArrowCounterClockwise } from '@phosphor-icons/react'
import { logger } from '@/lib/logger'

interface ErrorBoundaryProps {
  children: ReactNode
  /** Name of the section for better error messages */
  sectionName?: string
  /** Custom fallback UI */
  fallback?: ReactNode
  /** Callback when error occurs */
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  /** Whether to show the retry button */
  showRetry?: boolean
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.error('ErrorBoundary', `${this.props.sectionName || 'Component'} error`, { error })
      logger.error('ErrorBoundary', 'Component stack', { data: errorInfo.componentStack })
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div 
          className="flex flex-col items-center justify-center p-8 rounded-xl border"
          style={{
            backgroundColor: 'var(--b-error-light, #FEE2E2)',
            borderColor: 'var(--b-error, #EF4444)'
          }}
        >
          <Warning size={48} weight="fill" color="var(--b-error, #EF4444)" />
          <h3 
            className="mt-4 text-lg font-bold"
            style={{ color: 'var(--b-error, #EF4444)' }}
          >
            Something went wrong
          </h3>
          <p className="mt-2 text-sm text-center" style={{ color: 'var(--b-text-secondary)' }}>
            {this.props.sectionName 
              ? `The ${this.props.sectionName} section encountered an error.` 
              : 'An unexpected error occurred.'}
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre 
              className="mt-4 p-3 rounded-lg text-xs overflow-x-auto max-w-full"
              style={{ 
                backgroundColor: 'var(--b-bg-muted, #F3F4F6)',
                color: 'var(--b-text-primary)'
              }}
            >
              {this.state.error.message}
            </pre>
          )}

          {this.props.showRetry !== false && (
            <button
              onClick={this.handleRetry}
              className="mt-4 px-4 py-2 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: 'var(--b-primary, #4F46E5)',
                color: 'white'
              }}
            >
              <ArrowCounterClockwise size={18} weight="bold" />
              Try Again
            </button>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Section-specific error boundaries with preset names
 */
export function MathSectionErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary sectionName="Math">{children}</ErrorBoundary>
}

export function ReadingSectionErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary sectionName="Reading">{children}</ErrorBoundary>
}

export function TranslationSectionErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary sectionName="Translation">{children}</ErrorBoundary>
}

export function LogicSectionErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary sectionName="Logic">{children}</ErrorBoundary>
}

export function IndependentStudySectionErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary sectionName="Independent Study">{children}</ErrorBoundary>
}

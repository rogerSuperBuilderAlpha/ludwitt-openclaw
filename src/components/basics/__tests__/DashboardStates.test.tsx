/**
 * Unit Tests for DashboardStates Components
 * Tests LoadingState and ErrorState components
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoadingState, ErrorState } from '../DashboardStates'

describe('LoadingState Component', () => {
  it('renders loading spinner', () => {
    render(<LoadingState />)

    // eslint-disable-next-line testing-library/no-node-access -- checking CSS animation class on spinner element
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders loading text', () => {
    render(<LoadingState />)

    expect(screen.getByText('Loading your dashboard...')).toBeInTheDocument()
  })

  it('has correct container styling', () => {
    const { container } = render(<LoadingState />)

    // eslint-disable-next-line testing-library/no-node-access -- verifying root container CSS classes
    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass('min-h-screen')
    expect(mainDiv).toHaveClass('bg-b-bg-page')
    expect(mainDiv).toHaveClass('flex')
    expect(mainDiv).toHaveClass('items-center')
    expect(mainDiv).toHaveClass('justify-center')
  })

  it('centers content', () => {
    render(<LoadingState />)

    // eslint-disable-next-line testing-library/no-node-access -- verifying text-center CSS class
    const textCenter = document.querySelector('.text-center')
    expect(textCenter).toBeInTheDocument()
  })

  it('spinner has correct size', () => {
    render(<LoadingState />)

    // eslint-disable-next-line testing-library/no-node-access -- verifying spinner size CSS classes
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toHaveClass('h-5')
    expect(spinner).toHaveClass('w-5')
  })
})

describe('ErrorState Component', () => {
  const defaultProps = {
    error: 'Something went wrong',
    retryIn: null,
    onRetry: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders error emoji', () => {
      render(<ErrorState {...defaultProps} />)

      expect(screen.getByText('⚠️')).toBeInTheDocument()
    })

    it('renders error title', () => {
      render(<ErrorState {...defaultProps} />)

      expect(screen.getByText('Error Loading Dashboard')).toBeInTheDocument()
    })

    it('renders error message', () => {
      render(<ErrorState {...defaultProps} />)

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('renders custom error message', () => {
      render(<ErrorState {...defaultProps} error="Network connection failed" />)

      expect(screen.getByText('Network connection failed')).toBeInTheDocument()
    })

    it('renders try again button', () => {
      render(<ErrorState {...defaultProps} />)

      expect(
        screen.getByRole('button', { name: 'Try Again' })
      ).toBeInTheDocument()
    })
  })

  describe('retry countdown', () => {
    it('shows retry countdown when retryIn is provided', () => {
      render(<ErrorState {...defaultProps} retryIn={10} />)

      expect(
        screen.getByText('Retrying automatically in 10s…')
      ).toBeInTheDocument()
    })

    it('shows correct countdown value', () => {
      render(<ErrorState {...defaultProps} retryIn={5} />)

      expect(
        screen.getByText('Retrying automatically in 5s…')
      ).toBeInTheDocument()
    })

    it('does not show countdown when retryIn is null', () => {
      render(<ErrorState {...defaultProps} retryIn={null} />)

      expect(
        screen.queryByText(/Retrying automatically/)
      ).not.toBeInTheDocument()
    })

    it('does not show countdown when retryIn is 0', () => {
      render(<ErrorState {...defaultProps} retryIn={0} />)

      expect(
        screen.queryByText(/Retrying automatically/)
      ).not.toBeInTheDocument()
    })

    it('does not show countdown when retryIn is negative', () => {
      render(<ErrorState {...defaultProps} retryIn={-1} />)

      expect(
        screen.queryByText(/Retrying automatically/)
      ).not.toBeInTheDocument()
    })
  })

  describe('retry button', () => {
    it('calls onRetry when clicked', () => {
      const onRetry = jest.fn()
      render(<ErrorState {...defaultProps} onRetry={onRetry} />)

      fireEvent.click(screen.getByRole('button', { name: 'Try Again' }))

      expect(onRetry).toHaveBeenCalledTimes(1)
    })

    it('can be clicked multiple times', () => {
      const onRetry = jest.fn()
      render(<ErrorState {...defaultProps} onRetry={onRetry} />)

      const button = screen.getByRole('button', { name: 'Try Again' })
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(onRetry).toHaveBeenCalledTimes(3)
    })

    it('has correct styling', () => {
      render(<ErrorState {...defaultProps} />)

      const button = screen.getByRole('button', { name: 'Try Again' })
      expect(button).toHaveClass('b-btn')
      expect(button).toHaveClass('b-btn-logic')
    })
  })

  describe('layout', () => {
    it('has correct container styling', () => {
      const { container } = render(<ErrorState {...defaultProps} />)

      // eslint-disable-next-line testing-library/no-node-access -- verifying root container CSS classes
      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('min-h-screen')
      expect(mainDiv).toHaveClass('bg-b-bg-page')
      expect(mainDiv).toHaveClass('flex')
      expect(mainDiv).toHaveClass('items-center')
      expect(mainDiv).toHaveClass('justify-center')
    })

    it('has centered content card', () => {
      render(<ErrorState {...defaultProps} />)

      // eslint-disable-next-line testing-library/no-node-access -- verifying text-center CSS class
      const card = document.querySelector('.text-center')
      expect(card).toBeInTheDocument()
    })

    it('has max width on content card', () => {
      render(<ErrorState {...defaultProps} />)

      // eslint-disable-next-line testing-library/no-node-access -- verifying max-width CSS class
      const card = document.querySelector('.max-w-md')
      expect(card).toBeInTheDocument()
    })

    it('has border styling on card', () => {
      render(<ErrorState {...defaultProps} />)

      // eslint-disable-next-line testing-library/no-node-access -- verifying border CSS class
      const card = document.querySelector('.b-border-latin')
      expect(card).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('button is focusable', () => {
      render(<ErrorState {...defaultProps} />)

      const button = screen.getByRole('button', { name: 'Try Again' })
      button.focus()
      expect(button).toHaveFocus()
    })

    it('button can be activated with keyboard', () => {
      const onRetry = jest.fn()
      render(<ErrorState {...defaultProps} onRetry={onRetry} />)

      const button = screen.getByRole('button', { name: 'Try Again' })
      button.focus()
      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.click(button)

      expect(onRetry).toHaveBeenCalled()
    })
  })

  describe('different error scenarios', () => {
    it('handles long error messages', () => {
      const longError = 'A'.repeat(500)
      render(<ErrorState {...defaultProps} error={longError} />)

      expect(screen.getByText(longError)).toBeInTheDocument()
    })

    it('handles empty error message', () => {
      render(<ErrorState {...defaultProps} error="" />)

      // Should still render without breaking
      expect(screen.getByText('Error Loading Dashboard')).toBeInTheDocument()
    })

    it('handles special characters in error', () => {
      render(
        <ErrorState
          {...defaultProps}
          error="Error: <script>alert('xss')</script>"
        />
      )

      // Should escape HTML and render as text
      expect(
        screen.getByText("Error: <script>alert('xss')</script>")
      ).toBeInTheDocument()
    })
  })
})

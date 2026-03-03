import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorBoundary } from '../ErrorBoundary'

// Suppress console.error output from React and the ErrorBoundary during tests
const originalConsoleError = console.error
beforeAll(() => {
  console.error = jest.fn()
})
afterAll(() => {
  console.error = originalConsoleError
})

// Component that throws an error on demand
function ThrowingChild({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>Child content</div>
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Safe content')).toBeInTheDocument()
  })

  it('renders error fallback when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.queryByText('Child content')).not.toBeInTheDocument()
  })

  it('shows Try Again button in error state', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('resets error state when Try Again is clicked', () => {
    const onReset = jest.fn()
    // We need a component that can toggle its throwing behavior.
    // Since the ErrorBoundary re-renders children after reset, we use a controlled wrapper.
    let shouldThrow = true

    function ControlledChild() {
      if (shouldThrow) {
        throw new Error('Test error')
      }
      return <div>Recovered content</div>
    }

    render(
      <ErrorBoundary onReset={onReset}>
        <ControlledChild />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Stop throwing before clicking retry
    shouldThrow = false
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))

    expect(onReset).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Recovered content')).toBeInTheDocument()
  })

  it('calls componentDidCatch with error info', () => {
    const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch')

    render(
      <ErrorBoundary componentName="TestWidget">
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    )

    spy.mockRestore()
  })

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Custom error UI')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })
})

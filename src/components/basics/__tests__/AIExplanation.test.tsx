/**
 * Unit Tests for AIExplanation Component
 *
 * Tests the AI tutor explanation panel that lets students request
 * personalized help, fill in progress forms, and view streaming explanations.
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AIExplanation } from '../AIExplanation'

// ---------- Mocks ----------

// Track the latest hook return so individual tests can override fields
const defaultHookReturn = {
  explanation: '',
  isLoading: false,
  error: null as string | null,
  hasRequested: false,
  actualCostCharged: null as number | null,
  newBalance: null as number | null,
  usageInfo: null,
  loadedFromStorage: false,
  progressReport: '',
  whatTried: '',
  understandingLevel: 'confused' as const,
  showProgressForm: false,
  setProgressReport: jest.fn(),
  setWhatTried: jest.fn(),
  setUnderstandingLevel: jest.fn(),
  setShowProgressForm: jest.fn(),
  setError: jest.fn(),
  handleRequestExplanation: jest.fn(),
}

let hookOverrides: Partial<typeof defaultHookReturn> = {}

jest.mock('@/lib/hooks/useStreamingExplanation', () => ({
  useStreamingExplanation: () => ({ ...defaultHookReturn, ...hookOverrides }),
}))

jest.mock('@/components/basics/ai-explanation/ProgressReportForm', () => ({
  ProgressReportForm: (props: Record<string, unknown>) => (
    <div data-testid="progress-report-form">
      <button data-testid="form-back" onClick={props.onBack as () => void}>
        Back
      </button>
      <button data-testid="form-submit" onClick={props.onSubmit as () => void}>
        Submit
      </button>
    </div>
  ),
}))

jest.mock('@/components/basics/ai-explanation/CostInfoDisplay', () => ({
  CostInfoDisplay: (props: Record<string, unknown>) => (
    <div data-testid="cost-info-display">
      {props.actualCostCharged !== null && (
        <span data-testid="cost-value">{String(props.actualCostCharged)}</span>
      )}
    </div>
  ),
}))

jest.mock('@/components/ui/Alert', () => ({
  Alert: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert">{children}</div>
  ),
}))

jest.mock('lucide-react', () => ({
  Sparkles: (props: Record<string, unknown>) => (
    <span data-testid="icon-sparkles" {...props} />
  ),
  X: (props: Record<string, unknown>) => (
    <span data-testid="icon-x" {...props} />
  ),
}))

// ---------- Helpers ----------

const defaultProps = {
  problemText: 'What is 2 + 2?',
  problemId: 'prob-1',
  subject: 'math',
  difficulty: 3,
  currentAnswer: '5',
  onClose: jest.fn(),
  onXpSpent: jest.fn(),
  onCreditsUsed: jest.fn(),
}

function renderComponent(propOverrides: Partial<typeof defaultProps> = {}) {
  return render(<AIExplanation {...defaultProps} {...propOverrides} />)
}

// ---------- Tests ----------

describe('AIExplanation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    hookOverrides = {}
  })

  describe('rendering', () => {
    it('renders the header with AI Tutor title', () => {
      renderComponent()
      expect(screen.getByText('AI Tutor')).toBeInTheDocument()
    })

    it('renders the subtitle text', () => {
      renderComponent()
      expect(
        screen.getByText('Get a personalized explanation')
      ).toBeInTheDocument()
    })

    it('renders sparkles icon in header', () => {
      renderComponent()
      expect(screen.getAllByTestId('icon-sparkles').length).toBeGreaterThan(0)
    })

    it('renders close button', () => {
      renderComponent()
      expect(screen.getByTestId('icon-x')).toBeInTheDocument()
    })
  })

  describe('initial state (before request)', () => {
    it('shows description text explaining the AI tutor', () => {
      renderComponent()
      expect(
        screen.getByText(/personalized, step-by-step explanation/)
      ).toBeInTheDocument()
    })

    it('shows cost alert', () => {
      renderComponent()
      expect(screen.getByTestId('alert')).toBeInTheDocument()
    })

    it('shows Request AI Help button', () => {
      renderComponent()
      expect(
        screen.getByRole('button', { name: /Request AI Help/i })
      ).toBeInTheDocument()
    })

    it('does not show progress form initially', () => {
      renderComponent()
      expect(
        screen.queryByTestId('progress-report-form')
      ).not.toBeInTheDocument()
    })
  })

  describe('close button', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn()
      renderComponent({ onClose })

      // The close button wraps the X icon
      const closeIcon = screen.getByTestId('icon-x')
      fireEvent.click(closeIcon.closest('button')!)

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('progress form flow', () => {
    it('calls setShowProgressForm when Request AI Help is clicked', () => {
      const setShowProgressForm = jest.fn()
      hookOverrides = { setShowProgressForm }

      renderComponent()
      fireEvent.click(screen.getByRole('button', { name: /Request AI Help/i }))

      expect(setShowProgressForm).toHaveBeenCalledWith(true)
    })

    it('renders ProgressReportForm when showProgressForm is true', () => {
      hookOverrides = { showProgressForm: true }

      renderComponent()
      expect(screen.getByTestId('progress-report-form')).toBeInTheDocument()
    })

    it('hides Request AI Help button when form is shown', () => {
      hookOverrides = { showProgressForm: true }

      renderComponent()
      expect(
        screen.queryByRole('button', { name: /Request AI Help/i })
      ).not.toBeInTheDocument()
    })
  })

  describe('loading state (after request)', () => {
    it('shows loading spinner when explanation is loading', () => {
      hookOverrides = { hasRequested: true, isLoading: true, explanation: '' }

      renderComponent()
      expect(screen.getByText('Generating explanation...')).toBeInTheDocument()
    })

    it('shows AI is thinking indicator while loading', () => {
      hookOverrides = { hasRequested: true, isLoading: true, explanation: '' }

      renderComponent()
      expect(screen.getByText('AI is thinking...')).toBeInTheDocument()
    })
  })

  describe('explanation display', () => {
    it('renders explanation text when loaded', () => {
      hookOverrides = {
        hasRequested: true,
        explanation: 'The answer is 4 because 2 + 2 = 4.',
      }

      renderComponent()
      expect(
        screen.getByText('The answer is 4 because 2 + 2 = 4.')
      ).toBeInTheDocument()
    })

    it('does not show loading indicator when explanation is complete', () => {
      hookOverrides = {
        hasRequested: true,
        isLoading: false,
        explanation: 'Done',
      }

      renderComponent()
      expect(screen.queryByText('AI is thinking...')).not.toBeInTheDocument()
    })

    it('shows CostInfoDisplay after explanation is loaded', () => {
      hookOverrides = {
        hasRequested: true,
        explanation: 'Explanation here',
        actualCostCharged: 5,
      }

      renderComponent()
      expect(screen.getByTestId('cost-info-display')).toBeInTheDocument()
    })
  })

  describe('error state', () => {
    it('renders error alert when error occurs after request', () => {
      hookOverrides = {
        hasRequested: true,
        error: 'Something went wrong',
      }

      renderComponent()
      // Error is wrapped in an Alert component with type="error"
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('does not show CostInfoDisplay when there is an error', () => {
      hookOverrides = {
        hasRequested: true,
        error: 'API failure',
      }

      renderComponent()
      expect(screen.queryByTestId('cost-info-display')).not.toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('close button is a focusable button element', () => {
      renderComponent()

      const closeIcon = screen.getByTestId('icon-x')
      const closeButton = closeIcon.closest('button')
      expect(closeButton).toBeInTheDocument()
      closeButton!.focus()
      expect(closeButton).toHaveFocus()
    })

    it('Request AI Help button is focusable', () => {
      renderComponent()

      const button = screen.getByRole('button', { name: /Request AI Help/i })
      button.focus()
      expect(button).toHaveFocus()
    })
  })
})

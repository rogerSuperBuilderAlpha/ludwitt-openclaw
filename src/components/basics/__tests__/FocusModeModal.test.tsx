/* eslint-disable jest-dom/prefer-to-have-style, testing-library/no-container */
/**
 * Unit Tests for FocusModeModal Component
 *
 * Tests the full-screen focus mode modal that provides a distraction-free
 * environment for math and reading practice with 3x XP multiplier.
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { FocusModeModal } = require('../focus-mode/FocusModeModal')
import type { FocusModeState } from '@/lib/hooks/useFocusMode'
import type { MathProblem, SubjectProgressDisplay } from '@/lib/types/basics'
import type { ReadingExerciseV2 } from '@/lib/types/reading-v2'

// ---------- Mocks ----------

jest.mock('@phosphor-icons/react', () => ({
  Lightning: (props: Record<string, unknown>) => (
    <span data-testid="icon-lightning" {...props} />
  ),
  Timer: (props: Record<string, unknown>) => (
    <span data-testid="icon-timer" {...props} />
  ),
  Fire: (props: Record<string, unknown>) => (
    <span data-testid="icon-fire" {...props} />
  ),
}))

jest.mock('../WordLookup', () => {
  const Mock = ({ passage }: { passage: string }) => (
    <div data-testid="word-lookup">{passage}</div>
  )
  return { __esModule: true, default: Mock, WordLookup: Mock }
})

jest.mock('../focus-mode/MathFocus', () => {
  const Mock = () => <div data-testid="math-focus">Math Focus Component</div>
  return { __esModule: true, default: Mock, MathFocus: Mock }
})

jest.mock('../focus-mode/ReadingFocusV2', () => {
  const Mock = () => (
    <div data-testid="reading-focus-v2">Reading Focus Component</div>
  )
  return { __esModule: true, default: Mock, ReadingFocusV2: Mock }
})

jest.mock('@/components/ui/ErrorBoundary', () => ({
  SectionErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}))

// ---------- Helpers ----------

function makeState(overrides: Partial<FocusModeState> = {}): FocusModeState {
  return {
    isActive: true,
    subject: 'math',
    timeRemaining: 420, // 7 minutes
    xpEarned: 30,
    problemsCompleted: 5,
    startTime: Date.now() - 180000, // 3 min ago
    ...overrides,
  }
}

function makeMathProblem(overrides: Partial<MathProblem> = {}): MathProblem {
  return {
    id: 'mp-1',
    type: 'arithmetic',
    difficulty: 4,
    question: 'What is 7 x 8?',
    correctAnswer: '56',
    hint: 'Think of 7 groups of 8',
    explanation: '7 x 8 = 56',
    topic: 'multiplication',
    timeEstimate: 60,
    ...overrides,
  } as MathProblem
}

function makeProgress(
  overrides: Partial<SubjectProgressDisplay> = {}
): SubjectProgressDisplay {
  return {
    currentDifficulty: 4,
    currentLevel: 'Grade 4',
    totalCompleted: 25,
    totalCorrect: 20,
    accuracyRate: 80,
    currentStreak: 3,
    longestStreak: 7,
    totalXP: 1200,
    progressToNextLevel: 55,
    ...overrides,
  }
}

function makeReadingExercise(
  overrides: Partial<ReadingExerciseV2> = {}
): ReadingExerciseV2 {
  return {
    id: 're-1',
    type: 'comprehension-literal',
    difficulty: 5,
    passage: 'The quick brown fox jumped over the lazy dog.',
    title: 'Fox Story',
    questions: [
      {
        id: 'rq1',
        question: 'What did the fox do?',
        options: ['Jumped', 'Ran', 'Slept', 'Ate'],
        correctAnswer: 0,
        explanation: 'The fox jumped over the dog.',
        depthOfKnowledge: 1,
      },
    ],
    timeEstimate: 90,
    primarySkill: 'literal-comprehension',
    ...overrides,
  } as ReadingExerciseV2
}

const defaultProps = {
  isOpen: true,
  state: makeState(),
  formatTimeRemaining: jest.fn(() => '7:00'),
  mathProblem: makeMathProblem(),
  mathProgress: makeProgress(),
  onMathComplete: jest.fn(),
  readingExercise: null as ReadingExerciseV2 | null,
  readingProgress: null as SubjectProgressDisplay | null,
  onReadingComplete: jest.fn(),
  onXPEarned: jest.fn(),
  onProblemCompleted: jest.fn(),
}

function renderModal(propOverrides: Partial<typeof defaultProps> = {}) {
  return render(<FocusModeModal {...defaultProps} {...propOverrides} />)
}

// ---------- Tests ----------

describe('FocusModeModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    document.body.style.overflow = ''
  })

  describe('visibility', () => {
    it('renders when isOpen is true and state is active', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
      renderModal({ isOpen: false })
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('does not render when state.isActive is false', () => {
      renderModal({ state: makeState({ isActive: false }) })
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has role="dialog"', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('has aria-modal="true"', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })

    it('has aria-labelledby pointing to the title', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toHaveAttribute(
        'aria-labelledby',
        'focus-mode-title'
      )
    })

    it('title element has matching id', () => {
      renderModal()
      const title = screen.getByText(/Focus Mode - Math/)
      expect(title).toHaveAttribute('id', 'focus-mode-title')
    })

    it('modal has tabIndex=-1 for programmatic focus', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('math mode header', () => {
    it('displays Focus Mode - Math in the title', () => {
      renderModal()
      expect(screen.getByText(/Focus Mode - Math/)).toBeInTheDocument()
    })

    it('displays the no-help subtitle', () => {
      renderModal()
      expect(
        screen.getByText(/No hints .* No AI tutor .* No study materials/)
      ).toBeInTheDocument()
    })

    it('shows problems completed count', () => {
      renderModal({ state: makeState({ problemsCompleted: 5 }) })
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('Solved')).toBeInTheDocument()
    })

    it('shows XP earned with 3x multiplier', () => {
      renderModal({ state: makeState({ xpEarned: 30 }) })
      // XP displayed is xpEarned * 3 = 90
      expect(screen.getByText('90')).toBeInTheDocument()
      expect(screen.getByText('XP (3×)')).toBeInTheDocument()
    })

    it('shows formatted time remaining', () => {
      const formatTimeRemaining = jest.fn(() => '7:00')
      renderModal({ formatTimeRemaining })
      expect(screen.getByText('7:00')).toBeInTheDocument()
      expect(formatTimeRemaining).toHaveBeenCalled()
    })
  })

  describe('reading mode header', () => {
    it('displays Focus Mode - Reading in the title', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: makeReadingExercise(),
        readingProgress: makeProgress(),
      })
      expect(screen.getByText(/Focus Mode - Reading/)).toBeInTheDocument()
    })

    it('shows reading exercise type label', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: makeReadingExercise({ type: 'vocabulary-context' }),
        readingProgress: makeProgress(),
      })
      expect(screen.getByText('(Vocabulary)')).toBeInTheDocument()
    })

    it('shows comprehension label for comprehension-inferential type', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: makeReadingExercise({
          type: 'comprehension-inferential',
        }),
        readingProgress: makeProgress(),
      })
      expect(screen.getByText('(Inference)')).toBeInTheDocument()
    })
  })

  describe('math content', () => {
    it('renders MathFocus component for math subject', () => {
      renderModal()
      expect(screen.getByTestId('math-focus')).toBeInTheDocument()
    })

    it('shows math problem question text', () => {
      renderModal()
      expect(screen.getByText('What is 7 x 8?')).toBeInTheDocument()
    })

    it('shows Question column header for math', () => {
      renderModal()
      expect(screen.getByText('Question')).toBeInTheDocument()
    })

    it('shows Your Answer column header', () => {
      renderModal()
      expect(screen.getByText('Your Answer')).toBeInTheDocument()
    })
  })

  describe('reading content', () => {
    it('renders ReadingFocusV2 component for reading subject', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: makeReadingExercise(),
        readingProgress: makeProgress(),
      })
      expect(screen.getByTestId('reading-focus-v2')).toBeInTheDocument()
    })

    it('shows passage text in WordLookup', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: makeReadingExercise({
          passage: 'The rain in Spain falls mainly on the plain.',
        }),
        readingProgress: makeProgress(),
      })
      expect(screen.getByTestId('word-lookup')).toHaveTextContent(
        'The rain in Spain falls mainly on the plain.'
      )
    })

    it('shows Passage column header for reading', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: makeReadingExercise(),
        readingProgress: makeProgress(),
      })
      expect(screen.getByText('Passage')).toBeInTheDocument()
    })

    it('shows reading exercise title when available', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: makeReadingExercise({ title: 'The Fox and the Dog' }),
        readingProgress: makeProgress(),
      })
      expect(screen.getByText('The Fox and the Dog')).toBeInTheDocument()
    })

    it('shows background knowledge when available', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: makeReadingExercise({
          backgroundKnowledge: 'Foxes are wild animals.',
        }),
        readingProgress: makeProgress(),
      })
      expect(screen.getByText('Context:')).toBeInTheDocument()
      expect(screen.getByText('Foxes are wild animals.')).toBeInTheDocument()
    })
  })

  describe('loading fallback', () => {
    it('shows loading message when math problem is missing', () => {
      renderModal({
        state: makeState({ subject: 'math' }),
        mathProblem: undefined,
        mathProgress: undefined,
      })
      expect(screen.getByText('Loading problem...')).toBeInTheDocument()
    })

    it('shows loading message when reading exercise is missing', () => {
      renderModal({
        state: makeState({ subject: 'reading' }),
        readingExercise: null,
        readingProgress: null,
      })
      expect(screen.getByText('Loading problem...')).toBeInTheDocument()
    })
  })

  describe('footer', () => {
    it('shows the 3x XP message', () => {
      renderModal()
      expect(
        screen.getByText(/Stay focused! All XP earned is multiplied by 3×/)
      ).toBeInTheDocument()
    })

    it('shows fire icon in footer', () => {
      renderModal()
      expect(screen.getByTestId('icon-fire')).toBeInTheDocument()
    })
  })

  describe('progress bar', () => {
    it('renders progress bar element', () => {
      const { container } = renderModal({
        state: makeState({ timeRemaining: 300 }),
      })
      // The progress bar has a calculated width based on elapsed time
      // TOTAL_DURATION = 600s, timeRemaining = 300 means 50% elapsed
      // eslint-disable-next-line testing-library/no-node-access -- verifying dynamic inline style
      const progressBar = container.querySelector('[style*="width"]')
      expect(progressBar).toBeInTheDocument()
    })
  })

  describe('body overflow management', () => {
    it('sets body overflow to hidden when modal opens', () => {
      renderModal()
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body overflow when modal unmounts', () => {
      const { unmount } = renderModal()
      expect(document.body.style.overflow).toBe('hidden')
      unmount()
      expect(document.body.style.overflow).toBe('')
    })
  })

  describe('error boundary', () => {
    it('wraps content in SectionErrorBoundary', () => {
      renderModal()
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
    })
  })

  describe('escape key prevention', () => {
    it('prevents escape key from propagating', () => {
      renderModal()

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')

      document.dispatchEvent(event)
      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })
})

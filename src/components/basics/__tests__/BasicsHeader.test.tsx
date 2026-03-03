import { render, screen, fireEvent } from '@testing-library/react'
import { BasicsHeader } from '../BasicsHeader'
import { SubjectProgressDisplay } from '@/lib/types/basics'

// Mock child components to isolate BasicsHeader behavior
jest.mock('../XPProgressBar', () => ({
  XPProgressBar: () => <div data-testid="xp-progress-bar">XP Progress Bar</div>,
}))

jest.mock('../MasteryProgressBar', () => ({
  MasteryProgressBar: () => (
    <div data-testid="mastery-progress-bar">Mastery Progress Bar</div>
  ),
}))

jest.mock('@phosphor-icons/react', () => ({
  Trophy: (props: Record<string, unknown>) => (
    <span data-testid="icon-trophy" {...props} />
  ),
  ChartBar: (props: Record<string, unknown>) => (
    <span data-testid="icon-chart" {...props} />
  ),
  TrendUp: (props: Record<string, unknown>) => (
    <span data-testid="icon-trendup" {...props} />
  ),
  Lightning: (props: Record<string, unknown>) => (
    <span data-testid="icon-lightning" {...props} />
  ),
}))

// Mock localStorage for progress view preference
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const makeMathProgress = (
  overrides?: Partial<SubjectProgressDisplay>
): SubjectProgressDisplay => ({
  currentDifficulty: 5,
  currentLevel: 'Grade 5',
  totalCompleted: 100,
  totalCorrect: 85,
  accuracyRate: 85,
  currentStreak: 7,
  longestStreak: 15,
  totalXP: 2500,
  progressToNextLevel: 60,
  ...overrides,
})

const makeReadingProgress = (
  overrides?: Partial<SubjectProgressDisplay>
): SubjectProgressDisplay => ({
  currentDifficulty: 4,
  currentLevel: 'Grade 4',
  totalCompleted: 50,
  totalCorrect: 40,
  accuracyRate: 80,
  currentStreak: 3,
  longestStreak: 10,
  totalXP: 1200,
  progressToNextLevel: 45,
  ...overrides,
})

describe('BasicsHeader', () => {
  const defaultProps = {
    onToggleSidebar: jest.fn(),
    onToggleFocus: jest.fn(),
    onShowQuickActions: jest.fn(),
    focusMode: false,
    showKeyboardNudge: false,
    onDismissKeyboardNudge: jest.fn(),
    mathProgress: makeMathProgress(),
    readingProgress: makeReadingProgress(),
    dailyXP: 500,
    dailyGoal: 1000,
  }

  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  it('renders header with Basics section indicator', () => {
    render(<BasicsHeader {...defaultProps} />)
    expect(screen.getByText('Basics')).toBeInTheDocument()
  })

  it('shows progress bar (mastery by default)', () => {
    render(<BasicsHeader {...defaultProps} />)
    // Mastery progress bar is the default view
    const masteryBars = screen.getAllByTestId('mastery-progress-bar')
    expect(masteryBars.length).toBeGreaterThan(0)
  })

  it('renders Progress sidebar toggle button', () => {
    render(<BasicsHeader {...defaultProps} />)
    const progressBtn = screen.getByRole('button', {
      name: /view progress sidebar/i,
    })
    expect(progressBtn).toBeInTheDocument()

    fireEvent.click(progressBtn)
    expect(defaultProps.onToggleSidebar).toHaveBeenCalledTimes(1)
  })

  it('renders Leaderboard navigation button', () => {
    render(<BasicsHeader {...defaultProps} />)
    const leaderboardBtn = screen.getByRole('button', {
      name: /view leaderboard/i,
    })
    expect(leaderboardBtn).toBeInTheDocument()
  })

  it('has proper heading hierarchy with header and nav elements', () => {
    render(<BasicsHeader {...defaultProps} />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('toggles between mastery and XP view', () => {
    render(<BasicsHeader {...defaultProps} />)

    // Initially mastery view
    expect(
      screen.getAllByTestId('mastery-progress-bar').length
    ).toBeGreaterThan(0)

    // Click the toggle button (there are two: desktop and mobile)
    const toggleButtons = screen.getAllByRole('button', {
      name: /switch to xp view/i,
    })
    fireEvent.click(toggleButtons[0])

    // Now should show XP progress bar
    expect(screen.getAllByTestId('xp-progress-bar').length).toBeGreaterThan(0)
  })
})

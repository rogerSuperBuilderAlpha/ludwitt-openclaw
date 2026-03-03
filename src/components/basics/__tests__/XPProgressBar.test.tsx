import { render, screen } from '@testing-library/react'
import { XPProgressBar } from '../XPProgressBar'
import { SubjectProgressDisplay } from '@/lib/types/basics'

// Mock Phosphor Icons
jest.mock('@phosphor-icons/react', () => ({
  Lightning: (props: Record<string, unknown>) => (
    <span data-testid="icon-lightning" {...props} />
  ),
  Check: (props: Record<string, unknown>) => (
    <span data-testid="icon-check" {...props} />
  ),
  CaretDown: (props: Record<string, unknown>) => (
    <span data-testid="icon-caret" {...props} />
  ),
  Sparkle: (props: Record<string, unknown>) => (
    <span data-testid="icon-sparkle" {...props} />
  ),
  TrendUp: (props: Record<string, unknown>) => (
    <span data-testid="icon-trendup" {...props} />
  ),
  ArrowUp: (props: Record<string, unknown>) => (
    <span data-testid="icon-arrowup" {...props} />
  ),
  Clock: (props: Record<string, unknown>) => (
    <span data-testid="icon-clock" {...props} />
  ),
  Info: (props: Record<string, unknown>) => (
    <span data-testid="icon-info" {...props} />
  ),
}))

// Mock date-helpers to avoid timezone-dependent behavior
jest.mock('@/lib/utils/date-helpers', () => ({
  getMillisUntilMidnightEST: () => 3600000, // 1 hour
  formatCountdown: () => '1:00:00',
  getXPDateRangeInfo: () => ({
    weekStart: new Date('2026-02-23'),
    weekEnd: new Date('2026-03-01'),
    monthStart: new Date('2026-03-01'),
    monthEnd: new Date('2026-03-31'),
    yearStart: new Date('2026-01-01'),
  }),
  formatDateShort: (d: Date) => d.toLocaleDateString(),
}))

const makeProgress = (xp: number, streak = 0): SubjectProgressDisplay => ({
  currentDifficulty: 5,
  currentLevel: 'Grade 5',
  totalCompleted: 100,
  totalCorrect: 85,
  accuracyRate: 85,
  currentStreak: streak,
  longestStreak: 15,
  totalXP: xp,
  progressToNextLevel: 60,
})

describe('XPProgressBar', () => {
  const defaultProps = {
    mathProgress: makeProgress(500, 3),
    readingProgress: makeProgress(300, 2),
    latinXP: 100,
    greekXP: 50,
    logicXP: 50,
    todayXP: 450,
    dailyGoal: 1000,
  }

  it('renders the progress bar with correct XP display', () => {
    render(<XPProgressBar {...defaultProps} />)
    // Today XP (450) appears in both the display span and the goal section
    const xpElements = screen.getAllByText('450')
    expect(xpElements.length).toBeGreaterThanOrEqual(1)
  })

  it('shows current XP and daily goal', () => {
    render(<XPProgressBar {...defaultProps} />)
    // The goal section shows "450 / 1,000" - the daily goal denominator
    const xpElements = screen.getAllByText('450')
    expect(xpElements.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/1,000/)).toBeInTheDocument()
  })

  it('shows XP needed for goal (not met state)', () => {
    render(<XPProgressBar {...defaultProps} todayXP={200} />)
    const xpElements = screen.getAllByText('200')
    expect(xpElements.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/1,000/)).toBeInTheDocument()
    // Should NOT show "Goal Complete!"
    expect(screen.queryByText(/goal complete/i)).not.toBeInTheDocument()
  })

  it('handles zero XP state', () => {
    render(
      <XPProgressBar
        mathProgress={null}
        readingProgress={null}
        todayXP={0}
        dailyGoal={1000}
      />
    )
    const zeroElements = screen.getAllByText('0')
    expect(zeroElements.length).toBeGreaterThanOrEqual(1)
  })

  it('shows Goal Complete when goal is met', () => {
    render(<XPProgressBar {...defaultProps} todayXP={1000} />)
    expect(screen.getByText(/goal complete/i)).toBeInTheDocument()
  })

  it('has accessible XP details toggle button', () => {
    render(<XPProgressBar {...defaultProps} />)
    const detailsBtn = screen.getByRole('button', {
      name: /toggle xp details/i,
    })
    expect(detailsBtn).toBeInTheDocument()
  })

  it('renders time range selector buttons', () => {
    render(<XPProgressBar {...defaultProps} />)
    expect(screen.getAllByText('Today').length).toBeGreaterThan(0)
    expect(screen.getAllByText('WTD').length).toBeGreaterThan(0)
    expect(screen.getAllByText('MTD').length).toBeGreaterThan(0)
  })
})

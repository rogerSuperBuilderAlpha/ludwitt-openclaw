import { renderHook, act } from '@testing-library/react'
import { useCelebrations } from '../useCelebrations'

describe('useCelebrations', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('initializes with no celebration showing', () => {
    const { result } = renderHook(() =>
      useCelebrations('user-123', false, false, false)
    )

    expect(result.current.showCelebration).toBe(false)
    expect(result.current.showWelcomeModal).toBe(false)
  })

  it('shows cursor celebration when cursor setup is complete', () => {
    const { result } = renderHook(() =>
      useCelebrations('user-123', true, false, false)
    )

    expect(result.current.showCelebration).toBe(true)
    expect(result.current.celebrationType).toBe('small')
    expect(result.current.celebrationMessage).toBe('Cursor Setup Complete!')
  })

  it('only shows cursor celebration once', () => {
    const { result, rerender } = renderHook(
      ({ userId, cursor }) => useCelebrations(userId, cursor, false, false),
      { initialProps: { userId: 'user-123', cursor: true } }
    )

    expect(result.current.showCelebration).toBe(true)

    // Simulate dismissing the celebration
    act(() => {
      result.current.setShowCelebration(false)
    })

    // Re-render with same props
    rerender({ userId: 'user-123', cursor: true })

    // Should not show again
    expect(localStorage.getItem('cursor-celebration-user-123')).toBe('true')
  })

  it('shows website celebration when website is complete', () => {
    // Set cursor celebration as already shown
    localStorage.setItem('cursor-celebration-user-123', 'true')

    const { result } = renderHook(() =>
      useCelebrations('user-123', true, true, false)
    )

    expect(result.current.showCelebration).toBe(true)
    expect(result.current.celebrationType).toBe('medium')
    expect(result.current.celebrationMessage).toBe('Website Complete! Great Job!')
  })

  it('shows Vercel celebration when deployment is complete', () => {
    localStorage.setItem('cursor-celebration-user-123', 'true')
    localStorage.setItem('website-celebration-user-123', 'true')

    const { result } = renderHook(() =>
      useCelebrations('user-123', true, true, true)
    )

    expect(result.current.showCelebration).toBe(true)
    expect(result.current.celebrationType).toBe('large')
    expect(result.current.celebrationMessage).toBe("You've RISEN above the PITCH!")
  })

  it('shows welcome modal after Vercel celebration', () => {
    localStorage.setItem('cursor-celebration-user-123', 'true')
    localStorage.setItem('website-celebration-user-123', 'true')

    const { result } = renderHook(() =>
      useCelebrations('user-123', true, true, true)
    )

    // Fast-forward past the 8.5 second delay
    act(() => {
      jest.advanceTimersByTime(9000)
    })

    expect(result.current.showWelcomeModal).toBe(true)
    expect(localStorage.getItem('welcome-modal-user-123')).toBe('true')
  })

  it('shows welcome modal immediately if celebration was already shown', () => {
    localStorage.setItem('vercel-celebration-user-123', 'true')
    // Welcome modal not yet shown

    const { result } = renderHook(() =>
      useCelebrations('user-123', true, true, true)
    )

    // Fast-forward past the 500ms delay
    act(() => {
      jest.advanceTimersByTime(600)
    })

    expect(result.current.showWelcomeModal).toBe(true)
  })

  it('does not show celebration for undefined userId', () => {
    const { result } = renderHook(() =>
      useCelebrations(undefined, true, false, false)
    )

    expect(result.current.showCelebration).toBe(false)
  })

  it('allows manual control of celebration state', () => {
    const { result } = renderHook(() =>
      useCelebrations('user-123', false, false, false)
    )

    act(() => {
      result.current.setShowCelebration(true)
    })

    expect(result.current.showCelebration).toBe(true)

    act(() => {
      result.current.setShowCelebration(false)
    })

    expect(result.current.showCelebration).toBe(false)
  })

  it('allows manual control of welcome modal state', () => {
    const { result } = renderHook(() =>
      useCelebrations('user-123', false, false, false)
    )

    act(() => {
      result.current.setShowWelcomeModal(true)
    })

    expect(result.current.showWelcomeModal).toBe(true)

    act(() => {
      result.current.setShowWelcomeModal(false)
    })

    expect(result.current.showWelcomeModal).toBe(false)
  })
})

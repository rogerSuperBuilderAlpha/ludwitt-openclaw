/**
 * Unit Tests for useKeyboardShortcuts Hook
 * Tests keyboard shortcut handling for the Basics Dashboard
 */

import { renderHook, act } from '@testing-library/react'
import { useKeyboardShortcuts, KeyboardShortcuts } from '../useKeyboardShortcuts'

describe('useKeyboardShortcuts', () => {
  const createMockShortcuts = (): KeyboardShortcuts => ({
    onSubmit: jest.fn(),
    onSkip: jest.fn(),
    onHint: jest.fn(),
    onFocus: jest.fn(),
    onHelp: jest.fn(),
    onEscape: jest.fn(),
    onQuickActions: jest.fn(),
    onPowerUps: jest.fn(),
    onVoiceInput: jest.fn()
  })

  const dispatchKeyEvent = (key: string, target?: EventTarget) => {
    const event = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true
    })
    
    if (target) {
      Object.defineProperty(event, 'target', { value: target })
    }
    
    document.dispatchEvent(event)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Enter key', () => {
    it('calls onSubmit when Enter is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('Enter')
      })

      expect(shortcuts.onSubmit).toHaveBeenCalled()
    })

    it('calls onSubmit in input field (exception for Enter)', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      const input = document.createElement('input')
      document.body.appendChild(input)

      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true
        })
        Object.defineProperty(event, 'target', { value: input })
        document.dispatchEvent(event)
      })

      expect(shortcuts.onSubmit).toHaveBeenCalled()

      document.body.removeChild(input)
    })

    it('does not call onSubmit when not provided', () => {
      const shortcuts = { onSkip: jest.fn() }
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('Enter')
      })

      // Should not throw
      expect(shortcuts.onSkip).not.toHaveBeenCalled()
    })
  })

  describe('S key', () => {
    it('calls onSkip when S is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('s')
      })

      expect(shortcuts.onSkip).toHaveBeenCalled()
    })

    it('handles uppercase S', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('S')
      })

      expect(shortcuts.onSkip).toHaveBeenCalled()
    })
  })

  describe('H key', () => {
    it('calls onHint when H is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('h')
      })

      expect(shortcuts.onHint).toHaveBeenCalled()
    })
  })

  describe('F key', () => {
    it('calls onFocus when F is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('f')
      })

      expect(shortcuts.onFocus).toHaveBeenCalled()
    })
  })

  describe('Q key', () => {
    it('calls onQuickActions when Q is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('q')
      })

      expect(shortcuts.onQuickActions).toHaveBeenCalled()
    })
  })

  describe('P key', () => {
    it('calls onPowerUps when P is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('p')
      })

      expect(shortcuts.onPowerUps).toHaveBeenCalled()
    })
  })

  describe('V key', () => {
    it('calls onVoiceInput when V is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('v')
      })

      expect(shortcuts.onVoiceInput).toHaveBeenCalled()
    })
  })

  describe('? key', () => {
    it('calls onHelp when ? is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('?')
      })

      expect(shortcuts.onHelp).toHaveBeenCalled()
    })
  })

  describe('Escape key', () => {
    it('calls onEscape when Escape is pressed', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('Escape')
      })

      expect(shortcuts.onEscape).toHaveBeenCalled()
    })
  })

  describe('enabled state', () => {
    it('does not call shortcuts when disabled', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, false))

      act(() => {
        dispatchKeyEvent('Enter')
        dispatchKeyEvent('s')
        dispatchKeyEvent('h')
      })

      expect(shortcuts.onSubmit).not.toHaveBeenCalled()
      expect(shortcuts.onSkip).not.toHaveBeenCalled()
      expect(shortcuts.onHint).not.toHaveBeenCalled()
    })

    it('defaults to enabled when not specified', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts))

      act(() => {
        dispatchKeyEvent('s')
      })

      expect(shortcuts.onSkip).toHaveBeenCalled()
    })

    it('responds to enabled state changes', () => {
      const shortcuts = createMockShortcuts()
      const { rerender } = renderHook(
        ({ enabled }) => useKeyboardShortcuts(shortcuts, enabled),
        { initialProps: { enabled: true } }
      )

      act(() => {
        dispatchKeyEvent('s')
      })
      expect(shortcuts.onSkip).toHaveBeenCalledTimes(1)

      // Disable
      rerender({ enabled: false })

      act(() => {
        dispatchKeyEvent('s')
      })
      expect(shortcuts.onSkip).toHaveBeenCalledTimes(1) // Still 1

      // Re-enable
      rerender({ enabled: true })

      act(() => {
        dispatchKeyEvent('s')
      })
      expect(shortcuts.onSkip).toHaveBeenCalledTimes(2)
    })
  })

  describe('input field handling', () => {
    it('does not trigger shortcuts in input fields (except Enter)', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      const input = document.createElement('input')
      document.body.appendChild(input)

      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: 's',
          bubbles: true,
          cancelable: true
        })
        Object.defineProperty(event, 'target', { value: input })
        document.dispatchEvent(event)
      })

      expect(shortcuts.onSkip).not.toHaveBeenCalled()

      document.body.removeChild(input)
    })

    it('does not trigger shortcuts in textarea fields', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)

      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'h',
          bubbles: true,
          cancelable: true
        })
        Object.defineProperty(event, 'target', { value: textarea })
        document.dispatchEvent(event)
      })

      expect(shortcuts.onHint).not.toHaveBeenCalled()

      document.body.removeChild(textarea)
    })

    it('does not trigger shortcuts in select fields', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      const select = document.createElement('select')
      document.body.appendChild(select)

      act(() => {
        const event = new KeyboardEvent('keydown', {
          key: 'f',
          bubbles: true,
          cancelable: true
        })
        Object.defineProperty(event, 'target', { value: select })
        document.dispatchEvent(event)
      })

      expect(shortcuts.onFocus).not.toHaveBeenCalled()

      document.body.removeChild(select)
    })
  })

  describe('event prevention', () => {
    it('prevents default for handled shortcuts', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      const event = new KeyboardEvent('keydown', {
        key: 's',
        bubbles: true,
        cancelable: true
      })
      
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')

      act(() => {
        document.dispatchEvent(event)
      })

      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('unhandled keys', () => {
    it('ignores unhandled keys', () => {
      const shortcuts = createMockShortcuts()
      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('a')
        dispatchKeyEvent('b')
        dispatchKeyEvent('1')
        dispatchKeyEvent('Tab')
      })

      expect(shortcuts.onSubmit).not.toHaveBeenCalled()
      expect(shortcuts.onSkip).not.toHaveBeenCalled()
      expect(shortcuts.onHint).not.toHaveBeenCalled()
    })
  })

  describe('cleanup', () => {
    it('removes event listener on unmount', () => {
      const shortcuts = createMockShortcuts()
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

      const { unmount } = renderHook(() => useKeyboardShortcuts(shortcuts, true))

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

      removeEventListenerSpy.mockRestore()
    })

    it('removes event listener when disabled', () => {
      const shortcuts = createMockShortcuts()
      const { rerender } = renderHook(
        ({ enabled }) => useKeyboardShortcuts(shortcuts, enabled),
        { initialProps: { enabled: true } }
      )

      // Disable - should remove listener
      rerender({ enabled: false })

      act(() => {
        dispatchKeyEvent('s')
      })

      expect(shortcuts.onSkip).not.toHaveBeenCalled()
    })
  })

  describe('partial shortcuts object', () => {
    it('handles missing callbacks gracefully', () => {
      const shortcuts = {
        onSubmit: jest.fn()
        // Other callbacks not provided
      }

      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      // Should not throw for undefined callbacks
      act(() => {
        dispatchKeyEvent('s')
        dispatchKeyEvent('h')
        dispatchKeyEvent('?')
      })

      expect(shortcuts.onSubmit).not.toHaveBeenCalled()
    })

    it('only calls provided callbacks', () => {
      const shortcuts = {
        onSubmit: jest.fn(),
        onSkip: jest.fn()
      }

      renderHook(() => useKeyboardShortcuts(shortcuts, true))

      act(() => {
        dispatchKeyEvent('Enter')
        dispatchKeyEvent('s')
      })

      expect(shortcuts.onSubmit).toHaveBeenCalled()
      expect(shortcuts.onSkip).toHaveBeenCalled()
    })
  })

  describe('callback updates', () => {
    it('uses updated callbacks', () => {
      const initialShortcuts = {
        onSkip: jest.fn()
      }
      const updatedShortcuts = {
        onSkip: jest.fn()
      }

      const { rerender } = renderHook(
        ({ shortcuts }) => useKeyboardShortcuts(shortcuts, true),
        { initialProps: { shortcuts: initialShortcuts } }
      )

      act(() => {
        dispatchKeyEvent('s')
      })
      expect(initialShortcuts.onSkip).toHaveBeenCalledTimes(1)

      // Update shortcuts
      rerender({ shortcuts: updatedShortcuts })

      act(() => {
        dispatchKeyEvent('s')
      })
      expect(updatedShortcuts.onSkip).toHaveBeenCalledTimes(1)
    })
  })
})


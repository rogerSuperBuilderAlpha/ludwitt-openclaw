import { render, screen, fireEvent, act } from '@testing-library/react'
import { KeyboardHelp } from '../KeyboardHelp'

// Mock Portal to render children directly instead of using createPortal
jest.mock('../Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="portal">{children}</div>
  ),
}))

describe('KeyboardHelp', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders when visible', () => {
    render(<KeyboardHelp {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument()
  })

  it('does not render when not visible', () => {
    render(<KeyboardHelp isOpen={false} onClose={jest.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows keyboard shortcuts', () => {
    render(<KeyboardHelp {...defaultProps} />)

    // Check that shortcuts are displayed
    expect(screen.getByText('Submit your answer')).toBeInTheDocument()
    expect(screen.getByText('Skip current problem')).toBeInTheDocument()
    expect(screen.getByText('Show hint (if available)')).toBeInTheDocument()
    expect(screen.getByText('Toggle focus mode')).toBeInTheDocument()
    expect(screen.getByText('Show this help')).toBeInTheDocument()
    expect(screen.getByText('Close modals/help')).toBeInTheDocument()

    // Check key labels
    expect(screen.getByText('Enter')).toBeInTheDocument()
    expect(screen.getByText('S')).toBeInTheDocument()
    expect(screen.getByText('H')).toBeInTheDocument()
    expect(screen.getByText('F')).toBeInTheDocument()
    expect(screen.getByText('Escape')).toBeInTheDocument()
  })

  it('closes on Escape key', () => {
    const onClose = jest.fn()
    render(<KeyboardHelp isOpen={true} onClose={onClose} />)

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('has dialog role and proper aria attributes', () => {
    render(<KeyboardHelp {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'keyboard-help-title')

    // The dialog's aria-labelledby references this title; verify the heading exists with expected text
    const title = screen.getByText('Keyboard Shortcuts')
    expect(title).toBeInTheDocument()
    expect(title).toHaveAttribute('id', 'keyboard-help-title')
  })

  it('renders close button with accessible label', () => {
    render(<KeyboardHelp {...defaultProps} />)
    const closeBtn = screen.getByRole('button', {
      name: /close keyboard shortcuts/i,
    })
    expect(closeBtn).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn()
    render(<KeyboardHelp isOpen={true} onClose={onClose} />)

    fireEvent.click(
      screen.getByRole('button', { name: /close keyboard shortcuts/i })
    )
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders shortcut categories', () => {
    render(<KeyboardHelp {...defaultProps} />)

    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(screen.getByText('View')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })
})

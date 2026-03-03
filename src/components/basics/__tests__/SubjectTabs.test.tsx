import { render, screen, fireEvent } from '@testing-library/react'
import { SubjectTabs, SubjectTab } from '../SubjectTabs'

// Mock Phosphor Icons to render simple spans with test content
jest.mock('@phosphor-icons/react', () => ({
  Calculator: ({ ...props }: Record<string, unknown>) => (
    <span data-testid="icon-calculator" {...props} />
  ),
  BookOpen: ({ ...props }: Record<string, unknown>) => (
    <span data-testid="icon-bookopen" {...props} />
  ),
  Scroll: ({ ...props }: Record<string, unknown>) => (
    <span data-testid="icon-scroll" {...props} />
  ),
  Buildings: ({ ...props }: Record<string, unknown>) => (
    <span data-testid="icon-buildings" {...props} />
  ),
  Brain: ({ ...props }: Record<string, unknown>) => (
    <span data-testid="icon-brain" {...props} />
  ),
  GridFour: ({ ...props }: Record<string, unknown>) => (
    <span data-testid="icon-gridfour" {...props} />
  ),
}))

// Mock localStorage
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

beforeEach(() => {
  localStorageMock.clear()
  jest.clearAllMocks()
})

describe('SubjectTabs', () => {
  const defaultProps = {
    activeTab: 'all' as SubjectTab,
    onTabChange: jest.fn(),
  }

  it('renders all default subject tabs (without Logic)', () => {
    render(<SubjectTabs {...defaultProps} />)

    // Default tabs: All, Math, Reading, Latin, Greek (Logic hidden by default)
    expect(screen.getByRole('radio', { name: /all/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /math/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /reading/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /latin/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /greek/i })).toBeInTheDocument()
  })

  it('highlights the active tab', () => {
    render(<SubjectTabs {...defaultProps} activeTab="math" />)

    const mathTab = screen.getByRole('radio', { name: /math/i })
    expect(mathTab).toBeChecked()

    const allTab = screen.getByRole('radio', { name: /all/i })
    expect(allTab).not.toBeChecked()
  })

  it('calls onTabChange when a tab is clicked', () => {
    const onTabChange = jest.fn()
    render(<SubjectTabs {...defaultProps} onTabChange={onTabChange} />)

    fireEvent.click(screen.getByRole('radio', { name: /reading/i }))
    expect(onTabChange).toHaveBeenCalledWith('reading')
  })

  it('renders correct subject labels', () => {
    render(<SubjectTabs {...defaultProps} />)

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Math')).toBeInTheDocument()
    expect(screen.getByText('Reading')).toBeInTheDocument()
    expect(screen.getByText('Latin')).toBeInTheDocument()
    expect(screen.getByText('Greek')).toBeInTheDocument()
  })

  it('has proper aria attributes on the tab container', () => {
    render(<SubjectTabs {...defaultProps} />)

    const radiogroup = screen.getByRole('radiogroup', {
      name: /subject filter/i,
    })
    expect(radiogroup).toBeInTheDocument()
  })

  it('handles keyboard navigation with ArrowRight', () => {
    const onTabChange = jest.fn()
    render(
      <SubjectTabs
        {...defaultProps}
        activeTab="all"
        onTabChange={onTabChange}
      />
    )

    const allTab = screen.getByRole('radio', { name: /all/i })
    fireEvent.keyDown(allTab, { key: 'ArrowRight' })

    // Should move to the next tab (math)
    expect(onTabChange).toHaveBeenCalledWith('math')
  })

  it('shows Logic tab when showLogic is true', () => {
    render(<SubjectTabs {...defaultProps} showLogic={true} />)
    expect(screen.getByRole('radio', { name: /logic/i })).toBeInTheDocument()
  })

  it('disables Logic tab when logicLocked is true', () => {
    render(
      <SubjectTabs {...defaultProps} showLogic={true} logicLocked={true} />
    )
    const logicTab = screen.getByRole('radio', { name: /logic/i })
    expect(logicTab).toBeDisabled()
  })
})

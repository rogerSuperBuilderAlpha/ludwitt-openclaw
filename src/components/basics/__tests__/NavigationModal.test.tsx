import { render, screen, fireEvent } from '@testing-library/react'
import { NavigationModal } from '../NavigationModal'

// Mock dependencies
jest.mock('@/components/auth/ClientProvider', () => ({
  useAuth: () => ({
    user: {
      uid: 'test-user',
      email: 'test@example.com',
      getIdToken: jest.fn().mockResolvedValue('mock-token'),
    },
    loading: false,
  }),
}))

jest.mock('@/lib/progression', () => ({
  useProgressionGates: () => ({
    isLoading: false,
    isAdmin: false,
    canAccessALC: false,
    canAccessDeveloper: false,
    mathGate: { current: 5, required: 12 },
    readingGate: { current: 3, required: 12 },
    projectsGate: { current: 0, required: 5 },
    weeklyXP: { gracePeriodActive: false, effectiveXP: 0, required: 5000 },
  }),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

jest.mock('@phosphor-icons/react', () => ({
  X: (props: Record<string, unknown>) => (
    <span data-testid="icon-x" {...props} />
  ),
  Code: (props: Record<string, unknown>) => <span {...props} />,
  Users: (props: Record<string, unknown>) => <span {...props} />,
  Briefcase: (props: Record<string, unknown>) => <span {...props} />,
  GraduationCap: (props: Record<string, unknown>) => <span {...props} />,
  Bank: (props: Record<string, unknown>) => <span {...props} />,
  Lock: (props: Record<string, unknown>) => <span {...props} />,
  ArrowRight: (props: Record<string, unknown>) => <span {...props} />,
  CheckCircle: (props: Record<string, unknown>) => <span {...props} />,
}))

describe('NavigationModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders when open', () => {
    render(<NavigationModal {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Ludwitt')).toBeInTheDocument()
    expect(screen.getByText('Choose where you want to go')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<NavigationModal isOpen={false} onClose={defaultProps.onClose} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn()
    render(<NavigationModal isOpen={true} onClose={onClose} />)

    const closeButton = screen.getByRole('button', {
      name: /close navigation/i,
    })
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn()
    render(<NavigationModal isOpen={true} onClose={onClose} />)

    // eslint-disable-next-line testing-library/no-node-access -- backdrop has aria-hidden and no semantic role
    const backdrop = document.querySelector('[aria-hidden="true"]')
    expect(backdrop).toBeInTheDocument()
    fireEvent.click(backdrop!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('has proper dialog role and aria attributes', () => {
    render(<NavigationModal {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'nav-modal-title')

    // The title element referenced by aria-labelledby should exist with expected text
    const title = screen.getByText('Ludwitt')
    expect(title).toHaveAttribute('id', 'nav-modal-title')
  })

  it('renders navigation items including Basics and Customers', () => {
    render(<NavigationModal {...defaultProps} />)

    expect(screen.getByText('Basics')).toBeInTheDocument()
    expect(screen.getByText('Customers')).toBeInTheDocument()
  })
})

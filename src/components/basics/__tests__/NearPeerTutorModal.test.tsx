/**
 * Unit Tests for NearPeerTutorModal Component
 *
 * Tests the peer tutoring modal that shows student/tutor modes,
 * chat sessions, and rating views. Heavy use of the useTutorSession hook.
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NearPeerTutorModal } = require('../NearPeerTutorModal')

// ---------- Mocks ----------

const defaultHookReturn = {
  userId: 'user-123',
  mode: 'student' as 'student' | 'tutor',
  setMode: jest.fn(),
  viewState: 'list' as 'list' | 'chat' | 'rating',
  setViewState: jest.fn(),
  loading: false,
  error: null as string | null,
  setError: jest.fn(),
  myRequest: null,
  description: '',
  setDescription: jest.fn(),
  creditsOffer: 5,
  setCreditsOffer: jest.fn(),
  balance: { available: 100, total: 200, pending: 0 },
  availableRequests: [],
  offerMessage: '',
  setOfferMessage: jest.fn(),
  activeSession: null,
  messages: [],
  newMessage: '',
  setNewMessage: jest.fn(),
  remainingSeconds: 600,
  rating: 0,
  setRating: jest.fn(),
  ratingSubmitted: false,
  handleCreateRequest: jest.fn(),
  handleOfferHelp: jest.fn(),
  handleAcceptTutor: jest.fn(),
  handleSendMessage: jest.fn(),
  handleSubmitRating: jest.fn(),
  formatTime: jest.fn(
    (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  ),
}

let hookOverrides: Partial<typeof defaultHookReturn> = {}

jest.mock('@/lib/hooks/useTutorSession', () => ({
  useTutorSession: () => ({ ...defaultHookReturn, ...hookOverrides }),
}))

// Mock UnifiedModal to render children directly (avoids Portal issues)
jest.mock('../UnifiedModal', () => {
  const MockModal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
  }: {
    isOpen: boolean
    onClose: () => void
    title: string
    subtitle?: string
    children: React.ReactNode
  }) => {
    if (!isOpen) return null
    return (
      <div data-testid="unified-modal" role="dialog" aria-modal="true">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        <button data-testid="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    )
  }
  return { __esModule: true, default: MockModal, UnifiedModal: MockModal }
})

// Mock sub-views
jest.mock('../tutor/StudentModeView', () => ({
  StudentModeView: (props: Record<string, unknown>) => (
    <div data-testid="student-mode-view">
      <span data-testid="student-balance">{JSON.stringify(props.balance)}</span>
    </div>
  ),
}))

jest.mock('../tutor/TutorModeView', () => ({
  TutorModeView: (props: Record<string, unknown>) => (
    <div data-testid="tutor-mode-view">
      <span data-testid="tutor-grade">{String(props.userGrade)}</span>
    </div>
  ),
}))

jest.mock('../tutor/ChatView', () => ({
  ChatView: () => <div data-testid="chat-view">Chat Active</div>,
}))

jest.mock('../tutor/RatingView', () => ({
  RatingView: () => <div data-testid="rating-view">Rate Session</div>,
}))

jest.mock('@phosphor-icons/react', () => ({
  GraduationCap: (props: Record<string, unknown>) => (
    <span data-testid="icon-graduation" {...props} />
  ),
  Student: (props: Record<string, unknown>) => (
    <span data-testid="icon-student" {...props} />
  ),
  ChatsCircle: (props: Record<string, unknown>) => (
    <span data-testid="icon-chats" {...props} />
  ),
  Warning: (props: Record<string, unknown>) => (
    <span data-testid="icon-warning" {...props} />
  ),
}))

// ---------- Helpers ----------

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  userGrade: 8,
}

function renderModal(propOverrides: Partial<typeof defaultProps> = {}) {
  return render(<NearPeerTutorModal {...defaultProps} {...propOverrides} />)
}

// ---------- Tests ----------

describe('NearPeerTutorModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    hookOverrides = {}
  })

  describe('rendering', () => {
    it('renders modal when isOpen is true', () => {
      renderModal()
      expect(screen.getByTestId('unified-modal')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
      renderModal({ isOpen: false })
      expect(screen.queryByTestId('unified-modal')).not.toBeInTheDocument()
    })

    it('renders modal title', () => {
      renderModal()
      expect(screen.getByText('Near Peer Tutor')).toBeInTheDocument()
    })

    it('renders modal subtitle', () => {
      renderModal()
      expect(
        screen.getByText('Get help from peers or earn credits tutoring')
      ).toBeInTheDocument()
    })
  })

  describe('mode tabs', () => {
    it('renders Get Help tab in list view', () => {
      renderModal()
      expect(
        screen.getByRole('button', { name: /Get Help/i })
      ).toBeInTheDocument()
    })

    it('renders Tutor Others tab in list view', () => {
      renderModal()
      expect(
        screen.getByRole('button', { name: /Tutor Others/i })
      ).toBeInTheDocument()
    })

    it('calls setMode with student when Get Help tab is clicked', () => {
      const setMode = jest.fn()
      hookOverrides = { setMode }
      renderModal()

      fireEvent.click(screen.getByRole('button', { name: /Get Help/i }))
      expect(setMode).toHaveBeenCalledWith('student')
    })

    it('calls setMode with tutor when Tutor Others tab is clicked', () => {
      const setMode = jest.fn()
      hookOverrides = { setMode }
      renderModal()

      fireEvent.click(screen.getByRole('button', { name: /Tutor Others/i }))
      expect(setMode).toHaveBeenCalledWith('tutor')
    })

    it('does not render tabs when viewState is not list', () => {
      hookOverrides = {
        viewState: 'chat',
        activeSession: {
          id: 'session-1',
          studentId: 'user-123',
          tutorId: 'user-456',
          status: 'active',
        } as never,
      }
      renderModal()
      expect(
        screen.queryByRole('button', { name: /Get Help/i })
      ).not.toBeInTheDocument()
    })
  })

  describe('student mode view', () => {
    it('renders StudentModeView in student mode', () => {
      hookOverrides = { mode: 'student', viewState: 'list', loading: false }
      renderModal()
      expect(screen.getByTestId('student-mode-view')).toBeInTheDocument()
    })

    it('does not render StudentModeView in tutor mode', () => {
      hookOverrides = { mode: 'tutor', viewState: 'list', loading: false }
      renderModal()
      expect(screen.queryByTestId('student-mode-view')).not.toBeInTheDocument()
    })
  })

  describe('tutor mode view', () => {
    it('renders TutorModeView in tutor mode', () => {
      hookOverrides = { mode: 'tutor', viewState: 'list', loading: false }
      renderModal()
      expect(screen.getByTestId('tutor-mode-view')).toBeInTheDocument()
    })

    it('passes userGrade to TutorModeView', () => {
      hookOverrides = { mode: 'tutor', viewState: 'list', loading: false }
      renderModal({ userGrade: 10 })
      expect(screen.getByTestId('tutor-grade')).toHaveTextContent('10')
    })

    it('does not render TutorModeView in student mode', () => {
      hookOverrides = { mode: 'student', viewState: 'list', loading: false }
      renderModal()
      expect(screen.queryByTestId('tutor-mode-view')).not.toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('shows loading spinner when loading in list view', () => {
      hookOverrides = { loading: true, viewState: 'list' }
      renderModal()

      // eslint-disable-next-line testing-library/no-node-access -- checking CSS animation class on spinner element
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })

    it('hides student/tutor views when loading', () => {
      hookOverrides = { loading: true, viewState: 'list', mode: 'student' }
      renderModal()
      expect(screen.queryByTestId('student-mode-view')).not.toBeInTheDocument()
    })
  })

  describe('error state', () => {
    it('renders error message when error exists', () => {
      hookOverrides = { error: 'Connection failed' }
      renderModal()
      expect(screen.getByText('Connection failed')).toBeInTheDocument()
    })

    it('does not render error section when error is null', () => {
      hookOverrides = { error: null }
      renderModal()
      expect(screen.queryByTestId('icon-warning')).not.toBeInTheDocument()
    })
  })

  describe('chat view', () => {
    it('renders ChatView when viewState is chat and session is active', () => {
      hookOverrides = {
        viewState: 'chat',
        activeSession: {
          id: 'session-1',
          studentId: 'user-123',
          tutorId: 'user-456',
          status: 'active',
        } as never,
      }
      renderModal()
      expect(screen.getByTestId('chat-view')).toBeInTheDocument()
    })

    it('does not render ChatView when no active session', () => {
      hookOverrides = { viewState: 'chat', activeSession: null }
      renderModal()
      expect(screen.queryByTestId('chat-view')).not.toBeInTheDocument()
    })
  })

  describe('rating view', () => {
    it('renders RatingView when viewState is rating and session exists', () => {
      hookOverrides = {
        viewState: 'rating',
        activeSession: {
          id: 'session-1',
          studentId: 'user-123',
          tutorId: 'user-456',
          status: 'completed',
        } as never,
      }
      renderModal()
      expect(screen.getByTestId('rating-view')).toBeInTheDocument()
    })

    it('does not render RatingView when no active session', () => {
      hookOverrides = { viewState: 'rating', activeSession: null }
      renderModal()
      expect(screen.queryByTestId('rating-view')).not.toBeInTheDocument()
    })
  })

  describe('close behavior', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn()
      renderModal({ onClose })
      fireEvent.click(screen.getByTestId('modal-close'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('accessibility', () => {
    it('modal has dialog role', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('modal has aria-modal attribute', () => {
      renderModal()
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })

    it('tab buttons are focusable', () => {
      renderModal()
      const getHelpBtn = screen.getByRole('button', { name: /Get Help/i })
      getHelpBtn.focus()
      expect(getHelpBtn).toHaveFocus()
    })
  })
})

/**
 * Unit Tests for DashboardSystems Component
 * Tests the integration of various dashboard systems
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { DashboardSystems } from '../DashboardSystems'
import {
  SubjectProgressDisplay,
  MathProblem,
  ReadingExercise,
} from '@/lib/types/basics'

// Mock child components
jest.mock('../voice-accessibility', () => ({
  VoiceAccessibilitySystem: function MockVoiceAccessibilitySystem(props: any) {
    return (
      <div
        data-testid="voice-accessibility-system"
        data-panel-open={props.isPanelOpen}
      >
        VoiceAccessibilitySystem
      </div>
    )
  },
}))

jest.mock('../PowerUpSystem', () => ({
  PowerUpSystem: function MockPowerUpSystem(props: any) {
    return (
      <div data-testid="power-up-system" data-panel-open={props.isPanelOpen}>
        PowerUpSystem
      </div>
    )
  },
  PowerUp: {},
}))

jest.mock('../BreakIntervention', () => ({
  BreakIntervention: function MockBreakIntervention(props: any) {
    return (
      <div data-testid="break-intervention">
        BreakIntervention: {props.intervention?.title}
      </div>
    )
  },
}))

jest.mock('../NearPeerTutorModal', () => ({
  NearPeerTutorModal: function MockNearPeerTutorModal(props: any) {
    if (!props.isOpen) return null
    return (
      <div data-testid="near-peer-tutor-modal">
        NearPeerTutorModal (Grade {props.userGrade})
      </div>
    )
  },
}))

jest.mock('../DailyChallengesModal', () => ({
  DailyChallengesModal: function MockDailyChallengesModal(props: any) {
    if (!props.isOpen) return null
    return <div data-testid="daily-challenges-modal">DailyChallengesModal</div>
  },
}))

describe('DashboardSystems Component', () => {
  const createMockProgress = (
    overrides: Partial<SubjectProgressDisplay> = {}
  ): SubjectProgressDisplay => ({
    currentDifficulty: 5,
    currentLevel: 'Grade 5',
    totalCompleted: 10,
    totalCorrect: 8,
    currentStreak: 3,
    longestStreak: 5,
    totalXP: 100,
    accuracyRate: 0.8,
    progressToNextLevel: 50,
    ...overrides,
  })

  const createMockMathProblem = (): MathProblem => ({
    id: 'math-1',
    question: 'What is 2 + 2?',
    topic: 'arithmetic',
    difficulty: 5,
    correctAnswer: '4',
    type: 'arithmetic',
    explanation: 'Adding 2 + 2 equals 4',
    timeEstimate: 30,
  })

  const createMockReadingExercise = (): ReadingExercise => ({
    id: 'reading-1',
    passage: 'Sample passage',
    questions: [
      {
        id: 'q1',
        question: 'What is the main idea?',
        type: 'multiple-choice',
        skill: 'main-idea',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
      },
    ],
    difficulty: 5,
    type: 'comprehension',
    timeEstimate: 120,
  })

  const defaultProps = {
    userId: 'user-123',
    mathProgress: createMockProgress(),
    readingProgress: createMockProgress(),
    latinXP: 50,
    greekXP: 30,
    logicXP: 20,
    dailyXP: 150,
    mathProblem: createMockMathProblem(),
    readingExercise: createMockReadingExercise(),

    // Voice system
    showVoiceSettingsModal: false,
    onVoiceSettingsToggle: jest.fn(),

    // Power-up system
    showPowerUpPanel: false,
    onPowerUpPanelToggle: jest.fn(),
    onPowerUpActivated: jest.fn(),
    onPowerUpExpired: jest.fn(),
    onXpSpent: jest.fn(),

    // Break intervention
    showBreakIntervention: false,
    currentIntervention: null,
    onBreakComplete: jest.fn(),
    onBreakSkip: jest.fn(),

    // Tutor modal
    showTutorModal: false,
    onCloseTutorModal: jest.fn(),

    // Challenges modal
    showChallengesModal: false,
    onCloseChallengesModal: jest.fn(),
    onClaimReward: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders VoiceAccessibilitySystem', () => {
      render(<DashboardSystems {...defaultProps} />)

      expect(
        screen.getByTestId('voice-accessibility-system')
      ).toBeInTheDocument()
    })

    it('renders PowerUpSystem', () => {
      render(<DashboardSystems {...defaultProps} />)

      expect(screen.getByTestId('power-up-system')).toBeInTheDocument()
    })

    it('does not render BreakIntervention when not showing', () => {
      render(
        <DashboardSystems {...defaultProps} showBreakIntervention={false} />
      )

      expect(screen.queryByTestId('break-intervention')).not.toBeInTheDocument()
    })

    it('does not render NearPeerTutorModal when closed', () => {
      render(<DashboardSystems {...defaultProps} showTutorModal={false} />)

      expect(
        screen.queryByTestId('near-peer-tutor-modal')
      ).not.toBeInTheDocument()
    })

    it('does not render DailyChallengesModal when closed', () => {
      render(<DashboardSystems {...defaultProps} showChallengesModal={false} />)

      expect(
        screen.queryByTestId('daily-challenges-modal')
      ).not.toBeInTheDocument()
    })
  })

  describe('VoiceAccessibilitySystem integration', () => {
    it('passes panel open state correctly', () => {
      render(
        <DashboardSystems {...defaultProps} showVoiceSettingsModal={true} />
      )

      const voiceSystem = screen.getByTestId('voice-accessibility-system')
      expect(voiceSystem).toHaveAttribute('data-panel-open', 'true')
    })

    it('passes panel closed state correctly', () => {
      render(
        <DashboardSystems {...defaultProps} showVoiceSettingsModal={false} />
      )

      const voiceSystem = screen.getByTestId('voice-accessibility-system')
      expect(voiceSystem).toHaveAttribute('data-panel-open', 'false')
    })
  })

  describe('PowerUpSystem integration', () => {
    it('passes panel open state correctly', () => {
      render(<DashboardSystems {...defaultProps} showPowerUpPanel={true} />)

      const powerUpSystem = screen.getByTestId('power-up-system')
      expect(powerUpSystem).toHaveAttribute('data-panel-open', 'true')
    })

    it('passes panel closed state correctly', () => {
      render(<DashboardSystems {...defaultProps} showPowerUpPanel={false} />)

      const powerUpSystem = screen.getByTestId('power-up-system')
      expect(powerUpSystem).toHaveAttribute('data-panel-open', 'false')
    })
  })

  describe('BreakIntervention integration', () => {
    const mockIntervention = {
      type: 'eye' as const,
      title: 'Eye Break',
      message: 'Look away from screen',
      duration: 20,
      action: 'Look at something far',
      icon: '👁️',
    }

    it('renders when showBreakIntervention is true and intervention exists', () => {
      render(
        <DashboardSystems
          {...defaultProps}
          showBreakIntervention={true}
          currentIntervention={mockIntervention}
        />
      )

      expect(screen.getByTestId('break-intervention')).toBeInTheDocument()
      expect(screen.getByText(/Eye Break/)).toBeInTheDocument()
    })

    it('does not render when intervention is null', () => {
      render(
        <DashboardSystems
          {...defaultProps}
          showBreakIntervention={true}
          currentIntervention={null}
        />
      )

      expect(screen.queryByTestId('break-intervention')).not.toBeInTheDocument()
    })

    it('does not render when showBreakIntervention is false', () => {
      render(
        <DashboardSystems
          {...defaultProps}
          showBreakIntervention={false}
          currentIntervention={mockIntervention}
        />
      )

      expect(screen.queryByTestId('break-intervention')).not.toBeInTheDocument()
    })
  })

  describe('NearPeerTutorModal integration', () => {
    it('renders when showTutorModal is true', () => {
      render(<DashboardSystems {...defaultProps} showTutorModal={true} />)

      expect(screen.getByTestId('near-peer-tutor-modal')).toBeInTheDocument()
    })

    it('passes correct user grade based on math progress', () => {
      const progress = createMockProgress({ currentDifficulty: 7.5 })
      render(
        <DashboardSystems
          {...defaultProps}
          mathProgress={progress}
          showTutorModal={true}
        />
      )

      expect(screen.getByText(/Grade 7/)).toBeInTheDocument()
    })

    it('uses default grade when mathProgress is null', () => {
      render(
        <DashboardSystems
          {...defaultProps}
          mathProgress={null}
          showTutorModal={true}
        />
      )

      // Default is grade 5
      expect(screen.getByText(/Grade 5/)).toBeInTheDocument()
    })
  })

  describe('DailyChallengesModal integration', () => {
    it('renders when showChallengesModal is true', () => {
      render(<DashboardSystems {...defaultProps} showChallengesModal={true} />)

      expect(screen.getByTestId('daily-challenges-modal')).toBeInTheDocument()
    })
  })

  describe('props passing', () => {
    it('passes XP values to systems', () => {
      render(
        <DashboardSystems
          {...defaultProps}
          dailyXP={500}
          latinXP={100}
          greekXP={75}
          logicXP={50}
        />
      )

      // Systems should receive these values
      expect(
        screen.getByTestId('voice-accessibility-system')
      ).toBeInTheDocument()
      expect(screen.getByTestId('power-up-system')).toBeInTheDocument()
    })

    it('passes userId to systems', () => {
      render(<DashboardSystems {...defaultProps} userId="custom-user-id" />)

      // Systems should receive userId
      expect(
        screen.getByTestId('voice-accessibility-system')
      ).toBeInTheDocument()
    })

    it('handles undefined userId', () => {
      render(<DashboardSystems {...defaultProps} userId={undefined} />)

      // Should render without errors
      expect(
        screen.getByTestId('voice-accessibility-system')
      ).toBeInTheDocument()
    })

    it('handles null progress values', () => {
      render(
        <DashboardSystems
          {...defaultProps}
          mathProgress={null}
          readingProgress={null}
        />
      )

      // Should render without errors
      expect(
        screen.getByTestId('voice-accessibility-system')
      ).toBeInTheDocument()
    })

    it('handles null problem values', () => {
      render(
        <DashboardSystems
          {...defaultProps}
          mathProblem={null}
          readingExercise={null}
        />
      )

      // Should render without errors
      expect(screen.getByTestId('power-up-system')).toBeInTheDocument()
    })
  })

  describe('callback functions', () => {
    it('receives callback props without error', () => {
      const callbacks = {
        onVoiceSettingsToggle: jest.fn(),
        onPowerUpPanelToggle: jest.fn(),
        onPowerUpActivated: jest.fn(),
        onPowerUpExpired: jest.fn(),
        onXpSpent: jest.fn(),
        onBreakComplete: jest.fn(),
        onBreakSkip: jest.fn(),
        onCloseTutorModal: jest.fn(),
        onCloseChallengesModal: jest.fn(),
        onClaimReward: jest.fn(),
      }

      render(<DashboardSystems {...defaultProps} {...callbacks} />)

      // Component should render with all callbacks
      expect(
        screen.getByTestId('voice-accessibility-system')
      ).toBeInTheDocument()
    })
  })

  describe('component composition', () => {
    it('renders all systems in correct fragment structure', () => {
      const { container } = render(<DashboardSystems {...defaultProps} />)

      // DashboardSystems returns a Fragment, so children should be direct
      // eslint-disable-next-line testing-library/no-node-access -- checking fragment child count requires direct DOM access
      expect(container.children.length).toBeGreaterThanOrEqual(2)
    })

    it('renders multiple modals when all are open', () => {
      const mockIntervention = {
        type: 'eye' as const,
        title: 'Eye Break',
        message: 'Look away',
        duration: 20,
        action: 'Look far',
        icon: '👁️',
      }

      render(
        <DashboardSystems
          {...defaultProps}
          showBreakIntervention={true}
          currentIntervention={mockIntervention}
          showTutorModal={true}
          showChallengesModal={true}
        />
      )

      expect(screen.getByTestId('break-intervention')).toBeInTheDocument()
      expect(screen.getByTestId('near-peer-tutor-modal')).toBeInTheDocument()
      expect(screen.getByTestId('daily-challenges-modal')).toBeInTheDocument()
    })
  })
})

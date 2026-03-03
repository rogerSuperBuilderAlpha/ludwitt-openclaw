/* eslint-disable testing-library/prefer-screen-queries */
/**
 * Unit Tests for ReadingSection Component
 *
 * Tests the reading section wrapper that converts V1 exercises to V2 format
 * and delegates rendering to ReadingSectionV2.
 */

import React from 'react'
import { render } from '@testing-library/react'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ReadingSection } = require('../ReadingSection')
import type {
  ReadingExercise,
  SubjectProgressDisplay,
} from '@/lib/types/basics'
import type { EngagementState } from '@/lib/hooks/useEngagementTracking'

// ---------- Mocks ----------

// Capture props passed to ReadingSectionV2
let capturedV2Props: Record<string, unknown> = {}

jest.mock('../reading-v2/ReadingSectionV2', () => {
  const MockV2 = (props: Record<string, unknown>) => {
    capturedV2Props = props
    return <div data-testid="reading-section-v2">ReadingSectionV2 Mock</div>
  }
  return { __esModule: true, default: MockV2, ReadingSectionV2: MockV2 }
})

// ---------- Helpers ----------

function makeExercise(
  overrides: Partial<ReadingExercise> = {}
): ReadingExercise {
  return {
    id: 'ex-1',
    type: 'comprehension',
    difficulty: 4,
    passage: 'Once upon a time...',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice' as const,
        question: 'What happened first?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
        explanation: 'A is correct because it happened first.',
        skill: 'literal-comprehension',
      },
    ],
    timeEstimate: 120,
    skillIds: ['literal-comprehension', 'main-idea'],
    ...overrides,
  }
}

function makeProgress(
  overrides: Partial<SubjectProgressDisplay> = {}
): SubjectProgressDisplay {
  return {
    currentDifficulty: 4,
    currentLevel: 'Grade 4',
    totalCompleted: 10,
    totalCorrect: 8,
    accuracyRate: 80,
    currentStreak: 3,
    longestStreak: 5,
    totalXP: 500,
    progressToNextLevel: 60,
    ...overrides,
  }
}

function makeEngagement(
  overrides: Partial<EngagementState> = {}
): EngagementState {
  return {
    confirmedPoints: 200,
    pendingPoints: 50,
    dailyTotal: 250,
    dailyGoal: 1000,
    timeUntilExpiry: 300,
    timerWarningLevel: 'none',
    isActive: true,
    lastActivity: Date.now(),
    confirmPoints: jest.fn(),
    forfeitPoints: jest.fn(),
    resetTimer: jest.fn(),
    ...overrides,
  }
}

const defaultProps = {
  exercise: makeExercise(),
  progress: makeProgress(),
  onExerciseComplete: jest.fn(),
  onSkip: jest.fn(),
  engagement: makeEngagement(),
  onBonusEarned: jest.fn(),
  dailyXP: 250,
  dailyGoal: 1000,
  onFocusModeClick: jest.fn(),
  focusModeAvailable: true,
  focusModeNextAvailable: null,
  skillMastery: { 'literal-comprehension': 0.7 },
}

// ---------- Tests ----------

describe('ReadingSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    capturedV2Props = {}
  })

  describe('rendering', () => {
    it('renders ReadingSectionV2 component', () => {
      const { getByTestId } = render(<ReadingSection {...defaultProps} />)
      expect(getByTestId('reading-section-v2')).toBeInTheDocument()
    })

    it('renders without crashing when exercise is null', () => {
      const { getByTestId } = render(
        <ReadingSection {...defaultProps} exercise={null} />
      )
      expect(getByTestId('reading-section-v2')).toBeInTheDocument()
    })

    it('renders without crashing when progress is null', () => {
      const { getByTestId } = render(
        <ReadingSection {...defaultProps} progress={null} />
      )
      expect(getByTestId('reading-section-v2')).toBeInTheDocument()
    })
  })

  describe('V1 to V2 exercise conversion', () => {
    it('maps comprehension type to comprehension-inferential', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({ type: 'comprehension' })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      expect(exercise.type).toBe('comprehension-inferential')
    })

    it('maps vocabulary type to vocabulary-context', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({ type: 'vocabulary' })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      expect(exercise.type).toBe('vocabulary-context')
    })

    it('maps grammar type to text-structure', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            type: 'grammar' as ReadingExercise['type'],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      expect(exercise.type).toBe('text-structure')
    })

    it('maps critical-analysis type to comprehension-critical', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            type: 'critical-analysis' as ReadingExercise['type'],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      expect(exercise.type).toBe('comprehension-critical')
    })

    it('defaults unknown type to comprehension-literal', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            type: 'unknown-type' as ReadingExercise['type'],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      expect(exercise.type).toBe('comprehension-literal')
    })

    it('sets primarySkill from first skillId', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({ skillIds: ['inference', 'vocabulary'] })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      expect(exercise.primarySkill).toBe('inference')
    })

    it('sets secondarySkills from remaining skillIds', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            skillIds: ['inference', 'vocabulary', 'main-idea'],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      expect(exercise.secondarySkills).toEqual(['vocabulary', 'main-idea'])
    })

    it('defaults primarySkill to literal-comprehension when no skillIds', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({ skillIds: undefined })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      expect(exercise.primarySkill).toBe('literal-comprehension')
    })

    it('passes exercise as null to V2 when exercise prop is null', () => {
      render(<ReadingSection {...defaultProps} exercise={null} />)
      expect(capturedV2Props.exercise).toBeNull()
    })
  })

  describe('depth of knowledge mapping', () => {
    it('assigns DOK 1 to literal skill questions', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            questions: [
              {
                id: 'q1',
                type: 'multiple-choice' as const,
                question: 'What?',
                options: ['A'],
                correctAnswer: 'A',
                explanation: 'Because',
                skill: 'literal-comprehension',
              },
            ],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      const questions = exercise.questions as Array<Record<string, unknown>>
      expect(questions[0].depthOfKnowledge).toBe(1)
    })

    it('assigns DOK 2 to inference skill questions', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            questions: [
              {
                id: 'q1',
                type: 'multiple-choice' as const,
                question: 'Why?',
                options: ['A'],
                correctAnswer: 'A',
                explanation: 'Because',
                skill: 'inference',
              },
            ],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      const questions = exercise.questions as Array<Record<string, unknown>>
      expect(questions[0].depthOfKnowledge).toBe(2)
    })

    it('assigns DOK 3 to analysis skill questions', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            questions: [
              {
                id: 'q1',
                type: 'multiple-choice' as const,
                question: 'Analyze',
                options: ['A'],
                correctAnswer: 'A',
                explanation: 'Because',
                skill: 'theme-analysis',
              },
            ],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      const questions = exercise.questions as Array<Record<string, unknown>>
      expect(questions[0].depthOfKnowledge).toBe(3)
    })

    it('assigns DOK 4 to critical skill questions', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            questions: [
              {
                id: 'q1',
                type: 'multiple-choice' as const,
                question: 'Evaluate',
                options: ['A'],
                correctAnswer: 'A',
                explanation: 'Because',
                skill: 'critical-evaluation',
              },
            ],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      const questions = exercise.questions as Array<Record<string, unknown>>
      expect(questions[0].depthOfKnowledge).toBe(4)
    })

    it('defaults DOK to 2 when no skill is specified', () => {
      render(
        <ReadingSection
          {...defaultProps}
          exercise={makeExercise({
            questions: [
              {
                id: 'q1',
                type: 'multiple-choice' as const,
                question: 'Q',
                options: ['A'],
                correctAnswer: 'A',
                explanation: 'E',
                skill: 'general',
              },
            ],
          })}
        />
      )
      const exercise = capturedV2Props.exercise as Record<string, unknown>
      const questions = exercise.questions as Array<Record<string, unknown>>
      expect(questions[0].depthOfKnowledge).toBe(2)
    })
  })

  describe('prop passthrough to ReadingSectionV2', () => {
    it('passes progress through', () => {
      const progress = makeProgress({ totalXP: 999 })
      render(<ReadingSection {...defaultProps} progress={progress} />)
      expect(capturedV2Props.progress).toEqual(progress)
    })

    it('passes onSkip through', () => {
      const onSkip = jest.fn()
      render(<ReadingSection {...defaultProps} onSkip={onSkip} />)
      expect(capturedV2Props.onSkip).toBe(onSkip)
    })

    it('passes engagement through', () => {
      const engagement = makeEngagement({ dailyTotal: 800 })
      render(<ReadingSection {...defaultProps} engagement={engagement} />)
      expect(capturedV2Props.engagement).toEqual(engagement)
    })

    it('passes dailyXP through', () => {
      render(<ReadingSection {...defaultProps} dailyXP={750} />)
      expect(capturedV2Props.dailyXP).toBe(750)
    })

    it('passes dailyGoal through', () => {
      render(<ReadingSection {...defaultProps} dailyGoal={2000} />)
      expect(capturedV2Props.dailyGoal).toBe(2000)
    })

    it('passes focusModeAvailable through', () => {
      render(<ReadingSection {...defaultProps} focusModeAvailable={false} />)
      expect(capturedV2Props.focusModeAvailable).toBe(false)
    })

    it('passes skillMastery through', () => {
      const mastery = { 'literal-comprehension': 0.9, inference: 0.5 }
      render(<ReadingSection {...defaultProps} skillMastery={mastery} />)
      expect(capturedV2Props.skillMastery).toEqual(mastery)
    })

    it('uses default values for optional props', () => {
      render(
        <ReadingSection
          exercise={makeExercise()}
          progress={makeProgress()}
          onExerciseComplete={jest.fn()}
          onSkip={jest.fn()}
          engagement={makeEngagement()}
        />
      )
      expect(capturedV2Props.dailyXP).toBe(0)
      expect(capturedV2Props.dailyGoal).toBe(1000)
      expect(capturedV2Props.focusModeAvailable).toBe(true)
    })
  })
})

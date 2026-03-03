'use client'

/**
 * Spaced Repetition System
 *
 * FUNCTIONALITY:
 * - Triggers automatically after every 20 questions completed
 * - Generates 5 review questions testing previous skills
 * - Shows progress towards next SRS session (X/20)
 * - Awards XP for successful reviews
 * - REAL IMPACT: Reinforces learning through periodic skill reviews
 *
 * USER IMPACT: HIGH - Reinforces previously learned concepts
 * DATA: 100% REAL - Tracks progress, generates review questions
 */

import { SubjectProgressDisplay } from '@/lib/types/basics'
import {
  useSpacedRepetition,
  type ReviewItem,
  type ReviewSession,
} from './hooks/useSpacedRepetition'
import { SRSProgressPanel } from './SRSProgressPanel'
import { SRSReviewSession } from './SRSReviewSession'

// Re-export types for backwards compatibility
export type { ReviewItem, ReviewSession }

interface RecentProblem {
  id: string
  question: string
  topic: string
  difficulty: number
  correct: boolean
  userAnswer: string
  correctAnswer: string
}

interface SpacedRepetitionSystemProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  onReviewComplete: (item: ReviewItem, correct: boolean) => void
  onCreditsUsed?: (cost: number, newBalance: number) => void
  recentProblems?: RecentProblem[]
  userId?: string
  showTriggerButton?: boolean
}

export function SpacedRepetitionSystem({
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  onReviewComplete,
  onCreditsUsed,
  recentProblems = [],
  showTriggerButton = false,
}: SpacedRepetitionSystemProps) {
  const {
    currentSession,
    showReviewPanel,
    isReviewing,
    currentAnswer,
    setCurrentAnswer,
    isGenerating,
    generationError,
    setGenerationError,
    totalCompleted,
    progressToNextSRS,
    currentReviewItem,
    canStartReview,
    questionsRemaining,
    questionsPerTrigger,
    handleStartSRSSession,
    handleReviewAnswer,
    checkAnswer,
    closeReviewSession,
  } = useSpacedRepetition({
    mathProgress,
    readingProgress,
    latinXP,
    greekXP,
    logicXP,
    onReviewComplete,
    onCreditsUsed,
    recentProblems,
  })

  if (!isReviewing) {
    return (
      <SRSProgressPanel
        totalCompleted={totalCompleted}
        progressToNextSRS={progressToNextSRS}
        questionsRemaining={questionsRemaining}
        questionsPerTrigger={questionsPerTrigger}
        recentProblemsCount={recentProblems.length}
        canStartReview={canStartReview}
        isGenerating={isGenerating}
        generationError={generationError}
        onDismissError={() => setGenerationError(null)}
        onStartSession={handleStartSRSSession}
      />
    )
  }

  return (
    <SRSReviewSession
      isOpen={showReviewPanel}
      currentSession={currentSession}
      currentReviewItem={currentReviewItem}
      currentAnswer={currentAnswer}
      onAnswerChange={setCurrentAnswer}
      onCheckAnswer={checkAnswer}
      onDidntRemember={() => handleReviewAnswer(false)}
      onClose={closeReviewSession}
    />
  )
}

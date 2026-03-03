'use client'

/**
 * ProblemDisplayV2 Component
 *
 * REDESIGNED for reduced cognitive load:
 * - Single compact info row instead of multiple badges
 * - Collapsible hint system (hidden by default)
 * - Concepts hidden until feedback (moved to feedback component)
 * - Clean, focused question display
 */

import { useCallback, useState } from 'react'
import {
  Fire,
  Clock,
  Lightbulb,
  CaretDown,
  CaretUp,
  Swap,
} from '@phosphor-icons/react'
import { MathProblemV2, HintLevel, isGraphConfig } from '@/lib/types/math-v2'
import { QuestionRenderer } from './QuestionRenderer'
import { HintSystem } from './HintSystem'
import {
  GraphRenderer,
  GeometryDiagram,
  DiagramRenderer,
  StatisticsChart,
} from '../Visualization'

// Re-export sub-components
export { QuestionRenderer } from './QuestionRenderer'
export { HintSystem } from './HintSystem'

interface ProblemDisplayV2Props {
  /** The problem to display */
  problem: MathProblemV2
  /** Whether hints are disabled */
  hintsDisabled?: boolean
  /** Callback when a hint is used */
  onHintUsed?: (level: HintLevel, index: number) => void
  /** Callback when AI Tutor is requested */
  onAITutorRequest?: () => void
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Optional className */
  className?: string
  /** Whether to show the hints section */
  showHints?: boolean
  /** Whether to show the topic/difficulty badge */
  showBadge?: boolean
  /** Whether the problem has been answered (reveals answer-giving visuals) */
  isAnswered?: boolean
  /** Callback when credits are used (for concept explanations) - now used in feedback */
  onCreditsUsed?: () => void
  /** Whether this is a transfer challenge (applying concepts in new contexts) */
  isTransferChallenge?: boolean
}

/**
 * Get difficulty label from numeric value
 */
function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= 3) return 'Easy'
  if (difficulty <= 6) return 'Medium'
  if (difficulty <= 9) return 'Hard'
  return 'Expert'
}

// Removed getDifficultyColors and getTypeIcon - no longer needed with compact UI

/**
 * Determines if a graph/diagram would give away the answer
 * (and should only be shown AFTER answering)
 */
function shouldHideVisualUntilAnswered(problem: MathProblemV2): boolean {
  // Algebra problems where solving is the goal - graph shows the answer
  if (problem.type === 'algebra') {
    const topic = problem.pedagogy.topic.toLowerCase()
    const subTopic = problem.pedagogy.subTopic?.toLowerCase() || ''
    const question = problem.question.text.toLowerCase()

    // Systems of equations - graph intersection is the answer
    if (
      topic.includes('system') ||
      subTopic.includes('system') ||
      question.includes('solve the system') ||
      question.includes('substitution') ||
      question.includes('elimination')
    ) {
      return true
    }

    // Solving equations - x-intercept might be the answer
    if (question.includes('solve for') || question.includes('find the value')) {
      return true
    }
  }

  // Calculus problems where finding intercepts/roots
  if (problem.type === 'calculus') {
    const question = problem.question.text.toLowerCase()
    if (
      question.includes('find the') &&
      (question.includes('root') || question.includes('zero'))
    ) {
      return true
    }
  }

  // For geometry - diagram is needed to understand the problem
  // For statistics - charts are data, not answers
  // For graphing identification problems - graph is the question, not answer
  return false
}

/**
 * Determines if a problem is a transfer challenge based on its characteristics
 * Transfer challenges apply familiar concepts in new/unfamiliar contexts
 */
function detectTransferChallenge(problem: MathProblemV2): boolean {
  // Check for word problems that apply concepts in real-world contexts
  if (problem.type === 'word-problem') return true

  // Check for cognitive level that requires application or higher
  if (
    problem.pedagogy.cognitiveLevel &&
    ['apply', 'analyze', 'evaluate', 'create'].includes(
      problem.pedagogy.cognitiveLevel
    )
  ) {
    return true
  }

  // Check if problem has multiple skills (cross-topic integration)
  if (problem.pedagogy.skills.length >= 3) return true

  // Check for scaffolding level - minimal scaffolding in new context = transfer
  if (
    problem.pedagogy.scaffoldingLevel === 'minimal' &&
    problem.difficulty >= 5
  ) {
    return true
  }

  return false
}

export function ProblemDisplayV2({
  problem,
  hintsDisabled = false,
  onHintUsed,
  onAITutorRequest,
  size = 'md',
  className = '',
  showHints = true,
  showBadge = true,
  isAnswered = false,
  onCreditsUsed: _onCreditsUsed,
  isTransferChallenge: isTransferChallengeProp,
}: ProblemDisplayV2Props) {
  // Auto-detect transfer challenge if not explicitly provided
  const isTransferChallenge =
    isTransferChallengeProp ?? detectTransferChallenge(problem)
  const [hintsRevealed, setHintsRevealed] = useState<HintLevel[]>([])
  const [showHintsExpanded, setShowHintsExpanded] = useState(false)

  // Handle hint reveal
  const handleHintReveal = useCallback(
    (level: HintLevel) => {
      setHintsRevealed((prev) =>
        prev.includes(level) ? prev : [...prev, level]
      )
      // Find the index of this hint level in the problem's hints array
      const index = problem.hints.findIndex((h) => h.level === level)
      onHintUsed?.(level, index)
    },
    [onHintUsed, problem.hints]
  )

  // Check if we should hide visuals until answered
  const hideVisualsUntilAnswered = shouldHideVisualUntilAnswered(problem)
  const canShowAnswerRevealingVisuals = isAnswered || !hideVisualsUntilAnswered

  // Determine what visualizations to show
  const hasGraph =
    problem.visuals?.graph && isGraphConfig(problem.visuals.graph)
  const hasDiagram = problem.visuals?.diagram
  const hasImage = problem.visuals?.image

  // For answer-revealing visuals, only show after answered
  const showGraph = hasGraph && canShowAnswerRevealingVisuals
  const showDiagram =
    hasDiagram && (problem.type === 'geometry' || canShowAnswerRevealingVisuals)
  const showImage = hasImage

  // Get difficulty indicator (1-3 dots based on difficulty level)
  const difficultyDots =
    problem.difficulty <= 3 ? 1 : problem.difficulty <= 6 ? 2 : 3

  return (
    <div className={`problem-display-v2 ${className}`}>
      {/* Compact Info Row - Single line of essential info */}
      {showBadge && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {/* Transfer Challenge indicator - subtle ribbon */}
            {isTransferChallenge && (
              <span className="flex items-center gap-1 text-purple-600 font-medium">
                <Swap size={14} weight="bold" />
                <span className="hidden sm:inline">Apply</span>
              </span>
            )}
            {isTransferChallenge && <span className="text-gray-300">•</span>}

            {/* Topic */}
            <span className="font-medium text-gray-900 capitalize">
              {problem.pedagogy.topic}
            </span>

            {/* Sub-topic (if exists) */}
            {problem.pedagogy.subTopic && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">
                  {problem.pedagogy.subTopic}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            {/* Difficulty dots */}
            <div
              className="flex items-center gap-1"
              title={`${getDifficultyLabel(problem.difficulty)} (Grade ${problem.gradeLevel})`}
            >
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className={`w-1.5 h-1.5 rounded-full ${
                    dot <= difficultyDots ? 'bg-amber-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Time estimate */}
            {problem.pedagogy.timeEstimate && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {Math.ceil(problem.pedagogy.timeEstimate / 60)}m
              </span>
            )}
          </div>
        </div>
      )}

      {/* Question Content */}
      <div className="mb-6">
        <QuestionRenderer question={problem.question} size={size} />
      </div>

      {/* Visualization Section */}
      {(showGraph || showDiagram || showImage) && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          {/* Graph Visualization */}
          {showGraph && problem.visuals?.graph && (
            <div className="flex justify-center">
              <GraphRenderer
                config={problem.visuals.graph}
                width={400}
                height={300}
              />
            </div>
          )}

          {/* Diagram Visualization */}
          {showDiagram && problem.visuals?.diagram && (
            <div className="flex justify-center">
              {problem.visuals.diagram.type === 'geometry' ? (
                <GeometryDiagram diagram={problem.visuals.diagram} />
              ) : ['bar-chart', 'pie-chart', 'box-plot', 'histogram'].includes(
                  problem.visuals.diagram.type
                ) ? (
                <StatisticsChart diagram={problem.visuals.diagram} />
              ) : (
                <DiagramRenderer diagram={problem.visuals.diagram} />
              )}
            </div>
          )}

          {/* Image */}
          {showImage && problem.visuals?.image && (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={problem.visuals.image.url}
                alt={problem.visuals.image.alt}
                width={problem.visuals.image.width || 400}
                height={problem.visuals.image.height || 300}
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          )}

          {/* Diagram description */}
          {showDiagram && problem.visuals?.diagram?.description && (
            <p className="text-center text-sm text-gray-500 mt-2">
              {problem.visuals.diagram.description}
            </p>
          )}
        </div>
      )}

      {/* Hidden visual notice - shows when graph/diagram is hidden */}
      {hideVisualsUntilAnswered && !isAnswered && (hasGraph || hasDiagram) && (
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
          <p className="text-xs text-blue-600">
            📊 Graph available after answering
          </p>
        </div>
      )}

      {/* Collapsible Hints Section - Much cleaner */}
      {showHints &&
        problem.hints &&
        problem.hints.length > 0 &&
        !isAnswered && (
          <div className="border-t border-gray-100 pt-3">
            {/* Collapsed state - just a button */}
            {!showHintsExpanded ? (
              <button
                onClick={() => setShowHintsExpanded(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <Lightbulb size={16} weight="fill" className="text-amber-500" />
                <span className="text-sm font-medium">Need a hint?</span>
                <CaretDown size={14} />
              </button>
            ) : (
              <div className="space-y-3">
                {/* Header with collapse button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb
                      size={16}
                      weight="fill"
                      className="text-amber-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Hints
                    </span>
                  </div>
                  <button
                    onClick={() => setShowHintsExpanded(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                  >
                    <span>Hide</span>
                    <CaretUp size={12} />
                  </button>
                </div>

                {/* Hint System */}
                <HintSystem
                  hints={problem.hints}
                  hintsUsed={hintsRevealed}
                  onHintReveal={handleHintReveal}
                  onAITutorRequest={onAITutorRequest}
                />
              </div>
            )}
          </div>
        )}

      {/* Concepts - Hidden during problem solving, shown in feedback component instead */}
      {/* This section is intentionally removed to reduce cognitive load */}
    </div>
  )
}

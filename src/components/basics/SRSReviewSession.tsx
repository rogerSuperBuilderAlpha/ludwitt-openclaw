/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-autofocus */
'use client'

import {
  Brain,
  CheckCircle,
  XCircle,
  Calculator,
  BookOpen,
} from '@phosphor-icons/react'
import { UnifiedModal } from './UnifiedModal'
import type { ReviewItem, ReviewSession } from './hooks/useSpacedRepetition'

interface SRSReviewSessionProps {
  isOpen: boolean
  currentSession: ReviewSession | null
  currentReviewItem: ReviewItem | null
  currentAnswer: string
  onAnswerChange: (value: string) => void
  onCheckAnswer: () => void
  onDidntRemember: () => void
  onClose: () => void
}

export function SRSReviewSession({
  isOpen,
  currentSession,
  currentReviewItem,
  currentAnswer,
  onAnswerChange,
  onCheckAnswer,
  onDidntRemember,
  onClose,
}: SRSReviewSessionProps) {
  return (
    <UnifiedModal
      isOpen={isOpen && !!currentSession}
      onClose={onClose}
      title="Review Session"
      subtitle={
        currentSession
          ? `${currentSession.currentIndex + 1} of ${currentSession.items.length} \u2022 ${currentSession.correctCount}\u2713 ${currentSession.incorrectCount}\u2717`
          : ''
      }
      icon={<Brain size={22} weight="bold" className="b-text-logic" />}
      size="lg"
      position="center"
    >
      {currentSession && (
        <>
          {currentReviewItem && !currentSession.completed && (
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="w-full bg-b-border rounded-full h-2">
                <div
                  className="b-bg-math h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(currentSession.currentIndex / currentSession.items.length) * 100}%`,
                  }}
                />
              </div>

              {/* Topic Badge */}
              <div className="flex items-center gap-2">
                {currentReviewItem.type === 'math' ? (
                  <Calculator size={16} className="b-text-math" />
                ) : (
                  <BookOpen size={16} className="b-text-reading" />
                )}
                <span className="text-sm font-medium b-text-secondary">
                  {currentReviewItem.topic}
                  {currentReviewItem.subTopic &&
                    ` \u2022 ${currentReviewItem.subTopic}`}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    currentReviewItem.difficulty === 'easy'
                      ? 'b-bg-reading-light b-text-reading'
                      : currentReviewItem.difficulty === 'medium'
                        ? 'b-bg-writing-light b-text-writing'
                        : 'b-bg-latin-light b-text-latin'
                  }`}
                >
                  {currentReviewItem.difficulty}
                </span>
              </div>

              {/* Question */}
              <div className="b-bg-muted rounded-lg p-4">
                <p className="b-text-primary font-medium mb-2">
                  {currentReviewItem.question}
                </p>

                {currentReviewItem.type === 'reading' && (
                  <div className="text-sm b-text-secondary mb-2">
                    <strong>Question:</strong> {currentReviewItem.question}
                  </div>
                )}
              </div>

              {/* Previous Answer (if wrong) */}
              {currentReviewItem.userAnswer && (
                <div className="b-bg-latin-light border b-border-latin rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle size={16} className="b-text-latin" />
                    <span className="text-sm font-medium b-text-latin">
                      Previous Answer
                    </span>
                  </div>
                  <p className="text-sm b-text-latin">
                    {Array.isArray(currentReviewItem.userAnswer)
                      ? currentReviewItem.userAnswer.join(', ')
                      : currentReviewItem.userAnswer}
                  </p>
                </div>
              )}

              {/* Hint */}
              {currentReviewItem.hint && (
                <details className="b-bg-math-light border b-border-math rounded-lg p-3">
                  <summary className="text-sm font-medium b-text-math cursor-pointer">
                    Hint (Click to reveal)
                  </summary>
                  <p className="text-sm b-text-math mt-2">
                    {currentReviewItem.hint}
                  </p>
                </details>
              )}

              {/* Answer Input */}
              <div>
                <label className="block text-sm font-medium b-text-secondary mb-2">
                  Your Answer:
                </label>
                {currentReviewItem.type === 'math' ? (
                  <input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && onCheckAnswer()}
                    className="w-full px-4 py-3 border b-border rounded-lg focus:ring-2 focus:ring-b-math focus:border-transparent"
                    placeholder="Enter your answer..."
                    autoFocus
                  />
                ) : (
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    className="w-full px-4 py-3 border b-border rounded-lg focus:ring-2 focus:ring-b-math focus:border-transparent"
                    placeholder="Enter your answer..."
                    rows={3}
                    autoFocus
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onDidntRemember}
                  className="flex-1 b-bg-latin text-white py-3 px-4 rounded-lg hover:opacity-90 transition-colors font-medium"
                >
                  Didn&apos;t Remember
                </button>
                <button
                  onClick={onCheckAnswer}
                  disabled={!currentAnswer.trim()}
                  className="flex-1 b-bg-reading text-white py-3 px-4 rounded-lg hover:b-bg-reading transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
              </div>
            </div>
          )}

          {/* Session Complete */}
          {currentSession.completed && (
            <div className="text-center py-8">
              <CheckCircle size={64} className="b-text-reading mx-auto mb-4" />
              <h3 className="text-xl font-bold b-text-primary mb-2">
                Review Complete!
              </h3>
              <p className="b-text-secondary mb-4">
                You reviewed {currentSession.items.length} items
              </p>
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold b-text-reading">
                    {currentSession.correctCount}
                  </div>
                  <div className="text-sm b-text-secondary">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold b-text-latin">
                    {currentSession.incorrectCount}
                  </div>
                  <div className="text-sm b-text-secondary">Needs Work</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="b-bg-math text-white py-3 px-6 rounded-lg hover:b-bg-math transition-colors font-medium"
              >
                Continue Learning
              </button>
            </div>
          )}
        </>
      )}
    </UnifiedModal>
  )
}

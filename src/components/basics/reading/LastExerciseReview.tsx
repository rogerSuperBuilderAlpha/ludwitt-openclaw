'use client'

/**
 * Last Exercise Review Component
 * Shows the previous exercise for review
 */

import { BookOpen } from '@phosphor-icons/react'
import { ReadingExercise } from '@/lib/types/basics'

interface LastExerciseReviewProps {
  exercise: ReadingExercise
}

export function LastExerciseReview({ exercise }: LastExerciseReviewProps) {
  return (
    <div className="b-bg-math-light border b-border-math rounded-lg p-4 animate-[slideIn_0.3s_ease-out]">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={20} weight="bold" className="text-b-math" />
        <h3 className="font-semibold b-text-math">Previous Exercise</h3>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium b-text-math mb-1">Passage:</p>
          <p className="text-sm text-b-math max-h-32 overflow-y-auto">
            {exercise.passage}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium b-text-math mb-1">
            Questions & Answers:
          </p>
          <div className="space-y-2">
            {exercise.questions.map((q, idx) => (
              <div key={q.id} className="text-sm">
                <p className="font-medium b-text-math">
                  {idx + 1}. {q.question}
                </p>
                <p className="text-b-math ml-4">Answer: {q.correctAnswer}</p>
                {q.explanation && (
                  <p className="text-b-math ml-4 text-xs opacity-80">
                    Explanation: {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

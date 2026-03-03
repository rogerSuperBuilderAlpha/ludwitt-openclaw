'use client'

import { CaretLeft, CheckCircle, Coins } from '@phosphor-icons/react'
import type { FamousAuthor, AuthorPublication, QuizQuestion } from './types'

interface QuizViewProps {
  selectedAuthor: FamousAuthor
  selectedBook: AuthorPublication
  quizQuestions: QuizQuestion[]
  quizAnswers: Record<number, number>
  setQuizAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>
  quizScore: number | null
  onSubmitQuiz: () => void
  onBackToPublications: () => void
}

export function QuizView({
  selectedAuthor,
  selectedBook,
  quizQuestions,
  quizAnswers,
  setQuizAnswers,
  quizScore,
  onSubmitQuiz,
  onBackToPublications,
}: QuizViewProps) {
  return (
    <div className="space-y-3">
      <button
        onClick={onBackToPublications}
        className="flex items-center gap-1 b-text-logic hover:b-text-logic-dark transition-colors cursor-pointer b-text-xs"
      >
        <CaretLeft size={14} />
        <span>Back to {selectedAuthor.name}</span>
      </button>

      <div className="b-p-md b-bg-math-light b-rounded-lg">
        <h4 className="b-font-bold b-text-math-dark b-text-sm">
          {selectedBook.title}
        </h4>
        <p className="b-text-xs b-text-math-text">
          Answer all 10 correctly to verify you&apos;ve read it
        </p>
      </div>

      {quizScore === null ? (
        <div className="flex flex-col h-full max-h-[calc(100vh-280px)] min-h-[300px]">
          {/* Scrollable questions area */}
          <div className="flex-1 overflow-y-auto space-y-3 pb-4">
            {quizQuestions.map((q, qIdx) => (
              <div
                key={qIdx}
                className="b-p-sm b-bg-card b-border b-rounded-lg"
              >
                <p className="b-text-xs b-font-medium b-text-primary b-mb-2">
                  {qIdx + 1}. {q.question}
                </p>
                <div className="space-y-1">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() =>
                        setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
                      }
                      className={`w-full text-left px-2 py-1.5 b-rounded b-text-xs transition-colors cursor-pointer ${
                        quizAnswers[qIdx] === optIdx
                          ? 'b-bg-logic b-text-inverse'
                          : 'b-bg-muted hover:b-bg-logic-light b-text-secondary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky submit button - always visible */}
          <div className="flex-shrink-0 pt-3 border-t b-border sticky bottom-0 bg-white">
            <button
              onClick={onSubmitQuiz}
              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
              className="w-full b-btn b-btn-math cursor-pointer b-text-sm py-3 disabled:opacity-50 font-medium"
            >
              Submit Quiz ({Object.keys(quizAnswers).length}/
              {quizQuestions.length})
            </button>
            {Object.keys(quizAnswers).length < quizQuestions.length && (
              <p className="text-center b-text-xs b-text-muted mt-2">
                Answer all {quizQuestions.length} questions to submit
              </p>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`b-p-lg b-rounded-xl text-center ${
            quizScore === quizQuestions.length
              ? 'b-bg-reading-light'
              : 'b-bg-latin-light'
          }`}
        >
          {quizScore === quizQuestions.length ? (
            <>
              <CheckCircle
                size={40}
                weight="fill"
                className="b-text-reading mx-auto b-mb-sm"
              />
              <h4 className="b-font-bold b-text-reading-dark b-mb-xs">
                Perfect Score!
              </h4>
              <p className="b-text-sm b-text-reading-text b-mb-md">
                You&apos;ve verified reading {selectedBook.title}
              </p>
              <button
                onClick={onBackToPublications}
                className="b-btn b-btn-reading cursor-pointer"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <p className="b-text-3xl b-font-bold b-text-latin-dark b-mb-xs">
                {quizScore}/10
              </p>
              <h4 className="b-font-bold b-text-latin-dark b-mb-xs">
                Not quite!
              </h4>
              <p className="b-text-sm b-text-latin-text b-mb-md">
                You need 10/10 to verify. Try again in 30 days.
              </p>
              <button
                onClick={onBackToPublications}
                className="b-btn b-btn-secondary cursor-pointer"
              >
                Back
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

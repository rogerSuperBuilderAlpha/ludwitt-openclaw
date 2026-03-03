'use client'

/**
 * ProblemCard Component
 * Displays an embedded practice problem in the chat
 */

import { useState } from 'react'
import {
  Question,
  CheckCircle,
  XCircle,
  PaperPlaneTilt,
} from '@phosphor-icons/react'
import type { EmbeddedProblem } from '@/lib/types/independent-study'

interface ProblemCardProps {
  problem: EmbeddedProblem
  onSubmitAnswer?: (problemId: string, answer: string) => void
}

export function ProblemCard({ problem, onSubmitAnswer }: ProblemCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(
    problem.userAnswer !== undefined
  )

  const isMultipleChoice = problem.type === 'multiple-choice' && problem.options
  const isTrueFalse = problem.type === 'true-false'
  const isFreeResponse = problem.type === 'free-response'

  const handleSubmit = () => {
    if (!selectedAnswer.trim() || isSubmitted) return
    setIsSubmitted(true)
    onSubmitAnswer?.(problem.id, selectedAnswer)
  }

  // Show result state if already answered
  if (isSubmitted && problem.isCorrect !== undefined) {
    return (
      <div
        className={`p-4 rounded-xl border-2 ${
          problem.isCorrect
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          {problem.isCorrect ? (
            <CheckCircle size={20} weight="fill" className="text-green-600" />
          ) : (
            <XCircle size={20} weight="fill" className="text-red-600" />
          )}
          <span
            className={`font-semibold ${
              problem.isCorrect ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {problem.isCorrect ? 'Correct!' : 'Not quite'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{problem.question}</p>
        <p className="text-sm">
          <span className="font-medium">Your answer:</span> {problem.userAnswer}
        </p>
        {problem.feedback && (
          <p className="text-sm text-gray-600 mt-2 italic">
            {problem.feedback}
          </p>
        )}
        {problem.xpEarned && problem.xpEarned > 0 && (
          <p className="text-sm font-medium text-amber-600 mt-2">
            +{problem.xpEarned} XP
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
          <Question size={16} weight="bold" color="white" />
        </div>
        <span className="font-semibold text-amber-800">Practice Problem</span>
      </div>

      {/* Question */}
      <p className="text-sm text-gray-800 mb-4 font-medium">
        {problem.question}
      </p>

      {/* Answer Input */}
      {isMultipleChoice && problem.options && (
        <div className="space-y-2 mb-4">
          {problem.options.map((option, index) => {
            // Options are strings like "A) First option"
            // Extract the letter for the value
            const optionValue = option.charAt(0)

            return (
              <button
                key={index}
                onClick={() => setSelectedAnswer(optionValue)}
                disabled={isSubmitted}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedAnswer === optionValue
                    ? 'border-amber-500 bg-amber-100'
                    : 'border-gray-200 bg-white hover:border-amber-300'
                } ${isSubmitted ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="text-sm">{option}</span>
              </button>
            )
          })}
        </div>
      )}

      {isTrueFalse && (
        <div className="flex gap-3 mb-4">
          {['True', 'False'].map((option) => (
            <button
              key={option}
              onClick={() => setSelectedAnswer(option)}
              disabled={isSubmitted}
              className={`flex-1 p-3 rounded-lg border-2 font-medium transition-all cursor-pointer ${
                selectedAnswer === option
                  ? 'border-amber-500 bg-amber-100'
                  : 'border-gray-200 bg-white hover:border-amber-300'
              } ${isSubmitted ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {isFreeResponse && (
        <textarea
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          disabled={isSubmitted}
          placeholder="Type your answer..."
          rows={3}
          className="w-full p-3 rounded-lg border-2 border-gray-200 text-sm mb-4 resize-none focus:border-amber-400 focus:outline-none"
        />
      )}

      {/* Submit Button */}
      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer.trim()}
          className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
            selectedAnswer.trim()
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <PaperPlaneTilt size={18} weight="bold" />
          Submit Answer
        </button>
      )}

      {isSubmitted && !problem.isCorrect && (
        <div className="text-center text-sm text-gray-500">
          Waiting for feedback...
        </div>
      )}
    </div>
  )
}

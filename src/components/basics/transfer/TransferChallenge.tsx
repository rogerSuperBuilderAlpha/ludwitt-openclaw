/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-autofocus */
'use client'

/**
 * TransferChallenge Component
 *
 * Presents the same concept in a novel context to test transfer of learning.
 * Addresses learning science gap: 70-90% of learning fails to transfer to new contexts.
 *
 * Research: Perkins & Salomon (1989) - Transfer requires explicit instruction
 * and varied contexts.
 *
 * Transfer Types:
 * - Math: Equation → Word problem → Diagram
 * - Reading: Fiction → Nonfiction → Technical
 * - Latin/Greek: Translation → Etymology connection → English derivatives
 */

import { useState } from 'react'
import {
  Sparkle,
  ArrowRight,
  LightbulbFilament,
  Trophy,
  X,
  Check,
  Warning,
  BookOpen,
  Calculator,
  Columns,
  Flask,
} from '@phosphor-icons/react'
import { Portal } from '../Portal'

export type TransferType =
  | 'word_problem' // Math: equation in story form
  | 'diagram' // Math: visual representation
  | 'real_world' // Math: practical application
  | 'genre_shift' // Reading: apply skill to different text type
  | 'etymology' // Language: connect to English words
  | 'reverse' // Language: English to Latin/Greek

export interface TransferChallengeData {
  id: string
  originalSkill: string
  originalContext: string
  transferType: TransferType
  subject: 'math' | 'reading' | 'latin' | 'greek'

  // The challenge
  prompt: string
  question: string
  hint?: string
  correctAnswer: string
  acceptableAnswers?: string[]

  // Explanation of the connection
  connectionExplanation: string

  // XP bonus for completing transfer
  bonusXP: number
}

interface TransferChallengeProps {
  challenge: TransferChallengeData
  isOpen: boolean
  onClose: () => void
  onComplete: (correct: boolean, xpEarned: number) => void
}

const SUBJECT_CONFIG = {
  math: { icon: <Calculator size={20} weight="fill" />, color: 'blue' },
  reading: { icon: <BookOpen size={20} weight="fill" />, color: 'green' },
  latin: { icon: <Columns size={20} weight="fill" />, color: 'amber' },
  greek: { icon: <Flask size={20} weight="fill" />, color: 'purple' },
}

const TRANSFER_TYPE_LABELS: Record<TransferType, string> = {
  word_problem: 'Word Problem',
  diagram: 'Visual Challenge',
  real_world: 'Real-World Application',
  genre_shift: 'Different Context',
  etymology: 'Word Origins',
  reverse: 'Reverse Translation',
}

export function TransferChallenge({
  challenge,
  isOpen,
  onClose,
  onComplete,
}: TransferChallengeProps) {
  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  if (!isOpen) return null

  const subjectConfig = SUBJECT_CONFIG[challenge.subject]

  const handleSubmit = () => {
    if (!answer.trim()) return

    // Check answer
    const normalizedAnswer = answer.trim().toLowerCase()
    const normalizedCorrect = challenge.correctAnswer.toLowerCase()

    let correct = normalizedAnswer === normalizedCorrect

    // Check acceptable alternatives
    if (!correct && challenge.acceptableAnswers) {
      correct = challenge.acceptableAnswers.some(
        (alt) => alt.toLowerCase() === normalizedAnswer
      )
    }

    // For numbers, also check numeric equality
    if (!correct && !isNaN(parseFloat(normalizedAnswer))) {
      const numAnswer = parseFloat(normalizedAnswer)
      const numCorrect = parseFloat(normalizedCorrect)
      correct = numAnswer === numCorrect
    }

    setIsCorrect(correct)
    setSubmitted(true)

    // Calculate XP
    const xpEarned = correct
      ? challenge.bonusXP
      : Math.floor(challenge.bonusXP * 0.25)

    // Don't auto-close, let user see feedback
  }

  const handleContinue = () => {
    const xpEarned = isCorrect
      ? challenge.bonusXP
      : Math.floor(challenge.bonusXP * 0.25)
    onComplete(isCorrect, xpEarned)
    onClose()
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          style={{ background: '#ffffff' }}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4">
            {/* Badge */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-lg text-sm font-bold">
                <Sparkle size={16} weight="fill" />
                Transfer Challenge!
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full bg-${subjectConfig.color}-100 flex items-center justify-center`}
                >
                  {subjectConfig.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {challenge.originalSkill}
                  </div>
                  <div className="text-xs text-gray-500">
                    {TRANSFER_TYPE_LABELS[challenge.transferType]}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 overflow-y-auto flex-1">
            {!submitted ? (
              <>
                {/* Intro - Explicit Transfer Challenge Label */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <LightbulbFilament
                      size={20}
                      className="text-amber-600 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-sm text-amber-800 font-medium mb-1">
                        🎯 Transfer Challenge: Apply your knowledge in a new
                        way!
                      </p>
                      <p className="text-sm text-amber-700 mb-2">
                        {challenge.prompt}
                      </p>
                      <p className="text-xs text-amber-600 italic">
                        💡 Why this matters: Real mastery means using skills in
                        new situations, not just repeating what you&apos;ve
                        seen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                  <p className="text-gray-900 font-medium leading-relaxed">
                    {challenge.question}
                  </p>
                </div>

                {/* Hint */}
                {challenge.hint && (
                  <div className="mb-4">
                    {!showHint ? (
                      <button
                        onClick={() => setShowHint(true)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        💡 Need a hint?
                      </button>
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-700">
                          <strong>Hint:</strong> {challenge.hint}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Answer Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer:
                  </label>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Type your answer..."
                    autoFocus
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Check Answer
                  <ArrowRight size={18} weight="bold" />
                </button>

                {/* Bonus XP indicator */}
                <p className="text-center text-sm text-gray-500 mt-3">
                  🌟 +{challenge.bonusXP} bonus XP for transfer mastery!
                </p>
              </>
            ) : (
              /* Feedback */
              <div className="text-center py-4">
                {isCorrect ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <Trophy
                        size={40}
                        weight="fill"
                        className="text-emerald-600"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-2">
                      Transfer Mastery! 🎉
                    </h3>
                    <p className="text-gray-600 mb-4">
                      You successfully applied your knowledge to a new context!
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold mb-6">
                      <Sparkle size={18} weight="fill" />+{challenge.bonusXP} XP
                      Earned!
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                      <Warning
                        size={40}
                        weight="fill"
                        className="text-amber-600"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-600 mb-2">
                      Almost There!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      The correct answer was:{' '}
                      <strong>{challenge.correctAnswer}</strong>
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-bold mb-6">
                      +{Math.floor(challenge.bonusXP * 0.25)} XP for trying!
                    </div>
                  </>
                )}

                {/* Connection Explanation */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left mb-6">
                  <div className="flex items-start gap-2">
                    <LightbulbFilament
                      size={20}
                      className="text-blue-600 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">
                        The Connection:
                      </p>
                      <p className="text-sm text-blue-700">
                        {challenge.connectionExplanation}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  Continue Learning
                  <ArrowRight size={18} weight="bold" />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              💡 Transfer challenges help you apply learning to new situations –
              a key skill for real-world success!
            </p>
          </div>
        </div>
      </div>
    </Portal>
  )
}

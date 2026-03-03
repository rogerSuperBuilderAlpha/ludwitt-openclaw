/* eslint-disable jsx-a11y/no-autofocus */
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Lightning,
  Sparkle,
} from '@phosphor-icons/react'
import { UnifiedModal } from './UnifiedModal'
import { MathProblem, ReadingExercise } from '@/lib/types/basics'
import { useAuth } from '@/components/auth/ClientProvider'
import { logger } from '@/lib/logger'

// Skill-specific tips that rotate during generation
const SKILL_TIPS: Record<string, string[]> = {
  addition: [
    '💡 Tip: When adding large numbers, break them into tens and ones',
    '🎯 Strategy: Use number bonds to make 10s, then add the rest',
    '📊 Remember: Addition is commutative - 5+3 equals 3+5',
    '✨ Quick tip: Count up from the larger number for speed',
    '🧠 Mental math: Round to nearest 10, add, then adjust',
    '🎲 Pattern: Even + Even = Even, Odd + Odd = Even',
    "💪 Practice makes perfect - you're building number sense!",
    '🌟 Pro tip: Double-check by adding in reverse order',
    '📈 Challenge yourself: Can you add without using fingers?',
    "🏆 You're mastering the foundation of all mathematics!",
  ],
  subtraction: [
    "💡 Tip: Think of subtraction as 'what do I add to get there?'",
    '🎯 Strategy: Count up from the smaller number to find the difference',
    '📊 Remember: You can check your work by adding back',
    '✨ Quick tip: Subtract from left to right with regrouping',
    '🧠 Mental math: Round, subtract, then adjust your answer',
    '🎲 Pattern: Subtracting 10 just changes the tens digit',
    '💪 Borrowing is your friend when the top is smaller!',
    '🌟 Pro tip: Draw a number line if you get stuck',
    '📈 Master regrouping and subtraction becomes easy!',
    '🏆 Every mathematician needs strong subtraction skills!',
  ],
  multiplication: [
    '💡 Tip: Multiplication is repeated addition',
    '🎯 Strategy: Know your times tables by heart',
    "📊 Remember: Order doesn't matter - 3×4 = 4×3",
    '✨ Quick tip: Use doubling for even multipliers',
    '🧠 Mental math: Break into smaller chunks (12×6 = 10×6 + 2×6)',
    '🎲 Pattern: Any number × 0 = 0, any number × 1 = itself',
    "💪 Master your 2s, 5s, and 10s first - they're easiest!",
    '🌟 Pro tip: Skip counting is multiplication in action',
    '📈 Arrays and groups help visualize multiplication',
    '🏆 Multiplication unlocks algebra and advanced math!',
  ],
  default: [
    '💡 Take your time - understanding matters more than speed',
    '🎯 Read each question carefully before answering',
    '📊 Show your work - it helps you find mistakes',
    '✨ If stuck, try working backwards from the answer',
    '🧠 Break complex problems into smaller steps',
    '🎲 Use drawings or diagrams to visualize the problem',
    '💪 Mistakes are learning opportunities - embrace them!',
    '🌟 Connect new concepts to what you already know',
    '📈 Practice regularly - consistency builds mastery',
    "🏆 You're building skills that last a lifetime!",
  ],
}

interface SkillChallengeProps {
  skill: any
  isOpen: boolean
  onClose: () => void
  onComplete: (skillId: string, success: boolean) => void
  userId?: string
}

interface ChallengeProblem {
  id: string
  question: string
  correctAnswer?: string
  userAnswer: string
  correct: boolean | null
  timeSpent: number
}

export function SkillChallenge({
  skill,
  isOpen,
  onClose,
  onComplete,
  userId,
}: SkillChallengeProps) {
  const { user } = useAuth()
  const [problems, setProblems] = useState<ChallengeProblem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const [isGenerating, setIsGenerating] = useState(true)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentTip, setCurrentTip] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(30) // seconds
  const [challengeComplete, setChallengeComplete] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  // Rotate tips during generation
  useEffect(() => {
    if (!isGenerating) return

    const skillKey = skill?.id?.split('-')[0] || 'default'
    const tips = SKILL_TIPS[skillKey] || SKILL_TIPS['default']

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 3000) // Change tip every 3 seconds

    return () => clearInterval(tipInterval)
  }, [isGenerating, skill])

  // Countdown estimated time
  useEffect(() => {
    if (!isGenerating || estimatedTime <= 0) return

    const timer = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [isGenerating, estimatedTime])

  // Generate 10 problems when challenge starts
  useEffect(() => {
    if (!isOpen || !skill) {
      setIsGenerating(true)
      setProblems([])
      setCurrentIndex(0)
      setTimeRemaining(300)
      setChallengeComplete(false)
      setGenerationProgress(0)
      setCurrentTip(0)
      setEstimatedTime(30)
      return
    }

    const generateProblems = async () => {
      if (!user) return

      setIsGenerating(true)
      setGenerationProgress(0)
      setEstimatedTime(30) // Reset to 30 seconds estimate

      try {
        const startTime = Date.now()
        const token = await user.getIdToken()

        // Show incremental progress as we generate
        const progressInterval = setInterval(() => {
          setGenerationProgress((prev) => Math.min(90, prev + 5))
        }, 500)

        const response = await fetch('/api/basics/generate-skill-challenge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            skillId: skill.id,
            difficulty: skill.difficulty,
            count: 10,
            topic: skill.name,
          }),
        })

        clearInterval(progressInterval)
        setGenerationProgress(100)

        const result = await response.json()

        if (result.success && result.problems) {
          setProblems(
            result.problems.map((p: any) => ({
              id: p.id,
              question: p.question,
              correctAnswer: p.correctAnswer,
              userAnswer: '',
              correct: null,
              timeSpent: 0,
            }))
          )
        }
      } catch (error) {
        logger.error('SkillChallenge', 'Failed to generate skill challenge', {
          error,
        })
      } finally {
        setTimeout(() => setIsGenerating(false), 500) // Brief delay to show 100%
      }
    }

    generateProblems()
  }, [isOpen, skill, user])

  const completeChallenge = useCallback(() => {
    setChallengeComplete(true)
    const finalScore = problems.filter((p) => p.correct).length
    const success = finalScore >= 7 // Need 70% to pass

    setTimeout(() => {
      onComplete(skill.id, success)
      onClose()
    }, 3000)
  }, [problems, skill.id, onComplete, onClose])

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isGenerating || challengeComplete || timeRemaining <= 0)
      return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          completeChallenge()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [
    isOpen,
    isGenerating,
    challengeComplete,
    timeRemaining,
    completeChallenge,
  ])

  const handleAnswer = (answer: string, correct: boolean) => {
    setProblems((prev) => {
      const updated = [...prev]
      updated[currentIndex].userAnswer = answer
      updated[currentIndex].correct = correct
      return updated
    })

    if (correct) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }))
    }
    setScore((prev) => ({ ...prev, total: prev.total + 1 }))

    // Move to next problem or complete challenge
    if (currentIndex + 1 < problems.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      completeChallenge()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!skill) return null

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${skill.name} Challenge`}
      subtitle={`Complete 10 problems in 5 minutes to earn this skill`}
      icon={<span className="text-2xl">{skill.icon}</span>}
      size="lg"
      position="center"
      closeOnBackdrop={false}
    >
      {isGenerating ? (
        <div className="py-12">
          {/* Progress Indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 b-bg-logic-light px-6 py-3 rounded-full mb-4">
              <Sparkle
                size={20}
                weight="fill"
                className="b-text-logic animate-pulse"
              />
              <span className="font-medium b-text-logic">
                AI Generating Problems
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm b-text-secondary mb-2">
              <span>Generating 10 problems...</span>
              <span>{Math.round(generationProgress)}%</span>
            </div>
            <div className="w-full bg-b-border rounded-full h-3">
              <div
                className="bg-gradient-to-r from-b-logic to-b-latin h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${generationProgress}%` }}
              >
                <div className="absolute inset-0 b-bg-card-30 animate-[shimmer_1s_infinite]"></div>
              </div>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 b-text-secondary">
              <Clock size={16} />
              <span className="text-sm">
                {estimatedTime > 0
                  ? `Estimated time: ${estimatedTime}s`
                  : 'Almost ready...'}
              </span>
            </div>
          </div>

          {/* Rotating Tips */}
          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-b-bg-math-light to-b-bg-logic-light border-2 b-border-math rounded-xl p-6 text-center min-h-[100px] flex items-center justify-center">
              <p
                className="b-text-secondary text-sm leading-relaxed animate-[fadeIn_0.5s_ease-out]"
                key={currentTip}
              >
                {
                  (SKILL_TIPS[skill?.id?.split('-')[0]] ||
                    SKILL_TIPS['default'])[currentTip]
                }
              </p>
            </div>
            <p className="text-xs text-center b-text-muted mt-2">
              💡 Tips refresh every 3 seconds
            </p>
          </div>
        </div>
      ) : challengeComplete ? (
        <div className="text-center py-12">
          <Trophy size={64} className="b-text-writing mx-auto mb-4" />
          <h3 className="text-2xl font-bold b-text-primary mb-2">
            {score.correct >= 7 ? 'Skill Earned!' : 'Keep Practicing!'}
          </h3>
          <p className="b-text-secondary mb-4">
            You got {score.correct} out of {problems.length} correct
            {score.correct >= 7 && ' - Skill unlocked! 🎉'}
          </p>
          <div className="text-sm b-text-muted">Closing in 3 seconds...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>
                Problem {currentIndex + 1} of {problems.length}
              </span>
              <span className="flex items-center gap-2">
                <Clock
                  size={16}
                  className={
                    timeRemaining < 60 ? 'text-b-danger' : 'b-text-secondary'
                  }
                />
                <span
                  className={
                    timeRemaining < 60 ? 'text-b-danger font-bold' : ''
                  }
                >
                  {formatTime(timeRemaining)}
                </span>
              </span>
            </div>
            <div className="w-full bg-b-border rounded-full h-2">
              <div
                className="bg-gradient-to-r from-b-math to-b-logic h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / problems.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold b-text-reading">
                {score.correct}
              </div>
              <div className="text-xs b-text-secondary">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold b-text-latin">
                {score.total - score.correct}
              </div>
              <div className="text-xs b-text-secondary">Wrong</div>
            </div>
          </div>

          {/* Current Problem */}
          {problems[currentIndex] && (
            <div className="b-bg-muted rounded-lg p-6">
              <p className="text-lg b-text-primary font-medium mb-6">
                {problems[currentIndex].question}
              </p>

              <input
                id="skill-challenge-answer"
                type="text"
                placeholder="Your answer..."
                className="w-full px-4 py-3 border-2 b-border rounded-lg focus:ring-2 focus:ring-b-logic focus:border-transparent mb-4"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const answer = (e.target as HTMLInputElement).value
                    const correct =
                      answer.trim().toLowerCase() ===
                      problems[currentIndex].correctAnswer
                        ?.toString()
                        .toLowerCase()
                    handleAnswer(answer, correct)
                    ;(e.target as HTMLInputElement).value = ''
                  }
                }}
                autoFocus
              />

              <button
                onClick={() => {
                  const input = document.getElementById(
                    'skill-challenge-answer'
                  ) as HTMLInputElement
                  if (input && input.value.trim()) {
                    const answer = input.value
                    const correct =
                      answer.trim().toLowerCase() ===
                      problems[currentIndex].correctAnswer
                        ?.toString()
                        .toLowerCase()
                    handleAnswer(answer, correct)
                    input.value = ''
                    input.focus() // Refocus for next problem
                  }
                }}
                className="w-full bg-gradient-to-r from-b-logic-dark to-b-latin-dark text-white py-3 px-6 rounded-lg hover:opacity-90 font-medium transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Submit Answer
              </button>
            </div>
          )}

          {/* Results Preview */}
          <div className="flex flex-wrap gap-2">
            {problems.map((p, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  p.correct === true
                    ? 'b-bg-reading text-white'
                    : p.correct === false
                      ? 'b-bg-latin text-white'
                      : i === currentIndex
                        ? 'b-bg-math text-white'
                        : 'bg-b-border b-text-secondary'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </UnifiedModal>
  )
}

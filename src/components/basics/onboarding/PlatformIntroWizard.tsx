'use client'

import { useState } from 'react'
import {
  Sparkle,
  MathOperations,
  BookOpen,
  Brain,
  Coin,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Scroll,
  Lightning,
  Trophy,
  ChartLineUp,
} from '@phosphor-icons/react'
import { Portal } from '../Portal'

interface PlatformIntroWizardProps {
  onComplete: () => void
  onSkip?: () => void
}

interface Slide {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  content: React.ReactNode
  color: string
}

export function PlatformIntroWizard({
  onComplete,
  onSkip,
}: PlatformIntroWizardProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSkip = () => {
    if (onSkip) {
      onSkip()
    } else {
      onComplete()
    }
  }

  const slides: Slide[] = [
    {
      id: 'welcome',
      title: 'Welcome to Ludwitt',
      subtitle: 'Learn at your own pace',
      icon: <Sparkle size={32} weight="fill" />,
      color: 'var(--b-logic)',
      content: (
        <div className="space-y-6 text-center">
          <p className="b-text-lg b-text-secondary">
            An adaptive learning platform that grows with you. Practice Math,
            Reading, Latin, Greek, and Logic—all in one calm, focused space.
          </p>
          <div className="grid grid-cols-3 gap-4 b-mt-xl">
            <div className="b-bg-muted b-rounded-xl b-p-md">
              <ChartLineUp
                size={28}
                className="b-text-math mx-auto b-mb-sm"
                weight="fill"
              />
              <p className="b-text-sm b-font-medium">Adaptive</p>
              <p className="b-text-xs b-text-secondary">
                Adjusts to your level
              </p>
            </div>
            <div className="b-bg-muted b-rounded-xl b-p-md">
              <Trophy
                size={28}
                className="b-text-reading mx-auto b-mb-sm"
                weight="fill"
              />
              <p className="b-text-sm b-font-medium">Rewarding</p>
              <p className="b-text-xs b-text-secondary">Earn XP & badges</p>
            </div>
            <div className="b-bg-muted b-rounded-xl b-p-md">
              <Lightning
                size={28}
                className="b-text-writing mx-auto b-mb-sm"
                weight="fill"
              />
              <p className="b-text-sm b-font-medium">AI-Powered</p>
              <p className="b-text-xs b-text-secondary">Smart feedback</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'subjects',
      title: 'Five Core Subjects',
      subtitle: 'Build a strong foundation',
      icon: <BookOpen size={32} weight="fill" />,
      color: 'var(--b-reading)',
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 b-bg-math-light b-rounded-xl b-p-md b-border b-border-math">
            <MathOperations
              size={24}
              className="b-text-math-dark flex-shrink-0"
              weight="fill"
            />
            <div>
              <p className="b-font-semibold b-text-math-dark">Mathematics</p>
              <p className="b-text-xs b-text-math-text">
                From basic arithmetic to calculus
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 b-bg-reading-light b-rounded-xl b-p-md b-border b-border-reading">
            <BookOpen
              size={24}
              className="b-text-reading-dark flex-shrink-0"
              weight="fill"
            />
            <div>
              <p className="b-font-semibold b-text-reading-dark">Reading</p>
              <p className="b-text-xs b-text-reading-text">
                Comprehension and critical analysis
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 b-bg-logic-light b-rounded-xl b-p-md b-border b-border-logic">
            <Brain
              size={24}
              className="b-text-logic-dark flex-shrink-0"
              weight="fill"
            />
            <div>
              <p className="b-font-semibold b-text-logic-dark">Logic</p>
              <p className="b-text-xs b-text-logic-text">
                Formal reasoning and problem-solving
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 b-bg-writing-light b-rounded-xl b-p-md b-border b-border-writing">
            <Scroll
              size={24}
              className="b-text-writing-dark flex-shrink-0"
              weight="fill"
            />
            <div>
              <p className="b-font-semibold b-text-writing-dark">Latin</p>
              <p className="b-text-xs b-text-writing-text">
                Classical language and translation
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 b-bg-writing-light b-rounded-xl b-p-md b-border b-border-writing">
            <Scroll
              size={24}
              className="b-text-writing-dark flex-shrink-0"
              weight="fill"
            />
            <div>
              <p className="b-font-semibold b-text-writing-dark">Greek</p>
              <p className="b-text-xs b-text-writing-text">
                Ancient Greek language and texts
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'features',
      title: 'AI-Powered Learning',
      subtitle: 'Get help when you need it',
      icon: <Brain size={32} weight="fill" />,
      color: 'var(--b-logic)',
      content: (
        <div className="space-y-4">
          <p className="b-text-secondary text-center b-mb-lg">
            Our AI tutor provides personalized help at every step.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="b-bg-muted b-rounded-xl b-p-md text-center">
              <div className="w-10 h-10 b-rounded-full b-bg-math-light flex items-center justify-center mx-auto b-mb-sm">
                <Lightning
                  size={20}
                  className="b-text-math-dark"
                  weight="fill"
                />
              </div>
              <p className="b-text-sm b-font-medium">Smart Hints</p>
              <p className="b-text-xs b-text-secondary">
                Nudges without giving away answers
              </p>
            </div>
            <div className="b-bg-muted b-rounded-xl b-p-md text-center">
              <div className="w-10 h-10 b-rounded-full b-bg-reading-light flex items-center justify-center mx-auto b-mb-sm">
                <BookOpen
                  size={20}
                  className="b-text-reading-dark"
                  weight="fill"
                />
              </div>
              <p className="b-text-sm b-font-medium">Explanations</p>
              <p className="b-text-xs b-text-secondary">
                Understand why, not just what
              </p>
            </div>
            <div className="b-bg-muted b-rounded-xl b-p-md text-center">
              <div className="w-10 h-10 b-rounded-full b-bg-logic-light flex items-center justify-center mx-auto b-mb-sm">
                <Brain size={20} className="b-text-logic-dark" weight="fill" />
              </div>
              <p className="b-text-sm b-font-medium">Socratic Tutor</p>
              <p className="b-text-xs b-text-secondary">
                Guided questioning to help you think
              </p>
            </div>
            <div className="b-bg-muted b-rounded-xl b-p-md text-center">
              <div className="w-10 h-10 b-rounded-full b-bg-writing-light flex items-center justify-center mx-auto b-mb-sm">
                <ChartLineUp
                  size={20}
                  className="b-text-writing-dark"
                  weight="fill"
                />
              </div>
              <p className="b-text-sm b-font-medium">Progress Tracking</p>
              <p className="b-text-xs b-text-secondary">
                See your growth over time
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'credits',
      title: 'How Credits Work',
      subtitle: 'Pay only for what you use',
      icon: <Coin size={32} weight="fill" />,
      color: 'var(--b-writing)',
      content: (
        <div className="space-y-5">
          <div className="b-bg-reading-light b-border b-border-reading b-rounded-xl b-p-lg text-center">
            <p className="b-text-lg b-font-bold b-text-reading-dark">
              Practice is Always Free!
            </p>
            <p className="b-text-sm b-text-reading-text b-mt-sm">
              Math problems, reading exercises, translations, and logic practice
              cost nothing.
            </p>
          </div>

          <div className="b-bg-muted b-rounded-xl b-p-lg">
            <p className="b-font-semibold b-text-primary b-mb-md">
              Credits are used for AI features:
            </p>
            <ul className="space-y-2 b-text-sm b-text-secondary">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 b-rounded-full b-bg-math" />
                AI explanations and alternative solutions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 b-rounded-full b-bg-reading" />
                Socratic tutoring conversations
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 b-rounded-full b-bg-logic" />
                Essay grading and feedback
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 b-rounded-full b-bg-writing" />
                Personalized hints and guidance
              </li>
            </ul>
          </div>

          <div className="b-bg-writing-light b-border b-border-writing b-rounded-xl b-p-md">
            <div className="flex items-center gap-3">
              <Coin size={24} className="b-text-writing-dark" weight="fill" />
              <div>
                <p className="b-font-medium b-text-writing-dark">
                  Try AI features with $1 trial credit
                </p>
                <p className="b-text-xs b-text-writing-text">
                  Then add more anytime, starting from $5
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'start',
      title: "Let's Get Started!",
      subtitle: 'Set up your profile',
      icon: <Rocket size={32} weight="fill" />,
      color: 'var(--b-math)',
      content: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 b-rounded-full b-bg-math-light flex items-center justify-center mx-auto">
            <Rocket size={48} className="b-text-math-dark" weight="fill" />
          </div>
          <div>
            <p className="b-text-lg b-text-secondary">
              Next, we&apos;ll help you set up your profile so you can appear on
              the leaderboard and track your progress.
            </p>
          </div>
          <div className="b-bg-muted b-rounded-xl b-p-lg">
            <p className="b-font-semibold b-text-primary b-mb-sm">
              What&apos;s next:
            </p>
            <ol className="space-y-2 b-text-sm b-text-secondary text-left">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 b-rounded-full b-bg-math-light b-text-math-dark flex items-center justify-center b-text-xs b-font-bold flex-shrink-0">
                  1
                </span>
                <span>Choose your avatar and nickname</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 b-rounded-full b-bg-reading-light b-text-reading-dark flex items-center justify-center b-text-xs b-font-bold flex-shrink-0">
                  2
                </span>
                <span>Select your region for the leaderboard</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 b-rounded-full b-bg-logic-light b-text-logic-dark flex items-center justify-center b-text-xs b-font-bold flex-shrink-0">
                  3
                </span>
                <span>Start learning and earning XP!</span>
              </li>
            </ol>
          </div>
        </div>
      ),
    },
  ]

  const currentSlideData = slides[currentSlide]
  const isFirstSlide = currentSlide === 0
  const isLastSlide = currentSlide === slides.length - 1

  const handleNext = () => {
    if (isLastSlide) {
      onComplete()
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstSlide) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          style={{ maxHeight: 'min(90vh, 700px)' }}
        >
          {/* Progress Indicator with Skip */}
          <div className="px-6 pt-6 flex items-center justify-between">
            <div className="w-16" /> {/* Spacer for balance */}
            <div className="flex items-center justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8'
                      : index < currentSlide
                        ? 'w-2 opacity-60'
                        : 'w-2 opacity-30'
                  }`}
                  style={{
                    backgroundColor:
                      index <= currentSlide
                        ? currentSlideData.color
                        : 'var(--b-border-default)',
                  }}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                />
              ))}
            </div>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium w-16 text-right"
            >
              Skip
            </button>
          </div>

          {/* Header */}
          <div className="px-6 pt-6 pb-4 text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{
                backgroundColor: `${currentSlideData.color}20`,
                color: currentSlideData.color,
              }}
            >
              {currentSlideData.icon}
            </div>
            <h2 className="b-text-2xl b-font-bold b-text-primary">
              {currentSlideData.title}
            </h2>
            <p className="b-text-secondary b-mt-sm">
              {currentSlideData.subtitle}
            </p>
          </div>

          {/* Content */}
          <div
            className="px-6 pb-6 overflow-y-auto"
            style={{ maxHeight: 'calc(90vh - 280px)' }}
          >
            {currentSlideData.content}
          </div>

          {/* Footer Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
            {!isFirstSlide ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-xl transition-all font-medium"
              >
                <ArrowLeft size={18} weight="bold" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 text-white rounded-xl hover:opacity-90 transition-all font-bold shadow-lg"
              style={{ backgroundColor: currentSlideData.color }}
            >
              {isLastSlide ? 'Start Learning' : 'Continue'}
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}

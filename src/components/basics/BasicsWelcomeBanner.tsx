'use client'

import {
  MathOperations,
  BookOpen,
  Trophy,
  Sparkle,
  X,
} from '@phosphor-icons/react'

interface BasicsWelcomeBannerProps {
  onDismiss: () => void
}

export function BasicsWelcomeBanner({ onDismiss }: BasicsWelcomeBannerProps) {
  return (
    <div
      className="b-mb-xl b-rounded-xl b-p-lg shadow-sm"
      style={{
        background:
          'linear-gradient(135deg, var(--b-math-light) 0%, var(--b-logic-light) 100%)',
        border: '1px solid var(--b-math-border)',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 b-mb-sm">
            <Sparkle
              size={24}
              weight="fill"
              className="b-text-writing b-animate-pulse"
            />
            <h3 className="b-text-lg b-font-semibold b-text-primary">
              Welcome to Basics
            </h3>
          </div>
          <p className="b-mt-sm b-text-sm b-text-secondary">
            A calm place to build skills. Start with one quick Math problem,
            then try a Reading exercise. Use hints, skip, or Focus anytime.
          </p>
          <ul className="b-mt-md b-text-sm b-text-secondary space-y-2">
            <li className="flex items-center gap-2 transition-transform hover:translate-x-1">
              <MathOperations size={16} weight="bold" className="b-text-math" />
              <span className="b-text-primary">Solve one Math problem</span>
            </li>
            <li className="flex items-center gap-2 transition-transform hover:translate-x-1">
              <BookOpen size={16} weight="bold" className="b-text-reading" />
              <span className="b-text-primary">
                Complete one Reading exercise
              </span>
            </li>
            <li className="flex items-center gap-2 transition-transform hover:translate-x-1">
              <Trophy size={16} weight="bold" className="b-text-writing" />
              <span className="b-text-primary">Earn your first reward</span>
            </li>
          </ul>
          <div className="b-mt-lg flex flex-wrap gap-3">
            <button
              onClick={() => {
                document
                  .querySelector('[data-section="math"]')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="b-btn b-btn-md b-btn-math cursor-pointer"
            >
              <MathOperations size={18} weight="bold" />
              Start with Math
            </button>
            <button
              onClick={onDismiss}
              className="b-btn b-btn-md b-btn-secondary cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="b-text-muted hover:b-text-secondary transition-colors cursor-pointer"
          aria-label="Close welcome banner"
        >
          <X size={20} weight="bold" />
        </button>
      </div>
    </div>
  )
}

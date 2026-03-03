'use client'

/**
 * Mini Game Modal Component
 * Quick math game to play with companions
 */

import { UnifiedModal } from '../UnifiedModal'

interface MiniGameModalProps {
  isOpen: boolean
  onClose: () => void
  question: string
  options: string[]
  onAnswer: (selected: string) => void
}

export function MiniGameModal({
  isOpen,
  onClose,
  question,
  options,
  onAnswer,
}: MiniGameModalProps) {
  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="🎮 Play Time!"
      subtitle="Answer correctly to make your companion happy!"
      size="sm"
    >
      <div className="space-y-4">
        <div
          className="text-center py-6 rounded-xl"
          style={{
            background:
              'linear-gradient(135deg, var(--b-math-light), var(--b-logic-light))',
          }}
        >
          <div className="text-3xl font-bold b-text-primary">{question}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => onAnswer(option)}
              className="py-4 px-6 b-bg-card border-2 b-border rounded-xl font-bold text-xl hover:border-b-logic hover:b-bg-logic-light transition-all active:scale-95"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </UnifiedModal>
  )
}

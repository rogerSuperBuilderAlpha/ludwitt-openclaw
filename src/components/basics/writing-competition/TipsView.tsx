/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { CaretLeft, PenNib } from '@phosphor-icons/react'
import type { FamousAuthor } from './types'

interface TipsViewProps {
  selectedAuthor: FamousAuthor
  aiTips: string | null
  isLoadingAI: boolean
  specificQuestion: string
  setSpecificQuestion: (question: string) => void
  onGetAuthorTips: (author: FamousAuthor) => void
  onBackToPublications: () => void
}

export function TipsView({
  selectedAuthor,
  aiTips,
  isLoadingAI,
  specificQuestion,
  setSpecificQuestion,
  onGetAuthorTips,
  onBackToPublications,
}: TipsViewProps) {
  return (
    <div className="space-y-3">
      <button
        onClick={onBackToPublications}
        className="flex items-center gap-1 b-text-logic hover:b-text-logic-dark transition-colors cursor-pointer b-text-xs"
      >
        <CaretLeft size={14} />
        <span>Back to {selectedAuthor.name}</span>
      </button>

      <div className="b-p-md b-bg-logic-light b-rounded-lg">
        <div className="flex items-center gap-2">
          <PenNib size={18} className="b-text-logic-dark" />
          <h4 className="b-font-bold b-text-logic-dark b-text-sm">
            {selectedAuthor.name}&apos;s Tips
          </h4>
        </div>
      </div>

      <div className="b-p-md b-bg-card b-border b-rounded-lg">
        <p className="b-text-sm b-text-secondary leading-relaxed whitespace-pre-wrap">
          {aiTips}
          {isLoadingAI && (
            <span className="inline-block w-2 h-4 ml-1 b-bg-logic animate-pulse" />
          )}
        </p>
      </div>

      {!isLoadingAI && (
        <div>
          <label className="b-text-xs b-font-medium b-text-primary b-mb-1 block">
            Ask another question
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={specificQuestion}
              onChange={(e) => setSpecificQuestion(e.target.value)}
              placeholder="How do I improve my opening?"
              className="flex-1 b-input b-text-xs py-1.5"
            />
            <button
              onClick={() => onGetAuthorTips(selectedAuthor)}
              disabled={isLoadingAI}
              className="b-btn b-btn-logic b-btn-sm cursor-pointer"
            >
              Ask
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { CaretLeft, CaretRight, CheckCircle } from '@phosphor-icons/react'
import { WRITING_TIPS } from './types'

export function SWRulesMode() {
  const [activeTipIndex, setActiveTipIndex] = useState(0)
  const currentTip = WRITING_TIPS[activeTipIndex]

  return (
    <>
      {/* Tips Navigation */}
      <div className="flex-shrink-0 b-p-md b-border-b overflow-x-auto">
        <div className="flex gap-1">
          {WRITING_TIPS.map((tip, index) => (
            <button
              key={index}
              onClick={() => setActiveTipIndex(index)}
              className={`px-3 py-1.5 b-rounded-lg b-text-xs b-font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTipIndex === index
                  ? 'b-bg-writing b-text-inverse'
                  : 'b-bg-muted b-text-secondary hover:b-text-primary'
              }`}
              style={
                activeTipIndex === index
                  ? { backgroundColor: 'var(--b-writing)' }
                  : {}
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Tip Content */}
      <div className="flex-1 overflow-y-auto b-p-xl">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 b-mb-sm">
              <span className="w-6 h-6 b-rounded-full b-bg-writing b-text-inverse b-text-xs b-font-bold flex items-center justify-center">
                {activeTipIndex + 1}
              </span>
              <h4 className="b-font-bold b-text-primary">{currentTip.title}</h4>
            </div>
            <p className="b-text-secondary leading-relaxed">
              {currentTip.content}
            </p>
          </div>

          <div className="b-p-md b-bg-muted b-rounded-lg">
            <p className="b-text-sm b-text-secondary font-mono">
              {currentTip.example}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between b-mt-xl">
          <button
            onClick={() =>
              setActiveTipIndex((i) =>
                i > 0 ? i - 1 : WRITING_TIPS.length - 1
              )
            }
            className="b-btn b-btn-secondary b-btn-sm cursor-pointer"
          >
            <CaretLeft size={16} />
            Previous
          </button>
          <span className="b-text-sm b-text-muted">
            {activeTipIndex + 1} of {WRITING_TIPS.length}
          </span>
          <button
            onClick={() =>
              setActiveTipIndex((i) =>
                i < WRITING_TIPS.length - 1 ? i + 1 : 0
              )
            }
            className="b-btn b-btn-secondary b-btn-sm cursor-pointer"
          >
            Next
            <CaretRight size={16} />
          </button>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="flex-shrink-0 b-p-lg b-border-t b-bg-muted">
        <h4 className="b-font-semibold b-text-primary b-mb-sm b-text-sm">
          Quick Checklist
        </h4>
        <ul className="space-y-1.5 b-text-xs b-text-secondary">
          <li className="flex items-start gap-2">
            <CheckCircle
              size={14}
              className="b-text-reading flex-shrink-0 mt-0.5"
              weight="fill"
            />
            <span>Cut unnecessary words</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle
              size={14}
              className="b-text-reading flex-shrink-0 mt-0.5"
              weight="fill"
            />
            <span>Use active voice</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle
              size={14}
              className="b-text-reading flex-shrink-0 mt-0.5"
              weight="fill"
            />
            <span>Be specific & concrete</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle
              size={14}
              className="b-text-reading flex-shrink-0 mt-0.5"
              weight="fill"
            />
            <span>Start with a strong topic sentence</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle
              size={14}
              className="b-text-reading flex-shrink-0 mt-0.5"
              weight="fill"
            />
            <span>Revise ruthlessly</span>
          </li>
        </ul>
      </div>
    </>
  )
}

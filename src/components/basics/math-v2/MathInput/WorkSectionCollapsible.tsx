'use client'

import { useState, useEffect } from 'react'
import { Pencil } from '@phosphor-icons/react'
import { InputWithSymbols } from './InputWithSymbols'

interface WorkSectionCollapsibleProps {
  workShown: string
  onWorkChange: (value: string) => void
  isSubmitting: boolean
  workBonusText: string
}

export function WorkSectionCollapsible({
  workShown,
  onWorkChange,
  isSubmitting,
  workBonusText
}: WorkSectionCollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const hasContent = workShown.trim().length > 0

  // Auto-expand if there's existing content
  useEffect(() => {
    if (hasContent) {
      setIsExpanded(true)
    }
  }, [hasContent])

  // One-time nudge to make the work bonus discoverable
  useEffect(() => {
    if (hasContent) return
    if (typeof window === 'undefined') return
    const seen = window.localStorage.getItem('math_work_nudge_seen') === 'true'
    if (seen) return

    setShowNudge(true)
    window.localStorage.setItem('math_work_nudge_seen', 'true')
    const timeoutId = window.setTimeout(() => setShowNudge(false), 6000)
    return () => window.clearTimeout(timeoutId)
  }, [hasContent])

  if (!isExpanded) {
    return (
      <div className="space-y-2">
        {showNudge && (
          <div className="flex items-center justify-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <Pencil size={12} />
            Earn bonus XP by showing your steps
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-dashed transition-colors ${
            showNudge
              ? 'border-amber-400 bg-amber-50 text-amber-700'
              : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50 text-gray-500 hover:text-amber-700'
          }`}
        >
          <Pencil size={16} />
          <span className="text-sm">Show your work</span>
          <span className="text-xs text-amber-600 font-medium">+XP bonus</span>
        </button>
      </div>
    )
  }

  return (
    <div className="border border-amber-200 rounded-lg overflow-hidden bg-amber-50/30">
      <div className="px-3 py-2 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Pencil size={14} className="text-amber-600" />
          <span className="font-medium text-amber-800">Your Work</span>
          <span className="text-xs text-amber-600">{workBonusText}</span>
        </div>
        {!hasContent && (
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Hide
          </button>
        )}
      </div>
      <div className="p-2">
        <InputWithSymbols
          value={workShown}
          onChange={onWorkChange}
          placeholder="Show your step-by-step solution..."
          disabled={isSubmitting}
          multiline
          rows={3}
        />
      </div>
    </div>
  )
}

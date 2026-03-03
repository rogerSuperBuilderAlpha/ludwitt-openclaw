'use client'

import { Coins, Zap } from 'lucide-react'
import {
  formatCentsAsDollars,
  type UsageInfo,
} from '@/lib/utils/explanationCache'

interface CostInfoDisplayProps {
  actualCostCharged: number | null
  newBalance: number | null
  usageInfo: UsageInfo | null
  loadedFromStorage: boolean
}

export function CostInfoDisplay({
  actualCostCharged,
  newBalance,
  usageInfo,
  loadedFromStorage,
}: CostInfoDisplayProps) {
  return (
    <div className="space-y-3 pt-3 border-t b-border">
      {/* Cost and Usage Information */}
      {actualCostCharged !== null && (
        <div className="bg-gradient-to-r from-b-bg-writing-light to-b-bg-writing-light border b-border-writing rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-b-writing" />
              <span className="text-sm font-semibold b-text-writing">
                Compute Cost
              </span>
            </div>
            <span className="text-lg font-bold b-text-writing">
              {formatCentsAsDollars(actualCostCharged)}
            </span>
          </div>

          {usageInfo && (
            <div className="flex items-center gap-4 text-xs b-text-writing pt-2 border-t b-border-writing-50">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>
                  Input: {usageInfo.inputTokens.toLocaleString()} tokens
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>
                  Output: {usageInfo.outputTokens.toLocaleString()} tokens
                </span>
              </div>
            </div>
          )}

          {newBalance !== null && (
            <div className="mt-2 pt-2 border-t b-border-writing-50 text-xs text-b-writing text-center">
              New balance:{' '}
              <span className="font-semibold">
                {formatCentsAsDollars(newBalance)}
              </span>
            </div>
          )}
        </div>
      )}

      {loadedFromStorage && (
        <div className="b-bg-math-light border b-border-math rounded-lg px-3 py-2">
          <p className="text-xs b-text-math text-center">
            This explanation was saved from your previous session
          </p>
        </div>
      )}

      <p className="text-xs b-text-muted text-center">
        This explanation is personalized to help you understand the concept
        better
      </p>
    </div>
  )
}

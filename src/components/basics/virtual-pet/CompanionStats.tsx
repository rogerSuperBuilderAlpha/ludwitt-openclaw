/**
 * CompanionStats - Displays credits balance and evolution rewards information
 * Shows what rewards users get at each level
 */

import { Sparkle } from '@phosphor-icons/react'
import { CompanionStatsProps } from './types'

export function CompanionStats({ userCredits }: CompanionStatsProps) {
  return (
    <>
      {/* Credits Display */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold b-text-primary flex items-center gap-2">
          🐾 Learning Companions
        </h3>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-b-bg-writing-light to-b-bg-writing-light rounded-full border b-border-writing">
          <span className="text-sm">💰</span>
          <span className="font-bold b-text-writing">{userCredits}¢</span>
          <span className="text-xs text-b-writing">credits</span>
        </div>
      </div>

      {/* Evolution Rewards Info */}
      <div className="p-4 bg-gradient-to-r from-b-bg-logic-light to-b-bg-latin-light rounded-xl border b-border-logic">
        <h4 className="font-bold b-text-primary mb-2 flex items-center gap-2">
          <Sparkle size={18} className="text-b-logic" weight="fill" />
          Evolution Rewards
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2 b-bg-card rounded-lg">
            <div className="font-medium b-text-secondary">Level 1</div>
            <div className="text-b-logic">+2 Free Hints</div>
          </div>
          <div className="p-2 b-bg-card rounded-lg">
            <div className="font-medium b-text-secondary">Level 2</div>
            <div className="text-b-logic">+1 AI Explain</div>
          </div>
          <div className="p-2 b-bg-card rounded-lg">
            <div className="font-medium b-text-secondary">Level 3</div>
            <div className="text-b-logic">Streak Shield</div>
          </div>
          <div className="p-2 b-bg-card rounded-lg">
            <div className="font-medium b-text-secondary">Level 4</div>
            <div className="text-b-logic">+3 Hints + Skip</div>
          </div>
          <div className="p-2 b-bg-card rounded-lg">
            <div className="font-medium b-text-secondary">Level 5</div>
            <div className="text-b-logic">∞ Free Hints!</div>
          </div>
        </div>
        <p className="text-xs text-center b-text-muted mt-2">
          🎨 Each evolution is AI-generated and unique to you!
        </p>
      </div>
    </>
  )
}

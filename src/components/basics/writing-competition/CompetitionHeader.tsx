'use client'

import {
  X,
  PencilSimple,
  Trophy,
  Lightbulb,
  CaretRight,
  CaretLeft,
} from '@phosphor-icons/react'

interface CompetitionHeaderProps {
  userGradeLevel: number
  showTips: boolean
  onToggleTips: () => void
  onClose: () => void
  activeTab: 'write' | 'leaderboard'
  onSetActiveTab: (tab: 'write' | 'leaderboard') => void
  totalParticipants: number
}

export function CompetitionHeader({
  userGradeLevel,
  showTips,
  onToggleTips,
  onClose,
  activeTab,
  onSetActiveTab,
  totalParticipants,
}: CompetitionHeaderProps) {
  return (
    <div
      className="flex-shrink-0 b-p-lg"
      style={{
        background:
          'linear-gradient(135deg, var(--b-logic) 0%, var(--b-greek) 100%)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <PencilSimple size={24} weight="bold" className="b-text-inverse" />
          </div>
          <div>
            <h2 className="b-text-xl b-font-bold b-text-inverse">
              Weekly Writing Competition
            </h2>
            <p className="b-text-inverse opacity-80 b-text-sm">
              Grade {userGradeLevel} Division • Win $50 in credits!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTips}
            className={`flex items-center gap-2 px-3 py-2 b-rounded-lg b-font-medium b-text-sm transition-colors ${
              showTips
                ? 'b-bg-card b-text-logic'
                : 'b-text-inverse hover:opacity-90'
            }`}
            style={
              showTips
                ? {
                    backgroundColor: 'var(--b-bg-card)',
                    color: 'var(--b-logic)',
                  }
                : { backgroundColor: 'rgba(255,255,255,0.2)' }
            }
          >
            <Lightbulb size={18} weight={showTips ? 'fill' : 'bold'} />
            <span className="hidden sm:inline">Writing Tips</span>
            {showTips ? <CaretLeft size={14} /> : <CaretRight size={14} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 b-text-inverse opacity-80 hover:opacity-100 b-rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <X size={24} weight="bold" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 b-mt-lg">
        <button
          onClick={() => onSetActiveTab('write')}
          className={`px-4 py-2 b-rounded-lg b-font-medium b-text-sm transition-colors cursor-pointer ${
            activeTab === 'write'
              ? 'b-bg-card b-text-logic'
              : 'b-text-inverse hover:opacity-90'
          }`}
          style={
            activeTab === 'write'
              ? {
                  backgroundColor: 'var(--b-bg-card)',
                  color: 'var(--b-logic-dark)',
                }
              : { backgroundColor: 'rgba(255,255,255,0.2)' }
          }
        >
          <PencilSimple size={16} weight="bold" className="inline mr-2" />
          Write
        </button>
        <button
          onClick={() => onSetActiveTab('leaderboard')}
          className={`px-4 py-2 b-rounded-lg b-font-medium b-text-sm transition-colors cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'b-bg-card b-text-logic'
              : 'b-text-inverse hover:opacity-90'
          }`}
          style={
            activeTab === 'leaderboard'
              ? {
                  backgroundColor: 'var(--b-bg-card)',
                  color: 'var(--b-logic-dark)',
                }
              : { backgroundColor: 'rgba(255,255,255,0.2)' }
          }
        >
          <Trophy size={16} weight="bold" className="inline mr-2" />
          Winners
          {totalParticipants > 0 && (
            <span
              className="ml-2 px-1.5 py-0.5 b-rounded-full b-text-xs"
              style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            >
              {totalParticipants}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

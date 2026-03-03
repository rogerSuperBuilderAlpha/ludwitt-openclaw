'use client'

/**
 * PrerequisiteCheck Component
 *
 * Verifies prerequisite knowledge before advancing to harder concepts.
 * Addresses learning science gap: learners lacking prerequisites fail confusingly.
 *
 * Research: Zone of Proximal Development (Vygotsky) - optimal learning
 * happens when building on existing knowledge.
 *
 * Flow:
 * 1. Before harder concept, check prerequisites
 * 2. Show mastery status for each prerequisite
 * 3. Recommend review if gaps exist
 * 4. Allow skip with acknowledgment
 */

import { useState } from 'react'
import {
  CheckCircle,
  Warning,
  XCircle,
  ArrowRight,
  BookOpen,
  Target,
  Lightning,
  Info,
  Play,
  Clock,
  TrendUp,
} from '@phosphor-icons/react'
import { Portal } from '../Portal'

export interface PrerequisiteSkill {
  skillId: string
  skillName: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  mastery: number // 0-1
  status: 'mastered' | 'proficient' | 'needs_review' | 'not_started'
  lastPracticed?: Date
  recommendedPracticeCount?: number
  /** Direct link to practice this specific skill */
  practiceUrl?: string
  /** Estimated time to reach proficiency (in minutes) */
  estimatedTimeToMastery?: number
  /** Number of problems available for practice */
  availablePracticeProblems?: number
}

export interface PrerequisiteCheckData {
  targetSkillId: string
  targetSkillName: string
  targetDifficulty: string // e.g., "Grade 6", "Hard"
  prerequisites: PrerequisiteSkill[]
  overallReady: boolean
  recommendation: 'proceed' | 'review_recommended' | 'review_required'
}

interface PrerequisiteCheckProps {
  checkData: PrerequisiteCheckData
  isOpen: boolean
  onClose: () => void
  onProceed: () => void
  onReview: (skillId: string) => void
  onReviewAll: () => void
  /** Optional: Navigate directly to a practice session for a skill */
  onStartPractice?: (skillId: string, skillName: string) => void
}

function getMasteryColor(status: PrerequisiteSkill['status']) {
  switch (status) {
    case 'mastered':
      return 'emerald'
    case 'proficient':
      return 'blue'
    case 'needs_review':
      return 'amber'
    case 'not_started':
      return 'red'
  }
}

function getMasteryIcon(status: PrerequisiteSkill['status']) {
  switch (status) {
    case 'mastered':
      return (
        <CheckCircle size={18} weight="fill" className="text-emerald-600" />
      )
    case 'proficient':
      return <CheckCircle size={18} weight="fill" className="text-blue-600" />
    case 'needs_review':
      return <Warning size={18} weight="fill" className="text-amber-600" />
    case 'not_started':
      return <XCircle size={18} weight="fill" className="text-red-600" />
  }
}

function getMasteryLabel(status: PrerequisiteSkill['status']) {
  switch (status) {
    case 'mastered':
      return 'Mastered'
    case 'proficient':
      return 'Proficient'
    case 'needs_review':
      return 'Needs Review'
    case 'not_started':
      return 'Not Started'
  }
}

export function PrerequisiteCheck({
  checkData,
  isOpen,
  onClose,
  onProceed,
  onReview,
  onReviewAll,
  onStartPractice,
}: PrerequisiteCheckProps) {
  const [showSkipWarning, setShowSkipWarning] = useState(false)
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  if (!isOpen) return null

  const needsReview = checkData.prerequisites.filter(
    (p) => p.status === 'needs_review' || p.status === 'not_started'
  )
  const ready = checkData.prerequisites.filter(
    (p) => p.status === 'mastered' || p.status === 'proficient'
  )

  const handleProceed = () => {
    if (checkData.recommendation === 'review_required' && !showSkipWarning) {
      setShowSkipWarning(true)
      return
    }
    onProceed()
    onClose()
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
          style={{ background: '#ffffff' }}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Target size={20} weight="fill" className="text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Prerequisite Check</h2>
                <p className="text-sm text-gray-500">
                  Before learning: {checkData.targetSkillName}
                </p>
              </div>
            </div>

            {/* Target Skill Badge */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    {checkData.targetSkillName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {checkData.targetDifficulty}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    checkData.overallReady
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {checkData.overallReady ? 'Ready!' : 'Review Recommended'}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 overflow-y-auto flex-1">
            {/* Ready Prerequisites */}
            {ready.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Ready ({ready.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {ready.map((prereq) => (
                    <div
                      key={prereq.skillId}
                      className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                    >
                      <div className="flex items-center gap-2">
                        {getMasteryIcon(prereq.status)}
                        <span className="font-medium text-gray-900">
                          {prereq.skillName}
                        </span>
                      </div>
                      <span className="text-sm text-emerald-600 font-medium">
                        {Math.round(prereq.mastery * 100)}% mastery
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Needs Review */}
            {needsReview.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Warning size={16} className="text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Needs Review ({needsReview.length})
                  </span>
                </div>
                <div className="space-y-3">
                  {needsReview.map((prereq) => {
                    const color = getMasteryColor(prereq.status)
                    const isExpanded = expandedSkill === prereq.skillId
                    const estimatedTime =
                      prereq.estimatedTimeToMastery ||
                      Math.ceil((prereq.recommendedPracticeCount || 5) * 2)
                    const availableProblems =
                      prereq.availablePracticeProblems || 10

                    return (
                      <div
                        key={prereq.skillId}
                        className={`rounded-xl border-2 overflow-hidden transition-all ${
                          prereq.status === 'not_started'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-amber-50 border-amber-200'
                        }`}
                      >
                        {/* Header - Clickable to expand */}
                        <button
                          onClick={() =>
                            setExpandedSkill(isExpanded ? null : prereq.skillId)
                          }
                          className="w-full p-3 flex items-center justify-between text-left"
                        >
                          <div className="flex items-center gap-2">
                            {getMasteryIcon(prereq.status)}
                            <div>
                              <span className="font-medium text-gray-900">
                                {prereq.skillName}
                              </span>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock size={10} />~{estimatedTime} min
                                </span>
                                <span>•</span>
                                <span>{availableProblems} problems</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                prereq.status === 'not_started'
                                  ? 'text-red-600'
                                  : 'text-amber-600'
                              }`}
                            >
                              {prereq.status === 'not_started'
                                ? 'Not started'
                                : `${Math.round(prereq.mastery * 100)}%`}
                            </span>
                            <ArrowRight
                              size={16}
                              className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                            />
                          </div>
                        </button>

                        {/* Expanded Content - Practice Options */}
                        {isExpanded && (
                          <div className="px-3 pb-3 space-y-2 border-t border-gray-200/50">
                            {/* Progress Bar to Proficiency */}
                            <div className="pt-3">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-600">
                                  Progress to Proficiency
                                </span>
                                <span className="font-medium text-gray-700">
                                  {Math.round(prereq.mastery * 100)}% → 70%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                                  style={{
                                    width: `${Math.min(100, (prereq.mastery / 0.7) * 100)}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Practice Actions */}
                            <div className="grid grid-cols-2 gap-2 pt-2">
                              {/* Quick Practice - 5 problems */}
                              <button
                                onClick={() => {
                                  if (onStartPractice) {
                                    onStartPractice(
                                      prereq.skillId,
                                      prereq.skillName
                                    )
                                  } else {
                                    onReview(prereq.skillId)
                                  }
                                  onClose()
                                }}
                                className="flex flex-col items-center gap-1 p-3 bg-white hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group"
                              >
                                <Play
                                  size={20}
                                  weight="fill"
                                  className="text-blue-500 group-hover:text-blue-600"
                                />
                                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">
                                  Quick Practice
                                </span>
                                <span className="text-[10px] text-gray-500">
                                  5 problems
                                </span>
                              </button>

                              {/* Full Review - Until proficiency */}
                              <button
                                onClick={() => {
                                  if (onStartPractice) {
                                    onStartPractice(
                                      prereq.skillId,
                                      prereq.skillName
                                    )
                                  } else {
                                    onReview(prereq.skillId)
                                  }
                                  onClose()
                                }}
                                className="flex flex-col items-center gap-1 p-3 bg-white hover:bg-emerald-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group"
                              >
                                <TrendUp
                                  size={20}
                                  weight="fill"
                                  className="text-emerald-500 group-hover:text-emerald-600"
                                />
                                <span className="text-xs font-medium text-gray-700 group-hover:text-emerald-700">
                                  Master It
                                </span>
                                <span className="text-[10px] text-gray-500">
                                  Until 70%+
                                </span>
                              </button>
                            </div>

                            {/* Direct link if available */}
                            {prereq.practiceUrl && (
                              <a
                                href={prereq.practiceUrl}
                                onClick={onClose}
                                className="mt-2 flex items-center justify-center gap-1.5 w-full py-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                <BookOpen size={14} />
                                Open dedicated practice session →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Skip Warning */}
            {showSkipWarning && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Warning
                    size={20}
                    className="text-red-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-red-800 mb-1">
                      Skipping Prerequisites
                    </p>
                    <p className="text-sm text-red-700 mb-3">
                      You may find this concept confusing without mastering the
                      prerequisites. We recommend reviewing first, but you can
                      proceed if you&apos;re confident.
                    </p>
                    <button
                      onClick={() => {
                        onProceed()
                        onClose()
                      }}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      I understand, proceed anyway →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Science Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info
                  size={16}
                  className="text-blue-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-xs text-blue-700">
                  <strong>Why check prerequisites?</strong> Learning builds on
                  prior knowledge. Mastering foundations first leads to better
                  understanding and faster progress.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-2">
            {needsReview.length > 0 && (
              <button
                onClick={() => {
                  onReviewAll()
                  onClose()
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen size={18} weight="fill" />
                Review Prerequisites First
              </button>
            )}

            <button
              onClick={handleProceed}
              className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${
                checkData.overallReady
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {checkData.overallReady ? (
                <>
                  <Lightning size={18} weight="fill" />
                  Continue to {checkData.targetSkillName}
                </>
              ) : (
                <>
                  Skip Review
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}

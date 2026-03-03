'use client'

/**
 * Skill Mastery Trees
 *
 * FUNCTIONALITY:
 * - ✅ Skill unlocking based on REAL prerequisites and user level
 * - ✅ Completion tracking persists via localStorage
 * - ✅ 42 skills across Math and Reading paths
 * - ⚠️ Selecting skill doesn't filter problems to that skill
 * - ⚠️ PARTIAL IMPACT: Shows progression but doesn't guide problem selection
 *
 * USER IMPACT: MEDIUM - Visual progression tracker, limited gameplay integration
 * DATA: REAL progress checking, REAL persistence
 * PLANNED: Filter problems by selected skill, connect to problem generation
 */

import { useState, useMemo } from 'react'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { Trophy, Lock, CheckCircle, Target } from '@phosphor-icons/react'
import { UnifiedModal } from './UnifiedModal'
import { SkillChallenge } from './SkillChallenge'
import { SKILL_TREES } from '@/data/skills'

export interface SkillNode {
  id: string
  name: string
  description: string
  icon: string
  category: 'math' | 'reading' | 'latin' | 'greek' | 'logic' | 'mixed'
  difficulty: number // 1-12 (grade level)
  prerequisites: string[] // IDs of required skills
  xpReward: number
  estimatedTime: number // minutes
  unlocked: boolean
  completed: boolean
  inProgress: boolean
  position: { x: number; y: number } // Position in the tree
  connections: string[] // IDs of skills this connects to
}

export interface SkillTree {
  id: string
  name: string
  description: string
  skills: SkillNode[]
  totalSkills: number
  completedSkills: number
}

interface SkillMasteryTreesProps {
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  onSkillSelect: (skill: SkillNode) => void
  userId?: string
}

export function SkillMasteryTrees({
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  onSkillSelect,
  userId,
}: SkillMasteryTreesProps) {
  const [selectedTree, setSelectedTree] = useState<SkillTree>(SKILL_TREES[0])
  const [showSkillDetails, setShowSkillDetails] = useState<SkillNode | null>(
    null
  )
  const [showSkillChallenge, setShowSkillChallenge] = useState(false)
  const [challengeSkill, setChallengeSkill] = useState<SkillNode | null>(null)
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({})

  // Calculate user's progress and unlock skills
  const updatedTree = useMemo(() => {
    const progress = { ...userProgress }

    // Load saved progress
    const saved = localStorage.getItem(`skill_progress_${userId}`)
    if (saved) {
      Object.assign(progress, JSON.parse(saved))
    }

    // Calculate current level based on progress
    const mathLevel = Math.floor(mathProgress?.currentDifficulty || 1)
    const readingLevel = Math.floor(readingProgress?.currentDifficulty || 1)
    // Estimate Latin, Greek, and Logic levels from XP (100 XP per level)
    const latinLevel = Math.max(1, Math.floor(latinXP / 100) + 1)
    const greekLevel = Math.max(1, Math.floor(greekXP / 100) + 1)
    const logicLevel = Math.max(1, Math.floor(logicXP / 100) + 1)

    const updatedSkills = selectedTree.skills.map((skill) => {
      const isCompleted = progress[skill.id] || false

      // Check if skill should be unlocked based on prerequisites and level
      let shouldUnlock = skill.prerequisites.length === 0 // Root skills
      if (!shouldUnlock) {
        shouldUnlock = skill.prerequisites.every((prereq) => progress[prereq])
      }

      // Also check level requirements
      if (shouldUnlock) {
        if (skill.category === 'math' && skill.difficulty > mathLevel) {
          shouldUnlock = false
        } else if (
          skill.category === 'latin' &&
          skill.difficulty > latinLevel
        ) {
          shouldUnlock = false
        } else if (
          skill.category === 'greek' &&
          skill.difficulty > greekLevel
        ) {
          shouldUnlock = false
        } else if (
          skill.category === 'logic' &&
          skill.difficulty > logicLevel
        ) {
          shouldUnlock = false
        } else if (
          skill.category === 'reading' &&
          skill.difficulty > readingLevel
        ) {
          shouldUnlock = false
        }
      }

      return {
        ...skill,
        unlocked: shouldUnlock || isCompleted,
        completed: isCompleted,
        inProgress: false, // Could track this separately
      }
    })

    // Update tree stats
    const completedSkills = updatedSkills.filter((s) => s.completed).length

    return {
      ...selectedTree,
      skills: updatedSkills,
      completedSkills,
    }
  }, [
    selectedTree,
    mathProgress,
    readingProgress,
    latinXP,
    greekXP,
    logicXP,
    userProgress,
    userId,
  ])

  const handleSkillClick = (skill: SkillNode) => {
    if (!skill.unlocked) return
    setShowSkillDetails(skill)
  }

  const handleSkillStart = (skill: SkillNode) => {
    setShowSkillDetails(null)
    setChallengeSkill(skill)
    setShowSkillChallenge(true)
  }

  const handleChallengeComplete = (skillId: string, success: boolean) => {
    if (success) {
      const newProgress = { ...userProgress, [skillId]: true }
      setUserProgress(newProgress)

      // Save to localStorage
      localStorage.setItem(
        `skill_progress_${userId}`,
        JSON.stringify(newProgress)
      )

      // Show success notification
      const notification = document.createElement('div')
      notification.className =
        'fixed top-4 left-1/2 transform -translate-x-1/2 b-bg-reading text-white px-6 py-3 rounded-lg shadow-lg z-[100] font-medium'
      notification.textContent = `🎉 ${challengeSkill?.name} Skill Earned! +${challengeSkill?.xpReward} XP`
      document.body.appendChild(notification)
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 4000)
    }

    setShowSkillChallenge(false)
    setChallengeSkill(null)
  }

  const getSkillStatusColor = (skill: SkillNode) => {
    if (skill.completed) return 'bg-b-success b-border-reading'
    if (skill.unlocked) return 'b-bg-math b-border-math hover:opacity-90'
    return 'bg-b-border border-b-border-muted'
  }

  const getSkillStatusIcon = (skill: SkillNode) => {
    if (skill.completed) return <CheckCircle size={16} className="text-white" />
    if (skill.unlocked) return <Target size={16} className="text-white" />
    return <Lock size={16} className="b-text-secondary" />
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Trophy size={20} className="b-text-writing" />
        <h4 className="text-lg font-semibold b-text-primary">
          Skill Mastery Trees
        </h4>
      </div>

      {/* Tree Selection */}
      <div className="b-bg-card rounded-lg border b-border p-4">
        <div className="flex gap-2 mb-4">
          {SKILL_TREES.map((tree) => (
            <button
              key={tree.id}
              onClick={() => setSelectedTree(tree)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTree.id === tree.id
                  ? 'b-bg-math-light b-text-math border b-border-math'
                  : 'b-bg-muted b-text-secondary hover:bg-b-border'
              }`}
            >
              {tree.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm b-text-secondary">
          <span>{updatedTree.description}</span>
          <span className="font-medium">
            {updatedTree.completedSkills} / {updatedTree.totalSkills} skills
            completed
          </span>
        </div>
      </div>

      {/* Skill Tree Visualization */}
      <div className="b-bg-card rounded-lg border b-border p-6 relative overflow-hidden">
        <div className="relative" style={{ height: '600px' }}>
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {updatedTree.skills.map((skill) =>
              skill.connections.map((targetId) => {
                const target = updatedTree.skills.find((s) => s.id === targetId)
                if (!target) return null

                const startX = skill.position.x + 32 // Center of node
                const startY = skill.position.y + 32
                const endX = target.position.x + 32
                const endY = target.position.y + 32

                const isUnlocked = skill.unlocked && target.unlocked

                return (
                  <line
                    key={`${skill.id}-${targetId}`}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={
                      isUnlocked
                        ? 'var(--b-math-primary, #3b82f6)'
                        : 'var(--b-border-default, #d1d5db)'
                    }
                    strokeWidth="2"
                    strokeDasharray={isUnlocked ? 'none' : '5,5'}
                    opacity={isUnlocked ? 1 : 0.5}
                  />
                )
              })
            )}
          </svg>

          {/* Skill Nodes */}
          {updatedTree.skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => handleSkillClick(skill)}
              disabled={!skill.unlocked}
              className={`absolute w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${getSkillStatusColor(
                skill
              )} ${skill.unlocked ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}`}
              style={{
                left: skill.position.x,
                top: skill.position.y,
                zIndex: skill.unlocked ? 10 : 5,
              }}
              aria-label={`${skill.name} - ${skill.unlocked ? 'Unlocked' : 'Locked'} - ${skill.completed ? 'Completed' : 'Not completed'}`}
            >
              <span className="text-xl">{skill.icon}</span>
              <div className="absolute -top-1 -right-1">
                {getSkillStatusIcon(skill)}
              </div>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 b-bg-math rounded-full border-2 border-b-math"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 b-bg-reading rounded-full border-2 b-border-reading"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-b-border rounded-full border-2 border-b-border-muted"></div>
            <span>Locked</span>
          </div>
        </div>
      </div>

      {/* Skill Details Modal */}
      <UnifiedModal
        isOpen={!!showSkillDetails}
        onClose={() => setShowSkillDetails(null)}
        title={showSkillDetails?.name || ''}
        subtitle={
          showSkillDetails
            ? `Grade ${showSkillDetails.difficulty} • ${showSkillDetails.category}`
            : ''
        }
        icon={
          showSkillDetails && (
            <span className="text-2xl">{showSkillDetails.icon}</span>
          )
        }
        size="md"
        position="center"
      >
        {showSkillDetails && (
          <>
            {/* Description */}
            <p className="b-text-secondary mb-4">
              {showSkillDetails.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold b-text-writing">
                  {showSkillDetails.xpReward}
                </div>
                <div className="text-sm b-text-secondary">XP Reward</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold b-text-math">
                  {showSkillDetails.estimatedTime}
                </div>
                <div className="text-sm b-text-secondary">Minutes</div>
              </div>
            </div>

            {/* Prerequisites */}
            {showSkillDetails.prerequisites.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium b-text-primary mb-2">
                  Prerequisites:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {showSkillDetails.prerequisites.map((prereqId) => {
                    const prereq = updatedTree.skills.find(
                      (s) => s.id === prereqId
                    )
                    return prereq ? (
                      <span
                        key={prereqId}
                        className="inline-flex items-center gap-1 px-2 py-1 b-bg-muted rounded-full text-xs"
                      >
                        <CheckCircle size={12} className="b-text-reading" />
                        {prereq.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!showSkillDetails.completed ? (
                <button
                  onClick={() => handleSkillStart(showSkillDetails)}
                  className="flex-1 b-bg-math text-white py-3 px-4 rounded-lg hover:b-bg-math transition-colors font-medium"
                >
                  Start Learning
                </button>
              ) : (
                <div className="flex-1 b-bg-reading text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
                  <CheckCircle size={20} />
                  Completed
                </div>
              )}
              <button
                onClick={() => setShowSkillDetails(null)}
                className="px-4 py-3 border b-border rounded-lg hover:b-bg-muted transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </UnifiedModal>

      {/* Skill Challenge Modal */}
      <SkillChallenge
        skill={challengeSkill}
        isOpen={showSkillChallenge}
        onClose={() => setShowSkillChallenge(false)}
        onComplete={handleChallengeComplete}
        userId={userId}
      />
    </div>
  )
}

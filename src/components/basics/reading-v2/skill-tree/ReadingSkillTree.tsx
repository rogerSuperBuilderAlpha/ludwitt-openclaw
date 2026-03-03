/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * Reading Skill Tree Component (Inline)
 *
 * Compact inline version of the skill tree for embedding in the dashboard.
 * Shows current skill progress and immediate learning path.
 */

import { TreeStructure, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import {
  READING_SKILL_TREE,
  getSkillPath,
  getChildSkills,
} from '@/data/basics/reading/skill-tree'
import { ReadingSkillNode } from '@/lib/types/reading-v2'

interface ReadingSkillTreeProps {
  currentSkill: string
  skillMastery: Record<string, number>
  onViewFullTree?: () => void
  compact?: boolean
}

export function ReadingSkillTree({
  currentSkill,
  skillMastery,
  onViewFullTree,
  compact = false,
}: ReadingSkillTreeProps) {
  // Get current skill and its path
  const currentSkillNode = READING_SKILL_TREE.find((s) => s.id === currentSkill)
  const skillPath = getSkillPath(currentSkill)
  const childSkills = getChildSkills(currentSkill)

  // Get next skills to unlock
  const getNextSkills = (): ReadingSkillNode[] => {
    // Find skills where current skill is a prerequisite
    return READING_SKILL_TREE.filter(
      (s) => s.prerequisites.includes(currentSkill) && !skillMastery[s.id] // Not yet started
    ).slice(0, 3)
  }

  const nextSkills = getNextSkills()

  // Get mastery color
  const getMasteryColor = (mastery: number): string => {
    if (mastery >= 0.9) return 'var(--b-reading)'
    if (mastery >= 0.7) return 'var(--b-math)'
    if (mastery >= 0.5) return '#f59e0b'
    return '#6b7280'
  }

  if (compact) {
    // Compact view - just show current skill and progress
    return (
      <div
        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:shadow-md transition-all"
        style={{ backgroundColor: 'var(--b-reading-light)' }}
        onClick={onViewFullTree}
      >
        <TreeStructure size={20} style={{ color: 'var(--b-reading)' }} />
        <div className="flex-1">
          <div className="text-sm font-medium b-text-primary">
            {currentSkillNode?.name || 'Reading Skills'}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(skillMastery[currentSkill] ?? 0) * 100}%`,
                  backgroundColor: getMasteryColor(
                    skillMastery[currentSkill] ?? 0
                  ),
                }}
              />
            </div>
            <span className="text-xs b-text-muted">
              {Math.round((skillMastery[currentSkill] ?? 0) * 100)}%
            </span>
          </div>
        </div>
        <ArrowRight size={16} className="b-text-muted" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border b-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TreeStructure size={20} style={{ color: 'var(--b-reading)' }} />
          <h3 className="font-semibold b-text-primary">Your Learning Path</h3>
        </div>
        {onViewFullTree && (
          <button
            onClick={onViewFullTree}
            className="text-sm underline"
            style={{ color: 'var(--b-reading)' }}
          >
            View Full Tree →
          </button>
        )}
      </div>

      {/* Skill Path Breadcrumb */}
      {skillPath.length > 1 && (
        <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
          {skillPath.map((skill, idx) => {
            const mastery = skillMastery[skill.id] ?? 0
            const isCurrent = skill.id === currentSkill
            return (
              <div key={skill.id} className="flex items-center">
                <div
                  className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                    isCurrent ? 'font-bold' : ''
                  }`}
                  style={{
                    backgroundColor: isCurrent
                      ? 'var(--b-reading)'
                      : `${getMasteryColor(mastery)}20`,
                    color: isCurrent ? 'white' : getMasteryColor(mastery),
                  }}
                >
                  {mastery >= (skill.masteryThreshold || 0.75) && (
                    <CheckCircle
                      size={12}
                      weight="fill"
                      className="inline mr-1"
                    />
                  )}
                  {skill.name}
                </div>
                {idx < skillPath.length - 1 && (
                  <ArrowRight
                    size={14}
                    className="mx-1 b-text-muted flex-shrink-0"
                  />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Current Skill */}
      {currentSkillNode && (
        <div
          className="p-4 rounded-lg mb-4"
          style={{ backgroundColor: 'var(--b-reading-light)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="font-semibold"
              style={{ color: 'var(--b-reading-dark)' }}
            >
              Current: {currentSkillNode.name}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--b-reading)' }}
            >
              {Math.round((skillMastery[currentSkill] ?? 0) * 100)}% →{' '}
              {Math.round(currentSkillNode.masteryThreshold * 100)}%
            </span>
          </div>
          <div className="h-2 bg-white rounded-full">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(skillMastery[currentSkill] ?? 0) * 100}%`,
                backgroundColor: 'var(--b-reading)',
              }}
            />
          </div>
          <p className="text-xs b-text-secondary mt-2">
            {currentSkillNode.description}
          </p>
        </div>
      )}

      {/* Child Skills (if any) */}
      {childSkills.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium b-text-secondary mb-2">
            Subskills:
          </h4>
          <div className="flex flex-wrap gap-2">
            {childSkills.slice(0, 5).map((skill) => {
              const mastery = skillMastery[skill.id] ?? 0
              return (
                <div
                  key={skill.id}
                  className="px-2 py-1 rounded-full text-xs flex items-center gap-1"
                  style={{
                    backgroundColor: `${getMasteryColor(mastery)}20`,
                    color: getMasteryColor(mastery),
                  }}
                >
                  {mastery >= (skill.masteryThreshold || 0.75) && (
                    <CheckCircle size={12} weight="fill" />
                  )}
                  {skill.name}
                </div>
              )
            })}
            {childSkills.length > 5 && (
              <span className="text-xs b-text-muted">
                +{childSkills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Next Skills to Unlock */}
      {nextSkills.length > 0 && (
        <div>
          <h4 className="text-sm font-medium b-text-secondary mb-2">
            Next to unlock:
          </h4>
          <div className="space-y-2">
            {nextSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 p-2 rounded bg-gray-50"
              >
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                <span className="text-sm b-text-muted">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

/**
 * Reading Skill Tree Modal
 *
 * Visual representation of the complete reading skill tree.
 * Shows mastery levels and progress for all 80+ skills.
 */

import { useState } from 'react'
import {
  X,
  TreeStructure,
  MagnifyingGlass,
  CheckCircle,
  Lock,
} from '@phosphor-icons/react'
import {
  READING_SKILL_TREE,
  getSkillsByCategory,
  isSkillUnlocked,
} from '@/data/basics/reading/skill-tree'
import { ReadingSkillNode } from '@/lib/types/reading-v2'
import { SkillNode } from './SkillNode'

interface ReadingSkillTreeModalProps {
  isOpen: boolean
  onClose: () => void
  skillMastery: Record<string, number>
  currentSkill?: string
}

export function ReadingSkillTreeModal({
  isOpen,
  onClose,
  skillMastery,
  currentSkill,
}: ReadingSkillTreeModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'word-recognition' | 'language-comprehension' | 'bridging'
  >('all')
  const [selectedSkill, setSelectedSkill] = useState<ReadingSkillNode | null>(
    null
  )

  if (!isOpen) return null

  const { wordRecognition, languageComprehension, bridging } =
    getSkillsByCategory()

  // Filter skills based on search and category
  const filterSkills = (skills: ReadingSkillNode[]) => {
    return skills.filter((skill) => {
      if (
        searchTerm &&
        !skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }

  const getFilteredSkills = () => {
    switch (selectedCategory) {
      case 'word-recognition':
        return filterSkills(wordRecognition)
      case 'language-comprehension':
        return filterSkills(languageComprehension)
      case 'bridging':
        return filterSkills(bridging)
      default:
        return filterSkills(READING_SKILL_TREE)
    }
  }

  // Get mastery stats
  const getMasteryStats = (skills: ReadingSkillNode[]) => {
    let mastered = 0
    let proficient = 0
    let developing = 0
    let notStarted = 0

    skills.forEach((skill) => {
      const mastery = skillMastery[skill.id] ?? 0
      if (mastery >= skill.masteryThreshold) mastered++
      else if (mastery >= 0.5) proficient++
      else if (mastery > 0) developing++
      else notStarted++
    })

    return {
      mastered,
      proficient,
      developing,
      notStarted,
      total: skills.length,
    }
  }

  const stats = getMasteryStats(getFilteredSkills())

  // Organize skills by parent for tree view
  const getChildSkills = (parentId: string | undefined): ReadingSkillNode[] => {
    return READING_SKILL_TREE.filter((s) => s.parent === parentId)
  }

  // Render skill tree recursively
  const renderSkillBranch = (skill: ReadingSkillNode, depth: number = 0) => {
    const children = getChildSkills(skill.id)
    const mastery = skillMastery[skill.id] ?? 0
    const unlocked = isSkillUnlocked(skill.id, skillMastery)
    const isCurrent = currentSkill === skill.id

    return (
      <div
        key={skill.id}
        className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}
      >
        <SkillNode
          skill={skill}
          mastery={mastery}
          unlocked={unlocked}
          isCurrent={isCurrent}
          onClick={() => setSelectedSkill(skill)}
        />
        {children.length > 0 && (
          <div className="mt-2 space-y-2">
            {children.map((child) => renderSkillBranch(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  // Get root skills for each category
  const getRootSkills = (category: string) => {
    return READING_SKILL_TREE.filter(
      (s) => s.category === category && !s.parent
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        role="button"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClose()
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Reading skill tree"
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{ background: 'var(--b-bg-page)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b b-border">
          <div className="flex items-center gap-3">
            <TreeStructure
              size={24}
              style={{ color: 'var(--b-reading)' }}
              weight="duotone"
            />
            <h2 className="text-xl font-bold b-text-primary">
              Reading Skill Tree
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="b-text-muted" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 px-4 py-3 bg-gray-50 border-b b-border">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} weight="fill" className="text-green-500" />
            <span className="text-sm">
              <strong>{stats.mastered}</strong> Mastered
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm">
              <strong>{stats.proficient}</strong> Proficient
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm">
              <strong>{stats.developing}</strong> Developing
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-gray-400" />
            <span className="text-sm">
              <strong>{stats.notStarted}</strong> Not Started
            </span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4 p-4 border-b b-border">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlass
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 b-text-muted"
            />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border b-border b-input"
            />
          </div>
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Skills', color: 'gray' },
              {
                id: 'word-recognition',
                label: 'Word Recognition',
                color: 'var(--b-math)',
              },
              {
                id: 'language-comprehension',
                label: 'Comprehension',
                color: 'var(--b-reading)',
              },
              { id: 'bridging', label: 'Bridging', color: 'var(--b-writing)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(cat.id as typeof selectedCategory)
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'text-white'
                    : 'bg-gray-100 b-text-secondary'
                }`}
                style={
                  selectedCategory === cat.id
                    ? {
                        backgroundColor:
                          cat.color === 'gray' ? '#374151' : cat.color,
                      }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Skill Tree */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedCategory === 'all' ? (
              <div className="space-y-8">
                {/* Word Recognition */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-math)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-math)' }}
                    />
                    Word Recognition
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('word-recognition').map((skill) =>
                      renderSkillBranch(skill)
                    )}
                  </div>
                </div>

                {/* Language Comprehension */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-reading)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-reading)' }}
                    />
                    Language Comprehension
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('language-comprehension').map((skill) =>
                      renderSkillBranch(skill)
                    )}
                  </div>
                </div>

                {/* Bridging */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-writing)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-writing)' }}
                    />
                    Bridging Processes
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('bridging').map((skill) =>
                      renderSkillBranch(skill)
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {getRootSkills(selectedCategory).map((skill) =>
                  renderSkillBranch(skill)
                )}
              </div>
            )}
          </div>

          {/* Skill Detail Panel */}
          {selectedSkill && (
            <div className="w-80 border-l b-border p-4 overflow-y-auto bg-gray-50">
              <h4 className="font-bold text-lg b-text-primary mb-2">
                {selectedSkill.name}
              </h4>
              <p className="text-sm b-text-secondary mb-4">
                {selectedSkill.description}
              </p>

              <div className="space-y-3">
                {/* Grade Range */}
                <div className="flex justify-between text-sm">
                  <span className="b-text-muted">Grade Range:</span>
                  <span className="font-medium">
                    {selectedSkill.gradeRange[0] === 0
                      ? 'K'
                      : selectedSkill.gradeRange[0]}{' '}
                    - {selectedSkill.gradeRange[1]}
                  </span>
                </div>

                {/* Mastery */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="b-text-muted">Your Mastery:</span>
                    <span className="font-medium">
                      {Math.round((skillMastery[selectedSkill.id] ?? 0) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(skillMastery[selectedSkill.id] ?? 0) * 100}%`,
                        backgroundColor: 'var(--b-reading)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs b-text-muted mt-1">
                    <span>
                      Target: {Math.round(selectedSkill.masteryThreshold * 100)}
                      %
                    </span>
                    <span>
                      {(skillMastery[selectedSkill.id] ?? 0) >=
                      selectedSkill.masteryThreshold
                        ? '✓ Mastered'
                        : 'In Progress'}
                    </span>
                  </div>
                </div>

                {/* Prerequisites */}
                {selectedSkill.prerequisites.length > 0 && (
                  <div>
                    <span className="text-sm b-text-muted block mb-1">
                      Prerequisites:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {selectedSkill.prerequisites.map((prereqId) => {
                        const prereq = READING_SKILL_TREE.find(
                          (s) => s.id === prereqId
                        )
                        const prereqMastered =
                          (skillMastery[prereqId] ?? 0) >=
                          (prereq?.masteryThreshold ?? 0.75)
                        return (
                          <span
                            key={prereqId}
                            className={`px-2 py-0.5 rounded text-xs ${
                              prereqMastered
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {prereq?.name || prereqId}
                            {prereqMastered && ' ✓'}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                Close details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

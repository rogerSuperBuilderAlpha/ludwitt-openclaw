'use client'

/**
 * Math Skill Tree Modal
 *
 * Visual representation of the complete math skill tree.
 * Shows mastery levels and progress for all 40+ skills.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  X,
  TreeStructure,
  MagnifyingGlass,
  CheckCircle,
  Lock,
} from '@phosphor-icons/react'
import {
  MATH_SKILL_TREE,
  getMathSkillsByCategory,
  isMathSkillUnlocked,
  getMathCategoryInfo,
  MathSkillNode as MathSkillNodeType,
} from '@/data/basics/math-v2/skill-tree'
import { MathSkillNode } from './MathSkillNode'

interface MathSkillTreeModalProps {
  isOpen: boolean
  onClose: () => void
  skillMastery: Record<string, number>
  currentSkill?: string
}

type CategoryFilter =
  | 'all'
  | 'arithmetic'
  | 'pre-algebra'
  | 'algebra'
  | 'geometry'
  | 'statistics'
  | 'calculus'

export function MathSkillTreeModal({
  isOpen,
  onClose,
  skillMastery,
  currentSkill,
}: MathSkillTreeModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('all')
  const [selectedSkill, setSelectedSkill] = useState<MathSkillNodeType | null>(
    null
  )

  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Focus trap and keyboard handling
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setTimeout(() => modalRef.current?.focus(), 0)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
          return
        }
        if (e.key !== 'Tab') return

        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements?.length) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        previousFocusRef.current?.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const skillsByCategory = getMathSkillsByCategory()

  // Filter skills based on search and category
  const filterSkills = (skills: MathSkillNodeType[]) => {
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
      case 'arithmetic':
        return filterSkills(skillsByCategory.arithmetic)
      case 'pre-algebra':
        return filterSkills(skillsByCategory.preAlgebra)
      case 'algebra':
        return filterSkills(skillsByCategory.algebra)
      case 'geometry':
        return filterSkills(skillsByCategory.geometry)
      case 'statistics':
        return filterSkills(skillsByCategory.statistics)
      case 'calculus':
        return filterSkills(skillsByCategory.calculus)
      default:
        return filterSkills(MATH_SKILL_TREE)
    }
  }

  // Get mastery stats
  const getMasteryStats = (skills: MathSkillNodeType[]) => {
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

  // Get child skills for tree view
  const getChildSkills = (
    parentId: string | undefined
  ): MathSkillNodeType[] => {
    return MATH_SKILL_TREE.filter((s) => s.parent === parentId)
  }

  // Render skill tree recursively
  const renderSkillBranch = (skill: MathSkillNodeType, depth: number = 0) => {
    const children = getChildSkills(skill.id)
    const mastery = skillMastery[skill.id] ?? 0
    const unlocked = isMathSkillUnlocked(skill.id, skillMastery)
    const isCurrent = currentSkill === skill.id

    return (
      <div
        key={skill.id}
        className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}
      >
        <MathSkillNode
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
    return MATH_SKILL_TREE.filter((s) => s.category === category && !s.parent)
  }

  const categories: { id: CategoryFilter; label: string; color: string }[] = [
    { id: 'all', label: 'All Skills', color: '#374151' },
    { id: 'arithmetic', label: 'Arithmetic', color: 'var(--b-math)' },
    { id: 'pre-algebra', label: 'Pre-Algebra', color: 'var(--b-reading)' },
    { id: 'algebra', label: 'Algebra', color: 'var(--b-writing)' },
    { id: 'geometry', label: 'Geometry', color: 'var(--b-logic)' },
    { id: 'statistics', label: 'Statistics', color: 'var(--b-latin)' },
    { id: 'calculus', label: 'Calculus', color: 'var(--b-greek)' },
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="math-skill-tree-title"
        tabIndex={-1}
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{ background: 'var(--b-bg-page)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b b-border">
          <div className="flex items-center gap-3">
            <TreeStructure
              size={24}
              style={{ color: 'var(--b-math)' }}
              weight="duotone"
            />
            <h2
              id="math-skill-tree-title"
              className="text-xl font-bold b-text-primary"
            >
              Math Skill Tree
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close skill tree"
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
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--b-math)' }}
            />
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
        <div className="flex flex-wrap items-center gap-4 p-4 border-b b-border">
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
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'text-white'
                    : 'bg-gray-100 b-text-secondary hover:bg-gray-200'
                }`}
                style={
                  selectedCategory === cat.id
                    ? { backgroundColor: cat.color }
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
                {/* Arithmetic */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-math)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-math)' }}
                    />
                    Arithmetic (K-5)
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('arithmetic').map((skill) =>
                      renderSkillBranch(skill)
                    )}
                  </div>
                </div>

                {/* Pre-Algebra */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-reading)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-reading)' }}
                    />
                    Pre-Algebra (5-7)
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('pre-algebra').map((skill) =>
                      renderSkillBranch(skill)
                    )}
                  </div>
                </div>

                {/* Algebra */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-writing)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-writing)' }}
                    />
                    Algebra (7-10)
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('algebra').map((skill) =>
                      renderSkillBranch(skill)
                    )}
                  </div>
                </div>

                {/* Geometry */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-logic)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-logic)' }}
                    />
                    Geometry (3-10)
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('geometry').map((skill) =>
                      renderSkillBranch(skill)
                    )}
                  </div>
                </div>

                {/* Statistics */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-latin)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-latin)' }}
                    />
                    Statistics & Probability (5-12)
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('statistics').map((skill) =>
                      renderSkillBranch(skill)
                    )}
                  </div>
                </div>

                {/* Calculus */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--b-greek)' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--b-greek)' }}
                    />
                    Calculus (11-12)
                  </h3>
                  <div className="space-y-3">
                    {getRootSkills('calculus').map((skill) =>
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
                {/* Category */}
                <div className="flex justify-between text-sm">
                  <span className="b-text-muted">Category:</span>
                  <span
                    className="font-medium px-2 py-0.5 rounded-full text-xs text-white"
                    style={{
                      backgroundColor: getMathCategoryInfo(
                        selectedSkill.category
                      ).color,
                    }}
                  >
                    {getMathCategoryInfo(selectedSkill.category).label}
                  </span>
                </div>

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
                        backgroundColor: 'var(--b-math)',
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
                        const prereq = MATH_SKILL_TREE.find(
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

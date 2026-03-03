'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  X,
  Lock,
  Check,
  BookOpen,
  Lightning,
  Star,
  CaretRight,
  MagnifyingGlass,
  LightbulbFilament,
  WarningCircle,
  List,
} from '@phosphor-icons/react'
import { ReferenceUnit, ReferenceSection } from '@/lib/types/basics'
import { MathLatex } from './MathLatex'
import { UnifiedModal } from './UnifiedModal'
import { logger } from '@/lib/logger'

interface StudyPanelProps {
  isOpen: boolean
  onClose: () => void
  currentTopic?: string
  sectionId: string
  units: ReferenceUnit[]
  unlockedUnitIds: string[]
  userXp: number
  onUnlockUnit: (unitId: string, xpCost: number) => Promise<boolean>
}

export function StudyPanel({
  isOpen,
  onClose,
  currentTopic,
  sectionId,
  units,
  unlockedUnitIds,
  userXp,
  onUnlockUnit,
}: StudyPanelProps) {
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0)
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [unlocking, setUnlocking] = useState<string | null>(null)
  const [showMobileNav, setShowMobileNav] = useState(false)

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedUnitIndex(0)
      setSelectedSectionIndex(0)
      setSearchQuery('')
      setShowMobileNav(false)
    }
  }, [isOpen])

  const selectedUnit = units.length > 0 ? units[selectedUnitIndex] : null
  const selectedSection = selectedUnit?.sections[selectedSectionIndex]
  const isUnitUnlocked =
    selectedUnit &&
    (unlockedUnitIds.includes(selectedUnit.id) || selectedUnit.xpCost === 0)
  const canAfford =
    selectedUnit && (selectedUnit.xpCost === 0 || userXp >= selectedUnit.xpCost)

  // Filter units and sections by search
  const filteredUnits = useMemo(() => {
    if (!searchQuery.trim()) return units
    const q = searchQuery.toLowerCase()
    return units.filter(
      (unit) =>
        unit.title.toLowerCase().includes(q) ||
        unit.description.toLowerCase().includes(q) ||
        unit.sections.some((s) => s.title.toLowerCase().includes(q))
    )
  }, [units, searchQuery])

  const handleUnlock = async () => {
    if (!selectedUnit || isUnitUnlocked) return
    if (selectedUnit.xpCost === 0) return // Already free
    if (!canAfford) return

    setUnlocking(selectedUnit.id)
    try {
      await onUnlockUnit(selectedUnit.id, selectedUnit.xpCost)
    } catch (error) {
      logger.error('StudyPanel', 'Unlock error', { error })
    } finally {
      setUnlocking(null)
    }
  }

  const handleSelectUnit = (index: number) => {
    setSelectedUnitIndex(index)
    setSelectedSectionIndex(0)
    setShowMobileNav(false)
  }

  if (!isOpen) return null

  // Show error state if no units available
  if (units.length === 0) {
    return (
      <UnifiedModal
        isOpen={isOpen}
        onClose={onClose}
        title="Study Materials"
        subtitle={`${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} Reference`}
        icon={<BookOpen size={20} weight="duotone" />}
        size="md"
      >
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-b-border mb-4" />
          <h3 className="text-lg font-medium b-text-primary mb-2">
            No study materials available
          </h3>
          <p className="b-text-muted">
            Study materials for this topic are coming soon!
          </p>
        </div>
      </UnifiedModal>
    )
  }

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Study Materials"
      subtitle={`${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} Reference`}
      icon={<BookOpen size={20} weight="duotone" />}
      size="xl"
      noPadding
      footer={
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 b-text-secondary">
            <Lightning size={16} weight="fill" className="text-b-writing" />
            <span>
              Your XP: <strong className="b-text-primary">{userXp}</strong>
            </span>
          </div>
          <div className="b-text-muted">
            {unlockedUnitIds.length} / {units.length} units unlocked
          </div>
        </div>
      }
    >
      <div className="flex h-[70vh]">
        {/* Sidebar Navigation */}
        <div
          className={`w-64 border-r b-border b-bg-muted flex-shrink-0 flex flex-col ${showMobileNav ? 'block' : 'hidden lg:flex'}`}
        >
          {/* Search */}
          <div className="p-3 border-b b-border">
            <div className="relative">
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 b-text-muted"
              />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border b-border rounded-lg focus:outline-none focus:ring-2 focus:ring-b-math focus:border-transparent b-bg-card"
              />
            </div>
          </div>

          {/* Unit List */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-2">
              {filteredUnits.map((unit, unitIdx) => {
                const realIndex = units.findIndex((u) => u.id === unit.id)
                const isActive = realIndex === selectedUnitIndex
                const unlocked =
                  unlockedUnitIds.includes(unit.id) || unit.xpCost === 0

                return (
                  <button
                    key={unit.id}
                    onClick={() => handleSelectUnit(realIndex)}
                    className={`w-full text-left px-3 py-2.5 flex items-center gap-2 transition-colors ${
                      isActive
                        ? 'b-bg-math-light border-l-2 border-b-math'
                        : 'hover:bg-b-border-light border-l-2 border-transparent'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                        unlocked
                          ? 'b-bg-reading-light text-b-reading'
                          : 'bg-b-border b-text-muted'
                      }`}
                    >
                      {unlocked ? (
                        <Check size={12} weight="bold" />
                      ) : (
                        <Lock size={12} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium truncate ${isActive ? 'b-text-math' : 'b-text-secondary'}`}
                      >
                        {unit.title}
                      </p>
                      <p className="text-xs b-text-muted truncate">
                        {unit.sections.length} sections
                      </p>
                    </div>
                    {!unlocked && unit.xpCost > 0 && (
                      <span className="text-xs text-b-writing flex-shrink-0">
                        {unit.xpCost} XP
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile nav toggle */}
          {selectedUnit && (
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border-b b-border text-sm b-text-secondary hover:b-bg-muted"
            >
              <List size={16} />
              <span>{selectedUnit.title}</span>
              <CaretRight
                size={14}
                className={`transition-transform ${showMobileNav ? 'rotate-90' : ''}`}
              />
            </button>
          )}

          {/* Content Area */}
          {!selectedUnit ? (
            <div className="flex-1 flex items-center justify-center p-8 b-text-muted">
              Select a unit from the sidebar
            </div>
          ) : isUnitUnlocked ? (
            <div className="flex flex-1 min-h-0">
              {/* Section Tabs */}
              <div className="w-48 border-r b-border flex-shrink-0 overflow-y-auto hidden md:block">
                <div className="p-3">
                  <p className="text-xs font-semibold b-text-muted uppercase mb-2">
                    Sections
                  </p>
                  {selectedUnit.sections.map((section, idx) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSectionIndex(idx)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${
                        idx === selectedSectionIndex
                          ? 'b-bg-math-light b-text-math font-medium'
                          : 'b-text-secondary hover:b-bg-muted'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Content */}
              <div className="flex-1 overflow-y-auto">
                {selectedSection && (
                  <div className="p-5 max-w-3xl">
                    {/* Section Title */}
                    <h3 className="text-xl font-semibold b-text-primary mb-4">
                      {selectedSection.title}
                    </h3>

                    {/* Mobile section nav */}
                    <div className="md:hidden mb-4">
                      <select
                        value={selectedSectionIndex}
                        onChange={(e) =>
                          setSelectedSectionIndex(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border b-border rounded-lg text-sm"
                      >
                        {selectedUnit.sections.map((section, idx) => (
                          <option key={section.id} value={idx}>
                            {section.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Content */}
                    <div className="prose prose-sm max-w-none b-text-secondary">
                      {selectedSection.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-3 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Key Formulas */}
                    {selectedSection.formulas &&
                      selectedSection.formulas.length > 0 && (
                        <div className="mt-6">
                          <h4 className="flex items-center gap-2 text-sm font-semibold b-text-primary mb-3">
                            <Star
                              size={16}
                              weight="fill"
                              className="b-text-writing"
                            />
                            Key Formulas
                          </h4>
                          <div className="space-y-3">
                            {selectedSection.formulas.map((formula, i) => (
                              <div
                                key={i}
                                className="b-bg-math-light border b-border-math rounded-lg p-4"
                              >
                                <p className="text-sm font-medium b-text-math mb-2">
                                  {formula.name}
                                </p>
                                <div className="b-bg-card rounded-lg p-3 flex justify-center">
                                  <MathLatex
                                    latex={formula.latex}
                                    displayMode
                                  />
                                </div>
                                <p className="text-sm b-text-math mt-2">
                                  {formula.description}
                                </p>
                                {formula.variables &&
                                  Object.keys(formula.variables).length > 0 && (
                                    <div className="mt-2 text-xs b-text-math">
                                      <span className="font-medium">
                                        Where:{' '}
                                      </span>
                                      {Object.entries(formula.variables).map(
                                        ([key, val], i) => (
                                          <span key={key}>
                                            {i > 0 && ', '}
                                            <MathLatex latex={key} /> = {val}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Examples */}
                    {selectedSection.examples &&
                      selectedSection.examples.length > 0 && (
                        <div className="mt-6">
                          <h4 className="flex items-center gap-2 text-sm font-semibold b-text-primary mb-3">
                            <LightbulbFilament
                              size={16}
                              weight="fill"
                              className="b-text-reading"
                            />
                            Worked Examples
                          </h4>
                          <div className="space-y-4">
                            {selectedSection.examples.map((example, i) => (
                              <div
                                key={i}
                                className="b-bg-reading-light border b-border-reading rounded-lg p-4"
                              >
                                <p className="font-medium b-text-reading mb-3">
                                  {example.problem}
                                </p>
                                <div className="space-y-2 pl-4 border-l-2 b-border-reading">
                                  {example.steps.map((step, j) => (
                                    <p
                                      key={j}
                                      className="text-sm b-text-reading"
                                    >
                                      <span className="font-medium b-text-reading mr-2">
                                        Step {j + 1}:
                                      </span>
                                      {step}
                                    </p>
                                  ))}
                                </div>
                                <div className="mt-3 pt-3 border-t b-border-reading">
                                  <p className="b-text-reading">
                                    <span className="font-semibold">
                                      Answer:{' '}
                                    </span>
                                    {example.solution}
                                  </p>
                                  {example.explanation && (
                                    <p className="text-sm b-text-reading mt-1 italic">
                                      {example.explanation}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Tips */}
                    {selectedSection.tips &&
                      selectedSection.tips.length > 0 && (
                        <div className="mt-6 b-bg-logic-light border b-border-logic rounded-lg p-4">
                          <h4 className="flex items-center gap-2 text-sm font-semibold b-text-logic mb-2">
                            <Star
                              size={16}
                              weight="fill"
                              className="b-text-logic"
                            />
                            Tips & Tricks
                          </h4>
                          <ul className="space-y-1">
                            {selectedSection.tips.map((tip, i) => (
                              <li
                                key={i}
                                className="text-sm b-text-logic flex items-start gap-2"
                              >
                                <span className="b-text-logic mt-1">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* Common Mistakes */}
                    {selectedSection.commonMistakes &&
                      selectedSection.commonMistakes.length > 0 && (
                        <div className="mt-6 b-bg-latin-light border b-border-latin rounded-lg p-4">
                          <h4 className="flex items-center gap-2 text-sm font-semibold b-text-latin mb-2">
                            <WarningCircle
                              size={16}
                              weight="fill"
                              className="b-text-latin"
                            />
                            Common Mistakes
                          </h4>
                          <ul className="space-y-1">
                            {selectedSection.commonMistakes.map(
                              (mistake, i) => (
                                <li
                                  key={i}
                                  className="text-sm b-text-latin flex items-start gap-2"
                                >
                                  <span className="b-text-latin mt-1">✗</span>
                                  {mistake}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Navigation between sections */}
                    <div className="flex items-center justify-between mt-8 pt-4 border-t b-border">
                      {selectedSectionIndex > 0 ? (
                        <button
                          onClick={() =>
                            setSelectedSectionIndex(selectedSectionIndex - 1)
                          }
                          className="text-sm b-text-secondary hover:b-text-primary flex items-center gap-1"
                        >
                          ←{' '}
                          {
                            selectedUnit.sections[selectedSectionIndex - 1]
                              .title
                          }
                        </button>
                      ) : (
                        <div />
                      )}
                      {selectedSectionIndex <
                      selectedUnit.sections.length - 1 ? (
                        <button
                          onClick={() =>
                            setSelectedSectionIndex(selectedSectionIndex + 1)
                          }
                          className="text-sm b-text-math hover:b-text-math flex items-center gap-1 font-medium"
                        >
                          {
                            selectedUnit.sections[selectedSectionIndex + 1]
                              .title
                          }{' '}
                          →
                        </button>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Locked Unit View */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 b-bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock size={32} className="b-text-muted" />
                </div>
                <h3 className="text-lg font-semibold b-text-primary mb-2">
                  {selectedUnit.title}
                </h3>
                <p className="b-text-secondary mb-4">
                  {selectedUnit.description}
                </p>
                <p className="text-sm b-text-muted mb-6">
                  {selectedUnit.sections.length} sections •{' '}
                  {selectedUnit.estimatedReadTime || 10} min read
                </p>

                {canAfford ? (
                  <button
                    onClick={handleUnlock}
                    disabled={unlocking === selectedUnit.id}
                    className="inline-flex items-center gap-2 px-6 py-3 b-bg-math text-white rounded-lg hover:opacity-90 transition-colors font-medium disabled:opacity-50"
                  >
                    {unlocking === selectedUnit.id ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Unlocking...
                      </>
                    ) : (
                      <>
                        <Lightning size={18} weight="fill" />
                        Unlock for {selectedUnit.xpCost} XP
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="b-text-writing font-medium mb-2">
                      Need {selectedUnit.xpCost - userXp} more XP
                    </p>
                    <p className="text-sm b-text-muted">
                      Complete more problems to earn XP
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </UnifiedModal>
  )
}

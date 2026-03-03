'use client'

/**
 * Logic Unit Navigation Component
 * Displays unit tabs with completion progress
 */

import {
  Brain,
  BookOpen,
  TreeStructure,
  Function,
  Cube,
  Lightning,
  Check,
  CaretRight,
  CaretLeft,
} from '@phosphor-icons/react'

// Unit icons mapping
const UNIT_ICONS: Record<number, React.ElementType> = {
  1: BookOpen,
  2: Function,
  3: TreeStructure,
  4: Lightning,
  5: Cube,
  6: Check,
  7: TreeStructure,
  8: Brain,
}

interface Unit {
  id: number
  name: string
  shortName: string
}

interface LogicUnitNavProps {
  availableUnits: Unit[]
  selectedUnit: number
  onUnitChange: (unitId: number) => void
  getUnitCompletion: (unitId: number) => number
}

export function LogicUnitNav({
  availableUnits,
  selectedUnit,
  onUnitChange,
  getUnitCompletion,
}: LogicUnitNavProps) {
  return (
    <div
      className="b-p-sm flex items-center gap-1.5 overflow-x-auto b-border-b flex-shrink-0 b-bg-muted"
      style={{ backgroundColor: 'var(--b-bg-muted)' }}
    >
      <button
        onClick={() => selectedUnit > 1 && onUnitChange(selectedUnit - 1)}
        disabled={selectedUnit <= 1}
        className={`b-p-xs b-rounded b-bg-card b-border cursor-pointer ${
          selectedUnit <= 1 ? 'opacity-30 cursor-not-allowed' : ''
        }`}
        style={{ backgroundColor: 'var(--b-bg-card)' }}
      >
        <CaretLeft size={12} weight="bold" />
      </button>

      {availableUnits.slice(0, 12).map((unit) => {
        const completion = getUnitCompletion(unit.id)
        const Icon = UNIT_ICONS[unit.id] || Brain
        const isSelected = selectedUnit === unit.id

        return (
          <button
            key={unit.id}
            onClick={() => onUnitChange(unit.id)}
            className={`b-p-sm b-rounded-md flex items-center gap-1.5 whitespace-nowrap b-font-medium b-text-xs cursor-pointer transition-colors ${
              isSelected
                ? 'b-bg-logic b-text-inverse'
                : 'b-bg-card b-border b-text-secondary hover:b-bg-muted'
            }`}
            style={
              isSelected
                ? { backgroundColor: 'var(--b-logic)', color: 'white' }
                : { backgroundColor: 'var(--b-bg-card)' }
            }
          >
            <Icon size={12} weight="bold" />
            {unit.shortName}
            {completion > 0 && (
              <span
                className={`b-text-xs px-1 py-0.5 b-rounded-full ${
                  completion === 100
                    ? 'b-bg-reading b-text-inverse'
                    : isSelected
                      ? 'b-text-inverse'
                      : 'b-bg-muted b-text-secondary'
                }`}
                style={
                  completion === 100
                    ? { backgroundColor: 'var(--b-reading)', fontSize: '9px' }
                    : isSelected
                      ? {
                          backgroundColor: 'rgba(255,255,255,0.3)',
                          fontSize: '9px',
                        }
                      : { fontSize: '9px' }
                }
              >
                {completion}%
              </span>
            )}
          </button>
        )
      })}

      <button
        onClick={() =>
          selectedUnit < availableUnits.length && onUnitChange(selectedUnit + 1)
        }
        disabled={selectedUnit >= availableUnits.length}
        className={`b-p-xs b-rounded b-bg-card b-border cursor-pointer ${
          selectedUnit >= availableUnits.length
            ? 'opacity-30 cursor-not-allowed'
            : ''
        }`}
        style={{ backgroundColor: 'var(--b-bg-card)' }}
      >
        <CaretRight size={12} weight="bold" />
      </button>
    </div>
  )
}

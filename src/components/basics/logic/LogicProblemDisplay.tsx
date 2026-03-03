'use client'

/**
 * Logic Problem Display Component
 * Shows the problem question, options, and help buttons
 */

import {
  Brain,
  BookOpen,
  TreeStructure,
  Function,
  Cube,
  Lightning,
  Check,
  Lightbulb,
  Star,
  Info,
  SpinnerGap,
} from '@phosphor-icons/react'
import { LogicProblem } from '@/data/basics/logic'

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

interface LogicProblemDisplayProps {
  problem: LogicProblem
  problemIndex: number
  totalProblems: number
  showHint: boolean
  onToggleHint: () => void
  // AI Lesson
  showAILesson: boolean
  aiLesson: string | null
  isLoadingLesson: boolean
  lessonPurchased: boolean
  onPurchaseLesson: () => void
}

export function LogicProblemDisplay({
  problem,
  problemIndex,
  totalProblems,
  showHint,
  onToggleHint,
  showAILesson,
  aiLesson,
  isLoadingLesson,
  lessonPurchased,
  onPurchaseLesson,
}: LogicProblemDisplayProps) {
  const UnitIcon = UNIT_ICONS[problem.unit] || Brain

  return (
    <div
      className="flex-1 b-p-lg overflow-y-auto b-border-r b-bg-muted"
      style={{ backgroundColor: 'var(--b-bg-muted)' }}
    >
      {/* Header */}
      <div className="b-mb-md">
        <div className="flex items-center gap-2 b-mb-sm">
          <UnitIcon size={14} weight="bold" className="b-text-logic" />
          <span className="b-text-xs b-text-logic b-font-medium">
            Unit {problem.unit} • Problem {problemIndex}/{totalProblems}
          </span>
        </div>
        <h2 className="b-text-base b-font-bold b-text-primary b-mb-xs">
          {problem.topic}
        </h2>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={12}
              weight={i <= problem.difficulty ? 'fill' : 'regular'}
              className={
                i <= problem.difficulty ? 'b-text-writing' : 'b-text-muted'
              }
            />
          ))}
        </div>
      </div>

      {/* Description */}
      {problem.description && (
        <div className="b-p-md b-bg-math-light b-rounded-lg b-mb-md flex gap-2 b-border b-border-math">
          <Info size={16} className="b-text-math flex-shrink-0" />
          <p className="m-0 b-text-math-text b-text-xs leading-relaxed">
            {problem.description}
          </p>
        </div>
      )}

      {/* Question */}
      <div
        className="b-bg-card b-rounded-lg b-p-lg b-mb-md b-border-2 b-border-logic"
        style={{
          backgroundColor: 'var(--b-bg-card)',
          borderColor: 'var(--b-logic)',
        }}
      >
        <h3 className="b-text-sm b-font-semibold b-text-primary m-0 leading-relaxed">
          {problem.question}
        </h3>
      </div>

      {/* Options */}
      {problem.options && problem.options.length > 0 && (
        <div className="b-mb-md">
          <p className="b-text-xs b-font-semibold b-text-secondary b-mb-sm">
            Answer Options:
          </p>
          <div className="flex flex-col gap-1">
            {problem.options.map((opt) => (
              <div
                key={opt.label}
                className="b-p-sm b-rounded-md b-bg-muted b-border b-text-sm flex items-start gap-2"
                style={{ backgroundColor: 'var(--b-bg-muted)' }}
              >
                <span
                  className="w-5 h-5 b-rounded-sm b-bg-logic b-text-inverse flex items-center justify-center b-font-bold b-text-xs flex-shrink-0"
                  style={{ backgroundColor: 'var(--b-logic)' }}
                >
                  {opt.label}
                </span>
                <span className="b-text-secondary">{opt.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Symbols */}
      {problem.symbols && problem.symbols.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap b-mb-md">
          <span className="b-text-xs b-text-muted">Symbols:</span>
          {problem.symbols.map((sym, i) => (
            <span
              key={i}
              className="px-2 py-0.5 b-bg-logic-light b-rounded b-text-logic b-text-sm font-mono"
              style={{ backgroundColor: 'var(--b-logic-light)' }}
            >
              {sym}
            </span>
          ))}
        </div>
      )}

      {/* Help Buttons */}
      <div className="flex gap-4 b-mb-sm">
        <button
          onClick={onToggleHint}
          className="flex items-center gap-1.5 b-text-writing b-text-xs b-font-medium bg-transparent border-none cursor-pointer hover:opacity-80"
        >
          <Lightbulb size={14} weight={showHint ? 'fill' : 'regular'} />
          {showHint ? 'Hide hint' : 'Hint (-30% XP)'}
        </button>

        <button
          onClick={onPurchaseLesson}
          disabled={isLoadingLesson || lessonPurchased}
          className={`flex items-center gap-1.5 b-text-xs b-font-medium bg-transparent border-none ${
            isLoadingLesson || lessonPurchased
              ? 'opacity-60'
              : 'cursor-pointer hover:opacity-80'
          } ${lessonPurchased ? 'b-text-reading' : 'b-text-logic'}`}
        >
          <BookOpen size={14} weight={showAILesson ? 'fill' : 'regular'} />
          {isLoadingLesson
            ? 'Loading...'
            : lessonPurchased
              ? 'Lesson Unlocked'
              : 'AI Lesson (2 credits)'}
        </button>
      </div>

      {/* Hint */}
      {showHint && problem.hint && (
        <div className="b-p-md b-bg-writing-light b-rounded-lg b-border b-border-writing b-mb-sm">
          <p className="m-0 b-text-writing-text b-text-xs">{problem.hint}</p>
        </div>
      )}

      {/* AI Lesson */}
      {showAILesson && (
        <div className="b-p-md b-bg-logic-light b-rounded-lg b-border b-border-logic b-mb-md">
          <div className="flex items-center gap-2 b-mb-sm">
            <BookOpen size={16} weight="fill" className="b-text-logic" />
            <span className="b-font-semibold b-text-logic-dark b-text-sm">
              AI Lesson
            </span>
          </div>
          {isLoadingLesson ? (
            <div className="flex items-center gap-2 b-text-muted b-text-xs">
              <SpinnerGap size={14} className="b-animate-spin" />
              Generating personalized lesson...
            </div>
          ) : (
            <div className="b-text-xs b-text-secondary leading-relaxed whitespace-pre-wrap">
              {aiLesson}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

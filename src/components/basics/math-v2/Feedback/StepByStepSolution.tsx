'use client'

/**
 * StepByStepSolution Component
 *
 * Renders a step-by-step solution with:
 * - Step numbers with descriptions
 * - LaTeX rendered via MathLatex component
 * - Expandable/collapsible steps
 * - Visual diagram per step if provided
 */

import { useState } from 'react'
import {
  CaretDown,
  CaretRight,
  Calculator,
  Eye,
  EyeSlash,
} from '@phosphor-icons/react'
import { MathLatex } from '@/components/basics/MathLatex'
import { SolutionStep, DiagramV2 } from '@/lib/types/math-v2'
import { sanitizeSvg } from '@/lib/utils/sanitize'

interface StepByStepSolutionProps {
  /** Array of solution steps */
  steps: SolutionStep[]
  /** Solution method name (optional) */
  method?: string
  /** Alternative solution methods (optional) */
  alternativeMethods?: string[]
  /** Initially expanded state */
  initiallyExpanded?: boolean
  /** Optional custom class name */
  className?: string
}

/** Renders a diagram (simplified SVG or description) */
function StepDiagram({ diagram }: { diagram: DiagramV2 }) {
  // If there's an SVG, render it
  if (diagram.svg) {
    return (
      <div
        className="b-rounded-lg b-p-md b-bg-muted b-mt-sm"
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(diagram.svg) }}
        aria-label={diagram.description}
      />
    )
  }

  // Otherwise show a placeholder with description
  return (
    <div
      className="b-rounded-lg b-p-md b-bg-math-light b-border b-border-math b-mt-sm"
      role="img"
      aria-label={diagram.description}
    >
      <p className="b-text-sm b-text-math-dark text-center italic">
        📐 {diagram.description}
      </p>
    </div>
  )
}

/** Individual step component */
function SolutionStepItem({
  step,
  isExpanded,
  onToggle,
}: {
  step: SolutionStep
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="b-border-b"
      style={{ borderColor: 'var(--b-border-light)' }}
    >
      {/* Step Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 b-p-md text-left transition-colors hover:b-bg-muted"
        aria-expanded={isExpanded}
      >
        {/* Step Number */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center b-font-bold b-text-sm"
          style={{
            background: 'var(--b-math)',
            color: 'white',
          }}
        >
          {step.number}
        </div>

        {/* Description */}
        <div className="flex-1 min-w-0">
          <p className="b-text-sm b-font-medium b-text-primary">
            {step.description}
          </p>
        </div>

        {/* Expand/Collapse Icon */}
        <div className="flex-shrink-0 b-text-muted">
          {isExpanded ? (
            <CaretDown size={18} weight="bold" />
          ) : (
            <CaretRight size={18} weight="bold" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          className="b-px-lg b-pb-md b-animate-slide-down"
          style={{ marginLeft: 'calc(28px + var(--b-space-md))' }}
        >
          {/* LaTeX Math */}
          {step.latex && (
            <div
              className="b-rounded-lg b-p-md b-bg-card b-border"
              style={{ borderColor: 'var(--b-math-border)' }}
            >
              <MathLatex latex={step.latex} displayMode className="text-lg" />
            </div>
          )}

          {/* Expression (if different from latex) */}
          {step.expression && !step.latex && (
            <div
              className="b-rounded-lg b-p-md b-bg-muted"
              style={{ fontFamily: 'var(--b-font-mono)' }}
            >
              <code className="b-text-sm">{step.expression}</code>
            </div>
          )}

          {/* Diagram */}
          {step.diagram && <StepDiagram diagram={step.diagram} />}
        </div>
      )}
    </div>
  )
}

export function StepByStepSolution({
  steps,
  method,
  alternativeMethods,
  initiallyExpanded = false,
  className = '',
}: StepByStepSolutionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(() => {
    // Initially expand first step if section is expanded
    return initiallyExpanded ? new Set([1]) : new Set()
  })

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(stepNumber)) {
        next.delete(stepNumber)
      } else {
        next.add(stepNumber)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpandedSteps(new Set(steps.map((s) => s.number)))
  }

  const collapseAll = () => {
    setExpandedSteps(new Set())
  }

  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <div className={`b-card ${className}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full b-p-lg flex items-center justify-between gap-3 transition-colors hover:b-bg-card-hover"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="b-icon-box b-icon-box-md b-icon-box-math">
            <Calculator size={20} weight="bold" />
          </div>
          <div className="text-left">
            <h3 className="b-font-semibold b-text-primary">
              Step-by-Step Solution
            </h3>
            {method && (
              <p className="b-text-xs b-text-muted">Method: {method}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="b-badge b-badge-math">{steps.length} steps</span>
          <div className="b-text-muted">
            {isExpanded ? (
              <CaretDown size={20} weight="bold" />
            ) : (
              <CaretRight size={20} weight="bold" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="b-animate-slide-down">
          {/* Toolbar */}
          <div
            className="b-px-lg b-py-sm flex items-center justify-between b-border-t b-border-b"
            style={{
              borderColor: 'var(--b-border-light)',
              background: 'var(--b-bg-muted)',
            }}
          >
            <span className="b-text-xs b-text-muted">
              Click each step to see the math
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="b-btn b-btn-xs b-btn-ghost flex items-center gap-1"
              >
                <Eye size={14} />
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="b-btn b-btn-xs b-btn-ghost flex items-center gap-1"
              >
                <EyeSlash size={14} />
                Collapse
              </button>
            </div>
          </div>

          {/* Steps List */}
          <div>
            {steps.map((step) => (
              <SolutionStepItem
                key={step.number}
                step={step}
                isExpanded={expandedSteps.has(step.number)}
                onToggle={() => toggleStep(step.number)}
              />
            ))}
          </div>

          {/* Alternative Methods */}
          {alternativeMethods && alternativeMethods.length > 0 && (
            <div
              className="b-p-md b-bg-muted b-border-t"
              style={{ borderColor: 'var(--b-border-light)' }}
            >
              <p className="b-text-xs b-text-muted">
                <span className="b-font-medium">Other ways to solve:</span>{' '}
                {alternativeMethods.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

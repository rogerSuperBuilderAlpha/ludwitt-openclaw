'use client'

/**
 * VennDiagram Component
 *
 * Renders a two-circle Venn diagram with set labels, per-set "only"
 * values, and an intersection label.  Used for DiagramV2 configs with
 * type === 'venn'.
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { DIAGRAM_COLORS, SVG_CONTAINER_STYLE } from './diagramConstants'

// ============================================================================
// Types
// ============================================================================

interface VennDiagramProps {
  diagram: DiagramV2
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function VennDiagram({ diagram, className = '' }: VennDiagramProps) {
  const width = diagram.width || 400
  const height = diagram.height || 300

  const elements = diagram.elements || []
  const labels = diagram.labels || {}

  // Default two-circle Venn
  const circles = elements.filter(e => e.type === 'circle')

  const cx1 = width * 0.35
  const cx2 = width * 0.65
  const cy = height * 0.45
  const r = Math.min(width * 0.25, height * 0.35)

  // Labels
  const label1 = circles[0]?.label || labels.set1 || 'A'
  const label2 = circles[1]?.label || labels.set2 || 'B'
  const intersection = labels.intersection || ''
  const only1 = labels.only1 || ''
  const only2 = labels.only2 || ''

  return (
    <div
      className={`venn-diagram ${className}`}
      role="img"
      aria-label={diagram.description}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
        style={SVG_CONTAINER_STYLE}
      >
        {/* Circle 1 */}
        <circle
          cx={cx1}
          cy={cy}
          r={r}
          fill="rgba(59, 130, 246, 0.3)"
          stroke={DIAGRAM_COLORS.primary}
          strokeWidth={2}
        />
        {/* Circle 2 */}
        <circle
          cx={cx2}
          cy={cy}
          r={r}
          fill="rgba(16, 185, 129, 0.3)"
          stroke={DIAGRAM_COLORS.secondary}
          strokeWidth={2}
        />

        {/* Labels */}
        <text
          x={cx1 - r * 0.4}
          y={cy}
          fill={DIAGRAM_COLORS.text}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {only1}
        </text>
        <text
          x={cx2 + r * 0.4}
          y={cy}
          fill={DIAGRAM_COLORS.text}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {only2}
        </text>
        <text
          x={width / 2}
          y={cy}
          fill={DIAGRAM_COLORS.accent}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {intersection}
        </text>

        {/* Set labels */}
        <text
          x={cx1}
          y={cy - r - 15}
          fill={DIAGRAM_COLORS.primary}
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
        >
          {label1}
        </text>
        <text
          x={cx2}
          y={cy - r - 15}
          fill={DIAGRAM_COLORS.secondary}
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
        >
          {label2}
        </text>
      </svg>
    </div>
  )
}

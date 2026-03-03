'use client'

/**
 * FractionVisual Component
 *
 * Renders fraction visualizations for math problems including:
 * - Fraction bars (horizontal rectangles divided into parts)
 * - Pie slice visualization (circle divided into parts)
 * - Comparison of two fractions side by side
 * - Equivalent fractions series
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { sanitizeSvg } from '@/lib/utils/sanitize'
import {
  FractionBar,
  FractionPie,
  FractionComparison,
  EquivalentFractions,
} from './FractionComponents'
import {
  COLORS,
  FractionData,
  FractionVisualizationType,
} from './fraction-utils'

// ============================================================================
// Types
// ============================================================================

interface FractionVisualProps {
  diagram: DiagramV2
  className?: string
}

// ============================================================================
// Fraction Visual Parser
// ============================================================================

function parseFractionData(diagram: DiagramV2): {
  type: FractionVisualizationType
  fractions: FractionData[]
  visualStyle: 'bar' | 'pie'
  showComparison: boolean
} {
  const elements = diagram.elements || []
  const labels = diagram.labels || {}

  const fractions: FractionData[] = elements
    .filter(
      (e) => e.props.numerator !== undefined || e.props.value !== undefined
    )
    .map((e) => ({
      numerator:
        Number(e.props.numerator) ||
        Number(String(e.props.value).split('/')[0]) ||
        0,
      denominator:
        Number(e.props.denominator) ||
        Number(String(e.props.value).split('/')[1]) ||
        1,
      label: e.label || '',
      color: String(e.props.fill || ''),
      showLabel: e.props.showLabel !== false,
    }))

  // Fallback: try to parse from labels
  if (fractions.length === 0 && labels.fraction) {
    const parts = labels.fraction.split('/')
    if (parts.length === 2) {
      fractions.push({
        numerator: Number(parts[0]),
        denominator: Number(parts[1]),
      })
    }
  }

  // Determine type and style
  const visualStyle = diagram.type === 'pie-chart' ? 'pie' : 'bar'
  const type: FractionVisualizationType =
    fractions.length > 1 ? 'comparison' : 'bar'
  const showComparison = labels.showComparison !== 'false'

  return { type, fractions, visualStyle, showComparison }
}

// ============================================================================
// Main Component
// ============================================================================

export function FractionVisual({
  diagram,
  className = '',
}: FractionVisualProps) {
  const width = diagram.width || 400
  const height = diagram.height || 200

  // Handle custom SVG
  if (diagram.type === 'custom-svg' && diagram.svg) {
    return (
      <div
        className={`fraction-visual ${className}`}
        role="img"
        aria-label={diagram.description}
      >
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeSvg(diagram.svg) }}
          className="flex justify-center"
        />
      </div>
    )
  }

  const parsed = parseFractionData(diagram)

  return (
    <div
      className={`fraction-visual ${className}`}
      role="img"
      aria-label={diagram.description}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
        style={{
          maxWidth: '100%',
          height: 'auto',
          background: 'var(--b-bg-card, #fffcf5)',
          borderRadius: '8px',
          border: '1px solid var(--b-border-default, rgba(11, 29, 57, 0.10))',
        }}
      >
        <g transform="translate(20, 20)">
          {parsed.type === 'comparison' && parsed.fractions.length >= 2 ? (
            <FractionComparison
              fraction1={parsed.fractions[0]}
              fraction2={parsed.fractions[1]}
              width={width - 40}
              height={height - 40}
              type={parsed.visualStyle}
              showComparison={parsed.showComparison}
            />
          ) : parsed.fractions.length > 2 ? (
            <EquivalentFractions
              fractions={parsed.fractions}
              width={width - 40}
              height={height - 40}
              type={parsed.visualStyle}
            />
          ) : parsed.fractions.length === 1 ? (
            parsed.visualStyle === 'pie' ? (
              <FractionPie
                fraction={parsed.fractions[0]}
                radius={Math.min((width - 80) / 2, (height - 80) / 2)}
                cx={(width - 40) / 2}
                cy={(height - 80) / 2}
              />
            ) : (
              <FractionBar
                fraction={parsed.fractions[0]}
                width={width - 80}
                height={50}
                x={20}
                y={(height - 100) / 2}
              />
            )
          ) : (
            <text
              x={(width - 40) / 2}
              y={(height - 40) / 2}
              fill={COLORS.textMuted}
              fontSize={14}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              No fraction data provided
            </text>
          )}
        </g>
      </svg>
    </div>
  )
}

// ============================================================================
// Re-exports for backwards compatibility
// ============================================================================

export {
  FractionBar,
  FractionPie,
  FractionComparison,
  EquivalentFractions,
} from './FractionComponents'
export { FractionTemplates } from './FractionTemplates'
export type { FractionData, FractionComparisonData } from './fraction-utils'

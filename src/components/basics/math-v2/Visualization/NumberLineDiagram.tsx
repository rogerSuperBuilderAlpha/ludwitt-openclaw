'use client'

/**
 * NumberLineDiagram Component
 *
 * Renders an inline-SVG number line with tick marks, labels, and marked
 * points.  This is the DiagramV2-based number line (as opposed to the
 * Mafs-powered NumberLine.tsx which has a different prop contract).
 */

import { DiagramV2 } from '@/lib/types/math-v2'
import { DIAGRAM_COLORS, SVG_CONTAINER_STYLE } from './diagramConstants'

// ============================================================================
// Types
// ============================================================================

interface NumberLineDiagramProps {
  diagram: DiagramV2
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function NumberLineDiagram({ diagram, className = '' }: NumberLineDiagramProps) {
  const width = diagram.width || 400
  const height = diagram.height || 100
  const padding = 40

  // Extract number line config from elements or labels
  const elements = diagram.elements || []
  const labels = diagram.labels || {}

  const min = Number(labels.min) || 0
  const max = Number(labels.max) || 10
  const step = Number(labels.step) || 1
  const range = max - min
  const scale = (width - padding * 2) / range

  // Points to mark
  const points = elements
    .filter(e => e.type === 'point')
    .map(e => ({
      value: Number(e.props.value) || Number(e.props.x) || 0,
      label: e.label || '',
      color: String(e.props.fill || DIAGRAM_COLORS.error),
    }))

  // Calculate position from value
  const getX = (value: number) => padding + (value - min) * scale

  return (
    <div
      className={`number-line ${className}`}
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
        {/* Main line */}
        <line
          x1={padding - 10}
          y1={height / 2}
          x2={width - padding + 10}
          y2={height / 2}
          stroke={DIAGRAM_COLORS.axis}
          strokeWidth={2}
        />

        {/* Arrows at ends */}
        <polygon
          points={`${width - padding + 10},${height / 2} ${width - padding},${height / 2 - 5} ${width - padding},${height / 2 + 5}`}
          fill={DIAGRAM_COLORS.axis}
        />
        <polygon
          points={`${padding - 10},${height / 2} ${padding},${height / 2 - 5} ${padding},${height / 2 + 5}`}
          fill={DIAGRAM_COLORS.axis}
        />

        {/* Tick marks and labels */}
        {Array.from({ length: Math.floor(range / step) + 1 }).map((_, i) => {
          const value = min + i * step
          const x = getX(value)
          const isMajor = value % (step * 2) === 0 || step >= 1

          return (
            <g key={`tick-${i}`}>
              <line
                x1={x}
                y1={height / 2 - (isMajor ? 8 : 5)}
                x2={x}
                y2={height / 2 + (isMajor ? 8 : 5)}
                stroke={DIAGRAM_COLORS.axis}
                strokeWidth={isMajor ? 2 : 1}
              />
              <text
                x={x}
                y={height / 2 + 22}
                fill={DIAGRAM_COLORS.textMuted}
                fontSize={12}
                textAnchor="middle"
              >
                {Number.isInteger(value) ? value : value.toFixed(1)}
              </text>
            </g>
          )
        })}

        {/* Marked points */}
        {points.map((point, i) => (
          <g key={`point-${i}`}>
            <circle
              cx={getX(point.value)}
              cy={height / 2}
              r={6}
              fill={point.color}
            />
            {point.label && (
              <text
                x={getX(point.value)}
                y={height / 2 - 15}
                fill={point.color}
                fontSize={12}
                fontWeight="bold"
                textAnchor="middle"
              >
                {point.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

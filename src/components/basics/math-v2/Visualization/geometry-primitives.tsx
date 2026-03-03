'use client'

/**
 * Geometry Primitive Components
 * 
 * Reusable SVG components for rendering geometry diagrams.
 * Extracted from GeometryDiagram.tsx for better maintainability.
 */

import React from 'react'
import { polarToCartesian, GEOMETRY_COLORS as COLORS } from './geometry-utils'

// ============================================================================
// Grid Background
// ============================================================================

interface GridBackgroundProps {
  width: number
  height: number
  spacing?: number
}

export function GridBackground({ width, height, spacing = 20 }: GridBackgroundProps) {
  const lines: React.ReactNode[] = []

  for (let x = 0; x <= width; x += spacing) {
    const isCenter = Math.abs(x - width / 2) < spacing / 2
    lines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={isCenter ? COLORS.gridStrong : COLORS.grid}
        strokeWidth={isCenter ? 1 : 0.5}
      />
    )
  }

  for (let y = 0; y <= height; y += spacing) {
    const isCenter = Math.abs(y - height / 2) < spacing / 2
    lines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke={isCenter ? COLORS.gridStrong : COLORS.grid}
        strokeWidth={isCenter ? 1 : 0.5}
      />
    )
  }

  return <g className="grid-background">{lines}</g>
}

// ============================================================================
// Right Angle Marker
// ============================================================================

interface RightAngleMarkerProps {
  x: number
  y: number
  size?: number
  angle?: number
  stroke?: string
}

export function RightAngleMarker({ 
  x, 
  y, 
  size = 12, 
  angle = 0,
  stroke = COLORS.text 
}: RightAngleMarkerProps) {
  const rad = angle * Math.PI / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)

  const points = [
    { x: x + size * cos, y: y + size * sin },
    { x: x + size * cos - size * sin, y: y + size * sin + size * cos },
    { x: x - size * sin, y: y + size * cos },
  ]

  return (
    <g className="right-angle-marker">
      <line x1={x} y1={y} x2={points[0].x} y2={points[0].y} stroke={stroke} strokeWidth={1.5} />
      <line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} stroke={stroke} strokeWidth={1.5} />
      <line x1={points[1].x} y1={points[1].y} x2={points[2].x} y2={points[2].y} stroke={stroke} strokeWidth={1.5} />
      <line x1={points[2].x} y1={points[2].y} x2={x} y2={y} stroke={stroke} strokeWidth={1.5} />
    </g>
  )
}

// ============================================================================
// Angle Arc
// ============================================================================

interface AngleArcProps {
  cx: number
  cy: number
  radius?: number
  startAngle: number
  endAngle: number
  label?: string
  stroke?: string
  showDegree?: boolean
}

export function AngleArc({
  cx,
  cy,
  radius = 25,
  startAngle,
  endAngle,
  label,
  stroke = COLORS.error,
  showDegree = true,
}: AngleArcProps) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
  const sweep = endAngle > startAngle ? 0 : 1

  const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`

  const midAngle = (startAngle + endAngle) / 2
  const labelPos = polarToCartesian(cx, cy, radius * 1.4, midAngle)
  const angleDegrees = Math.abs(endAngle - startAngle)

  return (
    <g className="angle-arc">
      <path d={d} stroke={stroke} strokeWidth={2} fill="none" />
      {showDegree && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fill={stroke}
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label || `${Math.round(angleDegrees)}°`}
        </text>
      )}
    </g>
  )
}

// ============================================================================
// Measurement Annotation
// ============================================================================

interface MeasurementAnnotationProps {
  x1: number
  y1: number
  x2: number
  y2: number
  label: string
  offset?: number
  color?: string
  showArrows?: boolean
  fontSize?: number
}

export function MeasurementAnnotation({
  x1,
  y1,
  x2,
  y2,
  label,
  offset = 15,
  color = COLORS.accent,
  showArrows = true,
  fontSize = 14,
}: MeasurementAnnotationProps) {
  // Calculate perpendicular offset
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.sqrt(dx * dx + dy * dy)
  const nx = -dy / length * offset
  const ny = dx / length * offset

  const ox1 = x1 + nx
  const oy1 = y1 + ny
  const ox2 = x2 + nx
  const oy2 = y2 + ny

  const mx = (ox1 + ox2) / 2
  const my = (oy1 + oy2) / 2

  const arrowSize = 6
  const angle = Math.atan2(dy, dx)

  return (
    <g className="measurement-annotation">
      {/* Main line */}
      <line
        x1={ox1}
        y1={oy1}
        x2={ox2}
        y2={oy2}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="4,2"
      />
      
      {/* Arrow heads */}
      {showArrows && (
        <>
          <polygon
            points={`
              ${ox1},${oy1}
              ${ox1 + arrowSize * Math.cos(angle - Math.PI / 6)},${oy1 + arrowSize * Math.sin(angle - Math.PI / 6)}
              ${ox1 + arrowSize * Math.cos(angle + Math.PI / 6)},${oy1 + arrowSize * Math.sin(angle + Math.PI / 6)}
            `}
            fill={color}
          />
          <polygon
            points={`
              ${ox2},${oy2}
              ${ox2 - arrowSize * Math.cos(angle - Math.PI / 6)},${oy2 - arrowSize * Math.sin(angle - Math.PI / 6)}
              ${ox2 - arrowSize * Math.cos(angle + Math.PI / 6)},${oy2 - arrowSize * Math.sin(angle + Math.PI / 6)}
            `}
            fill={color}
          />
        </>
      )}

      {/* Label with background */}
      <rect
        x={mx - (label.length * fontSize * 0.35)}
        y={my - fontSize * 0.7}
        width={label.length * fontSize * 0.7}
        height={fontSize * 1.4}
        fill="white"
        rx={3}
      />
      <text
        x={mx}
        y={my}
        fill={color}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {label}
      </text>
    </g>
  )
}

// ============================================================================
// Point Label
// ============================================================================

interface PointLabelProps {
  x: number
  y: number
  label: string
  offset?: { x: number; y: number }
  color?: string
  fontSize?: number
}

export function PointLabel({
  x,
  y,
  label,
  offset = { x: 8, y: -8 },
  color = COLORS.text,
  fontSize = 14,
}: PointLabelProps) {
  return (
    <g className="point-label">
      <circle cx={x} cy={y} r={3} fill={color} />
      <text
        x={x + offset.x}
        y={y + offset.y}
        fill={color}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {label}
      </text>
    </g>
  )
}

// Re-export colors for consumers
export { GEOMETRY_COLORS as COLORS } from './geometry-utils'

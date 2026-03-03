'use client'

import { useMemo } from 'react'
import { Mafs, Coordinates, Point, Text, Line } from 'mafs'
import 'mafs/core.css'

// =============================================================================
// Types
// =============================================================================

export interface PlotPoint {
  /** X coordinate */
  x: number
  /** Y coordinate */
  y: number
  /** Optional label for the point */
  label?: string
  /** Point color (CSS color or design token name like "math", "reading") */
  color?: string
  /** Point size (Mafs uses abstract units, default ~0.15) */
  size?: number
  /** Whether to show coordinate label like "(2, 3)" */
  showCoordinates?: boolean
}

export interface CoordinatePlaneProps {
  /** Points to plot on the coordinate plane */
  points?: PlotPoint[]
  /** X-axis domain [min, max], default [-10, 10] */
  domain?: [number, number]
  /** Y-axis range [min, max], default [-10, 10] */
  range?: [number, number]
  /** Show grid lines, default true */
  showGrid?: boolean
  /** Grid line spacing, default 1 */
  gridSpacing?: number
  /** Height of the component in pixels */
  height?: number
  /** Width of the component (CSS value) */
  width?: number | string
  /** Optional className for container */
  className?: string
  /** Show axis labels (numbers), default true */
  showAxisLabels?: boolean
  /** X-axis label */
  xLabel?: string
  /** Y-axis label */
  yLabel?: string
  /** Optional line segments to draw */
  lines?: {
    from: [number, number]
    to: [number, number]
    color?: string
    weight?: number
  }[]
  /** Interactive mode - allows panning */
  interactive?: boolean
}

// =============================================================================
// Helpers
// =============================================================================

function getColor(color?: string, defaultColor = 'var(--b-math)'): string {
  if (!color) return defaultColor
  if (
    color.startsWith('#') ||
    color.startsWith('rgb') ||
    color.startsWith('hsl') ||
    color.startsWith('var(')
  ) {
    return color
  }
  // Assume it's a design token name
  return `var(--b-${color}, ${color})`
}

function getDefaultColor(index: number): string {
  const colors = [
    'var(--b-math)', // Blue
    'var(--b-reading)', // Green
    'var(--b-logic)', // Purple
    'var(--b-writing)', // Amber
    'var(--b-latin)', // Red
    'var(--b-greek)', // Indigo
  ]
  return colors[index % colors.length]
}

// =============================================================================
// Sub-components
// =============================================================================

interface PlottedPointProps {
  point: PlotPoint
  index: number
}

function PlottedPoint({ point, index }: PlottedPointProps) {
  const color = getColor(point.color, getDefaultColor(index))

  // Build the label text
  let labelText = point.label ?? ''
  if (point.showCoordinates) {
    const coordText = `(${point.x}, ${point.y})`
    labelText = labelText ? `${labelText} ${coordText}` : coordText
  }

  return (
    <>
      <Point x={point.x} y={point.y} color={color} />
      {labelText && (
        <Text
          x={point.x + 0.3}
          y={point.y + 0.3}
          attach="w"
          size={13}
          color={color}
        >
          {labelText}
        </Text>
      )}
    </>
  )
}

// =============================================================================
// Main Component
// =============================================================================

/**
 * CoordinatePlane - Interactive coordinate plane for plotting points
 *
 * Features:
 * - Labeled axes with configurable grid
 * - Point markers with optional labels
 * - Support for coordinate labels like (2, 3)
 * - Optional line segments
 * - Clean educational styling
 */
export function CoordinatePlane({
  points = [],
  domain = [-10, 10],
  range = [-10, 10],
  showGrid = true,
  gridSpacing = 1,
  height = 300,
  width,
  className = '',
  showAxisLabels = true,
  xLabel,
  yLabel,
  lines = [],
  interactive = false,
}: CoordinatePlaneProps) {
  const viewBox = useMemo(
    () => ({
      x: domain as [number, number],
      y: range as [number, number],
    }),
    [domain, range]
  )

  return (
    <div
      className={`b-card b-rounded-lg overflow-hidden ${className}`}
      style={{
        width: width ?? '100%',
        height,
        background: 'var(--b-bg-elevated)',
      }}
    >
      <Mafs viewBox={viewBox} preserveAspectRatio={false} pan={interactive}>
        {/* Coordinate grid */}
        {showGrid && (
          <Coordinates.Cartesian
            xAxis={{
              lines: gridSpacing,
              labels: showAxisLabels
                ? (n) => (Number.isInteger(n) ? n.toString() : '')
                : () => '',
            }}
            yAxis={{
              lines: gridSpacing,
              labels: showAxisLabels
                ? (n) => (Number.isInteger(n) ? n.toString() : '')
                : () => '',
            }}
          />
        )}

        {/* Axis labels */}
        {xLabel && (
          <Text
            x={domain[1] - 0.5}
            y={-0.8}
            attach="e"
            size={14}
            color="var(--b-text-secondary)"
          >
            {xLabel}
          </Text>
        )}
        {yLabel && (
          <Text
            x={0.4}
            y={range[1] - 0.5}
            attach="s"
            size={14}
            color="var(--b-text-secondary)"
          >
            {yLabel}
          </Text>
        )}

        {/* Line segments */}
        {lines.map((line, index) => (
          <Line.Segment
            key={`line-${index}`}
            point1={[line.from[0], line.from[1]]}
            point2={[line.to[0], line.to[1]]}
            color={getColor(line.color, 'var(--b-text-secondary)')}
            weight={line.weight ?? 2}
          />
        ))}

        {/* Plot points */}
        {points.map((point, index) => (
          <PlottedPoint
            key={`point-${point.x}-${point.y}-${index}`}
            point={point}
            index={index}
          />
        ))}
      </Mafs>
    </div>
  )
}

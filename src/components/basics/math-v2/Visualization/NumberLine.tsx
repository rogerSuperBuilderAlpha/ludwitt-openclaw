'use client'

import { useMemo } from 'react'
import { Mafs, Line, Point, Text, Polygon } from 'mafs'
import 'mafs/core.css'

// =============================================================================
// Types
// =============================================================================

export interface NumberLinePoint {
  /** Position on the number line */
  value: number
  /** Optional label */
  label?: string
  /** Point color */
  color?: string
  /** Whether to show the value as label */
  showValue?: boolean
  /** Whether the point is filled (closed) or hollow (open) */
  filled?: boolean
}

export interface InequalityRegion {
  /** Type of inequality */
  type: '<' | '>' | '<=' | '>=' | 'between'
  /** The boundary value(s) */
  value: number
  /** Second value for 'between' type */
  endValue?: number
  /** Region color */
  color?: string
  /** Opacity of the shading (0-1) */
  opacity?: number
}

export interface RangeHighlight {
  /** Start of the range */
  start: number
  /** End of the range */
  end: number
  /** Color of the highlight */
  color?: string
  /** Opacity (0-1) */
  opacity?: number
  /** Optional label for the range */
  label?: string
}

export interface NumberLineProps {
  /** Domain of the number line [min, max] */
  domain?: [number, number]
  /** Points to mark on the number line */
  points?: NumberLinePoint[]
  /** Inequality region to shade */
  inequality?: InequalityRegion
  /** Range highlights */
  highlights?: RangeHighlight[]
  /** Show tick marks, default true */
  showTicks?: boolean
  /** Tick interval, default 1 */
  tickInterval?: number
  /** Show tick labels, default true */
  showLabels?: boolean
  /** Height of the component */
  height?: number
  /** Width of the component */
  width?: number | string
  /** Optional className */
  className?: string
  /** Title/label for the number line */
  title?: string
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
  return `var(--b-${color}, ${color})`
}

// =============================================================================
// Sub-components
// =============================================================================

interface TicksProps {
  domain: [number, number]
  interval: number
  showLabels: boolean
}

function Ticks({ domain, interval, showLabels }: TicksProps) {
  const ticks = useMemo(() => {
    const result: number[] = []
    const start = Math.ceil(domain[0] / interval) * interval
    for (let t = start; t <= domain[1]; t += interval) {
      result.push(t)
    }
    return result
  }, [domain, interval])

  return (
    <>
      {ticks.map((tick) => (
        <g key={tick}>
          {/* Tick mark */}
          <Line.Segment
            point1={[tick, -0.15]}
            point2={[tick, 0.15]}
            color="var(--b-text-secondary)"
            weight={1.5}
          />
          {/* Tick label */}
          {showLabels && (
            <Text x={tick} y={-0.45} size={12} color="var(--b-text-secondary)">
              {tick.toString()}
            </Text>
          )}
        </g>
      ))}
    </>
  )
}

interface InequalityShadingProps {
  inequality: InequalityRegion
  domain: [number, number]
}

function InequalityShading({ inequality, domain }: InequalityShadingProps) {
  const color = getColor(inequality.color, 'var(--b-math-light)')
  const opacity = inequality.opacity ?? 0.3

  // Calculate shading bounds
  let startX: number
  let endX: number
  let startOpen = false
  let endOpen = false

  switch (inequality.type) {
    case '<':
      startX = domain[0] - 0.5
      endX = inequality.value
      endOpen = true
      break
    case '<=':
      startX = domain[0] - 0.5
      endX = inequality.value
      break
    case '>':
      startX = inequality.value
      endX = domain[1] + 0.5
      startOpen = true
      break
    case '>=':
      startX = inequality.value
      endX = domain[1] + 0.5
      break
    case 'between':
      startX = inequality.value
      endX = inequality.endValue ?? domain[1]
      break
    default:
      return null
  }

  // Create the shaded region as a polygon
  const yHeight = 0.4
  const points: [number, number][] = [
    [startX, -yHeight],
    [endX, -yHeight],
    [endX, yHeight],
    [startX, yHeight],
  ]

  return (
    <>
      {/* Shaded region */}
      <Polygon
        points={points}
        color={color}
        fillOpacity={opacity}
        strokeOpacity={0}
      />

      {/* Boundary point(s) */}
      {inequality.type !== 'between' && (
        <>
          <Point
            x={inequality.value}
            y={0}
            color={getColor(inequality.color, 'var(--b-math)')}
          />
          {/* Open circle indicator for strict inequalities */}
          {(inequality.type === '<' || inequality.type === '>') && (
            <circle
              cx={0}
              cy={0}
              r={0.12}
              fill="var(--b-bg-elevated)"
              stroke={getColor(inequality.color, 'var(--b-math)')}
              strokeWidth={2}
              transform={`translate(${inequality.value}, 0)`}
            />
          )}
        </>
      )}

      {/* Arrow indicators for unbounded regions */}
      {(inequality.type === '<' || inequality.type === '<=') && (
        <Line.Segment
          point1={[domain[0] - 0.3, 0]}
          point2={[domain[0], 0]}
          color={getColor(inequality.color, 'var(--b-math)')}
          weight={3}
        />
      )}
      {(inequality.type === '>' || inequality.type === '>=') && (
        <Line.Segment
          point1={[domain[1], 0]}
          point2={[domain[1] + 0.3, 0]}
          color={getColor(inequality.color, 'var(--b-math)')}
          weight={3}
        />
      )}
    </>
  )
}

interface RangeHighlightComponentProps {
  highlight: RangeHighlight
}

function RangeHighlightComponent({ highlight }: RangeHighlightComponentProps) {
  const color = getColor(highlight.color, 'var(--b-success-light)')
  const opacity = highlight.opacity ?? 0.25
  const yHeight = 0.35

  const points: [number, number][] = [
    [highlight.start, -yHeight],
    [highlight.end, -yHeight],
    [highlight.end, yHeight],
    [highlight.start, yHeight],
  ]

  return (
    <>
      <Polygon
        points={points}
        color={color}
        fillOpacity={opacity}
        strokeOpacity={0}
      />
      {highlight.label && (
        <Text
          x={(highlight.start + highlight.end) / 2}
          y={0.6}
          size={12}
          color={getColor(highlight.color, 'var(--b-success)')}
        >
          {highlight.label}
        </Text>
      )}
    </>
  )
}

interface NumberLinePointComponentProps {
  point: NumberLinePoint
  index: number
}

export function NumberLinePointComponent({
  point,
  index,
}: NumberLinePointComponentProps) {
  const color = getColor(point.color, 'var(--b-math)')
  const filled = point.filled ?? true

  // Build label
  let labelText = point.label ?? ''
  if (point.showValue) {
    labelText = labelText
      ? `${labelText} (${point.value})`
      : point.value.toString()
  }

  return (
    <>
      {filled ? (
        <Point x={point.value} y={0} color={color} />
      ) : (
        <circle
          cx={0}
          cy={0}
          r={0.12}
          fill="var(--b-bg-elevated)"
          stroke={color}
          strokeWidth={2}
          transform={`translate(${point.value}, 0)`}
        />
      )}
      {labelText && (
        <Text x={point.value} y={0.5} size={13} color={color}>
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
 * NumberLine - Number line visualization with inequality shading
 *
 * Features:
 * - Point markers with labels
 * - Inequality shading (x > 3, x <= 5, etc.)
 * - Range highlighting
 * - Clean educational styling
 */
export function NumberLine({
  domain = [-10, 10],
  points = [],
  inequality,
  highlights = [],
  showTicks = true,
  tickInterval = 1,
  showLabels = true,
  height = 120,
  width,
  className = '',
  title,
}: NumberLineProps) {
  // Add some padding to the domain for visual clarity
  const viewDomain = useMemo<[number, number]>(
    () => [domain[0] - 0.5, domain[1] + 0.5],
    [domain]
  )

  const viewBox = useMemo(
    () => ({
      x: viewDomain as [number, number],
      y: [-1, 1] as [number, number],
    }),
    [viewDomain]
  )

  return (
    <div
      className={`b-card b-rounded-lg overflow-hidden ${className}`}
      style={{
        width: width ?? '100%',
        height,
        background: 'var(--b-bg-elevated)',
        padding: 'var(--b-space-sm) 0',
      }}
    >
      {title && (
        <div
          style={{
            padding: '0 var(--b-space-lg)',
            marginBottom: 'var(--b-space-xs)',
            fontSize: 'var(--b-text-sm)',
            fontWeight: 'var(--b-font-medium)',
            color: 'var(--b-text-secondary)',
          }}
        >
          {title}
        </div>
      )}
      <Mafs viewBox={viewBox} preserveAspectRatio={false} pan={false}>
        {/* Range highlights (behind everything) */}
        {highlights.map((highlight, index) => (
          <RangeHighlightComponent
            key={`highlight-${index}`}
            highlight={highlight}
          />
        ))}

        {/* Inequality shading */}
        {inequality && (
          <InequalityShading inequality={inequality} domain={domain} />
        )}

        {/* Main axis line */}
        <Line.Segment
          point1={[viewDomain[0], 0]}
          point2={[viewDomain[1], 0]}
          color="var(--b-text-primary)"
          weight={2}
        />

        {/* Arrow heads at ends */}
        <Polygon
          points={[
            [viewDomain[1] + 0.3, 0],
            [viewDomain[1], 0.12],
            [viewDomain[1], -0.12],
          ]}
          color="var(--b-text-primary)"
        />
        <Polygon
          points={[
            [viewDomain[0] - 0.3, 0],
            [viewDomain[0], 0.12],
            [viewDomain[0], -0.12],
          ]}
          color="var(--b-text-primary)"
        />

        {/* Tick marks and labels */}
        {showTicks && (
          <Ticks
            domain={domain}
            interval={tickInterval}
            showLabels={showLabels}
          />
        )}

        {/* Points */}
        {points.map((point, index) => (
          <NumberLinePointComponent
            key={`point-${point.value}-${index}`}
            point={point}
            index={index}
          />
        ))}
      </Mafs>
    </div>
  )
}

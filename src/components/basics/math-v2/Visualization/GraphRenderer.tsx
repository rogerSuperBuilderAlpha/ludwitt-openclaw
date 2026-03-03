'use client'

import { useMemo } from 'react'
import { Mafs, Coordinates, Plot, Point, Text, Theme, vec } from 'mafs'
import 'mafs/core.css'
import type {
  GraphConfig,
  GraphExpression,
  GraphPoint,
} from '@/lib/types/math-v2'
import { logger } from '@/lib/logger'

// =============================================================================
// Types
// =============================================================================

interface GraphRendererProps {
  /** Graph configuration from problem schema */
  config: GraphConfig
  /** Width of the graph container */
  width?: number
  /** Height of the graph container */
  height?: number
  /** Optional className for the container */
  className?: string
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Parse a mathematical expression string into a callable function.
 * Supports common math functions: sin, cos, tan, abs, sqrt, log, ln, exp, etc.
 */
function parseExpression(expr: string): (x: number) => number {
  // Normalize the expression
  const normalized = expr
    .replace(/\^/g, '**') // Convert ^ to ** for exponents
    .replace(/ln\(/g, 'Math.log(') // Natural log
    .replace(/log\(/g, 'Math.log10(') // Base-10 log
    .replace(/sqrt\(/g, 'Math.sqrt(') // Square root
    .replace(/abs\(/g, 'Math.abs(') // Absolute value
    .replace(/sin\(/g, 'Math.sin(') // Sine
    .replace(/cos\(/g, 'Math.cos(') // Cosine
    .replace(/tan\(/g, 'Math.tan(') // Tangent
    .replace(/asin\(/g, 'Math.asin(') // Arc sine
    .replace(/acos\(/g, 'Math.acos(') // Arc cosine
    .replace(/atan\(/g, 'Math.atan(') // Arc tangent
    .replace(/exp\(/g, 'Math.exp(') // e^x
    .replace(/pi/gi, 'Math.PI') // Pi constant
    .replace(/e(?![xp])/g, 'Math.E') // Euler's number (not followed by x or p)

  // Validate expression only contains safe math tokens before eval
  const SAFE_FUNCS =
    /Math\.(sin|cos|tan|asin|acos|atan|log|log10|sqrt|abs|exp|PI|E|pow|floor|ceil|round|min|max)/g
  const SAFE_EXPR = /^[x0-9+\-*/().,%\s]+$/
  const stripped = normalized.replace(SAFE_FUNCS, '').replace(SAFE_EXPR, '')
  if (stripped.length > 0) {
    logger.warn('GraphRenderer', 'Rejected unsafe expression', {
      data: { expr, stripped },
    })
    return () => NaN
  }

  // eslint-disable-next-line no-new-func
  return new Function('x', `return ${normalized}`) as (x: number) => number
}

/**
 * Get color value - supports CSS variables and direct colors
 */
function getColor(color?: string, defaultColor = 'var(--b-math)'): string {
  if (!color) return defaultColor
  return color.startsWith('#') ||
    color.startsWith('rgb') ||
    color.startsWith('hsl')
    ? color
    : `var(--b-${color}, ${color})`
}

// =============================================================================
// Sub-components
// =============================================================================

interface PlotExpressionProps {
  expression: GraphExpression
  index: number
}

function PlotExpression({ expression, index }: PlotExpressionProps) {
  const fn = useMemo(() => {
    try {
      return parseExpression(expression.expression)
    } catch {
      logger.warn(
        'GraphRenderer',
        `Failed to parse expression: ${expression.expression}`
      )
      return () => 0
    }
  }, [expression.expression])

  const color = getColor(expression.color, getDefaultColor(index))
  const strokeWidth = expression.strokeWidth ?? 2.5

  // Mafs doesn't support dashed/dotted lines directly, but we render the function
  return <Plot.OfX y={fn} color={color} weight={strokeWidth} />
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

interface LabeledPointProps {
  point: GraphPoint
  index: number
}

function LabeledPoint({ point, index }: LabeledPointProps) {
  const color = getColor(point.color, getDefaultColor(index))
  const size = point.size ?? 0.15

  return (
    <>
      <Point x={point.x} y={point.y} color={color} />
      {point.label && (
        <Text
          x={point.x + size * 1.5}
          y={point.y + size * 1.5}
          attach="w"
          size={14}
          color={color}
        >
          {point.label}
        </Text>
      )}
    </>
  )
}

// =============================================================================
// Main Component
// =============================================================================

/**
 * GraphRenderer - Renders mathematical function graphs using Mafs
 *
 * Features:
 * - Multiple expressions on the same graph
 * - Labeled points
 * - Configurable domain/range
 * - Educational styling with Basics design system
 */
export function GraphRenderer({
  config,
  width,
  height = 300,
  className = '',
}: GraphRendererProps) {
  const { expressions, domain, range, showGrid = true, points } = config

  // Calculate viewBox based on domain and range
  const xMin = domain[0]
  const xMax = domain[1]
  const yMin = range[0]
  const yMax = range[1]

  const viewBox = useMemo(
    () => ({
      x: [xMin, xMax] as [number, number],
      y: [yMin, yMax] as [number, number],
    }),
    [xMin, xMax, yMin, yMax]
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
      <Mafs viewBox={viewBox} preserveAspectRatio={false} pan={false}>
        {/* Grid and axes */}
        {showGrid && (
          <Coordinates.Cartesian
            xAxis={{
              lines: 1,
              labels: (n) => (Number.isInteger(n) ? n.toString() : ''),
            }}
            yAxis={{
              lines: 1,
              labels: (n) => (Number.isInteger(n) ? n.toString() : ''),
            }}
          />
        )}

        {/* Plot each expression */}
        {expressions.map((expr, index) => (
          <PlotExpression
            key={`${expr.expression}-${index}`}
            expression={expr}
            index={index}
          />
        ))}

        {/* Render labeled points */}
        {points?.map((point, index) => (
          <LabeledPoint
            key={`point-${point.x}-${point.y}-${index}`}
            point={point}
            index={index}
          />
        ))}
      </Mafs>
    </div>
  )
}

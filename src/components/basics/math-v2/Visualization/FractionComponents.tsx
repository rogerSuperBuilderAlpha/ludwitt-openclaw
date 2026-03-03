'use client'

/**
 * Fraction Sub-Components
 *
 * Visual building blocks for fraction diagrams:
 * - FractionBar  -- horizontal rectangle divided into equal parts
 * - FractionPie  -- circle divided into slices
 * - FractionComparison -- two fractions side-by-side with a relation symbol
 * - EquivalentFractions -- a series of fractions joined by "=" signs
 */

import {
  COLORS,
  FractionData,
  describeSlice,
  compareFractions,
} from './fraction-utils'

// ============================================================================
// Fraction Bar
// ============================================================================

interface FractionBarProps {
  fraction: FractionData
  width: number
  height: number
  x?: number
  y?: number
  showLabel?: boolean
  variant?: 'primary' | 'secondary'
}

export function FractionBar({
  fraction,
  width,
  height,
  x = 0,
  y = 0,
  showLabel = true,
  variant = 'primary',
}: FractionBarProps) {
  const { numerator, denominator } = fraction
  const partWidth = width / denominator
  const filledColor = variant === 'primary' ? COLORS.filled : COLORS.filledSecondary
  const emptyColor = variant === 'primary' ? COLORS.empty : COLORS.emptySecondary
  const borderColor = variant === 'primary' ? COLORS.border : COLORS.borderSecondary

  return (
    <g className="fraction-bar">
      {/* Bar outline */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke={borderColor}
        strokeWidth={2}
        rx={4}
      />

      {/* Parts */}
      {Array.from({ length: denominator }).map((_, i) => {
        const partX = x + i * partWidth
        const isFilled = i < numerator

        return (
          <g key={`part-${i}`}>
            <rect
              x={partX}
              y={y}
              width={partWidth}
              height={height}
              fill={isFilled ? filledColor : emptyColor}
              stroke="none"
            />
            {/* Divider lines */}
            {i > 0 && (
              <line
                x1={partX}
                y1={y}
                x2={partX}
                y2={y + height}
                stroke={COLORS.divider}
                strokeWidth={1}
              />
            )}
          </g>
        )
      })}

      {/* Re-draw border on top */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke={borderColor}
        strokeWidth={2}
        rx={4}
      />

      {/* Fraction label */}
      {showLabel && (
        <text
          x={x + width / 2}
          y={y + height + 25}
          fill={COLORS.text}
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
        >
          <tspan>{numerator}</tspan>
          <tspan>/</tspan>
          <tspan>{denominator}</tspan>
        </text>
      )}
    </g>
  )
}

// ============================================================================
// Fraction Pie
// ============================================================================

interface FractionPieProps {
  fraction: FractionData
  radius: number
  cx?: number
  cy?: number
  showLabel?: boolean
  variant?: 'primary' | 'secondary'
}

export function FractionPie({
  fraction,
  radius,
  cx = radius,
  cy = radius,
  showLabel = true,
  variant = 'primary',
}: FractionPieProps) {
  const { numerator, denominator } = fraction
  const sliceAngle = 360 / denominator
  const filledColor = variant === 'primary' ? COLORS.filled : COLORS.filledSecondary
  const emptyColor = variant === 'primary' ? COLORS.empty : COLORS.emptySecondary
  const borderColor = variant === 'primary' ? COLORS.border : COLORS.borderSecondary

  // Handle full circle case
  if (numerator === denominator) {
    return (
      <g className="fraction-pie">
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill={filledColor}
          stroke={borderColor}
          strokeWidth={2}
        />
        {showLabel && (
          <text
            x={cx}
            y={cy + radius + 25}
            fill={COLORS.text}
            fontSize={16}
            fontWeight="bold"
            textAnchor="middle"
          >
            <tspan>{numerator}</tspan>
            <tspan>/</tspan>
            <tspan>{denominator}</tspan>
          </text>
        )}
      </g>
    )
  }

  return (
    <g className="fraction-pie">
      {/* Slices */}
      {Array.from({ length: denominator }).map((_, i) => {
        const startAngle = i * sliceAngle
        const endAngle = startAngle + sliceAngle
        const isFilled = i < numerator

        return (
          <path
            key={`slice-${i}`}
            d={describeSlice(cx, cy, radius, startAngle, endAngle)}
            fill={isFilled ? filledColor : emptyColor}
            stroke={borderColor}
            strokeWidth={1.5}
          />
        )
      })}

      {/* Outer circle for clean edge */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={borderColor}
        strokeWidth={2}
      />

      {/* Center point */}
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill={borderColor}
      />

      {/* Fraction label */}
      {showLabel && (
        <text
          x={cx}
          y={cy + radius + 25}
          fill={COLORS.text}
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
        >
          <tspan>{numerator}</tspan>
          <tspan>/</tspan>
          <tspan>{denominator}</tspan>
        </text>
      )}
    </g>
  )
}

// ============================================================================
// Fraction Comparison
// ============================================================================

interface FractionComparisonProps {
  fraction1: FractionData
  fraction2: FractionData
  width: number
  height: number
  type?: 'bar' | 'pie'
  showComparison?: boolean
}

export function FractionComparison({
  fraction1,
  fraction2,
  width,
  height,
  type = 'bar',
  showComparison = true,
}: FractionComparisonProps) {
  const comparison = compareFractions(fraction1, fraction2)
  const comparisonSymbol = comparison === '<' ? '<' : comparison === '>' ? '>' : '='
  const gap = 60

  if (type === 'bar') {
    const barWidth = (width - gap) / 2
    const barHeight = 40

    return (
      <g className="fraction-comparison">
        {/* First fraction bar */}
        <FractionBar
          fraction={fraction1}
          width={barWidth}
          height={barHeight}
          x={0}
          y={(height - barHeight) / 2 - 20}
          variant="primary"
        />

        {/* Comparison symbol */}
        {showComparison && (
          <text
            x={width / 2}
            y={height / 2}
            fill={COLORS.accent}
            fontSize={28}
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {comparisonSymbol}
          </text>
        )}

        {/* Second fraction bar */}
        <FractionBar
          fraction={fraction2}
          width={barWidth}
          height={barHeight}
          x={barWidth + gap}
          y={(height - barHeight) / 2 - 20}
          variant="secondary"
        />
      </g>
    )
  }

  // Pie comparison
  const pieRadius = Math.min((width - gap) / 4, height / 3)

  return (
    <g className="fraction-comparison">
      {/* First fraction pie */}
      <g transform={`translate(${pieRadius + 10}, ${height / 2 - pieRadius - 10})`}>
        <FractionPie
          fraction={fraction1}
          radius={pieRadius}
          cx={pieRadius}
          cy={pieRadius}
          variant="primary"
        />
      </g>

      {/* Comparison symbol */}
      {showComparison && (
        <text
          x={width / 2}
          y={height / 2}
          fill={COLORS.accent}
          fontSize={28}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {comparisonSymbol}
        </text>
      )}

      {/* Second fraction pie */}
      <g transform={`translate(${width / 2 + gap / 2}, ${height / 2 - pieRadius - 10})`}>
        <FractionPie
          fraction={fraction2}
          radius={pieRadius}
          cx={pieRadius}
          cy={pieRadius}
          variant="secondary"
        />
      </g>
    </g>
  )
}

// ============================================================================
// Equivalent Fractions
// ============================================================================

interface EquivalentFractionsProps {
  fractions: FractionData[]
  width: number
  height: number
  type?: 'bar' | 'pie'
}

export function EquivalentFractions({
  fractions,
  width,
  height,
  type = 'bar',
}: EquivalentFractionsProps) {
  const gap = 20
  const itemHeight = (height - (fractions.length - 1) * gap) / fractions.length

  if (type === 'bar') {
    const barHeight = Math.min(40, itemHeight - 30)

    return (
      <g className="equivalent-fractions">
        {fractions.map((fraction, index) => (
          <g key={`frac-${index}`} transform={`translate(0, ${index * (itemHeight + gap)})`}>
            <FractionBar
              fraction={fraction}
              width={width - 20}
              height={barHeight}
              x={10}
              y={0}
            />
            {/* Equals sign between bars */}
            {index < fractions.length - 1 && (
              <text
                x={width / 2}
                y={barHeight + 45}
                fill={COLORS.textMuted}
                fontSize={18}
                fontWeight="bold"
                textAnchor="middle"
              >
                =
              </text>
            )}
          </g>
        ))}
      </g>
    )
  }

  // Pie layout
  const pieRadius = Math.min((width / fractions.length) / 2 - gap, (height - 60) / 2)
  const itemWidth = width / fractions.length

  return (
    <g className="equivalent-fractions">
      {fractions.map((fraction, index) => (
        <g key={`frac-${index}`} transform={`translate(${index * itemWidth + itemWidth / 2 - pieRadius}, ${10})`}>
          <FractionPie
            fraction={fraction}
            radius={pieRadius}
            cx={pieRadius}
            cy={pieRadius}
          />
          {/* Equals sign between pies */}
          {index < fractions.length - 1 && (
            <text
              x={pieRadius * 2 + itemWidth / 2 - pieRadius}
              y={pieRadius}
              fill={COLORS.textMuted}
              fontSize={18}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              =
            </text>
          )}
        </g>
      ))}
    </g>
  )
}

'use client'

/**
 * Histogram Component
 *
 * Renders an SVG histogram with contiguous bins, labeled axes,
 * grid lines, and optional value annotations.
 * Used as a sub-component of StatisticsChart.
 */

import { HistogramData, COLORS, formatNumber } from './chart-utils'

interface HistogramProps {
  data: HistogramData
  width: number
  height: number
  title?: string
  xAxisLabel?: string
  yAxisLabel?: string
  showValues?: boolean
  color?: string
}

export function Histogram({
  data,
  width,
  height,
  title,
  xAxisLabel,
  yAxisLabel,
  showValues = true,
  color = COLORS.primary,
}: HistogramProps) {
  const padding = { top: title ? 40 : 20, right: 20, bottom: xAxisLabel ? 60 : 40, left: yAxisLabel ? 60 : 50 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const { bins } = data
  const maxCount = Math.max(...bins.map(b => b.count))
  const minX = Math.min(...bins.map(b => b.start))
  const maxX = Math.max(...bins.map(b => b.end))
  const rangeX = maxX - minX

  const scaleX = (value: number) => padding.left + ((value - minX) / rangeX) * chartWidth
  const scaleY = (count: number) => height - padding.bottom - (count / maxCount) * chartHeight

  // Y-axis ticks
  const yTicks = 5
  const yStep = Math.ceil(maxCount / yTicks)

  return (
    <g className="histogram">
      {/* Title */}
      {title && (
        <text
          x={width / 2}
          y={20}
          fill={COLORS.text}
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
        >
          {title}
        </text>
      )}

      {/* Y-axis */}
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={height - padding.bottom}
        stroke={COLORS.axis}
        strokeWidth={2}
      />

      {/* Y-axis ticks */}
      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const value = i * yStep
        const y = scaleY(value)
        return (
          <g key={`y-tick-${i}`}>
            <line
              x1={padding.left - 5}
              y1={y}
              x2={padding.left}
              y2={y}
              stroke={COLORS.axis}
              strokeWidth={1}
            />
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke={COLORS.grid}
              strokeWidth={0.5}
              strokeDasharray="4,4"
            />
            <text
              x={padding.left - 10}
              y={y}
              fill={COLORS.textMuted}
              fontSize={11}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {value}
            </text>
          </g>
        )
      })}

      {/* X-axis */}
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        stroke={COLORS.axis}
        strokeWidth={2}
      />

      {/* Bars */}
      {bins.map((bin, index) => {
        const x = scaleX(bin.start)
        const binWidth = scaleX(bin.end) - scaleX(bin.start)
        const barHeight = (bin.count / maxCount) * chartHeight
        const y = height - padding.bottom - barHeight

        return (
          <g key={`bin-${index}`}>
            <rect
              x={x}
              y={y}
              width={binWidth}
              height={barHeight}
              fill={color}
              stroke="#fff"
              strokeWidth={1}
              opacity={0.8}
            />
            {showValues && bin.count > 0 && (
              <text
                x={x + binWidth / 2}
                y={y - 5}
                fill={COLORS.text}
                fontSize={10}
                textAnchor="middle"
              >
                {bin.count}
              </text>
            )}
            {/* X-axis labels at bin boundaries */}
            {index === 0 && (
              <text
                x={x}
                y={height - padding.bottom + 15}
                fill={COLORS.textMuted}
                fontSize={10}
                textAnchor="middle"
              >
                {bin.start}
              </text>
            )}
            <text
              x={x + binWidth}
              y={height - padding.bottom + 15}
              fill={COLORS.textMuted}
              fontSize={10}
              textAnchor="middle"
            >
              {bin.end}
            </text>
          </g>
        )
      })}

      {/* Axis labels */}
      {yAxisLabel && (
        <text
          x={15}
          y={height / 2}
          fill={COLORS.text}
          fontSize={12}
          fontWeight="500"
          textAnchor="middle"
          transform={`rotate(-90, 15, ${height / 2})`}
        >
          {yAxisLabel}
        </text>
      )}
      {xAxisLabel && (
        <text
          x={width / 2}
          y={height - 10}
          fill={COLORS.text}
          fontSize={12}
          fontWeight="500"
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
      )}
    </g>
  )
}

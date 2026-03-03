'use client'

/**
 * BarChart Component
 *
 * Renders an SVG bar chart with labeled axes, grid lines, and value labels.
 * Used as a sub-component of StatisticsChart.
 */

import { BarChartData, COLORS, CHART_COLORS, formatNumber } from './chart-utils'

interface BarChartProps {
  data: BarChartData[]
  width: number
  height: number
  title?: string
  xAxisLabel?: string
  yAxisLabel?: string
  showValues?: boolean
}

export function BarChart({
  data,
  width,
  height,
  title,
  xAxisLabel,
  yAxisLabel,
  showValues = true,
}: BarChartProps) {
  const padding = { top: title ? 40 : 20, right: 20, bottom: xAxisLabel ? 60 : 40, left: yAxisLabel ? 60 : 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const maxValue = Math.max(...data.map(d => d.value))
  const barWidth = Math.min(60, (chartWidth - (data.length - 1) * 10) / data.length)
  const gap = (chartWidth - barWidth * data.length) / (data.length + 1)

  // Y-axis tick values
  const yTicks = 5
  const yStep = maxValue / yTicks

  return (
    <g className="bar-chart">
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

      {/* Y-axis ticks and labels */}
      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const value = i * yStep
        const y = height - padding.bottom - (value / maxValue) * chartHeight
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
              {formatNumber(value)}
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
      {data.map((item, index) => {
        const x = padding.left + gap + index * (barWidth + gap)
        const barHeight = (item.value / maxValue) * chartHeight
        const y = height - padding.bottom - barHeight
        const color = item.color || CHART_COLORS[index % CHART_COLORS.length]

        return (
          <g key={`bar-${index}`}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx={2}
            />
            {/* Value label */}
            {showValues && (
              <text
                x={x + barWidth / 2}
                y={y - 5}
                fill={COLORS.text}
                fontSize={11}
                fontWeight="500"
                textAnchor="middle"
              >
                {formatNumber(item.value)}
              </text>
            )}
            {/* X-axis label */}
            <text
              x={x + barWidth / 2}
              y={height - padding.bottom + 15}
              fill={COLORS.textMuted}
              fontSize={11}
              textAnchor="middle"
            >
              {item.label}
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

'use client'

/**
 * PieChart Component
 *
 * Renders an SVG pie chart with optional legend, percentage labels,
 * and donut mode (innerRadius). Used as a sub-component of StatisticsChart.
 */

import { PieChartData, COLORS, CHART_COLORS, polarToCartesian, describeArc, formatNumber } from './chart-utils'

interface PieChartProps {
  data: PieChartData[]
  width: number
  height: number
  title?: string
  showLabels?: boolean
  showPercentages?: boolean
  showLegend?: boolean
  innerRadius?: number
}

export function PieChart({
  data,
  width,
  height,
  title,
  showLabels = true,
  showPercentages = true,
  showLegend = true,
  innerRadius = 0,
}: PieChartProps) {
  const legendWidth = showLegend ? 120 : 0
  const chartSize = Math.min(width - legendWidth, height - (title ? 30 : 0))
  const cx = (width - legendWidth) / 2
  const cy = (height + (title ? 20 : 0)) / 2
  const radius = (chartSize / 2) - 20

  const total = data.reduce((sum, d) => sum + d.value, 0)
  let currentAngle = 0

  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle
    return {
      ...item,
      startAngle,
      endAngle,
      percentage: (item.value / total) * 100,
      color: item.color || CHART_COLORS[index % CHART_COLORS.length],
    }
  })

  return (
    <g className="pie-chart">
      {/* Title */}
      {title && (
        <text
          x={cx}
          y={20}
          fill={COLORS.text}
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
        >
          {title}
        </text>
      )}

      {/* Slices */}
      {slices.map((slice, index) => {
        const midAngle = (slice.startAngle + slice.endAngle) / 2
        const labelRadius = radius * 0.7
        const labelPos = polarToCartesian(cx, cy, labelRadius, midAngle)

        // Handle small slice case - full circle
        if (slice.endAngle - slice.startAngle >= 359.9) {
          return (
            <g key={`slice-${index}`}>
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={slice.color}
                stroke="#fff"
                strokeWidth={2}
              />
              {innerRadius > 0 && (
                <circle cx={cx} cy={cy} r={innerRadius} fill={COLORS.background} />
              )}
              {showLabels && showPercentages && (
                <text
                  x={cx}
                  y={cy}
                  fill="#fff"
                  fontSize={14}
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  100%
                </text>
              )}
            </g>
          )
        }

        return (
          <g key={`slice-${index}`}>
            <path
              d={describeArc(cx, cy, radius, slice.startAngle, slice.endAngle)}
              fill={slice.color}
              stroke="#fff"
              strokeWidth={2}
            />
            {innerRadius > 0 && (
              <circle cx={cx} cy={cy} r={innerRadius} fill={COLORS.background} />
            )}
            {showLabels && slice.percentage > 5 && (
              <text
                x={labelPos.x}
                y={labelPos.y}
                fill="#fff"
                fontSize={12}
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {showPercentages ? `${Math.round(slice.percentage)}%` : formatNumber(slice.value)}
              </text>
            )}
          </g>
        )
      })}

      {/* Legend */}
      {showLegend && (
        <g className="pie-legend" transform={`translate(${width - legendWidth + 10}, ${title ? 40 : 20})`}>
          {slices.map((slice, index) => (
            <g key={`legend-${index}`} transform={`translate(0, ${index * 22})`}>
              <rect
                x={0}
                y={0}
                width={12}
                height={12}
                fill={slice.color}
                rx={2}
              />
              <text
                x={18}
                y={10}
                fill={COLORS.textMuted}
                fontSize={11}
              >
                {slice.label}
              </text>
            </g>
          ))}
        </g>
      )}
    </g>
  )
}

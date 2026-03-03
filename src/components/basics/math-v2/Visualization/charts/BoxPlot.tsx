'use client'

/**
 * BoxPlot Component
 *
 * Renders one or more SVG box-and-whisker plots with whiskers, caps,
 * IQR boxes, median lines, outlier markers, and value annotations.
 * Used as a sub-component of StatisticsChart.
 */

import { BoxPlotData, COLORS, formatNumber } from './chart-utils'

interface BoxPlotProps {
  data: BoxPlotData[]
  width: number
  height: number
  title?: string
  showValues?: boolean
  orientation?: 'horizontal' | 'vertical'
}

export function BoxPlot({
  data,
  width,
  height,
  title,
  showValues = true,
  orientation = 'horizontal',
}: BoxPlotProps) {
  const padding = { top: title ? 40 : 20, right: 40, bottom: 40, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Find overall min/max across all box plots
  const allValues = data.flatMap(d => [d.min, d.max, ...(d.outliers || [])])
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)
  const range = maxValue - minValue
  const buffer = range * 0.1

  const scale = (value: number) => {
    if (orientation === 'horizontal') {
      return padding.left + ((value - minValue + buffer) / (range + 2 * buffer)) * chartWidth
    }
    return height - padding.bottom - ((value - minValue + buffer) / (range + 2 * buffer)) * chartHeight
  }

  const boxHeight = Math.min(40, (chartHeight - (data.length - 1) * 20) / data.length)
  const boxGap = (chartHeight - boxHeight * data.length) / (data.length + 1)

  return (
    <g className="box-plot">
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

      {/* Axis */}
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        stroke={COLORS.axis}
        strokeWidth={2}
      />

      {/* Axis ticks */}
      {Array.from({ length: 6 }).map((_, i) => {
        const value = minValue + (range * i) / 5
        const x = scale(value)
        return (
          <g key={`tick-${i}`}>
            <line
              x1={x}
              y1={height - padding.bottom}
              x2={x}
              y2={height - padding.bottom + 5}
              stroke={COLORS.axis}
              strokeWidth={1}
            />
            <text
              x={x}
              y={height - padding.bottom + 18}
              fill={COLORS.textMuted}
              fontSize={11}
              textAnchor="middle"
            >
              {formatNumber(value)}
            </text>
          </g>
        )
      })}

      {/* Box plots */}
      {data.map((item, index) => {
        const y = padding.top + boxGap + index * (boxHeight + boxGap)
        const minX = scale(item.min)
        const q1X = scale(item.q1)
        const medianX = scale(item.median)
        const q3X = scale(item.q3)
        const maxX = scale(item.max)

        return (
          <g key={`box-${index}`}>
            {/* Label */}
            {item.label && (
              <text
                x={padding.left - 10}
                y={y + boxHeight / 2}
                fill={COLORS.text}
                fontSize={12}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {item.label}
              </text>
            )}

            {/* Whiskers */}
            <line
              x1={minX}
              y1={y + boxHeight / 2}
              x2={q1X}
              y2={y + boxHeight / 2}
              stroke={COLORS.primary}
              strokeWidth={2}
            />
            <line
              x1={q3X}
              y1={y + boxHeight / 2}
              x2={maxX}
              y2={y + boxHeight / 2}
              stroke={COLORS.primary}
              strokeWidth={2}
            />

            {/* Whisker caps */}
            <line x1={minX} y1={y + 8} x2={minX} y2={y + boxHeight - 8} stroke={COLORS.primary} strokeWidth={2} />
            <line x1={maxX} y1={y + 8} x2={maxX} y2={y + boxHeight - 8} stroke={COLORS.primary} strokeWidth={2} />

            {/* Box (Q1 to Q3) */}
            <rect
              x={q1X}
              y={y}
              width={q3X - q1X}
              height={boxHeight}
              fill="rgba(59, 130, 246, 0.2)"
              stroke={COLORS.primary}
              strokeWidth={2}
              rx={2}
            />

            {/* Median line */}
            <line
              x1={medianX}
              y1={y}
              x2={medianX}
              y2={y + boxHeight}
              stroke={COLORS.error}
              strokeWidth={3}
            />

            {/* Outliers */}
            {item.outliers?.map((outlier, oi) => (
              <circle
                key={`outlier-${oi}`}
                cx={scale(outlier)}
                cy={y + boxHeight / 2}
                r={4}
                fill="none"
                stroke={COLORS.accent}
                strokeWidth={2}
              />
            ))}

            {/* Values */}
            {showValues && (
              <>
                <text x={minX} y={y - 5} fill={COLORS.textLight} fontSize={9} textAnchor="middle">
                  {formatNumber(item.min)}
                </text>
                <text x={q1X} y={y - 5} fill={COLORS.textLight} fontSize={9} textAnchor="middle">
                  Q1:{formatNumber(item.q1)}
                </text>
                <text x={medianX} y={y - 5} fill={COLORS.error} fontSize={10} fontWeight="bold" textAnchor="middle">
                  {formatNumber(item.median)}
                </text>
                <text x={q3X} y={y - 5} fill={COLORS.textLight} fontSize={9} textAnchor="middle">
                  Q3:{formatNumber(item.q3)}
                </text>
                <text x={maxX} y={y - 5} fill={COLORS.textLight} fontSize={9} textAnchor="middle">
                  {formatNumber(item.max)}
                </text>
              </>
            )}
          </g>
        )
      })}
    </g>
  )
}

'use client'

/**
 * MiniTrendChart
 *
 * A small inline SVG sparkline showing accuracy trend over time.
 */

interface MiniTrendChartProps {
  dataPoints: { accuracy: number }[]
  color: string
}

export function MiniTrendChart({ dataPoints, color }: MiniTrendChartProps) {
  if (dataPoints.length < 2) {
    return (
      <div className="w-20 h-8 flex items-center justify-center text-xs text-gray-400">
        Need more data
      </div>
    )
  }

  const maxAccuracy = Math.max(...dataPoints.map(d => d.accuracy), 1)
  const minAccuracy = Math.min(...dataPoints.map(d => d.accuracy), 0)
  const range = maxAccuracy - minAccuracy || 0.1

  const width = 80
  const height = 32
  const padding = 4

  const points = dataPoints.map((d, i) => {
    const x = padding + (i / (dataPoints.length - 1)) * (width - padding * 2)
    const y = height - padding - ((d.accuracy - minAccuracy) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`

  const lastPoint = dataPoints[dataPoints.length - 1]
  const endCy = height - padding - ((lastPoint.accuracy - minAccuracy) / range) * (height - padding * 2)

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={padding + (width - padding * 2)}
        cy={endCy}
        r="3"
        fill={color}
      />
    </svg>
  )
}

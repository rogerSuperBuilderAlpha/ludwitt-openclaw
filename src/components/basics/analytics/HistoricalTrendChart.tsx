'use client'

/**
 * HistoricalTrendChart
 *
 * Renders a long-term historical accuracy chart with time range selector,
 * period stats, and milestone footer.
 */

import { useMemo } from 'react'
import {
  CalendarBlank,
  Clock,
  Trophy,
  Target,
} from '@phosphor-icons/react'
import type { HistoricalDataPoint, TimeRange } from './types'

interface HistoricalTrendChartProps {
  data: HistoricalDataPoint[]
  timeRange: TimeRange
  onTimeRangeChange: (range: TimeRange) => void
  learningStartDate?: string
  totalProblems?: number
  bestStreak?: number
}

export function HistoricalTrendChart({
  data,
  timeRange,
  onTimeRangeChange,
  learningStartDate,
  totalProblems,
  bestStreak,
}: HistoricalTrendChartProps) {
  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    if (data.length === 0) return []

    const now = new Date()
    let cutoffDate: Date

    switch (timeRange) {
      case '7d':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '90d':
        cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case 'all':
      default:
        return data
    }

    return data.filter(d => new Date(d.date) >= cutoffDate)
  }, [data, timeRange])

  // Calculate stats for this period
  const periodStats = useMemo(() => {
    if (filteredData.length === 0) return null

    const totalProblems = filteredData.reduce((sum, d) => sum + d.problemCount, 0)
    const totalXP = filteredData.reduce((sum, d) => sum + d.xpEarned, 0)
    const avgAccuracy = filteredData.reduce((sum, d) => sum + d.accuracy, 0) / filteredData.length
    const startAccuracy = filteredData[0]?.accuracy || 0
    const endAccuracy = filteredData[filteredData.length - 1]?.accuracy || 0
    const improvement = endAccuracy - startAccuracy

    return { totalProblems, totalXP, avgAccuracy, improvement, startAccuracy, endAccuracy }
  }, [filteredData])

  // Generate SVG path for the chart
  const chartPath = useMemo(() => {
    if (filteredData.length < 2) return null

    const width = 300
    const height = 80
    const padding = 8

    const maxAccuracy = Math.max(...filteredData.map(d => d.accuracy), 1)
    const minAccuracy = Math.min(...filteredData.map(d => d.accuracy), 0)
    const range = maxAccuracy - minAccuracy || 0.1

    const points = filteredData.map((d, i) => {
      const x = padding + (i / (filteredData.length - 1)) * (width - padding * 2)
      const y = height - padding - ((d.accuracy - minAccuracy) / range) * (height - padding * 2)
      return { x, y, accuracy: d.accuracy, date: d.date }
    })

    // Create smooth bezier curve path
    let pathD = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cpx = (prev.x + curr.x) / 2
      pathD += ` Q ${cpx} ${prev.y} ${cpx} ${(prev.y + curr.y) / 2}`
      pathD += ` Q ${cpx} ${curr.y} ${curr.x} ${curr.y}`
    }

    // Create gradient fill path
    const fillPath =
      pathD +
      ` L ${points[points.length - 1].x} ${height - padding}` +
      ` L ${points[0].x} ${height - padding} Z`

    return { linePath: pathD, fillPath, points, width, height }
  }, [filteredData])

  const formatDateLabel = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 overflow-hidden">
      {/* Header with time range selector */}
      <div className="p-4 border-b border-slate-200 bg-white/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CalendarBlank size={18} weight="fill" className="text-blue-600" />
            <h4 className="font-semibold text-gray-900">Historical Progress</h4>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 p-0.5">
            {(['7d', '30d', '90d', 'all'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => onTimeRangeChange(range)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range === 'all' ? 'All' : range}
              </button>
            ))}
          </div>
        </div>

        {/* Period Stats */}
        {periodStats && (
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {Math.round(periodStats.avgAccuracy * 100)}%
              </div>
              <div className="text-xs text-gray-500">Avg Accuracy</div>
            </div>
            <div className="text-center">
              <div
                className={`text-xl font-bold ${
                  periodStats.improvement >= 0 ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {periodStats.improvement >= 0 ? '+' : ''}
                {Math.round(periodStats.improvement * 100)}%
              </div>
              <div className="text-xs text-gray-500">Change</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{periodStats.totalProblems}</div>
              <div className="text-xs text-gray-500">Problems</div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Area */}
      <div className="p-4">
        {chartPath && filteredData.length >= 2 ? (
          <div className="relative">
            <svg
              viewBox={`0 0 ${chartPath.width} ${chartPath.height}`}
              className="w-full h-24"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <path d={chartPath.fillPath} fill="url(#areaGradient)" />

              <path
                d={chartPath.linePath}
                fill="none"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx={chartPath.points[chartPath.points.length - 1].x}
                cy={chartPath.points[chartPath.points.length - 1].y}
                r="4"
                fill="white"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2"
              />
            </svg>

            {/* Date labels */}
            <div className="flex justify-between mt-1 text-[10px] text-gray-400">
              <span>{formatDateLabel(filteredData[0].date)}</span>
              <span>{formatDateLabel(filteredData[filteredData.length - 1].date)}</span>
            </div>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center text-sm text-gray-400">
            Need more data points for this time range
          </div>
        )}
      </div>

      {/* Footer with milestones */}
      <div className="px-4 pb-4 pt-0 flex items-center justify-between text-xs">
        {learningStartDate && (
          <div className="flex items-center gap-1 text-gray-500">
            <Clock size={12} />
            <span>
              Learning since{' '}
              {new Date(learningStartDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        )}
        {bestStreak && bestStreak > 0 && (
          <div className="flex items-center gap-1 text-orange-600">
            <Trophy size={12} weight="fill" />
            <span>Best streak: {bestStreak} days</span>
          </div>
        )}
        {totalProblems && (
          <div className="flex items-center gap-1 text-gray-500">
            <Target size={12} />
            <span>{totalProblems.toLocaleString()} total problems</span>
          </div>
        )}
      </div>
    </div>
  )
}

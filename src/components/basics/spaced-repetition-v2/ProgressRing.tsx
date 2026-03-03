'use client'

/**
 * ProgressRing
 *
 * SVG circular progress indicator used in the spaced repetition header
 * to show how many review problems have been completed.
 */

interface ProgressRingProps {
  current: number
  total: number
  correctCount: number
}

export function ProgressRing({ current, total, correctCount }: ProgressRingProps) {
  const progress = ((current) / total) * 100
  const radius = 40
  const strokeWidth = 6
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="100" height="100" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--b-border-default)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--b-greek)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold b-text-primary">{current}</span>
        <span className="text-xs b-text-secondary">of {total}</span>
      </div>
    </div>
  )
}

/**
 * Progress Bar Component
 * Displays a visual progress indicator with percentage
 */

interface ProgressBarProps {
  percentage: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

export function ProgressBar({
  percentage,
  className = '',
  showLabel = true,
  size = 'md',
  color = 'blue',
}: ProgressBarProps) {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

  // Size classes
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  // Color classes
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
  }

  // Determine color based on percentage if color is blue (default behavior)
  const getColorClass = () => {
    if (color !== 'blue') return colorClasses[color]

    if (clampedPercentage === 100) return 'bg-green-600'
    if (clampedPercentage >= 75) return 'bg-blue-600'
    if (clampedPercentage >= 50) return 'bg-purple-600'
    if (clampedPercentage >= 25) return 'bg-orange-600'
    return 'bg-gray-400'
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">Progress</span>
          <span className="text-xs font-semibold text-gray-900">
            {clampedPercentage}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <div
          className={`${getColorClass()} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  )
}

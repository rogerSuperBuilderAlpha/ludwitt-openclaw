/**
 * SourceBadge Component
 * Shows where a submission came from (general page or developer-specific page)
 */

import { Globe, UserCheck } from 'lucide-react'

interface SourceBadgeProps {
  source: 'general' | 'developer-specific'
  developerName?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SourceBadge({
  source,
  developerName,
  size = 'md',
  className = '',
}: SourceBadgeProps) {
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-4 h-4',
  }

  if (source === 'general') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 ${sizeStyles[size]} bg-purple-100 text-purple-800 rounded font-medium ${className}`}
      >
        <Globe className={iconSizes[size]} />
        <span>General Page</span>
      </div>
    )
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${sizeStyles[size]} bg-green-100 text-green-800 rounded font-medium ${className}`}
    >
      <UserCheck className={iconSizes[size]} />
      <span>
        {developerName ? `${developerName}'s Page` : 'Developer Page'}
      </span>
    </div>
  )
}

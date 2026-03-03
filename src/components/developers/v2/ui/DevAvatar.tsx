'use client'

import Image from 'next/image'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

interface DevAvatarProps {
  name?: string
  src?: string
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'dev-avatar-xs',
  sm: 'dev-avatar-sm',
  md: 'dev-avatar-md',
  lg: 'dev-avatar-lg',
}

// Generate a consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#F97316', // Orange
    '#22C55E', // Green
    '#3B82F6', // Blue
    '#EAB308', // Yellow
    '#14B8A6', // Teal
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

function getInitials(name: string): string {
  if (!name) return '?'
  
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * DevAvatar - User avatar component with fallback to initials
 */
export function DevAvatar({ 
  name = '', 
  src, 
  size = 'md', 
  className = '' 
}: DevAvatarProps) {
  const initials = getInitials(name)
  const bgColor = getAvatarColor(name)

  return (
    <div 
      className={`dev-avatar ${sizeClasses[size]} ${className}`}
      style={{ background: !src ? bgColor : undefined, position: 'relative' }}
      title={name}
    >
      {src ? (
        <Image src={src} alt={name} fill style={{ objectFit: 'cover' }} />
      ) : (
        initials
      )}
    </div>
  )
}

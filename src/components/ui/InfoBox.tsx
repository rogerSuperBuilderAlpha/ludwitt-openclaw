'use client'

import { ReactNode } from 'react'

interface InfoBoxProps {
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'red' | 'gray'
  title?: string
  icon?: ReactNode
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const colorThemes = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    textLight: 'text-blue-800',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    textLight: 'text-green-800',
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-900',
    textLight: 'text-yellow-800',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-900',
    textLight: 'text-purple-800',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-900',
    textLight: 'text-orange-800',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    textLight: 'text-red-800',
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-900',
    textLight: 'text-gray-800',
  },
}

const sizeClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function InfoBox({
  color = 'blue',
  title,
  icon,
  children,
  className = '',
  size = 'md',
}: InfoBoxProps) {
  const theme = colorThemes[color]
  const padding = sizeClasses[size]

  return (
    <div
      className={`${theme.bg} ${theme.border} border rounded-lg ${padding} ${className}`}
    >
      {title && (
        <h4
          className={`font-medium ${theme.text} mb-2 flex items-center gap-2`}
        >
          {icon}
          {title}
        </h4>
      )}
      <div className={title ? theme.textLight : theme.textLight}>
        {children}
      </div>
    </div>
  )
}

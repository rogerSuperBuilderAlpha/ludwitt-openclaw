'use client'

import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  color?:
    | 'blue'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'orange'
    | 'red'
    | 'gray'
    | 'pink'
    | 'indigo'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'subtle'
  className?: string
}

const colorClasses = {
  blue: {
    solid: 'bg-blue-600 text-white',
    outline: 'border border-blue-600 text-blue-600',
    subtle: 'bg-blue-100 text-blue-700',
  },
  green: {
    solid: 'bg-green-600 text-white',
    outline: 'border border-green-600 text-green-600',
    subtle: 'bg-green-100 text-green-700',
  },
  yellow: {
    solid: 'bg-yellow-600 text-white',
    outline: 'border border-yellow-600 text-yellow-600',
    subtle: 'bg-yellow-100 text-yellow-700',
  },
  purple: {
    solid: 'bg-purple-600 text-white',
    outline: 'border border-purple-600 text-purple-600',
    subtle: 'bg-purple-100 text-purple-700',
  },
  orange: {
    solid: 'bg-orange-600 text-white',
    outline: 'border border-orange-600 text-orange-600',
    subtle: 'bg-orange-100 text-orange-700',
  },
  red: {
    solid: 'bg-red-600 text-white',
    outline: 'border border-red-600 text-red-600',
    subtle: 'bg-red-100 text-red-700',
  },
  gray: {
    solid: 'bg-gray-600 text-white',
    outline: 'border border-gray-600 text-gray-600',
    subtle: 'bg-gray-100 text-gray-700',
  },
  pink: {
    solid: 'bg-pink-600 text-white',
    outline: 'border border-pink-600 text-pink-600',
    subtle: 'bg-pink-100 text-pink-700',
  },
  indigo: {
    solid: 'bg-indigo-600 text-white',
    outline: 'border border-indigo-600 text-indigo-600',
    subtle: 'bg-indigo-100 text-indigo-700',
  },
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

export function Badge({
  children,
  color = 'blue',
  size = 'md',
  variant = 'subtle',
  className = '',
}: BadgeProps) {
  const colors = colorClasses[color]
  const sizes = sizeClasses[size]

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizes} ${colors[variant]} rounded-full font-medium ${className}`}
    >
      {children}
    </span>
  )
}

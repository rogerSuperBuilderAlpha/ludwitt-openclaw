'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      let x = 0
      let y = 0

      switch (position) {
        case 'top':
          x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          y = triggerRect.top - tooltipRect.height - 8
          break
        case 'bottom':
          x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          y = triggerRect.bottom + 8
          break
        case 'left':
          x = triggerRect.left - tooltipRect.width - 8
          y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          break
        case 'right':
          x = triggerRect.right + 8
          y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          break
      }

      // Keep tooltip within viewport
      x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8))
      y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8))

      setCoords({ x, y })
    }
  }, [isVisible, position])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const arrowClasses = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent',
    bottom:
      'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent',
    right:
      'left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent',
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className={`inline-block ${className}`}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg max-w-xs animate-in fade-in zoom-in-95 duration-150"
          style={{ left: coords.x, top: coords.y }}
        >
          {content}
          <div
            className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
          />
        </div>
      )}
    </>
  )
}

// Simple inline tooltip for quick use
export function QuickTip({
  text,
  children,
}: {
  text: string
  children: ReactNode
}) {
  return (
    <Tooltip content={text} position="top" delay={300}>
      {children}
    </Tooltip>
  )
}

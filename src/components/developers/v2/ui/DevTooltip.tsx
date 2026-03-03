'use client'

import { useState, useRef, useEffect } from 'react'

interface DevTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

/**
 * DevTooltip - Hover tooltip component
 */
export function DevTooltip({ 
  content, 
  children, 
  position = 'top',
  delay = 200 
}: DevTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        let x = 0
        let y = 0

        switch (position) {
          case 'top':
            x = rect.left + rect.width / 2
            y = rect.top - 8
            break
          case 'bottom':
            x = rect.left + rect.width / 2
            y = rect.bottom + 8
            break
          case 'left':
            x = rect.left - 8
            y = rect.top + rect.height / 2
            break
          case 'right':
            x = rect.right + 8
            y = rect.top + rect.height / 2
            break
        }

        setCoords({ x, y })
        setIsVisible(true)
      }
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getTooltipStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      zIndex: 50,
    }

    switch (position) {
      case 'top':
        return { ...base, left: coords.x, top: coords.y, transform: 'translate(-50%, -100%)' }
      case 'bottom':
        return { ...base, left: coords.x, top: coords.y, transform: 'translate(-50%, 0)' }
      case 'left':
        return { ...base, left: coords.x, top: coords.y, transform: 'translate(-100%, -50%)' }
      case 'right':
        return { ...base, left: coords.x, top: coords.y, transform: 'translate(0, -50%)' }
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ display: 'inline-flex' }}
      >
        {children}
      </div>
      {isVisible && (
        <div 
          ref={tooltipRef}
          className="dev-tooltip"
          style={getTooltipStyle()}
        >
          {content}
        </div>
      )}
    </>
  )
}

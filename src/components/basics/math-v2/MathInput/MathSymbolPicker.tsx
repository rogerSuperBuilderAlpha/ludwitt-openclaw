'use client'

import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react'
import { SYMBOL_CATEGORIES, CATEGORY_ORDER } from './math-symbols'
import type { SymbolCategory } from './math-symbols'

interface MathSymbolPickerProps {
  onInsert: (symbol: string) => void
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement | null>
}

export function MathSymbolPicker({ onInsert, onClose, anchorRef }: MathSymbolPickerProps) {
  const [activeTab, setActiveTab] = useState<SymbolCategory>('arithmetic')
  const pickerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 400 })

  // Calculate position based on anchor element
  useLayoutEffect(() => {
    if (!anchorRef.current) return

    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect()
      if (!rect) return

      const pickerWidth = Math.min(480, window.innerWidth - 32)
      const pickerHeight = 400 // Approximate height

      // Calculate left position - align to left of button, but keep within viewport
      let left = rect.left
      if (left + pickerWidth > window.innerWidth - 16) {
        left = window.innerWidth - pickerWidth - 16
      }
      if (left < 16) left = 16

      // Calculate top position - prefer below, but go above if not enough space
      let top = rect.bottom + 8
      if (top + pickerHeight > window.innerHeight - 16) {
        // Position above the button instead
        top = rect.top - pickerHeight - 8
        if (top < 16) top = 16
      }

      setPosition({ top, left, width: pickerWidth })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [anchorRef])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    // Delay to prevent immediate close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, anchorRef])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Render as portal to body so it's always on top
  return createPortal(
    <div
      ref={pickerRef}
      className="fixed z-[9999] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        maxWidth: 480,
        minWidth: 320,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-700">Math Symbols</span>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X size={16} weight="bold" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/50 px-2 gap-1 py-1.5 scrollbar-hide">
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === cat
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="mr-1.5">{SYMBOL_CATEGORIES[cat].icon}</span>
            <span className="hidden sm:inline">{SYMBOL_CATEGORIES[cat].name}</span>
          </button>
        ))}
      </div>

      {/* Symbol Grid */}
      <div className="p-3 max-h-64 overflow-y-auto">
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
          {SYMBOL_CATEGORIES[activeTab].symbols.map((sym, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onInsert(sym.insert)}
              title={sym.label}
              className="p-2 text-center text-lg hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-200 active:scale-95"
            >
              {sym.display}
            </button>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Click a symbol to insert • Press Esc to close
        </p>
      </div>
    </div>,
    document.body
  )
}

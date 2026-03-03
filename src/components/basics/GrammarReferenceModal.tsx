/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * Grammar Reference Modal
 * A beautifully designed modal for exploring Latin or Greek grammar tables
 */

import { useState, useRef, useEffect } from 'react'
import {
  BookBookmark,
  CaretLeft,
  CaretRight,
  X,
  Scroll,
  Table,
} from '@phosphor-icons/react'
import FocusTrap from 'focus-trap-react'
import { ClassicalLanguage } from '@/lib/types/basics'
import {
  LATIN_GRAMMAR,
  GREEK_GRAMMAR,
  GrammarReference,
} from '@/data/basics/grammar'
import { Portal } from './Portal'

interface GrammarReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  language: ClassicalLanguage
}

// Category icon backgrounds for visual variety
const CATEGORY_COLORS = [
  {
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    shadow: 'rgba(102, 126, 234, 0.3)',
  },
  {
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    shadow: 'rgba(240, 147, 251, 0.3)',
  },
  {
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    shadow: 'rgba(79, 172, 254, 0.3)',
  },
  {
    bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    shadow: 'rgba(67, 233, 123, 0.3)',
  },
  {
    bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    shadow: 'rgba(250, 112, 154, 0.3)',
  },
  {
    bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    shadow: 'rgba(168, 237, 234, 0.3)',
  },
  {
    bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    shadow: 'rgba(255, 154, 158, 0.3)',
  },
  {
    bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    shadow: 'rgba(255, 236, 210, 0.3)',
  },
]

export function GrammarReferenceModal({
  isOpen,
  onClose,
  language,
}: GrammarReferenceModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const grammar: GrammarReference =
    language === 'latin' ? LATIN_GRAMMAR : GREEK_GRAMMAR
  const languageName = language === 'latin' ? 'Latin' : 'Greek'
  const isLatin = language === 'latin'

  // Theme colors based on language
  const theme = {
    primary: isLatin ? '#8B5CF6' : '#3B82F6',
    secondary: isLatin ? '#A78BFA' : '#60A5FA',
    gradient: isLatin
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
    lightBg: isLatin ? '#F5F3FF' : '#EFF6FF',
    accent: isLatin ? '#7C3AED' : '#2563EB',
  }

  const handleClose = () => {
    setSelectedCategory(null)
    setSelectedItem(null)
    onClose()
  }

  const handleBack = () => {
    if (selectedItem !== null) {
      setSelectedItem(null)
    } else {
      setSelectedCategory(null)
    }
  }

  // Get current title based on navigation state
  const getTitle = () => {
    if (selectedItem !== null && selectedCategory !== null) {
      return grammar.categories[selectedCategory].items[selectedItem].name
    }
    if (selectedCategory !== null) {
      return grammar.categories[selectedCategory].name
    }
    return `${languageName} Grammar`
  }

  // Get subtitle based on navigation state
  const getSubtitle = () => {
    if (selectedCategory !== null && selectedItem === null) {
      return (
        grammar.categories[selectedCategory].description ||
        'Select a form to view'
      )
    }
    if (selectedCategory === null) {
      return `Master ${languageName.toLowerCase()} morphology`
    }
    return null
  }

  // Breadcrumb path
  const getBreadcrumb = () => {
    const parts = [`${languageName} Grammar`]
    if (selectedCategory !== null) {
      parts.push(grammar.categories[selectedCategory].name)
    }
    if (selectedItem !== null && selectedCategory !== null) {
      parts.push(grammar.categories[selectedCategory].items[selectedItem].name)
    }
    return parts
  }

  return (
    <Portal>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="grammar-reference-modal-title"
            className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              boxShadow:
                '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Header */}
            <div
              className="relative px-6 py-5 flex-shrink-0"
              style={{
                background: theme.gradient,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Decorative pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedCategory !== null || selectedItem !== null ? (
                    <button
                      onClick={handleBack}
                      className="p-2 -ml-2 rounded-xl hover:bg-white/20 transition-all duration-200"
                      aria-label="Back"
                    >
                      <CaretLeft size={22} weight="bold" color="white" />
                    </button>
                  ) : (
                    <div
                      className="p-2.5 rounded-xl"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <Scroll size={24} weight="fill" color="white" />
                    </div>
                  )}
                  <div>
                    <h2
                      id="grammar-reference-modal-title"
                      className="text-xl font-bold text-white tracking-tight"
                    >
                      {getTitle()}
                    </h2>
                    {getSubtitle() && (
                      <p className="text-sm text-white/80 mt-0.5">
                        {getSubtitle()}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200"
                  aria-label="Close"
                >
                  <X size={22} weight="bold" color="white" />
                </button>
              </div>

              {/* Breadcrumb for deeper navigation */}
              {selectedCategory !== null && (
                <div className="relative flex items-center gap-2 mt-3 text-xs text-white/60">
                  {getBreadcrumb().map((part, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {i > 0 && <span>›</span>}
                      <span
                        className={
                          i === getBreadcrumb().length - 1
                            ? 'text-white/90'
                            : ''
                        }
                      >
                        {part}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ backgroundColor: theme.lightBg }}
            >
              {selectedCategory === null ? (
                // Categories Grid
                <div className="p-5 grid grid-cols-1 gap-3">
                  {grammar.categories.map((category, idx) => {
                    const colorScheme =
                      CATEGORY_COLORS[idx % CATEGORY_COLORS.length]
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedCategory(idx)}
                        className="group relative w-full text-left p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                        style={{
                          backgroundColor: '#ffffff',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                        }}
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon with gradient background */}
                          <div
                            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                            style={{
                              background: colorScheme.bg,
                              boxShadow: `0 4px 12px ${colorScheme.shadow}`,
                            }}
                          >
                            {category.icon}
                          </div>

                          {/* Text content */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-base">
                              {category.name}
                            </p>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {category.items.length}{' '}
                              {category.items.length === 1
                                ? 'paradigm'
                                : 'paradigms'}
                            </p>
                          </div>

                          {/* Arrow */}
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                            style={{ backgroundColor: theme.lightBg }}
                          >
                            <CaretRight
                              size={18}
                              weight="bold"
                              style={{ color: theme.primary }}
                            />
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : selectedItem === null ? (
                // Items List within a Category
                <div className="p-5 grid grid-cols-1 gap-2">
                  {grammar.categories[selectedCategory].items.map(
                    (item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedItem(idx)}
                        className="group relative w-full text-left p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: '#ffffff',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {/* Table icon */}
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: theme.lightBg }}
                          >
                            <Table
                              size={20}
                              weight="duotone"
                              style={{ color: theme.primary }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">
                              {item.name}
                            </p>
                            {item.example && (
                              <p
                                className="text-sm mt-0.5 font-mono truncate"
                                style={{ color: theme.accent }}
                              >
                                {item.example}
                              </p>
                            )}
                          </div>

                          {/* Arrow */}
                          <CaretRight
                            size={18}
                            weight="bold"
                            className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                            style={{ color: theme.secondary }}
                          />
                        </div>
                      </button>
                    )
                  )}
                </div>
              ) : (
                // Detail View with Table
                <div className="p-5">
                  {(() => {
                    const item =
                      grammar.categories[selectedCategory].items[selectedItem]
                    return (
                      <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                          backgroundColor: '#ffffff',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                        }}
                      >
                        {item.example && (
                          <div
                            className="px-5 py-3 border-b text-center"
                            style={{
                              backgroundColor: theme.lightBg,
                              borderColor: 'rgba(0, 0, 0, 0.06)',
                            }}
                          >
                            <p
                              className="text-sm font-mono font-medium"
                              style={{ color: theme.accent }}
                            >
                              {item.example}
                            </p>
                          </div>
                        )}

                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr style={{ background: theme.gradient }}>
                                {item.table[0].map(
                                  (header: string, i: number) => (
                                    <th
                                      key={i}
                                      className="px-4 py-3 text-left font-semibold text-white whitespace-nowrap first:pl-5 last:pr-5"
                                    >
                                      {header}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {item.table
                                .slice(1)
                                .map((row: string[], rowIdx: number) => (
                                  <tr
                                    key={rowIdx}
                                    className="border-b last:border-b-0 transition-colors hover:bg-gray-50"
                                    style={{
                                      borderColor: 'rgba(0, 0, 0, 0.05)',
                                    }}
                                  >
                                    {row.map(
                                      (cell: string, cellIdx: number) => (
                                        <td
                                          key={cellIdx}
                                          className="px-4 py-3 first:pl-5 last:pr-5"
                                          style={{
                                            fontWeight:
                                              cellIdx === 0 ? 500 : 400,
                                            color:
                                              cellIdx === 0
                                                ? '#6B7280'
                                                : theme.accent,
                                            fontFamily:
                                              cellIdx === 0
                                                ? 'inherit'
                                                : 'var(--font-mono, ui-monospace, monospace)',
                                          }}
                                        >
                                          {cell}
                                        </td>
                                      )
                                    )}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>

            {/* Footer - only show in category view */}
            {selectedCategory === null && (
              <div
                className="flex-shrink-0 px-5 py-4 border-t"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-2">
                    <BookBookmark
                      size={14}
                      weight="fill"
                      style={{ color: theme.primary }}
                    />
                    {grammar.categories.reduce(
                      (sum, cat) => sum + cat.items.length,
                      0
                    )}{' '}
                    total paradigms
                  </span>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100"
                    style={{ color: theme.primary }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </FocusTrap>
      </div>
    </Portal>
  )
}

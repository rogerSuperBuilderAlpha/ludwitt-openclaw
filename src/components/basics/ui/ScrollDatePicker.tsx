'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface ScrollDatePickerProps {
  value: string // YYYY-MM-DD format
  onChange: (value: string) => void
  maxDate?: Date
  minYear?: number
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const ITEM_HEIGHT = 44

interface ScrollColumnProps {
  items: { value: number; label: string }[]
  selected: number
  onChange: (value: number) => void
  label: string
}

// CSS to hide scrollbars
const scrollbarHideStyle = `
  .scroll-picker-column::-webkit-scrollbar {
    display: none;
  }
`

function ScrollColumn({ items, selected, onChange, label }: ScrollColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [isDragging, setIsDragging] = useState(false)

  // Scroll to selected item on mount and when selected changes
  useEffect(() => {
    if (containerRef.current && !isDragging) {
      const index = items.findIndex((item) => item.value === selected)
      if (index !== -1) {
        containerRef.current.scrollTo({
          top: index * ITEM_HEIGHT,
          behavior: 'smooth',
        })
      }
    }
  }, [selected, items, isDragging])

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const scrollTop = containerRef.current.scrollTop
    const index = Math.round(scrollTop / ITEM_HEIGHT)
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1))

    if (items[clampedIndex] && items[clampedIndex].value !== selected) {
      onChange(items[clampedIndex].value)
    }
  }, [items, selected, onChange])

  const handleScrollEnd = useCallback(() => {
    if (!containerRef.current) return
    setIsDragging(false)

    // Snap to nearest item
    const scrollTop = containerRef.current.scrollTop
    const index = Math.round(scrollTop / ITEM_HEIGHT)
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1))

    containerRef.current.scrollTo({
      top: clampedIndex * ITEM_HEIGHT,
      behavior: 'smooth',
    })

    if (items[clampedIndex]) {
      onChange(items[clampedIndex].value)
    }
  }, [items, onChange])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTimeout: NodeJS.Timeout

    const onScroll = () => {
      setIsDragging(true)
      handleScroll()
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScrollEnd, 100)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', onScroll)
      clearTimeout(scrollTimeout)
    }
  }, [handleScroll, handleScrollEnd])

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-medium text-gray-500 mb-2">{label}</span>
      <div className="relative h-[132px] overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-11 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-11 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        {/* Selection highlight */}
        <div className="absolute inset-x-0 top-11 h-11 bg-indigo-50 border-y border-indigo-200 z-0" />

        {/* Scrollable list */}
        <style>{scrollbarHideStyle}</style>
        <div
          ref={containerRef}
          className="scroll-picker-column h-full overflow-y-auto relative z-5"
          role="listbox"
          aria-label={label}
          style={{
            scrollSnapType: 'y mandatory',
            paddingTop: ITEM_HEIGHT,
            paddingBottom: ITEM_HEIGHT,
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map((item, index) => (
            <button
              key={item.value}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              onClick={() => onChange(item.value)}
              onKeyDown={(event) => {
                const currentIndex = items.findIndex(
                  (entry) => entry.value === selected
                )
                if (currentIndex === -1) return

                const moveToIndex = (nextIndex: number) => {
                  const nextItem = items[nextIndex]
                  if (!nextItem) return
                  onChange(nextItem.value)
                  const nextButton = itemRefs.current[nextIndex]
                  if (nextButton) {
                    nextButton.focus()
                    nextButton.scrollIntoView({ block: 'center' })
                  }
                }

                switch (event.key) {
                  case 'ArrowUp':
                  case 'ArrowLeft':
                    event.preventDefault()
                    moveToIndex(Math.max(0, currentIndex - 1))
                    break
                  case 'ArrowDown':
                  case 'ArrowRight':
                    event.preventDefault()
                    moveToIndex(Math.min(items.length - 1, currentIndex + 1))
                    break
                  case 'Home':
                    event.preventDefault()
                    moveToIndex(0)
                    break
                  case 'End':
                    event.preventDefault()
                    moveToIndex(items.length - 1)
                    break
                  default:
                    break
                }
              }}
              role="option"
              aria-selected={item.value === selected}
              className={`w-full h-11 flex items-center justify-center text-lg transition-all ${
                item.value === selected
                  ? 'text-indigo-700 font-bold'
                  : 'text-gray-400 font-medium'
              }`}
              style={{ scrollSnapAlign: 'center' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ScrollDatePicker({
  value,
  onChange,
  maxDate = new Date(),
  minYear = 1920,
}: ScrollDatePickerProps) {
  // Parse initial value or use defaults
  // Default to 2010 for better typical K-12 user experience
  const parseDate = (dateStr: string) => {
    if (!dateStr) {
      return { month: 1, day: 1, year: 2010 }
    }
    const [year, month, day] = dateStr.split('-').map(Number)
    return {
      month: month || 1,
      day: day || 1,
      year: year || 2010,
    }
  }

  // Calculate age from selected date
  const calculateAge = (year: number, month: number, day: number): number => {
    const today = new Date()
    const birthDate = new Date(year, month - 1, day)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return age
  }

  const [selectedMonth, setSelectedMonth] = useState(
    () => parseDate(value).month
  )
  const [selectedDay, setSelectedDay] = useState(() => parseDate(value).day)
  const [selectedYear, setSelectedYear] = useState(() => parseDate(value).year)

  // Update parent when any value changes
  useEffect(() => {
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    if (dateStr !== value) {
      onChange(dateStr)
    }
  }, [selectedMonth, selectedDay, selectedYear, onChange, value])

  // Generate year options
  const currentYear = maxDate.getFullYear()
  const years = Array.from({ length: currentYear - minYear + 1 }, (_, i) => ({
    value: currentYear - i,
    label: String(currentYear - i),
  }))

  // Generate month options
  const months = MONTHS.map((name, i) => ({
    value: i + 1,
    label: name.slice(0, 3),
  }))

  // Generate day options based on selected month/year
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }))

  // Clamp day if month changes and current day is out of range
  useEffect(() => {
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth)
    }
  }, [selectedMonth, selectedYear, daysInMonth, selectedDay])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-start gap-2">
        <ScrollColumn
          items={months}
          selected={selectedMonth}
          onChange={setSelectedMonth}
          label="Month"
        />
        <ScrollColumn
          items={days}
          selected={selectedDay}
          onChange={setSelectedDay}
          label="Day"
        />
        <ScrollColumn
          items={years}
          selected={selectedYear}
          onChange={setSelectedYear}
          label="Year"
        />
      </div>

      {/* Display selected date and age */}
      <div className="text-center">
        <div className="text-sm text-gray-500">
          {MONTHS[selectedMonth - 1]} {selectedDay}, {selectedYear}
        </div>
        {selectedYear && selectedMonth && selectedDay && (
          <div className="text-xs text-indigo-600 font-medium mt-1">
            {calculateAge(selectedYear, selectedMonth, selectedDay)} years old
          </div>
        )}
      </div>
    </div>
  )
}

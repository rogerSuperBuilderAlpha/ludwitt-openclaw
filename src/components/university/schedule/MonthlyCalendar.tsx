'use client'

import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import type { DaySummary } from '@/lib/hooks/useScheduleEvents'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface MonthlyCalendarProps {
  month: number // 1-indexed
  year: number
  daySummaries: Record<string, DaySummary>
  selectedDate: string | null // YYYY-MM-DD
  onSelectDate: (date: string) => void
  onChangeMonth: (month: number, year: number) => void
}

export function MonthlyCalendar({
  month,
  year,
  daySummaries,
  selectedDate,
  onSelectDate,
  onChangeMonth,
}: MonthlyCalendarProps) {
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  function handlePrev() {
    if (month === 1) onChangeMonth(12, year - 1)
    else onChangeMonth(month - 1, year)
  }

  function handleNext() {
    if (month === 12) onChangeMonth(1, year + 1)
    else onChangeMonth(month + 1, year)
  }

  // Build grid cells
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrev}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <h3 className="text-sm font-semibold text-gray-900">
          {MONTH_NAMES[month - 1]} {year}
        </h3>
        <button
          onClick={handleNext}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(label => (
          <div key={label} className="text-center text-[10px] font-medium text-gray-400 py-1">
            {label}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-10" />
          }

          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isToday = dateStr === todayStr
          const isSelected = dateStr === selectedDate
          const summary = daySummaries[dateStr]

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDate(dateStr)}
              className={`h-10 flex flex-col items-center justify-center rounded-lg transition-colors relative ${
                isSelected
                  ? 'bg-gray-900 text-white'
                  : isToday
                  ? 'border border-gray-900 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xs font-medium">{day}</span>
              {/* Dots */}
              {summary && (
                <div className="flex items-center gap-0.5 mt-0.5">
                  {summary.classCount > 0 && (
                    <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-gray-400' : 'bg-gray-400'}`} />
                  )}
                  {summary.bookedCount > 0 && (
                    <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-blue-300' : 'bg-blue-500'}`} />
                  )}
                  {summary.availableCount > 0 && (
                    <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-green-300' : 'bg-green-500'}`} />
                  )}
                  {summary.googleCount > 0 && (
                    <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-amber-500'}`} />
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap mt-3 pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1 text-[10px] text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Class
        </span>
        <span className="flex items-center gap-1 text-[10px] text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Booked
        </span>
        <span className="flex items-center gap-1 text-[10px] text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Available
        </span>
        <span className="flex items-center gap-1 text-[10px] text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Google
        </span>
      </div>
    </div>
  )
}

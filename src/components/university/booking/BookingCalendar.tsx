'use client'

import { useState, useMemo } from 'react'
import { CircleNotch, CalendarBlank, Check } from '@phosphor-icons/react'
import { useAvailableSlots } from '@/lib/hooks/useAvailableSlots'
import { useBookSlot } from '@/lib/hooks/useBookSlot'
import type { AvailableSlot } from '@/lib/types/university'

interface BookingCalendarProps {
  professorId: string
  professorName: string
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function BookingCalendar({ professorId, professorName }: BookingCalendarProps) {
  const { slots, loading, error, refetch } = useAvailableSlots(professorId)
  const { bookSlot, isBooking, error: bookError } = useBookSlot()

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null)
  const [notes, setNotes] = useState('')
  const [booked, setBooked] = useState(false)

  // Group slots by date
  const slotsByDate = useMemo(() => {
    const map = new Map<string, AvailableSlot[]>()
    for (const slot of slots) {
      const existing = map.get(slot.date) || []
      existing.push(slot)
      map.set(slot.date, existing)
    }
    return map
  }, [slots])

  const dates = useMemo(() => [...slotsByDate.keys()].sort(), [slotsByDate])
  const slotsForDate = selectedDate ? (slotsByDate.get(selectedDate) || []) : []

  async function handleBook() {
    if (!selectedSlot) return
    setBooked(false)

    const result = await bookSlot({
      professorId,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      ...(notes.trim() && { notes: notes.trim() }),
    })

    if (result.success) {
      setBooked(true)
      setSelectedSlot(null)
      setNotes('')
      refetch()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <CircleNotch size={20} className="text-gray-400 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
        {error}
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-6 text-center">
        <CalendarBlank size={24} weight="duotone" className="text-gray-300 mx-auto mb-2" />
        <p className="text-xs text-gray-500">No available office hours in the next 14 days.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-gray-900">Book Office Hours with {professorName}</h4>

      {booked && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <Check size={14} className="text-green-600" />
          <p className="text-xs text-green-700">Booking confirmed!</p>
        </div>
      )}

      {bookError && (
        <p className="text-xs text-red-600">{bookError}</p>
      )}

      {/* Date picker row */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {dates.map(dateStr => {
          const d = new Date(dateStr + 'T00:00:00')
          const dayName = DAY_NAMES[d.getDay()].slice(0, 3)
          const dayNum = d.getDate()
          const monthName = d.toLocaleDateString('en-US', { month: 'short' })
          const isSelected = selectedDate === dateStr
          const slotCount = slotsByDate.get(dateStr)?.length || 0

          return (
            <button
              key={dateStr}
              onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null) }}
              className={`flex flex-col items-center px-3 py-2 rounded-lg border text-xs shrink-0 transition-colors ${
                isSelected
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="font-medium">{dayName}</span>
              <span className={`text-base font-bold ${isSelected ? '' : 'text-gray-900'}`}>{dayNum}</span>
              <span className={isSelected ? 'text-gray-300' : 'text-gray-400'}>{monthName}</span>
              <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                {slotCount} slot{slotCount !== 1 ? 's' : ''}
              </span>
            </button>
          )
        })}
      </div>

      {/* Slot picker for selected date */}
      {selectedDate && slotsForDate.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Available times:</p>
          <div className="flex flex-wrap gap-2">
            {slotsForDate.map((slot, i) => {
              const isSelected = selectedSlot?.startTime === slot.startTime && selectedSlot?.date === slot.date
              return (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Confirmation */}
      {selectedSlot && (
        <div className="border border-gray-200 rounded-lg p-3 space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-700 mb-1">
              Confirm: {new Date(selectedSlot.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}, {selectedSlot.startTime} - {selectedSlot.endTime}
            </p>
          </div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add a note (optional) — what would you like to discuss?"
            maxLength={500}
            rows={2}
            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <button
            onClick={handleBook}
            disabled={isBooking}
            className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isBooking && <CircleNotch size={12} className="animate-spin" />}
            {isBooking ? 'Booking...' : 'Book This Slot'}
          </button>
        </div>
      )}
    </div>
  )
}

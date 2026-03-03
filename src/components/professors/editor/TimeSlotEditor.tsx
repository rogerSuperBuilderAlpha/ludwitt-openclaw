/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState } from 'react'
import { Plus, Trash, CircleNotch } from '@phosphor-icons/react'
import { useTimeSlots } from '@/lib/hooks/useTimeSlots'
import type { ProfessorTimeSlot, DayOfWeek } from '@/lib/types/university'

interface TimeSlotEditorProps {
  initialSlots?: ProfessorTimeSlot[]
  onSaved?: (slots: ProfessorTimeSlot[]) => void
}

const DAYS: { value: DayOfWeek; label: string }[] = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
]

const DURATIONS = [15, 30, 45, 60] as const

interface SlotDraft {
  day: DayOfWeek
  startTime: string
  endTime: string
  slotDurationMinutes: 15 | 30 | 45 | 60
}

const DEFAULT_SLOT: SlotDraft = {
  day: 'monday',
  startTime: '09:00',
  endTime: '10:00',
  slotDurationMinutes: 30,
}

export function TimeSlotEditor({
  initialSlots = [],
  onSaved,
}: TimeSlotEditorProps) {
  const [slots, setSlots] = useState<SlotDraft[]>(
    initialSlots.length > 0
      ? initialSlots.map((s) => ({
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
          slotDurationMinutes: s.slotDurationMinutes,
        }))
      : []
  )
  const [saveSuccess, setSaveSuccess] = useState(false)
  const { saveTimeSlots, isSaving, error } = useTimeSlots()

  function addSlot() {
    if (slots.length >= 20) return
    setSlots([...slots, { ...DEFAULT_SLOT }])
    setSaveSuccess(false)
  }

  function removeSlot(index: number) {
    setSlots(slots.filter((_, i) => i !== index))
    setSaveSuccess(false)
  }

  function updateSlot(
    index: number,
    field: keyof SlotDraft,
    value: string | number
  ) {
    setSlots((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    )
    setSaveSuccess(false)
  }

  async function handleSave() {
    setSaveSuccess(false)
    const result = await saveTimeSlots(slots)
    if (result.success && result.data) {
      setSaveSuccess(true)
      onSaved?.(result.data)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Office Hours Time Slots
        </h3>
        <button
          type="button"
          onClick={addSlot}
          disabled={slots.length >= 20}
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={12} weight="bold" />
          Add Slot
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Define your weekly recurring office hours. Students will be able to book
        specific time slots.
      </p>

      {slots.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-6 text-center">
          <p className="text-xs text-gray-500">
            No time slots configured. Add a slot to enable student booking.
          </p>
        </div>
      )}

      {slots.map((slot, index) => (
        <div
          key={index}
          className="flex items-end gap-2 bg-white border border-gray-200 rounded-lg p-3"
        >
          <div className="flex-1 grid grid-cols-4 gap-2">
            <div>
              <label className="block text-[10px] font-medium text-gray-500 uppercase mb-1">
                Day
              </label>
              <select
                value={slot.day}
                onChange={(e) => updateSlot(index, 'day', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {DAYS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-500 uppercase mb-1">
                Start
              </label>
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) => updateSlot(index, 'startTime', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-500 uppercase mb-1">
                End
              </label>
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) => updateSlot(index, 'endTime', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-500 uppercase mb-1">
                Duration
              </label>
              <select
                value={slot.slotDurationMinutes}
                onChange={(e) =>
                  updateSlot(
                    index,
                    'slotDurationMinutes',
                    Number(e.target.value)
                  )
                }
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d} min
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeSlot(index)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors shrink-0"
          >
            <Trash size={14} />
          </button>
        </div>
      ))}

      {error && <p className="text-xs text-red-600">{error}</p>}

      {saveSuccess && (
        <p className="text-xs text-green-600">Time slots saved successfully.</p>
      )}

      {slots.length > 0 && (
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving && <CircleNotch size={12} className="animate-spin" />}
          {isSaving ? 'Saving...' : 'Save Time Slots'}
        </button>
      )}
    </div>
  )
}

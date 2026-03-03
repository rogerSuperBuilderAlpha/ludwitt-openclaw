'use client'

import { useState } from 'react'
import { CalendarBlank } from '@phosphor-icons/react'

interface ScheduleSessionFormProps {
  studyRoomId: string
  onSubmit: (data: {
    studyRoomId: string
    title: string
    description?: string
    scheduledAt: string
    durationMinutes: number
  }) => Promise<void>
  onCancel: () => void
}

const DURATION_OPTIONS = [
  { value: 30, label: '30 min' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
]

export function ScheduleSessionForm({ studyRoomId, onSubmit, onCancel }: ScheduleSessionFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !date || !time) return

    setSubmitting(true)
    setError(null)

    try {
      const scheduledAt = new Date(`${date}T${time}`).toISOString()

      await onSubmit({
        studyRoomId,
        title: title.trim(),
        description: description.trim() || undefined,
        scheduledAt,
        durationMinutes,
      })

      // Reset form
      setTitle('')
      setDescription('')
      setDate('')
      setTime('')
      setDurationMinutes(60)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule session')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <CalendarBlank size={16} className="text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-900">Schedule a Session</h3>
      </div>

      {error && (
        <div className="mb-3 p-2 text-xs text-red-700 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {/* Title */}
      <div className="mb-3">
        <label htmlFor="session-title" className="block text-xs font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="session-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Chapter 3 Review"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="session-description" className="block text-xs font-medium text-gray-700 mb-1">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="session-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What will the session cover?"
          rows={2}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 resize-none"
        />
      </div>

      {/* Date & Time */}
      <div className="flex gap-3 mb-3">
        <div className="flex-1">
          <label htmlFor="session-date" className="block text-xs font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="session-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="session-time" className="block text-xs font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            id="session-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
            required
          />
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label htmlFor="session-duration" className="block text-xs font-medium text-gray-700 mb-1">
          Duration
        </label>
        <select
          id="session-duration"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
        >
          {DURATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={submitting || !title.trim() || !date || !time}
          className="px-4 py-2 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Scheduling...' : 'Schedule Session'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

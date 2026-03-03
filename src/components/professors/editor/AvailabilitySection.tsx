/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState } from 'react'
import { X } from '@phosphor-icons/react'
import type {
  ProfessorProfile,
  ProfessorAvailability,
} from '@/lib/types/university'

interface AvailabilitySectionProps {
  formData: Partial<ProfessorProfile>
  updateField: <K extends keyof ProfessorProfile>(
    key: K,
    value: ProfessorProfile[K]
  ) => void
}

const AVAILABILITY_OPTIONS: {
  value: ProfessorAvailability | ''
  label: string
}[] = [
  { value: '', label: 'Not set' },
  { value: 'accepting', label: 'Accepting students' },
  { value: 'limited', label: 'Limited availability' },
  { value: 'unavailable', label: 'Unavailable' },
]

export function AvailabilitySection({
  formData,
  updateField,
}: AvailabilitySectionProps) {
  const [langInput, setLangInput] = useState('')
  const languages = formData.languages || []

  function handleLangKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const val = langInput.trim()
      if (val && !languages.includes(val) && languages.length < 10) {
        updateField('languages', [...languages, val])
      }
      setLangInput('')
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Availability & Location
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="prof-availability"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Availability
          </label>
          <select
            id="prof-availability"
            value={formData.availability || ''}
            onChange={(e) =>
              updateField(
                'availability',
                (e.target.value || undefined) as
                  | ProfessorAvailability
                  | undefined
              )
            }
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            {AVAILABILITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="prof-location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <input
            id="prof-location"
            type="text"
            value={formData.location || ''}
            onChange={(e) =>
              updateField('location', e.target.value || undefined)
            }
            placeholder="e.g. Cambridge, MA"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="prof-timezone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Timezone
        </label>
        <input
          id="prof-timezone"
          type="text"
          value={formData.timezone || ''}
          onChange={(e) => updateField('timezone', e.target.value || undefined)}
          placeholder="e.g. EST (UTC-5)"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="prof-officehours"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Office Hours
          <span className="text-gray-400 font-normal ml-1">
            ({(formData.officeHours || '').length}/500)
          </span>
        </label>
        <textarea
          id="prof-officehours"
          value={formData.officeHours || ''}
          onChange={(e) =>
            updateField('officeHours', e.target.value.slice(0, 500))
          }
          placeholder="e.g. Tuesdays & Thursdays, 2-4pm EST"
          rows={2}
          maxLength={500}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Languages
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full"
            >
              {lang}
              <button
                type="button"
                onClick={() =>
                  updateField(
                    'languages',
                    languages.filter((l) => l !== lang)
                  )
                }
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={10} weight="bold" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={langInput}
          onChange={(e) => setLangInput(e.target.value)}
          onKeyDown={handleLangKeyDown}
          placeholder="Type a language and press Enter"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { X } from '@phosphor-icons/react'
import type { ProfessorProfile } from '@/lib/types/university'

interface SpecialtiesSectionProps {
  formData: Partial<ProfessorProfile>
  updateField: <K extends keyof ProfessorProfile>(key: K, value: ProfessorProfile[K]) => void
}

export function SpecialtiesSection({ formData, updateField }: SpecialtiesSectionProps) {
  const [input, setInput] = useState('')
  const specialties = formData.specialties || []

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const val = input.trim()
      if (val && !specialties.includes(val)) {
        updateField('specialties', [...specialties, val])
      }
      setInput('')
    }
  }

  function remove(tag: string) {
    updateField('specialties', specialties.filter(s => s !== tag))
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900">Specialties</h3>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {specialties.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
            {tag}
            <button type="button" onClick={() => remove(tag)} className="text-gray-400 hover:text-gray-600">
              <X size={10} weight="bold" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a specialty and press Enter"
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
      />
    </div>
  )
}

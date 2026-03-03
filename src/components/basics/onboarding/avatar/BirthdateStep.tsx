'use client'

import { Calendar, Shield } from 'lucide-react'
import { ScrollDatePicker } from '@/components/basics/ui/ScrollDatePicker'

interface BirthdateStepProps {
  birthDate: string
  onBirthDateChange: (value: string) => void
  isOver18: boolean | null
}

export function BirthdateStep({
  birthDate,
  onBirthDateChange,
  isOver18,
}: BirthdateStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 mb-2">
        <Calendar className="w-10 h-10 text-indigo-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          When&apos;s your birthday?
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          We use this to personalize your experience and keep you safe
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        <ScrollDatePicker
          value={birthDate}
          onChange={onBirthDateChange}
          maxDate={new Date()}
          minYear={1920}
        />
      </div>

      {isOver18 !== null && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isOver18
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-violet-100 text-violet-700'
          }`}
        >
          <Shield className="w-4 h-4" />
          {isOver18 ? 'Adult account' : 'Under 18 - Extra privacy protection'}
        </div>
      )}
    </div>
  )
}

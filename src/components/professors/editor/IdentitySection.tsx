'use client'

import type { ProfessorProfile } from '@/lib/types/university'

const TITLE_OPTIONS = ['', 'Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mx.']

interface IdentitySectionProps {
  formData: Partial<ProfessorProfile>
  updateField: <K extends keyof ProfessorProfile>(key: K, value: ProfessorProfile[K]) => void
}

export function IdentitySection({ formData, updateField }: IdentitySectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Identity</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="prof-title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <select
            id="prof-title"
            value={formData.title || ''}
            onChange={e => updateField('title', e.target.value || undefined)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            {TITLE_OPTIONS.map(t => (
              <option key={t} value={t}>{t || '(none)'}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="prof-name" className="block text-sm font-medium text-gray-700 mb-1">
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            id="prof-name"
            type="text"
            value={formData.displayName || ''}
            onChange={e => updateField('displayName', e.target.value)}
            placeholder="Your full name"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="prof-headline" className="block text-sm font-medium text-gray-700 mb-1">
          Headline
          <span className="text-gray-400 font-normal ml-1">({(formData.headline || '').length}/150)</span>
        </label>
        <input
          id="prof-headline"
          type="text"
          value={formData.headline || ''}
          onChange={e => updateField('headline', e.target.value.slice(0, 150))}
          placeholder="e.g. Associate Professor of Computer Science"
          maxLength={150}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="prof-bio" className="block text-sm font-medium text-gray-700 mb-1">
          Bio
          <span className="text-gray-400 font-normal ml-1">({(formData.bio || '').length}/1500)</span>
        </label>
        <textarea
          id="prof-bio"
          value={formData.bio || ''}
          onChange={e => updateField('bio', e.target.value.slice(0, 1500))}
          placeholder="Tell students about yourself..."
          rows={5}
          maxLength={1500}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
        />
      </div>
    </div>
  )
}

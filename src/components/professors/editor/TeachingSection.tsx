/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { Plus, X } from '@phosphor-icons/react'
import type {
  ProfessorProfile,
  ProfessorCertification,
} from '@/lib/types/university'

interface TeachingSectionProps {
  formData: Partial<ProfessorProfile>
  updateField: <K extends keyof ProfessorProfile>(
    key: K,
    value: ProfessorProfile[K]
  ) => void
}

const emptyCert: ProfessorCertification = { name: '', issuer: '' }

export function TeachingSection({
  formData,
  updateField,
}: TeachingSectionProps) {
  const certs = formData.certifications || []

  function addCert() {
    if (certs.length >= 20) return
    updateField('certifications', [...certs, { ...emptyCert }])
  }

  function removeCert(idx: number) {
    updateField(
      'certifications',
      certs.filter((_, i) => i !== idx)
    )
  }

  function updateCert(
    idx: number,
    field: keyof ProfessorCertification,
    value: string | number | undefined
  ) {
    const updated = certs.map((c, i) =>
      i === idx ? { ...c, [field]: value } : c
    )
    updateField('certifications', updated)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Teaching</h3>

      <div>
        <label
          htmlFor="prof-philosophy"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Teaching Philosophy
          <span className="text-gray-400 font-normal ml-1">
            ({(formData.teachingPhilosophy || '').length}/1000)
          </span>
        </label>
        <textarea
          id="prof-philosophy"
          value={formData.teachingPhilosophy || ''}
          onChange={(e) =>
            updateField('teachingPhilosophy', e.target.value.slice(0, 1000))
          }
          placeholder="Describe your approach to teaching..."
          rows={4}
          maxLength={1000}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="prof-whyiteach"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Why I Teach
          <span className="text-gray-400 font-normal ml-1">
            ({(formData.whyITeach || '').length}/1000)
          </span>
        </label>
        <textarea
          id="prof-whyiteach"
          value={formData.whyITeach || ''}
          onChange={(e) =>
            updateField('whyITeach', e.target.value.slice(0, 1000))
          }
          placeholder="What motivates you to teach..."
          rows={3}
          maxLength={1000}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Certifications
          </label>
          {certs.length < 20 && (
            <button
              type="button"
              onClick={addCert}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
            >
              <Plus size={12} weight="bold" /> Add Certification
            </button>
          )}
        </div>
        {certs.map((cert, idx) => (
          <div key={idx} className="flex items-start gap-2 mb-2">
            <div className="grid grid-cols-3 gap-2 flex-1">
              <input
                value={cert.name}
                onChange={(e) => updateCert(idx, 'name', e.target.value)}
                placeholder="Certification name"
                className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <input
                value={cert.issuer}
                onChange={(e) => updateCert(idx, 'issuer', e.target.value)}
                placeholder="Issuer"
                className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <input
                type="number"
                value={cert.year ?? ''}
                onChange={(e) =>
                  updateCert(
                    idx,
                    'year',
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                placeholder="Year"
                className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={() => removeCert(idx)}
              className="mt-1.5 text-gray-400 hover:text-red-500"
            >
              <X size={14} weight="bold" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

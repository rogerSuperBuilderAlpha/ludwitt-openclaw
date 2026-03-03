/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { Plus, X } from '@phosphor-icons/react'
import type { ProfessorProfile, ProfessorDegree } from '@/lib/types/university'

interface AcademicSectionProps {
  formData: Partial<ProfessorProfile>
  updateField: <K extends keyof ProfessorProfile>(
    key: K,
    value: ProfessorProfile[K]
  ) => void
}

const emptyDegree: ProfessorDegree = { degree: '', field: '', institution: '' }

export function AcademicSection({
  formData,
  updateField,
}: AcademicSectionProps) {
  const degrees = formData.degrees || []

  function addDegree() {
    if (degrees.length >= 10) return
    updateField('degrees', [...degrees, { ...emptyDegree }])
  }

  function removeDegree(idx: number) {
    updateField(
      'degrees',
      degrees.filter((_, i) => i !== idx)
    )
  }

  function updateDegree(
    idx: number,
    field: keyof ProfessorDegree,
    value: string | number | undefined
  ) {
    const updated = degrees.map((d, i) =>
      i === idx ? { ...d, [field]: value } : d
    )
    updateField('degrees', updated)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Academic Affiliation
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="prof-institution"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Institution
          </label>
          <input
            id="prof-institution"
            type="text"
            value={formData.institution || ''}
            onChange={(e) =>
              updateField('institution', e.target.value || undefined)
            }
            placeholder="e.g. MIT"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="prof-position"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Position
          </label>
          <input
            id="prof-position"
            type="text"
            value={formData.position || ''}
            onChange={(e) =>
              updateField('position', e.target.value || undefined)
            }
            placeholder="e.g. Associate Professor"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="prof-department"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Department
          </label>
          <input
            id="prof-department"
            type="text"
            value={formData.department || ''}
            onChange={(e) =>
              updateField('department', e.target.value || undefined)
            }
            placeholder="e.g. Computer Science"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="prof-years"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Years Teaching
          </label>
          <input
            id="prof-years"
            type="number"
            min={0}
            value={formData.yearsTeaching ?? ''}
            onChange={(e) =>
              updateField(
                'yearsTeaching',
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
            placeholder="e.g. 12"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Degrees
          </label>
          {degrees.length < 10 && (
            <button
              type="button"
              onClick={addDegree}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
            >
              <Plus size={12} weight="bold" /> Add Degree
            </button>
          )}
        </div>
        {degrees.map((deg, idx) => (
          <div key={idx} className="flex items-start gap-2 mb-2">
            <div className="grid grid-cols-4 gap-2 flex-1">
              <input
                value={deg.degree}
                onChange={(e) => updateDegree(idx, 'degree', e.target.value)}
                placeholder="Degree (e.g. PhD)"
                className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <input
                value={deg.field}
                onChange={(e) => updateDegree(idx, 'field', e.target.value)}
                placeholder="Field"
                className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <input
                value={deg.institution}
                onChange={(e) =>
                  updateDegree(idx, 'institution', e.target.value)
                }
                placeholder="Institution"
                className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <input
                type="number"
                value={deg.year ?? ''}
                onChange={(e) =>
                  updateDegree(
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
              onClick={() => removeDegree(idx)}
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

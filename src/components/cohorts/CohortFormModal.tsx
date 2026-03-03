/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import FocusTrap from 'focus-trap-react'
import { auth as firebaseAuth } from '@/lib/firebase/config'

interface CohortFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  editingCohort?: {
    id: string
    name: string
    description: string
    targetSize: number
    startDate: string
  } | null
}

export function CohortFormModal({
  isOpen,
  onClose,
  onSuccess,
  editingCohort,
}: CohortFormModalProps) {
  const [cohortName, setCohortName] = useState('')
  const [cohortDescription, setCohortDescription] = useState('')
  const [targetSize, setTargetSize] = useState(20)
  const [startDate, setStartDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Populate form when editing
  useEffect(() => {
    if (editingCohort) {
      setCohortName(editingCohort.name)
      setCohortDescription(editingCohort.description)
      setTargetSize(editingCohort.targetSize)
      setStartDate(editingCohort.startDate)
    } else {
      // Reset form for create mode
      setCohortName('')
      setCohortDescription('')
      setTargetSize(20)
      setStartDate('')
    }
    setError('')
  }, [editingCohort, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      if (!cohortName.trim() || !cohortDescription.trim() || !startDate) {
        setError('Please fill in all fields')
        return
      }

      const token = await firebaseAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Authentication error')

      const endpoint = editingCohort
        ? `/api/cohorts/edit`
        : '/api/cohorts/create'
      const body = editingCohort
        ? {
            cohortId: editingCohort.id,
            name: cohortName,
            description: cohortDescription,
            targetSize,
            startDate,
          }
        : {
            name: cohortName,
            description: cohortDescription,
            targetSize,
            startDate,
          }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!data.success) throw new Error(data.error || 'Failed to save cohort')

      onSuccess()
      onClose()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save cohort')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cohort-form-modal-title"
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2
              id="cohort-form-modal-title"
              className="text-2xl font-bold text-gray-900"
            >
              {editingCohort ? 'Edit Cohort' : 'Create New Cohort'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-900">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Cohort Name
              </label>
              <input
                type="text"
                value={cohortName}
                onChange={(e) => setCohortName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Spring 2025 Founders"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={cohortDescription}
                onChange={(e) => setCohortDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe what makes this cohort special..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Target Size
              </label>
              <select
                value={targetSize}
                onChange={(e) => setTargetSize(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={!!editingCohort}
              >
                <option value="20">20 people ($500/person)</option>
                <option value="10">10 people ($1,000/person)</option>
                <option value="5">5 people ($2,000/person)</option>
                <option value="1">Solo ($10,000)</option>
              </select>
              {editingCohort && (
                <p className="mt-1 text-xs text-gray-500">
                  Target size cannot be changed after creation
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Saving...'
                  : editingCohort
                    ? 'Update Cohort'
                    : 'Create Cohort'}
              </button>
            </div>
          </form>
        </div>
      </FocusTrap>
    </div>
  )
}

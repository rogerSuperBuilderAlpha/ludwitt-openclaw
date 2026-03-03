'use client'

import { ProgressBar } from '@/components/ui/ProgressBar'

interface ProgressViewProps {
  progressPercentage: number
  setProgressPercentage: (n: number) => void
  progressNote: string
  setProgressNote: (s: string) => void
  isUpdatingProgress: boolean
  onSubmitProgress: () => void
  onBackToDetails: () => void
}

export function ProgressView({
  progressPercentage,
  setProgressPercentage,
  progressNote,
  setProgressNote,
  isUpdatingProgress,
  onSubmitProgress,
  onBackToDetails,
}: ProgressViewProps) {
  return (
    <>
      <div className="mb-6">
        <ProgressBar percentage={progressPercentage} size="lg" />
      </div>
      <div className="mb-6">
        <label
          htmlFor="docfull-progress-range"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Set Progress Percentage
        </label>
        <input
          id="docfull-progress-range"
          type="range"
          min="0"
          max="100"
          step="5"
          value={progressPercentage}
          onChange={(e) => setProgressPercentage(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="docfull-progress-note"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Progress Note (Optional)
        </label>
        <textarea
          id="docfull-progress-note"
          value={progressNote}
          onChange={(e) => setProgressNote(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
        />
      </div>
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onSubmitProgress}
          disabled={isUpdatingProgress}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isUpdatingProgress ? 'Updating...' : 'Update Progress'}
        </button>
        <button
          onClick={onBackToDetails}
          disabled={isUpdatingProgress}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
        >
          Cancel
        </button>
      </div>
    </>
  )
}

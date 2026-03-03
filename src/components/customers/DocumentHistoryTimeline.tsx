/**
 * Document History Timeline Component
 * Displays a chronological timeline of document changes
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Clock, User, X } from 'lucide-react'
import { DocumentHistoryEntry } from '@/lib/types/documentHistory'
import {
  getDocumentHistory,
  formatChange,
  getChangeTypeConfig,
} from '@/lib/utils/documentHistory'
import { formatDate } from '@/lib/utils/timestamp'
import { logger } from '@/lib/logger'

interface DocumentHistoryTimelineProps {
  documentId: string
  documentTitle: string
  isOpen: boolean
  onClose: () => void
}

export function DocumentHistoryTimeline({
  documentId,
  documentTitle,
  isOpen,
  onClose,
}: DocumentHistoryTimelineProps) {
  const [history, setHistory] = useState<DocumentHistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadHistory = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const entries = await getDocumentHistory(documentId)
      setHistory(entries)
    } catch (err) {
      logger.error(
        'DocumentHistoryTimeline',
        'Error loading document history',
        { error: err }
      )
      setError('Failed to load document history')
    } finally {
      setLoading(false)
    }
  }, [documentId])

  useEffect(() => {
    if (isOpen && documentId) {
      loadHistory()
    }
  }, [isOpen, documentId, loadHistory])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        role="dialog"
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Document History
            </h2>
            <p className="text-sm text-gray-600">{documentTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading history...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-800">{error}</p>
              <button
                onClick={loadHistory}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No history yet
              </h3>
              <p className="text-gray-600">
                Changes to this document will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Timeline entries */}
                <div className="space-y-6">
                  {history.map((entry, index) => {
                    const config = getChangeTypeConfig(entry.changeType)
                    const isFirst = index === 0

                    return (
                      <div key={entry.id} className="relative flex gap-4">
                        {/* Timeline dot */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white z-10 ${
                            isFirst
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <span className="text-xl">{config.icon}</span>
                        </div>

                        {/* Entry content */}
                        <div className="flex-1 pb-6">
                          <div
                            className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${
                              isFirst ? 'border-blue-300 shadow-blue-100' : ''
                            }`}
                          >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className={`font-semibold ${config.color}`}>
                                  {config.label}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                  <User className="w-3 h-3" />
                                  <span>{entry.changedBy}</span>
                                  <span>•</span>
                                  <span className="capitalize">
                                    {entry.changedByRole}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(entry.timestamp)}
                              </div>
                            </div>

                            {/* Changes */}
                            {entry.changes && entry.changes.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {entry.changes.map((change, idx) => (
                                  <div
                                    key={idx}
                                    className="text-sm bg-gray-50 px-3 py-2 rounded border border-gray-100"
                                  >
                                    {formatChange(change)}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Metadata */}
                            {entry.metadata && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                {entry.metadata.reason && (
                                  <p className="text-sm text-gray-700">
                                    <span className="font-medium">Reason:</span>{' '}
                                    {entry.metadata.reason}
                                  </p>
                                )}
                                {entry.metadata.note && (
                                  <p className="text-sm text-gray-700 mt-1">
                                    <span className="font-medium">Note:</span>{' '}
                                    {entry.metadata.note}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

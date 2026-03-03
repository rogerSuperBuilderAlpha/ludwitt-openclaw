'use client'

import { useState } from 'react'
import {
  Download,
  Database,
  Trash2,
  FileJson,
  FileText,
  Check,
  Loader2,
  AlertTriangle,
} from 'lucide-react'
import { useAuth } from '@/components/auth/ClientProvider'

interface DataExportSectionProps {
  userId: string
  userEmail: string
}

export function DataExportSection({
  userId,
  userEmail,
}: DataExportSectionProps) {
  const { user } = useAuth()
  const [exporting, setExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [clearSuccess, setClearSuccess] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExportData = async (format: 'json' | 'csv') => {
    setExporting(true)
    setError(null)

    try {
      // Collect data from localStorage
      const localData: Record<string, unknown> = {}

      // Gather all user-related localStorage data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (
          key &&
          (key.includes(userId) ||
            key.startsWith('preferences') ||
            key.startsWith('notifications') ||
            key.startsWith('privacy'))
        ) {
          try {
            localData[key] = JSON.parse(localStorage.getItem(key) || '{}')
          } catch {
            localData[key] = localStorage.getItem(key)
          }
        }
      }

      // Fetch server-side data
      let serverData: Record<string, unknown> = {}
      if (user) {
        try {
          const token = await user.getIdToken()
          const response = await fetch('/api/user/export-data', {
            headers: { Authorization: `Bearer ${token}` },
          })
          const result = await response.json()
          if (result.success && result.data) {
            serverData = result.data
          }
        } catch {
          // Fall back to local-only export
        }
      }

      const exportData = {
        exportDate: new Date().toISOString(),
        userId,
        email: userEmail,
        ...serverData,
        localData,
      }

      // Create download
      let blob: Blob
      let filename: string

      if (format === 'json') {
        blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: 'application/json',
        })
        filename = `pitchrise-data-${new Date().toISOString().split('T')[0]}.json`
      } else {
        // Convert to CSV format
        const csvRows = [
          ['Key', 'Value'],
          ['Export Date', exportData.exportDate as string],
          ['User ID', userId],
          ['Email', userEmail],
          ...Object.entries(exportData.localData || {}).map(([key, value]) => [
            key,
            typeof value === 'object' ? JSON.stringify(value) : String(value),
          ]),
        ]
        const csvContent = csvRows
          .map((row) => row.map((cell) => `"${cell}"`).join(','))
          .join('\n')
        blob = new Blob([csvContent], { type: 'text/csv' })
        filename = `pitchrise-data-${new Date().toISOString().split('T')[0]}.csv`
      }

      // Download file
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setExportSuccess(true)
      setTimeout(() => setExportSuccess(false), 5000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to export data')
    } finally {
      setExporting(false)
    }
  }

  const handleClearLocalData = () => {
    setClearing(true)
    setError(null)

    try {
      // Get keys to remove
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (
          key &&
          (key.includes(userId) ||
            key.startsWith('preferences_') ||
            key.startsWith('notifications_') ||
            key.startsWith('privacy_'))
        ) {
          keysToRemove.push(key)
        }
      }

      // Remove each key
      keysToRemove.forEach((key) => localStorage.removeItem(key))

      setShowClearConfirm(false)
      setClearSuccess(true)
      setTimeout(() => setClearSuccess(false), 5000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to clear local data')
    } finally {
      setClearing(false)
    }
  }

  // Calculate storage usage
  const getStorageUsage = () => {
    let total = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        total += (localStorage.getItem(key) || '').length
      }
    }
    return (total / 1024).toFixed(2) // Convert to KB
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="b-feedback b-feedback-error b-text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Success Messages */}
      {exportSuccess && (
        <div className="b-feedback b-feedback-success b-text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          Your data has been downloaded successfully!
        </div>
      )}

      {clearSuccess && (
        <div className="b-feedback b-feedback-success b-text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          Local data cleared successfully!
        </div>
      )}

      {/* Storage Usage */}
      <div className="b-p-lg b-bg-muted b-rounded-lg">
        <div className="flex items-center gap-3 b-mb-sm">
          <Database className="w-5 h-5 b-text-secondary" />
          <span className="b-font-medium b-text-primary">
            Local Storage Usage
          </span>
        </div>
        <p className="b-text-2xl b-font-semibold b-text-primary">
          {getStorageUsage()} KB
        </p>
        <p className="b-text-xs b-text-muted mt-1">
          Preferences, settings, and cached data stored in your browser.
        </p>
      </div>

      {/* Export Data */}
      <div>
        <div className="flex items-center gap-2 b-mb-sm">
          <Download className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Export Your Data</h3>
        </div>
        <p className="b-text-sm b-text-muted b-mb-md">
          Download a copy of your personal data including preferences, settings,
          and activity.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => handleExportData('json')}
            disabled={exporting}
            className="flex-1 b-btn b-btn-secondary b-btn-md flex items-center justify-center gap-2"
          >
            {exporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileJson className="w-4 h-4 text-orange-600" />
            )}
            <span className="b-font-medium">Export as JSON</span>
          </button>

          <button
            onClick={() => handleExportData('csv')}
            disabled={exporting}
            className="flex-1 b-btn b-btn-secondary b-btn-md flex items-center justify-center gap-2"
          >
            {exporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 b-text-success" />
            )}
            <span className="b-font-medium">Export as CSV</span>
          </button>
        </div>
      </div>

      {/* Clear Local Data */}
      <div className="pt-4 b-border-t">
        <div className="flex items-center gap-2 b-mb-sm">
          <Trash2 className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Clear Local Data</h3>
        </div>
        <p className="b-text-sm b-text-muted b-mb-md">
          Remove cached preferences and local settings from this browser. Your
          account data on our servers will not be affected.
        </p>

        {showClearConfirm ? (
          <div className="b-feedback b-feedback-warning">
            <p className="b-text-sm b-mb-sm">
              Are you sure you want to clear all local data? You&apos;ll need to
              reconfigure your preferences.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClearLocalData}
                disabled={clearing}
                className="flex-1 b-btn b-btn-warning b-btn-md flex items-center justify-center gap-2"
              >
                {clearing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Clearing...
                  </>
                ) : (
                  'Yes, Clear Data'
                )}
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 b-btn b-btn-secondary b-btn-md"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="b-btn b-btn-secondary b-btn-md"
          >
            Clear Local Data
          </button>
        )}
      </div>

      {/* Privacy Note */}
      <div className="pt-4 b-border-t">
        <p className="b-text-xs b-text-muted">
          <strong>Note:</strong> For a complete data export including
          server-side data, please contact support. GDPR and CCPA data requests
          are processed within 30 days.
        </p>
      </div>
    </div>
  )
}

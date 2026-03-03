/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState } from 'react'
import {
  Download,
  FileText,
  FileXls,
  FilePdf,
  Calendar,
  Check,
  Spinner,
  ArrowRight,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevBadge,
  DevProgress,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'

type ExportFormat = 'csv' | 'json' | 'pdf'
type DateRange = 'week' | 'month' | 'quarter' | 'year' | 'all'

interface ExportOption {
  id: string
  name: string
  description: string
  dataType: 'documents' | 'customers' | 'activity' | 'revenue'
  formats: ExportFormat[]
}

interface ExportJob {
  id: string
  name: string
  format: ExportFormat
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  createdAt: string
  downloadUrl?: string
}

/**
 * Export Page - Export data in various formats
 */
export default function ExportPage() {
  const { user } = useAuth()
  const [selectedExport, setSelectedExport] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv')
  const [dateRange, setDateRange] = useState<DateRange>('month')
  const [exporting, setExporting] = useState(false)

  const [recentExports, setRecentExports] = useState<ExportJob[]>([
    {
      id: '1',
      name: 'Documents Export',
      format: 'csv',
      status: 'completed',
      progress: 100,
      createdAt: '2025-01-08',
      downloadUrl: '#',
    },
    {
      id: '2',
      name: 'Revenue Report',
      format: 'pdf',
      status: 'completed',
      progress: 100,
      createdAt: '2025-01-05',
      downloadUrl: '#',
    },
  ])

  const exportOptions: ExportOption[] = [
    {
      id: 'documents',
      name: 'Documents',
      description:
        'Export all document data including status, assignments, and notes',
      dataType: 'documents',
      formats: ['csv', 'json', 'pdf'],
    },
    {
      id: 'customers',
      name: 'Customers',
      description: 'Export customer information and associated documents',
      dataType: 'customers',
      formats: ['csv', 'json'],
    },
    {
      id: 'activity',
      name: 'Activity Log',
      description: 'Export your activity history and audit trail',
      dataType: 'activity',
      formats: ['csv', 'json'],
    },
    {
      id: 'revenue',
      name: 'Revenue Report',
      description: 'Export revenue, costs, and financial summary',
      dataType: 'revenue',
      formats: ['csv', 'pdf'],
    },
  ]

  const dateRanges: { key: DateRange; label: string }[] = [
    { key: 'week', label: 'Last 7 days' },
    { key: 'month', label: 'Last 30 days' },
    { key: 'quarter', label: 'Last 90 days' },
    { key: 'year', label: 'Last year' },
    { key: 'all', label: 'All time' },
  ]

  const handleExport = async () => {
    if (!selectedExport || !user) return

    setExporting(true)

    // Simulate export process
    const newExport: ExportJob = {
      id: Date.now().toString(),
      name:
        exportOptions.find((o) => o.id === selectedExport)?.name + ' Export',
      format: selectedFormat,
      status: 'processing',
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setRecentExports((prev) => [newExport, ...prev])

    // Simulate progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setRecentExports((prev) =>
        prev.map((e) =>
          e.id === newExport.id
            ? {
                ...e,
                progress: i,
                status: i === 100 ? 'completed' : 'processing',
                downloadUrl: i === 100 ? '#' : undefined,
              }
            : e
        )
      )
    }

    setExporting(false)
    setSelectedExport(null)
  }

  const formatIcon = (format: ExportFormat) => {
    switch (format) {
      case 'csv':
        return <FileXls size={16} />
      case 'json':
        return <FileText size={16} />
      case 'pdf':
        return <FilePdf size={16} />
    }
  }

  const formatLabel = (format: ExportFormat) => {
    switch (format) {
      case 'csv':
        return 'CSV'
      case 'json':
        return 'JSON'
      case 'pdf':
        return 'PDF'
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          padding: 'var(--dev-space-4) var(--dev-space-5)',
          borderBottom: '1px solid var(--dev-border-subtle)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--dev-text-xl)',
            fontWeight: 'var(--dev-font-semibold)',
            marginBottom: 'var(--dev-space-1)',
          }}
        >
          Export Data
        </h1>
        <p
          style={{
            color: 'var(--dev-text-muted)',
            fontSize: 'var(--dev-text-sm)',
          }}
        >
          Download your data in various formats
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Export Options */}
        <h2
          style={{
            fontSize: 'var(--dev-text-base)',
            fontWeight: 'var(--dev-font-semibold)',
            marginBottom: 'var(--dev-space-3)',
          }}
        >
          What would you like to export?
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--dev-space-3)',
            marginBottom: 'var(--dev-space-5)',
          }}
        >
          {exportOptions.map((option) => (
            <DevCard
              key={option.id}
              padding="md"
              style={{
                cursor: 'pointer',
                border:
                  selectedExport === option.id
                    ? '2px solid var(--dev-accent-primary)'
                    : '1px solid var(--dev-border-default)',
                transition: 'border-color 0.15s ease',
              }}
              onClick={() => setSelectedExport(option.id)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--dev-space-3)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--dev-radius-md)',
                    background:
                      selectedExport === option.id
                        ? 'var(--dev-accent-primary)'
                        : 'var(--dev-bg-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color:
                      selectedExport === option.id
                        ? 'white'
                        : 'var(--dev-text-primary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Download size={20} />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 'var(--dev-font-semibold)',
                      marginBottom: 4,
                    }}
                  >
                    {option.name}
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--dev-text-sm)',
                      color: 'var(--dev-text-muted)',
                      marginBottom: 8,
                    }}
                  >
                    {option.description}
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {option.formats.map((f) => (
                      <DevBadge key={f} variant="default" size="sm">
                        {formatLabel(f)}
                      </DevBadge>
                    ))}
                  </div>
                </div>
              </div>
            </DevCard>
          ))}
        </div>

        {/* Export Configuration */}
        {selectedExport && (
          <DevCard padding="md" style={{ marginBottom: 'var(--dev-space-5)' }}>
            <h3
              style={{
                fontSize: 'var(--dev-text-sm)',
                fontWeight: 'var(--dev-font-semibold)',
                marginBottom: 'var(--dev-space-4)',
              }}
            >
              Export Settings
            </h3>

            <div
              style={{
                display: 'flex',
                gap: 'var(--dev-space-6)',
                flexWrap: 'wrap',
              }}
            >
              {/* Format Selection */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--dev-text-xs)',
                    color: 'var(--dev-text-muted)',
                    marginBottom: 8,
                  }}
                >
                  Format
                </label>
                <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
                  {exportOptions
                    .find((o) => o.id === selectedExport)
                    ?.formats.map((format) => (
                      <button
                        key={format}
                        onClick={() => setSelectedFormat(format)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 16px',
                          borderRadius: 'var(--dev-radius-md)',
                          border: `2px solid ${selectedFormat === format ? 'var(--dev-accent-primary)' : 'var(--dev-border-default)'}`,
                          background:
                            selectedFormat === format
                              ? 'var(--dev-accent-primary)'
                              : 'transparent',
                          color:
                            selectedFormat === format
                              ? 'white'
                              : 'var(--dev-text-primary)',
                          cursor: 'pointer',
                          fontSize: 'var(--dev-text-sm)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {formatIcon(format)}
                        {formatLabel(format)}
                      </button>
                    ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--dev-text-xs)',
                    color: 'var(--dev-text-muted)',
                    marginBottom: 8,
                  }}
                >
                  Date Range
                </label>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--dev-space-2)',
                    flexWrap: 'wrap',
                  }}
                >
                  {dateRanges.map((range) => (
                    <button
                      key={range.key}
                      onClick={() => setDateRange(range.key)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--dev-radius-md)',
                        border: `2px solid ${dateRange === range.key ? 'var(--dev-accent-primary)' : 'var(--dev-border-default)'}`,
                        background:
                          dateRange === range.key
                            ? 'var(--dev-accent-primary)'
                            : 'transparent',
                        color:
                          dateRange === range.key
                            ? 'white'
                            : 'var(--dev-text-primary)',
                        cursor: 'pointer',
                        fontSize: 'var(--dev-text-sm)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Export Button */}
            <div style={{ marginTop: 'var(--dev-space-5)' }}>
              <DevButton
                variant="primary"
                onClick={handleExport}
                disabled={exporting}
              >
                {exporting ? (
                  <>
                    <Spinner
                      size={16}
                      style={{
                        marginRight: 8,
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download size={16} style={{ marginRight: 8 }} />
                    Export{' '}
                    {exportOptions.find((o) => o.id === selectedExport)?.name}
                  </>
                )}
              </DevButton>
            </div>
          </DevCard>
        )}

        {/* Recent Exports */}
        <h2
          style={{
            fontSize: 'var(--dev-text-base)',
            fontWeight: 'var(--dev-font-semibold)',
            marginBottom: 'var(--dev-space-3)',
          }}
        >
          Recent Exports
        </h2>

        {recentExports.length === 0 ? (
          <DevCard
            padding="lg"
            style={{ textAlign: 'center', color: 'var(--dev-text-muted)' }}
          >
            <Download size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
            <p>No exports yet. Start by selecting data to export above.</p>
          </DevCard>
        ) : (
          <DevCard padding="none">
            {recentExports.map((exportJob, index) => (
              <div
                key={exportJob.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--dev-space-4)',
                  padding: 'var(--dev-space-3) var(--dev-space-4)',
                  borderBottom:
                    index < recentExports.length - 1
                      ? '1px solid var(--dev-border-subtle)'
                      : 'none',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--dev-radius-md)',
                    background:
                      exportJob.status === 'completed'
                        ? 'rgba(34, 197, 94, 0.15)'
                        : exportJob.status === 'failed'
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'var(--dev-bg-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color:
                      exportJob.status === 'completed'
                        ? 'var(--dev-accent-success)'
                        : exportJob.status === 'failed'
                          ? 'var(--dev-accent-danger)'
                          : 'var(--dev-text-muted)',
                  }}
                >
                  {exportJob.status === 'completed' ? (
                    <Check size={20} />
                  ) : exportJob.status === 'processing' ? (
                    <Spinner
                      size={20}
                      style={{ animation: 'spin 1s linear infinite' }}
                    />
                  ) : (
                    formatIcon(exportJob.format)
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--dev-space-2)',
                    }}
                  >
                    <span style={{ fontWeight: 'var(--dev-font-medium)' }}>
                      {exportJob.name}
                    </span>
                    <DevBadge variant="default" size="sm">
                      {formatLabel(exportJob.format)}
                    </DevBadge>
                  </div>
                  {exportJob.status === 'processing' && (
                    <div style={{ marginTop: 8, maxWidth: 200 }}>
                      <DevProgress value={exportJob.progress} size="sm" />
                    </div>
                  )}
                  {exportJob.status === 'completed' && (
                    <div
                      style={{
                        fontSize: 'var(--dev-text-xs)',
                        color: 'var(--dev-text-muted)',
                        marginTop: 2,
                      }}
                    >
                      Created on {exportJob.createdAt}
                    </div>
                  )}
                </div>

                {/* Download */}
                {exportJob.status === 'completed' && exportJob.downloadUrl && (
                  <DevButton variant="ghost" size="sm">
                    <Download size={14} style={{ marginRight: 4 }} />
                    Download
                  </DevButton>
                )}
              </div>
            ))}
          </DevCard>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

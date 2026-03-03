'use client'

/**
 * CostEstimate Component
 *
 * Displays estimated cost based on AI analysis of the document.
 * Shows what work is required and the compute cost to execute it.
 */

import { useState, useEffect } from 'react'
import {
  Calculator,
  Spinner,
  Warning,
  Lightning,
  Code,
  Files,
} from '@phosphor-icons/react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'

interface CostEstimateProps {
  /** Google Doc URL to estimate cost for */
  documentUrl: string
  /** Optional document size in characters (if known) */
  documentSizeChars?: number
  /** Callback when estimate is loaded */
  onEstimateLoaded?: (estimate: EstimateResult | null) => void
  /** Additional CSS classes */
  className?: string
}

interface EstimateResult {
  documentSizeChars: number
  estimatedInputTokens: number
  estimatedOutputTokens: number
  rawCostCents: number
  displayCostCents: number
  displayCostFormatted: string
  markup: number
  model: string
  willGoNegative: boolean
  analyzedDocument: boolean
  analysis?: {
    toolCalls: number
    codeChanges: number
    fileReads: number
    complexity: string
    summary: string
  }
  balance: {
    current: number
    currentFormatted: string
    sufficient: boolean
    shortfall: number | null
    shortfallFormatted: string | null
    isLowBalance: boolean
    isAtDebtLimit: boolean
  }
}

export function CostEstimate({
  documentUrl,
  documentSizeChars,
  onEstimateLoaded,
  className = '',
}: CostEstimateProps) {
  const fetchApi = useApiFetch()
  const [estimate, setEstimate] = useState<EstimateResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if URL looks like a valid Google Doc
  const isValidUrl =
    documentUrl.includes('docs.google.com') ||
    documentUrl.includes('drive.google.com')

  useEffect(() => {
    // Reset when URL changes
    if (!documentUrl || !isValidUrl) {
      setEstimate(null)
      setError(null)
      onEstimateLoaded?.(null)
      return
    }

    // Debounce the estimate request
    const timer = setTimeout(() => {
      fetchEstimate()
    }, 500)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentUrl, documentSizeChars])

  const fetchEstimate = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchApi<EstimateResult>(
        '/api/customers/documents/estimate-cost',
        {
          method: 'POST',
          body: JSON.stringify({
            documentUrl,
            documentSizeChars,
          }),
        }
      )

      setEstimate(result)
      onEstimateLoaded?.(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to estimate cost')
      setEstimate(null)
      onEstimateLoaded?.(null)
    } finally {
      setLoading(false)
    }
  }

  // Don't show anything if no valid URL
  if (!documentUrl || !isValidUrl) {
    return null
  }

  // Loading state - show we're analyzing
  if (loading) {
    return (
      <div
        className={`bg-blue-50 rounded-xl p-4 border border-blue-200 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Spinner className="w-5 h-5 text-blue-600 animate-spin" />
          </div>
          <div>
            <p className="font-medium text-blue-900">Analyzing document...</p>
            <p className="text-sm text-blue-600">
              Estimating compute requirements
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div
        className={`bg-red-50 rounded-xl p-4 border border-red-200 ${className}`}
      >
        <div className="flex items-center gap-3">
          <Warning className="w-5 h-5 text-red-500" weight="fill" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      </div>
    )
  }

  // No estimate yet
  if (!estimate) {
    return null
  }

  const complexityColors: Record<string, string> = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-orange-100 text-orange-700',
    very_high: 'bg-red-100 text-red-700',
  }

  return (
    <div
      className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 ${className}`}
    >
      {/* Main cost display */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-4 h-4 text-white" weight="fill" />
          </div>
          <span className="font-medium text-gray-900">Estimated Cost</span>
        </div>
        <span className="text-2xl font-bold text-blue-600">
          {estimate.displayCostFormatted}
        </span>
      </div>

      {/* Analysis details */}
      {estimate.analyzedDocument && estimate.analysis && (
        <div className="space-y-3">
          {/* Summary */}
          <p className="text-sm text-gray-600 bg-white/60 rounded-lg p-2">
            {estimate.analysis.summary}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Lightning className="w-4 h-4 text-amber-500" weight="fill" />
              <span>{estimate.analysis.toolCalls} operations</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Code className="w-4 h-4 text-blue-500" weight="fill" />
              <span>{estimate.analysis.codeChanges} changes</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Files className="w-4 h-4 text-purple-500" weight="fill" />
              <span>{estimate.analysis.fileReads} files</span>
            </div>
          </div>

          {/* Complexity badge */}
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${complexityColors[estimate.analysis.complexity] || complexityColors.medium}`}
            >
              {estimate.analysis.complexity.replace('_', ' ')} complexity
            </span>
            <span className="text-xs text-gray-500">
              ~{Math.round(estimate.estimatedInputTokens / 1000)}k input +{' '}
              {Math.round(estimate.estimatedOutputTokens / 1000)}k output tokens
            </span>
          </div>
        </div>
      )}

      {/* Fallback message if not analyzed */}
      {!estimate.analyzedDocument && (
        <p className="text-xs text-gray-500 mt-1">
          Connect Google Drive for accurate estimates based on document analysis
        </p>
      )}
    </div>
  )
}

// Export the estimate type for use in other components
export type { EstimateResult }

/**
 * ShareableLinkCard Component
 * Shows the developer's shareable customer link with copy functionality
 */

'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink, Share2 } from 'lucide-react'
import { logger } from '@/lib/logger'

interface ShareableLinkCardProps {
  developerId: string
  displayName: string
}

export function ShareableLinkCard({
  developerId,
  displayName,
}: ShareableLinkCardProps) {
  const [copied, setCopied] = useState(false)

  // Get the base URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const customerPageUrl = `${baseUrl}/customers/${developerId}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customerPageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      logger.error('ShareableLinkCard', 'Failed to copy', { error: err })
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">
          Your Client Submission Page
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Share this link with clients to receive project submissions directly.
        They&apos;ll be automatically assigned to you!
      </p>

      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4">
        <code className="flex-1 text-sm text-blue-600 font-mono truncate">
          {customerPageUrl}
        </code>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Copy className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <a
          href={customerPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded transition-colors"
          title="Open in new tab"
        >
          <ExternalLink className="w-5 h-5 text-gray-600" />
        </a>
      </div>

      {copied && (
        <div className="text-sm text-green-600 font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          Link copied to clipboard!
        </div>
      )}

      {!copied && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>💡 Tip:</strong> When clients submit through your link,
            their projects will automatically appear in your assigned work
            below.
          </p>
        </div>
      )}
    </div>
  )
}

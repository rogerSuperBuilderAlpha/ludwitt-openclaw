'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, ExternalLink, Copy } from 'lucide-react'
import { logger } from '@/lib/logger'

interface GoogleDocsHelperProps {
  url: string
  onValidUrl?: (isValid: boolean) => void
}

export function GoogleDocsHelper({ url, onValidUrl }: GoogleDocsHelperProps) {
  const [status, setStatus] = useState<
    'checking' | 'valid' | 'invalid' | 'needs-permission'
  >('checking')
  const [showInstructions, setShowInstructions] = useState(false)

  useEffect(() => {
    if (!url) {
      setStatus('checking')
      onValidUrl?.(false)
      return
    }

    const checkGoogleDocsUrl = async () => {
      // Basic Google Docs URL validation
      const googleDocsRegex =
        /https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9-_]+)/

      if (!googleDocsRegex.test(url)) {
        setStatus('invalid')
        onValidUrl?.(false)
        return
      }

      // Check if URL has sharing parameters that indicate public access
      const hasPublicSharing =
        url.includes('usp=sharing') || url.includes('usp=drive_link')

      if (hasPublicSharing) {
        setStatus('valid')
        onValidUrl?.(true)
      } else {
        setStatus('needs-permission')
        onValidUrl?.(false)
      }
    }

    const timeoutId = setTimeout(checkGoogleDocsUrl, 300) // Debounce
    return () => clearTimeout(timeoutId)
  }, [url, onValidUrl])

  const getShareableUrl = () => {
    const match = url.match(
      /https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9-_]+)/
    )
    if (match) {
      return `https://docs.google.com/document/d/${match[1]}/edit?usp=sharing`
    }
    return url
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareableUrl())
      // Could add a toast notification here
    } catch (err) {
      logger.error('GoogleDocsHelper', 'Failed to copy', { error: err })
    }
  }

  if (!url) return null

  return (
    <div className="mt-2">
      {status === 'invalid' && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-red-800 font-medium">Invalid Google Docs link</p>
            <p className="text-red-700 mt-1">
              Please paste a valid Google Docs URL (it should start with
              docs.google.com)
            </p>
          </div>
        </div>
      )}

      {status === 'needs-permission' && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm flex-1">
              <p className="text-amber-800 font-medium">
                Document needs public access
              </p>
              <p className="text-amber-700 mt-1">
                Your document isn&apos;t publicly accessible yet. We&apos;ll
                help you fix this!
              </p>
            </div>
          </div>

          <div className="bg-white border border-amber-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Quick Fix Options:</h4>
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {showInstructions ? 'Hide' : 'Show'} step-by-step guide
              </button>
            </div>

            {/* Option 1: Auto-generated shareable link */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-gray-700">
                Option 1: Use this corrected link
              </p>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                <input
                  type="text"
                  value={getShareableUrl()}
                  readOnly
                  className="flex-1 text-sm bg-transparent border-none focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  title="Copy corrected link"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={getShareableUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-gray-500 hover:text-gray-700"
                  title="Test link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-gray-600">
                ✨ We&apos;ve added the sharing parameter - try pasting this
                corrected link above
              </p>
            </div>

            {showInstructions && (
              <div className="space-y-3 border-t pt-4">
                <p className="text-sm font-medium text-gray-700">
                  Option 2: Manual sharing (if auto-fix doesn&apos;t work)
                </p>
                <ol className="text-sm text-gray-600 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0">
                      1
                    </span>
                    <span>Open your Google Doc</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0">
                      2
                    </span>
                    <span>
                      Click the blue &quot;Share&quot; button (top-right corner)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0">
                      3
                    </span>
                    <span>
                      Click &quot;Change to anyone with the link&quot;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0">
                      4
                    </span>
                    <span>Make sure it says &quot;Viewer&quot; access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0">
                      5
                    </span>
                    <span>Copy the link and paste it above</span>
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {status === 'valid' && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-green-800 font-medium">
              Perfect! Your document is publicly accessible
            </p>
            <p className="text-green-700">
              Your developer will be able to view this document when you submit
              it.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

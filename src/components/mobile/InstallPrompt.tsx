'use client'

import { useState, useEffect } from 'react'
import {
  showInstallPrompt,
  isAppInstalled,
  getInstallInstructions,
} from '@/lib/pwa/pwaUtils'

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [instructions, setInstructions] = useState<string | null>(null)

  useEffect(() => {
    // Don&apos;t show if already installed
    if (isAppInstalled()) {
      return
    }

    // Check if user dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const oneDayMs = 24 * 60 * 60 * 1000
      if (Date.now() - dismissedTime < oneDayMs) {
        return // Don&apos;t show again within 24 hours
      }
    }

    // Show after 30 seconds if install is available
    const timer = setTimeout(() => {
      setInstructions(getInstallInstructions())
      if (getInstallInstructions()) {
        setShowPrompt(true)
      }
    }, 30000)

    // Listen for install available event
    const handleInstallAvailable = () => {
      setInstructions(getInstallInstructions())
      setShowPrompt(true)
    }

    window.addEventListener('pwa-install-available', handleInstallAvailable)

    return () => {
      clearTimeout(timer)
      window.removeEventListener(
        'pwa-install-available',
        handleInstallAvailable
      )
    }
  }, [])

  const handleInstall = async () => {
    const accepted = await showInstallPrompt()
    setShowPrompt(false)

    if (!accepted) {
      // User dismissed, remember for 24 hours
      localStorage.setItem('pwa-install-dismissed', Date.now().toString())
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-40 animate-slide-up">
      <div className="bg-gray-900 rounded-lg shadow-lg p-4 text-white">
        <div className="flex items-start gap-3">
          <div className="text-3xl">📱</div>
          <div className="flex-1">
            <h3 className="font-bold mb-1">Install Ludwitt</h3>
            <p className="text-sm text-gray-100 mb-3">
              {instructions ||
                'Add to your home screen for quick access and offline support!'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors text-sm"
              >
                Later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

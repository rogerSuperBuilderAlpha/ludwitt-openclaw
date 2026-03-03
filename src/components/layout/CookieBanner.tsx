/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X, Settings } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [functionalEnabled, setFunctionalEnabled] = useState(true)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookie-consent')
    if (!cookieConsent) {
      // Show banner after a brief delay for better UX
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        functional: true,
        analytics: true,
        acceptedAt: new Date().toISOString(),
      })
    )
    setIsVisible(false)
  }

  const handleAcceptNecessary = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        functional: false,
        analytics: false,
        acceptedAt: new Date().toISOString(),
      })
    )
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        functional: functionalEnabled,
        analytics: analyticsEnabled,
        acceptedAt: new Date().toISOString(),
      })
    )
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Cookie Banner - NO full-screen overlay to avoid blocking page interactions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-white border-t-4 border-blue-600 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {!showPreferences ? (
              // Main Banner View
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Icon & Message */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      🍪 We Value Your Privacy
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      We use cookies to enhance your learning experience,
                      remember your preferences, and analyze how you use Ludwitt
                      to improve our platform. We do NOT use cookies for
                      advertising or sell your data.{' '}
                      <Link
                        href="/legal/cookie-policy"
                        className="text-blue-600 hover:text-blue-700 underline font-medium"
                      >
                        Learn more about our cookie policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    Accept All Cookies
                  </button>
                  <button
                    onClick={handleAcceptNecessary}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Preferences
                  </button>
                </div>
              </div>
            ) : (
              // Preferences View
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Essential Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Essential Cookies
                        </h4>
                        <p className="text-sm text-gray-600">
                          Required for the Platform to function. Cannot be
                          disabled.
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          Always Active
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Functional Cookies
                        </h4>
                        <p className="text-sm text-gray-600">
                          Remember your preferences and settings for a better
                          experience.
                        </p>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={functionalEnabled}
                            onChange={() => setFunctionalEnabled((v) => !v)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Analytics Cookies
                        </h4>
                        <p className="text-sm text-gray-600">
                          Help us understand how you use the Platform to improve
                          it. Data is anonymized.
                        </p>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={analyticsEnabled}
                            onChange={() => setAnalyticsEnabled((v) => !v)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preference Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
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
    </>
  )
}

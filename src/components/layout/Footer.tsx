'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'

// Pages that have their own footer (don't show global footer)
const PAGES_WITH_OWN_FOOTER = ['/', '/login']

// Delay before showing footer to prevent page flicker
const FOOTER_DELAY_MS = 500

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Delay footer rendering until page content has settled
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, FOOTER_DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  // Don't show global footer on pages that have their own footer
  // Show it only for authenticated users OR on non-public pages
  const isPublicPageWithFooter = PAGES_WITH_OWN_FOOTER.includes(pathname)

  // If loading or not yet mounted, don't render anything yet to prevent flash
  if (loading || !mounted) return null

  // If on a public page with its own footer AND user is not logged in, hide this footer
  if (isPublicPageWithFooter && !user) return null

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-lg p-1.5 flex items-center justify-center">
                <Image
                  src="/logos/logo.png"
                  alt="Ludwitt Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white font-bold text-xl">Ludwitt</h3>
            </div>
            <p className="text-sm text-gray-400">
              Adaptive learning platform addressing the global literacy and
              numeracy crisis. Built on learning science for K-12 students and
              adult re-education.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/basics/leaderboard"
                  className="hover:text-white transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/basics/achievements"
                  className="hover:text-white transition-colors"
                >
                  Achievements
                </Link>
              </li>
              <li>
                <Link
                  href="/basics/cohorts"
                  className="hover:text-white transition-colors"
                >
                  Cohorts
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms-of-service"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookie-policy"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/student-privacy"
                  className="hover:text-white transition-colors"
                >
                  Student Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@ludwitt.com"
                  className="hover:text-white transition-colors"
                >
                  support@ludwitt.com
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/ludwitt_academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ludwitt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="text-sm text-gray-500" suppressHydrationWarning>
            © {currentYear} Ludwitt. All rights reserved.
          </div>
        </div>

        {/* Educational Compliance Notice */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            Ludwitt is committed to student privacy and complies with COPPA,
            FERPA, and GDPR regulations. For students under 13, parental consent
            is required.
          </p>
        </div>
      </div>
    </footer>
  )
}

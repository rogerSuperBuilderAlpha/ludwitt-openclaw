/**
 * CustomerCTA Component
 * Call-to-action section for customer landing pages
 */

'use client'

import { ArrowRight } from 'lucide-react'

interface CustomerCTAProps {
  onSignIn: () => void
  title?: string
  subtitle?: string
  buttonText?: string
  primaryColor?: string
}

export function CustomerCTA({
  onSignIn,
  title = 'Ready to Get Started?',
  subtitle = 'Join our platform and streamline your project development workflow today',
  buttonText = 'Get Started Now',
  primaryColor = '#2563eb',
}: CustomerCTAProps) {
  return (
    <section className="px-6 py-20 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
        <p className="text-lg text-gray-600">{subtitle}</p>
        <button
          onClick={onSignIn}
          className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl text-lg font-semibold"
          style={{ backgroundColor: primaryColor }}
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

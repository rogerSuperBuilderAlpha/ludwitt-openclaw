'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { useCustomerAuth } from '@/lib/hooks/useCustomerAuth'
import { CustomerHeader } from '@/components/customers/CustomerHeader'
import { CustomerLandingHero } from '@/components/customers/CustomerLandingHero'
import { CustomerFeatures } from '@/components/customers/CustomerFeatures'
import { CustomerCTA } from '@/components/customers/CustomerCTA'
import { CustomerFooter } from '@/components/customers/CustomerFooter'

export default function CustomersLandingPage() {
  const router = useRouter()
  const { user, loading } = useCustomerAuth()

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (user) {
      router.push('/customers/dashboard')
    }
  }, [user, router])

  // Fire Twitter conversion event on page load
  useEffect(() => {
    // Twitter tracking pixel (twq) is loaded via script tag
    const win = window as Window & {
      twq?: (
        action: string,
        eventId: string,
        data?: Record<string, unknown>
      ) => void
    }
    if (typeof window !== 'undefined' && win.twq) {
      win.twq('event', 'tw-q6prc-q6prd', {
        value: null,
      })
    }
  }, [])

  const handleSignIn = () => {
    router.push('/login?redirect=/customers/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <CustomerHeader onSignIn={handleSignIn} showSignIn={!user} />
      <CustomerLandingHero onSignIn={handleSignIn} />
      <CustomerFeatures />
      <CustomerCTA onSignIn={handleSignIn} />
      <CustomerFooter />
    </main>
  )
}

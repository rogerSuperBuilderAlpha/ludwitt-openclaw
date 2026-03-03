/**
 * Developer-Specific Customer Page
 * Dynamic route that shows a customized customer page for each developer
 * Submissions auto-assign to the developer
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useCustomerAuth } from '@/lib/hooks/useCustomerAuth'
import { CustomerHeader } from '@/components/customers/CustomerHeader'
import { CustomerLandingHero } from '@/components/customers/CustomerLandingHero'
import { CustomerFeatures } from '@/components/customers/CustomerFeatures'
import { CustomerCTA } from '@/components/customers/CustomerCTA'
import { CustomerFooter } from '@/components/customers/CustomerFooter'
import { logger } from '@/lib/logger'

interface DeveloperProfile {
  id: string
  displayName: string
  isActive: boolean
  customPageSettings: {
    isEnabled: boolean
    showBio: boolean
    bio?: string
    showPhoto: boolean
    photoUrl?: string
    showCustomWelcome: boolean
    customWelcomeMessage?: string
    primaryColor?: string
    companyName?: string
    website?: string
  }
}

export default function DeveloperCustomerPage() {
  const router = useRouter()
  const params = useParams()
  const developerId = params.developerId as string
  const { user, loading: authLoading } = useCustomerAuth()

  const [developerProfile, setDeveloperProfile] =
    useState<DeveloperProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch developer profile
  useEffect(() => {
    async function fetchDeveloperProfile() {
      try {
        const response = await fetch(`/api/developers/profile/${developerId}`)
        const data = await response.json()

        if (!response.ok || !data.success) {
          setError('Developer not found or inactive')
          return
        }

        setDeveloperProfile(data.profile)
      } catch (err) {
        logger.error(
          'DeveloperCustomerPage',
          'Error fetching developer profile',
          { error: err }
        )
        setError('Failed to load developer profile')
      } finally {
        setLoading(false)
      }
    }

    if (developerId) {
      fetchDeveloperProfile()
    }
  }, [developerId])

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      router.push(`/customers/dashboard?dev=${developerId}`)
    }
  }, [user, authLoading, developerId, router])

  const handleSignIn = () => {
    router.push(`/login?redirect=/customers/dashboard?dev=${developerId}`)
  }

  // Loading state
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Error state - developer not found
  if (error || !developerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Developer Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error ||
              'This developer page does not exist or is no longer active.'}
          </p>
          <button
            onClick={() => router.push('/customers')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to General Customer Page
          </button>
        </div>
      </div>
    )
  }

  // Get customization settings
  const companyName =
    developerProfile.customPageSettings?.companyName ||
    developerProfile.displayName
  const primaryColor = developerProfile.customPageSettings?.primaryColor
  const website = developerProfile.customPageSettings?.website

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <CustomerHeader
        onSignIn={handleSignIn}
        showSignIn={!user}
        companyName={companyName}
      />

      <CustomerLandingHero
        onSignIn={handleSignIn}
        developerProfile={developerProfile}
        showDeveloperInfo={true}
      />

      <CustomerFeatures />

      <CustomerCTA onSignIn={handleSignIn} primaryColor={primaryColor} />

      <CustomerFooter companyName={companyName} website={website} />
    </main>
  )
}

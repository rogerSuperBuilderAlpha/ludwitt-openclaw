/**
 * CustomerLandingHero Component
 * Hero section for customer landing page
 * Supports customization for developer-specific pages
 */

'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { DeveloperProfile } from '@/lib/types/developer'

interface CustomerLandingHeroProps {
  onSignIn: () => void
  developerProfile?: Pick<
    DeveloperProfile,
    'displayName' | 'customPageSettings'
  > | null
  showDeveloperInfo?: boolean
}

export function CustomerLandingHero({
  onSignIn,
  developerProfile,
  showDeveloperInfo = false,
}: CustomerLandingHeroProps) {
  // Use custom settings if developer page and settings enabled
  const useCustom =
    showDeveloperInfo && developerProfile?.customPageSettings?.isEnabled

  const title =
    useCustom && developerProfile?.customPageSettings?.companyName
      ? `${developerProfile.customPageSettings.companyName} - Professional Development Services`
      : 'Professional Development Services'

  const subtitle =
    useCustom &&
    developerProfile?.customPageSettings?.showCustomWelcome &&
    developerProfile?.customPageSettings?.customWelcomeMessage
      ? developerProfile.customPageSettings.customWelcomeMessage
      : 'Turn your project observations into reality'

  // Use custom primary color if set
  const primaryColor =
    useCustom && developerProfile?.customPageSettings?.primaryColor
      ? developerProfile.customPageSettings.primaryColor
      : '#2563eb' // blue-600

  return (
    <section className="px-6 py-20 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Show developer info if enabled */}
        {showDeveloperInfo && developerProfile && (
          <div className="flex items-center justify-center gap-4 mb-4">
            {developerProfile.customPageSettings?.showPhoto &&
              developerProfile.customPageSettings?.photoUrl && (
                <Image
                  src={developerProfile.customPageSettings.photoUrl}
                  alt={developerProfile.displayName}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              )}
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {developerProfile.displayName}
              </h2>
              {developerProfile.customPageSettings?.showBio &&
                developerProfile.customPageSettings?.bio && (
                  <p className="text-gray-600 mt-1">
                    {developerProfile.customPageSettings.bio}
                  </p>
                )}
            </div>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Turn Your Project Ideas Into Reality
        </h1>

        <p className="text-lg md:text-xl text-gray-600">
          Share your requirements through Google Docs. We&apos;ll handle the
          development.
        </p>

        <button
          onClick={onSignIn}
          className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl text-lg font-semibold"
          style={{ backgroundColor: primaryColor }}
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

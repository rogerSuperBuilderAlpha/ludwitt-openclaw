/**
 * Public Developer Profile API
 * GET - Get public developer profile (no auth required)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getDeveloperProfile } from '@/lib/api/developers/profile'
import { apiLogger } from '@/lib/logger'

/**
 * GET /api/developers/profile/[developerId]
 * Get public developer profile for customer pages
 * No authentication required
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ developerId: string }> }
) {
  try {
    const { developerId } = await params
    const profile = await getDeveloperProfile(developerId)
    
    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Developer not found' },
        { status: 404 }
      )
    }
    
    if (!profile.isActive) {
      return NextResponse.json(
        { success: false, error: 'Developer is not active' },
        { status: 404 }
      )
    }
    
    // Return only public fields
    const publicProfile = {
      id: profile.id,
      displayName: profile.displayName,
      isActive: profile.isActive,
      isVerified: profile.isVerified,
      customPageSettings: profile.customPageSettings
    }
    
    return NextResponse.json({
      success: true,
      profile: publicProfile,
      exists: true
    })
  } catch (error) {
    apiLogger.apiError('developers/profile/[developerId]', 'Failed to fetch public developer profile', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch developer profile' },
      { status: 500 }
    )
  }
}


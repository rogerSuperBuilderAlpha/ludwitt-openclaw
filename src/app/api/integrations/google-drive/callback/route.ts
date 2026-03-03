/**
 * Google Drive OAuth Callback
 * 
 * GET - Handle OAuth callback from Google
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyOAuthState } from '@/lib/integrations/oauth'
import { completeGoogleDriveOAuth } from '@/lib/integrations/providers/google-drive'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  
  // Base redirect URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const integrationPageUrl = `${baseUrl}/developers/integrations`
  
  // Handle OAuth errors
  if (error) {
    return NextResponse.redirect(
      `${integrationPageUrl}?error=${encodeURIComponent(error)}&provider=google-drive`
    )
  }
  
  // Validate required parameters
  if (!code || !state) {
    return NextResponse.redirect(
      `${integrationPageUrl}?error=${encodeURIComponent('Missing OAuth parameters')}&provider=google-drive`
    )
  }
  
  // Verify state for CSRF protection
  const stateData = await verifyOAuthState(state)
  if (!stateData) {
    return NextResponse.redirect(
      `${integrationPageUrl}?error=${encodeURIComponent('Invalid or expired state')}&provider=google-drive`
    )
  }
  
  // Complete OAuth flow
  const result = await completeGoogleDriveOAuth(stateData.userId, code)
  
  if (result.success) {
    return NextResponse.redirect(
      `${integrationPageUrl}?success=true&provider=google-drive&email=${encodeURIComponent(result.email)}`
    )
  } else {
    return NextResponse.redirect(
      `${integrationPageUrl}?error=${encodeURIComponent(result.error)}&provider=google-drive`
    )
  }
}

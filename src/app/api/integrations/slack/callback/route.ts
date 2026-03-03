/**
 * Slack OAuth Callback
 * 
 * GET - Handle OAuth callback from Slack
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyOAuthState } from '@/lib/integrations/oauth'
import { completeSlackOAuth } from '@/lib/integrations/providers/slack'

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
      `${integrationPageUrl}?error=${encodeURIComponent(error)}&provider=slack`
    )
  }
  
  // Validate required parameters
  if (!code || !state) {
    return NextResponse.redirect(
      `${integrationPageUrl}?error=${encodeURIComponent('Missing OAuth parameters')}&provider=slack`
    )
  }
  
  // Verify state for CSRF protection
  const stateData = await verifyOAuthState(state)
  if (!stateData) {
    return NextResponse.redirect(
      `${integrationPageUrl}?error=${encodeURIComponent('Invalid or expired state')}&provider=slack`
    )
  }
  
  // Complete OAuth flow
  const result = await completeSlackOAuth(stateData.userId, code)
  
  if (result.success) {
    return NextResponse.redirect(
      `${integrationPageUrl}?success=true&provider=slack&workspace=${encodeURIComponent(result.workspaceName)}`
    )
  } else {
    return NextResponse.redirect(
      `${integrationPageUrl}?error=${encodeURIComponent(result.error)}&provider=slack`
    )
  }
}

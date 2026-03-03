/**
 * GitHub OAuth Callback
 * 
 * GET - Handle OAuth callback from GitHub
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyOAuthState } from '@/lib/integrations/oauth'
import { completeGitHubOAuth } from '@/lib/integrations/providers/github'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  
  // Base redirect URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const defaultRedirect = `${baseUrl}/developers/integrations`

  // Handle OAuth errors (state not yet verified, use default redirect)
  if (error) {
    return NextResponse.redirect(
      `${defaultRedirect}?error=${encodeURIComponent(error)}&provider=github`
    )
  }

  // Validate required parameters
  if (!code || !state) {
    return NextResponse.redirect(
      `${defaultRedirect}?error=${encodeURIComponent('Missing OAuth parameters')}&provider=github`
    )
  }

  // Verify state for CSRF protection
  const stateData = await verifyOAuthState(state)
  if (!stateData) {
    return NextResponse.redirect(
      `${defaultRedirect}?error=${encodeURIComponent('Invalid or expired state')}&provider=github`
    )
  }

  // Use returnTo from state if provided, otherwise default to integrations page
  const redirectPath = stateData.returnTo || '/developers/integrations'
  const integrationPageUrl = `${baseUrl}${redirectPath}`

  // Complete OAuth flow
  const result = await completeGitHubOAuth(stateData.userId, code)

  if (result.success) {
    return NextResponse.redirect(
      `${integrationPageUrl}?success=true&provider=github&username=${encodeURIComponent(result.username)}`
    )
  } else {
    return NextResponse.redirect(
      `${integrationPageUrl}?error=${encodeURIComponent(result.error)}&provider=github`
    )
  }
}

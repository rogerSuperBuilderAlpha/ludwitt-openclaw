import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

// Google Drive OAuth configuration
const GOOGLE_DRIVE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  redirectUri:
    process.env.NEXT_PUBLIC_APP_URL + '/api/customers/drive/callback',
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'openid',
    'email',
    'profile',
  ],
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    if (!GOOGLE_DRIVE_OAUTH_CONFIG.clientId) {
      return NextResponse.json(
        { error: 'Google Drive integration not configured' },
        { status: 503 }
      )
    }

    // Generate CSRF-protected OAuth state with HMAC signature
    const returnTo = '/customers/dashboard'
    const ts = Date.now()
    const payload = `${userId}:${returnTo}:${ts}`
    const sig = createHmac(
      'sha256',
      GOOGLE_DRIVE_OAUTH_CONFIG.clientSecret || ''
    )
      .update(payload)
      .digest('hex')

    const state = Buffer.from(
      JSON.stringify({
        userId,
        returnTo,
        ts,
        sig,
      })
    ).toString('base64')

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', GOOGLE_DRIVE_OAUTH_CONFIG.clientId)
    authUrl.searchParams.set(
      'redirect_uri',
      GOOGLE_DRIVE_OAUTH_CONFIG.redirectUri
    )
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set(
      'scope',
      GOOGLE_DRIVE_OAUTH_CONFIG.scopes.join(' ')
    )
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent')
    authUrl.searchParams.set('state', state)

    return NextResponse.json({
      success: true,
      authUrl: authUrl.toString(),
    })
  } catch (error) {
    apiLogger.apiError(
      'customers/drive/connect',
      'Failed to generate auth URL',
      error
    )
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to generate auth URL') },
      { status: 500 }
    )
  }
}

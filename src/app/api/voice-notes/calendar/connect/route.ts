import { NextRequest, NextResponse } from 'next/server'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

// Google Calendar OAuth configuration
const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_APP_URL + '/api/voice-notes/calendar/callback',
  scopes: [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events.readonly'
  ]
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    if (!GOOGLE_OAUTH_CONFIG.clientId) {
      return NextResponse.json(
        { error: 'Calendar integration not configured' },
        { status: 503 }
      )
    }

    // Generate OAuth URL
    const state = Buffer.from(JSON.stringify({ userId })).toString('base64')
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', GOOGLE_OAUTH_CONFIG.clientId)
    authUrl.searchParams.set('redirect_uri', GOOGLE_OAUTH_CONFIG.redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', GOOGLE_OAUTH_CONFIG.scopes.join(' '))
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent')
    authUrl.searchParams.set('state', state)

    return NextResponse.json({
      success: true,
      authUrl: authUrl.toString()
    })
  } catch (error) {
    apiLogger.apiError('voice-notes/calendar/connect', 'Failed to generate auth URL', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to generate auth URL') },
      { status: 500 }
    )
  }
}


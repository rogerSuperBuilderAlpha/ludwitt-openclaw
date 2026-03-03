import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'

const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
  redirectUri: process.env.NEXT_PUBLIC_APP_URL + '/api/university/calendar/callback',
  scopes: [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events.readonly',
  ],
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    if (!GOOGLE_OAUTH_CONFIG.clientId) {
      return NextResponse.json(
        { error: 'Calendar integration not configured' },
        { status: 503 }
      )
    }

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
      authUrl: authUrl.toString(),
    })
  } catch (error) {
    return serverError(error, 'Failed to generate auth URL')
  }
}

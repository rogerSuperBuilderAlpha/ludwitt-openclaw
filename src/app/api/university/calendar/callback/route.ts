import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'
import { serverError } from '@/lib/api/error-responses'

const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_APP_URL + '/api/university/calendar/callback',
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      return NextResponse.redirect(new URL('/university?error=missing_params', request.url))
    }

    const { userId } = JSON.parse(Buffer.from(state, 'base64').toString())

    if (!userId) {
      return NextResponse.redirect(new URL('/university?error=invalid_state', request.url))
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_OAUTH_CONFIG.clientId!,
        client_secret: GOOGLE_OAUTH_CONFIG.clientSecret!,
        redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens')
    }

    const tokens = await tokenResponse.json()

    let userEmail = 'calendar-user@connected.com'
    if (tokens.id_token) {
      try {
        const base64Payload = tokens.id_token.split('.')[1]
        const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString())
        userEmail = payload.email || payload.sub || userEmail
      } catch {
        // Use fallback email
      }
    }

    await db.collection('calendarIntegrations').doc(userId).set({
      userId,
      provider: 'google',
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || 'not_provided',
      expiresAt: Timestamp.fromMillis(Date.now() + ((tokens.expires_in || 3600) * 1000)),
      email: userEmail,
      calendarId: 'primary',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><title>Calendar Connected</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f9fafb; color: #111827; }
        .container { text-align: center; padding: 40px; }
        h1 { font-size: 24px; margin-bottom: 8px; }
        p { color: #6b7280; font-size: 14px; }
      </style>
      </head>
      <body>
        <div class="container">
          <h1>Calendar Connected</h1>
          <p>Returning to University...</p>
        </div>
        <script>
          if (window.opener) {
            window.opener.postMessage({ type: 'university-calendar-connected', success: true }, '*');
            setTimeout(() => window.close(), 1000);
          } else {
            window.location.href = '/university?calendar=connected';
          }
        </script>
      </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } })
  } catch (error) {
    return serverError(error, 'Calendar callback failed')
  }
}

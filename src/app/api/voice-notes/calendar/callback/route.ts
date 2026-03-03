import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'
import { apiLogger } from '@/lib/logger'

const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  redirectUri:
    process.env.NEXT_PUBLIC_APP_URL + '/api/voice-notes/calendar/callback',
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/voice-notes?error=missing_params', request.url)
      )
    }

    // Decode state to get userId
    const { userId } = JSON.parse(Buffer.from(state, 'base64').toString())

    if (!userId) {
      return NextResponse.redirect(
        new URL('/voice-notes?error=invalid_state', request.url)
      )
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
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

    // Extract email from ID token (most reliable method)
    let userEmail = 'calendar-user@connected.com' // Fallback

    if (tokens.id_token) {
      try {
        const base64Payload = tokens.id_token.split('.')[1]
        const payload = JSON.parse(
          Buffer.from(base64Payload, 'base64').toString()
        )
        userEmail =
          payload.email || payload.sub || 'calendar-user@connected.com'
      } catch {
        // Use fallback email if ID token decode fails
      }
    }

    // Save integration to Firestore
    const integrationData = {
      userId,
      provider: 'google',
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || 'not_provided',
      expiresAt: Timestamp.fromMillis(
        Date.now() + (tokens.expires_in || 3600) * 1000
      ),
      email: userEmail,
      calendarId: 'primary',
      autoJoinEnabled: true,
      autoRecordEnabled: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    await db.collection('calendarIntegrations').doc(userId).set(integrationData)

    // Return HTML that closes popup and sends message to parent
    return new Response(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Calendar Connected</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
            color: white;
          }
          .container {
            text-align: center;
            padding: 40px;
          }
          .success {
            font-size: 64px;
            margin-bottom: 20px;
          }
          h1 {
            font-size: 32px;
            margin-bottom: 10px;
          }
          p {
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success">✅</div>
          <h1>Calendar Connected!</h1>
          <p>Returning to Voice Notes...</p>
        </div>
        <script>
          // Send message to parent window
          if (window.opener) {
            window.opener.postMessage({ type: 'calendar-connected', success: true }, '*');
            setTimeout(() => {
              window.close();
            }, 1000);
          } else {
            // If not popup, redirect
            window.location.href = '/voice-notes?calendar=connected';
          }
        </script>
      </body>
      </html>
    `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  } catch (error) {
    apiLogger.apiError(
      'voice-notes/calendar/callback',
      'Calendar callback error',
      error
    )
    return NextResponse.redirect(
      new URL('/voice-notes?error=connection_failed', request.url)
    )
  }
}

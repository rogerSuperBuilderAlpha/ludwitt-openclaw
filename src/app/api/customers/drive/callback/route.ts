import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { db } from '@/lib/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'
import { apiLogger } from '@/lib/logger'

const GOOGLE_DRIVE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  redirectUri:
    process.env.NEXT_PUBLIC_APP_URL + '/api/customers/drive/callback',
}

/** Verify HMAC signature on OAuth state to prevent CSRF */
function verifyOAuthState(
  state: string
): { userId: string; returnTo: string } | null {
  try {
    const stateData = JSON.parse(Buffer.from(state, 'base64').toString())
    const { userId, returnTo, ts, sig } = stateData

    if (!userId || !sig || !ts) return null

    // Reject states older than 10 minutes
    if (Date.now() - ts > 10 * 60 * 1000) return null

    const secret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || ''
    const payload = `${userId}:${returnTo || ''}:${ts}`
    const expectedSig = createHmac('sha256', secret)
      .update(payload)
      .digest('hex')

    if (sig !== expectedSig) return null

    return { userId, returnTo: returnTo || '/customers/dashboard' }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Handle OAuth errors
    if (error) {
      return NextResponse.redirect(
        new URL(
          '/customers/dashboard?drive_error=' + encodeURIComponent(error),
          request.url
        )
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/customers/dashboard?drive_error=missing_params', request.url)
      )
    }

    // Verify CSRF-protected state
    const verified = verifyOAuthState(state)
    if (!verified) {
      return NextResponse.redirect(
        new URL('/customers/dashboard?drive_error=invalid_state', request.url)
      )
    }

    const { userId, returnTo } = verified

    if (!userId) {
      return NextResponse.redirect(
        new URL('/customers/dashboard?drive_error=missing_user', request.url)
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
        client_id: GOOGLE_DRIVE_OAUTH_CONFIG.clientId!,
        client_secret: GOOGLE_DRIVE_OAUTH_CONFIG.clientSecret!,
        redirect_uri: GOOGLE_DRIVE_OAUTH_CONFIG.redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      apiLogger.apiError('customers/drive/callback', 'Token exchange failed', {
        error: errorData,
      })
      return NextResponse.redirect(
        new URL(
          '/customers/dashboard?drive_error=token_exchange_failed',
          request.url
        )
      )
    }

    const tokens = await tokenResponse.json()

    // Extract email from ID token (sanitize to prevent HTML/JS injection)
    let userEmail = 'drive-user@connected.com'
    let userName = 'Google Drive User'

    if (tokens.id_token) {
      try {
        const base64Payload = tokens.id_token.split('.')[1]
        const payload = JSON.parse(
          Buffer.from(base64Payload, 'base64').toString()
        )
        userEmail = payload.email || userEmail
        userName = payload.name || userName
      } catch {
        // Use fallback values if ID token decode fails
      }
    }

    // Sanitize values before embedding in HTML to prevent XSS
    const safeEmail = userEmail.replace(/[<>"'&\\]/g, '')
    const safeReturnTo = returnTo.replace(/[<>"'&\\]/g, '')

    // Save integration to Firestore
    const integrationData = {
      userId,
      provider: 'google-drive',
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || null,
      expiresAt: Timestamp.fromMillis(
        Date.now() + (tokens.expires_in || 3600) * 1000
      ),
      email: userEmail,
      displayName: userName,
      isActive: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    await db.collection('driveIntegrations').doc(userId).set(integrationData)

    // Return HTML that closes popup immediately and notifies parent
    return new Response(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Connecting...</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #f5f5f5;
            color: #333;
          }
          .container {
            text-align: center;
            padding: 40px;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e0e0e0;
            border-top-color: #4285f4;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 16px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          p { color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="spinner"></div>
          <p>Connected! Closing...</p>
        </div>
        <script>
          // Send message to parent window and close immediately
          if (window.opener) {
            window.opener.postMessage({ 
              type: 'drive-connected', 
              success: true,
              email: '${safeEmail}'
            }, window.location.origin);
            // Close immediately
            window.close();
            // Fallback if close doesn't work (some browsers block it)
            setTimeout(function() {
              while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
              var wrapper = document.createElement('div');
              wrapper.style.cssText = 'text-align:center;padding:40px;font-family:sans-serif;';
              var check = document.createElement('p');
              check.style.cssText = 'color:#22c55e;font-size:24px;';
              check.textContent = '\u2713 Connected!';
              var msg = document.createElement('p');
              msg.textContent = 'You can close this window.';
              wrapper.appendChild(check);
              wrapper.appendChild(msg);
              document.body.appendChild(wrapper);
            }, 100);
          } else {
            // If opened in same tab (not popup), redirect back
            window.location.href = '${safeReturnTo}?drive=connected';
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
      'customers/drive/callback',
      'Drive callback error',
      error
    )
    return NextResponse.redirect(
      new URL('/customers/dashboard?drive_error=connection_failed', request.url)
    )
  }
}

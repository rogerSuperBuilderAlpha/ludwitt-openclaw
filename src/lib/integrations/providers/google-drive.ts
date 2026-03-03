/**
 * Google Drive OAuth Provider
 * 
 * Handles Google Drive OAuth for file access integration
 */

import { createOAuthState, getOAuthBaseUrl, buildAuthUrl } from '../oauth'
import { upsertIntegration, disconnectIntegration, getIntegrationWithTokens } from '../service'

// Google OAuth endpoints
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'

// Scopes for Drive access
const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

/**
 * Get Google OAuth client credentials
 */
function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_INTEGRATION_CLIENT_ID
  const clientSecret = process.env.GOOGLE_INTEGRATION_CLIENT_SECRET
  
  if (!clientId || !clientSecret) {
    throw new Error('Google Drive integration OAuth credentials not configured')
  }
  
  return { clientId, clientSecret }
}

/**
 * Generate the Google authorization URL
 */
export async function getGoogleDriveAuthUrl(userId: string): Promise<string> {
  const { clientId } = getGoogleCredentials()
  const baseUrl = getOAuthBaseUrl()
  const redirectUri = `${baseUrl}/api/integrations/google-drive/callback`
  
  // Create state for CSRF protection
  const state = await createOAuthState(userId, redirectUri)
  
  return buildAuthUrl(GOOGLE_AUTH_URL, {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: GOOGLE_SCOPES.join(' '),
    state,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent', // Force consent to get refresh token
  })
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeGoogleCode(code: string): Promise<{
  accessToken: string
  refreshToken: string | null
  expiresIn: number
  scope: string
}> {
  const { clientId, clientSecret } = getGoogleCredentials()
  const baseUrl = getOAuthBaseUrl()
  const redirectUri = `${baseUrl}/api/integrations/google-drive/callback`
  
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Google token exchange failed: ${error}`)
  }
  
  const data = await response.json()
  
  if (data.error) {
    throw new Error(`Google OAuth error: ${data.error_description || data.error}`)
  }
  
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || null,
    expiresIn: data.expires_in,
    scope: data.scope,
  }
}

/**
 * Refresh Google access token
 */
export async function refreshGoogleToken(refreshToken: string): Promise<{
  accessToken: string
  expiresIn: number
}> {
  const { clientId, clientSecret } = getGoogleCredentials()
  
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })
  
  if (!response.ok) {
    throw new Error(`Google token refresh failed: ${response.status}`)
  }
  
  const data = await response.json()
  
  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  }
}

/**
 * Get Google user info using access token
 */
export async function getGoogleUser(accessToken: string): Promise<{
  id: string
  email: string
  name: string
  picture: string
}> {
  const response = await fetch(GOOGLE_USER_INFO_URL, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  
  if (!response.ok) {
    throw new Error(`Google user fetch failed: ${response.status}`)
  }
  
  return response.json()
}

/**
 * Complete Google Drive OAuth flow and save integration
 */
export async function completeGoogleDriveOAuth(
  userId: string,
  code: string
): Promise<{ success: true; email: string } | { success: false; error: string }> {
  try {
    // Exchange code for tokens
    const { accessToken, refreshToken, expiresIn, scope } = await exchangeGoogleCode(code)
    
    // Get user info
    const user = await getGoogleUser(accessToken)
    
    // Calculate token expiry
    const tokenExpiresAt = new Date(Date.now() + expiresIn * 1000)
    
    // Save integration
    await upsertIntegration(userId, 'google-drive', {
      accessToken,
      refreshToken: refreshToken || undefined,
      tokenExpiresAt,
      providerUserId: user.id,
      providerEmail: user.email,
      providerUsername: user.name,
      providerAvatarUrl: user.picture,
      scopes: scope.split(' '),
    })
    
    return { success: true, email: user.email }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}

/**
 * Disconnect Google Drive integration
 */
export async function disconnectGoogleDrive(userId: string): Promise<boolean> {
  return disconnectIntegration(userId, 'google-drive')
}

/**
 * Get a valid access token (refreshing if needed)
 */
export async function getValidGoogleToken(userId: string): Promise<string | null> {
  const integration = await getIntegrationWithTokens(userId, 'google-drive')
  
  if (!integration || !integration.connected || !integration.accessToken) {
    return null
  }
  
  // Check if token is expired
  const expiresAt = integration.tokenExpiresAt?.toDate?.()
  if (expiresAt && expiresAt < new Date() && integration.refreshToken) {
    try {
      const { accessToken, expiresIn } = await refreshGoogleToken(integration.refreshToken)
      
      // Update stored token
      await upsertIntegration(userId, 'google-drive', {
        accessToken,
        refreshToken: integration.refreshToken,
        tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
        providerUserId: integration.providerUserId,
        providerEmail: integration.providerEmail,
        providerUsername: integration.providerUsername,
        providerAvatarUrl: integration.providerAvatarUrl,
        scopes: integration.scopes,
      })
      
      return accessToken
    } catch {
      return null
    }
  }
  
  return integration.accessToken
}

/**
 * List files from Google Drive (example of using the integration)
 */
export async function listDriveFiles(accessToken: string, pageSize = 20): Promise<Array<{
  id: string
  name: string
  mimeType: string
  webViewLink: string
}>> {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&fields=files(id,name,mimeType,webViewLink)`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  )
  
  if (!response.ok) {
    throw new Error(`Failed to list files: ${response.status}`)
  }
  
  const data = await response.json()
  return data.files || []
}

/**
 * GitHub OAuth Provider
 * 
 * Handles GitHub OAuth for repository access integration
 */

import { createOAuthState, getOAuthBaseUrl, buildAuthUrl } from '../oauth'
import { upsertIntegration, disconnectIntegration } from '../service'

// GitHub OAuth endpoints
const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
const GITHUB_API_URL = 'https://api.github.com'

// Scopes for repo access
const GITHUB_SCOPES = ['repo', 'read:user', 'user:email']

/**
 * Get GitHub OAuth client credentials
 * Uses separate credentials from login OAuth
 */
function getGitHubCredentials() {
  const clientId = process.env.GITHUB_INTEGRATION_CLIENT_ID_U
  const clientSecret = process.env.GITHUB_INTEGRATION_CLIENT_SECRET_U
  
  if (!clientId || !clientSecret) {
    throw new Error('GitHub integration OAuth credentials not configured')
  }
  
  return { clientId, clientSecret }
}

/**
 * Generate the GitHub authorization URL
 */
export async function getGitHubAuthUrl(userId: string, returnTo?: string): Promise<string> {
  const { clientId } = getGitHubCredentials()
  const baseUrl = getOAuthBaseUrl()
  const redirectUri = `${baseUrl}/api/integrations/github/callback`

  // Create state for CSRF protection
  const state = await createOAuthState(userId, redirectUri, returnTo)
  
  return buildAuthUrl(GITHUB_AUTH_URL, {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: GITHUB_SCOPES.join(' '),
    state,
    allow_signup: 'false',
  })
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeGitHubCode(code: string): Promise<{
  accessToken: string
  tokenType: string
  scope: string
}> {
  const { clientId, clientSecret } = getGitHubCredentials()
  
  const response = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  })
  
  if (!response.ok) {
    throw new Error(`GitHub token exchange failed: ${response.status}`)
  }
  
  const data = await response.json()
  
  if (data.error) {
    throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`)
  }
  
  return {
    accessToken: data.access_token,
    tokenType: data.token_type,
    scope: data.scope,
  }
}

/**
 * Get GitHub user info using access token
 */
export async function getGitHubUser(accessToken: string): Promise<{
  id: number
  login: string
  email: string | null
  avatar_url: string
  name: string | null
}> {
  const response = await fetch(`${GITHUB_API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })
  
  if (!response.ok) {
    throw new Error(`GitHub user fetch failed: ${response.status}`)
  }
  
  const user = await response.json()
  
  // If email is private, fetch from emails endpoint
  if (!user.email) {
    const emailsResponse = await fetch(`${GITHUB_API_URL}/user/emails`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })
    
    if (emailsResponse.ok) {
      const emails = await emailsResponse.json()
      const primaryEmail = emails.find((e: { primary: boolean }) => e.primary)
      user.email = primaryEmail?.email || emails[0]?.email || null
    }
  }
  
  return user
}

/**
 * Complete GitHub OAuth flow and save integration
 */
export async function completeGitHubOAuth(
  userId: string,
  code: string
): Promise<{ success: true; username: string } | { success: false; error: string }> {
  try {
    // Exchange code for token
    const { accessToken, scope } = await exchangeGitHubCode(code)
    
    // Get user info
    const user = await getGitHubUser(accessToken)
    
    // Save integration
    await upsertIntegration(userId, 'github', {
      accessToken,
      providerUserId: String(user.id),
      providerEmail: user.email || undefined,
      providerUsername: user.login,
      providerAvatarUrl: user.avatar_url,
      scopes: scope.split(',').map(s => s.trim()),
    })
    
    return { success: true, username: user.login }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}

/**
 * Disconnect GitHub integration
 */
export async function disconnectGitHub(userId: string): Promise<boolean> {
  return disconnectIntegration(userId, 'github')
}

/**
 * Get user's repositories (example of using the integration)
 */
export async function getGitHubRepos(accessToken: string): Promise<Array<{
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
}>> {
  const response = await fetch(`${GITHUB_API_URL}/user/repos?sort=updated&per_page=100`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repos: ${response.status}`)
  }
  
  return response.json()
}

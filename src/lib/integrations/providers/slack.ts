/**
 * Slack OAuth Provider
 * 
 * Handles Slack OAuth for workspace notifications
 * Each developer connects their own Slack workspace
 */

import { createOAuthState, getOAuthBaseUrl, buildAuthUrl } from '../oauth'
import { upsertIntegration, disconnectIntegration, getIntegrationWithTokens } from '../service'

// Slack OAuth endpoints
const SLACK_AUTH_URL = 'https://slack.com/oauth/v2/authorize'
const SLACK_TOKEN_URL = 'https://slack.com/api/oauth.v2.access'
const SLACK_API_URL = 'https://slack.com/api'

// Scopes for notifications
const SLACK_SCOPES = [
  'chat:write',
  'channels:read',
  'users:read',
  'users:read.email',
]

/**
 * Get Slack OAuth client credentials
 * These are YOUR app credentials, but developers connect their own workspaces
 */
function getSlackCredentials() {
  const clientId = process.env.SLACK_CLIENT_ID
  const clientSecret = process.env.SLACK_CLIENT_SECRET
  
  if (!clientId || !clientSecret) {
    throw new Error('Slack OAuth credentials not configured')
  }
  
  return { clientId, clientSecret }
}

/**
 * Generate the Slack authorization URL
 */
export async function getSlackAuthUrl(userId: string): Promise<string> {
  const { clientId } = getSlackCredentials()
  const baseUrl = getOAuthBaseUrl()
  const redirectUri = `${baseUrl}/api/integrations/slack/callback`
  
  // Create state for CSRF protection
  const state = await createOAuthState(userId, redirectUri)
  
  return buildAuthUrl(SLACK_AUTH_URL, {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SLACK_SCOPES.join(','),
    state,
    user_scope: 'identity.basic,identity.email',
  })
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeSlackCode(code: string): Promise<{
  accessToken: string
  teamId: string
  teamName: string
  userId: string
  scope: string
}> {
  const { clientId, clientSecret } = getSlackCredentials()
  const baseUrl = getOAuthBaseUrl()
  const redirectUri = `${baseUrl}/api/integrations/slack/callback`
  
  const response = await fetch(SLACK_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  })
  
  if (!response.ok) {
    throw new Error(`Slack token exchange failed: ${response.status}`)
  }
  
  const data = await response.json()
  
  if (!data.ok) {
    throw new Error(`Slack OAuth error: ${data.error}`)
  }
  
  return {
    accessToken: data.access_token,
    teamId: data.team.id,
    teamName: data.team.name,
    userId: data.authed_user.id,
    scope: data.scope,
  }
}

/**
 * Get Slack user info
 */
export async function getSlackUser(accessToken: string, userId: string): Promise<{
  id: string
  name: string
  email: string | null
  image: string
}> {
  const response = await fetch(`${SLACK_API_URL}/users.info?user=${userId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  
  if (!response.ok) {
    throw new Error(`Slack user fetch failed: ${response.status}`)
  }
  
  const data = await response.json()
  
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error}`)
  }
  
  return {
    id: data.user.id,
    name: data.user.real_name || data.user.name,
    email: data.user.profile?.email || null,
    image: data.user.profile?.image_72 || '',
  }
}

/**
 * Complete Slack OAuth flow and save integration
 */
export async function completeSlackOAuth(
  userId: string,
  code: string
): Promise<{ success: true; workspaceName: string } | { success: false; error: string }> {
  try {
    // Exchange code for token
    const { accessToken, teamId, teamName, userId: slackUserId, scope } = 
      await exchangeSlackCode(code)
    
    // Get user info
    const user = await getSlackUser(accessToken, slackUserId)
    
    // Save integration
    await upsertIntegration(userId, 'slack', {
      accessToken,
      providerUserId: slackUserId,
      providerEmail: user.email || undefined,
      providerUsername: user.name,
      providerAvatarUrl: user.image,
      scopes: scope.split(',').map(s => s.trim()),
      workspaceId: teamId,
      workspaceName: teamName,
    })
    
    return { success: true, workspaceName: teamName }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}

/**
 * Disconnect Slack integration
 */
export async function disconnectSlack(userId: string): Promise<boolean> {
  return disconnectIntegration(userId, 'slack')
}

/**
 * Send a message to a Slack channel
 */
export async function sendSlackMessage(
  accessToken: string,
  channel: string,
  text: string,
  blocks?: object[]
): Promise<boolean> {
  const response = await fetch(`${SLACK_API_URL}/chat.postMessage`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel,
      text,
      blocks,
    }),
  })
  
  if (!response.ok) {
    return false
  }
  
  const data = await response.json()
  return data.ok
}

/**
 * Get list of channels for the workspace
 */
export async function getSlackChannels(accessToken: string): Promise<Array<{
  id: string
  name: string
  is_private: boolean
}>> {
  const response = await fetch(`${SLACK_API_URL}/conversations.list?types=public_channel,private_channel`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  
  if (!response.ok) {
    throw new Error(`Failed to list channels: ${response.status}`)
  }
  
  const data = await response.json()
  
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error}`)
  }
  
  return data.channels || []
}

/**
 * Get Slack access token for a user
 */
export async function getSlackToken(userId: string): Promise<string | null> {
  const integration = await getIntegrationWithTokens(userId, 'slack')
  
  if (!integration || !integration.connected || !integration.accessToken) {
    return null
  }
  
  return integration.accessToken
}

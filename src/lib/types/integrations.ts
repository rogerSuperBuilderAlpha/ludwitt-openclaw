/**
 * Integration Types
 * 
 * Types for OAuth integrations (GitHub, Google Drive, Slack, Webhooks)
 */

export type IntegrationType = 'github' | 'google-drive' | 'slack' | 'webhooks'

export interface IntegrationConnection {
  id: string
  userId: string
  type: IntegrationType
  connected: boolean
  connectedAt: Date | null
  
  // OAuth tokens (encrypted in production)
  accessToken?: string
  refreshToken?: string
  tokenExpiresAt?: Date | null
  
  // Provider-specific data
  providerUserId?: string
  providerEmail?: string
  providerUsername?: string
  providerAvatarUrl?: string
  
  // Scopes granted
  scopes: string[]
  
  // For Slack - workspace info
  workspaceId?: string
  workspaceName?: string
  
  // Metadata
  lastUsedAt: Date | null
  errorMessage?: string
}

// Firestore document structure
export interface IntegrationConnectionDoc {
  userId: string
  type: IntegrationType
  connected: boolean
  connectedAt: FirebaseFirestore.Timestamp | null
  accessToken?: string
  refreshToken?: string
  tokenExpiresAt?: FirebaseFirestore.Timestamp | null
  providerUserId?: string
  providerEmail?: string
  providerUsername?: string
  providerAvatarUrl?: string
  scopes: string[]
  workspaceId?: string
  workspaceName?: string
  lastUsedAt: FirebaseFirestore.Timestamp | null
  errorMessage?: string
}

// Public info (no tokens)
export interface IntegrationConnectionPublic {
  id: string
  type: IntegrationType
  connected: boolean
  connectedAt: string | null
  providerEmail?: string
  providerUsername?: string
  providerAvatarUrl?: string
  scopes: string[]
  workspaceId?: string
  workspaceName?: string
  lastUsedAt: string | null
}

// Webhook subscription
export interface WebhookSubscription {
  id: string
  userId: string
  name: string
  url: string
  secret: string // For HMAC verification
  events: WebhookEvent[]
  isActive: boolean
  createdAt: Date
  lastTriggeredAt: Date | null
  failureCount: number
  lastError?: string
}

export type WebhookEvent = 
  | 'document.created'
  | 'document.updated'
  | 'document.completed'
  | 'document.assigned'
  | 'customer.created'
  | 'customer.updated'
  | 'payment.received'

export interface WebhookDelivery {
  id: string
  webhookId: string
  event: WebhookEvent
  payload: Record<string, unknown>
  responseStatus: number | null
  responseBody?: string
  deliveredAt: Date
  success: boolean
  retryCount: number
}

// OAuth state for CSRF protection
export interface OAuthState {
  userId: string
  redirectUrl: string
  expiresAt: number
  nonce: string
  returnTo?: string   // post-OAuth redirect path (e.g. '/university')
}

/**
 * API Key Types
 * 
 * Used for external developer access to Ludwitt APIs
 */

export type ApiKeyType = 'live' | 'test'

export interface ApiKey {
  id: string
  userId: string // Owner of the key
  userEmail: string // For display/audit
  name: string // User-provided name like "Production Key"
  type: ApiKeyType // 'live' or 'test'
  prefix: string // 'pk_live_' or 'pk_test_'
  keyHash: string // SHA-256 hash of the full key (never store plaintext)
  lastFourChars: string // Last 4 characters for identification
  createdAt: Date
  lastUsedAt: Date | null
  expiresAt: Date | null // null = never expires
  isRevoked: boolean
  revokedAt: Date | null
  revokedReason?: string
  
  // Usage tracking
  totalRequests: number
  requestsToday: number
  lastRequestDate: string | null // YYYY-MM-DD for daily reset
  
  // Rate limiting
  rateLimit: number // Requests per minute
  
  // Scopes/permissions (for future use)
  scopes: string[]
}

// What we return to the frontend (never expose hash)
export interface ApiKeyPublic {
  id: string
  name: string
  type: ApiKeyType
  prefix: string
  lastFourChars: string
  createdAt: string
  lastUsedAt: string | null
  expiresAt: string | null
  isRevoked: boolean
  totalRequests: number
  scopes: string[]
}

// Response when creating a new key (includes full key ONCE)
export interface ApiKeyCreateResponse {
  key: ApiKeyPublic
  fullKey: string // Only returned on creation, never again
}

// Request to create a new key
export interface ApiKeyCreateRequest {
  name: string
  type: ApiKeyType
  expiresInDays?: number // Optional expiration
  scopes?: string[] // Optional scopes
}

// Firestore document structure
export interface ApiKeyDoc {
  userId: string
  userEmail: string
  name: string
  type: ApiKeyType
  prefix: string
  keyHash: string
  lastFourChars: string
  createdAt: FirebaseFirestore.Timestamp
  lastUsedAt: FirebaseFirestore.Timestamp | null
  expiresAt: FirebaseFirestore.Timestamp | null
  isRevoked: boolean
  revokedAt: FirebaseFirestore.Timestamp | null
  revokedReason?: string
  totalRequests: number
  requestsToday: number
  lastRequestDate: string | null
  rateLimit: number
  scopes: string[]
}

// Validation result
export interface ApiKeyValidation {
  valid: boolean
  userId?: string
  userEmail?: string
  keyId?: string
  type?: ApiKeyType
  scopes?: string[]
  error?: string
}

// Available scopes
export const API_SCOPES = {
  'documents:read': 'Read document information',
  'documents:write': 'Create and update documents',
  'customers:read': 'Read customer information',
  'customers:write': 'Create and update customers',
  'analytics:read': 'Access analytics data',
  'webhooks:manage': 'Manage webhook subscriptions',
} as const

export type ApiScope = keyof typeof API_SCOPES

// Default rate limits by key type
export const DEFAULT_RATE_LIMITS = {
  test: 60, // 60 requests per minute for test keys
  live: 300, // 300 requests per minute for live keys
} as const

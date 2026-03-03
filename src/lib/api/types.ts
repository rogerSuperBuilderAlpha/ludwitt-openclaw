// API types and permissions

export type ApiPermission =
  | 'read:user'
  | 'write:user'
  | 'read:projects'
  | 'write:projects'
  | 'read:achievements'
  | 'read:portfolio'
  | 'write:portfolio'
  | 'read:cohorts'
  | 'write:cohorts'
  | 'read:stats'

export interface ApiKey {
  id: string
  userId: string
  name: string
  key: string
  keyPrefix: string // First 8 chars for display
  permissions: ApiPermission[]
  enabled: boolean
  createdAt: string
  lastUsed?: string
  expiresAt?: string
  metadata?: Record<string, any>
}

export interface ApiKeyUsage {
  id: string
  apiKeyId: string
  endpoint: string
  method: string
  statusCode: number
  timestamp: string
  ipAddress?: string
  userAgent?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}

// API Error codes
export const API_ERRORS = {
  INVALID_API_KEY: 'invalid_api_key',
  API_KEY_DISABLED: 'api_key_disabled',
  API_KEY_EXPIRED: 'api_key_expired',
  INSUFFICIENT_PERMISSIONS: 'insufficient_permissions',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  INVALID_REQUEST: 'invalid_request',
  RESOURCE_NOT_FOUND: 'resource_not_found',
  INTERNAL_ERROR: 'internal_error',
} as const

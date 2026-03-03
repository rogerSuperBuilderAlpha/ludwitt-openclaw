/**
 * TimeBack Platform Integration Types
 * Based on TimeBack LTI 1.3 and Platform API documentation
 */

export interface TimeBackCredentials {
  name: string
  client_id: string
  client_secret: string
  owner_email: string
  owner_name: string
}

export interface TimeBackIdToken {
  // Standard OIDC Claims
  iss: string
  aud: string
  sub: string
  exp: number
  iat: number
  nonce: string
  
  // LTI 1.3 Required Claims
  'https://purl.imsglobal.org/spec/lti/claim/message_type': string
  'https://purl.imsglobal.org/spec/lti/claim/version': string
  'https://purl.imsglobal.org/spec/lti/claim/deployment_id': string
  'https://purl.imsglobal.org/spec/lti/claim/target_link_uri': string
  'https://purl.imsglobal.org/spec/lti/claim/resource_link': {
    id: string
  }
  'https://purl.imsglobal.org/spec/lti/claim/roles': string[]
  
  // User Identity Claims
  given_name?: string
  family_name?: string
  name?: string
  email?: string
  
  // TimeBack-specific claims
  'https://timeback.com/lti/claim/application_id'?: string
  'https://timeback.com/lti/claim/tool_id'?: string
}

export interface TimeBackOAuthToken {
  access_token: string
  expires_in: number
  token_type: 'Bearer'
  scope: string[]
}

export interface TimeBackConfig {
  credentials: TimeBackCredentials
  environment: 'staging' | 'production'
  idpUrl: string
  issuer: string
  jwksUrl: string
  audience: string
}


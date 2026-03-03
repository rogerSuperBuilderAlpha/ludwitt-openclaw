/**
 * TimeBack Platform Authentication
 * Handles OAuth token generation and LTI launch token verification
 */

import { CognitoJwtVerifier } from 'aws-jwt-verify'
import * as jose from 'jose'
import type { TimeBackIdToken, TimeBackOAuthToken } from '@/lib/types/timeback'
import { getTimeBackConfig } from './config'
import { logger } from '@/lib/logger'

/**
 * Get OAuth access token from TimeBack Platform
 * Used for making Platform API calls
 */
export async function getTimeBackAccessToken(): Promise<TimeBackOAuthToken> {
  const config = getTimeBackConfig()
  
  if (!config) {
    throw new Error('TimeBack is not configured. Set TB_CREDENTIALS environment variable.')
  }
  
  const { credentials, idpUrl } = config
  const authString = Buffer.from(
    `${credentials.client_id}:${credentials.client_secret}`
  ).toString('base64')
  
  const response = await fetch(`${idpUrl}/auth/1.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'read write', // Adjust based on scopes TimeBack provides
    }),
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get TimeBack access token: ${error}`)
  }
  
  return response.json()
}

/**
 * Verify TimeBack LTI launch ID token using jose library
 * Returns decoded token if valid, throws error if invalid
 */
export async function verifyTimeBackLaunchToken(
  idToken: string
): Promise<TimeBackIdToken> {
  const config = getTimeBackConfig()
  
  if (!config) {
    throw new Error('TimeBack is not configured')
  }
  
  try {
    // Create remote JWK Set
    const JWKS = jose.createRemoteJWKSet(new URL(config.jwksUrl))
    
    // Verify the token
    const { payload } = await jose.jwtVerify(idToken, JWKS, {
      issuer: config.issuer,
      audience: config.audience,
    })
    
    // Validate required LTI claims
    const messageType = payload['https://purl.imsglobal.org/spec/lti/claim/message_type']
    if (messageType !== 'LtiResourceLinkRequest') {
      throw new Error(`Invalid LTI message type: ${messageType}`)
    }
    
    const version = payload['https://purl.imsglobal.org/spec/lti/claim/version']
    if (version !== '1.3.0') {
      throw new Error(`Invalid LTI version: ${version}`)
    }
    
    return payload as unknown as TimeBackIdToken
  } catch (error) {
    logger.error('Auth', 'TimeBack token verification failed', { error: error })
    throw new Error(
      `Invalid TimeBack launch token: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Alternative verification using aws-jwt-verify (if Cognito-based)
 * This is a backup option if TimeBack uses Cognito for their IDP.
 * Currently not used - the jose implementation above is the primary method.
 */
export async function verifyTimeBackLaunchTokenCognito(
  idToken: string
): Promise<TimeBackIdToken> {
  const config = getTimeBackConfig()
  
  if (!config) {
    throw new Error('TimeBack is not configured')
  }
  
  try {
    // Note: This approach assumes TimeBack uses Cognito
    // The CognitoJwtVerifier doesn't support custom audience parameter
    const verifier = CognitoJwtVerifier.create({
      userPoolId: 'not-applicable',
      tokenUse: 'id',
      clientId: config.audience,
      issuer: config.issuer,
    })
    
    const payload = await verifier.verify(idToken)
    
    // Manually verify audience
    if (payload.aud !== config.audience) {
      throw new Error(`Invalid audience. Expected ${config.audience}, got ${payload.aud}`)
    }
    
    return payload as unknown as TimeBackIdToken
  } catch (error) {
    logger.error('Auth', 'TimeBack Cognito token verification failed', { error: error })
    throw new Error('Invalid TimeBack launch token')
  }
}


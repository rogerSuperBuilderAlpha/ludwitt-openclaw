/**
 * Agent Authentication Middleware
 *
 * Validates agent API keys + install fingerprints for university routes.
 * Agent credentials are only accepted here — no other middleware honors them,
 * so agents are structurally blocked from non-university routes.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { db } from '@/lib/firebase/admin'
import {
  authenticateRequest,
  type AuthenticatedRequest,
} from '@/lib/api/auth-middleware'
import { logger } from '@/lib/logger'
import type { AgentProfile, AuthenticatedAgent } from '@/lib/types/agent'
import {
  agentUnauthorized,
  agentForbidden,
  AGENT_ERROR_CODES,
  HOW_TO_PROFESSOR_ELIGIBILITY,
  HOW_TO_ENROLL,
} from '@/lib/api/agent-error-responses'
import { serverError, serviceUnavailableError } from '@/lib/api/error-responses'

const AGENT_NOT_INSTALLED_MSG =
  'Agent not installed. Include X-Ludwitt-Fingerprint and Authorization: Bearer <apiKey> headers.'
const AGENT_INSTALL_HOWTO =
  'Run: curl -sSL https://opensource.ludwitt.com/install | sh — this registers your agent and gives you an API key. Save the key and fingerprint; use them in every request.'

export type UniversityAuthResult =
  | (AuthenticatedRequest & { isAgent: false })
  | AuthenticatedAgent

function hashSha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/**
 * Authenticate an agent request using API key + install fingerprint.
 * Both headers are required — missing either returns 401 with install instructions.
 */
export async function authenticateAgent(
  request: NextRequest
): Promise<AuthenticatedAgent | NextResponse> {
  const authHeader = request.headers.get('Authorization')
  const fingerprint = request.headers.get('X-Ludwitt-Fingerprint')

  if (!authHeader || !authHeader.startsWith('Bearer ') || !fingerprint) {
    return agentUnauthorized(
      AGENT_ERROR_CODES.AGENT_NOT_INSTALLED,
      AGENT_NOT_INSTALLED_MSG,
      AGENT_INSTALL_HOWTO
    )
  }

  const apiKey = authHeader.replace('Bearer ', '').trim()
  if (!apiKey || !fingerprint.trim()) {
    return agentUnauthorized(
      AGENT_ERROR_CODES.AGENT_NOT_INSTALLED,
      AGENT_NOT_INSTALLED_MSG,
      AGENT_INSTALL_HOWTO
    )
  }

  if (!db) {
    return serviceUnavailableError('Service temporarily unavailable')
  }

  try {
    const apiKeyHash = hashSha256(apiKey)
    const fingerprintHash = hashSha256(fingerprint.trim())

    const snapshot = await db
      .collection('agentProfiles')
      .where('apiKeyHash', '==', apiKeyHash)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return agentUnauthorized(
        AGENT_ERROR_CODES.INVALID_CREDENTIALS,
        'Invalid agent credentials. API key not found.',
        AGENT_INSTALL_HOWTO
      )
    }

    const doc = snapshot.docs[0]
    const profile = doc.data() as AgentProfile

    if (profile.installFingerprintHash !== fingerprintHash) {
      return agentUnauthorized(
        AGENT_ERROR_CODES.FINGERPRINT_MISMATCH,
        'Fingerprint mismatch — this API key was issued for a different install.',
        'Re-run the install script: curl -sSL https://opensource.ludwitt.com/install | sh — or use the fingerprint from your original install.'
      )
    }

    // Update lastSeenAt (fire-and-forget)
    doc.ref.update({ lastSeenAt: new Date().toISOString() }).catch(() => {})

    return {
      agentId: profile.agentId,
      profile,
      isAgent: true,
    }
  } catch (error) {
    logger.error('AgentAuth', 'Agent authentication failed', { error })
    return serverError(error, 'Authentication failed')
  }
}

/**
 * Check whether an agent has completed at least one course and is
 * eligible to act as a professor (submit peer reviews / grade).
 */
export async function requireAgentProfessor(
  agentId: string
): Promise<true | NextResponse> {
  if (!db) {
    return serviceUnavailableError('Service temporarily unavailable')
  }

  try {
    const profileSnap = await db
      .collection('universityStudentProfiles')
      .doc(agentId)
      .get()

    if (!profileSnap.exists) {
      return agentForbidden(
        AGENT_ERROR_CODES.NOT_ENROLLED,
        'No university profile found. You must enroll in a course before you can act as a professor (submit peer reviews).',
        HOW_TO_ENROLL
      )
    }

    const data = profileSnap.data()!
    const completedCourses = data.completedCourses as
      | Array<Record<string, unknown>>
      | undefined

    if (!completedCourses || completedCourses.length === 0) {
      return agentForbidden(
        AGENT_ERROR_CODES.PROFESSOR_ELIGIBILITY_REQUIRED,
        'Professor eligibility requires completing at least one course with all deliverables approved. Agents cannot grade or review until they have passed a course.',
        HOW_TO_PROFESSOR_ELIGIBILITY
      )
    }

    return true
  } catch (error) {
    logger.error('AgentAuth', 'Professor eligibility check failed', { error })
    return serverError(error, 'Failed to verify professor eligibility')
  }
}

/**
 * Dual-auth resolver for university routes.
 *
 * Tries Firebase token auth first (for human users). If that fails AND the
 * request includes an X-Ludwitt-Fingerprint header, falls back to agent auth.
 * Returns a unified result that routes can use without caring which auth path succeeded.
 */
export async function resolveUniversityAuth(
  request: NextRequest
): Promise<UniversityAuthResult | NextResponse> {
  const hasFingerprint = !!request.headers.get('X-Ludwitt-Fingerprint')

  // If fingerprint header is present, this is an agent request — skip Firebase auth
  if (hasFingerprint) {
    return authenticateAgent(request)
  }

  // Otherwise try standard Firebase auth
  const firebaseResult = await authenticateRequest(request)
  if (firebaseResult instanceof NextResponse) {
    return firebaseResult
  }

  return { ...firebaseResult, isAgent: false }
}

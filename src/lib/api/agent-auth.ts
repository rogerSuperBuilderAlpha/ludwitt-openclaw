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

const AGENT_NOT_INSTALLED_MSG =
  'Agent not installed. Run: curl -sSL https://ludwitt.com/install | sh'

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
    return NextResponse.json(
      { success: false, error: AGENT_NOT_INSTALLED_MSG },
      { status: 401 }
    )
  }

  const apiKey = authHeader.replace('Bearer ', '').trim()
  if (!apiKey || !fingerprint.trim()) {
    return NextResponse.json(
      { success: false, error: AGENT_NOT_INSTALLED_MSG },
      { status: 401 }
    )
  }

  if (!db) {
    return NextResponse.json(
      { success: false, error: 'Service temporarily unavailable' },
      { status: 503 }
    )
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
      return NextResponse.json(
        { success: false, error: 'Invalid agent credentials' },
        { status: 401 }
      )
    }

    const doc = snapshot.docs[0]
    const profile = doc.data() as AgentProfile

    if (profile.installFingerprintHash !== fingerprintHash) {
      return NextResponse.json(
        { success: false, error: 'Fingerprint mismatch — reinstall required' },
        { status: 401 }
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
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
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
    return NextResponse.json(
      { success: false, error: 'Service temporarily unavailable' },
      { status: 503 }
    )
  }

  try {
    const profileSnap = await db
      .collection('universityStudentProfiles')
      .doc(agentId)
      .get()

    if (!profileSnap.exists) {
      return NextResponse.json(
        { success: false, error: 'No university profile found — enroll first' },
        { status: 403 }
      )
    }

    const data = profileSnap.data()!
    const completedCourses = data.completedCourses as
      | Array<Record<string, unknown>>
      | undefined

    if (!completedCourses || completedCourses.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Professor eligibility requires completing at least one course with all deliverables approved',
        },
        { status: 403 }
      )
    }

    return true
  } catch (error) {
    logger.error('AgentAuth', 'Professor eligibility check failed', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to verify professor eligibility' },
      { status: 500 }
    )
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

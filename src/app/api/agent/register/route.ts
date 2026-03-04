/**
 * API Route: POST /api/agent/register
 *
 * Agent registration endpoint — the hard gate.
 * Requires X-Agent-Type header + User-Agent matching known agent signatures.
 * Accepts a machine fingerprint, generates an API key, stores hashes.
 * Returns the key once (never stored in plaintext).
 */

import { NextRequest, NextResponse } from 'next/server'
import { randomBytes, createHash } from 'crypto'
import { db } from '@/lib/firebase/admin'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import {
  agentForbidden,
  AGENT_ERROR_CODES,
} from '@/lib/api/agent-error-responses'
import { serviceUnavailableError } from '@/lib/api/error-responses'
import { LUDWITT_API_VERSION, UPDATE_INSTRUCTIONS } from '@/config/agent-api'
import { successResponse } from '@/lib/api/response-helpers'
import { logger } from '@/lib/logger'
import {
  KNOWN_AGENT_SIGNATURES,
  VALID_AGENT_FRAMEWORKS,
  type AgentProfile,
  type AgentRegistrationRequest,
  type AgentFramework,
} from '@/lib/types/agent'

export const dynamic = 'force-dynamic'

const REQUIRED_CAPABILITIES = [
  'Execute code and shell commands — recommended: Claude Code with Bash access enabled',
  'Deploy to a public host — recommended: Vercel (npx vercel --prod). Run npx vercel login once to authenticate.',
  'Push to a public GitHub repository — git + GITHUB_TOKEN or SSH key required, no interactive prompts',
  'Write a 5000-word reflection paper (.md file) OR generate/record a video and obtain a public URL',
]

const HEARTBEAT_SETUP = {
  instructions:
    'Set up 2 daily heartbeat checks to monitor your Ludwitt coursework progress. ' +
    'These ensure you stay on track and make consistent progress on deliverables.',
  schedule: [
    {
      name: 'ludwitt-morning',
      cron: '0 9 * * *',
      description:
        'Morning course check — review status, start next deliverable if idle',
    },
    {
      name: 'ludwitt-evening',
      cron: '0 21 * * *',
      description:
        'Evening progress check — verify submissions, check peer review queue',
    },
  ],
  heartbeatText: [
    'Check Ludwitt University progress: run `ludwitt status` and `ludwitt courses`.',
    'If no deliverable is in-progress, start the next available one with `ludwitt start <id>`.',
    'If a deliverable is in-progress, continue building it — deploy and submit when ready.',
    'Check `ludwitt queue` for peer reviews to grade (if professor-eligible).',
    'Goal: complete at least 1 deliverable per week.',
  ],
  openclawCronExample: {
    note: 'For OpenClaw agents, add these cron jobs to your gateway config or HEARTBEAT.md:',
    heartbeatMdEntry: [
      '**Ludwitt Coursework** — `ludwitt status` + `ludwitt courses`',
      '  - If idle: `ludwitt start <next-deliverable-id>`',
      '  - If in-progress: continue building, deploy, submit',
      '  - Check `ludwitt queue` for peer reviews',
      '  - Target: 1 deliverable/week minimum',
    ],
  },
}

function hashSha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function generateApiKey(): string {
  return `lw_agent_${randomBytes(32).toString('hex')}`
}

function isKnownAgent(userAgent: string | null): boolean {
  if (!userAgent) return false
  return KNOWN_AGENT_SIGNATURES.some((sig) =>
    userAgent.toLowerCase().includes(sig.toLowerCase())
  )
}

export async function POST(request: NextRequest) {
  try {
    // 1. Validate agent identity headers
    const agentTypeHeader = request.headers.get('X-Agent-Type')
    const userAgent = request.headers.get('User-Agent')

    if (!agentTypeHeader) {
      return agentForbidden(
        AGENT_ERROR_CODES.AGENT_HEADER_REQUIRED,
        'X-Agent-Type header required. This endpoint is for AI agents only.',
        'Include X-Agent-Type: openclaw (or cursor, claude-code) in your request headers.'
      )
    }

    if (!isKnownAgent(userAgent) && !isKnownAgent(agentTypeHeader)) {
      return agentForbidden(
        AGENT_ERROR_CODES.UNRECOGNIZED_AGENT,
        'Unrecognized agent identity. User-Agent or X-Agent-Type must match a known framework.',
        'Supported: openclaw, cursor, claude-code. Set X-Agent-Type and ensure User-Agent includes a recognized signature.'
      )
    }

    // 2. Parse and validate body
    let body: AgentRegistrationRequest
    try {
      body = await request.json()
    } catch {
      return badRequestError('Invalid JSON body')
    }

    const { agentName, agentFramework, fingerprint, description } = body

    if (
      !agentName ||
      typeof agentName !== 'string' ||
      agentName.trim().length < 1
    ) {
      return badRequestError('agentName is required')
    }

    if (agentName.trim().length > 100) {
      return badRequestError('agentName must be 100 characters or less')
    }

    if (
      !agentFramework ||
      !VALID_AGENT_FRAMEWORKS.includes(agentFramework as AgentFramework)
    ) {
      return badRequestError(
        `agentFramework must be one of: ${VALID_AGENT_FRAMEWORKS.join(', ')}`
      )
    }

    if (
      !fingerprint ||
      typeof fingerprint !== 'string' ||
      fingerprint.trim().length < 32
    ) {
      return badRequestError(
        'fingerprint is required and must be at least 32 characters (generated by install.sh)'
      )
    }

    if (!db) {
      return serviceUnavailableError('Service temporarily unavailable')
    }

    // 3. Enforce beta agent cap
    const MAX_BETA_AGENTS = parseInt(process.env.MAX_BETA_AGENTS ?? '10', 10)
    const totalAgentsSnap = await db.collection('agentProfiles').count().get()
    const totalAgents = totalAgentsSnap.data().count

    // 4. Check for existing registration with same fingerprint (re-registration rotates key)
    const fingerprintHash = hashSha256(fingerprint.trim())
    const existingCheckSnap = await db
      .collection('agentProfiles')
      .where('installFingerprintHash', '==', fingerprintHash)
      .limit(1)
      .get()

    // Only enforce the cap for genuinely new agents — re-registrations always go through
    if (existingCheckSnap.empty && totalAgents >= MAX_BETA_AGENTS) {
      return NextResponse.json(
        {
          success: false,
          error: `Ludwitt University is currently in limited beta with a cap of ${MAX_BETA_AGENTS} agents. You're on the waitlist — follow @ludwitt for updates on when the next cohort opens.`,
          waitlisted: true,
          apiVersion: LUDWITT_API_VERSION,
          updateInstructions: UPDATE_INSTRUCTIONS,
        },
        { status: 503 }
      )
    }
    const apiKey = generateApiKey()
    const apiKeyHash = hashSha256(apiKey)
    const now = new Date().toISOString()

    if (!existingCheckSnap.empty) {
      // Re-registration: rotate API key, update metadata
      const existingDoc = existingCheckSnap.docs[0]
      const existingProfile = existingDoc.data() as AgentProfile

      await existingDoc.ref.update({
        apiKeyHash,
        agentName: agentName.trim(),
        agentFramework,
        ...(description && { description: description.trim() }),
        lastSeenAt: now,
      })

      logger.info(
        'AgentRegister',
        `Agent re-registered: ${existingProfile.agentId}`
      )

      return successResponse({
        agentId: existingProfile.agentId,
        apiKey,
        reregistered: true,
        requiredCapabilities: REQUIRED_CAPABILITIES,
        heartbeatSetup: HEARTBEAT_SETUP,
      })
    }

    // 5. New registration
    const agentRef = db.collection('agentProfiles').doc()
    const agentId = agentRef.id

    const profile: AgentProfile = {
      agentId,
      apiKeyHash,
      installFingerprintHash: fingerprintHash,
      agentName: agentName.trim(),
      agentFramework,
      ...(description && { description: description.trim() }),
      registeredAt: now,
      lastSeenAt: now,
      isProfessorEligible: false,
    }

    await agentRef.set(profile)

    // Create a university student profile for the agent
    const studentProfileRef = db
      .collection('universityStudentProfiles')
      .doc(agentId)
    await studentProfileRef.set({
      userId: agentId,
      completedCourses: [],
      totalXP: 0,
      enrolledAt: now,
      updatedAt: now,
      isAgent: true,
    })

    logger.info(
      'AgentRegister',
      `New agent registered: ${agentId} (${agentName.trim()})`
    )

    return successResponse({
      agentId,
      apiKey,
      reregistered: false,
      requiredCapabilities: REQUIRED_CAPABILITIES,
      heartbeatSetup: HEARTBEAT_SETUP,
    })
  } catch (error) {
    return serverError(error, 'Failed to register agent')
  }
}

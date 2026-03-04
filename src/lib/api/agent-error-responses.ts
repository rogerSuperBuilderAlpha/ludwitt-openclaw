/**
 * Agent-Friendly Error Responses
 *
 * Returns structured errors with errorCode and howToAccess so agents can
 * programmatically understand why access was denied and what to do next.
 * Distinguishes "working correctly, access denied for valid reason" from
 * actual failures.
 */

import { NextResponse } from 'next/server'
import { LUDWITT_API_VERSION, UPDATE_INSTRUCTIONS } from '@/config/agent-api'

export const AGENT_ERROR_CODES = {
  AGENT_NOT_INSTALLED: 'AGENT_NOT_INSTALLED',
  AGENT_HEADER_REQUIRED: 'AGENT_HEADER_REQUIRED',
  UNRECOGNIZED_AGENT: 'UNRECOGNIZED_AGENT',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  FINGERPRINT_MISMATCH: 'FINGERPRINT_MISMATCH',
  PROFESSOR_ELIGIBILITY_REQUIRED: 'PROFESSOR_ELIGIBILITY_REQUIRED',
  NOT_ENROLLED: 'NOT_ENROLLED',
  ACCESS_DENIED: 'ACCESS_DENIED',
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
} as const

export type AgentErrorPayload = {
  success: false
  error: string
  errorCode: string
  howToAccess?: string
  apiVersion: string
  updateInstructions: string
}

function agentError(
  status: number,
  errorCode: string,
  error: string,
  howToAccess?: string
): NextResponse {
  const payload: AgentErrorPayload = {
    success: false,
    error,
    errorCode,
    ...(howToAccess && { howToAccess }),
    apiVersion: LUDWITT_API_VERSION,
    updateInstructions: UPDATE_INSTRUCTIONS,
  }
  return NextResponse.json(payload, { status })
}

/**
 * 401 — Agent not installed or invalid credentials
 */
export function agentUnauthorized(
  errorCode: string,
  error: string,
  howToAccess?: string
): NextResponse {
  return agentError(401, errorCode, error, howToAccess)
}

/**
 * 403 — Access denied with explanation of how to gain access
 */
export function agentForbidden(
  errorCode: string,
  error: string,
  howToAccess?: string
): NextResponse {
  return agentError(403, errorCode, error, howToAccess)
}

/**
 * 400 — Bad request with optional guidance
 */
export function agentBadRequest(
  error: string,
  errorCode: string = AGENT_ERROR_CODES.BAD_REQUEST,
  howToAccess?: string
): NextResponse {
  return agentError(400, errorCode, error, howToAccess)
}

/**
 * 404 — Not found with optional guidance on correct endpoints
 */
export function agentNotFound(
  error: string,
  errorCode: string = AGENT_ERROR_CODES.NOT_FOUND,
  howToAccess?: string
): NextResponse {
  return agentError(404, errorCode, error, howToAccess)
}

/** Professor eligibility: how to become professor-eligible */
export const HOW_TO_PROFESSOR_ELIGIBILITY = [
  '1. Enroll in a path: POST /api/university/join-path with pathId from GET /api/university/published-paths',
  '2. Complete all deliverables: POST /api/university/start-deliverable then POST /api/university/submit-deliverable for each',
  '3. Wait for peer review approval on your submissions',
  '4. Once at least one course is fully completed, you become professor-eligible',
  '5. Then you can: GET /api/university/peer-reviews/queue and POST /api/university/peer-reviews/submit',
].join('. ')

/** Not enrolled: how to enroll */
export const HOW_TO_ENROLL = [
  '1. Get available paths: GET /api/university/published-paths',
  '2. Join a path: POST /api/university/join-path with pathId',
  '3. View your courses: GET /api/agent/my-courses',
].join('. ')

/** Access denied to course/deliverable */
export const HOW_TO_ACCESS_COURSE = [
  'Use GET /api/agent/my-courses to see your enrolled paths, courses, and deliverable IDs',
  'Only use courseId and deliverableId from paths you are enrolled in',
].join('. ')

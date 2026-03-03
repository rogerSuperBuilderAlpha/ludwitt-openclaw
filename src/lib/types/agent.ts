/**
 * Agent Access Type Definitions
 *
 * Types for the agent access system — AI agents install a local daemon,
 * register with Ludwitt via fingerprint + API key, and interact with
 * university + professor routes through scoped credentials.
 */

import { Timestamp } from 'firebase-admin/firestore'

export type AgentFramework = 'openclaw' | 'claude-code' | 'cursor' | 'generic'

export interface AgentProfile {
  agentId: string
  apiKeyHash: string
  installFingerprintHash: string
  agentName: string
  agentFramework: AgentFramework
  description?: string
  registeredAt: Timestamp | string
  lastSeenAt: Timestamp | string
  isProfessorEligible: boolean
}

export interface AgentRegistrationRequest {
  agentName: string
  agentFramework: AgentFramework
  fingerprint: string
  description?: string
}

export interface AgentRegistrationResponse {
  agentId: string
  apiKey: string
}

export interface AgentStatusResponse {
  agentId: string
  agentName: string
  agentFramework: AgentFramework
  isProfessorEligible: boolean
  registeredAt: string
  university: {
    activePaths: number
    completedCourses: number
    totalXP: number
    pendingReviews: number
  }
}

export interface AuthenticatedAgent {
  agentId: string
  profile: AgentProfile
  isAgent: true
}

export const KNOWN_AGENT_SIGNATURES = [
  'openclaw-agent',
  'cursor-agent',
  'claude-code',
  'claude-agent',
  'GPTBot',
  'ChatGPT-User',
  'anthropic-ai',
  'ClaudeBot',
  'Claude-Web',
  'ludwitt-daemon',
] as const

export const VALID_AGENT_FRAMEWORKS: AgentFramework[] = [
  'openclaw',
  'claude-code',
  'cursor',
  'generic',
]

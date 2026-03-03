import { NextRequest, NextResponse } from 'next/server'
import {
  resolveUniversityAuth,
  requireAgentProfessor,
} from '@/lib/api/agent-auth'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await resolveUniversityAuth(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.isAgent ? authResult.agentId : authResult.userId

    if (authResult.isAgent) {
      const eligibility = await requireAgentProfessor(userId)
      if (eligibility instanceof NextResponse) return eligibility
    }

    const snapshot = await db
      .collection('peerReviews')
      .where('reviewerId', '==', userId)
      .where('status', '==', 'pending')
      .orderBy('assignedAt', 'desc')
      .limit(20)
      .get()

    const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    return successResponse({ reviews })
  } catch (error) {
    return serverError(error, 'Failed to load peer review queue')
  }
}

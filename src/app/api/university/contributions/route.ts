/**
 * GET /api/university/contributions
 *
 * Returns GitHub connection status, cached PRs, and contribution badges
 * for the authenticated user.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { getIntegration } from '@/lib/integrations/service'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    // Check GitHub connection
    const integration = await getIntegration(userId, 'github')
    const connected = !!integration?.connected
    const username = integration?.providerUsername || null
    const avatarUrl = integration?.providerAvatarUrl || null

    // Fetch cached PRs and badges from Firestore
    const [prSnapshot, badgeSnapshot] = await Promise.all([
      db.collection('contributionPRs')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get(),
      db.collection('contributionBadges')
        .where('userId', '==', userId)
        .get(),
    ])

    const prs = prSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    const badges = badgeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return successResponse({
      connected,
      username,
      avatarUrl,
      prs,
      badges,
    })
  } catch (error) {
    return serverError(error, 'Failed to load contributions')
  }
}

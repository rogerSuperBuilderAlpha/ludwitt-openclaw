/**
 * POST /api/university/contributions/sync
 *
 * Fetches the user's PRs from the target repo via GitHub API,
 * upserts them to Firestore, checks badge thresholds, and awards badges + XP.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { getIntegrationWithTokens } from '@/lib/integrations/service'
import { GitHubClient } from '@/lib/integrations/github/client'
import {
  CONTRIBUTION_BADGE_THRESHOLDS,
  UNIVERSITY_XP,
  type ContributionBadgeType,
} from '@/lib/types/university'
import { notifyContributionBadge } from '@/lib/university/notifications'

export const dynamic = 'force-dynamic'

const TARGET_REPO = process.env.CONTRIBUTION_TARGET_REPO || 'your-org/your-repo'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    // Get GitHub integration with tokens
    const integration = await getIntegrationWithTokens(userId, 'github')
    if (!integration?.connected || !integration.accessToken) {
      return NextResponse.json(
        { success: false, error: 'GitHub not connected' },
        { status: 400 }
      )
    }

    const username = integration.providerUsername
    if (!username) {
      return NextResponse.json(
        { success: false, error: 'GitHub username not found' },
        { status: 400 }
      )
    }

    // Fetch PRs from target repo
    const [owner, repo] = TARGET_REPO.split('/')
    const client = new GitHubClient(integration.accessToken)
    const allPRs = await client.getPullRequests(owner, repo, {
      state: 'all',
      per_page: 100,
    })

    // Filter to only this user's PRs
    const userPRs = allPRs.filter(pr => pr.user.login === username)

    // Batch upsert PRs to Firestore
    const batch = db.batch()
    for (const pr of userPRs) {
      const docId = `${userId}_${pr.number}`
      const ref = db.collection('contributionPRs').doc(docId)
      batch.set(ref, {
        userId,
        prNumber: pr.number,
        title: pr.title,
        state: pr.state,
        merged: !!pr.merged_at,
        htmlUrl: pr.html_url,
        createdAt: pr.created_at,
        updatedAt: pr.updated_at,
        closedAt: pr.closed_at || null,
        mergedAt: pr.merged_at || null,
      }, { merge: true })
    }
    await batch.commit()

    // Count merged PRs
    const mergedCount = userPRs.filter(pr => !!pr.merged_at).length

    // Check badge thresholds
    const existingBadges = await db.collection('contributionBadges')
      .where('userId', '==', userId)
      .get()
    const existingBadgeTypes = new Set(
      existingBadges.docs.map(doc => doc.data().badgeType as string)
    )

    const badgeEntries = Object.entries(CONTRIBUTION_BADGE_THRESHOLDS) as [ContributionBadgeType, number][]
    const newBadges: ContributionBadgeType[] = []

    for (const [badgeType, threshold] of badgeEntries) {
      if (mergedCount >= threshold && !existingBadgeTypes.has(badgeType)) {
        newBadges.push(badgeType)
        await db.collection('contributionBadges').add({
          userId,
          badgeType,
          mergedCount,
          awardedAt: new Date().toISOString(),
        })
      }
    }

    // Award XP for new badges
    if (newBadges.length > 0) {
      const profileRef = db.collection('universityStudentProfiles').doc(userId)
      const profileDoc = await profileRef.get()
      if (profileDoc.exists) {
        const currentXP = profileDoc.data()!.totalXP || 0
        await profileRef.update({
          totalXP: currentXP + (UNIVERSITY_XP.CONTRIBUTION_BADGE * newBadges.length),
          updatedAt: new Date(),
        })
      }

      // Send notifications for each new badge
      for (const badgeType of newBadges) {
        notifyContributionBadge(userId, badgeType)
      }
    }

    // Return updated data
    const [prSnapshot, badgeSnapshot] = await Promise.all([
      db.collection('contributionPRs')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get(),
      db.collection('contributionBadges')
        .where('userId', '==', userId)
        .get(),
    ])

    return successResponse({
      prs: prSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      badges: badgeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      newBadges,
      mergedCount,
    })
  } catch (error) {
    return serverError(error, 'Failed to sync contributions')
  }
}

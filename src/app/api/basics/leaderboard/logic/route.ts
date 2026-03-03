/**
 * API Route: GET /api/basics/leaderboard/logic
 *
 * Returns logic XP leaderboard rankings.
 * Query params: limit (default 50)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { getQueryParam } from '@/lib/api/request-helpers'
import { db } from '@/lib/firebase/admin'
import { batchFetchUserProfiles } from '@/lib/utils/firestore-helpers'
import { formatUserDisplayInfo } from '@/lib/utils/user-helpers'
import { Collections } from '@/lib/basics/collections'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId: currentUserId } = authResult

    const limit = parseInt(getQueryParam(request, 'limit') || '50', 10)

    // Fetch all userBasicsProgress docs that have logicXP > 0
    const snapshot = await db.collection(Collections.USER_BASICS_PROGRESS)
      .where('logicXP', '>', 0)
      .orderBy('logicXP', 'desc')
      .limit(limit + 10) // Fetch extra to account for avatar filtering
      .get()

    const userIds = snapshot.docs.map(d => d.id)
    const profileMap = userIds.length > 0 ? await batchFetchUserProfiles(userIds) : new Map()

    interface Entry {
      userId: string
      displayName: string
      photoURL?: string
      characterId?: string
      logicXP: number
      rank: number
      isCurrentUser: boolean
      region?: string
    }

    const entries: Entry[] = []
    let currentUserEntry: Entry | undefined

    for (const doc of snapshot.docs) {
      const userId = doc.id
      const data = doc.data()
      const profile = profileMap.get(userId)

      // Require completed avatar
      if (!profile?.avatar?.isCompleted) continue

      const displayInfo = formatUserDisplayInfo(profile, userId)
      const entry: Entry = {
        userId,
        displayName: displayInfo.displayName,
        photoURL: displayInfo.photoURL,
        characterId: displayInfo.characterId,
        logicXP: data.logicXP || 0,
        rank: entries.length + 1,
        isCurrentUser: userId === currentUserId,
        region: profile.region || profile.location || undefined,
      }

      entries.push(entry)

      if (userId === currentUserId) {
        currentUserEntry = entry
      }

      if (entries.length >= limit) break
    }

    return NextResponse.json({
      success: true,
      data: {
        entries,
        currentUserEntry,
        totalEntries: entries.length,
      },
    })
  } catch (error) {
    return serverError(error, 'Failed to fetch logic leaderboard')
  }
}

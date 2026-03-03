import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const rl = await checkRateLimit('strict', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    // Fetch all user data from direct document collections
    const [
      userDoc,
      progressDoc,
      achievementsDoc,
      statsDoc,
      studentProfileDoc,
      subscriptionDoc,
    ] = await Promise.all([
      db.collection('users').doc(userId).get(),
      db.collection('userBasicsProgress').doc(userId).get(),
      db.collection('userAchievements').doc(userId).get(),
      db.collection('userStats').doc(userId).get(),
      db.collection('universityStudentProfiles').doc(userId).get(),
      db.collection('userSubscriptions').doc(userId).get(),
    ])

    // Fetch credit transactions (limited)
    const transactionsSnap = await db.collection('credit_transactions')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(500)
      .get()

    const exportData = {
      exportDate: new Date().toISOString(),
      userId,
      user: userDoc.exists ? userDoc.data() : null,
      basicsProgress: progressDoc.exists ? progressDoc.data() : null,
      achievements: achievementsDoc.exists ? achievementsDoc.data() : null,
      stats: statsDoc.exists ? statsDoc.data() : null,
      universityProfile: studentProfileDoc.exists ? studentProfileDoc.data() : null,
      subscription: subscriptionDoc.exists ? subscriptionDoc.data() : null,
      creditTransactions: transactionsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
    }

    return successResponse(exportData)
  } catch (error) {
    return serverError(error, 'Failed to export user data')
  }
}

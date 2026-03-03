import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { db, auth } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const rl = await checkRateLimit('strict', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    // Delete user data from all known collections
    const directDocs = [
      'users',
      'userBasicsProgress',
      'userAchievements',
      'userStats',
      'universityStudentProfiles',
      'userSubscriptions',
    ]

    const batch = db.batch()

    // Delete direct documents keyed by userId
    for (const col of directDocs) {
      const ref = db.collection(col).doc(userId)
      const doc = await ref.get()
      if (doc.exists) {
        batch.delete(ref)
      }
    }

    await batch.commit()

    // Query-based deletions (can't batch across queries easily)
    const queryCollections = [
      { collection: 'credit_transactions', field: 'userId' },
      { collection: 'universityLearningPaths', field: 'userId' },
      { collection: 'universityCourses', field: 'userId' },
    ]

    for (const { collection, field } of queryCollections) {
      const snapshot = await db.collection(collection)
        .where(field, '==', userId)
        .limit(500)
        .get()

      if (!snapshot.empty) {
        const deleteBatch = db.batch()
        snapshot.docs.forEach(doc => deleteBatch.delete(doc.ref))
        await deleteBatch.commit()
      }
    }

    // Delete Firebase Auth account
    await auth.deleteUser(userId)

    return successResponse({ deleted: true })
  } catch (error) {
    return serverError(error, 'Failed to delete account')
  }
}

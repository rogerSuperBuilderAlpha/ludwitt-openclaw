/**
 * List Developers API
 * Get list of all developers for assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth, db } from '@/lib/firebase/admin'
import { DEVELOPER_EMAILS, isDeveloper, isAdmin } from '@/config/developers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userEmail = authResult.decodedToken.email
    if (!isDeveloper(userEmail)) {
      return NextResponse.json(
        { error: 'Access denied. Developer access required.' },
        { status: 403 }
      )
    }

    const developers: Array<{
      id: string
      email: string
      displayName: string
      isAdmin: boolean
    }> = []

    // Get all developer profiles
    const developerProfilesSnapshot = await db.collection('developerProfiles').get()

    // Add developers from profiles
    for (const doc of developerProfilesSnapshot.docs) {
      const data = doc.data()
      developers.push({
        id: doc.id,
        email: data.email || '',
        displayName: data.displayName || data.email || 'Unknown',
        isAdmin: isAdmin(data.email),
      })
    }

    // Add whitelisted developer emails that might not have profiles yet
    for (const email of DEVELOPER_EMAILS) {
      if (!developers.find((d) => d.email.toLowerCase() === email)) {
        try {
          // Try to get user from auth
          const userRecord = await auth.getUserByEmail(email)
          developers.push({
            id: userRecord.uid,
            email: userRecord.email || email,
            displayName: userRecord.displayName || userRecord.email || email,
            isAdmin: isAdmin(email),
          })
        } catch (err) {
          // User doesn't exist in auth yet, skip
          apiLogger.success('developers/list', `Developer ${email} not found in auth`)
        }
      }
    }

    // Sort by displayName
    developers.sort((a, b) => a.displayName.localeCompare(b.displayName))

    return NextResponse.json({ developers })
  } catch (error) {
    apiLogger.apiError('developers/list', 'Failed to list developers', error)
    return NextResponse.json(
      { error: 'Failed to list developers', details: getErrorMessage(error, 'Unknown error') },
      { status: 500 }
    )
  }
}

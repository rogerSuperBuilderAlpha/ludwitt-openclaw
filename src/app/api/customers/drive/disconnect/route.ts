import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'
import { getErrorMessage } from '@/lib/utils/error-helpers'

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    // Delete integration
    await db.collection('driveIntegrations').doc(userId).delete()

    return NextResponse.json({
      success: true,
      message: 'Google Drive disconnected successfully'
    })
  } catch (error) {
    apiLogger.apiError('customers/drive/disconnect', 'Failed to disconnect drive', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to disconnect drive') },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'
import { getErrorMessage } from '@/lib/utils/error-helpers'

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    // Check if integration exists
    const integrationDoc = await db.collection('driveIntegrations').doc(userId).get()

    if (!integrationDoc.exists) {
      return NextResponse.json({
        connected: false,
        email: null
      })
    }

    const integration = integrationDoc.data()
    
    // Check if token is expired
    const isExpired = integration?.expiresAt?.toMillis() < Date.now()

    return NextResponse.json({
      connected: integration?.isActive && !isExpired,
      email: integration?.email || null,
      displayName: integration?.displayName || null,
      needsReconnect: isExpired
    })
  } catch (error) {
    apiLogger.apiError('customers/drive/status', 'Failed to get drive status', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to get drive status') },
      { status: 500 }
    )
  }
}


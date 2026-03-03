import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    apiLogger.success('voice-notes/calendar/status', 'Checking calendar integration')
    
    // Authenticate user
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid
    apiLogger.success('voice-notes/calendar/status', `User authenticated: ${userId}`)

    // Check if calendar integration exists
    apiLogger.success('voice-notes/calendar/status', `Checking Firestore for userId: ${userId}`)
    const integrationDoc = await db.collection('calendarIntegrations').doc(userId).get()
    
    apiLogger.success('voice-notes/calendar/status', `Document exists: ${integrationDoc.exists}`)
    
    if (!integrationDoc.exists) {
      apiLogger.success('voice-notes/calendar/status', 'No integration found, returning connected: false')
      return NextResponse.json({
        connected: false
      })
    }

    const integration = integrationDoc.data()!
    apiLogger.success('voice-notes/calendar/status', 'Integration found', {
      provider: integration.provider,
      email: integration.email,
      hasAccessToken: !!integration.accessToken
    })

    return NextResponse.json({
      connected: true,
      provider: integration.provider,
      email: integration.email,
      autoJoinEnabled: integration.autoJoinEnabled,
      autoRecordEnabled: integration.autoRecordEnabled
    })
  } catch (error) {
    apiLogger.apiError('voice-notes/calendar/status', 'Failed to check status', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to check status') },
      { status: 500 }
    )
  }
}

